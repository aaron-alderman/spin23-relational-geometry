# The static reader covariance does not analytically continue, but an orientation-odd pair spectrum retains a third direction

**Date:** 20 October 2026  
**Status:** exact finite-mode retarded response for the conditional localized reader; physical stress embedding remains open  
**Role:** advance A9/A11 from static Euclidean covariance to causal real-time response

## Result in one sentence

For the gapped charge-one reader conditionally localized in result 1292, the
static occupation covariance of result 1228 is a zero-frequency population term
and has no finite-frequency retarded commutator, but the same metric-strain vertex
contains particle--antiparticle pair terms with a positive KMS spectral measure at
\(\omega=2E\); an oriented holonomy leaves a nonzero direction normal to the
exchange-symmetric \(H_2(\mathbb R)\) plane in that pair spectrum, while CP still
forces \(h=1\) and \(h=2\) to coincide and orientation averaging erases it.

## 1. Everyday picture

Suppose a box contains runners occupying fixed lanes. Counting how the lane
populations fluctuate gives a static covariance. If no runner can change lanes,
that population count does not ring at a nonzero frequency: it is stored memory,
not an oscillating response.

The same apparatus can also create a runner--antirunner pair. That process has a
threshold: the drive must supply twice the single-runner energy. Its absorption
spectrum is a different part of the response, even though both measurements came
from the same strain gauge.

This distinction is what analytic continuation exposes. A number in the static
Euclidean calculation is not automatically a finite-frequency signal.

## 2. Controlled effective reader

Result 1292 supplies, conditionally, one even localized complex boson of residual
\(\mathbb Z_3\) charge one. Retain only that normalizable transverse mode and put
its \(2+1\)-dimensional effective field on the square spatial torus used in result
1228. For an \(x\)-cycle holonomy

\[
\theta_h={2\pi h\over3},\qquad h=0,1,2,
\]

the regulated mode energies are

\[
E_{n_xn_y}(h)^2=M^2+K_x+K_y,
\]

with

\[
K_x=4\sin^2\!\left({2\pi n_x+\theta_h\over2N}\right),
\qquad
K_y=4\sin^2\!\left({2\pi n_y\over2N}\right).
\]

Each Fourier coefficient is a complex harmonic oscillator \(z_k\). The two probe
vertices are normalized as

\[
O_a=2\sum_k K_a(k)|z_k|^2,
\qquad a=x,y.
\]

This normalization makes the occupation carried by one particle equal to the
result-1228 weight \(Q_a=K_a/E_k\). The operator is the spatial-gradient part of
an integrated metric-strain vertex. It is not yet the complete, improved and
renormalized physical stress tensor.

## 3. Why the static term has no finite-frequency pole

For one mode,

\[
z_k(t)={1\over\sqrt{2E_k}}
\left(a_ke^{-iE_kt}+b_k^\dagger e^{iE_kt}\right).
\]

Consequently the strain vertex separates into

\[
O_a(t)={K_a\over E_k}\left[
a_k^\dagger a_k+b_k^\dagger b_k+1
+a_kb_ke^{-2iE_kt}+a_k^\dagger b_k^\dagger e^{2iE_kt}
\right],
\]

summed over modes. The first line of physics is diagonal in occupation number. Its
thermal covariance is

\[
C^{\rm occ}_{ab}(h)
={2\beta\over N^2}\sum_k
n_B(E_k)[1+n_B(E_k)]{K_aK_b\over E_k^2},
\]

exactly the positive static matrix calculated in result 1228.

But this diagonal operator commutes with the free Hamiltonian. Therefore its
retarded commutator vanishes away from zero frequency. In an isolated Gaussian
model it contributes a zero-frequency population fluctuation to the symmetrized
correlator, not an absorption line. Interactions could broaden it into a central
relaxation peak, but the width and weight would then depend on a collision model
not present here.

Thus:

