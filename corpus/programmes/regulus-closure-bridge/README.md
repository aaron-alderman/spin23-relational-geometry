# Regulus closure bridge

**Opened:** 26 October 2026

**Status:** exact finite incidence pass; physical interpretation open

## Result

A regulus is not merely a visual analogy for the corpus's two-face grammar.
It is an exact local closure object connecting four structures already present
in the corpus:

\[
 \text{line incidence}
 \longrightarrow
 \text{Klein quadric }Spin(3,3)
 \xrightarrow{\text{symplectic slice}}
 \text{Lagrangian quadric }Spin(2,3)
 \longrightarrow
 \text{finite }E_6\text{ incidence}.
\]

The executable calculation over \(\mathbb F_3\) finds:

- 40 Lagrangian points and 40 four-point pencil lines in \(Q(4,3)\);
- 45 hyperbolic 16-point sections;
- two opposite four-line reguli in every hyperbolic section;
- exact three-line closure onto the opposite four-line regulus;
- a 45-vertex section graph with parameters
  \(\operatorname{SRG}(45,12,3,3)\);
- exactly 27 maximal five-cliques, reconstructing the incidence counts of the
  27 lines and 45 tritangent planes on a cubic surface;
- 36 elliptic sections whose stabilizers split the 27 lines as \(12+15\),
  with each 12 forming \(K_{6,6}\) minus a perfect matching: the 36 classical
  double-sixes;
- transitive \(PSp_4(3)\) actions on the reconstructed 27 lines, 36
  double-sixes and 45 tritangent planes.

This supplies a new finite-geometric route from the corpus's 40 qutrit
polarizations to its even-\(E_6\) symmetry. It does not supply dynamics, a
physical carrier or an \(E_8\) root identification.

## Executable artifacts

- [Analysis](../../../scripts/analyze-regulus-spin23-bridge.mjs)
- [Machine evidence](../../../evidence/data/regulus-spin23-bridge-v1.json)
- [Independent verifier](../../../verification/verify/verify_regulus_spin23_bridge.mjs)

Run:

```powershell
node scripts/analyze-regulus-spin23-bridge.mjs --write
node verification/verify/verify_regulus_spin23_bridge.mjs
```

## Detailed finding

See [Regulus closure, the symplectic slice and the finite E₆ incidence
layer](01_regulus_closure_symplectic_slice_and_e6_incidence.md).

## Authority boundary

The finite incidence structure is exact. Its identification with the abstract
Schläfli \(27\)-line/\(36\)-double-six/\(45\)-tritangent configuration is an incidence and group-
action result, not the construction of a particular cubic surface in physical
space. No incidence count establishes a field equation, interaction,
spacetime ontology or exceptional unification.

