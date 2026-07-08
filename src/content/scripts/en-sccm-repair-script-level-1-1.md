---
title: SCCM Repair script level 1
summary: |-2
     - Light repair
     - Runs `ccmrepair.exe`
     - Restarts `CcmExec`
     - Runs client health evaluation
     - Triggers machine policy retrieval/evaluation
     - Does not reset WMI or reinstall the client
locale: en
platform: x64
riskLevel: Low
lastReviewed: 2026-07-08T10:26:00.000+02:00
prerequisites:
  - Powershell
draft: false
---
<#

.SYNOPSIS

\    SCCM / MECM Client Repair - Level 1



.DESCRIPTION

\    Light repair script for an installed Configuration Manager client.



\    Actions:

\- Validates elevated/admin execution

\- Creates a detailed log

\- Checks Winmgmt and CcmExec service state

\- Runs ccmrepair.exe

\- Restarts CcmExec

\- Runs Configuration Manager Health Evaluation

\- Triggers Machine Policy retrieval/evaluation when possible

\- Validates root\ccm and SMS_Client availability



.EXIT CODES

\    0     Repair completed and basic validation passed

\    1     Repair ran but validation failed

\    2     ccmrepair.exe not found

\    3     Not running elevated/admin

\    3010  Repair completed, reboot recommended



.NOTES

\    Intended to be safe for normal enterprise use.

\    Does not reset WMI.

\    Does not uninstall/reinstall the client.

\#>



\[CmdletBinding()]

param(

\    \[string]$LogRoot = "$env:windir\Temp\ConfigMgrClientRepair",



\    \[int]$RepairTimeoutMinutes = 60,



\    \[switch]$SkipHealthEvaluation,



\    \[switch]$SkipPolicyTrigger

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

\    $Script:LogFile = Join-Path $LogRoot "Repair-ConfigMgrClient-Level1-$timestamp.log"

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



function Restart-CcmExecService {

\    $service = Get-Service -Name CcmExec -ErrorAction SilentlyContinue

\    if (-not $service) {

\    Write-Log "CcmExec service not found." "WARN"

\    return $false

\    }



\    try {

\    Write-Log "Restarting CcmExec service."

\    Stop-Service -Name CcmExec -Force -ErrorAction SilentlyContinue

\    Start-Sleep -Seconds 5

\    Start-Service -Name CcmExec -ErrorAction Stop



\    $service.WaitForStatus("Running", "00:02:00")

\    Write-Log "CcmExec service is running." "SUCCESS"

\    return $true

\    }

\    catch {

\    Write-Log "Failed to restart CcmExec. Error: $($_.Exception.Message)" "ERROR"

\    return $false

\    }

}



function Invoke-ClientHealthEvaluation {

\    $taskName = "\Microsoft\Configuration Manager\Configuration Manager Health Evaluation"



\    Write-Log "Attempting to run client health evaluation scheduled task."

\    $result = & schtasks.exe /Run /TN $taskName 2>&1

\    Write-Log "schtasks output: $result"



\    $ccmEval = Join-Path $env:windir "CCM\ccmeval.exe"

\    if (Test-Path $ccmEval) {

\    Write-Log "Also running ccmeval.exe directly."

\    \[void](Invoke-LoggedProcess -FilePath $ccmEval -TimeoutMinutes 30)

\    }

}



function Invoke-PolicyTrigger {

\    try {

\    $smsClient = Get-CimInstance -Namespace "root\ccm" -ClassName "SMS_Client" -ErrorAction Stop



\# Machine Policy Retrieval & Evaluation Cycle

\    Invoke-CimMethod -InputObject $smsClient -MethodName TriggerSchedule -Arguments @{

\    sScheduleID = "{00000000-0000-0000-0000-000000000021}"

\    } -ErrorAction Stop | Out-Null



\# Machine Policy Evaluation Cycle

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



\    $winmgmt = Get-Service -Name Winmgmt -ErrorAction SilentlyContinue

\    if (-not $winmgmt) {

\    Write-Log "Winmgmt service not found." "ERROR"

\    $ok = $false

\    }

\    elseif ($winmgmt.Status -ne "Running") {

\    Write-Log "Winmgmt service is not running. Current state: $($winmgmt.Status)" "WARN"

\    try {

\    Start-Service -Name Winmgmt -ErrorAction Stop

\    $winmgmt.WaitForStatus("Running", "00:01:00")

\    Write-Log "Winmgmt started successfully." "SUCCESS"

\    }

\    catch {

\    Write-Log "Failed to start Winmgmt. Error: $($_.Exception.Message)" "ERROR"

\    $ok = $false

\    }

\    }

\    else {

\    Write-Log "Winmgmt service is running." "SUCCESS"

\    }



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

Write-Log "========== SCCM Client Repair - Level 1 started =========="

Write-Log "Log file: $Script:LogFile"



if (-not (Test-IsAdmin)) {

\    Write-Log "Script is not running elevated. Exiting." "ERROR"

\    exit 3

}



$ccmRepair = Join-Path $env:windir "CCM\ccmrepair.exe"

if (-not (Test-Path $ccmRepair)) {

\    Write-Log "ccmrepair.exe not found at expected path: $ccmRepair" "ERROR"

\    exit 2

}



Write-Log "Initial ConfigMgr client validation:"

\[void](Test-ConfigMgrClientBasicHealth)



Write-Log "Running ccmrepair.exe."

$repairExitCode = Invoke-LoggedProcess -FilePath $ccmRepair -TimeoutMinutes $RepairTimeoutMinutes



if ($repairExitCode -ne 0) {

\    Write-Log "ccmrepair.exe returned non-zero exit code: $repairExitCode" "WARN"

\    $Script:RebootRecommended = $true

}



\[void](Restart-CcmExecService)



if (-not $SkipHealthEvaluation) {

\    Invoke-ClientHealthEvaluation

}

else {

\    Write-Log "Skipping client health evaluation because -SkipHealthEvaluation was specified." "WARN"

}



Start-Sleep -Seconds 10



if (-not $SkipPolicyTrigger) {

\    \[void](Invoke-PolicyTrigger)

}

else {

\    Write-Log "Skipping policy trigger because -SkipPolicyTrigger was specified." "WARN"

}



Write-Log "Final ConfigMgr client validation:"

$healthy = Test-ConfigMgrClientBasicHealth



if ($healthy -and $Script:RebootRecommended) {

\    Write-Log "Level 1 repair completed. Basic validation passed. Reboot recommended." "SUCCESS"

\    exit 3010

}

elseif ($healthy) {

\    Write-Log "Level 1 repair completed. Basic validation passed." "SUCCESS"

\    exit 0

}

else {

\    Write-Log "Level 1 repair completed, but validation failed. Escalate to Level 2." "ERROR"

\    exit 1

}
