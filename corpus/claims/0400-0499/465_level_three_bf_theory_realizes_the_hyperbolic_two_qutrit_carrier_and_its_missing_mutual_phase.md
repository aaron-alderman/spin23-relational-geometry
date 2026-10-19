# Level-Three BF Theory Realizes the Hyperbolic Two-Qutrit Carrier and Its Missing Mutual Phase

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact topological source model; Standard-Model/Furey derivation and level selection remain open

## 1. The minimal topological action

Consider two compact Abelian gauge fields with level-three BF action

\[
S_{\mathrm{BF}}
=
\frac{3}{2\pi}\int a\wedge db.
\]

In Abelian Chern–Simons \(K\)-matrix notation,

\[
K_{\mathrm{BF}}
=
\begin{pmatrix}0&3\\3&0\end{pmatrix}.
\]

This is an even integral lattice of signature zero and determinant \(-9\). Its finite discriminant group is

\[
\mathcal D=\mathbb Z^2/K\mathbb Z^2
\cong\mathbb Z_3\oplus\mathbb Z_3.
\]

The torus Hilbert space therefore has dimension

\[
|\det K|=9,
\]

exactly two qutrits.

## 2. The missing phase is its modular \(T\) operation

Since

\[
K^{-1}=\begin{pmatrix}0&1/3\\1/3&0\end{pmatrix},
\]

the finite quadratic refinement on a label \(\ell=(a,b)\) is

\[
q(\ell)=\frac12\ell^TK^{-1}\ell
=\frac{ab}{3}\pmod1.
\]

The modular Dehn-twist phase is therefore

\[
T|a,b\rangle
=e^{2\pi iq(a,b)}|a,b\rangle
=\omega^{ab}|a,b\rangle.
\]

This is exactly the unique nontrivial mutual controlled phase isolated in the previous interface classification.

Thus a concrete, quantized, unitary topological action exists whose intrinsic modular operation supplies the missing third relationship.

## 3. Its modular \(S\) operation

The bilinear pairing is

\[
B((a,b),(c,d))
=\frac{ad+bc}{3}\pmod1.
\]

Hence

\[
S_{(a,b),(c,d)}
=\frac13\omega^{-(ad+bc)}.
\]

This is a hyperbolic Fourier transform. In the displayed tensor-product basis it equals two local inverse Fourier transforms followed by a swap of the two qutrits. It is therefore cross-indexed but not an entangling resource. The exact relations are

\[
S^2=C,
\qquad
(ST)^3=C,
\]

with \(C:(a,b)\mapsto(-a,-b)\). No anomalous signature phase appears because the lattice has signature zero.

The BF theory therefore supplies a mutual quadratic phase and a correlated polarization exchange. Only the former is an entangling resource. It does not automatically supply every independent local one-qutrit Clifford operation; those remain associated with the two individual face sectors.

## 4. Exact relation to oppositely oriented \(A_2\) faces

The doubled opposite-orientation discriminant form was

\[
q_-(a,b)=\frac{a^2-b^2}{3}.
\]

Set

\[
x=a+b,
\qquad
y=a-b
\]

over \(\mathbb F_3\). This change of variables is invertible, and

\[
a^2-b^2=xy.
\]

Therefore

\[
(\mathbb Z_3^2,q_-)
\cong
(\mathbb Z_3^2,q_{\mathrm{BF}}),
\qquad
q_{\mathrm{BF}}(x,y)=\frac{xy}{3}.
\]

The BF carrier is precisely the hyperbolic finite quadratic module already latent in an oppositely oriented pair of \(A_2\) discriminant faces.

The earlier failure came from *maximally gluing and quotienting* that module. Keeping it as a discriminant TQFT instead preserves all nine states and turns its quadratic refinement into the mutual phase.

## 5. Why level three is exact but not yet predicted

For general level \(k\),

\[
K_k=\begin{pmatrix}0&k\\k&0\end{pmatrix}
\]

