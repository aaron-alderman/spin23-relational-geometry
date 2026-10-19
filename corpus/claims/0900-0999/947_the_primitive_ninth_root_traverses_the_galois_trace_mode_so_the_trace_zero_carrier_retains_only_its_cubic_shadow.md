# The Primitive Ninth Root Traverses the Galois Trace Mode, so the Trace-Zero Carrier Retains Only Its Cubic Shadow

**Date:** 17 October 2026  
**Branches:** cyclotomic phase, Galois trace-zero carrier, order reduction, compression nonmultiplicativity, common mode, and low-energy selector  
**Claim status:** exact obstruction and exact cubic-shadow mechanism  
**Certificate:** [show_the_ninth_root_traverses_the_galois_trace_mode_while_its_cube_preserves_the_four_carrier.mjs](../../../verification/show/show_the_ninth_root_traverses_the_galois_trace_mode_while_its_cube_preserves_the_four_carrier.mjs)

## Executive result

The canonical Galois trace-zero four-carrier does not carry the primitive ninth-root symmetry. It carries exactly its cube.

Above the cubed character \(\omega\), the three primitive ninth-root eigenvalues are

\[
(\zeta_9,\zeta_9^4,\zeta_9^7)
=
\zeta_9(1,\omega,\omega^2).
\]

Transforming from the three embedding labels to Galois characters gives

\[
F_3^*\operatorname{diag}(\zeta_9,\zeta_9\omega,\zeta_9\omega^2)F_3
=
\zeta_9 S,
\]

where \(S\) is the cyclic shift on the three Galois-character sectors:

\[
\text{trace singlet}
\longrightarrow
\text{first trace-zero character}
\longrightarrow
\text{second trace-zero character}
\longrightarrow
\text{trace singlet}.
\]

Therefore the primitive root necessarily enters and leaves the trace singlet. The trace-zero plane is not invariant under \(C_9\).

But

\[
(\zeta_9S)^3=\omega I_3.
\]

The cube preserves every Galois sector, including the trace-zero plane. Hence

