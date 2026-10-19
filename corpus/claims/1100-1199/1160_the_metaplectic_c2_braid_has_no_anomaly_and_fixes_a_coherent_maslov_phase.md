# The Metaplectic \(C_2\) Braid Has No Anomaly and Fixes a Coherent Maslov Phase

**Date:** 19 October 2026  
**Branches:** metaplectic coherence, Hermite realization, Maslov phase, full Fourier composite, arithmetic covariance  
**Claim status:** exact in the declared Schrödinger convention; arithmetic Eisenstein normalization remains open

## Executive result

The possible metaplectic obstruction left open in document 1159 can be resolved explicitly.

Let \(\mathcal F_j\) be the unitary Fourier transform in channel \(j\), normalized on Hermite states by

\[
\mathcal F_j h_n=(-i)^n h_n.
\]

Let \(\Pi\) exchange the two channels. A coherent pair of metaplectic lifts of the physical simple-reflection matrices is

\[
\widetilde P=i\Pi,
\qquad
\widetilde S=e^{-i\pi/4}\mathcal F_2.
\]

Then

\[
\boxed{
\widetilde P\widetilde S\widetilde P\widetilde S
=
\widetilde S\widetilde P\widetilde S\widetilde P
=i\mathcal F_1\mathcal F_2.
}
\]

Thus:

1. the \(C_2\) braid closes exactly in the metaplectic representation;
2. there is no residual braid sign;
3. the longest-word operator is the full Fourier transform with a fixed Maslov phase in this convention;
4. changing either simple lift by the central sign cannot change the result, because each lift occurs twice in either braid word.

The earlier phrase “possible metaplectic braid anomaly” can therefore be retired for this gate set. The metaplectic phase is real structure, but it is coherent rather than obstructive.

## 1. Why phases appear

A symplectic matrix acts on the canonical observables \((q,p)\). Its quantum implementation acts on wavefunctions and belongs to the metaplectic double cover

\[
Mp(4,\mathbb R)\longrightarrow Sp(4,\mathbb R).
\]

Every symplectic matrix has two metaplectic lifts, differing by the central sign. In addition, a bare Fourier integral operator often differs from the metaplectic lift selected by a continuous oscillator path by a dimension-dependent phase.

For a one-dimensional quarter rotation, harmonic-oscillator evolution gives

\[
e^{-i(\pi/2)(N+1/2)}
=e^{-i\pi/4}\mathcal F.
\]

This is the origin of the factor \(e^{-i\pi/4}\) in \(\widetilde S\). It is not an arbitrary physical amplitude; it records the lift of the classical quarter-turn path.

For the channel exchange, the coordinate permutation has determinant \(-1\). In the standard linear-change generator of the metaplectic group, a compatible lift is

\[
\widetilde P=i\Pi,
\]

with the alternative lift \(-i\Pi\).

## 2. Exact calculation on the Hermite basis

Write

\[
|m,n\rangle=h_m(q_1)h_n(q_2).
\]

The two lifts act as

\[
\widetilde P|m,n\rangle=i|n,m\rangle,
\]

\[
\widetilde S|m,n\rangle
=e^{-i\pi/4}(-i)^n|m,n\rangle.
\]

Since channel exchange conjugates the second-channel Fourier transform into the first,

\[
\Pi\mathcal F_2\Pi=\mathcal F_1,
\]

we find

\[
\begin{aligned}
\widetilde P\widetilde S\widetilde P\widetilde S
&=i^2 e^{-i\pi/2}
  \Pi\mathcal F_2\Pi\mathcal F_2\\
&=i\mathcal F_1\mathcal F_2.
\end{aligned}
\]

Similarly,

\[
\widetilde S\widetilde P\widetilde S\widetilde P
=i\mathcal F_2\mathcal F_1
=i\mathcal F_1\mathcal F_2.
\]

There is no appeal here to equality only up to phase. The operators are literally equal in the declared convention.

## 3. The sign ambiguity cancels structurally

Replace the simple lifts by

\[
\widetilde P' =\epsilon_P\widetilde P,
\qquad
\widetilde S' =\epsilon_S\widetilde S,
\qquad
\epsilon_P,\epsilon_S\in\{\pm1\}.
\]

Either four-letter braid word receives the same multiplier

\[
\epsilon_P^2\epsilon_S^2=1.
\]

Consequently the exact braid and its common value are independent of the two choices of sheet.

This is stronger than exhibiting one fortunate phase convention. It proves that the double-cover sign ambiguity cannot create a braid anomaly in this even \(C_2\) relation.

## 4. What the Maslov phase means

The common classical transformation is the full Fourier matrix \(J_4\). Its quantum lift here is

\[
\widetilde J_4=i\mathcal F_1\mathcal F_2.
\]

The factor \(i\) is the accumulated Maslov phase of this chosen pair of generating paths. Another global convention can represent the same lift with superficially different Fourier phases, but all measurable comparisons must transport that convention coherently.

The correct conclusion is therefore neither “the phase is arbitrary” nor “the phase is a new force.” It is:

\[
\boxed{
\text{the phase is path/lift data required for coherent quantum composition.}
}
\]

## 5. The order-doubling survives quantization

Set

\[
\widetilde C=\widetilde P\widetilde S.
\]

Then

\[
\widetilde C^2=i\mathcal F_1\mathcal F_2.
\]

