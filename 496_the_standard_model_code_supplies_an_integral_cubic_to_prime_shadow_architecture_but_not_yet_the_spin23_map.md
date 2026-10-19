# The Standard-Model Code Supplies an Integral-Cubic-to-Prime-Shadow Architecture, but Not Yet the \(Spin(2,3)\) Map

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B03, B04, B09, B10, B11, B12 and B14  
**Claim status:** source theorem integrated with independently certified programme results; the binary-refinement and \(Spin(2,3)\) identifications remain open

## 1. Why this paper lands on the programme's current frontier

Prakash and Ramya prove an exact chain:

\[
\boxed{
\text{integral chiral charge lattice}
\xrightarrow{\text{cubic anomaly cancellation}}
\text{integral triorthogonal lattice}
\xrightarrow{\bmod p}
\text{quantum code for every prime }p.}
\]

For one \(SO(10)\) spinor, the sixteen even-parity five-bit weights are one Standard-Model generation including \(\nu^c\). Puncturing the \(\nu^c\) coordinate gives a \([[15,1,3]]_p\) code for every prime. For \(p=2\) it is the fifteen-qubit Bravyi–Kitaev code; for \(p=3\) the paper proves by exhaustive computation that it is the unique shortest distance-three triorthogonal qutrit code.

This is already audited in documents 410 and 444 and independently checked by a local certificate. The new importance is architectural. The programme has just constructed an integral genus-two symplectic carrier whose reductions have:

- full odd-prime behavior at \(3,5,7\);
- a genuinely exceptional binary image;
- one extra mod-four obstruction only in the equal discriminant-five branch.

The paper shows that “one integral object with different prime shadows, especially an exceptional shadow at two” is not a loose analogy. It is an exact and productive organization in the Standard-Model anomaly problem.

It does **not** prove that the code and the genus-two carrier are the same integral object.

## 2. The source theorem in the form needed here

For Weyl fermions with chirality coefficients \(c_\ell\) and charge words \(x,y,z\), define

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

Gauge-anomaly cancellation is the statement that \(\tau_c\) vanishes on the integral charge lattice. Reduction modulo \(p\) makes the same equation the triorthogonality condition of a finite-field code. Thus the finite codes are arithmetic shadows of a single integral cubic identity, not unrelated constructions chosen prime by prime.

For the sixteen weights \(q\in\{\pm1\}^5\) with even sign parity,

\[
\sum_q q_iq_jq_k=0,
\qquad
\sum_q q_iq_j=16\delta_{ij}.
\]

Removing the all-plus weight \(q(\nu^c)=(1,1,1,1,1)\) turns that state into the logical coordinate. The remaining fifteen fermions are the physical coordinates. The transversal cubic phase on them records precisely the cubic anomaly the removed state would have cancelled.

This gives a clean interpretation of puncturing:

\[
\text{complete anomaly-free object}
\longrightarrow
\text{incomplete physical face plus a logical defect coordinate}.
\]

## 3. The binary case contains strictly more arithmetic data

At odd primes, the integral cubic identity reduces directly to finite-field triorthogonality. At \(p=2\), signs collapse and cubic phases require a finer lift. The paper uses sign bits and congruences strong enough to make their span triply even. Besides gauge-anomaly cancellation, the necessary integral statements include

\[
\operatorname{Tr}F^3\equiv0\pmod{16},
\qquad
\operatorname{Tr}(FQ_iQ_j)\equiv0\pmod{16}quad(i\ne j).
\]

For one generation, the relevant overlap numbers are \(8,4,2\), and the binary span is \(RM(1,4)\). Therefore the qubit construction remembers integral divisibility information that is invisible in the naive mod-two cubic equation.

This is the source-backed lesson most relevant to the present arithmetic carrier:

> An exceptional two-adic shadow can be evidence of a missing integral refinement, not a failure of the common integral structure.

That is a methodological transfer. No equality between the code's mod-sixteen conditions and the carrier's mod-four character has been shown.

## 4. The newly resolved carrier character

For the equal discriminant-five handle assignment, the mod-four group has order \(9,216\). Its kernel over the mod-two image has order \(512=2^9\), so it occupies a nine-dimensional hyperplane in

\[
\mathfrak{sp}_4(\mathbb F_2)
=
\left\{
X=\begin{pmatrix}A&B\\C&A^T\end{pmatrix}:
B=B^T,\ C=C^T
\right\}.
\]

An exhaustive exact calculation now finds the unique annihilator of that hyperplane:

\[
\boxed{
\ell(X)=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C
\in\mathbb F_2.}
\]

Thus the missing coset consists of first-kernel directions with \(\ell(X)=1\). The result is stronger than the previous statement that “one direction is missing”: it supplies the exact linear character that must be explained.

The certificate enumerates all \(9,216\) mod-four elements, extracts the \(512\)-element first kernel, proves its Lie span has rank nine, computes its one-dimensional annihilator, and checks the displayed formula.

## 5. What can and cannot be inferred

The following pattern is now real:

| Standard-Model code | Genus-two carrier |
|---|---|
| one integral charge lattice | one integral symplectic transfer group |
| reductions for every prime | congruence images at several primes |
| odd-prime cubic reduction is direct | full local images at \(3,5,7\) |
| \(p=2\) needs extra integral divisibility | \(p=2\) has a restricted image and a mod-four character |
| binary refinement produces \(RM(1,4)\) | equal discriminant five kills \(\ell=1\) kernel directions |

This table identifies a research question, not an isomorphism. In particular:

