# A One-Generation Yukawa Portal Locally Selects a Real Axis, but Higgs Zeros Are Defects

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B08 and B11  
**Claim status:** exact local two-face/TRO phase theorem for one Yukawa channel; global gauge-Higgs topology and multi-generation compatibility remain open

## 1. Reduced chiral portal

After the gauge-covariant Higgs dressing, one charged-lepton channel has a two-face mass block

\[
M_e=
\begin{pmatrix}
0&m_e\\
\bar m_e&0
\end{pmatrix},
\qquad
m_e=y_e h,
\]

where \(h\) is the relevant local Higgs component in a chosen gauge-covariant trivialization.

The block is Hermitian and gauge invariant as a complete operator, although the local phase assigned to \(m_e\) depends on the face frames.

## 2. Real-TRO condition

Choose antiunitary face structures

\[
J_L=e^{i\alpha}K,
\qquad
J_R=e^{i\beta}K.
\]

The portal condition

\[
J_Lm_e=m_eJ_R
\]

becomes

\[
m_e=e^{i(\alpha-\beta)}\bar m_e.
\]

For

\[
m_e=|m_e|e^{i\varphi},
\]

this is solved by

\[
\alpha-\beta=2\varphi\pmod{2\pi}.
\]

Thus every nonzero one-generation Yukawa portal locally selects a compatible real relationship axis.

## 3. Why this is not an extra CP prediction

For one isolated charged-lepton Yukawa coefficient, field rephasings can make \(y_e\) real and positive. Aligning \(J_L,J_R\) with \(m_e\) therefore does not predict a physical CP phase.

It states something narrower: the existing Yukawa portal can provide the local selector required by real Schur/Jordan closure.

## 4. Higgs zeros are selector defects

At

\[
m_e(x)=0,
\]

the phase \(\varphi\) is undefined, so the Yukawa portal no longer selects a real axis. Around a vortex or zero with winding \(n\),

\[
\Delta\varphi=2\pi n,
\qquad
\Delta(\alpha-\beta)=4\pi n.
\]

The real line returns to itself, but its lifted antiunitary phase carries nontrivial winding. Higgs zeros are therefore natural defects of the local real reduction.

This is structurally similar to the degree-eight celestial selector, but the base space and characteristic class are different. They must not be identified without a locking map.

## 5. Gauge covariance of the selector

Under face-frame phases

\[
\chi_L\mapsto e^{i\lambda_L}\chi_L,
\qquad
\chi_R\mapsto e^{i\lambda_R}\chi_R,
\]

the portal transforms as

\[
m_e\mapsto e^{i(\lambda_L-\lambda_R)}m_e.
\]

The compatible real structures transform by

\[
\alpha\mapsto\alpha+2\lambda_L,
\qquad
\beta\mapsto\beta+2\lambda_R,
\]

so the equation \(\alpha-\beta=2\arg m_e\) is frame covariant.

The selector is a rotating real subbundle, not a fixed coordinate convention.

## 6. Multi-generation obstruction

For a Yukawa matrix \(Y_e\), one would need antiunitary structures satisfying a matrix equation

\[
J_LY_e=Y_eJ_R.
\]

One matrix can be put into a real diagonal singular-value form. But the quark and neutrino sectors contain several noncommuting Yukawa matrices. A common antiunitary structure making all of them real would force CP-odd commutator invariants to vanish.

Therefore the selector must remain restricted to the two-face carrier or to one local channel; it cannot act as entrywise conjugation on the full flavor algebra.

## 7. Relation to the celestial selector

The Yukawa portal supplies a local phase selector on spacetime/Higgs configuration space. The null stress relationship requires a Chern-minus-eight transition over celestial momentum space. Connecting them would require a mixed position--momentum construction, Berry map or boundary transform.

The present theorem supplies the local real-intertwiner mechanism, not the base-space identification.

## 8. Stop-everything and falsification gates

**Local portal success:** the wall-localized Higgs/Yukawa term satisfies the real-TRO condition while preserving gauge covariance and the wall index.

**Defect matching:** a derived transform maps Higgs/Yukawa zeros to the required celestial selector defects with total index eight.

**Flavor success:** the carrier real structure remains in the commutant of complex CKM/PMNS flavor data.

**Falsifier:** one antiunitary structure is imposed on all Yukawa matrices and consequently kills known CP violation.

**Zero-mode gate:** analyze fermion modes bound to Higgs/selector defects rather than treating zeros as harmless coordinate failures.

## 9. Certificate

The [Yukawa real-selector certificate](../../../verification/verify/verify_yukawa_real_portal_selector.mjs) verifies the antiunitary phase equation for arbitrary nonzero complex mass, its covariance under independent face rephasings, loss of phase selection at zeros and incompatibility of a common real selector with an explicit CP-odd flavor pair.

## Companion documents

- [TRO real-portal theorem](222_tro_real_portal_intertwiner_theorem_and_gauge_obstruction.md)
- [Dressed charged-lepton response](../0100-0199/118_dressed_charged_lepton_h2_response.md)
- [Standard-Model block links](234_standard_model_block_wilson_links_preserve_wall_carrier_commutant.md)
- [Real carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
