# No declared CP, boundary, Z3, flavor or index datum fixes the A5 sterile phase reference

**Date:** 20 October 2026  
**Branches:** root gate A5, sterile CAR phase, generalized CP/CPT, charge-three Higgsing, flavor CP and determinant-line orientation  
**Claim status:** exact rephasing-equivariance no-go for the one-sterile-field theory; minimal covariant reference datum classified, with no microscopic realization yet selected

## Result in one sentence

None of the programme's already-declared structures—CP, CPT, the oriented boundary normal, the charge-three Higgs phase, the Majorana coefficient, Yukawa/Jarlskog data, residual \(\mathbb Z_3\), or anomaly/index information—canonically fixes the unitary particle--hole phase needed by document 1391: invariant data carry no sterile phase, while the Majorana coefficient and generalized CP carry exactly the phase being sought; the minimal noncircular datum is one independently sourced, nonzero charge-minus-two complex reference \(R_2\), whose phase defines rephasing-invariant Majorana quadratures but whose vacuum or measurement must itself be physically prepared.

## 1. The target is a phase circle, not merely a sign

For one sterile Weyl field, the kinetic and gauge terms admit the field redefinition

\[
N\longmapsto e^{i\alpha}N.
\]

The holomorphic pair

\[
A:=NN
\]

transforms as

\[
A\longmapsto e^{2i\alpha}A.
\]

A unitary particle--hole exchange is a family

\[
C_\beta N C_\beta^{-1}
=e^{i\beta}N^\dagger,
\]

where spinor contraction and spatial reflection data are suppressed. Rephasing \(N\) changes its coordinate by

\[
\beta\longmapsto\beta+2\alpha.
\]

Only \(\beta\bmod\pi\) matters for the bilinear axis. Thus the missing datum is a point on a circle, with sterile rephasing acting transitively. A real sign such as \(\chi=\pm1\) can choose between two already-defined directions; it cannot define the direction in the first place.

## 2. Phase-reference no-go

Let \(D\) be a collection of data fixed by the continuous sterile rephasing and let

\[
f:D\longrightarrow S^1/\{\beta\sim\beta+\pi\}
\]

be an equivariant rule selecting a particle--hole phase. For fixed \(d\in D\), equivariance requires

\[
f(d)=f(d)+2\alpha\pmod\pi
\]

for every \(\alpha\). No point on the target circle satisfies this condition. Therefore:

\[
\boxed{
\text{sterile-rephasing-invariant data cannot select }C_\beta.
}
\]

This is the phase version of the general symmetric-data selector theorem in document 1221. It is stronger than saying that the answer has not yet been guessed: it classifies the transformation type any successful input must possess.

A successful datum must transform with sterile charge \(-2\), or equivalently provide a normalized phase in the dual line to \(NN\).

## 3. Exhaustion of already-declared candidates

| Candidate | Sterile-rephasing type | What it can do | Why it does not canonically select \(C_\beta\) |
|---|---|---|---|
| CP | family \(CP_\xi\) with phase \(\xi\) | classify scalar/pseudoscalar after \(\xi\) is fixed | \(\xi\) shifts under \(N\) rephasing |
| CPT | invariant theorem with intrinsic field phases | enforce locality/spin-statistics constraints | both Majorana quadratures are CPT allowed; intrinsic sterile phase remains free |
| boundary normal / \(\chi\) | neutral \(\mathbb Z_2\) sign | distinguish two prepared wall orientations | cannot define a charged phase-circle axis |
| charge-three Higgs phase | gauge phase | generate vortices and a residual discrete sector | its three vacuum representatives are gauge equivalent; no A5 charge-(-2) map is declared |
| Majorana mass phase | charge-(-2) covariant | define an axis covariantly | circular: it is the coefficient being decomposed |
| Yukawa/Jarlskog data | physical invariants are neutral | distinguish conjugate flavor sectors | a scalar pseudoscalar cannot choose a charged phase-circle point |
| residual \(\mathbb Z_3\) | discrete | constrain charges and transport triality | either \(NN\) is neutral and \(\mathbb Z_3\) is blind, or it is forbidden |
| anomaly, index or Pfaffian flow | integer or relative sign | transport an already-oriented determinant line | does not choose its initial orientation or continuous phase |

