# The maximal A4 action freezes all bulk poles, but the chiral fold has no declared physical-state domain

**Date:** 20 October 2026  
**Gate:** A4 physical states  
**Status:** maximal frozen quadratic packet; boundary cohomology blocked before physical admission  
**Inputs:** [typed action 1199](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md), [bosonic point 1290](../1200-1299/1290_s_v1_contains_a_fully_healthy_quadratic_benchmark_but_one_completion_cannot_discharge_the_global_a4_gate.md), [wall and reader 1292](../1200-1299/1292_a_neutral_z2_kink_is_the_minimal_defect_origin_and_one_even_charge_one_boson_localizes_without_mirror_doubling.md), [fermion capacity audit 1390](../1300-1399/1390_a_decoupling_limit_can_fit_the_standard_model_but_a6_first_fails_at_the_unconstructed_chiral_fermion_operator.md), [sterile CAR action 1391](../1300-1399/1391_the_minimal_sterile_car_action_makes_the_reverse_arrow_an_adjoint_but_leaves_the_a5_portal_a_tunable_spurion.md), and [red-team audit 1398](../1300-1399/1398_final_wave_red_team_audit_finds_two_substantive_errors_and_preserves_four_independent_stopping_boundaries.md)  
**Evidence:** [machine-readable packet](../../../evidence/data/spin23-a4-maximal-physical-state-packet.json) and [executable verifier](../../../verification/verify/verify_spin23_a4_maximal_physical_state_packet.mjs)

## Result

The bulk action can be frozen far enough to give positive tree-level kinetic forms, masses and residues for every displayed bosonic sector, one conventional three-generation fermion mass witness, a positive wall shape mode and a positive localized charge-one reader.

No negative-norm or negative-residue physical state appears at that point.

The construction nevertheless stops before a physical Hilbert space exists. The reason is exact and was hidden by the boson-only fold:

\[
\boxed{
\{\gamma^5,\gamma^y\}=0
\quad\Longrightarrow\quad
P_L\gamma^y=\gamma^yP_R.
}
\]

A spatial Pin reflection through the defect exchanges four-dimensional chirality. The undoubled chiral Standard Model is not closed under that operation: for example, there is no independent right-handed Weyl field in the same gauge representation as \(Q_L\). Thus the bosonic rule \(y\mapsto-y\) does not supply a local Lorentz- and gauge-covariant fermionic fold/domain.

This is not a discovered ghost. It is a missing definition of the operator whose cohomology and residues A4 asks us to test.

\[
\boxed{
\text{all presently defined poles healthy}
\quad+\quad
\text{full boundary operator undefined}
\quad\Longrightarrow\quad
A4\text{ remains blocked}.
}
\]

## 1. What is being frozen

Use the ordinary one-time signature \((-+++)\). \(Spin_0(2,3)\) remains the conformal geometry of a positive response cone, not an additional spacetime time.

On the covering space

\[
M=\mathbb R_t\times T^2\times[-L,L],
\qquad y\sim-y,
\]

the fixed defect is \(\Sigma_3=\{y=0\}\). The maximal local field inventory is

\[
\begin{aligned}
S_{\rm max}={}&S_{\rm SM+N}
+S_{U(1)_X,H,s,P}
+S_{\eta}
+S_{\Phi}\\
&+S_{\rm gf+gh}
+S_{\rm boundary}.
\end{aligned}
\]

Here:

- \(S_{\rm SM+N}\) contains three SM15 chiral generations and three sterile Weyl fields;
- \(S_{U(1)_X,H,s,P}\) is the typed action of 1199 at the point of 1290;
- \(\eta\) is the neutral wall field;
- \(\Phi\) is the charge-one bulk scalar whose even bound state is the reader;
- gauge fixing is \(R_\xi\) with \(\xi=1\) after canonicalizing the Abelian kinetic block.

The charge-three phase and the compact two-form are **dual descriptions**. The packet uses the scalar \(s\) in the ultraviolet pole calculation and the level-three BF chart in the infrared topological calculation. It does not add both as independent propagating fields. Doing so would double count one degree of freedom.

## 2. Fully specified bulk coefficients

The bosonic point is

\[
\begin{gathered}
g=0.6,\quad g_Y=0.4,\quad g_X=0.3,\quad \chi=0.2,\\
v_H=2,\quad v_s=3,\quad
\lambda_H=0.5,\quad\lambda_s=0.4,\quad\lambda_{Hs}=0.1,\\
f_P=1,\quad\kappa=0.5,\quad A=\operatorname{diag}(0,1,2),
\end{gathered}
\]

and the wall/reader point is

\[
u=1,\quad\lambda_\eta=2,\quad\mu=1,\quad
M_\infty^2=1.64,\quad g_{\Phi\eta}=2,\quad\lambda_\Phi=0.3.
\]

All omitted cross-couplings between \(\eta,\Phi\) and \(H,s,P\) are set to zero at this witness point. This is a chosen technically incomplete matching condition, not a prediction.

