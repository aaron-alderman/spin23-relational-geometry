# Symmetric data cannot select a nonfixed orientation, so A5 requires a covariant selector input

**Date:** 19 October 2026  
**Branches:** B03, B11 and Spin(2,3) candidate-action gate A5  
**Claim status:** exact equivariant-selection theorem plus exhaustive finite certificate; physical selector remains open

## Main result

The A5 obstruction can be stated without theological language.

Let a symmetry group (G) act on the available data (D) and on the candidate outputs (X). A selector is a map

\[
f:D\longrightarrow X.
\]

If the law is (G)-equivariant,

\[
f(gd)=g f(d),
\]

and the supplied datum (d) is fixed by every element of (G), then

\[
g f(d)=f(gd)=f(d).
\]

Therefore (f(d)) must lie in the fixed-point set (X^G). In particular,

\[
\boxed{d\in D^G\ \text{and}\ X^G=\varnothing
\quad\Longrightarrow\quad
\text{no deterministic equivariant selector can choose an element of }X.}
\]

This is not an argument from ignorance. It is a no-go theorem for a precisely declared input class.

## 1. Application to the missing family-frame direction

Fixing one primitive projector leaves an ordered completion line in a complementary complex two-plane. The candidate completion space is

\[
X=\mathbb{CP}^1.
\]

The complementary (U(2)) acts transitively on (X), so no point is fixed by all of (U(2)). If the link action, measure and external data are all (U(2))-invariant, a deterministic equivariant calculation cannot return one completion line.

This recovers and sharpens documents 1214 and 1215. Any finite number of fully integrated isotropic links may change radial or relative-link invariants, but cannot select the common left orientation that integration quotients away.

The missing information has two real dimensions: it is one point of \(\mathbb{CP}^1\). Link multiplicity alone does not supply those two coordinates.

## 2. Application to arrow orientation and chirality

For a pair of reverse block maps,

\[
X_{ab}:V_b\to V_a,
\qquad
X_{ab}^\dagger:V_a\to V_b,
\]

the smallest orientation space is a two-point set. Source-target exchange acts without a fixed point. Data invariant under that exchange cannot canonically choose one arrow.

An inner block-sign grading does not evade the theorem. It assigns

\[
\gamma_a\gamma_b=\gamma_b\gamma_a

\]

to both orientations. The certificate exhausts all (2^5=32) sign assignments and finds every one mirror-orientation closed.

This statement concerns block orientation. It does **not** establish that the reverse block is an independent mirror fermion. A physical conclusion still requires Lorentz chirality, Grassmann generators and Fock-space quantization; the reverse block may instead be the adjoint of the same Weyl field.

## 3. Universal reality is a separate obstruction

The particularity theorem does not by itself mention CP. A second exact result limits how far an ordinary real selector may extend.

If one weak-basis antiunitary makes both three-family Hermitian flavor matrices (H_u) and (H_d) real, then their commutator is a real antisymmetric (3\times3) matrix. Hence

\[
\det[H_u,H_d]=0,
\]

and the flavor CP-odd invariant vanishes.

Thus a selector defining a real external response carrier cannot remain one universal, unbroken ordinary real structure on all flavor data. This is an empirical-domain obstruction, not the same theorem as the fixed-point obstruction.

## 4. Smallest impossible selector classes

The following classes are now closed under their stated assumptions.

| Class | Inputs | Requested output | Exact obstruction |
|---|---|---|---|
| invariant point selector | only (G)-fixed data | one point of a fixed-point-free (G)-orbit | equivariance forces the output to be fixed |
| isotropic integrated-link selector | (P,B) and finitely many fully integrated (U(2))-covariant links | one complementary \(\mathbb{CP}^1\) line | change of variables preserves the full completion orbit |
| inner block-sign selector | blockwise signs acting by conjugation | one arrow but not its reverse | both arrows have grade \(\gamma_a\gamma_b\) |
| universal ordinary-real selector | one unbroken reality operation on external and complete flavor sectors | real external carrier plus observed flavor CP | simultaneous flavor reality forces the CP-odd invariant to zero |

These results do not close all selector mechanisms. They identify the minimum information that a viable mechanism must add or retain.

## 5. Minimal escape classes

### 5.1 Return an orbit rather than a point

A symmetric law can return the full orbit, an equivalence class or a uniform probability distribution. In the four-direction finite model, the uniform distribution is exactly invariant.

This is mathematically complete but does not select one realized orientation. Sampling one outcome introduces a random seed, history or measurement record as an additional datum.

### 5.2 Limit the selector to a sector

An ordinary real structure may fix the external (H_2(\mathbb R)) carrier without acting on the complete Yukawa sector. This is the smallest escape from the CP obstruction because it changes the selector's domain rather than adding a new field.

It does not by itself choose chirality.

### 5.3 Supply one covariant anisotropic datum

Let the input itself transform in the orientation space. Then the identity map is equivariant:

\[
f(gx)=gx=g f(x).
\]

The certificate exhausts all (4^4=256) maps between four cyclic directions. There are exactly four equivariant maps, the four constant-offset maps. None exists from a symmetry-fixed singleton, but one oriented transforming input is sufficient.

