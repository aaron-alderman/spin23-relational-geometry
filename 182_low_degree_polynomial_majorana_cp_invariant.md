# A Low-Degree Polynomial Majorana-CP Invariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B06 and B11  
**Claim status:** exact weak-basis invariant and degree result within a specified trace family; no derived external portal coefficient

## 1. Why clear the projectors

The pair-resolved invariant

\[
Q_{\alpha\beta}
=\operatorname{Tr}
(P_\alpha^*MP_\alpha M^\dagger
P_\beta^*MP_\beta M^\dagger)
\]

is weak-basis invariant, but its normalized spectral projectors contain inverse charged-lepton eigenvalue differences.

There are two distinct ways forward:

1. clear the denominators while retaining the pair labels;
2. give up pair resolution and seek a lower-degree polynomial trace with no eigenvalues or inverse discriminants.

Both can be done, but they have different costs.

## 2. Pair-resolved polynomial numerator

Define the unnormalized spectral polynomial

\[
\Pi_\alpha
=\prod_{\gamma\ne\alpha}
(H_e-\lambda_\gamma I),
\]

and

\[
\Delta_\alpha
=\prod_{\gamma\ne\alpha}
(\lambda_\alpha-\lambda_\gamma).
\]

Then \(P_\alpha=\Pi_\alpha/\Delta_\alpha\), and

\[
N_{\alpha\beta}
=\operatorname{Tr}
(\Pi_\alpha^*M\Pi_\alpha M^\dagger
\Pi_\beta^*M\Pi_\beta M^\dagger)
\]

satisfies

\[
N_{\alpha\beta}
=\Delta_\alpha^2\Delta_\beta^2Q_{\alpha\beta}.
\]

For three flavors, each \(\Pi\) is quadratic in \(H_e\). The numerator therefore has degree eight in \(H_e\) and degree four in \(M,M^\dagger\). Counting \(H_e=Y_eY_e^\dagger\), it contains sixteen charged-lepton Yukawa factors and four Majorana spurion factors.

Pair resolution is algebraically expensive.

## 3. A lower-degree flavor-summed invariant

Consider instead

\[
\boxed{
J_M
=\operatorname{ImTr}
\left(
H_e^*M H_eM^\dagger M M^\dagger
\right).
}
\]

Under

\[
H_e\mapsto W^\dagger H_eW,
\qquad
M\mapsto W^TMW,
\]

the complete matrix product transforms by

\[
X\mapsto W^TXW^*.
\]

Therefore \(\operatorname{Tr}X\), and hence \(J_M\), is weak-basis invariant.

No spectral eigenvalues, projectors or denominators appear.

## 4. Degree and minimality within the closed four-M family

Consider the family

\[
J_{pqrs}
=\operatorname{ImTr}\left[
(H_e^*)^pM H_e^qM^\dagger
(H_e^*)^rM H_e^sM^\dagger
\right].
\]

For total charged-lepton degree

\[
p+q+r+s=0,
\]

the trace is \(\operatorname{Tr}(MM^\dagger)^2\), which is real.

At total degree one, cyclicity reduces every placement to the trace of a product of Hermitian matrices, again real.

At degree two, four cyclic/conjugate placements become nonzero and differ only by sign. One representative is \(J_M=J_{1100}\).

Thus:

\[
\boxed{
\text{degree two in }H_e
\text{ is minimal within this four-}M\text{ trace family.}
}
\]

This is not a theorem about every imaginable invariant construction.

Counting fundamental spurions, \(J_M\) contains:

- two \(H_e\) factors, hence four \(Y_e,Y_e^\dagger\) factors;
- two \(M\) and two \(M^\dagger\) factors.

It is much lower degree than the pair-resolved numerator.

## 5. Explicit Majorana-phase sensitivity

Take a real mixing matrix \(R\) in a two-flavor subspace and

\[
M(\alpha)
=R\,\operatorname{diag}
(m_1,m_2e^{-i\alpha},m_3)R^T.
\]

There is no Dirac-type CP phase in a two-flavor real rotation. Nevertheless, for nondegenerate \(H_e\),

\[
J_M(0)=0,
\]

while generic \(\alpha\ne0,\pi\) gives

\[
J_M(\alpha)\ne0.
\]

The invariant therefore detects lepton-number-violating Majorana phase information, not merely the ordinary Dirac Jarlskog sector.

It can also receive contributions from more general three-flavor CP structure; it is not a projector isolating one physical phase.

## 6. What was gained and lost

Compared with \(Q_{\alpha\beta}\), the polynomial \(J_M\):

**gains**

- no inverse mass differences;
- no spectral labels;
- lower spurion degree;
- manifest polynomial weak-basis covariance;

**loses**

- separate \(e\mu\), \(e\tau\), \(\mu\tau\) resolution;
- a direct one-to-one reading as a single charged-frame quartet;
- protection against cancellations among flavor contributions.

The two invariants answer different questions.

## 7. External orientation portal

If \(\chi_{\rm ext}\) is odd under external face exchange and \(J_M\) is odd under the corresponding internal CP conjugation, then

\[
\chi_{\rm ext}J_M
\]

is even under the combined operation.

At low energy, where Yukawa and Majorana matrices are background couplings, \(J_M\) is a number. A term \(\chi_{\rm ext}J_M\) is then an orientation-selecting source or tadpole, not a prediction. Its coefficient and mass dimension must be supplied by the external sector.

If the spurions arise from dynamical flavons or mediator fields, the same expression represents a high-dimension interaction. The programme still needs to derive:

- the mediator content;
- the suppression scale;
- why the coefficient is nonzero and has a selected sign;
- why external reciprocity is not radiatively destroyed.

## 8. Stop-everything and falsification gates

**Selector success:** the Jordan/Furey antiunitary fixes both the parity of \(\chi_{\rm ext}\) and the unique polynomial invariant coupled to it.

**Mediator success:** integrating out a selected field produces \(\chi_{\rm ext}J_M\) with a calculable coefficient.

**Predictive correlation:** the sign or magnitude of an external orientation observable is related to a measurable Majorana-phase combination.

**Arbitrariness failure:** every CP-odd flavor polynomial can couple with an unrelated coefficient, leaving the portal unconstrained.

**Reciprocity failure:** the coupling necessarily restores the external complex \(H_2(\mathbb C)\) carrier instead of selecting a stable real face.

## 9. Certificate

The [polynomial Majorana-invariant certificate](scripts/verify_polynomial_majorana_cp_invariant.mjs) verifies weak-basis invariance, vanishing of the degree-zero and degree-one family, nonzero degree-two representatives, CP sign reversal and explicit sensitivity to a Majorana phase with real two-flavor mixing.

## Companion documents

- [Weak-basis Majorana projector invariant](181_weak_basis_majorana_invariant_from_charged_lepton_projectors.md)
- [Majorana Nambu orientation gate](175_majorana_nambu_sigma_y_is_not_a_basis_invariant_orientation.md)
- [Three-flavor real-face/complex-PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Jarlskog-sourced external counterterm gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
