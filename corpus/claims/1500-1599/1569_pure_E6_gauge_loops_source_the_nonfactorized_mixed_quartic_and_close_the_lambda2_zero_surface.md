# Pure E6 Gauge Loops Source the Nonfactorized Mixed Quartic and Close the Lambda2-Zero Surface

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact canonical-basis generator contraction; pure-gauge one-loop obstruction established

**Depends on:** [the canonical mixed-quartic Hessian](1568_the_nonfactorized_E6_quartic_regenerates_both_bidoublet_mixings_and_closes_the_minimal_nonsupersymmetric_inert_route.md) and [the nonsupersymmetric vacuum and residual-selector theorem](1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md)

**Primary sources:** [E6Tensors](https://arxiv.org/abs/1605.05920), its program archive [DOI 10.17632/tk3xtvsd7b.1](https://doi.org/10.17632/tk3xtvsd7b.1), and the general scalar-quartic RGE formula in [Schienbein et al.](https://arxiv.org/abs/1809.06797)

**Evidence:** [gauge-loop contraction ledger](../../../evidence/data/spin23-e6-gauge-loop-lambda2-source.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_gauge_loop_lambda2_source.mjs)

## Result

The tuned surface \(\lambda _2=0\) is not closed under pure E6 gauge
renormalization.  In the published canonical basis, define

\[
K(\psi,S)=\sum_{A,B}
 \bigl(\psi^\dagger\{T_A,T_B\}\psi\bigr)
 \operatorname{tr}\!\left[S^\dagger\{L_A,L_B\}S\right],
\qquad
L_A(S)=T_AS+ST_A^T.
\]

This is the complex-field form of the anticommutator tensor appearing in
the pure-gauge \(g^4\) term of the general one-loop scalar-quartic beta
function.  Direct contraction of all 78 E6 generators gives

\[
\boxed{K={28\over9}I_1+20I_2,}
\]

where

\[
I_1=(\bar\psi^\mu\psi_\mu)
    (\bar S^{\sigma\tau}S_{\sigma\tau}),
\qquad
I_2=\bar\psi^\mu\psi_\nu
    \bar S^{\nu\tau}S_{\mu\tau}.
\]

The coefficient of \(I_2\) is nonzero.  Therefore gauge loops require an
\(I_2\) counterterm even when its tree coefficient is set to zero:

\[
\boxed{\left.\beta_{\lambda _2}\right|_{\lambda _2=0}
       \supset c\,g^4,\qquad c\ne0.}
\]

The numerical value of \(c\) depends on the real-versus-complex field and
potential normalizations used to define \(\lambda _2\).  Its nonvanishing
does not.

## 1. General one-loop criterion

For real scalars, the general one-loop quartic RGE contains

\[
\beta^{(1)}_{abcd}\supset3g^4A_{abcd},
\qquad
A_{abcd}={1\over8}\sum_{\mathrm{per}}
\{\theta^A,\theta^B\}_{ab}
\{\theta^A,\theta^B\}_{cd}.
\]

These are equations (24) and (69) of Schienbein et al.  Recombining real
fields into the complex 27 and symmetric 351-prime gives the tensor \(K\)
above, up to the conventional overall factors that do not affect whether
a projection is zero.  Equivalently, the same tensor is the mixed term in
\(\operatorname{Tr}(M_V^4)\) for the field-dependent gauge-boson mass
matrix.

Consequently, the RG-closure question is reduced to a finite group-theory
calculation: does \(K\) have an \(I_2\) component?

## 2. Canonical generator audit

The official `E6gen.m` file contains 78 Hermitian 27-by-27 generators.
The extraction verifies

\[
\operatorname{tr}(T_AT_B)=3\delta_{AB}
\]

with maximum diagonal residual \(1.34\times10^{-15}\), maximum
off-diagonal residual \(5.56\times10^{-17}\), and zero stored
Hermiticity residual.  The symmetric-tensor action is fixed by the source
convention and by the vacuum invariance equation:

\[
L_A(S)=T_AS+ST_A^T.
\]

No subgroup branching approximation enters the contraction.

## 3. Mixed-Hessian projection

Use the same singlet background and neutral tangent directions as claim
1568:

\[
\psi=e_{13},\qquad S=T_{229}=E_{13,13},
\]

with fundamental tangents \(e_{17},e_{12}\) and complete canonically
normalized symmetric tangents \(U_{291},U_{311}\).  The full tensors are
important: each doublet direction has five mirrored entry pairs and unit
Frobenius norm.

For either neutral channel exactly 32 ordered generator pairs contribute.
Eight give

\[
{ -5+3\sqrt5\over8\sqrt{10}},
\]

and twenty-four give

\[
{ -5-\sqrt5\over8\sqrt{10}}.
\]

Their sum is

\[
8{ -5+3\sqrt5\over8\sqrt{10}}
+24{ -5-\sqrt5\over8\sqrt{10}}
=-2\sqrt{10}.
\]

Hence

\[
\left.\partial_{\bar H_{27,u}}\partial_{H_{S,u}}K\right|_{s,T_{229}}
=
\left.\partial_{\bar H_{27,d}}\partial_{H_{S,d}}K\right|_{s,T_{229}}
=-2\sqrt{10}.
\]

Claim 1568 found the corresponding \(I_2\) Hessian to be
\(-1/\sqrt{10}\), while the \(I_1\) Hessian vanishes.  The quotient is
therefore exactly 20.  On the unit singlet background the complete
contraction is \(K=208/9\), while \(I_1=I_2=1\); subtracting the
\(20I_2\) part fixes the remaining coefficient to \(28/9\).

## 4. Naturalness verdict

The possible loophole left by claim 1568 was narrower than an ordinary
tuning: perhaps \(\lambda _2=0\), although not enforced by the commuting
abelian selector, happened to define an RG-invariant surface.  The gauge
calculation excludes that possibility without using Yukawa or scalar-loop
terms.

At any nonzero E6 gauge coupling, the pure-gauge contribution already
points out of the \(\lambda _2=0\) surface.  Other one-loop contributions
could cancel it at one selected scale, but that would be an additional
relation among independent couplings, not closure of the surface and not
a Ward identity.

The branch verdict is therefore

\[
\boxed{
\begin{array}{rcl}
\text{tree-level }\lambda _2=0\text{ choice}&=&\mathrm{possible},\\
\text{pure-gauge RG closure}&=&\mathrm{NO},\\
\text{commuting-abelian technical protection}&=&\mathrm{NO},\\
\text{minimal nonsupersymmetric inert route}&=&\mathrm{CLOSED}.
\end{array}}
\]

## Spin(2,3) status

This sharpens the required Spin(2,3) bridge.  It is not enough for a new
selector to remove \(I_2\) from a tree potential.  The selector must extend
to the gauge-sector Ward identities so that the ordinary E6
anticommutator tensor cannot regenerate the forbidden relation channel.
Because the source is built entirely from E6 generators, a commuting
uniform phase on each irreducible multiplet cannot do this.

A viable construction must therefore supply at least one of:

1. a relation- or multiplicity-space grading under which the two
   contractions \(I_1\) and \(I_2\) differ and whose Ward identity is
   respected by gauge vertices;
2. an enlarged multiplet/correspondence structure in which projected
   gauge tensors cancel identically rather than by coupling adjustment;
3. a supersymmetric or other nonminimal completion whose full field
   content changes the protected operator algebra while retaining the
   required vacuum.

This is a more stringent target than assigning another E6-commuting
charge: the missing structure must modify how gauge relations act on the
two contraction channels.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_gauge_loop_lambda2_source.mjs
~~~
