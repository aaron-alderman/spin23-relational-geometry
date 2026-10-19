# Maximal Mirror Quartics Leave Only \(B-L\) Before the Majorana Channel

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08, B11 and B13  
**Claim status:** exact one-generation exterior-algebra and species-phase-rank result; nonperturbative symmetric gap remains open

## 1. Full contraction audit

The representation census produced eight candidate four-Weyl multisets. Exact exterior-algebra contractions show that seven have nonzero one-generation local representatives:

\[
\begin{aligned}
&QQQL, &&QQu^cd^c, &&Qu^cLe^c, &&Qd^cL\nu^c,\\
&u^cu^cd^ce^c, &&u^cd^cd^c\nu^c,
&&LLe^c\nu^c.
\end{aligned}
\]

The remaining formal class,

\[
(\nu^c)^4,
\]

vanishes without derivatives or extra flavor labels because a single two-component Weyl field has only two local Grassmann generators. Equivalently, \((\nu^c\nu^c)^2=0\) at one site in the exterior algebra.

## 2. Species-phase rank

Using the ordered phase vector

\[
x=(x_Q,x_u,x_d,x_L,x_e,x_\nu),
\]

the seven nonzero quartics impose the rows

\[
\begin{pmatrix}
3&0&0&1&0&0\\
2&1&1&0&0&0\\
1&1&0&1&1&0\\
1&0&1&1&0&1\\
0&2&1&0&1&0\\
0&1&2&0&0&1\\
0&0&0&2&1&1
\end{pmatrix}x=0.
\]

This matrix has rank four. Its two-dimensional kernel is spanned by the charge directions

\[
6Y=(1,-4,2,-3,6,0)
\]

and

\[
3(B-L)=(1,-1,-1,-3,3,3).
\]

Thus the maximal derivative-free quartic set removes every continuous species-phase symmetry except gauged hypercharge and global \(B-L\).

## 3. The sterile Majorana completion

The bilinear

\[
\nu^c\nu^c+\mathrm{h.c.}
\]

is gauge invariant and imposes

\[
2x_\nu=0
\]

on continuous phases. Adding this row raises the constraint rank from four to five. The only continuous kernel direction is then hypercharge.

Therefore:

\[
\boxed{
\text{seven nonzero quartics}
+\nu^c\text{ Majorana}
\quad\Longrightarrow\quad
\text{no accidental continuous species }U(1).
}
\]

This is the first symmetry-complete local mirror interaction candidate found in the branch.

## 4. What this does not prove

Removing accidental continuous phases is necessary but not sufficient for a symmetric short-range-entangled gap. The interaction may still:

- break the gauge group through a bilinear condensate;
- break a discrete remnant;
- retain massless composite fermions;
- develop topological order;
- pass through an uncontrolled first-order transition.

Nor has the full discrete global symmetry or its cobordism/anomaly class been computed. “Only hypercharge remains continuously” is not the same as “no global obstruction remains.”

## 5. A concrete regulated target

On the remote wall, define

\[
H_{\rm mirror}
=H_{\rm kinetic}
+\sum_{A=1}^{7}
\left(g_A\mathcal O_A+\bar g_A\mathcal O_A^\dagger\right)
+M_\nu\left(\nu^c\nu^c+\mathrm{h.c.}\right).
\]

The next nonperturbative task is to find a coupling region where:

1. the Standard-Model gauge symmetry remains unbroken;
2. all mirror correlation lengths are finite;
3. the ground state is unique on closed spatial manifolds, unless a specific topological order is intended;
4. no massless composite saturates a residual anomaly;
5. the distant physical-wall Schur response remains chiral and passive.

## 6. Implication for the sixteen-state completion

The sterile neutrino is no longer merely a dimension-counting convenience. In this mirror branch it supplies the only bilinear capable of eliminating the final continuous global \(B-L\) direction after the maximal quartics are included.

That is a structural role, not yet a prediction. A different interaction with derivatives, multiple generations or explicit \(B-L\) violation could alter the conclusion.

## 7. Jordan/Furey gate

The seven nonzero contractions define a stringent target for the Furey algebra:

- Does ternary closure generate all seven, a rank-four subset, or only the rank-two cover?
- Does the exceptional cubic norm select the \(B-L\)-preserving set?
- Does the unique neutrino TRO completion canonically supply the Majorana row?

A positive answer would connect the sixteen-state Furey completion to a finite chiral regulator problem in a way ordinary representation matching does not.

## 8. Stop-everything and falsification gates

**Positive trigger:** the Furey/TRO product canonically generates a symmetry-complete subset of the seven quartics plus the neutral Majorana channel, and its regulated Hamiltonian has a demonstrable unique symmetric gap.

**Neutrino trigger:** the gap exists only with the \(\nu^c\) completion, turning the sixteenth state into a necessary regulator ingredient.

**Discrete-anomaly trigger:** a residual discrete subgroup obstructs a trivial gap and forces identifiable topological order.

**Falsifier:** an alleged symmetry-complete quartic set has constraint rank below four, or uses the locally vanishing one-generation operator \((\nu^c)^4\) as an independent interaction.

## 9. Certificate

The [full mirror quartic contraction/rank certificate](../../../verification/verify/verify_mirror_full_quartic_contraction_rank.mjs) constructs explicit exterior-algebra representatives for all seven nonzero classes, proves the sterile fourth power vanishes, computes rank four with kernel \(\mathrm{span}\{Y,B-L\}\), and verifies that the sterile Majorana row raises the rank to five.

## Companion documents

- [Covering quartics and residual symmetry](241_covering_mirror_quartics_are_nonzero_but_leave_large_global_symmetry.md)
- [Mirror quartic hypergraph](240_mirror_quartic_hypergraph_covers_generation_but_does_not_prove_gap.md)
- [Unique right-handed-neutrino TRO completion](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [One-generation anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
