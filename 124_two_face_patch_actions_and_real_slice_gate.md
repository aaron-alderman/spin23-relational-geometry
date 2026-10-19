# Two-Face Patch Actions and the Real-Slice Gate

**Date:** 17 October 2026  
**Branches:** B03, B04, B08 and B09  
**Claim status:** exact representation-theoretic classification for diagonal \(U(1)\) patch actions

## 1. Question

When can a patch or gauge transition act nontrivially on the two faces while keeping the carrier inside

\[
H_2(\mathbb R)_+?
\]

Let

\[
H=\begin{pmatrix}a&b\\b&c\end{pmatrix},
\qquad
D(\alpha,\beta)=
\begin{pmatrix}e^{i\alpha}&0\\0&e^{i\beta}\end{pmatrix}.
\]

The natural density-matrix action is

\[
H\longmapsto DHD^\dagger.
\]

## 2. Exact transformation

Direct multiplication gives

\[
DHD^\dagger
=
\begin{pmatrix}
a & be^{i(\alpha-\beta)}\\
be^{-i(\alpha-\beta)} & c
\end{pmatrix}.
\]

The determinant and positivity in \(H_2(\mathbb C)\) are preserved. The real slice is preserved exactly when

\[
\sin(\alpha-\beta)=0,
\]

or

\[
\boxed{\alpha-\beta=0\ \text{or}\ \pi\pmod{2\pi}.}
\]

The first case is a common phase and acts trivially. The second is the discrete reflection

\[
b\longmapsto-b.
\]

## 3. Continuous charge classification

For a continuous \(U(1)\) transition with face charges \(q_1,q_2\),

\[
\alpha=q_1\phi,
\qquad
\beta=q_2\phi.
\]

Preservation for every \(\phi\) requires

\[
\boxed{q_1=q_2.}
\]

Therefore every continuous diagonal \(U(1)\) action preserving the full real carrier is common-phase and trivial on its bilinears.

If \(q_1\ne q_2\), the off-diagonal relation develops an imaginary component. The smallest closed carrier is then

\[
H_2(\mathbb C),
\]

which has four real dimensions rather than three. Its determinant is the \(1+3\)-dimensional Lorentz form, not the \(1+2\) form underlying the present \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) route.

## 4. Application to the current dressed faces

The dressed faces

\[
\chi_L=H^\dagger L,
\qquad
\chi_R=e^{c\dagger}
\]

were selected precisely because they have identical gauge quantum numbers. Gauge transition functions therefore act with

\[
q_L=q_R
\]

and disappear from the \(2\times2\) response by conjugation.

The helicity Berry phase also multiplies the factorized left/right state components commonly. It obeys the same cancellation.

Thus neither known continuous transition supplies a nontrivial connection on the free real Jordan face space.

## 5. The surviving nontrivial possibility

Inside \(H_2(\mathbb R)\), only a relative \(\mathbb Z_2\) sign remains:

\[
D=\operatorname{diag}(1,-1),
\qquad
b\mapsto-b.
\]

This is a genuine cone automorphism and could encode an orientation or parity datum. But it is not produced by a generic continuous relative \(U(1)\) without leaving the real slice between the endpoints.

This distinguishes:

- a **common central sign**, invisible on all bilinears;
- a **relative face sign**, visible as \(b\mapsto-b\);
- a **continuous relative phase**, which forces \(H_2(\mathbb C)\).

Any Hopf–metaplectic proposal must state which of these it uses.

## 6. Stop-everything implication

The hoped-for nontrivial continuous Berry action on the three-dimensional real carrier is unavailable under diagonal face transitions.

The programme must now choose among three honest paths:

1. keep \(H_2(\mathbb R)\) and seek a discrete relative-sign holonomy selected by dynamics;
2. allow \(H_2(\mathbb C)\), accepting the extra carrier coordinate and changed symmetry route;
3. keep the Berry connection only on phase-sensitive state/interference data, not on the Jordan density carrier.

This is a branch point, not a failure. It prevents an accidental identification of common phase, relative phase and Jordan transport.

## 7. Certificate

The [two-face \(U(1)\) certificate](scripts/verify-two-face-u1-real-slice.mjs) checks the exact conjugation formula, the pointwise \(0/\pi\) criterion, the continuous equal-charge criterion and determinant preservation.

## Companion documents

- [Hopf phase descent and carrier correction](123_hopf_phase_descent_and_carrier_correction.md)
- [Gauge-neutral dressed two-face response](118_dressed_charged_lepton_h2_response.md)
- [Canonical real-structure model](65_canonical_real_structure_commutant_model.md)
- [Metaplectic lift and Maslov correction](59_metaplectic_and_maslov_correction_branch.md)
