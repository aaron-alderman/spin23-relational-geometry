# The Furey Residual-Current Gate Splits into Linear-Port and Quadratic-Relationship Typings with Different Antiunitary Tests

**Date:** 18 October 2026  
**Branches:** Furey aggregate root, residual bath currents, Onsager parity, linear dilation ports, quadratic observables, and covariance typing  
**Claim status:** exact representation fork and parity classification; physical current choice remains open  
**Certificate:** [classify_linear_port_and_quadratic_relationship_furey_residual_currents.mjs](scripts/classify_linear_port_and_quadratic_relationship_furey_residual_currents.mjs)

## Executive result

Document 1026 identifies \(F_CK\to XK\) as the candidate real structure for reciprocal noise on the linear aggregate doublet. Before promoting it to a microscopic current symmetry, the word “current” must be typed.

There are two inequivalent candidates.

### Linear-port typing

The complex aggregate amplitudes

\[
a=\begin{pmatrix}L\\Q\end{pmatrix}
=\frac1{\sqrt2}
\begin{pmatrix}\nu+e\\u+d\end{pmatrix}
\]

transform antiunitarily as

\[
\Theta a=X\bar a,
\qquad
\Gamma a=\varepsilon\bar a.
\]

Their two-point kernel is a Hermitian \(2\times2\) matrix on the fundamental port labels. Document 1026 applies directly: \(XK\) fixes an \(H_2(\mathbb R)\) real form, while \(\varepsilon K\) fixes only scalars.

### Quadratic-relationship typing

The traceless Hermitian bilinears

\[
J_x=a^\dagger\sigma_xa,
\qquad
J_y=a^\dagger\sigma_ya
\]

form a real two-component relationship current. They have equal antiunitary parity:

\[
\Theta:(J_x,J_y)\mapsto(+J_x,+J_y),
\]

\[
\Gamma:(J_x,J_y)\mapsto(-J_x,-J_y).
\]

Consequently either antiunitary permits a symmetric Onsager covariance for this quadratic doublet.

These two constructions are not automatically the same bath. The linear-port covariance is quadratic in source amplitudes; the relationship-current covariance is quartic. Identifying them requires a Gaussian/Wick reduction or another dynamical factorization.

## 1. Exact source closure of the linear doublet

The aggregate map obeys

\[
AF_C=XA,
\qquad
A(F_Cp)=\varepsilon A.
\]

Because \(A,F_C,p\) are real,

\[
A(F_CK)=(XK)A,
\qquad
A(F_CpK)=(\varepsilon K)A.
\]

Thus the linear aggregate sector is exactly closed under both source antiunitaries. This passes the first algebraic current test.

It does not establish that \(L,Q\) are local gauge-invariant bath currents rather than response-channel amplitudes.

## 2. Relationship-current formulas

The two candidate relationship currents are

\[
J_x=2\operatorname{Re}(\bar LQ),
\qquad
J_y=2\operatorname{Im}(\bar LQ).
\]

The third traceless coordinate is

\[
J_z=|L|^2-|Q|^2.
\]

Under \(\Theta=XK\), Pauli conjugation gives

\[
(J_x,J_y,J_z)mapsto(J_x,J_y,-J_z).
\]

Under \(\Gamma=\varepsilon K\),

\[
(J_x,J_y,J_z)mapsto(-J_x,-J_y,-J_z).
\]

Hence the plane

\[
W_{\rm rel}=\operatorname{span}_{\mathbb R}\{J_x,J_y\}
\]

has uniform parity under either antiunitary. The two components may therefore obey an ordinary symmetric Onsager relation whenever the equilibrium state respects the chosen antiunitary.

## 3. Why this does not overturn the previous theorem

Document 1026 classifies antiunitary invariance of a Hermitian matrix acting on the **fundamental aggregate-port space**. The current result classifies the induced action on the **traceless adjoint coordinate plane**.

For \(\Gamma\):

- fundamental Hermitian fixed space: scalars only;
- adjoint relationship doublet: two odd currents with an invariant quadratic covariance.

There is no contradiction. They are different representations and different covariance objects.

This distinction is essential. A covariance matrix of two odd Hermitian currents is not the same object as a Hermitian kernel on a Kramers doublet.

## 4. Linear versus quadratic bath order

If the source amplitudes are the microscopic variables, then

\[
\langle a a^\dagger\rangle
\]

is a two-point object, whereas

\[
\langle J_iJ_j\rangle_c
\]

is a connected four-point object.

For a Gaussian source state, Wick's theorem reduces the latter to quadratic combinations of the former. Even then, the map is nonlinear and does not generally identify

\[
\operatorname{Cov}(J_x,J_y)
\]

with the residual Gram kernel \(K_{\rm res}\) used in documents 1021–1025.

Therefore:

- the linear-port route matches the minimal rational-inner dilation directly;
- the quadratic-current route matches the “relationships as observables” narrative but requires a four-point/influence-functional bridge.

## 5. Gauge and locality boundary

The aggregates \(L,Q\) are built from Higgs-dressed response channels, not asserted fundamental fields. The cross-bilinear \(\bar LQ\) mixes lepton and colour aggregate labels. Whether it is gauge neutral and local depends on the precise dressing and contraction inherited from the completed Furey source.

No physical current claim should be promoted until:

- the Standard-Model gauge indices are restored;
- the Higgs factors are shown explicitly;
- colour singlet contraction is verified;
- Lorentz/CAR parity is assigned;
- the operator is placed in a local or boundary action.

## 6. Updated branch decision

The two paths remain open but separate:

| path | variable | covariance order | antiunitary requirement | direct dilation match |
|---|---|---:|---|---|
| linear port | \((L,Q)\) | two-point | \(XK\) real form | yes |
| relationship current | \((J_x,J_y)\) | connected four-point | equal parity under \(XK\) or \(\varepsilon K\) | not yet |

The linear-port route remains the leading systems interpretation. The quadratic route is a candidate microscopic observable realization and must earn its Wick/influence-functional map.

## 7. Stop-everything and falsification tests

**Linear-current trigger:** explicit gauge-neutral Furey/Higgs currents reduce linearly to \((L,Q)\) and have the two-point kernel used by the rational-inner dilation.

**Quadratic-current trigger:** a controlled Gaussian or large-\(N\) calculation maps the connected \((J_x,J_y)\) covariance to the residual Gram kernel with the correct normalization and poles.

**Gauge trigger:** \(\bar LQ\) is shown to be a local gauge singlet after restoring every suppressed Standard-Model index.

**Typing falsifier:** a fundamental-port fixed-cone theorem is applied directly to an adjoint-current covariance, or conversely.

**Wick falsifier:** linear and quadratic covariances are identified without a Gaussian/factorization assumption.

**Parity falsifier:** the physical currents acquire opposite antiunitary parities after Lorentz, Higgs or colour dressing.

## Verdict

| Question | Verdict |
|---|---|
| Is the linear aggregate doublet closed under both Furey antiunitaries? | **Yes** |
| Does \(XK\) directly select its real two-point cone? | **Yes** |
| Do \((J_x,J_y)\) have equal \(XK\) parity? | **Yes; both even** |
| Do they have equal \(\varepsilon K\) parity? | **Yes; both odd** |
| Is their four-point covariance the minimal Gram kernel? | **Not derived** |
| Are the candidate currents fully gauge/Lorentz/locality checked? | **No** |

## Position in the corpus

- [four-channel Furey response intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
- [Furey two-antiunitary split](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [typed partial-sewing environment](1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
- [reciprocal Keldysh split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
