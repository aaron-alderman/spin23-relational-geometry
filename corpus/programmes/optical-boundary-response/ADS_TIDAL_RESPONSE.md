# A matched-source tidal comparison on an AdS slab

**Date:** 13 November 2026  
**Status:** exact symbolic bulk comparison for one sourced AdS-wave sector; no physical measurement or admission  
**Evidence family:** matched-ads-tidal-fixture  
**Evidence:** [result record](../../../evidence/data/ads-tidal-response-v1.json) and [symbolic replay](../../../verification/verify/verify_ads_tidal_response.py)

Two neighboring freely falling probes measure relative acceleration. We send the same conserved pulse through a finite AdS slab, then compare what the probes read in curvature GR, its torsion and non-metricity equivalents, and the corpus's minimal fixed-norm Spin(2,3) theory. Each gives the same nonzero change from vacuum. Treating the bare flat affine connection as the probe connection gives zero and fails the on/off control.

## Source, walls and solution

Use signature \((-+++)\), \(R^\rho{}_{\sigma\mu\nu}=[\partial_\mu\Gamma_\nu-\partial_\nu\Gamma_\mu+[\Gamma_\mu,\Gamma_\nu]]^\rho{}_\sigma\), \(\kappa=8\pi G\) and \(\Lambda=-3/\ell^2\). Take dimensionless coordinates on a Poincaré patch, \(1\le z\le2\), with translation invariance in \(x,v\). The metric and fixed source are

\[
ds^2=\frac{\ell^2}{z^2}(-2\,du\,dv+dx^2+dz^2+H(u,z)\,du^2),\qquad
\kappa T_{\mu\nu}=\epsilon f(u)\,\partial_\mu u\,\partial_\nu u.
\]

Here \(\epsilon\ge0\) and \(f(u)=64u^3(1-u)^3\) for \(0<u<1\), zero elsewhere. The profile is \(C^2\) across the joins. The dust can be supplied by the spinless action \(-\tfrac12\int\sqrt{-g}\rho\,g^{\mu\nu}\partial_\mu\phi\,\partial_\nu\phi\), with \(\phi=u\) and \(\kappa\rho=\epsilon f(u)\). The raised dust direction is \(k^\sharp=-(z/\ell)^2\partial_v\). It is null, affinely geodesic because \(k=d\phi\) and \(k^2=0\), and \(\nabla_\mu(\rho k^\mu)=0\) because the current is independent of \(v\). Its radial flux vanishes at the walls.

Match the induced metric to the vacuum metric on both timelike radial walls, so \(H(u,1)=H(u,2)=0\). Use the vacuum branch before the pulse and the same symmetry restriction throughout. Direct curvature gives

\[
G_{\mu\nu}+\Lambda g_{\mu\nu}
=-\frac12\left(H_{zz}-\frac2zH_z\right)\partial_\mu u\,\partial_\nu u .
\]

The homogeneous radial solutions are \(1,z^3\), and the source admits the particular profile \(z^2\epsilon f(u)\). The two wall values uniquely fix the homogeneous coefficients in this sector. The exact solution is

\[
H=\epsilon f(u)\left(z^2-\frac37 z^3-\frac47\right).
\]

