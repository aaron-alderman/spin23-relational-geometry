# The Majorana-Vacuum Stabilizer Is the \(\mathbb Z_6\)-Quotiented Standard Model Times a Split Baryon Triality, with the \(\mathbb Z_9\) Lift Cubing to Colour Centre

**Date:** 18 October 2026  
**Branches:** Pati–Salam breaking, global Standard-Model group, baryon triality, hypercharge dressing, Majorana vacuum  
**Claim status:** exact stabilizer and finite-kernel calculation for the declared rank-one Pati–Salam vacuum; anomaly transgression and source finite-triple admissibility remain open  
**Certificate:** [prove_the_majorana_vacuum_stabilizer_and_split_baryon_triality.mjs](../../../verification/prove/prove_the_majorana_vacuum_stabilizer_and_split_baryon_triality.mjs)

## Executive result

Normalize hypercharge by

\[
y=6Y\in\mathbb Z
\]

on every Standard-Model Weyl multiplet. The connected Pati–Salam embedding is

\[
\Phi:
SU(3)_C\times SU(2)_L\times U(1)_y
\longrightarrow
\frac{SU(4)\times SU(2)_L\times SU(2)_R}
{\langle(-I_4,-I_2,-I_2)\rangle},
\]

\[
\Phi(A,L,z)=
\left[
\begin{pmatrix}
zA&0\\
0&z^{-3}
\end{pmatrix},
L,
\begin{pmatrix}
z^3&0\\
0&z^{-3}
\end{pmatrix}
\right].
\]

Its kernel is exactly

\[
\ker\Phi=
\left\{
(z^2I_3,z^3I_2,z):z^6=1
\right\}
\cong\mathbb Z_6.
\]

Therefore the connected stabilizer of the standard rank-one
Pati–Salam Majorana direction is

\[
\boxed{
G_{\rm SM}
=
\frac{SU(3)_C\times SU(2)_L\times U(1)_y}{\mathbb Z_6}.
}
\]

Let

\[
t=U=\operatorname{diag}(\omega,\omega,\omega,1),
\qquad
\omega=e^{2\pi i/9}.
\]

Then \(t\) commutes with the connected stabilizer and

\[
t^3=
\operatorname{diag}(\zeta_3,\zeta_3,\zeta_3,1),
\qquad
\zeta_3=\omega^3,
\]

is precisely the embedded colour-centre element. Thus \(t\) has order three
only **modulo connected gauge transformations**.

The extension nevertheless splits. If \(g_y(\omega^2)\) denotes the
hypercharge transformation with \(z=\omega^2\), then

\[
g_y(\omega^2)^3=t^{-3}
\quad\text{in }G_{\rm SM},
\]

so

\[
\tau=t\,g_y(\omega^2)
\]

has exact order three. Consequently the full vacuum stabilizer is

\[
\boxed{
G_{\rm vac}\cong G_{\rm SM}\times\mathbb Z_3^{\,B_3}.
}
\]

On elementary fields, \(\tau\) differs from the conventional
\(B-2Y\) representative by the colour centre. On gauge-invariant operators
they are identical. This supplies the missing exact global-group bridge:

\[
\text{order-nine Pati--Salam lift}
\longrightarrow
\text{gauge-cubed component}
\longrightarrow
\text{split low-energy baryon triality}.
\]

## 1. The connected Lie stabilizer

Use the Pati–Salam hypercharge relation

\[
Y=T^3_R+\frac12(B-L).
\]

Writing \(z=e^{i\phi}\) for integer-normalized \(y=6Y\), the two factors are

\[
\exp\!\left(i6\phi\frac{B-L}{2}\right)
=
\operatorname{diag}(z,z,z,z^{-3})
\in SU(4),
\]

and

\[
\exp(i6\phi T^3_R)
=
\operatorname{diag}(z^3,z^{-3})
\in SU(2)_R.
\]

The rank-one right-handed-neutrino Majorana direction has \(Y=0\), so this
diagonal \(U(1)_y\) remains unbroken. The colour block \(SU(3)_C\) and all of
\(SU(2)_L\) also remain unbroken. At Lie-algebra level the stabilizer is

\[
\mathfrak{su}(3)_C\oplus\mathfrak{su}(2)_L\oplus\mathfrak u(1)_Y.
\]

The global quotient requires the kernel calculation below.

## 2. Exact \(\mathbb Z_6\) kernel

Suppose \(\Phi(A,L,z)\) is the identity in the physical Pati–Salam quotient.
Its representative is therefore either

\[
(I_4,I_2,I_2)
\]

or

\[
(-I_4,-I_2,-I_2).
\]

The \(SU(2)_R\) factor forces \(z^6=1\). Writing the common sign as
\(z^3=\pm1\), the remaining equations give

\[
A=z^2I_3,
\qquad
L=z^3I_2.
\]

Hence

\[
\ker\Phi
=
\langle
(\zeta_3 I_3,-I_2,e^{i\pi/3})
\rangle
\cong\mathbb Z_6.
\]

This is the standard global form of the Standard-Model gauge group, derived
here from the same parent quotient used by the discrete lift.

## 3. The order-nine generator inside the stabilizer

The matrix \(U\) preserves the lepton coordinate \(e_4\), and therefore the
rank-one Majorana tensor built from it. It commutes with block-diagonal colour,
with the \(B-L\) torus, and with both weak factors.

Its cube is

\[
U^3=
\begin{pmatrix}
\zeta_3I_3&0\\
0&1
\end{pmatrix},
\]

the image of the \(SU(3)\) centre. Thus a presentation of the residual group is

\[
G_{\rm vac}
\cong
\frac{
SU(3)\times SU(2)\times U(1)_y\times\langle t\rangle_{9}
}{
\left\langle
(z^2,z^3,z),\;
t^3\zeta_3^{-1}
\right\rangle
},
\]

