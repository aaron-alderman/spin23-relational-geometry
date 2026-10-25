# Frontier Wave 7.157: Finite-Qudit Leech Channel Mixer

**Date:** 25 October 2026

**Status:** exact digital finite-register surrogate; continuum and laboratory limits open

**Evidence:** [finite-qudit mixer record](../../../../evidence/data/leech-finite-qudit-channel-mixer-v1.json)

**Certificate:** [modular canonical-map verifier](../../../../verification/verify/verify_leech_finite_qudit_channel_mixer.mjs)

## Result

The integral basis change from Wave 7.139 can be implemented on finite
registers without leaving the admissible compact-variable arithmetic. Choose
the prime qudit dimension \(p=853\), the first prime above
\(2\max |(K^{-1})_{ij}|=844\), and define

\[
 W=K^{-1}\pmod {853}.
\]

Because \(\det K=1\), this inverse exists modulo every integer. On 24
position registers and their Weyl-dual momentum labels, use

\[
 n\longmapsto Wn,\qquad m\longmapsto K^T m .
\]

The verifier checks \(W^TK^T=I\pmod {853}\), so the finite Weyl pairing and
therefore the canonical commutation phase are preserved. It also checks

\[
 W^T K=I\pmod {853},
\]

so the 24 original Leech interaction columns become 24 single-channel
labels exactly, now on a finite Hilbert space.

## Compiled resource count

Modular Gaussian elimination reduces \(W\) to the identity using:

| primitive | count per 24-channel chiral block |
|---|---:|
| channel swaps | 0 |
| nonzero single-qudit scales | 24 |
| two-qudit controlled modular additions | 531 |
| **total linear qudit gates** | **555** |

A direct binary register allocation needs at most ten qubits per 853-level
qudit, or 240 qubits per chiral block. This is a register count, not a claim
that an arbitrary 853-level scale or addition is one native qubit gate.

Wave 7.158 supplies a necessary correction to the interpretation of that
count. Dimension 853 represents every matrix coefficient, but it aliases some
simultaneous channel inputs: a unit-cube sign vector with exact output 2579
decodes as 20. The first prime satisfying the worst-case wrap-free \(N=1\)
bound is 5167, requiring 312 binary qubits per block. Thus the 240-qubit
figure belongs only to coefficient-faithful modular emulation.

## What this closes

The channel-mixing instruction is no longer an unspecified \(GL(24,\mathbb
Z)\) box. It is a finite, reproducible circuit over one- and two-register
linear gates. Together with the diagonal two-field cosines, it supplies an
executable digital surrogate for the Gate-A Leech interaction layer.

What remains is the genuinely physical limit. Modulo-853 arithmetic wraps
large rotor occupations; a candidate must demonstrate convergence as the
qudit dimension and wire length grow, retain a bulk gap, and recover 24
chiral edge modes with the Leech Gram form. Nor does a circuit compilation
make the mixer spatially local in a particular material. Thus this advances
the simulator path while refusing to relabel it as a realized Leech phase.

## Corpus links

- [Explicit Leech \(K\)-matrix](frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
- [Integral dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Wrap-free rotor-cutoff ladder](frontier_wave7_158_leech_wrap_free_rotor_cutoff_ladder.md)
