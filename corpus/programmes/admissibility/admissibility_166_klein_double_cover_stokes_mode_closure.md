# Klein double-cover Stokes modes close the first dynamics gate

**Date:** 30 October 2026

**Status:** exact spectral Stokes witness closed; nonlinear geometry and laboratory realization remain open

**Parent:** [Klein-twisted throat Navier--Stokes gate](admissibility_165_klein_twisted_throat_navier_stokes_gate.md)

**Evidence:** [double-cover Stokes ledger](../../../evidence/data/admissibility-klein-double-cover-stokes-v1.json); [independent verifier](../../../verification/admissibility/verify_klein_double_cover_stokes.mjs)

**Primary sources:** [Khesin, Langøen and Markina, *Curvatures of measure-preserving diffeomorphism groups of non-orientable surfaces*](https://doi.org/10.1088/1361-6544/adc968); [Miura, *Navier--Stokes equations in a curved thin domain*](https://arxiv.org/abs/1811.09816)

## Result

The first requested computation can be closed without a CFD package. Work on
the flat torus

\[
\widetilde K=\mathbb R^2/(2\pi\mathbb Z)^2
\]

with the fixed-point-free orientation-reversing deck map

\[
I(x,y)=(x+\pi,-y).
\]

The quotient \(\widetilde K/\{1,I\}\) is a Klein bottle. A velocity field on
the quotient is represented by a deck-equivariant field on the cover:

\[
u(Iz)=DI_z\,u(z),\qquad
DI=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

This is already stronger than a visual resemblance. It is an exact return
law for a typed carrier.

## The streamfunction requires the opposite parity

On the oriented double cover write

\[
u=(\partial_y\psi,-\partial_x\psi).
\]

Because \(I\) reverses the area form, deck-equivariant velocity requires an
anti-invariant streamfunction:

\[
\boxed{\psi\circ I=-\psi.}
\]

This is the correction that an untyped scalar discussion misses. Pressure is
an ordinary scalar and obeys \(p\circ I=p\). The streamfunction is the
orientation-sensitive potential used to build the divergence-free carrier
and obeys the opposite parity. Khesin, Langøen and Markina derive precisely
this anti-invariant streamfunction restriction for Euler flow on
nonorientable surfaces.

Two admissible modes are

\[
\psi_A(x,y)=\cos x\cos y,\qquad
\psi_B(x,y)=\sin 2x\sin y.
\]

For both,

\[
\psi_j(Iz)=-\psi_j(z),\qquad
\nabla\cdot u_j=0,\qquad
u_j(Iz)=DI\,u_j(z).
\]

They expose the two ways the sign can close:

- an even transverse factor requires an odd axial harmonic;
- an odd transverse factor requires an even axial harmonic.

The quotient therefore does not merely delete half the torus modes. It
correlates axial parity with transverse reflection parity.

## Exact Stokes evolution

For a divergence-free Fourier mode with

\[
-\Delta u_j=\lambda_j u_j,\qquad
\lambda_j=k_j^2+m_j^2,
\]

the projected, forced Stokes equation is

\[
\dot a_j=-\nu\lambda_j a_j+F_j.
\]

Its exact solution is

\[
a_j(t)=a_j(0)e^{-\nu\lambda_jt}
+\frac{F_j}{\nu\lambda_j}
\left(1-e^{-\nu\lambda_jt}\right).
\]

The witnesses above have

\[
\lambda_A=2,\qquad \lambda_B=5.
\]

The verifier checks their divergence, deck equivariance, Laplacian
eigenvalues, one-lap/two-lap component return and exact viscous decay. No time
stepping error or fitted parameter is present.

## What the detector sees

For any admissible velocity,

\[
u_x(x+\pi,-y)=u_x(x,y),\qquad
u_y(x+\pi,-y)=-u_y(x,y).
\]

Thus a transverse signed detector is odd after one quotient traversal and
returns after two. A scalar power detector erases this record:

\[
|u_y(x+\pi,-y)|^2=|u_y(x,y)|^2.
\]

This repeats the corpus's orientation lesson in a genuinely dynamical
carrier. The first-order signed response retains the face; its square does
not. It also explains why a pressure-only experiment can miss the topology:
pressure is deck-even and may contain no signed return record.

## Rotation is a necessary control, not a synonym

Replace \(I\) by the orientation-preserving half-period translation

\[
R(x,y)=(x+\pi,y).
\]

An ordinary periodic streamfunction on that quotient satisfies
\(\psi\circ R=\psi\), allowing even axial harmonics independently of
transverse parity. The reflection quotient instead demands

\[
(-1)^k r_y=-1,
\]

where \(r_y=+1\) for a transverse cosine and \(-1\) for a transverse sine.
This correlation is the spectral discriminator between global reflection and
local twist or rotational closure.

## What has and has not moved

Closed:

- the quotient and orientable double cover;
- the correct scalar, streamfunction and vector transformation laws;
- a nonempty divergence-free mode basis;
- exact linear viscous dynamics;
- a signed one-lap/two-lap detector;
- an orientation-preserving control with a different mode-selection law.

Still open:

- taper, throat curvature and non-Euclidean metric factors;
- no-slip walls rather than a closed surface;
- nonlinear mode coupling \(u\cdot\nabla u\);
- a forcing and detector layout with strong odd-sector overlap;
- fabrication or a recirculating-network emulation.

This calculation does not approach three-dimensional Navier--Stokes
regularity. It solves a finite collection of exact linear Stokes modes on a
flat compact double cover.

## Next gate

The next economical computation is a nonlinear pseudo-spectral comparison on
the same cover:

1. project every update back onto deck-equivariant, divergence-free modes;
2. excite one admissible even-transverse/odd-axial mode and one admissible
   odd-transverse/even-axial mode;
3. enumerate which quadratic triads survive the quotient parity law;
4. compare their energy transfer with the rotation-only control;
5. retain signed velocity and vorticity records as well as total energy.

That would determine whether the topology only filters the linear spectrum or
also leaves a distinctive nonlinear interaction grammar.

The first part of that gate is now closed by the
[exact nonlinear triad witness](admissibility_167_klein_selector_closes_the_first_nonlinear_triad.md):
the quadratic bracket of two certified modes generates four daughter modes,
all inside the Klein-selected sector.

## Verdict

The first dynamics gate closes. The Klein relation is not an extra force in
Navier--Stokes; it is an admissibility condition on the carrier and therefore
on the spectrum through which dynamics can run. In corpus language, topology
acts as a selector before viscosity or nonlinearity evolves the selected
state.
