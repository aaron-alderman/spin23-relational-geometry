# Casimir spectral coverage and the distance gate

**Packet:** AZ-058  
**Date:** 25 October 2026  
**Status:** same-film bridge narrowed to a measured spectral requirement; no-refit force prediction remains gated  
**Topics:** OT-006, OT-007  
**Evidence:** [machine-readable coverage record](../../../evidence/data/admissibility-casimir-spectral-coverage-gate-v1.json)  
**Verification:** `node verification/admissibility/verify_casimir_spectral_coverage_gate.mjs`

## Result

The proposed material-to-Casimir bridge is not yet executable from the published Co2MnGa record. This is now an exact and useful boundary rather than a general complaint about missing data. A force calculation at separation (d) samples imaginary frequencies with a characteristic ordinary frequency

\[
f_d\simeq \frac{c}{4\pi d}.
\]

The published complex anomalous Hall spectrum covers (0.2\)--(1.5\,\mathrm{THz}). Under this map it primarily addresses separations of about (119\)--(16\,\mu\mathrm m), where the ideal-metal pressure scale is only (6.4\times10^{-12}\)--(2.0\times10^{-8}\,\mathrm{Pa}). A realistic submicron-to-micron experiment instead needs the off-diagonal tensor around (24\)--(239\,\mathrm{THz}), or (0.099\)--(0.987\,\mathrm{eV}). That target band begins 15.9 times above the current Hall ceiling and ends 159 times above it.

This comparison uses the ideal-metal pressure only as a scale. It does not claim that the Hall-dependent differential force reaches that pressure; the differential signal is expected to be much smaller and must be calculated from the full reflection tensor.

## What exists and what does not

Han *et al.* measure complex anomalous Hall conductivity and Faraday rotation from (0.2) to (1.5\,\mathrm{THz}), including a roughly frequency-independent room-temperature Hall conductivity in that band ([Phys. Rev. B 105, 174406](https://doi.org/10.1103/PhysRevB.105.174406)). Tomarchio *et al.* report broadband longitudinal optical response for Co2MnGa thin films across approximately (0.0025)--(6.2\,\mathrm{eV}) ([Advanced Science 11, 2400247](https://doi.org/10.1002/advs.202400247)). Those measurements do not form one same-specimen broadband complex tensor: the longitudinal spectrum does not supply the missing off-diagonal response, and sample, thickness, stack and history differences cannot be silently identified.

This matters because a Weyl-material Lifshitz calculation needs the dynamical optical tensor continued to imaginary frequency. The theory literature explicitly performs this continuation and finds that diagonal bulk response often dominates while Hall and surface terms are secondary ([Communications Materials 1, 14](https://doi.org/10.1038/s43246-020-0015-4)). A large DC or THz Hall angle therefore does not by itself imply a resolvable Casimir differential.

At (300\,\mathrm K), the first Matsubara frequency is (6.25\,\mathrm{THz}). The published Hall band does not reach it; it constrains the static/low-frequency anchor but not the first nonzero room-temperature term. This is another way to see why a DC-plus-THz substitution is insufficient.

## The experiment that now follows

Use one deposition batch and, wherever possible, one specimen architecture. Measure complex (sigma_{xx}(\omega)) and (sigma_{xy}(\omega)) in both magnetic states from DC and THz through at least (0.1\)--(1\,\mathrm{eV}), with overlapping techniques and recorded covariance. Include the higher-energy longitudinal tail needed by the causal integral. Fit one passive causal tensor before inspecting force data, continue its posterior to (i\xi), and propagate every accepted tensor draw through the anisotropic reflection calculation.

Only then preregister a parallel-minus-antiparallel force or torque curve over roughly (0.1\)--(1\,\mu\mathrm m). The bridge advances when that curve exceeds the combined uncertainty from optical tails, patch potential, roughness, ordinary magnetic force, geometry, drift and separation calibration. If it does not, the result is still an engineering closure: it tells us that this material and geometry cannot expose the off-diagonal response at the available precision.

## Open and closed implications

**Closed:** currently published spectra cannot be assembled into the promised no-refit same-film tensor; the missing off-diagonal measurement band is approximately (0.1\)--(1\,\mathrm{eV}) for the proposed separation range.

**Open:** a properly measured tensor may still predict a resolvable differential force or torque. Its sign and scale cannot be inferred from the THz Hall magnitude alone.

**Implication:** OT-006 remains active with a sharply specified measurement. OT-007 is gated until OT-006 produces a causal posterior and that posterior passes a force-resolvability calculation. The nearest useful work is spectroscopy, not force metrology.
