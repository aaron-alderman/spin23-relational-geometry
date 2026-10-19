# The Gaussian Gram Selector Is the \(H_2(\mathbb R)\) Jordan Log-Det Barrier and a Peirce Slice of the Rank-Three Cubic

**Date:** 18 October 2026  
**Branches:** Gaussian influence functional, residual covariance, Euclidean Jordan cone, Peirce–Schur recursion, rank-three cubic norm, and \(Spin(2,3)\)  
**Claim status:** exact algebraic bridge and conditional effective action; microscopic bath and Real-slice selection remain open  
**Certificate:** [identify_the_gaussian_gram_influence_functional_with_the_h2r_jordan_barrier.mjs](scripts/identify_the_gaussian_gram_influence_functional_with_the_h2r_jordan_barrier.mjs)

## Executive result

The Gaussian Gram-centre selector of document 1022 is not merely analogous to a Jordan barrier. On the Real residual slice, it is exactly the canonical logarithmic barrier of the rank-two Euclidean Jordan algebra

\[
H_2(\mathbb R)_+.
\]

Let

\[
K_{\rm res}(x)=
\begin{pmatrix}
A&x\\
x&B
\end{pmatrix},
\qquad A,B>0,
\qquad x^2<AB.
\]

The fixed-variance Gaussian influence functional is

\[
\boxed{
\Gamma_{\rm bath}(x)
=-\nu\log\det K_{\rm res}(x)
=-\nu\log(AB-x^2),
\qquad \nu>0.}
\]

Its unique stationary point is

\[
\boxed{x=0,}
\]

which is exactly the Gram centre. Its Tits–Kantor–Koecher/conformal closure is

\[
\boxed{
\mathfrak{co}(H_2(\mathbb R))
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).}
\]

Moreover, embedding

\[
K_{\rm res}\longmapsto
\begin{pmatrix}1&0\\0&K_{\rm res}\end{pmatrix}
\in H_3(\mathbb R)
\]

gives

\[
\det\operatorname{diag}(1,K_{\rm res})
=\det K_{\rm res}.
\]

The Gaussian selector is therefore a literal Peirce slice of a rank-three Jordan cubic norm. This joins the cubic-consistency, environment, recursion and \(Spin(2,3)\) branches in one exact calculation.

## 1. Unique Gram-centre saddle

Differentiating gives

\[
\Gamma'_{\rm bath}(x)
=\frac{2\nu x}{AB-x^2}.
\]

Inside the cone its only zero is \(x=0\). The curvature is

\[
\Gamma''_{\rm bath}(0)
=\frac{2\nu}{AB}>0.
\]

The action diverges at

\[
x^2=AB,
\]

which is the rank-two Gram boundary. Thus the logarithmic barrier dynamically opposes the rank collapse selected by a minimum-environment principle.

The coupling \(\nu\) controls stiffness but not the saddle location.

## 2. Lorentz-cone coordinates

Set

\[
u=\frac{A+B}{2},
\qquad
v=\frac{A-B}{2}.
\]

Then

\[
K_{\rm res}
=
\begin{pmatrix}
u+v&x\\
x&u-v
\end{pmatrix}
\]

and

\[
\det K_{\rm res}=u^2-v^2-x^2.
\]

Positivity is the future Lorentz cone

\[
u>0,
\qquad
u^2>v^2+x^2.
\]

Its conformal completion adds the two standard TKK grades and yields the \((2,3)\) conformal signature. This is the same mathematical implication established abstractly by the Peirce–Schur recursion in document 202, now realized by the concrete residual noise kernel.

## 3. The Schur triple is already inside the barrier

Eliminating the first residual coordinate gives the scalar Schur complement

\[
B-\frac{x^2}{A}.
\]

Accordingly,

\[
\det K_{\rm res}
=A\left(B-\frac{x^2}{A}\right)
\]

and

\[
-\log\det K_{\rm res}
=-\log A
-\log\left(B-\frac{x^2}{A}\right).
\]

The mediated correction \(xA^{-1}x\) is precisely the one-dimensional instance of

\[
\{X,C^{-1},X\}
\]

in the Peirce–Schur triple recursion. The Gaussian integration, Schur elimination and Jordan triple are therefore three descriptions of the same local operation.

## 4. Rank-three cubic embedding

Take the Peirce idempotent

\[
e=\operatorname{diag}(1,0,0)
\]

in \(H_3(\mathbb R)\). On the block-diagonal slice

\[
R=operatorname{diag}(1,K_{\rm res}),
\]

the rank-three cubic norm restricts as

\[
N_3(R)=\det R=\det K_{\rm res}.
\]

Hence

\[
-\log N_3(R)
=-\log\det K_{\rm res}.
\]

