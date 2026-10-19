# The Finite \(G_2\) Selector Fixed Algebra Is Eight \(M_2\) Blocks, and Symmetry Alone Cannot Synchronize Them

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B14 and the exceptional-selector branch  
**Claim status:** exact fixed-algebra decomposition and automorphism-twirl no-go  
**Certificate:** [verify_fano_sign_twirl_fixed_algebra_is_eight_m2_blocks.mjs](scripts/verify_fano_sign_twirl_fixed_algebra_is_eight_m2_blocks.mjs)

## Executive result

Document 703 constructed a completely positive dilation of the exceptional real-slice selector. Its unresolved range caveat can now be stated exactly.

On the doubled left-regular space

\[
\mathbb R^2\otimes\mathbb O
\cong\mathbb R^{16},
\]

the Fano-sign group \((\mathbb Z_2)^3\) has eight distinct real characters, each with multiplicity two. Therefore its conjugation-fixed associative algebra is

\[
\boxed{
\operatorname{Fix}(\Phi_{\rm sign})
\cong\bigoplus_{\gamma\in\widehat{(\mathbb Z_2)^3}}M_2(\mathbb R).
}
\]

It has real dimension \(8\cdot4=32\). Its symmetric part has dimension

\[
8\cdot\dim\operatorname{Sym}_2(\mathbb R)=24.
\]

The desired encoded \(H_2(\mathbb R)\) is only the synchronized diagonal

\[
\boxed{
\{A\oplus A\oplus\cdots\oplus A:A\in\operatorname{Sym}_2(\mathbb R)\},
}
\]

of dimension three. Thus the finite twirl leaves exactly \(21\) additional symmetric response directions.

Replacing the finite subgroup by full compact \(G_2\) reduces, but does not eliminate, the excess. Since

\[
\mathbb O=\mathbb R1\oplus\operatorname{Im}\mathbb O
\]

is the sum of the trivial representation and the irreducible seven-dimensional representation, the doubled commutant is

\[
M_2(\mathbb R)\oplus M_2(\mathbb R).
\]

Its symmetric part has dimension six, still three dimensions larger than the desired synchronized \(H_2(\mathbb R)\).

The obstruction is structural: every octonion automorphism fixes \(1\), so no average of octonion automorphisms can force the scalar and imaginary response blocks to be identical on the entire associative dilation.

## 1. Character decomposition of the finite selector

Index the octonion basis by degrees \(v\in\mathbb F_2^3\), with \(v=0\) denoting \(1\). For \(a\in\mathbb F_2^3\), the sign automorphism acts by

\[
R_a e_v=(-1)^{a\cdot v}e_v.
\]

The doubled action is

\[
U_a=I_2\otimes R_a.
\]

Every character occurs once in \(\mathbb O\) and twice in \(\mathbb R^2\otimes\mathbb O\). A matrix unit \(E_{(p,v),(q,w)}\) acquires the factor

\[
(-1)^{a\cdot(v+w)}.
\]

Its group average survives precisely when \(v=w\). For each of the eight values of \(v\), both face indices \(p,q\in\{1,2\}\) remain free. This gives one full \(M_2(\mathbb R)\) block per character.

The certificate evaluates every one of the \(256\) matrix units and finds exactly \(32\) survivors.

## 2. Where the desired carrier sits

The selected left-regular encoding from document 703 is

\[
\begin{pmatrix}
aI_8&rI_8\\
rI_8&bI_8
\end{pmatrix}.
\]

After ordering by character, it becomes the same symmetric matrix

\[
\begin{pmatrix}a&r\\r&b\end{pmatrix}
\]

in all eight character blocks. Hence the \(Spin_0(2,3)\) carrier is not the whole fixed space. It is the synchronized three-dimensional subspace inside the \(24\)-dimensional symmetric fixed space.

The finite automorphism twirl performs the first operation,

\[
\text{remove cross-character coherences},
\]

but not the second,

\[
\text{identify all diagonal character responses}.
\]

These are logically distinct selectors.

## 3. Full \(G_2\) improves the range but meets a no-go

For compact \(G_2\),

\[
\mathbb O=\mathbf1\oplus\mathbf7.
\]

On two copies, both irreducibles have multiplicity two. Real Schur theory therefore gives

\[
\operatorname{End}_{G_2}(\mathbb R^2\otimes\mathbb O)
\cong M_2(\mathbb R)\oplus M_2(\mathbb R).
\]

The two summands are independent responses on the scalar and imaginary isotypic components. The corresponding symmetric fixed cone has dimension \(3+3=6\).

The desired carrier is the diagonal condition

\[
A_{\mathbf1}=A_{\mathbf7}.
\]

But every element of \(G_2=\operatorname{Aut}(\mathbb O)\) preserves both summands. Consequently Haar averaging over \(G_2\), or averaging over any subgroup of \(G_2\), cannot impose that equality on arbitrary ambient matrices.

This is a clean stop condition:

