# A gapped charge-one scalar reads flat \(Z_3\) holonomy through a gradient-stress toy, but physical stress requires improvement and probe matching

> **Observable qualification:** the matrices below are finite-regulator gradient/strain occupation covariances, not the complete Hilbert-stress susceptibility. Documents 1393 and 1396 supply the improvement and physical-stress qualification.

**Date:** 20 October 2026  
**Status:** explicit Gaussian defect toy model and quantitative lattice certificate; not derived from the typed action and not physical evidence  
**Parent results:** documents 1222, 1225 and 1227

## Result in one sentence

A local isotropic massive complex scalar of residual charge one on a square defect
torus has a holonomy-dependent partition function, one-point stress and positive
two-stress covariance; its CP-conjugate \(h=1,2\) sectors are exactly degenerate,
and an \(x\)-oriented holonomy produces a response transverse to the square
exchange-symmetric plane without an anisotropic kinetic coefficient, but this
third direction disappears under orientation averaging and does not become the
physical A11 direction until the oriented cycle and probe embedding are derived
from the candidate action.

## 1. What document 1227 left open

Document 1227 identified the smallest viable operator form,

\[
|D_a\phi|^2+m_\phi^2|\phi|^2,
\]

for a gapped defect field whose residual charge is not divisible by three. It did
not answer three questions:

1. Does a completely local model actually produce holonomy-sensitive stress?
2. Does positivity survive when that response is assembled into
   \(H_2(\mathbb R)\)?
3. Does a third matrix direction follow, or must anisotropy be inserted by hand?

This document answers those questions in the smallest calculable Gaussian model.

## 2. Everyday picture

Take a square running track painted with north--south and east--west grid lines.
The material is the same in both directions. A runner receives an extra phase only
after completing the east--west loop.

Nothing in the track material prefers east over north. Nevertheless, the prepared
loop instruction does. The allowed east--west standing waves shift, while the
north--south ones do not. A pair of strain gauges aligned with the two grid
directions can therefore see different fluctuations.

If the experiment is repeated equally often with the instruction around each
axis and the results are averaged, the distinction disappears. The anisotropy came
from the oriented preparation, not an anisotropic material constant.

## 3. Explicit microscopic toy

Let \(\Sigma_3=S^1_\beta\times T^2\) and take a complex scalar of residual
\(Z_3\) charge one:

\[
S_\phi
=\int_{\Sigma_3}\sqrt\gamma\,
\left(\gamma^{ij}(D_i\phi)^*D_j\phi+M^2|\phi|^2\right),
\qquad
D_i=\partial_i-ia_i.
\]

Choose a flat connection around the \(x\) cycle,

\[
\oint_xa=\theta_h={2\pi h\over3},
\qquad h=0,1,2,
\]

and zero local field strength. A square \(N\times N\) lattice regulator with unit
spacing gives

\[
E_{n n_y}(h)^2
=M^2
+4\sin^2\!\left({2\pi n+\theta_h\over2N}\right)
+4\sin^2\!\left({\pi n_y\over N}\right).
\]

For the complex scalar, the thermal partition function is

\[
\boxed{
\log Z_h
=-2\sum_{n,n_y}
\log\!\left(1-e^{-\beta E_{n n_y}(h)}\right).}
\]

The factor two includes the conjugate charged excitation. The vacuum Casimir term
is omitted deliberately. Its holonomy difference can be meaningful after
renormalization, but the thermal connected response below is manifestly positive
without a contact-term convention.

## 4. Local stress observables and the positive \(H_2\) response

Introduce orthogonal logarithmic metric/strain sources \(u_x,u_y\) through

\[
E^2
=M^2+e^{-2u_x}\widehat p_x^2+e^{-2u_y}\widehat p_y^2.
\]

The one-particle charges conjugate to those strains are

\[
Q_x={\widehat p_x^2\over E},
\qquad
Q_y={\widehat p_y^2\over E}.
\]

They are momentum-space eigenvalues of integrated local diagonal stress operators.
Their one-point thermal stresses are

\[
\langle O_a\rangle_h
={2\over N^2}\sum_{n,n_y}n_B(E)Q_a,
\qquad a\in\{x,y\}.
\]

Define the connected static response

\[
\boxed{
C_{ab}^{(h)}
={2\beta\over N^2}
\sum_{n,n_y}n_B(E)[1+n_B(E)]Q_aQ_b.}
\]