For a bulk fermion pole witness, take diagonal post-flavon matrices

\[
\begin{aligned}
Y_u&=\operatorname{diag}(0.01,0.2,0.7),\\
Y_d&=\operatorname{diag}(0.02,0.05,0.1),\\
Y_e&=\operatorname{diag}(0.005,0.03,0.08),\\
Y_\nu&=\operatorname{diag}(0.01,0.02,0.03),\\
M_R&=\operatorname{diag}(2,3,4).
\end{aligned}
\]

These are permitted by the completed Peirce blocks after \(s\neq0\). They are deliberately not a phenomenological fit. Their only role is to show that the conventional bulk fermionic quadratic form can be made explicit without generating a negative residue.

The boundary Majorana spurion of 1391 is set to zero. Including it before choosing its self-adjoint boundary condition and physical phase reference would make the supposed frozen packet less complete, not more.

## 3. Gauge fixing and BRST data

Canonicalize the positive neutral kinetic matrix and rotate to the gauge-mass basis \(V_i\). At quadratic order use

\[
\mathcal L_{\rm gf}
=-{1\over2}\sum_i(\partial\cdot V_i-m_iG_i)^2
\]

and the conventional BRST differential

\[
sV_i=dc_i,\qquad sG_i=m_ic_i,\qquad
s\bar c_i=B_i,\qquad sB_i=0.
\]

In the infrared BF chart the reducible complex is

\[
sa=dc,\qquad sb=d\Lambda,\qquad
s\Lambda=d\rho,\qquad sc=s\rho=0.
\]

On a boundary this is not merely an algebraic list: the domains of the fields, gauge parameters, ghosts and ghost-for-ghost must be mapped into one another. The bosonic even/odd assignment supplies a candidate absolute/relative de Rham complex:

\[
\begin{array}{c|l}
\text{even/Neumann-type at }y=0
&a_i,\ b_{iy},\ \Phi,\ H,\ s,\ P,\ A_i^{\rm SM},\ c\\
\text{odd/Dirichlet-type at }y=0
&\eta,\ a_y,\ b_{ij},\ A_y^{\rm SM}.
\end{array}
\]

This is sufficient for the linear bosonic cancellation used in 1290. It is not yet a complete boundary BRST cohomology because the fermion domain and the outer endpoint conditions are absent.

## 4. Physical poles that are actually computable

### 4.1 Gauge, radial and projector sectors

The verifier independently reconstructs

\[
m_{\gamma,Z_1,Z_2}^2
=(0,\ 0.4869935816886004,\ 8.108423084978067),
\]

\[
m_W^2=0.36,
\]

\[
m_{h,\rho}^2
=(3.891199250936495,\ 7.308800749063504),
\]

and the two complex projector tangent masses

\[
m_P^2=(1,4).
\]

After kinetic canonicalization every displayed physical pole has positive unit residue. The massless photon and gluons have the usual positive transverse residues.

### 4.2 Wall sector

On the infinite cover the wall fluctuation operator is

\[
\mathcal O_\eta
=-\partial_y^2+4\mu^2-6\mu^2\operatorname{sech}^2(\mu y).
\]

Its discrete poles are

\[
m_{\rm translation}^2=0,\qquad
m_{\rm shape}^2=3\mu^2=3,
\]

with continuum threshold \(4\mu^2=4\). The translation wavefunction is even and is removed when the field fluctuation obeys the \(\eta\)-odd fold. The odd shape mode survives and has positive residue.

This statement is exact for the infinite-cover Pöschl--Teller problem. It is not an exact finite-slab spectrum until an outer domain is declared.

### 4.3 Reader sector

The charge-one reader operator is

\[
\mathcal O_\Phi
=-\partial_y^2+M_\infty^2-2\mu^2\operatorname{sech}^2(\mu y).
\]

It has one even complex bound mode with

\[
m_\chi^2=M_\infty^2-\mu^2=0.64
\]

and continuum threshold

\[
m_{\rm cont}^2=1.64.
\]

The complex mode contributes two real physical oscillator degrees of freedom. Its canonical residue is positive. Again, these numbers belong to the exact infinite-cover problem; the finite-slab shifts depend on the outer domain.

### 4.4 Fermion bulk poles

With canonical Weyl kinetic terms the chosen diagonal charged masses are

\[
m_f={v_H\over\sqrt2}y_f>0.
\]

Each diagonal neutrino block has

\[
\mathcal M_i=
\begin{pmatrix}
0&m_{D,i}\\
m_{D,i}&M_i
\end{pmatrix},
\qquad m_{D,i}={v_HY_{\nu,i}\over\sqrt2},
\]

and positive Takagi singular masses

\[
m_{i,\pm}
={\sqrt{M_i^2+4m_{D,i}^2}\mp M_i\over2}.
\]

The executable packet evaluates all six. Canonical bulk anticommutation gives positive one-particle norm and unit residue.

These are bulk poles only. They do not solve the folded-boundary spectral problem.

