# Lane Expansion 02: The Minimal Yukawa-Breaking Form Does Not Preserve the Candidate Source Plane

**Date:** 17 October 2026  
**Lane:** L2, renormalization-group and OPE closure  
**Claim status:** exact finite-dimensional spurion theorem; not yet a one-loop anomalous-dimension calculation  
**Certificate:** [verify_programme_yukawa_breaking_plane_nonclosure.mjs](../../../verification/verify/verify_programme_yukawa_breaking_plane_nonclosure.mjs)

## Result

The candidate source plane

\[
S=\operatorname{span}\{\lambda,q\},
\]

with

\[
\lambda=(5,5,1,1,1,0),qquad
q=3(B-L)=(1,-1,-1,-3,3,3),
\]

is not preserved by the smallest positive quadratic form built from the four Yukawa-breaking channels. This failure holds for every nonzero choice of the four channel weights, not merely for generic values.

This does not yet prove that the renormalized current plane fails to close. It proves that Yukawa incidence does not supply a natural positive mixing geometry that closes on the plane. An actual loop calculation would need additional cancellations or a larger operator basis.

## 1. Six fermion-number directions

In sector order

\[
(Q,u^c,d^c,L,e^c,\nu^c),
\]

use the multiplicity metric

\[
D=\operatorname{diag}(6,3,3,2,1,1).
\]

The four Yukawa edges define charge-sum functionals

\[
v_u=(1,1,0,0,0,0),\quad
v_d=(1,0,1,0,0,0),
\]

\[
v_e=(0,0,0,1,1,0),\quad
v_\nu=(0,0,0,1,0,1).
\]

Their incidence violations on \(\lambda\) are

\[
V(\lambda)=(10,6,2,1),
\]

while

\[
V(q)=0.
\]

## 2. Minimal positive breaking operator

For nonnegative channel weights \(w_a\), define

\[
K_W=D^{-1}V^T W V,
\qquad
W=\operatorname{diag}(w_u,w_d,w_e,w_\nu).
\]

This is the natural positive graph-Laplacian-type form associated with the four explicitly broken Yukawa directions. It is self-adjoint in the multiplicity metric:

\[
\langle x,K_Wy\rangle_D=(Vx)^T W(Vy).
\]

Because \(Vq=0\),

\[
K_Wq=0.
\]

For the incidence vector,

\[
K_W\lambda=
\begin{pmatrix}
(10w_u+6w_d)/6\\
10w_u/3\\
2w_d\\
w_e+w_\nu/2\\
2w_e\\
w_\nu
\end{pmatrix}.
\]

## 3. Exact nonclosure theorem

Demanding \(K_W\lambda=a\lambda+bq\) gives six linear equations for

\[
(w_u,w_d,w_e,w_\nu,a,b).
\]

After multiplying rows by six, their coefficient matrix is

\[
M=
\begin{pmatrix}
10&6&0&0&-30&-6\\
20&0&0&0&-30&6\\
0&12&0&0&-6&6\\
0&0&6&3&-6&18\\
0&0&12&0&-6&-18\\
0&0&0&6&0&-18
\end{pmatrix}.
\]

The exact determinant is

\[
\boxed{\det M=-8{,}087{,}040\ne0.}
\]

Therefore the only solution is

\[
w_u=w_d=w_e=w_\nu=a=b=0.
\]

Consequently

\[
\boxed{
K_W\lambda\in S
\quad\Longleftrightarrow\quad
W=0.}
\]

Any nonzero Yukawa-breaking weight sends incidence outside the proposed two-current plane.

## 4. Physical interpretation

Think of the six currents as six marked directions on a workbench. The four Yukawa couplings are springs connecting particular pairs. The proposed two-dimensional ruler plane contains the incidence and \(B-L\) directions. Once any spring is switched on, its restoring force on incidence points partly out of that plane. No adjustment of the four positive spring strengths makes all six components lie back in the plane.

This is stronger than saying that the preferred basis rotates. The minimal breaking operator requires additional current directions.

## 5. What the theorem does not claim

The operator \(K_W\) is a canonical positive spurion form, not the full Standard-Model anomalous-dimension matrix. A loop calculation can include:

- wavefunction and vertex contributions with scheme-dependent organization;
- the Higgs current \(H^\dagger i\overleftrightarrow D_\mu H\);
- equation-of-motion operators such as \(\partial_\nu B^{\nu\mu}\);
- flavor-off-diagonal currents;
- gauge-anomaly contributions for otherwise classically conserved currents;
- finite counterterm redefinitions.

Those additions enlarge rather than automatically restore the two-plane. Thus the burden has shifted: RG closure must now be demonstrated explicitly; it cannot be inferred from the Yukawa incidence graph.

## 6. Next calculation

The correct next L2 step is to enlarge the basis by the Higgs current and the hypercharge equation-of-motion direction, quotient redundancies, and compute the leading mixing matrix in a declared scheme. Three outcomes are possible:

1. an exact two-dimensional invariant quotient emerges;
2. a larger finite invariant module emerges, demoting the two-channel carrier to a projection;
3. no stable finite source plane exists beyond ordinary symmetry currents.

## Reproducibility

```powershell
node scripts\verify_programme_yukawa_breaking_plane_nonclosure.mjs
```

