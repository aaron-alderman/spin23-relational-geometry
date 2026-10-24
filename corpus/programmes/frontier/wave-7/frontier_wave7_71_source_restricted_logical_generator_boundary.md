# Frontier Wave 7.71 — the code has a coupled word, but not yet a reason to execute it

**Date:** 25 October 2026  
**Status:** exact restricted-group boundary; physical-control provenance remains open  
**Topic:** OT-017  
**Target:** FPT-009  
**Machine fixture:** [source-restricted logical-generator boundary](source_restricted_logical_generator_boundary_v1.json)  
**Certificate:** [finite-group verifier](../../../../verification/verify/verify_source_restricted_logical_generator_boundary.mjs)

## Why this audit was needed

The corpus contains several statements that are individually correct but easy to
collapse into one another:

1. two logical qutrits have abstract phase space \(\mathbb F_3^4\), whose full
   commutator-preserving group is \(Sp(4,\mathbb F_3)\);
2. the punctured Standard-Model charge words supply code-preserving diagonal
   logical shears;
3. a low-support word on five source-labelled fields realizes the missing
   mutual shear; and
4. arbitrary encoded Clifford compilation can realize the full group.

The unresolved question is not whether the matrices exist. It is which matrices
are forced by controls that the source construction itself supplies. Universal
compilation answers an existence question while erasing the provenance question.

## Four alphabets, four different reachable regions

The certificate freezes four nested control alphabets in the coordinate order
\((x_1,x_2,z_1,z_2)\) and enumerates their closures exactly.

| Alphabet | What is admitted | Group order | Orbit of a pure \(Z\) | Orbit of a pure \(X\) |
|---|---|---:|---:|---:|
| maximal source-visible | two charge-word self-shears and optional puncture swap | 18 | 2 | 6 |
| source-labelled compiled | the above plus the five-field mutual shear | 54 | 2 | 18 |
| imported local dualities | self-shears, local Fourier changes and swap, but no mutual shear | 1,152 | 16 | 16 |
| universal Clifford completion | self-shears, local Fourier changes, swap and mutual shear | 51,840 | 80 | 80 |

There are exactly \(3^4-1=80\) nonzero phase-space vectors. Only the final
alphabet is transitive on them and closes to the full \(Sp(4,\mathbb F_3)\).

The first row is an upper bound on what is visibly supplied: the diagonal
charge-word shears are source-derived, while the puncture swap is presently a
permitted relabelling rather than a demonstrated device operation. Removing the
swap makes the physically secure subgroup smaller, never larger.

## What the mutual word really changes

The five-field weight-\((3,3,2)\) construction is not empty numerology. Adding
its cross shear triples the closure from 18 to 54 and triples the pure-\(X\)
orbit from 6 to 18. It creates genuine coupling between the logical ports.

But every matrix in this shear-only closure preserves the \(X\) polarization,
up to exchanging the two ports. A pure \(Z\) vector therefore has only the
two-element swap orbit. The cross word couples the ports without changing what
counts as position and momentum. It is a real extension, not a complete
transport calculus.

The corpus has therefore found **a coupled logical operation**, but not yet the
physical law that selects it or a source-native operation that changes
polarization.

## Why the order-1,152 near miss matters

If local Fourier or Legendre transformations are granted but the cross shear is
withheld, the closure has order 1,152. This is the exact imprimitive subgroup

\[
\bigl(SL(2,\mathbb F_3)\times SL(2,\mathbb F_3)\bigr)\rtimes S_2.
\]

It can fully transform either logical port and exchange the ports, but it
retains the decomposition into two one-port symplectic planes. Its pure-vector
orbit has size 16, not 80. Two complete local calculi plus exchange are still
not the relational two-port calculus.

This is the finite operational version of the Jordan lesson: two self-relations
do not supply the mutual relation. It is also the Lie-side warning: a large
transformation group can remain trapped inside a decomposition that the desired
carrier must break.

## The exact provenance boundary

Full closure needs two qualitatively different additions:

- **mutual coupling**, represented by the cross shear; and
- **polarization change**, represented here by local Fourier operations.

Both are mathematically available in the corpus. Neither is yet jointly derived
as a calibrated control law of one physical carrier. The scalar/Jordan branch
supplies a positive response with a mutual entry, but its integer normalization
is not canonical for a noncompact scalar. Boundary Legendre duality is a
canonical change of description, but is not automatically a dynamical gate.
The code branch supplies exact compiled Clifford representatives, but an
arbitrary compiler is precisely what OT-017 forbids as evidence of source
selection.

The result is therefore a typed square with one missing physical diagonal:

\[
\begin{array}{ccc}
\text{charge-word code} & \xrightarrow{\text{compiled}} &
\text{cross shear in }Sp(4,\mathbb F_3)\\
\downarrow\text{physical controls?} && \downarrow\text{lift/normalization?}\\
\text{one carrier} & \xrightarrow{\text{measured}} &
\text{coupling plus polarization change.}
\end{array}
\]

The upper arrow is exact. The lower row is the frontier.

## Decision and practical experiment

OT-017 remains open, but its algebraic search phase is closed for the present
alphabet. Do not search for another abstract generator of
\(Sp(4,\mathbb F_3)\). Build or identify one carrier with two independently
calibrated controls:

1. a mutual interaction whose logical action is the certified cross shear;
2. a polarization-changing pulse, deformation, measurement or duality whose
   logical action is a local Fourier generator;
3. leakage readout outside the code space; and
4. held-out word predictions using only those calibrated controls.

The decisive record is not full process tomography. Stabilizer witnesses can
test the images of the four logical Pauli basis elements, while leakage and
control-removal runs test whether the declared carrier really supplies each
generator. The group certificate predicts reachable and forbidden orbits before
the device is run.

**Closure condition:** the restricted physical alphabet generates a nontrivial
group and predicts held-out words and forbidden transitions without a universal
compiler.

**Kill test:** full closure appears only after arbitrary encoded Clifford gates,
an unimplemented cross word or a passive chart change is silently admitted.

**Reopen datum:** one carrier supplies both a calibrated mutual control and a
calibrated polarization-changing control, with the certified logical actions and
measured leakage.

## Implication

This is a useful narrowing, not a disappointment. The algebra has reduced a
vague search for “the symmetry” to two pieces of engineering. If both controls
can be made on one carrier, the result is a source-restricted logical laboratory
for the Jordan–Lie passage. If the cross operation cannot be physically selected,
the five-field word remains an exact compatibility rather than new physics. If
polarization change cannot be made dynamical, the reachable theory remains a
parabolic response sector rather than the full transport group. Either outcome
locates the boundary honestly.

## Reproduction

~~~powershell
node verification/verify/verify_source_restricted_logical_generator_boundary.mjs
~~~

Expected result: `PASS`, with exact closure orders 18, 54, 1,152 and 51,840,
and pure-vector orbit sizes 2/6, 2/18, 16/16 and 80/80 respectively.

