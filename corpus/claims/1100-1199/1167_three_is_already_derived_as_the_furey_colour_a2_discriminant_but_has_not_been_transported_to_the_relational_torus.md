# Three Is Already Derived as the Furey Colour \(A_2\) Discriminant, but Has Not Been Transported to the Relational Torus

**Date:** 19 October 2026  
**Branches:** level selection, \(A_2\) colour lattice, discriminant Weil module, compact torus, internal-to-relational transport  
**Claim status:** exact distinction and convergence theorem; physical transport from colour arithmetic to relational phase space remains open

## Executive result

Document 1166 left “derive level three” as if the integer were absent from the physical corpus. That is too pessimistic and not precisely typed.

The programme already derives three internally:

\[
SU(3)_{\rm colour}
\Longrightarrow
Q(A_2)
\Longrightarrow
\det A_2=3
\Longrightarrow
A_2^*/A_2\cong\mathbb Z_3.
\]

Furey's octonionic construction contains the Standard-Model colour \(SU(3)\) stabilizer, so the \(A_2\) root lattice is not imported solely to fit a qutrit model. Its discriminant group has order three, and in genus two its Weil coefficient space has

\[
\dim\mathbb C[(A_2^*/A_2)^2]=3^2=9.
\]

This is a real derivation of the prime three inside the Standard-Model/Furey representation data.

However, it is not yet a derivation of a level-three prequantum line bundle on the relational phase/flux torus. These are two distinct mathematical sources that yield the same finite Heisenberg module:

\[
\begin{array}{ccl}
\text{principal torus at Chern level }3
&\Longrightarrow&
(\mathbb Z/3)^4,\quad\dim\mathcal H=9,\\[2mm]
\text{genus-two discriminant theory of }A_2
&\Longrightarrow&
D^2\text{ labels},\quad D=A_2^*/A_2\cong\mathbb Z_3,\quad\dim=9.
\end{array}
\]

Their finite representations are equivalent after a polarized symplectic identification. Their physical interpretations are not automatically identical.

The remaining gate is therefore:

\[
\boxed{
\text{transport the internally derived }A_2\text{ discriminant pairing}
\text{ to the two relational conjugate ports.}
}
\]

If that transport is derived, “three” need not be postulated again as an independent torus level. If it cannot be derived, a separate flux-three boundary law is still required.

## 1. Two uses of the word “level”

### 1.1 Prequantum Chern level

For a principally polarized Abelian surface \((\mathcal A,L)\), use \(L^N\). Then

\[
h^0(\mathcal A,L^N)=N^2.
\]

At \(N=3\), the theta labels form \((\mathbb Z/3)^2\), and the finite Heisenberg exponent module is \((\mathbb Z/3)^4\). Here three is a symplectic-flux or first-Chern-class multiplier.

### 1.2 Lattice discriminant level

For an even lattice \(L\), the finite quadratic module is

\[
D_L=L^*/L.
\]

For \(L=A_2\),

\[
|D_L|=\det(A_2)=3.
\]

In genus two, the coefficient labels form \(D_L^2\), again giving nine states and an exponent module of order \(3^4\). Here three is the index of the root lattice in its dual/weight lattice.

The two constructions yield isomorphic finite symplectic and Heisenberg data. They are not the same derivation of that data.

## 2. The prime three is intrinsic to colour \(SU(3)\)

With simple roots

\[
\alpha_1=(1,-1,0),
\qquad
\alpha_2=(0,1,-1),
\]

the Gram matrix is

\[
G_{A_2}
=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad
\det G_{A_2}=3.
\]

The first fundamental weight is

\[
\lambda_1=\frac{2\alpha_1+\alpha_2}{3}.
\]

Its class generates \(A_2^*/A_2\), and

\[
q(\lambda_1)=\frac{(\lambda_1,\lambda_1)}2=\frac13\pmod1.
\]

Thus the finite phase \(e^{2\pi i/3}\) and the qutrit root of unity follow from the \(A_2\) quadratic lattice, rather than being free numerical decorations.

