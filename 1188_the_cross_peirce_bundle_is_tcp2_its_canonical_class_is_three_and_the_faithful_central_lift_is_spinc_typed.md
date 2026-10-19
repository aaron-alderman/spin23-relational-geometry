# The cross-Peirce bundle is (T\mathbb{CP}^2), its canonical class is three, and the faithful central lift is Spin\(^c\)-typed

> **Correction after the central-kernel audit (document 1189).** The non-spin and canonical Spin\(^c\) statements below are correct, but the Spin\(^c\) determinant \(\mathcal O(3)\) does **not** provide the faithful \(\mathbb Z_3\) lift: it has central weight six and is blind to the order-three centre. The faithful lift is the universal fundamental module \(L\oplus Q\), on which the centre acts as \(\omega\). Read “Spin\(^c\)-typed” here only as an analogy indicating the need for extra fermionic lifting data, not as the identified mechanism.

## Result

The rank-one projector orbit supplies a global geometric explanation for the recurring coefficient three.

Let \(L\) be the tautological line over \(\mathbb{CP}^2\) and \(Q\) the universal rank-two quotient bundle. Then the cross-Peirce relation bundle is

\[
\operatorname{Hom}(L,Q)
\cong
T\mathbb{CP}^2.
\]

Its first Chern class is

\[
c_1(T\mathbb{CP}^2)=3h,
\]

where \(h=c_1(\mathcal O(1))\) is the primitive hyperplane class. Equivalently,

\[
K^{-1}_{\mathbb{CP}^2}
\cong
\det T\mathbb{CP}^2
\cong
\mathcal O(3).
\]

Thus the same coefficient three appears in three equivalent languages:

\[
\boxed{
\begin{aligned}
X&=I-3P,\\
\operatorname{weight}\operatorname{Hom}(L,Q)&=3,\\
c_1(T\mathbb{CP}^2)&=3h.
\end{aligned}}
\]

This proves that the factor three in the quadratic projector curvature is globally meaningful and not merely a normalization artifact.

The same geometry exposes a central-lift obstruction. The stabilizer is

\[
S(U(1)\times U(2))\cong U(2),
\]

whose central circle is tied to the \(SU(2)\) centre. A primitive charge-one singlet line is not an ordinary representation of the full stabilizer; only the determinant character is globally canonical. Correspondingly, \(\mathbb{CP}^2\) is not spin but is canonically Spin\(^c\), with determinant line \(K^{-1}=\mathcal O(3)\). This gives a precise geometric analogue of the already identified need for a fermionic central lift.

## 1. Universal line-plus-plane geometry

The orbit of Hermitian rank-one projectors in \(\mathbb C^3\) is

\[
\mathcal O_P
\cong
\mathbb{CP}^2
\cong
\frac{SU(3)}{S(U(1)\times U(2))}.
\]

Over this orbit there is a universal exact sequence

\[
0
\longrightarrow
L
\longrightarrow
\underline{\mathbb C}^{,3}
\longrightarrow
Q
\longrightarrow
0,
\]

where:

- \(L\) is the selected rank-one subspace;
- \(Q\) is the complementary rank-two quotient;
- \(\underline{\mathbb C}^{,3}\) is the trivial ambient bundle.

In projector notation, the fibres are

\[
L_P=P\mathbb C^3,
\qquad
Q_P=(I-P)\mathbb C^3.
\]

Infinitesimal motion of a line is a linear map from that line into its quotient. Therefore

\[
T_P\mathbb{CP}^2
\cong
\operatorname{Hom}(L_P,Q_P).
\]

Globally,

\[
\boxed{
T\mathbb{CP}^2
\cong
L^*\otimes Q
\cong
\operatorname{Hom}(L,Q).
}
\]

This is exactly the \(Q\mathcal A P\) cross-Peirce sector. Its conjugate is the antiholomorphic tangent/cotangent counterpart. The relational degrees of freedom are not merely analogous to motion on the projector space; they *are* its tangent directions.

## 2. The weight-three calculation

The central one-parameter subgroup of the stabilizer can be written

\[
g(t)=\exp(itX)
=\operatorname{diag}(e^{-2it},e^{it},e^{it}),
\qquad
X=\operatorname{diag}(-2,1,1).
\]

It acts on the selected line with weight \(-2\):

\[
L\mapsto e^{-2it}L,
\]

and on the quotient plane with weight \(+1\):

\[
Q\mapsto e^{it}Q.
\]

Hence

