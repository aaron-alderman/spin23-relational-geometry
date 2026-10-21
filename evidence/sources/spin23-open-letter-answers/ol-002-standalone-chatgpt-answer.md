For the usual real Jordan algebra
\[
J=H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R),
\qquad X\circ Y=\frac12(XY+YX),
\]
the essential relationship is
\[
\boxed{
\mathfrak{str}(J)\cong\mathfrak{gl}(2,\mathbb R)
\quad\text{and}\quad
\mathfrak{conf}(J)=\mathfrak{tkk}(J)
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
}
\]
**The structure algebra is the degree-zero subalgebra of the TKK algebra. The conformal algebra and the standard TKK algebra are the same Lie algebra in this case.** Their relationship, including the smaller derivation algebra, is:

| Object | Real Lie algebra | Real dimension |
|---|---|---:|
| Jordan derivations \(\operatorname{Der}(J)\) | \(\mathfrak{so}(2)\) | 1 |
| Reduced structure algebra \(\mathfrak{str}_0(J)\) | \(\mathfrak{sl}(2,\mathbb R)\cong\mathfrak{so}(1,2)\) | 3 |
| Full structure algebra \(\mathfrak{str}(J)\) | \(\mathfrak{gl}(2,\mathbb R)\cong\mathfrak{so}(1,2)\oplus\mathbb R D\) | 4 |
| Conformal / TKK algebra | \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\) | 10 |

These are the standard Jordan-theoretic identifications; the distinction between the full and reduced structure algebra matters here. [arxiv.org](https://arxiv.org/pdf/hep-th/9301050?utm_source=chatgpt.com)

There are also **genuine geometric interpretations**: a conformal action on \(2+1\)-dimensional Minkowski spacetime and a linear canonical action on a separate four-dimensional phase space. What requires additional input is identifying either action as a symmetry of a particular physical theory.

Throughout, \(\mathfrak{sp}(4,\mathbb R)\) means the algebra of **real \(4\times4\) symplectic matrices**. Some mathematical references denote this same algebra by \(\mathfrak{sp}(2,\mathbb R)\), indexing by rank instead of matrix size.

## 1. Why a Euclidean Jordan algebra gives Lorentzian geometry

Write an element of \(J\) as
\[
X(t,x,y)=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}.
\]
There are two different quadratic forms to keep separate:
\[
\operatorname{tr}(X^2)=2(t^2+x^2+y^2),
\qquad
N(X):=\det X=t^2-x^2-y^2.
\]

The first is positive definite and explains the term **Euclidean Jordan algebra**. The second is the Jordan determinant, or generic norm, and has Lorentzian signature \((1,2)\).

Consequently, the underlying vector space of \(J\), equipped with its determinant, is a model of \(2+1\)-dimensional Minkowski space:
\[
(J,N)\cong\mathbb R^{1,2}.
\]
The positive-definite matrix cone is precisely one timelike cone:
\[
X>0
\quad\Longleftrightarrow\quad
t>\sqrt{x^2+y^2}.
\]

The Jordan product itself becomes the spin-factor product
\[
(t,u)\circ(s,v)
=
(ts+u\cdot v,\;tv+su),
\qquad u,v\in\mathbb R^2.
\]
Its unit is \(e=(1,0)\), corresponding to \(I_2\). Thus the Jordan product contains a distinguished timelike direction, whereas the determinant geometry allows Lorentz transformations that move that direction.

This already explains why product automorphisms and Lorentz transformations give different groups.

## 2. Derivations, structure transformations, and Lorentz transformations

### Product automorphisms give \(\mathfrak{so}(2)\)

A Jordan automorphism fixes the unit and preserves the product. In the spin-factor presentation, it therefore acts as
\[
(t,u)\longmapsto(t,Ru),\qquad R\in O(2).
\]
Hence
\[
\operatorname{Aut}(J)\cong O(2),
\qquad
\operatorname{Der}(J)\cong\mathfrak{so}(2).
\]

