# Exceptional loops: topology is not the selected endpoint

**Date:** 25 October 2026  
**Status:** declared two-mode simulation closed; physical reversal protocol specified  
**Topic:** OT-013  
**Parents:** [wide frontier atlas](admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md), [adversarial detector atlas](admissibility_35_adversarial_detector_equivalence_atlas.md)  
**Evidence:** [dynamical-loop ledger](../../../evidence/data/admissibility-exceptional-loop-dynamics-v1.json)  
**Generator:** [loop evolution](../../../scripts/run-admissibility-exceptional-loop-dynamics.mjs)  
**Verifier:** [dynamical-loop certificate](../../../verification/admissibility/verify_exceptional_loop_dynamics.mjs)

## Result

An exceptional-point loop contains two different objects that are often described with the same picture:

- the **instantaneous spectral topology**, which says how eigenvalue and eigenvector sheets are connected around the degeneracy; and
- the **driven state evolution**, which says which state survives after gain, loss, finite rate and nonadiabatic transfer act along the path.

They need not agree. In the declared two-mode model, the spectral discriminant winds once and its square root changes sign. Quasistatic analytic continuation therefore exchanges the two instantaneous eigenstate sheets after one loop in either orientation. Direct time evolution instead becomes direction-selective and erases the initial state as the loop is slowed. The same loop is a symmetric sheet permutation as a spectral object and an asymmetric selector as a driven propagator.

This closes the central ambiguity in OT-013. Endpoint switching alone is not a topology measurement.

## Declared model

Use

\[
H(t)=
\begin{pmatrix}
\delta(t)+i\gamma & g(t)\\
g(t) & -\delta(t)-i\gamma
\end{pmatrix},
\]

with

\[
\delta(t)=r\sin\theta(t),\qquad
g(t)=\gamma+r\cos\theta(t).
\]

The exceptional point is at \((\delta,g)=(0,\gamma)\). The calculation uses \(\gamma=1\), \(r=1/2\), both orientations, both initial eigenstates and loop periods \(1,4,16,64\). Evolution obeys

\[
\frac{d\psi}{dt}=-iH(t)\psi.
\]

Intermediate normalization prevents numerical overflow but does not alter the projective endpoint. Final populations are obtained by decomposing the state in the complete right-eigenvector basis at the common start/end Hamiltonian; the inverse basis supplies the biorthogonal dual coefficients.

## Topological prediction

The eigenvalues are

\[
\lambda_\pm=\pm\sqrt{g^2+(\delta+i\gamma)^2}.
\]

The quantity under the square root winds around zero once. Analytic continuation therefore changes the sign of the square root and exchanges \(\lambda_+\leftrightarrow\lambda_-\). Reversing the loop reverses the winding but still changes sheets after one circuit. A second circuit returns the sheet.

That is a statement about the family of instantaneous matrices. It does not yet predict the state obtained by solving the time-dependent equation.

## Dynamical result

At period one, the endpoint retains substantial memory of the input: for the clockwise loop, the final plus population is approximately \(0.9080\) from the plus input and \(0.2273\) from the minus input. The difference is approximately \(0.6807\).

At period sixteen, both clockwise inputs end with plus population approximately \(0.996626\), while both counterclockwise inputs end with minus population approximately \(0.996626\). By period sixty-four, the initial-state difference is numerically zero at the recorded precision; clockwise selects the plus endpoint above \(0.9998\), and counterclockwise selects the minus endpoint above \(0.9998\).

Slowing the loop therefore does not recover the naive symmetric state exchange in this driven model. It strengthens direction-dependent initial-state erasure. The state that experiences the more favorable accumulated imaginary eigenvalue dominates, and nonadiabatic jumps determine which branch receives that advantage.

## What must be measured

A decisive experiment needs two ledgers.

The spectral ledger must retain:

- the complex eigenvalue braid;
- right and biorthogonal left eigenvectors;
- discriminant winding and a double-loop return;
- exceptional-point location and uncertainty.

The dynamical ledger must retain:

- both initial eigenstates;
- both loop orientations;
- at least three loop periods;
- time-resolved branch populations and nonadiabatic jumps;
- unnormalized transmitted intensity or probability before projective normalization;
- the independently reconstructed gain/loss spectrum along the loop.

The null controls are an EP-excluding loop with comparable imaginary-spectrum exposure and a loop whose nonunitary spectrum is altered without changing its winding. Chiral transfer that survives only as a function of gain/loss exposure belongs to dynamic selection. Sheet exchange that survives quasistatic spectral reconstruction belongs to topology.

## Current experimental frontier

Dynamic exceptional-point encircling has already produced asymmetric switching in microwave and photonic platforms. Later experiments showed that chiral state transfer can occur on EP-excluding cycles, so chirality alone is not a winding certificate. A 2026 photonic experiment can switch the same platform between symmetric adiabatic and chiral nonadiabatic transfer by changing the path design. Separately, the 2026 active acoustic lattice reconstructs complex eigenfrequencies, right and left eigenstates, braid charge and biorthogonal Berry phase across a nonorientable Brillouin zone.

Together these precedents mean the required measurements are realistic. They do not mean the complete paired reversal/rate/nonunitarity protocol has already been run for the corpus target.

## Open and closed

Closed:

- exceptional-point winding does not uniquely determine the dynamically selected endpoint;
- direction-selective endpoint transfer is not uniquely caused by encircling an exceptional point;
- projectively normalized endpoint images discard the gain/loss record needed to identify selection;
- the declared two-mode model exhibits a verified crossover from input-sensitive fast evolution to direction-selected slow evolution.

Executable now:

- reproduce the declared matrix evolution on a programmable two-mode photonic, acoustic, microwave or electrical platform;
- reverse orientation and vary period while reconstructing the same complex spectrum;
- compare an EP-enclosing loop with a gain/loss-matched EP-excluding loop.

Open:

- instantiate the protocol with measured device parameters and uncertainty;
- establish whether a chosen platform can independently change imaginary-spectrum exposure while retaining the same winding;
- extend the discriminator to higher-order exceptional points and nonorientable momentum spaces;
- attach a thermodynamic or controller-cost ledger where active elements maintain the non-Hermitian couplings.

## Implication

This is another concrete boundary between transport and selection. The topology tells us which alternatives are connected when the parameter family is followed. The dynamics tells us which alternative remains visible after amplification, attenuation and nonadiabatic transfer. A useful device may exploit the latter, but a physical interpretation must not credit the topology with work done by the active nonunitary environment. New physics would require a residual common law across independently reconstructed spectral and dynamical ledgers, not merely a striking state flip.

## Literature boundary

- Doppler et al., [*Dynamically encircling an exceptional point for asymmetric mode switching*](https://www.nature.com/articles/nature18605), establish the experimental dynamical-encircling precedent.
- Hassan et al., [*Observation of chiral state transfer without encircling an exceptional point*](https://www.nature.com/articles/s41586-022-04542-2), show that chiral transfer is not unique to nonzero EP winding.
- Zhang et al., [*Observation of Restored Adiabatic State Transfer in Time-Modulated Non-Hermitian Systems*](https://www.nature.com/articles/s41467-026-72751-8), demonstrate symmetric and chiral regimes in one programmable platform.
- Wang et al., [*Counterintuitive collision of exceptional points on nonorientable manifolds*](https://www.nature.com/articles/s41467-026-76508-1), provide the complex-spectrum and biorthogonal-eigenstate tomography precedent.

## Reproduction

~~~powershell
node scripts/run-admissibility-exceptional-loop-dynamics.mjs --write
node verification/admissibility/verify_exceptional_loop_dynamics.mjs
~~~
