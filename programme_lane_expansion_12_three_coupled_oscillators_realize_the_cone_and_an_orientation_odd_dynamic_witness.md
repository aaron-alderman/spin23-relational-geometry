# Lane Expansion 12: Three Coupled Oscillators Realize the Cone and an Orientation-Odd Dynamic Witness

**Date:** 17 October 2026  
**Lane:** L9, emergent and analogue response  
**Claim status:** exact passive three-oscillator analogue; not evidence for Standard-Model microphysics  
**Certificate:** [verify_programme_three_oscillator_orientation_analogue.mjs](scripts/verify_programme_three_oscillator_orientation_analogue.mjs)

## Result in ordinary language

Two visible masses are connected to one hidden internal mass. Think of the two visible masses as the two ends of a ruler and the hidden mass as a spring-loaded mechanism inside it. The static stiffness can be adjusted to look perfectly left-right symmetric even when the hidden mechanism couples more strongly to one end.

At rest, the two orientations are indistinguishable. When shaken, their diagonal responses differ, and swapping the device end-for-end flips that difference.

This is the smallest concrete analogue found here of the programme's pattern:

\[
\text{same static }H_2(\mathbb R)\text{ carrier}
\quad+\quad
\text{orientation-odd dynamical witness}.
\]

It also shows that this pattern is generic mechanics. The Jordan cone and odd witness do not by themselves imply Furey matter, (E_8), or a fundamental (Spin(2,3)) dynamics.

## 1. Three-coordinate stiffness model

Let (x_1,x_2) be the visible port displacements and (y) the internal displacement. With unit masses, take the real symmetric stiffness matrix in block form

\[
K=
\begin{pmatrix}
A&b\\
b^T&d
\end{pmatrix},
\qquad d>0.
\]

Eliminating (y) from the frequency-domain resolvent gives the two-port dynamic stiffness

\[
S(z)=A-zI-\frac{bb^T}{d-z},
\]

and visible response

\[
G(z)=S(z)^{-1}.
\]

Choose a desired symmetric static port stiffness (K_0), then set

\[
A=K_0+\frac{bb^T}{d}.
\]

It follows exactly that

\[
S(0)=K_0
\]

for any internal coupling vector (b). Many different hidden graphs therefore have the same static two-port behavior.

## 2. Explicit orientation pair

The certificate uses

\[
K_0=
\begin{pmatrix}
3&1/2\\
1/2&3
\end{pmatrix},
\qquad d=5,
\qquad b_+=(1,2)^T.
\]

Reversing the device swaps the ports and gives

\[
b_-=(2,1)^T.
\]

Both devices have exactly the same static response because (K_0) is invariant under the swap. At nonzero frequency,

\[
G_-(z)=P G_+(z)P,
\qquad
P=
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Therefore the balanced diagonal witness

\[
W(z)=G_{11}(z)-G_{22}(z)
\]

obeys

\[
\boxed{W_-(z)=-W_+(z).}
\]

It vanishes at zero frequency and becomes nonzero dynamically because the internal resonance couples unequally to the two ports.

## 3. Positivity and causality

The full stiffness matrix is positive because (d>0) and its static Schur complement (K_0) is positive. For (\operatorname{Im}z>0), the projected resolvent satisfies

\[
\operatorname{Im}G(z)\succ0.
\]

Thus the orientation-odd witness does not require gain, instability or a non-passive component. It lives inside an ordinary Schur-Herglotz two-port response.

The model can be built with masses, springs and lever ratios. The unequal entries (1:2) in (b) are the only special graph datum.

## 4. What the analogue teaches

The model establishes four points.

First, an (H_2(\mathbb R)) response cone is natural for reciprocal two-port mechanics. It is not uniquely quantum or exceptional.

Second, static agreement does not imply dynamical equivalence. Internal modes leave residues and poles that can identify hidden coupling graphs.

Third, orientation can be relational: it is measured by comparing a labelled port pair with an asymmetric internal coupling. Without physical port labels, swapping the ports is merely a relabelling.

Fourth, an orientation-odd response needs an orientation-sensitive component. A perfectly symmetric internal graph gives (W=0).

## 5. Landscape and closure ledgers

### Landscape value

- supplies a literal laboratory-scale realization of the Schur-Herglotz/Jordan carrier;
- gives two microscopically different orientations with identical static response;
- isolates the minimal asymmetric graph datum required by the odd witness;
- offers a calibration and tomography testbed for lanes L1, L4 and L8.

### Closure value

No fundamental closure. The effect is generic to passive three-oscillator networks. It becomes programme-specific only if the Standard-Model/Furey construction derives the same internal coupling graph and fixes which physical operations label and reverse the ports.

## 6. Concrete experiment

Build two visible resonators and one internal resonator. Tune the direct visible couplings so the measured zero-frequency stiffness is (K_0) in both orientations. Couple the internal resonator to the ports with lever ratios (1:2).

Measure the full complex (2\times2) response while sweeping through, but not exactly onto, the internal resonance. Then reverse the device relative to fixed port labels.

The model predicts:

1. identical static response;
2. positive dissipative response with ordinary damping added;
3. (G_{11}-G_{22}) nonzero away from zero frequency;
4. exact sign reversal of that difference under port exchange;
5. unchanged trace and determinant under the reversal.

**Go signal for the analogue:** the dynamic witness distinguishes the two hidden orientations while static tomography cannot.

**Go signal for the fundamental programme:** an independently derived Standard-Model source map fixes the same port labels and asymmetric internal residue, with no fit made to this experiment.

**No-go signal:** the only claimed evidence is the cone or sign flip itself, since both are already realized by this generic spring network.

## Reproducibility

```powershell
node scripts\verify_programme_three_oscillator_orientation_analogue.mjs
```
