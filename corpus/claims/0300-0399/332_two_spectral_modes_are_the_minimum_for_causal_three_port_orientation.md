# Two Spectral Modes Are the Minimum for Causal Three-Port Orientation

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B08 and B11  
**Claim status:** exact finite-dimensional passive realization and minimal spectral-rank theorem; identification with physical neutrino flavor ports remains open

## 1. The causal completion is immediate once the residue is positive

Let (R\in H_3(\mathbb C)_+) be the positive three-port matrix constructed in the Majorana-holonomy branch. For any real pole (s_0),

\[
G(z)=\frac{R}{s_0-z}
\]

is a matrix-valued Herglotz function. If (\operatorname{Im}z>0), then

\[
\operatorname{Im}G(z)
=\frac{\operatorname{Im}z}{|s_0-z|^2}R\succeq0.
\]

Below the pole, (z<s_0), the scalar multiplier is real and positive, so the edge-loop phase of (R) is unchanged. Thus the positive static completion from the preceding document already admits an exact passive causal continuation.

What remains physical rather than mathematical is whether neutrino flavor observables actually furnish these ports and this response.

## 2. One spectral mode cannot carry orientation

For a rank-one positive residue

\[
R=aa^\dagger,
\qquad
R_{ij}=a_i\bar a_j,
\]

the triangle is

\[
R_{12}R_{23}R_{31}
=a_1\bar a_2a_2\bar a_3a_3\bar a_1
=|a_1a_2a_3|^2\in\mathbb R_{\ge0}.
\]

Therefore

\[
\boxed{
\operatorname{rank}R=1
\quad\Longrightarrow\quad
\operatorname{Im}(R_{12}R_{23}R_{31})=0.}
\]

A single coherent spectral carrier may connect all three ports, but it cannot orient their loop.

## 3. Two modes suffice

Choose

\[
a=(1,1,1)^T,
\qquad
b=(1,i,2+i)^T.
\]

The rank-two positive matrix

\[
R=aa^\dagger+bb^\dagger
\]

has edges

\[
R_{12}=1-i,
\qquad
R_{23}=2+2i,
\qquad
R_{31}=3+i,
\]

and hence

\[
R_{12}R_{23}R_{31}=12+4i.
\]

Thus rank two is both necessary and sufficient for a nonreal positive three-port loop.

The orientation is not a property of either mode alone. It is a cross-mode interference invariant.

## 4. A nondegenerate causal realization

Place the two modes at distinct positive spectral locations and add only a diagonal port-local completion:

\[
\boxed{
G(z)
=\frac{aa^\dagger}{2-z}
+\frac{bb^\dagger}{3-z}
+\frac{I_3}{5-z}.}
\]

For every (\operatorname{Im}z>0),

\[
\operatorname{Im}G(z)
=\sum_{s\in\{2,3,5\}}
\frac{\operatorname{Im}z}{|s-z|^2}R_s
\succ0,
\]

where \(R_2=aa^\dagger\), \(R_3=bb^\dagger\), and \(R_5=I_3\). This is a strict passive Herglotz response and decays as \(1/z\) at large frequency.

At the real off-shell point (z=0), its edge loop is

\[
\boxed{
G_{12}(0)G_{23}(0)G_{31}(0)
=\frac{157}{216}+\frac{5}{18}i.}
\]

The identity residue changes only the diagonal entries, making the matrix strictly positive without changing the oriented edge loop.

## 5. Local (Spin(2,3)), global complex gluing

At a real frequency below all poles, each two-port principal face is positive Hermitian. Each individual edge can be made real by one relative port phase, so each face admits the local real Jordan carrier

\[
H_2(\mathbb R)_+
\quad\leadsto\quad
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

But the nonzero imaginary part of the triangle forbids one vertex-phase convention that realifies all three edges. The causal response therefore realizes exactly the structure sought in the previous branch:

\[
\boxed{
\text{three local real }Spin(2,3)\text{ faces}
\quad+\quad
\text{one globally complex }H_3(\mathbb C)\text{ gluing}.}
\]

## 6. What this does and does not establish

Established here:

- positive spectral residues;
- analyticity away from real poles;
- strict matrix Herglotz passivity;
- nonzero gauge-invariant loop orientation;
- rank two as the minimum number of coherent spectral directions;
- local realifiability and global real-form obstruction.

Not yet established:

- that the ports are the physical charged-lepton or neutrino flavor channels;
- that the response loop equals the measured low-energy Majorana invariant after propagation, production and detection are included;
- that the exceptional coefficient (c) fixes the two spectral vectors and pole locations;
- that a Standard-Model stress tensor generates this response rather than merely permitting it.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the same two source directions derived from the exceptional determinant reproduce the measured three-flavor CP orientation and pole data without arbitrary phase fitting.

**Minimality falsifier:** a rank-one positive Hermitian residue with a nonreal edge triangle.

**Passivity falsifier:** an upper-half-plane point where the stated (G(z)) has a negative imaginary quadratic form.

**Local/global falsifier:** a single vertex gauge makes all three displayed edges real despite their nonreal product.

**Physics falsifier:** the response can be written mathematically but no gauge-invariant production/detection observable can access its loop.

## 8. Certificate

The [two-mode Herglotz holonomy certificate](../../../verification/verify/verify_two_mode_holonomy_h_Herglotz_response.mjs) checks the rank-one no-orientation theorem, the exact rank-two loop, strict positive completion, sampled upper-half-plane passivity, local edge realification and global obstruction.

## Companion documents

- [Majorana CP as three-port holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Weak-basis Majorana triangle invariant](330_the_exceptional_majorana_phase_has_a_weak_basis_three_projector_triangle_invariant.md)
- [Lorentzian passivity and causal response](../0000-0099/70_lorentzian_passivity_and_causal_response.md)
- [Lorentzian pole residues and channel positivity](../0000-0099/76_lorentzian_pole_residues_and_channel_positivity.md)
- [Spectral wedge and phase curvature](../0100-0199/137_spectral_wedge_and_phase_curvature.md)
