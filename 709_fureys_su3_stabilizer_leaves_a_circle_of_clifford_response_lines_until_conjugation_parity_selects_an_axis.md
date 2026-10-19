# Furey’s \(SU(3)\) Stabilizer Leaves a Circle of Clifford Response Lines Until Conjugation Parity Selects an Axis

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08, B09, B10, B11, B14 and the Clifford-normalizer/Furey-sewing branch  
**Claim status:** exact stabilizer and fixed-space calculation; physical choice of conjugation parity remains open  
**Certificate:** [verify_furey_su3_leaves_a_circle_of_clifford_link_lines.mjs](scripts/verify_furey_su3_leaves_a_circle_of_clifford_link_lines.mjs)

## Executive result

The selected \(Cl_2\subset Cl_9\) is not unique under the full spin-factor symmetry. Once a diagonal Peirce face direction \(d\) is fixed, any unit octonion link

\[
q\in S^7\subset\mathbb O
\]

defines a two-generator Clifford subalgebra

\[
\operatorname{Cl}(d,q)\cong Cl_{2,0}
\]

and hence an \(H_2(\mathbb R)\) spin subfactor.

Furey’s choice of an imaginary unit

\[
u\in\operatorname{Im}\mathbb O,
\qquad u^2=-1,
\]

reduces

\[
G_2\longrightarrow SU(3)_u.
\]

The exact common fixed space of this \(SU(3)\) on \(\mathbb O\) is

\[
\boxed{
\mathbb O^{SU(3)_u}
=\operatorname{span}_{\mathbb R}\{1,u\}.
}
\]

Therefore every unit line

\[
\boxed{
q(\theta)=\cos\theta\,1+\sin\theta\,u
}
\]

is compatible with the Furey color stabilizer. Before identifying \(q\sim-q\), these choices form a circle. Furey’s \(SU(3)\) alone does **not** uniquely select the real-link Clifford generator used in document 706.

The remaining degeneracy becomes discrete if the Furey conjugation relative to \(u\) is imposed. It acts by

\[
\kappa_u(1)=1,
\qquad
\kappa_u(u)=-u.
\]

The only invariant real lines in \(\operatorname{span}\{1,u\}\) are:

\[
\mathbb R1
\quad\text{and}\quad
\mathbb Ru.
\]

Thus conjugation parity reduces the circle to two axes:

- the CP-even scalar link \(q=1\);
- the CP-odd imaginary link \(q=u\).

An additional physical parity choice is required to select between them.

## 1. The \(Cl_2\) selection space

The spin-factor vector space underlying \(H_2(\mathbb O)\) is

\[
\mathbb R^9
=\mathbb Rd\oplus\mathbb O,
\]

where \(d\) is the difference of the two diagonal populations. Fixing the Peirce frame fixes \(d\).

For every unit \(q\in\mathbb O\), the two symmetric Clifford generators

\[
\Gamma_d,
\qquad
\Gamma_q
\]

satisfy

\[
\Gamma_d^2=\Gamma_q^2=I,
\qquad
\{\Gamma_d,\Gamma_q\}=0.
\]

Their Jordan span

\[
\operatorname{span}_{\mathbb R}\{I,\Gamma_d,\Gamma_q\}
\]

is a copy of \(H_2(\mathbb R)\).

Consequently, after fixing \(d\), the raw selection space is

\[
S^7/\{q\sim-q\}
\cong\mathbb RP^7.
\]

The sign quotient appears because \(q\) and \(-q\) generate the same subalgebra.

## 2. Normalizer inside \(Spin(9)\)

The automorphism group of the spin-factor vector part is \(SO(9)\), with double cover \(Spin(9)\).

For an oriented two-plane

\[
\Pi=\operatorname{span}\{d,q\},
\]

the identity component of its stabilizer is

\[
\boxed{
\frac{Spin(2)\times Spin(7)}{\mathbb Z_2}.
}
\]

Its Lie dimension is

\[
1+21=22.
\]

Since

\[
\dim SO(9)=36,
\]

the oriented two-plane orbit has dimension

\[
36-22=14,
\]

as expected for the oriented Grassmannian \(\widetilde{\operatorname{Gr}}_2(\mathbb R^9)\).

If the ordered generators \(d,q\) are fixed pointwise, the stabilizer is \(Spin(7)\), of dimension \(21\).

If the Peirce direction \(d\) is already fixed, varying \(q\) gives the seven-dimensional sphere \(S^7\).

These counts distinguish three notions often compressed into “the normalizer”:

1. preserving the two-plane;
2. preserving its orientation;
3. fixing both generators pointwise.

## 3. Explicit \(G_2\) derivation calculation

The certificate constructs the standard octonion derivations

\[
D_{a,b}
=[L_a,L_b]+[L_a,R_b]+[R_a,R_b].
\]

From the Fano multiplication table it verifies:

- their span has dimension \(14\), giving \(\mathfrak g_2\);
- the derivations annihilating \(u=e_1\) form an eight-dimensional Lie algebra;
- their common fixed space on \(\mathbb O\) has dimension two;
- that fixed space is exactly \(\operatorname{span}_{\mathbb R}\{1,u\}\).

The eight-dimensional stabilizer is the familiar

\[
\mathfrak{su}(3)_u\subset\mathfrak g_2.
\]

This supplies an executable bridge between the Furey color stabilizer and the Clifford response-line problem.

