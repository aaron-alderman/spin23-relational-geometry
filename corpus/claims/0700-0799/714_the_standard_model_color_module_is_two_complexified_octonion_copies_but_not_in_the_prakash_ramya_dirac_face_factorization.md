# The Standard-Model Color Module Is Two Complexified-Octonion Copies, but Not in the Prakash–Ramya Dirac-Face Factorization

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08, B09, B10, B11, B12, B14 and the Prakash–Ramya/Furey intertwiner branch  
**Claim status:** exact \(SU(3)\)-module decomposition and complex-linear intertwiner obstruction; anti-linear or regrouped sewing remains open  
**Certificate:** [verify_prakash_ramya_dirac_faces_do_not_factor_as_two_color_equivariant_octonion_copies.mjs](../../../verification/verify/verify_prakash_ramya_dirac_faces_do_not_factor_as_two_color_equivariant_octonion_copies.mjs)  
**Primary source:** [Prakash and Ramya, *One generation of the Standard Model as a quantum error-correcting code*](https://arxiv.org/abs/2610.21879v1)

## Executive result

The eightfold Dirac-pair multiplicity and the eight-dimensional octonion/Clifford multiplicity have a real representation-theoretic connection, but it is not the naive tensor-factor identification.

Under color \(SU(3)\), the complexified octonions decompose as

\[
\boxed{
\mathbb O_{\mathbb C}
\cong
\mathbf1\oplus\mathbf1\oplus\mathbf3\oplus\bar{\mathbf3}.
}
\]

The complete one-generation Standard-Model color module, including \(\nu^c\), is

\[
\boxed{
\mathcal H_{\rm generation}
\cong
4\cdot\mathbf1
\oplus2\cdot\mathbf3
\oplus2\cdot\bar{\mathbf3}
\cong
2\,\mathbb O_{\mathbb C}.
}
\]

So the full generation really does have the same color representation as two complexified-octonion copies.

However, the Prakash–Ramya doubling groups the fields into physical Dirac faces:

\[
\mathcal H_R
\cong
2\cdot\mathbf1
\oplus2\cdot\bar{\mathbf3},
\]

\[
\mathcal H_L
\cong
2\cdot\mathbf1
\oplus2\cdot\mathbf3.
\]

Neither face is \(\mathbb O_{\mathbb C}\), and the two faces are not isomorphic as complex \(SU(3)\) modules.

Consequently:

\[
\boxed{
\text{full generation}\cong2\mathbb O_{\mathbb C}
\quad\not\Rightarrow\quad
\text{Dirac topology factor}\otimes\mathbb O_{\mathbb C}.
}
\]

The abstract octonion grouping and the physical Dirac-pair grouping cross-cut one another.

## 1. What the paper actually calls doubling

Prakash and Ramya identify the doubled copies with Dirac partners. In the complete sixteen-state picture:

- one face contains \(u^c,d^c,e^c,\nu^c\);
- the other contains \(u,d,e,\nu\);
- the linking row is weak isospin;
- removing \(\nu^c\) gives the fifteen-qudit code, with \(\nu^c\) as the logical qudit.

This is a matter-support decomposition. It is not:

- the external conjugate-background factor needed for a CP dilation;
- the Clifford two-dimensional face carrying \(H_2(\mathbb R)\);
- or the eight-dimensional response multiplicity depolarized in documents 706–707.

The equal dimensions must therefore be tested through representations.

## 2. Color decomposition of the physical faces

Using left-handed Weyl notation:

\[
\nu^c,e^c\sim\mathbf1,
\qquad
u^c,d^c\sim\bar{\mathbf3}.
\]

Thus

\[
\mathcal H_R
=
\mathbf1_{\nu^c}
\oplus\mathbf1_{e^c}
\oplus\bar{\mathbf3}_{u^c}
\oplus\bar{\mathbf3}_{d^c}.
\]

The left face has

\[
\nu,e\sim\mathbf1,
\qquad
u,d\sim\mathbf3,
\]

so

\[
\mathcal H_L
=
\mathbf1_\nu
\oplus\mathbf1_e
\oplus\mathbf3_u
\oplus\mathbf3_d.
\]

The colored components are conjugate representations, not equal representations.

## 3. Character obstruction

For a generic maximal-torus element

\[
g=\operatorname{diag}
(e^{i\alpha},e^{i\beta},e^{-i(\alpha+\beta)}),
\]

write

\[
\chi_{\mathbf3}(g)
=e^{i\alpha}+e^{i\beta}+e^{-i(\alpha+\beta)}.
\]

Then

\[
\chi_{\bar{\mathbf3}}(g)
=\overline{\chi_{\mathbf3}(g)}.
\]

For generic \(\alpha,\beta\), these are unequal. Therefore

\[
\chi_R(g)
=2+2\chi_{\bar{\mathbf3}}(g)
\ne
2+2\chi_{\mathbf3}(g)
=\chi_L(g).
\]

The certificate evaluates a generic torus element and verifies the mismatch explicitly.

## 4. No invertible complex-linear color intertwiner

Schur’s lemma gives

\[
\operatorname{Hom}_{SU(3)}
(\bar{\mathbf3},\mathbf3)=0.
\]

Therefore

\[
\operatorname{Hom}_{SU(3)}
(\mathcal H_R,\mathcal H_L)
\]

acts only between the two singlet multiplicity spaces. Its complex dimension is

\[
2\times2=4,
\]

but every such map vanishes on the six colored dimensions.

Hence:

\[
\boxed{
\text{there is no invertible complex-linear }SU(3)\text{-equivariant Dirac-face exchange}.
}
\]

This is the color-sector version of the earlier observation that physical Dirac exchange needs conjugation, a Higgs/background map or a larger real structure.

## 5. Why the full generation still equals two octonion modules

Adding both faces gives

\[
\mathcal H_R\oplus\mathcal H_L
=
4\cdot\mathbf1
\oplus2\cdot\mathbf3
\oplus2\cdot\bar{\mathbf3}.
\]

Meanwhile

\[
2\mathbb O_{\mathbb C}
=
2\left(
\mathbf1\oplus\mathbf1
\oplus\mathbf3\oplus\bar{\mathbf3}
\right).
\]

The multiplicities agree exactly.

Thus an \(SU(3)\)-equivariant reorganization into two octonion copies exists abstractly. But each octonion copy must mix fields from the two physical Dirac faces so that it contains one \(\mathbf3\) and one \(\bar{\mathbf3}\).

This reorganization cannot simultaneously preserve the original face interpretation “all \(f^c\) versus all \(f\).”

## 6. The crossing diagram

\[
\begin{array}{c|cc}
&\text{Dirac right face}&\text{Dirac left face}\\ \hline
\text{color singlets}
&\nu^c,e^c&\nu,e\\
\text{triplets}
&-&u,d\\
\text{antitriplets}
&u^c,d^c&-
\end{array}
\]

An octonion copy requires:

\[
2\cdot\mathbf1+\mathbf3+\bar{\mathbf3}.
\]

So every octonion copy crosses the vertical Dirac-face division.

This is the precise algebraic meaning of “the two doublings are related but not the same.”

## 7. Three legitimate continuation architectures

### A. Anti-linear physical Dirac exchange

Use complex conjugation to map

\[
\bar{\mathbf3}\longleftrightarrow\mathbf3.
\]

This respects physical pairing but requires an antiunitary/doubled-background treatment like document 713.

### B. Regroup into two octonion modules

Choose an \(SU(3)\)-equivariant decomposition

\[
\mathcal H_{\rm generation}
\cong
\mathbb O_{\mathbb C}^{(1)}
\oplus
\mathbb O_{\mathbb C}^{(2)}.
\]

This makes Furey/octet structure manifest but loses the direct “one face is all conjugate fermions” interpretation.

### C. Typed response copy

Keep the physical matter decomposition unchanged and introduce a separate response module

\[
\mathbb O_{\mathbb C}^{\rm response}.
\]

Construct a Hermitian gauge-invariant kernel from matter bilinears into that response copy. This avoids depolarizing physical matter and is currently the safest synthesis architecture.

## 8. Freedom of the abstract octonion regrouping

The two singlets in each \(\mathbb O_{\mathbb C}\) and the repeated triplet/antitriplet multiplicities mean the regrouping is not unique.

At color level alone, unitary rotations can mix:

- the four singlet copies;
- the two triplet copies;
- the two antitriplet copies.

Weak isospin, hypercharge, electric charge, Yukawa matrices and the Higgs frame must reduce this freedom.

Therefore the representation match is a bridge target, not yet a canonical isomorphism.

## 9. Consequence for the Clifford multiplicity

The Clifford response multiplicity \(C\) carries the real octonion basis underlying \(H_2(\mathbb O)\). Its complexification has the correct color decomposition to receive an octonionic response built from the full generation.

But the Pauli twirl on \(C\) sends all non-scalar multiplicity operators to zero. It must act on a response copy, not directly on the physical matter generation.

The desired map is now more precise:

\[
\boxed{
\mathcal R:
\operatorname{Hermitian\ gauge\text{-}invariant\ matter\ kernels}
\longrightarrow
\mathbb O_{\mathbb C}^{\rm response}
\longrightarrow
H_2(\mathbb R).
}
\]

## 10. Relation to the paper’s exact results

The following source results remain distinct and exact:

- anomaly cancellation equals triorthogonality of the charge lattice;
- removing \(\nu^c\) gives a \([[15,1,3]]_p\) code for every prime;
- the qutrit code is uniquely shortest at its parameters;
- the code doubling pairs Dirac partners;
- the linking row is weak isospin.

None of those results asserts an octonion or Clifford response module. The new representation match is an additional theorem of this programme and should not be attributed to the paper.

## 11. Stop-everything criteria

Stop any direct identification of a physical Dirac face with \(\mathbb O_{\mathbb C}\); their color characters differ.

Stop any claim of a complex-linear color-equivariant Dirac exchange; it has rank at most two on the eight-dimensional face.

Stop the abstract two-octonion regrouping as a physical explanation if weak/hypercharge/Yukawa data admit no compatible decomposition.

Stop identifying physical matter with the depolarized Clifford multiplicity if non-scalar gauge observables are erased.

## 12. Highest-value next calculations

1. Add \(SU(2)_L\times U(1)_Y\) and determine whether any two-octonion regrouping survives before symmetry breaking.
2. Repeat after Higgs breaking under \(SU(3)_c\times U(1)_{\rm em}\).
3. Compute the full equivariant Hermitian bilinear maps into a separate octonion response copy.
4. Test whether the Furey TRO product supplies one of those maps canonically.
5. Compare the response’s even/odd link parity with documents 711–713.

## Companion documents

- [Prakash–Ramya at the current frontier](../0600-0699/689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [Weak-isospin topology Pauli factor](../0600-0699/693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md)
- [Typed topology/Clifford audit](708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md)
- [Dressed-exchange antiunitary obstruction](713_the_higgs_yukawa_dressed_exchange_is_linear_not_an_antiunitary_and_does_not_select_clifford_response_parity.md)
