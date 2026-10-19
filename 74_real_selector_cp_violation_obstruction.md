# A Universal Real Selector Would Erase Flavor CP Violation

**Date:** 17 October 2026  
**Branches:** B01, B03 and B11  
**Claim status:** exact algebraic obstruction; precise sector-limited or broken selector remains open

## 1. Why CP is the next gate

The proposed middle rung \(H_2(\mathbb R)\subset H_2(\mathbb C)\) is the fixed space of entrywise conjugation in a chosen weak basis. If the same antiunitary operation were imposed on the complete internal theory, it might force the Yukawa data to be simultaneously real.

That is incompatible with physical flavor CP violation.

The relevant question is not whether a particular matrix can be made real. It is whether one weak-basis antiunitary operation makes both up- and down-sector flavor structures real simultaneously.

## 2. Basis-invariant CP test

Define the positive Hermitian flavor matrices

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger.
\]

A standard CP-odd invariant is proportional to

\[
\operatorname{Im}\det[H_u,H_d],
\]

equivalently, for three generations, to

\[
\operatorname{Im}\operatorname{Tr}\bigl([H_u,H_d]^3\bigr).
\]

If one basis makes both \(H_u\) and \(H_d\) real, then their commutator is a real antisymmetric \(3\times3\) matrix. Every odd-dimensional antisymmetric matrix has zero determinant. Therefore

\[
\boxed{
H_u,H_d\ \text{simultaneously real}
\quad\Longrightarrow\quad
\det[H_u,H_d]=0
\quad\Longrightarrow\quad
J_{\rm CP}=0.
}
\]

Observed quark flavor violates CP, so the complete flavor sector cannot be fixed by one unbroken ordinary real structure.

## 3. Exact examples

Take

\[
H_u=\operatorname{diag}(1,2,4).
\]

For the real positive-definite matrix

\[
H_d^{(R)}=
\begin{pmatrix}
10&1&1\\
1&11&1\\
1&1&12
\end{pmatrix},
\]

the certificate finds

\[
\det[H_u,H_d^{(R)}]=0,
\qquad
\operatorname{Tr}([H_u,H_d^{(R)}]^3)=0.
\]

For the complex Hermitian positive-definite matrix

\[
H_d^{(C)}=
\begin{pmatrix}
10&1&-i\\
1&11&1\\
i&1&12
\end{pmatrix},
\]

it finds

\[
\det[H_u,H_d^{(C)}]=12i,
\qquad
\operatorname{Tr}([H_u,H_d^{(C)}]^3)=36i.
\]

Complex Hermitian structure is therefore not decorative: relative complex phases carry basis-invariant physics.

## 4. Consequence for the shared-involution hypothesis

The strongest version of the proposed bridge is ruled out:

\[
\text{one unbroken real structure fixes every external and internal observable}.
\]

A viable version must instead take one of the following forms:

1. **Sector-limited:** the real structure fixes the external carrier and perhaps the bosonic weak \(2\times2\) block, but not the three-generation flavor intertwiners.
2. **Spontaneously broken:** the fundamental theory admits the real structure, while complex flavor vacuum data break it.
3. **Graded/twisted:** the antiunitary operation includes nontrivial family transformations and does not reduce to entrywise conjugation on Yukawa matrices.
4. **Emergent external reality:** \(H_2(\mathbb R)\) arises from reciprocity or boundary orientation without acting as an internal CP symmetry.

The fourth option remains the cleanest given the current evidence.

## 5. Interaction with the endomorphism inventory

The full endomorphism algebra is mirror-complete, while the observed theory is chiral and CP-violating. A successful projector must therefore do two things simultaneously:

- remove mirror representations without spoiling anomaly cancellation;
- retain enough irreducible complex flavor data for a nonzero Jarlskog invariant.

A projector defined simply by “keep the real part” fails the second gate.

## 6. Revised stop-everything and falsification tests

**Positive:** a source-derived graded antiunitary selector fixes the external \(H_2(\mathbb R)\) carrier, selects a chiral anomaly-free internal module, and still permits a nonzero flavor CP invariant.

**Negative:** every selector capable of producing the middle rung also makes all Yukawa invariants real and forces \(J_{\rm CP}=0\).

**Current result:** a universal unbroken real selector is falsified; sector-limited, broken or twisted versions remain open.

## 7. Certificate

The [CP-obstruction certificate](scripts/verify-real-yukawa-cp-obstruction.mjs) performs exact Gaussian-integer matrix arithmetic, verifies vanishing for a simultaneously real pair, and exhibits a positive Hermitian complex pair with nonzero CP-odd determinant and cubic trace.

## Companion documents

- [Weak real-form stabilizer obstruction](71_weak_real_form_stabilizer_obstruction.md)
- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Standard-Model anomaly gate](62_standard_model_anomaly_gate.md)
- [Jordan selection and real slice](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
