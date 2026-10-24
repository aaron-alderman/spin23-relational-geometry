# Thermal Hall discriminator: activation order and the moving crossing

**Date:** 25 October 2026  
**Status:** minimum discriminating coordinates specified; same-specimen data required  
**Topic:** OT-011  
**Parents:** [hybrid bosonic frontier](admissibility_33_hybrid_bosonic_carrier_and_adversarial_thermal_hall_frontier.md), [adversarial detector atlas](admissibility_35_adversarial_detector_equivalence_atlas.md)  
**Evidence:** [discriminator ledger](../../../evidence/data/admissibility-thermal-hall-discriminator-v1.json)  
**Generator:** [activation and tracking calculation](../../../scripts/run-admissibility-thermal-hall-discriminator.mjs)  
**Verifier:** [discriminator certificate](../../../verification/admissibility/verify_thermal_hall_discriminator.mjs)

## Result

Thermal Hall response by itself does not reveal why heat turns sideways. A field-odd trace, a large Hall angle or a sign reversal can be produced by more than one mechanism. The corpus previously proposed avoided-crossing spectroscopy, linewidth and controlled disorder as the candidate bundle separating magnon-polaron Berry curvature from many-body magnon skew scattering. That bundle was directionally right but not minimal.

The correction is important: the 2025 many-body skew mechanism is **intrinsic and disorder-free**. Disorder control is still required to exclude impurity skew and side-jump backgrounds, but clean-limit persistence cannot distinguish the two named mechanisms. Linewidth is also shared evidence rather than a unique label. The nearest discriminating coordinates are instead:

1. the low-temperature **activation order**, with the relevant one-particle gap measured independently by spectroscopy; and
2. a **moving avoided crossing**, produced by a lattice-native intervention while the magnetic spectrum is measured as a nuisance control.

The first asks how many thermally occupied excitations the leading process requires. The second asks whether the Hall feature follows the place where magnon and phonon identities exchange.

## Why the headline signal collides

Li et al. model the low-temperature response of Na\(_2\)Co\(_2\)TeO\(_6\) using Berry curvature concentrated around magnon--phonon avoided crossings. The hybrid contribution can oppose a purely magnonic contribution and change the observed sign. Chatzichrysafis and Mook derive a different Hall current from interference between three- and four-magnon scattering channels. Their example has one magnon band and zero Berry curvature, yet its collision kernel breaks microscopic detailed balance and produces a transverse current.

Those are different pieces of physics with the same output port. One attaches transverse velocity to a hybrid band; the other attaches transverse asymmetry to collisions. The detector sees \(\kappa_{xy}\), not the mechanism label.

## Coordinate one: activation order

Write the low-temperature magnitude in the profiled form

\[
\log |\kappa_{xy}(T)| = a+p\log T-n\frac{\Delta_{\rm spec}}{T}.
\]

The amplitude \(a\) and algebraic prefactor \(p\) are nuisance parameters. The gap \(\Delta_{\rm spec}\) is not fitted from the Hall trace; it is frozen from same-specimen spectroscopy with its covariance. The dimensionless coordinate \(n\) then asks for occupation order.

- A leading one-quasiparticle hybrid-band Berry contribution has a single Boltzmann activation, so its asymptotic coordinate is \(n\approx1\).
- The many-body skew calculation derives \(\kappa_H\sim e^{-2\Delta/T}/T^2\) at low temperature, so its collision coordinate is \(n\approx2\).

The local calculation profiles \(a\) and \(p\) rather than pretending the power law is known. With two-percent noise in log response, an ideal deep window \(0.08\leq T/\Delta\leq0.25\) gives a formal standard error of about \(0.0123\) on \(n\); a narrow window \(0.20\leq T/\Delta\leq0.30\) degrades it to about \(0.197\). These are design sensitivities, not forecasts for a real material. They show why many temperatures in a shallow window cannot replace access to the activated regime.

This coordinate has a strict boundary. A fractional bias in the spectroscopic gap creates the inverse fractional bias in \(n\). A gap that changes identity across a phase transition, unresolved domains or a mixture of carriers can also spoil the interpretation. The gap and Hall data therefore require a joint covariance model even though the gap is independently sourced.

## Coordinate two: make the crossing move

Tune a phonon frequency using isotope substitution, controlled strain or another lattice-native intervention. On every setting, measure:

