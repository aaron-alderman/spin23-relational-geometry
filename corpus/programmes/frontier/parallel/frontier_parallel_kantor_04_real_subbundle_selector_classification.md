# Frontier Parallel 4c: Minimal Real-Subbundle Selector Classification

**Date:** 18 October 2026  
**Status:** exact representation-level classification with explicitly separated matter, Nambu, and response interpretations  
**Question:** can a physically motivated structure select the real two-plane on which the contact Kantor product survives?

## Result

There is one common gate.

Let (V) be a complex gauge representation and (J) an antiunitary involution. Its fixed space

\[
V^J=\{v:Jv=v\}
\]

is a gauge-covariant real subbundle exactly when

\[
\boxed{J\rho(g)=\rho(g)J\quad\text{for every gauge transformation }g.}
\]

If (V^J) is a real two-plane with an invariant Euclidean form, then

\[
V_K(x,y,z)=x\langle y,z\rangle
\]

is automatically gauge covariant, satisfies both Kantor identities, has (K\ne0), and generates the contact grading

\[
(1,2,4,2,1)
\]

of (mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(3,2)).

Applying this gate gives a clean hierarchy:

1. **Higgs breaking alone fails** to realify any still-charged matter line.
2. **Higgs dressing can neutralize/type a two-face response**, but it does not itself choose the antiunitary real structure.
3. **Nambu/CAR reality gives a canonical gauge-covariant real plane**, but only on the doubled module; no physical charged half preserves both gauge symmetry and CAR reality.
4. **A neutral Majorana two-face plane is conditionally viable**, but rank-two corner selection and real-slice selection remain independent.
5. **A local neutral boundary antiunitary is the cleanest completed effective selector**, although its microscopic Standard-Model derivation is still missing.
6. **A CP-odd spurion alone is not a real-structure selector**: a nonzero CP-odd background is not fixed by CP.

## 1. General fixed-real-form criterion

If (w\in V^J), then (ho(g)w) remains fixed precisely when

\[
J\rho(g)w=\rho(g)Jw=\rho(g)w.
\]

Thus commutation is sufficient. Since (V^J) spans (V) after complexification for a real structure, invariance of the whole fixed form also implies commutation.

This converts the selector question from analogy into a finite representation test. A candidate must provide:

- an involution (J^2=1), not merely a complex structure with square (-1);
- commutation with the surviving gauge action;
- a fixed space of real dimension two;
- preservation of the metric entering (V_K);
- a physical reason to regard the fixed space as observable rather than a gauge choice.

## 2. Higgs route

### 2.1 Undressed or still-charged matter

On a charged complex line,

\[
\rho_q(\theta)=e^{iq\theta},\qquad q\ne0,
\]

every candidate conjugation (J_\phi=e^{i\phi}K) obeys

\[
J_\phi\rho_q(\theta)=\rho_q(-\theta)J_\phi,
\]

not (J_\phi\rho_q=\rho_qJ_\phi). No real line is invariant under the continuous charge rotation.

The neutral Higgs vacuum does not remove the electric charge of a charged lepton. Electroweak breaking therefore does not rescue an entrywise-real charged matter slice. This reproduces the exact obstruction in [the charged real-slice theorem](../../../claims/0100-0199/117_charged_real_slice_u1_no_go.md).

### 2.2 Higgs-dressed response

Higgs dressing can instead produce two operators with matching gauge type, so their Hermitian (2\times2) response is gauge neutral and common gauge phases cancel. On that response space, componentwise conjugation has a fixed (mathbb R^2) face plane supporting (V_K).

But the Higgs map is linear, not antiunitary. It makes a real selector *admissible*; it does not choose one. The phase-alignment or antiunitary condition remains an independent gate, consistent with [the Higgs exchange result](../../../claims/0700-0799/713_the_higgs_yukawa_dressed_exchange_is_linear_not_an_antiunitary_and_does_not_select_clifford_response_parity.md).

**Verdict:** useful typing precursor, incomplete selector.

## 3. Nambu/CAR route

For a charged Nambu pair

\[
\mathcal N_q=V_q\oplus V_{-q},
\]

take

\[
\rho_N(\theta)=
\begin{pmatrix}e^{iq\theta}&0\\0&e^{-iq\theta}\end{pmatrix},
\qquad
J_N=\tau_xK.
\]

Then

\[
J_N^2=1,
\qquad
[J_N,\rho_N(\theta)]=0.
\]

The fixed space is

\[
\mathcal N_q^{J_N}=\{(z,\bar z):z\in\mathbb C\}\cong\mathbb R^2.
\]

Gauge transformations act on this fixed plane as ordinary rotations (R(q\theta)). Since (V_K) is (O(2))-equivariant, the contact product and its one-dimensional (K)-layer are preserved. The orientation generator commutes with the connected (SO(2)) gauge rotations.

This is the strongest algebraic selector in the list.

Its physical limitation is exact: no nontrivial projector onto one charged particle/hole half commutes with both (ho_N) and (J_N). Thus the construction is viable only if Nambu doubling is a self-dual CAR redundancy, not a prediction of mirror matter. This is precisely the boundary established in [the charged Nambu-half no-go](../../../claims/0600-0699/620_no_charged_nambu_half_preserves_both_gauge_symmetry_and_car_reality.md).

