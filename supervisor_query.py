import json
import sqlite3

path = "/var/lib/sourcery-workbench/claimipedia-20261023/received-state-v6/lanes/3cae7e9d7a695b37e4a7cf68.sqlite"
connection = sqlite3.connect("file:" + path + "?mode=ro", uri=True)
rows = connection.execute(
    "SELECT e.snapshot_id, s.created_at, e.path, e.kind, e.object_hash "
    "FROM entries e JOIN snapshots s ON s.id=e.snapshot_id "
    "WHERE e.path LIKE 'programme/runtime-package-control/%' "
    "ORDER BY s.created_at, e.path"
).fetchall()
print(json.dumps(rows))
