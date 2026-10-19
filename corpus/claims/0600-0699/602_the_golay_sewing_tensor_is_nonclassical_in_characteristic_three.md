# The Golay Sewing Tensor Is Nonclassical in Characteristic Three

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact algebraic boundary on the Jordan-cubic interpretation  
**Certificate:** [search_compensated_golay_linking_rows.mjs](../../../verification/search/search_compensated_golay_linking_rows.mjs)

## Executive result

The tensor that forces the Standard-Model doubling linker is nonzero and has trivial radical, but it is **not** an ordinary cubic norm on the ternary Golay stabilizer.

Let

\[
\tau_\mu(x,y,z)=\sum_i\mu_i x_i y_i z_i
\]

on the five-dimensional space (S\subset\mathbb F_3^{11}). Exact enumeration gives

\[
\tau_\mu(s,s,s)=0
\qquad\text{for every }s\in S,
\]

while the (15\times5) middle-action matrix of \(\tau_\mu\) has rank five. Thus

\[
\boxed{
\tau_\mu\ne0,
\qquad
s\mapsto\tau_\mu(s,s,s)\equiv0.
}
\]

In characteristic three, diagonal evaluation loses the mixed trilinear data. The code object must be treated as a symmetric trilinear tensor—or as divided-power/multilinear data retained from the integral parent—not as a cubic polynomial reconstructed from its diagonal.

## 1. Why the diagonal vanishes

Modulo three, every coefficient in both nonunit Golay orbits obeys

\[
\mu_i\equiv-1.
\]

For (s\in\mathbb F_3^{11}), Frobenius gives (s_i^3=s_i). Hence

\[
\tau_\mu(s,s,s)
=\sum_i\mu_i s_i^3
=-\sum_i s_i.
\]

The shortened ternary Golay stabilizer lies in the sum-zero hyperplane, so this expression vanishes on all (3^5=243) words of (S). The executable audit verifies all cases independently.

## 2. Why the tensor nevertheless survives

Mixed evaluations need not vanish. In the certified basis (e_1,\ldots,e_5), the entries \(\tau_\mu(e_a,e_b,e_c)\) form a nonzero tensor. More strongly,

\[
\Phi:S\to\operatorname{Sym}^2(S^*),
\qquad
\Phi(s)(r,t)=\tau_\mu(s,r,t)
\]

has rank five and therefore zero kernel. The two evaluations carry radically different information:

\[
\begin{array}{c|c}
\text{diagonal }s\mapsto\tau(s,s,s)&\text{identically zero}\\
\text{middle action }s\mapsto\tau(s,-,-)&\text{injective}
\end{array}
\]

This is possible precisely because (3=0) in the base field.

## 3. Ordinary polarization fails in characteristic three

Over a ring in which (6) is invertible, a symmetric trilinear form and its diagonal cubic determine one another by polarization. Here (6=0), so that equivalence fails.

For the integral polynomial

\[
C(x)=\sum_i\mu_i x_i^3,
\]

the third finite difference is (6\tau_\mu(x,y,z)). Reducing modulo three annihilates it. Conversely, Frobenius makes the reduced diagonal additive and blind to mixed tensor entries.

The safe object is therefore

\[
\boxed{\text{the weighted symmetric trilinear sewing tensor}.}
\]

It can be regarded as multilinear or divided-power information surviving from the integral construction, but it is not recoverable from an ordinary cubic function on (S).

## 4. Consequence for the Jordan programme

The code still realizes an exact relational pattern:

- a middle displacement acts bilinearly on two outer relations;
- that action is injective;
- cubic sewing forces the middle displacement to vanish;
- the unique relation breaks a local face symmetry.

But one may not infer that the code tensor is a Jordan cubic norm. The programme's (Spin_0(2,3)) carrier comes from the rank-two Euclidean Jordan algebra (H_2(\mathbb R)), whose determinant is quadratic. A direct identification with a ternary cubic would already be structurally suspect. The credible bridge is a reduction or functor transporting **middle-action nondegeneracy** into a Jordan triple product while changing base ring and degree.

## 5. The universal Jordan analogue is real but not selective

For any unital Euclidean Jordan algebra (J), define

\[
B_y(x,z)=\operatorname{tr}\{x,y,z\}.
\]

With unit (e),

\[
\{e,y,z\}=y\circ z,
\qquad
B_y(e,z)=\operatorname{tr}(y\circ z).
\]

Nondegeneracy of the trace form implies (B_y=0\Rightarrow y=0). Thus zero-radical middle action is compatible with Jordan theory, but generic to unital Euclidean Jordan algebras. By itself it does not select (H_2(\mathbb R)), (Sp(4,\mathbb R)), or (Spin_0(2,3)).

The next selector must use additional structure: dimension, signature, Peirce faces, integral reduction, symmetry stabilizer or compatibility with the doubled code.

## 6. Stop-everything boundary

Any claim that the mod-three Golay diagonal cubic directly equals a Jordan cubic norm is false for the certified (S): its diagonal is identically zero.

Any surviving synthesis must distinguish:

1. the integral weighted cubic before reduction;
2. the nonzero symmetric trilinear tensor retained modulo three;
3. the zero diagonal cubic function on (S);
4. the quadratic determinant and triple product of (H_2(\mathbb R)).

Collapsing these four objects would erase the exact feature that makes the linker theorem work.

## 7. Highest-value next tests

1. Compute the stabilizer of \(\tau_\mu|_S\) inside (GL(S)) and compare its invariant flags with the code's two-face architecture.
2. Classify integral lifts of the trilinear tensor rather than only lifts of the isotropic row space.
3. Construct an explicit map from a Peirce middle corner to (S) and test whether it intertwines middle actions.
4. Determine whether the required degree change is naturally supplied by a boundary response, trace, derivative or reduction modulo three.
5. Reject any proposed map identifying the zero diagonal function with a nonzero Jordan norm.

## 8. Reproduction

Run:

    node scripts\search_compensated_golay_linking_rows.mjs

The output must include:

    characteristicThreeAudit.wordsTested: 243
    characteristicThreeAudit.nonzeroDiagonalWords: 0
    characteristicThreeAudit.trilinearTensorNonzero: true
    cubicPolarizationCertificate.rank: 5