**Verdict:** algebraically complete; physically conditional on a redundancy interpretation and a map to the Furey paired carrier.

## 4. Majorana route

For neutral fields, the charge obstruction disappears. One conjugation-fixed coordinate per face gives a real two-plane, and (V_K) closes on it.

A Majorana or Takagi structure can reduce phase freedom and provide such a conjugation. However, the corpus already establishes that the dynamical Nambu carrier is generically (H_3(\mathbb C)), while the desired (H_2(\mathbb R)) is obtained only after two choices:

1. a rank-two Peirce corner;
2. a compatible real slice of that corner.

The Majorana mass can help with the second but does not automatically make the first, nor does it ensure that the selected support is the same lepton/Furey pair required by the contact product. See [the nested Majorana carrier theorem](../../../claims/0600-0699/683_spin23_is_the_real_rank_two_peirce_corner_inside_the_majorana_h3c_carrier.md).

**Verdict:** viable conditional selector; requires a common corner-and-reality derivation.

## 5. Boundary antiunitary route

Two gauge-neutral real response fields at an interface already form (mathbb R^2). Fourier reality supplies complex conjugation between sidebands, while a real orthogonal matching matrix supplies the face exchange. No charged matter field is restricted to real coefficients.

The contact product (V_K) is covariant under the orthogonal boundary matching. A determinant-(-1) interface reverses the (K)-orientation line, exactly as a pseudoscalar should, while preserving the product and quadratic flux.

This route therefore supplies all mathematical selector conditions at the effective-response level. [The local real-interface construction](../../../claims/0900-0999/908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md) proves variational consistency and flux conservation.

Its only major gap is provenance: the real neutral fields and matching condition have not been derived by integrating out a specified Standard-Model/Furey boundary sector.

**Verdict:** best completed effective selector; microscopic derivation open.

## 6. CP-breaking spurion route

On a neutral complex line, the real structures

\[
J_\phi=e^{i\phi}K
\]

form a circle. Their fixed axes are rotated by (phi/2). The metric treats them identically.

A nonzero CP-odd scalar (s) transforms as

\[
s\mapsto-s.
\]

It can orient a response kernel or distinguish two CP-related vacua, but it is not fixed by the antiunitary whose real form it is supposed to select. Hence a CP-odd spurion alone does not provide an invariant (J). It either explicitly breaks CP or labels a pair of spontaneously related backgrounds.

A charged pairing spurion can compensate (q\leftrightarrow-q), but a nonzero vacuum value then breaks the corresponding continuous (U(1)) to a discrete remnant. That is acceptable for a superconducting or Majorana channel, not for unbroken electromagnetism.

**Verdict:** orientation source, not a standalone real-form selector.

## 7. Minimal classification table

| candidate | gauge-covariant real (2)-plane | preserves contact (K) | level | decisive caveat |
|---|---:|---:|---|---|
| charged Higgs/fermion line | no | no | matter | continuous (U(1)) rotates the line |
| neutral Higgs-dressed response + separately chosen conjugation | yes | yes | response | Higgs does not select conjugation |
| charged Nambu (\operatorname{Fix}(\tau_xK)) | yes | yes | doubled matter/CAR | no invariant one-half projection |
| neutral Majorana two-face fixed plane | yes | yes | neutral matter/Nambu | corner and real slice are separate choices |
| local neutral boundary real fields | yes | yes | effective response | microscopic derivation absent |
| CP-odd spurion alone | no invariant fixed background | no | coupling/vacuum | orients but breaks the proposed CP involution |

## 8. Branch decision

The smallest fruitful route is no longer “make the complex lepton doublet real.” That is impossible without losing gauge covariance. The live routes are:

\[
\boxed{
\text{self-dual Nambu redundancy}
\quad\text{or}\quad
\text{neutral real boundary response},
}
\]

with neutral Majorana corner selection as a conditional bridge between them.

The boundary route is closest to an observable carrier. The Nambu route is closest to microscopic CAR structure. The next high-value calculation is an intertwiner between their two real planes that preserves the (K)-area form and identifies the same orientation reversal.

## 9. Falsifiers and promotion criteria

- **Nambu falsifier:** the required Furey support cannot be represented as a self-dual redundancy without additional physical mirror states.
- **Majorana falsifier:** the mass-selected Takagi real structure does not preserve the required rank-two Peirce support.
- **Boundary falsifier:** microscopic matching produces a nonorthogonal or complex interface that leaks flux or destroys (K).
- **Higgs promotion:** Higgs dressing plus renormalized dynamics proves one antiunitary phase axis for every spectral projector.
- **Stop-everything positive:** the CAR/Nambu fixed plane and neutral boundary real plane are connected by a unique gauge-covariant isometry carrying the local (K)-generator to the measured global orientation-odd witness.

## 10. Reproduction

```powershell
node verification/classify/classify_frontier_kantor_real_subbundle_selectors.mjs
```

The certificate checks the antiunitary commutators, fixed-space dimensions, charged-line obstruction, Nambu-half obstruction, all Kantor basis identities, rotation covariance, and reflection parity of the (K)-line.

