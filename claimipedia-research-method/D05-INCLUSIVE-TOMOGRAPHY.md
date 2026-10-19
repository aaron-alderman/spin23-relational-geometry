# D-05 inclusive anomaly tomography

## Inclusive data does not erase the geometry

Let physical channel `i` have Higgs-source spectral weight `w_i`, anomaly response vector `R_i`, and projective shift `delta r_i=b dot R_i`. If the channel or polarization label is not observed, then

`rho_gH/rho_HH-c_H = Rbar(s) dot b`,

where `Rbar` is the positive-weighted channel mean.

The Schur innovation is

`Delta(s)=W(s) Var_w[b dot R_i(s)]`.

Thus an inclusive measurement retains both a mean and a variance of the hidden projective directions. It does not reduce to a single underlying ray unless the channel ratios are genuinely equal.

## Energy-scan result

One energy supplies one linear projection of the beta covector; the innovation adds a quadratic constraint that may have a discrete ambiguity. Two energies with independent mean-response vectors give an ordinary rank-two linear inversion.

The executable fixture recovers the declared gauge and quartic beta coefficients exactly from inclusive mixed responses at two energies. Polarization resolution is therefore sufficient but not necessary. What is necessary is a rank audit of the actual energy window.

## BRST and equivalence-theorem boundary

Only the three physical massive-vector polarizations belong in the positive spectral sum. Goldstone and ghost fields remain internal variables required for the complete gauge-fixed calculation.

The gauge-kinetic form factor passes the on-shell Ward test. At high energy,

- the transverse gauge-kinetic/Higgs-source ratio grows as `s^2/(2m_A^2)`;
- the longitudinal ratio tends to `2m_A^2`.

The equivalence theorem may replace longitudinal vectors by Goldstones only after including its finite equivalence factor and the complete BRST diagram set. It does not license treating Goldstones as additional physical spectral states or dropping ghost/counterterm completion.

The large transverse/longitudinal separation improves identifiability but can make the raw inverse problem poorly conditioned. Dimensionless normalization and noise propagation are the next gate.
