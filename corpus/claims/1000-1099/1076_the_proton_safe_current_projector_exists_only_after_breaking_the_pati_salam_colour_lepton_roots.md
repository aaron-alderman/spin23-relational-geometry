# The Proton-Safe Current Projector Exists Only After Breaking the Pati–Salam Colour–Lepton Roots

**Date:** 18 October 2026  
**Branches:** \(Spin(10)\) vector mediator, Pati–Salam breaking, proton safety, \(F_Cp\) source selection  
**Claim status:** exact representation-theoretic stabilizer theorem and current-incidence construction; ultraviolet symmetry and radiative protection remain open  
**Certificate:** [classify_the_leptoquark_current_projector_and_its_spin10_breaking_stabilizer.mjs](../../../verification/classify/classify_the_leptoquark_current_projector_and_its_spin10_breaking_stabilizer.mjs)

## Executive result

There is an exact projector that keeps precisely the three leptoquark currents

\[
QL,\qquad u^ce^c,\qquad d^c\nu^c
\]

and removes the two diquark currents

\[
QQ,\qquad u^cd^c.
\]

In the ordered five-current basis

\[
(QQ,u^ce^c,d^c\nu^c,QL,u^cd^c)
\]

it is simply

\[
P_{\mathrm{safe}}=\operatorname{diag}(0,1,1,1,0).
\]

Applied before triplet exchange, it reduces the six-channel unified network of document 1075 to exactly the two desired \(F_Cp\) arms and preserves their exact Clebsch orientation

\[
u^ce^c-d^c\nu^c.
\]

But this positive construction comes with a sharp cost:

\[
\boxed{
P_{\mathrm{safe}}\text{ is Standard-Model and left--right gauge covariant,}
\quad
P_{\mathrm{safe}}\text{ is not }SU(4)\text{ or }Spin(10)\text{ covariant}.}
\]

Its connected colour–lepton stabilizer is exactly

\[
S(U(3)\times U(1))\subset SU(4),
\]

and the six broken generators are precisely the colour–lepton roots. Therefore an unspurioned single \(16_F16_F10_H\) tensor cannot realize the proton-safe restriction. The restriction is a broken-phase **vertex/source projector**, not a mass projector on one unified mediator.

## 1. The Pati–Salam six is the decisive carrier

Write the colour–lepton fundamental as

\[
\mathbb C^4=\mathbb C^3_c\oplus\mathbb C_\ell.
\]

The colored part of the \(Spin(10)\) vector is the Pati–Salam representation

\[
(\mathbf6,\mathbf1,\mathbf1),
\qquad
\mathbf6\cong\Lambda^2\mathbf4.
\]

Choose basis

\[
e_1\wedge e_2,
e_1\wedge e_3,
e_2\wedge e_3;
e_1\wedge e_4,
e_2\wedge e_4,
e_3\wedge e_4.
\]

The first three basis vectors contain two colour indices and carry the diquark incidence. The last three contain one colour and one lepton index and carry the leptoquark incidence. Thus

\[
\Lambda^2\mathbf4
=
\Lambda^2\mathbb C^3_c
\oplus
(\mathbb C^3_c\wedge\mathbb C_\ell).
\]

Under the subgroup \(SU(3)_c\times U(1)_{B-L}\),

\[
\mathbf6
\longrightarrow
\bar{\mathbf3}_{+2/3}\oplus\mathbf3_{-2/3},
\]

up to the conjugate-orientation convention. The leptoquark projector is the spectral projector onto the second summand.

If \(Q_{B-L}^{(\Lambda^2)}\) is the induced \(B-L\) generator, its eigenvalues are \(+2/3\) on colour–colour bivectors and \(-2/3\) on colour–lepton bivectors. Hence

\[
P_{\mathrm{lq}}
=
\frac12\left(I-\frac32Q_{B-L}^{(\Lambda^2)}\right).
\]

