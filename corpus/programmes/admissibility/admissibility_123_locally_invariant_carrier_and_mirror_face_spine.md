# The Locally Invariant Carrier and Its Mirror Face

**Date:** 25 October 2026
**Status:** exact symplectic and primitive-form construction; intuitive naming adopted as corpus vocabulary; physical carrier identification remains open

## The change of basis

The corpus can be read from one concrete relation:

\[
M^{T}\Omega M=\Omega.
\]

Here \(V\cong\mathbb R^4\) is the living carrier on which states, responses or
frame data transform, \(M\) is an admissible change of perspective, and
\(\Omega\) is the **locally invariant carrier**: the relation that remains
intelligible in every allowed local frame.

The name is intentionally more intuitive than “preserved alternating
bilinear form,” but it does not discard the mathematical typing. Strictly,
\(V\) carries the transformed objects and \(\Omega\) carries their invariant
comparison. Calling \(\Omega\) a carrier emphasizes that identity is borne by
a relation, not necessarily by a coordinate value.

## The thing and its mirror face

The symplectic relation is equivalent to

\[
M^{-1}=\Omega^{-1}M^T\Omega
\]

and

\[
\Omega M=M^{-T}\Omega.
\]

Thus the direct action \(M\) and the dual action \(M^{-T}\) are the two faces
of one transformation. The invariant carrier joins them:

\[
\begin{array}{ccc}
V & \xrightarrow{M} & V\\
\downarrow\Omega && \downarrow\Omega\\
V^* & \xrightarrow{M^{-T}} & V^* .
\end{array}
\]

The **mirror face** is therefore not a decorative reflection. It is the
contragredient action required for the comparison between a thing and its
dual to survive transformation.

In a polarization \(V=L\oplus L^*\),

\[
\Omega=
\begin{pmatrix}
0&I\\
-I&0
\end{pmatrix},
\qquad
M=
\begin{pmatrix}
A&B\\
C&D
\end{pmatrix}.
\]

The blocks are constrained together by \(M^T\Omega M=\Omega\). Neither face
is autonomous: shearing, squeezing or rotating one changes the compatible
description of the other while preserving their cross-pairing.

## Three meanings of invariant

The corpus must keep three levels separate.

### 1. Pointwise local invariance

\[
M_x^T\Omega_xM_x=\Omega_x.
\]

At one point, patch or experimental setting, an allowed perspective change
preserves the declared comparison.

### 2. Carried invariance

\[
\nabla\Omega=0.
\]

A compatible connection transports the comparison law along a path. This is
stronger than checking one matrix identity and is the correct level for local
gauge or frame language.

### 3. Global return

\[
H_\gamma^T\Omega H_\gamma=\Omega
\quad\text{while possibly}\quad
H_\gamma\ne I.
\]

Transport around a loop can preserve the locally invariant carrier yet return
the attached state, frame or polarization changed. Local invariance therefore
does not imply global triviality. Holonomy, phase, topology and path memory
live in the difference.

\[
\boxed{\text{locally the same relation}\not\Rightarrow
\text{globally the same perspective}.}
\]

## The higher relation space

The four-dimensional carrier generates a six-dimensional space of pairwise
relations:

\[
\dim\Lambda^2V^*=6.
\]

The invariant carrier occupies one line. Its primitive complement is

\[
W=\Lambda^2_0V^*
=\{\alpha\in\Lambda^2V^*:\alpha\wedge\Omega=0\},
\qquad
\Lambda^2V^*=\mathbb R\Omega\oplus W,
\qquad
\dim W=5.
\]

The wedge product defines a symmetric pairing on two-forms:

\[
\alpha\wedge\beta=Q(\alpha,\beta)\,\mathrm{vol}.
\]

Restricted to \(W\), and after an overall orientation convention, \(Q\) has
signature \((2,3)\). Consequently the symplectic action induces

\[
Sp(V,\Omega)\longrightarrow SO(W,Q),
\]

with the familiar low-rank relation

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The five-dimensional orthogonal geometry is therefore generated from
relations among pairs of directions in the four-dimensional carrier. It is
not necessary to declare five hidden physical coordinates.

## The selector supplies perspective

