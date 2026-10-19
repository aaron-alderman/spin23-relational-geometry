# A Fixed Mass Matrix Aligns the Full Free Multiflavor Spectrum while Relative Singular Frames Retain CP

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact finite-flavor free theorem; interacting common-frame closure remains open

## 1. Matrix-valued extension

Let \(M\in M_n(\mathbb C)\) be a fixed Dirac mass matrix. In a fixed-helicity sector, define

\[
H(k)=
\begin{pmatrix}
kI_n&M\\
M^\dagger&-kI_n
\end{pmatrix}.
\]

Its square is block diagonal:

\[
H(k)^2=
\begin{pmatrix}
k^2I_n+MM^\dagger&0\\
0&k^2I_n+M^\dagger M
\end{pmatrix}.
\]

The positive-energy projector is therefore

\[
P_+(k)=\frac12\left(I_{2n}+H(k)[H(k)^2]^{-1/2}\right).
\]

This is a positive orthogonal projector for every real momentum \(k\).

## 2. One singular frame aligns every momentum

Choose a singular-value decomposition

\[
M=U_LDU_R^\dagger,
\qquad
D=\operatorname{diag}(m_1,\ldots,m_n),quad m_i\ge0.
\]

With

\[
W=\operatorname{diag}(U_L,U_R),
\]

one obtains

\[
W^\dagger H(k)W
=
\begin{pmatrix}
kI_n&D\\
D&-kI_n
\end{pmatrix}.
\]

After pairing the left and right component of each singular mode, this is the direct sum

\[
\bigoplus_{i=1}^n
\begin{pmatrix}
k&m_i\\
m_i&-k
\end{pmatrix}.
\]

Consequently

\[
W^\dagger P_+(k)W
=
\bigoplus_{i=1}^n
\frac12
\begin{pmatrix}
1+k/\omega_i&m_i/\omega_i\\
m_i/\omega_i&1-k/\omega_i
\end{pmatrix},
\qquad
\omega_i=\sqrt{k^2+m_i^2}.
\]

Every block is a boundary ray of \(H_2(\mathbb R)_+\). The same momentum-independent pair \((U_L,U_R)\) realifies the entire free spectral family.

## 3. Basis-free form of the chirality-flipping residue

The off-diagonal block of \(P_+(k)\) is

\[
C(k)
=\frac12M(k^2I+M^\dagger M)^{-1/2}
=U_L\operatorname{diag}\left(\frac{m_i}{2\omega_i}\right)U_R^\dagger.
\]

Thus all \(C(k)\) have the same left and right singular vectors. Momentum changes only the nonnegative singular values. This is the exact matrix analogue of scalar residue phase collinearity.

An interacting family \(C(s)\) admits the same free-type realification only if it has a common biunitary frame, equivalently if there exist fixed \(U_L,U_R\) such that every

\[
U_L^\dagger C(s)U_R
\]

is real diagonal or, more generally, belongs to a specified real flavor subalgebra. Positivity alone does not impose this.

## 4. Why physical flavor CP survives

For two fermion sectors sharing a left-handed gauge multiplet, write

\[
M_u=U_{Lu}D_uU_{Ru}^\dagger,
\qquad
M_d=U_{Ld}D_dU_{Rd}^\dagger.
\]

Each sector separately has a real direct sum of \(H_2(\mathbb R)\) spectral rays. Their relative left singular frame is

\[
V=U_{Lu}^\dagger U_{Ld},
\]

the CKM-type mixing matrix. For three generations its rephasing-invariant CP measure can be nonzero:

\[
J=\operatorname{Im}
\left(V_{11}V_{22}\overline{V_{12}V_{21}}\right)\ne0.
\]

Therefore

\[
\boxed{
\text{real two-face residues in each mass sector}
\quad\text{and}\quad
\text{nonzero flavor CP}
\text{ are compatible}.
}
\]

The reality operation acts on each two-face mass block; it does not impose entrywise conjugation on the relative flavor frame.

## 5. What is and is not factorized

The result gives a direct sum of real Jordan carriers,

\[
\bigoplus_i H_2(\mathbb R),
\]

not automatically a single tensor product

\[
H_2(\mathbb R)\otimes A_{\rm flavor}.
\]

When the masses differ, the coefficients \(m_i/\omega_i\) depend on flavor. A universal carrier action commuting with the full flavor algebra is an additional dynamical requirement. The free theorem establishes simultaneous singular-frame alignment, not complete carrier/flavor factorization.

## 6. Exact interacting obstruction

For a family of chirality-flipping blocks \(C_r\), a necessary condition for a common left singular frame is pairwise commutativity of

\[
C_rC_s^\dagger
\]

with the corresponding positive operators when the spectra are nondegenerate; similarly on the right for \(C_r^\dagger C_s\). More directly, if

\[
[C_rC_r^\dagger,C_sC_s^\dagger]\ne0,
\]

then no fixed \(U_L\) can diagonalize both left spectral densities, and the free-type common realification fails.

This gives a practical loop/cut test for interacting self-energies.

## 7. Relation to the exceptional/Furey phase problem

The multiflavor theorem strengthens the Higgs branch:

- a full fixed Yukawa matrix supplies common singular frames for all free poles;
- the two-face real carrier does not erase CKM/PMNS phases;
- the physically meaningful complex data move into relative flavor frames.

It still does not canonically identify an exceptional determinant line with a Furey/Fock top line. Such an identification would need a sewing tensor covariant under \(U_L\) and \(U_R\), not a choice of mass basis.

## 8. Branch decision

- **Closed:** a fixed complex mass matrix aligns the complete free momentum family by one SVD.
- **Closed:** the positive-energy projector decomposes into real \(H_2(\mathbb R)\) rank-one blocks in that frame.
- **Closed:** nonzero CKM-type CP can remain in the relative left singular frame of two separately realified sectors.
- **Closed:** unequal masses give a direct sum, not automatic universal face–flavor tensor factorization.
- **Open:** common singular-frame closure of interacting poles and cuts.
- **Open:** a basis-free exceptional/Higgs/Furey sewing tensor.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive a gauge-covariant sewing tensor whose singular frames simultaneously define the Furey real carrier and the exceptional combined determinant trivialization while leaving a nonzero CKM/PMNS invariant.

**Interacting alignment trigger:** prove that the exact chirality-flipping self-energy has the form

\[
C(s)=U_LD(s)U_R^\dagger
\]

with fixed \(U_L,U_R\) and real \(D(s)\) throughout its spectral support.

**Alignment falsifier:** find two physical spectral blocks whose left or right positive products have a nonzero commutator.

**CP falsifier:** impose one antiunitary on the flavor frames that forces every Jarlskog invariant to vanish.

**Factorization falsifier:** infer a universal tensor-product carrier merely from the direct-sum mass-eigenstate decomposition.

## 10. Certificate

The [multiflavor free spectral-alignment certificate](scripts/verify_fixed_mass_matrix_aligns_free_multiflavor_spectrum_with_cp.mjs) checks a three-flavor complex mass matrix over several momenta, its common SVD realification, projector identities and a nonzero Jarlskog invariant in the relative left frame of two sectors.

## Companion documents

- [Single-mass free spectral alignment](424_a_single_higgs_dirac_mass_aligns_all_free_spectral_residues_into_one_rotated_h2r_slice.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Face–flavor entangled spectral CP](126_face_flavor_entangled_spectral_cp_checkpoint.md)
- [Three-flavor real-face/complex-PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
