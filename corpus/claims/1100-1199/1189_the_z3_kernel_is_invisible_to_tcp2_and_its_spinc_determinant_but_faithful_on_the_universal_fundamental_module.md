# The \(\mathbb Z_3\) kernel is invisible to \(T\mathbb{CP}^2\) and its Spin\(^c\) determinant but faithful on the universal fundamental module

## Correction and result

The previous calculation correctly identified

\[
T\mathbb{CP}^2\cong\operatorname{Hom}(L,Q),
\qquad
c_1(T\mathbb{CP}^2)=3h,
\qquad
K^{-1}\cong\mathcal O(3).
\]

It also correctly observed that \(\mathbb{CP}^2\) is not spin and has a canonical Spin\(^c\) structure. But the Spin\(^c\) determinant does **not** provide the missing faithful central \(\mathbb Z_3\) lift. The centre acts trivially on both the tangent bundle and \(K^{-1}\).

The faithful lift is instead carried by the universal fundamental module

\[
E=L\oplus Q,
\]

on which the centre acts by the scalar \(\omega\). This reproduces the earlier algebraic distinction exactly:

\[
\boxed{
\text{Jordan/projective relational geometry is centre-blind, while the fundamental matter module remembers the centre.}
}
\]

## 1. The central element

Let

\[
X=\operatorname{diag}(-2,1,1),
\qquad
g(t)=e^{itX}
=\operatorname{diag}(e^{-2it},e^{it},e^{it}).
\]

At \(t=2\pi/3\),

\[
g(2\pi/3)=\omega I_3,
\qquad
\omega=e^{2\pi i/3}.
\]

This is the order-three centre of \(SU(3)\).

## 2. Projectors and tangent relations forget the centre

The projector transforms by conjugation. Therefore

\[
(\omega I_3)P(\omega I_3)^{-1}=P.
\]

The action of \(SU(3)\) on the projector orbit consequently factors through

\[
PSU(3)=SU(3)/\mathbb Z_3.
\]

On the selected line and quotient plane, the central one-parameter subgroup has weights

\[
L:-2,
\qquad
Q:+1.
\]

Hence

\[
T\mathbb{CP}^2
\cong
\operatorname{Hom}(L,Q)
\]

has weight

\[
1-(-2)=3.
\]

At \(t=2\pi/3\), this phase is

\[
e^{3it}=e^{2\pi i}=1.
\]

Thus

\[
\boxed{\omega I_3\text{ acts trivially on }T\mathbb{CP}^2.}
\]

The charge-three tangent weight is exactly why the order-three centre disappears from the bosonic relational geometry.

## 3. The Spin\(^c\) determinant also forgets it

The tangent bundle has complex rank two. Its determinant therefore has central weight six:

\[
K^{-1}=\det T\mathbb{CP}^2:e^{6it}.
\]

At \(t=2\pi/3\),

\[
e^{6it}=e^{4\pi i}=1.
\]

Therefore

\[
\boxed{\omega I_3\text{ acts trivially on }K^{-1}=\mathcal O(3).}
\]

The canonical Spin\(^c\) determinant repairs the \(\mathbb Z_2\) obstruction \(w_2\). It does not repair the independent \(\mathbb Z_3\) kernel of the projective \(SU(3)\) action. These are distinct lifting problems.

## 4. The fundamental module remembers it

On \(L\), at \(t=2\pi/3\),

\[
e^{-2it}=e^{-4\pi i/3}=\omega.
\]

On \(Q\),

\[
e^{it}=e^{2\pi i/3}=\omega.
\]

Consequently, on

\[
E=L\oplus Q,
\]

the centre acts as

\[
\boxed{\rho_E(\omega I_3)=\omega I_E.}
\]

The centre is invisible on projectors and their relational tangent directions but visible on the vectors from which those projectors are constructed.

## 5. Exact match to the Jordan/module audit

| Algebraic formulation | Projector-orbit formulation |
|---|---|
| Jordan observables transform by conjugation | \(\mathbb{CP}^2\) projectors transform by conjugation |
| \(\omega I_3\) is trivial as an automorphism | The base action factors through \(PSU(3)\) |
| Cross-Peirce spaces have charge \(\pm3\) | \(T\mathbb{CP}^2\) has weight \(\pm3\) |
| The central \(\mathbb Z_3\) is lost | The centre is trivial on tangent data |
| The fundamental fermion module retains \(\omega\) | \(L\oplus Q\) retains \(\omega\) |

This is the same representation-theoretic kernel expressed globally.

## 6. Consequence for the Shiab branch

An operator constructed solely from adjoint/projective data such as

\[
P,
\quad DP,
\quad T\mathbb{CP}^2,
\quad K^{-1}
\]

must be blind to the central \(\mathbb Z_3\). A direct transcription of an adjoint-valued Shiab operator would therefore miss precisely the information that the programme must retain.

The mediator must explicitly include the faithful module:

\[
\boxed{
\text{projector geometry}
\;+
\text{fundamental module}
\;+
\text{compatible connection}.
}
\]

It should be a compatible pair rather than a single adjoint map:

\[
\begin{aligned}
\mathbb S_P^{\mathrm{ad}}&:
\Omega^2(\operatorname{ad}E)
\longrightarrow
\Omega^3(\operatorname{ad}E),\\
\mathbb S_P^{\mathrm{fund}}&:
\Omega^\bullet(E)
\longrightarrow
\Omega^{\bullet'}(E).
\end{aligned}
\]

The adjoint component transports relational curvature. The fundamental component retains the central phase. Both must arise from one shared connection and one action.

## 7. Revised status of the Spin\(^c\) clue

The non-spin fact remains potentially relevant for fermions coupled to the projector orbit:

\[
w_2(T\mathbb{CP}^2)=h\bmod2.
\]

But the two lifting problems must remain separate:

\[
\begin{array}{lll}
\mathbb Z_2\text{ spin obstruction}
&\longrightarrow&
\text{Spin}^c\text{ determinant},\\[4pt]
\mathbb Z_3\text{ projective-centre kernel}
&\longrightarrow&
\text{fundamental }SU(3)\text{ module}.
\end{array}
\]

The canonical \(\mathcal O(3)\) line does not solve both.

## 8. Updated verdict

The sequence is now exact:

\[
\begin{aligned}
P&\Rightarrow\mathbb{CP}^2,\\
DP&\Rightarrow T\mathbb{CP}^2=\operatorname{Hom}(L,Q),\\
X=I-3P&\Rightarrow\text{tangent weight }3,\\
c_1(T\mathbb{CP}^2)&=3h,\\
\omega I_3&\Rightarrow\text{trivial on projective/tangent data},\\
L\oplus Q&\Rightarrow\text{faithful action by }\omega.
\end{aligned}
\]

The geometry explains both the appearance of three and the loss of the residual centre. Matter restores what projective geometry necessarily forgets.

The sharpened missing-operation problem is:

\[
\boxed{
\text{Find an operation that transports adjoint/projective curvature while remaining lifted to the fundamental module.}
}
\]

That is more precise than “find a Shiab operator,” and it explains why an adjoint-only Shiab construction cannot complete the programme.

