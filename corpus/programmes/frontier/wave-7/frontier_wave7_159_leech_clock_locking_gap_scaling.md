# Frontier Wave 7.159: Leech Clock-Locking Gap Scaling

**Date:** 25 October 2026

**Status:** exact commuting-penalty spectrum and dynamic-range no-go; full edge dynamics open

**Evidence:** [clock-gap record](../../../../evidence/data/leech-clock-locking-gap-scaling-v1.json)

**Certificate:** [gap and thermal verifier](../../../../verification/verify/verify_leech_clock_locking_gap_scaling.mjs)

## Result

The wrap-free register ladder creates a second engineering question: does the
diagonal clock interaction retain a useful gap as \(p\) grows? For the direct
24-channel locking Hamiltonian

\[
 H_{\rm lock}=\sum_{i=1}^{24}u_p
 \left[1-\cos\left({2\pi d_i\over p}\right)\right],
\]

the exact first relative-label gap is

\[
 \Delta_p=2u_p\sin^2(\pi/p).
\]

Fixed \(u_p\) therefore gives \(\Delta_p\sim2\pi^2u_p/p^2\): the naïve
clock penalty closes precisely while the rotor cutoff is being improved.
Holding a target gap \(\Delta_\star\) instead requires

\[
 {u_p\over\Delta_\star}
 ={1\over2\sin^2(\pi/p)}
 \sim {p^2\over2\pi^2}.
\]

## Quantitative cost

| cutoff \(N\) | safe \(p\) | \(u_p/\Delta_\star\) |
|---:|---:|---:|
| 1 | 5167 | \(1.352531\times10^6\) |
| 2 | 10321 | \(5.396520\times10^6\) |
| 4 | 20639 | \(2.157981\times10^7\) |
| 8 | 41269 | \(8.628159\times10^7\) |
| 16 | 82529 | \(3.450511\times10^8\) |
| 32 | 165059 | \(1.380221\times10^9\) |
| 64 | 330131 | \(5.521319\times10^9\) |

From \(N=1\) to \(N=64\), the required dimensionless control range grows by
4082.21. This is a concrete no-go for treating a fixed-strength,
single-harmonic clock penalty as a uniformly gapped continuum route. It does
not invalidate the modular mixer; it says the interaction encoding must be
improved, rescaled, or replaced by a multiscale/rotor-native implementation.

## Thermal target

After rescaling to \(\Delta_\star\), the full relative-label partition
function can be summed exactly. For 24 independent channels, requiring the
probability that any channel is unlocked to be at most one percent gives

\[
 \beta\Delta_\star\ge 8.4711408484.
\]

At 10 mK this corresponds to

\[
 {\Delta_\star\over h}\ge1.76510\ {\rm GHz}.
\]

The commissioning measurement is a relative-label histogram with the mixer
disabled. No postselection is allowed: the observed probability of any
\(d_i\ne0\) must remain below one percent. This tests the locking layer before
one attributes failures to the Leech mixer or orbifold.

## Boundary and next design choice

This calculation covers only the exactly commuting penalty. It does not
include rotor kinetic energy, establish a sine-Gordon mass, or demonstrate a
two-dimensional gapped bulk and chiral edge. Its value is discriminatory:

- fixed clock coupling is ruled out as a cutoff-stable route;
- quadratic rescaling is exact but creates a severe control-range burden;
- rotor-native kinetic-plus-cosine dynamics or a multiscale encoding becomes
  the preferred next architecture.

The next certificate must therefore include a kinetic term and test a
nonvanishing many-body gap under simultaneous \(N\), \(p\), Trotter-step and
wire-length scaling.

## Corpus links

- [Wrap-free rotor-cutoff ladder](frontier_wave7_158_leech_wrap_free_rotor_cutoff_ladder.md)
- [Finite-qudit Leech mixer](frontier_wave7_157_leech_finite_qudit_channel_mixer.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Rotor-native pendulum-gap convergence](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
