# Account for the cost of reopening saved observations

The [shifted-window replay](parity-departure-overlap.md) cut
new label inspections by retaining observations in memory.
The [persistence plan](parity-departure-persistence-plan.json)
tests the same 154 questions in a separate invocation, with
an empty application cache for every policy and question.
Preparation packs the 5,001 decoded labels into one byte each
and records a hash for every 128-label chunk. It also saves
the original questions' observations as five-byte index and
label records. The [trusted preparation receipt](parity-departure-persistence-prepared.json)
anchors the manifest and observation-file hashes.

The cold scan verifies chunks as it needs them. A second
policy reopens the saved observations and checks each one
against the chunked source before using it. A third checks
the saved file against the trusted preparation receipt, then
verifies only the source chunks it needs to finish the query.
All three rebuild the new window bounds. All decisions match
the independent shifted-window counts. The corruption
controls reject a changed saved observation and a changed
source chunk. [Replay and read counts](parity-departure-persistence-replay.json)

| Policy | Source chunk reads | Source bytes | Saved observation bytes | Total payload bytes |
| --- | ---: | ---: | ---: | ---: |
| Cold | 2,627 | 333,281 | 0 | 333,281 |
| Recheck each saved observation | 3,400 | 432,225 | 898,655 | 1,330,880 |
| Verify saved file against its pinned hash | 1,578 | 199,009 | 898,655 | 1,097,664 |

The pinned policy answered 37 questions without a source
chunk read and used fewer total bytes on 20 questions.
Across the full replay it used **3.29 times** the payload
of a cold scan. The rechecked policy read 3,165 chunks
before asking the new question. Both saved-file policies
reopened a context's entire observation file per query.
The counters measure application reads and keep the
common 8,110 metadata bytes separate. The OS can serve
those reads from its page cache.

Three saved files individually exceed the entire packed
trace. Even if one of those files settled a question by
itself, reading it would cost more bytes than any cold
scan of this store. That gives the planner a check it
can make from the manifest before opening a saved file.
The [compact replay](parity-departure-compact.md) tests
selectively readable blocks and charges their verification
payload.

```powershell
$runner = 'tooling/programme-algebra/measure-parity-persistence.py'
python -B $runner $store --prepare $parityArchive
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/parity-departure-persistence-prepared.json
```
