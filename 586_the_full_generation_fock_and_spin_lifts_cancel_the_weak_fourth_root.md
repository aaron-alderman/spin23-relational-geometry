# The Full-Generation Fock and Spin Lifts Cancel the Weak Fourth Root

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact finite one-particle, exterior-Fock and real-Spin lift theorem; continuum determinant-line sewing to the shell deformation remains open

## Executive result

Cycle 501 showed that the cover-level weak lift \(\pm iP_2\) descends, after the faithful \(\mathbb Z_6\) quotient, to one order-two operation on the completed generation. The natural next possibility was that second quantization or the Pfaffian line might retain its fourth root projectively.

For the complete finite one-generation internal space, it does not.

The quotient involution acts on sixteen one-particle components with eigenvalue multiplicities

\[
n_+=8,
\qquad
n_-=8.
\]

Its determinant is \(+1\). Its canonical exterior-Fock lift fixes the vacuum and squares to \(+1\) on all \(2^{16}\) occupation states. Its real Spin lift also squares to

\[
(-1)^{n_-(n_--1)/2}
=(-1)^{28}
=+1.
\]

Therefore:

\[
\boxed{
\text{the completed generation cancels the cover-level fourth root in both canonical Fock lifts}.}
\]

Multiplying the implementer by \(i\) recreates an order-four projective operator, but rotates the vacuum by \(i\) and is not selected by the matter representation.

## 1. One-particle involution

The faithful quotient element acts as

\[
\begin{array}{c|c|c}
\text{species}&\text{dimension}&\text{action}\\
\hline
Q&6&3\text{ copies of }-P_2\\
u^c&3&+I_3\\
d^c&3&-I_3\\
L&2&-P_2\\
e^c&1&-1\\
\nu^c&1&+1
\end{array}
\]

Each \(-P_2\) has eigenvalues \(+1,-1\). The negative eigenspace dimensions are therefore

\[
3\quad(Q)
+3\quad(d^c)
+1\quad(L)
+1\quad(e^c)
=8.
\]

The positive dimension is also eight. Hence

\[
G^2=I,
\qquad
\det G=(-1)^8=+1.
\]

The operation belongs to \(SO(16)\) on a compatible real form.

## 2. Canonical exterior-Fock lift

For a number-preserving one-particle operator \(G\), second quantization is the exterior-algebra functor

\[
\Gamma(G)=\bigoplus_{r=0}^{16}\Lambda^rG.
\]

It is an honest representation:

\[
\Gamma(G_1G_2)=\Gamma(G_1)\Gamma(G_2).
\]

Consequently

\[
\Gamma(G)^2=\Gamma(G^2)=I.
\]

The vacuum lies in \(\Lambda^0\) and is fixed with phase \(+1\). The certificate verifies this directly on all

\[
2^{16}=65536

\]

occupation basis states, including all Koszul reordering signs.

There is no projective fourth root in the canonical complex CAR/Fock implementation.

## 3. Real Spin lift

An orthogonal involution with an \(m\)-dimensional negative eigenspace can be represented in the Clifford algebra by a product of \(m\) orthonormal vectors. Its square is

\[
(-1)^{m(m-1)/2}.
\]

For \(m=8\),

\[
\widetilde G^2=(-1)^{28}=+1.
\]

Thus even the real Spin lift of the full internal involution has order two. A smaller isolated weak doublet can exhibit the cover-level order four, but the remaining completed-generation sectors change the negative-eigenspace count so that the total lift squares positively.

This is a finite representation-theoretic analogue of cancellation: the phase cannot be assigned from one weak block while ignoring the rest of the anomaly-complete generation.

## 4. Why an arbitrary projective rephasing does not count

Define

\[
\widehat G=i\Gamma(G).
\]

Then

\[
\widehat G^2=-I.
\]

But also

\[
\widehat G|0\rangle=i|0\rangle.
\]

Nothing in the faithful one-particle action chooses this vacuum phase. The alternative \(-i\Gamma(G)\) is equally valid. This simply reinstates the inverse-fourth-root ambiguity already identified at the central comparison stage.

A meaningful projective lift must arise from a determinant line, boundary anomaly, Pin structure or specified polarization—not from multiplying an honest implementer by a desired phase.

## 5. What Pfaffian spectral flow still supplies

The domain-wall calculation remains valuable. For a path of real antisymmetric Majorana operators, localized spectral-flow parity gives

\[
\operatorname{sgn}\frac{\operatorname{Pf}A_1}{\operatorname{Pf}A_0}
=(-1)^{\operatorname{SF}_2}.
\]

This is a relative \(\mathbb Z_2\) orientation transport. It can carry a chosen ribbon sign from one endpoint to another, and the localized-crossing ledger can separate defect flow from a cancelling remote-edge event.

It does not provide:

- an absolute Pfaffian orientation;
- a canonical fourth root;
- an operator map from the shell class \(k=u+e_1\) into the domain-wall family;
- a proof that the transported sign selects the genus-one rather than genus-zero ribbon thickening.

The Pfaffian branch and the Gaussian deformation branch remain type-separated until such a map is constructed.

## 6. Branch decision

- **Closed:** the faithful one-particle operation has spectrum \((+1)^8(-1)^8\) and determinant \(+1\).
- **Closed:** its canonical exterior-Fock lift has order two on all \(65536\) states.
- **Closed:** its real Spin lift has square \(+1\).
- **Closed:** scalar rephasing can manufacture \(C_4\) but is not source-selected.
- **Preserved:** localized Pfaffian spectral flow transports a relative \(\mathbb Z_2\) sign.
- **Open:** a determinant-line sewing map from \(u+e_1\) or the opposite glue face into the domain-wall operator family.
- **Open:** a regulator-independent continuum localization theorem.

## 7. Stop-everything and falsification gates

### Stop-everything

1. A boundary polarization or Pin structure produces a canonical projective lift despite the honest bulk Fock action.
2. The resulting phase acts nontrivially on \(k=u+e_1\).
3. Localized spectral flow then fixes the aligned punctured-torus ribbon sign and matches the glue commutator.

### Falsification boundaries

- A fourth root inserted by scalar rephasing is not a derived projective representation.
- A single weak doublet's lift cannot be extrapolated to the completed generation without counting all negative eigendirections.
- Relative Pfaffian sign is \(\mathbb Z_2\), not automatically \(\mu_4\).
- Anomaly cancellation permits determinant-line trivialization but does not choose its absolute section.
- No action on deformation cohomology exists until an explicit operator-family map is supplied.

## 8. Certificate

The [full-generation Fock-lift certificate](scripts/verify_full_generation_fock_lift_of_quotient_weyl_involution_has_order_two.mjs) constructs the signed one-particle permutation, verifies its spectrum and determinant, exhausts the exterior-Fock action on all \(65536\) states, computes the real Spin-lift square and isolates arbitrary vacuum rephasing from canonical second quantization.

## Companion documents

- [Global \(\mathbb Z_6\) quotient correction](585_the_global_z6_quotient_absorbs_the_weak_fourth_root_but_still_does_not_orient_the_two_cycles.md)
- [Domain-wall Pfaffian orientation transport](475_domain_wall_pfaffian_spectral_flow_can_transport_the_ribbon_sign_but_cannot_supply_its_absolute_octonion_sewing.md)
- [Weak–Pauli–Gaussian centre comparison](584_the_weak_pauli_and_gaussian_quartic_centres_match_but_the_match_cannot_split_the_affine_arrow_pair.md)
- [Completed one-generation anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
