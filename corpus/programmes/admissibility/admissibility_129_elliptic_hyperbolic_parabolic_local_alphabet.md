# Complex, split-complex and dual numbers form the local motion alphabet

**Date:** 26 October 2026
**Status:** exact two-dimensional algebra and symplectic-flow bridge; physical selection of a branch remains open
**Parents:** [locally invariant carrier and mirror face](admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md), [typed two-rail positive lift](admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md), [quarter-turn synthesis](admissibility_21_quarter_turn_wick_goldstone_cloud_and_open_closure.md)
**Evidence:** [three-algebra certificate](../../../evidence/data/admissibility-elliptic-hyperbolic-parabolic-number-algebra-v1.json)
**Verifier:** [matrix and algebra certificate](../../../verification/admissibility/verify_elliptic_hyperbolic_parabolic_local_alphabet.mjs)

## Result

The quarter-turn, the two-rail mirror and the infinitesimal seam belong to one
parameterized family of two-dimensional real algebras,

\[
A_\kappa=\mathbb R[u]/(u^2-\kappa).
\]

Up to rescaling a nonzero generator, the sign of \(\kappa\) leaves three
isomorphism types:

\[
\begin{array}{c|c|c|c}
\kappa & \text{algebra} & u^2 & e^{tu}\\
\hline
-1 & \mathbb C & -1 & \cos t+u\sin t\\
+1 & \text{split-complex} & +1 & \cosh t+u\sinh t\\
0 & \text{dual numbers} & 0 & 1+tu.
\end{array}
\]

These are not three names for one operation. They are the elliptic,
hyperbolic and parabolic local motion types. The common presentation explains
why rotation, boost/squeeze and shear repeatedly appear adjacent in the
corpus, while the different squares prevent them from being silently
identified.

Their internal algebra also changes qualitatively:

| Algebra | Ring structure | Unit orbit | Corpus intuition |
|---|---|---|---|
| \(\mathbb C\) | field; no nonzero zero divisors | compact circle | recurrent phase / closed rotation |
| split-complex | \(\mathbb R\oplus\mathbb R\); two idempotent rails | noncompact hyperbola | counter-scaling / open boost |
| dual | local non-semisimple ring with nilpotent ideal | parabolic shear | tangent memory / first-order opening |

Only the first two nondegenerate branches are one-generator real Clifford
algebras. The square-zero branch is their degenerate contraction, so its
special role is structural rather than a third signature chosen by notation.

## One symplectic carrier

Let

\[
\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
X_\kappa=\begin{pmatrix}0&\kappa\\1&0\end{pmatrix}.
\]

Then

\[
X_\kappa^2=\kappa I,
\qquad
X_\kappa^T\Omega+\Omega X_\kappa=0.
\]

Thus every \(X_\kappa\) is an infinitesimal symplectic generator on the same
locally invariant carrier. Its exponential

\[
M_\kappa(t)=e^{tX_\kappa}
\]

satisfies

\[
M_\kappa(t)^T\Omega M_\kappa(t)=\Omega,
\qquad \det M_\kappa(t)=1.
\]

At the three normalized values,

\[
M_{-1}(t)=
\begin{pmatrix}\cos t&-\sin t\\\sin t&\cos t\end{pmatrix},
\]

\[
M_{+1}(t)=
\begin{pmatrix}\cosh t&\sinh t\\\sinh t&\cosh t\end{pmatrix},
\]

and

\[
M_0(t)=
\begin{pmatrix}1&0\\t&1\end{pmatrix}.
\]

The invariant \(\Omega\) therefore does not decide whether a local motion is
rotational, hyperbolic or shearing. It admits all three. The square and orbit
type of the selected generator supply the missing datum.

## The mirror has two mathematical roles

The typed two-rail carrier introduced the swap

\[
J=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad J^2=I.
\]

As a **discrete rail exchange**, it obeys

\[
J^T\Omega J=-\Omega,
\qquad \det J=-1.
\]

It is therefore anti-symplectic, not an allowed element of the connected
symplectic flow. But the same matrix, regarded as a **Lie-algebra generator**,
obeys

\[
J^T\Omega+\Omega J=0,
\]

