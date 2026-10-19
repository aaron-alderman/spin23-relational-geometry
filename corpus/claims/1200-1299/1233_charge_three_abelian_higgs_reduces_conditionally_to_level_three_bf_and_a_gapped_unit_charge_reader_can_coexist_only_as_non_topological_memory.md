# Charge-three Abelian Higgs reduces conditionally to level-three BF, and a gapped unit-charge reader can coexist only as non-topological memory

> **Scope qualification:** the BF coefficient has conditionally exact normalization under the stated compact-field conventions. The pure BF description is the strict-infrared topological EFT after massive modes are integrated out; global sectors and boundary data remain assumptions rather than consequences of the local dualization alone.

**Date:** 20 October 2026  
**Status:** explicit normalization, dualization, source, boundary and quadratic-spectrum audit; compactification origin, orientation selection and reader localization remain open  
**Role:** direct attack on candidate-action gate A2

## Result in one sentence

A compact \(U(1)\) field Higgsed by a charge-three scalar reduces with exact
normalization to four-dimensional level-three BF theory and, under the declared
\(S^1/\mathbb Z_2\) parity, to a three-dimensional \(3c\,da/(2\pi)\) zero-mode
sector with a well-posed boundary variation; a massive defect charge-one scalar
can coexist with that phase and read its holonomy, but it is non-topological memory
whose virtual winding exponentially splits finite-size sectors, while the CP-even
action neither derives the orbifold defect nor selects one vortex orientation.

## 1. Everyday picture

Imagine a circular pond covered by a material that allows only whirlpools carrying
one third of the original circulation unit. Far from a whirlpool, a small ruler
sees calm water. A buoy carried all the way around it returns with a phase.

Now place a thin observation deck through the pond. The whirlpool is not the deck:

- the whirlpool traces a sheet through spacetime;
- the deck traces a three-dimensional worldvolume;
- their intersection traces a line on the deck.

A heavy charged bead confined to the deck can circle that line and read its phase.
If the bead is heavy enough, the deck still looks topological at low energy. But
the bead is also the reason the topological sectors are not perfectly isolated in
a finite apparatus.

## 2. Compact normalization and charge-three Higgs action

Use a compact connection \(a\) normalized so that

\[
W_1(C)=\exp\!\left(i\oint_Ca\right)
\]

is the Wilson line of unit charge. A gauge transformation has

\[
a\mapsto a+d\alpha,
\qquad
\alpha\sim\alpha+2\pi.
\]

Take a charge-three scalar

\[
s={v+\sigma\over\sqrt2}e^{i\theta},
\qquad
\theta\mapsto\theta+3\alpha.
\]

The Euclidean action, restricted to the Abelian Higgs sector, is

\[
\begin{aligned}
S=\int_{M_4}\Big[&{1\over2e^2}f\wedge *f
+{1\over2}d\sigma\wedge*d\sigma\\
&+{(v+\sigma)^2\over2}(d\theta-3a)\wedge*(d\theta-3a)
+\lambda\left(|s|^2-{v^2\over2}\right)^2*1\Big].
\end{aligned}
\]

The residual transformations preserving the condensate obey

\[
e^{3i\alpha}=1,
\]

so the unbroken gauge group is precisely \(\mathbb Z_3\). A charge-one field
transforms faithfully under all three elements.

## 3. Massive spectrum before dualization

Introduce the canonically normalized vector \(A=a/e\). Expanding around
\(\sigma=0\) gives

\[
m_\sigma^2=2\lambda v^2,
\qquad
m_A^2=9e^2v^2.
\]

The displayed certificate uses

\[
e=0.4,
\qquad v=2,
\qquad\lambda=0.5,
\]

and obtains

\[
m_\sigma=2,
\qquad m_A=2.4.
\]

The radial scalar supplies one massive mode. The Higgsed four-dimensional vector
has three polarizations. Dualizing the phase does not add another physical mode;
the two-form description repackages the same massive sector before the strict
infrared limit is taken.

## 4. Exact phase dualization and BF normalization

Below the radial gap, set \(\sigma=0\) and write

\[
x=d\theta-3a.
\]

An explicitly normalized first-order action is

