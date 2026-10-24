# Coordinated selector closure and the physical-provenance boundary

**Packet:** AZ-057  
**Date:** 24 October 2026  
**Status:** one common simulator closes OT-001 for the declared mechanism family and integrates OT-002--OT-005; physical carrier, (Y) provenance, record efficiency and measured cost remain open  
**Topics:** OT-001--OT-005  
**Evidence:** [Coordinated selector record](../../../evidence/data/admissibility-coordinated-selector-closure-v1.json)  
**Reproduction:** `node scripts/run-coordinated-selector-closure.mjs`  
**Verification:** [Coordinated selector certificate](../../../verification/admissibility/verify_coordinated_selector_closure.mjs)

## Result

The five previously separate selector gates now run through one generative graph:

\[
\text{control}
\to H_3(t)
\to(P,Q,U_Q)
\to\text{selector/instrument}
\to\text{latent state}
\to\text{detector folding}
\to\text{raw record}.
\]

This integration closes the declared local detector-equivalence problem and exposes one hard boundary: the remaining uncertainty is not another missing matrix identity. It is the absence of a chosen physical carrier and independently calibrated physical realization of (Y).

## 1. Holonomy carrier

The simulator freezes the AZ-026 latitude loop

\[
n(\phi)=\left(\frac{\sqrt7}{4}\cos\phi,
\frac{\sqrt7}{4}\sin\phi,
\frac34\right),
\qquad
H_3(\phi)=\Delta[I-n(\phi)n(\phi)^T],
\]

with (Delta=1) and loop rate (omega=0.02). Its adiabatic ratio is

\[
\epsilon_{\rm ad}=rac{\omega\sqrt7}{4\Delta}simeq0.0132.
\]

The projector closes exactly and the calibrated doublet frame returns by (+pi/2); reversing the loop gives (-pi/2). The large common dynamical phase remains explicitly typed as a quantity to remove by reference or echo rather than being mistaken for holonomy.

## 2. Detector-equivalence closure

Three preregistered mechanisms are folded through the same records:

1. geometric holonomy;
2. a static doublet splitting adjusted to imitate the forward endpoint angle; and
3. differential loss producing the same normalized endpoint direction.

The detector partition refines in three stages:

| record bundle | equivalence classes | worst-pair efficient information |
|---|---|---:|
| normalized forward endpoint | `{holonomy, splitting, loss}` | 0 |
| add reverse complex tomography | `{holonomy}`, `{splitting, loss}` | 0 |
| add process singular values | `{holonomy}`, `{splitting}`, `{loss}` | 81 |

Here the dimensionless information uses the frozen standard deviations (0.05) for angles and log singular-value ratio. Reverse traversal supplies the odd geometric signature; singular values distinguish unitary splitting from nonunitary filtering. Neither added channel alone resolves every pair. Their combination does.

Echo and loss-balance interventions are retained as held-out controls: echo cancels the static splitting but not geometric transport, while balancing attenuation removes the loss signature without changing the other two mechanisms.

OT-001 therefore closes for this declared three-mechanism family. The global nonlinear question remains separately governed by OT-034; no finite local family can prove injectivity over every possible mechanism.

## 3. Independent selector datum

The selector is frozen before the output is generated:

\[
Y=|y\rangle\langle y|,
\qquad y=(0,0,1),
\qquad
\mathcal R(P;Y)=\Pi_{\max}(P+2Y).
\]

For five initial projective angles, removing (Y) returns every angle unchanged, whereas enabling (Y) moves every nonzero angle toward the fixed axis. The tangent multipliers are

\[
m_{Y\rm-off}=1,
\qquad
m_{Y\rm-on}=\frac13.
\]

The code does not fit (Y) from the selected state. This closes independence at model level. It does not identify whether physical (Y) is a wall, anisotropy, calibrated reservoir, detector frame or active feedback reference. OT-003 therefore remains open at the carrier-provenance boundary.

## 4. Conditioned and unconditional dynamics

With weak-measurement strength (epsilon=0.6), all outcomes are retained. The two conditioned states move in opposite population directions, while their probability-weighted channel leaves populations unchanged and multiplies coherence by

\[
\sqrt{1-\epsilon^2}=0.8.
\]

For the input ((p_0,p_1,c)=(0.3,0.7,0.2)), the unconditional state is

\[
(0.3,0.7,0.16).
\]

Measurement alone therefore retains the full diagonal fixed manifold. Applying the independent population selector afterward produces the affine update

\[
p_1'=0.8+\frac13(p_1-0.8),
\]

and maps the stated input to (p_1'=0.766\overline6). Branch formation and unconditional selection are now represented in one record rather than inferred from separate examples.

OT-004 closes algebraically in the simulator, but remains active experimentally because detector efficiency, lost records and the reconstructed physical instrument are not yet known.

## 5. Matched-contraction thermodynamic collision

Three implementations are forced to have the same coarse fixed population (p_*=0.8), the same contraction (m=1/3), and the same observation time

\[
\tau=\frac{\ln3}{5}.
\]

They nevertheless have different ledgers.

### Equilibrium-biased selector

A single detailed-balance channel with total rates (k_+=4), (k_-=1) has zero stationary entropy-production rate.

### Driven hidden-cycle selector

Two distinguishable channels have forward rates ((3.5,0.5)) and reverse rates ((0.2,0.8)). Their totals remain (4) and (1), so the observed coarse map is identical. At stationarity the channel currents are equal and opposite, but their hidden cycle produces

\[
\dot\Sigma_{\rm hk}=1.7993904355
\]

in the declared dimensionless units.

### Monitored selector

The same coarse population map is combined with the complete weak-measurement record. At stationarity the record probabilities are ((0.32,0.68)), producing the reset lower bound

\[
W_{\rm reset}\ge k_BT H(0.32,0.68)
=0.6268694576,k_BT
\]

per stored binary record. This is a Landauer lower bound, not a complete hardware cost.

Thus

\[
\boxed{
\text{same fixed point + same contraction + same duration}
\not\Rightarrow
\text{same thermodynamic implementation or cost}.}
\]

OT-005's theoretical collision is now executable. Its requested precision--speed--cost frontier remains open until a carrier supplies bounded controls, trajectories, heat and detector work.

## 6. Adjudication

| topic | result | remaining datum |
|---|---|---|
| OT-001 | `CLOSED_FOR_DECLARED_LOCAL_FAMILY` | global nonlinear injectivity remains OT-034 |
| OT-002 | analytic Hamiltonian and separating detector bundle integrated | physical matrix, loss and calibration in measured units |
| OT-003 | (Y) frozen independently and on/off return map predicted | physical provenance and independent calibration of (Y) |
| OT-004 | conditioned and unconditional maps jointly computed | physical record efficiency and instrument tomography |
| OT-005 | three equal-contraction ledgers computed and inequivalent | measured precision--speed--cost surface with full resource bounds |

## Decision

No additional abstract selector is warranted. The next admissible move is to instantiate this exact simulator on one carrier—acoustic, photonic, microwave or mechanical—and replace every dimensionless input by an independently measured coupling, loss, bandwidth, detector efficiency and energetic cost.

This packet supplies no (Spin(2,3)) or (E_8) derivation. It supplies the finite experimental contract that any such derivation would have to reproduce.
