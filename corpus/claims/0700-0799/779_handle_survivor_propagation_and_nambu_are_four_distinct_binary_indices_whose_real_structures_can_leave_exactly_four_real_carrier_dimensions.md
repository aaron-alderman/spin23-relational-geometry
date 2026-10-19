# Handle, Survivor, Propagation and Nambu Are Four Distinct Binary Indices Whose Real Structures Can Leave Exactly Four Real Carrier Dimensions

## Claim

The current synthesis contains four different binary structures:

1. **handle** \(H=C,D\), from sewing \((u,e)\) and \((d,\nu)\);
2. **survivor topology** \(S=A,B\), from the two Furey TRO solutions;
3. **propagation orientation** \(R=+,-\), from positive/negative flux channels; and
4. **Nambu orientation** \(N=\text{particle},\text{conjugate}\), from the CAR adjoint.

They may carry isomorphic two-state matrices, but they are not the same physical index. Keeping them separate and imposing their real structures explicitly avoids both false identifications and hidden mirror doubling.

On the raw tensor product, the independent survivor, propagation and Nambu reality constraints can reduce the joint fixed space to exactly four real dimensions—the required \(Sp(4,\mathbb R)\) carrier dimension. The reduction is possible without identifying survivor topology with charged Nambu conjugation.

## 1. Typed index ledger

| Index | Origin | Exchange type | Physical role |
|---|---|---|---|
| \(H\) | sewn Furey matter cycles | complex-linear symplectic handle exchange | two relational faces |
| \(S\) | two surviving TRO topologies | antiunitary \(\sigma_xK\) | response reciprocity candidate |
| \(R\) | transfer flux polarization | antiunitary \(\sigma_xK\) | incoming/outgoing reversal |
| \(N\) | self-dual CAR completion | gauge/Lorentz-conjugating antiunitary | particle/antiparticle adjoint |

The repeated appearance of \(\sigma_xK\) reflects a common real-structure type. It does not license erasing the index labels.

## 2. Dimension audit without Nambu

Begin with

\[
\mathcal V_{HSR}=\mathbb C^2_H\otimes\mathbb C^2_S\otimes\mathbb C^2_R,
\]

of complex dimension eight and real dimension sixteen.

Let

\[
\Theta_S=I_H\otimes\sigma_x\otimes I_R\,K,
\]

\[
\Theta_R=I_H\otimes I_S\otimes\sigma_x\,K.
\]

Each fixed space separately has real dimension eight. Their simultaneous fixed space has real dimension four:

\[
\dim_{\mathbb R}\operatorname{Fix}(\Theta_S)\cap
\operatorname{Fix}(\Theta_R)=4.
\]

The product of the two antiunitaries is the complex-linear lock

\[
L_{SR}=I_H\otimes\sigma_x\otimes\sigma_x.
\]

Thus imposing both realities ties survivor parity to propagation parity. This is the precise form of the missing operational identification. It is a constraint, not an a priori equality of labels.

By contrast, imposing only the diagonal antiunitary

\[
I_H\otimes\sigma_x\otimes\sigma_xK
\]

leaves real dimension eight. One reality condition is insufficient to reach the four-carrier.

## 3. Adding the Nambu index

Now take

\[
\mathcal V_{HSRN}=\mathbb C^2_H\otimes\mathbb C^2_S
\otimes\mathbb C^2_R\otimes\mathbb C^2_N,
\]

with complex dimension sixteen. Add the independent Nambu real structure

\[
\Gamma_N=I_{HSR}\otimes\sigma_xK,
\]

understood to include the source-derived Lorentz and gauge conjugation of \(C_F\).

The joint fixed space of \(\Theta_S,\Theta_R,\Gamma_N\) again has real dimension four. A self-dual Nambu presentation therefore need not add physical degrees of freedom when its reality constraint is imposed. Raw tensor dimension is not the physical-state count.

This is a dimension theorem only. An interacting CAR construction must still prove that the fixed generators have the correct anomaly and no independent mirror spectrum.

## 4. Gauge obstruction to identifying survivor and Nambu indices

For a charged Nambu pair, the gauge action is

\[
G_N(\phi)=\operatorname{diag}(e^{iq\phi},e^{-iq\phi}).
\]

Then

\[
\sigma_xK\,G_N(\phi)\,(\sigma_xK)^{-1}=G_N(\phi).
\]

The antiunitary is gauge equivariant because it exchanges the opposite charges while conjugating coefficients.

For a same-charge pair,

\[
G_S(\phi)=e^{iq\phi}I_2,
\]

the same operation produces \(e^{-iq\phi}I_2\), which differs when \(q\ne0\). Consequently:

\[
\boxed{S\not\equiv N\quad\text{on charged matter}.}
\]

The survivor exchange can act as spatial reciprocity only after compression to a gauge-neutral response carrier or on a genuinely neutral sector. This recovers the earlier CAR gauge-equivariance no-go in the new transfer language.

## 5. Other forbidden identifications

### Handle versus propagation

Handle exchange is complex-linear and symplectic. Propagation reversal is anti-linear and anti-symplectic on the real carrier. They cannot be the same operator.

### Handle versus survivor

The handles are the matter-cycle pairs \((u,e)\), \((d,\nu)\). The survivors are alternative neutral-block TRO topologies. Their label sets and physical construction differ.

### Survivor versus propagation

This is not algebraically forbidden, but it requires the diagonal lock \(L_{SR}\) or an explicit kernel that identifies survivor parity with boundary orientation. Document 778 supplies the matching antiunitary type, not the locking dynamics.

## 6. Minimal credible architecture

The economical architecture is therefore:

\[
\text{complex handle amplitudes}
\otimes
\text{survivor/propagation real-structure pair}
\otimes
\text{self-dual Nambu presentation},
\]

with all three reality constraints imposed. The physical external response remains four-real-dimensional, while charged CAR conjugation stays internal and distinct.

This architecture provides a disciplined place for every recurring “two”:

- two handles are relational faces;
- two propagation orientations are flux signs;
- two survivors supply response reciprocity;
- two Nambu components enforce the adjoint relation.

## 7. Stop-everything and falsification criteria

**Positive trigger:** derive a quadratic response kernel whose null or fixed equations impose \(\Theta_S\psi=\Theta_R\psi=\psi\), giving the four-real-dimensional carrier and the transfer matrix of document 777.

**Gauge trigger:** demonstrate the compression to neutral response observables before identifying survivor and propagation indices.

**Mirror falsifier:** the three reality constraints leave more than one independent chiral generation after CAR quantization.

**Overconstraint falsifier:** interactions fail to preserve the joint fixed space or collapse it below four real dimensions.

**Index falsifier:** any derivation silently equates \(H,S,R,N\) solely because each is binary.

## 8. Executable certificate

```powershell
node verification/audit/audit_handle_survivor_propagation_and_nambu_binary_indices_and_real_dimensions.mjs
```

The certificate constructs the real-linear antiunitary constraints, computes all fixed-space dimensions, and verifies the charged Nambu versus same-charge survivor gauge distinction.

## Companion documents

- [The survivor exchange as spatial flux reversal](778_the_furey_survivor_exchange_has_exactly_the_spatial_flux_reversal_real_structure_but_preserves_the_sewn_meridian_plane.md)
- [The response selector and CAR adjoint are distinct antiunitaries](../0300-0399/307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Exchange-fixed CAR gauge-equivariance obstruction](../0100-0199/165_exchange_fixed_car_gauge_equivariance_obstruction.md)
