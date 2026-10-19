# Furey's Natural Endomorphism Algebra Has No Charged Weak-Triplet Lock

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact absence result inside the natural \(\operatorname{End}_{\mathbb C}(\mathbb V)\) inventory; larger external-index and tensor-composite spaces remain open

## 1. Required representation

If the external locking rotation is identified with hypercharge, the real field

\[
K:\mathbb R^2_{\rm ext}\to\mathbb R^3_{\rm weak}
\]

is equivalent to a complex weak triplet with

\[
|Y_K|=1.
\]

The immediate Furey question is therefore not merely whether a weak triplet occurs, but whether a **charged** weak triplet occurs in the natural endomorphism carrier.

## 2. Exhaustion of single block maps

The five carrier blocks have weak dimensions and hypercharges

\[
\begin{array}{c|ccccc}
&O_1&O_2&H&C&R\\ \hline
SU(2)&\mathbf1&\mathbf1&\mathbf2&\mathbf1&\mathbf1\\
Y&0&1/3&1/2&1&0.
\end{array}
\]

A weak triplet in an ordered block map can arise only from

\[
\operatorname{Hom}(H,H)
\cong\mathbf2\otimes\mathbf2^*
=\mathbf1\oplus\mathbf3.
\]

Its hypercharge difference is

\[
Y_H-Y_H=0.
\]

All other ordered block maps have weak type \(\mathbf1\) or \(\mathbf2\). Hence

\[
\boxed{
\operatorname{End}_{\mathbb C}(\mathbb V)
\text{ contains one neutral weak triplet and no charged weak triplet.}
}
\]

In particular it contains no \((\mathbf1,\mathbf3)_{\pm1}\) sector capable of being the minimal electroweak lock.

## 3. Meaning of the obstruction

Furey's hypercharge operator is already meaningful internally: its commutator differences generate the Standard-Model-like charges catalogued in the endomorphism inventory. What fails is the attempt to make the same natural operator algebra supply the charged locking field.

This rules out a single natural endomorphism block as \(K\). It also rules out ordinary products whose result is again treated as an element of the same endomorphism algebra, because the algebra's representation decomposition is closed and contains no missing charged triplet sector.

It does not rule out:

- attaching a genuinely external two-frame index to a neutral Furey triplet;
- a tensor composite living in a larger space than \(\operatorname{End}(\mathbb V)\);
- enlarging the carrier module;
- treating the locking \(SO(2)\) as distinct from hypercharge.

Each escape adds structure and must explain why the external index or larger carrier is selected.

The smallest such escape has now been constructed explicitly: tensor the neutral Furey weak adjoint with the full external \(H_2(\mathbb R)=\mathbf1\oplus\mathbf2\). The external index supplies both a neutral real triplet and the charged complex triplet. This respects the present absence theorem because the resulting field lives in an external/internal tensor product, not in \(\operatorname{End}_{\mathbb C}(\mathbb V)\) alone.

## 4. Branch decision

The simplest hoped-for bridge—“the missing locking tensor is already one of Furey's natural endomorphisms”—is falsified in the direct electroweak reading.

**Stop-everything positive:** a source-native larger module contains a unique charged triplet or external-index intertwiner and simultaneously supplies the chiral projector.

**Negative:** every candidate requires appending an arbitrary external doublet or choosing a charged tensor product by hand.

**Unsafe shortcut:** use the neutral \(H\to H\) adjoint triplet as \(K\) while silently assigning it nonzero hypercharge.

## 5. Certificate

The [charged-triplet absence certificate](../../../verification/verify/verify-furey-charged-triplet-absence.mjs) exhausts all ordered carrier block maps, decomposes the only \(\mathbf2\otimes\mathbf2^*\) sector and verifies that its charge difference is zero.

## Companion documents

- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Locking complex triplet and custodial obstruction](85_locking_complex_triplet_and_custodial_obstruction.md)
- [Locking gauge mixing and hypercharge gate](82_locking_gauge_mixing_and_hypercharge_gate.md)
- [Furey–Spin(2,3) context](04_furey_spin23_standard_model_context.md)
- [Full-Jordan-carrier custodial completion](87_full_jordan_carrier_custodial_completion.md)

