# The unique determinant-neutral line twist supplies the independent (U(1)) connection and derives charge three without family (SU(2))

## Main result

The minimal compatible connection sought in the closure programme has a clean global construction.

Let a primitive family projector split a rank-three Hermitian bundle as

\[
E_0=L\oplus Q,
\qquad
\operatorname{rank}L=1,
\qquad
\operatorname{rank}Q=2.
\]

Introduce one independent Hermitian line bundle \(R\) with compact \(U(1)\) connection \(a\), and form the twisted fundamental module

\[
\boxed{
E_R
=(L\otimes R^{-2})
\oplus
(Q\otimes R).
}
\]

This construction has five decisive properties:

1. determinant neutrality uniquely forces the weights \((-2,1,1)\) up to overall sign;
2. the cross-Peirce link has charge three;
3. the line bundle \(R\) supplies independent compact flux and flat-holonomy sectors;
4. the central element at angle \(2\pi/3\) acts faithfully as \(\omega\) on the fundamental module but trivially on the projector and cross-Peirce tangent geometry;
5. no independent \(SU(2)\) family connection is introduced—the connection on \(Q\) may remain the projector-induced universal connection.

This solves the previously isolated bundle-theoretic connection problem at the kinematic/module level. It does not yet derive why the line bundle is dynamically gauged, nor prove the required defect gap, but it provides the smallest globally coherent carrier on which those questions can be posed.

## 1. General determinant-neutral twist

Start with arbitrary integer weights \(m,n\) and form

\[
E_{m,n}
=(L\otimes R^m)
\oplus
(Q\otimes R^n).
\]

Because \(L\) has rank one and \(Q\) has rank two,

\[
\det(E_{m,n})
=\det(E_0)\otimes R^{m+2n}.
\]

Requiring the new relative phase not to alter the determinant gives

\[
m+2n=0.
\]

For a primitive action, require

\[
\gcd(|m|,|n|)=1.
\]

The integer solutions are therefore

\[
(m,n)=(-2,1)
\]

or its overall sign reversal.

Thus