has \(k^2\) torus states and phase \(e^{2\pi i ab/k}\). Exactly \(k=3\) gives two qutrits.

Within the arithmetic response chain, three is motivated independently by

- \(\det A_2=3\);
- the \(A_2\) discriminant group \(\mathbb Z_3\);
- the qutrit punctured anomaly code.

But these matches do not yet prove that a microscopic action chooses BF level three. A quantized anomaly-inflow coefficient, Standard-Model charge pairing or Furey linking index must fix the level without circularly choosing it to match the code.

## 6. Relation to \(Sp(4,\mathbb F_3)\)

The BF modular \(T\) is the exact cross shear that, together with independent local two-face Clifford generators, was already proved to generate all of \(Sp(4,\mathbb F_3)\).

The logical architecture can therefore be stated as

\[
\underbrace{\text{two oriented face sectors}}_{\text{local }SL(2,3)^2}
+
\underbrace{\text{level-3 BF interface}}_{\text{mutual cross shear}}
\Longrightarrow
Sp(4,\mathbb F_3).
\]

This is an exact generator theorem for a concrete topological model. The identification of those sectors with Furey matter ports and punctured-code logical observables remains conditional.

## 7. Physical interpretations and constraints

The BF fields could represent:

- compact value/flux holonomies of the boundary response;
- emergent gauge fields of a gapped interface;
- a topological defect between the two Furey faces;
- an anomaly-inflow sector attached to punctures;
- an effective description of a measurement-induced logical interface.

Any proposal must also explain why the sector is topological or sufficiently gapped, why it does not introduce unobserved low-energy particles, and how it couples gauge-invariantly to Standard-Model/Furey observables.

## 8. Claim ledger

- **Exact:** level-three BF theory has discriminant group \(\mathbb Z_3^2\) and a nine-dimensional torus Hilbert space.
- **Exact:** its finite quadratic refinement is \(q(a,b)=ab/3\).
- **Exact:** its modular \(T\) is the missing controlled phase \(\omega^{ab}\).
- **Exact:** its modular \(S\) is the hyperbolic Fourier transform and satisfies the signature-zero modular relations.
- **Exact:** its finite quadratic module is isomorphic to oppositely oriented \(A_2\) discriminant forms.
- **Conditional:** local face operations plus the BF interface generate the full finite \(Sp(4)\) carrier.
- **Open:** derivation of the compact BF fields and level from Furey/Standard-Model dynamics.
- **Open:** observable intertwiner with the punctured anomaly code.
- **Not established:** that this topological sector exists in nature.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** anomaly inflow, Furey linking data or a boundary effective action derives \(K=\begin{psmallmatrix}0&3\\3&0\end{psmallmatrix}\) with the two gauge fields already tied to physical face observables.

**Level-selection trigger:** the coefficient three follows from a quantized Standard-Model/Furey index rather than from matching the desired qutrit dimension.

**Topological falsifier:** the proposed interface has gapless non-topological modes that invalidate the finite Hilbert-space reduction.

**Circularity falsifier:** level three is treated as predicted solely because it was selected to reproduce two qutrits.

**Completeness falsifier:** the BF modular group alone is called the full \(Sp(4,\mathbb F_3)\) without independently supplying the local face generators.

## 10. Certificate

The [level-three BF certificate](../../../verification/verify/verify_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_interface.mjs) verifies the discriminant size, finite quadratic refinement, unitarity and modular relations of \(S,T\), equality of \(T\) with the controlled phase, the opposite-\(A_2\)/hyperbolic change of variables and the unique level yielding nine states.

## Companion documents

- [Unique two-\(A_2\) quadratic interface](464_there_is_a_unique_nontrivial_quadratic_interface_between_two_a2_qutrits_and_the_response_selects_its_class.md)
- [\(A_2\) discriminant Weil representation](463_the_a2_discriminant_weil_representation_supplies_one_qutrit_but_doubling_does_not_supply_the_mutual_gate.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Two-puncture qutrit code](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Domain-wall anomaly gate](../0200-0299/228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
