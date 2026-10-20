# Two Matter Channels Close the Copy Frame, but Reduction to One Chiral Family Collapses It at Threshold

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** explicit minimal frame realization plus chiral-threshold rank obstruction

**Depends on:** [the Yukawa Gram obstruction and tight-frame criterion](1573_a_single_tilted_Yukawa_ray_rotates_the_two_copy_inert_projector_but_a_two_ray_tight_frame_can_close_it.md) and [the rank-11 exotic construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md)

**Evidence:** [two-family frame/threshold ledger](../../../evidence/data/spin23-e6-two-family-tight-frame-chiral-threshold.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_two_family_tight_frame_chiral_threshold.mjs)

## Result

Two matter \(27_F\) copies can realize the two-ray tight frame required by
claim 1573.  They do not preserve it after the theory is reduced to exactly
one surviving chiral \(16\).

Let the matter-copy space be \(\mathbb C^2\), with orthogonal symmetric
bilinear channels

\[
M_1=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
M_2=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
\]

For two symmetric-Higgs copies choose

\[
Y^1={M_1+M_2\over\sqrt2},
\qquad
Y^2={M_1-M_2\over\sqrt2}.
\]

Their Hilbert--Schmidt Gram matrix is exactly

\[
\operatorname{Tr}(Y^{a\dagger}Y^b)=\delta^{ab}.
\]

Thus the high-energy Yukawa wave-function source is isotropic in scalar
copy space.  This explicitly realizes the frame cure.

But each matter \(27_F\) subjected to the two E6 singlet masses of claim
1564 has rank eleven and a sixteen-dimensional kernel.  Two copies give

\[
\operatorname{rank}M=22,
\qquad
\dim\ker M=32,
\]

so two chiral \(16\)s survive.  If a vectorlike mass or projector removes
one family, then below that threshold every Yukawa matrix on the surviving
one-dimensional family space is just a number.  For the explicit witness,

\[
y_{\rm eff}={1\over\sqrt2}(1,1),
\]

and the scalar-copy Gram matrix becomes

\[
G_{\rm low}=y_{\rm eff}^\dagger y_{\rm eff}
={1\over2}\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

It has rank one, eigenvalues \((1,0)\), and a nonzero off-diagonal entry.
The tight frame collapses at precisely the threshold that restores the
one-family chiral index.

More generally, one active matter-bilinear channel can produce only one
outer product in the two-dimensional scalar-copy space.  Its Gram rank is
at most one and therefore cannot equal a nonzero multiple of
\(\mathbf1_2\).  Hence

\[
\boxed{
\text{two active source channels close the frame, but one active chiral
family cannot retain that closure by itself}.}
\]

## 1. Positive high-energy construction

The two matrices \(Y^1,Y^2\) are orthonormal:

\[
\begin{aligned}
\operatorname{Tr}(Y^{1\dagger}Y^1)&=1,\\
\operatorname{Tr}(Y^{2\dagger}Y^2)&=1,\\
\operatorname{Tr}(Y^{1\dagger}Y^2)&=0.
\end{aligned}
\]

Equivalently, the two family channels carry the signed copy-space rays
\((1,1)/\sqrt2\) and \((1,-1)/\sqrt2\).  Their frame operator is the
identity, so the one-loop Yukawa anomalous dimension does not choose a
preferred symmetric-Higgs copy axis.

This proves that the tight-frame target is not algebraically empty.  An
ordinary matter multiplicity can realize it with real symmetric Yukawa
matrices.

## 2. Chiral-index cost

The E6-breaking singlet mass operator acts identically on the E6 content
of each matter copy:

\[
M_{\rm break}=I_{\rm family}\otimes
(0_{16}\oplus m_{10}I_{10}\oplus m_1).
\]

Its kernel is

\[
\mathbb C^2_{\rm family}\otimes16,
\]

of dimension 32.  The frame multiplicity is therefore also a family
multiplicity unless another mass mechanism removes one linear combination
of the two \(16\)s.

Adding a conjugate vectorlike \(\overline{27}\) can pair one linear
combination of the two \(27\)s and leave one chiral combination.  This
repairs the chiral count, but it creates a physical threshold at which one
source channel disappears from the active theory.

## 3. Threshold rank theorem

Let the surviving normalized family direction be \(u\in\mathbb C^2\).
Each symmetric family Yukawa matrix descends to the scalar number

\[
y_a^{\rm eff}=u^TY^au.
\]

The low-energy scalar-copy anomalous-dimension tensor is therefore

\[
G^{\rm low}_{ab}=(y_a^{\rm eff})^*y_b^{\rm eff}.
\]

This is one outer product, so

\[
\operatorname{rank}G^{\rm low}\le1.
\]

A nonzero isotropic operator on a two-dimensional copy space has rank two.
No choice of \(u\), phases, or high-energy orthonormal basis can evade the
rank mismatch.  A finite matching term could compensate the loss at one
scale, but continued running below the threshold again has the rank-one
source unless another active relation channel remains.

## 4. Exact verdict

\[
\boxed{
\begin{array}{rcl}
\text{two-family high-energy tight frame}&=&\mathrm{YES},\\
\text{chiral kernel after ordinary E6 singlet masses}&=&32,\\
\text{one-family projection retains tight frame}&=&\mathrm{NO},\\
\text{minimal matter-multiplicity route closes across threshold}&=&\mathrm{NO}.
\end{array}}
\]

This does not rule out the observed multi-family theory.  It rules out
using a second active chiral family merely as an auxiliary frame ray and
then decoupling it while claiming an all-scale one-family Ward line.

## 5. What remains

There are three structurally distinct escapes:

1. retain at least two physical matter/relation channels at every scale
   where the copy-space alignment must be protected;
2. introduce nonmatter degrees of freedom whose loop contributions provide
   the missing counter-ray below the chiral threshold; or
3. derive an exact matching-plus-running identity in which a threshold
   operator replaces the decoupled ray.

The first possibility naturally invites a three-family treatment rather
than an auxiliary-family construction.  The second and third require a
typed correspondence sector beyond ordinary E6 matter multiplicity.

## Spin(2,3) status

The frame requirement and the chiral projector must now be solved together.
A Spin(2,3)-derived relation system cannot supply a beautiful isotropic
frame only above a threshold and then discard one of its rays.  It must
either keep the frame rays as non-chiral relation degrees of freedom or
make their threshold image an exact counterterm bundle.

This sharply separates code/lattice inspiration from proof.  A symmetric
set of rays is useful only if the physical projection to the surviving
chiral support preserves its frame operator.  The next search should test
that compression property explicitly.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_two_family_tight_frame_chiral_threshold.mjs
~~~
