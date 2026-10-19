# The Furey Survivor Exchange Has Exactly the Spatial Flux-Reversal Real Structure but Preserves the Sewn Meridian Plane

## Claim

The antiunitary required to interpret the hyperbolic carrier as passive spatial transfer is

\[
\Theta_{\rm flux}=\sigma_xK
\]

on the positive/negative flux pair. This is exactly the same antiunitary type already selected independently by the two surviving Furey TRO topologies:

\[
\Theta_{\rm ex}(v_A,v_B)=(\bar v_B,\bar v_A).
\]

It squares to one, reverses the flux metric, and fixes the complex-polarized transfer matrix. On the real symplectic carrier it becomes

\[
\kappa(q,p)=(q,-p),
\]

which is anti-symplectic. It preserves the sewn meridian Lagrangian plane pointwise and reverses the complementary longitude plane. Therefore it can supply the missing passive-transfer real structure if—and only if—the survivor-pair index is physically identified with counterpropagating response channels.

## 1. Flux reversal

Let

\[
\Sigma=\begin{pmatrix}I_2&0\\0&-I_2\end{pmatrix}
\]

be the transfer flux metric, and let

\[
X=\begin{pmatrix}0&I_2\\I_2&0\end{pmatrix}.
\]

The antiunitary \(\Theta=XK\) obeys

\[
\Theta^2=X\bar X=I
\]

and

\[
X\bar\Sigma X=-\Sigma.
\]

Thus it exchanges incoming and outgoing flux orientations. This is the standard algebraic behavior required of a spinless spatial-reversal or reciprocity real structure.

## 2. Compatibility with the selected transfer word

The complex-polarized transfer matrix has the Bogoliubov form

\[
\mathcal T=
\begin{pmatrix}
\alpha&\beta\\
\bar\beta&\bar\alpha
\end{pmatrix}.
\]

Consequently,

\[
X\bar{\mathcal T}X=\mathcal T.
\]

The certificate verifies this equality for the explicit \(\alpha,\beta\) obtained from \((UPHR)^2\). The transfer checkpoint is therefore reciprocal under precisely the same \(\sigma_xK\) real structure found in the completed Furey survivor carrier.

This is a representation-type coincidence with real content: both constructions select the same involutive antiunitary and the same exchange-fixed population-normal form.

## 3. Action on the real symplectic carrier

Under

\[
a=(q+ip)/\sqrt2,
\]

complex conjugation acts as

\[
(q,p)\mapsto(q,-p).
\]

Hence the real action is

\[
\kappa=\operatorname{diag}(I_2,-I_2)
\]

and satisfies

\[
\kappa^TJ\kappa=-J.
\]

For the sewn basis

\[
A=\operatorname{span}\{a_1,a_2\},
\qquad
B=\operatorname{span}\{b_1,b_2\},
\]

the action is

\[
a_i\mapsto a_i,
\qquad
b_i\mapsto-b_i.
\]

Therefore the antiunitary preserves the matter-selected meridian plane. It does not exchange meridians and longitudes and does not choose a longitude framing. Its task is orientation/reciprocity, not Fourier polarization.

## 4. Response selector versus CAR adjoint

The Furey programme contains two antiunitaries that must remain distinct.

### Survivor exchange \(\Theta_{\rm ex}\)

- exchanges the two completed survivor topologies;
- is gauge-trivial at the neutral carrier level;
- induces the population-normal \(H_2(\mathbb R)\) observable form;
- has the correct type for spatial flux reversal.

### Furey conjugation \(C_F\)

- reverses Lorentz chirality;
- conjugates color and hypercharge representations;
- supplies the Nambu/CAR adjoint type;
- is not merely spatial reversal of the same charged channel.

Using \(C_F\) as the passive transfer involution would turn opposite propagation into particle/antiparticle conjugation. Using \(\Theta_{\rm ex}\) as the CAR adjoint fails gauge equivariance. The successful synthesis requires both operations in their correct roles.

## 5. What is advanced and what remains open

The algebraic passivity gate from document 777 is now matched by an independently derived Furey antiunitary. This is stronger than inventing a new boundary conjugation after seeing the transfer matrix.

The missing identification is operational:

\[
\boxed{
\text{survivor topology }A/B
\stackrel{?}{=}
\text{opposite propagation faces of one response channel}.
}
\]

The sewn matter construction instead labels two handles \(C,D\). It has not shown that the separate survivor-topology pair is the propagation orientation on either handle. These are different binary indices until an explicit response kernel relates them.

## 6. Stop-everything and falsification criteria

**Positive trigger:** integrating out the completed Furey pair produces a boundary Green function whose two survivor blocks are the incoming/outgoing flux polarizations and whose transfer is \(\mathcal T\).

**Partial trigger:** the survivor exchange gives reciprocity, but an independent geometric boundary orientation is required to identify propagation direction.

**Index-mismatch falsifier:** survivor topology exchange acts between distinct internal theories rather than between two boundary orientations of one physical response.

**Gauge falsifier:** charged response channels require \(C_F\) conjugation and cannot use gauge-trivial survivor exchange as spatial reversal.

**Framing falsifier:** \(\Theta_{\rm ex}\) is claimed to select the longitude shear even though it only sends \(b_i\mapsto-b_i\).

## 7. Executable certificate

```powershell
node verification/verify/verify_furey_survivor_exchange_has_exact_spatial_flux_reversal_type_but_preserves_the_meridian_plane.mjs
```

The certificate verifies involutivity, flux reversal, transfer reality, anti-symplecticity and the separate meridian/longitude actions.

## Companion documents

- [The two Furey survivor TROs form an antiunitary exchange pair](../0100-0199/162_furey_survivor_exchange_antiunitary_candidate.md)
- [Furey conjugation supplies the Nambu map but not neutral exchange](../0100-0199/166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
- [The survivor exchange induces the population-normal real form](../0300-0399/303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [The sewn pairs select the meridian Lagrangian plane](../0400-0499/480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Pseudo-unitary transfer and unitary scattering](777_complex_polarization_turns_the_hyperbolic_symplectic_word_into_pseudo_unitary_transfer_and_unitary_scattering_but_the_spatial_real_structure_is_the_gate.md)
