# D-04 beta-vector projective identity

## Replacement for the quartic-only formula

In the physical BRST quotient, the renormalized trace has the form

`[T]=c_H[O_H]+sum_I b_I[X_I]`,

up to EOM, BRST-exact, improvement and contact representatives. The `X_I` include the gauge kinetic, quartic and any other allowed scalar anomaly operators; `b_I` are the corresponding beta-function or anomalous coefficients in the dual convention.

For a physical state `n` with a nonzero Higgs-source form factor, define

`R_I,n=<n|X_I|0>/<n|O_H|0>`.

Then the projective source ratio is

`r_n=c_H+b dot R_n`,

and the scheme-robust comparison of two states is

`Delta r_nm=r_n-r_m=b dot (R_n-R_m)`.

The common mass/improvement shear cancels. Under operator mixing `X'=A X`, the response vector and coefficient covector transform as `R'=A R` and `b'=A^(-T)b`, leaving the contraction invariant.

## Disposition of the old Q

The earlier relation

`Q=beta_lambda/[lambda sum_i D_i]`

is recovered only if the gauge-anomaly and every other anomaly-operator response difference vanish for the selected states. BRST invariance does not enforce that condition. The generic completion is

`Q_full=(beta_e/2e) Delta R_F2 + beta_lambda Delta R_lambda + sum_other b_I Delta R_I`.

Thus the quartic-only formula is not protected. What survives is the beta-vector contraction.

## New opportunity: anomaly tomography

For several physical state classes, collect the differences into

`Delta r = Delta R b`.

If the physical response matrix `Delta R` has sufficient rank, the spectral orientations determine combinations of running coefficients. This is a well-typed inverse problem and is invariant under the relevant source shear and operator-basis changes.

The missing physics is now precise: calculate the BRST-complete physical form-factor matrix `Delta R`. Without it, there is no numerical prediction and no justified quartic-only truncation.
