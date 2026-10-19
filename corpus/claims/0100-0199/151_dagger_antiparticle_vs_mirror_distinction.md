# Dagger Closure: Antiparticles Are Not Automatically Mirror Fermions

**Date:** 17 October 2026  
**Branches:** B03, B11 and B13  
**Claim status:** correction of physical interpretation; the earlier dagger-orbit calculation remains valid

## 1. Why this correction is necessary

The endomorphism inventory obeys

\[
X_{ab}^\dagger\in\operatorname{Hom}(V_a,V_b)
\]

whenever

\[
X_{ab}\in\operatorname{Hom}(V_b,V_a).
\]

The earlier corpus correctly proved that dagger pairs every off-diagonal block orientation. It then sometimes referred to every reverse block as a “mirror.” That language conflates two physically different objects:

1. the adjoint operator belonging to the same chiral quantum field;
2. an additional independent Weyl field in the conjugate representation.

Only the second is a mirror fermion in the anomaly and spectrum sense.

## 2. One Weyl field already has an adjoint

Let (psi_\alpha) be a left-handed Weyl field in a complex gauge representation (R). Its Hermitian conjugate

\[
\psi^\dagger_{\dot\alpha}

\]

transforms in (overline R) and carries the opposite Lorentz chirality. The Hermitian kinetic action is

\[
S_{\rm kin}=
\int d^4x\,
i\psi^\dagger\bar\sigma^\mu D_\mu\psi.
\]

Both orientations occur in the action, but the path integral has one independent complex Grassmann field and its conjugate integration variable. The adjoint is not counted as a second independent left-handed species.

Consequently a single charged Weyl field remains anomalous even though its kinetic action is Hermitian.

## 3. What an actual mirror is

An independent left-handed field

\[
\chi_\alpha\in\overline R

\]

is additional matter. Its anomaly has the opposite sign:

\[
\mathcal A(\overline R)=-\mathcal A(R).
\]

The independent pair (psi_L\in R), (chi_L\in\overline R) is vectorlike after charge conjugating one member. It has twice the independent chiral field content.

Therefore:

\[
\boxed{
\text{dagger closure of the action}
\not\Rightarrow
\text{independent mirror matter}.
}
\]

The implication holds only if both block orientations are separately declared independent Grassmann generators of the same Lorentz chirality.

## 4. Consequence for the Furey inventory

The full endomorphism algebra is dagger closed, while the selected matter TRO is one-sided. There are at least three possible physical readings:

1. **field/adjoint reading:** the TRO contains independent left-handed fields and the dagger-reverse TRO supplies their adjoint operators in the action;
2. **mirror reading:** both orientations are independently quantized as left-handed fields;
3. **Nambu reading:** both appear in an enlarged particle-hole carrier with a reality constraint removing double counting.

The block algebra alone does not choose among them. Lorentz spinor type, Grassmann generators, canonical anticommutation relations and the real structure must be specified.

This changes the status of the previous mirror obstruction:

- dagger still fails as a complex-linear selector of the one-sided matter TRO;
- inner sign gradings still cannot distinguish an arrow from its reverse;
- but dagger closure does **not** by itself prove that the physical spectrum is vectorlike;
- the actual question is whether reverse arrows are independent fields, adjoints, or constrained Nambu partners.

## 5. Anomaly bookkeeping makes the distinction exact

For a left-handed (U(1)) Weyl field of charge (q), the cubic anomaly contribution is proportional to

\[
q^3.
\]

The adjoint appearing in its kinetic term contributes no separate ((-q)^3) entry. An independent left-handed mirror of charge (-q) does, cancelling the anomaly.

For the fifteen left-handed fields of one Standard-Model generation,

\[
6(1/6)^3+3(-2/3)^3+3(1/3)^3+2(-1/2)^3+1^3=0,
\]

and the mixed gravitational-hypercharge sum also vanishes. Adding an independent conjugate generation gives thirty fields and makes the theory vectorlike, but taking adjoints in the Hermitian action does not.

## 6. Consequence for the walk translation

The conditional translation from (u^c,d^c,e^c) to conventional (u_R,d_R,e_R) is a particle/antiparticle reinterpretation, not the addition of new mirror species. A first-quantized unitary walk can obscure this distinction because its Hilbert space contains positive- and negative-quasienergy sectors before Fock quantization.

The next construction must therefore declare:

- the independent one-particle modes;
- the antiunitary charge-conjugation operation;
- the Fock-space creation and annihilation assignment;
- whether the quasienergy-(pi) cone is an adjoint/antiparticle sector or an independent mirror;
- how the fermion measure produces the anomaly.

Without this information, counting reverse blocks is not a valid count of physical mirrors.

## 7. Stop-everything and falsification gates

**Advance:** construct an antiunitary/Fock real structure in which the dagger-reverse TRO is exactly the adjoint algebra of the selected fifteen independent chiral generators and no extra mirror generators remain.

**Mirror no-go:** prove that locality and the walk's quasienergy periodicity force the reverse TRO to be independently quantized at the same low energy.

**Anomaly gate:** reproduce the chiral Standard-Model anomaly functional from the second-quantized walk rather than inferring it from block labels.

**Demotion:** if no physical quantization distinguishes the field/adjoint and mirror readings, the Furey block selection remains representation bookkeeping.

## 8. Certificate

The [dagger/antiparticle/mirror bookkeeping certificate](../../../verification/verify/verify_dagger_antiparticle_mirror_bookkeeping.mjs) contrasts a single anomalous Weyl field with an independent conjugate pair and verifies the one-generation Standard-Model hypercharge and mixed gravitational sums without double-counting adjoints.

## Companion documents

- [Why dagger does not select chirality](../0000-0099/75_dagger_does_not_select_chirality.md)
- [Conjugation gradings cannot remove mirrors](../0000-0099/77_conjugation_gradings_cannot_remove_mirrors.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
- [Anomaly audit of oriented Furey sectors](109_furey_oriented_sector_anomaly_audit.md)