\[
\boxed{
(-2,1,1)
}

is not merely a convenient traceless matrix. It is the unique primitive determinant-neutral way to twist a rank-one plus rank-two bundle by one compact line connection.

## 2. The global meaning of (X=I-3P)

On the selected line,

\[
X|_L=-2,
\]

and on the complementary plane,

\[
X|_Q=+1.
\]

Therefore the infinitesimal action of the connection on \(E_R\) is exactly

\[
iaX.
\]

The matrix expression

\[
X=I-3P
\]

is the local endomorphism form of the global line twist

\[
(L\otimes R^{-2})\oplus(Q\otimes R).
\]

The local and global constructions are equivalent, but the line-bundle formulation makes compactness, flux sectors, and holonomy explicit.

## 3. The cross-Peirce link has charge three

The oriented cross-Peirce bundle from the selected line to the complementary plane is

\[
\operatorname{Hom}(L,Q).
\]

After twisting,

\[
\begin{aligned}
\operatorname{Hom}(L\otimes R^{-2},Q\otimes R)
&\cong
\operatorname{Hom}(L,Q)
\otimes
\operatorname{Hom}(R^{-2},R)\\
&\cong
\operatorname{Hom}(L,Q)\otimes R^3.
\end{aligned}
\]

Thus

\[
\boxed{
S\in\Gamma\!\left(\operatorname{Hom}(L,Q)\otimes R^3\right)
}

has charge \(+3\). The reverse-oriented relation lies in

\[
\operatorname{Hom}(Q,L)\otimes R^{-3}
\]

and has charge \(-3\).

The charge is derived globally from the tensor powers of one line bundle:

\[
1-(-2)=3.
\]

## 4. Compatible connection

Let

\[
\nabla^L,
\qquad
\nabla^Q
\]

be connections on the projector-defined bundles \(L\) and \(Q\), and let

\[
\nabla^R=d+ia
\]

locally be a unitary connection on \(R\). The connection on \(E_R\) is

\[
\boxed{
\nabla^{E_R}
=
(\nabla^L-2ia)
\oplus
(\nabla^Q+ia\,I_Q).
}
\]

On the cross-Peirce link,

\[
\nabla^S
=
\nabla^{\operatorname{Hom}(L,Q)}+3ia.
\]

This is precisely the covariant derivative required for a charge-three Higgs/link field.

No independent \(SU(2)\) family gauge potential is required. If \(E_0\) is embedded in a fixed ambient rank-three bundle and \(P\) varies, the connections on \(L\) and \(Q\) can be the induced Grassmann connections determined by \(P\). Their nonabelian-looking components are then composite geometry, not new propagating gauge bosons.

## 5. Explicit universal connection from (P)

When \(E_0\) is a trivial Hermitian rank-three bundle with flat exterior derivative \(d\), define

\[
C_P=[P,dP].
\]

Since \(P\) and \(dP\) are Hermitian,

\[
C_P^\dagger=-C_P.
\]

The connection

\[
\nabla^P=d+C_P
\]

preserves the projector:

\[
D_{\nabla^P}P
=dP+[C_P,P]
=0.
\]

Indeed, differentiating \(P^2=P\) gives

\[
PdP+dPP=dP,
\]

from which

\[
[[P,dP],P]=-dP.
\]

On a section \(s_L\in L\), \(\nabla^P\) reduces to the projected connection \(Pds_L\); similarly it reduces to \(Qds_Q\) on \(Q\).

The full local connection can therefore be written

\[
\boxed{
\nabla=d+[P,dP]+ia(I-3P).
}

This compact formula contains:

- the composite connection required to transport the moving split;
- the independent compact relative connection \(a\);
- the unique determinant-neutral generator \(I-3P\).

Globally, the tensor-product formula on \(E_R\) is primary; the matrix formula is its local representative.

## 6. Gauge transformation law

Let \(R\) have a local gauge transformation

\[
r\mapsto e^{it}r.
\]

Then sections transform as

\[
s_L\mapsto e^{-2it}s_L,
\qquad
s_Q\mapsto e^{it}s_Q,
\qquad
S\mapsto e^{3it}S.
\]

With the convention

\[
a\mapsto a-dt,
\]

the corresponding covariant derivatives transform homogeneously.

The projector \(P\) acts on the untwisted splitting data and is invariant under this relative line-bundle gauge transformation. This avoids the ill-defined idea of allowing the generator itself to transform as an independent local family frame without a supporting connection.

## 7. Independent compact holonomies

The key improvement over the purely composite Berry connection is that \(a\) is a connection on an independent compact line bundle \(R\). It therefore admits:

- nontrivial first Chern class;
- independent flat holonomies on non-simply-connected spaces;
- a sum over topological bundle sectors;
- ordinary Abelian Higgs dualization.

The projector geometry still determines the relative weights and the representation of the link, but it no longer restricts the gauge holonomies to those generated by maps into \(\mathbb{CP}^2\).

This resolves the specific limitation identified in document 1187.

## 8. Central (mathbb Z_3)

At the gauge parameter

\[
t=\frac{2\pi}{3},
\]

the selected line transforms as

\[
e^{-4\pi i/3}=\omega,
\]

and the complementary plane transforms as

\[
e^{2\pi i/3}=\omega.
\]

Therefore

\[
E_R\mapsto\omega E_R.
\]

But the cross-Peirce link transforms as

\[
e^{3(2\pi i/3)}=1.
\]

Thus a nonzero link vacuum preserves the order-three subgroup while the fundamental matter module sees it faithfully:

\[
\boxed{
\begin{aligned}
S&\text{ is invariant under the residual }\mathbb Z_3,\\
E_R&\text{ transforms faithfully by }\omega.
\end{aligned}
}

This is the required Higgs pattern before incorporating the full Standard Model global quotient.

## 9. Curvature and determinant cancellation

Let

\[
f=da
\]

locally. The curvature of the twisted module is

\[
F_{E_R}
=
(F_L-2if)
\oplus
(F_Q+ifI_Q).
\]

Taking the trace,

\[
\operatorname{Tr}F_{E_R}
=F_L+\operatorname{Tr}F_Q
+(-2+2)if.
\]

The independent relative curvature cancels from the determinant exactly. If \(E_0=L\oplus Q\) is determinant-trivial, then \(E_R\) remains determinant-trivial.

This is the curvature-level expression of unimodularity.

## 10. Conditional derivation of level-three BF theory

Suppose the charge-three link develops a vacuum expectation value and all modes except its compact phase are gapped. Locally,

\[
S\sim ve^{i\theta}S_0,
\]

with

\[
D S\sim i(d\theta-3a)S.
\]

Dualizing \(\theta\) gives

\[
S_{\mathrm{IR}}
=\frac{3}{2\pi}\int b\wedge da
+\text{kinetic corrections}.
\]

The ingredients now have distinct derived roles:

\[
\begin{aligned}
P\text{ and rank }1+2
&\Rightarrow(-2,1,1),\\
(-2,1,1)
&\Rightarrow q(S)=3,\\
R\text{ with connection }a
&\Rightarrow\text{independent compact holonomies},\\
\langle S\rangle\neq0
&\Rightarrow\text{level-three BF theory}.
\end{aligned}
\]

The BF coefficient is therefore derived from the determinant-neutral line twist, not separately chosen.

## 11. Why this does not regenerate the forbidden gauge algebra

The only independent gauge field introduced by the twist is the connection on \(R\):

\[
\operatorname{Lie}U(1)_R\cong\mathbb R.
\]

The rank-two bundle \(Q\) does not receive an independent \(U(2)\) connection. Its connection may be induced from the projector geometry and existing physical gauge data. Consequently the construction does not produce the duplicated simple factors of

\[
A_{\mathrm{SM}}\otimes(\mathbb C\oplus\mathbb C)
\]

and does not require the full associative envelope generated by adjoining \(I-3P\).

It is a module twist, not an enlargement of the observable algebra.

## 12. What remains underived

The construction solves the kinematic/global connection problem but leaves dynamical questions:

1. Why is the line-bundle automorphism promoted to a local gauge redundancy rather than retained as a global symmetry?
2. What action gives the cross-Peirce link a stable nonzero vacuum?
3. What gaps its directional modes in the rank-two factor?
4. How does the full Standard Model charge lattice convert the fieldwise remnant into the previously derived raw \(\mathbb Z_9\) and physical \(\mathbb Z_3\)?
5. What fixes defect orientation and removes the twisted Dijkgraaf–Witten alternatives?
6. Does the quantum effective action produce a stable projector fixed point?

These questions are now dynamical rather than bundle-theoretic.

## 13. Closure significance

The programme previously needed an object with apparently incompatible properties:

- independent compact holonomy;
- weights determined by \(P\);
- faithful central action on matter;
- trivial central action on relations;
- no independent family \(SU(2)\) gauge field;
- no associative algebra enlargement.

The determinant-neutral line twist satisfies all six:

\[
\boxed{
E_R=(L\otimes R^{-2})\oplus(Q\otimes R).
}

The next closure task is therefore no longer “find the connection.” It is:

> Construct the minimal effective action on this twisted module, integrate out the gapped charge-three link, and compute the projector response \(\mathcal R[P]=\delta\Gamma/\delta P\).

If the resulting action produces the audited global quotient, an untwisted gapped defect, and a stable projector solution, the principal remaining loop will be closed.

