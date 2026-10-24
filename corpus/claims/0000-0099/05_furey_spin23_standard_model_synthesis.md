# Furey–Spin(2,3)–Standard Model synthesis

**Status:** proposed research architecture, not an established theory.  
**Aim:** combine the strongest parts of Aaron's sector-selection hypothesis and Furey's representation programme without treating an analogy as a derivation.


## 1. Synthesis in one sentence

Use a constrained \(Spin(2,3)\)-related Cartan/configuration geometry to select the effective Lorentzian tetrad, use division-algebraic ideals and compatibility intersections to select the Standard Model internal module, and require one generally covariant action to generate the Dirac operator, gauge currents, Higgs dynamics and total stress–energy.

## 2. What is being unified

The synthesis has three response structures:

\[
\frac{\delta S}{\delta\mathcal A_{\rm geom}}
\quad\text{(geometry/torsion/sector equations)},
\]

\[
\frac{\delta S}{\delta A_{\rm int}}
\quad\text{(colour, weak and hypercharge currents)},
\]

\[
-\frac{2}{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}
\quad\text{(stress--energy)}.
\]

The same fields must occur in all three. There may not be one independently adjustable “visibility kernel” and another independently adjustable gravitational kernel.

## 3. Proposed kinematic data

Work first on an ordinary four-dimensional manifold \(M\), using \(Spin(2,3)\) as a Cartan gauge group rather than assuming a literal second physical time.

### 3.1 Geometric sector

- a principal \(Spin(2,3)\) bundle with connection \(\mathcal A_\mu{}^{AB}\);
- a selector/compensator \(V^A\) satisfying \(V_AV^A=-\ell^2\) or the sign appropriate to the chosen convention;
- the stabiliser of \(V^A\) is \(Spin(1,3)\);
- the broken components of \(\mathcal A\) define the tetrad \(e^a{}_{\mu}\), while the unbroken components define \(\omega^{ab}{}_{\mu}\).

### 3.2 Internal sector

- a real/complex vector space \(\mathcal F\) generated from division-algebraic multiplication maps;
- primitive idempotents or compatible volume/complex structures \(P_F,J_a\);
- a surviving module \(\mathcal F_{\rm SM}=P_F\mathcal F\);
- its common stabiliser is exactly the faithful Standard Model gauge group, including its global quotient;
- three physical family modules occur with correct chirality.

### 3.3 Matter

\[
\Psi\in\Gamma(S_V\otimes\mathcal F_{\rm SM}),
\qquad H\in\Gamma(E_H),
\]

where \(S_V\) is the Lorentz spin bundle induced after geometric selection and \(E_H\) is the division-algebraically selected Higgs representation.

## 4. Minimal action ansatz

The following is a scaffold, not a claimed final theory:

\[
S=S_{\rm geom}+S_{\rm sel}+S_{\rm YM}+S_H+S_\Psi+S_Y+S_{\rm portal}.
\]

A four-dimensional Cartan-geometric version could take

\[
S_{\rm geom}=\alpha\int_M
\epsilon_{ABCDE}V^E\,\mathcal F^{AB}\wedge\mathcal F^{CD},
\]

with constraints or a potential for \(V\). After symmetry reduction this should yield Einstein–Hilbert, cosmological and topological terms with controlled coefficients.

The low-energy internal terms must reduce exactly to

\[
S_{\rm YM}= -\frac14\int\sqrt{-g}\left(
G^A_{\mu\nu}G^{A\mu\nu}
+W^I_{\mu\nu}W^{I\mu\nu}
+B_{\mu\nu}B^{\mu\nu}\right),
\]

\[
S_H=\int\sqrt{-g}\left[-(D_\mu H)^\dagger D^\mu H
-V(H)-\xi RH^\dagger H\right],
\]

\[
S_\Psi=\frac i2\int\sqrt{-g}\,
\bar\Psi\gamma^\mu\overleftrightarrow{\mathbb D}_\mu\Psi,
\]

\[
S_Y=-\int\sqrt{-g}\left(
\bar Q_LY_dHd_R+\bar Q_LY_u\widetilde Hu_R
+\bar L_LY_eHe_R+\mathrm{h.c.}\right).
\]

The combined derivative is

\[
\mathbb D_\mu=\partial_\mu+\frac14\omega_\mu^{ab}\gamma_{ab}
-ig_sG^AT^A-igW^I\tau^I-ig'B Y
+\mathcal K_\mu,
\]

where \(\mathcal K_\mu\) contains any surviving selector/hidden connection. Consistency requires

\[
[\mathbb D_\mu,P_V\otimes P_F]=0
\]

on the physical subspace, or a controlled equation for its failure. Otherwise propagation does not preserve the selected particle space.

## 5. Where Furey's structures enter

### 5.1 Colour and charge

Use the complex-octonionic ladder system to define the generation module and

\[
Q=\frac13\sum_i\alpha_i^\dagger\alpha_i
\]

