# Frontier Wave 7.90: A Completely Positive Unread-Correlation Channel

**Date:** 25 October 2026
**Status:** exact covariant-channel construction and sharp complete-positivity interval
**Certificate:** [unread-correlation channel verifier](../../../../verification/verify/verify_chain_theory_unread_correlation_channel.mjs)

**Subsequent implementation:** [Wave 7.105](frontier_wave7_105_random_weyl_implementation_of_unread_channel.md) realizes the maximal channel as a correlated random-Weyl circuit and recovers the same complete-positivity interval from nonnegativity of its classical probability law.

## Result

There is a physical quantum channel that erases both endpoint-local records
while retaining all 24 connected qutrit--qubit correlation directions.  It
cannot retain them at full strength.

Let

\[
D_n(X)=\operatorname{Tr}(X)\frac{I_n}{n}
\]

be the completely depolarizing channel on an \(n\)-level system and define

\[
\boxed{
\Phi_\eta
=D_6
+\eta\,(\operatorname{Id}-D_2)
\otimes(\operatorname{Id}-D_3).
}
\]

On the four endpoint sectors of \(\operatorname{Herm}(\mathbb C^2\otimes
\mathbb C^3)\), its eigenvalues are

| sector | dimension | channel eigenvalue |
|---|---:|---:|
| scalar \((\mathbf1,\mathbf1)\) | 1 | 1 |
| qubit-local \((\mathbf3,\mathbf1)\) | 3 | 0 |
| qutrit-local \((\mathbf1,\mathbf8)\) | 8 | 0 |
| connected \((\mathbf3,\mathbf8)\) | 24 | \(\eta\) |

Thus every output has maximally mixed endpoint marginals, while every
connected direction survives whenever \(\eta\ne0\).

The sharp bounds are

\[
\Phi_\eta\text{ positive}
\quad\Longleftrightarrow\quad
-\frac29\le\eta\le\frac12,
\]

but

\[
\boxed{
\Phi_\eta\text{ completely positive}
\quad\Longleftrightarrow\quad
-\frac1{24}\le\eta\le\frac18.
}
\]

Consequently, \(\eta=1/8\) is the maximum physical correlation retention in
this endpoint-unitary-covariant diagonal family.

## 1. Why this is the correct repair

Wave 7.89 proved that the raw connected projection is not positive.  The
failure arose because a traceless connected operator cannot itself be a
nonzero state.  The present channel restores the scalar baseline before
transmitting a controlled fraction of the correlation component:

\[
\rho
\longmapsto
\frac{I_6}{6}+\eta C(\rho).
\]

At \(\eta=1\), this is the failed affine double-centering map.  Reducing
\(\eta\) adds exactly the noise needed to move every possible input inside the
positive fixed-marginal body.  Complete positivity demands more noise than
ordinary positivity because the channel must remain positive when acting on
one half of an arbitrarily entangled larger state.

## 2. Sharp Choi calculation

For one endpoint of dimension \(n\), the Choi matrix of
\(\operatorname{Id}-D_n\) has two eigenvalues:

\[
n-\frac1n
\quad\text{on the maximally entangled ray},
\qquad
-\frac1n
\quad\text{on its orthogonal complement}.
\]

Combining the two endpoint decompositions gives four Choi sectors for
\(\Phi_\eta\):

| Choi sector | multiplicity | eigenvalue |
|---|---:|---:|
| \(\Omega_2\otimes\Omega_3\) | 1 | \(1/6+4\eta\) |
| \(\Omega_2\otimes\Omega_3^\perp\) | 8 | \(1/6-\eta/2\) |
| \(\Omega_2^\perp\otimes\Omega_3\) | 3 | \(1/6-4\eta/3\) |
| \(\Omega_2^\perp\otimes\Omega_3^\perp\) | 24 | \(1/6+\eta/6\) |

Requiring all four to be nonnegative yields the exact interval
\([-1/24,1/8]\).  At the positive endpoint, the three-dimensional
\(\Omega_2^\perp\otimes\Omega_3\) Choi sector reaches zero.