For the family-frame problem this means supplying a nondegenerate complementary operator, a retained link condensate or another object whose stabilizer fixes a line. To select the full completion it must carry the missing two real \(\mathbb{CP}^1\) coordinates.

### 5.4 Break the symmetry dynamically

A symmetric potential may have an orbit of asymmetric minima. This produces possible oriented vacua, but the symmetric action alone does not identify which minimum is realized.

Spontaneous breaking therefore solves the existence problem, not canonical particularity. Domain history, fluctuations, boundary conditions or a superselection sector choose the realized member.

### 5.5 Supply boundary or historical data

An incoming/outgoing boundary, defect orientation, cosmological initial condition or measurement record can carry the required direction. The resulting law may remain fully equivariant because both the datum and output transform together.

This is a physical explanation if the boundary or history is independently motivated and measurable. It is only relabelling if chosen solely to reproduce the desired spectrum.

### 5.6 Use genuine quantum or anomalous symmetry breaking

If the measure, anomaly or index breaks the classical stabilizer, the hypothesis of invariant data fails and the no-go does not apply. Such an escape must be calculated. Merely naming an anomaly or topology does not supply the missing orientation.

### 5.7 Use a twisted or one-sided complex selector

A left ideal, complex polarization, index orientation or graded antiunitary may distinguish source from target while retaining complex flavor phases. Its image must still pass anomaly cancellation and must declare which reverse blocks are adjoints rather than independent fields.

This is the smallest live class for chirality, but no canonical member of the class has yet passed the complete Standard Model gate.

## 6. What is unsolvable in principle, and what is merely unsolved

The following question is solved negatively:

> Can exactly symmetric data, processed by an equivariant deterministic law, select one point of an orbit with no symmetry-fixed point?

No. More algebra, more isotropically integrated links and more computation cannot change that answer while the hypotheses remain intact.

The following questions remain open:

- which physical datum breaks or resolves the complementary (U(2)) orbit;
- whether a source-derived one-sided polarization yields precisely the chiral Standard Model;
- whether the selected state preserves nonzero flavor CP and anomaly cancellation;
- whether boundary/history data are predicted by a larger dynamical model;
- whether quantum anomalies or indices provide a canonical orientation.

The programme is therefore not blocked by an ineffable mystery. It is blocked until it either supplies asymmetric information or honestly changes the requested output from a point to an orbit or distribution.

## 7. Theological interpretation, explicitly outside the theorem

The theorem formalizes a limited version of the philosophical problem of particularity: universal symmetric possibilities do not uniquely specify one asymmetric actuality.

A theological reading may interpret the remaining particularity as creation, election, contingency or historical gift. That interpretation is neither proved nor disproved here. The mathematical result says only where the physical input ledger is incomplete.

The scientifically disciplined use of the theological lens is therefore diagnostic:

- it warns against disguising a chosen projector as a derivation;
- it permits contingency or history to be treated as real data rather than an embarrassment;
- it does not authorize inserting theological agency as an unmeasured term in the action;
- it does not protect the model from chirality, anomaly, CP or experimental tests.

## 8. Consequence for the direction of the programme

The present universal-selector search is too strong. The better architecture is layered:

\[
\text{complex chiral internal polarization}
\longrightarrow
\text{action and quantization}
\longrightarrow
\text{real positive response carrier}.
\]

The external (H_2(\mathbb R)) reality should be treated first as an emergent response condition, not as an antiunitary law imposed universally on internal flavor.

For A5, the next admissible candidate must declare an explicit selector tuple

\[
(G,D,X,f,\text{provenance}),

\]

and answer five questions:

1. Which symmetry acts?
2. Which input is not fixed by that symmetry?
3. How is that input obtained rather than hand-picked?
4. Does the selected chiral module cancel anomalies and retain CP violation?
5. Are reverse arrows adjoints, Nambu partners or independent mirrors?

No candidate should pass A5 without those answers.

## Certificate

`scripts/verify_a5_selector_particularity_boundary.mjs`:

- exhausts all selectors from symmetric data to four cyclic orientations and finds zero equivariant choices;
- exhausts all (256) maps after one covariant orientation datum is admitted and finds the four expected equivariant offset maps;
- verifies that the invariant stochastic output is uniform but does not select one outcome;
- exhausts all (32) inner block-sign gradings and verifies reverse-arrow closure;
- reproduces the exact real-versus-complex flavor CP witness.

The generated machine-readable result is `data/a5-selector-particularity-boundary-certificate.json`.

## Companion documents

- `74_real_selector_cp_violation_obstruction.md`
- `75_dagger_does_not_select_chirality.md`
- `77_conjugation_gradings_cannot_remove_mirrors.md`
- `151_dagger_antiparticle_vs_mirror_distinction.md`
- `1212_the_four_target_moments_are_exactly_a_double_jordan_frame_and_the_missing_cp1_supplies_the_last_two_coordinates.md`
- `1214_integrating_out_one_isotropic_cross_peirce_link_sees_only_two_moments_and_cannot_generate_the_full_mixing_target.md`
- `1215_any_number_of_fully_integrated_isotropic_links_remains_blind_to_the_complementary_frame.md`
