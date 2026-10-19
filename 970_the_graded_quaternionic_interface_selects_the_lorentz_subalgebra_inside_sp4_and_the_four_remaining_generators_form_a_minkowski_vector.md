# The Graded Quaternionic Interface Selects the Lorentz Subalgebra Inside Sp(4,R) and the Four Remaining Generators Form a Minkowski Vector

**Date:** 18 October 2026  
**Branches:** (Sp(4,\mathbb R)\), (Spin(2,3)), quaternionic sideband interface, Lorentz algebra, symmetric pairs, and Jordan-triple recursion  
**Claim status:** exact Lie-algebra decomposition theorem; physical generation of all ten directions remains open  
**Certificate:** [derive_the_lorentz_symmetric_pair_from_the_graded_quaternionic_interface.mjs](scripts/derive_the_lorentz_symmetric_pair_from_the_graded_quaternionic_interface.mjs)

> **Pairing boundary added 18 October 2026:** this $6+4$ Lorentz decomposition is the Fourier-pairing typing. After transport to the symplectic handle/selector pairing, the same abstract operator has a $4+6$ decomposition with fixed algebra $\mathfrak u(1,1)$. The two roles require an explicit pairing switch; see [document 980](980_the_lorentz_6_plus_4_split_and_the_coherent_handle_lift_are_two_pairing_dependent_roles_not_one_fixed_symplectic_typing.md).

## Executive result

Realify the two-complex-dimensional response carrier as (V=\mathbb R^4). The graded antiunitary of document 969 becomes the real-linear map

\[
\Gamma=\operatorname{diag}(\varepsilon,-\varepsilon),
\qquad
\Gamma^2=-I_4.
\]

For the canonical symplectic form

\[
\Omega=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix},
\]

one has

\[
\Gamma^T\Omega\Gamma=-\Omega.
\]

Thus (Gamma) is an anti-symplectic complex structure. Conjugation by (Gamma) is nevertheless an involutive automorphism of (mathfrak{sp}(4,\mathbb R)), because (Gamma^2=-I) is central. Its eigenspace decomposition is

\[
\boxed{
\mathfrak{sp}(4,\mathbb R)=\mathfrak k\oplus\mathfrak p,
\qquad
\dim\mathfrak k=6,
\quad
\dim\mathfrak p=4.
}
\]

The brackets obey

\[
[\mathfrak k,\mathfrak k]\subset\mathfrak k,
\qquad
[\mathfrak k,\mathfrak p]\subset\mathfrak p,
\qquad
[\mathfrak p,\mathfrak p]\subset\mathfrak k.
\]

Moreover,

\[
\boxed{
\mathfrak k\cong\mathfrak{sl}(2,\mathbb C)_{\mathbb R}
\cong\mathfrak{so}(1,3),
}
\]

while the invariant trace/Killing form on (mathfrak p) has signature ((3,1)). Under

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3),
\]

(mathfrak p) is exactly the Lorentz four-vector/AdS-translation sector.

## 1. Why the fixed algebra is Lorentz

Regarding (Gamma) as multiplication by (i) makes (V) a complex two-space. Since (Gamma) is anti-symplectic, the real symplectic form is the real part of a complex alternating two-form. Symplectic transformations commuting with (Gamma) are therefore the complex symplectic group in dimension two:

\[
Sp(2,\mathbb C)=SL(2,\mathbb C).
\]

Its real Lie algebra has dimension six and is the spin algebra of Lorentzian four-space.

This is not a dimension coincidence; it is the centralizer theorem for an anti-symplectic complex structure.

## 2. The four-dimensional complement

An explicit (-1)-eigenbasis for conjugation by (Gamma) has trace-form Gram matrix

\[
\begin{pmatrix}
4&0&0&0\\
0&4&0&0\\
0&0&0&2\\
0&0&2&0
\end{pmatrix},
\]

whose signature is ((3,1)). The fixed algebra acts on this complement by the ordinary Lorentz vector representation.

Consequently the graded sideband interface itself selects the internal decomposition

\[
\mathfrak{so}(2,3)
=
\mathfrak{so}(1,3)
\oplus
\mathbb R^{1,3}.
\]

This is the symmetric-space decomposition of anti-de Sitter algebra into Lorentz rotations and four transvections.

## 3. Relation to Jordan-triple recursion

The Tits–Kantor–Koecher route already supplies

\[
\operatorname{co}(\operatorname{Sym}_2\mathbb R)
\cong\mathfrak{sp}(4,\mathbb R).
\]

The new result adds the previously missing physical selector inside that algebra: the graded sideband/Pfaffian interface chooses the Lorentz real form and its four-vector complement.

The chain is now

\[
\text{Jordan triple recursion}
\Longrightarrow
\mathfrak{sp}(4,\mathbb R)
\xrightarrow{\operatorname{Ad}_\Gamma}
\mathfrak{so}(1,3)\oplus\mathbb R^{1,3}.
\]

What remains is to show that the actual response, Higgs and mediator generators populate all ten directions rather than merely living consistently inside this decomposition.

## 4. Stop-everything and falsification criteria

**Closure trigger:** the physically derived face, handle and Jordan-triple generators have Lie closure of dimension ten.

**Lorentz trigger:** their six (Gamma)-even generators match independently identified Lorentz transformations on observables.

**Vector trigger:** their four (Gamma)-odd generators transform with the computed Minkowski metric and acquire a spacetime/translation interpretation.

**Real-form falsifier:** the invariant form on the complement is not Lorentzian after the physically required symplectic typing.

**Generation warning:** identifying the ambient symmetric pair does not prove the physical generator set spans it.

## 5. Verdict

| Question | Verdict |
|---|---|
| Is realified (Gamma) an anti-symplectic complex structure? | **yes** |
| Does its adjoint action split (mathfrak{sp}(4,\mathbb R)) as (6+4)? | **yes** |
| Is the fixed algebra (mathfrak{so}(1,3))? | **yes** |
| Does the complement carry signature ((3,1))? | **yes** |
| Does this match the Lorentz-plus-vector split of (mathfrak{so}(2,3))? | **yes** |
| Do the current physical generators span all ten directions? | **not yet** |

## 6. Position in the corpus

- [graded sideband quaternionic interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [Peirce–Schur triple recursion to Spin(2,3)](202_peirce_schur_triple_recursion_to_spin23.md)
- [relational-carrier Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
- [realified twist/handle boundary](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
