# Broken-Phase Standard-Model Residues Define a Minimal Ten-State Relational Hamiltonian

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the Standard-Model relational-carrier realization branch  
**Claim status:** exact realization of the one-generation residue matrices; pole locations and UV carrier term remain model inputs  
**Certificate:** [verify_standard_model_residue_relational_hamiltonian.mjs](scripts/verify_standard_model_residue_relational_hamiltonian.mjs)

## Executive result

The broken-phase incidence/\(B-L\) matrices from document 655 are all positive definite:

\[
U=\begin{pmatrix}150&0\\0&6\end{pmatrix},
\quad
D=\begin{pmatrix}78&12\\12&6\end{pmatrix},
\quad
E=\begin{pmatrix}2&0\\0&18\end{pmatrix},
\quad
N=\begin{pmatrix}1&-3\\-3&18\end{pmatrix}.
\]

Each is rank two. At four distinct pole parameters, the positive realization theorem therefore requires at least

\[
2+2+2+2=8
\]

internal states. Adding the two source-carrier coordinates gives a minimal complete realization of dimension

\[
\boxed{2+8=10.}
\]

This is the first relational-carrier Hamiltonian whose coupling vectors come directly from the programme's one-generation Standard-Model incidence and \(B-L\) bookkeeping rather than from an illustrative matrix choice.

## 1. The relation map is fixed by chiral source vectors

Use source coordinates

\[
(\lambda,\;3(B-L)).
\]

The residue factors can retain the original chiral decomposition:

\[
B_u=\sqrt3
\begin{pmatrix}
5&1\\
5&-1
\end{pmatrix},
\qquad
B_d=\sqrt3
\begin{pmatrix}
5&1\\
1&-1
\end{pmatrix},
\]

\[
B_e=
\begin{pmatrix}
1&-3\\
1&3
\end{pmatrix},
\qquad
B_\nu=
\begin{pmatrix}
1&-3\\
0&3
\end{pmatrix}.
\]

They obey

\[
B_u^TB_u=U,\qquad
B_d^TB_d=D,\qquad
B_e^TB_e=E,\qquad
B_\nu^TB_\nu=N.
\]

The two internal rows per sector are not arbitrary Cholesky coordinates: they are the two chiral source vectors joined by the corresponding broken-phase mass channel, with color multiplicity retained by \(\sqrt3\) in the quark sectors.

## 2. The ten-state Hamiltonian

Let

\[
B=
\begin{pmatrix}
B_u\\B_d\\B_e\\B_\nu
\end{pmatrix}
\in\mathbb R^{8\times2},
\]

and let the internal pole Hamiltonian be

\[
H_0=
\operatorname{diag}
(\lambda_u I_2,\lambda_d I_2,\lambda_e I_2,\lambda_\nu I_2).
\]

With the carrier normalized to unit ultraviolet slope and zero subtraction tensor, define

\[
\boxed{
\mathcal H_{\rm SM}^{(1)}
=
\begin{pmatrix}
0_{2\times2}&B^T\\
B&H_0
\end{pmatrix}.
}
\]

Its carrier Schur complement is

\[
\boxed{
F(z)=zI_2+
\frac{U}{\lambda_u-z}
+\frac{D}{\lambda_d-z}
+\frac{E}{\lambda_e-z}
+\frac{N}{\lambda_\nu-z}.
}
\]

The spectral residues are derived; the four \(\lambda_f\), the unit UV coefficient and the vanishing subtraction are explicit model choices.

## 3. Minimality is forced by residue rank

An internal eigenspace of multiplicity \(d_f\) can produce a pole residue of rank at most \(d_f\). Since

\[
\det U=900,\quad
\det D=324,\quad
\det E=36,\quad
\det N=9,
\]

each sector needs \(d_f\ge2\). The displayed realization uses exactly two internal states per pole and therefore saturates the rank lower bound.

If the neutrino sector is omitted, the \(U,D,E\) carrier-generating subsystem has minimal dimension

\[
2+2+2+2=8.
\]

The full anomaly-complete one-generation input with \(\nu^c\) has dimension ten.

## 4. Two dressed modes in every spectral interval

Order the four distinct pole parameters:

\[
\lambda_1<\lambda_2<\lambda_3<\lambda_4.
\]

