# Compact Phase/Flux Variables Supply a Canonical \(Sp(4,\mathbb Z)\) Lattice, but Require Periodic Completion

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact arithmetic phase-space theorem; physical Furey/Standard-Model identification remains open

## 1. Result

The normalization obstruction for a noncompact scalar has a precise conditional repair.

Let the two-face phase space be the principally polarized symplectic torus

\[
\mathcal A=\mathbb R^4/\Lambda,
\qquad
\Lambda=\mathbb Z_q^2\oplus\mathbb Z_p^2,
\]

with integral pairing

\[
\Omega((q,p),(q',p'))=q^Tp'-p^Tq'.
\]

Then \(\Lambda\), its primitive normalization and its automorphism group are intrinsic:

\[
\operatorname{Aut}(\Lambda,\Omega)=Sp(4,\mathbb Z).
\]

For a symmetric matrix \(K\), the response shear

\[
S_K:(q,p)\longmapsto(q,p+Kq)
\]

descends to \(\mathcal A\) exactly when \(K\) preserves the lattice. In the chosen primitive basis this means \(K\in\operatorname{Sym}_2(\mathbb Z)\). Thus

\[
K=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\]

does define a canonical integral torus automorphism once the compact phase/flux lattice is physically derived.

This closes the *mathematical* normalization gap. It does not yet derive the compact variables from Furey matter, Standard-Model charges or stress response.

## 2. Why compactness removes the continuous rescaling

For noncompact variables, \(q\mapsto Dq\), \(p\mapsto D^{-T}p\) is an allowed canonical change for every positive real diagonal \(D\). On the torus it is an automorphism only if it preserves the integral lattice. A generic real rescaling does not.

The primitive periods therefore reduce continuous normalization freedom to arithmetic basis changes. This is the missing datum behind the earlier conditional \(Sp(4,\mathbb Z)\) result.

The condition is sharp. If \(K=X/2\), shifting the representative \(q\mapsto q+(1,0)^T\) changes the momentum by

\[
\frac12X\begin{pmatrix}1\\0\end{pmatrix}
=
\begin{pmatrix}1\\-1/2\end{pmatrix},
\]

which is not a lattice vector. The purported map is not well-defined on \(\mathbb R^4/\mathbb Z^4\).

## 3. An important distinction: compact configuration is not yet a compact phase-space torus

If only the configurations are angles,

\[
q\in\mathbb T^2,
\qquad
(q,p)\in T^*\mathbb T^2=\mathbb T^2\times\mathbb R^2,
\]

then quantum momenta are labelled by the dual lattice \(\mathbb Z^2\), but the classical momenta remain noncompact. That construction supplies charge quantization, not automatically the phase-space torus \(\mathbb R^4/\mathbb Z^4\).

The full arithmetic carrier therefore needs one of the following:

- both conjugate holonomy variables compact, as in a polarized Abelian phase-space torus;
- a finite level or finite Heisenberg quotient;
- a homology lattice with integral intersection pairing;
- a topological action whose charge and flux periods are both fixed.

This distinction prevents “the field is periodic” from being used as an unsupported derivation of \(Sp(4,\mathbb Z)\).

## 4. Finite reductions and the code carrier

For every positive integer \(N\), reduction gives

\[
\Lambda_N=\Lambda/N\Lambda\cong(\mathbb Z/N\mathbb Z)^4
\]

with its finite symplectic pairing. Every integral symplectic matrix acts compatibly on all \(\Lambda_N\). In particular, the same \(S_X\) that acts on the compact real torus reduces to the qutrit logical shear already isolated in the two-puncture code.

This yields an exact arithmetic tower

\[
Sp(4,\mathbb Z)
\longrightarrow
Sp(4,\mathbb Z/N\mathbb Z).
\]

What remains unproved is the physical identification of the code's two logical coordinates with the two compact boundary ports. Compatible dimensions and group actions do not by themselves identify observables.

## 5. Boundary Fourier transform as polarization exchange

The integral matrix

\[
F=\begin{pmatrix}0&-I\\I&0\end{pmatrix}
\]

exchanges value and flux polarizations and belongs to \(Sp(4,\mathbb Z)\). At finite level its metaplectic lift is the discrete Fourier transform. In a Gaussian path integral, the analogous kernel converts a wavefunction in the value polarization to one in the momentum/flux polarization.

