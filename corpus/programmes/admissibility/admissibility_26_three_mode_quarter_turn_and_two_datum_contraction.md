# A three-mode quarter-turn and the first contractive two-datum return map

**Date:** 24 October 2026  
**Status:** exact finite-dimensional model and experimentally translatable protocol  
**Parent:** [Current research frontier crosswalk](admissibility_25_current_research_frontier_crosswalk.md)  
**Evidence:** [Three-mode holonomy and contraction ledger](../../../evidence/data/admissibility-three-mode-quarter-turn-two-datum-contraction-v1.json)  
**Verifier:** [Three-mode holonomy and contraction certificate](../../../verification/admissibility/verify_three_mode_quarter_turn_two_datum_contraction.mjs)

## Result

The first experimental packet can be made exact with three modes. A cyclic, gapped Hamiltonian returns its spectral projector to itself while parallel transport rotates the degenerate complementary frame by one quarter-turn. Adding one independently measured rank-one anisotropy then changes the projector return map from neutral memory to genuine attraction.

The two results are:

\[
\boxed{
P(2\pi)=P(0),
\qquad
U_Q(2\pi)=R\!\left(\frac{\pi}{2}\right)
}
\]

and

\[
\boxed{
\mathcal R_{a,b}(P;Y)=\Pi_{\max}(aP+bY),
\qquad
\rho\!\left(D\mathcal R_Y\right)=\frac{a}{a+b}<1.
}
\]

The first box distinguishes projective return from coherent return. The second supplies the missing contraction forbidden in the projector-only model.

## Three-mode Hamiltonian

Work in a real three-mode subspace of \(\mathbb C^3\). Let

\[
c=\cos\theta=\frac34,
\qquad
s=\sin\theta=\frac{\sqrt7}{4},
\]

and define the cyclic unit vector

\[
n(\phi)
=
\begin{pmatrix}
s\cos\phi\\
s\sin\phi\\
c
\end{pmatrix},
\qquad
0\leq\phi\leq2\pi.
\]

Set

\[
P(\phi)=n(\phi)n(\phi)^T,
\qquad
Q(\phi)=I-P(\phi),
\]

and choose

\[
H_0(\phi)=\Delta Q(\phi),
\qquad
\Delta>0.
\]

The line \(P\) has eigenvalue zero and the plane \(Q\) is a degenerate doublet with eigenvalue \(\Delta\). The gap remains exactly \(\Delta\) along the whole loop. Because \(n(2\pi)=n(0)\), both spectral projectors return exactly:

\[
P(2\pi)=P(0),
\qquad
Q(2\pi)=Q(0).
\]

## Why the complementary frame makes a quarter-turn

Use the periodic orthonormal frame of \(Q(\phi)\)

\[
e_\theta(\phi)
=
\begin{pmatrix}
c\cos\phi\\
c\sin\phi\\
-s
\end{pmatrix},
\qquad
e_\phi(\phi)
=
\begin{pmatrix}
-\sin\phi\\
\cos\phi\\
0
\end{pmatrix}.
\]

Its real Wilczek--Zee connection is

\[
\mathcal A_phi
=
\begin{pmatrix}
e_\theta^T\partial_\phi e_\theta & e_\theta^T\partial_\phi e_\phi\\
e_\phi^T\partial_\phi e_\theta & e_\phi^T\partial_\phi e_\phi
\end{pmatrix}
=c
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}
=cJ.
\]

Parallel-transported coefficients obey \(\partial_\phi v=-\mathcal A_\phi v\), hence

\[
U_Q(2\pi)
=\exp(-2\pi cJ)
=\exp\!\left(-\frac{3\pi}{2}J\right)
=\exp\!\left(\frac{\pi}{2}J\right)
=J.
\]

Equivalently, the latitude encloses solid angle

\[
\Omega=2\pi(1-c)=\frac{\pi}{2}.
\]

Thus the projector closes after one circuit while a coherent vector in the doublet undergoes the quarter-turn \(J\). Reversing the traversal reverses the sign. The winding direction is therefore the orientation/history datum required by AZ-024.

The same transport follows from the universal generator

\[
\Omega_P=[\dot P,P]
=\dot n n^T-n\dot n^T.
\]

It moves \(n\) with the projector and parallel-transports the orthogonal plane.

## Adiabatic and dynamical-phase boundary

If \(\phi=\omega t\), then

\[
\|\dot P\|=\omega s=\frac{\sqrt7}{4}\omega.
\]

The geometric protocol requires

\[
\epsilon_{\rm ad}
=\frac{\omega s}{\Delta}
\ll1.
\]

The doublet also acquires the common dynamical phase \(e^{-i\Delta T}\). It must be removed by calibration, echo or a reference arm before the geometric quarter-turn is inferred. Failing to separate this scalar phase from the frame rotation is a false positive.

