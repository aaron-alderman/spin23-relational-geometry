# The Exceptional Majorana Phase Has a Weak-Basis Three-Projector Triangle Invariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08, B09 and B11  
**Claim status:** exact weak-basis invariant and charged-frame reduction; connection to measurable neutrino observables and a local portal remains open

## 1. The phase missed by every pair

For the exceptional sterile mass texture,

\[
M_R=
\begin{pmatrix}
M_s&r&\alpha\\
r&M_t&i\beta\\
\alpha&i\beta&M_o
\end{pmatrix},
\]

all pairwise charged-frame Majorana invariants

\[
\operatorname{Im}
\left[
M_{ii}M_{jj}(M_{ij}^*)^2
\right]
\]

vanish when \(M_s,M_t,M_o,r,\alpha,\beta\) are real.

Nevertheless the three-edge product has

\[
\operatorname{Im}
\left[
M_{st}M_{to}M_{os}
M_{ss}^*M_{tt}^*M_{oo}^*
\right]
=r\alpha\beta M_sM_tM_o.
\]

The phase is irreducibly three-flavor.

## 2. Charged-lepton projectors

Let \(H_e\) be the charged-lepton Hermitian mass square with distinct eigenvalues, and let

\[
P_e,\quad P_\mu,\quad P_\tau
\]

be its spectral projectors.

Under a weak-basis change

\[
\ell_L=W\ell_L',
\]

they transform as

\[
P_a\mapsto W^\dagger P_aW,
\]

while the Majorana tensor transforms by congruence:

\[
M\mapsto W^TMW.
\]

## 3. Covariant building blocks

Define

\[
\boxed{
X_a=P_a^*MP_aM^\dagger.}
\]

Each block transforms as

\[
X_a\mapsto W^TX_aW^*.
\]

Because

\[
W^*W^T=I,
\]

products of the \(X_a\) transform by the same congruence-similarity pattern, and their traces are invariant.

## 4. Triangle invariant

Define

\[
\boxed{
\mathcal I_\triangle
=-\operatorname{ImTr}
\left(
X_eX_\mu X_\tau
\right).}
\]

This is a genuine weak-basis invariant.

In the charged-lepton mass frame,

\[
P_a=|a\rangle\langle a|,
\]

and direct contraction gives

\[
\operatorname{Tr}(X_eX_\mu X_\tau)
=
M_{ee}M_{\mu\mu}M_{\tau\tau}
(M_{e\mu}M_{\mu\tau}M_{\tau e})^*.
\]

Therefore

\[
\boxed{
\mathcal I_\triangle
=
\operatorname{Im}
\left[
M_{e\mu}M_{\mu\tau}M_{\tau e}
M_{ee}^*M_{\mu\mu}^*M_{\tau\tau}^*
\right].}
\]

This is precisely the residual-rephasing invariant found in the exceptional texture.

## 5. Exceptional reduction

Identify

\[
(e,\mu,\tau)\leftrightarrow(s,t,o).
\]

Then

\[
\boxed{
\mathcal I_\triangle
=r\alpha\beta M_sM_tM_o
=rM_sM_tM_o
\operatorname{Re}c\,\operatorname{Im}c.}
\]

The same complex exceptional coefficient \(c\) therefore enters:

- the polarized determinant sign sector;
- the canonical sheet-odd CP operator;
- the full sterile determinant;
- a weak-basis Majorana CP invariant.

## 6. Why the triangle is independent of pairwise tests

Each pairwise invariant sees one edge twice. In the canonical texture:

\[
r^2,\qquad
\alpha^2,\qquad
(i\beta)^2=-\beta^2
\]

are all real.

The triangle instead uses every edge once:

\[
r\cdot i\beta\cdot\alpha
=ir\alpha\beta.
\]

It measures the phase holonomy around the closed three-flavor loop.

This is a precise mathematical realization of the recurring programme motif:

\[
\boxed{\text{pairwise relationships can all look real while the closed triple is oriented}.}
\]

## 7. Degree and locality

The invariant contains six Majorana-matrix factors. The normalized spectral projectors are rational functions of \(H_e\), involving inverse charged-lepton eigenvalue differences.

As in the earlier pair-projector construction, denominators can be cleared by replacing \(P_a\) with unnormalized spectral polynomials. This produces a high-degree polynomial numerator but not automatically a low-dimension local interaction.

Thus the result clears the basis-invariance gate, not the locality or mediator gate.

## 8. Relation to oscillation and lepton-number CP

The ordinary Dirac-type invariant

\[
\operatorname{ImTr}[H_e,MM^\dagger]^3
\]

depends only on the Hermitian mass square and controls oscillation-type CP.

The triangle invariant uses \(M\) itself and is sensitive to congruence phases erased by \(MM^\dagger\). It belongs to the Majorana/lepton-number-violating invariant sector.

Both may be nonzero, one may vanish while the other survives, and neither should be substituted for the other.

## 9. Observable route

A physical test requires connecting \(\mathcal I_\triangle\) to amplitudes involving all three charged-lepton flavor projectors, for example:

- interference among several lepton-number-violating decay channels;
- a cyclic product of flavor-tagged Majorana propagator residues;
- a response holonomy built from three neutral flavor ports;
- a source-derived external orientation coupling.

No such measurement protocol is yet derived.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the exceptional/Furey action produces the displayed \(M_R\), and a calculable flavor-tagged observable isolates \(\mathcal I_\triangle\).

**Relational trigger:** the three-projector trace becomes the holonomy of a three-port \(H_3\) response whose edges reduce to the \(Spin(2,3)\) carrier.

**Cross-sector trigger:** the same \(c\) fixes both a quark Jarlskog invariant and \(\mathcal I_\triangle\).

**Pairwise falsifier:** vanishing pairwise quartets is claimed to imply Majorana CP conservation.

**Basis falsifier:** the charged-frame monomial is used without the spectral-projector completion.

**Locality falsifier:** a finite-dimensional invariant is advertised as a renormalizable local interaction without a mediator analysis.

**Observable falsifier:** nonzero \(\mathcal I_\triangle\) is called measured CP violation without a process sensitive to it.

## 11. Certificate

The [weak-basis Majorana-triangle certificate](scripts/verify_weak_basis_majorana_triangle_invariant.mjs) verifies charged-frame reduction, exact invariance under a nontrivial Fourier weak-basis change, nonzero exceptional value and simultaneous vanishing of all pairwise projector invariants.

## Companion documents

- [Exceptional-\(c\) Dirac/Majorana spectra](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
- [Weak-basis pairwise Majorana invariant](181_weak_basis_majorana_invariant_from_charged_lepton_projectors.md)
- [Low-degree polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
- [Three-port cubic consistency carrier](200_three_port_h3r_cubic_consistency_and_spin23_edge_reduction.md)
- [Three boundary scalars and Peirce–Schur recursion](203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
