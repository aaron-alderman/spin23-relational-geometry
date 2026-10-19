# Result 29: the Furey incidence kernel is derived but the exact ALP charge ray depends on an underived metric

## Result

The sixteen-state Furey incidence calculation robustly selects a sterile-neutrino kernel. It does not uniquely select the numerical ALP ray used in Results 21--28.

Two already-established incidence contractions are natural:

\[
\lambda_{\rm dedup}=(5,5,1,1,1,0),
\]

\[
\lambda_{\rm mult}=(5,5,1,1,3,0).
\]

Both have \(\nu^c\) as their unique zero sector. Both jointly resolve the full matter center with \(3(B-L)\). They differ because the second contraction retains response-component multiplicity in the charged-lepton sector.

After conversion from all-left charges to the conventional right-handed ALP basis, their physical charged-fermion patterns are

\[
(-10,-6,-2)
\quad\hbox{and}\quad
(-10,-6,-4).
\]

## Phenomenological size of the ambiguity

Full ALPaca running gives:

| incidence normalization | \(c\tau\), 100 MeV | \(c\tau\), 300 MeV | NA62 dimuon curve crossing |
|---|---:|---:|---:|
| deduplicated | 20.65 km | 0.228 m | \(1.80\times10^6\) GeV |
| multiplicity preserving | 7.45 km | 0.0826 m | \(2.32\times10^6\) GeV |

The scale-free \(\mathrm{BR}(K\to\pi a)c\tau\) discriminator changes by a factor of about 2.76 between these two incidence conventions.

## Honest derivation boundary

What is derived:

- the incidence support;
- the sterile-neutrino kernel;
- complementarity with \(B-L\);
- full joint sector resolution.

What is not derived:

- the response-space inner product deciding whether repeated components are deduplicated or counted;
- therefore the charged-lepton eigenvalue;
- therefore the exact relative ALP charge ray.

The algebraic mainline should now target one narrow question:

> Does a source-derived spectral measure, action or canonical frame operator choose one incidence contraction?

Until that happens, the programme predicts a small family of rays sharing a kernel, not the unique ray \((-10,-6,-2)\).

## Subsequent metric test

Result 32 tests the strongest basis-independent internal candidate already present in the folder. After right-handed-neutrino completion, the middle-slot Hilbert--Schmidt frame has weights

\[
(14,14,8,2,6,12)
\]

and no kernel. It therefore selects neither incidence normalization. The absorptive spectral metric is independently physical but top- and threshold-dominated. The unresolved target is now specifically an action-derived completed metric, not an untested generic appeal to canonicality.

## Dependencies

- `634_the_right_handed_neutrino_completion_moves_the_furey_incidence_kernel_from_l_to_nuc.md`
- `636_anomaly_free_charge_and_ternary_incidence_jointly_generate_the_full_six_sector_center.md`
- `650_incidence_and_b_minus_l_generate_a_full_rank_relational_current_carrier.md`
- Driver: `scripts/run_programme_incidence_alpaca_comparators.py`
- Certificate: `scripts/verify_programme_alp_identifiability_summary.mjs`
