# Exact Standard-Model Quantum Numbers Allow the Complete Cross-Channel Mixing Graph, So the \(\mathbb R^4\) Center Is Not Symmetry-Protected

## Claim status

Exact one-generation charge and representation selection-rule audit. It proves that ordinary Standard-Model symmetries forbid none of the six cross-channel edges; it does not prove that every allowed kernel is dynamically nonzero.

## 1. The relevant dressed probes

Before replacing the Yukawa channels by their positive two-face Gram responses, consider the four gauge-invariant scalar monomials

\[
\mathcal O_u=u^cQ^T\epsilon H,
\qquad
\mathcal O_d=d^cH^\dagger Q,
\]

\[
\mathcal O_e=e^cH^\dagger L,
\qquad
\mathcal O_\nu=\nu^cL^T\epsilon H.
\]

These are the scalar channel operators whose broken-phase faces underlie the neutral Gram construction.

## 2. Exact charge ledger

In left-handed Weyl convention,

\[
B(Q)=\frac13,
\quad
B(u^c)=B(d^c)=-\frac13,
\]

and

\[
L(L)=1,
\quad
L(e^c)=L(\nu^c)=-1.
\]

The Higgs has \(B=L=0\). Every monomial therefore has

\[
B=0,
\qquad
L=0,
\qquad
B-L=0.
\]

The color and weak indices are contracted to singlets, and the hypercharges sum to zero in all four cases. Every operator is a Lorentz scalar. Hence all four have the same exact quantum-number tuple:

\[
(\text{Lorentz scalar},\mathbf1,\mathbf1)_0,
\qquad B=L=0.
\]

## 3. The symmetry-allowed graph is complete

Construct a graph with vertices

\[
\{u,d,e,\nu\}
\]

and draw an edge when the audited exact symmetries permit a cross two-point, OPE or renormalization kernel between the associated neutral probes.

Because every vertex has the same exact charge tuple, all six edges are allowed:

\[
\boxed{
G_{\rm allowed}=K_4.
}
\]

Neither color, weak isospin, hypercharge, baryon number, lepton number nor \(B-L\) protects one channel center from another after gauge-invariant dressing.

This is not a claim that every edge is nonzero. It is the sharper statement that a zero edge needs an additional reason.

This scalar-level result does not contradict the earlier Schur-lemma obstruction for the uncontracted dressed faces. Those faces occupy four inequivalent gauge representations and admit no bare linear intertwiners. The complete graph arises only after Higgs contraction produces scalar singlets; spurion insertions must carry the lost channel information. [The full channel-spurion audit](815_the_rank_four_channel_spurion_lattice_forces_cross_response_mixing_to_start_quadratically_but_the_single_incidence_grading_is_too_coarse.md) makes this two-level distinction explicit.

## 4. Spurion symmetries versus exact symmetries

If some Yukawa couplings are set to zero, independent chiral field-number symmetries are restored. Treating Yukawa matrices as spurions can therefore grade cross-channel kernels by powers of

\[
y_u,y_d,y_e,y_\nu.
\]

An edge may begin only at a particular loop order or carry a small product of Yukawa coefficients. Such suppression is valuable, but it is not exact centrality when the relevant spurions are nonzero.

The distinction is:

\[
\text{spurion-suppressed mixing}
\ne
\text{symmetry-forbidden mixing}.
\]

The primitive-center theorem requires the latter, or at least a quantitatively controlled approximate replacement.

## 5. Consequence for the four-atom bridge

The previous center theorem says that the surviving center dimension equals the number of connected components of the **nonzero** mixing graph. The present audit says only that the allowed graph is connected—and indeed complete.

Therefore the central \(\mathbb R^4\) bridge is not presently robust. It survives only if one of the following is proved:

1. an exact Furey or Jordan grading forbids the allowed cross kernels;
2. a Ward identity makes the renormalized response block diagonal;
3. the relevant generating functional defines four superselected external ports rather than one internally mixing operator algebra;
4. the cross kernels are perturbatively small enough for the approximate triple/purity bounds;
5. the programme is reformulated using a noncentral relational four-channel algebra.

## 6. What must actually be calculated

For renormalized probes \(\mathcal O_f^R\), compute either the anomalous-dimension matrix

\[
\mu\frac{d}{d\mu}\mathcal O_f^R
=\gamma_{fg}\mathcal O_g^R
\]

or the contact-subtracted spectral matrix

\[
\rho_{fg}(s)
=\operatorname{Im}langle\mathcal O_f\mathcal O_g^\dagger\rangle(s).
\]

The actual edge \(f-g\) is present when the relevant off-diagonal entry is nonzero. Its connected-component structure—not merely the availability of four source couplings—decides the center.

## 7. Three-generation extension

CKM and PMNS mixing occur inside and between flavor-valued versions of these probes. Mixing confined within a fixed channel block does not reduce the four-channel center. Any renormalized kernel connecting different channel types does.

The full graph should therefore have vertices

\[
(f,a),
\qquad
f\in\{u,d,e,\nu\},
\quad a=1,2,3,
\]

and then be contracted by channel type only after its connected components are known. A flavor matrix inside one channel is not the same obstruction as an edge between channel types.

## 8. Stop-everything tests

- **Exact protection:** a source-derived symmetry assigns distinct conserved charges to the four dressed channel selectors.
- **Block-diagonal success:** direct calculation gives \(\gamma_{fg}=0\) and \(\rho_{fg}=0\) for \(f\ne g\).
- **Approximate success:** off-diagonal norms satisfy the restricted-ray or approximate-idempotence tolerance.
- **Full-center falsifier:** any nonzero connected set of cross kernels is ignored while claiming four exact primitive central atoms.
- **Connected-graph event:** calculated nonzero edges connect all four channels, collapsing the exact center to \(\mathbb R\).
- **Allowed/nonzero warning:** the present complete graph is a selection-rule result, not a loop calculation.

## 9. Executable certificate

    node scripts/audit_exact_standard_model_quantum_numbers_of_the_four_yukawa_probes_and_the_symmetry_allowed_mixing_graph.mjs

The certificate verifies hypercharge, baryon and lepton neutrality for all four probes and constructs the complete six-edge graph allowed by their shared exact quantum numbers.

## Companion documents

- [Four-channel center and mixing-graph theorem](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
- [Transpose-paired Furey rectangles and Higgs split](812_transpose_paired_furey_rectangles_form_a_real_jordan_subtriple_but_the_higgs_vacuum_creates_the_four_channel_split.md)
- [Full gauge-covariant Yukawa portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Four neutral Yukawa source directions](796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
- [Rank-four spurion lattice and quadratic mixing order](815_the_rank_four_channel_spurion_lattice_forces_cross_response_mixing_to_start_quadratically_but_the_single_incidence_grading_is_too_coarse.md)
