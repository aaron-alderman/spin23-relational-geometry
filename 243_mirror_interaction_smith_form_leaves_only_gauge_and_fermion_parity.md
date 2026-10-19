# The Mirror Interaction Smith Form Leaves Only Gauge and Fermion Parity

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08, B11 and B13  
**Claim status:** exact integer species-phase classification; full non-Abelian/discrete anomaly and strong-coupling phase remain open

## 1. Why continuous rank is not enough

The seven nonzero quartics plus \(\nu^c\nu^c\) have continuous charge-matrix rank five, leaving only hypercharge. An integer interaction matrix can nevertheless retain disconnected finite phase symmetries invisible to ordinary rank.

The correct invariant is the Smith normal form.

## 2. Integer interaction matrix

With columns

\[
(Q,u^c,d^c,L,e^c,\nu^c),
\]

use the seven quartic count rows and the sterile Majorana row:

\[
A=
\begin{pmatrix}
3&0&0&1&0&0\\
2&1&1&0&0&0\\
1&1&0&1&1&0\\
1&0&1&1&0&1\\
0&2&1&0&1&0\\
0&1&2&0&0&1\\
0&0&0&2&1&1\\
0&0&0&0&0&2
\end{pmatrix}.
\]

Its determinantal divisors give

\[
\operatorname{SNF}(A)
=\operatorname{diag}(1,1,1,1,2,0).
\]

Therefore the species-phase symmetry is

\[
\boxed{U(1)_Y\times\mathbb Z_2.}
\]

## 3. Identifying the finite factor

The surviving \(\mathbb Z_2\) sends every Weyl field to minus itself:

\[
\psi\mapsto-\psi.
\]

Every quartic contains four fermions and the Majorana term contains two, so all interactions are invariant. This is precisely fermion parity \((-1)^F\).

It is not a hypercharge transformation: the sterile neutrino has \(Y=0\) but changes sign under fermion parity.

After quotienting the gauged hypercharge direction, the species-phase symmetry is therefore only

\[
\boxed{\mathbb Z_2^F.}
\]

## 4. Meaning for symmetric mirror gapping

At the Abelian species-phase level, there is no accidental continuous or disconnected internal symmetry left beyond gauge symmetry and the mandatory grading by fermion parity.

This removes an important kinematic obstruction. It does not establish a gapped phase, because one must still check:

- the exact non-Abelian flavor/permutation symmetry of chosen equal couplings;
- charge conjugation, CP or lattice symmetries accidentally imposed by the regulator;
- mixed gauge/discrete and gravitational anomalies;
- the actual strong-coupling spectrum and ground-state structure.

Generic unequal couplings can be used to avoid accidental permutation symmetries unless the Furey algebra forces relations among them.

## 5. Furey significance

If a Furey-native ternary construction generates the seven quartics and the neutrino completion generates the Majorana row, then its integer relation lattice is maximally economical:

\[
\text{gauge }U(1)_Y
\quad+\quad
\text{unavoidable }\mathbb Z_2^F,
\]

with no extra species-phase symmetry.

This is a much stronger target than matching representations. Conversely, if Furey closure produces only a lower-rank subset, the surviving phase symmetry and its anomalies become a concrete obstruction.

## 6. Stop-everything and falsification gates

**Positive trigger:** a regulated Hamiltonian with this exact interaction lattice has a unique gauge-symmetric mirror gap and no topological order.

**Algebraic trigger:** Furey closure produces an interaction matrix with the same Smith form without arbitrary added operators.

**Discrete trigger:** a non-species discrete symmetry or cobordism anomaly still obstructs the trivial gap, forcing a specific boundary topological phase.

**Falsifier:** a claimed symmetry-complete set has a Smith form with additional zero columns or invariant factors beyond the unavoidable hypercharge and fermion parity.

## 7. Certificate

The [mirror discrete-phase Smith-form certificate](scripts/verify_mirror_discrete_phase_smith_form.mjs) computes all determinantal divisors through rank five, obtains invariant factors \(1,1,1,1,2\), verifies the hypercharge null vector and identifies the finite component as simultaneous fermion sign.

## Companion documents

- [Maximal quartics and the Majorana channel](242_maximal_mirror_quartics_leave_only_bminusl_before_majorana.md)
- [Covering quartics and residual symmetry](241_covering_mirror_quartics_are_nonzero_but_leave_large_global_symmetry.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Domain-wall anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
