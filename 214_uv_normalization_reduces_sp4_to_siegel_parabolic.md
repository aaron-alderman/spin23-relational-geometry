# Ultraviolet Normalization Reduces Abstract \(Sp(4,\mathbb R)\) Response Symmetry to a Siegel Parabolic

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact for the normalized Herglotz class \(K(iy)/(iy)\to M>0\); application to subtracted stress correlators requires a declared renormalization prescription

## 1. Abstract passive symmetry versus physical normalization

The Siegel upper half-space consists of complex symmetric \(2\times2\) matrices with positive imaginary part. Therefore every real symplectic matrix

\[
g=\begin{pmatrix}A&B\\C&D\end{pmatrix}\in Sp(4,\mathbb R)
\]

acts on a matrix Herglotz response by postcomposition,

\[
K(z)\longmapsto g\cdot K(z)
=(AK+B)(CK+D)^{-1},
\]

whenever the denominator is invertible. The abstract causal/passive class is preserved.

Physical response functions carry additional ultraviolet data. Consider the normalized class

\[
\frac{K(iy)}{iy}\longrightarrow M>0
\qquad (y\to\infty).
\]

This asymptotic coefficient is the linear term in the matrix Nevanlinna representation. It is not preserved by the full symplectic group.

## 2. Why the lower-left block must vanish

Insert \(K(iy)\sim iyM\). If \(C\ne0\), then generically

\[
(AiyM+B)(CiyM+D)^{-1}
\]

has a finite limit or loses linear growth in the directions seen by \(C\). The symplectic inversion

\[
g_J=\begin{pmatrix}0&-I\\I&0\end{pmatrix}
\]

is the sharp example:

\[
K\mapsto-K^{-1},
\qquad
iyM\mapsto \frac{i}{y}M^{-1}.
\]

Thus a transformation preserving the whole normalized linear-growth class must have

\[
C=0.
\]

The symplectic conditions then imply

\[
D=A^{-T},
\qquad
Q:=BA^T=Q^T,
\]

and the action becomes

\[
K\longmapsto AKA^T+Q.
\]

This is the Siegel parabolic

\[
P\cong GL(2,\mathbb R)\ltimes Sym_2(\mathbb R).
\]

## 3. Meaning of the two factors

The congruence part changes the ultraviolet coefficient by

\[
M\mapsto AMA^T
\]

and transforms the spectral density in the same way. The real symmetric translation \(Q\) changes only the real/contact part and leaves the imaginary spectral matrix unchanged.

If the ultraviolet coefficient \(M\) is fixed rather than merely allowed to transform, the continuous congruence freedom reduces to

\[
O(M)=\{A:AMA^T=M\}.
\]

Modulo contact translations, a fully normalized response therefore retains only an orthogonal stabilizer, not full \(Sp(4,\mathbb R)\).

## 4. KMS compatibility

At fixed temperature, the parabolic transformation gives

\[
\rho\mapsto A\rho A^T,
\qquad
N_\beta\mapsto AN_\beta A^T,
\]

so

\[
N_\beta=\coth(\beta\omega/2)\rho
\]

is preserved directly. The translation \(Q\) is a contact-term shift and does not alter either spectral quantity.

For a general fractional transformation with \(C\ne0\), positivity of the transformed imaginary part remains true, but interpreting the transformed fluctuation kernel requires a nontrivial, response-dependent transformation of sources and noise. Abstract cone automorphism is again weaker than physical symmetry.

## 5. Stress-tensor qualification

Raw stress correlators grow with higher powers and require local subtractions. The theorem applies to a normalized Herglotz response after the subtraction/choice of response variable has been declared. Different local counterterms alter \(Q\)-type data but not the cut spectral density.

Consequently:

- the full \(Sp(4,\mathbb R)\) action is exact on the unconstrained Siegel response domain;
- causal ultraviolet normalization selects the Siegel parabolic;
- fixing the leading normalization reduces it further to an orthogonal stabilizer plus contact shifts;
- a physical restoration of the missing fractional generators would require ultraviolet data or the response variable itself to transform.

## 6. Stop-everything and falsification gates

**Full-group restoration:** a microscopic theory supplies dynamical ultraviolet moduli that transform with \(K\), making the fractional \(C\ne0\) generators physical rather than normalization-changing dualities.

**Parabolic closure:** every admissible local QFT response preserves one fixed ultraviolet class. Then the physical response symmetry is parabolic or smaller.

**Normalization falsifier:** the proposed Herglotz variable has no well-defined positive linear coefficient after permitted subtractions. Then this theorem does not classify that variable.

**Contact-term gate:** distinguish real symmetric translations from measurable spectral transformations before attributing physical content to the nilpotent part of the parabolic.

## 7. Certificate

The [UV-normalized symplectic-action certificate](scripts/verify_uv_normalized_sp4_parabolic.mjs) verifies symplectic inversion and parabolic embeddings, positivity preservation on sample Siegel matrices, loss of linear growth under inversion and preservation of linear growth under congruence plus real contact translation.

## Companion documents

- [KMS--Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Hydrodynamic local-rank response](212_hydrodynamic_stress_map_can_have_local_rank_three.md)
- [Global Sp(4,R)--Spin(2,3) isomorphism](47_global_group_isomorphism_sp4r_spin023.md)
