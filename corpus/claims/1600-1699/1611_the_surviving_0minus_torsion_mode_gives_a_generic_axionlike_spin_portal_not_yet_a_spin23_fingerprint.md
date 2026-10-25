# The Surviving 0-Minus Torsion Mode Gives a Generic Axion-Like Spin Portal, Not Yet a Spin(2,3) Fingerprint

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact tree-level fermion matching, static-potential and decoupling audit of the claim-1607 EFT patch

**Depends on:** [the AdS and radiative stress test](1607_the_gapped_0minus_torsion_mode_survives_ads_and_hyperbolicity_but_not_radiative_closure.md), [the first-order pole construction](1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md), and the programme's conditional $E_6\supset Spin(10)\supset$ SM representation chain.

**Evidence:** [fermion-portal ledger](../../../evidence/data/spin23-pseudoscalar-torsion-fermion-portal.json) and [verifier](../../../verification/verify/verify_spin23_pseudoscalar_torsion_fermion_portal.mjs)

## Result

The healthy longitudinal torsion mode has an unavoidable and falsifiable low-energy consequence once Dirac matter is minimally coupled: it mediates the standard massive-pseudoscalar dipole--dipole force and leaves the usual Einstein--Cartan axial-current contact operator.

The exact result is useful, but it is not yet distinctive evidence for $Spin(2,3)$. Its force law is the generic axion-like $V_3$ spin potential, while its mass and strength depend on the unfixed broken-phase parameters $b_X$, $\lambda$ and the fermion coefficients $c_f$. The current $E_6$ descendant work identifies fermion representation slots; it does not determine these coefficients, flavor rotations, exotic thresholds or anomaly matching.

For the minimal geometric normalization and natural order-one couplings, the pole is Planck-mass and its effects are gravitationally small. Making it long-range requires either a huge curvature-square coefficient or approaching the constraint-degenerate surface $\lambda=1/4$. The latter is not a controlled massless limit.

## Fermion coupling in fixed conventions

Retain the axial convention of claims 1603 and 1607,

\[
S^\mu=\epsilon^{\alpha\beta\gamma\mu}T_{\alpha\beta\gamma},
\qquad
J_{5,f}^\mu=\bar\psi_f\gamma^\mu\gamma_5\psi_f.
\]

Write the descendant matter interaction as

\[
\mathcal L_{\rm int}=\sum_f c_f S_\mu J_{5,f}^\mu
\equiv S_\mu J_c^\mu.
\]

The coefficient is displayed because torsion conventions differ. In the convention above, minimal Dirac coupling gives $|c_f|=1/8$. An overall common sign does not affect identical-species exchange. Nonminimal couplings and threshold running can make the low-energy $c_f$ nonuniversal.

The complete quadratic axial block is

\[
\mathcal L=\frac{a_S}{2}S^2
+\frac{b_X}{2}(\partial\!\cdot S)^2+S\!\cdot J_c,
\qquad
a_S=\frac{M_{\rm Pl}^2(1-4\lambda)}{24}.
\]

## Exact current exchange

With $P_L^{\mu\nu}=p^\mu p^\nu/p^2$ and $P_T=\eta-P_L$, integrating out $S_\mu$ gives

\[
\mathcal L_{\rm eff}
=-\frac12J_c^\mu\left[
\frac{P_{T\,\mu\nu}}{a_S}
+\frac{P_{L\,\mu\nu}}{a_S+b_Xp^2}
\right]J_c^\nu.
\]

Equivalently,

\[
\mathcal L_{\rm eff}
=-\frac{J_c^2}{2a_S}
+\frac{b_X}{2a_S}\frac{(p\!\cdot J_c)^2}{a_S+b_Xp^2}.
\]

This separation is physically important. The three transverse components are algebraic and generate the local axial--axial interaction. Only $p\!\cdot S$ carries the massive $0^-$ pole.

## Canonical pseudoscalar and Ward matching

The auxiliary dual field $\varphi=\chi/\sqrt{a_S}$ has

\[
m_\varphi^2=\frac{a_S}{b_X},
\qquad
\mathcal L_{\varphi f}
=\sum_f f_f\,\partial_\mu\varphi J_{5,f}^\mu,
\qquad
f_f=\frac{c_f}{\sqrt{a_S}}.
\]

