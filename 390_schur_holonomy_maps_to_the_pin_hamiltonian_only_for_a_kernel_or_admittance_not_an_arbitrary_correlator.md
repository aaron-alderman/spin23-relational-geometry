# Schur Holonomy Maps to the Pin Hamiltonian Only for a Kernel or Admittance, Not an Arbitrary Correlator

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact quadratic-elimination and block-inverse correction; physical identification of the three-port object remains open

## 1. A categorical correction

The preceding documents used Schur elimination of a positive three-port matrix
to produce a direct/indirect (O/R) phase. That algebra is exact. Its physical
meaning depends on what the matrix represents.

Three objects must not be conflated:

1. a quadratic action or inverse-propagator kernel (K);
2. a correlator/Green matrix (G=K^{-1});
3. an admittance or Dirichlet-to-Neumann boundary kernel, which composes by
   Schur elimination.

Only the first and third map directly to an effective Hamiltonian/kernel by the
displayed Schur complement.

## 2. Exact quadratic elimination

Let (x=(x_O,x_R)^T) be retained variables and (y) the third port. Write

\[
S^{(2)}=
\frac12
\begin{pmatrix}x^\dagger&\bar y\end{pmatrix}
\begin{pmatrix}
A&B\\B^\dagger&d
\end{pmatrix}
\binom{x}{y},
\qquad d>0.
\]

The stationary field is

\[
y_*=-d^{-1}B^\dagger x.
\]

Substitution gives

\[
\boxed{
K_{\rm eff}=A-Bd^{-1}B^\dagger.}
\]

For

\[
K=
\begin{pmatrix}
a&u&\bar w\\
\bar u&b&v\\
w&\bar v&d
\end{pmatrix},
\]

the effective (O/R) edge is

\[
\boxed{
u_{\rm eff}=u-\frac{\bar w\bar v}{d}.}
\]

This is precisely the direct/indirect formula used by the Pin holonomy branch.
If every entry has energy dimension, the correction has dimension

\[
\frac{E\,E}{E}=E,
\]

and can consistently be matched to the Hamiltonian coefficient (delta).

## 3. Positivity survives kernel elimination

If (K>0), then (d>0) and

\[
K_{\rm eff}>0.
\]

This is the standard positive Schur-complement theorem. It makes a positive
static kernel or passive admittance a natural source of a stable effective
two-port term.

The orientation

\[
\operatorname{Im}
\left[u\left(\frac{w v}{d}\right)\right]
=\frac1d\operatorname{Im}(uvw)
\]

then measures the relative quadrature of two terms in the *same effective
kernel*.

## 4. Correlator inversion changes the rule

Let

\[
G=K^{-1}
=\begin{pmatrix}
G_{xx}&G_{xy}\\G_{yx}&G_{yy}
\end{pmatrix}.
\]

Block inversion gives

\[
\boxed{G_{xx}=K_{\rm eff}^{-1}.}
\]

Therefore the effective kernel inferred from a measured correlator is

\[
\boxed{K_{\rm eff}=G_{xx}^{-1},}
\]

not the Schur complement of (G) over (G_{yy}).

Indeed the complementary identity is

\[
\boxed{
G_{xx}-G_{xy}G_{yy}^{-1}G_{yx}=A^{-1}.}
\]

Schur-complementing the covariance returns the inverse of the *uneliminated
bare block* (A), not the interaction-corrected kernel.

## 5. Herglotz sign under inversion

For an invertible matrix Herglotz function (G(z)),

\[
\operatorname{Im}G(z)>0.
\]

Its inverse obeys

\[
\boxed{
\operatorname{Im}G(z)^{-1}
=-G(z)^{-\dagger}
[\operatorname{Im}G(z)]
G(z)^{-1}<0.}
\]

Thus an inverse response kernel is naturally anti-Herglotz under this
convention. This is consistent with causal inverse propagators; it is not a
positivity failure.

The sign convention must be stated whenever a response is converted into an
action kernel.

## 6. When Schur elimination of a response is correct

Some response-like matrices are themselves boundary kernels:

- Dirichlet-to-Neumann maps;
- admittance matrices;
- inverse propagators;
- quadratic influence kernels;
- network Laplacians after internal variables are exposed.

These compose under Schur elimination and may be used directly.

A susceptibility or two-point correlator generally does not. It must first be
inverted or embedded in a specified terminated-port experiment whose reduction
law is derived.

## 7. Correction to the three-port branch

The following results remain exact:

- vertex-gauge covariance of direct and indirect paths;
- the loop/area identity;
- positive/Herglotz existence examples;
- rank-one and rank-two spectral theorems;
- multi-pole path separability.

What remains conditional is the final arrow

\[
\Omega_{OR}\longrightarrow\delta\sigma_y.
\]

It is valid directly if the constructed three-port matrix is a kernel or
admittance. If it is a correlator, one must use (G_{xx}^{-1}) and recompute
the oriented coefficient.

## 8. Minimal static matching formula

Suppose a low-frequency Hermitian kernel has

\[
u=u_x-iu_y,
\qquad
q_{\rm ind}=q_x-iq_y.
\]

Then

\[
u_{\rm eff}
=(u_x-q_x)-i(u_y-q_y).
\]

With

\[
X(u_{\rm eff})
=\operatorname{Re}u_{\rm eff}\,\sigma_x
-\operatorname{Im}u_{\rm eff}\,\sigma_y,
\]

the Pin coefficient is

\[
\boxed{
\delta=-\operatorname{Im}u_{\rm eff}=u_y-q_y}
\]

up to the fixed convention and any wavefunction normalization converting the
kernel into the canonical lattice Hamiltonian.

This is dimensionally meaningful only after the fields and kinetic residues
are normalized.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a named Furey/Standard-Model three-port inverse
propagator or DtN kernel has nonzero loop orientation, and canonical field
normalization places its Schur-generated (delta) in the continuum-stable Pin
phase.

**Correlator falsifier:** a susceptibility (G) is Schur-complemented and
called an effective Hamiltonian without inversion or a terminated-port
derivation.

**Sign falsifier:** Herglotz positivity is demanded simultaneously of (G) and
(G^{-1}) under the same convention.

**Dimension falsifier:** a dimensionless phase area is equated directly to an
energy coefficient.

**Normalization falsifier:** wavefunction residues are ignored when matching
the effective kernel to the canonical lattice (delta).

## 10. Pinned dependency and continuation

Pin the response-to-Pin normalization at the categorical identity of the
three-port object. Continue along two explicit paths:

1. build a quadratic kernel/inverse-propagator model and eliminate port three;
2. start from a Herglotz correlator, invert its retained block and compare the
result.

Agreement after proper normalization would close the dynamical bridge.

## 11. Certificate

The [kernel-versus-correlator Schur certificate](scripts/verify_kernel_vs_correlator_schur_elimination.mjs)
checks both block-inverse identities, positive kernel reduction, the oriented
off-diagonal correction and the negative imaginary-part identity for inverse
Herglotz matrices.

## Companion documents

- [Multi-pole causal holonomy](389_multi_pole_interference_generates_a_causal_holonomy_even_when_every_spectral_atom_is_rank_one.md)
- [Rank-two passive holonomy](388_a_rank_two_spectral_multiplicity_is_the_minimum_for_passive_three_port_holonomy.md)
- [Schur holonomy to Pin orientation](386_schur_reduction_turns_three_port_holonomy_into_exactly_the_two_or_spurions_needed_by_the_pin_phase.md)
- [Scalar DtN realization](64_scalar_interval_dirichlet_to_neumann_branch.md)
