# The Incidence Current Cannot Be Repaired into a Conserved Current

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the relational-carrier branch  
**Claim status:** exact Yukawa-charge obstruction in the sixteen-state one-generation model; renormalized operator mixing remains open  
**Certificate:** [test_incidence_current_conservation_obstruction.mjs](../../../verification/test/test_incidence_current_conservation_obstruction.mjs)

## Executive result

The incidence weights define the matter-vector insertion

\[
\lambda=(5,5,1,1,1,0)
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

With zero Higgs charge, its four Yukawa violation coefficients are

\[
\boxed{(10,6,2,1).}
\]

Adding any amount of hypercharge or \(B-L\) cannot change these numbers because both added directions already preserve every Yukawa operator. Assigning one additional Higgs phase would separately require

\[
x_H=-10,
\quad 6,
\quad 2,
\quad -1,
\]

which is inconsistent.

Therefore the incidence-weighted source cannot be repaired into a second conserved current:

\[
\boxed{
J_\Lambda^\mu
\text{ is an unprotected composite insertion, not a Ward-normalized symmetry current.}
}
\]

## 1. Exact Yukawa audit

For a candidate charge \(x\), the four invariance conditions are

\[
\begin{aligned}
x_Q+x_H+x_{u^c}&=0,\\
x_Q-x_H+x_{d^c}&=0,\\
x_L-x_H+x_{e^c}&=0,\\
x_L+x_H+x_{\nu^c}&=0.
\end{aligned}
\]

Substituting \(x=\lambda\) and \(x_H=0\) gives

\[
(5+5,\;5+1,\;1+1,\;1+0)
=(10,6,2,1).
\]

All four observed Yukawa structures break the incidence current.

## 2. Why conserved-current dressing fails

Let

\[
x=\lambda+aY_6+b[3(B-L)].
\]

Both \(Y_6\) and \(3(B-L)\) lie in the kernel of the Yukawa-violation map. Hence

\[
V(x)=V(\lambda)
\]

for every \(a,b\). A conserved direction can shift the definition of the source but cannot cancel a component transverse to the conserved subspace.

Nor can one Higgs-only current repair the result: its contribution has sign pattern

\[
(c,-c,-c,c),
\]

which cannot cancel \((10,6,2,1)\).

## 3. Operator divergence

At the classical equation-of-motion level, the divergence takes the schematic form

\[
\partial_\mu J_\Lambda^\mu
\propto
10y_u\mathcal O_u
+6y_d\mathcal O_d
+2y_e\mathcal O_e
+y_\nu\mathcal O_\nu
+\text{h.c.},
\]

with convention-dependent factors of \(i\) and signs. The robust content is the nonzero coefficient vector, not this schematic normalization.

The source consequently acquires scale dependence and can mix with other gauge-singlet vector operators and equation-of-motion terms.

## 4. Consequence for the relational carrier

The positive Gram construction remains mathematically valid. A generating functional may couple an external probe to any renormalized composite operator, conserved or not.

What fails is the stronger interpretation:

\[
(J_\Lambda,J_{B-L})
\text{ as two equally protected currents}.
\]

Only the \(B-L\) direction has the stated anomaly-free Ward normalization before Majorana breaking. The incidence source needs a specified renormalization condition transported across scale.

This makes the source-frame warning of [document 652](652_source_mixing_saturates_the_jordan_tangent_but_may_be_only_a_coordinate_orbit.md) unavoidable rather than optional.

## 5. Possible salvage routes

1. Treat \(J_\Lambda\) explicitly as a nonconserved composite insertion and calculate its anomalous-dimension matrix.
2. Use the positive incidence frame operator \(\Lambda=A^\dagger A\) directly rather than interpreting its eigenvalues as a charge.
3. Promote the four-component breaking vector to a spurion transforming with the Yukawa couplings.
4. Search for a conserved nonlocal or higher-form construction derived from incidence rather than a zero-form phase current.
5. Restrict to a limiting theory with selected Yukawas turned off, while stating that it is not the observed Standard Model.

## 6. Stop-everything criteria

Stop calling \(J_\Lambda\) conserved if:

1. any of the four relevant Yukawa couplings is retained with its nonzero violation coefficient;
2. conservation is claimed after adding only \(Y\) and \(B-L\);
3. one Higgs charge is assigned four incompatible values;
4. operator mixing is ignored while comparing different scales;
5. Ward normalization of \(B-L\) is transferred to the incidence direction by basis rotation.

## 7. Next gates

1. Compute the composite-operator mixing problem in a simplified Yukawa theory.
2. Formulate the relational response directly from the incidence frame operator and \(B-L\) charge without naming \(\lambda\) a symmetry current.
3. Determine whether the Yukawa-breaking vector itself supplies a canonical third relational object.
4. Reassess which subgroup of the generated \(Sp(4,\mathbb R)\) preserves the one protected current direction.

## Reproducibility

```powershell
node scripts\test_incidence_current_conservation_obstruction.mjs
```
