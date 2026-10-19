# Minimal Higgs Doublet Coupled to the Full Jordan Lock

**Date:** 17 October 2026  
**Branches:** B01, B03, B05 and B11  
**Claim status:** complete renormalizable gauge-invariant cross-portal basis; custodial coefficient relations and full vacuum solution remain open

## 1. Why a doublet is mandatory

Introduce

\[
H\sim(\mathbf1,\mathbf2)_{1/2}
\]

in addition to

\[
\xi\sim(\mathbf1,\mathbf3)_0,
\qquad
\Delta\sim(\mathbf1,\mathbf3)_1.
\]

The doublet supplies the ordinary quark and charged-lepton Yukawas that the full lock cannot provide. The question is then how many independent renormalizable interactions connect the doublet to the lock.

## 2. Two cubic portals

Gauge symmetry permits two independent Hermitian structures:

\[
\boxed{
\mu_\xi(H^\dagger\tau^aH)\xi^a,
}
\]

and

\[
\boxed{
\mu_\Delta
(H^T\epsilon\tau^aH)\Delta_a^\dagger
+\text{h.c.}
}
\]

The first couples the hypercharge-zero Higgs adjoint to the real triplet. The second couples the hypercharge-one symmetric Higgs pair to the conjugate complex triplet.

When \(H\) acquires a vacuum value, these terms induce tadpoles for the neutral real and complex triplets. They can therefore generate the full-lock vacuum, but equal induced vacuum values require relations among \(\mu_\xi,\mu_\Delta\) and the triplet masses.

## 3. Four quartic portals

Up to Hermitian conjugation, the complete cross-quartic basis is

\[
\boxed{(H^\dagger H)(\xi\cdot\xi),}
\]

\[
\boxed{(H^\dagger H)(\Delta^\dagger\cdot\Delta),}
\]

\[
\boxed{
(H^\dagger\boldsymbol\tau H)
\cdot i(\Delta^\dagger\times\Delta),
}
\]

and

\[
\boxed{
(H^T\epsilon\boldsymbol\tau H)
\cdot(\xi\times\Delta^\dagger)
+\text{h.c.}
}
\]

No additional independent cross term occurs through degree four:

- \(H^\dagger H\) supplies weak \(\mathbf1\oplus\mathbf3\);
- the commuting identical real-triplet pair has no antisymmetric \(\mathbf3\);
- the mixed \(\xi\Delta^\dagger\) pair contributes its \(\mathbf3\) channel to the hypercharge-one Higgs pair;
- weak-fiveplet lock bilinears cannot contract with a two-doublet bilinear.

## 4. Custodial reduction

Gauge symmetry therefore allows

\[
\boxed{2\text{ cubic}+4\text{ quartic independent Hermitian portal structures}.}
\]

Full custodial \(SU(2)_L\times SU(2)_R\) relates these coefficients. In the conventional bidoublet–bitriplet formulation, the cross sector reduces to one custodial cubic structure and two custodial quartic structures, up to normalization conventions.

Those relations are not implied by the Jordan-native \(SO(2)_R\). They must be derived, imposed as a boundary condition or treated as approximate.

## 5. Physical consequences

Adding the doublet changes several earlier conclusions:

- ordinary fermion masses become possible;
- the observed neutral Higgs can be a mixture of doublet and custodial singlets;
- triplet vacuum values can be induced rather than inserted;
- the eaten Goldstones mix doublet and triplet modes;
- additional physical custodial triplet states can appear;
- the cubic portals can help or spoil \(w=k\) alignment;
- the scalar parameter count increases substantially.

The completion repairs a necessary phenomenological omission but weakens uniqueness unless the Jordan/Furey structure constrains the six portals.

## 6. Branch decision

**Positive:** the source construction fixes the custodial relations among the two cubic and four quartic gauge invariants and predicts the doublet–triplet mixing.

**Negative:** all six portal coefficients are independent fits, so the Jordan carrier contributes no restriction beyond a known extended scalar sector.

**Current result:** the minimal phenomenologically viable scalar completion and its complete gauge-invariant cross-coupling basis are explicit.

**Unsafe shortcut:** add a Standard Model Higgs doublet while continuing to quote the pure-bitriplet spectrum, vacuum equations or fermiophobia properties unchanged.

## 7. Certificate

The [doublet–lock portal certificate](scripts/verify-doublet-full-lock-portals.mjs) enumerates Higgs and lock bilinear representations with exact hypercharge, pairs every singlet contraction, groups Hermitian conjugates and verifies two cubic plus four quartic independent structures.

## Companion documents

- [Full-lock fermion bilinear gate](99_full_lock_fermion_bilinear_and_fermiophobia_gate.md)
- [Custodial decomposition of LL Delta](101_ll_delta_custodial_decomposition.md)
- [General Jordan-native full-lock potential](89_jordan_native_full_lock_potential.md)
- [Custodial alignment and rho sensitivity](92_custodial_alignment_rho_sensitivity.md)
- [Neutral doublet–lock vacuum alignment](103_doublet_full_lock_neutral_vacuum_alignment.md)
- [Doublet-diluted rho and Goldstone mixing](104_doublet_lock_rho_and_goldstone_mixing.md)
- [Furey Higgs-doublet nonuniqueness](105_furey_higgs_doublet_nonuniqueness.md)

