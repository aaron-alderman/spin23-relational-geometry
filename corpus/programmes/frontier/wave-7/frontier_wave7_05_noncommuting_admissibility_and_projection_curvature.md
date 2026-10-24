# Frontier Wave 7.5: Noncommuting Admissibility and Projection Curvature

**Date:** 24 October 2026  
**Status:** exact alternating-projection theorem in the linear model; holonomy interpretation conditional  
**Certificate:** [verify_noncommuting_admissibility_projections.mjs](../../../../verification/verify/verify_noncommuting_admissibility_projections.mjs)

## The new structure

Suppose two physical requirements are represented locally by orthogonal projections \(P\) and \(Q\). Their admissible sets are the ranges of the projections, while their joint admissible set is

\[
\operatorname{Ran}P\cap\operatorname{Ran}Q.
\]

If

\[
[P,Q]\ne0,
\]

then imposing the requirements in different orders gives different intermediate states:

\[
PQx\ne QPx.
\]

The composition defect is now an operator commutator. This is the first precise form of the corpus intuition that repeated turning, projection and return may reveal structure unavailable to either constraint alone.

## Selection by transverse intersection

One constraint can leave a line or surface of solutions. A second independent constraint can intersect it transversely and reduce the fixed set.

For two planes in \(\mathbb R^3\):

- one projection leaves a two-dimensional fixed plane;
- two distinct planes generically share one fixed line;
- an additional independent affine or normalized condition can isolate one point or ray.

Thus the optimization analogy is exact locally:

\[
\text{flat solution manifold}
\quad\longrightarrow\quad
\text{transverse added datum}
\quad\longrightarrow\quad
\text{isolated solution}.
\]

The unremoved tangent directions are the local flat modes. Calling them Goldstone modes requires the additional physical statement that they arise from spontaneous breaking of a continuous symmetry, but the geometry of the surviving tangent space is the same calculation.

## Dynamics from alternating admissibility

Repeatedly apply the two projections:

\[
x_{n+1}=P Q x_n.
\]

For closed linear subspaces, alternating orthogonal projections converge to the projection onto the intersection. Away from the common subspace, the asymptotic contraction is controlled by the Friedrichs/principal angle \(\theta\):

\[
\|x_{n+1}^{\perp}\|
\sim
\cos^2\theta\,
\|x_n^{\perp}\|.
\]

Hence:

- nearly parallel constraints give slow convergence and an apparently soft mode;
- transverse constraints give fast selection;
- coincident constraints add no new selection;
- and incompatible affine constraints produce residual error or cycling rather than a common solution.

This supplies a general dynamical interpretation of “one solution rather than a surface” without requiring the fixed point to be inserted by hand.

## The commutator and the curvature analogy

In the three-dimensional certificate,

\[
\|[P,Q]\|_{\rm F}
=\sqrt2\,|\sin\theta\cos\theta|.
\]

The commutator vanishes when the constraints coincide or are mutually compatible in the relevant orthogonal decomposition. It is largest at an intermediate angle, not at a quarter turn.

It is legitimate to call this **projection curvature** only in a restricted sense: it measures order dependence of two local reduction operations.

For an actual curvature or holonomy claim one additionally needs:

1. a parameter space of admissibility conditions;
2. a rule transporting retained states or frames between nearby fibers;
3. comparison around a closed loop; and
4. a gauge-covariant loop invariant.

Noninvertible projections alone do not define a group-valued holonomy. They define a contraction semigroup with order-dependent transients.

## Where the quarter turn belongs

The corpus's quarter-turn complex structures act on retained oriented two-planes and satisfy

\[
J^2=-1.
\]

An orthogonal projector instead satisfies

\[
P^2=P.
\]

They are different operations. The bridge is that a moving family of projectors carries a connection

\[
[P,dP],
\]

whose parallel transport can rotate a retained frame even though the projector itself returns. The projection selects the subspace; the connection supplies the spin.

This separates three repeatedly conflated phenomena:

- **selection:** contraction toward an intersection;
- **rotation:** coherent transport inside a retained subspace;
- **memory:** feedback from eliminated directions.

## Hysteresis and metastability

Fixed linear orthogonal projections converge to the same intersection regardless of the first step, although their transient paths differ. Persistent hysteresis requires more:

- nonlinear or state-dependent projections;
- moving constraint manifolds;
- multiple local intersections;
- finite sweep rate;
- dissipation or delayed hidden variables.

Near tangency, \(\cos^2\theta\approx1\), so convergence is slow. Noise and finite sweep rate can then create metastable branch retention that resembles spontaneous selection. The principal-angle measurement is therefore a useful control against overreading hysteresis.

## Experimental use

In the four-mode quotient-scar platform:

1. one detector face leaves a hidden contrast line;
2. a second independent face intersects that kernel transversely;
3. their angle predicts conditioning and convergence;
4. reversing their order tests transient noncommutation;
5. cycling a continuously varying detector/control pair tests for genuine frame holonomy.

This turns the “spin, transform, return” intuition into separate measurable quantities instead of one metaphor.
