# The Neutral Matrix Units Support an Exact Exchange-Real Causal Carrier, but Are Not Yet Spacetime Operators

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact internal matrix-unit, positive spectral and sector-limited CP theorem; spacetime operator assignment and physical response exchange remain open

## 1. Opening the leading block

Let \(O\equiv O_1\) and \(R\) denote the two neutral one-dimensional carrier
blocks. Their matrix units are

\[
P_O=E_{OO},\qquad P_R=E_{RR},\qquad
E_{OR},\qquad E_{RO}.
\]

They obey

\[
P_O^\dagger=P_O,\qquad P_R^\dagger=P_R,\qquad
E_{OR}^\dagger=E_{RO},
\]

and

\[
E_{OR}E_{RO}=P_O,\qquad
E_{RO}E_{OR}=P_R.
\]

The Hermitian basis is

\[
I=P_O+P_R,\quad
\sigma_z=P_O-P_R,\quad
\sigma_x=E_{OR}+E_{RO},\quad
\sigma_y=-i(E_{OR}-E_{RO}).
\]

This is an exact \(H_2(\mathbb C)\) observable block. Since \(O\) and \(R\)
carry identical trivial Standard-Model representations, every matrix unit
commutes with the gauge action.

## 2. What “operator” means here

These are internal endomorphisms. They are not yet named local quantum fields.
The algebra alone does not say whether a matrix unit becomes:

- a bosonic observable;
- a fermionic transition;
- a source insertion;
- an auxiliary Hubbard--Stratonovich variable;
- a bilocal or boundary operator;
- a generator acting only on internal multiplicity.

An internal dagger determines adjoints but not spacetime spin/statistics.
Likewise, a grading could make the off-diagonal units even or odd depending on
the assigned parities of \(O\) and \(R\). No such physical grading is presently
derived.

## 3. Exact response exchange

On this two-face block define

\[
\Theta_{\rm face}=\sigma_xK.
\]

Its action on Hermitian observables is

\[
X\longmapsto\sigma_x\overline X\sigma_x.
\]

It fixes

\[
I,\qquad \sigma_x,\qquad \sigma_y,
\]

and reverses

\[
\sigma_z.
\]

Therefore

\[
\boxed{
\operatorname{Fix}(\Theta_{\rm face})
=\left\{
\begin{pmatrix}p&z\\\bar z&p\end{pmatrix}
:p\in\mathbb R,\ z\in\mathbb C
\right\}
=J_z\cong H_2(\mathbb R).}
\]

The removed coordinate is the population imbalance \(P_O-P_R\), while both
quadratures of the relationship survive.

## 4. Most general positive pointwise density

An exchange-fixed Hermitian spectral density has the form

\[
\rho(\omega)=
\begin{pmatrix}
p(\omega)&z(\omega)\\
\bar z(\omega)&p(\omega)
\end{pmatrix}.
\]

It is positive semidefinite exactly when

\[
\boxed{p(\omega)\geq |z(\omega)|.}
\]

Its determinant is the Lorentz norm

\[
\det\rho=p^2-|z|^2.
\]

This is not a special ansatz: it is the complete pointwise cone fixed by the
exchange.

## 5. Causal closure

For a positive matrix measure,

\[
G(\zeta)=\int\frac{\rho(\omega)}{\omega-\zeta}\,d\omega,
\qquad \operatorname{Im}\zeta>0,
\]

satisfies

\[
\operatorname{Im}G(\zeta)\succeq0.
\]

If \(\Theta_{\rm face}\rho(\omega)=\rho(\omega)\) pointwise, then the Herglotz
integral remains in the complexification of \(J_z\). The exchange must hold
before integration; an accidental equality of integrated moments is
insufficient.

Thus the neutral matrix algebra supports the exact response architecture

\[
\text{positive residues}
\longrightarrow J_z^+
\longrightarrow \text{causal }H_2(\mathbb R)\text{ response}
\longrightarrow Spin_0(2,3).
\]

What remains missing is a physical source whose matrix elements produce those
residues.

## 6. Response exchange is not the CAR adjoint

The intrinsic CAR antiunitary exchanges particle and hole sectors on a Nambu
carrier. The present \(\Theta_{\rm face}\) exchanges the \(O/R\) response
faces. They act on different labels and solve different problems.

