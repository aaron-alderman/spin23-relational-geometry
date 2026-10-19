# Lane Expansion 18: Local RG Fixes Yukawa Incidence but Not a Running Broken Eigenframe

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, background-source response  
**Claim status:** structural local-RG result; explicit Standard-Model source counterterm coefficient still to be calculated  
**Certificate:** [verify_programme_local_rg_incidence_and_scheme_boundary.mjs](scripts/verify_programme_local_rg_incidence_and_scheme_boundary.mjs)

## Result

The fixed-point result survives into the running theory in a weaker but useful form.

Treat the four Yukawa couplings as **spurions**: adjustable labels which are assigned transformation rules so that the Lagrangian keeps track of symmetries broken by those couplings. Couple the seven field-phase currents to background gauge fields

\[
A_\mu=(A_Q,A_u,A_d,A_L,A_e,A_N,A_H)_\mu.
\]

Their only appearance in a derivative of a one-generation Yukawa spurion is

\[
D_\mu y_a=\partial_\mu y_a+i(V_HA_\mu)_a y_a.
\]

Consequently, the leading order-
\(y^2\) vector-source running must pass through the same four-row incidence map \(V_H\). In a conventional free-field normalization it has a representative of the form

\[
\boxed{\Gamma_A=D^{-1}V_H^T F(y,g,\lambda)V_H,}
\]

where \(F\) is a four-by-four spurion/descendant metric. At the leading free contraction,

\[
F\propto\operatorname{diag}
(3|y_t|^2,3|y_b|^2,|y_\tau|^2,|y_\nu|^2).
\]

This fixes the protected kernel and the number of broken directions. It does **not** select a scheme-independent set of four running eigenvectors.

## 1. What local RG adds

Ordinary renormalisation-group equations let couplings vary with the ruler used to inspect the theory. **Local RG** temporarily lets those couplings vary from place to place. This is like replacing a single temperature dial with a temperature map: gradients expose responses that a uniform setting cannot see.

In local RG, a background vector source has a beta function of the form

\[
B_\mu^a=\widehat\rho_I^{\ a}D_\mu g^I.
\]

The same source formalism gives a nonconservation equation

\[
D_\mu J_a^\mu
=h_{ab}T^{bI}{}_{J}g^J\mathcal O_I
\]

and a corresponding Higgs-like relation between vector anomalous dimensions and the symmetry action on scalar couplings. Here “Higgs-like” means only that a direction becomes nonconserved when the couplings charged under it are nonzero; it does not assert a new physical Higgs particle.

For the seven phase rotations, the transformation matrix \(Tg\) is precisely encoded by the four Yukawa charge rows of \(V_H\). Thus local RG supplies the missing conceptual bridge from current nonconservation to running background sources.

## 2. Exact information that survives

The incidence matrix is

\[
V_H=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

It has rank four and

\[
\ker V_H=\operatorname{span}\{Y,B,L\}.
\]

Therefore, whenever \(F\) is nondegenerate on the four nonzero Yukawa channels,

\[
\boxed{
\operatorname{rank}\Gamma_A=4,
\qquad
\ker\Gamma_A=\operatorname{span}\{Y,B,L\}.
}
\]

This is the robust content. Quotienting the gauged hypercharge direction leaves two classically protected global currents, \(B\) and \(L\), plus four Yukawa-broken source directions. Anomalies then distinguish the exact combination \(B-L\).

The leading diagonal form of \(F\) follows because the four Yukawa descendants contain different right-handed fields. Their free cross-correlators vanish. Gauge and higher-loop corrections can change \(F\), but compensated gauge invariance still requires the vector beta function to factor through the spurion charge action.

## 3. Why a preferred running eigenframe is not yet physical

A **renormalisation scheme** is a convention for separating a measured response into a scale-dependent parameter and a finite remainder. It is comparable to choosing coordinates on a map: landmarks should survive, while their coordinate components need not.

Let \(J'=S(g)J\) be a finite change of basis among current representatives. Its anomalous-dimension matrix transforms as

\[
\Gamma' = S\Gamma S^{-1}
-(\beta^I\partial_I S)S^{-1}.
\]

At a fixed point, \(\beta=0\). The transformation is then a similarity transformation: scaling dimensions are invariant, although the coordinate vectors used to display the eigenoperators rotate.

Along a running Standard-Model trajectory, the second term is present. A coupling-dependent change of source coordinates acting only on the four-dimensional broken quotient can change even the displayed instantaneous eigenvalues while fixing \(Y,B,L\) pointwise. The certificate constructs both kinds of transformation explicitly.

It follows that the top-dominated direction found in Result 17 is meaningful as the leading eigenoperator at a weak fixed point, and useful in a declared minimal-subtraction-like convention along a flow. It is not yet a convention-free physical axis of the running Standard Model.

## 4. The sharper programme boundary

The local-RG extension resolves the earlier fork asymmetrically:

- **Go:** the Yukawa hypergraph is genuinely built into the background-source RG. Its rank, protected kernel and factorisation are structural.
- **No-go:** diagonalising a running source anomalous-dimension matrix does not by itself reveal a preferred physical pair of currents.

To promote a broken direction to an observable, it must be anchored by a physical renormalisation condition, for example a specified noncontact form factor at fixed momentum and external states. That replaces “choose the eigenvector of this scheme-dependent matrix” with “choose the source combination producing this measured response.”

The next calculation should therefore not be another abstract diagonalisation. It should select a concrete amplitude, compute the seven current insertions, remove contact and equation-of-motion pieces, and ask whether the resulting response has a stable low-rank direction.

## 5. Novelty and caution

This result is an application and synthesis of established local-RG structure, not a claim to have discovered vector beta functions. Its programme-specific content is the explicit seven-to-four Standard-Model Yukawa incidence factorisation and the separation of:

1. scheme-stable protected data;
2. fixed-point spectral data;
3. running coordinate data requiring an observable anchor.

The overall one-loop coefficient and every allowed contact/EOM term have not yet been obtained from Standard-Model Feynman diagrams. The boxed factorisation is therefore a structural theorem under power-counting local RG, not a substitute for that calculation.

## Primary literature boundary

- [Nakayama, *Vector Beta function*](https://arxiv.org/abs/1310.0574) develops compensated gauge invariance, the vector beta function, the nonconservation identity and the Higgs-like anomalous-dimension relation.
- [Giombi and Kirilin, weakly broken currents](https://arxiv.org/abs/1601.01310) supplies the fixed-point descendant-norm method used in Result 17.
- [Jenkins, Manohar and Trott, Yukawa-dependent SMEFT running](https://arxiv.org/abs/1310.4838) illustrates the full operator-mixing machinery required once one chooses physical insertions beyond the structural source analysis.

## Reproducibility

```powershell
node scripts\verify_programme_local_rg_incidence_and_scheme_boundary.mjs
```
