# The Hypercharge Stabilizer Forbids a Source Rotation of the Two Heavy Modes

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact gauge-stabilizer no-go inside the completed \(M_3(\mathbb C)\) linking factor; accidental or enlarged-symmetry degeneracy remains logically possible

## 1. The desired symmetry

The full \(M_3\) response contains two exchange-even heavy neutral coordinates:

1. the charged-face population \(p_C\);
2. the imaginary neutral coherence \(\operatorname{Im}(E\leftrightarrow D)\).

A symmetry rotating them into one another could enforce equal gaps and aligned residues. The symmetry must preserve the Standard-Model gauge embedding.

## 2. Hypercharge eigenspaces

In the ordered linking basis \((E,C,D)\),

\[
Y=\operatorname{diag}(0,1,0).
\]

The eigenspaces are:

\[
V_0=\operatorname{span}\{E,D\},
\qquad
V_1=\operatorname{span}\{C\}.
\]

The charged projector is the spectral projector

\[
p_C=Y.
\]

Every unitary preserving the hypercharge embedding must preserve this spectral decomposition.

## 3. Gauge stabilizer

Inside \(U(3)\), the stabilizer is

\[
U(2)_{E,D}\times U(1)_C.
\]

After removing the central conjugation that acts trivially, the effective stabilizer is

\[
S(U(2)\times U(1)).
\]

For every infinitesimal stabilizer generator \(X\),

\[
[X,Y]=0
\]

and therefore

\[
\boxed{[X,p_C]=0.}
\]

The \(C\)-population is a fixed singlet.

## 4. Neutral coherence forms a separate representation

The traceless Hermitian observables on \(V_0\) form the \(SU(2)\) adjoint triplet:

\[
p_E-p_D,\qquad
\operatorname{Re}(E\leftrightarrow D),\qquad
\operatorname{Im}(E\leftrightarrow D).
\]

The stabilizer rotates these three among themselves. It never mixes them with \(p_C\).

Hence the two desired heavy modes lie in inequivalent stabilizer representations:

\[
\boxed{
p_C:\mathbf1,
\qquad
\operatorname{Im}(E\leftrightarrow D):\mathbf3.}
\]

No gauge-preserving source automorphism can rotate one into the other.

## 5. What a mixing generator would do

A generator mixing \(C\) with \(E\) or \(D\) has

\[
[X,Y]\ne0.
\]

It changes the hypercharge spectral subspaces and therefore changes or breaks the Standard-Model gauge embedding.

Such a generator could exist only in an enlarged phase before hypercharge selection. It cannot protect a degeneracy in the already selected Standard-Model linking theory without explaining how the gauge embedding re-emerges.

## 6. Yukawa incidence reinforces the distinction

The two directions also have different relational provenance:

- \(C\to E\) carries the charged-lepton arrow \(e^c\);
- \(D\to E\) carries the neutral arrow \(\nu^c\).

The four Higgs cycles distinguish these roles. Even if their diagonal responses are both gauge neutral, the full matter/linking incidence does not treat them as one multiplet.

## 7. Branch decision

The most direct source-symmetry explanation for

\[
\rho=2\mu
\]

and residue alignment is ruled out within the gauge stabilizer.

The remaining options are:

1. exact Peirce compression plus response conjugation;
2. accidental/tuned degeneracy;
3. an enlarged pre-gauge symmetry with a controlled breaking pattern;
4. approximate emergent alignment with calculable splittings.

Option 1 is now the minimal evidence-supported architecture.

## 8. Stop-everything and falsification gates

**Enlarged-symmetry trigger:** a pre-hypercharge source symmetry unifies the two modes and derives both the gauge embedding and controlled splitting.

**Compression trigger:** a source-native conditional expectation makes the neutrino Peirce corner dynamically closed and removes \(p_C\) exactly.

**Radiative prediction:** charged-lepton/Yukawa effects calculate the unavoidable singlet-triplet gap splitting.

**Falsifier:** a symmetry inside the hypercharge stabilizer is claimed to rotate \(p_C\) into the neutral \(SU(2)\) triplet.

## 9. Certificate

The [hypercharge-stabilizer heavy-mode no-go certificate](../../../verification/verify/verify_hypercharge_stabilizer_forbids_heavy_mode_rotation.mjs) constructs a generic stabilizer generator, verifies it fixes \(p_C\), confirms closure of the neutral \(E,D\) block and exhibits that any generator moving \(p_C\) fails to commute with hypercharge.

## Companion documents

- [Full-\(M_3\) heavy response inventory](259_full_m3_response_supplies_two_heavy_channels_but_not_their_alignment.md)
- [Positive multi-residue alignment](258_lorentz_symmetric_positive_schur_residue_requires_aligned_degenerate_multiplet.md)
- [Neutrino Peirce carrier](../0100-0199/168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Full one-generation Higgs/Yukawa portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