\[
\boxed{
\text{octonion-automorphism symmetry alone cannot make the full CP fixed range equal to }H_2(\mathbb R).
}
\]

## 4. Why document 703 remains valid

The no-go concerns the full associative dilation, not the encoded Jordan sector. On the left-regular image of \(H_2(\mathbb O)\), the off-diagonal block is constrained to be \(L_z\), the diagonal blocks are scalar matrices, and the automorphism average sends

\[
L_z\longmapsto L_{\operatorname{Re}z}
=(\operatorname{Re}z)I_8.
\]

Those encoding constraints already synchronize the character sectors. The twirl then selects \(H_2(\mathbb R)\) exactly.

Therefore there are two viable interpretations:

1. the Jordan encoding is fundamental, so the larger associative range is physically irrelevant; or
2. the associative dilation is fundamental, in which case an additional dynamical constraint must synchronize its isotypic responses.

The present calculation prevents those interpretations from being conflated.

## 5. Highest-value continuations

### 5.1 Derive the Jordan encoding as a superselection rule

Find an invariant action whose finite-energy or observable sector is precisely

\[
\iota\bigl(H_2(\mathbb O)\bigr)
\subset\operatorname{Sym}_{16}(\mathbb R).
\]

This is stronger and more meaningful than adding a projector by hand.

### 5.2 Couple the scalar and imaginary response blocks outside \(G_2\)

Any synchronizer must not be merely another octonion automorphism. Candidate sources include:

- a constraint inherited from the polarized \(H_3(\mathbb O)\) cubic;
- a Jordan-module relation tying diagonal and link responses;
- a spectral penalty for the difference \(A_{\mathbf1}-A_{\mathbf7}\);
- or a source/observable duality that identifies the two multiplicity matrices.

Each candidate must preserve positivity and must not erase Furey's internal complex/color factor.

### 5.3 Treat synchronization as a dynamical gap

A positive penalty

\[
V_{\rm sync}
=\lambda\,\|A_{\mathbf1}-A_{\mathbf7}\|^2
\]

would leave the synchronized carrier at low energy. This would convert exact kinematic selection into an inverse-gap approximation, fitting the programme's existing two-stage selector error analysis. The coefficient and tensor contraction must be derived rather than chosen.

## 6. Furey factorization boundary

The result strengthens the need for two typed factors:

\[
\mathcal H_{\rm total}
\sim
\mathcal H_{\rm response}\otimes\mathcal H_{\rm matter}.
\]

The \(G_2\) response twirl may select a real external carrier, while Furey's \(SU(3)\)-stabilized complex octonionic structure remains on the matter factor. A diagonal action on both would erase the internal complex direction.

The new synchronization mechanism must therefore be local to the response factor or arise from a controlled relational coupling. It cannot be an untyped global octonion average.

## 7. Falsification and stop conditions

Stop this route if any of the following occurs:

- the proposed fundamental observable algebra is the full \(M_{16}\) but no source-derived synchronizer exists;
- synchronization requires acting on and destroying the Furey matter complex structure;
- the penalty introduces negative-norm modes or violates complete positivity;
- radiative corrections regenerate unsynchronized blocks without a protecting principle;
- or the \(H_3(\mathbb O)\) cubic fails to constrain the doubled response blocks as required.

If instead the polarized cubic or a Jordan-module action forces the synchronized left-regular sector, then the exceptional-to-\(Spin(2,3)\) descent gains an actual selection mechanism rather than a chosen subspace.

## 8. What is proved and what is not

Proved:

- the finite fixed algebra is \(\bigoplus_8M_2(\mathbb R)\);
- its symmetric part has dimension \(24\);
- the encoded \(H_2(\mathbb R)\) is the synchronized dimension-three subspace;
- full \(G_2\) leaves a six-dimensional symmetric commutant;
- automorphism twirling alone cannot synchronize scalar and imaginary response blocks.

Not proved:

- that the left-regular Jordan sector is the fundamental observable algebra;
- that the exceptional cubic supplies the missing synchronizer;
- that a physical Lindbladian realizes either twirl;
- or that the selector couples consistently to the full Standard Model action.

## 9. Immediate programme consequence

The exceptional branch has crossed a useful boundary. Existence of a positive/CP real-slice selector is solved. The next problem is no longer “can \(G_2\) project to the real carrier?” It is:

\[
\boxed{
\text{what principle makes the Jordan-encoded synchronized sector physical?}
}
\]

That question is narrower, falsifiable and directly connected to the programme's central distinction between a relational carrier and an arbitrary ambient tensor product.

## Companion documents

- [Exceptional cubic polarization and the \(G_2\)-fixed real slice](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Finite \(G_2\)-subgroup CP selector](703_an_eight_element_octonion_automorphism_twirl_is_a_cp_dilation_of_the_h2o_to_h2r_selector.md)
- [Jordan selection axioms and \(Spin(2,4)\to Spin(2,3)\) descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Two-stage selector error bound](692_the_full_two_stage_selector_has_a_joint_inverse_gap_and_exponential_time_error_bound.md)