Therefore boundary Legendre duality is more than a coordinate relabelling: it is an exact intertwiner between polarized state spaces. But it is not automatically a dynamical symmetry. To call it a physical defect, the action or gluing law must actually insert the Fourier kernel at an interface. Without that source, it remains an admissible change of representation.

## 6. Quadratic phase at odd and even level

For odd \(N\), two is invertible and an integral symmetric \(K\) defines the quadratic refinement

\[
Q_K(q)=\frac12q^TKq\pmod N.
\]

Its polarization is

\[
Q_K(q+a)-Q_K(q)-Q_K(a)=q^TKa,
\]

so multiplication by \(\exp(2\pi iQ_K/N)\) implements the shear on finite Weyl operators, up to the standard central phase. This is the exact finite controlled-phase operation missing from the purely diagonal two-port subgroup.

For even \(N\), \(1/2\) does not exist modulo \(N\). The symplectic shear still acts on the exponent module, but its unitary lift requires a chosen quadratic refinement, doubled phase convention or equivalent metaplectic data. The even-level lift must not be inferred from the odd formula.

## 7. Periodicity obstruction for an ordinary quadratic scalar action

The local expression

\[
\frac12q^TXq
\]

is not a globally single-valued function of angular variables: it changes when \(q\) is replaced by \(q+n\). Compactification therefore changes the global theory.

Credible completions include:

1. a Villain sum over lifts \(q+n\);
2. a theta-function kernel;
3. a periodic cosine potential whose Hessian is \(X\) only locally;
4. a topological phase defined by a quadratic refinement rather than an ordinary real potential.

All retain some local quadratic data, but they differ globally and dynamically. No one completion is yet selected by the present programme.

## 8. Relation to the “one carrier, two faces, three relationships” pattern

The compact carrier is one polarized symplectic torus. Its two configuration coordinates are the two faces. The symmetric response space still has exactly three primitive directions:

\[
\operatorname{Sym}_2:
K_{11},\ K_{22},\ K_{12}=K_{21}.
\]

The first two are self-relations and the third is the mutual relation. Compactification does not create this pattern; it promotes it from real response geometry to an arithmetic action on a canonical lattice.

## 9. Claim ledger

- **Exact:** a principally polarized integral two-port torus has automorphism group \(Sp(4,\mathbb Z)\).
- **Exact:** integral symmetric shears descend to the torus and all finite quotients.
- **Exact:** generic nonintegral response shears fail representative independence.
- **Exact:** the finite Fourier transform implements polarization exchange; odd levels admit the standard half-quadratic shear phase.
- **Conditional:** compact phase/flux variables repair the normalization no-go.
- **Open:** derivation of both compact conjugate variables from the Furey/Standard-Model system.
- **Open:** physical interface realizing Fourier/Legendre duality.
- **Open:** selection of the periodic global completion.
- **Not established:** that the qutrit code and boundary system are the same physical degrees of freedom.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the completed Furey/Standard-Model linking system produces two compact conjugate holonomy/flux pairs with the primitive intersection form and response class \(X\).

**Interface trigger:** a derived gluing defect has the finite Fourier kernel and controlled quadratic phase as its exact boundary amplitude.

**Compactness falsifier:** only \(q\) is compact while the argument assumes the entire classical phase space is \(\mathbb R^4/\mathbb Z^4\).

**Periodicity falsifier:** \(q^TXq/2\) is used as a global real-valued potential on \(\mathbb T^2\) without a periodic lift or refinement.

**Arithmetic falsifier:** a nonintegral \(K\) is claimed to act on the primitive torus lattice despite failing representative independence.

## 11. Certificate

The [compact phase/flux lattice certificate](../../../verification/verify/verify_compact_two_port_phase_flux_lattice_has_canonical_sp4z_and_finite_reductions.mjs) verifies integral symplecticity, compatible reductions modulo \(N\), failure of nonintegral representative independence, the odd-level quadratic-polarization identity and the even-level inverse-of-two obstruction.

## Companion documents

- [Noncompact normalization no-go](459_noncompact_scalar_response_has_no_canonical_integral_lattice_only_normalized_mutual_coupling_is_scale_invariant.md)
- [Conditional integral generator completion](458_positive_response_unit_self_shears_and_boundary_legendre_duality_supply_the_standard_sp4z_generators.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Braid/integral symplectic branch](../0000-0099/57_braid_central_twist_to_sp4z_branch.md)