\[
S_{\rm first}
=\int_{M_4}\left[
{1\over8\pi^2v^2}H\wedge*H
+{i\over2\pi}H\wedge(d\theta-3a)
\right].
\]

Integrating out \(H\) returns \(v^2x\wedge*x/2\). Integrating over the smooth
compact phase instead imposes \(dH=0\). With \(H=db\), where

\[
\exp\!\left(i\int_Wb\right)
\]

is the unit surface operator, integration by parts gives

\[
\boxed{
S_{\rm dual}
=\int_{M_4}\left[
{1\over8\pi^2v^2}db\wedge*db
+{i3\over2\pi}b\wedge da
\right]
}

plus the Maxwell term and higher corrections. At energies below the vector and
radial gaps, the kinetic terms are irrelevant to the topological sector and

\[
\boxed{
S_{\rm BF}={i3\over2\pi}\int b\wedge da.}
\]

The integer is fixed by the microscopic charge. It is not a fitted response
coefficient.

## 5. Vortex sheet, orbifold defect and their intersection

A charge-three Higgs vortex in four dimensions is codimension two. Its history is
an oriented two-dimensional worldsheet \(W_2\) satisfying

\[
dd\theta=2\pi n\,\delta_2(W_2).
\]

Dualization produces the source

\[
i n\int_{W_2}b.
\]

Varying \(b\), in the sign convention used here, gives

\[
3\,da+2\pi n\,\delta_2(W_2)=0,
\]

so a small linking disk sees

\[
\int da=-{2\pi n\over3}.
\]

A unit-charge worldline linked once with the vortex therefore acquires one of the
conjugate phases

\[
e^{\pm2\pi i/3}.
\]

This vortex sheet is not the \(2+1\)-dimensional defect used elsewhere in the
programme. That defect is the fixed plane \(\Sigma_3\) of the orbifold or folding
construction. Generically,

\[
\gamma_1=W_2\cap\Sigma_3
\]

is a worldline. If the vortex sheet carries the interval tangent, its source
reduces as

\[
\int_{W_2}b\longrightarrow\int_{\gamma_1}c.
\]

This supplies the magnetic/flux line on the defect while an electric particle
worldline couples to \(a\).

## 6. Orientation is not dynamically selected

The windings \(n=+1\) and \(n=-1\) have equal energy in the displayed CP-even
action. They carry opposite flux and conjugate mutual phases. Likewise, reversing
the interval or defect orientation changes the sign convention for the reduced BF
term without changing its level magnitude.

Therefore:

\[
\boxed{
\text{the action permits both orientations and selects neither.}}
\]

An oriented boundary condition, prepared vortex winding, CP/T-odd term or
cosmological/domain history must supply the sign. Calling the sign ``derived''
from the charge-three action would be circular.

## 7. Orbifold reduction with compact normalization

Take \(M_4=\Sigma_3\times S^1/\mathbb Z_2\), or the equivalent folded interval,
with reflection \(y\mapsto-y\). Assign

\[
a_\mu:+,
\quad a_y:-,
\quad b_{\mu\nu}:-,
\quad b_{\mu y}:+.
\]

The zero modes are

\[
a_\mu,
\qquad
c_\mu=\int_I b_{\mu y},dy.
\]

Defining \(c\) as the interval-integrated compact field is important: it preserves
the unit surface holonomy and prevents an interval-length factor from changing the
integer level. The odd zero modes \(a_y,b_{\mu\nu}\) are absent, and

\[
\boxed{
S_{\Sigma_3}={i3\over2\pi}\int_{\Sigma_3}c\wedge da.}
\]

The first odd Kaluza--Klein mode remains. For interval scale \(R=0.2\), the
certificate uses

\[
m_{\rm KK}=R^{-1}=5.
\]

The projection removes unwanted zero modes, not the entire tower.

## 8. Boundary variation

On a four-manifold with boundary,

\[
\begin{aligned}
\delta S_{\rm BF}
={i3\over2\pi}\Big[&
\int_{M_4}(\delta b\wedge da-db\wedge\delta a)\\
&+\int_{\partial M_4}\iota^*b\wedge\delta\iota^*a
\Big].
\end{aligned}
\]

The two-form gauge variation is

\[
\delta_\Lambda S_{\rm BF}
={i3\over2\pi}\int_{\partial M_4}\iota^*\Lambda\wedge da.
\]

Under the orbifold assignment, the tangential pullbacks of
\(b_{\mu\nu}\) and \(\Lambda_\mu\) are odd and vanish on each fixed plane. Both
BF boundary terms therefore vanish. This provides a consistent variational and
gauge boundary condition for the topological term without compulsory edge modes.

It does not finish the boundary variation of the Maxwell-plus-reader system.
Varying the Maxwell term contributes schematically

\[
{1\over e^2}\int_{\partial M_4}\delta a_i\,n_\mu f^{\mu i},
\]

while a localized reader contributes \(\int_{\Sigma_3}j_\chi^i\delta a_i\).
For a dynamical boundary connection the boundary equation is therefore

\[
\boxed{
{1\over e^2}n_\mu f^{\mu i}+j_\chi^i=0,}
\]

or the corresponding flux-jump equation in the doubled/folded picture. Dirichlet
data for \(a_i\) is the alternative. Even orbifold parity supplies the ordinary
Neumann condition only in the absence of a localized current; with the reader,
the sourced jump/Robin condition must be included.

Other polarizations are possible: fix the pullback of \(a\), set the pullback of
\(b\) to zero, or add a boundary Legendre term and fix the dual variable. Choosing
among them is physical boundary data; the bulk Higgs action does not choose it.

If the surviving three-dimensional worldvolume itself has a boundary, the same
question reappears and edge modes or a polarization must again be supplied.

## 9. Adding the minimal charged reader

Let a complex scalar \(\chi\) of residual charge one be localized on
\(\Sigma_3\):

\[
S_\chi
=\int_{\Sigma_3}\sqrt\gamma\left[
|D_a\chi|^2
+(m_0^2+\kappa|s|^2)|\chi|^2
+\lambda_\chi|\chi|^4
\right].
\]

In the Higgs vacuum,

\[
M_\chi^2=m_0^2+{\kappa v^2\over2}.
\]

The numerical witness uses

\[
m_0^2=0.81,
\quad\kappa=0.1,
\quad\lambda_\chi=0.2,
\]

giving

\[
M_\chi=1.00499.
\]

A complex scalar has no localized gauge anomaly. Because \(M_\chi^2>0\) and
\(\lambda_\chi>0\), the reader does not condense in this fixture. Its finite-cycle
spectrum is

\[
E_n(h)^2
=M_\chi^2
+4\sin^2\!\left({2\pi n+2\pi h/3\over2N}\right).
\]

For \(N=6\), the certificate finds:

- a charge-one \(h=0\) versus \(h=1\) spectral difference of \(0.21403\);
- \(h=1\) versus \(h=2\) equality to \(4.44\times10^{-16}\);
- a thermal \(\log Z\) difference of \(0.006867\);
- exact charge-three blindness;
- a minimum reader gap equal to \(M_\chi\).

Thus the reader can coexist consistently with the residual gauge phase and can
read its flat holonomy.

If \(\chi\) condenses, its stabilizer inside \(\mathbb Z_3\) has order one:

\[
e^{2\pi ik/3}\langle\chi\rangle=\langle\chi\rangle
\quad\Longrightarrow\quad k=0.
\]

A charge-one condensate therefore destroys the residual \(Z_3\) topological phase.
Positive mass is not merely convenient; it is a phase-selection gate.

## 10. What “all charged defect matter gapped” actually means

It does not mean no charged field exists. It means

\[
\boxed{
\Delta_{\rm ch}
=\inf\operatorname{spec}
\left(H_{\Sigma_3}\big|_{q=1,2\pmod3}\right)>0
}

uniformly over every admitted holonomy sector and boundary condition in the stated
size regime.

Operationally this requires:

1. a positive constrained quadratic spectrum after gauge fixing;
2. no charge-one or charge-two condensate;
3. no charged Goldstone or boundary zero mode;
4. no uncancelled localized anomaly forcing a gapless charged field;
5. positive vortex tension and a gap for magnetic excitations;
6. probe energies and temperatures below
   \(\Delta_{\rm ch},m_\sigma,m_A,m_{\rm KK}\).

For the numerical witness,

\[
E_{\rm probe}=0.1
<\min(M_\chi,m_\sigma,m_A,m_{\rm KK})
=1.00499.
\]

This verifies the hierarchy for the fixture, not for the physical candidate.

Neutral gapless matter does not by itself break the residual gauge group, but it
would prevent the defect from being an isolated pure topological tensor factor and
must be included in any stress-response calculation.

## 11. Exact BF versus readable BF

At energies far below \(M_\chi\), integrating out the reader yields the pure BF
action plus local irrelevant terms and globally nonlocal virtual winding terms.
The latter are suppressed schematically as

\[
e^{-M_\chi L}.
\]

They split the finite-volume topological sectors and generate the holonomy-sensitive
stress calculated in document 1228. Consequently:

- **strict IR/infinite size:** the nine-state torus BF description is exact as a
  topological limit;
- **finite size with a reader:** the nine states are only exponentially protected;
- **light or condensed reader:** topological isolation fails, and condensation
  destroys \(Z_3\).

The apparent tension is therefore real but controlled:

\[
\boxed{
\text{the reader must be heavy enough to preserve the BF phase,
but not so decoupled that A11 becomes unmeasurable.}}
\]

This tradeoff must be passed through the effect-window calculation of document
1225 once a physical mass and cycle length exist.

## 12. Conditional reduction theorem

Assume:

1. a compact \(U(1)\) with the stated unit-charge normalization;
2. a stable charge-three condensate;
3. energies below the radial and vector gaps;
4. the declared orbifold/folding parity and KK hierarchy;
5. the orbifold BF polarization and sourced Maxwell--reader boundary equation;
6. an uncondensed anomaly-free charge-one reader with a uniform positive gap.

Then the low-energy defect theory is

\[
\boxed{
S_{\rm eff}
={i3\over2\pi}\int_{\Sigma_3}c\wedge da
+S_\chi[a,\gamma]
+\text{irrelevant local terms},}
\]

and below \(M_\chi\) it reduces further to level-three BF plus exponentially
small winding corrections. The reader is compatible with, but not part of, the
pure topological core.

## 13. A2 verdict

The field-theory reduction itself is conditionally complete. Gate A2 nevertheless
does not pass, because three requested physical inputs are still absent:

1. the typed action does not dynamically generate the \(S^1/\mathbb Z_2\) defect
   or equivalent fold;
2. the CP-even action does not select one physical orientation;
3. the charge-one reader and its localization are not derived from \(S_{\rm v1}\).

Nor has the programme audited every Standard Model and boundary mode for a uniform
charged gap. The honest endpoint is therefore

\[
\boxed{
\text{complete conditional reduction}
\quad+\quad
\text{sharp origin/orientation/localization obstruction}.}
\]

Physical admission remains false.

## Evidence

- [Machine-readable reduction](../../../evidence/data/spin23-a2-charge-three-higgs-bf-reduction.json)
- [Normalization, spectrum and boundary verifier](../../../verification/verify/verify_spin23_a2_charge_three_higgs_bf_reduction.mjs)
- [Typed action](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md)
- [Orbifold zero-mode theorem](../1100-1199/1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
- [Typed electric/flux ports](../1100-1199/1179_the_orbifold_bf_fields_have_a_typed_electric_flux_port_map_and_the_furey_punctured_torus_supplies_their_two_canonical_qutrit_pairs.md)
- [Pure-BF memory obstruction](1200_the_pure_z3_bf_carrier_forgets_the_projector_so_reflexive_closure_requires_non_topological_boundary_memory.md)
- [Minimal reader operator](1227_pure_bf_is_locally_stress_and_flat_holonomy_blind_while_gapped_unit_charged_matter_is_the_minimal_a11_bridge.md)
- [Explicit reader response](1228_a_gapped_charge_one_scalar_reads_flat_z3_holonomy_through_stress_but_the_third_direction_requires_an_oriented_cycle_and_probe_embedding.md)
- [A11 effect-window budget](1225_the_a11_effect_window_requires_nuisance_projected_power_not_only_a_nonzero_transverse_response.md)
