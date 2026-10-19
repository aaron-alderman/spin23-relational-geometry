# A Stacked Pseudoinverse Recovers Shared Orientation from Singular Sectors

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08, B09 and B11  
**Claim status:** exact singular-sector extension of the shared-left flux identity; physical localization-basis extraction remains open

## 1. Why separate inverses are too restrictive

The identity

\[
P_uC_u^{-1}=P_dC_d^{-1}
\]

assumes both magnitude cross-ratio matrices are invertible. A right-handed family may instead be effectively collinear, giving

\[
\det C_f=0.
\]

That should not automatically destroy the shared-left geometric test.

## 2. Common left action

With an invertible left-displacement matrix \(A\),

\[
C_f=\frac1{2\sigma^2}AB_f^T,
\qquad
P_f=\kappa AJB_f^T.
\]

Define

\[
M=2\kappa\sigma^2AJA^{-1}.
\]

Then, without requiring \(B_f\) or \(C_f\) to be invertible,

\[
\boxed{P_f=MC_f.}
\]

The inverse formula was only one way to solve this linear equation; it was not the fundamental relation.

## 3. Stack the sectors

Form the horizontal matrices

\[
\mathcal C=(C_u\;C_d),
\qquad
\mathcal P=(P_u\;P_d).
\]

The shared-geometry condition is

\[
\boxed{\mathcal P=M\mathcal C.}
\]

If

\[
\operatorname{rank}\mathcal C=2,
\]

then \(M\) is unique even when each individual \(C_f\) has rank one:

\[
\boxed{
M=
\mathcal P\mathcal C^T
(\mathcal C\mathcal C^T)^{-1}.}
\]

This is the full-row-rank Moore--Penrose solution.

## 4. Exact tests

The singular formulation supplies three independent checks:

1. **Residual**

   \[
   \|\mathcal P-M\mathcal C\|=0.
   \]

2. **Tracelessness**

   \[
   \operatorname{tr}M=0.
   \]

3. **Complex-structure square**

   \[
   M^2=-(2\kappa\sigma^2)^2I.
   \]

In noisy data, the residual and deviation of \(M^2\) from a negative scalar become quantitative goodness-of-fit statistics.

## 5. Complementary collinear sectors

The certificate uses rank-one \(C_u\) and rank-one \(C_d\) whose images are different. Neither sector can determine \(M\) alone, but

\[
\operatorname{rank}(C_u\;C_d)=2,
\]

so their combination recovers the common orientation exactly.

This is a useful relational principle: two individually incomplete faces can determine the shared carrier action through their complementary relationships.

## 6. Failure modes

If the stacked matrix also has rank one, \(M\) is not unique. This happens when:

- the left-family displacements are collinear;
- both right-handed sectors probe the same single left direction;
- one sector is trivial and the other is rank one.

In that case a two-dimensional oriented plane is not identifiable from quark data alone. One may add the lepton sectors to the stack only if the same left geometric action is derived rather than assumed.

## 7. Jordan/Spin\((2,3)\) interpretation

The equation

\[
\mathcal P=M\mathcal C
\]

has the programme's carrier/relationship form:

- \(\mathcal C\) stores unoriented relational magnitudes;
- \(\mathcal P\) stores oriented relational phases;
- \(M\) is the shared left action converting one to the other.

Its negative-square condition makes \(M\) a scaled complex structure on a real two-plane. This is compatible with, but does not derive, the proposed “one carrier, two faces, three relationships” narrative or the Spin\((2,3)\) pole.

## 8. Stop-everything and falsification gates

**Relational trigger:** singular up and down sectors jointly recover one source-derived \(M\) with a small residual and negative-scalar square.

**Cross-family trigger:** quark and lepton stacks recover the same \(M\) for an independently justified common transverse carrier.

**Dimension failure:** the full stack remains rank one, ruling out identification of a two-dimensional flux plane from these sectors.

**Falsifier:** separate unstable inverses are used when the stacked pseudoinverse gives a large residual or inconsistent complex structure.

## 9. Certificate

The [shared-left singular pseudoinverse certificate](scripts/verify_shared_left_singular_pseudoinverse_relation.mjs) constructs individually singular up/down matrices with complementary images, recovers the unique common \(M\) from the stacked pseudoinverse, verifies zero residual and confirms its traceless negative-square identity.

## Companion documents

- [Shared-left magnitude/phase identity](248_shared_left_geometry_links_flux_phases_to_magnitude_cross_ratios.md)
- [Transverse-flux flavor CP](247_transverse_flux_generates_flavor_cp_without_changing_overlap_magnitudes.md)
- [Constant-kernel pseudoinverse sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
- [Relational carrier and Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
