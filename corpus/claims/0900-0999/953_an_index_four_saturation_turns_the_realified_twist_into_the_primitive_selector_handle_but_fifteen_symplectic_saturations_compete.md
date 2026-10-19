# An Index-Four Saturation Turns the Realified Twist into the Primitive Selector Handle, but Fifteen Symplectic Saturations Compete

**Date:** 17 October 2026  
**Branches:** lattice saturation, sideband realification, selector handle, Smith obstruction, neutral completion, and Jordan descent  
**Claim status:** exact existence and finite nonuniqueness theorem; physical selector remains open  
**Certificate:** [classify_index_four_saturations_that_turn_the_sideband_twist_into_the_selector_handle.mjs](../../../verification/classify/classify_index_four_saturations_that_turn_the_sideband_twist_into_the_selector_handle.mjs)

## Executive result

Document 952 proved that the realified sideband twist \(T\) and selector handle \(H\) are rationally but not integrally conjugate on their original lattices.  The determinant-four intertwiner nevertheless identifies the exact repair.

Define

\[
L'=P^{-1}\mathbb Z^4
=\mathbb Z^4
+\frac12(e_1+e_2)
+\frac12(e_3+e_4).
\]

Then

\[
[L':\mathbb Z^4]=4,
\qquad
L'/\mathbb Z^4\cong C_2\oplus C_2.
\]

On \(L'\):

- \(T\) acts integrally;
- the rational intertwiner \(P:L'\to\mathbb Z^4\) becomes unimodular;
- the pulled-back selector alternating form becomes integral and unimodular;
- \((L',T)\) is integrally isomorphic to the primitive selector handle lattice.

Thus the index-four defect can be repaired exactly by saturation.

But the repair is not selected by \(T\) alone.  Among exponent-two index-four overlattices of \(\mathbb Z^4\):

\[
35\text{ are }T\text{-invariant},
\qquad
15\text{ make the transported form integral and unimodular}.
\]

The known \(P\) selects one of those fifteen.  A physical Jordan/neutral-plane principle must select why that one.

## 1. Explicit saturated basis

Use the basis

\[
B=left(
\frac{e_1+e_2}{2},
e_2,
\frac{e_3+e_4}{2},
e_4
\right).
\]

Its determinant relative to the original lattice is \(1/4\).  Therefore it spans an index-four overlattice.

The matrix

\[
U=PB
\]

is integral with

\[
\det U=-1.
\]

The rational conjugacy has become an integral lattice isomorphism after the domain saturation.  In the \(B\) basis,

\[
HU=UT_B,
\]

where \(T_B\) is integral.

## 2. Primitive alternating form is restored

Let

\[
J_T=P^TJ_{\rm code}P.
\]

On the original sideband lattice, \(\det J_T=16\).  On \(L'\), its matrix is

\[
J_B=B^TJ_TB=U^TJ_{\rm code}U.
\]

Because \(U\) is unimodular,

\[
\det J_B=1.
\]

So saturation simultaneously repairs the lattice index and restores a primitive self-dual symplectic form.  This is the exact mathematical operation sought at the end of document 952.

## 3. Census of competing saturations

Exponent-two index-four overlattices correspond to two-dimensional subspaces

\[
W\subset(\mathbb Z/2)^4.
\]

There are

\[
\binom{4}{2}_2=35
\]

such subspaces.  Since \(-1=+1\) modulo two, the diagonal involution \(T\) acts trivially on \((\mathbb Z/2)^4\).  Hence all 35 are \(T\)-invariant.

Write \(J_T=2K\) with \(K\) integral and unimodular.  Pairing two half-lattice generators \(u/2,v/2\) is integral precisely when

\[
u^TKv=0\pmod2.
\]

Thus \(W\) must be a Lagrangian plane for the induced symplectic form over \(\mathbb F_2\).  Four-dimensional symplectic space over \(\mathbb F_2\) has

\[
(2+1)(2^2+1)=15
\]

Lagrangian planes.  The executable census recovers exactly fifteen.

The chosen saturation corresponds to

\[
W_P=\operatorname{span}_{\mathbb F_2}{e_1+e_2,e_3+e_4}.
\]

It is one of the fifteen, not uniquely characterized by involution and symplectic integrality alone.

## 4. Interpretation

The index-four bridge is no longer mysterious:

\[
\text{sideband lattice}
\subset_{4}
\text{saturated response lattice}
\xrightarrow[\det=-1]{\;P\;}
\text{primitive selector lattice}.
\]

What remains mysterious is selection of \(W_P\).

The generators are paired half-sums within the two quadrature blocks.  This is suggestive of imposing two reality/neutral-completion relations, but dimension and shape do not prove that the neutral-neutrino pair supplies them.

The result also resembles the earlier first-order Weyl saturation: quadratic or quotient data can leave an index defect that oriented first-order information repairs.  Here there are two independent factors of two.  Whether they are the two faces, two quadratures, or two neutral completions must be derived.

## 5. Dependencies and open branches

Exact chain:

\[
DK\text{ realification}
\Rightarrow T
\Rightarrow P\text{ of index }4
\Rightarrow L'=P^{-1}\mathbb Z^4
\Rightarrow (L',T,J_B)\cong(\mathbb Z^4,H,J_{\rm code}).
\]

Open selection branches:

1. **neutral-neutrino selection:** the ordered \((\nu^c,\nu)\) pair fixes the two half-sums;
2. **Jordan selection:** triple polarization singles out \(W_P\) among the fifteen Lagrangians;
3. **Galois selection:** the trace/trace-zero split supplies the two quotient generators;
4. **boundary selection:** locality and face orientation choose a product Lagrangian compatible with the two chart labels;
5. **null branch:** the saturation is a basis-engineered arithmetic bridge with no physical selector.

## 6. Stop-everything and falsification criteria

**Neutral trigger:** a typed map from the neutrino complement lands exactly on the two generators of \(W_P\).

**Jordan trigger:** the triple product or cubic polarization makes \(W_P\) the unique admissible Lagrangian plane.

**Galois trigger:** reduction modulo two of the trace-pair action fixes \(W_P\) uniquely.

**Boundary trigger:** the two-chart locality axioms exclude the other fourteen symplectic saturations.

**Uniqueness falsifier:** \(T\)-invariance and symplectic integrality alone are claimed to select the saturation; fifteen choices survive.

**Particle-counting falsifier:** half-lattice generators are counted as new particles without a microscopic state map.

**Arithmetic overclaim:** existence of a saturation is presented as derivation of why nature uses it.

## 7. Verdict

| Question | Verdict |
|---|---|
| Can the index-four obstruction be repaired by an overlattice? | **yes, exactly** |
| Does \(P\) become unimodular on that lattice? | **yes** |
| Does the alternating form become primitive? | **yes** |
| Is the saturation \(T\)-invariant? | **yes** |
| Does \(T\) alone select it? | **no; 35 candidates survive** |
| Does symplectic integrality select it? | **no; 15 candidates survive** |
| Is its physical origin known? | **not yet** |

## 8. Position in the corpus

- [rational conjugacy and integral obstruction](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
- [primitive selector lattice](../0800-0899/865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [first-order Weyl saturation](../0800-0899/890_the_first_order_weak_weyl_coboundary_exactly_saturates_the_index_two_selector_defect_lost_by_quadratic_response.md)
- [Galois trace-zero carrier](946_galois_covariance_canonically_selects_the_trace_zero_four_plane_and_removes_the_handle_factorization_grassmannian.md)
