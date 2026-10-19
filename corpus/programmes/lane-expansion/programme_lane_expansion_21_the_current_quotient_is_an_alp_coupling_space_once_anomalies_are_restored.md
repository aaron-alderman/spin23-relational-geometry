# Lane Expansion 21: The Current Quotient Is an ALP Coupling Space Once Anomalies Are Restored

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, operational probes; L9, anomaly topology  
**Claim status:** exact one-generation linear map under stated conventions; phenomenology is established ALP EFT territory  
**Certificate:** [verify_programme_alp_completion_of_current_quotient.mjs](../../../verification/verify/verify_programme_alp_completion_of_current_quotient.mjs)

## Result

The cleanest dynamical probe of the seven phase currents is an axion-like particle (ALP) with derivative coupling

\[
\mathcal L_{aJ}=\frac{\partial_\mu a}{f}\,J_x^\mu.
\]

An **axion-like particle** is a light pseudoscalar whose interactions are approximately unchanged when \(a\) is shifted by a constant. The derivative above automatically respects that shift.

After integration by parts,

\[
\mathcal L_{aJ}=-\frac{a}{f}\,\partial_\mu J_x^\mu,
\]

so the four-row Yukawa incidence map derived in this programme is exactly the map from derivative ALP charges to chirality-changing ALP couplings.

But there is an essential addition. Chiral phase rotations have quantum anomalies, so the divergence also contains gauge-field topological densities such as \(G\widetilde G\), \(W\widetilde W\) and \(B\widetilde B\). Restoring them changes the rank count:

\[
\boxed{
\operatorname{rank}V_H=4,
\qquad
\operatorname{rank}\begin{pmatrix}V_H\\A_{\rm anomaly}\end{pmatrix}=5.
}
\]

The combined kernel is

\[
\boxed{
\ker(V_H,A_{\rm anomaly})
=\operatorname{span}\{6Y,3(B-L)\}.
}
\]

After quotienting gauged hypercharge, the six-dimensional external-source space contains five ALP-active directions and one completely nonanomalous conserved direction, \(B-L\).

## 1. A day-to-day picture

Imagine seven labelled handles attached to the Standard-Model fields. Pulling a handle means changing that field's phase. The four Yukawa couplings are four linkages joining the handles. The incidence matrix records which linkages are strained by any proposed pull.

Classically, three coordinated pulls strain no Yukawa linkage: hypercharge, baryon number and lepton number. Quantum mechanically, baryon and lepton pulls turn a hidden cog together—the electroweak anomaly. Only the opposing combination \(B-L\) leaves both the visible linkages and the quantum cog unmoved.

An ALP is a physical oscillating pull on those handles. This is why the programme's abstract current quotient lands directly in a mature experimental framework.

## 2. The anomaly map

Use the all-left-handed field order

\[
(Q,u^c,d^c,L,e^c,N^c,H).
\]

Overall row normalizations are conventional. A convenient integer set of linear anomaly rows is

\[
A_{3}=(2,1,1,0,0,0,0),
\]

\[
A_{2}=(3,0,0,1,0,0,0),
\]

\[
A_{YY}=(6,48,12,18,36,0,0),
\]

\[
A_{\rm grav}=(6,3,3,2,1,1,0).
\]

They represent, respectively, the mixed \(SU(3)^2-X\), \(SU(2)^2-X\), \(Y^2-X\), and gravitational-current anomalies for a phase charge \(X=x\). Scalars do not contribute to chiral anomalies, hence the final zero.

The hypercharge vector

\[
6Y=(1,-4,2,-3,6,0,3)
\]

and the integer-normalized

\[
3(B-L)=(1,-1,-1,-3,3,3,0)
\]

annihilate both \(V_H\) and every displayed anomaly row. Baryon and lepton number separately annihilate \(V_H\) but not the electroweak anomaly row. The anomaly map adds exactly one independent constraint on the three-dimensional Yukawa kernel.

## 3. The incidence current becomes a definite ALP benchmark

For the programme's fermionic incidence weights, completed with zero Higgs phase,

