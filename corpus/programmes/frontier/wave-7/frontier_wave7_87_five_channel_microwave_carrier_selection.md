# Frontier Wave 7.87: Five-Channel Microwave Carrier Selection

**Date:** 25 October 2026  
**Status:** first physical emulator selected; passive dilation and falsification gates certified  
**Parent:** [post-Q terminal synthesis](frontier_wave7_81_post_q_five_option_terminal_synthesis.md)  
**Ledger:** [carrier decision record](five_channel_microwave_carrier_v1.json)  
**Certificate:** [carrier verifier](../../../../verification/verify/verify_five_channel_microwave_carrier_selection.mjs)

## Decision

The nearest executable carrier is a room-temperature, five-signal-channel
programmable microwave interferometer with a separately calibrated phase
reference. Split its signal ports as

\[
\mathbb C^5=\mathbb C^2_{\rm source}\oplus\mathbb C^3_{\rm target}.
\]

This is the first platform to build because one apparatus can compile the
selector fingerprints, measure the complete complex forward and reverse
blocks, and realize the reciprocal completion without a new foundry cycle or
a cryogenic hybrid mode. It is an emulator of the proposed response grammar,
not yet evidence that a natural system carries that grammar.

## Exact selector programmes

The order-three setting is

\[
R=R_2\oplus R_3,
\quad
R_2=\begin{pmatrix}
-\tfrac12&-\tfrac{\sqrt3}{2}\\
\tfrac{\sqrt3}{2}&-\tfrac12
\end{pmatrix},
\quad
R_3=\begin{pmatrix}0&0&1\\1&0&0\\0&1&0\end{pmatrix}.
\]

The order-two gate that must be run first is

\[
H=H_2\oplus H_3,
\quad H_2=-I_2,
\quad
H_3=-\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix}.
\]

It has

\[
H^2=I_5,qquad \operatorname{tr}H=-3,qquad \det H=1,
\]

while (R^3=I_5), \(\operatorname{tr}R=-1\) and \(\det R=1\).
The separate sector records must also reproduce the four fingerprints in
Wave 7.80. A five-port aggregate trace alone is insufficient.

Intensity-only detection cannot certify this gate: (H) and (-H) have the
same entrywise powers. The reference channel is therefore part of the
experiment, not optional instrumentation.

## Passive reciprocal realization of the checkpoint

The frozen rectangular channel is

\[
E=\begin{pmatrix}
3/5&5/13\\
4/5&0\\
0&12/13
\end{pmatrix},
\qquad
E^TE=\begin{pmatrix}1&3/13\\3/13&1\end{pmatrix}.
\]

Its squared singular values are (16/13) and (10/13). Therefore (E)
itself is not a passive scattering sub-block. Choose the preregistered gain

\[
g=\frac45,qquad M=gE,
\]

for which

\[
\sigma^2(M)=\left\{\frac{256}{325},\frac{32}{65}\right\}<1.
\]

Then the Julia-type completion

\[
S_+=\begin{pmatrix}
\sqrt{I_2-M^TM}&M^T\\
M&-\sqrt{I_3-MM^T}
\end{pmatrix}
\]

is a real symmetric orthogonal (5\times5) scattering matrix. Hence it is
lossless in the ideal model and reciprocal in the same calibrated port basis,
and its cross blocks are exactly (M) and (M^T). The verifier constructs
this matrix numerically and checks both orthogonality and symmetry below
(10^{-9}).

Changing only the reverse cross block to (-M^T) breaks same-basis
reciprocity. It can still be emulated by active phase programming, but it must
not be reported as an ordinary reciprocal passive network. This gives the
experiment a clean null: under a fixed reference and fixed port conventions,
an ordinary reciprocal device should land on the plus branch.

## Why microwave wins the first tranche

| platform | exact (5\)-channel programme | complex reverse record | native reciprocity test | time to first falsification | present blocker |
|---|---|---|---|---|---|
| programmable microwave PCB/RF mesh | scalable architecture; five-channel build required | direct VNA record | yes, in one port convention | shortest | published demonstration is four-port, so the fifth channel is an engineering extension |
| integrated photonics | arbitrary high-dimensional orthogonal/unitary operations demonstrated | possible with coherent reference | yes | foundry and packaging cycle | signed path, loss and full-wave tolerance gates already isolated in AZ-061 |
| acoustic network | noncommuting operations demonstrated | possible | yes | moderate | passive attraction is filtering; the exact selector is an ensemble or feedback channel |
| YIG hybrid | current measured system has only three modes | phase-sensitive | requires field-reversal bookkeeping | longest | needs a fourth independently controlled outer mode before it has a dark doublet |

