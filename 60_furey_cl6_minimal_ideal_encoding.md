# Machine-Readable Furey (Cl(6)) Minimal-Ideal Baseline

**Date:** 16 October 2026  
**Branch:** B03 Furey interface  
**Claim status:** minimal color/charge ideal encoded and verified; electroweak and generation completion not included

## 1. Scope

Three fermionic creation operators generate the exterior basis

\[
\Lambda^\bullet\mathbb C^3
=\Lambda^0\oplus\Lambda^1\oplus\Lambda^2\oplus\Lambda^3
\]

with dimensions

\[
1+3+3+1=8.
\]

This is the eight-complex-dimensional minimal ideal used in the basic complex-octonionic \(Cl(6)\) construction.

The encoded table is [the minimal-ideal JSON file](data/furey_cl6_minimal_ideal_basis.json).

## 2. Charge and color sectors

With number operator charge \(Q=N/3\), exterior degree gives

\[
\begin{array}{c|c|c|c}
k&\dim\Lambda^k&SU(3)&Q\\
\hline
0&1&\mathbf1&0\\
1&3&\mathbf3&1/3\\
2&3&\overline{\mathbf3}&2/3\\
3&1&\mathbf1&1
\end{array}
\]

Conjugation supplies the opposite charge/representation sector in the broader construction. Representation conventions can exchange \(\mathbf3\) and \(\overline{\mathbf3}\); the encoded convention is declared rather than hidden.

## 3. First commutant result

The four \(SU(3)\times U(1)\) sectors are inequivalent. Therefore their gauge commutant on this one ideal is

\[
\boxed{
\operatorname{End}_{SU(3)\times U(1)}(\mathcal I)
\cong\mathbb C^4.
}
\]

This is already enough to show that color and charge symmetry permit independent scalar actions on the four occupation sectors. The minimal ideal alone does not constrain those four coefficients into one universal selector coupling.

## 4. What is still missing

This encoding does not yet include:

- the conjugate ideal;
- weak \(SU(2)_L\) and hypercharge before Higgs breaking;
- chirality projectors;
- three-generation chain-algebra actions;
- triality scalar/Higgs representations;
- Yukawa intertwiners.

It is therefore a verified base layer, not a machine-readable implementation of Furey’s latest full programme.

## 5. Next extension order

1. add the conjugate ideal and involutions;
2. encode the quaternionic weak ladder and chirality projector;
3. assemble the pre-Higgs \(G_{SM}\) module;
4. add chain-algebra generation actions;
5. recompute the commutant after each layer;
6. compare the final result with the gauge-only dimension-45 baseline.

This staged procedure will reveal exactly which Furey structure removes which otherwise arbitrary coupling.

## 6. Stop-everything and falsification tests

**Positive:** a specific added multiplication or compatibility condition sharply reduces the commutant and leaves precisely the intertwiners needed for observed chirality and mixing.

**Negative:** every added layer either leaves all species coefficients arbitrary or removes experimentally required Yukawa freedom.

## 7. Certificate

[`scripts/verify-furey-cl6-minimal-ideal.mjs`](scripts/verify-furey-cl6-minimal-ideal.mjs) verifies the eight states, \((1,3,3,1)\) multiplicities, occupation-charge rule and four-sector commutant count.

## Companion documents

- [Furey technical guide](03_furey_technical_algebraic_guide.md)
- [Furey interface](54_furey_external_internal_interface_branch.md)
- [Standard-Model commutant baseline](56_standard_model_commutant_gate.md)
