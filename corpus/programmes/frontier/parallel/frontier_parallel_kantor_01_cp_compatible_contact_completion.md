# Frontier Parallel 4: A CP-Compatible Kantor Contact Completion Exists

**Date:** 18 October 2026  
**Status:** exact real finite-dimensional classification; complex metric-only lift subsequently closed  
**Scope:** local metric-built real trilinear products on the CP-paired lepton rectangles (M_{2,1}(\mathbb R)\leftrightarrow M_{1,2}(\mathbb R))

## Result

The earlier Kantor closure was too narrow. It correctly proved that applying the *canonical structurable formula separately to both opposite rectangles* is incompatible with physical transpose pairing. It did not classify all transpose-compatible products on the paired object.

That larger classification has four nonzero projective Kantor rays. Two have a nonzero (K)-operator and hence a contact layer. One distinguished ray also outer-symmetrizes exactly to the already established Jordan triple:

\[
\boxed{V(x,y,z)=x\langle y,z\rangle.}
\]

For this ray,

\[
K(x,y)z=x\langle z,y\rangle-y\langle z,x\rangle\ne0,
\]

while

\[
\frac12\bigl(V(x,y,z)+V(z,y,x)\bigr)
=\frac12\left(x\langle y,z\rangle+z\langle y,x\rangle\right)
\]

is precisely the Hermitian Jordan observable product.

This is the first tested product in the programme that simultaneously retains:

- transpose/CP covariance on the paired real lepton support;
- a genuine Kantor identity;
- a nonzero orientation/contact operator;
- the known Jordan triple as its symmetric observable shadow.

It is therefore a genuine real-slice construction. The immediate complex lift has since failed, so it is physically live only if an independent mechanism first selects this real slice; see [the phase-lift no-go](frontier_parallel_kantor_03_complex_phase_lift_no_go.md).

## 1. Complete transpose-compatible metric family

On (V=\mathbb R^2), every metric-built (O(2))-equivariant cubic map has the form

\[
V_{abc}(x,y,z)
=a,x\langle y,z\rangle
+b,z\langle y,x\rangle
+c,y\langle x,z\rangle.
\]

At the rectangular-matrix level, this is realized covariantly by pairing each ordered word with its transpose reverse. If

\[
(p,d,e)=\frac12(a+b-c, a+c-b, b+c-a),
\]

then

\[
\begin{aligned}
\widehat V(x,y,z)={}&p(xy^Tz+zy^Tx)\\
&+d(xz^Ty+yz^Tx)\\
&+e(yx^Tz+zx^Ty).
\end{aligned}
\]

The same six-word formula on the opposite rectangle obeys

\[
\widehat V(x^T,y^T,z^T)=\widehat V(x,y,z)^T.
\]

For the distinguished ray ((a,b,c)=(1,0,0)),

\[
(p,d,e)=\left(\frac12,\frac12,-\frac12\right).
\]

The negative coefficient is not inserted to obtain a numerical fit; it is the unique six-word reconstruction of the simple column product (x\langle y,z\rangle) that is functorial under transpose.

## 2. Exact Kantor classification

Using

\[
L(x,y)z=V(x,y,z),\qquad
K(x,y)z=V(x,z,y)-V(y,z,x),
\]

the two Kantor identities reduce, on all (2^5) basis choices, to only two independent homogeneous quadratic equations:

\[
c(c+a)=0,
\]

\[
3b^2-3ab-ac+bc=0.
\]

Their nonzero real projective solutions are

| ray ((a,b,c)) | (K\ne0)? | Jordan shadow? |
|---|---:|---|
| ((1,0,0)) | yes | exactly the established Jordan triple |
| ((1,1,0)) | no | Jordan triple itself |
| ((1,1,-1)) | no | different symmetric product |
| ((3,1,-3)) | yes | different symmetric product |

The first ray is selected among the four by requiring both (K\ne0) and the existing Jordan observable as outer symmetrization. Up to overall scale, no second ray has both properties.

## 3. Why the earlier no-go remains correct

The canonical structurable product on (M_{2,1}),

\[
xy^Tz+zy^Tx-zx^Ty,
\]

collapses on a column to (x\langle y,z\rangle). Applied canonically to (M_{1,2}), however, it does not collapse the same way, its (K)-layer vanishes, and transpose does not intertwine the two products.

