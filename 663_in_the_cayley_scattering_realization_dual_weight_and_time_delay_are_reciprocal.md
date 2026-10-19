# In the Cayley Scattering Realization, Dual Weight and Time Delay Are Reciprocal

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the bound/free response branch  
**Claim status:** exact canonical unitary-scattering theorem and executable matrix check; experimental S-matrix identification remains open  
**Certificate:** [verify_cayley_scattering_time_delay_dual_residue_relation.mjs](scripts/verify_cayley_scattering_time_delay_dual_residue_relation.mjs)

## Executive result

For a Hermitian boundary response \(F(E)\), define the canonical Cayley scattering matrix

\[
S(E)=\bigl(F(E)-iI\bigr)\bigl(F(E)+iI\bigr)^{-1}.
\]

It is unitary. Its Wigner–Smith matrix is

\[
\boxed{
Q_{\rm WS}
=-iS^\dagger\frac{dS}{dE}
=2(F-iI)^{-1}F'(F+iI)^{-1}
\succeq0.
}
\]

At a simple response zero \(F(r)v=0\),

\[
\tau_v:=v^TQ_{\rm WS}(r)v
=2v^TF'(r)v.
\]

The dual pole weight from [document 662](662_positive_dual_pole_residues_are_inverse_slopes_of_response_zeros.md) is

\[
w_v=\frac1{v^TF'(r)v}.
\]

Therefore

\[
\boxed{\tau_vw_v=2.}
\]

In this canonical scattering realization, dual spectral weight and time delay are reciprocal—not the same quantity.

## 1. Unitarity of the Cayley response map

For real energy away from response poles, \(F(E)=F(E)^T\). Hence

\[
S^\dagger
=(F-iI)^{-1}(F+iI),
\]

and because both factors are functions of the same Hermitian matrix,

\[
S^\dagger S=I.
\]

The Cayley map turns a Hermitian response into a unitary two-channel scattering object without adding new degrees of freedom.

## 2. Wigner–Smith positivity

Writing

\[
R=(F+iI)^{-1},
\]

gives

\[
Q_{\rm WS}=2R^\dagger F'R.
\]

For a rational Herglotz response between its poles,

\[
F'(E)\succeq0.
\]

Therefore

\[
Q_{\rm WS}\succeq0.
\]

This supplies an exact positive-delay matrix for the canonical Cayley model.

## 3. Evaluation in the zero channel

At \(F(r)v=0\),

\[
(F(r)+iI)^{-1}v=-iv.
\]

Consequently

\[
v^TQ_{\rm WS}(r)v
=2v^TF'(r)v.
\]

Combining this with

\[
R_{\rm dual}
=\frac{vv^T}{v^TF'(r)v}
\]

gives the reciprocal invariant

\[
\tau_v\operatorname{tr}R_{\rm dual}=2.
\]

The certificate verifies this identity at all four response zeros of the noncommuting matrix example, while also checking \(S^\dagger S=I\) and Hermiticity of \(Q_{\rm WS}\).

## 4. Bound/free interpretation

Within this realization:

- a shallow response zero gives a strong dual pole but small delay;
- a steep zero gives a weak dual pole but large delay;
- the product remains fixed by Cayley normalization;
- zero mergers can invalidate the simple reciprocal formula and mark a critical transition.

This corrects the tempting intuition that a stronger dual pole must mean a longer delay. In the canonical normalization, the two are inversely related.

## 5. Physical caveat

The Cayley matrix is mathematically unitary, but an experimental scattering matrix additionally requires:

- on-shell asymptotic states;
- flux normalization;
- a physical channel basis;
- the correct analytic sheet;
- threshold and continuum cuts;
- a derivation relating the response operator to measured amplitudes.

Until those are supplied, the theorem establishes a canonical scattering realization, not a measured Standard-Model delay.

## 6. Stop-everything criteria

Stop identifying \(Q_{\rm WS}\) with experimental time delay if:

1. the Cayley channels are not asymptotic scattering channels;
2. the response has gauge-null or negative-norm directions;
3. physical continuation places the zero on another sheet;
4. flux normalization changes the Cayley dictionary;
5. the zero is multiple and the simple-channel formula fails.

## 7. Next gates

1. Build a two-port Hamiltonian or boundary model whose physical scattering matrix equals the Cayley transform.
2. Introduce continuum widths and track complex zero/pole motion.
3. Test the reciprocal law near a zero merger.
4. Connect the source channels to electron, neutrino or stress observables with explicit flux normalization.

## Reproducibility

```powershell
node scripts\verify_cayley_scattering_time_delay_dual_residue_relation.mjs
```
