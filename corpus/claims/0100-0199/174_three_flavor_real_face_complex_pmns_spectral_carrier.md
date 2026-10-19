# Three-Flavor Spectral Carrier: Real Faces, Complex PMNS Data, No Naive Factorization

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact free three-flavor construction; interacting spectral factorization remains open

## 1. The correct combined carrier

For three neutrino mass eigenstates, let

\[
u_i=(U_{ei},U_{\mu i},U_{\tau i})^T
\]

be the columns of the PMNS matrix and let

\[
\rho_i=u_i u_i^\dagger
\]

be their rank-one flavor projectors. For each mass \(m_i\), the fixed-helicity two-face residue is

\[
P_i(k)
=\frac12\left(I+\frac{k\sigma_z+m_i\sigma_x}{\sqrt{k^2+m_i^2}}\right)
\in H_2(\mathbb R)_+.
\]

The full positive spectral carrier is

\[
\boxed{
\mathcal R(k)=\sum_{i=1}^3 P_i(k)\otimes\rho_i.
}
\]

It acts on

\[
\mathbb R^2_{\rm face}\otimes\mathbb C^3_{\rm flavor}
\]

after complexifying the total Hilbert space in the usual way.

## 2. Positivity

Each term is a tensor product of positive rank-one operators. Writing

\[
P_i=f_if_i^T,
\qquad
\rho_i=u_i u_i^\dagger,
\]

gives

\[
\mathcal R
=\sum_i(f_i\otimes u_i)(f_i\otimes u_i)^\dagger\ge0.
\]

Thus complex flavor phases do not endanger positivity of the real face response.

## 3. Real face structure survives exactly

Every \(P_i\) is real symmetric. Therefore the two off-diagonal face blocks of \(\mathcal R\) are equal as complex flavor matrices:

\[
\mathcal R_{12}=\mathcal R_{21}.
\]

There is no \(\sigma_y\) component in face space at the free spectral level, even when the PMNS matrix has a nonzero Dirac phase.

The correct statement is therefore

\[
\boxed{
\text{real reciprocal face factor}
\quad\text{coexists with}\quad
\text{complex flavor matrices}.
}
\]

Reality is factor-local; it must not be imposed entrywise on the flavor algebra.

## 4. Why simple tensor factorization fails

In general there do not exist fixed matrices \(P\) and \(\rho\) such that

\[
\mathcal R=P\otimes\rho.
\]

Expanding in the real Pauli basis gives

\[
\mathcal R
=I\otimes A_0
+\sigma_x\otimes A_x
+\sigma_z\otimes A_z,
\]

where

\[
A_x=\sum_i\frac{m_i}{2\omega_i}\rho_i,
\qquad
A_z=\sum_i\frac{k}{2\omega_i}\rho_i.
\]

For three distinct masses at nonzero momentum, the coefficient triples

\[
\left(1,\frac{m_i}{\omega_i},\frac{k}{\omega_i}\right)
\]

are generically linearly independent. The operator Schmidt rank is then three, not one.

The face and flavor sectors are correlated without being algebraically fused. This is more informative than a direct tensor-product ansatz.

## 5. Dirac CP remains in flavor space

The flavor projectors \(\rho_i\) contain the Dirac phase through off-diagonal entries. The basis-invariant Jarlskog quantity

\[
J_{\rm PMNS}
=\operatorname{Im}
(U_{e1}U_{\mu2}\overline{U}_{e2}\overline{U}_{\mu1})
\]

can be nonzero while every face matrix remains real.

Leptonic CP violation therefore does not require a face-space \(\sigma_y\) component at tree-level. It appears through interference among complex flavor amplitudes and propagation phases.

## 6. Majorana phases cancel from ordinary residues

Multiplying a PMNS column by a Majorana phase,

\[
u_i\mapsto e^{i\alpha_i/2}u_i,
\]

leaves

\[
\rho_i=u_i u_i^\dagger
\]

unchanged. Hence ordinary lepton-number-conserving spectral residues and oscillation probabilities are insensitive to Majorana phases.

The phases survive in anomalous lepton-number-violating tensors such as

\[
\mathcal M_{\alpha\beta}
=\sum_i m_i U_{\alpha i}U_{\beta i}.
\]

Therefore a Majorana phase cannot source the face \(\sigma_y\) coordinate through the free ordinary spectral density. Any such bridge must use an anomalous correlator, interaction or CP-odd composite.

## 7. Consequences for the antiunitary selector

The external reciprocity operation should act as

\[
\kappa_{\rm face}\otimes 1_{\rm flavor},
\]

not as entrywise conjugation of the full face-flavor operator. Conjugating the flavor factor would map the theory to its CP-conjugate and would not be a harmless real-slice projection.

This confirms and sharpens the factor-local rule previously inferred from the Jarlskog branch.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** an interacting Källén--Lehmann measure retains the separable positive form \(\sum_a P_a^{\rm face}\otimes\rho_a^{\rm flavor}\), and a basis-independent symplectic invariant of that measure predicts a PMNS or neutrino-mass observable.

**CP success:** external reciprocity fixes only the face factor while the full Dirac Jarlskog invariant remains nonzero in flavor space.

**Majorana bridge:** a lepton-number-violating anomalous correlator produces an orientation-odd face response with coefficient fixed by the Majorana mass tensor.

**Factorization failure:** interactions generate irreducible face \(\sigma_y\) terms entangled with flavor in a way no factor-local real structure preserves.

**Predictivity failure:** the construction accommodates arbitrary masses and PMNS parameters without imposing any new invariant relation.

## 9. Certificate

The [three-flavor face/flavor certificate](../../../verification/verify/verify_three_flavor_real_face_complex_pmns.mjs) constructs a unitary PMNS matrix with nonzero Dirac and Majorana phases, verifies positivity of the full six-dimensional Gram operator, exact face reciprocity, operator-Schmidt rank three, nonzero Jarlskog invariant, cancellation of Majorana phases from ordinary residues and their survival in the anomalous mass tensor.

## Companion documents

- [Seesaw spectral mixture](172_seesaw_spectral_mixture_enters_h2r_interior.md)
- [Real carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Jarlskog-sourced orientation gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)

