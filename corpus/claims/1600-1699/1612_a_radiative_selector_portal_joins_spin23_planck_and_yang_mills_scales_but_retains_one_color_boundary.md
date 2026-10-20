# A Radiative Selector Portal Joins Spin(2,3), Planck and Yang--Mills Scales but Retains One Color Boundary

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** explicit positive one-loop Gildener--Weinberg construction with scalar Hessian, colored threshold, induced Planck scale, AdS backreaction match and RG sensitivity ledger; absolute scale and color coupling remain boundary data

**Depends on:** [the E6 threshold/shared-scale no-go](../1500-1599/1597_e6_threshold_descent_leaves_lambda_qcd_exponentially_sensitive_and_no_spin5_su3_scale_is_protected.md), [the explicit minimal Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), and [the topological shared-scale no-go](1601_topological_charge_and_theta_angles_do_not_protect_a_qcd_spin23_or_cosmological_shared_scale.md)

**Evidence:** [radiative selector-portal ledger](../../../evidence/data/spin23-radiative-selector-portal-construction.json) and [deterministic verifier](../../../verification/verify/verify_spin23_radiative_selector_portal_construction.mjs)

## Result

There is a nonempty, perturbatively controlled class of classically
scale-invariant models in which one radiatively generated vacuum expectation
value does all three jobs requested:

1. it fixes a Stelle--West-type selector norm and breaks
   \(Spin(2,3)\to Spin(1,3)\);
2. it induces \(M_{\rm Pl}\) and the AdS/Cartan breaking scale;
3. it masses colored threshold fields, below which pure \(SU(3)\) runs to a
   Yang--Mills scale.

The construction is positive: its tree Hessian is positive semidefinite, the
one-loop scalon mass is positive, color remains unbroken and a finite
weak-coupling benchmark exists. It derives several scale **relations** from a
single transmutation scale. It does not predict the absolute scale or the
hierarchy \(\Lambda_{\rm YM}/M_{\rm Pl}\), because the latter retains the
exponential boundary datum \(g_3(v)\).

## Declared scale-invariant portal

Let \(s=\sqrt2|\Phi|\) be the radial mode of a complex scalar charged under a
hidden \(U(1)_X\), and let \(\chi\) be the radial norm of a selector
\(\Sigma^A=\chi n^A\), with \(n^An_A=-1\). In selector gauge, \(n^A\) breaks
\(Spin(2,3)\) to the Lorentz subgroup. Add \(N_T\) complex color triplets
\(T_i\), but no colored fermions or other light matter. The relevant terms are

\[
{\cal L}=\sqrt{-g}\left[
{\xi\chi^2\over2}R-|D\Phi|^2-{1\over2}(\partial\chi)^2
-\sum_i|D T_i|^2-{1\over4}F_X^2-{1\over4}G^a_{\mu\nu}G^{a\mu\nu}-V_0
\right],
\]

\[
V_0={\lambda_s\over4}s^4+{\lambda_\chi\over4}\chi^4
-{\lambda_p\over4}s^2\chi^2
+{\kappa\over2}\chi^2\sum_{i=1}^{N_T}T_i^\dagger T_i
+\lambda_T\left(\sum_iT_i^\dagger T_i\right)^2.
\]

Every coupling is dimensionless. There is no classical mass. The nonminimal
term is the gauge-fixed induced-gravity coupling. A fully covariant Cartan
parent and its constraint algebra remain a separate admission gate; in
particular this claim does not use a naive noncompact Yang--Mills kinetic form.

## Gildener--Weinberg ray and scalar mass matrix

At a renormalisation scale \(\mu_{\rm GW}\), impose

\[
\lambda_p=2\sqrt{\lambda_s\lambda_\chi},
\qquad \lambda_s,\lambda_\chi,\lambda_p,\kappa,\lambda_T>0.
\]

Then the tree potential is nonnegative and has the flat ray

\[
s=n_s r,\quad\chi=n_\chi r,\qquad
{n_s^2\over n_\chi^2}={\lambda_p\over2\lambda_s}
=\sqrt{\lambda_\chi/\lambda_s},\qquad n_s^2+n_\chi^2=1.
\]

At \(r=v\), \(T_i=0\), the \((s,\chi)\) Hessian is

\[
{\cal M}_0^2=v^2
\begin{pmatrix}
\lambda_p n_\chi^2&-\lambda_p n_sn_\chi\\
-\lambda_p n_sn_\chi&\lambda_p n_s^2
\end{pmatrix}.
\]

Its eigenvalues are \(0\) along the flat ray and
\(m_H^2=\lambda_pv^2>0\) orthogonal to it. The colored fields have

\[
m_T^2={\kappa n_\chi^2\over2}v^2>0,
\]

