# Doubling the Carrier Is the Minimal Static/Even-Frequency Two-Antiunitary CAR Pairing Repair and Opposite Copy Charge Makes It Neutral

**Date:** 18 October 2026  
**Branches:** doubled CAR carrier, Nambu/conjugate completion, Furey antiunitaries, neutral cross pairing, minimality, Pfaffian root  
**Claim status:** exact finite-dimensional symmetry classification; fermionic Wick-to-Jordan map remains open  
**Certificate:** [find_the_minimal_doubled_car_pairing_fixed_by_both_furey_antiunitaries.mjs](scripts/find_the_minimal_doubled_car_pairing_fixed_by_both_furey_antiunitaries.mjs)

## Executive result

Document 1031 proved that a raw two-component **equal-time/even-frequency** CAR anomalous pair cannot be fixed by both Furey antiunitaries. The obstruction disappears at the next allowed carrier size.

Take two copies of the response doublet and let

\[
\Theta_4=I_{\rm copy}\otimes X K,
\qquad
\Gamma_4=I_{\rm copy}\otimes\varepsilon K.
\]

Among complex antisymmetric $4\times4$ pairing tensors, their simultaneous fixed space is exactly two-real-dimensional:

\[
\boxed{
F(s,v)=\varepsilon_{\rm copy}\otimes
(sI+i v\sigma_z),
\qquad s,v\in\mathbb R.}
\]

The corresponding static/even-frequency fixed space in one two-component copy is zero. Since an antiunitary squaring to $-I$ requires even complex dimension, four is the minimal enlargement within the repeated fundamental representation for that branch. Document 1033 shows that an internally symmetric odd-frequency pair already survives in one doublet, so the minimality claim must not be extended to all dynamical CAR kernels.

If the two copies carry opposite $U(1)$ charge, the cross-copy pair $F(s,v)$ is gauge neutral. This closes the first symmetry-and-charge existence gate for an enlarged CAR root.

It does **not** yet prove the desired fermionic Wick surjection. CAR Wick signs, the physical current operators, Lorentz contraction, quasifree positivity over frequency and the tuned UV tail must still be treated explicitly.

## 1. Why dimension two fails

For one response doublet every antisymmetric pairing tensor is

\[
F_2=\Delta\varepsilon.
\]

The two antiunitary fixed conditions require

\[
\Theta:\quad \Delta=-\bar\Delta,
\]

\[
\Gamma:\quad \Delta=\bar\Delta.
\]

Thus

\[
\operatorname{Fix}(\Theta)\cap\operatorname{Fix}(\Gamma)=\{0\}.
\]

This is the raw-CAR obstruction of document 1031.

## 2. The doubled carrier

Introduce a copy space $W_{\rm copy}\cong\mathbb C^2$ and channel space $W_{LQ}\cong\mathbb C^2$:

\[
W_4=W_{\rm copy}\otimes W_{LQ}.
\]

Let both antiunitaries act trivially on the copy label and in their established way on the channel label. A general antisymmetric pairing can contain within-copy antisymmetric blocks and a cross-copy block:

\[
F=
\begin{pmatrix}
A&T\\
-T^T&B
\end{pmatrix}.
\]

The preceding two-dimensional no-go forces $A=B=0$ in the common fixed space. The cross block must obey

\[
T=XT^*X,
\qquad
T=\varepsilon T^*\varepsilon^T.
\]

Their intersection is

\[
T=sI+i v\sigma_z.
\]

Therefore

\[
F=
\begin{pmatrix}
0&T\\
-T&0
\end{pmatrix}
=\varepsilon_{\rm copy}\otimes T.
\]

The certificate exhausts the real linear fixed equations: dimension zero for two complex modes and dimension two for four.

## 3. Static/even-frequency minimality

The graded antiunitary has

\[
\Gamma^2=-I.
\]

Its complex representation therefore has even dimension. Once the two-dimensional pairing fixed space is proved zero, the next possible size is four. The explicit two-real-dimensional solution at size four establishes minimality within the direct repeated-fundamental construction.

This does not exclude a differently typed carrier in another representation category or an odd-frequency symmetric pair. It proves the minimal static/even-frequency repair for the representation actually inherited from the two response channels.

## 4. Opposite copy charge makes the pair neutral

