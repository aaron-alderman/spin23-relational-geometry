# The Exact SU(2) Heat-Kernel Transfer System Is Reflection Positive but Does Not Scale to the Four-Dimensional Mass Gap

**Date:** 20 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact compact transfer construction, complete spectral calculation and explicit continuum-scaling failure; no four-dimensional mass-gap claim

**Depends on:** [the constructive Yang--Mills gate](1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md) and [the joined mass-gap boundary](1594_the_joined_mass_gap_investigation_closes_every_shortcut_and_leaves_five_irreducible_proof_arms.md)

**Evidence:** [SU(2) heat-kernel ledger](../../../evidence/data/spin23-su2-heat-kernel-transfer-exhaustion.json) and [deterministic verifier](../../../verification/verify/verify_spin23_su2_heat_kernel_transfer_exhaustion.mjs)

## Result

There is a smallest compact Yang--Mills transfer system in which the desired local ingredients can be proved rather than assumed. Take \(SU(2)\) on a two-dimensional cylinder, use the heat-kernel plaquette action, and reduce the physical Hilbert space on a spatial circle to class functions:

\[
\mathcal H=L^2(SU(2),dU)^{\mathrm{Ad}}.
\]

The characters \(\chi_j\), with \(j=0,\tfrac12,1,\ldots\), form an orthonormal basis. The heat-kernel transfer operator is exactly diagonal:

\[
T_t\chi_j=e^{-tC_2(j)}\chi_j,
\qquad C_2(j)=j(j+1).
\]

It has a unique vacuum eigenvalue \(1\), strictly positive remaining eigenvalues and a finite gap at every finite coupling and circle size. Moreover, it is reflection positive. But its exact solution proves just as sharply why it does **not** settle the four-dimensional problem: it contains global electric-flux sectors and no local transverse gauge dynamics, spatial magnetic plaquettes or four-dimensional continuum limit.

## Exact character spectrum

The plaquette heat kernel is

\[
K_t(U)=\sum_{j=0,1/2,\ldots}(2j+1)\chi_j(U)e^{-tj(j+1)}.
\]

Every coefficient is positive. With \(t=0.3\), the first transfer eigenvalues are

| \(j\) | \(C_2(j)\) | \(\lambda_j\) |
|---:|---:|---:|
| 0 | 0 | 1 |
| \(1/2\) | 0.75 | 0.798516219 |
| 1 | 2 | 0.548811636 |
| \(3/2\) | 3.75 | 0.324652467 |
| 2 | 6 | 0.165298888 |

Thus

\[
-\log {\lambda_{1/2}\over\lambda_0}={3t\over4}=0.225.
\]

Writing \(t=a_\tau\kappa\), with \(a_\tau=0.1\) and \(\kappa=3\), gives the exact Hamiltonian spectrum

\[
H\chi_j=\kappa j(j+1)\chi_j,
\qquad \Delta={3\kappa\over4}=2.25.
\]

This diagonalization is infinite, not merely a finite truncation. The verifier sums the heat trace to \(2.949137588\ldots\) and bounds the entire tail beyond \(j=4\) by \(7.52\times10^{-4}\).

The fundamental-sector correlator is exact as well:

\[
C_{1/2}(n)=e^{-0.225n}.
\]

At \(n=0,1,2,4,8\) it equals \(1,0.798516,0.637628,0.406570,0.165299\). Its effective mass is exactly \(0.225\) at every step and its lattice correlation length is \(4.44444\ldots\). Here exponential decay is a theorem because the positive transfer spectrum was constructed first; it is not an empirical fit being used to assume the spectrum.

## Reflection positivity and sewing

For an arbitrary finite class function \(f=\sum_j f_j\chi_j\),

\[
\langle f,T_tf\rangle
=\sum_j e^{-tj(j+1)}|f_j|^2\ge0.
\]

For the explicit coefficient vector \((1,-2,0.5,1.25)\), the norm squared is \(6.8125\) and the reflected transfer form is \(4.838537264\ldots>0\). Positivity is therefore visible coefficient by coefficient, rather than inferred from a fitted correlator.

The same spectrum proves exact subdivision independence:

\[
T_{t_1}T_{t_2}\chi_j
=e^{-(t_1+t_2)C_2(j)}\chi_j
=T_{t_1+t_2}\chi_j.
\]

This is the heat-kernel sewing law. It means temporal lattice refinement introduces no approximation in this two-dimensional system.

## The cutoff calculation that matters

At \(a_\tau=0.4,0.2,0.1,0.05\), holding \(\kappa=3\), the lattice gaps are respectively

\[
0.9,\quad0.45,\quad0.225,\quad0.1125.
\]

They vanish as the transfer eigenvalues coalesce at one. Nevertheless,

\[
{-\log(\lambda_{1/2}/\lambda_0)\over a_\tau}=2.25
\]

at every refinement. This is a useful type correction: continuum physics never requires a fixed gap between eigenvalues of a one-step transfer matrix. It requires a positive logarithmic slope in physical units.

The spatial limit exposes the special nature of the result. In two dimensions,

\[
\kappa={g_2^2L\over2},
\qquad
\Delta={3g_2^2L\over8}.
\]

For \(g_2^2=1.5\) and \(L=1,2,4,8\), the gaps are \(0.5625,1.125,2.25,4.5\). These are energies of electric flux wrapping the entire circle. Their growth with \(L\) is exact confinement of global flux, not a finite local glueball mass on \(\mathbb R^3\).

## One more strong-coupling order

The Wilson one-plaquette weight also permits a sharper calculation than the leading \(\beta/4\) estimate. For \(SU(2)\),

