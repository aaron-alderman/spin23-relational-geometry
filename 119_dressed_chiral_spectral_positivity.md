# Spectral Positivity of the Dressed Two-Face Chiral Response

**Date:** 17 October 2026  
**Branches:** B05, B08 and B11  
**Claim status:** exact matrix-valued spectral theorem and finite certificate for the CP-even spin-projected sector; full fermionic reflection proof remains open

## 1. Spectral response

Let the two dressed faces be

\[
\chi=(\chi_L,\chi_R)^T.
\]

After projecting spinor indices against admissible Euclidean test spinors, a positive spectral representation has residues

\[
\rho_n=r_nr_n^T\ge0,
\qquad
r_n\in\mathbb R^2
\]

in the CP-even one-generation sector.

The Euclidean response is the matrix Stieltjes function

\[
C_E(q^2)
=
\sum_n\frac{\rho_n}{q^2+m_n^2},
\qquad q^2\ge0.
\]

Every coefficient is positive, so

\[
C_E(q^2)\in H_2(\mathbb R)_+.
\]

## 2. Pole residues and the Jordan cone

Each isolated one-particle residue is rank one:

\[
\det\rho_n=0.
\]

It therefore lies on an extreme ray of the Lorentz/Jordan cone.

If at least two residue vectors are linearly independent, then their positive sum has

\[
\det C_E(q^2)>0
\]

and lies in the cone interior.

This supplies a direct spectral interpretation:

- pure stable channels are boundary rays;
- mixtures of independent chiral overlaps populate the interior;
- positivity of spectral weight is positivity in the Jordan carrier.

## 3. Lorentzian continuation

Define

\[
R(z)=\sum_n\frac{\rho_n}{m_n^2-z}.
\]

For

\[
\operatorname{Im}z>0,
\]

one has

\[
\operatorname{Im}R(z)
=
\sum_n
\frac{\operatorname{Im}z}
{(m_n^2-\operatorname{Re}z)^2+(\operatorname{Im}z)^2}
\rho_n
\ge0.
\]

Thus \(R\) is a matrix-valued Herglotz/Nevanlinna response. It has no negative-residue pole and no upper-half-plane violation of passivity in the certified sector.

## 4. Reflection-positive time kernel

For positive Euclidean times,

\[
C_E(\tau)
=
\sum_n
\frac{e^{-m_n|\tau|}}{2m_n}\rho_n.
\]

The Osterwalder–Schrader candidate kernel is

\[
K_{ia,jb}=C_{E,ab}(t_i+t_j),
\qquad t_i,t_j>0.
\]

It factorizes as

\[
K_{ia,jb}
=
\sum_n
\left[
\frac{r_{n,a}e^{-m_nt_i}}{\sqrt{2m_n}}
\right]
\left[
\frac{r_{n,b}e^{-m_nt_j}}{\sqrt{2m_n}}
\right].
\]

Therefore \(K\) is a Gram matrix and

\[
\sum_{ia,jb}\bar f_{ia}K_{ia,jb}f_{jb}\ge0.
\]

This establishes reflection positivity for the reduced scalar/chiral-channel kernel represented by the spectral residues.

## 5. What remains for fermions

Fermionic Osterwalder–Schrader positivity is not identical to scalar Gram positivity. A full proof must restore:

- Euclidean spinor indices;
- the reflection matrix involving the Euclidean time gamma matrix;
- Grassmann ordering signs;
- contact terms;
- gauge-fixed versus gauge-invariant composite definitions;
- continuum spectral integrals and renormalization.

The present theorem says that once the correct spinor projection yields a positive two-face spectral density, its carrier lives naturally in \(H_2(\mathbb R)_+\). It does not prove that every proposed dressed-fermion kernel has that density.

## 6. Complex spectral phases

Generic residue vectors may be complex:

\[
\rho_n=w_nw_n^\dagger\in H_2(\mathbb C)_+.
\]

Their real projections remain positive, but the imaginary off-diagonal channel may encode absorptive or CP-sensitive information. A one-generation real Yukawa parameter does not automatically force every interacting spectral residue to share one real phase.

Accordingly:

- the \(H_2(\mathbb R)\) carrier describes the CP-even reciprocal response;
- the discarded imaginary channel must either vanish by an antiunitary symmetry or be retained as a separate observable;
- the three-generation flavor sector cannot be made entrywise real.

## 7. Programme consequence

The dressed carrier now passes three successive gates:

\[
\text{gauge neutrality}
\Longrightarrow
\text{Euclidean spectral positivity}
\Longrightarrow
\text{Lorentzian Herglotz positivity}.
\]

It also matches the earlier scalar-interval result, where every lossless pole had a positive rank-one two-face residue. The common structure is a positive matrix-valued response, not the microscopic statistics of the field producing it.

## 8. Stop-everything and falsification criteria

**Positive:** the complete dressed spinor kernel admits this positive spectral representation, and a protected relation ties its pole/residue data to the external interval or full-lock parameters.

**Negative:** the correct fermionic reflection matrix produces an indefinite face residue, or renormalization requires a response outside the \(H_2(\mathbb R)\) cone.

**Current status:** reduced spectral/reflection positivity established; full fermionic OS gate open.

**Unsafe shortcut:** cite scalar Gram factorization as a complete proof of fermionic reflection positivity.

## 9. Certificate

The [dressed spectral-response certificate](scripts/verify-dressed-chiral-spectral-response.mjs) checks positive rank-one residues, interior multipole response, Euclidean Stieltjes positivity, upper-half-plane Herglotz positivity and time-reflection Gram factorization.

## Companion documents

- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Lorentzian pole residues](76_lorentzian_pole_residues_and_channel_positivity.md)
- [Lorentzian passivity](70_lorentzian_passivity_and_causal_response.md)
- [Real-selector flavor CP obstruction](74_real_selector_cp_violation_obstruction.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)

