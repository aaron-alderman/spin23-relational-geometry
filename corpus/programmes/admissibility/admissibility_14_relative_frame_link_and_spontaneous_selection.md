# Relative-frame link: dynamics turns the label torsor into six isolated vacua

**Date:** 24 October 2026  
**Status:** exact finite dynamical witness; physical source open  
**Parent:** [Family–placement torsor audit](admissibility_13_family_placement_torsor_reduction_audit.md)  
**Evidence:** [Relative-frame link certificate](../../../evidence/data/admissibility-relative-frame-link-v1.json)  
**Verifier:** [Spontaneous-selection verifier](../../../verification/admissibility/verify_relative_frame_link_spontaneous_selection.mjs)

## Result

The six-choice family-to-placement ambiguity does not necessarily require the fundamental action to name one preferred bijection. It can instead be the vacuum orbit of a relative-frame field.

Let (X\in M_3(\mathbb R)) carry one family index and one placement index, with

\[
X\longmapsto P_F X P_P^T,
\qquad
(P_F,P_P)\in S_{3,F}\times S_{3,P}.
\]

For any (\kappa>0), consider

\[
V_\kappa(X)
=\sum_{ij}x_{ij}^2(1-x_{ij})^2
+\kappa\sum_i\left(\sum_jx_{ij}-1\right)^2
+\kappa\sum_j\left(\sum_ix_{ij}-1\right)^2.
\]

Every term is nonnegative. The first forces each entry at a zero to be (0) or (1); the other terms force exactly one (1) in every row and column. Hence

\[
\boxed{V_\kappa(X)=0\iff X\text{ is one of the six permutation matrices}.}
\]

The parent symmetry has order (36). The six minima form one orbit, and the stabilizer of any selected minimum has order (6), giving the exact breaking pattern

\[
\boxed{
S_{3,F}\times S_{3,P}
\longrightarrow
S_{3,\mathrm{diag}(X)}.
}
\]

Thus the action can derive the **shape of the choice**—six isolated admissible relative frames—while spontaneous selection supplies the realized map. This is precisely the optimization picture: a continuous matrix space is driven not to a line or surface of equally good alignments, but to a finite set of isolated solutions. One history occupies one solution even though the action treats the six solutions symmetrically.

## Why this changes the frontier

The earlier audit asked for orientation correlation plus a basepoint correlation. A selected permutation matrix contains both at once:

- (\det X=\pm1) records whether the two triangle orientations agree or oppose;
- the position of any (1), such as (X_{00}=1), records a paired basepoint;
- the full matrix records all three pairings.

On the six-vacuum set, fixing parity leaves three vacua, fixing one basepoint leaves two, and fixing both leaves one. The previous (6\to3\), (6\to2\), and (6\to1) ladder is therefore exactly the stratification of this order-parameter space.

This also clarifies the difference between prediction and derivation. A symmetric theory need not predict the absolute name of the chosen vacuum; symmetry-related names are gauge or convention until other observables anchor both frames. What it must derive is the link carrier, the invariant potential, the isolated orbit, and the couplings by which the chosen relative frame affects observables.

## Contact with the existing corpus

The construction joins three already established shapes without identifying their physical carriers by fiat:

1. the placement branch has an exact six-state marked cover;
2. the family/placement (A_2) equivalence has an exact six-choice label torsor;
3. the closure programme already treats the family projector as an order parameter whose orientation requires response data.

The new observation is that “six marked states” and “six possible intertwiners” have the correct cardinality and group action to be represented by one relative permutation field. This is an exact finite architecture, not yet a proof that the Hopf phase, family projector and placement label are one physical field.

## Dynamics, defects and measurement

Once a kinetic term for (X) is supplied, spatially or temporally separated choices can support domain walls between relative frames. Even and odd vacua form two parity classes of three; an orientation-odd portal could split those classes, while a marked incidence could split the residual threefold degeneracy. Sweeps, hysteresis and metastability would then concern transitions between the six basins rather than motion along a flat family orbit.

That suggests a concrete detector language:

- prepare or cycle a control that couples to the relative frame;
- look for discrete switching among six response classes;
- test whether reversal exchanges the parity-three subsets;
- test whether a marked perturbation reduces threefold switching to a unique branch;
- distinguish genuine domains from instrumental hysteresis by reversal, dwell-time and size scaling.

These are consequences of the architecture, not present experimental claims.

## Remaining physical gate

The link model is not yet the atlas's first admitted physical edge. The corpus has not derived:

- a field or composite transforming with one family and one placement index;
- its kinetic term or the coefficients of (V_\kappa);
- a common action coupling it to the established family, Hopf/placement or detector sectors;
- or an observable domain-wall protocol.

The next search target is therefore more precise than “find the right matrix.” It is a **bifundamental relative-frame carrier** whose low-energy order parameter reduces to (X). If found, dynamics—not arbitrary labeling—can perform the gluing.
