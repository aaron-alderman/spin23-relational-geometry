# YIG three-mode no-go and four-mode tripod gate

**Date:** 25 October 2026  
**Status:** reported three-mode protected-doublet branch closed; four-mode extension specified  
**Topic:** OT-012  
**Parent:** [hybrid bosonic frontier](admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md)  
**Evidence:** [mode-fork ledger](../../../evidence/data/admissibility-yig-three-four-mode-fork-v1.json)  
**Generator:** [mode-fork calculation](../../../scripts/run-admissibility-yig-mode-fork.mjs)  
**Verifier:** [mode-fork certificate](../../../verification/admissibility/verify_yig_mode_fork.mjs)

## Result

The reported photon–magnon–phonon YIG experiment is a genuine triple-strong-coupling platform, but it is not the three-mode carrier required by the corpus's protected-doublet holonomy. This is a structural distinction, not a complaint about experimental quality.

The driven rotating-frame matrix has the chain form

\[
H_3=
\begin{pmatrix}
\Delta_a & g_{ma} & 0\\
g_{ma} & \Delta_m & G\\
0 & G & \Delta_b
\end{pmatrix}.
\]

When (g_{ma}\neq0) and (G\neq0), this is an irreducible real symmetric tridiagonal matrix. Such a Jacobi matrix has simple eigenvalues. It therefore cannot carry an exact degenerate doublet. At triple resonance its spectrum is

\[
\left\{0,+\sqrt{g_{ma}^2+G^2},-\sqrt{g_{ma}^2+G^2}\right\},
\]

so it has one dark direction, not a two-dimensional dark plane.

\[
\boxed{
\text{three hybrid species}\neq
\text{one bright direction plus a protected dark doublet}
}
\]

## The measured near-doublet test

The strongest alternative reading is to treat the driven upper-polariton/phonon normal-mode pair as a near-doublet and the opposite polariton as the remote line. The resonant photon–magnon coupling (g_{ma}/2\pi=6.63\,\mathrm{MHz}) gives an approximate remote-polariton separation of (2g_{ma}=13.26\,\mathrm{MHz}).

The reported pump-enhanced couplings then give:

| drive | (G/2\pi) | pair split (2G/2\pi) | split / 13.26 MHz | excess over AZ-027 | resolved by reported linewidths? |
|---:|---:|---:|---:|---:|---:|
| -6.8 dBm | 3.06 kHz | 6.12 kHz | (4.615\times10^{-4}) | 1.92 | no |
| 2.4 dBm | 5.40 kHz | 10.8 kHz | (8.145\times10^{-4}) | 3.38 | yes |
| 16.53 dBm | 25.71 kHz | 51.42 kHz | (3.878\times10^{-3}) | 16.12 | yes |

The AZ-027 reference budget permits a pair splitting no larger than (3.191\,\mathrm{kHz}), or (G/2\pi\le1.595\,\mathrm{kHz}), on this gap estimate. Every reported coupling case exceeds that relative-splitting budget. The weakest case is not resolved from its (6.99\,\mathrm{kHz}) polariton decay; the two resolved cases split the pair too strongly.

This numerical collision reinforces the structural result. Turning (G) down can reduce a split, but it does not create a protected two-dimensional eigenspace or the three-component closed coupling-vector loop needed for non-Abelian transport.

The primary source is Shen et al., [*Cavity-magnon polaritons strongly coupled to phonons*](https://www.nature.com/articles/s41467-025-60799-x) (2025). The source reports the couplings and linewidths; the AZ-027 comparison and architectural verdict are calculations of this corpus.

## The minimal admitted extension

One central mode coupled to three resonant outer modes has

\[
H_4=
\begin{pmatrix}
0&k_1&k_2&k_3\\
k_1^*&0&0&0\\
k_2^*&0&0&0\\
k_3^*&0&0&0
\end{pmatrix},
\]

with spectrum

\[
\{+\|k\|,-\|k\|,0,0\}.
\]

This is the first YIG-family architecture in the fork with the correct two-dimensional dark kernel. It needs one additional outer partner coupled to the same central mode. Candidate auxiliaries include a second cavity mode, a second independently pumped mechanical sideband, or a second magnon mode.

The dimension count alone is not admission. A build must provide:

- three independently calibrated complex couplings (k_1,k_2,k_3);
- a common outer-mode rotating-frame frequency within the residual-splitting budget;
- a closed coupling-vector loop and its reversed schedule;
- complex two-dimensional dark-space process tomography against an external reference;
- and a selector (Y) switched or staged separately from the neutral tripod loop.

The 2025 experiment supplies none of the third outer mode, closed three-component loop, two-dimensional dark-projector tomography or independent selector. It does supply an unusually strong toolbox: two coherent microwave ports, phase and amplitude control, magnetic tuning, a long-lived mechanical channel and resolved polaromechanical normal-mode splitting.

## Open and closed

Closed:

- the reported three-mode chain cannot host an exact protected doublet while both physical couplings are nonzero;
- none of the three reported polaromechanical coupling cases passes the AZ-027 relative-splitting target under the near-doublet reading;
- “triple strong coupling” cannot be used as shorthand for the required tripod geometry.

Open:

- choose and model one fourth mode;
- demonstrate simultaneous rotating-frame degeneracy and independent complex coupling control;
- propagate measured damping and CPA sensitivity through a loop/tomography simulation;
- decide whether active gain balancing preserves a trustworthy geometric record or makes nonunitary interference the dominant explanation;
- add the independent selector only after the neutral four-mode record is closed.

## Implication

This branch produces a useful negative answer and a smaller positive target. The measured three-mode device is excellent for hybridization and memory studies, but the holonomy programme should not try to force a dark doublet into it. The four-mode tripod is the correct shape. If one auxiliary mode can be controlled without destroying the narrow CPA linewidth, YIG becomes a serious active competitor to integrated photonics. If not, the YIG branch remains a materials-and-memory platform rather than the carrier of this particular Jordan–Lie passage.

No part of this architectural decision is evidence for a fundamental (Spin(2,3)) symmetry or new physics.

## Reproduction

~~~powershell
node scripts/run-admissibility-yig-mode-fork.mjs --write
node verification/admissibility/verify_yig_mode_fork.mjs
~~~