so the radiative vacuum does not break color.

Along the ray, the one-loop potential in the \(\overline{\rm MS}\), Landau-gauge
Gildener--Weinberg approximation is

\[
V_1(r)=Ar^4+Br^4\log{r^2\over\mu_{\rm GW}^2},
\qquad
\log{v^2\over\mu_{\rm GW}^2}=-{1\over2}-{A\over B}.
\]

Define

\[
k_X=g_X^2n_s^2,\quad k_H=\lambda_p,\quad
k_T={\kappa n_\chi^2\over2},\quad d_T=6N_T.
\]

Keeping the fields in the declared model,

\[
B={3k_X^2+k_H^2+d_Tk_T^2\over64\pi^2}>0,
\]

\[
A={1\over64\pi^2}\left[
3k_X^2(\log k_X-5/6)+k_H^2(\log k_H-3/2)
+d_Tk_T^2(\log k_T-3/2)\right].
\]

The formerly flat scalon obtains

\[
m_\sigma^2=8Bv^2>0,\qquad V(v)=-{B\over2}v^4.
\]

Thus dimensional transmutation really generates the common order parameter;
\(v/\mu_{\rm GW}\) is determined once the running dimensionless couplings at
the GW scale are supplied.

## Spin(2,3), Planck and curvature scales

Declare the low-energy Cartan matching

\[
\chi_0=n_\chi v,\qquad
M_{\rm Pl}=\sqrt\xi\,\chi_0,\qquad
\ell^{-1}=g_A\chi_0,\qquad
\Lambda_{\rm grav}=-3\ell^{-2}.
\]

The first equation is the selector vev, the second follows from induced
gravity, and the third defines the normalization of the broken Cartan
generator. If the radiative sector is the only vacuum-energy source, the
Einstein equation requires

\[
V(v)=M_{\rm Pl}^2\Lambda_{\rm grav}
\quad\Longrightarrow\quad
B=6\xi g_A^2n_\chi^4.
\]

This is a genuine conditional joining relation. It fixes

\[
g_A^2={B\over6\xi n_\chi^4},\qquad
M_{\rm Pl}\ell={\sqrt\xi\over g_A}
={\sqrt6\,\xi n_\chi^2\over\sqrt B}.
\]

It is not symmetry protection: an independent vacuum sector, a permitted
finite vacuum counterterm, higher loops or an uplift changes it. But in the
minimal declared model it is derived, rather than inserted. Since the
benchmark below has \(\ell^{-1}/m_\sigma=0.125\), using the flat-space
one-loop potential is locally self-consistent at leading order; curved-space
corrections are a controlled next calculation rather than an order-one
omission.

## The same vev feeds pure color through a calculable threshold

For \(N_T=6\) complex fundamental color triplets, the one-loop coefficients
above and below \(M_T\) are

\[
b_H=11-{N_T\over6}=10,\qquad b_L=11.
\]

Matching \(g_3\) at \(M_T=\sqrt{k_T}v\) gives

\[
\Lambda_{\rm YM}^{11}=M_T\Lambda_H^{10},
\]

or directly in terms of the boundary coupling at \(v\),

\[
{\Lambda_{\rm YM}\over v}
=k_T^{1/22}\exp\left[-{8\pi^2\over11g_3^2(v)}\right].
\]

Consequently

\[
{\Lambda_{\rm YM}\over M_{\rm Pl}}
={k_T^{1/22}\over\sqrt\xi n_\chi}
\exp\left[-{8\pi^2\over11g_3^2(v)}\right].
\]

This is more than a verbal portal: the same \(T_i\) that contribute positively
to the Coleman--Weinberg coefficient are the explicit color threshold. But the
logarithmic sensitivities expose the remaining freedom:

\[
{\partial\log(\Lambda_{\rm YM}/M_{\rm Pl})\over\partial\log g_3(v)}
={16\pi^2\over11g_3^2(v)},\quad
{\partial\log\over\partial\log\kappa}={1\over22},\quad
{\partial\log\over\partial\log\xi}=-{1\over2},\quad
{\partial\log\over\partial\log n_\chi}=-{10\over11}.
\]

The portal and threshold dependence is mild; the color boundary is
exponential.

## Finite positive benchmark

Choose at \(\mu_{\rm GW}\)

\[
(\lambda_s,\lambda_\chi,\lambda_p,g_X,\kappa,\lambda_T,N_T,\xi)
=(0.04,0.01,0.04,0.6,0.1,0.1,6,2).
\]

Then \(n_s^2=1/3\), \(n_\chi^2=2/3\), and

