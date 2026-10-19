# The Full-Lock Bitriplet Supplies the Minimal Higgs-Block Phase Connectors

**Date:** 17 October 2026  
**Branches:** B01, B03, B05 and B11  
**Claim status:** exact electroweak representation theorem and concrete cross-branch portal; coefficient and source origin remain open

## 1. Connector problem

The two Higgs block components required by cyclic Yukawa closure are

\[
h_C\sim(\mathbf2,+1/2),
\qquad
h_D\sim(\mathbf2,+1/2).
\]

Strict internal block traces forbid their cross mass and phase-sensitive quartics. A new connector must:

1. couple the two positive-hypercharge doublets;
2. possess a neutral component capable of acquiring a vacuum expectation value;
3. preserve \(U(1)_{\rm em}\);
4. remove every physical continuous relative phase;
5. avoid restoring the mirror fermion sectors.

## 2. Holomorphic connector channel

The doublet product is

\[
\mathbf2\otimes\mathbf2
=\mathbf1_{\rm a}\oplus\mathbf3_{\rm s}
\]

with total hypercharge

\[
Y=+1.
\]

A cubic connector \(X\) must therefore have

\[
Y_X=-1
\]

and transform as either a weak singlet or triplet.

### Singlet channel

For

\[
X\sim(\mathbf1,-1),
\]

the only component has

\[
Q=T_3+Y=-1.
\]

It cannot acquire a vacuum expectation value without breaking electromagnetism.

### Triplet channel

For

\[
X\sim(\mathbf3,-1),
\]

the components have

\[
Q=0,-1,-2.
\]

The \(T_3=+1\) component is neutral. Therefore

\[
\boxed{
(\mathbf3,-1)
\text{ is the smallest holomorphic connector channel that can condense while preserving }U(1)_{\rm em}.
}
\]

This channel constrains the phase combination

\[
\theta_C+\theta_D-\theta_\Delta.
\]

After quotienting the hypercharge gauge direction, it still leaves one continuous physical scalar phase. The complex triplet alone therefore does **not** solve the full relative-phase problem.

## 3. Hermitian connector channel

The hermitian cross channel transforms as

\[
h_C^\dagger h_D
\in
(\mathbf1\oplus\mathbf3,Y=0).
\]

It can couple to a neutral singlet or to a real weak triplet. The full lock already contains

\[
\xi\sim(\mathbf3,0),
\]

and permits

\[
V_\xi=
\mu_\xi h_C^\dagger\tau^a h_D\,\xi_a+\text{h.c.}
\]

At \(\langle\xi^0\rangle=w\), this produces the true relative-phase bilinear and constrains

\[
-\theta_C+\theta_D.
\]

## 4. Exact match to the full-lock bitriplet

The full Jordan-carrier custodial completion already contains

\[
\Delta\sim(\mathbf3,+1),
\]

so its conjugate has exactly the required representation:

\[
\Delta^\dagger\sim(\mathbf3,-1).
\]

The gauge-invariant cubic portal is

\[
V_\Delta
=
\mu_\Delta\,
h_C^T i\sigma_2\,\tau^a h_D\,
\Delta_a^\dagger
+\text{h.c.}
\]

Hypercharge closes exactly:

\[
\frac12+\frac12-1=0.
\]

When the neutral triplet components condense,

\[
\langle\Delta^0\rangle=k,
\qquad
\langle\xi^0\rangle=w,
\]

the two portals generate independent phase-sensitive bilinears of orders

\[
B_\Delta\sim\mu_\Delta k,
\qquad
B_\xi\sim\mu_\xi w.
\]

Using phase coordinates \((\theta_C,\theta_D,\theta_\Delta)\), hypercharge supplies the gauge direction \((1,1,2)\). The \(\Delta\) and \(\xi\) portals impose the independent constraints

\[
(1,1,-1),
\qquad
(-1,1,0).
\]

The gauge direction plus both constraints have full rank three. Hence the combined bitriplet portals remove all continuous scalar phases, while the \(\Delta\) portal alone leaves one.

At a CP-conserving stationary point, write the two positive phase curvatures as \(A\) and \(B\). The reduced phase Hessian is

\[
H_\theta
=
A\,uu^T+B\,vv^T,
\qquad
u=(1,1,-1),
\qquad
v=(-1,1,0).
\]

The vectors satisfy

\[
u\cdot v=0,
\qquad
u\cdot(1,1,2)=0,
\qquad
v\cdot(1,1,2)=0.
\]

Thus, before kinetic rescaling, the eigenvalues are

\[
3A,\qquad 2B,\qquad0,
\]

