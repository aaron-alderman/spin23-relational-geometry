# A neutral \(\mathbb Z_2\) kink is the minimal defect origin, and one even charge-one boson localizes without mirror doubling

**Date:** 20 October 2026  
**Status:** complete conditional classical construction; the original charge-three action still fails the defect-origin gate  
**Role:** third-wave attack on A2: defect origin, orientation and reader localization

## Result in one sentence

The charge-three Abelian Higgs model cannot by itself create the required
codimension-one defect because its apparently distinct Higgs phases are gauge
equivalent; adding one neutral real field with two physically distinct vacua gives
an exact infinite-line kink, a reflection fold pins it and supplies the required BF parities, and
an even charge-one complex boson has exactly one normalizable gapped bound mode—but
the orientation is selected by boundary or formation history rather than predicted,
and the extra neutral field/fold datum is new microscopic input.

On a finite numerical slab, the tanh wall is exponentially accurate rather than an exact solution with vacuum endpoint values. The quoted KK spacing assumes the stated interval convention; a physical KK spectrum additionally requires explicit self-adjoint outer boundary conditions. The exact kink and bound-state equations are infinite-line statements.

## 1. Everyday picture

A wall between north-pointing and south-pointing magnets exists because those are
two physically distinguishable arrangements. Painting the same magnet with a
different label does not create a wall.

The three phases of the charge-three Higgs field are closer to relabelling: a gauge
transformation identifies them. To obtain a genuine wall we add a neutral dial
\(\eta\) with two distinguishable settings, \(+u\) and \(-u\). A kink is the smooth
place where that dial turns from one setting to the other.

A second field can then behave like a bead in a trough. Its mass is lower at the
middle of the wall, so one wave profile is trapped there. Reflection acts like a
folded sheet of paper: an even profile survives the fold, while an odd displacement
of the wall is disallowed.

## 2. Dimensional audit before constructing anything

The target defect has a \(2+1\)-dimensional worldvolume. A codimension-one wall
with that worldvolume lives minimally in \(3+1\) dimensions, with one transverse
coordinate \(y\).

A codimension-one wall in \(4+1\) dimensions instead has a \(3+1\)-dimensional
worldvolume. It needs a second compactification or intersection before it becomes
the target. There is also a form-degree warning: the established term

\[
{3\over2\pi}\int b_2\wedge da_1
\]

is a four-form and is naturally integrated in four dimensions; it is not, without
another field or one-form, a five-dimensional bulk action. The smallest explicit
completion is therefore a finite folded slab in \(3+1\) dimensions. Calling this
a \(4+1\)-dimensional derivation would add an unearned step.

## 3. No wall from the charge-three Higgs field alone

Write the condensed charge-three scalar as

\[
s={v+\sigma\over\sqrt2}e^{i\theta},
\qquad \theta\mapsto\theta+3\alpha.
\]

The three representatives \(\theta=0,2\pi/3,4\pi/3\) are connected by gauge
transformations. After quotienting by the gauge group, the vacuum space has one
connected component:

\[
\pi_0(\mathcal V_{\rm physical})=0.
\]

Consequently the model supports the codimension-two vortices derived in result
1233, but it has no topologically stable codimension-one wall. This is a sharp
no-go for deriving the defect solely from the displayed charge-three sector.

The smallest local dynamical extension is one neutral real order parameter
\(\eta\) with a genuine global \(\mathbb Z_2\) symmetry. Alternatively one may
impose a fold or boundary interface externally, but then the interface is a datum,
not a prediction.

## 4. Exact neutral wall

Take

\[
S_\eta=\int d^4x\left[
{1\over2}(\partial\eta)^2
+{\lambda_\eta\over4}(\eta^2-u^2)^2
\right].
\]

For

\[
\mu=u\sqrt{\lambda_\eta/2},
\]

the two static solutions are

\[
\eta_K(y)=u\tanh(\mu y),
\qquad
\eta_A(y)=-u\tanh(\mu y).
\]

They obey

\[
\eta''=\lambda_\eta\eta(\eta^2-u^2),
\qquad
Q={\eta(+\infty)-\eta(-\infty)\over2u}=\pm1,
\]

and have equal tension

\[
T_K=T_A={4\mu u^2\over3}.
\]

This equality matters. The CP/reflection-even law permits both orientations and
predicts neither sign. Boundary data such as

\[
\eta(-L)=-u,\qquad \eta(+L)=+u
\]

select the kink; the reversed data select the antikink. Formation history can make
one sector persist without an explicit CP-odd term. In a finite system the exact
quantum state can tunnel or superpose; robust history-bearing orientation requires
large wall area/tension or environmental preparation. This is spontaneous or
state-level selection, not a microscopic sign prediction.

## 5. Fold parities and the pinned wall

On the covering interval \([-L,L]\), reflect \(y\mapsto-y\) and assign

