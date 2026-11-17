# Selector constraints and the E8 optical source

**Date:** 8 November 2026  
**Status:** finite-model numerical results and bounded nonuniqueness audit; physical optical source open  
**Parent:** [programme record](README.md)  
**Evidence:** [multifrequency result](../../../evidence/data/translation-free-e8-multifrequency-result-v1.json), [selector audit](../../../evidence/data/translation-free-e8-selector-identifiability-v1.json)

## The source must be identified before a line strength is physical

The supplied compact-cell calculation uses

\[
H=\frac12 n^T K_{E_8}n+\sum_{i=1}^8\frac12(1-\cos\theta_i).
\]

A candidate electric dipole assigns physical charges to the rotor numbers and places their compensating reference at the origin:

\[
D=q_c a\sum_{j=0}^{7}(j-3.5)n_{j+1},\qquad H_{\rm probe}=-E D.
\]

The assignment of charge, lever arms and a uniform applied field is an implementation assumption. It is not derived from the E8 lattice. It also differs from the chain's earlier abstract transition drive. Projected charge matrices must be used to compute the dipole, rather than substituting a convenient phase-drive operator.

The [expanded dictionary result](../../../evidence/data/translation-free-e8-expanded-charge-dipole-result-v1.json) and [charge geometry](../../../evidence/data/translation-free-e8-dipole-geometry-v1.json) retain that distinction. A local-cell response is not automatically the interacting chain response, chiral current algebra or a material measurement.

## Charge-shell convergence

The [shell-convergence record](../../../evidence/data/translation-free-e8-charge-shell-convergence-result-v1.json) gives dimensionless isolated-cell quantities:

| Kinetic cutoff | Charge states | First odd gap | Static response | Coefficient of frequency squared |
|---:|---:|---:|---:|---:|
| 8 | 340321 | 0.218369494 | 16.7208312 | 67.5089970 |
| 10 | 794161 | 0.218276822 | 16.7356334 | 67.6333772 |
| 12 | 1604401 | 0.218263727 | 16.7373155 | 67.6490345 |
| 14 | 2874961 | 0.218262694 | 16.7374865 | 67.6504681 |

At cutoff 14 the first pole contains about 2.56% of the charge-drive norm. Higher transitions therefore matter even when one low resonance is reproduced. Direct inverse solves evaluate the whole finite charge shell; they do not replace the missing infinite-shell or interacting-chain error analysis.

Successive changes are much smaller than the conservative exterior-shell estimates. For example, the cutoff-14 static and frequency-squared estimates have conservative absolute error estimates about 0.906 and 9.13. Those estimates rely on numerical spectral ordering and are not interval-certified. Small cutoff drift is not a precision certificate.

## Additional lines after two shared calibrations

The [test contract](../../../evidence/data/translation-free-e8-multifrequency-test-contract-v1.json) permits only a common energy scale and common dipole-squared scale, set by the first odd line. It forbids per-line gains, independent pole shifts and a changing source geometry.

The original cutoff-8 to cutoff-10 replay fails its chosen 1% all-line criterion: the weakest tested line changes by 14.9% after calibration. The [doublet diagnostic](../../../evidence/data/translation-free-e8-doublet-overlap-diagnostic-v1.json) explains sensitivity to a small rotation of neighboring eigenstates, but is post hoc and does not erase that failure.

The later [saved predictions](../../../evidence/data/translation-free-e8-refined-frozen-predictions-v1.json) and [response predictions](../../../evidence/data/translation-free-e8-refined-frozen-response-v1.json) use cutoff 12. The first cutoff-14 line was already known and explicitly used for calibration; the new higher-line and response targets were computed after the predictions were saved.

The [refined score](../../../evidence/data/translation-free-e8-refined-holdout-score-v1.json) reports maximum errors of 0.000395% for six additional frequencies, 0.156% for their strengths and 0.00119% for five sub-resonant response points. This is computational predictivity within one supplied model, not a blinded physical experiment. The 1% threshold is an engineering criterion, not an experimental uncertainty or rigorous infinite-shell bound.

An additional control matters: one pole plus fitted constant and quadratic background can mimic the smooth sub-resonant response to about 0.82% while supplying no higher resonances. Resolved additional poles and strengths are more discriminating than a narrow-band smooth fit.

## What the selector constrains

