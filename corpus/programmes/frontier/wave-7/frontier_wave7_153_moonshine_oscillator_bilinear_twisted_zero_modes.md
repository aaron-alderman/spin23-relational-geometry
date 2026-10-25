# Frontier Wave 7.153: All 300 Oscillator-Bilinear Zero Modes

**Date:** 25 October 2026

**Status:** exact 300-operator family with anomaly and unit normalization; cross-sector transpose remains open

**Evidence:** [oscillator-bilinear zero modes](../../../../evidence/data/moonshine-oscillator-bilinear-twisted-zero-modes-v1.json)

**Certificate:** [executable verifier](../../../../verification/verify/verify_moonshine_oscillator_bilinear_twisted_zero_modes.mjs)

## Result

The other 300 untwisted weight-two states are the symmetric oscillator
bilinears \(h(-1)k(-1)\mathbf1\). On the inversion-twisted first-excited
sector their exact zero mode is

\[
 B_{h,k}={1\over2}\left(hk^\flat+kh^\flat\right)
          +{(h,k)\over8}I_{24},
\]

tensored with the identity on the 4096-dimensional twisted ground module.
The first term comes from contracting the \(\pm1/2\) oscillators. The second
is essential: it is the polarization of the inversion-twisted vacuum anomaly
\(24/16=3/2\).

In the explicit Gram basis the verifier compiles the integral numerators

\[
 8B_{ij}=4\left(e_i e_j^TK+e_j e_i^TK\right)+K_{ij}I
\]

for all 300 pairs. Every map is self-adjoint in the \(K\) metric, and all 600
covariance identities for the two sourced Leech generators pass.

## The normalization closes exactly

For an orthonormal frame \(\{u_a\}\),

\[
 \omega={1\over2}\sum_{a=1}^{24}u_a(-1)^2\mathbf1.
\]

The compiled maps give

\[
 o(\omega)=2I_{98304},\qquad o(\omega/2)=I_{98304}.
\]

Thus the cylinder Hamiltonian and the Griess unit agree on the complete
twisted weight-two sector. Omitting the anomaly would incorrectly return only
the excitation energy \(1/2\), losing the ground contribution \(3/2\).

## Two commissioning spectra

For a unit vector \(u\), the diagonal state \(u(-1)^2\mathbf1\) has channel
spectrum \(9/8\) once and \(1/8\) twenty-three times. On the full carrier,

\[
 \operatorname{Tr}B_{u,u}=16384,\qquad
 \operatorname{Tr}B_{u,u}^2=6656.
\]

For orthonormal \(u\perp v\), the off-diagonal state has channel spectrum
\(1/2,-1/2,0^{\times22}\), giving

\[
 \operatorname{Tr}B_{u,v}=0,\qquad
 \operatorname{Tr}B_{u,v}^2=2048.
\]

Together with Wave 7.152, this completes the source-normalized action of the
entire 98580-dimensional untwisted weight-two sector on the 98304-dimensional
twisted sector: 300 oscillator bilinears plus 98280 minimal-vector pairs.
The maps are supplied parametrically; only 24 minimal-vector seeds are yet
materialized as explicit hardware labels.

## Next exact gate

Invariant-form adjointness gives

\[
 \langle u,t_1\circ t_2\rangle_U
 =\langle o(u)t_1,t_2\rangle_T.
\]

The remaining task is therefore no longer to guess the cross-sector product.
[Wave 7.154](frontier_wave7_154_moonshine_cross_sector_griess_product_oracle.md)
chooses and verifies the invariant-form normalizations and transposes the
compiled action into \(T\times T\to U\). Laboratory tomography and held-out
Norton--Sakuma closures remain open.

## Sources and corpus links

- Bakalov and Kac, [*Twisted Modules over Lattice Vertex Algebras*](https://arxiv.org/abs/math/0402315).
- Yamauchi, [Leech twisted-module construction, Section 6.2](https://www.math.twcu.ac.jp/~yamauchi/math/phd/myphd.pdf).
- [Minimal-vector zero modes](frontier_wave7_152_moonshine_minimal_vector_twisted_weight2_zero_mode.md)
- [Universal cross-sector OPE calibration](frontier_wave7_148_2b_graded_cross_sector_ope_calibration.md)
- [Full cross-sector Griess product oracle](frontier_wave7_154_moonshine_cross_sector_griess_product_oracle.md)
