# Frontier Wave 7.217: cutoff-two Leech charge-shell geometry

## Exact orbit construction

Wave 7.216 proved a uniform 0.02 charging floor in the inversion-odd sector.
This packet asks whether resolving the minimum-charge shell can cheaply
strengthen it. The two integral (C_2.Co_1) generators already stored from
the Nebe--Sloane catalogue are applied to a norm-four basis vector. The orbit
closes after 21 rounds at exactly 196,560 distinct vectors, matching the
catalogue kissing number. Every generator preserves the integral Gram matrix.

The orbit is transported through the exact integral Gram-first hardware basis
and the declared optimized permutation. At charge cutoff two, 196,512
norm-four vectors remain and only 48 are excluded. Every retained norm is
checked by integer arithmetic, and the retained shell is inversion closed.

## Shell hopping graph

Two retained charges are joined when they differ by one allowed unit-charge
hop, the off-diagonal action of the cosine potential. The exact graph has:

- 196,512 vertices;
- 75,856 undirected edges;
- 110,242 isolated vertices;
- mean degree 0.7720241003;
- maximum degree 12.

The complete one-hop census contains 9,060,320 edges from norm four to other
charge shells and 220,544 hops blocked by the coordinate cutoff. Of the
exterior hops, 1,592,382 reach norm six and 3,339,938 reach norm eight. There
are no norm-two targets, as required by Leech rootlessness. Thirty-two hops
reach the zero vector from coordinate minimal vectors; their amplitudes
cancel between (q) and (-q) in the inversion-odd sector.

On the norm-four shell the projected potential is

\[
P_4VP_4=24I-\frac12A_4.
\]

Gershgorin therefore gives

\[
P_4VP_4\ge18P_4,
\qquad
P_4HP_4\ge18.02P_4
\]

at (U/u=0.01).

## Physical implication

The odd state near energy 4.2 is not a wavefunction confined to the cheapest
charge shell. The shell is overwhelmingly disconnected under a single cosine
hop and has a very high restricted energy. Low energy is produced by coherent
motion between charge-norm shells. Consequently a refined lower operator that
keeps only the norm-four projector discards the mechanism it needs to bound.
The next separator construction must preserve inter-shell hopping—for example
through a shell-block Jacobi operator, tensor-network residual block, or
shifted inertia.

The first principled shell compression is therefore the odd
(4\leftrightarrow6\leftrightarrow8) complex with the zero-charge channel
removed by parity. The edge census fixes its required connectivity before any
averaging or fitted shell coupling is allowed.

The 18.02 number is a bound on the projected shell block, not on the full
Hamiltonian: coupling to higher charge shells remains active and can lower
eigenvalues. This packet therefore supplies an exact physical dictionary and
a scoped no-go for shell confinement, not a completed odd-sector enclosure.

## Reproduce

```powershell
$env:PYTHONPATH="$(Resolve-Path '.tmp-scipy-runtime');$(Resolve-Path '.tmp-quimb')"
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts/enumerate-leech-cutoff-charge-shells.py --method orbit --write
node verification/verify/verify_leech_cutoff_charge_shells.mjs
```

## Evidence

- `evidence/data/leech-cutoff-charge-shell-enumeration-v1.json`
- `evidence/data/leech-catalogue-automorphism-generators-v1.json`
- `scripts/enumerate-leech-cutoff-charge-shells.py`
- `verification/verify/verify_leech_cutoff_charge_shells.mjs`

## Corpus links

- [Exact inversion-odd charging floor](frontier_wave7_216_leech_odd_charging_floor.md)
- [Explicit Leech interaction matrix](frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
- [Conway-group Clifford lift](frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
- [Targeted second odd-sector enrichment](frontier_wave7_215_leech_odd_targeted_second_enrichment.md)
