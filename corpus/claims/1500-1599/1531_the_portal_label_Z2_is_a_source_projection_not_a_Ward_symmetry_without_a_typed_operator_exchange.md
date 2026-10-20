# The Portal-Label Z2 Is a Source Projection, Not a Ward Symmetry, Without a Typed Operator Exchange

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact action-level no-go for local field-induced symmetry; a new enlarged-field realization or full nonlocal duality remains open

**Depends on:** [the cross-anchor carrier-sewing no-go](1521_no_carrier_operator_can_safely_sew_the_typed_wheels_but_one_coefficient_line_can.md), [the physical common-line source audit](1525_no_sourced_scalar_supplies_the_common_portal_line_so_the_minimal_new_datum_is_an_enforced_dimension_zero_coupling_object.md), and [the minimal label-space Z2](1528_the_minimal_portal_label_symmetry_is_a_Z2_fixed_line_but_its_metric_and_physical_lift_remain_new_data.md)

**Evidence:** [Ward-identity audit](../../../evidence/data/spin23-portal-z2-ward-identity-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_portal_z2_ward_identity_audit.mjs)

## Result

The claim-1528 exchange \(\mathbb Z_2\) is an exact projector on the formal
two-source space, but it is **not** a Ward symmetry of the completed sourced
Pati--Salam action.

Write the two interactions as

\[
S_{\rm int}=k^TO+\mathrm{h.c.},
\qquad
k=\begin{pmatrix}k_D\\k_M\end{pmatrix},
\qquad
O=\begin{pmatrix}\mathcal O_D\\\mathcal O_M\end{pmatrix}.
\]

If a transformation acts by

\[
k\mapsto Bk,
\qquad
O\mapsto AO,
\]

then off-shell invariance for arbitrary sources and operator insertions is
equivalent to

\[
\boxed{B^TA=1.}
\]

For the source exchange

