# CP Pairing Preserves the Lepton Jordan Graph but Not the Kantor (Spin(2,3)) Slice, Closing the Oriented-Parent Gate

## Claim status

Exact finite-basis comparison of the established Dirac/CP transpose exchange with the real lepton Jordan and structurable Kantor products. The test triggers the predeclared closure condition for the oriented Kantor-parent branch.

## 1. The conditional claim being tested

The real lepton rectangle

\[
L=M_{2,1}(\mathbb R)
\]

with the structurable Kantor product closes on

\[
\mathfrak{so}(3,2)
\cong
\mathfrak{sp}(4,\mathbb R).
\]

This would become physically relevant if the already established CP/topology real structure selected precisely that real rectangle.

But the actual Dirac face exchange does not act internally on \(L\). It exchanges the opposite lepton faces

\[
M_{2,1}\longleftrightarrow M_{1,2}
\]

by transpose. On the real pair its action is

\[
\Theta(X,Y)=(Y^T,X^T).
\]

The correct invariant object is therefore the fixed graph

\[
\mathcal G_{2,1}
=\{(X,X^T):X\in M_{2,1}(\mathbb R)\},
\]

not the first rectangle alone.

## 2. Jordan product passes

For

\[
J(x,y,z)=\frac12(xy^Tz+zy^Tx),
\]

transpose covariance is exact:

\[
J(x^T,y^T,z^T)=J(x,y,z)^T.
\]

All eight triples of the two real lepton basis vectors pass. Therefore

\[
\boxed{\mathcal G_{2,1}\text{ is a real Jordan subtriple}.}
\]

This reproduces the established paired-rectangle result and confirms that the CP reduction is well typed at the Jordan-observable level.

## 3. Structurable Kantor product fails

For

\[
V(x,y,z)=xy^Tz+zy^Tx-zx^Ty,
\]

transpose does not preserve the ordered subtraction term. The certificate finds four failures among the eight basis triples.

The first uses

\[
x=y=e_0,
\qquad
z=e_1.
\]

On \(M_{2,1}\),

\[
V(e_0,e_0,e_1)=0,
\]

whereas on the transposed \(M_{1,2}\) face,

\[
V(e_0^T,e_0^T,e_1^T)
=\begin{pmatrix}0&1\end{pmatrix}.
\]

Hence

\[
\boxed{
V(x^T,y^T,z^T)\ne V(x,y,z)^T.
}
\]

The fixed transpose graph is not a structurable Kantor subtriple.

## 4. The five-gradings cannot be exchanged

The mismatch is structural rather than accidental. The two real rectangles have gradings

\[
M_{2,1}:\qquad(1,2,4,2,1),
\]

and

\[
M_{1,2}:\qquad(0,2,2,2,0).
\]

Their degree-two operators are

\[
K_{M_{2,1}}(e_0,e_1)
=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix},
\]

but

\[
K_{M_{1,2}}=0.
\]

Thus CP transpose exchanges a nonzero orientation layer with a system having no orientation layer. It cannot be an automorphism of the Kantor five-grading.

## 5. Consequence for the orientation observable

The local \(M_{2,1}\) area operator is odd under outer exchange inside that rectangle. But the physical Dirac/CP exchange sends the rectangle to its opposite face, where the corresponding \(K\)-operator vanishes.

Therefore the local area sign cannot represent the global orientation torsor in a CP-covariant way:

\[
\boxed{
K_{M_{2,1}}\text{ does not descend to the CP-fixed paired graph}.}
\]

This blocks the hoped-for identification with the orientation-odd flux/Walsh coherence of the four-channel response.

One could force an internal action by choosing an additional isomorphism

\[
M_{1,2}\to M_{2,1},
\]

but that choice is precisely the unsourced face identification the calculation was supposed to derive. It would be basis dependent and is not admissible as evidence.

## 6. Final verdict on the bounded Kantor gate

The gate’s required decisions are now complete.

| test | result |
|---|---|
| raw ordered TRO is directly Kantor | **fail**: second identity counterexample |
| natural structurable linking product is Kantor | **pass**: exhaustive phase-doubled basis audit |
| nonzero five-grading | **pass** |
| full Lie closure | classical special-unitary linking sum |
| exceptional parent | **fail** |
| real lepton \(Spin(2,3)\) subclosure | **pass mathematically** |
| selected by established CP pairing | **fail** |
| local \(K\)-orientation descends globally | **fail** |
| outer symmetrization recovers old Jordan triple | raw product: **yes**; structurable product: **no** |
| grade-preserving recovery of \(H_2(\mathbb R)\) TKK face | **fail**: contact negative part is nonabelian |

Accordingly:

\[
\boxed{
\text{The oriented Kantor/structurable parent branch is closed as an explanation of the current }Spin(2,3)\text{ response.}
}
\]

The exact classical closures remain useful mathematics, and the real lepton coincidence may be revisited only if a new physical real structure—not the established transpose pairing—is independently derived.

## 7. What survives for the grand synthesis

The negative result clarifies the hierarchy:

1. the **raw TRO** retains physical arrow order but is not Kantor;
2. its **Jordan symmetrization** is compatible with CP transpose and the paired observable graph;
3. the **structurable correction** is Kantor but changes the product and breaks CP transpose covariance;
4. the existing \(H_2(\mathbb R)\to\mathfrak{sp}(4,\mathbb R)\) response route remains the valid Spin(2,3) derivation;
5. the Furey TRO can source or type that response, but the tested Kantor completion does not provide its parent symmetry.

This is a useful “do not merge” theorem: the oriented, Jordan-observable and structurable layers are related, but they cannot be treated as one algebraic object.

## 8. Stop-everything and revisit criteria

- **Current stop condition:** triggered by failure of CP-fixed Kantor closure and loss of the \(K\)-line on the opposite face.
- **No arbitrary repair:** do not choose an isomorphism between opposite rectangles merely to preserve \(K\).
- **Revisit only if:** a physical boundary, Higgs or CAR construction independently supplies a face identification and proves it intertwines both products.
- **Strong revisit signal:** the same map transports the local area operator to the measured global Walsh/flux orientation without a free phase.
- **Stop-everything positive:** an invariant-preserving regrading relates the CP-fixed paired Jordan graph, the contact \(Spin(2,3)\) grading and the \(H_2(\mathbb R)\) conformal grading simultaneously.

## 9. Executable certificate

    node verification/test/test_cp_transpose_pairing_against_the_real_lepton_structurable_kantor_slice.mjs

The certificate checks all paired lepton basis triples, gives the first explicit structurable covariance failure, compares degree-two layers and verifies that the Jordan graph remains closed.

## Companion documents

- [Classical five-grading and conditional real-lepton Spin(2,3)](831_the_structurable_furey_five_grading_is_classical_and_spin23_appears_only_on_the_real_lepton_slice.md)
- [Raw TRO failure and structurable repair](830_the_raw_furey_tro_product_fails_the_second_kantor_identity_while_its_structurable_linking_product_passes.md)
- [Transpose-paired Jordan graph](812_transpose_paired_furey_rectangles_form_a_real_jordan_subtriple_but_the_higgs_vacuum_creates_the_four_channel_split.md)
- [Dirac/CP Hermitian boundary](../0600-0699/690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [Established Jordan-to-Spin(2,3) route](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