The independently prior selector package supplies a positive metric \(G_0\)
compatible with \(\Omega\). Up to the corpus normalization,

\[
\mathcal I=\sqrt3\,G_0^{-1}\Omega,
\qquad
\mathcal I^2=-1.
\]

The induced involution on primitive two-forms splits

\[
W=W^-_2\oplus W^+_3.
\]

The wedge pairing has opposite signs on these two sectors. This produces the
signature-\((2,3)\) normal form from source-native selector data rather than
inserting it after the desired group was known.

The roles are now distinct:

| Corpus name | Mathematical role | Question |
|---|---|---|
| living carrier \(V\) | four-dimensional representation | what changes? |
| perspective transformation \(M\) | direct symplectic action | how does it change? |
| mirror face \(M^{-T}\) | dual/contragredient action | how must its counterpart change? |
| locally invariant carrier \(\Omega\) | preserved alternating comparison | what keeps the faces mutually intelligible? |
| perspective selector \(G_0,\mathcal I\) | compatible metric and complex structure | how is a signed split exposed? |
| higher relation space \(W\) | primitive two-form module | where do pairwise relations transform? |
| global signature \(Q\) | wedge pairing of type \((2,3)\) | what higher geometry is preserved? |

## Rewriting the Jordan--Lie--dynamics spine

The earlier explanatory order remains valid but becomes more concrete:

\[
\boxed{\text{Jordan admission}}
\longrightarrow
\boxed{\text{living carrier and allowed relations}}
\longrightarrow
\boxed{\text{locally invariant carrier}}
\longrightarrow
\boxed{\text{Lie transport of thing and mirror face}}
\longrightarrow
\boxed{\text{holonomy, selection, dynamics and record}}.
\]

Jordan structure determines which objects and compositions can inhabit the
carrier. The locally invariant carrier states what comparison must survive a
change of perspective. Lie structure closes the transformations that preserve
that comparison. A connection carries it through space or parameter space.
Dynamics selects actual histories. Holonomy and detectors determine which
global difference survives as a record.

This also sharpens admissibility:

> A transformation is admissible not merely when it maps available states to
> states, but when the thing, its mirror face, their invariant comparison,
> the path of transport and the eventual detector record remain jointly
> well-typed.

## Physical firewall

The exact construction does not yet establish:

- that \(V\) is physical phase space, spacetime or a fundamental field space;
- that \(\Omega\) is a unique law of nature rather than a response or control
  invariant;
- that \(W\) consists of physical extra dimensions;
- that \(Q\) is the measured spacetime metric;
- that a compatible connection or action is selected by nature; or
- that nontrivial holonomy is dynamically prepared and detector-visible.

The current physical target is one source-native system in which the direct
and mirror actions, the locally invariant carrier, compatible transport,
global return and detector record are independently measurable.

## Existing exact supports

- [Selector-induced signature-\((2,3)\) form](../frontier/wave-7/frontier_wave7_66_selector_induced_signature23_form.md)
- [Five-dimensional link span and quadratic envelope](admissibility_16_five_dimensional_link_span_and_spin23_quadratic_envelope.md)
- [Transport of the full \(Sp(4)\) closure to the link carrier](admissibility_18_existing_sp4_closure_transports_to_the_link_carrier.md)
- [Linear flow versus antiunitary mirror-edge dynamics](admissibility_20_linear_flow_versus_antiunitary_edge_dynamics.md)
- [Quarter-turn, holonomy and open closure](admissibility_21_quarter_turn_wick_goldstone_cloud_and_open_closure.md)
- [Universal projector connection](admissibility_22_universal_projector_connection_as_quarter_turn_crossbar.md)
- [Holonomy-driven selector breaking](admissibility_23_holonomy_driven_selector_breaking_and_reflexive_closure.md)

## Compact corpus sentence

> A living carrier changes through a perspective transformation and its mirror
> face. The locally invariant carrier keeps those faces mutually intelligible.
> Their pairwise relations inhabit a higher space whose primitive remainder
> carries the signature-\((2,3)\) geometry. Dynamics does not have to break
> local intelligibility: it may preserve it along every step while producing
> globally nontrivial holonomy, selection and records.
