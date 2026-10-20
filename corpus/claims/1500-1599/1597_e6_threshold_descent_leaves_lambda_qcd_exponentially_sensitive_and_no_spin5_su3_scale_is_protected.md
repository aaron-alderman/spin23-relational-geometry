# E6 Threshold Descent Leaves Lambda QCD Exponentially Sensitive and No Spin(5)--SU(3) Scale Is Protected

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** explicit one-loop threshold descent, analytic sensitivity theorem, compact-group counterexample and shared-modulus no-go; complete E6 spectrum and nonperturbative matching remain open

**Depends on:** [the compact-real-form/internal-unification audit](1592_compact_real_forms_and_internal_branching_do_not_transport_the_yang_mills_mass_gap.md) and [the joined mass-gap investigation](1594_the_joined_mass_gap_investigation_closes_every_shortcut_and_leaves_five_irreducible_proof_arms.md)

**Evidence:** [threshold/shared-scale ledger](../../../evidence/data/spin23-e6-threshold-shared-scale-no-go.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_threshold_shared_scale_no_go.mjs)

## Result

The internal-descent and shared-scale arms can be taken substantially farther than representation branching. An explicit one-loop calculation gives a QCD-sized scale for one declared toy point, but also proves why that number is not predicted:

\[
\boxed{
E_6\text{ branching}
+\text{ one-loop matching}
\not\Rightarrow
\Lambda_{\rm QCD}\text{ without }\alpha_U,\text{ masses and finite thresholds}.}
\]

The same audit closes the apparent compact-group shortcut. Pure \(Spin(5)\) and \(SU(3)\) have equal \(C_A=3\), hence equal pure-Yang--Mills \(b_0=11\), but one allowed matter threshold splits their transmutation scales. There is no direct embedding index relating the two groups, and a common parent fixes at most a boundary normalization unless it also controls the complete spectra and thresholds.

Finally, one modulus \(v\) can cancel from a ratio of color and gravitational scales. It does **not** fix that ratio: the undetermined gauge coupling remains in an exponential and the gravitational normalization remains as an independent power.

## Declared E6 color toy

Use the standard branch

\[
27=16_1+10_{-2}+1_4,
\qquad
16\to10+\overline5+1,
\qquad
10\to5+\overline5.
\]

Take three chiral \(27_F\) families. Below E6 breaking, retain the six Standard Model Dirac color flavors and the three vectorlike Dirac color-triplet pairs supplied by the three \(10_{-2}\) branches. Put those exotic pairs at a common mass \(M_X\), omit colored scalars, and use leading continuity matching at every threshold. This is deliberately a transparent color-sector toy, not a completed E6 Higgs vacuum.

With

\[
\mu {dg\over d\mu}=-{b_0g^3\over16\pi^2},
\qquad
b_0={11\over3}C_A-{2\over3}\sum_{\rm Weyl}T(R),
\]

one Standard Model family has \(\sum T=2\), while one vectorlike triplet pair has \(\sum T=1\). Therefore the color coefficients are

\[
b_0=5\quad(M_U>\mu>M_X),
\qquad
b_0=7\quad(M_X>\mu>m_t),
\]

followed by \(23/3,25/3,9\) after the top, bottom and charm thresholds.

## Explicit piecewise matching

For the illustrative boundary data

\[
M_U=2\times10^{16}\ {\rm GeV},\qquad
\alpha_U^{-1}=42,\qquad
M_X=10^{12}\ {\rm GeV},
\]

the inverse color coupling descends as

\[
42
\longrightarrow34.1191
\longrightarrow9.07542
\longrightarrow4.53437
\longrightarrow2.95437
\]

at \(M_U,M_X,m_t,m_b,m_c\), respectively. Defining the one-loop three-flavor parameter by

\[
\Lambda_3=m_c
\exp\!\left[-{2\pi\over9}\alpha_3^{-1}(m_c)\right]
\]

gives

\[
\boxed{\Lambda_3=0.161456\ {\rm GeV}.}
\]

This is a successful calculation, not a prediction. The input \(\alpha_U^{-1}=42\) and exotic mass were selected; E6 branching fixes neither.

## Exact sensitivity

At fixed \(M_X=10^{12}\) GeV, changing \(\alpha_U^{-1}\) from \(41\) to \(42\) to \(43\) gives

\[
\Lambda_3=(0.32453,\ 0.16146,\ 0.080327)\ {\rm GeV}.
\]

The exact one-loop logarithmic derivative is

\[
{\partial\ln\Lambda_3\over\partial\alpha_U^{-1}}
=-{2\pi\over9}.
\]

At fixed \(\alpha_U^{-1}=42\), moving \(M_X\) from \(10^9\) through \(10^{12}\) to \(10^{15}\) GeV gives

\[
\Lambda_3=(0.034785,\ 0.16146,\ 0.74941)\ {\rm GeV},
\]

because

\[
{\partial\ln\Lambda_3\over\partial\ln M_X}
={7-5\over9}={2\over9}.
\]

Conversely, demanding \(\Lambda_3=0.2\) GeV merely defines a continuum of fitted boundary conditions. For those three exotic masses it requires

\[
\alpha_U^{-1}=(39.4945,\ 41.6933,\ 43.8922).
\]

Thus threshold motion can always be compensated by a UV-coupling motion. No invariant scale law has appeared.

Nor does removing the common-mass simplification help. For three
nondegenerate vectorlike triplets,

\[
{\partial\ln\Lambda_3\over\partial\ln M_{X_i}}={2\over27}.
\]

