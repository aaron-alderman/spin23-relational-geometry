# Metaplectic Lift and Maslov Phase: Correcting the Braid-Twist Interpretation

**Date:** 16 October 2026  
**Branches:** B09 and B07  
**Claim status:** group-level sign established; quantum lift is parity/path-dependent rather than one universal phase

## 1. Why quantization changes the statement

The braid representation established

\[
z=(\sigma_1\sigma_2)^3\longmapsto-I_4\in Sp(4,\mathbb Z).
\]

Quantum canonical transformations are represented not directly by \(Sp(4,\mathbb R)\), but by its metaplectic double cover

\[
Mp(4,\mathbb R)\longrightarrow Sp(4,\mathbb R).
\]

The element \(-I_4\) has two metaplectic lifts. In the two-mode oscillator representation, phase-space inversion is represented, up to the lift convention, by total parity

\[
\mathcal P=(-1)^{N_1+N_2}.
\]

It satisfies

\[
\mathcal P a_i\mathcal P^{-1}=-a_i.
\]

## 2. Not one scalar sign

On a Fock state,

\[
\mathcal P|n_1,n_2\rangle
=(-1)^{n_1+n_2}|n_1,n_2\rangle.
\]

Therefore \(-I_4\) does not act as the same scalar on the full quantum Hilbert space. It is scalar only after restricting to a fixed-parity sector.

The earlier phrase “spinorial sign” is exact on the defining symplectic carrier but must not be promoted directly to a universal quantum phase.

## 3. Path and Maslov data

Because

\[
\pi_1(Sp(4,\mathbb R))\cong\mathbb Z,
\]

a path implementing a symplectic transformation contains winding information not visible in its endpoint. The metaplectic lift retains winding modulo two, while a Maslov index can retain an integer-valued intersection count relative to the caustic cycle of the Lagrangian Grassmannian.

Consequently the squared braid center, which ends at identity in \(Sp(4)\), can still lift nontrivially depending on the chosen path. The endpoint matrices alone do not determine that phase.

## 4. Revised exact claim

\[
\boxed{
\begin{aligned}
&z\mapsto-I_4\text{ classically},\\
&z\text{ fixes the Jordan/Lagrangian relation},\\
&\widetilde z\text{ acts as a choice of metaplectic parity lift},\\
&\text{additional scalar phase requires a path/Maslov specification.}
\end{aligned}
}
\]

This is stronger scientifically because it identifies the exact missing datum.

## 5. Possible observable

An interferometer comparing paths with the same endpoint in the Lagrangian carrier but different Maslov index can observe a relative phase. To connect this with physical braiding one must specify:

- the two-mode Hilbert space;
- the braid-to-symplectic path, not only endpoint;
- the occupied parity sector;
- the interferometric observable.

## 6. Stop-everything and falsification tests

**Positive:** a physically selected braid path has a fixed Maslov class and produces a protected relative phase while the Jordan observable closes.

**Negative:** different homotopic choices or lift conventions change the claimed phase freely, or no coherent fixed-parity sector exists.

## 7. Certificate

[`scripts/verify-metaplectic-parity-truncation.mjs`](scripts/verify-metaplectic-parity-truncation.mjs) checks on a finite two-mode Fock truncation that parity squares to identity and conjugates both lowering operators by a minus sign. The truncation verifies the parity algebra, not the full infinite-dimensional metaplectic representation.

[`scripts/verify-maslov-rotation-paths.mjs`](scripts/verify-maslov-rotation-paths.mjs) compares explicit oscillator rotation paths. Simultaneous \(2\pi\) rotation of both modes lifts to identity, while a \(2\pi\) rotation of one phase plane lifts to minus identity. This demonstrates directly that the classical endpoint alone does not determine the metaplectic sign.

## Sources

- [Svatopluk Krýsl, *Howe type duality for metaplectic group acting on symplectic spinor valued forms*](https://arxiv.org/abs/0805.2904)
- [Maurice de Gosson, *A Phase Space Representation of the Metaplectic Group*](https://arxiv.org/abs/2512.18415)

## Branch state

B09 remains active. The central twist is exact, while a universal quantum phase is pinned pending path, lift and parity-sector data.
