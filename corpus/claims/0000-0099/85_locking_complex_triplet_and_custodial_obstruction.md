# The Locking Field Is a Complex Weak Triplet: the Custodial Obstruction

**Date:** 17 October 2026  
**Branches:** B01, B05 and B11  
**Claim status:** exact representation conversion and tree-level mass-ratio result; applies to the direct electroweak identification

## 1. The real \(3\times2\) field in complex language

Write the columns of the lock as \(K=(u,v)\), with \(u,v\in\mathbb R^3\), and combine them into

\[
\Phi=u+iv.
\]

The internal \(SO(3)\) acts on \(\Phi\) as its three-dimensional adjoint representation. The external \(SO(2)\) rotates \((u,v)\), which acts on \(\Phi\) by a complex phase. Therefore

\[
\boxed{
K\in(\mathbf3,\mathbf2)_{SO(3)\times SO(2)}
\quad\Longleftrightarrow\quad
\Phi\text{ is one complex weak triplet with nonzero external charge.}
}
\]

This identifies the familiar field-theoretic category of the lock. It is not a Higgs doublet.

## 2. Charge fixed by the isotropic vacuum

For

\[
K_0=k(e_1,e_2),
\qquad
\Phi_0=k(e_1+ie_2),
\]

the internal plane rotation acts as

\[
T_3\Phi_0=-\Phi_0
\]

in Hermitian-generator convention, up to the simultaneous overall sign choice. The external rotation acts with the opposite unit charge. Hence the unbroken generator is

\[
Q=T_3+T_E,
\]

and identifying \(T_E\) with hypercharge requires

\[
\boxed{|Y_K|=1.}
\]

The locking field is consequently the representation type of a complex \(Y=1\) weak triplet, not the Standard Model \(Y=1/2\) doublet.

## 3. Custodial \(\rho\) parameter

The previously derived masses are

\[
m_W^2=g^2k^2,
\qquad
m_Z^2=2k^2(g^2+g_E^2),
\qquad
\cos^2\theta_K=\frac{g^2}{g^2+g_E^2}.
\]

Therefore

\[
\boxed{
\rho_K
=\frac{m_W^2}{m_Z^2\cos^2\theta_K}
=\frac12.
}
\]

The Standard Model Higgs-doublet tree value is \(\rho=1\). This factor-of-two discrepancy is independent of \(g\), \(g_E\) and \(k\).

## 4. Branch verdict

The direct statement

> the minimal locking field is the sole Standard Model electroweak Higgs field

is falsified, even if its two extra scalar amplitudes are heavy. Scalar decoupling does not change the gauge-boson mass ratio fixed by the vacuum representation.

This does not falsify every use of \(K\). Open roles include:

- a selector field for a separate compact surrogate group;
- a small triplet admixture alongside an ordinary Higgs doublet;
- a high-scale portal whose gauge factors are not literally \(SU(2)_L\times U(1)_Y\);
- a composite or constrained geometric object rather than an electroweak scalar.

There is now one exact minimal representation repair: extend the domain from the traceless two-plane to the full three-dimensional Jordan carrier. The added trace-axis column supplies a neutral real triplet, producing a custodial bi-triplet with \(\rho=1\). This is developed in [the full-carrier completion](87_full_jordan_carrier_custodial_completion.md); its enlarged right \(SO(3)\) is not itself a Jordan automorphism.

If \(K\) has a non-negligible electroweak triplet vacuum, an additional custodial-restoring field content would be required. That is a new model, not the minimal lock.

## 5. Stop-everything and falsification tests

**Positive:** a larger source-derived scalar sector restores \(\rho=1\), retains the locked Jordan plane and predicts its vacuum alignment rather than tuning it.

**Negative:** the only available electroweak realization leaves the pure-triplet \(\rho=1/2\) relation.

**Unsafe shortcut:** infer Standard-Model electroweak breaking from the existence of three massive and one massless gauge combinations without checking their mass ratio.

## 6. Certificate

The [custodial certificate](../../../verification/verify/verify-locking-custodial-rho.mjs) verifies the locked generator directly on \(K_0\), identifies the opposite unit internal/external charges and computes \(\rho_K=1/2\) from the exact mass matrix.

## Companion documents

- [Locking gauge mixing and hypercharge gate](82_locking_gauge_mixing_and_hypercharge_gate.md)
- [Locking-field gauge and scalar spectrum](80_locking_field_gauge_and_scalar_spectrum.md)
- [Radiative stability of the scalar hierarchy](83_locking_hierarchy_radiative_stability.md)
- [Furey charged-triplet obstruction](86_furey_charged_triplet_locking_obstruction.md)
- [Full-Jordan-carrier custodial completion](87_full_jordan_carrier_custodial_completion.md)

