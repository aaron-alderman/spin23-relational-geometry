# Custodial Fiveplet: Explicit Charge Eigenstates and Photon Vertices

**Date:** 17 October 2026  
**Branches:** B05, B06 and B11  
**Claim status:** exact charge-eigenstate basis and electromagnetic minimal couplings; full \(W\), \(Z\), Yukawa and decay phenomenology remain open

## 1. Symmetric-traceless realization

The physical custodial fiveplet is

\[
\operatorname{Sym}_3^0(\mathbb R)otimes\mathbb C.
\]

Let

\[
e_\pm=\frac{e_1\pm ie_2}{\sqrt2},
\qquad e_0=e_3.
\]

A normalized charge basis is

\[
\begin{aligned}
H_{+2}&=e_+e_+^T,\\
H_{+1}&=\frac{e_+e_0^T+e_0e_+^T}{\sqrt2},\\
H_0&=\frac{e_1e_1^T+e_2e_2^T-2e_3e_3^T}{\sqrt6},\\
H_{-1}&=\frac{e_-e_0^T+e_0e_-^T}{\sqrt2},\\
H_{-2}&=e_-e_-^T.
\end{aligned}
\]

They obey

\[
H_q^T=H_q,
\qquad
\operatorname{tr}H_q=0,
\qquad
\operatorname{tr}(H_q^\dagger H_{q'})=\delta_{qq'}.
\]

## 2. Electric-charge action

In anti-Hermitian generator convention,

\[
[J_3,H_q]=-iqH_q.
\]

Thus the Hermitian unbroken generator \(+i\operatorname{ad}J_3\) has eigenvalues

\[
\boxed{q=+2,+1,0,-1,-2.}
\]

The doubly charged modes are complex conjugates of each other, as are the singly charged modes; the neutral mode can be chosen real.

## 3. Universal photon vertices

For a canonically normalized charged scalar component, electromagnetic covariance gives

\[
D_\mu H_q=(\partial_\mu+ieqA_\mu+\cdots)H_q.
\]

Therefore the universal three-point vertex is

\[
\boxed{ieq(p-p')_\mu,}
\]

and the photon seagull coupling is proportional to

\[
\boxed{e^2q^2A_\mu A^\mu|H_q|^2.}
\]

The \(|q|=2\) state consequently has four times the photon seagull strength of a unit-charged state at fixed normalization.

The broken weak generators connect adjacent charges with the usual spin-two ladder pattern. Full \(W\) and \(Z\) vertices require retaining separately the left and right generator actions and will be encoded next.

## 4. Observable branch

This basis supplies immediate, representation-protected statements:

- pair production of charged states is unavoidable if kinematically accessible;
- \(H_{+2}\) and \(H_{-2}\) have fixed electromagnetic charge magnitude two;
- the five states are degenerate only at the custodial tree point;
- hypercharge, electromagnetism and other custodial-breaking interactions can split the multiplet radiatively;
- removing the doubly charged components destroys the complete custodial representation.

No decay mode or mass scale is yet predicted. Those require portal, Yukawa and scalar-potential couplings.

## 5. Stop-everything and falsification tests

**Positive:** the algebra fixes a fiveplet mass or branching relation tied to the Jordan carrier rather than merely reproducing a known custodial multiplet.

**Negative:** the fiveplet must be decoupled arbitrarily, or its viable couplings have no relation to the proposed external/internal interface.

**Current result:** the exact physical charge basis and its universal electromagnetic vertices are established.

**Unsafe shortcut:** discuss a neutral “Jordan Higgs” while ignoring its charge-one and charge-two custodial partners.

## 6. Certificate

The [fiveplet charge certificate](scripts/verify-custodial-fiveplet-charge-eigenstates.mjs) constructs the five complex matrices, verifies symmetry, tracelessness, orthonormality and their commutator charge eigenvalues.

## Companion documents

- [Custodial Hessian and charge spectrum](94_full_lock_custodial_hessian_and_charge_spectrum.md)
- [Gauge-counterterm splitting](95_full_lock_gauge_counterterm_splitting.md)
- [Full-Jordan-carrier custodial completion](87_full_jordan_carrier_custodial_completion.md)
- [Standard Model as stress–energy](01_standard_model_as_stress_energy_full_analysis.md)
- [Full electroweak fiveplet vertices](97_custodial_fiveplet_full_electroweak_vertices.md)
- [Fiveplet mass-splitting predictivity gate](98_fiveplet_mass_splitting_predictivity_gate.md)

