# The Octonion Associator Is Orientation-Odd, but Furey Chain Completion Erases It as a Canonical Scalar

**Date:** 17 October 2026  
**Branches:** Furey chains, octonionic/Malcev algebra, global orientation, Walsh selector, and the (Spin(2,3)) interface  
**Claim status:** exact finite-dimensional certificate; retained as a frame-dependent witness and closed as an unframed global selector  
**Certificate:** [test_whether_the_octonion_associator_survives_furey_chain_completion_as_an_orientation_scalar.mjs](scripts/test_whether_the_octonion_associator_survives_furey_chain_completion_as_an_orientation_scalar.mjs)

## Executive result

This branch reaches a useful near-miss rather than an empty negative result.

For octonions,

\[
[a,b,c]=(ab)c-a(bc)
\]

is alternating. In the corpus Fano convention, the certificate finds

\[
[e_1,e_2,e_4]=2e_7,
\qquad
[e_4,e_2,e_1]=-2e_7.
\]

Thus the associator really is an **orientation-odd datum**. It also controls the failure of the commutator algebra to satisfy Jacobi:

\[
J_{[\ ,\ ]}(a,b,c)=6[a,b,c]
\]

on the explicit witness. This is the relevant Malcev shadow.

However, the datum is an imaginary octonion—a vector in the seven-dimensional imaginary space—not a distinguished real sign. Its canonical scalar part vanishes,

\[
\operatorname{Re}[a,b,c]=0,
\]

while its norm is even:

\[
\lVert[c,b,a]\rVert^2=\lVert[a,b,c]\rVert^2.
\]

A signed scalar such as

\[
\langle n,[a,b,c]\rangle
\]

requires a separately chosen imaginary direction (n). That is precisely the missing frame/selector data; it cannot be claimed as an output of the unframed octonion algebra.

Finally, Furey's octonionic chains live in an associative algebra of endomorphisms. If (L_a(x)=ax), then

\[
(L_aL_b)L_c=L_a(L_bL_c)
\]

as operator composition, even when

\[
(ab)c\ne a(bc).
\]

The nonassociativity survives only in the distinction between **collapsing octonion labels first** and **composing their left actions**. It is not an associator of the completed chain algebra itself.

The result is therefore:

\[
\boxed{
\text{octonion associator}
=\text{local orientation-odd vector}
\ne\text{canonical global orientation scalar}.
}
\]

## 1. Why this branch was worth opening

The programme has repeatedly found a local odd structure but failed to turn it into the global binary orientation used by the (18)-background/Walsh construction:

- the real lepton Kantor slice has an antisymmetric area generator;
- CP preserves the older Jordan graph but not that Kantor grading;
- the Freudenthal restriction reproduces the (H_2(\mathbb R)) determinant but is even under the relevant reflection;
- the response orbit requires explicit sideband doubling and does not manufacture an internal orientation label.

Octonionic nonassociativity was therefore a serious candidate. Unlike a determinant or norm, an associator is intrinsically ordered and alternating. If it had reduced canonically to one real sign after chain completion, it could have linked Furey's internal algebra to the unresolved orientation bit.

It does not do so without extra structure.

## 2. Exact octonion witness

Using the same Fano convention as the exceptional-Jordan certificate, the program searches all increasing imaginary basis triples and finds the first nonassociative witness:

\[
(i,j,k)=(1,2,4),
\qquad
[e_i,e_j,e_k]=2e_7.
\]

Swapping the outer entries gives

\[
[e_k,e_j,e_i]=-2e_7.
\]

The orientation sensitivity is therefore not metaphorical. It is an exact algebraic sign reversal.

The commutator Jacobian is also computed directly:

\[
[[a,b],c]+[[b,c],a]+[[c,a],b]=6[a,b,c].
\]

This locates the effect correctly: the imaginary octonions under commutator form a Malcev rather than Lie algebra, and the associator measures the Jacobi defect.

## 3. Why it does not yet give the wanted bit

The witness points along (e_7) in the chosen Fano frame. Another admissible octonion frame rotates the imaginary directions. There are two obvious ways to make a real number from it:

1. take its real part, which is zero;
2. take its squared norm, which is nonzero but invariant under the sign reversal.

The only elementary way to retain the sign is to contract with a chosen direction:

\[
\sigma_n(a,b,c)=\langle n,[a,b,c]\rangle.
\]

The certificate makes the dependence explicit. A unit vector parallel to the associator gives (+2); an orthogonal imaginary basis vector gives (0). Reversing the selected vector (n) reverses the proposed bit. Consequently the scalarization has merely moved the orientation choice into (n).