\[
B=P=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

this equation forces

\[
\boxed{A=P.}
\]

Thus a genuine source-exchange symmetry must also exchange the two typed
operators.  The sourced field theory has no such transformation.  The Dirac
and Majorana monomials have inequivalent constituent representations,
family dressings, finite supports and particle/conjugate gradings.  The
field-induced action on their typed span is block diagonal, while the needed
matrix is off diagonal.

At \(k_D=k_M\), source exchange leaves the numerical vector fixed.  That
does not rescue the Ward identity: the transformation then acts trivially on
the source value and supplies neither a transformation of dynamical fields
nor a reason the theory must be chosen on that locus.  Equality remains a
restriction on theory space.

The strongest conclusion is therefore

\[
\boxed{
\text{label }\mathbb Z_2
=\text{ exact source-space ansatz}
\ne\text{ sourced non-anomalous Ward symmetry}.}
\]

## 1. Source covariance forces contragredient operator covariance

Under \((B,A)\), the interaction becomes

\[
S_{\rm int}'=k^TB^TAO+\mathrm{h.c.}
\]

so \(B^TA=1\) is both necessary and sufficient.  This elementary equation
separates three notions that can otherwise be conflated:

1. an exact internal symmetry transforms dynamical fields while the fixed
   numerical couplings label the same theory;
2. a spurionic symmetry transforms external sources contragrediently to an
   actually realized operator action; and
3. a duality maps the whole theory, including its operator algebra and
   parameter point, to an isomorphic theory.

A swap of source coordinates with \(A=1\) gives

\[
B^TA=P\ne1.
\]

It is not an invariance of the source-coupled action.  Formally swapping both
\(k\) and \(O\) works because \(P^TP=1\), but this is physical only if the
operator swap is induced by a transformation of the field algebra.

## 2. Exact qualification of the Hom obstruction

Both completed monomials are Lorentz scalars, gauge-contracted singlets and
have canonical dimension four:

\[
\mathcal O_D=L_PH\nu_P^c,
\qquad
\mathcal O_M=S_{-3}\nu_P^c\nu_N^c.
\]

Consequently, if all typing is forgotten, their one-dimensional spans are
both copies of the trivial gauge representation.  An abstract linear map
between those two singlet lines certainly exists.  It would be imprecise to
claim otherwise.

The actual obstruction is stronger and more relevant: the map must be
induced by an invertible local transformation of the constituent fields
that preserves the gauge action, kinetic terms, finite grading and real
structure.  With this typing retained, the two complexes differ in:

\[
\begin{array}{c|c|c}
&\mathcal O_D&\mathcal O_M\\ \hline
\text{scalar carrier}&\text{Pati--Salam bidoublet}&\text{singlet/triplet dressing}\\
\text{family dressing}&0&-3\\
\text{finite support}&\text{particle--particle arrow}&\text{particle--conjugate defect}\\
\text{vacuum factor}&v_H&v_S.
\end{array}
\]

Claims 1521 and 1525 establish that the required carrier intertwiner is
absent.  Hence the field-induced action on the typed operator span has the
form

\[
A=\operatorname{diag}(a_D,a_M),

\]

not \(P\).  No such diagonal \(A\) satisfies \(P^TA=1\).

## 3. An ordinary internal symmetry cannot enforce the equality

For an internal symmetry, the numerical couplings do not transform.  A
diagonal field action sends

\[
\mathcal O_D\mapsto a_D\mathcal O_D,
\qquad
\mathcal O_M\mapsto a_M\mathcal O_M.
\]

With both coefficients nonzero and the two operators independent,
invariance requires \(a_D=a_M=1\), or corresponding already-cancelled field
phases within each monomial.  This statement does not compare \(k_D\) and
\(k_M\).  Separate invariance of two monomials permits two separate
coefficients.

Only an operator exchange could make equality of their coefficients the
condition for invariance.  That is precisely the missing transformation.

## 4. The equal-source point is not a Ward identity

If

\[
k=\Lambda(1,1),

\]

then \(Pk=k\).  A source-only swap consequently leaves the chosen numerical
point unchanged even while it leaves the operators untouched.  But the
resulting action on every dynamical variable is the identity.  Its Ward
identity is the tautology \(0=0\); it cannot forbid the orthogonal deformation

\[
\delta k=\epsilon(1,-1).

\]

Selecting the fixed locus is therefore a projection or ansatz.  Fixed-point
language does not turn it into a dynamical symmetry.

## 5. Exact symmetry, spurion and duality classification

### Exact internal symmetry

No local field-induced exchange exists in the current spectrum.  Diagonal
field phases do not relate the two coefficients.  The exchange is excluded
as an internal Ward symmetry under the stated typing assumptions.

### Spurionic symmetry

A genuine spurionic symmetry would transform sources contragrediently to a
realized operator transformation.  The formal pair

\[
(k,O)\mapsto(Pk,PO)

\]

does preserve \(k^TO\), but \(O\mapsto PO\) has no field lift.  It is an
abstract relabelling of two terms, useful for organizing parameter space but
not a Ward identity of the sourced model.

### Duality

A duality need not be a local linear field symmetry, so the local Hom
obstruction does not logically exclude every imaginable nonlocal or
strong/weak correspondence.  It does raise the required standard of proof.
A duality must map states, correlators, operator products, kinetic terms,
thresholds and vacua, not just exchange two coefficient symbols.  No such
map is currently supplied.

## 6. The anomaly question is downstream of the classical failure

Calling the source swap non-anomalous would be premature.  An anomaly asks
whether the quantum measure preserves a nontrivial classical transformation
of dynamical fields.  Here no such field transformation has been defined.

The permutation matrix has determinant \(-1\), hence unit determinant
magnitude, on the two-dimensional **external source** space.  Those sources
are not integrated fermionic variables.  Their Jacobian says nothing about
a gauge, mixed or gravitational anomaly.

Therefore the exact status is:

\[
\boxed{
\text{the proposal fails before anomaly testing; it is neither proved
anomalous nor proved non-anomalous}.}
\]

## 7. Thresholds, VEVs and normalization conjugate the exchange

Collect all Clebsch, vacuum, wavefunction and threshold factors into

\[
T=\operatorname{diag}(t_D,t_M),
\qquad
t_D=c_Dv_HZ_D,
\qquad
t_M=c_Mv_SZ_M.
\]

An equal ultraviolet source gives

\[
k_{\rm IR}=Tk
=\Lambda(t_D,t_M).
\]

The canonical exchange survives matching only when

\[
TP=PT
\quad\Longleftrightarrow\quad
t_D=t_M.
\]

Otherwise its conjugate action is

\[
P_{\rm IR}=TPT^{-1}
=\begin{pmatrix}
0&t_D/t_M\\
t_M/t_D&0
\end{pmatrix}.
\]

This is exactly the weighted reflection of claim 1528.  It fixes the
weighted ray \((t_D,t_M)\), but its generator now contains the threshold
ratio it was meant to explain.

A physical exchange would additionally have to map the scalar potential and
the vacuum.  The sourced bidoublet and Majorana dressing have independent
potentials and inequivalent representations.  No identity imposing
\(c_Dv_HZ_D=c_Mv_SZ_M\) is present.

## 8. Renormalization requires tangency, not merely a UV equality

Let

\[
F(k)=k_D-k_M.
\]

The equality line is preserved by renormalization only if

\[
\left.(\beta_D-\beta_M)\right|_{F=0}=0.
\]

For multiplicative running,

\[
\beta_D=\gamma_Dk_D,
\qquad
\beta_M=\gamma_Mk_M,
\]

this requires \(\gamma_D=\gamma_M\) on the line.  Because no realized
exchange Ward identity relates the two operator renormalizations, the formal
label \(\mathbb Z_2\) supplies no protection.  This is not a claim that a
particular computed loop coefficient must differ; it is the exact statement
that equality is an additional condition to calculate and prove.

## 9. Strongest no-go and boundary

Assume:

1. an invertible local symmetry acts on the sourced fundamental fields;
2. it preserves Pati--Salam gauge action, Lorentz type, finite grading and
   \(J\);
3. the source-coupled action is invariant off shell; and
4. both portal interactions are nonzero.

Then no \(\mathbb Z_2\) Ward symmetry can act as
\(k_D\leftrightarrow k_M\).  Off-shell invariance forces
\(\mathcal O_D\leftrightarrow\mathcal O_M\), while the allowed field-induced
action on their typed span is block diagonal.

This theorem does not exclude an enlarged theory containing missing partner
fields, a fully constructed nonlocal duality, or a UV boundary relation that
is explicitly broken at thresholds.  It excludes calling the present
label-only projection a symmetry of the completed action.

## 10. Reopening datum

The gate reopens only with an explicit transformation of the dynamical field
algebra, or a full duality functor, that supplies all of the following:

1. a map of the normalized typed \(\mathcal O_D\) line to the
   \(\mathcal O_M\) line;
2. partner kinetic terms and compatible gauge, family, grading and
   \(J\)/CP actions;
3. invariance of the scalar potential and a map of the chosen vacuum;
4. a path-integral measure calculation establishing anomaly freedom;
5. threshold matching that intertwines the exchange; and
6. beta-function tangency to the fixed line.

Equivalently, the spectrum must be enlarged until the two full portal
complexes become isomorphic, after which anomaly cancellation and radiative
stability must still be proved.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_portal_z2_ward_identity_audit.mjs
```

The verifier checks the exact equation \(B^TA=1\), proves source-only swap
failure away from the fixed point, exhausts diagonal signed field actions,
distinguishes the trivial fixed-point action from a Ward constraint,
conjugates the exchange through unequal thresholds and tests the exact RG
tangency condition.
