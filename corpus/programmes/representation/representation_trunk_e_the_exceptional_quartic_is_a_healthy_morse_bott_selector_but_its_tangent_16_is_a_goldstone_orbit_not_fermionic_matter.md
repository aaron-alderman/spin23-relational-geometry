# The Exceptional Quartic Is a Healthy Morse–Bott Selector, but Its Tangent (16) Is a Goldstone Orbit, Not Fermionic Matter

**Date:** 17 October 2026  
**Scope:** Hessian and gauging audit of the rank-one exceptional selector  
**Claim status:** exact quadratic spectrum in the trace-normalized Peirce model

## Result in plain language

The quartic selector

\[
V(x)=\lambda(\lVert x\rVert^2-v^2)^2
+\kappa\lVert x^\#\rVert^2,
\qquad \lambda,\kappa>0,
\]

is locally healthy. Around a primitive rank-one vacuum it gives positive mass to every direction normal to the vacuum orbit and leaves precisely the symmetry-orbit directions massless.

The important physical correction is that these massless tangent directions are **scalar Goldstone modes of the selector field**. Although they transform as a (Spin(10)) (16), they are not automatically the fermionic Furey generation. If full (E_6) is gauged they are eaten; if it is global they remain unwanted massless bosons.

## 1. Peirce coordinates around the vacuum

Choose a normalized primitive idempotent (p), and expand

\[
x=vp+\delta x.
\]

As a real fluctuation space, the complex (27) decomposes into

\[
\mathbb R_{\rm radial}
\oplus\mathbb R_{\rm phase}
\oplus(16_{\mathbb C})_{\rm tangent}
\oplus(10_{\mathbb C})_{\rm normal}.
\]

The real dimensions are

\[
1+1+32+20=54.
\]

The quadratic adjoint has the key linearization properties

