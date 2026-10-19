# Body-Diagonal Parity Theorem and Floquet Chirality Balance

**Date:** 17 October 2026  
**Branches:** B07, B08, B11 and B13  
**Claim status:** exact translation-invariant support theorem and explicit local-degree calculation; gauge-anomaly interpretation remains incomplete

## 1. Question left by the explicit Weyl walk

The eight-body-diagonal walk has four zero-quasienergy and four \(\pi\)-quasienergy corners. That could have been an accident of its ordered Pauli factors.

It is not. The zero/\(\pi\) replication follows from the parity class of the position-space support and is independent of the coin dimension and amplitudes.

## 2. General body-diagonal kernel

Let a translation-invariant one-tick evolution have momentum symbol

\[
U(\mathbf k)
=\sum_{\epsilon\in\{\pm1\}^3}
A_\epsilon e^{-i\mathbf k\cdot\epsilon},
\]

where the \(A_\epsilon\) are arbitrary matrices on any finite internal carrier. No Pauli form is assumed here.

Because every component \(\epsilon_j\) is odd,

\[
e^{-i(k_j+\pi)\epsilon_j}
=-e^{-ik_j\epsilon_j}.
\]

Therefore, for each coordinate direction,

\[
\boxed{
U(\mathbf k+\pi e_j)=-U(\mathbf k).
}
\]

Two independent \(\pi\)-shifts restore the sign, and three reverse it again.

This statement does not use unitarity. If \(U(\mathbf k)\) is unitary, multiplication by \(-1\) shifts every quasienergy by \(\pi\).

## 3. Exact replication theorem

Suppose \(\mathbf k_0\) contains a zero-quasienergy closing, meaning that an eigenvalue of \(U(\mathbf k_0)\) equals \(+1\). Its orbit under coordinate \(\pi\)-shifts contains:

- four even-parity shifts with the same \(+1\) eigenvalue;
- four odd-parity shifts with the corresponding \(-1\) eigenvalue, hence a \(\pi\)-gap closing.

For a degeneracy at \(U(\mathbf k_0)=I\), the orbit is explicitly

\[
4\times I\quad\oplus\quad4\times(-I).
\]

Thus:

\[
\boxed{
\text{body-diagonal support alone forces linked zero/\(\pi\) replicas.}
}
\]

Increasing the internal coin dimension or changing the eight amplitude matrices cannot break this identity. A same-support “larger coin” may rearrange bands, but it cannot independently remove the shift-related gap closings.

## 4. Chirality of the explicit Pauli walk

For

\[
U(\mathbf k)=e^{-ik_z\sigma_z}e^{-ik_y\sigma_y}e^{-ik_x\sigma_x}
=dI-i\mathbf v\cdot\boldsymbol\sigma,
\]

write a Brillouin corner as \(\mathbf k_{\mathbf n}=\pi(n_x,n_y,n_z)\), with \(n_j\in\{0,1\}\), and set \(\mathbf k=\mathbf k_{\mathbf n}+\mathbf q\). Then

\[
U(\mathbf k)
=s_{\mathbf n}
\left[I-i\mathbf q\cdot\boldsymbol\sigma+O(q^2)\right],
\qquad
s_{\mathbf n}=(-1)^{n_x+n_y+n_z}.
\]

In the global \(SU(2)\) Bloch coordinate \(\mathbf v\),

\[
\mathbf v=s_{\mathbf n}\mathbf q+O(q^2),
\]

so the local degree is

\[
\chi_{\mathbf n}
=\operatorname{sgn}\det\left(\frac{\partial v_i}{\partial q_j}\right)
=s_{\mathbf n}.
\]

Consequently:

- the four zero-gap corners have \(\chi=+1\);
- the four \(\pi\)-gap corners have \(\chi=-1\);
- the total degree over both Floquet gaps is zero.

At a \(\pi\) corner one can multiply the local unitary by \(-1\) and write a relative Weyl Hamiltonian with the same algebraic slope as at zero. This changes the local band chart. The invariant statement is the sign of the global Bloch-map Jacobian above: the compensating charge is carried at the Floquet-zone edge.

