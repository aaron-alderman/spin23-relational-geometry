# A seam changes admissible continuations but does not by itself trigger decay

**Date:** 26 October 2026  
**Status:** exact local distinction and conditional electroweak conjecture; no W/Z mechanism derived  
**Parents:** [local motion alphabet](admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md), [quarter-turn and mirror seam](admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md), [transition operators and lifetimes](admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md), [widths, coherence and escape](admissibility_128_widths_coherence_and_escape_are_not_one_lifetime.md)  
**Evidence:** [seam/channel/collapse separation](../../../evidence/data/admissibility-seam-channel-collapse-separation-v1.json)  
**Verifier:** [logical and matrix boundary certificate](../../../verification/admissibility/verify_seam_channel_collapse_separation.mjs)

## Correction

Crossing the parabolic seam and entering a decay channel are different
operations. The seam classifies the local generator or continuation geometry.
A decay channel requires a physical transition operator, a nonzero matrix
element and available final-state phase space. Neither statement implies the
other.

The safe chain is

\[
\boxed{\text{motion within a prepared mode}}
\longrightarrow
\boxed{\text{change in the locally available continuations}}
\longrightarrow
\boxed{\text{one of the independently supplied outgoing channels}}
\longrightarrow
\boxed{\text{detector record}}.
\]

This replaces the stronger and unsupported sentence “crossing the seam
triggers decay.” The seam can alter which futures remain available without
being the interaction that gives any one future its amplitude.

## Local no-return is not global noninvertibility

Let the globally admitted carrier be covered by typed mode charts

\[
\mathcal A=\bigcup_{\alpha}\mathcal A_\alpha .
\]

A state can leave the parent chart \(\mathcal A_P\) and continue in another
chart \(\mathcal A_{Q_j}\) while the full evolution remains admissible and
invertible. If \(P\) projects onto the parent mode, then

\[
P U(t)P
\]

need not be invertible as an autonomous parent-mode evolution even when the
full \(U(t)\) is unitary. Information lost from the parent description can be
carried by the complementary modes \(Q=1-P\). “No way back” must therefore
mean no return inside a declared local chart, on a declared timescale and at a
declared detector resolution. It must not be used to deny a global inverse.

This is also the correct detector language. A detector closes locally when
every retained outcome and every material loss port has a typed destination.
It need not reconstruct the whole global state. At another scale the same
event may be represented as mode conversion, an effective pole width, a jump,
heat or an unobserved environment record.

## The seam is a branching boundary

On the local Clifford plane, write

\[
G(a,b)=aI+bJ,
\qquad I^2=-1,
\qquad J^2=+1,
\qquad IJ=-JI.
\]

Then

\[
G(a,b)^2=(b^2-a^2)\mathbf 1.
\]

The discriminant

\[
\Delta=b^2-a^2
\]

separates elliptic, parabolic and hyperbolic local motion. The matrix
exponential remains invertible on all three branches because

\[
\det e^{tG}=e^{t\operatorname{tr}G}=1.
\]

The exact algebra therefore supplies no decay by itself. What can change at
\(\Delta=0\) is the kind of local continuation: recurrent, tangent or
separating. Once physical channels are added, the seam can organize a fork:

\[
\text{parent mode at the seam}
\begin{cases}
\longrightarrow \text{an already available decay channel},\\
\longrightarrow \text{another stable or metastable mode},\\
\longrightarrow \text{reflection or trapping},\\
\longrightarrow \text{extension of the state description},\\
\longrightarrow \text{local closure or collapse candidate}.
\end{cases}
\]

The last line is admissible only after the preceding continuations have been
excluded in the declared theory and detector chart. A chart boundary is not
automatically an ontological boundary.

## The exit point is not automatically a centroid

For a trajectory \(x(t)\) in a local chart \(\mathcal A_P\), define the first
exit time

\[
\tau_{\rm exit}=\inf\{t\geq0:x(t)\notin\mathcal A_P\}.
\]

The boundary value \(x(\tau_{\rm exit})\), when it exists, is selected by the
history, generator and preparation. There is no general reason for it to be a
centroid or analytic centre. It is not yet canonical either: recrossing,
noise, alternative charts and detector resolution can produce several first
or apparent exits. A physically privileged value requires a committed-exit
rule, such as negligible return probability for a stated dwell time, or an
irreversible record in a declared environment.

## Conditional W/Z reading

The proposed electroweak reading is a research conjecture, not an established
identification. To avoid collision with the standard relaxation times
\(T_1\) and \(T_2\), call the corpus's two local generators
\(T_{\rm e}\) (elliptic/return-capable) and \(T_{\rm h}\)
(hyperbolic/separating) until a physical dictionary is derived.

