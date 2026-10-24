# Frontier Wave 7.78: Reverse-Phase Physical Selection Boundary

**Date:** 25 October 2026  
**Status:** exact stability/passivity comparison and Onsager--Casimir selector  
**Ledger:** [post-Q programme](post_q_five_option_programme_v1.json)  
**Certificate:** [physical-principles verifier](../../../../verification/verify/verify_reverse_phase_physical_principles.mjs)

## Result

Causality, stability, passivity and stationary covariance do not universally
select \(+E^T\) over \(-E^T\). They distinguish the roles of the two
completions, but both admit ordinary stable physical realizations.

For the checkpoint, the singular values obey

\[
\sigma_1^2=\frac{16}{13},
\qquad
\sigma_2^2=\frac{10}{13}.
\]

As bare real-time generators:

- \(X_+\) has eigenvalue pairs \(\pm\sigma_i\) and is a saddle;
- \(X_-\) has pairs \(\pm i\sigma_i\) and is lossless for the positive norm.

After damping, both can be causal and stable. The compact branch
\(-\gamma I+X_-\) is contractive for every \(\gamma\ge0\). The noncompact
branch \(-\gamma I+gX_+\) is contractive when

\[
\gamma\ge g\sigma_{\max}.
\]

Both also admit positive-noise Ornstein--Uhlenbeck witnesses with stationary
covariance \(I_5\). Thus neither passivity nor equilibrium covariance alone is
the desired selector.

## The actual sign selector

Onsager--Casimir reciprocity gives

\[
B=\Theta_2E^T\Theta_3,
\]

where \(\Theta_2\) and \(\Theta_3\) encode endpoint time-reversal parities.
Therefore:

\[
\text{same endpoint parity}\Longrightarrow B=+E^T,
\]

\[
\text{opposite endpoint parity}\Longrightarrow B=-E^T.
\]

The noncompact/compact choice is consequently an experimentally meaningful
parity question. A coherent complex or Wick-like quarter-turn may implement
the same change of role, but it must be tied to the endpoint time-reversal
typing rather than asserted from analyticity alone.

## Implication

The shortest physical route to \(Spin(2,3)\) is now to show that the two and
three channel variables have the same Onsager parity and that their measured
reverse transfer is reciprocal with the plus sign. Opposite parity would
select the compact \(SO(5)\) branch instead; failure of both signed residuals
would falsify the two-branch model.

