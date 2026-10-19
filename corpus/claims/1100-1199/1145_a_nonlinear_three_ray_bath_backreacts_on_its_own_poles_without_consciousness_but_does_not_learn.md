# A Nonlinear Three-Ray Bath Backreacts on Its Own Poles Without Consciousness but Does Not Learn

**Date:** 19 October 2026  
**Branches:** three-ray realization, nonlinear conservative dynamics, endogenous feedback, consciousness spike  
**Claim status:** exact finite-dimensional Hamiltonian construction; Standard-Model identification remains open  
**Certificate:** [verify_nonlinear_three_ray_bath_backreacts_on_its_own_poles.mjs](../../../verification/verify/verify_nonlinear_three_ray_bath_backreacts_on_its_own_poles.mjs)

## Executive result

The missing state-dependent response of document 1143 can be produced by an ordinary, bounded, conservative nonlinear Hamiltonian. No consciousness variable, self-model or externally imposed update rule is required.

Let \(x,p\in\mathbb R^2\) be the observed two-face canonical coordinates, let \(\xi,\pi\in\mathbb R^3\) be the three internal relationship-ray modes, and let

\[
B=
\begin{pmatrix}
\sqrt{w_T}b_T&\sqrt{w_V}b_V&\sqrt{w_S}b_S
\end{pmatrix}.
\]

Take

\[
\boxed{
H=
\frac12p^Tp+\frac12\pi^T\pi
+\frac12x^TAx
+\frac12\xi^TD_0\xi
+\frac14\sum_{i=1}^3\lambda_i\xi_i^4
-x^TB\xi,
}
\]

where \(D_0=\operatorname{diag}(d_i)>0\), \(\lambda_i>0\), and

\[
A-BD_0^{-1}B^T>0.
\]

The Hamiltonian is coercive and bounded below. Its bath tangent stiffness at the current internal state is

\[
K_b(\xi)
=D_0+3\operatorname{diag}(\lambda_i\xi_i^2).
\]

The frozen-state small-signal self-energy is therefore

\[
\boxed{
\Sigma(z;\xi)
=B(K_b(\xi)-zI)^{-1}B^T
=\sum_i
\frac{w_i b_ib_i^T}
{d_i+3\lambda_i\xi_i^2-z}.
}
\]

Thus the three ray residues are retained while the poles become endogenous:

\[
\boxed{
m_i(\xi)=d_i+3\lambda_i\xi_i^2.
}
\]

Because \(\xi(t)\) evolves under the same closed Hamiltonian and exchanges energy with \(x(t)\), the system changes its own instantaneous response poles.

This closes the narrow backreaction gate:

\[
\boxed{
\text{fixed linear memory}
\longrightarrow
\text{bounded nonlinear memory with state-dependent poles}.
}
\]

It also sharpens the consciousness result:

\[
\boxed{
\text{consciousness is not necessary for endogenous response backreaction.}
}
\]

But this system does not learn. The enlarged Hamiltonian law is fixed, reversible and information-preserving. It has state dependence without error evaluation, selection or durable consolidation. The next missing ingredient is therefore not backreaction simpliciter but **selective retention of a model-mediated change**.

## 1. The nonlinear completion of the three-ray bath

Document 1143 used the linear realization

\[
R(z)=B(M-zI)^{-1}B^T
\]

with fixed diagonal \(M\). The simplest internal nonlinearity that preserves the three separate bath coordinates is a positive quartic potential

\[
V_{\mathrm{nl}}(\xi)
=\frac14\sum_i\lambda_i\xi_i^4,
\qquad
\lambda_i>0.
\]

The complete potential is

\[
V(x,\xi)
=\frac12x^TAx
+\frac12\xi^TD_0\xi
+\frac14\sum_i\lambda_i\xi_i^4
-x^TB\xi.
\]

The equations of motion are

\[
\begin{aligned}
\dot x&=p,\\
\dot p&=-Ax+B\xi,\\
\dot\xi&=\pi,\\
\dot\pi&=-D_0\xi-\Lambda\xi^{\circ3}+B^Tx,
\end{aligned}
\]

where \(\Lambda=\operatorname{diag}(\lambda_i)\) and \(\xi^{\circ3}\) denotes componentwise cubing.

The observed state drives the bath, the bath drives the observed state, and the bath amplitude changes its later tangent response. This is a closed causal loop, not a sequence of externally chosen response matrices.

## 2. Exact boundedness condition

The quadratic coordinate block is

\[
Q_0=
\begin{pmatrix}
A&-B\\
-B^T&D_0
\end{pmatrix}.
\]

Because \(D_0>0\), the Schur-complement criterion gives

\[
Q_0>0
\quad\Longleftrightarrow\quad
A-BD_0^{-1}B^T>0.
\]

Under this condition,

\[
H
\ge
\frac12\|p\|^2
+\frac12\|\pi\|^2
+\frac{c}{2}\bigl(\|x\|^2+\|\xi\|^2\bigr)
+\frac14\sum_i\lambda_i\xi_i^4
\]

