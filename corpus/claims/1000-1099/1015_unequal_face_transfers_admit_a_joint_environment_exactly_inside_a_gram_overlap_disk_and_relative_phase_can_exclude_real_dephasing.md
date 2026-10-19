# Unequal Face Transfers Admit a Joint Environment Exactly Inside a Gram-Overlap Disk, and Relative Phase Can Exclude Real Dephasing

**Date:** 18 October 2026  
**Branches:** unequal response channels, joint dilation, Gram positivity, Real-compatible dephasing, and port rank  
**Claim status:** exact finite-dimensional classification; insertion of the physical channel functions remains open  
**Certificate:** [classify_the_unequal_transfer_joint_dilation_overlap_disk_and_rank_strata.mjs](../../../verification/classify/classify_the_unequal_transfer_joint_dilation_overlap_disk_and_rank_strata.mjs)

## Executive result

Document 1014 constructed a minimal joint environment when both face labels have the same scalar transfer \(f\). The unequal case can also be classified exactly.

Let

\[
\langle e_{\rm ref}|e_0\rangle=f_0,
\qquad
\langle e_{\rm ref}|e_1\rangle=f_1,
\qquad
\langle e_1|e_0\rangle=s.
\]

Three normalized environment rays with these overlaps exist if and only if

\[
\boxed{
\left|s-\overline{f_1}f_0\right|^2
\le
(1-|f_0|^2)(1-|f_1|^2).}
\]

Thus the admissible dephasing overlaps form a closed disk in the complex \(s\)-plane:

\[
\text{centre}=\overline{f_1}f_0,
\qquad
\text{radius}=\sqrt{(1-|f_0|^2)(1-|f_1|^2)}.
\]

Inside the disk the Gram rank is three; on its boundary it drops to two. A real nonnegative overlap exists only when this disk intersects \([0,1]\).

Relative transfer phase can therefore obstruct the Real-compatible partial-dephasing model even when both scalar channels are individually passive.

## 1. Gram matrix and Schur complement

The environment Gram matrix is

\[
G=
\begin{pmatrix}
1&f_0&f_1\\
\bar f_0&1&\bar s\\
\bar f_1&s&1
\end{pmatrix}.
\]

Assume \(|f_0|,|f_1|\le1\). Project the two conditioned rays orthogonally to the reference ray:

\[
u_0=e_0-f_0e_{\rm ref},
\qquad
u_1=e_1-f_1e_{\rm ref}.
\]

Their norms and overlap are

\[
\|u_0\|^2=1-|f_0|^2,
\qquad
\|u_1\|^2=1-|f_1|^2,
\]

\[
\langle u_1|u_0\rangle
=s-\overline{f_1}f_0.
\]

Cauchy–Schwarz is therefore exactly the boxed disk inequality. It is also sufficient: any two residual vectors with these Gram data can be adjoined to the reference ray.

The determinant is

\[
\det G
=(1-|f_0|^2)(1-|f_1|^2)
-\left|s-\overline{f_1}f_0\right|^2.
\]

## 2. Rank strata and minimal environment dimension

For strict scalar contractions \(|f_j|<1\):

- **disk interior:** \(\det G>0\), so \(\operatorname{rank}G=3\);
- **disk boundary:** \(\det G=0\), generically \(\operatorname{rank}G=2\);
- **special coincident limits:** the rank can drop further.

The common-transfer construction of document 1014 chooses \(f_0=f_1=f\) and \(s=|f|\). This point lies strictly inside the disk for \(0<|f|<1\), so its three-dimensional minimality is recovered.

The unequal case can sometimes be realized with only a two-dimensional environment, but only by choosing \(s\) on the boundary circle. Minimal dimension and desired dephasing strength are therefore linked.

## 3. Real-compatible overlap interval

Write

\[
c=\overline{f_1}f_0,
\qquad
R=\sqrt{(1-|f_0|^2)(1-|f_1|^2)}.
\]

A real overlap exists only if

\[
|\operatorname{Im}c|\le R.
\]

When this holds, the allowed real interval is

