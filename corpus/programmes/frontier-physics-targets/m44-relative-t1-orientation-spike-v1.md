# M44 does not reveal a T1 angle without a cross-channel calibration

**Date:** 26 October 2026  
**Status:** source-oriented identifiability spike; constant-angle spectroscopy closed as non-identifying; differential astrometry–spectroscopy test remains conditional  
**Evidence:** [machine-readable spike ledger](../../../evidence/data/m44-relative-t1-orientation-spike-v1.json)  
**Certificate:** [degeneracy verifier](../../../verification/verify/verify_m44_relative_t1_orientation_spike.mjs)

## Question

Could the Beehive Cluster, M44/Praesepe, occupy a local \(T_1\) sector at an angle to ours?

The question is admissible only after separating three overloaded meanings of `T1` in the corpus:

1. **configuration \(T_1\):** the exploratory thesis's locally dominant electromagnetic/null transport sector;
2. **modular \(T_1\):** a genus-two theta-characteristic transformation, which is an operator and not a celestial axis; and
3. **workflow T1:** the first tranche in an execution plan.

Only the first meaning can enter this spike. No angle between M44 and the modular generator is defined: the two objects do not inhabit a shared inner-product space.

## Why M44 is a useful control

M44 is nearby, populous and comparatively well calibrated. NASA summarizes it as an open cluster of roughly one thousand stars, about 600 light-years away and roughly 600--700 million years old. Gaia-based work resolves a dense core plus extended tidal tails, so the visible patch is not the complete dynamical object. Independent work supplies cluster chemistry, rotating-star age calibration and planets around member stars.

Those properties make M44 useful for a *differential* test. Its stars approximately share formation time and composition, while its tails give a long phase-space baseline. They do not establish a second temporal orientation, an anomalous projection or new gravity.

## Minimal typed model

The exploratory thesis writes a two-component frequency projection as

\[
\omega_{\rm obs}=\omega_1\cos\theta+\omega_2\sin\theta.
\]

Let \(q=\omega_2/\omega_1\),

\[
\kappa(\theta,q)=\cos\theta+q\sin\theta,
\]

and let \(D(v)=1-v/c\) be the declared first-order Doppler factor. A spectral line then supplies

\[
y=\omega_1D(v)\kappa(\theta,q).
\]

This equation has an exact observational degeneracy within the declared model. For any alternative angle \(\theta'\) with nonzero \(\kappa(\theta',q)\), choose

\[
D(v')=D(v)\frac{\kappa(\theta,q)}{\kappa(\theta',q)}.
\]

