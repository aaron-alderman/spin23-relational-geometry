# The Quarter-Turn Binds a Subgap State While the \(\mathbb{RP}^2\) Half-Turn Can Bind a Zero

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B07, B08 and B11  
**Claim status:** exact sharp-interface Dirac spectrum in the minimal selector-angle model; identification of its mass angle and bundle holonomy with Furey/Standard-Model data remains open

## 1. Does the wall-to-Furey quarter-turn bind the neutrino zero?

The previous branch identified the wall-to-Furey carrier map with a \(\pi/2\) motion of the selector. That makes a natural question unavoidable:

> If a one-dimensional Dirac mass follows this selector angle, does the quarter-turn itself bind an exact zero mode?

In the minimal model, it does not. It binds a massive subgap state. An exact zero requires a lifted half-turn.

## 2. Sharp selector-angle interface

Take

\[
H=-i\sigma_x\partial_x
+m\bigl(\cos\theta(x)\,\sigma_z+\sin\theta(x)\,\sigma_y\bigr),
\qquad m>0,
\]

with a sharp interface

\[
\theta(x)=
\begin{cases}
0,&x<0,\\
\Delta\theta,&x>0.
\end{cases}
\]

The kinetic matrix \(\sigma_x\) anticommutes with both mass matrices. For a bound state inside the bulk gap, use

\[
\psi_L(x)=e^{\kappa x}v,\qquad
\psi_R(x)=e^{-\kappa x}v,
\qquad \kappa>0.
\]

Continuity at the interface requires the same two-spinor \(v\) on both sides.

## 3. Exact spectrum

The two half-space equations are

\[
\left(m\sigma_z-i\kappa\sigma_x-E\right)v=0,
\]

\[
\left[
m(\cos\Delta\theta\,\sigma_z+\sin\Delta\theta\,\sigma_y)
+i\kappa\sigma_x-E
\right]v=0.
\]

A common null line exists for

\[
\boxed{
\kappa=m\sin\frac{\Delta\theta}{2},
\qquad
E=-m\cos\frac{\Delta\theta}{2}}
\]

for \(0<\Delta\theta<2\pi\) in the displayed orientation convention. Reversing the interface or charge-conjugating the solution reverses the energy sign, so the invariant statement is \(|E|=m|\cos(\Delta\theta/2)|\). The identity

\[
E^2+\kappa^2=m^2
\]

places the state inside the bulk gap.

## 4. The quarter-turn is not a zero

For the wall-to-Furey angle

\[
\Delta\theta=\frac{\pi}{2},
\]

the bound state has

\[
\boxed{
|E|=\frac{m}{\sqrt2},
\qquad
\kappa=\frac{m}{\sqrt2}.}
\]

Thus the carrier quarter-turn creates a localized subgap state in this model, but it does **not** explain the exact 15-state neutrino zero. The zero-mode grading and the selector interpolation remain distinct mechanisms unless an additional symmetry pins the level to zero.

This is an important negative result: exact unitary alignment of the endpoint response cones is not enough to guarantee a topological zero in the interpolating dynamics.

## 5. The half-turn gives the exact zero

At

\[
\Delta\theta=\pi,
\]

one obtains

\[
\boxed{E=0,\qquad\kappa=m.}
\]

This is the Jackiw–Rebbi sign-change condition written as a rotation in the two-dimensional mass plane.

The selector, however, is a director:

\[
n\sim-n,\qquad [n]\in\mathbb{RP}^2.
\]

A lifted half-turn starts at \(n\) and ends at \(-n\), but these are the same physical director. It therefore closes downstairs in \(\mathbb{RP}^2\) while remaining an open antipodal path upstairs on \(S^2\). This is the nontrivial \(\mathbb Z_2\) loop class.

The exact zero is consequently associated not with the quarter-turn between the two carrier embeddings, but with the “one-twist” loop of the selector director.

## 6. The bundle obstruction

There is a serious consistency condition. The Dirac mass used above is linear in \(n\):

\[
M(n)=m\,n\cdot(\sigma_y,\sigma_z).
\]

It changes sign under \(n\mapsto-n\), even though the selector algebra does not. Therefore it is not an ordinary single-valued function on \(\mathbb{RP}^2\).

For the half-turn zero to be physical, the fermion must live in a twisted bundle whose transition function compensates the sign:

\[
M(-n)=g\,M(n)\,g^{-1}
\]

with the same \(g\) acting consistently on the kinetic term, CAR structure and gauge charges. Equivalently, the nontrivial selector loop must carry a fermionic holonomy.

Without that bundle lift, the \(\mathbb Z_2\) topology of the director does not by itself define the sign-changing fermion mass.

## 7. Relation to the two zero-mode mechanisms

The programme now has two sharply separated sources of zero modes:

1. **Internal rank imbalance.** The \(8+7\) Yukawa grading forces a neutrino kernel before any spatial defect is introduced.
2. **Selector-loop topology.** A lifted nontrivial \(\mathbb{RP}^2\) loop can bind a spatial Dirac zero if the fermion bundle carries the required holonomy.

They can reinforce one another, but neither currently derives the other. A genuine synthesis would show that the unmatched internal neutrino is precisely the component on which the selector-loop transition function acts nontrivially.

That is a much more discriminating target than merely observing that both branches contain a zero.

## 8. Open paths

The calculation branches immediately:

- derive the allowed fermion transition functions over the selector \(\mathbb{RP}^2\);
- test whether Furey survivor exchange supplies the antipodal transition \(g\);
- tensor the interface operator with the \(8+7\) Yukawa complex and compute the joint kernel;
- smooth the wall and test which part of the spectrum is topologically stable;
- gauge the selector and replace the sharp rotation by a Wilson-line holonomy;
- determine whether anomaly inflow or mod-two index data accompany the nontrivial loop.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/CAR action supplies the exact transition function over the nontrivial \(\mathbb{RP}^2\) loop, and its mod-two index selects the unmatched neutrino state.

**One-twist trigger:** a smooth finite-action selector loop with the required fermion holonomy has one protected zero per Standard-Model generation.

**Quarter-turn falsifier:** the \(\pi/2\) wall is claimed to force a zero without an additional spectral symmetry. The minimal interface gives \(E=m/\sqrt2\).

**Director falsifier:** a mass linear in \(n\) is declared single-valued on \(\mathbb{RP}^2\) without a compensating fermion transition function.

**Coincidence falsifier:** the internal rank-defect zero and spatial topological zero are identified solely because both are massless, without constructing the joint operator and its kernel.

## 10. Certificate

The [selector-angle Dirac-interface certificate](../../../verification/verify/verify_selector_angle_dirac_interface_spectrum.mjs) verifies the common interface spinor, the quarter-turn subgap energy, the half-turn zero and equality of the antipodal director projectors.

## Companion documents

- [The carrier quarter-turn is a broken selector direction](315_the_carrier_quarter_turn_is_a_broken_selector_direction_not_the_surviving_u1.md)
- [Dynamical selector and \(\mathbb{RP}^2\) orientation modes](../0200-0299/297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
- [The 15-state Yukawa grading forces one neutrino zero](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [The Yukawa zero extends to a massless Clifford cone](313_the_yukawa_zero_mode_extends_to_a_massless_dirac_type_cone.md)
- [Finite domain-wall Schur–Herglotz carrier](../0200-0299/229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