and the sole kernel is the hypercharge Goldstone direction \((1,1,2)\). With either portal absent, the kernel gains one physical phase direction.

## 5. Why the full carrier, not only the complex triplet, matters

A lone complex triplet vacuum changes the tree-level rho parameter. The full-lock construction also supplies the real triplet

\[
\xi\sim(\mathbf3,0)
\]

and admits the custodial alignment

\[
\langle\xi^0\rangle
=
\langle\Delta^0\rangle
=k,
\]

for which \(\rho=1\) at tree level.

Thus the same full carrier provides:

- the minimal neutral **holomorphic** connector \(\Delta^\dagger\);
- the hermitian relative-phase connector \(\xi\);
- the real-plus-complex triplet pair needed for custodial completion;
- enough independent phase constraints to lift the scalar zero mode without violating electromagnetism.

This is a nontrivial cross-branch convergence rather than a representation coincidence added after the fact.

## 6. The complex triplet also touches matter

The earlier fermion-bilinear tournament found that the only renormalizable full-lock coupling to one-generation chiral matter is

\[
LL\Delta.
\]

The complex triplet therefore occupies two independently selected roles:

\[
\boxed{
\begin{array}{c}
LL\Delta
\quad\text{(Majorana/lepton portal)},\\[2mm]
h_Ch_D\Delta^\dagger
\quad\text{(Higgs-block connector)}.
\end{array}
}
\]

This makes \(\Delta\) the first field in the programme selected independently by the matter-bilinear and holomorphic Higgs-connector gates. The full removal of scalar phases nevertheless uses the complete \((\xi,\Delta)\) bitriplet.

The two couplings also link neutrino physics to the extended scalar sector. That is potentially predictive only if their coefficients or vacuum alignment are constrained by the source construction.

## 7. What is not yet derived

Gauge symmetry permits

\[
\mu_\Delta,\qquad\mu_\xi
\]

but does not fix it. The current result does not establish:

- that the external full-lock triplets and the internal block connectors are the same dynamical fields;
- a block/linking-algebra origin for the portal;
- the magnitudes, phases or custodial relation of \(\mu_\Delta,\mu_\xi\);
- the resulting CP-odd mass;
- compatibility with flavor and lepton-number constraints;
- radiative custodial alignment;
- whether one or two light doublets remain after mixing.

The portal becomes explanatory only if the external/internal locking construction forces it or relates it to other known coefficients.

## 8. Branch consequence

The previous Higgs-phase obstruction is not terminal. It has become a concrete dependency:

\[
\boxed{
\text{Furey matter TRO}
\xrightarrow{\ h_Ch_D\Delta^\dagger,\;h_C^\dagger h_D\xi\ }
\text{full Jordan-carrier custodial sector}.
}
\]

This is the most economical known bridge between the internal Furey block geometry and the external full-lock scalar completion.

## 9. Stop-everything and falsification criteria

**Positive:** the same source tensor that creates the full lock forces both bitriplet portals, fixes or relates \(\mu_\Delta,\mu_\xi\), preserves custodial alignment and leaves one phenomenologically viable light Higgs direction.

**Stronger positive:** the resulting relation connects the CP-odd scalar mass, triplet vev and \(LL\Delta\) neutrino scale without an independent fitted portal.

**Negative:** the portal is absent under the true external/internal symmetry, or its required magnitude violates rho, charged-scalar, lepton-number or flavor constraints.

**Current status:** minimal representation compatibility is established; dynamical identification and predictivity are open.

**Unsafe shortcut:** claim that \(\Delta^\dagger h_Ch_D\) alone lifts the doublet relative phase, or insert arbitrary \(\mu_\Delta,\mu_\xi\) and credit them to the Jordan source.

## 10. Certificate

The [minimal connector certificate](../../../verification/verify/verify-minimal-higgs-block-connector.mjs) classifies both holomorphic and hermitian channels, identifies \(\Delta^\dagger\) and \(\xi\), and verifies that the holomorphic portal leaves one physical phase while the combined bitriplet constraints leave none.

## Companion documents

- [Two-Higgs block counterterm obstruction](113_furey_two_higgs_block_counterterm_obstruction.md)
- [Full-Jordan-carrier custodial completion](../0000-0099/87_full_jordan_carrier_custodial_completion.md)
- [Full-lock fermion bilinear and fermiophobia gate](../0000-0099/99_full_lock_fermion_bilinear_and_fermiophobia_gate.md)
- [Minimal Higgs-doublet/full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Doublet-diluted rho and Goldstone mixing](104_doublet_lock_rho_and_goldstone_mixing.md)

