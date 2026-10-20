# The marked-projector packet exactly joins two quark hierarchies and the CKM invariants but spends its axis

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** constructive isolated numerical join with exact parameter-count saturation; physical origin and naturalness remain open

**Depends on:** [the scalar family-commutant obstruction](1486_the_s3_family_commutant_is_scalar_so_a_cabibbo_rotator_requires_a_new_spurion.md) and [the two-point family algebra](../1100-1199/1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)

**Evidence:** [machine-readable witness and audit](../../../evidence/data/spin23-marked-projector-ckm-join.json), [executable verifier](../../../verification/verify/verify_spin23_marked_projector_ckm_join.mjs), [Huang--Zhou common-scale running masses](https://arxiv.org/abs/2009.04851), and the [2025 PDG CKM review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf)

## Result

The smallest typed (S_3\to S_2) deformation identified in claim 1486 has
enough structure to join the quark spectra and mixing matrix without an
independent second family matrix.

Let

\[
X_1=I-3P_1=\operatorname{diag}(-2,1,1)
\]

be the unimodular generator already derived from the two-point family
algebra.  For one weighted triangle, define

\[
K_u=D-H(\delta),
\qquad
K_d=D+\eta H(-\delta)+\kappa X_1,
\]

and use the one-parameter marked-projector orbit

\[
U_\phi=e^{i\phi X_1}
\]

between their eigenbases.  The up affine slope is decreasing and the down
slope is increasing.  After fixing the common edge scale (c=1), the packet
has exactly six continuous variables:

\[
(a,b,\eta,\kappa,\delta,\phi).
\]

These solve exactly six inputs: two mass-squared locations and
((|V_{us}|,|V_{cb}|,|V_{ub}|,|J|)).

## Constructive witness

A representative endpoint-axis solution is

\[
\begin{aligned}
a&=0.9999995851507903,\\
b&=1.000019854192057,\\
c&=1,\\
\eta&=5.703109579622935\times10^{-4},\\
\kappa&=-6.953881369408575\times10^{-6},\\
\delta&=6.049203401201914\times10^{-6},\\
\phi&=-0.029700813213397174.
\end{aligned}
\]

It gives

\[
\begin{aligned}
r_u&=1.35775027876317\times10^{-5},\\
r_d&=3.497378191424648\times10^{-4},\\
|V_{us}|&=0.22500999994655,\\
|V_{cb}|&=0.04183000000004,\\
|V_{ub}|&=0.00373199999958,\\
|J|&=3.114999998855145\times10^{-5}.
\end{aligned}
\]

The full magnitude matrix is

\[
|V|=
\begin{pmatrix}
0.9743493070&0.2250100000&0.0037320000\\
0.2248774143&0.9734887774&0.0418300000\\
0.0085776705&0.0411108294&0.9991177725
\end{pmatrix}.
\]

Every entry lies close to the 2025 PDG central matrix.  This is a consistency
check, not nine independent predictions: unitarity strongly constrains the
remaining magnitudes once four independent CKM invariants are supplied.

## Why this is a real join

The construction uses one coherent packet:

- triangle shape and shared holonomy from the length-three defect middle;
- (X_1=I-3P_1) from the already-derived unimodular family algebra;
- the same (X_1) for both the Hermitian deformation and its unitary orbit;
- monotone physical eigenvalue order with the slope signs carried through;
- no arbitrary second edge matrix or post-hoc cyclic family permutation.

Five independently seeded global searches reached this solution or its
endpoint-reflected/phase-periodic copy.  A local logarithmic residual
Jacobian has six nonzero singular values,

\[
(3.71\times10^6,9.03\times10^5,63.97,1.305,0.542,0.020998),
\]

so the witness is locally isolated rather than a flat fit family.

## Why this is not yet a prediction

The parameter count is saturated:

\[
6\text{ continuous parameters}
=2\text{ spectral targets}+4\text{ CKM targets}.
\]

No unused continuous observable has been predicted.  The marked axis itself
is also an input: the corpus derives the three-element orbit
(P_e,P_\mu,P_\tau), but not which defect fiber is identified with the
physical endpoint axis.  Bounded searches found the endpoint axes with
(\kappa<0); the middle axis and all tested (kappa>0) branches did not
converge, but that is not a certified global exclusion.

The subsequent [type audit](1488_the_marked_ckm_witness_is_capacity_not_a_derived_quark_gauge_orbit.md)
adds a sharper qualification. The anomaly-safe (I-3P_alpha) generator is
derived in the lepton-family part of (B-3L_alpha), not as a down-quark
operator, and a common gauge action on the weak doublet cancels from CKM.
Its use here must therefore be read as an effective quark Yukawa spurion
whose microscopic origin remains to be constructed.

The join is highly sensitive.  In the chosen solver coordinates its
Jacobian condition number is (1.77\times10^8), reflecting the nearly
degenerate democratic seam.  The small quantities

\[
|a-c|, |b-c|, |\kappa|, \delta
\]

are all of order (10^{-5}), so the result replaces a gross charge hierarchy
with a correlated small-deformation hierarchy.  No action currently fixes
those correlations.

## Top-down and bottom-up convergence

Top down, the (\mathcal O(3)-\mathcal O(0)) residue produced a length-three
defect and its (1\oplus A_2) permutation module.  The two-point family
algebra independently produced the marked projector and its primitive
generator (I-3P_\alpha).  Bottom up, the quark data select the negative
marked-axis branch near the democratic locus.  The middle therefore joins
objects already present on both sides.

What remains is the selection law.  A Spin(2,3)-compatible defect action must
derive the map from one geometric fiber to (P_\alpha), the sign of
(\kappa), and at least one relation among the six continuous parameters.
The next high-value calculation is a naturalness and held-out-prediction
test: derive one coefficient ratio from the superconnection or Peirce
action, then refit no more than five inputs and predict the sixth.  Physical
admission remains false.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_marked_projector_ckm_join.mjs
~~~
