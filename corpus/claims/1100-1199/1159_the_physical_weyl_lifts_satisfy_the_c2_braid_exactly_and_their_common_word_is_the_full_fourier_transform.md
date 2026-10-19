# The Physical Weyl Lifts Satisfy the \(C_2\) Braid Exactly, and Their Common Word Is the Full Fourier Transform

**Date:** 19 October 2026  
**Branches:** \(C_2\) Weyl consistency, controlled Fourier interface, channel exchange, metaplectic lift, Eisenstein functional equations  
**Claim status:** exact integral symplectic braid theorem; metaplectic phase and arithmetic normalization remain conditional

## Executive result

Let \(P\) exchange the two channels simultaneously in coordinate and momentum space, and let \(S\) be the controlled Fourier quarter-turn on the second channel:

\[
P:
(q_1,q_2,p_1,p_2)
\mapsto
(q_2,q_1,p_2,p_1),
\]

\[
S:
(q_1,q_2,p_1,p_2)
\mapsto
(q_1,p_2,p_1,-q_2).
\]

These are integral symplectic representatives of the two simple reflections of \(C_2\). Direct multiplication gives

\[
\boxed{
PSPS=SPSP=J_4,
}
\]

where

\[
J_4=
\begin{pmatrix}
0&I\\
-I&0
\end{pmatrix}
\]

is the full two-channel Fourier/Legendre transformation.

Thus the length-four \(C_2\) braid relation holds **exactly at the symplectic lift level**, not merely after quotienting to the Weyl group.

Moreover,

\[
J_4^2=-I_4,
\]

so

\[
(PS)^4=-I_4,
\qquad
(PS)^8=I_4.
\]

The Weyl Coxeter element has order four, while this integral carrier lift has order eight because it retains the central symplectic sign.

\[
\boxed{
\text{the two partial operations braid into the full Fourier transform.}
}
\]

This supplies the complete finite Weyl-consistency skeleton needed by an \(Sp(4)\) Eisenstein functional equation.

## 1. The two lifts

In the ordered basis

\[
(q_1,q_2,p_1,p_2),
\]

take

\[
P=
\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&0&1\\
0&0&1&0
\end{pmatrix},
\]

and

\[
S=
\begin{pmatrix}
1&0&0&0\\
0&0&0&1\\
0&0&1&0\\
0&-1&0&0
\end{pmatrix}.
\]

Both obey

\[
g^TJ_4g=J_4.
\]

Their induced Weyl actions are

\[
s_1:(e_1,e_2)\mapsto(e_2,e_1),
\]

\[
s_2:(e_1,e_2)\mapsto(e_1,-e_2).
\]

## 2. Exact braid closure

The \(C_2\) Coxeter matrix has

\[
m_{12}=4,
\]

so the braid relation is

\[
s_1s_2s_1s_2
=
s_2s_1s_2s_1.
\]

For arbitrary group representatives a braid relation can acquire torus signs. For the present physically motivated lifts, it does not:

\[
PSPS=SPSP
\]

as literal integral \(4\times4\) matrices.

The common value is the full Fourier matrix \(J_4\). It sends

\[
(q,p)\mapsto(p,-q)
\]

on both channels.

This is a strong compatibility result. The channel exchange and one-face Fourier pulse do not merely generate the right quotient group; their two reduced decompositions of the longest Weyl element agree before quotienting.

## 3. The central residue

Although the braid is exact,

\[
(PS)^4=J_4^2=-I_4.
\]

Conjugation by \(-I_4\) acts trivially on the torus, so the Weyl image satisfies

\[
(s_1s_2)^4=1.
\]

The symplectic carrier remembers one further binary layer:

\[
\text{Weyl order }4
\quad\leadsto\quad
\text{carrier-lift order }8.
\]

This is structurally consistent with the earlier braid/full-twist and metaplectic-sign branches. It does not yet identify their phases. The metaplectic preimage of \(-I_4\) still has a lift-sign choice fixed by path/Maslov data.

## 4. Root sequence of the braid

For

\[
\alpha_1=e_1-e_2,
\qquad
\alpha_2=2e_2,
\]

the reduced word

\[
w_0=s_1s_2s_1s_2
\]

crosses the positive roots in the order

\[
\alpha_1,\quad
2e_1,\quad
e_1+e_2,\quad
2e_2.
\]

The alternative reduced word

\[
w_0=s_2s_1s_2s_1
\]

crosses the same roots in reverse order:

\[
2e_2,\quad
e_1+e_2,\quad
2e_1,\quad
\alpha_1.
\]

Therefore any scalar normalization that factorizes root by root has the same total product along both braid words.

This is the finite root-theoretic content of reduced-word independence in the Gindikin–Karpelevich formula.

## 5. The automorphic functional-equation skeleton

Let \(R_i(\lambda)\) be normalized simple intertwining operators. Their covariance shifts the spectral parameter:

