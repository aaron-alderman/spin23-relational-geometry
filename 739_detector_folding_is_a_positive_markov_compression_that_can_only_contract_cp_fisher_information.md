# Detector Folding Is a Positive Markov Compression That Can Only Contract CP Fisher Information

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the observed-information branch  
**Claim status:** exact data-processing theorem and executable resolution toy; experiment-specific response remains open  
**Certificate:** [verify_detector_folding_contracts_cp_fisher_information_by_conditional_expectation.mjs](scripts/verify_detector_folding_contracts_cp_fisher_information_by_conditional_expectation.mjs)

## Executive result

A parameter-independent detector or reconstruction response cannot create CP Fisher information. It can only preserve or destroy information already present in the latent differential distribution.

Let \(X\) be latent kinematics, \(Y\) observed data and \(R(y|x)\) a Markov response independent of the local CP parameter. If

\[
f(x;\epsilon)=f_0(x)+\epsilon f_1(x)+O(\epsilon^2),
\]

then

\[
g_k(y)=\int dx\,R(y|x)f_k(x),
\qquad k=0,1.
\]

The observed score is

\[
\boxed{
s_{\rm obs}(y)=\frac{g_1(y)}{g_0(y)}
=\mathbb E_0[s_{\rm latent}(X)\mid Y=y].
}
\]

Conditional Jensen gives

\[
\boxed{
I_{\rm obs}
=\mathbb E_0[s_{\rm obs}^2]
\leq
\mathbb E_0[s_{\rm latent}^2]
=I_{\rm latent}.
}
\]

Equality holds exactly when the latent score is recoverable as a function of the observed data, up to null sets.

## 1. Resolution toy

The certificate discretizes the routed-propagator model and folds it through normalized Gaussian response kernels. It verifies:

- identity response preserves the latent information;
- increasing symmetric resolution width monotonically contracts it in the tested family;
- every folded result obeys the data-processing bound;
- complete mixing retains only the total-rate score;
- and because the exchange-odd response integrates to zero, complete mixing destroys all CP information.

The monotonic ordering for the chosen Gaussian family is a property of these nested smearings. The universal theorem is only \(I_{\rm obs}\leq I_{\rm latent}\).

## 2. What information is lost

The exact decomposition is

\[
I_{\rm latent}-I_{\rm obs}
=\mathbb E_0[\operatorname{Var}(s_{\rm latent}\mid Y)].
\]

Information is lost precisely when several latent points with different CP scores become observationally indistinguishable. For the pairing-exchange branch, merging \(x\) and \(-x\) averages opposite scores and can erase the signal completely.

This makes reconstructible orientation a mathematical requirement, not merely an analysis preference.

## 3. Positive-compression interpretation

The detector kernel is a positive, normalization-preserving map on probability distributions. Its dual sends an observed weight back to a latent conditional average. The score contraction is therefore the statistical counterpart of a positive compression of the carrier:

\[
\text{latent odd tangent}
\xrightarrow{R}
\text{observed odd tangent}
\xrightarrow{\text{nuisance quotient}}
\text{identifiable tangent}.
\]

This is a rigorous operational chain. It does not prove that every positive Jordan compression is a detector channel or that Fisher geometry is the \(Spin(2,3)\) metric.

## 4. Parameter-dependent responses

If \(R(y|x;\epsilon)\) itself depends on the fitted CP parameter, the observed derivative includes a response term. A real detector should not possess fundamental Majorana-CP dependence, but calibration and selection models can correlate with the analysis parameterization.

Such terms must be represented as nuisance scores and constrained with calibration data. Treating them as newly created signal would violate the causal division between physics and instrument.

## 5. Stop-everything criteria

Stop a proposed observable if the detector response maps every CP-distinct latent distribution to the same observed distribution.

Stop quoting latent Fisher information as achievable sensitivity without demonstrating score recoverability after reconstruction.

Stop using a parameter-dependent response as signal unless its physical origin is independently justified.

Stop the orientation branch if all experimentally accessible variables identify the two pairing-exchanged configurations.

## 6. Highest-value next calculations

1. Construct a two-channel measurement that restores a score erased in either channel separately.
2. Add an explicit odd acceptance nuisance after detector folding and recompute efficient information.
3. Compare hard binning, Gaussian smearing and missing-sign marginalization.
4. Determine the minimal orientation tag needed to avoid complete score cancellation.
5. Apply the theorem to a concrete helicity-level LNV topology.

## Companion documents

- [Efficient-score identifiability theorem](738_the_efficient_cp_score_is_the_nuisance_orthogonal_jordan_tangent_and_its_schur_complement_is_the_identifiability_test.md)
- [Optimal exchange-odd CP score](736_the_optimal_exchange_odd_observable_is_the_cp_score_and_recovers_all_local_information_lost_by_the_inclusive_rate.md)
- [Pairing-exchange cancellation and signed recovery](735_pairing_exchange_can_cancel_the_inclusive_majorana_quartet_asymmetry_while_a_signed_differential_moment_restores_it.md)
