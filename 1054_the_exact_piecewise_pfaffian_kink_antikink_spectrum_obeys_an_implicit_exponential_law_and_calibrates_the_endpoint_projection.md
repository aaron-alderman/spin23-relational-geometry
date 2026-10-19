# The Exact Piecewise Pfaffian Kink–Antikink Spectrum Obeys an Implicit Exponential Law and Calibrates the Endpoint Projection

**Date:** 18 October 2026  
**Branches:** response-root Pfaffian, paired Dirac walls, exact spectral matching, endpoint projection, CI wall  
**Claim status:** exact spectrum for the stated piecewise continuum model; microscopic Pfaffian mass derivation open  
**Certificate:** [solve_the_exact_piecewise_pfaffian_kink_antikink_spectrum.mjs](scripts/solve_the_exact_piecewise_pfaffian_kink_antikink_spectrum.mjs)

## Executive result

The finite-wall spectral problem left open in document 1053 is exactly solvable.

For

\[
H=A\partial_x+m(x)X,
\qquad
m(x)=
\begin{cases}
-m_0,&x<0,\\
+m_0,&0<x<L,\\
-m_0,&x>L,
\end{cases}
\]

define

\[
\kappa=\sqrt{m_0^2-E^2},
\qquad |E|<m_0.
\]

Continuity at both walls gives

\[
\boxed{
\kappa^2\cosh(\kappa L)
=(m_0^2+E^2)\sinh(\kappa L).
}
\]

Equivalently,

\[
\boxed{
|E|=m_0e^{-\kappa L}
=m_0\exp\!\left[-L\sqrt{m_0^2-E^2}\right].
}
\]

There is one physical positive solution \(0<E<m_0\), accompanied by its chiral partner \(-E\). The formal solution \(|E|=m_0\) has \(\kappa=0\) and is a nonnormalizable continuum threshold, not a bound state.

Writing

\[
\ell=m_0L,
\qquad
y=\frac{|E|}{m_0},
\]

the exact dimensionless law is

\[
y=e^{-\ell\sqrt{1-y^2}}.
\]

At large separation,

\[
\boxed{
y=e^{-\ell}+\frac{\ell}{2}e^{-3\ell}
+O\!\left(\ell^2e^{-5\ell}\right).
}
\]

Therefore the exact projection of document 1053,

\[
|t|=m_0e^{-m_0L},
\]

is exactly the leading asymptotic bound-state energy. The full eigenvalue is slightly larger because its actual decay rate is \(\kappa<m_0\).

## 1. Constant-mass transfer matrices

The eigenvalue equation is

\[
A\psi'+mX\psi=E\psi.
\]

Using \(A^{-1}=-A\) and \(AX=-D\),

\[
\psi'=M(m,E)\psi,
\qquad
M(m,E)=-EA-mD.
\]

For either sign of \(m=\pm m_0\),

\[
M^2=(m_0^2-E^2)I=\kappa^2I.
\]

Evolution through a constant-mass region of length \(L\) is consequently

\[
T_m(L)
=e^{M(m,E)L}
=\cosh(\kappa L)I
+\frac{\sinh(\kappa L)}{\kappa}M(m,E).
\]

This makes the matching problem algebraic.

## 2. Decaying exterior spinors

Both exterior regions have \(m=-m_0\), for which

\[
M_-=
\begin{pmatrix}
m_0&E\\
-E&-m_0
\end{pmatrix}.
\]

On the left, normalizability as \(x\to-\infty\) selects the \(+\kappa\) eigenvector

\[
v_L=
\begin{pmatrix}
1\\
-(m_0-\kappa)/E
\end{pmatrix}.
\]

On the right, normalizability as \(x\to+\infty\) selects the \(-\kappa\) eigenvector

\[
v_R=
\begin{pmatrix}
1\\
-(m_0+\kappa)/E
\end{pmatrix}.
\]

Inside the interval, \(m=+m_0\), so

\[
M_+=
\begin{pmatrix}
-m_0&E\\
-E&m_0
\end{pmatrix}.
\]

The bound-state condition is simply

\[
T_+(L)v_L\ \parallel\ v_R.
\]

## 3. Exact matching equation

Taking the determinant of the two boundary vectors gives

\[
\det\!\left(T_+(L)v_L,v_R\right)=0.
\]

After using \(\kappa^2=m_0^2-E^2\), this reduces to

\[
\kappa^2\cosh(\kappa L)
=(m_0^2+E^2)\sinh(\kappa L).
\]

Hence

\[
\tanh(\kappa L)
=\frac{m_0^2-E^2}{m_0^2+E^2}.
\]

The elementary identity

\[
\tanh z=\frac{1-e^{-2z}}{1+e^{-2z}}
\]

then yields

\[
\frac{E^2}{m_0^2}=e^{-2\kappa L},
\]

and therefore

\[
|E|=m_0e^{-\kappa L}.
\]

The two signs are paired by the chiral symmetry of the real Dirac operator.

## 4. Existence and uniqueness of the bound pair

For \(0<y<1\), define

\[
f_\ell(y)=\log y+\ell\sqrt{1-y^2}.
\]

The bound-state equation is \(f_\ell(y)=0\). One has

\[
\lim_{y\to0^+}f_\ell(y)=-\infty,
\qquad
\lim_{y\to1^-}f_\ell(y)=0^+.
\]

Moreover,

