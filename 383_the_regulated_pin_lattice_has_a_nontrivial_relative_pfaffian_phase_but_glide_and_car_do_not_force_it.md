# The Regulated Pin Lattice Has a Nontrivial Relative Pfaffian Phase, but Glide and CAR Do Not Force It

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite-matrix Majorana/deck projection and relative-Pfaffian computation; continuum stability, localization and Furey parameter selection remain open

## 1. First direct answer from the regulated defect operator

The glide-covariant Wilson lattice can support a nontrivial defect/reference
relative Pfaffian. It does not do so automatically.

For the most symmetric exchanged-pair regulator, the relative sign is trivial.
The reason is an accidental chiral symmetry. Glide and class-D reality permit
perturbations that break that extra symmetry; in finite-size scans, open
parameter intervals then have

\[
\boxed{\mathcal Q_{\rm rel}=-1.}
\]

This is the first positive operator-level evidence for an independent Pin
relative phase. It is also a nonuniqueness result: the phase is not forced by
glide plus CAR alone.

## 2. Common Majorana basis

The particle--hole operation on the eight-component fiber is

\[
C=U_CK,
\qquad U_C=\alpha_x\otimes I_\tau.
\]

Since (U_C) is symmetric and unitary, choose a Takagi factor

\[
U_C=W_FW_F^T.
\]

For the first Pauli factor one convenient choice is

\[
W_2=\frac1{\sqrt2}
\begin{pmatrix}1&i\\1&-i\end{pmatrix},
\qquad W_2W_2^T=\sigma_x,
\]

extended trivially over the other fiber and lattice factors.

In the transformed basis,

\[
C'=K,
\qquad H_M=W_F^\dagger HW_F=iA,
\]

where (A) is real antisymmetric. The transformed glide is real and symmetric,
so a real Gram--Schmidt basis can be chosen for each eigenspace

\[
U_g=\pm1.
\]

The same (W_F), glide basis and orientation are used for reference and defect
textures. This removes the otherwise fatal Pfaffian-orientation ambiguity.

## 3. Reference and defect sectors

The nonvanishing reference texture is

\[
m_1^{\rm ref}=m_0\cos\frac{\pi x}{L},
\qquad
m_2^{\rm ref}=m_0\sin\frac{\pi x}{L}.
\]

It is glide odd and has no core. The defect texture is

\[
m_1^{\rm def}=m_0\sin\frac{\pi x}{L},
\qquad
m_2^{\rm def}=\mu y,
\]

with a glide-related vortex--antivortex pair on the oriented double and one
primitive defect location on the quotient.

For either deck sector, define

\[
\mathcal Q_{\rm rel}
=\operatorname{sgn}
\left[
\operatorname{Pf}A_{\rm ref}^{(\pm)}
\operatorname{Pf}A_{\rm def}^{(\pm)}
\right].
\]

Both endpoint Pfaffians are explicitly nonzero in every reported benchmark.

## 4. The symmetric regulator is trivial

With only the kinetic, two physical masses and exchanged Wilson mass, the
Hamiltonian anticommutes with

\[
Q=(\sigma_z\otimes\sigma_y)\otimes\tau_y.
\]

The two sign changes imply

\[
[Q,U_g]=0,
\]

so (Q) acts inside each deck sector. This accidental chiral symmetry is not
part of the intended class-D data.

For the benchmark

\[
r=m_0=0.8,qquad \mu=0.7,qquad L=2,qquad M=1,
\]

the unperturbed calculation gives

\[
\mathcal Q_{\rm rel}=+1.
\]

The result remains (+1) in the initial size and Wilson scan. The minimal
symmetry-rich regulator is therefore not itself evidence for a nontrivial Pin
defect.

## 5. Allowed class-D perturbations

A complete (8\times8) Pauli enumeration asks for constant Hermitian matrices
that:

- are glide even;
- are odd under (C), as a BdG Hamiltonian term must be;
- fail to anticommute with (Q).

There are eight Pauli-basis solutions. The simplest is

\[
V_\delta
=\delta\,I\otimes\sigma_y\otimes I_\tau.
\]

It preserves exact glide covariance and class-D reality but commutes with
(Q), thereby breaking the accidental chiral anticommutation.

This term is the oriented internal repair matrix encountered in the earlier
two-dimensional fork, now appearing as a legitimate class-D perturbation
rather than the primitive deck lift itself.

## 6. Nontrivial finite relative phase

For

\[
r=m_0=0.8,qquad \mu=0.7,
\]

