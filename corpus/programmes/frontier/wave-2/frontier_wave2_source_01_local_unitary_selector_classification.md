# Frontier Wave 2 — Local Unitary Source Selection

**Date:** 18 October 2026  
**Branch:** physical source realization / Kantor–Furey interface  
**Status:** exact finite-dimensional classification under stated source assumptions  
**Certificate:** [classify_frontier_wave2_local_source_actions.mjs](../../../../verification/classify/classify_frontier_wave2_local_source_actions.mjs)

## Result

The smallest familiar local source actions do **not** select between the two surviving Furey incidence rays.

In the all-left basis

\[
(Q,u^c,d^c,L,e^c,\nu^c,H),
\]

the candidates are

\[
\lambda_d=(5,5,1,1,1,0,0),
\qquad
\lambda_m=(5,5,1,1,3,0,0).
\]

Their physical source coordinates are

\[
\lambda_d\mapsto (10,6,2,1;16),
\qquad
\lambda_m\mapsto (10,6,4,1;16),
\]

where the first four entries are the up, down, charged-lepton and neutrino Yukawa-divergence coordinates and the last is the independent weak-anomaly coordinate.

The classification gives a paired result:

| proposed selector | deduplicated ray | multiplicity ray | verdict |
|---|---:|---:|---|
| real nondynamical vector source | admitted | admitted | parameterizes; does not select |
| derivative ALP source | admitted | admitted | shift symmetry does not select |
| exact new gauged \(U(1)\), with no extra completion | rejected | rejected | both break Yukawas and are anomalous |
| multiplicatively closed one-ray RG sector | rejected | rejected | neither is an eigenray |
| Furey electron-channel topology alone | admitted projectively | admitted projectively | channel fixed, coefficient not fixed |

Thus none of locality, Hermiticity/unitarity, shift symmetry, anomaly consistency, leading RG stability, or the presently derived Furey topology accepts exactly one ray.

## 1. What “selection” must mean

A source action selects a ray only if its consistency conditions determine the relative coefficients of the current. Writing down

\[
S_{\rm src}[x]=\int d^4x\,s_\mu\sum_r x_rj_r^\mu
\]

for a chosen vector \(x\) is a realization, not a derivation. The action is local and Hermitian for every real \(x\). Those properties therefore constrain the coefficient field, but not a direction inside it.

The same distinction applies to a scalar derivative source:

\[
\mathcal L_{aJ}=\frac{\partial_\mu a}{f_a}J_x^\mu.
\]

It is invariant under the perturbative shift \(a\mapsto a+c\) for every \(x\). Shift symmetry explains why the coupling is derivative; it does not choose which current appears.

## 2. Exact Yukawa and anomaly images

Use

