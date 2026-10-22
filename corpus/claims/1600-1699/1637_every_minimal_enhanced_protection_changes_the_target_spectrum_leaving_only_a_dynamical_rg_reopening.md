# Every Minimal Enhanced Protection Changes the Target Spectrum, Leaving Only a Dynamical RG Reopening

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** representation and Ward-compatibility exhaustion of the minimal enhanced-symmetry exits from claim 1636

**Depends on:** [the copy-BRST counterterm no-go](1636_the_local_brst_counterterm_cohomology_defeats_every_commuting_copy_symmetry_completion.md)

**Evidence:** [enhanced-protection ledger](../../../evidence/data/spin23-enhanced-protection-exhaustion-v1.json) and [verifier](../../../verification/verify/verify_spin23_enhanced_protection_exhaustion.mjs)

## Result

The obvious enlarged symmetries do not protect the critical (2+1) theory
while leaving its spectrum unchanged.

- A bosonic internal symmetry commuting with local Lorentz transformations
  cannot relate inequivalent Lorentz spin-parity curvature sectors. Each real
  quadratic norm is a singlet, so zeroing its coefficient is not protected.
- Exact (N=1) AdS supersymmetry necessarily adds a gravitino to the graviton
  and superpartners to a propagating (0^-) scalar. The smallest unbroken
  completion has at least eight on-shell bosonic-plus-fermionic states rather
  than the three bosonic states of the target.
- Weyl, pseudoscalar-shift and topological proposals either conflict with the
  fixed AdS/Planck/mass scales or require a new gauge complex that changes the
  physical cohomology.

The only finite-local route not excluded by symmetry and representation theory
is therefore dynamical: an interacting RG fixed point or invariant surface at
which every normal beta component vanishes. The known pseudoscalar loop gives
nonzero normal components near the sparse weakly coupled surface, so such a
solution would require additional fields/interactions and explicit
cancellations. No complete beta system for this constrained critical action is
available. This is the next significant point of exhaustion.

## Commuting bosonic symmetries

Decompose torsion and curvature into real irreducible Lorentz spin-parity
modules. A new compact internal group (K) commuting with local Lorentz can
act only on multiplicity spaces of equivalent Lorentz irreducibles. In the
single-copy critical PGT basis, the relevant irreducible blocks occur as named
sectors rather than as a freely rotatable common multiplet.

For any orthogonal action on a real block (X), its norm (X^TX) is invariant.
For a one-copy real irreducible, the commuting orthogonal action is at most a
sign. Therefore all parity-even quadratic norms remain allowed. A commuting
internal symmetry can relate coefficients only after adding duplicate
connection irreps, which itself enlarges the field content and demands a new
pole analysis.

A noncommuting bosonic symmetry would have to enlarge the spacetime gauge
algebra or realize a duality mixing curvature sectors. That is no longer a
copy completion of Spin(2,3). Known free gravitational dualities do not by
themselves furnish a local nonlinear action or a Ward identity selecting the
critical PGT ray.

## Minimal AdS supersymmetry count

The natural supersymmetric extension of the AdS algebra begins with
(OSp(1|4)). Unbroken four-dimensional (N=1) supersymmetry pairs the
massless graviton's two helicities with two gravitino helicities. A propagating
massive pseudoscalar cannot remain an isolated one-state multiplet. In the
minimal chiral realization it is accompanied by a second real scalar and a
Majorana fermion with two on-shell states.

The smallest state count is therefore

| multiplet | bosonic states | fermionic states |
|---|---:|---:|
| AdS gravity | 2 | 2 |
| chiral multiplet containing (0^-) | 2 | 2 |
| total | 4 | 4 |

Relative to the target, exact supersymmetry adds a gravitino, one real scalar
and one Majorana fermion: five additional on-shell states. Other assignments,
including massive vector or higher-derivative supergravity multiplets, are no
smaller for this purpose.

If supersymmetry is broken above the EFT scale, integrating out the partners
generically leaves threshold counterterms. The unbroken Ward identities then
do not protect the low-energy seven PGT relations. Supersymmetry remains a
possible enlarged theory, but it cannot be advertised as protection of the
unchanged (2+1) spectrum.

## Scale and topological proposals

Exact Weyl symmetry is incompatible with simultaneously fixing

\[
 V^2=-\ell^2,\qquad M_{\rm Pl}^2>0,\qquad \Lambda=-3/\ell^2.
\]

These scales could arise through spontaneous conformal breaking, but that
adds a dilaton or a gauge field and reopens the spectrum and anomaly audit.

An exact shift (arphi\mapsto\varphi+c) for the torsion pseudoscalar forbids
its mass, while the target requires (m_{0^-}^2>0). It also does not act on
the pure metric Weyl invariant.

Making unwanted fields into BRST doublets in a topological extension can
remove them from cohomology only after new fields, ghosts and first-class
constraints are specified. The existing PGT critical relations produce a
second-class constraint pattern; relabelling it topological does not create a
nilpotent gauge differential. Any such construction is a new theory and must
show that the massless graviton and massive (0^-) observables remain
non-exact.

## The remaining RG condition

Let (C) be the eight-row normal matrix of claim 1636 and
(eta(g)) the beta vector of the enlarged theory. Radiative invariance of
the target surface requires

\[
 C\,\beta(g)=0
\]

at every point claimed to lie on an invariant surface, or at least
(eta(g_*)=0) at a fixed point. This is stronger than power-counting
renormalizability and stronger than BRST invariance.

At the weakly coupled target point, the canonical pseudoscalar determinant
already contributes

\[
 (C\beta)_{C^2}\supset{1\over120(4\pi)^2},\qquad
 (C\beta)_{R^2}\supset{1\over72(4\pi)^2}.
\]

These terms might in principle be cancelled by other fields or interactions;
the current work does not assume that they cannot. But cancellation is a set
of dynamical equations, not a consequence of the known symmetries. It must be
verified together with fixed-point stability, unitarity, the AdS spectrum and
the nonlinear constraint rank.

## Final exhaustion boundary

The programme has now passed through all finite minimal protection choices:

1. fixed ray: exact spectrum, underived constraint;
2. global copy rotation: extra Goldstone;
3. gauged copy rotation: extra orientation datum and allowed vector kinetic
   counterterm;
4. discrete exchange: canonical line but no local elimination;
5. commuting BRST symmetry: blind to pure PGT invariants;
6. minimal exact supersymmetry: necessarily enlarged spectrum;
7. Weyl/shift/topological relabellings: incompatible scales or missing new
   gauge complex.

Further finite group scans or tree-level Hessians are not decision-relevant.
The only honest reopening data are either:

- a fully specified enlarged super/topological action, accepted with its extra
  spectrum; or
- the complete normal beta system (C\beta), including gravity, torsion,
  compensator, copy-gauge, ghost and matter contributions, with a unitary
  fixed surface demonstrated.

Until one is supplied, the local fundamental route is exhausted and the
critical (2+1) model remains a tuned low-energy EFT.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_enhanced_protection_exhaustion.mjs
~~~
