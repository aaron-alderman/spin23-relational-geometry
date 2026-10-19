# Frontier Parallel QFT 05: one Yukawa channel closes in three dimensions, while four channels force the full source quotient

**Date:** 18 October 2026  
**Status:** exact rank-one orbit, sequential channel-growth theorem, and minimal observable/no-go classification  
**Certificate:** [verify_frontier_parallel_qft_rank_one_channel_growth.mjs](../../../../verification/verify/verify_frontier_parallel_qft_rank_one_channel_growth.mjs)

## Result

The bounded up-Yukawa calculation can be completed exactly at the level that is independent of the unevaluated loop normalization.

With only the up-type Yukawa channel active, the mixing operator is rank one:

\[
\Gamma_u=w_u r_uv_u,
\]

where

\[
v_u=(1,1,0,0,0,0,1),
\qquad
r_u=D^{-1}v_u^T
=\left(\frac16,\frac13,0,0,0,0,1\right)^T.
\]

Since

\[
v_ur_u=\frac32,
\]

the complete orbit satisfies

\[
\boxed{\Gamma_u^2=\frac{3w_u}{2}\Gamma_u.}
\]

Thus there is one nonzero eigenvalue \(3w_u/2\), one broken ray \(r_u\), and a six-dimensional kernel. The smallest invariant subsystem containing incidence and \(B-L\) is not two-dimensional but exactly

\[
\boxed{\mathcal S_u=\operatorname{span}\{q,\lambda,r_u\},\qquad \dim\mathcal S_u=3.}
\]

This rank-one module is fully solved apart from the physical scalar function \(w_u(\mu)\) or \(w_u(s)\).

## 1. Exact orbit decomposition

Both incidence candidates have the same up-channel violation:

\[
v_u\lambda_d=v_u\lambda_m=10.
\]

Therefore

\[
\Gamma_u\lambda=10w_ur_u,
\qquad
\Gamma_u^n\lambda
=10w_u\left(\frac{3w_u}{2}\right)^{n-1}r_u
\quad(n\ge1).
\]

The protected residue carried by incidence is

\[
p_u=\lambda-\frac{20}{3}r_u,
\qquad v_up_u=0.
\]

Hence

\[
\mathcal S_u=\operatorname{span}\{q,p_u,r_u\}.
\]

The three directions have distinct roles: \(q\) is the anomaly-safe protected current, \(p_u\) is invisible to the up Yukawa but is not selected by it, and \(r_u\) is the unique broken response ray.

## 2. Threshold behavior is scalar, not rotational

As long as the up channel is the only active spurion, every threshold or running effect that preserves its typing changes only \(w_u\). It cannot rotate \(r_u\).

Representative weights are

\[
w_u^{(3)}(s)=\frac{s^2}{192\pi^3}\,3|y_u(s)|^2
\]

for the massless unbroken three-particle divergence cut, and

\[
w_u^{(2)}(s)\propto
3m_u^2\sqrt{1-\frac{4m_u^2}{s}}\,
\Theta(s-4m_u^2)
\]

for the broken-phase two-particle longitudinal cut.

At threshold the nonzero eigenvalue turns on from zero; the eigenray does not move. Rotation begins only when another independent channel, flavor spurion, gauge-anomaly operator, or EOM representative participates.

## 3. Minimal rank-one observable

For a calibrated source direction \(x\), the up-channel divergence absorption is

\[
\mathcal A_u(x;s)=w_u(s)|v_ux|^2.
\]

Relative to the free source norm, the Rayleigh quotient is

\[
\mathcal R_u(x;s)=
\frac{w_u(s)|v_ux|^2}{x^TDx}.
\]

Its unique nonzero generalized eigenray is \(r_u\), with maximum \(3w_u/2\). It supplies an operationally meaningful “most up-Yukawa-broken” direction.

For the two incidence candidates,

\[
\mathcal A_u(\lambda_d;s)
=\mathcal A_u(\lambda_m;s)=100w_u(s),
\]

while