\[
V=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

Then

\[
V\lambda_d=(10,6,2,1),
\qquad
V\lambda_m=(10,6,4,1).
\]

With the declared one-generation anomaly rows \((A_3,A_2,A_{Y^2},A_{\rm grav})\),

\[
A\lambda_d=(16,16,336,51),
\qquad
A\lambda_m=(16,16,408,53).
\]

This corrects a potentially misleading shorthand. The rays have the same \(A_3\) and \(A_2\), but not the same raw hypercharge-squared or gravitational anomaly numbers. In the physical quotient, however, the latter are determined by the Yukawa coordinates and \(A_2\):

\[
A_3=v_u+v_d,
\]

\[
A_{Y^2}=48v_u+12v_d+36v_e-18A_2,
\]

\[
A_{\rm grav}=3v_u+3v_d+v_e+v_\nu.
\]

So anomaly data reveal the electron-coordinate fork; they do not create an independent selection law.

## 3. Nondynamical vector source: both admitted

For an external real one-form \(s_\mu\), both

\[
s_\mu J_{\lambda_d}^\mu
\quad\hbox{and}\quad
s_\mu J_{\lambda_m}^\mu
\]

are local, Lorentz covariant, Standard-Model gauge singlets and Hermitian. The source need not gauge an exact symmetry, so current nonconservation and 't Hooft anomalies appear in Ward identities rather than making the source illegal.

Finite source normalization and mixing remain choices. The free-action Gram can choose a \(B-L\)-orthogonal representative after a fork has been chosen, but it cannot choose the fork itself.

## 4. Dynamical vector gauge field: both rejected without new data

If the source is promoted to an exact \(U(1)_X\) gauge field without additional Higgs spurions, spectator fermions or Wess–Zumino data, consistency requires at least

\[
Vx=0
\quad\hbox{and}\quad
Ax=0.
\]

Neither incidence ray satisfies either condition. Allowing a Higgs charge \(h\) cannot repair all four Yukawa violations:

\[
V(\lambda_d+h e_H)=(10+h,6-h,2-h,1+h),
\]

and similarly with \(2\to4\) for \(\lambda_m\). No single \(h\) makes all entries vanish.

Extra matter, extra scalars, Green–Schwarz/Wess–Zumino terms, or spurionic Yukawas can complete a model. But their charges and couplings are new selection data; anomaly cancellation in such a completion cannot retrospectively be counted as a derivation from the original topology.

## 5. Derivative ALP: both admitted

The minimal gauge-invariant dynamical realization is

\[
\mathcal L=\mathcal L_{\rm SM+\nu_R}
+\frac12(\partial a)^2-\frac12m_a^2a^2
+\frac{\partial_\mu a}{f_a}J_{\lambda_s}^\mu,
\qquad s\in\{d,m\}.
\]

For either choice this is local and Hermitian, and the derivative interaction obeys the ALP shift symmetry. Integration by parts exposes the Yukawa-breaking and gauge-topological amplitudes listed above. The anomalies are physical couplings, not a rule that one of the two source currents must be discarded.

The completed \(B-L\) vector

\[
q=3(B-L)=(1,-1,-1,-3,3,3,0)
\]

obeys

\[
Vq=Aq=0.
\]

Therefore every shear \(\lambda_s+cq\) gives the same derivative-ALP observables. Shift symmetry removes neither this shear nor the discrete electron-normalization fork.

## 6. RG stability: both rejected as one-ray sectors

The smallest exact shared-field Yukawa block is

\[
M=
\begin{pmatrix}
\frac32&-\frac56&-1&1\\
-\frac56&\frac32&1&-1\\
-1&1&\frac52&-\frac12\\
1&-1&-\frac12&\frac52
\end{pmatrix}.
\]

Neither \((10,6,2,1)\) nor \((10,6,4,1)\) is an eigenvector of \(M\). Hence neither source defines a multiplicatively closed one-parameter running sector. This is a no-go for “RG stability selects the correct incidence ray”: the criterion rejects both.

It is not a no-go for the ALP benchmarks. A declared ultraviolet ray can be evolved in the full coefficient space, as standard ALP effective theory requires.

## 7. Furey topology: a channel selector, not a coefficient selector

The Furey calculation has already established a robust sterile-neutrino kernel and a unique electron cycle. The electron cycle identifies the charged-lepton response channel. What has not been derived is a metric or measure turning either

- “count this sector once”, or
- “count all three electron incidences”

into the mandatory source normalization.

The two rules produce the nonzero electron entries \(1\) and \(3\) in current space, hence \(2\) and \(4\) after the Yukawa-divergence map. Because the presently derived topology supplies a projective response line but not its normalization, both points remain on the allowed line. Local source theory cannot manufacture the missing measure.

## 8. Paired-admission/paired-rejection theorem

### Theorem

Assume that:

1. the source couples linearly to Standard-Model phase currents;
2. its coefficients are real, so the action is Hermitian;
3. admissibility uses only Standard-Model gauge covariance, locality, ALP shift symmetry, cancellation conditions for an exact new gauge symmetry, leading shared-field RG closure, and the already-derived projective Furey electron channel;
4. no extra spectator spectrum, topology-to-current metric, boundary normalization, or UV matching coefficient is inserted.

Then none of these conditions uniquely chooses \(\lambda_d\) over \(\lambda_m\), or vice versa. Local external-source and derivative-ALP conditions admit both. Exact gauging and one-ray RG closure reject both. The Furey datum fixes their common charged-lepton channel but not its coefficient.

### Consequence

The remaining selector cannot be another generic source-consistency condition of this class. It must be new relational data: an action-derived topology-to-current intertwiner, a normalized boundary state, a combinatorial measure justified independently of the desired answer, or an observed amplitude ratio.

## 9. What would stop everything

Any one of the following would overturn the no-selector result:

1. an equivariant Furey-to-QFT map that fixes the norm of the electron response line and yields exactly \(1\) or \(3\);
2. a UV completion whose anomaly/Yukawa consistency equations have exactly one of the two rays as their restriction, without ray-specific spectator choices;
3. an exact RG invariant manifold containing one incidence ray but not the other after the full operator basis is included;
4. a boundary or Nambu construction whose canonical state fixes the electron-face weight and survives gauge covariance and contact grading.

Absent one of these, the honest physical output is a two-hypothesis benchmark, not a unique derived current.

## Literature boundary

The general derivative-ALP basis, field-redefinition redundancies, weak matching and low-energy theory are standard; see [Bauer, Neubert, Renner, Schnubel and Thamm](https://arxiv.org/abs/2012.12272). Complete one-loop dimension-five running is treated by [Chala, Guedes, Ramos and Santiago](https://arxiv.org/abs/2012.09017). The incidence vectors, their Furey origin and the paired selector obstruction are programme-specific.

