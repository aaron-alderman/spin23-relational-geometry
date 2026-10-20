# The Nonfactorized E6 Quartic Regenerates Both Bidoublet Mixings and Closes the Minimal Nonsupersymmetric Inert Route

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** explicit canonical-basis mixed-Hessian calculation; generic minimal nonsupersymmetric commuting-abelian inert route closed

**Depends on:** [the nonsupersymmetric vacuum and residual-selector theorem](1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md), [the bidoublet-alignment theorem](1565_a_pure_351_bidoublet_requires_zero_27_351_mixing_but_the_minimal_realistic_E6_vacuum_uses_that_mixing.md), and [the rank-11 exotic construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md)

**Primary source and component basis:** [E6Tensors](https://arxiv.org/abs/1605.05920), with program archive [DOI 10.17632/tk3xtvsd7b.1](https://doi.org/10.17632/tk3xtvsd7b.1)

**Evidence:** [mixed-quartic Hessian ledger](../../../evidence/data/spin23-e6-mixed-quartic-bidoublet-hessian.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_mixed_quartic_bidoublet_hessian.mjs)

## Result

The complete mixed-quartic question left by claim 1567 has a negative
answer for the generic minimal potential.  The published renormalizable
E6 invariant list contains two balanced (27)--symmetric-351-prime
quartics.  In the source notation they are

\[
I_1=(\bar\psi^\mu\psi_\mu)(\bar S^{\sigma\tau}S_{\sigma\tau})
\]

and

\[
I_2=\bar\psi^\mu\psi_\nu\bar S^{\nu\tau}S_{\mu\tau}.
\]

The first is factorized.  The second is a nonfactorized index contraction.
Write the corresponding scalar-potential terms as

\[
V_{27S}=\lambda_1 I_1+\lambda_2 I_2.
\]

The official E6Tensors component basis orders the fundamental as

\[
(d_1,D_1,u_1,d_2,D_2,u_2,d_3,D_3,u_3,\nu,H_u^+,H_d^0,
s,e^c,\nu^c,e,H_u^0,H_d^-,D_1^c,\ldots,d_3^c).
\]

Thus the exotic-mass singlet (s\subset27_H) is component 13, while the
two neutral members of its bidoublet are components 17 and 12.  In the
canonically normalized symmetric tensor (S_{\mu\nu}), the relevant
component matrices are

\[
T_{229}=E_{13,13},
\]

\[
(U_{291})_{13,17}=(U_{291})_{17,13}=-{1\over\sqrt{10}},
\]

and

\[
(U_{311})_{12,13}=(U_{311})_{13,12}=-{1\over\sqrt{10}}.
\]

Here (chi_{229}) is the symmetric-parent singlet that multiplies the
fermionic (s^2) Yukawa term, while (chi_{291}) and (chi_{311}) are
the neutral symmetric-parent doublet components paired with (H_u^0) and
(H_d^0), respectively.

Take

\[
\langle\psi_{13}\rangle=v,
\qquad
\langle S_{\mu\nu}\rangle=w(T_{229})_{\mu\nu}.
\]

The mixed Hessian of (I_2) is then

\[
\left.
{\partial^2 I_2\over
 \partial\bar\psi_b\,\partial\chi_c}
\right|_{v,w}
=v\bar w\sum_\tau(T_{229})_{13,\tau}(U_c)_{b,\tau}.
\]

Direct substitution gives

\[
\begin{aligned}
(b,c)=(17,291):&\quad-{v\bar w\over\sqrt{10}},\\
(b,c)=(12,311):&\quad-{v\bar w\over\sqrt{10}},\\
(b,c)=(17,311):&\quad0,\\
(b,c)=(12,291):&\quad0.
\end{aligned}
\]

Therefore the scalar potential contains

\[
V_{27S}\supset
-{\lambda_2\over\sqrt{10}}
\left[
v\bar w\left(\bar H_{27,u}H_{S,u}+\bar H_{27,d}H_{S,d}\right)
+\mathrm{h.c.}
\right].
\]

Both required off-diagonal bidoublet entries are regenerated:

\[
\boxed{B_u=B_d=-{\lambda_2v\bar w\over\sqrt{10}}.}
\]

The factorized invariant (I_1) has zero mixed Hessian because the
bidoublet tangent vectors are orthogonal to the fundamental singlet and the
symmetric doublet tensors are orthogonal to (T_{229}).  It does not cancel
the nonfactorized result as an identity.

For the rank-11 vacuum, (v\ne0) and (w\ne0).  Hence the exact inert
condition (B_u=B_d=0) requires

\[
\lambda_2=0
\]

or a tuned cancellation after adding still more invariants and VEVs.  The
commuting abelian selector cannot enforce this zero: (I_2) contains one
field and one conjugate from each multiplet and is neutral for every phase
assignment, independently of the equality (h=s).

The branch verdict is therefore

\[
\boxed{
\begin{array}{rcl}
\text{nonsupersymmetric simultaneous-singlet vacuum}&=&\mathrm{YES},\\
\text{rank-11 exotic lift}&=&\mathrm{YES},\\
\text{generic mixed-quartic bidoublet Hessian}&\ne&0,\\
\text{commuting-abelian protection of }\lambda_2=0&=&\mathrm{NO},\\
\text{minimal generic nonsupersymmetric inert route}&=&\mathrm{CLOSED}.
\end{array}}
\]

## 1. Reproduction from the canonical tensor basis

The program archive was downloaded from its published data DOI.  Its SHA-256
digest is

~~~text
1d0f48f46ede83ca8eed1bfaf0788acc741bfefe022d0fea008d47857b825d3a
~~~

The file `E6Tensors/e6tensors_full/E6Tensors.m` contains the canonical
27-by-27 symmetric tensor `E6S`.  Extracting the coefficients of
(chi_{229},chi_{291},chi_{311}) gives the entries quoted above.  Each
component matrix is symmetric and canonically normalized.  The accompanying
notebook identifies the fundamental ordering and shows explicitly that
(chi_{229}) multiplies (s^2), (chi_{291}) multiplies the down-type
Dirac pair and (H_u^0s), and (chi_{311}) multiplies the neutrino Dirac
pair and (H_d^0s).

No numerical fit or subgroup-only inference enters the Hessian result.  It
is a direct contraction of the published E6 tensors.  The verifier stores
the minimal sparse coefficient matrices needed to reproduce it without
vendoring the 156 MB uncompressed program file into the corpus.

## 2. Why this is stronger than residual-symmetry counting

Claim 1567 proved that the residual commuting abelian selector could not
forbid the low-energy relative bidoublet bilinear.  That left open a logical
possibility: perhaps every renormalizable E6 quartic had an accidental zero
Clebsch coefficient on the selected singlet orbit.

The present calculation removes that possibility.  The nonfactorized
invariant has a nonzero coefficient in both neutral doublet channels, with
the same magnitude fixed by canonical normalization.  The absence of a
residual symmetry is therefore accompanied by an explicit tree-level
operator that realizes the allowed mixing.

## 3. Scope and naturalness

The conclusion is generic rather than absolute.  One can set
(lambda_2=0) as a parameter choice.  But the declared commuting abelian
symmetry allows (I_2), so this is not symmetry protection.  A technically
natural zero would require an additional Ward identity or proof that the
(lambda_2=0) surface is closed under the full gauge, Yukawa and scalar
renormalization group.  Nothing in the minimal field and symmetry content
provides such a proof.

Adding more VEVs can also arrange a cancellation in (B), but claim 1565
already shows that inertness needs the complete off-diagonal entry to vanish,
not merely a light-doublet determinant.  A cancellation among independent
quartic couplings and VEVs is another tuning unless a new structure locks
their normalized coefficients.

## 4. Programme consequence

The two smallest conventional escapes are now both closed generically:

1. in the minimal renormalizable supersymmetric model, abelian protection
   removes the cubic vacuum dynamics and leaves the origin;
2. in the nonsupersymmetric model, quartics restore the vacuum but the
   allowed nonfactorized quartic regenerates both bidoublet mixings.

The next exact-model route must add a selector that acts on more than one
uniform phase per E6 irreducible multiplet.  The smallest candidates are:

- a graded or correspondence action on the two Yukawa relation channels;
- a noncommuting/component-sensitive selector surviving the singlet vacuum;
- an enlarged scalar sector in which VEV-neutral fields perform the channel
  separation; or
- an explicit Ward identity making (lambda_2=0) an RG-invariant surface.

The last option is the cheapest next falsification test: compute the
one-loop source term for (lambda_2) from gauge and retained Yukawa
interactions.  A nonzero source closes the tuned surface as well.

## Spin(2,3) status

The missing action is now localized to a single invariant coefficient.  A
Spin(2,3)-derived selector must make the nonfactorized contraction (I_2)
odd or inadmissible while retaining the factorized radial quartics, both
matter Yukawas and the two singlet VEVs.  Since (I_2) is an E6 singlet and
neutral under all commuting phases, such an action must live on relation or
multiplicity data outside the ordinary E6 tensor indices.  This is a precise
target for the correspondence programme, not a generic appeal to another
continuous symmetry.

## Verdict

The full canonical-basis Hessian test closes the generic minimal
nonsupersymmetric inert route.  The very quartic structure that permits a
healthy non-supersymmetric potential also contains a neutral nonfactorized
invariant whose singlet insertions mix both (27_H) and symmetric-parent
bidoublets with coefficient (-1/\sqrt{10}).

The E6 branch can continue only by protecting (lambda_2=0) with new
component-sensitive structure, enlarging the vacuum sector, or accepting
an unprotected tuning.  None of those is supplied by the minimal commuting
abelian model.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_mixed_quartic_bidoublet_hessian.mjs
~~~
