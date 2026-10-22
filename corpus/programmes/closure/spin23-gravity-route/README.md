# Spin(2,3) gravity-route research checkpoint

Date: 2026-10-22

This checkpoint promotes the most informative results from the independent
`Spin(2,3)` toy-model search. It is a research-direction gate, not a claim that
the programme has derived gravity or replaced string theory.

## Corrected representation inventory

The active ten-dimensional carrier is **two copies of the vector 5**, not one
adjoint 10. With the completed scalar sectors, the finite module is

```text
94 * 1 + 10 * 5 + 10 + 14 = 168 dimensions.
```

Under the Lorentz subgroup this contains 105 scalar dimensions, twelve vector
4 copies, one bivector 6 and one symmetric traceless rank-two 9. Earlier
scratch calculations that labelled the active ten-dimensional carrier as an
adjoint, or reported the resulting Lorentz multiplicities differently, are
superseded by
[`spin23-active-state-two-vector-irrep-correction-v1.json`](../../../../evidence/data/spin23-active-state-two-vector-irrep-correction-v1.json).

The original active-active scalar seeds occupy only the Lorentz-vector pieces
of the 10 and 14 sectors. AdS coset translations do generate the missing
finite descendants:

- vector 4 to bivector 6 in the adjoint 10;
- vector 4 to scalar 1 plus symmetric traceless tensor 9 in the 14.

This is an exact representation-theoretic completion, but not yet a dynamics.
Finite covariantly constant zero-forms contain no generic local propagating
degrees of freedom.

## What the toy search rules out

The promoted calculations give five useful negative results.

1. The finite adjoint 10 is not a spin-2 Weyl module. It branches as `6 + 4`,
   whereas the four-dimensional Weyl tensor is `5 + 5`, and a scalar-valued
   adjoint also has the wrong form degree for a gravitational connection.
2. A connection made only as `g^-1 d g` contains Lorentz-connection and
   vierbein components, but its curvature and torsion vanish by the
   Maurer-Cartan identity. It is locally pure gauge.
3. Two generic vector-5 expectation values reduce the stabilizer to dimension
   three. Retaining `SO(1,3)` requires the two copies to be parallel in
   multiplicity space.
4. The simplest `SO(2,3)`-invariant two-vector Gram quartic cannot both be
   bounded and select the required aligned timelike vacuum. One sign is
   unstable at the aligned point; the other has a null runaway.
5. A fixed positive Cartan metric can stabilize the compact problem, but its
   common stabilizer with a timelike compensator is only `SO(3)`. Making that
   metric auxiliary does not remove the issue: finite extrema select a frame,
   while null directions can run to the noncompact boundary.

Candidate 48 is therefore not currently a gravity phase. Its vector-seed
Hessian is only residual-`U(1)` covariant; its five-dimensional moduli tangent
does not coincide with the `SO(4)` orbit tangent; and the omitted isotropic
response repair moves the vacuum. The frozen evidence records these numerical
obstructions and their tolerances, without promoting the large dependency
chain of exploratory scratch scripts as stable API.

## Surviving constructive route

The narrow viable route is a standard gauge-gravity extension with programme
data feeding it:

1. introduce an **independent adjoint-valued one-form** `A`;
2. retain one normalized vector combination as a constrained compensator;
3. use its four broken `SO(2,3)/SO(1,3)` directions as pure gauge;
4. impose or derive a multiplicity-space constraint that removes or aligns the
   orthogonal vector copy;
5. test a MacDowell-Mansouri/Stelle-West action and its linearized Einstein
   equations;
6. add the infinite Weyl zero-form tower only when local spin-2 propagation is
   required.

For one constrained vector, the constraint tangent has dimension four, the
gauge orbit has rank four, and their principal cosines are all one. Thus the
single compensator contributes no local physical scalar modes. The unresolved
input is the selection of one combination from the corrected two-vector
multiplicity.

This changes the research priority. Further scans of unconstrained scalar
potentials have low value until the independent connection, compensator
constraint algebra, and multiplicity selection are written explicitly.

## Published evidence

The 19 structured records in `evidence/data/` fall into four groups:

- representation correction and descendant maps;
- Candidate-48 Hessian, moduli and compensator obstructions;
- finite unfolded-module and spin-2 Weyl-tower diagnostics;
- connection, alignment, Cartan-metric and constrained-compensator toys.

The filenames all begin with `spin23-` and end in `-v1.json`. Each record
states its claim status, numerical or algebraic results, interpretation,
falsifiers and next branches.

## Reproduction

Nine standalone Python certificates were promoted under `verification/`.
They require NumPy and print a
single JSON result to standard output. From the repository root, for example:

```powershell
& .venv-alpaca/Scripts/python.exe verification/analyze/analyze_spin23_constrained_compensator_quotient.py
& .venv-alpaca/Scripts/python.exe verification/analyze/analyze_spin23_spin2_weyl_tower_gap.py
& .venv-alpaca/Scripts/python.exe verification/verify/verify_spin23_composite_cartan_connection.py
```

All nine certificates passed on 2026-10-22 with the repository's
`.venv-alpaca` interpreter. The root `.scratch_spin23_*` files remain
exploratory working material and are intentionally not part of this published
checkpoint.

## Next decisive test

Build the independent `SO(2,3)` connection plus one constrained compensator,
derive the gauge-fixed quadratic action, and verify that its physical spectrum
is exactly the massless graviton with no extra ghost or propagating
compensator. A failure there closes the present gravity route; a success would
justify coupling the programme's relational response sectors to it.
