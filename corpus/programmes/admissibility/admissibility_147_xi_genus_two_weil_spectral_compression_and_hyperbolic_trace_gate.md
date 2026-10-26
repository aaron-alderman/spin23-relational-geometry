# Xi genus two, Weil spectral compression and hyperbolic traces: three arithmetic record mechanisms

**Date:** 26 October 2026

**Status:** three new external preprints mapped to existing arithmetic and genus-two gates; theorem assumptions and independent certificate replay remain explicit

**Parents:** [Riemann zeta spectral boundary](../../claims/1100-1199/1153_the_riemann_zeta_function_is_a_real_spectral_analogy_but_not_yet_a_jordan_spin23_identification.md), [arithmetic Jordan-tube quotient](../../claims/1100-1199/1154_arithmetic_quotient_of_the_jordan_tube_gives_a_real_zeta_scattering_bridge_but_adds_new_structure.md), [period-matrix/Jordan boundary gate](../lattice-subroutine-gravity/period-matrix-jordan-boundary-gate.md), [multilinear transversality gate](admissibility_146_multilinear_kakeya_transversality_bounds_collective_carrier_concentration.md)

**Sources:** [Planat, Xi genus-two spectral curve](https://arxiv.org/abs/2610.32694); [Suzuki, spectral convergence from Weil's quadratic form](https://arxiv.org/abs/2610.32704); [Alfes--Funke--Herrero--Imamoglu, hyperbolic Green traces](https://arxiv.org/abs/2610.32825)

## Result

The three papers do not establish one unified theory. They do, however, supply
three precise mechanisms by which a complicated carrier becomes an additive,
spectral or finite detector record:

\[
\boxed{
\begin{array}{rcl}
\text{conjugate analytic product}
&\xrightarrow{\ \partial\log\ }&
\text{additive transverse response},\\
\text{global self-adjoint inverse}
&\xrightarrow{\ \text{compression}\ }&
\text{finite-window spectrum},\\
\text{automorphic Green kernel}
&\xrightarrow{\ \text{hypersurface trace}\ }&
\text{finite geometric formula}.
\end{array}}
\]

This is unusually close to the corpus grammar. It is not yet physics: the
objects are the Riemann \(\Xi\)-function, Weil's arithmetic quadratic form and
automorphic Green functions.

## 1. The product-to-sum operation is a logarithmic derivative

Planat begins from

\[
\tau_x(T)=
\frac{\Xi(x+i\sqrt T)\Xi(x-i\sqrt T)}{\Xi(x)^2}.
\]

For real \(x\), the numerator is the positive conjugate product
\(|\Xi(x+i\sqrt T)|^2\). Define

\[
\mathscr A_x(T)=\frac{d}{dT}\log\tau_x(T).
\]

Then the product becomes an additive response:

\[
\mathscr A_x(T)=
\frac{d}{dT}\log\Xi(x+i\sqrt T)
+\frac{d}{dT}\log\Xi(x-i\sqrt T).
\]

This is the same algebraic move used by thermodynamics:

\[
Z_{AB}=Z_AZ_B
\quad\Longrightarrow\quad
\log Z_{AB}=\log Z_A+\log Z_B.
\]

It is not, by itself, a thermodynamic partition function. Here the logarithmic
derivative converts a multiplicative conjugate amplitude into a local
susceptibility-like quantity. The paper proves the exact phase relation

\[
\left.\frac{d}{ds}\arg\Xi(s-i\eta)\right|_{s=x}
=\eta\,\mathscr A_x(\eta^2),
\]

when the stated nonvanishing conditions hold. The transverse change of phase
and the logarithmic change of amplitude are two faces of the same analytic
function.

This is distinct again from lithium-niobate three-wave mixing. In a
\(\chi^{(2)}\) medium a product of fields creates sum and difference
*frequencies*. Here a logarithm makes a product of analytic factors additive.

## 2. The Xi construction reaches a genuine genus-two carrier

At the fixed point \(x=0\), the paper builds a discriminant

\[
\Delta_0(T)=\frac{K(T)}{Y(T)^6}
\]

and reports directed interval certificates isolating six simple branch values.
The normalized double cover

\[
y^2=\Delta_0(T)
\]

therefore has a compact genus-two core. Its four calibrated cycles form an
integral symplectic lattice abstractly identified with
\(H_1(X_2,\mathbb Z)\). This is a real contact with the corpus's genus-two
\(Sp(4,\mathbb Z)\) machinery, not merely a shared group name.

The new bridge is nevertheless typed:

- the corpus genus-two carriers arose from ribbon sewing, finite Weil systems,
  Monster sectors and period matrices;
- this curve arises from a discriminant constructed from \(\Xi\);
- no map identifies their marked cycles, theta characteristics, modular
  representations or physical sources.

Every smooth genus-two period matrix lies in
\(\mathfrak H_2=H_2(\mathbb R)+iH_2(\mathbb R)_+\). Consequently this
construction supplies another authentic positive Jordan datum
\(\operatorname{Im}\Omega\). It does not evade the existing boundary theorem:
a genus-two seam or arithmetic specialization need not lie at
\(\det\operatorname{Im}\Omega=0\).

## 3. Certified separation is not proved irrationality

For the action differential \(\varpi_0=\sqrt{\Delta_0(T)}\,dT\), zero-action
resonance reduces to rationality of two real period ratios. The paper reports
directed Farey certificates implying denominator barriers

\[
q_u\geq1{,}036{,}003,
\qquad
q_r\geq140{,}769
\]

through a small heat-time interval. These are finite-height nonresonance
statements. They do not prove the two ratios irrational, trivialize the full
zero-action lattice, determine the exact Picard rank or prove RH.

The reported de Bruijn--Newman bound
\(\Lambda\leq433/2500=0.1732\) is logically separate from the period result.
It must be compared with other 2026 computer-assisted bounds rather than
presented as a consequence of genus-two nonresonance. The paper itself
explicitly denies an equivalence between core nonresonance and RH.

Because this is a new 69-page preprint with a large certificate bundle, the
corpus records its certified claims as **externally claimed, replay pending**.
The right promotion test is deterministic reproduction from the published
manifest, not inspection of plotted decimal values.

## 4. Weil's quadratic form crosses an older zeta gate—conditionally

Suzuki's paper is the closest answer yet to the stop condition in
[claim 1153](../../claims/1100-1199/1153_the_riemann_zeta_function_is_a_real_spectral_analogy_but_not_yet_a_jordan_spin23_identification.md).
On a Hilbert space defined by Weil's quadratic form localized to \((-a,a)\),
consider the symmetric differentiation operator

\[
\mathscr D_a=i\frac{d}{dx}.
\]

Its self-adjoint extensions are selected by a boundary phase
\(\theta\in[0,2\pi)\). Assuming RH and choosing \(\theta=\pi\), the positive
eigenvalues obey

\[
t_{a,n}\geq\gamma_n,
\qquad
t_{a,n}\searrow\gamma_n
\quad(a\to\infty),
\]

where \(\gamma_n\) are the distinct positive ordinates of the nontrivial zeta
zeros. The finite spectral problem is defined from local arithmetic data: only
the archimedean contribution and prime powers with
\(\log p^m\leq2a\) enter at window \(a\). The zeros are not inserted as input.

The structural hinge is the exact inverse-compression identity

\[
(\overline{\mathscr D}_{a,\pi})^{-1}
=j_a^*\mathsf D_{\pi/2}^{-1}j_a.
\]

Thus expanding the arithmetic window gives finite compressed inverse operators
whose eigenvalues converge monotonically to the global spectral record.
Associated normalized entire functions converge locally uniformly to the
canonical product over the distinct ordinates.

This is a natural local-to-global spectral construction, not a manufactured
operator with prescribed eigenvalues. It still does not prove RH: the
positivity of the unshifted Weil form and the global self-adjoint realization
used for the convergence theorem are assumed under RH.

## 5. Hyperbolic Green traces give a geometric detector

Alfes, Funke, Herrero and Imamoglu study automorphic Green kernels on
\(\mathbb H^q\). The hyperbolic space is represented as the Grassmannian of
positive lines in a quadratic space of signature \((1,q)\); negative vectors
define geodesic hypersurfaces. Integrating one Green-function argument over
arithmetic hypersurface orbits and summing their classes produces a trace.

For even spectral parameter \(s\geq2\), regularized Siegel theta lifts turn
suitable rational combinations of these traces into explicit finite formulas.
In the \(q=2\) case, the surviving terms are governed by hyperbolic distances
from the observation point to finitely many geodesic hemispheres enclosing it.
At special points the authors obtain rationality results.

This is a strong detector analogy:

\[
\text{nonlocal Green kernel}
\longrightarrow
\text{integration over a selected face}
\longrightarrow
\text{finite relational distance record}.
\]

It is also dimensionally and group-theoretically separate from the
\(Spin(2,3)\) carrier. Signature \((1,q)\), a positive-line Grassmannian and an
automorphic theta lift do not become the corpus's signature \((2,3)\) geometry
by choosing \(q\).

## Joined corpus grammar

| Operation | Carrier | Selector | Detector record | Hard boundary |
|---|---|---|---|---|
| logarithmic derivative | conjugate \(\Xi\)-product | \(x,T\), branch and nonvanishing domain | additive amplitude/phase response and discriminant | not a partition function; certificate replay pending |
| inverse compression | global Weil-form Hilbert space and self-adjoint operator | interval \(a\) and extension phase \(\theta\) | finite eigenvalues and entire function | convergence theorem assumes RH |
| hypersurface trace | automorphic Green kernel on \(\mathbb H^q\) | arithmetic hypersurface orbit and modular input | finite distance formula or rational special value | no physical detector or Spin(2,3) map |

The unifying lesson is not that all three carriers are the same. It is that a
record becomes manageable only after an operation declares what is retained:
logarithm, compression or trace.

## Implications for the corpus

### Established advance

The old statement “no natural zeta spectral operator is present” must be
refined. A local-arithmetic family of self-adjoint differentiation operators
now converges to the zeta ordinates under RH. The open question is no longer
mere existence, but whether the positivity required to define the unshifted
limit can be established without assuming the conclusion and whether this
operator has any Jordan/Spin or physical origin.

### New genus-two branch

The Xi discriminant supplies an independently constructed genus-two curve with
an integral symplectic period lattice. The first comparison should be a marked
period-matrix and modular-invariant comparison, not a verbal identification
with the corpus's existing sewn genus-two carriers.

### New detector pattern

The Green-trace paper gives an exact model of a face-integrated detector whose
output depends on finitely many geometric relations. This is useful for the
corpus's boundary/detector language even if no fundamental-physics bridge is
found.

## Next gates

1. **Replay:** reproduce Planat's branch count, period enclosures and Farey
   barriers from the published SHA-256 manifest; audit the Newman-bound inputs
   separately.
2. **Compare periods:** compute standard absolute invariants and a normalized
   period matrix of the Xi curve, then compare them with the corpus's marked
   genus-two candidates. Reject a match based only on genus.
3. **Expose the RH dependency:** isolate exactly where positivity of the
   localized Weil form enters Suzuki's construction and test the shifted
   \(\lambda<\inf\sigma(A_a)\) branch that exists without RH.
4. **Test the compression grammar:** compare spectral monotonicity under
   \(j_a^*D^{-1}j_a\) with the corpus's existing Peirce, detector and
   finite-window compressions.
5. **Keep the hyperbolic lane separate:** use the Green trace as a
   face-integrated detector exemplar unless an explicit \((2,3)\) orthogonal
   or physical source map is supplied.

## Decision

Promote the three operation-level lessons:

\[
\boxed{
\text{multiplicative data}\xrightarrow{\log}\text{additive response},\quad
\text{global inverse}\xrightarrow{\text{compression}}\text{local spectrum},\quad
\text{kernel}\xrightarrow{\text{trace}}\text{finite geometry}.}
\]

Do not promote a proof of RH, an identification of the Xi curve with the
corpus's genus-two carrier, or a physical interpretation of the hyperbolic
Green trace.
