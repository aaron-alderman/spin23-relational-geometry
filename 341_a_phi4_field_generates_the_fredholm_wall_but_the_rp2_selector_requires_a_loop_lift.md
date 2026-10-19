# A \(\phi^4\) Field Generates the Fredholm Wall, but the \(\mathbb{RP}^2\) Selector Requires a Loop Lift

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B08 and B11  
**Claim status:** exact scalar-wall solution, stress tensor and Dirac zero; identification with the selector requires a disconnected order parameter or a grading-preserving \(\mathbb{RP}^2\) bundle lift

## 1. The minimal dynamical sign wall

Take a real scalar order parameter

\[
\mathcal L_\phi
=\frac12\partial_\mu\phi\,\partial^\mu\phi
-\frac\lambda4(\phi^2-v^2)^2,
\qquad
\lambda>0.
\]

Its vacuum manifold is

\[
\mathcal V_\phi=\{-v,+v\},
\qquad
\pi_0(\mathcal V_\phi)=\mathbb Z_2.
\]

The static Euler–Lagrange equation is

\[
\phi''=\lambda\phi(\phi^2-v^2).
\]

With

\[
\kappa=v\sqrt{\frac\lambda2},
\]

the kink is

\[
\boxed{
\phi_{\rm k}(x)=v\tanh(\kappa x).}
\]

It has the required asymptotic signs:

\[
\phi_{\rm k}(-\infty)=-v,
\qquad
\phi_{\rm k}(+\infty)=+v.
\]

## 2. Stress–energy of the wall

For a static profile,

