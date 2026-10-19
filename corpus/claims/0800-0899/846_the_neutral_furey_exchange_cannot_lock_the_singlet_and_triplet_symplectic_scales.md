# The Neutral Furey Exchange Cannot Lock the Singlet and Triplet Symplectic Scales

**Date:** 17 October 2026  
**Branches:** neutral exchanged TRO, full-color bilocal carrier, sector locking, and symplectic normalization  
**Claim status:** exact no-go for a linear gauge-equivariant exchange lock; nonlinear, spurion and dynamical locks remain open  
**Certificate:** [test_the_neutral_furey_exchange_as_a_lock_of_the_full_color_symplectic_pencil.mjs](../../../verification/test/test_the_neutral_furey_exchange_as_a_lock_of_the_full_color_symplectic_pencil.mjs)

## Executive result

The established neutral Furey exchange cannot fix the relative coefficient in the full-color symplectic pencil

\[
K_{a,b}=aK_s+bK_t.
\]

There are two complementary reasons.

First, on the explicit endpoint quotient of document 843, the neutral exchange swaps the \(D,E\) endpoints, both of which lie in the quotient kernel. Therefore

\[
\Pi S=\Pi,
\qquad
SJ=J,
\qquad
\Pi SJ=I_4.
\]

Its induced response-carrier action is the identity.

Second, the full-color statement is representation-theoretic:

\[
\operatorname{Hom}_{SU(3)}(\mathbf1,\mathbf3)=0,
\qquad
\operatorname{Hom}_{SU(3)}(\mathbf3,\mathbf1)=0.
\]

Every linear color-gauge intertwiner is block diagonal between the singlet and triplet isotypic sectors. It can organize topology faces within each sector, but it cannot identify the coefficients of invariant forms belonging to inequivalent sectors.

Thus

\[
\boxed{
\text{neutral gauge-intertwining exchange}
\not\Longrightarrow a=b.
}
\]

## 1. Explicit quotient calculation

The rank-four quotient retained

\[
(H_4,O_2^1,O_2^2,O_2^3)
\]

and killed four other fixed endpoint directions, including \(D\) and \(E\). The established exchange acts only by

\[
D\leftrightarrow E.
\]

It follows before any numerical calculation that the quotient cannot see it. The certificate verifies this directly for the exact \(\Pi\) and \(J\).

This does not invalidate the neutral exchange. It confirms its distinct role: it Hermitianizes and relates the two topology realizations, whereas the displayed quotient selects a different endpoint slice.

## 2. General full-color obstruction

Suppose a linear operation \(T\) commutes with full color on

\[
V=V_s\oplus V_t,
\qquad
V_s\cong\mathbf1,
\quad V_t\cong\mathbf3.
\]

Its off-diagonal blocks would lie in

\[
\operatorname{Hom}_{SU(3)}(V_s,V_t)
\quad\text{or}\quad
\operatorname{Hom}_{SU(3)}(V_t,V_s).
\]

Both spaces vanish. The certificate obtains the zero dimensions by solving the Cartan and root invariance equations explicitly.

Therefore a gauge-equivariant exchange has the form

\[
T=T_s\oplus T_t.
\]

Even if the same abstract topology swap appears in both blocks, symmetry does not require its response coefficient in one irreducible sector to equal the coefficient in the other.

## 3. What remains possible

The failed lock is specifically linear and gauge-equivariant. Viable mechanisms include:

1. **Gauge-singlet composite dynamics:** colored fields enter only through \(\mathbf3\otimes\bar{\mathbf3}\), allowing a common scalar response equation to couple the two singlets.
2. **Higgs or other charged spurion:** an off-diagonal microscopic map may be gauge covariant when accompanied by a compensating background, with a singlet appearing only after contraction.
3. **Common stress-energy coupling:** universality of gravitational sourcing may relate spectral normalizations, though an explicit Ward/sum-rule calculation is required.
4. **Schur/Feshbach elimination:** both sector forms may be residues of one larger kernel, making their ratio a derived block parameter.
5. **Boundary condition or phase selection:** a common response boundary may lock otherwise independent bulk coefficients.

## 4. Stop-everything criteria

**Positive trigger:** one common action or response kernel derives a fixed nonzero ratio \(b/a\) and its reduced alternating form maps to \(J_0\).

**Negative trigger:** the complete gauge-invariant composite response remains a direct sum of independently renormalized singlet and triplet kernels to all admitted orders. Then no internal Furey/color mechanism selects the pole without extra physics.

**Falsifier:** a nonzero full-color intertwiner between the singlet and fundamental triplet, or a nontrivial induced action of the \(D\leftrightarrow E\) exchange on the displayed quotient. Both executable tests return zero/identity.

## 5. Verdict

| Question | Verdict |
|---|---|
| Is the neutral exchange visible in the explicit rank-four quotient? | **no** |
| Can a full-color linear intertwiner mix singlet and triplet? | **no** |
| Can the exchange still organize topology faces within each sector? | **yes** |
| Does it enforce the same response coefficient across sectors? | **no** |
| Must the lock be composite, spurionic or dynamical? | **yes** |

## 6. Position in the corpus

- [two-scale full-color symplectic pencil](845_full_color_on_the_minimal_eight_real_carrier_leaves_two_symplectic_scales_and_does_not_select_the_unique_spin23_line.md)
- [split quotient feasibility](843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md)
- [neutral exchange is a Standard-Model intertwiner](../0600-0699/618_the_neutral_furey_exchange_intertwines_the_completed_standard_model_module.md)
- [neutral exchange constructs the Hermitian response](../0600-0699/617_the_hermitian_furey_selector_is_a_standard_exchanged_tro_response.md)
- [a common Schur/stress mediator still requires normalized spectral data](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)

