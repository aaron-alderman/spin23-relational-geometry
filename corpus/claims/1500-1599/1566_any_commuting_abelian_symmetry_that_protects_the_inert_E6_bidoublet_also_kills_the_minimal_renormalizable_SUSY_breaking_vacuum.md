# Any Commuting Abelian Symmetry That Protects the Inert E6 Bidoublet Also Kills the Minimal Renormalizable SUSY Breaking Vacuum

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact charge and F-term no-go in the minimal two-pair renormalizable supersymmetric E6 Higgs system; non-supersymmetric, nonrenormalizable and enlarged-field escapes remain open

**Depends on:** [the inert-alignment construction](1565_a_pure_351_bidoublet_requires_zero_27_351_mixing_but_the_minimal_realistic_E6_vacuum_uses_that_mixing.md), [the exotic-rank construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md), and [the E6 four-carrier synthesis](1563_E6_reopens_the_27_and_54_carriers_but_one_parent_invariant_still_does_not_make_a_physical_portal_Ward_line.md)

**Primary source:** [the complete renormalizable supersymmetric E6 Higgs superpotential](https://arxiv.org/abs/1311.0775)

**Evidence:** [abelian-protection no-go ledger](../../../evidence/data/spin23-e6-inert-abelian-susy-vacuum-no-go.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_inert_abelian_susy_vacuum_no_go.mjs)

## Result

Claim 1565 exhibited a \(\mathbb Z_5\) charge assignment that allows both
matter Yukawas while forbidding the mixed scalar invariant responsible for
27--351-prime bidoublet mixing.  In the minimal renormalizable
supersymmetric E6 Higgs system, that escape cannot also produce a nonzero
breaking vacuum.

Let the matter \(27_F\) have charge \(f\), the Higgs \(27_H\) have charge
\(h\), and the symmetric two-matter-27 Yukawa scalar
\(\mathcal S_{351,H}\) have charge \(s\) under any abelian symmetry that
commutes with E6.  Allowing both Yukawas gives

\[
2f+h=0,
\qquad
2f+s=0,
\qquad
\Longrightarrow
\qquad h=s=-2f.
\]

Every holomorphic cubic built from three unbarred Higgs factors then has the
same symmetry charge:

\[
q(H^3)=q(H^2\mathcal S)=q(H\mathcal S^2)
=q(\mathcal S^3)=3h.
\]

The conjugate cubics all have charge \(-3h\).  Therefore forbidding the
dangerous mixed term requires

\[
3h\ne0,
\]

which simultaneously forbids all same-orientation Higgs cubics.  The
renormalizable Higgs superpotential is reduced to the quadratic masses

\[
W=m_{27}H\overline H+m_{351}\mathcal S\overline{\mathcal S}.
\]

For nonzero masses its F-term equations are

\[
m_{27}\overline H=m_{27}H=0,
\qquad
m_{351}\overline{\mathcal S}=m_{351}\mathcal S=0,
\]

so the only supersymmetric vacuum is

\[
H=\overline H=\mathcal S=\overline{\mathcal S}=0.
\]

No E6 breaking and no exotic-mass singlet VEV remains.

Conversely, if \(3h=0\) so that any same-orientation cubic can be retained,
then

\[
q(H^2\mathcal S)=2h+s=3h=0,
\]

and the dangerous mixed invariant is allowed.  The dichotomy is exact:

\[
\boxed{
\begin{array}{ll}
3h\ne0:&\text{inert mixing protected, but all Higgs cubics and the minimal SUSY vacuum are lost},\\
3h=0:&\text{renormalizable cubic vacuum dynamics allowed, but 27--351 mixing is unprotected}.
\end{array}}
\]

Thus no commuting abelian selection rule can simultaneously retain both
matter Yukawas, forbid the mixed Higgs cubic and preserve the minimal
renormalizable supersymmetric breaking mechanism.

## 1. Scope of the theorem

The proof uses four assumptions:

1. the symmetry is abelian and commutes with E6, so it assigns one charge to
   each irreducible Higgs multiplet;
2. both \(27_F27_F27_H\) and
   \(27_F27_F\mathcal S_{351,H}\) Yukawas are retained;
3. the Higgs field set is the minimal two conjugate pairs
   \(27+\overline{27}+351'+\overline{351'}\); and
4. symmetry breaking is sought in an exact renormalizable supersymmetric
   F-flat vacuum with nonzero quadratic masses.

The result does not cover soft-SUSY-breaking vacua, non-supersymmetric
quartic potentials, nonrenormalizable operators, nonabelian selection rules,
or additional Higgs representations.

