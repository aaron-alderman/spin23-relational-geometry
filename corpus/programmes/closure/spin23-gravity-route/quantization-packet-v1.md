# Critical Spin(2,3) / PGT Quantization Packet v1

**Frozen:** 22 October 2026

**Scope:** the fixed-spurion, constrained two-copy branch in its broken
Spin(2,3) phase. The gauged-copy branch is a different theory and is not
silently included.

**Purpose:** define one reproducible background-field convention for the
critical (0^-) Poincare-gauge sector. This packet defines every Lagrangian
and gauge-fixing choice needed to construct the quadratic operator. It does
not claim that the complete nonlinear second-class measure has already been
evaluated.

## 1. Geometry and orientation

Lorentzian signature is ((-+++)), (epsilon_{0123}=+1), and
(eta=*1). Internal indices are raised with
(eta_{ab}={\rm diag}(-1,1,1,1)). The independent fields after unitary
breaking are an invertible coframe (e^a) and metric-compatible connection
(omega^{ab}=-omega^{ba}):

\[
 T^a=de^a+\omega^a{}_b\wedge e^b,
 \qquad
 R^{ab}=d\omega^{ab}+\omega^a{}_c\wedge\omega^{cb}.
\]

Let (E_a\lrcorner e^b=\delta_a{}^b). Define the trace and axial one-forms

\[
 t=E_a\lrcorner T^a,
 \qquad
 p=*(e_a\wedge T^a),
\]

and freeze the three torsion projectors as

\[
 {}^{(2)}T^a={1\over3}e^a\wedge t,
 \qquad
 {}^{(3)}T^a=-{1\over3}*(e^a\wedge p),
 \qquad
 {}^{(1)}T^a=T^a-{}^{(2)}T^a-{}^{(3)}T^a.
\]

These equations, rather than a literature numbering convention, define the
packet's (a_1,a_2,a_3). The pseudoscalar curvature is

\[
 \widehat X=*(R_{ab}\wedge e^a\wedge e^b).
\]

Its overall normalization is fixed by this equation. No later rescaling of
(widehat X) is allowed without transforming its coupling and normal map.

## 2. Frozen action

With (eta_{ab}=*(e_a\wedge e_b)), the Lorentzian action is

\[
\begin{aligned}
S_L={}&{1\over2\kappa}\int R^{ab}\wedge\eta_{ab}
-{\Lambda\over\kappa}\int\eta\\
&+{1\over2\kappa}\sum_{I=1}^3a_I
 \int{}^{(I)}T^a\wedge *{}^{(I)}T_a
+{b_X\over2}\int\widehat X^2\eta+S_{\rm con},
\end{aligned}
\]

where (Lambda=-3/\ell^2). The critical surface is

\[
2a_1+a_2=0,
\qquad a_1+2a_3=0,
\qquad b_X\ne0,
\]

with every complementary curvature-square coefficient zero. The sign and
mass calibration is performed by expanding about the torsionless vacuum and
requiring

\[
 {1\over2}A S_\mu S^\mu
 +{1\over2}B(\bar\nabla_\mu S^\mu)^2,
 \qquad A>0,quad B>0,quad m_{0^-}^2=A/B.
\]

This calibration is part of the convention: it fixes the conversion from
((a_I,b_X,\kappa,\ell)) to the normalized axial field (S_\mu).

The constrained selector sector is

\[
 S_{\rm con}=\int\rho(V^2+\ell^2)+\int B_AW^A,
\]

with (V^A=\ell\delta^A_4), (W^A=0) imposed before the broken-phase
Hessian is formed. Its broken-gauge FP matrix is
(ell\delta^a{}_b), and its algebraic constraint Jacobian has rank six.
The resulting field-independent factors are retained in the normalization of
(Z), not counted as propagating determinants.

## 3. Background split

Use a torsionless Einstein background

\[
\bar T^a=0,
\qquad
\bar R^{ab}=-\ell^{-2}\bar e^a\wedge\bar e^b.
\]

The coframe split is exponential,

\[
e^a{}_{\mu}=\bar e^a{}_{\nu}[\exp(f)]^\nu{}_{\mu},
\]

and the independent connection split is affine,

\[
\omega^{ab}{}_{\mu}=\bar\omega^{ab}{}_{\mu}+k^{ab}{}_{\mu}.
\]

The metric fluctuation is (h_{\mu\nu}=2f_{(\mu\nu)}+O(f^2)).
The antisymmetric coframe fluctuation (f_{[ab]}) fixes local Lorentz
rotations. The selector fluctuation (v^a) fixes the four broken parent
rotations.

## 4. BRST differential and gauge fermion

The odd ghosts are the diffeomorphism vector (c^\mu), Lorentz scalar
(\lambda^{ab}=-\lambda^{ba}), and broken-parent scalar (u^a). With the
sign convention (s\omega={\cal L}_c\omega-D\lambda) and
(se={\cal L}_c e+\lambda e), use

