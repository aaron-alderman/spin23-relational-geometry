from pathlib import Path

path = Path('/var/lib/sourcery-workbench/claimipedia-20261023/received-state-v6/runtimes/application/2026-10-24-workspace-host-receiving-v3r8r4/algebra-first-process.json')
text = path.read_text()
needle = 'Each predecessor capability must remain exactly once as active or an immutable retained fossil'
index = text.find(needle)
print(text[max(0, index - 2600):index + 2200])
