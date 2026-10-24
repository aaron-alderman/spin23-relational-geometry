# The exact source quotient has five coordinates, not two

**Date:** 25 October 2026  
**Status:** exact two-current closure killed at the leading noncontact block; operational reduction remains open  
**Topic:** OT-047  
**Parents:** [action-derived two-current block](../lane-expansion/programme_lane_expansion_33_the_action_derived_two_current_block_removes_bl_shear_but_not_the_incidence_normalisation_fork.md), [gauge-typed source quotient](../lane-expansion/programme_lane_expansion_35_the_gauge_typed_source_quotient_has_one_anomaly_coordinate_and_no_incidence_eigenray.md), [AZ-067 source-and-scheme census](admissibility_67_two_current_source_and_scheme_census.md)  
**Evidence:** [five-coordinate ledger](../../../evidence/data/five-coordinate-source-quotient-v1.json)  
**Generator:** [quotient calculation](../../../scripts/run-five-coordinate-source-quotient.mjs)  
**Verifier:** [quotient certificate](../../../verification/admissibility/verify_five_coordinate_source_quotient.mjs)

## Result

The corpus already contained more of WP-A than the frontier register recognized. Once the completed Standard-Model phase currents, Higgs current, hypercharge equation-of-motion representative and four Yukawa-breaking channels are typed correctly, the contact-insensitive physical source quotient is exactly five-dimensional:

\[
(v_u,v_d,v_e,v_\nu;a_2).
\]

The first four coordinates measure violation of the up, down, charged-lepton and neutrino Yukawa interactions. The fifth is the one independent gauge-anomaly coordinate, represented here by the weak $SU(2)^2$ source anomaly. After quotienting gauged hypercharge, completed $B-L$ is the unique null direction.

This fires the kill test for an **exact** incidence/$B-L$ two-current closure. The protected $B-L$ axis is real, but the broken complement is not one algebraically closed incidence ray. It contains four Yukawa channels plus one anomaly channel. A two-current response can survive only as an operational low-rank approximation selected by energy, thresholds, preparation or detector projection.

## The source-native calculation

In the ordered basis

\[
(Q,u^c,d^c,L,e^c,\nu^c,H),
\]

the four Yukawa rows are

\[
V=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

The free separated-point current metric is

\[
D=\operatorname{diag}(6,3,3,2,1,1,1),
\]

so the induced descendant metric is

\[
M=VD^{-1}V^T=
\begin{pmatrix}
\frac32&-\frac56&-1&1\\
-\frac56&\frac32&1&-1\\
-1&1&\frac52&-\frac12\\
1&-1&-\frac12&\frac52
\end{pmatrix}.
\]

Its eigenvalues are

\[
\frac23,\quad 2,\quad \frac{8-\sqrt{37}}3,\quad \frac{8+\sqrt{37}}3,
\]

all positive and distinct. The off-diagonal entries retain which Yukawa descendants share $Q$, $L$ and the oppositely oriented Higgs field. This is not a graph analogy: it is the noncontact geometry induced by the declared field content.

Adding the independent anomaly row raises the physical rank to five. Hypercharge and $3(B-L)$ lie in the joint kernel before the gauge quotient; only $3(B-L)$ remains afterward.

## The incidence test

The two retained incidence conventions map to

\[
\lambda_d\longmapsto(10,6,2,1;16),
\qquad
\lambda_m\longmapsto(10,6,4,1;16).
\]

They share the shear-invariant ultraviolet relation

\[
a_2=a_3=v_u+v_d=16
\]

in the declared anomaly normalization. But neither four-component Yukawa image is an eigenvector of $M$. Each occupies several independently propagating breaking channels. The ordinary free action can choose the representative perpendicular to $B-L$ inside a supplied two-plane; it cannot make that plane dynamically closed or choose between the two incidence normalizations.

## What happens to the Jordan–Lie reading

The rank-two real positive cone remains an exact and useful **response carrier** once two ports have been selected. This result says that the Standard Model does not select those two ports merely by presenting the incidence and $B-L$ charge vectors.

In ordinary terms: the two-port meter is valid, but the material has five independently excitable ways to respond. Calling two chosen combinations “the system” requires a reason—an energy window, a preparation, a boundary condition or a detector that suppresses the other three. The Jordan cone describes what can coexist inside the selected response slice; it does not by itself prove that the slice is closed under the microscopic dynamics.

The Lie side cannot repair this by rotating the five coordinates until incidence looks special. Such a rotation changes the source convention. What matters is whether a measured response has a stable low-rank singular subspace across held-out energies and schemes.

## Revised frontier

The next calculation is no longer a generic search for one $2\times2$ anomalous-dimension matrix. It is:

1. compute the absorptive response on the five-coordinate quotient using top, bottom, charged-lepton, neutrino and weak-anomaly cuts;
2. match it through declared thresholds and retain interference terms;
3. compute its singular spectrum across an energy interval;
4. test whether one stable broken singular direction plus protected $B-L$ dominates;
5. only for such a window, project to a two-port response and continue to the KMS calculation.

The operational two-current model is recovered if the discarded singular values are bounded below the detector and theory error budgets throughout a preregistered window. It fails if two or more broken directions remain resolvable or the leading direction rotates strongly with scale.

## Open and closed

Closed:

- the off-shell basis needed to state the quotient;
- the four Yukawa coordinates and one independent anomaly coordinate;
- the exact five-dimensional physical quotient after hypercharge removal;
- the unique protected $B-L$ null axis on the Dirac branch;
- the leading positive descendant metric and its spectrum;
- the failure of either incidence convention to be a Yukawa-channel eigenray;
- exact algebraic two-current closure.

Open:

- the energy-dependent five-channel absorptive matrix;
- gauge and higher-loop corrections;
- threshold matching and local contact choices;
- whether a finite operational rank-two window exists;
- the thermal/KMS rank and relaxation coefficients;
- the separate Majorana branch.

## Implication

This is a useful loss of simplicity. It prevents the rank-two Jordan cone from being mistaken for a source-derived microscopic closure while preserving it as the correct language for any experimentally isolated two-port slice. The place to look is now concrete: search the five-channel response for a stable spectral gap between one broken singular direction and the remaining broken channels. Finding that gap would yield theoretical engineering—a justified reduced model and detector design. Failing to find it would rule out the proposed two-current reduction without threatening the broader admissibility method.

## Reproduction

~~~powershell
node scripts/run-five-coordinate-source-quotient.mjs --write
node verification/admissibility/verify_five_coordinate_source_quotient.mjs
node verification/verify/verify_programme_action_derived_two_current_block.mjs
node verification/verify/verify_programme_gauge_typed_source_quotient_and_yukawa_channel_block.mjs
~~~
