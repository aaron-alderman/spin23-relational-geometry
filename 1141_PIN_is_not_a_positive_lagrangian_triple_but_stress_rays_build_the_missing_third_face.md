# \(P,I,N\) Is Not a Positive Lagrangian Triple, but Stress Rays Build the Missing Third Face

**Date:** 19 October 2026  
**Branches:** typed \(P,I,N\) geometry, positive Maslov triples, stress spectral response, defect remnants  
**Claim status:** exact type obstruction plus constructive stress/defect bridge; physical weight evolution remains open  
**Certificate:** [verify_PIN_is_not_a_maslov_triple_but_stress_rays_build_positive_graph.mjs](scripts/verify_PIN_is_not_a_maslov_triple_but_stress_rays_build_positive_graph.mjs)

## Executive result

The existing \(P,I,N\) triangle is not document 1140's positive three-Lagrangian construction.

- Forgetting opposite-anchor typing makes \(P,I,N\) generate \(H_3(\mathbb R)\), with conformal algebra \(Sp(6,\mathbb R)\), not one \(Sp(4,\mathbb R)\) carrier.
- Preserving typing gives

  \[
  H_2(\mathbb R)_D\oplus H_2(\mathbb R)_M,
  \]

  with no supplied cross-block symplectic pairing.
- Inside either local wheel, the natural population and coherence matrices have determinants \(0,0,-1\). They are two boundary rays and one indefinite direction, not a positive graph \(X>0\).

Thus

\[
\boxed{
P,I,N\text{ are presently vertex/type data, not three Lagrangian planes in one symplectic four-space.}
}
\]

The older stress and defect branches nevertheless build the missing third face. For rank-one positive relationship rays

\[
Q_i=b_ib_i^T,\qquad w_i\ge0,
\]

the matrix

\[
X=\sum_iw_iQ_i
\]

satisfies

\[
\boxed{
\det X=\sum_{i<j}w_iw_j\det(b_i,b_j)^2.
}
\]

Therefore \(X>0\) exactly when the positively weighted active vectors span \(\mathbb R^2\). The rays do not become three Lagrangian faces separately; together they construct the interior matrix whose graph is the third face.

For the established thermal tensor, vector and scalar channels,

\[
\rho
=aG_T+bG_V+cG_S
=\begin{pmatrix}a+c&c\\c&b+c\end{pmatrix},
\qquad
\det\rho=ab+ac+bc.
\]

Whenever at least two channels are active,

\[
\boxed{
\mathcal S[\rho]
=\begin{pmatrix}\rho&0\\0&\rho^{-1}\end{pmatrix}>0
}
\]

is the positive completion of document 1140. Whether it is the physical Hamiltonian and how its weights update remain open.

## 1. Why the \(P,I,N\) triangle fails the type test

The coarse matrices

\[
E_{PP},\ E_{II},\ E_{NN},\
X_{PI},\ X_{PN},\ X_{IN}
\]

span \(H_3(\mathbb R)=\operatorname{Sym}_3(\mathbb R)\), whose conformal algebra is \(\mathfrak{sp}_6(\mathbb R)\). An additional dimension-reducing map would be required to place them in one four-dimensional symplectic carrier.

The typed carrier instead has basis

\[
(D_P,D_I,M_P,M_N)
=((P,N),(I,N),(P,I),(N,I)).
\]

The Dirac relation \(X_D\) occupies the first \(2\times2\) block and the Majorana relation \(X_M\) the second, so

\[
X_DX_M=X_MX_D=0.
\]

This protects the null mask but leaves the local \(Spin(2,3)\) wheels without a shared symplectic pairing:

\[
\boxed{
\begin{array}{rcl}
\text{forget anchors}&\Longrightarrow&H_3/Sp(6),\\
\text{preserve anchors}&\Longrightarrow&H_2{}_D\oplus H_2{}_M
\text{ with no cross-pairing.}
\end{array}}
\]

## 2. The natural local basis is not a positive triple

Within one local wheel,

