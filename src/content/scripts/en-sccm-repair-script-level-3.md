---
title: SCCM Repair script level 3
summary: |-2
     - Deep repair
     - Verifies/salvages/resets WMI repository
     - Registers WBEM DLLs
     - Registers `wmiprvse` and `winmgmt`
     - Recompiles MOF/MFL files
     - Can reinstall the SCCM client after WMI/MOF repair
locale: en
platform: x64
riskLevel: Low
lastReviewed: 2026-07-08T10:25:00.000+02:00
prerequisites:
  - Powershell
draft: false
---
<#

.SYNOPSIS

\    SCCM / MECM Client Repair - Level 3 WMI + MOF Repair



.DESCRIPTION

\    Deep repair script for broken SCCM clients where WMI/MOF corruption is suspected.



\    Actions:

\- Validates elevated/admin execution

\- Logs everything

\- Stops ConfigMgr client service when present

\- Verifies WMI repository

\- Attempts WMI repository salvage if inconsistent

\- Optionally resets WMI repository if salvage fails

\- Performs WBEM DLL registration

\- Registers wmiprvse and winmgmt

\- Recompiles MOF/MFL files

\- Optionally reinstalls the SCCM client after WMI/MOF repair

\- Validates root\ccm:SMS_Client after reinstall



\    This script intentionally contains a PowerShell implementation of the classic repair sequence:

\    sc config winmgmt start= disabled

\    net stop winmgmt /y

\    cd %windir%\system32\wbem

\    for /f %%s in ('dir /b *.dll') do regsvr32 /s %%s

\    wmiprvse /regserver

\    winmgmt /regserver

\    sc config winmgmt start= auto

\    net start winmgmt

\    for /f %%s in ('dir /s /b \*.mof \*.mfl') do mofcomp %%s



\    Important corrections:

\- The service name is winmgmt, not winmgmgt.

\- In PowerShell we use Set-Service instead of relying on sc.exe spacing.

\- DLL/MOF actions are logged individually.

\- Optional guardrail exists for uninstall MOFs.



.PARAMETER SiteCode

\    ConfigMgr site code, for example P01.

\    Required only when -ReinstallClient is used.



.PARAMETER ManagementPoint

\    Management point FQDN or URL.

\    Required only when -ReinstallClient is used.



.PARAMETER ClientSource

\    Folder containing ccmsetup.exe.

\    Example:

\    \\CM01.contoso.com\SMS_P01\Client



.PARAMETER FallbackStatusPoint

\    Optional fallback status point FQDN.



.PARAMETER UsePKICert

\    Adds /UsePKICert to ccmsetup.exe during reinstall.



.PARAMETER ReinstallClient

\    Reinstalls the ConfigMgr client after WMI/MOF repair.



.PARAMETER AllowRepositoryReset

\    Allows winmgmt /resetrepository if verify/salvage still reports inconsistency.



.PARAMETER MofMode

\    AutoRecoverOnly  = safer option; compiles registered AutoRecover MOFs.

\    FullWbemFolder   = closer to the classic command; recursively compiles \*.mof/\*.mfl under wbem.



.PARAMETER IncludeUninstallMofs

\    By default the script skips files with "uninstall" in their path/name.

\    Use this switch only if you want literal compile-everything behavior.



.EXIT CODES

\    0     Deep repair completed and validation passed, or WMI/MOF repair completed when not reinstalling

\    1     Repair ran but validation failed

\    2     Missing ccmsetup.exe when -ReinstallClient was requested

\    3     Not running elevated/admin

\    4     Required parameter missing

\    5     WMI service could not be restored

\    3010  Repair completed, reboot recommended



.NOTES

\    This is intentionally a deep repair.

\    Use Level 1 and Level 2 first where possible.

\    WMI repository reset and broad MOF recompilation can affect more than SCCM.

\#>



\[CmdletBinding()]

