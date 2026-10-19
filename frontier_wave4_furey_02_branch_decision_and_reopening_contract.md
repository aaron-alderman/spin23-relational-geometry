# Frontier Wave 4 W4-A — Branch Decision and Reopening Contract

**Date:** 18 October 2026  
**Status:** Furey-only cross-carrier route pinned at a precise missing representation

## Decision

The Furey/Jordan representation route does not presently pass the wave-4 selector gate.

It reaches a useful intermediate result:

\[
\text{one bosonic }S_1
\xrightarrow{\;y\;}
\text{three }S_1\text{ mediator copies},
\qquad
[y]\in\mathbb{CP}^2.
\]

TRO compatibility can normalize (y), so the failure is no longer an arbitrary scale. The unresolved datum is exactly its projective direction. That is the same four-real-dimensional family as the safe-projector orientation.

Therefore the candidate intertwiner does not reduce the moduli; it parametrizes them.

## Pass-condition audit

| wave-4 condition | result |
|---|---|
| typed domain and codomain already present | yes, only on the optional colored (S_1) branch |
| nonzero Hom under required symmetries | yes, \(\mathbb C^3\) for bosonic (S_1); zero for matter TRO after grading |
| coefficient normalization not taken from target Clebsches | norm yes, via strict TRO morphism |
| non-scalar (K_W) with simple eigenspace | exists after choosing (y), but direction is free |
| relation to one incidence ray | none derived |
| stability under allowed counterterms and thresholds | not protected; generic (U(3))-allowed Hermitian terms rotate or split the chosen line |

The branch therefore fails the combined pass conditions at orientation, incidence correlation and stability.

## Exact obstruction

The established data have automorphism group (U(3)_W) on the unlabelled mediator copies. A canonical construction must be invariant or equivariant under this group.

A canonical vector would lie in

\[
W^{U(3)}=0.
\]

A canonical Hermitian form lies in

\[
\operatorname{Herm}(W)^{U(3)}
=\mathbb R I_3.
\]

Thus no natural construction from the current inputs can yield a simple distinguished eigenspace.

## Counterterm test

Suppose a unit vector (y) is chosen and

\[
K_0=yy^\dagger.
\]

Because the established symmetries act identically on all three copies, the general symmetry-allowed quadratic counterterm on (W) is an arbitrary Hermitian matrix

\[
\delta K\in\operatorname{Herm}_3.
\]

For generic \(\delta K\),

\[
[\delta K,K_0]\ne0.
\]

The selected line rotates. Protecting it requires reducing (U(3)_W) to its stabilizer (U(1)\times U(2)), which is equivalent to supplying the line as new symmetry data. The same dichotomy appeared in the wave-3 UV completion audit.

## What has been learned

The Furey construction contributes three real pieces of structure:

1. the correct scalar-leptoquark gauge representation appears;
2. endpoint/TRO incidence removes the basic diquark links in the minimal colored-fluctuation calculus;
3. ternary morphism compatibility canonically fixes the norm of a one-copy-to-three-copy embedding.

It does not contribute the fourth needed piece:

4. an action on the three unified mediator origins that fixes their relative embedding coefficients.

This is a narrower and more constructive conclusion than “Furey does not work.” It says exactly which representation must be added or derived.

## Reopening contract

Reopen W4-A only when at least one of the following is supplied independently:

1. a representation of a Furey/Jordan operator on the ordered unified-origin space \((10,\overline{126}_5,\overline{126}_{50})\);
2. a functor from the TRO linking algebra to the mediator-copy endomorphism algebra whose image is non-scalar;
3. a finite Dirac block connecting the Furey (S_1) fluctuation to the three copies, with coefficients derived from algebra representation data rather than selected as parameters;
4. a Ward identity reducing the copy-space counterterm algebra from \(M_3(\mathbb C)\) to \(\mathbb C\oplus M_2(\mathbb C)\) without first naming the protected line;
5. a second independent source anchor whose relative pairing with the electron/leptoquark anchor is fixed by the same calculus.

For any proposed reopening, compute:

\[
\dim\operatorname{Hom}_{G,\gamma,J,\mathrm{TRO}},
\qquad
\operatorname{Comm}(G,\gamma,J,\mathrm{TRO},D),
\qquad
\operatorname{spec}(K_W),
\]

and the full allowed counterterm algebra. A non-scalar tree-level Gram without a reduced counterterm commutant is not a protected selector.

## Branch disposition

**Pin:** a direct Furey-matter-to-scalar map; grading makes it zero.

**Retain as model input:** a normalized bosonic (S_1\) embedding (y\), provided it is explicitly labelled as a chosen \(\mathbb{CP}^2\) coordinate.

**Do not promote:** the existence of (yy^\dagger\) to a derived safe projector.

**Continue elsewhere:** W4-B action/exceptional provenance and W4-C topology/\(Spin(2,3)\) orientation transport, which can only succeed if they genuinely reduce the mediator-copy commutant.

