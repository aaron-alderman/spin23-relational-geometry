# A Three-Generator Jordan–Furey Recursion Closes All of \(\mathfrak{sp}_4\), but Requires the Furey Channel Rotation as a Continuous Flow

**Date:** 18 October 2026  
**Branches:** Jordan-triple recursion, controlled Fourier turn, split TKK dilation, Furey channel rotation, full \(\mathfrak{sp}_4\) closure, Spin(2,3)  
**Claim status:** exact Lie-closure and minimality theorem; source response flow supplied in document 1059; microscopic action realization open  
**Certificate:** [generate_full_sp4_from_turn_split_dilation_and_channel_rotation.mjs](../../../verification/generate/generate_full_sp4_from_turn_split_dilation_and_channel_rotation.mjs)

## Executive result

The programme now has an explicit three-generator commutator recursion that spans all ten dimensions of

\[
\mathfrak{sp}_4(\mathbb R)
\cong
\mathfrak{so}(2,3).
\]

Use the phase matrices

\[
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
K=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]

and the channel matrices

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
e_-=\frac{I-D}{2}.
\]

Take three typed symplectic generators:

\[
\boxed{
\mathcal A=J_{\rm phase}\otimes e_-}
\]

for the controlled Jordan/Fourier turn,

\[
\boxed{
\mathcal H=K_{\rm phase}\otimes D_{\rm channel}}
\]

for the split pole-jet/TKK dilation, and

\[
\boxed{
\mathcal C=I_{\rm phase}\otimes\varepsilon_{\rm channel}}
\]

for continuous Furey channel rotation.

Their iterated commutators span the canonical basis

\[
\boxed{
I\otimes\varepsilon
\quad\oplus\quad
\{J,X,K\}_{\rm phase}
\otimes
\{I,X,D\}_{\rm channel}.
}
\]

This space has dimension

\[
1+3\cdot3=10
\]

and is exactly \(\mathfrak{sp}_4(\mathbb R)\) for

\[
\Omega=J_{\rm phase}\otimes I_{\rm channel}.
\]

The result is minimal relative to these three inputs:

| Removed generator | Closure dimension |
|---|---:|
| controlled turn \(\mathcal A\) | 3 |
| split dilation \(\mathcal H\) | 4 |
| channel rotation \(\mathcal C\) | 4 |
| none | **10** |

This is a literal answer to the algebraic goal

\[
\text{Jordan-triple recursion}
\Longrightarrow
\mathfrak{sp}_4(\mathbb R)
\cong
\mathfrak{so}(2,3).
\]

It is not yet a microscopic dynamics theorem. The Furey algebra supplies \(\varepsilon\) and the associated antiunitary, but a discrete or antiunitary source operation does not automatically supply the continuous Hamiltonian flow

\[
e^{t(I\otimes\varepsilon)}.
\]

Document 1059 subsequently proves that the linear source product \(F_Cp\) is skew-adjoint, squares to \(-I\), preserves the reducing aggregate sector and exponentiates to the required \(e^{t\varepsilon}\) flow. The remaining decisive gate is therefore narrower: derive the microscopic action term and its gauge/charge-safe mediator.

## 1. Why \(I\otimes X\) is not the generator

The finite face swap

\[
I\otimes X
\]

is symplectic:

\[
(I\otimes X)^T\Omega(I\otimes X)=\Omega.
\]

But the matrix \(I\otimes X\) does not satisfy the infinitesimal condition

\[
A^T\Omega+\Omega A=0.
\]

It is a group element, not the correctly typed Lie-algebra direction.

The antisymmetric channel matrix \(\varepsilon=DX\) does satisfy

\[
(I\otimes\varepsilon)^T\Omega
+\Omega(I\otimes\varepsilon)=0.
\]

Its exponential is a continuous channel rotation, and its quarter-turn exchanges the two channel axes with orientation. This is the correct infinitesimal cross-face candidate.

## 2. Canonical form of \(\mathfrak{sp}_4\) in the tensor basis

For phase-first ordering and \(\Omega=J\otimes I\), the ten Hamiltonian generators decompose naturally as

