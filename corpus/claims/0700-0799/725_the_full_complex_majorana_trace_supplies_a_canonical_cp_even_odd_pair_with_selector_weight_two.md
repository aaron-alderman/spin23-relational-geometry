# The Full Complex Majorana Trace Supplies a Canonical CP-Even/Odd Pair with Selector Weight Two

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the weight-two source branch  
**Claim status:** exact weak-basis/CP packaging and selector representation identity; common physical matching coefficient remains unproved  
**Certificate:** [verify_complex_majorana_trace_is_selector_weight_two_anisotropy_pair.mjs](../../../verification/verify/verify_complex_majorana_trace_is_selector_weight_two_anisotropy_pair.mjs)

## Executive result

The Majorana analysis previously retained only

\[
I_2
=\operatorname{ImTr}(H_\ell H_\nu G_{\ell\nu}).
\]

Do not discard the real part. Define the full complex weak-basis scalar

\[
\boxed{
Z_2
=\operatorname{Tr}(H_\ell H_\nu G_{\ell\nu})
=E_2+iI_2.
}

\]

Both components are weak-basis invariant. Under CP,

\[
Z_2\mapsto Z_2^*,
\qquad
E_2\mapsto E_2,
\qquad
I_2\mapsto-I_2.
\]

Package them into the symmetric traceless response anisotropy

\[
\boxed{
Q(Z_2)=
\begin{pmatrix}
E_2&I_2\\
I_2&-E_2
\end{pmatrix}.
}

\]

Under a selector rotation (R(\varphi)),

\[
R(\varphi)^TQ(Z_2)R(\varphi)
=Q(e^{-2i\varphi}Z_2).

\]

Thus (Z_2) supplies exactly the weight-two even/odd pair demanded by document 724.

This is a canonical spurion construction. It is not yet a proof that the Standard Model possesses a physical selector (U(1)), or that one common coefficient multiplies both (E_2) and (I_2).

## 1. Weak-basis status

Document 721 proved that

\[
H_\ell,
\quad
H_\nu,
\quad
G_{\ell\nu}
\]

all transform by the same unitary similarity. Consequently the **complex** trace (Z_2), not merely its imaginary part, is weak-basis invariant.

The imaginary part is the CP-odd diagnostic. The real part is an equally physical CP-even scalar formed from the identical ordered flavor word.

This matters because a response anisotropy needs both:

\[
\delta=\frac{\alpha-\beta}{2}
\quad\text{and}\quad
\xi=cs.

\]

The pair ((E_2,I_2)) is the first source pair in the programme whose two entries share the same algebraic origin, mass dimension and spurion order.

## 2. Exact CP action

Let response CP be

\[
C=\operatorname{diag}(1,-1).

\]

Then

\[
CQ(Z_2)C
=Q(Z_2^*).

\]

The diagonal anisotropy is CP even; the off-diagonal mixing is CP odd. No separate transformation convention is required.

## 3. Exact selector weight

For

\[
R(\varphi)=
\begin{pmatrix}
\cos\varphi&-\sin\varphi\\
\sin\varphi&\cos\varphi
\end{pmatrix},

\]

direct multiplication gives

\[
\begin{pmatrix}E_2'\\I_2'\end{pmatrix}
=
\begin{pmatrix}
\cos2\varphi&\sin2\varphi\\
-\sin2\varphi&\cos2\varphi
\end{pmatrix}
\begin{pmatrix}E_2\\I_2\end{pmatrix}.

\]

Equivalently,

\[
Z_2'=e^{-2i\varphi}Z_2.

\]

This is precisely the symmetric-traceless, or spin-two, representation of the selector rotation.

## 4. One-coefficient response prediction

If a single real matching coefficient (g_2) multiplies the complete matrix,

\[
K
=k_0I_2+g_2Q(Z_2),

\]

then

\[
\alpha-\beta=2g_2E_2,
\qquad
cs=g_2I_2.

\]

The response gap becomes

