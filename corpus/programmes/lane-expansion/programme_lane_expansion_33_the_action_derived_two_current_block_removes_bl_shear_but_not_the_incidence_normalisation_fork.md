# Result 33: the action-derived two-current block removes the \(B-L\) shear but not the incidence-normalisation fork

**Date:** 17 October 2026  
**Workstream:** physical sources, renormalised currents and ALP readout  
**Status:** exact leading free-current and leading Yukawa-divergence block; finite masses, gauge corrections and higher-loop mixing remain open  
**Certificate:** [verify_programme_action_derived_two_current_block.mjs](../../../verification/verify/verify_programme_action_derived_two_current_block.mjs)

## Result in ordinary language

An action-derived ruler has now been tested. It is not guessed from the Furey graph.

Couple background probes to the six completed one-generation phase currents and integrate out the free Standard Model fermions. The nonlocal one-loop vacuum polarisation supplies the positive metric

\[
D=\operatorname{diag}(6,3,3,2,1,1)
\]

on the ordered sectors \((Q,u^c,d^c,L,e^c,\nu^c)\). The entries simply count the gauge components that can run around the loop.

This is like testing six wires with the same meter: a quark doublet contains six conducting strands, a right-handed coloured field three, a lepton doublet two, and each singlet one.

The result is full rank. In particular, the sterile-neutrino direction has weight one rather than zero. Therefore this simplest action-derived quadratic form **fails** the proposed completed-incidence selector gate.

It nevertheless does something useful. Within either chosen incidence/\(B-L\) plane it selects a unique representative orthogonal to the protected \(B-L\) direction. That operation removes the otherwise arbitrary finite \(B-L\) shear, and it does so without changing any derivative-ALP observable.

## 1. Fully typed operator basis

Before electroweak breaking, use the gauge-singlet Hermitian dimension-three vectors

\[
j_f^\mu=f^\dagger\bar\sigma^\mu f,
\qquad
f\in\{Q,u^c,d^c,L,e^c,\nu^c\},
\]

together with the Higgs phase current

\[
j_H^\mu=iH^\dagger\overleftrightarrow D^\mu H.
\]

The complete local off-shell basis may also retain \(\partial_\nu B^{\nu\mu}\) and the total gradient \(\partial^\mu(H^\dagger H)\). The first is related to the hypercharge current by the Abelian gauge equation of motion; the second matters only for longitudinal sources and contact terms. They are not silently discarded in a full counterterm computation.

The smallest Ward-closed incidence sector is

\[
(J_\lambda^\mu,J_{B-L}^\mu;
\mathcal O_u,\mathcal O_d,\mathcal O_e,\mathcal O_\nu),
\]

because the divergence of \(J_\lambda\) lands in the four Yukawa descendants while \(J_{B-L}\) is protected in the Dirac-neutrino branch.

## 2. The action-derived source metric

For sector charge vectors \(x,y\), the coefficient of the separated-point free-current correlator is, up to a common known transverse function,

\[
\langle J_xJ_y\rangle_{\rm nonlocal}
\propto x^TDy.
\]

For the deduplicated incidence vector

\[
\lambda_d=(5,5,1,1,1,0),
\qquad q=3(B-L)=(1,-1,-1,-3,3,3),
\]

the two-source block is

\[
G_d=
\begin{pmatrix}
231&9\\
9&48
\end{pmatrix}.
\]

For the multiplicity-preserving alternative

\[
\lambda_m=(5,5,1,1,3,0),
\]

it is

\[
G_m=
\begin{pmatrix}
239&15\\
15&48
\end{pmatrix}.
\]

Both matrices are positive definite. Neither produces an incidence kernel.

## 3. Canonical representative inside each affine class

The conserved-current ambiguity is

\[
\lambda\sim\lambda+cq.
\]

The action-derived metric chooses the representative perpendicular to \(q\):

\[
\lambda_d^\perp=\lambda_d-\frac{3}{16}q,
\qquad
\|\lambda_d^\perp\|_D^2=\frac{3669}{16},
\]

and

\[
\lambda_m^\perp=\lambda_m-\frac{5}{16}q,
\qquad
\|\lambda_m^\perp\|_D^2=\frac{3749}{16}.
\]

Thus the free action fixes the shear once an incidence class has been supplied. It does not choose which incidence class was physically supplied.

