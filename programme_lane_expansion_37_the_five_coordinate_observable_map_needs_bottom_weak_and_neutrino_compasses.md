# Result 37: the five-coordinate observable map needs bottom, weak and neutrino compasses

**Date:** 17 October 2026  
**Workstream:** direct-current observables and ALP phenomenology  
**Status:** exact linear identifiability result with experimentally typed proxy rows; full likelihood and detector covariances remain open  
**Certificate:** [verify_programme_five_coordinate_observable_map.mjs](scripts/verify_programme_five_coordinate_observable_map.mjs)

## Result in ordinary language

Result 35 reduced the current problem to five physical coordinates:

\[
z=(v_u,v_d,v_e,v_\nu;A_2).
\]

These are five directions on the map. Existing low-mass measurements do not provide five independent compass bearings.

- Rare kaon and \(B\)-meson production mostly point along the top/up direction.
- The ALP lifetime and charged-lepton branching fraction point along the charged-lepton direction.
- Radiative \(\Upsilon\) decay points along the bottom direction.
- A genuinely electroweak process is needed to isolate the weak-anomaly direction in a generic ALP theory.
- A neutrino-chirality process is required for the sterile-neutrino Yukawa direction.

The smallest clean visible map has rank four. The neutrino coordinate remains null. This is sufficient to test the common incidence relation and distinguish the two charged-lepton normalisations, but it is not sufficient to reconstruct the full five-coordinate ray.

## 1. Observable rows

At amplitude level, define the ideal channel rows

\[
T=(1,0,0,0,0),
\quad
B=(0,1,0,0,0),
\quad
L=(0,0,1,0,0),
\]

\[
N=(0,0,0,1,0),
\quad
W=(0,0,0,0,1).
\]

They mean:

| row | direct-current meaning | ALP proxy |
|---|---|---|
| \(T\) | up/top Yukawa-descendant absorption | rare \(K\) and \(B\) flavor-changing production |
| \(B\) | bottom Yukawa-descendant absorption | \(\Upsilon\to\gamma a\), or another bottom-sensitive process |
| \(L\) | charged-lepton descendant absorption | \(a\to e^+e^-\), \(a\to\mu^+\mu^-\), lifetime |
| \(N\) | neutrino-Yukawa/chirality absorption | neutrino helicity flip or a process producing the right-handed neutrino sector |
| \(W\) | weak topological spectral channel | an electroweak process sensitive to the \(aW\widetilde W\) amplitude |

For a direct vector source these rows label correlators or absorptive cuts. They are not claims that a new particle exists. For an ALP, the derivative coupling converts the current divergence into physical pseudoscalar and anomalous-gauge amplitudes.

## 2. The source-matched hypercharge-anomaly row

For a source current with no independent ultraviolet gauge counterterm, the pre-electroweak linear anomaly identities of Result 35 give

\[
P=(48,12,36,0,-18),
\]

so that

\[
A_{Y^2}=48v_u+12v_d+36v_e-18A_2.
\]

This is a hypercharge-anomaly coefficient, not literally the low-energy photon coefficient. After electroweak breaking, a photon amplitude receives a declared mixture of the weak and hypercharge anomaly coefficients plus fermion-threshold contributions. A sufficiently controlled neutral-gauge amplitude can therefore implement this row only after that matching is included.

This substitution is conditional. In a generic ALP EFT, independent weak and hypercharge gauge coefficients add nuisance coordinates. Then a low-energy photon rate does not determine \(A_2\).

## 3. Exact ranks and degeneracies

The production-plus-lepton core \((T,L)\) has rank two.

Adding the source-matched hypercharge-anomaly row gives

\[
\operatorname{rank}(T,L,P)=3.
\]

Its two exact null directions are represented by

\[
n_\nu=(0,0,0,1,0)
\]

and

\[
n_{bW}=(0,3,0,0,2).
\]

The second says that this one neutral-gauge anomaly row alone confuses a change in the bottom coordinate with a compensating change in the weak anomaly.

If source-derived anomaly matching is imposed, adding either \(B\) or \(W\) raises the visible rank to four and leaves only \(v_\nu\) null.

The clean channel-resolved set

\[
\boxed{(T,B,L,W)}
\]

has rank four. Adding \(N\) gives rank five.

## 4. Testing the incidence hypotheses

The two incidence points are

\[
z_d=(10,6,2,1;16),
\qquad
z_m=(10,6,4,1;16).
\]

Both obey the non-generic relation

\[
R(z)=A_2-v_u-v_d=0.
\]

The row set \((T,B,L,W)\) determines \(R\) and distinguishes the two points through the charged-lepton coordinate. It does not need \(v_\nu\) for either task.

Before running and threshold effects, the charged-lepton amplitudes differ by two and their pure leptonic rates by four:

\[
\frac{\Gamma_L(z_m)}{\Gamma_L(z_d)}=4.
\]

The full ALPaca calculation already found the more realistic scale-free production-times-lifetime separation

\[
\frac{\Xi_K(z_d)}{\Xi_K(z_m)}\simeq2.77
\]

at 100 MeV. Thus the lepton fork is not the principal missing direction; bottom and weak-anomaly information are.

## 5. Strict minimum versus experimentally honest minimum

### Source-current-matched ALP

If all of the following are assumed:

