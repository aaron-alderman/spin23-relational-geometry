# Arbitrary Physical Multiplicity Preserves Relation-Sheet Parity, and Generalized Fluctuations Cannot Create Odd Leakage

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact tensor-stability and generalized-fluctuation theorem; actual Pati--Salam support and anomaly audits remain open

**Depends on:** [the unique KO-6 relation-sheet reflection](1505_the_real_completed_two_path_geometry_uniquely_lifts_the_mask_reflection_as_J_odd_relation_sheet_parity.md), [matrix-valued junk stability](../1400-1499/1493_matrix_multiplicity_enlarges_only_the_loop_sector_while_all_two_step_cross_edges_remain_junk.md), and [central-mask generalized-fluctuation closure](../1400-1499/1494_generalized_inner_fluctuations_preserve_the_central_family_null_mask_while_dressing_the_present_Pati_Salam_Majorana_defect.md)

**Evidence:** [tensor-fluctuation ledger](../../../evidence/data/spin23-relation-sheet-parity-tensor-fluctuation.json) and [matrix verifier](../../../verification/verify/verify_spin23_relation_sheet_parity_survives_tensor_multiplicity_and_generalized_fluctuation.mjs)

## Result

Colour, weak, spin and generation multiplicities do not by themselves
obstruct the protecting relation-sheet reflection. If the bare finite Dirac
operator and both algebra actions are sheet-even, every generalized inner
fluctuation remains sheet-even for arbitrary matrix coefficients.

Let

\[
\mathcal H=\mathcal H_+\oplus\mathcal H_-,
\qquad
\Gamma_{\rm rel}=I_+\oplus(-I_-).
\]

Assume

\[
[\Gamma_{\rm rel},D]=0,
\qquad
[\Gamma_{\rm rel},\pi(a)]=0,
\qquad
[\Gamma_{\rm rel},\widehat\pi(a)]=0.
\]

Then

\[
\boxed{
[\Gamma_{\rm rel},A_{(1)}]
=[\Gamma_{\rm rel},\widetilde A_{(1)}]
=[\Gamma_{\rm rel},A_{(2)}]
=0.
}
\]

Consequently the fully fluctuated \(D_A\) cannot acquire a parity-odd Dirac
leakage block. The exact obstruction is not matrix multiplicity; it is a
physical representation or vertex with cross-sheet support.

## 1. Block theorem

Relative to the two relation sheets, every operator splits as

\[
T=\begin{pmatrix}T_{++}&T_{+-}\\T_{-+}&T_{--}\end{pmatrix}.
\]

Conjugation by \(\Gamma_{\rm rel}\) gives

\[
\Gamma_{\rm rel}T\Gamma_{\rm rel}
=
\begin{pmatrix}T_{++}&-T_{+-}\\-T_{-+}&T_{--}\end{pmatrix}.
\]

Thus

\[
T\text{ even}
\Longleftrightarrow
T_{+-}=T_{-+}=0,
\]

while a pure cross-sheet operator is odd. The sizes and internal algebra of
the four blocks do not affect this equivalence.

Tensoring either sheet with any physical multiplicity space merely enlarges
\(T_{++}\) and \(T_{--}\). Arbitrary noncommuting matrices inside those
blocks remain even.

## 2. Closure of the generalized fluctuation

For

\[
A_{(1)}=\sum_r a_r[D,b_r],
\]

the commutator of two even operators is even and the product of even
operators is even. Hence every term \(a_r[D,b_r]\) is even.

The opposite linear term obeys the same argument. Finally,

\[
A_{(2)}=\sum_r\widehat a_r[A_{(1)},\widehat b_r]
\]

is again built only from products and commutators of even operators. It is
therefore even.

This is an exact \(\mathbb Z_2\)-graded closure theorem:

\[
\boxed{
D,\pi(\mathcal A),\widehat\pi(\mathcal A)\in\operatorname{End}^0
\Longrightarrow
D_A\in\operatorname{End}^0.}
\]

