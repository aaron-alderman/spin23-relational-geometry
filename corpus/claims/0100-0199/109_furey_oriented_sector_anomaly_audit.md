# Anomaly Audit of the Sixteen Oriented Furey Sectors

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exhaustive anomaly obstruction for treating either complete sign eigenspace as the fermion module

## 1. The deliberately severe test

Each of the sixteen maps

\[
\Phi(X)=LXR
\]

splits the full 64-complex-dimensional endomorphism space into (M_+\oplus M_-). Because the three lepton-like arrows lie in (M_-), the tempting interpretation is that (M_-) is the chiral matter sector and (M_+) contains Higgs-like data.

That statement must be tested on **every** block in the eigenspace, not only the six arrows used to define the signs.

For this audit, every irreducible block component in one eigenspace is provisionally treated as a left-handed Weyl multiplet. This is intentionally stronger than the final theory may require. It answers a precise question:

> Can either whole sign eigenspace be the physical chiral fermion module?

## 2. Frozen conventions

For a block map (V_s\to V_t), use

\[
Y=Y_s-Y_t,
\]

with integer bookkeeping (Y_6=6Y). Each selected block is decomposed under (SU(3)_c\times SU(2)_L\), including

\[
3\otimes\bar3=1\oplus8,
\qquad
2\otimes2=1\oplus3.
\]

The certificate computes

\[
[SU(3)]^3,quad [SU(3)]^2U(1),quad [SU(2)]^2U(1),
\quad \mathrm{grav}^2U(1),quad U(1)^3,
\]

and the parity of the number of weak doublets, with color multiplicity included. Overall normalizations of the mixed anomaly coefficients are irrelevant to the zero test.

## 3. Exhaustive answer

The result is

\[
\boxed{
0/16\text{ minus eigenspaces anomaly-free},
\qquad
0/16\text{ plus eigenspaces anomaly-free}.
}
\]

No sign choice makes the complete oriented sector into an admissible chiral Standard-Model matter module.

The obstruction is stronger than a nonzero anomaly sum:

\[
\boxed{
0/16\text{ plus sectors and }0/16\text{ minus sectors even contain all five charged one-generation representation types.}
}
\]

The required list is \(Q,u^c,d^c,L,e^c\). Thus no smaller selection confined to one eigenspace can recover a complete Standard-Model generation: required quark and lepton types are necessarily split across the two signs.

This does not preclude a subspace spanning both signs. The subsequent exhaustive tournament finds four such 15-dimensional anomaly-free TROs; see [the one-generation TRO classification](110_furey_anomaly_free_one_generation_tros.md).

For the first solution, the minus sector gives the integer-normalized ledger

\[
\begin{array}{c|r}
\text{anomaly}&\text{numerator}\\ \hline
[SU(3)]^3&1\\
[SU(3)]^2U(1)&-8\\
[SU(2)]^2U(1)&-9\\
\mathrm{grav}^2U(1)&-42\\
U(1)^3&-402
\end{array}
\]

and contains three color-weighted weak doublets, so it also fails the global (SU(2)) parity test. Other solutions give six distinct local-anomaly patterns; none vanishes.

## 4. Why the full algebra cancels

For every one of the sixteen splittings, the local anomaly vector of (M_+) is exactly the negative of that of (M_-). Their union is the mirror-complete endomorphism algebra, so

\[
\mathcal A(M_+)+\mathcal A(M_-)=0.
\]

The total weak-doublet count is also even. This is the previously identified vectorlike cancellation in a sharper form: the two-sided orientation redistributes the anomaly between its two corners but does not make either corner consistent on its own.

Restoring both complete eigenspaces therefore repairs anomalies only by restoring the vectorlike mirror content that the polarization was supposed to explain.

## 5. What is and is not falsified

This calculation falsifies:

\[
\text{“choose one complete (LXR) eigenspace as all physical chiral fermions.”}
\]

It does not falsify the ternary bimodule itself. A viable construction could still use:

1. a finer grading on the linking algebra, allowing the physical fermion set to draw from both \(LXR\) signs;
2. different statistics for different irreducible blocks;
3. a boundary theory with explicit quantized anomaly inflow;
4. paired nonpropagating or massive sectors whose decoupling leaves an anomaly-free low-energy module.

Each option adds a concrete burden. In particular, “some blocks are bosons” is not an explanation until a grading or superconnection fixes that assignment and makes all interactions close.

## 6. Consequence for the Higgs/lepton split

The six defining arrows remain correctly oriented, but those arrows do not determine the rest of the 64-dimensional space. The sign rule necessarily selects additional colored, weak and charged blocks. Those companions are what spoil the anomaly sums.

Thus orientation and chirality are distinct gates:

\[
\boxed{
\text{arrow orientation}
\not\Longrightarrow
\text{anomaly-free chiral matter}.
}
\]

The next selector must refine the two-sided polarization across its linking algebra, rather than act only inside one sign eigenspace, and must be tested simultaneously for:

- gauge stability;
- ternary interaction closure;
- anomaly cancellation;
- statistics;
- CP freedom;
- non-arbitrary multiplicity selection.

## 7. Branch decision

- **Keep:** the exact TRO/Jordan-triple closure of the oriented bimodule.
- **Pin:** physical choice among its irreducible block submodules.
- **Reject:** either full eigenspace as the complete chiral fermion spectrum.
- **Do not rescue by hand:** adding the opposite eigenspace or arbitrary spectators without a source principle.

**Stop-everything positive:** a source-derived internal projector inside one TRO picks exactly an anomaly-free Standard-Model set while the complementary linking corner supplies bosonic or nondynamical data rather than mirror fermions.

**Negative:** every interaction-closed, positive submodule inherits a nonzero anomaly unless the full mirror corner is restored.

## 8. Certificate

The [oriented-sector anomaly certificate](../../../verification/verify/verify-furey-oriented-sector-anomalies.mjs) decomposes every selected block, evaluates all five local anomaly numerators and the global weak parity, and verifies complementary vectorlike cancellation for all sixteen solutions.

## Companion documents

- [Standard-Model anomaly gate](../0000-0099/62_standard_model_anomaly_gate.md)
- [Furey endomorphism-sector inventory](../0000-0099/73_furey_endomorphism_sector_inventory.md)
- [Two-sided Furey polarization](107_furey_two_sided_higgs_lepton_polarization.md)
- [Furey orientation as an exact ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)

