# One Orientation Field, Independent Quark and Majorana CP Portals

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B11 and B13  
**Claim status:** exact symmetry/EFT classification; no ultraviolet mediator selected

## 1. The proposed common selector

Let \(\chi\) denote the external face-orientation coordinate. Assume it is

- a Lorentz scalar or pseudoscalar;
- a Standard-Model gauge singlet;
- odd under the external exchange/reciprocity involution.

The internal flavor theory supplies several basis-invariant CP-odd scalars. Two relevant examples are

\[
J_q=\operatorname{ImTr}[H_u,H_d]^3
\]

and

\[
J_M
=\operatorname{ImTr}
(H_e^*M H_eM^\dagger MM^\dagger).
\]

Both reverse sign under coefficient conjugation. Therefore

\[
\chi J_q,
\qquad
\chi J_M
\]

are even under the combined external/internal involution.

## 2. Lowest effective interaction

At energies where the Yukawa and Majorana matrices are fixed couplings rather than dynamical fields, \(J_q\) and \(J_M\) are numbers. The most general orientation potential begins

\[
V_{\rm eff}(\chi)
=\frac12m_\chi^2\chi^2
+\lambda_\chi\chi^4
+\chi\left(c_qJ_q+c_MJ_M+\cdots\right).
\]

The dots include every other CP-odd weak-basis invariant allowed by the same symmetries.

The linear term is an orientation tadpole. To leading order,

\[
\langle\chi\rangle
\simeq
-\frac{c_qJ_q+c_MJ_M+\cdots}{m_\chi^2}.
\]

This can correlate internal CP orientation with the external face, but it does not predict the correlation unless the coefficients are fixed.

## 3. The coefficients are independent in ordinary EFT

The quark and Majorana invariants are algebraically and physically independent:

- one may choose a CP-violating quark sector with a CP-conserving lepton sector, giving \(J_q\ne0\), \(J_M=0\);
- one may choose commuting real quark mass operators and a real two-flavor lepton mixing matrix with a Majorana phase, giving \(J_q=0\), \(J_M\ne0\).

No Standard-Model gauge symmetry transforms one invariant into the other. Both are singlets. Consequently ordinary EFT permits

\[
c_q\ne c_M
\]

and permits either coefficient to vanish independently at tree level.

Changing the signs of \(c_q,c_M\) can reverse or cancel the selected external orientation while leaving all measured flavor invariants unchanged. Combined parity alone therefore supplies permission, not selection.

## 4. Minimal mediator representation

At the infrared spurion level, no nontrivial Standard-Model representation is required. A real gauge-singlet pseudoscalar \(\chi\) is already sufficient.

This is simultaneously the minimal answer and the obstruction:

- gauge representation theory does not choose the portal;
- it does not distinguish quark from Majorana CP data;
- it does not fix a coefficient ratio;
- it does not connect the portal to \(Spin(2,3)\) rather than any other singlet extension.

Above electroweak symmetry breaking, \(M\) is replaced by the coefficient of the Weinberg operator or by a seesaw sector. If Yukawas and Majorana parameters remain nondynamical spurions, the same conclusion holds: they label allowed singlet counterterms but are not propagating mediator fields.

## 5. Dynamical-flavon version

If flavor spurions arise as vacuum expectation values of dynamical flavons, then \(J_q\) and \(J_M\) lift to high-degree local operators. Heavy mediator exchange can generate them, but many mediator choices are possible.

A unique ultraviolet origin would need to specify:

- a flavor group and representations;
- the fields whose vacuum values become \(Y_u,Y_d,Y_e,M\);
- one invariant tensor contracting quark, lepton and external sectors;
- the mediator masses and couplings;
- why lower-degree competing CP-odd invariants are absent;
- radiative closure of the claimed coefficient relation.

Neither the Standard Model nor the external \(H_2(\mathbb R)\) response supplies this information by itself.

## 6. Technical naturalness

If the combined involution acts as

\[
\chi\mapsto-\chi,
\qquad
J\mapsto-J,
\]

then \(\chi J\) is symmetry allowed. Setting its coefficient to zero is not protected by that combined symmetry.

It can nevertheless remain zero if the external and flavor sectors are exactly factorized or if an additional shift or separate \(\mathbb Z_2\) symmetry forbids the connector. Once any interaction communicates between the sectors, every allowed CP-odd singlet generally becomes a counterterm candidate.

Therefore “external reciprocity is exact” is insufficient. The theory must state whether reciprocity acts separately on \(\chi\), jointly with internal CP, or is spontaneously broken.

## 7. Three honest interpretations

### 7.1 Explicit orientation source

Treat measured flavor CP invariants as fixed sources. The sign of \(\chi\) is selected explicitly, with arbitrary Wilson coefficients.

### 7.2 Spontaneous common orientation

Promote flavor phases and \(\chi\) to dynamical order parameters in one potential. Opposite signs become conjugate vacua. Domain walls and vacuum selection must then be analyzed.

### 7.3 Factorized bookkeeping

Keep external reciprocity exact and store CP orientation entirely in the internal flavor/Fock factor. Then no \(\chi J\) portal is present and \(Spin(2,3)\) remains kinematic rather than a selector of CP sign.

All three are logically consistent. The present algebra does not choose among them.

## 8. Consequence for an exceptional or Jordan completion

The exceptional/integral branch now has a concrete burden:

> It must supply a single invariant tensor or action that relates the quark and Majorana CP sources to the external orientation with fixed relative normalization.

Simply placing all sectors in one large algebra is not enough. The action must prohibit the independent counterterms that ordinary EFT allows.

This is a useful selection test for any claimed Leech, Golay, \(E_8\), exceptional-Jordan or moonshine completion.

## 9. Stop-everything and falsification gates

**Common-action success:** one source-derived invariant fixes \(c_q/c_M\) and its sign while preserving gauge symmetry, chirality and external reciprocity.

**Radiative success:** the fixed relation is closed under renormalization and no independent counterterm is generated.

**Observable success:** the relation predicts a correlation between quark/lepton CP data and an external response observable.

**EFT arbitrariness:** independent allowed counterterms survive every proposed completion; then the common orientation field adds no predictive synthesis.

**Factorization result:** a protecting symmetry forbids all connectors, demoting flavor CP as a source of the external \(Spin(2,3)\) real form.

## 10. Certificate

The [independent CP-portal certificate](../../../verification/verify/verify_independent_cp_orientation_portals.mjs) constructs explicit \((J_q\ne0,J_M=0)\) and \((J_q=0,J_M\ne0)\) sectors, verifies sign reversal under conjugation and demonstrates independent control of the induced orientation tadpole.

## Companion documents

- [Low-degree polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
- [Exchange-paired Yukawas and CP orientation](164_exchange_paired_yukawas_and_cp_orientation_gate.md)
- [Jarlskog-sourced external counterterm gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
