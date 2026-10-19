# Conserved-Current Ward Quotient to an \(H_2(\mathbb R)\) Response

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact Euclidean conserved-current spectral prototype; identification with a unique physical two-port observable remains open

## 1. Conserved-current spectral kernel

At nonzero Euclidean momentum \(q\), a conserved vector-current spectral contribution has the form

\[
C_{\mu\nu}(q)
=\rho(q^2)P^T_{\mu\nu}(q),
\qquad
P^T_{\mu\nu}
=\delta_{\mu\nu}
-\frac{q_\mu q_\nu}{q^2},
\]

with \(\rho(q^2)\ge0\) for a positive spectral measure.

The Ward identity is

\[
q^\mu C_{\mu\nu}=0.
\]

Thus \(C\) is positive semidefinite and has the exact longitudinal null vector \(q\).

## 2. Physical support and pseudoinverse

The physical polarization space is

\[
q^\perp
=\{v:q\cdot v=0\}.
\]

On that three-dimensional Euclidean subspace,

\[
C=\rho,1_{q^\perp}.
\]

Its Moore--Penrose inverse is

\[
C^+
=\frac1\rho P^T
\]

for \(\rho>0\). The longitudinal component is projected out rather than assigned an arbitrary inverse.

## 3. Two conserved boundary probes

Let two real source profiles or detector channels couple through vectors \(b_1^\mu,b_2^\mu\). Assemble

\[
B=
\begin{pmatrix}
b_1^T\\b_2^T
\end{pmatrix}.
\]

Gauge/current conservation requires

\[
b_a\cdot q=0,
\qquad a=1,2.
\]

Equivalently,

\[
Bq=0.
\]

This is exactly the singular Peirce--Schur range condition

\[
B\ker C=0.
\]

The Ward identity and conserved-source condition therefore make the generalized recursion well defined without gauge fixing the longitudinal mode by hand.

## 4. Block response and reduction

Let \(A=A^T\) contain direct/contact response of the two channels. The combined quadratic kernel is

\[
\mathcal R
=
\begin{pmatrix}
A&B\\
B^T&C
\end{pmatrix}.
\]

Eliminating the current-polarization interior gives

\[
\boxed{
R_2
=A-BC^+B^T.
}
\]

If \(\mathcal R\ge0\), then

\[
R_2\in H_2(\mathbb R)_+.
\]

Thus a conserved-current spectral sector supplies an explicit tensor-valued route to the same two-face Jordan cone as the scalar boundary model.

## 5. Constructive positive completion

Conversely, choose any target

\[
S\in H_2(\mathbb R)_+
\]

and conserved coupling \(Bq=0\). Setting

\[
A=S+BC^+B^T
\]

gives

\[
\mathcal R\ge0
\]

with generalized Schur response exactly \(S\). This makes the existence result constructive.

It also exposes the predictivity limitation: Ward identities guarantee admissibility but do not select a unique \(S\), \(B\), or pair of probes.

## 6. Longitudinal coupling is inconsistent

If a purported physical probe has

\[
Bq\ne0,
\]

it couples to a zero-cost longitudinal direction. Then the block kernel cannot be positive semidefinite. Adding a regulator \(\varepsilon qq^T/q^2\) produces a Schur correction with a \(1/\varepsilon\) divergence.

This gives a practical diagnostic:

- transverse source: finite quotient response;
- longitudinal source: gauge-dependent divergence or negative quadratic direction.

## 7. Euclidean versus Lorentzian positivity

The raw Lorentz-covariant tensor

\[
\eta_{\mu\nu}-q_\mu q_\nu/q^2
\]

is not a positive Euclidean matrix because the spacetime metric is indefinite. Positivity belongs to:

- the Euclidean continuation;
- the physical polarization spectral density;
- reflection-positive smeared observables;
- or a retarded response with the appropriate passivity condition.

One must not infer a positive Jordan cone directly from the unprojected Lorentzian tensor.

## 8. Standard-Model scope

Electromagnetic, weak and color currents have transverse vacuum-polarization tensors after the relevant Ward or Slavnov--Taylor identities and gauge completion are included. For non-Abelian or broken currents, ghosts, Goldstone mixing and gauge fixing complicate the naive projector.

The present result applies directly to a gauge-invariant conserved current or to a physical transverse spectral block. Extending it to the full electroweak stress/current system requires treating operator mixing and contact terms.

## 9. Relation to \(Spin(2,3)\)

Once two physical channels and a positive real reciprocal kernel are fixed,

\[
R_2\in H_2(\mathbb R)_+
\]

has conformal group \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The Ward identity does not select that group by itself. It supplies the quotient that makes the two-port response legal. The two-channel choice and real reciprocity still require physical justification.

## 10. Stop-everything and falsification gates

**Standard-Model realization:** a specified pair of gauge-invariant current probes yields a calculable \(R_2\) with no arbitrary contact matrix beyond measured renormalization conditions.

**Ward selection:** conservation and locality uniquely determine the allowed two-channel coupling \(B\).

**Orientation test:** absorptive or CP-sensitive contributions generate a calibrated complex loop or prove a common real structure.

**Contact-term failure:** arbitrary local counterterms shift \(A\) and hence every entry of \(R_2\), leaving no invariant prediction.

**Gauge failure:** a claimed response depends on longitudinal regulator or gauge parameter, violating the range criterion.

## 11. Certificate

The [conserved-current Ward-quotient certificate](../../../verification/verify/verify_conserved_current_ward_h2_response.mjs) verifies transversality, the projector pseudoinverse, range compatibility, positive block completion, exact \(H_2\) Schur response and indefiniteness/regulator divergence for a longitudinally coupled probe.

## Companion documents

- [Singular-interior range gate](204_singular_interior_peirce_schur_quotient_and_range_gate.md)
- [Peirce--Schur triple recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [Standard Model as stress-energy](../0000-0099/01_standard_model_as_stress_energy_full_analysis.md)
- [Lorentzian passivity and causal response](../0000-0099/70_lorentzian_passivity_and_causal_response.md)
