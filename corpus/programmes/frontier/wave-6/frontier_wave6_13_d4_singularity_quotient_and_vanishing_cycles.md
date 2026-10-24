# Frontier Wave 6.13: The Explicit \(D_4/\mathbb Z_3\) Singularity Quotient

**Date:** 24 October 2026  
**Status:** exact algebraic quotient and literature-backed vanishing-cycle realization; no localized-particle claim  
**Certificate:** [verify_d4_triality_singularity_quotient.mjs](../../../../verification/verify/verify_d4_triality_singularity_quotient.mjs)

## Result

The singularity branch is not merely analogous to the Dynkin fold. It realizes it.

Use the real form of the \(D_4\) singularity

\[
f(x,y)=x^3-3xy^2.
\]

Under rotation of \((x,y)\) through \(2\pi/3\), define

\[
u=x^3-3xy^2,
\qquad
v=y^3-3x^2y,
\qquad
w=x^2+y^2.
\]

These are invariant and obey

\[
\boxed{u^2+v^2=w^3.}
\]

Hence the quotient surface is the \(A_2\) du Val surface

\[
\mathbb C^2/\mathbb Z_3
\cong
\{u^2+v^2=w^3\}\subset\mathbb C^3,
\]

while the descended function is simply \(\bar f=u\). A regular quotient fiber is therefore

\[
u=\varepsilon,
\qquad
\varepsilon^2+v^2=w^3.
\]

This explicit equation supplies the geometric object missing from the earlier lattice-only calculation.

## Where the triple bond appears

Mikosz and Weber identify two quotient vanishing cycles. In the suspended odd-dimensional singularity their self-intersections have magnitudes

\[
2,
\qquad
\frac23,
\]

with mutual pairing of magnitude one. The associated Cartan integers are therefore

\[
\frac{2(-1)}{2/3}=-3,
\qquad
\frac{2(-1)}2=-1,
\]

giving

\[
\boxed{
\begin{pmatrix}2&-3\\-1&2\end{pmatrix},
}
\]

the \(G_2\) triple bond. This is the same long/short ratio already obtained from the orbit-average root calculation in [the first branch spike](frontier_wave6_00_magic_square_triple_bond_branch_spike.md), now realized as an intersection form on quotient vanishing cycles.

## Relation to the lattice scar

The integral calculation in [wave 6.12](frontier_wave6_12_triality_lattice_monodromy_and_z3_discriminant.md) found:

- determinant three for the invariant lattice;
- cokernel \(\mathbb Z_3\) for invariants mapped to coinvariants; and
- contrast monodromy with polynomial \(\lambda^2+\lambda+1\).

The singularity supplies the geometric carrier of those facts: a threefold cover away from the quotient singularity, order-three monodromy on the discarded cycles, and unequal quotient-cycle normalization. Thus the lattice scar and the singularity scar are two descriptions of one descent, not two unexplained appearances of three.

## What this does not establish

A vanishing cycle is a homology class. It is not automatically:

- a particle generation;
- a bound state;
- a Goldstone mode;
- a defect zero mode; or
- a new fundamental interaction.

Obtaining any of these requires a declared field operator or Hamiltonian over the deformation, a boundary condition, and a proof that its localized spectrum couples to the vanishing-cycle local system. The topology fixes possible protected data; it does not supply the dynamics.

## Literature boundary

- Mikosz and Weber, [*Triality in so(4,4), characteristic classes, D4 and G2 singularities*](https://arxiv.org/abs/1311.0507), give the order-three action, quotient invariant ring, quotient Milnor fiber and \(G_2\) intersection diagram.
- Caradot, [*Root Systems and Quotients of Deformations of Simple Singularities*](https://arxiv.org/abs/1807.09640), proves the relevant restrictions on singular configurations in quotient deformations.
- Caradot, [*Deformations of Inhomogeneous Simple Singularities and Quiver Representations*](https://arxiv.org/abs/1811.07399), constructs the inhomogeneous deformations through equivariant quiver data.

## Branch verdict

R4 is closed at the mathematical realization level:

\[
D_4\text{ singularity}
\longrightarrow
\mathbb Z_3\text{ quotient}
\longrightarrow
A_2\text{ quotient surface with }G_2\text{ vanishing-cycle form}.
\]

The only nonredundant continuation is physical: construct a source-native operator whose localized states are controlled by these cycles. Without that operator, “localized triality mode” remains an open target rather than a result.