## The second datum

Let

\[
Y=yy^T,
\qquad
y^Ty=1,
\]

be an independently measured boundary, material or detector axis. It is not regenerated from \(P\). Combine memory and external relational data in the positive operator

\[
F(P;Y)=aP+bY,
\qquad
a>0,
\qquad
b>a,
\]

and define the next prepared projector as its principal spectral projector:

\[
\mathcal R_{a,b}(P;Y)=\Pi_{\max}(F(P;Y)).
\]

Equivalently, \(\mathcal R\) is the ground-state projector of \(-F\). The coefficient \(a\) measures retained projector memory; \(b\) is the strength of the independently measured selector.

## Unique fixed point

Suppose \(P=pp^T\) is fixed. Then \(p\) must be a principal eigenvector of

\[
a pp^T+b yy^T.
\]

If \(p^Ty\neq0\), the eigenvector equation requires \(p\parallel y\), so \(P=Y\). If \(p^Ty=0\), the eigenvalues along \(p\) and \(y\) are \(a\) and \(b\); because \(b>a\), \(p\) is not principal. Therefore

\[
\boxed{
\operatorname{Fix}(\mathcal R_{a,b})=\{Y\}.
}
\]

The whole neutral \(\mathbb{RP}^2\) fixed surface has collapsed to one projective axis.

## Exact contraction at the fixed point

Write a tangent perturbation of \(Y\) as

\[
\delta P=yu^T+uy^T,
\qquad
u\perp y.
\]

At \(P=Y\),

\[
F=(a+b)Y,
\qquad
\delta F=a\,\delta P.
\]

First-order spectral-projector perturbation gives

\[
D\mathcal R_Y(\delta P)
=\frac{a}{a+b}\delta P.
\]

Both tangent directions therefore have the same multiplier:

\[
\boxed{
\rho(D\mathcal R_Y)=\frac{a}{a+b}<1.
}
\]

For the minimal numerical witness \((a,b)=(1,2)\),

\[
\rho(D\mathcal R_Y)=\frac13.
\]

This is the requested transition from topology as neutral memory to relational data as an attractive selector.

## Global angle map

Let \(\vartheta\in[0,\pi/2]\) be the projective angle between \(P\) and \(Y\), and let \(\alpha\) be the angle after one return. In their common two-plane,

\[
\tan(2\alpha)
=\frac{a\sin(2\vartheta)}{b+a\cos(2\vartheta)},
\]

with the principal branch \(0\leq\alpha<\pi/4\). For \(b>a\),

\[
0\leq\alpha<\vartheta
\qquad
(0<\vartheta\leq\pi/2).
\]

Every nonselected projector moves strictly closer to \(Y\); at \(P\perp Y\), one step selects \(Y\) because the \(b\)-eigenvalue wins. Iteration converges globally to the unique fixed point.

By contrast, setting \(b=0\) gives

\[
\mathcal R_{a,0}(P)=P,
\]

recovering the AZ-024 identity map exactly.

## What is physically measurable

A three-mode photonic, microwave or mechanical realization needs four readouts:

1. **instantaneous spectrum:** verify one singlet, one doublet and a nonclosing gap \(\Delta\);
2. **projector tomography:** verify \(P(2\pi)=P(0)\);
3. **coherent doublet interferometry:** after removing the common dynamical phase, verify \(e_\theta\mapsto e_\phi\) and \(e_\phi\mapsto-e_\theta\);
4. **return-map tomography:** initialize several \(P\)'s near and far from \(Y\), repeat the prepare-measure-update cycle, and fit the angle map and local multiplier.

The sharp comparator is:

\[
b=0:\ \rho=1
\qquad\text{versus}\qquad
b>0:\ \rho=\frac{a}{a+b}<1.
\]

This separates preservation from selection without relying on semantic descriptions of “spontaneity.”

## What has and has not closed

Closed in this finite model:

- a smooth three-mode gapped Hamiltonian realizes the projector path;
- one cycle returns the spectral projector exactly;
- the degenerate frame acquires an exact quarter-turn holonomy;
- loop orientation supplies the sign of the coherent turn;
- an independent rank-one datum produces a unique fixed projector;
- the tangent spectral radius is exactly below one;
- the no-selector limit returns continuously to the identity map.

Still open:

- the laboratory control matrix and calibration errors for a chosen platform;
- whether \(Y\) is a wall normal, response tensor, detector frame or metastable record in that platform;
- robustness to doublet splitting, loss, nonadiabaticity and noise;
- any identification of these three modes with the corpus's family, matter or gravitational carriers;
- any implication for \(Spin(2,3)\) or \(E_8\).

The next gate is to perturb this exact model by the four dominant experimental imperfections—doublet splitting, loss imbalance, timing error and projector-tomography noise—and determine which observables still distinguish \(\rho=1\) from \(\rho<1\).
