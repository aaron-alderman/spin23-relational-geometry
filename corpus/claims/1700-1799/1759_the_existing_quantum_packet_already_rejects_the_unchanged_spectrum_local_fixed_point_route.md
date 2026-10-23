# The Existing Quantum Packet Already Rejects the Unchanged-Spectrum Local Fixed-Point Route

**Date:** 23 October 2026

**Status:** fixed-point boundary correction and local-route closure

**Depends on:** [the completed quadratic shell](1718_the_completed_quadratic_shell_exhausts_the_frozen_local_critical_pgt_paths.md), [the complete second-class measure](../1600-1699/1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md), and [the earlier fixed-point identifiability boundary](1746_the_fixed_point_escape_is_reduced_to_a_complete_beta_and_matching_packet.md)

**Evidence:** [readiness ledger](../../../evidence/data/spin23-fixed-point-route-readiness-v2.json) and [verifier](../../../verification/verify/verify_spin23_fixed_point_route_readiness_v2.mjs)

## Correction to the remaining-input statement

The corpus does not lack every quantization input.  It contains a frozen
critical-PGT packet, the complete massive-branch second-class measure in its
chosen scheme, and the complete quadratic one-loop pole shell.  What remains
absent is narrower and harder: the full beta functional of a declared
enlarged theory, its simultaneous fixed point, stability matrix, positive
reconstruction and threshold trajectory.

## What the existing packet already decides

On the healthy unchanged-spectrum critical surface, the Weyl-square coupling
is \(c_C=0\).  The packet gives the normal one-loop component

\[
 \boxed{\beta_C={11\over960\pi^2}\ne0.}
\]

This result is measured on a torsionless probe.  Additional operators that
contain explicit torsion vanish there and cannot cancel it at the frozen
one-loop point.  Therefore the local critical surface is not RG invariant.

Resumming a nonzero finite local Weyl-square coefficient gives a spin-two
kernel

\[
 p^2(M_{\rm Pl}^2+c_Cp^2).
\]

For \(c_C>0\),

\[
 {1\over p^2(M_{\rm Pl}^2+c_Cp^2)}
 ={1\over M_{\rm Pl}^2}
 \left({1\over p^2}-{1\over p^2+M_{\rm Pl}^2/c_C}\right),
\]

so the two residues have opposite signs.  Reversing the sign moves the
additional pole to the tachyonic side in the same local convention.  The
unchanged-spectrum local finite-derivative theory therefore cannot be both
fundamental and RG closed.

## What this does not decide

The calculation does not exclude a genuinely enlarged or nonperturbative
completion whose physical spectrum is not obtained by naively resumming the
finite local derivative expansion.  Such a route must specify its theory
space and demonstrate a positive Lorentzian reconstruction.  It must then
calculate the simultaneous fixed point, stability surface and infrared
matching of the axial coupling.  Those objects are not present.

The fixed-point escape is consequently sharper than “quantization packet
absent”: the existing local packet gives a negative result, and only a new
enlarged/nonperturbative definition can reopen the route.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_fixed_point_route_readiness_v2.mjs
~~~
