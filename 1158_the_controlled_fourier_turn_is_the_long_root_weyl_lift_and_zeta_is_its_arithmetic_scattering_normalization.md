# The Controlled Fourier Turn Is the Long-Root Weyl Lift, and Zeta Is Its Arithmetic Scattering Normalization

**Date:** 19 October 2026  
**Branches:** controlled Fourier interface, \(C_2\) Weyl group, \(Sp(4)\), Eisenstein intertwining, completed zeta, passive scattering  
**Claim status:** exact Weyl-representative identification; automorphic normalization standard mathematically but not yet physically derived

## Executive result

The controlled quarter-turn from document 1157 is not merely reminiscent of an automorphic Weyl operation. It is an explicit representative of one of the two simple Weyl reflections of \(Sp(4)\).

In canonical coordinates

\[
(q_1,q_2,p_1,p_2),
\]

the transformation

\[
S_-:
\quad
q_2\mapsto p_2,
\qquad
p_2\mapsto-q_2,
\]

with the first channel fixed, conjugates a diagonal symplectic torus parameter

\[
(h_1,h_2)
\]

to

\[
(h_1,-h_2).
\]

This is reflection in the long simple root \(2e_2\) of the \(C_2\) root system.

Its square is

\[
S_-^2
=
\operatorname{diag}(1,-1,1,-1)
=D,
\]

which acts trivially in the Weyl quotient but remains as the coroot sign in the group lift. The previously derived relation

\[
S_-^2=D
\]

is therefore exactly what one expects from a lifted Weyl reflection.

\[
\boxed{
\text{the passive quarter-turn is the finite-dimensional Weyl skeleton.}
}
\]

In automorphic Eisenstein theory, the corresponding Weyl intertwining operator acquires a scalar normalization built from completed zeta or \(L\)-function ratios. Thus:

\[
\boxed{
\text{quarter-turn matrix}
\times
\text{arithmetic scattering factor}
=
\text{normalized Weyl intertwiner}.
}
\]

The matrix part exists effectively in the programme. The arithmetic scalar factor has not yet been derived physically.

## 1. The \(C_2\) Weyl group

A split maximal torus in \(Sp(4)\) can be written as

\[
T(t_1,t_2)
=
\operatorname{diag}
(t_1,t_2,t_1^{-1},t_2^{-1}).
\]

Its character space has basis \(e_1,e_2\). A standard choice of simple roots is

\[
\alpha_1=e_1-e_2,
\qquad
\alpha_2=2e_2.
\]

The simple reflections act by

\[
s_1:(e_1,e_2)\mapsto(e_2,e_1),
\]

and

\[
s_2:(e_1,e_2)\mapsto(e_1,-e_2).
\]

They generate the signed-permutation group on two coordinates:

\[
W(C_2)\cong D_8,
\qquad
|W(C_2)|=8.
\]

## 2. The controlled turn is \(s_2\)

The integral symplectic matrix

\[
\widetilde s_2
=
\begin{pmatrix}
1&0&0&0\\
0&0&0&1\\
0&0&1&0\\
0&-1&0&0
\end{pmatrix}
\]

implements

\[
(q_1,q_2,p_1,p_2)
\mapsto
(q_1,p_2,p_1,-q_2).
\]

It is exactly the controlled Fourier turn \(S_-\).

Conjugation gives

\[
\widetilde s_2
T(t_1,t_2)
\widetilde s_2^{-1}
=
T(t_1,t_2^{-1}),
\]

or infinitesimally,

\[
(h_1,h_2)\mapsto(h_1,-h_2).
\]

Thus its Weyl image is the long-root reflection \(s_2\).

## 3. Why the lift has order four while the reflection has order two

Directly,

\[
\widetilde s_2^2
=
\operatorname{diag}(1,-1,1,-1)
=D,
\qquad
\widetilde s_2^4=I.
\]

The diagonal sign \(D\) lies in the torus and therefore disappears when passing to

\[
W=N(T)/T.
\]

Hence

\[
s_2^2=1
\]

in the Weyl group even though the chosen symplectic representative has order four.

This resolves the earlier “one twist” structure cleanly:

