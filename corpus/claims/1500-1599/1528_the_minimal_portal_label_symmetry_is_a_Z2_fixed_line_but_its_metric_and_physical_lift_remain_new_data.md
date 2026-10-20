# The Minimal Portal-Label Symmetry Is a Z2 Fixed Line, but Its Metric and Physical Lift Remain New Data

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact finite-symmetry exhaustion and minimal formal construction; physical Ward identity, portal metric and radiative stability remain open

**Depends on:** [the complex Schur null-cone classification](1513_three_Schur_packets_admit_a_nonaligned_complex_or_indefinite_null_cone_but_two_packets_do_not.md), [the Spin/Jordan multiplicity no-go](1518_the_available_Jordan_Spin23_data_force_multiplicity_one_only_by_reopening_the_Sp6_mixed_relation.md), [the coefficient-line sewing result](1521_no_carrier_operator_can_safely_sew_the_typed_wheels_but_one_coefficient_line_can.md), and [the physical common-line source audit](1525_no_sourced_scalar_supplies_the_common_portal_line_so_the_minimal_new_datum_is_an_enforced_dimension_zero_coupling_object.md)

**Evidence:** [portal-label symmetry exhaustion](../../../evidence/data/spin23-portal-label-symmetry-minimality.json) and [executable verifier](../../../verification/verify/verify_spin23_portal_label_symmetry_minimality.mjs)

## Result

There is an exact smallest **formal** object that reduces the two independent
portal coefficients to one line without adding a Pati--Salam scalar or a
finite-carrier arrow.  Let

\[
E=\mathbb C e_D\oplus\mathbb C e_M
\]

be the coefficient space of the selected Dirac and selected-null Majorana
invariant operators.  Give the named basis its canonical equal Hermitian
metric and let the nontrivial element of \(\mathbb Z_2\) exchange its labels:

