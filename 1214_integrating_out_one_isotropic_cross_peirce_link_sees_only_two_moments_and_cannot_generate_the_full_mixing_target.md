# Integrating out one isotropic cross-Peirce link sees only two moments and cannot generate the full mixing target

## Main result

The most direct proposed source of the four target moments fails in its minimal form.

Fix a rank-one projector \(P\) and its complement \(Q=I-P\). Let a dynamical cross-Peirce link

\[
S\in\operatorname{Hom}(P,Q)\cong\mathbb C^2

\]

have a quadratic action whose family dependence is supplied by a Hermitian tensor \(B\):

\[
S^\dagger\bigl(m^2Q+\kappa QBQ\bigr)S.

\]

Gaussian integration produces

\[
\Gamma_{\rm link}(P,B)
\supset
\log\det_Q\bigl(m^2Q+\kappa QBQ\bigr).

\]

This determinant depends on the relative orientation only through

\[
s=\operatorname{Tr}(PB),
\qquad
t=\operatorname{Tr}(PB^2).

\]

Those are precisely the two probability coordinates of one projector relative to the spectral frame of \(B\). The determinant is blind to rotations of the frame completion inside \(Q\), which carry the other two physical mixing coordinates.

Therefore:

\[
\boxed{
\text{one isotropically integrated cross-Peirce link cannot generate the full four-moment mixing potential.}
}

## 1. Exact two-by-two determinant reduction

On the rank-two space \(Q\),

\[
\det_Q(QBQ)
=\frac12\left[operatorname{Tr}(QBQ)^2-operatorname{Tr}\bigl((QBQ)^2\bigr)\right].

\]

Let

\[
T_1=\operatorname{Tr}B,
\qquad
T_2=\operatorname{Tr}B^2,
\qquad
s=\operatorname{Tr}(PB),
\qquad
t=\operatorname{Tr}(PB^2).

\]

Then

\[
\operatorname{Tr}(QBQ)=T_1-s.

\]

Using \(Q=I-P\), cyclicity and the rank-one identity

\[
PBP=sP,

\]

gives

\[
\operatorname{Tr}\bigl((QBQ)^2\bigr)
=T_2-2t+s^2.

\]

Hence

\[
\boxed{
\det_Q(QBQ)
=\frac12(T_1^2-T_2)-T_1s+t.
}

\]

For the massive kernel,

\[
\det_Q(m^2Q+\kappa QBQ)
=m^4+m^2\kappa(T_1-s)
+\kappa^2\left[\frac12(T_1^2-T_2)-T_1s+t\right].

\]

At fixed spectrum of \(B\), all orientation dependence is contained in \((s,t)\).

## 2. Why these are only two mixing coordinates

If

\[
B=\sum_jb_jF_j,

\]

then

\[
s=\sum_jb_j\operatorname{Tr}(PF_j),
\qquad
t=\sum_jb_j^2\operatorname{Tr}(PF_j).

\]

For distinct \(b_j\), these two moments reconstruct the three probabilities

\[
p_j=\operatorname{Tr}(PF_j),
\qquad
\sum_jp_j=1.

\]

They specify one row or column of the unistochastic overlap matrix. They do not specify how the remaining two eigenlines of \(B\) sit inside \(Q\).

## 3. The hidden U(2) symmetry proves the general obstruction

Let \(g\) lie in the stabilizer of \(P\):

\[
gP g^\dagger=P,
\qquad
g|_Q\in U(2).

\]

Then

\[
B\mapsto gBg^\dagger

\]

changes the completion of the \(B\)-frame inside \(Q\), but leaves

\[
\operatorname{Tr}(PB^n)

\]

unchanged for every \(n\). A link action and measure that are covariant under this stabilizer therefore produce an effective action constant along the entire completion orbit.

This conclusion is not restricted to the displayed Gaussian kernel. It applies to any fully integrated single-link sector whose only family inputs are \(P\), \(B\), and \(U(2)\)-invariant contractions.

The integration erases the very \(\mathbb{CP}^1\) direction that the uncondensed link could have used to complete the frame.

## 4. Condensing and integrating are not the same operation

There are now two sharply distinct link branches:

### Condensed directional link

A nonzero expectation value \(\langle S\rangle\) selects a line in \(Q\) and completes \(P\) to a full frame. But a norm-only action leaves that line continuously degenerate.

### Fully integrated isotropic link

Integrating over all link directions restores the \(U(2)\) symmetry and yields only functions of the two one-projector moments. It cannot retain the completion data.

Thus one cannot both average over the link direction and expect that direction to return as a four-coordinate family selector.

## 5. Minimal repairs

To generate all four overlap moments, the link sector must contain something that breaks or resolves the complementary \(U(2)\) orbit. The smallest live options are:

1. **two independent links:** their relative direction supplies an invariant inside \(Q\);
2. **one link plus a nondegenerate complementary response:** \(QHQ\) selects an eigenline, though the origin of \(H\) must be audited;
3. **a retained condensate rather than full integration:** followed by a self-consistent effective action for its projective direction;
4. **a higher relational loop:** a coupling involving both frame tensors and the link in a way not reducible to \(P\)-moments.

Each repair introduces a second datum inside \(Q\). This is not gratuitous: document 1212 proves that two further real coordinates are mathematically required.

## 6. Next frontier

The highest-value minimal branch is now the two-link model. For

\[
S,T\in\operatorname{Hom}(P,Q),

\]

the Gram matrix

\[
G=
\begin{pmatrix}
S^\dagger S&S^\dagger T\\
T^\dagger S&T^\dagger T
\end{pmatrix}

\]

contains a relative magnitude and phase that survive the common \(U(2)\) action. The next test is whether its invariant potential genuinely reconstructs the missing \(\mathbb{CP}^1\) completion or merely introduces a new arbitrary frame under another name.

## Certificate

`scripts/verify_single_link_two_moment_no_go.mjs` checks the determinant identity and exhibits a complementary-plane rotation that changes the four full-frame moments while leaving the one-link determinant exactly invariant.