- the observable Weyl action is a reflection;
- its carrier lift is a quarter-turn;
- squaring the carrier remembers the graded sign;
- quotienting by the torus forgets that sign.

The metaplectic lift may retain an additional central phase, which is why interference rather than projectors is required to observe the complete lifted information.

## 4. The other simple reflection

Let

\[
\widetilde s_1
\]

exchange channels 1 and 2 simultaneously in the \(q\) and \(p\) sectors. Its torus action is

\[
(h_1,h_2)\mapsto(h_2,h_1),
\]

the short-root reflection \(s_1\).

Together,

\[
\widetilde s_1,\widetilde s_2
\]

project to the complete \(C_2\) Weyl group. They obey the Weyl braid relation

\[
(s_1s_2)^4=1
\]

after passing to the torus quotient.

This gives a precise group-theoretic reading of the two operations already present in the programme:

- face/channel exchange;
- controlled source–response Fourier turn.

## 5. From Weyl matrix to Eisenstein intertwiner

For a principal-series parameter \(\lambda\), a Weyl element \(w\) has an intertwining operator

\[
M(w,\lambda):
I(\lambda)\longrightarrow I(w\lambda).
\]

For a simple reflection \(s_\alpha\), the unnormalized operator is a rank-one integral over the corresponding unipotent root subgroup. On the spherical vector, arithmetic normalization contributes a scalar factor of the schematic form

\[
c_\alpha(\lambda)
=
\frac{\xi(\langle\lambda,\alpha^\vee\rangle)}
{\xi(\langle\lambda,\alpha^\vee\rangle+1)},
\]

up to the convention used for shifts and completion.

For a general Weyl element, the Gindikin–Karpelevich/Langlands factor is a product over positive roots sent negative:

\[
c(w,\lambda)
=
\prod_{\substack{\alpha>0\\w\alpha<0}}
\frac{\xi(\langle\lambda,\alpha^\vee\rangle)}
{\xi(\langle\lambda,\alpha^\vee\rangle+1)}.
\]