param(

\    \[string]$SiteCode,



\    \[string]$ManagementPoint,



\    \[string]$ClientSource,



\    \[string]$FallbackStatusPoint,



\    \[switch]$UsePKICert,



\    \[switch]$ReinstallClient,



\    \[bool]$AllowRepositoryReset = $true,



\    \[ValidateSet("AutoRecoverOnly","FullWbemFolder")]

\    \[string]$MofMode = "FullWbemFolder",



\    \[switch]$IncludeUninstallMofs,



\    \[string[]]$InstallationProperties = @(),



\    \[string]$LogRoot = "$env:windir\Temp\ConfigMgrClientRepair",



\    \[int]$InstallTimeoutMinutes = 90

)



Set-StrictMode -Version 2.0

$ErrorActionPreference = "Continue"



$Script:RebootRecommended = $true

$Script:LogFile = $null



function New-Log {

\    if (-not (Test-Path $LogRoot)) {

\    New-Item -Path $LogRoot -ItemType Directory -Force | Out-Null

\    }



\    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

\    $Script:LogFile = Join-Path $LogRoot "Repair-ConfigMgrClient-Level3-WMI-MOF-$timestamp.log"

\    New-Item -Path $Script:LogFile -ItemType File -Force | Out-Null

}



function Write-Log {

\    param(

\    \[Parameter(Mandatory = $true)]\[string]$Message,

\    \[ValidateSet("INFO","WARN","ERROR","SUCCESS")]\[string]$Level = "INFO"

\    )



\    $line = "{0} \[{1}] {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Level, $Message

\    Write-Host $line

\    if ($Script:LogFile) {

\    Add-Content -Path $Script:LogFile -Value $line

\    }

}



function Test-IsAdmin {

\    $identity = \[Security.Principal.WindowsIdentity]::GetCurrent()

\    $principal = New-Object Security.Principal.WindowsPrincipal($identity)

\    return $principal.IsInRole(\[Security.Principal.WindowsBuiltInRole]::Administrator)

}



function Invoke-LoggedProcess {

\    param(

\    \[Parameter(Mandatory = $true)]\[string]$FilePath,

\    \[string[]]$ArgumentList = @(),

\    \[int]$TimeoutMinutes = 60,

\    \[string]$WorkingDirectory = $env:windir,

\    \[switch]$ContinueOnMissing

\    )



\    if (-not (Test-Path $FilePath)) {

\    if ($ContinueOnMissing) {

\    Write-Log "Executable not found, skipping: $FilePath" "WARN"

\    return 0

\    }



\    Write-Log "Executable not found: $FilePath" "ERROR"

\    return 9999

\    }



\    $arguments = ($ArgumentList -join " ")

\    Write-Log "Starting process: \`"$FilePath\`" $arguments"



\    try {

\    $process = Start-Process -FilePath $FilePath -ArgumentList $ArgumentList -WorkingDirectory $WorkingDirectory -PassThru -WindowStyle Hidden

\    $completed = $process.WaitForExit($TimeoutMinutes \* 60 \* 1000)



\    if (-not $completed) {

\    Write-Log "Process timeout after $TimeoutMinutes minutes. Killing PID $($process.Id)." "ERROR"

\    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue

\    return 408

\    }



\    Write-Log "Process completed with exit code $($process.ExitCode)."

\    return $process.ExitCode

\    }

\    catch {

\    Write-Log "Failed to run process $FilePath. Error: $($_.Exception.Message)" "ERROR"

\    return 9998

\    }

}



function Invoke-CmdCapture {

\    param(

\    \[Parameter(Mandatory = $true)]\[string]$Command,

\    \[string[]]$Arguments = @()

\    )



\    Write-Log "Running: $Command $($Arguments -join ' ')"



\    try {

\    $output = & $Command @Arguments 2>&1

\    foreach ($line in $output) {

\    Write-Log "$line"

\    }



\    $exitCode = $LASTEXITCODE

\    Write-Log "$Command exit code: $exitCode"

\    return @{

\    ExitCode = $exitCode

\    Output   = ($output -join "`n")

\    }

\    }

\    catch {

\    Write-Log "Failed running $Command. Error: $($_.Exception.Message)" "ERROR"

\    return @{

\    ExitCode = 9998

\    Output   = $_.Exception.Message

\    }

\    }

}