the scans find

\[
\mathcal Q_{\rm rel}=-1
\]

at both (delta=0.25) and (delta=1.25), in both deck sectors, for

\[
(L,M)=(2,1),(3,1),(2,2).
\]

That is twelve independent sector/size/parameter checks. The projected
Majorana matrices are exactly antisymmetric to numerical precision, and every
endpoint Pfaffian is nonzero.

Because the sign at (delta=0) is (+1), at least one Pfaffian zero crossing
must occur before the first nontrivial interval. Further sign changes across
the scan show multiple finite-size class-D phases rather than one universal
glide-determined answer.

## 7. What is proved and what is not

### Proved for the finite lattice

- a common Majorana orientation exists for reference and defect;
- both glide sectors admit real antisymmetric projected Hamiltonians;
- an allowed perturbation removes the accidental chiral restriction;
- nontrivial relative Pfaffian phases occur in both deck sectors;
- the sign persists across the tested longitudinal and transverse sizes.

### Not yet proved

- convergence of the phase boundaries as (L,M\to\infty);
- exponential defect/boundary separation of the lowest pair;
- regulator independence within a continuum universality class;
- selection of (delta) or its sign by Furey's neutral carrier;
- a Standard-Model observable tied to the relative phase.

Thus the existence question has a positive finite answer, while the selection
and physical-identification questions remain open.

## 8. Consequence for the programme

The Pin branch is no longer blocked at “perhaps no nontrivial invariant
exists.” It has an explicit nontrivial finite representative. The blocker has
moved to **selection and continuum stability**.

This is a healthier position than the discarded index-three shortcut:

- the invariant is computed on the actual quotient architecture;
- it is not borrowed from another operator;
- its parameter dependence is visible rather than suppressed;
- Furey data now have a concrete job—select or forbid the chiral-breaking
  class-D term and its phase region.

## 9. Furey interface sharpened

On the physical four-component quotient carrier, the term corresponding to

\[
I\otimes\sigma_y
\]

must be identified. Possibilities include:

- a canonical second real structure;
- an oriented weak/neutral endomorphism;
- a boundary self-adjoint-extension parameter;
- or an unphysical arbitrary spurion.

If Furey's algebra forbids every one of the eight allowed chiral breakers, the
benchmark Pin phase remains trivial. If it selects one with a coefficient in a
nontrivial interval, the external/internal bridge becomes far more specific.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the nontrivial relative sign persists under
large-size scaling, its near-zero pair separates into defect and boundary
weights exponentially, and the Furey neutral module fixes an allowed
chiral-breaking operator without a free spurion.

**Orientation falsifier:** reference and defect Pfaffians are evaluated in
independently oriented Majorana or glide bases.

**Universality falsifier:** the negative sign disappears with increasing size
or under every symmetry-preserving regulator deformation without a gap
closing.

**Selection falsifier:** (delta) is fitted solely to enter a desired phase
with no algebraic or dynamical source.

**Localization falsifier:** the relevant low states remain delocalized bulk
artifacts or lattice doublers.

## 11. Pinned dependency and next calculation

Pin the topological *existence* question positively at finite size. Continue
with:

1. Pfaffian phase-boundary scans versus (L,M,r,m_0,\mu,\delta);
2. lowest-eigenpair localization and splitting;
3. an audit of the eight chiral breakers against the Furey neutral
   endomorphism sector;
4. a continuum/domain interpretation of the surviving perturbation.

## 12. Certificate

The [regulated glide relative-Pfaffian certificate](scripts/verify_regulated_glide_relative_pfaffian.mjs)
constructs both textures, Takagi-transforms particle--hole symmetry, builds real
deck-sector bases, enumerates the eight allowed chiral breakers and verifies
the negative relative sign in both sectors across the reported finite sizes.

The companion [exploration script](scripts/explore_regulated_glide_relative_pfaffian.mjs)
prints parameter-resolved Pfaffian signs and logarithmic magnitudes.

## Companion documents

- [Regulated bulk quotient species count](382_the_exchanged_wilson_pair_gaps_all_doublers_while_one_deck_sector_retains_one_four_component_cone.md)
- [Wilson regulator obstruction and repair](381_the_glide_forbids_a_constant_four_component_wilson_mass_but_an_exchanged_regulator_pair_repairs_it.md)
- [Glide-covariant Pin double cylinder](380_an_exact_glide_covariant_double_cylinder_realizes_the_pin_domain_architecture.md)
- [Finite Majorana nullity gate](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
