# Eight-Body-Diagonal Weyl Walk and the Null-Speed Gate

**Date:** 17 October 2026  
**Branches:** B07, B08, B11 and B13  
**Claim status:** exact free \(3+1\)-dimensional two-component walk; gauge, anomaly and selector completions remain open

## 1. The smallest explicit three-dimensional test

Let

\[
S_j(k_j)=e^{-ik_j\sigma_j},\qquad j=x,y,z,
\]

and define one clock step by

\[
\boxed{U(\mathbf k)=S_z(k_z)S_y(k_y)S_x(k_x).}
\]

Every factor is unitary with determinant one, so \(U(\mathbf k)\in SU(2)\) exactly. No scalar averaging or nonunitary collision rule is used.

Using \(e^{-ik_j\sigma_j}=e^{-ik_j}P_j^++e^{ik_j}P_j^-\), with \(P_j^\pm=(I\pm\sigma_j)/2\), gives

\[
U(\mathbf k)=
\sum_{\epsilon_x,\epsilon_y,\epsilon_z=\pm1}
e^{-i(\epsilon_xk_x+\epsilon_yk_y+\epsilon_zk_z)}
P_z^{\epsilon_z}P_y^{\epsilon_y}P_x^{\epsilon_x}.
\]

All eight projector products are nonzero. The one-tick position-space kernel therefore has precisely the eight body-diagonal dependencies

\[
\Delta\mathbf x=a(\epsilon_x,\epsilon_y,\epsilon_z).
\]

## 2. Exact null support versus observed Weyl speed

Each dependency has length \(\sqrt3a\). If every one-tick edge is required to be null in a metric with limiting speed \(c\), then

\[
\Delta t=\frac{\sqrt3a}{c}.
\]

For small momentum,

\[
U(\mathbf k)
=I-i(k_x\sigma_x+k_y\sigma_y+k_z\sigma_z)+O(k^2),
\]

so the continuum Hamiltonian is

\[
H_{\rm eff}
=\frac{a}{\Delta t}\,\boldsymbol\sigma\cdot\mathbf p
=\frac{c}{\sqrt3}\,\boldsymbol\sigma\cdot\mathbf p.
\]

Thus this explicit unitary construction reproduces the same speed reduction found in the scalar moment calculation:

\[
\boxed{c_{\rm Weyl}=c/\sqrt3.}
\]

Choosing \(\Delta t=a/c\) restores the desired Weyl slope \(c\), but then the body-diagonal dependencies have speed \(\sqrt3c\) and are spacelike relative to that metric. In this model, literal null links and identification of the microscopic metric speed with the observed Weyl speed cannot both hold.

One may instead declare \(c_{\rm micro}=\sqrt3c_{\rm observed}\), but that is a two-speed hypothesis requiring a physical account of which speed enters the spacetime metric.

## 3. Exact dispersion and cubic anisotropy

Write

\[
U=dI-i\mathbf v\cdot\boldsymbol\sigma.
\]

The scalar part is

\[
\boxed{
d(\mathbf k)=
\cos k_x\cos k_y\cos k_z
+\sin k_x\sin k_y\sin k_z,
}
\]

and \(d^2+|\mathbf v|^2=1\). Hence the quasienergies \(e^{\mp i\omega}\) obey

\[
\cos\omega=d(\mathbf k).
\]

The linear Weyl cone is rotationally isotropic. The cubic term \(\sin k_x\sin k_y\sin k_z\), and the ordered product itself, retain only the discrete lattice symmetry. Rotational breaking therefore returns beyond leading order.

The order of the three shifts is also physical at finite lattice spacing: changing it changes the commutator corrections while leaving the first-order Weyl generator unchanged. The continuum limit does not select an ordering.

## 4. Zero- and \(\pi\)-quasienergy species

At every Brillouin corner \(k_j\in\{0,\pi\}\), each shift is \(\pm I\). Therefore

\[
U(\mathbf k)=(-1)^{N_\pi}I,
\]

