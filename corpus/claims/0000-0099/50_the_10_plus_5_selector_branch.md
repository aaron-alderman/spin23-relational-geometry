# The (10+5) Selector: (Spin_0(2,4)\to Spin_0(2,3))

**Date:** 16 October 2026  
**Branch:** B01 selector, with direct consequences for B05 action/unitarity  
**Claim status:** symmetric-pair algebra established; physical realization open; naive scalar-Goldstone realization fails the first health test

---

## 1. The exact decomposition

Use the orthogonal real forms

\[
\mathfrak{su}(2,2)\cong\mathfrak{so}(2,4),
\qquad
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

Let \(V=\mathbb R^{2,4}\) have metric

\[
\eta=\operatorname{diag}(-1,-1,+1,+1,+1,+1).
\]

Choose a positive-norm vector \(n=e_6\). Its stabilizer preserves the orthogonal complement

\[
n^\perp\cong\mathbb R^{2,3},
\]

and hence is \(SO_0(2,3)\). At Lie-algebra level,

\[
\boxed{
\mathfrak{so}(2,4)
=\mathfrak{so}(2,3)\oplus\mathfrak m,
\qquad \dim\mathfrak m=5.
}
\]

Transporting through the exceptional isomorphisms gives

\[
\boxed{
\mathfrak{su}(2,2)
=\mathfrak{sp}(4,\mathbb R)\oplus\mathbf5.
}
\]

The five-dimensional complement is the vector representation of \(SO(2,3)\), equivalently the primitive-bivector representation constructed in the global-group analysis.

---

## 2. Why this is a symmetric pair

Write

\[
\mathfrak h=\mathfrak{so}(2,3),
\qquad
\mathfrak m\cong\mathbb R^{2,3}.
\]

The commutators obey

\[
\boxed{
[\mathfrak h,\mathfrak h]\subset\mathfrak h,
\qquad
[\mathfrak h,\mathfrak m]\subset\mathfrak m,
\qquad
[\mathfrak m,\mathfrak m]\subset\mathfrak h.
}
\]

Therefore

\[
SO_0(2,4)/SO_0(2,3)
\]

is a five-dimensional pseudo-Riemannian symmetric space. The complement is not an arbitrary leftover from subtracting dimensions; it closes back into the stabilizer after two broken-direction commutators.

This is the rigorous content behind “the next rung carries five directions.”

---

## 3. Relation to the real Jordan slice

The already established Jordan descent is

\[
H_2(\mathbb C)
\xrightarrow{\kappa\text{-fixed}}
H_2(\mathbb R).
\]

Its conformal algebras descend as

\[
\mathfrak{so}(2,4)
\longrightarrow
\mathfrak{so}(2,3).
\]

The current branch supplies a group-geometric description of the same reduction: a positive-norm ambient selector \(n\) has stabilizer \(SO_0(2,3)\). To identify the two mechanisms physically, one must construct \(\kappa_n\) intrinsically from \(n\) and prove

\[
H_2(\mathbb C)^{\kappa_n}\cong H_2(\mathbb R).
\]

That map is a named open dependency. A coordinate choice in which \(n=e_6\) demonstrates existence but does not explain physical selection.

---

## 4. The tempting Goldstone interpretation

If a field \(\Phi\) transforms in the six-dimensional vector representation of \(SO(2,4)\) and acquires positive norm,

\[
\langle\Phi\rangle^T\eta\langle\Phi\rangle=v^2>0,
\]

then the stabilizer is \(SO(2,3)\) and the orbit has dimension

\[
15-10=5.
\]

This makes the five complement directions natural candidates for broken-symmetry modes.

The naive invariant action would be

\[
S_\Phi=\int d^dx\sqrt{|g|}
\left[
-\frac12(D_\mu\Phi)^T\eta(D^\mu\Phi)
-\frac\lambda4(\Phi^T\eta\Phi-v^2)^2
\right].
\]

Dimension counting alone would then suggest five Goldstone fields.

That conclusion is premature.

---

## 5. Uncomfortable result: the coset metric is indefinite

The natural invariant metric on \(\mathfrak m\) is proportional to the restriction of \(\eta\) to \(n^\perp\):

\[
\eta|_{\mathfrak m}
=\operatorname{diag}(-1,-1,+1,+1,+1).
\]

It has signature \((2,3)\). Consequently a sigma model using this invariant form as an internal kinetic metric has wrong-sign directions. The same problem is already visible in the six-component linear action: the noncompact invariant bilinear form is indefinite.

Therefore:

\[
\boxed{
\text{the five broken generators are not automatically five healthy scalar Goldstones.}
}
\]

This is the first important negative result of the branch. A positive-definite scalar kinetic metric would not preserve the full noncompact \(SO(2,4)\) as an internal symmetry.

---

## 6. Surviving physical interpretations

The indefinite metric does not kill the selector, but it sharply limits its role.

### 6.1 Geometric rather than internal

If \(SO(2,4)\) is a spacetime or conformal group, the coset coordinates need not be five ordinary internal scalar particles. They may describe an embedding, conformal frame, hypersurface or ambient geometry. Indefinite signature is then geometric rather than a negative Hilbert-space norm.

### 6.2 Gauged and constrained

If the noncompact symmetry is gauged, constraints and gauge redundancy may remove negative-norm polarizations. This requires a complete gauge action and Hamiltonian constraint analysis; the word “gauged” alone does not cure ghosts.

### 6.3 Auxiliary selector

The selector may be nondynamical or algebraically constrained. Then it chooses a real form without adding propagating modes. The cost is explaining how such a selector is determined and whether it violates covariance.

### 6.4 Boundary normal

A unit normal to a physical boundary or causal screen has an indefinite ambient orbit naturally. The five directions describe possible embeddings or orientations, not an internal multiplet. This directly connects B01 to B08.

### 6.5 Nonlinear realization with reduced physical coordinates

Inverse-Higgs-type constraints or other covariant relations can sometimes eliminate redundant Goldstone fields when spacetime symmetries break. A concrete commutator structure and field realization are required before invoking this possibility.

---

## 7. Selector mechanisms now ranked

| Mechanism | Mathematical status | Health status | Next test |
|---|---|---|---|
| Five ordinary internal Goldstones | Symmetry count exact | **Fails naive kinetic-sign test** | Seek proof of unavoidable ghosts or a nonstandard unitary realization |
| Spacetime/conformal breaking | Candidate bridge | Plausible | Construct nonlinear realization and count independent modes |
| Boundary normal | Candidate bridge | Plausible | Derive \(\kappa_n\) and boundary stress map |
| Gauged selector | Candidate bridge | Unknown | Full constraint and Hamiltonian analysis |
| Auxiliary fixed-norm field | Candidate bridge | Unknown | Test covariance and radiative stability |
| Stress-derived eigenvector | Candidate bridge | Domain-limited | Determine existence and uniqueness for physical stress classes |
| Discrete/lattice selector | Speculative | Unknown | Show controlled continuum limit and suppressed Lorentz violation |

---

## 8. Stop-everything outcomes

### Positive

Re-root the programme around this branch if one construction simultaneously:

1. produces \(n\) dynamically;
2. induces the Jordan involution \(\kappa_n\);
3. leaves a ghost-free physical spectrum;
4. identifies the five complement directions as constrained, geometric or observed modes;
5. supplies the same normal required by the stress–Jordan projection.

That would unify symmetry selection, the real Jordan carrier and the stress map with one object.

### Negative

Demote dynamical selector breaking if every covariant realization either:

- contains unavoidable negative-norm propagating states;
- makes \(n\) a nondynamical preferred direction;
- destroys the complex structure needed by the internal matter module;
- or yields no observable distinction after constraints are imposed.

The exact subgroup relation would remain valid, but its role would be kinematical rather than dynamical.

---

## 9. Executable certificate

[`verification/verify/verify-spin24-spin23-symmetric-pair.mjs`](../../../verification/verify/verify-spin24-spin23-symmetric-pair.mjs) checks with exact integer matrices:

- \(15=10+5\) independent generators;
- the \(\mathfrak{so}(2,4)\) metric condition;
- all 100 \([\mathfrak h,\mathfrak h]\) basis brackets;
- all 50 \([\mathfrak h,\mathfrak m]\) basis brackets;
- all 25 \([\mathfrak m,\mathfrak m]\) basis brackets;
- the complement metric signature \((2,3)\).

Run:

```powershell
node verification/verify/verify-spin24-spin23-symmetric-pair.mjs
```

The certificate proves the finite-dimensional algebra data. It does not prove a healthy quantum theory.

---

## 10. Branch state

### Established

- the \(10+5\) symmetric-pair decomposition;
- the five transforms as the \(SO(2,3)\) vector;
- the natural invariant complement metric is indefinite;
- naive ordinary-scalar Goldstone language is physically insufficient.

### Active

- construct \(\kappa_n\) intrinsically;
- compare spacetime, boundary, gauge and auxiliary selector realizations;
- determine whether constraints remove every wrong-sign mode;
- connect the same selector to the stress-current projection.

### Pinned sub-branch

The claim “the five are physical Goldstone particles” is pinned pending a ghost-free action and constraint analysis.

- **Blocker:** indefinite invariant kinetic metric.
- **Last established point:** five broken algebra directions exist.
- **Unlock condition:** a gauge/geometric realization with a positive physical Hilbert space.
- **Unsafe shortcut:** counting broken generators and declaring five particles.

## Companion documents

- [Multi-branch registry](49_multi_branch_research_registry.md)
- [Jordan selection and conformal descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Global group isomorphism](47_global_group_isomorphism_sp4r_spin023.md)
- [Stress–energy reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