## 3. Positivity versus complete positivity

Local-unitary covariance reduces the positivity test on pure inputs to one
Schmidt parameter.  Across that family, the connected component has extreme
eigenvalues

\[
\lambda_{\min}=-\frac13,
\qquad
\lambda_{\max}=\frac34.
\]

The lower extreme occurs for a product input; the upper extreme occurs for a
maximally entangled rank-two input.  Requiring

\[
I_6/6+\eta C\succeq0
\]

therefore gives the wider positive-map interval \([-2/9,1/2]\).

The gap

\[
\frac18<\eta\le\frac12
\]

is a concrete forbidden zone: every isolated qutrit--qubit state remains
positive, but the operation fails the ancilla test and cannot be a quantum
channel.  This is a direct realization of the corpus's distinction between
positive and completely positive admissibility.

## 4. Consequence for the Chain configuration

The proposed two-read/one-unread configuration now has a finite physical
candidate:

\[
\begin{aligned}
\text{read link 1}&:\operatorname{Id}\text{ on }\operatorname{Herm}(M),\\
\text{read link 2}&:\operatorname{Id}\text{ on }\operatorname{Herm}(M),\\
\text{unread link}&:\Phi_{1/8}\text{ on }\operatorname{Herm}(M).
\end{aligned}
\]

The unread channel annihilates all eleven local traceless directions and
retains the complete 24-dimensional correlation support.  Attenuation does
not change its rank, so the denominator count

\[
36\times36\times24
\]

survives at support level.

What does change is normalization.  A physical amplitude propagated through
the unread link acquires a factor \(1/8\) in this maximally retaining symmetric
channel.  The target formula does not contain that factor explicitly.
Therefore either:

1. its denominator counts support dimensions before channel gain;
2. its numerator weights already absorb an unread-link calibration;
3. its “unread” operation is not this covariant channel; or
4. the target record normalization is physically incomplete.

This is now experimentally and algebraically discriminating.

## 5. Detector interpretation

The map is endpoint-unitary covariant, so it requires no preferred qubit or
qutrit basis.  It behaves as a correlation-only privacy channel:

- every local observer receives the maximally mixed state;
- a joint observer can still recover attenuated correlations;
- all 24 correlation coordinates remain distinguishable in principle;
- an external ancilla remains safe exactly inside the CP interval.

This supplies a precise meaning for “unread”: locally erased but jointly
latent.

## 6. Next record-kernel test

Apply the target's two exchange operations after \(\Phi_{1/8}\), then ask
which degree-two observables remain distinguishable by a joint detector.  The
critical tests are:

1. whether the \(42\)-dimensional Jordan sector survives with one common gain;
2. whether the two \(48\)-dimensional mixed sectors receive different gains;
3. whether all three qubit commutator records survive;
4. whether the eight-dimensional qutrit bracket image is truly erased or only
   attenuated;
5. whether the channel gain cancels in a normalized response ratio or changes
   the proposed value of \(\alpha\).

This is the shortest route from the denominator bridge to the unresolved
sign-only record rule.

## Verdict

The configuration gate has advanced from an affine dimension match to an
explicit quantum channel:

\[
\boxed{
\Phi_{1/8}
=D_6+\frac18(\operatorname{Id}-D_2)
\otimes(\operatorname{Id}-D_3).
}
\]

It erases both local marginals, retains the full 24-dimensional correlation
support and saturates complete positivity.  The new open question is no
longer whether an unread correlation link can exist, but whether its mandatory
gain and phase sensitivity reproduce or falsify the target record kernel.

## Corpus anchors

- [connected-state positivity firewall](frontier_wave7_89_chain_theory_connected_state_positivity_firewall.md)
- [rectangular endomorphism bridge](frontier_wave7_86_chain_theory_rectangular_endomorphism_bridge.md)
- [positive but not completely positive selector](../../../claims/0600-0699/686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md)
- [Jordan--Lie record fork](frontier_wave7_85_chain_theory_jordan_lie_record_fork.md)