The conjecture has three separable claims:

1. a W or Z parent sector carries a physically derived mixture
   \(G=aT_{\rm e}+bT_{\rm h}\);
2. its motion can approach or cross the local null seam
   \(b^2-a^2=0\), changing the continuation geometry of that parent mode;
3. an additional transition operator or continuation channel couples the
   parent to a final sector.

Claim 2 does not prove claim 3. The known W/Z decays already have Standard
Model electroweak operators and phase space. The proposed seam mechanism can
only add physics if it supplies an independently derived additional channel,
modifies an existing amplitude in a constrained way, or predicts a correlated
change in a measurable record. If the proposed pathway ends in the same final
state as a Standard Model pathway, amplitudes interfere before squaring; its
effect is not generally an additive partial width. If it ends in an
orthogonal final sector, its partial width may be added to the total.

The narrower speculative statement is:

> A local Spin-type T1/T2 mixture may change the admissible continuation
> structure of a W/Z parent mode. An independently available decay channel is
> one possible continuation. If no outgoing, reflected, trapped or extended
> continuation exists, seam crossing may mark a candidate local closure event
> conventionally described as collapse.

Nothing here derives that physical dictionary from
\(Spin_0(2,3)\cong Sp(4,\mathbb R)\). The exact result remains the local
\(Spin_0(2,1)\) cell of AZ-130. A full claim requires an embedding, an action,
the electroweak representation content and a detector-facing amplitude.

## Minimal coupled-sector model

The distinction can be made calculable with a parent/continuation split,

\[
H=
\begin{pmatrix}
H_P(G)&V^\dagger\\
V&H_Q
\end{pmatrix}.
\]

The seam classifier belongs to \(H_P(G)\). The channel map \(V\) is separate.
Eliminating \(Q\) gives

\[
H_{\rm eff}(E)=H_P(G)+
V^\dagger(E-H_Q+i0)^{-1}V
=H_P(G)+\Delta H(E)-\frac{i}{2}\Gamma(E).
\]

The imaginary part appears only when the coupling and on-shell continuation
are present. Setting \(V=0\) leaves the elliptic/parabolic/hyperbolic seam but
removes the channel width. Holding \(G\) fixed while changing \(V\) changes
the width without moving the seam. These two interventions are the smallest
test that the two mechanisms have not been identified by notation.

## Falsifiable programme

The first useful calculation is not a fit to the known W or Z total width. It
is a source-derived parent-plus-channel amplitude with the following frozen
outputs:

- the physical meaning and normalization of \(T_{\rm e}\) and
  \(T_{\rm h}\);
- the discriminant \(\Delta\) for photon, W and Z sectors;
- the operator \(V\), final-state quantum numbers and threshold law for the
  proposed additional pathway;
- whether the new contribution is an orthogonal partial width or an
  interfering amplitude in an existing final state;
- one channel-specific dependence on polarization, production history,
  virtuality or threshold that is not obtained by refitting the total width;
- the detector likelihood and nuisance model needed to retain that
  dependence.

### Go/no-go decisions

- **Translation gate:** no physical generator and embedding means the result
  remains an algebraic analogy.
- **Independence gate:** if the proposed channel is only a relabelling of a
  Standard Model interaction, the new-mechanism claim closes negatively.
- **Calculation gate:** the model must reproduce gauge consistency, the
  photon branch and established W/Z pole and branching structure before its
  residual is examined.
- **Separating-record gate:** a total-width fit alone is insufficient. At
  least one preregistered channel, polarization, threshold or line-shape
  contrast must separate seam motion from ordinary coupling variation.
- **Collapse gate:** collapse language is refused while mode conversion,
  reflection, trapping, state-space extension, environment records or
  detector coarse-graining remain viable continuations.
- **New-physics gate:** only a replicated residual outside the complete
  Standard Model, source-derived seam model and detector covariance can be
  promoted beyond theoretical engineering.

## Implications

The immediate gain is conceptual but operational. The corpus now has a place
for a boundary that changes possible futures without pretending that the
boundary supplies their forces. It also has a disciplined version of “no way
back”: local loss of return can coexist with global conservation because the
outgoing channel carries the continuation.

The hopeful instruction is concrete: look for records in which changing the
putative seam coordinate and changing the channel coupling give different
answers. If such a separating record exists, the construction may improve
resonance and decay engineering even if it finds no new particle physics. If
the separation survives a complete electroweak calculation and independent
detectors, it identifies a legitimate place to look for new physics.

## Endpoint

> A seam changes the menu of admissible continuations. A transition operator
> gives one continuation an amplitude. A detector records part of what
> followed. Collapse is not the first name for the crossing; it is the last
> remaining local description after the other continuations have been
> excluded.
