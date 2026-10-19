# Frontier wave 4 action audit: a non-scalar self-energy is not a canonical cross-carrier selector

**Date:** 18 October 2026  
**Branch:** W4-B — exceptional/action provenance  
**Status:** exact counterexample and scoped no-go; model-point calculation remains live

## Result

A complete unified action can readily generate a non-scalar Hermitian kernel on the three colour-triplet copies

\[
W=(10,\overline{126}_{5},\overline{126}_{50}).
\]

It does **not** canonically orient that kernel, and it does not simultaneously choose between the two surviving source-incidence rays. The obstruction is stronger than a lack of calculation:

1. the same representation and nonzero coupling support admit continuously different Yukawa ratios and channel weights whose self-energy kernels have no common eigenbasis;
2. symmetry-allowed mass mixing and finite counterterms rotate any loop-selected line;
3. finite-Dirac **support** is Boolean and does not fix the magnitudes or phases needed to orient a Gram matrix;
4. the exceptional action and its triplet kernel contain no typed map to the seven-current source space, so the same action admits both incidence rays.

Thus the action route passes the weak test \(K_W\not\propto I_3\) but fails the wave-4 pass conditions of parameter-independent orientation, counterterm protection, and incidence selection.

## 1. Typed spaces and complete Clebsch data

Take the triplet-copy basis

\[
(T_{10},T_{\overline{126},5},T_{\overline{126},50}).
\]

The established component Clebsch covectors are

\[
q_{QQ}=(1,1,1),\qquad
q_{u^ce^c}=(2,-2,2),\qquad
q_{d^c\nu^c}=(-2,0,0).
\]

The algebraic vector

\[
v_T=(-2,1,1)
\]

obeys \(q_{QQ}v_T=0\) and \(q_{u^ce^c}v_T=-q_{d^c\nu^c}v_T\). This is an exact cancellation in a supplied Clebsch table. It is not yet a dynamically protected mass eigenstate.

For one family, write the symmetric \(10\)- and \(\overline{126}\)-Yukawa coefficients as \(h\) and \(f\). The three coupling rows become

\[
c_{QQ}=(h,f,f),\qquad
c_{u^ce^c}=(2h,-2f,2f),\qquad
c_{d^c\nu^c}=(-2h,0,0).
\]

