# Exchange-Paired Yukawas Preserve Local CP Phase but Cancel Unoriented CP-Odd Observables

**Date:** 17 October 2026  
**Branches:** B03, B06, B11 and B13  
**Claim status:** exact three-family matrix result; physical interpretation remains a polarization gate

## 1. The question

The exchange antiunitary pairs coefficients on the two surviving Furey carriers as

\[
(Y_u,Y_d)_B=(\overline{Y_u},\overline{Y_d})_A.
\]

This does not make either Yukawa matrix real. But the relevant test is basis-invariant CP violation, not whether individual entries are complex.

Define

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger,
\]

and the CP-odd Jarlskog polynomial

\[
\mathcal J_{\det}
=\operatorname{Im}\det[H_u,H_d].
\]

For three nondegenerate families, nonzero \(\mathcal J_{\det}\) is equivalent to a nonzero CKM-type Jarlskog invariant times the products of up- and down-sector mass-squared differences.

## 2. Conjugate exchange reverses the CP orientation

Under coefficient conjugation,

\[
H_u\mapsto\overline{H_u},
\qquad
H_d\mapsto\overline{H_d},
\]

so

\[
[H_u,H_d]\mapsto\overline{[H_u,H_d]}.
\]

It follows immediately that

\[
\boxed{
\mathcal J_{\det,B}=-\mathcal J_{\det,A}.
}
\]

Thus the exchange has two simultaneous properties:

1. it permits \(\mathcal J_{\det,A}\ne0\), so complex flavor information survives in each oriented sector;
2. an equal, unoriented sum over the exchange pair has zero CP-odd invariant.

## 3. Exact nonzero example

Choose

\[
H_u=\operatorname{diag}(1,4,16)
\]

and

\[
H_d=
\begin{pmatrix}
3&1&-i\\
1&3&1\\
i&1&3
\end{pmatrix}.
\]

The leading principal minors of \(H_d\) are

\[
3,\qquad8,\qquad18,
\]

so \(H_d\) is positive definite and can be written as \(Y_dY_d^\dagger\). Direct calculation gives

\[
\det[H_u,H_d]=1080i,
\qquad
\mathcal J_{\det,A}=1080.
\]

For the exchanged sector,

\[
\det[\overline{H_u},\overline{H_d}]=-1080i,
\qquad
\mathcal J_{\det,B}=-1080.
\]

Therefore

\[
\mathcal J_{\det,A}+\mathcal J_{\det,B}=0,
\qquad
\mathcal J_{\det,A}-\mathcal J_{\det,B}=2160.
\]

The first combination is exchange even and loses orientation. The second is exchange odd and records which complex orientation was chosen.

## 4. Three possible physical readings

### 4.1 Particle/antiparticle real structure

If sector \(B\) is not an independent mirror generation but the conjugate presentation required by Hermiticity or the CAR real structure, the sign reversal is ordinary conjugate bookkeeping. One oriented particle polarization can exhibit nonzero CKM CP violation without doubling the physical generation.

This is viable only after constructing the Fock algebra and showing that \(B\) supplies adjoints, not independent same-chirality particles.

### 4.2 Exact physical exchange symmetry

If \(A\) and \(B\) are independent equally weighted physical sectors and the exchange is unbroken, every exchange-even CP-odd observable cancels. This is incompatible with treating the observed CKM invariant as an unoriented trace over the full pair.

The theory would then require an observable that is explicitly odd under the neutral orientation, or it would predict vanishing visible CP violation.

### 4.3 Spontaneously selected orientation

If the completed carrier has the exchange symmetry but the vacuum or boundary data chooses \(A\) or \(B\), nonzero CP violation survives with opposite sign in the two vacua. The Jarlskog sign becomes an orientation order parameter.

This is attractive but costly: it requires a potential or boundary law, a domain-wall analysis and a demonstration that the selected sign correlates with the external \(\sigma_y\) orientation rather than being arbitrary.

## 5. Connection to the external response carrier

The orientation-complete external response contains an antisymmetric Hermitian component proportional to \(\sigma_y\). Entrywise conjugation reverses that component. The flavor result has the same parity:

\[
\kappa_{\rm external}:\sigma_y\mapsto-\sigma_y,
\qquad
\Theta_{\rm flavor}:\mathcal J_{\det}\mapsto-\mathcal J_{\det}.
\]

This permits the lowest exchange-even bridge

\[
\boxed{
\mathcal O_{\rm bridge}
=\chi_{\rm orient}\,\mathcal J_{\det},
}
\]

where \(\chi_{\rm orient}\) is an external pseudoscalar or oriented response coefficient that also changes sign. The product is invariant even though each factor is odd.

This is a structural permission, not a derived coupling. Its normalization, locality and radiative stability remain open.

## 6. Decision tree

- If the exchange-fixed CAR construction identifies \(B\) with adjoints, continue with one physical CP-violating generation triplet.
- If \(A\) and \(B\) are independent sectors, an orientation selector is mandatory.
- If no gauge- and Lorentz-compatible selector exists, the exchange antiunitary must be discarded as a physical symmetry and retained only as a bookkeeping equivalence.
- If the same selector fixes external reciprocity, the neutral label and the sign of flavor CP, this becomes a high-value unification result.

## 7. Stop-everything and falsification gates

**Stop-everything positive:** derive a single antiunitary/Fock construction in which the conjugate TRO is exactly the adjoint sector, the independent CAR count remains one chiral three-family theory, and \(\chi_{\rm orient}\mathcal J_{\det}\) arises from the same causal boundary action that selects \(H_2(\mathbb R)\).

**CP success:** obtain the observed nonzero Jarlskog sign in one selected orientation without inserting a hand-chosen complex phase.

**Cancellation failure:** if all physical observables necessarily trace equally over \(A\oplus B\), then the exchange predicts zero visible CP-odd invariant and is phenomenologically untenable.

**Mirror failure:** if \(B\) quantizes independently with the same chirality, the construction doubles the flavor spectrum rather than supplying a real structure.

## 8. Certificate

The [exchange-paired CP certificate](scripts/verify_exchange_paired_yukawa_cp.mjs) verifies positivity of the explicit mass matrices, computes the nonzero commutator determinant exactly over Gaussian integers, checks sign reversal under conjugation and proves cancellation/survival of the even/odd combinations.

## Companion documents

- [Furey real-form obstruction and complex-carrier escape](163_furey_real_form_obstruction_and_complex_carrier_escape.md)
- [Real two-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Jarlskog-sourced sigma-y counterterm gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)

