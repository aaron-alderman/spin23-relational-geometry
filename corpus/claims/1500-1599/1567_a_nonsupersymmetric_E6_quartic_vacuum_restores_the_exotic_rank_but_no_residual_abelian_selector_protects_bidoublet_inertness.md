# A Nonsupersymmetric E6 Quartic Vacuum Restores the Exotic Rank, but No Residual Abelian Selector Protects Bidoublet Inertness

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact reduced nonsupersymmetric vacuum construction plus residual-symmetry no-go; full E6 quartic invariant, spectrum and global-vacuum audit remains open

**Depends on:** [the minimal supersymmetric abelian no-go](1566_any_commuting_abelian_symmetry_that_protects_the_inert_E6_bidoublet_also_kills_the_minimal_renormalizable_SUSY_breaking_vacuum.md), [the bidoublet alignment theorem](1565_a_pure_351_bidoublet_requires_zero_27_351_mixing_but_the_minimal_realistic_E6_vacuum_uses_that_mixing.md), and [the rank-11 exotic construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md)

**Primary background:** [the explicit E6 tensor construction of scalar potentials in the 27, 78, 351 and 351-prime representations](https://doi.org/10.1016/0003-4916(83)90176-8)

**Evidence:** [reduced-vacuum and residual-selector ledger](../../../evidence/data/spin23-e6-nonsusy-vacuum-residual-selector-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_nonsusy_vacuum_residual_selector_audit.mjs)

## Result

The first nonsupersymmetric escape from claim 1566 is real but incomplete.
Hermitian quartics support both E6-breaking singlet expectation values on an
open parameter set, so the supersymmetric zero-vacuum obstruction disappears.
However, the commuting abelian selector used to remove the dangerous cubic
cannot protect the required inert bidoublet after symmetry breaking.

Let

\[
x=|s|^2,
\qquad
y=|t|^2,
\]

where (s\in1_4\subset27_H) lifts the fermionic (10_{-2}), and
(t\in1_{-8}\subset\mathcal S_{351,H}) lifts the fermionic (1_4).
The reduced renormalizable nonsupersymmetric potential

\[
V=-\mu_s^2x-\mu_t^2y+\lambda_sx^2+\lambda_ty^2+\kappa xy
\]

has a strict simultaneous minimum whenever

\[
D=4\lambda_s\lambda_t-\kappa^2>0,
\]

and

\[
x_*={2\lambda_t\mu_s^2-\kappa\mu_t^2\over D}>0,
\qquad
y_*={2\lambda_s\mu_t^2-\kappa\mu_s^2\over D}>0.
\]

For example,

\[
(\lambda_s,\lambda_t,\kappa,\mu_s^2,\mu_t^2)=(2,3,1,5,7)
\]

gives (D=23), (x_*=y_*=1), and (V_*=-6).  The two boundary minima
have energies (-25/8) and (-49/12), while the origin has energy zero.
Thus the simultaneous point is the unique global minimum of this reduced
quadrant problem.  Both masses in claim 1564 are nonzero, and the exotic
mass operator again has rank eleven with a sixteen-dimensional kernel.

The selector theorem is negative.  Give (27_F), (27_H), and
(\mathcal S_{351,H}) charges (f,h,s) under any abelian group commuting
with E6.  Retaining both matter Yukawas requires

\[
2f+h=0,
\qquad
2f+s=0,
\qquad
\Longrightarrow
\qquad h=s.
\]

Therefore the relative low-energy bidoublet bilinear already has zero
selector charge:

\[
q(H_{27,D}^\dagger H_{351,D})=-h+s=0.
\]

More strongly, every element of the residual selector subgroup that fixes
the two nonzero singlet VEVs obeys (h=0=s) on that element.  It acts
trivially and identically on both complete Higgs multiplets.  Hence it
cannot distinguish their bidoublets and cannot enforce the exact
off-diagonal mass condition (B=0) of claim 1565.

For the explicit (\mathbb Z_5) witness

\[
(f,h,s)=(1,3,3),
\]

the charge-three singlet VEVs break (\mathbb Z_5) completely because
(\gcd(3,5)=1).  The symmetry forbids the selected holomorphic cubic in
the unbroken E6 theory, but it leaves no post-breaking symmetry that can
protect the light-doublet alignment.

The exact combined verdict is

\[
\boxed{
\begin{array}{rcl}
\text{open nonsupersymmetric simultaneous-singlet vacuum}&=&\mathrm{YES},\\
\text{rank-11 exotic lift in that reduced vacuum}&=&\mathrm{YES},\\
\text{residual commuting-abelian distinction of the two bidoublets}&=&\mathrm{NO},\\
\text{symmetry-protected }B=0\text{ after E6 breaking}&=&\mathrm{NO},\\
\text{normalized portal Ward line}&=&\mathrm{NOT\ DERIVED}.
\end{array}}
\]

## 1. Why the nonsupersymmetric vacuum is an open result

The Hessian of (V) in the invariant radial coordinates ((x,y)) is

\[
\begin{pmatrix}
2\lambda_s&\kappa\\
\kappa&2\lambda_t
\end{pmatrix}.
\]

The displayed inequalities make it positive definite.  Strict positivity
of (x_*) and (y_*) is also open under small changes of the five
parameters.  The construction is therefore not an isolated fine-tuned
point.  It directly evades the F-term proof of claim 1566 because a
nonsupersymmetric potential is not the squared gradient of the cubic-free
superpotential.

This is a reduced theorem, not a complete E6 vacuum theorem.  The full
potential contains several inequivalent quartic contractions and many
non-singlet directions.  Establishing a phenomenologically usable vacuum
still requires their complete Hessian, competing-orbit and global-minimum
analysis.  The classic E6 tensor formalism explicitly constructs such
potentials and confirms that this is a finite invariant-theory problem,
but the required (27+351') restricted spectrum has not been evaluated
here.

## 2. Residual-selector theorem

Let (A) be an arbitrary abelian selector group, written additively in its
character group.  Because it commutes with E6, Schur's lemma makes its action
scalar on each irreducible Higgs representation.  The two retained Yukawas
force the two scalar characters to coincide, (h=s).

The residual subgroup after the singlet vacuum is

\[
K=\{a\in A:\ h(a)=s(a)=0\}.
\]

On (K), both multiplets are neutral.  In particular their bidoublet
components transform in the same Standard Model representation and carry
the same residual selector character.  The relative bilinear is allowed.
This conclusion is component-independent and holds for continuous tori,
finite abelian groups and products of both.

For a cyclic (\mathbb Z_N), a VEV of charge (h) leaves a subgroup of
order (\gcd(N,h)).  Both Higgs multiplets are neutral under that subgroup.
Changing (N) cannot repair the distinction lost when the two Yukawa
equations imposed (h=s).

## 3. What the no-go does and does not prove

It proves that a commuting abelian phase symmetry is not an exact
post-breaking inertness law.  Even when it removes one parent cubic, it
does not forbid the low-energy relative bidoublet bilinear.  Therefore an
exact zero of (B) would be an unprotected parameter relation unless some
additional structure is present.

It does not prove that every numerical E6 potential has nonzero (B).
A particular set of quartic contractions can vanish, cancel or leave an
accidental zero.  Such a zero must be tested against the complete scalar
spectrum and threshold corrections; it is not enforced by the declared
abelian selector.

This distinction corrects the strongest possible reading of claim 1565.
Its (\mathbb Z_5) witness forbids the identified mixed cubic.  It does not
by itself protect the full post-breaking bidoublet mass matrix against all
quartic and threshold contributions.

## 4. Consequence for the next construction

The smallest surviving exact selector must violate at least one hypothesis
of the theorem.  It must either

1. act nontrivially within an E6 multiplet after breaking;
2. not commute with E6, for example by combining an E6 automorphism with a
   sector operation;
3. act on multiplicity, relation type or correspondence provenance rather
   than by one phase per irreducible multiplet; or
4. add a VEV-neutral field or representation that separates the two
   bidoublet channels while other fields perform the gauge breaking.

The remaining nonsupersymmetric calculation is now sharply bounded:
enumerate the (27+351') quartic invariants, restrict their mixed Hessian to
the two bidoublet channels at the rank-11 singlet vacuum, and determine
whether (B=0) follows identically or requires tuning.  If it requires
tuning, the pure commuting-abelian nonsupersymmetric route is closed.

## Spin(2,3) status

The result makes the desired Spin(2,3) role more precise.  A useful action
cannot be another uniform character on the E6 irreducible multiplets.  It
must survive the singlet vacuum while distinguishing the two relation
channels, most naturally as a graded, noncommuting or correspondence-valued
operation on the multiplicity space.  That is exactly the type of
component-sensitive selector absent from the ordinary E6 phase symmetry.

## Verdict

Nonsupersymmetric quartics reopen the vacuum but do not solve the portal.
There is an open reduced parameter region with both required singlet VEVs
and the rank-11 exotic lift.  Yet the same two Yukawa equations that enabled
the construction make both Higgs multiplets identical under every residual
commuting abelian selector.  The selector cannot protect the inert
bidoublet after breaking.

The next decisive calculation is therefore the complete mixed quartic
Hessian, followed—only if an identity zero appears—by its radiative and
threshold stability test.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_nonsusy_vacuum_residual_selector_audit.mjs
~~~