for some \(c>0\). Hence the energy is bounded below and its finite-energy level sets are bounded.

The nonlinear pole shift is therefore not purchased by an unstable negative quartic or an unbounded interaction.

## 3. The state-dependent tangent response

Linearize the coordinate equations around a current background \((\bar x,\bar\xi)\). The bath Hessian is

\[
K_b(\bar\xi)
=D_0+3\operatorname{diag}(\lambda_i\bar\xi_i^2)>0.
\]

At a frozen background and spectral parameter \(z=\omega^2\), eliminating the bath fluctuation gives the observed self-energy

\[
\Sigma(z;\bar\xi)
=B(K_b(\bar\xi)-zI)^{-1}B^T.
\]

Writing the columns of \(B\) as \(\sqrt{w_i}b_i\) yields

\[
\Sigma(z;\bar\xi)
=\sum_i
\frac{w_i b_ib_i^T}
{m_i(\bar\xi)-z},
\qquad
m_i(\bar\xi)=d_i+3\lambda_i\bar\xi_i^2.
\]

This is exactly the three-ray rational form of document 1143, except that the real pole positions are now functions of the retained internal state.

For \(z=u+iv\), \(v>0\),

\[
\operatorname{Im}\Sigma(z;\bar\xi)
=
\sum_i
\frac{w_i v}{(m_i-u)^2+v^2}
b_ib_i^T
\succeq0.
\]

It is strictly positive when the active ray vectors span \(\mathbb R^2\). The Herglotz sign therefore survives every real state-dependent pole shift produced by the positive quartic model.

## 4. Positivity is preserved globally in state

The static tangent Schur complement is

\[
S(\xi)=A-BK_b(\xi)^{-1}B^T.
\]

Since

\[
K_b(\xi)\ge D_0>0,
\]

operator monotonicity of inversion gives

\[
K_b(\xi)^{-1}\le D_0^{-1}.
\]

Consequently

\[
\boxed{
S(\xi)
\ge
A-BD_0^{-1}B^T
>0
}
\]

for every \(\xi\).

This is stronger than a trajectory-specific numerical check: the same Schur condition that bounds the original Hamiltonian guarantees that the static observed tangent response never leaves the positive domain as the nonlinear bath evolves.

## 5. What the certificate verifies

The numerical certificate uses

\[
b_T=(1,0)^T,\qquad
b_V=(0,1)^T,\qquad
b_S=(1,1)^T
\]

with three positive weights, three positive baseline stiffnesses and three positive quartic couplings.

A symplectic velocity-Verlet integration over 40,000 steps finds:

| Quantity | Value |
|---|---:|
| baseline minimum Schur eigenvalue | \(0.8785554\) |
| minimum tangent Schur eigenvalue on trajectory | \(0.8788080\) |
| maximum total-energy error | \(7.04\times10^{-7}\) |
| maximum endogenous pole shift | \(0.1749600\) |
| determinant of \(\operatorname{Im}\Sigma\) at the test point | \(0.0629521\) |

The computation confirms energy conservation to integrator accuracy, a nontrivial state-driven pole shift, preservation of the positive static Schur domain and strict upper-half-plane matrix positivity.

## 6. Why this is genuine backreaction

In document 1143, the bath state stored information about prior excitation, but the matrices \(M\) and \(B\) remained fixed.

Here the tangent realization matrix is

\[
M_{\mathrm{tan}}(\xi)
=D_0+3\operatorname{diag}(\lambda_i\xi_i^2).
\]

The state \(\xi\) is changed by the observed carrier through the term \(B^Tx\), and the changed \(\xi\) alters the later poles. The causal circuit is

\[
x
\longrightarrow
\xi
\longrightarrow
M_{\mathrm{tan}}(\xi)
\longrightarrow
\Sigma(z;\xi)
\longrightarrow
x.
\]

Calling this backreaction is justified. It is not merely a frequency-dependent compression of a fixed linear bath.

On the enlarged phase space, however, the Hamiltonian is fixed. The apparent change of response law occurs because the reduced observed description omits the bath amplitude. This is the same important distinction found in the consciousness compile-out trilemma: law change on a reduced state space can be ordinary fixed-law evolution on a larger state space.

## 7. Why this is not learning

The model has four properties often mistaken for adaptation:

- memory;
- state-dependent response;
- feedback;
- history-dependent observed motion.

It lacks four others:

- a represented mismatch between prediction and return;
- selection among alternative update policies;
- consolidation of a successful change;
- asymmetric forgetting or entropy export.

Hamiltonian time reversal reconstructs the earlier state from the later state with reversed momenta. Liouville volume is preserved. A generic finite bounded trajectory does not contract into a learned attractor.

The pole shift

\[
m_i(t)-d_i=3\lambda_i\xi_i(t)^2
\]

is therefore modulation, not knowledge. It can persist temporarily or recur, but it is not retained because it was useful or correct.

