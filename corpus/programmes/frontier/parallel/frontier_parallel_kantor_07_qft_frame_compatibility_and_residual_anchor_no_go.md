# Frontier Parallel 4e: QFT Fixes the Source Shear and Fork, but Gram Plus Area Does Not Fix the Topology-to-Source Frame

**Date:** 18 October 2026  
**Status:** exact compatibility and residual-stabilizer theorem  
**Inputs held fixed:** QFT source results in `frontier_parallel_qft_01` through `05`; no QFT output is modified

## Result

The surviving quadratic two-face bridge is compatible with the QFT source geometry, but it still does not determine the physical source frame by itself.

Three ambiguities must be separated:

1. the continuous (B-L) shear of incidence;
2. the discrete deduplicated-versus-multiplicity incidence fork;
3. the rotation identifying the abstract topology/contact plane with the QFT source plane.

The new QFT results resolve the first two only when different data are combined:

- every Yukawa-divergence coordinate is blind to the (B-L) shear;
- the charged-lepton channel distinguishes the incidence fork through (2\) versus (4);
- the positive action-derived QFT Gram selects the unique (B-L)-orthogonal representative inside either chosen fork.

However, a two-face Gram metric together with its separate contact-area form has an (SO(2)) automorphism group. It contains no preferred line to identify with (B-L) or incidence. Therefore:

\[
\boxed{
\text{QFT metric + charged-lepton fork data fix the source frame internally,}
\quad
\text{but one topology-to-source anchor is still missing.}
}
\]

Once one oriented anchor is supplied, the matching is unique. If only an unoriented line is supplied, a common (mathbb Z_2) sign remains.

## 1. QFT source data

Use source coordinates

\[
(\lambda,q),
\qquad q=3(B-L).
\]

The allowed shear is

\[
\lambda\mapsto\lambda+cq,
\qquad
T_c=\begin{pmatrix}1&0\\c&1\end{pmatrix}.
\]

It fixes (q) and has

\[
\det T_c=1.
\]

The four Yukawa-divergence coordinates are

\[
d_d=(10,6,2,1),
\qquad
d_m=(10,6,4,1).
\]

Each channel is a covector proportional to ((1,0)) on the two-current plane because it annihilates (q). Hence

\[
d_aT_c=d_a
\]

for every channel (a) and every (c).

This imports two exact QFT facts:

- no collection of Yukawa-divergence observables measures the (B-L) shear;
- the charged-lepton entry is nevertheless different in the two incidence classes.

The relevant source results are [the rank-one/channel-growth theorem](frontier_parallel_qft_05_rank_one_up_yukawa_and_channel_growth.md) and [the Born source response](frontier_parallel_qft_01_born_incidence_bl_current_cut.md).

## 2. Why the contact-area line does not remove the shear

Let

\[
\omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\]

be the oriented contact area. Every two-dimensional determinant-one transformation preserves it:

\[
T_c^T\omega T_c=\omega.
\]

Therefore the separate (K)-orientation line adds no sensitivity to (c). This is the exact obstruction:

\[
\boxed{
\text{Yukawa divergence} + \text{contact orientation}
\quad\text{is still invariant under }\lambda\mapsto\lambda+cq.
}
\]

Orientation rules out determinant-negative frame changes. It cannot distinguish two frames related by an area-preserving shear.

## 3. Charged leptons choose the incidence fork, not the shear

The up and down coordinates agree between the two candidates. The charged-lepton coordinate is

\[
d_e(\lambda_d)=2,
\qquad
d_e(\lambda_m)=4.
\]

Thus a calibrated charged-lepton divergence measurement can choose the discrete fork. But since (d_e(q)=0),

\[
d_e(\lambda+cq)=d_e(\lambda).
\]

The measurement selects the affine incidence class, not one representative inside it.

This is exactly the right division of labour: charged leptons solve the discrete question that the quark channels cannot solve, while no Yukawa-breaking channel is asked to measure a conserved-current shear.

## 4. The QFT Gram fixes the shear internally

The ultraviolet/source Grams are

\[
G_d=\begin{pmatrix}231&9\\9&48\end{pmatrix},
\qquad
G_m=\begin{pmatrix}239&15\\15&48\end{pmatrix}.
\]

Inside a declared affine class, require the incidence representative to be (G)-orthogonal to (q):

\[
\lambda^\perp=\lambda
-\frac{G(\lambda,q)}{G(q,q)}q.
\]

This gives

\[
\lambda_d^\perp=\lambda_d-\frac3{16}q,
\qquad
\|\lambda_d^\perp\|^2_G=\frac{3669}{16},
\]

and

\[
\lambda_m^\perp=\lambda_m-\frac5{16}q,
\qquad
\|\lambda_m^\perp\|^2_G=\frac{3749}{16}.
\]

Unlike (omega), a fixed positive Gram is not preserved by a generic (T_c). It therefore removes the shear once the source action and incidence class are declared. This agrees with [the action-derived source block](../../lane-expansion/programme_lane_expansion_33_the_action_derived_two_current_block_removes_bl_shear_but_not_the_incidence_normalisation_fork.md).

The combined QFT selector is consequently:

\[
\text{charged-lepton channel chooses }d\text{ or }m,
\qquad
G_{d/m}\text{ chooses }\lambda_{d/m}^\perp.
\]

## 5. Residual topology-frame theorem

Now consider the real two-face amplitude plane (W). Its quadratic Gram metric (g_W) and contact area (omega_W) determine an oriented Euclidean plane. They do not determine an axis.

