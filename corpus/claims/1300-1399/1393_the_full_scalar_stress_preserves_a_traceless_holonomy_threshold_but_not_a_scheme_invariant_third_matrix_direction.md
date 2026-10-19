# The displayed improved scalar stress preserves a traceless holonomy threshold, while its integrated third matrix statistic depends on \(\xi_\chi\)

> **Scope qualification:** the demonstrated invariance is within the displayed one-parameter improvement family of the free localized-scalar fixture. The curvature coefficient \(\xi_\chi\) may be a matched Wilson coupling distinguishing theories, not merely a choice of renormalization convention. The computed cancellation applies to the integrated third-direction statistic, not automatically to every frequency-resolved matrix.

**Date:** 20 October 2026  
**Status:** complete flat-space improved-stress and scheme audit for the conditional localized reader; full bulk/defect embedding remains open  
**Role:** sharpen A7 and A11 after results 1232 and 1392

## Result in one sentence

Replacing the gradient-only probe by the full flat-space Hilbert stress tensor of
the localized charged scalar preserves a positive, CP-even, holonomy-shifted pair
spectrum, and its traceless channel \(T_{xx}-T_{yy}\) has a scheme-invariant onset
shift from \(2.56125\) to \(1.74426\); however the orientation-odd third direction
of the full two-probe matrix is a trace--traceless cross response that an allowed
scalar improvement can tune to zero, so one curvature-coupling normalization and
one operational port map are still required.

## 1. Everyday picture

A strain gauge can squeeze a sheet in two ways. One control changes its area by
squeezing both axes together. Another changes its shape by squeezing one axis and
stretching the other.

The definition of the first control can be shifted by how the material responds to
curvature. That is the stress-tensor “improvement” freedom. The shape-changing
control is different: adding the same amount to both axes cancels when one axis is
subtracted from the other.

The previous third direction mixed these two controls. This audit asks which part
is still present after every allowed change of convention.

## 2. Effective defect action and canonical normalization

Result 1292 gives a conditional normalizable transverse wavefunction \(\psi_0(y)\)
with

\[
\int dy\,|\psi_0(y)|^2=1.
\]

Writing \(\Phi(x,y)=\psi_0(y)\chi(x)+\cdots\) therefore gives a canonically
normalized complex scalar \(\chi\) on the \(2+1\)-dimensional defect. The fullest
curved-defect quadratic action available without inventing new interactions is

\[
S_\Sigma=-\int_\Sigma d^3x\sqrt{-\gamma}\left[
\gamma^{ij}(D_i\chi)^*D_j\chi+M^2|\chi|^2
+\xi_\chi R[\gamma]|\chi|^2
\right].
\]

The last coefficient is not fixed by flat-space dynamics. It is exactly the
improvement ambiguity identified in A7 result 1232.

Varying the induced metric gives

\[
t_{ij}=(D_i\chi)^*D_j\chi+(D_j\chi)^*D_i\chi
-\gamma_{ij}\left[(D\chi)^*D\chi+M^2|\chi|^2\right]
+\xi_\chi(\gamma_{ij}\Box-\nabla_i\nabla_j+G_{ij})|\chi|^2,
\]

up to the declared sign convention and equation-of-motion representatives. In
flat space \(G_{ij}=0\), but the derivative improvement still changes correlators.

## 3. Full pair vertex

Use the finite square-torus modes of result 1392,

\[
E^2=M^2+K_x+K_y,
\]

and evaluate an integrated diagonal spatial stress at zero external spatial
momentum and pair frequency \(\omega=2E\). The particle--antiparticle matrix
element is

\[
\boxed{
v_a(\xi_\chi)
={K_a-E^2\over E}+2\xi_\chi E
={K_a+(2\xi_\chi-1)E^2\over E},
\qquad a=x,y.}
\]

The first term combines the spatial gradient, temporal kinetic, mass and metric
density pieces omitted by the gradient-only probe. The second comes from the
curvature improvement.

The exact positive-frequency spectral measure becomes

