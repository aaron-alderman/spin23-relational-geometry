# D-05 two-body anomaly tomography: final report

## Discovery

The anomaly-tomography programme does not need the expensive four-particle cut to obtain two independent beta-function directions.

In broken Abelian Higgs theory, the physical channels

- `hh`;
- transverse massive-vector pair;
- longitudinal massive-vector pair

have three distinct response vectors to the gauge-kinetic and quartic anomaly operators. Their two difference vectors generically form a rank-two matrix throughout the common continuum.

The rank determinant is

`v^2(s-m_h^2)/(s+2m_h^2) * (s-m_h^2)s(s-4m_A^2)/[2m_A^2(s-2m_A^2)]`.

It vanishes at the exact vector threshold, where transverse and longitudinal modes become indistinguishable, and is nonzero away from the exceptional locus.

## Tomographic inversion

In the two-operator truncation, two polarization-resolved projective differences recover the gauge and quartic beta coefficients by an ordinary `2 x 2` inverse.

Polarization tagging is not mandatory. After inclusive summation,

`rho_gH/rho_HH-c_H=Rbar(s) dot b`,

and

`Delta(s)=W(s) Var_w[b dot R_i(s)]`.

Two energies with independent mean-response vectors therefore recover the same two beta coefficients from inclusive mixed responses. The Schur innovation supplies an additional positive quadratic consistency check.

## Perturbative order

The tree form factors enter a two-particle cut rather than a four-particle cut. The linear projective signal has bi-grade `(cut loop 1, beta loop 1)` and appears at uniform order two. Positive innovation is quadratic in the beta-induced ratio differences and first appears at uniform order three.

This is earlier than the four-body route, but it is still not a uniform one-loop innovation.

## Stability and limits

- The gauge-kinetic amplitude passes its on-shell Ward tests.
- Goldstone and ghost fields remain internal BRST-completion variables, not positive physical states.
- The equivalence theorem is a controlled longitudinal computational replacement, not a license to discard the BRST completion.
- Rank and the predicted beta signal are invariant under operator mixing.
- Numerical conditioning is not invariant without an operator-space normalization and measurement covariance.

## Next frontier

The remaining problem is now measurement-facing: construct a dimensionless, loop-corrected estimator for the inclusive mixed mean and innovation using Euclidean/lattice correlator moments or a dispersive reconstruction. Only then can the inverse be assigned realistic uncertainties and regularization.
