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

## Three-dimensional tail and spectral-shift surface

The next pass reconstructs a heliocentric Cartesian position from each Gaia DR3 parallax and sky direction, obtains a robust-centred three-dimensional principal axis from all 1,247 selected members, and aligns its sign to the published sky-plane tail direction. The resulting ICRS unit axis is

\[
(0.4653,-0.7691,0.4380).
\]

All 416 RV records have finite parallax uncertainty. For the 373 robust residual inliers, the spectral residual changes along this reconstructed coordinate by

\[
-0.02006\ {\rm km\,s^{-1}\,pc^{-1}}.
\]

Two thousand deterministic Gaussian perturbations of the along-axis coordinate using the reported parallax uncertainties give [-0.02028,-0.01979] km/s/pc. This narrow interval measures only coordinate-error propagation: it holds membership, the fitted common velocity and the PCA axis fixed, and therefore is not a full astrometric covariance or model uncertainty.

The binned data show why a surface is more honest than one coefficient. Most central bins have median residuals around 1.3--2.0 km/s (roughly 4--7 parts per million as a fractional spectral shift), while the most distant positive-tail bin, centred near 49 pc, falls to 0.078 km/s. The three-dimensional slope is therefore real within this reconstruction but strongly levered by the extended tail population.

Gaia's catalogue RV is an aggregate spectral result rather than a per-line carrier test. As a first atmosphere/template control, the pass joins `rv_template_teff`. Regressing robust residuals jointly on three-dimensional tail position and template temperature gives -0.02011 km/s/pc for the tail term and only -0.0081 km/s per 1,000 K for the temperature term. The spatial coefficient survives this coarse spectral control. That does **not** establish a universal frequency shift: line-by-line spectra, gravitational and convective shifts, binaries, template mismatch and instrument zero points remain required.

## Does the cluster shape favour ninety degrees?

No likelihood follows from size or elongation alone. The corpus has no law mapping a cluster's ordinary spatial covariance, mass, formation plane or tidal-tail axis to its configuration-\(T_1\) orientation. The earlier covariance no-go therefore still applies.

There is a purely geometric prior observation. If two unoriented axes are independently isotropic in three dimensions, their acute relative angle has density

\[
p(\theta)=\sin\theta,
\qquad 0\leq\theta\leq\frac\pi2.
\]

Near-perpendicular orientations occupy more solid angle: the probability of lying within \(\delta\) of 90 degrees is \(\sin\delta\), giving 8.72% within 5 degrees and 17.36% within 10 degrees. Exact 90 degrees still has probability zero under a continuous prior. If the orientations instead live on an unoriented circle, the acute angle is uniform and the corresponding probabilities are 5.56% and 11.11%. Choosing between these priors requires the missing configuration geometry; M44's observed shape does not choose it.

Visibility adds a stronger constraint. In the minimal \(q=0\) projection, direct electromagnetic overlap is \(|\cos\theta|\), which vanishes at 90 degrees. A bright visible M44 therefore disfavors exact orthogonality under that naive pure-projection model. At 90 degrees the full declared kernel is \(\kappa=q\), so nonzero off-axis coupling or reciprocal boundary mixing can restore visibility. The required \(q\), boundary transport and carrier dependence must be predicted together; otherwise brightness simply fits another free parameter.

## Spiral-galaxy inclination as a slicing template

Spiral galaxies do provide a useful ordinary-geometry family of slices. Let \(i\) be the conventional disc inclination, with 0 degrees face-on and 90 degrees edge-on. Let a candidate axis make polar angle \(\alpha\) from the disc normal and azimuth \(\phi\) from the observer's tilt plane. Then

\[
\cos\theta
=\cos i\cos\alpha+\sin i\sin\alpha\cos\phi.
\]

Across many galaxies, inclination can therefore scan a declared projection kernel while \(\alpha\), radius, morphology, dust, stellar population and carrier are held or modelled. If azimuth is unresolved, the corresponding root-mean-square direct overlap is

\[
\sqrt{\langle\cos^2\theta\rangle_\phi}
=\sqrt{\cos^2i\cos^2\alpha+\tfrac12\sin^2i\sin^2\alpha}.
\]

This is a geometric slicing template, not yet a \(T_1\) measurement. Ordinary inclination is itself inferred from projected axis ratio under a finite-thickness model and becomes entangled with dust and morphology, especially toward edge-on views.

The current Gaia reconstruction places M44 at heliocentric Galactic coordinates \((l,b)=(205.73,32.35)\) degrees and 184.37 pc. Adopting the 8.15 kpc Solar Galactocentric radius used by Reid et al. gives \(R\simeq8.29\) kpc: roughly the Solar/Local-Arm radial neighbourhood, though an old moving cluster is not a clean tracer of the present young arm ridge. Its sightline corresponds to an external-disc inclination analogue of

\[
i_{\rm slice}=90^\circ-|b|=57.65^\circ,
\]

so M44 occupies an intermediate, moderately inclined slice rather than either the face-on or edge-on limit.

