# Frontier Wave 7.6: Selection, Rotation and Memory Are Three Different Arrows

**Date:** 24 October 2026  
**Status:** exact corpus synthesis; common microscopic realization remains open

## The resolved grammar

Three mechanisms that repeatedly appeared together in the corpus are now mathematically separable:

\[
\boxed{
\begin{array}{rcl}
\text{selection} &:& x_{n+1}=PQx_n\ \text{or}\ P_{n+1}=\mathcal R(P_n;Y),\\
\text{rotation} &:& \dot U=-[P,\dot P]\,U,\\
\text{memory} &:& K(t)=A_{vh}e^{A_{hh}t}A_{hv}.
\end{array}}
\]

They can coexist in one apparatus, but none implies the others.

## Selection

Selection reduces a fixed manifold through transverse constraints or an independently supplied datum. Alternating projection contracts toward

\[
\operatorname{Ran}P\cap\operatorname{Ran}Q.
\]

The corpus's three-mode return map

\[
\mathcal R_{a,b}(P;Y)=\Pi_{\max}(aP+bY)
\]

has unique fixed point \(Y\) and tangent multiplier

\[
\rho(D\mathcal R_Y)=\frac{a}{a+b}.
\]

Selection is a statement about fixed sets and transverse contraction.

## Rotation

For a differentiable projector family, the universal connection

\[
C_P=[P,dP]
\]

parallel-transports its image and complement. The three-mode latitude in [the existing exact model](../../admissibility/admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md) satisfies

\[
P(2\pi)=P(0),
\qquad
U_Q(2\pi)=J.
\]

The observable subspace returns while the coherent doublet frame undergoes a quarter turn. Reversing the loop reverses the turn. Rotation is therefore a statement about lifted frame transport, not contraction.

## Memory

Memory appears when eliminated degrees of freedom feed back:

\[
\dot v(t)=A_{vv}v(t)
+A_{vh}e^{A_{hh}t}h(0)
+\int_0^tK(t-s)v(s)\,ds.
\]

It can exist with no loop and no selected fixed point. Conversely, dark modes can be exactly invariant and produce no retained memory kernel. Memory is a statement about dynamical closure.

## The minimal combined machine

\[
\begin{array}{c}
\text{moving control/projector loop}\\
\downarrow\ [P,dP]\\
\text{coherent frame holonomy}\\
\downarrow\ \text{independent datum }Y\\
\text{contractive return map}\\
\downarrow\ \text{unresolved modes}\\
\text{effective memory kernel}.
\end{array}
\]

Hidden-state memory can alter the return map; selected structure can change the next loop; and holonomy can alter the fluctuation spectrum. That feedback is the still-open reflexive closure.

## Relation to spontaneous symmetry breaking

- The degenerate minimum manifold is the fixed/admissible surface.
- A transverse datum or holonomy-induced gap selects a smaller subset.
- Tangent directions left flat are massless modes.
- Explicitly lifted tangents are pseudo-Goldstone modes.
- Motion along the selected bundle carries connection and holonomy.
- Eliminated massive directions generate memory/self-energy corrections.

Spontaneous breaking requires an invariant action with degenerate vacua and a state selecting one representative. Alternating projection alone is optimization, not spontaneous breaking. Holonomy-induced spectral selection remains explicit/global unless the holonomy is generated self-consistently by the selected state.

## The reflexive equation

\[
\boxed{
P
=
\Pi_{\min}\!\left(
\operatorname{Hol}[P],
K_P,
Y_P
\right).
}
\]

Closure requires a well-defined return map, a fixed point, transverse spectral radius below one, causal and thermodynamic consistency, detector robustness and a source-native carrier. The corpus has exact separate realizations of the first ingredients, but not one microscopic action generating all of them.

The recurrent “spin, spin, spin” is therefore a cycle:

\[
\text{restrict}
\longrightarrow
\text{transport}
\longrightarrow
\text{eliminate}
\longrightarrow
\text{return}.
\]

The meaningful invariant is the typed composition of those arrows and the defect when the cycle fails to close.
