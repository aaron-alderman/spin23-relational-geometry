# Dirac Face Exchange Becomes the CP Topology Real Structure Only on Hermitian Observables

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the two-doubling intertwiner branch  
**Claim status:** exact finite matrix result; action-level selection of the paired sector remains open  
**Certificate:** [verify_dirac_transpose_cp_dilation_on_hermitian_observables.mjs](../../../verification/verify/verify_dirac_transpose_cp_dilation_on_hermitian_observables.mjs)

## Executive result

The Prakash–Ramya Dirac-pair involution and the doubled completely positive topology selector can be joined exactly, but only after passing from oriented matter arrows to Hermitian observables.

On the completed Furey TRO, Dirac pairing is

\[
\Theta(X)=PX^TP.
\]

The anti-linear real structure naturally used by the topology selector is

\[
\rho(X)=P\bar XP.
\]

They differ on an oriented matrix unit. For every Hermitian observable \(H=H^\dagger\), however,

\[
H^T=\bar H
\quad\Longrightarrow\quad
\boxed{\Theta(H)=\rho(H).}
\]

Thus the Jordan/observable reduction is precisely the level at which internal Dirac face exchange can become the real structure of the completely positive doubled carrier. The price is equally precise: oriented TRO information is lost.

## 1. The certified support involution

Order the eight carrier vertices as

\[
(O_{2,1},O_{2,2},O_{2,3},H_4,H_5,C,D,E).
\]

The carrier permutation fixes the colour vertices and \(E\), while

\[
H_4\leftrightarrow D,
\qquad
H_5\leftrightarrow C.
\]

Let \(P\) be its permutation matrix. Then

\[
\Theta(E_{ts})=PE_{ts}^TP=E_{p(s),p(t)}.
\]

This is exactly the internal Weyl involution pairing

\[
\nu^c\leftrightarrow\nu,
\quad e^c\leftrightarrow e,
\quad u_i^c\leftrightarrow u_i,
\quad d_i^c\leftrightarrow d_i.
\]

It reverses oriented arrows and the outer variables of the TRO product.

## 2. Why the Hermitian boundary matters

For an oriented arrow \(E_{ts}\),

\[
\Theta(E_{ts})=E_{p(s),p(t)},
\qquad
\rho(E_{ts})=E_{p(t),p(s)}.
\]

They are generally different. The topology real structure cannot therefore replace the oriented Dirac/TRO involution on the matter-arrow space.

For a Hermitian observable, transpose and coefficient conjugation coincide:

\[
H^T=\bar H.
\]

Consequently

\[
\Theta|_{\mathrm{Herm}}=\rho|_{\mathrm{Herm}}.
\]

This explains why the relation becomes visible after Jordan symmetrization. The Jordan triple forgets outer-order orientation, exactly the information distinguishing the two maps on arrows.

## 3. The local map is not completely positive

The map

\[
H\mapsto PH^TP
\]

preserves positivity, since it is transpose followed by unitary conjugation. It is not completely positive in dimension greater than one.

Its Choi operator is unitarily equivalent to the swap operator:

\[
C_\Theta=(I\otimes P)F(I\otimes P).
\]

On a transported antisymmetric vector its expectation is \(-1\). Therefore Dirac transpose cannot be interpreted as an ordinary local quantum channel.

This reproduces, now with the actual Furey carrier permutation, the earlier complete-positivity obstruction to direct real projection.

## 4. Doubling supplies a completely positive dilation

Introduce two topology blocks and encode a Hermitian observable as

\[
\iota_\Theta(H)=
\begin{pmatrix}
H&0\\
0&\Theta(H)
\end{pmatrix}.
\]

Let \(S\) exchange the two blocks. The exchange twirl

\[
\mathcal T(O)=\frac12(O+SOS)
\]

is completely positive, trace preserving, unital and idempotent. On the paired encoding,

\[
\mathcal T(\iota_\Theta(H))
=
\begin{pmatrix}
R&0\\
0&R
\end{pmatrix},
\qquad
R=\frac12(H+\Theta(H)),
\]

