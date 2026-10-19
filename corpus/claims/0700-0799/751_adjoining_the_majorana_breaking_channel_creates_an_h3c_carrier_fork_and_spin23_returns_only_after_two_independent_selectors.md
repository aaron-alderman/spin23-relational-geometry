# Adjoining the Majorana-Breaking Channel Creates an \(H_3(\mathbb C)\) Carrier Fork, and \(Spin(2,3)\) Returns Only After Two Independent Selectors

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B10, B11, B13, B14 and the broken-current carrier fork  
**Claim status:** synthesis of exact certified carrier, decoupling and channel-selection theorems; action-level Standard-Model realization remains open  
**Certificates:** documents 682–688 and their linked executable checks

## Executive result

The projected two-source analysis and the dynamically enlarged Majorana analysis are distinct physical regimes.

If the broken-current/order-parameter sector is integrated out while the old two-source kernel is assumed closed, document 750 applies: the fixed-UV remnant is a four-dimensional null-line affine algebra.

If the new Majorana/Nambu observables are retained dynamically, exact support closure gives

\[
\boxed{
H_3(\mathbb C),
\qquad
\mathfrak{co}(H_3(\mathbb C))=\mathfrak{su}(3,3),
}
\]

not a larger realization of the same \(H_2(\mathbb R)\) carrier.

The controlled route back is two-stage:

\[
\boxed{
H_3(\mathbb C)
\xrightarrow{\text{heavy third Peirce face}}
H_2(\mathbb C)
\xrightarrow{\text{conjugate doubling + exchange/superselection}}
H_2(\mathbb R).
}
\]

Only the final carrier has conformal group

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

## 1. Why the dynamic carrier is larger

The Majorana Nambu residue is supported on a rank-three complex graph subspace. Hermitian observables on that support form

\[
H_3(\mathbb C),
\]

of real dimension nine. This conclusion is an exact Jordan and Jordan-triple isomorphism, not a dimension analogy.

Allowing arbitrary supported Hermitian variations therefore activates:

- the rank-two complex corner;
- four real Peirce-half links to the third face;
- the third-face population;
- and the imaginary corner coordinate.

The \(H_2(\mathbb R)\) carrier is a real rank-two boundary face inside this larger cone.

## 2. First selector: energetic Peirce reduction

For

\[
H_\Delta=
\begin{pmatrix}
H_2&w\\
w^\dagger&\Delta
\end{pmatrix},
\]

Feshbach elimination gives

\[
zI-H_{\rm eff}(z)
=zI-H_2-\frac{ww^\dagger}{z-\Delta}.
\]

When \(|z|\ll\Delta\), corrections are \(O(\|w\|^2/\Delta)\), and heavy-face probability is \(O(\|w\|^2/\Delta^2)\). This dynamically suppresses the third face and its Peirce-half links.

It selects

\[
H_2(\mathbb C),
\]

not \(H_2(\mathbb R)\). The imaginary off-diagonal coordinate remains entirely inside the low-energy corner.

## 3. Second selector: real structure

Direct conjugation averaging

\[
A\mapsto\operatorname{Re}A
\]

is positive on the Jordan cone but is not completely positive as a local complex quantum channel.

The obstruction is removed only after changing the system. Encode the conjugate pair

\[
\iota(A)=\operatorname{diag}(A,\bar A)
\]

and let a unitary exchange swap the blocks. Exchange averaging then becomes a random-unitary completely positive map and sends

\[
\iota(A)longmapsto\iota(\operatorname{Re}A).
\]

Topology dephasing or superselection is additionally required because the full exchange-fixed doubled algebra contains off-diagonal topology coherences beyond the encoded real corner.

## 4. Unified finite selector

On the doubled three-face carrier, documents 687–688 construct

\[
\Phi(O)
=\frac14\sum_{g\in\{I,S,Z,SZ\}}gKOKg^\dagger,
\]

where:

- \(K\) compresses to the rank-two Peirce support;
- \(Z\) dephases topology coherence;
- \(S\) exchanges conjugate topology blocks.

This map is completely positive and trace nonincreasing, and on conjugate-paired observables it returns the doubled \(H_2(\mathbb R)\) image exactly.

It becomes deterministic only when the physical low-energy state already lies in the selected support or when the heavy complement has been consistently integrated out. Complete positivity does not make postselection free.

