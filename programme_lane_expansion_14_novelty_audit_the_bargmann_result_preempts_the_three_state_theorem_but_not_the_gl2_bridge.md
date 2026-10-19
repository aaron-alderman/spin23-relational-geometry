# Lane Expansion 14: Novelty Audit—The Bargmann Result Pre-empts the Three-State Theorem but Not the (GL_2) Bridge

**Date:** 17 October 2026  
**Lanes:** L1, L7, L8 and L9  
**Claim status:** literature correction and exact equivalence-group obstruction  
**Certificate:** [verify_programme_bargmann_orientation_calibration_boundary.mjs](scripts/verify_programme_bargmann_orientation_calibration_boundary.mjs)

## Verdict

The proposed paper cluster needs to be narrowed substantially.

A very recent paper by Tao, Wu, Xie and Zhang develops the same central hierarchy for ordered qubit states: pairwise invariants determine unoriented geometry, while a third-order Bargmann invariant determines orientation. It proves more than the programme's finite construction, including channel-conversion criteria and a chirality-sensitive region.

Accordingly, the statements

\[
\text{two nonparallel states select a plane},
\qquad
\text{three noncoplanar states select orientation}
\]

are not a defensible standalone novelty claim.

The unresolved programme question is different:

\[
\boxed{
\text{Can qubit-style orientation be made invariant under the physical calibration group of response matrices?}
}
\]

The answer is presently **no under unrestricted (GL_2) congruence**.

## 1. Exact overlap with Bargmann geometry

For qubit density matrices

\[
\rho_i=\frac12(I+\mathbf r_i\cdot\boldsymbol\sigma),
\]

the third-order Bargmann invariant is

\[
\Delta_3=\operatorname{Tr}(\rho_1\rho_2\rho_3).
\]

Pauli multiplication gives

\[
\boxed{
4\operatorname{Im}\Delta_3
=
\mathbf r_1\cdot(\mathbf r_2\times\mathbf r_3).
}
\]

Thus the programme's scalar (\tau) is exactly four times the imaginary Bargmann invariant. Common unitary conjugation acts by (SO(3)) on the Bloch vectors and preserves its sign. Antiunitary conjugation acts as a reflection and reverses it.

This is not merely a formal precedent. Bargmann invariants can be measured by cyclic-permutation or generalized SWAP tests, so an operational measurement theory already exists.

## 2. Why this does not solve the response problem

The programme's response matrices transform under a different equivalence group:

\[
R_i\mapsto M R_iM^T,
\qquad M\in GL_2(\mathbb R).
\]

For three positive responses define relative operators

\[
A=R_0^{-1}R_1,
\qquad
B=R_0^{-1}R_2.
\]

Their commutator transforms by similarity, so

\[
\mathcal N=-\frac12\operatorname{tr}[A,B]^2
\]

is a congruence invariant. It measures the squared failure of the responses to share an eigenframe.

But in two dimensions ([A,B]) is similar to a skew orientation generator. A reflection such as

\[
H=\operatorname{diag}(1,-1)
\]

is an allowed (GL_2) recalibration. It reverses the signed skew coefficient while leaving (\mathcal N) unchanged. Therefore:

\[
\boxed{
\text{noncommutativity magnitude is calibration-invariant; its handedness is not.}
}

Normalizing a positive response to trace one does not repair this automatically, because trace normalization is not equivariant under general congruence. A response matrix is not a qubit state merely because both are positive (2\times2) matrices.

## 3. Revised novelty boundary

### Established before this programme

- simultaneous congruence and canonical matrix-pair invariants;
- higher Bargmann invariants as relational state data and their generalized SWAP measurement;
- the qubit scalar triple product as the imaginary cubic invariant;
- first Stiefel-Whitney/Möbius topology of real eigenlines;
- passive Schur-complement network response.

### Directly pre-empted

- the ordered-pair/ordered-triple state-frame hierarchy as a mathematical novelty;
- the claim that cubic qubit orientation is a new measurable invariant;
- Möbius sign holonomy as a new topological mechanism.

### Still programme-specific

- the exact distinction between the Standard-Model source calibration group and unitary qubit equivalence;
- the use of response invariants as a falsification architecture for the topology assignment;
- the question whether physical source construction reduces (GL_2) to an orientation-preserving subgroup;
- the combined null experiment using a passive mechanical network.

These programme-specific points are currently an application and obstruction framework, not yet a strong new theorem.

## 4. Revised paper assessment

The L1+L7+L8+L9 cluster should no longer be ranked as the strongest immediate theory paper. Its mathematical core overlaps directly with established matrix classification, Bargmann-state geometry and real-band topology.

It remains potentially publishable in either of two forms:

1. **Experimental methods/application paper:** implement the complete calibration-and-reversal protocol in a passive two-port platform and demonstrate the boundary between (GL_2) and unitary orientation.
2. **New theory paper:** derive from physical source construction an equivalence group smaller than (GL_2), or construct a genuinely reflection-safe observable that still distinguishes the two topology assignments.

Without one of those advances, it is best treated as internal methodology.

The L2+L6 Standard-Model operator-mixing trajectory is now the stronger potential theory paper, because a full loop calculation could produce a genuinely domain-specific result.

## 5. Smallest decisive experiment

Use the three-oscillator device from Lane 12 and deliberately perform two kinds of recalibration:

1. orientation-preserving gains and shears with (det M>0);
2. one port reflection with (det M<0).

For three measured response matrices, compare:

- generalized eigenvalues of response pairs;
- (\mathcal N=-\tfrac12\operatorname{tr}[A,B]^2);
- a conventionally signed commutator coefficient;
- the physical port-reversal label.

The prediction is that the generalized spectra and (\mathcal N) survive both classes of recalibration, while the signed coefficient changes under reflection. A genuine orientation observable must therefore include a physical handedness reference outside the response matrices.

**Go:** the Standard-Model source protocol supplies such a reference and excludes reflection as a gauge calibration.

**No-go:** every proposed sign can be reversed by a legitimate relabelling or recalibration of the two sources.

## Primary literature used in the audit

- [Tao, Wu, Xie and Zhang, *Pairwise detection, chiral conversion: Resource theory of quantum multistates*](https://arxiv.org/abs/2610.04930)
- [Oszmaniec, Brod and Galvão, *Measuring relational information between quantum states, and applications*](https://arxiv.org/abs/2109.10006)
- [Horn and Sergeichuk, canonical forms and simultaneous congruence](https://arxiv.org/abs/0709.2473)
- [Ahn et al., Stiefel-Whitney topology of real bands](https://arxiv.org/abs/1904.00336)
- [Tang et al., elastic-metamaterial realization of Euler and Stiefel-Whitney phases](https://arxiv.org/abs/2503.06371)

## Reproducibility

```powershell
node scripts\verify_programme_bargmann_orientation_calibration_boundary.mjs
```
