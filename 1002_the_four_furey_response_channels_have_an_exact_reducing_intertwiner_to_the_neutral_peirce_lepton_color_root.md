# The Four Furey Response Channels Have an Exact Reducing Intertwiner to the Neutral-Peirce Lepton–Colour Root

**Date:** 18 October 2026  
**Branches:** four-channel Furey response, lepton–colour aggregation, channel translation, product grading, neutral Peirce root, and graded antiunitary  
**Claim status:** exact response-algebra intertwiner; microscopic Peirce identification and action remain open  
**Certificate:** [intertwine_the_four_furey_response_channels_with_the_neutral_peirce_lepton_color_root.mjs](scripts/intertwine_the_four_furey_response_channels_with_the_neutral_peirce_lepton_color_root.mjs)

## Executive result

One of the main missing arrows in document 1001 closes at response-algebra level.

Order the four complex Higgs-dressed response channels as

\[
z=(u,\nu,d,e)^T\in\mathbb C^4.
\]

Define the normalized aggregate map

\[
A=\frac1{\sqrt2}
\begin{pmatrix}
0&1&0&1\\
1&0&1&0
\end{pmatrix},
\qquad
Az=\begin{pmatrix}L\\Q\end{pmatrix}
=\frac1{\sqrt2}
\begin{pmatrix}\nu+e\\u+d\end{pmatrix}.
\]

Let

\[
p=h\chi=\operatorname{diag}(+,-,+,-)
\]

and let the established channel translation be

\[
F_C=(u\ e)(\nu\ d).
\]

Then the three exact intertwining identities are

\[
\boxed{
Ap=(-D)A,
\qquad
AF_C=XA,
\qquad
A(F_Cp)=\varepsilon A,
}
\]

where \(\varepsilon=DX\). Because all matrices are real, complex conjugation can be included:

\[
\boxed{
A(F_CpK)=(\varepsilon K)A.
}
\]

Thus the source-side antiunitary \(F_CpK\) descends exactly to the graded response interface \(\Gamma=\varepsilon K\).

## 1. The source antiunitary already squares to minus identity

The channel translation reverses the product grading:

\[
F_Cp=-pF_C.
\]

Since both are real involutions,

\[
(F_CpK)^2
=F_CpF_Cp
=-I_{\mathbb C^4}.
\]

The quaternionic square is therefore already present on the four complex response channels. Aggregation does not manufacture it; aggregation removes the antisymmetric within-sector modes while preserving it on the normalized lepton–colour quotient.

Realifying gives the commuting square

\[
\begin{array}{ccc}
\mathbb R^8_{(u,\nu,d,e)}&\xrightarrow{\ (F_CpK)_{\mathbb R}\ }&\mathbb R^8_{(u,\nu,d,e)}\\
\downarrow A_{\mathbb R}&&\downarrow A_{\mathbb R}\\
\mathbb R^4_{(L,Q)}&\xrightarrow{\ \Gamma_{\mathbb R}\ }&\mathbb R^4_{(L,Q)}.
\end{array}
\]

Both horizontal maps square to \(-I\).

## 2. The aggregate sector is reducing, not merely compressed

Let

\[
P_{\rm agg}=A^TA.
\]

The certificate verifies

\[
[P_{\rm agg},p]=0,
\qquad
[P_{\rm agg},F_C]=0.
\]

Therefore the symmetric lepton/quark aggregates and their antisymmetric complements are invariant sectors for both primitive operations and their coherent product. No leakage is discarded when passing to the root doublet.

This strengthens the earlier compression language: the response root is a genuine reducing quotient/subrepresentation of the four-channel response algebra.

## 3. Uniqueness under the stated aggregation principle

Require an aggregate map to satisfy:

1. the lepton row is supported only on \((\nu,e)\);
2. the quark row is supported only on \((u,d)\);
3. each row is symmetric under exchange within its sector;
4. the rows are normalized and orthogonal; and
5. \(F_C\) descends as the positive exchange \(X\).

The first four conditions leave four independent row-sign choices. The fifth forces the lepton and quark signs to agree. Hence

