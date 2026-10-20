# A Pure 351-Prime Bidoublet Requires Zero 27--351 Mixing, but the Minimal Realistic E6 Vacuum Uses That Mixing

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact reduced bidoublet-alignment theorem plus source-bounded minimal-vacuum obstruction; conditional escape requires an enlarged breaking sector

**Depends on:** [the E6 exotic-rank construction](1564_two_E6_singlet_vevs_isolate_one_chiral_16_but_the_exotic_mass_field_reintroduces_a_second_Dirac_portal.md), [the chiral E6 carrier audit](1560_the_chiral_E6_27_is_a_third_carrier_branch_but_its_cubic_does_not_close_reality_grading_or_the_portal_Ward_line.md), and [the portal parallel-source theorem](1557_the_minimal_Ward_completion_is_a_parallel_master_source_bundle_but_no_sourced_typed_intertwiner_realizes_it.md)

**Primary source:** [the complete renormalizable E6 Higgs and doublet-mass construction](https://arxiv.org/abs/1311.0775)

**Evidence:** [bidoublet-alignment ledger](../../../evidence/data/spin23-e6-bidoublet-inert-alignment-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_bidoublet_inert_alignment_audit.mjs)

## Result

Claim 1564 reduced the E6 branch to an inert-doublet question.  That question
has an exact two-channel answer.

Let \(H_{27}\) be the electroweak bidoublet direction in \(27_H\), and let
\(H_{\mathcal S}\) be a bidoublet direction in the symmetric two-matter-27
Yukawa representation \(\mathcal S_{351,H}\).  Write their Hermitian
mass-squared matrix as

\[
\mathcal M_H^2=
\begin{pmatrix}
A&B\\
B^*&C
\end{pmatrix}.
\]

The desired one-invariant portal requires the light state to be purely
\(H_{\mathcal S}\):

\[
H_{\rm light}=H_{\mathcal S}.
\]

This occurs if and only if

\[
B=0,
\]

and making that state massless before electroweak breaking additionally
requires \(C=0\) at the matching surface.  By contrast, the usual one-light-
doublet tuning

\[
\det\mathcal M_H^2=AC-|B|^2=0
\]

does not make the 27 component vanish.  For \(A\ne0\), its null eigenvector
is proportional to

\[
\begin{pmatrix}-B/A\\1\end{pmatrix},
\]

so every nonzero \(B\) reintroduces the independent \(Y_{27}\) Dirac
coefficient.

The renormalizable E6 scalar system contains exactly the dangerous parent
mixing invariants

\[
27_H,27_H\,\mathcal S_{351,H},
\qquad
\overline{27}_H\,\overline{27}_H\,overline{\mathcal S}_{351,H},
\]

up to the conjugation convention described in claim 1564.  After singlet
VEVs, they generate off-diagonal doublet masses.  The published minimal
renormalizable construction uses the mixed
\(27+\overline{27}+351'+\overline{351'}\) system for complete breaking; the
351-prime pair alone stops at Pati--Salam, while lower-dimensional simpler
systems fail to reach the Standard Model vacuum.

There is an abstract symmetry escape.  Give the matter 27 charge \(f\), and
the two Yukawa scalars charges \(h\) and \(s\).  Allowing both parent
Yukawas requires

\[
2f+h=0,
\qquad
2f+s=0,
\qquad\Longrightarrow\qquad h=s=-2f.
\]

The mixed scalar invariant has charge

\[
2h+s=-6f.
\]

A discrete symmetry with \(6f\ne0\) can therefore forbid it while retaining
both Yukawas; \(\mathbb Z_5\) with \((f,h,s)=(1,3,3)\) is an explicit
witness.  But in the minimal sourced Higgs sector this removes the very
mixed invariant used to connect the 27 and 351-prime vacuum systems.  The
result is a protected inert alignment at the cost of reopening the complete
breaking problem.

Hence

\[
\boxed{
\begin{array}{rcl}
\text{pure symmetric-parent light bidoublet}&\Longleftrightarrow&B=0,\\
\text{generic determinant tuning implies inertness}&=&\mathrm{NO},\\
\text{commuting discrete symmetry can enforce }B=0&=&\mathrm{YES},\\
\text{minimal sourced realistic E6 vacuum retains that protection}&=&
\mathrm{NOT\ ESTABLISHED}.
\end{array}}
\]

## 1. Exact alignment theorem

The vector \(e_{\mathcal S}=(0,1)^T\) is an eigenvector precisely when

\[
\mathcal M_H^2e_{\mathcal S}=(B,C)^T
\]

is proportional to \(e_{\mathcal S}\).  This is equivalent to \(B=0\).
Its eigenvalue is then \(C\).  Thus a pure massless state needs both
\(B=0\) and \(C=0\).

If only \(AC=|B|^2\) is imposed, direct multiplication gives

\[
\mathcal M_H^2(-B/A,1)^T=0
\]