\[
D(x^\#)_{vp}=0
\quad\text{on the radial, phase and Peirce-}\frac12\text{ sectors},
\]

while on the Peirce-zero (10),

\[
D(x^\#)_{vp}=v\,\mathcal C_{10},
\]

where (mathcal C_{10}) is the norm-preserving (H_2(\mathbb O)_{\mathbb C}) adjugation. For a (2\times2) block

\[
z=\begin{pmatrix}a&q\\q^*&b\end{pmatrix},
\qquad
\mathcal C_{10}(z)
=\begin{pmatrix}b&-q\\-q^*&a\end{pmatrix},
\]

so its norm is unchanged.

## 2. Exact Hessian spectrum

Using a canonical real kinetic term (\frac12(\partial\phi)^2) and the trace-normalized Jordan norm, the Hessian is

| Sector | Real multiplicity | (m^2) |
|---|---:|---:|
| radial singlet | 1 | (8\lambda v^2) |
| phase singlet | 1 | (0) |
| tangent (16_{\mathbb C}) | 32 | (0) |
| normal (10_{\mathbb C}) | 20 | (2\kappa v^2) |

Thus

\[
\operatorname{rank}H=21,
\qquad
\dim\ker H=33.
\]

This is exactly the orbit count

\[
\dim E_6-\dim Spin(10)=78-45=33.
\]

For (\lambda,\kappa>0), there are no tachyons and no accidental transverse flat directions. The minima form a smooth homogeneous manifold and the Hessian is positive on its normal bundle. In the standard language, the selector is Morse–Bott rather than Morse: it fixes the orbit but not a point on the orbit.

Two terms are independently necessary:

- without (\lambda), the radial direction is flat;
- without (\kappa\lVert x^\#\rVert^2), the 20-real-dimensional (10)-normal sector is also flat.

## 3. What different gauge choices eat

### Full (E_6) gauged

The vacuum breaks

\[
E_6\longrightarrow Spin(10).
\]

All 33 zero modes lie on broken gauge directions and are eaten. The remaining scalar spectrum is the massive radial singlet plus the massive complex (10), totaling 21 real modes.

This is dynamically clean as a Higgs mechanism, but it removes the scalar tangent (16). The Standard-Model fermions must be separate fermionic sections of the associated tangent bundle; they cannot be identified with fluctuations of (x).

### Only (Spin(10)) gauged

(Spin(10)) fixes (p), so it breaks no gauge generator and eats no zero mode. If the scalar potential retains global (E_6), all 33 modes remain physical massless scalars.

### Left–right or Standard-Model subgroup gauged

The tested left–right and Standard-Model groups lie inside the stabilizing (Spin(10)). They likewise eat none of the orbit modes. Additional explicit breaking is required if these are the only gauged symmetries.

### General subgroup

For (H\subset E_6), the number eaten at this vacuum is

\[
\boxed{
\dim H-\dim(H\cap Spin(10)).
}
\]

Any remaining zero directions are physical Goldstones or pseudo-Goldstones once further interactions are included.

## 4. The next independent low-degree invariant

The base quartic gives one common Hermitian mass to the complex (10). It does not fix the mass ratio

\[
m_{10}^2/m_{\rm radial}^2=\kappa/(4\lambda),
\]

because (\lambda) and (\kappa) are independent allowed couplings.

The next independent compact-(E_6) scalar is the cubic

\[
\Delta V=2\operatorname{Re}[\mu N(x)].
\]

At the rank-one vacuum its quadratic part acts only on the complex (10). After rotating the phase of (\mu), it splits that sector into two real (Spin(10)) vectors:

\[
m_{10,\pm}^2
=2\kappa v^2\pm2|\mu|v.
\]

Local stability requires

\[
\kappa v>|\mu|
\]

in this normalization.

This cubic does not lift the 33 orbit modes because (N(x)=0) on the entire rank-one orbit. No exact (E_6)-invariant can lift genuine (E_6/Spin(10)) Goldstones. They must be gauged away or lifted by explicit/spurionic symmetry breaking.

## 5. Is the selector physically healthy?

| Test | Verdict |
|---|---|
| Is the potential bounded below for (\lambda,\kappa>0)? | **Yes** |
| Does it select normalized rank-one vacua? | **Yes** |
| Are all directions normal to the orbit massive? | **Yes** |
| Are there accidental non-orbit Hessian zero modes? | **No** |
| Does global (E_6) leave unwanted Goldstone bosons? | **Yes, 33** |
| Does gauged (E_6) remove them? | **Yes** |
| Does gauged (Spin(10)), LR or SM remove them? | **No** |
| Are the tangent scalar (16) and Furey fermion (16) the same physical field? | **No** |
| Does symmetry determine (\kappa/\lambda)? | **No** |

## 6. Consequence for the crystal reading

The “crystal” now has a concrete elastic model. The invariant potential favors rank-one faces, and the Hessian is stiff in the radial and (10)-normal directions while remaining soft along rotations from one equivalent face to another.

That is a real improvement over a hand-chosen projector. But it also distinguishes two layers that must not be conflated:

1. the selector field chooses a face of the exceptional crystal;
2. fermionic matter lives in a (16)-bundle associated with the tangent representation at that face.

The geometry relates them. It does not turn bosonic vacuum oscillations into fermions.

## 7. Certificate

```powershell
node verification/verify/verify_representation_trunk_exceptional_selector_hessian.mjs
```

The certificate verifies the 54-real-dimensional multiplicity ledger, Hessian rank and kernel, gauge-eating counts, cubic splitting, and local stability inequality.

## Related results

- [Conditional Peirce selector and quartic vacuum orbit](representation_trunk_c_a_primitive_jordan_state_selects_the_16_conditionally_but_e6_does_not_select_the_state.md)
- [Physical role of the exceptional (10+1)](representation_trunk_d_the_exceptional_10_plus_1_are_active_yukawa_and_vacuum_directions_not_disposable_padding.md)
- [Completed Furey generation inside the exceptional (27)](representation_trunk_a_the_furey_generation_embeds_in_the_complex_exceptional_27_but_is_not_equivalent_to_the_jordan_module.md)
