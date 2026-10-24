# Frontier Wave 7.63: Gram-Disk Dynamics and Causal Globalization

**Date:** 25 October 2026  
**Status:** exact reduced dynamics and causal inheritance result; microscopic coefficients remain open  
**Ledger:** [dynamics and globalization](gram_disk_dynamics_and_causal_globalization_v1.json)  
**Certificate:** [dynamics verifier](../../../../verification/verify/verify_gram_disk_dynamics_and_causal_globalization.mjs)

## Result

The two competing Gram objectives admit a minimal interpolating dynamics. It
turns the previously qualitative compromise into a measurable one-parameter
family while retaining the exact causal boundary.

## 1. Combined selector

On a fixed Gram disk, take

\[
V(s)=\alpha|s-c|^2+\beta|s|^2,
\qquad \alpha,\beta\ge0.
\]

The unique unconstrained minimum is

\[
\boxed{
s_*=\lambda c,
\qquad
\lambda=\frac{\alpha}{\alpha+\beta}.
}
\]

The endpoints are:

\[
\lambda=1:\text{ full-environment volume/causal-centre selector},
\]

\[
\lambda=0:\text{ isotropic-channel/dephasing selector}.
\]

If both (0) and (c) lie in the disk, convexity guarantees that every
intermediate (s_*) is admissible.

At the rational checkpoint, equal weights give

\[
s_*=\frac3{26},
\qquad
u=\frac{|s_*-c|^2}{R^2}=\frac{25}{1024}.
\]

Thus an interior experimental point can be translated directly into a ratio
of selector weights within this reduced model.

## 2. Relaxation, lag and loop area

A minimal first-order dynamics is

\[
\tau\dot s+s=\lambda c(t).
\]

For a sinusoidal drive of angular frequency \(\Omega\), the gain and lag are

\[
\frac{\lambda}{\sqrt{1+(\Omega\tau)^2}},
\qquad
\phi=\arctan(\Omega\tau).
\]

For a real drive (c(t)=C\cos\Omega t), the loop in the ((c,s)) plane has
area

\[
\boxed{
\mathcal A_{\rm lag}
=\frac{\pi\lambda C^2\Omega\tau}
{1+(\Omega\tau)^2}.}
\]

This is frequency-dependent lag. It vanishes in both the adiabatic and
infinitely fast limits and is largest near \(\Omega\tau=1\). It is not
rate-independent hysteresis: remanence or multistability requires a nonconvex
potential or additional memory state.

## 3. Fixed versus moving admissibility

For a fixed disk, relaxation from an admissible initial point toward an
admissible target remains inside the disk because the disk is convex.

If (c(t)) and (R(t)) move, ordinary delayed relaxation need not remain in
the instantaneous disk. The correct dynamics must then use either:

- projection onto the moving disk's tangent cone;
- a barrier diverging at \(|s-c|=R\); or
- a larger state-space realization whose complete positivity guarantees the
  Gram inequality automatically.

This is where admissibility changes from a static inequality into a dynamical
law.

## 4. Causal inheritance theorem

In the silver response family the centre continuation is

\[
c_\ell(z)=f_t(-z)f_n(z).
\]

For generic \(\ell\), it has an upper-half-plane pole. Any constant nonzero
mixture

\[
s_\ell(z)=\lambda c_\ell(z),
\qquad \lambda\ne0,
\]

inherits that pole: scalar multiplication changes the residue but cannot
cancel it. Therefore every nonzero member of this interpolation globalizes as
the same-chart Schur function only at

\[
\boxed{\ell=\operatorname{arsinh}(1).}
\]

The exceptional endpoint \(\lambda=0\) is identically zero and hence
trivially analytic and contractive. Physically it is complete coherence
removal, not a nontrivial repair of the pole-zero seam.

This theorem is scoped to constant scalar mixtures. General frequency-dependent
analytic sections of the moving Gram disks form a separate constrained
interpolation problem.

## 5. Experimental decisions

The discriminator of Wave 7.56 now supports four levels:

1. test disk membership;
2. locate the static selector coordinate (u);
3. sweep drive frequency to estimate \(\tau\) and distinguish lag from static
   displacement;
4. fit the complete complex frequency response to test one-chart causality
   and the silver seam.

Loop reversal changes the orientation of the lag loop, while a static
anisotropy remains even. A nonzero zero-frequency loop or remanence would
falsify the single-convex-well dynamics.

## 6. What mathematics can no longer supply alone

The reduced equations isolate the remaining physical inputs:

- the coefficients \(\alpha,\beta,\tau\);
- the signature-((2,3)) metric (Q);
- the (Q)-adjoint relation between forward and reverse channels;
- the endpoint label/basis/phase identifications;
- the physical ports and their noise model.

These are no longer unspecified algebraic gaps. They are provenance and
dynamics data to be derived from a microscopic model or measured.

## Boundary

The combined potential is the minimal convex interpolation of two established
objectives. It is not claimed as a fundamental action. More complicated
nonconvex, frequency-dependent or state-dependent objectives can generate
additional fixed points and true hysteresis.
