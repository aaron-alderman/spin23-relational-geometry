# Multi-Face CP Identifiability Is a Design-Matrix Rank Problem and Requires a Direction Outside the Nuisance Span

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the general measurement-design branch  
**Claim status:** exact finite-face common-shape theorem and executable three-face example; process-specific score design remains open  
**Certificate:** [verify_multiface_design_rank_and_schur_complement_identifiability.mjs](scripts/verify_multiface_design_rank_and_schur_complement_identifiability.mjs)

## Executive result

The two-face construction is the first case of a general rank theorem.

Suppose every face has one common score shape \(g\), but different coefficients for the CP parameter and \(k\) nuisance parameters. Let the \(m\)-th coefficient row be

\[
a_m=(c_m,n_{m1},\ldots,n_{mk}),
\]

collect the rows into \(A=[c\;N]\), and let \(W=\operatorname{diag}(L_m)\) contain positive exposures. Then

\[
\boxed{
F=I_gA^TWA,
\qquad I_g=\langle g,g\rangle.
}
\]

After profiling the nuisance columns,

\[
\boxed{
I_{CP}^{\rm eff}
=I_g,c^TW(I-P_N^W)c,
}
\]

where \(P_N^W=N(N^TWN)^{-1}N^TW\) is the weighted projector onto the nuisance column space.

Therefore

\[
\boxed{
I_{CP}^{\rm eff}>0
\iff
c\notin\operatorname{col}(N)
}

on the positive-exposure face set.

## 1. Minimum number of faces

If \(k\) independent nuisance columns span a \(k\)-dimensional active face space, at least \(k+1\) suitably oriented faces are required to leave a nonzero orthogonal CP direction.

Having \(k+1\) faces is necessary in the generic common-shape case, not sufficient. The augmented design \([c\;N]\) must have rank \(k+1\), and the smallest weighted singular value must be large enough for stable inference.

## 2. Explicit three-face certificate

For two nuisances, use rows

\[
A=
\begin{pmatrix}
1&1&1\\
1&-1&1\\
1&0&-2
\end{pmatrix}.
\]

With balanced exposures, the CP column \((1,1,1)^T\) is orthogonal to both nuisance columns. The certificate verifies:

- the full three-face Fisher matrix has positive determinant;
- all raw CP information survives nuisance profiling under balanced exposure;
- exposure imbalance preserves identifiability but loses some profiled information;
- and either two-face subset has a singular three-parameter Fisher matrix.

## 3. Exterior-volume interpretation

The full Fisher determinant is the squared weighted volume spanned by the parameter columns:

\[
\det F
\propto
\|c\wedge n_1\wedge\cdots\wedge n_k\|_W^2.
\]

The efficient CP information is the squared length of the component of \(c\) perpendicular to the nuisance blade. Two-face area is therefore only the \(k=1\) case of a general Gram-volume invariant.

## 4. Beyond a common shape

Real faces need not share one scalar shape \(g\). Each parameter then maps to a vector in the direct sum of channel score Hilbert spaces. The same theorem survives with columns replaced by score vectors:

\[
I_{CP}^{\rm eff}>0
\iff
s_{CP}\notin\overline{\operatorname{span}\{s_{\eta_a}\}}.
\]

This operator-range statement is the correct target for a gauge-complete, detector-folded analysis.

## 5. Relation to the Jordan programme

Multiple measurement faces form a direct-sum positive cone. Nuisance quotienting removes a subspace of relational motions; the surviving CP coordinate is a transverse direction. The Gram volume measures whether the proposed family of faces truly resolves a new relation.

This provides a disciplined bridge between “many faces reveal the carrier” and statistical identifiability. It does not establish that the face-design group is \(Spin(2,3)\), nor that Fisher volume is the exceptional cubic norm.

## 6. Stop-everything criteria

Stop adding faces that leave the augmented score design at the same rank.

Stop counting the number of channels instead of the number of independent observed score directions.

Stop claiming stable identification from full rank when the smallest weighted singular value is calibration dominated.

Stop translating the Gram volume into a spacetime or exceptional invariant without an explicit intertwiner.

## 7. Highest-value next calculations

1. Combine imperfect reversal and orientation dilution into the weighted design matrix.
2. Optimize exposures to maximize the smallest Fisher eigenvalue under a fixed event budget.
3. Add calibration priors as extra Fisher blocks and derive required control-sample size.
4. Build channel score vectors from a concrete LNV helicity amplitude.
5. Compare the multi-face Gram volume with the determinant and cubic norms already present in the algebraic branches.

## Companion documents

- [Perfect two-face degeneracy breaking](740_two_reversed_measurement_faces_can_break_an_exact_single_face_cp_acceptance_degeneracy.md)
- [Imperfect reversal and conditioning](741_imperfect_face_reversal_remains_identifying_except_at_the_same_sign_boundary_but_can_be_arbitrarily_ill_conditioned.md)
- [Binary orientation-tag dilution](742_a_binary_pairing_orientation_tag_retains_the_square_of_its_dilution_in_cp_fisher_information.md)
