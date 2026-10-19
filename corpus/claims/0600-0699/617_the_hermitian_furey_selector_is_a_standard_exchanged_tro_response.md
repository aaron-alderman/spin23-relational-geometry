# The Hermitian Furey Selector Is a Standard Exchanged TRO Response

**Date:** 17 October 2026  
**Branches:** B03, B04 and B11  
**Claim status:** exact operator identity on the explicit block carrier; physical intertwiner remains open  
**Certificate:** [verify_furey_hermitian_response_operator_form.mjs](../../../verification/verify/verify_furey_hermitian_response_operator_form.mjs)

## Result

The Hermitian repair is not an ad hoc coordinate substitution. It has a basis-independent TRO form once a conjugation and linear block exchange are specified.

Factor the antiunitary topology exchange as

\[
\Theta=S\circ K,
\]

where \(K\) is coefficient conjugation and \(S\) is the linear unitary exchange \(O_1\leftrightarrow R\). With \(D(x)=x^\dagger\), the original bilinear middle map is

\[
J=D\circ\Theta=D\circ S\circ K.
\]

Since \(D\) and \(K\) are both antilinear, \(J\) is complex-linear. The Hermitian middle map is obtained by one further real-structure insertion:

\[
J_{\rm H}=J\circ K
=D\circ S
=S(\,\cdot\,)^\dagger.
\]

Thus the candidate response is

\[
\boxed{
R_x^{\rm H}(z)=xS(x)^\dagger z+zS(x)^\dagger x.
}
\]

It is sesquilinear in the state coefficients and is the ordinary TRO/Jordan middle-adjoint construction twisted by a linear exchange.

## Exact verification

The certificate realizes the full carrier as \(8\times8\) matrices, represents \(S\) by the permutation exchanging the two neutral one-dimensional blocks, and uses exact Gaussian-integer entries across all relevant block types. It verifies

\[
J(Kx)=S(x)^\dagger
\]

entry by entry.

## What this changes

The Cycle 530 positivity result can now be stated intrinsically relative to the chosen Hilbert-space adjoint and exchange \(S\). It no longer depends on manually recognizing coordinate squares and replacing them with absolute squares.

It also isolates the precise remaining physical question:

\[
\boxed{\text{Is }S\text{ an intertwiner of the source Furey and faithful Standard-Model actions?}}
\]

If yes, the Hermitian response is a natural exchanged-TRO observable. If no, its algebraic selectivity is physically irrelevant.

## Covariance criterion

For a gauge action \(g_A\) on topology A and \(g_B\) on topology B, equivariance requires

\[
S\,g_A=g_B\,S.
\]

Under this condition,

\[
R^{\rm H}_{g_Ax}(g_Az)=g_A R^{\rm H}_x(z)
\]

with the appropriately typed left/right actions. This criterion is exact, but it has not yet been checked against the full source representation matrices.

## Stop criterion

Failure of \(Sg_A=g_BS\) for even one required faithful Standard-Model generator stops the physical selector interpretation unless an alternative source-derived exchange restores equivariance. A mere equality of block dimensions is not sufficient.

## Reproducibility

```powershell
node verification/verify/verify_furey_hermitian_response_operator_form.mjs
```
