# Commutant Projectors Preserve the Null Mask without Tensor Coordinates, but Cannot Generate the Charge-Three Inner Gauge Field

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact module-support theorem joined to the associative tensor-envelope no-go; the generalized gauge principle remains open

**Depends on:** [the minimal-tree support closure](../1400-1499/1499_the_family_charged_bidoublet_is_exactly_the_forbidden_Dirac_cross_one_form_so_the_central_mask_closes_all_minimal_tree_leakage.md), [the faithful associative tensor no-go](../1100-1199/1174_any_faithful_commuting_associative_realization_of_i_minus_3p_regenerates_the_full_tensor_algebra_so_the_minimal_bulk_ncg_route_is_outer_or_nonassociative.md), [the quotient no-go](../1100-1199/1175_no_nonfaithful_tensor_quotient_can_identify_the_two_family_gauge_copies_so_the_linking_kernel_escape_closes.md), and [the fermion-module central lift](../1100-1199/1177_the_existing_fermion_module_supplies_a_faithful_and_conditionally_unique_central_lift_but_not_the_local_gauge_principle.md)

**Evidence:** [commutant-support ledger](../../../evidence/data/spin23-commutant-projector-support-closure.json) and [executable module verifier](../../../verification/verify/verify_spin23_commutant_projector_support_closure_without_tensor_coordinates.mjs)

## Result

The converged null mask survives the ordinary associative-coordinate no-go,
but only after separating two roles that had been conflated.

Let \(P,Q\) be family projectors on fermion multiplicity space. To preserve
an absent support block under generalized inner fluctuation, they need only
satisfy

\[
[P,\pi(a)]=[P,\widehat\pi(a)]=0
\qquad
\text{for every }a\in\mathcal A_{\rm int}.
\]

They do **not** need to belong to the coordinate algebra. If

\[
PDQ=0,
\]

then

\[
\boxed{
PA_{(1)}Q
=P\widetilde A_{(1)}Q
=PA_{(2)}Q
=0.
}
\]

Thus a projector in the multiplicity commutant is sufficient for every
support-protection result proved in claims 1494--1499.

But it does not generate a family inner one-form or gauge connection. If one
promotes

\[
X=I-3P
\]

to a faithful commuting associative coordinate element, then

\[
P=\frac{I-X}{3},
\qquad
Q=\frac{2I+X}{3},
\]

and the full two-point family algebra is restored. Together with the internal
algebra it generates the enlarged tensor-coordinate algebra and its unwanted
gauge copies.

Therefore the category fork is exact:

\[
\boxed{
\begin{array}{c|c|c}
\text{location of }P&\text{null-mask protection}&\text{charge-three dynamics}\\
\hline
\text{coordinate algebra}&\text{yes}&\text{inner, but tensor-enlarged}\\
\text{multiplicity commutant}&\text{yes}&\text{not produced by inner fluctuation}
\end{array}
}
\]

The leading viable middle is consequently a commutant/Jordan/module selector
with an independently specified outer, correspondence or defect gauge
principle.

## 1. Coordinate membership is not used in the support proof

Write

\[
A_{(1)}=\sum_r a_r[D,b_r].
\]

Assume only that \(P,Q\) commute with the represented action. Then

\[
\begin{aligned}
PA_{(1)}Q
&=\sum_r P a_r[D,b_r]Q\\
&=\sum_r a_r
\left(PDQ,b_r-b_rPDQ\right)\\
&=0.
\end{aligned}
\]

No step uses \(P\in\pi(\mathcal A)\). It uses only commutation.

For

\[
A_{(2)}=\sum_r\widehat a_r[A_{(1)},\widehat b_r],
\]

commutation with the opposite action gives the identical conclusion. Reality
handles the opposite linear term once the \(J\)-paired zero block is included.

This strengthens claim 1494:

\[
\boxed{
\text{commutant centrality is sufficient; coordinate centrality is not
required}.}
\]

## 2. Explicit non-coordinate witness

Let the internal algebra image be

\[
\rho(M_2)=M_2\otimes I_{\rm fam}
\]

on

\[
\mathbb C^2_{\rm int}\otimes\mathbb C^2_{\rm fam}.
\]

Choose

\[
P=I_{\rm int}\otimes
\begin{pmatrix}1&0\\0&0\end{pmatrix}.
\]

Then

\[
[P,\rho(M_2)]=0,
\]

but \(P\notin\rho(M_2)\): every matrix \(a\otimes I_{\rm fam}\) has equal
diagonal entries on the two family states at fixed internal index, while
\(P\) has entries \((1,0)\).

