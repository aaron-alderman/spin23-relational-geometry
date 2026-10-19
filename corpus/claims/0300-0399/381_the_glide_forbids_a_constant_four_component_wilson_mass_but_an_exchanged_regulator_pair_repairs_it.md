# The Glide Forbids a Constant Four-Component Wilson Mass but an Exchanged Regulator Pair Repairs It

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact minimal-matrix regulator obstruction and eight-component algebraic repair; regulated spectrum and relative invariant remain open

## 1. Why a regulator is a symmetry question

The glide-covariant centered-difference model is exact but has lattice
doublers. A standard Wilson term adds

\[
H_W(\mathbf k)
=r\,[2-\cos k_x-\cos k_y]M_W,
\]

where (M_W) is a Hermitian mass matrix anticommuting with both kinetic
generators. The scalar Wilson function is glide even, so a constant
symmetry-compatible (M_W) must itself be deck even.

The four-component Pin model admits no such matrix.

## 2. Complete four-component mass space

With

\[
\alpha_x=\sigma_x\otimes I,qquad
\alpha_y=\sigma_y\otimes I,
\]

any (4\times4) matrix anticommuting with both kinetic generators has first
Pauli factor (sigma_z). The Hermitian mass space is

\[
M_W\in
\operatorname{span}_{\mathbb R}
\{\sigma_z\otimes I,
  \sigma_z\otimes\sigma_x,
  \sigma_z\otimes\sigma_y,
  \sigma_z\otimes\sigma_z\}.
\]

The glide spin lift is (S=\alpha_x=sigma_x\otimes I), and therefore

\[
SM_WS^{-1}=-M_W
\]

for **every** matrix in this mass space.

Hence

\[
\boxed{
\text{no nonzero constant four-component Wilson mass is glide even}.}
\]

The obstruction is representation theoretic, not a poor choice of Pauli
basis.

## 3. Particle--hole restriction

For

\[
C=\alpha_xK,
\]

a momentum-even Wilson mass must obey

\[
CM_WC^{-1}=-M_W.
\]

Among the Pauli basis masses, the real second factors

\[
\sigma_z\otimes I,quad
\sigma_z\otimes\sigma_x,quad
\sigma_z\otimes\sigma_z
\]

pass class-D reality, while (sigma_z\otimes\sigma_y) does not. But all three
class-D candidates remain glide odd. Particle--hole symmetry does not repair
the obstruction.

## 4. Texture-dependent Wilson terms are not a free escape

A glide-odd scalar coefficient can compensate a glide-odd mass matrix. For
example, a term schematically of the form

\[
r\,m_a(x,y)\Delta\,\beta_a
\]

is deck even when (m_a(gp)=-m_a(p)). But the coefficient is a section of the
same twisted mass bundle and must participate in the defect texture. It is not
a uniform UV Wilson mass, and it may fail to remove doublers at the core.

Such regulators remain an open numerical option, but their topology and
low-energy species count must be checked rather than assumed.

## 5. Minimal exchanged regulator pair

Introduce one auxiliary regulator Pauli factor (\(\tau\)) on the oriented double:

\[
\widetilde\alpha_i=\alpha_i\otimes I,qquad
\widetilde\beta_a=\beta_a\otimes I.
\]

Choose the extended deck lift

\[
\widetilde S=\alpha_x\otimes\tau_x
\]

and Wilson mass

\[
\boxed{
M_W^{(8)}=(\sigma_z\otimes I)\otimes\tau_z.}
\]

Then

\[
\{M_W^{(8)},\widetilde\alpha_x\}
=\{M_W^{(8)},\widetilde\alpha_y\}=0,
\]

while the two sign reversals cancel:

\[
\widetilde S M_W^{(8)}\widetilde S^{-1}=M_W^{(8)}.
\]

The physical masses remain deck odd,

\[
\widetilde S\widetilde\beta_a\widetilde S^{-1}
=-\widetilde\beta_a,
\]

and the extended particle--hole operation

\[
\widetilde C=(\alpha_x\otimes I)K
\]

sends (M_W^{(8)}\mapsto-M_W^{(8)}), as class D requires.

## 6. Why this need not be extra physical matter

The \(\tau_z=\pm1\) regulator partners are exchanged by \(\tau_x\) in the deck
lift. On the oriented double there are eight fiber components, but a fixed
deck sector imposes a relation between the partners. The quotient may therefore
return to four independent components.

This is a geometric/regulator doubling, not automatically a new generation or
mirror fermion. That interpretation must nevertheless be verified after the
full lattice projector and low-energy spectrum are constructed.

The distinction is now precise:

- arbitrary independent Nambu/flavor doubling is disallowed;
- a minimal pair forced by simultaneous Wilson and glide covariance is
  admissible as a regulator candidate;
- only the quotient degree count decides whether it adds physical states.

## 7. Relation to earlier eight-component lifts

Earlier selector calculations found that an eight-component module could
preserve structures unavailable in four components. The present calculation
gives that doubling a concrete UV role: it can carry opposite Wilson masses
that the deck exchanges.

This does not retroactively prove the earlier eight-component physical model.
It identifies one specific problem—glide-compatible regularization—for which
the extra factor is algebraically necessary and potentially nonphysical after
quotienting.

## 8. Remaining spectral questions

The algebraic repair must now pass four tests:

1. the Wilson term gaps every naive doubler in each quotient deck sector;
2. the low-momentum quotient contains one intended four-component carrier, not
   two physical copies;
3. reference and defect sectors admit one common Majorana orientation;
4. the relative Pfaffian and localization evidence is stable over the Wilson
   parameter range without accidental gap closures.

Until these are checked, the eight-component term is a candidate regulator,
not a topological result.

## 9. Furey interface

If the \(\tau\) factor disappears as an independent degree of freedom after the
deck quotient, Furey's neutral carrier need only realize the four physical
Clifford components and CAR reality. It need not contain an additional mirror
generation.

If instead both \(\tau\) sectors survive independently at low energy, the
construction collides with the established mirror/doubling constraints and
the Pin regulator branch should be demoted.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the eight-component double regulator gaps all
doublers while one deck sector has exactly one four-component low-energy
carrier and a robust nontrivial relative Pfaffian.

**Four-component falsifier:** a constant glide-even Wilson mass is proposed in
the minimal module despite the complete mass-space calculation.

**Regulator falsifier:** the auxiliary pair remains as two independent physical
low-energy species after quotienting.

**Symmetry falsifier:** the Wilson term breaks either glide covariance or exact
class-D particle--hole reality.

**Topology falsifier:** the relative parity changes under Wilson-parameter
variation without a tracked gap closing.

## 11. Certificate

The [glide-compatible Wilson regulator certificate](../../../verification/verify/verify_glide_wilson_mass_obstruction_and_8component_repair.mjs)
enumerates the full four-component Pauli mass basis, proves every candidate is
glide odd, applies the class-D reality filter and verifies the eight-component
exchanged-pair repair.

## Companion documents

- [Glide-covariant Pin double cylinder](380_an_exact_glide_covariant_double_cylinder_realizes_the_pin_domain_architecture.md)
- [Finite Majorana nullity gate](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
- [Second kinetic direction and orientation fork](376_a_second_kinetic_direction_forces_a_choice_between_chiral_descent_and_orientation_reversal.md)
- [Full selector local/global lift obstruction](345_the_full_selector_has_a_four_component_local_clifford_lift_but_needs_eight_for_a_global_aiii_grading.md)
