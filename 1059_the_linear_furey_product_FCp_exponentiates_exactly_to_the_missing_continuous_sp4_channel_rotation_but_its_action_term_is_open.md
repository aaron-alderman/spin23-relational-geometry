# The Linear Furey Product \(F_Cp\) Exponentiates Exactly to the Missing Continuous \(\mathfrak{sp}_4\) Channel Rotation, but Its Action Term Is Open

**Date:** 18 October 2026  
**Branches:** four-channel Furey response, product grading, channel translation, continuous channel rotation, full \(\mathfrak{sp}_4\) closure, action gate  
**Claim status:** exact source-to-root one-parameter intertwiner; microscopic interaction and charge-safe dynamics open  
**Certificate:** [exponentiate_the_furey_response_product_into_the_sp4_channel_flow.mjs](scripts/exponentiate_the_furey_response_product_into_the_sp4_channel_flow.mjs)

## Executive result

The continuous channel rotation required by document 1058 is already present algebraically on the four-channel Furey response space.

Let

\[
G_{\rm src}=F_Cp,
\]

where \(F_C\) is the channel translation and \(p=h\chi\) is the product grading. Because \(F_C\) and \(p\) are real orthogonal involutions that anticommute,

\[
\boxed{
G_{\rm src}^T=-G_{\rm src},
\qquad
G_{\rm src}^2=-I.
}
\]

Thus \(G_{\rm src}\) is a real orthogonal complex structure and has the canonical one-parameter flow

\[
e^{tG_{\rm src}}
=\cos t\,I+\sin t\,G_{\rm src}.
\]

The established aggregate map \(A:\mathbb C^4\to\mathbb C^2\) obeys

\[
\boxed{
AG_{\rm src}=\varepsilon A.
}
\]

Consequently,

\[
\boxed{
A\,e^{tG_{\rm src}}
=e^{t\varepsilon}A
\quad\text{for every }t\in\mathbb R.
}
\]

The aggregate sector is reducing for \(G_{\rm src}\). After realification, the target generator is exactly

\[
I_{\rm phase}\otimes\varepsilon_{\rm channel},
\]

the third seed in the full \(\mathfrak{sp}_4\) closure theorem.

Therefore the algebraic implication has strengthened to

\[
\boxed{
\text{Furey response product}
+\text{Jordan controlled turn}
+\text{split TKK dilation}
\Longrightarrow
\mathfrak{sp}_4(\mathbb R).
}
\]

The remaining gate is dynamical, not algebraic: does the physical response action contain a coherent term whose Hamiltonian vector field is \(G_{\rm src}\), with a gauge-, Lorentz-, CAR- and charge-compatible microscopic mediator?

## 1. Source generator

The four complex response channels are ordered

\[
z=(u,\nu,d,e)^T.
\]

The product grading is

\[
p=\operatorname{diag}(+,-,+,-),
\]

and the channel translation is

\[
F_C=(u\ e)(\nu\ d).
\]

They satisfy

\[
F_Cp=-pF_C.
\]

Since

\[
F_C^T=F_C,
\qquad
p^T=p,
\]

one gets

\[
(F_Cp)^T=pF_C=-F_Cp.
\]

Also,

\[
(F_Cp)^2
=F_CpF_Cp
=-F_C^2p^2
=-I.
\]

No complex conjugation is needed. The antiunitary used earlier is

\[
\Gamma_{\rm src}=F_CpK,
\]

but its linear matrix part \(F_Cp\) is itself a valid real skew generator.

## 2. Exact continuous descent

Document 1002 proved

\[
A(F_Cp)=\varepsilon A.
\]

By induction,

\[
AG_{\rm src}^n=\varepsilon^nA.
\]

Therefore the exponential series intertwines term by term:

\[
\begin{aligned}
A e^{tG_{\rm src}}
&=A\sum_{n=0}^{\infty}\frac{t^nG_{\rm src}^n}{n!}\\
&=\sum_{n=0}^{\infty}\frac{t^n\varepsilon^n}{n!}A\\
&=e^{t\varepsilon}A.
\end{aligned}
\]

Since both generators square to \(-I\),

\[
e^{tG_{\rm src}}
=\cos t\,I+\sin t\,G_{\rm src},
\]

\[
e^{t\varepsilon}
=\cos t\,I+\sin t\,\varepsilon.
\]

At \(t=\pi/2\), the flow reproduces the discrete linear operations:

\[
e^{(\pi/2)G_{\rm src}}=F_Cp,
\qquad
e^{(\pi/2)\varepsilon}=\varepsilon.
\]

The continuous root was therefore latent in the earlier discrete intertwiner.

## 3. Reducing property

Let

\[
P_{\rm agg}=A^TA.
\]

The aggregate projector commutes separately with \(F_C\) and \(p\), so it commutes with their product:

\[
[P_{\rm agg},G_{\rm src}]=0.
\]

Hence

\[
[P_{\rm agg},e^{tG_{\rm src}}]=0.
\]

The symmetric lepton/quark aggregate and its antisymmetric complement are invariant under the entire one-parameter group. Continuous exponentiation does not introduce leakage that was absent in the discrete response algebra.

