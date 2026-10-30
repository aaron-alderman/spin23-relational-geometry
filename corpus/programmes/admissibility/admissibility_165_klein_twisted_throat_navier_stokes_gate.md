# Klein-twisted throat Navier--Stokes gate

**Date:** 30 October 2026

**Status:** exact quotient and mode-parity witness; curved-flow contact established; CFD and physical realization remain open

**Parents:** [graded Beltrami, impedance and defect spike](admissibility_149_graded_beltrami_impedance_defect_investigation_spike.md), [curl eta orientation record](admissibility_151_curl_eta_asymmetry_is_an_orientation_record_not_a_mass_formula.md), [exceptional-loop topology](admissibility_65_exceptional_loop_topology_and_dynamic_selection.md), [internal-stress locomotion](admissibility_163_internal_stress_medium_locomotion_and_momentum_closure.md)

**Evidence:** [Klein parity ledger](../../../evidence/data/admissibility-klein-twisted-flow-parity-v1.json); [independent verifier](../../../verification/admissibility/verify_klein_twisted_flow_parity.mjs)

**Primary literature:** [Kao, *Torsion effect on fully developed flow in a helical pipe*](https://doi.org/10.1017/S002211208700291X); [Miura, *Navier--Stokes equations in a curved thin domain*](https://arxiv.org/abs/1811.09816); [Khesin, Langøen and Markina, *Curvatures of measure-preserving diffeomorphism groups of non-orientable surfaces*](https://doi.org/10.1088/1361-6544/adc968)

## Result

The twisted, tapering heart/throat geometry has a legitimate fluid-dynamical
branch, but three objects must remain separate:

1. an open curved or helical duct in ordinary three-space;
2. a closed orientable tube whose cross-section returns by a rotation; and
3. a nonorientable quotient whose cross-section returns by a reflection.

Only the third is Klein-bottle-like. The quotient can be written

\[
K=\bigl(S^1_\phi\times[0,L]_s\bigr)/
\bigl((\phi,L)\sim(-\phi,0)\bigr).
\]

A smooth physical vessel in Euclidean three-space does not acquire this
topology merely by looking twisted. The quotient must be implemented as a
boundary identification, a network of matched ports, a synthetic coordinate,
or a calculation on the orientable double cover. The double cover is a torus,
and its fixed-point-free deck map is

\[
I(s,\phi)=(s+L,-\phi),\qquad I^2(s,\phi)=(s+2L,\phi).
\]

This makes the corpus intuition precise: one traversal can expose a mirror
face, while two traversals restore the original orientation.

## The exact parity witness

Decompose a scalar cross-sectional record into mirror-even and mirror-odd
parts,

\[
q_+(\phi)=\cos(m\phi),\qquad q_-(\phi)=\sin(m\phi).
\]

The quotient condition \(q(s+L,\phi)=q(s,-\phi)\) gives

\[
q_+(s+L,\phi)=q_+(s,\phi),\qquad
q_-(s+L,\phi)=-q_-(s,\phi).
\]

Thus the even sector has integer axial wavenumbers and the odd sector has
half-integer axial wavenumbers:

\[
k_n^{(+)}=\frac{2\pi n}{L},\qquad
k_n^{(-)}=\frac{(2n+1)\pi}{L}.
\]

The odd record reverses after one circuit and returns after two. This is the
minimal exact detector signature. A helical rotation can split or mix modes,
but cannot reproduce this parity law unless the full return map contains the
reflection.

For velocity, the sewing condition is tensorial rather than a scalar sign:

\[
u(s+L,\phi)=DI\,u(s,-\phi),\qquad
p(s+L,\phi)=p(s,-\phi).
\]

The reflected component changes sign; tangent components transform by the
differential of the deck map. Treating every velocity component as an odd
scalar would be a category error.

## Where Navier--Stokes enters

On a Riemannian carrier the incompressible equations take the schematic form

\[
\partial_tu+\nabla_u u=-\operatorname{grad}p+\nu\mathcal L u+f,
\qquad \operatorname{div}u=0,
\]

where the viscous operator \(\mathcal L\) must be declared. Depending on the
vector/one-form convention it is represented by a Hodge or deformation
Laplacian with the associated curvature term. The metric, connection,
measure density and boundary domain are therefore part of the dynamics, not
an illustration placed around an otherwise unchanged PDE.

For an ordinary twisted duct, adapted coordinates introduce curvature,
torsion, taper and cross-sectional-shape terms into the metric and connection.
Established helical-pipe calculations show that torsion can strongly distort
the secondary vortex pair when torsion and curvature have comparable scale.
Miura's thin-domain limit separately proves that bulk Navier--Stokes in a
curved thin region can converge to weighted surface equations whose viscous
term contains Gaussian curvature. Neither result proves the proposed device,
but both establish the geometry-to-flow arrows needed by the programme.

The minimal control coordinates are

\[
Re=\frac{Ua}{\nu},\qquad
De=Re\sqrt{\frac{a}{R_c}},\qquad
\tau a,\qquad
\alpha=a\sqrt{\frac{\omega}{\nu}},\qquad
\frac{da}{ds},\qquad a\frac{d\theta}{ds}.
\]

They respectively track inertia, curvature-driven secondary flow, torsion,
pulsatile penetration, taper and imposed twist. The convention for the Dean
number and length scale must be frozen before comparison.

## Orientation changes the vorticity ledger

On a nonorientable carrier, velocity as a one-form \(u^\flat\) and vorticity
as the two-form \(du^\flat\) are global. Converting that two-form into the
usual vorticity pseudovector uses the Hodge star and therefore an orientation.
On the double cover, the pseudovector representation changes under the
orientation-reversing deck map.

Consequently a signed helicity integral cannot be imported unchanged as an
ordinary global scalar on the quotient. It needs an oriented double-cover
ledger or twisted-density formulation. This is a direct contact with the curl
eta branch: squaring or taking power can erase the face reversal that a signed
first-order record retains. It is not evidence that fluid vorticity and
Maxwell helicity are the same carrier.

Khesin, Langøen and Markina provide the closest exact mathematical precedent.
They formulate incompressible Euler dynamics on nonorientable surfaces using
a density, lift the dynamics to the orientable cover and derive the
deck-symmetry restrictions on divergence-free modes. This establishes the
nonorientable fluid language. Adding viscosity and a laboratory boundary
remains a separate step.

## Four-case CFD discriminator

Use one frozen centreline, throat profile, cross-sectional area and forcing,
then compare:

| case | return rule | purpose |
|---|---|---|
| A | open, untwisted | baseline pressure and wall-shear record |
| B | open, continuously twisted | isolate local curvature/torsion coupling |
| C | closed by a rotation | orientable mapping-torus control |
| D | closed by a reflection | Klein quotient tested on its double cover |

Begin with Stokes flow, then sweep steady and pulsatile Navier--Stokes. Record
pressure drop, wall shear, secondary circulation, modal transfer, residence
time and complex hydraulic impedance. The decisive topology channel is not a
generic extra vortex. It is a preregistered mirror-odd response that flips
after one quotient traversal and returns after two while the matched
rotation-only control does not.

Useful negative controls are:

- reverse the local helical handedness without changing the quotient;
- remove the throat while retaining the reflection;
- retain the throat and replace reflection by rotation;
- excite only mirror-even modes;
- exchange scalar pressure readout for vector or multiport velocity readout.

The scalar pressure record may be blind to the odd sector. A detector must
have nonzero overlap with the reflected velocity or wall-stress component.

## Corpus grammar

- **Carrier:** incompressible velocity/flux on the double-cover domain.
- **Selector:** metric, throat profile, constitutive viscosity, forcing and
  rotation or reflection sewing rule.
- **Dual face:** the two orientation sheets exchanged by \(I\).
- **Relation:** covariant transport plus the tensorial return condition.
- **Detector:** one-lap/two-lap parity, mode-resolved wall stress or complex
  hydraulic impedance.

The triality relation is operational: pressure alone can miss an odd mode,
geometry alone does not identify its excitation, and a mode amplitude without
the return rule does not distinguish torsion from topology. The joined record
does.

## Bounds and non-claims

This gate does not:

- turn the displayed heart/throat object into a Klein bottle by resemblance;
- solve or advance the three-dimensional Navier--Stokes regularity problem;
- imply topology change during smooth flow in a fixed domain;
- identify fluid vorticity with electromagnetic, gravitational or biological
  carriers;
- make an immersed self-intersecting Klein-bottle picture into a realizable
  sealed vessel.

Topology change of a free interface would require a separate pinch-off,
reconnection or singular-limit analysis. The current gate concerns flow on a
fixed quotient or its double cover.

## Verdict

The branch is worth admitting because it produces a sharp distinction and a
cheap falsifier. Local twist belongs to conventional curved-duct dynamics;
global reflection belongs to a nonorientable return law. Their effects can be
separated with the same geometry and forcing. The next work is not more
visual analogy: it is a two-dimensional double-cover Stokes computation that
verifies the even/odd spectrum and detector overlap before any full
three-dimensional CFD or fabrication.

That next gate is now closed by the
[Klein double-cover Stokes witness](admissibility_166_klein_double_cover_stokes_mode_closure.md).
It adds the necessary type correction: an ordinary scalar is deck-even, but
the streamfunction generating a deck-equivariant velocity on an
orientation-reversing quotient is deck-odd.
