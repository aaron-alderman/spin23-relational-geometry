# Complex Isotropic Branches Limit the Furey Lepton-Doublet Selector

**Date:** 17 October 2026  
**Branches:** B03, B04 and B11  
**Claim status:** exact counterexamples to global uniqueness over the complex TRO  
**Certificate:** [derive_furey_conjugate_twisted_zero_equations.mjs](scripts/derive_furey_conjugate_twisted_zero_equations.mjs)

## Result

The coordinate-subspace theorem of [document 613](613_conjugate_twisted_furey_ternary_incidence_uniquely_selects_the_lepton_doublet.md) does **not** extend to the full complex vector zero locus.

Writing

\[
x=(Q,u^c,d^c,L,e^c),
\]

the exact Jordan-symmetrized equations contain

\[
(d_1^c)^2+(d_2^c)^2+(d_3^c)^2=0
\]

but do not force each \(d_a^c\) separately to vanish. Therefore

\[
Q=u^c=L=e^c=0,
\qquad
d^c=(1,i,0)
\]

is a nonzero conjugate-twisted null vector outside the lepton doublet.

There is also a quark-doublet branch. Regard \(Q\) as a \(3\times2\) matrix. The explicit choice

\[
Q=
\begin{pmatrix}
1&i\\
i&-1\\
0&0
\end{pmatrix}
=
\begin{pmatrix}1\\i\\0\end{pmatrix}
\begin{pmatrix}1&i\end{pmatrix}
\]

has isotropic factors on both sides and satisfies every extracted Jordan-symmetrized quadratic equation, with all other sectors zero.

## Interpretation

The exact statement is now sharply split:

- among particle-sector unions and coordinate matrix-unit subspaces, \(L\) is uniquely maximal;
- among arbitrary complex vectors, isotropic cancellation produces extra \(Q\) and \(d^c\) solutions.

This is not a software accident. The incidence uses the complex-bilinear square \(v_1^2+\cdots+v_n^2\), not the positive Hermitian norm \(|v_1|^2+\cdots+|v_n|^2\). Complex null vectors are therefore expected.

## Consequence for the programme

The lepton-doublet result remains an exact combinatorial/support selector, but it is not yet a global physical selector. Any physical promotion needs an additional real structure, positivity condition, Hermitian conjugate placement, or gauge-covariant reality constraint that removes the complex isotropic branches without erasing flavor CP.

This makes the next test unusually concrete:

\[
\boxed{
\text{Can the source-derived Furey real structure exclude the }Q\text{ and }d^c
\text{ isotropic branches while retaining }L?
}
\]

If it cannot, the conjugate-twisted null law is useful as an incidence stratifier but must be abandoned as a unique matter-sector selector.

## Reproducibility

```powershell
node scripts/derive_furey_conjugate_twisted_zero_equations.mjs
```

The certificate derives ten distinct one-sided and twenty-five distinct Jordan-symmetrized quadratic equations directly from block composition.
