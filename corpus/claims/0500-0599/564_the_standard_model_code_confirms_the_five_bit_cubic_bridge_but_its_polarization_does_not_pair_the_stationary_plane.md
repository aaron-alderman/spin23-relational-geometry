# The Standard-Model Code Confirms the Five-Bit Cubic Bridge, but Its Polarization Does Not Pair the Stationary Plane

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** source theorem plus independently certified finite calculations; the new compatibility-Hessian result is an exact no-go through every tested lift level \(16\to32\) through \(32768\to65536\)

## Executive result

The Prakash–Ramya paper is not merely suggestive background for this programme. It supplies an exact bridge:

\[
\boxed{
\text{one integral five-bit }SO(10)\text{ spinor shell}
\longrightarrow
\text{cubic anomaly cancellation}
\longrightarrow
\text{triorthogonal codes over every prime}.}
\]

For the binary reduction, the sixteen even-parity five-bit states form the triply-even Reed–Muller code \(RM(1,4)\); puncturing the sterile-neutrino coordinate gives the Bravyi–Kitaev \([[15,1,3]]_2\) code. For odd primes the same integral cubic identity gives \([[15,1,3]]_p\), and the paper proves that the qutrit instance is the unique shortest distance-three triorthogonal qutrit code.

This is already deeply integrated into the corpus. The present revisit asks the sharper live question created by the exact lift quotient

\[
Q=
\underbrace{\overline{B^1}}_4
\oplus
\underbrace{\langle e_1\rangle}_1
\oplus
\underbrace{\langle e_0,e_4\rangle}_2.
\]

Can the paper’s cubic/anomaly phase, or the quadratic Hessian of the compatible shell-lift equations, derive the missing alternating form on the stationary plane \(Q/R=\langle e_0,e_4\rangle\)?

The answer is no for both obvious polarization routes:

\[
\boxed{\Delta_a\Delta_b f_{\rm code}=0,}
\]

and, independently,

\[
\boxed{
H_m(R,Z^1)=0,
\qquad
H_m(e_0,e_4)=0
}
\]

for all twelve certified binary lift stages through modulus \(2^{16}\).

The second statement is stronger than a failed calculation on chosen representatives. The Hessian annihilates the full preimage of \(R\), so it genuinely descends to \(Q/R\); the descended alternating form is identically zero. The missing Heisenberg pairing is therefore not hidden in the immediate second variation of the compatibility equations.

## 1. What the paper proves

Write the sixteen weights of the positive-chirality spinor of \(SO(10)\), scaled by two, as

\[
q\in\{\pm1\}^5,
\qquad
\prod_{i=1}^5q_i=+1.
\]

These are the five-bit strings with even parity. They label one Standard-Model generation together with the conjugate right-handed neutrino \(\nu^c\).

For charge words \(x,y,z\) on the fermions, define

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell,
\]

where \(c_\ell\) records chirality. Gauge-anomaly cancellation is precisely the vanishing of this cubic form on the integral charge lattice. Reduction modulo a prime makes the same equation the triorthogonality condition used in quantum error correction.

Puncturing \(\nu^c\) gives:

\[
\boxed{[[15,1,3]]_p\quad\text{for every prime }p.}
\]

The dictionary is exact:

| Code datum | Standard-Model datum |
|---|---|
| physical qudit | retained Weyl fermion |
| logical qudit | punctured fermion \(\nu^c\) |
| stabilizer | charge symmetry neutral on \(\nu^c\) |
| logical \(X\) | charge symmetry nonzero on \(\nu^c\) |
| transversal logical phase | cubic anomaly the removed fermion would cancel |
| minimum logical support | neutral four-fermion charge relation containing \(\nu^c\) |

For \(p=2\), raw signs collapse, so the construction retains the sign bits and the all-one word. Their span is \(RM(1,4)\), and its mod-eight weight divisibility supplies the exact transversal \(T\) phase. This binary refinement is stronger than merely reducing the cubic equation modulo two.

## 2. Why this is central to the programme

