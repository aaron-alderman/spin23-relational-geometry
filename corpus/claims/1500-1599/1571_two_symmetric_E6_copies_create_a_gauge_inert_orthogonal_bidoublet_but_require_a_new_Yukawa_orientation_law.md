# Two Symmetric E6 Copies Create a Gauge-Inert Orthogonal Bidoublet but Require a New Yukawa-Orientation Law

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** minimal multiplicity escape criterion; pure-gauge obstruction evaded, normalized portal not yet derived

**Depends on:** [the multiplicity-one selector no-go](1570_every_ordinary_multiplicity_one_internal_selector_preserving_E6_allows_the_nonfactorized_quartic.md), [the gauge-loop source theorem](1569_pure_E6_gauge_loops_source_the_nonfactorized_mixed_quartic_and_close_the_lambda2_zero_surface.md), and [the rank-11 exotic construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md)

**Evidence:** [two-copy alignment ledger](../../../evidence/data/spin23-e6-two-copy-orthogonal-bidoublet-escape.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_two_copy_orthogonal_bidoublet_escape.mjs)

## Result

Adding a second copy of the symmetric E6 Higgs representation creates the
first genuine escape from the pure-gauge mixing obstruction.  Let

\[
S_a\in351'_H,\qquad a=1,2,
\]

and let \(w_a\) be the copy-space vector of symmetric-singlet VEVs.  Gauge
vertices preserve the canonical copy index, so claim 1569 lifts to

\[
K_{\rm gauge}^{(2)}=
\sum_{a=1}^2\left({28\over9}I_{1,a}+20I_{2,a}\right).
\]

The gauge tensor is proportional to the identity in copy space and has no
off-diagonal \(S_1^\dagger S_2\) component.  Consequently the gauge-induced
mixing covector between the \(27_H\) bidoublet and the two symmetric-parent
bidoublets is aligned with the conjugate VEV covector:

\[
B_a^{\rm gauge}=-2\sqrt{10}\,C_g,v\,\bar w_a,
\]

where \(C_g\) contains the common loop and coupling normalization.  A
light symmetric bidoublet

\[
H_d=d_aH_{S_a},
\qquad
w^\dagger d=0,
\]

therefore obeys

\[
\boxed{B^{\rm gauge}(d)=0.}
\]

This is an identity, not a cancellation among gauge couplings.  Two copies
thus reopen the gauge-inert route that was impossible at multiplicity one.

The price appears in the Yukawa sector.  If \(y_a\) is the copy-space
Yukawa covector multiplying the unique E6 index contraction, then

\[
m_1\propto y_aw_a,
\qquad
g_D\propto y_ad_a.
\]

Both the exotic-singlet mass and the light portal are nonzero only if

\[
\boxed{(y\cdot w)(y\cdot d)\ne0.}
\]

In the aligned basis \(w=(|w|,0)\), \(d=(0,1)\), this requires
\(y_\parallel\ne0\) and \(y_\perp\ne0\).  Their projective ratio is a new
orientation datum.  Multiplicity alone supplies room for the solution but
does not derive that ratio or its RG/threshold stability.

## 1. Why gauge loops are copy diagonal

The covariant kinetic term is

\[
\sum_a\operatorname{tr}
 (D_\mu S_a)^\dagger(D^\mu S_a).
\]

Every gauge vertex carries a Kronecker delta on the spectator copy index.
The field-dependent gauge-boson mass matrix is therefore the sum of the
two individual copy contributions.  The mixed term in
\(\operatorname{Tr}(M_V^4)\) involving \(27_H\) is likewise a sum over
\(a\), not a double sum over independent \(a,b\).  In copy-space notation,

\[
\Lambda^{\rm gauge}_{ab}propto\delta_{ab}.
\]

Using the single-copy decomposition from claim 1569 gives the displayed
\((28/9,20)\) coefficients for each diagonal entry.  No new E6 generator
contraction is required: multiplicity is a spectator identity factor.

