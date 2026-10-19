# The Signed Odd-Frequency Convolution Is Purely Mixed RA/AR and Its Lorentzian Metric Reduces Exactly to the Furey Grading

**Date:** 18 October 2026  
**Branches:** causal factorization, retarded/advanced bubbles, odd-frequency kernels, Lorentzian coefficient metric, Furey–Higgs grading, Keldysh vertex  
**Claim status:** exact boundary-loop and congruence theorem; microscopic Keldysh vertex remains open  
**Certificate:** [split_the_odd_convolution_into_ra_sectors_and_reduce_its_metric_to_the_furey_grading.mjs](../../../verification/split/split_the_odd_convolution_into_ra_sectors_and_reduce_its_metric_to_the_furey_grading.mjs)

## Executive result

Document 1034 left two concerns:

1. its odd kernels had poles in both half-planes and were not individually retarded;
2. its exact coefficient matrix had unexplained signature $(1,1)$.

Both now admit exact structural resolutions.

Each odd boundary kernel splits into upper-half-plane analytic retarded pieces and their advanced conjugates. When inserted into the real-frequency convolution, same-half-plane $RR$ and $AA$ loops vanish by contour closure. The entire defect comes from mixed $RA$ and $AR$ sectors, precisely the sectors expected in a noise/Keldysh bubble.

Meanwhile the signed coefficient matrix

\[
G=\begin{pmatrix}\alpha&\beta/2\\\beta/2&0\end{pmatrix},
\qquad \alpha>0,\quad\beta<0,
\]

has an explicit real factorization

\[
\boxed{G=L^TDL,\qquad D=\operatorname{diag}(1,-1).}
\]

The same $D$ is the established $h\chi$ lepton–colour grading. Up to the required kernel-basis map $L$, the fermionic convolution sign is therefore exactly the existing Furey grading.

This is a strong compatibility result, not yet a derivation: every nondegenerate $(1,1)$ form is congruent to $D$. The physical task is to derive this particular $L$ and the graded vertex from the source action.

## 1. Retarded and advanced pieces

Let

\[
b=\frac12\sqrt q.
\]

Define functions analytic in the upper half-plane,

\[
R_0(z)=\frac1{z+ib},
\qquad
R_1(z)=\frac1{(z+ib)^2}.
\]

Their poles lie at $z=-ib$. On the real axis let

\[
A_k(\omega)=\overline{R_k(\omega)}.
\]

Then

\[
\boxed{
\phi_0(\omega)=\frac{R_0(\omega)+A_0(\omega)}2,}
\]

\[
\boxed{
\phi_1(\omega)=\frac{A_1(\omega)-R_1(\omega)}{4ib}.}
\]

The noncausal-looking real kernels are therefore boundary combinations of legitimate causal and anticausal factors, as noise kernels normally are.

## 2. Same-half-plane loops vanish

Consider

\[
I_{RR}^{mn}(\Omega)=\int_{-\infty}^{\infty}
R_m(\nu)R_n(\nu+\Omega)\,d\nu.
\]

All poles lie in the lower half-plane. Closing upward gives

\[
I_{RR}^{mn}=0.
\]

Similarly,

\[
I_{AA}^{mn}=0.
\]

For the simple-pole pair,

\[
I_{RA}^{00}(\Omega)
=\frac{2\pi i}{-\Omega+2ib},
\]

\[
I_{AR}^{00}(\Omega)
=\frac{-2\pi i}{-\Omega-2ib}.
\]

Their average gives

\[
\frac14(I_{RA}^{00}+I_{AR}^{00})
=\frac{2\pi b}{\Omega^2+4b^2}
=C_{00}(\Omega).
\]

The repeated-pole relations follow by differentiating with respect to $b$. Hence the exact convolution of document 1034 is wholly supported by mixed causal/anticausal sectors.

## 3. Exact reduction of the coefficient metric

Write

\[
c=\frac\beta2.
\]

The convolution form is

\[
G=\begin{pmatrix}\alpha&c\\c&0\end{pmatrix}.
\]