For every real vector \(z\),

\[
z^TC^{(h)}z
={2\beta\over N^2}\sum n_B(1+n_B)(z_xQ_x+z_yQ_y)^2
\ge0.
\]

Thus

\[
C^{(h)}\in H_2(\mathbb R)_+
\]

exactly. This is the connected covariance, or positive spectral part, of the
static susceptibility. The complete second derivative of free energy also has
source-contact or ``diamagnetic'' terms and is not silently identified with this
matrix.

The operator is local even though its expectation depends on the global holonomy.
That distinction is essential: the field propagates around the complete cycle,
so the state in which the local stress is evaluated is globally different.

## 5. Numerical checkpoint

The certificate fixes

\[
N=6,
\qquad M=0.8,
\qquad\beta=1.3.
\]

It obtains

\[
C^{(0)}=
\begin{pmatrix}
0.19154615&0.08415548\\
0.08415548&0.19154615
\end{pmatrix},
\]

and

\[
C^{(1)}=C^{(2)}=
\begin{pmatrix}
0.18849886&0.08525600\\
0.08525600&0.19059036
\end{pmatrix}
\]

to the displayed precision. Their determinants are respectively

\[
0.02960778,
\qquad 0.02865748,
\]

so all lie strictly inside the positive cone.

The partition functions also differ:

\[
\log Z_0=6.46244727,
\qquad
\log Z_1=\log Z_2=6.43724908.
\]

The response-matrix distance between \(h=0\) and \(h=1\) is approximately

\[
3.55\times10^{-3},
\]

while the computed \(h=1\) versus \(h=2\) difference is

\[
1.11\times10^{-16}.
\]

The model therefore answers the first two questions positively: local charged
matter turns flat holonomy into stress response, and the response is positive.

## 6. Exact CP-conjugate degeneracy

Complex conjugation sends

\[
h\mapsto-h\pmod3,
\]

so it exchanges \(h=1\) and \(h=2\). The lattice momentum sets are mapped into
each other by reversing and relabelling the integer momentum. With a CP-even mass,
regulator and stress probe,

\[
\boxed{
Z_1=Z_2,
\qquad
\langle O_a\rangle_1=\langle O_a\rangle_2,
\qquad
C^{(1)}=C^{(2)}.}
\]

Consequently the three holonomy sectors contain only two distinct response
matrices at fixed temperature:

\[
\dim\operatorname{span}\{C^{(0)},C^{(1)},C^{(2)}\}\le2.
\]

The certificate finds rank two. A signed \(h=1\) versus \(h=2\) effect is therefore
not available in this minimal CP-even model. It would require a CP/T-odd probe,
oriented parity-odd term or microscopic CP/T breaking.

## 7. Where the third direction actually comes from

For the square torus and two orthogonal probes, the un-twisted exchange symmetry
forces

\[
C_{xx}=C_{yy}.
\]

The exchange-symmetric matrices form a two-dimensional plane in
\(H_2(\mathbb R)\). Its normal in

\[
v(C)=(C_{xx},C_{yy},\sqrt2 C_{xy})
\]

is

\[
w={1\over\sqrt2}(1,-1,0).
\]

An \(x\)-cycle holonomy shifts \(x\)-momenta but not \(y\)-momenta, and the
nontrivial sector above has

\[
C_{xx}^{(1)}-C_{yy}^{(1)}=-2.09150\times10^{-3}.
\]

The document-1222 first-harmonic construction gives

\[
A_\perp=0.00334696
\]

relative to this toy exchange plane.

No anisotropic kinetic coefficient was used:

\[
t_x=t_y=1.
\]

The oriented holonomy preparation itself supplied the direction. This is a real
third direction relative to the toy's independently fixed exchange-symmetric
null plane.

It is not yet the physical A11 conclusion for two reasons.

First, \(G_2,G_0\) in the four-dimensional stress programme need not equal this
toy exchange plane. The probe embedding must be derived and the physical triple
volume must be computed.

Second, averaging equally over otherwise identical \(x\)- and \(y\)-oriented
holonomies gives

\[
C_{xx}=C_{yy}
\]

again. The verifier finds zero transverse residual after that average. Therefore:

\[
\boxed{
\text{no anisotropic local coefficient is needed, but an oriented cycle and
orientation-retaining probes are needed.}}
\]