\[
\boxed{
\Delta=2|g_2|,|Z_2|
}

\]

and the selected projective angle obeys

\[
\boxed{
2\theta=\arg Z_2
}

\]

up to the ordering of the two eigenlines and the sign of (g_2).

This would unite the previously independent diagonal splitting and CP-odd cross-kernel.

## 5. Why the common coefficient is a real new gate

CP covariance alone permits

\[
K
=k_0I
+g_EE_2
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
+g_II_2
\begin{pmatrix}0&1\\1&0\end{pmatrix}.

\]

There is no requirement that

\[
g_E=g_I.

\]

Equality follows only if a physical diagonal selector symmetry, a complex-linear response map, or the amplified TRO/Jordan structure treats (Z_2) as one irreducible complex object.

Therefore the predictive relation (2\theta=\arg Z_2) is a falsifiable branch, not an established result.

## 6. Spurionic versus physical selector symmetry

Mathematically, assigning

\[
Z_2\mapsto e^{-2i\varphi}Z_2

\]

restores covariance under simultaneous source/response rotation.

But (Z_2) is built from fixed Standard-Model masses and mixing data. No known Standard-Model symmetry rotates its real and imaginary parts continuously. The assignment is therefore spurionic unless a transformation of the underlying Nambu/Furey data realizes it.

A fixed measured (Z_2\ne0) selects an orientation and breaks the hypothetical selector circle.

## 7. Relation to the Nambu TRO

The Nambu TRO generates

\[
G_{\ell\nu}=P_+\{\mathcal M,\widehat H_\ell,\mathcal M\}P_+.

\]

The associative linking algebra then closes

\[
Z_2=\operatorname{Tr}(H_\ell H_\nu G_{\ell\nu}).

\]

Taking real and imaginary parts only at the final response map preserves the complex word as long as possible. This is the natural place to test whether the physical map is complex linear and therefore enforces (g_E=g_I).

## 8. Branch tree

### Path A — complex-linear matching

The complete (Z_2) maps to one selector weight-two tensor. The response angle is half its phase and the gap is proportional to its modulus.

### Path B — merely real CP-equivariant matching

Independent (g_E) and (g_I) are allowed. The angle depends on dynamics rather than on (arg Z_2) alone.

### Path C — only the imaginary part matches

Majorana CP produces off-diagonal mixing but no associated even splitting. The selector symmetry is explicitly anisotropic and not diagonally restored.

### Path D — neither component matches

The flavor word is physically valid but irrelevant to the Clifford response. Pin this sewing branch.

## 9. Stop-everything criteria

Stop treating (I_2) as the entire flavor word; it is the imaginary part of (Z_2).

Stop claiming selector charge two as a Standard-Model symmetry; it is currently a response-side spurion assignment.

Stop using (2\theta=\arg Z_2) unless one common matching coefficient is derived.

Stop equating CP covariance with complex linearity; real equivariant maps allow independent even and odd coefficients.

Stop the one-coefficient branch if an explicit matching calculation yields (g_E\ne g_I).

## 10. Highest-value next calculations

1. Test whether the amplified Nambu/Furey response map is complex linear on (Z_2).
2. Classify all real CP-equivariant maps from the (Z_2) plane to response anisotropies and recover the two-coefficient family.
3. Add the quark complex trace words and determine whether their weight-two tensors align.
4. Compute renormalization mixing between (E_2) and (I_2).
5. Compare the predicted half-phase angle with the projective carrier identification (q\sim-q).

## Companion documents

- [Minimal CP-spurion kernel and angular curvature](724_a_minimal_cp_spurion_kernel_generically_removes_the_selector_circle_and_gives_the_response_angle_a_calculable_curvature.md)
- [Nambu TRO compression of the Majorana word](721_the_majorana_weak_basis_word_is_one_nambu_tro_compression_but_not_an_internal_product_of_the_bare_furey_matter_tro.md)
- [Projective CP invariant of the response line](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