Explicit \(Sp(4)\) constant terms and Fourier coefficients are indeed expressed using zeta functions and Whittaker functions: [Siu Hang Man, *Fourier coefficients of \(Sp(4)\) Eisenstein series*](https://doi.org/10.4064/aa230511-16-1).

The important factorization is:

\[
\boxed{
M_{\rm normalized}(s_2,\lambda)
=
c_{\alpha_2}(\lambda)\,
\mathcal W_{\alpha_2}(\lambda),
}
\]

where \(\mathcal W_{\alpha_2}\) carries the long-root Weyl exchange and \(c_{\alpha_2}\) carries the arithmetic spectral normalization.

The programme currently has a concrete finite-dimensional realization of the first part.

## 6. The rank-one prototype

For the ordinary modular Eisenstein series,

\[
E(\tau,s)
=
y^s+\varphi(s)y^{1-s}+\cdots,
\]

where

\[
\varphi(s)
=
\frac{\xi(2s-1)}{\xi(2s)}.
\]

The functional equation implies

\[
\varphi(s)\varphi(1-s)=1.
\]

On the unitary line

\[
s=\frac12+it,
\]

real analyticity gives

\[
|\varphi(s)|=1
\]

away from singular points. Thus the normalized boundary scattering is lossless on shell.

This matches the passive quarter-turn in an important but limited sense:

- the finite carrier operation is orthogonal/unitary;
- the automorphic scalar normalization is an all-pass phase on the unitary axis.

Passivity is therefore compatible with zeta normalization at the scattering boundary.

## 7. Why \(\varphi\) is not automatically a Herglotz response

The scattering coefficient \(\varphi(s)\) is not itself a Herglotz function. It is a meromorphic scattering amplitude.

For a causal passive interpretation one would need:

1. a declared map between \(s\) and physical frequency;
2. analyticity in the physical half-plane;
3. contractivity or unitarity in the appropriate domain/boundary;
4. stable placement of poles;
5. a Cayley transform or impedance map relating scattering to Herglotz response.

If a scalar scattering amplitude \(S(z)\) is analytic and contractive in the physical upper half-plane, then

\[
K(z)
=
i\frac{1+S(z)}{1-S(z)}
\]

is Herglotz, modulo sign convention. But the required Schur-domain property must be proved for the chosen automorphic normalization; boundary unit modulus alone is insufficient.

Thus:

\[
\boxed{
\text{zeta-valued unitary scattering}
\not\Longrightarrow
\text{causal passive impedance without an analytic-domain theorem.}
}
\]

## 8. What the Riemann hypothesis would and would not mean here

For the modular prototype, poles of

\[
\varphi(s)=\frac{\xi(2s-1)}{\xi(2s)}
\]

include points associated with zeros of \(\xi(2s)\). A zero \(\rho\) produces a candidate pole at

\[
s=\frac{\rho}{2}.
\]

If the Riemann hypothesis holds, the nontrivial such poles align on

\[
\operatorname{Re}s=\frac14,
\]

not on the unitary scattering line \(\operatorname{Re}s=1/2\).

Therefore ordinary on-shell unitarity of Eisenstein scattering does not prove the Riemann hypothesis. RH becomes a statement about the alignment of resonances deeper in the analytically continued scattering plane.

This blocks an otherwise tempting overclaim:

\[
\text{passivity of the boundary interface}
\not\Longrightarrow
\text{RH}.
\]

## 9. The exact new synthesis

The following identifications are now defensible:

\[
\begin{array}{rcl}
\text{split Jordan grading }D
&=&
\text{coroot sign left by a lifted reflection},\\
\text{passive controlled quarter-turn }S_-
&=&
\text{long-root Weyl representative},\\
\text{face exchange}
&=&
\text{other simple Weyl reflection},\\
\text{generated finite reflection group}
&=&
W(C_2),\\
\text{arithmetic Eisenstein normalization}
&=&
\text{completed-zeta product over crossed roots}.
\end{array}
\]

This is a stronger result than analogy. It locates exactly which part of the automorphic intertwiner the present physical carrier already realizes and exactly which part remains absent.

## 10. Consequence for the learning path

The learner's “reframing” operation has acquired a precise mathematical type.

Changing the response parameters inside one polarization is parabolic learning. Applying \(S_-\) changes which variable counts as source and which as response on one face. It is a Weyl move between adjacent charts.

The arithmetic scalar \(c_\alpha(\lambda)\) would weight that reframing by the global consistency of the lattice/cusp modes. In that sense:

\[
\text{local reframing}
\times
\text{global consistency weight}
=
\text{automorphic model revision}.
\]

This is not consciousness. It is a possible mathematical model of a system whose changes of explanatory frame are constrained by global compositional consistency.

## 11. Stop-everything conditions

1. **Exact intertwiner kernel:** derive the boundary oscillator kernel as the archimedean component of the long-root standard intertwiner.
2. **Arithmetic completion:** show that summing the physical integral lattice modes produces the nonarchimedean Euler factors.
3. **Covariance equation:** prove the physical response satisfies the two simple-reflection functional equations.
4. **Braid consistency:** verify that composed physical intertwiners satisfy the \(C_2\) braid relation including metaplectic phases.
5. **Passive Cayley theorem:** prove that the normalized automorphic scattering matrix is Schur in the declared causal domain.
6. **Spectral observation:** detect a zeta/\(L\)-factor in an independently defined response amplitude rather than inserting it as normalization.

## 12. Decision

Promote:

\[
\boxed{
S_-\text{ is an exact long-root Weyl representative of }Sp(4).
}
\]

Promote conditionally:

\[
\boxed{
\text{completed zeta supplies the arithmetic normalization}
\text{ of the corresponding Eisenstein intertwiner.}
}
\]

Do not identify the two until the physical boundary kernel, lattice sum and covariance equation are derived in one model.

The highest-value next calculation is the braid/functional-equation test for the two physical interface generators, including their metaplectic phases.

## Executable certificate

Run:

    node scripts/verify_controlled_fourier_is_long_root_weyl_lift.mjs

It verifies symplecticity, conjugation of the maximal torus, \(S_-^2=D\), order two in the Weyl quotient and generation of the eight-element \(C_2\) signed-permutation Weyl group with channel exchange.
