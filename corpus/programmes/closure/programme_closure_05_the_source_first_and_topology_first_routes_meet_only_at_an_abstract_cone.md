# The Source-First and Topology-First Routes Meet Only at an Abstract Cone

**Date:** 17 October 2026  
**Programme role:** route-separation theorem  
**Claim status:** exact type audit; no physical intertwiner currently exists  
**Certificate:** [verify_programme_route_separation.mjs](../../../verification/verify/verify_programme_route_separation.mjs)

## Result

The programme contains two constructions that both end in a copy of

\[
H_2(\mathbb R)_+\cong\operatorname{Sym}_2(\mathbb R)_+.
\]

That shared shape does not make the constructions physically identical.

| Route | What the two coordinates label | Why the matrix is real and positive | What remains open |
|---|---|---|---|
| source first | two local Standard-Model currents, \(J_\lambda\) and \(J_{B-L}\) | vacuum exchange, Lorentz covariance and spectral positivity | source frame, contacts, normalization and a non-generic prediction |
| topology first | two Furey/Peirce topology faces and their link | a separately supplied face exchange or completely positive real-slice selector | physical source map, choice of real axis and orientation |

An isomorphism between two three-dimensional cones is only a change of mathematical coordinates. A physical identification requires an intertwiner that maps the actual source operators, Ward action, contacts, dimensions and reversal operation—not just determinants or positivity.

## 1. The source-first route

The controlled external-source action gives

\[
W[a,b],\qquad
\frac{\delta^2W}{\delta(a,b)^2}
\longrightarrow \Pi_{ij}^{\mu\nu}.
\]

In the Lorentz-invariant vacuum, the transverse spectral matrix is real symmetric positive. Thus the source-label space already supplies an \(H_2(\mathbb R)_+\) carrier without octonions, a Peirce corner, \(Spin(2,3)\), or an exceptional parent.

This is physically economical, but algebraically generic. Every pair of suitably typed Hermitian local currents has the same cone-level property.

## 2. The topology-first route

The Furey/Jordan construction begins with a different pair: two algebraic faces inside a larger carrier. It needs a projection to the relevant rank-two corner, a real link line and an orientation convention. The corpus contains exact completely positive projections and exact orientation witnesses, but more than one admissible projection and both orientations survive.

This route carries the distinctive algebraic content. It currently lacks the operational map to Standard-Model probes.

## 3. The missing square

To join the routes one needs a commuting square

\[
\begin{array}{ccc}
\text{SM source plane} & \xrightarrow{\ I\ } & \text{Furey topology face}\\
\downarrow\text{Ward/response} && \downarrow\text{Peirce/exchange}\\
\operatorname{Sym}_2(\mathbb R)_+ & \xrightarrow{\ \Phi\ } & H_2(\mathbb R)_+
\end{array}
\]

with all of the following properties:

1. \(I\) is defined on actual gauge-invariant operators, not only on representation labels;
2. \(I\) respects the protected \(B-L\) direction and the Yukawa breaking of incidence;
3. \(\Phi\) preserves dimensions, ultraviolet normalization and contact typing;
4. physical reversal on the source side maps to the claimed topology orientation reversal;
5. the induced pole/residue or scattering observable is unchanged by arbitrary source-frame shear;
6. at least one resulting number or relation is not true for a generic two-current system.

No existing document supplies such a square.

## 4. Consequence for the meaning of \(Spin(2,3)\)

The conformal/TKK algebra of \(H_2(\mathbb R)\) is \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\). Therefore any source-first response that explores this cone admits the same mathematical action. This is a representation of the response geometry, not evidence that spacetime or the microscopic Standard Model is fundamentally governed by \(Spin(2,3)\).

The distinction is like drawing the same triangle on paper and on a road sign: the ruler-and-compass geometry agrees, while the things represented and the rules governing them need not.

## 5. Decision rule

The programme may proceed in either of two honest forms:

- **minimal effective theory:** retain the source-first action and response cone, drop claims that require Furey topology or exceptional selection, and seek a calculated Standard-Model correlator;
- **distinctive unification programme:** retain the topology-first structure, but treat the source-to-topology intertwiner as the first missing physical datum.

It may not use the generic source-first cone to declare the topology-first selector solved.

## 6. Falsification and promotion criteria

**Promotion criterion:** construct the commuting square above and calculate a frame-independent observable that changes under the derived orientation reversal.

**Demotion criterion:** if every proposed observable is invariant under replacing the Furey carrier by an arbitrary pair of local Hermitian currents, the exceptional structure is explanatorily idle at that level.

**Type-error criterion:** a matrix equality after choosing bases is presented as an operator intertwiner without matching Ward identities, dimensions and contacts.

## Reproducibility

```powershell
node scripts\verify_programme_route_separation.mjs
```

The certificate checks the finite-dimensional core: arbitrary cone isomorphisms are numerous; they preserve positivity by congruence, while the Ward-protected axis reduces but does not remove the scale-and-shear freedom. Thus cone equivalence cannot supply the missing physical intertwiner.

