# Stationary nonzero spectral background and coupled response

**Date:** 8 November 2026  
**Status:** bounded source audit and supplied stationary matrix/gauge comparison; no physical finite-period vacuum selected  
**Parent:** [full spectral kernel and pattern gate](FULL_SPECTRAL_KERNEL_AND_PATTERN_GATE.md)  
**Evidence:** [stationary background calculation](../../../evidence/data/stationary-spectral-background-v1.json)  
**Certificate:** [matrix and massive-bubble verifier](../../../verification/verify/verify_stationary_spectral_background.py)

The intended physical setup is a photon-supporting medium whose stable background spontaneously develops a measurable spatial period. A nonzero expectation value alone is insufficient: the complete allowed fluctuations must prefer finite wave number, the resulting periodic branch must saturate, and a calibrated electromagnetic probe must detect the predicted response. The aether premise remains hypothetical, with Michelson–Morley set aside for this calculation.

## 1. Source-native candidates still stop before the requested vacuum

[Claim 1632](../../claims/1600-1699/1632_a_finite_spectral_triple_can_couple_to_spin23_geometry_but_the_action_vacuum_and_spectrum_are_missing.md) explicitly identifies the missing finite triple, fluctuated Dirac operator, covariant action, stationary vacuum, healthy Hessian/residue spectrum and RG matching. The route is admissible; its physical model is not supplied.

[Claim 1567](../../claims/1500-1599/1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md) establishes a simultaneous nonzero singlet minimum in a reduced quartic model. It also states that the full invariant potential, spectrum and global-vacuum audit remain open. Its reduced-vacuum certificate passed in this continuation. Those supplied quartic coefficients do not determine a full spectral cutoff or electromagnetic source map, and its singlets cannot be identified with the present neutral matrix by renaming fields.

The [earlier joint-background calculation](JOINT_BACKGROUND_VACUUM_AND_KINETIC_PROTECTION.md) selected a matrix orbit in a polynomial comparison, while the unexpanded Gaussian action still descended along its radial direction. The present calculation repairs stationarity explicitly with the earlier soft stabilizer. It does not promote that stabilizer to a corpus-derived physical term.

## 2. A genuinely stationary comparison, with its added inputs visible

Use flat Euclidean space and a neutral Hermitian \(3\times3\) field \(\Phi\), coupled to a central unit-charge \(U(1)\) probe:

\[
D_A=-i\gamma^\mu(\partial_\mu+iA_\mu I_3)+\gamma_5\Phi.
\]

To the positive spectral trace add the local term

\[
C\Lambda^4\int d^4x\,\frac\kappa2(q-R)^2,
\quad q=\operatorname{Tr}(\Phi^2)/\Lambda^2,
\quad C=\frac1{4\pi^2},\quad\kappa>0.
\]

This is a specified repair of the prior comparison action. The cutoff profile, \(\kappa,R,\Lambda\), matrix variation domain and charge representation are inputs. Gravity is frozen; a flat background with nonzero vacuum energy has not been shown stationary under metric variation. Charged noncentral gauge fields and the corpus's complete finite geometry are absent.

For constant \(\Phi\), let \(s_i\) be its squared dimensionless eigenvalues and

\[
W(s)=\int_s^\infty(t-s)F(t)dt,
\qquad I_s=\int_s^\infty F(t)dt.
\]

The constant-field energy is \(\sum_iW(s_i)+\kappa(\sum_i s_i-R)^2/2\). Because \(W''=F>0\) for the saved profiles, convexity at fixed sum selects equal \(s_i=s\). The sum penalty makes this constant-field problem coercive. Its stationarity condition is

\[
\boxed{\kappa(Ns-R)=I_s,\qquad N=3.}
\]

Thus \(\Phi_0/\Lambda=\sqrt{s}\,S\), with \(S=S^\dagger\) and \(S^2=I\), is a true stationary nonzero background of this repaired matter action. The equation has one solution in \(s>R/N\) for the saved positive profiles and \(R=1\). It does not select a unique sign signature or conjugation orbit.

The calculation covers the previous profiles \(F_b(u)=e^{-u}[1+b(u-1)^2]/(1+b)\), \(b=0,1,4\), stabilizers \(\kappa=1/4,1,4\), and both \(S=I\) and \(S=\operatorname{diag}(1,-1,-1)\): eighteen backgrounds, all conditional model instances rather than independent physical confirmations.

## 3. Full-momentum Hessian in all nine scalar directions

Use dimensionless perturbation \(h=\delta\Phi/\Lambda\), \(x=k^2/\Lambda^2\), and

\[
H_s(x)=\int_0^1F\big(s+\alpha(1-\alpha)x\big)d\alpha.
\]

The background satisfies \(D_0^2=p^2+s\) times the identity even for mixed eigenvalue signs. The full spectral quadratic coefficient, with the common positive prefactor removed, is

\[
-I_s\operatorname{Tr}h^2+
\frac{H_s(x)}2\left[x\operatorname{Tr}h^2+
\operatorname{Tr}\{\sqrt{s}S,h\}^2\right].
\]

The stabilizer contributes \(U'\operatorname{Tr}h^2+2\kappa(\operatorname{Tr}\sqrt{s}Sh)^2\). At stationarity, \(U'=I_s\), so the negative local term cancels exactly.

