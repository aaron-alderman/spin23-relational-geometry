# Curl eta asymmetry is an orientation record, not a mass formula

**Date:** 27 October 2026

**Status:** exact finite orientation witness and established continuum invariant; bounded-domain extension and detector realization remain open

**Parents:** [graded Beltrami spike](admissibility_149_graded_beltrami_impedance_defect_investigation_spike.md), [Lagrangian boundary spectral flow](admissibility_150_lagrangian_boundary_selector_and_maslov_spectral_flow.md), [common central sign versus relative face reflection](../../claims/0100-0199/125_common_central_sign_vs_relative_face_reflection.md)

**Evidence:** [eta-orientation ledger](../../../evidence/data/admissibility-curl-eta-orientation-v1.json); [independent verifier](../../../verification/admissibility/verify_curl_eta_orientation.mjs)

**Primary source:** [Capoferri and Vassiliev, *A microlocal pathway to spectral asymmetry: curl and the eta invariant*](https://arxiv.org/abs/2502.18307)

## Result

The eta invariant supplies information that the squared Beltrami spectrum,
unsigned frequencies and determinant magnitude erase. For a self-adjoint
operator (B) with nonzero real spectrum, define initially where convergent

\[
\eta_B(s)=\sum_{\lambda\ne0}
\frac{\operatorname{sgn}\lambda}{{|\lambda|}^s}.
\]

For curl on a closed oriented Riemannian three-manifold, analytic continuation
defines (eta_{\operatorname{curl}}(0)). Recent microlocal work also recovers
it as the regularized trace of the difference between the positive and
negative spectral projectors.

Reversing orientation changes the Hodge star sign and therefore

\[
\operatorname{curl}=*d\longmapsto-\operatorname{curl}.
\]

Consequently

\[
\boxed{
\eta_{-B}(s)=-\eta_B(s),
\qquad
(-B)^2=B^2.
}
\]

Eta is therefore an orientation-sensitive record precisely where the squared
spectral ladder is orientation blind.

## Minimal exact witness

Take

\[
B=\operatorname{diag}(-4,1,2),
\qquad
B^\mathrm{op}=-B.
\]

Then (B^2=(B^\mathrm{op})^2), the singular values are identical and the
absolute determinants agree. But

\[
\eta_B(0)=2-1=1,
\qquad
\eta_{B^\mathrm{op}}(0)=-1.
\]

At (s=1), the weighted asymmetry is also odd:

\[
\eta_B(1)=-\frac14+1+\frac12=\frac54,
\qquad
\eta_{B^\mathrm{op}}(1)=-\frac54.
\]

This finite matrix is not a curl discretization. It certifies the logical
separation among an unsigned ladder, an oriented first-order generator and an
eta record.

## Eta and spectral flow answer different questions

For a finite path with invertible endpoints and only simple crossings, each
negative-to-positive crossing changes (eta(0)) by two. Hence

\[
\eta_{B_1}(0)-\eta_{B_0}(0)=2\,\operatorname{sf}(B_t)
\]

in that finite setting. In continuum elliptic families, reduced eta invariants
also carry smooth local variation, and the Atiyah--Patodi--Singer relation must
be used with its boundary and local terms. The safe dictionary is:

- spectral flow is a path record;
- eta is an endpoint spectral-asymmetry record;
- their difference is not universally exhausted by a crossing count in the
  continuum.

This prevents a new collapse of types. A static chiral cavity may have eta
asymmetry without a performed boundary path. A path can have nonzero spectral
flow even if an enlarged system restores a globally symmetric endpoint
spectrum.

## The local asymmetry operator is a stronger target than one number

Capoferri and Vassiliev construct an asymmetry operator from
(P_+-P_-), the difference of positive and negative curl spectral
projections. Its regularized local and global traces recover the local eta
density and global eta invariant. The principal symbol involves the oriented
Levi-Civita tensor and a derivative of the Ricci tensor.

This gives the corpus two possible detectors:

1. a global signed spectral statistic (eta(0));
2. a spatially resolved asymmetry density before integration.

The second is potentially more useful experimentally because opposite local
contributions can cancel globally. But the cited theorem is for closed
manifolds. Extending the local detector to a bounded laboratory domain requires
the Lagrangian boundary domain, boundary correction terms and a declared
regularization.

## Determinants cannot be used without their phase ledger

For an indefinite self-adjoint first-order operator, a zeta determinant needs
a spectral cut. Its magnitude can be reconstructed from unsigned spectral
data such as (B^2), while its phase depends on signed spectral asymmetry and
the cut convention. Therefore the operation

\[
B\mapsto B^2\mapsto |\det_\zeta B|
\]

forgets exactly the orientation record eta retains.

This creates a strict gate for any proposal that derives masses or couplings
from Beltrami determinants:

- state whether the observable uses (B), (|B|) or (B^2);
- state the self-adjoint domain and zero-mode treatment;
- state the spectral cut and determinant phase convention;
- show which orientation reversal is physical rather than conventional;
- do not identify a determinant with a dimensionful mass without an external
  scale and normalization.

The eta invariant can repair a missing phase ledger. It cannot supply a mass
formula by itself.

## A practical orientation experiment

Use a chiral cavity, microwave network or synthetic-frequency lattice whose
complex response exposes signed helicity branches.

1. Calibrate the full complex transfer matrix and pole residues.
2. Construct an orientation-reversed device or control protocol that realizes
   the operator map (B\mapsto-B), not merely a relabelled detector.
3. Verify that unsigned pole frequencies and (B^2)-type records agree.
4. Form a preregistered finite-band eta statistic with an explicit cutoff and
   tail bound.
5. Require the statistic to reverse sign while phase-blind controls remain
   fixed.
6. Repeat under boundary-path reversal to distinguish static eta asymmetry
   from spectral flow.

The finite-band statistic is not automatically the continuum eta invariant.
It becomes an estimator only with a convergence or heat-kernel tail argument.

## What this adds to the carrier–selector–detector grammar

- **Carrier:** the signed first-order Beltrami spectrum and eigenmodes.
- **Selector:** orientation plus the self-adjoint boundary domain.
- **Dual face:** (B) versus (-B), indistinguishable after squaring.
- **Detector:** eta or a controlled finite-band asymmetry estimator.
- **Triality relation:** the comparison among signed spectrum, squared
  spectrum and phase-sensitive response detects what either pair can erase.

The third record is necessary because matching (B^2) and matching power
spectra do not certify matching oriented dynamics.

## Verdict

Eta asymmetry is a genuine new record for the programme. It is odd under
orientation reversal, invisible to (B^2), and directly tied to positive
versus negative curl spectral projectors. Its correct role is to preserve the
orientation phase omitted by unsigned spectral ladders—not to turn a spectral
determinant into a particle mass. The next gate is to join eta-sensitive
residues to the same boundary defect already required to predict holonomy and
pole motion.