This is closely parallel to the earlier exceptional result: selecting a complex direction in the octonions leaves an (SU(3)) stabilizer, while selecting the (G_2)-fixed real carrier produces (H_2(\mathbb R)). A preferred imaginary direction is meaningful additional data, not something supplied by (G_2)-invariant octonion multiplication alone.

## 4. What associative chain completion preserves

Let (L_a) be the (8\times8) real matrix of left multiplication by (a). Matrix multiplication is associative, so the certificate obtains exactly

\[
\left\|(L_aL_b)L_c-L_a(L_bL_c)\right\|_F^2=0.
\]

But the two label-collapsed operators differ:

\[
L_{ab}L_c-L_aL_{bc}\ne0.
\]

For the witness its squared Frobenius norm is (16), and acting on the octonion identity recovers the original associator:

\[
(L_{ab}L_c-L_aL_{bc})(1)=[a,b,c]=2e_7.
\]

This gives the correct conceptual diagram:

\[
\begin{array}{ccc}
(ab)c & \xrightarrow{\text{subtract}} & a(bc)\\
\downarrow L && \downarrow L\\
L_{(ab)c} && L_{a(bc)}
\end{array}
\qquad\text{versus}\qquad
(L_aL_b)L_c=L_a(L_bL_c).
\]

Furey's chain algebra does not forget that (L_aL_b\ne L_{ab}). Indeed, that distinction is part of why the chain algebra becomes large enough to realize a Clifford algebra. What it does remove is any nonassociativity of **operator composition itself**.

## 5. Consequence for the (Spin(2,3)) programme

The branch does not prove that octonionic nonassociativity is physically irrelevant. It establishes a narrower statement:

> The bare associator cannot be the canonical source of the global (Spin(2,3))/Walsh orientation bit once the programme is formulated in Furey's associative chain algebra.

The possible surviving route is conditional:

\[
\text{independently selected internal frame }n
\Longrightarrow
\langle n,[a,b,c]\rangle
\Longrightarrow
\text{local signed witness}.
\]

That route is worth reopening only if another branch selects (n) for an independent reason—for example through a vacuum/idempotent, a physically fixed complex subalgebra, a boundary condition, or a source map already constrained by the Standard Model representation data. Choosing (n) merely to recover the desired sign would be circular.

## 6. Branch verdict

| Candidate claim | Verdict | Reason |
|---|---|---|
| The octonion associator is order-sensitive | **proved** | explicit (2e_7\mapsto-2e_7) witness |
| It supplies a Malcev/Jacobi defect | **proved on the witness** | direct (J=6[a,b,c]) computation |
| It has a canonical signed scalar part | **false** | real part vanishes; norm is sign-even |
| Furey chain composition remains nonassociative | **false** | endomorphism composition is associative |
| Label collapse retains a nonassociative defect | **proved** | (L_{ab}L_c-L_aL_{bc}\ne0) |
| It canonically selects the global Walsh orientation | **not supported; branch closed** | a preferred imaginary direction must be added |
| It may diagnose orientation after an independent frame is selected | **open conditional lemma** | contraction with the selected frame is sign-sensitive |

## 7. Stop-everything condition

Reopen this branch immediately if a separate, non-circular construction produces a preferred imaginary unit or covector (n) and also proves that

\[
\operatorname{sgn}\langle n,[a,b,c]\rangle
\]

is independent of presentation, descends through the particle ideals, and intertwines the already established selector action on the response channels. That would convert an available odd vector into the missing physical bit.

Until then, the stronger identification is closed.

## 8. Position in the corpus

This checkpoint should be read with:

- [the Furey technical algebraic guide](03_furey_technical_algebraic_guide.md), which distinguishes octonion products from chains of multiplication maps;
- [the exceptional cubic polarization theorem](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md), where the real associator cancels from the cubic;
- [the CP/Kantor gate closure](832_cp_pairing_preserves_the_lepton_jordan_graph_but_not_the_kantor_spin23_slice_closing_the_oriented_parent_gate.md);
- [the Freudenthal restriction checkpoint](833_the_freudenthal_quartic_can_homogenize_the_h2r_determinant_but_does_not_select_the_embedding_orientation_or_e8_parent.md);
- [the research frontier](30_research_frontier.md).

## 9. Sources and scope

The algebraic distinction between octonions and their associative chains is developed in Furey's [2016 thesis](https://arxiv.org/abs/1611.09182). For the standard octonion, (G_2), associator and triality background, see Baez's [*The Octonions*](https://arxiv.org/abs/math/0105155). The present file does not infer a physical mechanism from those sources; its novel content is the explicit bounded test against this programme's orientation requirement.

