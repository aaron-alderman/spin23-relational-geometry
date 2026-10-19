# No exchange-odd portal exists in the endpoint-blind SM15, but the sterile Majorana pseudoscalar is the minimal conditional extension

> **Correction (document 1391):** the endpoint-blind SM15 no-go remains valid, but the claim below that \(i(NN-(NN)^\dagger)\) is odd under the natural antiunitary exchange is false because antiunitarity also sends \(i\mapsto-i\). Both Majorana quadratures are even under that operation. The pseudoscalar is odd only after an additional unitary particle--hole convention and phase reference are chosen. Document 1391 supersedes that parity claim.

**Date:** 20 October 2026  
**Branches:** root gate A5, Furey survivor exchange, boundary/defect selection, neutral completion and radiative stability  
**Claim status:** exact field-content no-go under a declared endpoint-blind locality contract; smallest extension identified, with its CAR and topology-locking conditions still open

## Result in one sentence

No local gauge- and Lorentz-compatible operator made only from the fifteen Standard Model Weyl fields, the Higgs, Standard Model gauge fields and endpoint-blind coefficients can be odd under (O_1\leftrightarrow R), because that exchange acts trivially after the two Furey embeddings are mapped to their physical Standard Model fields; the smallest field-based candidate is obtained by adjoining the unique sterile arrow (N\sim(\mathbf1,\mathbf1)_0) and using the dimension-three Majorana pseudoscalar

\[
B_-^{(N)}=i\!\left(NN-(NN)^\dagger\right),
\]

but it is a genuine portal only if the missing CAR real structure turns arrow reversal into conjugation and locks the neutral-arrow orientation to the charged TRO.

## 1. What “current field content” means

Document 1235 selected between two fifteen-state chiral TROs,

\[
T_A\longleftrightarrow T_B,
\]

under the neutral-endpoint exchange

\[
g:O_1\longleftrightarrow R.
\]

This audit first uses the strict field inventory

\[
Q,u^c,d^c,L,e^c,H,
\quad
G_\mu,W_\mu,B_\mu,
\]

with Standard Model invariant tensors, covariant derivatives and numerical coefficients that carry no (O_1/R) label. It does **not** silently include:

- a projector (P_{O_1}-P_R);
- a second mirror copy of the Standard Model fields;
- a sterile neutrino;
- an exchange-odd flavon or pseudoscalar;
- a coefficient whose sign is defined by the desired answer.

This scope is important. If (P_{O_1}-P_R) is admitted as a primitive observable, the missing portal has already been supplied under another name.

## 2. Exact no-go in the endpoint-blind local algebra

Let

\[
F:T_A,T_B\longrightarrow
\{Q,u^c,d^c,L,e^c\}
\]

forget the internal source and target labels while retaining every physical Standard Model representation. The previous anomaly and Yukawa audits established

\[
F(T_A)=F(T_B)
\]

field by field. More strongly,

\[
F\circ g=F.
\]

Let \(\mathcal A_{\rm loc}^{\rm phys}\) be any local polynomial algebra generated functorially from the physical fields, their derivatives, Standard Model invariant tensors, Lorentz contractions and endpoint-blind coefficients. Since (g) becomes the identity on every generator after (F), it becomes the identity on every product, sum, derivative and contraction:

\[
g\mathcal O g^{-1}=\mathcal O
\qquad
\text{for every }\mathcal O\in\mathcal A_{\rm loc}^{\rm phys}.
\]

Therefore no nonzero element satisfies

\[
gB_-g^{-1}=-B_-.
\]

This is an all-effective-dimensions statement, not merely a failed search through operators of dimension four. It depends on the endpoint-blind contract. It does not say that a larger algebra containing an endpoint observable has no odd element.

In everyday terms: repainting hidden shelf labels while leaving every book, page and reading rule unchanged cannot be detected by a sentence written only from the books.

## 3. Candidate audit

The all-orders theorem already decides the strict problem. The following low-dimensional audit shows how the familiar apparent escapes fail.

| Candidate | Effective dimension | Gauge/Lorentz status | Exchange status | Verdict |
|---|---:|---|---|---|
| bare holomorphic fermion bilinear | 3 bulk | none exists in SM15 | — | fails gauge invariance |
| (n_\mu\psi^\dagger\bar\sigma^\mu\psi) | 3 boundary | allowed | even | measures flux or occupation, not hidden endpoint orientation |
| endpoint-weighted boundary current | 3 boundary | allowed | odd | circular: requires (P_{O_1}-P_R) |
| kinetic difference | 4 bulk | allowed | even | identical after forgetting endpoint labels |
| Yukawa scalar or pseudoscalar | 4 bulk | allowed | even as a topology test | both survivors contain the same physical Yukawa channels |
| (F\widetilde F) / boundary Chern--Simons descent | 4 bulk / 3 boundary | conditionally allowed | even | gauge connections do not see the neutral-label exchange |
| gravitational Pontryagin / Chern--Simons | 4 bulk / 3 boundary | conditionally allowed | even | sees spacetime orientation, not (O_1/R) |
| anomaly inflow difference | topological | allowed if needed | zero | anomaly polynomials of the two survivors coincide |