This does **not** mean that \(B-L\) forbids proton decay. It means that after \(SU(4)\) has already been broken, its generator labels the two irreducible summands and can write their projectors. Document 1075 proved that every complete exchange product still has total \(B-L=0\).

## 2. Exact stabilizer calculation

For \(X\in\mathfrak{sl}_4\), the induced exterior-square action is

\[
X^{(2)}(v\wedge w)=Xv\wedge w+v\wedge Xw.
\]

The certificate evaluates

\[
[P_{\mathrm{lq}},X^{(2)}]
\]

on a complete fifteen-generator basis of \(\mathfrak{sl}_4\).

The result is exact:

| Generator sector | Count | Commutes with \(P_{\mathrm{lq}}\)? |
|---|---:|---|
| colour \(\mathfrak{sl}_3\) roots | 6 | yes |
| block-diagonal Cartan | 3 | yes |
| colour-to-lepton roots | 3 | no |
| lepton-to-colour roots | 3 | no |

Therefore the commuting Lie algebra has dimension nine and is

\[
\mathfrak s(\mathfrak u(3)\oplus\mathfrak u(1)).
\]

The six noncommuting directions form the tangent space of

\[
SU(4)/S(U(3)\times U(1)).
\]

These are exactly the transformations that rotate a distinguished lepton direction into the three colour directions. The safe projector is therefore not an arbitrary breaking: it is precisely the choice of the \(3+1\) colour–lepton split.

## 3. What survives

The projector acts on the \(SU(4)\) index only. It can therefore preserve

\[
SU(3)_c\times U(1)_{B-L}
\times SU(2)_L\times SU(2)_R.
\]

In particular it keeps the complete right-isospin singlet

\[
u^ce^c-d^c\nu^c,
\]

rather than choosing its terms independently. The exact relative minus derived in document 1073 survives.

At the five-current level,

\[
P_{\mathrm{safe}}
\{QQ,u^ce^c,d^c\nu^c,QL,u^cd^c\}
=
\{u^ce^c,d^c\nu^c,QL\}.
\]

The surviving triplet exchange is therefore

\[
\{u^ce^c,d^c\nu^c\}\times\{QL\},
\]

which contains exactly

\[
(QL)(u^ce^c),
\qquad
(QL)(d^c\nu^c).
\]

All three proton-decay products and the additional four-quark product disappear at tree level because each contains at least one deleted diquark vertex.

## 4. Why mediator mass splitting cannot do this

The desired two arms use both conjugate colored orientations:

- the right-handed-conjugate leptoquark current couples to one triplet orientation;
- \(QL\) couples to the conjugate orientation.

A physical real \(\mathbf6\) contains both. A reality-compatible mediator projector that retains both conjugate triplets is therefore the identity on the whole colored six. It cannot know whether a given source arose from a colour–colour or a colour–lepton fermion pair when both have the same low-energy scalar quantum numbers.

Thus ordinary component mass splitting is insufficient:

\[
\boxed{
\text{the required operation acts on vertex incidence, not only on mediator components}.}
\]

The remaining mechanisms are:

1. an explicit source/vertex spurion after Pati–Salam breaking;
2. an additional symmetry that forbids diquark but allows leptoquark vertices;
3. interference among multiple mediator copies;
4. a boundary response whose allowed source map is smaller than the bulk unified tensor.

## 5. The smallest obvious protecting charge is not \(B-L\)

Assign the leptoquark scalar

\[
B(T)=+\frac13,
\qquad
B(\bar T)=-\frac13.
\]

Then the total baryon charges of the five candidate vertices are

| Vertex | Total \(B\) |
|---|---:|
| \(TQQ\) | \(+1\) |
| \(Tu^ce^c\) | \(0\) |
| \(Td^c\nu^c\) | \(0\) |
| \(\bar TQL\) | \(0\) |
| \(\bar Tu^cd^c\) | \(-1\) |