on the relevant ideal. The corresponding stabiliser supplies \(SU(3)_c\times U(1)_Q\) after Higgs breaking.

### 5.2 Pre-Higgs gauge algebra

Use the division-algebraic intersection/nested-embedding constraints to obtain

\[
\mathfrak{su}(3)_c\oplus\mathfrak{su}(2)_L\oplus\mathfrak u(1)_Y
\]

before choosing a Higgs vacuum. This must be checked on the full chiral module, not inferred only from the bosonic stabiliser.

### 5.3 Three families

Treat the chain-algebra multiplicity and the newer triality construction as competing or complementary mechanisms until an equivalence is proved. Do not count the same states twice. A decisive calculation is to construct an explicit isomorphism—or show there is none—between:

- the three-generation subspaces in \(\mathbb C\ell(6)\);
- the \((\Psi_+,\Psi_-,V)\) triality organisation;
- the graded sectors in \(H_{16}(\mathbb C)\).

### 5.4 Higgs and Yukawa structure

The triality scalar sector is a candidate source for \(H\) and perhaps for Yukawa maps. The required object is an invariant trilinear

\[
\mathcal Y:\mathcal F_L\otimes E_H\otimes\mathcal F_R\to\mathbb C.
\]

Its allowed components must reproduce the Standard Model Yukawa selection rules. Its coefficients must either be predicted or honestly retained as free parameters.

## 6. Where Spin(2,3) enters

### 6.1 Conservative version

\(Spin(2,3)\) is a broken Cartan gauge symmetry that packages tetrad and spin connection. T2 is then not a second experienced time; it is part of the larger model geometry before reduction. This version has the clearest route to known gravity.

### 6.2 Configuration version

T2 is an internal/configuration coordinate with an indefinite metric. Then it belongs in a sigma-model or field-space metric, not automatically in the spacetime line element. Its excitations can affect the stress tensor through gradients and a potential, but the theory must prove positivity of physical fluctuations.

### 6.3 Literal two-time version

This should be pursued only after a full first-class constraint mechanism is stated. The action must show how all extra negative-norm modes are gauge and why the physical quotient has one causal time. Free Fourier momentum along a second real time produces the wrong sign for mass and cannot be used as the mass mechanism.

## 7. The total stress tensor

After reduction, the target is

\[
T^{\rm total}_{\mu\nu}
=T^{\rm SM}_{\mu\nu}
+T^{V}_{\mu\nu}
+T^{\rm portal}_{\mu\nu}
+T^{\rm higher}_{\mu\nu},
\]

where the first term is exactly the tensor derived in [the full analysis](01_standard_model_as_stress_energy_full_analysis.md). Diffeomorphism invariance must give

\[
\nabla^\mu T^{\rm total}_{\mu\nu}=0.
\]

If visible energy exchanges with the selector,

\[
\nabla^\mu T^{\rm SM}_{\mu\nu}=J_\nu,
\qquad
\nabla^\mu(T^V_{\mu\nu}+T^{\rm portal}_{\mu\nu})=-J_\nu.
\]

This conservation bookkeeping turns the thesis's “gravity sees the fuller configuration” into a calculable statement.

## 8. Required consistency gates

A model should not proceed to galaxy fitting or warp speculation until it passes these gates.

### Gate 1: representation completeness

- exact Standard Model chiral multiplets;
- three generations without double counting;
- a Higgs doublet with correct hypercharge;
- a declared neutrino-mass extension.

### Gate 2: anomalies

Check

\[
[SU(3)]^3,\ [SU(2)]^2U(1),\ [SU(3)]^2U(1),\ U(1)^3,
\ \text{gravity}^2U(1)
\]

and the global \(SU(2)\) anomaly on the actual physical module.

### Gate 3: positivity and causality

- positive residues at propagator poles;
- Hamiltonian bounded below on physical states;
- hyperbolic reduced field equations;
- no observable second-clock mode;
- no superluminal characteristic introduced at accessible scales.

### Gate 4: Ward identities

Gauge, local Lorentz, diffeomorphism and any selector gauge symmetries must give compatible identities. BRST cohomology should define the quantum physical space.

### Gate 5: Standard Model limit

At energies below a scale \(M_*\),

\[
\mathcal L_{\rm eff}=\mathcal L_{\rm SM}+\mathcal L_{\rm GR}
+\sum_{d>4}\frac{c_i^{(d)}}{M_*^{d-4}}\mathcal O_i^{(d)}.
\]

Every new effect must appear as a controlled operator or nonlocal term, not an informal projection rule.

## 9. First calculations worth doing

### Calculation A: module audit

Write a machine-checkable basis for the proposed internal module. Output every state's

\[
(SU(3)_c,SU(2)_L,Y),\quad Q,\quad\text{chirality},\quad\text{generation slot}.
\]

Verify dimensions, conjugations and anomaly sums. This is the fastest way to expose missing or duplicated states.

### Calculation B: selector spectrum

