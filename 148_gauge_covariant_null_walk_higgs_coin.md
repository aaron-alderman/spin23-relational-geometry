# Gauge Covariance of the Null Walk and the Higgs-Coin Necessity

**Date:** 17 October 2026  
**Branches:** B03, B05, B07, B11 and B13  
**Claim status:** exact one-particle Abelian lattice identity; no anomaly or interacting Standard-Model construction

## 1. The next gate

The minimal null-streaming walk has exact causal and Dirac kinematics. A Standard-Model branch must additionally answer:

> Can its conditional shift and face-mixing coin transform covariantly under a local gauge symmetry?

The answer splits sharply between vectorlike and chiral charge assignments.

## 2. Gauge-covariant null shift

Let (L_n=e^{iA_n}) be the oriented link from site (n) to (n+1). Under

\[
\psi_n\mapsto g_n\psi_n,
\qquad g_n=e^{i\alpha_n},
\]

take

\[
L_n\mapsto g_{n+1}L_ng_n^{-1}.
\]

The conditional shift is

\[
(S_A\psi)_{R,n}=L_{n-1}\psi_{R,n-1},
\]

\[
(S_A\psi)_{L,n}=L_n^{-1}\psi_{L,n+1}.
\]

Both outputs transform by (g_n). Since every link factor has unit modulus, the shift is also exactly unitary. Gauge transport therefore fits the null causal graph without altering its dependency cone.

## 3. Vectorlike faces

If both directional faces carry the same charge, the local coin

\[
C(m)=e^{-im\sigma_x}
\]

commutes with the local gauge transformation. The symmetric step

\[
C(m/2)S_AC(m/2)
\]

is exactly gauge covariant and unitary.

This is a valid charged Dirac walk, but it is vectorlike. It does not yet model the unequal weak and hypercharge actions on Standard-Model left- and right-handed fields.

## 4. Unequal chiral charges obstruct a fixed mass coin

Now let

\[
G_n=
\operatorname{diag}
\left(e^{iq_R\alpha_n},e^{iq_L\alpha_n}\right).
\]

Charge-specific link powers make the separate massless shifts covariant. But a fixed off-diagonal coin obeys

\[
G_nC(m)G_n^{-1}=C(m)
\]

only if (q_R=q_L), (m=0), or the transformation lies in a special discrete subset.

For generic local gauge transformations and (q_R\ne q_L), a bare mass coin is forbidden. This is the lattice-walk version of the familiar statement that a direct Dirac mass is not invariant when the two chiralities transform differently.

## 5. Higgs-dressed coin

Introduce a local off-diagonal phase (\(\theta_n\)):

\[
C(m,\theta_n)=
\begin{pmatrix}
\cos m&-i\sin m\,e^{i\theta_n}\\
-i\sin m\,e^{-i\theta_n}&\cos m
\end{pmatrix}.
\]

If

\[
\theta_n\mapsto
\theta_n+(q_R-q_L)\alpha_n,
\]

then

\[
C(m,\theta_n')
=G_nC(m,\theta_n)G_n^{-1}.
\]

The face-mixing relation must carry precisely the charge difference between the two faces. In a field theory this role is played by a Higgs/Yukawa insertion; the phase-only walk is the fixed-modulus limit of that structure.

This connects directly to the earlier dressed carrier

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e_R.
\]

The normalization scale and radial Higgs dynamics remain absent from the phase-only walk, but the representation-theoretic necessity of the dressing is now visible at the update-operator level.

## 6. What has and has not been gained

Established in the prototype:

- exact local (U(1)) covariance of link transport;
- exact unitarity;
- failure of a fixed coin for unequal chiral charges;
- exact restoration by an off-diagonal field carrying (q_R-q_L).

Not established:

- non-Abelian (SU(2)\times SU(3)) transport;
- second quantization and the fermion measure;
- perturbative or global anomaly cancellation;
- removal or controlled use of the quasienergy-(\pi) sector;
- a (3+1)-dimensional isotropic walk;
- emergence of the (H_2(\mathbb R)) Jordan response.

## 7. Consequence for the Furey interface

The internal algebra cannot be attached only as a label on the two walk components. It must determine:

1. the representation assigned to every directional face;
2. the representation of every link transporter;
3. which off-diagonal coins are allowed;
4. which Higgs-like block map supplies each charge difference;
5. how the zero- and (pi)-quasienergy sectors transform.

This gives the Furey block-map inventory a concrete dynamical job. The previously found nonuniqueness of Higgs-like maps now becomes a nonuniqueness of admissible mixing coins, rather than a purely static representation ambiguity.

## 8. Stop-everything and falsification gates

**Advance:** one of the surviving Furey matter TROs uniquely fixes a gauge-covariant set of link and coin representations and excludes mirror coins.

**Selector result:** the same real/Jordan selector that defines the external carrier fixes the allowed Higgs coin without an arbitrary portal tensor.

**Mirror failure:** gauge covariance forces a partner coin that restores the unwanted orientation or (pi)-sector mirror.

**Anomaly failure:** the second-quantized walk cannot reproduce the one-generation anomaly cancellations already certified at the representation level.

**Demotion:** if every Standard-Model Yukawa remains an unconstrained site-dependent coin, the walk is a regulator language, not an explanatory synthesis.

## 9. Certificate

The [gauge-covariant null-walk certificate](scripts/verify_gauge_covariant_null_dirac_walk.mjs) checks norm preservation, exact vectorlike local covariance, covariance of unequal-charge massless shifts, failure of a fixed unequal-charge coin and restoration by the charged off-diagonal dressing.

## Companion documents

- [Minimal null-streaming Dirac quantum walk](147_null_streaming_dirac_quantum_walk.md)
- [Dressed charged-lepton (H_2(\mathbb R)) response](118_dressed_charged_lepton_h2_response.md)
- [Furey Higgs-doublet nonuniqueness](105_furey_higgs_doublet_nonuniqueness.md)
- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
