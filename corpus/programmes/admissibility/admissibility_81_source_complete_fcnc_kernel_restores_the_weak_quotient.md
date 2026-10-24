# The source-complete flavor kernel restores the weak quotient

**Date:** 25 October 2026  
**Status:** corrective source-native no-go closed in the published MFV numerical approximation  
**Topics:** OT-048  
**Parent:** [AZ-080 public-likelihood boundary](admissibility_80_belle_public_likelihood_release_gate.md)  
**Corrects:** [AZ-079 isolated flavor-changing row](admissibility_79_flavor_changing_second_record_for_the_sixth_coordinate.md)  
**Evidence:** [source-complete kernel ledger](../../../evidence/data/alp-source-complete-fcnc-kernel-gate-v1.json)  
**Generator:** [forward-kernel calculation](../../../scripts/run-alp-source-complete-fcnc-kernel-gate.mjs)  
**Verifier:** [rank-collapse certificate](../../../verification/admissibility/verify_alp_source_complete_fcnc_kernel_gate.mjs)

## Result

AZ-079 found a real term in the finite weak matching that is proportional to the unprimed direct coefficient \(c_{WW}\). Taken alone, that term supplies a row independent of

\[
\widetilde c_{WW}=c_{WW}-\frac12A_2.
\]

Taken alone is the problem. A detector does not observe one selected term in a matching calculation. It observes the source-complete coefficient after running, weak matching and the operator-basis conversion have been combined.

For the minimal-flavor-violation numerical example in Bauer *et al.*, with \(\Lambda=4\pi f\), \(f=1\,\mathrm{TeV}\) and \(\mu_w=m_t\), their Eq. (74) gives

\[
[k_D(m_t)]_{ij}\simeq[k_D(\Lambda)]_{ij}
+0.019\,V_{ti}^*V_{tj}
\left[c_{tt}(\Lambda)-0.0032\,\widetilde c_{GG}(\Lambda)
-0.0057\,\widetilde c_{WW}(\Lambda)\right].
\]

On the two coordinates \((A_2,c_{WW})\), the flavor row is therefore

\[
0.019(-0.0057)\,(-1/2,1),
\]

which is exactly proportional to the weak row \((-1/2,1)\). The determinant is zero and the old blind displacement

\[
(\delta A_2,\delta c_{WW})=(2\lambda,\lambda)
\]

remains invisible. The isolated matching term was mathematically real, but it was not a complete forward model.

## Why the correction matters

This is precisely the distinction the admissibility programme is meant to protect: a term in an equation, a renormalized coefficient and a detector record are different things. Moving from one to the next requires every companion contribution that preserves the basis-independent observable. Dropping those contributions manufactured an apparent new coordinate.

The correction does not invalidate the flavor-changing calculation or the Belle detector. It changes their job. In this approximation the meson record constrains a combination of

\[
\widetilde c_{WW},\qquad c_{tt},\qquad \widetilde c_{GG},
\qquad [k_D(\Lambda)]_{ij},
\]

with CKM, form-factor, decay and detector nuisances layered on top. It can validate the common EFT across scales and constrain ultraviolet flavor sources. It cannot be advertised as the second \((A_2,c_{WW})\) row.

## Open and closed

Closed in the declared Eq. (74) scope:

- the isolated direct matching term is insufficient evidence of detector-level independence;
- the source-complete MFV numerical flavor row depends on \((A_2,c_{WW})\) only through \(\widetilde c_{WW}\);
- the two-record determinant vanishes before experimental nuisances are introduced;
- the Belle likelihood-release packet remains useful, but not for the sixth-coordinate claim in this scope.

Open:

- the general non-MFV matrix expression with all source coordinates retained;
- a gauge-complete differential W-associated amplitude in which current emission and direct bosonic emission are separately intervenable;
- another source-complete observable with a row not proportional to \((-1/2,1)\);
- the Belle recast as a constraint and cross-scale validation experiment.

## Implication and look-here instruction

The hopeful result is not that the easy detector worked. It is that the corpus found the cancellation before data fitting and can now stop asking Belle to preserve a distinction that the declared forward kernel has already quotiented away.

The next search should remain at amplitude level. Construct the gauge-complete W-associated differential kernel with independently signed current and direct-boson interventions, apply the existing 27-setting protocol, and test whether any interference shape survives integration and detector folding. If it does, that shape—not an isolated Wilson-coefficient term—is the candidate second record. If it does not, the sixth-coordinate branch closes more generally.

Primary source: [Bauer *et al.*, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272), especially Eqs. (70)--(74).

## Reproduction

~~~powershell
node scripts/run-alp-source-complete-fcnc-kernel-gate.mjs --write
node verification/admissibility/verify_alp_source_complete_fcnc_kernel_gate.mjs
~~~
