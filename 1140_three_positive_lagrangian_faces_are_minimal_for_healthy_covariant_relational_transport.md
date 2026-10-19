# Three Positive Lagrangian Faces Are Minimal for Healthy Covariant Relational Transport

**Date:** 19 October 2026  
**Branches:** relational carrier, positive quadratic dynamics, Jordan--Riccati return, three-face geometry  
**Claim status:** exact equivariant classification and constructive positive triple; physical update law remains open  
**Certificate:** [verify_three_lagrangians_are_minimal_for_covariant_relational_transport.mjs](scripts/verify_three_lagrangians_are_minimal_for_covariant_relational_transport.mjs)

## Executive result

Document 1139 proved that one Lagrangian/Jordan state cannot fully covariantly assign itself a nonzero $Spin_0(2,3)$ generator. The next two rungs can now be classified exactly.

1. An ordered transverse pair of Lagrangian faces $(M,N)$ has a unique equivariant generator up to scale:

   \[
   H_{M,N}=\Pi_M-\Pi_N.
   \]

   It is $+1$ on $M$ and $-1$ on $N$. But it preserves both faces, so two faces define a relation without moving either member of that relation.

2. A third Lagrangian carrier $L$, positive relative to the splitting $M\oplus N$, supplies the missing metric. In normalized coordinates

   \[
   M=\{(q,0)\},
   \qquad
   N=\{(0,p)\},
   \qquad
   L=\{(q,Xq)\},
   \qquad X=X^T>0,
   \]

   the triple canonically defines

   \[
   \boxed{
   \mathcal S_X=
   \begin{pmatrix}X&0\\0&X^{-1}\end{pmatrix}>0,
   \qquad
   K_X=J\mathcal S_X
   =\begin{pmatrix}0&X^{-1}\\-X&0\end{pmatrix},
   \qquad K_X^2=-I.
   }
   \]

   This is a healthy elliptic quadratic Hamiltonian, and it moves the third carrier.

Thus “three” has a precise minimal meaning in the present $Spin(2,3)$ programme:

\[
\boxed{
\begin{array}{c}
\text{one face: no nonzero fully covariant generator;}\\
\text{two faces: a unique relative generator that fixes both;}\\
\text{three positive faces: a positive generator that can move the third.}
\end{array}}
\]

This does not yet derive physical nonlinear feedback or a Feigenbaum cascade. The minimal triple update obtained below is exactly solvable and only contracts or expands the radial Jordan coordinate. But it is the first nontrivial, fully covariant, positive construction that survives all preceding gates.

## 1. The unique generator of an ordered transverse pair

For transverse Lagrangians $M$ and $N$,

\[
V=M\oplus N.
\]

Let $\Pi_M$ and $\Pi_N$ be the projections associated with this direct sum. Define

\[
H_{M,N}=\Pi_M-\Pi_N.
\]

Then

\[
H_{M,N}^2=I,
\qquad
H_{N,M}=-H_{M,N}.
\]

Because $M$ and $N$ are Lagrangian, for $m\in M$ and $n\in N$,

\[
\omega(Hm,n)+\omega(m,Hn)
=\omega(m,n)-\omega(m,n)=0.
\]

The same identity is automatic within either isotropic face. Hence

\[
H_{M,N}\in\mathfrak{sp}(V,\omega).
\]

The assignment is fully equivariant:

\[
H_{gM,gN}=gH_{M,N}g^{-1}.
\]

### Uniqueness

At the standard pair $(M_0,N_0)$, the common stabilizer is

\[
\left\{
\begin{pmatrix}A&0\\0&A^{-T}\end{pmatrix}:A\in GL(2,\mathbb R)
\right\}.
\]

Its adjoint-fixed subspace in $\mathfrak{sp}_4$ is one-dimensional. Direct commutator reduction gives

\[
\mathfrak{sp}_4^{GL(2)}
=\mathbb R
\begin{pmatrix}I&0\\0&-I\end{pmatrix}.
\]

