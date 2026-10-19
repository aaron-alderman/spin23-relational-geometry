# The Product of Furey-Handle and Higgs-Channel Gradings Is Exactly the Missing Lepton–Color Sign and Conditionally Reopens the A2 Route

**Date:** 17 October 2026  
**Branches:** four-channel Furey response, Higgs grading, Walsh duality, lepton/color aggregation, vector mediator, and $A_2$ selector  
**Claim status:** exact grading and Fourier-duality theorem; physical insertion on one mediator face and pulse protection remain open  
**Certificate:** [identify_the_handle_times_higgs_grading_as_the_missing_lepton_color_sign_and_reopen_the_a2_route.mjs](scripts/identify_the_handle_times_higgs_grading_as_the_missing_lepton_color_sign_and_reopen_the_a2_route.mjs)

**Typing qualification:** document 903 proves that the compressed sign/exchange pair is anti-symplectic on the two-real-dimensional aggregate plane. It can construct the active $C_3$ product, but its exchange member is not simultaneously the final four-dimensional selector handle. The neutral-plane sewing remains a separate stage.

## Executive result

The missing operation from documents 899–901 already exists in the established four-channel response algebra, but it is not an internal gauge transformation.

Order the Higgs-dressed channels as

\[
(u,\nu,d,e).
\]

The Furey-handle and Higgs-channel gradings are

\[
h=(+,-,-,+),
\qquad
\chi=(+,+,-,-).
\]

Their product is

\[
p=h\chi=(+,-,+,-).
\]

Thus $p$ is $+1$ on the two quark channels $(u,d)$ and $-1$ on the two lepton channels $(\nu,e)$.

On the normalized aggregate plane

\[
L=\frac{\nu+e}{\sqrt2},
\qquad
Q=\frac{u+d}{\sqrt2},
\]

in the ordered basis $(L,Q)$, it induces

