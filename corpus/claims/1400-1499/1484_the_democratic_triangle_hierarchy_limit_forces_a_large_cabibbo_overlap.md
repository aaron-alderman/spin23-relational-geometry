# The democratic triangle hierarchy limit forces a large Cabibbo overlap

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact first-order neighbourhood obstruction plus bounded general-holonomy audits

**Depends on:** [the zero-flux reversed-slope seam](1483_zero_flux_reopens_the_decreasing_up_slope_but_forces_an_almost_equilateral_triangle.md)

**Evidence:** [machine-readable expansion and searches](../../../evidence/data/spin23-democratic-triangle-cabibbo-obstruction.json), [executable verifier](../../../verification/verify/verify_spin23_democratic_triangle_cabibbo_obstruction.mjs), [Huang--Zhou common-scale running masses](https://arxiv.org/abs/2009.04851), and the [2025 PDG CKM review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf)

## Result

The almost-equilateral zero-flux seam of claim 1483 is not merely a badly
sampled CKM fit.  In the simultaneous hierarchy limit, the shared-holonomy
triangle forces the two light-family eigendirections to meet at an acute
Bloch angle.  Consequently

\[
\boxed{\liminf |V_{us}|\ge {1\over\sqrt2}}
\]

on the decreasing-up/increasing-down branch when the third-family mixing
also tends to zero.  The observed value, \(|V_{us}|=0.22501\), is on the
wrong side of this asymptotic bound.

This closes the most promising narrow neighbourhood left open by claim
1483.  It is not a global no-go for every general-holonomy triangle.

## Top down: the symmetry-enhanced middle

At \(a=b=c=1\) and zero flux,

- \(K_u=D-H\) has spectrum \((0,3,3)\);
- \(K_d=D+\eta H^*\) has spectrum
  \((2-\eta,2-\eta,2+2\eta)\) for \(\eta>0\).

A decreasing up-sector affine map turns the upper doublet into the light
\((u,c)\) pair.  An increasing down-sector map turns the lower doublet into
the light \((d,s)\) pair.  Both third-generation states are the common
singlet \((1,1,1)/\sqrt3\).  This is a genuine top-down explanation of why
two hierarchies and \(|V_{tb}|\simeq1\) appear together.

## Bottom up: the two observed hierarchy ratios

Use the scale chart \(c=1\), write

\[
a=1+x,\qquad b=1+y,\qquad \delta=t,
\]

and restrict the first-order perturbations to the common \(A_2\) doublet.
In a fixed orthonormal doublet basis their traceless parts have Bloch vectors

\[
u=\left(-{\sqrt3\over2}y,{\sqrt3\over3}t,x-{y\over2}\right),
\]

\[
d=\left({\sqrt3(2\eta-1)\over6}y,
{\sqrt3\eta\over3}t,
{1-2\eta\over3}x+{2\eta-1\over6}y\right).
\]

Equivalently, separating the edge plane from the flux axis,

\[
d_{\rm edge}={1-2\eta\over3}u_{\rm edge},
\qquad
d_{\rm flux}=\eta u_{\rm flux}.
\]

The physical spectral locations obey

\[
r_u={2|u|\over3}+O(\epsilon^2),
\qquad
r_d={2|d|\over3\eta}+O(\epsilon^2).
\]

For the common-\(M_Z\) inputs,

\[
R={r_d\over r_u}=25.7586262.
\]

Thus hierarchy matching requires \(|d|/|u|\to\eta R\).  If
\(\eta\ge1/2\), the largest component scale from \(u\) to \(d\) is at most
\(\eta\), which is incompatible with \(R>1\).  If \(0<\eta<1/2\),
feasibility requires

\[
{1-2\eta\over3}\ge\eta R,
\qquad
\boxed{\eta\le {1\over2+3R}=0.0126141774.}
\]

Both component scales are then positive, so \(u\cdot d>0\).  The upper
eigenvectors of the two doublets have

\[
|\langle u_+|d_+\rangle|^2
={1+\widehat u\cdot\widehat d\over2}>{1\over2}.
\]

Because the reversed up ordering identifies \(u_+\) with the physical
up state and the increasing down ordering identifies \(d_+\) with the
physical strange state, this is precisely the Cabibbo entry.

## Why the diagonal phase orbit does not remove the limiting bound

At the symmetric point the third-generation eigenvector is the common
singlet.  In the limit \(|V_{ub}|,|V_{cb}|\to0\), a diagonal vertex phase
operator must preserve that singlet.  A diagonal matrix preserves
\((1,1,1)\) only when its three phases agree, modulo a global phase.  Its
restriction to the \(A_2\) plane is then scalar and cannot rotate the two
Bloch eigendirections.  The bound therefore survives the maximal derived
diagonal orbit in the simultaneous hierarchy/decoupling limit.

## Numerical fan around the theorem

Three independent differential-evolution searches in scaled near-democratic
coordinates converged to the same finite-data basin.  They reproduced the
two hierarchy ratios to percent-level accuracy and small third-family
mixing, but retained \(|V_{us}|\simeq0.994\).  A separate 6,000-point
general-holonomy rooted audit found 7,980 exact up roots, 11,970 exact down
continuations and only 23 witnesses passing every entrywise phasor interval;
its best recorded four-observable log score was 1.8917.  These searches are
bounded evidence, not global-minimum certificates.

## Convergence verdict

The bidirectional programme did converge on a beautiful middle:

- the top-down \(1\oplus A_2\) defect module becomes a democratic singlet
  plus light-family doublet;
- the bottom-up quark hierarchies select opposite affine slopes and force
  \(\eta\) near \(1/(2+3R)\);
- both third generations align automatically;
- the same shared perturbation then aligns the light doublets too strongly.

The failure is therefore localized.  The next admissible deformation must
change the relative **doublet** orientation while retaining the common
singlet and the two spectral splittings.  Independent arbitrary sector
matrices would erase the result.  A sector-character action on the shared
connection or one derived noncentral doublet intertwiner is the smallest
typed next target.  Physical admission remains false.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_democratic_triangle_cabibbo_obstruction.mjs
~~~
