# Diagonal Peirce Locking Cannot Be Lifted Entrywise to Full Matter

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact degree-of-freedom and flavor-CP obstruction; factor-local response locking remains viable

## 1. The tempting full lift

The neutral-corner selector used two conditions:

\[
X_B=\bar X_A
\]

from exchange antiunitarity, and

\[
X_A=X_B
\]

from diagonal locking. Their intersection gives \(H_2(\mathbb R)\).

It is tempting to impose the same conditions on the complete paired Furey matter carriers. That fails.

## 2. Exchange reality has the correct size

For a sixteen-complex-dimensional generation, the paired ambient carrier

\[
\mathbb C^{16}_A\oplus\mathbb C^{16}_B
\]

has real dimension 64. Exchange reality

\[
v_B=\bar v_A
\]

leaves real dimension 32, exactly the real dimension of one complex sixteen-state generation.

Thus exchange antiunitarity alone need not double matter.

## 3. Diagonal gluing over-reduces charged matter

Adding

\[
v_A=v_B
\]

gives

\[
v_A=\bar v_A.
\]

The intersection has real dimension only 16. It is a real form of the generation, not one complex chiral generation.

Charged Weyl representations cannot generally be replaced by real vectors in this manner. The operation would impose a Majorana-like reality condition where gauge charges require complex representations.

Therefore the diagonal gluing that is healthy for a gauge-neutral response corner cannot be imposed entrywise on the full matter module.

## 4. Flavor CP obstruction

For paired three-generation flavor data, exchange reality allows

\[
(H_u,H_d)_B=(\bar H_u,\bar H_d)_A.
\]

The two survivors carry equal and opposite CP-odd invariants:

\[
J_B=-J_A,
\]

while one oriented survivor can retain \(J_A\neq0\).

Diagonal gluing additionally requires

\[
H_f=\bar H_f.
\]

Then \(H_u,H_d\) are simultaneously real, their commutator is a real antisymmetric \(3\times3\) matrix, and

\[
\boxed{
\det[H_u,H_d]=0.}
\]

The certificate applies the gluing to an explicit complex positive Hermitian pair with nonzero invariant and shows that the real projection kills it.

## 5. Correct scope of the selector

The viable architecture is factor-local:

\[
\left[
H_2(\mathbb C)_A\oplus H_2(\mathbb C)_B
\right]_{\rm neutral\ response}
\longrightarrow
H_2(\mathbb R),
\]

while matter and flavor remain in a complex factor or in the exchange-paired representation:

\[
\mathbb R^2_{\rm face}
\otimes_{\mathbb R}
\mathbb C^3_{\rm flavor}.
\]

The locking may select a real external/neutral response without becoming a universal CP symmetry.

## 6. Higgs-cycle consequence

At one generation, individual Yukawa phases can often be removed by field rephasings, so an entrywise-real toy may look harmless. The obstruction becomes physical at three generations.

Any lift claimed to preserve all four Higgs cycles must therefore distinguish:

- real locking of the neutral face response;
- complex Yukawa coefficient matrices in the flavor commutant;
- antiunitary exchange pairing of survivor coefficients;
- physical polarization selecting one CP orientation.

One operator acting as ordinary conjugation on all four layers cannot satisfy these requirements.

## 7. Branch decision

The full entrywise lift is falsified.

The positive selector from the previous cycle remains viable only as:

1. an emergent neutral-response compression;
2. a bosonic Peirce-corner locking;
3. a factor-local real structure commuting with complex flavor.

The matter CAR and Higgs sectors require a different, complex-compatible implementation.

## 8. Stop-everything and falsification gates

**Factorization trigger:** a full action derives neutral response locking while proving that the locking operator lies in the commutant of matter/flavor coefficients.

**Polarization trigger:** one survivor CP orientation is selected dynamically without reintroducing an independent mirror generation.

**Higgs trigger:** all four Yukawa maps descend through the factor-local compression with a nonzero Jarlskog invariant.

**Falsifier:** diagonal exchange gluing is imposed on charged matter or flavor matrices and nevertheless claimed to preserve one complex chiral generation and observed CP.

## 9. Certificate

The [full-TRO diagonal-locking obstruction certificate](../../../verification/verify/verify_full_tro_diagonal_locking_cp_obstruction.mjs) counts the paired, exchange-fixed and diagonal-intersection dimensions, evaluates an explicit nonzero CP invariant on an exchange pair and verifies its vanishing after entrywise-real diagonal projection.

## Companion documents

- [Positive Peirce selector locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Exchange restriction and diagonal gluing](252_survivor_exchange_pairs_neutrino_corners_but_needs_diagonal_gluing_for_h2r.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Exchange-paired Yukawa CP orientation](../0100-0199/164_exchange_paired_yukawas_and_cp_orientation_gate.md)
