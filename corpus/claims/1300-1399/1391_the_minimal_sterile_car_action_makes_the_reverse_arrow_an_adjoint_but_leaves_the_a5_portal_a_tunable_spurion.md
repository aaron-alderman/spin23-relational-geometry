# The minimal sterile CAR action makes the reverse arrow an adjoint but leaves the A5 portal a tunable spurion

**Date:** 20 October 2026  
**Branches:** root gate A5, Furey neutral completion, second quantization, boundary counterterms and radiative stability  
**Claim status:** explicit minimal CAR action and complete power-counting audit of its neutral boundary counterterms; the proposed portal is admissible only after an extra unitary exchange and phase choice and is not derived by CAR reality

## Result in one sentence

One sterile Weyl field gives a consistent second-quantized realization in which the reverse (R\leftrightarrow O_1) arrow is the adjoint of one CAR generator rather than an independent species, but the antiunitary CAR real involution does **not** make (i(NN-(NN)^\dagger)) exchange-odd because it also conjugates (i); a chosen unitary particle--hole exchange does make that operator odd and its coefficient is multiplicatively stable at one loop, so the current construction is a technically stable tunable spurion, not a source-derived physical latch.

## 1. The minimal field theory

Work on a four-dimensional spacetime with an oriented codimension-one defect \(\partial M\). Let

\[
\chi=\operatorname{sgn}(n_\mu j^\mu)\in\{+1,-1\}
\]

be the measured orientation datum. Add one left-handed sterile Weyl field

\[
N\sim(\mathbf1,\mathbf1)_0
\]

to the selected fifteen-state chiral generation. In all-left notation the minimal bulk action contains

\[
\begin{aligned}
S_{\rm bulk}=\int_M d^4x\;\bigg[
&iN^\dagger\bar\sigma^\mu\partial_\mu N
+iL_i^\dagger\bar\sigma^\mu D_\mu L_i
+(D_\mu H)^\dagger D^\mu H\\
&-\left(Y_{\nu i}\,\epsilon_{ab}L_i^aH^bN
+\frac12 M_{\rm bulk}NN+\text{h.c.}\right)
+\cdots\bigg].
\end{aligned}
\]

The ellipsis contains the ordinary Standard Model action. The boundary Majorana coefficient can be written

\[
M_\chi=m_{\rm e}+i\chi m_{\rm o},
\qquad m_{\rm e},m_{\rm o}\in\mathbb R,
\]

giving

\[
\begin{aligned}
S_{\partial,N}
=-\frac12\int_{\partial M}d^3x\;
\bigl[M_\chi NN+M_\chi^*(NN)^\dagger\bigr]\\
=-\frac12\int_{\partial M}d^3x\;
\left[m_{\rm e}S_N+\chi m_{\rm o}P_N\right],
\end{aligned}
\]

where

\[
S_N=NN+(NN)^\dagger,
\qquad
P_N=i\!\left(NN-(NN)^\dagger\right).
\]

Both have boundary engineering dimension three when the four-dimensional field is restricted to the defect. Their coefficients are dimensionless boundary couplings. A concrete variational problem must still choose a self-adjoint fermion boundary condition compatible with these terms; this document classifies the local action and counterterms rather than pretending that every boundary condition is automatically valid.

## 2. Second quantization decides the species count

On the neutral internal two-plane let

\[
a=|R\rangle\langle O_1|,
\qquad
a^\dagger=|O_1\rangle\langle R|.
\]

Then

\[
a^2=(a^\dagger)^2=0,
\qquad
\{a,a^\dagger\}=1.
\]

The minimal Fock representation is two dimensional. The reverse TRO arrow is already the adjoint presentation of the same CAR mode. It is not another independent integration variable.

If a second independent generator (b) is introduced for the reverse arrow, the internal Fock dimension grows from two to four. In the established ternary-closure calculation, the corresponding matter closure grows from dimension sixteen to dimension twenty-four. Nothing in locality or the Majorana action requires that enlargement.

Thus this calculation makes a definite minimal choice:

\[
\boxed{
\text{reverse arrow}=\text{CAR adjoint, not an independent sterile species}.
}
\]

It proves that the one-species reading is consistent. It does not prove that the original nested division-algebra source uniquely demands that reading.

## 3. Three operations that must not be conflated

The key issue is the action on complex scalars.

### 3.1 Star adjunction

The star operation sends

\[
NN\longmapsto(NN)^\dagger
\]

and is antilinear. It provides Hermiticity and the reverse operator. It is not by itself a physical symmetry acting on the boundary orientation.

### 3.2 Antiunitary CAR real structure

Let \(\Theta_+\) be an antiunitary particle--hole real structure satisfying

\[
\Theta_+(NN)\Theta_+^{-1}=(NN)^\dagger,
\qquad
\Theta_+i\Theta_+^{-1}=-i.
\]

Then

\[
\Theta_+S_N\Theta_+^{-1}=S_N,
\qquad
\Theta_+P_N\Theta_+^{-1}=P_N.
\]

The second equality is the correction forced by antiunitarity. The two minus signs—from exchanging (NN) with its adjoint and from conjugating (i)—cancel.