The certificate obtains the same result from the full linear system: the constraint matrix has rank nine in the ten-dimensional Lie algebra.

Therefore every fully equivariant generator built only from an ordered transverse pair is a scalar multiple of $H_{M,N}$.

## 2. Why two faces are still dynamically insufficient

The flow of the pair grading is

\[
e^{tH_{M,N}}m=e^tm,
\qquad
e^{tH_{M,N}}n=e^{-t}n.
\]

It rescales vectors but fixes $M$ and $N$ as subspaces:

\[
e^{tH_{M,N}}M=M,
\qquad
e^{tH_{M,N}}N=N.
\]

So the pair contains a canonical orientation and relative dilation, but no intrinsic motion of either defining face.

Its Hessian is also indefinite. In the standard symplectic frame,

\[
H_{M_0,N_0}=\begin{pmatrix}I&0\\0&-I\end{pmatrix},
\qquad
\mathcal S=-JH
=\begin{pmatrix}0&I\\I&0\end{pmatrix}.
\]

Thus the pair alone supplies a hyperbolic relationship generator, not a positive stable oscillator.

It can move a third carrier. If $L_X=\operatorname{graph}(X)$, then

\[
e^{tH_{M_0,N_0}}L_X=L_{e^{-2t}X}.
\]

Already this makes the counting precise: two faces define the generator; a third object is needed to undergo the transport.

## 3. A positive third face supplies the healthy generator

Now let the third Lagrangian be the graph of an invertible symmetric map $X:M\to N$. Its symmetry is precisely the Lagrangian condition. Positivity means that the induced symmetric form is positive definite; in the normalized chart, $X>0$.

Define on $M\oplus N$

\[
K_X(m+n)=X^{-1}n-Xm.
\]

In blocks,

\[
K_X=
\begin{pmatrix}
0&X^{-1}\\
-X&0
\end{pmatrix}.
\]

Then

\[
K_X^2=-I,
\]

so $K_X$ is a complex structure. It lies in $\mathfrak{sp}_4$, and its Hamiltonian Hessian is

\[
\mathcal S_X=-JK_X
=\begin{pmatrix}
X&0\\
0&X^{-1}
\end{pmatrix}>0.
\]

The construction is coordinate-independent. A symplectic transformation of the entire ordered triple conjugates $K_X$ and transforms $\mathcal S_X$ by the corresponding congruence. Positivity is preserved.

The third face has therefore supplied exactly what the pair lacked:

- an isomorphism between the two transverse faces;
- a positive quadratic form;
- an elliptic rather than hyperbolic generator;
- a nontrivial action on the third carrier.

This is the cleanest exact realization yet of the phrase “one carrier, two faces, three relationships.”

## 4. The induced Riccati update is exact

Since $K_X^2=-I$,

\[
e^{\theta K_X}=\cos\theta\,I+\sin\theta\,K_X.
\]

Apply this to a vector $(q,Xq)$ in the third graph:

\[
\begin{aligned}
q'&=(\cos\theta+\sin\theta)q,\\
p'&=(\cos\theta-\sin\theta)Xq.
\end{aligned}
\]

Whenever $\cos\theta+\sin\theta\ne0$, the transported graph is

\[
\boxed{
X'
=r(\theta)X,
\qquad
r(\theta)
=\frac{\cos\theta-\sin\theta}
{\cos\theta+\sin\theta}.
}
\]

For $0<\theta<\pi/4$, this is a strict contraction toward the first reference face. At $\theta=\pi/4$, the third carrier reaches that face. Negative small $\theta$ gives expansion. The apparent singularity when the denominator vanishes is a Lagrangian-chart crossing.

If $K_X$ is recomputed from the returned graph at every step while the two reference faces remain fixed, then

\[
X_n=r(\theta)^nX_0.
\]

The generator is state-dependent and positive, but the induced update remains exactly radial and integrable.

## 5. What “three” does and does not mean

This result supports a narrow, defensible claim:

