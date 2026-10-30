# The Klein selector closes the first nonlinear fluid triad

**Date:** 30 October 2026

**Status:** exact quadratic closure witness; finite-amplitude time evolution and curved-throat geometry remain open

**Parent:** [Klein double-cover Stokes modes](admissibility_166_klein_double_cover_stokes_mode_closure.md)

**Evidence:** [nonlinear triad ledger](../../../evidence/data/admissibility-klein-nonlinear-triad-v1.json); [independent verifier](../../../verification/admissibility/verify_klein_nonlinear_triad.mjs)

## Result

The first nonlinear test closes. On the oriented double cover, the
incompressible Euler or Navier--Stokes vorticity equation is

\[
\partial_t\omega+J(\psi,\omega)=\nu\Delta\omega+g,
\qquad
J(f,g)=\partial_xf\,\partial_yg-\partial_yf\,\partial_xg.
\]

Both the streamfunction and scalar vorticity representation are
anti-invariant under the orientation-reversing deck map \(I\). The Poisson
bracket changes sign under orientation reversal. Consequently

\[
\psi\circ I=-\psi,\quad \omega\circ I=-\omega
\quad\Longrightarrow\quad
J(\psi,\omega)\circ I=-J(\psi,\omega).
\]

The nonlinearity therefore preserves the quotient sector. Topology is not
only a linear spectral filter; it constrains the allowed interaction graph.

## Minimal interacting pair

Use the two modes already certified:

\[
A=\cos x\cos y,\qquad B=\sin 2x\sin y,
\]

with Laplacian eigenvalues \(\lambda_A=2\) and \(\lambda_B=5\). A single
Laplacian eigenmode has \(J(\psi,\Delta\psi)=0\), so two distinct eigenvalues
are required for a nonzero interaction. Their cross-advection is

\[
J(A,B)=
\frac14\cos x+\frac34\cos 3x
-\frac34\cos x\cos 2y
-\frac14\cos 3x\cos 2y.
\]

For \(\psi=aA+bB\) and \(\omega=-\Delta\psi\), the cross term is

\[
J(\psi,\omega)
=ab(\lambda_B-\lambda_A)J(A,B)
=3ab\,J(A,B).
\]

Every generated mode has odd axial harmonic and even transverse parity:

\[
(k,m)=(1,0),(3,0),(1,2),(3,2).
\]

Each therefore satisfies the anti-invariant Klein selection law

\[
(-1)^k r_y=-1.
\]

No forbidden sector is produced.

## Why the relation itself is the detector

Neither input alone reveals the interaction:

- \(A\) self-advects trivially because vorticity is proportional to \(A\);
- \(B\) self-advects trivially for the same reason;
- the joined pair produces four output harmonics because their eigenvalues
  differ.

This is a literal three-relation detector:

\[
\boxed{\text{mode }A+\text{mode }B+\text{antisymmetric bracket}
\longrightarrow\text{new admissible spectrum}.}
\]

The bracket is not an added carrier. It is the relation that detects the
co-presence of the two carriers and writes it into new modes.

## Conservation check

On the periodic double cover, integration by parts gives

\[
\int\psi\,J(\psi,\omega)\,dA=0,\qquad
\int\omega\,J(\psi,\omega)\,dA=0.
\]

Thus the inviscid quadratic term redistributes energy and enstrophy without
creating either. The verifier evaluates these identities by uniform
quadrature while independently checking the closed-form bracket and deck
parity. Viscosity remains the declared sink; forcing remains the declared
source.

## Rotation control

For an orientation-preserving half-translation
\(R(x,y)=(x+\pi,y)\), an invariant streamfunction requires even axial
harmonics. Mode \(A\), with \(k=1\), is absent from that control sector. The
Klein quotient therefore admits an interaction channel that this particular
rotation quotient excludes.

This is a spectral difference between two return laws, not evidence that
nonorientability creates energy. A fair numerical comparison must match
forcing power and resolved degrees of freedom rather than inject the same
mode into a control where it is inadmissible.

## Bounds

The witness is exact but deliberately small. It does not yet include:

- finite-amplitude integration over many interacting modes;
- alias control and convergence under spectral refinement;
- physical walls, throat taper, curvature or torsion;
- three-dimensional vortex stretching;
- instability or turbulence claims.

It does establish that the quotient is dynamically closed through the first
quadratic interaction and identifies the first four daughter modes a solver
must recover.

## Next gate

Build a de-aliased pseudo-spectral integrator on the \(2\pi\)-periodic double
cover, project onto the anti-invariant sector after every nonlinear update,
and compare:

1. energy and enstrophy budgets;
2. daughter-mode amplitudes;
3. signed one-lap detector response;
4. reflection quotient versus an equal-dimension rotation-sector control;
5. convergence under grid and time-step refinement.

Only after that flat-domain comparison should curvature, a throat or
helical-pipe metric be introduced.

The finite-amplitude half of this gate is now closed by the
[Fourier--Galerkin evolution](admissibility_168_finite_amplitude_klein_flow_closes_the_flat_domain_gate.md).
The equal-dimension rotation control remains open.

## Verdict

The Klein selector survives the first nonlinear collision. The useful claim
is not that Navier--Stokes secretly contains a Klein bottle; it is that a
nonorientable return law defines a closed, measurably different subalgebra of
the fluid's Fourier interaction grammar.
