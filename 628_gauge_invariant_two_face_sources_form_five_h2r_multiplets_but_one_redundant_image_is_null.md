# Gauge-Invariant Two-Face Sources Form Five (H_2(mathbb R)) Multiplets, but One Redundant Image Is Null

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B08 and B11  
**Claim status:** exact classification from the completed-module commutant; composite realization and sector selection remain open  
**Certificate:** [classify_gauge_invariant_two_face_composite_sources.mjs](scripts/classify_gauge_invariant_two_face_composite_sources.mjs)

## Executive result

The exact Standard-Model commutant

\[
\operatorname{End}_{SM}(\mathcal M)=\bigoplus_{r=1}^5\mathbb CP_r
\]

classifies all gauge-singlet sesquilinear sources on the two topology faces. Before exchange fixing, the Hermitian source space is

\[
\bigoplus_{r=1}^5H_2(\mathbb C)_r,
\]

of real dimension twenty. Antiunitary face exchange \(\Theta=\sigma_xK\) fixes

\[
\boxed{\bigoplus_{r=1}^5J_{z,r}\cong\bigoplus_{r=1}^5H_2(\mathbb R)_r,}
\]

of real dimension fifteen.

There is therefore a precise gauge-covariant source multiplet for the auxiliary construction of [document 627](627_a_nondynamical_two_face_field_realizes_the_h2r_response_without_mirror_poles.md). But it is fivefold, and gauge symmetry does not select the lepton copy.

A second exact result is more restrictive: if the second face is merely one deterministic exchanged image of the first, its Gram kernel has determinant zero. The full cone interior requires at least two non-collinear positive channels or a mixed spectral state—not a second propagating matter multiplet.

## 1. Source basis

Let \(\psi_A\in T_A\), \(\psi_B\in T_B\), and let \(S:T_A\to T_B\) be the completed-module intertwiner. For each physical sector \(r\), define

\[
\begin{aligned}
O_{r,0}&=\psi_A^\dagger P_r\psi_A+\psi_B^\dagger P_r\psi_B,\\
O_{r,x}&=\psi_A^\dagger P_rS^\dagger\psi_B+psi_B^\dagger SP_r\psi_A,\\
O_{r,y}&=-i\psi_A^\dagger P_rS^\dagger\psi_B+i\psi_B^\dagger SP_r\psi_A.
\end{aligned}
\]

The relation \(Sg_A=g_BS\) makes every expression gauge invariant. They correspond to the face matrices

\[
I,\qquad\sigma_x,\qquad\sigma_y.
\]

These three matrices span the population-normal real Jordan algebra. Hence each sector supplies one complete \(H_2(\mathbb R)\) source multiplet.

## 2. Antiunitary and unitary exchange are different

For a Hermitian face matrix

\[
H=tI+x\sigma_x+y\sigma_y+z\sigma_z,
\]

antiunitary exchange acts as

\[
H\longmapsto\sigma_x\bar H\sigma_x
=tI+x\sigma_x+y\sigma_y-z\sigma_z.
\]

Its fixed space has basis \((I,\sigma_x,\sigma_y)\) and real dimension three.

Pure unitary swap instead gives

\[
H\longmapsto\sigma_xH\sigma_x
=tI+x\sigma_x-y\sigma_y-z\sigma_z,
\]

whose fixed space has only \((I,\sigma_x)\). It erases one relationship coordinate. Thus the antiunitary real structure is essential for the full Lorentz cone; a unitary swap alone is insufficient.

## 3. Exact source counts

The classification is:

| Source class | Real dimension |
|---|---:|
| One-topology Hermitian gauge singlets | 5 |
| Unrestricted two-face Hermitian gauge singlets | 20 |
| Antiunitary-exchange-fixed singlets | 15 |
| Unitary-swap-fixed singlets | 10 |
| Antiunitary-fixed cross-face terms only | 10 |
| Lepton-sector antiunitary-fixed multiplet | 3 |

The three lepton sources are exactly one \(H_2(\mathbb R)\) carrier. Nevertheless, the other four sector projectors obey the same symmetry requirements. The lepton zero-locus theorem and the source action still have to be connected; gauge invariance alone does not perform that selection.

## 4. One redundant image lies on the null boundary

Suppose no independent \(B\)-face matter exists and instead

\[
\psi_B=e^{i\theta}S\psi_A.
\]

For sector population \(n=\|P_r\psi_A\|^2\), the paired Gram matrix is

\[
G_r=n
\begin{pmatrix}
1&e^{i\theta}\\
e^{-i\theta}&1
\end{pmatrix}.
\]

Therefore

\[
\boxed{\det G_r=0.}
\]

The exchange-redundant realization automatically gives a rank-one lightlike ray of the carrier cone. It avoids mirror doubling but cannot by itself generate a generic timelike interior response.

## 5. Two channels populate the interior

For two positive channels of weights \(n_1,n_2>0\) and phases \(\theta_1,\theta_2\),

\[
G=\sum_{j=1}^2n_j
\begin{pmatrix}1&e^{i\theta_j}\\e^{-i\theta_j}&1\end{pmatrix}
\]

has determinant

\[
\det G
=2n_1n_2\bigl[1-\cos(\theta_1-\theta_2)\bigr].
\]

It is strictly positive exactly when the phase rays are non-collinear. The certificate checks \((n_1,n_2)=(3,4)\) and relative phase \(\pi/2\), giving \(\det G=24\).

Thus cone interior can arise from:

- multiple composite operators built from the same physical fields;
- a mixed state or ensemble;
- multiple spectral thresholds;
- boundary channels or coarse graining.

None requires a second asymptotic chiral multiplet.

## 6. The ambient-pairing caveat

The cross term must explicitly use the intertwiner \(S\). The ordinary ambient Hilbert–Schmidt pairing between different topology blocks vanishes whenever their matrix-unit supports are orthogonal. Writing \(S^\dagger\psi_B\) pulls the second face back to the first completed module and is what makes the scalar comparison typed and gauge invariant.

Consequently, the source is intrinsic only if \(S\) itself lifts from the completed representation to the source CAR/nested algebra. This is the same source-level pin already identified in [document 618](618_the_neutral_furey_exchange_intertwines_the_completed_standard_model_module.md).

## 7. Stop-everything criteria

Stop the composite-source route if:

1. \(S\) has no source-algebra lift, making the cross bilinears representation-level inventions;
2. no existing-field construction supplies two non-collinear positive channels;
3. selecting \(P_L\) requires an arbitrary coefficient rather than the Hermitian incidence law or another derived symmetry;
4. renormalization generates an exchange-odd \(\sigma_z\) source that cannot be controlled;
5. the only interior realization requires independent mirror matter.

## 8. Next gate

Test the five sector source multiplets against the explicit Hermitian response operator

\[
R_x^{\rm H}(z)=xS(x)^\dagger z+zS(x)^\dagger x.
\]

The next calculation should determine whether its linearized susceptibility annihilates or suppresses the four nonleptonic source multiplets while retaining the full lepton \(H_2(\mathbb R)\) triplet. Failure would mean the zero-locus selector and the response-source carrier are adjacent constructions rather than one mechanism.

This gate is resolved at completed-module level in [The Furey incidence Laplacian derives the lepton projector, but the raw response is flat](629_the_furey_incidence_laplacian_derives_the_lepton_projector_but_the_raw_response_is_flat.md): the raw response has zero linear susceptibility on \(L\), while its positive incidence Laplacian derives \(P_L\) exactly.

## Reproducibility

```powershell
node scripts\classify_gauge_invariant_two_face_composite_sources.mjs
```
