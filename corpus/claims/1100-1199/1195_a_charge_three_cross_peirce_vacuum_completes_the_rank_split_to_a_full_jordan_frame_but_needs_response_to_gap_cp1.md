# A charge-three cross-Peirce vacuum completes the rank split to a full Jordan frame but needs response to gap \(\mathbb{CP}^1\)

> **Scope refinement (document 1198).** The analysis below applies when the entire section of \(\operatorname{Hom}(L,Q)\otimes R^3\) is dynamical. In the phenomenological scalar-flavon branch the link factorizes as \(\Phi=sK\), with a charge-three scalar \(s\in R^3\) and a fixed or separately dynamical neutral map \(K\in\operatorname{Hom}(L,Q)\). A fixed \(K\) removes the \(\mathbb{CP}^1\) Goldstone problem but inserts the family direction as spurion data. The two branches must not be conflated.

## Main result

Let

\[
E_0=L\oplus Q,
\qquad
\operatorname{rank}L=1,
\qquad
\operatorname{rank}Q=2,
\]

and let the determinant-neutral line twist be

\[
E_R=(L\otimes R^{-2})\oplus(Q\otimes R).
\]

An oriented cross-Peirce link is a section

\[
S\in\Gamma\!\left(\operatorname{Hom}(L,Q)\otimes R^3\right).
\]

If \(S\) is nonzero, its image is a line inside \(Q\). Consequently \((P,S)\) does not merely retain a \(1\oplus2\) split: it canonically refines that split to three rank-one directions. A normalized link defines

\[
P_1=P,
\qquad
P_2=\frac{SS^\dagger}{\operatorname{Tr}(SS^\dagger)},
\qquad
P_3=I-P_1-P_2,
\]

with

\[
P_iP_j=\delta_{ij}P_i,
\qquad
P_1+P_2+P_3=I.
\]

Thus a charge-three cross-Peirce condensate completes a primitive idempotent to a full Jordan frame.

However, the minimal norm-only link potential leaves a \(\mathbb{CP}^1\) of inequivalent directions inside \(Q\). If the corresponding \(SU(2)\) is a genuine global symmetry, the vacuum has two real Goldstone modes and the desired finite defect is not isolated. A nondegenerate family-response operator is required to select and gap the link direction.

## 1. From a link to a second projector

At a point where \(S\neq0\), choose a unit vector \(\ell\) spanning \(L\). Then

\[
q=S\ell\in Q
\]

is nonzero. The line spanned by \(q\) is independent of the phase choice of \(\ell\), because changing \(\ell\) rescales \(q\) by the inverse phase.

The corresponding rank-one projector in \(Q\) is

\[
P_2=\frac{|q\rangle\langle q|}{\langle q,q\rangle}.
\]

In bundle notation this is

\[
P_2=\frac{SS^\dagger}{\operatorname{Tr}(SS^\dagger)}.
\]

Because the image of \(S\) lies in \(Q\),

\[
P_1P_2=0.
\]

The remaining projector

\[
P_3=I-P_1-P_2

\]

is also rank one. Hence \(S\) supplies the second step in a complete flag.

## 2. Full Jordan frame

A Jordan frame in \(\operatorname{Herm}_3(\mathbb C)\) is a maximal set of mutually orthogonal primitive idempotents summing to the identity. Therefore

