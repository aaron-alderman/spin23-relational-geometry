# The Rank-One Spectral Zero Is the Unbroken Colour–Lepton Reflection Ward Sector, but Three-Generation Weak Instantons Make It Nonperturbatively Anomalous

**Date:** 18 October 2026  
**Branches:** residual discrete symmetry, radiative protection, Pati–Salam breaking, anomaly boundary  
**Claim status:** exact representation and source-parity theorem; perturbative protection conditional on the reflection-even action; nonperturbative anomaly identified  
**Certificate:** [classify_residual_colour_lepton_reflection_and_its_weak_anomaly.mjs](scripts/classify_residual_colour_lepton_reflection_and_its_weak_anomaly.mjs)

## Executive result

The all-orders rank-one bridge theorem of document 1084 is the pathwise expression of a simpler residual parity.

Let

\[
P=\operatorname{diag}(1,1,1,-1)
\]

act on the Pati–Salam colour–lepton fundamental

\[
\mathbb C^4=\mathbb C_c^3\oplus\mathbb C_\ell.
\]

Then:

- colour–colour bivectors in \(\Lambda^2\mathbb C^4\) are even;
- colour–lepton bivectors are odd;
- the rank-one neutrino direction \(e_4e_4\in\operatorname{Sym}^2\mathbb C^4\) is even;
- diagonal singlet/adjoint \(\Sigma\) vacua are invariant;
- the epsilon/Pfaffian pairing changes sign because \(\det P=-1\);
- Hermitian like-sector mixing remains even.

Thus the physical rank-one/diagonal vacuum preserves exactly the discrete selection rule needed to distinguish useful Hermitian propagation from dangerous leptoquark–diquark reconnection.

On fermions this is lepton parity: quarks are even and leptons are odd. Every published Model C source vertex is even when the leptoquark scalar is odd and the diquark scalar is even. Consequently, ordinary perturbative counterterms constructed from those vertices cannot generate the odd mixing bilinear.

But for three generations the electroweak 't Hooft vertex contains three lepton doublets and is odd. The parity is therefore anomalous nonperturbatively. It is a perturbative Ward sector, not yet an exact ultraviolet discrete gauge symmetry.

## 1. Exterior-square action

In the ordered six basis

\[
e_{12},e_{13},e_{23};e_{14},e_{24},e_{34},
\]

the induced reflection is

\[
P_{\wedge^2}=\operatorname{diag}(1,1,1;-1,-1,-1).
\]

The first three entries are the colour–colour/diquark half and the last three the colour–lepton/leptoquark half.

For the epsilon pairing \(J\) of document 1080,

\[
P_{\wedge^2}^TJP_{\wedge^2}=-J.
\]

Therefore

\[
A^TJB
\]

is reflection odd. By contrast,

\[
A^\dagger B
\]

is reflection even whenever \(A\) and \(B\) lie in the same parity sector.

This is precisely the desired selector:

\[
\boxed{
\text{Hermitian leptoquark communication allowed},
\qquad
\text{Pfaffian leptoquark--diquark mixing forbidden}.}
\]

## 2. The breaking vacuum preserves the reflection

On the symmetric ten,

\[
S^{IJ}\longmapsto P_I{}^K P_J{}^L S^{KL}.
\]

The Standard-Model-singlet right-neutrino direction is

\[
S_0=ve_4e_4^T.
\]

It contains two lepton indices and is therefore even:

\[
PS_0P^T=S_0.
\]

Likewise,

\[
\Sigma_0=\operatorname{diag}(a,a,a,b)
\]

commutes with \(P\). Hence the vacuum contract of document 1084 is not an arbitrary matrix restriction. It is the unbroken locus of the colour–lepton reflection.

A second VEV direction with one colour and one lepton index would be odd and would spontaneously break the parity. This is exactly the line-rotating falsifier already isolated by the bridge theorem.

## 3. Source-incidence realization

Assign parity

\[
Q,u^c,d^c:+1,
\qquad
L,e^c,\nu^c:-1.
\]

Then the five triplet currents have signs

\[
\begin{array}{c|ccccc}
\text{current}&QL&u^ce^c&d^c\nu^c&QQ&u^cd^c\\ \hline
P&-1&-1&-1&+1&+1.
\end{array}
\]

Assign the leptoquark component \(T\) odd and the diquark companion \(D\) even. Every source vertex is parity even:

\[
T(QL),\quad T^\dagger(u^ce^c),\quad T^\dagger(d^c\nu^c),
\quad D^\dagger(QQ),\quad D(u^cd^c).
\]

