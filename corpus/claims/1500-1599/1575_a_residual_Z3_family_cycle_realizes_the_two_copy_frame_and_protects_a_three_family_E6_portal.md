# A Residual Z3 Family Cycle Realizes the Two-Copy Frame and Protects a Three-Family E6 Portal

> **Subsequent topological boundary (claim 1577).** If this Z3 is exact and global, the nonzero charge-two electroweak portal VEV has trivial stabilizer and a three-point degenerate orbit. The high-scale protection remains valid, but the full scalar vacuum must decide whether these are disconnected components producing post-inflationary domain walls. See [1577](1577_the_exact_global_z3_portal_protection_produces_three_electroweak_vacua_and_a_domain_wall_gate.md).

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** explicit positive symmetry/frame/rank construction; full scalar vacuum and normalized portal line remain open

**Depends on:** [the frame-compression obstruction](1574_two_matter_channels_close_the_copy_frame_but_reduction_to_one_chiral_family_collapses_it_at_threshold.md), [the two-copy gauge-orthogonal construction](1571_two_symmetric_E6_copies_create_a_gauge_inert_orthogonal_bidoublet_but_require_a_new_Yukawa_orientation_law.md), and [the rank-11 exotic construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md)

**Evidence:** [Z3 family-frame ledger](../../../evidence/data/spin23-e6-z3-three-family-two-copy-frame.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_z3_three_family_two_copy_frame.mjs)

## Result

The threshold obstruction of claim 1574 disappears if the multiple matter
channels are not auxiliary but are the three observed chiral families.  A
cyclic family action gives an explicit two-copy tight frame while leaving
three chiral \(16\)s after E6 breaking.

Let

\[
\omega=e^{2\pi i/3},
\qquad
P=\begin{pmatrix}0&0&1\\1&0&0\\0&1&0\end{pmatrix},
\]

and let the three matter \(27_F\)s transform as

\[
F\mapsto PF.
\]

For two symmetric-Higgs copies define the family Yukawa matrices

\[
Y_0={1\over\sqrt3}\mathbf1_3,
\qquad
Y_1={1\over\sqrt3}\operatorname{diag}(1,\omega,\omega^2).
\]

They obey

\[
P^TY_0P=Y_0,
\qquad
P^TY_1P=\omega Y_1.
\]

Assign the VEV-bearing copy \(S_0\) the trivial \(Z_3\) character and the
portal copy \(S_1\) character \(\omega^2\).  Both Yukawas are invariant,
while

\[
S_0^\dagger S_1\mapsto\omega^2S_0^\dagger S_1
\]

is forbidden.  Take the symmetric singlet VEV only in \(S_0\), and the
light bidoublet only in \(S_1\).  A neutral \(27_H\) singlet supplies the
other exotic mass.  Because both VEV-bearing multiplets are \(Z_3\)
neutral, the family cycle survives the vacuum and forbids the relative
\(27_H\)--\(S_1\) bidoublet bilinear as well.

The two Yukawa matrices are Hilbert--Schmidt orthonormal:

\[
\operatorname{Tr}(Y_a^\dagger Y_b)=\delta_{ab},
\]

and their family wave-function operator is isotropic:

\[
Y_0Y_0^\dagger+Y_1Y_1^\dagger={2\over3}\mathbf1_3.
\]

Thus the construction simultaneously closes the scalar-copy and family
wave-function Gram tensors at one loop.

For generic nonzero family-diagonal singlet masses, each matter \(27\)
again has exotic rank eleven.  Across three families,

\[
\boxed{\operatorname{rank}M=33,\qquad\dim\ker M=48=3\times16.}
\]

The result is a positive reopening:

\[
\boxed{
\begin{array}{rcl}
\text{three chiral E6 families retained}&=&\mathrm{YES},\\
\text{copy-orthogonal light portal protected by residual }Z_3&=&\mathrm{YES},\\
\text{pure-gauge copy rotation}&=&0,\\
\text{one-loop Yukawa copy rotation}&=&0,\\
\text{complete scalar vacuum and spectrum}&=&\mathrm{OPEN},\\
\text{normalized portal Ward line}&=&\mathrm{OPEN}.
\end{array}}
\]

## 1. The three-ray Parseval frame

Reading the diagonal family entries as rays in the two-dimensional
symmetric-copy space gives

\[
r_0={1\over\sqrt3}(1,1),
\qquad
r_1={1\over\sqrt3}(1,\omega),
\qquad
r_2={1\over\sqrt3}(1,\omega^2).
\]

The root-of-unity identity

\[
1+\omega+\omega^2=0
\]

implies

