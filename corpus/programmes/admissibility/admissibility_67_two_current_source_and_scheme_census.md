# The two-current frontier is three calculations, not one

**Date:** 25 October 2026  
**Status:** source-and-scheme census complete; its initial WP-A next action is superseded by the corpus-native five-coordinate result in AZ-068
**Topic:** OT-047  
**Parents:** [source-frame torsor](../closure/programme_closure_02_the_source_subspace_is_canonical_but_its_frame_is_an_affine_torsor.md), [external-source action](../closure/programme_closure_03_a_controlled_standard_model_external_source_action_exists_but_does_not_fix_the_frame.md), [vacuum spectral cone](../closure/programme_closure_04_vacuum_locality_closes_the_two_current_spectral_measure_on_h2r_but_not_the_thermal_response.md)  
**Evidence:** [source-and-scheme ledger](../../../evidence/data/two-current-source-scheme-census-v1.json)  
**Generator:** [census generator](../../../scripts/run-two-current-source-scheme-census.mjs)  
**Verifier:** [census certificate](../../../verification/admissibility/verify_two_current_source_scheme_census.mjs)

## Result

The remaining incidence/$B-L$ calculation has often been described as one renormalized $2\times2$ current correlator. That is too compressed. The **source-label space** is two-dimensional, but the calculation is not. It separates into three work packages with different inputs, invariants and failure modes:

1. ultraviolet composite-operator closure and mixing;
2. broken-phase correlators, threshold matching and local contacts;
3. finite-temperature tensor structure, KMS relations and approximate-charge relaxation.

The literature supplies the architecture of all three. It does not supply the programme-specific anomalous dimensions, contact tensor, thermal coefficients or surviving observable ratios. OT-047 therefore advances from an undifferentiated request to a finite calculation plan, but it does not close.

## Why two labels are not two response components

Let $J_\lambda^\mu$ denote the nonconserved incidence insertion and $J_q^\mu=J_{B-L}^\mu$ the protected current on the Dirac-neutrino branch. The correlator

\[
\Pi_{ij}^{\mu\nu}(k),\qquad i,j\in\{\lambda,q\},
\]

has a $2\times2$ **label matrix**, but each entry carries Lorentz structure. In vacuum it separates into transverse and longitudinal projectors plus local polynomials. At finite temperature a rest-frame vector $u^\mu$ permits distinct spatial transverse, longitudinal and—when the symmetries allow it—antisymmetric structures. The broken incidence Ward identity also couples the current sector to Yukawa-breaking operators. Contacts and threshold coefficients add further matrices that are not spectral densities.

Calling all of this “the $2\times2$ response” hides precisely the choices the admissibility programme is meant to expose.

## Work package A — operator closure and running

Choose a declared mass-independent scheme, begin above electroweak breaking and close the gauge-invariant composite-operator basis under renormalization. General operator-mixing results require EOM, BRST-exact and total-derivative sectors to be tracked even when some vanish in physical matrix elements. An explicit Higgs-phase vector-composite calculation supplies a precedent for mixing with another gauge-invariant vector of the same quantum numbers; it is not a Standard-Model answer.

On the exact Dirac $B-L$ branch, the Ward identity constrains the source subblock to the triangular form

\[
\frac{d}{d\ln\mu}
\begin{pmatrix}J_\lambda\\J_q\end{pmatrix}
=
\begin{pmatrix}
\gamma_{\lambda\lambda}&\gamma_{\lambda q}\\
0&0
\end{pmatrix}
\begin{pmatrix}J_\lambda\\J_q\end{pmatrix},
\]

up to the additional closure sectors and a convention for whether operators or sources carry the transpose action. The zero protected row is structural; $\gamma_{\lambda\lambda}$, $\gamma_{\lambda q}$ and any finite frame condition are not known. A generic nonzero off-diagonal term realizes the corpus's affine $B-L$ shear rather than eliminating it.

## Work package B — broken phase, cuts and contacts

After electroweak symmetry breaking, compute the renormalized matrix $\Pi_{ij}^{\mu\nu}$, match through the top, weak, bottom and charm thresholds, and keep three outputs separate:

- nonlocal transverse spectral density;
- the incidence longitudinal spectral density and breaking-operator insertions;
- the real symmetric local contact/subtraction tensor.

Positivity governs the spectral measure. It does not determine the contact polynomial or normalize the source frame. Exact $B-L$ removes its nonlocal longitudinal row and column only before Majorana breaking and only modulo Ward contacts. A Majorana mass removes the protected zero row and begins a separate calculation; it is not a small annotation on the Dirac result.