## 5. Relation to the fixed-data null flags

The two branches answer different questions:

| Regime | Active carrier | Relevant algebraic result |
|---|---|---|
| projected closed two-source kernel, fixed UV | \(H_2(\mathbb R)\) response patch | null-line \(\mathbb R\oplus\mathfrak e(2)\) remnant |
| dynamic Majorana/Nambu support | \(H_3(\mathbb C)\) | \(\mathfrak{su}(3,3)\) conformal completion |
| heavy third face only | \(H_2(\mathbb C)\) | \(\mathfrak{su}(2,2)\cong\mathfrak{so}(2,4)\) parent |
| heavy face plus real selector | \(H_2(\mathbb R)\) | \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\) |

One must not combine the small fixed-data stabilizer from the first row with the larger dynamic carrier from the second without deriving the Schur reduction connecting them.

## 6. Furey relevance and typing constraint

The doubled conjugate topology mechanism is adjacent to the Furey exchange construction. It is credible only if:

1. the two blocks are the actual conjugate Furey topology sectors or a proved dilation of them;
2. exchange preserves gauge and Yukawa interactions;
3. topology parity supplies a physical dephasing/superselection rule;
4. internal CKM/PMNS CP information remains in a separately typed flavor factor;
5. the antisymmetric topology sector does not produce light mirror matter.

The topology doubling must remain distinct from the Clifford face factor identified in documents 706–708. Twirling the wrong factor collapses the carrier to scalars.

## 7. Dependency graph

\[
\begin{array}{c}
\text{broken }B-L\text{ Ward identity}\\
\downarrow\\
\text{include order-parameter/Nambu operators?}
\end{array}
\]

branches into

\[
\begin{array}{ccc}
\text{no: projected two-source closure}
&\longrightarrow&
\text{null-line affine remnant}\\[2mm]
\text{yes: dynamic support closure}
&\longrightarrow&
H_3(\mathbb C)\\
&&\downarrow\ \Delta\gg E\\
&&H_2(\mathbb C)\\
&&\downarrow\ \text{doubled real selector}\\
&&H_2(\mathbb R)\to Spin_0(2,3).
\end{array}
\]

Each arrow has a separate falsifier.

## 8. Stop-everything criteria

Stop retaining \(Spin(2,3)\) as the full carrier group if unrestricted dynamic closure is \(H_3(\mathbb C)\).

Stop claiming a heavy third face selects the real slice; it removes five transverse directions but not the imaginary corner coordinate.

Stop implementing the real selector as a local ordinary quantum channel on one complex sector.

Stop using doubled exchange without topology superselection, because its fixed algebra is too large.

Stop the selector if it creates light propagating mirror matter or erases observed flavor CP.

Stop identifying the Majorana particle generation with the third Peirce face without an operator intertwiner.

## 9. Highest-value next calculations

1. Derive the order-parameter/Nambu response block from an explicit broken-(B-L\) action.
2. Identify \(\Delta\), \(w\) and their radiative corrections in that action.
3. Test whether Furey exchange supplies the doubled real-structure operator on the same carrier.
4. Compute finite-gap and finite-superselection errors in the effective \(H_2(\mathbb R)\) response.
5. Determine whether the discarded \(H_3(\mathbb C)\) cubic norm leaves a boundary residue after selection.

## Companion documents

- [Dynamic Majorana corner is H3(C)](../0600-0699/682_the_dynamic_majorana_nambu_corner_is_h3c_not_h2r.md)
- [Spin(2,3) as the real rank-two Peirce corner](../0600-0699/683_spin23_is_the_real_rank_two_peirce_corner_inside_the_majorana_h3c_carrier.md)
- [Heavy third-face decoupling](../0600-0699/685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
- [Real-slice complete-positivity obstruction](../0600-0699/686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md)
- [Doubled conjugate exchange selector](../0600-0699/687_doubling_the_conjugate_topologies_turns_the_real_slice_selector_into_a_cp_exchange_twirl.md)
- [Combined completely positive selector](../0600-0699/688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Fixed-data Majorana flag comparison](750_majorana_breaking_enlarges_the_fixed_data_remnant_from_a_null_plane_translation_algebra_to_a_null_line_euclidean_algebra_not_spin23.md)
