# Frontier Wave 7.154: The Full Cross-Sector Griess Product as an Executable Oracle

**Date:** 25 October 2026

**Status:** exact parametric \(T\times T\to U\) reconstruction; laboratory tomography remains open

**Evidence:** [cross-sector product oracle](../../../../evidence/data/moonshine-cross-sector-griess-product-oracle-v1.json)

**Certificate:** [executable verifier](../../../../verification/verify/verify_moonshine_cross_sector_griess_product_oracle.mjs)

## Result

Write the weight-two \(2B\)-graded decomposition as

\[
V_2^\natural=U\oplus T,\qquad \dim U=98580,\quad\dim T=98304,
\]

with \(T=H\otimes S\), \(\dim H=24\) and \(\dim S=4096\). Waves 7.152
and 7.153 give the complete action \(o(u):T\to T\) for every
\(u\in U\). Invariance and nondegeneracy of the VOA bilinear form then define
the missing product uniquely:

\[
 \langle u,t_1\circ t_2\rangle_U
 =\langle o(u)t_1,t_2\rangle_T.
\]

For simple tensors \(t_1=h\otimes s\) and \(t_2=k\otimes t\), this gives the
closed formula

\[
\begin{aligned}
(t_1\circ t_2)_{\rm osc}
 &=\langle s,t\rangle
   \left[{1\over2}h(-1)k(-1)\mathbf1+{(h,k)\over8}\omega\right],\\
(t_1\circ t_2)_{\rm min}
 &=\sum_{[\alpha],\,\alpha^2=4}
 {\langle R_\alpha h,k\rangle\over16}
 \langle P_{[\alpha]}s,t\rangle\,u_\alpha,
\end{aligned}
\]

where the sum is over the 98280 antipodal Leech minimal-vector pairs and
\(R_\alpha=I-2\alpha\alpha^\flat\).

This is an executable oracle rather than a dense tensor: given two probes,
it streams precisely the coefficients that tomography would measure.

## Internal checks

The product is symmetric because every compiled zero mode is self-adjoint.
The norm-four Pauli labels have square \(+1\), so no hidden antisymmetric phase
appears. For the Griess unit \(e=\omega/2\),

\[
 \operatorname{Proj}_e(t_1\circ t_2)
 ={\langle t_1,t_2\rangle\over3}e,
\]

exactly reproducing Wave 7.148 rather than fitting it.

Two oscillator-only norms provide compact regression targets. For a unit
channel vector and one unit ground state, the same-probe oscillator component
has norm squared \(13/16\); for orthogonal channels with the same ground state
it has norm squared \(1/4\). For every one of the 24 marked minimal vectors,

\[
 \left\langle u_\alpha,
 (\alpha\otimes s)\circ(\alpha\otimes P_{[\alpha]}s)
 \right\rangle/\langle u_\alpha,u_\alpha\rangle=-{7\over4}.
\]

That \(-7/4\) transition is a direct cross-sector three-point target.

## What is proved and what remains physical

At the VOA level, the non-universal cross-sector Griess product is no longer
missing: it is reconstructed uniquely and parametrically from sourced twisted
zero modes and invariant forms. Materializing the full 98280-entry hardware
dictionary is an engineering optimization, not a mathematical gap.

The laboratory gate remains substantive. One carrier must reproduce held-out
coefficients from this oracle, including the unit projection, oscillator
spectra, marked \(-7/4\) transitions and Norton--Sakuma closures. A simulator
that was programmed with the answer demonstrates emulation; an independently
calibrated carrier that predicts held-out entries supplies physical provenance.

## Sources and corpus links

- Griess, [*Nonassociativity in VOA theory and finite group theory*](https://www.kurims.kyoto-u.ac.jp/EMIS/journals/CMUC/pdf/cmuc1002/griess.pdf).
- Bakalov and Kac, [*Twisted Modules over Lattice Vertex Algebras*](https://arxiv.org/abs/math/0402315).
- [Minimal-vector zero modes](frontier_wave7_152_moonshine_minimal_vector_twisted_weight2_zero_mode.md)
- [Oscillator-bilinear zero modes](frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md)
- [Universal OPE calibration](frontier_wave7_148_2b_graded_cross_sector_ope_calibration.md)
