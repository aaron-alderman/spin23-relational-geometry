# Relational-Carrier and Jordan-Triple Composition

**Programme key:** `S23-REL`  
**Proposed record:** `spin23Programme.CORE-REL`  
**Direction:** middle-out  
**Kind:** core-axis  
**Status:** exact algebraic mechanism identified; physical selection and provenance unresolved

---

## 1. Originating intuition

The arm begins with an operator expression

\[
A\,X\,B,
\]

where \(A\) and \(B\) were imagined as stress–energy components or stress-like observable responses, while \(X\) could range from a minimal connection to a recursively nested “Russian doll” and ultimately to a full outer-product relation.

The remembered progression was approximately:

\[
\text{smallest combination: add}
\quad\longrightarrow\quad
\text{middle relational carrier: }AXB
\quad\longrightarrow\quad
\text{largest uncontracted combination: }A\otimes B.
\]

The historical source of this formulation is unknown. It may have been authored by Aaron, suggested by an earlier language model, reconstructed from several discussions, or newly reassembled. Its provenance must remain separate from its mathematical evaluation.

---

## 2. The family of operations

There is no single ordering from “smallest” to “largest,” because the operations preserve different information. There is, however, a useful hierarchy of coupling.

### 2.1 Addition

If \(A\) and \(B\) act on the same space,

\[
A+B
\]

superposes their effects. It does not retain a record of every pairwise component.

### 2.2 Direct sum

If the systems remain independent,

\[
A\oplus B
\]

places them in separate blocks. State-space dimensions add.

### 2.3 Kronecker sum

Independent infinitesimal action on a product carrier is

\[
A\boxplus B=A\otimes I+I\otimes B.
\]

One factor acts while the other is left unchanged.

### 2.4 Two-sided multiplication

The expression

\[
\Phi_{A,B}(X)=AXB
\]

is a two-sided multiplication operator or elementary operator. It treats \(X\) as the object on which a left algebra and a right algebra act.

### 2.5 Tensor or outer product

The uncontracted combination

\[
A\otimes B
\]

retains every pair of indices or components. Product-space dimensions multiply.

The key insight is that \(X\) controls the wiring between the independent and fully uncontracted limits.

---

## 3. The bimodule reading

Let \(R\) and \(S\) be algebras. An \(R\)-\(S\) bimodule \(M\) admits compatible actions

\[
R\times M\times S\to M,
\qquad
(A,X,B)\mapsto AXB.
\]

Compatibility means

\[
A_1(A_2XB_1)B_2
=(A_1A_2)X(B_1B_2).
\]

This gives a literal form to “one carrier, two faces”:

- \(X\) is the carrier;
- \(A\) is its left face;
- \(B\) is its right face;
- compatibility is the relation between the two actions.

The bimodule language does not by itself impose Jordan symmetry, a causal signature, or \(Spin(2,3)\). It is the broad ambient system.

---

## 4. The superoperator reading

For matrices of compatible sizes,

\[
\operatorname{vec}(AXB)
=(B^T\otimes A)\operatorname{vec}(X).
\]

Thus a sandwich acting on a matrix is equivalent to a tensor-product operator acting on the vectorised carrier.

This identity explains why the original thought naturally moved toward a larger configuration or phase space. The degrees of freedom of \(X\) are collected into a single vector, while the two faces combine as \(B^T\otimes A\).

It also supplies the correct null hypothesis:

> The appearance of a tensor product may be generic matrix calculus rather than evidence for a privileged physical symmetry.

Any claim that \(Sp(4,\mathbb R)\) is selected must identify an invariant symplectic form, a restricted carrier, and a closure law not shared by arbitrary \(B^T\otimes A\).

---

## 5. The Jordan-triple refinement

Raw \(AXB\) need not return to a symmetric observable space. For symmetric matrices, the outer-symmetrised combination

\[
\{A,X,B\}=AXB+BXA
\]

is again symmetric:

\[
(AXB+BXA)^T=AXB+BXA.
\]

Up to normalisation, this is the special Jordan triple product. In a \(^*\)-operator setting the corresponding form is

\[
\{A,X,B\}
=\frac12(AX^\dagger B+BX^\dagger A).
\]

The product is symmetric in its outer entries:

\[
\{A,X,B\}=\{B,X,A\}.
\]

It also satisfies the Jordan triple identity. The output can be inserted into another triple:

\[
\{C,\{A,X,B\},D\}.
\]

This is the mathematically controlled Russian-doll recursion.

---

## 6. Quadratic Jordan action

When the two outer faces coincide,

\[
\{A,X,A\}=2AXA
\]

under the unnormalised convention. This is the special-matrix form of the quadratic Jordan representation \(U_A(X)\), up to convention.

The quadratic operation matters because exceptional Jordan algebras are not globally associative, while quadratic and triple formulations remain intrinsic. The triple language is therefore better suited than raw matrix multiplication for comparing special and exceptional Jordan systems.

---

## 7. Recursive nesting and operadic composition

There are two meanings of nesting.

### Algebraic nesting

The same ternary operation is repeatedly evaluated:

\[
X_{n+1}=\{A_n,X_n,B_n\}.
\]

The Jordan triple identity governs how nested expressions transform and ensures a compatible derivation algebra.

### Structural nesting

An entire operation is inserted into one input of another operation. The general mathematical language for this is operadic composition. It formalises expressions such as

\[
\mu(A,\mu(C,X,D),B).
\]

