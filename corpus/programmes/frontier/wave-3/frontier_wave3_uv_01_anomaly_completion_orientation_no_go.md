# Frontier Wave 3 — UV Completion Cannot Correlate the Two-Ray Source with the Safe/Danger Orientation

**Date:** 18 October 2026  
**Branch:** F6 exceptional/Furey selector, UV-completion audit  
**Status:** scoped no-go; one precisely identified intertwiner can reopen the branch  
**Exact certificate:** [analyze_frontier_wave3_uv_completion.mjs](../../../../verification/analyze/analyze_frontier_wave3_uv_completion.mjs)  
**Prior inputs:** [two-ray ALP benchmark](../wave-2/frontier_wave2_source_02_minimal_two_ray_alp_model.md), [minimal finite superselection boundary](../wave-2/frontier_wave2_exceptional_02_minimal_finite_superselection_boundary.md)

## Result

The smallest anomaly-completed source does **not** correlate the two-ray ALP choice with the safe/danger projector orientation.

There are two distinct questions:

1. Which Standard-Model current is used,
   
   \[
   \lambda_d=(5,5,1,1,1,0,0),\qquad
   \lambda_m=(5,5,1,1,3,0,0)?
   \]

2. Which two-plane in the three-dimensional triplet-mediator multiplicity space is declared safe,

   \[
   P\in \operatorname{Gr}_{\mathbb C}(2,3)\cong\mathbb{CP}^2?
   \]

Local anomaly equations depend on fermion charges, gauge representations and multiplicities. They do not depend on the eigenvectors of a scalar-mediator projector. Conversely, the projector orientation is invisible to the two source rays unless an explicit map joins the Standard-Model current module to the mediator multiplicity module.

The sharp boundary is therefore:

\[
\boxed{
\text{anomaly completion can protect a supplied }P,
\quad\text{but cannot select }P\text{ or pair it with }\lambda_d\text{ versus }\lambda_m.
}
\]

## 1. Smallest completion audit

### 1.1 Global ALP

For a global, derivatively coupled ALP,

\[
\frac{\partial_\mu a}{f_a}J^\mu_{\lambda_s},
\]

the nonzero current anomalies are not an inconsistency. They become physical \(aF\widetilde F\) interactions after integration by parts and field redefinitions. Therefore neither ray needs anomaly-cancelling matter merely to define the wave-2 ALP benchmark.

This is the smallest dynamical source model, and it admits both rays.

### 1.2 Gauged source and the minimal local EFT completion

If the same current is promoted to an exact gauged \(U(1)_X\), both rays require completion. The smallest four-dimensional EFT completion adds one shifting Stückelberg pseudoscalar \(b\),

\[
(\partial_\mu b+M X_\mu)^2,
\]