Thus the action implies the exact correlation

\[
\boxed{f_fm_\varphi=\frac{c_f}{\sqrt{b_X}}}.
\]

For an on-shell Dirac fermion,

\[
\partial_\mu J_{5,f}^\mu
=2im_f\bar\psi_f\gamma_5\psi_f
+\text{gauge anomalies},
\]

so the derivative interaction is equivalent, up to anomalies, to

\[
\mathcal L_{\varphi f}
=-iy_f\varphi\bar\psi_f\gamma_5\psi_f,
\qquad
y_f=2m_ff_f.
\]

The mass proportionality suppresses electrons relative to heavy fermions. Gauge anomalies additionally induce $\varphi F\widetilde F$ and $\varphi G\widetilde G$ operators, but their coefficients require the full chiral descendant and exotic-threshold inventory. They cannot be inferred from the label $E_6$ alone.

## Low-energy four-fermion EFT

For $|p^2|\ll m_\varphi^2$,

\[
\mathcal L_{\rm eff}
=-\frac{J_c^2}{2a_S}
+\frac{b_X}{2a_S^2}(p\!\cdot J_c)^2
+O(p^4/m_\varphi^4).
\]

In the convention

\[
\mathcal L_{\rm EFT}
=-\frac12\sum_{fg}C^{fg}_{AA}J_{5,f}\!\cdot J_{5,g}
+\frac12\sum_{fg}C^{fg}_{\partial A}
(\partial\!\cdot J_{5,f})(\partial\!\cdot J_{5,g}),
\]

the Wilson matrices are

\[
C^{fg}_{AA}=\frac{c_fc_g}{a_S},
\qquad
C^{fg}_{\partial A}=\frac{c_fc_gb_X}{a_S^2}
=\frac{c_fc_g}{a_Sm_\varphi^2}.
\]

For $c_f=1/8$ and $\lambda=0$, the coefficient multiplying a single squared current has magnitude

\[
\frac{c_f^2}{2a_S}=\frac{3}{16M_{\rm Pl}^2},
\]

the conventional Einstein--Cartan four-fermion magnitude, modulo metric and action-sign conventions.

## Static spin-dependent potential

Let

\[
Y_m(r)=\frac{e^{-mr}}{4\pi r}.
\]

The separated-particle pole potential is most compactly and unambiguously written

\[
V_{\rm pole}(\mathbf r)
=+f_1f_2\,\sigma_1^i\sigma_2^j\partial_i\partial_jY_m(r).
\]

The overall sign follows the corrected convention of Fadeev *et al.*, rather than the sign in the original Moody--Wilczek expression.

Including the distributional term,

\[
\begin{aligned}
V_{\rm pole}(\mathbf r)=f_1f_2\Bigg\{&
\frac{e^{-mr}}{4\pi}\Bigg[
-(\boldsymbol\sigma_1\!\cdot\boldsymbol\sigma_2)
\left(\frac{m}{r^2}+\frac1{r^3}\right)\\
&+(\boldsymbol\sigma_1\!\cdot\hat{\mathbf r})
(\boldsymbol\sigma_2\!\cdot\hat{\mathbf r})
\left(\frac{m^2}{r}+\frac{3m}{r^2}+\frac3{r^3}\right)
\Bigg]
-\frac{\boldsymbol\sigma_1\!\cdot\boldsymbol\sigma_2}{3}
\delta^3(\mathbf r)\Bigg\}.
\end{aligned}
\]

The algebraic $J_5^2$ operator contributes a separate zero-range spin contact. For spatially separated sources, only the Yukawa tensor tail remains. It averages away for unpolarized bodies, making polarized spin sources, torsion balances, magnetometers, comagnetometers and spin-dependent spectroscopy the relevant probes.

No monopole--dipole potential follows from this minimal parity-even portal. Such a force would require an additional scalar, CP-violating coupling.

## Finite natural benchmark

Take the reduced Planck mass $M_{\rm Pl}=2.435\times10^{18}$ GeV and

\[
\lambda=0,
\qquad b_X=\frac1{24},
\qquad c_f=\frac18.
\]

Then

