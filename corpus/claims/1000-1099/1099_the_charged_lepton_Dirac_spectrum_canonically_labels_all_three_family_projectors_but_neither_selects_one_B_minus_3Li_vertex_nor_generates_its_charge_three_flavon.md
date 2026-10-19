# The Charged-Lepton Dirac Spectrum Canonically Labels All Three Family Projectors, but Neither Selects One \(B-3L_i\) Vertex nor Generates Its Charge-Three Flavon

**Date:** 18 October 2026  
**Branches:** finite Dirac operator, charged-lepton spectrum, family projector, \(B-3L_i\), NCG one-forms, charge-three flavon  
**Claim status:** exact finite-dimensional projector and charge-sector theorem; source-level scalar conclusion is conditional on the unchanged generation-blind finite algebra  
**Certificate:** [prove_charged_lepton_projectors_label_but_do_not_select_B_minus_3Li_or_generate_the_flavon.mjs](../../../verification/prove/prove_charged_lepton_projectors_label_but_do_not_select_B_minus_3Li_or_generate_the_flavon.mjs)

## Executive result

The earlier statement “generation-blind NCG cannot select a family projector”
needs a precise qualification.

The represented finite algebra alone acts as

\[
a\longmapsto a\otimes I_F
\]

and cannot distinguish families. But the **full finite spectral data** also
contain the charged-lepton Yukawa block. If

\[
H_e=Y_eY_e^\dagger
\]

has three distinct eigenvalues

\[
\lambda_e<\lambda_\mu<\lambda_\tau,
\]

then it canonically determines three rank-one projectors

\[
\boxed{
P_\alpha=
\prod_{\beta\ne\alpha}
\frac{H_e-\lambda_\beta I}
{\lambda_\alpha-\lambda_\beta}.
}
\]

Consequently the three family augmentations have basis-covariant formulas

\[
\boxed{
\Delta_\alpha=I-3P_\alpha.
}
\]

Their spectra are \((-2,1,1)\), they sum to zero, and their Hilbert--Schmidt
Gram matrix is the \(A_2\) matrix with diagonal six and off-diagonal minus
three.

Thus the finite Dirac spectrum can canonically **label all three candidates**.
It does not by itself choose which \(\Delta_\alpha\) is the gauged
\(B-3L_\alpha\) direction. Nor does the unchanged generation-blind scalar
calculus automatically contain the charge-three flavon needed to reconnect
the resulting \(1\oplus2\) texture.

## 1. Algebra data and Dirac data must be separated

For a simply replicated one-generation geometry,

\[
\pi(a)=\pi_{\rm int}(a)\otimes I_F.
\]

The algebraic representation commutes with \(U(3)_F\). This proves that the
algebra alone selects no family line.

The finite Dirac operator is additional spectral-triple data. Its Yukawa
blocks are not generally proportional to the identity. In particular,
\(H_e\) transforms under a weak-basis change \(W\) as

\[
H_e\mapsto W^\dagger H_eW.
\]

Its spectral projectors transform covariantly:

\[
P_\alpha\mapsto W^\dagger P_\alpha W.
\]

The projectors are therefore genuine basis-independent spectral objects, even
though their matrix entries depend on the chosen weak basis.

This is already established elsewhere in the corpus for Majorana invariants.
The present result applies it directly to the \(B-3L_i\) family orbit.

## 2. Exact reconstruction of the \(A_2\) augmentations

Because the charged-lepton eigenvalues are distinct,

\[
P_e+P_\mu+P_\tau=I,
\qquad
P_\alpha P_\beta=\delta_{\alpha\beta}P_\alpha.
\]

Define

\[
\Delta_\alpha=I-3P_\alpha.
\]

Then

\[
\sum_\alpha\Delta_\alpha
=3I-3\sum_\alpha P_\alpha
=0.
\]

Moreover,

\[
\operatorname{Tr}\Delta_\alpha^2
=\operatorname{Tr}(I+3P_\alpha)
=6,
\]