after the harmless phase convention implicit in the displayed real witness;
the general Hermitian expression replaces \(-B/A\) by \(-B/A\) in the first
row convention with its conjugate appearing in the second.  Its 27 fraction
is nonzero whenever \(B\ne0\).

The effective Dirac coupling is consequently

\[
Y_D^{\rm eff}=\alpha Y_{27}+\beta Y_{\mathcal S},
\]

where \((\alpha,\beta)\) is the normalized light eigenvector.  The desired
one-parent-invariant reduction is exact only when \(\alpha=0\).

## 2. Why the mixing is expected in the sourced model

The relevant scalar representations are not isolated modules in the known
renormalizable construction.  Its superpotential contains the symmetric
mixed invariants conventionally written as

\[
27^2\overline{351'}
\quad\text{and}\quad
\overline{27}^{,2}351'.
\]

Their singlet insertions contribute to the doublet and triplet mass matrices.
The source construction in fact requires an additional
\(27+\overline{27}\) pair to obtain successful doublet--triplet splitting.
This makes pure two-channel alignment less, not more, automatic in the full
model.

The result is deliberately bounded.  It does not prove that every E6 vacuum
has \(B\ne0\).  It proves that the known minimal realistic renormalizable
system does not obtain \(B=0\) merely from representation content or the
usual determinant tuning.

## 3. Discrete protection and its price

The charge equations show that allowing both matter Yukawa invariants does
not force the scalar mixing invariant to be allowed.  For the explicit
\(\mathbb Z_5\) witness,

\[
2f+h=2+3=0,
\qquad
2f+s=2+3=0,
\]

but

\[
2h+s=3+3+3=4\ne0\pmod5.
\]

The same symmetry can be assigned oppositely to conjugate Higgs multiplets
so their quadratic mass terms remain allowed.  Therefore an inert alignment
is algebraically possible without deleting either parent Yukawa.

Both singlet VEVs carry the nonzero discrete charge and spontaneously break
this \(\mathbb Z_5\).  The renormalizable forbidden coupling remains absent
as a Lagrangian parameter, but higher-dimensional operators can regenerate
mixing after the breaking.  More importantly, decoupling the mixed scalar
sectors removes part of the known vacuum mechanism.  An enlarged breaking
sector or a new vacuum theorem is then required.

## 4. Portal and Ward consequence

There are now two branches.

### Generic sourced vacuum

If \(B\ne0\), the light doublet contains both parent components.  The Dirac
source depends on \(Y_{27}\) and \(Y_{\mathcal S}\), while the Majorana
source uses \(Y_{\mathcal S}\).  The source space is at least two-dimensional
before RG evolution.  The common portal line is not present.

### Protected inert vacuum

If a new symmetry enforces \(B=0\), the unwanted Dirac source can be removed
from the light state.  One still must:

1. construct a complete E6-to-Standard-Model vacuum without the forbidden
   mixed invariant;
2. keep higher-dimensional symmetry-breaking corrections from regenerating
   \(B\);
3. select the family/null-mask entry of \(Y_{\mathcal S}\); and
4. prove that the distinct Dirac and Majorana VEV/normalization factors form
   the parallel source bundle of claim 1557.

Thus inertness is necessary for the one-invariant E6 route but remains far
from sufficient for the Ward law.

## 5. Highest-value next test

The next useful calculation is no longer a generic full potential scan.  It
is a bounded symmetry-and-vacuum fork:

1. impose the explicit \(\mathbb Z_5\) charge assignment on the minimal
   scalar system;
2. enumerate all remaining renormalizable invariants;
3. determine the largest unbroken gauge subgroup of their simultaneous
   singlet vacuum; and
4. find the smallest additional scalar representation that completes
   breaking without restoring \(27\)--351-prime doublet mixing.

If no small extension passes, the protected one-invariant E6 route closes.
If one passes, its light-doublet eigenvector and threshold source line become
the next exact audit.

## Spin(2,3) status

Spin(2,3) could in principle supply the extra grading that distinguishes the
two parent scalar channels after E6 breaking.  No present Spin(2,3) action
has been shown to implement the required \(\mathbb Z_5\), forbid the mixed
E6 invariant or complete the stalled vacuum.  The alignment theorem states
exactly what such a mechanism must accomplish: enforce \(B=0\) without
destroying the singlet mass VEVs or the full gauge descent.

## Verdict

The inert-doublet idea is mathematically viable but not free.  A pure
symmetric-parent light bidoublet requires an exact zero in the parent
doublet mixing matrix.  Ordinary light-Higgs fine tuning does not provide
that zero.  A simple discrete symmetry can, but it simultaneously removes
mixed interactions used by the known minimal realistic E6 vacuum.

The E6 route therefore remains open only through a more constrained model:
a symmetry-protected inert 27 bidoublet plus an alternative complete
breaking sector.  This is a finite construction problem with a clear stop
condition, not an automatic consequence of the 27 or 351-prime.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_bidoublet_inert_alignment_audit.mjs
~~~
