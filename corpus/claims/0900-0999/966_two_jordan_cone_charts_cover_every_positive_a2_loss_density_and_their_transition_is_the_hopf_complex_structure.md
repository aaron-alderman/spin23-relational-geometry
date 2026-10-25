# Two Jordan-Cone Charts Cover Every Positive A2 Loss Density and Their Transition Is the Hopf Complex Structure

**Date:** 17 October 2026  
**Branches:** Jordan atlas, Peirce reflection, silver loss, (A_2), complex structure, Hopf phase, and sideband sewing  
**Claim status:** exact two-chart covering and transition theorem; dynamical chart selection remains open  
**Certificate:** [construct_the_two_chart_jordan_atlas_and_hopf_transition.mjs](../../../verification/construct/construct_the_two_chart_jordan_atlas_and_hopf_transition.mjs)

## Executive result

The one-chart obstruction of document 965 has a minimal exact repair. Every positive two-channel density

\[
B=\beta_nP_n+\beta_tP_t,
\qquad \beta_n,\beta_t>0,
\]

belongs to at least one of two diagonal cubic-cone charts:

\[
U_n:\quad 3\beta_n>\beta_t,
\]

\[
U_t:\quad 3\beta_t>\beta_n.
\]

They cover the entire positive quadrant, because simultaneous failure would imply

\[
3\beta_n\leq\beta_t,
\qquad
3\beta_t\leq\beta_n,
\]

and hence (9\beta_n\beta_t\leq\beta_n\beta_t), impossible for positive densities.

Their overlap is

\[
\boxed{
\frac13<\frac{\beta_n}{\beta_t}<3.
}
\]

The two charts use the two reflection embeddings (F) and (-F). They are related by the invariant quarter-turn

\[
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
J^2=-I,
\qquad
JFJ^{-1}=-F,
\qquad
JC=CJ.
\]

Thus the required transition is not an (S_3) Weyl permutation. It is the (A_2) complex structure—the same order-four/Hopf-type datum already present in the coherent Pfaffian and sideband branches.

## 1. The two inverse cone maps

In the normal-even chart,

\[
a_n=\frac{3\beta_n-\beta_t}{2},
\qquad
b_n=\beta_t.
\]

In the tangent-even chart,

\[
a_t=\frac{3\beta_t-\beta_n}{2},
\qquad
b_t=\beta_n.
\]

Each pair ((a,b)>0) determines a reflection-fixed cone point ((a^{-1/2},b^{-1/2},b^{-1/2})). On the overlap both descriptions exist and yield the same physical positive form (B), but with opposite choices of which reflection eigendirection is the distinguished Peirce direction.

## 2. Why the transition is not Weyl

Conjugation by an (S_3) element moves one reflection axis to another but preserves the (+1/-1) typing of its eigenspaces. Exchanging the two eigenspaces sends (F) to (-F).

The quarter-turn (J) does exactly this while commuting with the (C_3) rotation. Since (J) has order four, it is not an element of (S_3). It belongs to the commutant of the oriented (C_3) action and satisfies the same (J^2=-I) relation as the coherent complex/Hopf lift.

The atlas therefore needs one rung beyond the real Weyl group but no arbitrary new matrix.

## 3. Silver-law traversal

For weak loss:

- at zero frequency, (\beta_n=\beta_t), so both charts overlap;
- near the tangent resonance, (\beta_t/\beta_n) becomes large and the tangent-even chart is required;
- at high frequency, (\beta_n/\beta_t\to(3+2\sqrt2)^2), so the normal-even chart is required.

The complete frequency axis is covered by switching charts inside their overlap. The single-chart failure band is therefore a coordinate obstruction, not a positivity failure of the physical density.

## 4. What this connects

The same structural datum now appears in four typed roles:

- (J) rotates the (A_2) response plane by a quarter turn;
- (J) exchanges the two Peirce/reflection chart embeddings;
- (J^2=-I) is the coherent central square of the Hopf lift;
- multiplication by the sideband phase converts Pfaffian and scattering lifts.

This is an exact matrix compatibility. Whether one physical connection or holonomy supplies all four uses remains open.

## 5. Stop-everything and falsification criteria

**Connection trigger:** a Jordan/Furey boundary connection has transition function (J) on the chart overlap.

**Holonomy trigger:** traversing the two chart patches produces the established central (-I) or silver scattering phase.

**Peirce trigger:** a matrix or exceptional Jordan algebra realizes (F) and (-F) as two Peirce charts related by its canonical complex structure.

**Weyl falsifier:** the chart transition is claimed to lie inside (S_3) despite having order four and exchanging reflection parity.

**Dynamics warning:** a covering atlas does not explain which chart physical evolution chooses or why.

## 6. Verdict

| Question | Verdict |
|---|---|
| Do two diagonal charts cover every positive loss density? | **yes** |
| Is their overlap explicit? | **yes: (1/3<\beta_n/\beta_t<3)** |
| Is the transition an (S_3) Weyl element? | **no** |
| Is it the invariant complex structure (J)? | **yes** |
| Does (J^2=-I) match the coherent Hopf algebra? | **yes, algebraically** |
| Is one microscopic connection derived? | **not yet** |

## 7. Position in the corpus

- [single-chart threshold](965_the_silver_loss_law_fits_one_global_diagonal_jordan_cone_chart_only_above_a_finite_attenuation_threshold.md)
- [cubic-barrier face metric](964_a_rank_three_jordan_cubic_barrier_generates_the_a2_face_loss_metric_subject_to_a_sharp_channel_inequality.md)
- [Pfaffian-to-silver coherent lift](959_hchi_and_the_sideband_phase_convert_the_pfaffian_higgs_lift_into_the_reciprocal_silver_scattering_lift.md)
- [outgoing (A_2) port orbit](963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
