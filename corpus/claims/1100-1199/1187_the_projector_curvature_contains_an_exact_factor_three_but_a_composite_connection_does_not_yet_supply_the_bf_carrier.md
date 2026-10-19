# The projector curvature contains an exact factor three but a composite connection does not yet supply the BF carrier

## Result

The first systematic reduction of the Jordan–Shiab idea gives two conclusions.

1. A zeroth-order Shiab-like current linear in \(D_{\mathcal A}P\) and a curvature \(F\) can be written covariantly, but it vanishes when the connection and curvature preserve the selected rank split. It therefore probes motion *away from* the reduced phase and cannot by itself be the surviving \(U(1)_X\) gauge principle.

2. The quadratic projector curvature obeys the exact identity

\[
-i\operatorname{Tr}\!\left(X\,DP\wedge DP\right)
=3i\operatorname{Tr}\!\left(P\,DP\wedge DP\right),
\qquad X=I-3P.
\]

Up to the sign convention for the Berry curvature, this is exactly three times the curvature of the selected tautological line. It is therefore a concrete geometric source of a level-three coefficient. However, a connection composed only from \(P\) does not automatically possess the independent flat holonomy sectors required for the nine-state BF carrier. The factor three is derived; the full topological gauge field is not yet derived.

## 1. Setup

Let \(E\to M\) be a Hermitian rank-three bundle over an oriented four-manifold and let

\[
P=P^\dagger,
\qquad
P^2=P,
\qquad
\operatorname{rank}P=1,
\qquad
Q=I-P.
\]

Define

\[
X=I-3P.
\]

Let \(\mathcal A\) be a unitary connection, with curvature \(F\), and write

\[
\Psi:=D_{\mathcal A}P=dP+[\mathcal A,P].
\]

Under a unitary bundle transformation \(g\),

\[
P\mapsto gPg^{-1},
\qquad
\Psi\mapsto g\Psi g^{-1},
\qquad
F\mapsto gFg^{-1}.
\]

Differentiating \(P^2=P\) gives

\[
(DP)P+P(DP)=DP.
\]

Multiplying on both sides by \(P\), or by \(Q\), yields

\[
P\Psi P=0,
\qquad
Q\Psi Q=0.
\]

Therefore

\[
\Psi=P\Psi Q+Q\Psi P
\]

is purely cross-Peirce.

Two further identities follow immediately:

\[
\{P,\Psi\}=\Psi,
\]

and

\[
\{X,\Psi\}
=\{I-3P,\Psi\}
=2\Psi-3\Psi
=-\Psi.
\]

The commutator retains the charge-three difference:

\[
[X,\Psi]
=-3[P,\Psi].
\]

Thus the commutator with \(X\) detects the oriented cross-Peirce charge, whereas the anticommutator does not carry the same explicit factor three.

## 2. Classification of the simplest four-dimensional Shiab channels

Assume a local algebraic map with the following restrictions:

- it is linear in \(\Psi=DP\);
- it is linear in a two-form curvature \(F\);
- it uses no derivatives beyond \(DP\) and \(F\);
- it produces a three-form;
- it is equivariant under orientation-preserving spacetime rotations;
- its internal product is formed from the two orderings \(\Psi F\) and \(F\Psi\).

At the differential-form level, the two basic channels are

\[
\Psi\wedge F,
\qquad
\Psi\wedge *F.
\]

They are the parity-conjugate possibilities. At the internal level, the two basic combinations are the commutator and anticommutator. After tracing against \(X\), this gives four scalar three-form channels:

\[
\begin{aligned}
J_{-,0}(F)&=\operatorname{Tr}\!\left(X[\Psi\wedge F]\right),\\
J_{+,0}(F)&=i\operatorname{Tr}\!\left(X\{\Psi\wedge F\}\right),\\
J_{-,*}(F)&=\operatorname{Tr}\!\left(X[\Psi\wedge *F]\right),\\
J_{+,*}(F)&=i\operatorname{Tr}\!\left(X\{\Psi\wedge *F\}\right).
\end{aligned}
\]

The factors of \(i\) depend on whether the adopted connection convention is Hermitian or skew-Hermitian; they are included here to indicate the required reality correction.

Cyclicity of the trace gives

