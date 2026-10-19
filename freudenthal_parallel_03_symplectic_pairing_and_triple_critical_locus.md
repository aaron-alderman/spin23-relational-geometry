# Freudenthal Parallel Branch 03: Symplectic Pairing and the Triple-Product Critical Locus

**Date:** 17 October 2026  
**Status:** exact restriction theorem; structural bridge found, but no new numerical prediction  
**Certificate:** [verify_freudenthal_symplectic_and_triple_restriction.mjs](scripts/verify_freudenthal_symplectic_and_triple_restriction.mjs)

## Executive result

The Freudenthal symplectic form restricts to the ordinary trace pairing between the programme's source and response matrices. Its antisymmetry remembers which factor is source and which is response, but it does not select an absolute octonionic link line or the programme's final flux-orientation bit.

The cubic map obtained by differentiating the Freudenthal quartic has a sharper consequence. On the positive \(H_2(\mathbb R)\) source--response cone it vanishes exactly on

\[
C=\lambda A^{-1},\qquad \lambda>0.
\]

Thus the programme's inverse-response matching is not merely quartic-null: it is the critical locus of the restricted exceptional invariant. This is a genuine typed bridge. It is not yet a new physical prediction, because on the positive two-by-two cone the quartic-null condition already forces the same relation.

## 1. Conventions stated before use

For a cubic Jordan algebra \(J\), write a Freudenthal element as

\[
x=(\alpha,\beta,A,B)\in
\mathbb R\oplus\mathbb R\oplus J\oplus J.
\]

Its alternating pairing is

\[
\Omega(x,y)
=\alpha\delta-\beta\gamma
+\operatorname{Tr}(A,D)-\operatorname{Tr}(B,C),
\]

where \(y=(\gamma,\delta,C,D)\). “Alternating” means that exchanging the two inputs reverses the sign, in the same everyday sense that reversing an oriented arrow reverses its direction.

The quartic convention used throughout this branch is

\[
q(x)=-2[\alpha\beta-\operatorname{Tr}(A,B)]^2
-8[\alpha N(A)+\beta N(B)-\operatorname{Tr}(A^\#,B^\#)].
\]

Different references scale the Freudenthal triple product differently. To prevent a convention from becoming a claim, define the cubic Hamiltonian \(\mathcal T\) directly by

\[
\boxed{
\Omega(\mathcal T(x),\delta x)=\frac14\,dq_x(\delta x).
}
\]

It is the diagonal Freudenthal triple product up to the declared overall normalization and possible sign convention. Its zero set is independent of either choice.

## 2. Source and response embeddings

For \(A,C\in H_2(\mathbb R)\), use

\[
S(A)=(0,0,\iota(A),0),
\qquad
R(C)=(0,0,0,\iota(C)),
\]

where \(\iota\) places a two-by-two matrix in the upper-left face of \(H_3(\mathbb O)\).

The symplectic form becomes

\[
\boxed{
\Omega(S(A),R(C))=\operatorname{tr}(AC),
\qquad
\Omega(R(C),S(A))=-\operatorname{tr}(AC).
}
\]

This supplies a clean source/response orientation: exchanging the two slots changes sign. It is information that the determinant alone does not retain.

## 3. Restricted cubic map

Set

\[
s=\operatorname{tr}(AC),\qquad
d_A=\det A,\qquad d_C=\det C.
\]

The paired-face quartic is

\[
q(A,C)=-2s^2+8d_A d_C.
\]

Using \(d(\det A)[\delta A]=\operatorname{tr}(A^\#\delta A)\), differentiation gives

\[
\mathcal T(A,C)=
\left(
-sA+2d_A C^\#,
\quad
sC-2d_C A^\#
\right).
\]

The two entries occupy the same source and response Jordan slots. Direct substitution verifies the defining Hamiltonian identity.

## 4. Positive-cone theorem

Assume \(A>0\) and \(C>0\). If \(\mathcal T(A,C)=0\), then

\[
sA=2d_A C^\#=2d_A d_C C^{-1}.
\]

Multiplication by \(C\) shows that \(AC\) is scalar. Hence

\[
C=\lambda A^{-1}
\]

for some \(\lambda>0\). Conversely, every such pair makes both components of \(\mathcal T\) vanish. Therefore

\[
\boxed{
\mathcal T(A,C)=0
\iff C=\lambda A^{-1}
\iff q(A,C)=0
\quad(A,C>0).
}
\]

The last equivalence uses the earlier discriminant theorem: \(q=-2(\mu_1-\mu_2)^2\), where \(\mu_i\) are the positive eigenvalues of \(AC\).

Because the embedded two-by-two faces have zero cubic norm in \(H_3(\mathbb O)\), the omitted scalar derivatives also vanish. The criticality is therefore not an artefact of differentiating only inside the face.

## 5. What is and is not new

What is new is the structural classification:

\[
\text{symplectic inverse response}
\longleftrightarrow
\text{critical null locus of the Freudenthal quartic}.
\]

The exceptional parent packages the determinant, source--response pairing and inverse matching into one invariant geometry. This is stronger than observing that the same formula can be embedded somewhere in \(E_7\)-related mathematics.

What is not new is a numerical constraint. On positive two-by-two matrices, quartic nullity and cubic criticality select the same locus. No mass, mixing angle, coupling, pole location or residue is fixed.

## 6. Link-line and orientation limits

For a common unit octonionic link line \(q\), the trace pairing contains the product of the two link coefficients but is independent of which unit \(q\) was chosen. Reversing that line in both source and response also changes nothing. Hence neither \(\Omega\) nor \(\mathcal T\) removes the \(\mathbb{RP}^7\) embedding degeneracy.

The antisymmetry of \(\Omega\) distinguishes the abstract ordering

\[
\text{source}\to\text{response}
\quad\hbox{from}\quad
\text{response}\to\text{source}.
\]

But the programme's surviving orientation torsor is a different typed object: it reverses a channel-to-boundary-flux assignment while retaining source and response roles. No established map identifies that operation with exchange of the two Freudenthal Jordan slots. Therefore the symplectic sign may not be advertised as a solution of the flux-orientation problem.

## 7. Research judgement

This branch passes the “typed bridge” part of the goal but not the “new prediction” part:

- **pass:** the existing inverse response has an exact invariant characterization in the parent geometry;
- **pass:** source and response occupy canonically paired, oppositely oriented slots;
- **fail:** the exceptional structure does not choose the physical octonionic line;
- **fail:** it does not yet identify the Furey/flux orientation bit;
- **fail:** it gives no new observable number.

The remaining high-value test is compatibility with Ward/UV normalization. If the normalization flow preserves this critical-null locus for a reason stronger than ordinary matrix algebra, the parent may constrain dynamics. If not, the honest outcome is an elegant enlargement and classifier rather than a generator of physics.

## References

- [Gunaydin, Koepsell and Nicolai, conformal and quasiconformal exceptional-group realizations](https://arxiv.org/abs/hep-th/0008063)
- [Helenius, Freudenthal triple systems by root-system methods](https://arxiv.org/abs/1005.1275)
- [Borsten et al., quartic invariants and Freudenthal duality](https://arxiv.org/abs/0903.5517)

## Stop conditions

Do not call the critical-locus result a prediction unless an independently derived action or response equation is shown to require \(\mathcal T=0\). Do not identify Freudenthal slot exchange with physical flux reversal without an explicit intertwining map.