\[
m_\varphi=M_{\rm Pl},
\qquad
f_f=2.52\times10^{-19}\ {\rm GeV}^{-1},
\]

and

\[
y_e=2.57\times10^{-22},
\qquad
y_N^{\rm elementary}=4.72\times10^{-19}.
\]

The nucleon number is only an elementary universal-coupling benchmark. The physical proton and neutron coefficients are spin-fraction combinations of quark coefficients.

This natural point has no laboratory-range pole: it is a Planck-scale contact correction.

## Observable map

The force shape has already been sought directly. Terrano *et al.* used polarized electron spin distributions to test pseudoscalar dipole--dipole interactions for mediator masses up to $500\,\mu$eV, reaching sensitivities described as fourteen orders below electromagnetism. Atomic and molecular spin spectroscopy probes the shorter-range tensor and delta-function pieces, but requires system-specific matrix elements.

If those spectroscopic matrix elements are converted into line shifts, widths
or transition rates, the conversion is governed by the [AZ-127
operator-to-record ledger](../../programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md).
The force-potential calculation itself is a different observable and does not
acquire an atomic decay interpretation from the shared spin algebra.

Astrophysical bounds reach much smaller Yukawa couplings than laboratory force searches, with important modeling qualifications:

- the classic red-giant calculation of Raffelt and Weiss found $\alpha_a<0.5\times10^{-26}$ for a sufficiently light electron-coupled pseudoscalar, corresponding to $y_e\lesssim2.5\times10^{-13}$;
- Lella *et al.* find combined supernova arguments excluding approximately $g_{aN}\gtrsim10^{-9}$ for masses below roughly $1$ MeV, including the strongly coupled trapping regime.

At $1-4\lambda=1$, the minimal benchmark is about nine orders below the electron benchmark and ten below the nucleon benchmark. Since

\[
y_f(\lambda)=\frac{y_f(0)}{\sqrt{1-4\lambda}},
\]

those illustrative bounds translate to

\[
1-4\lambda\gtrsim1.1\times10^{-18}
\quad(e),
\qquad
1-4\lambda\gtrsim2.2\times10^{-19}
\quad(N),
\]

only if the pole lies in the quoted mass range and the stellar production, free-streaming or trapping assumptions apply. These are not mass-independent exclusions.

Collider searches for a massive transverse axial vector do not map directly to this theory: its transverse axial torsion has no pole. At energies below $m_\varphi$, contact-interaction searches instead constrain $C_{AA}$.

## Decoupling limits

- $b_X\to0$ at fixed $a_S$: $m_\varphi\to\infty$ and the Yukawa tail disappears, but the Einstein--Cartan contact remains.
- $a_S\to\infty$: both $f_f$ and $C_{AA}$ vanish.
- $c_f\to0$: the matter portal vanishes while the pure torsion pole remains.
- $m_\varphi r\gg1$: separated-source exchange is exponentially suppressed.
- $\lambda\to1/4^-$: $m_\varphi\to0$ and $f_f\to\infty$ at fixed $b_X$, but the Dirac constraint matrix simultaneously loses rank. This is strong coupling/constraint degeneration, not a controlled long-range limit.

For $b_X=O(1)$ away from the critical surface, the mode is naturally Planck-mass. A micro-eV to MeV pole needs an enormous $b_X$ or a very small $1-4\lambda$, neither currently protected against the radiative-closure failure of claim 1607.

The cost is quantitative. At $\lambda=0$,

\[
b_X=\frac{M_{\rm Pl}^2}{24m_\varphi^2}
=2.47\times10^{41}\quad(m_\varphi=1\ {\rm MeV}),
\]

and reaching the upper edge of Terrano *et al.*'s $500\,\mu$eV range requires

\[
b_X=9.88\times10^{59}.
\]

Conversely, holding $b_X=1/24$ and tuning only the algebraic coefficient to obtain a $1$ MeV pole requires $1-4\lambda=1.69\times10^{-43}$. Because $f_f\propto(1-4\lambda)^{-1/2}$, this path becomes strongly coupled, violates the representative light-particle bounds long before reaching that mass, and terminates at the constraint-rank boundary. A light but weakly coupled pole therefore requires a huge $b_X$, not critical tuning alone.

