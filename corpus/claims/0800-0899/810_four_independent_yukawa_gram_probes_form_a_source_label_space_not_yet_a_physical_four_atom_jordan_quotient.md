# Four Independent Yukawa Gram Probes Form a Source-Label Space, Not Yet a Physical Four-Atom Jordan Quotient

## Claim status

Exact distinction between source rank and Jordan closure, with an explicit positive rank-four counterexample. This narrows the hypothesis of the preceding Jordan-triple rigidity theorem.

## 1. The audit question

The neutral-source result proved that the four Higgs-dressed channels

\[
G_u,G_d,G_e,G_\nu
\]

can be independently coupled and hence provide a rank-four observation space when \(\nu_R\) is present. It did **not** prove that these four composite operators multiply like the primitive idempotents of \(\mathbb R^4\).

These are different statements:

\[
\dim\operatorname{span}\{G_f\}=4
\]

does not imply

\[
G_f\circ G_g=\delta_{fg}G_f.
\]

The latter is what the primitive-projector theorem requires.

## 2. Three structures that must not be conflated

### 2.1 External source-label algebra

Four independently adjustable couplings \(s_f\) define the parameter space

\[
\mathcal C=\mathbb R^4.
\]

It has canonical coordinate idempotents \(e_f\) under pointwise multiplication. This algebra records which experimental or generating-functional source is switched on.

### 2.2 Composite-operator span

The corresponding QFT probes span

\[
\mathcal O=\operatorname{span}\{G_u,G_d,G_e,G_\nu\}.
\]

Their physical multiplication is governed by renormalized composite-operator products or the OPE. Contact terms and additional operators generally appear. Linear independence of the \(G_f\) says nothing about closure of \(\mathcal O\).

### 2.3 Four separate response cones

Each channel produces a positive two-face response

\[
G_f(p)\in H_2(\mathbb C)_+.
\]

Before a common kernel or cross-channel correlator is supplied, these naturally live in separate copies:

\[
\bigoplus_f H_2(\mathbb C)_+.
\]

The central block selectors of this direct sum form \(\mathbb R^4\), but the momentum-dependent Gram matrices \(G_f(p)\) are not themselves those central primitive idempotents.

## 3. Explicit counterexample

Even finite positive rank-one Gram matrices show the gap. In \(M_4(\mathbb R)\), take

\[
G_1=E_{11},\quad
G_2=E_{22},\quad
G_3=E_{33},\quad
G_4=|v\rangle\langle v|,
\qquad
v=\frac12(1,1,1,1)^T.
\]

Every \(G_i\) is a positive rank-one idempotent, and the four matrices are linearly independent. Nevertheless,

\[
G_1\circ G_4
=\frac12(G_1G_4+G_4G_1)
\notin\operatorname{span}\{G_1,G_2,G_3,G_4\}.
\]

Adjoining this product increases the span rank from four to five. The special Jordan triple likewise fails closure because

\[
\{G_1,G_1,G_4\}
=G_1\circ G_4
\text{ under the associative special-triple convention},
\]

and is outside the original span.

Thus even the much stronger assumptions “positive,” “rank one,” “idempotent” and “linearly independent” do not imply a four-atom Jordan algebra. Pairwise orthogonality is the missing property in this example.

## 4. Corrected reading of the triple-rigidity result

The previous theorem remains exact in the following conditional form. Let

\[
\Phi:\mathcal C\cong\mathbb R^4
\longrightarrow
\mathcal B\cong\mathbb R^4
\]

map the external channel selectors to the checkpoint spectral algebra. If \(\Phi\) is unital, nonvanishing on every channel and preserves a physically justified Jordan triple, then it must permute primitive projectors.

What is **not** yet proved is that the assignment

\[
e_f\longmapsto G_f
\]

from channel selectors to Yukawa Gram composites preserves either a Jordan product or the Furey TRO triple. Transporting coordinatewise multiplication through a merely linear bijection would define an artificial product

\[
G_f\star G_g=\delta_{fg}G_f,
\]

but would not show that \(\star\) equals any physical operator composition.

## 5. Relation to the actual Furey triple

The completed Furey matter space has the genuine TRO product

\[
[x,y,z]=xy^\dagger z
\]

on sixteen matter matrix units. Its symmetrization is a Hermitian Jordan triple. This structure is real and already verified.

The four Yukawa labels, however, denote composite paths or matched face pairs. They are not presently shown to be four matrix units forming a ternary subtriple or a quotient triple of the completed matter TRO. A quotient requires a kernel \(K\) satisfying the triple-ideal conditions

\[
\{K,M,M\}+\{M,K,M\}+\{M,M,K\}\subseteq K.
\]

No such kernel selecting exactly \(u,d,e,\nu\) has yet been constructed.

## 6. The next precise construction problem

There are now three credible routes:

1. **Central-selector route:** derive four orthogonal central channel projections from the generating functional or superselection structure, then map those projections to spectral atoms.
2. **TRO-quotient route:** construct a triple ideal in the completed Furey TRO whose quotient has exactly four nonzero primitive channel classes.
3. **OPE route:** compute the renormalized product table of the four neutral composites and show that a four-dimensional closed semisimple Jordan quotient survives after contacts and null operators are removed.

Only after one of these steps does the triple-rigidity theorem become a source-derived projector-selection result.

## 7. Stop-everything tests

- **Central success:** four physically defined mutually orthogonal central source projections are found.
- **Triple-quotient success:** an explicit triple ideal produces a four-atom quotient with the four Yukawa classes nonzero.
- **OPE success:** the four composites close modulo a calculated ideal and the quotient multiplication is semisimple and coordinatewise.
- **Closure falsifier:** a required cross product produces an independent operator outside the proposed quotient with no physical null relation.
- **Artificial-product warning:** coordinatewise multiplication is introduced only by transporting the channel labels, without deriving it from operator composition.
- **Degeneracy falsifier:** renormalization mixes or identifies channels so the quotient has rank below four.

## 8. Executable certificate

    node verification/prove/prove_rank_four_positive_gram_sources_need_not_form_a_four_atom_jordan_or_triple_algebra.mjs

The certificate constructs four independent positive rank-one idempotents, verifies source rank four, and proves that both a Jordan product and a triple product enlarge their span to rank five.

## Companion documents

- [Jordan-triple primitive-projector rigidity](809_unital_jordan_triple_preservation_forces_the_four_neutral_sources_back_to_primitive_spectral_projectors_and_quantifies_approximate_purity.md)
- [Four neutral Yukawa Gram sources](../0700-0799/796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
- [Four gauge-neutral two-face responses](../0200-0299/264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Completed Furey Cartan–ternary intertwiner](../0400-0499/412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Furey orientation as a ternary bimodule](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