### 3.1 Fermion bilinears

A holomorphic two-left-Weyl scalar has dimension three. Gauge invariance requires a singlet in the product of the two color representations, a singlet in the product of the two weak representations and zero total hypercharge. Exhausting the unordered pairs in

\[
Q,u^c,d^c,L,e^c
\]

gives no solution. In particular, (LL) has nonzero hypercharge and the apparently complementary quark pairs fail color, weak isospin or hypercharge.

Hermitian bilinears are currents. Contracting a current with a defect normal produces the valid boundary scalar

\[
n_\mu\psi^\dagger\bar\sigma^\mu\psi.
\]

It is nevertheless exchange-even, because (g) leaves the physical species \(\psi\) unchanged. Multiplying different species currents by endpoint charges can make a formally odd expression, but those charges are matrix elements of the missing projector (P_-=P_{O_1}-P_R). Moreover, a current expectation depends on the state or density; it is not automatically a constant eigenvalue that selects an empty-vacuum topology.

### 3.2 Yukawa and flavour pseudoscalars

Both survivors admit the same physical operators

\[
Qu^cH,
\qquad
Qd^cH^\dagger,
\qquad
Le^cH^\dagger.
\]

Their hidden block cycles differ only by (O_1\leftrightarrow R). Consequently their sums, differences of real and imaginary parts, and higher flavour contractions cannot detect the exchange without an endpoint-labelled coefficient.

The imaginary part of a single Yukawa coefficient is also not a rephasing-invariant CP witness. A three-family Jarlskog invariant is physical and can reverse under the paired conjugation used in document 1235, but it remains flavour data. It does not by itself act on the hidden endpoint label.

### 3.3 Chern--Simons, descent and anomaly inflow

Four-dimensional (F\widetilde F) and its three-dimensional Chern--Simons descent are sensitive to spacetime orientation. That is only one half of the required bridge. The exchange (O_1\leftrightarrow R) fixes the Standard Model gauge connections because both endpoints are gauge-neutral in the relevant carrier description. Gauge characteristic classes are therefore exchange-even.

The same objection applies to purely gravitational descent: it knows about the wall orientation but not which internal neutral block is called (O_1).

Anomaly inflow cannot supply the distinction. Each survivor has

\[
\bigl(
\mathcal A_{SU(3)^3},
\mathcal A_{SU(3)^2Y},
\mathcal A_{SU(2)^2Y},
\mathcal A_{{\rm grav}^2Y},
\mathcal A_{Y^3},
\nu_{SU(2)}
\bigr)
=(0,0,0,0,0,0).
\]

Hence the difference anomaly polynomial is zero. Inflow may cancel a real boundary anomaly; it cannot distinguish two anomaly-identical embeddings by declaration.

## 4. The smallest field-based escape

The unique canonical ternary-compatible extension of either survivor is the neutral arrow

\[
N\equiv\nu^c:D\longrightarrow E,
\qquad
N\sim(\mathbf1,\mathbf1)_0.
\]

It adds one left-handed sterile Weyl field of engineering dimension (3/2). Repeating the bilinear classification after adding (N) produces exactly one bare holomorphic gauge singlet:

\[
NN.
\]

If the exchange/CAR operation sends

\[
NN\longleftrightarrow(NN)^\dagger,
\]

then

\[
\boxed{
B_-^{(N)}=i\!\left(NN-(NN)^\dagger\right)
}
\]

is a Hermitian, gauge-singlet, proper-Lorentz scalar of dimension three and is odd under the exchange. On a codimension-one boundary its proposed coupling is

\[
S_{\rm portal}^{(N)}
=\lambda_N\int_{\partial M}d^3x\;
\chi\,B_-^{(N)}.
\]

With the four-dimensional Weyl field restricted to the boundary, (B_-^{(N)}) has boundary engineering dimension three, so \(\lambda_N\) is dimensionless. Both \(\chi\) and (B_-^{(N)}) reverse under the paired transformation, making their product even.

This is smaller and more source-compatible than adding a complete mirror generation. It also uses the exact neutral arrow already selected by ternary closure rather than an arbitrary singlet location.

## 5. Why this remains conditional

The operator closes the representation-theory gap but not the physical derivation. Four additional statements must hold:

1. the arrow (D\to E) must inherit Weyl spin, Grassmann parity and a local kinetic term;
2. the reverse arrow must be the CAR adjoint/charge-conjugate presentation of the same field, not a second independent sterile Weyl field;
3. reversing the neutral arrow must implement the same (O_1\leftrightarrow R) operation that exchanges the charged TROs;
4. the boundary coefficient must be derived from the defect history or flux rather than fitted with the desired sign.

