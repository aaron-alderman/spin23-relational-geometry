# The Fifteen-State Yukawa Grading Forces One Neutrino Zero Mode per Generation

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact Standard-Model representation count and bipartite mass-matrix theorem; full momentum-dependent Furey kinetic realization remains open

## 1. Applying the odd-dimensional theorem to one generation

One Standard-Model generation without a right-handed neutrino contains fifteen left-handed Weyl components.

The weak-doublet side has

\[
Q_L:3\times2=6,
\qquad
L_L:2,
\]

for a total of

\[
n_D=8.
\]

The singlet-conjugate side has

\[
u^c:3,
\qquad
d^c:3,
\qquad
e^c:1,
\]

for

\[
n_S=7.
\]

Thus

\[
15=8+7.
\]

## 2. Higgs/Yukawa masses are bipartite

After inserting a neutral Higgs background, Dirac Yukawa masses connect weak-doublet components to singlet conjugates. In the doublet/singlet basis, the fermion mass operator has the form

\[
H_Y=
\begin{pmatrix}
0&M\\M^\dagger&0
\end{pmatrix},
\qquad M:\mathbb C^7\to\mathbb C^8.
\]

Define

\[
W=\begin{pmatrix}I_8&0\\0&-I_7\end{pmatrix}.
\]

Then

\[
\boxed{WH_YW^\dagger=-H_Y.}
\]

This is precisely the kinetic-symmetry condition obtained from the common-carrier antiunitary analysis, restricted to the Yukawa mass operator.

## 3. Rectangular rank forces a zero mode

Because \(M\) is \(8\times7\),

\[
\operatorname{rank}M\leq7.
\]

Therefore

\[
\dim\ker M^\dagger\geq1,
\]

and \(H_Y\) has at least one zero mode on the weak-doublet side.

For generic full rank seven, exactly one doublet component remains massless. Once the charged quarks and charged lepton acquire nonzero masses, the unmatched state is the neutrino.

Hence

\[
\boxed{
\text{15-state Dirac-Yukawa grading}
\Longrightarrow
\text{at least one neutrino zero mode per generation}.}
\]

This is standard rank counting, but it now appears as the concrete odd-dimensional zero-mode theorem for the Furey/CAR relative unitary \(W\).

## 4. Three generations

With three generations and no right-handed neutrinos,

\[
n_D=24,
\qquad
n_S=21.
\]

The same argument gives

\[
\dim\ker H_Y\geq3.
\]

Thus an exact bipartite Dirac-Yukawa grading leaves at least three massless neutrino modes.

Observed neutrino masses require the grading to be completed or broken.

## 5. Dirac and Majorana forks

### Dirac completion

Adding one \(\nu^c\) per generation changes the one-generation count to

\[
8+8=16.
\]

The rectangular obstruction disappears, and a full-rank Dirac mass matrix is allowed. The relative unitary grading can remain exact on the mass term.

### Majorana/Weinberg breaking

The dimension-five Weinberg operator or a left-handed Majorana mass adds a doublet–doublet block:

\[
H_M=
\begin{pmatrix}
A_M&M\\M^\dagger&0
\end{pmatrix}.
\]

Then

\[
WH_MW^\dagger\neq-H_M
\]

when \(A_M\neq0\). The protected zero mode can be lifted because the bipartite grading is broken.

This reproduces the programme’s existing neutrino fork in a new language:

\[
\begin{array}{ll}
\text{Dirac neutrino}:&\text{balance the two grading sectors;}\\
\text{Majorana neutrino}:&\text{break the grading within one sector.}
\end{array}
\]

## 6. Why this is not yet a full kinetic symmetry

The spacetime kinetic operator acts within each Weyl block, whereas the mass operator acts between grading sectors. Consequently the simple internal \(W\) commutes with the diagonal momentum term rather than anticommutes with it.

A full Hamiltonian symmetry must additionally:

- send \(p\mapsto-p\);
- include a Lorentz/spin matrix that reverses the Weyl kinetic operator;
- or apply only to the zero-momentum/internal mass problem.

The exact result established here is the Yukawa/mass grading and zero-mode count. Extending it to a local Furey–Dirac operator is the next gate.

## 7. Relation to cyclic Furey topology

The cyclic Furey rule correctly selects the allowed Higgs-dressed Yukawa incidences. Its three-edge internal block cycles include a bosonic Higgs arrow and must not be confused with an odd cycle in the fermionic one-particle mass graph.

After the Higgs background is inserted, the fermionic mass graph is bipartite: weak doublets connect to singlets. Thus the cyclic internal action and the bipartite fermion grading are compatible rather than contradictory.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the common Furey carrier derives \(W=+1\) on the eight doublet components and \(-1\) on the seven singlet components, while its Lorentz factor extends the symmetry to the full kinetic operator.

**Neutrino trigger:** the same algebraic choice that selects the 15-state survivor also forbids \(\nu^c\) and forces the Majorana/Weinberg grading-breaking route.

**Dirac trigger:** the 16-state completion canonically adds \(\nu^c\), balances the grading and permits a full Dirac gap.

**Rank falsifier:** a full-rank 15-state purely bipartite Dirac mass matrix is claimed despite the \(8\times7\) rectangular block.

**Symmetry falsifier:** the internal mass anticommutation is promoted to a full momentum-space kinetic symmetry without specifying the Lorentz or momentum action.

## 9. Certificate

The [fifteen-state Yukawa zero-mode certificate](../../../verification/verify/verify_fifteen_state_yukawa_bipartite_zero_mode.mjs) checks the \(8+7\) representation count, grading anticommutation, explicit protected zero mode, balanced \(8+8\) Dirac completion and Majorana grading breaking.

## Companion documents

- [Second real structure parameterized by \(W\)](311_a_second_polarization_reversing_real_structure_is_parameterized_by_one_unitary.md)
- [Unique right-handed-neutrino TRO completion and \(Spin(2,3)\) tradeoff](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Cyclic Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Majorana reality and sterile selector](../0200-0299/281_majorana_reality_gives_a_sterile_triplet_but_a_selector_must_create_jordan_signature.md)
