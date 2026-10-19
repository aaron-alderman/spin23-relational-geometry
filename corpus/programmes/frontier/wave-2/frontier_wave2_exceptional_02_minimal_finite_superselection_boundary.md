# Frontier wave 2 exceptional 02: the minimal finite selector closes only as an added superselection label

**Date:** 18 October 2026  
**Frontier:** explicit \(\mathbb C_{\rm safe}\oplus\mathbb C_{\rm danger}\) completion  
**Status:** consistent finite real-even carrier constructed; derivation boundary proved  
**Certificate:** [construct_wave2_exceptional_minimal_finite_triple.mjs](../../../../verification/construct/construct_wave2_exceptional_minimal_finite_triple.mjs)

## Result

There is an explicit minimal finite Hilbert construction in which the tuned \(10_H\oplus\overline{126}_H\) safe/danger split is represented by self-adjoint central projections, satisfies the KO-six signs and first-order condition, and survives inner fluctuations and heavy-threshold Schur complements.

The success has a precise cost:

\[
\boxed{\text{the protecting }\mathbb C\oplus\mathbb C\text{ factor is a superselection label, not a derived one-form.}}
\]

If the finite Dirac operator commutes with the safe/danger centre, the differential calculus on that centre is zero. If a cross-sector Dirac edge is added to produce a nontrivial one-form, that one-form is exactly the forbidden mixing. In the minimal real representation it violates first order, survives degree-one junk, appears in inner fluctuations, and produces a nonzero cross-threshold propagator.

The abstract algebra fixes only the multiplicities \(2+1\). It does not select the required rank-two plane relative to the Clebsch covectors. Those embeddings form

\[
\operatorname{Gr}_{\mathbb C}(2,3)\cong\mathbb{CP}^2.
\]

Choosing the correct point is an additional four-real-parameter orientation datum unless a deeper geometry derives it.

## 1. Adapted carrier and metric

Use the direct-sum basis

\[
B=[s_1,s_2,d],
\quad
s_1=(1,-1,0),\quad
s_2=(1,0,-1),\quad
d=(0,1,1).
\]

The first two vectors span

\[
V_{\rm safe}=\ker q_{QQ},
\]

while

\[
V_{\rm danger}=\mathbb C d
=\ker q_{ue}\cap\ker q_{d\nu}.
\]

In the \(B\)-basis the central projections are

\[
P_0=\operatorname{diag}(1,1,0),
\qquad
Q_0=\operatorname{diag}(0,0,1).
\]

In the original Clebsch basis,

\[
P=BP_0B^{-1}
=
\begin{pmatrix}
1&0&0\\
-\tfrac12&\tfrac12&-\tfrac12\\
-\tfrac12&-\tfrac12&\tfrac12
\end{pmatrix},
\qquad Q=1-P.
\]

Define

\[
G=(B^{-1})^\dagger B^{-1}
=
\begin{pmatrix}
\tfrac34&\tfrac14&\tfrac14\\
\tfrac14&\tfrac34&-\tfrac14\\
\tfrac14&-\tfrac14&\tfrac34
\end{pmatrix}.
\]

Then \(G\) is positive and

\[
P^2=P,\qquad P^{\dagger_G}=P,\qquad PQ=0.
\]

Thus the oblique selector of wave-2 frontier 01 becomes an orthogonal projection in the physical \(G\)-inner product.

## 2. Algebra, representation, reality and grading

Let

\[
\mathcal A_{sd}=\mathbb C_s\oplus\mathbb C_d
\]

act on \(V\cong\mathbb C^3\) by

\[
\rho(a_s,a_d)=a_sP+a_dQ.
\]

This is a faithful \(*\)-representation for the \(G\)-adjoint. Double the carrier:

\[
\mathcal H_F=V_+\oplus V_-,
\qquad
\gamma_F=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]

and define

\[
J_F(v_+,v_-)=(\overline{v_-},\overline{v_+}).
\]

The certificate verifies

\[
J_F^2=+1,
\qquad
J_F\gamma_F=-\gamma_FJ_F.
\]

For real \(G\)-self-adjoint \(M\), set

\[
D_F=\begin{pmatrix}0&M\\M&0\end{pmatrix}.
\]

Then

\[
D_F\gamma_F=-\gamma_FD_F,
\qquad
J_FD_F=D_FJ_F.
\]

These are the KO-six signs used by the Standard-Model finite geometry. This is an auxiliary selector carrier, not a claimed replacement for the full Standard-Model triple.

## 3. Protected branch

Take

\[
M=m_sP+m_dQ.
\]

Then

\[
[D_F,\rho(a_s,a_d)]=0
\]

for every algebra element. Consequently:

1. order zero and first order hold;
2. \(\Omega^1_{D_F}(\mathcal A_{sd})=0\);
3. inner fluctuations from \(\mathcal A_{sd}\) vanish;
4. every function of \(D_F\), including inverse heavy propagators, remains block diagonal in \(P\oplus Q\).

For the explicit adapted-basis threshold matrix

\[
K_0=\operatorname{diag}(2,3,5),
\]

the safe--danger entry of \(K_0^{-1}\) is exactly zero. More generally,

\[
[K,P]=0\Longrightarrow[K^{-1},P]=0.
\]

Every Schur complement made from source maps respecting the two central characters therefore has zero cross term.

This handles the dangerous orthogonal states without deleting them. They live in \(Q\), where the retained currents vanish; \(QQ\) vanishes on \(P\). The sectors cannot communicate while the centre remains exact.

## 4. Mixing branch

Add a real \(G\)-self-adjoint cross edge. In the adapted basis choose

