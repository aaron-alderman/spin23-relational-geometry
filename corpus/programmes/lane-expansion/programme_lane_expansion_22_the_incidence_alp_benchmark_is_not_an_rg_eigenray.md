# Lane Expansion 22: The Incidence ALP Benchmark Is Not an RG Eigenray

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, ALP phenomenology  
**Claim status:** minimal one-family/third-family embedding; direct application of published top-Yukawa ALP evolution; illustrative fixed-coupling numerical run  
**Certificate:** [verify_programme_incidence_alp_top_yukawa_flow.mjs](../../../verification/verify/verify_programme_incidence_alp_top_yukawa_flow.mjs)

## Result

The incidence current defines a legitimate ultraviolet ALP benchmark, but it does not define a direction preserved by Standard-Model running. This document uses the minimal embedding in which the displayed incidence charges are assigned to one family, identified with the third family for the top-Yukawa evolution. A generation-universal embedding has different anomaly traces and is treated separately in Result 23.

Translating the all-left-handed incidence charges

\[
(Q,u^c,d^c,L,e^c,N^c)=(5,5,1,1,1,0)
\]

to the conventional right-handed ALP basis gives the physical third-family chirality-changing couplings

\[
\boxed{(c_{tt},c_{bb},c_{\tau\tau})=(-10,-6,-2).}
\]

If there are no independent ultraviolet ALP–gauge operators, the chiral anomalies of this one-family embedding nevertheless give the effective coefficients

\[
\boxed{
(\widetilde c_{GG},\widetilde c_{WW},\widetilde c_{BB})
=\left(-8,-8,-\frac{28}{3}\right).
}
\]

The published top-Yukawa evolution changes these four quantities by different proportions. Therefore

\[
\boxed{
(\widetilde c_{GG},\widetilde c_{WW},\widetilde c_{BB},c_{tt})
\text{ is not an RG eigenray.}
}
\]

## 1. Translating conventions

The programme uses only left-handed Weyl fields. A conventional ALP Lagrangian uses left-handed doublets but right-handed singlets. Charge conjugation reverses the singlet phase charge, so

\[
c_Q=x_Q,qquad c_u=-x_{u^c},\qquad
c_d=-x_{d^c},qquad c_L=x_L,qquad c_e=-x_{e^c}.
\]

The physical diagonal fermion couplings are differences:

\[
c_{tt}=c_u-c_Q=-10,qquad
c_{bb}=c_d-c_Q=-6,qquad
c_{\tau\tau}=c_e-c_L=-2.
\]

These are the signed version of the first three entries in the incidence image \((10,6,2,1)\).

Using the anomaly conversion formulas of the standard ALP basis, and setting the independent coefficients \(c_{GG}=c_{WW}=c_{BB}=0\), gives the three effective gauge couplings displayed above. Assigning the same charges to all three generations triples these anomaly traces; it does not triple the physical per-fermion couplings.

This distinction is important. “No explicit gauge operator” does not mean “no decay amplitude to gauge bosons”; fermion rotations supply anomaly contributions.

## 2. The smallest published RG subsystem

Keep the top Yukawa and neglect gauge feedback into \(c_{tt}\). Define

\[
E(\mu,\Lambda)=e^{-18U(\mu,\Lambda)},
\qquad
U=-\int_\Lambda^\mu\frac{d\mu'}{\mu'}
\frac{y_t^2(\mu')}{32\pi^2}.
\]

The published solution is

\[
c_{tt}(\mu)=E\,c_{tt}(\Lambda),
\]

\[
\widetilde c_{GG}(\mu)
=\widetilde c_{GG}(\Lambda)
-\frac{2}{9}(1-E)c_{tt}(\Lambda),
\]

\[
\widetilde c_{WW}(\mu)
=\widetilde c_{WW}(\Lambda)
-\frac{1}{6}(1-E)c_{tt}(\Lambda),
\]

\[
\widetilde c_{BB}(\mu)
=\widetilde c_{BB}(\Lambda)
-\frac{17}{54}(1-E)c_{tt}(\Lambda).
\]

The coefficients \(2/9\), \(1/6\) and \(17/54\) are unequal, so a generic initial vector cannot simply rescale.

## 3. Numerical diagnostic

For an intentionally simple check, hold \(y_t=1\) fixed and run from \(10\) TeV to \(100\) GeV. The certificate obtains

\[
E\simeq0.769.
\]

The benchmark moves approximately from

\[
\left(-8,-8,-9.333,-10\right)
\]

to

\[
\left(-7.487,-7.615,-8.606,-7.691\right).
\]

The four component scale factors are unequal. This calculation is not a precision run: it freezes \(y_t\) and omits gauge feedback. Those refinements cannot restore a symmetry that is already absent in the simpler subsystem except by accidental tuning.

## 4. What does remain invariant

In this top-only subsystem, three affine combinations are constant:

\[
I_G=\widetilde c_{GG}-\frac{2}{9}c_{tt},
\]

\[
I_W=\widetilde c_{WW}-\frac{1}{6}c_{tt},
\]

\[
I_B=\widetilde c_{BB}-\frac{17}{54}c_{tt}.
\]

For the incidence initial condition,

\[
(I_G,I_W,I_B)
=\left(-\frac{52}{9},-\frac{19}{3},-\frac{167}{27}\right).
\]

These invariants are useful checks on an implementation, but they are not incidence-specific. Every ALP initial condition has values for the same three combinations. Gauge feedback and the remaining Yukawas enlarge the coupled system.

## 5. Honest interpretation

The incidence construction now has a clear status:

- it supplies a one-parameter ultraviolet benchmark once an overall ALP scale is chosen;
- the Standard Model turns it into a calculable trajectory through coupling space;
- it does not supply an RG-protected ratio of top, gluon, weak and hypercharge couplings;
- any phenomenological distinctiveness must come from the full correlated trajectory, not from a fixed ray.

This is still useful. Experimental ALP studies often compare named ultraviolet benchmarks after RG evolution and threshold matching. The incidence pattern can be treated in exactly that way. But its claim to specialness must be tested against other charge assignments, rather than inferred from its integer coefficients.

## 6. Next discriminating comparison

Construct a basis-invariant distance between the evolved incidence benchmark and standard ALP charge models—KSVZ-like, DFSZ-like, fermion-universal, top-philic and anomaly-only—over a grid of ultraviolet scales and ALP masses.

**Go:** the correlated low-energy ratios occupy a region not reproduced by simpler benchmark families and point to a distinctive combination of collider and flavor searches.

**No-go:** after allowing independent anomaly coefficients and basis transformations, the incidence trajectory lies inside an already generic benchmark family.

## Primary source

The equations used here are equations (26)–(28) of [Bauer, Neubert, Renner, Schnubel and Thamm, *The Low-Energy Effective Theory of Axions and ALPs*](https://arxiv.org/abs/2012.12272). That work also shows the universal top-induced admixture into lighter fermion couplings and performs weak-scale matching. This document applies their result to the programme's charge vector; it does not claim a new ALP anomalous dimension.

## Reproducibility

```powershell
node scripts\verify_programme_incidence_alp_top_yukawa_flow.mjs
```
