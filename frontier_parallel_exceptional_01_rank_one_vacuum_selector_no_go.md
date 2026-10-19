# Exceptional-parent frontier 01: the rank-one vacuum cannot supply the proton-safe selector

**Date:** 18 October 2026  
**Frontier:** exceptional \(E_6/Spin(10)\) parent action  
**Status:** exact stabilizer-level no-go; two-stage broken action remains live  
**Certificate:** [verify_exceptional_rank_one_vacuum_cannot_select_proton_safe_10.mjs](scripts/verify_exceptional_rank_one_vacuum_cannot_select_proton_safe_10.mjs)

## Result

The healthy exceptional rank-one potential and the proton-safe Furey incidence rule cannot be joined at the first symmetry-breaking stage.

A primitive exceptional Jordan state has stabilizer \(Spin(10)\), and the complementary Higgs/mediator direction transforms as its irreducible vector \(\mathbf {10}\). Any linear selector \(P\) derived from that vacuum while preserving its stabilizer must obey

\[
[P,\rho(g)]=0\qquad(g\in Spin(10)).
\]

The exact certificate solves these commutant equations in the defining real ten-dimensional representation and finds

\[
\dim\operatorname{End}_{Spin(10)}(\mathbf {10})=1,
\qquad P=\lambda I_{10}.
\]

Therefore the first exceptional vacuum can retain, rescale or remove the entire \(\mathbf {10}\), but it cannot preserve the four ordinary Yukawa channels and three Furey \(S_1\) channels while deleting only

\[
QQT,\qquad u^cd^c\bar T.
\]

This is stronger than the familiar doublet--triplet warning. The safe and dangerous currents use the same coloured mediator component, so a mass splitting of the \(\mathbf {10}\) alone does not perform the required **vertex selection**.

## Minimal viable architecture

The exceptional route remains live only as a two-stage construction:

\[
E_6
\xrightarrow{\langle x\rangle}
Spin(10)
\xrightarrow{\langle s\rangle}
G_{\rm typed}
\supseteq G_{\rm SM},
\]

where the two order parameters do different jobs.

1. \(x\in\mathbf {27}\) selects a primitive Jordan face and supplies the healthy Morse--Bott orbit already established in the corpus.
2. A second datum \(s\), not determined by \(x\), must break the \(Spin(10)\) commutant enough to distinguish the Furey first-order incidence classes.
3. Fermions must be a separate associated \(\mathbf {16}\) bundle. The scalar tangent \(\mathbf {16}\) of the exceptional orbit is not fermionic matter.
4. The low-energy action must preserve the desired Yukawas and oriented Furey pair while forbidding the two diquark vertices and controlling threshold regeneration.

The natural candidates for \(s\) are now sharply separated:

- a represented finite-one-form or Krajewski incidence projector;
- the gauge-dressed \(\mathbb Z_9\) lift whose faithful colour-singlet quotient is baryon triality;
- a boundary/orbifold condition acting at the vertex rather than solely on mediator masses;
- a distinct-representation Clebsch combination with a symmetry-protected zero.

Conventional missing-VEV and Dimopoulos--Wilczek constructions demonstrate that nontrivial \(SO(10)\) multiplet splitting can be natural, but they do not by themselves solve this stricter same-coloured-component vertex problem. They are mechanism templates, not completion proofs.

## Action-level candidate

A minimally honest schematic action is

\[
S=S_{\rm gauge}+|D x|^2-V_{\rm rank1}(x)
+\bar\psi i\!\not\!D_{A(x)}\psi
+|D h|^2-V_h(h,x,s)
+\bigl(Y_s(\psi,\psi,h)+\mathrm{h.c.}\bigr)+S_s,
\]

with typed requirements:

- \(x\) is bosonic and selects the exceptional face;
- \(\psi\) is a fermionic section of the associated completed \(\mathbf {16}\);
- \(h\) contains the \(\mathbf {10}\)-type Yukawa mediator;
- \(Y_s\) is the broken, incidence-filtered cubic rather than the unmodified \(Spin(10)\) tensor;
- \(s\) must be dynamical or topological and its selection rule must survive loops and heavy thresholds.

This is not yet a model because \(s\), its representation, and its potential have not been derived. It is the smallest action contract that avoids the statistics and commutant type errors.

## Decision tree

### Live branch A: finite-calculus selector

Construct \(\Omega_D^1(\mathcal A_F)/\mathcal J\) for the completed Furey module. The branch advances if the two diquark arrows vanish in the represented quotient while all seven retained arrows remain and the result is stable under reality and inner fluctuations.

### Live branch B: \(\mathbb Z_9\) vertex protection

Lift the established low-energy charge rule to the full finite Hilbert space and heavy field inventory. The branch advances only if every allowed heavy threshold respects the separation; forbidding one tree-level mixing term is insufficient.

### Live branch C: boundary or distinct-Clebsch construction

Realize the projector through boundary conditions or two inequivalent unified representations. The branch advances only if the resulting Schur complement preserves the established equal-and-opposite Furey residue without fine-tuned cancellation.

### Closed branch: one-stage exceptional selection

The primitive \(E_6/Spin(10)\) vacuum alone cannot produce a non-scalar selector on \(\mathbf {10}\). Additional copies with the identical Clebsch orientation also retain the positive-metric third-edge no-go already proved in document 1074.

## Stop-everything criteria

- **Positive trigger:** one common broken action derives the face, completed fermion bundle, seven-channel incidence mask and radiatively stable proton-safe threshold theory.
- **Negative trigger:** every admissible second-stage order parameter that deletes the diquark vertices also deletes an observed Yukawa or the oriented Furey pair.
- **Indeterminate boundary:** a projector entered as external data may define an effective theory, but it does not establish exceptional or Jordan selection.

## Literature boundary

The classical \(SO(10)\) literature contains natural doublet--triplet mechanisms and protected missing-VEV patterns, including [Lee and Mohapatra](https://arxiv.org/abs/hep-ph/9310371), [Babu and Barr](https://arxiv.org/abs/hep-ph/9402291), and [Chacko and Mohapatra](https://arxiv.org/abs/hep-ph/9810315). Their existence keeps symmetry-breaking model building open. The new programme-specific point is the exact commutant comparison with the seven-versus-nine Furey channel census: the required operation is a vertex selector inside a coloured component, not merely ordinary doublet--triplet mass splitting.

## Verdict

\[
\boxed{
\text{rank-one exceptional selection}
\;\not\Rightarrow\;
\text{proton-safe Furey incidence selection}
}
\]

The exceptional parent remains fruitful, but only after acknowledging a second, independently testable lowering datum.
