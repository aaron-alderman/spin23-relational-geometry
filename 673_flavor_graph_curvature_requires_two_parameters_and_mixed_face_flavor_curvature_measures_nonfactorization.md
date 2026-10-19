# Flavor-Graph Curvature Requires Two Parameters, and Mixed Face--Flavor Curvature Measures Nonfactorization

**Date:** 17 October 2026  
**Branches:** B04, B07, B08, B11 and the connection/holonomy branch  
**Claim status:** exact differential-geometric result for graph projectors; physical parameter-space selection remains open  
**Certificate:** [verify_flavor_graph_connection_curvature_and_factorization_boundary.mjs](scripts/verify_flavor_graph_connection_curvature_and_factorization_boundary.mjs)

## Executive result

The positive flavor graph

\[
P_V=\frac12
\begin{pmatrix}
I&V\\
V^\dagger&I
\end{pmatrix}
\]

has the normalized frame

\[
Q(V)=\frac1{\sqrt2}
\begin{pmatrix}
I\\
V^\dagger
\end{pmatrix},
\qquad
P_V=QQ^\dagger.
\]

Its natural non-Abelian connection is

\[
\boxed{
\mathcal A=Q^\dagger dQ=\frac12V\,dV^\dagger.
}
\]

Writing \(\theta=VdV^\dagger\), the Maurer--Cartan equation gives

\[
\boxed{
\mathcal F=d\mathcal A+\mathcal A\wedge\mathcal A
=-\frac14\theta\wedge\theta.
}
\]

The curvature is generically nonzero on a parameter space with at least two noncommuting flavor directions.

However:

\[
\boxed{
\text{one running scale alone has no curvature two-form.}
}
\]

It can support parallel transport and path ordering, but a local curvature or genuine infinitesimal “twist” requires at least two independent parameters or a nontrivial closed parameter loop.

## 1. Explicit nonzero two-parameter curvature

Take

\[
V(x,y)=e^{xX}e^{yY}
\]

with noncommuting anti-Hermitian generators \(X,Y\). At \(x=y=0\),

\[
\theta_x=-X,
\qquad
\theta_y=-Y,
\]

and

\[
\boxed{
\mathcal F_{xy}
=-\frac14[X,Y].
}
\]

The certificate chooses two elementary rotations in different flavor planes and verifies that this curvature is nonzero and anti-Hermitian.

Thus the graph bundle has a genuine Wilczek--Zee-type curvature whenever the mixing matrix depends on at least two noncommuting control parameters.

## 2. Why renormalization scale alone is insufficient

If \(V=V(\mu)\) depends only on one real scale,

\[
\mathcal F_{\mu\mu}=0
\]

identically by antisymmetry. A connection \(\mathcal A_\mu d\mu\) still defines transport

\[
\mathcal P\exp\left(-\int\mathcal A_\mu\,d\mu\right),
\]

but on an ordinary interval it can be locally gauged away. Intrinsic holonomy needs:

- a closed RG cycle;
- a periodic physical parameter;
- a puncture or singularity in parameter space;
- or a second independent coupling/spurion direction.

This is a hard boundary for interpreting a single monotonic energy variable as the proposed “loop with one twist.”

## 3. Exact tensor factorization forces zero mixed curvature

Suppose the total supported frame factorizes into face and flavor parts. Its connection has the form

\[
\mathcal A_{\rm tot}
=\mathcal A_{\rm face}\otimes I
+I\otimes\mathcal A_{\rm flavor}.
\]

The two terms commute:

\[
[\mathcal A_{\rm face}\otimes I,\;
I\otimes\mathcal A_{\rm flavor}]=0.
\]

Therefore the mixed face--flavor curvature vanishes:

\[
\boxed{
\mathcal F_{\rm face,flavor}=0
\quad\text{under exact tensor factorization}.
}
\]

This converts a vague interaction question into a sharp discriminator.

## 4. Nonzero mixed curvature is an interaction witness

A nonzero mixed component can arise only if at least one of the following occurs:

1. the physical projector is not \(P_{\rm face}\otimes P_V\);
2. the connection contains generators acting simultaneously on face and flavor;
3. renormalization mixes face and flavor operators nonfactorizably;
4. thresholds make the supported subspace depend jointly on face and flavor parameters;
5. a Furey linking operator intertwines both factors.

Hence

\[
\boxed{
\mathcal F_{\rm mixed}\ne0
}
\]

would be concrete evidence that the real Jordan carrier and complex flavor graph are dynamically joined rather than merely placed side by side.

## 5. Relation to the “looped carrier with one twist”

The current rigorous translation is:

- **carrier:** the supported response bundle;
- **two faces:** the \(H_2(\mathbb R)\) source index;
- **three relationships:** the three real Jordan coordinates or three-dimensional flavor graph;
- **loop:** a closed path in a multidimensional parameter space;
- **twist:** nontrivial holonomy of the supported-bundle connection.

This translation is mathematically coherent but not unique. A physical model must specify the control parameters and show why its loop is operationally meaningful.

## 6. Stop-everything criteria

Stop claiming curvature from scale running alone if:

1. parameter space is one-dimensional and has no identified closed cycle;
2. the reported phase is removable by a smooth frame choice;
3. the graph projector is constant and only coordinates vary;
4. exact face--flavor factorization is assumed while mixed curvature is claimed;
5. a nonzero connection coefficient is mistaken for gauge-invariant curvature.

## 7. Next gates

1. Use two physical parameters, such as renormalization scale and a Yukawa spurion angle, to define \(P_V(\mu,\eta)\).
2. Compute the projector curvature from an explicit running Standard-Model mixing matrix.
3. Derive the face-source connection from incidence-operator renormalization.
4. Test whether the combined anomalous-dimension matrix produces nonzero mixed curvature.
5. Compare any resulting holonomy with braid, Maslov or Furey conjugation data only after the loop is physically fixed.

## Reproducibility

    node scripts\verify_flavor_graph_connection_curvature_and_factorization_boundary.mjs