\[
\mathcal R_u(\lambda_d;s)=\frac{100w_u}{231},
\qquad
\mathcal R_u(\lambda_m;s)=\frac{100w_u}{239}.
\]

The unnormalized physical cut cannot distinguish the incidence fork. The normalized quotient distinguishes it only by importing the full free-current norm, whose difference lives in the charged-lepton component invisible to the up channel. This is a useful calibration check, not an up-channel derivation of the incidence ray.

## 4. Sequential channel growth

The four \(D\)-dual channel rays are

\[
\begin{aligned}
r_u&=(1/6,1/3,0,0,0,0,1),\\
r_d&=(1/6,0,1/3,0,0,0,-1),\\
r_e&=(0,0,0,1/2,1,0,-1),\\
r_\nu&=(0,0,0,1/2,0,1,1).
\end{aligned}
\]

For an active channel set \(S\), allow its nonnegative weights to vary independently. The smallest subspace which contains \(q,\lambda\) and is invariant for **every** member of that weight family is

\[
\mathcal S_S
=\operatorname{span}\{q,\lambda,r_a:a\in S\}.
\]

Because every incidence channel coordinate is nonzero, each independently variable weight forces its corresponding ray into the common invariant space. Exact rational rank gives:

| active channels | \(\dim\mathcal S_S\) | dimension after hypercharge quotient |
|---|---:|---:|
| \(u\) | 3 | 3 |
| \(u,d\) | 4 | 4 |
| \(u,d,e\) | 5 | 5 |
| \(u,d,e,\nu\) | 6 | 6 |

The result is the same for \(\lambda_d\) and \(\lambda_m\). With all four Yukawa channels admitted, adjoining hypercharge raises the seven-dimensional representative rank to seven; quotienting hypercharge therefore leaves all six external-source directions.

This proves the family-level no-go:

\[
\boxed{
\text{there is no proper lower-dimensional source subsystem containing incidence and }B-L
\text{ that is invariant for all four independent Yukawa weights}.}
\]

It is stronger than a statement about the observed hierarchy or one selected renormalization scale.

## 5. What each new channel measures

The channel-coordinate maps of the two incidence candidates are

\[
V\lambda_d=(10,6,2,1),
\qquad
V\lambda_m=(10,6,4,1).
\]

Consequently:

- up alone cannot distinguish them;
- up plus down still cannot distinguish them;
- the charged-lepton channel is the first direct discriminator;
- the neutrino channel adds rank but does not distinguish this particular fork.

All four channel-resolved divergence observables annihilate \(B-L\):

\[
Vq=0.
\]

No collection of Yukawa-divergence measurements can determine the \(B-L\) shear of an incidence source. That ambiguity is not a lack of experimental precision; it is an exact null direction of this observable family.

## 6. Stop, no-go, indeterminate, continue

### Stop

Stop searching for exact two-dimensional RG closure of incidence plus \(B-L\) inside the Yukawa source family. Even one channel requires a third direction; four channels force the whole external-source quotient.

### No-go

- No up-only absorptive observable can distinguish \(\lambda_d\) from \(\lambda_m\) without an external norm or another channel.
- No Yukawa-divergence observable can determine the \(B-L\) shear.
- No proper common invariant subsystem survives arbitrary independent variation of all four channel weights.

### Indeterminate

A **scale-local approximate** subsystem can still exist when one or two weights dominate and the rest are below a declared tolerance. Its validity is numerical, energy dependent, and observable specific. It is not an exact invariant plane.

### Continue

The best live observable programme is channel-resolved tomography:

1. use the up/top response to calibrate the unique rank-one broken ray;
2. add bottom to test the predicted \(10:6\) incidence ratio;
3. add charged leptons to decide \(2\) versus \(4\);
4. retain the neutrino direction as an explicit likely experimental null;
5. use an anomaly-sensitive or separately calibrated vector-current observable to resolve the protected-current shear.

## Reproduction

```powershell
node scripts\verify_frontier_parallel_qft_rank_one_channel_growth.mjs
```

