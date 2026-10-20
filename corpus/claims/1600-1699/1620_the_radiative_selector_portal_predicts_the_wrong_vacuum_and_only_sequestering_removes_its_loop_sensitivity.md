# The Radiative Selector Portal Predicts the Wrong Vacuum, and Only Sequestering Removes Its Loop Sensitivity

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** explicit portal-to-dark-energy mismatch and unimodular, sequestering, supersymmetry and adjustment-mechanism audit; no observed positive vacuum prediction

**Depends on:** [the radiative selector portal](1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md), [the asymptotic-safety color-boundary test](1616_asymptotic_safety_can_conditionally_fix_the_color_boundary_but_not_without_a_spin23_universality_class.md), [the supersymmetric scale audit](1605_supersymmetry_protects_vacua_not_the_pure_yang_mills_gap_or_a_spin23_shared_scale.md), and [the topological vacuum-energy audit](1601_topological_charge_and_theta_angles_do_not_protect_a_qcd_spin23_or_cosmological_shared_scale.md)

**Evidence:** [portal vacuum-energy ledger](../../../evidence/data/spin23-portal-vacuum-energy-escape-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_portal_vacuum_energy_escape_audit.mjs)

## Result

The positive scale construction of claim 1612 has a direct cosmological
failure. When its radiative vev induces the reduced Planck mass, its one-loop
vacuum is negative and larger than the observed positive dark-energy density
by

\[
\boxed{5.27\times10^{115}}.
\]

The direct Spin(2,3) curvature has the same negative sign: it is AdS, whereas
the late universe is consistent with a small positive cosmological constant.
An uplift must cancel the portal vacuum to a relative precision
\(1.90\times10^{-116}\), and every ordinary threshold or higher loop requires
the cancellation again.

Among the four principal escapes tested here:

- ordinary unimodular gravity moves the required number into an integration constant;
- exact supersymmetry cancels vacuum energy but is broken, after which the problem returns as the fourth power of the breaking scale;
- a local adjustment scalar generically satisfies the stationarity equation or the zero-vacuum equation, not both without tuning;
- vacuum-energy sequestering is the only tested mechanism that algebraically removes constant matter-loop shifts from the gravitational source, but it imports global/4-form structure, leaves a measured residual, and breaks the portal's direct derivation of the AdS radius from its vacuum energy.

Thus no tested mechanism both predicts the observed value and preserves every
relation in claim 1612. Sequestering can solve the **radiative instability**
conditionally; it does not derive the small residual.

## Observed benchmark

Use the Planck 2018 base-\(\Lambda\)CDM values

\[
H_0=67.4\ {\rm km\,s^{-1}Mpc^{-1}},\qquad
\Omega_\Lambda=0.685,\qquad
\bar M_{\rm Pl}=2.435\times10^{18}\ {\rm GeV}.
\]

Then

\[
\rho_{\rm DE}=3\Omega_\Lambda H_0^2\bar M_{\rm Pl}^2
=2.51860\times10^{-47}\ {\rm GeV}^4
=7.16414\times10^{-121}\bar M_{\rm Pl}^4,
\]

or \(\rho_{\rm DE}^{1/4}=2.24022\,\mathrm{meV}\). This is a reference
conversion, not a claim that the Hubble-tension choice changes the conclusion;
the discrepancy below is 116 orders of magnitude.

## Portal vacuum and direct AdS sign

Claim 1612 has

\[
B=1.34250568326\times10^{-4},\qquad
V(v)=-{B\over2}v^4=-6.71252842\times10^{-5}v^4,
\]

\[
{M_{\rm Pl}\over v}=1.154700538,\qquad
{V(v)\over M_{\rm Pl}^4}=-3.77579723\times10^{-5}.
\]

Therefore

\[
{|V(v)|\over\rho_{\rm DE}}=5.27041\times10^{115}.
\]

The minimal vacuum match in claim 1612 gives

\[
{\Lambda_{\rm Spin}\over v^2}=-5.03439631\times10^{-5},
\]

while the observed positive curvature equivalent is

\[
{\Lambda_{\rm obs}\over v^2}
={\rho_{\rm DE}/v^4\over M_{\rm Pl}^2/v^2}
=9.55219\times10^{-121}.
\]

The portal is not merely too large; it selects the opposite sign. A separate
uplift \(\rho_{\rm up}\) must satisfy

\[
{\rho_{\rm up}\over v^4}
=6.71252842\times10^{-5}+1.27362509\times10^{-120},
\]

so the desired residual is only
\(1.89739\times10^{-116}\) of the cancelled term.

