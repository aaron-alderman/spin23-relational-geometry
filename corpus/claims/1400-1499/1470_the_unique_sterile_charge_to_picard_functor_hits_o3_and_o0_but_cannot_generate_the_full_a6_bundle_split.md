# The unique sterile charge-to-Picard functor hits O(3) and O(0), but cannot generate the full A6 bundle split

**Date:** 20 October 2026

**Gates:** A6, with an A2/A5 sterile-sector consistency check

**Status:** exact Picard-functor classification and full-spectrum no-go

**Depends on:** [the first translation audit](1469_no_nonempty_invariant_packet_currently_crosses_the_jordan_furey_defect_action_port_chain.md), [the anomaly-free family charge table](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md), and [the unique zero-index spectator](1458_o0_is_the_unique_zero_index_cp1_spectator_but_no_single_ordinary_dirac_or_real_structure_generates_the_flux_split.md)

**Evidence:** [machine-readable classification](../../../evidence/data/spin23-charge-to-picard-functor-classification.json) and [executable verifier](../../../verification/verify/verify_spin23_charge_to_picard_functor_classification.mjs)

## Result

The first finite repair proposed by claim 1469 can be classified exactly. The character lattice of (U(1)) and the Picard group of (mathbb{CP}^1) are both integers:

\[
\operatorname{Char}(U(1))\cong\mathbb Z,
\qquad
\operatorname{Pic}(\mathbb{CP}^1)\cong\mathbb Z.
\]

A symmetric-monoidal charge-to-line-bundle rule induces a group homomorphism on isomorphism classes, hence

\[
q\longmapsto d(q)=kq,
\qquad k\in\mathbb Z.
\]

For the right-handed-neutrino family charges ((-3,0,0)), demanding

\[
-3\mapsto\mathcal O(3),
\qquad
0\mapsto\mathcal O(0)
\]

fixes (k=-1) uniquely. Thus the sterile selected/complementary split has an exact and unexpectedly economical Picard dictionary:

\[
\boxed{\mathcal F(q)=\mathcal O(-q).}
\]

But the same functor cannot generate the A6 bundle assignment for the full Standard Model parent. That failure is exact.

## 1. Why the sterile alignment is real

In the typed closure action, the selected right-handed neutrino has family charge (-3), while the two complementary right-handed neutrinos have charge zero. Under (d(q)=-q), these become degrees (3) and (0). Tensor products and charge addition agree:

\[
\mathcal F(q_1+q_2)
\cong
\mathcal F(q_1)\otimes\mathcal F(q_2).
\]

The charge-six selected Majorana bilinear maps correspondingly to degree (-6) for its compensating coefficient, matching the (mathcal O(-6)) obstruction in claim 1466 after convention is fixed. This is more than a numerical resemblance: it is a lattice homomorphism preserving tensor composition.

It is nevertheless a dictionary, not a causal derivation of three families. The (B-3L_i) charge table already presupposes three labelled families and a chosen projector (P_i).

## 2. Full-spectrum obstruction

For one selected family, the physical (U(1)_X) charges are

\[
\begin{array}{c|rrrrrr}
&Q_L&u_R&d_R&L_L&e_R&\nu_R\\ \hline
q_X&0&-1&1&-2&-1&-3.
\end{array}
\]

The A6 parent construction instead assigns the same (mathcal O(3)) twist to every Standard Model representation. No integer (k) can satisfy

\[
kq_X(r)=3
\]

for all six entries. Two obstructions are immediate:

1. tensor-unit preservation forces (d(0)=0), so the selected (Q_L) cannot map to (mathcal O(3));
2. (u_R) and (d_R) have opposite charges and therefore acquire opposite degrees under every homomorphism.

Consequently the existing anomaly-free family (U(1)_X) cannot be the universal degree source for the A6 parent.

## 3. Complementary family is not anomaly spectator

The exact sterile dictionary also compares different objects. The (q=0) entries are complementary members of an already existing three-family sterile space. The (mathcal O(0)) field in the A6 repair is an independent opposite-six-dimensional-chirality Weyl complex in every Standard Model representation, introduced so the local parent anomaly cancels without a massless mirror kernel.

Identifying these objects would be both representation-incomplete and circular: the complementary family labels presuppose the three-generation structure that the (mathcal O(3)) index was meant to explain.

## 4. Smallest surviving repair

A uniform bundle rule exists if a new species-independent grading is supplied:

\[
g_{\rm family}(\text{parent})=1,
\qquad
g_{\rm family}(\text{spectator})=0,
\qquad
d(g)=3g.
\]

This reproduces (mathcal O(3)oplusmathcal O(0)), but it merely names the desired split. No current Furey, Standard Model gauge or (Spin(2,3)) datum derives this grading. The next search must therefore look for an index, boundary incidence or superconnection grading that produces (g_{\rm family}), rather than reusing the species-dependent (U(1)_X) charge.

## 5. Path back to Spin(2,3)

The positive result links three previously separate ledgers in the sterile slice:

\[
q=-3
\longleftrightarrow
\mathcal O(3)
\longleftrightarrow
\operatorname{index}3,
\]

and its tensor square predicts the degree-six pairing obstruction. Because the selected (B-3L_i) orbit already returns to the population-normal (H_2(mathbb R)) Jordan carrier, this is a coherent loop back to (Spin_0(2,3)).

The loop is post-selective and sterile-specific. It does not yet transport the full Standard Model field content or derive the A6 ultraviolet matter module.

## Verdict

\[
\boxed{
\begin{array}{ll}
\text{sterile }(-3,0)\to(\mathcal O(3),\mathcal O(0)):&\textbf{unique and exact},\\
\text{full selected SM}\to\mathcal O(3):&\textbf{impossible from }U(1)_X,\\
\text{A6 parent/spectator origin}:&\textbf{still underived},\\
\text{physical admission}:&\textbf{unchanged}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_charge_to_picard_functor_classification.mjs
~~~
