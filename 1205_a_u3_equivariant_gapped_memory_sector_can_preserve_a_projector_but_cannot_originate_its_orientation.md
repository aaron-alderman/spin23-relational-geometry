# A U(3)-equivariant gapped memory sector can preserve a projector but cannot originate its orientation

## Main result

The gapped non-topological memory channel required by the reflexive-closure audit does not, by itself, solve family selection.

Let \(P\) be a rank-one projector on \(V\cong\mathbb C^3\), and let a gapped memory sector have action \(S_{\rm mem}[\chi;P]\). Suppose:

1. the memory fields transform in a unitary representation \(\rho\) of \(U(3)\);
2. the action is equivariant,
   \[
   S_{\rm mem}[\rho(U)\chi;UPU^\dagger]
   =S_{\rm mem}[\chi;P];
   \]
3. the measure and regulator preserve that covariance;
4. no second family tensor, labelled source or explicit family-breaking boundary condition is present.

Then the effective action

\[
e^{-\Gamma_{\rm mem}[P]}
=\int\mathcal D\chi\,e^{-S_{\rm mem}[\chi;P]}
\]

obeys

\[
\Gamma_{\rm mem}[UPU^\dagger]=\Gamma_{\rm mem}[P].
\]

Because \(U(3)\) acts transitively on the rank-one projector orbit \(\mathbb{CP}^2\), \(\Gamma_{\rm mem}\) is constant on that orbit. It cannot select one family direction.

Thus:

\[
\boxed{
\text{memory can retain a supplied }P,
\quad
\text{but equivariant memory sourced only by }P
\text{ cannot originate }P.
}
\]

## 1. Finite-dimensional determinant form

For a Gaussian memory sector, write

\[
S_{\rm mem}=\bar\chi\,D(P)\chi,
\qquad
D(UPU^\dagger)=\rho(U)D(P)\rho(U)^\dagger.
\]

Then

\[
\Gamma_{\rm mem}[P]
=\pm\operatorname{Tr}\log D(P)
\]

is conjugation invariant. Every spectral invariant of \(D(P)\)—determinant, trace powers, heat coefficients and regularized eigenvalue products—is independent of the orientation of \(P\).

The simplest faithful memory mass is

\[
D(P)=D_0+m_0I+m_1X(P),
\qquad
X(P)=I-3P.
\]

Its family eigenvalues are always

\[
m_0-2m_1,
\qquad
m_0+m_1,
\qquad
m_0+m_1,
\]

irrespective of the eigenvectors. The integer lift remembers which state lies in the \(-2\) eigenspace when a labelled family frame is retained, but the unlabelled partition function sees only the fixed spectrum.

## 2. Response form

Equivariance implies

\[
\mathcal R[UPU^\dagger]
=U\mathcal R[P]U^\dagger.
\]

The stabilizer of \(P\) is \(U(1)\times U(2)\). By the stabilizer commutant,

\[
\mathcal R[P]=\alpha(P)P+\beta(P)Q.
\]

Transitivity makes \(\alpha\) and \(\beta\) orbit constants. Hence

\[
[P,\mathcal R[P]]=0
\]

for every \(P\). This satisfies the return equation vacuously but supplies no isolated minimum on \(\mathbb{CP}^2\).

This exposes a crucial distinction:

\[
\boxed{
\text{return fidelity}\neq\text{orientation selection}.
}
\]

## 3. How memory can still be physically useful

Memory is not pointless. Correlators with labelled external sources can distinguish the selected line:

\[
\langle J_iJ_j\rangle_P,
\qquad
\overline\Psi\,X(P)\Psi,
\qquad
M(P)^{-1}_{ij}.
\]

These quantities retain orientation relative to a declared source frame. They can test whether a supplied projector is preserved, transported or decohered. But the source frame or another tensor then provides relational orientation.

The memory channel becomes selecting only when it contains or couples to an additional family object \(H\) not expressible as a scalar function of \(P\):

\[
D(P,H),
\qquad
[P,H]\neq0.
\]

After integration, invariants such as

\[
\operatorname{Tr}(PH),
\qquad
\|[P,H]\|^2,
\qquad
\operatorname{Tr}(PHPH')
\]

can vary across \(\mathbb{CP}^2\).

## 4. Strengthened closure boundary

The previous closure audit left three live sources for family orientation. This theorem sharpens their roles:

- **gapped boundary memory alone:** preserves but cannot select;
- **gapped memory plus Standard Model Yukawa/Majorana tensors:** can select relatively, with coefficients and dynamics still to derive;
- **intrinsically generation-sensitive algebra:** could supply the missing tensor internally;
- **explicit family-breaking boundary data:** selects, but does so by input.

The admissible closure path must therefore be written

\[
P
\to
\mathbb Z_3
\to
(\text{BF core}+\text{memory relative to }H)
\to
\mathcal R[P;H]
\to
P,
\]

not as a self-selecting loop built from \(P\) alone.

## Terminal statement

The boundary-memory branch has produced a scoped no-go:

> Any anomaly-free, regulator-preserving, \(U(3)\)-equivariant gapped memory sector whose only family datum is one rank-one projector has an orientation-independent effective action. It can faithfully transport or diagnose the projector, but it cannot explain why that projector was chosen.

The branch reopens only when a second family tensor, a generation-sensitive algebraic operator, or an explicitly labelled external source is supplied.