function Stop-ServiceIfPresent {

\    param(\[Parameter(Mandatory = $true)]\[string]$Name)



\    $service = Get-Service -Name $Name -ErrorAction SilentlyContinue

\    if (-not $service) {

\    Write-Log "Service not found, skipping stop: $Name" "WARN"

\    return

\    }



\    if ($service.Status -eq "Stopped") {

\    Write-Log "Service already stopped: $Name"

\    return

\    }



\    try {

\    Write-Log "Stopping service: $Name"

\    Stop-Service -Name $Name -Force -ErrorAction Stop

\    $service.WaitForStatus("Stopped", "00:02:00")

\    Write-Log "Service stopped: $Name" "SUCCESS"

\    }

\    catch {

\    Write-Log "Failed to stop service $Name. Error: $($_.Exception.Message)" "WARN"

\    }

}



function Start-ServiceIfPresent {

\    param(\[Parameter(Mandatory = $true)]\[string]$Name)



\    $service = Get-Service -Name $Name -ErrorAction SilentlyContinue

\    if (-not $service) {

\    Write-Log "Service not found, skipping start: $Name" "WARN"

\    return $false

\    }



\    try {

\    Write-Log "Starting service: $Name"

\    Start-Service -Name $Name -ErrorAction Stop

\    $service.WaitForStatus("Running", "00:02:00")

\    Write-Log "Service running: $Name" "SUCCESS"

\    return $true

\    }

\    catch {

\    Write-Log "Failed to start service $Name. Error: $($_.Exception.Message)" "ERROR"

\    return $false

\    }

}



function Test-WmiRepository {

\    $result = Invoke-CmdCapture -Command "winmgmt.exe" -Arguments @("/verifyrepository")

\    $output = $result.Output



\# Important: check "inconsistent" first because it contains the word "consistent".

\    if ($output -match "inconsistent") {

\    Write-Log "WMI repository verification result: inconsistent." "WARN"

\    return "Inconsistent"

\    }



\    if ($output -match "consistent") {

\    Write-Log "WMI repository verification result: consistent." "SUCCESS"

\    return "Consistent"

\    }



\    Write-Log "Could not clearly parse WMI repository verification result. Review log output." "WARN"

\    return "Unknown"

}



function Repair-WmiRepositoryIfNeeded {

\    $state = Test-WmiRepository



\    if ($state -eq "Consistent") {

\    return

\    }



\    Write-Log "Attempting WMI repository salvage."

\    \[void](Invoke-CmdCapture -Command "winmgmt.exe" -Arguments @("/salvagerepository"))



\    Start-Sleep -Seconds 10

\    $state = Test-WmiRepository



\    if ($state -eq "Consistent") {

\    Write-Log "WMI repository became consistent after salvage." "SUCCESS"

\    return

\    }



\    if ($AllowRepositoryReset) {

\    Write-Log "WMI repository still not consistent. Running winmgmt /resetrepository because AllowRepositoryReset is true." "WARN"

\    \[void](Invoke-CmdCapture -Command "winmgmt.exe" -Arguments @("/resetrepository"))

\    Start-Sleep -Seconds 10

\    \[void](Test-WmiRepository)

\    }

\    else {

\    Write-Log "WMI repository still not consistent, but AllowRepositoryReset is false. Skipping reset." "ERROR"

\    }

}



