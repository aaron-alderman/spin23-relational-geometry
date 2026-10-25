# Frontier Wave 7.143: Moonshine Twisted-Sector Resource Compiler

**Date:** 25 October 2026

**Status:** exact orbifold resource count; same-carrier module realization open

**Evidence:** [twisted-sector resource record](../../../../evidence/data/moonshine-twisted-sector-resource-compiler-v1.json)

**Certificate:** [weight, degeneracy and twist-resource verifier](../../../../verification/verify/verify_moonshine_twisted_sector_resource_compiler.mjs)

## Result

The apparently enormous 98304-dimensional twisted contribution at Monster
weight two has a small structured compiler:

\[
98304=4096\times24=2^{12}\times24.
\]

Inverting 24 chiral bosons gives twisted ground conformal weight
\(24/16=3/2\) and a \(2^{12}=4096\)-dimensional ground space. In the selected
Moonshine extension, the raw weight-\(3/2\) contribution is projected out.
Acting with one half-integer oscillator raises the retained states to weight
two, and its 24 channel choices give

\[
4096\times24=98304.
\]

Together with the 98580-dimensional invariant untwisted contribution this
recovers the full \(196884\)-dimensional weight-two space.

## Physical resource target

The surface-code interface toy now supplies a finite analogue of the spinor
factor. For \(2n\) e/m junctions at fixed parity the protected fusion space
has dimension \(2^{n-1}\). Taking 26 junctions gives 13 pairs, 12 logical
qubits and dimension 4096. Coherently coupling that fusion space to one of 24
Leech edge channels gives the correct 98304 resource count.

This suggests a staged P3C experiment:

1. prepare 26 alternating e/m junctions at fixed total parity;
2. verify the 4096-dimensional space by pair removal and dimension halving;
3. couple it to a 24-way edge-channel selector;
4. show that projection removes the \(h=3/2\) onset and retains \(h=2\);
5. measure the \(98580+98304\) split on the same gauged Leech carrier.

## Boundary

The orbifold factorization and conformal weights are exact. The 26-junction
surface-code construction is a resource analogue, not an identification of
its Majorana fusion space with the Leech twisted module. Equal dimension is
necessary but radically insufficient. Promotion still requires the correct
operator multiplication, modular sector data, current removal and a
same-carrier map from junction states to twisted vertex operators.

[Wave 7.144](frontier_wave7_144_leech_twisted_ground_pauli_bridge.md)
advances this from a dimension match to an explicit finite-group match:
reducing the recorded Leech matrix modulo two and normalizing its quadratic
symplectic basis maps its 24 generators to the \(X_i,Z_i\) presentation of the
twelve protected qubits. The lift to full twisted-VOA multiplication remains
open.

The gain is practical: P3C is no longer “somehow create 98304 states.” It is
“protect twelve logical qubits, couple one 24-channel half-mode, impose the
correct parity projection, and then test the extension algebra.”

## Corpus links

- [Leech–Monster condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
- [Surface-code interface toy](frontier_wave7_133_condensation_interface_surface_code_toy.md)
- [Gauged Leech array](frontier_wave7_142_gauged_leech_dual_basis_null_vector_array.md)
- [Current ladder and sector split](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
