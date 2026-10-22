# A Dual-Orientation Polarized-Electron Experiment Separates the 0-Minus Mass from Its Unknown Matching

**Date:** 23 October 2026

**Status:** exact observable-level point-ensemble matching and parametric reach; finite-size material response and UV matching remain external

**Depends on:** [the fermion portal](../1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md), [the polarized Yukawa torque](../1600-1699/1623_the_critical_0minus_sector_leaves_unpolarized_lense_thirring_exactly_gr_but_adds_a_polarized_yukawa_torque.md), and [the order-reduced EFT envelope](1717_the_complete_quadratic_poles_define_a_torsion_inclusive_order_reduced_eft_envelope.md)

**Evidence:** [observable ledger](../../../evidence/data/spin23-polarized-electron-observable-v1.json) and [verifier](../../../verification/verify/verify_spin23_polarized_electron_observable.mjs)

## Result

The previously external phenomenology branch can be advanced without choosing
arbitrary finite Wilson coefficients.  A polarized electron source and detector
measured in two orientation channels separate the mediator range from its
unknown coupling:

\[
\boxed{
\rho\equiv-{U_R\over U_T(0)}
=x+1+{1\over x+1},\qquad
x=m_\varphi r
={\rho+\sqrt{\rho^2-4}\over2}-1 .
}
\]

The ratio is independent of the polarized spin count and of the unknown
fermion coefficient.  Once (m_\varphi) is fixed by the ratio, the absolute
transverse torque fixes (f_e), or equivalently the pseudoscalar Yukawa
coupling (y_e=2m_ef_e).  Thus finite UV matching is not needed to define a
falsifiable measurement; it is needed only to predict where the model should
lie before the measurement.

## Two exact orientation channels

For two compact polarized electron ensembles separated by
\(\mathbf r=r\hat{\mathbf z}\), define

\[
N_{\rm eff}=(P_1N_1)(P_2N_2),\qquad x=m_\varphi r.
\]

The separated-particle kernel is

\[
V=f_e^2\sigma_1^i\sigma_2^j
\partial_i\partial_j{e^{-m_\varphi r}\over4\pi r}.
\]

Put both polarizations in the plane transverse to \(\hat{\mathbf r}\), with
relative angle \(\theta\).  Then

\[
U_T(\theta)=-K_T\cos\theta,
\qquad
K_T={N_{\rm eff}f_e^2e^{-x}\over4\pi r^3}(x+1),
\]

so the modulated torque has amplitude \(K_T\).  Aligning both polarizations
radially instead gives

\[
U_R={N_{\rm eff}f_e^2e^{-x}\over4\pi r^3}
(x^2+2x+2).
\]

Their signed ratio gives the boxed inversion.  The physical branch is unique
for \(x\ge0\) and must satisfy \(\rho\ge2\).  Examples are

\[
(x,\rho)=(0,2),\quad(1,5/2),\quad(3,17/4).
\]

The ratio is only quadratically sensitive to a very light mediator near
\(x=0\), since \(\rho=2+x^2/(x+1)\).  Multiple separations are therefore
important when the force range is much longer than the apparatus.

## Absolute reach and inverse matching

Using the transverse torque amplitude, a point-ensemble torque threshold
\(\tau_{\min}\) corresponds in natural units to

\[
\boxed{
y_{e,\min}=\left[
{16\pi m_e^2r^3\tau_{\min}e^x
\over N_{\rm eff}(x+1)}
\right]^{1/2}.}
\]

The measured \((m_\varphi,f_e)\) pair maps back to the critical axial block as

\[
{A\over c_e^2}={1\over f_e^2},
\qquad
{B\over c_e^2}={1\over f_e^2m_\varphi^2}.
\]

It cannot separately determine \(A\), \(B\), and \(c_e\).  That remaining
degeneracy is precisely the finite broken-phase matching datum identified by
the terminal programme; it is not an ambiguity in the observable.

As a sensitivity-scaling witness only, take \(r=0.1\) m, \(x=1\),
\(P_1N_1=P_2N_2=10^{24}\), and
\(\tau_{\min}=10^{-21}\) N m.  The exact conversion gives

\[
m_\varphi=1.9733\ \mu{\rm eV},
\qquad y_{e,\min}=1.2038\times10^{-10}.
\]

This is not an apparatus forecast: magnetic leakage and achievable polarized
spin densities have not been supplied.  It shows the scaling and emphasizes
that even an optimistic macroscopic count remains far above the natural
Planck-normalized benchmark.  At the same point,

\[
{\sqrt A\over|c_e|}=8.490\times10^6\ {\rm GeV},
\qquad {B\over c_e^2}=1.851\times10^{43},
\]

quantifying the large curvature coefficient required for a micro-eV pole.

## Finite bodies

For actual source and detector spin-density maps the exact forward model is

\[
U=f_e^2\int d^3x\,d^3y\,
s_1^i(\mathbf x)s_2^j(\mathbf y)
\partial_i\partial_j
Y_m(|\mathbf x-\mathbf y|).
\]

The point ratio is then replaced by a ratio of radial and transverse geometry
form factors computed from the same measured density maps.  This is the next
experimental input: dimensions, separation, polarization texture, modulation
axis, torque noise, and magnetic-background transfer function.  None can be
derived from the gravitational action.

## Falsifiers and controls

The minimal critical \(0^-\) portal predicts all of the following:

1. the separated signal vanishes if either body is depolarized;
2. reversing either polarization reverses the torque;
3. transverse modulation follows \(\sin\theta\);
4. the radial/transverse ratio gives \(\rho\ge2\) and the same mass at every
   separation; and
5. no monopole--dipole signal appears without an additional CP-violating
   scalar coupling.

A signal failing these controls is not evidence for the isolated critical
\(0^-\) sector.  A successful signal would establish a pseudoscalar-like
spin portal, but it would become specifically Spin(2,3) only if the parent
theory also predicts \(c_e\), \(A\), and \(B\).

## Programme decision

The observable-selection blocker is removed.  The phenomenology branch is now
**parametrically complete for a compact polarized electron experiment**.  It
remains externally blocked at two sharper inputs:

1. a real apparatus and its finite spin-density/background model; and
2. UV matching that predicts rather than fits \(c_e,A,B\).

The next executable work, once an apparatus is chosen, is the finite-volume
convolution and likelihood template.  In the absence of that input, the next
independent theory task with decision value is a second-method verification of
the normal Weyl-square pole.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_polarized_electron_observable.mjs
~~~
