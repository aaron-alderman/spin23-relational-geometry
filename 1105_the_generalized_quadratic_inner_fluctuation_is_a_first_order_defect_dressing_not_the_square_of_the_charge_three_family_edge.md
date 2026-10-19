# The Generalized Quadratic Inner Fluctuation Is a First-Order-Defect Dressing, Not the Square of the Charge-Three Family Edge

**Date:** 18 October 2026  
**Branches:** generalized inner fluctuations, family two-point algebra, Krajewski support, exceptional Majorana texture, Pati–Salam fork  
**Claim status:** exact finite-bimodule theorem plus primary-source formula; physical family-extended Pati–Salam representation still open  
**Certificate:** [prove_A2_is_first_order_defect_dressing_not_two_hop_family_square.mjs](scripts/prove_A2_is_first_order_defect_dressing_not_two_hop_family_square.mjs)  
**Primary source:** [Chamseddine–Connes–van Suijlekom, arXiv:1304.7583](https://arxiv.org/abs/1304.7583)

## Executive correction

Document 1104 identified an attractive charge-level possibility:

\[
S_{-3}\times S_{-3}
\nu^c_\alpha\nu^c_\alpha
\quad\hbox{has total charge}\quad
-3-3+6=0.
\]

That arithmetic remains true. It is **not**, however, what the generalized
quadratic inner fluctuation automatically computes.

For a universal one-form

\[
\omega=\sum_r a_r\,\delta b_r ,
\]

the source formula is

\[
A_{(1)}=\sum_r a_r[D,b_r],
\qquad
A_{(2)}
=\sum_r\widehat a_r[A_{(1)},\widehat b_r].
\]

Thus \(A_{(2)}\) is a commutator of the linear fluctuation with the
**opposite-algebra** action. It measures failure of first order. It is not
\(A_{(1)}^2\), and it does not concatenate two charge-three arrows.

For the horizontal charge-three family arrow constructed in documents
1100--1102, the opposite label is the same at both endpoints. Consequently

\[
\boxed{A_{(2)}=0}
\]

on that arrow.

The naïve route

\[
\text{first-order horizontal }S_{-3}
\longrightarrow
A_{(2)}\sim S_{-3}^{\,2}
\]

is therefore closed.

## 1. Source formula and normalization

The generalized fluctuation is built from a normalized element

\[
\mathcal P=\sum_r a_r\otimes b_r^{\rm op},
\qquad
\sum_r a_rb_r=1,
\]

of the perturbation semigroup \({\rm Pert}(\mathcal A)\). For a real spectral
triple the map to the algebra together with its opposite action is quadratic,
but the resulting operator decomposes as

\[
D'=D+A_{(1)}+\widetilde A_{(1)}+A_{(2)}.
\]

The adjective “quadratic” refers to the dependence on the same universal
perturbation data in the algebra and opposite algebra. It does not mean the
operator product \(A_{(1)}A_{(1)}\).

This distinction is decisive for support and charge bookkeeping.

## 2. Exact edge formula

Take a finite diagonal bimodule basis labelled by

\[
s=(i,j),
\]

where \(i\) is the left-algebra character and \(j\) the opposite-algebra
character. Consider a Dirac matrix element

\[
D_{t s},
\qquad
s=(i,j),\quad t=(k,\ell).
\]

Write

\[
K_{xy}:=\sum_r a_r(x)b_r(y).
\]

Normalization says \(K_{xx}=1\). Direct substitution gives

\[
(A_{(1)})_{ts}
=D_{ts}\left(K_{ki}-K_{kk}\right)
=D_{ts}\left(K_{ki}-1\right).
\]

The quadratic term is

\[
\begin{aligned}
(A_{(2)})_{ts}
&=(A_{(1)})_{ts}
  \left(K_{\ell j}-K_{\ell\ell}\right)\\
&=D_{ts}
  \left(K_{ki}-1\right)
  \left(K_{\ell j}-1\right).
\end{aligned}
\]

Therefore:

\[
\boxed{
\operatorname{supp}A_{(2)}
\subseteq
\operatorname{supp}A_{(1)}
\subseteq
\operatorname{supp}D.
}
\]

The quadratic correction dresses an existing Dirac support. It cannot create
a new two-hop matrix block absent from \(D\).

## 3. Equivalence with the first-order defect

For the same edge,

\[
[[D,\pi(x)],\widehat\pi(y)]_{ts}
=D_{ts}\,[x(i)-x(k)]\,[y(j)-y(\ell)].
\]

It vanishes for all \(x,y\) exactly when

\[
i=k
\qquad\hbox{or}\qquad
j=\ell.
\]

These are respectively vertical and horizontal Krajewski edges.

The edge formula for \(A_{(2)}\) has precisely the same two factors:

- if \(i=k\), the left factor vanishes;
- if \(j=\ell\), the opposite factor vanishes;
- only an edge changing both labels can carry \(A_{(2)}\).

Hence

\[
\boxed{
\text{first order on an edge}
\Longrightarrow
A_{(2)}\text{ vanishes on that edge}.
}
\]

This is the local meaning of the source statement that \(A_{(2)}\) vanishes
when the first-order condition holds.

## 4. Exhaustive two-point certificate

For \(\mathcal A_F=\mathbb C\oplus\mathbb C\), the four bimodule states are

\[
(0,0),(0,1),(1,0),(1,1).
\]

There are twelve nontrivial directed edges:

- four horizontal;
- four vertical;
- four diagonal.

Use the normalized self-adjoint perturbation-semigroup element

\[
\mathcal P=e_0\otimes e_0^{\rm op}
e_1\otimes e_1^{\rm op},
\]

for which \(K=I_2\). The executable certificate finds:

\[
\begin{array}{c|c|c}
\text{edge type}&\text{first order}&A_{(2)}\neq0\\ \hline
\text{horizontal}&\text{yes}&\text{no}\\
\text{vertical}&\text{yes}&\text{no}\\
\text{diagonal}&\text{no}&\text{yes}
\end{array}
\]

All eight first-order-compatible directed edges have zero \(A_{(2)}\); all
four first-order-defect edges have nonzero \(A_{(2)}\) for this witness.

## 5. Consequence for the charge-three family construction

The minimal real family diagram used the horizontal edge

\[
(0,r)\longleftrightarrow(1,r)
\]

and its \(J\)-reflected vertical partner

\[
(r,0)\longleftrightarrow(r,1).
\]

This was exactly how it passed first order. The same property now forces the
quadratic correction to vanish.

The family scalar can still carry charge \(\pm3\) through \(A_{(1)}\), and an
ordinary scalar potential or effective operator can still contain \(S^2\).
What fails is the stronger claim that the generalized spectral
\(A_{(2)}\) term automatically supplies that square.

## 6. What a viable non-first-order Majorana branch requires

There are now three distinct possibilities.

### Branch A — strict first order

Keep the horizontal/vertical family pair. Generate the charge-six Majorana
entry through two ordinary scalar insertions, a composite operator or an
additional mediator. Do not invoke \(A_{(2)}\).

### Branch B — controlled first-order defect

Place the relevant Majorana Dirac support on an edge

\[
(i,j)\longleftrightarrow(k,\ell),
\qquad
i\ne k,\quad j\ne\ell.
\]

Then \(A_{(2)}\) can be nonzero on that same edge. Its actual polynomial in
the fluctuating fields, gauge covariance, reality and junk class must be
computed.

### Branch C — enlarged bimodule/path construction

Add intermediate sectors so that two charge-three linear fields generate a
charge-six composite in the spectral action or after integrating out a
mediator. This is a genuine two-hop construction, but it is not the universal
\(A_{(2)}\) formula.

## 7. Revised charge statement

The safe statement is:

\[
\boxed{
q(S^2)=-6
\text{ is the correct charge target, but }
A_{(2)}\ne A_{(1)}^2.
}
\]

Moreover \(A_{(2)}\) does not generally transform as an independent
homogeneous field of charge twice that of \(A_{(1)}\). Its gauge law contains
the nonlinear completion required to make the entire fluctuated Dirac
operator covariant.

Charge arithmetic can classify a component **after** its tensor support has
been exhibited. It cannot establish that component.

## 8. Stop-everything and falsification criteria

**Square stop:** never write \(A_{(2)}\sim S^2\) solely because it is
quadratic in fluctuation data.

**Support stop:** \(A_{(2)}\) cannot create a matrix block outside the support
of \(A_{(1)}\), hence outside the relevant support of \(D\), in the diagonal
finite-bimodule setting.

**First-order stop:** a horizontal or vertical edge that passes first order
has zero quadratic correction on that edge.

**Charge stop:** assign a doubled scalar charge only after expanding the
actual \(A_{(2)}\) component and its gauge transformation.

**Positive trigger:** exhibit a physical first-order-defect Dirac block whose
generalized fluctuation has a nonzero Majorana component with the required
field polynomial, reality and gauge properties.

## 9. Verdict

The generalized fluctuation sharpens rather than completes the family model:

\[
\boxed{
A_{(2)}
\text{ detects and dresses a first-order defect;}
\quad
\text{it is not a two-hop family recursion.}
}
\]

The strict family edge and the non-first-order Pati–Salam mechanism remain
both viable, but they solve different problems. Their synthesis requires an
explicit physical block that changes both algebra and opposite-algebra
labels, not merely two copies of the charge-three horizontal arrow.

## Position in the corpus

- [sourced Pati–Salam family/quadratic candidate](1104_the_spectral_Pati_Salam_algebra_does_not_supply_the_family_anchor_by_itself_but_its_non_first_order_quadratic_fluctuation_is_the_natural_charge_six_completion.md)
- [first-order charge-three real pair](1101_the_first_order_condition_allows_the_charge_three_family_edge_only_as_a_horizontal_vertical_real_pair_but_does_not_complete_the_standard_model_finite_triple.md)
- [minimal two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [KO-6 orientability and anchor repair](1102_the_minimal_two_point_KO6_family_quartet_fails_orientability_but_one_anchor_character_gives_an_explicit_real_even_first_order_completion.md)
- [Pati–Salam Majorana diagonal defect and \(\Delta^2\) audit](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
