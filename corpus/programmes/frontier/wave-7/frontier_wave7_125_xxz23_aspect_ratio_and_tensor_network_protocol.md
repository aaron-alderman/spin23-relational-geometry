# Frontier Wave 7.125: XXZ-23 Aspect Ratio and a Tensor-Network Protocol

**Date:** 25 October 2026

**Status:** executable protocol specification; large-\(L\) contraction not yet run

**Evidence:** [aspect-ratio and resource record](../../../../evidence/data/xxz23-aspect-ratio-tensor-network-protocol-v1.json)

**Certificate:** [normalization/resource verifier](../../../../verification/verify/verify_xxz23_aspect_ratio_tensor_network_protocol.mjs)

## Result

The three Monster checkpoints now have physical temperatures in the published
XXZ normalization. Write \(\Delta=\cos\gamma\), with \(\gamma=\pi/23\). The
standard spin Hamiltonian has spinon velocity

\[
 v_{\rm spin}={\pi\sin\gamma\over2\gamma}.
\]

The Vernier--Miao--Yamazaki Hamiltonian is twice that normalization because
\(\sigma^+\sigma^-+\sigma^-\sigma^+=(\sigma^x\sigma^x+\sigma^y\sigma^y)/2\)
and its \(zz\) coefficient is \(\Delta/2\). Therefore

\[
 v={\pi\sin\gamma\over\gamma}=23\sin(\pi/23)
  =3.1318329292136715,
 \qquad \tau=i{v\beta\over L}.
\]

At the minimum commensurate length \(L=46\), the target points are:

| \(\operatorname{Im}\tau\) | \(\beta\) | \(T=1/\beta\) |
|---:|---:|---:|
| 0.8 | 11.7503075138 | 0.0851041557 |
| 1.0 | 14.6878843922 | 0.0680833245 |
| 1.2 | 17.6254612706 | 0.0567361038 |

The earlier finite toy's \(\beta=0.8,1,1.2\) was an intentionally dimensionless
curve control. It was not the XXZ/CFT aspect-ratio dictionary.

## 1. The velocity-lock gate

The uncoupled ladder in Wave 7.124 used a critical Ising leg with velocity
\(v_I=2J_I\). Setting

\[
 J_I=h_I={v\over2}=1.5659164646068357
\]

matches the two light cones before coupling. Once \(\lambda\sum_j\sigma_j^z
\tau_j^z\) is turned on, that analytic equality is no longer guaranteed. The
interacting spectrum must supply its own velocities. If the relevant sectors
do not converge to one common velocity under \(L=46,92,138\), there is no
single torus modulus and the Monster comparison is rejected rather than
rescued by separate temperature rescalings.

## 2. Concrete contraction

Use a purified thermal MPS on rungs of physical dimension four. The doubled
purification dimension is 16. A bulk Hamiltonian MPO needs six channels: start
and finish channels plus the four inter-rung products \(\sigma^+,\sigma^-,
\sigma^z,\tau^x\). The on-rung \(\tau^z\) and \(\sigma^z\tau^z\) terms occupy
the direct channel. The symmetry insertions \(g,z,h\) have bond dimension one;
the published duality MPO has its 23-dimensional auxiliary space.

The minimum convergence grid is

\[
 3\ L\text{-values}\times3\ \tau\text{-values}\times
 3\ \chi\text{-values}\times2\ \delta\beta\text{-values}=54
\]

thermal cells, each returning the five normalized amplitudes needed for the
connected ratio and its controls. At \(L=46\), storing one dense complex
purified MPS costs approximately 46, 184 and 736 MiB for
\(\chi=64,128,256\). These figures exclude environments, workspaces and MPOs;
they are memory floors, not machine promises.

## 3. Preregistered decision rule

1. Verify \(R=1\) at \(\lambda=0\).
2. Halve the imaginary-time step and double \(\chi\) until the change is below
   one quarter of the declared comparison tolerance.
3. If a coupling is fitted, fit it only at \(\tau=i,L=46\), then freeze it.
4. Predict \(0.8i,1.2i\) and both larger sizes without retuning.
5. Extrapolate with both \(1/L\) and \(1/L^2\); their spread is model-form
   uncertainty, because the leading correction exponent has not been proved.
6. Reject a one-modulus interpretation if velocity locking fails.
7. Reconstruct the TY associator independently. Trace agreement does not
   determine an \(F\)-symbol.

## 4. The central-charge boundary

This ladder has \(c=1+1/2=3/2\), whereas \(V^\natural\) has \(c=24\). The
connected ratio cancels much of the vacuum growth, so a low-\(c\) system can
imitate it. Even complete agreement would establish a physical realization of
the order-46 defect statistic, not of the Monster CFT. This turns the ladder
into a useful discriminator and engineering prototype while blocking the
largest possible overclaim.

## Sources and corpus links

- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660).
- Caux, [XXZ spinon dispersion in *The Bethe Ansatz*](https://integrability.org/g_sc_p_e.html).
- [Local order-46 ladder](frontier_wave7_124_local_xxz23_ising_order46_trace_architecture.md)
- [Monster connected-ratio benchmark](frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md)
