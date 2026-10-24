# Self-generated holonomy preserves a projector but cannot choose it

**Date:** 24 October 2026  
**Status:** exact equivariant fixed-point theorem and selection no-go  
**Parent:** [Holonomy-driven selector breaking](admissibility_23_holonomy_driven_selector_breaking_and_reflexive_closure.md)  
**Evidence:** [Self-generated-holonomy ledger](../../../evidence/data/admissibility-self-generated-holonomy-projector-no-go-v1.json)  
**Verifier:** [Equivariant return-map certificate](../../../verification/admissibility/verify_self_generated_holonomy_projector_no_go.mjs)

## Result

The reflexive equation

\[
P=\Pi_{\min}\!\left(\operatorname{Hol}(P)\right)
\]

has a natural exact solution, but that solution exposes a no-go.

Let

\[
P=nn^T,
\qquad
n^Tn=1,
\qquad
Q=I-P.
\]

On the oriented lift \(n\), define

\[
H_\phi(n)
=P+\cos\phi\,Q+\sin\phi\,[n]_\times,
\]

where \([n]_\times v=n\times v\). This is the rotation through angle \(\phi\) about the axis \(n\). It obeys

\[
H_\phi(n)n=n.
\]

The covariantly constant direction is therefore exactly the projector line \(P\), while the transverse plane receives the holonomy gap

\[
\Delta_\phi=\frac{\phi^2}{L^2}
\qquad
(0<\phi\leq\pi).
\]

Consequently,

\[
\boxed{
\Pi_{\min}(H_\phi(n))=P.
}
\]

Every projector is a self-consistent fixed point.

## Director-defined versus orientation-defined holonomy

For a director, \(n\sim-n\). Under this identification,

\[
H_\phi(-n)=H_{-\phi}(n)=H_\phi(n)^{-1}.
\]

Therefore a genuine quarter-turn requires an orientation lift: \(P\) alone determines the axis but not the sign of \(\phi\).

The half-turn is different:

\[
H_\pi(P)=P-Q=2P-I.
\]

Because \(\sin\pi=0\), it depends only on the projector and is well defined on \(\mathbb{RP}^2\). It acts as \(+1\) on the selected line and \(-1\) on the transverse plane.

Thus:

- the projector canonically supplies a transverse half-turn;
- a quarter-turn additionally requires an orientation, complex structure, boundary direction or history.

This is the same lift boundary already found between projective and coherent closure.

## Why the return map does not contract

Define

\[
\mathcal R(P)=\Pi_{\min}(H_\pi(P)).
\]

Since the unique \(+1\) eigenspace of \(H_\pi(P)\) is \(\operatorname{im}P\),

\[
\boxed{
\mathcal R(P)=P
}
\]

for every \(P\in\mathbb{RP}^2\).

Hence

\[
D\mathcal R_P=I
\]

on the two-dimensional tangent space, and

\[
\rho(D\mathcal R_P)=1.
\]

The fixed point is not transversely attractive. The return map remembers the input perfectly; it does not prefer one input over another.

This gives a precise separation:

\[
\boxed{
\text{fixed external holonomy selects a projector;}
\qquad
\text{equivariant self-generated holonomy preserves the whole projector orbit}.
}
\]

## Equivariance theorem

The conclusion is not special to the displayed formula.

Let

\[
\mathcal R:\mathbb{RP}^2\to\mathbb{RP}^2
\]

be \(SO(3)\)-equivariant:

\[
\mathcal R(gPg^{-1})
=g\mathcal R(P)g^{-1}.
\]

Fix \(P_0\). Its stabilizer contains every rotation of the transverse plane. The only projective line fixed by the full stabilizer is the line selected by \(P_0\). Therefore

\[
\mathcal R(P_0)=P_0.
\]

Transitivity then gives

\[
\boxed{
\mathcal R=\operatorname{id}_{\mathbb{RP}^2}.
}
\]

Any projector-only, fully covariant return rule is the identity. It cannot possess a unique attractive orientation.

This is the return-map version of the corpus's earlier result that one covariant projector cannot select its own orientation.

## What topology is doing

The preceding holonomy model remains physically meaningful. Once a sector or history fixes \(H\), it:

- changes the mode spectrum;
- gaps transverse fluctuations;
- protects a selected axis;
- stores a central sign or winding memory;
- constrains later symmetry breaking.

But if \(H\) is regenerated covariantly from the same freely moving \(P\), rotating \(P\) rotates \(H\) with it. The joint configuration has an entire orbit of equal solutions.

Topology is therefore acting as **memory and protection**, not ex nihilo orientation selection.

## The minimal relational repair

To obtain a unique attractive fixed point, the return map must depend on at least one additional datum \(Y\):

\[
\mathcal R(P;Y)
=\Pi_{\min}\!\left(\operatorname{Hol}(P;Y)\right).
\]

The datum may be:

- a second projector or response tensor;
- a boundary or wall normal;
- a source/detector frame;
- an oriented defect class;
- a matter or Yukawa response not proportional to \(P\);
- environmental history stored in a metastable sector.

The pair \((P,Y)\) can have a smaller stabilizer than \(P\) alone. Only then can the return map contract the residual orientation directions.

This is why the programme repeatedly finds that a relationship, not an isolated object, closes the next rung.

## Revised reflexive cycle

The full feedback grammar is now

\[
\begin{array}{c}
\text{prior relational datum }Y
\\
\downarrow
\\
\text{selected projector }P
\\
\downarrow
\\
\text{connection and holonomy}
\\
\downarrow
\\
\text{spectral gaps and protected structure}
\\
\downarrow
\\
\text{new material/boundary datum }Y'
\\
\downarrow
\\
\text{next selection}.
\end{array}
\]

The cycle does not close as \(P\to P\) alone. It closes by carrying forward the relational memory that made \(P\) historically distinct.

## Frontier

Established:

- a projector canonically generates an axis-preserving half-turn holonomy;
- an oriented lift generates the quarter-turn family;
- the induced lowest-mode projector equals the input projector;
- the resulting equivariant return map is the identity and has tangent spectral radius one;
- self-generated covariant holonomy cannot uniquely choose an orientation.

Open:

- identify the smallest already-existing corpus datum \(Y\) that reduces the stabilizer without being inserted ad hoc;
- compute the two-input return map and its tangent spectral radius;
- determine whether \(Y\) is produced as a boundary, topological or material record on the preceding rung;
- embed the mechanism in a local causal action.

The next admissible calculation is a finite two-datum return map, beginning with the relative-frame link or the wall normal, and testing whether it turns neutral memory into genuine attraction.

