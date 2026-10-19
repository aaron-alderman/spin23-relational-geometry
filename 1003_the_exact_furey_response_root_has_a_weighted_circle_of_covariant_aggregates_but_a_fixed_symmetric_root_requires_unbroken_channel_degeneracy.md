# The Exact Furey Response Root Has a Weighted Circle of Covariant Aggregates, but a Fixed Symmetric Root Requires Unbroken Channel Degeneracy

**Date:** 18 October 2026  
**Branches:** weighted Furey aggregation, electroweak breaking, channel renormalization, reducing subspaces, moving response bundle, and root holonomy  
**Claim status:** exact intertwiner-family and stability classification; physical running remains open  
**Certificate:** [classify_weighted_furey_aggregates_and_the_broken_phase_reducing_obstruction.mjs](scripts/classify_weighted_furey_aggregates_and_the_broken_phase_reducing_obstruction.mjs)

## Executive result

Document 1002 proved uniqueness of the normalized aggregate map only after imposing symmetry within the lepton and quark sectors. Removing that assumption reveals an exact one-parameter family rather than an arbitrary matrix.

For real \(a,b\) with \(a^2+b^2=1\), define

\[
A(a,b)=
\begin{pmatrix}
0&a&0&b\\
b&0&a&0
\end{pmatrix}.
\]

Then

\[
A(a,b)A(a,b)^T=I_2
\]

and, for every point on the circle,

\[
\boxed{
A(a,b)p=(-D)A(a,b),
\qquad
A(a,b)F_C=XA(a,b).
}

Hence

\[
A(a,b)(F_CpK)=(\varepsilon K)A(a,b)
\]

throughout the family. The symmetric aggregate of document 1002 is the point

\[
a=b=\frac1{\sqrt2}.
\]

The coherent root architecture is therefore stable under a specific weighted deformation, but the unbroken algebra does not select the symmetric point by itself.

## 1. Meaning of the weighted family

The aggregate coordinates are

\[
L_{a,b}=a\nu+be,
\qquad
Q_{a,b}=bu+ad.
\]

The crossed coefficients are forced by \(F_C\): since \(F_C\) sends \(\nu\leftrightarrow d\) and \(e\leftrightarrow u\), it carries \(L_{a,b}\) exactly to \(Q_{a,b}\).

The product grading remains constant within lepton and quark sectors, so it descends to \(-D\) independently of \((a,b)\).

Thus the algebra fixes the relative pairing pattern but leaves one projective weight angle. Within-sector swap symmetry selects the Walsh point \(a=b\); without it, the root is a circle bundle of admissible aggregate frames.

## 2. Fixed-root stability under diagonal running

Let channel-dependent renormalization or propagation act diagonally as

\[
R=\operatorname{diag}(r_u,r_\nu,r_d,r_e).
\]

For the fixed symmetric aggregate projection \(P_0=A_0^TA_0\), exact reduction requires

\[
[R,P_0]=0.
\]

The classification gives

\[
\boxed{r_u=r_d,
\qquad
r_\nu=r_e.}
\]

That is, up/down quark responses must run equally and neutrino/electron responses must run equally. Generic broken-phase Yukawa and threshold data do not satisfy this degeneracy.

Separately, preserving the channel translation requires

\[
[R,F_C]=0,
\]

which gives the crossed conditions

\[
\boxed{r_u=r_e,
\qquad
r_\nu=r_d.}
\]

Requiring both a fixed symmetric root and exact \(F_C\) covariance forces

\[
\boxed{r_u=r_\nu=r_d=r_e.}
\]

Therefore the fixed Walsh root is naturally an unbroken-scale or exactly matched-boundary object, not a generic fixed subspace of realistic infrared running.

## 3. Moving-root repair

A cross-related reweighting

\[
(r_u,r_\nu,r_d,r_e)=(b,a,a,b)
\]

maps the symmetric aggregate into the weighted frame \(A(a,b)\), after normalization. Instead of demanding one fixed subspace at every scale, one may use a moving aggregate bundle

\[
\mu\longmapsto A(a(\mu),b(\mu)).
\]

The root and Jordan response then acquire a connection from the changing frame. This is a mathematically live repair, but it is physical only if the renormalization or Higgs spurions obey the crossed relation that preserves \(F_C\) covariance.

An arbitrary four-channel reweighting cannot be absorbed into the one-angle family.

## 4. Consequences for the programme

The result separates three regimes:

1. **unbroken symmetric point:** \(a=b\), with the canonical normalized aggregate and exact reducing root;
2. **spurion-covariant moving root:** \(a\ne b\), but crossed lepton/quark weights retain the same intertwining algebra;
3. **generic broken phase:** independent channel running mixes aggregate and antisymmetric sectors and destroys the exact two-component root truncation.

This makes the Higgs-vacuum qualification concrete. The algebraic root is exact before symmetry-breaking data are frozen or when those data transform as spurions. It is not automatically an exact infrared particle-space decomposition.

## 5. Stop-everything and falsification tests

**Running trigger:** compute the four response anomalous dimensions and find the crossed relations required for a moving \(A(a,b)\) bundle.

**Connection trigger:** derive the frame connection \(A\,dA^T\) and show its holonomy equals an independently established sideband/Pfaffian phase.

**Fixed-root falsifier:** unequal \((u,d)\) or \((\nu,e)\) running is present while the symmetric aggregate is treated as an exact scale-independent reducing sector.

**Moving-root falsifier:** arbitrary four-channel weights are projected onto one angle while residual leakage into antisymmetric modes is ignored.

**Symmetry overclaim:** within-sector exchange is called an exact broken-phase Standard-Model symmetry without transforming the Higgs/Yukawa spurions.

## Verdict

| Question | Verdict |
|---|---|
| Is the symmetric aggregate the only algebraic intertwiner? | **No** |
| What is the real normalized covariant family? | **A circle (A(a,b))** |
| Does every member retain (p,F_C,Gamma) intertwining? | **Yes** |
| When is the fixed symmetric root reducing under diagonal running? | **When (r_u=r_d) and (r_\nu=r_e)** |
| When is (F_C) also preserved? | **Only with the crossed equalities; jointly all rates coincide** |
| Can a moving root repair some asymmetry? | **Yes, conditionally** |

## Position in the corpus

- [exact four-channel/root intertwiner](1002_the_four_furey_response_channels_have_an_exact_reducing_intertwiner_to_the_neutral_peirce_lepton_color_root.md)
- [neutral-Peirce response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [Higgs-vacuum boundary of weak reflection](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [Furey–Higgs grading and aggregation](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
