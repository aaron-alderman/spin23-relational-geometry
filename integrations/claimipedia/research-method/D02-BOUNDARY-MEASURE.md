# D-02 boundary measure and density strike

## Primary boundary object

The real-axis datum of a bounded operator-valued Herglotz function is first its positive operator-valued representing measure `Sigma`, interpreted through scalar matrix elements. A pointwise boundary operator is a derived object and may not exist.

For each vector state, scalar Herglotz theory gives, at the appropriate almost-everywhere points,

`Im M(lambda+i0) = pi dSigma_ac/dlambda`,

and atom recovery

`Sigma({lambda}) = lim_(y down to 0) y Im M(lambda+i y)`.

Promoting these scalar statements to a bounded operator requires uniform boundedness and a declared topology.

## Bounded measure without bounded density

For each resolution `k`, partition `[0,1]` into `k` intervals and assign one diagonal coordinate the density `k` on each interval. Every coordinate measure has total mass one, so `Sigma([0,1])=I` and the interior Cauchy transform is bounded for every positive height.

At every real `x`, however, one coordinate at every resolution has density `k`. The diagonal density is therefore unbounded. Scalarized densities exist, but they do not assemble into an element of `B(H)`.

## Atom recovery is topology-sensitive

Put uniform probability measure on `[0,2^-n]` in coordinate `n`. There is no atom at zero. For every fixed coordinate,

`y Im M_n(iy) -> 0`.

Dominated convergence gives a strong operator limit of zero, but the operator norm stays near one because increasingly narrow coordinates remain unresolved. Norm atom recovery requires uniform non-atomic tightness.

## Threshold is not atom

The density `rho(t)=1/(2 sqrt(t))` on `(0,1)` has unit mass and produces

`Im M(iy) ~ [pi/(2 sqrt(2))] y^-1/2`.

It diverges, while `y Im M(iy)->0`. A divergent boundary value is therefore not by itself evidence for an eigenvalue or atomic pole.

## Singular-continuous loss

The Cantor probability measure has no absolutely continuous density and no atoms, but total mass one. Its imaginary boundary density vanishes Lebesgue-a.e. Thus a.e. density plus the atom ledger still loses the entire singular-continuous sector.

The boundary record must keep `Sigma_ac`, the atomic residues and `Sigma_sc` as distinct layers.
