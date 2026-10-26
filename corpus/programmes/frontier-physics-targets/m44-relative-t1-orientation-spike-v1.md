# M44 does not reveal a T1 angle without a cross-channel calibration

**Date:** 26 October 2026  
**Status:** source-oriented identifiability spike; constant-angle spectroscopy closed as non-identifying; first differential astrometry–spectroscopy pass executed but not physically assigned
**Evidence:** [machine-readable spike ledger](../../../evidence/data/m44-relative-t1-orientation-spike-v1.json)  
**Certificate:** [degeneracy verifier](../../../verification/verify/verify_m44_relative_t1_orientation_spike.mjs)
**Cross-channel runner:** [Gaia/VizieR analysis](../../../scripts/analyze-m44-cross-channel-kinematics.mjs)

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

## First cross-channel pass

A read-only exploratory pass joined the 1,247 low-contamination catalogue members to Gaia DR3 through the published DR2--DR3 neighbourhood table. All 1,247 obtained finite parallax and proper motion; 416 also had a Gaia DR3 radial velocity with reported uncertainty no greater than 5 km/s. The astrometric side fits a single ICRS space-velocity vector from proper motions and parallaxes only. It therefore does not ingest the spectroscopic radial velocities it later predicts.

The full spatial baseline gives an astrometric radial velocity of 33.12 km/s at the robust cluster centre. Among 373 robust spectroscopic inliers, the residual has median 1.44 km/s and robust scatter 1.43 km/s. Along the signed catalogue major axis, centred on the median cluster position, its ordinary least-squares slope is

\[
-0.0672\pm0.0124\ {\rm km\,s^{-1}\,deg^{-1}},
\qquad r=-0.270.
\]

The inverse-variance-weighted slope is -0.0570 km/s/deg. Controlling linearly for catalogue G magnitude leaves -0.0670 km/s/deg, because tail coordinate and G magnitude correlate only weakly in this selected RV sample (0.057). A deterministic 2,000-shuffle label-permutation check reaches its resolution floor, \(p=1/2001\). Recentring the sign split on the median cluster position yields 182 and 191 inliers on the two branches; the branch slopes have the same sign, but the trailing-branch estimate is individually weak.

This is a detected *cross-channel structure*, not a detected \(T_1\) orientation. The membership list was selected with convergent-point kinematics; the common-velocity model omits the ordinary tail dynamics, binaries, atmosphere-dependent spectral shifts and Gaia RV systematics named above; and no source-derived \(T_1\) law predicted the slope before inspection. The 2025 N-body work specifically predicts tail self-gravity, epicyclic widening, oscillation and branch asymmetry, so an ordinary-dynamics residual is expected rather than exceptional.

The fit also demonstrates why the long tails are metrologically useful. The tangential design condition number is 50.8 for the full selected sample, but 1,450 inside an approximate 3.3-degree tidal-radius aperture and 4,227 inside 1.5 degrees. The inferred centre RV correspondingly drifts from 33.12 to 33.48 and then 37.05 km/s. A narrow cluster core cannot reliably supply its own astrometric radial component; angular extent is part of the measurement instrument.

The bounded update is therefore: the proposed second channel exists and contains a reproducible spatial residue, while physical attribution remains deliberately open. The next honest gate is a frozen ordinary-dynamics prediction plus a source-native \(T_1\) residual law, followed by held-out stars or an independent spectrograph. Fitting an angle to the observed slope now would merely rename the residue.

## Frozen-model gate and retrospective holdout rehearsal

The corpus audit supplies one configuration-\(T_1\) spectral law,

\[
\omega_{\rm obs}=\omega_1[\cos\theta+q\sin\theta].
\]

When \(q\) and \(\theta\) are cluster-wide constants, their effect on radial-velocity residuals is also constant. The frozen corpus-native model is therefore

\[
M_{T_1}: r(s)=a,
\]

which is predictively identical to the intercept-only null. The corpus contains no law for \(\theta(s)\), no boundary condition and no coupling that would determine its derivative along a tidal tail. A model \(a+bs\) cannot honestly be called \(T_1\) merely because the data prefer \(b\ne0\).

There is, however, an ordinary reason to rehearse that linear term. The published Praesepe dynamical study notes that extended-tail searches require a velocity gradient, cites the compact convergent-point method's linear trend in space velocity with cluster distance, and finds systematic tail-streamline shifts from ordinary self-gravity and epicyclic motion. In the absence of a released particle snapshot bound to this spike, the smallest literature-motivated surrogate is