Away from the poles,

\[
F'(z)
=I_2+\sum_f\frac{C_f}{(\lambda_f-z)^2}>0.
\]

Because every \(C_f\) is positive definite:

- \(F(z)\to+\infty\) when a pole is approached from the left;
- \(F(z)\to-\infty\) when it is approached from the right;
- \(F(z)\sim zI_2\) at the two exterior infinities.

The two carrier eigenvalues consequently execute positive spectral flow across zero in each of the five intervals

\[
(-\infty,\lambda_1),\;
(\lambda_1,\lambda_2),\;
(\lambda_2,\lambda_3),\;
(\lambda_3,\lambda_4),\;
(\lambda_4,\infty).
\]

Thus the complete ten-state Hamiltonian has

\[
\boxed{2+2+2+2+2=10}
\]

dressed eigenvalues, with two in every interval. The certificate verifies this for the representative ordered parameters used in document 655.

## 5. Dual weights are observable-source contents

For every dressed eigenvalue \(r_k\), let \(v_k\) be the normalized null direction of \(F(r_k)\). Its dual residue is

\[
R_k^{\rm dual}
=\frac{v_kv_k^T}{v_k^TF'(r_k)v_k}.
\]

In the ten-state realization this is exactly the projection of the normalized full eigenstate onto the two source-carrier coordinates. Hence

\[
\operatorname{tr}R_k^{\rm dual}
=\text{incidence/\(B-L\) carrier content of mode }k.
\]

Projected completeness gives

\[
\sum_{k=1}^{10}R_k^{\rm dual}=I_2,
\qquad
\sum_{k=1}^{10}\operatorname{tr}R_k^{\rm dual}=2.
\]

This gives the dual residues a precise source-overlap meaning without yet calling the dressed modes particles.

## 6. What is now derived and what is not

Derived from the one-generation algebraic input:

1. all four positive residue matrices;
2. their explicit relation-map factors;
3. the eight-dimensional minimal internal multiplicity;
4. the ten-dimensional minimal carrier-plus-internal realization;
5. the two-per-interval spectral-flow theorem for distinct poles;
6. the source-overlap interpretation of every dual residue.

Not yet derived:

1. physical pole positions after confinement and interactions;
2. the unit linear UV coefficient;
3. the real subtraction tensor;
4. a gauge-invariant renormalized incidence operator;
5. a reason that the complete ten-state Hamiltonian is a microscopic particle Hamiltonian rather than a correlator dilation.

## 7. QCD and continuum boundary

The quark-sector residues are exact charge/incidence sums, but isolated quark poles are not infrared observables. A physical completion must replace \(\lambda_u,\lambda_d\) by hadronic or OPE spectral measures. Then:

- the eight internal coordinates become a continuum dilation rather than eight particles;
- the finite ten-state model becomes a positive rational approximant;
- discrete dressed roots can move into resonance poles or approximate cuts;
- positivity survives if the physical spectral matrix remains positive;
- the two-per-interval count need not survive a continuum limit in its finite form.

The finite construction is therefore a rigorous realization of the algebraic residue data, not a ten-particle prediction.

## 8. Stop-everything criteria

Stop interpreting this realization as a Standard-Model dynamical result if:

1. the incidence insertion cannot be renormalized as an operational composite source;
2. QCD or electroweak corrections make the physical spectral matrix indefinite after gauge-null directions are removed;
3. the UV coefficient is singular in the proposed two-source frame;
4. the four pole approximation is presented as physical where continuum cuts dominate;
5. the ten realization states are counted as new particles without an asymptotic-state or pole-sheet analysis.

## 9. Next gates

1. Replace the representative pole parameters by a positive spectral quadrature or Padé approximation to an explicit continuum.
2. Derive the ultraviolet coefficient and subtraction matrix from an OPE calculation.
3. Determine the renormalization mixing of the nonconserved incidence insertion.
4. Extend \(B\) to three generations while retaining CKM/PMNS information outside the real two-face carrier.
5. Test whether Feshbach elimination realizes the same triple identity as the \(H_2(\mathbb R)\) Jordan product.

## Reproducibility

    node scripts\verify_standard_model_residue_relational_hamiltonian.mjs
