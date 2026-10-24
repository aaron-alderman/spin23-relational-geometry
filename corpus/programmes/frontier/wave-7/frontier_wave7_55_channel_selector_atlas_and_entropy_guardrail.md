# Frontier Wave 7.55: Channel Selector Atlas and the Entropy Guardrail

**Date:** 24 October 2026  
**Status:** exact selector separation; microscopic objective remains open  
**Ledger:** [channel selector atlas](channel_selector_atlas_v1.json)  
**Certificate:** [selector atlas verifier](../../../../verification/verify/verify_channel_selector_atlas.mjs)

## Result

The positive Gram disk is an admissible set, not an objective function. Several
natural optimizations on that same set select different physical channels.
This prevents the phrase “admissibility is an optimization problem” from
silently hiding the choice of what is optimized.

For fixed contractions \(f_0,f_1\), write

\[
c=\overline{f_1}f_0,
\qquad
R^2=(1-|f_0|^2)(1-|f_1|^2).
\]

The admissible overlaps obey

\[
|s-c|\le R,
\qquad
\det G(s)=R^2-|s-c|^2.
\]

## 1. Four different selection problems

### Maximum Gram volume

Maximizing \(\det G\) uniquely selects

\[
s=c.
\]

The two residual vectors are then orthogonal and the three-ray environment has
maximal squared volume. This is the Gram-centre construction used by the
causal silver seam.

### Maximum conditioned-environment entropy

For an equal mixture of the two conditioned environment rays, the eigenvalues
depend only on \(|s|\). Its entropy is maximized by minimizing \(|s|\), hence
by projecting the origin onto the Gram disk. If the disk contains zero, the
selection is

\[
s=0,
\]

not \(s=c\).

### Minimum three-ray purity

For the equal mixture of the reference ray and both conditioned rays,

\[
\operatorname{Tr}(\rho^2)
=\frac{3+2(|f_0|^2+|f_1|^2+|s|^2)}9.
\]

It has the same minimum-\(|s|\) selection. Thus maximum determinant must not be
renamed maximum entropy: they are distinct criteria even on this minimal
system.

### Minimum environment dimension

Minimizing the dilation dimension selects

\[
|s-c|=R,
\]

where \(\det G=0\) and the Gram rank generically falls from three to two. This
is an entire boundary circle, not a unique point.

## 2. Exact rational separation

For the partial-sewing checkpoint

\[
f_0=\frac35,
\qquad
f_1=\frac5{13},
\]

the disk has

\[
c=\frac3{13},
\qquad
R=\frac{48}{65}.
\]

It contains the origin. Consequently:

\[
\text{maximum volume selects }s=\frac3{13},
\qquad
\text{minimum purity selects }s=0.
\]

Moreover,

\[
\det G(3/13)=\frac{2304}{4225}
>
\det G(0)=\frac{2079}{4225}.
\]

The disagreement is exact, not numerical noise.

## 3. Where the silver value actually comes from

Claim 1019 combines two declared requirements:

1. maximize Gram volume, selecting \(s=c\); and
2. require that selected centre to globalize as a one-chart causal Schur
   transfer.

Within the silver family this forces

\[
\ell=\operatorname{arsinh}(1).
\]

That is a valid conditional selector. It is not a generic maximum-entropy
principle and it does not yet explain why a physical environment maximizes
residual volume.

## 4. Admissibility and optimization

The corrected hierarchy is

\[
\text{kinematics defines variables}
\longrightarrow
\text{admissibility defines the feasible region}
\longrightarrow
\text{physics supplies an objective}
\longrightarrow
\text{dynamics selects a point or attractor}.
\]

Admissibility can be more fundamental than a particular action while still
not being sufficient to determine the action. The boundary, centre and
minimum-modulus point are all admissible but encode different physical
commitments.

## 5. Experimental consequence

The competing selectors predict different coherence:

- volume selection predicts \(s=\overline{f_1}f_0\);
- dephasing-entropy selection predicts the smallest admissible \(|s|\);
- minimal-port selection predicts saturation of the Gram determinant bound.

Tomography of \(f_0,f_1,s\) can therefore distinguish the objective class
without first knowing its microscopic origin.

[Wave 7.56](frontier_wave7_56_gram_disk_selector_discriminator.md) turns this
into a normalized disk coordinate, four competing hypotheses and a
preregisterable measurement contract.

## Verdict

\[
\boxed{
\text{admissibility gives the disk};\quad
\text{the selector chooses centre, nearest-origin point, or boundary}.
}
\]

The missing physical datum is now sharper: not merely “a potential,” but the
operational reason nature values residual volume, environmental
distinguishability, implementation economy, or some measured combination.

## Boundary

The atlas compares specific natural objectives; it does not prove these are
exhaustive. Causal analyticity is a global frequency constraint and cannot be
replaced by a pointwise entropy calculation.
