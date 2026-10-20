# Finite Positive Euclidean Moments Bound a Gap from Above, but Noisy Data Do Not Certify a Positive Lower Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact Hankel, generalized-eigenvalue, flat-extension and interval certificates; finite noisy data permit rigorous upper-gap exclusions but no positive lower gap without an overlap or tail theorem

**Depends on:** [the numerical lattice continuum audit](1608_numerical_lattice_glueball_convergence_is_strong_gap_evidence_not_a_constructive_r4_theorem.md), [the exact compact transfer calculation](../1500-1599/1595_exact_su2_heat_kernel_transfer_system_is_reflection_positive_but_does_not_scale_to_the_4d_mass_gap.md), and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [spectral-moment ledger](../../../evidence/data/spin23-positive-spectral-moment-gap-bounds.json) and [deterministic verifier](../../../verification/verify/verify_spin23_positive_spectral_moment_gap_bounds.mjs)

## Result

Reflection-positive Euclidean correlator samples are a truncated Hausdorff moment problem. This converts several familiar lattice diagnostics into exact semidefinite statements.

Finite positive samples can rigorously:

- test reflection positivity through Hankel matrices;
- place upper bounds on the lowest energy through effective masses and generalized Ritz values;
- refute a proposed gap that is too large through a negative localizing quadratic form; and
- recover an exact finite spectrum when an exact flat-extension condition holds.

They do not, under any nonzero error interval and without a lower bound on spectral residues, certify a positive lower gap. An arbitrarily light state with an arbitrarily small positive overlap can lie inside the same finite data box.

## Correlators are moments on the unit interval

At time step \(\tau\), write a connected positive spectral correlator as

\[
C_n=\int_0^\infty e^{-En\tau}\,d\rho(E).
\]

Under \(x=e^{-E\tau}\), this becomes

\[
C_n=\int_0^1x^n\,d\mu(x).
\]

The lowest energy \(\Delta\) corresponds to the largest support point,

\[
x_{\max}=e^{-\Delta\tau},\qquad
\Delta=-{1\over\tau}\log x_{\max}.
\]

Define the Hankel and shifted Hankel matrices

\[
(H_0)_{ij}=C_{i+j},\qquad (H_1)_{ij}=C_{i+j+1}.
\]

Positive spectral weight requires \(H_0\succeq0\), \(H_1\succeq0\), and \(H_0-H_1\succeq0\). A spectrum supported in \(x\in[0,R]\) additionally requires

\[
R H_0-H_1\succeq0.
\]

This last inequality is the finite support localizer.

## Exact two-state witness

Take

\[
(E_0,E_1)=(0.4,1.1),\qquad (w_0,w_1)=(0.7,0.3),\qquad \tau=1.
\]

Then

\[
C_n=0.7e^{-0.4n}+0.3e^{-1.1n}.
\]

The executable witness checks moments through \(n=16\). Its \(2\times2\) matrices \(H_0,H_1\), and \(H_0-H_1\), are positive definite. The generalized pencil

\[
H_1v=xH_0v
\]

has eigenvalues

\[
x=(e^{-0.4},e^{-1.1})=(0.670320046,0.332871084).
\]

It therefore recovers both energies and both weights exactly. The \(3\times3\) Hankel matrix is positive semidefinite with rank two, equal to the rank of its leading \(2\times2\) block. This exact flatness gives a unique two-atomic representing measure for this witness.

This is a genuine finite proof, but it proves the deliberately finite spectral model. Exact rank is not stable under stochastic noise and is not expected for a field theory with multiparticle continua.

## Effective masses point the opposite way from a lower-gap proof

Because

\[
{C_{n+1}\over C_n}
={\int x^{n+1}d\mu\over\int x^nd\mu}\le x_{\max},
\]

the effective mass satisfies

\[
\Delta\le m_{\rm eff}(n)
=-{1\over\tau}\log{C_{n+1}\over C_n}.
\]

For the witness, \(m_{\rm eff}(n)\) at \(n=0,1,2,4,8\) is

\[
0.563725, 0.492486, 0.449314, 0.412869, 0.400797.
\]

These are successively stronger upper bounds on the true gap \(0.4\). A plateau near a positive number does not, by this inequality, establish that the spectrum has no lighter state.

The largest generalized eigenvalue of \(H_1v=xH_0v\) is the analogous moment-matrix bound. In the exact two-atom flat case it reaches \(x_{\max}\). For a non-flat spectrum it is a Ritz approximation from below to \(x_{\max}\), again producing a gap bound from above.

## A rigorous interval exclusion

Suppose one proposes \(\Delta\ge0.5\). Then all support must obey

\[
x\le R=e^{-0.5}=0.606531.
\]

