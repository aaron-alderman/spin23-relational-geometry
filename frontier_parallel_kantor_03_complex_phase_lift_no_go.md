# Frontier Parallel 4b: Phase Doubling Closes the Metric-Only Physical Kantor Completion

**Date:** 18 October 2026  
**Status:** exhaustive basis no-go within the complete real-coefficient, dagger-built paired metric family

## Result

The real CP-compatible contact completion is mathematically genuine, but it does not survive restoration of the complex phase directions required by the electroweak lepton module.

All four real projective Kantor rays were lifted to (mathbb C^2), treated correctly as a four-real-dimensional space, by replacing transpose contractions with dagger contractions in the paired six-word formula. Both rays with nonzero (K) fail the Kantor identities. The only ray that passes both identities is the (K=0) Hermitian Jordan triple.

Therefore:

\[
\boxed{
\text{complex unitary gauge covariance}
+\text{paired CP functoriality}
+\text{metric-only cubic product}
+\text{Kantor contact layer}
\quad\text{are incompatible.}
}
\]

The real contact (Spin(2,3)) model survives only after a selected real structure. It is not intrinsically present on the full complex lepton carrier in this family.

## 1. Lift tested

For real coefficients (p,d,e), define

\[
\begin{aligned}
\widehat V(x,y,z)={}&p(xy^\dagger z+zy^\dagger x)\\
&+d(xz^\dagger y+yz^\dagger x)\\
&+e(yx^\dagger z+zx^\dagger y).
\end{aligned}
\]

Every word (P Q^\dagger R) is separately covariant under the simultaneous left/right unitary action on a rectangular matter module. Pairing a word with its reverse also makes dagger/CP transport well typed between opposite faces.

Any product in this complex family restricts on the entrywise-real slice to the classified real family. It must therefore lie on one of the four real Kantor rays before it can possibly satisfy the identities on (mathbb C^2). Testing those four rays is exhaustive for the stated family.

## 2. Results

| real ray ((a,b,c)) | real (K\ne0)? | first identity on (mathbb C^2) | second identity on (mathbb C^2) |
|---|---:|---:|---:|
| ((1,0,0)) | yes | fail | fail |
| ((1,1,0)) | no | pass | pass |
| ((1,1,-1)) | no | fail | pass |
| ((3,1,-3)) | yes | fail | fail |

The distinguished real ray still outer-symmetrizes to the Hermitian Jordan triple on all (4^3=64) phase-doubled basis triples. What fails is the coherence of its oriented residue.

For ((1,0,0)), the first explicit first-identity failure occurs entirely on one complex line:

\[
u=x=z=e_0,\qquad v=e_0,\qquad y=i e_0.
\]

The two sides are (2i e_0) and (-2i e_0). The imaginary phase reverses the required sign. The second identity also has an explicit one-line counterexample in the certificate.

## 3. Sharp compatibility theorem

The result combines with the real classification as follows.

1. Restriction to the real slice forces a candidate onto one of four rays.
2. Two rays have (K\ne0).
3. Direct phase-doubled audits eliminate both.
4. The sole fully surviving ray is ((1,1,0)), the Hermitian Jordan triple, for which (K=0).

Hence no real-coefficient dagger-word product in the full paired metric family can meet all four requirements.

This is sharper than the earlier canonical-product obstruction: it covers every product made from the six local cubic dagger words with no additional spurion.

## 4. Meaning for chirality and CP

The obstruction appears exactly when the imaginary partner (ie_0) is restored. The real slice erases the phase whose conjugation distinguishes which argument carries the dagger. On the full chiral complex module, those placements are physically inequivalent, and the cancellation responsible for the real Kantor identity fails.

This makes the programme's tradeoff precise:

\[
\begin{array}{c}
\text{selected real slice}\Rightarrow K\ne0\text{ and contact }Spin(2,3),\\
\text{full complex gauge module}\Rightarrow\text{Hermitian Jordan triple and }K=0.
\end{array}
\]

The real structure cannot be assumed. It must be derived from CP breaking, a Majorana/Higgs background, a boundary condition, or another physical selector.

## 5. Remaining exits

The metric-only route is closed, but three non-metric exits remain:

1. an independently derived complex structure or CP-odd spurion enters the product;
2. a Higgs or Majorana background selects a real subbundle before ternary closure;
3. a nonlocal/retarded product uses causal ordering rather than a local dagger contraction.

Each exit changes the hypothesis and must be tested as a new branch. A hand-chosen real basis is not a solution.

## 6. Reproduction

```powershell
node scripts/verify_frontier_kantor_complex_gauge_lift.mjs
```

The certificate tests each ray on all (4^5=1024) ordered real-basis choices for each Kantor identity, preserves the explicit first failures, checks unitary covariance word by word, and verifies the Hermitian Jordan shadow.

## Dependencies

- [Real paired Kantor classification](frontier_parallel_kantor_01_cp_compatible_contact_completion.md)
- [Canonical CP obstruction](832_cp_pairing_preserves_the_lepton_jordan_graph_but_not_the_kantor_spin23_slice_closing_the_oriented_parent_gate.md)
- [Complex flavor/real-face boundary](120_real_face_carrier_complex_flavor_cp.md)

