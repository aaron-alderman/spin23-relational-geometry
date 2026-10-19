# Anomalous Gaussian Pairing Gives a Two-Antiunitary Wick Surjection but Only for a Neutral Commuting or Nambu Root

**Date:** 18 October 2026  
**Branches:** anomalous covariance, Furey antiunitaries, Wick map, neutral/Nambu typing, CAR obstruction, ultraviolet gate  
**Claim status:** exact Gaussian-algebra theorem with a boson/fermion typing boundary; no microscopic Standard-Model realization claimed  
**Certificate:** [classify_anomalous_gaussian_roots_under_both_furey_antiunitaries.mjs](../../../verification/classify/classify_anomalous_gaussian_roots_under_both_furey_antiunitaries.mjs)

## Executive result

The proper-Gaussian construction used only

\[
C=\langle aa^\dagger\rangle,
\qquad
S=\langle aa^T\rangle=0.
\]

Allowing a symmetric anomalous covariance $S$ reveals a second exact route from a Furey response root to every positive real relationship covariance.

If the commuting complex response doublet is invariant under both

\[
\Theta=XK,
\qquad
\Gamma=\varepsilon K,
\qquad \varepsilon=DX,
\]

then its simultaneous fixed covariances are

\[
\boxed{C=pI,\qquad S=sI+i v\sigma_z,}
\]

with $p,s,v\in\mathbb R$ and augmented positivity

\[
p^2\ge s^2+v^2.
\]

The connected covariance of the relationship currents $(J_x,J_y)$ is

\[
M=
\begin{pmatrix}
2p^2+2(s^2-v^2)&-4sv\\
-4sv&2p^2-2(s^2-v^2)
\end{pmatrix}.
\]

This map is surjective onto all of $\operatorname{Sym}_2(\mathbb R)_+$ and again has the generic root sign fiber

\[
(s,v)\sim(-s,-v).
\]

However, the construction has two hard boundaries, with the CAR statement understood at equal time or in the even-frequency sector:

- a raw equal-time/even-frequency fermionic CAR anomalous covariance is antisymmetric rather than symmetric, and its simultaneous fixed space under the two antiunitaries is zero; odd-frequency internally symmetric pairing remains live and is classified in document 1033;
- nonzero $S$ carries twice the ordinary $U(1)$ phase, so it requires a neutral response variable, a Nambu completion, or actual symmetry breaking.

It also does not repair the ultraviolet obstruction: the isotropic normal covariance still satisfies $p\sim P/|\omega|$ for the tuned target.

## 1. General improper complex Gaussian Wick formula

Let $a\in\mathbb C^2$ be a zero-mean commuting Gaussian vector with

\[
C=\langle aa^\dagger\rangle,
\qquad
S=\langle aa^T\rangle=S^T.
\]

For Hermitian quadratic currents

\[
J_A=a^\dagger A a,
\]

Wick contraction gives

\[
\boxed{
\langle J_AJ_B\rangle_c
=\operatorname{tr}(ACBC)
+\operatorname{tr}(ASB^TS^\dagger).}
\]

The proper construction of document 1028 is the special case $S=0$.

Physical Gaussian positivity is positivity of the augmented covariance

\[
\mathcal G=
\begin{pmatrix}
C&S\\S^\dagger&C^T
\end{pmatrix}\succeq0.
\]

## 2. Fixed spaces of the two antiunitaries

Distributional invariance under an antiunitary $UK$ requires

\[
C=UC^TU^\dagger,
\qquad
S=US^*U^T.
\]

For $XK$, the Hermitian covariance lies in the three-real-dimensional cone already found in document 1026. Its symmetric anomalous fixed space is

\[
S=sI+u\sigma_x+i v\sigma_z,
\qquad s,u,v\in\mathbb R.
\]

For $\varepsilon K$, the Hermitian fixed space collapses to scalar matrices, while

\[
S=sI+i u\sigma_x+i v\sigma_z.
\]

Their intersection is therefore

\[
C=pI,
\qquad
S=sI+i v\sigma_z.
\]

Since

\[
SS^\dagger=(s^2+v^2)I,
\]

the augmented positivity condition reduces exactly to

\[
p\ge0,
\qquad p^2\ge s^2+v^2.
\]

## 3. The anomalous Wick map

Take

\[
A=\sigma_x,
\qquad B=\sigma_y.
\]

The normal covariance contributes $2p^2I$. The anomalous term gives

\[
M_{m anom}
=2
\begin{pmatrix}
s^2-v^2&-2sv\\
-2sv&-s^2+v^2
\end{pmatrix}.
\]

Equivalently, if

\[
w=s+iv,
\]

then the traceless target coordinate is the doubled-angle square

\[
\alpha-i\beta=2w^2,
\]

where

\[
M=
\begin{pmatrix}m+\alpha&\beta\\\beta&m-\alpha\end{pmatrix}.
\]

The source phase is therefore a square root of the target orientation. This is another exact carrier/relationship double cover.

## 4. Surjectivity onto the positive Jordan cone

For any $M\succeq0$, define

\[
m=\frac{M_{11}+M_{22}}2,
\quad
\alpha=\frac{M_{11}-M_{22}}2,
\quad
\beta=M_{12}.
\]

Choose

\[
p^2=\frac m2,
\qquad
w^2=\frac{\alpha-i\beta}{2}.
\]

Then

\[
|w|^2=\frac{\sqrt{\alpha^2+\beta^2}}2\le\frac m2=p^2
\]