## Threshold and loop ledger

The one-loop coefficient in claim 1612 separates into

\[
3k_X^2=0.0432,\qquad k_H^2=0.0016,\qquad
d_Tk_T^2=0.0400.
\]

Their shares of \(-Bv^4/2\) are respectively

\[
(-3.41959\times10^{-5},\ -1.26651\times10^{-6},\
-3.16629\times10^{-5})v^4.
\]

Each contribution alone is more than 113 orders above the observed density in
the same units. A deliberately conservative next-loop estimate,

\[
|\delta V_2|\sim {|V_1|\over16\pi^2}
=4.25076\times10^{-7}v^4,
\]

is \(3.34\times10^{113}\) times the observed density. Altering a heavy mass,
adding a threshold or improving the effective potential therefore reopens the
cancellation.

Even the much lower generated color scale is not harmless. Using the original
claim-1612 benchmark gives \((\Lambda_{\rm YM}/v)^4=1.92275\times10^{-26}\),
94.18 orders above \(\rho_{\rm DE}/v^4\). Using the conditional asymptotic-
safety trajectory of claim 1616 lowers this to
\(2.67452\times10^{-56}v^4\), still 64.32 orders above the observed value.
The coefficient and sign of the nonperturbative color vacuum are dynamical,
but absent a cancellation principle its natural magnitude is already fatal.

## Escape 1: unimodular integration constant

The trace-free field equation is

\[
R_{\mu\nu}-{1\over4}Rg_{\mu\nu}
={1\over M_{\rm Pl}^2}
\left(T_{\mu\nu}-{1\over4}Tg_{\mu\nu}\right).
\]

For a constant vacuum source \(T_{\mu\nu}=-\rho g_{\mu\nu}\), the right-hand
side vanishes exactly for \(\rho=10^{-120},1,10^{120}\), or any other value.
But integrating the Bianchi identity restores Einstein's equation with a
cosmological integration constant \(\Lambda_{\rm int}\). Its observed value
is not fixed by the local field equations. The portal masses and threshold
relations can survive, but

\[
V(v)=M_{\rm Pl}^2\Lambda_{\rm Spin}
\]

no longer determines the physical curvature. If that equality is imposed as
an extra boundary condition, the original 116-order cancellation returns.
Unimodular gravity therefore decouples the local trace equation but relocates
the small number to global/initial data.

## Escape 2: vacuum-energy sequestering

In the idealized sequestering equation,

\[
M_{\rm Pl}^2G_{\mu\nu}
=T_{\mu\nu}-{1\over4}\langle T\rangle g_{\mu\nu}
-\Delta\Lambda\,g_{\mu\nu},
\]

any constant protected-sector contribution cancels:

\[
T_{\mu\nu}^{\rm vac}-{1\over4}
\langle T^{\rm vac}\rangle g_{\mu\nu}
=-\rho g_{\mu\nu}+\rho g_{\mu\nu}=0.
\]

The cancellation holds independently for all three one-loop threshold shares
above and for an added two-loop constant. This is a genuine algebraic removal
of matter vacuum loops, not order-by-order retuning. Local sequestering
realizes the global constraints with four-forms.

The price is exact and visible. The residual \(\Delta\Lambda\) is fixed by
global flux/boundary data or measurement, not by the selector potential. The
mechanism requires an enlarged gravitational action, and the direct
claim-1612 relation between \(B\) and \(g_A\) is no longer the physical
curvature equation. The particle masses, induced Planck scale and color
threshold law may be preserved because constant vacuum pieces are what is
projected out. Sequestering therefore solves the radiative-stability part
within its declared framework while relocating the value/sign of late-time
acceleration and sacrificing one derived Spin(2,3) scale relation.

## Escape 3: exact and broken supersymmetry

Exact global supersymmetry with an unbroken vacuum cancels equal bosonic and
fermionic zero-point contributions and gives zero vacuum energy. A finite
equal-mass witness has

\[
{4\over64\pi^2}(m_B^4-m_F^4)=0
\quad\text{at}\quad m_B=m_F=0.2v.
\]

A mass splitting of only \(0.5\%\), \(m_B=0.201v\), instead gives

\[
\delta\rho={4[(0.201)^4-(0.2)^4]\over64\pi^2}v^4
=2.04167\times10^{-7}v^4,
\]

over \(10^{113}\) times the observed density. More generally, supersymmetry
broken at \(M_{\rm SUSY}\) leaves natural contributions of order
\(M_{\rm SUSY}^4\). Even \(M_{\rm SUSY}=1\,\mathrm{TeV}\) gives
\(3.97\times10^{58}\rho_{\rm DE}\). Avoiding this without another mechanism
would require splittings at the meV scale.