\[
M_{\rm dyn}: r(s)=a+bs.
\]

The runner now compares these two frozen shapes with five folds assigned by `sha256(dr3SourceId) mod 5`. Each fold is predicted from a Theil--Sen line fitted to the other four; the constant comparator uses the training median. Across all 416 held-out predictions, the constant model has mean absolute error 2.071 km/s and median absolute error 0.971 km/s. The linear-tail model gives 2.015 and 0.908 km/s respectively, and wins the paired absolute error on 222 stars versus 194. Its five fitted slopes range from -0.0738 to -0.0936 km/s/deg. A deterministic 5,000-resample paired bootstrap gives an ordinary-minus-constant mean-absolute-error change of -0.0564 km/s with 95% interval [-0.0970,-0.0176] km/s.

This is a *retrospective rehearsal*, not a confirmatory holdout: the aggregate gradient had already been inspected before the hash split and model shapes were frozen. It demonstrates that the ordinary linear spatial term is not merely an in-sample artefact, while showing that the only presently admissible corpus-native \(T_1\) model has no differential prediction to compete with it. The scientific gate therefore moves outward rather than inward: obtain the N-body snapshot or an equivalent frozen ordinary prediction, derive \(\theta(s)\) independently of M44 if the programme can, and evaluate both on spectroscopy not used anywhere in this spike.

## Alternative tail-shape tournament

The runner also performs a nested five-fold exploratory tournament rather than assuming the residual is linear. Candidate centres are selected from training-fold deciles, candidate widths are frozen at 0.25 through 64 degrees, and each amplitude and intercept is fitted by Theil--Sen regression. The held-out results are:

| residual shape | interpretation | held-out MAE (km/s) | change from constant (km/s) |
|---|---|---:|---:|
| \(a\) | constant projection / null | 2.0712 | -- |
| \(a+bs\) | ordinary linear tail drift | 2.0148 | -0.0564 |
| \(a+b\,\mathrm{sign}(s-s_0)\) | sharp sector boundary | 2.0335 | -0.0377 |
| \(a+b\tanh[(s-s_0)/w]\) | smooth sector transition | 2.0156 | -0.0556 |
| \(a+b e^{-|s|/\ell}\) | cluster-centred relaxation | 2.0282 | -0.0430 |
| \(a+b\,\mathrm{sech}^2[(s-s_0)/w]\) | localized mixing layer | 2.0209 | -0.0503 |

Every spatial shape improves on the constant model in its paired bootstrap comparison. None is distinguishable from the linear model: the candidate-minus-linear 95% intervals are [-0.0087,0.0466] km/s for the sharp step, [-0.0063,0.0089] for the smooth step, [-0.0101,0.0397] for relaxation and [-0.0132,0.0277] for the localized layer.

The fitted parameters explain why. The smooth step selects widths of 32 or 64 degrees and unstable centres, collapsing toward its linear limit. Relaxation selects the maximum 64-degree scale in all five folds, with compensating amplitude and intercept, so its length is not identified. The localized layer is more stable, selecting centres from -1.88 to -1.54 degrees and widths of 8 or 16 degrees, but it earns no resolved predictive advantage. Sharp-step centres range from 1.85 to 3.71 degrees and likewise do not win.

This is a bounded model-equivalence result. The tails say that a spatial term is useful; their current two-dimensional angular residuals do not identify a boundary topology. A real discriminator now requires three-dimensional tail position and uncertainty, ordinary phase-space predictions, or new spectroscopy extending beyond the present angular window.

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
- ESA, [Gaia Archive](https://gea.esac.esa.int/archive/), Gaia DR3 source and DR2-neighbourhood tables.
- E. Schilbach and S. Röser, [*Dynamical model of Praesepe and its tidal tails*](https://doi.org/10.1051/0004-6361/202451650), *Astronomy & Astrophysics* (2025).
- S. N. Quinn et al., [*Two “b”s in the Beehive: The Discovery of the First Hot Jupiters in an Open Cluster*](https://doi.org/10.1088/2041-8205/756/2/L33), *The Astrophysical Journal Letters* **756** (2012), L33.
- T. D. Brandt and C. X. Huang, [*The Age and Age Spread of the Praesepe and Hyades Clusters*](https://doi.org/10.1088/0004-637X/807/1/24), *The Astrophysical Journal* **807** (2015), 24.
- A. M. Boesgaard, B. Roper and D. Lum, [*The Chemical Composition of Praesepe (M44)*](https://doi.org/10.1088/0004-637X/775/1/58), *The Astrophysical Journal* **775** (2013), 58.