## 5. The exact fermionic fold obstruction

Let \(S_y\) be the spin lift of reflection in the normal direction. Up to a phase it contains \(\gamma^y\). Since

\[
\{\gamma^5,\gamma^y\}=0,
\]

one has

\[
P_LS_y=S_yP_R,
\qquad
P_LS_yP_L=0.
\]

Therefore a condition schematically written as

\[
\psi_L(-y)=\pm S_y\psi_L(y)
\]

does not close on one left-handed Weyl field. The reflected object has opposite four-dimensional chirality.

In a vectorlike theory one pairs it with an opposite-chirality field in the same gauge representation and imposes a bag/orbifold condition on the pair. The chiral Standard Model does not have those partners representation by representation. Its right-handed particles have different electroweak representations; in all-left notation they appear as charge-conjugate left Weyl fields, not as the required opposite-chirality same-representation partner.

An antiunitary CP reflection does not remove the problem: it also conjugates complex gauge representations and therefore maps to a conjugate theory unless a gauge-complete Nambu doubling is supplied.

The sharp conclusion is:

\[
\boxed{
\text{the present bosonic fold is not yet a domain for the chiral Dirac operator}.
}
\]

This blocks:

- the self-adjointness proof for the full Yukawa/Majorana operator;
- a global fermion pole spectrum;
- the boundary BRST charge, because gauge transformations must preserve the fermion domain;
- the full physical BRST/constraint cohomology;
- any claim that the fold removes mirrors while retaining exactly the desired chiral states.

## 6. Why this is a block, not a no-go

At least four escape classes exist:

1. add vectorlike same-representation partners and impose a local bag/orbifold domain;
2. choose a nonlocal APS-type spectral domain and include the corresponding eta invariant and anomaly-inflow data;
3. remove the fold and use the full wall geometry, accepting the translation zero mode until another pinning mechanism is supplied;
4. build a gauge-complete Nambu doubling and prove that a local quotient has positive cohomology and no independent mirror states.

Each option changes the physical theory or supplies substantial new boundary data. None is selected by \(S_{\rm v1}\).

No negative-norm state has therefore been found. It would be incorrect to call A4 failed. It would be equally incorrect to infer positivity from the healthy bulk poles because the global operator is not defined.

## 7. Outer-domain and compact-BF obstruction

The finite slab adds an independent issue. The tanh wall and sech reader are exact on the infinite cover, while a finite interval needs boundary values or Robin data. Different self-adjoint choices shift the spectrum and can change its lower bound.

The topological chart adds a reducible two-form gauge complex. A unitary compact boundary quantization requires:

- a variationally admissible polarization for \(a\) and \(b\);
- compatible domains for \(c,\Lambda,\rho\);
- the compact large-gauge quotient and real star structure;
- any required edge fields or anomaly inflow.

The simple parity ledger is a candidate start, not a proof of this boundary Hilbert space.

## 8. Cohomology ledger

Before adding the wall, the defined bosonic bulk cohomology has the 36 real physical modes counted in 1290, including gluons. The localized extension adds:

- one retained real wall shape mode;
- two real components of the complex reader bound mode;
- no local BF oscillator.

The bulk fermion inventory has

\[
3(15+1)=48
\]

complex Weyl generators before imposing a boundary domain. Their global physical count is intentionally not printed: doing so would assume the missing fold/polarization that the audit is testing.

Thus the only honest count is

\[
\boxed{
\text{defined bosonic local modes: }36+1+2,
\qquad
\text{full physical cohomology: undefined}.
}
\]

## 9. Exact external data still required

The packet stops at seven concrete external choices:

1. a globally compatible finite-slab outer domain for \(\eta,\Phi\), gauge fields, ghosts and the BF complex;
2. a fermionic fold lift or an explicitly chosen replacement boundary condition;
3. the full boundary BRST charge and a proof that it preserves every operator domain;
4. a gauge-complete self-adjoint domain for the chiral Yukawa/Majorana operator;
5. a decision whether the sterile boundary Majorana portal is absent or present with a physical phase reference;
6. radiative boundary counterterms and an RG interval over which positivity survives;
7. a unitary compact-BF boundary quantization if the topological chart is retained.

The first unavoidable item is number 2. Without it, the requested “smallest complete physical-state action” does not exist in the current inventory.

## 10. Verdict

\[
\boxed{
\begin{array}{l}
\text{negative kinetic eigenvalue: no},\\
\text{negative physical residue: no},\\
\text{unavoidable negative-norm class: not found},\\
\text{complete self-adjoint fermion domain: no},\\
\text{boundary BRST cohomology: undefined},\\
A4\text{ status: blocked},\\
\text{physical admission: false}.
\end{array}
}
\]

The packet improves the programme by locating the failure at a specific mathematical interface. More coefficient fitting cannot close it. The next A4 calculation must choose one of the four fermionic-domain escape classes and then redo the cohomology and pole audit on that actual domain.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a4_maximal_physical_state_packet.mjs
~~~