function Register-WbemDlls {

\    $wbemPath = Join-Path $env:windir "System32\wbem"

\    $regsvr32 = Join-Path $env:windir "System32\regsvr32.exe"



\    if (-not (Test-Path $wbemPath)) {

\    Write-Log "WBEM path not found: $wbemPath" "ERROR"

\    return

\    }



\    $dlls = Get-ChildItem -Path $wbemPath -Filter "*.dll" -File -ErrorAction SilentlyContinue

\    Write-Log "Registering $($dlls.Count) WBEM DLL files from $wbemPath."



\    foreach ($dll in $dlls) {

\    Write-Log "Registering DLL: $($dll.FullName)"

\    \[void](Invoke-LoggedProcess -FilePath $regsvr32 -ArgumentList @("/s", "\`"$($dll.FullName)\`"") -TimeoutMinutes 2 -WorkingDirectory $wbemPath)

\    }

}



function Register-WmiExecutables {

\    $wbemPath = Join-Path $env:windir "System32\wbem"

\    $wmiprvse = Join-Path $wbemPath "wmiprvse.exe"

\    $winmgmt = Join-Path $wbemPath "winmgmt.exe"



\    \[void](Invoke-LoggedProcess -FilePath $wmiprvse -ArgumentList @("/regserver") -TimeoutMinutes 5 -WorkingDirectory $wbemPath -ContinueOnMissing)

\    \[void](Invoke-LoggedProcess -FilePath $winmgmt -ArgumentList @("/regserver") -TimeoutMinutes 5 -WorkingDirectory $wbemPath -ContinueOnMissing)

}



function Get-AutoRecoverMofList {

\    $path = "HKLM:\SOFTWARE\Microsoft\Wbem\CIMOM"

\    try {

\    $raw = (Get-ItemProperty -Path $path -ErrorAction Stop)."Autorecover MOFs"

\    $items = @()

\    foreach ($entry in $raw) {

\    if (-not \[string]::IsNullOrWhiteSpace($entry)) {

\    $items += \[Environment]::ExpandEnvironmentVariables($entry)

\    }

\    }



\    return $items | Select-Object -Unique

\    }

\    catch {

\    Write-Log "Could not read AutoRecover MOFs registry value. Error: $($_.Exception.Message)" "ERROR"

\    return @()

\    }

}



function Compile-MofFile {

\    param(\[Parameter(Mandatory = $true)]\[string]$Path)



\    if (-not (Test-Path $Path)) {

\    Write-Log "MOF/MFL file not found, skipping: $Path" "WARN"

\    return

\    }



\    if (-not $IncludeUninstallMofs -and $Path -match "(?i)uninstall") {

\    Write-Log "Skipping uninstall MOF/MFL because IncludeUninstallMofs was not specified: $Path" "WARN"

\    return

\    }



\    $mofcomp = Join-Path $env:windir "System32\wbem\mofcomp.exe"

\    Write-Log "Compiling MOF/MFL: $Path"

\    \[void](Invoke-LoggedProcess -FilePath $mofcomp -ArgumentList @("\`"$Path\`"") -TimeoutMinutes 5 -WorkingDirectory (Split-Path $Path -Parent))

}



function Invoke-MofRepair {

\    $wbemPath = Join-Path $env:windir "System32\wbem"



\    if ($MofMode -eq "AutoRecoverOnly") {

\    Write-Log "MOF repair mode: AutoRecoverOnly"

\    $mofs = Get-AutoRecoverMofList

\    Write-Log "Found $($mofs.Count) registered AutoRecover MOF/MFL entries."



\    foreach ($mof in $mofs) {

\    Compile-MofFile -Path $mof

\    }

\    }

\    else {

\    Write-Log "MOF repair mode: FullWbemFolder"

\    Write-Log "Recursively compiling \*.mof and \*.mfl under: $wbemPath"



\    $mofs = Get-ChildItem -Path $wbemPath -Include "\*.mof","\*.mfl" -Recurse -File -ErrorAction SilentlyContinue

\    Write-Log "Found $($mofs.Count) MOF/MFL files."



\    foreach ($mof in $mofs) {

\    Compile-MofFile -Path $mof.FullName

\    }

\    }

}



function Get-InstallCcmSetupPath {

\    if ($ClientSource) {

\    $candidate = Join-Path $ClientSource "ccmsetup.exe"

\    if (Test-Path $candidate) {

\    return $candidate

\    }



\    Write-Log "ClientSource was provided but ccmsetup.exe was not found: $candidate" "ERROR"

\    return $null

\    }



\    $candidate = Join-Path $env:windir "CCMSetup\ccmsetup.exe"

\    if (Test-Path $candidate) {

\    return $candidate

\    }



\    Write-Log "No ClientSource provided and no local ccmsetup.exe found." "ERROR"

\    return $null

}



function Build-CcmSetupArguments {

\    $args = New-Object System.Collections.Generic.List\[string]



\    if ($UsePKICert) {

\    $args.Add("/UsePKICert")

\    }



\    if ($ManagementPoint -match "^https?://") {

\    $args.Add("/mp:$ManagementPoint")

\    $args.Add("SMSMP=$ManagementPoint")

\    }

\    else {

\    $args.Add("/mp:$ManagementPoint")

\    $args.Add("SMSMP=$ManagementPoint")

\    }



\    $args.Add("SMSSITECODE=$SiteCode")



\    if ($FallbackStatusPoint) {

\    $args.Add("FSP=$FallbackStatusPoint")

\    }



\    foreach ($prop in $InstallationProperties) {

\    if (-not \[string]::IsNullOrWhiteSpace($prop)) {

\    $args.Add($prop)

\    }

\    }



\    return $args.ToArray()

}



function Wait-ForCcmSetupToFinish {

\    param(\[int]$TimeoutMinutes = 90)



\    $deadline = (Get-Date).AddMinutes($TimeoutMinutes)

\    do {

\    $running = Get-Process -Name ccmsetup -ErrorAction SilentlyContinue

\    if (-not $running) {

\    Write-Log "No running ccmsetup.exe process found."

\    return $true

\    }



\    Write-Log "Waiting for ccmsetup.exe to finish. PID(s): $($running.Id -join ', ')"

\    Start-Sleep -Seconds 15

\    }

\    while ((Get-Date) -lt $deadline)



\    Write-Log "Timeout waiting for ccmsetup.exe to finish." "ERROR"

\    return $false

}



function Invoke-ClientReinstall {

\    if (\[string]::IsNullOrWhiteSpace($SiteCode) -or \[string]::IsNullOrWhiteSpace($ManagementPoint)) {

\    Write-Log "-ReinstallClient was specified, but SiteCode or ManagementPoint is missing." "ERROR"

\    exit 4

\    }



\    $localCcmSetup = Join-Path $env:windir "CCMSetup\ccmsetup.exe"



\    if (Test-Path $localCcmSetup) {

\    Write-Log "Uninstalling existing ConfigMgr client before reinstall."

\    \[void](Invoke-LoggedProcess -FilePath $localCcmSetup -ArgumentList @("/uninstall") -TimeoutMinutes 45)

\    \[void](Wait-ForCcmSetupToFinish -TimeoutMinutes 45)

\    Start-Sleep -Seconds 10

\    }

\    else {

\    Write-Log "Local ccmsetup.exe not found for uninstall. Continuing with install attempt." "WARN"

\    }



\    $installCcmSetup = Get-InstallCcmSetupPath

\    if (-not $installCcmSetup) {

\    exit 2

\    }



\    $installArgs = Build-CcmSetupArguments

\    Write-Log "Installing ConfigMgr client after WMI/MOF repair."

\    $installExit = Invoke-LoggedProcess -FilePath $installCcmSetup -ArgumentList $installArgs -TimeoutMinutes $InstallTimeoutMinutes -WorkingDirectory (Split-Path $installCcmSetup -Parent)



\    if ($installExit -eq 3010) {

\    $Script:RebootRecommended = $true

\    }

\    elseif ($installExit -ne 0) {

\    Write-Log "ccmsetup.exe returned non-zero exit code: $installExit" "WARN"

\    }



\    \[void](Wait-ForCcmSetupToFinish -TimeoutMinutes $InstallTimeoutMinutes)

}



function Test-ConfigMgrClientBasicHealth {

\    $ok = $true



\    $ccmExec = Get-Service -Name CcmExec -ErrorAction SilentlyContinue

\    if (-not $ccmExec) {

\    Write-Log "CcmExec service not found." "ERROR"

\    $ok = $false

\    }

\    elseif ($ccmExec.Status -ne "Running") {

\    Write-Log "CcmExec exists but is not running. Current state: $($ccmExec.Status)" "WARN"

\    try {

\    Start-Service -Name CcmExec -ErrorAction Stop

\    $ccmExec.WaitForStatus("Running", "00:02:00")

\    Write-Log "CcmExec started successfully." "SUCCESS"

\    }

\    catch {

\    Write-Log "Failed to start CcmExec. Error: $($_.Exception.Message)" "ERROR"

\    $ok = $false

\    }

\    }

\    else {

\    Write-Log "CcmExec service is running." "SUCCESS"

\    }



\    try {

\    Get-CimInstance -Namespace "root\ccm" -ClassName "SMS_Client" -ErrorAction Stop | Out-Null

\    Write-Log "WMI check passed: root\ccm:SMS_Client is accessible." "SUCCESS"

\    }

\    catch {

\    Write-Log "WMI check failed for root\ccm:SMS\_Client. Error: $($\_.Exception.Message)" "ERROR"

\    $ok = $false

\    }



\    return $ok

}



\# Main

New-Log

Write-Log "========== SCCM Client Repair - Level 3 WMI/MOF started =========="

Write-Log "Log file: $Script:LogFile"

Write-Log "MofMode: $MofMode"

Write-Log "AllowRepositoryReset: $AllowRepositoryReset"

Write-Log "IncludeUninstallMofs: $($IncludeUninstallMofs.IsPresent)"

Write-Log "ReinstallClient: $($ReinstallClient.IsPresent)"



if (-not (Test-IsAdmin)) {

\    Write-Log "Script is not running elevated. Exiting." "ERROR"

\    exit 3

}



Write-Log "Stopping ConfigMgr client service if present."

Stop-ServiceIfPresent -Name "CcmExec"



Write-Log "Performing initial WMI repository verification/salvage/reset sequence."

Repair-WmiRepositoryIfNeeded



Write-Log "Disabling Winmgmt startup before WBEM registration."

try {

\    Set-Service -Name Winmgmt -StartupType Disabled -ErrorAction Stop

\    Write-Log "Winmgmt startup type set to Disabled."

}

catch {

\    Write-Log "Failed to set Winmgmt startup type to Disabled. Error: $($_.Exception.Message)" "WARN"

}



Write-Log "Stopping Winmgmt and dependent services."

Stop-ServiceIfPresent -Name "Winmgmt"



Write-Log "Registering WBEM DLL files."

Register-WbemDlls



Write-Log "Registering WMI executables."

Register-WmiExecutables



Write-Log "Restoring Winmgmt startup type to Automatic."

try {

\    Set-Service -Name Winmgmt -StartupType Automatic -ErrorAction Stop

\    Write-Log "Winmgmt startup type set to Automatic." "SUCCESS"

}

catch {

\    Write-Log "Failed to set Winmgmt startup type to Automatic. Error: $($_.Exception.Message)" "ERROR"

}



$wmiStarted = Start-ServiceIfPresent -Name "Winmgmt"

if (-not $wmiStarted) {

\    Write-Log "Winmgmt could not be started. Deep repair cannot continue safely." "ERROR"

\    exit 5

}



Start-Sleep -Seconds 10



Write-Log "Compiling MOF/MFL files."

Invoke-MofRepair



Write-Log "Final WMI repository verification."

\[void](Test-WmiRepository)



if ($ReinstallClient) {

\    Invoke-ClientReinstall



\    Write-Log "Waiting 30 seconds before ConfigMgr validation."

\    Start-Sleep -Seconds 30



\    $healthy = Test-ConfigMgrClientBasicHealth



\    if ($healthy -and $Script:RebootRecommended) {

\    Write-Log "Level 3 deep repair completed. Basic validation passed. Reboot recommended." "SUCCESS"

\    exit 3010

\    }

\    elseif ($healthy) {

\    Write-Log "Level 3 deep repair completed. Basic validation passed." "SUCCESS"

\    exit 0

\    }

\    else {

\    Write-Log "Level 3 deep repair completed, but ConfigMgr validation failed." "ERROR"

\    exit 1

\    }

}

else {

\    Write-Log "Level 3 WMI/MOF repair completed without client reinstall. Reboot is recommended before further validation." "SUCCESS"

\    exit 3010

}
