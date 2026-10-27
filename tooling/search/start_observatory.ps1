param(
  [int]$Port = 4178
)

$ErrorActionPreference = 'Stop'
$taskRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$taskState = Join-Path $taskRoot '.context-hub'
$taskHealth = "http://127.0.0.1:$Port/api/health"

$taskExisting = $null
try {
  $taskExisting = Invoke-RestMethod -Uri $taskHealth -TimeoutSec 2
} catch { }
if ($taskExisting.status -eq 'ok' -and $taskExisting.operator.writeProtected -eq $true) {
  [pscustomobject]@{ status = 'already-running'; url = "http://127.0.0.1:$Port"; persistence = $taskExisting.persistence } | ConvertTo-Json
  exit 0
}
if ($taskExisting.status -eq 'ok') {
  throw "An older unprotected Observatory is already using port $Port; stop it before starting the protected host."
}

New-Item -ItemType Directory -Force -Path $taskState | Out-Null
$taskTokenPath = Join-Path $taskState 'operator.token'
if (-not (Test-Path -LiteralPath $taskTokenPath)) {
  $taskBytes = New-Object byte[] 32
  $taskRng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
  try { $taskRng.GetBytes($taskBytes) } finally { $taskRng.Dispose() }
  $taskToken = ([BitConverter]::ToString($taskBytes) -replace '-', '').ToLowerInvariant()
  [System.IO.File]::WriteAllText($taskTokenPath, $taskToken)
}
$taskNode = (Get-Command node).Source
$taskProcess = Start-Process -FilePath $taskNode -ArgumentList @('tooling/search/observatory_server.mjs', '--port', "$Port", '--operator-token-file', $taskTokenPath, '--operator-id', 'context-hub.operator.local') -WorkingDirectory $taskRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $taskState 'observatory.stdout.log') -RedirectStandardError (Join-Path $taskState 'observatory.stderr.log') -PassThru
Set-Content -LiteralPath (Join-Path $taskState 'observatory.pid') -Value $taskProcess.Id -Encoding ascii

for ($taskAttempt = 0; $taskAttempt -lt 20; $taskAttempt += 1) {
  Start-Sleep -Milliseconds 250
  try {
    $taskStarted = Invoke-RestMethod -Uri $taskHealth -TimeoutSec 2
    if ($taskStarted.status -eq 'ok') {
      [pscustomobject]@{ status = 'started'; processId = $taskProcess.Id; url = "http://127.0.0.1:$Port"; persistence = $taskStarted.persistence; operatorId = $taskStarted.operator.id; writeProtected = $taskStarted.operator.writeProtected; tokenPath = $taskTokenPath } | ConvertTo-Json
      exit 0
    }
  } catch { }
}

throw "Context Hub Observatory did not become healthy; inspect .context-hub/observatory.stderr.log"
