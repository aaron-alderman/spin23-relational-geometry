# Stress–Jordan Dynamical Closure: First Counterexample and Surviving Routes

**Date:** 16 October 2026  
**Branch:** B02 stress–Jordan dynamics  
**Claim status:** conservation-only closure falsified; stronger covariant and integrated formulations remain open

---

## 1. The corrected question

The stress reduction gate supplies matrices

\[
A=\Pi_{n,u_A}(T_A),
\qquad
X=\Pi_{n,u_X}(T_X),
\qquad
B=\Pi_{n,u_B}(T_B)
\in H_2(\mathbb R).
\]

Algebraically,

\[
\{A,X,B\}=AXB+BXA
\in H_2(\mathbb R).
\]

But the physical question is not whether the matrix output remains symmetric. It is whether that output is again an admissible on-shell stress-derived current.

The previously suggested identity

\[
\frac{d}{dt}\{A,X,B\}
=\{\dot A,X,B\}+\{A,\dot X,B\}+\{A,X,\dot B\}
\]

is not a discriminating test. It follows automatically from the ordinary product rule for differentiable matrices. It does not imply that the triple output satisfies the same field equation or conservation law as the inputs.

The meaningful closure condition is

\[
\boxed{
A,X,B\in\mathcal S_{\mathrm{phys}}
\quad\Longrightarrow\quad
\{A,X,B\}\in\mathcal S_{\mathrm{phys}},
}
\]

where \(\mathcal S_{\mathrm{phys}}\) is the image of on-shell physical configurations under \(\Pi\).

---

## 2. A local conservation counterexample

Work in a \(2+1\)-dimensional flat slice with coordinates \((t,x,y)\), take \(u=(1,0,0)\), and suppress the \(y\)-component. Encode a current \(j=(j^0,j^1,0)\) as

\[
P(j)=
\begin{pmatrix}
j^0+j^1&0\\
0&j^0-j^1
\end{pmatrix}.
\]

Choose three currents:

\[
j_A=(0,t,0),
\qquad
j_X=(x,0,0),
\qquad
j_B=(1,0,0).
\]

Each is locally conserved:

\[
\partial_tj^0+\partial_xj^1=0.
\]

They arise as the first columns of explicit symmetric conserved tensors:

\[
T_A^{ab}=
\begin{pmatrix}
0&t&0\\
t&-x&0\\
0&0&0
\end{pmatrix},
\qquad
T_X^{ab}=
\begin{pmatrix}
x&0&0\\
0&0&0\\
0&0&0
\end{pmatrix},
\qquad
T_B^{ab}=
\begin{pmatrix}
1&0&0\\
0&0&0\\
0&0&0
\end{pmatrix}.
\]

Direct differentiation gives

\[
\partial_aT_A^{ab}
=\partial_aT_X^{ab}
=\partial_aT_B^{ab}=0.
\]

Their Jordan matrices are

\[
A=\begin{pmatrix}t&0\\0&-t\end{pmatrix},
\qquad
X=\begin{pmatrix}x&0\\0&x\end{pmatrix},
\qquad
B=I.
\]

The triple is

\[
\{A,X,B\}=AXB+BXA
=\begin{pmatrix}2tx&0\\0&-2tx\end{pmatrix}.
\]

It represents

\[
j_{\mathrm{out}}=(0,2tx,0),
\]

whose divergence is

\[
\boxed{
\partial_tj^0_{\mathrm{out}}
+\partial_xj^1_{\mathrm{out}}
=2t\ne0.
}
\]

Thus even symmetric conserved input tensors can yield a nonconserved pointwise Jordan-triple current.

---

## 3. What has been falsified

The counterexample falsifies the claim

> Local stress conservation by itself makes stress-derived currents closed under the pointwise Jordan triple.

It does not depend on numerical approximation or a difficult interacting theory. The obstruction is the familiar one that products of solutions to a linear differential equation are not normally solutions of that equation.

This matters because algebraic closure in \(H_2(\mathbb R)\) is much weaker than dynamical closure of the physical image.

---

## 4. What the counterexample does not prove

The tensors above are conserved symmetric polynomial tensors, but they were not derived from a specified healthy matter Lagrangian or required to obey an energy condition. Therefore the result does not yet prove that every physically restricted stress image fails.

Possible smaller domains include:

- perfect-fluid stresses with a common velocity field;
- null dust with aligned null direction;
- stationary or homogeneous sectors;
- integrated conserved charges;
- boundary response matrices rather than local currents;
- stress tensors satisfying a nonlinear common field equation;
- expectation values restricted to a particular state family.

Each restriction must be justified independently. It cannot be introduced solely because it restores closure.

---

## 5. Surviving Route A: integrated charges

For a conserved current with suitable boundary falloff,

\[
Q=\int_\Sigma j^0\,d^2x
\]

is time-independent. If \(Q_A,Q_X,Q_B\) are matrix-valued conserved charges, then

\[
\{Q_A,Q_X,Q_B\}
\]

is also time-independent by the ordinary product rule.

This gives dynamical closure at the level of global charges, but not local stress density. The price is loss of locality. The branch should test whether the intended carrier was always closer to an integrated response or moment map than to \(T_{\mu\nu}(x)\).

---

## 6. Surviving Route B: parallel transport under a Jordan connection

Let \(D\) be a connection acting as a derivation of the triple:

\[
D\{A,X,B\}
=\{DA,X,B\}+\{A,DX,B\}+\{A,X,DB\}.
\]

If

\[
DA=DX=DB=0,
\]

then the triple is also parallel. This is nontrivial only if \(D\) is a physically derived TKK or \(Sp(4)\) connection, not the ordinary derivative rewritten with new notation.

This route shifts the primitive object from a conserved current to a parallel observable. It may fit the phase-space or holonomy interpretation better than the stress-density interpretation.

---

## 7. Surviving Route C: projection back on shell

One may define

\[
A\star X\star B
=\mathcal P_{\mathrm{phys}}(AXB+BXA),
\]

where \(\mathcal P_{\mathrm{phys}}\) projects onto an on-shell or admissible subspace.

This is viable only if the projection is canonical, covariant and compatible with the Jordan triple identity. Generic projection destroys the identity or makes the product state-dependent. Conditional expectations in operator algebras provide one mathematical analogy, but no physical projection has yet been derived here.

---

## 8. Surviving Route D: common special sectors

Closure may hold in highly structured sectors. For example, if all matrices remain proportional to one fixed idempotent \(p\),

\[
A=a p,
\qquad X=x p,
\qquad B=b p,
\]

then

\[
\{A,X,B\}=2axb\,p.
\]

This is closed but effectively one-dimensional and produces only an \(\mathfrak{sl}(2)\)-type conformal structure, not the full \(\mathfrak{sp}(4)\). A viable special sector must retain all three Jordan directions and nontrivial relation algebra.

---

## 9. Revised branch tests

The stress branch should now proceed through increasingly physical domains:

1. classify divergence-free current families closed under the \(H_2(\mathbb R)\) triple;
2. determine which such families arise from symmetric conserved tensors;
3. determine which arise from healthy scalar, Dirac or gauge Lagrangians;
4. impose relevant energy conditions or quantum averaged conditions;
5. test whether closure survives interacting evolution;
6. compare local-current closure with integrated-charge and parallel-transport formulations.

The branch must not treat the algebraic product rule as a dynamical theorem.

---

## 10. Executable certificate

[`verification/verify/verify-stress-jordan-closure-counterexample.mjs`](../../../verification/verify/verify-stress-jordan-closure-counterexample.mjs) uses exact polynomial arithmetic to verify:

- symmetry and conservation of all three displayed tensors;
- conservation of their extracted currents;
- the exact Jordan triple matrix;
- the nonzero output divergence \(2t\).

Run:

```powershell
node verification/verify/verify-stress-jordan-closure-counterexample.mjs
```

---

## 11. Branch state

### Falsified in scope

Local conservation alone does not make the stress-current image triple-closed.

### Active

- physically generated stress families;
- integrated charge closure;
- TKK/Jordan-compatible connections;
- canonical on-shell projection;
- boundary and phase-space reinterpretations.

### Pinned sub-branch

“Arbitrary conserved local stress currents form a Jordan triple” is pinned as falsified in the stated scope.

- **Blocker:** explicit nonconserved triple output.
- **Last established point:** each input can arise from a symmetric conserved tensor.
- **Unlock condition:** a justified smaller physical domain with full three-dimensional Jordan closure.
- **Unsafe shortcut:** replacing local on-shell closure by the tautological matrix product rule.

## Companion documents

- [Multi-branch registry](49_multi_branch_research_registry.md)
- [Stress–energy reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [The \(10+5\) selector](50_the_10_plus_5_selector_branch.md)
