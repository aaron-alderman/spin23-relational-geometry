# Restoring Both Square Flips Turns the Four-Channel Response into a \(V_4\) Convolution Algebra with Walsh–Hadamard Relational Eigenchannels

## Claim status

Exact commutant and spectral theorem for the fully square-symmetric four-channel response. It identifies the noncentral relational replacement when both flip symmetries and cross-channel mixing coexist.

## 1. The fully restored square

Order the four atoms as

\[
(u,\nu,d,e).
\]

Let the two flips be

\[
F_H=(u\ \nu)(d\ e),
\qquad
F_C=(u\ e)(\nu\ d).
\]

They commute and generate

\[
V_4\cong\mathbb Z_2\times\mathbb Z_2.
\]

Their action on the four atoms is regular. A real symmetric response \(K\) invariant under both flips must have the form

\[
\boxed{
K=
\begin{pmatrix}
a&b&d&c\\
b&a&c&d\\
d&c&a&b\\
c&d&b&a
\end{pmatrix}.
}
\]

The four parameters correspond to the four group differences: identity, handle edge, channel edge and diagonal/product edge.

This is the real convolution algebra of \(V_4\).

## 2. Exact character diagonalization

The four one-dimensional characters are the normalized rows of the Walsh–Hadamard matrix:

\[
\begin{aligned}
v_1&=\tfrac12(1,1,1,1),\\
v_H&=\tfrac12(1,-1,-1,1),\\
v_C&=\tfrac12(1,1,-1,-1),\\
v_{HC}&=\tfrac12(1,-1,1,-1).
\end{aligned}
\]

They diagonalize every fully symmetric response, with eigenvalues

\[
\begin{aligned}
\lambda_1&=a+b+c+d,\\
\lambda_H&=a-b+c-d,\\
\lambda_C&=a+b-c-d,\\
\lambda_{HC}&=a-b-c+d.
\end{aligned}
\]

Thus the symmetric phase does not leave an arbitrary basis in a fourfold degeneracy when invariant mixing is present. It selects four relational character modes.

## 3. Atomic channels are maximally rotated

Every character vector has absolute overlap

\[
|\langle f|v_\chi\rangle|=\frac12
\]

with every atomic channel \(f\). The rank-one projector distance is therefore

\[
\boxed{
\|P_f-P_\chi\|_{\rm op}
=\sqrt{1-\frac14}
=\frac{\sqrt3}{2}
\approx0.866025.
}
\]

This is enormously larger than the atomic orientation tolerance

\[
0.0411023.
\]

Accordingly, exact restoration of both flips plus nontrivial invariant mixing is not an approximate four-atom regime. It is a genuine transition to relational eigenchannels.

## 4. Interpretation of the four modes

The modes are naturally typed as:

- total/common mode \(v_1\);
- handle-odd mode \(v_H\);
- Higgs-channel-odd mode \(v_C\);
- handle-times-channel mode \(v_{HC}\).

This is a precise version of “one carrier, two faces, three relationships.” Starting from four atomic cells, the Fourier-dual response basis contains one scalar/common direction and three nontrivial relational contrasts.

The three contrasts are not automatically an \(SO(3)\) triplet. Their eigenvalues are generally different, and the symmetry is the discrete group \(V_4\), not continuous rotation. Equality of the three contrast eigenvalues would require

\[
b=c=d,
\]

an additional isotropy condition.

## 5. What happens to the Jordan-center map

In the atomic basis, the direct-sum center had primitive idempotents \(z_f\). Under full symmetric mixing, these no longer commute with \(K\). The spectral primitive idempotents are instead

\[
P_1,P_H,P_C,P_{HC}.
\]

The response retains a four-atom spectral algebra, but its atoms are relational Fourier characters rather than field channels. A source-to-projector map must therefore be reformulated as

\[
\text{source contrasts}
\longrightarrow
\text{character projectors},
\]

not as \(u,d,e,\nu\) labels transported perturbatively.

The earlier orientation index, which depended on termwise channel/side alignment, is no longer quantized in its original form. A symmetric-phase observable should instead correlate the handle, channel and product contrast modes with corresponding response gradings.

## 6. Degenerate character eigenvalues

If two or more \(\lambda_\chi\) coincide accidentally, \(K\) alone does not distinguish bases inside that eigenspace. If the two flips are retained as physical commuting observables, their joint characters still select the four lines.

If the flips are only formal relabellings and not observable symmetries, an accidental eigenvalue degeneracy restores a basis ambiguity. Claiming canonical character channels then requires independent access to \(F_H\) and \(F_C\).

## 7. Phase diagram

The channel branch now has a concrete algebraic phase diagram:

1. **broken, unmixed:** exact atomic \(\mathbb R^4\) center;
2. **broken, weakly mixed and gapped:** approximate atomic channels;
3. **fully square-symmetric with invariant mixing:** exact Walsh–Hadamard relational channels;
4. **generic strongly mixed:** response-dependent relational eigenchannels with no fixed finite Fourier interpretation.

This is stronger than labeling the symmetric case a failure. It supplies its replacement algebra exactly.

## 8. Stop-everything tests

- **Symmetric relational success:** the calculated response commutes with both flip operators and fits the four-parameter convolution pattern.
- **Character-spectrum success:** measured poles or residues organize into the four predicted character projectors.
- **Contrast isotropy:** \(b=c=d\), making the three nontrivial characters degenerate.
- **Atomic falsifier:** an atomic source/projector identification is retained despite projector distance \(\sqrt3/2\).
- **Symmetry falsifier:** the response is called \(V_4\)-invariant but violates one of the two permutation commutators.
- **Degeneracy warning:** character lines are called observable when neither flip is independently measurable inside a degenerate eigenspace.

## 9. Executable certificate

    node scripts/diagonalize_the_fully_square_symmetric_four_channel_response_in_the_v4_hadamard_basis.mjs

The certificate verifies both flip symmetries, performs the exact Hadamard diagonalization, checks the four eigenvalue formulas and computes the universal atomic-to-character projector distance.

## Companion documents

- [Crossed gradings and complete flip degeneracy](817_the_crossed_furey_and_higgs_gradings_allow_four_independent_thresholds_while_restoring_both_square_flips_forces_complete_degeneracy.md)
- [Quadratic spurion response envelope](818_quadratic_spurion_edges_admit_a_closed_operator_norm_envelope_but_the_same_hierarchy_can_pass_or_fail_only_through_the_threshold_gap.md)
- [Four-channel center and two graded maps](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
- [Left/right response triplet criterion](299_left_right_and_cross_stress_form_a_triplet_only_as_the_pauli_part_of_a_face_matrix.md)