\[
\boxed{
C_9\text{ requires the trace mode},
\qquad
C_3\text{ survives on the trace-zero carrier}.
}

This supplies an exact mechanism for why the four-carrier sees the order-three selector while the anomaly code naturally contains a ninth-root refinement.

## 1. Embedding basis versus Galois-character basis

In the embedding basis, the ninth-root operator is diagonal:

\[
\Lambda
=
\operatorname{diag}(\zeta_9,\zeta_9\omega,\zeta_9\omega^2).
\]

The Galois generator cyclically permutes these three entries. Fourier transformation diagonalizes that permutation, splitting the multiplicity space into:

- the Galois trace singlet;
- two nontrivial Galois characters spanning the real trace-zero \(A_2\) plane.

Multiplication by the character vector \((1,\omega,\omega^2)\) is Fourier-dual to translation. Thus the operator diagonal in embedding space is a shift in Galois-character space.

This is the same orbit/character duality already used for the three-label boundary network, now arising inside the cyclotomic field itself.

## 2. Exact leakage

Let \(P_0\) project onto the Galois trace line and \(P_{A_2}=I-P_0\) onto the trace-zero plane. Then

\[
P_0\Lambda P_{A_2}\neq0,
\qquad
P_{A_2}\Lambda P_0\neq0.
\]

Therefore

\[
[P_{A_2},\Lambda]\neq0.
\]

The compressed operator

\[
P_{A_2}\Lambda P_{A_2}

\]

is not unitary and does not have order nine. More sharply,

\[
(P_{A_2}\Lambda P_{A_2})^3
\neq
P_{A_2}\Lambda^3P_{A_2}.
\]

This is another exact instance of the programme's recurring principle:

\[
\boxed{
\text{compression does not preserve multiplication}.
}

## 3. The cube survives exactly

Since \(S^3=I\),

\[
\Lambda^3=\zeta_9^3I=\omega I.
\]

Consequently

\[
P_{A_2}\Lambda^3P_{A_2}
=
\omega P_{A_2}.
\]

The selected trace-zero plane therefore carries an exact order-three scalar character even though it cannot carry the primitive root that generated it.

Repeating the argument in the conjugate \(\omega^2\) sector gives the four-dimensional carrier action

\[
\omega I_2\oplus\omega^2I_2,

\]

which is the complex spectral form of the real active/handle selector block.

## 4. Why this improves the narrative

Previously there were two facts:

1. the qutrit anomaly code protects a ninth-root logical phase;
2. the integral four-carrier admits only its order-three shadow.

The trace-zero analysis now explains their relation rather than merely juxtaposing them:

\[
\text{primitive phase}
\xrightarrow{\text{Galois Fourier transform}}
\text{three-sector shift including trace mode}
\xrightarrow{\text{trace-mode removal}}
\text{only the cubic phase survives}.
\]

The discarded trace pair is not an arbitrary nuisance. It is the necessary intermediate sector through which the primitive ninth root moves.

## 5. Physical interpretations that remain open

Several mechanisms could remove the trace mode:

- it is heavy and integrated out;
- it is a boundary-only environment port;
- it is gauge redundant;
- it is identified with the sterile-neutrino/neutral handle pair;
- destructive interference makes it dark at the selector checkpoint.

Each mechanism has a different dynamical signature. The algebra alone does not choose among them.

If the trace mode is only approximately decoupled, the ninth-root traversal predicts controlled corrections to the order-three effective rule rather than exact closure.

## 6. Relation to loss and dilation

There are now two distinct common-mode stories:

1. **Cyclotomic trace mode:** required coherently by the primitive ninth-root shift and removed to obtain the trace-zero four-carrier.
2. **Passive-loss common mode:** activated in the Naimark effects when the observed cycle is contractive.

They have the same trivial \(C_3\) character but opposite roles—one is removed in the low-energy cyclotomic reduction, while the other is added by dissipative completion. They must not be identified without a dynamical channel relating them.

A compelling synthesis would show that the eliminated cyclotomic trace mode reappears precisely as the environmental common mode under loss.

## 7. Stop-everything and falsification criteria

**Trace-reappearance trigger:** integrating out the cyclotomic trace pair and reopening the system produces the exact loss-dependent trivial-character effects \(P_0\).

**Schur-complement trigger:** a local block action with the trace mode as mediator yields the passive silver-pole response after Feshbach elimination.

**Neutrino trigger:** the trace pair is identified with the neutral-neutrino handle and its elimination/reinsertion matches puncture versus coherent completion.

**Order-reduction trigger:** the boundary action preserves \(C_3\) while explicitly or spontaneously breaking the full \(C_9\) traversal through the trace sector.

**Invariance falsifier:** the trace-zero plane is claimed to carry the primitive ninth root. Exact leakage proves it does not.

**Mode-identification falsifier:** the cyclotomic and passive-loss common modes have incompatible gauge, reflection or causal typing.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does the ninth root preserve the trace-zero plane? | **no** |
| Does it necessarily traverse the trace singlet? | **yes** |
| Does its cube preserve the trace-zero plane? | **yes, exactly** |
| Does this explain the (C_9\to C_3) reduction? | **yes, algebraically** |
| Is the trace mode's physical identity derived? | **not yet** |

## 9. Position in the corpus

- [Galois-selected trace-zero four-plane](946_galois_covariance_canonically_selects_the_trace_zero_four_plane_and_removes_the_handle_factorization_grassmannian.md)
- [cyclotomic order-162 extension](942_the_order18_selector_is_the_cubed_shadow_of_a_cyclotomic_order162_ninth_root_extension_but_the_root_is_not_integral.md)
- [strict-loss compression no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [orbit/character boundary duality](932_the_dilation_sectors_are_fourier_dual_to_the_a2_root_labels_but_are_not_the_same_three_effect_frame.md)

## Subsequent progress

Document [948](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md) constructs a two-stage environmental realization of each squared lossy response eigenvalue and hence a fixed six-port broadband dilation of one response face.  Its two ordered stage labels have the right dimension to be compared with the Galois trace pair isolated here.  Dimension alone is insufficient: the required reflection action, ninth-root traversal and loss-dependent coupling intertwiner remain to be derived.
