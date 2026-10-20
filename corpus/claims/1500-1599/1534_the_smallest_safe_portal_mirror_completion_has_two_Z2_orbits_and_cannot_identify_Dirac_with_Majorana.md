# The Smallest Safe Portal Mirror Completion Has Two Z2 Orbits and Cannot Identify Dirac with Majorana

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact fixed-Pati--Salam minimal-class no-go with a bounded object-level mirror completion; enlarged gauge/category completion remains open

**Depends on:** [the carrier-sewing exhaustion](1521_no_carrier_operator_can_safely_sew_the_typed_wheels_but_one_coefficient_line_can.md), [the physical scalar/coupling audit](1525_no_sourced_scalar_supplies_the_common_portal_line_so_the_minimal_new_datum_is_an_enforced_dimension_zero_coupling_object.md), [the minimal label Z2](1528_the_minimal_portal_label_symmetry_is_a_Z2_fixed_line_but_its_metric_and_physical_lift_remain_new_data.md), and [the Ward-symmetry no-go](1531_the_portal_label_Z2_is_a_source_projection_not_a_Ward_symmetry_without_a_typed_operator_exchange.md)

**Evidence:** [spectrum-enlargement audit](../../../evidence/data/spin23-portal-exchange-spectrum-enlargement.json) and [executable verifier](../../../verification/verify/verify_spin23_portal_exchange_spectrum_enlargement.mjs)

## Result

No finite addition of ordinary Pati--Salam multiplets can make the **original**
Dirac and Majorana portal monomials exchange partners under a local linear
\(\mathbb Z_2\) that preserves gauge action, family type, finite grading and
\(J\).

There is nevertheless a smallest bounded enlargement that makes the two
*collections of representation types* isomorphic.  Suppressing conjugation
conventions, the original constituent multisets are

\[
\begin{aligned}
C_D&=\{F_L,F_R,H_D\},\\
C_M&=\{F_R,F_R,H_M\},
\end{aligned}
\]

with

\[
F_L=(1_R,2_L,4),
\qquad
F_R=(2_R,1_L,4\text{ or its left-handed conjugate}),
\]

\[
H_D=(2_R,2_L,1)
\]

in the minimal Dirac channel, and

\[
H_M=(3_R,1_L,10)
\quad\text{or}\quad
(1_R,1_L,6)
\]

in the sourced Majorana channel.  The low-energy Majorana portal additionally
carries the \(S_{-3}\) family dressing.

Exact multiset equalization requires at least

\[
\boxed{
\begin{array}{c|c}
\text{side}&\text{new representation copies}\\ \hline
D&F_R+H_M\\
M&F_L+H_D.
\end{array}}
\]

Thus the lower bound is two fermion multiplet copies plus two scalar
representation copies, with the corresponding \(J\)-conjugate states.  The
fermion additions are not isolated neutrinos: gauge covariance closes them
into a complete left--right Pati--Salam family pair across the two sides.

This mirror closure is safe but insufficient.  Its \(\mathbb Z_2\) acts as

\[
\mathcal O_D^A\leftrightarrow\mathcal O_D^B,
\qquad
\mathcal O_M^A\leftrightarrow\mathcal O_M^B,
\]

so the invariant interaction is

\[
\boxed{
\lambda_D(\mathcal O_D^A+\mathcal O_D^B)
+\lambda_M(\mathcal O_M^A+\mathcal O_M^B).}
\]

It has two invariant couplings.  It does not impose
\(\lambda_D=\lambda_M\).

The dichotomy is exact:

\[
\boxed{
\begin{array}{l}
\text{safe type-preserving completion}\Rightarrow
\text{two portal orbits and two couplings},\\
\text{one cross-type orbit}\Rightarrow
\text{forbidden gauge/grading intertwiner and reopened carrier sewing}.
\end{array}}
\]

## 1. Declared minimal class

The no-go is proved in the following class:

1. the gauge group remains
   \(SU(2)_R\times SU(2)_L\times SU(4)\), with the marked family action;
