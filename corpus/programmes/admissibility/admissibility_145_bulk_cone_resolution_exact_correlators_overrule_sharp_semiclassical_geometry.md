# Bulk-cone resolution: exact correlators overrule sharp semiclassical geometry

**Date:** 26 October 2026

**Status:** established external holographic no-go integrated as a corpus admissibility gate; no direct Spin(2,3) bridge

**Parents:** [typed Wick continuation](admissibility_21_quarter_turn_wick_goldstone_cloud_and_open_closure.md), [spectral boundary dynamics](admissibility_51_spectral_boundary_dynamics_free_bloch_efimov_casimir.md), [observer/horizon/channel atlas](admissibility_140_observer_horizon_channel_atlas_and_exhaustion.md), [large-N order-of-limits witness](../../claims/1600-1699/1604_large_n_volume_reduction_reconstructs_planar_momenta_but_does_not_transport_a_finite_n_mass_gap.md), [holographic dimensional firewall](../../claims/1600-1699/1606_a_holographic_hard_wall_generates_a_gap_but_imports_the_infrared_scale_and_an_extra_ads_dimension.md)

**Primary source:** Almheiri, Dodelson and Komargodski, [*Quantum gravity on the bulk cone*](https://arxiv.org/abs/2610.31610)

## Result

A classical asymptotically AdS geometry can contain a null geodesic that leaves
the boundary, winds near a photon sphere and returns to a timelike-separated
boundary point. Semiclassical propagation assigns its arrival a bulk-cone
singularity of the form

\[
G_\beta(t,\theta)\sim
\frac{1}{(t_{\rm bulk}(\beta,\theta)-t+i0)^\gamma}.
\]

The exact finite-\(G_N\) boundary theory does not admit that sharp record.
At finite \(G_N\), the singularity is excluded in individual microstates by
radial-OPE convergence and in the finite-volume thermal state by joint
analyticity in time and inverse temperature. In an explicit AdS\(_3\) shock
geometry, a finite-central-charge Virasoro-block calculation replaces the
classical singularity by a smooth peak. Averaging the classical answer over
the state-prepared distribution of geometries reproduces that smoothing with
high accuracy in the tested regime.

This is an established example of admissibility correcting an emergent
geometric prediction:

\[
\boxed{
\text{semiclassical bulk path}
\;\longrightarrow\;
\text{candidate sharp record}
\;\xrightarrow{\text{exact convergence and analyticity}}\;
\text{finite-width quantum record}.}
\]

## Microstate gate: convergence fixes the singular support

For a heavy-state two-point function, introduce the radial coordinate

\[
\rho(z)=\frac{1-\sqrt{1-z}}{1+\sqrt{1-z}}.
\]

The heavy--light OPE converges absolutely for
\(|\rho|,|\bar\rho|<1\). After continuation from Euclidean cylinder time to
Lorentzian time, every real configuration remains inside this domain except
when \(z=1\) or \(\bar z=1\). Those exceptions are precisely the boundary
light-cone returns

\[
\frac{t}{R}=2\pi k\pm\theta.
\]

Consequently an exact finite-\(G_N\) microstate correlator cannot have an
additional singularity at the timelike location predicted by a returning bulk
ray. The large-\(N\) light--light expansion can still generate that
singularity after leaving its convergence domain; the sharp bulk cone is thus
an asymptotic-channel feature, not the singular support of the exact record.

## Thermal gate: temperature becomes an analytic constraint

At finite spatial volume, the unnormalized thermal Wightman function is jointly
analytic in complex inverse temperature and time in the tube

\[
\operatorname{Re}\beta>0,
\qquad
-\operatorname{Re}\beta<\operatorname{Im}t<0,
\]

away from partition-function zeros. Suppose a proposed bulk-cone singularity
has a real, locally analytic, temperature-dependent arrival time
\(t=T(\beta)\). If \(T\) is nonconstant, the open-mapping theorem sends a
complex neighbourhood of \(\beta\) to an open neighbourhood of \(T(\beta)\),
which necessarily enters the analytic time tube. The proposed singularity
therefore contradicts the exact correlator's analyticity.

The conclusion is deliberately narrower than “no timelike singularity of any
kind.” A temperature-independent exceptional locus with an amplitude that
vanishes at zero temperature is not excluded by this particular argument.
The black-hole bulk-cone arrival varies with temperature, so it is excluded.
Finite volume is essential to the analytic statement.

## Why finite \(G_N\) smooths the record

In the thermal heuristic, the state carries a distribution over black-hole
mass and hence over arrival times. Linearizing \(t_{\rm bulk}(M)\) around the
thermal saddle produces the frequency-space factor

\[
\exp\!\left[
-\frac{(t'_{\rm bulk}(M(\beta)))^2C}{2\beta^2}\,\omega^2
\right].
\]

At strict large \(N\), this factor is discarded and the singularity returns.
At large but finite \(N\), it suppresses arbitrarily high frequencies and
broadens the arrival on a scale of order \(1/N\). The paper's AdS\(_3\)
calculation gives a more concrete realization: the prepared heavy state is a
superposition of geometries with different ADM energy, angular momentum and
arrival time, and its geometry average closely tracks the finite-\(c\) peak.

This licenses a bounded configuration-space reading. Geometry is one of the
quantum-distributed configurations entering the observable. It does not
license a universal claim that every spacetime effect is thermal averaging or
that one classical metric is physically unreal.

## Corpus grammar

| Corpus role | Object in the bulk-cone problem |
|---|---|
| carrier | the exact finite-\(G_N\) CFT correlator and state |
| geometric face | the semiclassical bulk saddle and its returning null ray |
| selector | the choice of state, channel, volume, temperature and order of limits |
| detector | singular support, peak location, width and channel-consistent correlator record |
| admissibility gate | OPE convergence, positivity and joint \((t,\beta)\) analyticity |
| quotient scar | the sharp bulk-cone singularity retained after taking the classical/large-\(N\) limit first |

The dual descriptions are not interchangeable term by term. Bulk geometry is a
powerful reconstruction face, but the exact boundary observable decides which
of its sharp features survive as records.

## Exact-record gate

Any corpus claim that promotes an emergent geometric path, pole, horizon
return, defect or singularity must now answer:

1. **Observable:** what exact correlator or detector record carries the claim?
2. **Convergence:** in which channel and domain is that observable controlled?
3. **Continuation:** what typed Euclidean-to-Lorentzian prescription is used?
4. **Limits:** does the feature survive finite coupling, finite \(N\), finite
   central charge and the declared volume limit?
5. **Ensemble width:** do state or geometry fluctuations broaden, shift or erase
   the proposed sharp record?
6. **Dictionary:** is the bulk/boundary map established for the dimensions,
   fields and boundary conditions actually being claimed?

A failure at any rung does not prove the geometry useless. It bounds the
feature as a semiclassical reconstruction rather than an exact observable.

## Spin(2,3) boundary

The principal black-hole argument is presented for AdS\(_5\)/CFT\(_4\), whose
bulk isometry is \(SO(2,4)\), and the explicit finite-central-charge example is
AdS\(_3\). Neither is a derivation in AdS\(_4\), whose isometry double cover is
\(Spin(2,3)\). The paper therefore supplies a method and an exact warning for
the Spin(2,3) programme, not a Spin(2,3) realization.

The legitimate continuation is to apply the exact-record gate to an
AdS\(_4\)/CFT\(_3\) correlator in a declared model. Group proximity, the word
“cone,” or a common null-geodesic picture is not a bridge.

## Computational continuation

Choose a finite-central-charge or otherwise nonperturbatively controlled
holographic correlator with a known classical bulk return. Preregister the
classical arrival locus, compute the exact or systematically converged record,
and measure peak position, width and height against central charge. Compare
that result with an independently specified ensemble over the prepared bulk
charges. Advance only if one shared distribution predicts the complete peak
shape and its scaling without refitting each record.

### Go / no-go

- **Go for established holographic smoothing:** the exact correlator is regular
  where the classical saddle is singular and the width follows the controlled
  finite-\(G_N\) calculation.
- **Go for a geometry-ensemble mechanism:** the independently derived state
  distribution predicts the finite-\(G_N\) peak across several preparations.
- **Go for a Spin(2,3) bridge:** an AdS\(_4\)/CFT\(_3\) model supplies the typed
  dictionary and passes the same exact-record gate.
- **No-go for promotion:** only a classical geodesic, large-\(N\) channel or
  verbal “fuzziness” analogy is supplied.

## Literature boundary

- Almheiri, Dodelson and Komargodski,
  [*Quantum gravity on the bulk cone*](https://arxiv.org/abs/2610.31610), for
  the finite-\(G_N\) no-go, joint thermal analyticity and explicit finite-\(c\)
  smoothing example.
- Pappadopulo, Rychkov, Espin and Rattazzi,
  [*OPE Convergence in Conformal Field Theory*](https://arxiv.org/abs/1208.6449),
  for the nonperturbative convergence foundation used by the microstate gate.
- Hogervorst and Rychkov,
  [*Radial Coordinates for Conformal Blocks*](https://arxiv.org/abs/1303.1111),
  for the radial coordinate that exposes the enlarged convergence domain.
- Hubeny, Liu and Rangamani,
  [*Bulk-cone singularities and signatures of horizon formation in AdS/CFT*](https://arxiv.org/abs/hep-th/0610041),
  for the original bulk-cone construction and its boundary signature.

## Implication

Quantum gravity need not wait for a curvature singularity to modify the
classical record. Exact consistency can smooth the signature of a benign null
trajectory that remains outside the horizon and photon sphere. The frontier is
therefore not only “what geometries are possible?” but “which distinctions made
by an approximate geometry remain admissible in the exact detector algebra?”