where \(N_\pi\) is the number of components equal to \(\pi\). There are

- four even-parity corners at quasienergy zero;
- four odd-parity corners at quasienergy \(\pi\).

The construction therefore supplies an explicit \(3+1\)-dimensional Weyl infrared cone, but not a single global Weyl species. The ultraviolet completion contains both ordinary and Floquet-zone-edge duplicates. Exact unitarity and exact body-diagonal support have not solved the chiral regulator problem.

## 5. Why this is still useful

This is more than a discretized scalar wave:

- the carrier is a two-component spinor;
- the continuum generator is the Weyl operator;
- all eight causal dependencies and their matrix amplitudes are explicit;
- the speed and anisotropy costs are calculable;
- the complete zero/\(pi\) corner count is visible.

It also isolates what a successful replacement must improve. A candidate Standard-Model walk must change the global topology or enlarge the internal/boundary structure so that the unwanted corners are gapped or reinterpreted, without losing locality, gauge covariance or anomaly flow.

## 6. Relation to the Jordan/\(Spin(2,3)\) programme

The walk realizes one carrier, two spinor eigenfaces and three ordered conditional relations. Its two-port resolvent can be treated by the boundary-response machinery already developed, but that alone does not select this walk: any suitable finite unitary can generate a positive response.

The high-value bridge would be stronger:

\[
\text{Jordan/Furey incidence}
\Longrightarrow
\text{shift ordering and coin amplitudes}
\Longrightarrow
\text{one anomaly-correct Weyl sector}.
\]

Until that implication exists, \(Spin(2,3)\) organizes the response kinematics and not the microscopic chiral selection.

## 7. Open paths

### Path A: all-null repair

Search for a larger internal coin or multi-cell unit that retains only null one-tick dependencies while independently gapping the zero and \(\pi\) duplicates.

### Path B: causal but not all-null split step

Use partial shifts and temporal transporters, accepting timelike local edges, to gain independent gap control.

### Path C: boundary/domain-wall chirality

Treat the extra dimension or boundary polarization as the source of the net Weyl index. This sacrifices a strictly three-dimensional elementary carrier but has a known route to anomaly inflow.

### Path D: emergent metric

Let the matter cone define \(c_{\rm observed}=c_{\rm micro}/\sqrt3\), then prove that every other low-energy species and the gravitational sector share the same emergent cone. Without universality this is ruled out by Lorentz tests.

## 8. Stop-everything and falsification gates

**All-null success:** a finite-range unitary on null body-diagonal edges has one desired low-energy Weyl sector, a gapped \(\pi\) sector and the correct gauge anomaly.

**Universal-cone success:** all light fields derive the same emergent speed despite a distinct microscopic null speed, with calculably suppressed anisotropy.

**Jordan selection:** the ternary or boundary sewing law fixes the shift ordering and removes arbitrary regulator parameters.

**Topology failure:** every local all-null construction in the chosen carrier class has zero net chirality or unavoidable zero/\(\pi\) partners.

**Metric failure:** the only repair requires species-dependent limiting speeds or observable cubic anisotropy.

## 9. Certificate

The [eight-body-diagonal Weyl-walk certificate](scripts/verify_eight_body_diagonal_weyl_walk.mjs) verifies exact quaternionic unitarity, the dispersion formula, all eight nonzero position-space amplitudes, exact null lengths, the \(c/\sqrt3\) continuum speed, the linear Weyl generator and the four-zero/four-\(\pi\) corner count.

## Companion documents

- [Higher-dimensional null-direction tradeoff](145_higher_dimensional_null_direction_tradeoff.md)
- [Lattice-fermion doubling gate](146_lattice_fermion_doubling_gate.md)
- [Split-step zero/\(pi\) gap tradeoff](153_split_step_walk_zero_pi_gap_tradeoff.md)
- [Full substep gauge covariance](155_spacetime_gauge_split_step_temporal_links.md)
- [Walk resolvent and the Siegel domain](159_walk_siegel_resolvent_and_sp4_domain.md)
