# Local-cluster radial timelike-field spike v1

This spike tests the constrained geometric consequence of a radial extra coordinate,

\[
  \tau(\mathbf x)=f(|\mathbf x-\mathbf X_0|),
  \qquad
  \nabla\tau\parallel\mathbf x-\mathbf X_0.
\]

It does not test whether the coordinate is physically timelike. The input directors are ordinary residual-velocity gradients reconstructed from the same homogeneous Gaia DR3 cluster catalogue used by the earlier field spike.

Because director sign is not stable, the reader remains the projector \(Q=uu^T\). Source and sink are therefore equivalent. The fitted field is parameterized as

\[
  u(\mathbf x)=\operatorname{normalize}
  \left[n+\kappa{(\mathbf x-\bar{\mathbf x})\over100\;{\rm pc}}\right].
\]

For nonzero \(\kappa\), this is exactly radial about

\[
  \mathbf X_0=\bar{\mathbf x}-{100\;{\rm pc}\over\kappa}n.
\]

The limit \(\kappa=0\) is a constant rank-one director with its centre at infinity. Thus the radial alternative contains its proper flat null rather than being forced to return a finite centre.

The analysis fits this family separately on each seven-cluster training fold and predicts the held-out eighth cluster. It reports both the rank-one flat comparison and the earlier mean-projector flat comparison. The latter is more permissive because an averaged projector need not itself have rank one, but it reproduces the frozen earlier score exactly and remains the primary benchmark.

## Result

| field | mean held-out projector error | median held-out projector error |
|---|---:|---:|
| mean-projector flat | 0.5313 | 0.3395 |
| rank-one flat | 0.7218 | 0.5408 |
| finite radial centre | 1.1052 | 1.0718 |

The radial field loses to the mean-projector flat model on all eight held-out clusters. It also loses to the stricter rank-one flat model in aggregate. Its fitted centre is unstable: seven-cluster fits place it approximately 129 pc to 7.1 kpc from their training origin, while the sign of \(\kappa\) changes between folds. The all-cluster fit returns a nominal centre about 319 pc from the sample origin, but the deletion instability prevents treating it as an identified location.

The current residual-gradient proxies therefore do not support one common finite radial centre. This is a rejection of this proxy organization on this sparse dataset—not a rejection of a timelike radial coordinate. Full astrometric covariance, independent spectroscopy, more clusters and a Lorentzian carrier law remain outside the test.

The test boundary is strict. No Euclidean angle is reused as a timelike angle. Lorentzian signature, hyperbolic rapidity, clock transport, carrier-specific redshift and the spacelike induced-metric bound remain untested. Even a successful radial organization would identify a spatial director pattern, not a second timelike dimension.