The paper independently validates four structural choices that had emerged here:

1. **Five bits are structural.** They are the oscillator labels of the \(SO(10)\) spinor, not a numerological encoding imposed after the fact.
2. **The sterile state is a completion coordinate.** The fifteen visible chiral states become an anomaly-free integral shell only with \(\nu^c\); puncturing that state makes it logical rather than physical.
3. **The cubic law survives arithmetic reduction.** One integral object produces compatible shadows at all primes.
4. **Binary data require an integral refinement.** The mod-two shadow alone forgets signs and cubic phases; mod-eight/mod-sixteen divisibility restores the phase information.

These points strongly support the programme’s arithmetic architecture. They do not prove that the five-bit shell is the discriminant module of the \(Spin(2,3)\) carrier, nor do they identify the anomaly cubic with a Jordan cubic norm. Those remain map-building problems.

## 3. What had already been extracted from the paper

The paper entered the corpus in several distinct stages:

- [The initial source audit and Golay integrality gate](../0400-0499/410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md) verified the sixteen weights, cubic identities, triply-even binary span and representative distances.
- [The post-Furey reassessment](../0400-0499/444_prakash_ramya_code_after_the_furey_intertwiner_what_is_now_exact_and_what_remains_open.md) connected the five-bit shell to the exact Furey Cartan/ternary intertwiner.
- [The integral-cubic-to-prime-shadow audit](../0400-0499/496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md) separated the exact arithmetic mechanism from the still-missing \(Spin(2,3)\) map.
- [The two-puncture binary calculation](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md) derived \(T^\dagger\otimes T^\dagger\), its equal-diagonal mod-four lift, and the absence of a mixed logical phase.
- [The meridian-plane analysis](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md) showed that the cubic lattice selects a polarization but not its symplectic completion.

The present document is therefore not another broad summary. It records what the source can and cannot do at the newly exposed \(4+1+2\) frontier.

## 4. The source phase has zero mixed polarization

Puncture both

\[
\nu^c=(0,0,0,0,0),
\qquad
e^c=(0,0,0,1,1).
\]

Let \(a,b\in\mathbb F_2\) be the evaluations at those punctures. Triply-evenness gives the logical phase exponent

\[
f(a,b)=-a-b\pmod8,
\]

so the transversal gate is

\[
T^\dagger\otimes T^\dagger.
\]

The mixed finite difference is

\[
\Delta_a\Delta_b f
=f(1,1)-f(1,0)-f(0,1)+f(0,0)
=0.
\]

Thus the native code phase supplies two equal diagonal lifts but no mutual term. It cannot on its own produce the off-diagonal coefficient required by the positive integral shear

\[
K_+=
\begin{pmatrix}
3&2\\
2&3
\end{pmatrix}.
\]

This is not a defect in the paper. The paper derives a transversal non-Clifford gate from anomaly cancellation; it does not claim to construct the programme’s genus-two mutual sewing operation.

## 5. The independent compatibility-Hessian test

The shell-lift certificate parameterizes each compatible presentation lift by a 17-bit correction vector. At every tested level the continuing solutions form an affine ten-plane \(U\), leaving

\[
Q=\mathbb F_2^{17}/U\cong\mathbb F_2^7.
\]

The observed offsets span

\[
R=\langle e_1,e_2,e_3,e_5,e_6\rangle,
\]

and the stationary quotient is

\[
Q/R=\langle e_0,e_4\rangle.
\]

For every binary lifting stage, the next-stage compatibility syndrome is a quadratic function of the 17 free bits. Polarizing its quadratic part gives a vector-valued alternating Hessian

\[
H_m:\mathbb F_2^{17}\times\mathbb F_2^{17}\longrightarrow\mathcal S_m,
\]

where \(\mathcal S_m\) is the relation-syndrome space at that stage.

To descend to the stationary quotient, \(H_m\) must annihilate the full preimage of \(R\), not merely the selected ten-plane \(U\). The certificate now checks this against all seventeen standard domain directions.

For each of the twelve stages