\[
s\in
\left[
\operatorname{Re}c-sqrt{R^2-(\operatorname{Im}c)^2},
\operatorname{Re}c+sqrt{R^2-(\operatorname{Im}c)^2}
\right]
\cap[-1,1].
\]

For the positive dephasing model it must further intersect \([0,1]\).

## 4. Exact examples

### Aligned phases

For

\[
f_0=f_1=0.9,
\]

the real interval is

\[
[0.62,1].
\]

The choice \(s=0.9\) is allowed and lies in the rank-three interior.

### Opposite phases

For

\[
f_0=0.9,
\qquad
f_1=-0.9,
\]

the real interval is

\[
[-1,-0.62].
\]

No nonnegative Real-compatible dephasing overlap exists. Individual passivity is insufficient; relative transfer phase matters.

### Strongly unequal magnitudes

For \(f_0=0.99\), \(f_1=0.1\), the often-guessed geometric mean

\[
s=\sqrt{|f_0f_1|}
\]

lies outside the allowed disk. There is no universal geometric-mean extension of the scalar rule \(s=|f|\).

## 5. Effect of complex overlap

If \(s=|s|e^{i\delta}\) is allowed to be complex, the reduced off-diagonal coordinate becomes

\[
w_s=|s|e^{i\delta}w.
\]

The sixth-harmonic term shifts as

\[
\operatorname{Re}(w_s^6)
=|s|^6\sin^6\theta\cos(6\phi+6\delta).
\]

A constant \(\delta\) merely rotates the six marked phases. A frequency-dependent or channel-dependent \(\delta\) can violate the fixed Real/CP marking and must be derived rather than gauged away casually.

## 6. Consequences for the physical response branch

The two reflection eigenchannels of the strict-loss Cayley response can carry different functions \(f_n(\omega)\) and \(f_t(\omega)\). The present theorem turns their compatibility with the Hopf-root dephasing into a direct calculation:

1. compute
   \[
   c(\omega)=\overline{f_t(\omega)}f_n(\omega);
   \]
2. compute
   \[
   R(\omega)=\sqrt{(1-|f_n|^2)(1-|f_t|^2)};
   \]
3. test whether the desired Real overlap lies in the disk \(|s-c|\le R\) for every frequency in the claimed regime.

Failure at one required frequency rules out that common environment typing.

## 7. Stop-everything and falsification tests

**Physical insertion trigger:** insert the actual normal/tangent transfer functions and obtain a nonempty positive-real overlap interval throughout the protected band.

**Rank-two trigger:** a symmetry or locality principle selects the boundary circle, reducing the environment to one auxiliary direction beyond the reference plane.

**$A_2$ trigger:** the rank-three interior complement carries the already derived outgoing-port doublet equivariantly.

**Relative-phase falsifier:** the physical disk fails to intersect \([0,1]\) at a required frequency.

**Geometric-mean falsifier:** use of \(s=\sqrt{|f_nf_t|}\) without checking the disk inequality.

**Real-structure falsifier:** a complex overlap has a non-removable phase incompatible with the fixed Real involution.

**Causal warning:** pointwise disk membership remains weaker than one analytic frequency-global dilation.

## Verdict

| Question | Verdict |
|---|---|
| What are all admissible unequal-channel overlaps? | **Exactly the Gram disk** |
| What is the generic environment rank? | **Three in the disk interior** |
| When can it fall to two? | **On the disk boundary** |
| Must a nonnegative real overlap exist? | **No** |
| Is the geometric mean universally allowed? | **No** |
| Have the physical channel functions been inserted? | **Not yet** |

## Position in the corpus

- [minimal scalar joint environment](1014_a_minimal_three_state_environment_jointly_realizes_scalar_loss_and_partial_dephasing_pointwise_but_causal_globalization_remains_open.md)
- [strict-loss/dephasing bridge](1013_the_strict_loss_schur_defect_fixes_the_partial_dephasing_overlap_conditionally_but_does_not_identify_the_two_channels.md)
- [minimal outgoing-port pair](../0900-0999/962_the_dissipative_cayley_generator_has_a_minimal_outgoing_port_schur_realization_but_no_closed_finite_hermitian_elimination.md)