where the first relation runs over \(z^6=1\). This presentation keeps visible
why the useful fieldwise lift has order nine while the action modulo gauge has
order three.

## 4. Construction of an exact order-three complement

Because the connected stabilizer contains a divisible \(U(1)\), the central
extension can be split explicitly.

Choose

\[
z=\omega^2,
\qquad
z^3=\zeta_3^2.
\]

Using the \(\mathbb Z_6\) kernel relation, one finds

\[
\Phi(I,I,z)^3=\zeta_3^{-1}\in SU(3)_C.
\]

Since \(t^3=\zeta_3\), the commuting product

\[
\tau=t\,\Phi(I,I,\omega^2)
\]

satisfies

\[
\tau^3=1.
\]

It maps to the nontrivial component, so it generates a complement
\(\mathbb Z_3\) with trivial intersection with \(G_{\rm SM}\). This proves

\[
G_{\rm vac}\cong G_{\rm SM}\times\mathbb Z_3.
\]

The splitting is not canonical: multiplying \(\tau\) by a gauge-centre element
changes its elementary-field charges but not its action on observables.

## 5. Elementary-field comparison

In left-handed Weyl notation,

\[
y=6Y=(1,-4,2,-3,6,0)
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

The order-nine lift has exponents

\[
q_t=(1,-1,-1,0,0,0)\pmod9.
\]

The exact order-three complement \(\tau=t\,g_y(\omega^2)\) has exponents

\[
q_\tau=q_t+2y=(3,0,3,3,3,0)\pmod9.
\]

Dividing by three gives the \(\mathbb Z_3\) charges

\[
(1,0,1,1,1,0).
\]

The representative \(B-2Y\) has canonical residues

\[
(0,1,-1,1,1,0)\pmod3.
\]

Their difference is

\[
(1,-1,-1,0,0,0),
\]

which is exactly the colour-centre charge. Thus

\[
\boxed{
\tau\sim B-2Y
\quad\text{modulo }SU(3)_C\text{ gauge}.
}
\]

On every gauge-invariant operator the two actions coincide.

## 6. What this resolves

This calculation fixes four ambiguities:

1. the connected vacuum stabilizer has the Standard Model's \(\mathbb Z_6\)
   global quotient;
2. the order-nine lift cubes to the colour centre, not to an unexplained
   identity;
3. the residual component extension splits after hypercharge dressing;
4. the resulting order-three action is baryon triality up to colour gauge.

The phrase “\(\mathbb Z_9\) symmetry” therefore refers to the useful fieldwise
lift. The faithful symmetry on gauge equivalence classes is a split
\(\mathbb Z_3\).

## 7. What this does not resolve

The calculation does not yet:

- determine whether the disconnected component is gauged or global in the
  source finite spectral triple;
- compute \(\Omega_5^{\mathrm{Spin}}(BG_{\rm vac})\);
- construct the Higgs/Goldstone Wess–Zumino term that matches the parent weak
  anomalies to the low-energy pure Dai–Freed class;
- include every heavy scalar and fermion threshold;
- derive the component from the Jordan/Furey/\(Spin(2,3)\) carrier.

## 8. Stop-everything and falsification criteria

**Global-form stop:** any proposed residual group lacking the
\(\mathbb Z_6\) kernel must explain why the faithful Pati–Salam quotient or the
integer hypercharge embedding has been changed.

**Order stop:** do not call \(U\) an independent order-nine action on physical
gauge orbits; \(U^3\) is colour centre.

**Splitting stop:** do not call the residual \(\mathbb Z_3\) extension
nonsplit; the explicit \(\tau=tg_y(\omega^2)\) is an order-three complement.

**Representative stop:** disagreement between \(\tau\) and \(B-2Y\) on coloured
elementary fields is not physical unless it survives quotienting the colour
centre.

**Vacuum stop:** if the source scalar vacuum is not the declared
right-neutrino rank-one direction, its stabilizer must be recomputed and this
result cannot simply be reused.

**Anomaly stop:** a split group does not imply an anomaly-free representation.
The parent mixed anomalies and low-energy Dai–Freed class remain separate
calculations.

## 9. Next calculation

The next exact target is the induced map on anomaly data:

\[
\Omega_5^{\mathrm{Spin}}
\!\left(
B\left[
\mathbb Z_3\times
\frac{SU(4)\times SU(2)_L\times SU(2)_R}{\mathbb Z_2}
\right]
\right)
\longrightarrow
\Omega_5^{\mathrm{Spin}}
\!\left(
B\left[
\mathbb Z_3\times
\frac{SU(3)\times SU(2)\times U(1)}{\mathbb Z_6}
\right]
\right).
\]

A full computation may be difficult, but the group homomorphism and the
fermionic character pullback are now explicit. A bounded next step is to
construct the degree-six anomaly polynomial with a background
\(\mathbb Z_3\) lift and track its descent under
\(Y=T_R^3+(B-L)/2\).

## Position in the corpus

- [perturbative anomaly shadow and mod-nine torsion boundary](1095_the_anomaly_polynomial_tracks_the_mod3_shadow_of_the_Pati_Salam_descent_but_the_baryon_triality_mod9_class_is_genuinely_torsional.md)
- [split parent component and parent mixed anomalies](1093_the_order_nine_operator_is_a_gauge_dressed_component_of_SU4_times_Z3_and_the_three_family_obstruction_moves_into_mixed_weak_anomalies.md)
- [low-energy quotient and Dai–Freed class](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
- [unique Majorana-compatible lift](1091_the_rank_one_Majorana_vacuum_uniquely_selects_the_3B_mod9_lift_and_its_four_sector_operator_closes_only_for_three_family_unimodularity.md)

