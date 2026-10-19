# Level-Three Torus Theta Quantization Is Exactly the Nine-State \(A_2\) Weil Carrier, but Level Three Remains Physical Input

**Date:** 19 October 2026  
**Branches:** compact phase/flux torus, geometric quantization, theta basis, finite Heisenberg group, \(A_2\) discriminant module, physical level selection  
**Claim status:** exact representation-level identification after a polarized lattice map; physical compactness and level-three selection remain open

## Executive result

The compact escape selected by document 1165 works exactly.

Let

\[
\mathcal A_Z=\mathbb C^2/(\mathbb Z^2+Z\mathbb Z^2),
\qquad Z\in\mathfrak H_2,
\]

be a principally polarized Abelian surface, and quantize the third tensor power of its polarization line bundle. Then

\[
\dim H^0(\mathcal A_Z,L^3)=3^2=9.
\]

A theta basis is labelled by

\[
\mu=(\mu_1,\mu_2)\in(\mathbb Z/3)^2.
\]

After identifying each coordinate \(\mathbb Z/3\) with

\[
D=A_2^*/A_2\cong\mathbb Z/3,
\]

the basis map \(\Theta_\mu^{(3)}\mapsto\mathfrak e_\mu\) gives

\[
H^0(\mathcal A_Z,L^3)\cong\mathbb C[D^2].
\]

This is not only a dimension count. In the same basis:

- torus translations are the two-qutrit Weyl operators;
- polarization exchange is the discrete Fourier transform;
- integral symplectic shears are finite quadratic chirps;
- the two self twists have phases \(\omega^{a^2}\) and \(\omega^{b^2}\);
- the sum-cycle twist has phase \(\omega^{(a+b)^2}\);
- dividing by the two self twists gives the mutual phase \(\omega^{2ab}\).

Thus the level-three compact torus representation and the genus-two \(A_2\) Weil representation are the same finite Heisenberg/Weil representation once their polarized exponent lattices are identified.

The no-go of document 1165 is resolved by changing the physical phase space, not by finding a hidden nine-dimensional \(L^2(\mathbb R^2)\) sector.

What remains is also exact: neither \(Sp(4,\mathbb R)\), Jordan positivity nor compactness alone selects level three. In the principal-torus construction the integer is the symplectic flux/Chern class. A second route, through the order-three \(A_2\) discriminant, is distinguished in document 1167.

## 1. The nine theta states

For \(\mu\in(\mathbb Z/3)^2\), a standard level-three theta section may be written schematically as

\[
\Theta_\mu^{(3)}(z,Z)
=
\sum_{n\in\mathbb Z^2}
\exp\!\left[
3\pi i(n+\mu/3)^TZ(n+\mu/3)
+6\pi i(n+\mu/3)^Tz
\right].
\]

The common automorphy prefactor depends on trivialization, but the label set is always \(\mathbb Z^2/3\mathbb Z^2\). Riemann–Roch gives \(h^0(L^3)=3^2\). The compact model therefore produces nine quantum states directly; it does not truncate an infinite Schrödinger Hilbert space after quantization.

## 2. Finite Stone–von Neumann uniqueness

Let

\[
V_3=(\mathbb Z/3)^2_q\oplus(\mathbb Z/3)^2_p
\]

with its standard alternating form and central character

\[
\omega=e^{2\pi i/3}.
\]

Up to unitary equivalence there is a unique irreducible Heisenberg representation with this nontrivial central character. In a position polarization it is carried by

\[
\mathcal H_3=\mathbb C[(\mathbb Z/3)^2].
\]

This explains why the torus and \(A_2\) constructions agree after their symplectic modules and central characters agree. It is stronger than observing that both spaces have dimension nine.

It does not make the basis map physically unique. A symplectic relabelling, local Clifford operation or interchange of the two handles gives another valid equivalence.

## 3. Exact Weyl and Fourier operators

For \(a,b,q\in(\mathbb Z/3)^2\), define

\[
X(a)|q\rangle=|q+a\rangle,
\qquad
Z(b)|q\rangle=\omega^{b^Tq}|q\rangle.
\]

They obey

\[
Z(b)X(a)=\omega^{b^Ta}X(a)Z(b).
\]

These are simultaneously translations of theta characteristics, compact phase/flux translations, two-qutrit Pauli operators and finite Heisenberg operators of the genus-two \(A_2\) module.

For one handle,

\[
F|y\rangle
=
\frac1{\sqrt3}\sum_{x\in\mathbb Z/3}\omega^{xy}|x\rangle.
\]

Then

\[
FXF^{-1}=Z,
\qquad
FZF^{-1}=X^{-1}.
\]

Applying this independently to either coordinate gives the two handle Fourier operations used throughout the programme.

## 4. Shears become finite quadratic phases

For symmetric \(K\in\operatorname{Sym}_2(\mathbb F_3)\), define

\[
Q_K(q)=\frac12q^TKq,
\qquad
T_K|q\rangle=\omega^{Q_K(q)}|q\rangle,
\]

where \(1/2=2\pmod3\). Its polarization law is

\[
Q_K(q+a)-Q_K(q)-Q_K(a)=q^TKa,
\]

so conjugation implements

\[
(q,p)\mapsto(q,p+Kq)
\]

on finite Weyl exponents, including the required central phase.

This is exactly the operation that cannot preserve a finite-dimensional subspace in the noncompact \(L^2\) model. On the torus it is native and finite.

## 5. The \(A_2\) twist dictionary

