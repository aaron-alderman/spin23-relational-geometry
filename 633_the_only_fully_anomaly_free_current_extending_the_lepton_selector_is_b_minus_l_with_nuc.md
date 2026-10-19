# The Only Fully Anomaly-Free Current Extending the Lepton Selector Is \(B-L\) with ν<sup>c</sup>

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B11 and the sixteen-state neutrino branch  
**Claim status:** exact one-generation charge-nullspace and anomaly calculation under the declared Yukawa content  
**Certificate:** [classify_conserved_currents_extending_incidence_lepton_projector.mjs](scripts/classify_conserved_currents_extending_incidence_lepton_projector.mjs)

## Executive result

The incidence projector \(P_L\) selects a well-defined lepton-doublet current, but that current is not conserved by itself and is not quantum anomaly free. Extending it through the charged-lepton Yukawa produces total lepton number, which still has a nonzero \(SU(2)^2-L\) anomaly.

Solving the Yukawa and mixed-gauge anomaly equations gives:

\[
\begin{array}{c|cc}
\text{matter module}&\text{SM-gauge-mixed anomaly free}&\text{including gravity}\\ \hline
15\text{ states}&\operatorname{span}\{Y,B-L\}&\operatorname{span}\{Y\}\\
16\text{ states with }\nu^c&\operatorname{span}\{Y,B-L\}&\operatorname{span}\{Y,B-L\}.
\end{array}
\]

The cubic and mixed abelian anomalies also vanish for every \(aY+b(B-L)\) only after \(\nu^c\) is included. Therefore, modulo already gauged hypercharge,

\[
\boxed{B-L\text{ with }\nu^c\text{ is the unique fully anomaly-free current extension of the lepton branch}.}
\]

## 1. Exact constraints

For a candidate charge \(X\), invariance of the Yukawa operators requires

\[
X_Q+X_H+X_{u^c}=0,
\qquad
X_Q-X_H+X_{d^c}=0,
\qquad
X_L-X_H+X_{e^c}=0.
\]

In the sixteen-state branch, the neutrino Yukawa adds

\[
X_L+X_H+X_{\nu^c}=0.
\]

The linear anomaly constraints include

\[
2X_Q+X_{u^c}+X_{d^c}=0
\qquad [SU(3)^2-X],
\]

\[
3X_Q+X_L=0
\qquad [SU(2)^2-X],
\]

plus \(Y^2-X\) and the mixed gravitational anomaly. Modular exact rank gives nullities \((2,1)\) for the fifteen-state module before and after the gravitational constraint, and \((2,2)\) for the sixteen-state module.

## 2. Why \(P_L\) is not a conserved-current projector

The doublet-only assignment has \(X_L=1\) and all other charges zero. It violates the charged-lepton Yukawa constraint and has

\[
\mathcal A_{SU(2)^2-X}=1.
\]

Adding \(e^c\) with the opposite left-handed charge restores the classical charged-lepton Yukawa symmetry, producing total lepton number. But the weak anomaly remains one per generation:

\[
\mathcal A_{SU(2)^2-L}=1.
\]

Thus neither the raw incidence current nor its minimal classical completion supplies an exactly conserved quantum current.

## 3. Fifteen-state \(B-L\) is still incomplete

Using the integer normalization \(3(B-L)\), the fifteen-state charges are

\[
(Q,u^c,d^c,L,e^c,H)=(1,-1,-1,-3,3,0).
\]

They cancel the mixed Standard-Model gauge anomalies, but their gravitational sum and cubic sum are nonzero. Hence the current may organize perturbative flat-space selection rules, but it cannot be promoted to a fully anomaly-free local response or gauge symmetry without additional content.

## 4. The right-handed-neutrino completion

The left-handed conjugate \(\nu^c\) carries \(3(B-L)_{\nu^c}=3\). Adding it cancels both the gravitational and cubic deficits. The certificate also verifies

\[
\sum mY^3
=\sum mY^2(B-L)
=\sum mY(B-L)^2
=\sum m(B-L)^3
=0.
\]

Therefore every linear combination \(aY+b(B-L)\) is free of the displayed local anomalies. Since \(Y\) is already gauged, \(B-L\) is the only new direction.

This reopens the [unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md) as a direct dependency of the conserved-current branch.

## 5. Tension with pure lepton selection

Anomaly freedom expands rather than sharpens the support:

\[
P_L
\longrightarrow
L\text{ current}
\longrightarrow
\text{lepton number}
\longrightarrow
B-L
\longrightarrow
\text{all quark and lepton sectors plus }\nu^c.
\]

The incidence projector remains useful as the seed or kernel marker, but the conserved response is not confined to \(H_2(\mathbb R)_L\). It must aggregate sector carriers with fixed charge signs and multiplicities.

## 6. Physical interpretations

Three distinct claims remain possible:

1. **Background-current response:** use \(B-L\) only as an anomaly-free probe; no new gauge boson is implied.
2. **Gauged \(B-L\):** introduce a new vector field and symmetry-breaking sector, with direct phenomenological constraints.
3. **Face carrier weighted by \(B-L\):** build a two-topology spectral kernel whose sector residues are weighted by the conserved current. This is algebraically allowed but not automatically different from an ordinary current correlator.

## 7. Stop-everything criteria

Stop the conserved-current bridge if:

1. the topology exchange fails to extend to the \(\nu^c:D\to E\) arrow;
2. adding \(\nu^c\) destroys the incidence kernel or the derived \(P_L\);
3. the two-face \(B-L\) response is merely a repackaging of a standard current two-point function with no new constraint;
4. gauging the current requires unobserved states or symmetry breaking incompatible with bounds;
5. Majorana mass terms explicitly break \(B-L\) without leaving a controlled discrete remnant.

## 8. Next executable gate

Recompute the exchanged Hermitian incidence response on the sixteen-state completed TRO including \(\nu^c\). Determine whether the positive incidence kernel remains \(L\), expands to include \(\nu^c\), or disappears. This decides whether the anomaly-free current branch and the lepton-selector branch coexist in one module.

This gate is resolved in [document 634](634_the_right_handed_neutrino_completion_moves_the_furey_incidence_kernel_from_l_to_nuc.md): the kernel moves from \(L\) to the sterile-neutrino direction, so the two structures do not coexist unchanged.

## Reproducibility

```powershell
node scripts\classify_conserved_currents_extending_incidence_lepton_projector.mjs
```