If condition 2 fails, the same block expression is a sterile-Dirac pair. If condition 3 fails, the operator orients only the neutral sector and does not select the charged generation topology. Either failure leaves A5 open.

A standalone real pseudoscalar (a\sim(\mathbf1,\mathbf1)_0) with (a\mapsto-a) is algebraically smaller in component count, but it is not a better solution: the term \(\chi a\) aligns two external signs while a further (a\)-to-endpoint coupling is still required. It moves rather than closes the missing bridge.

## 6. Symmetry table

| Object | (G_{\rm SM}) | Proper Lorentz | (O_1\leftrightarrow R) | Boundary reversal | Role |
|---|---|---|---|---|---|
| \(\chi=\operatorname{sgn}(n\cdot j)\) | singlet | boundary scalar | unchanged unless paired | odd | physical orientation input |
| endpoint-blind SM operator | singlet when contracted | scalar | even | operator-dependent | cannot be (B_-) |
| (P_{O_1}-P_R) | singlet | scalar | odd | even | formal solution but missing primitive datum |
| (NN+(NN)^\dagger) | singlet | scalar | even under CAR exchange | even | ordinary Majorana scalar |
| (i(NN-(NN)^\dagger)) | singlet | scalar / parity-odd | odd under CAR exchange | even alone | minimal conditional (B_-) |
| \(\chi B_-^{(N)}\) | singlet | boundary scalar | even under paired action | even under paired action | admissible portal density |

“Parity-odd” in the table concerns an improper spacetime transformation. Proper Lorentz invariance is intact. The internal exchange and spacetime reflection must not be conflated; the proposed portal correlates them.

## 7. Radiative stability

Gauge invariance alone does not protect the odd alignment. Once \(\chi\) is fixed, both

\[
NN+(NN)^\dagger
\quad\text{and}\quad
i\!\left(NN-(NN)^\dagger\right)
\]

are gauge-allowed. Neutrino Yukawa interactions can renormalize the complex Majorana coefficient.

The portal is technically organized only if the regulator, boundary condition and full action preserve the combined spurionic symmetry

\[
\chi\mapsto-\chi,
\qquad
NN\mapsto(NN)^\dagger.
\]

Then counterterms occur in covariant pairs, although their magnitudes remain unpredicted. Without that exact combined symmetry, setting an unwanted even mass or a misaligned phase to zero is not radiatively stable.

The decisive loop audit is therefore concrete: include (LNH), compute mixing of the even and odd sterile mass operators in the boundary effective action, and check whether the claimed exchange is respected by the regulator and boundary conditions.

## 8. Falsifiers and next calculation

The candidate is falsified if:

1. the (D\to E) block cannot acquire the sterile Weyl Lorentz/CAR structure;
2. the reverse arrow is independently quantized, producing an extra sterile species;
3. boundary reversal fails to reverse the Majorana pseudoscalar response;
4. the neutral orientation does not determine which charged TRO is realized;
5. allowed counterterms destroy the combined exchange with no protecting exact symmetry;
6. a genuinely endpoint-blind SM15 correlator distinguishes (O_1) from (R), contradicting the forgetful-map theorem.

The next calculation should not be another operator survey. It is the explicit second-quantized neutral boundary action on the sixteen-state TRO, including its CAR involution, (LNH) coupling and one-loop counterterm symmetry. That calculation decides whether (B_-^{(N)}) is a physical latch or merely another well-typed spurion.

## 9. Certificate and evidence

The [machine-readable audit](../../../evidence/data/a5-exchange-odd-portal-audit.json) records the scope, theorem, candidate classes, effective dimensions, minimal extension, radiative-stability conditions and falsifiers.

The [executable verifier](../../../verification/verify/verify_a5_exchange_odd_portal_audit.mjs):

- exhausts all unordered SM15 holomorphic fermion pairs and finds no gauge singlet;
- adds (N\sim(\mathbf1,\mathbf1)_0) and finds exactly (NN);
- verifies that the two survivors have identical endpoint-forgotten physical signatures;
- recomputes the vanishing anomaly vector and its zero difference;
- checks the candidate-class parity ledger and operator dimensions;
- requires the CAR condition to remain explicit rather than silently assumed.

Companion results:

- [An oriented-boundary effective selector](1235_an_oriented_boundary_can_select_one_anomaly_free_furey_tro_and_retain_cp_only_if_an_exchange_odd_portal_exists.md)
- [Unique right-handed-neutrino TRO completion](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Exchange-paired neutrino cycle and Majorana gate](../0100-0199/170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Unique gauge-invariant holomorphic pairing](../0100-0199/197_unique_gauge_invariant_holomorphic_pairing_on_completed_matter.md)
- [Neutral Fock action and response separation](../0100-0199/171_neutral_fock_action_and_positive_response_separation.md)