The reconstructed tail axis is only 2.96 degrees from the Galactic plane and 46.53 degrees from our line of sight. Consequently, **if and only if** the tail axis were used as a surrogate for \(T_1\), it would sit 87.04 degrees from the Galactic disc normal: tantalisingly close to perpendicular. That is a conditional coordinate placement, not an identification. At M44's actual azimuth the minimal direct overlap would be \(|\cos\theta|=0.688\); averaging over an unknown azimuth at the same \((i,\alpha)\) gives an RMS overlap of 0.597. The useful result is therefore a precise place to mark M44 on an inclination surface, together with the assumption that creates the near-90-degree reading.

## Corpus-derived hypothesis tournament at 87 degrees

The corpus suggests several inequivalent meanings of a near-quarter-turn. Treating them as a small tournament exposes what the present evidence can already remove.

### Scalar frequency projection

For the declared scalar kernel

\[
\kappa(\theta,q)=\cos\theta+q\sin\theta,
\]

the conditional angle \(\theta=87.04^\circ\) gives \(|\cos\theta|=0.05166\) and \(|\sin\theta|=0.99866\). A pure \(q=0\) reading would retain only 5.17% of the frequency amplitude, an order-one effect rather than the observed parts-per-million residual. Preserving unit response requires

\[
q={1-\cos\theta\over\sin\theta}=0.94960.
\]

Including the current mean 1.515 km/s residual changes this only to 0.94961. Thus the literal scalar model is not naturally a small perturbation at this angle: it needs an off-axis component comparable to the primary component, or an additional normalization that cancels the large projection. Gaia's aggregate RV cannot decide whether such a cancellation is physical or fitted.

### Norm-preserving two-channel rotation

A different hypothesis treats the near-quarter-turn as a rotation of a two-component channel state rather than loss under a scalar projector. Then

\[
\cos^2\theta+\sin^2\theta=1,
\]

and total norm is preserved, but only 0.267% remains in the direct \(T_1\) component while 99.733% moves into the cross component. This model is compatible with ordinary total brightness by construction and therefore cannot be confirmed by brightness. It predicts an almost complete **channel swap**, which needs a reader that distinguishes the two components through phase, polarisation, carrier or an independently derived gravitational response. The corpus's quarter-turn audit warns that quarter-turns on other carriers cannot simply be identified with this celestial channel; this is a new physical hypothesis, not a transported theorem.

### Isotropic spatial frame projection

In the provisional four-spatial-dimensional frame model, the single compressed singular value at 87.04 degrees is 0.05166. If M44 were intrinsically isotropic and the visible shape were produced only by that compression, its projected axis ratio would be

\[
{1\over|\cos\theta|}=19.36.
\]

The selected catalogue has sky-plane axis ratio 3.27, smaller by a factor of 5.91. The special hypothesis “isotropic source plus pure one-direction projection” is therefore inconsistent with the measured morphology. This does not reject the general frame model because M44 has strongly non-isotropic tidal tails; allowing arbitrary intrinsic covariance restores the exact no-go described above.

### Boundary or gradient mixing

The earlier held-out shape tournament is the present test of a spatially varying selector: sharp step, smooth step, relaxation and localized mixing layer all fail to distinguish themselves from an ordinary linear tail term. The data currently prefer spatial structure over a constant offset, but not a boundary topology.

The tournament therefore does not confirm \(T_1/T_2\). It removes two tempting simple stories: a small \(q=0\) scalar perturbation and an isotropic blob made elongated solely by 87-degree projection. The norm-preserving channel-swap hypothesis survives only because the current data do not read the proposed second channel. Its decisive experiment is carrier-tagged or phase-sensitive, not another fit to total brightness.

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
- M. J. Reid et al., [*Trigonometric Parallaxes of High-Mass Star-Forming Regions: Our View of the Milky Way*](https://arxiv.org/abs/1910.03357), *The Astrophysical Journal* **885** (2019), 131.
- H. Monteiro et al., [*Milky Way spiral arms from open clusters in Gaia EDR3*](https://doi.org/10.1051/0004-6361/202039751), *Astronomy & Astrophysics* **655** (2021), A44.
- K. L. Masters et al., [*Galaxy Zoo: dust in spiral galaxies*](https://doi.org/10.1111/j.1365-2966.2010.16335.x), *Monthly Notices of the Royal Astronomical Society* **404** (2010), 792.
- S. N. Quinn et al., [*Two “b”s in the Beehive: The Discovery of the First Hot Jupiters in an Open Cluster*](https://doi.org/10.1088/2041-8205/756/2/L33), *The Astrophysical Journal Letters* **756** (2012), L33.
- T. D. Brandt and C. X. Huang, [*The Age and Age Spread of the Praesepe and Hyades Clusters*](https://doi.org/10.1088/0004-637X/807/1/24), *The Astrophysical Journal* **807** (2015), 24.
- A. M. Boesgaard, B. Roper and D. Lum, [*The Chemical Composition of Praesepe (M44)*](https://doi.org/10.1088/0004-637X/775/1/58), *The Astrophysical Journal* **775** (2013), 58.

