# The Full \(M_3\) Response Supplies Two Heavy Channels but Not Their Alignment

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact gauge/exchange mode inventory and tuned conformal completion; source enforcement of degeneracy and residues remains open

## 1. Why the Peirce corner was too small

The neutral Peirce corner keeps the \(E,D\) faces of the completed linking factor

\[
M_3(\mathbb C)_{(E,C,D)}
\]

and omits the charged-lepton source face \(C\). Its paired response had only one exchange-even heavy neutral mode, insufficient for a positive Lorentz-conformal rank-two residue.

The full linking response contains one additional gauge-neutral observable:

\[
p_C,
\]

the diagonal population of the \(C\) face. Although off-diagonal \(E\)-\(C\) and \(D\)-\(C\) coherences are hypercharged, a diagonal face population is gauge invariant.

## 2. Gauge-neutral dimension count

For one Hermitian \(M_3(\mathbb C)\) response, the gauge-neutral subspace consists of:

- three real diagonal populations \(p_E,p_C,p_D\);
- the real and imaginary parts of the neutral \(E\)-\(D\) coherence.

Thus

\[
\dim_{\mathbb R}\mathcal R_{\rm neutral}=5.
\]

For the paired survivors:

\[
\dim_{\mathbb R}\mathcal R_{\rm neutral}^{A\oplus B}=10.
\]

Exchange parity splits this into

\[
5_+\oplus5_-.
\]

The even sector contains:

- the three desired diagonal \(H_2(\mathbb R)\) modes on \(E,D\);
- the diagonal \(C\)-population combination;
- the imaginary anti-diagonal \(E\)-\(D\) coherence.

Therefore

\[
\boxed{\dim(\text{exchange-even heavy neutral})=2.}
\]

This is exactly the minimum channel count required by the positive-residue theorem.

## 3. Compression gap and selector gap

Add a positive Peirce-compression penalty \(\rho\) for the omitted \(C\)-face population. In the quadratic normalization used by the certificate:

\[
m_C^2=\rho.
\]

The imaginary anti-diagonal Peirce mode has

\[
m_{\rm Im-}^2=2\mu.
\]

Generic coefficients give

\[
\rho\ne2\mu,
\]

so the two exchange-even heavy poles are split.

Exact degeneracy requires

\[
\boxed{\rho=2\mu.}
\]

Nothing in gauge neutrality or exchange symmetry alone imposes this relation.

## 4. Coupling alignment

Even at equal mass, the two light-coupling vectors must have the special form

\[
v_1=(1,n_1,n_2),
\qquad
v_2=(0,-n_2,n_1),
\qquad
n_1^2+n_2^2=1,
\]

up to scale and Lorentz-coordinate changes. Then

\[
v_1v_1^T+v_2v_2^T
\]

is positive and Lorentz conformal.

The full \(M_3\) response supplies the required **capacity**, but not yet:

- the mass degeneracy;
- the coupling-vector alignment;
- the common normalization;
- radiative protection.

## 5. Two possible interpretations

### Accidental/tuned completion

Choose \(\rho=2\mu\) and tune the two portal vectors. This proves compatibility but adds parameters and has little explanatory value.

### Source multiplet

Find a symmetry of the full linking/Jordan dynamics rotating the \(C\)-population mode into the imaginary anti-diagonal mode and simultaneously rotating their coupling residues. Such a symmetry would force both degeneracy and alignment.

The second would be a stop-everything result because the omitted linking direction would become necessary for exact \(Spin(2,3)\)-carrier closure.

## 6. Tension with response conjugation

Response conjugation forbids the imaginary-mode mixing but leaves the real \(C\)-population mixing allowed. Thus imposing conjugation alone does not make the full \(M_3\) response harmless; the Peirce compression must also decouple \(p_C\), or a stronger grading must distinguish the light corner from the complement.

The two protection architectures are now:

1. exact Peirce compression plus response conjugation;
2. a full-\(M_3\) degenerate aligned multiplet.

## 7. Stop-everything and falsification gates

**Multiplet trigger:** a source-native full-linking symmetry enforces \(\rho=2\mu\) and the conformal residue pair.

**Peirce trigger:** a conditional expectation or superselection rule exactly removes \(p_C\), leaving response conjugation to protect the remaining corner.

**Radiative trigger:** the degeneracy is stable under gauge and Yukawa corrections despite the different origins of the two modes.

**Falsifier:** channel count alone is presented as symmetry restoration while the gaps or coupling vectors remain arbitrary.

## 8. Certificate

The [full-\(M_3\) neutral heavy-multiplet certificate](../../../verification/verify/verify_full_m3_neutral_heavy_multiplet.mjs) counts the neutral exchange sectors, verifies the three-dimensional light kernel after Peirce compression, identifies the two heavy even gaps and confirms that tuned degeneracy plus aligned residues can realize the positive conformal solution.

## Companion documents

- [Positive multi-residue alignment](258_lorentz_symmetric_positive_schur_residue_requires_aligned_degenerate_multiplet.md)
- [Neutrino Peirce carrier](../0100-0199/168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Peirce selector locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Rank-one determinant no-go](257_any_nonzero_rank_one_selector_schur_correction_breaks_lorentz_determinant_symmetry.md)
