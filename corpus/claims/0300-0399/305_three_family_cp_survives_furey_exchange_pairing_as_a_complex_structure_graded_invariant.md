# Three-Family CP Survives Furey Exchange Pairing as a Complex-Structure-Graded Invariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact doubled three-family CP invariant under survivor exchange; embedding into the complete chiral gauge/Fock action remains open

## 1. Does exchange pairing force CP conservation?

The completed survivor carrier pairs arbitrary flavor data with their conjugates. For a Hermitian flavor observable \(H\), define

\[
\mathcal D(H)=
\begin{pmatrix}H&0\\0&\overline H\end{pmatrix}.
\]

The survivor antiunitary

\[
\Theta_{\rm ex}=(\sigma_x\otimes I_3)K
\]

fixes this doubled observable:

\[
\Theta_{\rm ex}\mathcal D(H)\Theta_{\rm ex}^{-1}
=\mathcal D(H).
\]

At first sight this looks like a real theory and therefore a threat to flavor CP. The conclusion depends on whether the retained complex structure is included in the observable data.

## 2. Ungraded CP traces cancel

Let

\[
C=[H_u,H_d].
\]

Then

\[
[\mathcal D(H_u),\mathcal D(H_d)]
=\begin{pmatrix}C&0\\0&\overline C\end{pmatrix}.
\]

For Hermitian \(H_u,H_d\), \(\operatorname{Tr}C^3\) is purely imaginary. Therefore

\[
\operatorname{Tr}
[\mathcal D(H_u),\mathcal D(H_d)]^3
=\operatorname{Tr}C^3+overline{\operatorname{Tr}C^3}
=0.
\]

An ungraded sum over the exchange pair hides the CP-odd signal exactly.

## 3. The exchange-invariant complex structure restores it

The doubled carrier retains

\[
\boxed{
\mathcal J=
\begin{pmatrix}iI_3&0\\0&-iI_3\end{pmatrix},
\qquad \mathcal J^2=-I_6.}
\]

Because \(\Theta_{\rm ex}\) is antiunitary, coefficient conjugation changes \(i\to-i\) while survivor exchange swaps the two blocks. The two signs cancel:

\[
\Theta_{\rm ex}\mathcal J\Theta_{\rm ex}^{-1}
=\mathcal J.
\]

The graded real invariant is

\[
\boxed{
-\frac12\operatorname{Tr}
\left(
\mathcal J
[\mathcal D(H_u),\mathcal D(H_d)]^3
\right)
=-i\operatorname{Tr}[H_u,H_d]^3.}
\]

It is nonzero whenever the ordinary Jarlskog-type invariant is nonzero.

## 4. Explicit checkpoint

For

\[
H_u=\operatorname{diag}(1,2,4),
\]

\[
H_d=
\begin{pmatrix}
10&1&-i\\
1&11&1\\
i&1&12
\end{pmatrix},
\]

one has

\[
\operatorname{Tr}[H_u,H_d]^3=36i.
\]

The ungraded doubled trace is zero, while

\[
-\frac12\operatorname{Tr}
\left(\mathcal J
[\mathcal D(H_u),\mathcal D(H_d)]^3\right)=36.
\]

Thus survivor exchange does not force the flavor matrices into a simultaneously real basis.

## 5. Physical interpretation

The doubled presentation behaves like a real or Nambu representation:

- the exchange pair makes the total carrier real;
- \(\mathcal J\) records which half carries the original complex orientation;
- ungraded exchange-even sums erase CP-odd signs;
- \(\mathcal J\)-graded observables recover them.

This is the same mechanism by which complex information survives realification. Here it is tied directly to the Furey survivor exchange rather than added as an unrelated six-dimensional structure.

## 6. Relation to the population-normal carrier

The external \(J_z\cong H_2(\mathbb R)\) carrier is exchange even. Its ordinary Gram response can therefore be CP blind while the internal flavor/Fock sector retains a nonzero graded invariant.

This is desirable if CP is internal rather than an external carrier coordinate. It also imposes a measurement requirement: physical CP-sensitive processes must couple to the retained complex structure or an equivalent exchange grading. If every admissible observable is ungraded, CP cancels operationally even though it remains encoded algebraically.

## 7. What remains open

The calculation does not yet prove that the full Standard Model on the Furey carrier has observed CP violation. One must still establish:

- the doubled Yukawa operator and chiral gauge generators obey the exchange symmetry;
- \(\mathcal J\) is preserved or covariantly transported by interactions and renormalization;
- CP-sensitive decay/scattering observables are represented by \(\mathcal J\)-graded insertions;
- the exchange-fixed CAR algebra contains one chiral generation rather than a vectorlike duplicate;
- anomaly cancellation and CKM/PMNS phenomenology survive the completion.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the full exchange-fixed Fock/Yukawa theory reproduces the measured Jarlskog invariant through the same \(\mathcal J\)-graded structure while retaining one chiral generation.

**Observable trigger:** a physical CP asymmetry is shown to insert \(\mathcal J\) or an equivalent exchange-odd grading automatically.

**CP falsifier:** all gauge-invariant observables in the exchange-fixed theory are ungraded and therefore cancel every CP-odd invariant.

**Reality falsifier:** exchange invariance is claimed to make each \(H_u,H_d\) individually real; it only pairs them with their conjugates.

**Doubling falsifier:** the conjugate survivor is an independent mirror generation rather than the real presentation of the same degrees of freedom.

## 9. Certificate

The [three-family CP/Furey-exchange certificate](../../../verification/verify/verify_three_family_cp_survives_furey_exchange_pairing.mjs) checks the explicit nonzero single-sector invariant, cancellation of the ungraded doubled trace, recovery by \(\mathcal J\), and exchange invariance of both the doubled flavor data and complex structure.

## Companion documents

- [Exchange-fixed positive survivor Gram](304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
- [Furey survivor exchange and population-normal real form](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [CP survives graded realification](../0200-0299/290_flavor_cp_survives_the_graded_real_parent_when_the_complex_structure_is_retained.md)
- [Dagger: antiparticles versus mirrors](../0100-0199/151_dagger_antiparticle_vs_mirror_distinction.md)
