# Equal-Charge Dirac and Majorana Relations Require a Parallel Sector Projector in the Minimal Module Connection

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact minimal module-connection theorem with exhaustive finite witness; origin and dynamics of the sector projector remain open

**Depends on:** [the commutant-carrier theorem](1500_commutant_projectors_preserve_the_null_mask_without_tensor_coordinates_but_cannot_generate_the_charge_three_inner_gauge_field.md), [the charged-bidoublet support identity](../1400-1499/1499_the_family_charged_bidoublet_is_exactly_the_forbidden_Dirac_cross_one_form_so_the_central_mask_closes_all_minimal_tree_leakage.md), and [the opposite-anchor sector split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

**Evidence:** [parallel-projector ledger](../../../evidence/data/spin23-parallel-sector-projector-module-connection.json) and [exhaustive verifier](../../../verification/verify/verify_spin23_parallel_sector_projector_module_connection.mjs)

## Result

The smallest generalized connection that joins the converged top-down and
bottom-up requirements needs one datum beyond the charge-three lift: a
parallel Dirac/Majorana sector projector.

Let the relation fiber be

\[
\mathcal R_3=\mathbb C e_D\oplus\mathbb C e_M,
\]

where \(e_D\) is the forbidden cross-family Dirac relation and \(e_M\) is the
desired Majorana sewing relation. Both have family charge three. Hence the
compact gauge generator is

\[
X_3=3I_{\mathcal R_3}.
\]

It follows immediately that

\[
[A,X_3]=0
\qquad\text{for every }A\in\operatorname{End}(\mathcal R_3).
\]

Gauge covariance alone therefore permits every Dirac--Majorana mixing term.
It cannot protect the null mask.

Introduce the Majorana-sector projector

\[
Z_M e_D=0,
\qquad
Z_M e_M=e_M.
\]

For a unitary connection \(\nabla=d+A\), the Majorana-only subbundle is
preserved if and only if

\[
\boxed{\nabla Z_M=0.}
\]

Equivalently, \([A,Z_M]=0\). The off-diagonal component of \(\nabla Z_M\) is
exactly the spurion that transports the allowed Majorana relation into the
forbidden Dirac relation.

## 1. Top down and bottom up meet at one obstruction

The top-down construction requires a local charge-three Majorana link. The
bottom-up closure requires the charge-three Dirac link to remain absent.
Since both links transform with the same character, neither the unique
anomaly-free compact lift nor ordinary charge conservation separates them.

This is a sharp no-go:

\[
\boxed{\text{equal charge implies that charge covariance cannot select the
Majorana channel}.}
\]

Any successful middle must retain an independent sector label.

## 2. The minimal middle

In the ordered basis \((e_D,e_M)\), write

\[
Z_M=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\qquad
A=\begin{pmatrix}A_D&B\\-B^\dagger&A_M\end{pmatrix}.
\]

Acting on a permitted section \((0,m)^T\) produces Dirac component \(Bm\).
Thus one-sided preservation is

\[
(I-Z_M)AZ_M=0.
\]

For an anti-Hermitian connection, taking the adjoint also gives
\(Z_MA(I-Z_M)=0\). Therefore

\[
(I-Z_M)AZ_M=0
\Longleftrightarrow
[A,Z_M]=0
\Longleftrightarrow
\nabla Z_M=0.
\]

The reality-paired charge-minus-three fiber carries the conjugate connection,
so the same projector criterion survives the real structure.

## 3. Exhaustive finite witness

The verifier enumerates every real symmetric generator

\[
K=\begin{pmatrix}a&b\\b&c\end{pmatrix},
\qquad a,b,c\in\{-1,0,1\},
\]

representing the unitary connection \(A=iK\). Of the 27 possibilities:

- all 27 commute with \(3I_2\) and are gauge-compatible;
- exactly 9 have \(b=0\), commute with \(Z_M\), and preserve the mask;
- the remaining 18 regenerate a Dirac component from a Majorana section.

Moreover,

\[
[K,Z_M]=\begin{pmatrix}0&b\\-b&0\end{pmatrix}.
\]

The leakage coefficient and failure of projector parallelism are therefore
literally the same number.

## 4. Fan upward: curvature and geometry

When \(\nabla Z_M=0\), the connection splits and so does its curvature:

\[
\mathcal R_3=\mathcal R_D\oplus\mathcal R_M,
\qquad
F_\nabla=F_D\oplus F_M.
\]

When \(\nabla Z_M\ne0\), its off-diagonal part is the second fundamental form
of the proposed splitting. It is not merely an arbitrary extra coupling: it
is the geometrical measure of failure of the null mask. This gives the next
calculational target—derive whether the generalized curvature action makes
that form vanish, massive, or radiatively unstable.

The sector projector also supplies the module-level counterpart of the
sector-dependent opposite anchor required by claim 1127. The two results now
meet at a single typed object rather than two unrelated rules.

## 5. Fan downward: effective operators

The off-diagonal form \(B\) is precisely the local carrier that can generate
the forbidden charged bidoublet of claim 1499. Setting \(B=0\) blocks that
minimal tree channel while leaving the diagonal Majorana connection \(A_M\)
available. The sequential seesaw packet of claim 1497 remains harmless
because it is a correlated reducible effect, not an independent \(B\).

Thus the module connection reproduces the already established low-energy
support distinction without promoting the family projector to an associative
coordinate.

## 6. Spin(2,3) joining interpretation

The two relation channels form a small typed face over the charge-three
family orbit. The compact lift supplies the common rotation, while \(Z_M\)
chooses which relation belongs to the Majorana sewing face. Parallelism says
that transport respects this face decomposition.

This is the smallest credible middle between the nested \(H_2\)/Spin(2,3)
geometry and the effective neutrino texture:

\[
\boxed{
\text{common charge-three orbit}
+\text{ parallel sector idempotent}
+\text{ real module connection}.}
\]

## Boundaries

**Derivation boundary:** the theorem proves that the sector projector is
necessary and sufficient within the unitary two-channel connection; it does
not derive \(Z_M\) from the Pati--Salam algebra.

**Dynamics boundary:** no spectral, Yang--Mills or Jordan action has yet been
shown to prefer \(\nabla Z_M=0\).

**Radiative boundary:** block preservation by generalized inner fluctuations
is known, but stability of the new outer/module connection under quantum
corrections is not.

**Full-model boundary:** the construction is the minimal relation fiber, not
yet a complete real-even Pati--Salam spectral triple or superconnection.

## Verdict

The converging middle is no longer “some generalized connection.” It has an
exact minimal form:

\[
\boxed{
\text{a real/unitary charge-three relation connection with a covariantly
constant Dirac/Majorana sector projector}.}
\]

Claim 1502 performs the first dynamical test. Pure curvature does not suffice:
flat off-diagonal connections can still leak across the split. A positive
covariant-projector energy detects exactly that second fundamental form and
selects the parallel mask in the source-free vacuum, though its spectral
origin remains to be derived.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_parallel_sector_projector_module_connection.mjs
node verification/verify/verify_spin23_commutant_projector_support_closure_without_tensor_coordinates.mjs
~~~