\[
E_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
E_{22}=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
X_{12}=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Their determinants are \(0,0,-1\). They span \(H_2(\mathbb R)\), but spanning is not positivity. A generic combination

\[
X=\begin{pmatrix}a&c\\c&b\end{pmatrix}
\]

is positive definite only when

\[
a>0,\qquad ab-c^2>0.
\]

The labels \(P,I,N\) determine neither these coefficients nor their evolution.

## 3. Positive relationship rays construct the interior

Let \(B\) have columns \(\sqrt{w_i}b_i\). Then \(X=BB^T\), and Cauchy--Binet gives

\[
\det(BB^T)
=\sum_{i<j}\det(B_{ij})^2
=\sum_{i<j}w_iw_j\det(b_i,b_j)^2.
\]

Hence:

- one active ray gives \(\det X=0\);
- two nonparallel positive rays give \(X>0\);
- three distinct rays provide a redundant positive frame and span \(H_2\) by signed combinations;
- a continuum is still needed to generate the complete cone with one fixed nonnegative hull.

Rank-one remnants are boundary data. Their positive mixture is the interior metric.

## 4. Thermal stress gives an explicit graph

Use

\[
t=\begin{pmatrix}1\\0\end{pmatrix},
\quad
v=\begin{pmatrix}0\\1\end{pmatrix},
\quad
s=\begin{pmatrix}1\\1\end{pmatrix},
\]

with \(G_T=tt^T\), \(G_V=vv^T\), and \(G_S=ss^T\). Then

\[
\rho
=\begin{pmatrix}a+c&c\\c&b+c\end{pmatrix},
\qquad
\boxed{\det\rho=ab+ac+bc.}
\]

For \(a,b,c\ge0\), \(\rho>0\) precisely when at least two weights are positive. Its inverse is

\[
\rho^{-1}
=\frac1{ab+ac+bc}
\begin{pmatrix}b+c&-c\\-c&a+c\end{pmatrix}.
\]

The positive triple construction gives

\[
\mathcal S[\rho]
=\begin{pmatrix}\rho&0\\0&\rho^{-1}\end{pmatrix},
\qquad
K[\rho]=J\mathcal S[\rho],
\qquad
K[\rho]^2=-I.
\]

Equivalently,

\[
H_\rho(q,p)
=\frac12q^T\rho q+\frac12p^T\rho^{-1}p.
\]

## 5. Corrected counting

The chain is

\[
\text{positive stress channels}
\longrightarrow
\rho\in H_2(\mathbb R)_{++}
\longrightarrow
\operatorname{graph}(\rho)
\longrightarrow
\mathcal S[\rho]
\longrightarrow
K[\rho]\in\mathfrak{sp}_4.
\]

The two Lagrangian faces are the phase-space polarizations \(M,N\); \(\rho\) defines the third graph; and the three thermal channels are relationship rays contributing its three Jordan coordinates. “Three faces” and “three relationships” are not the same objects.

## 6. Remaining gates

Three physical steps remain:

1. derive the two probes and their normalization;
2. derive \(\rho^{-1}\) as a kinetic or Legendre-dual block;
3. derive how \(a,b,c\) change after a passage.

Moreover,

\[
K[\rho]^2=-I
\]

for every positive \(\rho\). The normalized frequency stays fixed. Nonlinear recurrence requires a derived update of the weights, reference faces or traversal angle.

## 7. Stop-everything tests

**Stress-Hamiltonian trigger:** derive \(H_\rho=(q^T\rho q+p^T\rho^{-1}p)/2\) from a canonical response action or transfer law.

**Weight-feedback trigger:** derive a causal map

\[
(a_n,b_n,c_n,X_n)\longmapsto(a_{n+1},b_{n+1},c_{n+1})
\]

from the returned state.

**Domain-loss trigger:** determine whether thresholds can leave only one active ray, where \(ab+ac+bc=0\).

**Typed-intertwiner trigger:** construct an anchor-preserving map from the typed Dirac/Majorana sum to the two-probe response carrier.

**Overclaim stop:** the three thermal channels jointly construct one Lagrangian face; they are not three faces.

## 8. Verdict

| Question | Verdict |
|---|---|
| Are \(P,I,N\) a positive Maslov triple in one \(Sp(4)\) carrier? | **no** |
| Does coarse identification repair this? | **no; it produces \(H_3/Sp(6)\)** |
| Does anchor typing repair it? | **not alone; it produces two unpaired local \(Sp(4)\) blocks** |
| Can positive relationship rays construct the needed interior \(X\)? | **yes** |
| Do thermal stress channels give an explicit positive \(X\)? | **yes, with at least two active nonparallel weights** |
| Is the resulting Hessian positive? | **yes** |
| Is it already the physical Standard-Model evolution law? | **no** |
| Is nonlinear feedback derived? | **no** |

\[
\boxed{
\text{physical relationship rays}
\longrightarrow
\text{positive response }\rho
\longrightarrow
\text{third Lagrangian graph}.
}
\]

## 9. Dependencies

- [three positive Lagrangian faces](1140_three_positive_lagrangian_faces_are_minimal_for_healthy_covariant_relational_transport.md)
- [state-only feedback no-go](1139_full_spin23_covariance_forbids_a_nonzero_state_only_feedback_generator.md)
- [thermal stress channels](211_thermal_stress_channels_can_span_full_h2.md)
- [rank-collapse remnants](271_two_parameter_rank_collapse_leaves_a_finite_relational_remnant.md)
- [three relationship rays](272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [coarse \(P,I,N\) closure](1126_two_overlapping_H2R_null_mask_wheels_generate_H3R_and_raise_Spin23_to_Sp6.md)
- [opposite-anchor split](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)
