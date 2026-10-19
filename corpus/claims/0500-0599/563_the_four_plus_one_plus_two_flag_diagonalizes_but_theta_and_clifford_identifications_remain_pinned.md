# The \(4+1+2\) flag diagonalizes, but theta and Clifford identifications remain pinned

## Executive result

The exact flag

\[
\overline{B^1}_4\subset R_5\subset Q_7
\]

now has a diagonal basis in the explicit seven quotient coordinates:

\[
\boxed{
\overline{B^1}
=\langle e_2,e_3,e_5,e_6\rangle,}
\]

\[
\boxed{
R
=\overline{B^1}\oplus\langle e_1\rangle,}
\]

and

\[
\boxed{
Q
=R\oplus\langle e_0,e_4\rangle.}
\]

Thus:

- four coordinates are infinitesimal-conjugation/coboundary directions;
- one coordinate is the unique non-coboundary moving direction;
- two coordinates form a stationary complementary plane.

The residual quotient is explicitly

\[
Q/\overline{B^1}
\cong
\langle e_1\rangle
\oplus
\langle e_0,e_4\rangle.
\]

This supplies concrete targets for the phase branches. But dimensional agreement is insufficient:

- identifying \(\langle e_1\rangle\) with the quartic theta orientation requires a derived character or quadratic phase;
- identifying \(\langle e_0,e_4\rangle\) with the binary Clifford/Heisenberg plane requires a derived alternating or quadratic form.

Neither structure is currently present on \(Q\). Both identifications are therefore pinned rather than asserted.

## 1. Quotient coordinate convention

Cycle 477 constructed seven quotient functionals

\[
\lambda_0,\ldots,\lambda_6
\]

on the 17-bit presentation-lift family. They define coordinates

\[
Q\cong\mathbb F_2^7
\]

with standard basis

\[
e_0,\ldots,e_6.
\]

The coordinate masks of the seven functionals are:

\[
1,\ 326,\ 73832,\ 512,\ 2048,\ 4096,\ 32768.
\]

All statements below refer to this fixed certificate basis.

## 2. Coboundary image

The 13-dimensional coboundary space \(B^1\subset Z^1\) projects to a four-dimensional subspace of \(Q=Z^1/U\).

Binary elimination gives the quotient-coordinate basis masks

\[
4,\ 32,\ 8,\ 64.
\]

These are exactly:

\[
e_2,\quad e_5,\quad e_3,\quad e_6.
\]

Therefore

\[
\boxed{
\overline{B^1}
=\langle e_2,e_3,e_5,e_6\rangle.}
\]

The four coboundary directions are coordinate axes in the selected quotient basis.

## 3. Unique moving quotient line

The five-dimensional moving-offset span \(R\) contains \(\overline{B^1}\).

One certificate representative for the extra line is mask

\[
34=32+2=e_5+e_1.
\]

Since \(e_5\in\overline{B^1}\), the quotient class is simply

\[
[34]=[e_1]
\quad\text{in}\quad
R/\overline{B^1}.
\]

Hence

\[
\boxed{
R
=\overline{B^1}\oplus\langle e_1\rangle.}
\]

The unique non-coboundary moving direction is represented by quotient coordinate one.

## 4. Stationary two-plane

A complement of \(R\) in \(Q\) is represented by masks

\[
1,\quad16,
\]

namely

\[
e_0,\quad e_4.
\]

Therefore:

\[
\boxed{
Q
=R\oplus\langle e_0,e_4\rangle.}
\]

Equivalently,

\[
\boxed{
Q/R
\cong\langle e_0,e_4\rangle
\cong\mathbb F_2^2.}
\]

These are exactly the two quotient coordinates that vanish on all observed lift offsets through \(2^{16}\).

## 5. The complete diagonal flag

Combining the three pieces:

\[
Q
=
\underbrace{\langle e_2,e_3,e_5,e_6\rangle}_{4\text{ coboundary}}
\oplus
\underbrace{\langle e_1\rangle}_{1\text{ moving}}
\oplus
\underbrace{\langle e_0,e_4\rangle}_{2\text{ stationary}}.
\]

Thus the \(4+1+2\) dimensions are not merely abstract quotient counts. They are explicitly separated coordinate blocks.

The residual non-coboundary quotient is:

\[
Q/\overline{B^1}
\cong
\underbrace{\langle e_1\rangle}_{\text{moving line}}
\oplus
\underbrace{\langle e_0,e_4\rangle}_{\text{stationary plane}}.
\]

## 6. Test against the quartic theta line

The established quartic theta structure supplies a one-dimensional orientation character or fourth-root phase line.

The new moving quotient

\[
R/\overline{B^1}\cong\mathbb F_2
\]

has the correct binary dimension to be its sign shadow.

However, a valid identification requires a map such as

\[
\chi_\theta:Q\to\mathbb F_2
\]

with:

\[
\chi_\theta(\overline{B^1})=0,
\qquad
\chi_\theta(e_1)=1,
\]

and a derivation showing that this character controls the established quartic phase.

No such derived character is currently available. The coordinate functional dual to \(e_1\) can be written down, but choosing it because it has the correct dimension would be circular.