\[
f_\ell'(y)=\frac1y-\frac{\ell y}{\sqrt{1-y^2}}
\]

has exactly one zero in \((0,1)\): its first term decreases relative to the second monotonically. Thus \(f_\ell\) rises through zero once, reaches one maximum, and falls toward the positive side of the threshold value. There is exactly one interior root.

The endpoint \(y=1\) also satisfies the exponentiated equation formally, but there \(\kappa=0\), the exterior solution does not decay, and no normalizable state exists. It must be discarded.

Therefore every \(L>0\) supports precisely one subgap pair \(\pm E\). As \(L\to0\), that pair approaches the continuum edge rather than becoming an additional zero mode.

## 5. Controlled relation to the isolated-mode projection

The exact equation gives

\[
y=e^{-\ell\sqrt{1-y^2}}.
\]

Since \(0<\sqrt{1-y^2}<1\),

\[
y>e^{-\ell}.
\]

Thus the isolated-mode projection always underestimates the exact energy magnitude, but it approaches it exponentially.

Expanding

\[
\sqrt{1-y^2}=1-\frac{y^2}{2}+O(y^4)
\]

gives

\[
y=e^{-\ell}\exp\!\left(\frac{\ell y^2}{2}+O(\ell y^4)\right),
\]

and iteration yields

\[
y=e^{-\ell}+\frac{\ell}{2}e^{-3\ell}
+O\!\left(\ell^2e^{-5\ell}\right).
\]

The leading term is exactly

\[
\frac{|t|}{m_0}=e^{-\ell}
\]

from the isolated-wall projection. This is stronger than a generic locality estimate: the coefficient and its first controlled correction are known.

## 6. Numerical calibration

| \(\ell=m_0L\) | exact \(E/m_0\) | projected \(e^{-\ell}\) | exact/projected |
|---:|---:|---:|---:|
| 0.5 | 0.699578 | 0.606531 | 1.15341 |
| 1 | 0.399891 | 0.367879 | 1.08702 |
| 2 | 0.137948 | 0.135335 | 1.01931 |
| 3 | 0.0499740 | 0.0497871 | 1.00376 |
| 5 | 0.00673871 | 0.00673795 | 1.00011 |
| 8 | 0.000335463 | 0.000335463 | 1.00000045 |

By \(\ell=3\), the two-mode answer is already accurate to better than \(0.4\%\). At short separation the exact mode becomes broad, \(\kappa^{-1}>m_0^{-1}\), and the isolated-wall basis is correspondingly less accurate.

## 7. Physical interpretation

The exact spectral law converts the paired seam into a dimensionless spectrometer:

\[
\frac{|E|}{m_0}
=F(m_0L).
\]

Only the ratio of geometric separation to localization length matters. This is the correct quantity to compare with:

- discrete seam separation in the six-edge placement model;
- inverse decay scales in the odd-frequency pole branch;
- any source-derived correlation length of the Pfaffian/Jordan response root.

But such comparisons are conditional until a common unit of length is derived. Setting one graph edge equal to one continuum localization unit would be a choice, not a theorem.

The CI classification of document 1053 is unchanged. Exact matching confirms a nonzero pair \(\pm E\) for every finite \(L>0\); the minimal real wall never develops an exact DIII Kramers zero pair.

## 8. Stop-everything tests and falsifiers

**Scale bridge:** derive \(m_0\) from the half-scale odd-frequency pole or another source-native decay rate, and derive \(L\) from the seam geometry. Then the model makes an absolute splitting prediction.

**Profile robustness:** replace the discontinuous mass by a smooth source-derived profile and test which part of the exponential law survives. The exponent should remain controlled by the forbidden-region integral, but the coefficient need not remain \(m_0\).

**Microscopic trigger:** derive \(m(x)=\det\Psi(x)\) as a linear mass in the Furey/Higgs carrier action.

**DIII falsifier of this model:** exhibit an exact square-minus-one time reversal commuting with the complete Hamiltonian. The present \(P\varepsilon K\) anticommutes instead.

**Additional-channel warning:** flavour, gauge or Nambu multiplicity can create more matching channels and invalidate the one-pair uniqueness statement.

## Verdict

| Question | Verdict |
|---|---|
| Is the full piecewise-wall spectrum solvable? | **Yes** |
| Exact energy law? | **\(|E|=m_0e^{-L\sqrt{m_0^2-E^2}}\)** |
| Number of physical subgap levels? | **One chiral pair \(\pm E\)** |
| Is the projection \(m_0e^{-m_0L}\) justified? | **Yes, as the exact leading large-\(L\) term** |
| Are exact zero modes present at finite \(L\)? | **No** |
| Does this fix the physical scale? | **No; \(m_0\) and \(L\) remain underived from the source theory** |

## Position in the corpus

- [conditional single-wall zero mode](1048_if_the_response_pfaffian_is_a_BDI_dirac_mass_then_its_rank_one_wall_binds_one_exact_zero_mode_but_the_coupling_is_not_yet_derived.md)
- [paired-wall stability audit](1049_the_minimal_paired_seam_has_zero_total_BDI_index_so_its_endpoint_modes_can_hybridize_and_a_complex_second_mass_removes_sign_protection.md)
- [explicit CI wall projection](1053_the_explicit_piecewise_pfaffian_kink_antikink_wall_has_exact_projected_overlap_and_realizes_the_CI_furey_role_assignment.md)