## 3. Why the two nine-state representations coincide

Both constructions produce:

1. a four-dimensional symplectic exponent module over \(\mathbb F_3\);
2. a Heisenberg centre acting by \(\omega=e^{2\pi i/3}\);
3. an irreducible Hilbert representation of dimension \(3^2\);
4. Fourier operators exchanging conjugate polarizations;
5. quadratic refinements implementing symplectic shears.

Finite Stone–von Neumann uniqueness identifies the Heisenberg representations after a symplectic module map. The certificate in document 1166 verifies a compatible choice of Fourier and shear refinements.

This establishes

\[
\mathcal H_{\text{principal torus},N=3}
\cong
\mathbb C[D_{A_2}^2]
\]

as finite Weil carriers. It does not establish

\[
\text{colour root/weight observable}
=
\text{relational phase/flux observable}.
\]

The latter is an assertion about physical observables, not representation classification.

## 4. The exact missing square

The programme now has three sides of a square:

\[
\begin{array}{ccc}
SU(3)_{\rm colour}&\Longrightarrow&A_2^*/A_2\cong\mathbb Z_3\\
&&\Downarrow\text{ genus two}\\
\text{relational }Sp(4,\mathbb R)&\dashrightarrow&\mathbb C[(\mathbb Z/3)^2].
\end{array}
\]

The top, right and bottom representation statements exist. The dashed transport is missing.

A successful transport must say what the two \(\mathbb Z_3\) labels mean physically. Candidate meanings include:

- two genus-handle colour-discriminant holonomies;
- two boundary defects carrying screened triality;
- two compact value/flux ports obtained after integrating out gapped coloured matter;
- two logical puncture charges fixed by Standard-Model line operators.

Naming one is not enough. Its observable algebra and response action must be calculated.

## 5. Why bulk colour centre does not close the square

Pure \(SU(3)\) Yang–Mills has a \(\mathbb Z_3\) centre one-form symmetry. The Standard Model contains dynamical quarks in fundamental and antifundamental representations. Fundamental Wilson lines can therefore end on matter worldlines, so the standalone centre one-form symmetry is broken.

Consequently,

\[
SU(3)\text{ colour centre}
\overset{\text{not automatic}}{\Longrightarrow}
\text{deconfined }\mathbb Z_3\text{ BF sector in the bulk}.
\]

The faithful Standard-Model gauge group also uses the diagonal \(\mathbb Z_6\) quotient, intertwining colour centre, weak centre and hypercharge. This enriches the global line-operator structure, but a quotient kernel is not by itself a dynamical topological field theory.

Thus three is internally derived while the compact relational realization remains obstructed in the ordinary bulk.

## 6. The strongest surviving route is a boundary or defect

On a boundary or defect where coloured matter is gapped, confined, paired or unable to end the relevant Wilson lines locally, an effective discriminant sector may survive.

The desired derivation has the schematic form

\[
\text{Furey colour }A_2
+\text{ faithful }\mathbb Z_6\text{ quotient}
+\text{ defect conditions}
\Longrightarrow
\frac{3}{2\pi}\int B_1\wedge dB_2
\]

or an equivalent integral boundary pairing.

It must establish:

1. which gauge-invariant defect operators carry the two discriminant labels;
2. why their pairing is hyperbolic and nondegenerate;
3. why quark screening does not erase them on the defect;
4. how the three self/mutual shear directions act;
5. how the operators couple to the Jordan/stress response ports;
6. which orientation chooses \(2ab\) rather than its inverse.

If these checks pass, the \(A_2\) discriminant supplies the finite level. No separate numerological appeal to three generations is needed.

## 7. Why three generations are not the selector

The occurrence of three fermion generations does not presently enter the exact carrier derivation. The nine states arise as

\[
|D_{A_2}|^g=3^2
\]

from discriminant order three and genus two, not as \(3\times3\) generations and particles.

