# The Generation-Blind Pati–Salam First-Order Calculus Cannot Protect the Majorana Null Line from Dirac Leakage

**Date:** 18 October 2026  
**Branches:** B-DIRAC-MISALIGNMENT-NULL-LINE-LIFTING, B-PATI-SALAM-MAJORANA-DIAGONAL-DELTA-SQUARE and B-GENERATION-COMMUTANT-NO-GO  
**Claim status:** exact factorization/no-selection theorem for generation-blind finite representations; family-extended and dynamical restrictions remain open  
**Certificate:** [prove_generation_blind_first_order_cannot_select_Majorana_null_line_Dirac_leakage.mjs](scripts/prove_generation_blind_first_order_cannot_select_Majorana_null_line_Dirac_leakage.mjs)

## Executive result

Document [1114](1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md) sharpened the alignment problem: the dangerous Dirac deformation is specifically the component reaching

\[
\ker(QM_RQ).
\]

The published generation-blind Pati–Salam calculus cannot remove that component while retaining an otherwise identical Dirac edge. Its algebra acts as

\[
\pi(a)=\pi_{\rm int}(a)\otimes I_F,
\]

so the first-order condition factorizes:

\[
\boxed{
[[T\otimes K,\pi(a)],\pi^\circ(b)]
=
[[T,\pi_{\rm int}(a)],\pi_{\rm int}^\circ(b)]
\otimes K.
}
\]

If the internal edge (T) is allowed, **every** family matrix (K) on that edge is allowed. Reality adds its conjugate partner; grading fixes the internal parity. Neither distinguishes leakage toward the image line from leakage toward the null line of a separately inserted Majorana matrix.

Therefore the exact or first-order-protected electron texture cannot be derived from the unchanged published generation-blind axioms. It requires a genuine family algebra/normalizer, a family-sensitive incidence rule, or a unique shared spurion correlating the Dirac and Majorana tensors.

## 1. Generation-blind factorization

Let

\[
\mathcal H=\mathcal H_{\rm int}\otimes F,
\qquad F\cong\mathbb C^3,
\]

with

\[
\pi(a)=\pi_{\rm int}(a)\otimes I_F.
\]

A finite Dirac block on one internal arrow has the form

\[
D_{T,K}=T\otimes K,
\qquad K\in\operatorname{End}(F).
\]

Then

\[
[D_{T,K},\pi(a)]
=[T,\pi_{\rm int}(a)]\otimes K,
\]

and hence

\[
[[D_{T,K},\pi(a)],\pi^\circ(b)]
=
[[T,\pi_{\rm int}(a)],\pi_{\rm int}^\circ(b)]\otimes K.
\]

For a horizontal or vertical Krajewski edge the internal factor vanishes. Once it vanishes, the family factor is unrestricted:

\[
\boxed{
T\text{ first-order admissible}
\Longrightarrow
T\otimes K\text{ admissible for every }K.
}
\]

This is the same multiplicity freedom previously identified by the generation-commutant no-go, now applied to the specific null-line protection problem.

## 2. Why grading and reality do not repair it

Suppose the internal grading makes (T) odd:

\[
\gamma_{\rm int}T=-T\gamma_{\rm int}.
\]

With generation-blind grading

\[
\gamma=\gamma_{\rm int}\otimes I_F,
\]

one has

\[
\gamma(T\otimes K)=-(T\otimes K)\gamma
\]

for every (K). Grading sees the arrow, not its family support.

Reality supplies a partner block whose family coefficient is conjugated or transposed according to convention:

\[
K\longmapsto\bar K,quad K^T,quad\text{or }K^*.
\]

This relates two blocks but does not force a selected matrix element of (K) to vanish. A null-line leakage and its reality partner are just as admissible as an image-line leakage and its partner.

## 3. Fixed Majorana data do not change the axiom

Now fix a rank-one complementary Majorana block in its Takagi basis:

\[
QM_RQ=
\begin{pmatrix}d&0\\0&0\end{pmatrix}.
\]

This defines

\[
L_{\rm im}=\operatorname{span}\{(1,0)\},
\qquad
L_{\rm ker}=\operatorname{span}\{(0,1)\}.
\]

Two selected-row Dirac perturbations are

\[
K_{\rm im}=|P\rangle\langle L_{\rm im}|,
\qquad
K_{\rm ker}=|P\rangle\langle L_{\rm ker}|.
\]

They have radically different low-energy consequences:

\[
K_{\rm im}:quad\delta(m_\nu)_{PP}=O(\varepsilon^2),
\]

