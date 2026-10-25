# The Two-Copy Spin(2,3) Compensator Can Be Frozen Exactly, but Quantum Closure Needs a New Protecting Principle

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** explicit constrained action; complete quadratic physical-sector and constraint-rank census on torsionless AdS; finite one-loop non-closure proof

**Depends on:** [the constrained one-compensator quotient](../../programmes/closure/spin23-gravity-route/README.md), [the critical healthy pseudoscalar PGT class](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md), and [the AdS and radiative stress test](1607_the_gapped_0minus_torsion_mode_survives_ads_and_hyperbolicity_but_not_radiative_closure.md)

**Evidence:** [frozen-action ledger](../../../evidence/data/spin23-two-copy-constrained-ads-spectrum-and-closure-v1.json) and [verifier](../../../verification/verify/verify_spin23_two_copy_constrained_ads_spectrum_and_closure.mjs)

## Result

The corrected two-vector carrier can be joined to an independent
`Spin(2,3)` connection without leaving an unresolved second compensator.
Choose orthonormal multiplicity vectors (n^I,m^I), (I=1,2), and write

\[
 V^A=n^IY_I^A,\qquad W^A=m^IY_I^A.
\]

The algebraic multiplier equations

\[
 V^2=-\ell^2,\qquad W^A=0
\]

remove the radial direction and all five components of the orthogonal copy.
The four tangent components of (V) are the four broken
`Spin(2,3)/Spin(1,3)` gauge directions. Thus the ten original vector
components leave no local compensator degree of freedom.

This is an exact resolution, but it is an **imposed constraint**, not a
derived consequence of `Spin(2,3)`. The fixed multiplicity ray (n^I) is a
spurion. Neither the gauge group nor the current finite carrier supplies a
local copy rotation that makes different choices of (n^I) gauge equivalent.

On the natural torsionless AdS background, the critical parity-even
Poincare-gauge completion factorizes at quadratic order. Its complete reduced
physical spectrum is

\[
 \boxed{2\ \text{healthy massless AdS graviton helicities}
 +1\ \text{healthy massive }0^-\text{ torsion pseudoscalar}.}
\]

All other connection, coframe, compensator and multiplier components are
gauge, constrained or algebraic. This spectrum passes the quadratic residue,
Breitenlohner--Freedman, characteristic and known nonlinear constraint-rank
tests. It does not define a radiatively closed quantum theory: the scalar
pole alone generates nonzero (C^2) and (R^2) counterterms, while the
critical PGT action sets five curvature couplings to zero and imposes two
unprotected torsion relations. The finite programme therefore ends at a
genuine missing principle: a symmetry or UV prescription must protect both
the multiplicity projector and the critical coupling surface.

## Frozen independent-connection action

Let ({\cal A}^{AB}) be an independent `Spin(2,3)` connection with curvature
(F^{AB}). The covariant coframe is the tangent part of (E^A=DV^A).
When (E^A) is nondegenerate, (V) defines the Lorentz projector, Hodge star
and the three irreducible torsion pieces (T^{(i)A}). Let ({}^pR) denote the
pseudoscalar irreducible curvature, normalized so that its first variation on
a torsionless background is the covariant divergence of axial torsion.

A minimal action realizing the surviving critical class is

\[
\begin{aligned}
S={}&{\ell\over8\kappa}\int\epsilon_{ABCDE}V^E
F^{AB}\wedge F^{CD}\\
&+{1\over2\kappa}\int\sum_{i=1}^3a_i
T^{(i)}_A\wedge\star T^{(i)A}
+{b_3\over2}\int {}^pR\wedge\star{}^pR\\
&+\int \rho\,(V^2+\ell^2)+\int B_AW^A ,
\end{aligned}
\]

where (\rho) and (B_A) are four-form multiplier densities and

\[
 a_2=-2a_1,\qquad a_3=-\frac12a_1,
\]

with all five complementary irreducible curvature-square coefficients zero.
The first line supplies Einstein--Cartan gravity with
(Lambda=-3/\ell^2) plus Euler. The second line is the smallest known
critical first-order completion retaining only the (0^-) connection pole.
The last line freezes the two-copy compensator sector.

Numerical (a_i) conventions differ across the PGT literature. The invariant
content used below is the positive-normalized axial reduction

\[
 A={a_0-a_1\over\ell^2}>0,\qquad B=-{b_3\over\kappa}>0.
\]

The action is local and covariant once (n^I) is treated as a fixed
multiplicity spurion. Spurion covariance does not turn the chosen ray into a
dynamical prediction.

## Exact second-copy and compensator count

Linearize around

\[
 \bar V^A=\ell\delta^A_4,\qquad \bar W^A=0.
\]

For the ten fluctuations ((\delta V^A,\delta W^A)), the linear constraint
Jacobian has rank

\[
 \operatorname{rank}d(V^2+\ell^2,W^A)=1+5=6.
\]

Its tangent space consists only of the four components (delta V^a). The
broken gauge map

\[
 \delta_\theta V^a=\ell\theta^{a4}
\]

has rank four and its image equals that tangent space. Equivalently, the six
constraint rows plus four unitary-gauge rows form a rank-ten matrix. Hence

\[
 10-6-4=0.
\]

This closes the vector-copy count. It does not explain why Nature chooses
(n^I): replacing (W=0) by the simplest bounded `Spin(2,3)`-invariant
two-vector potential was already shown not to select the aligned timelike
vacuum.

## Natural AdS background and gauge fixing

The added terms vanish on