- the code acts on fifteen fermion coordinates, while the carrier acts on a rank-four symplectic lattice;
- \(\tau_c\) is a coordinatewise cubic, while \(\ell\) is a linear functional on a binary symplectic Lie algebra;
- the code's qubit condition is naturally mod sixteen, while the new carrier obstruction first appears mod four;
- a code Clifford phase space does not by itself select the real noncompact group \(Sp(4,\mathbb R)\).

## 6. The precise bridge to attempt

The correct next object is an explicit two-logical sewing map

\[
\Phi:
\text{punctured integral charge/code data}
\longrightarrow
\mathbb Z^4_{\mathrm{symp}}
\]

with three independently testable properties.

### 6.1 Symplectic property

The commutator pairing of the two logical degrees of freedom must pull back to the standard integral symplectic form. This constructs an actual genus-two phase lattice rather than merely counting two logical variables.

### 6.2 Prime-compatibility property

Reduction of \(\Phi\) modulo \(p\) must intertwine the code operations with the observed handle-group images. A map chosen separately at each prime is insufficient; the point is a single integral map.

### 6.3 Binary-refinement property

The code's exceptional qubit lift must pull back to the carrier character

\[
\ell(X)=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C,
\]

or else predict a demonstrably different character. This is now a finite falsifiable comparison.

If all three properties hold without arbitrary basis choices, the code branch would give an independent arithmetic origin for the same \(Sp(4)\) carrier obtained from Jordan-triple recursion.

## 7. The cubic/Jordan bridge remains a separate gate

Even a successful symplectic sewing would not identify the code cubic with a Jordan determinant. That requires an explicit map \(\Psi\) and a polarized norm identity such as

\[
N_J\bigl(\Psi(x),\Psi(y),\Psi(z)\bigr)
=\lambda\tau_c(x,y,z)
\]

on a declared integral sublattice or quotient.

For the rank-two Jordan carrier \(H_2(\mathbb R)\), the primitive norm is quadratic, while \(Sp(4,\mathbb R)\) appears as its generalized conformal group. Therefore the plausible role of the anomaly cubic is not “it equals the \(H_2\) determinant.” It may instead constrain which integral symplectic sewings or conformal transformations are admissible.

That distinction avoids a category error while preserving a serious path forward.

## 8. Golay and doubling: the paper sharpens the obstruction

The source's doubling theorem exactly realizes a two-face-plus-linking-row architecture:

- Dirac partners form the paired faces;
- weak isospin is the chiral linking row;
- \(\nu\) is the seed and punctured \(\nu^c\) is the logical coordinate.

The construction can be doubled with the ternary Golay code at the finite-field level to produce a \([[37,1,5]]_3\) code. But the ordinary all-positive Golay coefficients cannot lift to a nontrivial integral anomaly-free \(P\)-lattice, because

\[
\sum_\ell\mu_\ell s_\ell^2=0
\]

with all \(\mu_\ell>0\) forces \(s=0\).

The valid frontier is therefore not “attach Golay,” but:

\[
\boxed{
\text{find a mixed-sign integral distance-five }P\text{-lattice with }|N|=1.}
\]

A canonical exceptional or Leech polarization supplying that object would be a major result. Numerical code coincidence without the integral signed lift would not be.

## 9. Stop-everything outcomes

Any of the following should re-root the programme:

1. A basis-independent two-logical sewing satisfies the symplectic, prime-compatibility and binary-refinement properties simultaneously.
2. The pullback of the code's binary lift is exactly \(\ell=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C\).
3. A canonical exceptional integral lattice supplies the required signed distance-five \(P\)-lattice with \(|N|=1\).
4. A polarized exceptional-Jordan cubic restricts exactly to \(\tau_c\) on the completed Furey/code sublattice.
5. The two-logical positive response independently reconstructs the same Siegel domain and \(Sp(4,\mathbb R)\) action as the Jordan-triple route.

## 10. Failure outcomes are also informative

- If no integral sewing exists, the code remains an anomaly-arithmetic layer rather than the origin of the carrier.
- If the binary characters disagree invariantly, the two exceptional \(p=2\) phenomena are separate.
- If only a basis-tuned map works, it does not explain the carrier.
- If the Golay lift requires discretionary signs, it supplies no exceptional selection principle.
- If the cubic norm identity fails, anomaly triorthogonality and exceptional Jordan geometry must remain distinct branches.

## 11. Current judgement

The paper strongly supports the programme's general direction that continuum, integral and finite structures should be treated as different shadows of one object. It also gives a concrete warning: prime two can retain finer integral information than odd-prime reductions.

The new carrier calculation turns that lesson into a precise target. The open question is no longer whether both branches have “some parity.” It is whether the Standard-Model code's binary refinement pulls back, under a canonical two-logical sewing, to the explicit character

\[
\ell(X)=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C.
\]

Until that map is constructed, the relationship is a high-value candidate bridge rather than a derivation of \(Spin_0(2,3)\).

## Certificates and companion documents

- [Initial source audit and triorthogonal-code bridge](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Source/code synthesis after the exact Furey intertwiner](444_prakash_ramya_code_after_the_furey_intertwiner_what_is_now_exact_and_what_remains_open.md)
- [Exact two-adic closure indices](495_the_two_adic_closure_has_index_eighty_for_equal_discriminant_five_and_twenty_otherwise.md)
- [Completed Furey/code Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Two Furey cycles sewn into the genus-two carrier](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [The mod-four defect selects an even genus-two theta characteristic](497_the_equal_discriminant_five_mod_four_defect_selects_an_even_genus_two_theta_characteristic.md)

Executable checks:

```text
node scripts/verify_standard_model_generation_triorthogonal_code.mjs
node scripts/verify_two_adic_handle_group_orders_and_stable_indices.mjs
node scripts/identify_equal_discriminant_five_missing_mod_four_direction.mjs
```
