# The Fully Hyperbolic Selector Requires Active Squeezing as a Canonical Step but Can Still Be a Passive Flux Transfer Matrix

## Claim

The fully hyperbolic selector

\[
N=(UPHR)^2\in Sp(4,\mathbb Z)
\]

is not in the passive compact subgroup

\[
Sp(4,\mathbb R)\cap O(4)\cong U(2).
\]

Therefore, if \(N\) is interpreted as a direct canonical Gaussian operation or lossless scattering step on positive-norm modes, it requires two nonzero squeezing parameters and is active.

This does not exclude a passive realization as a spatial, Euclidean, or boundary transfer matrix. Passive flux-conserving systems can have hyperbolic transfer matrices even though their physical scattering matrices are unitary. The two interpretations must not be conflated.

## 1. Orthogonality obstruction

The word is symplectic:

\[
N^TJN=J.
\]

But

\[
N^TN=
\begin{pmatrix}
2&0&-3&2\\
0&1&1&-4\\
-3&1&6&-7\\
2&-4&-7&19
\end{pmatrix}
\ne I.
\]

Hence it is not a passive orthogonal symplectic transformation. Hyperbolic eigenvalues already imply this, because compact passive transformations have all eigenvalues on the unit circle.

## 2. Exact singular-value data

The characteristic polynomial of \(N^TN\) is

\[
x^4-28x^3+112x^2-28x+1.
\]

Using \(y=x+x^{-1}\), the reduced roots are

\[
y_\pm=14\pm\sqrt{86}.
\]

The symplectic singular values are approximately

\[
4.81981,\quad2.12235,\quad0.471176,\quad0.207477.
\]

The two Bloch–Messiah squeezing parameters are therefore

\[
r_1=\log 4.81981\approx1.57273,
\qquad
r_2=\log 2.12235\approx0.752525.
\]

Any direct positive-metric Gaussian implementation needs active resources of these strengths, surrounded by passive mode rotations.

## 3. Why passive transfer remains possible

A transfer matrix compares field and flux amplitudes across a region. It preserves a symplectic or indefinite flux form, not the Euclidean norm of the boundary-amplitude vector. In a passive stop band or evanescent region, one transfer direction grows while its reciprocal decays; no physical energy is created because admissible scattering boundary conditions combine them so that the scattering matrix remains contractive or unitary.

Thus

\[
\|N\|>1
\]

is fatal to a passive **time-step/scattering** interpretation but not to a passive **spatial-transfer** interpretation.

The next construction must specify which object is being modeled:

- unitary microscopic time evolution;
- canonical Gaussian gate;
- physical scattering matrix;
- transfer/monodromy matrix;
- Euclidean evolution; or
- retarded boundary response.

Positivity conditions differ across these categories.

## 4. Anti-symplectic factor boundary

The mnemonic word contains the anti-symplectic generator \(P\) twice. An individual anti-symplectic map is not a continuous Hamiltonian canonical time step. It can represent orientation reversal, conjugation, a boundary relabeling, or a disconnected normalizer operation. Only the total even-parity word \(N\) is symplectic.

Therefore \((UPHR)^2\) should not yet be read as eight chronological physical gates. It is an algebraic factorization of the selected integral transformation. A physical synthesis may factor \(N\) differently through its Bloch–Messiah or transfer-network decomposition.

## 5. Consequence for the programme

The passive-response branch remains open but is now typed:

### Direct dynamical realization

Requires active squeezing or an indefinite/Krein state space. It must explain the positive physical subspace and energy source.

### Boundary-transfer realization

May remain entirely passive, provided a causal positive-real or Herglotz response produces \(N\) as its transfer/monodromy while the observable scattering map obeys the appropriate positivity bound.

The high-value next test is an explicit two-port or Dirichlet-to-Neumann network synthesis, followed by conversion from transfer to scattering variables and a check of passivity on the physical frequency contour.

## 6. Executable certificate

```powershell
node scripts/classify_fully_hyperbolic_selector_as_active_gaussian_step_or_passive_spatial_transfer.mjs
```

The certificate verifies symplecticity, failure of orthogonality, the reciprocal singular-value polynomial and both squeezing parameters.

## Companion documents

- [The fully hyperbolic coupled word](774_the_shortest_fully_hyperbolic_coupled_word_has_an_irreducible_quartic_and_a_one_plus_two_reciprocal_pair_spin23_spectrum.md)
- [Its fixed primitive axis and boost planes](775_the_fully_hyperbolic_selector_fixes_a_negative_norm_primitive_axis_and_splits_its_orthogonal_complement_into_two_boost_planes.md)