The rest of this document makes each line explicit.

## 4. CP and CPT

### 4.1 Generalized CP is itself a torsor

For a sterile Weyl field, a generalized CP operation contains an intrinsic phase,

\[
CP_\xi:\quad
N(t,\mathbf x)
\longmapsto
e^{i\xi}\,i\sigma^2N^\dagger(t,-\mathbf x).
\]

Under \(N\mapsto e^{i\alpha}N\), the same physical operation is represented with a shifted \(\xi\). Hence “use CP to declare \(P_N\) odd” is incomplete until a particular generalized CP is fixed.

If exact CP is imposed on the full Yukawa theory, its consistency equations can fix phases relative to one another. But observed nonzero quark-sector Jarlskog data show that no such exact unbroken CP acts on the full Standard Model vacuum. A sterile-sector CP can still be imposed, but \(LHN\) then requires a matched action on the lepton and Higgs fields; choosing that match is precisely the missing sewing datum.

Spontaneous CP does not produce an absolute answer. If a CP-invariant potential has a non-real order parameter \(R\), then \(R\) and \(R^*\) are degenerate vacua. Boundary conditions or formation history may select one, but the symmetric action predicts neither sign.

### 4.2 CPT does not distinguish the two quadratures

CPT fixes deep structural properties of a local Lorentz-invariant QFT, but it does not assign an absolute intrinsic phase to \(N\). Both

\[
NN+(NN)^\dagger
\quad\text{and}\quad
i\!\left(NN-(NN)^\dagger\right)
\]

are compatible with Hermiticity and CPT. The scalar/pseudoscalar distinction belongs to the separately phased CP or parity operation, not to CPT alone.

Thus CPT validates the action class; it does not choose \(C_\beta\).

## 5. Geometry supplies a sign, not the missing complex ray

The oriented normal and measured flux supply

\[
\chi=\operatorname{sgn}(n\cdot j).
\]

This is real, sterile-rephasing neutral and reversible. It is exactly the right datum to correlate with an **already defined** odd operator. It cannot decide which linear combination of

\[
NN+(NN)^\dagger,
\qquad
i\!\left(NN-(NN)^\dagger\right)
\]

should be called odd.

This is a type mismatch rather than a shortage of imagination: a neutral \(\mathbb Z_2\) sign cannot equivariantly select a point in a continuously rotating charge-two plane.

The neutral kink of document 1292 makes the same limit concrete. Its kink and antikink are exactly degenerate. Boundary conditions or history select one wall orientation, but its real order parameter has no sterile phase charge.

## 6. Charge-three Higgs and residual \(\mathbb Z_3\)

For a charge-three condensate

\[
s=|s|e^{i\theta},
\qquad
\theta\mapsto\theta+3\lambda,
\]

the representatives \(0,2\pi/3,4\pi/3\) are related by gauge transformations. The condensate phase is not a physical three-valued clock. Gauge-invariant winding and holonomy are physical, but they are topological data, not a local sterile charge-(-2) phase reference.

No transformation law connecting this ultraviolet \(U(1)\) to the A5 field redefinition of \(N\) has been derived. Adding a charge assignment and a coupling \(s^kNN\) would be new model data.

The residual group gives an even sharper dichotomy. If \(N\) has residual charge \(q\in\mathbb Z_3\), the Majorana pair has charge \(2q\). Since two is invertible modulo three,

\[
2q=0\pmod3
\quad\Longrightarrow\quad
q=0.
\]

Therefore either \(NN\) is allowed and the residual \(\mathbb Z_3\) acts trivially on it, or \(N\) is nontrivially charged and the bare Majorana portal is forbidden. The residual group cannot both allow the term and select its quadrature.

