# D-05 normalization and conditioning audit

## Rank is invariant; conditioning is not

For an anomaly-operator basis change `X'=A X`, the response matrix and coefficient covector transform as

`M'=M A^T`, `b'=A^(-T)b`.

The predicted projective signal `M b` and the rank of `M` are invariant. Its ordinary numerical condition number is not: arbitrary operator rescaling can make the same physical inverse problem look better or worse.

Any sensitivity claim must therefore declare an operator-space metric or normalization. The executable audit keeps the declared fixed operator normalization for its main conditioning result and records column-normalized coordinates only as a diagnostic. Energy-dependent column normalization can hide genuine ultraviolet scale separation.

## Energy-window result

The two-body inversion is singular at the massive-vector threshold because transverse and longitudinal responses coincide. At asymptotically high energy, the transverse gauge response grows as `s^2/(2m_A^2)` while the longitudinal and quartic responses stay bounded. Raw scale separation then produces poor conditioning again.

In the declared fixed normalization, the model has a finite best-conditioned low-energy window above the common physical threshold. The deterministic noise fixtures also show why a condition number alone is not an error forecast: the answer depends on whether uncertainties are absolute, relative or correlated. A measurement covariance must be supplied before ranking energy windows empirically.

## Measurement contract

Before treating anomaly tomography as an empirical proposal:

- declare the renormalized operator normalization;
- work in dimensionless or covariance-whitened coordinates;
- avoid exact threshold and uncontrolled ultraviolet extrapolation;
- propagate the covariance of correlator estimates through the inverse;
- repeat the rank and conditioning audit after loop corrections.

The next gate is to express the inclusive spectral mean and innovation as Euclidean correlator moments suitable for a lattice or dispersive estimator.