Then \(y'=y\). A constant cluster-wide angle can therefore be absorbed into the fitted systemic radial velocity. When \(q\) is also unknown, the problem is still less identifiable. More spectral precision does not remove the degeneracy.

## The spatial-lookalike no-go

The thesis's provisional spatial toy model uses two three-frames \(E,G\in\mathbb R^{4\times3}\) and

\[
P=E^TG,
\qquad
\operatorname{sv}(P)=\{1,1,|\cos\theta|\}.
\]

If the intrinsic cluster covariance is \(C_{\rm int}\), the projected covariance is

\[
C_{\rm obs}=PC_{\rm int}P^T.
\]

For any invertible candidate \(P\), one may choose

\[
C_{\rm int}=P^{-1}C_{\rm obs}P^{-T}.
\]

Thus an elongated core or tidal tail does not determine a configuration-space angle unless the intrinsic covariance is independently fixed. Ordinary Galactic tides, epicyclic motion, evaporation, mass segregation, binaries and membership selection already generate anisotropy. The measured tidal-tail direction is a spatial principal axis, not automatically a \(T_1\) direction.

### Ordinary spatial control from the published catalogue

The Röser--Schilbach VizieR table contains 1,393 reported stars. Selecting the 1,247 rows with published contamination probability \(p_{\rm cont}\leq0.01\), projecting right ascension and declination to a tangent plane about the selected sample mean, and diagonalising the two-dimensional covariance gives:

\[
\operatorname{PA}_{\rm major}=11.01^\circ
\quad\text{east of north},
\qquad
\sqrt{\lambda_1/\lambda_2}=3.27.
\]

Varying the contamination threshold from \(0\) through \(0.1\) keeps the position angle between \(9.92^\circ\) and \(11.01^\circ\), and the axis ratio between \(3.16\) and \(3.33\). This establishes a robust *sky-plane catalogue axis* under the declared simple PCA. It does not establish the three-dimensional tail orbit, an intrinsic unprojected shape, or a configuration \(T_1\) angle. The normalized catalogue rows, query and sufficient statistics are hashed in the evidence ledger; the verifier can repeat the remote calculation with the --live option.

## What could actually separate the hypothesis

The smallest useful bundle must contain records with different nuisance structure:

1. **Gaia-only astrometric radial velocity:** infer the cluster's perspective expansion or convergent-point motion without using spectral line frequencies.
2. **Spectroscopic systemic velocity:** fit member spectra with binaries, gravitational redshift, convective shifts and instrumental zero points explicitly controlled.
3. **Differential tail coordinate:** test residuals against signed distance along both tidal tails rather than fitting one cluster-wide offset.
4. **Multi-line and multi-species coherence:** a genuine projection law must state whether \(q\) is common, line-dependent or carrier-dependent before data are examined.
5. **Parallax-anchored photometry:** test any proposed electromagnetic amplitude kernel against distance, extinction, metallicity, rotation, unresolved binaries and stellar models.
6. **A frozen gravitational kernel:** a luminous/dynamical mass comparison is informative only after \(K_{\rm EM}(\theta)\) and \(K_{\rm grav}(\theta)\) are specified together. An unspecified mismatch is not an angle measurement.

A preregistered residual can be written

\[
r_i=v_{\rm spec,i}-v_{\rm ast,i}
    -r_{\rm binary,i}-r_{\rm atmosphere,i}-r_{\rm instrument,i}.
\]

The first admissible test is not whether \(\bar r\neq0\), because a common zero point can produce that. It is whether a frozen \(T_1\) model predicts a spatial, spectral or carrier-dependent pattern in \(r_i\) that survives withheld members, the leading and trailing tails, independent spectrographs and an ordinary cluster-dynamics model.

## What the present evidence says

M44 is an attractive calibration ensemble, but the current corpus supplies neither a source-derived \(T_1\)-to-observable map nor a physical law assigning separate \(T_1\) orientations to nearby stellar systems. Praesepe lies within the Milky Way and its established literature treats its spectra, age, chemistry, planets and tails with ordinary stellar and Galactic dynamics.

The bounded result is therefore:

\[
\boxed{
\text{M44 can test a specified differential orientation law,}
\quad
\text{but it does not presently identify a }T_1\text{ angle.}
}
\]

This is a useful negative result. It converts “perhaps their axis is tilted” into a precise demand for a second measurement channel and a predicted non-constant residue.

## Sources

- NASA Science, [Messier 44](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-44/).
- S. Röser and E. Schilbach, [*Praesepe (NGC 2632) and its tidal tails*](https://doi.org/10.1051/0004-6361/201935502), *Astronomy & Astrophysics* **627** (2019), A4.
- Röser and Schilbach, [VizieR catalogue J/A+A/627/A4](https://doi.org/10.26093/cds/vizier.36270004).
- E. Schilbach and S. Röser, [*Dynamical model of Praesepe and its tidal tails*](https://doi.org/10.1051/0004-6361/202451650), *Astronomy & Astrophysics* (2025).
- S. N. Quinn et al., [*Two “b”s in the Beehive: The Discovery of the First Hot Jupiters in an Open Cluster*](https://doi.org/10.1088/2041-8205/756/2/L33), *The Astrophysical Journal Letters* **756** (2012), L33.
- T. D. Brandt and C. X. Huang, [*The Age and Age Spread of the Praesepe and Hyades Clusters*](https://doi.org/10.1088/0004-637X/807/1/24), *The Astrophysical Journal* **807** (2015), 24.
- A. M. Boesgaard, B. Roper and D. Lum, [*The Chemical Composition of Praesepe (M44)*](https://doi.org/10.1088/0004-637X/775/1/58), *The Astrophysical Journal* **775** (2013), 58.

