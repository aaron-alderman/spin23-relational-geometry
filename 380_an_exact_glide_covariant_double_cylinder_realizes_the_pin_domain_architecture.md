# An Exact Glide-Covariant Double Cylinder Realizes the Pin Domain Architecture

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite-lattice Hermiticity, glide covariance, grading exchange and class-D reality; relative topology and localization remain open

## 1. Objective

The previous audits determined what the first honest primitive model must do:

- include two spatial kinetic directions;
- realize the grading-reversing repair as a spatial reflection;
- keep the conventional index-three vortex separate;
- preserve exact class-D particle--hole reality;
- avoid using odd total finite nullity as the invariant.

This document constructs the minimal finite geometry satisfying those
requirements.

## 2. Oriented double cylinder

Use lattice coordinates

\[
x\in\mathbb Z_{2L},
\qquad y\in\{-M,-M+1,\ldots,M\}.
\]

The (x) direction is periodic and the (y) direction has open boundaries.
Define the free glide involution

\[
g(x,y)=(x+L,-y).
\]

Because the half-period translation has no fixed sites,

\[
g^2=1
\]

on the oriented double lattice. Its quotient is the finite analogue of a
Möbius/Pin strip: crossing the (x)-seam reverses the transverse coordinate.

## 3. Clifford data and lattice Hamiltonian

Take

\[
\alpha_x=\sigma_x\otimes I,qquad
\alpha_y=\sigma_y\otimes I,
\]

\[
\beta_1=\sigma_z\otimes\sigma_x,qquad
\beta_2=\sigma_z\otimes\sigma_z,qquad
\Gamma=\sigma_z\otimes\sigma_y.
\]

Let (D_x,D_y) be centered antisymmetric differences, with periodic hopping
in (x) and truncated open hopping in (y). Define

\[
H=-i\alpha_xD_x-i\alpha_yD_y
+m_1(x,y)\beta_1+m_2(x,y)\beta_2,
\]

with

\[
m_1(x,y)=\sin\frac{\pi x}{L},
\qquad
m_2(x,y)=\mu y.
\]

Both masses are glide odd:

\[
m_a(g(x,y))=-m_a(x,y).
\]

The double contains zeros at ((0,0)) and ((L,0)). They are exchanged by the
glide and have opposite oriented vortex signs. The quotient therefore has one
primitive defect location without pretending that the oriented double has
complex index three; its total oriented complex index is zero.

## 4. Spin lift and exact covariance

Let (P_g) act on sites by the glide and choose

\[
U_g=P_g\otimes S,
\qquad S=\alpha_x.
\]

Then

\[
U_g^2=1.
\]

The half translation preserves (D_x), the reflection reverses (D_y), and

\[
S\alpha_xS^{-1}=\alpha_x,qquad
S\alpha_yS^{-1}=-\alpha_y,qquad
S\beta_aS^{-1}=-\beta_a.
\]

Consequently

\[
\boxed{U_gHU_g^{-1}=H.}
\]

This is the global version of the transverse reflection that the
one-momentum model omitted.

## 5. Deck sectors and grading exchange

The projectors

\[
P_\pm=\frac12(1\pm U_g)
\]

define equal-dimensional deck sectors. Since ([H,U_g]=0), each sector is
invariant under (H).

But

\[
U_g\Gamma U_g^{-1}=-\Gamma.
\]

Thus (Gamma) maps the (+) deck sector to the (-) sector rather than
grading either quotient sector internally. This is the finite-lattice form of
the kernel-pairing and zero complex-index theorem.

## 6. Class-D reality descends

Define the antiunitary

\[
C=(I_{\rm sites}\otimes\alpha_x)K.
\]

The real-space Hamiltonian obeys

\[
C^2=+1,
\qquad CHC^{-1}=-H.
\]

Moreover,

\[
[C,U_g]=0.
\]

Therefore particle--hole symmetry preserves each deck sector even though the
chiral grading exchanges them. Each quotient sector is a legitimate finite
class-D system.

Under the convention that a reflected unit vector lifts to a square-(+1)
operator, (U_g^2=+1) is the Pin\(^+) candidate. This label remains
convention dependent until the Lorentzian/spatial Clifford convention and the
physical spin structure are fixed.

## 7. What this construction proves

The model supplies all five fields required by the correction ledger:

1. **operator:** the explicit centered-difference Dirac/BdG matrix (H);
2. **domain:** periodic (x), open (y), with free glide quotient;
3. **symmetry:** unitary (U_g^2=1), grading exchange and (C^2=1);
4. **invariant currently established:** zero ordinary complex cover index by
   grading pairing;
5. **bridge theorem:** exact matrix covariance, not an inferred group-label
   match.

It does not yet establish a nontrivial real relative invariant.

## 8. Required next layer

The centered-difference model has lattice doublers and open-boundary partners.
Before a physical topological conclusion, add a symmetry-compatible regulator
and perform three comparisons:

1. a reference texture with no primitive defect;
2. the glide-odd defect texture above;
3. multiple sizes and boundary masses.

In a single common Majorana orientation, compute relative Pfaffians and the
mod-two spectral flow between reference and defect. Then localize the lowest
pair and test exponential separation of defect and boundary weights.

The regulator is not optional: changing it can change the lattice topological
phase while leaving the low-momentum Clifford algebra unchanged.

## 9. Furey interface

The lattice spinor factor is four-dimensional and the site glide is external.
A Furey embedding must supply a neutral physical submodule on which
(alpha_x,alpha_y,\beta_1,\beta_2) and (C) act without adding mirror matter.
It need not supply the spatial permutation (P_g); that belongs to the defect
domain.

The concrete intertwiner question is now

\[
W C_{\rm Furey}W^{-1}=\alpha_xK,
\]

together with a representation of the four Clifford generators on the same
neutral module. Failure would close the Furey realization of this Pin branch
without invalidating the lattice construction itself.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** after a symmetry-compatible regulator is added,
the defect/reference relative Pfaffian is robustly negative and the lowest
pair separates into defect and boundary states with exponentially vanishing
splitting.

**Covariance falsifier:** any proposed regulator fails ([H,U_g]=0) or class-D
particle--hole symmetry.

**Index falsifier:** the double's two opposite oriented defects are assigned
total complex index three.

**Sector falsifier:** (Gamma) is used as an internal grading of one deck
sector even though it exchanges the sectors.

**Lattice falsifier:** a result dependent on naive doublers is presented as a
continuum invariant.

## 11. Certificate

The [glide-covariant double-cylinder certificate](scripts/verify_glide_covariant_pin_double_cylinder.mjs)
constructs the full finite matrix and checks Hermiticity, (U_g^2=1), exact
deck covariance, grading exchange, class-D particle--hole symmetry and equal
deck-sector dimensions.

## Companion documents

- [Finite Majorana nullity gate](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
- [Selector parity correction ledger](378_correction_ledger_for_selector_index_parity_and_primitive_deck_claims.md)
- [Grading-reversing deck index no-go](377_a_grading_reversing_deck_symmetry_forces_zero_cover_index_so_the_index_three_parent_cannot_be_the_same_operator.md)
- [Second kinetic direction and orientation fork](376_a_second_kinetic_direction_forces_a_choice_between_chiral_descent_and_orientation_reversal.md)