1. the ALP couples only through the declared current at the ultraviolet scale;
2. no independent gauge counterterm is admitted;
3. the matched neutral-gauge amplitude, rather than merely an unresolved diphoton upper bound, is known;

then \((T,L,P)\) plus **one** additional bottom or weak measurement has rank four. Algebraically, one new row is enough. Experimentally, \(P\) must first be reconstructed through electroweak matching; a bare diphoton rate is not automatically this row.

The best choice is the bottom row because it also tests the top-to-bottom part of the proposed ray. The weak coordinate can then be inferred from \(P\).

### Generic ALP EFT

If independent electroweak gauge coefficients are allowed, the neutral-gauge row contains extra nuisance parameters. Then neither a bottom measurement alone nor a weak measurement alone makes \(R\) identifiable.

The minimum defensible addition to the present top-plus-lepton programme is:

\[
\boxed{\text{one bottom-sensitive measurement plus one electroweak weak-anomaly measurement}.}
\]

Together with existing top-sensitive production and lepton lifetime information, these give the four visible coordinates needed to test \(R=0\) and the \(v_e=2\) versus \(4\) fork.

## 6. Rates do not automatically determine signs

At a nonzero benchmark, squared rates have the same **local** Jacobian rank as their underlying amplitudes. Globally, however, they identify \(z_i\) with sign-flipped alternatives.

For example,

\[
(10,6,2,1,16)
\quad\hbox{and}\quad
(10,-6,2,1,16)
\]

give identical ideal channel rates \((T^2,B^2,L^2,W^2)\), but only the first satisfies \(A_2=v_u+v_d\).

Therefore a signed test of the incidence relation requires at least one interference- or phase-sensitive observable linking the bottom and weak/top amplitudes. A matrix-valued direct-current cross-correlator could supply it. In an ALP analysis it must come from two coherent contributions to a common process, or from a global fit whose interference fixes the relative sign.

## 7. The neutrino null direction

Adding the neutrino row \(N\) is the only way to raise the ideal map from rank four to rank five.

In the minimal Dirac-neutrino branch, ALP emission through this coordinate is proportional to the neutrino Yukawa or mass. It is therefore fantastically suppressed. A heavy right-handed-neutrino process could be more favorable, but it changes the low-energy theory and may break continuous \(B-L\) through a Majorana mass.

For a representative \(m_\nu=0.1\) eV and \(f=10^6\) GeV, the chirality-flip amplitude scale is only

\[
\frac{m_\nu}{f}=10^{-16}.
\]

For the deduplicated incidence charges, the corresponding neutrino-to-electron partial-width scale is below

\[
\left(\frac{m_\nu}{m_e}\right)^2
\left(\frac{v_\nu}{v_e}\right)^2
\simeq9.6\times10^{-15},
\]

before phase-space qualifications. This makes the null direction quantitative rather than merely qualitative.

The practical conclusion is:

\[
\boxed{v_\nu\text{ is structurally physical but experimentally null in the present low-mass programme}.}
\]

This does not prevent testing the common incidence relation or the charged-lepton fork.

## 8. Concrete experimental gates

### Gate D1: bottom compass

Measure a bottom-sensitive ALP amplitude at the scale reach of the kaon programme.

- **Go:** the measurement independently constrains \(v_d/v_u\) near \(6/10\).
- **No-go at present sensitivity:** the existing Belle \(\Upsilon(1S)\) invisible bound is about 2190 times above the incidence prediction at \(f=10^6\) GeV.

### Gate D2: weak-anomaly compass

Measure an electroweak observable whose response is linearly independent of the low-energy photon combination—such as a controlled \(Z\gamma a\), \(WWa\), or electroweak associated-production amplitude in the applicable mass range.

- **Go:** it resolves the low-energy-orthogonal \(c_W-c_B\) direction and determines \(A_2\) after matching.
- **No-go:** it only repeats the same photon combination or is dominated by an unconstrained independent gauge counterterm.

### Gate D3: signed relation

Obtain one interference term fixing the relative orientation of \(A_2\) and \(v_u+v_d\).

- **Go:** the fitted signed residual \(A_2-v_u-v_d\) is consistent with zero and excludes the sign-reflected rate solutions.
- **No-go:** only absolute rates are available, leaving globally distinct sign assignments.

### Gate D4: lepton fork

Profile production and lifetime jointly.

- **Go:** the analysis separates \(v_e/v_u=1/5\) from \(2/5\), including running, acceptance and theory errors.
- **No-go:** nuisance profiling makes the two \(\Xi_K\) curves statistically indistinguishable.

### Gate D5: full quotient

Find a neutrino-chirality observable.

- **Go:** the map reaches rank five.
- **Expected no-go for the minimal light-Dirac branch:** the \(m_\nu/f\) suppression makes the row unobservable.

## 9. Programme consequence

The next experimental paper should not claim reconstruction of the full incidence ray. A defensible progression is:

1. test the top-to-lepton fork with rare-meson production times lifetime;
2. add a bottom compass;
3. add a genuinely electroweak, source-matched neutral-gauge compass;
4. require interference before claiming the signed relation;
5. report \(v_\nu\) as an explicit null coordinate unless the neutrino sector is enlarged.

This produces a falsifiable four-coordinate incidence test while keeping the unmeasurable fifth coordinate honest.

