# \(S_{\rm v1}\) contains a healthy scoped bosonic tree-level benchmark, but one completion cannot discharge the global A4 gate

**Date:** 20 October 2026  
**Status:** exact tree-level benchmark conditional on explicitly chosen coefficients; not a derived vacuum and not A4 admission  
**Depends on:** [candidate action \(S_{\rm v1}\)](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md) and [A4 information-deficit audit](1220_the_a4_physical_state_gate_blocks_the_typed_action_but_rejects_only_the_naive_two_time_reading.md)  
**Evidence:** [benchmark data](../../../evidence/data/spin23-a4-healthy-benchmark.json) and [verifier](../../../verification/verify/verify_spin23_a4_healthy_benchmark.mjs)

## Result

The term inventory of \(S_{\rm v1}\) admits at least one completely explicit tree-level point at which:

- the gauge kinetic matrix is positive;
- the Higgs, flavon and projector vacuum is stationary;
- every displayed physical bosonic mass squared is nonnegative;
- canonical physical propagator residues are positive;
- the gauge-fixed BRST mode count is conventional;
- periodic Laplace-type fluctuation operators are self-adjoint and lower bounded.

This proves that the four-dimensional response-geometry reading is not obstructed by an unavoidable tree-level ghost in these sectors.

It does **not** make A4 pass. The benchmark chooses coefficients, a projector tensor, a vacuum and a periodic domain that the programme has not derived. Yukawa/Majorana data, defect matter, fixed-plane boundary conditions, loop stability and dynamical gravity remain unspecified.

The exact conclusion is therefore

\[
\boxed{
\exists\ \text{a healthy quadratic completion of the displayed terms}
\quad\not\Rightarrow\quad
\text{the underdetermined candidate is physically certified}.
}
\]

## 1. Conventions and chosen point

Use metric signature \((-+++)\), with

\[
\mathcal L_{\rm gauge}=-{1\over4}F^T K F,
\qquad
\mathcal L_{\rm scalar}=-(D\Phi)^\dagger D\Phi-V
\]

in covariant mostly-plus notation. The metric is a fixed source, not a dynamical gravitational field. \(\operatorname{Spin}_0(2,3)\) is interpreted only as the conformal geometry of the \(H_2(\mathbb R)\) response cone.

Choose

\[
g=0.6,\qquad g_Y=0.4,\qquad g_X=0.3,\qquad \chi=0.2,
\]

\[
v_H=2,\qquad v_s=3,\qquad
\lambda_H=0.5,\qquad\lambda_s=0.4,\qquad\lambda_{Hs}=0.1.
\]

For the neutral gauge basis \((W^3,B_Y,X)\), take

\[
K=
\begin{pmatrix}
1&0&0\\
0&1&0.2\\
0&0.2&1
\end{pmatrix}.
\]

Its eigenvalues are \((0.8,1,1.2)\), so its quadratic kinetic energy is positive definite.

## 2. Stationary scalar and projector vacuum

Choose the permitted shifted potential

\[
\begin{aligned}
V={}&\lambda_H\left(|H|^2-{v_H^2\over2}\right)^2
+\lambda_s\left(|s|^2-{v_s^2\over2}\right)^2\\
&+\lambda_{Hs}\left(|H|^2-{v_H^2\over2}\right)
\left(|s|^2-{v_s^2\over2}\right)
+\kappa\|[P,A]\|_{\rm HS}^2,
\end{aligned}
\]

with

\[
\kappa=0.5,\qquad A=\operatorname{diag}(0,1,2).
\]

The selected benchmark vacuum is

\[
H_0={1\over\sqrt2}(0,v_H),\qquad
s_0={v_s\over\sqrt2},\qquad
P_0=\operatorname{diag}(1,0,0).
\]

Every first derivative vanishes there. The radial quartic form is bounded because

\[
\lambda_H>0,\qquad\lambda_s>0,\qquad
4\lambda_H\lambda_s-\lambda_{Hs}^2=0.79>0.
\]

The last term is of the \(V_{\rm resp}\) form permitted in document 1199. It is not derived by the programme. Indeed, each eigenprojector of \(A\) is a discrete minimum; choosing \(P_0\) remains external to the benchmark.

## 3. Gauge Hessian and masses

At the vacuum, the neutral charge vectors are

\[
c_H=(-0.3,0.2,-0.3),\qquad c_s=(0,0,0.9).
\]

The neutral mass matrix is

\[
M^2=v_H^2c_Hc_H^T+v_s^2c_sc_s^T.
\]

Canonicalize with

\[
A_c=K^{1/2}A,\qquad
M_c^2=K^{-1/2}M^2K^{-1/2}.
\]

The generalized eigenvalues are

\[
m_{\gamma,Z_1,Z_2}^2
=(0,\ 0.4869935816886004,\ 8.108423084978067),
\]

so

\[
m_{Z_1}=0.6978492543,\qquad
m_{Z_2}=2.847529295.
\]

The photon null vector in the original basis is proportional to

\[
(2,3,0),
\]

which is \(K\)-positive. The charged vectors have

\[
m_W^2={g^2v_H^2\over4}=0.36,\qquad m_W=0.6.
\]