\[
\rho_{ab}(\omega>0)
=2\pi\sum_k
\coth\!\left({\beta E_k\over2}\right)
v_a(k)v_b(k)\,\delta(\omega-2E_k).
\]

Each atom remains a positive outer product for every real \(\xi_\chi\). KMS,
causality, CP equality of \(h=1,2\), and the pole locations therefore survive the
replacement by the full tensor.

## 4. The elementary stress Ward check

At total pair momentum \(q=(2E,0,0)\), conservation requires the vacuum-to-pair
matrix element of the integrated energy density to vanish. The minimal tensor
gives

\[
v_{00}=-E+{K_x+K_y+M^2\over E}=0.
\]

The improvement contributes

\[
\xi_\chi(\eta_{00}\Box-\partial_0^2)|\chi|^2=0
\]

at zero spatial momentum. The executable residual is below
\(9\times10^{-16}\). This closes the elementary defect-mode energy Ward check; it
does not close the distributional bulk/defect Ward identity.

## 5. Bulk, defect and displacement bookkeeping

For a thin defect at \(y=0\), varying both the ambient metric and the embedding
has the schematic distributional identity

\[
\partial_\mu T_{\rm bulk}^{\mu\nu}
+\delta(y)\left(delta_i^{\nu}\partial_jt_{\rm def}^{ji}
-n^\nu\mathcal D\right)
=\text{background-source forces}.
\]

Tangentially, defect momentum nonconservation is balanced by the jump in normal
bulk momentum flux and gauge-source forces. Normally, the displacement operator
\(\mathcal D\) measures the force required to move the wall.

For the symmetric kink of result 1292, the reader mass well depends on \(\eta^2\)
and its first normal derivative vanishes at the wall center. That removes the
classical linear force from this one term. It does not remove:

- wall tension and bending response;
- reader backreaction on the kink;
- flux from the bulk gauge and scalar sectors;
- boundary/edge energy associated with the finite fold;
- quantum mixing and displacement contact terms.

Pure BF theory has zero Hilbert stress because it is metric independent. Any edge,
source or charged-reader stress belongs to the added boundary or matter action,
not to the BF term itself. The available action does not yet specify enough
boundary and embedding data to close the full identity above.

## 6. Improvement, mixing and contact freedom

Three distinct freedoms must not be conflated.

### 6.1 Improvement

The curvature term shifts both diagonal vertices equally:

\[
\delta v_x=\delta v_y=2\,\delta\xi_\chi E.
\]

It changes genuine nonlocal trace-channel spectral weight. It is therefore not
merely a coincident contact convention.

### 6.2 Operator representatives

The renormalized tensor may mix with equation-of-motion operators, total
derivatives and symmetry-compatible trace operators. Equation-of-motion changes
drop out of separated on-shell matrix elements; total derivatives reduce to the
same improvement issue at this order. Their coefficients still require a declared
renormalization prescription.

### 6.3 Local contacts

Local metric counterterms include defect cosmological and Einstein terms and,
within an effective cutoff, higher-curvature/source-derivative terms. A permitted
parity-odd gravitational contact may also be present. They add momentum
polynomials or coincident distributions to the response.

Such local terms can move the real polynomial part of \(\chi\), but they cannot
create, move or cancel a separated-frequency branch cut or delta-function
absorption atom. The spectral discontinuity is contact-scheme invariant. Its
matrix weight is not automatically improvement invariant.

## 7. What happens to the third direction

Introduce trace and traceless vertices

\[
v_T=v_x+v_y,
\qquad
v_S=v_x-v_y.
\]

Then

\[
\boxed{v_S={K_x-K_y\over E}}
\]

is exactly independent of \(\xi_\chi\), while \(v_T\) changes with it.

In the original \((T_{xx},T_{yy})\) matrix, the part odd under exchanging the
prepared \(x\) and \(y\) cycles is equivalent to the trace--traceless cross
spectrum \(\rho_{TS}\). Since the trace vertex changes, the full third matrix
direction is not scheme invariant.

The verifier makes this failure constructive. In the normalization above,

\[
R_{\rm orient,-}(\xi=0)=
\begin{pmatrix}
-0.102546&0\\0&0.102546
\end{pmatrix},
\]

