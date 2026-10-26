# Focused geometry measurement design v1

The five-family tournament establishes what the current and hypothetical readers can distinguish. This tranche asks the next engineering question: what is the smallest sufficient reader ecology, and how strong must a signal be before it is reliably detected?

Four reader bundles are enumerated: directional mixing, coherence, width and an absolute spatial anchor. Every one of their 15 non-empty subsets is evaluated under three calibration policies.

Under retained calibration, two minimal designs separate all five families:

1. absolute anchor plus coherence;
2. absolute anchor plus width.

The second is preferred for an initial design because width responds linearly near zero while coherence loss is quadratic. Its semantics remain inspectable: zero anchor and width is ordinary; an anchor plane is tilt; nonzero width is thickness; a constant anchor is displacement; and an anchor bowl is bend.

This compression has a hard boundary. No reader subset separates all five when every scalar channel has an unknown zero: constant displacement then aliases ordinary. If the anchor is only defined modulo an affine plane, constant displacement and constant tilt both lose absolute identifiability. No classifier can repair absent calibration information.

The selected anchor-plus-width design is then exercised over eleven normalized amplitudes, five noise levels and 300 deterministic trials per cell. Each alternative is profiled over its permitted parameter grid and compared with the ordinary model using the same 6.63 likelihood-ratio control introduced by the focused tournament. A simultaneous five-way tournament at normalized amplitude 0.1 checks cross-family confusion. The evidence record preserves false-positive rates, full power curves, five-way confusion registers and the minimum tested amplitude reaching 95% power.

These sensitivity values are dimensionless design diagnostics. They must not be read as requirements for Gaia, spectroscopy or any other physical instrument until the abstract channels have an independently justified astronomical calibration.

The next real-world step is therefore a calibration contract: identify candidate observables for anchor and width, state their zero points and affine freedoms, and propagate their empirical covariance before fitting these hypotheses to a larger cluster sample.
