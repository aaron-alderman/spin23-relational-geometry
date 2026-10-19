# The Eighteen-Background Bias Labels Form a Global Eigenbundle but Not a Common Four-Scalar Rational-Inner Law

## Claim status

Exact finite-orbit computational audit under the fixed polarization and port convention used by the established eighteen-background bias-square theorem. It proves a no-go for the simplest background-independent scalar functional calculus and supplies a finite fiberwise replacement. It does not exclude a nontrivial fractional, frequency-rescaling or polarization-transport law.

## 1. Dependency being tested

The selected checkpoint admits a coupled four-channel rational-inner interpolation. The next question is whether all eighteen selector backgrounds can use the same four scalar functions, with only their spectral projector frame transported.

The strongest simple version would be

\[
S_g(z)=\sum_{f\in\{u,\nu,d,e\}} f_f(z)P_f(g),
\]

where the four scalar functions \(f_f\) are independent of the background \(g\), while the globally bias-labelled projectors \(P_f(g)\) move over the orbit.

At a common checkpoint frequency \(\omega_0\), this requires

\[
f_f(\omega_0)=\lambda_f(g)
\]

to be independent of \(g\). Thus the typed eigenvalues themselves give an immediate falsification test.

## 2. Correct typing over the orbit

At every background, the four spectral projectors occupy the four distinct bias cells

\[
CL,\quad CR,\quad DL,\quad DR.
\]

Choose the global orientation representative

\[
u\mapsto CL,
\qquad
\nu\mapsto DL,
\qquad
d\mapsto DR,
\qquad
e\mapsto CR.
\]

This labels each eigenvalue as \(\lambda_f(g)\) without identifying raw port coordinates with source atoms. The opposite global orientation exchanges left and right and gives the companion labelling.

## 3. The orbit is not isospectral

For each of the eighteen scattering matrices, the certificate compared its unordered eigenvalue multiset with background zero over all \(4!=24\) permutations.

Only backgrounds

\[
0\quad\text{and}\quad2
\]

are isospectral to background zero within \(10^{-8}\). The other sixteen have best matching errors ranging at order unity; representative values include approximately

\[
0.8548,quad0.9351,quad1.2999,quad1.5128.
\]

Therefore the eighteen scattering checkpoints are not related merely by unitary similarity in the fixed port convention. In particular, one common four-scalar spectral law cannot recover all of them at one common \(\omega_0\).

## 4. Why a signed scalar family is necessary

The selected-background construction used

\[
f_{+,gamma}(z)=b_\gamma(z)^2,
\qquad
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma}.
\]

Two orbit backgrounds contain an exact checkpoint eigenvalue \(+1\). The function \(b_\gamma(\omega_0)^2\) reaches \(+1\) only at the degenerate endpoints \(\gamma=0\) or \(\gamma=\infty\). A finite strictly Schur interpolation therefore needs the equally admissible signed family

\[
\boxed{f_{\sigma,\gamma}(z)=\sigma b_\gamma(z)^2,
\qquad \sigma\in\{+1,-1\}.}
\]

The real sign preserves reciprocity, innerness and sideband reality.

For \(\sigma=+1\), the Cayley–Herglotz function is

\[
h_{+}(z)=\frac{z}{2\gamma}-\frac{\gamma}{2z},
\]

with a positive atom of weight \(\gamma/2\) at zero.

For \(\sigma=-1\), it is

\[
h_{-}(z)=\frac{2\gamma z}{\gamma^2-z^2}
=\frac{\gamma}{\gamma-z}+\frac{\gamma}{-\gamma-z},
\]

with positive atoms of weight \(\gamma\) at both \(+\gamma\) and \(-\gamma\). Thus the finite regularization does not sacrifice Herglotz positivity.

## 5. Finite fitted data still vary

For each typed eigenvalue, the certificate chooses the sign branch whose positive \(\gamma\) is closest to the reference scale \(1\). This removes the artificial infinities while making no physical prediction.

Across the orbit the fitted ranges are:

| typed channel | minimum \(\gamma\) | maximum \(\gamma\) | max/min |
|---|---:|---:|---:|
| \(u\) | \(0.536893\) | \(1.550371\) | \(2.88767\) |
| \(\nu\) | \(0.536893\) | \(1.550371\) | \(2.88767\) |
| \(d\) | \(0.498794\) | \(1.489395\) | \(2.98599\) |
| \(e\) | \(0.498794\) | \(1.489395\) | \(2.98599\) |

Four sign patterns occur:

\[
(-,-,+,+),\quad(-,+,-,+),\quad(+,-,+,-),\quad(+,+,-,-).
\]

Hence neither \(\gamma_f\) nor \(\sigma_f\) is background constant.

## 6. What is equivariant and what is not

The following structure **is** global:

- one spectral line in every handle-by-side bias cell;
- the two Furey-to-cell assignments related by side reversal;
- the abstract character parity
  \[
  D_\chi=\operatorname{diag}(+1,+1,-1,-1);
  \]
- a fiberwise passive rational-inner interpolation with positive matrix residues.

The following structure is **not** established:

- four background-independent scalar Blaschke factors;
- unitary-similarity transport of the scattering checkpoint;
- a fixed port-coordinate matrix representing \(D_\chi\) at every background;
- background-independent pole locations interpreted as physical masses.

The character parity is constant on the abstract globally labelled bundle. Its realization on port amplitudes must move with the background spectral frame. That moving frame cannot be replaced by a single Walsh transform of the raw ports.

## 7. Viable replacement branches

Three branches remain open.

### 7.1 Fiberwise signed factors

Allow

\[
f_{f,g}(z)=\sigma_f(g)b_{\gamma_f(g)}(z)^2.
\]

This always gives a finite analytic response for the audited orbit. It is interpolation background by background, not yet equivariance.

### 7.2 Fractional response transport

The carrier matrices are related by integral symplectic conjugation before scattering extraction. The induced action on scattering data may be Möbius or Redheffer rather than unitary similarity. A derived fractional law could transport both the spectral values and their pole parameters nontrivially.

### 7.3 Frequency or polarization transport

The present audit fixes the same frequency coordinate, complex polarization and port convention at all backgrounds. A physical selector action might also rescale frequency or transport polarization. Such a law must be derived explicitly; it cannot be invoked merely to erase the observed variation.

## 8. Branch and dependency graph

\[
\begin{array}{c}
\text{18 integral carrier backgrounds}\\
\downarrow\ \text{fixed scattering extraction}\\
\text{18 globally bias-labelled spectral fibers}\\
\swarrow\hspace{2cm}\searrow\\
\text{common scalar law}\quad\quad\text{fiberwise signed law}\\
\downarrow\ \text{fails}\hspace{2.4cm}\downarrow\ \text{exists}\\
\text{seek fractional transport}\quad\text{positive residues in every fiber}.
\end{array}
\]

## 9. Stop-everything and falsification criteria

- **Common-law falsifier:** one typed eigenvalue varying with the background is sufficient. All four vary.
- **Similarity falsifier:** unequal unordered eigenvalue multisets exclude unitary conjugacy. Sixteen backgrounds fail relative to background zero.
- **Fiberwise positivity falsifier:** any signed factor whose Cayley poles have negative weights would close the replacement branch; both sign branches have positive weights.
- **Fractional-transport success:** derive the scattering action of the selector generators and reproduce all eighteen typed eigenvalue quadruples from background zero without refitting each point.
- **Frequency-transport success:** one derived background action on \(z\) turns the varying \((\sigma,\gamma)\) data into a single covariant orbit.
- **Furey success:** the oriented TRO supplies the same moving spectral frame and character parity independently of the bias classification.
- **Stop-everything signal:** a microscopic Standard-Model response realizes the same eighteen-point fractional spectral orbit, including its sign-branch transitions.

## 10. Executable certificates

    node scripts/audit_the_handle_side_projector_bias_square_across_all_18_selector_backgrounds.mjs

    node scripts/test_common_four_character_spectral_law_across_the_18_background_selector_orbit.mjs

The first certificate exposes the eigenvalues together with the global bias cells. The second performs all 24 unordered spectral matchings, types every eigenvalue, chooses finite signed squared-Blaschke representations, measures their ranges and rejects a background-independent four-scalar law.

## Companion documents

- [Selected-background coupled response](826_the_arithmetic_checkpoint_rejects_two_independent_character_interferometers_but_has_an_exact_coupled_four_character_positive_residue_embedding.md)
- [Orbit-wide bias-square theorem](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
- [Flux reversal exchanges the two assignments](800_flux_reversal_exchanges_the_two_global_furey_to_projector_assignments_so_the_last_bit_is_an_orientation_torsor.md)
- [Flux reversal does not normalize the selector torsor](787_flux_reversal_does_not_normalize_the_finite_selector_torsor_and_its_adjunction_generates_an_infinite_hyperbolic_extension.md)
