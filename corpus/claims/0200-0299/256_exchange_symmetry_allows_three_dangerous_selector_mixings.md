# Exchange Symmetry Allows Three Dangerous Selector Mixings

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact linear response-mode classification and Schur correction; full gauge-singlet matter-operator inventory and radiative coefficients remain open

## 1. Selector mode decomposition

The paired Peirce response has eight real coordinates. Under the exchange antiunitary

\[
\Theta(X_A,X_B)=(\bar X_B,\bar X_A),
\]

they split into two four-dimensional parity sectors.

The \(\Theta=+1\) sector contains:

- three real diagonal modes, which form the desired \(H_2(\mathbb R)\) kernel;
- one imaginary anti-diagonal heavy mode.

The \(\Theta=-1\) sector contains:

- three real anti-diagonal heavy modes;
- one imaginary diagonal heavy mode.

## 2. Exchange symmetry is insufficient

A real symmetric response counterterm commuting with \(\Theta\) is block diagonal only between the two parity sectors. Inside the even sector it may mix the three light modes with the one heavy mode.

Therefore exchange symmetry permits

\[
\boxed{3\times1=3}
\]

independent light-to-heavy response mixings.

For any gauge-singlet Hermitian matter operator \(F\), terms of the form

\[
R_a\otimes F,
\qquad a=1,2,3,
\]

can be gauge and exchange invariant while violating exact selector-kernel invariance.

## 3. Independent response conjugation forbids them

Let

\[
\mathcal K(X_A,X_B)=(\bar X_A,\bar X_B)
\]

act without swapping the survivors. The three real light modes are \(\mathcal K\)-even, while the heavy imaginary anti-diagonal mode is \(\mathcal K\)-odd.

Every dangerous mixing is odd under \(\mathcal K\). Hence

\[
\boxed{
\Theta\ \text{alone: insufficient},
\qquad
\Theta+\mathcal K:\ \text{kernel protected at linear order}.}
\]

Because \(\mathcal K\) is restricted to the neutral response factor, it need not conjugate complex flavor matrices.

## 4. Schur effect when the protection is absent

Let \(v\in\mathbb R^3\) couple the light coordinates to one heavy mode of gap \(M_h\). Eliminating it gives

\[
\Sigma(z)
=\frac{vv^T}{M_h-z}.
\]

For real \(v\), this is a real symmetric rank-one correction on the \(H_2(\mathbb R)\) coordinate space. Thus the Schur-reduced response remains real, but:

- one direction is selected;
- determinant/cone symmetries may be distorted;
- the correction becomes resonant near \(M_h\);
- arbitrary matter-dependent \(v\) reintroduces uncontrolled portal parameters.

Exact kernel invariance is stronger than merely obtaining a real Schur correction.

## 5. Counting exchange-symmetric operators

The real symmetric operator space on each four-dimensional parity sector has dimension ten. Exchange-even symmetric response operators therefore have dimension

\[
10+10=20.
\]

Requiring the three-dimensional light subspace to be invariant removes exactly the three light/heavy-even entries, leaving dimension

\[
17.
\]

The protection problem is consequently small and explicit rather than an unrestricted counterterm problem.

## 6. Gauge-singlet matter factors

Gauge invariance does not by itself remove the three directions. Matter number operators, Higgs norms, stress scalars and flavor-singlet Hermitian combinations can all multiply a neutral response counterterm.

The next source-level question is whether Furey's Peirce/linking structure supplies \(\mathcal K\) as an exact response parity or otherwise forbids the three coefficients.

## 7. Stop-everything and falsification gates

**Protection trigger:** a source-derived response conjugation or grading eliminates all three exchange-allowed mixings.

**Predictive trigger:** one controlled nonzero mixing survives and produces a fixed rank-one correction to the relational response.

**Resonance trigger:** a required Standard-Model operator drives \(M_h-z\) small, forcing the heavy imaginary face back into the carrier.

**Falsifier:** exchange symmetry alone is claimed to protect \(H_2(\mathbb R)\), or a real Schur correction is mistaken for exact preservation of the Jordan determinant/conformal action.

## 8. Certificate

The [selector mixed-counterterm certificate](../../../verification/verify/verify_selector_mixed_counterterm_classification.mjs) constructs the exchange and conjugation actions, exhibits an explicit three-parameter dangerous coupling, verifies exchange invariance and conjugation oddness, and computes its real rank-one Schur self-energy.

## Companion documents

- [Factor-local selector/Yukawa commutant](255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
- [Positive Peirce selector locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Exchange restriction and diagonal gluing](252_survivor_exchange_pairs_neutrino_corners_but_needs_diagonal_gluing_for_h2r.md)
- [Inhomogeneous-Higgs Schur control](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