\[
\operatorname{Hom}(L,Q)
\mapsto
e^{it}e^{2it}\operatorname{Hom}(L,Q)
=e^{3it}\operatorname{Hom}(L,Q).
\]

Therefore

\[
\boxed{
\operatorname{weight}_X T\mathbb{CP}^2=3.
}
\]

Charge three is the isotropy weight of the tangent directions to the rank-one projector orbit.

This is stronger than saying that the difference between \(-2\) and \(+1\) happens to equal three. It says that the relational charge is the canonical homogeneous-space representation carried by the tangent bundle.

## 3. The Chern-class calculation

Let

\[
h=c_1(L^*)=c_1(\mathcal O(1)).
\]

Since the ambient rank-three bundle is trivial, the universal exact sequence gives

\[
c_1(L)+c_1(Q)=0.
\]

Because

\[
c_1(L)=-h,
\]

we have

\[
c_1(Q)=h.
\]

For a rank-\(r\) bundle \(E\) and a line bundle \(K\),

\[
c_1(E\otimes K)
=c_1(E)+r\,c_1(K).
\]

Using \(T\mathbb{CP}^2=L^*\otimes Q\) and \(\operatorname{rank}Q=2\),

\[
\begin{aligned}
c_1(T\mathbb{CP}^2)
&=c_1(Q)+2c_1(L^*)\\
&=h+2h\\
&=3h.
\end{aligned}
\]

Thus

\[
\boxed{c_1(T\mathbb{CP}^2)=3h.}
\]

Taking determinants gives

\[
\det T\mathbb{CP}^2
\cong
\mathcal O(3).
\]

Since \(\det T^{1,0}M=K_M^{-1}\),

\[
\boxed{
K^{-1}_{\mathbb{CP}^2}
\cong
\mathcal O(3).
}
\]

The integer three is the Fano index of \(\mathbb{CP}^2\).

## 4. Relation to the projector-curvature identity

The previous note derived

\[
-i\operatorname{Tr}\!\left(X\,DP\wedge DP\right)
=3i\operatorname{Tr}\!\left(P\,DP\wedge DP\right).
\]

The two-form

\[
-i\operatorname{Tr}\!\left(P\,dP\wedge dP\right)
\]

is, up to sign and normalization convention, the pullback of the primitive Fubini–Study curvature representing \(h\). Multiplying it by three therefore represents

\[
3h=c_1(T\mathbb{CP}^2)=c_1(K^{-1}).
\]

The local matrix identity and the global characteristic-class calculation are the same fact viewed at two levels:

\[
\boxed{
-i\operatorname{Tr}(XDP\wedge DP)
\quad\text{is the local curvature representative of the canonical triple class.}
}
\]

This is the first result in the branch showing that the coefficient three is simultaneously:

- a relative weight;
- a Peirce charge;
- a tangent-bundle isotropy weight;
- a first Chern number coefficient;
- an anticanonical degree.

## 5. Why a primitive charge-one line is not automatic

The stabilizer can be represented as

\[
H=S(U(1)\times U(2))
\cong U(2).
\]

An element \(U\in U(2)\) acts on the selected line by

\[
z=(\det U)^{-1}
\]

so that \(z\det U=1\). Hence the tautological line is the inverse determinant representation:

\[
L\cong(\det Q)^{-1}.
\]

On the central subgroup \(U=e^{it}I_2\),

\[
\det U=e^{2it},
\]

and consequently

\[
L:e^{-2it},
\qquad
Q:e^{it}.
\]

The quotient plane carries central weight one because it is an \(SU(2)\) doublet. But a standalone one-dimensional character of the full \(U(2)\) stabilizer is an integer power of \(\det U\), and therefore has even central weight.

Equivalently, writing formally

\[
L\stackrel{?}{=}R^{-2}
\]

would require a square root

\[
R^2\cong L^*=\mathcal O(1).
\]

No ordinary global line bundle \(R\) with this property exists over \(\mathbb{CP}^2\), because the primitive class \(h\) is not divisible by two in

\[
H^2(\mathbb{CP}^2,\mathbb Z)\cong\mathbb Z.
\]

Thus the projector orbit itself naturally supplies the doublet with central weight one and determinant lines with even central weight, but not an independent global charge-one singlet line.

This is a precise global-form obstruction, not a local algebra problem.

## 6. The Spin\(^c\) structure

For a complex manifold,

\[
w_2(TM)\equiv c_1(TM)\pmod 2.
\]

Therefore

\[
w_2(T\mathbb{CP}^2)
\equiv
3h
\equiv
h
\not\equiv0
\pmod2.
\]

Hence \(\mathbb{CP}^2\) is not spin.