\[
\lambda=(5,5,1,1,1,0,0),
\]

the Yukawa image is

\[
V_H\lambda=(10,6,2,1).
\]

Thus an ALP derivatively coupled to \(J_\lambda\) has a fixed relative pattern of up-type, down-type, charged-lepton and neutrino chirality-changing interactions before multiplication by the corresponding Yukawa couplings.

It is not anomaly neutral. In the displayed integer normalization,

\[
A_{\rm anomaly}\lambda=(16,16,336,51).
\]

These raw numbers should not be compared across rows as physical coupling strengths: each row suppresses different gauge factors and uses a different conventional normalization. Their meaning is that none of the four anomaly structures vanishes for the incidence current.

This supplies a concrete falsifiable interpretation, but also a strong constraint. The incidence direction is not an isolated fermion-current coupling; any consistent ALP basis must track the associated gauge-topological terms and their running.

## 4. What is genuinely learned versus already known

The general facts are established ALP EFT:

- derivative fermion and Higgs-current operators;
- field-redefinition relations between derivative, pseudoscalar-Yukawa and anomalous gauge couplings;
- redundancy of a Higgs-current operator in common bases;
- one-loop Yukawa running and higher-order gauge running;
- threshold matching below electroweak symmetry breaking.

Therefore the discovery that derivative current couplings map into ALP couplings is not itself new. The useful programme-specific result is the exact placement of its incidence vector and \(B-L\) axis inside that known coupling space.

This changes the research strategy. Instead of independently rebuilding the seven-current RG problem, import the published ALP anomalous dimensions and ask a narrower question:

\[
\textit{Does the programme's incidence ray define a phenomenologically distinctive, RG-stable ALP benchmark?}
\]

## 5. Consequence for the proposed two-current plane

The derivative-ALP probe treats the two proposed axes very differently:

- the incidence current produces Yukawa and anomalous gauge interactions;
- exact \(B-L\), with a right-handed neutrino and no Majorana breaking, is a total-derivative null direction for the ALP.

So an ALP does **not** directly realize a two-channel incidence/\(B-L\) response. It probes the broken incidence direction while being blind to the protected direction. A direct background vector source can retain the \(B-L\) correlator, but is harder to turn into a dynamical mediator.

This is an informative no-go for one proposed operationalization, not a no-go for the current programme as a whole.

## 6. Next concrete test

Use a standard ALP EFT basis and initialize its Wilson coefficients with the incidence charge pattern. Then:

1. translate \(\lambda\) into a nonredundant ALP basis at a declared ultraviolet scale;
2. run the complete published RG equations to the electroweak scale;
3. match through top, weak, bottom and charm thresholds;
4. compare the resulting photon, gluon, lepton and flavor-changing couplings with generic ALP benchmarks;
5. test whether any ratio or low-dimensional relation survives field redefinitions and RG running.

**Go:** the incidence initial condition flows onto a distinctive lower-dimensional relation among measurable ALP couplings.

**No-go:** it becomes an ordinary generic point in ALP Wilson-coefficient space, with no invariant relation beyond the chosen ultraviolet charge vector.

## Primary literature boundary

- [Bauer, Neubert, Renner, Schnubel and Thamm, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272) gives the dimension-five basis, RG evolution, Higgs-current redundancy, weak matching and low-energy chiral theory.
- [Chala, Guedes, Ramos and Santiago, *Running in the ALPs*](https://arxiv.org/abs/2012.09017) computes the complete one-loop running through dimension five and compares operator bases.
- [Bonilla, Brivio, Gavela and Sanz, one-loop ALP couplings](https://arxiv.org/abs/2107.11392) treats finite corrections and the relation between derivative, chirality-flip and anomalous couplings.
- [Quevillon, Smith and Vuong, *Axion Effective Action*](https://arxiv.org/abs/2112.00553) emphasizes anomalous Ward identities and ambiguities in derivative fermion couplings.

## Reproducibility

```powershell
node scripts\verify_programme_alp_completion_of_current_quotient.mjs
```
