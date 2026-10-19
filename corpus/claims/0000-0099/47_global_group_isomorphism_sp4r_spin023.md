# The Global Group Isomorphism (Sp(4,\mathbb R)\cong Spin_0(2,3))

**Date:** 16 October 2026  
**Status:** explicit representation, kernel and topology; executable Lie-algebra certificate included

---

## 1. Why the Lie-algebra statement is not enough

The TKK calculation gives

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

Lie-algebra isomorphism determines connected Lie groups only up to covering and discrete central quotients. To justify

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

rather than merely saying that the groups are locally isomorphic, one must identify:

1. a five-dimensional quadratic representation;
2. its signature;
3. the kernel of the group homomorphism;
4. the connected image;
5. the topology of the resulting double cover.

All five can be exhibited directly.

---

## 2. Start with the four-dimensional symplectic carrier

Let \(W\cong\mathbb R^4\) carry a nondegenerate symplectic form \(\Omega\). Then

\[
Sp(W,\Omega)=
\{g\in GL(W):g^*\Omega=\Omega\}.
\]

The symplectic form determines a volume form

\[
\operatorname{vol}=\frac12\Omega\wedge\Omega.
\]

Consider the six-dimensional space \(\Lambda^2W\), or equivalently \(\Lambda^2W^*\) after the symplectic identification. Wedge product defines a symmetric bilinear form because two-forms have even degree:

\[
\alpha\wedge\beta
=B(\alpha,\beta)\operatorname{vol},
\qquad
B(\alpha,\beta)=B(\beta,\alpha).
\]

On all of \(\Lambda^2W\), this form has split signature \((3,3)\).

---

## 3. The five-dimensional primitive subspace

The symplectic bivector or form spans one distinguished line. Its wedge-orthogonal complement is

\[
\Lambda^2_0W
=\{\alpha\in\Lambda^2W:\alpha\wedge\Omega=0\},
\]

the space of primitive two-forms. It has dimension five.

Choose a symplectic basis \((q_1,q_2,p_1,p_2)\) and let

\[
\Omega=q_1\wedge p_1+q_2\wedge p_2.
\]

A basis for \(\Lambda^2_0W\) is

\[
\begin{aligned}
a_1&=q_1\wedge q_2,
&a_2&=p_1\wedge p_2,\\
a_3&=q_1\wedge p_2,
&a_4&=q_2\wedge p_1,\\
a_5&=q_1\wedge p_1-q_2\wedge p_2.
\end{aligned}
\]

In this basis, the wedge metric is

\[
[B]=
\begin{pmatrix}
0&1&0&0&0\\
1&0&0&0&0\\
0&0&0&1&0\\
0&0&1&0&0\\
0&0&0&0&2
\end{pmatrix}.
\]

In the basis \((a_1+a_2,a_1-a_2,a_3+a_4,a_3-a_4,a_5)\), it becomes

\[
\operatorname{diag}(2,-2,2,-2,2).
\]

Its signature is therefore \((3,2)\), or \((2,3)\) after reversing the overall sign convention. The orthogonal algebra is the same:

\[
\mathfrak{so}(3,2)\cong\mathfrak{so}(2,3).
\]

This five-dimensional space is distinct from both earlier carriers:

- \(J=\operatorname{Sym}_2(\mathbb R)\) has dimension three;
- the defining symplectic representation \(W\) has dimension four;
- the vector representation of \(SO(2,3)\) is \(\Lambda^2_0W\), of dimension five.

---

## 4. The group homomorphism

Every \(g\in Sp(W,\Omega)\) preserves \(\Omega\), the induced volume, the primitive subspace and its wedge metric. Hence exterior square gives a homomorphism

\[
\rho:Sp(4,\mathbb R)
\longrightarrow SO(\Lambda^2_0W,B)
\cong SO(3,2).
\]

Because \(Sp(4,\mathbb R)\) is connected, its image lies in the identity component:

\[
\rho\big(Sp(4,\mathbb R)\big)\subset SO_0(3,2).
\]

The differential

\[
d\rho:\mathfrak{sp}(4,\mathbb R)
\longrightarrow\mathfrak{so}(3,2)
\]

is injective. Both algebras have dimension ten, so it is an isomorphism. Therefore the group image is a connected Lie subgroup with the full Lie algebra \(\mathfrak{so}(3,2)\). It is open, and a connected Lie group has no proper open connected subgroup. Consequently

\[
\rho\big(Sp(4,\mathbb R)\big)=SO_0(3,2).
\]

---

## 5. The kernel is exactly ({\pm I\})

Both \(I\) and \(-I\) act trivially on two-forms:

\[
(-u)\wedge(-v)=u\wedge v.
\]

Thus \(\{\pm I\}\subset\ker\rho\).

Conversely, if \(g\in\ker\rho\), it acts trivially on \(\Lambda^2_0W\). Because \(g\) is symplectic it also fixes the complementary symplectic line \(\mathbb R\Omega\) pointwise. Hence it acts trivially on