\[
\boxed{C^{\rm occ}\text{ does not by itself analytically continue to the desired
finite-frequency retarded response.}}
\]

## 4. Exact retarded pair response

The remaining terms create and annihilate a particle--antiparticle pair. With

\[
\chi^R_{ab}(t)=-i\Theta(t)\langle[O_a(t),O_b(0)]\rangle,
\]

the controlled finite-mode result is

\[
\boxed{
\chi^R_{ab}(z)=\sum_k A_{ab}(k)
\left[{1\over z-2E_k}-{1\over z+2E_k}\right],
}
\]

where \({\rm Im}\,z>0\) and

\[
A_{ab}(k)={K_aK_b\over E_k^2}
\coth\!\left({\beta E_k\over2}\right).
\]

Using \(\rho=-2\,\mathrm{Im}\,\chi^R\),

\[
\rho_{ab}(\omega)=2\pi\sum_k A_{ab}(k)
\left[\delta(\omega-2E_k)-\delta(\omega+2E_k)\right].
\]

Every positive-frequency atom is an outer product of the real vector
\((K_x,K_y)\) with itself, multiplied by a positive number. Hence

\[
z^T\rho(\omega>0)z\ge0
\]

as a matrix-valued measure.

## 5. Causality, KMS and Ward-compatible checks

The exact response has the required elementary consistency properties:

1. All poles lie below the real boundary of the retarded sheet, so \(\chi^R\) is
   analytic in the upper half-plane.
2. Hermiticity gives
   \(\rho(-\omega)=-\rho(\omega)^T\).
3. The positive-frequency spectral atoms are positive semidefinite.
4. Thermal Wightman functions obey

   \[
   G^>_{ab}(\omega)={\rho_{ab}(\omega)\over1-e^{-\beta\omega}},
   \qquad
   G^<_{ab}(\omega)=e^{-\beta\omega}G^>_{ab}(\omega).
   \]

5. The \(1/z\) terms from the positive and negative poles cancel, so
   \(\chi^R(z)=O(z^{-2})\), as required for this equal-time quadratic vertex.

These are Ward-compatible checks, not closure of the physical stress Ward
identity. A complete stress calculation must include the temporal, mass and
improvement pieces, the variation of \(\sqrt\gamma\), local contact terms, and the
bulk/defect displacement operator. The spectral discontinuity is useful because
local real contact polynomials do not manufacture its positive-frequency atoms,
but it cannot identify the toy vertex with the full physical stress by itself.

## 6. Holonomy-even and CP-odd parts

Let \(R_h\) denote either a spectral bin or an integrated positive-frequency pair
weight. Define

\[
\Delta_{\rm even}={R_1+R_2\over2}-R_0,
\qquad
\Delta_{\rm CP-odd}={R_1-R_2\over2}.
\]

Momentum reversal relabels the \(h=1\) spectrum into the \(h=2\) spectrum. The
verifier finds a relative discrepancy of only

\[
4.23\times10^{-16},
\]

so

\[
\boxed{\Delta_{\rm CP-odd}=0}
\]

in the CP-even toy. The holonomy-even integrated difference is nonzero, with
Frobenius norm \(0.14845\) in the unnormalized finite-mode convention. This is a
holonomy readout, but not an orientation-sign readout between \(h=1\) and \(h=2\).

## 7. Orientation-odd third direction

Keep the laboratory probes fixed and compare a holonomy prepared around the
\(x\) cycle with the otherwise identical preparation around the \(y\) cycle.
Let \(P\) exchange the two probe axes. Then

\[
R_y=PR_xP,
\]

and

\[
R_{\rm orient,+}={R_x+R_y\over2},
\qquad
R_{\rm orient,-}={R_x-R_y\over2}.
\]

The even matrix lies in the exchange-symmetric plane
\(R_{xx}=R_{yy}\). The odd matrix has the form

\[
R_{\rm orient,-}=d
\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]

