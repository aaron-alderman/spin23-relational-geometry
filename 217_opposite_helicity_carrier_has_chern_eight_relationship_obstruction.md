# An Opposite-Helicity Carrier Has a Chern-Eight Relationship Obstruction

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07, B09 and B11  
**Claim status:** exact bundle calculation; physical identification of Jordan faces with stress helicities remains conditional

> **Scope:** this construction requires an actual null helicity pair. It is not the generic topology of a timelike stress spectral channel; see [the scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md).

## 1. Conditional construction

Assume the two carrier faces are identified with the null stress helicity lines

\[
L_+,
\qquad
L_-,
\qquad
c_1(L_+)=4u,
\qquad
c_1(L_-)=-4u,
\]

over the celestial sphere. Let

\[
E=L_+\oplus L_-.
\]

A positive Hermitian response is a section of \(\operatorname{Herm}(E)\), locally written

\[
R=
\begin{pmatrix}
a&z\\
\bar z&b
\end{pmatrix}.
\]

## 2. Diagonal faces are globally scalar

The diagonal entries lie in

\[
L_+\otimes L_+^*
\cong\mathbf1,
\qquad
L_-\otimes L_-^*
\cong\mathbf1.
\]

Thus \(a\) and \(b\) are ordinary global real functions. The individual face intensities descend without choosing polarization phases.

## 3. The relationship line has Chern number eight

The off-diagonal entry lies in

\[
\mathcal R
=\operatorname{Hom}(L_-,L_+)
=L_+\otimes L_-^*.
\]

Therefore

\[
c_1(\mathcal R)
=c_1(L_+)-c_1(L_-)
=8u.
\]

If the helicity transition functions are

\[
g_+(\phi)=e^{i4\phi},
\qquad
g_-(\phi)=e^{-i4\phi},
\]

then

\[
z\longmapsto g_+zg_-^{-1}=e^{i8\phi}z.
\]

The relationship coordinate is twice as twisted as either face.

## 4. Why a global \(H_2(\mathbb R)\) slice fails

Locally, one could demand \(z\in\mathbb R\) and identify \(R\) with \(H_2(\mathbb R)\). But the transition factor \(e^{i8\phi}\) does not preserve the real axis for generic \(\phi\).

More invariantly, a global real line subbundle of the underlying oriented real plane \(\mathcal R_\mathbb R\) would be trivial on \(S^2\), because every real line bundle over \(S^2\) is trivial. It would therefore supply a nowhere-zero section, contradicting

\[
e(\mathcal R_\mathbb R)=c_1(\mathcal R)=8u\ne0.
\]

Hence the opposite-helicity construction does **not** admit a globally fixed componentwise-real \(H_2(\mathbb R)\) carrier without extra data.

## 5. What remains globally well-defined

Although \(z\) is twisted, its norm is scalar:

\[
|z|^2\in
\mathcal R\otimes\mathcal R^*
\cong\mathbf1.
\]

Therefore

\[
\operatorname{tr}R=a+b,
\qquad
\det R=ab-|z|^2
\]

are global. Positivity,

\[
a\ge0,
\qquad b\ge0,
\qquad ab\ge|z|^2,
\]

is also globally meaningful.

This gives a precise version of “the norm keeps the local descriptions consistent”: Jordan determinant data can descend even when no global matrix-coordinate trivialization exists.

## 6. Possible escapes

There are four clean options:

1. **Remain complex and twisted:** use the Hermitian endomorphism bundle rather than a fixed \(H_2(\mathbb R)\).
2. **Add a compensator:** tensor \(z\) with a field in a line of Chern number \(-8\).
3. **Use only invariants:** retain \(a,b,|z|^2\), losing the relationship phase and orientation.
4. **Restrict the base:** on a contractible momentum patch, choose a local real slice, with transition data retained on overlaps.

A globally nonzero standalone compensator section cannot exist in a nontrivial Chern-
\(-8\) line; cancellation must occur through a genuine paired bundle or dynamical defect structure.

## 7. Relation to the earlier real-carrier obstruction

The earlier Hopf-phase analysis found that helicity phase does not automatically descend to a global real two-face carrier. The present calculation quantifies the obstruction:

\[
\boxed{c_1(\text{relationship line})=8.}
\]

It also explains why the combined opposite-helicity bundle may be trivial while its chosen face decomposition and coherence remain topologically nontrivial.

## 8. Stop-everything and falsification gates

**Compensator success:** a canonical internal/Furey line bundle has Chern number \(-8\) and couples so that the product relationship is globally real.

**Norm-first success:** the physical theory depends only on trace and determinant, making the twisted local carrier sufficient and global coordinates unnecessary.

**Real-carrier falsifier:** a proposed global identification sets \(z\) real in every helicity patch without a compensating transition law.

**Observable phase success:** polarization transport measures the Chern-eight relationship holonomy rather than only \(|z|\).

**Spin(2,3) gate:** determine whether the conformal/Jordan group acts on this twisted bundle globally or only on each local trivialization.

## 9. Certificate

The [opposite-helicity relationship certificate](scripts/verify_opposite_helicity_relationship_chern8.mjs) verifies the winding-eight transition, failure of a fixed real slice and invariance of trace, determinant and positivity under patch transformations.

## Companion documents

- [Massive/null Ward-bundle topology](216_massive_ward_bundle_trivial_null_spin2_bundle_chern_four.md)
- [Helicity Hopf bundle obstruction](122_helicity_hopf_bundle_real_carrier_obstruction.md)
- [Hopf phase descent](123_hopf_phase_descent_and_carrier_correction.md)
- [Real-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
