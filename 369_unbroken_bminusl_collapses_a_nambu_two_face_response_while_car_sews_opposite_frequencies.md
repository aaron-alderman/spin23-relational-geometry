# Unbroken \(B-L\) Collapses a Nambu Two-Face Response, While CAR Sews Opposite Frequencies

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B05, B06, B08 and B11  
**Claim status:** exact charge-superselection and frequency-sewing theorem; physical identification of the neutral \(O/R\) faces remains open

## 1. Two ways to realize the neutral faces

The abstract \(O/R\) matrix algebra can be represented physically in two very
different ways:

1. two independent gauge-neutral probes of the same conserved charge;
2. the Nambu pair \((N,N^\dagger)\) of one sterile Weyl field.

The first permits an ordinary neutral cross response but requires two physical
channels. The second uses no extra Weyl field but is constrained by charge
superselection and particle--hole frequency sewing.

## 2. Nambu entry charges

With \(B-L(N)=+1\), the Nambu faces have charges

\[
q=(+1,-1).
\]

A response entry transforms with charge difference \(q_i-q_j\), giving

\[
\begin{pmatrix}
0&+2\\
-2&0
\end{pmatrix}.
\]

The diagonal entries are normal densities. The off-diagonal entries are
anomalous pair amplitudes proportional to \(NN\) and \(N^\dagger N^\dagger\).

If continuous \(B-L\) is unbroken and the source state is invariant, the
off-diagonal entries vanish pointwise:

\[
\rho_{12}(\omega)=\rho_{21}(\omega)=0.
\]

## 3. Intersection with the exchange-real cone

The response exchange requires

\[
\rho=
\begin{pmatrix}p&z\\\bar z&p\end{pmatrix}.
\]

Continuous \(B-L\) requires \(z=0\). Therefore

\[
\boxed{
J_z^+\cap\operatorname{Comm}(U(1)_{B-L})
=\{pI:p\geq0\}.}
\]

The full three-dimensional Lorentz cone collapses to one scalar ray. A claim
that an unbroken-charge Nambu pair directly realizes all of \(H_2(\mathbb R)\)
is therefore false.

The off-diagonal directions reopen if:

- \(B-L\) is broken by a charge-two condensate;
- an external source itself carries charge two;
- or the response is a frequency-folded neutral construction rather than the
  raw Nambu density.

## 4. CAR relates opposite frequencies

Particle--hole symmetry has the schematic spectral action

\[
\rho(-\omega)
=\tau_x\rho(\omega)^T\tau_x
\]

up to basis and sign conventions. It does not generally imply

\[
\rho(\omega)
=\tau_x\overline{\rho(\omega)}\tau_x
\]

at the same frequency.

For example,

\[
\rho(+\omega)=
\begin{pmatrix}2&0\\0&1\end{pmatrix},
\qquad
\rho(-\omega)=
\begin{pmatrix}1&0\\0&2\end{pmatrix}
\]

satisfies the opposite-frequency sewing but neither matrix has equal
populations pointwise.

This proves that CAR reality alone does not select the response fixed algebra.

## 5. Frequency folding is an additional functor

The folded density

\[
\rho_{\rm fold}(\omega)
=\rho(\omega)+\tau_x\rho(-\omega)^T\tau_x
\]

can have equal face populations and land in the response real form. But folding
combines positive and negative frequencies; it is a new response operation,
not a consequence that may be silently inserted into the microscopic
Hamiltonian.

A viable folded construction must preserve:

- spectral positivity;
- analyticity and the retarded prescription;
- the distinction between creation and annihilation operators;
- the correct ultraviolet normalization;
- the physical meaning of the two folded faces.

## 6. Two independent same-charge probes

If \(N_1\) and \(N_2\) are independent gauge-neutral operators with equal
\(B-L\), then

\[
N_i^\dagger N_j
\]

is neutral for every \(i,j\). Their spectral matrix can fill all of
\(H_2(\mathbb C)_+\) without breaking \(B-L\).

The price is an actual two-dimensional probe multiplicity. The one-generation
Standard Model supplies only one sterile Weyl representation unless another
endomorphism copy is independently selected as physical. Treating two of the
seven neutral representation copies as particles would require a selector and
would risk extra sterile states.

The two probes could instead be composite currents or boundary channels; that
route avoids new elementary fermions but still needs an operator construction.

## 7. Current and stress candidates

For two neutral Weyl probes, the matrices

\[
j^\mu_{ij}=N_i^\dagger\bar\sigma^\mu N_j
\]

and

\[
T^{\mu\nu}_{ij}
\]

are gauge-neutral Hermitian \(2\times2\) current and stress responses. They
provide the correct incidence pattern and bosonic statistics. Ward quotient and
spectral positivity could then generate the carrier.

However, the corpus has not identified \(O\) and \(R\) with two such physical
Weyl fields. If one is merely the conjugate or reverse arrow of the other, the
independent-probe formula overcounts the Fock space.

## 8. Connection to Majorana condensation

The composite order parameter

\[
\Sigma_{ab}\sim\nu^c_a\nu^c_b
\]

breaks continuous \(B-L\) to a discrete remnant when it condenses. The same
transition then permits anomalous Nambu spectral entries. This supplies a
concrete sequence:

\[
\text{sterile pairing}
\longrightarrow B-L\text{ breaking}
\longrightarrow \text{full Nambu response cone}.
\]

It does not prove that the condensate forms. It shows that the response-carrier
and Majorana branches become dynamically linked precisely at the
superselection transition.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the derived sterile condensate both breaks
\(B-L\) and produces a full-rank positive Nambu spectral density whose folded or
pointwise response is the neutral \(H_2(\mathbb R)\) carrier.

**Superselection falsifier:** anomalous Nambu entries are nonzero in a
charge-invariant state with no charged source.

**CAR falsifier:** opposite-frequency particle--hole sewing is replaced by
pointwise exchange equality without a folding theorem.

**Counting falsifier:** \(N\) and its CAR conjugate are counted as two
independent sterile Weyl fields.

**Probe falsifier:** two endomorphism copies are treated as two physical currents
without a selector, kinetic term and Fock assignment.

## 10. Pinned dependency and continuation

The raw Nambu route is pinned at \(B-L\) breaking or a valid frequency-folding
functor. The same-charge route is pinned at two named independent neutral
probes.

Continue by constructing the folded retarded Herglotz function explicitly and
testing whether its determinant winding agrees with the earlier selector
winding without introducing zeros or violating ultraviolet normalization.

## 11. Certificate

The [neutral-probe superselection certificate](scripts/verify_neutral_probe_superselection_and_nambu_frequency_gate.mjs) computes all Nambu entry charges, proves the unbroken-\(B-L\) intersection is one-dimensional, exhibits CAR-compatible but non-pointwise-exchange spectral data, and verifies that frequency folding restores equal populations only as an additional response operation.

## Companion documents

- [Neutral matrix-unit spectral carrier](368_the_neutral_matrix_units_support_an_exact_exchange_real_causal_carrier_but_are_not_yet_spacetime_operators.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Sterile composite topology](360_no_existing_elementary_bminusl_two_singlet_but_the_sterile_symmetric_composite_has_u3_over_o3_topology.md)
- [Neutral Fock/response separation](171_neutral_fock_action_and_positive_response_separation.md)
- [Causal exceptional complex structure](351_causal_dispersion_supplies_the_missing_exceptional_complex_structure_nonlocally.md)
