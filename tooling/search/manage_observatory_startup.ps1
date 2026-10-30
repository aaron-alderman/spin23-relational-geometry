[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param(
  [ValidateSet('Status', 'Install', 'Uninstall')]
  [string]$Action = 'Status',
  [int]$Port = 4178,
  [string]$RepositoryRoot
)

$ErrorActionPreference = 'Stop'
$taskName = 'Spin23-Context-Hub-Observatory.cmd'
$taskStartup = [Environment]::GetFolderPath('Startup')
$taskLauncher = Join-Path $taskStartup $taskName

if ($Action -eq 'Status') {
  [pscustomobject]@{
    installed = Test-Path -LiteralPath $taskLauncher
    launcher = $taskLauncher
    command = if (Test-Path -LiteralPath $taskLauncher) { [System.IO.File]::ReadAllText($taskLauncher) } else { $null }
  } | ConvertTo-Json
  exit 0
}

if ($Action -eq 'Uninstall') {
  if ((Test-Path -LiteralPath $taskLauncher) -and $PSCmdlet.ShouldProcess($taskLauncher, 'Remove Context Hub logon launcher')) {
    Remove-Item -LiteralPath $taskLauncher -Force
  }
  [pscustomobject]@{ installed = $false; launcher = $taskLauncher } | ConvertTo-Json
  exit 0
}

if (-not $RepositoryRoot) {
  $RepositoryRoot = Join-Path $PSScriptRoot '..\..'
}
$taskRoot = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$taskGitMarker = Join-Path $taskRoot '.git'
$taskStartScript = Join-Path $taskRoot 'tooling\search\start_observatory.ps1'
if (-not (Test-Path -LiteralPath $taskStartScript -PathType Leaf)) {
  throw "RepositoryRoot does not contain tooling/search/start_observatory.ps1: $taskRoot"
}
if ([System.IO.File]::ReadAllText($taskStartScript) -notmatch '--operator-token-file') {
  throw "The target checkout does not yet contain the protected Observatory launcher. Merge this feature before installing startup: $taskRoot"
}
if (Test-Path -LiteralPath $taskGitMarker -PathType Leaf) {
  throw "Refusing durable startup from a linked or managed worktree. Merge the feature into a stable primary checkout and rerun with -RepositoryRoot pointing there."
}
if ($taskRoot -match '[\\/]\.codex[\\/]worktrees[\\/]') {
  throw "Refusing durable startup from a managed Codex worktree: $taskRoot"
}
if ($Port -lt 1 -or $Port -gt 65535) { throw 'Port must be from 1 to 65535.' }

$taskPowerShell = Join-Path $PSHOME 'powershell.exe'
$taskCommand = "@echo off`r`nstart `"`" /min `"$taskPowerShell`" -NoProfile -ExecutionPolicy Bypass -File `"$taskStartScript`" -Port $Port`r`n"
if ($PSCmdlet.ShouldProcess($taskLauncher, "Install Context Hub logon launcher for $taskRoot")) {
  [System.IO.File]::WriteAllText($taskLauncher, $taskCommand, [System.Text.Encoding]::ASCII)
}
[pscustomobject]@{
  installed = -not $WhatIfPreference
  launcher = $taskLauncher
  repositoryRoot = $taskRoot
  port = $Port
  writeProtection = 'generated bearer token under ignored .context-hub/operator.token'
} | ConvertTo-Json