\[
T_{00}
=\frac12(\phi')^2+V(\phi),
\]

and the normal pressure is

\[
T_{xx}
=\frac12(\phi')^2-V(\phi).
\]

The kink satisfies the first integral

\[
\frac12(\phi')^2=V(\phi).
\]

Therefore

\[
\boxed{T_{xx}=0}
\]

pointwise, while its finite tension is

\[
\boxed{
\tau
=\int_{\mathbb R}T_{00}\,dx
=\frac{2\sqrt{2\lambda}}3v^3.}
\]

This is an explicit stress–energy source for a codimension-one defect rather than an imposed mass profile.

## 3. Coupling to the Dirac wall

Let

\[
m(x)=g\phi_{\rm k}(x),
\qquad
g>0.
\]

Then

\[
D_{\rm w}
=-i\sigma_x\partial_x+g\phi_{\rm k}(x)\sigma_z
\]

has the fixed grading \(C_{\rm w}=\sigma_y\). Its normalizable zero profile is

\[
\boxed{
\psi_0(x)
\propto
\cosh(\kappa x)^{-gv/\kappa}\chi,}
\]

where \(\chi\) has the appropriate \(\sigma_y\) chirality.

The asymptotic masses are \(\mp gv\), so the continuum Fredholm hypotheses of the preceding document are satisfied. This gives a complete dynamical representative of the mathematical sign wall.

## 4. Why this does not yet derive the selector wall

The selector direction is a director,

\[
n\sim-n,
\qquad
n\in\mathbb{RP}^2.
\]

But

\[
\pi_0(\mathbb{RP}^2)=0.
\]

The antipodal endpoint vectors \(n\) and \(-n\) represent the same physical selector point. Therefore a path described merely as “the selector changes sign” is not a wall between disconnected selector vacua.

The \(\phi^4\) kink is topologically protected because \(-v\) and \(+v\) are distinct vacua. The bare \(\mathbb{RP}^2\) selector does not have that property.

## 5. The selector alternative is a nontrivial loop

Compactify the spatial line by identifying its asymptotic selector endpoints. A configuration starting at \(n\) and ending at \(-n\) lifts to a closed path in \(\mathbb{RP}^2\).

Since

\[
\boxed{\pi_1(\mathbb{RP}^2)=\mathbb Z_2,}
\]

there is a nontrivial loop class. This is the correct selector topology.

It is not a conventional \(\pi_0\) domain wall. It is a one-dimensional texture whose protection depends on the director loop and its fermion-bundle lift.

## 6. The fixed-grading obstruction returns

A smooth lifted half-turn uses

\[
D_\theta
=-i\sigma_x\partial_x
+m\left(\cos\theta(x)\sigma_z+\sin\theta(x)\sigma_y\right),
\]

with \(\theta(-\infty)=0\) and \(\theta(+\infty)=\pi\).

For the fixed grading \(C_{\rm w}=\sigma_y\),

\[
\boxed{
\{C_{\rm w},D_\theta\}
=2m\sin\theta(x)\,I.}
\]

The endpoints preserve AIII, but every generic interior transverse rotation breaks it. The simple Fredholm product theorem therefore does not apply to the minimal two-component selector loop.

This is the same reason the quarter-turn interface binds a shifted subgap state rather than a protected zero.

## 7. Two honest physical routes

### Route A: a genuine disconnected scalar

Introduce or derive a real order parameter \(\phi\) not identified under \(\phi\sim-\phi\). Its \(\mathbb Z_2\) kink supplies the exact AIII wall.

The cost is that \(\phi\) is additional physical structure and must be identified inside the existing Furey/Jordan/stress sector.

### Route B: the nontrivial selector loop

Use the \(\mathbb Z_2\) loop of \(\mathbb{RP}^2\), together with:

- the nontrivial fermion deck lift;
- a larger Clifford carrier admitting a fixed grading for all selector directions;
- no independent mirror-matter doubling;
- a proof that the loop cannot unwind in the completed field space.

This route is closer to the selector narrative but needs the full bundle/Clifford completion.

## 8. Stress–energy interpretation

The scalar kink demonstrates the correct logical direction:

\[
\text{order-parameter action}
\longrightarrow
\text{finite stress tensor}
\longrightarrow
\text{asymptotic mass wall}
\longrightarrow
\text{Fredholm index}.
\]

Stress–energy does not by itself choose the order-parameter topology. The topology must already be present in the vacuum manifold or fermion bundle.

The programme must therefore distinguish:

- stress supporting an already selected defect;
- stress dynamically selecting the Jordan/selector real form;
- topology protecting the defect after selection.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** an existing Furey/Jordan scalar or composite has a derived two-component vacuum manifold, produces the kink stress tensor and couples with the required sign to the chiral operator.

**Loop trigger:** the completed CAR/Furey carrier realizes the nontrivial \(\mathbb{RP}^2\) loop with a fixed grading and no added matter.

**Topology falsifier:** \(n\) and \(-n\) in \(\mathbb{RP}^2\) are treated as disconnected vacua.

**AIII falsifier:** the smooth transverse selector rotation is claimed to preserve \(C_{\rm w}=\sigma_y\) in the minimal two-component representation.

**Stress falsifier:** an imposed sign-changing mass is called stress-derived without an order-parameter action and finite-energy solution.

**Stability falsifier:** the scalar kink is used after interactions explicitly break its \(\mathbb Z_2\) vacuum degeneracy.

## 10. Pinned dependency

The conditional continuum theorem now has a dynamical representative, but not yet a Standard-Model derivation.

The branch is pinned at a sharp fork:

1. identify a genuine disconnected scalar inside the existing programme; or
2. realize the nontrivial \(\mathbb{RP}^2\) loop in a grading-preserving completed Clifford/CAR carrier.

## 11. Certificate

The [\(\phi^4\) sign-wall and selector-loop certificate](scripts/verify_phi4_sign_wall_stress_and_selector_loop_gate.mjs) checks the kink equation, stress balance, exact tension, normalizable Dirac zero and fixed-grading failure along a transverse selector half-turn.

## Companion documents

- [Continuum AIII Fredholm theorem](340_the_textured_aiii_operator_is_fredholm_when_the_wall_mass_stays_gapped_at_infinity.md)
- [Quarter-turn subgap versus half-turn zero](316_the_quarter_turn_binds_a_subgap_state_while_the_rp2_half_turn_can_bind_a_zero.md)
- [Selector great-circle bundle lift](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
- [Stress–energy to Jordan carrier reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
