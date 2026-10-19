# D-04 BRST-complete one-loop audit

## Result

The requested one-loop calculation has a decisive perturbative-order obstruction: it cannot contain the four-particle cut used to define the D-03 anomaly orientation.

Sewing two tree form factors across an `n`-particle state produces a two-point topology with `n-1` loops. Consequently:

- a two-particle cut begins at one graph loop;
- a four-particle cut begins at three graph loops;
- interference with `beta_lambda O_4`, whose coefficient begins at one loop, enters the uniformly graded spectral correlator at order four.

The earlier formula for `r_4-r_2` remains a useful RG-improved amplitude-level conjecture. It is not a one-loop spectral-matrix result.

## BRST-complete one-loop support

In broken `U(1)` Higgs theory,

`Phi=(v+h+i rho)/sqrt(2)`,

and the gauge-invariant Higgs source is

`O_H=Phi^dagger Phi-v^2/2=v h+(h^2+rho^2)/2`.

The complete `R_xi` calculation contains Higgs, Goldstone, gauge, ghost, auxiliary and counterterm contributions internally. In the physical spectral density their sum leaves:

- the gauge-independent Higgs pole;
- the `hh` continuum;
- the two-massive-vector continuum.

The `xi`-dependent Goldstone and ghost thresholds cancel or lie in the BRST-exact quotient. This is explicitly established for `O_H` by the one-loop calculation in [Gauge-invariant spectral description of the U(1) Higgs model from local composite operators](https://arxiv.org/abs/1912.11390). Its algebraic renormalization, including the fact that the dimension-two scalar cohomology contains only `O_H` and the constant `v^2`, is established in [Study of the renormalization of BRST invariant local composite operators in the U(1) Higgs model](https://arxiv.org/abs/2007.01770).

At strict uniform one-loop order the continuum trace insertion is its classical mass representative,

`O_g=c_H O_H`,

modulo BRST-exact, EOM, improvement and contact terms. Hence

`rho_ab^(1)(s)=w_phys(s)(c_H,1)_a(c_H,1)_b`,

with `w_phys>=0`: a ray with zero innovation. Gauge-anomaly interference on a two-particle cut starts at uniform order two; quartic-anomaly interference on the four-particle cut starts at uniform order four.

## Disposition

One-loop BRST completion validates the physical quotient and exposes the loop-order error, but it cannot test `Q`. The next valid target is either a complete physical four-particle form-factor identity, explicitly labelled as amplitude-level, or the much harder uniform order-four spectral cut.
