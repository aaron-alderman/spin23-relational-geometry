# The Neutrino Peirce Line Is the Only Gauge-Neutral Furey Complex-Structure Candidate

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09 and B11  
**Claim status:** exact candidate-orbit and gauge-stabilizer inventory; Higgs-map and localization intertwiner remain open

## 1. The matching problem

The localization branch recovers a real two-plane operator

\[
M^2=-g^2I.
\]

To connect it to Furey, one needs a source-native real two-plane with a negative-square orientation—not merely another two-dimensional vector space.

The current corpus contains four plausible candidates. They have different algebraic and gauge properties.

## 2. Candidate A: weak \(M_2(\mathbb C)\) off-diagonal line

The Hermitian weak block has off-diagonal coordinate

\[
z=x+iy.
\]

Multiplication by \(i\) acts on \((x,y)\) as

\[
J=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix},
\qquad J^2=-I.
\]

This is a canonical complex structure. But relative diagonal weak transformations rotate \(z\), so a fixed real axis \(y=0\) is not invariant under the full pre-breaking weak action.

The candidate is source-native but not a gauge-neutral fixed real line.

## 3. Candidate B: charged \(E\)-\(C\) linking corner

The unique fifteen-state \(M_2(\mathbb C)\) linking factor has the charged-lepton relation

\[
z_e:C\leftrightarrow E.
\]

Its complex line again has the canonical \(J^2=-I\). Hypercharge acts by

\[
z_e\mapsto e^{i\theta}z_e,
\]

which rotates every fixed real axis except at the \(\mathbb Z_2\) stabilizer.

This is the exact charged-real-slice obstruction. It cannot be identified with a gauge-neutral external orientation before dressing or compression.

## 4. Candidate C: neutral \(E\)-\(D\) Peirce corner

After the unique \(\nu^c:D\to E\) completion, the \(M_3(\mathbb C)\) linking factor contains the Peirce corner

\[
p_\nu M_3(\mathbb C)p_\nu\cong M_2(\mathbb C)
\]

with neutral relation

\[
z_\nu:D\leftrightarrow E.
\]

Both endpoint faces have zero hypercharge. Hence:

- its off-diagonal complex line has canonical \(J^2=-I\);
- the entire corner is gauge trivial under the Standard-Model group;
- its real axis is not rotated by hypercharge;
- the corner is selected by ternary incidence and gauge neutrality.

Among the current Furey candidates, this is the unique negative-square plane passing the gauge-neutrality gate.

## 5. Candidate D: survivor exchange

The neutral-label exchange

\[
O_1\leftrightarrow R
\]

acts as a reflection \(K\) with

\[
K^2=+I.
\]

It is a real involution, not a complex structure. There is no invertible real linear map \(T\) satisfying

\[
TJ=KT,
\]

because squaring would imply \(-T=T\).

The exchange can instead act like conjugation:

\[
KJ=-JK.
\]

It may supply the anti-linear real selector paired with a complex structure, but it cannot itself equal the localization orientation \(M/g\).

## 6. The subtle role of the real slice

Even in the neutral Peirce corner, \(J\) rotates

\[
\operatorname{Re}z_\nu
\longleftrightarrow
\operatorname{Im}z_\nu.
\]

Therefore \(J\) belongs naturally to the complex parent \(H_2(\mathbb C)\) and does not preserve the selected middle real slice \(H_2(\mathbb R)\).

This suggests a disciplined interpretation:

- the real slice supplies the \(Spin(2,3)\) carrier;
- the complex structure records orientation in the broken/complementary direction;
- an anti-linear selector chooses the real axis;
- flux or cyclic data measure rotation relative to that axis.

The localization \(M\) should not be called an internal generator of \(H_2(\mathbb R)\) without explaining this parent/slice relation.

## 7. Remaining intertwiner gate

The strongest candidate is now explicit:

\[
I:
\mathbb R^2_{\rm localization}
\longrightarrow
\mathbb C_{\nu\text{-Peirce, realified}}
\]

with

\[
IMI^{-1}=gJ_\nu.
\]

But an arbitrary \(I\) always exists between oriented two-planes. Physical content requires the same \(I\) to:

1. respect the \(D\to E\) neutrino arrow;
2. intertwine the relevant Higgs/Yukawa maps;
3. preserve the positive response or Peirce compression;
4. coexist with complex flavor CP;
5. reduce parameters rather than introduce a free \(GL(2,\mathbb R)\) matrix.

These are not yet proved.

## 8. Stop-everything and falsification gates

**Positive trigger:** the source-native neutrino Peirce orientation intertwines the shared localization \(M\), the four Higgs maps and the external response with no arbitrary conjugator.

**Selector trigger:** the survivor exchange or another source involution acts as the conjugation anti-commuting with \(J_\nu\) and fixes the required real axis.

**Parameter trigger:** the Peirce/Furey data fixes \(g=2\kappa\sigma^2\) or a discrete orbit for it.

**Falsifier:** the charged weak or \(E\)-\(C\) complex line is identified with a gauge-neutral carrier while its continuous phase action is ignored, or the square-\(+1\) exchange is equated directly with square-\(-1\) orientation.

## 9. Certificate

The [Furey complex-structure inventory certificate](../../../verification/verify/verify_furey_complex_structure_candidate_inventory.mjs) checks the negative-square and involutive actions, the conjugation anticommutation relation, gauge rotation of charged real axes and uniqueness of the neutral Peirce candidate within the current inventory.

## Companion documents

- [Negative-square orientation classification](250_negative_square_orientation_is_a_complex_structure_not_yet_a_spin23_derivation.md)
- [Neutrino Peirce \(H_2(\mathbb R)\) carrier](../0100-0199/168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Unique right-handed-neutrino TRO completion](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Furey survivor-exchange antiunitary candidate](../0100-0199/162_furey_survivor_exchange_antiunitary_candidate.md)