\[
P=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Then

\[
E^{\mathbb Z_2}=\ker(P-1)=\mathbb C(1,1),
\]

so an invariant interaction has

\[
\boxed{(k_D,k_M)=\Lambda(1,1).}
\]

The signed exchange \(-P\) instead fixes \((1,-1)\).  This is the smallest
nontrivial group and, among signed permutations of the two canonical labels,
the only kind whose fixed line has both components nonzero.

This is a real construction and is compatible with \(J\) and CP.  Because
it acts only on the two-dimensional space of already invariant operator
labels, it does not insert a new block in the finite Dirac operator:

\[
X_DX_M=X_MX_D=0
\]

remains unchanged.  Thus it adds neither a forbidden one-arrow carrier nor
mixed \(I\)-\(N\) support.

The limitation is equally exact.  A general desired ray
\((1,\kappa)\) can be fixed by

\[
R_\kappa=
\begin{pmatrix}
0&\kappa^{-1}\\
\kappa&0
\end{pmatrix},
\qquad R_\kappa^2=1,
\]

but \(\kappa\) has now been written into the generator.  With the canonical
metric, \(R_\kappa\) is unitary only when \(|\kappa|=1\); on a real CP slice
this leaves \(\kappa=\pm1\).  An arbitrary magnitude ratio therefore needs a
new portal metric or normalized correspondence.  The symmetry repackages
that datum; it does not derive it.

## 1. Exact signed-permutation exhaustion

The canonical named-label problem has eight real signed permutation
matrices.  Six are involutions.  Their fixed spaces are:

\[
\begin{array}{c|c|c}
\text{generator}&\dim\ker(g-1)&\text{result}\\ \hline
+1&2&\text{no constraint}\\
-1&0&\text{both coefficients vanish}\\
\operatorname{diag}(1,-1)&1&k_M=0\\
\operatorname{diag}(-1,1)&1&k_D=0\\
+P&1&(k_D,k_M)=\Lambda(1,1)\\
-P&1&(k_D,k_M)=\Lambda(1,-1).
\end{array}
\]

The two remaining signed permutations square to \(-1\), not \(+1\), and
are not \(\mathbb Z_2\) actions.  Therefore:

\[
\boxed{
\text{up to sign and relabelling, exchange is the unique minimal canonical
involution retaining both portals.}}
\]

The trivial group leaves two parameters.  Hence group order two is also
minimal, not merely sufficient.

## 2. A weighted reflection selects any ray but predicts none

For every nonzero \(\kappa\), \(R_\kappa\) above fixes exactly
\(\mathbb C(1,\kappa)\).  Algebraically this solves the coefficient-line
problem.  Predictively it is circular unless independent geometry supplies
\(R_\kappa\): changing \(\kappa\) changes the symmetry representation.

The standard metric exposes this boundary:

\[
R_\kappa^\dagger R_\kappa=1
\quad\Longleftrightarrow\quad
|\kappa|=1.
\]

One may instead choose a weighted metric making \(R_\kappa\) unitary.  That
metric contains the same ratio.  Thus a bare \(\mathbb Z_2\) derives the
equal-magnitude ray only after the portal basis and its equal normalization
have been physically justified.

## 3. U(1) supplies no stronger mechanism

A diagonal circle action on the named labels has characters

\[
\rho(\theta)=
\operatorname{diag}(e^{iq_D\theta},e^{iq_M\theta}).
\]

Its fixed dimension is the number of zero charges.  If both charges are
nonzero, it fixes no coefficient.  If both vanish, it fixes all of
\(E\).  If exactly one vanishes, it retains only one portal.  The standard
real rotation representation also has no nonzero fixed vector.

A representation conjugate to \(1\oplus\chi_q\) can be arranged to have a
mixed fixed line, but its conjugating matrix already specifies that line and
therefore \(\kappa\).  It is a continuous enlargement of the same input,
not a more predictive construction.

## 4. A real common line and CP do not choose its angle

A dimension-zero real-line object is simply a map

\[
\iota:\mathbb R\longrightarrow\mathbb R^2,
\qquad
\Lambda\longmapsto\Lambda(a,b).
\]

It enforces the desired one-parameter family once \((a,b)\) is supplied.
Even after \(a^2+b^2=1\), a continuum of projective rays remains.  CP makes
the embeddings real but does not choose their angle.  Canonical exchange is
the additional datum that reduces the choice to

\[
(a,b)=2^{-1/2}(1,\pm1).
\]

## 5. Frobenius language packages the same Z2

The two portal labels form the two-point special commutative dagger-Frobenius
algebra

\[
A=\mathbb C e_D\oplus\mathbb C e_M,
\quad
e_i e_j=\delta_{ij}e_i,
\quad
\eta(1)=e_D+e_M,
\quad
\Delta(e_i)=e_i\otimes e_i.
\]

Its nontrivial algebra automorphism exchanges the two primitive idempotents.
The automorphism-fixed subalgebra is exactly

\[
A^{\mathbb Z_2}=\mathbb C(e_D+e_M).
\]

This gives an elegant intrinsic description of the equal-coefficient line:
it is the unit line of the two-point algebra.  But the Frobenius algebra by
itself admits every element \(k_De_D+k_Me_M\).  The restriction to the
exchange-fixed subalgebra does the work.  Frobenius structure is therefore
an equivalent packaging of the \(\mathbb Z_2\), not an independent cause.

## 6. Natural transformation gives the exact missing datum

Regard the two one-dimensional coefficient spaces as functors or modules
\(L_D\) and \(L_M\).  A natural isomorphism between them has a component

\[
\eta_{DM}:L_D\to L_M,
\qquad z\longmapsto\kappa z.
\]

Naturality against scalar endomorphisms is automatic, since scalars commute.
It does not fix \(\kappa\).  Once \(\eta_{DM}\) is specified, compatible
endomorphism pairs obey

\[
\eta_{DM}\mu_D=\mu_M\eta_{DM}
\quad\Longrightarrow\quad
\mu_D=\mu_M,
\]

and their equalizer is one-dimensional.  Unitarity restricts
\(|\kappa|=1\); CP restricts a real normalized component to
\(\kappa=\pm1\).  Thus the natural-transformation formulation isolates the
precise missing datum: a physically sourced normalized correspondence
between the two invariant-operator lines.

## 7. J and CP compatibility

The matrices \(P\) and \(-P\) are real, so they commute with coefficient
conjugation.  The label action can be duplicated on the \(J\)-conjugate
operator pair.  It neither identifies a particle--particle arrow with a
particle--conjugate defect nor changes how \(J\) acts on their carrier
states.

Accordingly, \(J\) and CP do not obstruct the formal fixed line.  They also
do not generate it.  CP removes a phase and permits a relative sign; it does
not determine a noncanonical magnitude ratio.

## 8. Why this adds no forbidden carrier

The exchange is deliberately a symmetry of **operator labels after gauge
contraction**, not an exchange of fundamental fields.  The original Dirac
and Majorana support matrices remain disjoint, so no mixed matrix element is
introduced.

Promoting the same symbol to a carrier-space exchange would be a different
construction and fails the existing exact tests.  Claim 1525 gives

\[
\operatorname{Hom}_{G_{PS}}(R_D,R_M)=0
\]

for the sourced scalar carriers.  Claim 1521 shows that an unrestricted
cross-anchor sewing of the finite supports generates \(M_4\) and is odd on
the relation sheet.  The safe label symmetry cannot be silently interpreted
as either forbidden lift.

## 9. Coefficient equality is not yet a physical mass ray

Even when the normalized operator coefficients obey

\[
k_D=k_M=\Lambda,
\]

the physical entries have the form

\[
d=\Lambda c_Dv_HZ_D,
\qquad
y=\Lambda c_Mv_SZ_M,
\]

where \(c\) may contain Clebsch factors, \(v\) vacuum expectation values and
\(Z\) kinetic or matching normalization.  The label \(\mathbb Z_2\) fixes a
mass ray only if these factors are included in a physically defined common
portal metric or are related by an additional identity.

Therefore the formal result must not be overstated as a Dirac--Majorana mass
prediction.

## 10. Minimality theorem and reopening datum

The exhaustion proves:

\[
\boxed{
\begin{minipage}{0.86\linewidth}
On the canonical orthonormal two-label portal space, the unique smallest
finite symmetry whose fixed space is one-dimensional and supported on both
labels is the exchange \(\mathbb Z_2\), up to a relative sign.  Its fixed
line can equivalently be described as the exchange-fixed unit line of the
two-point dagger-Frobenius algebra or as the equalizer of a specified
normalized natural isomorphism.  It acts without adding carrier support.
An arbitrary ray, its physical normalization and its ultraviolet lift are
additional data.
\end{minipage}}
\]

The exact reopening datum is a sourced ultraviolet Ward identity or operator
duality that:

1. acts as exchange on the two **normalized invariant-operator lines**;
2. commutes with gauge action, grading, \(J\) and CP without becoming a
   carrier intertwiner;
3. fixes the portal metric and vacuum/matching normalization; and
4. is preserved by counterterms, so the common line is radiatively tangent.

Until such a datum is supplied, the \(\mathbb Z_2\) is the minimal exact
ansatz, not a derived symmetry of the sourced Spin(2,3)/Jordan model.

## Boundary

This claim proves a representation-theoretic minimality statement on the
two-dimensional coefficient-label space.  It does not assert that the
Dirac and Majorana fields are exchanged, that their Pati--Salam
representations become equivalent, that their vacuum expectation values are
equal, or that the fixed line is stable under renormalization.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_portal_label_symmetry_minimality.mjs
```

The verifier enumerates all signed-permutation involutions, checks their
fixed dimensions and support, tests weighted-reflection unitarity, exhausts
the diagonal \(U(1)\) cases, verifies the two-point Frobenius algebra and its
exchange automorphism, checks the natural-transformation equalizer, confirms
the common-ray minors, and verifies that the disjoint carrier products remain
zero.