The existing [constitutive-metric gate](../translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md) leaves the positive energy matrix as additional input. The [paired-corner locking action](../../claims/0200-0299/253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md) selects the same real survivor for every positive pair of penalty couplings, while its massive eigenvalues vary with those couplings.

For inversion parity, \(P_+dP_+=P_-dP_-=0\) constrains support, not all entries of \(P_+dP_-\). The numerical [identifiability audit](../../../evidence/data/translation-free-e8-selector-identifiability-v1.json) constructs parity-preserving deformations

\[
H_\eta=H+\eta(H-E_0)^2/\Delta_1,
\qquad d_\zeta=d+\frac\zeta2\{(H-E_0)/\Delta_1,d\}.
\]

After restoring the first frequency and strength, higher ratios still change. These are counterexamples to uniqueness from the available parity/projector constraints. They are not an assertion that the full order-18 selector acts on these E8 states, and they need not retain a future microscopic action's quadratic charging ansatz.

## Physical promotion condition

One action must independently determine the constitutive dynamics, its physical electric source and its contact terms. It must identify the selector representation on the charge Hilbert space and constrain the allowed dipole blocks. Only then do measured higher-line ratios discriminate a selector prediction from a supplied effective Hamiltonian.

The next mathematical test is uniqueness, or a bounded finite-parameter prediction, under those source-native constraints. The next physical test is an independently calibrated additional-line spectrum. Neither is supplied by increasing the numerical cutoff alone.

## T1/T2, propagation and a possible mass gap

**Interpretive clarification, 8 November 2026:** the [programme thesis](../../syntheses/grand-synthesis/aarons_spin23_research_thesis.md), under its central selection hypothesis and mass discussion, calls T1 locally dominant null/EM transport and T2 off-axis configuration mixing. Those are proposed roles, not an established identification of two physical sectors. In particular, neither T1 nor T2 is synonymous with position space or momentum space. Fourier transformation changes a representation; a momentum-dependent coupling can act in either representation. A massless excitation already has energy and momentum.

A concrete ordinary mathematical comparison is the one-dimensional two-component Hamiltonian

\[
H(p)=cp\,\sigma_z+\Delta\,\sigma_x,
\qquad H(p)^2=(c^2p^2+\Delta^2)I.
\]

Here the Pauli matrices anticommute, the kinetic inner product is assumed positive, and the real constant \(\Delta\) is supplied. With \(\Delta=0\), the two transport components have slopes \(+c,-c\). Nonzero mixing gives eigenvalues \(E_\pm=\pm\sqrt{c^2p^2+\Delta^2}\). For the positive branch,

\[
E^2=c^2p^2+m^2c^4,\qquad m=|\Delta|/c^2,
\qquad v_g=\partial_pE=c^2p/E.
\]

Thus an anticommuting mixing term can generate a rest-energy scale without changing the coefficient \(c\). This is the algebraic pattern of a reduced Dirac Hamiltonian; see [Tong's Dirac-field treatment](https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S4.html). The displayed result follows directly by squaring this declared matrix. It does not identify these two components with photon helicities or with the corpus's T1/T2, derive \(\Delta\), or explain dielectric photon slowing. Generic two-channel mixing gives avoided crossings and need not have this relativistic form. A spinor-field interpretation also requires the appropriate field theory; the matrix alone is not the complete particle theory.

The connection to the Hessian is conditional. Curvature and kinetic normalization can supply a stable gap; a sector projector alone does not fix either. The physical identification requires a selector-compatible action that derives the mixing operator, its anticommutation relations, normalization and magnitude. The discriminator is the resulting gap and dispersion over several momenta, rather than a fit at one energy.

The thesis also records a sign obstruction: periodic momentum in a literal extra timelike direction gives negative effective mass squared in the simplest free reduction. The two-component example above assumes a healthy kinetic structure instead of resolving that obstruction. Consequently “T2 mixing generates a positive rest-energy gap” remains a hypothesis to derive, rather than a consequence of the Spin(2,3) signature.

The [action-level continuation](T1_T2_ACTION_AND_MASS_GAP.md) now checks the corpus's explicit candidates. Pure cross-sector support derives an anticommutator conditionally; the scalar action generates a profile with supplied Yukawa and vacuum scales, while the minimal fixed-norm Spin(2,3) gravity action has no additional propagating mass pole. A critical derivative extension has a positive torsion pole but no T1/T2 operator identification.