## 3. Executable multiplicity witness

The verifier uses two relation sheets, three relation vertices per sheet and
a two-dimensional physical multiplicity, giving a 12-dimensional carrier.
All within-sheet Dirac and algebra coefficients are deterministic,
noncommuting integer matrices.

It verifies exact commutation with \(\Gamma_{\rm rel}\) for:

- the bare matrix-valued \(D\);
- both represented-algebra samples;
- both opposite-algebra samples;
- \(A_{(1)}\);
- the opposite linear fluctuation;
- \(A_{(2)}\);
- the complete fluctuated operator.

The full endomorphism space has dimension 144, split evenly into 72 even and
72 odd matrix directions. An arbitrary nonzero cross-sheet block is checked
to be exactly odd.

## 4. Fan downward: the physical support audit

The theorem converts a vague “full multiplicity embedding” problem into a
finite yes/no support question. For each physical fermion and scalar vertex,
ask whether it stays within one relation sheet.

- If yes, arbitrary colour/weak/spin matrices cannot spoil the mask.
- If no, that vertex is a concrete \(\Gamma_{\rm rel}\)-odd leakage source.

The earlier mediator census can now be reread this way. The correlated
right-neutrino bridge stays in the even Schur packet; the independent charged
bidoublet requires precisely the odd Dirac cross support already excluded by
the mask.

## 5. Fan upward: generalized geometry

The reflection gives the endomorphism algebra a genuine grading

\[
\operatorname{End}(\mathcal H)
=\operatorname{End}^0\oplus\operatorname{End}^1.
\]

The generalized fluctuation functor closes on \(\operatorname{End}^0\). This
means the relation-sheet parity is compatible with non-first-order
Pati--Salam dressing as long as the two algebra representations themselves
respect the sheet decomposition.

The odd space is not mysterious: it is exactly the pair of off-diagonal
Hom spaces

\[
\operatorname{Hom}(\mathcal H_+,\mathcal H_-)
\oplus
\operatorname{Hom}(\mathcal H_-,\mathcal H_+).
\]

Those are the candidate leakage carriers to exclude, make massive, or prove
absent from the physical representation.

## 6. Spin(2,3) joining interpretation

The local twin-wheel decomposition survives arbitrary internal fibre size.
Physical multiplicity decorates each wheel but does not join them. A joining
operator must explicitly cross the relation-sheet grading.

Thus the precise convergence criterion is

\[
\boxed{
\text{physical Pati--Salam data are admissible}
\iff
\text{all required vertices are }\Gamma_{\rm rel}\text{-even}.}
\]

The statement is conditional until the actual vertex table is completed,
but the algebraic criterion is now exhaustive.

## Boundaries

**Representation boundary:** this theorem does not prove that the sourced
Pati--Salam representation is sheet diagonal; it states the exact condition
to check.

**Anomaly boundary:** closure of bosonic fluctuations is not a discrete
anomaly calculation.

**Counterterm boundary:** quantum counterterms preserve the grading only if
the full measure and regulator preserve \(\Gamma_{\rm rel}\).

**Vacuum boundary:** an even action may still enter a phase with an odd
condensate if the odd Hessian becomes negative.

## Verdict

The physical tensor lift has no multiplicity obstruction:

\[
\boxed{
\text{within-sheet arbitrary matrices are harmless;
cross-sheet support is the unique algebraic threat}.}
\]

Claim 1507 begins the physical vertex audit and finds a decisive boundary:
the two required vertices automatically make their dimension-five composite
even under every ordinary field \(\mathbb Z_2\). The present closure theorem
remains valid on the relation module, but its completion must be categorical
and correlation-aware rather than a conventional endpoint parity.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_relation_sheet_parity_survives_tensor_multiplicity_and_generalized_fluctuation.mjs
node verification/verify/verify_spin23_KO6_relation_sheet_reflection.mjs
node verification/verify/verify_spin23_generalized_fluctuation_preserves_family_null_mask.mjs
~~~