and for \(\alpha\ne\beta\),

\[
\operatorname{Tr}(\Delta_\alpha\Delta_\beta)
=\operatorname{Tr}(I-3P_\alpha-3P_\beta)
=-3.
\]

Therefore

\[
\left[\operatorname{Tr}(\Delta_\alpha\Delta_\beta)\right]
=
\begin{pmatrix}
6&-3&-3\\
-3&6&-3\\
-3&-3&6
\end{pmatrix}.
\]

This is exactly the family \(A_2\) orbit of documents 1097--1098, now written
as a covariant function of the physical charged-lepton Dirac spectrum.

## 3. What the mass spectrum resolves

Nondegenerate charged-lepton masses resolve the abstract flavor-frame
ambiguity:

- \(P_e\) is the projector associated with the smallest charged-lepton mass;
- \(P_\mu\) is the intermediate projector;
- \(P_\tau\) is the largest.

They therefore turn the unlabeled family triangle into a physically labeled
triangle.

This weakens the strongest form of the generation-blind no-go. The correct
statement is:

\[
\boxed{
\text{the finite algebra does not label families, but }D_F
\text{ can label them through }H_e.
}
\]

The result is conditional on nondegeneracy. At an exact degeneracy, only the
projector onto the degenerate subspace is canonical.

## 4. What the mass spectrum does not resolve

The spectrum supplies the set

\[
\{\Delta_e,\Delta_\mu,\Delta_\tau\}
\]

but no equation in the present action says:

\[
\text{gauge }B-3L_e,\quad
\text{or gauge }B-3L_\mu,\quad
\text{or gauge }B-3L_\tau.
\]

One may impose “choose the lightest,” “choose the heaviest,” or map the
placement-handle fixed point to a particular eigenprojector. Each is a
well-defined extra rule, not a consequence of spectral decomposition.

Equivalently, the projectors destroy the continuous \(U(3)_F\) ambiguity but
leave a **model-selection trilemma**. The six family-to-placement bijections of
document 1098 remain unless a rule also fixes a placement orientation and
basepoint.

## 5. Exact charge-sector audit for the flavon

For the minimal lift with exceptional family \(e\), the lepton charges are

\[
q_L=(-2,1,1),\qquad
q_{e^c}=(1,-2,-2),\qquad
q_{\nu^c}=(3,0,0).
\]

The charged-lepton and Dirac-neutrino Yukawa operator-charge matrix is

