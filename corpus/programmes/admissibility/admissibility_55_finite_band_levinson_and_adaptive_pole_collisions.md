# Finite-band Levinson ledger and adaptive pole collisions

**Packet:** AZ-055  
**Date:** 24 October 2026  
**Status:** corrected finite-chain Levinson ledger closed; both pole collisions certified; arbitrary-graph generalization withheld  
**Parent:** [AZ-052 spectral-flow pole trajectories](admissibility_52_spectral_flow_pole_trajectories.md)  
**Evidence:** [finite-band ledger](../../../evidence/data/admissibility-finite-band-levinson-pole-ledger-v1.json)  
**Reproduction:** `node scripts/run-finite-band-levinson-pole-ledger.mjs`  
**Verification:** `node verification/admissibility/verify_finite_band_levinson_pole_ledger.mjs`

## Result

The apparent mismatch in AZ-052 was not a failure of spectral accounting. It combined an endpoint-truncated phase integral, underresolved narrow rotations and one omitted channel-background turn. For the declared full-line tight-binding channel with a nondegenerate finite Jacobi chain of (N_C) attached at one site, away from threshold states the corrected ledger is

\[
\boxed{N_{\rm b}+\nu_S-1=N_C},
\qquad
\nu_S={1\over2\pi}\Delta_{k:0\to\pi}\arg s(k).
\]

For the nine-site SSH-plus-local cluster, (N_C=9). At both dimerizations and all seven original controls, the strict exterior count and threshold-aware scattering winding exchange one unit:

\[
(N_{\rm b},\nu_S)=(3,7)\longleftrightarrow(2,8),
\]

so the corrected ledger remains nine. The maximum winding residual from an integer is (8.97\times10^{-10}). A 36-case census over odd cluster sizes (3,5,7,9,11,13), both dimerizations and three controls returns the corresponding cluster size in every case.

This closes the model-family result, not a universal theorem for arbitrary graphs, multichannel leads or threshold-degenerate attachments.

## Why the correction is fixed

Write

\[
A(E)=\det(E-H_C),\qquad
C(E)=\operatorname{cof}_{00}(E-H_C),\qquad
U(E)=v_c^2{C(E)\over A(E)}.
\]

The scattering eigenvalue is the ratio of the two boundary values

\[
s(k)={2i\sin k\,A(E)+v_c^2C(E)\over
2i\sin k\,A(E)-v_c^2C(E)},
\qquad E=-2\cos k.
\]

For an irreducible Jacobi chain, the roots of (A) and (C) interlace. The argument principle then partitions the added states between exterior zeros of the dressed determinant and rotations of this Jost ratio. Compactifying the two band endpoints in the declared one-channel convention contributes the fixed background turn, hence the subtraction of one. The correction is therefore fixed by the carrier and phase convention; it is not fitted separately at each control.

## Certified collision controls

A pole reaches an edge only when the contact-deleted cofactor vanishes there:

\[
C(\pm2;\epsilon_L^*)=0.
\]

The four critical controls are

| rail | lower edge | upper edge |
|---|---:|---:|
| trivial ((t_1,t_2)=(1,0.45)) | (-1.8794115284773067) | (+1.8794115284773063) |
| reversed ((0.45,1)) | (-1.9052413345166546) | (+1.9052413345166546) |

All cofactor residuals vanish at machine precision. Predictor-corrector continuation on the continued sheet and a threshold-momentum scan (q=\sqrt{|E|-2}) on the physical sheet locate the same collision from opposite sides. Continued-sheet determinant residuals stay below (4.23\times10^{-14}).

Over the last five detunings, the pole-edge distance is linear in (|\epsilon_L-\epsilon_L^*|): fitted exponents lie between (0.999945) and (0.999979) on the continued side and between (1.000047) and (1.000197) on the bound side. The apparent crossings are therefore not sampling or branch-choice artifacts.

## Phase, delay, residue and localization

At a control detuning of (10^{-4}):

- the pole-edge distance is (9.0\text{--}9.5\times10^{-5});
- the continued width is (2.30\times10^{-8}) for the reversed rail and (1.07\times10^{-7}) for the trivial rail;
- the exterior localization length has grown to (102.8\text{--}105.4) sites;
- the local-level residue agrees across the two sheets to better than (3\times10^{-4}) in the trivial case and (6\times10^{-5}) in the reversed case;
- the Wigner-delay magnitude rises into the (10^3\text{--}10^4) range. Its sign follows the scattering convention; the divergence, rather than that sign, is the invariant collision indicator.

Thus the count jump, integer phase rotation, delay singularity, residue continuation and localization divergence describe one edge event.

## Admission ledger

| proposition | status |
|---|---|
| Both physical/continued-sheet collision controls are localized for both rails | `SUPPORTED_IN_MODEL` |
| The collisions survive branch-consistent continuation with certified residuals | `SUPPORTED_IN_MODEL` |
| (N_{\rm b}+\nu_S-1=N_C) on the declared finite Jacobi side-chain family | `SUPPORTED_AND_FAMILY_CENSUSED` |
| The correction is an SSH bulk topological invariant | `RULED_OUT` |
| The same formula holds for arbitrary graphs, multichannel leads or threshold degeneracies | `NOT_ESTABLISHED` |
| Spin(2,3) constrains the ledger | `NOT_ESTABLISHED` |

## Implication

OT-014 and OT-041 close positively but narrowly. The useful invariant is a carrier-specific conservation ledger: a bound state lost to the band reappears as one unit of scattering winding after the fixed threshold/background normalization. Reversing the SSH dimerization moves the collision controls and residues but does not change the ledger. The result therefore supplies a benchmark that a more fundamental action would have to reproduce; it does not identify that action.

The next independent question is OT-036: replace the phenomenological capture bath with a microscopic radiative or phononic channel while retaining this spectral ledger.
