# Pure Curvature Is Blind to Flat Leakage, but Covariant-Projector Energy Selects the Parallel Mask

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact curvature no-go and minimal positive-action repair; spectral origin and sourced vacuum remain open

**Depends on:** [the parallel sector-projector theorem](1501_equal_charge_Dirac_and_Majorana_relations_require_a_parallel_sector_projector_in_the_minimal_module_connection.md) and [the commutant-carrier theorem](1500_commutant_projectors_preserve_the_null_mask_without_tensor_coordinates_but_cannot_generate_the_charge_three_inner_gauge_field.md)

**Evidence:** [flat-leakage ledger](../../../evidence/data/spin23-projector-energy-flat-leakage.json) and [exhaustive verifier](../../../verification/verify/verify_spin23_projector_energy_detects_flat_connection_leakage.mjs)

## Result

An ordinary curvature-squared action cannot by itself make the
Dirac/Majorana sector projector parallel. Flat but leaking connections exist.
The smallest positive term that detects precisely the missing datum is

\[
\boxed{
S_Z=\kappa\int\|\nabla Z_M\|^2,
\qquad \kappa>0.
}
\]

In the source-free vacuum this term is minimized exactly at

\[
\nabla Z_M=0,
\]

the mask-preserving condition of claim 1501.

## 1. The curvature-only no-go

Let the unitary connection on the two-channel relation fiber be

\[
A=iK_x\,dx+iK_y\,dy.
\]

For constant coefficients,

\[
F_{xy}=-[K_x,K_y].
\]

Choose

\[
K_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
K_y=0,
\qquad
Z_M=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
\]

Then

\[
F_{xy}=0,
\qquad
[K_x,Z_M]=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\ne0.
\]

Thus the pure Yang--Mills minimum contains a connection that transports the
allowed Majorana channel into the forbidden Dirac channel. In one base
dimension the obstruction is stronger: every connection is curvature-flat,
while generic connections fail to preserve the projector.

Therefore

\[
\boxed{F_\nabla=0\ \not\Rightarrow\ \nabla Z_M=0.}
\]

## 2. Exhaustive finite audit

The verifier enumerates pairs of real symmetric generators

\[
K_\mu=\begin{pmatrix}a_\mu&b_\mu\\b_\mu&c_\mu\end{pmatrix},
\qquad
a_\mu,b_\mu,c_\mu\in\{-1,0,1\}.
\]

Among all \(27^2=729\) two-direction connections:

- 265 are flat;
- 184 are flat but leak across the sector split;
- 81 preserve the projector, and all 81 are flat in this two-channel
  diagonal subalgebra.

So curvature blindness is not an isolated counterexample. About 69 percent
of the flat connections in this finite audit violate the mask.

## 3. The minimal positive selector

For the same connection,

\[
\begin{aligned}
\|\nabla Z_M\|^2
&=\|[K_x,Z_M]\|_F^2+\|[K_y,Z_M]\|_F^2\\
&=2(b_x^2+b_y^2).
\end{aligned}
\]

It is nonnegative and vanishes if and only if both off-diagonal leakage
components vanish. Around a constant projector it is also a positive
quadratic mass term for the off-diagonal connection.

If \(Z_M\) transforms by conjugation, then \(\nabla Z_M\) does too and the
norm is gauge invariant. With only the derived scalar charge-three action,
the statement is simpler still: that action commutes with every sector
endomorphism, so the term is invariant.

The action can be read in either of two ways:

1. a kinetic term for a dynamical rank-one projector field;
2. a positive penalty for the second fundamental form of a fixed typed
   relation subbundle.

The second interpretation adds less unproved symmetry and is the current
minimal middle.

## 4. Fan downward: leakage suppression

The off-diagonal connection is the charged bidoublet/Dirac-link carrier from
claims 1499 and 1501. A positive \(S_Z\) makes its source-free classical value
zero and gives small sourced excursions a stiffness set by \(\kappa\).
Integrating out a massive off-diagonal mode would suppress rather than
automatically eliminate higher-dimensional Dirac leakage, so the EFT moat of
claim 1495 remains relevant.

Exact texture protection therefore requires either an exact typed-bundle
restriction or absence of sources. A large positive mass alone produces an
approximate zero.

## 5. Fan upward: generalized geometry

The new term is the energy of the relation-bundle splitting. Its basic field

\[
\mathcal B=(I-Z_M)\nabla Z_M
\]

is the second fundamental form. This gives a precise geometric object for a
Jordan, correspondence, defect or superconnection action to produce.

The next derivation problem is no longer open-ended: search existing
generalized spectral/Jordan actions for a positive \(\|\mathcal B\|^2\) term
and determine its coefficient and matter sources. If none produces it, the
parallel mask remains an imposed reduction rather than an emergent vacuum.

## 6. Spin(2,3) joining interpretation

The common charge-three rotation supplies the orbit, the projector supplies
the typed face, and \(\mathcal B\) measures transport away from that face.
Pure orbit curvature does not see every failure of face preservation. The
joined action must therefore measure both:

\[
\boxed{
S_{\rm joined}=\int\bigl(\|F_\nabla\|^2+
\kappa\|\nabla Z_M\|^2\bigr)+\cdots .
}
\]

This is a concrete convergence criterion rather than an aesthetic analogy.

## Boundaries

**Spectral-origin boundary:** no current derivation shows that the ordinary
Pati--Salam spectral action contains \(S_Z\) for a non-coordinate projector.

**Gauge-group boundary:** promoting \(Z_M\) to a full Grassmannian field can
introduce an accidental \(U(2)\) relation symmetry not present in the sourced
model; the fixed typed-bundle reading avoids that claim.

**Source boundary:** matter currents coupled linearly to the off-diagonal
connection can shift the minimum away from zero.

**Quantum boundary:** positivity at tree level is not yet a proof of
radiative stability or absence of symmetry-allowed counterterms.

## Verdict

Pure curvature does not supply the desired dynamics. The smallest sufficient
positive completion is a covariant-projector energy, or any derived action
with the same positive second-fundamental-form term:

\[
\boxed{
F^2\text{ is insufficient};
\quad \|\nabla Z_M\|^2\text{ selects the parallel mask}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_projector_energy_detects_flat_connection_leakage.mjs
node verification/verify/verify_spin23_parallel_sector_projector_module_connection.mjs
~~~