The selection is about experimental order, not ultimate ontology. Integrated
photonics remains the strongest second implementation after the microwave
protocol freezes the calibration and detector logic. YIG remains the more
interesting later source-native parity probe precisely because magnetic bias
and hybrid variables make its Onsager typing nontrivial.

## Preregistered experiment

### Gate 0 -- metrology

Calibrate all five signal paths and the reference path over one fixed
frequency window. Retain raw complex (S)-parameters, termination state,
cable orientation, phase drift and calibration covariance. Do not normalize
away port power before the reciprocity test.

### Gate 1 -- order two

Compile (H), measure its two- and three-sector blocks independently, and
require the declared trace, determinant and order residuals. Repeat with the
reference removed to demonstrate the expected (H\leftrightarrow-H)
intensity ambiguity. Stop if (H_2) resolves as a reflection rather than the
central parity.

### Gate 2 -- order three

Compile (R), require the sector fingerprints and test (R^3=I). Run (RH)
and (HR) as held-out words so that separately correct pulses cannot pass
while their common basis is wrong.

### Gate 3 -- channel

Compile (S_+). Estimate the (3\times2) forward block and (2\times3)
reverse block from independent port sweeps. Compare

\[
r_+=\frac{\|B-M^T\|_F}{\|M\|_F},
\qquad
r_-=\frac{\|B+M^T\|_F}{\|M\|_F}.
\]

Also require the full measured scattering matrix to pass symmetry,
contractivity and loss-budget tests. A cross-block sign without a full-matrix
reciprocity audit is not admissible.

### Gate 4 -- adversarial controls

Repeat after a physical source/target cable exchange, a programmed target
(\pi)-phase insertion, reference-path reversal, matched attenuation and
blind re-labelling. The intentional phase insertion must move the signed
residual while leaving intensity records unchanged. The physical cable
exchange must reproduce the transpose after de-embedding.

## Outcomes and implications

1. **Selector gate fails.** The common-carrier identification is rejected on
   this platform before any (Spin(2,3)) interpretation.
2. **Selector passes, reciprocity fails.** Diagnose calibration drift,
   unmodelled active elements or nonreciprocity; neither real-form branch is
   assigned until one signed residual and the full scattering audit agree.
3. **Selector and plus branch pass.** The corpus gains a physical emulator of
   the repaired (2+3) representation and its (+E^T) response. This closes
   the instrumentation question, not the source-native physics question.
4. **A robust minus branch survives all convention controls.** That is the
   interesting anomaly: ordinary same-basis Lorentz reciprocity is not its
   explanation. The next experiment must reverse the relevant bias or
   time-reversal parity and account for work, gain and hidden ports.

The new-physics threshold is therefore deliberately above successful matrix
compilation. A programmed device showing the programmed algebra is a
calibration theorem. New physics begins only if an independently specified
natural carrier predicts and reproduces a residual that the complete
reciprocal network model cannot absorb.

## Primary literature cross-check

- Keshavarz et al., [*Programmable circuits for analog matrix computations*](https://www.nature.com/articles/s41467-025-63486-z)
  (2025), experimentally demonstrate a four-port programmable microwave
  circuit, full VNA characterization and universal unitary transformations.
  It is the direct hardware precedent; five channels are an extrapolation,
  not a reported result.
- Chen et al., [*High-dimensional non-Abelian holonomy in integrated
  photonics*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12006547/) (2025),
  demonstrate arbitrary special-orthogonal holonomies up to dimension six
  and rectangular linear computation through singular-value decomposition.
  This supports the second-platform route.
- Sun et al., [*Non-Abelian Topological Phases and Their Quotient Relations in
  Acoustic Systems*](https://doi.org/10.1103/PhysRevLett.132.216602) (2024),
  demonstrate time-reversal-invariant acoustic non-Abelian endpoint classes;
  it supports noncommuting transport but not the affine attraction previously
  excluded in AZ-063.
- Shen et al., [*Cavity-magnon polaritons strongly coupled to
  phonons*](https://www.nature.com/articles/s41467-025-60799-x) (2025),
  demonstrate triple strong coupling and phase-sensitive hybrid control. The
  measured chain still has only one dark direction, as certified in AZ-062.

## Next boundary

Produce a five-channel bill of materials and a frequency-domain error budget
around one realizable power-divider/phase-shifter topology. Only after Gate 1
passes should the full (S_+) compilation be commissioned. In parallel, keep
the source-native question explicit: identify a carrier whose endpoint
variables have independently known Onsager parities rather than parities
assigned by the programmer.