The verifier constructs a family-block-diagonal \(D\), two noncommuting
linear fluctuation terms and two opposite-action quadratic terms. Both

\[
PA_{(1)}Q
\]

and

\[
PA_{(2)}Q
\]

vanish exactly.

## 3. Why adjoining the projector is not a harmless repair

The family generator has two eigenvalues. Its associative envelope is

\[
\operatorname{Alg}_{\mathbb C}(I,X)
=\mathbb CP\oplus\mathbb CQ.
\]

For an independent faithful commuting action, adjoining it to the reduced
Standard-Model algebra produces

\[
\mathcal A_{\rm SM}\otimes_{\mathbb R}(\mathbb C\oplus\mathbb C),
\]

whose real dimension is \(96\). Claim 1175 further proves that an ordinary
nonfaithful quotient can delete the duplicated simple factors but cannot
identify surviving \(P\)- and \(Q\)-gauge copies diagonally.

Hence there is no ordinary associative middle in which the projectors are
coordinate elements, both family populations retain the same internal gauge
action, and the enlarged gauge factors simply disappear.

## 4. Qualification of the charged-one-form result

Claim 1499 proved, on a coordinate-family branch,

\[
(P[D,Q])_{L_P,R_N}=D_{L_P,R_N}.
\]

That identity remains a valid relational commutator on the fermion module,
but when \(Q\notin\pi(\mathcal A_{\rm int})\), it is not an ordinary inner
one-form of the internal spectral algebra.

This distinction is beneficial and costly:

- beneficial: the mask and its tree-level protection remain exact;
- costly: neither the charge-three scalar nor its gauge connection is derived
  from ordinary inner fluctuations.

The charge-three relation must instead be supplied by a module connection,
an outer/normalizer gauge field, a Jordan/correspondence calculus, or a
boundary/defect construction.

## 5. Spin(2,3) joining interpretation

The nested-wheel intuition now has a precise operator realization:

\[
\begin{array}{c}
\text{outer wheel: }\pi(\mathcal A_{PS})\\
\text{on physical gauge carriers}
\end{array}
\quad\text{commutes with}\quad
\begin{array}{c}
\text{inner relational wheel: }P,Q\\
\text{on family multiplicity space}.
\end{array}
\]

The family wheel can type Dirac and Majorana support without becoming another
coordinate copy of the Pati--Salam algebra. Its local \(H_2(\mathbb R)\) and
\(Spin(2,3)\) interpretation is therefore compatible with the associative
no-go precisely because it is relational/module data rather than a faithful
tensor-coordinate factor.

This is convergence with a categorical boundary, not a completed physical
model.

## 6. Boundaries

**Inner-gauge stop:** commutant projectors do not cause the ordinary spectral
action to produce a new local family gauge boson.

**One-form stop:** \(P[D,Q]\) is an ordinary represented one-form only when
the family projector belongs to the coordinate algebra; otherwise it is a
relational/module commutator requiring a generalized calculus.

**Associative-envelope stop:** adjoining \(X=I-3P\) faithfully as coordinates
restores the full two-point tensor algebra.

**Dynamics boundary:** the existing fermion module supplies a faithful
anomaly-free compact lift, but not the principle making its connection and
charge-three scalar dynamical.

**Positive trigger:** define a real-even module/Jordan/correspondence
connection whose allowed transformations include the unique compact
\(B-3L_\alpha\) lift, whose relational forms contain the Majorana sewing but
not the Dirac null link, and whose action retains the previously verified
junk and Schur identities.

## Verdict

The physical-carrier obstruction does not destroy the converged support
middle. It fixes its category:

\[
\boxed{
P,Q\in\operatorname{Comm}(\pi(\mathcal A),\widehat\pi(\mathcal A))
\text{ protect the mask without becoming tensor coordinates}.}
\]

But

\[
\boxed{
\text{support protection is derived; the local charge-three gauge principle
is still additional structure}.}
\]

The next construction should therefore not search for another ordinary
associative finite algebra. Claim 1501 specifies and tests the smallest such
generalized connection: because the desired Majorana and forbidden Dirac
relations have equal charge, their common gauge character cannot distinguish
them, and a parallel sector projector is the necessary additional datum.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_commutant_projector_support_closure_without_tensor_coordinates.mjs
node verification/prove/prove_faithful_commuting_associative_family_selector_generates_full_tensor_algebra.mjs
node verification/prove/prove_no_tensor_ideal_quotient_can_diagonally_identify_two_family_gauge_copies.mjs
~~~