## Fermion loops reopen the transverse sector

The matter portal strengthens claim 1607's radiative-closure failure. Two insertions of

\[
c_fS_\mu\bar\psi_f\gamma^\mu\gamma_5\psi_f
\]

in a fermion loop generate the transverse axial-current vacuum polarization. Local Lorentz symmetry and parity permit the counterterm

\[
F_{S\,\mu\nu}F_S^{\mu\nu},
\qquad
F_{S\,\mu\nu}=\partial_\mu S_\nu-\partial_\nu S_\mu,
\]

and no enhanced symmetry appears when its coefficient is set to zero while $c_f\neq0$. Hence

\[
\beta_{F_S^2}\big|_{F_S^2=0}\neq0.
\]

Mass and anomaly terms generate further longitudinal and local operators. This is the fermionic version of the closure problem analyzed by de Berredo-Peixoto, Helayel-Neto and Shapiro. If the generated transverse term is resummed as a fundamental action, transverse torsion modes become dynamical and the complete spin-parity residue analysis must be repeated. Treated perturbatively below a cutoff it is an ordinary EFT correction, but the exact one-pole surface is lost.

## Verdict: portal, but not fingerprint

The result is falsifiable as an EFT: search for the dipole--dipole potential, axial contact operators, and anomaly-mediated production. But every one of those signatures is shared by generic torsion or axion-like models.

A specifically $Spin(2,3)$ fingerprint would require the UV descendant to calculate rather than fit:

1. the ratios and signs of $c_f$ across the SM generations and any $E_6$ exotics;
2. the anomaly coefficients after all thresholds;
3. $b_X$ and $\lambda$, hence the correlated line $f_fm_\varphi=c_f/\sqrt{b_X}$; and
4. a protection mechanism keeping a light pole away from the $a_S=0$ constraint boundary.

Until those exist, the correct classification is

\[
\boxed{\text{generic torsion/axion-like spin portal, not a unique }Spin(2,3)\text{ signal}.}
\]

## Stop rules

1. Do not use transverse axial-vector resonance bounds for this longitudinal pole.
2. Do not call $c_f$ $E_6$-universal until the full descendant matter action and threshold matching establish it.
3. Do not continue through $\lambda=1/4$ using the one-pole EFT.
4. Apply stellar bounds only in their stated mass and transport regimes.
5. Do not infer a monopole--dipole force without an added scalar CP-violating vertex.
6. Demand radiative protection for any huge $b_X$ or critical tuning invoked to make the mode observable.
7. Once $c_f\neq0$, include the fermion-loop-generated transverse torsion operators before claiming a fundamental one-pole spectrum.

## Sources

- I. L. Shapiro, [*Physical Aspects of the Space-Time Torsion*](https://arxiv.org/abs/hep-th/0103093), *Physics Reports* **357** (2002) 113--213.
- G. de Berredo-Peixoto, J. A. Helayel-Neto and I. L. Shapiro, [*On the Consistency of a Fermion-Torsion Effective Theory*](https://arxiv.org/abs/hep-th/9910168), *Journal of High Energy Physics* **02** (2000) 003.
- J. E. Moody and F. Wilczek, [*New Macroscopic Forces?*](https://doi.org/10.1103/PhysRevD.30.130), *Physical Review D* **30** (1984) 130--138.
- P. Fadeev *et al.*, [*Revisiting Spin-Dependent Forces Mediated by New Bosons*](https://arxiv.org/abs/1810.10364), *Physical Review A* **99** (2019) 022113.
- W. A. Terrano *et al.*, [*Short-Range, Spin-Dependent Interactions of Electrons*](https://doi.org/10.1103/PhysRevLett.115.201801), *Physical Review Letters* **115** (2015) 201801.
- G. Raffelt and A. Weiss, [*Red Giant Bound on the Axion-Electron Coupling Reexamined*](https://arxiv.org/abs/hep-ph/9410205), *Physical Review D* **51** (1995) 1495--1498.
- A. Lella *et al.*, [*Getting the Most on Supernova Axions*](https://arxiv.org/abs/2306.01048), *Physical Review D* **109** (2024) 023001.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pseudoscalar_torsion_fermion_portal.mjs
~~~
