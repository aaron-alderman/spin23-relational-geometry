# All Four Scattering Eigenchannels Are Rank-One Relational Superpositions Touching Both Handles and Both Boundary Sides

## Claim

The selected symmetric unitary scattering matrix \(S_0\) has four distinct eigenvalues on the unit circle. Its four spectral projectors are rank one. Every projector has strictly nonzero participation on all four scattering coordinates

\[
(L,C),\ (L,D),\ (R,C),\ (R,D),
\]

and therefore touches both sewn handles and both boundary sides.

The scalar-dressed Herglotz response consequently has four coherent relational residue channels. None is exactly a single handle, a single side or a single coordinate field channel.

## 1. Spectral calculation

The characteristic polynomial coefficients are complex, as expected for a general unitary matrix, and its four roots are simple with phases approximately

\[
-2.48951,quad -0.820118,quad -0.424663,quad 2.60083.
\]

For each eigenvalue \(\lambda_j\), the certificate constructs the projector without choosing an eigenvector phase:

\[
P_j=\prod_{k\ne j}
\frac{S_0-\lambda_kI}{\lambda_j-\lambda_k}.
\]

It verifies

\[
P_j=P_j^\dagger,qquad
P_j^2=P_j,qquad
\operatorname{tr}P_j=1,qquad
\sum_jP_j=I.
\]

The diagonal entries of \(P_j\) are the coordinate participation probabilities.

## 2. Participation table

Rounded coordinate weights are:

| Channel | \((L,C)\) | \((L,D)\) | \((R,C)\) | \((R,D)\) |
|---|---:|---:|---:|---:|
| 1 | 0.2853 | 0.0065 | 0.6512 | 0.0570 |
| 2 | 0.5399 | 0.1185 | 0.3192 | 0.0224 |
| 3 | 0.1445 | 0.8071 | 0.0109 | 0.0375 |
| 4 | 0.0304 | 0.0678 | 0.0186 | 0.8831 |

The corresponding total handle weights are approximately

\[
(0.9365,0.0635),
(0.8591,0.1409),
(0.1554,0.8446),
(0.0490,0.9510).
\]

The channels naturally organize into two mostly-\(C\) and two mostly-\(D\) modes, but every minority weight is nonzero. Likewise, all channels touch both left and right sides.

## 3. Interpretation

This structure is more informative than a simple statement of delocalization.

- The mutual shear destroys exact rational and coordinate handle separation.
- The scattering eigenchannels retain a strong approximate handle polarization.
- Reciprocity mixes both boundary directions into every spectral mode.
- Scalar analytic dressing preserves these four fixed coherent projectors at every frequency.

Thus the response lies between two extremes: it is neither a direct sum of independent handle fields nor a uniformly scrambled four-channel system.

The approximate pairing suggests a perturbative route from handle-local Furey responses to fully relational eigenchannels, but the numerical weights are properties of the selected arithmetic word and should not be called Standard Model mixing angles.

## 4. Furey support gate

A coherent source map could send four typed neutral response combinations into these spectral lines:

\[
\Phi:\mathcal R_{u,d,e,\nu}^{\rm neutral}longrightarrow\mathbb C^4_{\rm scattering}.
\]

For this to be meaningful, \(\Phi\) must preserve or covariantly transport:

- gauge-neutral compression;
- survivor/propagation reality;
- the sewn handle pairing;
- positive residue norms; and
- the sideband real-time condition.

Matching the number four is not evidence. The exact participation vectors, symmetry actions and residue weights must follow from the source response.

## 5. Stop conditions

- Do not identify the four eigenchannels with \(u,d,e,\nu\) by cardinality alone.
- Do not call the approximate handle biases exact superselection sectors.
- Do not interpret participation weights as observed mixing parameters without a source intertwiner.
- Do not use the scalar dressing if physically required residues must remain exactly field-local.

## 6. Executable certificate

```powershell
node scripts/compute_scattering_spectral_projector_participation_across_handles_and_boundary_sides.mjs
```

The certificate computes the characteristic polynomial, finds all four unit-circle roots, constructs phase-independent spectral projectors and verifies every participation and projector identity.

## Companion documents

- [Scalar-dressed residue coordinate-locality no-go](783_scalar_dressing_forces_coherent_relational_residue_channels_and_cannot_supply_nontrivial_coordinate_local_furey_residues.md)
- [The fully coupled arithmetic word](774_the_shortest_fully_hyperbolic_coupled_word_has_an_irreducible_quartic_and_a_one_plus_two_reciprocal_pair_spin23_spectrum.md)