Write \(q=(a,b)\), and let

\[
K_1=2\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
K_2=2\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
K_{12}=2\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

Then

\[
Q_{K_1}=a^2,
\qquad
Q_{K_2}=b^2,
\qquad
Q_{K_{12}}=(a+b)^2.
\]

Therefore

\[
T_{K_{12}}T_{K_1}^{-1}T_{K_2}^{-1}|a,b\rangle
=
\omega^{(a+b)^2-a^2-b^2}|a,b\rangle
=
\omega^{2ab}|a,b\rangle.
\]

This is precisely the sum-cycle-minus-self-twists construction of the mutual \(A_2\) gate. The two descriptions give the same matrices, not merely isomorphic abstract groups.

## 6. Why this avoids the no-go

The noncompact and compact theories are not related by a bounded projection preserving every gate:

\[
L^2(\mathbb R^2)\not\twoheadrightarrow\mathbb C^9
\]

as exact shear representations.

Instead, compactification changes the observable algebra before quantization:

\[
\mathbb R^4\longrightarrow\mathbb R^4/\mathbb Z^4.
\]

Level-three prequantization then gives the finite Hilbert space. Equivalently, theta periodization imposes lattice identifications distributionally and only afterward produces finite holomorphic sections.

## 7. What selects the integer level?

For general positive \(N\),

\[
\dim\mathcal H_N=N^2,
\qquad
\text{finite exponent module }(\mathbb Z/N)^4.
\]

Nothing in \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) or in the Jordan cone alone chooses \(N=3\). In this construction the level is integral topological data: the Chern class/symplectic flux measured in quantum units.

The programme has several convergent witnesses for three: the \(A_2\) discriminant, the Furey colour-root lattice, the two-qutrit code, the genus-two \(A_2\) module and the prime-three Gauss phase. Document 1167 separates the internally derived discriminant order from the still-unproved transport to the relational torus.

## 8. The strongest next physical equation

Find gauge-invariant observables

\[
(Q_1,Q_2;P_1,P_2)
\]

derived from the Furey/Standard-Model/stress system such that:

1. each variable has a physically fixed primitive period;
2. their symplectic pairing is integral;
3. their finite quotient or prequantum flux has order/level three;
4. channel exchange acts by \(1\leftrightarrow2\);
5. the controlled Fourier pulse exchanges one \(Q_i,P_i\) pair;
6. the mutual response acts by the integral cross shear;
7. field-labelled observables map to \(\mu\in(\mathbb Z/3)^2\).

If all seven are derived, the physical, code, topological and arithmetic carriers become one representation rather than four compatible models.

## 9. Relation to the automorphic branch

The theta basis supplies \(\mathbb C[D^2]\) and its finite Weil multiplier. It does not perform the infinite arithmetic sum or prove weight-three continuation.

The division of labour is:

- compact quantization explains the nine components and finite gates;
- the metaplectic Eisenstein sum supplies the infinite \(Sp(4,\mathbb Z)\) orbit and zeta/\(L\)-normalization;
- the physical theory must derive the compact carrier and the observable covector that reads the automorphic section.

## 10. Claim ledger

- **Exact:** level-three quantization of a principally polarized Abelian surface has dimension nine.
- **Exact:** its finite Heisenberg carrier is \(\mathbb C[(\mathbb Z/3)^2]\).
- **Exact after a polarized lattice map:** this is the genus-two \(A_2\) carrier \(\mathbb C[D^2]\).
- **Exact:** Fourier and quadratic shear matrices agree with the two-qutrit/\(A_2\) Weil gates.
- **Exact:** the sum-cycle twist modulo self twists is \(\omega^{2ab}\).
- **Not a bounded truncation:** the compact space is a different quantization from \(L^2(\mathbb R^2)\).
- **Open:** derivation of compact conjugate physical observables and their field-labelled basis.
- **Open:** weight-three Eisenstein continuation and a physical response covector.

## 11. Stop-everything and falsification gates

**Flux/discriminant trigger:** Standard-Model/Furey boundary data derive a compact order-three pairing for the two conjugate pairs.

**Observable trigger:** four gauge-invariant compact observables reproduce the finite Heisenberg commutator and the declared gates.

**Level-selection falsifier:** matching dimension or qutrit gates is used as if it derived the physical compact quotient.

**Representation falsifier:** the compact carrier is described as a finite invariant subspace of the original noncompact Schrödinger carrier.

**Basis falsifier:** finite Stone–von Neumann uniqueness is used as if it selected physical field labels uniquely.

## 12. Certificate

The [level-three theta/Weil matrix certificate](../../../verification/verify/verify_level_three_torus_theta_basis_equals_a2_genus_two_weil_carrier.mjs) constructs all nine basis states and both Weyl pairs, verifies unitarity and Fourier conjugation, evaluates the three quadratic twist tables, derives the mutual phase \(\omega^{2ab}\) and checks the shear polarization identity for every label.

## Companion documents

- [Bounded noncompact intertwiner no-go](1165_no_bounded_exact_intertwiner_can_compress_the_noncompact_schrodinger_shear_to_nine_states_so_compactification_is_required.md)
- [Compact phase/flux lattice](../0400-0499/460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
- [Genus-two \(A_2\) Weil/code equivalence](../0400-0499/478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Weight-three metaplectic Eisenstein family](1163_the_a2_weight_three_metaplectic_eisenstein_sum_is_well_defined_but_sits_on_the_convergence_boundary.md)
