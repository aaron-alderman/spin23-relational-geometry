# The CKM Matrix Has a Minimal Positive Graph-Projector Realization

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the charged-current flavor-linking branch  
**Claim status:** exact positive finite-dimensional flavor-link realization; embedding into the full field-theory response remains open  
**Certificate:** [verify_positive_ckm_graph_projector_and_jarlskog_link.mjs](../../../verification/verify/verify_positive_ckm_graph_projector_and_jarlskog_link.mjs)

## Executive result

The neutral incidence/\(B-L\) carrier cannot retain CKM phase information, but the charged-current mixing matrix has a canonical positive realization. For a unitary \(V\in U(3)\), define

\[
\boxed{
P_V=\frac12
\begin{pmatrix}
I_3&V\\
V^\dagger&I_3
\end{pmatrix}.
}
\]

Then

\[
P_V^\dagger=P_V,
\qquad
P_V^2=P_V,
\qquad
\operatorname{rank}P_V=3.
\]

Thus \(P_V\) is the orthogonal projector onto the graph of \(V^\dagger\). It is positive semidefinite and contains the complete charged-current link in its off-diagonal block.

This gives the smallest positive block that joins three up-type and three down-type flavor directions while retaining their relative unitary mixing.

## 1. Gram-factor interpretation

Let

\[
T=\frac1{\sqrt2}\begin{pmatrix}I_3&V\end{pmatrix}.
\]

Then

\[
P_V=T^\dagger T.
\]

Positivity is therefore automatic. The rank is three because \(T\) has three independent rows.

In relational language:

- the two diagonal blocks are the two flavor faces;
- \(V\) and \(V^\dagger\) are the oriented relations between them;
- the positive projector is the completed observable kernel;
- the null complement is the anti-graph relation.

This is a complex flavor analogue of completing off-diagonal relational data into a positive two-face response.

## 2. Why the mixing matrix alone is not yet CP

Under independent flavor-basis changes,

\[
V\mapsto U_u^\dagger VU_d,
\]

and \(P_V\) transforms by block-unitary conjugation. A lone unitary graph has no basis-invariant CP content; one may choose bases that move its phases.

Physical CP appears only after the graph is compared with nondegenerate mass operators. In a common up-type basis, let

\[
H_u=\operatorname{diag}(m_u^2,m_c^2,m_t^2),
\qquad
H_d=V\operatorname{diag}(m_d^2,m_s^2,m_b^2)V^\dagger.
\]

Then a basis-invariant CP diagnostic is

\[
\operatorname{Im}\det[H_u,H_d],
\]

equivalently the usual Jarlskog invariant times products of mass-squared differences. The certificate uses an explicitly complex unitary \(V\), nondegenerate illustrative mass operators, and verifies a nonzero imaginary commutator determinant.

## 3. Minimal positive dilation

If \(P_V\) appears as the residue of one rational response pole, its rank-three factorization requires at least three internal dilation directions. This saturates the residue-rank lower bound.

The result is much smaller and cleaner than treating every matrix entry of \(V\) as an independent mode:

\[
\boxed{
\text{one unitary three-generation link}
\Longrightarrow
\text{one rank-three positive graph residue}.
}
\]

Additional pole structure, separate charged-current helicities and continuum thresholds can enlarge the realization, but positivity itself does not require more than rank three for this link.

## 4. Coupling to the real face carrier

Let \(C\in H_2(\mathbb R)\) be a positive incidence/\(B-L\) face residue. Then

\[
C\otimes P_V\succeq0.
\]

This realizes the separation

\[
\boxed{
\text{real two-face response}
\otimes
\text{complex flavor graph}.
}
\]

The \(Spin_0(2,3)\) response geometry can act on the first factor while flavor basis transformations act on the second. This avoids inserting CKM phases into the real Jordan face index.

Whether the physical charged-current correlator factorizes this cleanly is a further dynamical question.

## 5. Furey/TRO interpretation

The off-diagonal block \(V\) is naturally a morphism between two three-dimensional flavor modules. Together with its adjoint it generates the linking operator

\[
\begin{pmatrix}
0&V\\
V^\dagger&0
\end{pmatrix}.
\]

The projector \(P_V\) is its positive graph completion. This matches the broader Furey-track lesson that physically meaningful orientation data live in bimodule or ternary linking structure, while positive observables live in Hermitian completions.

The statement is structural. No claim is made that Furey's division-algebra construction derives the measured CKM matrix.

## 6. Stop-everything criteria

Stop treating \(P_V\) as a physical flavor response if:

1. no charged-current or cross-sector observable supplies the off-diagonal \(V\) block;
2. \(V\) is considered without the mass operators needed for basis-invariant CP;
3. positivity is spoiled by the actual Lorentz, gauge or spectral tensor factors;
4. the tensor product with the real face carrier is assumed rather than derived;
5. the rank-three dilation modes are called new particles instead of realization coordinates.

## 7. Next gates

1. Build the combined neutral-plus-charged rational kernel and determine its minimal total dilation.
2. Insert both CKM and PMNS graph projectors.
3. Express the Jarlskog invariant directly as a closed word in response blocks.
4. Compare the graph-projector linking algebra with the selected Furey TRO sectors.
5. Determine whether source-filter polarization on the face factor commutes with flavor graph composition.

## Reproducibility

    node scripts\verify_positive_ckm_graph_projector_and_jarlskog_link.mjs