After canonicalization and orthogonal mass diagonalization, every transverse propagator has unit positive residue. The nonzero masses are eigenvalues of the positive Gram matrix \(Q^TK^{-1}Q\), where the columns of \(Q\) are \(v_Hc_H\) and \(v_sc_s\).

## 4. Scalar Hessian

For canonically normalized radial fluctuations \((h,\rho)\),

\[
\mathcal M_{\rm radial}^2=
\begin{pmatrix}
2\lambda_Hv_H^2&\lambda_{Hs}v_Hv_s\\
\lambda_{Hs}v_Hv_s&2\lambda_sv_s^2
\end{pmatrix}
=
\begin{pmatrix}
4&0.6\\
0.6&7.2
\end{pmatrix}.
\]

Its eigenvalues are

\[
3.891199250936495,\qquad
7.308800749063504,
\]

with masses \(1.972612291\) and \(2.703479378\). Orthogonal diagonalization preserves unit positive scalar residues.

Near \(P_0\), write the two complex \(\mathbb{CP}^2\) tangent coordinates as \((z_1,z_2)\). With \(f_P=1\),

\[
\mathcal L_{P,\rm kin}^{(2)}
=|\partial z_1|^2+|\partial z_2|^2,
\]

\[
V_P^{(2)}=2\kappa\left(|z_1|^2+4|z_2|^2\right).
\]

Thus the two complex modes—four real physical modes—have

\[
m_P^2=(1,4)
\]

and positive unit residues. This is a health certificate for the chosen \(A,\kappa\), not a derivation of the selector tensor.

## 5. Gauge fixing and physical cohomology

First canonicalize \(K\), then rotate orthogonally to the gauge-mass basis \(V_i\). Use \(R_\xi\) gauge

\[
\mathcal L_{\rm gf}
=-{1\over2\xi}\sum_i
(\partial\!\cdot V_i-\xi m_iG_i)^2,
\qquad \xi=1,
\]

and \(-\tfrac12(\partial\!\cdot A_\gamma)^2\) for the photon. At linear order,

\[
sV_i=\partial c_i,\qquad
sG_i=m_ic_i,\qquad
s\bar c_i=B_i,\qquad
sB_i=0.
\]

The Goldstone, longitudinal representative and Faddeev–Popov sectors cancel in BRST cohomology. The physical gauge count is:

| Field class | Physical modes |
|---|---:|
| photon | 2 |
| two charged massive vectors | 6 |
| two neutral massive vectors | 6 |
| subtotal | 14 |

Adding two radial scalars and four projector tangent modes gives 20 physical bosonic modes outside colour. The eight inherited massless gluons contribute 16 more, for 36 in the scoped bosonic benchmark.

Fermions are not included in this numerical count. Their conventional kinetic terms can have positive physical norm, but the unspecified Yukawa and Majorana tensors prevent an explicit mass spectrum, threshold audit and loop-corrected vacuum calculation.

## 6. Self-adjoint domain

Place the benchmark in a spatial box with opposite faces identified: a three-torus of side \(L=5\). Require all fields, gauge parameters and ghosts to be periodic. Each physical Laplace-type spatial operator has domain \(H^2(T^3)\) and spectrum

\[
\lambda_{\mathbf n}
=\left({2\pi\over L}\right)^2|\mathbf n|^2+m^2,
\qquad \mathbf n\in\mathbb Z^3.
\]

It is self-adjoint and lower bounded by \(m^2\ge0\). Periodicity is also compatible with the linear BRST transformations.

This choice deliberately avoids a physical edge. It certifies a simple complete domain for the bulk benchmark, not the orbifold fixed-plane or defect-boundary domain required by the full programme.

## 7. What the benchmark proves

At tree level and at this declared point:

1. the vacuum is stationary;
2. the gauge kinetic form is positive;
3. all displayed physical bosonic masses squared are nonnegative;
4. all canonical physical pole residues are positive;
5. the periodic fluctuation operators are self-adjoint and lower bounded;
6. the linear gauge-fixed cohomology contains the expected physical polarizations.

Therefore the four-dimensional \(S_{\rm v1}\) term inventory is not forced to be ghostly. This is stronger than merely listing inequalities: it is one executable completion satisfying them simultaneously.

## 8. Minimal global obstruction

A4 is a statement about the candidate theory, not about the existence of one friendly point in the space of theories sharing its notation.

The following remain unspecified:

- the dynamics selecting the parameter point and \(P_0\);
- the full Yukawa and Majorana matrices and their coupling to projector fluctuations;
- fermion and defect loop corrections to the Hessian and kinetic mixing;
- localized defect matter and its parity anomaly;
- the orbifold/fixed-plane self-adjoint domain and boundary BRST complex;
- any dynamical gravitational action and its physical states;
- an RG interval over which positivity survives.

This produces the minimal obstruction:

\[
\boxed{
\text{one healthy completion}
\quad\text{proves consistency is possible, not that it is selected or global}.
}
\]

The benchmark prevents A4 from being labelled an inevitable failure. The missing coefficients and domains prevent it from being labelled a pass. Its status remains **blocked** and physical admission remains false.

## Reproduction

Run:

~~~powershell
node verification/verify/verify_spin23_a4_healthy_benchmark.mjs
~~~

The verifier reconstructs the kinetic eigenvalues, neutral generalized gauge masses, scalar and projector Hessians, residues, mode count and periodic operator lower bound from the declared parameters.
