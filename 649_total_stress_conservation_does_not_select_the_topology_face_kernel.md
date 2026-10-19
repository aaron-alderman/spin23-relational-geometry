# Total-Stress Conservation Does Not Select the Topology-Face Kernel

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B07, B08 and B11  
**Claim status:** exact Ward-factorization counterexample; microscopic stress/topology coupling remains open  
**Certificate:** [test_stress_ward_identity_does_not_select_face_kernel.mjs](scripts/test_stress_ward_identity_does_not_select_face_kernel.mjs)

## Executive result

The conserved total Standard-Model stress tensor is the correct universal gravitational source. Its Ward identity does not determine the topology-face matrix multiplying its Lorentz spectral structures.

Schematically, a two-face stress spectral density decomposes as

\[
\rho_{ab}^{\mu\nu,\rho\sigma}(p)
=\sum_s
P_s^{\mu\nu,\rho\sigma}(p)K_{s,ab}(p),
\]

where \(P_s\) are transverse Lorentz spin projectors and \(K_s\) are positive face matrices. Conservation constrains

\[
p_\mu P_s^{\mu\nu,\rho\sigma}=0.
\]

It places no further condition on \(K_s\).

Consequently the same total-stress Ward identity admits both rank-one and full-rank topology carriers:

\[
\boxed{
\text{stress conservation and universality}
\not\Rightarrow
\text{topology-face phase or rank selection}.
}
\]

## 1. Exact rest-frame counterexample

Order the ten components of a symmetric tensor as

\[
(00,01,02,03,11,12,13,22,23,33).
\]

At timelike rest momentum

\[
p=(\omega,0,0,0),
\]

the Ward identity sets the first four components to zero and leaves the six-dimensional spatial symmetric subspace.

Let \(P_{\rm spatial}\) be the positive projector onto that subspace. Both spectral tensors

\[
P_{\rm spatial}\otimes
\begin{pmatrix}1&1\\1&1\end{pmatrix}
\]

and

\[
P_{\rm spatial}\otimes
\begin{pmatrix}1&0.2\\0.2&1\end{pmatrix}
\]

are positive and exactly conserved. The first face factor has rank one; the second has rank two.

The certificate verifies the Ward equations directly. Their total spectral ranks are respectively six and twelve, while their Lorentz conservation data are identical.

## 2. Why universal gravitational coupling is insufficient

Universality says that one metric couples to the total tensor

\[
T_{\mu\nu}^{\rm total}
=-\frac2{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}.
\]

It fixes which Standard-Model operator carries the Lorentz indices. It does not create a second topology source, determine an off-diagonal face correlator, or lift the Furey exchange into the stress-source algebra.

The earlier interaction-closure result remains essential: sector stress cannot be used as independently conserved gravity. But moving to total stress solves conservation only; it does not solve the face-carrier problem.

## 3. Spin decomposition does not change the conclusion

Refining the six spatial components into trace spin-zero and traceless spin-two parts replaces \(P_{\rm spatial}\) by orthogonal Lorentz projectors. Each can still be tensored with an arbitrary admitted positive exchange-fixed face matrix:

\[
\rho=P_2\otimes K_2+P_0\otimes K_0.
\]

Ward identities and Lorentz positivity constrain the coefficients and support of \(P_2,P_0\). They do not force

\[
K_s\propto I,
\qquad
\det K_s>0,
\qquad
\text{or a particular exchange phase}.
\]

## 4. Comparison with the other source candidates

The three leading branches now separate cleanly:

| Source | What it derives | What it does not derive |
|---|---|---|
| Higgs-dressed electron | overlapping helicity rays and full boundary rank for \(p\ne0\) | Furey topology/chirality identification |
| \(B-L\) current | anomaly-free six-sector weights | face phases or second face direction |
| total stress | conserved universal Lorentz source | face kernel, phase or rank |

No one branch currently supplies every arrow.

## 5. Surviving stress routes

The total-stress route remains viable in three conditional forms:

1. a Furey source lift independently supplies two face operators whose correlator is then constrained by the stress Ward identity;
2. boundary geometry supplies two stress ports with a physical exchange relation;
3. an action-level topology auxiliary field couples to two distinct stress-derived composite channels.

In each case conservation is a consistency condition after the face structure is constructed, not its origin.

## 6. Stop-everything criteria

Stop claiming that ordinary stress conservation selects the Jordan carrier if:

1. the Ward identity acts only on Lorentz indices;
2. both rank-one and rank-two face matrices satisfy it;
3. no second metric, boundary port or composite source is identified;
4. the off-diagonal face response is inserted by hand;
5. universality of gravity is used as a substitute for a Furey-to-source functor.

## 7. Next gates

1. Search for a source-algebra lift of the Furey exchange common to the electron, current and stress constructions.
2. Classify mixed correlators between incidence-selected and conserved operators, where signs and orientations may survive.
3. Test whether a two-boundary/domain-wall stress response supplies physical face ports.
4. Keep total stress as the universal Lorentz source, but pin topology rank pending one of those bridges.

## Reproducibility

```powershell
node scripts\test_stress_ward_identity_does_not_select_face_kernel.mjs
```