The dangerous holomorphic mass mixing

\[
TD
\]

is odd.

This explains why the one-loop fermion bubble between the two scalars vanishes: the leptoquark Yukawa tensors have support on odd quark–lepton pair space, whereas the diquark tensors have support on even quark–quark pair space. Their one-loop Gram overlap is zero before any family-matrix details are used.

## 4. Perturbative Ward protection

Every ordinary Feynman vertex in the source-separated low-energy theory contains an even number of parity-odd objects. A diagram with one external \(T\) and one external \(D\) is odd and therefore vanishes so long as:

- the regulator and counterterm scheme preserve the reflection;
- no parity-odd scalar acquires a VEV;
- no additional interaction explicitly violates the source parity.

This advances the quantum question materially. The all-orders spectral zero is not merely a fine-tuned boundary condition: it belongs to an unbroken classical Ward sector of the rank-one vacuum.

The statement is still deliberately called **perturbative**. A discrete anomaly prevents immediate promotion to an exact quantum symmetry.

## 5. Relation to \(SU(4)\) and the common phase

The matrix \(P\) has determinant \(-1\), so it is not itself an \(SU(4)\) element. Its conjugation nevertheless acts as an automorphism of the \(SU(4)\) gauge algebra. Equivalently, multiplying it by a central phase produces an \(SU(4)\) representative, while the inverse central phase is supplied by the common same-chirality-field phase discussed in document 1080.

This resolves the apparent contradiction:

- \(SU(4)\) alone permits the epsilon invariant;
- the common phase alone is broken by the ten VEV;
- a **combined discrete remnant** of colour–lepton reflection and the common phase leaves the rank-one vacuum invariant and makes the epsilon channel odd.

The residual protector is thus neither ordinary unbroken \(SU(4)\) nor an unrelated imposed charge.

## 6. Weak-instanton anomaly

For each generation, the \(SU(2)_L\) instanton has one lepton-doublet zero mode. With three generations the 't Hooft operator contains three lepton doublets, so under lepton parity it transforms as

\[
(-1)^3=-1.
\]

The same issue appears in a left–right theory for the right weak sector before its breaking. Therefore the fermionic realization of the reflection has a discrete weak anomaly unless additional ultraviolet degrees of freedom or a different combined discrete transformation cancel it.

This does not generate an ordinary perturbative scalar mass counterterm. It means that the proposed parity cannot yet be called an exact nonperturbative global or discrete gauge symmetry.

## 7. Stop-everything and falsification criteria

**Perturbative promotion:** within the reflection-even source-separated action and reflection-even vacuum, the companion-mixing two-point function vanishes to all ordinary perturbative orders by the Ward selection rule.

**Exact-symmetry stop:** do not call the reflection an exact quantum symmetry for three Standard-Model generations; the weak instanton vertex is odd.

**Vacuum falsifier:** any colour–lepton-odd VEV breaks the parity and permits mixing.

**Interaction falsifier:** any explicit epsilon/Pfaffian scalar term is parity odd and destroys the Ward protection.

**Ultraviolet reopening trigger:** search for an anomaly-free combined parity involving family, baryon, centre or extra-fermion data that retains opposite parities for the two six halves.

**Phenomenological boundary:** even if nonperturbative violation exists, its induced scalar mixing may be astronomically suppressed. No proton-lifetime statement should be made before the corresponding instanton/threshold coefficient is computed.

## 8. Verdict

The protection mechanism now has three equivalent faces:

\[
\boxed{
\begin{aligned}
&\text{path face:}&&\text{rank-one bridge normal form},\\
&\text{tensor face:}&&P_vA_RP_v=0,\\
&\text{symmetry face:}&&\text{unbroken colour--lepton reflection}.
\end{aligned}}
\]

This closes ordinary perturbative regeneration under the stated low-energy action more strongly than a tree-level calculation could. The remaining discomfort is now localized at the anomaly and ultraviolet-completion layer rather than in the scalar mass algebra.

## Position in the corpus

- [all-orders rank-one bridge theorem](1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md)
- [complex-six Pfaffian mixing gate](1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md)
- [minimal continuous \(U(1)\) protector no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
- [odd-family universal \(\mathbb Z_2\) anomaly no-go](1086_for_an_odd_number_of_families_any_universal_Z2_that_splits_leptoquark_from_diquark_triplets_has_the_same_mod_two_weak_anomaly.md)
