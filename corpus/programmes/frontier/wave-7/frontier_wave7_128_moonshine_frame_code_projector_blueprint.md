# Frontier Wave 7.128: A Finite Code-Projector Blueprint for the Moonshine Frame

**Date:** 25 October 2026

**Status:** executable finite code layer; VOA extension and chiral dynamics open

**Evidence:** [code-projector record](../../../../evidence/data/moonshine-frame-code-projector-blueprint-v1.json)

**Certificate:** [weight-enumerator/projector verifier](../../../../verification/verify/verify_moonshine_frame_code_projector_blueprint.mjs)

## Result

The distinguished 48-Ising Moonshine frame has a small executable control
layer. Its \(1/16\)-code \(D\) has only seven independent generators, and the
\(1/2\)-code is \(C=D^\perp\), of dimension 41. Membership in \(C\) can
therefore be imposed by seven commuting parity checks:

\[
 P_C={1\over2^7}\sum_{d\in D}Z^d.
\]

The certificate constructs the published generator basis and obtains

\[
 W_D(x)=1+3x^{16}+120x^{24}+3x^{32}+x^{48}.
\]

Every weight is divisible by eight, as required for the triply-even
\(1/16\)-code. A MacWilliams transform independently gives the dual
enumerator, \(\dim C=41\), minimum weight four, and 3300 weight-four words.

## 1. Minimal digital layer

A direct parity-measurement implementation uses:

- 48 data qubits for one binary frame slice;
- seven ancillas for a parallel syndrome round;
- generator weights \(16,16,48,24,24,24,24\); and
- 176 naive data--ancilla entangling gates per round.

This realizes a \(2^{41}\)-dimensional computational code subspace without
enumerating it. The full projector has only 128 Pauli terms. These numbers are
not a fault-tolerant resource estimate; they are an exact upper-level circuit
specification from which hardware compilation can begin.

## 2. What the projector does not do

The binary projector realizes only the code-subVOA selection rule. The
Moonshine VOA also contains 128 \(D\)-labelled simple-current/twisted sectors
and their intertwiner phases. A weight enumerator does not specify those
multiplication maps. Nor does a finite-qubit code projector establish a
critical, holomorphic or chiral scaling limit.

The construction ladder is therefore:

1. implement and verify the seven checks;
2. attach 48 critical Ising transfer tensors;
3. implement the \(D\)-sector extension and its phases;
4. verify modular closure, holomorphicity and \(V_1=0\);
5. implement the necessarily non-permutation \(23AB\) defect.

The first step is executable now. Steps 2--5 are the physics, rather than
details hidden inside the word “code.”

## 3. Experimental readout

The immediate observables are all syndrome probabilities, logical-sector
populations and the projector expectation \(\langle P_C\rangle\). The next
transfer-matrix observables are the first character coefficients and the
finite-size central charge. Only after those pass should the experiment spend
resources on order-23 twining or the much smaller connected order-46 signal.
This ordering makes failure cheap and interpretable.

## Sources and corpus links

- Dong, Griess and Höhn, [*Framed vertex operator algebras, codes and the moonshine module*](https://arxiv.org/abs/q-alg/9707008).
- [Framed-Ising provenance route](frontier_wave7_126_framed_ising_route_to_a_physical_monster.md)
- [Order-23 frame-permutation no-go](frontier_wave7_127_moonshine_frame_order23_permutation_no_go.md)
