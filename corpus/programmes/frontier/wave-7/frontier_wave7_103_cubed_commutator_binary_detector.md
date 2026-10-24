# Frontier Wave 7.103: The Cubed-Commutator Binary Detector

**Date:** 25 October 2026
**Status:** exact unitary implementation of the binary character
**Certificate:** [cubed-commutator verifier](../../../../verification/verify/verify_cubed_commutator_binary_detector.mjs)

## Result

The binary record character introduced in Waves 7.92 and 7.95 has a direct
unitary implementation.  It is the cube map on the sixth-root phase group:

\[
\boxed{
\chi:\mu_6\longrightarrow\mu_2,
\qquad
\chi(z)=z^3.
}
\]

For two ordered Weyl operations (U,V), form their group commutator

\[
C(U,V)=UVU^\dagger V^\dagger.
\]

On the combined qubit--qutrit Weyl carrier this is central and lies in
μ₆.  Repeating the same commutator loop three times implements

\[
C(U,V)^3=\chi(C(U,V))\in\{+I,-I\}.
\]

Consequently:

\[
(-I_2)^3=-I_2,
\qquad
(\omega I_3)^3=(\omega^2I_3)^3=+I_3.
\]

The detector therefore retains the qubit order sign and erases the qutrit
cubic phase without a nonlinear measurement rule, fitted threshold or prior
knowledge of the phase label.

## 1. Circuit

The operational sequence is:

1. prepare a control ancilla in |\(+\rangle);
2. on its |1⟩ branch, apply
   (UVU^\dagger V^\dagger) three times;
3. measure the ancilla in the (X) basis.

Because the cubed loop is the scalar ±(I), the result is independent of the
qutrit--qubit system state in the ideal Weyl model:

\[
\langle X_{\rm anc}\rangle
=
\begin{cases}
-1,&[u,v]_2=1,\\
+1,&[u,v]_2=0.
\end{cases}
\]

The qutrit symplectic pairing does not appear.  No tomography of the system
state is needed for the binary port.

## 2. Phase-complete control port

The single, uncubed commutator loop should be retained as a second port.
Ancilla (X) and (Y) quadratures recover

\[
(\operatorname{Re}z,\operatorname{Im}z),
\qquad z\in\mu_6.
\]

For qutrit phases this gives

\[
\omega:\left(-\frac12,+\frac{\sqrt3}{2}\right),
\qquad
\omega^2:\left(-\frac12,-\frac{\sqrt3}{2}\right),
\]

while the cubed port gives (+1) for both.  For a Pauli anticommuting pair,
the uncubed and cubed ports both give −1.

Running both ports proves that qutrit order information is present and then
deliberately quotiented.  This is stronger than observing only a binary null,
which could result from dephasing or detector failure.

## 3. Combined cross-prime formula

For labels ((u,a),(v,b)\in\mathbb F_2^2\oplus\mathbb F_3^2), Wave 7.95 found

\[
C=\zeta_6^{3[u,v]_2+2[a,b]_3}.
\]

Cubing gives

\[
C^3
=\zeta_6^{9[u,v]_2+6[a,b]_3}
=(-1)^{[u,v]_2}.
\]

The qutrit term vanishes identically modulo six.  Thus the circuit implements
the primary projection directly on the joint carrier rather than measuring
the endpoints separately and combining classical labels afterward.

## 4. Error signatures

The ideal output is discrete, so deviations have diagnostic meaning:

| observed behavior | likely interpretation |
|---|---|
| uncubed qutrit phase present; cubed output +1 | desired character implementation |
| both ports lose qutrit phase | ordinary dephasing or control error, not a demonstrated quotient |
| cubed qutrit output differs from +1 | noncentral phase, gate-dependent error or non-Weyl read algebra |
| Pauli cubed output differs from −1 | qubit commutator loop is not faithfully implemented |
| system-state dependence in cubed output | commutator is not central on the realized carrier |

This converts the earlier algebraic firewall into a calibrated hardware test.

## 5. Consequence for the record benchmark

The three additional records now have an operational source: the three
unordered pairs of the three nonidentity qubit Weyl directions each yield
−1 at the cubed port.  All qutrit Weyl commutator phases yield +1 there.

The (169+3) rule therefore no longer requires an abstract detector that
somehow recognizes group type.  It requires one fixed loop operation and a
third power.

The remaining assumptions are narrower:

- physical reads must be coherent ordered Weyl operations;
- their commutators must remain central to the required accuracy;
- the record census must use the cubed port as its additional binary channel.

## Verdict

The sign-only detector is physically implementable as a cubed commutator
loop.  This closes the largest operational gap in the finite (172)-record
kernel.  It does not close the Maxwell-normalization no-go, but it makes the
finite benchmark substantially more realistic and sharply falsifiable.

## Corpus anchors

- [binary record character](frontier_wave7_92_chain_theory_z6_binary_record_character.md)
- [CRT Weyl sewing](frontier_wave7_95_chain_theory_crt_weyl_sewing.md)
- [record-POVM benchmark](frontier_wave7_102_chain_theory_record_povm_benchmark.md)
- [cross-prime phase module](../../../claims/0500-0599/506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