If those are inserted merely to obtain the desired result, the model has moved
the unexplained selector into the apparatus.

## 8. The effect is a winding correction, not a local bulk coefficient

Increasing the cycle size suppresses the anisotropy in the certificate:

| Sites per cycle | \(|C_{xx}^{(1)}-C_{yy}^{(1)}|\) |
|---:|---:|
| 3 | \(3.32046\times10^{-2}\) |
| 6 | \(2.09150\times10^{-3}\) |
| 12 | \(5.32294\times10^{-5}\) |

At fixed \(N=6\), increasing the gap also suppresses it:

| Mass | \(|C_{xx}^{(1)}-C_{yy}^{(1)}|\) |
|---:|---:|
| 0.8 | \(2.09150\times10^{-3}\) |
| 1.2 | \(8.96279\times10^{-4}\) |
| 1.6 | \(2.50545\times10^{-4}\) |

This is the expected boundary between topological protection and readable
non-topological memory. A very heavy field preserves approximate BF isolation but
communicates extremely little holonomy-dependent stress. A light field is easier
to read but threatens the claimed isolated topological low-energy sector.

For the displayed fixture, \(A_\perp\approx0.00335\) is below the illustrative
\(0.01\) planning amplitude in document 1225. Neither number is physical, but the
comparison shows why a derived mass and size are prerequisites for a meaningful
power calculation.

## 9. What is proved, and what remains dependent

### Established in the explicit toy

- A strictly local, gauge-consistent, isotropic charged action can read flat
  holonomy through its global mode spectrum.
- Its integrated local stress one-point function is holonomy sensitive.
- Its two-stress connected covariance is a positive \(H_2(\mathbb R)\) matrix.
- CP makes \(h=1\) and \(h=2\) exactly degenerate.
- An oriented holonomy breaks the square exchange symmetry and produces a
  transverse response without an anisotropic kinetic coefficient.
- Orientation averaging removes that transverse response.
- The signal decouples with increasing gap and cycle size.

### Not established

- The typed action has not produced the defect-localized charged scalar.
- Its mass, multiplicity, lifetime and boundary conditions are not predicted.
- The compact oriented cycle is not derived.
- The orthogonal strain probes are not yet identified with the preregistered
  conserved physical probes.
- The toy exchange plane is not proved equal to the physical \(G_2,G_0\) plane.
- The complete distributional bulk/defect/displacement Ward identity is absent.
- Only a static Euclidean covariance is calculated; the real-frequency spectral
  matrix and experimental observable remain open.

## 10. Sharp dependency boundary

The smallest model does **not** encounter a theorem forbidding holonomy-sensitive
positive stress response. It instead exposes the minimum physical dependencies:

\[
\boxed{
\text{gapped residual charge}
+\text{noncontractible oriented cycle}
+\text{orientation-retaining stress probes}.}
\]

Remove the charge and the field cannot see the connection. Make the charge a
multiple of three and it cannot see the residual group. Remove the cycle and the
flat connection is gauge trivial. Average its orientation and the third direction
vanishes. Project the resulting Gram matrix into the original two-form-factor
plane and it merely renormalizes the old response.

The next calculation is therefore no longer ``add a BF--stress coupling.'' It is:

1. derive a localized \(q=1\) or \(q=2\) mode from \(S_{\rm v1}\);
2. solve its boundary spectrum on the actual defect cycle;
3. vary the full action with respect to the physical probe metric;
4. compute the physical triple volume against \(G_2,G_0\);
5. then use document 1225 to determine whether its predicted winding effect is
   detectable.

Physical admission remains false until those dependencies are supplied.

## Evidence

- [Machine-readable toy specification](../../../evidence/data/spin23-a11-gapped-charged-defect-toy.json)
- [Quantitative verifier](../../../verification/verify/verify_spin23_a11_gapped_charged_defect_toy.mjs)
- [Minimal-operator boundary](1227_pure_bf_is_locally_stress_and_flat_holonomy_blind_while_gapped_unit_charged_matter_is_the_minimal_a11_bridge.md)
- [A11 preregistration](1222_a_preregistered_z3_holonomy_response_test_can_separate_a_third_physical_direction_from_ambient_spin23_geometry.md)
- [A11 effect-window budget](1225_the_a11_effect_window_requires_nuisance_projected_power_not_only_a_nonzero_transverse_response.md)
- [Typed action](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md)
