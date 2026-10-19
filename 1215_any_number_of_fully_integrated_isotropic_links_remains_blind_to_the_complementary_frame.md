# Any number of fully integrated isotropic links remains blind to the complementary frame

## Main result

Adding a second cross-Peirce link does not repair the single-link obstruction if all link directions are fully integrated and the action contains no independently anisotropic operator in the complementary plane.

Let

\[
S_a\in\operatorname{Hom}(P,Q),
\qquad a=1,\ldots,N,

\]

and suppose their action and measure are covariant under the stabilizer

\[
G_P=U(P)\times U(Q)\cong U(1)\times U(2).

\]

If the only external family tensors are \(P\) and \(B\), then the integrated partition function obeys

\[
\boxed{
Z(P,gBg^\dagger)=Z(P,B)
\qquad
\text{for every }gP=Pg=P.
}

\]

It is therefore constant on the entire \(U(2)\) completion orbit and can depend only on the two one-projector moments \(\operatorname{Tr}(PB)\) and \(\operatorname{Tr}(PB^2)\) at fixed spectrum.

This holds for every finite number of isotropic links and for arbitrary self-interactions among them.

## 1. Change-of-variables proof

Write the link collection as a \(2\times N\) matrix

\[
W=(S_1\ \cdots\ S_N).

\]

Under \(g\in U(Q)\),

\[
W\mapsto gW,
\qquad
B\mapsto gBg^\dagger.

\]

Assume

\[
S_{\rm link}[gW;P,gBg^\dagger]
=S_{\rm link}[W;P,B]

\]

and that the functional measure is invariant. Then

\[
\begin{aligned}
Z(P,gBg^\dagger)
&=\int dW\,e^{-S_{\rm link}[W;P,gBg^\dagger]}\\
&=\int dW\,e^{-S_{\rm link}[g^\dagger W;P,B]}\\
&=Z(P,B).
\end{aligned}
\]

No Gaussian assumption is used.

## 2. Why the Gram matrix does not solve the problem

The first fundamental invariants of the left \(U(2)\) action are the entries of

\[
G=W^\dagger W.

\]

For two links,

\[
G=
\begin{pmatrix}
S^\dagger S&S^\dagger T\\
T^\dagger S&T^\dagger T
\end{pmatrix}.

\]

This records norms and the relative inner product of the links. It lives in the labelled link-species space. It is unchanged when both vectors are rotated together inside \(Q\).

Consequently, \(G\) can determine whether the links are parallel, independent or orthogonal, but it cannot determine how their span is oriented relative to a physical frame in \(Q\). For two independent vectors the span is already all of \(Q\); the missing information is the left polar factor of \(W\), and that factor is precisely what the \(U(2)\) quotient removes.

## 3. Condensation does not equal prediction

If two links condense into an invertible matrix \(W\), they can spontaneously define an ordered basis of \(Q\). But with exact \(U(2)\) symmetry every rotated basis has the same energy. The condensate creates an orbit of vacua rather than selecting a relative orientation.

This may be a legitimate spontaneous-symmetry-breaking model, but it does not predict the mixing frame. Its chosen vacuum direction is initial-condition or superselection data unless another interaction lifts the orbit.

Thus:

\[
\boxed{
\text{more relational carriers can complete a frame, but multiplicity alone cannot orient it.}
}

## 4. What actually breaks the no-go

The change-of-variables theorem fails only when the action contains an additional object that does not transform trivially under the complementary \(U(2)\). Examples are:

1. the nondegenerate compression \(QAQ\) of the other Yukawa tensor;
2. a separately derived response \(QHQ\) with a simple spectrum;
3. boundary or defect data carrying a labelled direction in \(Q\);
4. an anomaly or measure effect that genuinely breaks the stabilizer symmetry.

The first option is the least expansive because the charged-lepton tensor \(A\) is already part of the double-frame problem. It should be tested before introducing more fields.

## 5. Revised next calculation

The minimal anisotropic quadratic kernel is

\[
K_Q=m^2Q+\alpha QAQ+\beta QBQ.

\]

Its determinant can see one completion-sensitive cross invariant,

\[
\operatorname{Tr}(QAQ\,QBQ).

\]

The next question is whether this supplies both missing completion coordinates. The dimension count suggests it supplies only one; a term involving \(QB^2Q\), a second noncommuting kernel, or multiple inequivalent loop thresholds may be required for the fourth moment.

That is now the highest-value minimal calculation.

## Certificate

`scripts/verify_multi_link_isotropic_blindness.mjs` rotates two links and the complementary response together, verifies invariance of their Gram matrix and interacting action, and simultaneously verifies that the full double-frame moments change when the same complementary rotation is applied relative to a fixed nondegenerate reference frame.