\[
\Lambda^2W=\Lambda^2_0W\oplus\mathbb R\Omega.
\]

If \(g\in GL(W)\) acts trivially on \(\Lambda^2W\), then

\[
gu\wedge gv=u\wedge v
\]

for every \(u,v\). In dimension at least three, the kernel of the exterior-square representation consists of scalar transformations whose scalar square is one. Hence \(g=\pm I\). Restricting from \(GL(W)\) to \(Sp(W)\) gives

\[
\boxed{\ker\rho=\{I,-I\}.}
\]

It follows that

\[
\boxed{
Sp(4,\mathbb R)/\{\pm I\}
\cong SO_0(3,2)
\cong SO_0(2,3).
}
\]

So \(Sp(4,\mathbb R)\) is a connected double cover of \(SO_0(2,3)\).

---

## 6. Why this is the spin cover

The spin group \(Spin_0(2,3)\) is the connected Clifford-theoretic double cover of \(SO_0(2,3)\). Its maximal compact subgroup is

\[
\frac{Spin(2)\times Spin(3)}{\{(1,1),(-1,-1)\}}
\cong\frac{U(1)\times SU(2)}{\mathbb Z_2}
\cong U(2).
\]

The maximal compact subgroup of \(Sp(4,\mathbb R)\) is also \(U(2)\). The exterior-square map restricts with the same diagonal central identification and the same nontrivial kernel \(\{\pm I\}\). Equivalently, the root data identify the split real forms of type \(C_2\) and \(B_2\), whose simply connected algebraic groups are isomorphic because the rank-two root systems are dual and coincide after exchanging long and short roots.

Thus the connected double cover constructed above is the spin cover, not merely an unspecified locally isomorphic group:

\[
\boxed{
Sp(4,\mathbb R)\cong Spin_0(3,2)\cong Spin_0(2,3).
}
\]

The notation \(Spin_0\) emphasizes the connected component mapping onto \(SO_0\). It is not the universal cover: \(Sp(4,\mathbb R)\) has fundamental group \(\mathbb Z\).

---

## 7. How this connects to the Jordan triple

The complete chain now contains three different representations:

\[
\boxed{
\begin{array}{ccccc}
J=\operatorname{Sym}_2(\mathbb R)
&\xrightarrow{\mathrm{TKK}}&
\mathfrak{sp}(W)
&\xrightarrow{\Lambda^2_0W}&
\mathfrak{so}(2,3)\\
\dim 3&&\dim W=4&&\dim\Lambda^2_0W=5.
\end{array}
}
\]

The three-dimensional Jordan carrier supplies the two nilpotent wings of the TKK grading. The four-dimensional symplectic carrier is the defining spinor representation. Its primitive two-forms supply the five-dimensional orthogonal vector representation.

This clarifies the “one carrier, two faces, three relationships” language without collapsing inequivalent spaces:

- the Jordan carrier organizes observables and the triple;
- the symplectic carrier realizes spinors and phase space;
- the primitive bivector carrier realizes the \((2,3)\) vector geometry.

They are functorially connected, not literally identical.

---

## 8. Executable certificate

The script [`verification/verify/verify-sp4-spin23-cover.mjs`](../../../verification/verify/verify-sp4-spin23-cover.mjs) uses exact integer arithmetic to check:

1. the five displayed primitive bivectors;
2. invariance of the symplectic bivector under all ten basis generators of \(\mathfrak{sp}(4,\mathbb R)\);
3. preservation of the five-dimensional wedge metric;
4. rank ten of the induced orthogonal Lie algebra;
5. the diagonal form with signature \((3,2)\);
6. identical exterior-square action of \(I\) and \(-I\).

Run:

```powershell
node verification/verify/verify-sp4-spin23-cover.mjs
```

The kernel-exhaustion and connected-cover arguments remain mathematical proofs rather than finite basis tests; the script verifies their algebraic representation data.

---

## 9. Final global determination

The precise statement is now:

\[
\boxed{
\begin{gathered}
J=\operatorname{Sym}_2(\mathbb R),\qquad
\{A,X,B\}=AXB+BXA,\\
\operatorname{TKK}(J)\cong\mathfrak{sp}(4,\mathbb R),\\
Sp(4,\mathbb R)/\{\pm I\}\cong SO_0(2,3),\\
Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{gathered}
}
\]

The first line is the Jordan-triple hypothesis. The second is the Lie-algebra reconstruction. The third and fourth are the global topology. No step follows from “recursion” without the specified carrier, product, TKK closure and real form.

## Companion documents

- [Determination: Jordan triple to \(Sp(4,\mathbb R)\)](42_jordan_triple_to_sp4r_determination.md)
- [Executable Jordan-triple certificate](45_jordan_sp4_executable_certificate.md)
- [Jordan selection axioms and conformal descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Stress–energy reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
