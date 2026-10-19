# Full-Lock Fermion Bilinears and the Fermiophobia Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** complete one-generation renormalizable gauge-representation classification; flavor selection and source-level coupling coefficients remain open

## 1. Scalar representations in the full lock

Under \(SU(3)_c\times SU(2)_L\times U(1)_Y\), with \(Q=T_3+Y\), the full lock contains

\[
\Delta\sim(\mathbf1,\mathbf3)_1,
\qquad
\Delta^\dagger\sim(\mathbf1,\mathbf3)_{-1},
\qquad
\xi\sim(\mathbf1,\mathbf3)_0.
\]

There is no weak doublet in \(L\). The custodial singlet appearing after symmetry breaking is a linear combination of neutral triplet components; it is not an independent \((\mathbf1,\mathbf1)_0\) gauge scalar before breaking.

## 2. Exhaustion of chiral fermion bilinears

Use one left-handed Standard-Model generation,

\[
Q, u^c, d^c, L, e^c, \nu^c.
\]

A renormalizable Yukawa term requires a color-singlet fermion bilinear whose weak and hypercharge representation is conjugate to one of the scalar triplets.

The complete enumeration yields exactly one match:

\[
\boxed{
L\,L\,\Delta,
\qquad
(\mathbf1,\mathbf2)_{-1/2}otimes
(\mathbf1,\mathbf2)_{-1/2}supset
(\mathbf1,\mathbf3)_{-1}.
}
\]

The conjugate scalar \(\Delta\sim(\mathbf1,\mathbf3)_1\) completes the invariant.

The quark pair \(QQ\) has no color-singlet channel for a colorless scalar. Doublet–singlet bilinears such as

\[
Qu^c,quad Qd^c,quad Le^c,quad L\nu^c
\]

transform as weak doublets and cannot couple to the full lock.

## 3. Consequences

### Ordinary fermion masses are absent

The full lock cannot generate the ordinary up-quark, down-quark, charged-lepton or Dirac-neutrino Yukawa terms. A separate weak doublet or a higher-dimensional/composite mechanism is mandatory.

Therefore the neutral custodial singlet cannot be identified with the observed Higgs solely from its charge and mass. Without mixing with a doublet, it lacks the required charged-fermion Yukawa structure.

### The triplet is not automatically fermiophobic

Gauge symmetry permits

\[
\mathcal L_{LL\Delta}
\sim
y_{ij}L_i^TC\,i\sigma_2\sigma^aL_j\,\Delta^a+\text{h.c.},
\]

with a symmetric flavor matrix \(y_{ij}\). In component language this includes couplings of the doubly charged scalar to two charged leptons, the singly charged scalar to a charged lepton and neutrino, and the neutral scalar to two neutrinos.

Because the physical custodial states mix the complex and real triplet components, this portal reaches components of the fiveplet as well as other custodial sectors. It explicitly selects the complex triplet and hence breaks the right custodial symmetry unless the matter sector is enlarged appropriately.

If the neutral complex-triplet component has a vacuum value, the same coupling generates a Majorana neutrino mass proportional to \(y_{ij}k\), up to normalization conventions.

## 4. Fermiophobia is an extra condition

The fiveplet is fermiophobic only if an additional rule forbids or suppresses \(LL\Delta\), for example:

- a lepton-number assignment and compatible scalar potential;
- an exact source grading;
- a custodial matter completion that excludes the isolated complex-triplet contraction;
- locality or external-index selection preventing matter from accessing the lock;
- a high scale and negligibly small matching coefficient.

None follows from Standard-Model gauge symmetry alone.

## 5. Branch decision

**Positive:** the Furey/source structure either derives a symmetric neutrino-mass matrix from \(LL\Delta\) or forbids it by the same rule that selects chirality.

**Negative:** the coupling is freely chosen independently of the proposed Jordan interface, adding a generic triplet-scalar parameter rather than an explanation.

**Current result:** the full lock cannot supply ordinary Yukawas, and its fiveplet is not necessarily fermiophobic.

**Unsafe shortcut:** call the custodial fiveplet fermiophobic merely because the minimal Georgi–Machacek phenomenological convention often treats it that way.

## 6. Certificate

The [fermion-bilinear certificate](scripts/verify-full-lock-fermion-bilinears.mjs) enumerates every unordered pair of one-generation left-handed Weyl multiplets, decomposes color and weak products, tracks exact hypercharge and verifies that \(LL\Delta\) is the unique full-lock match.

## Companion documents

- [Fiveplet electroweak vertices](97_custodial_fiveplet_full_electroweak_vertices.md)
- [Furey lepton-doublet triplet portal](100_furey_lepton_doublet_triplet_portal.md)
- [Furey endomorphism inventory](73_furey_endomorphism_sector_inventory.md)
- [Standard Model anomaly gate](62_standard_model_anomaly_gate.md)
- [Custodial decomposition of the LL Delta portal](101_ll_delta_custodial_decomposition.md)
- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)

