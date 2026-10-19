# A Unique Minimal A2-Doublet Environment Embeds the Cyclotomic Source into the Balanced Selector Dilation

**Date:** 17 October 2026  
**Branches:** cyclotomic qutrit source, lossy selector characters, covariant quantum channels, minimal Stinespring environments, reflection symmetry, and the two-face/three-relationship programme  
**Claim status:** exact representation-level channel theorem; microscopic Kraus amplitudes remain open  
**Certificate:** [construct_minimal_reflection_covariant_channel_from_cyclotomic_to_balanced_selector_characters.mjs](scripts/construct_minimal_reflection_covariant_channel_from_cyclotomic_to_balanced_selector_characters.mjs)

## Executive result

The character obstruction in document 943 does not end the bridge. It changes its type from an invertible intertwiner to a covariant open-system channel—and that channel has a unique minimum environment once common-mode activation and reflection symmetry are required.

The restricted cyclotomic source has \(C_3\) multiplicities

\[
s=(0,3,3),
\]

while the six-port selector target has

\[
n=(2,2,2).
\]

A \(C_3\)-covariant Stinespring isometry

\[
V:\mathcal H_s\longrightarrow\mathcal H_t\otimes E
\]

requires enough copies of each source character inside the tensor product. A one-dimensional environment supplies only two copies of each character and cannot contain either source multiplicity three. Thus

\[
\dim E\geq2.
\]

At dimension two, reflection stability permits either two trivial characters or the nontrivial conjugate pair. Only

\[
\boxed{E=\chi_1\oplus\chi_2}
\]

can absorb source charge \(1\) or \(2\) while routing amplitude into the target trivial/common sector. Therefore the unique minimum reflection-stable, common-mode-activating environment is the real standard \(A_2\) doublet.

Moreover,

\[
n*e=(4,4,4),
\]

so the twelve-dimensional Stinespring carrier has exactly the same character multiplicities as the full strict-loss selector dilation.

This closes the representation-level channel bridge that documents 859 and 860 had left open. It does not yet identify the microscopic Kraus amplitudes.

## 1. Multiplicity criterion

Let \(e=(e_0,e_1,e_2)\) be the environment character multiplicities. The tensor-product multiplicity of character \(q\) is the cyclic convolution

\[
(n*e)_q=\sum_{a\in\mathbb Z_3}n_a e_{q-a}.
\]

Because \(n=(2,2,2)\),

\[
(n*e)_q=2\dim E
\]

for every \(q\). Embedding the source requires

\[
2\dim E\geq3,
\]

hence \(\dim E\geq2\).

This lower bound is independent of basis, Kraus choice and loss strength throughout the strict-loss rank chamber.

## 2. Reflection narrows the environment

The source and target reflections exchange \(\chi_1\leftrightarrow\chi_2\). A reflection-stable environment must obey

\[
e_1=e_2.
\]

At dimension two the only possibilities are

\[
(2,0,0)
\qquad\text{or}\qquad
(0,1,1).
\]

Both have enough raw tensor capacity. But the first carries no charge. A source vector of charge one can then land only in target charge one, and likewise for charge two. It cannot activate target charge zero.

The second permits

\[
\chi_1\longrightarrow\chi_0\otimes\chi_1,
\qquad
\chi_2\longrightarrow\chi_0\otimes\chi_2.
\]

Thus common-mode activation uniquely selects the nontrivial doublet.

This is the same abstract environment type found independently in document 859 by removing the null singlet from the three-handle class-sum channel.

## 3. Explicit equivariant isometry

Choose source bases \(s_{q,i}\), with \(q=1,2\) and \(i=0,1,2\). Choose target bases \(t_{a,\mu}\), with \(a=0,1,2\) and \(\mu=0,1\), and environment vectors \(e_1,e_2\).

An explicit isometry is

\[
\begin{aligned}
s_{1,0}&\mapsto t_{0,0}\otimes e_1,&
s_{2,0}&\mapsto t_{0,1}\otimes e_2,\\
s_{1,1}&\mapsto t_{2,0}\otimes e_2,&
s_{2,1}&\mapsto t_{1,0}\otimes e_1,\\
s_{1,2}&\mapsto t_{2,1}\otimes e_2,&
s_{2,2}&\mapsto t_{1,1}\otimes e_1.
\end{aligned}
\]

Every image has total character equal to its source character. Define reflection to:

- exchange source charges one and two;
- exchange target charges one and two;
- swap the two multiplicity vectors in target charge zero;
- exchange \(e_1\leftrightarrow e_2\).

Then \(V\) exactly intertwines reflection.

Tracing out \(E\) sends the maximally mixed source state to

\[
\frac{I_6}{6}.

\]

Thus the construction populates all three target character sectors with full rank and equal total weight.

