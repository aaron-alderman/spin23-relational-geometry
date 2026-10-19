# Foundations Parallel 02: The Minimal Doubled Furey-Arrow Geometry Repairs Yukawa First Order but Leaves Three Extra Links

**Date:** 17 October 2026  
**Status:** exact classification in a deliberately minimal commutative endpoint model; not a complete Standard-Model finite spectral triple  
**Certificate:** [classify_minimal_doubled_furey_arrow_spectral_geometry.mjs](../../../verification/classify/classify_minimal_doubled_furey_arrow_spectral_geometry.mjs)

## Result

Replacing six species-points by the six completed Furey arrows and their reverses repairs the first-order failure of the naive geometry. All four desired Dirac Yukawa links are allowed. The axioms tested here do not isolate them: they permit seven independent complex Dirac coefficients, including three additional links.

Keeping the two neutral endpoints distinct forbids a sterile Majorana entry. Identifying their algebra characters permits that entry, but then the sterile arrow becomes a loop and zero-cycle orientability fails because the particle and antiparticle copies can no longer receive opposite grading signs.

## 1. Minimal finite data

Use the surviving relational topology with distinct neutral endpoints \(D\ne E\). The completed matter arrows are

\[
\begin{array}{c|c}
\text{state}&(\text{left target},\text{right source})\\ \hline
Q&(O_2,H)\\
u^c&(C,O_2)\\
d^c&(D,O_2)\\
L&(H,E)\\
e^c&(E,C)\\
\nu^c&(E,D).
\end{array}
\]

Let the commutative endpoint algebra have independent characters on

\[
O_2, H, C, D, E.
\]

On an arrow \((i,j)\), the algebra acts from the left through character \(i\) and from the right through character \(j\). Double the Hilbert space with

\[
J(i,j)=(j,i),
\]

put the original arrows in grade \(+\), and their reverses in grade \(-\).

Order zero is automatic because the endpoint actions are diagonal and commute. Self-adjointness and \(JD=DJ\) make the off-diagonal Dirac coefficient matrix complex symmetric.

## 2. Exact first-order rule

Let \(p=(i,j)\) and \(q=(k,l)\). A Dirac entry from \(p\) to \(Jq=(l,k)\) contributes

\[
D_{p,Jq}(a_l-a_i)(b_k-b_j)
\]

to the double commutator. Since the endpoint characters are independent, it vanishes for every \(a,b\) exactly when

\[
\boxed{i=l\quad\text{or}\quad j=k.}
\]

In ordinary language: the two original arrows must be composable head-to-tail in at least one direction.

## 3. Complete link classification

The rule permits precisely seven unordered links:

\[
\begin{array}{c|c}
\text{desired Dirac links}&Q-u^c, Q-d^c, L-e^c, L-\nu^c\\
\hline
\text{additional links}&Q-L, u^c-e^c, d^c-\nu^c.
\end{array}
\]

Thus the smallest doubled-arrow construction succeeds where the six-point model failed, but it does not reduce the coefficient count below the four ordinary one-generation Yukawa coefficients. Instead it leaves

\[
\boxed{7\text{ independent complex Dirac moduli}}
\]

before gauge representations, scalar-content restrictions or further axioms are imposed.

The three additional entries connect the other composable paths in the Furey incidence graph. Whether they describe forbidden gauge intertwiners or extra scalar/leptoquark fluctuations depends on the noncommutative algebra representation omitted from this minimal endpoint model. They cannot simply be deleted and then credited to first order.

## 4. Majorana versus orientability fork

A sterile Majorana entry is the diagonal coefficient from \(\nu^c=(E,D)\) to

\[
J\nu^c=(D,E).
\]

The first-order rule allows it only if \(D=E\) as algebra characters. With independent neutral characters it is forbidden.

Now collapse the neutral characters to one character \(N\). The sterile arrow becomes the loop \((N,N)\), so the Majorana entry passes first order. But a zero-dimensional Hochschild cycle acts on an arrow only through its ordered endpoint pair. It therefore acts identically on \(\nu^c\) and \(J\nu^c\), both labelled \((N,N)\), while the grading requires opposite signs. Hence

\[
\boxed{
\text{neutral collapse permits Majorana but obstructs zero-cycle orientability.}
}
\]

This is the programme-specific finite version of the familiar tension between a right-handed-neutrino Majorana block and orientability. It is not claimed as a new general phenomenon.

## 5. What this decides

The doubled-arrow lane now has a sharp first checkpoint:

- **positive:** arrow doubling genuinely repairs the naive first-order obstruction for all four Dirac Yukawa sectors;
- **negative:** the tested axioms leave three additional Dirac links and do not explain any Yukawa magnitude;
- **fork:** independent neutral endpoints preserve zero-cycle orientability but exclude the Majorana entry; neutral collapse reverses those outcomes;
- **next necessary test:** replace the commutative endpoint algebra by the actual noncommutative Furey/Standard-Model summands and determine which of the three additional links survive gauge covariance and which scalar representations their inner fluctuations carry.

No source-current normalization is fixed at this stage. The construction is therefore an action-organizing geometry, not yet an explanation of the incidence weights.

## Literature boundary

Krajewski's classification already establishes the arrow/diagram method and the role of first order in finite real spectral triples. The tension between a sterile-neutrino Majorana term and orientability in KO-dimension six is also established in the almost-commutative Standard-Model literature. Accordingly, neither the composability rule nor the abstract Majorana/orientability phenomenon is claimed as new.

The new-to-this-programme result is the exact application to the completed Furey incidence graph: the seven-link count, its four-plus-three split, and the fact that the Furey neutral-endpoint distinction places the Majorana and orientability requirements on opposite sides of one explicit quotient.

- [Krajewski, finite spectral triples and diagram classification](https://arxiv.org/abs/hep-th/9701081)
- [Stephan, massive neutrinos and the orientability axiom in KO-dimension six](https://arxiv.org/abs/hep-th/0610097)
- [Furey, algebraic Standard-Model representation programme](https://arxiv.org/abs/1611.09182)

## Reproduction

```powershell
node scripts\classify_minimal_doubled_furey_arrow_spectral_geometry.mjs
```

