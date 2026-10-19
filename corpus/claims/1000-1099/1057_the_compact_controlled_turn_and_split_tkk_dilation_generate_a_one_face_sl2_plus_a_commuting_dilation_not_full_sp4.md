# The Compact Controlled Turn and Split TKK Dilation Generate a One-Face \(\mathfrak{sl}_2\) Plus a Commuting Dilation, Not Full \(\mathfrak{sp}_4\)

**Date:** 18 October 2026  
**Branches:** controlled Fourier turn, split TKK dilation, angular/radial separation, squeezed roots, local holonomy, Spin(2,3) closure  
**Claim status:** exact Lie-algebra closure and conjugation theorem; microscopic connection coefficients open  
**Certificate:** [close_the_compact_turn_and_split_dilation_inside_sp4.mjs](../../../verification/close/close_the_compact_turn_and_split_dilation_inside_sp4.mjs)

## Executive result

Separating the passive quarter-turn from the silver scale dilation yields a precise local algebra, but not yet the whole Spin(2,3) algebra.

Use phase-first ordering and define

\[
J=
\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
X=
\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
K=
\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

On the channel plane let

\[
D=e_+-e_-.
\]

The compact controlled-turn generator is

\[
\mathcal K=J\otimes e_-,
\]

and the split TKK/pole-jet dilation is

\[
\mathcal H_D=K\otimes D.
\]

Their first commutator is

\[
\boxed{
[\mathcal H_D,\mathcal K]
=-2\,X\otimes e_-.
}
\]

Thus radial scale transport forces a one-face squeeze. Define

\[
\mathcal S=X\otimes e_-,
\qquad
\mathcal H_-=K\otimes e_-,
\qquad
\mathcal H_+=K\otimes e_+.
\]

Then

\[
[\mathcal K,\mathcal S]=2\mathcal H_-,
\]

and \((\mathcal K,\mathcal S,\mathcal H_-)\) close one copy of \(\mathfrak{sl}_2(\mathbb R)\). Meanwhile \(\mathcal H_+\) commutes with all three and

\[
\mathcal H_D=\mathcal H_+-\mathcal H_-.
\]

Therefore

\[
\boxed{
\operatorname{Lie}\langle\mathcal K,\mathcal H_D\rangle
\cong
\mathfrak{sl}_2(\mathbb R)_-\oplus\mathbb R\mathcal H_+.
}
\]

Its dimension is four, not ten. Angular turn plus split dilation alone do not generate full \(\mathfrak{sp}_4(\mathbb R)\).

The noncommutativity has a direct geometric meaning:

\[
e^{s\mathcal H_D}\mathcal K e^{-s\mathcal H_D}
=\cosh(2s)\mathcal K-\sinh(2s)\mathcal S.
\]

The conjugated quarter-turn is exactly a squeezed symplectic square root of \(D\). It remains a square root but ceases to be passive for \(s\ne0\). Thus the squeezed family previously treated as an alternative is generated automatically when radial dilation dresses the compact angular root.

## 1. Symplectic typing

With

\[
\Omega=J\otimes I,
\]

all five generators satisfy

\[
A^T\Omega+\Omega A=0.
\]

Hence

\[
\mathcal K,\mathcal S,\mathcal H_\pm,\mathcal H_D
\in\mathfrak{sp}_4(\mathbb R).
\]

The roles are distinct:

- \(\mathcal K\): compact phase rotation on the negative face;
- \(\mathcal S\): symmetric squeeze on that face;
- \(\mathcal H_-\): its hyperbolic Cartan generator;
- \(\mathcal H_+\): independent dilation of the untouched face;
- \(\mathcal H_D\): their split difference.

This is the minimal typed implementation of “angular relationship versus radial scale.”

## 2. Exact closure

The phase matrices obey

\[
[K,J]=2X,
\qquad
[K,X]=2J,
\qquad
[J,X]=2K.
\]

Because

\[
De_-=-e_-,
\]

one gets

\[
[\mathcal H_D,\mathcal K]=-2\mathcal S,
\]

\[
[\mathcal H_D,\mathcal S]=-2\mathcal K,
\]

\[
[\mathcal K,\mathcal S]=2\mathcal H_-.
\]

The bracket of the first two generators therefore produces the third, and their next bracket produces the negative-face Cartan. No cross-face operator appears.

Since \(e_+e_-=0\),

\[
[\mathcal H_+,\mathcal K]
=[\mathcal H_+,\mathcal S]
=[\mathcal H_+,\mathcal H_-]=0.
\]

This proves the direct-sum decomposition and the four-dimensional closure.

## 3. Dilation dresses a passive root into a squeezed root

Exponentiating the adjoint action gives

\[
\operatorname{Ad}_{e^{s\mathcal H_D}}\mathcal K
=\cosh(2s)\mathcal K-\sinh(2s)\mathcal S.
\]

Call this generator \(\mathcal K_s\). On the negative face,

\[
\mathcal K_s^2=-I.
\]

The controlled operation

\[
R_s=I\otimes e_++\mathcal K_s
\]

therefore obeys

\[
\boxed{R_s^2=I\otimes D.}
\]

It is symplectic for every real \(s\). For \(s=0\), \(R_s=S_-\) is orthogonal and passive. For \(s\ne0\), it is nonorthogonal and squeezed.

This unifies two earlier branches:

- document 1041 classified the passive roots and the squeezed counterfamily;
- the present calculation shows the split radial flow generates that counterfamily by conjugation.

Passivity is therefore equivalent to selecting the undressed point \(s=0\), not merely to imposing the square-root relation.

## 4. Infinitesimal holonomy

For a small rectangular loop applying dilation and turn in opposite orders,

\[
e^{\alpha\mathcal H_D}
e^{\beta\mathcal K}
e^{-\alpha\mathcal H_D}
e^{-\beta\mathcal K}
=
\exp\!\left(
-2\alpha\beta\mathcal S
+O(\alpha^2\beta,\alpha\beta^2)
\right).
\]

The curvature of the two-parameter angular/radial connection points in the squeeze direction. This is the first exact candidate for what a nontrivial edge holonomy between pole scale and carrier phase would do.

If the physical boundary must remain passive, this curvature must vanish, cancel between faces, or be projected out. If squeezing is allowed, it becomes a measurable consequence rather than a nuisance.

## 5. Why this is not yet full Spin(2,3)

\[
\dim\mathfrak{sp}_4=10,
\qquad
\dim\left(\mathfrak{sl}_2\oplus\mathbb R\right)=4.
\]

The generated algebra preserves the channel decomposition and never mixes \(e_+\) with \(e_-\). The six missing directions include cross-face operations required to explore the full \(H_2(\mathbb R)\) translation/conformal sectors.

Thus neither “quarter-turn plus silver dilation” nor its squeezed holonomy establishes full Spin(2,3) dynamics. A channel-exchange or off-diagonal Jordan generator must be adjoined.

Natural candidates already present elsewhere in the programme are:

- the Furey face exchange \(X_{\rm channel}\);
- the graded antiunitary after realification;
- the off-diagonal Jordan relationship coordinate;
- the complementary controlled turn on \(e_+\).

The next closure calculation should add one correctly typed cross-face generator and test whether it yields all ten directions or an intermediate proper subalgebra.

## 6. Consequences for the common-clock no-go

Document 1056 showed that the two silver half-poles cannot both be compact angular frequencies for one exact edge duration. The present result supplies the leading repair:

- use one compact angular connection \(\mathcal K\) to encode the quarter-turn;
- use \(\mathcal H_D\) to encode relative pole-scale transport;
- accept that their noncommutativity generates squeeze \(\mathcal S\).

The silver ratio need not be an angular frequency ratio. It can be a finite parameter along the split dilation. This avoids the irrational-period obstruction while retaining both structures inside \(\mathfrak{sp}_4\).

What remains open is the coefficient: no derivation yet identifies the tuned silver loss or pole ratio with a specific dilation parameter \(s\).

## 7. Stop-everything tests and falsifiers

**Full-closure trigger:** adjoining one source-derived cross-face generator to this four-dimensional algebra produces all ten independent \(\mathfrak{sp}_4\) directions with the established physical typing.

**Passivity trigger:** the microscopic action forces \(s=0\) or cancels the squeeze holonomy exactly. Then the passive Fourier root is dynamically selected.

**Squeeze trigger:** a source-derived radial excursion gives \(s\ne0\). Then the edge map is a definite nonorthogonal square root and its anisotropy is calculable.

**Coefficient gate:** derive \(s\) from the silver pole ratio or tuned loss without fitting the desired root.

**No-go:** claim that \(\mathcal K\) and \(\mathcal H_D\) alone generate full Spin(2,3); their exact closure has dimension four.

**Type warning:** do not identify \(\mathcal H_D\)'s flow parameter with edge time merely because it is dimensionless.

## Verdict

| Question | Verdict |
|---|---|
| Do compact turn and split dilation commute? | **No** |
| What does their bracket generate? | **A one-face squeeze** |
| Exact closure? | **\(\mathfrak{sl}_2(\mathbb R)_-\oplus\mathbb R\)** |
| Does it equal \(\mathfrak{sp}_4\)? | **No: dimensions \(4\) versus \(10\)** |
| What are the squeezed roots? | **Dilation conjugates of the passive controlled Fourier root** |
| Next decisive algebraic test? | **Adjoin one typed cross-face generator and recompute closure** |

## Position in the corpus

- [split TKK tripotent orbit](1038_the_pole_jet_sl2_is_the_tkk_orbit_of_the_split_jordan_involution_D_not_a_primitive_positive_idempotent.md)
- [controlled Fourier square root](1039_the_split_tkk_intertwiner_is_a_channel_controlled_fourier_quarter_turn_whose_square_is_D_not_the_realified_furey_antiunitary.md)
- [passive and squeezed root classification](1041_passivity_and_the_square_root_of_D_quantize_the_projected_oscillator_action_to_a_quarter_turn_modulo_orientation.md)
- [silver common-clock no-go](1056_the_irrational_silver_half_pole_ratio_forbids_a_common_exact_passive_quarter_turn_edge_clock_but_has_pell_near_recurrences.md)