\[
\mathcal Q_D=
\begin{pmatrix}
0&-3&-3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

The right-handed-neutrino Majorana bilinear has charge matrix

\[
\mathcal Q_M=
\begin{pmatrix}
6&3&3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

These matrices decompose the desired flavor edges into three distinct charge
sectors:

\[
0,\qquad \pm3,\qquad 6.
\]

A scalar \(S\) of charge \(-3\), together with \(S^\dagger\), repairs the
Dirac cross-blocks at first order. The exceptional Majorana diagonal requires
\(S^2\), of charge \(-6\).

This is a Froggatt--Nielsen operator expansion. It is not the same as saying
that one elementary NCG one-form simultaneously carries all three charge
sectors.

## 6. Why the unchanged generation-blind calculus does not generate \(S\)

An inner fluctuation obtains its gauge transformation law from the
representations at the endpoints of a finite-Dirac edge. In the unchanged
generation-blind algebra, all three copies have identical endpoint
representations. A flavor off-diagonal matrix coefficient can occur in
\(D_F\), but it does not acquire a new family-dependent gauge charge merely
because its entry connects two generations.

To make \(X_\alpha=B-2Y-3L_\alpha\) a gauge generator, its representation must
already distinguish \(P_\alpha\) from \(I-P_\alpha\). That is an extension of
the represented gauge algebra or of its admissible normalizer, not a result of
the original \(a\otimes I_F\) action.

Once that extension is made, the cross-family edges do carry charges
\(\pm3\), and a charge-three scalar can be introduced or generated by an
appropriate new one-form. But this is precisely the missing construction.

Hence:

\[
\boxed{
P_\alpha(H_e)\text{ exists inside the spectral data}
\;\not\Longrightarrow\;
S_{q=3}\in\Omega^1_{D_F}(\mathcal A_F).
}
\]

## 7. Locality and naturalness boundary

The projector formula contains inverse eigenvalue differences. It is a valid
finite-dimensional observable, but it is not automatically a low-degree
polynomial local field operator.

The unnormalized numerator

\[
\widetilde P_\alpha
=\prod_{\beta\ne\alpha}(H_e-\lambda_\beta I)
\]

is polynomial, but normalizing it uses the charged-lepton discriminant. A
spectral action or potential that selects one projector must explain why the
corresponding rational or high-degree spurion dependence appears.

This blocks a common shortcut: the existence of a canonical spectral
projector does not imply that it is a fundamental gauge generator or a
renormalizable scalar.

## 8. Branch status

Closed:

- charged-lepton nondegeneracy canonically labels all three rank-one family
  projectors;
- \(\Delta_\alpha=I-3P_\alpha\) reconstructs the exact \(A_2\) family orbit;
- the continuous \(U(3)_F\) ambiguity is removed by \(H_e\);
- the needed Dirac and Majorana entries split into charge sectors
  \(0,\pm3,6\).

Open:

- a dynamical principle selecting one \(\alpha\);
- a source-native family-to-placement basepoint and orientation;
- an extension realizing \(X_\alpha\) as a gauge generator;
- a represented one-form or composite with charge three;
- a renormalizable mediator completion producing the required powers of
  \(S\).

## 9. Stop-everything and falsification criteria

**Degeneracy stop:** if two charged-lepton eigenvalues coincide, their
individual projectors cease to be canonical.

**Selection stop:** do not infer one exceptional family merely from the
existence of the full spectral flag.

**Gauge stop:** a matrix function of \(H_e\) is not automatically an admissible
new gauge generator of the finite spectral triple.

**One-form stop:** a family matrix appearing in \(D_F\) does not by itself
create a scalar with family-dependent gauge charge under a generation-blind
algebra.

**Locality stop:** normalized spectral projectors are rational spurion
functions, not automatically renormalizable local operators.

**Positive trigger:** an explicit extended
\((\mathcal A_F,\mathcal H_F,\pi,D_F,J_F,\gamma_F)\) whose represented
one-form module contains a charge-three singlet and whose action selects one
\(P_\alpha\).

## 10. Verdict

The finite Dirac operator partly opens the pinned branch:

\[
\boxed{
\Delta_\alpha=I-3P_\alpha(H_e)
}
\]

gives a canonical, basis-covariant realization of every \(B-3L_\alpha\)
family augmentation.

But it does not finish the selection mechanism. The present data yield three
canonical candidates, no preferred candidate, and no automatic
charge-three one-form. The next task is therefore constructive: extend the
finite geometry and compute its represented one-form module rather than
continuing to search the generation-blind algebra for a field it cannot
charge.

## Position in the corpus

- [minimal two-point family algebra, unimodular \(A_2\) vertex and charge-three one-form](../1100-1199/1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [family/placement \(A_2\) intertwiner and label torsor](1098_the_family_B_minus_3Li_orbit_is_exactly_the_trace_zero_placement_A2_module_but_the_intertwiner_is_a_six_choice_label_torsor.md)
- [charged-lepton spectral projectors in a weak-basis invariant](../0100-0199/181_weak_basis_majorana_invariant_from_charged_lepton_projectors.md)
- [generation-blind Furey conjugation no-go](../0400-0499/443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)
- [generation-commutant seesaw-alignment no-go](../0100-0199/192_generation_commutant_no_go_for_automatic_seesaw_alignment.md)
- [minimal continuous lift and charge-three texture](1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