## 4. Realification gives exactly the missing seed

The complex aggregate vector

\[
(L,Q)\in\mathbb C^2
\]

realifies into phase quadratures times the lepton–quark channel plane. Because \(e^{t\varepsilon}\) is real, it acts identically on real and imaginary quadratures. Its infinitesimal realification is

\[
\boxed{
\mathcal C=I_{\rm phase}\otimes\varepsilon_{\rm channel}.
}
\]

This is precisely the generator adjoined in document 1058. There is no longer an algebraic question about whether the discrete Furey operation has a compatible continuous logarithm on the response root: it does, canonically.

Combining with

\[
\mathcal A=J_{\rm phase}\otimes e_-,
\qquad
\mathcal H=K_{\rm phase}\otimes D,
\]

gives the certified full closure

\[
\operatorname{Lie}\langle\mathcal A,\mathcal H,\mathcal C\rangle
=\mathfrak{sp}_4(\mathbb R).
\]

## 5. Symmetry of a diagonal response kernel

Existence of the flow is not the same as invariance of a particular dynamical kernel.

Let

\[
R=\operatorname{diag}(r_u,r_\nu,r_d,r_e).
\]

Then

\[
[R,G_{\rm src}]=0
\]

if and only if

\[
\boxed{
r_u=r_e,
\qquad
r_\nu=r_d.
}
\]

These are crossed degeneracy conditions. Generic Standard-Model Yukawa or infrared response coefficients do not satisfy them.

Therefore the continuous flow has three possible physical statuses:

1. an exact symmetry at a matched or unbroken scale;
2. a localized boundary/mediator evolution rather than a bulk symmetry;
3. a spurionic covariance in which the response kernel transforms with the flow.

It cannot be declared an exact low-energy global symmetry merely from the algebra.

## 6. Gauge and charge caution

The four entries are Higgs-dressed response composites, not bare fermion fields. At response level the map is well-defined and the aggregate sector is neutral enough to carry the algebraic intertwiner.

But \(F_C\) exchanges up-type response with electron response and neutrino response with down-type response. A microscopic continuous version is leptoquark-like. It must answer:

- how color is contracted or transported;
- whether baryon and lepton numbers are preserved, violated or emergent;
- which Higgs insertions make the operator gauge invariant;
- whether proton-decay operators are induced;
- whether the generator acts on bosonic response composites or on fundamental CAR fields;
- what mass scale suppresses the mixing.

The algebraic response flow does not answer these questions.

## 7. What has closed and what remains

Closed exactly:

- the source generator \(G_{\rm src}=F_Cp\);
- skew-adjointness and square \(-I\);
- its full orthogonal one-parameter group;
- reduction to the aggregate root;
- descent to \(e^{t\varepsilon}\);
- realification to \(I\otimes\varepsilon\);
- ten-dimensional \(\mathfrak{sp}_4\) closure with the other two seeds.

Still open:

- a microscopic action coefficient multiplying the generator;
- gauge/Lorentz/CAR realization;
- whether it is a symmetry, boundary pulse or spurionic connection;
- compatibility with observed lepton/quark mass splitting;
- phenomenological bounds on any leptoquark-like mediator.

## 8. Stop-everything tests and falsifiers

**Action trigger:** derive a Hermitian or real Hamiltonian boundary term whose equations of motion give \(\dot z=G_{\rm src}z\). The full physical \(Sp(4,\mathbb R)\) closure then has all three continuous source flows.

**Gauge-completion trigger:** write the operator before symmetry breaking with explicit weak, color, Lorentz and Higgs contractions and show that it descends to \(F_Cp\).

**Boundary-pulse trigger:** a localized mediator produces integrated angle \(\int g(t)dt\) without requiring crossed bulk degeneracy.

**Bulk-symmetry falsifier:** generic unequal coefficients are claimed to be invariant under the flow; exact invariance requires \(r_u=r_e\) and \(r_\nu=r_d\).

**Charge falsifier:** the proposed microscopic current mixes quarks and leptons without a charge-carrying mediator or explicit charge violation.

**CAR warning:** a rotation of bosonic response amplitudes is promoted directly to a canonical transformation of fundamental fermions without checking anticommutators.

## Verdict

| Question | Verdict |
|---|---|
| Does the source response algebra contain the missing linear generator? | **Yes: \(F_Cp\)** |
| Is it skew-adjoint and continuously exponentiable? | **Yes** |
| Does its full flow descend to \(e^{t\varepsilon}\)? | **Yes, exactly** |
| Is the aggregate sector reducing for the flow? | **Yes** |
| Does this close the algebraic three-flow route to \(\mathfrak{sp}_4\)? | **Yes** |
| Is it an exact generic low-energy symmetry? | **No; crossed degeneracy would be required** |
| Is its microscopic action derived? | **No** |

## Position in the corpus

- [four-channel exact response intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
- [weighted-root broken-phase stability](1003_the_exact_furey_response_root_has_a_weighted_circle_of_covariant_aggregates_but_a_fixed_symmetric_root_requires_unbroken_channel_degeneracy.md)
- [three-generator full \(\mathfrak{sp}_4\) closure](1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md)