## 5. What this proves—and what it does not

It proves that the previous eight-cone result is structural for the one-tick body-diagonal support class. It also gives an exact finite-lattice form of zero/\(pi\) topological balance.

It does **not** yet prove the Standard-Model gauge anomaly. That requires:

- second quantization;
- a gauge-covariant regulator;
- spectral flow in a background gauge field;
- the selected Furey representation content;
- a demonstration that the \(\pi\) sector supplies regulator flow rather than physical mirror particles.

The words “anomaly inflow” should therefore remain conditional at this stage.

## 6. The assumption that must change

Independent zero/\(\pi\) gap control requires breaking at least one premise of the theorem:

1. **Support parity:** include displacements with an even or zero coordinate.
2. **One-tick translation symmetry:** enlarge or stagger the unit cell.
3. **Single indivisible step:** use substeps whose combined support occupies more than one parity class.
4. **Strict three-dimensional locality:** introduce a boundary or auxiliary dimension.
5. **Unitary closed evolution:** use an open response or projected effective dynamics, then prove positivity and information accounting separately.

The known split-step repair chooses the third route and introduces stationary/timelike substep dependencies.

## 7. A remaining all-null escape

Breaking parity does not logically require timelike edges. A cubic lattice has longer integer vectors of equal Euclidean length with mixed component parity, for example permutations and signs of

\[
(1,2,2),\qquad |(1,2,2)|=3.
\]

All such links can be null for \(\Delta t=3a/c\), while their mixed parity breaks the simple antiperiodicity theorem. This produces the next constructive question:

> Can a cubically symmetric unitary walk on the mixed-parity \((1,2,2)\) shell realize one Weyl cone with controlled zero/\(\pi\) gaps?

The existence of the shell is not the existence of the walk. Unitarity, isotropic linear dispersion and net chirality must still be solved simultaneously.

## 8. Consequence for the programme

The “same eight null links plus a cleverer coin” path is pinned: the parity identity survives every finite internal enlargement.

The all-null ontology remains open only after changing the spatial shell, unit cell or dimensional architecture. This is useful pruning, not a failure of the broader causal programme.

For the Jordan/\(Spin(2,3)\) synthesis, the result raises a selection question: if a ternary or boundary law chooses a causal lattice, does it choose one parity shell, a mixed shell, or a staggered complex? The response group alone does not answer that microscopic question.

## 9. Stop-everything and falsification gates

**All-null mixed-shell success:** construct a unitary mixed-parity null-shell walk with one anomaly-correct Weyl sector and a gapped \(\pi\) sector.

**Boundary success:** derive the compensating Floquet charge as boundary anomaly flow from the same Jordan response that selects the physical chiral carrier.

**Selection success:** Furey incidence or Jordan sewing uniquely fixes the shell, unit cell and polarization.

**Class no-go:** prove that every finite cubically symmetric all-null shell with a finite carrier has zero net low-energy chirality or unavoidable gap replicas.

**Phenomenological failure:** the regulator copies survive as light mirror particles or generate nonuniversal limiting speeds.

## 10. Certificate

The [body-diagonal parity and chirality certificate](scripts/verify_body_diagonal_parity_and_chirality.mjs) checks the antiperiodicity identity for arbitrary matrix amplitudes, enumerates the four-even/four-odd orbit, computes all eight Bloch Jacobian signs for the explicit Weyl walk and verifies total degree zero.

## Companion documents

- [Eight-body-diagonal Weyl walk](176_eight_body_diagonal_weyl_walk_and_null_speed_gate.md)
- [Split-step zero/\(pi\) gap tradeoff](153_split_step_walk_zero_pi_gap_tradeoff.md)
- [Floquet \(\pi\)-sector Fock independence](152_floquet_pi_sector_fock_independence.md)
- [Lattice-fermion doubling gate](146_lattice_fermion_doubling_gate.md)
- [Higher-dimensional null directions](145_higher_dimensional_null_direction_tradeoff.md)
