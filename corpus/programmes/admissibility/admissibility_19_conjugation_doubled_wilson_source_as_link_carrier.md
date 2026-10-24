# The conjugation-doubled Wilson source is the first exact link-carrier candidate

**Date:** 24 October 2026  
**Status:** exact source-graph identification; physical edge operation open  
**Parent:** [Transported (Sp(4)) closure](admissibility_18_existing_sp4_closure_transports_to_the_link_carrier.md)  
**Evidence:** [Wilson-source carrier ledger](../../../evidence/data/admissibility-wilson-source-link-carrier-v1.json)  
**Verifier:** [Cover and metric certificate](../../../verification/admissibility/verify_wilson_source_link_carrier.mjs)

## Finding

The corpus contains a concrete candidate for the relative-frame carrier. It is not a new elementary particle multiplet. It is the conjugation-doubled Wilson source triplet

\[
\boxed{
\{u,\bar u,d,\bar d,l,\bar l\}.
}
\]

Here (u,d,l) denote the three Wilson coupling rays, and the bars denote their conjugation orientation. Label the base ray by (i\in\mathbb Z_3) and the conjugation sheet by (s\in\mathbb Z_2). Then

\[
\boxed{
n\longmapsto(i,s)=(n\bmod3,n\bmod2)
}
\]

is simultaneously the coordinate system for:

- the six marked Hopf phases;
- the placement double cover;
- the six relative-frame permutation vacua;
- and the doubled Wilson source triplet.

This is the first corpus object with both the correct six-state structure and a plausible microscopic endpoint interpretation.

## Why the existing physical section still fails

The actual (S_1/S_1^\dagger) orientation of the three source vertices is

\[
o=(0,0,1).
\]

The induced conjugation voltage on the three edges is the vertex difference

\[
a_i=o_i+o_{i+1}\pmod2,
\]

giving

\[
\boxed{a=(0,1,1).}
\]

Its total flux is even:

\[
a_0+a_1+a_2=0\pmod2.
\]

Consequently its lift is

\[
\boxed{C_3\sqcup C_3,}
\]

two disconnected conjugate triangles. It is not the connected (C_6) required by the Hopf/link orbit.

This is a precise physical-admission failure. Merely possessing the six oriented labels does not make them one dynamical carrier.

## The minimal repair

Put one antiunitary/conjugation operation on every base edge:

\[
a_{\rm edge}=(1,1,1).
\]

Now the flux is odd, and the lift is one connected six-cycle:

\[
\boxed{C_6.}
\]

The step walks through

\[
(u,0)\to(d,1)\to(l,0)\to(u,1)\to(d,0)\to(l,1)\to(u,0),
\]

up to the declared ordering convention. This is exactly the same six-step action already certified on the Hopf phases and permutation-link vacua.

The missing ingredient is therefore not “six fields” or even “two (S_1) copies.” It is an **edge operation** with odd cycle flux: a uniform antiunitary sewing of adjacent source rays.

## Radiative leakage becomes relational geometry

The microscopic pulse chain had treated the radiatively regenerated (u-d) Wilson coefficient as an unwanted third edge. The link interpretation changes its role.

With

\[
r=\frac\kappa{m^2},
\qquad
K(r)=\begin{pmatrix}1+r&-r\\-r&1+r\end{pmatrix},
\]

the three rays

\[
u=e_1,
\qquad
d=e_2,
\qquad
l=e_1+e_2
\]

form the exact (A_2) root-line geometry at

\[
\boxed{r=1.}
\]

Then

\[
K(1)=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}=G_{A_2}
\]

up to scale, and all normalized absolute overlaps are (1/2).

So the same shared-leg mixing that spoils the pure open pulse can generate the closed relational triangle needed by the link carrier. The “forbidden edge” is forbidden only if the target is an open star; it is required if the target is a triangle.

## Bootstrap boundary

This is not yet a dynamical derivation of (r=1). Placement (C_3) covariance plus a compatible Real structure protects the (A_2) metric ray, but invoking that symmetry to select the Wilson metric risks circularity: the placement structure is what the carrier is meant to explain.

The noncircular possibilities are now finite:

1. compute the shared-leg self-energy and show (\kappa=m^2) from independently fixed masses and couplings;
2. derive the uniform edge antiunitary from a microscopic Real/CAR operation, then show its Ward symmetry enforces the metric;
3. find an RG fixed point at (r=1);
4. or falsify the route by proving that locality, charge or radiative corrections forbid the odd-flux edge operation.

The generic Jordan log-det selector does not help: it selects (r=0), not (r=1).

## Admission status

The candidate carrier is filled at the source-graph level:

\[
\text{Wilson doubled triplet}
\cong
\text{Hopf/placement/link six-state orbit}.
\]

The physical transition law is unfilled:

\[
\text{gauge vertex grading}
\not\Rightarrow
\text{odd-flux connected cover}.
\]

This is real progress because the missing bridge is now one typed operation, not a vague correspondence: derive a uniform edge antiunitary acting on the conjugation-doubled Wilson source triplet.
