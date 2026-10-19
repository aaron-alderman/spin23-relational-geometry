# Majorana CP Is the Holonomy Obstructing Three Local \(Spin(2,3)\) Edges from One Global Real Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact three-port holonomy, positivity and Schur-interference construction; physical flavor-port response and measurement protocol remain open

## 1. Turn the Majorana triangle into response edges

Work in the charged-lepton spectral frame and assume nonzero diagonal Majorana entries. Choose square roots of the three diagonal entries and define

\[
\boxed{
r_{ij}
=\sqrt{M_{ii}M_{jj}}\;M_{ij}^*.}
\]

Changing the sign of one square root flips the two incident edges, so the closed loop is branch independent:

\[
\begin{aligned}
r_{12}r_{23}r_{31}
&=
M_{11}M_{22}M_{33}
(M_{12}M_{23}M_{31})^*.
\end{aligned}
\]

Therefore

\[
\boxed{
\mathcal I_\triangle
=-\operatorname{Im}(r_{12}r_{23}r_{31}).}
\]

The weak-basis projector invariant now has an exact three-port loop realization.

## 2. Port-gauge transformation

Under charged-flavor rephasing, the square-root convention induces a vertex gauge transformation

\[
r_{ij}\mapsto
e^{i(\theta_i-\theta_j)}r_{ij}.
\]

The loop is invariant:

\[
r_{12}r_{23}r_{31}
\mapsto
r_{12}r_{23}r_{31}.
\]

Its phase is a \(U(1)\) holonomy around the flavor triangle.

The square-root signs are the \(\mathbb Z_2\) subgroup of this vertex gauge freedom.

## 3. Positive Hermitian three-port completion

Embed the edges in

\[
R=
\begin{pmatrix}
a&r_{12}&\bar r_{31}\\
\bar r_{12}&b&r_{23}\\
r_{31}&\bar r_{23}&c
\end{pmatrix}
\in H_3(\mathbb C).
\]

Choose positive diagonal responses large enough for strict diagonal dominance:

\[
a>|r_{12}|+|r_{31}|,
\]

and cyclically. Then

\[
R>0.
\]

Its determinant is

\[
\det R
=abc
+2\operatorname{Re}(r_{12}r_{23}r_{31})
-a|r_{23}|^2
-b|r_{31}|^2
-c|r_{12}|^2.
\]

The determinant controls positive cubic consistency. The independent quantity

\[
\operatorname{Im}(r_{12}r_{23}r_{31})
\]

is the orientation holonomy.

## 4. Every edge is locally a \(Spin(2,3)\) carrier

Each principal edge is

\[
R_{ij}=
\begin{pmatrix}
a_i&r_{ij}\\
\bar r_{ij}&a_j
\end{pmatrix}
\in H_2(\mathbb C)_+.
\]

For one edge, choose a relative port phase that makes \(r_{ij}\) real. Then

\[
R_{ij}\longrightarrow H_2(\mathbb R)_+,
\]

whose conformal group is

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

Thus every pairwise flavor relationship admits a local \(Spin(2,3)\) real carrier.

## 5. Global realification theorem

To make all three edges real using one set of vertex phases, solve

\[
\arg r_{ij}+\theta_i-\theta_j
\in\pi\mathbb Z
\]

for all three edges.

Adding the three equations gives the necessary and sufficient cycle condition

\[
\boxed{
\arg(r_{12}r_{23}r_{31})
\in\pi\mathbb Z.}
\]

Equivalently,

\[
\boxed{
\operatorname{Im}(r_{12}r_{23}r_{31})=0.}
\]

Therefore

\[
\boxed{
\mathcal I_\triangle\ne0
\quad\Longleftrightarrow\quad
\text{the three local }H_2(\mathbb R)\text{ faces do not glue to one }H_3(\mathbb R)\text{ carrier}.}
\]

The required global carrier is \(H_3(\mathbb C)\).

This is a precise local-versus-global formulation of the programme’s phase-shift narrative.

## 6. Exceptional checkpoint

For

\[
M_R=
\begin{pmatrix}
5&2&1\\
2&7&i\\
1&i&11
\end{pmatrix},
\]