\[
X_0=E_{13}+E_{31},
\qquad
X=BX_0B^{-1},
\]

and replace \(M\) by \(M+X\). Now

\[
[D_F,P]\ne0.
\]

### 4.1 First order

For this minimal symmetric real representation, the opposite action of each real central generator equals its left action. The first-order expression

\[
[[D_F,P],P]
\]

is nonzero; the certificate finds unit maximal defect.

Other bimodule representations can relocate this first-order obstruction, but cannot restore superselection while keeping a cross edge: if \([D_F,P]\ne0\), propagation does not conserve the central character.

### 4.2 Junk quotient

The universal degree-one calculus of \(\mathbb C\oplus\mathbb C\) is generated by

\[
e_s\,de_d,\qquad e_d\,de_s.
\]

Their represented images have independent opposite off-diagonal supports. The certificate finds represented degree-one rank two. Since \(\rho\) is faithful, \(\ker\pi_0=0\); independence also gives \(\ker\pi_1=0\). Hence the degree-one junk is zero. The cross edge survives the quotient.

### 4.3 Inner fluctuations

The same nonzero represented one-forms occur in

\[
A_F=\sum_i\rho(a_i)[D_F,\rho(b_i)].
\]

Inner fluctuation therefore varies the forbidden cross block rather than protecting its absence.

### 4.4 Thresholds

Add an off-block heavy entry:

\[
K_\epsilon=
\begin{pmatrix}
2&0&\epsilon\\
0&3&0\\
\epsilon&0&5
\end{pmatrix}.
\]

For every \(\epsilon\ne0\),

\[
(K_\epsilon^{-1})_{13}\ne0.
\]

At \(\epsilon=0.2\), the certificate obtains approximately \(-0.02008\). The forbidden cross Schur complement returns immediately.

## 5. Superselection theorem

The alternatives are exhaustive for the minimal selector factor.

If

\[
[D_F,P]=0,
\]

the split survives inner fluctuations and symmetry-respecting thresholds, but the centre contributes no represented one-forms. It labels disconnected superselection sectors.

If

\[
[D_F,P]\ne0,
\]

the centre has a nontrivial differential, but that differential is a safe--danger arrow. It survives degree-one junk and enters the fluctuated Dirac operator and heavy inverse.

Therefore

\[
\boxed{\text{protected centrality}\Longleftrightarrow\text{trivial central differential}}
\]

in this minimal representation. A nontrivial one-form cannot derive the separation without undoing it.

## 6. Why the label is arbitrary

The algebra \(\mathbb C\oplus\mathbb C\) and multiplicities \((2,1)\) determine only the ranks of the central projections. On a three-dimensional complex carrier, their embeddings form

\[
\frac{U(3)}{U(2)\times U(1)}
=\operatorname{Gr}_{\mathbb C}(2,3)
\cong\mathbb{CP}^2,
\]

of real dimension four. The algebra, KO signs, grading, and first-order condition do not select

\[
V_{\rm safe}=\ker q_{QQ}.
\]

One may choose \(D_F\) with distinct eigenvalues \(m_s,m_d\), making \(P\) its spectral projector. But this moves the orientation into the input Dirac operator; it does not derive it.

Hence

\[
\boxed{\text{the completion is consistent once }P\text{ is supplied, but does not explain why nature chooses }P.}
\]

## 7. Relation to a nontrivial base geometry

The zero selector calculus does not force the complete physical geometry to lack one-forms. One may use

\[
\mathcal A_F
=\mathcal B_F\otimes(\mathbb C_s\oplus\mathbb C_d),
\]

where \(\mathcal B_F\) generates gauge and Higgs one-forms separately inside each central block. The selector factor remains a superselection grading.

This is the smallest coherent implementation. But the embedding of \(P\), the adapted metric \(G\), and every heavy-field block assignment remain extra model data. Tensoring does not derive them.

## 8. Decision table

| test | protected \([D_F,P]=0\) | mixing \([D_F,P]\ne0\) |
|---|---:|---:|
| faithful \(*\)-representation | yes | yes |
| KO-six signs | yes | yes |
| first order in minimal symmetric realization | yes | no |
| represented one-forms on selector centre | zero | rank two |
| degree-one junk removes cross edge | not applicable | no |
| inner fluctuations preserve split | yes, trivially | no |
| heavy inverse preserves split | yes | no |
| derives projector orientation | no | no |

## 9. Branch disposition

### Retain as a consistent effective completion

The adapted-metric \(\mathbb C_s\oplus\mathbb C_d\) factor consistently imposes the protected Furey incidence split. Once accepted, it solves the orthogonal-heavy-state and all-orders block-propagator problems.

### Close as a minimal represented-calculus derivation

The calculus cannot generate its own protected separator. Protection makes its differential trivial; a nontrivial differential is the forbidden mixing.

### Reopening criterion

A larger finite geometry must select the required point of \(\mathbb{CP}^2\) invariantly—for example as the unique spectral projector of a separately derived Jordan/Furey operator—while keeping every physical one-form and threshold block diagonal. Writing \(P\) into \(D_F\) or \(\rho\) does not qualify.

## Position in the corpus

- [adapted-metric loophole and canonical obstruction](frontier_wave2_exceptional_01_protected_furey_selector.md)
- [tuned distinct-Clebsch kernel](../parallel/frontier_parallel_exceptional_03_distinct_clebsch_selector.md)
- [\(\mathbb Z_9\) block protection](../parallel/frontier_parallel_exceptional_02_z9_threshold_and_seven_nine_mask.md)
- [mixed-DGA and superconnection stop](../parallel/frontier_parallel_topology_05_mixed_dga_and_superconnection_stop.md)
