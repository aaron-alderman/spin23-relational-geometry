# The Marked Lepton Generator Derives the Seesaw Flag, but Charge-Three Breaking Needs a Sector-Dependent Mask

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact bidirectional joining theorem; the incidence-level middle exists, but its complete physical spectral-triple embedding remains open

**Depends on:** [the marked-generator type audit](1488_the_marked_ckm_witness_is_capacity_not_a_derived_quark_gauge_orbit.md), [the rank-one seesaw theorem](../1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md), [the charge-sector audit](../1000-1099/1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md), and [the sector-dependent null mask](../1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md)

**Evidence:** [machine-readable joining ledger](../../../evidence/data/spin23-marked-lepton-seesaw-join.json) and [executable verifier](../../../verification/verify/verify_spin23_marked_lepton_seesaw_join.mjs)

## Result

The marked generator rejected as a derived quark CKM orbit in claim 1488 is
correctly typed for the lepton branch, and there it performs an exact job.
For

\[
X_\alpha=I-3P_\alpha,
\]

every family matrix (Y) satisfies

\[
[Y,X_\alpha]=-3[Y,P_\alpha].
\]

Consequently the neutral Dirac-Yukawa selection rule under the marked
family action is precisely the block-preserving hypothesis used by the
rank-one seesaw theorem:

\[
\boxed{
[Y_\nu,X_\alpha]=0
\iff
[Y_\nu,P_\alpha]=0.
}
\]

This joins two previously separated levels:

- **top down:** the anomaly-free (B-3L_\alpha) lift and its
  (1\oplus2) marked family representation;
- **bottom up:** the condition that transports the rank-one complementary
  Majorana block into ((m_\nu)_{\alpha\alpha}=0).

The join is real, but it is not the end of the middle. The charge-three
breaking needed to sew the selected heavy state to the complementary null
line also permits the dangerous Dirac cross-block. Charge alone cannot allow
the Majorana edge while forbidding the Dirac edge. The smallest presently
known bridge is therefore the already constructed **sector-dependent
opposite-algebra anchor mask**, not the (U(1)) generator by itself.

## 1. The exact flag identity

Let (P=P_\alpha) be a rank-one projector and (Q=I-P). Since

\[
X=I-3P,
\]

one has, without approximation,

\[
[Y,X]=[Y,I-3P]=-3[Y,P].
\]

Thus an invariant Dirac matrix has the form

\[
Y_\nu=PY_\nu P+QY_\nu Q,
\]

with

\[
PY_\nu Q=QY_\nu P=0.
\]

In the selected-family basis the charge of a Dirac entry is exactly the
difference of the marked eigenvalues. For (X=(-2,1,1)) this gives