\[
p_{LQ}=
\begin{pmatrix}-1&0\\0&1\end{pmatrix}
=-D,
\qquad
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

The overall minus sign is projectively irrelevant for a rank-one mediator direction and its Householder reflection. Therefore

\[
\boxed{h\chi\text{ induces exactly the missing lepton/color sign }D.}
\]

Applying it to one of the two projectively identical minimal-$\mathbf{10}$ Clebsch directions turns

\[
(1,\sqrt3)
\longmapsto
(1,-\sqrt3)
\]

up to overall sign. The two relative-$\pi$ reflections then generate the exact $A_2$ Coxeter element of document 898.

This reopens the paired-mediator route at the response/local-coefficient level. What remains is to derive why one mediator face carries this grading and to protect both reflection phases.

## 1. The two crossed gradings

The four-channel response corpus established two independent signs:

\[
h_u=+1,quad h_\nu=-1,quad h_d=-1,quad h_e=+1,
\]

from the two Furey handles, and

\[
\chi_u=+1,quad \chi_\nu=+1,quad \chi_d=-1,quad \chi_e=-1,
\]

from the up/$\widetilde H$ versus down/$H$ Higgs channels.

Their joint values label all four cells of a Klein square. Multiplying the two characters gives

\[
h_f\chi_f=
\begin{cases}
+1,&f=u,d,\\
-1,&f=\nu,e.
\end{cases}
\]

The product therefore forgets up/down while retaining exactly quark/lepton parity.

This is the sector distinction that no ordinary gauge transformation could provide in document 901.

## 2. Exact aggregation calculation

Let the aggregation map from atomic channels to normalized lepton/color responses be

\[
A=
\frac1{\sqrt2}
\begin{pmatrix}
0&1&0&1\\
1&0&1&0
\end{pmatrix}.
\]

It satisfies

\[
AA^T=I_2.
\]

Writing $P=\operatorname{diag}(h\chi)$, direct calculation gives

\[
APA^T
=
\begin{pmatrix}-1&0\\0&1\end{pmatrix}
=-D.
\]

No normalization ambiguity enters: positive common rescaling of the two quark atoms or the two lepton atoms cancels after normalized aggregation, provided the aggregation remains symmetric within each sector.

## 3. The exchange partner

The channel translation from the Walsh-square analysis is

\[
F_C=(u\ e)(\nu\ d).
\]

It sends the quark aggregate to the lepton aggregate and vice versa:

\[
AF_CA^T
=
\begin{pmatrix}0&1\\1&0\end{pmatrix}
=X.
\]

Thus the aggregate response plane already contains the two real Pauli operations

\[
X: L\leftrightarrow Q,
\qquad
Z\sim h\chi: (L,Q)\mapsto(L,-Q),
\]

up to overall sign. They anticommute:

\[
XZ=-ZX.
\]

This cleanly separates two operations previously conflated:

- the channel translation supplies the response exchange associated with the handle type;
- the product grading supplies the sector-relative sign needed to construct the second $A_2$ reflection.

Neither is an ordinary microscopic color transformation.

## 4. Walsh-dual description

The four Walsh characters are ordered

\[
(1,H,C,HC).
\]

The atomic product grading $p=h\chi$ is the $HC$ character. Multiplication by this character acts in the Walsh basis as

\[
1\leftrightarrow HC,
\qquad
H\leftrightarrow C.
\]

Meanwhile atomic channel translation is diagonal in the Walsh basis, with phases

\[
(+,+,-,-).
\]

This is the finite Fourier duality between translation and character multiplication. On the $(1,HC)$ block:

- channel translation is a sign $Z$;
- multiplication by $HC$ is an exchange $X$.

On the $(L,Q)$ aggregate block their roles are reversed. The same Pauli pair is being viewed in dual bases.

## 5. Composition with the explicit Clebsch result

Document 899 found that the two minimal vector-$\mathbf{10}$ weak channels have the same projective lepton/color direction. Choose the canonical representative

\[
g=(1,\sqrt3).
\]

Applying $p_{LQ}=-D$ gives

\[
p_{LQ}g
=(-1,\sqrt3)
\sim(1,-\sqrt3)
=Dg.
\]

Therefore the two rank-one projectors are exactly those required by document 898:

\[
P_g,qquad P_{Dg}.
\]

At relative phase $\pi$, their Householder reflections multiply to a $120^\circ$ rotation, explicitly conjugate to

\[
A_{C_3}=
\begin{pmatrix}0&-1\\1&-1\end{pmatrix}
\]

and carrying the $A_2$ metric.

The chain is now

\[
\boxed{
16\,16\to10
\xrightarrow{\text{one }h\chi\text{ boundary twist}}
\text{two }A_2\text{ root directions}
\xrightarrow{\pi\text{ pulses}}
C_3.
}
\]

## 6. What is proved and what is not

### Proved

- $h\chi$ is exactly quark/lepton parity on the four response atoms;
- normalized aggregation sends it to the required sector-relative sign up to overall orientation;
- channel translation becomes exact lepton/color exchange;
- the two operations anticommute on the aggregate plane;
- Walsh transformation exchanges their sign/exchange roles;
- applying $h\chi$ to one minimal-$\mathbf{10}$ response direction supplies the second normal required by the conditional $A_2$ theorem.

### Not proved

- that the physical vector-mediator action inserts $h\chi$ on exactly one of its two weak-component faces;
- that the four atomic channel sources retain coherent relative phases after renormalization;
- that the required boundary grading is autonomous rather than externally selected;
- that each mediator pulse has protected relative eigenphase $\pi$;
- that the resulting active plane is dynamically sewn to the neutral complement with the measured normalization.

## 7. Relation to the gauge no-go

There is no conflict with document 901. The product $h\chi$ is a grading of the completed response/source algebra. It is constructed from Furey-handle and Higgs-channel labels and need not be induced by a one-body gauge transformation.

Indeed, document 901 says precisely that any successful $D$ must be an extra local coefficient, boundary action or emergent composite-sector symmetry. The present result identifies the minimal existing candidate of that type.

## 8. Stop-everything and falsification criteria

**Boundary-insertion trigger:** an oriented Furey/Higgs sewing calculation places $h\chi$ on one vector-mediator face and not the other, with no arbitrary sign choice.

**Coherence trigger:** the full cross-channel Gram retains the $(1,HC)$ coherence required to make the grading operational rather than a population-only label.

**Pulse trigger:** the same boundary cycle quantizes both mediator relative phases to $\pi$.

**Full-selector trigger:** adjoining the neutral determinant plane and the independently derived channel exchange yields the exact order-18 relations on the physical four-carrier.

**Dephasing falsifier:** renormalized dynamics block-dephase the even/odd Walsh sectors, erasing the orientation before it reaches the mediator response.

**Insertion falsifier:** every covariant sewing applies $h\chi$ to both mediator faces or neither. Then their projective directions remain equal and the reflection product is identity.

**Typing falsifier:** the proposed $h\chi$ action is reinterpreted as an ordinary internal gauge transformation. It is a response/local-coefficient grading.

## 9. Verdict

| Question | Verdict |
|---|---|
| Does an exact candidate for the missing $D$ already exist? | **yes: $h\chi$** |
| Does it distinguish quark from lepton responses? | **yes** |
| Does normalized aggregation give $D$? | **yes, up to an overall sign** |
| Is its Fourier-dual partner the lepton/color exchange? | **yes** |
| Does it reopen the conditional $A_2$ mediator route? | **yes, algebraically** |
| Is its one-face physical insertion derived? | **not yet** |
| Are the $\pi$ pulse phases protected? | **not yet** |

## 10. Position in the corpus

- [four-channel crossed gradings](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
- [Walsh relational eigenchannels](819_restoring_both_square_flips_turns_the_four_channel_response_into_a_v4_convolution_algebra_with_walsh_hadamard_relational_eigenchannels.md)
- [orientation as Walsh character phase](822_the_atomic_orientation_bit_becomes_a_walsh_character_phase_and_is_invisible_to_relational_projector_populations.md)
- [full coherent Gram retains the orientation](823_the_paired_furey_graph_retains_the_walsh_orientation_signs_until_separate_channel_gram_packaging_erases_cross_character_coherence.md)
- [positive analytic two-character response carrying $D$](825_a_reciprocal_rational_inner_two_character_response_carries_orientation_odd_coherence_and_a_positive_matrix_spectral_residue.md)
- [conditional paired-reflection $A_2$ theorem](898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [explicit minimal Clebsch sign no-go](899_the_explicit_spin10_16_16_10_clebsch_map_gives_only_an_overall_weak_sign_so_the_minimal_paired_mediator_c3_route_closes_negatively.md)
- [unbroken-gauge origin excluded](901_no_unbroken_internal_gauge_transformation_can_supply_the_missing_sign_on_completed_lepton_and_color_dirac_responses.md)
