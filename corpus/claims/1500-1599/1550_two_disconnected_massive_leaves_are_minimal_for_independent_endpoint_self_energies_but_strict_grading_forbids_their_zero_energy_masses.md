# Two Disconnected Massive Leaves Are Minimal for Independent Endpoint Self-Energies, but Strict Grading Forbids Their Zero-Energy Masses

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive one- and two-auxiliary topology classification for the retained five-chain, with exact Feshbach support, cofactor, J-completion and grading/relation audit

**Depends on:** [the exact failed Feshbach projection](1547_the_exact_feshbach_kernel_induces_the_wrong_diagonals_and_the_protected_resolvent_zeros_hold_only_at_zero_energy_not_on_an_interval.md), [the five-role descent no-go](1537_neither_minimal_rank_repair_has_a_natural_linear_descent_to_the_invertible_five_role_texture.md), and [the selected-return construction](1540_selected_length_two_returns_recover_the_protected_texture_but_require_a_new_endpoint_projector_and_do_not_select_the_common_ray.md)

**Evidence:** [minimum-auxiliary topology ledger](../../../evidence/data/spin23-five-chain-minimal-auxiliary-feshbach-topology.json) and [deterministic verifier](../../../verification/verify/verify_spin23_five_chain_minimal_auxiliary_feshbach_topology.mjs)

## Result

There are two distinct answers, depending on whether the auxiliary mass is
allowed to violate the finite KO grading.

As an unconstrained Hermitian Feshbach model, two disconnected massive leaves
are necessary and sufficient to generate independent self-energies only at
the desired \(I\) and \(P\) endpoints:

\[
\delta_I(z)=\frac{\lambda_I^2}{z-M_I},
\qquad
\delta_P(z)=\frac{\lambda_P^2}{z-M_P}.
\]

They induce no \(I-N\), \(P-Z\), or \(N-X\) support at any energy away from
their poles. The selected mass-matrix cofactor remains identically zero, and
at zero energy the effective determinant is

\[
\det D_{\rm eff}(0)=\delta_I(0)y^2h^2.
\]

One shared massive leaf is even smaller if an induced correction to the
already-allowed \(I-P\) edge is accepted. It produces a rank-one \(I,P\)
self-energy block, so both diagonals force an off-diagonal correction and the
three entries obey one relation. Thus two leaves are minimal specifically for
independent, diagonal-only endpoint terms.

But a one-state mass \(M_r\) is grading even. It is not an admissible block of
the grading-odd finite Dirac operator. Under strict grading and relation
parity, no finite invertible auxiliary block can generate a same-state mass at
zero energy. This is a general block theorem, not a failure of one topology.

Therefore

\[
\boxed{
\begin{array}{rcl}
\text{unconstrained shared leaf}&:&\text{minimal with allowed }I-P\text{ renormalization},\\
\text{two disconnected scalar leaves}&:&\text{minimal independent diagonal-only solution},\\
\text{strict grading-odd finite Dirac}&:&\mathrm{UNSAT}\text{ at }z=0.
\end{array}}
\]

The two-leaf support statement is exact on an interval. Treating its rational
self-energies as constant masses is only a low-energy EFT expansion, and the
selected diagonal of the actual projected resolvent is not interval-zero.

## 1. One auxiliary state

Let one auxiliary scalar of mass \(M\) couple to the retained chain through a
vector \(b\). Its exact self-energy is

\[
\Sigma(z)=\frac{bb^*}{z-M}.
\]

Generic nonzero attachments generate the complete graph on the attachment
support. Exhausting all nonempty subsets of the five retained roles shows
that the only support producing both desired diagonals, no unwanted diagonal,
and none of the declared forbidden edges is

\[
\operatorname{supp}b=\{I,P\}.
\]

Writing \(b=(\lambda_I,\lambda_P)\) on this support gives

\[
\Sigma_{IP}(z)=\frac1{z-M}
\begin{pmatrix}
\lambda_I^2&\lambda_I\lambda_P\\
\lambda_I\lambda_P&\lambda_P^2
\end{pmatrix}.
\]

It creates no forbidden next-nearest edge, because \(I-P\) is already a
primitive chain edge. But

\[
\Sigma_{II}\Sigma_{PP}-\Sigma_{IP}^2=0.
\]

Both diagonals are inseparable from an \(I-P\) renormalization and a rank-one
relation. One auxiliary is sufficient only if those restrictions are
accepted. If the new contribution must be diagonal, it cannot couple to both
roles.

With \(J\) completion this topology costs one auxiliary state on each
relation sheet: two new complex states, one real mass parameter and two
attachments before imposing the conjugate relations.

## 2. Two auxiliary states

For independent diagonal terms, take

\[
D_A=\begin{pmatrix}M_I&0\\0&M_P\end{pmatrix},
\qquad
B=\begin{pmatrix}
\lambda_I&0\\0&\lambda_P\\0&0\\0&0\\0&0
\end{pmatrix}.
\]

Then

\[
\Sigma(z)=B(z-D_A)^{-1}B^*
=\operatorname{diag}\left(
\frac{\lambda_I^2}{z-M_I},
\frac{\lambda_P^2}{z-M_P},0,0,0\right).
\]

A generic connected two-by-two auxiliary mass block has a nonzero
off-diagonal resolvent and therefore induces \(I-P\). Conversely, demanding
zero induced off-diagonal on an open interval forces the two attachment
channels to reduce, up to independent auxiliary basis choices, to the
disconnected-leaf form. This is the unique generic two-state diagonal-only
topology.