so

\[
e^{\eta J}=\cosh\eta\,I+\sinh\eta\,J
\]

is symplectic. This resolves the apparent contradiction:

\[
\boxed{\text{the mirror swap is not the boost, but it generates the boost}.}
\]

The role must be declared. Applying \(J\) exchanges the faces and reverses
the symplectic orientation; exponentiating \(J\) continuously mixes the
faces while preserving their alternating comparison.

## Split-complex rails

For \(j^2=1\), define

\[
e_+=\frac{1+j}{2},
\qquad
e_-=\frac{1-j}{2}.
\]

Then

\[
e_\pm^2=e_\pm,
\qquad e_+e_-=0,
\qquad j e_\pm=\pm e_\pm.
\]

These are the two eigenrails of the mirror. For \(z=a+bj\), conjugation and
norm are

\[
\bar z=a-bj,
\qquad
z\bar z=a^2-b^2.
\]

The rail directions are zero divisors and null directions of this quadratic
form. Hyperbolic flow scales them oppositely:

\[
e^{\eta j}e_+=e^{\eta}e_+,
\qquad
e^{\eta j}e_-=e^{-\eta}e_-.
\]

This is the exact local algebra behind the intuitive picture of two rails
that squeeze, mix or counter-scale while retaining a common comparison. It
does not by itself identify either rail with physical time, mass, particle
and antiparticle, or source and target beyond the authored relation carrier.

## Dual numbers are the infinitesimal seam

For \(\varepsilon^2=0\),

\[
(a+b\varepsilon)(a-b\varepsilon)=a^2,
\qquad
e^{t\varepsilon}=1+t\varepsilon.
\]

The nilpotent coordinate records first-order displacement while contributing
nothing at second order. For a differentiable function,

\[
f(x+v\varepsilon)=f(x)+v f'(x)\varepsilon.
\]

This makes the dual numbers the correct local language for tangents,
linearized response and first-order deformations. They do not represent a
small nonzero real number; \(\varepsilon\) is algebraically nonzero while
\(\varepsilon^2\) vanishes.

The corpus already contains a finite-characteristic instance,

\[
\mathbb Z[i]/(2)\cong\mathbb F_2[\varepsilon]/(\varepsilon^2),
\qquad \varepsilon=i+1,
\]

where two Gaussian quadratures that coincide in the binary residue separate
at first order. That ramified arithmetic thickening and the real dual-number
tangent algebra have the same square-zero grammar but different base rings
and different authority. They may be compared; they must not be identified.

## The parabolic interface

The family \(A_\kappa\) has discriminant proportional to \(\kappa\). For
\(\kappa\ne0\), rescaling \(u\) reduces the algebra to the complex or
split-complex case according to the sign. At \(\kappa=0\), the algebra becomes
non-semisimple and acquires its nilpotent ideal.

The corresponding one-parameter subgroups of
\(SL(2,\mathbb R)=Sp(2,\mathbb R)\) are elliptic, hyperbolic and parabolic. For
nonzero flow parameter their traces obey the standard local classification,
with exceptional central rotation angles treated separately:

\[
|\operatorname{tr}M_{-1}(t)|<2,
\qquad
|\operatorname{tr}M_{+1}(t)|>2,
\qquad
|\operatorname{tr}M_0(t)|=2.
\]

The dual-number point is therefore a contraction boundary between two
semisimple motion types, not a fourth rotation. Calling this a “Wick passage”
is admissible only as an intuitive description of changing real form or
generator type. A physical Wick rotation still requires a typed time
coordinate, analytic continuation, contour and reconstruction rule.

The companion [AZ-130](admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md)
strengthens the family: when the quarter-turn and mirror anticommute on one
typed plane, they generate all of \(M_2(\mathbb R)\), and their equal and
opposite mixtures are the two square-zero directed rungs. The dual branch is
then derived from the complex and split generators rather than appended.

## Consequences for the corpus

The three algebras refine several existing phrases:

| Corpus object | Correct local type | What remains missing |
|---|---|---|
| quarter-turn and phase | complex / elliptic | physical time and Hamiltonian typing |
| rail-swap mirror | split-complex involution used discretely | a reason to exponentiate it physically |
| rail squeeze or boost | split-complex / hyperbolic flow | generator coefficient, action and detector |
| first-order response | dual / parabolic tangent | integrability to a finite physical history |
| ramified Gaussian separation | dual numbers over \(\mathbb F_2\) | a source-derived deformation, not scalar extension alone |

This also sharpens the relation--face compiler. The positive kernel supplies
an admitted carrier. A chosen generator type supplies a local motion. A
transition operator supplies physical access between sectors. A detector
supplies the record. None of those layers can be recovered merely by naming
the algebra of another layer.

## The smallest separating record

At very short times, one observed off-diagonal response can make all three
branches look linear:

\[
\sin t=t+O(t^3),
\qquad
\sinh t=t+O(t^3),
\qquad
t=t.
\]

The smallest even invariant that separates them is the trace curvature of the
full two-port transfer map:

\[
D_\kappa(t)=\frac{\operatorname{tr}M_\kappa(t)-2}{t^2},
\qquad
\lim_{t\to0}D_\kappa(t)=\kappa.
\]

Negative, positive and zero curvature identify elliptic, hyperbolic and
parabolic generator type respectively. This requires enough tomography to
recover the two-port map or an equivalent return invariant; one intensity
trace need not retain it. Finite-time classification must also bound higher
orders, gain/loss, drift and detector convolution before interpreting a near-
zero curvature as exact nilpotence.

## New frontiers

1. **Source-native generator test.** Determine whether the authored
   Claimipedia path algebra supplies an independently defined operator whose
   square is negative, positive or nilpotent on the typed two-rail carrier.
2. **Contraction test.** Construct a controlled family \(X_\kappa\) on one
   physical platform and test whether the parabolic point is a genuine
   transition in the dynamics or only a change of coordinates/model class.
3. **Path-memory test.** Determine whether a nilpotent first-order direction
   composes into a finite holonomy or is killed by the relation quotient.
4. **Arithmetic-to-real test.** Compare the existing
   \(\mathbb F_2[\varepsilon]/(\varepsilon^2)\) cocycle deformation with a
   real tangent deformation through an explicit base-change or lifting map.
5. **Detector test.** Estimate the signed trace curvature of a calibrated
   two-port transfer family, then use longer-time oscillatory, exponential and
   linearly accumulating responses as cross-checks. Do not infer the algebra
   from one short-time intensity channel.

## Physical and semantic firewall

This packet does not establish that nature changes number systems, that a
dual-number point is a phase transition, that split-complex rails are an
aether, that hyperbolic flow is gravity, or that analytic continuation is a
physical trajectory. It establishes a common exact local grammar and names
the additional data required to turn one of its branches into dynamics.

## Sources

- [The Stacks Project, tangent spaces](https://stacks.math.columbia.edu/tag/0B28), for the standard dual-number definition of tangent vectors.
- [SciPost Physics Lecture Notes 69](https://www.scipost.org/SciPostPhysLectNotes.69), section 5.6, for the elliptic, hyperbolic and parabolic one-parameter subgroups of \(SL(2,\mathbb R)\).
- [Induced representations and hypercomplex numbers](https://doi.org/10.1007/s00006-012-0373-1), for the joint complex, dual and double-number treatment of \(SL(2,\mathbb R)\) geometry.
- [The real and Gaussian TRO lifts split at ramified first order](../../claims/0500-0599/572_the_real_and_gaussian_tro_lifts_have_the_same_binary_arrow_and_split_at_the_ramified_first_order.md), for the corpus's finite-characteristic dual-number occurrence.
- [Naive dual-number extension does not select the Gaussian quadrature](../../claims/0500-0599/573_naive_dual_number_extension_doubles_the_entire_cocycle_flag_and_cannot_select_the_gaussian_quadrature.md), for the existing scalar-extension no-go.

## Endpoint

> Complex numbers rotate the local carrier. Split-complex numbers expose and
> counter-scale its two null rails. Dual numbers retain its first-order seam.
> The invariant form admits all three; the selected generator, physical
> operator and detector decide which one has become dynamics.
