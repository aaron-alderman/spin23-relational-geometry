# The \(SO(10)\) Fock Root Operators Close Exactly on the Completed Furey Matter TRO

**Date:** 17 October 2026  
**Branches:** B03, B04, B11 and B14  
**Claim status:** exact \(SU(3)_c\times SU(2)_L\) root-action intertwiner in the sixteen-state model; Lorentz, conjugation and external-carrier compatibility remain open

## 1. From weights to root operators

The previous result assigned every completed Furey matter matrix unit a distinct even-parity five-bit \(SO(10)\) weight and factored all five Cartan coordinates through the two-sided linking action.

Cartan agreement alone does not prove nonabelian covariance. The next test is whether the fermionic-oscillator root operators

\[
E_{ij}=a_i^\dagger a_j
\]

preserve the same Furey block support and obey the expected Lie brackets there.

The colour roots use \(i,j\in\{1,2,3\}\). The weak roots use \(i,j\in\{4,5\}\).

## 2. Exact colour action

For the simple colour root \(E_{12}\), the nonzero transitions are

\[
\begin{aligned}
u^c_1&\longmapsto u^c_2,&
d_2&\longmapsto d_1,\\
u_2&\longmapsto u_1,&
d^c_1&\longmapsto d^c_2.
\end{aligned}
\]

For \(E_{23}\),

\[
\begin{aligned}
u^c_2&\longmapsto u^c_3,&
d_3&\longmapsto d_2,\\
u_3&\longmapsto u_2,&
d^c_2&\longmapsto d^c_3.
\end{aligned}
\]

In block language:

- on \(Q:O_2\leftarrow H\), colour changes the **left** \(O_2\) index;
- on \(u^c:C\leftarrow O_2\) and \(d^c:D\leftarrow O_2\), colour changes the **right** \(O_2\) index;
- leptons are annihilated by colour roots.

Thus the triplet and antitriplet actions arise from opposite faces of the same \(O_2\) linking factor.

## 3. Exact weak action

For the simple weak root \(E_{45}=a_4^\dagger a_5\),

\[
u_i\longmapsto d_i
\quad(i=1,2,3),
\qquad
\nu\longmapsto e.
\]

In block language:

- on \(Q:O_2\leftarrow H\), weak isospin changes the **right** \(H\) index;
- on \(L:H\leftarrow E\), it changes the **left** \(H\) index;
- all weak singlets are annihilated.

The quark and lepton doublets therefore arise from opposite-sided actions of the same \(H\) factor. This is exactly the two-face structure required by their TRO placement.

## 4. Lie closure

On the full sixteen-dimensional even Fock sector, the certificate verifies

\[
[E_{12},E_{23}]=E_{13}
\]

and

\[
[E_{ij},E_{ji}]=N_i-N_j
\]

for the two colour simple roots and the weak root.

Together with their adjoints and the previously verified Cartan action, these operators generate the complete

\[
\mathfrak{su}(3)_c\oplus\mathfrak{su}(2)_L
\]

action. Hypercharge is a linear combination of the five Cartan coordinates, so the full Standard Model gauge Lie algebra acts on the completed TRO without adding states.

## 5. What the intertwiner now preserves

The explicit five-bit/Furey map now preserves:

- all sixteen particle labels;
- \(SU(3)_c\) triplet, antitriplet and singlet structure;
- \(SU(2)_L\) doublet and singlet structure;
- hypercharge through the Cartan action;
- the full five-dimensional charge lattice;
- ternary multiplication;
- cubic anomaly cancellation;
- the puncture/restoration role of \(\nu^c\).

This closes the gauge-module portion of the intertwiner problem posed in the right-handed-neutrino completion document.

## 6. What remains

Three structures are not supplied by this calculation:

### 6.1 Lorentz chirality

All states were represented as left-handed Weyl fields, as in the \(SO(10)\) code construction. The block model still needs an explicit Lorentz action or CAR representation showing that \(D\to E\) has the correct \(\nu^c\) spinor character.

### 6.2 Antiunitary conjugation

Furey’s conjugation must be transported through the new bijection and compared with:

- particle/antiparticle conjugation;
- Dirac pairing in the doubled code;
- the deck or real-structure involution;
- flavor CP.

These operations must not be conflated.

### 6.3 External relational carrier

The completed gauge module does not yet select the positive real two-face response

\[
H_2(\mathbb R)
\]

whose conformal group is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

## 7. Consequence for the programme

The earlier concern that the five-bit code might be unrelated to the Furey block inventory has been removed at gauge-module level. The remaining interface is much narrower:

\[
\boxed{
\text{completed Furey TRO}
\cong
\text{one }SO(10)\text{ generation}
}
\]

as a Standard Model gauge module with compatible ternary charge grading.

The box does **not** assert equality as Lorentz modules, CAR systems, full \(SO(10)\) modules or dynamical theories.

## 8. Highest-value continuations

### A. Transport conjugation

Compute the action of Furey’s explicit anti-linear involution on the sixteen matrix units and express it in the five-bit basis.

**Stop-everything result:** the same involution realizes Dirac pairing and the real-form selector without creating an independent mirror generation.

### B. Build the Lorentz/CAR action

Attach the Weyl spinor factor explicitly and test spin-statistics, chirality and the sterile arrow.

**Stop-everything result:** \(D\to E\) is uniquely the left-handed conjugate of a right-handed neutrino, rather than merely a gauge singlet.

### C. Schur-compress the sterile pair

Use the \(D/E\) puncture-restoration sector as a two-port boundary problem and calculate its positive response.

**Stop-everything result:** the response is canonically \(H_2(\mathbb R)\) and its fractional action is the already established \(Sp(4,\mathbb R)\).

## 9. Falsification gates

**Root-action falsifier:** any Standard Model root sends a state outside the sixteen completed matrix units.

**Common-factor falsifier:** colour or weak actions on the two faces require inequivalent unrelated group copies.

**Lorentz falsifier:** the neutral completion cannot be assigned the correct Weyl/CAR character.

**Mirror falsifier:** transporting conjugation necessarily doubles the physical generation.

**Spin falsifier:** sterile-pair compression yields no canonical real positive two-face response.

**Scope falsifier:** call the gauge-module isomorphism a full \(SO(10)\), Lorentz or dynamical equivalence.

## 10. Certificate

The [nonabelian-root certificate](scripts/verify_five_bit_root_operators_descend_to_furey_tro_blocks.mjs) constructs the full even Fock sector, applies the fermionic bilinears, verifies their blockwise descent, and checks the \(SU(3)\) and \(SU(2)\) commutators exactly.

## Companion documents

- [Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Standard-Model anomaly code](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Furey conjugate-ideal extension](63_furey_conjugate_ideal_extension.md)
