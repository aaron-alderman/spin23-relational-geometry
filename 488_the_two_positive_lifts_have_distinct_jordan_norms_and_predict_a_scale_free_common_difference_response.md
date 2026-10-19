# The Two Positive Lifts Have Distinct Jordan Norms and Predict a Scale-Free Common/Difference Response

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B07, B09, B10, B12 and B14  
**Claim status:** exact arithmetic inequivalence and response invariants; experimental carrier identification remains open

## 1. Correcting the orientation interpretation

The two trace-minimal positive lifts of the mutual qutrit shear are

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix},
\qquad
K_-=\begin{pmatrix}3&-1\\-1&3\end{pmatrix}.
\]

A port reversal explains how a transformer-free passive network can represent \(K_+\) in an oriented coordinate convention. It does **not** turn \(K_-\) into \(K_+\). Their Jordan determinants are

\[
\boxed{
\det K_+=5,
\qquad
\det K_-=8.
}
\]

Since

\[
\det(A^TKA)=\det(A)^2\det K,
\]

every \(A\in GL(2,\mathbb Z)\) preserves the determinant. The two forms are therefore arithmetically inequivalent; no integral basis change, handle exchange or port sign reversal identifies them.

The unresolved fork contains both orientation and genuine response-magnitude data.

## 2. Common and differential eigenchannels

Both matrices are invariant under port exchange, so their eigenvectors are the common and differential modes

\[
v_+=\frac1{\sqrt2}(1,1),
\qquad
v_-=\frac1{\sqrt2}(1,-1).
\]

Their gains are:

| lift | common gain | differential gain | determinant |
|---|---:|---:|---:|
| \(K_+\) | 5 | 1 | 5 |
| \(K_-\) | 2 | 4 | 8 |

Thus \(K_+\) strongly stiffens the common mode, while \(K_-\) stiffens the differential mode. Both are positive and passive, but they describe measurably different two-port physics.

## 3. Scale-free discriminators

An overall coupling or impedance scale may be unknown. Two dimensionless quantities remove it.

### Normalized Jordan determinant

\[
\mathcal J(K)=\frac{\det K}{(\operatorname{tr}K)^2}.
\]

Since both traces equal six,

\[
\boxed{
\mathcal J(K_+)=\frac5{36},
\qquad
\mathcal J(K_-)=\frac29.
}
\]

### Normalized cross response

In a declared common port orientation, define

\[
\mathcal C(K)=\frac{2K_{12}}{\operatorname{tr}K}.
\]

Then

\[
\mathcal C(K_+)=\frac23,
\qquad
\mathcal C(K_-)=-\frac13.
\]

The sign of \(\mathcal C\) changes under one port reversal; \(\mathcal J\) does not. Therefore \(\mathcal J\) distinguishes the arithmetic lifts even before an absolute orientation is fixed.

## 4. Causal spectral continuation

Let \(h(z)\) be any scalar causal Herglotz response with positive spectral measure. Define

\[
R_\pm(z)=h(z)K_\pm.
\]

For \(\operatorname{Im}z>0\),

\[
\operatorname{Im}R_\pm(z)
=(\operatorname{Im}h(z))K_\pm\succeq0.
\]

Both lifts therefore admit healthy causal continuations with positive pole residues. Passivity and causality alone cannot select between them. Their residue eigenvalue ratios remain

\[
5:1
\qquad\text{versus}\qquad
2:4=1:2.
\]

This gives a frequency-independent discriminator whenever a common scalar spectral factor is justified.

## 5. Relation to the Jordan norm

For \(H_2(\mathbb R)\), the determinant is the quadratic Jordan norm. The fork is therefore visible in the carrier’s native invariant, not only in an arbitrary matrix entry.

The modulo-three code forgets this information:

\[
5\equiv8\equiv2\pmod3.
\]

This is a precise example of the project’s “nested dolls” idea: the finite layer retains the symplectic operation while the integral and real layers recover distinct norm data that the finite quotient cannot resolve.

## 6. What could select the physical lift

Possible selectors now make different testable predictions:

1. **nonnegative code-word Gram decomposition:** favors common-mode \(K_+\) and \(\mathcal J=5/36\);
2. **minimal unsigned scalar network:** favors differential-mode \(K_-\) and \(\mathcal J=2/9\);
3. **microscopic Higgs mediator:** must calculate the actual current Gram matrix;
4. **determinant/Pfaffian orientation:** can fix the cross sign but cannot by itself change determinant five into eight;
5. **measured two-port response:** determines the eigenvalue ratio directly.

## 7. Claim ledger

- **Exact:** the two lifts have determinants five and eight.
- **Exact:** they are not congruent under \(GL(2,\mathbb Z)\).
- **Exact:** their common/difference spectra are \((5,1)\) and \((2,4)\).
- **Exact:** normalized Jordan determinants are \(5/36\) and \(2/9\).
- **Exact:** both admit passive causal scalar spectral continuations.
- **Exact:** orientation reversal cannot remove the determinant distinction.
- **Candidate observable:** a normalized two-port residue or static Hessian measures \(\mathcal J\).
- **Open:** identification of an actual Standard-Model/Furey observable carrying this response.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a source-derived Higgs/current calculation fixes the eigenvalue ratio to \(5:1\) or \(1:2\) without adjustable relative couplings.

**Observable trigger:** the same normalized Jordan determinant appears in a scattering, susceptibility or boundary Hessian calculation.

**Equivalence falsifier:** \(K_+\) and \(K_-\) are called basis-equivalent despite their unequal determinants.

**Orientation falsifier:** port reversal is claimed to change the determinant or the scale-free Jordan norm.

**Causality falsifier:** passivity alone is said to choose one lift even though both have positive spectral residues.

## 9. Certificate

The [Jordan-norm response certificate](scripts/verify_Kplus_Kminus_have_distinct_jordan_norms_and_scale_free_response_observables.mjs) computes the spectra and normalized invariants, checks positive residues and exhausts small unimodular congruences in support of the determinant proof.

## Companion documents

- [Passive-network orientation fork](487_transformer_free_passivity_selects_the_other_positive_lift_and_exposes_a_level_three_orientation_fork.md)
- [Positive integral Jordan lift](486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
- [Lorentzian pole residues and channel positivity](76_lorentzian_pole_residues_and_channel_positivity.md)
- [Exact Jordan-triple to \(Sp(4,\mathbb R)\)](42_jordan_triple_to_sp4r_determination.md)