The pre-pulse branch and two walls specify this reduced boundary-value problem. They do not supply a full spacelike initial-value or global AdS scattering problem. The Siklos ansatz and its geodesic-deviation context are described by [Podolský](https://arxiv.org/abs/gr-qc/9801052). The sourced finite-slab fixture here is a separate calculation.

## Match the boundary variational problem

The common reference action is Einstein–Hilbert plus the cosmological term, the fixed-induced-metric Gibbons–Hawking–York completion on the radial walls, and the same metric-coupled null dust. Work locally in the other directions, with variations supported away from their end caps. Using the paper's signs, \(R(g)=-\mathbb T-2D_\mu T^\mu=-\mathbb Q-D_\mu(Q^\mu-\widetilde Q^\mu)\) for the respective flat connections. Retain the appropriate divergence as an oriented boundary flux when replacing \(R(g)\) by \(-\mathbb T\) or \(-\mathbb Q\), and retain the common metric boundary completion. Thus the matched actions agree on the constrained connection sectors, including the metric wall variations. Merely specifying the same \(H\) at the walls would leave the variational comparison underspecified. [Beltrán Jiménez, Heisenberg and Koivisto, eqs. (3.6), (4.3) and §5](https://arxiv.org/pdf/1903.06830)

For the minimal fixed-norm action, the source couples only through \(g\), so it supplies no spin current to the independent Lorentz connection. The invertible coframe and the algebraic Cartan equation imply \(T^a=0\). Use the first-order boundary completion that reduces to the same metric Dirichlet action after eliminating \(\omega\), with the Euler term canceled locally by its boundary primitive on the chosen framed slab. This specifies a common bulk-response ensemble. Euler and other boundary charges, global frame sectors, and independently specified affine boundary data are outside this test. [Claim 1596](../../claims/1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md)

## Calculate the record

At each sample event launch a freely falling metric probe with \(U=(z/\ell)[\partial_u+(1+H)\partial_v/2]\). The spatial axes are \((z/\ell)\partial_x\), \((z/\ell)\partial_z\), and \((z/\ell)[\partial_u+(H-1)\partial_v/2]\). This is an instantaneous orthonormal tetrad. The measured tensor is \(\mathcal E_{ij}=R(E_i,U,E_j,U)\), with relative acceleration \(D^2\xi^{\hat i}/d\tau^2=-\mathcal E_{ij}\xi^{\hat j}\). Vacuum gives \(\ell^{-2}I_3\). The additional tide along the pulse is

\[
\Delta\mathcal E=\frac{z^2}{2\ell^2}
\operatorname{diag}\left(\frac{H_z}{z},\,\frac{H_z}{z}-H_{zz},\,0\right).
\]

The replay constructs the Levi-Civita curvature directly in GR. For TEGR it constructs the Weitzenböck connection from the coframe and reconstructs the metric probe connection from its torsion and contortion. For STEGR it uses the coincident connection and reconstructs the probe connection from the non-metricity and disformation. For minimal Spin(2,3) it verifies the spinless Cartan equation and reconstructs the metric Riemann tensor from the Lorentz block \(F^{ab}=R^{ab}+\ell^{-2}e^a\wedge e^b\) with the AdS term removed. The full reconstructed Riemann tensors agree symbolically on this solution, and every formulation has zero sourced Einstein-equation residual. These are four equivalent evaluations of one fixture.

At \((u,z)=(1/2,3/2)\) each gives the following source-on minus source-off diagonal in units of \(\epsilon/\ell^2\).

| Formulation | \(x\) | \(z\) | Longitudinal |
|---|---:|---:|---:|
| GR | \(9/112\) | \(243/112\) | \(0\) |
| TEGR | \(9/112\) | \(243/112\) | \(0\) |
| STEGR | \(9/112\) | \(243/112\) | \(0\) |
| Minimal Spin(2,3) | \(9/112\) | \(243/112\) | \(0\) |

The trace \(9\epsilon/(4\ell^2)\) agrees with \(\kappa T_{\mu\nu}U^\mu U^\nu\) at the sample. The affine curvature is zero in TEGR and STEGR, so using it directly as the detector would erase this nonzero record. The full AdS Cartan curvature instead vanishes on the vacuum background and is nonzero on the sourced solution. A full pure-gauge Cartan ansatz fails to represent this sourced solution. [Gravity-route checkpoint](../closure/spin23-gravity-route/README.md)

## Scope and next discriminator

The [boundary-charge continuation](ADS_BOUNDARY_CHARGES.md) evaluates the finite-wall Brown–York charges on this same fixture and checks the two-wall energy against the integrated dust current.

The exact zero between formulations is a control for a local metric probe in the matched bulk theory. It supplies neither a torsion mass pole nor a new T1/T2 source coupling. To test a different branch, fix one connection-sensitive matter action or a distinct boundary observable, derive its response on the same source and wall fixture, and calculate which part survives the pulse on/off subtraction and gauge and boundary matching. An additional response requires a coupling and a detector specified by the candidate theory.

Replay from the repository root with SymPy:

~~~powershell
& .venv-alpaca/Scripts/python.exe verification/verify/verify_ads_tidal_response.py
~~~