Its \(J\)-completed cost is four new complex states: two leaves per sheet and
their two \(J\) partners. It introduces two masses and two independent
attachment strengths before conjugation.

## 3. Cofactor, determinant and forbidden support

At zero energy define

\[
d_I=-\frac{\lambda_I^2}{M_I},
\qquad
d_P=-\frac{\lambda_P^2}{M_P}.
\]

The effective matrix in \((I,P,N,Z,X)\) order is

\[
\begin{pmatrix}
d_I&x&0&0&0\\
x&d_P&y&0&0\\
0&y&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix}.
\]

Deleting \(P\) separates the \(I\) scalar block from the odd zero-diagonal
three-chain \(N-Z-X\), whose determinant is zero. Hence

\[
\boxed{\operatorname{cof}_{PP}D_{\rm eff}(z)=0}
\]

for every \(z\) where the effective operator is defined. At zero,

\[
\det D_{\rm eff}(0)=d_Iy^2h^2.
\]

Thus a leaf on \(I\) alone already opens the five-role mass gap while
preserving the cofactor. The second \(P\) leaf is necessary only because the
requested texture contains both endpoint diagonals independently.

No forbidden support is generated: disconnected leaves have no path through
the auxiliary resolvent between distinct retained roles.

## 4. Strict grading no-go

For an invertible grading-odd auxiliary operator, split its states by
chirality:

\[
D_A=\begin{pmatrix}0&M\\M^*&0\end{pmatrix},
\qquad
D_A^{-1}=\begin{pmatrix}0&(M^*)^{-1}\\M^{-1}&0\end{pmatrix}.
\]

A retained positive-chirality state can attach only to the negative
auxiliary subspace, and conversely. Its zero-energy self-energy samples a
same-chirality diagonal block of \(D_A^{-1}\), which is zero. Therefore

\[
\boxed{\Sigma_{rr}(0)=0}
\]

for every retained role \(r\), for any finite-dimensional invertible odd
auxiliary block.

One auxiliary state cannot even carry an invertible odd mass. Two states can
form one opposite-chirality dimer. A leaf attachment then gives

\[
\Sigma_{rr}(z)=\frac{\lambda_r^2z}{z^2-m_r^2},
\]

which vanishes at zero. Attaching the dimer to both \(I\) and \(P\) also
renormalizes their allowed connecting edge. Using separate dimers removes
that mixing but costs four auxiliary states per sheet and four \(J\) partners,
eight new complex states total; both desired zero-energy masses still vanish.

The dimer members must share relation parity so their internal mass and leaf
edge remain on one sheet. \(J\) supplies the conjugate dimer on the opposite
sheet. Coupling a state directly to its \(J\) mate would cross relation parity
and does not evade the theorem.

Hence the two scalar leaves are not ordinary finite-Dirac states. They are
grading-even mediator/correspondence data, or else the grading rule must be
explicitly relaxed.

## 5. Interval stability versus EFT

The disconnected topology protects support exactly:

\[
\Sigma_{IN}=\Sigma_{PZ}=\Sigma_{NX}=0
\]

for all \(z\) away from the auxiliary poles. Its effective-operator cofactor
also vanishes identically.

The diagonal functions are not constant:

\[
\frac{\lambda_r^2}{z-M_r}
=-\frac{\lambda_r^2}{M_r}
-\frac{\lambda_r^2}{M_r^2}z
+O\!\left(\frac{z^2}{M_r^3}\right).
\]

Thus the desired constant texture is a controlled low-energy approximation
for \(|z|\ll|M_r|\), not an exact interval-independent mass matrix. For strict
dimers the expansion starts at order \(z\), so it is a wavefunction-type
correction and never supplies the missing constant.

Finally, zero cofactor of \(D_{\rm eff}\) is not the same as a zero diagonal
of the actual projected resolvent \((z-D_{\rm eff})^{-1}\). Every finite
diagonal resolvent behaves as \(1/z\) at large \(z\); if it vanished on an
open interval, rational analyticity would force it to vanish identically,
contradicting that asymptotic. The propagator zero is therefore not
interval-stable.

## 6. Physical boundary

The minimum relaxed solution adds two grading-even massive correspondence
leaves per sheet and four states after \(J\) completion. Nothing in the
six-character finite geometry sources their Pati--Salam representations,
masses, attachment couplings or kinetic terms.

The strict result is stronger: an honest grading-odd finite-Dirac Schur
elimination cannot generate the requested zero-energy diagonal masses at any
auxiliary dimension. Reopening the construction requires either explicitly
grading-even mediator objects or a declared relaxation of the grading or
relation-sheet rules.

## Verdict

Two disconnected massive leaves are the unique minimal source of independent
diagonal-only \(I,P\) self-energies with exact forbidden-support protection.
Their support and effective cofactor are interval-stable, but their constant
mass interpretation is only EFT.

They are not compatible with the strict finite grading. Within an ordinary
grading-odd, relation-even finite Dirac operator, the zero-energy diagonal
repair is impossible, not merely more expensive.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_five_chain_minimal_auxiliary_feshbach_topology.mjs
node verification/verify/verify_spin23_sixteen_state_five_role_feshbach_resolvent.mjs
node verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs
~~~
