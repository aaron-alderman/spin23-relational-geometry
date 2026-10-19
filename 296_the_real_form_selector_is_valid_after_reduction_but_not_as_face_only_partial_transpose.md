# The Real-Form Selector Is Valid After Reduction but Not as Face-Only Partial Transpose

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact classification of reduced antiunitary real forms and explicit positivity obstruction to a face-only microscopic lift; Furey-specific selector remains open

## 1. Classifying the one-direction selector

Write the reduced complex carrier as

\[
X=x_0I+x_x\sigma_x+x_y\sigma_y+x_z\sigma_z
\in H_2(\mathbb C).
\]

Ordinary conjugation in the standard basis acts by

\[
\kappa(X)=\overline X
=x_0I+x_x\sigma_x-x_y\sigma_y+x_z\sigma_z.
\]

Its fixed points are exactly

\[
H_2(\mathbb R)=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}.
\]

More generally, every antiunitary conjugation with square \(+1\) is unitarily equivalent to this one. On the Bloch three-vector it is a reflection through a plane. The fixed Jordan algebra is a rotated copy of \(H_2(\mathbb R)\), and the excluded direction is the plane normal.

As an unoriented choice, the selector space is

\[
\mathbb{RP}^2,
\]

not a unique point. Algebra alone therefore supplies a family of real forms, not the physical one.

## 2. The other antiunitary class does not work

In two complex dimensions an antiunitary can instead square to \(-1\), represented by

\[
\Theta=J\kappa,
\qquad
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

It flips all three Pauli directions. Its Hermitian fixed space is only

\[
\mathbb RI.
\]

Thus the quaternionic/time-reversal class reproduces the scalar-collapse problem rather than the desired rank-two real Jordan carrier. The physical selector must be real type, with square \(+1\).

## 3. Why a face-only microscopic lift fails positivity

It is tempting to apply \(\kappa\) to the face factor while leaving complex flavor untouched. On Hermitian matrices, this is face transpose:

\[
T_{\rm face}\otimes\operatorname{id}_{\rm flavor}.
\]

That map is the partial transpose. It is not positive on entangled face–flavor states.

For

\[
|\Phi\rangle=\frac1{\sqrt2}
\bigl(|0\rangle_{\rm face}|0\rangle_{\rm flavor}
+|1\rangle_{\rm face}|1\rangle_{\rm flavor}\bigr),
\]

the partial transpose of \(|\Phi\rangle\langle\Phi|\) has eigenvalue

\[
-\frac12.
\]

Therefore a face-only transpose cannot be the global positive conditional expectation, physical channel or positivity-preserving microscopic symmetry of the interacting parent.

## 4. Why global conjugation is also costly

A genuine antiunitary on the full complex Hilbert space conjugates complex scalars globally. It therefore acts on flavor matrices as

\[
H_f\mapsto\overline{H_f}.
\]

If imposed as an exact invariance of all flavor couplings, it removes the CP-odd data the independent-factor construction was designed to retain.

The dilemma is exact:

1. face-only conjugation preserves flavor CP but fails positivity on entangled parent states;
2. global conjugation preserves positivity but generally conjugates flavor CP;
3. a reduced conjugation is well-defined after positive flavor elimination, but is not automatically a microscopic symmetry.

## 5. The viable architecture

The order of operations matters:

\[
H_6(\mathbb C)
\xrightarrow{\text{positive causal reduction}}
H_2(\mathbb C)
\xrightarrow{\text{source/boundary/dynamical real selector}}
H_2(\mathbb R).
\]

The first arrow must retain hidden flavor self-energy and memory as required by the Herglotz analysis. The second may consistently restrict external probes or select a vacuum real form because it acts on the already-reduced carrier. It should not be retroactively interpreted as partial transpose of the entangled parent.

This also clarifies what Furey’s algebra must provide: not merely a conjugation somewhere in the division-algebra tower, but a reason that one member of the \(\mathbb{RP}^2\) family is selected on external responses after internal CP-bearing structure has been retained.

## 6. Relation to \(Spin(2,3)\)

Each chosen real-type involution fixes a Jordan algebra isomorphic to \(H_2(\mathbb R)\), so its conformal algebra is \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\). The isomorphism is exact for every choice.

What remains noncanonical is the embedding

\[
H_2(\mathbb R)\hookrightarrow H_2(\mathbb C),
\]

equivalently the excluded Bloch direction. The programme’s selector field, stress tensor, Furey conjugation or boundary condition must choose this embedding and control its fluctuations.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey or stress-derived operation canonically chooses one real-type involution on the reduced carrier and leaves the measured flavor CP invariant nonzero.

**Dynamical-selector trigger:** the selector normal becomes an order parameter with exactly the required two orientation modes and a healthy gap.

**Positivity falsifier:** a face-only microscopic transpose is treated as a positive map on arbitrary entangled face–flavor responses.

**CP falsifier:** global conjugation is imposed as exact flavor invariance while a nonzero Jarlskog invariant is simultaneously claimed.

**Canonicity falsifier:** the standard \(\sigma_y\) direction is removed by basis convention with no physical rule selecting it from \(\mathbb{RP}^2\).

## 8. Certificate

The [real-form selector/partial-transpose certificate](scripts/verify_reduced_real_form_selector_partial_transpose_obstruction.mjs) checks the real- and quaternionic-type fixed spaces and the \(-1/2\) Bell-state eigenvalue proving failure of positivity for the face-only parent lift.

## Companion documents

- [Independent face/flavor envelope](295_independent_face_and_complex_flavor_close_naturally_on_h6c_not_h12r.md)
- [Shared-index complex-structure obstruction](294_exact_flavor_complex_structure_collapses_the_shared_face_reduction_to_a_scalar.md)
- [Jordan selection axioms and \(Spin(2,4)\to Spin(2,3)\) descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Herglotz causal flavor reduction](293_h_erglotz_reduction_preserves_causality_while_hiding_second_order_memory.md)