\[
\mathfrak{sp}_4
=
\left(I\otimes\mathfrak{so}(2)_{\rm channel}\right)
\oplus
\left(
\mathfrak{sp}(2,\mathbb R)_{\rm phase}
\otimes
\operatorname{Sym}(2,\mathbb R)_{\rm channel}
\right).
\]

Explicitly,

\[
\mathfrak{so}(2)=\operatorname{span}\{\varepsilon\},
\]

\[
\mathfrak{sp}(2,\mathbb R)
=\operatorname{span}\{J,X,K\},
\]

\[
\operatorname{Sym}(2,\mathbb R)
=\operatorname{span}\{I,X,D\}.
\]

Therefore

\[
\dim\mathfrak{sp}_4
=1+(3)(3)=10.
\]

This decomposition gives every generated direction a transparent type:

- phase rotation, phase squeeze or phase dilation;
- scalar, off-diagonal or split channel relationship;
- plus the pure channel rotation.

## 3. Explicit recursive generation

Start with

\[
\mathcal A=J\otimes e_-
=\frac12(J\otimes I-J\otimes D).
\]

The channel rotation acts on the projector and gives

\[
[\mathcal C,\mathcal A]
=J\otimes X.
\]

Acting again,

\[
[\mathcal C,J\otimes X]
=2J\otimes D.
\]

Since

\[
J\otimes I
=2\mathcal A+J\otimes D,
\]

all three channel-symmetric phase-rotation directions

\[
J\otimes I,\qquad
J\otimes X,\qquad
J\otimes D
\]

are now present.

The channel rotation acting on the split dilation gives

\[
[\mathcal C,\mathcal H]
=-2K\otimes X.
\]

Together with

\[
\mathcal H=K\otimes D,
\]

this supplies two phase-dilation directions.

Next,

\[
[J\otimes I,K\otimes D]
=-2X\otimes D,
\]

\[
[J\otimes I,K\otimes X]
=-2X\otimes X.
\]

Finally,

\[
[J\otimes D,X\otimes D]
=2K\otimes I,
\]

\[
[J\otimes D,K\otimes D]
=-2X\otimes I.
\]

The recursion has therefore produced:

\[
J\otimes\{I,X,D\},
\]

\[
X\otimes\{I,X,D\},
\]

\[
K\otimes\{I,X,D\},
\]

along with

\[
I\otimes\varepsilon.
\]

Nothing is missing.

## 4. Relation to Jordan-triple recursion

The three seeds arise from different rungs of the same programme:

1. \(\mathcal A\) is the controlled Fourier square root of the split Jordan relationship \(D\);
2. \(\mathcal H\) is the split Cartan/dilation supplied by the pole-jet TKK triple;
3. \(\mathcal C\) rotates the complementary channel faces using the Furey \(\varepsilon=DX\) structure.

Their commutators generate successively:

- off-diagonal channel relationships;
- phase squeezes;
- scalar and split dilations;
- the complete symmetric Jordan channel space.

This is precisely the recursive pattern expected from TKK theory: a small set of typed translations, gradings and relationship rotations generates the conformal algebra of the Jordan carrier.

The novelty is not the abstract fact that \(H_2(\mathbb R)\) has conformal algebra \(\mathfrak{sp}_4\). It is the explicit identification of three operators already reached independently by the spectral, Furey and paired-seam branches whose closure reproduces that algebra.

## 5. Group-level consequence

If the physical theory supplies all three one-parameter flows, their generated connected Lie subgroup has Lie algebra

\[
\mathfrak{sp}_4(\mathbb R).
\]

Since \(Sp(4,\mathbb R)\) is connected, the generated connected subgroup is the full group:

\[
Sp(4,\mathbb R)
\cong
Spin_0(2,3).
\]

Thus the group-level implication is conditional but exact:

\[
\boxed{
\text{three physical flows}
\Longrightarrow
Sp(4,\mathbb R)
\cong Spin_0(2,3).
}
\]

The word “physical” carries the remaining burden. Matrix availability in the source algebra is not enough; the action must permit the corresponding continuous flows with compatible domains and normalization.

## 6. Minimality and ablations

