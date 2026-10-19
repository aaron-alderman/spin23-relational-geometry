# A Local Real Interface Supplies the Antiunitary Sideband Twist and Closes the Boundary-Monodromy Model

**Date:** 17 October 2026  
**Branches:** local boundary action, real response fields, sideband sewing, flux conservation, and active $A_2$ monodromy  
**Claim status:** exact local effective-interface construction; microscopic Standard-Model derivation remains open  
**Certificate:** [construct_a_local_real_interface_whose_fourier_sewing_supplies_the_sideband_twist.mjs](scripts/construct_a_local_real_interface_whose_fourier_sewing_supplies_the_sideband_twist.mjs)

## Executive result

The boundary operation needed by document 904 can be realized locally without asking a unitary evolution to generate complex conjugation.

Take two real neutral two-component response fields $q_1(x,t)$ and $q_2(x,t)$ on the two sides of an interface. Impose

\[
q_2(0,t)=Dq_1(0,t),
\qquad
D=\operatorname{diag}(1,-1),
\]

together with the oriented normal-derivative condition

\[
p_2(0,t)=Dp_1(0,t).
\]

Because $D^TD=I$, the interface cancels the boundary variation and preserves the quadratic energy flux. Since the fields are real,

\[
q_a(-\omega)=\overline{q_a(+\omega)},
\]

and the same local condition becomes

\[
q_2(-\omega)=D\overline{q_1(+\omega)}.
\]

This is exactly the required $DK$ sideband sewing. Anti-linearity arises from Fourier reality, not from a forbidden dynamical conjugation channel.

The result closes the **local effective boundary model** for the active Coxeter cycle. It does not yet derive the neutral response fields or their interface from the microscopic Standard Model.

## 1. Variational interface

Consider standard real quadratic bulk actions on two oriented half-spaces. Their on-shell boundary variation has the form

\[
\delta S_{\partial}
=-p_1^T\delta q_1+p_2^T\delta q_2.
\]

Restrict the boundary configurations by

\[
q_2=Dq_1,
\qquad
\delta q_2=D\delta q_1.
\]

Then choosing $p_2=Dp_1$ gives

\[
\delta S_{\partial}
=-p_1^T\delta q_1
+p_1^TD^TD\delta q_1
=0.
\]

Thus the sewing is a legitimate self-adjoint interface condition for the quadratic response problem.

Equivalently, it may be imposed by a local boundary multiplier

\[
S_{\rm int}
=\int dt\;\lambda^T(q_2-Dq_1),
\]

with the multiplier equations supplying the corresponding momentum jump. The constrained-domain form is cleaner because it makes exact gluing immediate.

## 2. Flux preservation

For the canonical quadratic flux

\[
\mathcal F=p^T\dot q,
\]

the interface gives

\[
\mathcal F_2
=(Dp_1)^T(D\dot q_1)
=p_1^T\dot q_1
=\mathcal F_1.
\]

The determinant of $D$ is $-1$, but this does not imply loss: $D$ is orthogonal and the spatial orientation reversal is already carried by the two outward normals. The interface is conservative.

## 3. Fourier-sideband sewing

Reality of the time-domain fields gives

\[
q_1(-\omega)=\overline{q_1(+\omega)}.
\]

Applying the same real matrix $D$ at the interface yields

\[
q_2(-\omega)
=Dq_1(-\omega)
=D\overline{q_1(+\omega)}.
\]

Therefore the positive-frequency envelope on face 1 and the negative-frequency envelope on face 2 are related by $DK$. No device creates $K$; the real field supplies it kinematically.

This is consistent with document 907: the interface is real-linear on physical fields, not a complex-linear quantum channel purporting to implement transposition.

## 4. Recovery of the active Coxeter cycle

Let the two mediator normals be

\[
g_+=(1,\sqrt3),
\qquad
g_-=Dg_+=(1,-\sqrt3).
\]

Their Householder reflections obey

\[
R_-=DR_+D.
\]

The document-904 rational-inner response supplies the required common-phase reflection on each analytic face. Sideband conjugation reverses the common phase, while the local interface supplies $D$. Hence the cascade is

\[
R_-R_+=C_{A_2},
\qquad
C_{A_2}^3=I.
\]

This provides an explicit local boundary interpretation of “one carrier, two faces, one twist”:

- one real neutral response field modulo interface identification;
- two oriented half-space faces;
- one orthogonal relationship reversal $D$;
- Fourier reality supplying the antiunitary part;
- the two face responses composing to the order-three active rule.

## 5. What has and has not closed

Closed exactly:

- a local, conservative, variationally admissible interface exists;
- its Fourier form is the required $DK$ sewing;
- it respects the no-unitary-conjugation theorem;
- it converts the two rational-inner reflections into the exact $A_2$ Coxeter element.

Still open:

- derivation of $q_1,q_2$ as local effective fields of the Higgs-dressed, color-contracted Standard-Model responses;
- derivation of $D=h\chi$ as the actual microscopic matching condition rather than inserted boundary data;
- protection of the silver-ratio pole relation;
- sewing of the separate neutral fixed plane and generation of the full selector handle.

## 6. Stop-everything and falsification criteria

**Microscopic-interface trigger:** integrating out a specified Standard-Model/Furey boundary sector yields $q_2=h\chi q_1$ and the corresponding normal-derivative matching.

**Locality trigger:** the neutral response admits a derivative expansion for which the interface remains local and conservative over the pole-scale window.

**Topological trigger:** $D$ is forced as a real-bundle transition function or defect holonomy, making the twist discrete rather than tuned.

**Variational falsifier:** a proposed microscopic interface cannot satisfy the paired configuration/momentum matching and leaks the relevant quadratic flux.

**Typing falsifier:** the interface is applied before Higgs dressing and color contraction, where its entries are still gauge-charged.

**Overclaim warning:** existence of this effective boundary condition is presented as its microscopic Standard-Model derivation.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is there a local real boundary condition producing $DK$ in Fourier space? | **yes** |
| Is it variationally consistent? | **yes** |
| Does it preserve quadratic flux? | **yes** |
| Does it evade the unitary-conjugation no-go honestly? | **yes; $K$ comes from field reality** |
| Does it give the exact active $C_3$ with the rational-inner faces? | **yes** |
| Is it derived from microscopic Standard-Model dynamics? | **not yet** |

## 8. Position in the corpus

- [exact rational-inner sideband cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [canonical classification of the sideband exchange](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
- [no unitary dilation of exact conjugation](907_a_neutral_idler_swap_routes_but_cannot_generate_the_antiunitary_sideband_sewing.md)
- [$h\chi$ as the required response sign](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