\[
\begin{array}{c|c}
\text{quantity}&\text{value in units of }v\\\hline
v/\mu_{\rm GW}&5.48925\\
m_H&0.200000\\
m_X&0.346410\\
m_T&0.182574\\
m_\sigma&0.0327720\\
M_{\rm Pl}&1.15470\\
\ell^{-1}&0.00409650
\end{array}
\]

Here \(B=1.34250568\times10^{-4}\), the vacuum consistency relation gives
\(g_A=0.00501717\), and both sides of
\(V=M_{\rm Pl}^2\Lambda_{\rm grav}\) equal
\(-6.71252842\times10^{-5}v^4\).

With \(g_3(v)=0.7\), running through \(M_T\) gives
\(g_3(M_T)=0.740145\) and

\[
{\Lambda_{\rm YM}\over v}=3.72375\times10^{-7},\qquad
{\Lambda_{\rm YM}\over M_{\rm Pl}}=3.22487\times10^{-7}.
\]

Changing only \(g_3(v)=(0.6,0.7,0.8)\) moves the latter ratio through

\[
(1.62617\times10^{-9}, 3.22487\times10^{-7},
9.99025\times10^{-6}),
\]

more than four orders of magnitude. At \(g_3(v)=0.7\), the exact logarithmic
sensitivity is \(29.2975\). By contrast doubling \(\kappa\) changes the scale
ratio only by the power \(2^{1/22}\).

## Stability and honesty gates

The construction passes the finite one-loop gates:

- the tree quartic is nonnegative and has exactly one flat ray at the GW scale;
- the orthogonal scalar, hidden vector, colored thresholds and scalon all have positive mass squared;
- \(T_i=0\) is color preserving;
- \(B>0\), all displayed couplings are perturbative and curvature is below the lightest scalar mass;
- one-loop threshold matching is continuous and both color couplings in the scan remain perturbative.

It does not yet prove:

- all-scale vacuum stability or absence of a Landau pole; this requires the complete beta functions and RG improvement;
- gauge- and scheme-independent higher-loop masses; Nielsen identities and curved-space terms must be included consistently;
- a UV reason for the GW boundary condition or for the value of \(g_3(v)\);
- the constructive pure-Yang--Mills Hamiltonian gap below \(\Lambda_{\rm YM}\);
- a unique ghost-free covariant Spin(2,3) parent for the gauge-fixed induced-gravity matching.

The exact division is therefore:

\[
\boxed{
\begin{array}{ll}
\textbf{derived within the declared model:}&
v/\mu_{\rm GW},\ m_i/v,\ M_{\rm Pl}/v,\
\ell^{-1}/v,\ \Lambda_{\rm YM}/v,\text{ and the threshold law};\\
\textbf{chosen boundary data:}&
\mu_{\rm GW}\text{ (hence the absolute scale), dimensionless couplings,}
\ g_3(v),\text{ field content and Cartan normalization};\\
\textbf{not derived:}&
\text{the observed hierarchy, cosmological constant after extra sectors,}
\text{ or the rigorous YM gap.}
\end{array}}
\]

This is the strongest surviving joined-scale construction found in this
tranche: it replaces three unrelated dimensionful inputs by one transmuted
scale and dimensionless matching laws. Its irreducible next target is a UV
boundary principle for \(g_3(v)\) and the portal couplings.

## Primary sources

- S. Coleman and E. Weinberg, [*Radiative Corrections as the Origin of Spontaneous Symmetry Breaking*](https://doi.org/10.1103/PhysRevD.7.1888), *Phys. Rev. D* **7** (1973) 1888.
- E. Gildener and S. Weinberg, [*Symmetry Breaking and Scalar Bosons*](https://doi.org/10.1103/PhysRevD.13.3333), *Phys. Rev. D* **13** (1976) 3333.
- K. S. Stelle and P. C. West, [*Spontaneously Broken de Sitter Symmetry and the Gravitational Holonomy Group*](https://doi.org/10.1103/PhysRevD.21.1466), *Phys. Rev. D* **21** (1980) 1466.
- A. Zee, [*A Broken-Symmetric Theory of Gravity*](https://doi.org/10.1103/PhysRevLett.42.417), *Phys. Rev. Lett.* **42** (1979) 417.
- T. Appelquist and J. Carazzone, [*Infrared Singularities and Massive Fields*](https://doi.org/10.1103/PhysRevD.11.2856), *Phys. Rev. D* **11** (1975) 2856.
- D. J. Gross and F. Wilczek, [*Ultraviolet Behavior of Non-Abelian Gauge Theories*](https://doi.org/10.1103/PhysRevLett.30.1343), and H. D. Politzer, [*Reliable Perturbative Results for Strong Interactions?*](https://doi.org/10.1103/PhysRevLett.30.1346), for one-loop asymptotic freedom.
