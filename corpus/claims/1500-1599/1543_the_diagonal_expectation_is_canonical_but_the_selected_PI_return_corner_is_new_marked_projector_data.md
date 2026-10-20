# The Diagonal Expectation Is Canonical, but the Selected P/I Return Corner Is New Marked-Projector Data

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact conditional-expectation, automorphism and spectral-polynomial classification; selected corner not canonical from declared structure

**Depends on:** [the degree-two selected-return candidate](1540_selected_length_two_returns_recover_the_protected_texture_but_require_a_new_endpoint_projector_and_do_not_select_the_common_ray.md), [the linear descent no-go](1537_neither_minimal_rank_repair_has_a_natural_linear_descent_to_the_invertible_five_role_texture.md), and [the minimum finite-rank repairs](1533_the_four_zero_modes_require_exactly_four_new_real_completed_dimensions_and_no_edge_only_repair_exists.md)

**Evidence:** [conditional-expectation canonicity ledger](../../../evidence/data/spin23-selected-return-conditional-expectation-canonicity.json) and [deterministic algebra/automorphism verifier](../../../verification/verify/verify_spin23_selected_return_conditional_expectation_canonicity.mjs)

## Result

The first half of the selected-return rule in claim 1540 is canonical. In the
five-role coefficient algebra \(M_5(\mathbb C)\), with vertex projections
\(p_v\),

\[
E_{\rm diag}(a)=\sum_v p_vap_v
\]

is the standard conditional expectation onto the diagonal vertex algebra.
It is unital, faithful, trace preserving, completely positive, idempotent and
bimodular over the diagonal algebra. After real completion it is also
equivariant for \(J\), the KO-6 grading and relation parity.

The second half is not canonical from any already declared structure. Let

\[
q=p_I+p_P.
\]

Then

\[
F_{PI}(a)=qE_{\rm diag}(a)q=p_Iap_I+p_Pap_P
\]

is completely positive, idempotent and bimodular over the selected corner.
But

\[
F_{PI}(1)=q\ne1.
\]

It is a unital map only after the corner unit \(q\) has already been supplied.
It therefore cannot be the unital conditional expectation that derives \(q\)
from the full coefficient algebra.

Automorphisms do not rescue the selection. The unmarked five-chain has a
reflection

\[
I\leftrightarrow X,
\qquad P\leftrightarrow Z,
\qquad N\leftrightarrow N.
\]

There are eight reflection-invariant vertex masks, and \((I,P)\) is not one of
them. Marking \(P\), or marking the anchor set \((I,P)\), destroys the reflection;
the stabilizer becomes trivial and all 32 masks become equivariant. Thus
marked-anchor invariance is too weak, not uniquely selective.

The only unique construction from the named anchors is to add the rule

\[
\text{“take the inclusion-minimal, or graph-convex, mask containing }I-P.”
\]

That rule returns \((I,P)\), but it is a new functorial axiom. Declaring it is
equivalent in cost to declaring the projection \(q\).

Scalar spectral-action and heat-kernel functional calculus also fail. A
degree-two scalar polynomial has diagonal

\[
c_0+c_2(D^2)_{vv}.
\]

Demanding zero at \(X\) for arbitrary nonzero \(h\) forces

\[
c_0=c_2=0,
\]

so it cannot retain the \(P/I\) returns. More generally,
\(\exp(-tD^2)\) is positive definite for \(t>0\), hence every diagonal entry is
strictly positive. A localized trace or heat kernel can produce the desired
corner only by inserting \(q\) explicitly.

Therefore

\[
\boxed{
E_{\rm diag}\text{ is canonical, while }\Pi_{PI}
\text{ is genuinely new marked-projector data}.}
\]

## 1. The two maps have different categorical status

Let

\[
\Delta=\operatorname{span}\{p_I,p_P,p_N,p_Z,p_X\}
\subset M_5(\mathbb C).
\]

The diagonal map has the Kraus form

\[
E_{\rm diag}(a)=\sum_{v=1}^5p_vap_v.
\]

Its Kraus operators are orthogonal projections summing to one. Consequently:

- it is completely positive and unital;
- it is idempotent;
- it preserves the ordinary matrix trace;
- it is \(\Delta\)-bimodular; and
- its Choi matrix is positive with rank five.

These properties identify the ordinary trace-preserving conditional
expectation onto the declared diagonal maximal abelian subalgebra.

For the selected map,

\[
F_{PI}(a)=p_Iap_I+p_Pap_P,
\]

the two projection Kraus operators still prove complete positivity. Its Choi
rank is two, it is idempotent, and it is bimodular over

\[
q\Delta q=\operatorname{span}\{p_I,p_P\}.
\]

However it is not trace preserving or unital on \(M_5\). It is a conditional
expectation only in the corner convention where \(q\) is already designated as
the unit. This is the precise mathematical location of the new datum.

## 2. Equivariance does not select the corner

The vertex projections commute with the diagonal KO-6 and relation gradings.
Under the real structure, adding the conjugate projectors makes both maps
\(J\)-equivariant. Therefore the selected corner passes all the compatibility
tests:

\[
[F_{PI},\gamma]=0,
\qquad
[F_{PI},\Gamma_{\rm rel}]=0,
\qquad
F_{PI}J=JF_{PI}
\]

on the real-completed algebra.