and

\[
\Theta(R)=R.
\]

The non-CP transpose has not been implemented locally. Instead, its two outputs are supplied as structurally paired blocks, after which a unitary group average performs the physical selection.

## 5. What has now become exact

The following chain is certified:

\[
\begin{aligned}
&\text{Prakash--Ramya Dirac pairing}\\
&\quad\longleftrightarrow
\text{internal five-bit Weyl involution}\\
&\quad\longleftrightarrow
\Theta(X)=PX^TP\text{ on the Furey TRO}\\
&\quad\xrightarrow{\text{Hermitian observables}}
\rho(H)=P\bar HP\\
&\quad\xrightarrow{\text{paired dilation and exchange twirl}}
\text{a completely positive fixed-observable selector.}
\end{aligned}
\]

This is the first exact bridge between the paper's Dirac/code doubling and the programme's topology doubling.

## 6. What remains open

The result does not derive the paired encoding. For an arbitrary doubled input

\[
O=\operatorname{diag}(A,B),
\]

the twirl produces two copies of \((A+B)/2\), which need not be \(\Theta\)-fixed. The physical theory must impose or generate

\[
B=\Theta(A).
\]

Subsequent work identifies the missing parity exactly:

\[
Z_{\rm chir}=(2T_{3R})^2-(2T_{3L})^2=q_4q_5.
\]

It anticommutes with the Dirac exchange and is the \(SU(2)_L\) center character on matter and Higgs representations. Thus the finite grading problem is closed; the remaining problem is the action that makes the exchange \(S\), rather than the central \(Z\), gauge covariant. See [documents 693](693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md) and [694](694_topology_parity_is_the_su2l_center_all_yukawas_are_even_but_dirac_exchange_requires_enlarged_covariance.md).

Finally, the oriented TRO remains richer than the selected Jordan observable algebra. If physical amplitudes require the lost outer-order orientation, it must survive in a bundle, grading or interaction vertex even though it is absent from the local observable carrier.

## 7. New physical interpretation

The two “faces” now admit a disciplined reading:

- on the matter/TRO level they are source-target orientations paired by an internal Weyl involution;
- on the observable/Jordan level they become conjugate real-structure blocks;
- on the quantum-channel level they require a doubled unitary dilation because local transpose is not completely positive.

The levels are connected, but they must not be collapsed into one another.

## 8. Stop-everything and falsification criteria

Stop using this bridge as a physical selector if:

1. the action does not preserve or dynamically approach \(B=\Theta(A)\);
2. gauge or Yukawa interactions generate unsuppressed departures from the paired sector;
3. the Hermitian reduction removes orientation data required for observed chiral amplitudes with no compensating graded structure;
4. the antisymmetric topology sector propagates as independent mirror matter;
5. weak isospin cannot supply or coexist with the required topology grading.

Conversely, a stop-everything positive result would be an action whose low-energy equations simultaneously generate the paired encoding, gap the antisymmetric sector and retain TRO orientation in interaction data while the observable algebra reduces to the \(H_2(\mathbb R)\) carrier.

## 9. Next gates

1. Restrict \(P\) and \(\Theta\) to the exact two-face response subspace used in the \(H_2(\mathbb R)\) construction.
2. Construct a gauge/Higgs-dressed realization of the now-identified topology exchange \(S\).
3. Build a Lindblad or Hamiltonian penalty whose invariant sector obeys \(B=\Theta(A)\).
4. Test gauge and Yukawa covariance of that penalty.
5. Track the oriented TRO datum as a grading or holonomy after Hermitian/Jordan reduction.

## Reproducibility

    node scripts\verify_dirac_transpose_cp_dilation_on_hermitian_observables.mjs

## Companion documents

- [Dirac doubling is an internal Weyl face exchange](../0400-0499/414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Prakash–Ramya at the current frontier](689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [The combined CP selector on the doubled carrier](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
