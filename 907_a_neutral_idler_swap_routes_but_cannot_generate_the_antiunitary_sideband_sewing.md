# A Neutral Idler Swap Routes but Cannot Generate the Antiunitary Sideband Sewing

**Date:** 17 October 2026  
**Branches:** sideband reality, dilation theory, complete positivity, neutral boundary ports, and active $A_2$ monodromy  
**Claim status:** exact no-go for noiseless deterministic unitary dilation of conjugation  
**Certificate:** [prove_a_neutral_idler_swap_cannot_by_itself_dilate_exact_antiunitary_sideband_sewing.mjs](scripts/prove_a_neutral_idler_swap_cannot_by_itself_dilate_exact_antiunitary_sideband_sewing.mjs)

## Executive result

Document 906 identified two independent neutral modes as the smallest space on which the exchange matrix $X$ is an ordinary passive unitary. That statement is correct, but it is not yet a dilation of the antiunitary sewing $XK$.

A unitary swap can route a conjugate sideband which is already present. It cannot generate complex conjugation from an arbitrary input and a fixed idler state. The obstruction is exact:

\[
T(iz)=iT(z)
\]

for every complex-linear unitary-plus-projection map, whereas

\[
K(iz)=-iK(z).
\]

At the quantum-channel level the same statement is the failure of complete positivity: transposition has the swap operator as its Choi matrix, and the antisymmetric vector has Choi eigenvalue $-1$.

Therefore exact $XK$ remains irreducible real-structure or boundary data. An idler implementation must do one of three more explicit things:

1. receive the conjugate sideband from a real source or a second boundary port and merely route it;
2. implement approximate/noisy phase conjugation;
3. use measurement, classical feed-forward or postselection, thereby leaving the class of closed deterministic unitary evolution.

The exact $C_3$ theorem survives unchanged as boundary monodromy. The naive passive-idler device interpretation does not.

## 1. The complex-linearity obstruction

Let an input amplitude $z$ be coupled to an ancilla in a fixed state, evolved by a complex-linear unitary $U$, and read through a complex-linear output projection $P$. The induced amplitude map has the form

\[
Tz=P,U(z\oplus a_0).
\]

After separating any fixed displacement, its input-dependent part is complex-linear. Hence $T(iz)=iT(z)$.

No such map can equal $K:z\mapsto\bar z$ on all inputs because

\[
\overline{iz}=-i\bar z.
\]

This is independent of the number of finite ancillary modes. Adding more passive ports does not change the category of the map.

## 2. What the two-mode swap actually does

Define the real-linear sideband embedding

\[
E(z)=(z,\bar z).
\]

Then the ordinary two-mode swap gives

\[
X E(z)=(\bar z,z).
\]

This is a perfectly valid routing identity. But the conjugate amplitude entered through $E$ before the swap. The physical real-time constraint, a real source, or a phase-conjugating preparation stage has already supplied the anti-linear information.

The swap therefore dilates the **routing of two sideband ports**, not conjugation itself.

## 3. Quantum-channel obstruction

For a two-level subsystem, the Choi matrix of transposition is the flip operator

\[
F=\sum_{ij}|i\rangle\langle j|\otimes|j\rangle\langle i|.
\]

On the antisymmetric vector

\[
|\psi_-\rangle=\frac{|01\rangle-|10\rangle}{\sqrt2},
\]

it has eigenvalue $-1$. Thus transposition is not completely positive. It cannot be obtained as a deterministic quantum channel by unitary interaction with a fixed environment followed by discarding the environment.

For bosonic amplitudes this agrees with the document-906 paraunitary obstruction. Exact noiseless phase conjugation is not a closed passive Gaussian channel.

## 4. Correct physical interpretations

### 4.1 Real boundary condition

The cleanest exact interpretation remains

\[
a_-(-\omega)=\overline{a_+(\omega)}.
\]

Both sidebands are boundary values of one real response. $XK$ expresses the gluing rule and is not a time-evolution operator.

### 4.2 Two supplied ports

A real source may physically present positive- and negative-frequency ports already satisfying the conjugacy constraint. A passive network may swap or mix those ports. This realizes the document-904 cascade as a driven scattering protocol, but the source/boundary supplies the real structure.

### 4.3 Noisy or measured phase conjugation

An active apparatus may approximate conjugation with added noise, or perform it conditionally using measurement and feed-forward. Such a construction must propagate its noise or success probability through the rational-inner cycle before it can claim the exact finite-order operation.

## 5. Consequence for the Jordan-triple programme

The current exact chain is now:

\[
\text{real response boundary}
\xrightarrow{\;XK\;}
\text{opposite analytic face}
\xrightarrow{\;h\chi\text{ twist and rational-inner propagation}\;}
C_{A_2}.
\]

This strengthens the relational reading. The middle operation is not hidden Hamiltonian evolution on one carrier; it is a gluing law between two faces of a real carrier. The “one carrier, two faces, one twist” language is literal at the level of real structure.

What remains open is a local boundary action that imposes this gluing, not a larger passive unitary that manufactures anti-linearity.

## 6. Stop-everything and falsification criteria

**Boundary-action trigger:** derive a local real boundary term whose Euler--Lagrange or matching condition is the required $XK$ sewing.

**Supplied-port trigger:** exhibit a neutral scattering geometry in which the two incident ports are physically constrained by real-time conjugacy and the document-904 cascade acts linearly on the doubled port space.

**Noisy-device trigger:** compute a completely positive phase-conjugating channel and show that its unavoidable noise vanishes from, or is controlled in, the selected relational observable.

**Linearity falsifier:** claim that a complex-linear unitary with fixed ancilla generates $z\mapsto\bar z$ for every $z$.

**CP falsifier:** claim an exact deterministic quantum transpose channel without addressing its negative Choi eigenvalue.

**Counting falsifier:** count the supplied conjugate port both as constrained real-response data and as an independent particle.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is a swap unitary on two independent neutral modes? | **yes** |
| Does that swap generate the conjugate amplitude? | **no** |
| Can any fixed-ancilla complex-linear unitary generate exact $K$? | **no** |
| Is exact transposition a deterministic quantum channel? | **no; it is not completely positive** |
| Can a passive network route already supplied conjugate ports? | **yes** |
| Does the boundary-monodromy $C_3$ result survive? | **yes** |

## 8. Position in the corpus

- [single-mode canonical classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
- [exact sideband-reversing Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [real-time sideband completion](781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [gauge-compatible neutral-response placement](905_the_sideband_reversing_a2_cycle_is_gauge_compatible_only_downstream_of_higgs_dressing_and_color_contraction.md)