\[
A\quad\text{is unique up to one common overall sign.}
\]

This is exactly the root sign already invisible under the Gram map. No continuous \(GL(2,\mathbb R)\) fitting freedom remains once sector symmetry and exchange covariance are imposed.

The physical status of within-sector symmetric aggregation remains an assumption inherited from document 902. Electroweak breaking and unequal Yukawa strengths can violate it dynamically even though the algebraic subspace exists.

## 4. Relation to the neutral Peirce factor

The complex aggregate vector \((L,Q)\in\mathbb C^2\) realifies into the root matrix

\[
\Psi=
\begin{pmatrix}
\operatorname{Re}L&\operatorname{Re}Q\\
\operatorname{Im}L&\operatorname{Im}Q
\end{pmatrix}.
\]

Ordinary conjugation supplies the row action \(K_\nu=\operatorname{diag}(1,-1)\), while \(\varepsilon\) acts on the columns. Hence this realification is exactly the factorization of document 1001:

\[
\Gamma_{\mathbb R}=K_\nu\otimes\varepsilon.
\]

What remains open is not the matrix intertwiner. It is the ontological identification of the aggregate complex phase with the gauge-neutral \(D\leftrightarrow E\) Peirce line selected in document 251. A generic complex response coordinate and the source-native Peirce relation have the same representation type, but equality requires a Furey linking-algebra map.

## 5. Updated dependency graph

\[
\begin{array}{c}
(u,\nu,d,e)\in\mathbb C^4
\quad\xrightarrow{\ p,\ F_C,\ K\ }\quad
F_CpK\\[1mm]
\downarrow A\quad\text{(exact reducing map)}\\[1mm]
(L,Q)\in\mathbb C^2
\quad\xrightarrow{\ \varepsilon K\ }\quad
\Gamma\\[1mm]
\downarrow\text{ realification}\\[1mm]
\Psi\in P_\nu\otimes W_{LQ}\cong\mathbb R^4
\quad\xrightarrow{\ \Psi^T\Psi\ }\quad
H_2(\mathbb R)_+.
\end{array}
\]

Solid arrows: response-channel aggregation, operator intertwining, realification, and Gram map.

Open arrows: identification with the source-native neutral Peirce line, microscopic generation of \(F_CpK\), and dynamical normalization of the Gram response.

## 6. Stop-everything and falsification tests

**Peirce-identification trigger:** construct a linking-algebra morphism sending the aggregate complex coordinate to the neutral \(D\leftrightarrow E\) Peirce line while preserving dagger and the Standard-Model action.

**Dynamics trigger:** one Furey/Higgs boundary interaction generates \(F_CpK\) on the response channels and hence \(\varepsilon K\) downstairs.

**Symmetry falsifier:** physical renormalization destroys the symmetric \((\nu+e)\) or \((u+d)\) ray and no covariant reweighting preserves the intertwining square.

**Leakage falsifier:** additional microscopic operations mix the aggregate and antisymmetric sectors so that \(P_{\rm agg}\) is not dynamically reducing.

**Uniqueness overclaim:** uniqueness is asserted without the within-sector symmetry and positive-exchange conditions.

## Verdict

| Question | Verdict |
|---|---|
| Does the aggregate map intertwine \(p\) with \(-D\)? | **Yes** |
| Does it intertwine \(F_C\) with \(X\)? | **Yes** |
| Does \(F_CpK\) descend to \(\varepsilon K\)? | **Yes, exactly** |
| Is the aggregate sector reducing? | **Yes, for these operations** |
| Is the normalized symmetric map unique? | **Yes, up to common sign** |
| Is the neutral Peirce identification microscopic? | **Not yet** |

## Position in the corpus

- [neutral-Peirce lepton–colour response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [four-channel product grading and translation](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [Furey–Higgs grading compression](989_the_furey_higgs_product_grading_is_the_silver_reactance_direction_and_a2_monodromy_fixes_its_unit_amplitude.md)
- [unique neutral Peirce complex line](251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