After whitening (g_W) to (I), every rotation

\[
R(\theta)\in SO(2)
\]

satisfies

\[
R(\theta)^TIR(\theta)=I,
\qquad
R(\theta)^T\omega R(\theta)=\omega.
\]

The quarter turn

\[
R(\pi/2)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\]

is an explicit nonidentity stabilizer. Thus metric plus area leaves a full (SO(2)) torsor of maps from (W) to the now internally fixed QFT source frame.

This is not the (B-L) shear. The shear lives inside the source-coordinate ambiguity and is removed by the QFT Gram. The rotation is the remaining cross-layer identification ambiguity:

\[
\text{which topology amplitude direction is }q,
\quad
\text{and which is }\lambda^\perp?
\]

Neither a Gram determinant nor an orientation sign answers that question.

## 6. Minimal missing datum

One nonzero topology-side vector or covector with a physical source interpretation is sufficient.

- An **oriented unit vector** mapped to the normalized (q) axis removes the whole (SO(2)) stabilizer.
- An **unoriented line** leaves only the common sign ({pm I}).
- A topology-side linear functional identified with the charged-lepton divergence covector works equally well, but asserting that identification is already the missing operator intertwiner.

Therefore the smallest honest bridge is not another invariant. It is one anchored operator map:

\[
\boxed{
\text{one topology face/contrast}
\longleftrightarrow
q\text{ or }d_e.
}

After that anchor, the QFT Gram, charged-lepton fork, and contact orientation determine the rest of the two-dimensional frame.

### Existing anchor candidates do not yet cross the layer

The corpus already contains two near-misses.

First, [the two named Peirce faces](../../../claims/0500-0599/569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md) remove the contraction ambiguity *inside the topology algebra*. Their status as normalized physical/source faces remains an explicit hypothesis. They do not identify either face with (q) or with a QFT divergence functional.

Second, [the unique electron cycle](../../../claims/0500-0599/577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md) selects the charged-lepton response channel. This converges with the QFT result that charged leptons distinguish the incidence fork. But channel selection is not yet an intertwiner: the cycle leaves the Gram arrow's sign, phase and normalization free, while the QFT datum is a covector on current space.

The strongest current candidate is consequently:

\[
\text{electron topology contrast}
\stackrel{?}{\longmapsto}
d_e.
\]

Proving this map at operator level would supply the missing anchor. Merely observing that both sides mention charged leptons would be circular.

## 7. Compatibility ledger

| datum | removes shear? | selects fork? | fixes topology rotation? |
|---|---:|---:|---:|
| Yukawa-divergence coordinates | no | charged lepton: yes | no |
| contact-area orientation | no | no | removes reflections only |
| fixed QFT Gram | yes, inside a fork | no | no |
| charged-lepton divergence | no | yes | only if independently anchored to topology |
| one topology-to-source line | not by itself | not by itself | yes, up to sign |
| all four combined | yes | yes | yes, up to declared sign convention |

## 8. Verdict

The quadratic two-face construction passes the compatibility test but fails autonomous frame selection.

It can reproduce the same abstract (H_2(\mathbb R)) geometry as the QFT source response. Its area line is correctly typed as the missing orientation datum. Yet the pair ((g_W,\omega_W)) is homogeneous under (SO(2)), so it cannot name the protected (B-L) direction.

The exact endpoint is:

\[
\boxed{
\begin{aligned}
&\text{QFT determines: fork }+\text{ shear-fixed source frame};\\
&\text{topology determines: metric }+\text{ orientation};\\
&\text{still missing: one operator-level anchor between them.}
\end{aligned}}
\]

This is a one-anchor problem, not a general (GL(2)) ambiguity anymore.

## 9. Stop-everything and falsification criteria

- **Shear-removal falsifier:** the declared QFT Gram fails to be a physical common bilinear form across the matching window.
- **Fork falsifier:** charged-lepton tomography cannot distinguish the (2) versus (4) coordinate after full matching.
- **Autonomous-topology no-go falsifier:** a vector or covector canonically constructible from (g_W) and (omega_W) alone.
- **Promotion criterion:** the Furey/Higgs/boundary construction produces one named contrast whose QFT divergence coordinates are proportional to either (q) or the charged-lepton discriminator.
- **Stop-everything positive:** the same anchor transports the contact (K)-sign to the measured signed interference while the QFT Gram fixes its normalization.

## 10. Reproduction

```powershell
node verification/verify/verify_frontier_kantor_qft_frame_compatibility.mjs
```

The certificate verifies shear invariance of every divergence coordinate and the area form, the (2/4) charged-lepton fork, both QFT orthogonal representatives, the nontrivial (SO(2)) topology stabilizer, and its collapse after adding an anchor.

## Dependencies

- [Quadratic two-face minimum](frontier_parallel_kantor_06_nambu_boundary_intertwiner_classification.md)
- [Born QFT source response](frontier_parallel_qft_01_born_incidence_bl_current_cut.md)
- [QFT channel-growth theorem](frontier_parallel_qft_05_rank_one_up_yukawa_and_channel_growth.md)
- [Action-derived shear removal](../../lane-expansion/programme_lane_expansion_33_the_action_derived_two_current_block_removes_bl_shear_but_not_the_incidence_normalisation_fork.md)
- [Named topology faces](../../../claims/0500-0599/569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md)
- [Electron-cycle channel selector](../../../claims/0500-0599/577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md)