\[
16\to32,
32\to64,
\ldots,
32768\to65536,
\]

it finds

\[
H_m(\pi^{-1}R,\mathbb F_2^{17})=0.
\]

Therefore \(H_m\) descends legitimately to \(Q/R\). But the only potentially nonzero alternating value on the two-dimensional quotient is

\[
H_m(e_0,e_4),
\]

and the certificate finds

\[
\boxed{H_m(e_0,e_4)=0}
\]

at all twelve stages. Hence the descended Hessian is the zero form.

## 6. Combined verdict

Two mathematically independent polarizations now agree:

\[
\begin{array}{ccl}
\text{code/anomaly phase}&&\Delta_a\Delta_bf=0,\\
\text{lift-compatibility quadratic}&&H_m|_{Q/R}=0.
\end{array}
\]

This closes the most direct route from “cubic structure” to “stationary Heisenberg plane.” A cubic form can generate bilinear data after fixing an argument, and a quadratic compatibility condition can generate an alternating Hessian, but neither operation automatically supplies the required nondegenerate form here.

The correct conclusion is:

\[
\boxed{
\text{the five-bit cubic shell selects arithmetic phase data and a polarization,}
\text{ but not the missing mutual commutator.}}
\]

## 7. Where the pairing can still come from

The no-go narrows the next search to structures that are genuinely relational rather than coordinatewise:

1. **Pauli/Heisenberg commutator.** The CSS logical algebra already possesses a symplectic commutator pairing between \(X\)- and \(Z\)-type operators. What is missing is an equivariant map from the stationary quotient coordinates \(e_0,e_4\) into that phase space.
2. **Integral sewing word.** The exact word
   \[
   T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2}
   \]
   supplies the coefficient-two mutual term that is invisible modulo two. A source-derived reason for this word would solve more than a binary polarization can.
3. **Discriminant/glue pairing.** The two-face lattice glues already carry a nontrivial parity pairing identified with a binary Heisenberg commutator. An explicit transport map from the lift quotient to that glue quotient is now the cleanest finite target.
4. **Jordan-triple or stress-derived bracket.** A ternary product may produce a binary form only after one slot is filled by a canonical carrier, selector or state. This remains open because no such physical selector has yet been derived.

## 8. Updated stop-everything test

A genuine breakthrough would be an equivariant map

\[
\Phi_{\rm stat}:Q/R\longrightarrow V_{\rm H}
\]

such that

\[
\omega_{\rm H}(\Phi_{\rm stat}(e_0),\Phi_{\rm stat}(e_4))=1,
\]

with \(\Phi_{\rm stat}\) derived from field labels, puncture data, lattice glue or a Jordan/stress operation rather than selected by dimension matching.

The following are now falsified routes:

- using the factorized Prakash–Ramya transversal phase as though it contained a mutual term;
- using the quadratic compatibility Hessian as the missing stationary symplectic form;
- declaring any abstract isomorphism \(\mathbb F_2^2\cong Q/R\) to be the physical Clifford identification.

## 9. Current judgement

The paper is a high-value confirmation of the programme’s five-bit, cubic and arithmetic language. It makes precise why anomaly cancellation can be read as exact finite-code consistency and why the sterile-neutrino coordinate functions as a completion/logical state.

But it also sharpens the division of labour:

\[
\boxed{
\begin{aligned}
\text{Prakash–Ramya cubic shell}&:\ \text{anomaly, puncture, diagonal logical phase},\\
\text{missing relational structure}&:\ \text{mutual pairing, symplectic duals, integral sewing}.
\end{aligned}}
\]

That boundary is productive. The cubic branch has not failed; it has reached the point where it must be joined to a distinct commutator or glue structure.

## Certificate

- [Strengthened shell-lift certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Diagonal \(4+1+2\) quotient basis](563_the_four_plus_one_plus_two_flag_diagonalizes_but_theta_and_clifford_identifications_remain_pinned.md)
- [Binary code phase and missing mutual shear](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
- [Glue obstruction as Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
