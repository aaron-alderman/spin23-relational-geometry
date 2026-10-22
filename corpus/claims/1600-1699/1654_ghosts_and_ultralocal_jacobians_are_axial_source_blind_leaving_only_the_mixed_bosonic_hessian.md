# Ghosts and Ultralocal Jacobians Are Axial-Source Blind, Leaving Only the Mixed Bosonic Hessian

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** source-order readiness v2; six of eight determinant/measure derivatives closed

**Depends on:** [the v1 source-order audit](1650_torsionless_determinants_do_not_determine_any_of_the_five_axial_loop_responses.md), [the exact pure-axial Gaussian reduction](1651_the_fixed_coframe_pure_axial_sector_is_exactly_gaussian.md), and [the complete-measure MS-bar decision](1653_the_native_hamiltonian_legendre_map_reduces_the_measure_bridge_to_one_normalization.md)

**Evidence:** [readiness-v2 ledger](../../../evidence/data/spin23-torsionful-loop-source-order-readiness-v2.json) and [verifier](../../../verification/verify/verify_spin23_torsionful_loop_source_order_readiness_v2.mjs)

## Result

For the matching protocol, axial source differentiation changes the
independent background connection while holding the coframe and selector
fixed. Under precisely this variation:

- every Faddeev--Popov ghost block is independent of the axial source;
- every frozen ultralocal field-space metric and irreducible-decomposition
  Jacobian is independent of the axial source;
- the complete second-class measure has the nonzero local response derived
  in claim 1653, but no dimensional-regularization/MS-bar pole; and
- the pure axial-to-axial bosonic Hessian is source independent by claim
  1651.

Thus six of the eight source-derivative objects identified in claim 1650 are
closed for this protocol. The only missing objects are the first and second
axial-source derivatives of the **complete mixed bosonic Hessian**.

## Why the ghost derivatives vanish

The packet gauge functions are

\[
F_\mu(h;\bar e),\qquad G_{ab}=f_{[ab]},\qquad H_a=v_a.
\]

They depend on the coframe/metric and selector, not on the independent
background connection. At vanishing fluctuations their gauge variations use

\[
\delta e=\mathcal L_c e+\lambda e,
\qquad
\delta V=\mathcal L_cV+u\cdot V,
\]

which likewise contain no independent \(\omega\). Therefore the FP matrix

\[
M_{\rm FP}={\delta(F,G,H)\over\delta(c,\lambda,u)}
\]

is unchanged by \(\bar\omega\mapsto\bar\omega+\bar K_{\rm axial}\) at fixed
\(\bar e,V\). Consequently

\[
H_{{\rm gh},1}=H_{{\rm gh},2}=0.
\]

Connection terms that appear after covariantly rewriting a Lie derivative
must cancel against the accompanying torsion/connection terms; retaining the
geometric Lie derivative makes the source independence manifest.

## Why the ordinary Jacobian derivatives vanish

The packet's ultralocal \(L^2\) metrics for \(f\) and \(k\) are constructed
from the background coframe. The torsion irreducible projectors use only the
coframe and Hodge star. Both are held fixed during axial source
differentiation.

Moreover

\[
(e,\omega)\mapsto(e,K=\omega-\mathring\omega(e))
\]

has a block-triangular derivative with identity diagonal. Its coordinate
Jacobian is exactly one for every axial background. Hence

\[
(\log J_{\rm measure})_1=(\log J_{\rm measure})_2=0.
\]

## Updated readiness count

| Sector | First source derivative | Second source derivative | MS-bar axial response |
|---|---|---|---|
| Complete mixed bosonic Hessian | missing | missing | unresolved |
| FP ghosts | zero | zero | zero |
| Complete second-class measure | zero at origin | known local even response | zero pole |
| Ordinary measure/Jacobians | zero | zero | zero |

The isolated axial self-block is a known zero sub-block of the still-missing
bosonic entries. What remains consists entirely of mixed coframe--axial and
non-axial-connection--axial vertices.

## Next irreducible calculation

Write the full gauge-fixed bosonic operator as

\[
H_B[\bar S]=H_{B,0}+\bar S\cdot H_{B,1}
+\bar S\bar S:H_{B,2}+O(\bar S^3).
\]

The next calculation must construct \(H_{B,1}\) and \(H_{B,2}\), perform
the measure-preserving Schur reduction, and insert them into

\[
{1\over2}\operatorname{Tr}(G_BH_{B,2})
-{1\over4}\operatorname{Tr}(G_BH_{B,1}G_BH_{B,1}).
\]

No ghost, ordinary Jacobian, isolated axial determinant, or constraint
measure pole remains available to cancel or replace this computation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_torsionful_loop_source_order_readiness_v2.mjs
~~~
