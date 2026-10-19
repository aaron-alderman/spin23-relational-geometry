# Labeled Physical Probes Reduce \(Sp(4,\mathbb Z)\) to a Parabolic, So Full Automorphy Requires Source–Response Duality

**Date:** 19 October 2026  
**Branches:** automorphic quotient, two-face response, source labels, polarization, \(Sp(4,\mathbb Z)\), zeta scattering  
**Claim status:** exact stabilizer theorem with finite-field certificate; physical duality remains open

## Executive result

The quotient-principle question from document 1155 has an immediate obstruction.

The programme's two response faces are normally introduced as labeled source channels. Choosing those sources selects a primitive Lagrangian polarization

\[
L_q=\operatorname{span}_{\mathbb Z}\{q_1,q_2\}
\subset\mathbb Z^4.
\]

The full arithmetic symplectic group does not preserve that polarization. Its stabilizer is the Siegel parabolic

\[
P(\mathbb Z)
=
\left\{
\begin{pmatrix}
A&B\\
0&A^{-T}
\end{pmatrix}
:
A\in GL(2,\mathbb Z),\;
A^{-1}B\in H_2(\mathbb Z)
\right\}.
\]

Therefore:

\[
\boxed{
\text{labeled source probes}
\Longrightarrow
\text{parabolic arithmetic symmetry, not full }Sp(4,\mathbb Z).
}
\]

To quotient by the full group, Fourier/Legendre transformations that exchange sources and conjugate responses must be physical equivalences—not merely useful changes of representation.

This is exactly parallel to the earlier ultraviolet-normalization result in the continuous theory, where a fixed response normalization reduced full \(Sp(4,\mathbb R)\) to a Siegel parabolic.

## 1. The canonical integral phase space

Let

\[
\Lambda
=
\Lambda_q\oplus\Lambda_p
\cong
\mathbb Z^2\oplus\mathbb Z^2
\]

with symplectic form

\[
J=
\begin{pmatrix}
0&I\\
-I&0
\end{pmatrix}.
\]

Write

\[
g=
\begin{pmatrix}
A&B\\
C&D
\end{pmatrix}
\in Sp(4,\mathbb Z).
\]

The source polarization is

\[
L_q=\Lambda_q\oplus0.
\]

For \(q\in\Lambda_q\),

\[
g\binom q0
=
\binom{Aq}{Cq}.
\]

Therefore

\[
gL_q=L_q
\quad\Longleftrightarrow\quad
C=0.
\]

The symplectic equations then imply

\[
D=A^{-T},
\qquad
A^{-1}B=(A^{-1}B)^T.
\]

This is exactly the integral Siegel parabolic.

## 2. What different degrees of labeling preserve

There is a hierarchy inside the parabolic.

### 2.1 Only the source subspace is physical

If any primitive basis of \(L_q\) is an equivalent marking, then

\[
A\in GL(2,\mathbb Z)
\]

is allowed. The full parabolic survives.

### 2.2 The two source channels are labeled

If channel 1 and channel 2 have distinct physical meanings, only those \(A\) preserving the labels survive. Depending on conventions, this may be:

- the identity;
- independent signs;
- a permitted exchange;
- a small monomial subgroup.

The continuous \(GL(2,\mathbb Z)\) relabeling freedom is lost.

### 2.3 Contact/shear freedom is calibrated

With \(A=I\), the residual elements are

\[
\begin{pmatrix}
I&B\\
0&I
\end{pmatrix},
\qquad B=B^T\in H_2(\mathbb Z),
\]

acting on Siegel space by

\[
Z\mapsto Z+B.
\]

These are integral response/contact translations. If absolute contact terms are physically calibrated rather than quotient data, even this subgroup is no longer redundant.

Thus a completely labeled and calibrated experiment may have a trivial marking stabilizer despite the existence of the ambient \(Sp(4,\mathbb Z)\) lattice.

## 3. The missing transformations

The full symplectic group contains transformations with

\[
C\neq0.
\]

The standard Fourier/Legendre element is

\[
S=
\begin{pmatrix}
0&-I\\
I&0
\end{pmatrix},
\]

which sends

\[
(q,p)\mapsto(-p,q),
\qquad
Z\mapsto-Z^{-1}.
\]

It exchanges source and conjugate-response polarizations. If \(q\) and \(p\) represent operationally different quantities, \(S\) changes the experiment.

Consequently:

\[
\boxed{
\text{full automorphy requires a physical source–response duality.}
}
\]

This can arise from a genuine interface Fourier transform, electric–magnetic duality, a mapping-class re-marking, or a self-dual boundary theory. It cannot be inferred from the existence of a Legendre transform as a mathematical operation.

## 4. Finite-field shadow

Over \(\mathbb F_q\), the number of Lagrangian subspaces in a four-dimensional symplectic vector space is

\[
(q+1)(q^2+1).
\]

For \(q=3\),

