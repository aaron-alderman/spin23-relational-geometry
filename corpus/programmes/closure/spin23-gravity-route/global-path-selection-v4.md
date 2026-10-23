# Spin(2,3) Global Path Selection v4: Hadronic Matching

**Frozen:** 23 October 2026

## Reopening

Version 3 identified hadronic matching as an external boundary.  Version 4
crosses the part of that boundary that public lattice-QCD input actually
permits: the zero-momentum map from light-quark axial coefficients to proton
and neutron coefficients.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| HU | Universal \(u,d,s\) witness | completed | \(c_p=c_n=0.049025\) for \(c_q=1/8\) |
| HG | General \(u,d,s\to p,n\) map | completed | rank two; kernel \((1,1,9.56332)\) |
| HD | Recover three quark coefficients from \(p,n\) | rejected | two nucleon projections cannot identify three coefficients |
| EP | Numerical electron-proton curve | externally blocked | author response table or controlled digitization |
| H3 | Third hadronic flavor projection | externally blocked | specified linearly independent observable |
| RG | Singlet/heavy-threshold matching | externally blocked | UV Wilson coefficients, scale and scheme |
| UV | Parent-theory flavor prediction | externally blocked | broken-parent derivation of \(A,B,c_f\) |

## Decision

The universal witness yields

\[
c_p=c_n={1\over8}(\Delta u+\Delta d+\Delta s)=0.049025
\]

and translates the 2025 electron-neutron point to
\(\sqrt A>70.026\) GeV.  This is weaker than the direct electron-electron
constraint and is conditional on universal light-quark coefficients.

The general map proves a stronger structural statement:

\[
(c_u,c_d,c_s)\sim(c_u,c_d,c_s)+\lambda(1,1,9.56332)
\]

for every proton/neutron dipole observable.  Adding an electron-proton curve
would improve two-dimensional flavor tomography but cannot determine the
third direction.

## Stopping status

The locally executable, model-independent hadronic continuation is exhausted.
The stop is not a claim that all possible physics has been calculated.  It is
an audited input boundary: the remaining branches need information absent from
the repository and absent from the critical low-energy action—numerical
apparatus response data, a new independent flavor projection, or UV Wilson
coefficients with scale and scheme.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_universal_light_quark_nucleon_matching.mjs
node verification/verify/verify_spin23_nucleon_axial_flavor_map.mjs
node verification/verify/verify_spin23_hadronic_path_selection_v4.mjs
~~~