In matrix language, the automorphisms are orthogonal congruences
\[
X\longmapsto QXQ^{\mathsf T},
\qquad Q\in O(2),
\]
with \(Q\) and \(-Q\) inducing the same transformation. Infinitesimally, a skew-symmetric matrix \(K\) gives
\[
\delta_K(X)=KX-XK.
\]

Once \(J\) is interpreted as spacetime, these are spatial rotations fixing the chosen time direction. They are a small part of the available spacetime transformations.

### The structure algebra gives \(\mathfrak{gl}(2,\mathbb R)\)

Let \(L_X(Y)=X\circ Y\). For this algebra,
\[
\mathfrak{str}(J)=\operatorname{Der}(J)\oplus L(J)
\]
as a **vector-space decomposition**. It is not a direct sum of Lie algebras: generally,
\[
[L_X,L_Y](Z)=\frac14[[X,Y],Z].
\]

The useful faithful representation is
\[
\rho(A)X=AX+XA^{\mathsf T},
\qquad A\in\mathfrak{gl}(2,\mathbb R).
\]
Indeed,
\[
L_X=\rho(X/2),
\]
while skew-symmetric \(A\) give the derivations. Every \(2\times2\) real matrix is a sum of a symmetric and a skew-symmetric matrix, so
\[
\mathfrak{str}(J)=\rho\bigl(\mathfrak{gl}(2,\mathbb R)\bigr).
\]

The group action integrating this is congruence:
\[
X\longmapsto aXa^{\mathsf T},
\qquad a\in GL(2,\mathbb R).
\]
Its effect on the determinant is
\[
\det(aXa^{\mathsf T})=(\det a)^2\det X.
\]
Therefore \(SL(2,\mathbb R)\) preserves the Lorentzian quadratic form exactly, and its action has kernel \(\{\pm I_2\}\). Infinitesimally,
\[
\mathfrak{str}_0(J)
=
\rho\bigl(\mathfrak{sl}(2,\mathbb R)\bigr)
\cong\mathfrak{so}(1,2).
\]

The remaining scalar direction is
\[
D=\rho(I_2/2)=\operatorname{Id}_J,
\]
which generates \(X\mapsto e^sX\). Thus
\[
\mathfrak{str}(J)=\mathfrak{str}_0(J)\oplus\mathbb R D.
\]

A structure transformation generally moves the unit and does not preserve the Jordan product. What it preserves here is the determinant up to an overall scale. Geometrically, the structure algebra is therefore **Lorentz transformations plus dilations**.

## 3. The exact TKK construction and its real three-grading