Using generations as an explanation would be circular unless a dynamical map connects family replication to the \(A_2\) discriminant or the two handles. The corpus has not established that map.

## 8. Revised home-stretch assessment

### Finite representation branch: complete

The finite carrier, its gates, its \(A_2\) origin and its equivalence to compact level-three quantization are exact.

### Integer-three selection: internally complete, externally incomplete

The number three is derived from the colour root/weight lattice. It is not yet transported to the relational phase space.

### Physical unification branch: one structural map short

The main missing object is no longer a mysterious integer. It is a functor or interface that sends internal \(A_2\) discriminant data to compact relational observables while respecting gauge invariance, screening, the symplectic pairing and the mutual gate.

This is genuinely closer to a finish line: a named map with six tests has replaced a vague request for a qutrit-scale coincidence. But it may still fail. If the Standard Model admits no suitable defect, then the matching finite models remain parallel realizations rather than one physical structure.

## 9. Claim ledger

- **Exact:** Furey colour contains the \(SU(3)\) \(A_2\) root lattice.
- **Exact:** \(\det A_2=3\) and \(A_2^*/A_2\cong\mathbb Z_3\).
- **Exact:** genus two gives nine discriminant labels and a four-dimensional \(\mathbb F_3\) exponent module.
- **Exact:** this finite Weil carrier is equivalent to principal torus quantization at Chern level three after a polarized module map.
- **Exact distinction:** discriminant order three and prequantum Chern level three are different inputs with equivalent finite shadows.
- **Exact obstruction:** dynamical quarks break the standalone bulk colour-centre one-form symmetry.
- **Open:** boundary/defect survival of the discriminant sector.
- **Open:** transport from internal colour labels to external relational conjugate ports.
- **Not established:** that three generations select this carrier.
- **Not established:** a deconfined \(\mathbb Z_3\) topological order in the Standard-Model bulk.

## 10. Stop-everything and falsification gates

**Transport trigger:** construct two gauge-invariant compact defect observables whose commutator is the \(A_2\) discriminant pairing and whose response gates are the certified finite Weil matrices.

**Boundary-action trigger:** derive a level-three hyperbolic topological term from the Furey/Standard-Model field content and boundary conditions.

**Screening falsifier:** fundamental quark endpoints remain locally available and destroy the proposed defect line algebra.

**Type falsifier:** determinant three of the colour Gram matrix is called a Chern level on the relational torus without an intervening transport construction.

**Generation falsifier:** the observed three families are used as an explanation without a family-to-discriminant map.

## 11. Certificate

The [two-routes-to-nine certificate](../../../verification/verify/verify_a2_discriminant_three_and_principal_level_three_give_the_same_finite_carrier_data.mjs) verifies the \(A_2\) determinant, inverse Gram matrix, order-three discriminant generator, quadratic value \(1/3\), genus-two state count, level-three torus state count and common finite exponent-module order. The earlier [colour obstruction certificate](../../../verification/verify/verify_furey_color_a2_root_lattice_matches_response_but_fundamental_quarks_break_center_one_form_symmetry.mjs) verifies quark screening and the faithful \(\mathbb Z_6\) data.

## Companion documents

- [Compact theta/\(A_2\) Weil equivalence](1166_level_three_torus_theta_quantization_is_exactly_the_nine_state_a2_weil_carrier_but_level_three_remains_physical_input.md)
- [Furey colour \(A_2\) and centre obstruction](../0400-0499/468_the_furey_color_root_lattice_is_exactly_the_a2_response_but_quarks_obstruct_a_standalone_z3_bf_sector.md)
- [BF/code prime-selection no-go](../0400-0499/466_the_bf_modular_pair_embeds_exactly_in_the_two_qutrit_clifford_group_but_the_anomaly_code_does_not_select_level_three.md)
- [Unique determinant-three even lattice](../0400-0499/467_a2_is_the_unique_even_positive_rank_two_lattice_of_discriminant_three_but_evenness_is_a_physical_assumption.md)
