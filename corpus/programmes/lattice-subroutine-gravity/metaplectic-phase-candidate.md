# The spin-sector vector contains a beyond-sign metaplectic phase

**Date:** 24 October 2026

**Status:** exact theta-transformation result, superseded as an absolute device target by the relative-invariant audit; complete Monster (2A) multiplier and physical transport map remain open

**Evidence:** [machine-readable calculation](../../../evidence/data/lattice-subroutine-metaplectic-phase-candidate-v1.json)

**Certificate:** [characteristic-phase verifier](../../../verification/verify/verify_lattice_subroutine_metaplectic_phase_candidate.mjs)

## Result

The previous detector reassignment established that the one-dimensional \(\chi_5\) character supplies only a binary sign. That is not the full information carried by the ten-component spin-sector vector.

Apply the genus-one modular transformation \(T:\tau\mapsto\tau+1\) to the first handle of a separating genus-two surface. In binary characteristic notation, the first-handle rule is

\[
(a_1,b_1)\longmapsto
(a_1,b_1+a_1+1)\pmod 2,
\]

with phase

\[
\exp\!\left(\frac{i\pi a_1}{4}\right).
\]

Thus sectors with \(a_1=0\) are exchanged in pairs, while sectors with \(a_1=1\) are fixed and acquire \(e^{i\pi/4}\). Enumeration of the ten even genus-two characteristics gives:

- three two-cycles with unit cycle product;
- four fixed sectors with phase \(e^{i\pi/4}\);
- among those fixed sectors, three have even--even separating factors and one is the odd--odd sector that vanishes at separation.

The free-Majorana spin vector therefore contains a canonical eighth-root phase under this declared generator. Its inverse carries \(e^{-i\pi/4}\). This is precisely the kind of beyond-sign phase that a three-mode directional detector can distinguish.

## Why the determinant did not show it

The three transpositions have permutation determinant ((-1)^3=-1). The four fixed-sector phases multiply to

\[
\left(e^{i\pi/4}\right)^4=-1.
\]

The two signs cancel, so the determinant of this ten-component monomial action is (+1). The vector retains phases that its determinant forgets.

This explains why the previous binary-character calculation was both correct and incomplete. It classified the determinant line; it did not classify the full metaplectic transport of the spin-sector vector.

## What can now be predicted

For the free-Majorana factor, the declared pair (T_1^{\pm1}) supplies the convention-fixed phase candidate

\[
\Phi_{\rm candidate}=\pm\frac{\pi}{4}.
\]

A three-mode ring at these two fluxes is isospectral under reversal but has a nonzero orientation-odd directional transfer in the calibrated model. This is a better mathematical target than choosing \(\pm\pi/2\) for convenience.

The [(T_1/S_1) boundary audit](metaplectic-t1-s1-boundary.md) sharpens this statement. A common anomaly-line trivialization can shift every phase assigned to one generator, so the absolute (\pm\pi/4) flux is not itself intrinsic. The robust (T_1) target is the fixed-sector-square/two-cycle-product ratio (i); the robust (S_1) target includes the odd--odd/even--even fixed-sector ratio (i). A physical emulator must compare sectors coherently so that the common phase cancels.

The prediction is not yet a Monster-device bridge. The full fermionized Monster theory is

\[
\text{Majorana--Weyl}\otimes\text{Baby Monster}_{\rm fermionic}.
\]

The Baby-Monster sector can contribute its own multiplier, and a chiral partition amplitude is a section requiring a declared trivialization. The net (2A) phase cannot be inferred from the free factor alone.

## The narrowed gate

The remaining calculation is now componentwise rather than determinant-only:

1. compute the (T_1) and (S_1) multiplier matrices of the ten complete (2A) spin-sector amplitudes;
2. divide only by a source-derived common anomaly factor;
3. calculate gauge-invariant phase products around characteristic cycles;
4. determine whether the three nonvanishing \(T_1\)-fixed sectors retain \(e^{i\pi/4}\), cancel it or split it;
5. only then bind (T_1^{\pm1}) to a calibrated forward/reverse laboratory control loop.

A diagonal rephasing of sector basis vectors can move phases between edges, but it cannot change a closed cycle product or a fixed-sector eigenvalue. Those are the appropriate candidates for transport into an intrinsic device flux.

## Authority boundary

This calculation establishes a source-derived phase in the free-Majorana theta representation. It does not establish the multiplier of the complete Monster (2A) fermionization, a physical map from modular transport to laboratory time, or a new-physics signal. It replaces an arbitrary continuous phase with a precise conditional target and names the calculation that can cancel it.

## Sources

- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Modular-sign detector reassignment](modular-sign-detector-reassignment.md)
