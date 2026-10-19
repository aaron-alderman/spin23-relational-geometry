# Lane Expansion 06: Wall Reversal Flips Helicity but Not the Spin-Summed \(H_2(\mathbb R)\) Face Response

**Date:** 17 October 2026  
**Lane:** L4, boundary theory and anomaly inflow  
**Claim status:** exact wall-mode response theorem; Standard-Model source-to-helicity intertwiner remains open  
**Certificate:** [verify_programme_wall_orientation_response.mjs](../../../verification/verify/verify_programme_wall_orientation_response.mjs)

## Result

A domain-wall normal supplies a genuine geometric orientation, but that orientation is erased by the spin trace used to obtain the ordinary positive two-face response.

For a wall Weyl mode

\[
H_\chi(\mathbf k)=\chi\,\boldsymbol\sigma\cdot\mathbf k,
\qquad \chi=\pm1,
\]

reversing the mass kink or wall normal sends \(\chi\mapsto-\chi\). The projected pole factor is

\[
G_\chi(z,\mathbf k)
=(pp^T)_{\rm face}\otimes
(\chi\boldsymbol\sigma\cdot\mathbf k-zI)^{-1}.
\]

The spin-summed face response is even in \(\chi\), whereas the helicity-weighted response is odd:

\[
\boxed{
\operatorname{tr}_{\rm spin}G_{+}
=\operatorname{tr}_{\rm spin}G_{-},}
\]

\[
\boxed{
\operatorname{tr}_{\rm spin}
[(\hat{\mathbf k}\cdot\boldsymbol\sigma)G_{+}]
=-
\operatorname{tr}_{\rm spin}
[(\hat{\mathbf k}\cdot\boldsymbol\sigma)G_{-}].}
\]

Thus a wall does not automatically orient the scalar Jordan carrier. It creates an orientation-sensitive channel that survives only if the measurement retains helicity or another chiral analyzer.

## 1. Exact resolvent decomposition

Using

\[
(\chi\boldsymbol\sigma\cdot\mathbf k)^2
=|\mathbf k|^2I,
\]

the wall resolvent is

\[
(H_\chi-zI)^{-1}
=\frac{\chi\boldsymbol\sigma\cdot\mathbf k+zI}
{|\mathbf k|^2-z^2}.
\]

Its unpolarized trace is

\[
T_0(z,k)
=\frac12\operatorname{tr}(H_\chi-zI)^{-1}
=\frac{z}{k^2-z^2},
\]

which is independent of chirality. Its helicity trace is

\[
T_h(z,k)
=\frac12\operatorname{tr}
[(\hat{\mathbf k}\cdot\boldsymbol\sigma)(H_\chi-zI)^{-1}]
=\frac{\chi k}{k^2-z^2}.
\]

Multiplying either scalar by the positive face residue \(pp^T\) does not change these parity statements.

## 2. Why the previous structures did not join automatically

The domain-wall construction factorizes:

\[
\mathcal H_{\rm face}otimes
\mathcal H_{\rm spin}otimes
\mathcal H_{\rm internal}.
\]

The Jordan carrier lives in the face factor. Wall chirality lives in the spin factor. The free Furey module lives in the internal factor. Since the factors commute in the reference construction, reversing wall chirality cannot alter a face-only observable.

An orientation bridge therefore requires an interaction or source operator coupling at least two of these factors. Schematically,

\[
O_{\rm bridge}
=\Gamma_{\rm face}\otimes
(\hat{\mathbf k}\cdot\boldsymbol\sigma)
\otimes X_{\rm Furey}.
\]

Without such a term, identifying the wall normal with the Furey-to-projector orientation bit is a type error.

## 3. Concrete experiment

Prepare two otherwise identical wall configurations with opposite mass gradients. At the same momentum and frequency, measure:

1. total wall spectral intensity;
2. helicity-resolved or weak-chirality-resolved intensity;
3. the two-face response matrix.

The null prediction of the factorized wall model is:

\[
I_{\rm total}(+n)=I_{\rm total}(-n),
\]

\[
I_{\rm hel}(+n)=-I_{\rm hel}(-n),
\]

while the spin-summed face matrix is unchanged. A face-orientation signal can arise only through a measurable spin-face or spin-internal coupling.

This can be implemented first in the finite domain-wall Hamiltonian or an analogue Weyl interface. In a Standard-Model setting, weak interactions provide a chirality-sensitive analyzer, but the required source and topology map still has to be derived.

## 4. Landscape ledger

The result separates three orientation notions:

- geometric orientation of the bulk mass gradient;
- chirality/helicity of the wall zero mode;
- orientation of the two-face response or Furey assignment.

The first determines the second. The second does not determine the third in the factorized model. This is a useful map rather than a terminal failure: it identifies the exact interaction tensor needed to transmit orientation between layers.

## 5. Closure ledger and continuation

**Current closure value:** the bare wall normal does not select the Furey orientation bit in a face-only response.

**Plausible continuation:** introduce the smallest gauge-invariant spin-face operator, integrate out the gapped bulk and test whether its coefficient and sign follow from the wall action or remain a free boundary counterterm.

**Go signal:** wall reversal flips a balanced face-output difference while preserving total positive spectral weight, with the coupling sign fixed by the bulk construction.

**No-go signal:** every spin-face coupling is an independent boundary parameter or violates gauge covariance, locality or positivity.

## Reproducibility

```powershell
node scripts\verify_programme_wall_orientation_response.mjs
```

