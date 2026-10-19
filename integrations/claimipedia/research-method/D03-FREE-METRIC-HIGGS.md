# D-03 free metric–Higgs spectral strike

## Result

The first rung does not produce a full Jordan carrier.

For a free four-real-component Higgs multiplet with conformal improvement in four dimensions, the separated-point on-shell trace satisfies

`O_g = 2 m^2 O_H`

modulo equation-of-motion and contact terms, where `O_H=H^dagger H`. The absorptive spectral matrix is therefore

`rho(s) = rho_H(s) (2m^2,1) (2m^2,1)^T`.

It has rank one and zero determinant at every invariant mass above the two-particle threshold. In the massless conformal limit the trace row disappears altogether, apart from quantum anomaly effects absent in the free rung.

## Spectral innovation

For any positive two-source spectral matrix with `rho_HH>0`, define

`Delta = rho_gg - rho_gH rho_HH^(-1) rho_Hg = det(rho)/rho_HH`.

This is the Schur complement of the Higgs source. It measures the part of the metric-source excitation orthogonal to everything already excited by `H^dagger H`.

If the corresponding Hilbert-space excitation vectors obey `g=a h+b x`, then

`Delta = b^2 ||x_perp||^2`.

The quantity is nonnegative and invariant under the triangular source redefinition `O_g -> O_g+c O_H`. It is also insensitive to real contact polynomials because it is defined from the absorptive measure.

This gives D-03 a sharp first observable: interactions create a genuinely new response direction precisely where `Delta>0`.

## Important distinction

A positive determinant at one frequency establishes two independent source directions. It does not establish that the spectral family spans all three coordinates of `H_2(R)`, and still less that `Sp(4,R)` acts on that family. Full-carrier status requires three linearly independent spectral matrices or a rank-three Jacobian under independent physical controls.

## Next gate

In the Abelian-Higgs rung, calculate

`X = T^mu_mu - 2 m_H^2 H^dagger H`.

Gauge running, scalar running and interaction operators enter `X`. The next decision is whether its spectral excitation has a component orthogonal to `H^dagger H`. If not, the metric–Higgs proposal remains a ray even after the first interaction. If it does, `Delta` provides the scheme-resistant magnitude of the new direction.