\[
\boxed{\Theta_{\rm face}\neq J_{\rm CAR}}
\]

unless a further intertwiner identifies their actions. Tensoring them as
independent doublings would overcount the carrier; equating them without an
intertwiner would repeat the earlier CAR/selector conflation.

The correct present statement is:

- CAR reality guarantees self-dual fermionic bookkeeping;
- face exchange selects the response real form;
- their compatibility is required but their equality is not established.

## 7. Complex flavor CP remains possible

At the observable level use the real tensor product

\[
J_z\otimes_{\mathbb R}\operatorname{Herm}_3(\mathbb C).
\]

The face involution acts on the first factor, while flavor Hermitian matrices
remain complex. An explicit checkpoint gives

\[
\operatorname{tr}[H_u,H_d]^3=36i\neq0
\]

simultaneously with an exchange-real positive face density.

This proves algebraic coexistence. A microscopic antiunitary on the full Hilbert
space generally conjugates coefficients globally, so a physical lift must show
how the flavor complex structure is retained or compensated. Sector-limited
observable reality is not automatically a fundamental CP symmetry.

## 8. Candidate physical realizations

The matrix units suggest four routes:

1. **Population response:** \(P_O,P_R\) are spectral projectors for two neutral
   source sectors.
2. **Transition response:** \(E_{OR},E_{RO}\) are neutral transition amplitudes
   whose Hermitian quadratures are measured.
3. **Boundary amplitudes:** the two labels are boundary or survivor channels,
   and the matrix units act only on source space.
4. **Composite currents:** gauge-neutral bilinears project onto the matrix
   units after Ward-null directions are removed.

Only the third route is already mirrored by an exact Gram/Herglotz construction.
None has yet been derived specifically for the \(O/R\) block.

## 9. Coupling to the sterile pair

The sterile pair \(B_{ab}\) has \(B-L=+2\). The neutral matrix units have no
derived \(B-L=-2\) assignment, so a linear term

\[
E_{OR}B_{ab}
\]

is not presently invariant or even type-correct. Gauge-neutral observables can
couple quadratically,

\[
P_O\,\operatorname{tr}(B^\dagger B),\qquad
P_R\,\operatorname{tr}(B^\dagger B),
\]

but these are higher interactions and do not make the matrix unit a charge-two
mediator.

Thus the neutral block is a promising response carrier, not yet the Majorana
order parameter.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** named gauge-neutral Standard-Model/Furey currents
have matrix elements proportional to these four units, a positive pointwise
spectral density, and a dynamically preserved \(O/R\) exchange.

**CAR falsifier:** \(\Theta_{\rm face}\) is called the CAR adjoint without an
intertwiner between face and Nambu labels.

**Statistics falsifier:** internal matrix parity or dagger is used as a
spacetime spin-statistics assignment.

**Spectral falsifier:** the integrated response is exchange-real while its
pointwise spectral density is not.

**CP falsifier:** face reality is extended to all flavor coefficients, forcing
the CP-odd invariant to vanish.

**Majorana falsifier:** gauge neutrality is mistaken for \(B-L=-2\).

## 11. Pinned dependency and continuation

The algebraic and causal response cone is closed positively. Pin the physical
branch at source identification:

\[
\boxed{\text{find two actual neutral probes realizing the }O/R\text{ matrix units}.}
\]

Continue by auditing available neutral bilinears and stress/current insertions
for this exact \(M_2\) incidence pattern, while keeping the sterile-pair
mediator branch separate.

## 12. Certificate

The [neutral matrix-unit spectral certificate](../../../verification/verify/verify_neutral_matrix_units_exchange_real_spectral_response.mjs) verifies matrix-unit closure, the complete exchange-fixed positive cone, pointwise Herglotz preservation, a nonzero flavor CP checkpoint, and the distinction between response exchange and CAR adjunction.

## Companion documents

- [Leading neutral carrier candidate](367_the_neutral_endomorphism_m2_is_the_leading_internal_carrier_candidate_but_still_lacks_a_physical_source.md)
- [Exchange-fixed Gram response](304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Real face with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Sterile pairing channel](361_three_flavors_open_a_nonvanishing_sterile_pairing_channel_but_no_interaction_fixes_its_sign.md)