\[
sc^\mu=c^\nu\partial_\nu c^\mu,
\qquad
s\lambda={\cal L}_c\lambda+\lambda^2.
\]

The parent transformation of (V) fixes (su) by the Spin(2,3) Lie
algebra; after unitary gauge its FP operator is the algebraic matrix
(ell\delta^a{}_b). Every antighost and Nakanishi--Lautrup field is a
BRST doublet, (s\bar c=b, sb=0), with analogous Lorentz and broken pairs.

Freeze

\[
F_\mu=\bar\nabla^\nu h_{\mu\nu}-{1\over2}\bar\nabla_\mu h,
\qquad
G_{ab}=f_{[ab]},
\qquad
H_a=v_a,
\]

and the gauge fermion

\[
\Psi=\int\bar\eta\left[
 \bar c^\mu(F_\mu+{\alpha\over2}b_\mu)
 +\bar\lambda^{ab}(G_{ab}+{\beta\over2}b_{ab})
 +\bar u^a(H_a+{\gamma\over2}b_a)
\right].
\]

The gauge-fixed action is (S_{\rm gf+gh}=s\Psi). The reference point is
(alpha=\beta=gamma=1). This formula defines all ghost and mixed vertices;
discarding the connection terms in (sG) or the Lie-derivative terms in
(sF) is not permitted. At the background, the propagating FP operator is

\[
(M_{\rm diff})_\mu{}^\nu
=-\bar\nabla^2\delta_\mu{}^\nu-\bar R_\mu{}^\nu,
\]

while the Lorentz and broken-parent FP blocks are algebraic and invertible.

## 5. Euclidean domain and contours

Bulk logarithmic divergences are defined on a smooth compact quotient of
Euclidean (H^4), with no physical boundary. Zero modes are removed from
primed determinants and treated by collective coordinates. This choice
avoids importing unlisted boundary counterterms. Lorentzian observables are
defined by analytic continuation back to AdS.

The Euclidean coframe traceless modes and the (SO(4)) connection are
integrated over their real slices. The conformal coframe direction uses the
standard steepest-descent imaginary contour. Multipliers (\rho,B_A) use
imaginary Fourier contours so their integrals impose delta functionals.
The positive-normalized pseudoscalar is real. Ghost and antighost variables
are independent Grassmann fields.

## 6. Measure and constrained-system rule

Use ultralocal background (L^2) metrics for (f) and (k), with all
dimensionful normalizations expressed through the subtraction scale (mu).
Every irreducible decomposition or change from connection to contorsion must
carry its induced Jacobian. The fundamental variables are (e,omega);
therefore no connection-to-contorsion Jacobian is silently set to one.

For comparison with the canonical critical theory, the phase-space measure
is required to contain

\[
\delta[\chi_A]\sqrt{\det\{\chi_A,\chi_B\}},
\]

for the complete second-class set. The published massive (0^-) bracket
block proves nonvanishing rank, but the repository does not yet contain all
34 constraints and their full field-dependent bracket matrix in this
packet's convention. This factor is therefore the sole non-executable input
of v1. It must not be replaced by the known sub-block.

## 7. Renormalization and quotient

Use dimensional regularization in (d=4-2\epsilon), background-field
(\overline{\rm MS}), and record the unquotiented local divergence first.
The basis includes all parity-even (R^2,T^2,(DT)^2,RDT) invariants generated
at the calculated derivative order. Only afterward quotient Euler and other
topological densities, BRST-exact terms, and terms removable by explicitly
listed local field redefinitions. Equation-of-motion removal is allowed only
for on-shell observables and must be labelled as such.

For the first displayed shell, order the coupling coordinates as

\[
g=(t_1,t_2,t_3,c_C,c_R,c_X,c_4,c_5,c_6,z_q)
\]

and project with

\[
Cg=(2t_1+t_2, t_1+2t_3, c_C, c_R, c_4, c_5, c_6, z_q).
\]

The fixed-spurion branch omits the last coordinate; it is retained in joined
ledgers only to compare the gauged-copy alternative.

## 8. Matching observables

Running gravitational coefficients are matched to background 1PI vertices.
The pseudoscalar mass and residue are matched to the pole and derivative of
the gauge-invariant (widehat X)-(widehat X) two-point function. A proposed
fixed point is admissible only after the physical graviton and pseudoscalar
spectral measures remain nonnegative.

## 9. v1 execution boundary

The action, projectors, split, gauge fermion, ghost definition, local measure,
Euclidean domain, contours, subtraction scheme, counterterm ordering, normal
map and observables are now frozen. The next executable operation is the
quadratic Hessian and principal-symbol factorization.

The next non-executable operation is the claimed *complete* off-shell one-loop
functional: that requires the full 34-by-34 second-class bracket operator (or
a demonstrated covariant BV conversion) in these conventions.