and Wess–Zumino/generalized Chern–Simons terms whose coefficients cancel the local anomaly polynomial. The mechanism and the role of local counterterms are standard in the four-dimensional Green–Schwarz construction; see [González-Rey, *The Four Dimensional Green-Schwarz Mechanism and Anomaly Cancellation Conditions*](https://arxiv.org/abs/hep-th/9602178).

This completion is available for either ray because the independent Wess–Zumino coefficients can be set to the negatives of that ray's anomaly coefficients. It therefore completes; it does not select.

There is also a physical cost. With one gauged \(U(1)_X\) and only one shifting phase, that phase is eaten. Retaining a physical ALP requires at least a second phase. The uneaten linear combination then depends on a new decay-constant/mass-mixing direction. That extra direction is another UV datum, not a consequence of anomaly cancellation.

### 1.3 Fermionic spectator completion

One may instead add chiral spectators whose charges solve the six local anomaly equations and whose masses arise from one or more symmetry-breaking scalars. This changes the realization, not the conclusion:

- the anomaly equations constrain spectator representations, charges and multiplicities;
- scalar mediator eigenvectors do not enter chiral anomaly traces;
- spectator Yukawa matrices and their couplings to the exceptional mediator are additional tensors;
- choosing one such tensor to have kernel \(P\) inserts the desired orientation.

Thus a spectator completion may correlate the sectors only by adding the missing intertwiner as a coupling. It cannot obtain the correlation from anomaly cancellation alone.

## 2. Local anomalies

Use one Standard-Model-plus-\(\nu_R\) generation in the all-left basis

\[
(Q,u^c,d^c,L,e^c,\nu^c,H),
\]

with integer hypercharge \(y_6=6Y=(1,-4,2,-3,6,0,3)\). Higgs scalars do not contribute to the chiral anomaly. The exact certificate obtains

| ray | \(SU(3)^2X\) | \(SU(2)^2X\) | \(Y^2X\) | \(YX^2\) | grav\(^2X\) | \(X^3\) |
|---|---:|---:|---:|---:|---:|---:|
| \(\lambda_d\) | 16 | 16 | 336 | -144 | 51 | 1131 |
| \(\lambda_m\) | 16 | 16 | 408 | -96 | 53 | 1157 |

The first four entries reproduce and extend the wave-2 audit. For three identical generations the fermionic coefficients scale by three. Normalization changes rescale columns but do not change the conclusion: both rays are locally anomalous, and each has a matched Wess–Zumino completion.

The two rays also violate the four ordinary Yukawa relations. A single Higgs charge cannot repair either ray. Allowing powers of a charged order parameter \(\Phi\) repairs them only by choosing four operator powers proportional to the already known violation vector. That is a Froggatt–Nielsen-like encoding of the selected ray, not a derivation of it.

## 3. Global anomalies

The Standard-Model Witten \(SU(2)\) anomaly is absent: per generation there are three coloured quark doublets and one lepton doublet, hence four left-handed doublets. The two source rays change charges but not this parity.

For connected Standard-Model gauge groups extended by additional \(U(1)^m\) factors, Davighi, Gripaios and Lohitsiri find no new global anomaly beyond the familiar possibilities already controlled by the Standard-Model global form; see [*Global anomalies in the Standard Model(s) and Beyond*](https://arxiv.org/abs/1910.11277). Therefore, under the declared connected group and unchanged quotient assumptions, the new \(U(1)_X\) supplies no torsion condition capable of seeing the \(\mathbb{CP}^2\) orientation.

This statement has a boundary. If the UV model changes the global gauge-group quotient, leaves a discrete remnant, or introduces new pseudoreal multiplets, that specific model requires a new bordism/discrete-anomaly audit. Such a change is additional structure and could constrain charges. It still cannot see a scalar multiplicity-space basis unless that basis is tied to the new group action.

## 4. Orientation-blindness theorem

### Theorem

Let \(V\cong\mathbb C^3\) be the broken-phase mediator multiplicity space and let \(P\) be a rank-two safe projector. Suppose a connected gauge factor acts as

\[
X_V=x_sP+x_d(1-P),\qquad x_s\ne x_d.
\]

Let the Standard-Model fermion charges be either \(\lambda_d\) or \(\lambda_m\). Assume anomaly cancellation is imposed through chiral matter and/or local Wess–Zumino terms, and no source-to-mediator intertwiner is supplied. Then anomaly cancellation cannot select the point \(P\in\mathbb{CP}^2\), nor can it pair one of the two rays uniquely with that point.

### Proof

Every local chiral anomaly coefficient is a trace of products of gauge generators over chiral fermion representations. The exceptional mediator is bosonic, so it contributes no chiral anomaly. Even if fermionic copies transform with the same \(2+1\) character split, the relevant invariants are

\[
\operatorname{tr}(X_V^n)=2x_s^n+x_d^n.
\]

For every \(U\in U(3)\), replacing \(P\) by \(UPU^\dagger\) conjugates \(X_V\) and leaves all such traces unchanged. The orbit of rank-two projectors is

\[
U(3)/(U(2)\times U(1))\cong\mathbb{CP}^2.
\]

The anomaly equations therefore factor through the eigenvalue multiplicities and are constant on this orbit. The Standard-Model ray label changes some anomaly coefficients, but there is no equation containing both that label and the orientation of \(P\). Hence no correlation follows. ∎

The certificate exhibits two distinct rational projectors and verifies equality of \(\operatorname{tr}(X_V^n)\) for \(n=1,2,3,4\).

## 5. Counterterm and threshold dichotomy

Let \(v\in\mathbb C^3\) collect the same-charge broken-phase triplet mediators. For one complex order parameter \(\Phi\), the neutral modulus permits

\[
|\Phi|^2 v^\dagger A v
\]

for a generic Hermitian \(A\). Without a pre-existing character split, this is an allowed renormalizable counterterm and generically

\[
[A,P]\ne0.
\]

It rotates the selected plane and produces safe-danger propagation after heavy fields are integrated out.

If instead \(x_s\ne x_d\) has already been assigned, gauge invariance forces allowed quadratic counterterms to commute with \(X_V\), hence with \(P\). The Schur complement and inverse heavy propagator then remain block diagonal. This is genuine radiative and threshold protection—but its generator was defined using

\[
X_V=x_sP+x_d(1-P).
\]

So the same construction that protects the plane presupposes its orientation.

This yields a strict dichotomy:

| smallest single-source construction | orientation | thresholds |
|---|---|---|
| one common mediator character | not inserted, but unselected | generic allowed counterterms misalign \(P\) |
| distinct safe/danger characters | inserted into \(X_V\) | \(P\) is protected |

There is no third case in which one abelian character both discovers the plane and then protects it.

## 6. Larger finite triple

Replacing \(\mathbb C_{\rm safe}\oplus\mathbb C_{\rm danger}\) by

\[
M_2(\mathbb C)\oplus\mathbb C
\]

does canonically distinguish an abstract two-dimensional irreducible block from a one-dimensional block. It still does not fix their **relative embedding** in the Clebsch basis. Every conjugate representation

\[
\rho_U(a,b)=U\begin{pmatrix}a&0\\0&b\end{pmatrix}U^\dagger
\]

obeys the same abstract algebraic and spectral axioms, while its central rank-two projector ranges over \(\mathbb{CP}^2\). The Furey/Spin(10) source covectors provide the external frame relative to which these embeddings differ.

A finite Dirac operator can remove this freedom only by containing a cross-module map \(T\) whose kernel or spectral subspace is the desired safe plane. Then

\[
P=P_{\ker T}
\]

is derived from \(T\), but \(T\) itself is precisely the missing source-to-mediator intertwiner. Calling it a Dirac entry does not make it follow from the old finite data.

## 7. Smallest-model no-go

Under the following assumptions:

1. one of the two established ALP current rays;
2. one connected abelian source symmetry, with local anomaly cancellation by spectators or Green–Schwarz/Wess–Zumino terms;
3. the three-dimensional broken-phase mediator multiplicity space;
4. no pre-existing map between the current module and mediator multiplicity module;
5. all gauge-invariant counterterms and heavy thresholds are admitted;

there is no mechanism that uniquely correlates the ray label \(s\in\{d,m\}\) with the Clebsch-aligned rank-two projector \(P\).

If the abelian action does not contain \(P\), allowed counterterms move it. If the action contains \(P\), its orientation has been supplied. Anomaly cancellation is constant on the projector orbit in either case.

This is a no-go for **derivation by the smallest anomaly-completed source**, not for the existence of a UV model with the desired correlation.

## 8. Smallest way to reopen the branch

The minimal new datum is one equivariant cross-module operator

\[
T:\mathcal H_{\rm source}\longrightarrow V_{\rm mediator}
\]

subject to three tests:

1. its kernel or a nondegenerate spectral subspace equals the safe Clebsch plane;
2. the same algebraic construction chooses \(\lambda_d\) or \(\lambda_m\), rather than accepting a ray-specific coefficient by hand;
3. every symmetry-allowed counterterm is a function of \(T^\dagger T\), so the relation is radiatively stable.

An exchange multiplet, nonabelian family/source algebra, or a represented finite one-form could supply such a \(T\). But unless its entries are derived from an already independent Jordan/Furey operation, it is exactly the fitted orientation datum identified here.

## 9. Verdict table

| branch | ray selection | projector selection | protection | verdict |
|---|---|---|---|---|
| global derivative ALP | neither | none | shift symmetry only | both rays live |
| one-phase gauged Green–Schwarz source | neither | none | local gauge consistency | both complete; no physical ALP remains |
| two-phase gauged source | mixing-dependent | none | model-dependent | indeterminate; extra angle |
| anomaly-free spectators | charge-spectrum-dependent | none from anomalies | model-dependent | cannot correlate without a new tensor |
| \(U(1)_X\) with \(X_V=x_sP+x_dQ\) | neither | supplied, not derived | yes | protected superselection completion |
| \(M_2(\mathbb C)\oplus\mathbb C\) finite algebra | neither | abstract rank only | yes after embedding | relative \(\mathbb{CP}^2\) datum remains |
| finite triple with derived cross-map \(T\) | potentially | potentially | must be checked | only live reopening |

## 10. Stop condition

This branch should remain pinned unless an independently derived cross-module operator is produced. Adding further anomaly-cancelling fields, more abelian charges, or a larger abstract direct-sum algebra without such an operator increases model freedom but cannot change the orientation-blindness theorem.