\[
 \bar T^A=0,\qquad {}^p\bar R=0,\qquad
 \bar R^{ab}=-\ell^{-2}\bar e^a\wedge\bar e^b,
\]

so the same action admits the natural AdS solution. Use unitary gauge
(delta V^a=0), symmetric-vierbein Lorentz gauge (f_{[\mu\nu]}=0), and
background de Donder gauge

\[
 \bar\nabla^\nu h_{\mu\nu}-{1\over2}\bar\nabla_\mu h=0.
\]

The broken-gauge Faddeev--Popov map is the algebraic rank-four matrix
(ell\delta^a{}_b). Residual Lorentz and diffeomorphism ghosts remove only
gauge-orbit determinants; they are not physical poles. The multiplier pairs
enforcing the norm and (W=0) are algebraic.

Decompose the independent connection into the Levi--Civita part plus
contorsion. Its 24 components split as

\[
 24=4_{\rm trace}+4_{\rm axial}+16_{\rm tensor}.
\]

The critical equalities keep the trace and tensor blocks algebraic and give
the axial block

\[
 {A\over2}S_\mu S^\mu+{B\over2}(\bar\nabla_\mu S^\mu)^2.
\]

Only its longitudinal component propagates. Introducing an auxiliary
pseudoscalar and eliminating (S_\mu) gives

\[
 {\cal L}_{0^-}^{(2)}=-{1\over2A}(\bar\nabla\chi)^2
 -{1\over2B}\chi^2,
 \qquad m_{0^-}^2={A\over B}.
\]

Parity and maximal symmetry forbid quadratic mixing between this odd scalar
and the even metric sector. The physical equations are

\[
 (\bar\Box+2/\ell^2)h_{\mu\nu}^{\rm TT}=0,
 \qquad (\bar\Box-m_{0^-}^2)\varphi=0.
\]

## Complete quadratic census

| sector | raw components | reduction | physical local degrees |
|---|---:|---|---:|
| two vector copies | 10 | six algebraic constraints plus four broken gauges | 0 |
| vierbein | 16 | six Lorentz gauges; metric diffeomorphism and Einstein constraints | 2 |
| trace contorsion | 4 | nondegenerate algebraic block | 0 |
| tensor contorsion | 16 | nondegenerate algebraic block | 0 |
| axial contorsion | 4 | velocity rank one; six second-class phase-space constraints | 1 |
| multipliers and BRST ghosts | auxiliary/Grassmann | constraints or gauge volume | 0 |

The independent-connection Hamiltonian confirmation starts with 80 phase-space
variables and has 20 first-class plus 34 second-class constraints:

\[
 {80-2(20)-34\over2}=3.
\]

Its relevant nonlinear Dirac determinant is

\[
 \det\Delta=J^{-12}
 \left[\left({{}^p\!\pi\over6J}\right)^2+m_c^2\right]^6>0
\]

for a nondegenerate spatial coframe (J>0) and nonzero critical mass (m_c).
Hence this analyzed block does not bifurcate on that connected domain.

At the witness point (ell^2=\kappa=A=B=1), the pseudoscalar has
(m^2\ell^2=1), positive residue and Breitenlohner--Freedman margin

\[
 m^2\ell^2+{9\over4}={13\over4}>0.
\]

Its principal symbol is the metric null cone. The graviton residue is positive
for (M_{\rm Pl}^2>0). Thus the target spectrum survives rather than being
assumed.

## One-loop counterterm obstruction

The canonical (0^-) mode is one real minimally coupled pseudoscalar. Its
one-loop ultraviolet pole contains, in a standard dimensional-regularization
basis,

\[
 \Gamma_{\rm div}^{(1)}\supset {1\over(4\pi)^2\epsilon}
 \int\sqrt g\left({1\over120}C^2-{1\over360}E_4
 +{1\over72}R^2\right),
\]

apart from total derivatives and mass-dependent lower-dimension terms. Thus

\[
 \beta_{C^2}\big|_{C^2=0}\ne0,\qquad
 \beta_{R^2}\big|_{R^2=0}\ne0.
\]

One loop already leaves the seven-equality critical surface. Fermion vacuum
polarization additionally generates the transverse axial kinetic invariant.
The isolated axial sign theorem then says that a healthy longitudinal (0^-)
pole and a healthy transverse spin-one pole cannot coexist at a generic
two-derivative point. Full PGT loops can populate still more invariants.

As an EFT these operators may be retained perturbatively below a cutoff. As a
fundamental finite local polynomial action with ordinary Feynman poles, the
generated Weyl term introduces the opposite-residue massive spin-two pole.

## Exhaustion verdict and missing principle

The finite calculations requested here are exhausted for this selected
critical branch:

1. the independent connection and two-copy compensator action are explicit;
2. the second copy is removed by an explicit rank-five constraint;
3. the compensator quotient and all physical quadratic sectors are counted;
4. the natural AdS background, residues, mass bound, characteristics and the
   strongest available nonlinear rank determinant pass; and
5. one physical loop proves that the sparse coupling surface is not closed.

Two additions would reopen the programme, but neither is presently derived:

- a genuine multiplicity gauge symmetry or dynamical theorem selecting the
  ray (n^I), replacing the imposed (W=0); and
- a BRST-compatible protecting symmetry, fixed point or nonstandard UV
  prescription whose Ward identities preserve the seven critical relations.

Without both, the result is a healthy tuned AdS EFT, not a closed quantum
gravity theory and not a derivation of the selector from `Spin(2,3)` alone.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_two_copy_constrained_ads_spectrum_and_closure.mjs
~~~