Split the actual Hermitian perturbations by their relation to \(S\). In quadratic-coefficient convention \(hKh\), without a factor \(1/2\), the eigenchannels are

\[
\boxed{K_{\rm odd}(x)=\frac{x}{2}H_s(x),}
\qquad \{S,h\}=0,
\]

\[
\boxed{K_{\rm even}(x)=\frac{x+4s}{2}H_s(x),}
\qquad [S,h]=0,\quad\operatorname{Tr}Sh=0,
\]

\[
\boxed{K_{\rm radial}(x)=K_{\rm even}(x)+2Ns\kappa.}
\]

For \(F\ge0\) and a convex stabilizer these are nonnegative at every momentum; for the saved strictly positive profiles, all are positive at \(x>0\). The mixed-sign background has four odd directions, retaining four zero modes at \(x=0\). These are conjugation-orbit directions of the neutral matrix model, not photon helicities. Gauging additional internal transformations would change the carrier and require a new gauge/Higgs analysis.

The verifier independently evaluates the original massive four-dimensional divided-difference bubble, reconstructs the quadratic form in random complex Hermitian perturbations, and checks the complete real-coordinate matrices. A stiffness may decrease over some momentum interval without becoming negative. A soft minimum is not a translation-breaking instability.

Consequently moving to this stationary nonzero background does not produce the requested finite-\(k\) onset. This is not a proof for every stationary matrix or spectral action: the equal-absolute-eigenvalue background and convex local stabilizer are essential assumptions.

## 4. Transverse photon block and the mixed block

At constant neutral \(\Phi_0\) and zero gauge field, rotational covariance allows a mixed scalar/vector two-point tensor only along \(k_\mu\). The electromagnetic Ward identity removes it for \(k^2>0\). Thus the scalar/photon quadratic Hessian is block diagonal in this model; no nonzero mixed block has been discarded by fitting. There is also no photon Higgs mass because the scalar commutes with the central gauge generator.

The same specified action gives the full Euclidean momentum-dependent transverse gauge coefficient

\[
\boxed{\frac{Z_A(s,x)}{Z_A(0,0)}=
\frac{6}{F(0)}\int_0^1\alpha(1-\alpha)
F\big(s+\alpha(1-\alpha)x\big)d\alpha.}
\]

This reduces to \(F(s)/F(0)\) at zero momentum and is positive for the saved profiles. In the Gaussian case the identity

\[
-4+(4+2x)h(x)=8x\int_0^1\alpha(1-\alpha)e^{-\alpha(1-\alpha)x}d\alpha
\]

connects it to the transverse gauge form factor in [Alkofer, Saueressig and Zanusso, section II, equations 12–14](https://arxiv.org/html/1410.7999). That neighbouring construction supplies a Gaussian check, not a physical identification of the corpus medium. For three unit-charge copies and the saved normalization, the three transverse Euclidean quadratic coefficients are \(xZ_A(s,x)/Z_A(0,0)\). The longitudinal gauge null is removed by the gauge quotient. Three off-shell Euclidean transverse directions do not mean three on-shell photon polarizations.

The included twelve-direction scalar/transverse-gauge quadratic form has no negative finite-momentum eigenvalue in the saved cases. Positivity follows analytically in the stated class, rather than only from the sampled momentum grid. No gravitational, charged noncentral gauge or omitted physical field block is covered by this statement.

## 5. Nonlinear and optical status

The convexity argument proves the global minimum of the nonlinear **constant-matrix** problem. It does not prove a global minimum over spatially varying fields or exclude a disconnected first-order periodic branch. Since no continuous finite-\(k\) instability exists in this class, there is no derived periodic onset branch to saturate. Inventing its period and expanding about it would reinsert the requested output as input.

The photon form factor is a conditional response of a homogeneous Euclidean background. Changing \(\kappa,R\) or the cutoff changes the stationary amplitude and response. Neither the physical charged-current matching nor the required finite source/contact normalization has been derived. Analytic continuation, residues, causal response and loops remain unchecked. A homogeneous form factor is also not the mixed scalar/gauge kernel of a finite-amplitude periodic structure. It predicts no optical lattice spacing, modulation or envelope gap.

## 6. Decision and next discriminator

The inspected corpus does not fix the requested stationary background and complete physical Hessian. The strongest repaired comparison now achieves genuine nonzero stationarity, all nine scalar directions and a finite-momentum transverse photon response. Its convex stabilization produces a nonnegative included Hessian rather than a finite-wave-number instability.

A next construction must derive a different mechanism or state from source-native data: for example, a competing interaction or a noncentral/unequal-spectrum carrier whose complete quadratic form actually crosses zero at finite momentum while the homogeneous and ultraviolet directions remain controlled. This is a research target, not a result established by listing such possibilities. Freeze its coefficients, cutoff, physical scales and boundary/state conditions before looking at a target gap. Then calculate its nonlinear periodic branch, all allowed stability directions and the calibrated photon response. The present conditional successes and negative finite-\(k\) result remain preserved.

The [noncentral/competing continuation](NONCENTRAL_AND_COMPETING_INTERACTION_GATE.md) now includes the longitudinal gauge/Goldstone mixing in a full supplied U(3) extension. Its nonnegative forty-five-direction operator retains nine gauge nulls at nonzero momentum. A separate helicity control supplies a genuine finite instability band and exact static saturation, but its competing coefficient, carrier/state and photon response are not derived from the corpus.