\[
\operatorname{Tr}\!\left(X[\Psi,F]\right)
=\operatorname{Tr}\!\left([X,\Psi]F\right)
=-3\operatorname{Tr}\!\left([P,\Psi]F\right),
\]

whereas

\[
\operatorname{Tr}\!\left(X\{\Psi,F\}\right)
=\operatorname{Tr}\!\left(\{X,\Psi\}F\right)
=-\operatorname{Tr}(\Psi F).
\]

The commutator channel is therefore the natural carrier of the signed charge-three relation.

This is a classification only under the stated low-order assumptions. Insertions of \(P\), additional traces, higher derivatives, fermions, or defect normals enlarge the space of maps.

## 3. The linear Shiab current vanishes in the reduced phase

Suppose the connection preserves the split:

\[
D_{\mathcal A}P=0.
\]

Then all four linear channels vanish trivially.

Even if \(DP\neq0\), suppose the curvature is block diagonal:

\[
[F,P]=0.
\]

Since \(\Psi\) is off diagonal, each product \(\Psi F\) or \(F\Psi\) is off diagonal, and tracing it against the diagonal operator \(X\) gives zero:

\[
J_{\pm,0}(F)=J_{\pm,*}(F)=0.
\]

Therefore a current linear in \(DP\) and \(F\) detects coupling between coset motion and off-diagonal curvature. It does not remain as the current of the stabilizer \(U(1)_X\) after the rank split is rigidly established.

This is an important filter:

\[
\boxed{
DP\text{-linear Shiab maps describe formation or deformation of the split, not by themselves its surviving gauge connection.}
}
\]

## 4. The quadratic projector curvature

The next natural object is the gauge-invariant two-form

\[
\Omega_X
:=-i\operatorname{Tr}\!\left(X\,\Psi\wedge\Psi\right).
\]

Substituting \(X=I-3P\) gives

\[
\Omega_X
=-i\operatorname{Tr}(\Psi\wedge\Psi)
+3i\operatorname{Tr}\!\left(P\Psi\wedge\Psi\right).
\]

The first term vanishes:

\[
\operatorname{Tr}(\Psi\wedge\Psi)=0.
\]

In components this is the trace of a commutator,

\[
\frac12\operatorname{Tr}\!\left([Psi_\mu,\Psi_\nu]\right)
dx^\mu\wedge dx^\nu=0.
\]

Hence

\[
\boxed{
\Omega_X
=3i\operatorname{Tr}\!\left(P\,DP\wedge DP\right).
}
\]

For a locally normalized vector \(n\) with

\[
P=nn^\dagger,
\]

the Berry connection on the selected line can be written

\[
a_B=-i n^\dagger D_{\mathcal A}n
\]

with curvature, modulo the projected ambient curvature term and convention choices,

\[
f_B
\sim
-i\operatorname{Tr}\!\left(P\,DP\wedge DP\right).
\]

In the trivial-ambient-connection case this is the usual pullback of the Fubini–Study curvature. Therefore

\[
\Omega_X
\sim
-3f_B
\]

up to orientation and sign conventions.

The coefficient three is not inserted. It follows from:

1. the rank-one projector identity;
2. the unimodular generator \(X=I-3P\);
3. the vanishing trace of \(DP\wedge DP\).

## 5. A possible level-three coupling

Introduce a compact two-form gauge field \(b\). The projector geometry permits the topological coupling

\[
S_{P,b}
=\frac{1}{2\pi}\int_M b\wedge\Omega_X.
\]

Using the exact identity above,

\[
S_{P,b}
=\frac{3}{2\pi}
\int_M
b\wedge
i\operatorname{Tr}\!\left(P\,DP\wedge DP\right).
\]

If the latter two-form is the curvature \(da_B\) of a compact line connection in the relevant low-energy sector, then locally

\[
S_{P,b}
\sim
\frac{3}{2\pi}\int_M b\wedge da_B.
\]

This is the desired level-three BF coefficient.

The significant improvement over the previous state is:

\[
\boxed{
3\text{ can arise from the unimodular projector curvature rather than being inserted as an independent BF level.}
}
\]

## 6. Why this is not yet the nine-state theory

The BF field \(a\) in an autonomous topological gauge theory has independent flat holonomy sectors. On a torus, those sectors are essential for the finite Heisenberg algebra and the nine-dimensional Hilbert space.

