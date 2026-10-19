# Second Quantization of the Null Walk: The Floquet-π Sector Is Independent

**Date:** 17 October 2026  
**Branches:** B07, B11 and B13  
**Claim status:** exact for the translation-invariant (1+1)-dimensional number-conserving walk; no (3+1)-dimensional anomaly theorem

## 1. The question

The minimal Dirac walk has a cone at quasienergy zero and a second cone at quasienergy π. After correcting the distinction between adjoints and mirrors, the next question is:

> Is the π cone merely the antiparticle/adjoint description of the zero cone, or does it supply independent fermionic modes?

For the number-conserving walk on the full lattice, the answer is exact: it supplies independent modes, although an exact staggering symmetry pairs their spectra.

## 2. Exact π pairing

For

\[
U(k)=e^{-im\sigma_x/2}e^{-ik\sigma_z}e^{-im\sigma_x/2},
\]

one has

\[
\boxed{U(k+π)=-U(k).}
\]

The eigenvectors at (k) and (k+π) are identical in their two-component coin space, while every eigenphase is shifted by π.

In position space define the staggering operator

\[
(J\psi)_n=(-1)^n\psi_n.
\]

Because the conditional shift changes lattice parity and the local coin does not,

\[
\boxed{JUJ=-U.}
\]

This is an exact sublattice or π-pairing symmetry.

## 3. Spectral pairing is not degree-of-freedom identification

On an even periodic lattice, the Fourier waves at (k) and (k+π) obey

\[
\langle k|k+π\rangle=0.
\]

Second quantization assigns independent canonical anticommutation generators

\[
\{c_{k,a},c_{k',b}^\dagger\}
=\delta_{kk'}\delta_{ab}.
\]

Therefore (c_{k,a}) and (c_{k+π,a}) are distinct modes. The staggering operator maps one to the other; it does not impose an equality between them.

For a number-conserving one-particle unitary (U), its Fock lift is (Gamma(U)). Replacing (U) by (-U) gives

\[
\Gamma(-U)|_{\mathcal F_p}
=(-1)^p\Gamma(U)|_{\mathcal F_p}
\]

on the (p)-particle sector. Thus the paired dynamics differ by fermion parity in Fock space. Within a fixed-parity superselection sector this may be an unobservable overall phase, but it still does not quotient the orthogonal momentum modes.

## 4. Why a simple staggering constraint fails

One might try to keep only (J=+1) states. But

\[
JU=-UJ,
\]

so one time step sends the (J=+1) subspace to (J=-1). The proposed constraint is not dynamically preserved.

Passing to (U^2) preserves each sublattice, but that doubles the temporal unit cell and folds quasienergy π back to zero. It hides the distinction in a reduced Brillouin zone without removing the modes.

Likewise, keeping only even spatial sites doubles the lattice spacing and breaks one-site translation. It is a coarse-graining choice, not a canonical elimination of the π sector.

## 5. Can charge conjugation identify the cones?

A Nambu or Majorana relation would have the schematic form

\[
c_{k+π}=\mathcal C c_{-k}^\dagger.
\]

This changes particle number and reverses gauge charge. It can be a legitimate reality condition only when:

- the representation is real or paired with its conjugate;
- the antiunitary map is compatible with the walk;
- the field is neutral if a genuine Majorana identification is intended;
- canonical anticommutation relations are preserved without double counting.

Generic quarks and charged leptons do not admit such a self-conjugacy condition. Their π modes cannot simply be renamed antiparticles of their zero modes while preserving Standard-Model gauge charge.

## 6. Meaning of the extra cone

For the massless walk,

- near (k=0), the two coin components form the intended infrared Dirac cone;
- near (k=π), they form another Dirac cone shifted by π in quasienergy;
- in this (1+1)-dimensional model the second cone is a duplicate species, not automatically a conjugate-chirality mirror;
- the chirality relation of higher-dimensional Weyl cones must be computed separately.

Exact discrete-time translation conserves quasienergy modulo (2π). Single-particle zero-to-π mixing is forbidden by that symmetry in a static stroboscopic description, but two π excitations carry total quasienergy zero modulo (2π). Interactions therefore require a separate stability and decoupling audit.

## 7. Consequence for the Furey walk

Assigning the selected fifteen-dimensional Furey coin to the zero cone does not specify the π cone. There are three live possibilities:

1. the π cone carries a duplicate of the selected TRO;
2. it carries a conjugate or dagger-reverse TRO under an antiunitary symmetry;
3. a modified walk gaps or topologically separates it without spoiling gauge covariance.

The minimal walk realizes the first possibility unless additional structure is imposed. Therefore its Fock spectrum is not yet the chiral Standard Model.

## 8. Stop-everything and falsification gates

**Advance:** construct a gauge-covariant walk in which the π sector is gapped at the cutoff or paired by a legitimate antiunitary constraint while the zero sector retains the selected anomaly-free Furey TRO.

**Floquet anomaly mechanism:** show that zero and π sectors jointly realize the required chiral anomaly through quantized quasienergy flow rather than cancel it vectorlike.

**No-go:** locality, gauge covariance and one-step unitarity force an independent light π copy of every charged Standard-Model mode.

**Demotion:** if the only removal is an arbitrary even-sublattice truncation or two-step folding, the null walk remains a regulator toy rather than a microscopic completion.

## 9. Certificate

The [Floquet-π Fock certificate](../../../verification/verify/verify_floquet_pi_sector_fock_independence.mjs) verifies (U(k+π)=-U(k)), Fourier orthogonality, the Fock-sector fermion-parity phase, failure of the one-step staggering constraint and the charged-Majorana obstruction.

## Companion documents

- [Minimal null-streaming Dirac quantum walk](147_null_streaming_dirac_quantum_walk.md)
- [Dagger closure: antiparticles versus mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
- [The lattice-fermion doubling gate](146_lattice_fermion_doubling_gate.md)
