# A Minimal Gauged-Axial Locking Completion Adds Spectrum but Still Does Not Select One Eighth

**Date:** 23 October 2026

**Status:** explicit first new-model construction beyond the current-input exhaustion boundary

**Depends on:** [the global current-input exhaustion certificate](1748_the_named_anomaly_route_closes_at_boundary_response_not_bulk_coefficient_selection.md)

**Evidence:** [gauged-locking ledger](../../../evidence/data/spin23-axial-u1-locking-completion-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_u1_locking_completion.mjs)

## Result

Promoting the axial current to a genuine compact \(U(1)_A\) charge does not
make the torsion coefficient equal to \(1/8\).  The minimal gauge-invariant
locking model introduces an axial gauge field \(B_\mu\), a Stueckelberg scalar
\(a\), and

\[
 X_\mu=B_\mu-{1\over M}\partial_\mu a,
 \qquad
 \mathcal L_{\rm lock}={M^2\over2}(X_\mu-\rho S_\mu)^2,
\]

together with \(gqB_\mu J_5^\mu\).  At momenta small compared with \(M\), in
unitary gauge, the algebraic equation gives

\[
 B_\mu=\rho S_\mu-{gq\over M^2}J_{5\mu}
 +O(\partial^2/M^2).
\]

Substitution produces

\[
 \boxed{\eta_{\rm eff}=gq\rho},
 \qquad
 \Delta\mathcal L=-{(gq)^2\over2M^2}J_{5\mu}J_5^\mu+cdots.
\]

Charge normalization can make \(q\) integral, but the gauge coupling \(g\)
and locking coefficient \(\rho\) remain continuous.  The condition
\(\eta_{\rm eff}=1/8\) is therefore the tuning

\[
 \rho={1\over8gq},
\]

not a Ward-identity prediction.

## Anomaly cost

For a purely axial Dirac charge choose \(q_L=-q\), \(q_R=+q\).  Expressed as
left-handed Weyl fields, both contributions have charge \(-q\).  A single
Dirac fermion therefore contributes

\[
 \mathcal A_{\rm grav}=-2q,
 \qquad
 \mathcal A_{AAA}=-2q^3.
\]

An anomaly-free set must satisfy

\[
 \sum_i q_i=0,
 \qquad
 \sum_iq_i^3=0.
\]

The smallest algebraic witness is a second Dirac species with opposite axial
charge.  Gauge-invariant masses then require a charged Higgs field or an
equivalent axionic construction because a bare Dirac mass connects differently
charged chiralities.

Thus the completion adds at least a massive spin-one field, its eaten
Stueckelberg mode, anomaly-cancelling fermionic content and a mass-generation
sector.  Integrating it out also leaves a four-fermion operator.  It is a
consistent new-model template, not protection of the original \((2+1)\)
spectrum or its minimal coefficient.

## Implication

This closes the most direct attempt to turn \(\eta\) into a quantized charge.
Compactness quantizes charge ratios, while the physical coupling inherited by
torsion is a product of continuous gauge and locking parameters.  Any stronger
gauged construction must add a separate law fixing \(g\rho\); without that law
it merely relocates the Wilson coefficient.

## Source context

Stueckelberg anomaly cancellation generally introduces axionic and
Chern--Simons/Wess--Zumino structure rather than fixing all physical
couplings; see S. Morelli, [*Stueckelberg Axions and Anomalous Abelian Extensions of the Standard Model*](https://arxiv.org/abs/0907.3877).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_u1_locking_completion.mjs
~~~
