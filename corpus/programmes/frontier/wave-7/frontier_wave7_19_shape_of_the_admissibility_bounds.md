# Frontier Wave 7.19: The Shape of the Admissibility Bounds

**Date:** 24 October 2026  
**Status:** cross-corpus synthesis with machine-readable boundary atlas

## Result in one sentence

The admissibility zone around the exceptional 27 is not a box in parameter space or one smooth frontier. It is a **stratified, fibered intersection of cones, symmetry orbits, linear kernels, arithmetic islands, dynamical basins and detector quotients**, with missing translation maps between several otherwise well-defined charts.

## Why one matrix is insufficient

The corpus now has several exact 27-dimensional or 3+24 structures, but they live in different categories:

- the exceptional Jordan carrier \(J_3(\mathbb O)\);
- the 27-dimensional formal relation space;
- the 24-dimensional Leech/off-diagonal arithmetic carrier;
- the 24-coordinate binary code chart;
- dynamical selector and memory models;
- experimental record distributions.

There is no justified operation that simply intersects all of these as subsets of one vector space. The correct global object is a diagram of local admissibility charts and typed maps. Where a map is missing, the zone has a translation frontier rather than an empty numerical cell.

Schematically,

\[
\mathcal A_{\rm current}
=\left(
\mathcal A_J
\longleftarrow ? \longrightarrow
\mathcal A_{\rm graph}
\longleftarrow ? \longrightarrow
\mathcal A_{\rm arithmetic}
\right)
\times_{\rm dynamics}
\mathcal A_{\rm records}/\!\sim_D.
\]

The question marks are scientific objects: intertwiners, not omissions to be hidden.

## 1. The continuous carrier is a stratified cone

The exceptional Jordan algebra has

\[
J_3(\mathbb O)=\mathbb R^3\oplus\mathbb O^3,
\qquad 27=3+24.
\]

Its positive cone is stratified by Jordan rank:

\[
\text{rank 3 interior}
\supset
\text{rank 2 determinant boundary}
\supset
\text{rank 1 extreme rays}
\supset\{0\}.
\]

This supplies the first shape of admissibility:

- the interior consists of robust positive states or responses;
- the determinant-zero surface is a loss-of-rank boundary;
- primitive rank-one elements form extreme boundary rays;
- crossing the boundary leaves the positive order and usually introduces an inadmissible negative direction.

The smaller established \(H_2(\mathbb R)_+\) section makes the geometry explicit:

\[
X(t,x,y)>0
\quad\Longleftrightarrow\quad
t>\sqrt{x^2+y^2}.
\]

Its rank-one boundary is the future null cone. Thus positivity selects one causal component before any empirical identification of \(t\) with laboratory time.

## 2. The exceptional selector produces an orbit boundary, not a point

Around a primitive idempotent, the exceptional 27 has the Peirce shape

\[
\boxed{27=1\oplus16\oplus10.}
\]

The corpus's invariant quartic

\[
V(x)=\lambda(\lVert x\rVert^2-v^2)^2
+\kappa\lVert x^\#\rVert^2
\]

is stable for \(\lambda,\kappa>0\) and selects the normalized rank-one orbit. Its local geometry is Morse–Bott:

- the radial \(1\) is stiff;
- the normal \(10\) is stiff;
- the tangent \(16\) remains soft because it moves along symmetry-equivalent faces.

In the complexified physical audit the real Hessian multiplicities are one massive radial mode, one phase zero mode, 32 tangent zero modes and 20 massive normal modes. A cubic perturbation splits the normal sector, with local stability bound

\[
\boxed{|\mu|<\kappa v.}
\]

This is the precise version of “an optimization selects one solution rather than a line or surface.” The invariant selector does **not** select one point: it selects a curved orbit of admissible minima. A further non-invariant datum, gauging or transverse constraint is required to collapse that orbit.

## 3. The relational chart is a pair of transverse linear decompositions

The 27 relation coordinates carry two independent exact decompositions.

The semantic decomposition is

\[
C_1=C_{12}\oplus G_{15},
\]

where \(C\) contains extension and instantiation, while \(G\) contains enrichment requirements, separations and no-go guardrails.

The graph-topological sequence is

\[
0\longrightarrow H_{1,12}
\longrightarrow C_{1,27}
\xrightarrow{\partial}
\operatorname{im}\partial_{15}
\longrightarrow0.
\]

Equal dimensions do not identify the corresponding spaces. Their crossing instead yields