Choose a minimal \(Spin(2,3)\)-breaking action, find its vacuum and diagonalise quadratic fluctuations. List masses, kinetic signs and residual gauge symmetries.

### Calculation C: compatible Dirac operator

Construct \(\slashed{\mathbb D}\) on \(S_V\otimes\mathcal F\) and test

\[
(1-P)\slashed{\mathbb D}P=0.
\]

If nonzero, identify whether it is a physical portal, a mass term or an inconsistency.

### Calculation D: Higgs/Yukawa invariant count

Compute all gauge- and division-algebra-invariant trilinears. Determine whether the algebra predicts texture zeros, generation relations or extra scalars.

### Calculation E: metric variation

Vary the complete reduced action and verify conservation directly. Calculate which selector terms behave as vacuum energy, dust, pressure, anisotropic stress or higher-derivative corrections.

### Calculation F: one cross-domain prediction

Select one coefficient that affects both a laboratory amplitude and a gravitational observable. Examples include a nonminimal Higgs/selector coupling or a fixed portal modifying both interferometric phase and equivalence-principle response. Existing precision bounds must be applied before proposing a dedicated experiment.

## 10. Falsifiers

The programme should be regarded as failing in its present form if any of the following persists after a precise model is written:

1. negative-norm physical modes or an unbounded Hamiltonian;
2. failure of the reduced Cauchy problem;
3. extra chiral fermions or gauge anomalies with no allowed decoupling;
4. inability to obtain the Standard Model Higgs/Yukawa invariants;
5. violation of local Lorentz, equivalence-principle or flavour bounds at the scale required for the proposed effect;
6. separate arbitrary functions for electromagnetic visibility and gravitational response;
7. no observable that differs from the Standard Model plus generic effective field theory;
8. a generation mechanism that counts representation copies but cannot assign consistent spin statistics and weak couplings.

## 11. Potential predictions if the synthesis succeeds

Predictions should arise from algebraic scarcity:

- a restricted Yukawa texture or relation among mixing parameters;
- a fixed set of additional \(U(1)\) charges and a constrained breaking pattern;
- a selector scalar/vector with determined couplings to \(T^\mu{}_{\mu}\) or the Higgs;
- a correlation between internal generation grading and allowed scalar representations;
- a calculable higher-dimensional operator absent or unrelated in a generic extension;
- a constrained gravitational form factor or equivalence-principle deviation.

Dark-matter-like galaxy effects are not a good first prediction. They allow too much astrophysical freedom and occur far beyond the scales where the algebraic particle construction can first be tested.

## 12. Ordered research plan

### Stage I — kinematics

1. Freeze conventions for all Clifford signatures and involutions.
2. Implement the internal algebra and projectors computationally.
3. Produce the complete state/anomaly table.
4. Prove the relation, or inequivalence, among the three proposed generation mechanisms.

### Stage II — classical dynamics

5. Choose Cartan-geometric versus literal two-time ontology.
6. Write the minimal selector action.
7. Construct the compatible Dirac/Yang–Mills/Higgs action.
8. Derive vacuum, spectrum, stress tensor and currents.

### Stage III — quantum consistency

9. Gauge-fix and determine BRST cohomology.
10. Check perturbative and global anomalies.
11. Determine power counting/EFT counterterms.
12. Match onto Standard Model effective field theory.

### Stage IV — phenomenology

13. Fit no new parameter until existing collider, flavour, clock and equivalence-principle constraints are compiled.
14. Choose the smallest surviving portal.
15. Calculate one correlated laboratory/gravitational prediction.
16. Only then extend to cosmology, missing mass or engineered geometry.

## 13. Final synthesis

Furey's programme makes a powerful proposal about **why these internal representations**. Spin(2,3) makes a possible proposal about **why this Lorentzian geometric sector**. Stress–energy asks whether both proposals inhabit **one dynamical world**.

The combined thesis should not claim that octonions are hidden time, that triality is a temporal braid, or that the Standard Model has already been derived. Its defensible central conjecture is:

> A common constrained algebra of geometric and division-algebraic actions may possess a physical ideal whose stabiliser is \(Spin(1,3)\times G_{\rm SM}\), whose low-energy action is the Standard Model coupled to gravity, and whose selector sector leaves a small, correlated, falsifiable residual.

That conjecture is narrower than the original intuition, but it is strong enough to organise real calculations. Its decisive deliverable is not another group embedding. It is a ghost-free action and a prediction.

## Source trail

- [Standard Model stress–energy analysis](01_standard_model_as_stress_energy_full_analysis.md)
- [Furey comprehensive review](02_furey_comprehensive_research_review.md)
- [Furey technical guide](03_furey_technical_algebraic_guide.md)
- [Aaron's parent Spin(2,3) thesis](../../syntheses/grand-synthesis/aarons_spin23_research_thesis.md)
- Furey primary papers linked in the comprehensive review, including the [2024 triality paper](https://arxiv.org/abs/2409.17948) and [2026 nested-embedding paper](https://arxiv.org/abs/2607.18450)