For families these entries are matrices \(H\) and \(F\), and the channel contraction includes family traces and threshold functions. The \(120\) Yukawa matrix \(G\) is antisymmetric, whereas \(H,F\) are symmetric; it cannot generically enforce the same-family symmetric cancellation \(F=\kappa H\). These representation properties are standard in renormalizable \(SO(10)\) Yukawa sectors; see [Grimus and Kühböck](https://arxiv.org/abs/hep-ph/0607197), while explicit component interactions and Clebsches are treated by [Nath and Syed](https://arxiv.org/abs/hep-ph/0103165) and [Patel and Shukla](https://arxiv.org/abs/2203.07748).

## 2. The most favourable calculable spectral kernel

The cut (spectral) part of a fermion-loop response has positive-Gram form after fixing external momentum and thresholds,

\[
K_W^{\rm loop}=C^\dagger \Omega C,
\qquad
C=\begin{pmatrix}c_{QQ}\\c_{u^ce^c}\\c_{d^c\nu^c}\end{pmatrix},
\qquad
\Omega=\operatorname{diag}(\omega_{QQ},\omega_{ue},\omega_{d\nu}).
\]

The \(\omega_a\) contain cut phase space, multiplicities, masses, momentum and family traces. This is not asserted to be the complete renormalized dispersive self-energy: the latter follows from loop integrals plus subtractions and counterterms and need not itself be positive at every momentum. The spectral Gram is the most favourable part for the proposed mechanism because it uses the full available channel data and automatically yields a Hermitian positive-semidefinite matrix when \(\omega_a\ge0\). A failure already here cannot be repaired into a parameter-independent orientation by adding freely variable dispersive and local terms.

At \(h=f=1\) and \(\Omega=I\),

\[
K_1=
\begin{pmatrix}
9&-3&5\\
-3&5&-3\\
5&-3&5
\end{pmatrix}.
\]

This is non-scalar. But

\[
K_1(1,1,1)^T=(11,-1,7)^T,
\]

so the desired danger line is not an eigenline, and

\[
K_1(-2,1,1)^T=(-16,8,-8)^T,
\]

so the algebraically safe line is not an eigenline either. The complete action does not select the desired plane even at this symmetric benchmark.

## 3. Exact same-support counterexample

Keep every Clebsch channel present and change only the allowed Yukawa ratio from \((h,f)=(1,1)\) to \((2,1)\). Then

\[
K_2=
\begin{pmatrix}
36&-6&10\\
-6&5&-3\\
10&-3&5
\end{pmatrix}.
\]

Direct calculation gives

\[
[K_1,K_2]=
\begin{pmatrix}
0&84&-124\\
-84&0&0\\
124&0&0
\end{pmatrix}\ne0.
\]

Therefore the two admissible action points do not even share a complete eigenbasis. No triplet-copy ray can be called canonical from representation content and support alone.

Varying the positive threshold weights \(\omega_a\), fermion masses, scalar thresholds or family matrices enlarges this counterexample family. A fully specified model point can predict a kernel; the action **class** cannot provide a parameter-independent orientation.

## 4. Why the tempting rank-one answer imports \(q_{QQ}\)

If all channels except \(QQ\) are discarded and \(h=f\), then

\[
K_W^{QQ}\propto q_{QQ}^\dagger q_{QQ}.
\]

Its nonzero eigenspace is exactly the desired danger line. But this construction inserted the \(QQ\) row, assumed the equality of its three Yukawa-dressed coefficients, and omitted the rest of the action. It is a valid conditional realization, not an independent derivation.

Even within the \(QQ\)-only truncation, \(h\ne f\) changes the danger covector to \((h,f,f)\). Thus the equal-coefficient direction is not protected by the mere existence of the invariant.

## 5. Masses, renormalization and counterterms

The physical inverse propagator is schematically

\[
\Gamma_W^{(2)}(p^2)=p^2Z_W-M_W^2-\Pi_W(p^2)-\delta M_W^2-p^2\delta Z_W.
\]

Triplets with identical unbroken Standard-Model quantum numbers permit Hermitian copy-space mixing unless an additional character distinguishes them. The divergent part of \(\Pi_W\) requires the corresponding mass and wave-function counterterms. Their finite parts depend on the renormalization prescription.

An exact counterexample starts from the rank-one \(QQ\) matrix \(q^Tq\) and adds the allowed Hermitian finite term

\[
\Delta=
\begin{pmatrix}0&\epsilon&0\\\epsilon&0&0\\0&0&0\end{pmatrix}.
\]

For any \(\epsilon\ne0\),

\[
(q^Tq+\Delta)q^T=(3+\epsilon,3+\epsilon,3)^T,
\]

which is not parallel to \(q^T\). A loop eigenvector of an off-shell two-point function is therefore not a scheme-independent selector. Pole locations and complete pole residues can be physical after all parameters and external vertices are fixed, but their copy-space orientation still varies across symmetry-allowed Lagrangians. That is conditional prediction, not canonical provenance.

## 6. Finite Dirac support does not repair the problem

Suppose finite geometry says only that a set of edges between three source or arrow components and the three triplet copies is nonzero. Two finite Dirac matrices can have identical support but different entries. Their positive operators \(D_F^\dagger D_F\) can fail to commute, hence select incompatible spectral lines.

The verifier supplies an explicit full-support pair and checks

\[
[D_1^TD_1,D_2^TD_2]\ne0.

\]

Accordingly, support can prove that a response is allowed or forbidden. It cannot fix a normalized Clebsch/Yukawa metric. A non-scalar finite kernel becomes canonical only if an additional symmetry fixes its coefficients and forbids every rotating counterterm.

## 7. The simultaneous incidence-ray test

The seven-current basis is

\[
(Q,u^c,d^c,L,e^c,\nu^c,H),

\]

with Yukawa-incidence matrix rows

\[
v_u=(1,1,0,0,0,0,1),\quad
v_d=(1,0,1,0,0,0,-1),
\]
\[
v_e=(0,0,0,1,1,0,-1),\quad
v_\nu=(0,0,0,1,0,1,1).
\]

The two live rays are

\[
\lambda_D=(5,5,1,1,1,0,0),\qquad
\lambda_M=(5,5,1,1,3,0,0),
\]

and

\[
V\lambda_D=(10,6,2,1),\qquad
V\lambda_M=(10,6,4,1).
\]

Fixing \(K_W\), all exceptional masses and every exceptional Yukawa parameter does not distinguish these rays: either source vector can be coupled to the same action. The difference is entirely in the charged-lepton response coefficient. No tensor in the audited action has one leg in \(W\) and one leg in this seven-current source space.

Therefore a radiative triplet self-energy cannot **simultaneously** orient \(W\) and choose \(\lambda_D\) versus \(\lambda_M\) without adding precisely the missing cross-carrier intertwiner. Feeding \(q_{QQ}\) into such a map by hand merely relocates the import.

## 8. Classification

| proposition | status | reason |
|---|---|---|
| A complete action can produce \(K_W\not\propto I_3\) | **established** | explicit positive Gram matrix |
| Its eigenspaces are canonical from representation/support alone | **no-go in the stated action class** | same-support Yukawa points give noncommuting kernels |
| A loop-only eigenline is counterterm/scheme independent | **no-go** | allowed Hermitian finite counterterm rotates it |
| A fully specified renormalized action predicts pole mixing | **conditional and live** | requires all masses, couplings, scheme conditions and vertices |
| Finite Dirac support fixes the orientation | **no-go** | equal support admits noncommuting \(D_F^\dagger D_F\) |
| The same mechanism selects an incidence ray | **no-go for the audited data** | no typed \(W\leftrightarrow\mathcal H_{\rm source}\) map |

## 9. Stop condition and reopening datum

W4-B stops here as a provenance route. More loop integration cannot remove a continuous freedom already present in tree-level Yukawas and allowed counterterms.

The branch reopens only with at least one of:

1. an exact symmetry character that distinguishes the three triplet copies and fixes a nondegenerate \(K_W\);
2. a UV matching condition that fixes the relevant Yukawa ratios and forbids rotating finite counterterms;
3. a typed cross-carrier tensor
   \[
   Y_F:\mathcal H_{\rm source}\to W
   \]
   whose coefficients are derived independently of \(q_{QQ}\), and whose Gram operator has a protected simple eigenspace;
4. a measured pole-residue matrix plus calibrated source response, which would determine the orientation operationally rather than canonically.

The surviving statement is sharp: **the unified action can calculate a non-scalar triplet response at a chosen model point, but neither its representation content, its finite support nor its radiative self-energy canonically supplies the missing cross-carrier selector.**

## Verification

Run:

```powershell
node scripts/verify_frontier_wave4_action_no_canonical_selector.mjs
```

The script checks the two Gram kernels, their nonzero commutator, failure of both named rays to be eigenvectors, counterterm rotation, the finite-support counterexample, and paired incidence admission.