## 4. Smallest absorptive Yukawa block

The Yukawa-violation map sends

\[
\lambda_d\mapsto(10,6,2,1),
\qquad
\lambda_m\mapsto(10,6,4,1),
\qquad
q\mapsto0.
\]

At leading order, the positive-energy divergence spectral matrix in coordinates \((\lambda,q)\) is

\[
\rho_{\partial J}(s)=C(s)
\begin{pmatrix}
\kappa(s)&0\\
0&0
\end{pmatrix},
\qquad C(s)>0,
\]

with

\[
\kappa_d=
300|y_u|^2+108|y_d|^2+4|y_e|^2+|y_\nu|^2,
\]

or

\[
\kappa_m=
300|y_u|^2+108|y_d|^2+16|y_e|^2+|y_\nu|^2.
\]

Solving the physical generalized eigenproblem

\[
\rho_{\partial J}v=r\,Gv
\]

gives one null vector, \(q\), and one nonzero vector, exactly \(\lambda^\perp\). Hence the smallest noncontact current block is already diagonal in the protected axis plus the action-orthogonal broken representative.

## 5. What this says about renormalisation

This calculation does not yet supply the full anomalous-dimension matrix. It supplies the parts that do not depend on finite local counterterms:

- the free separated-point source metric;
- the exact protected \(B-L\) axis;
- the leading positive divergence spectral block;
- the canonical broken representative within a declared two-plane.

The remaining one-loop counterterm problem still lives in the full seven-current basis and must include the hypercharge equation-of-motion representative, the Higgs phase current and local source terms. A minimal-subtraction mixing matrix may be useful, but its broken eigenvectors along a running trajectory are not by themselves observables.

## 6. Consequence for the ALP programme

A derivative ALP coupling to \(J_\lambda+cJ_{B-L}\) has the same physical Yukawa-breaking and anomalous gauge couplings for every \(c\), because completed \(B-L\) is Yukawa preserving and gauge-anomaly free. Therefore

\[
\boxed{\text{the action-derived removal of the }B-L\text{ shear changes no ALP prediction}.}
\]

This is good news for the reduced-rank likelihood: the unmeasurable shear need not be fitted as a nuisance parameter.

It is not a derivation of a unique ALP ray. The two incidence normalisations differ in the charged-lepton breaking coefficient, and the action-derived free metric does not select between them. The likelihood must retain at least that discrete fork—or replace it by a continuous charged-lepton coordinate if the algebraic input is relaxed.

## 7. Go/no-go gates

### Direct-current calculation

**Go:** a complete one-loop calculation preserves the protected \(B-L\) axis and produces a noncontact observable whose broken direction agrees with the action-orthogonal representative over a finite energy range.

**No-go:** after the physical absorptive projection, the remaining broken response requires additional independent current directions of comparable size. Then the two-current truncation is not operationally closed.

### Action-derived selector

**Go:** an explicitly declared interacting or boundary action produces a regulator-independent quadratic kernel with \(\ker K=\nu^c\) and fixes the five nonzero sector ratios.

**No-go reached for the simplest candidate:** the ordinary completed free-fermion determinant gives \(D>0\) on every sector and therefore cannot be the incidence selector.

### ALP likelihood

**Go:** after quotienting the exact \(B-L\) shear and the overall scale, kaon, lifetime and photon/lepton branching data distinguish the remaining charged-lepton fork with profiled uncertainties.

**No-go:** the profiled likelihood is insensitive to the lepton coordinate, leaving the two incidence normalisations observationally equivalent in the accessible mass range.

## 8. Strongest honest conclusion

The first action-derived completed metric has a split verdict:

1. it rejects the idea that an ordinary free Standard Model source determinant explains the sterile-neutrino incidence kernel;
2. it canonically fixes the otherwise arbitrary \(B-L\) shear inside a chosen two-current plane;
3. that shear is physically invisible to the ALP quotient;
4. it leaves the scientifically important deduplicated-versus-multiplicity incidence fork untouched.

The next expensive calculation should therefore not attempt to measure the \(B-L\) shear with ALPs. It should either compute the full direct-current noncontact response or test whether a genuinely different action—one with declared outer fields or boundary projectors—can produce the required sterile-neutrino kernel without inserting it by hand.

