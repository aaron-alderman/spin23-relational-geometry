# M44 anchor–width calibration contract v1

The focused measurement design found that an absolute spatial anchor plus a width reader is the smallest linear-response bundle capable of separating the five retained hypotheses. This contract asks whether any existing M44 observable actually inhabits those types.

The answer is presently **no**. Several useful proxies exist, but none passes all seven gates: hypothesis-independent definition, independent zero, affine control, full covariance, ordinary controls, a frozen source-derived forward map and a genuinely independent holdout.

## Candidate anchor

The strongest available proxy is

\[
  a_i=v_{\mathrm{spec},i}-v_{\mathrm{ast},i},
\]

where the astrometric prediction is fitted without ingesting the later spectroscopic velocity. This is valuable because the two channels have different nuisance structure, and the existing M44 pass contains 373 robust residual inliers. It is not an absolute extra-coordinate anchor. The current pass lacks a second spectrograph, joint propagation of the full astrometric and fitted-model covariance, complete binary and atmosphere controls, and—most decisively—a source-derived map from displacement in the proposed geometry to radial-velocity residual.

The calibration scale is material. Gaia DR3 validation reports a radial-velocity zero-point trend with magnitude reaching about 0.4 km/s near the faint limit. Gaia DR3 astrometry retains the EDR3 parallax bias; its correction depends on sky position, magnitude and colour. The official astrometric documentation requires Jacobian propagation of the full covariance matrix. These are ordinary calibration freedoms, not evidence against or for the geometric proposal.

Parallax minus photometric distance is retained only as a conditional proxy. Ordinary three-dimensional position is explicitly retired as a direct anchor: a coordinate in the observed space is not the proposed fourth coordinate merely because both are called position.

## Candidate width

The current RV residual has robust scatter 1.43 km/s. That number is not yet an intrinsic geometric width. It mixes measurement error, the common astrometric fit, unresolved binaries, rotation, gravitational and convective line shifts, template effects and ordinary tail dynamics. A width reader requires a joint hierarchical deconvolution and its own forward kernel.

Ordinary cluster depth is likewise retired as a direct fourth-coordinate thickness. It remains an important nuisance and control.

## Preferred pilot

The best future pair is line-resolved, cross-instrument spectroscopy:

1. line-by-line location residuals against an astrometry-only velocity prediction;
2. cross-line coherence or intrinsic residual width;
3. repeated epochs for binary and activity control;
4. an independently calibrated second spectrograph held out until the model is frozen;
5. raw identity retained for star, line, epoch, instrument and reduction.

This pilot still cannot be admitted until the programme derives how displacement, tilt or thickness acts on named carriers or spectral lines. Collecting a larger dataset before writing that transfer law would increase precision without increasing identifiability.

## Corpus law audit

A targeted scan confirms that the missing transfer law is real. The current thesis contains three relevant objects:

- the frequency projection \(\omega_{\rm obs}=\omega_1\cos\theta+\omega_2\sin\theta\), which describes orientation-dependent mixing but does not assign carriers or respond to displacement or thickness;
- the spatial frame projection \(\mathbf x_{\rm obs}=E^TG\mathbf q\), which gives rank-two-plus-one compression but no electromagnetic or spectral transfer law;
- the symbol \(K_{\rm EM}(q,\omega,\theta,\nabla\theta)\), explicitly introduced as a response kernel that must still be specified.

Unrelated trigonometric mixing elsewhere in the corpus does not inhabit the astronomical configuration type and cannot be imported by notation alone. There is consequently no executable source-derived anchor or width law to apply to M44 today.

## Decision

No candidate is admitted as an anchor or width reader. The current RV location and scatter are held as useful ordinary-data proxies. Ordinary spatial position and depth are retired as direct geometric identifications. Failure to calibrate an absolute anchor makes constant displacement untestable; it must not be counted as evidence for the ordinary/null hypothesis.

Primary calibration sources are the [Gaia DR3 documentation](https://gea.esac.esa.int/archive/documentation/GDR3/), Lindegren et al. on [EDR3 parallax bias](https://doi.org/10.1051/0004-6361/202039653), Katz et al. on [DR3 radial velocities](https://doi.org/10.1051/0004-6361/202244220), the [Gaia covariance documentation](https://gea.esac.esa.int/archive/documentation/GDR3/Data_processing/chap_cu3ast/sec_cu3ast_intro/ssec_cu3ast_intro_tansforms.html), and Soubiran et al. on [Gaia radial-velocity standards](https://doi.org/10.1051/0004-6361/201220927).