is exactly target positivity. Thus every positive $H_2(\mathbb R)$ relationship covariance has a simultaneous-two-antiunitary anomalous root.

The target eigenvalues are

\[
\lambda_\pm=2\left(p^2\pm|w|^2\right),
\]

so the rank-one boundary corresponds to saturation of augmented positivity.

## 5. Application to the tuned silver target

For

\[
K_{\rm res}=\operatorname{diag}(A,B),
\qquad A\ge B,
\]

one may choose

\[
v=0,
\qquad
p^2=\frac{A+B}{4},
\qquad
s^2=\frac{A-B}{4}.
\]

The real-axis analytic choice again requires

\[
s(-\omega)=-s(\omega).
\]

The sheet sign has moved from ordinary coherence $r\sigma_x$ into anomalous pairing $sI$, but it has not disappeared.

Nor has the ultraviolet problem. The same target trace fixes

\[
p(\omega)\sim\frac{P}{|\omega|},
\]

so

\[
\int\operatorname{tr}C\,d\omega
=\int2p\,d\omega
\]

still diverges logarithmically. Anomalous covariance changes where anisotropy lives, not the square-root scaling forced by Wick contraction.

## 6. The equal-time/even-frequency fermionic CAR obstruction

The calculation above uses commuting Gaussian response amplitudes. For equal-time or even-frequency raw fermionic pairing,

\[
S_f=\langle aa^T\rangle
\]

is antisymmetric. In two dimensions it has the form

\[
S_f=\Delta\varepsilon.
\]

The two fixed-point conditions become

\[
XK:\quad \Delta=-\bar\Delta,
\]

\[
\varepsilon K:\quad \Delta=\bar\Delta.
\]

Their intersection is

\[
\boxed{\Delta=0.}
\]

Therefore the simultaneous **static/even-frequency** anomalous surjection cannot be assigned directly to an unmodified two-component Furey fermion pair. It belongs to one of three possible typings:

1. a commuting effective response field;
2. a gauge-neutral bosonic composite;
3. an enlarged Nambu/Majorana carrier in which the antiunitary representation and pairing tensor are correspondingly enlarged.

The third option must be recalculated rather than inferred from the commuting formula. There is also a fourth, dynamical option: a frequency-resolved CAR kernel satisfies $F(-\omega)=-F(\omega)^T$, so an internally symmetric pair is allowed when it is odd in frequency. Document 1033 proves that the common $sI+iv\sigma_z$ plane is exactly such an odd-frequency candidate.

## 7. Gauge-phase gate

Under an ordinary phase rotation

\[
a\mapsto e^{i\theta}a,
\]

the normal covariance is invariant but

\[
S\mapsto e^{2i\theta}S.
\]

A nonzero anomalous covariance is therefore not gauge neutral unless the phase is already a Nambu redundancy, the amplitude itself is neutral, or a compensating charge-two field is present. This makes the neutral Peirce-line factor in the response-root proposal structurally relevant, but it does not by itself solve the lepton–colour gauge completion.

## 8. Branch consequences

The anomalous branch changes the earlier fork as follows:

- the ungraded antiunitary need not act alone at covariance level;
- both antiunitaries can coexist if anisotropy is stored in symmetric anomalous pairing;
- the resulting double cover is a phase-square map rather than an ordinary covariance-vector sign;
- raw CAR variables exclude this simultaneous pairing;
- the UV-completion gate remains exactly where document 1030 placed it.

## 9. Stop-everything and falsification tests

**Nambu trigger:** construct a gauge-complete neutral Nambu carrier whose enlarged CAR covariance reproduces this doubled-angle map and both antiunitary actions.

**Peirce trigger:** derive $S=sI+iv\sigma_z$ from the neutral $D\leftrightarrow E$ Peirce relation rather than postulating it.

**Deck trigger:** show that $w\mapsto-w$ is the same central transformation as the placement sheet flip on the source carrier.

**Falsifier:** apply the symmetric anomalous formula directly to raw fermionic operators without changing Wick signs and CAR antisymmetry.

**Gauge falsifier:** treat nonzero $S$ as gauge invariant for a charged doublet without a Nambu or charge-two completion.

**UV warning:** claim that squeezing removes the continuum divergence even though $p^2=(A+B)/4$ remains fixed.

## Verdict

| Question | Verdict |
|---|---|
| Can anomalous commuting covariance realize every positive real relationship kernel? | **Yes** |
| Can the root be fixed by both Furey antiunitaries? | **Yes** |
| Is the generic root still two-to-one? | **Yes, under $(s,v)\mapsto(-s,-v)$** |
| Does it repair the tuned UV divergence? | **No** |
| Can it be assigned directly to a raw two-component equal-time/even-frequency CAR pair? | **No** |
| Does a two-component odd-frequency CAR branch remain? | **Yes, but its convolutional Wick map is open** |
| Is a neutral/Nambu microscopic realization known? | **No** |

## Position in the corpus

- [spectral-factor and UV gate](1030_the_tuned_wick_root_has_a_graded_outer_factor_but_no_rational_or_finite_variance_continuum_realization_without_uv_completion.md)
- [proper-Gaussian Wick surjection](1028_the_proper_gaussian_wick_map_from_the_xk_fixed_furey_root_surjects_onto_every_positive_residual_h2r_covariance.md)
- [two Furey antiunitaries](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [residual-current typing fork](1027_the_furey_residual_current_gate_splits_into_linear_port_and_quadratic_relationship_typings_with_different_antiunitary_tests.md)