Therefore:

\[
\boxed{
\langle e_1\rangle
\text{ is a precise candidate target for theta orientation, not an identification.}}
\]

## 7. Test against the Clifford/Heisenberg plane

The binary Heisenberg construction uses a two-dimensional symplectic phase space

\[
V_{\rm H}\cong\mathbb F_2^2
\]

with a nondegenerate alternating pairing and a quadratic phase refinement.

The stationary quotient plane

\[
S=\langle e_0,e_4\rangle
\]

has the same vector-space dimension.

But a two-dimensional vector space alone is not a Heisenberg phase space. One must derive:

\[
\omega_S:S\times S\to\mathbb F_2
\]

with

\[
\omega_S(e_0,e_4)=1,
\]

or an equivalent nondegenerate alternating form, plus the relevant quadratic refinement.

No canonical pairing on \(S\) has been obtained from the lift equations.

There are six linear isomorphisms between two labelled binary planes, and without a pairing or field-label map none is preferred.

Therefore:

\[
\boxed{
\langle e_0,e_4\rangle
\text{ is a candidate carrier for the Heisenberg plane, not yet that plane.}}
\]

## 8. Why the two tests are now properly pinned

The phase comparisons no longer fail for lack of a target. They have exact target spaces:

\[
\text{theta target}=\langle e_1\rangle,
\]

\[
\text{Clifford target}=\langle e_0,e_4\rangle.
\]

The blockers are now named structures:

### Theta blocker

A source-derived linear or quadratic character on \(Q/\overline{B^1}\) that detects \(e_1\).

### Clifford blocker

A source-derived nondegenerate alternating form and quadratic refinement on \(Q/R\).

These are genuine dependencies. Assigning them by hand would add precisely the structure the programme is trying to derive.

## 9. Relational interpretation

The residual quotient has the exact decomposition

\[
3=1+2.
\]

This can be read provisionally as:

- one transport or carrier direction;
- two stationary face directions;
- three residual relational coordinates after coboundaries are removed.

The mathematical statement is the direct-sum decomposition in the displayed basis. The words “carrier” and “faces” remain interpretation until an action on physical states or observables is constructed.

## 10. Claim status

### Established

- the coboundary image is \(\langle e_2,e_3,e_5,e_6\rangle\);
- the unique moving quotient line is represented by \(e_1\);
- the stationary plane is represented by \(\langle e_0,e_4\rangle\);
- the complete quotient splits as the displayed \(4+1+2\) coordinate flag.

### Candidate bridge

- \(e_1\) may carry the binary shadow of quartic theta orientation;
- \(\langle e_0,e_4\rangle\) may carry the binary Heisenberg/Clifford phase plane;
- the residual \(1+2\) split may realize the carrier/two-face heuristic.

### Pinned dependencies

- no derived theta character on \(e_1\);
- no derived alternating form on the stationary plane;
- no quadratic refinement relating the plane to the quartic extension;
- no physical source labels on the quotient coordinates.

### Falsification boundaries

- vector-space dimension alone cannot identify phase structures;
- arbitrary choice of \(\omega(e_0,e_4)=1\) is not a derivation;
- an arbitrary nonzero functional on the moving line is not automatically the theta character.

## 11. Stop-everything gates

1. The quartic theta character factors canonically through \(R/\overline{B^1}\).
2. The Heisenberg commutator pairing descends canonically to \(Q/R\).
3. A single quadratic refinement couples \(e_1\) to the stationary plane and reproduces both phase branches.
4. Furey or Jordan operators label the three residual coordinates without arbitrary basis choices.

## 12. Next branches

Because the phase identifications are now genuinely pinned, productive parallel routes are:

1. derive a pairing from the presentation relation Hessian;
2. inspect the Clifford commutator cocycle on the explicit wreath generators;
3. transport field labels from the Furey support lattice to the quotient functionals;
4. pursue the all-level two-adic lifting proof independently of phase interpretation.

> **Cycle 480 refinement.** The first route has now been tested and falsified in its direct form. The quadratic compatibility Hessian annihilates the full preimage of \(R\), so it descends to \(Q/R\), but the descended form is zero: \(H_m(e_0,e_4)=0\) at all twelve tested stages through \(2^{16}\). The factorized Prakash–Ramya two-puncture phase independently has zero mixed finite difference. The stationary pairing must therefore come from a different relational structure. See [The Standard-Model code confirms the five-bit cubic bridge, but its polarization does not pair the stationary plane](564_the_standard_model_code_confirms_the_five_bit_cubic_bridge_but_its_polarization_does_not_pair_the_stationary_plane.md).

## Certificate and companions

- [Graded-piece basis certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Exact \(4+1+2\) flag](562_the_seven_dimensional_lift_quotient_has_an_exact_four_plus_one_plus_two_flag.md)
- [Quartic theta line](536_the_quartic_m_over_i_character_is_an_independent_global_orientation_line.md)
- [Binary Heisenberg completion](539_the_quartic_extension_embeds_in_the_binary_heisenberg_group_and_its_phase_is_a_clifford_shear.md)