The new completion keeps the column product but changes the opposite-face realization to its transpose transport. Equivalently, it uses the six-word paired formula above rather than applying the three-word structurable formula independently on each face.

So the logical update is:

\[
\begin{array}{c}
\text{canonical componentwise structurable completion}\\
\downarrow\\
\text{CP incompatible (still closed)}\\[4pt]
\text{paired transpose-functorial six-word completion}\\
\downarrow\\
\text{CP compatible Kantor system with }K\ne0\text{ (newly open).}
\end{array}
\]

No previous certificate is contradicted.

## 4. Contact (Spin(2,3)) consequence

For the distinguished ray,

\[
L(x,y)=xy^T,
\]

so the (L)-operators span all (M_2(\mathbb R)), of dimension four. The (K)-operators span (mathfrak{so}(2)), of dimension one. The associated grading therefore has dimensions

\[
(1,2,4,2,1),
\]

the same contact grading that closes on

\[
\mathfrak{so}(3,2)\cong\mathfrak{sp}(4,\mathbb R).
\]

Kantor triple systems and their five-graded Lie algebras are constructed in [Palmkvist](https://arxiv.org/abs/math/0504544); the structurable correspondence and its precise hypotheses are treated in [Elduque, Kamiya and Okubo](https://arxiv.org/abs/1205.2489).

The important new point is not another occurrence of the same Lie algebra. It is that the contact grading and Jordan shadow now coexist on a CP-paired carrier.

## 5. What is and is not established

Established:

1. the metric contraction ansatz is exhausted;
2. the Kantor constraints are exactly classified;
3. the distinguished ray is transpose covariant at matrix level;
4. its (K)-layer is nonzero;
5. its symmetric shadow is the known Jordan triple;
6. its grading dimensions match the contact (Spin(2,3)) realization.

Not established:

1. that the six-word combination is induced by the Furey/CAR product rather than chosen algebraically;
2. that it extends consistently to all four completed matter rectangles with their gauge representations;
3. that it is compatible with complex phases, Yukawa dressing and the full physical CP antiunitary;
4. that its local (K)-orientation maps to the global Walsh/flux orientation witness;
5. that an action produces this product or gives it a measurable normalization.

## 6. Next decisive tests

The first listed gate was executed after this classification: both nonzero-(K) rays fail after phase doubling. The branch now remains alive only through the following extra-structure gates:

1. **Real-subbundle selection:** derive the real slice from a Higgs, Majorana, boundary, or CP-breaking datum.
2. **Full-carrier extension:** classify coefficient choices on (M_{3,2}\oplus M_{2,3}\oplus M_{2,1}\oplus M_{1,2}) compatible with that selector and all conjugate pairings.
3. **CAR derivation:** determine whether the coefficient pattern ((1/2,1/2,-1/2)) follows from a conditional expectation, real structure, or graded commutator.
4. **Orientation intertwiner:** map the local (K)-generator to the four-channel Walsh/flux odd observable without choosing an extra sign.
5. **Action test:** find a cubic or quartic term whose polarization yields the product and respects the residual Standard-Model gauge action.

Absent gate 1, the physical branch is closed while the real theorem remains. Success through gate 4 would be a stop-everything result because it would join the previously separated Jordan, CP and orientation layers.

## 7. Reproduction

```powershell
node verification/verify/verify_frontier_kantor_cp_contact_completion.mjs
```

The certificate derives the quadratic constraint space by polarization, solves its two factored equations into four projective rays, tests all real basis identities, verifies matrix-level transpose covariance, checks (K), and proves the Jordan-shadow property.

## Dependencies

- [Raw TRO failure and structurable repair](../../../claims/0800-0899/830_the_raw_furey_tro_product_fails_the_second_kantor_identity_while_its_structurable_linking_product_passes.md)
- [Classical five-grading and real-lepton coincidence](../../../claims/0800-0899/831_the_structurable_furey_five_grading_is_classical_and_spin23_appears_only_on_the_real_lepton_slice.md)
- [Canonical product CP obstruction](../../../claims/0800-0899/832_cp_pairing_preserves_the_lepton_jordan_graph_but_not_the_kantor_spin23_slice_closing_the_oriented_parent_gate.md)
- [Jordan/TKK (Spin(2,3)) determination](../../../claims/0000-0099/42_jordan_triple_to_sp4r_determination.md)

