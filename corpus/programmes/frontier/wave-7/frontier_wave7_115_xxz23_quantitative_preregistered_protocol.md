# Frontier Wave 7.115: Quantitative XXZ-23 Preregistered Protocol

**Date:** 25 October 2026

**Status:** exact control point and null tests sourced; executable numerical certificate; W1 associator experiment proposed, not yet performed

**Evidence:** [XXZ-23 protocol record](../../../../evidence/data/xxz23-monster-defect-protocol-v1.json)

**Certificate:** [XXZ-23 protocol verifier](../../../../verification/verify/verify_xxz23_monster_defect_protocol.mjs)

## Result

The general carrier proposal now has a precise first experimental instance.
Choose the root-of-unity XXZ chain with

\[
 q=e^{i\pi/23},\qquad
 \Delta=\frac{q+q^{-1}}2=\cos\frac{\pi}{23}
 =0.9906859460363308\ldots .
\]

For a genuinely periodic chain, the smallest commensurate size is

\[
 L=2N=46
\]

spin-\(1/2\) sites. With twisted boundary conditions the construction can be
written at other sizes, but \(L\in46\mathbb Z\) makes the periodic and twisted
descriptions equivalent and makes the transfer operator \(T(0)\) invertible.
The continuum compact-boson radius is predicted to be

\[
 R^2=\frac{23}{2},\qquad R=3.391164991562634\ldots .
\]

This fixes a falsifiable parameter point rather than a broad material analogy.

## 1. W0: exact fusion-ring measurement

Vernier--Miao--Yamazaki construct matrix-product duality operators

\[
 D_\pm=\lim_{u\to\mp\infty}
 e^{\frac{i\pi}{46}(L\mp2S^z)}e^{\pm uL}T_c(u,u,0)
\]

and charge operators

\[
 Z_\pm=e^{\frac{i\pi}{23}(L\mp2S^z)}.
\]

Their exact relations specialize to

\[
 Z_\pm^{23}=1,\qquad Z_\pm D_\pm=D_\pm Z_\pm=D_\pm,
\]

\[
 D_\pm^2=\left(\sum_{k=0}^{22}Z_\pm^k\right)T(0).
\]

The root sum is \(23\) on the \(Z_\pm=1\) sector and zero on every other
charge sector. Therefore the normalized sector response is not a loose fit:

```text
charge r = 0       23
charge r = 1..22    0
```

A device fails W0 if leakage-corrected values do not approach this pattern,
if \(D_+\) and \(D_-\) are not exchanged by spin-flip/time-reversal, or if the
fusion residual grows rather than shrinks under bond-dimension and calibration
refinement.

## 2. W1: the Monster-specific associator target

The lattice paper explicitly states that its fusion algebra does not determine
the underlying \(F\)-symbols. W0 therefore cannot be promoted by rhetoric.
The proposed W1 experiment must tomographically recover the four-defect
recoupling map and test

\[
 F_{ab}=\frac{\epsilon}{\sqrt{23}}e^{-2\pi iab/23}.
\]

The preregistered gauge-invariant target is

\[
 R_{a,a+1;b,b+1}=e^{-2\pi i/23}
 =e^{-0.2731819698773733i}
\]

for all \(22^2=484\) adjacent plaquettes. The entry magnitude target is

\[
 |F_{ab}|=1/\sqrt{23}=0.2085144140570748\ldots .
\]

The nearest Fourier-class angular separation is \(2\pi/23\); classification
becomes unsafe at a phase error of \(\pi/23=0.1365909849\ldots\) radians. The
protocol uses the stricter preregistered margin \(\pi/46\), half that boundary.

## 3. Planning-level shot bound

For an independently sampled bounded estimator in \([-1,1]\), Hoeffding plus
a Bonferroni union bound gives

\[
 n\ge
 \frac{\log(2K/\alpha)}{2\eta^2}
\]

shots per measured real component. Taking \(K=968\) components (real and
imaginary parts of 484 plaquette ratios), familywise \(\alpha=0.01\), and
Euclidean tolerance

\[
 \eta=\sin(\pi/46)=0.06824241336\ldots
\]

gives \(n=1308\), or 1,266,144 component-shots before calibration, readout and
correlation overheads. This is a conservative planning bound, not a promise
about a specific platform: a real likelihood model must replace it before an
experimental claim.

## 4. Measurement sequence and controls

1. Calibrate \(q\), \(\Delta\), the boundary twist and the \(S^z\) charge.
2. Verify \(Z^{23}=1\) sector by sector.
3. Block-encode or otherwise implement the generally nonunitary MPO \(D_\pm\);
   report postselection probability or channel normalization.
4. Measure both fusion residuals
   \(\|ZD-D\|\) and
   \(\|D^2-(\sum Z^k)T(0)\|\) on a preregistered state ensemble.
5. Run detuned controls at \(\Delta=\cos(\pi/23)\pm\delta\) and size controls
   not divisible by 46.
6. Only after W0 passes, prepare four endpoint defects, resolve all 23 middle
   channels and measure the 484 plaquette ratios.
7. Compare the Fourier model against unrestricted complex Hadamard and nearby
   \(s\)-kernel alternatives, not merely against noise.
8. Close the network and measure \(\nu_2(D)\) to reach W2.

Because a noninvertible symmetry need not act as a unitary on one fixed Hilbert
space, the implementation must publish its dilation, postselection or
trace-preserving channel interpretation. Treating \(D\) as an unexplained
unitary gate would test the wrong object.

## 5. Decision table

| Outcome | Conclusion |
|---|---|
| W0 fails at the exact point | this XXZ implementation does not realize the sourced fusion carrier |
| W0 passes, W1 fails | TY-like fusion without the Monster \(23AB\) bicharacter |
| W0 and W1 pass | sourced \(23AB\) defect kernel realized; sign still open |
| W0--W2 pass | full \(\operatorname{TY}(\mathbb Z_{23},\chi,\epsilon)\) realized |
| W0--W2 pass but W3 absent | verified categorical simulator, not yet Monster provenance |
| same-carrier W3 passes | experimental Monster-CFT subtheory candidate |

This makes every failure informative. Detuning can locate whether the observed
structure is root-of-unity protected; W0/W1 disagreement distinguishes fusion
from associator physics; W2 fixes the remaining categorical sign.

## Sources

- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660), eqs. (1), (21)--(25).
- Bartsch, Gai and Schafer-Nameki, [*Beyond Wigner: Non-Invertible Symmetries Preserve Probabilities*](https://arxiv.org/abs/2602.07110).
- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043).

## Corpus links

- [Physical-carrier and provenance ladder](frontier_wave7_114_monster_ty23_carrier_and_provenance_protocol.md)
- [Monster Z23 TY recoupling](frontier_wave7_113_monster_z23_tambara_yamagami_recoupling.md)