The three-generator set is not redundant.

### Without the controlled turn

\[
\operatorname{Lie}\langle\mathcal H,\mathcal C\rangle
\]

has dimension three. It rotates the channel components of the split dilation but lacks the compact phase direction needed to generate the rest.

### Without the split dilation

\[
\operatorname{Lie}\langle\mathcal A,\mathcal C\rangle
\]

has dimension four. It rotates controlled phase directions across channels but cannot produce the full squeeze/dilation sector.

### Without the channel rotation

\[
\operatorname{Lie}\langle\mathcal A,\mathcal H\rangle
\cong\mathfrak{sl}_2\oplus\mathbb R
\]

has dimension four and remains face preserving.

Only the complete triple reaches ten dimensions.

## 7. The precise physical gate

The Furey source already contains:

\[
\varepsilon=DX,
\qquad
\Gamma=\varepsilon K_{\rm complex}.
\]

The required linear generator is not obtained by merely deleting complex conjugation. Document 1059 identifies it independently as \(G_{\rm src}=F_Cp\), proves \(AG_{\rm src}=\varepsilon A\), and exponentiates the intertwiner for every real parameter.

What still requires a physical mechanism is the action coefficient and microscopic completion:

- a coherent bilinear whose realification generates channel rotation;
- a continuous subgroup in the completed linking algebra containing \(\varepsilon\) at quarter period;
- a Higgs/Furey mediator term proportional to the antisymmetric channel current;
- a boundary Berry connection whose holonomy is the discrete Furey operation.

If none exists, the ten-dimensional closure remains an algebraic completion rather than a physical derivation.

## 8. Stop-everything tests and falsifiers

**Continuous-Furey trigger:** derive a source action term whose Hamiltonian vector field is \(I\otimes\varepsilon\). Together with the already constructed turn and split dilation, full \(Sp(4,\mathbb R)\) then follows by the closure theorem.

**Holonomy trigger:** derive \(\varepsilon\) as the finite holonomy of a continuous source connection. Its infinitesimal generator must match \(\mathcal C\) in the same carrier basis.

**Domain trigger:** verify that all three flows act on the same four-real carrier, preserve the same \(\Omega\), and share a common dense domain in the continuum theory.

**Falsifier:** \(\varepsilon\) exists only as part of an antiunitary symmetry and no coherent linear generator with its channel action is permitted.

**Falsifier:** the physical controlled turn or split dilation acts on a different carrier than \(\mathcal C\), invalidating the common tensor basis.

**Overclaim no-go:** Lie closure alone does not derive Standard-Model representations, coupling constants, spacetime gravity or quantum dynamics.

## Verdict

| Question | Verdict |
|---|---|
| Do the three typed generators close \(\mathfrak{sp}_4\)? | **Yes, exactly** |
| Is the closure ten-dimensional? | **Yes** |
| Is each generator necessary within this set? | **Yes, by ablation** |
| Does this realize Jordan-triple recursion algebraically? | **Yes** |
| Does it imply \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) if all flows are physical? | **Yes** |
| Is the continuous Furey response flow derived algebraically? | **Yes; document 1059** |
| Is its microscopic action term derived? | **No** |
| Does the result derive the Standard Model? | **No** |

## Position in the corpus

- [pole-jet \(\mathfrak{sl}_2\) embedding](1037_the_pole_jet_residue_shear_and_furey_grading_close_an_exact_sl2_triple_inside_sp4_but_the_physical_jordan_idempotent_is_still_untyped.md)
- [split Jordan tripotent orbit](1038_the_pole_jet_sl2_is_the_tkk_orbit_of_the_split_jordan_involution_D_not_a_primitive_positive_idempotent.md)
- [controlled Fourier square root](1039_the_split_tkk_intertwiner_is_a_channel_controlled_fourier_quarter_turn_whose_square_is_D_not_the_realified_furey_antiunitary.md)
- [angular/radial four-dimensional closure](1057_the_compact_controlled_turn_and_split_tkk_dilation_generate_a_one_face_sl2_plus_a_commuting_dilation_not_full_sp4.md)
- [source exponentiation of the channel flow](1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md)
