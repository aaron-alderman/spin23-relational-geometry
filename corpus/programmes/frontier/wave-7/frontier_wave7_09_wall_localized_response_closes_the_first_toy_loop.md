# Frontier Wave 7.9: A Wall-Localized Response Closes the First Toy Loop

**Date:** 24 October 2026  
**Status:** exact solvable toy closure; microscopic naturalness and oriented holonomy remain open

## Result

The first complete local feedback loop can be written and solved without identifying unrelated carriers. A metastable record forms a wall, the wall localizes a probe, the localized response supplies a second projector (Y), and integrating out a gapped fluctuation generates a strictly positive Hessian for the present projector (P).

The construction closes

\[
P\longrightarrow b(x)
\longrightarrow \text{localized carrier}
\longrightarrow Y
\longrightarrow \Gamma_{\rm probe}[P;Y]
\longrightarrow P'.
\]

It is deliberately minimal. Its purpose is to establish that the cycle is mathematically possible and to expose exactly which parts remain inserted rather than derived.

## 1. The wall localizes a mode

Use the kink from [wave 7.8](frontier_wave7_08_when_memory_becomes_a_wall_and_changes_topology.md),

\[
b(x)=v\tanh(x/\delta),
\]

as the mass of a one-dimensional Dirac operator

\[
H_b=-i\sigma_2\partial_x+b(x)\sigma_1.
\]

At zero energy, multiplication by (i\sigma_2) gives

\[
\partial_x\psi+b(x)\sigma_3\psi=0.
\]

For (sigma_3u_+=u_+),

\[
\boxed{
\psi_0(x)=N\operatorname{sech}^{v\delta}(x/\delta)u_+
}
\]

is normalizable and obeys (H_b\psi_0=0). Reversing the wall reverses the selected (sigma_3) eigenspace. Thus the spatial history record produces a localized response carrier with a boundary-conditioned internal projector (Y).

This is a mode-existence statement. Topology alone still does not determine every coupling or continuous orientation carried by (Y).

## 2. The localized response generates a selector Hessian

Let (P) and (Y) be real rank-one projectors on a two-dimensional response face. Integrate out a real Gaussian fluctuation (z) with positive kernel

\[
A(P,Y)=m^2I+g(P-Y)^2,
\qquad m^2>0,quad g>0.
\]

The probe contribution to the effective action is

\[
\Gamma_{\rm probe}(P;Y)
=\frac12\log\det A(P,Y).
\]

If the angle between the two projective lines is (	heta), then the exact two-dimensional identity

\[
(P-Y)^2=\sin^2\theta,I
\]

gives

\[
\boxed{
\Gamma_{\rm probe}(\theta)
=\log\!\left(m^2+g\sin^2\theta\right).
}
\]

The aligned branch is stationary and has

\[
\boxed{
\Gamma_{\rm probe}''(0)=\frac{2g}{m^2}>0.
}
\]

The wall-conditioned response therefore lifts the neutral common projector direction that survived the two-rail model. It does so through an ordinary fluctuation determinant, not by appending a desired projector to the return rule.

## 3. The induced return map contracts

For one gradient-response step,

\[
\theta_{n+1}
=\theta_n-\alpha\,\partial_\theta\Gamma_{\rm probe}(\theta_n),
\]

the tangent multiplier at alignment is

\[
\rho
=1-\frac{2\alpha g}{m^2}.
\]

Hence

\[
\boxed{
0<\frac{\alpha g}{m^2}<1
\quad\Longrightarrow\quad
|\rho|<1.
}
\]

This supplies all three local closure ingredients: a fixed point, a positive Hessian and a contractive return map.

## 4. Why the extra datum is genuine

If the response projector is erased or regenerated as (Y=P), then

\[
A(P,P)=m^2I,
\qquad
\Gamma_{\rm probe}(P;P)=2\log m,
\]

which is constant over the projector orbit. The selector Hessian vanishes and the projector-only no-go returns.

Likewise, a pure topological sector that records only that a wall mode exists but forgets its embedding cannot evaluate ((P-Y)^2). The feedback comes from the **localized non-topological response data**, while topology protects or organizes the carrier on which that data lives.

This is precisely the layered structure anticipated by the corpus:

\[
\text{protected existence/count}
\quad+\quad
\text{gapped embedding-sensitive memory}.
\]

## 5. What this model does not close

The determinant is even:

\[
\Gamma_{\rm probe}(\theta)=\Gamma_{\rm probe}(-\theta).
\]

It selects a projective line but cannot distinguish an oriented lift, loop direction or (J) from (J^{-1}). The quarter-turn sign still requires a coherent phase-sensitive channel.

Nor has the model derived:

- the coupling (g(P-Y)^2) from a Standard Model, Casimir, thermoelectric or exceptional carrier;
- the wall's bias from the same projector whose return is being calculated;
- the dimensional map from this one-dimensional wall normal to a physical (2+1)-dimensional defect;
- radiative stability of the selected coupling;
- a nonzero observable surviving detector folding.

It is therefore a closure proof-of-principle, not a new fundamental interaction.

## 6. The new naturalness gate

The next question is no longer “can topology feed selection?” It can, conditionally. The sharper question is:

> Does an independently motivated microscopic action generate an embedding-sensitive wall response whose determinant has the required sign and magnitude, without inserting the target projector or an equivalent spurion?

The sign matters. A kernel with the opposite effective coefficient would make alignment unstable and select the orthogonal branch. A response independent of (Y) would leave the orbit neutral. A detector that sees only the wall-mode count would miss the selection coordinate entirely.

## 7. Immediate experimental translation

The toy model requires only measurable objects:

1. prepare two wall histories with the same bulk controls;
2. identify a localized mode and reconstruct its response projector (Y);
3. sweep the controllable projector (P(	heta));
4. fit the mode free-energy or susceptibility shift to
   (log(m^2+g\sin^2\theta));
5. measure the return slope and compare it with
   (1-2\alpha g/m^2);
6. reverse the wall and test which data reverse, remain projective or disappear under incoherent detection.

Ordinary defect-mode hybridization is the conventional explanation. New physics is not implicated unless the calibrated microscopic couplings, detector chain and standard symmetry-allowed terms fail to account for the observed kernel.

## Certificate

The companion [wall-localized response certificate](../../../../verification/verify/verify_wall_localized_response_selector_closure.mjs) verifies the Dirac zero mode, the projector-square identity, the exact determinant, the positive Hessian, the contractive return multiplier and the orientation blindness.