## 7. Majorana and Yukawa phases

### 7.1 The Majorana coefficient is the right type but the wrong provenance

Hermiticity writes the mass term as

\[
MNN+M^*(NN)^\dagger.
\]

Under sterile rephasing,

\[
M\longmapsto e^{-2i\alpha}M.
\]

Thus

\[
\beta=-\arg M\pmod\pi
\]

is an equivariant choice of particle--hole phase. Algebraically it works. Epistemically it is circular: \(M\) is the same free coefficient whose real and imaginary quadratures document 1391 attempted to classify as even and odd. It preserves a chosen answer under running but does not originate it.

### 7.2 One-\(N\) Yukawas do not contain an independent phase compass

With one sterile field, \(Y_\nu\) is one lepton-flavor vector. Charged-lepton-preserving field rephasings can remove its component phases; a single vector does not provide the noncommuting flavor structure required for a physical Jarlskog invariant. Its norm

\[
Y_\nu^\dagger Y_\nu
\]

is real and sterile-rephasing neutral, as seen directly in the one-loop result of document 1391.

Quark or three-family lepton Jarlskog quantities are genuine basis-invariant CP-odd scalars. They distinguish a theory from its conjugate and could correlate two already-defined orientation sectors through an optional portal. But they have sterile charge zero. They cannot define the phase of \(N\) or select \(C_\beta\) without a new charged intertwiner between flavor and the neutral CAR line.

Majorana CP invariants similarly become physical only through relative information among a Majorana tensor, charged-lepton data and multiple flavor directions. They can measure an orientation once those tensors exist. Treating their observed sign as an input is legitimate phenomenology, not a derivation of the one-\(N\) phase reference.

## 8. Anomaly, index and Pfaffian data

The sterile field is a Standard Model gauge singlet, so its rephasing has no Standard Model gauge anomaly capable of anchoring the phase to a gauge theta angle. A possible gravitational phase would define only a relative combination with a gravitational theta counterterm; choosing that counterterm is new input.

Anomaly cancellation says that the determinant line can be consistently oriented. It does not select one of its orientations. Likewise, spectral flow or an index transports a relative sign between two endpoints:

\[
\operatorname{sgn}
\frac{\operatorname{Pf}A_1}{\operatorname{Pf}A_0}
=(-1)^{\operatorname{SF}_2}.
\]

The initial Pfaffian orientation remains required. These tools can preserve and transport a chosen phase/sign; they do not create an absolute sterile phase reference.

## 9. Minimal genuinely new datum

Introduce one nonzero complex reference \(R_2\) transforming in the dual sterile line,

\[
R_2\longmapsto e^{-2i\alpha}R_2.
\]

Then

\[
R_2NN
\]

is rephasing invariant, and the physical quadratures are

\[
S_R=R_2NN+R_2^*(NN)^\dagger,
\]

\[
P_R=i\!\left(R_2NN-R_2^*(NN)^\dagger\right).
\]

The unique bilinear-compatible unitary exchange phase is

\[
\boxed{
\beta_R=-\arg R_2\pmod\pi.
}
\]

Indeed \(C_{\beta_R}\) maps \(R_2NN\) to its adjoint, making \(S_R\) even and \(P_R\) odd. Under a field rephasing, both \(R_2\) and \(\beta_R\) transform, while the two operators remain invariant. This is covariance, not a hidden basis convention.

Two realizations are minimal in different senses:

1. **Measurement:** an independently calibrated lepton-number-violating complex amplitude, measured relative to a charged-current interferometric or boundary-clock convention.
2. **Field:** a complex boundary field \(X\) of sterile charge \(-2\), with \(\langle X\rangle\ne0\), coupled as \(XNN+\text{h.c.}\).

The field realization is not predictive by itself. A symmetric potential for one complex \(X\) has either a continuous phase orbit or CP-conjugate discrete vacua. A second independently phased interaction, boundary preparation or formation history must select the vacuum. A real \(\mathbb Z_2\) field alone is insufficient because it supplies only a sign, not the charge-two complex ray.