A purely composite Berry connection

\[
a_B=-in^\dagger dn

\]

is constrained by the underlying projector map \(P:M\to\mathbb{CP}^2\). In particular:

- when \(P\) is globally constant in a trivial bundle, \(a_B\) is pure gauge and has no independent holonomy;
- not every flat \(U(1)\) connection is necessarily realized by a given projector configuration;
- the CP\(^2\) sigma-model modes generally remain dynamical unless separately gapped;
- integrating over \(P\) is not equivalent to summing over all differential-cohomology classes of an independent compact \(U(1)\) gauge field;
- the normalization of the Berry connection relative to the physical \((-2,1,1)\) charge lattice must be fixed globally.

Consequently,

\[
\text{projector curvature with coefficient }3
\not\Rightarrow
\text{autonomous level-three BF theory}
\]

without an additional argument.

The missing step could take one of several forms:

1. **Independent connection:** promote the connection on the selected line or relative determinant bundle to an independent compact field while retaining the projector-derived level.
2. **Emergent connection:** prove that integrating out gapped projector and fermion modes produces an autonomous low-energy connection with all flat sectors.
3. **Differential-cohomology lift:** formulate \(P\) together with a line-bundle connection as the fundamental field, so the curvature and holonomy data are both retained.
4. **Defect liberation:** show that the boundary restriction of the bulk composite connection acquires independent edge holonomies.

## 7. Relation to the raw \(\mathbb Z_9\) and physical \(\mathbb Z_3\)

The projector identity derives a coefficient three at the level of the relative family geometry. It does not replace the global-form analysis of the Standard Model vacuum. The electroweak Higgs and charge-three singlet still produce the integral charge matrix

\[
Q_{\mathrm{vac}}
=
\begin{pmatrix}
3&-1\\
0&3
\end{pmatrix},
\]

with Smith normal form \((1,9)\). The fieldwise remnant is still \(\mathbb Z_9\), and the physical split remnant is still obtained only after quotienting its order-three subgroup identified with the colour centre.

Thus two distinct appearances of three must be related but not conflated:

\[
\begin{aligned}
3_{\mathrm{local}}
&:\quad
X=I-3P
\text{ and }
\Omega_X=3f_B,\\
3_{\mathrm{global}}
&:\quad
\mathbb Z_9/K\cong\mathbb Z_3.
\end{aligned}
\]

A completed theory must prove that the locally derived coefficient descends through the global gauge quotient to the same physical level-three class.

## 8. Revised interpretation of the Shiab idea

The most promising role of a Shiab-like construction is now more specific.

It is probably **not** merely a linear operator

\[
F\mapsto DP\wedge *F.
\]

That channel dies in the rigid reduced phase. Instead, the essential mechanism may be the curvature of a dynamical reduction:

\[
P
\longrightarrow
DP
\longrightarrow
P\,DP\wedge DP
\longrightarrow
f_B
\longrightarrow
3f_B
\longrightarrow
\frac{3}{2\pi}b\wedge f_B.
\]

This resembles Gauss–Codazzi geometry more than an arbitrary bespoke contraction. The off-diagonal second fundamental form \(DP\) generates curvature for the induced line/plane connections, and the unimodular generator converts that curvature into an exact factor three.

The “verb” is therefore becoming identifiable as:

\[
\boxed{
\text{curvature induced by transporting a rank-one reduction}
}
\]

rather than an unspecified operator acting on an already fixed split.

## 9. Next calculation

The immediate next problem is global and variational:

1. formulate the pair \((P,a)\) as a section of a rank-split bundle with an independent compatible relative-determinant connection;
2. fix the integral normalization of \(a\) under \(e^{it(I-3P)}\);
3. compute its characteristic class relative to the tautological line and quotient plane;
4. construct a real bounded action whose topological term reduces to

   \[
   \frac{3}{2\pi}\int b\wedge da;
   \]

5. perform the colour-centre quotient in differential cohomology;
6. verify that the defect retains all nine flat holonomy states after the projector modes are gapped.

The stop condition is equally clear:

> If the connection must remain purely composite and its allowed holonomies are strictly smaller than those of compact level-three BF theory, then the projector curvature explains the coefficient three but not the finite topological carrier.

