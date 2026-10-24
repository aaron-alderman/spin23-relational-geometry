# The robust phase target is relative, not absolute

**Date:** 25 October 2026  
**Status:** exact free-Majorana (T_1/S_1) characteristic result; complete Monster (2A) multiplier remains source-gated  
**Evidence:** [machine-readable ledger](../../../evidence/data/lattice-subroutine-metaplectic-t1-s1-boundary-v1.json)  
**Certificate:** [exact eighth-root verifier](../../../verification/verify/verify_lattice_subroutine_metaplectic_t1_s1_boundary.mjs)

## Result

The previous calculation found (e^{i\pi/4}) on the four sectors fixed by a first-handle (T_1) transformation. That phase is real structure, but an absolute phase assigned to one modular generator can move when the common anomaly line is trivialized differently. The invariant target is therefore not “a device must have flux (\pi/4)” by itself. It is a comparison between things transformed by the same generator.

Write (\zeta_8=e^{i\pi/4}). On the ten even genus-two characteristics, the reduced free-Majorana action has:

- for (T_1), three two-cycles with cycle product (1), and four fixed sectors with eigenphase (\zeta_8);
- for (S_1), three two-cycles with cycle product (1), three even--even fixed sectors with phase (1), and the odd--odd fixed sector with phase (\zeta_8^2=i).

A diagonal rephasing of the ten sector basis vectors moves phases along exchanged edges but cannot change a closed-cycle product or fixed-sector eigenphase. A common generator phase (\lambda) changes a fixed phase (f) to (\lambda f) and a two-cycle product (c) to (\lambda^2c). Consequently,

\[
\frac{f^2}{c}
\]

is invariant under both freedoms. For (T_1), every fixed sector compared with any two-cycle gives

\[
\frac{(\zeta_8)^2}{1}=i.
\]

For (S_1), the odd--odd/even--even fixed-sector ratio is also (i); their squared comparisons with a two-cycle are respectively (-1) and (+1). These are the source-native free-factor targets.

## Why this changes the experiment

One absolute loop flux is too weak a binding because a common anomaly convention can shift it. A faithful analogue must encode at least two modular sectors or one fixed sector and one exchanged pair under the same calibrated control. The preregistered record is then a relative phase or closed-cycle ratio. A common electronic, optical or pump-reference phase must cancel from the decision statistic.

This is a useful theoretical-engineering correction even if the Monster bridge fails. It tells the detector what information must be retained: not merely a directional response at a chosen flux, but a coherent comparison between transformation sectors. It also gives a clean null. If the relative ratio is not (i) after calibrated nuisance phases cancel, the free-Majorana emulator is wrong or the proposed modular control does not implement the declared generator.

## The exact source boundary

The primary sources support two separate statements. Lin and Shao establish that (2A) fermionization of the Monster CFT factors as a free Majorana--Weyl fermion times the fermionic Baby Monster CFT, and analyse torus-level defect modularity. Tuite and Zuevsky provide genus-two free-fermion sewing and modular technology. Those results are sufficient for the free-factor characteristic calculation above. They do not provide the complete genus-two Baby-Monster spin-sector amplitudes and multiplier matrices needed to multiply this result into a full (2A) prediction.

The remaining gate is therefore a missing source object, not more manipulation of the ten free-theta labels:

1. construct or locate the genus-two fermionic Baby-Monster spin-sector amplitudes;
2. derive their (T_1/S_1) multiplier and common anomaly line;
3. combine it with the verified free-factor action;
4. retain only relative fixed/cycle invariants that survive the combined trivialization; and
5. derive a physical map from those modular comparisons to two coherently compared detector sectors.

Until then, the corpus has a verified free-factor invariant and a detector architecture requirement, not a complete Monster prediction and not a gravitational observable.

## Sources

- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- [Previous absolute-phase candidate](metaplectic-phase-candidate.md)
