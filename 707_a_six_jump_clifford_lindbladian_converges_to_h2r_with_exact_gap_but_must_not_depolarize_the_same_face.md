# A Six-Jump Clifford Lindbladian Converges to \(H_2(\mathbb R)\) with an Exact Gap, but Must Not Depolarize the Same Face

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B07, B08, B09, B11, B14 and the action-level Clifford selector branch  
**Claim status:** exact finite-dimensional GKSL realization and spectrum; spacetime-local microscopic realization remains open  
**Certificate:** [verify_clifford_multiplicity_lindbladian_spectrum.mjs](scripts/verify_clifford_multiplicity_lindbladian_spectrum.mjs)

## Executive result

The exact Clifford conditional expectation of document 706 is the infinite-time limit of a six-jump random-unitary Lindblad semigroup.

Write the eight-dimensional Clifford multiplicity as three rebits:

\[
\mathbb R^8\cong(\mathbb R^2)^{\otimes3}.
\]

Let \(X_i,Z_i\) act on the \(i\)-th rebit and trivially on the two-dimensional face carrier. Define

\[
\boxed{
\mathcal L_{\rm Cl}(A)
=\gamma\sum_{i=1}^{3}
\left[
X_iAX_i-A
+Z_iAZ_i-A
\right],
\qquad \gamma>0.
}
\]

Its kernel on the full real \(16\times16\) operator algebra is exactly

\[
M_2(\mathbb R)\otimes I_8,
\]

and its kernel on symmetric observables is exactly

\[
\operatorname{Sym}_2(\mathbb R)\otimes I_8
\cong H_2(\mathbb R).
\]

For the Pauli word

\[
P_{a,b}=X^aZ^b,
\qquad a,b\in\mathbb F_2^3,
\]

the exact eigenvalue is

\[
\boxed{
\lambda_{a,b}
=-2\gamma\bigl(|a|+|b|\bigr).
}
\]

The Liouvillian gap is therefore \(2\gamma\), and

\[
\boxed{
\|e^{t\mathcal L_{\rm Cl}}A-\mathcal E_{\rm Cl}(A)\|_2
\le
e^{-2\gamma t}
\|A-\mathcal E_{\rm Cl}(A)\|_2.
}
\]

This provides the dynamical and finite-time version of the exact \(H_2(\mathbb R)\) selector.

## 1. GKSL form

Take six jump operators

\[
L_{X_i}=\sqrt{\gamma}\,(I_2\otimes X_i),
\qquad
L_{Z_i}=\sqrt{\gamma}\,(I_2\otimes Z_i).
\]

They are orthogonal involutions. Each GKSL term is

\[
L_UAL_U^T-\frac12\{L_U^TL_U,A\}
=\gamma(UAU^T-A).
\]

Hence the proposed generator is completely positive and trace preserving at every finite time.

Although \(X_i\) and \(Z_i\) anticommute as matrices, their conjugation superoperators commute. All six one-jump semigroups therefore factor exactly.

## 2. Finite-time channel

For one involution \(U\),

\[
e^{t\gamma(\operatorname{Ad}_U-I)}
=p_0(t)\operatorname{id}
+p_1(t)\operatorname{Ad}_U,
\]

where

\[
p_0(t)=\frac{1+e^{-2\gamma t}}2,
\qquad
p_1(t)=\frac{1-e^{-2\gamma t}}2.
\]

Both coefficients are nonnegative and sum to one. The product of the six channels is therefore a \(64\)-term random-unitary channel at every finite time.

As \(t\to\infty\), each binary choice has probability \(1/2\), so every three-rebit Pauli word has weight \(1/64\). The limit is exactly the conditional expectation \(\mathcal E_{\rm Cl}\) constructed in document 706.

## 3. Complete spectrum

Conjugation by \(X_i\) gives \(P_{a,b}\) the sign \((-1)^{b_i}\), while conjugation by \(Z_i\) gives \((-1)^{a_i}\). Therefore

\[
\mathcal L_{\rm Cl}(P_{a,b})
=
\gamma\sum_i
\left[
(-1)^{b_i}-1
+(-1)^{a_i}-1
\right]P_{a,b},
\]

which reduces to

\[
\lambda_{a,b}
=-2\gamma(|a|+|b|).
\]

The multiplicities across the \(64\)-dimensional multiplicity operator space are the binomial coefficients

| \(k=|a|+|b|\) | eigenvalue | multiplicity |
|---:|---:|---:|
| 0 | \(0\) | 1 |
| 1 | \(-2\gamma\) | 6 |
| 2 | \(-4\gamma\) | 15 |
| 3 | \(-6\gamma\) | 20 |
| 4 | \(-8\gamma\) | 15 |
| 5 | \(-10\gamma\) | 6 |
| 6 | \(-12\gamma\) | 1 |

Tensoring with the four-dimensional face operator space multiplies each full-algebra multiplicity by four.

The certificate also separates symmetric and skew tensor parities and verifies that the symmetric \(16\times16\) operator space has its full dimension \(136\), with a three-dimensional kernel.

## 4. Exact fixed algebra