\[
\begin{array}{c|cccccc}
\text{field/component}&\eta&a_i&a_y&b_{ij}&b_{iy}&\Phi\\ \hline
\text{parity}&-&+&-&-&+&+
\end{array}
\]

where \(i,j\) are tangent to the \(2+1\)-dimensional fixed plane. The surviving
BF fields are \(a_i\) and the compact interval integral

\[
c_i=\int_I b_{iy}\,dy,
\]

which preserves the level-three normalization described in result 1233.

An unpinned kink has a neutral translation zero mode proportional to
\(\eta_K'(y)\). Since \(\eta_K'\) is even while \(\eta\) is constrained odd, the
fold projects that mode out and fixes the wall at \(y=0\). Thus pinning is not an
automatic property of an infinite-space kink; it comes from the fold/boundary
datum.

## 6. One localized charge-one bosonic reader

Add one complex scalar \(\Phi\) of compact-\(U(1)\) charge one:

\[
S_\Phi=\int d^4x\left[
|D_a\Phi|^2+
\left(M_\infty^2-g(u^2-\eta^2)\right)|\Phi|^2
+\lambda_\Phi|\Phi|^4
\right].
\]

The mass well depends on \(\eta^2\), so it is CP/reflection even and is identical
for kink and antikink. It localizes the reader but cannot choose the wall
orientation.

On either wall the transverse spectral problem is

\[
\left[-\partial_y^2+M_\infty^2-gu^2\operatorname{sech}^2(\mu y)\right]\psi
=m^2\psi.
\]

For the exactly soluble choice \(gu^2=2\mu^2\), the potential has one
normalizable even bound state,

\[
\psi_0(y)=\sqrt{\mu\over2}\operatorname{sech}(\mu y),
\qquad
\int_{-\infty}^{\infty}|\psi_0|^2dy=1,
\]

with

\[
m_\chi^2=M_\infty^2-\mu^2,
\qquad
m_{\rm continuum}^2=M_\infty^2.
\]

The mode is gapped and does not condense when

\[
M_\infty^2>\mu^2,
\qquad \lambda_\Phi>0.
\]

One complex bosonic mode is consistent. Its particle has residual
\(\mathbb Z_3\) charge \(1\), and its antiparticle has charge \(-1=2\pmod3\).
Those are the two excitations of one complex field, not two mirror-localized
fields. Unlike a single \(2+1\)-dimensional fermion, a scalar has no parity anomaly
forcing a second species. A fermionic replacement would require a separate anomaly
and inflow calculation.

## 7. Executable certificate

The machine-readable fixture chooses

\[
u=1,\quad \lambda_\eta=2,\quad \mu=1,\quad L=5,
\]

and

\[
M_\infty^2=1.64,\quad g=2,\quad \lambda_\Phi=0.3.
\]

It therefore predicts

\[
T={4\over3},\qquad m_\chi=0.8,
\qquad m_{\rm continuum}=\sqrt{1.64}\simeq1.2806.
\]

The finite slab has first geometric gap

\[
m_{\rm KK}={\pi\over2L}\simeq0.3142,
\]

above the declared probe energy \(0.05\). At \(L=5\), the kink endpoint error is
below \(10^{-4}\). The verifier checks the kink equation, both topological charges,
equal tensions, parities, removal of the translation mode, the reader eigenvalue
equation, wavefunction normalization, gaps and residual particle/antiparticle
charges.

## 8. What is established and what is not

The extended model establishes, conditionally:

1. an explicit normalizable codimension-one defect;
2. fold parities that retain the desired BF zero modes;
3. state/history selection of either orientation without an explicit CP-odd bulk
   term;
4. one normalizable, even, gapped charge-one bosonic reader with no required mirror
   copy;
5. removal of the neutral wall-position zero mode and finite geometric/continuum
   gaps.

It does **not** establish:

1. that \(\eta\), the fold or the opposite-vacuum boundary data follow from the
   programme's original action;
2. a predicted sign of orientation;
3. a \(4+1\)-dimensional origin without a second reduction and a legitimate
   five-dimensional topological action;
4. the physical interval size, Standard Model/family couplings, quantum stability,
   backreaction or the complete bulk-defect stress Ward identity;
5. any microscopic coefficient connecting the reader to the proposed third
   positive response direction.

## 9. A2 verdict

\[
\boxed{\text{Original charge-three action: A2 fails.}}
\]

\[
\boxed{\text{Charge-three sector + neutral }\mathbb Z_2\text{ kink + fold:
conditional classical construction passes.}}
\]

The dependency boundary is now precise. One additional neutral order parameter (or
equivalent imposed interface datum) is sufficient for the classical defect and one
bosonic reader; it is also necessary within this minimal field content because the
gauge-quotiented charge-three vacuum has no disconnected components. Physical
admission remains false until that extra datum has a justified origin and the
quantum/backreaction gates are passed.

## Artifacts

- `evidence/data/spin23-a2-domain-wall-reader-localization.json`
- `verification/verify/verify_spin23_a2_domain_wall_reader_localization.mjs`

