# Bypass the eviction solver when a bound settles it

The [bundle replay](departure-cache-bundle.md) saved
read bytes using frequency-weighted eviction sets.
The [timing plan](departure-cache-bundle-fast-plan.json)
checks three exact shortcuts against the full solver:

- If even removing all but the lightest entry frees
  too little space, the entire pool is required.
- If the entries have equal weights, take the needed
  number of lowest-cost entries, applying the age tie.
- If one feasible entry costs strictly less than the
  two cheapest entries combined, no larger bundle
  can beat it. An equality goes to the full solver
  so its excess-space and age ties still apply.

The [benchmark receipt](departure-cache-bundle-fast-benchmark.json)
captures all **62,574** decisions from the archived
reuse-weighted holdout. Every shortcut selects exactly
the full solver's eviction set. The solver still runs
on 796 decisions. Dynamic states examined fall from
**299,071 to 16,049**. All replayed read counts and
answers match the full policy.

On the captured decisions, the median selection loop
takes **223.9 ms** for the full solver and **135.3 ms**
with the shortcuts. This eight-round comparison uses
the same inputs in the same order and charges selection
only.

| Warm-file verified replay | Recency | Full bundle | Guarded bundle | Bytes read, recency → bundle |
| --- | ---: | ---: | ---: | ---: |
| Tight-cache parity | 52.0 ms | 59.4 ms | 61.2 ms | 9,890 → 7,754 |
| Delft partition | 79.8 ms | 84.9 ms | 83.8 ms | 74,895 → 68,575 |

The table gives five-sample medians from two selected
streams, with an empty application cache for each run.
It includes verification and reads, with filesystem
caching left in place. Both bundle policies read the
same bytes. The guarded solver shortened selection
across all captured decisions, but the warm-file
end-to-end result remained slower than recency on
these two streams.

The next test is to price the read latency at which
those saved reads repay the selection cost. Use the
actual miss counts and separate source, directory and
change reads. Then test a controlled delay at that
break-even with the same archived questions, keeping
the delay experiment separate from evidence about the
real storage device.

Run with the prepared [partition store](departure-change-partition.md).
The flag adds timings to the deterministic replay.

```powershell
python -B tooling/programme-algebra/benchmark-departure-cache-bundles.py $store
python -B tooling/programme-algebra/benchmark-departure-cache-bundles.py $store --benchmark
```
