# The local derivative frame extends to a positive doubled Gaussian Schwinger–Keldysh kernel

**Date:** 25 October 2026

**Status:** Gaussian doubled SK/KMS gate closed; nonlinear Ward/KMS theory and microscopic matching open

**Topic:** OT-016

**Parent:** [AZ-100 local derivative-frame invariance](admissibility_100_local_derivative_hydrodynamic_frame_invariance.md)

**Evidence:** [Gaussian SK/KMS audit](../../../evidence/data/hydrodynamic-gaussian-sk-kms-completion-v1.json)

**Generator:** [doubled-kernel calculation](../../../scripts/run-hydrodynamic-gaussian-sk-kms-completion.mjs)

**Verifier:** [Gaussian SK/KMS certificate](../../../verification/admissibility/verify_hydrodynamic_gaussian_sk_kms_completion.mjs)

## Result

AZ-100 showed that one local derivative change of the retained shear and sound coordinates leaves their complete Gaussian source response unchanged. This packet asks the next physical question: can the same change be made after the dissipative theory has been doubled so that response and fluctuations live in one Schwinger–Keldysh kernel?

For retarded and advanced inverse kernels \(D_R\) and \(D_A=D_R^\dagger\), define the positive noise kernel

\[
N(\omega)=\coth\!\left(\frac{\omega}{2T}\right)i(D_R-D_A)
\]

and the doubled Gaussian kernel

\[
K_{SK}=\begin{pmatrix}0&D_A\\D_R&iN\end{pmatrix}.
\]

The two internal modes are shear diffusion and attenuated sound. The AZ-100 triangular time- and space-derivative operator acts on both doubled fields, and the doubled source coupling co-transforms with it. At four positive frequencies, the transformed kernel preserves the advanced/retarded reality relation, the fluctuation–dissipation identity and the complete doubled source covariance.

The largest source-covariance discrepancy is \(6.28\times10^{-14}\). The largest fluctuation–dissipation discrepancy is \(2.24\times10^{-16}\). The original noise kernel has minimum sampled eigenvalue \(0.457\); after the derivative frame change the minimum is still positive at \(0.404\). The coordinate change therefore neither invents a stochastic response channel nor hides a negative-noise direction.

## What this means in ordinary language

A dissipative equation alone is incomplete: the same damping that removes organized motion must be accompanied by fluctuations. Schwinger–Keldysh doubling keeps the driven response and its noise in one object, while the KMS relation ties them together at thermal equilibrium. The present test changes the names of the internal shear and sound variables—including derivative-dependent mixing—and verifies that an external observer obtains the same response-and-noise record.

This is stronger than appending a KMS factor after the fact. It shows that the local frame transformation is compatible with one explicit doubled Gaussian action and that positivity survives the transformation. It is still a linear stochastic statement, not the nonlinear hydrodynamic theorem.

## Literature boundary

The construction follows the doubled-action and local-KMS architecture of [Crossley, Glorioso and Liu](https://arxiv.org/abs/1511.03646), the dynamical-KMS and entropy-current analysis of [Glorioso, Crossley and Liu](https://arxiv.org/abs/1701.07817), and the emphasis on causal, stable general-frame stochastic actions within a finite hydrodynamic regime in [Mullins et al.](https://arxiv.org/abs/2309.00512). Those works make clear why a Gaussian fluctuation–dissipation check is necessary but not sufficient: dynamical KMS couples derivative orders and nonlinear terms, and a formal action still needs a causal and stable domain of validity.

## Open and closed

**Closed here**

- the AZ-100 local derivative transformation extends to an explicit doubled Gaussian kernel;
- retarded/advanced reality and thermal fluctuation–dissipation remain intact;
- the original and transformed noise kernels are Hermitian and positive on every sampled frequency;
- the complete doubled source covariance is invariant when fields and source couplings transform together.

**Still open**

- nonlinear dynamical-KMS completion across derivative orders;
- stress-tensor Ward identities and the full improvement/contact-term classification;
- construction of an entropy current and its positivity statement;
- a declared causal and stable hydrodynamic validity window;
- microscopic or measured matching with covariance;
- any claim of generated \(\operatorname{Spin}_0(2,3)\) dynamics or new physics.

## Implication

The immediate loophole is no longer that Gaussian noise or thermal doubling destroys the frame-invariant multichannel response. The next calculation must earn more: one nonlinear, Ward-complete, dynamical-KMS action whose allowed improvements cannot remove the source-facing direction, followed by matching to a microscopic model or measured carrier. A failure there would close the proposed direction as an effective-coordinate artifact; survival would turn the current formal cone into a genuine material or many-body target.

## Reproduction

~~~powershell
node scripts/run-hydrodynamic-gaussian-sk-kms-completion.mjs --write
node verification/admissibility/verify_hydrodynamic_gaussian_sk_kms_completion.mjs
~~~