Consequently

\[
\chi\mapsto-\chi
\quad\Longrightarrow\quad
\chi P_N\mapsto-\chi P_N
\]

under the paired \(\Theta_+\) rule. The proposed term is **not invariant**. The CAR real structure that closes the reverse-arrow bookkeeping therefore does not automatically supply the desired odd latch.

### 3.3 Unitary particle--hole exchange

A unitary Bogoliubov exchange \(C\) can instead satisfy

\[
C(NN)C^{-1}=(NN)^\dagger,
\qquad
CiC^{-1}=i.
\]

Now

\[
CS_NC^{-1}=S_N,
\qquad
CP_NC^{-1}=-P_N,
\]

and the paired transformation

\[
\chi\mapsto-\chi,
\qquad
P_N\mapsto-P_N
\]

makes \(\chi P_N\) invariant.

This is a valid local effective symmetry on a neutral Nambu/CAR carrier. It is not the same as the antiunitary real structure. Moreover, the corpus has already proved that particle--hole conjugation cannot act as a gauge-equivariant same-charge operation on the undoubled charged Standard Model module. Extending (C) to the Yukawa term requires the full conjugate-charge Nambu module or a spurionic map to the conjugate theory,

\[
Y_\nu\longmapsto Y_\nu^*.
\]

That is an additional construction, not a consequence of the neutral one-mode CAR.

## 4. The phase-reference obstruction

Even after choosing the unitary (C), the alleged pseudoscalar axis is not canonical. The sterile kinetic term and gauge representation are invariant under

\[
N\longmapsto e^{i\alpha}N.
\]

Therefore

\[
NN\longmapsto e^{2i\alpha}NN.
\]

At \(\alpha=\pi/4\),

\[
S_N\longmapsto P_N,
\qquad
P_N\longmapsto-S_N.
\]

The label “odd Majorana direction” rotates with the sterile-field phase convention. The Yukawa vector transforms oppositely, (Y_\nu\mapsto e^{-i\alpha}Y_\nu), so observables are unchanged.

Hence a numerical choice of (m_{\rm o}) is not yet a physical orientation measurement. A source-derived phase reference—a matched real structure, normalized Pfaffian/fermion-measure orientation or an independently fixed Yukawa/Majorana invariant—is required before the decomposition into \(m_{\rm e}\) and \(m_{\rm o}\) becomes absolute.

## 5. Complete neutral boundary counterterm classification

Use four-dimensional engineering dimensions for fields restricted to the three-dimensional defect and impose gauge invariance, boundary Lorentz invariance and even fermion parity. The local polynomial operators involving (N) through boundary dimension three are exhausted by

\[
S_N,
\qquad
P_N,
\qquad
J_n=n_\mu N^\dagger\bar\sigma^\mu N.
\]

The remaining dimension-at-most-three counterterms are spectators: boundary tension, (H^\dagger H), normal Higgs derivative/improvement terms, endpoint-blind Standard Model currents and gauge or gravitational Chern--Simons densities. None couples the neutral arrow to the charged TRO.

The first derivative bilinear intrinsic to the boundary and the localized Yukawa operator (LHN) both have boundary dimension four and are irrelevant as boundary counterterms, although (LHN) is renormalizable in the four-dimensional bulk.

For the chosen **unitary** paired exchange, the neutral ledger is

| Operator | Boundary dimension | Paired parity | Status |
|---|---:|---|---|
| (S_N) | 3 | even | allowed |
| (P_N) | 3 | odd | forbidden alone |
| \(\chi S_N\) | 3 | odd | forbidden |
| \(\chi P_N\) | 3 | even | allowed portal |
| (J_n) | 3 | particle--hole odd before geometric reflection | boundary-condition/current datum, not a vacuum topology sign |
| (LHN) | 4 | spurion-covariant with (Y_\nu\to Y_\nu^*) | bulk term; boundary irrelevant |

For the antiunitary \(\Theta_+\) contract, (P_N) is even and the fourth row changes sign: \(\chi P_N\) is forbidden. Thus “combined symmetry” is incomplete unless it declares whether its field operation is unitary or antiunitary.

## 6. One-loop counterterm structure

For one sterile field the neutrino Yukawa coupling is a flavour vector. The only one-loop flavour scalar entering its wavefunction renormalization is

\[
Y_\nu^\dagger Y_\nu\in\mathbb R_{\ge0}.
\]

The divergent Majorana counterterm therefore has the spurion form

\[
\delta M_\chi
=c\,
\frac{Y_\nu^\dagger Y_\nu}{16\pi^2\epsilon}
M_\chi,
\]

where (c) depends on the normalization and subtraction convention. No numerical value of (c) is computed here. This is a one-loop symmetry and counterterm classification in the restricted neutral boundary basis, not an evaluated loop integral or beta function. Its consequences at the level of allowed one-loop flavour structure are:

1. there is no additive Majorana mass when (M_\chi=0), because the Yukawa interaction then admits lepton number;
2. (m_{\rm e}) and (m_{\rm o}) receive the same real multiplicative wavefunction factor;
3. the relation

   \[
   M_{-\chi}=M_\chi^*
   \]

   is preserved if it was imposed;
