# No Unit-Phase Monomial Map on the Completed Furey Endpoints Can Realize the Zero-Sum Color Triplet

**Date:** 17 October 2026  
**Branches:** completed Furey TRO, complex phases, color covariance, and quadratic symplectic selector  
**Claim status:** exact support-level no-go for all unit-phase monomial endpoint maps; nonmonomial and quotient-level branches remain open  
**Certificate:** [classify_sixth_root_phase_endpoint_involutions_for_the_furey_color_twirl.mjs](../../../verification/classify/classify_sixth_root_phase_endpoint_involutions_for_the_furey_color_twirl.mjs)

## Executive result

Allowing complex endpoint phases does not repair the real signed-exchange obstruction of document 841.

The certificate first exhausts the smallest natural complex extension: sixth-root phases, which include the cube roots satisfying

\[
1+\omega+\omega^2=0.
\]

Among 16 involutive support automorphisms it tests 8,800 phase-decorated involutions exactly in \(\mathbb Z[\omega]\). None has a three-member color orbit with zero sum.

The finite result then strengthens to a phase-independent theorem:

\[
\boxed{
\text{no unit-phase monomial endpoint map, of any order, has}
\quad S+CSC^{-1}+C^2SC^{-2}=0.
}
\]

The obstruction is carried by support, not by the allowed phase set.

## 1. Why cube-root phases were the next minimal test

Real signs cannot make three nonzero equal-support coefficients cancel. The smallest complex phase system that can is

\[
\{1,\omega,\omega^2\},
\qquad \omega^3=1,
\qquad 1+\omega+\omega^2=0.
\]

To include signs and remain closed under inversion, the executable classification uses sixth roots

\[
\zeta=e^{\pi i/3},
\qquad \zeta^6=1,
\]

represented exactly by pairs in the Eisenstein ring \(\mathbb Z[\omega]\). No floating-point cancellation criterion enters the search.

For every involutive support automorphism \(p\), the phase lift is

\[
S e_j=\zeta^{a_j}e_{p(j)}.
\]

The involution law imposes

\[
a_j+a_{p(j)}=0\pmod 6.
\]

All 8,800 resulting lifts were tested and none survived.

## 2. The stronger support theorem

Write \(\operatorname{supp}(S)\) for the eight occupied cells of a monomial matrix. Under color conjugation the three supports are

\[
\operatorname{supp}(S),\qquad
\operatorname{supp}(CSC^{-1}),\qquad
\operatorname{supp}(C^2SC^{-2}).
\]

The 24 directed-incidence automorphisms split into two cases.

### Case I: three distinct support sets

For every such automorphism, exhaustive support enumeration finds at least one occupied matrix cell appearing in exactly one of the three conjugates. At that cell the orbit sum contains one nonzero unit-phase coefficient and two zeros. It cannot vanish, regardless of the phase.

### Case II: color-fixed support

Every color-fixed support has at least one occupied cell whose row and column are both fixed by the color cycle. Conjugation leaves that cell and its coefficient unchanged. Its contribution to the orbit sum is

\[
u+u+u=3u\ne0
\]

for every unit phase \(u\).

The two cases exhaust all support automorphisms. The conclusion no longer depends on involutivity, sixth roots, or finite order.

## 3. Interpretation

The desired cancellation cannot occur by decorating a literal endpoint relabelling with phases. Cube roots help only when all three conjugates contribute to the same cells with cyclically rotated coefficients. The completed Furey incidence never supplies that overlap pattern without also retaining a color-fixed occupied cell.

Therefore the response-level relation

\[
H_0+H_1+H_2=0
\]

requires at least one of the following:

- a genuinely nonmonomial relationship map;
- a partial isometry whose three legs do not act on all endpoints;
- cancellation only after a nontrivial quotient or compression;
- a bilocal triplet–antitriplet construction;
- a background-dependent map whose support itself changes with the background.

This is a useful escalation rule: searching larger cyclotomic phase sets on the same monomial support cannot succeed.

## 4. Revised branch ordering

The next highest-value tests are now:

1. **Quotient-level cancellation.** Determine whether a gauge-stable response projection can annihilate the linear color sum while retaining a positive quadratic channel and the lepton/color-singlet sector.
2. **Typed rectangular partial isometries.** Classify relationship maps separately on \(M_{3,2}\), \(M_{2,3}\), \(M_{2,1}\), and \(M_{1,2}\), enforcing ternary compatibility only where compositions are typed.
3. **Bilocal color contraction.** Construct triplet and antitriplet source legs whose quadratic contraction is a singlet and test the alternating fixed space.
4. **Background-dressed nonmonomial maps.** Use the Higgs or response background to transform the handle relation covariantly rather than demanding a bare endpoint symmetry.

## 5. Stop-everything criteria

**Positive trigger:** one of the surviving constructions produces a completely positive, gauge-covariant response channel whose alternating fixed space is exactly \(\mathbb RJ_0\), without inserting \(J_0\) as input.

**Negative trigger:** the full gauge-covariant Kraus commutant of the completed TRO is classified and every admissible channel has zero or multidimensional alternating fixed space. That would close the entire microscopic TRO selector route.

**Falsifier of this theorem:** a unit-phase monomial support automorphism for which every cell of the three conjugates cancels. The enumerated support dichotomy excludes one for the stated completed incidence.

## 6. Branch verdict

| Question | Verdict |
|---|---|
| Do sixth-root phases repair the signed involution ansatz? | **no; 8,800 lifts exhausted** |
| Could a larger root-of-unity set repair the same monomial support? | **no** |
| Does the obstruction require involutivity? | **no** |
| Does it close nonmonomial or quotient-level maps? | **no** |
| Should larger phase scans on endpoint permutations continue? | **no; pin this branch** |

## 7. Position in the corpus

- [real signed endpoint-exchange classification](841_the_completed_furey_tro_has_no_real_signed_endpoint_exchange_triplet_for_the_quadratic_symplectic_selector.md)
- [neutral exchange is a color singlet](840_the_established_neutral_exchanged_tro_response_is_a_color_singlet_and_cannot_supply_the_three_quadratic_twirl_legs.md)
- [quadratic twirl and unique symplectic fixed line](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [a split quotient lifts the selector but is not selected](843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md)