Compatibility is not canonicity. Every vertex mask gives the same type of
diagonal, completely positive, grade/relation-compatible corner map. The
symmetries must distinguish one mask if they are to derive it.

For the unmarked path \(I-P-N-Z-X\), the automorphism group has order two. Its
vertex orbits are

\[
\{I,X\},
\qquad
\{P,Z\},
\qquad
\{N\}.
\]

An invariant mask is an arbitrary union of these three orbits, giving
\(2^3=8\) possibilities. The mask \(\{I,P\}\) is sent to \(\{Z,X\}\) and is not
invariant.

Now mark \(P\) as the selected-cofactor role. Since the reflection sends \(P\) to
\(Z\), its stabilizer is the identity. All \(2^5=32\) masks are then invariant.
Marking the set \(\{I,P\}\) has the same result because reflection sends it to
\(\{Z,X\}\). Thus the already named anchors remove the only nontrivial
automorphism rather than selecting a mask.

Eight masks contain both anchors. Only one is inclusion-minimal:

\[
\{I,P\}.
\]

Equivalently, it is the graph-convex hull of the marked adjacent pair. But
neither inclusion minimality nor graph-convex return localization was an
axiom of the finite geometry. Adding either rule is a concise way to state
the new projector, not an independent derivation.

## 3. Path subalgebras do not supply an intermediate expectation

The algebra generated by all vertex projections and the four oriented chain
edges is the full matrix algebra. Products concatenate paths, so for any two
vertices \(u,v\), the unique graph path generates the matrix unit \(E_{uv}\). The
verifier closes the generators under multiplication and obtains all 25
matrix units.

Hence the conditional expectation onto the generated path algebra is just
the identity. It does not remove open two-step paths or select returns.

The degree-one vertex-edge span has dimension

\[
5+2\times4=13,
\]

but is not an algebra. For example,

\[
E_{IP}E_{PN}=E_{IN},
\]

and the right-hand side is a length-two matrix unit outside the degree-one
span. There is therefore no C*-algebra conditional expectation onto “paths
of length at most one.”

Once \(q\) is given, the block map

\[
a\longmapsto qaq+(1-q)a(1-q)
\]

is a unital completely positive conditional expectation. It still retains
the entire \(N-Z-X\) block, and its definition again presupposes \(q\). No already
declared path subalgebra produces the selected-return map for free.

## 4. Spectral polynomial no-go

For a scalar polynomial of degree at most two,

\[
p(D)=c_0\,1+c_1D+c_2D^2,
\]

the odd term has zero diagonal. At the terminal vertex \(X\),

\[
(p(D))_{XX}=c_0+c_2h^2.
\]

Requiring this to vanish for all nonzero \(h\) gives \(c_0=c_2=0\). The same
polynomial then produces no selected return at \(I\) or \(P\). The verifier
exhausts normalized \((c_0,c_2)\in\{-1,0,1\}^2\) and finds only the trivial
solution.

The spectral-action trace does not retain local vertex data:

\[
\operatorname{Tr}(D^2)=2(x^2+y^2+g^2+h^2).
\]

It sums every edge return. A localized expression

\[
\operatorname{Tr}(qf(D/\Lambda))
\]

can select \(I/P\), but only because \(q\) was inserted into the trace.

For heat kernels, (D^2) is positive semidefinite, so

\[
e^{-tD^2}
\]

is positive definite for every finite \(t>0\). Each diagonal expectation
(\langle e_v,e^{-tD^2}e_v\rangle) is strictly positive. It cannot equal a
proper zero-one vertex mask. Sandwiching by \(q\) works and again assumes the
answer.

## 5. What the physical anchors actually provide

The corpus already names three facts:

1. \(P\) is the selected-cofactor role;
2. \(I\) carries the complementary image mass \(d\); and
3. \(I-P\) is the first primitive chain edge.

These data label the two vertices and their edge. They do not state that a
return conditional expectation must vanish at every other labeled vertex.
Indeed \((N,Z,X)\) closed returns satisfy the same \(J\), grade and relation tests.

The smallest additional rule is

\[
\boxed{
\text{retain returns on the graph-convex hull of the marked }I-P
\text{ anchor}.}
\]

For adjacent anchors the hull is exactly \((I,P)\). This formulation is useful:
it is basis independent under automorphisms preserving the marked graph and
generalizes to larger chains. But it remains a new locality axiom for the
correspondence. It does not follow from the finite spectral-triple axioms or
the spectral action.

## Verdict

The canonicity audit separates a genuine theorem from an added selection law:

\[
\boxed{
\begin{array}{rcl}
E_{\rm diag}&:&\text{canonical conditional expectation},\\
\Pi_{PI}E_{\rm diag}&:&\text{CP equivariant corner after }q\text{ is given},\\
q=p_I+p_P&:&\text{not selected by declared symmetry or spectral calculus}.
\end{array}}
\]

The selected-return candidate of claim 1540 remains viable, but its exact new
structural input is now irreducible: the marked-anchor hull projector \(q\),
together with the inverse mass scale \(\kappa\) already isolated there. A future
physical derivation must exhibit \(q\) as a central or functorial projection of
a sourced larger algebra; otherwise the rule is a compact restatement of the
desired texture.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_selected_return_conditional_expectation_canonicity.mjs
node verification/verify/verify_spin23_degree_two_path_correspondence_classification.mjs
node verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
~~~