The standard TKK algebra has the vector-space decomposition
\[
\mathfrak g
=
J^-\oplus\mathfrak{str}(J)\oplus J^+,
\]
with dimensions
\[
3+4+3=10.
\]
The two extreme pieces are abelian, and their mixed bracket produces the structure algebra. This is the standard correspondence between Jordan structures and three-graded Lie algebras. [emis.de](https://emis.de/ft/16971?utm_source=chatgpt.com)

An explicit matrix realization fixes all signs and normalizations.

Set
\[
\Omega=
\begin{pmatrix}
0&I_2\\
-I_2&0
\end{pmatrix}.
\]
Then
\[
\mathfrak{sp}(4,\mathbb R)
=
\{M:M^{\mathsf T}\Omega+\Omega M=0\}
=
\left\{
\begin{pmatrix}
A&B\\
C&-A^{\mathsf T}
\end{pmatrix}
:
B=B^{\mathsf T},\ C=C^{\mathsf T}
\right\}.
\]

Define
\[
H_A=
\begin{pmatrix}
A&0\\
0&-A^{\mathsf T}
\end{pmatrix},
\qquad
P_B=
\begin{pmatrix}
0&B\\
0&0
\end{pmatrix},
\qquad
K_C=
\begin{pmatrix}
0&0\\
C&0
\end{pmatrix}.
\]
One choice of grading is
\[
\mathfrak g_{+1}=P_J,\qquad
\mathfrak g_0=H_{\mathfrak{gl}(2,\mathbb R)},\qquad
\mathfrak g_{-1}=K_J.
\]

The grading element is
\[
E=H_{I_2/2}
=
\frac12
\begin{pmatrix}
I_2&0\\
0&-I_2
\end{pmatrix},
\]
so
\[
[E,P_B]=P_B,\qquad
[E,H_A]=0,\qquad
[E,K_C]=-K_C.
\]

The brackets are
\[
\begin{aligned}
[H_A,H_{A'}]&=H_{[A,A']},\\
[H_A,P_B]&=P_{AB+BA^{\mathsf T}},\\
[H_A,K_C]&=K_{-A^{\mathsf T}C-CA},\\
[P_B,K_C]&=H_{BC},\\
[P_B,P_{B'}]&=0,\qquad [K_C,K_{C'}]=0.
\end{aligned}
\]

Several exact consequences follow.

**The degree-zero piece is the full structure algebra.** Its action on \(P_J\) is precisely \(\rho(A)\). The two copies of \(J\) are dual \(\mathfrak{gl}(2,\mathbb R)\)-modules; the trace pairing lets us represent both by symmetric matrices, but their transformation laws differ.

**The mixed bracket contains Jordan multiplication as well as derivations.** With the usual box operator
\[
S_{BC}=L_{B\circ C}+[L_B,L_C],
\]
a direct calculation gives
\[
S_{BC}(Z)=\frac12(BCZ+ZCB).
\]
Thus the action of \([P_B,K_C]\) on \(P_J\) is \(2S_{BC}\).

**The Jordan product can be recovered from the Lie bracket and the chosen unit:**
\[
P_{B\circ C}
=
\frac12[[P_B,K_{I_2}],P_C].
\]
This explicitly identifies the matrix algebra with the TKK construction.

Authors may reverse the grading, use \(2E\) so that the nonzero degrees are labelled \(\pm2\), or rescale one copy of \(J\). Those choices account for many apparent sign or factor discrepancies.

Also, \(E\) is central in \(\mathfrak g_0\), but not in \(\mathfrak g\). The dilation direction is not a central extension of the conformal algebra.

For comparison, the alternate Tits presentation is
\[
\mathfrak{tkk}(J)
\cong
\bigl(\mathfrak{sl}(2,\mathbb R)\otimes J\bigr)
\oplus\operatorname{Der}(J)
\]
as a vector space, of dimension \(9+1\). In the three-piece presentation, replacing \(\mathfrak{str}(J)\) by \(\operatorname{Der}(J)\) would omit three necessary generators.

## 4. Which real form, and what happens at group level?

The complex exceptional isomorphism is
\[
\mathfrak{sp}(4,\mathbb C)\cong\mathfrak{so}(5,\mathbb C),
\]
corresponding to \(C_2=B_2\). Its real forms must be distinguished:

| Symplectic notation | Orthogonal notation | Real rank |
|---|---|---:|
| \(\mathfrak{sp}(4,\mathbb R)\) | \(\mathfrak{so}(2,3)\) | 2 |
| \(\mathfrak{sp}(1,1)\) | \(\mathfrak{so}(4,1)\) | 1 |
| Compact \(\mathfrak{sp}(2)\) | Compact \(\mathfrak{so}(5)\) | 0 |

These real-form identifications are tabulated explicitly in Gilmore’s treatment of low-dimensional Lie algebras. [emis.de](https://emis.de/ft/44527?utm_source=chatgpt.com)

The real matrix construction above selects the **split real form**
\[
\mathfrak{tkk}\bigl(H_2(\mathbb R)\bigr)
=
\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]
This conclusion uses the real Jordan structure, not merely the complex isomorphism or a dimension count.

For example, the conformal algebra of positive-definite Euclidean three-space is \(\mathfrak{so}(4,1)\). The phrase “Euclidean Jordan algebra” does not change the determinant of \(H_2(\mathbb R)\) into a positive-definite spacetime metric.

The compact real form cannot support the displayed nontrivial real TKK grading: in a compact semisimple Lie algebra, adjoint operators have purely imaginary eigenvalues with respect to an invariant positive inner product, whereas \(\operatorname{ad}E\) here has real eigenvalues \(\pm1\).

### Why the orthogonal signature is \((2,3)\)

There is a concrete construction of the exceptional isomorphism. For a four-dimensional symplectic vector space \(V\), the primitive part
\[
W=\Lambda^2_0V
\]
is five-dimensional. The wedge pairing induces a nondegenerate symmetric form on \(W\) of signature \((2,3)\), up to reversing the overall sign. The induced action of \(Sp(V)\) on \(W\) gives the orthogonal representation. [arxiv.org](https://arxiv.org/pdf/0706.3055?utm_source=chatgpt.com)

At the level of connected groups, the precise statement is
\[
1\longrightarrow\{\pm I_4\}
\longrightarrow Sp(4,\mathbb R)
\longrightarrow SO_0(2,3)
\longrightarrow1.
\]
Thus
\[
PSp(4,\mathbb R)\cong SO_0(2,3),
\qquad
Sp(4,\mathbb R)\cong\operatorname{Spin}_0(2,3).
\]
The kernel and connected image are established explicitly in the Lagrangian-Grassmannian construction. [arxiv.org](https://arxiv.org/html/1009.1364v1?utm_source=chatgpt.com)

The spin cover here is not the universal topological cover: \(Sp(4,\mathbb R)\) retracts onto \(U(2)\), so its fundamental group is \(\mathbb Z\). Disconnected extensions of the conformal group require additional component conventions, but do not change the Lie algebra.

## 5. Three different decompositions that should not be conflated

### The real TKK three-grading

This is the grading already constructed:
\[
\mathfrak g
=
\mathfrak g_{-1}\oplus\mathfrak g_0\oplus\mathfrak g_{+1},
\qquad
\mathfrak g_0=\mathfrak{gl}(2,\mathbb R).
\]
Its dimensions are \(3+4+3\), its outer pieces are abelian, and its grading element is the split dilation \(E\).

### The Cartan decomposition and the compact three-grading

The Cartan involution \(\theta(M)=-M^{\mathsf T}\) has fixed algebra
\[
\mathfrak k=
\left\{
\begin{pmatrix}
A&B\\
-B&A
\end{pmatrix}
:
A^{\mathsf T}=-A,\ B^{\mathsf T}=B
\right\}
\cong\mathfrak u(2)
\cong\mathfrak{so}(2)\oplus\mathfrak{so}(3).
\]
It gives the real Cartan decomposition
\[
\mathfrak g=\mathfrak k\oplus\mathfrak p,
\qquad
\dim\mathfrak k=4,\quad\dim\mathfrak p=6.
\]
The maximal compact algebra \(\mathfrak u(2)\) and the structure algebra \(\mathfrak{gl}(2,\mathbb R)\) are different real subalgebras. Both appear in the standard classification tables. [arxiv.org](https://arxiv.org/pdf/1106.3621?utm_source=chatgpt.com)

After complexification there is also the Hermitian, or holomorphic, decomposition
\[
\mathfrak g_{\mathbb C}
=
\mathfrak p^-\oplus\mathfrak k_{\mathbb C}\oplus\mathfrak p^+,
\qquad
\mathfrak k_{\mathbb C}\cong\mathfrak{gl}(2,\mathbb C),
\]
with complex dimensions \(3+4+3\).

Here a compact central element \(Z=\Omega/2\in\mathfrak k\) has adjoint eigenvalues \(0,\pm i\). The two nonzero eigenspaces become available over \(\mathbb C\), and real conjugation exchanges them. This is what underlies the “compact three-grading” often used for raising and lowering operators.

It is therefore essential to distinguish
\[
\boxed{\text{real TKK grading with }\mathfrak g_0=\mathfrak{gl}(2,\mathbb R)}
\]
from
\[
\boxed{\text{complex holomorphic grading with }\mathfrak g_0=\mathfrak k_{\mathbb C}}.
\]

### The contact five-grading

The same real algebra also admits a different grading
\[
\mathfrak g=
\mathfrak g_{-2}\oplus\mathfrak g_{-1}\oplus
\mathfrak g_0\oplus
\mathfrak g_{+1}\oplus\mathfrak g_{+2},
\]
with dimensions
\[
1+2+4+2+1.
\]
For example, use the grading element
\[
E_c=\operatorname{diag}(1,0,-1,0).
\]

Its negative part is a three-dimensional Heisenberg algebra. The associated parabolic stabilizes a **line** in the defining symplectic space; the TKK parabolic stabilizes a **Lagrangian two-plane**. These are the two different maximal-parabolic geometries of \(Sp(4,\mathbb R)\). [arxiv.org](https://arxiv.org/pdf/0706.3055?utm_source=chatgpt.com)

Thus a Heisenberg or contact interpretation belongs to a different grading from the Jordan \(3+4+3\) grading.

## 6. The spacetime interpretation is an actual conformal action

The Jordan conformal group is generated by translations, structure transformations, and inversion
\[
X\longmapsto-X^{-1}.
\]
Its infinitesimal algebra is the TKK algebra. [arxiv.org](https://arxiv.org/pdf/1106.3621?utm_source=chatgpt.com)

For this particular Jordan algebra, ordinary Lorentzian conformality can be verified directly. Let
\[
g=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
\in Sp(4,\mathbb R).
\]
Its action is
\[
F_g(X)=(aX+b)(cX+d)^{-1},
\]
where the denominator is invertible. The symplectic identities ensure that \(F_g(X)\) is symmetric.

For a tangent vector \(Y\in J\),
\[
dF_{g,X}(Y)
=
(cX+d)^{-\mathsf T}Y(cX+d)^{-1}.
\]
Taking determinants gives
\[
\det\bigl(dF_{g,X}(Y)\bigr)
=
\det(cX+d)^{-2}\det Y.
\]

This is exactly conformal preservation of the Lorentzian metric \(N(Y)=\det Y\). The name “conformal” therefore has its ordinary spacetime meaning here.

For
\[
M=
\begin{pmatrix}
A&B\\
C&-A^{\mathsf T}
\end{pmatrix},
\]
the infinitesimal point transformation is
\[
\delta_M X=B+AX+XA^{\mathsf T}-XCX.
\]
Its terms have precise geometric meanings:

| Term | Spacetime transformation |
|---|---|
| \(B\) | Translations |
| \(AX+XA^{\mathsf T}\), with \(\operatorname{tr}A=0\) | Lorentz transformations |
| Scalar part of \(A\) | Dilations |
| \(-XCX\) | Special conformal transformations |

In particular, the \(2+1\)-dimensional Poincaré algebra is the subalgebra
\[
\mathfrak{iso}(1,2)
=
P_J\rtimes H_{\mathfrak{sl}(2,\mathbb R)},
\]
of dimension \(3+3=6\). Adding dilation gives a seven-dimensional affine conformal algebra; adding the three special conformal generators gives the full ten-dimensional algebra.

### The global action and its link to symplectic geometry

An arbitrary conformal transformation need not be defined everywhere on the affine \(J\) chart. The natural global space is the conformal compactification
\[
\overline{\mathbb R^{1,2}}
\cong\operatorname{Lag}(2,\mathbb R^4)
\cong
\mathbb P\{w\in\mathbb R^{2,3}\setminus\{0\}:Q(w)=0\}.
\]
This Lagrangian-Grassmannian model carries the invariant Lorentzian conformal structure. [arxiv.org](https://arxiv.org/html/1009.1364v1?utm_source=chatgpt.com)

The relationship is especially transparent in coordinates. Associate to a symmetric matrix \(X\) the Lagrangian plane
\[
L_X=\{(Xv,v):v\in\mathbb R^2\}.
\]
Applying \(g\) to this graph gives precisely the fractional-linear transformation \(F_g(X)\).

Moreover,
\[
\det(X-Y)=0
\quad\Longleftrightarrow\quad
L_X\cap L_Y\ne\{0\}.
\]
Thus null separation of spacetime points corresponds to intersection of their Lagrangian planes.

The four-dimensional symplectic vector space and the three-dimensional spacetime are therefore tightly related, but they are different spaces: a spacetime point corresponds to a Lagrangian plane, not to an individual symplectic vector.

The same \(\mathfrak{so}(2,3)\) is also the isometry algebra of four-dimensional anti-de Sitter spacetime, whose conformal boundary has dimension \(2+1\). [arxiv.org](https://arxiv.org/pdf/0706.3055?utm_source=chatgpt.com) This supplies another spacetime realization. For ordinary \(3+1\)-dimensional Minkowski conformal geometry, the corresponding algebra is instead \(\mathfrak{so}(2,4)\), obtained from \(H_2(\mathbb C)\).

## 7. The phase-space interpretation, including what the two Jordan copies mean

A second concrete realization uses a two-degree-of-freedom phase space
\[
V=\mathbb R^4,\qquad
z=(q_1,q_2,p_1,p_2),
\qquad
\omega=\sum_{i=1}^2dq_i\wedge dp_i.
\]
The group \(Sp(4,\mathbb R)\) is exactly its group of linear canonical transformations. This is the usual symplectic-group interpretation in mechanics and quantum optics. [arxiv.org](https://arxiv.org/pdf/quant-ph/9509002?utm_source=chatgpt.com)

For the block matrix \(M\) above, define
\[
H_M(q,p)
=
p^{\mathsf T}Aq
+\frac12p^{\mathsf T}Bp
-\frac12q^{\mathsf T}Cq.
\]
Hamilton’s equations give
\[
\dot q=Aq+Bp,\qquad
\dot p=Cq-A^{\mathsf T}p,
\]
or simply
\[
\dot z=Mz.
\]

With the canonical Poisson bracket,
\[
\{H_M,H_N\}=H_{[M,N]}.
\]
Hence \(\mathfrak{sp}(4,\mathbb R)\) is realized by all homogeneous quadratic Hamiltonians on this phase space.

The TKK grading now has the following interpretation:

| TKK piece | Dimension | Quadratic Hamiltonians |
|---|---:|---|
| \(P_J=\mathfrak g_{+1}\) | 3 | \(\frac12p^{\mathsf T}Bp\) |
| \(H_{\mathfrak{gl}_2}=\mathfrak g_0\) | 4 | \(p^{\mathsf T}Aq\) |
| \(K_J=\mathfrak g_{-1}\) | 3 | \(-\frac12q^{\mathsf T}Cq\) |

**The two copies of \(J\) are symmetric quadratic expressions in momenta and positions in this realization. They are not the positions and momenta themselves.**

For example, the generator \(P_B\) produces a spacetime translation
\[
X\longmapsto X+B,
\]
but its phase-space action is the shear
\[
q\longmapsto q+Bp,\qquad p\longmapsto p.
\]
The word “translation” depends on which space the group is acting on.

### What about \(J\oplus J^*\)?

There are three further distinctions.

First, \(J\) itself is three-dimensional, so it cannot carry a nondegenerate alternating two-form. It is not an ordinary symplectic phase space by itself.

Second, the six-dimensional vector space
\[
\mathfrak g_{-1}\oplus\mathfrak g_{+1}
\]
is not invariant under the full adjoint action of \(\mathfrak g\), because
\[
[\mathfrak g_{-1},\mathfrak g_{+1}]\subset\mathfrak g_0.
\]
The TKK bracket also differs from a canonical Heisenberg bracket: the mixed bracket produces a noncentral four-dimensional structure algebra.

Third, genuine six-dimensional phase spaces can still be constructed, provided the construction is stated. One example is
\[
T^*J\cong J\oplus J^*,
\]
with its canonical symplectic form. The local conformal action has a cotangent lift, generated by
\[
h_M(X,\Pi)
=
\operatorname{tr}\!\left[
\Pi\bigl(B+AX+XA^{\mathsf T}-XCX\bigr)
\right].
\]
This is generally a nonlinear action and differs from the defining action on \(\mathbb R^4\).

Another example is the six-dimensional adjoint orbit of the grading element,
\[
\mathcal O_E\cong Sp(4,\mathbb R)/GL(2,\mathbb R).
\]
Using the Killing form to identify adjoint and coadjoint orbits, it carries the Kirillov–Kostant symplectic form. Its tangent space at \(E\) identifies with the two opposite grades. This gives a legitimate symplectic interpretation of those grades as tangent directions to a homogeneous space; it does not turn their direct sum into a linear representation of the full algebra.

At the quantum level, Weyl-ordered quadratic generators integrate naturally to the metaplectic group
\[
Mp(4,\mathbb R)\longrightarrow Sp(4,\mathbb R),
\]
a double cover distinct from the spin covering
\[
Sp(4,\mathbb R)\longrightarrow SO_0(2,3).
\]
The metaplectic cover is required for the usual unitary implementation of linear canonical transformations. [arxiv.org](https://arxiv.org/pdf/quant-ph/9509002?utm_source=chatgpt.com)

## 8. What is justified as a physical symmetry?

The algebraic construction already supports several precise geometric claims:

- \(\operatorname{Der}(J)\) preserves the Jordan product and acts as spatial rotations in the determinant spacetime.
- \(\mathfrak{str}_0(J)\) acts as Lorentz transformations.
- \(\mathfrak{str}(J)\) adds spacetime dilations.
- \(\mathfrak{tkk}(J)=\mathfrak{conf}(J)\) acts as the full local conformal algebra of \(2+1\)-dimensional Minkowski space.
- In its defining symplectic representation, the same full algebra generates linear canonical transformations of a four-dimensional phase space.

A **dynamical symmetry** requires an additional condition: preservation of the chosen equations, action, Hamiltonian, or appropriate constrained dynamics. Preservation of a symplectic form alone does not imply preservation of a Hamiltonian.

For a concrete example, choose the isotropic oscillator Hamiltonian
\[
H_0=\frac12(q^{\mathsf T}q+p^{\mathsf T}p).
\]
A linear canonical transformation preserves \(H_0\) precisely when it is also orthogonal. Its symmetry group is therefore
\[
Sp(4,\mathbb R)\cap O(4)\cong U(2).
\]
The noncompact symplectic generators remain valid canonical transformations, but generally change \(H_0\). This also gives a physical reason for the maximal compact algebra \(\mathfrak u(2)\) to appear, separately from the TKK structure algebra.

Even “time evolution” refers to different generators in different realizations. On the Minkowski chart, \(P_{I_2}\) generates translations of \(t\). On oscillator phase space,
\[
\Omega=P_{I_2}-K_{I_2}
\]
generates \(H_0\). The TKK grading element \(E\), meanwhile, corresponds to
\[
H_E=\frac12p^{\mathsf T}q,
\]
which generates reciprocal scaling of \(q\) and \(p\).

Thus the spacetime and phase-space interpretations are mathematically concrete. Selecting a physical Hamiltonian or field theory, and establishing which of these transformations preserve its dynamics, is the additional step that the Jordan/TKK construction does not itself perform.