\[
K_{\rm ker}:quad\delta(m_\nu)_{PP}=O(\varepsilon).
\]

Yet the generation-blind first-order, grading and reality tests give them identical admissibility because both multiply the same internal arrow (T).

## 4. Krajewski incidence cannot see a derived flavor line

A Krajewski diagram records which algebra bimodules are connected. In the generation-blind replication, all three family copies occupy the same vertex labels. The diagram can say

\[
\text{this particle-type arrow exists},
\]

but not

\[
\text{this arrow may use }L_{\rm im}\text{ and must avoid }L_{\rm ker}.
\]

The image/null distinction is defined only after choosing the Majorana flavor spurion. It is invisible to an incidence graph whose vertices contain no represented family labels.

This closes the simplest proposed protection mechanism:

\[
\boxed{
\text{unchanged generation-blind first order}
\not\Longrightarrow
r_{\rm ker}=0.
}
\]

## 5. Relation to the older alignment no-go

The earlier [generation-commutant theorem](192_generation_commutant_no_go_for_automatic_seesaw_alignment.md) showed that a generation-blind Furey linking algebra cannot select a nonzero symmetric flavor tensor or automatically align two such tensors.

The present result is narrower and closer to phenomenology. Even after a rank-one Majorana tensor has been supplied externally, the unchanged axioms do not constrain the Dirac tensor relative to its image/null flag.

Thus the newer branch does not evade the older no-go by using the Majorana matrix to define the flag. It merely moves the missing datum from

\[
\text{which symmetric tensor?}
\]

to

\[
\text{which Dirac directions relative to that tensor?}
\]

The full (M_3(\mathbb C)) multiplicity freedom answers: all of them, unless extra structure is added.

## 6. Live escape routes

### 6.1 Represented family algebra

The two-point family algebra branch can assign different characters to (P) and (Q). A further refinement must distinguish the image and null lines inside (Q), or dynamically align the rank-one (QM_RQ) image with a protected character.

### 6.2 Normalizer rather than commuting algebra

A gauge-dressed family normalizer could correlate the Majorana Takagi flag with allowed Dirac arrows without introducing a full family gauge group. This must be written explicitly and checked against reality, unimodularity and anomalies.

### 6.3 Unique shared spurion

If one source-derived family tensor generates both (M_R) and the relevant Dirac support, polynomial relations may force (r_{\rm ker}=0). A second independent spurion generically reopens the dangerous component.

### 6.4 Dynamical alignment

The scalar potential or renormalization group could make (r_{\rm ker}=0) a stable vacuum condition. This is not a first-order/Krajewski explanation and must include radiative stability.

## 7. Stop-everything criteria

**Published-triple stop:** do not claim that the unchanged generation-blind Pati–Salam first-order condition protects the electron texture zero.

**Incidence stop:** a diagram with family multiplicity but no family-labelled vertices cannot distinguish the Majorana image and null lines.

**Positive family-algebra trigger:** an explicit represented extension allows the Majorana charged sewing, forbids the Dirac null-line arrow, survives reality/first order, and retains viable PMNS mixing after controlled symmetry breaking.

**Single-spurion trigger:** the complete action contains one and only one relevant family tensor and proves (r_{\rm ker}=0) as a polynomial identity.

**Radiative stop:** if loops generate the allowed null-line Dirac counterterm, tree-level alignment is not technically natural without an additional Ward identity.

## 8. Verdict

The finite-geometry audit returns a negative but decisive result:

\[
\boxed{
\text{generation-blind Pati–Salam axioms}
\text{ admit both safe and dangerous Dirac leakage.}
}
\]

The exact electron texture and its quadratically protected deformation are therefore unavailable from the unchanged published triple. The research branch now forks cleanly:

1. construct a family-sensitive extension that forbids (K_{\rm ker});
2. derive a unique shared spurion;
3. accept a dynamical/tuned alignment and calculate its stability;
4. retain only the heavy-sector rank-one theorem without the low-energy zero.

This is a productive pin, not a collapse of the Jordan carrier. It identifies exactly where the microscopic construction must become family sensitive.

## Corpus position

- [Dirac-misalignment null-line theorem](1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md)
- [Majorana-phase sheets](1113_the_surviving_electron_normal_texture_zero_has_two_mirror_Majorana_phase_branches_and_a_narrow_absolute_mass_band.md)
- [generation-commutant alignment no-go](192_generation_commutant_no_go_for_automatic_seesaw_alignment.md)
- [Pati–Salam Majorana gauge/family separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [minimal three-line associative family algebra and its costs](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md)
- [sector-dependent Krajewski anchor mask](1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md)
