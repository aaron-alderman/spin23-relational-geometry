# Typed Spin(2,3) candidate-action pilot

This directory turns one existing corpus proposal into a small executable gate
graph.  It is deliberately not a claim that Spin(2,3) is a fundamental
symmetry.

The candidate is the effective action `S_v1` from document 1199.  Its
anomaly-free `U(1)_X`, charge-three flavon and BF descent are retained.  The
pilot then asks whether that action can pass, without prose-only substitutions,
through:

1. the four-dimensional action and its declared field types;
2. the `S^1/Z_2` reduction to a 2+1-dimensional level-three BF defect;
3. physical-state, anomaly, ghost and positivity checks;
4. recovery of the chiral Standard Model with nonzero flavour CP violation;
5. a conserved-stress spectral quotient;
6. a measurable two-current/two-probe response.

Run the certificate from the repository root:

```powershell
node scripts/verify_spin23_candidate_action_pilot.mjs
```

## Honest present result

The candidate passes a small exact/implemented backbone: a typed action is
available, the displayed Standard Model plus three right-handed-neutrino charge
assignment is anomaly-free, the charge-three compact Higgs phase descends to a
level-three BF theory, and a positive conserved two-probe spectral kernel has
an `H_2(R)` response geometry.

That backbone does **not** connect end to end.  The action takes its family
projector and neutral mixing maps as input; no physical-state selector derives
the observed chiral module; the full Lorentzian ghost/unitarity calculation is
absent; no microscopic defect-to-stress operator produces a third response
direction; and no Standard Model spectral density has been calculated.

The pilot therefore has `physicalAdmission: false` by construction.  Missing
gates are first-class graph nodes, not comments.

## Branch-discriminating target

For a positive two-probe spectral response `C(omega)`, define

```text
rho(omega) = det C(omega) / tr(C(omega))^2.
```

Fixed conserved probes in a parity-even Lorentz-invariant vacuum obey an exact
two-form-factor plane relation `L(C)=0`; a conformal response collapses further
to a ray.  The candidate's genuinely discriminating target is therefore not
mere positivity or `rho > 0`.  It is a reproducible, positivity-preserving
third response direction whose plane residual changes with a specified
`Z_3` defect holonomy while conventional contact terms and probe changes are
held fixed.

The action currently does not derive that coupling.  Consequently the target
is `specified`, not `predicted`.  A null result leaves Spin(2,3) as ambient
response geometry; a positive result would justify calculating whether an
emergent covariance acts on the physical response family.

## Status vocabulary

- `implemented`: executable representation or certificate exists.
- `exact`: follows algebraically under declared assumptions.
- `conditional`: valid only after an explicit upstream assumption is supplied.
- `missing`: required evidence or dynamics does not exist in the corpus.

No `conditional` or `missing` node is allowed to satisfy an admission gate.

