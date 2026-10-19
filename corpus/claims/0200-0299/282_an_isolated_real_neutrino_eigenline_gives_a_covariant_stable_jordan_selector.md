# An Isolated Real Neutrino Eigenline Gives a Covariant, Stable Jordan Selector

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional spectral-projector construction and perturbative stability criterion; physical choice of the matrix and extremal eigenline remains open

## 1. From an arbitrary axis to a spectral projector

The previous cycle showed that a real unit vector \(n\) creates the split metric

\[
\eta_n=2nn^T-I.
\]

Choosing \(n\) by coordinates would be arbitrary. A basis-covariant candidate is the isolated eigenline of a real symmetric physical matrix

\[
K=K^T,
\]

such as a CP-conserving Majorana response, \(Y_\nu^TY_\nu\), a stress susceptibility or a source-normalized spectral moment.

Let

\[
\kappa_1<\kappa_2<\kappa_3
\]

and choose the largest eigenline. Its projector is

\[
\boxed{
P_3
=
\frac{(K-\kappa_1I)(K-\kappa_2I)}
{(\kappa_3-\kappa_1)(\kappa_3-\kappa_2)}.}
\]

This formula is polynomial in \(K\), independent of eigenvector sign and covariant under orthogonal basis changes.

## 2. The split metric follows canonically once the eigenline is chosen

Define

\[
\eta_K=2P_3-I.
\]

Then

\[
\eta_K^2=I,
\]

with eigenvalue \(+1\) on the selected line and \(-1\) on its two-dimensional complement. Therefore

\[
\operatorname{inertia}(\eta_K)=(1,2).
\]

The selected line is the population/time-like axis; the orthogonal plane supplies the two relationship/space-like directions.

This removes coordinate arbitrariness but not the physical choice of \(K\) or of “largest” rather than “smallest.” Those choices must be justified by the action or response normalization.

## 3. Gap-controlled stability

Let

\[
\gamma=\kappa_3-\kappa_2>0
\]

be the isolation gap. Under a small symmetric perturbation \(\delta K\), the Davis--Kahan theorem bounds the rotation of the selected line schematically by

\[
\|\delta P_3\|
\lesssim
\frac{\|\delta K\|}{\gamma}.
\]

Hence the Jordan selector is radiatively or experimentally stable when corrections are small compared with the eigenvalue gap.

At \(\gamma=0\), the one-dimensional projector is not defined. A degenerate two-plane is selected instead, and no unique time-like axis follows. This is the exact degeneracy defect.

## 4. Candidate matrices

### 4.1 Majorana mass square

In a fixed real Majorana basis,

\[
K_M=M_N^TM_N
\]

is real positive symmetric. Its most isolated eigenline is basis covariant. Whether the heaviest, lightest or most separated state should be time-like remains a physical question.

### 4.2 Neutrino Yukawa response

For CP-conserving real \(Y_\nu\),

\[
K_Y=Y_\nu^TY_\nu
\]

selects the sterile direction most strongly coupled to the active/Higgs sector. This gives an operational reason to choose the largest eigenvalue.

### 4.3 Spectral moment

A positive response density can define

\[
K_\rho=\int ds\,w(s)\rho(s),
\qquad w(s)>0.
\]

This ties the selector directly to measurable spectral strength, but its dependence on the weight \(w\) must be controlled.

## 5. CP-phase gate

For a generic complex Hermitian \(K\), the extremal projector is Hermitian but not real. It defines a complex line in \(\mathbb C^3\), and

\[
2P-I
\]

has Hermitian signature \((1,2)\), not a real bilinear form on a fixed \(\mathbb R^3\).

To recover the real Jordan carrier, the projector must commute with the Majorana real structure \(J\):

\[
JP=PJ.
\]

Equivalently, the selected line must be invariant under the chosen conjugation. Physical CP phases can obstruct this even though the Hermitian eigenline remains perfectly well defined.

This matches the earlier conclusion that a real selector must not erase observed complex flavor CP data. One possible architecture is to let the face/flavor sector remain complex while only a separate response factor is real.

## 6. Dynamical-closure gate

A selector constructed at one scale or spectral moment need not be preserved by the full response. Exact closure requires

\[
[R(z),P]=0
\]

for the relevant family of response kernels, or a covariant transport law for \(P(z)\).

If the eigenline rotates with energy, the response sees a connection and possibly holonomy. The local split metric survives, but a single global \(H_2(\mathbb R)\) identification may fail.

Thus the correct hierarchy is:

1. isolated real eigenline;
2. gap stability;
3. compatibility with CP/Majorana conjugation;
4. closure under the full causal response family.

## 7. What has and has not been selected

The construction proves:

- how a physical real symmetric matrix can supply the missing axis without a coordinate choice;
- how the split metric follows algebraically;
- how stability is governed by an observable gap.

It does not prove:

- which neutrino or spectral matrix is fundamental;
- which extremal eigenline is time-like;
- that observed neutrino data satisfy the necessary real condition;
- that the resulting response has full \(Spin(2,3)\) symmetry.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/Standard-Model action uniquely selects a real symmetric \(K\), its physically distinguished eigenline is nondegenerate, and \(2P-I\) is preserved by the full response kernel.

**Phenomenology trigger:** the selector is fixed by measured neutrino masses/mixings and produces a parameter-independent spectral or stress relation.

**Degeneracy falsifier:** the selected eigenvalue is symmetry-protected degenerate, leaving no unique rank-one projector.

**CP falsifier:** the extremal projector fails to commute with the physical Majorana real structure and no separate response-factor reality is available.

**Stability falsifier:** radiative corrections are comparable to or larger than the isolation gap, making the selector uncontrolled.

## 9. Certificate

The [spectral-projector selector certificate](../../../verification/verify/verify_spectral_projector_jordan_selector.mjs) verifies the polynomial projector, basis covariance, selector involution/signature, a gap-controlled perturbation example and the complex-phase real-structure obstruction.

## Companion documents

- [Majorana reality and the signature selector](281_majorana_reality_gives_a_sterile_triplet_but_a_selector_must_create_jordan_signature.md)
- [Real-selector flavor CP obstruction](../0000-0099/74_real_selector_cp_violation_obstruction.md)
- [Radiative stability of the locking hierarchy](../0000-0099/83_locking_hierarchy_radiative_stability.md)
- [Peirce compression and dynamical closure](261_peirce_compression_is_a_cp_retraction_not_a_unital_full_algebra_expectation.md)
