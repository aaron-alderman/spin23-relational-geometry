# The Ward-Compatible Source Connection Is a Dilation Semidirect Heisenberg Geometry

**Date:** 17 October 2026  
**Branches:** B04, B07, B08, B11 and the Ward-compatible connection branch  
**Claim status:** exact Lie-algebra refinement of the fixed-\(B-L\) stabilizer; identification with the quantum RG connection remains conditional  
**Certificate:** [verify_ward_compatible_connection_is_dilation_semidirect_heisenberg.mjs](scripts/verify_ward_compatible_connection_is_dilation_semidirect_heisenberg.mjs)

## Executive result

Document 657 found the four-dimensional \(B-L\)-preserving subalgebra of the generated \(\mathfrak{sp}(4,\mathbb R)\). Its internal structure is now explicit:

\[
\boxed{
\mathfrak g_{\rm Ward}
\cong
\mathbb R D\ltimes\mathfrak h_3.
}
\]

Here \(\mathfrak h_3\) is the three-dimensional Heisenberg algebra. Choose generators:

- \(D\): incidence-source dilation;
- \(N\): upper source shear from protected \(B-L\) into incidence;
- \(U\): incidence/incidence contact translation;
- \(V\): incidence/\(B-L\) contact translation.

Their nonzero brackets are

\[
\boxed{
[D,N]=N,\quad
[D,U]=2U,\quad
[D,V]=V,\quad
[N,V]=2U.
}
\]

Thus \((N,V,U)\) form a Heisenberg algebra with central element \(U\), and \(D\) grades it with weights \(1,1,2\).

## 1. Symplectic realization

For

\[
A=\begin{pmatrix}a&b\\0&0\end{pmatrix},
\qquad
B=\begin{pmatrix}u&v\\v&0\end{pmatrix},
\]

the symplectic generator is

\[
X(A,B)=
\begin{pmatrix}
A&B\\
0&-A^T
\end{pmatrix}.
\]

The four basis directions are

\[
\begin{aligned}
D&=X(E_{11},0),\\
N&=X(E_{12},0),\\
U&=X(0,E_{11}),\\
V&=X(0,E_{12}+E_{21}).
\end{aligned}
\]

The certificate verifies the symplectic equation and every bracket exactly.

The derived series is

\[
\mathfrak g
\supset
\operatorname{span}\{N,U,V\}
\supset
\operatorname{span}\{U\}
\supset0.
\]

This explains the earlier solvability result and identifies its nilpotent core.

## 2. Ward-compatible connection

Let the source/contact data vary over a parameter space. The most general connection valued in the fixed-\(B-L\) algebra is

\[
\omega=aD+bN+uU+vV,
\]

where \(a,b,u,v\) are one-forms.

Its curvature

\[
\mathcal F=d\omega+\frac12[\omega,\omega]
\]

has components

\[
\boxed{
\begin{aligned}
\mathcal F_D&=da,\\
\mathcal F_N&=db+a\wedge b,\\
\mathcal F_V&=dv+a\wedge v,\\
\mathcal F_U&=du+2a\wedge u+2b\wedge v.
\end{aligned}
}
\]

The term

\[
2b\wedge v
\]

is the Heisenberg central curvature generated jointly by source shear and mixed-contact transport.

## 3. Interpretation of the four directions

The algebra separates four effects that were previously grouped under generic source mixing:

1. \(D\) rescales the unprotected incidence operator;
2. \(N\) adds the protected current into the incidence definition without changing \(B-L\);
3. \(U\) changes the incidence autocorrelation subtraction;
4. \(V\) changes the mixed subtraction.

The protected \(B-L\) row never receives a lower-source mixing. No special-conformal \(C\)-wing survives.

Consequently, an actual anomalous-dimension/contact connection for the two-source system must take values in this algebra if \(B-L\) remains fixed and Ward normalized.

## 4. Cross-branch curvature criterion

Document 673 showed that nonzero mixed face--flavor curvature witnesses nonfactorization. The present result adds a selection rule:

\[
\boxed{
\mathcal F_{\rm mixed}
\in\mathbb R D\ltimes\mathfrak h_3
}
\]

whenever continuous \(B-L\) is unbroken and its normalization is fixed.

A component in the lower special-conformal wing means one of three things:

1. the Ward identity has been violated;
2. \(B-L\) is broken, for example by a Majorana sector;
3. the transformation relates different theories with transformed Ward data rather than acting inside one theory.

This gives a falsifiable classification target for a future operator-mixing calculation.

## 5. Relation to phase space and the proposed pole

The Heisenberg algebra is the standard algebra of one canonical pair plus its central element. Its appearance here is not evidence that the incidence/\(B-L\) sources are literal position and momentum. It does show that the Ward-compatible remnant of the \(Sp(4)\) response algebra has a canonical contact/phase-space shape:

\[
\text{two weight-one directions}
\quad\stackrel{[\ ,\ ]}{\longrightarrow}\quad
\text{one weight-two center}.
\]

The dilation \(D\) supplies the grading. This is a mathematically precise candidate for the programme's “relationships plus carrier” language, but its physical variables remain source shear and contact data.

## 6. Stop-everything criteria

Stop identifying an RG/source connection as Ward compatible if:

1. it mixes incidence into the protected \(B-L\) row;
2. it changes the \(B-L\) autocorrelator normalization;
3. it contains a special-conformal lower block while Ward data are held fixed;
4. contact translations are treated as observables without a subtraction convention;
5. the Heisenberg bracket is reinterpreted as spacetime quantization without an operational map.

## 7. Next gates

1. Compute \(a,b,u,v\) in a simplified renormalized Yukawa model.
2. Determine whether mixed face--flavor curvature enters through \(b\wedge v\).
3. Intersect this connection with the fixed ultraviolet-slope stabilizer.
4. Extend the algebra after Majorana breaking and identify the additional spurion directions.
5. Test whether the Heisenberg center has a scheme-independent spectral representative.

## Reproducibility

    node scripts\verify_ward_compatible_connection_is_dilation_semidirect_heisenberg.mjs