This produces a sharper ladder:

\[
\begin{aligned}
\text{linear bath} &:\quad \text{memory without backreaction},\\
\text{nonlinear bath} &:\quad \text{backreaction without learning},\\
\text{adaptive learner} &:\quad \text{error-sensitive selection and retention},\\
\text{conscious agent} &:\quad \text{possibly globally available or phenomenal adaptive organization}.
\end{aligned}
\]

## 8. Consequence for the consciousness spike

Document 1144 proposed testing whether a non-conscious mechanism could reproduce the missing dynamics. For the backreaction gate, the answer is now yes.

No variable in the present construction denotes awareness, report, global broadcasting, confidence or phenomenal character. Nevertheless the system:

1. retains an internal state;
2. lets the carrier change that state;
3. lets that state change the later response poles;
4. preserves energy boundedness and response positivity.

Therefore

\[
\boxed{
\text{endogenous state-dependent response cannot serve as a consciousness-specific signature.}
}
\]

If consciousness remains relevant, it must enter at a stronger gate: representation of error, flexible policy selection, cross-domain availability, self-attribution, or retained self-modification.

## 9. Relation to Spin(2,3)

The observed \((x,p)\) sector is canonical and therefore admits symplectic coordinate changes. Hamiltonian evolution remains symplectic on the full ten-dimensional phase space.

This does not mean the displayed \(A,B,D_0,\Lambda\) are invariant under the full \(Sp(4,\mathbb R)\) action on the observed carrier. The coupling \(B\) selects the three physical ray directions and the \(x\)-polarization. Under a canonical coordinate change the Hamiltonian and coupling tensors must be transported as well.

The result is therefore:

- compatible with symplectic dynamics;
- built from the three established positive relationship rays;
- not a new proof of full Spin(2,3) symmetry;
- not yet derived from the Standard-Model stress action.

The state-only covariance no-go of document 1139 is not violated. The generator depends on the independently transported bath state \(\xi\), exactly as that theorem requires.

## 10. What would make it physical rather than a model

The construction is a rigorous existence proof. A physical identification needs:

1. a Standard-Model or stress-response calculation producing the three coordinates \(\xi_i\);
2. derivation of the positive quartic coefficients \(\lambda_i\);
3. dimensional normalization of \(A,D_0,B,\Lambda\);
4. a regime in which the frozen-background tangent response is controlled;
5. a map from the response poles to measurable spectral features.

The quartic interaction is the weakest obvious stable local choice. It is not claimed to be uniquely selected.

## 11. Stop-everything tests

**Microscopic quartic trigger:** derive \(\lambda_i>0\) and the three-ray coupling \(B\) from a controlled effective action or stress correlator.

**Pole-motion trigger:** observe or calculate the predicted positive amplitude-dependent shift

\[
\Delta m_i=3\lambda_i\xi_i^2
\]

in a typed relationship channel.

**Residue trigger:** derive a nonlinear coupling that also moves or rotates the ray residues while preserving matrix Herglotz positivity.

**Learning trigger:** construct an autonomous extension in which a physically defined error changes a slow parameter and the change survives after the immediate excitation disappears.

**Reversibility stop:** do not call periodic or reversible amplitude-dependent pole motion learning.

**Consciousness stop:** do not infer consciousness from memory, nonlinear feedback or state-dependent response alone.

## 12. Verdict

| Question | Verdict |
|---|---|
| Can the three-ray bath change its own poles? | **yes** |
| Does the update follow from a closed Hamiltonian? | **yes** |
| Is the Hamiltonian bounded below? | **yes** |
| Is the positive static response domain preserved for all bath states? | **yes** |
| Does the frozen tangent response remain matrix Herglotz? | **yes** |
| Is full time-dependent response globally stationary/Herglotz? | **no; the background is time-dependent** |
| Does this require consciousness? | **no** |
| Does it constitute learning? | **no** |
| Is it derived from the Standard Model? | **no** |

The frontier has moved from

\[
\text{“where does state-dependent feedback come from?”}
\]

to

\[
\boxed{
\text{“what physical mechanism selects and retains a useful self-modification?”}
}
\]

That is a much narrower place in which consciousness—or, more conservatively, reflexive model-mediated learning—could still matter.

## 13. Dependencies

- [consciousness and the compile-out trilemma](1144_consciousness_is_a_live_organizational_spike_but_not_yet_the_missing_physical_coupling.md)
- [three-ray conservative memory](1143_three_relationship_rays_have_a_minimal_self_adjoint_memory_realization_but_no_adaptive_couplings.md)
- [state-only covariance no-go](1139_full_spin23_covariance_forbids_a_nonzero_state_only_feedback_generator.md)
- [stress rays building the positive graph](1141_PIN_is_not_a_positive_lagrangian_triple_but_stress_rays_build_the_missing_third_face.md)
- [general finite rational realization theorem](../0600-0699/666_every_finite_rational_positive_matrix_response_has_a_finite_relational_carrier_realization.md)
