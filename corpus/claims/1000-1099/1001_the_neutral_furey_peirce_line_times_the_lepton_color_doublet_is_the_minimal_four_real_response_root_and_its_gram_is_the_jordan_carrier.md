# The Neutral Furey Peirce Line Times the Lepton–Colour Doublet Is the Minimal Four-Real Response Root, and Its Gram Is the Jordan Carrier

**Date:** 18 October 2026  
**Branches:** neutral Furey Peirce corner, response root, lepton–colour doublet, graded antiunitary, Gram/Jordan map, and projective descent  
**Claim status:** exact minimal factorization and quadratic map; source-level intertwiner remains open  
**Certificate:** [factor_the_four_real_gamma_carrier_as_neutral_peirce_root_times_lepton_color_doublet.mjs](../../../verification/factor/factor_the_four_real_gamma_carrier_as_neutral_peirce_root_times_lepton_color_doublet.mjs)

## Executive result

The response root required by document 1000 has a minimal source-adjacent candidate.

Document 251 identified the neutral neutrino Peirce off-diagonal line as the unique currently known Furey complex line that is gauge trivial and carries a canonical negative-square orientation. Realify it as

\[
P_\nu\cong\mathbb R^2,
\qquad
J_\nu^2=-I,
\qquad
K_\nu J_\nu=-J_\nu K_\nu,
\]

where \(K_\nu\) is complex conjugation after a real axis is selected.

Tensor it with the real normalized lepton–colour doublet

\[
W_{LQ}\cong\mathbb R^2.
\]

The root carrier is then

\[
\boxed{\mathcal R=P_\nu\otimes W_{LQ}\cong\mathbb R^4.}
\]

On \(W_{LQ}\), let \(\varepsilon=DX\). The graded antiunitary realification factors exactly as

\[
\boxed{\Gamma_{\mathbb R}=K_\nu\otimes\varepsilon.}
\]

This is not merely conjugate to the matrix used in documents 969 and 996: in the standard real/imaginary block ordering it is exactly

\[
\operatorname{diag}(\varepsilon,-\varepsilon).
\]

Since \(K_\nu^2=I\) and \(\varepsilon^2=-I\),

\[
\Gamma_{\mathbb R}^2=-I_4.
\]

Thus the unique gauge-neutral Furey complex-plane candidate and the independently established lepton–colour response doublet supply exactly the four-real coherent root already required by the transport theory.

## 1. The root as a two-by-two real matrix

Write a root state as

\[
\Psi=
\begin{pmatrix}
\text{Re lepton}&\text{Re colour}\\
\text{Im lepton}&\text{Im colour}
\end{pmatrix}.
\]

Rows belong to the realified neutral Peirce line; columns belong to the lepton–colour doublet. The natural quadratic response is the column Gram matrix

\[
\boxed{Q(\Psi)=\Psi^T\Psi\in H_2(\mathbb R)_+.}
\]

Every positive-definite element of \(H_2(\mathbb R)\) has such a root by Cholesky factorization, and rank-one roots generate its null boundary. Signed linear combinations extend the relationship space to all of \(H_2(\mathbb R)\).

This gives a literal form of the proposed architecture:

- one root carrier \(\Psi\);
- two lepton–colour faces;
- three independent Gram relationships;
- one central sign on the root, invisible on \(Q\).

## 2. Exact covariance

The factored interface acts by

\[
\Psi\longmapsto K_\nu\Psi\varepsilon^T.
\]

Applying it twice gives

\[
\Psi\longmapsto-\Psi,
\]

while the Jordan response transforms as

\[
Q(\Gamma\Psi)
=\varepsilon Q(\Psi)\varepsilon^T.
\]

After the central square,

\[
Q(-\Psi)=Q(\Psi).
\]

This reproduces the coherent/even descent of document 999 internally: the order-four local root action becomes order two on its Gram relationship, and the placement factor raises these to the established coherent twelve and observable six.

## 3. Root gauge and why the construction is economical

For any \(O\in O(2)\) acting on the Peirce-quadrature rows,

\[
Q(O\Psi)=\Psi^TO^TO\Psi=Q(\Psi).
\]

