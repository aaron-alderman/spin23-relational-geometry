# Full Rank in the Upper Half-Plane Does Not Guarantee Full-Rank Boundary Absorption

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B07, B08 and B11  
**Claim status:** exact finite-spectral rank theorem and resolution audit; physical channel overlap remains open  
**Certificate:** [analyze_spectral_resolution_rank_of_two_face_response.mjs](../../../verification/analyze/analyze_spectral_resolution_rank_of_two_face_response.mjs)

## Executive result

Two non-collinear exchange rays at distinct spectral thresholds produce a strictly positive two-face Herglotz matrix everywhere in the open upper half-plane. They do **not** automatically produce a full-rank absorptive matrix at every real frequency.

For rank-one exchange residues

\[
R(\theta)=
\begin{pmatrix}
1&e^{i\theta}\\
e^{-i\theta}&1
\end{pmatrix},
\]

and positive Poisson weights \(a_j(x,y)\),

\[
Y(x+iy)=\sum_j a_j(x,y)R(\theta_j)
\]

obeys

\[
\boxed{
\det Y
=2\sum_{j<k}a_ja_k
\bigl[1-\cos(\theta_j-\theta_k)\bigr].
}
\]

Thus \(Y>0\) precisely when at least two positive non-collinear rays contribute. But near an isolated rank-one pole, the condition number diverges as \(y\to0^+\). The apparent interiority can be entirely due to finite spectral resolution.

## 1. Exact rank criterion

For two channels of weights \(a,b>0\) and relative phase \(\delta\),

\[
\det Y=2ab(1-\cos\delta).
\]

Therefore:

- \(\delta=0\) gives rank one for all weights and all frequencies;
- \(\delta\ne0\pmod{2\pi}\) gives full rank whenever both weights are positive;
- gauge invariance and exchange equality of diagonal populations do not determine \(\delta\).

This is the spectral version of the two-channel theorem in [document 628](628_gauge_invariant_two_face_sources_form_five_h2r_multiplets_but_one_redundant_image_is_null.md).

## 2. Separated-threshold example

Take atoms at

\[
s_1=0,
\qquad s_2=3,
\qquad \theta_2-\theta_1=\frac\pi2,
\]

with

\[
a_j(x,y)=\frac{y}{(s_j-x)^2+y^2}.
\]

At every \(y>0\), both weights are positive and \(Y(x+iy)\) has rank two. Evaluating at \(x=s_1\), however,

\[
a_1\sim\frac1y,
\qquad
a_2\sim\frac y9.
\]

The first ray dominates and the normalized determinant tends to zero. The certificate finds a rapidly diverging condition number as \(y\) decreases.

In distributional boundary language, the residue at \(s_1\) is still rank one. The remote second atom does not create simultaneous local absorption there.

## 3. Three distinct notions of interiority

The programme must distinguish:

1. **analytic interiority:** \(Y(z)>0\) for \(\operatorname{Im}z>0\);
2. **finite-resolution interiority:** a detector linewidth or Euclidean regulator mixes nearby spectral channels;
3. **boundary spectral interiority:** the physical density \(\rho(\omega)\) itself has rank two at the same real frequency.

Only the third supports a pointwise real-frequency SPD lock without an explicit resolution scale. The second may still be operationally physical when the resolution or damping is measured rather than inserted arbitrarily.

## 4. Consequence for candidate Standard-Model sources

Multiple Standard-Model species or thresholds are not enough by themselves. A candidate topology correlator must establish both:

1. at least two non-collinear exchange amplitudes;
2. overlapping spectral support at the frequency used by the lock, or a physically specified coarse-graining kernel.

This applies separately to:

- total-stress correlators;
- conserved \(B-L\) current correlators before Majorana breaking;
- Higgs-dressed scalar channels;
- neutrino light/heavy spectral mixtures.

Their Lorentz tensor structures cannot be mixed merely to manufacture rank.

## 5. A new operational parameter

If the lock is evaluated at \(z=\omega+i\eta\), then \(\eta\) is not innocuous. It represents one of:

- physical damping;
- detector frequency resolution;
- thermal width;
- finite-time observation;
- an unphysical regulator.

The first four can define an operational observable. The last cannot.

Accordingly, any numerical prediction must state how \(\eta\) is fixed and test stability under the experimentally relevant resolution range.

## 6. Stop-everything criteria

Stop claiming an intrinsic full-rank absorptive carrier if:

1. full rank occurs only for an arbitrary \(i\epsilon\) prescription;
2. every physical boundary residue is rank one and no measured broadening overlaps independent channels;
3. all exchange rays are collinear because one universal phase relates the faces;
4. independent Lorentz source types are added as if they were one response matrix;
5. the SPD distance diverges or becomes regulator dominated as \(\eta\to0\).

## 7. Next gates

1. Compute the exchange-ray phases for the five gauge-invariant source multiplets rather than treating them as free.
2. Determine spectral-support overlap in the total-stress, \(B-L\) and Higgs-dressed scalar branches.
3. Promote detector resolution or damping to an explicit parameter of the absorptive lock.
4. Test normalized-distance stability as the resolution is varied.

## Reproducibility

```powershell
node scripts\analyze_spectral_resolution_rank_of_two_face_response.mjs
```
