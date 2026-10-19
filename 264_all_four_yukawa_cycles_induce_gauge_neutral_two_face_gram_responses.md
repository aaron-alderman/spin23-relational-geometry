# All Four Yukawa Cycles Induce Gauge-Neutral Two-Face Gram Responses

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B07, B08 and B11  
**Claim status:** exact one-generation gauge-representation and positive-Gram construction; physical spectral kernel and unique channel aggregation remain open

## 1. The response functor replaces same-carrier closure

No complete Furey Higgs cycle lies inside the neutrino Peirce corner. The correct question is instead whether each full cycle produces two composite faces with the same gauge representation.

For a Higgs vacuum \(v\), include the normalization \(\sqrt2/v\) when comparing engineering dimensions. Suppressing that common factor, define:

\[
\begin{array}{c|c|c}
\text{channel}&\chi_L&\chi_R\\ \hline
u&\widetilde H^\dagger Q&u^{c\dagger}\\
d&H^\dagger Q&d^{c\dagger}\\
e&H^\dagger L&e^{c\dagger}\\
\nu&\widetilde H^\dagger L&\nu^{c\dagger}.
\end{array}
\]

Each row is the broken-phase two-face form of one gauge-covariant Yukawa contraction.

## 2. Exact representation matching

Using six-times-hypercharge:

\[
Q:(\mathbf3,\mathbf2)_1,\quad
L:(\mathbf1,\mathbf2)_{-3},
\]

\[
H^\dagger:(\mathbf1,\mathbf2)_{-3},\quad
\widetilde H^\dagger:(\mathbf1,\mathbf2)_3,
\]

the dressed left faces transform as

\[
\widetilde H^\dagger Q:(\mathbf3,\mathbf1)_4,
\qquad
H^\dagger Q:(\mathbf3,\mathbf1)_{-2},
\]

\[
H^\dagger L:(\mathbf1,\mathbf1)_{-6},
\qquad
\widetilde H^\dagger L:(\mathbf1,\mathbf1)_0.
\]

These match exactly

\[
u^{c\dagger},\quad d^{c\dagger},\quad
e^{c\dagger},\quad\nu^{c\dagger}.
\]

For quarks the two faces are both color triplets; their color indices can be contracted in the response.

## 3. Four neutral Gram matrices

For each channel \(f\), form

\[
G_f=
\begin{pmatrix}
\langle\chi_{L,f}^\dagger\chi_{L,f}\rangle&
\langle\chi_{L,f}^\dagger\chi_{R,f}\rangle\\
\langle\chi_{R,f}^\dagger\chi_{L,f}\rangle&
\langle\chi_{R,f}^\dagger\chi_{R,f}\rangle
\end{pmatrix}.
\]

Because the two faces transform in the same representation, every entry is gauge invariant after the color contraction where required.

Gram positivity gives

\[
G_f\in H_2(\mathbb C)_+.
\]

Entrywise real projection gives

\[
\operatorname{Re}G_f\in H_2(\mathbb R)_+.
\]

Thus every Yukawa channel supplies a legal positive real two-face response—not just the charged lepton.

## 4. Relation to Furey incidence

The four composite pairs reuse exactly the two Higgs orientations selected by the cycle audit:

- \(u,\nu\) use \(\widetilde H^\dagger\), equivalent to the antisymmetric \(H\) orientation;
- \(d,e\) use \(H^\dagger\).

The response functor forgets the intermediate path through \(H,O_2,C,D,E\) only after it has formed a gauge-neutral composite. It does not claim that the individual arrows preserve the response carrier.

This resolves the apparent conflict:

\[
\text{matter cycles cross the corner}
\]

while

\[
\text{cycle-dressed observables close as neutral two-face responses}.
\]

## 5. Aggregating channels

Any positive weighted sum

\[
G_{\rm tot}=\sum_f w_f\,\operatorname{Re}G_f,
\qquad
w_f\ge0,
\]

remains in \(H_2(\mathbb R)_+\). Color multiplicity suggests weights \(3,3,1,1\) for a simple internal trace, but this does not derive the physical normalization.

Stress-energy, spectral residue or boundary-flux derivation must fix:

- channel weights;
- engineering scales;
- momentum dependence;
- contact terms;
- whether neutrino Majorana structure requires a Nambu enlargement.

Positivity alone leaves infinitely many allowed aggregates.

## 6. Flavor extension

For three generations, each face becomes flavor valued. The response has the form

\[
H_2(\mathbb R)_{\rm face}
\widehat\otimes
\operatorname{Herm}_3(\mathbb C)_{\rm flavor}.
\]

Reality acts only on the face factor. Complex CKM/PMNS data remain in flavor correlators, consistent with the earlier CP certificates.

## 7. What has been gained

The internal/external bridge no longer depends on treating a charged matter edge as a real relation or on demanding that full Higgs cycles preserve a Peirce subspace.

Instead:

\[
\boxed{
\text{full gauge-covariant Yukawa cycle}
\longrightarrow
\text{matched composite faces}
\longrightarrow
\text{positive neutral }H_2\text{ response}.}
\]

This is a genuine functorial target for a QFT two-point or boundary-response calculation.

## 8. Stop-everything and falsification gates

**Stress trigger:** the Standard-Model stress tensor or boundary flux fixes the same positive channel weights and produces one universal \(H_2(\mathbb R)\) kernel.

**Spectral trigger:** all four dressed two-point matrices share one causal spectral measure or a source-derived sewing operation.

**Furey trigger:** the cyclic trace action derives the composite response functor rather than merely allowing its endpoint representations.

**Falsifier:** one dressed pair fails representation matching, its physical spectral matrix violates positivity, or channel aggregation requires arbitrary sign-indefinite weights.

## 9. Certificate

The [four-channel dressed-response certificate](scripts/verify_four_channel_dressed_h2_response.mjs) checks weak, color and hypercharge matching for all four face pairs, constructs positive complex Gram examples, verifies positive real projection and confirms closure under a color-weighted positive channel sum.

## Companion documents

- [No Higgs cycle is Peirce internal](263_no_furey_higgs_cycle_is_internal_to_the_neutrino_peirce_corner.md)
- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Full one-generation Higgs portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Charged-channel Schur response](169_charged_channel_schur_elimination_to_neutrino_h2_response.md)
