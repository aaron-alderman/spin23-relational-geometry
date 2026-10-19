# The Established Neutral Exchanged-TRO Response Is a Color Singlet and Cannot Supply the Three Quadratic-Twirl Legs

**Date:** 17 October 2026  
**Branches:** Furey exchanged TRO, Hermitian response, color twirl, and symplectic selector  
**Claim status:** exact incompatibility between the established neutral exchange and the new three-leg selector; both constructions remain valid in distinct roles  
**Certificate:** [test_whether_the_established_neutral_exchanged_tro_response_supplies_the_three_color_twirl_legs.mjs](../../../verification/test/test_whether_the_established_neutral_exchanged_tro_response_supplies_the_three_color_twirl_legs.mjs)

## Executive result

The existing Furey exchanged-TRO response does **not** microscopically realize the three relationship operators required by the quadratic selector of document 839.

The established exchange (S):

- swaps the two neutral one-dimensional endpoint blocks (D\leftrightarrow E) or (O_1\leftrightarrow R), depending on the equivalent block notation;
- is the identity on the sixteen named even-Fock matter states;
- intertwines the complete tested Standard Model Cartan, color-root and weak-root actions.

It is therefore a color singlet:

\[
C,S,C^{-1}=S.

\]

Its color-conjugacy orbit has size one and

\[
\frac13\sum_{i=0}^2C^iSC^{-i}=S\ne0.

\]

The quadratic selector instead requires three distinct legs

\[
H_i=R^iHR^{-i},

\]

with orbit size three and zero linear average.

Hence

\[
\boxed{
\text{established neutral TRO exchange}
\ne
\text{three-leg color-covariant handle multiplet}.
}

The new selector remains an exact response-level mechanism, but its microscopic Kraus legs are not already hidden in the neutral exchange (S).

## 1. Why this is a meaningful negative result

Document 617 proved that the Hermitian repair has the intrinsic TRO form

\[
R_x^{\rm H}(z)
=xS(x)^\dagger z+zS(x)^\dagger x.

\]

Document 618 then proved that (S) is an exact intertwiner of the completed one-generation Standard Model module. This made (S) the most natural first candidate for a microscopic realization of the handle relations in document 839.

But the very feature that makes (S) gauge admissible also stops it from generating a nontrivial color orbit. It commutes with color rather than transforming in the required three-component relationship multiplet.

## 2. Endpoint-level calculation

In the explicit eight-block carrier, the exchange permutation is

\[
S:(0,1,2,3,4,5,6,7)
\mapsto
(7,1,2,3,4,5,6,0).

\]

It touches only the neutral endpoints (0,7). Any color permutation fixes those endpoints, so it commutes with (S).

The certificate chooses an explicit three-cycle on colored endpoint labels and verifies

\[
CSC^{-1}=S,
\qquad
C^2SC^{-2}=S.

\]

Thus the orbit contains one matrix, not three.

## 3. Matter-module calculation

On the sixteen completed Fock states, the neutral survivor exchange changes the endpoint realization while preserving every named field and every five-bit weight. Its matter-state matrix is therefore

\[
S_{16}=I_{16}.

\]

Consequently

\[
gS_{16}g^{-1}=S_{16}

\]

for every Standard Model generator (g), not only for the sampled color cycle.

The mismatch is structural and cannot be repaired by choosing a different color basis.

## 4. Distinct surviving roles

The negative comparison does not invalidate either branch.

### Neutral exchanged TRO

It supplies:

- a basis-independent Hermitian middle map;
- a gauge-intertwining two-topology correspondence;
- exchange-fixed (H_2(\mathbb R))-type observables;
- the existing Furey-to-positive-response bridge.

### Color-twirled handle multiplet

It supplies:

- three noncommuting relationship orientations;
- zero linear singlet component;
- a positive quadratic twirl;
- the unique symplectic fixed line.

The first construction creates the two-face Hermitian carrier. The second selects a symplectic relationship on a four-dimensional transfer carrier. An additional map between these levels is required.

## 5. Minimal missing object

The missing microscopic datum is a triple

\[
(S_0,S_1,S_2)

\]

of admissible TRO exchanges satisfying

\[
CS_iC^{-1}=S_{i+1},
\qquad
S_0+S_1+S_2=0

\]

on the relevant response quotient, while the quadratic Hermitian sum

\[
\frac13\sum_i
\left(
xS_i(x)^\dagger z+zS_i(x)^\dagger x
\right)

\]

is gauge singlet and positive.

The known neutral exchange gives only (S_0=S_1=S_2=S), which fails the zero-sum condition.

## 6. Candidate locations for the missing triplet

Credible searches are now limited to:

1. **colored endpoint exchanges** involving the (O_2^i) blocks rather than only the neutral (D,E) endpoints;
2. **Higgs-dressed exchanges** whose color transformation is compensated by a conjugate source insertion;
3. **bilocal source kernels** where a color triplet and antitriplet combine to a singlet only after forming the quadratic response;
4. **background-dependent source-to-transfer maps** whose three fibers are related by color conjugation;
5. **composite adjoint relationships**, not transformations of individual matter states.

Each candidate must be checked against ternary closure, gauge covariance, positivity and the no-mirror constraint.

## 7. Branch verdict

| Question | Verdict |
|---|---|
| Is the established exchanged-TRO response intrinsic and Hermitian? | **yes** |
| Does its neutral exchange intertwine the tested SM module? | **yes** |
| Does color conjugation generate three distinct exchanges? | **no; orbit size one** |
| Does its linear color average vanish? | **no; it equals (S)** |
| Does it directly realize the document-839 twirl? | **no** |
| Can another TRO relationship triplet realize it? | **open** |

## 8. Stop-everything and falsification criteria

**Positive trigger:** construct a nonzero triple (S_i) in the completed Furey operator algebra satisfying cyclic color covariance, quadratic gauge-singlet positivity and the required transfer-level action.

**Negative trigger:** classify all admissible TRO exchanges and prove that every gauge-compatible exchange is a color singlet. That would close the microscopic realization of the quadratic selector through Furey exchanges.

**Immediate falsifier of this checkpoint:** a nontrivial color conjugate of the established neutral (S). The explicit endpoint and sixteen-state representations both exclude one.

## 9. Position in the corpus

- [the quadratic color-twirled selector](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [the Hermitian exchanged-TRO response](../0600-0699/617_the_hermitian_furey_selector_is_a_standard_exchanged_tro_response.md)
- [the neutral exchange Standard Model intertwiner](../0600-0699/618_the_neutral_furey_exchange_intertwines_the_completed_standard_model_module.md)
- [exchange-fixed two-topology observables](../0600-0699/622_exchange_fixed_two_topology_observables_are_the_h2r_spin23_carrier.md)
- [exhaustive real signed endpoint-exchange no-go](841_the_completed_furey_tro_has_no_real_signed_endpoint_exchange_triplet_for_the_quadratic_symplectic_selector.md)