\[
e^{(\beta/2)\operatorname{Tr}U}=e^{\beta\cos\theta},
\qquad
u(\beta)={I_2(\beta)\over I_1(\beta)},
\]

where \(u\) is the normalized fundamental character coefficient. Its expansion is

\[
u(\beta)={\beta\over4}-{\beta^3\over96}+{\beta^5\over1536}+O(\beta^7).
\]

At \(\beta=0.8\),

\[
u=0.194871276,
\]

which is \(2.56\%\) below \(\beta/4=0.2\). Replacing the local factor in a minimal area-12 tiling changes \(0.2^{12}=4.096\times10^{-9}\) to \(u^{12}=2.999\times10^{-9}\). This resums all local powers inside the plaquette coefficient. It still omits the higher connected surfaces, handles and screening graphs required for the full Wilson-loop expansion, so it is a controlled improvement rather than a hidden exact four-dimensional answer.

The exact coefficient also closes a possible weak-coupling rescue. At large \(\beta\),

\[
u(\beta)=1-{3\over2\beta}+O(\beta^{-2}),
\qquad -\log u={3\over2\beta}+O(\beta^{-2}).
\]

At \(\beta=4,8,16,32\), the exact values of \(-\log u\) are \(0.41848,0.19937,0.09671,0.04761\), approaching the displayed asymptotic law. Thus the exact local coefficient behaves sensibly where \(\beta/4\) fails, but treating \(-\log u/a^2\) as a four-dimensional physical string tension still fails: with \(\beta(a)=8b_0\log[1/(a\Lambda)]\), it grows roughly as \(1/[a^2\log(1/a)]\), rather than approaching a finite multiple of \(\Lambda^2\). The missing extended surface graphs are therefore dynamically essential, not a small numerical correction.

## Exact point of failure in four dimensions

The construction fails to lift for several independent reasons:

1. A two-dimensional gauge field has no local transverse propagating modes. Four-dimensional Yang--Mills does.
2. The diagonal group Laplacian omits the spatial-plaquette magnetic Hamiltonian coupling infinitely many links.
3. \(g_2^2\) is dimensionful, whereas the four-dimensional coupling is dimensionless and must follow an asymptotically-free renormalization trajectory.
4. A finite physical four-dimensional gap requires \(a\Delta\to0\) while the correlation length in lattice units diverges. A fixed one-step transfer gap would instead make the physical energy diverge as \(1/a\).
5. Finite-volume reflection positivity does not establish thermodynamic-limit Schwinger functions, clustering, locality, nontriviality or a spectral bound uniform in both volume and cutoff.
6. The strong-coupling series is controlled near small \(\beta\), while the asymptotically-free continuum trajectory has \(\beta\to\infty\).

For pure \(SU(2)\), the one-loop relation is

\[
\beta={4\over g_0^2}=8b_0\log{1\over a\Lambda},
\qquad b_0={22\over48\pi^2}.
\]

The formal leading strong-coupling factor \(\beta/4\) reaches one already at \(a\Lambda\simeq2.11\times10^{-5}\), then would imply a negative string tension. That is not a phase prediction; it is an exact marker that the truncated expansion has left its domain before the continuum limit.

Even substituting the exact \(u(\beta)\) cannot repair the approximation. At \(a\Lambda=10^{-2},10^{-4},10^{-8}\), its naive \(\sigma/\Lambda^2=-\log u/(a\Lambda)^2\) is respectively \(9.58\times10^3\), \(4.94\times10^7\) and \(2.35\times10^{15}\). The increasingly bad scaling demonstrates that a locally exact plaquette coefficient is not a continuum renormalization-group resummation.

## Spin(2,3) consequence

This model identifies what compactness buys: normalized Haar integration, a discrete unitary character basis and positive heat-kernel coefficients. It is therefore a valid benchmark for a compact internal \(SU(2)\) or \(Spin(5)\) sector.

It does not analytically continue into a proof for \(Spin(2,3)\). The noncompact real form lacks the same normalized Haar probability measure and positive discrete character decomposition. Nor should the full gravitational connection acquire this gap: viable Spin(2,3) gravity must retain its massless spin-2 sector.

The useful bridge question is narrower: can a completely specified broken Spin(2,3) action isolate compact or constrained subsectors whose transfer kernel has an independently proved positive spectral representation, while the Einstein sector remains massless? This exact compact calculation supplies the admission test, not the bridge.

## Exhaustion boundary

Within the minimal model, the transfer spectrum, positivity form, sewing law, heat trace and tail, time-cutoff scaling, spatial-circle scaling, exact Wilson-character coefficient and both strong- and weak-coupling asymptotics are explicit. Adding more \(j\) values cannot change the obstruction: the missing ingredient is not another representation eigenvalue but the interacting infinite three-dimensional magnetic link system and a uniform four-dimensional continuum estimate.

## Sources

- [Menotti and Onofri, heat-kernel action for SU(N) lattice gauge theory](https://doi.org/10.1016/0550-3213(81)90560-5)
- [Nguyen, Tanizaki and Ünsal, heat-kernel formulation and exact subdivision in two-dimensional Yang--Mills](https://doi.org/10.1103/PhysRevD.104.065003)
- [Kanwar and Wagman, transfer matrices and heat-kernel lattice actions](https://arxiv.org/abs/2103.02602)
- [Wilson, confinement of quarks on a lattice](https://doi.org/10.1103/PhysRevD.10.2445)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap statement](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_su2_heat_kernel_transfer_exhaustion.mjs
~~~
