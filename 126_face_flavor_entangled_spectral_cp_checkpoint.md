# Face–Flavor Entangled Spectral CP Checkpoint

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact finite-dimensional positive spectral model; dynamical Standard-Model realization remains open

## 1. What this tests

The preceding CP analysis used commuting tensor-factor actions. The next question was whether positivity and a real two-face marginal survive when individual spectral states are not product states between face and flavor.

They do.

## 2. Two explicit amplitude matrices

Identify

\[
\mathbb C^6\cong\mathbb C^2_{\rm face}\otimes\mathbb C^3_{\rm flavor}.
\]

Choose

\[
V_u=
\begin{pmatrix}
1&0&0\\
0&2&0
\end{pmatrix},
\]

and

\[
V_d=
\begin{pmatrix}
1&1&i\\
1&i&1+i
\end{pmatrix}.
\]

Let

\[
|\Psi_f\rangle=\operatorname{vec}(V_f),
\qquad
R_f=|\Psi_f\rangle\langle\Psi_f|.
\]

Each \(R_f\) is a positive rank-one \(6\times6\) residue.

Both \(V_u\) and \(V_d\) have rank two, so the associated vectors have Schmidt rank two across face and flavor. They are not face–flavor product vectors.

## 3. Real positive face marginals

Tracing flavor gives

\[
F_f=\operatorname{Tr}_{\rm flavor}R_f=V_fV_f^\dagger.
\]

Explicitly,

\[
F_u=
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix},
\qquad
F_d=
\begin{pmatrix}
3&2\\
2&4
\end{pmatrix}.
\]

Both lie in \(H_2(\mathbb R)_+\), with determinants

\[
\det F_u=4,
\qquad
\det F_d=8.
\]

Thus non-product face–flavor residues do not force the face marginal out of the real Jordan cone.

## 4. Complex flavor marginals and CP

Tracing the face index gives

\[
H_f=\operatorname{Tr}_{\rm face}R_f=V_f^\dagger V_f.
\]

The \(H_f\) are positive Hermitian \(3\times3\) matrices. Although each has rank at most two in this minimal model, their relative complex orientation gives

\[
\det[H_u,H_d]\ne0,
\qquad
\operatorname{tr}[H_u,H_d]^3\ne0.
\]

The executable checkpoint evaluates the exact complex values. Hence the model simultaneously has:

- positive spectral residues;
- Schmidt-nonproduct face–flavor states;
- real positive two-face marginals;
- a nonzero CP-odd flavor invariant.

## 5. Spectral response

For positive masses define

\[
C_E(q^2)
=
\frac{R_u}{q^2+m_u^2}
+
\frac{R_d}{q^2+m_d^2}.
\]

For \(q^2\ge0\), this is positive because it is a positive weighted sum of positive rank-one residues.

Its face marginal remains in \(H_2(\mathbb R)_+\):

\[
\operatorname{Tr}_{\rm flavor}C_E
=
\frac{F_u}{q^2+m_u^2}
+
\frac{F_d}{q^2+m_d^2}.
\]

This is stronger than the earlier single-tensor checkpoint: exact product factorization of every residue is unnecessary.

## 6. What is and is not proved

### Proved

- Positivity, real face reduction and nonzero flavor CP are mutually compatible in an entangled \(6\times6\) spectral model.
- Face–flavor Schmidt rank greater than one does not by itself destroy the \(H_2(\mathbb R)\) marginal.
- The appropriate condition is on the partial response, not factorization of each microscopic state.

### Not proved

- that Standard-Model correlation functions have these residues;
- radiative stability of the real face marginal;
- the observed CKM or PMNS parameters;
- compatibility with all gauge, Lorentz and crossing constraints;
- a full operator-algebra commutant under interactions.

## 7. Refined commutant gate

The earlier statement that the carrier action must commute with the complete flavor algebra is sufficient but too strong if applied state by state. Entangled residues can survive provided:

1. the physically selected partial response closes in \(H_2(\mathbb R)\);
2. carrier transport preserves the partial-trace map or its operational replacement;
3. no counterterm forces an imaginary \(\sigma_y\) face component;
4. flavor CP invariants remain nonzero after the same closure.

This shifts the dynamical problem from strict microscopic factorization to stability of a real marginal subspace.

## 8. Stop-everything tests

**Advance:** gauge- and Lorentz-allowed counterterms preserve the real face marginal while allowing complex entangled residues and nonzero CP.

**Pin:** positivity survives but generic counterterms generate an imaginary face component; then an additional symmetry is required.

**Falsify:** reflection positivity, gauge covariance or crossing forces simultaneous reality of the flavor marginals and kills the CP invariant.

## 9. Certificate

The [entangled spectral CP certificate](scripts/verify-face-flavor-entangled-spectral-cp.mjs) constructs both residues, checks Schmidt rank, computes both partial traces, evaluates the CP-odd invariant and tests positive quadratic forms of the spectral sum.

## Companion documents

- [Real two-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)
- [Hopf phase descent and carrier correction](123_hopf_phase_descent_and_carrier_correction.md)
