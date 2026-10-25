# Frontier Wave 7.135: A Physical Operator-Tomography Dictionary for the Monster Stack

**Date:** 25 October 2026

**Status:** exact CFT measurement dictionary; laboratory field identification open

**Evidence:** [operator-tomography record](../../../../evidence/data/monster-edge-operator-tomography-dictionary-v1.json)

**Certificate:** [Jordan correlator reconstruction](../../../../verification/verify/verify_monster_edge_operator_tomography_dictionary.mjs)

## Result

Once the Leech orbifold is treated as a physical chiral edge, the associated
structures acquire ordinary measurement meanings:

| VOA/categorical object | edge observable |
|---|---|
| state \(a\) | chiral field \(\mathcal O_a\) |
| \(L_0-c/24\) | finite-size edge Hamiltonian |
| \(a_3b\), for \(a,b\in V_2\) | two-point/OPE vacuum coefficient |
| \(a_1b\) | second-order OPE pole and Griess product |
| Miyamoto involution | invertible Ising-sector symmetry line |
| twined character | thermal trace with a line insertion |
| TY \(F\)-symbol | four-junction recoupling amplitude |
| Norton--Sakuma type | two-Ising-field algebra from overlap and return order |

This establishes physicality without saying that all of these products are
the same kind of object.

## 1. Sixteen-correlator Jordan reconstruction

Choose a declared \(H_2(\mathbb R)\) corner with basis

\[
B_1=E_{11},\qquad B_2=E_{22},\qquad
B_3=E_{12}+E_{21}.
\]

Its product and form are

\[
A\circ B={AB+BA\over2},\qquad
\langle A,B\rangle=\operatorname{Tr}(AB).
\]

Only six independent two-point coefficients \(G_{ij}\) and ten fully
symmetric three-point coefficients

\[
C_{ijk}=\langle B_i\circ B_j,B_k\rangle
\]

are needed. Raising the final index with \(G^{-1}\) reconstructs every
structure constant. The certificate performs that reconstruction and checks
the Jordan identity on held-out superpositions.

The determinant becomes

\[
\det\begin{pmatrix}a&b\\b&c\end{pmatrix}
=ac-b^2=t^2-x^2-y^2,
\]

so positive matrices supply the Lorentz cone. The TKK prolongation is
\(\mathfrak{sp}_4(\mathbb R)\cong\mathfrak{so}(2,3)\). This makes the
\(Spin(2,3)\) structure a measurable response algebra of the selected corner;
it does not make it spacetime until a carrier and dynamics select that
interpretation.

## 2. Exceptional-pair tomography

For two Ising conformal vectors, measure:

1. their normalized two-point overlap;
2. the return order of the product of their Miyamoto lines; and
3. selected OPE coefficients as a held-out check.

The first two quantities identify one of the nine Norton--Sakuma algebras.
Their order pattern forms the affine-\(E_8\) atlas. Since
\((V^\natural)_1=0\), this is an atlas of operator-pair types—not an
\(E_8\) current algebra or gauge field.

## 3. Same-carrier promotion

A provenance-sensitive experiment must recover, on the same zero-current
\(c=24\) edge:

- the 16-correlator Jordan corner;
- an untrained Norton--Sakuma pair type;
- a TY recoupling amplitude;
- the shared Monster defect action connecting them.

Separate programmed devices prove emulatability. Common-carrier correlations
are what promote the structures to one physical Monster subtheory.

## Corpus links

- [Griess–Jordan corner](frontier_wave7_116_monster_griess_jordan_corner_to_spin23.md)
- [Ising-pair affine-\(E_8\) atlas](frontier_wave7_117_monster_ising_pair_affine_e8_operator_atlas.md)
- [Leech-edge proof](frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md)
- [Condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