2. finitely many complete field multiplets may be added;
3. the \(\mathbb Z_2\) is local, invertible and linear on elementary fields;
4. it preserves Lorentz parity, gauge kinetic terms, family character,
   finite grading and \(J\), possibly while covering an automorphism of the
   gauge group; and
5. the portal interactions remain renormalizable cubic monomials.

This includes ordinary mirror-sector and partner-field completions.  It does
not include an unspecified nonlocal duality or an enlarged gauge group in
which the present representations are merely branches of larger irreducible
objects.

## 2. Constituent types cannot cross

The selected Dirac portal contains one left and one right fermion type and a
bidoublet scalar.  The selected Majorana portal contains two right types and
a right-triplet or singlet Majorana scalar, together with different family
and finite-support data.

A gauge-compatible transformation sends an elementary field only to a
linear combination of fields in the same representation, or in the image
representation of a gauge automorphism.  Adding more fields increases the
multiplicity of such isotypic blocks; it does not create a map between
inequivalent blocks.

The left--right outer automorphism is not enough.  It can exchange
\(F_L\) and \(F_R\), but a bidoublet remains a bidoublet.  It maps a right
Majorana triplet to a left Majorana triplet, not to \(H_D\).  More generally,
an automorphism cannot map a trivial representation of a factor to a
nontrivial one.

Therefore the image of the original \(\mathcal O_D\) can only be another
Dirac-typed monomial built from partner fields.  It cannot be the original
\(\mathcal O_M\).  The converse holds as well.

## 3. Exact lower bound for object-level isomorphism

Count four coarse constituent types:

\[
(F_L,F_R,H_D,H_M).
\]

Before enlargement the count vectors are

\[
n_D=(1,1,1,0),
\qquad
n_M=(0,2,0,1).
\]

To make the two collections isomorphic using additions only, each component
must be raised to the componentwise maximum

\[
n_{\max}=(1,2,1,1).
\]

Hence

\[
n_{\max}-n_D=(0,1,0,1),
\qquad
n_{\max}-n_M=(1,0,1,0).
\]

Four representation copies are necessary and sufficient at this coarse
level.  The verifier exhausts every distribution of zero through three
added objects and finds none that equalizes the multisets.

This is a lower bound, not a claim that one may add four isolated particle
states.  Each entry denotes a complete gauge multiplet.  The finite real
structure also requires the corresponding conjugate representatives.

## 4. Explicit bounded mirror candidate

Let sector \(A\) contain the original Dirac portal and add the missing
\(F_R^A,H_M^A\), allowing a partner Majorana monomial.  Let sector \(B\)
contain the original Majorana portal and add the missing
\(F_L^B,H_D^B\), allowing a partner Dirac monomial.  Match kinetic
normalizations and define

\[
\begin{aligned}
F_L^A&\leftrightarrow F_L^B,&
H_D^A&\leftrightarrow H_D^B,\\
F_R^A&\leftrightarrow F_R^B,&
H_M^A&\leftrightarrow H_M^B,
\end{aligned}
\]

with the second right-fermion copies paired likewise and the action
duplicated on all \(J\)-conjugates.

This is a well-defined object-level exchange.  Its operator permutation on

\[
(D_A,M_A,D_B,M_B)
\]

is

\[
(D_A\ D_B)(M_A\ M_B).
\]

It has two cycles, so its fixed interaction space has dimension two.  The
candidate proves that representation-balanced mirror closure is attainable;
it simultaneously proves that such closure does not evade claim 1531.

## 5. Why no safer permutation can do better

Every type-preserving permutation preserves the subsets

\[
\{D_A,D_B\},
\qquad
\{M_A,M_B\}.
\]

No such permutation puts \(D_A\) and \(M_B\), or any D/M pair, in one orbit.
The verifier exhausts all four type-preserving permutations of the four
operator labels and confirms this directly.

Reducing the invariant space to one dimension requires a cross-type orbit.
On elementary fields that demands the very maps

\[
F_L\leftrightarrow F_R,
\qquad
H_D\leftrightarrow H_M,
\]