the edge loop is

\[
r_{12}r_{23}r_{31}=-770i.
\]

Hence

\[
\mathcal I_\triangle=770.
\]

All three two-port faces can individually be made real, yet no single three-port phase convention makes them simultaneously real.

## 7. Schur elimination retains the orientation as path interference

Write

\[
u=r_{12},
\qquad
v=r_{23},
\qquad
w=r_{31}.
\]

Eliminating port three gives the effective edge

\[
u_{\rm eff}
=u-\frac{\bar w\,\bar v}{c}.
\]

The second term is the indirect path \(1\to3\to2\). Let

\[
q=\frac{\bar w\,\bar v}{c}.
\]

Then

\[
\boxed{
\operatorname{Im}(u\bar q)
=\frac1c\operatorname{Im}(uvw).}
\]

The loop orientation survives Schur reduction as the phase difference between the direct relationship and the path through the eliminated port.

The effective two-port matrix alone can again be locally realified. Recovering the CP orientation requires remembering its direct/indirect decomposition or varying frequency so the two paths acquire distinguishable spectral dependence.

## 8. Relation to causal response

A physical realization should promote the static edges to retarded transfer functions

\[
r_{ij}(z).
\]

The loop holonomy becomes

\[
\Phi(z)=\arg[r_{12}(z)r_{23}(z)r_{31}(z)].
\]

Passivity requires a positive matrix-valued spectral density or Herglotz imaginary part, not merely arbitrary complex edges. The diagonally dominant construction proves positive completion is possible at a fixed frequency; it does not derive a causal spectrum.

The observable route is phase-resolved three-port spectroscopy:

- measure the direct edge;
- eliminate or detune the third port;
- reconstruct the indirect Schur path;
- extract \(\operatorname{Im}(u\bar q)\).

## 9. Consequence for the \(Spin(2,3)\) pole narrative

\(Spin(2,3)\) remains the correct local conformal symmetry of every real two-face reduction. The nonzero Majorana phase says those local reductions possess nontrivial transition functions around the three-face loop.

The global object is not one larger \(Spin(2,3)\) carrier. It is a complex rank-three Jordan response whose local real faces are glued with \(U(1)\) holonomy.

This gives a precise version of:

\[
\boxed{
\text{locally real relational geometry}
+\text{globally oriented phase holonomy}.}
\]

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** a physical three-flavor neutral response realizes the edge amplitudes above, remains passive/causal and measures the same \(\mathcal I_\triangle\) inferred from neutrino data.

**Schur trigger:** controlled elimination of one flavor port reveals the predicted direct/indirect interference phase.

**Exceptional trigger:** the sign-projected determinant coefficient \(c\) fixes the measured holonomy.

**Local-real falsifier:** one two-port edge with no admissible real phase convention would invalidate the claimed local \(H_2(\mathbb R)\) cover.

**Global-real falsifier:** a nonzero loop imaginary part is claimed while one global phase convention makes all three edges real.

**Passivity falsifier:** the proposed response has no positive Hermitian or Herglotz completion.

**Observable falsifier:** the Majorana mass monomial is called a measured response without constructing flavor-tagged ports and transfer amplitudes.

## 11. Certificate

The [Majorana triangle three-port holonomy certificate](../../../verification/verify/verify_majorana_triangle_three_port_holonomy_and_schur_interference.mjs) checks the exact edge-loop identity, positive \(H_3(\mathbb C)\) completion, port-gauge invariance, local-versus-global realification obstruction and survival under Schur elimination as path interference.

## Companion documents

- [Weak-basis Majorana triangle invariant](330_the_exceptional_majorana_phase_has_a_weak_basis_three_projector_triangle_invariant.md)
- [Three-port cubic consistency and edge reduction](../0200-0299/200_three_port_h3r_cubic_consistency_and_spin23_edge_reduction.md)
- [Three-boundary Peirce–Schur recursion](../0200-0299/203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
- [Spectral wedge and phase curvature](../0100-0199/137_spectral_wedge_and_phase_curvature.md)
- [Matrix-interior Schur covariance](../0200-0299/267_matrix_interior_schur_covariance_needs_no_commutativity.md)
