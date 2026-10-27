# A Lagrangian boundary selector turns domain motion into spectral flow

**Date:** 27 October 2026

**Status:** established operator-theoretic bridge with an exact extension model; curl-specific continuum implementation remains open

**Parents:** [graded Beltrami investigation spike](admissibility_149_graded_beltrami_impedance_defect_investigation_spike.md), [phase-space Lagrangian Grassmannian](../../claims/0000-0099/52_phase_space_lagrangian_grassmannian_branch.md), [boundary and defect selector](../../claims/0000-0099/53_boundary_defect_selector_branch.md), [metaplectic and Maslov correction](../../claims/0000-0099/59_metaplectic_and_maslov_correction_branch.md)

**Evidence:** [boundary-selector ledger](../../../evidence/data/admissibility-lagrangian-boundary-maslov-flow-v1.json); [independent verifier](../../../verification/admissibility/verify_lagrangian_boundary_maslov_flow.mjs)

**Primary sources:** [Hiptmair, Kotiuga and Tordeux, *Self-adjoint curl operators*](https://arxiv.org/abs/0809.0826); [Booss-Bavnbek and Zhu, *General Spectral Flow Formula for Fixed Maximal Domain*](https://arxiv.org/abs/math/0504125); [Epstein, Greengard and O'Neil, *Debye Sources, Beltrami Fields, and a Complex Structure on Maxwell Fields*](https://arxiv.org/abs/1308.5425)

## Result

The boundary selector anticipated separately by the phase-space, defect and
Maslov branches has an established realization for curl. Green's identity is

\[
\langle \operatorname{curl}u,v\rangle
-\langle u,\operatorname{curl}v\rangle
=\int_{\partial D}i^*u\wedge i^*v.
\]

The right-hand side is a symplectic boundary pairing. A domain on which it
vanishes is isotropic; a maximal such domain is selected by a complete
Lagrangian subspace of the trace space. The symplectic
Glazman--Krein--Naimark theorem makes this exact:

\[
\boxed{
\text{complete boundary Lagrangian}
\longleftrightarrow
\text{self-adjoint extension of curl}.
}
\]

The selector therefore does not merely choose a state inside a fixed
Hamiltonian. It helps define which self-adjoint operator—and consequently
which spectrum—exists.

## Topology supplies a finite carrier inside the trace space

For a boundary surface of genus (g), the harmonic one-form sector satisfies

\[
\dim \mathcal H^1(\partial D)=2g.
\]

Its wedge pairing is symplectic, and the topological part of a complete
Lagrangian has dimension (g). Closed-trace and co-closed-trace extensions
add exact or coexact infinite-dimensional pieces, but their topological
choice is a Lagrangian half of this finite carrier.

For a simply connected boundary, (g=0), this harmonic choice disappears.
For a solid torus, (partial D=T^2), it is a two-dimensional symplectic
carrier and the boundary condition chooses one line: a declared combination
of meridional and longitudinal circulation data. This is the first literal
physical instance in this lane of

\[
\text{one carrier} + \text{a selected face} \to \text{an operator domain}.
\]

The two lines are not automatically “source” and “target,” nor are they two
particles. They are boundary trace relations.

## The smallest exact extension model

Consider

\[
A_\theta=-i\frac{d}{dx}
\]

on (L^2([0,1])), with domain

\[
\operatorname{Dom}A_\theta=
\{u\in H^1([0,1]):u(1)=e^{i\theta}u(0)\}.
\]

Integration by parts leaves the boundary form

\[
\Omega((u_0,u_1),(v_0,v_1))
=i(u_0\overline{v_0}-u_1\overline{v_1}).
\]

The trace graph

\[
L_\theta=\operatorname{span}_{\mathbb C}\{(1,e^{i\theta})\}
\]

is complete Lagrangian, so every (A_\theta) is self-adjoint. Its spectrum is

\[
\lambda_n(\theta)=2\pi n+\theta,
\qquad n\in\mathbb Z.
\]

As (	heta) moves from (-\pi/2) to (3\pi/2), exactly one eigenvalue
crosses zero upward. The spectral flow is (+1). The boundary graph crosses
the reference graph (L_0) once with positive orientation, giving the same
Maslov crossing count in this model.

This is not offered as a discretization of three-dimensional curl. It is the
minimal exact certificate for the extension-theory grammar:

\[
\boxed{
\text{moving Lagrangian domain}
\to \text{oriented zero crossing}
\to \text{integer detector record}.
}
\]

## Three quantities that must remain separate

The corpus now has three related but inequivalent path records:

| record | object moved | output |
|---|---|---|
| Wilczek--Zee holonomy | a gapped degenerate eigenspace | a unitary matrix such as (pm J) |
| Maslov index | a Lagrangian path relative to a reference cycle | an integer intersection count |
| spectral flow | a self-adjoint Fredholm family | signed eigenvalue crossings through a reference level |

The general spectral-flow theorem relates the latter two when the operator
family, maximal domain, Cauchy-data spaces, ellipticity and continuity
hypotheses are fixed. It does not identify either with the first. A
quarter-turn boundary phase (e^{i\pi/2}), a quarter-turn eigenspace holonomy
and Maslov index one can coexist, but none follows from the shared number
(pi/2).

## Relation to the (Sp(4,\mathbb R)) Jordan chart

The earlier corpus result identifies
(operatorname{Sym}_2(\mathbb R)) with the big graph chart of
(operatorname{Lag}(2,4)). The curl trace theorem supplies the missing
physical type: in a suitable two-channel boundary truncation, a symmetric
matrix can be a response relation whose graph defines a self-adjoint domain.

This is a contact, not yet an identification. The full curl trace space is
infinite-dimensional, while its harmonic topological sector depends on
boundary genus. Obtaining exactly (operatorname{Lag}(2,4)) requires a
derived four-real-dimensional boundary carrier—such as a genus-two harmonic
sector or a controlled two-port reduction—and proof that the truncation
preserves the boundary pairing, domain and spectrum of interest.

## The next no-refit experiment

A boundary-controlled resonator or circuit should expose both the domain and
its spectrum:

1. identify two conjugate boundary trace channels and calibrate their
   symplectic pairing;
2. implement a closed or open path of passive boundary relations (L(t));
3. measure complex impedance throughout the path;
4. count signed pole crossings through a preregistered reference frequency;
5. independently calculate the Maslov crossings of (L(t));
6. require equality without relabelling poles after the measurement;
7. separately perform coherent mode tomography if a Wilczek--Zee holonomy is
   also claimed.

The equality is useful even under ordinary physics: it certifies that the
implemented boundary control really moves the intended self-adjoint domain.
A failure first indicts boundary calibration, hidden loss, pole assignment or
the finite reduction—not topology or new physics.

## Implications for the external TUFT proposal

This result strengthens one part of the proposal and tightens another.
Beltrami spectra are legitimate only after a self-adjoint domain is declared;
on a manifold with boundary, topology can leave a family of inequivalent
choices. Therefore a spectral determinant cannot be an intrinsic mass formula
until its boundary/domain selection and scale are fixed. Conversely, a
boundary path provides a lawful source of spectral motion and an integer
record that can be tested without interpreting an eigenvalue as a particle
mass.

## Verdict

The boundary is not merely where the carrier stops. It can be the sourced
selector that makes the generator self-adjoint. Motion of that selector can
be recorded as spectral flow, and the Maslov index supplies its boundary-side
count under declared hypotheses. This closes the operator-theoretic bridge
among B07, B08 and the Beltrami programme while leaving the physical
(Sp(4)) truncation and joint impedance experiment open.
