# Ne-21 and Xe-129 Can Span Nucleon Space but Form a Fragile Flavor Tomograph

**Date:** 23 October 2026

**Status:** exact response-rank calculation with nuclear-model qualification

**Depends on:** [the single-projection correction](1730_the_xu_neutron_and_proton_curves_are_one_nuclear_projection_not_two_measurements.md)

**Evidence:** [two-isotope ledger](../../../evidence/data/spin23-two-isotope-nucleon-tomography-v1.json) and [verifier](../../../verification/verify/verify_spin23_two_isotope_nucleon_tomography.mjs)

## Two-target response

A second nuclear target can break the proton/neutron cancellation only if its
spin-fraction ratio differs from that of \(^{21}\mathrm{Ne}\).  The 2022
spin-amplifier experiment used \(^{129}\mathrm{Xe}\).  Selecting the detailed
shell-model row \((\eta_n,\eta_p)=(0.658,0.020)\) for xenon and the Xu values
\((0.58,0.04)\) for neon gives

\[
\begin{pmatrix}
0.58&0.04\\
0.658&0.020
\end{pmatrix}
\begin{pmatrix}c_n\\c_p\end{pmatrix}.
\]

The determinant is \(-0.01472\), so the response has rank two: in principle
the two isotopes can separate \(c_n\) and \(c_p\).

## Conditioning boundary

The two response directions are separated by only

\[
\boxed{2.204^\circ}.
\]

Their singular values are 0.87811 and 0.016763, giving

\[
\boxed{\kappa=52.38}.
\]

Thus uncertainty in the weak orthogonal direction is amplified by roughly a
factor of 52 before accounting for unequal experimental sensitivity.  The
small xenon proton fraction is also nuclear-model dependent; the nuclear-spin
review explicitly warns that non-valence proton fractions in heavy odd-neutron
nuclei are not robustly predicted by semi-empirical models.

## Quark-level result

The corresponding two light-quark rows are

\[
(-0.21144,\ 0.48300,\ -0.028396)
\]

for neon and

\[
(-0.261752,\ 0.558716,\ -0.0310524)
\]

for xenon.  They retain the exact quark-level kernel proportional to
\((1,1,9.56332)\).  Two isotope targets can at most recover the two nucleon
coefficients; they cannot determine all three light-quark coefficients.

## Present limitation

The 2022 xenon result publishes an electron-neutron curve under a
one-coupling convention.  A defensible joint inversion needs a common-mass
numerical likelihood or response table reinterpreted with both xenon spin
fractions and their nuclear-theory covariance.  Without those inputs, combining
the plotted exclusion curves as independent bounds would conceal both coherent
cancellation and the large condition number.

The experiment-design lesson is sharper than merely “use another isotope”:
choose targets with widely separated \(\eta_p/\eta_n\), and publish the joint
response rather than only one-coupling exclusion curves.

## Sources

- Y. Wang *et al.*, [*Limits on axions and axionlike particles within the axion window using a spin-based amplifier*](https://arxiv.org/abs/2201.11847).
- D. F. Jackson Kimball, [*Nuclear spin content and constraints on exotic spin-dependent couplings*](https://arxiv.org/abs/1407.2671).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_two_isotope_nucleon_tomography.mjs
~~~