Separate baryon number, or an appropriate discrete remnant such as the classical vertex parity \((-1)^{3B}\), therefore forbids the two diquark vertices while retaining all three desired source vertices. Separate lepton number gives the same separation with the corresponding scalar assignment.

This is only a candidate protection principle. Ordinary baryon and lepton number have Standard-Model anomaly issues, and a discrete remnant must pass mixed gauge and gravitational anomaly tests in the completed field content. No exact ultraviolet symmetry is claimed here.

More generally, for a charge \(X=\alpha B+\beta L\), the safe and dangerous vertex charges differ by \(\alpha+\beta\). The embedded direction \(B-L\) has \(\alpha+\beta=0\) and is exactly the exceptional direction that fails to distinguish them.

## 6. Three covariance levels that must not be conflated

| Requirement | Safe projector? | Reason |
|---|---|---|
| Standard-Model gauge covariance | yes | the retained and deleted source sectors are separate SM-invariant coupling classes |
| left–right subgroup covariance | yes | the full \(SU(2)_R\) singlet combination is retained |
| Pati–Salam \(SU(4)\) covariance | no | six colour–lepton roots mix the two bivector sectors |
| full \(Spin(10)\) covariance | no | the unique irreducible \(16\,16\,10\) map ties all components |

The phrase “a gauge-covariant projector exists” is therefore true only after specifying the gauge group. At Standard-Model or broken left–right level it exists. At unified level it does not.

## 7. Radiative closure

The residual gauge group alone does not protect the zeros. Once \(SU(4)\) is broken, both leptoquark and diquark vertices are separately allowed by the residual gauge quantum numbers. Setting the latter to zero without an extra selection rule is a boundary condition, not a theorem.

The correct radiative question is therefore:

\[
\text{does an exact anomaly-consistent symmetry make }
P_{\mathrm{safe}}
\text{ a superselection projector?}
\]

If not, threshold corrections from the Pati–Salam-breaking sector can regenerate the deleted vertices. The coefficient size requires a specified heavy spectrum and action.

## 8. Stop-everything statements

**Unified-map stop:** if the low-energy interaction must be the restriction of one unspurioned \(Spin(10)\)-equivariant map

\[
\operatorname{Sym}^2\mathbf{16}\longrightarrow\mathbf{10},
\]

then the desired-only proton-safe projector is impossible.

**Mediator-only stop:** if the only allowed breaking is a reality-compatible mass projector on a single colored \(\mathbf6\), retaining both desired arms retains the complete triplet pair and does not delete their dangerous source couplings.

**Positive reopening trigger:** exhibit an anomaly-consistent broken-phase symmetry, finite-one-form selection rule, or multi-mediator Schur complement that enforces

\[
P_{\mathrm{safe}}=\operatorname{diag}(0,1,1,1,0)
\]

and preserves the \(u^ce^c-d^c\nu^c\) Clebsch combination.

**Furey trigger:** derive the same source projector from the represented finite one-form space rather than imposing it on the already-listed coupling slots.

## 9. Verdict

The first proton-safety question now has a precise answer:

\[
\boxed{
\text{the projector exists, but it is exactly a colour--lepton unification-breaking datum}.}
\]

This is not a dead end. It identifies the next layer of the synthesis. The \(Spin(10)\) parent explains the equal-and-opposite arm orientation; the broken-phase source geometry must explain why only the colour–lepton incidence survives. The two jobs belong to different rungs of the construction.

## Position in the corpus

- [unified Clebsch-sign theorem](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [twisted-copy Gram repair](1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md)
- [complete six-channel triplet census](1075_the_unified_vector_triplet_gives_two_FCp_arms_one_safe_extra_and_three_proton_decay_channels_all_with_BminusL_zero.md)
- [formal one-form multiplicity underdetermination theorem](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [minimal anomaly-free continuous \(U(1)\) protection no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
- [conditional Pati–Salam normalization lock](../0800-0899/852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)
