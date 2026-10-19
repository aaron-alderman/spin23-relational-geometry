# No (U(3))-covariant effective action of one projector can select its orientation, so closure requires a second family tensor

## Main result

A primitive projector \(P\), its generator

\[
X=I-3P,
\]

the determinant-neutral line twist, and their gauge/topological fields cannot by themselves dynamically choose an orientation of \(P\) in family space.

There are two equivalent proofs.

1. \(U(3)\) acts transitively on the rank-one projector orbit \(\mathbb{CP}^2\). Any \(U(3)\)-invariant effective action \(\Gamma[P]\) is therefore constant on that orbit.
2. Any conjugation-equivariant Hermitian response operator constructed from \(P\) alone must have the form

   \[
   \mathcal R[P]=\alpha P+\beta Q.
   \]

   It commutes with \(P\) identically and has no cross-Peirce component capable of orienting the projector.

Thus the return equation

\[
[P,\mathcal R[P]]=0

\]

is automatically satisfied but dynamically empty when \(\mathcal R\) contains no second family tensor.

Reflexive closure therefore requires at least one additional noncommuting family-covariant object:

\[
M\in\operatorname{Herm}_3(\mathbb C),
\qquad
[M,P]\not\equiv0.
\]

Candidates include a Yukawa bilinear, Majorana response, fermion condensate, family-resolved boundary self-energy, or another dynamical Jordan element. Pure universal stress-energy cannot supply this object before family distinction already exists.

## 1. Orbit proof

The set of Hermitian rank-one projectors in \(\mathbb C^3\) is

\[
\mathcal O
=\{UP_0U^\dagger:U\in U(3)\}
\cong\mathbb{CP}^2.
\]

Let \(\Gamma[P]\) satisfy conjugation invariance:

\[
\Gamma[UPU^\dagger]=\Gamma[P]
\qquad
\text{for all }U\in U(3).
\]

Given any two rank-one projectors \(P_1,P_2\), there is a unitary \(U\) such that

\[
P_2=UP_1U^\dagger.
\]

Therefore

\[
\Gamma[P_2]=\Gamma[P_1].
\]

Hence