- the bare or asymptotically reconstructed magnon branch;
- the phonon branch;
- the avoided-crossing location and gap;
- \(\kappa_{xx}\) and \(\kappa_{xy}\);
- magnetization, domains, linewidths, geometry and contacts.

Subtract the directly measured magnetic-spectrum shift, then form

\[
R_{\rm track}=
\frac{dE_{\rm Hall}/du-dE_{\rm mag}/du}
     {dE_{\rm cross}/du-dE_{\rm mag}/du},
\]

where \(u\) is the intervention. In the idealized endpoints, a hybrid-band feature follows the moving anticrossing and gives \(R_{\rm track}\approx1\). A pure magnon-collision feature has no necessary locking to the phonon crossing and gives \(R_{\rm track}\approx0\). A mixture can lie between them and can vary with temperature.

This is not a universal theorem that skew scattering never changes under strain or isotope substitution. The point is that those indirect changes are measured through the magnetic spectrum and retained as nuisance tangents. The discriminating residue is phonon locking after those ordinary shifts are removed.

## Minimum executable experiment

Use one specimen architecture and preregister:

1. same-specimen field- and temperature-resolved \(\kappa_{xx}\) and \(\kappa_{xy}\);
2. spectroscopy resolving the relevant magnon gap, phonon branch and avoided crossing;
3. a low-temperature fit with \(\Delta_{\rm spec}\) frozen before Hall-model comparison;
4. at least three settings of a phonon-moving control, including a null or reversal where possible;
5. a joint mixture model containing both hybrid-band and many-body-skew terms;
6. linewidth, magnetization, domain, geometry, contact and disorder controls;
7. one held-out temperature or intervention setting.

The decision surface is two-dimensional:

| Activation coordinate | Tracking coordinate | Reading |
|---:|---:|---|
| near 1 | near 1 | hybrid-band mechanism supported |
| near 2 | near 0 | many-body skew mechanism supported |
| intermediate or temperature-dependent | intermediate or unstable | mixture, crossover or unresolved detector equivalence |

No quadrant is admitted from a best-fit point alone. It must survive the frozen spectroscopic covariance, held-out setting and nuisance projections.

## What is closed and what remains open

Closed:

- thermal Hall sign change is not a unique Berry-curvature tag;
- clean-limit persistence does not distinguish these two mechanisms;
- linewidth or avoided-crossing observation alone is insufficient;
- the prior disorder-centred bundle is not a minimal discriminator.

Specified but not executed:

- the activation-order coordinate;
- the nuisance-corrected moving-crossing coordinate;
- a same-specimen joint mixture and held-out test.

Open:

- select a material and lattice control whose intervention range moves the crossing without crossing an unrelated magnetic phase boundary;
- calculate the source-native hybrid-band and collision kernels for that material rather than using the asymptotic templates;
- propagate spectroscopic, thermal-gradient, contact and domain covariance into the two coordinates;
- determine whether the two mechanisms remain separable once their interaction and crossover terms are included.

## Implication

The practical frontier is not “measure thermal Hall more precisely.” It is “make the proposed cause move in a way its rival need not follow.” This is a direct example of the admissibility programme: the Hall trace admits several explanations; an independently measured gap and a controlled moving boundary reduce the allowed set. If the coordinates separate, the result is a mechanism-resolved piece of materials physics and a better quantum-geometry detector. If they do not, the honest result is an experimentally established equivalence class and a precise request for the next channel—not a failed search.

## Literature boundary

- Li et al., [*Magnon-Polaron Driven Thermal Hall Effect in a Heisenberg--Kitaev Antiferromagnet*](https://arxiv.org/abs/2201.11396), supply the hybrid-band mechanism and field/temperature response in Na\(_2\)Co\(_2\)TeO\(_6\).
- Chatzichrysafis and Mook, [*Thermal Hall Effect of Magnons from Many-Body Skew Scattering*](https://arxiv.org/abs/2407.00423), supply the disorder-free collision mechanism and its doubled low-temperature activation asymptotic.
- Bao et al., [*Direct observation of topological magnon polarons in a multiferroic material*](https://www.nature.com/articles/s41467-023-41791-9), demonstrate that momentum-resolved spectroscopy can directly resolve hybridization gaps and band inversion. This is a measurement precedent, not evidence that the proposed joint protocol has already been performed.

## Reproduction

~~~powershell
node scripts/run-admissibility-thermal-hall-discriminator.mjs --write
node verification/admissibility/verify_thermal_hall_discriminator.mjs
~~~
