---
title: SCCM Repair script level 2
summary: |-2
     - Controlled reinstall
     - Supports explicit uninstall/reinstall or `/forceinstall`
     - Requires `-SiteCode` and `-ManagementPoint`
     - Optional FSP and PKI parameters
     - Does not reset WMI or perform MOF repair
locale: en
platform: Win10/Win11
riskLevel: Low
lastReviewed: 2026-07-08T10:25:00.000+02:00
prerequisites:
  - Powershell
draft: false
---
<#

.SYNOPSIS

\    SCCM / MECM Client Repair - Level 2



.DESCRIPTION

\    Controlled reinstall script for the Configuration Manager client.



\    Actions:

\- Validates elevated/admin execution

\- Optionally runs ccmrepair.exe first

\- Uninstalls the existing client using ccmsetup.exe /uninstall

\- Waits for uninstall activity to finish

\- Optionally reboots if requested and required

\- Reinstalls the client using ccmsetup.exe with site-specific properties

\- Validates CcmExec and root\ccm:SMS_Client

\- Triggers Machine Policy retrieval/evaluation



.PARAMETER SiteCode

\    ConfigMgr site code, for example P01.



.PARAMETER ManagementPoint

\    Management point FQDN or URL.

\    Examples:

\    mp01.contoso.com

\    https://mp01.contoso.com



.PARAMETER ClientSource

\    Folder containing ccmsetup.exe.

\    Example:

\    \\CM01.contoso.com\SMS_P01\Client



.PARAMETER FallbackStatusPoint

\    Optional fallback status point FQDN.



.PARAMETER UsePKICert

\    Adds /UsePKICert to ccmsetup.exe.



.PARAMETER InstallationProperties

\    Additional raw client installation properties.

\    Example:

\    @("DNSSUFFIX=contoso.com","CCMLOGMAXSIZE=5242880")



.PARAMETER ReinstallMode

\    UninstallReinstall = explicit uninstall first, then install.

\    ForceInstall      = use ccmsetup.exe /forceinstall.



.EXIT CODES

\    0     Reinstall completed and basic validation passed

\    1     Reinstall ran but validation failed

\    2     Missing ccmsetup.exe

\    3     Not running elevated/admin

\    4     Required parameter missing

\    3010  Reinstall completed, reboot recommended



.NOTES

\    Does not reset WMI.

\    Does not perform MOF repair.

\    Use Level 3 for WMI/MOF repair.

\#>



\[CmdletBinding()]

param(

\    \[Parameter(Mandatory = $true)]

\    \[ValidatePattern("^[A-Za-z0-9]{3}$")]

\    \[string]$SiteCode,



\    \[Parameter(Mandatory = $true)]

\    \[string]$ManagementPoint,



\    \[string]$ClientSource,



\    \[string]$FallbackStatusPoint,



\    \[switch]$UsePKICert,



\    \[string[]]$InstallationProperties = @(),



\    \[ValidateSet("UninstallReinstall","ForceInstall")]

\    \[string]$ReinstallMode = "UninstallReinstall",



\    \[string]$LogRoot = "$env:windir\Temp\ConfigMgrClientRepair",



\    \[int]$UninstallTimeoutMinutes = 45,



\    \[int]$InstallTimeoutMinutes = 90,



\    \[switch]$RunCcmRepairFirst

)



Set-StrictMode -Version 2.0

$ErrorActionPreference = "Continue"



$Script:RebootRecommended = $false

$Script:LogFile = $null



function New-Log {

\    if (-not (Test-Path $LogRoot)) {

\    New-Item -Path $LogRoot -ItemType Directory -Force | Out-Null

\    }



\    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

\    $Script:LogFile = Join-Path $LogRoot "Repair-ConfigMgrClient-Level2-$timestamp.log"

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

\    \[string]$WorkingDirectory = $env:windir

\    )



