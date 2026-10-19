# arXiv:2610.21879v1 Re-entry Audit and Current-Frontier Map

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [*One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Version checked:** v1, submitted 15 October 2026  
**Branches:** B01, B02, B03, B04, B05, B07, B08, B09, B10, B11, B12, B13 and B14  
**Claim status:** source-version and corpus-coverage audit; no claim that the paper derives Jordan recursion or \(Spin_0(2,3)\)

## Executive result

The supplied link is the same v1 already used throughout this corpus. It does not supersede the existing analysis and does not require a new mathematical interpretation.

The paper proves an exact and important chain:

\[
\text{one }SO(10)\text{ spinor generation}
\longrightarrow
\text{integral triorthogonal charge lattice}
\longrightarrow
\text{punctured }[[15,1,3]]_p\text{ code for every prime }p.
\]

Its physical/combinatorial dictionary is exact:

- the sixteen even-parity five-bit weights are the fermions of one generation including \(\nu^c\);
- cubic gauge-anomaly cancellation is vanishing of the diagonal trilinear form;
- deleting \(\nu^c\) makes it the logical coordinate;
- gauge charges neutral on \(\nu^c\) become stabilizers;
- the uncancelled cubic anomaly becomes the transversal logical phase;
- minimum logical errors are neutral four-field relations;
- the fifteen-coordinate code is a Dirac-pair doubling of a seven-coordinate \(P\)-code plus a neutrino seed, linked by weak isospin.

What it does **not** prove is equally important. The paper does not construct a Jordan algebra, an \(H_2(\mathbb R)\) response cone, a symplectic four-carrier, an \(Sp(4,\mathbb R)\) action, or the five-dimensional \((2,3)\) primitive-form module. The source is therefore a rigorous cubic arithmetic input to this programme, not a derivation of its continuous geometric output.

## 1. Source claims checked

The v1 source states and proves the following principal results.

### 1.1 Integral cubic anomaly lattice

For charge vectors \(x,y,z\) and chiralities \(c_\ell\), the anomaly form is

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

The sixteen weights of the chiral \(SO(10)\) spinor make this form vanish on the charge lattice. Reduction modulo a prime produces a triorthogonal space.

### 1.2 Universal prime-family code

Puncturing the \(\nu^c\) coordinate yields

\[
[[15,1,3]]_p
\]

for every prime \(p\). For \(p=2\) this is the fifteen-qubit Bravyi–Kitaev code. For \(p=3\), the paper reports a computer-assisted uniqueness and minimality theorem among distance-three triorthogonal qutrit codes.

### 1.3 Logical anomaly

The logical charge may be represented by \(B-L\), or equivalently the \(SO(10)\) charge \(\chi/5\) modulo stabilizers. The logical transversal gate records the cubic anomaly that the removed \(\nu^c\) would cancel.

This is an exact puncture-residue statement, but its residue is a scalar cubic phase over a finite code. It is not the quadratic determinant obtained by Peirce-normal differentiation of a rank-three Jordan norm.

### 1.4 Dirac doubling

The code decomposes into two seven-state faces paired by Dirac partners and a neutrino seed. The paired rows carry vectorlike color/electromagnetic data; weak isospin supplies the chiral linker. This doubling is an exact combinatorial construction.

It is not automatically the conjugate-topology doubling used in the programme's completely positive real-structure selector. An intertwiner between the two doublings must be proved on the relevant observable algebra.

### 1.5 Golay continuation

The paper observes that ternary Golay doubling gives a \([[37,1,5]]_3\) code over the finite field, while lifting the construction to an anomaly-free integral spectrum requires an indefinite integral \(P\)-lattice with suitable normalization. The corpus has separately pursued and qualified this arithmetic branch.

## 2. Existing corpus coverage

The paper has already been audited at several successive programme frontiers. These are complementary rather than duplicate summaries.

### 2.1 First source audit

- [Standard-Model triorthogonal-code bridge and Golay integrality gate](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)

This verifies the five-bit cubic identities and identifies the sterile-neutrino puncture and the signed integral Golay problem.

### 2.2 Furey intertwiner comparison

- [Prakash–Ramya after the Furey intertwiner](444_prakash_ramya_code_after_the_furey_intertwiner_what_is_now_exact_and_what_remains_open.md)
- [The 25 minimum logicals are not single Furey ternary products](445_the_25_minimum_anomaly_code_logicals_are_not_single_furey_ternary_products.md)
- [All 25 logicals factor through the \(SO(10)\) vector 10](446_all_25_code_logicals_factor_through_the_so10_vector_10_but_12_require_colored_mediators.md)

These calculations prevent a direct identification of a code logical quartet with one Furey triple product while retaining the exact \(SO(10)\)-mediator factorization.

### 2.3 Integral-to-finite shadow and symplectic completion

- [Integral cubic to prime-shadow architecture](496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Primitive meridian plane without selected symplectic duals](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)
- [Cubic polarization does not pair the stationary plane](564_the_standard_model_code_confirms_the_five_bit_cubic_bridge_but_its_polarization_does_not_pair_the_stationary_plane.md)

The code fixes discrete arithmetic data but leaves a three-parameter family of symplectic complements. This is the exact point at which a putative route to \(Sp(4,\mathbb R)\) still needs additional sewing information.

### 2.4 Current response-selector comparison

- [Prakash–Ramya at the selector frontier](689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [Dirac exchange becomes the topology real structure only on Hermitian observables](690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [Weak-isospin topology parity and the broken neutrino pair](693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md)

This chain finds a genuine meeting point: after Hermitianization, Dirac-pair exchange can realize the same real-structure pattern used by the selector. Puncturing \(\nu^c\), however, removes one member of the neutrino exchange pair, so the fifteen-coordinate code alone is not closed under that operation.

### 2.5 Color and octonion factorization

- [Two complexified-octonion color modules, but not on the Dirac faces](714_the_standard_model_color_module_is_two_complexified_octonion_copies_but_not_in_the_prakash_ramya_dirac_face_factorization.md)
- [The Higgs frame selects two crossed octonion-shaped modules](715_electroweak_breaking_and_the_higgs_frame_select_two_crossed_octonion_shaped_generation_modules.md)

The full generation has the right color character to form two complexified-octonion-shaped modules, but these cross the paper's left/right Dirac faces. Electroweak breaking and Higgs-channel homogeneity select the crossing. That is currently the sharpest representation-level Furey/code bridge.

### 2.6 Cubic-type boundary

- [Jordan cubic polarization](701_polarizing_the_rank_three_jordan_cubic_along_the_discarded_face_gives_the_spin23_rank_two_determinant.md)
- [Exceptional cubic polarization](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Associative cubic Schur residue](753_the_h2_determinant_is_the_exact_normal_and_schur_residue_of_the_h3c_cubic_norm.md)
- [Albert cubic normal residue](754_the_albert_cubic_normal_residue_is_the_h2o_lorentz_norm_not_directly_the_spin23_h2r_norm.md)

The source's anomaly cubic and the Jordan determinant cubic are not the same object:

| feature | anomaly/code cubic | Jordan cubic norm |
|---|---|---|
| domain | charge lattice or finite-field reduction | rank-three Euclidean Jordan algebra |
| operation | puncture one coordinate | differentiate or normalize along a Peirce face |
| residue | logical cubic phase | rank-two quadratic determinant |
| natural output | transversal non-Clifford gate | Lorentzian spin-factor norm |
| proven map between them | none | none |

Their structural adjacency is real, but identifying them would be a type error until an explicit multilinear intertwiner is supplied.

## 3. What changes at the current frontier

The new link itself changes no theorem because it is the already-audited v1. Its value is to clarify which source statements remain load-bearing after later work.

Three survive intact:

1. **The cubic arithmetic is exact.** The one-generation charge lattice supplies a prime-independent integral parent for the family of code shadows.
2. **The puncture is physically distinguished.** Gauge neutrality selects \(\nu^c\) for ordinary primes, even though the Weyl group makes all single punctures code-equivalent abstractly.
3. **Dirac doubling has the right relational shape.** It supplies two faces, a linker and a seed, and becomes relevant to the real-structure selector on Hermitian observables.

Three hoped-for shortcuts remain closed:

1. A single logical qudit is not a four-real-dimensional symplectic carrier.
2. Triorthogonality does not select the missing symplectic dual plane.
3. A shared word “cubic” does not map the anomaly phase to the Jordan determinant residue.

## 4. Highest-value live calculations

The best uses of the paper now lie at the interfaces its exact structure actually controls.

### 4.1 Restore the full neutrino pair before selection

Work on the sixteen-coordinate parent, not only the punctured code. Test the Hermitian Dirac-exchange selector there, then ask whether puncturing is a boundary/logical readout after selection rather than the operation that defines the physical carrier.

**Stop condition:** the selector fails to preserve the gauge-stabilizer sector or necessarily introduces a propagating mirror copy.

### 4.2 Construct the missing symplectic dual from logical Pauli data

The code supplies a logical \(X\) direction and, through the dual code, a logical \(Z\) class. Determine whether two controlled punctures or two crossed Higgs modules produce a canonical integral alternating pairing rather than another chosen complement.

**Stop condition:** all allowed choices remain related by the previously found \(\operatorname{Sym}_2(\mathbb Z)\) shear freedom.

### 4.3 Test a typed cubic intertwiner

Seek a map from the diagonal anomaly trilinear form to the polarization of a declared Jordan cubic that respects:

- the \(S_5\) puncture stabilizer;
- the Higgs-selected crossed-module decomposition;
- Dirac exchange on Hermitian observables;
- and the real response selector.

Dimension or symmetry mismatch is a valid negative result. No “cubic equals cubic” assumption is permitted.

### 4.4 Use the 25 minimum logical supports as a finite experimental basis

The supports are a source-certified finite set. Evaluate response kernels, CP parity and mediator channels on this set rather than on generic symbolic quartets. The corpus already knows that no support is a single Furey ternary product and that all factor through the \(SO(10)\) vector 10; the next question is whether their aggregate Gram or commutator data span the needed carrier.

### 4.5 Keep arithmetic and dynamics separate

The paper proves code identities, not that spacetime is literally a quantum code. A physical proposal must state what is encoded, what noise/channel is present, what operation is recovery, and what low-energy observable detects the logical coordinate.

## 5. Bottom line

arXiv:2610.21879v1 is one of the strongest external inputs in the programme because it makes the one-generation cubic/code structure exact. It supports the claims that anomaly cancellation has a finite error-correcting shadow, that \(\nu^c\) is a distinguished puncture, and that Dirac pairing plus weak-isospin linking is a canonical relational decomposition.

It does not place \(Spin(2,3)\) at the center by itself. The live bridge remains:

\[
\boxed{
\text{integral cubic code data}
\xrightarrow{\text{explicit typed intertwiner}}
\text{symplectic four-carrier}
\xrightarrow{\Lambda_0^2}
\text{the }(2,3)\text{ module}.
}
\]

The first arrow—not the source paper's anomaly/code theorem—is still the research frontier.

**Later finite-group refinement:** document [940](940_the_prakash_ramya_qutrit_anomaly_gate_contains_a_protected_c3_phase_but_its_order18_extension_is_not_the_selector_group.md) isolates a sharper possible bridge. The source's qutrit logical gate has order nine and its cube is an arithmetically protected order-three phase. Cubed phase plus logical negation generates an $S_3$ that could match the selector's noncentral $S_3$ factor. The full source-side order-18 extension is $D_9$, however, not the established $C_3\times S_3$ selector. A typed logical-to-response intertwiner remains the decisive gate.