> Three Lagrangian faces are the minimum needed for a fully symplectic-covariant construction in which relational data determine a positive quadratic generator that moves a carrier.

It does not show that:

- nature fundamentally has three generations for this reason;
- the three Standard Model families are these three Lagrangians;
- the $P,I,N$ triangle is already dynamically identified with this positive triple;
- a three-cycle automatically creates chaos or period doubling;
- the constructed Hamiltonian is selected by the spectral action or stress tensor.

Those are separate intertwiner and dynamics questions.

## 6. Consequence for the generative-dynamics frontier

The minimum admissible adaptive signature can now be sharpened from document 1139. It is not merely “add some memory.” A canonical healthy seed exists on the space of positive ordered triples:

\[
(M,N,L_X)
\longmapsto
\mathcal S_X
=\operatorname{diag}(X,X^{-1}).
\]

But keeping $M$ and $N$ fixed leaves only radial evolution. Genuine nonlinear branching requires at least one further feature:

1. the reference faces themselves evolve;
2. different relationship generators are composed in a noncommuting cycle;
3. the step angle is derived from a transported response or defect variable;
4. the physical projection or chart changes after each passage;
5. stress backreaction changes which triple is positive.

The smallest serious next model is therefore a cyclic triple update such as

\[
L_{i,n+1}
=\exp\!\bigl(\theta_{i,n}K_{L_{j,n},L_{k,n};L_{i,n}}\bigr)L_{i,n},
\]

with all types, positivity domains and angle laws derived rather than chosen. No such cyclic law is yet present in the corpus.

## 7. Stop-everything tests

**Typed-triple trigger:** identify three existing typed carrier faces with a positive Maslov ordering and show that the graph map $X$ is a represented one-form, response kernel or stress Hessian.

**Spectral trigger:** derive $\operatorname{diag}(X,X^{-1})$ or an equivalent congruence class from the finite spectral action rather than introducing it as a geometric construction.

**Noncommuting-cycle trigger:** construct three positive pair/triple generators from the $P,I,N$ or Dirac/Majorana sectors and prove that their ordered product is not reducible to one fixed $Sp(4)$ transport.

**Feedback trigger:** derive $\theta_{n+1}$ or the next reference pair from the returned state by a Ward identity, conservation law or causal network equation.

**Health falsifier:** any proposed positive triple yields a non-positive $\mathcal S_X$, fails $K_X^2=-I$ or leaves its alleged transported carrier fixed.

## 8. Verdict

| Input data | Equivariant generator | Positivity | Can move one of the supplied faces? |
|---|---|---|---|
| one Lagrangian | only zero | trivial | no |
| ordered transverse pair | unique grading up to scale | indefinite | no; it fixes both |
| positive ordered triple | canonical elliptic $K_X$ | positive definite | yes; it moves the third |

The result is a genuine convergence point:

\[
\boxed{
\text{three is not numerology here; it is the first healthy relational transport arity.}
}
\]

The remaining problem is no longer to justify the number three abstractly. It is to prove that the programme's physical typed faces instantiate this positive Lagrangian triple and to derive how the triple updates after one passage.

## 9. Dependencies

- [state-only equivariant feedback no-go](1139_full_spin23_covariance_forbids_a_nonzero_state_only_feedback_generator.md)
- [natural Riccati return](1138_the_natural_spin23_riccati_return_is_fixed_transport_not_yet_a_feedback_bifurcation.md)
- [quadratic Hamiltonian to Jordan--Riccati bridge](55_quadratic_hamiltonian_to_jordan_riccati_branch.md)
- [two-sided interface and three relations](61_two_sided_interface_three_relations_branch.md)
- [three as the minimal Möbius gear cycle](1128_three_is_the_minimal_Mobius_gear_cycle_and_the_third_relation_of_the_typed_twin_wheels.md)
- [typed triple recursion and cover parity](1132_binary_Jordan_composition_selects_the_trivial_cover_while_odd_Jordan_triple_recursion_selects_the_Mobius_cover.md)
