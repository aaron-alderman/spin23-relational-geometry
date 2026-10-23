# Minimal Spin-Connection Coupling Is Tree-Level Flavor Universal, but the Allowed Wilson Space Is Not

**Date:** 23 October 2026

**Status:** exact minimal-coupling and flavor-basis result; symmetry and renormalization obstruction to promoting it as a UV prediction

**Depends on:** [the fermion portal](../1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md), [the residual E6 family cycle](../1500-1599/1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md), and [the missing complete matter action](../1600-1699/1632_a_finite_spectral_triple_can_couple_to_spin23_geometry_but_the_action_vacuum_and_spectrum_are_missing.md)

**Evidence:** [universality-boundary ledger](../../../evidence/data/spin23-minimal-fermion-universality-boundary-v1.json) and [verifier](../../../verification/verify/verify_spin23_minimal_fermion_universality_boundary.mjs)

## Result

The commonly used coefficient \(c_f=1/8\) has a precise but limited status.
In the convention

\[
S^\mu=\epsilon^{\alpha\beta\gamma\mu}T_{\alpha\beta\gamma},
\]

minimal metric-compatible Dirac coupling to one shared Lorentz spin connection
gives

\[
\mathcal L_{S\psi}=\pm {1\over8}S_\mu
\bar\psi\gamma^\mu\gamma_5\psi .
\]

The sign depends on curvature, contorsion and epsilon conventions; the
magnitude agrees with the convention fixed in claim 1611.  Every canonically
normalized Dirac species coupled in this minimal way receives the same
coefficient.  This is ordinary Riemann--Cartan geometry, not a distinctive
\(Spin(2,3)\) result.

That universal point is stable under flavor-basis changes but is not selected
by the presently declared symmetries.  The operator itself is local,
dimension four, Lorentz and diffeomorphism invariant and parity even.  Its
coefficient is therefore an allowed Wilson matrix.  Minimal universality is a
special tree-level slice of that matrix space, not a protected prediction of
the current parent construction.

## Why mass diagonalization does not spoil minimal universality

For \(n\) Dirac fields write the interaction as

\[
S_\mu\left(\bar\psi_R\gamma^\mu C_R\psi_R
-\bar\psi_L\gamma^\mu C_L\psi_L\right).
\]

The rotations that diagonalize the mass matrix act as

\[
\psi_L=U_L\psi'_L,
\qquad
\psi_R=U_R\psi'_R,
\]

and hence

\[
C_L\mapsto U_L^\dagger C_LU_L,
\qquad
C_R\mapsto U_R^\dagger C_RU_R.
\]

At the minimal point \(C_L=C_R=c_{\min}\mathbf1_n\), so both transformed
matrices remain \(c_{\min}\mathbf1_n\).  CKM- or PMNS-type basis rotations
cannot by themselves generate nonuniversality or flavor-changing neutral
torsion vertices from a coefficient proportional to the identity.

This closes one possible loophole in the opposite direction: the unknown
low-energy \(c_f\) cannot be blamed merely on changing from a gauge basis to a
mass basis.  It must enter through nonminimal Wilson coefficients, symmetry
breaking, thresholds or running.

## The allowed operator defeats protection

For fields with identical unbroken gauge quantum numbers, locality and gauge
invariance permit

\[
\Delta\mathcal L=
S_\mu\bar\Psi\gamma^\mu\gamma_5 C\Psi,
\qquad C=C^\dagger .
\]

Because \([S_\mu]=1\) and
\([\bar\Psi\gamma^\mu\gamma_5\Psi]=3\), this is a dimension-four operator.
Setting its independent part to zero restores no symmetry already present in
the declared action.  The minimal value is therefore not technically selected
merely by general covariance or local Lorentz invariance.

This agrees with the standard torsion EFT analysis: the axial pseudotrace is
the component that couples minimally to fermions, but the same axial coupling
appears among the allowed nonminimal parameters and as a counterterm.  With
several fermion fields those parameters need not be equal.  A separate
protecting principle would be required to make the minimal surface exact.

## What E6 and the residual Z3 do and do not fix

For one irreducible \(27\) at unbroken \(E_6\), Schur's lemma restricts an
\(E_6\)-invariant coefficient to a scalar on that \(27\).  This is genuine
intra-multiplet universality.  It still does not fix the scalar to \(1/8\).

The repository's surviving construction contains three equivalent matter
\(27\)s.  Their multiplicity space admits a family matrix.  Requiring that
matrix to commute with the residual cyclic permutation

\[
P=\begin{pmatrix}0&0&1\\1&0&0\\0&1&0\end{pmatrix}
\]

reduces it to the circulant commutant, not to a scalar.  Even the real
symmetric witness

\[
C=\mathbf1+0.2(P+P^2)
\]

commutes with \(P\), is non-scalar, and has eigenvalues
\((1.4,0.8,0.8)\).  Thus the established \(Z_3\) protects the scalar-copy
portal but does not protect universal torsion flavor coefficients.

After \(E_6\) breaking, different descendants also carry different gauge and
Yukawa interactions.  Their threshold matching and anomalous dimensions can
separate coefficients that were equal at a parent scale.  The existing E6
representation and portal results do not contain the complete fermion kinetic
action, heavy spectrum, matching scale or renormalization prescription needed
to compute that separation.

## Consequence for the experimental programme

The universal benchmark used in the force analysis remains valid as a
conditional minimal model.  Under that condition, the corrected nuclear
matching and \(\sqrt A>72.401\,\mathrm{GeV}\) joint witness remain meaningful.
They are not parameter-free predictions of the parent theory.

For the general theory the coefficients \(c_e,c_u,c_d,c_s,\ldots\) remain
independent matched quantities subject to whatever future matter action and
symmetry are supplied.  Experimental flavor tomography constrains them; it
does not derive them.

## Verdict

\[
\boxed{
\text{minimal geometry }\Longrightarrow c_f=\pm1/8\text{ universally at tree level},
\quad
\text{current UV construction }\centernot\Longrightarrow
\text{protected minimality}.
}
\]

This is standard torsion understanding applied sharply to the project, not
new physics.  New physics would begin with a concrete parent matter action or
a new symmetry that forbids every non-scalar/nonminimal coefficient and
survives breaking and thresholds.

## Sources

- I. L. Shapiro, [*Physical Aspects of the Space-Time Torsion*](https://arxiv.org/abs/hep-th/0103093), *Physics Reports* **357** (2002) 113--213.
- L. Freidel, D. Minic and T. Takeuchi, [*Quantum Gravity, Torsion, Parity Violation and All That*](https://arxiv.org/abs/hep-th/0507253), *Physical Review D* **72** (2005) 104002.
- J. R. Nascimento, A. Yu. Petrov and P. J. Porfírio, [*Induced Gravitational Topological Term and the Einstein--Cartan Modified Theory*](https://arxiv.org/abs/2108.05705), *Physical Review D* **105** (2022) 044053.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_minimal_fermion_universality_boundary.mjs
~~~