while the allowed value

\[
\boxed{\xi_\chi=1.02929398}
\]

tunes the integrated orientation-odd matrix to zero within
\(9\times10^{-14}\). No pathology occurs: every spectral atom remains positive.

Therefore:

\[
\boxed{\text{the full two-probe third direction does not survive every allowed
stress-tensor scheme.}}
\]

This does not mean that the holonomy effect disappears. It identifies which part
was convention dependent.

## 8. Sharp scheme-invariant remnant

Project onto the traceless spatial stress

\[
S=T_{xx}-T_{yy}.
\]

Its positive-frequency spectral measure is

\[
\rho_{SS}(\omega>0)=2\pi\sum_k
\coth\!\left({\beta E_k\over2}\right)
{(K_x-K_y)^2\over E_k^2}\,
\delta(\omega-2E_k).
\]

This quantity is:

- positive;
- independent of \(\xi_\chi\);
- unaffected by real local polynomial contacts;
- identical for the CP-conjugate \(h=1,2\) sectors;
- sensitive to the holonomy-shifted mode support.

For \(N=6\), \(M=0.8\), \(\beta=1.3\), its first visible threshold is

\[
\omega_{S,h=0}=2.56124969,
\]

whereas

\[
\boxed{\omega_{S,h=1}=\omega_{S,h=2}=1.74426461.}
\]

The shift \(0.81698508\) survives every scalar improvement and every local contact
scheme in the audited class. It is the strongest current A11 observable.

What it retains is the magnitude of anisotropic absorption selected by a prepared
cycle. Because an autocorrelation squares \(S\), it does not retain the sign that
distinguishes an \(x\)- from a \(y\)-oriented preparation. Recovering that sign
requires the trace--traceless cross response, and hence the missing improvement
normalization.

## 9. Minimal missing physical normalization

Only one new scalar number is needed to remove the flat-space stress ambiguity at
this order:

\[
\boxed{\xi_\chi,\text{ the coefficient of }R[\gamma]|\chi|^2.}
\]

Equivalently, impose one renormalization condition fixing a reference matrix
element of the trace stress relative to the traceless strain port. Examples are a
declared value of \(\langle k,-k|T^i{}_i|0\rangle\) at one reference energy, or a
microscopic matching calculation for \(\xi_\chi\).

After that, a physical experiment still needs one common calibrated map from its
two laboratory deformations to the trace and traceless metric strains. This map
must be fixed without looking at the holonomy labels. A sector-dependent map would
manufacture the desired third direction and is inadmissible.

## 10. A7/A11 verdict

The fuller tensor improves the programme in two ways. It validates a genuine
scheme-invariant real-time remnant, and it prevents the stronger matrix claim from
being overstated.

The present conclusions are:

1. the localized reader's elementary Hilbert stress and energy Ward check are
   conditionally constructed;
2. the full bulk/defect/displacement Ward identity remains open;
3. local contacts cannot erase the separated-frequency absorption support;
4. the holonomy-dependent traceless threshold shift is scheme invariant;
5. the orientation-odd third \(H_2\) matrix direction is not invariant until
   \(\xi_\chi\) and the physical port map are fixed;
6. CP still forbids an \(h=1\) versus \(h=2\) difference in this model;
7. physical admission remains false.

The appropriate preregistered target is therefore hierarchical: first test the
scheme-invariant \(T_{xx}-T_{yy}\) threshold shift; only then, after trace-port
matching, test the signed third matrix direction.

## Artifacts

- `evidence/data/spin23-a7-a11-improved-stress-scheme-audit.json`
- `verification/verify/verify_spin23_a7_a11_improved_stress_scheme_audit.mjs`
- `corpus/claims/1300-1399/1392_the_static_reader_covariance_does_not_analytically_continue_but_an_orientation_odd_pair_spectrum_retains_a_third_direction.md`
- `corpus/claims/1200-1299/1232_the_candidate_action_has_a_conditional_classical_stress_tensor_but_a7_stops_at_improvement_contacts_and_physical_probe_normalization.md`