## 2. Why all cubic charges coincide

The equality \(h=s\) is forced before the scalar potential is considered.
It follows solely because the same matter bilinear \(27_F27_F\) couples to
both parent scalar representations.  An abelian symmetry commuting with E6
cannot distinguish their internal singlet and bidoublet components.

Once \(h=s\), every degree-three monomial made only from the two unbarred
Higgs types has charge three times the same element.  This remains true for
continuous \(U(1)\), finite cyclic groups and products of abelian groups,
with each equation interpreted componentwise.  Passing from \(\mathbb Z_5\)
to a larger abelian group therefore does not evade the collision.

The explicit claim-1565 witness has \((f,h,s)=(1,3,3)\) modulo five.  Its
cubic charge is

\[
3h=9=4\pmod5,
\]

so it forbids not only \(H^2\mathcal S\) but also every pure cubic needed in
the sourced renormalizable superpotential.

## 3. F-term closure

With all cubics absent, differentiating

\[
W=m_HH\overline H+m_S\mathcal S\overline{\mathcal S}
\]

gives four linear equations.  If \(m_Hm_S\ne0\), their coefficient matrix is
invertible and the origin is the unique F-flat solution.  D-flatness cannot
create a nonzero solution that fails F-flatness.

Setting a quadratic mass to zero creates flat directions but does not
provide a determined, gapped breaking vacuum.  It also violates the stated
minimal massive-system assumptions and exposes massless complete E6
multiplets.  Such a limit is a different conditional model, not a solution
of the no-go.

## 4. What can still evade it

Four qualitatively distinct continuations remain:

### Non-supersymmetric potential

Hermitian quartics such as \((H^\dagger H)^2\) are neutral under the abelian
symmetry and can support nonzero VEVs even when holomorphic cubics are
forbidden.  The full boundedness, vacuum and scalar-spectrum calculation
must then be redone outside the supersymmetric source model.

### Soft breaking

Negative soft masses can generate VEVs while the superpotential cubics stay
absent.  Exact inertness must survive the soft sector and radiative
corrections, and the resulting vacuum is not supersymmetric at the E6 scale.

### Nonrenormalizable operators

Higher powers can be neutral even when \(3h\ne0\).  For the explicit
\(\mathbb Z_5\) witness, degree five is the first automatically neutral pure
power.  This introduces a cutoff and new Wilson coefficients into the same
threshold problem the programme is trying to explain.

### Enlarged or nonabelian selector sector

An additional neutral/charged representation or a nonabelian symmetry can
alter the charge equations and generate a complete vacuum without allowing
the original mixed cubic.  This is the most relevant remaining exact-model
route, but it is new field content and must be minimized explicitly.

## 5. Programme consequence

The first E6 construction now has a sharp three-step status:

1. **exotic rank:** solved by the two singlet VEVs of claim 1564;
2. **pure portal parent alignment:** algebraically characterized by
   \(B=0\) in claim 1565; and
3. **minimal supersymmetric symmetry protection:** impossible under the
   commuting abelian assumptions proved here.

The next programme-shifting choice is no longer “find another cyclic
charge.”  It is to compare the two smallest genuine escapes:

- a non-supersymmetric E6 potential with the inert abelian symmetry; or
- one additional scalar/selector multiplet that restores an F-flat breaking
  vacuum while keeping the mixed bidoublet term forbidden.

The former is likely the smaller field inventory; the latter stays closer
to the sourced supersymmetric E6 construction.

## Spin(2,3) status

A Spin(2,3)-derived selector would have to evade the abelian charge collision
by acting nontrivially on relation type, scalar multiplicity or the vacuum
category.  A uniform commuting phase assignment cannot do the job.  This
narrows the possible Spin(2,3) role from “some symmetry” to a nonabelian,
graded or correspondence action that distinguishes the mixed scalar
invariant without equating all scalar components.

## Verdict

The simple discrete escape is closed in the minimal renormalizable
supersymmetric E6 system.  Protecting the inert 27 bidoublet with a commuting
abelian symmetry removes every holomorphic Higgs cubic, leaving only the
zero F-flat vacuum.  Allowing the cubics restores the dangerous mixing.

The E6 branch remains alive, but it must now pay one explicit price:
non-supersymmetric vacuum dynamics, soft/high-dimensional breaking, or an
enlarged nonabelian/selector sector.  That is a substantially narrower and
more falsifiable frontier than the original state-count proposal.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_inert_abelian_susy_vacuum_no_go.mjs
~~~