\[
R_i(\lambda):
I(\lambda)\to I(s_i\lambda).
\]

The rank-two braid consistency has the parameter-shifted form

\[
\begin{aligned}
&R_1(s_2s_1s_2\lambda)
R_2(s_1s_2\lambda)
R_1(s_2\lambda)
R_2(\lambda)\\
={}&
R_2(s_1s_2s_1\lambda)
R_1(s_2s_1\lambda)
R_2(s_1\lambda)
R_1(\lambda),
\end{aligned}
\]

up to the convention for operator ordering.

The matrix skeleton satisfies this because \(PSPS=SPSP\). The scalar arithmetic factors satisfy it when their product is taken over the inversion set of \(w_0\), which is the complete positive-root set.

Thus the programme already has the correct finite braid architecture. The missing content is the parameter-dependent scalar/root normalization and its physical spectral meaning.

## 6. Metaplectic qualification

Quantizing a symplectic matrix gives a metaplectic operator only up to the double cover. Consequently:

- the symplectic braid relation is exact;
- chosen metaplectic lifts can differ by a central sign unless their paths and phases are fixed coherently;
- the common word \(J_4\) becomes a two-dimensional Fourier operator with a convention-dependent overall phase;
- the lift of \(-I_4\) is observable only in a phase-sensitive experiment.

The earlier minimal metaplectic interferometer supplies exactly the kind of observable needed to distinguish these lifts.

Therefore:

\[
\boxed{
\text{the braid has no symplectic anomaly;}
\quad
\text{any remaining anomaly is metaplectic/path data.}
}
\]

## 7. Physical interpretation

The two simple operations have distinct physical meanings:

- \(P\): exchange the two relational faces;
- \(S\): exchange source and response on one face.

The braid theorem says that alternating these operations in either allowed order produces the same global source–response exchange.

This is an unusually concrete realization of “relationships compose consistently.” Local reframings do not depend on the chosen reduced decomposition once the complete braid word is formed.

The central residue says that repeating the global operation twice retains orientation parity:

\[
J_4^2=-I_4.
\]

So global consistency does not erase all path information; it compresses it into a central sign.

## 8. Consequence for learning

If these interfaces are treated as model-frame changes, braid consistency means that two different sequences of elementary reframings lead to the same final frame:

\[
\text{path A}
\quad\text{and}\quad
\text{path B}
\quad\longrightarrow
\text{same response polarization}.
\]

The learner can therefore change explanatory coordinates without accumulating an arbitrary decomposition-dependent error.

At the quantum/metaplectic level, the residual sign can still distinguish histories interferometrically. This gives a clean division:

- observable model frame: path independent;
- coherent lift/history: may retain a binary phase.

## 9. What remains before zeta is physical

The braid theorem validates the matrix part of the functional equations. It does not generate the scalar arithmetic factor.

The remaining construction must explain why a physical interface amplitude has root factors

\[
c_\alpha(\lambda)
=
\frac{\xi(\langle\lambda,\alpha^\vee\rangle)}
{\xi(\langle\lambda,\alpha^\vee\rangle+1)}
\]

or the appropriate convention-equivalent expression.

That requires:

- summation over a primitive integral lattice or cusp orbit;
- a spectral parameter coupled to the torus character;
- local factors satisfying Euler product decomposition;
- normalization compatible with unitarity;
- physical probes detecting the resulting phase or resonance structure.

## 10. Stop-everything conditions

1. **Coherent metaplectic braid:** the physical lifts satisfy the braid without an uncontrolled sign.
2. **Measured central phase:** the \(-I\) or metaplectic lift sign appears in an interference observable.
3. **Root-local amplitudes:** each simple interface acquires a scalar depending only on its coroot spectral parameter.
4. **Euler factorization:** lattice modes produce the prime-local factors of the completed zeta ratio.
5. **Functional equation:** the physical composite amplitudes are independent of the two reduced words.
6. **Failure:** microscopic phase conventions produce a nonremovable braid anomaly, blocking automorphic covariance.

## 11. Decision

Promote:

\[
\boxed{
PSPS=SPSP=J_4.
}
\]

The physical interface generators satisfy the full \(C_2\) braid exactly, and their common word is the global Fourier/Legendre transformation.

Also promote:

\[
\boxed{
(PS)^4=-I_4,
}
\]

so the carrier lift retains a central orientation sign beyond the Weyl quotient.

The next frontier is no longer finite group consistency. It is scalar arithmetic normalization: derive the zeta factor from a physical lattice/cusp sum and test its analytic passivity.

## Executable certificate

Run:

    node verification/verify/verify_physical_weyl_lifts_satisfy_c2_braid.mjs

The certificate verifies symplecticity, exact equality of the two braid words, identification of their common value with \(J_4\), the order-eight carrier Coxeter lift and equality of the two positive-root inversion sequences.
