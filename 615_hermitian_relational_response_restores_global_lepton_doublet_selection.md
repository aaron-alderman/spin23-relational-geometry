# Hermitian Relational Response Restores Global Lepton-Doublet Selection

**Date:** 17 October 2026  
**Branches:** B01, B03, B04 and B11  
**Claim status:** exact theorem for a precisely defined candidate sesquilinear response; source derivation remains open  
**Certificate:** [derive_furey_conjugate_twisted_zero_equations.mjs](scripts/derive_furey_conjugate_twisted_zero_equations.mjs)

## Executive result

The complex-isotropic obstruction in [document 614](614_complex_isotropic_branches_limit_the_furey_lepton_doublet_selector.md) is removed if the relational response is sesquilinear in its two state slots rather than complex-bilinear.

Let every TRO coordinate carry a vector in a complex flavor Hilbert space \(F\). Replace each coefficient product in the quadratic response by

\[
a_i a_j\longmapsto \langle a_j,a_i\rangle_F.
\]

Then the diagonal equations extracted from the Jordan-symmetrized incidence become positive sums of norms. Fourteen such equations jointly contain all thirteen non-\(L\) matrix-unit variables and neither of the two \(L\) variables. Hence

\[
\boxed{\mathcal Z_{\rm Herm}=L\otimes F.}
\]

This is global: it allows arbitrary complex superpositions and arbitrary flavor dimension.

## 1. Exact positivity certificate

The certificate derives the quadratic response from block composition and then identifies every equation consisting only of positive diagonal terms. Their union covers

\[
Q_{11},Q_{12},Q_{21},Q_{22},Q_{31},Q_{32},
u_1,u_2,u_3,
d_1,d_2,d_3,
e,
\]

and excludes precisely

\[
L_1,L_2.
\]

After hermitianization, each selected equation has the form

\[
\sum_k c_k\lVert a_k\rVert_F^2=0,
\qquad c_k>0.
\]

It therefore forces every displayed \(a_k\) to vanish. Once all thirteen nonleptonic coordinates vanish, every remaining off-diagonal response equation vanishes automatically. The \(L\) variables never enter the incidence equations, so they remain arbitrary.

## 2. Why this differs from imposing reality

Restricting every coefficient to a real number would also destroy the isotropic vectors, but it would threaten the programme’s complex flavor and CP sectors. The Hermitian response does not impose

\[
a=\bar a.
\]

It uses complex conjugation only in forming an observable response. Flavor vectors, mixing matrices and Yukawa operators may remain complex. Thus the proposed division is

\[
\boxed{
\text{real/positive observable carrier}
\quad\text{with}\quad
\text{complex internal flavor amplitudes}.
}
\]

This agrees with the earlier real-face/complex-flavor architecture, but does not yet derive it.

## 3. Relation to the \(Spin(2,3)\) programme

A positive Hermitian response naturally takes values in self-adjoint operator space. On the selected two-face sector, compression to a real two-by-two response is the previously isolated route

\[
M_2(\mathbb C)_{\rm sa}
\supset H_2(\mathbb R)
\longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The new result does not prove that compression. It supplies a reason positivity and the lepton-doublet selection may belong to the same response construction rather than being unrelated assumptions.

## 4. What is established

For the explicitly defined Hermitianized incidence:

1. all complex-isotropic \(Q\) and \(d^c\) counterexamples are eliminated;
2. every nonleptonic coordinate is forced to zero by a positive norm equation;
3. the complete \(L\) doublet remains unconstrained;
4. the conclusion holds for \(F=\mathbb C^n\) for every finite \(n\), so complex flavor is not removed.

## 5. What remains open

- The sesquilinear placement has not been derived from Furey’s CAR/Lorentz action.
- Full covariance under the faithful Standard-Model group has not been checked on the response tensor.
- Retaining a complex flavor space is necessary but not sufficient for a nonzero Jarlskog invariant.
- No dynamics selects this response instead of the original complex-bilinear law.
- The subsequent compression to \(H_2(\mathbb R)\) remains a separate real-form gate.

## 6. Stop-everything criteria

Stop treating this as a physical selector if:

1. the source involution fixes the bilinear, rather than Hermitian, coefficient placement;
2. hermitianization violates the typed TRO composition or faithful gauge action;
3. positivity requires conjugating flavor operators in a way that forces all CP-odd invariants to vanish;
4. the \(L\) sector ceases to be null when the actual particle-module intertwiner is inserted;
5. the resulting response cannot be interpreted as an observable, spectral density or positive kernel.

## 7. Next executable gates

1. Write the Hermitian response as a basis-independent operator formula on the linking algebra.
2. Test equivariance under explicit Standard-Model root generators.
3. Tensor with three-generation flavor matrices and verify that the selector commutes with a nonzero symbolic CP-odd invariant.
4. Compare the resulting positive \(2\times2\) response with the established \(H_2(\mathbb R)\) reciprocity projection.

## 8. Reproducibility

```powershell
node scripts/derive_furey_conjugate_twisted_zero_equations.mjs
```

The output reports fourteen positive diagonal equations, thirteen positivity-forced variables, and precisely \(L_{11},L_{21}\) as unconstrained variables.
