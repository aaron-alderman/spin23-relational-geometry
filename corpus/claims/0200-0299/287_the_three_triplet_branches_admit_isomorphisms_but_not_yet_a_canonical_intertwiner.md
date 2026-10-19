# The Three Triplet Branches Admit Isomorphisms but Not Yet a Canonical Intertwiner

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact compatibility and obstruction audit of existing constructions; no source-derived universal intertwiner is currently present

## 1. The three triplets

The programme now contains three distinct three-real-dimensional structures.

### Furey/Jordan triplet

After a real selector, the weak or linking block contains

\[
J_F=H_2(\mathbb R)
\]

with determinant signature \((1,2)\). Before neutral dressing, the fixed real slice conflicts with continuous hypercharge; the gauge-neutral Peirce/response construction avoids that conflict at the cost of an extra locking step.

### Stress-response triplet

Two conserved real stress probes produce

\[
J_T=\operatorname{Sym}^2(\mathbb R^2)
\cong H_2(\mathbb R)
\]

as a positive spectral Gram carrier. Its basis and normalization depend on the physical probes.

### Sterile-flavor triplet

Three sterile flavors give \(\Lambda^2\mathbb C^3\). Majorana reality and Hodge duality reduce this to \(\mathbb R^3\), and a selector line supplies

\[
\eta_n=2nn^T-I
\]

of signature \((1,2)\). Call the resulting split triplet \(J_N\).

## 2. Existence of linear determinant isomorphisms

Choose selector coordinates \((t,x,y)\) on \(J_N\). Then

\[
\boxed{
I_N(t,x,y)=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}}
\]

satisfies

\[
\det I_N(t,x,y)=t^2-x^2-y^2.
\]

Thus \(J_N\cong H_2(\mathbb R)\) as a quadratic space after the selector.

The Furey and stress carriers are already copies of \(H_2(\mathbb R)\). Therefore determinant-preserving linear isomorphisms among all three branches **exist**.

This is stronger than a dimension match and weaker than a canonical physical identification.

## 3. The minimal commuting diagram

A universal response carrier would require maps

\[
\begin{array}{ccc}
J_F&\xrightarrow{I_F}&J\\
&&\uparrow I_T\\
J_N&\xrightarrow{I_N}&J\leftarrow J_T
\end{array}
\qquad
J=H_2(\mathbb R),
\]

with the following conditions.

### Quadratic/Jordan compatibility

\[
\det(I_aX)=q_a(X),
\]

and, whenever the source space already has a Jordan product,

\[
I_a(X\circ_aY)=I_aX\circ I_aY.
\]

### Positive-cone compatibility

Physical positive spectral elements must map into \(J_+\), not merely preserve an indefinite form.

### Selector compatibility

\[
I_aP_a=P_JI_a
\]

for the selected population/time line.

### Dynamical compatibility

For response kernels,

\[
I_aR_a(z)=R_J(z)I_a
\]

or a stated covariant version must hold.

### Gauge and Ward compatibility

The maps must descend through gauge/Ward quotients and act on neutral observables.

### Normalization compatibility

Probe rescalings, field wave-function factors and contact terms must not arbitrarily change the map.

No existing document establishes all six requirements simultaneously.

## 4. Residual nonuniqueness after the selector

Fixing the time line leaves an \(SO(2)\) freedom in the relationship plane. On \(H_2(\mathbb R)\), a plane rotation through angle \(\beta\) is implemented by congruence with a two-face rotation through half-angle \(\beta/2\).

Every such map preserves the determinant and cone. Therefore the selector does not orient the two relationship axes individually.

More generally,

\[
Q\mapsto gQg^T,
\qquad g\in SL(2,\mathbb R),
\]

preserves the determinant while changing the face basis. The family of abstract isomorphisms is a torsor under the relevant structure group.

An intertwiner is canonical only when physical probes, operators or boundary conditions select one point in this torsor.

## 5. Exact obstruction before selection

The sterile Majorana triplet initially carries a Euclidean \(O(3)\) metric, while \(H_2(\mathbb R)\) carries the split determinant. No real isometry exists before the selector because their inertias differ.

Likewise, the full complex Furey weak block is \(H_2(\mathbb C)\), not \(H_2(\mathbb R)\), and generic gauge phases rotate the proposed real off-diagonal line.

Thus the commuting diagram cannot be built from the unselected parent spaces by merely choosing bases. The real/split reductions are substantive inputs.

## 6. What the existing constructions already provide

Established now:

- the same target Jordan algebra occurs independently in the Furey and stress branches;
- the sterile branch can be converted into the same determinant space after Majorana reality and a selector;
- all branches admit positive response constructions;
- their remaining continuous ambiguity is explicitly classified.

Still missing:

- a common physical two-face source basis;
- a map from sterile flavor-pair operators to those faces;
- a neutral Furey operator with the same normalization;
- equality or controlled relation of the three response kernels.

## 7. Preferred next calculation

The least arbitrary route is source-first:

1. choose two conserved external probes fixed by boundary conditions;
2. calculate their stress spectral Gram;
3. calculate their matrix elements against the neutral Furey/sterile composite operators;
4. use those same probe amplitudes to define \(I_F\) and \(I_N\);
5. test rank, determinant, common selector and Schur/Herglotz closure.

This would orient the triplets through shared observables rather than by an abstract basis choice.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** one pair of physical probes constructs \(I_F,I_N,I_T\), makes the diagram commute and fixes the residual \(SO(2)\)/\(SL(2)\) torsor without arbitrary normalization.

**Kernel trigger:** the three pulled-back spectral kernels share one isolated selector and one causal sewing law.

**Gauge falsifier:** the Furey map requires a charged fixed real slice rather than neutral composites.

**Signature falsifier:** the sterile Euclidean triplet is mapped to the Jordan determinant without a derived selector.

**Canonicity falsifier:** the proposed map changes under an allowed probe or face-basis transformation with no physical convention fixing it.

## 9. Certificate

The [triplet-intertwiner gate certificate](../../../verification/verify/verify_triplet_intertwiner_commuting_diagram_gates.mjs) checks the selected sterile determinant isometry, residual half-angle \(SO(2)\) action, continuous intertwiner nonuniqueness, \(SL(2)\) face-basis torsor and compact/split inertia obstruction.

## Companion documents

- [Furey weak Jordan ladder](../0000-0099/69_furey_weak_jordan_ladder_spin23.md)
- [Unique linking \(M_2\) factor](../0100-0199/116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Majorana reality and selector](281_majorana_reality_gives_a_sterile_triplet_but_a_selector_must_create_jordan_signature.md)
