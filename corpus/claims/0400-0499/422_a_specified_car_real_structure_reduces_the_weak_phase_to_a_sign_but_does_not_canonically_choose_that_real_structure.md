# A Specified CAR Real Structure Reduces the Weak Phase to a Sign but Does Not Canonically Choose That Real Structure

**Date:** 17 October 2026  
**Branches:** B03, B08, B11 and B14  
**Claim status:** exact conditional intertwiner theorem and exact rephasing obstruction

## 1. The next candidate datum

The bare weak Jordan algebra cannot see the common phase of its spinor realization. The natural next candidate is an antiunitary CAR real structure or particle–hole map

\[
C:W\longrightarrow W,
\qquad C^2=1,
\]

or, on the full Fock space, a charge-conjugation map exchanging annihilation and creation operators.

This datum is phase-sensitive enough to reduce the intertwiner ambiguity, but it is not by itself canonically phased.

## 2. Conditional sign theorem

Let two weak carriers \(W_E\) and \(W_F\) carry specified real structures \(C_E\) and \(C_F\). Let the equivariant unitary comparison be

\[
T=\beta I_2,
\qquad |\beta|=1.
\]

Requiring it to intertwine the real structures,

\[
TC_E=C_FT,
\]

and choosing real bases in which both antiunitaries are ordinary complex conjugation \(K\), gives

\[
\beta K=K\beta=\bar\beta K.
\]

Therefore

\[
\beta=\bar\beta,
\qquad |\beta|=1,
\]

so

\[
\boxed{\beta=\pm1.}
\]

Combined with the octonionic condition \(\alpha^3=1\), a *specified and matched* real structure reduces the carrier ambiguity to

\[
\mathbb Z_3\times\mathbb Z_2\cong\mathbb Z_6.
\]

This obtains the desired finite remainder without separately postulating a five-volume.

## 3. Why this is still conditional

An antiunitary can be rephased:

\[
C\mapsto C_\phi=e^{i\phi}C.
\]

Because \(C\) is antilinear,

\[
C_\phi^2
=e^{i\phi}Ce^{i\phi}C
=e^{i\phi}e^{-i\phi}C^2
=C^2.
\]

Its induced conjugation action on linear operators is also unchanged:

\[
C_\phi A C_\phi^{-1}=CAC^{-1}.
\]

Thus neither the condition \(C^2=1\) nor the particle–hole automorphism of the CAR algebra fixes \(\phi\).

If the target real structure is changed from \(K\) to \(e^{i\phi}K\), the comparison equation becomes

\[
\beta=e^{i\phi}\bar\beta.
\]

The allowed unitary comparisons are then

\[
\boxed{\beta=\pm e^{i\phi/2}.}
\]

The sign pair survives, but it rotates with the unobservable phase choice of the antiunitary. There is no absolute pair \(\{+1,-1\}\) until the two real structures are phase-matched.

## 4. CAR vacuum and top state have the same issue

For a polarized five-mode CAR system, the vacuum projector is invariant under mode rephasings

\[
a_i\mapsto e^{i\theta_i}a_i.
\]

The ordered top state transforms as

\[
a_1^\dagger a_2^\dagger a_3^\dagger a_4^\dagger a_5^\dagger|0\rangle
\mapsto
e^{-i(\theta_1+\cdots+\theta_5)}
a_1^\dagger\cdots a_5^\dagger|0\rangle.
\]

Therefore a primitive vacuum idempotent or vacuum ray does not by itself phase the Fock top line. Choosing an ordered orthonormal ladder basis does, but that choice is precisely a determinant-line trivialization.

Likewise, a particle–hole operator may send

\[
C|0\rangle=\lambda|\mathrm{top}\rangle,
\qquad |\lambda|=1,
\]

but rephasing \(C\) changes \(\lambda\) without changing the induced CAR automorphism.

## 5. What would make the reduction canonical

Any one of the following would be sufficient if defined on both sides and matched without arbitrary phase:

1. a distinguished antiunitary as an operator, not merely its conjugation action;
2. a normalized vacuum-to-top matrix element;
3. a Pfaffian or fermion-measure orientation;
4. a Higgs/Yukawa bilinear whose coefficient is fixed by an independent reality or positivity condition;
5. an exceptional-to-CAR sewing law that identifies the two antiunitaries including phase.

Without such a datum, saying “charge conjugation fixes \(\beta\)” hides the needed phase convention.

## 6. Relation to the faithful \(\mathbb Z_6\)

The result gives a particularly clean conditional bridge:

\[
\begin{aligned}
\text{octonion cross product} &\Longrightarrow \alpha\in\mathbb Z_3,\\
\text{matched CAR real structure} &\Longrightarrow \beta\in\mathbb Z_2,\\
\text{combined ambiguity} &\Longrightarrow \mathbb Z_3\times\mathbb Z_2\cong\mathbb Z_6.
\end{aligned}
\]

This is structurally stronger than imposing a determinant equation by hand: it identifies a concrete phase-sensitive object capable of supplying the weak factor. But its phase matching remains a sewing problem.

## 7. Branch decision

- **Closed:** a specified matched real structure reduces the weak unit phase to a sign.
- **Closed:** rephasing an antiunitary preserves both its square and its induced CAR conjugation.
- **Closed:** a vacuum projector does not canonically phase the Fock top state.
- **Open:** whether Furey’s source-level conjugations plus the exceptional embedding select phase-matched antiunitaries.
- **Open:** whether the Higgs-dressed response fixes the relative phase through positivity or reciprocity.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** construct antiunitaries on the exceptional and completed Furey carriers from independent source data and prove their comparison phase, rather than choosing it.

**Conditional theorem falsifier:** with both real structures fixed as \(K\), find a unitary scalar other than \(\pm1\) satisfying \(\beta K=K\beta\).

**Canonicity falsifier:** infer the phase of an antiunitary only from \(C^2\) or its adjoint action on the CAR algebra.

**Vacuum falsifier:** infer a top-form phase only from a primitive vacuum projector.

## 9. Certificate

The [CAR real-structure phase certificate](../../../verification/verify/verify_car_real_structure_reduces_weak_phase_conditionally.mjs) verifies the sign reduction for matched conjugations, the continuous rephasing freedom of an antiunitary involution and the rotated sign pair for a rephased target structure.

## Companion documents

- [Weak Jordan determinant-line no-go](421_the_weak_jordan_flag_determines_only_a_projective_spinor_and_cannot_canonically_supply_its_volume_phase.md)
- [Octonion and weak phase reduction](420_the_octonion_cross_product_fixes_the_colour_phase_but_the_weak_jordan_algebra_is_phase_blind.md)
- [Dirac face exchange versus full charge conjugation](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Furey technical algebraic guide](../0000-0099/03_furey_technical_algebraic_guide.md)
