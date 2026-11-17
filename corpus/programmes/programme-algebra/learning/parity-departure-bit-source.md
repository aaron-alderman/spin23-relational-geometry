# Compare reuse with a packed source

The [compact observation replay](parity-departure-compact.md)
saved bytes against a source that used one byte per label.
The [new plan](parity-departure-bit-source-plan.json) packs
the 5,001 binary labels into **626 bytes**, keeping the same
128-label chunk boundaries. The [preparation receipt](parity-departure-bit-source-prepared.json)
hashes every packed chunk. A full source chunk takes 16
bytes. A saved observation block takes 32 bytes because
it records known positions and label values.

The cold scan verifies packed chunks as each question needs
them. The eager scan can still read multiple saved blocks
to certify windows before visiting the source. It skips
that step if those saved bytes reach the cost of scanning
the full relevant source. The guarded scan requires each
complete saved block to cost less than the corresponding
source chunk. The known sizes route every guarded lookup
to packed source without an observation-block read.

| Policy | Source reads | Saved block reads | Payload bytes | Extra observation index bytes per batch |
| --- | ---: | ---: | ---: | ---: |
| Packed cold | 2,627 | 0 | 41,682 | 0 |
| Packed eager | 2,582 | 100 | 44,162 | 19,378 |
| Packed guarded | 2,627 | 0 | 41,682 | 0 |

The packed cold scan cut payload by **87.5%** compared with
the previous cold scan's 333,281 bytes. It visited the same
chunks and returned the same count bounds on all **154
questions**. The eager policy used more payload on 25
questions and saved bytes on none. The [scoring receipt](parity-departure-bit-source-replay.json)
records all decisions, the common 11,935 metadata bytes
once per batch, and rejection of a damaged packed chunk.
The counters measure application reads from prepared files.

The saved layout transferred individual labels accurately.
Its extra position mask was valuable only while it could
avoid enough reads from the more expensive source. The
[change-index replay](departure-change-index.md) tests
whether storing label changes answers the same questions
more cheaply on sparse and denser traces.

With the earlier [compact store](parity-departure-compact.md)
available, save the packing output as the trusted receipt
before running the comparison.

```powershell
$runner = 'tooling/programme-algebra/measure-parity-bit-source.py'
python -B $runner $store --pack
python -B $runner $store --measure corpus/programmes/programme-algebra/learning/parity-departure-bit-source-prepared.json
```