Published ALP evolution is useful here but only on one side. It supplies a controlled running and matching template for a derivative probe of the broken incidence direction. Exact $B-L$ is derivative-null in that embedding, so an ALP cannot realize the full two-port vector response. This is a cross-check, not the missing answer.

## Work package C — thermal structure and records

At finite temperature, write the rest-frame projectors before taking $\omega\to0$ or $|\mathbf k|\to0$. Construct retarded and symmetric correlators on the Schwinger–Keldysh contour. Dynamical KMS then constrains fluctuation–dissipation relations schematically as

\[
G_{\mathrm{sym}}(\omega,\mathbf k)
\propto
\coth\!\left(\frac{\beta\omega}{2}\right)\rho(\omega,\mathbf k),
\]

with convention-dependent overall factors. It does **not** select the incidence/$B-L$ frame, remove contact terms or make the incidence charge hydrodynamic. The approximate-symmetry literature shows how explicit breaking introduces a relaxation sector constrained by spurions and KMS, but the coefficient must be calculated for this source.

The order of limits is therefore part of the observable. A rank found at fixed nonzero frequency need not survive the hydrodynamic window; a noise matrix inferred from KMS does not by itself determine the retarded real part.

## Literature boundary

The auditable ledger assigns a narrow role to each source:

- [Collins and Scalise](https://arxiv.org/abs/hep-ph/9403231): general composite-operator mixing and an on-shell zero-momentum infrared warning;
- [Capri et al.](https://arxiv.org/abs/2007.01770): an explicit Higgs-phase vector-composite mixing precedent;
- [Bauer et al.](https://arxiv.org/abs/2012.12272) and [Chala et al.](https://arxiv.org/abs/2012.09017): ALP bases, running and threshold matching;
- [Quevillon, Smith and Vuong](https://arxiv.org/abs/2112.00553): anomalous Ward-identity discipline for derivative Goldstone couplings;
- [Jain and Kovtun](https://arxiv.org/abs/2309.00511): causal background-source Schwinger–Keldysh/KMS architecture;
- [Hongo et al.](https://arxiv.org/abs/2411.08016): approximate-symmetry relaxation as a typed additional sector;
- [Gesztesy and Tsekanovskii](https://arxiv.org/abs/funct-an/9712004): the matrix-valued Herglotz framework behind the positive spectral measure.

None computes the corpus's incidence/$B-L$ matrix. Importing their theorems without the new matrix elements would repeat the same error AZ-066 exposed: mistaking a general envelope for a new programme-specific restriction.

## Exact next calculation

The census initially identified WP-A as the next admissible tranche:

1. freeze the Dirac-neutrino branch, gauge, operator basis and subtraction convention;
2. generate every one-loop 1PI insertion needed for the closed vector/breaking basis;
3. extract $\gamma_{\lambda\lambda}$, $\gamma_{\lambda q}$ and the source-source counterterm matrix;
4. verify the protected $B-L$ Ward identity and gauge-parameter independence of physical entries;
5. only then match into WP-B and construct the WP-C thermal theory.

The first decisive fork is simple. If $\gamma_{\lambda q}=0$ and a physical normalization makes $J_\lambda$ multiplicative, the corpus has a preferred running frame candidate. If a generic scale-dependent shear survives, only frame-covariant quantities—rank, determinant after normalization, pole loci and properly contracted observables—can be promoted.

The subsequent whole-corpus reconciliation in [AZ-068](admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md) found that Results 33 and 35 had already completed the scheme-insensitive part of this step. Their exact five-coordinate quotient and leading noncontact Yukawa block kill algebraic two-current closure. The surviving calculation is therefore the energy-dependent five-channel absorptive response and its operational low-rank test, not another abstract $2\times2$ mixing ansatz.

## Open and closed

Closed:

- the literature categories required by OT-047;
- the separation into three work packages;
- the protected Dirac $B-L$ row and the separate Majorana fork;
- the fact that ALP running tests only the broken incidence side, not the two-port vector response;
- the minimum deliverables and scheme firewalls.

Open:

- every programme-specific loop coefficient;
- the finite source shear and contact tensor;
- threshold-matched spectral rank and invariant ratios;
- thermal parity-odd structures, relaxation rate and hydrodynamic rank;
- any empirical claim based on those quantities.

## Implication

The route to something useful is now less mystical and more demanding. A conventional outcome would deliver a fully renormalized two-source response model, clarify which quantities are frame invariant and provide a disciplined benchmark for thermal and detector calculations. A non-generic protected frame or no-refit ratio would be the place to look for additional structure. Either result improves the theory: one removes false invariants; the other creates a sharply testable one.

## Reproduction

~~~powershell
node scripts/run-two-current-source-scheme-census.mjs --write
node verification/admissibility/verify_two_current_source_scheme_census.mjs
~~~