\[
H_{1,12}sim 2_{\rm constructive}+8_{\rm mixed}+2_{\rm guardrail},
\]

where the eight-dimensional term is a canonical quotient of mixed cycles, although choosing particular representatives requires a splitting.

The other coordinate cut is

\[
C_1=S_3\oplus B_{24}.
\]

The three special comparison edges contribute one component bridge and two new cycle closures over the 24-edge backbone. These linear strata show where relational closure exists, but they do not supply positivity, a Jordan product or a physical action.

## 4. Arithmetic admissibility consists of islands and cliffs

Integral lattices and finite codes do not occupy smooth open regions. Their defining properties change discretely.

For the 24-edge backbone, the canonical graph form

\[
G_{\rm graph}=2I+B^TB
\]

is positive definite, integral, even and rootless, with minimum norm four. It therefore lies inside a broad **near-Leech region** defined by local metric inequalities.

But

\[
\det G_{\rm graph}
=2^{13}\cdot604{,}309{,}963
\ne1.
\]

The odd 2-adic valuation makes the determinant nonsquare, so no integral finite-index overlattice at fixed form can be unimodular. The Leech locus is separated by an arithmetic cliff, not a small continuous deformation inside the integral category.

The code chart behaves similarly. The graph canonically gives

\[
\mathcal C_{\rm graph}=[24,12,2],
\]

whereas the extended Golay orbit has

\[
G_{24}=[24,12,8]
\]

and is self-dual and doubly even. The two graph-code words of weight two are exact short-cycle obstructions. Moving to Golay requires a new nonlocal admissibility rule; relabelling or a perturbative adjustment cannot cross this boundary.

## 5. Dynamical bounds turn intersections into basins

Static admissible sets acquire thickness, rates and memory when iterated.

For two linear constraints with principal angle \(\theta\), alternating projection contracts transverse errors at rate

\[
r=\cos^2\theta.
\]

This defines three dynamical strata:

- \(0\le r<1\): attractive selection;
- \(r\approx1\): a soft, slowly relaxing near-tangency region;
- \(r=1\): a neutral direction or redundant constraint.

The two-rail model shows that contracting mismatch does not remove a common neutral mode. An independent boundary/history record is needed for strict contraction. Spatial stiffness and a bistable record then turn that retained coordinate into a wall. Topology changes only relative to the admitted interpolation space: adding a second mass or deformation can reconnect apparently separate sectors.

Thus the dynamical admissibility boundary is often a basin boundary or a gap-closing wall, not the boundary of the static state cone.

## 6. Orientation is a double cover over the projective interval

For two real rank-one projectors,

\[
t=\operatorname{Tr}(PY)=\cos^2\theta\in[0,1]
\]

is the unoriented coordinate, while

\[
\chi=\sin2\theta,
\qquad
\chi^2=4t(1-t)
\]

is its oriented lift. Away from \(t=0,1\), the oriented space has two sheets \(\chi=\pm2\sqrt{t(1-t)}\). At the endpoints the sheets meet and orientation disappears.

Equilibrium scalars built from only the two projectors descend to the interval and cannot distinguish the sheets. A wall pseudoscalar, loop orientation or coherent phase reference is additional bundle data that can retain the sign.

This makes the orientation bound literally a branched double cover rather than another coordinate interval.

## 7. Detection folds and contracts the zone

A detector observes equivalence classes, not latent states. For parameter-independent Markov folding,

\[
I_{\rm obs}\le I_{\rm latent},
\]

with information loss equal to conditional score variance.

For the branch-label detector,

\[
O_{\rm obs}=(1-2\epsilon)O.
\]

The plane \(\epsilon=1/2\) is an exact orientation-erasure fold:

- below it the sign is retained;
- at it the two orientation sheets become observationally identical;
- above it the observed sign reverses because labels are more often wrong than right.

No estimator can reconstruct orientation on the erasure plane without another detector face. This is an inference boundary even when theory and apparatus dynamics remain perfectly well defined.

## 8. Translation frontiers are missing arrows

The strongest current obstruction is not a violated inequality. It is the absence of a canonical map between carriers.

The corpus has:

- a genuine Leech lattice in \(\mathbb O^3\);
- a rigid 24-coordinate relation backbone;
- a Jordan cubic and rank stratification;
- graph composition and cycle data;
- finite Golay seam information.

It does not have a source-derived map

\[
B_{24}\longrightarrow\mathbb O^3
\]

that transports an integral Gram, multiplication and cubic. Nor does it have a physical representation of the relevant source symmetry on the target mediator or detector carrier.