which is normal to that plane in \(H_2(\mathbb R)\). For the declared fixture, the
integrated positive-frequency result is

\[
R_{\rm orient,-}=
\begin{pmatrix}
-0.0527322&0\\
0&0.0527322
\end{pmatrix},
\]

with relative norm

\[
{\|R_{\rm orient,-}\|\over\|R_{\rm orient,+}\|}
=1.0320\times10^{-3}.
\]

This is nonzero without an anisotropic local kinetic coefficient. It is odd under
exchange of the prepared cycle, not under CP. Equal orientation averaging sets it
to zero exactly.

Therefore analytic continuation gives a two-part verdict:

\[
\boxed{
\begin{array}{l}
\text{the static population third direction is not preserved as a finite-frequency pole;}\\
\text{an independent pair-spectrum third direction survives if orientation is retained.}
\end{array}}
\]

## 8. Thresholds are a discriminating prediction of the toy

The certificate uses

\[
N=6,\qquad M=0.8,\qquad\beta=1.3.
\]

In the trivial sector the kinematic two-particle threshold is \(2M=1.6\), but the
zero-momentum strain vertex vanishes. The first stress-visible atom is therefore

\[
\omega_{0,\rm visible}=2.56125.
\]

For \(h=1\) or \(2\), the shifted lowest mode already has nonzero \(K_x\), giving

\[
\omega_{1,2,\rm visible}=1.74426.
\]

Thus the toy predicts not merely a changed matrix amplitude but a lower
holonomy-dependent onset in this probe channel. Exact finite-volume delta peaks
should be convolved only with a preregistered instrumental resolution. The
certificate does not use Lorentzian broadening to prove positivity.

## 9. Exact relation to a physical stress experiment

The calculation supplies three useful objects for a future experiment:

- a causal matrix susceptibility for two explicitly defined strain vertices;
- a positive absorption measure with exact thresholds and KMS weights;
- an orientation reversal control that must flip the transverse component while
  leaving the exchange-even component unchanged.

To become a physical stress prediction, the programme must still derive:

1. the compact oriented cycle and its preparation from the defect geometry;
2. the map from laboratory sources to the complete conserved/improved defect
   stress tensor;
3. source normalization and all sector-independent contact terms;
4. coupling to the bulk stress and the displacement-operator Ward identity;
5. reader damping, lifetime and interactions, which replace delta peaks by a
   calculated lineshape;
6. the embedding of the toy exchange plane into the physical \(G_2,G_0\) plane;
7. a coefficient and effect size derived without fitting the desired third
   direction.

Result 1292 supplies a conditional origin for the gapped localized reader, but
none of these remaining inputs follows from localization alone.

## 10. A9/A11 verdict

The real-time calculation closes a conceptual loophole and opens a sharper test.
Static positivity was not enough: its population covariance is invisible to the
nonzero-frequency retarded commutator of the free model. Nevertheless, the full
quadratic strain vertex has a causal positive pair spectrum, and the oriented
holonomy produces a calculable transverse component and shifted threshold.

This advances A11 from “a static covariance might tilt” to the conditional claim:

\[
\boxed{
\text{look for a holonomy-dependent pair threshold and an orientation-reversing
spectral component.}}
\]

Failure of those features would falsify this Gaussian reader realization once its
mass, geometry and probe map are fixed. Their observation would advance the
reader mechanism beyond ambient geometry, but would not by itself establish
Spin(2,3), because the oriented cycle and full physical stress embedding remain
underived. Physical admission remains false.

## Artifacts

- `evidence/data/spin23-a11-realtime-charged-reader-response.json`
- `verification/verify/verify_spin23_a11_realtime_charged_reader_response.mjs`
- `corpus/claims/1200-1299/1228_a_gapped_charge_one_scalar_reads_flat_z3_holonomy_through_stress_but_the_third_direction_requires_an_oriented_cycle_and_probe_embedding.md`
- `corpus/claims/1200-1299/1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md`

