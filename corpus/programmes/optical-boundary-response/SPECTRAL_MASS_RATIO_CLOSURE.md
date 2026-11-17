# Spectral coefficients, finite-operator shape and a conditional mass ratio

**Date:** 8 November 2026  
**Status:** bounded corpus and primary-source audit; new flat one-scalar heat-kernel calculation; no selected physical T1/T2 spectrum  
**Parent:** [Yukawa/vacuum-scale investigation](YUKAWA_VACUUM_SCALE_SELECTION.md)  
**Evidence:** [coefficient and shape calculation](../../../evidence/data/spectral-mass-ratio-closure-v1.json), [source-check receipts](../../../evidence/data/spectral-mass-ratio-source-checks-v1.json)  
**Certificate:** [mass-ratio verifier](../../../verification/verify/verify_spectral_mass_ratio_closure.py)

A reference mass can remove an unknown scale only if the same declared action determines both masses. This continuation first computes such a ratio in a restricted Dirac/scalar model, then checks whether the corpus actually selects that model and its finite spectrum.

## 1. Primary-source boundary

The [spectral Pati–Salam paper](https://arxiv.org/html/1507.08161), equations (2)–(3) and (12)–(21), specifies a cutoff function and a finite Dirac operator. Its reality and grading conditions constrain block support while leaving nonzero entries free. Its gauge-coupling analysis uses boundary matching, rather than deriving every finite Yukawa matrix.

[Connes–Marcolli, sections 17.1 and 17.12](https://alainconnes.org/wp-content/uploads/bookwebfinal-2.pdf#page=262), give coefficient relations and describe the remaining Yukawa parameters as coordinates on a finite-Dirac moduli space. Geometric encoding is consequently stronger than an arbitrary list of interactions but is not automatically a dynamical selection of that point.

The corpus's [claim 1110](../../claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md) establishes kinetic and quartic trace constraints. The calculation below adds a specific flat Dirac operator; it is not attributed to that claim as an already derived T1/T2 action.

## 2. Compute the coefficient ratio rather than supplying it

Use a flat four-dimensional Euclidean Dirac operator

\[
D=i\gamma^\mu\partial_\mu+\gamma_5\Phi,
\qquad \Phi=uC=\Phi^\dagger,
\qquad \{\gamma^\mu,\gamma^\nu\}=2\delta^{\mu\nu}.
\]

Here \(u\) is one real scalar and \(C\) is a fixed Hermitian finite matrix. A chiral off-diagonal embedding reproduces the corresponding singular-value trace ratios with a common multiplicity factor. It does not itself identify a physical chiral matter representation.

The square is

\[
D^2=-\partial^2+E,\qquad
E=\Phi^2+i\gamma^\mu\gamma_5\partial_\mu\Phi.
\]

Spin traces give

\[
\operatorname{tr}_{\rm spin}E=4\Phi^2,\qquad
\operatorname{tr}_{\rm spin}E^2
=4\Phi^4+4\sum_\mu(\partial_\mu\Phi)^2.
\]

After discarding integrated total derivatives, the flat heat coefficients are proportional to \(-\operatorname{Tr}E\) and \(\tfrac12\operatorname{Tr}E^2\). Use the moment convention

\[
f_0=f(0),\quad f_2=\int_0^\infty x f(x)\,dx,\quad
f_4=\int_0^\infty x^3f(x)\,dx.
\]

For \(\operatorname{Tr}f(D/\Lambda)\), the scalar terms through this order are

\[
\frac{1}{16\pi^2}\left[
2f_0Z(\partial u)^2-8f_2\Lambda^2Zu^2+2f_0Wu^4
\right],
\quad Z=\operatorname{Tr}C^2,\ W=\operatorname{Tr}C^4.
\]

Matching the preceding comparison action yields

\[
k=\frac{f_0}{4\pi^2},\qquad
a=\frac{f_2}{\pi^2},\qquad
b=\frac{f_0}{2\pi^2}.
\]

The relative kinetic/quartic coefficient is now derived within this explicit model. For the canonical scalar fluctuation about its nonzero minimum,

\[
m_{\rm scalar}^2=\frac{2a\Lambda^2}{k}
=8\frac{f_2}{f_0}\Lambda^2,
\qquad
\Delta_i^2=2\frac{f_2}{f_0}\Lambda^2\frac{r_i}{\rho},
\]

so

\[
\boxed{\frac{\Delta_i^2}{m_{\rm scalar}^2}
=\frac14\frac{r_i}{\rho}},\qquad
r_i=s_i^2/Z,\quad\rho=\sum_i r_i^2.
\]

For a single active channel this is \(\Delta/m_{\rm scalar}=1/2\). The result is a tree-level, truncated-action relation. It is not a Standard-Model Higgs prediction or a physical T1/T2 identification. Additional scalars, curvature terms, weighted traces, kinetic mixing and thresholds require recalculating the relevant coefficients and mass eigenmodes.

## 3. What cutoff freedom does and does not invalidate

At fixed \(\Lambda\), positivity and smoothness do not fix \(a/b\). Consider the even, positive, rapidly decreasing profiles

\[
f_\epsilon(x)=e^{-x^2}(1-\epsilon x^2+\epsilon x^4/3),
\qquad \epsilon=0,\tfrac12,\tfrac34.
\]

All have \(f_0=1\), \(f_4=1/2\), and are monotonically decreasing for \(x>0\), but

\[
f_2=\tfrac12-\tfrac\epsilon6.
\]

Thus even fixing the gauge-normalization moment and leading volume moment leaves the quadratic/quartic ratio variable. This does not invalidate the boxed scalar-reference ratio: its common moment dependence cancels. A cutoff counterexample is not a proof that every dimensionless mass ratio remains free.

A gravitational reference may also cancel a common quadratic moment, but has additional data. Equation (1.785) of Connes–Marcolli includes finite-Majorana trace corrections in the Einstein and Higgs quadratic coefficients, plus a nonminimal Higgs–curvature term in the action. Identifying the bare Einstein coefficient with a measured Planck mass requires the vacuum contribution, running and counterterms. The corpus's [induced-gravity preflight](../lattice-subroutine-gravity/induced-action-preflight.md) separately shows why field counts alone do not fix that normalization.

## 4. Shape selection requires a variational principle for the finite operator

The current kinetic/quartic constraints do not fix \(r_i\). At fixed \(Z=1\), two full-rank shapes give

\[
r=(1/2,1/2):\quad \Delta_{\min}/m_{\rm scalar}=1/2,
\]

\[
r=(4/5,1/5):\quad \Delta_{\min}/m_{\rm scalar}=\sqrt{5/68}\simeq0.27116.
\]

Both obey the same support, rank and positive-normalization requirements. The difference persists after the coefficient and cutoff cancellations.

There is a conditional way to select equal singular values. If \(X=C^\dagger C\) is itself varied over all positive matrices at fixed \(\operatorname{Tr}X=Z\), minimizing \(\operatorname{Tr}X^2\) gives \(X=(Z/N)I_N\), since

\[
\operatorname{Tr}X^2=Z^2/N+\operatorname{Tr}(X-(Z/N)I)^2.
\]

But the spectral action's use of \(D_F\) as geometric input does not itself make every entry a dynamical field. Nor is a fixed-trace shape optimization equivalent to minimizing the scalar potential after the scalar vacuum readjusts. In the latter comparison, the minimum potential is proportional to \(-1/\rho\) at fixed \(Z\), so the same equal-shape preference occurs in this simple truncation, but its physical legitimacy still requires the permitted variation, measure and full field content.

A rank-one projector alone cannot supply a nontrivial family orientation; [claim 1196](../../claims/1100-1199/1196_no_u3_covariant_effective_action_of_one_projector_can_select_its_orientation_so_closure_requires_a_second_family_tensor.md) requires another family tensor. Orientation and eigenvalue shape are distinct gates.

The rank-one complement condition also must not be exaggerated. [Claim 1111](../../claims/1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md) constructs

\[
M_R=\begin{pmatrix}a&x&y\\x&d&0\\y&0&0\end{pmatrix},
\qquad \det M_R=-dy^2.
\]

The rank-one complementary block can coexist with a fully massive complete operator. Cross-block coefficients restore rank while leaving a continuous spectral-shape freedom. Earlier statements about a zero in the isolated two-dimensional block remain valid only for that block.

## 5. The full-action validity test matters

A selected extremum of a truncated heat expansion is not automatically an extremum of the full spectral action. For the Gaussian profile in flat space with constant mass \(m\), the exact density of the simple free Dirac model is proportional to

\[
\Lambda^4e^{-m^2/\Lambda^2}.
\]

It decreases strictly with \(m^2\). Its quartic expansion \(1-s+s^2/2\), \(s=m^2/\Lambda^2\), instead has a minimum at \(s=1\), where the small-mass expansion is not controlled. This is a negative control for this model, not a theorem that every spectral action lacks a vacuum. It prevents calling its truncated equal-mass minimum a full-action spectral selection. Extra physics or a controlled EFT domain must stabilize and justify the vacuum.

## 6. Decision and next discriminator

The strongest result is now conditional and quantitative: the common flat Dirac/scalar heat coefficient predicts \(\Delta_i/m_{\rm scalar}\) once its finite spectral shape is fixed. No cutoff fitting is needed for that ratio in this restricted action.

The inspected corpus does not yet derive the physical T1/T2 finite operator, make its required shape variations dynamical, or establish a controlled selected vacuum and a physical reference scalar in the same theory. The next calculation must provide that action and variation domain, then demonstrate a unique or bounded positive singular-value shape without fitting the target masses. It must also show the relation survives full-action/EFT validity checks, canonical mode mixing and threshold transport.

The [full-action continuation](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md) strengthens the Gaussian warning to any nonnegative integrable cutoff in the flat constant-mass four-dimensional model. It also proves full-action equal-shape selection under a supplied hard radius, notes that the constraint removes the earlier radial reference, and tests a stable soft stabilizer whose parameters change the mass ratio. The corpus's dynamical-link route is explicit, but its selecting response potential remains open.