## 4. Why twelve dimensions reappear correctly

For \(e=(0,1,1)\),

\[
n*e=(4,4,4).
\]

The Stinespring space therefore has dimension twelve and exactly the character pattern of the full strict-loss selector dilation.

Inside it, the six-dimensional cyclotomic source occupies

\[
(0,3,3).
\]

Its orthogonal complement has

\[
(4,1,1).
\]

The four trivial directions in that complement are the representation-theoretic reservoir from which common-mode response can emerge. The extra nontrivial pair completes reflection balance.

This explains the earlier dimension coincidence without identifying inequivalent six-dimensional representations:

\[
\text{cyclotomic source }6
\xrightarrow{\;E_{A_2}\;}
\text{Stinespring }12
\longrightarrow
\text{balanced target }6.
\]

## 5. Relation to “one carrier, two faces, three relationships”

Document 859 found that the three handle Kraus labels contain a null singlet and a minimal two-dimensional real \(C_3\) environment. The present theorem derives the same representation type from a different demand:

- source: anomaly-protected primitive ninth-root characters;
- target: three balanced selector characters;
- operation: reflection-covariant common-mode activation.

Both independently force

\[
E\cong\chi_1\oplus\chi_2.

\]

This is the strongest current cross-branch realization of the user's original language:

\[
\boxed{
\text{one observed response carrier, two environmental faces, three visible character relationships}.
}
\]

The equality is now exact at representation and channel-dimension level. Equality of microscopic Kraus operators is still open.

## 6. What is closed

- one-dimensional environments are impossible;
- a two-dimensional environment is sufficient;
- reflection plus common-mode activation uniquely chooses the nontrivial \(C_3\) doublet;
- an explicit equivariant isometry exists;
- its Stinespring character multiplicities exactly equal the full twelve-port dilation;
- it can send the maximally mixed cyclotomic source to the balanced full-rank selector target.

## 7. What remains open

- deriving the displayed isometry from minimum-logical, mediator or Furey amplitudes;
- deriving source and target compressions from the six-dimensional character channel to the four-dimensional bilocal carrier, then matching the compressed Kraus span to the two minimal handle-class operators of document 859;
- proving the physical environment is coherent and causal;
- incorporating actual loss-dependent effect eigenvalues rather than the balanced maximally mixed witness;
- preserving gauge and Higgs typing throughout the channel;
- deriving the cyclotomic source phase rather than inserting its representation.

## 8. Stop-everything and falsification criteria

**Kraus-factorization trigger:** derive isometries or quotient maps $J_{\rm in},J_{\rm out}$ between the six-dimensional character spaces and four-dimensional bilocal carrier such that, after one environment-unitary rotation,

\[
K_a=J_{\rm out}^*A_aJ_{\rm in},
\qquad a=1,2,
\]

for the handle-class operators $K_a$ and character-channel Kraus operators $A_a$.

**Loss-law trigger:** one microscopic two-face coupling reproduces the complete \((\ell_n,\ell_t)\)-dependent effects \(P_k\).

**Code trigger:** the environment doublet is realized canonically by a syndrome/deformation plane of the Prakash–Ramya code, not chosen after the fact.

**Causal trigger:** the twelve-dimensional equivariant isometry extends to the fixed-port rational-inner dilation sought in document 931.

**Minimality falsifier:** a reflection-covariant one-dimensional environment embeds source multiplicity three into target multiplicity two.

**Typing falsifier:** the only source-derived doublet is gauge charged or cannot feed the target common mode.

**Overclaim warning:** character-level uniqueness does not determine loss-dependent Kraus amplitudes.

**Typing warning:** the two channels have different input/output dimensions, $6\to6$ versus $4\to4$. Equality of their environment representations is not direct unitary equivalence of channels.

## 9. Verdict

| Question | Verdict |
|---|---|
| Minimum environment dimension | **two** |
| Unique minimum environment that activates the common mode | **$\chi_1\oplus\chi_2$** |
| Reflection-covariant isometry | **exists explicitly** |
| Twelve-dimensional character match | **exact: $(4,4,4)$** |
| Microscopic identity with the handle Kraus doublet | **not yet** |

## 10. Position in the corpus

- [minimal two-dimensional handle environment](859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
- [code and relationship layers before this bridge](860_the_standard_model_triorthogonal_code_and_the_two_kraus_relationship_plane_are_complementary_layers_not_yet_one_structure.md)
- [cyclotomic/Naimark character obstruction](943_restriction_of_scalars_explains_the_six_and_twelve_dimensional_cyclotomic_sizes_but_not_the_lossy_dilation_characters.md)
- [global passive selector POVM](939_the_full_passive_silver_loss_family_has_positive_c3_barycentric_effects_and_exact_six_port_dilations.md)
- [full twelve-port dilation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