\[
\boxed{
(P,S\neq0)
\longrightarrow
(P_1,P_2,P_3)
\text{ a full Jordan frame}.
}

This gives a precise version of a possible generational sequence:

\[
\text{select one}
\longrightarrow
\text{relate it to the remaining pair}
\longrightarrow
\text{the relation selects a second}
\longrightarrow
\text{the third is fixed as the complement}.
\]

The third projector is not separately chosen. It is the remainder required by completeness.

## 3. Gauge phase and directional data separate

For fixed nonzero norm, a link in the complex two-dimensional space \(\operatorname{Hom}(L,Q)\cong\mathbb C^2\) lies on

\[
S^3.
\]

The compact relative \(U(1)\) acts by

\[
S\mapsto e^{3it}S.
\]

As a continuous orbit, quotienting the overall phase gives

\[
S^3/U(1)\cong\mathbb{CP}^1\cong S^2.
\]

Because the action has charge three, a residual stabilizer remains:

\[
e^{3it}=1
\quad\Longrightarrow\quad
t=\frac{2\pi k}{3}.
\]

Therefore the vacuum contains two distinct pieces:

\[
\boxed{
\text{finite gauge remnant }\mathbb Z_3
\quad+quad
\text{continuous directional manifold }\mathbb{CP}^1.
}

The \(\mathbb Z_3\) is desired. The \(\mathbb{CP}^1\) is a gap problem unless its directions are gauge redundant or explicitly lifted.

## 4. Minimal invariant potential and its limitation

The minimal link potential is

\[
V_0(S)
=-\mu^2 S^\dagger S
+\lambda(S^\dagger S)^2,
\qquad
\lambda>0.
\]

For \(\mu^2>0\), its minima satisfy

\[
S^\dagger S=v^2
=\frac{\mu^2}{2\lambda}
\]

up to normalization convention.

This potential depends only on the norm and therefore cannot distinguish directions in \(Q\). After the charge-three phase is gauged, the vacuum still has the \(\mathbb{CP}^1\) direction manifold.

If the rank-two sector has an exact global \(SU(2)\), the breaking pattern is

\[
SU(2)\longrightarrow U(1),
\]

and there are

\[
\dim SU(2)-\dim U(1)=2
\]

real Goldstone modes.

This yields a sharp no-go for the norm-only model:

\[
\boxed{
V_0(S)\text{ alone cannot produce an isolated gapped level-three defect.}
}

## 5. Response-induced orientation

Let \(\mathcal R[P]\) be the Hermitian effective family-response operator. Its restriction to the complementary plane is

\[
\mathcal R_Q=Q\mathcal R[P]Q.
\]

The lowest-order directional coupling is

\[
V_{\mathrm{orient}}(S)
=\kappa S^\dagger\mathcal R_Q S.
\]

If \(\mathcal R_Q\) has two distinct eigenvalues, this term selects one of its two eigenlines. The link direction is then fixed, and fluctuations toward the other direction acquire a mass proportional to the eigenvalue splitting.

Thus the same response that enters the projector closure equation can gap the link-direction modes:

\[
\boxed{
\text{spectral gap of }\mathcal R_Q
\longleftrightarrow
\text{mass gap for the }\mathbb{CP}^1\text{ directions}.
}

## 6. A generic response selects the full frame

Suppose \(\mathcal R\) has a simple spectrum

\[
\lambda_1<\lambda_2<\lambda_3

\]

with spectral projectors

\[
\Pi_1,\Pi_2,\Pi_3.
\]

A projector coupling can select

\[
P_1=\Pi_1
\]

or another extremal eigendirection depending on its sign. Restricting \(\mathcal R\) to the complement then gives the remaining two eigenlines. The link coupling selects one of them:

\[
P_2=\Pi_2,
\]

and completeness fixes

\[
P_3=I-P_1-P_2=\Pi_3.
\]

Therefore

\[
\boxed{
\text{a nondegenerate Hermitian response plus one cross-Peirce link selects an ordered three-family Jordan frame.}
}

The eigenvalue gaps control the masses of frame-orientation fluctuations.

## 7. Relation to Yukawa data

In a realistic theory, \(\mathcal R\) may receive contributions from fermion determinants and Yukawa spurions. Schematically,

\[
\mathcal R
=c_eY_eY_e^\dagger
+c_\nu Y_\nu Y_\nu^\dagger
+c_uY_uY_u^\dagger
+c_dY_dY_d^\dagger
+\cdots.
\]

This formula is only schematic because the Standard Model Yukawa matrices act on several distinct left- and right-handed family spaces. A completed action must specify the intertwiners placing these terms in one common response bundle.

Two possibilities must be distinguished.

### Yukawas as fixed spurions

They explicitly select the frame and gap the directional modes, but the family hierarchy remains input rather than derived.

### Yukawas as dynamical relational fields

Their joint effective potential may select the frame, but then their own radial, phase, and orientation modes must be audited for Goldstones, anomalies, and unwanted light particles.

The second route offers deeper closure but carries a larger dynamical burden.

## 8. Overall orientation versus physical selection

If the entire action is exactly invariant under simultaneous global \(U(3)\) rotation of all family fields, it cannot choose an absolute basis in \(\mathbb C^3\). Any full frame has a conjugate orbit of equivalent frames.

This is not necessarily a physical failure. Family labels such as “first,” “second,” and “third” are basis conventions until masses and interactions distinguish them. What must be derived is the invariant spectrum and relative orientation of the different Yukawa/response operators, not an absolute coordinate frame.

The correct closure target is therefore:

\[
\boxed{
\text{derive a stable conjugacy class of ordered frames and their relative mixing data, not an absolute family label.}
}

If the global \(U(3)\) is a physical symmetry rather than a basis redundancy, however, spontaneous frame selection produces Goldstones and must be explicitly broken or gauged.

## 9. Relation to the BF phase

Once the link direction and radial mode are gapped, its remaining compact phase has charge three under the independent connection on \(R\). Dualization then yields

\[
\frac{3}{2\pi}\int b\wedge da.
\]

The required hierarchy is:

\[
\begin{aligned}
\text{radial link mass}&>0,\\
\text{directional response gap}&>0,\\
\text{charged fermion defect gap}&>0,\\
\text{phase Higgsing}&\Rightarrow\mathbb Z_3\text{ topological sector}.
\end{aligned}
\]

Without the directional response gap, the low-energy theory is BF coupled to a gapless \(\mathbb{CP}^1\) sigma model rather than an isolated finite carrier.

## 10. Closure consequence

The projector response and link response are not separate problems. They are two stages of the same spectral closure:

\[
\boxed{
\begin{aligned}
[P,\mathcal R]&=0
&&\text{selects the }1\oplus2\text{ split},\\
[P_2,Q\mathcal RQ]&=0
&&\text{selects a line inside the remaining }2,\\
P_3&=I-P-P_2
&&\text{completes the frame}.
\end{aligned}
}

The programme can therefore replace the vague question “which family is selected?” with the sharper dynamical question:

> Does the full quantum response have a simple spectrum and a positive Hessian on the flag manifold?

If yes, the family frame is stable and all projector/link orientation modes are gapped. If the response has a persistent degeneracy, the corresponding continuous modes remain and the finite defect cannot be isolated without additional physics.