For the present programme, the Jordan triple system supplies the concrete algebra; operadic language is optional bookkeeping for more general recursive networks.

---

## 8. Tensor-network reading

In index notation,

\[
C_{\mu\sigma}
=A_{\mu\nu}X^{\nu\rho}B_{\rho\sigma}.
\]

The middle object specifies which output legs of one tensor connect to which input legs of the other. Graphically:

\[
A\;\text{---}\;X\;\text{---}\;B.
\]

Different choices of \(X\) have different meanings:

| Middle carrier | Interpretation |
|---|---|
| inverse metric | index contraction |
| projector | selected sector |
| Green function | propagation or exchange |
| density operator | state-dependent correlation |
| intertwiner | translation between representations |
| holonomy | path-dependent transport |
| Jordan element | recursively observable relation |
| summed/integrated \(X\) | fluctuating relational geometry |

This makes the arm naturally adjacent to tensor networks, kernel methods, categorical composition, and bilocal effective actions.

---

## 9. Stress–energy interpretations

If \(A\) and \(B\) are physical stress–energy tensors at two points, an expression such as

\[
S_{\rm eff}
=\frac12\int d^dx\,d^dy\,
T_{\mu\nu}(x)
K^{\mu\nu\rho\sigma}(x,y)
T_{\rho\sigma}(y)
\]

is a bilocal quadratic form or exchange-kernel effective action. The middle kernel may be a propagator.

This is not automatically a Jordan triple. It becomes a candidate triple only if:

- the outer stress-like objects inhabit a closed observable space;
- the kernel has the correct adjoint and covariance properties;
- outer symmetrisation is physically justified;
- the resulting operation obeys the triple identity;
- renormalised composite-operator products are defined.

There is also a bootstrap issue. Stress–energy is usually derived from an action. If it is used to generate the same action, one needs a self-consistency equation, for example

\[
T=\mathcal T[S[T]],
\]

and must establish existence, stability, and conservation of its fixed point.

---

## 10. Exact connection to \(Spin(2,3)\)

The connection is neither generic nor imaginary. It occurs for

\[
J=\operatorname{Sym}_2(\mathbb R)
\]

with the triple

\[
\{A,X,B\}=AXB+BXA.
\]

The Tits–Kantor–Koecher construction then gives

\[
\operatorname{TKK}(J)
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

This is proved explicitly in [the determination document](42_jordan_triple_to_sp4r_determination.md).

The exact result does not yet show that physical stress–energy selects \(J\), nor that the middle carrier of the remembered construction was intended to be \(\operatorname{Sym}_2(\mathbb R)\).

---

## 11. Programme-arm specification

### Central question

Can a covariant ternary law \(\{A,X,B\}\), with \(A\) and \(B\) supplying two observable or stress-like faces and \(X\) supplying the recursively nestable relational carrier, select

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

rather than merely represent it after the fact?

### Null model

The operation is generic two-sided multiplication:

\[
\operatorname{vec}(AXB)
=(B^T\otimes A)\operatorname{vec}(X),
\]

with no preferred symplectic form, real form, dimension, or signature.

### Positive discriminator

Independent physical constraints select:

- a three-dimensional rank-two real Jordan carrier;
- the outer-symmetric triple;
- a Lorentzian determinant cone;
- the canonical TKK closure;
- the same \(Sp(4,\mathbb R)\) connection already governing the phase-space or causal sector.

### Negative discriminator

The carrier and product are nonunique, and \(\operatorname{Sym}_2(\mathbb R)\) can be obtained only by imposing the desired answer.

### Next gate

Construct the smallest typed model specifying:

1. the spaces containing \(A,X,B\);
2. every index and contraction;
3. the involution or transpose;
4. closure under the triple;
5. the invariant bilinear and symplectic forms;
6. the TKK algebra;
7. the map from physical observables to \(J\);
8. the resulting action, stress tensor, and observable.

---

## 12. Final formulation

The most defensible name for the system is:

> **a relational-carrier calculus based on bimodule action and Jordan-triple closure.**

Its mathematical layers are:

\[
\begin{array}{c}
\text{bimodule action }AXB\\
\downarrow\;\text{outer symmetrisation}\\
\text{Jordan triple }AXB+BXA\\
\downarrow\;\text{TKK closure}\\
\text{graded Lie algebra}\\
\downarrow\;J=\operatorname{Sym}_2(\mathbb R)\\
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\end{array}
\]

The first three arrows are exact once their hypotheses are declared. The physical claim that stress–energy supplies this particular carrier remains open.

## Sources

- [Bimodule definition](https://ncatlab.org/nlab/show/bimodule)
- [Matrix-calculus vectorisation identity](https://sites.math.washington.edu/~burke/crs/516-21/matrix-calculus.pdf)
- [Jordan triple system, Encyclopedia of Mathematics](https://encyclopediaofmath.org/index.php?title=Jordan_triple_system)
- [Murat Günaydin, generalized conformal groups and Jordan algebras](https://arxiv.org/abs/hep-th/9301050)

## Workspace companions

- [Determination: Jordan triple to Sp(4,R)](42_jordan_triple_to_sp4r_determination.md)
- [Programme integration and provenance](43_relational_carrier_programme_integration_and_provenance.md)
- [Standard Model as stress–energy](01_standard_model_as_stress_energy_full_analysis.md)
- [The Spin(2,3) Pole](40_grand_synthesis_spin23_pole.md)
