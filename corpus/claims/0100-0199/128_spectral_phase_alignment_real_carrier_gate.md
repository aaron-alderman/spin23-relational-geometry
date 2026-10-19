# Spectral Phase Alignment as the Real-Carrier Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact finite-pole theorem and positive counterexample

## 1. One matrix versus a spectral family

Any single positive Hermitian \(2\times2\) matrix

\[
F=
\begin{pmatrix}
a&z\\
\bar z&d
\end{pmatrix}
\]

can be made real by a relative face rephasing. This does not prove that one fixed real structure works for an entire momentum-dependent response.

Let

\[
F(q^2)
=
\sum_n\frac{R_n}{q^2+m_n^2},
\qquad
(R_n)_{12}=c_n.
\]

Then

\[
F_{12}(q^2)
=
\sum_n\frac{c_n}{q^2+m_n^2}.
\]

## 2. Exact alignment criterion

Assume the pole masses are distinct. A single relative phase \(e^{i\delta}\) makes \(F_{12}(q^2)\) real for every \(q^2\) exactly when

\[
\boxed{
e^{i\delta}c_n\in\mathbb R
\quad\text{for every }n.
}
\]

Equivalently, all nonzero \(c_n\) have one common phase modulo \(\pi\).

The proof is elementary. If the imaginary part of

\[
\sum_n\frac{e^{i\delta}c_n}{q^2+m_n^2}
\]

vanishes identically, uniqueness of the partial-fraction expansion forces the imaginary part of every residue to vanish separately. The converse is immediate.

For a continuum, the corresponding condition is constant phase of the off-diagonal spectral density almost everywhere.

## 3. Positivity does not enforce alignment

Consider two positive-definite residues

\[
R_1=
\begin{pmatrix}
1&1/2\\
1/2&1
\end{pmatrix},
\qquad
R_2=
\begin{pmatrix}
1&i/2\\
-i/2&1
\end{pmatrix}.
\]

Both have determinant \(3/4\). With distinct pole masses,

\[
F_{12}(q^2)
=
\frac{1/2}{q^2+m_1^2}
+
\frac{i/2}{q^2+m_2^2}.
\]

Its phase varies with \(q^2\). No fixed rephasing makes the complete family real, even though every residue and the full response are positive.

Therefore:

\[
\boxed{
\text{spectral positivity}
\not\Rightarrow
\text{closure in one fixed }H_2(\mathbb R)\text{ slice}.
}
\]

## 4. Relation to the perturbation classification

The preceding codimension-one condition

\[
\operatorname{Im}\operatorname{tr}C=0
\]

must hold separately across spectral support after one fixed choice of face phase. It cannot generally be repaired by choosing a different basis at each momentum, because that introduces momentum-dependent transport and destroys the claim of one fixed real carrier.

The actual all-orders gate is consequently:

> all flavor-singlet off-diagonal spectral residues must be phase aligned.

This is stronger than reality of one Euclidean correlator at one momentum and weaker than entrywise microscopic reality.

## 5. Possible sources of alignment

Candidate mechanisms include:

1. hermiticity plus a reflection symmetry fixing one common operator convention;
2. a Ward identity relating every pole’s two face couplings;
3. one real mass/Yukawa spurion controlling all cross-face residues;
4. paired states whose imaginary singlet residues cancel pole by pole;
5. failure of alignment and consequent enlargement to \(H_2(\mathbb C)\).

The existing finite model was deliberately built with real face marginals and therefore passes this gate by construction. It does not derive the alignment mechanism.

## 6. Stop-everything criteria

**Advance:** one symmetry or common spurion proves residue-phase alignment for the dressed Standard-Model correlator to all orders.

**Pin:** alignment occurs only in a finite truncation or chosen renormalization condition.

**Branch change:** two physically required poles acquire irreducibly different singlet phases; then no global \(H_2(\mathbb R)\) response slice exists.

## 7. Certificate

The [spectral phase-alignment certificate](../../../verification/verify/verify-spectral-phase-alignment-gate.mjs) constructs two positive residues with phases \(0\) and \(\pi/2\), verifies positivity of their sum and measures the resulting momentum-dependent off-diagonal phase.

## Companion documents

- [Real face-marginal perturbation classification](127_real_face_marginal_perturbation_classification.md)
- [Face–flavor entangled spectral CP checkpoint](126_face_flavor_entangled_spectral_cp_checkpoint.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)