Assign copy charges

\[
Q_{\rm copy}=\operatorname{diag}(+1,-1).
\]

Then

\[
G(\theta)=
\operatorname{diag}(e^{i\theta}I_2,e^{-i\theta}I_2).
\]

Because $F$ is purely cross-copy,

\[
G(\theta)F G(\theta)^T=F.
\]

This is exactly the charge pattern of a particle/conjugate or oppositely charged two-copy completion. It repairs the ordinary $S\mapsto e^{2i\theta}S$ problem without invoking spontaneous breaking.

Whether the copy label is literally Nambu particle–hole, a neutral Peirce/conjugate pair, or another doubled response sector remains open.

## 5. Quasifree-state existence

The singular values of

\[
T=sI+i v\sigma_z
\]

are both

\[
\rho=\sqrt{s^2+v^2}.
\]

At half filling, a standard generalized CAR density matrix with normal block $N=\tfrac12I_4$ is positive whenever

\[
\rho\le\frac12.
\]

Thus the symmetry-fixed tensor is not merely formal: a bounded quasifree state can support it after normalization. This statement is local in frequency and does not yet provide the physical spectral normalization required by the silver target.

## 6. The relationship square and Pfaffian boundary

The common pair is parameterized by the same complex root coordinate

\[
w=s+iv
\]

that appeared in the commuting anomalous surjection. Quadratic combinations again produce

\[
\operatorname{Re}w^2=s^2-v^2,
\qquad
\operatorname{Im}w^2=2sv,
\]

and forget $w\mapsto-w$.

However, the Pfaffian of the full antisymmetric tensor depends only on

\[
\det T=s^2+v^2.
\]

It retains the radial magnitude but erases the relationship orientation. Therefore the desired two-axis Jordan tensor cannot be identified with the Pfaffian alone; it must use oriented bilinears of the cross-pair plane or a larger observable map.

## 7. What this does and does not close

Closed:

- nonzero simultaneous pairing exists after one minimal doubling;
- the fixed pairing plane has exactly two real dimensions;
- opposite copy charges make it gauge neutral;
- local quasifree positivity is possible.

Open:

- the correct gauge- and Lorentz-complete identification of the copy index;
- the CAR Wick covariance of physical relationship currents;
- whether its signs reproduce the positive $H_2(\mathbb R)$ cone rather than an indefinite form;
- the frequency-dependent quasifree positivity and KMS conditions;
- the $1/|\omega|$ UV obstruction;
- an explicit intertwiner to the neutral Peirce response root.

## 8. Stop-everything and falsification tests

**Fermionic-Wick trigger:** a gauge-neutral pair of CAR bilinears has connected covariance exactly equal to the anomalous square map of document 1031.

**Peirce/Nambu trigger:** the two copy sectors are derived as the neutral Peirce line and its conjugate, with the established antiunitaries acting exactly as above.

**Pfaffian trigger:** an oriented Pfaffian-line observable recovers both $s^2-v^2$ and $2sv$, not merely $s^2+v^2$.

**Falsifier:** a two-component nonzero CAR pair is claimed to preserve both antiunitaries.

**Falsifier:** the doubled tensor is called gauge neutral while both copies are assigned the same charge.

**Boundary warning:** the symmetry-fixed pairing plane is treated as proof of a Standard-Model Nambu sector before Lorentz and gauge representations are restored.

## Verdict

| Question | Verdict |
|---|---|
| Is there a nonzero common CAR pair in two complex dimensions? | **No** |
| Does one doubling produce a common pair? | **Yes; a two-real-dimensional plane** |
| Is four complex dimensions minimal in the repeated fundamental representation? | **Yes for static/even-frequency pairing; no for the odd-frequency branch** |
| Can the pair be $U(1)$ neutral? | **Yes, with opposite copy charges** |
| Does a locally positive quasifree state exist? | **Yes, below the pairing bound** |
| Is the fermionic Wick-to-Jordan surjection proved? | **No** |

## Position in the corpus

- [anomalous commuting/CAR typing fork](1031_anomalous_gaussian_pairing_gives_a_two_antiunitary_wick_surjection_but_only_for_a_neutral_commuting_or_nambu_root.md)
- [two Furey antiunitaries](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [minimal four-real response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [Furey response intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
