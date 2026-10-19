# No coordinate-normal ambient-type five-bit twist is selected by the Standard-Model \(3+2\) flag

## Status

**Exact finite symmetry-classification result and coordinate-normal bridge no-go.**

> **Scope correction after Cycle 468.** This document classifies the 15 forms already written in the ambient coordinate normal form “one odd singleton plus two matched hyperbolic pairs.” An exhaustive search of all \(S_3\times S_2\)-invariant \(\mathbb Z_4\)-quadratic polynomials subsequently found four non-coordinate forms in the same isometry class. One is uniquely additive. Thus the no-go below applies to direct coordinate-normal labelling, not to every flag-invariant quadratic bridge. See [the flag-invariant additive refinement](552_the_standard_model_3_plus_2_flag_plus_additivity_selects_an_ambient_five_bit_form.md).

To turn the totally isotropic source sign-bit quotient into a quadratic module of the ambient type, one would need to add a quarter-valued form equivalent to

\[
q_4(a,b,c,d,e)
=2ab+3c+2de.
\]

On five labelled coordinate bits, every form of this type is determined by:

1. one distinguished bit carrying the odd coefficient \(3\);
2. a perfect matching of the remaining four bits into two hyperbolic pairs.

There are

\[
\boxed{5\cdot3=15}
\]

such forms. The source \(S_5\) acts transitively on them, and none is invariant under the full Standard-Model flag group

\[
S_3\times S_2.
\]

Thus neither the unbroken five-bit symmetry nor the \(3+2\) color/weak flag selects a twist already presented in this coordinate normal form.

## 1. Classification of coordinate forms

Let the five source bits be indexed by

\[
\{1,2,3,4,5\}.
\]

Choose a distinguished index \(c\). On the remaining four indices choose one of the three perfect matchings

\[
\{\{a,b\},\{d,e\}\}.
\]

The associated form is

\[
q_{c;\{ab,de\}}(x)
=3x_c+2x_ax_b+2x_dx_e
\pmod4.
\]

Every such form has value distribution

\[
0^{10},1^6,2^6,3^{10},
\]

and is therefore isometric to the ambient discriminant form as an unlabelled finite quadratic module.

## 2. Full \(S_5\) action

The permutation group \(S_5\) acts on the 15 choices by permuting the distinguished bit and the two matched pairs.

The action is transitive:

\[
\boxed{\text{one orbit of size }15.}
\]

The stabilizer of one form has order

\[
\frac{120}{15}=8.
\]

It is the symmetry group of the two-pair matching:

\[
(C_2\times C_2)\rtimes C_2
\cong C_2\wr S_2,
\]

isomorphic to the order-eight dihedral group.

Therefore a quadratic twist of ambient type breaks

\[
S_5
\longrightarrow
C_2\wr S_2.
\]

The source five-bit symmetry supplies an orbit of possible twists, not a preferred twist.

## 3. The Standard-Model \(3+2\) flag

The Standard-Model Cartan flag partitions the five coordinates as

\[
\{1,2,3\}_{\rm color}
\sqcup
\{4,5\}_{\rm weak},
\]

with Weyl group

\[
S_3\times S_2.
\]

Restricting the 15 forms to this subgroup produces three orbits:

\[
\boxed{3,\ 6,\ 6.}
\]

There is no fixed form:

\[
\boxed{
\#\{q:\ (S_3\times S_2)q=q\}=0.}
\]

The smallest orbit of size three consists of choices that distinguish one color direction while pairing the other two color directions and the two weak directions. Selecting one point in that orbit breaks the color \(S_3\) Weyl symmetry to an \(S_2\).

Thus even the most flag-compatible coordinate twist is not gauge-Weyl invariant.

## 4. Consequence for direct field labelling

A coordinatewise identification

\[
\{\text{five source oscillator bits}\}
\longrightarrow
\{\text{five generators of }A_J\}
\]

would have to choose:

- one field/Cartan bit as the odd direction;
- two unordered relationships pairing the other four.

Neither the source \(S_5\) nor the Standard-Model \(3+2\) flag makes that choice.

Therefore a direct coordinate map preserving the ambient quadratic form requires extra structure beyond the established source symmetries.

## 5. What remained possible and is now partly realized

The no-go is specifically coordinate-normal. It does not exclude:

1. a non-coordinate linear isometry after passing to a different five-dimensional quotient;
2. a dynamically selected orientation field;
3. a puncture or boundary condition that legitimately breaks the Weyl action;
4. a Furey ternary operation selecting a matching;
5. a three-generation construction in which different generations occupy the three-element orbit;
6. a code deformation whose transition data, rather than static symmetry, selects the form.

Cycle 468 realizes the first route explicitly: a non-coordinate linear isometry sends the flag-invariant additive form

\[
3(x_1+x_2+x_3)+(x_4+x_5)
\]

to the ambient shell.

Each route must explain the symmetry reduction it introduces.

## 6. A possible three-generation clue

The smallest Standard-Model-flag orbit has size three. This is numerically suggestive for three generations:

\[
\{\text{three choices of distinguished color direction}\}.
\]

But assigning generations to color directions would ordinarily violate color symmetry, so this cannot be claimed physically without an additional mechanism that acts in generation space rather than gauge space.

The orbit size is a research clue, not a generation derivation.

## 7. Consequences

### Established

- exactly 15 coordinate ambient-type forms exist;
- \(S_5\) acts transitively;
- a form stabilizer has order eight;
- the \(S_3\times S_2\) flag has orbits \(3,6,6\);
- no ambient-type form is flag invariant.

### Falsified

- the \(3+2\) flag alone does not select the ambient quadratic refinement;
- a gauge-Weyl-invariant coordinatewise identification does not exist;
- puncturing or orientation cannot be left implicit: its symmetry cost must be stated.

### Open

- a non-coordinate isometry on a relative support quotient;
- a Furey/Jordan matching selector;
- a generation-space realization of the three-element orbit;
- a boundary transition that makes the symmetry breaking physical rather than arbitrary.

## 8. Stop-everything and falsification gates

### Stop-everything

1. A source ternary product selects one distinguished bit and matching while preserving physical gauge symmetry.
2. The three-element orbit is realized in generation space without tying generations to color directions.
3. A non-coordinate intertwiner maps a gauge-invariant source quotient to \(A_J\).
4. A dynamical selector field produces the order-eight stabilizer and a measurable phase.

### Boundaries

- orbit size three is not evidence for three generations by itself;
- coordinate relabelling cannot restore broken \(S_3\times S_2\) invariance;
- an extra selector must be derived, not fitted;
- the abstract isometry class does not provide field labels.

## Certificate and companions

- [Five-bit twist symmetry classification](../../../verification/classify/classify_five_bit_ambient_quadratic_twists_under_source_symmetry.mjs)
- [Source/ambient five-bit quadratic no-go](550_the_source_five_sign_bits_are_totally_isotropic_and_do_not_equal_the_ambient_quadratic_shell.md)
- [Ambient five-bit shell](549_the_two_ambient_spin23_lattices_intersect_in_a_five_bit_quadratic_shell.md)
- [Two-puncture Standard-Model flag](../0400-0499/451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
