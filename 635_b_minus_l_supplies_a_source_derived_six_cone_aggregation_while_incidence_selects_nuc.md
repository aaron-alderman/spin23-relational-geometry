# (B-L) Supplies a Source-Derived Six-Cone Aggregation While Incidence Selects ν<sup>c</sup>

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B11 and the sixteen-state neutrino branch  
**Claim status:** exact commutant classification and free-current ultraviolet weighting; interacting spectral weights remain open  
**Certificate:** [classify_sixteen_state_sm_bl_face_kernels.mjs](scripts/classify_sixteen_state_sm_bl_face_kernels.mjs)

## Executive result

On the sixteen-state module

\[
\mathcal M_{16}=Q\oplus u^c\oplus d^c\oplus L\oplus e^c\oplusν^c,
\]

the exact Standard-Model commutant is

\[
\boxed{\operatorname{End}_{SM}(\mathcal M_{16})\cong\mathbb C^6.}
\]

Adding the anomaly-free \(B-L\) generator does not reduce it further. On two topology faces, exchange-fixed positive kernels therefore form

\[
\boxed{\bigoplus_{r=1}^{6}H_2(\mathbb R)_{r,+}.}
\]

The incidence law and the conserved current act differently:

\[
\begin{aligned}
\text{incidence zero projector}&=P_{ν^c},\\
\text{free }B-L\text{ current correlator}&=\sum_rw_rK_r,
\end{aligned}
\]

where equal ultraviolet residue per component gives

\[
\boxed{
(w_Q,w_{u^c},w_{d^c},w_L,w_{e^c},w_{ν^c})
=\frac1{16}(2,1,1,6,3,3).
}
\]

This is a source-derived aggregation rule, not an arbitrary point of the five-simplex, although it is not yet an all-scale interacting prediction.

## 1. Exact commutant rank

The certificate constructs all sixteen even-Fock states and uses physical color roots, weak roots and \(Y_6=6Y\). The commutator equations for an unknown \(16\times16\) matrix have exact modular rank

\[
250
\]

in a 256-dimensional endomorphism space. Hence the nullity is six. The six sector projectors are explicit independent solutions, proving

\[
\operatorname{End}_{SM}(\mathcal M_{16})
=\bigoplus_{r\in\{Q,u^c,d^c,L,e^c,ν^c\}}\mathbb CP_r.
\]

Including \(3(B-L)\) leaves the rank at 250 because it is already scalar on those irreducible sectors.

## 2. Two-face response classification

The face doublet is gauge neutral, so

\[
\operatorname{End}_{SM}(\mathbb C^2_{A/B}\otimes\mathcal M_{16})
\cong\bigoplus_{r=1}^6M_2(\mathbb C)_r.
\]

Antiunitary exchange fixes the population-normal real form in each sector:

\[
K_r=
\begin{pmatrix}
n_r&c_r\\
\bar c_r&n_r
\end{pmatrix},
\qquad n_r\ge |c_r|.
\]

Thus the sixteen-state completion enlarges the earlier five-cone classification to six cones. It does not collapse them into one.

## 3. Incidence selection

The completed incidence Laplacian is

\[
\Lambda_{16}
=5(P_Q+P_{u^c})+P_{d^c}+P_L+P_{e^c}.
\]

Its zero-spectral projector is

\[
P_{ν^c}=\frac{(\Lambda_{16}-I)(\Lambda_{16}-5I)}5.
\]

Incidence therefore selects one sector cone:

\[
P_{ν^c}left(\bigoplus_rH_2(\mathbb R)_r\right)P_{ν^c}
\cong H_2(\mathbb R)_{ν^c}.
\]

## 4. (B-L) current aggregation

For the integer charges

\[
3(B-L)=(1,-1,-1,-3,3,3),
\]

a free diagonal current two-point function has positive residue proportional to

\[
d_r[3(B-L)_r]^2.
\]

Using sector dimensions \((6,3,3,2,1,1)\) gives raw weights

\[
(6,3,3,18,9,9),
\]

whose sum is 48. Normalization yields

\[
\left(\frac18,\frac1{16},\frac1{16},\frac38,\frac3{16},\frac3{16}\right).
\]

Charge signs disappear in diagonal positive spectral residues because the correlator contains charge squared. Signed charges remain essential in mixed correlators and Ward identities.

## 5. What is new

In the fifteen-state branch, a state on the sector center remained largely arbitrary. Here the choice of physical source supplies an aggregation functional:

\[
\text{choose anomaly-free }B-L\text{ current}
\Longrightarrow
\text{charge-squared sector state}.
\]

This is conditional but non-generic. It shows how a conserved source can reduce the simplex ambiguity without asking gauge symmetry alone to do so.

## 6. Interacting caveats

The displayed weights assume free or ultraviolet-diagonal propagation with equal normalization per component. In the interacting theory:

- thresholds make weights run;
- current correlators contain continuum spectral densities;
- sectors can mix through shared intermediate states;
- symmetry breaking and Majorana masses can violate \(B-L\);
- contact terms and renormalization affect decompositions, though the conserved total current has protected Ward identities.

The exact prediction is the charge rule, not the finite-scale numerical weights without further dynamics.

## 7. Stop-everything criteria

Stop treating the \(B-L\) aggregate as a new carrier prediction if:

1. it is observationally and mathematically identical to an ordinary \(B-L\) current correlator with no extra face constraint;
2. the second face cannot be realized without propagating mirror matter;
3. Majorana dynamics breaks \(B-L\) at the same scale with no controlled remnant;
4. interacting cross-sector measures cannot be compressed into the exchange-fixed cone;
5. the sterile incidence projector has no role in the current response.

## 8. Next gates

1. Compute whether (P_{ν^c}) and the \(B-L\) charge operator generate a canonical two-dimensional commutative algebra or merely two unrelated elements of \(\mathbb C^6\).
2. Add a Majorana mass for (ν^c) and determine the surviving discrete symmetry and face spectral kernel.
3. Compare the free charge-squared weights with ultraviolet current central charges in an interacting calculation.
4. Test whether the neutrino Peirce corner of the completed linking \(M_3\) realizes the same (H_2(\mathbb R)) cone as the external face response.

## Reproducibility

```powershell
node scripts\classify_sixteen_state_sm_bl_face_kernels.mjs
```