\[
(3+1)(3^2+1)=40.
\]

Since

\[
|Sp(4,\mathbb F_3)|=51840,
\]

the stabilizer of one Lagrangian polarization has order

\[
\frac{51840}{40}=1296.
\]

This agrees with

\[
|GL(2,\mathbb F_3)|
\cdot
|\operatorname{Sym}_2(\mathbb F_3)|
=
48\cdot3^3
=1296.
\]

If the ordered source basis is fixed pointwise, only the symmetric shear block remains, of order

\[
3^3=27.
\]

So the finite two-qutrit carrier makes the symmetry loss quantitative:

\[
\boxed{
51840
\longrightarrow
1296
\longrightarrow
27
}
\]

as one fixes first the source polarization and then its ordered basis.

## 5. Consequence for the zeta-scattering bridge

Automorphic Eisenstein scattering is built precisely because different cusp/polarization descriptions are related by Weyl intertwiners. The functional equation relates asymptotic terms such as

\[
y^s
\quad\text{and}\quad
\varphi(s)y^{1-s}.
\]

If the physical theory fixes only one source polarization and disallows its Fourier-dual description, the Weyl intertwiner is not a physical equivalence. Zeta-valued scattering may still exist mathematically in an enlarged completion, but the measured subsystem occupies one parabolic chart.

This produces three possible physical interpretations.

### A. Parabolic response theory

Only \(P(\mathbb Z)\) is physically relevant. The Jordan/Herglotz response survives, but full automorphy and its functional equation do not.

### B. Duality-covariant theory

The Fourier/Legendre transform is implemented by a physical interface or exact duality. Multiple polarizations describe equivalent physics, reopening the full quotient.

### C. Enlarged environment

The system itself is not self-dual, but an environment or doubled boundary contains both source and response descriptions. The full group acts on the enlarged carrier while an observed sector remains parabolic.

Option C resembles the programme's repeated pattern in which full \(Spin(2,3)\) organizes an ambient completion while physical data occupy a selected slice.

## 6. Relation to the learning architecture

This obstruction adds a useful distinction to relational passive learning.

A learner that preserves a fixed input/output semantics operates within one parabolic chart. It may change positive response matrices and spectral realizations without exchanging what counts as intervention and observation.

A **reflexive** learner capable of revising that distinction would allow transformations between polarizations:

\[
\text{what was treated as source}
\quad\leftrightarrow\quad
\text{what was treated as response}.
\]

That is a stronger kind of model revision than adding a pole. It changes the epistemic interface itself.

This is potentially consciousness-relevant as an analogy to reframing, but it is already mathematically expressible as symplectic polarization change. No conscious causal term is required.

## 7. Exact relationship to the earlier continuous reduction

Document 214 showed that fixing ultraviolet response normalization restricts a fractional-linear \(Sp(4,\mathbb R)\) action to a Siegel parabolic, with real symmetric translations affecting only contact data.

The present arithmetic theorem is its integral counterpart:

\[
\begin{array}{ccc}
\text{continuous} && \text{arithmetic}\\
Sp(4,\mathbb R) && Sp(4,\mathbb Z)\\
\downarrow && \downarrow\\
P(\mathbb R) && P(\mathbb Z).
\end{array}
\]

This convergence is important. The reduction is not an accident of one model. It follows whenever a physical polarization/normalization is selected.

## 8. Stop-everything triggers

1. **Exact physical Fourier interface:** a boundary defect implements \(S:(q,p)\mapsto(-p,q)\).
2. **Electric–magnetic self-duality:** the physical theory identifies the source and dual-flux descriptions.
3. **Mapping-class redundancy:** the two faces arise as an unmarked genus-two homology basis, not immutable particle labels.
4. **Weyl functional equation in response:** measured amplitudes obey the automorphic intertwining relation.
5. **Doubled-carrier closure:** an enlarged physical system contains all 40 mod-three polarizations in one orbit.
6. **Label falsifier:** Standard-Model quantum numbers distinguish the two source axes and their duals absolutely, permanently restricting the theory to a proper subgroup.

## 9. Decision

The present physical response does not justify the full automorphic quotient merely because its carrier admits an integral symplectic lattice.

\[
\boxed{
\text{fixed physical probes reduce }Sp(4,\mathbb Z)
\text{ to their parabolic stabilizer.}
}
\]

The zeta bridge remains live only through one of two routes:

- derive genuine source–response duality;
- locate the full automorphic action in an enlarged/unmarked carrier while treating the observed response as one selected polarization.

The second route is currently more compatible with the corpus.

## Executable certificate

Run:

    node verification/verify/verify_labeled_polarization_reduces_sp4f3_to_parabolic.mjs

It verifies the group-order decomposition

\[
|Sp(4,\mathbb F_3)|=40\cdot1296,
\qquad
1296=48\cdot27,
\]

and checks that the Fourier element moves the selected source Lagrangian while parabolic shears preserve it.