with compatible family dressing and finite grading.  They do not exist in
the fixed group.  Implementing them instead as an off-diagonal finite-carrier
sewing reopens claim 1521: the mixed generators close to \(M_4\) and are odd
on the relation sheet.

Thus adding mirrors can make the inventory symmetric, but cannot make the
original inequivalent morphisms the same symmetry orbit.

## 6. Kinetic metric, J and CP

For a pair exchanged by

\[
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

a diagonal kinetic metric

\[
G=\operatorname{diag}(Z_A,Z_B)
\]

is invariant only if

\[
P^TGP=G
\quad\Longleftrightarrow\quad
Z_A=Z_B.
\]

Unequal metrics conjugate the swap into the weighted reflection already
identified in claim 1528 and reinsert the desired ratio.

The \(Z_2\) must also exchange the \(J\)-conjugate representatives.  This
doubles the finite-Hilbert entries, although it need not denote an
independent physical chiral species in conventions where \(J\) supplies the
antiparticle copy.  Real exchange matrices are CP compatible.  Neither
\(J\) nor CP merges the D- and M-type orbits.

## 7. Gauge and family anomalies

Adding only selected neutrino components is not an available shortcut: it is
not Pati--Salam covariant and has no consistent gauge anomaly audit.

At the level of the minimal complete fermion closure, one
\(F_L=(1,2,4)\) and the left-handed conjugate of one \(F_R\) have opposite
\(SU(4)^3\) contributions:

\[
2A(4)+2A(\overline4)=2-2=0.
\]

Each SU(2) factor sees four doublets, so the Witten parity is even.  A full
Pati--Salam family pair can therefore be gauge-anomaly free.  This is why the
bounded mirror candidate is not rejected merely by non-Abelian anomalies.

The marked family charges remain an independent constraint.  Without a full
charge assignment for every added chiral multiplet, cancellation of mixed
family--gauge, cubic-family and gravitational--family anomalies is not
proved.  Adding representation-conjugate vectorlike partners is a safe
upper-bound construction, but increases the spectrum and still leaves the
two portal-type orbits.

Anomaly freedom therefore can make the insufficient mirror closure
consistent; it cannot convert it into a one-coupling exchange.

## 8. Strongest no-go

Within the declared class:

\[
\boxed{
\begin{minipage}{0.86\linewidth}
No finite addition of Pati--Salam multiplets makes the original Dirac and
Majorana portal monomials exchange partners.  Their constituent type
multisets are not related by a Pati--Salam automorphism.  The smallest
representation-balanced mirror closure adds four complete multiplet copies,
but every gauge-compatible Z2 then has separate D and M operator orbits and
a two-dimensional invariant coupling space.
\end{minipage}}
\]

The theorem does not rule out changing the ambient category in which the
types are defined.  It rules out solving the problem by adding more ordinary
multiplets while keeping the same typed symmetry rules.

## 9. Reopening datum

The exact reopening datum is an enlarged gauge or representation category
\(\widetilde G\) with an involutive automorphism \(\sigma\) such that:

1. restriction to Pati--Salam contains the complete D and M constituent
   complexes in one \(\sigma\)-orbit;
2. \(H_D\) and \(H_M\), as well as their family dressings and gradings, arise
   as exchanged branches of normalized parent representations;
3. the chiral spectrum is anomaly free;
4. kinetic terms, scalar potential, vacuum and \(J\)/CP structure are
   \(\sigma\)-invariant;
5. the operator orbit has exactly one invariant contraction; and
6. restriction does not induce the forbidden claim-1521 carrier sewing.

Without those data, a larger spectrum merely duplicates the two portal
orbits rather than joining them.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_portal_exchange_spectrum_enlargement.mjs
```

The verifier derives the four-multiplet lower bound and exhausts all smaller
additive closures, tests the left--right automorphism, enumerates all
type-preserving portal permutations, computes the two-dimensional invariant
space of the bounded mirror candidate, checks kinetic-metric invariance and
verifies the non-Abelian anomaly count of a complete Pati--Salam family pair.
