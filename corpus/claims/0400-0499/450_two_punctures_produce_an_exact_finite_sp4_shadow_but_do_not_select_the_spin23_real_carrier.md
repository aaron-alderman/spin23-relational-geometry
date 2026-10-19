# Two Punctures Produce an Exact Finite (Sp(4)) Shadow but Do Not Select the (Spin(2,3)) Real Carrier

**Date:** 17 October 2026  
**Primary source:** Prakash and Ramya, [arXiv:2610.21879v1, Supplemental Part C.7](https://arxiv.org/html/2610.21879v1)  
**Branches:** B01, B04, B07, B09, B10, B12 and B14  
**Claim status:** exact finite symplectic kinematics; physical gate realization, arithmetic lift and real-form selection remain open

## 1. Why the two-puncture result matters

Prakash and Ramya show that removing any two fermion coordinates from the sixteen-weight system gives a

\[
[[14,2,2]]_p
\]

code for every prime \(p\). It therefore encodes two logical qudits.

The Pauli exponents of two \(p\)-level logical systems form a four-dimensional vector space

\[
V_p=\mathbb F_p^4
\]

with its canonical alternating commutator form. This supplies an exact finite version of the dimension and symplectic structure sought in the continuous carrier programme.

## 2. Logical Pauli phase space

Write a logical Pauli operator, modulo phase, by

\[
v=(x_1,x_2,z_1,z_2)\in\mathbb F_p^4.
\]

Two operators commute up to the phase determined by

\[
\omega(v,w)
=x_1w_{z_1}+x_2w_{z_2}
-z_1w_{x_1}-z_2w_{x_2}.
\]

In matrix form,

\[
\omega(v,w)=v^TJw,
\qquad
J=
\begin{pmatrix}
0&I_2\\
-I_2&0
\end{pmatrix}.
\]

The full linear automorphism group preserving this commutator pairing is

\[
\boxed{Sp(4,\mathbb F_p).}
\]

## 3. Executable finite-group check

The certificate constructs symplectic transvections

\[
T_v(x)=x+\omega(x,v)v
\]

and closes the generated matrix group for \(p=2\) and \(p=3\). It obtains

\[
|Sp(4,\mathbb F_2)|=720,
\]

and

\[
|Sp(4,\mathbb F_3)|=51840,
\]

in agreement with

\[
|Sp(4,\mathbb F_p)|
=p^4(p^2-1)(p^4-1).
\]

Every generated matrix is checked against \(M^TJM=J\).

## 4. The exact (B_2=C_2) shadow

The algebraic root systems \(B_2\) and \(C_2\) are isomorphic. Over odd finite fields this appears as the finite-type identification

\[
Spin(5,\mathbb F_p)\cong Sp(4,\mathbb F_p)
\]

at the appropriate simply connected group level.

Over the reals, the programme's central identity is

\[
Spin_0(2,3)\cong Sp(4,\mathbb R).
\]

Thus the two-logical phase space is an exact finite-field shadow of the same complex/algebraic group type.

That is a real mathematical connection, not merely a dimension match.

## 5. Why this is not yet a derivation of (Spin_0(2,3))

Several major steps are missing.

### 5.1 Finite fields have no Lorentzian signature choice

Reduction modulo \(p\) forgets the distinction among real forms. The finite group does not choose between compact \(Spin(5)\), noncompact \(Spin(2,3)\), or another real-form interpretation before reduction.

### 5.2 Abstract logical automorphisms are not implemented gates

The symplectic group is the automorphism group of two-qudit Pauli commutation kinematics. The code does not thereby implement every element transversally or dynamically. One must compute the actual encoded Clifford, monomial and transversal gate groups.

### 5.3 No positive cone has been selected

The \(Spin_0(2,3)\) carrier in this programme arises through the conformal/automorphism structure of a positive \(H_2(\mathbb R)\) Jordan cone or equivalent real symplectic response. A finite alternating space has no order cone, spectral positivity or causal orientation.

### 5.4 Two punctures are not physically canonical

Gauge neutrality singles out \(\nu^c\) as the first puncture. Every other one-generation fermion is Standard-Model charged. A second literal puncture reduces the gauge stabilizer and is not selected by the observed low-energy spectrum.

### 5.5 The construction is universal

Every two-qudit stabilizer system has a four-dimensional finite symplectic Pauli space. The presence of \(Sp(4,\mathbb F_p)\) alone is not specific evidence for spacetime or gravity.

## 6. The credible arithmetic lifting problem

The meaningful next question is not whether \(Sp(4,\mathbb F_p)\) exists. It is whether the code supplies a compatible family of **physically implemented** operations for many primes that lifts to an integral symplectic group:

\[
\Gamma\subseteq Sp(4,\mathbb Z)
\longrightarrow
Sp(4,\mathbb F_p).
\]

A serious bridge would require:

1. an integral logical lattice \(L\cong\mathbb Z^4\);
2. a prime-independent alternating form on \(L\);
3. code-derived operations reducing compatibly modulo many primes;
4. a sufficiently large, ideally Zariski-dense, subgroup \(\Gamma\);
5. positivity or passivity selecting the noncompact real action on the \(H_2(\mathbb R)\) domain.

Only the last step distinguishes the physical \(Spin_0(2,3)\) carrier from an abstract arithmetic symplectic system.

## 7. Relation to Jordan-triple recursion

The two routes now have a common middle object:

\[
\begin{array}{ccc}
\text{Jordan-triple recursion}
&\longrightarrow&
Sp(4,\mathbb R)\\[4pt]
&&\uparrow\text{ real/arithmetic lift?}\\[-2pt]
\text{two-puncture code}
&\longrightarrow&
Sp(4,\mathbb F_p).
\end{array}
\]

The upper arrow is exact and continuous; the lower arrow is exact and finite. The vertical arrow is the new research problem.

This is substantially sharper than saying that both constructions “involve phase space.”

## 8. Branch decision

- **Closed:** two logical qudits have the canonical phase space \(\mathbb F_p^4\).
- **Closed:** its full linear commutator automorphism group is \(Sp(4,\mathbb F_p)\).
- **Closed:** explicit transvections generate the full groups for \(p=2,3\) with orders 720 and 51840.
- **Closed:** the finite group is of the same \(B_2=C_2\) algebraic type as the continuous carrier.
- **Open:** actual code-implemented symplectic subgroup.
- **Open:** compatible integral lift across primes.
- **Open:** a physical second logical coordinate that does not amount to removing a charged observed fermion.
- **Open:** positivity and real-form selection.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** code automorphisms or transversal operations across primes lift to a Zariski-dense subgroup of \(Sp(4,\mathbb Z)\), while the same response-positivity principle already found in the Jordan branch selects its \(Sp(4,\mathbb R)\) action.

**Physical-coordinate trigger:** a second logical coordinate arises as a gauge-neutral relational port or composite rather than a missing charged fermion.

**Universality falsifier:** abstract two-qudit Pauli kinematics is presented as a Standard-Model-specific prediction.

**Real-form falsifier:** \(Sp(4,\mathbb F_p)\) is claimed to determine Lorentzian signature or a positive cone.

**Gate falsifier:** the full abstract symplectic group is called a code symmetry without constructing its encoded operations.

## 10. Certificate

The [two-logical finite-symplectic certificate](../../../verification/verify/verify_two_logical_qudits_have_sp4_finite_symplectic_phase_space.mjs) constructs the alternating form, generates the full \(p=2,3\) symplectic groups by transvections, verifies every group element and checks the exact order formula.

## Companion documents

- [Exact Jordan-triple to \(Sp(4,\mathbb R)\) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Global \(Sp(4,\mathbb R)\cong Spin_0(2,3)\)](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
- [Standard-Model triorthogonal-code bridge](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Braid congruence finite shadows](../0100-0199/140_braid_congruence_reductions_and_finite_shadows.md)
- [Response to contracting-scattering coordinates](../0000-0099/68_jordan_response_to_contracting_scattering.md)