Define

\[
L=
\begin{pmatrix}
\sqrt\alpha&c/\sqrt\alpha\\
0&|c|/\sqrt\alpha
\end{pmatrix}.
\]

Direct multiplication gives

\[
\boxed{
L^T
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
L
=
\begin{pmatrix}\alpha&c\\c&0\end{pmatrix}.}
\]

If

\[
\begin{pmatrix}\psi_+\\\psi_-\end{pmatrix}
=L
\begin{pmatrix}\phi_0\\\phi_1\end{pmatrix},
\]

then the defect is a difference of two autocorrelation channels:

\[
A=C[\psi_+,\psi_+]-C[\psi_-,\psi_-].
\]

The final function remains positive even though its internal presentation is Krein/Lorentzian.

## 4. Relation to the Furey grading

The programme already contains

\[
D=\operatorname{diag}(1,-1)
\]

as:

- the lepton–colour grading;
- the compressed $h\chi$ product grading up to the established sign convention;
- the relative product of the two Furey antiunitaries;
- the channel involution in the graded frequency sewing law.

The exact convolution metric belongs to the same congruence class and has now been reduced to that literal matrix.

This suggests a concrete source mechanism:

\[
\text{Furey root modes}
\xrightarrow{L}
\text{two internal radial kernels}
\xrightarrow{D\text{-graded loop}}
K_{\rm res}.

\]

But congruence alone does not identify origins. The matrix $L$ contains the tuned silver coefficients; deriving it from propagator residues or Yukawa/Higgs couplings is the remaining non-circular gate.

## 5. Causal status

The result improves the causal status in a precise way:

- no symmetric kernel is claimed to be retarded;
- each is split into retarded and advanced boundary pieces;
- only mixed $RA/AR$ sectors survive the convolution;
- the output is an even positive noise spectrum rather than a retarded response.

This is compatible with the Keldysh split of document 1025. It is not yet a full Keldysh model because occupation functions, contour indices and the fluctuation–dissipation relation have not been inserted.

## 6. Stop-everything and falsification tests

**Vertex trigger:** the source Furey/Higgs action produces a loop vertex congruent to $D$ with residue matrix exactly $L$.

**Antiunitary trigger:** $D$ enters the loop as the relative product of $XK$ and $\varepsilon K$, not as a fitted sign matrix.

**KMS trigger:** adding equilibrium occupations preserves the exact rational defect or predicts a controlled deformation.

**Half-scale trigger:** retarded poles at $-i\sqrt q/2$ and $-i/2$ arise independently from the mediator spectrum.

**Falsifier:** same-half-plane $RR$ or $AA$ terms are required after the contour assumptions are imposed.

**Falsifier:** congruence to $D$ is presented as a microscopic identification without deriving $L$.

**Boundary warning:** the positive final spectrum is used to hide the indefinite internal metric instead of explaining its vertex origin.

## Verdict

| Question | Verdict |
|---|---|
| Can the odd kernels be decomposed into causal pieces? | **Yes** |
| Which loop sectors survive? | **Only mixed $RA/AR$ sectors** |
| Is the signed coefficient form equivalent to the established grading? | **Yes, by explicit real congruence** |
| Does this derive the Furey vertex? | **No** |
| Is the construction compatible with a noise/Keldysh interpretation? | **Yes, structurally** |
| Are KMS occupations and microscopic residues derived? | **No** |

## Position in the corpus

- [signed odd-frequency convolution](1034_the_tuned_defects_have_an_exact_signed_two_kernel_odd_frequency_convolution_but_no_single_positive_scalar_autocorrelation.md)
- [reciprocal Keldysh split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
- [two Furey antiunitaries](1026_the_ungraded_furey_exchange_antiunitary_not_the_graded_quaternionic_one_is_the_candidate_noise_reciprocity_selector.md)
- [Furey grading and silver direction](../0900-0999/989_the_furey_higgs_product_grading_is_the_silver_reactance_direction_and_a2_monodromy_fixes_its_unit_amplitude.md)