This is the smallest honest closure datum: one independently prepared complex ray in the dual of the sterile-pair line. It does not require another Standard Model generation or mirror sector.

## 10. Verdict

The exhaustion gives a no-go:

\[
\boxed{
\text{No already-declared structure canonically fixes the A5 sterile phase reference.}
}
\]

The candidates divide cleanly:

- boundary orientation, Jarlskog signs, residual \(\mathbb Z_3\) and index/Pfaffian data are invariant or discrete and have the wrong transformation type;
- CP and the Majorana phase have the right sensitivity only because their intrinsic phase is itself unfixed;
- charge-three Higgs phases are gauge representatives;
- spontaneous breaking supplies history-bearing sectors but leaves conjugate vacuum degeneracy.

The best use of existing data is **relative**: a boundary history, CP-odd invariant or spectral-flow parity may label, correlate or transport a phase after an \(R_2\)-type reference exists. None originates that reference.

A5 therefore remains open at one precise datum:

\[
\text{independent charge-}(-2)\text{ phase reference}
\quad+
\text{neutral-to-charged-TRO lock}.
\]

## 11. Falsifiers and next experiment

This no-go is falsified if an existing datum is shown to transform as a nonzero sterile charge-\(-2\) covariant without using \(M\), \(C_\beta\), or an endpoint-labelled coefficient in its definition.

The constructive route is falsified if:

1. \(R_2\) has no independently measurable phase-sensitive interference channel;
2. all vacua are averaged so that \(\langle R_2\rangle=0\);
3. the \(R_2\) phase fails to lock to the charged Furey TRO;
4. the required unitary exchange cannot extend to the gauge-complete Nambu theory;
5. radiative corrections populate an uncontrolled second phase direction.

The smallest executable next experiment is a two-source anomalous-correlator protocol: prepare a calibrated complex \(R_2\), reverse \(\chi\), and measure the sign of the rephasing-invariant quadrature \(P_R\). Reversing the phase of \(R_2\) while holding \(\chi\) fixed must rotate the response covariantly; merely relabelling \(N\) must change neither result. This would demonstrate a physical phase reference, though not derive its microscopic origin.

## 12. Certificate and evidence

The [machine-readable exhaustion](../../../evidence/data/a5-phase-reference-exhaustion.json) records the rephasing action, theorem, eight candidate verdicts, vacuum-degeneracy audit and minimal reference.

The [executable verifier](../../../verification/verify/verify_a5_phase_reference_exhaustion.mjs):

- checks that fixed data cannot select a point on the phase circle;
- verifies equivariance of \(\beta_R=-\arg R_2\);
- verifies invariance of \(R_2NN\);
- confirms that the Majorana phase has the right covariance while remaining circular;
- computes the nontrivial three-point residual-\(\mathbb Z_3\) orbit;
- verifies conjugate degeneracy in a CP-even phase potential;
- checks the full candidate and verdict ledger.

Companion results:

- [Minimal sterile CAR boundary action](1391_the_minimal_sterile_car_action_makes_the_reverse_arrow_an_adjoint_but_leaves_the_a5_portal_a_tunable_spurion.md)
- [Symmetric-data selector theorem](../1200-1299/1221_symmetric_data_cannot_select_a_nonfixed_orientation_and_a5_requires_a_covariant_selector_input.md)
- [Neutral kink and history-selected orientation](../1200-1299/1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md)
- [Majorana Nambu basis obstruction](../0100-0199/175_majorana_nambu_sigma_y_is_not_a_basis_invariant_orientation.md)
- [Rephasing-invariant spectra and phase no-go](../0300-0399/301_rephasing_invariant_positive_spectra_can_select_only_the_population_axis.md)
- [Pfaffian flow transports only relative orientation](../0400-0499/475_domain_wall_pfaffian_spectral_flow_can_transport_the_ribbon_sign_but_cannot_supply_its_absolute_octonion_sewing.md)