\[
\mathcal Q_D=
\begin{pmatrix}
0&-3&-3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

The zero-charge entries are exactly the (P/P) and (Q/Q) blocks. Therefore
the commutator identity is also the operator form of the earlier charge
table, not a new fitted alignment rule.

## 2. Descent to the light-neutrino zero

Assume the minimal Jordan quartic gate makes

\[
\operatorname{rank}(QM_RQ)=1
\]

and the charged Majorana cross-face restores full heavy rank. The cofactor
identity then gives

\[
P M_R^{-1}P=0.
\]

If the marked symmetry keeps (Y_\nu) neutral, the exact flag identity gives
([Y_\nu,P]=0). With (m_D=vY_\nu) and type-I seesaw,

\[
m_\nu=-m_DM_R^{-1}m_D^T,
\]

so

\[
\boxed{Pm_\nu P=0.}
\]

When (P=P_e), the existing phenomenology chain then selects normal ordering
and the narrow electron-normal mass/phase sheets recorded in claims 1112 and
1113. The present theorem does not choose (e) over (\mu) or (\tau); it shows
that once a marked branch is chosen, its Dirac alignment is the Ward identity
of the same marked action.

## 3. Why the simple symmetry argument is not enough

In a Takagi-adapted basis for the rank-one complementary block,

\[
M_R=
\begin{pmatrix}
a&x&y\\
x&d&0\\
y&0&0
\end{pmatrix},
\qquad
\det M_R=-dy^2.
\]

Full heavy rank requires (y\ne0). But (y) is a selected-to-complementary
edge of marked charge three. It therefore requires the same charge-three
symmetry breaking that can generate a selected-to-complementary Dirac entry.
The charge ledger alone sees

\[
q(P\to N)=3
\]

in both sectors.

If the selected Dirac row acquires null-line leakage

\[
v^T=(d_P,0,r_N),
\]

then

\[
(m_\nu)_{PP}
=-\frac{2d_Pr_N}{y}
-r_N^2\frac{x^2-ad}{dy^2}.
\]

The first term is linear in the dangerous Dirac edge. Moreover, if both
(r_N) and (y) arise at the same first order in a charge-three VEV, their
ratio need not be small. Merely saying that the family (U(1)) is
approximately broken does not protect the low-energy zero.

## 4. The plausible middle and its fan

The minimal typed middle must distinguish **relationship sectors**, not
only family charges. The finite-label witness from claim 1120 does exactly
this by assigning different opposite-algebra anchors:

\[
D_P=(P,P),\quad D_N=(N,N),
\]

so the Dirac (P\leftrightarrow N) edge is diagonal and first-order forbidden,
while

\[
M_P=(P,I),\quad M_N=(N,I)
\]

share an opposite character and make the Majorana
(P\leftrightarrow N) edge horizontal and allowed.

This gives the requested fan in both directions:

\[
\begin{array}{c}
Spin(2,3)\text{ Jordan copy exchange}\\
\Downarrow\\
\operatorname{rank}(QM_RQ)=1
\end{array}
\quad
\longleftrightarrow
\quad
\boxed{\text{sector-dependent }A_2\text{ incidence mask}}
\quad
\longleftrightarrow
\quad
\begin{array}{c}
B-3L_\alpha\text{ marked flag}\\
\Downarrow\\
[Y_\nu,P_\alpha]=0\\
\Downarrow\\
(m_\nu)_{\alpha\alpha}=0.
\end{array}
\]

The convergence is structural: the top-down copy geometry and bottom-up
neutrino texture require the same (1+2) flag, while the symmetry-breaking
collision independently demands the relational sector label found by the
Krajewski search.

## 5. Boundaries and next gate

**Selection boundary:** the construction still gives three marked choices;
it does not derive which charged-lepton eigenprojector is selected.

**Breaking boundary:** (X)-charge conservation derives exact block
alignment only before charge-three breaking. After breaking, the result is
protected only if the Dirac null edge is absent from the represented
one-form module or suppressed by an independently derived hierarchy.

**Charge-only stop:** the Majorana and Dirac null edges have the same marked
charge. No ordinary (U(1)_X) Ward identity can distinguish them.

**Incidence boundary:** the sector-dependent mask is currently an exact
finite-label witness, not a complete KO-6 Pati--Salam spectral triple.

**Positive trigger:** embed the mask in the physical finite Hilbert space,
retain it after the junk quotient, and prove that charge-three breaking
generates (y\ne0) but no Dirac null-line counterterm.

## Verdict

The marked middle genuinely converges, but at one level deeper than a group
name:

\[
\boxed{
X_\alpha\text{ derives the seesaw flag, while sector-dependent incidence is
needed to preserve it through the breaking that makes }M_R\text{ invertible}.
}
\]

This is stronger than the earlier statement that the lepton branch is a
natural place to look. It identifies the exact operator identity that joins
the branches, the exact symmetry-breaking obstruction, and the smallest
known relational repair. Physical admission remains false until that repair
is embedded and made radiatively stable.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_marked_lepton_seesaw_join.mjs
~~~