The reference coordinate fixed to one is the common carrier ray; the lower \(2\times2\) Peirce corner is the relational residual doublet. Lowering the cubic cone onto this corner produces exactly the rank-two carrier whose conformal group is \(Spin_0(2,3)\).

This makes a central programme intuition precise:

\[
\text{rank-three cubic local consistency}
\longrightarrow
\text{rank-two relational response}
\longrightarrow
Spin_0(2,3).
\]

The first arrow is a selected Peirce slice, not an automatic theorem about every cubic Jordan algebra.

## 5. Real-versus-complex phase gate

For a complex residual correlation

\[
\delta=x+iy,
\]

the covariance belongs to \(H_2(\mathbb C)_+\) and

\[
\det K_{\rm res}=AB-x^2-y^2
=u^2-v^2-x^2-y^2.
\]

The conformal algebra enlarges to

\[
\mathfrak{su}(2,2)
\cong
\mathfrak{so}(2,4).
\]

The log-determinant action still selects \(x=y=0\), so the saddle itself lies on every real slice. But fluctuations distinguish the theories:

- independent \(x,y\) fluctuations give the \(Spin(2,4)\) parent;
- a Real/CP constraint that removes \(y\) gives the \(Spin(2,3)\) slice;
- conjugate-frequency pairing may make \(y\) dependent rather than independent, but that must be demonstrated in the real-time kernel.

This is the new real-form gate. A real saddle alone does not prove the fluctuation algebra is \(H_2(\mathbb R)\).

## 6. Influence-functional interpretation

For Gaussian residual variables with covariance \(K_{\rm res}\), the normalization volume is proportional to a positive power of \(\det K_{\rm res}\). Equivalently, a one-loop determinant of the inverse covariance produces a term proportional to

\[
-\log\det K_{\rm res}.
\]

This supplies an effective route to \(\Gamma_{\rm bath}\). It does not yet establish the sign, coefficient or dynamical status in a microscopic Furey/Standard-Model action. Those depend on which variables are integrated out, their statistics, and how the covariance itself is varied.

## 7. What this advances

- identifies the Gram residual kernel as an explicit Jordan carrier;
- derives the centre as the unique log-det saddle;
- realizes the Peirce–Schur triple inside the Gaussian elimination;
- embeds the rank-two determinant into a rank-three cubic norm exactly;
- obtains the \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) middle rung from the Real residual cone;
- isolates the independent complex residual phase as the precise \(Spin(2,4)\) enlargement gate.

## 8. Stop-everything and falsification tests

**Influence-functional trigger:** integrating out a specified Furey/Higgs/environment doublet yields \(-\nu\log\det K_{\rm res}\) with \(\nu>0\) and the displayed fixed-variance interpretation.

**Real-kernel trigger:** the microscopic antiunitary or conjugate-frequency sewing removes the independent imaginary residual covariance while preserving causality.

**Cubic trigger:** the same physical reference idempotent embeds the residual kernel as \(\operatorname{diag}(1,K_{\rm res})\) in the programme's rank-three Jordan state.

**Sign falsifier:** the induced determinant term has the opposite sign and drives the system toward the rank-deficient boundary.

**Complex-fluctuation falsifier:** an independent ungapped imaginary covariance mode survives while the theory is claimed to close on \(Spin(2,3)\).

**Group overclaim:** conformal symmetry of the response cone is presented as an already gauged spacetime or Standard-Model symmetry.

## Verdict

| Question | Verdict |
|---|---|
| Is the Gaussian Gram selector a Jordan log-det barrier? | **Yes, exactly** |
| Is its Real cone \(H_2(\mathbb R)_+\)? | **Yes** |
| Does its TKK closure give \(Sp(4,\mathbb R)\cong Spin_0(2,3)\)? | **Yes** |
| Is it a slice of a rank-three cubic norm? | **Yes: \(\det\operatorname{diag}(1,K)=\det K\)** |
| Does a complex residual phase enlarge the parent? | **Yes, to the \(H_2(\mathbb C)\)/\(Spin(2,4)\) rung** |
| Is the microscopic determinant term derived? | **No** |
| Is the physical Real fluctuation selector derived? | **No** |

## Position in the corpus

- [Peirce–Schur recursion to \(Spin(2,3)\)](202_peirce_schur_triple_recursion_to_spin23.md)
- [rank-three cubic barrier](964_a_rank_three_jordan_cubic_barrier_generates_the_a2_face_loss_metric_subject_to_a_sharp_channel_inequality.md)
- [typed partial-sewing environment](1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
- [Gram selector separation](1022_the_gram_centre_is_a_maximum_volume_gaussian_bath_not_a_minimal_environment_or_generic_quantum_entropy_state.md)
- [complex parent and real descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