It nevertheless possesses its canonical Spin\(^c\) structure, whose determinant line is

\[
K^{-1}_{\mathbb{CP}^2}
\cong
\mathcal O(3).
\]

This is notable because the obstruction and its canonical repair are controlled by the same triple class:

\[
c_1(K^{-1})=3h,
\qquad
c_1(K^{-1})\equiv w_2\pmod2.
\]

The programme had already found that:

- the Jordan automorphism action loses the central \(\mathbb Z_3\);
- the fermion module retains it;
- an additional central lift is required to make that action physical.

The projector-orbit geometry now presents an analogous statement:

- the bosonic tangent geometry is globally well defined;
- an ordinary spin lift is obstructed;
- a Spin\(^c\) lift, carrying an additional determinant line, is canonical.

This does **not** prove that the required fermion lift is literally the canonical Spin\(^c\) structure of \(\mathbb{CP}^2\). It establishes that the missing data have the same mathematical type: fermions require a central line extension invisible to the purely bosonic projective geometry.

## 7. A refined candidate for the mediator

The preceding calculations suggest replacing the loose phrase “connection on projector space” with a more exact package:

\[
\boxed{
(P,\mathcal A_H,\mathcal L_{\mathrm{Spin}^c})
}

where:

1. \(P\) is a section of the \(\mathbb{CP}^2\) rank-split bundle;
2. \(\mathcal A_H\) is a connection on the reduced stabilizer bundle;
3. \(\mathcal L_{\mathrm{Spin}^c}\) is the determinant line supplying the central fermionic lift;
4. the cross-Peirce curvature represents the triple anticanonical class;
5. transgression of that class is tested against the level-three BF response.

This is more constrained than an arbitrary Shiab operator. The contracting and lifting data are determined by the homogeneous geometry of the primitive-idempotent orbit.

## 8. The remaining normalization problem

Three related but distinct normalizations now coexist:

1. **central subgroup weight:** tangent vectors transform with weight \(+3\) under \(e^{itX}\);
2. **hyperplane class:** \(c_1(T\mathbb{CP}^2)=3h\);
3. **physical charge lattice:** Standard Model fermions use the primitive integral normalization leading to the raw \(\mathbb Z_9\) and physical quotient \(\mathbb Z_3\).

They strongly suggest one structure, but their equivalence has not yet been proved. In particular:

- the hyperplane line \(\mathcal O(1)\) has central weight two under the stabilizer parameterization;
- tangent vectors have central weight three but form an \(SU(2)\) doublet;
- the faithful fermionic module need not be an ordinary bundle over the projector orbit;
- the physical colour-centre quotient occurs in the Standard Model gauge group, not solely in \(H=S(U(1)\times U(2))\).

A successful completion must construct the combined principal bundle and compute its true integral cocharacter lattice. Numerical agreement of the coefficients is not enough.

## 9. New stop/eureka test

The next calculation should build the fibre product of:

- the rank-split stabilizer bundle;
- the Standard Model global gauge bundle;
- the candidate Spin\(^c\) determinant line;
- the fermion representation.

Then compute:

1. its central kernel;
2. its integral character and cocharacter lattices;
3. the action of \(e^{2\pi iX/3}=\omega I_3\);
4. the image of \(c_1(K^{-1})=3h\) in the physical quotient;
5. whether its differential-cohomology transgression is exactly the level-three BF class.

The two possible terminal outcomes are sharp.

### Eureka condition

The canonical Spin\(^c\) lift and the Standard Model colour-centre quotient identify the anticanonical triple class with the physical \(\mathbb Z_3\) response, while retaining the full nine-state flat-holonomy carrier.

### Stop condition

The triple anticanonical class lives only in the composite projector sector or maps trivially/multiply into the physical charge lattice, so it cannot generate the independent BF field or its faithful \(\mathbb Z_3\) quotient.

## 10. Interpretation

The Shiab intuition has now sharpened into established geometry:

\[
\text{primitive projector}
\longrightarrow
\mathbb{CP}^2
\longrightarrow
T\mathbb{CP}^2=\operatorname{Hom}(L,Q)
\longrightarrow
c_1=3h
\longrightarrow
K^{-1}=\mathcal O(3).
\]

The “living relation” between the selected line and the remaining plane is literally the tangent bundle of the space of possible selections. Its canonical curvature carries three. Its fermionic realization requires a central lift because that space is not spin.

This is not yet the missing physical mechanism, but it is no longer merely an analogy. It is a coherent global geometric structure whose next obstruction can be calculated exactly.