\[
\boxed{
\Gamma|_{\mathbb{CP}^2}=\text{constant}.
}

No potential built only from the conjugacy invariants of a rank-one projector can orient it. Indeed,

\[
\operatorname{Tr}(P^n)=1
\]

for every positive integer \(n\), so all polynomial class functions of one projector are constant.

## 2. Stabilizer/Schur proof

Fix \(P\). Its stabilizer is

\[
H=U(1)\times U(2)

\]

up to the appropriate determinant quotient. Suppose the response is equivariant:

\[
\mathcal R[UPU^\dagger]
=U\mathcal R[P]U^\dagger.
\]

For any \(h\in H\),

\[
hPh^\dagger=P,
\]

so equivariance gives

\[
\mathcal R[P]=h\mathcal R[P]h^\dagger.
\]

Thus \(\mathcal R[P]\) lies in the commutant of the stabilizer action. The selected line and complementary plane are irreducible inequivalent \(H\)-modules, so Schur’s lemma gives

\[
\boxed{
\mathcal R[P]=\alpha P+\beta Q.
}

Consequently

\[
[P,\mathcal R[P]]=0

\]

for every \(P\), and

\[
Q\mathcal R[P]P=0.
\]

There is no cross-Peirce force.

## 3. Gauge and projector loops do not evade the theorem

The relative generator

\[
X=I-3P

\]

is a polynomial in \(P\). Any gauge contribution depending only on \(X\), its fixed spectrum, and invariant traces is therefore still a class function on the projector orbit.

For example,

\[
\operatorname{Tr}(X^2)=6,
\qquad
\operatorname{Tr}(X^3)=-6

\]

are independent of the orientation of \(P\). A Coleman–Weinberg potential produced by fields whose only family dependence is through the spectrum of \(X\) can alter radial couplings or vacuum scales but cannot distinguish one projector direction from another.

Likewise, the projector curvature

\[
-i\operatorname{Tr}(XDP\wedge DP)

\]

controls textures and topological sectors but does not generate a local zero-derivative orientation potential on a homogeneous vacuum.

## 4. The link field refines the frame but does not select an absolute orientation

A nonzero cross-Peirce link

\[
S\in\operatorname{Hom}(L,Q)\otimes R^3

\]

selects a second projector inside \(Q\) and completes \(P\) to a full Jordan frame. But a fully \(U(3)\)-invariant action for the joint configuration \((P,S)\) remains invariant under simultaneous rotation of the entire frame.

Norm-only link potentials also leave the internal direction manifold

\[
\mathbb{CP}^1.

\]

Thus the link solves frame completion but not response orientation. A second tensor is still required to determine the relative alignment and gap its directional modes.

## 5. Minimal addition of a second Hermitian tensor

Let

\[
M=M^\dagger

\]

transform covariantly:

\[
M\mapsto UMU^\dagger.

\]

The lowest-order nonconstant invariant coupling is

\[
V(P;M)=-\kappa\operatorname{Tr}(PM).

\]

For fixed \(M\), minimizing over rank-one \(P\) is the Rayleigh–Ritz problem. If \(\kappa>0\), the minimum selects the largest eigenvalue of \(M\); if \(\kappa<0\), it selects the smallest.

The response is

\[
\mathcal R=-\kappa M,

\]

and the stationarity equation becomes

\[
[P,M]=0.

\]

For a simple eigenvalue,

\[
P=\Pi_i(M).

\]

The Hessian along a variation mixing the selected eigenvector \(i\) with another eigenvector \(j\) is proportional to

\[
|\lambda_i-\lambda_j|.

\]

Thus eigenvalue gaps are precisely the masses of projector-orientation fluctuations.

## 6. General invariant expansion with response tensors

Given one or more Hermitian family tensors \(M_a\), the effective projector potential can contain

\[
\Gamma[P;M_a]
=c_0
+\sum_a c_a\operatorname{Tr}(PM_a)
+\sum_{a,b}c_{ab}\operatorname{Tr}(PM_aPM_b)
+\cdots.

\]

Because \(P\) has rank one,

\[
PM_aP=\operatorname{Tr}(PM_a)P,

\]

so many higher invariants reduce to products of expectation values

\[
\langle M_a\rangle_P:=\operatorname{Tr}(PM_a).

\]

The response takes the form

\[
\mathcal R[P]
=\sum_a C_a(P,M)M_a
+\text{terms proportional to }P,Q.

\]

Only the parts involving tensors not reducible to functions of \(P\) can generate a nonzero cross-Peirce force.

## 7. Why universal stress-energy is not enough

The ordinary spacetime metric couples universally to the total stress-energy tensor:

\[
T_{\mu\nu}
=\sum_iT^{(i)}_{\mu\nu}
+T^{\mathrm{gauge}}_{\mu\nu}
+\cdots.

\]

The physical metric carries no family indices. Varying the generating functional with respect to it produces a family trace, not a Hermitian family matrix.

If the family sectors are otherwise degenerate, stress-energy correlations remain invariant under family conjugation and cannot select \(P\). To obtain a family-valued response from stress data one must introduce a family-resolved source or insertion. But that insertion is already a second family tensor.

Therefore:

\[
\boxed{
\text{universal stress-energy can read out an existing family distinction but cannot create one from a completely symmetric vacuum.}
}

This constrains the original \(A\,X\,B\) intuition. The middle operation may transport or feed back a distinction, but two family-blind stress tensors cannot generate its orientation ex nihilo.

## 8. Candidate sources of the second tensor

### Yukawa bilinears

For a Yukawa map \(Y\), the Hermitian combinations

\[
YY^\dagger,
\qquad
Y^\dagger Y

\]

provide natural response tensors on the corresponding left- or right-handed family bundles.

**Advantage:** already present and manifestly capable of producing a simple spectrum.

**Cost:** if Yukawas are fixed spurions, the family orientation and hierarchy remain input.

### Majorana response

A right-handed-neutrino Majorana matrix \(M_R\) supplies

\[
M_RM_R^\dagger

\]

as a Hermitian tensor and may transmit selection through the seesaw.

**Advantage:** directly connected to the previously required right-handed neutrinos and exceptional family structure.

**Cost:** its origin and spectrum remain unexplained unless dynamically generated.

### Fermion condensate or self-energy

A matrix-valued two-point function

\[
\Sigma_{ij}(p)

\]

can provide a dynamical Hermitian response.

**Advantage:** could make the selection genuinely self-consistent through a gap equation.

**Cost:** no established interaction in the current minimal model is known to generate the required family-nondegenerate condensate.

### Boundary/defect response

A family-resolved defect self-energy or topological coupling could define \(M_\partial\).

**Advantage:** directly closes the bulk-to-boundary-to-bulk loop.

**Cost:** pure BF theory is topological and family-blind unless charged defect matter or lifted module data are included.

### Additional dynamical Jordan element

Introduce a second field

\[
M(x)\in H_3(\mathbb C)

\]

whose eigenframe selects \(P\).

**Advantage:** mathematically minimal.

**Cost:** risks moving the unexplained selection from \(P\) into \(M\).

## 9. Fixed spurion versus reflexive closure

If \(M\) is fixed externally, then

\[
P=\Pi_i(M)

\]

is a perfectly consistent selection mechanism but not full reflexive closure. The programme has explained how the selected projector responds to \(M\), not why \(M\) has its spectrum.

Full closure requires a coupled system:

\[
\begin{aligned}
[P,\mathcal R_P(P,M)]&=0,\\
\frac{\delta\Gamma(P,M)}{\delta M}&=0,
\end{aligned}

\]

with a stable joint solution and no manually inserted nondegenerate family matrix.

The realistic intermediate target is **relative closure**:

> Given the empirically existing Yukawa/Majorana tensors, show that the rank split, charge-three link, finite quotient, and defect response are uniquely and stably determined.

Absolute closure additionally requires a theory of the Yukawa/Majorana tensors themselves.

## 10. Updated closure tree

The branch structure is now:

### Branch A: empirical-Yukawa closure

Use measured Yukawa tensors as fixed response data. Determine whether they select a unique stable rank split and gap all link directions. This can close the effective Standard Model programme but not derive flavour.

### Branch B: Majorana/seesaw closure

Test whether the neutrino sector dynamically selects the projector and transmits it to charged fermions.

### Branch C: condensate/gap-equation closure

Seek a self-consistent matrix self-energy satisfying

\[
M=\mathcal F(P,M),
\qquad
P=\Pi_i(M).

\]

### Branch D: boundary-feedback closure

Include faithful charged defect matter, calculate its family-valued effective action, and test whether its response selects the bulk projector while remaining gapped.

### Branch E: absolute symmetry/no-go

If no second tensor is admitted and the action remains exactly \(U(3)\)-invariant, orientation selection is impossible. This branch is closed by the orbit theorem.

## 11. Consequence for programme claims

The programme may now state rigorously:

1. rank and relative weights are derived from the primitive idempotent and determinant neutrality;
2. charge three and the BF level follow from the cross-Peirce line twist and Higgs duality;
3. a full Jordan frame follows from a nonzero cross-Peirce link;
4. orientation and spectral hierarchy do **not** follow from \(P\) alone;
5. any claimed self-selection must exhibit the second family tensor and derive its dynamics.

This is a productive no-go. It prevents the return map from becoming circular: one may not define \(\mathcal R[P]\) using only \(P\), observe that it commutes with \(P\), and call that self-selection.

## 12. Next decisive calculation

The next tractable branch is empirical-Yukawa closure:

1. identify the common family bundles on which the Standard Model Yukawa combinations act;
2. construct every basis-covariant Hermitian response tensor available from \(Y_u,Y_d,Y_e,Y_\nu,M_R\);
3. determine whether any canonical positive combination has a robust simple spectrum;
4. compare its spectral projectors with the anomaly-free \(B-3L_i\) directions;
5. calculate the resulting projector and link-direction Hessians;
6. record exactly which coefficients remain underived.

If no canonical combination exists, effective closure remains nonunique. If one is selected by the same action that produces the link and defect, the loop advances substantially.

