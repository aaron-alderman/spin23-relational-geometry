# No Charged Nambu Half Preserves Both Gauge Symmetry and CAR Reality

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact rank-one projection no-go for every nonzero \(U(1)\) charge  
**Certificate:** [verify_no_gauge_car_invariant_nambu_half_projection.mjs](scripts/verify_no_gauge_car_invariant_nambu_half_projection.mjs)

## Theorem

Let

\[
\mathcal N_q=V_q\oplus V_{-q},
\qquad q\ne0,
\]

carry the charged gauge action

\[
\rho_q(\alpha)=
\begin{pmatrix}
e^{iq\alpha}&0\\
0&e^{-iq\alpha}
\end{pmatrix}
\]

and the self-dual CAR real structure

\[
J_0=\tau_xK.
\]

There is no nonzero proper Hermitian projector \(P\) satisfying both

\[
[P,\rho_q(\alpha)]=0\quad\text{for every }\alpha
\]

and

\[
J_0PJ_0^{-1}=P.
\]

Equivalently,

\[
\boxed{P=0\quad\text{or}\quad P=I.}
\]

## Proof

For \(q\ne0\), commutation with all gauge phases forces \(P\) to be diagonal. Hermiticity gives

\[
P=\operatorname{diag}(a,d),
\qquad a,d\in\mathbb R.
\]

CAR invariance swaps the two entries, so \(a=d\). Idempotence then gives \(a^2=a\), hence \(a=0\) or \(1\). No rank-one solution exists.

The two tempting halves display the obstruction directly:

- the particle projector \(\operatorname{diag}(1,0)\) is gauge-invariant but is exchanged with the hole projector by \(J_0\);
- the CAR-real line projector \((I+\tau_x)/2\) is \(J_0\)-invariant but is not invariant under nonzero charged gauge phases.

## Consequence for the Furey selector

The Nambu path opened in [document 619](619_the_neutral_exchange_is_not_source_car_charge_conjugation.md) cannot finish by a symmetry-preserving rank-one projection onto one charged chiral half.

This does not make Nambu notation inconsistent. In Bogoliubov–de Gennes and self-dual CAR formalisms, doubling can be a redundancy, and choosing a polarization need not preserve the real structure as an independent symmetry. But such a polarization must be derived and its absence of physical mirror degrees of freedom demonstrated; it cannot be called a \(J_0\)-invariant compression.

## Branch decision

The two B03 routes now have different status:

1. **Linear exchange \(S\):** still open and strengthened by positivity, CP and completed-module gauge covariance.
2. **Nambu \(J_0\) plus invariant half-projection:** falsified for charged sectors.

A Nambu derivation remains viable only if the doubled field is explicitly redundant and the physical polarization is allowed to break manifest \(J_0\) while retaining the required observable identities.

## Stop criterion

Stop any claimed mirror-free Nambu reduction that assumes a nontrivial projector commuting with both the charged gauge group and \(J_0\). The theorem excludes it before dynamics are considered.

## Reproducibility

```powershell
node scripts/verify_no_gauge_car_invariant_nambu_half_projection.mjs
```