For \(v=(-e^{-1.1},1)\), the excited atom cancels. The exact localizing form is

\[
v^T(RH_0-H_1)v
=w_0(R-e^{-0.4})(e^{-0.4}-e^{-1.1})^2<0.
\]

The verifier enlarges every one of \(C_0,\ldots,C_3\) to its full two-parts-per-million interval and propagates the worst possible signed moment error into this quadratic form. Its upper endpoint remains strictly negative. Thus every sequence in the interval box violates the support condition, rigorously proving

\[
\Delta<0.5.
\]

This is an actual noise-robust certificate. Notice its direction: it rules out a gap that is too large.

## Why the positive lower gap is not certified

Now add a hidden state of energy \(0.01\) and weight \(10^{-8}\), scaling the original two weights by \(1-10^{-8}\):

\[
\widetilde C_n=(1-10^{-8})C_n+10^{-8}e^{-0.01n}.
\]

This is another exactly positive spectral measure. Through the observed window \(n\le10\), its largest relative deviation from the central moments is only

\[
6.95\times10^{-7},
\]

well inside the \(2\times10^{-6}\) intervals. Yet its true gap is \(0.01\), not \(0.4\).

The first moment outside the stated relative interval occurs at \(n=13\). The hidden state does not dominate the correlator until

\[
t_\times={\log[(1-10^{-8})0.7/10^{-8}]\over0.4-0.01}
=46.318.
\]

Before that crossover the effective mass can look convincingly close to \(0.4\). After it, the effective mass turns toward \(0.01\). Smaller residue moves the crossover logarithmically farther out while keeping positivity exact.

Therefore the same finite error box contains one spectrum with gap \(0.4\) and another with gap \(0.01\). No semidefinite solver can distinguish them because this is not an optimization failure; it is non-identifiability in the supplied information.

## What would permit a lower certificate

A positive lower bound could follow from additional information strong enough to remove the hidden-residue construction, for example:

1. a proved positive lower bound on the overlap of every state in the channel;
2. an exact finite-atomic model with an exact flat moment extension;
3. an analytic tail estimate uniform in cutoff and volume; or
4. the complete exact moment sequence.

None is supplied by an ordinary finite Monte Carlo correlator. Operator-basis enlargement improves practical overlap but does not prove a universal residue floor.

## Continuum and thermodynamic limits

At fixed lattice spacing and volume, these moment matrices audit a finite transfer spectrum. A four-dimensional Yang--Mills theorem needs the statement to survive

\[
a\to0,\qquad L\to\infty,\qquad t_{\max}\to\infty
\]

with bounds uniform in all three limits. In particular, spectral residues may shrink and crossover times may diverge as the regulator is removed. Pointwise positivity of every finite Hankel matrix does not supply that uniformity.

The result sharpens the numerical/constructive divide: reflection positivity is enough to define the moment cone, but a continuum mass-gap proof requires a uniform support exclusion near \(x=1\), not merely good fits inside the cone.

## Spin(2,3) consequence

The same machinery can audit any proposed reflection-positive Euclidean correlator in a Spin(2,3)-adjacent model. A failed Hankel test would falsify the proposed positive sector, and a negative localizer can exclude an asserted gap value.

Spin(2,3) representation theory alone does not establish reflection positivity of the Euclidean measure, an overlap floor, or uniform regulator limits. Moment positivity is a transferable audit interface, not a group-theoretic proof of the Yang--Mills gap.

## Exhaustion boundary

For finite scalar correlator samples, the proof-bearing possibilities are exhausted here: Hankel positivity, support-localizing matrices, generalized Ritz bounds, exact flat recovery and interval-adversarial spectra. Higher moment order tightens upper bounds and detects a fixed hidden residue earlier. It cannot rule out all smaller residues at any finite \(t_{\max}\) and nonzero error.

The next advance must introduce non-numerical information: a uniform residue/tail theorem or direct constructive control of the continuum spectral measure near zero.

## Sources

- [Lüscher, strictly positive transfer matrix for Euclidean lattice gauge theory](https://doi.org/10.1007/BF01614090)
- [Lüscher and Wolff, generalized eigenvalue method for finite-volume energies](https://doi.org/10.1016/0550-3213(90)90540-T)
- [Curto, Fialkow and Moeller, extremal truncated moment problem](https://arxiv.org/abs/math/0610882)
- [Curto and Fialkow, truncated \(K\)-moment problems and flat extensions](https://arxiv.org/abs/math/0507067)
- [Osterwalder and Schrader, Euclidean axioms and reconstruction](https://doi.org/10.1007/BF01645738)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap problem](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_positive_spectral_moment_gap_bounds.mjs
~~~