## 2. Orthogonal-copy alignment

At the rank-11 background, the mixed Hessian of one \(I_{2,a}\) is

\[
-{v\bar w_a\over\sqrt{10}}.
\]

Multiplication by the gauge coefficient 20 gives

\[
B_a^{\rm gauge}=-2\sqrt{10}\,C_gv\bar w_a.
\]

For a normalized direction \(d\), its projected entry is proportional to

\[
\sum_a w_a^*d_a=w^\dagger d.
\]

Because the copy space has complex dimension two, every nonzero \(w\) has
a one-dimensional orthogonal complement.  The corresponding symmetric
bidoublet is exactly blind to the pure-gauge mixing source.

This does not assert that the complete scalar mass matrix automatically
selects that direction as light.  It identifies the target eigenvector
and proves that gauge loops do not rotate it toward the VEV-parallel
direction.

## 3. Yukawa geometry

With two identical scalar copies, the most general matter Yukawa is

\[
\mathcal L_Y\supset
y_a(27_F27_F)_{351'}S_a+\mathrm{h.c.}
\]

The E6 tensor contraction is unique, but multiplicity turns its coefficient
into a covector \(y\in(\mathbb C^2)^*\).  The symmetric-singlet mass samples
the VEV projection \(y\cdot w\), while the light Dirac portal samples the
orthogonal projection \(y\cdot d\).

If \(y\parallel w^\dagger\), the mass is present but the orthogonal portal
vanishes.  If \(y\parallel d^\dagger\), the portal is present but the
singlet mass vanishes.  Both require a tilted Yukawa covector.

After using the copy-basis freedom to align \(w\) and \(d\), the physically
relevant new datum is

\[
\rho_y={y_\perp\over y_\parallel}.
\]

An arbitrary \(\rho_y\) restores a free transverse source direction.  A
successful completion must fix it through a symmetry, correspondence map,
or master spurion and then show that the fixed ray is parallel under RG
flow and thresholds.

## 4. Exact boundary of the positive result

The two-copy construction proves

\[
\boxed{
\begin{array}{rcl}
\text{copy-orthogonal symmetric bidoublet exists}&=&\mathrm{YES},\\
\text{pure-gauge mixing into it}&=&0,\\
\text{simultaneous mass and portal kinematically possible}&=&\mathrm{YES},\\
\text{Yukawa orientation fixed by multiplicity alone}&=&\mathrm{NO},\\
\text{normalized portal Ward line derived}&=&\mathrm{NO}.
\end{array}}
\]

Scalar quartics and Yukawa loops can contain additional copy-space tensors
once \(y\) and scalar couplings break the kinetic \(U(2)\).  The next test
is therefore not another gauge contraction.  It is the spurion-closure
problem: find the smallest symmetry algebra that fixes \(w\), \(d\), and
\(y\) in compatible directions and makes the orthogonal projector stable
under every allowed coupling.

## Spin(2,3) status

This is the first point in the E6 branch where a relation-space action has
a concrete finite carrier.  The two-dimensional copy space can host a
Spin(2,3)-derived involution, grading, or complex structure with
complementary eigendirections \(w\) and \(d\).  The missing datum is then a
typed covector \(y\) with fixed nonzero projections on both directions.

That proposal is falsifiable.  A candidate correspondence law must:

1. make \(w^\dagger d=0\) an invariant statement;
2. permit \((y\cdot w)(y\cdot d)\ne0\);
3. forbid or lock every scalar/Yukawa spurion that would rotate the
   orthogonal projector; and
4. preserve the resulting projective ratio through matching.

Beauty here is useful as a search guide: the minimal desired object is a
two-state relation carrier whose orthogonal axes separate breaking from
the light portal, while one fixed diagonal covector sees both.  The claim
does not identify that object with Spin(2,3); it states exactly what such
an identification would have to accomplish.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_two_copy_orthogonal_bidoublet_escape.mjs
~~~
