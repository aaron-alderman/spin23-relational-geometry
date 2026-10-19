# The Minimal Pin-Phase Selector Is the Oriented Neutral Furey Relationship, but Its Phase Is Not Canonical

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact common-basis identification and uniqueness within the eight Pauli perturbations; physical source, relative phase and coefficient remain underived

## 1. The concrete Furey question

The regulated Pin lattice admits eight Pauli-basis perturbations that preserve
glide and class-D particle--hole symmetry while breaking the accidental chiral
symmetry. The simplest term producing a nontrivial relative Pfaffian phase is

\[
V_\delta=\delta,I\otimes\sigma_y\otimes I_\tau.
\]

The three tensor factors have distinct roles:

1. kinetic/Nambu Clifford factor;
2. two-face internal factor;
3. exchanged Wilson-regulator factor.

The neutral Furey block

\[
\operatorname{End}(O\oplus R)\cong M_2(\mathbb C)
\]

provides an exact interpretation of the middle matrix.

## 2. Matrix-unit identification

For the two gauge-neutral one-dimensional blocks (O) and (R), define

\[
P_O=E_{OO},\qquad P_R=E_{RR},\qquad E_{OR},\qquad E_{RO}.
\]

The Hermitian Pauli basis is

\[
I=P_O+P_R,qquad
\sigma_z=P_O-P_R,
\]

\[
\sigma_x=E_{OR}+E_{RO},qquad
\boxed{\sigma_y=-i(E_{OR}-E_{RO}).}
\]

Thus the Pin-phase perturbation is precisely the oriented imaginary quadrature
of the neutral (O\leftrightarrow R) relationship:

\[
\boxed{
V_\delta
=\delta,I_{\rm kin}\otimes
[-i(E_{OR}-E_{RO})]\otimes I_{\rm reg}.}
\]

It is not an invented representation. It is one of the four exact Hermitian
observables in the leading gauge-neutral Furey (M_2) block.

## 3. Exact symmetry ledger

### Gauge action

Both (O) and (R) transform trivially under
(SU(3)_c\times SU(2)_L\times U(1)_Y). Hence every (O/R) matrix unit,
including (sigma_y), lies in the Standard-Model gauge commutant.

### Dagger

Since (E_{OR}^\dagger=E_{RO}),

\[
\sigma_y^\dagger=\sigma_y.
\]

It is an observable/Hamiltonian direction, not an anti-Hermitian generator.
The associated compact rotation generator is (i\sigma_y=E_{OR}-E_{RO}).

### Response exchange

For

\[
\Theta_{\rm face}=\sigma_xK,
\]

one has

\[
\Theta_{\rm face}\sigma_y\Theta_{\rm face}^{-1}=\sigma_y.
\]

Therefore (sigma_y) lies inside the exact exchange-real response carrier

\[
J_z=\operatorname{span}_{\mathbb R}
\{I,\sigma_x,\sigma_y\}\cong H_2(\mathbb R).
\]

### CAR particle--hole symmetry

On the lattice carrier,

\[
C=(\alpha_x\otimes I\otimes I_\tau)K.
\]

Because (sigma_y^*=-sigma_y),

\[
CV_\delta C^{-1}=-V_\delta.
\]

This is exactly the required class-D parity of a Hamiltonian term.

### Glide

The internal glide acts on the first and regulator factors but leaves the
middle (O/R) factor untouched. Hence

\[
[V_\delta,U_g]=0.
\]

The operator simultaneously passes gauge, dagger, response-real, CAR and glide
tests.

## 4. Uniqueness among the eight perturbations

The complete Pauli enumeration gives

\[
I y I,quad
x y x,quad
y x y,quad
y y z,quad
y z y,quad
z x z,quad
z y y,quad
z z z,
\]

where the three letters label kinetic, (O/R)-face and regulator factors.

Only

\[
\boxed{I y I}
\]

is identity on both the kinetic and auxiliary regulator factors. It is
therefore the unique allowed chiral breaker that can be assigned wholly to the
neutral Furey endomorphism block without mixing it with spacetime Clifford or
UV regulator labels.

The other seven may be legitimate composite/domain terms, but they do not
provide an equally direct internal Furey identification.

## 5. Why the operator is not canonically selected

Gauge symmetry does not distinguish (O) and (R), so after their projectors
are fixed there remains a relative rephasing

\[
U_\theta=
\begin{pmatrix}
e^{i\theta/2}&0\\0&e^{-i\theta/2}
\end{pmatrix}.
\]

It rotates the two relationship quadratures:

\[
U_\theta\sigma_xU_\theta^\dagger
=\cos\theta\,\sigma_x-\sin\theta\,\sigma_y,
\]

\[
U_\theta\sigma_yU_\theta^\dagger
=\sin\theta\,\sigma_x+\cos\theta\,\sigma_y.
\]

Therefore neither (sigma_y) nor the distinction between “real” and
“imaginary” relationship quadratures is basis invariant under the native
gauge commutant.

The response exchange (Theta_{\rm face}) selects a real form containing both
quadratures, but it still does not choose one direction within their plane.
A source state, boundary condition, Yukawa phase, exceptional orientation or
second real structure must break the relative rephasing before
(V_\delta\) becomes canonical.

## 6. Sign and coefficient

The matrix units provide no preferred magnitude for (delta). Pure unitary
exchange (O\leftrightarrow R) reverses (sigma_y), while the antiunitary
response exchange fixes it because coefficient conjugation contributes a
second sign.

Thus (delta) is an orientation-sensitive pseudoscalar coefficient. Its sign
can become meaningful only after the ordered (O/R) orientation and
antiunitary convention are fixed by other physical data.

The finite lattice has both trivial and nontrivial Pfaffian intervals as
(delta) varies. Choosing a desired interval by hand would be parameter
fitting, not derivation.

## 7. Relation to the Jordan carrier

The result connects three structures without equating them:

\[
\begin{array}{ccl}
\sigma_y\in\operatorname{Herm}M_2(\mathbb C)
&:&\text{neutral Furey relationship observable},\\
\sigma_y\in J_z\cong H_2(\mathbb R)
&:&\text{exchange-real Jordan-carrier coordinate},\\
\delta\sigma_y\text{ in }H_{\rm Pin}
&:&\text{class-D phase-selecting perturbation}.
\end{array}
\]

The same matrix participates in all three descriptions. The missing bridge is
not representation matching; it is a physical mechanism fixing the
relationship phase and coefficient.

## 8. Candidate selection mechanisms

The next finite search should test whether (sigma_y) is selected by:

1. Furey's intrinsic conjugation combined with a second real structure;
2. the exceptional/triality orientation and its CP-odd cubic coefficient;
3. a boundary self-adjoint-extension phase;
4. a neutral current commutator or spectral antisymmetric quadrature;
5. a stress/current response that fixes an oriented (O/R) phase.

Each candidate must produce (delta) rather than merely permit it.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a basis-independent Furey or boundary construction
selects the oriented relationship operator and places (delta) inside a
nontrivial continuum-stable Pfaffian interval.

**Canonicality falsifier:** (sigma_y) is called unique while the relative
(U(1)) rephasing remains unbroken.

**Gauge falsifier:** the neutral relationship is assigned a nonzero Standard-
Model charge.

**CAR falsifier:** the response exchange fixing (sigma_y) is conflated with
the CAR operation under which the Hamiltonian term is odd.

**Regulator falsifier:** one of the seven mixed perturbations is called a pure
Furey internal operator without explaining its kinetic/regulator factors.

**Parameter falsifier:** (delta) is chosen solely to obtain
(mathcal Q_{\rm rel}=-1).

## 10. Pinned dependency and continuation

The Furey neutral algebra now supplies the exact minimal operator. Pin only its
canonical phase and coefficient.

Continue by intersecting the relative (O/R) rephasing with intrinsic Furey
conjugation, exceptional CP orientation and available neutral source
correlators. In parallel, map the lattice phase boundaries so any derived
coefficient has a definite target interval.

## 11. Certificate

The [Furey neutral Pin-selector certificate](../../../verification/verify/verify_furey_neutral_oriented_relationship_pin_selector.mjs)
reconstructs the matrix units, proves every symmetry parity, enumerates all
eight lattice perturbations, establishes the unique (I y I) factorization
and verifies the continuous relative rephasing that prevents canonical
selection.

## Companion documents

- [Nontrivial regulated Pin relative phase](383_the_regulated_pin_lattice_has_a_nontrivial_relative_pfaffian_phase_but_glide_and_car_do_not_force_it.md)
- [Neutral matrix-unit causal carrier](368_the_neutral_matrix_units_support_an_exact_exchange_real_causal_carrier_but_are_not_yet_spacetime_operators.md)
- [Leading neutral endomorphism carrier](367_the_neutral_endomorphism_m2_is_the_leading_internal_carrier_candidate_but_still_lacks_a_physical_source.md)
- [Corrected Furey neutral inventory](362_the_furey_neutral_endomorphism_sector_has_seven_not_eleven_copies_and_no_canonical_pairing_mediator.md)