## 4. Why \(SU(3)\) leaves a circle

Under \(SU(3)_u\), the octonions decompose as a real representation:

\[
\mathbb O
\cong
\mathbb R1
\oplus
\mathbb Ru
\oplus
\mathbb C^3_{\mathbb R}.
\]

Both singlets are fixed pointwise. Therefore the stabilizer cannot distinguish a normalized real combination

\[
q(\theta)=\cos\theta\,1+\sin\theta\,u.
\]

The associated response subfactor is

\[
J_\theta
=\operatorname{span}_{\mathbb R}
\{I,\Gamma_d,\Gamma_{q(\theta)}\}
\cong H_2(\mathbb R).
\]

All \(J_\theta\) are color compatible.

This is an exact selection degeneracy, not a failure of the construction.

## 5. Conjugation parity reduces the degeneracy

The chosen complex subalgebra is

\[
\mathbb C_u=\operatorname{span}_{\mathbb R}\{1,u\}.
\]

Its complex conjugation is

\[
\kappa_u(a+bu)=a-bu.
\]

A real line \(\mathbb Rq(\theta)\) is invariant under \(\kappa_u\) only if

\[
\kappa_u(q)=\pm q.
\]

The \(+1\) eigenspace is \(\mathbb R1\); the \(-1\) eigenspace is \(\mathbb Ru\). Generic mixtures are sent to distinct lines.

Thus:

\[
\boxed{
SU(3)_u+\kappa_u
\quad\Longrightarrow\quad
q\in\{1,u\}\text{ up to sign}.
}
\]

Selecting \(q=1\) requires even conjugation parity. Selecting \(q=u\) requires odd parity.

## 6. Relation to the selector of document 706

Document 706 used

\[
q=1,
\]

because \(L_1=I_8\), making the chosen Clifford subalgebra visibly

\[
M_2(\mathbb R)\otimes I_8.
\]

This choice is:

- fixed by all of \(G_2\), not merely \(SU(3)_u\);
- even under \(\kappa_u\);
- independent of which Furey imaginary unit is chosen.

It is therefore the most canonical response line if response selection is required to precede or ignore Furey’s internal complex choice.

The alternative

\[
q=u
\]

is:

- fixed by \(SU(3)_u\) but not all \(G_2\);
- odd under \(\kappa_u\);
- tied directly to the complex direction used in the matter construction.

It is the more interesting sewing candidate, but it needs a modified Clifford conditional expectation conjugate to the \(q=1\) construction.

## 7. Compatibility is not selection

The important logical distinction is:

\[
\text{Furey }SU(3)_u\text{ preserves the response line}
\]

versus

\[
\text{Furey data uniquely determine the response line}.
\]

The first is true for an entire circle. The second is false without conjugation parity or another invariant.

This prevents the programme from presenting color compatibility as a unique derivation of \(Spin(2,3)\).

## 8. Two physically distinct axes

### Even scalar axis \(q=1\)

This yields the existing selector:

\[
\begin{pmatrix}a&z\\\bar z&b\end{pmatrix}
\longmapsto
\begin{pmatrix}
a&\operatorname{Re}z\\
\operatorname{Re}z&b
\end{pmatrix}.
\]

It is neutral under the Furey complex conjugation.

### Odd imaginary axis \(q=u\)

This would retain the coefficient

\[
\langle u,z\rangle
\]

instead of \(\operatorname{Re}z\). It produces an isomorphic \(H_2(\mathbb R)\) carrier but transforms oddly under \(\kappa_u\).

If CP or charge conjugation is to act nontrivially on the response, this axis may encode an orientation pseudoscalar rather than an ordinary scalar response.

The two options should be carried as separate branches until the response kernel fixes the parity.

## 9. Falsification and stop criteria

Stop a claim of unique Furey selection if it relies only on \(SU(3)_u\) invariance; the exact fixed space is two-dimensional.

Stop the \(q=u\) sewing branch if:

- odd conjugation parity is incompatible with Hermitian stress response;
- the induced conditional expectation fails positivity or covariance;
- it couples the response noise directly to color matter;
- or it generates CP-odd observables already excluded experimentally.

Stop the \(q=1\) branch as a Furey-derived result if no structure beyond universal \(G_2\) invariance links it to the matter construction. It remains a valid canonical Clifford selector, but not a consequence of Furey’s chosen complex unit.

## 10. Highest-value next calculations

1. Construct the \(q=u\) Clifford conditional expectation explicitly and verify complete positivity and exact range.
2. Determine how \(q=1\) and \(q=u\) response kernels transform under the completed Dirac exchange and Higgs-dressed antiunitary.
3. Search the Hermitian Furey TRO response for even and odd scalar channels separately.
4. Test whether stress–energy positivity excludes the odd axis.
5. Compute whether a mixed \(q(\theta)\) introduces a measurable CP angle or is removable by the \(Spin(2)\) plane normalizer.

## Companion documents

- [Exact Clifford-multiplicity selector](706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
- [Clifford selector Lindbladian](707_a_six_jump_clifford_lindbladian_converges_to_h2r_with_exact_gap_but_must_not_depolarize_the_same_face.md)
- [Typed topology/Clifford audit](708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md)
- [Furey comprehensive research review](02_furey_comprehensive_research_review.md)
- [Furey technical algebraic guide](03_furey_technical_algebraic_guide.md)