Since \(\mathcal F_j^2=\mathcal P_j\), where \(\mathcal P_j\) is parity in channel \(j\),

\[
\widetilde C^4
=-\mathcal P_1\mathcal P_2.
\]

This is one of the two lifts of the classical central element \(-I_4\). Hence

\[
\widetilde C^8=I.
\]

The hierarchy is now explicit:

\[
\begin{array}{c|c}
\text{level}&\text{Coxeter behavior}\\ \hline
W(C_2)&C^4=1\\
Sp(4,\mathbb R)&C^4=-I_4,\ C^8=I_4\\
Mp(4,\mathbb R)&\widetilde C^4=-\mathcal P_1\mathcal P_2,\ \widetilde C^8=I
\end{array}
\]

The successive descriptions do not contradict one another. Each retains information forgotten by the quotient below it.

## 6. Relation to the “one carrier, two faces, three relationships” picture

The calculation gives a precise version of one part of the earlier intuition:

- the carrier is the two-channel Schrödinger/Jordan phase-space realization;
- the two elementary faces are exchange and controlled source–response rotation;
- their alternating relationship closes only after four crossings;
- the common closure is not identity but the full source–response interchange;
- iterating again exposes the central orientation/parity layer.

This does not by itself derive three as a fundamental arity. It does show that the relationship between two noncommuting face operations creates a third, global operation that is not visible in either generator alone:

\[
\text{exchange}+\text{controlled Fourier}
\longrightarrow
\text{full Fourier closure}.
\]

That is a valid compositional “third,” not a claim that the number three has been independently selected by the metaplectic group.

## 7. Consequence for vector-valued automorphic covariance

Let \(\Psi(Z)\) be a response-state section rather than a scalar function. The finite gate covariance can now be posed as

\[
\Psi(P\cdot Z)=\rho(\widetilde P)\Psi(Z),
\qquad
\Psi(S\cdot Z)=\rho(\widetilde S)\Psi(Z),
\]

where \(\rho\) is a metaplectic or Weil representation.

Consistency requires

\[
\rho(\widetilde P)\rho(\widetilde S)
\rho(\widetilde P)\rho(\widetilde S)
=
\rho(\widetilde S)\rho(\widetilde P)
\rho(\widetilde S)\rho(\widetilde P).
\]

The present result proves this finite relation for the continuous Schrödinger realization. It therefore removes one obstruction to treating different physical polarizations as components of one covariant object rather than identifying them by a scalar quotient.

## 8. What this does not derive

The result does **not** yet provide:

1. a physical derivation of the integral lattice or the quotient/sum over markings;
2. a finite-level Weil representation attached to a declared discriminant module;
3. an Eisenstein series or its constant term;
4. root-local completed-zeta ratios;
5. a map from the automorphic spectral parameter to physical frequency;
6. a Schur/Herglotz theorem for the normalized scattering matrix;
7. a Standard-Model coupling that excites the required two-channel metaplectic interface.

Most importantly, the Maslov phase is frequency independent. It cannot impersonate the completed-zeta normalization. The latter must arise from summing arithmetic images or from a cusp constant-term calculation.

## 9. New stopping rule

The metaplectic branch should now stop unless one of two more specific constructions is supplied:

### Route A — finite Weil realization

Choose the already identified integral symplectic lattice, reduce it modulo a physically justified level \(N\), and construct the resulting vector-valued Weil action. Test whether the physical labels are compatible with that action.

### Route B — arithmetic cusp sum

Build a seed response in one polarization, sum it over the relevant parabolic cosets, and compute the constant term. If the calculation produces the expected root-local completed-zeta ratios, the arithmetic normalization becomes derived rather than imported.

Without A or B, further discussion of metaplectic phases merely changes convention and does not advance the physics.

## 10. Falsifiers

This branch fails or must be revised if:

- the proposed physical channel exchange cannot be coherently quantized with the controlled oscillator;
- physical superselection forbids superpositions across the exchanged channels;
- the relevant Hilbert space does not admit the required canonical commutation representation;
- the matter-derived lattice is incompatible with the metaplectic/Weil action;
- the arithmetic coset sum produces scalar factors inconsistent with the \(C_2\) root sequence;
- the resulting normalized response violates the declared causality/passivity domain.

## 11. Computational verification

The companion script

[`verification/verify/verify_metaplectic_c2_braid_on_hermite_basis.mjs`](../../../verification/verify/verify_metaplectic_c2_braid_on_hermite_basis.mjs)

encodes phases as powers of \(e^{i\pi/4}\) and verifies on 144 Hermite pairs that

\[
\widetilde P\widetilde S\widetilde P\widetilde S
=
\widetilde S\widetilde P\widetilde S\widetilde P
=i\mathcal F_1\mathcal F_2,
\]

that the fourth Coxeter power is minus full parity, and that the eighth is identity.

## Conclusion

The metaplectic gate is now closed positively:

\[
\boxed{
\text{no braid anomaly; coherent Maslov phase; exact order-eight carrier cycle.}
}
\]

This is a genuine advance because it removes an ambiguity rather than renaming it. The frontier moves outward: from continuous metaplectic coherence to a finite Weil representation or an explicit arithmetic parabolic-coset sum. Only that next construction can generate the frequency-dependent zeta normalization.
