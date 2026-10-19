# Furey (Cl(6)) Conjugate-Ideal Extension

**Date:** 16 October 2026  
**Branch:** B03 Furey interface  
**Claim status:** color/charge conjugate pair encoded; anti-linear and electroweak structure still open

## 1. Pairing the ideal with its conjugate

The first minimal ideal contains sectors

\[
\mathbf1_0\oplus\mathbf3_{1/3}
\oplus\overline{\mathbf3}_{2/3}\oplus\mathbf1_1.
\]

Its charge/color conjugate contains

\[
\mathbf1_0\oplus\overline{\mathbf3}_{-1/3}
\oplus\mathbf3_{-2/3}\oplus\mathbf1_{-1}.
\]

Together they form a sixteen-complex-state color/charge module. The encoded sector table is [the conjugate-pair JSON file](../../../evidence/data/furey_cl6_conjugate_pair_basis.json).

## 2. Complex-linear gauge commutant

Six charged irreducible sectors occur once. The neutral singlet occurs twice. Therefore

\[
\operatorname{End}_{SU(3)\times U(1)}
(\mathcal I\oplus\overline{\mathcal I})
\cong M_2(\mathbb C)\oplus\mathbb C^6,
\]

with complex dimension

\[
4+6=10.
\]

The neutral multiplicity permits mixing between the two neutral singlets. Color and charge alone do not fix that mixing.

## 3. Anti-linear conjugation changes the question

The physical conjugation relating the two ideals is anti-linear. Requiring an operator to commute with that real structure does not simply reproduce the complex-linear commutant above; it selects a real form and relates coefficients in conjugate sectors.

The next calculation must specify the exact involution—complex, octonionic and Hermitian conjugations must not be conflated—and then solve

\[
T\kappa=\kappa T.
\]

This is also where a possible compatibility with the external Jordan involution can be tested.

## 4. What this contributes to the interface

The conjugate pair supplies the first nontrivial place where an external real selector could lock to an internal real structure. A successful locking must:

- preserve electric charge assignments;
- map color triplets to the correct conjugates;
- retain the neutral degrees needed for neutrino structure;
- remain compatible with weak chirality after the electroweak layer is added.

## 5. Pin and unlock conditions

The anti-linear commutant is pinned until the precise Furey involution matrices are encoded.

- **Last established point:** complex-linear commutant dimension is 10.
- **Unlock condition:** explicit conjugation matrix/action on the sixteen-state basis.
- **Unsafe shortcut:** treating the two neutral singlets as freely mixable after imposing a reality condition.

## 6. Certificate

[`verification/verify/verify-furey-cl6-conjugate-pair.mjs`](../../../verification/verify/verify-furey-cl6-conjugate-pair.mjs) verifies 16 states, conjugate sector pairing, neutral multiplicity two and the dimension-10 complex-linear commutant.

## Companion documents

- [Minimal ideal encoding](60_furey_cl6_minimal_ideal_encoding.md)
- [Furey interface](54_furey_external_internal_interface_branch.md)
- [Anomaly gate](62_standard_model_anomaly_gate.md)