An operator fixed by all six conjugations must commute with the real Pauli algebra on all three rebits. That algebra acts irreducibly on \(\mathbb R^8\), so its commutant is scalar:

\[
\operatorname{Fix}(\mathcal L_{\rm Cl})
=M_2(\mathbb R)\otimes I_8.
\]

Intersecting with real symmetric matrices leaves

\[
\operatorname{Sym}_2(\mathbb R)\otimes I_8.
\]

Thus the dynamics retain:

- the common trace direction;
- the diagonal face-difference generator;
- the real-link generator;

and exponentially remove all seven imaginary-link Clifford directions plus every other multiplicity operator.

## 5. Relation to the \(Spin(2,3)\) carrier

The three fixed symmetric generators form \(H_2(\mathbb R)\). Its determinant is the \((1,2)\) Lorentz quadratic, and its conformal algebra is

\[
\mathfrak{co}(H_2(\mathbb R))
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

The selector sequence is now dynamical:

\[
H_2(\mathbb O)
\xrightarrow[\ t\to\infty\ ]{e^{t\mathcal L_{\rm Cl}}}
H_2(\mathbb R)
\Longrightarrow
Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The convergence scale is a Liouvillian rate, not a particle mass.

## 6. Critical typing result: comparison with the topology Pauli Lindbladian

Document 691 constructed a two-jump Pauli Lindbladian on a topology qubit. Its steady algebra is scalar on that qubit.

The present Clifford Lindbladian does the opposite with respect to the two-dimensional face carrier:

- it acts on the eight-dimensional multiplicity;
- it preserves the full \(M_2(\mathbb R)\) face algebra;
- that preserved face algebra contains the \(H_2(\mathbb R)\) carrier.

Therefore the two constructions may be composed only under one of two typings.

### Typing A: separate topology and Clifford-face factors

If

\[
\mathcal H
=\mathcal H_{\rm topology}
\otimes
\mathcal H_{\rm Clifford\ face}
\otimes
\mathbb R^8_{\rm multiplicity},
\]

then the topology and multiplicity Lindbladians act on different factors and commute. The topology label is erased while the Clifford \(H_2(\mathbb R)\) face survives.

### Typing B: identify topology with the Clifford face

If the topology qubit is the same \(\mathbb R^2\) factor as the Clifford face, applying the topology Pauli depolarizer after \(\mathcal E_{\rm Cl}\) gives

\[
M_2(\mathbb R)\otimes I_8
\longrightarrow
\mathbb RI_{16}.
\]

It destroys the two traceless generators required for \(H_2(\mathbb R)\).

Hence:

\[
\boxed{
\text{the topology qubit and Clifford face cannot be silently identified if both full Pauli twirls are used.}
}
\]

This is a new cross-branch dependency and a possible stop-everything point for the earlier doubled-carrier interpretation.

## 7. Joint error bound

For the Clifford selector alone,

\[
\epsilon_{\rm Cl}(t)
\le e^{-2\gamma t}.
\]

If an independently derived heavy Peirce sector has gap \(\Delta\), and if the associated projection commutes with the multiplicity semigroup, the earlier joint estimate becomes schematically

\[
\|\delta\mathcal O(t)\|
\lesssim
C_\Delta\frac{\|V_{\rm mix}\|}{\Delta}
+C_\gamma e^{-2\gamma t}.
\]

If a separate topology factor is also present, its exponential term may be added with rate \(2\min(\gamma_x,\gamma_z)\). If it is not separate, that addition is invalid because the limiting algebra changes.

## 8. Physical interpretations

The generator is mathematically natural in any of these settings:

- the multiplicity is an unobserved gauge/noise subsystem;
- rapid stochastic Clifford reflections coarse-grain the response algebra;
- the three rebit factors are boundary or code degrees of freedom;
- or the associative dilation is auxiliary and the semigroup implements operational restriction to Jordan observables.

None is yet derived from a local Standard-Model-plus-gravity action.

## 9. Stop-everything criteria

Stop or revise this branch if:

- the three-rebit multiplicity has unavoidable observable excitations;
- a local covariant realization cannot generate all six jumps;
- reflection positivity or energy conservation excludes the required effective open dynamics;
- Furey's matter factor is forced to share the same depolarized multiplicity;
- or the programme requires the topology qubit to be identical to the Clifford face while retaining the full topology Pauli twirl.

The last case is immediately fatal to the claimed \(H_2(\mathbb R)\) steady carrier: the joint fixed algebra would be only scalar.

## 10. Highest-value continuations

1. Audit every earlier use of “topology face” and determine whether it denotes the external doubled label or the internal Clifford \(M_2\) carrier.
2. Compute the joint fixed algebra in both typed architectures and update the dependency graph.
3. Determine whether the six multiplicity jumps can arise from a finite gauge constraint rather than environmental noise.
4. Calculate the normalizer of the selected \(Cl_2\) and the moduli of equivalent real-link choices.
5. Test the selector on the completed Furey Standard-Model module with the response factor explicit.

## Companion documents

- [Exact Clifford-multiplicity selector](706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)
- [Joint selector error bound](692_the_full_two_stage_selector_has_a_joint_inverse_gap_and_exponential_time_error_bound.md)
- [Combined Peirce/exchange selector](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
