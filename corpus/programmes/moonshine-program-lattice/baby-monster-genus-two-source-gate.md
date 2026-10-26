# The Baby-Monster gate is sewing data, not another character

**Date:** 25 October 2026

**Status:** multiplier reconstructed by Arf conjugation; the required order-23-twined genus-two amplitude family is not present in the reviewed corpus

**Evidence:** [machine-readable source-gate ledger](../../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json)

**Certificate:** [source-gate verifier](../../../verification/verify/verify_moonshine_baby_monster_genus_two_source_gate.mjs)

## Result

Three established results meet at this gate:

1. cutting an Ising vector out of the Moonshine module produces the
   Baby-Monster super VOA \(VB^\natural\) of central charge \(47/2\);
2. its even algebra has exactly three irreducible modules
   \(VB^0,VB^1,VB_T\), with Ising fusion rules;
3. Monster \(2A\) fermionization is the pointwise product, on a shared spin
   structure, of one free Majorana factor and the fermionic Baby-Monster
   factor.

These facts identify the carrier but do not evaluate its genus-two amplitude
vector. The fusion ring records which channels may meet. It does not supply
the analytic conformal blocks, sewing coefficients, or order-23 insertions.
The reviewed primary literature gives an explicit genus-two sewing formula
for the free fermion, but not the order-23-twined ten-even-spin vector for
\(VB^\natural\).

## 1. What is fixed

Yamauchi proves that \(VB^\natural\) is a simple SVOA, that \(VB_T\) is its
irreducible twisted module, and that

\[
VB^1\boxtimes VB^1=VB^0,\qquad
VB^1\boxtimes VB_T=VB_T,\qquad
VB_T\boxtimes VB_T=VB^0\oplus VB^1.
\]

Lin and Shao establish

\[
\operatorname{Ferm}_{2A}(V^\natural)
\cong F_{1/2}\otimes VB^\natural,
\qquad
\frac12+\frac{47}{2}=24.
\]

The central-charge identity constrains the product anomaly. It does not, by
itself, determine relative phases among ten genus-two spin sectors.

## 2. Why characters and fusion stop short

For a VOSA \(V\), epsilon-sewing has the schematic form

\[
Z_V^{(2)}(\tau_1,\tau_2,\epsilon)
=
\sum_{n\geq0}\epsilon^n
\sum_{u\in V_{[n]}}
Z_V^{(1)}(u,\tau_1)
Z_V^{(1)}(\bar u,\tau_2),
\]

with sector and automorphism labels added in the twisted case. A genus-one
character supplies only the vacuum insertion \(u=\mathbf1\). Fusion rules
specify allowed intermediate modules, but not the complete torus one-point
functions, dual-basis contractions, intertwining normalizations, or their
order-23 insertions. Thus central charge, three vacuum characters, the Ising
fusion ring, and the untwined aggregate Moonshine genus-two function are all
insufficient individually.

## 3. Minimal direct construction packet

Let \(b\in\mathbb B\) be the order-23 element obtained from a \(46C/46D\)
Monster root after quotienting the central \(2A\) involution. A direct sewing
construction requires:

1. the \(b\)-action on \(VB^0,VB^1,VB_T\) and compatible intertwining spaces;
2. \(b\)-twined torus one-point functions for the homogeneous sewing states;
3. invariant bilinear forms and dual-basis contractions;
4. a convergent vector $Z^{(2)}_{VB,b}\lbrack\delta\rbrack(\Omega)$ on the ten even
   characteristics;
5. its monomial action under \(K=S^2R^{-11}\);
6. separating degeneration to the order-23 genus-one traces.

## 4. Exact alternative and resolved multiplier

The [Arf/Fourier reconstruction](arf-fourier-baby-monster-reconstruction.md)
replaces direct Baby-Monster sewing by sixteen order-23-twined Monster
amplitudes with all flat \(2A\) backgrounds. Its signed \(16\times16\) kernel
is orthogonal after \(1/4\) normalization.

The follow-on
[Arf-conjugation audit](arf-conjugated-baby-monster-k-multiplier.md)
then fixes the Baby-Monster \(K\) multiplier before those functions are
evaluated: it is the edgewise inverse of the free multiplier. The remaining
source gate is therefore purely at amplitude and degeneration level.

## Boundary

The absence claim is limited to the primary sources reviewed here and the
local corpus as of the stated date. A general sewing formalism is not an
evaluated Baby-Monster answer. Fusion and central charge are not promoted to
an amplitude calculation.

## Sources and corpus links

- Yamauchi, [*2A-orbifold construction and the baby-monster vertex operator superalgebra*](https://arxiv.org/abs/math/0312164)
- Höhn, [*Self-dual Vertex Operator Super Algebras and the Baby Monster*](https://arxiv.org/abs/0706.0236)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Arf/Fourier Baby-Monster reconstruction](arf-fourier-baby-monster-reconstruction.md)
- [Arf-conjugated Baby-Monster \(K\) multiplier](arf-conjugated-baby-monster-k-multiplier.md)
- [Joined order-46 bridge](joined-bridge-map.md)