\    if (-not (Test-Path $FilePath)) {

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



function Get-LocalCcmSetupPath {

\    $candidate = Join-Path $env:windir "CCMSetup\ccmsetup.exe"

\    if (Test-Path $candidate) {

\    return $candidate

\    }



\    $candidate = Join-Path $env:windir "CCM\ccmsetup.exe"

\    if (Test-Path $candidate) {

\    return $candidate

\    }



\    return $null

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



\    $local = Get-LocalCcmSetupPath

\    if ($local) {

\    return $local

\    }



\    Write-Log "No ClientSource provided and no local ccmsetup.exe found." "ERROR"

\    return $null

}



function Wait-ForCcmSetupToFinish {

\    param(\[int]$TimeoutMinutes = 45)



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



function Invoke-OptionalCcmRepair {

\    $ccmRepair = Join-Path $env:windir "CCM\ccmrepair.exe"

\    if (Test-Path $ccmRepair) {

\    Write-Log "Running ccmrepair.exe before Level 2 reinstall because -RunCcmRepairFirst was specified."

\    \[void](Invoke-LoggedProcess -FilePath $ccmRepair -TimeoutMinutes 60)

\    }

\    else {

\    Write-Log "ccmrepair.exe not found. Skipping pre-reinstall repair." "WARN"

\    }

}



function Build-CcmSetupArguments {

\    param(\[switch]$ForceInstall)



\    $args = New-Object System.Collections.Generic.List\[string]



\    if ($ForceInstall) {

\    $args.Add("/forceinstall")

\    }



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



function Invoke-PolicyTrigger {

\    try {

\    $smsClient = Get-CimInstance -Namespace "root\ccm" -ClassName "SMS_Client" -ErrorAction Stop



\    Invoke-CimMethod -InputObject $smsClient -MethodName TriggerSchedule -Arguments @{

\    sScheduleID = "{00000000-0000-0000-0000-000000000021}"

\    } -ErrorAction Stop | Out-Null



\    Invoke-CimMethod -InputObject $smsClient -MethodName TriggerSchedule -Arguments @{

\    sScheduleID = "{00000000-0000-0000-0000-000000000022}"

\    } -ErrorAction Stop | Out-Null



\    Write-Log "Triggered Machine Policy Retrieval/Evaluation cycles." "SUCCESS"

\    return $true

\    }

\    catch {

\    Write-Log "Could not trigger ConfigMgr policy cycles. Error: $($_.Exception.Message)" "WARN"

\    return $false

\    }

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

Write-Log "========== SCCM Client Repair - Level 2 started =========="

Write-Log "Log file: $Script:LogFile"

Write-Log "SiteCode: $SiteCode"

Write-Log "ManagementPoint: $ManagementPoint"

Write-Log "ReinstallMode: $ReinstallMode"



if (-not (Test-IsAdmin)) {

\    Write-Log "Script is not running elevated. Exiting." "ERROR"

\    exit 3

}



if (\[string]::IsNullOrWhiteSpace($SiteCode) -or \[string]::IsNullOrWhiteSpace($ManagementPoint)) {

\    Write-Log "SiteCode and ManagementPoint are required." "ERROR"

\    exit 4

}



if ($RunCcmRepairFirst) {

\    Invoke-OptionalCcmRepair

}



$installCcmSetup = Get-InstallCcmSetupPath

if (-not $installCcmSetup) {

\    exit 2

}



if ($ReinstallMode -eq "UninstallReinstall") {

\    $localCcmSetup = Get-LocalCcmSetupPath



\    if ($localCcmSetup) {

\    Write-Log "Uninstalling existing ConfigMgr client."

\    \[void](Invoke-LoggedProcess -FilePath $localCcmSetup -ArgumentList @("/uninstall") -TimeoutMinutes $UninstallTimeoutMinutes)

\    \[void](Wait-ForCcmSetupToFinish -TimeoutMinutes $UninstallTimeoutMinutes)

\    }

\    else {

\    Write-Log "Local ccmsetup.exe not found for uninstall. Continuing with install attempt." "WARN"

\    }



\    Start-Sleep -Seconds 10

\    $installArgs = Build-CcmSetupArguments

}

else {

\    $installArgs = Build-CcmSetupArguments -ForceInstall

}



Write-Log "Installing ConfigMgr client."

$installExit = Invoke-LoggedProcess -FilePath $installCcmSetup -ArgumentList $installArgs -TimeoutMinutes $InstallTimeoutMinutes -WorkingDirectory (Split-Path $installCcmSetup -Parent)



if ($installExit -eq 3010) {

\    $Script:RebootRecommended = $true

}

elseif ($installExit -ne 0) {

\    Write-Log "ccmsetup.exe returned non-zero exit code: $installExit" "WARN"

}



\[void](Wait-ForCcmSetupToFinish -TimeoutMinutes $InstallTimeoutMinutes)



Write-Log "Waiting 30 seconds before validation."

Start-Sleep -Seconds 30



$healthy = Test-ConfigMgrClientBasicHealth

if ($healthy) {

\    \[void](Invoke-PolicyTrigger)

}



if ($healthy -and $Script:RebootRecommended) {

\    Write-Log "Level 2 reinstall completed. Basic validation passed. Reboot recommended." "SUCCESS"

\    exit 3010

}

elseif ($healthy) {

\    Write-Log "Level 2 reinstall completed. Basic validation passed." "SUCCESS"

\    exit 0

}

else {

\    Write-Log "Level 2 reinstall completed, but validation failed. Escalate to Level 3." "ERROR"

\    exit 1

}