At one loop the masses therefore enter only through their product, or
equivalently their geometric mean. The split choice
\((10^9,10^{12},10^{15})\) GeV has geometric mean \(10^{12}\) GeV and
returns the same \(0.161456\) GeV benchmark. Splitting supplies more free
data; it supplies no prediction. If a finite matching term adds
\(\Delta\) to the transported inverse coupling, then

\[
{\partial\ln\Lambda_3\over\partial\Delta}=-{2\pi\over9}.
\]

Thus an unfixed \(\Delta=\pm1\) multiplies the result by \(0.4975\) or
\(2.0100\). Complete \(SU(5)\) multiplets can preserve one-loop
unification of coupling *differences* while still shifting this common
coupling and hence the absolute color scale.

## Why equal \(b_0\) is not a protected Spin(5)--SU(3) bridge

For pure Yang--Mills,

\[
C_A[Spin(5)]=C_A[SU(3)]=3,
\qquad b_0=11.
\]

If both theories are assigned the same \(M=2\times10^{16}\) GeV and \(\alpha^{-1}(M)=42\), their one-loop parameters coincide at \(7.62353\times10^5\) GeV. That equality contains no infrared theorem; it simply repeats identical input through identical differential equations.

Now add one Dirac fundamental \(3\) to \(SU(3)\), with \(T(3)=1/2\), and one Dirac vector \(5\) to \(Spin(5)\), with \(T(5)=1\). Then

\[
b_0[SU(3)]={31\over3},
\qquad
b_0[Spin(5)]={29\over3},
\]

and the same boundary data yield

\[
\Lambda_{SU(3)}=1.62170\times10^5\ {\rm GeV},
\qquad
\Lambda_{Spin(5)}=2.78657\times10^4\ {\rm GeV},
\]

so

\[
{\Lambda_{Spin(5)}\over\Lambda_{SU(3)}}=0.171830.
\]

This one-multiplet counterexample is enough: equality of the pure-gauge coefficients is not stable under allowed quantum content.

There is also no direct embedding-index rescue. \(Spin(5)\) cannot embed in \(SU(3)\) by dimension. An \(SU(3)\subset SO(5)\) embedding would require a faithful five-dimensional real orthogonal representation, whereas the complex fundamental first gives a six-dimensional real representation. A larger common parent can normalize both subgroup couplings at one matching surface, but it cannot protect equal running through unequal representations and thresholds unless an additional exact symmetry maps the full theories.

## The shared-modulus test

Suppose the most favorable joining ansatz is imposed:

\[
M_{\rm Pl}=\sqrt\xi\,v,
\qquad
\Lambda_{\rm YM}=v
\exp\!\left[-{8\pi^2\over b_0g^2(v)}\right].
\]

Then \(v\) cancels, but the ratio is

\[
\boxed{
{\Lambda_{\rm YM}\over M_{\rm Pl}}
=\xi^{-1/2}
\exp\!\left[-{8\pi^2\over b_0g^2(v)}\right].}
\]

For \(b_0=11,\xi=1,g(v)=0.5\), it is \(3.3941\times10^{-13}\). Moving \(g\) only from \(0.45\) to \(0.55\) moves the ratio from \(4.03\times10^{-16}\) to \(4.95\times10^{-11}\), over five orders of magnitude. At \(g=0.5\),

\[
{\partial\ln(\Lambda/M_{\rm Pl})\over\partial g}=114.85,
\qquad
{\partial\ln(\Lambda/M_{\rm Pl})\over\partial\ln\xi}=-{1\over2}.
\]

Sharing a modulus therefore removes one dimensionful parameter but does not predict the hierarchy. A boundary condition, fixed point or Ward identity must fix both \(g(v)\) and \(\xi\). The current Spin(2,3) programme supplies neither.

## Exhaustion boundary

The following finite routes are now closed for this arm:

1. explicit one-loop descent of the minimal declared three-\(27\) color content;
2. UV-coupling, exotic-threshold and inverse-fit calculations;
3. nondegenerate exotic thresholds and an additive finite matching term;
4. the pure \(Spin(5)\)--\(SU(3)\) equal-\(b_0\) coincidence;
5. a Casimir-protected scale claim, by an allowed matter counterexample;
6. a direct embedding-index relation; and
7. the claim that one shared modulus alone predicts the color/gravity hierarchy.

What remains is not another finite manipulation of the branch rule. It is new model input: a complete E6-breaking potential and mass spectrum, normalized two-loop plus finite-threshold matching, a dynamical law fixing \(g(v)\) and \(\xi\), and the nonperturbative conversion from \(\Lambda_{\overline{\rm MS}}\) to a physical gauge-invariant gap.

The fifth joined research arm survives only in this sharpened form:

\[
\boxed{
\text{derive a symmetry or fixed trajectory that fixes }g(v),\xi
\text{ and all threshold ratios; do not merely posit one }v.}
\]

## Primary sources

- [Gross and Wilczek, ultraviolet behavior of non-Abelian gauge theories](https://doi.org/10.1103/PhysRevLett.30.1343)
- [Gross and Wilczek, *Asymptotically Free Gauge Theories I*](https://doi.org/10.1103/PhysRevD.8.3633)
- [Appelquist and Carazzone, decoupling of massive fields](https://doi.org/10.1103/PhysRevD.11.2856)
- [Gursey, Ramond and Sikivie, the original E6 unified gauge model](https://doi.org/10.1016/0370-2693(76)90417-2)
- [Georgi, Quinn and Weinberg, hierarchy and coupling evolution in unified theories](https://doi.org/10.1103/PhysRevLett.33.451)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_threshold_shared_scale_no_go.mjs
~~~
