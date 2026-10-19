# A Common Schur or Stress Mediator Transmits but Does Not Select the Singlet–Triplet Symplectic Ratio

**Date:** 17 October 2026  
**Branches:** full-color sector locking, Schur/Feshbach elimination, stress-energy universality, and symplectic normalization  
**Claim status:** exact normalization and underdetermination theorem; microscopic spectral calculation remains open  
**Certificate:** [classify_what_a_common_schur_mediator_can_and_cannot_fix_in_the_two_sector_symplectic_pencil.mjs](scripts/classify_what_a_common_schur_mediator_can_and_cannot_fix_in_the_two_sector_symplectic_pencil.mjs)

## Executive result

A common neutral mediator can couple the singlet and triplet **composite responses**, but Schur/Feshbach elimination does not by itself select the relative symplectic coefficient

\[
K_{a,b}=aK_s+bK_t.
\]

For two gauge-singlet composite sources \(O=(O_s,O_t)^T\), take the quadratic parent

\[
\frac12O^TAO+y,g^TO+\frac12my^2.
\]

Eliminating \(y\) gives

\[
A_{\rm eff}=A-\frac1mgg^T.
\]

The rank-one correction selects the direction \(g\) only when the bare kernel is sufficiently symmetric. But the projective ratio \(g_t/g_s\) is input data, not a consequence of elimination.

Moreover, under independent source normalization \(O\mapsto DO\),

\[
A\mapsto D^TAD,
\qquad
g\mapsto D^Tg,
\qquad
A_{\rm eff}\mapsto D^TA_{\rm eff}D.
\]

Any nonzero pair \((g_s,g_t)\) can be made apparently equal by a diagonal change of source units. Thus “universal equal coupling” has no invariant content until the two composite sources possess a common physical normalization.

## 1. What Schur elimination genuinely supplies

Schur elimination supplies three useful structures:

1. a mathematically natural quadratic relationship between the two composite response channels;
2. an off-diagonal effective kernel \(-g_sg_t/m\) without violating color gauge invariance, because both sources are already singlets;
3. a possible selected eigenline when the bare kernel has sufficient degeneracy or symmetry.

For the symmetric bare kernel \(A=\kappa I\),

\[
A_{\rm eff}g
=
\left(\kappa-\frac{\|g\|^2}{m}\right)g.
\]

The mediator direction is an exact eigenline. But its slope remains \(g_t/g_s\), which the construction does not calculate.

## 2. The exact additional symmetry required

Let

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

exchange the two composite sectors. The even or odd lines are selected only if

\[
XAX=A,
\qquad
Xg=\pm g.
\]

These imply equal diagonal response coefficients and

\[
g_t=\pm g_s.
\]

This would select \((1,1)\) or \((1,-1)\). But document 846 proved that the established neutral Furey exchange is not this sector exchange: full color forbids a linear map between the underlying \(\mathbf1\) and \(\mathbf3\) representations.

An exchange of the **composite singlet operators** could still emerge, but it is a new response symmetry requiring derivation.

## 3. Stress-energy universality is necessary but insufficient

A common spacetime metric couples canonically to

\[
T_{\mu\nu}^{\rm total}
=T_{\mu\nu}^{(s)}+T_{\mu\nu}^{(t)}
\]

once each sector stress tensor is fixed by variation of the same normalized action. This removes the arbitrary rescaling of the linear source coupling.

However, the effective stress response depends on two-point or spectral weights:

\[
\langle T^{(s)}T^{(s)}\rangle\sim c_s,
\qquad
\langle T^{(t)}T^{(t)}\rangle\sim c_t.
\]

Universality of the metric source does not imply \(c_s=c_t\). The coefficients depend on degrees of freedom, masses, interactions, improvement terms and renormalization. In normalized variables, the response direction is weighted schematically by

\[
(\sqrt{c_s},\sqrt{c_t}),
\]

so the ratio required to lock \(K_s\) and \(K_t\) is a dynamical spectral datum.

This identifies exactly how the original “Standard Model as stress-energy tensor” branch can contribute: it must calculate or constrain the relative spectral weights, not merely invoke universal coupling to gravity.

## 4. Relation to Jordan-triple recursion

The Schur complement remains the correct relational verb. Its quadratic correction polarizes to the Jordan triple already established in the corpus. What it does **not** do is choose its own source frame or normalize inequivalent source sectors.

The refined chain is

\[
\text{normalized sector sources}
\xrightarrow{\text{dynamics}}(A,g,m)
\xrightarrow{\text{Schur}}
A_{\rm eff}
\xrightarrow{\text{selected eigenline}}
K_{a,b}
\xrightarrow{\text{typed reduction}}
J_0.
\]

Only the second arrow is presently structural and universal. The first, third and fourth require physical data.

## 5. Stop-everything criteria

**Positive trigger:** a Standard-Model stress-tensor calculation, Ward identity or source action fixes normalized \(c_t/c_s\), and the corresponding Schur eigenline reduces to the document-839 \(J_0\) without further tuning.

**Alternative positive trigger:** an independently derived symmetry of the two gauge-singlet composite operators enforces \(XAX=A\) and \(Xg=\pm g\).

**Negative trigger:** the two sector spectral measures are independently renormalized with no exact relation. Then Schur elimination cannot provide a universal pole direction, although it remains a valid response mechanism.

**Falsifier:** invariance of the bare equality \(g_s=g_t\) under independent source normalization, or derivation of a unique projective direction from unconstrained \((A,g,m)\). The explicit congruence calculation excludes both.

## 6. Verdict

| Question | Verdict |
|---|---|
| Can a common mediator create a gauge-singlet cross response? | **yes** |
| Can it select its coupling direction when the bare kernel is symmetric? | **yes** |
| Does Schur elimination determine that direction? | **no** |
| Is equality of bare couplings normalization invariant? | **no** |
| Does universal metric coupling imply equal spectral weights? | **no** |
| What can fix the ratio? | **normalized stress dynamics or a new composite-sector symmetry** |

## 7. Position in the corpus

- [neutral exchange cannot provide the sector lock](846_the_neutral_furey_exchange_cannot_lock_the_singlet_and_triplet_symplectic_scales.md)
- [full-color invariant symplectic pencil](845_full_color_on_the_minimal_eight_real_carrier_leaves_two_symplectic_scales_and_does_not_select_the_unique_spin23_line.md)
- [Jordan triple as polarized Feshbach self-energy](668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [Jordan–Lie normalization remains dynamical](835_jordan_lie_compatibility_and_ward_positivity_do_not_fix_the_dynamical_bracket_scale.md)
- [conditional free-UV color multiplicity benchmark](849_free_uv_color_multiplicity_conditionally_gives_a_three_to_one_stress_weight_but_not_the_symplectic_pencil_ratio.md)