4. one loop preserves a chosen phase but does not choose it.

The same conclusion follows from the complete counterterm ledger: an exact unitary paired symmetry forbids (P_N) and \(\chi S_N\) while allowing (S_N) and \(\chi P_N\). If the Yukawas are held fixed with arbitrary complex phases rather than transformed spurionically, that paired symmetry is not exact and the prohibition cannot be claimed.

With several sterile fields, noncommuting matrices replace the real scalar (Y_\nu^\dagger Y_\nu), and phase/frame mixing becomes a genuine matrix problem. That larger theory is outside this minimal one-(N) calculation.

## 7. Does it select the charged Furey topology?

Not yet. The local term orients the neutral Majorana plane. The charged fields enter only through (LHN), which knows the relational roles (D\to E\to H\) but does not prove that the sign of (P_N) removes one entire charged TRO and retains the other.

An operator-level locking term would have to show that the same unitary (C) sends

\[
(T_A,N_A)\longleftrightarrow(T_B,N_B)
\]

on the full gauge-complete Nambu theory and that fixing \(\chi\) leaves one chiral physical quotient rather than a doubled mirror system. The neutral action constructed here contains no such quotient mechanism.

## 8. Verdict

The calculation separates three claims:

- **Physical local operator:** yes. A boundary Majorana bilinear is a legitimate local gauge singlet, subject to a compatible self-adjoint boundary condition.
- **One-species CAR realization:** yes. The reverse arrow can be the adjoint of one sterile mode; an independent reverse species is unnecessary.
- **Source-derived A5 latch:** no. The antiunitary CAR real structure gives the wrong parity for the proposed (P_N), while the unitary exchange that gives the desired parity, its phase reference and its lock to the charged TRO are all additional data.

Thus

\[
\boxed{
B_-^{(N)}\text{ is presently a technically stable tunable spurion, not a derived physical latch.}
}
\]

On the strict \(\Theta_+\) antiunitary branch it is obstructed. On the chosen unitary branch it is admissible and multiplicatively stable, but it merely parametrizes the desired orientation.

The smallest missing data are not another Standard Model multiplet. They are:

1. a source-derived choice of unitary particle--hole exchange rather than the antiunitary real operation;
2. a phase reference fixing the (S_N/P_N) axes;
3. an operator-level lock from neutral-arrow orientation to the charged TRO and its chiral physical quotient.

## 9. Falsifiers and next calculation

The present result is falsified or upgraded by any of the following:

1. a path-integral construction proves that the reverse arrow must be independently integrated;
2. no self-adjoint local boundary condition admits the proposed Majorana term;
3. the chosen unitary exchange cannot be extended to the full charged Nambu/Yukawa module;
4. a one-loop calculation violates (M_{-\chi}=M_\chi^*) despite an exact paired regulator and boundary condition;
5. the neutral orientation remains uncorrelated with the charged TRO in every gauge-complete quotient;
6. conversely, a source construction canonically fixes the unitary exchange, phase reference and charged-topology lock, upgrading the spurion to a physical latch.

The next decisive calculation is item 3: construct the full doubled gauge-complete boundary/Nambu action, then attempt a local chiral quotient that retains one anomaly-free TRO. The existing neutral CAR algebra alone cannot answer that question.

## 10. Certificate and evidence

The [machine-readable action audit](../../../evidence/data/a5-neutral-car-boundary-action-audit.json) records the action, CAR species decision, transformation laws, complete neutral boundary counterterm ledger, one-loop spurion structure, verdict and falsifiers.

The [executable certificate](../../../verification/verify/verify_a5_neutral_car_boundary_action.mjs):

- constructs the one-mode CAR and verifies that the reverse arrow is its adjoint;
- distinguishes the two-dimensional one-mode Fock representation from a four-dimensional two-species representation;
- constructs a nonzero two-spin-component Weyl pairing;
- proves explicitly that the antiunitary real structure makes both (S_N) and (P_N) even;
- proves that the unitary particle--hole exchange makes (S_N) even and (P_N) odd;
- verifies the \(\pi/4\) rephasing rotation (S_N\to P_N\), (P_N\to-S_N);
- checks preservation of (M_{-\chi}=M_\chi^*) by real multiplicative one-loop renormalization;
- checks the boundary counterterm and matter/Fock dimension ledgers.

Companion results:

- [Current-field portal no-go and sterile candidate](../1200-1299/1291_no_exchange_odd_portal_exists_in_the_endpoint_blind_sm15_but_the_sterile_majorana_pseudoscalar_is_the_minimal_conditional_extension.md)
- [Local CAR realization and matter-TRO enlargement](../0100-0199/195_local_car_realization_and_matter_tro_enlargement_gate.md)
- [Neutral exchange is not source CAR charge conjugation](../0600-0699/619_the_neutral_exchange_is_not_source_car_charge_conjugation.md)
- [CAR real-structure phase obstruction](../0400-0499/422_a_specified_car_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
- [Neutral Fock action and response separation](../0100-0199/171_neutral_fock_action_and_positive_response_separation.md)
