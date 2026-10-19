# Gauge Symmetry Does Not Orient the Four Yukawa Remnant Rays

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact Standard-Model representation-theoretic obstruction for bare linear intertwiners; nonlinear, broken-phase and source-derived identifications remain open

## 1. The orientation problem

Three pairwise distinct rank-one remnants can span \(H_2(\mathbb R)\). The four dressed Yukawa channels are therefore a tempting source of an overcomplete frame. But this requires their two-face response spaces to be compared in one canonically normalized real plane.

Gauge invariance proves that each individual Gram matrix is neutral. It does not orient the four Gram constructions relative to one another.

## 2. Dressed endpoint representations

Using six-times-hypercharge, the matched face representation in each channel is

\[
\begin{array}{c|c}
u&(\mathbf3,\mathbf1)_4\\
d&(\mathbf3,\mathbf1)_{-2}\\
e&(\mathbf1,\mathbf1)_{-6}\\
\nu&(\mathbf1,\mathbf1)_0.
\end{array}
\]

Within each row, the Higgs-dressed left face and conjugated right face transform in the same representation. This is why their Gram matrix is gauge invariant.

Across different rows, all four irreducible representations are inequivalent.

## 3. Schur-lemma obstruction

For irreducible representations \(V_f\) and \(V_g\) of the unbroken Standard-Model gauge group,

\[
\operatorname{Hom}_{G_{\rm SM}}(V_f,V_g)=0
\qquad(f\neq g)
\]

unless their color, weak and hypercharge labels agree. None of the six cross-channel pairs agrees.

Therefore there is no nonzero bare linear gauge-equivariant map that directly identifies

\[
V_u,\quad V_d,\quad V_e,\quad V_\nu.
\]

In particular, unbroken gauge symmetry alone cannot say that a response direction extracted from the up channel is the same projective direction as one extracted from the electron channel.

## 4. Why neutral Grams can still be summed

Each Gram entry contracts a representation with its dual and therefore belongs to the trivial gauge representation. After contraction,

\[
G_f\in H_2(\mathbb R)_+
\]

may be added to the others with positive coefficients.

This does not contradict the vanishing cross-channel Hom spaces. Taking the Gram is a quadratic descent

\[
V_f\oplus V_f
\longrightarrow
\operatorname{Sym}_2(\mathbb R)_{\rm neutral},
\]

not a linear identification \(V_f\to V_g\).

The neutral codomains are isomorphic as abstract Jordan spaces, but gauge symmetry does not select their relative normalization, source basis or defect-vector orientation.

## 5. What data could supply an identification

### 5.1 Chirality and common probe normalization

The labels “dressed left” and “conjugated right” provide a common semantic ordering. A Ward-normalized external source could further fix their relative scale. This is plausible but must be derived from a correlator, not assumed from representation matching.

### 5.2 Higgs-mediated nonlinear intertwiners

Additional Higgs insertions can compensate representation differences. Such maps are field-dependent and change operator dimension; they are nonlinear portal data, not bare gauge intertwiners.

### 5.3 Furey linking-algebra paths

A path through the full block/linking algebra could connect inequivalent endpoint sectors while carrying the required Higgs charges on intermediate edges. The earlier cycle audit proves those paths leave the neutrino Peirce corner, so any identification must live in the larger algebra and descend only after the full cycle is contracted.

### 5.4 Stress or boundary sources

If every channel couples to the same pair of conserved external probes, the probe labels—not the internal matter representations—can identify the two-face codomains. The resulting remnant orientations would then be physical spectral data.

## 6. Consequence for a four-channel sum rule

Four vectors in \(H_2(\mathbb R)\) obey a linear relation only after they have been placed in one common vector space with fixed scales. Abstract isomorphism of four copies is insufficient.

Therefore a relation such as

\[
\alpha_uQ_u+\alpha_dQ_d+
\alpha_eQ_e+
\alpha_\nu Q_\nu=0
\]

is not yet predicted. Independent rescaling of a channel changes the coefficients, and an independent real congruence can change its projective direction.

A meaningful sum rule requires:

1. one shared external two-probe basis;
2. one normalization prescription;
3. source-derived channel embeddings;
4. then a computed null vector of the four remnant matrices.

## 7. Scope discipline

The result does not say that cross-channel comparison is impossible. It says only that it is not supplied by the unbroken gauge representations.

It also does not invalidate the common \(H_2(\mathbb R)\) carrier as a response codomain. It strengthens the architecture in which matter sectors remain representation-distinct while a separate external relational carrier receives gauge-neutral composites.

This is exactly the separation already forced by the Peirce-incidence audit.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey cyclic/linking structure or a common Ward-normalized source constructs explicit cross-channel embeddings and fixes three pairwise distinct remnant directions.

**Sum-rule trigger:** those embeddings produce a normalization-independent four-channel linear dependence.

**Gauge-only falsifier:** any proposed canonical orientation is changed by allowed independent field/source normalizations while preserving all gauge representations.

**Portal falsifier:** every cross-channel identification requires arbitrary additional Higgs insertions or unconstrained coupling tensors.

## 9. Certificate

The [cross-channel intertwiner certificate](scripts/verify_yukawa_cross_channel_intertwiner_obstruction.mjs) verifies all four within-channel representation matches, all six cross-channel inequivalences and the simultaneous neutrality of the quadratic Gram outputs.

## Companion documents

- [Three relationship rays span the Jordan space](272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [All four Yukawa cycles induce neutral Gram responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [No Furey Higgs cycle is Peirce internal](263_no_furey_higgs_cycle_is_internal_to_the_neutrino_peirce_corner.md)
- [Minimal symmetry-safe external/internal portal](78_minimal_symmetry_safe_external_internal_portal.md)
