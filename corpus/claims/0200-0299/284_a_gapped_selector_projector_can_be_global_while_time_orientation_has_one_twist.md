# A Gapped Selector Projector Can Be Global While Time Orientation Has One Twist

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B07, B08, B09 and B11  
**Claim status:** exact real-eigenline holonomy model; physical occurrence in the neutrino or response parameter space remains open

## 1. A gapped loop with nontrivial eigenline holonomy

Consider the real symmetric family

\[
K(\phi)=
\begin{pmatrix}
\cos\phi&\sin\phi&0\\
\sin\phi&-\cos\phi&0\\
0&0&-2
\end{pmatrix},
\qquad 0\leq\phi\leq2\pi.
\]

Its spectrum is constant:

\[
\{1,-1,-2\}.
\]

The largest eigenvalue is isolated by a gap of two everywhere on the loop. A continuous normalized eigenvector is

\[
n(\phi)=
\begin{pmatrix}
\cos(\phi/2)\\
\sin(\phi/2)\\
0
\end{pmatrix}.
\]

After one circuit,

\[
\boxed{n(2\pi)=-n(0).}
\]

The selected real line is a Möbius line over the parameter circle.

## 2. Projector and metric remain global

The rank-one projector

\[
P(\phi)=n(\phi)n(\phi)^T
\]

is periodic:

\[
P(2\pi)=P(0).
\]

So is the split selector metric

\[
\eta(\phi)=2P(\phi)-I.
\]

Therefore the unoriented decomposition into one positive line and a negative plane is globally defined even though no global nonzero oriented eigenvector exists.

This separates two requirements:

- **global Jordan signature:** needs \(P\), which exists;
- **global future/time orientation:** needs a continuous choice of \(n\), which fails.

## 3. The exact one-twist invariant

The projector in its active \(2\times2\) block is

\[
P(\phi)=\frac12
\begin{pmatrix}
1+\cos\phi&\sin\phi\\
\sin\phi&1-\cos\phi
\end{pmatrix}.
\]

Under \(\mathbb RP^1\cong S^1\), it has degree one. Hence

\[
w_1(P)=1\pmod2.
\]

This is a genuine “one twist” carrier: a transported face vector returns with a minus sign while the quadratic relationship/projector returns to itself.

It differs from the earlier radial rank-collapse projector, whose boundary degree was two and whose pulled-back real line had \(w_1=0\). The two defects have different parity even though both use doubled projective angles.

## 4. Moving-frame connection

Let \(O(\phi)\) rotate the active plane by \(\phi/2\). Then

\[
P(\phi)=O(\phi)P(0)O(\phi)^T
\]

and the moving-frame connection is

\[
\mathcal A=O^TdO
=
\frac12
\begin{pmatrix}0&-1\\1&0\end{pmatrix}d\phi.
\]

Its integrated rotation is \(\pi\), producing the sign holonomy. Locally one may transform into the fixed-selector frame, but the connection then enters derivatives and mixes the selected line with its complement.

This is the precise price of replacing strict commutation by covariant transport.

## 5. Degeneracy lies inside, not on, the loop

The eigenvalue gap never closes along the loop. Nontrivial holonomy is possible because the loop can surround a degeneracy in a larger parameter space. Contracting the loop through that degeneracy destroys the isolated-line hypothesis.

Thus gap stability is local and pointwise; it does not guarantee global triviality over a noncontractible or punctured parameter domain.

## 6. Consequences for the causal cone

The double cone determined by \(\eta\) is global. Selecting one future sheet requires orienting the positive line. With \(w_1=1\), future and past exchange after one parameter circuit.

A physical theory must then choose among:

1. pass to the double cover of parameter space;
2. retain an unoriented causal double cone;
3. add another field whose sign transition cancels the Möbius twist;
4. forbid loops enclosing the degeneracy in the physical domain.

This is a sharper global gate than merely requiring a real rank-one projector.

## 7. Relation to the braid/Hopf intuition

The construction realizes:

\[
\text{one line carrier}
\quad\xrightarrow{\text{one loop}}\quad
-\text{carrier},
\]

while its quadratic relationship is single-valued. It is the minimal mathematical version of a loop with one twist.

It is not yet a braid group, Hopf fibration or physical string. Those require additional dimensions and composition laws. But it identifies exactly which part of the intuition is already present: projective closure with nontrivial lift holonomy.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the physical neutrino/Furey response matrix has an isolated eigenline with measured \(w_1=1\), and its double cover or compensator has an independent physical interpretation.

**Connection trigger:** the moving-frame connection produces a calculable mixing or geometric phase in the response spectrum.

**Causality trigger:** a global time orientation emerges after combining the selector line with an existing fermion, Higgs or boundary sign bundle.

**Triviality falsifier:** the physical parameter domain is contractible and the selector gap never closes, forcing \(w_1=0\).

**Orientation falsifier:** a global future cone is asserted using only \(P\) despite odd eigenline holonomy.

## 9. Certificate

The [selector eigenline holonomy certificate](../../../verification/verify/verify_selector_eigenline_z2_holonomy.mjs) verifies the constant gap, eigenvector sign return, periodic projector and metric, degree-one projective map and nontrivial first Stiefel--Whitney class.

## Companion documents

- [Spectral-projector Jordan selector](282_an_isolated_real_neutrino_eigenline_gives_a_covariant_stable_jordan_selector.md)
- [Analytic support rotation](270_analytic_support_rotation_does_not_change_the_schur_rank_gate.md)
- [Two-parameter rank-collapse remnant](271_two_parameter_rank_collapse_leaves_a_finite_relational_remnant.md)
- [Twisted-bundle Schur recursion](221_twisted_bundle_schur_recursion_is_globally_covariant.md)
