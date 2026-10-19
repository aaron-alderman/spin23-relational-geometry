# The Freudenthal Quartic Can Homogenize the (H_2(mathbb R)) Determinant but Does Not Select the Embedding, Orientation or an (E_8) Parent

## Claim status

Exact invariant-restriction calculation on a concrete associative corner of the Albert algebra, quarantined from the main synthesis. It reproduces the established \(H_2(\mathbb R)\) determinant only after homogenization, while exposing three independent embedding choices and failing to preserve the relevant pairing or orientation data. The proposed Freudenthal/\(E_8\) parent interpretation is therefore closed under its stated criterion.

## 1. Concrete corner

Let

\[
h=
\begin{pmatrix}
a&x\\
x&b
\end{pmatrix}
\in H_2(\mathbb R),
\qquad
\det h=ab-x^2.
\]

Choose one primitive diagonal idempotent of \(J_3(\mathbb O)\) as the complementary corner and one real unit direction in the associated octonionic off-diagonal entry. The corresponding real associative subspace is

\[
X(h,c)=
\begin{pmatrix}
a&x&0\\
x&b&0\\
0&0&c
\end{pmatrix}.
\]

The Albert cubic norm reduces exactly to

\[
\boxed{N(X(h,c))=c(ab-x^2)=c\det h.}
\]

No octonionic associator enters this restriction because the selected corner is associative.

## 2. The direct linear embedding is null

The natural linear corner inclusion is

\[
\iota_0(h)=X(h,0).
\]

It obeys

\[
\boxed{N(\iota_0(h))=0}
\]

for every \(h\). This is forced by degree and rank: a rank-two block with a zero complementary diagonal has zero cubic determinant.

Therefore the statement

\[
\text{“the Albert cubic restricts directly to the }H_2\text{ determinant”}
\]

is false for the linear embedding.

## 3. Homogenized Freudenthal lift

The Freudenthal space associated with \(J=J_3(\mathbb O)\) is

\[
\mathcal F(J)=\mathbb R\oplus\mathbb R\oplus J\oplus J.
\]

Using coordinates \((\alpha,\beta,X,Y)\), choose the slice

\[
\alpha=t,
\qquad
\beta=0,
\qquad
X=X(h,\kappa t),
\qquad
Y=0.
\]

On this slice the standard Freudenthal quartic reduces, independently of adjoint-sign conventions, to

\[
q(\alpha,0,X,0)=-4\alpha N(X).
\]

Consequently

\[
\boxed{
q=-4\kappa t^2\det h.
}
\]

On the affine chart \(t=1\),

\[
q=-4\kappa\det h.
\]

The executable certificate verifies this on 2500 integer tuples.

This is a genuine invariant lift: the Lorentzian determinant appears as a restriction of the quartic after adding a homogenizing coordinate.

## 4. Why this does not yet constrain the programme

The lift contains free choices.

### 4.1 Corner choice

There are three coordinate choices for the complementary primitive idempotent, and the full Albert automorphism group moves primitive idempotents through a continuous Cayley-plane orbit. No Standard-Model, Furey or response datum in the current programme selects one.

### 4.2 Octonionic direction

Replacing the real off-diagonal unit by any norm-one octonion gives the same restricted norm because only \(|x u|^2=x^2\) appears. The restriction is blind to that direction.

### 4.3 Homogenizing scale

The parameter \(\kappa\) rescales the recovered determinant:

\[
q\mapsto\kappa q.
\]

Nothing fixes it. Setting \(\kappa=1\) is a normalization choice, not a prediction.

Thus the determinant is embedded, but the embedding is not selected.

## 5. The symplectic pairing does not descend

The Freudenthal symplectic form has schematic expression

\[
\langle(\alpha,\beta,X,Y),(\alpha',\beta',X',Y')\rangle
=\alpha\beta'-\beta\alpha'
+\operatorname{Tr}(XY')-\operatorname{Tr}(YX').
\]

It vanishes identically on the chosen slice because

\[
\beta=Y=\beta'=Y'=0.
\]

But the polarization of the \(H_2\) determinant is nonzero:

\[
B(h,h')=ab'+a'b-2xx'.
\]

For

\[
h=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
h'=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\]

one has \(B(h,h')=1\) while the restricted Freudenthal symplectic pairing is zero.

Hence the lift does not preserve the source–response or phase-space pairing needed by the present programme.

## 6. Orientation is invisible

The reflection

\[
x\mapsto-x
\]

preserves both

\[
\det h=ab-x^2
\]

and

\[
q=-4\kappa t^2(ab-x^2).
\]

Therefore the restricted quartic cannot detect the orientation-odd bit established in the flux/Walsh analysis. It supplies no replacement for the missing phase convention.

## 7. (E_7) versus (E_8)

The 56-dimensional Freudenthal system carries the quartic and symplectic invariants associated with \(E_7\). In an \(E_8\) grading, that 56 appears as the minuscule \(E_7\) representation; \(E_8\) is the larger graded or quasiconformal construction, not the stabilizer of this corner quartic alone. This distinction is explicit in [Helenius’s root-system construction](https://arxiv.org/abs/1005.1275).

Thus even a canonical Freudenthal embedding would establish at most an \(E_7\)-structured invariant space before extra work. It would not show that \(E_8\) supplies the dynamical “rules of the universe.”

## 8. Quarantine verdict

The requested success criterion was stricter than containment. The calculation gives:

| criterion | result |
|---|---|
| concrete \(H_2\to J_3(\mathbb O)\) corner | yes |
| direct linear restriction recovers \(\det H_2\) | no; cubic is zero |
| homogenized quartic recovers \(\det H_2\) | yes, up to \(-4\kappa t^2\) |
| embedding choice fixed | no |
| symplectic/source-response pairing preserved | no |
| orientation witness constrained | no |
| pole, residue or Ward/UV datum constrained | no |
| specifically \(E_8\), rather than Freudenthal/\(E_7\), selected | no |

Accordingly:

\[
\boxed{
\text{Record the determinant homogenization, but close the Freudenthal/}E_8\text{ parent claim.}
}
\]

The result is a mathematically correct lift of an already known invariant. It contributes no new physical selector or prediction.

## 9. Branch graph

\[
\begin{array}{c}
H_2(\mathbb R)\\
\downarrow\ \iota_0\\
J_3(\mathbb O),\quad N=0\\
\downarrow\ \text{add }t,\kappa\\
\mathcal F(J_3(\mathbb O)),\quad q=-4\kappa t^2\det\\
\swarrow\hspace{2cm}\searrow\\
\text{determinant recovered}\quad\text{pairing/orientation/selector}\\
\downarrow\ \text{yes}\hspace{2.6cm}\downarrow\ \text{no}\\
\text{invariant lift}\quad\text{parent claim closed}.
\end{array}
\]

## 10. Stop-everything and revisit criteria

- **Containment is not success:** already enforced.
- **Linear-embedding falsifier:** cubic norm vanishes identically.
- **Pairing falsifier:** restricted FTS symplectic form is zero while the determinant polarization is not.
- **Orientation falsifier:** the quartic is even under \(x\mapsto-x\).
- **Selection falsifier:** corner, octonion direction and \(\kappa\) remain free.
- **Revisit only if:** an independently derived Furey, boundary or response map selects the same primitive idempotent, octonionic direction and normalization.
- **Strong revisit signal:** the restriction predicts a response pole invariant, orientation witness or Ward/UV coefficient not used to define the embedding.
- **Stop-everything positive:** a single invariant-preserving map simultaneously fixes the embedding and reproduces determinant, symplectic pairing and an observed response quantity.

## 11. Executable certificate

    node scripts/restrict_the_albert_cubic_and_freudenthal_quartic_to_a_homogenized_h2r_corner.mjs

The certificate verifies the cubic and quartic restrictions, the null linear embedding, orientation evenness, pairing mismatch and free normalization over 2500 integer samples.

## Companion documents

- [The established \(H_2(\mathbb R)\to Sp(4,\mathbb R)\) route](42_jordan_triple_to_sp4r_determination.md)
- [The closed oriented Kantor-parent gate](832_cp_pairing_preserves_the_lepton_jordan_graph_but_not_the_kantor_spin23_slice_closing_the_oriented_parent_gate.md)
- [The three Walsh contrasts do not canonically carry the Lorentzian metric](820_the_three_v4_contrasts_match_the_dimension_but_not_the_metric_of_the_h2r_relationship_space_or_a_canonical_spin23_section.md)