This frontier should be drawn as a broken arrow between filled charts, not as a fuzzy boundary inside either chart.

## 9. The resulting local atlas

| Boundary shape | Exact corpus object | Filled side | Excluded or open side |
|---|---|---|---|
| convex cone | Jordan positivity | positive response/state | negative or indefinite directions |
| rank/discriminant strata | \(\det=0\), \(x^\#=0\) | full-rank interior and typed boundary | untyped crossing |
| Morse–Bott orbit | exceptional quartic | normalized rank-one orbit | unique point selection remains open |
| transverse linear arrangement | cycle/incidence and constructive/guardrail splits | exact dimensions and mixed quotient | exceptional module identification open |
| arithmetic cliff | determinant/unimodularity | even rootless graph lattice | fixed-form Leech completion excluded |
| code island | finite Grassmannian orbit | canonical \([24,12,2]\) graph code | direct Golay identification excluded |
| basin boundary | projection and return maps | spectral radius below one | neutral or hysteretic regimes |
| branched cover | \((t,\chi)\) | oriented lift with extra datum | projective equilibrium loses sign |
| detector fold | \(\epsilon=1/2\) | identifiable odd record | exact observational erasure |
| topological wall | metastable record plus restricted interpolation | disconnected admitted sectors | reconnection under enlarged deformation space |
| translation gap | missing intertwiner | each carrier separately defined | common physical identification unfilled |

## 10. Known bounds and unknown bounds

### Known theory bounds

- positivity and rank strata of the Jordan cones;
- selector stability \(\lambda,\kappa>0\) and \(|\mu|<\kappa v\);
- graph ranks, cycle dimensions and mixed-interface dimension;
- fixed-form determinant obstruction to Leech gluing;
- graph-code distance and failure of Golay self-duality;
- projection contraction \(r=\cos^2\theta\);
- exact orientation double-cover relation;
- detector information contraction and erasure at \(\epsilon=1/2\).

### Bounded but open theory regions

- a nonlocal 24-dimensional Gram may exist, but it must replace the incidence form;
- a Golay action may exist, but it must suppress all weights below eight and be source-derived;
- a cubic transport may exist, but it must reproduce the Jordan determinant and survive refinement;
- a wall-oriented selector coefficient may be measured, but current microscopic routes do not fix it universally.

### Unknown theory bounds

- the correct carrier on which graph relations become additive physical coordinates;
- whether the three special relations can become a Jordan frame;
- whether an exceptional cubic is induced by composition rather than imported;
- whether the arithmetic selector admits a controlled continuum or dynamical realization.

### Known experimental bounds

- matched reversal separates \(t\)-even from \(\chi\)-odd response;
- deliberate label randomization calibrates exact orientation erasure;
- rate and waiting-time scans separate quasistatic selection from hysteresis;
- tomography of both projectors is required before response fitting.

### Unknown experimental bounds

- no physical platform has yet implemented the complete three-record loop;
- signal scale and noise floor for the wall-pseudoscalar channel are not established;
- no experiment currently tests the graph-to-Leech or graph-to-Jordan translation;
- detector backaction and material-specific coefficient provenance remain platform dependent.

## 11. The shape in plain language

The present admissibility zone looks like a positive cone whose boundary contains symmetry orbits and lower-rank faces. Discrete arithmetic islands sit on or near that continuous carrier but cannot be reached by small integral deformations. Dynamics turns transverse intersections into attractive basins and turns persistent records into walls. Orientation lives on a two-sheeted cover that ordinary equilibrium and detector folding can collapse. Several charts are individually filled, but the arrows joining them remain open.

This is why repeated numbers are useful but insufficient. A dimension match locates neighbouring charts. An admissible physical theory requires a path that crosses every intervening boundary while transporting the relevant form, action, dynamics and observable.

## Next frontier

The next constructive target is now precise:

> Derive a nonlocal bilinear or cubic pairing on the 24 relation coordinates from an already physical composition law, then test whether its integral discriminant module contains the Golay glue data and whether adjoining three frame coordinates reproduces a positive rank-three Jordan sector.

Failure should be classified by which boundary is hit: positivity, short codewords, nonsquare discriminant, lack of cubic closure, noncanonical target action, dynamical neutrality or detector erasure.

## Machine-readable atlas

The companion [admissibility-bound-shape register](admissibility_bound_shape_v1.json) records each boundary's geometry, status, equation, filled side, excluded/open side and next gate.

