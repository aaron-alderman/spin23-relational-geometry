# Degree eight is the first generic nonaligning two-Yukawa invariant, and it can support an interior mixing vacuum

## Main result

The minimal dynamical-Yukawa no-go can be sharpened and partially escaped.

Let

\[
A=Y_eY_e^\dagger,
\qquad
B=Y_\nu Y_\nu^\dagger
\]

transform by common conjugation under \(U(3)_L\). With fixed nondegenerate spectra:

1. every relative-orientation invariant through total degree six in \(Y_e,Y_\nu\) is linear in the doubly stochastic matrix \(|U_{ij}|^2\), so its extrema occur at permutation alignment or on degeneracy-induced flat faces;
2. at degree eight, nonlinear presentations first appear through \((\operatorname{Tr}AB)^2\) and \(\operatorname{Tr}(ABAB)\), but an exact \(3\times3\) trace identity leaves only one independent nonlinear generator after fixed-spectrum terms are removed;
3. a degree-eight commutator presentation can produce a stable non-permutation minimum on a restricted one-angle slice, while the complete four-dimensional three-family orbit necessarily retains at least three flat directions at any generic interior stationary point.

Thus degree eight is the first polynomial order at which a restricted slice can escape permutation alignment without a new field, but it is not sufficient for an isolated full three-family mixing vacuum. Document 1209 supplies the exact correction.

## 1. Why degrees four and six align

At degree four in Yukawa fields, the orientation-sensitive invariant is

\[
\operatorname{Tr}(AB).
\]

Writing

\[
A=\operatorname{diag}(a_i),
\qquad
B=U\operatorname{diag}(b_j)U^\dagger,
\]

gives

\[
\operatorname{Tr}(AB)=\sum_{ij}a_i b_j|U_{ij}|^2.
\]

At degree six, the new mixed single traces are

\[
\operatorname{Tr}(A^2B),
\qquad
\operatorname{Tr}(AB^2),
\]

and products of lower traces. Their orientation dependence remains

\[
\sum_{ij}f(a_i)g(b_j)|U_{ij}|^2.
\]

They are linear functionals on the unistochastic subset of the Birkhoff polytope. Global extrema still occur at permutation matrices, with continuous degeneracies only when spectra or coefficients fail to distinguish directions.

Separate determinant terms can constrain singular values and axial phases, but under the full independent right-handed flavour groups they do not create a new relative left-handed frame invariant.

## 2. The first noncommutativity-sensitive single-trace invariant

At degree eight the full invariant ring also contains the nonlinear multi-trace term \((\operatorname{Tr}AB)^2\). It depends only on the square of the earlier alignment statistic and cannot distinguish two frames having the same \(\operatorname{Tr}AB\).

The new mixed single-trace word classes include

\[
\operatorname{Tr}(A^2B^2),
\qquad
\operatorname{Tr}(ABAB).
\]

Their difference is the commutator norm:

\[
\boxed{
\|[A,B]\|_{\rm HS}^2
=2\left(\operatorname{Tr}(A^2B^2)-\operatorname{Tr}(ABAB)\right).
}
\]

This vanishes exactly when \(A\) and \(B\) commute. The alternating word \(\operatorname{Tr}(ABAB)\) is therefore the first single-trace structure that distinguishes commuting from noncommuting relative frames beyond a Birkhoff-linear statistic.

## 3. Explicit interior minimum

Restrict to a real rotation in the \(1\)-\(2\) plane:

\[
B(\theta)=R_{12}(\theta)
\operatorname{diag}(b_1,b_2,b_3)
R_{12}(\theta)^T.
\]

Let

\[
\Delta_a=a_1-a_2,
\qquad
\Delta_b=b_1-b_2.
\]

Then

\[
\|[A,B(\theta)]\|_{\rm HS}^2
=\frac12\Delta_a^2\Delta_b^2\sin^2(2\theta).
\]

Consider the fixed-spectrum orientation potential

\[
V(\theta)
=\lambda\operatorname{Tr}(AB(\theta))
-\kappa\|[A,B(\theta)]\|_{\rm HS}^2,
\qquad \kappa>0.
\]

With \(x=\cos2\theta\), its orientation-dependent part is

\[
V(x)=
\frac{\lambda\Delta_a\Delta_b}{2}x
+\frac{\kappa\Delta_a^2\Delta_b^2}{2}x^2
+\text{constant}.
\]

It has the stable interior minimum

\[
\boxed{
x_*=\cos2\theta_*
=-\frac{\lambda}{2\kappa\Delta_a\Delta_b}
}
\]

whenever

\[
|\lambda|<2\kappa|\Delta_a\Delta_b|.
\]

This is neither alignment nor a permutation unless the parameters reach the boundary. For \(\lambda=0\), the minimum is maximal two-family mixing, \(\theta_*=\pi/4\).

## 4. What this does and does not solve

This construction proves restricted-slice nonalignment, not a full-family isolated vacuum or a prediction.

It shows that:

- two dynamical Yukawa bifundamentals can support a noncommuting stationary slice without a third flavon;
- polynomial degree eight is the first order at which their relative-frame potential can be nonlinear, but the complete \(3\times3\) trace identities reduce that nonlinearity to one scalar direction;
- permutation alignment is a property of the minimal lower-degree potential, not an unavoidable theorem for all two-Yukawa dynamics.

It does not determine:

- why the commutator coefficient has the sign needed to favour noncommutativity;
- the value of \(\lambda/\kappa\);
- all three PMNS angles or the CP phase;
- the radial stabilization of the Yukawa fields;
- compatibility with the Majorana sector, radiative stability and phenomenology.

On the full noncompact field space, negative commutator energy must be accompanied by positive degree-eight or higher radial terms. On a fixed-spectrum orbit the orientation space is compact and the displayed potential is bounded.

## 5. Revised frontier

The flavour branch has a precise first opening and a newly proved obstruction:

\[
\boxed{
\text{degree }<8:\ \text{permutation or flat},
\qquad
\text{degree }8:\ \text{slice nonalignment is possible, but full isolation is impossible}.
}
\]

The next calculation is therefore above degree eight: classify the first invariant order capable of supplying full-rank curvature on the four-dimensional relative-frame space, while retaining boundedness, radial stabilization and the degree-twelve CP-orientation data. A successful model must then feed its left-handed Hermitian response into the projector fixed-point equation rather than treating \(P\) as a separate choice.