\[
\sum_{i=0}^2r_i^\dagger r_i=\mathbf1_2.
\]

Each ray has squared norm \(2/3\), and every distinct pair has inner-product
magnitude \(1/3\).  The family orbit is therefore an equal-norm
equiangular Parseval frame.  Unlike the two-ray witness of claim 1573, no
ray needs to be removed: all three label physical chiral families.

## 2. Exact residual protection

The important difference from the multiplicity-one no-go is that the
selector does not act as one phase on the entire matter sector.  It acts on
the three-dimensional E6 multiplicity space through \(P\).  The two matter
bilinear tensors consequently transform in different \(Z_3\) character
sectors, allowing the neutral and charged symmetric-Higgs copies to have
different characters while both Yukawa terms remain invariant.

Assign

\[
q(S_0)=1,
\qquad
q(S_1)=\omega^2,
\qquad
q(27_H)=1.
\]

The \(S_0\) and \(27_H\) singlet VEVs preserve \(Z_3\).  The light
\(S_1\) bidoublet is charged, so both

\[
S_0^\dagger S_1
\quad\text{and}\quad
H_{27}^\dagger H_{S_1}
\]

remain forbidden after E6 breaking.  This is the surviving Ward identity
that was absent in claims 1567 and 1570.

## 3. Gauge and Yukawa loop gates

Gauge interactions are identity-valued in symmetric-copy space by claim
1571.  Since only \(S_0\) has the high-scale singlet VEV, their mixed
Hessian points entirely along the neutral copy and has zero projection on
the charged portal copy.

Yukawa wave-function mixing is controlled by

\[
G_{ab}=\operatorname{Tr}(Y_a^\dagger Y_b).
\]

The displayed matrices give \(G=\mathbf1_2\), so the off-diagonal source
vanishes and both copy axes receive the same diagonal renormalization at
this order.  Conversely,

\[
\sum_aY_aY_a^\dagger={2\over3}\mathbf1_3,
\]

so the same ansatz does not select a preferred family direction through
the simplest matter wave-function tensor.

The exact residual \(Z_3\) is stronger than this one-loop check: it forbids
operators carrying the nontrivial copy character to all orders so long as
the regulator and thresholds respect the family cycle.

## 4. Exotic rank

Choose the neutral \(27_H\) Yukawa matrix and the neutral symmetric-singlet
matrix to be nonsingular; the explicit witness uses identity-type family
matrices.  Then each family receives masses for its Spin(10) \(10+1\) but
not its \(16\).  The mass operator is a family-nonsingular matrix tensored
with the rank-eleven E6 block, so its rank is \(3\times11=33\) and its
kernel is \(\mathbb C^3\otimes16\).

This is precisely where the previous threshold obstruction changes
meaning.  A 48-dimensional kernel is not an unwanted auxiliary doubling;
it is the three-family chiral spectrum.

## 5. What is not yet proved

The witness does not yet establish a complete model.  The remaining tests
are concrete:

1. enumerate the full renormalizable scalar potential compatible with E6
   and the family \(Z_3\);
2. prove an open vacuum with neutral \(27_H\) and \(S_0\) singlet VEVs,
   zero \(S_1\) singlet VEV, and no charged instability;
3. obtain one light \(S_1\) bidoublet while all unwanted charged-copy
   scalars are heavy;
4. compute scalar-quartic and finite-threshold corrections, verifying the
   residual \(Z_3\) at every matching surface; and
5. test whether the surviving Dirac and Majorana branches form the
   normalized parallel source bundle rather than merely sharing \(Y_1\).

The charged portal bidoublet will eventually break the family \(Z_3\) when
it acquires an electroweak VEV.  The construction protects its alignment
through the E6 matching regime, but post-electroweak higher-dimensional
mixing, possible domain walls, and the required symmetry-breaking history
remain additional admission tests.

The frame construction passes more gates than the earlier E6 attempts, but
it does not by itself determine observed flavor hierarchies or mixing.

## Spin(2,3), A2, Golay and Leech status

The family rays are the three-character orbit of \(Z_3\), and their
root-of-unity cancellation is the elementary \(A_2\) Fourier identity.
This is a legitimate structural bridge to the programme's repeated
three-fold and frame geometry.

It is also the correct scale at which ternary-code inspiration may enter:
a ternary Golay or Leech-related construction could organize larger sets
of such character rays and their compression properties.  Nothing here
derives those codes, the Leech lattice, or physical flavor data.  The
present result supplies the local seed they would have to extend: an
equal-norm character orbit whose frame operator survives projection onto
the physical chiral support.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_z3_three_family_two_copy_frame.mjs
~~~