Local supersymmetry does not repair the sign automatically: an unbroken
supergravity AdS vacuum has \(V=-3m_{3/2}^2M_{\rm Pl}^2\), while a Minkowski or
positive vacuum needs superpotential/uplift data. Supersymmetrizing the portal
also changes its Coleman--Weinberg coefficient and spectrum. Exact SUSY can
cancel the loop ledger but contradicts the required broken low-energy world;
broken SUSY reinstates the tuning.

## Escape 4: a local adjustment scalar

Let a proposed adjuster have

\[
V_{\rm adj}(a)=\rho_0+{m^2\over2}a^2+{\lambda\over4}a^4.
\]

For the finite choice \(m^2=-1\), \(\lambda=1\), the stable extrema are
\(a=\pm1\), with

\[
V_{\rm adj}(\pm1)=\rho_0-{1\over4}.
\]

Zero vacuum requires the independent condition \(\rho_0=1/4\). A threshold
shift \(\delta\rho=0.01\) leaves the stationary point at \(a=\pm1\) but moves
the vacuum to \(0.01\). This is the finite form of the adjustment obstruction:
stationarity and zero curvature are two equations, generically requiring a
parameter relation rather than one scalar response.

A rolling quintessence-like field avoids equilibrium only by remaining as
light as \(H_0\sim1.44\times10^{-42}\,\mathrm{GeV}\), demanding protection
against the portal thresholds and sufficiently weak couplings. If it is
decoupled enough to preserve the selector and fifth-force bounds, it cannot
cancel their constant threshold shifts. If it couples strongly enough to
sense them, it perturbs the scale relations and inherits their radiative
corrections.

## Decision table

\[
\begin{array}{l|c|c|c}
\text{mechanism}&\text{removes constant loop shifts}&
\text{predicts observed residual}&\text{preserves all claim-1612 relations}\\\hline
\text{unimodular}&\text{from trace-free local equation}&\text{no}&\text{no: curvature match becomes integration data}\\
\text{sequestering}&\text{yes, in protected sector}&\text{no}&\text{no: direct }B\text{--}g_A\text{ match is replaced}\\
\text{exact SUSY}&\text{yes}&\text{no; gives zero/AdS}&\text{no after realistic breaking}\\
\text{local adjuster}&\text{no, generically}&\text{no}&\text{only by decoupling, then it cannot adjust}
\end{array}
\]

The programme boundary is consequently sharp:

\[
\boxed{
\text{the radiative portal explains a common particle/gravity scale, not the
observed vacuum; sequestering is a viable added protection mechanism, not a
prediction of dark energy or of the Spin(2,3) radius.}}
\]

Reopening a full solution requires a quantum-consistent mechanism that fixes
the positive residual, survives every portal/color/SUSY threshold, and either
derives a replacement for the lost \(B\)--\(g_A\) relation or predicts the
Cartan radius independently.

## Primary sources

- Planck Collaboration, [*Planck 2018 Results VI: Cosmological Parameters*](https://arxiv.org/abs/1807.06209), *Astron. Astrophys.* **641** (2020) A6.
- M. Henneaux and C. Teitelboim, [*The Cosmological Constant and General Covariance*](https://doi.org/10.1016/0370-2693(89)91251-3), *Phys. Lett. B* **222** (1989) 195.
- N. Kaloper and A. Padilla, [*Sequestering the Standard Model Vacuum Energy*](https://arxiv.org/abs/1309.6562), *Phys. Rev. Lett.* **112** (2014) 091304.
- N. Kaloper and A. Padilla, [*Vacuum Energy Sequestering: The Framework and Its Cosmological Consequences*](https://arxiv.org/abs/1406.0711), *Phys. Rev. D* **90** (2014) 084023.
- N. Kaloper, A. Padilla, D. Stefanyszyn and G. Zahariade, [*A Manifestly Local Theory of Vacuum Energy Sequestering*](https://doi.org/10.1103/PhysRevLett.116.051302), *Phys. Rev. Lett.* **116** (2016) 051302.
- E. Witten, [*Dynamical Breaking of Supersymmetry*](https://doi.org/10.1016/0550-3213(81)90006-7), *Nucl. Phys. B* **188** (1981) 513.
- S. Weinberg, [*The Cosmological Constant Problem*](https://doi.org/10.1103/RevModPhys.61.1), *Rev. Mod. Phys.* **61** (1989) 1, including the equilibrium adjustment obstruction.
