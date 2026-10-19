# A Heavy Third Face Dynamically Selects the Rank-Two Peirce Corner but Not Its Real Slice

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the dynamical carrier-selection branch  
**Claim status:** exact finite Feshbach decoupling theorem with numerical convergence; Standard-Model identification remains open  
**Certificate:** [verify_gapped_third_face_converges_to_peirce_compression.mjs](../../../verification/verify/verify_gapped_third_face_converges_to_peirce_compression.mjs)

## Executive result

A large energy gap for the third Peirce face gives a controlled dynamical route

\[
H_3(\mathbb C)\longrightarrow H_2(\mathbb C).
\]

Write a three-face Hamiltonian or inverse-response generator as

\[
H_\Delta=
\begin{pmatrix}
H_2&w\\
w^\dagger&\Delta
\end{pmatrix},
\]

where \(H_2\) acts on the selected rank-two corner and the third face has gap \(\Delta\).

At spectral parameter \(z\), eliminating the third face gives the exact effective kernel

\[
\boxed{
zI_2-H_{\rm eff}(z)
=zI_2-H_2
-\frac{ww^\dagger}{z-\Delta}.
}
\]

For bounded \(z\) and \(\Delta\to\infty\),

\[
\frac{ww^\dagger}{z-\Delta}
=O\left(\frac{\|w\|^2}{\Delta}\right).
\]

Thus the projected resolvent converges to that of \(H_2\), and the Peirce compression emerges as a low-energy approximation rather than an imposed deletion.

However:

\[
\boxed{
\text{a third-face gap selects }H_2(\mathbb C),
\text{ not }H_2(\mathbb R).
}
\]

The real-slice selector remains an independent physical problem.

## 1. Exact Feshbach identity

The upper-left block of

\[
(zI_3-H_\Delta)^{-1}
\]

is

\[
\left(
zI_2-H_2
-w(z-\Delta)^{-1}w^\dagger
\right)^{-1}.
\]

This is exactly the Peirce-corner Green function dressed by virtual excursions into the heavy face.

The certificate verifies the identity and monotonic convergence for six gaps from \(5\) to \(160\). The projected-resolvent error falls with the expected inverse-gap behavior.

## 2. Leakage bound

For an eigenstate with low energy \(E\), the heavy component obeys

\[
\psi_3
=-(\Delta-E)^{-1}w^\dagger\psi_2.
\]

Therefore

\[
\|\psi_3\|
\le
\frac{\|w\|}{|\Delta-E|}
\|\psi_2\|.
\]

The heavy-face probability is suppressed quadratically:

\[
\|\psi_3\|^2
=O\left(\frac{\|w\|^2}{\Delta^2}\right).
\]

This supplies the physical approximation behind the lossy projection of document 684.

## 3. What the gap selects

The gap suppresses:

- the third diagonal face;
- the four real Peirce-\(1/2\) link directions connecting it to the rank-two corner.

Those are five of the six directions discarded by the full selector.

It does **not** suppress the remaining direction:

\[
\begin{pmatrix}
0&i\\
-i&0
\end{pmatrix}
\in H_2(\mathbb C).
\]

This imaginary off-diagonal coordinate lies entirely inside the low-energy rank-two corner. Its removal requires:

- an antiunitary reciprocity symmetry;
- conjugation decoherence;
- an independent positive mass term;
- a boundary reality condition;
- or another physical involution.

## 4. Two-stage dynamical descent

The exact carrier ladder now has a plausible two-stage physical form:

\[
\boxed{
H_3(\mathbb C)
\xrightarrow{\Delta\gg E}
H_2(\mathbb C)
\xrightarrow{\text{real-structure selector}}
H_2(\mathbb R).
}
\]

The first arrow can be ordinary energetic decoupling. The second cannot be obtained from the same scalar gap because the unwanted direction shares the low-energy corner.

This matches the mathematical decomposition in document 684:

\[
6=5+1
\]

discarded directions, with five removed by Peirce decoupling and one by conjugation selection.

## 5. Standard-Model and Majorana caveat

A heavy third face is not automatically one heavy neutrino generation. The Peirce faces label observable carrier directions, and their physical relation to flavor generations must be derived.

Possible realizations include:

- a heavy sterile/Majorana response channel;
- a radial order-parameter mode;
- an inaccessible boundary port;
- a heavy Furey topology sector;
- a collective spectral channel rather than a particle.

Identifying \(\Delta\) with a measured mass without an operator map would be premature.

## 6. Stop-everything criteria

Stop using gap decoupling as the selector if:

1. the third face has low-energy spectral weight;
2. \(w/\Delta\) is not small in the claimed regime;
3. thresholds cross the heavy pole;
4. radiative corrections regenerate unsuppressed Peirce-\(1/2\) links;
5. the same gap is claimed to remove the imaginary \(H_2(\mathbb C)\) direction.

## 7. Next gates

1. Identify a Standard-Model or Furey operator that could be the heavy third face.
2. Derive \(\Delta\) and \(w\) from a Majorana/order-parameter action.
3. Quantify continuum rather than single-pole heavy-face decoupling.
4. Find the independent physical involution selecting the real slice.
5. Test radiative stability of the two-stage descent.

## Reproducibility

    node scripts\verify_gapped_third_face_converges_to_peirce_compression.mjs
