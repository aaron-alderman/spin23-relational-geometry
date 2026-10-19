# The Neutral Exchange Is Not Source CAR Charge Conjugation

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact representation-theoretic no-go on an undoubled charged module  
**Certificate:** [verify_neutral_exchange_not_car_charge_conjugation.mjs](scripts/verify_neutral_exchange_not_car_charge_conjugation.mjs)

## Executive result

The linear neutral exchange \(S\) used by the successful Hermitian response must not be confused with Furey/CAR charge conjugation.

On the completed TRO, \(S\) maps each particle to the same charged and chiral Standard-Model representation while exchanging the neutral endpoint roles \(D\leftrightarrow E\). This is why it can satisfy

\[
S\rho_A(g)=\rho_B(g)S.
\]

The antiunitary \(S K\), however, cannot be gauge-equivariant on a same-charge complex line with nonzero charge \(q\). For

\[
\rho_q(\alpha)=e^{iq\alpha},
\]

antiunitarity gives

\[
(S K)\rho_q(\alpha)
=e^{-iq\alpha}(S K),
\]

whereas same-charge equivariance would require \(e^{+iq\alpha}(S K)\). Equality for every \(\alpha\) forces \(q=0\).

Therefore

\[
\boxed{S K\text{ is not a gauge-equivariant source conjugation on the undoubled charged module}.}
\]

## The Nambu repair

On the doubled space

\[
V_q\oplus V_{-q},
\]

the standard CAR real structure

\[
J_0=\tau_x K
\]

is gauge-equivariant because \(\tau_x\) exchanges the conjugate-charge summands. Source Lorentz conjugation also reverses Weyl chirality. Schematically,

\[
(q,L,D)\longmapsto(-q,R,E).
\]

The neutral exchange alone instead gives

\[
(q,L,D)\longmapsto(q,L,E).
\]

They are different operations.

The certificate tests all five nonzero Standard-Model charge types at three phases. All fifteen same-charge antiunitary tests fail, while all fifteen Nambu charge-pair tests pass.

## Consequence for the selector

The Hermitian response itself uses the **linear** map

\[
J_{\rm H}=S(\cdot)^\dagger,
\]

which does intertwine the completed gauge modules. Its algebraic and gauge results survive.

What fails is the proposed derivation

\[
\text{“the survivor antiunitary }S K\text{ is simply source CAR/Lorentz conjugation.”}
\]

That direct route is falsified for every charged sector.

## Two credible remaining paths

1. **Linear-source path:** derive \(S\) directly as a linear symmetry or correspondence of the source nested algebra, without identifying \(S K\) with charge conjugation.
2. **Nambu path:** construct the response on the doubled self-dual CAR module using \(J_0\), then prove that a gauge- and Lorentz-compatible compression produces the linear exchanged-TRO response without reintroducing mirror particles.

The second path has a hard stop criterion: if the compression cannot remove the conjugate-charge/right-handed partner while preserving locality, positivity and the faithful Standard-Model action, it does not solve the chiral problem.

## Reproducibility

```powershell
node scripts/verify_neutral_exchange_not_car_charge_conjugation.mjs
```
