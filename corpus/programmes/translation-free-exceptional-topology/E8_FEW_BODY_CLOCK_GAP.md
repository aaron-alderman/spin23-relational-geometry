# E8 bounded-degree clock hardware and gap certificate

**Date:** 26 October 2026

**Status:** exact finite-qudit hardware gap; continuum E8 promotion open

**Parent:** [E8 coupled-wire tomography](E8_COUPLED_WIRE_TOMOGRAPHY.md)

**Evidence:** [hardware and gap ledger](../../../evidence/data/translation-free-e8-few-body-clock-gap-v1.json)

**Certificate:** [exact compiler and gap verifier](../../../verification/verify/verify_translation_free_e8_few_body_clock_gap.mjs)

## The many-field interaction was a basis cost

For the continuum schedule, a column (K e_I) appears on each of two
chiralities. In the simple-root basis the eight interactions therefore touch

\[
(4,6,8,6,6,6,4,4)
\]

fields. Since (K_{E_8}) is unimodular, (K^{-1}) is integral. The compact
change of variables

\[
\phi'=K\phi ,\qquad \phi=K^{-1}\phi'
\]

is consequently an allowed integer relabelling, not a real-valued
approximation. It sends

\[
(Ke_I)^T\phi=\phi'_I.
\]

Every interwire interaction becomes the two-field lock

\[
-u_{yI}\cos(\phi_{R,y}^{\prime I}+\phi_{L,y+1}^{\prime I}).
\]

The fixed source-to-native mixer follows the E8 Dynkin adjacency and has
maximum port degree four. In the native dual basis each bulk register has one
partner across an interwire bond.

## Exact finite-qudit Hamiltonian

Regularize every compact field by a (q)-level clock register with generalized
Paulis (ZX=\omega XZ). For each interior pair define

\[
S=Z_RZ_L^{-1},\qquad T=X_RX_L.
\]

The two operators commute because their two Weyl phases cancel. With
(d_q=1-\cos(2\pi/q)), use

\[
H_{yI}=\frac{J_{yI}}{d_q}\left[1-\frac{S+S^\dagger}{2}\right]
+\frac{h_{yI}}{d_q}\left[1-\frac{T+T^\dagger}{2}\right].
\]

This is a sum of two-body terms. Each pair has a unique generalized-Bell
ground state and first excitation energy (min(J_{yI},h_{yI})). Different
bulk pairs are disjoint, while the eight left and eight right edge registers
remain free. Therefore the full ground space has dimension (q^{16}), and
the gap above that edge-degenerate space is exactly

\[
\Delta_{\rm bulk}=\min_{y,I}\{J_{yI},h_{yI}\}.
\]

This is a many-body statement: it is the exact spectrum above the complete
ground subspace, not a harmonic normal-mode proxy.

## Width, local dimension and disorder sweep

The frozen sweep covers (q=5,7,11,17) and widths
(N_y=2,3,5,8,13,21,34), for 28 Hamiltonians and as many as 264 bulk pairs.
Every (J) and (h) is independently drawn from ([0.75,1.25]). The exact
uniform bound is therefore

\[
\Delta_{\rm bulk}\geq0.75
\]

at every width and every tested clock dimension; the smallest sampled gap is
(0.750080793514). Increasing width adds more gapped Bell pairs but does not
soften any existing pair or couple the two free edges.

## What has and has not become hardware

Closed here:

- the eight many-field cosines reduce exactly to two-field locks;
- every static term is two-local;
- native bulk graph degree is one and source-mixer degree is at most four;
- the disordered finite-qudit many-body gap has an analytic, width-independent
  lower bound;
- the two opposite edge register sets survive at every width.

Not closed here:

- convergence of this clock regularization to compact rotors or chiral bosons;
- recovery of (c_-=8), the E8 current OPE or thermal Hall transport from this
  stabilizer Hamiltonian;
- a material-native realization of the generalized-Pauli couplers;
- stability under interactions that connect different Bell pairs;
- random rather than path connectivity.

The result therefore closes the bounded-degree hardware and finite many-body
gap gate at the digital surrogate level. The next promotion must add the
continuum kinetic metric and show clock-to-rotor convergence without losing the
gap or the held-out 240-root response.

## External anchors

- Teo and Kane, [*From Luttinger liquid to non-Abelian quantum Hall states*](https://doi.org/10.1103/PhysRevB.89.085101).
- Lopes, Quito, Han and Teo, [*A non-Abelian twist to integer quantum Hall states*](https://arxiv.org/abs/1901.09043).
- Yang et al., [*Quantum Double in a Superconducting Wire Array*](https://doi.org/10.1103/PRXQuantum.2.030327).