The quadratic map therefore has a natural left \(O(2)\) root gauge. This is not a new particle multiplicity: it is the familiar nonuniqueness of a Gram square root.

The construction is minimal in the following precise sense:

- a generic positive \(2\times2\) Jordan response has rank two, so its Gram root needs at least two rows;
- the response has two labeled columns;
- hence four real root coordinates are necessary and sufficient;
- these are exactly the dimension of the established realified \(\Gamma\) carrier.

## 4. Comparison with the other root candidates

### Full Furey minimal ideal

It certainly contains centrally odd fermionic amplitudes, but it is much larger and mostly gauge charged. Additional projection is required. The neutral Peirce line is the minimal gauge-trivial factor already selected inside the completed Furey linking structure.

### Neutral Nambu/Majorana carrier

It supplies conjugation and neutral doubling, but the ordinary Furey conjugation of document 166 squares to \(+I\). The present construction shows exactly what must be added: the lepton–colour quarter-turn \(\varepsilon\), producing \(K_\nu\otimes\varepsilon\) with square \(-I\).

### Pfaffian line

A Pfaffian can retain root-level sign information, but generic CP phases make the Majorana Pfaffian complex and remove a canonical real sign. Here the Peirce complex line is retained explicitly; no unsupported real Pfaffian sign is assumed. A Pfaffian interpretation may still explain the global orientation of the root bundle.

The neutral Peirce times lepton–colour construction is therefore the only current candidate satisfying dimension, gauge neutrality, negative-square interface and quadratic Jordan-map gates simultaneously.

## 5. What remains genuinely open

The factorization theorem does not yet prove that the Standard Model or Furey dynamics produces \(\Psi\). Missing arrows are:

1. a source-level intertwiner from the neutral \(D\leftrightarrow E\) Peirce corner to the real/imaginary root rows;
2. a normalized map from the four Higgs-dressed Dirac channels to the lepton–colour columns;
3. a derivation of the real-axis selector \(K_\nu\) compatible with CP and Higgs-vacuum choice;
4. a boundary action deriving \(K_\nu\otimes DX\); and
5. a dynamical kernel whose Gram is the physical stress/response matrix rather than an arbitrary positive matrix.

## 6. Stop-everything and falsification tests

**Intertwiner trigger:** construct a unique gauge- and Lorentz-equivariant map whose realification is \(P_\nu\otimes W_{LQ}\) and which sends Furey/Higgs data to \(\Psi\).

**Gram trigger:** a two-point or stress kernel factorizes as \(Q=\Psi^T\Psi\) with the same normalization that produces the silver response.

**Interface trigger:** the microscopic boundary term acts as \(K_\nu\otimes DX\) without inserting either factor by hand.

**CP falsifier:** no physical real-axis selector exists on the neutral Peirce line once measured CP phases are included.

**Gauge falsifier:** the proposed Peirce root acquires a nontrivial Standard-Model character after the full completed matter action is included.

**Arbitrariness falsifier:** the source-to-root intertwiner retains a free \(GL(2,\mathbb R)\) matrix that can fit any desired response.

## Verdict

| Gate | Verdict |
|---|---|
| Four-real dimension | **Passed exactly** |
| Gauge-neutral complex root plane | **Passed in the neutral Peirce corner** |
| \(\Gamma^2=-I\) | **Passed exactly** |
| Quadratic map to \(H_2(\mathbb R)_+\) | **Passed exactly** |
| Central sign disappears quadratically | **Passed exactly** |
| Source-level Furey/Higgs intertwiner | **Open** |
| Microscopic boundary dynamics | **Open** |

## Position in the corpus

- [Furey response-root center audit](1000_all_four_higgs_dressed_furey_dirac_composites_are_even_under_the_known_microscopic_centers_so_the_coherent_minus_sign_must_live_on_a_response_root.md)
- [unique neutral Peirce complex line](../0200-0299/251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
- [graded quaternionic sideband interface](../0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [even observable descent](../0900-0999/999_the_central_sign_is_invisible_on_even_furey_bilinears_and_reduces_coherent_c12_to_observable_c6.md)
- [Furey conjugation and Nambu map](../0100-0199/166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
- [complex Majorana Pfaffian boundary](../0300-0399/352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
