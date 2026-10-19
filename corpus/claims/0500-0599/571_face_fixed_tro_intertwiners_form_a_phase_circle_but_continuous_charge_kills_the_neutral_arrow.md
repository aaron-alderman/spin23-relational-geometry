# Face-Fixed TRO Intertwiners Form a Phase Circle, but Continuous Charge Kills the Neutral Arrow

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact classification/no-go theorem with two explicit minimal repairs; physical choice between the repairs remains open

## Executive result

The promised binary-to-Furey intertwiner classification is now complete under pointwise population-face preservation.

Let

\[
p=E_{11},\qquad q=E_{22},\qquad a=E_{12}
\]

be the split real lift of the finite triangular carrier, and map \(p,q\) to the two scalar population corners of Furey’s unique \(M_2(\mathbb C)\) linking factor.

The Peirce equations force

\[
F(a)\in pM_2(\mathbb C)q=\mathbb C E_{12},
\]

so every nonzero face-preserving algebra embedding has

\[
F_\lambda(a)=\lambda E_{12},\qquad \lambda\in\mathbb C^*.
\]

Preservation of the TRO identity

\[
[a,a,a]=aa^*a=a
\]

then gives

\[
|\lambda|^2\lambda=\lambda,
\]

and hence

\[
\boxed{|\lambda|=1.}
\]

Thus face-fixed TRO embeddings form exactly a phase circle.

But the finite lifted arrow is one real neutral line, while the Furey arrow has nonzero continuous Abelian charge:

\[
E_{12}\mapsto e^{i\phi}E_{12}.
\]

Equivariance would require

\[
\lambda=e^{i\phi}\lambda
\quad\text{for every }\phi,
\]

which forces \(\lambda=0\). Therefore:

\[
\boxed{
\text{there is no nonzero population-face-fixed TRO embedding of the neutral real arrow that is continuously }U(1)\text{-equivariant}.}
\]

This turns the Cycle 486 invariant-subspace obstruction into a complete intertwiner theorem.

## 1. Peirce-corner classification

Pointwise face preservation means

\[
F(p)=p,\qquad F(q)=q.
\]

The source arrow obeys

\[
pa=a=aq,
\qquad
qa=ap=0.
\]

An algebra homomorphism must therefore satisfy

\[
pF(a)=F(a)=F(a)q,
\qquad
qF(a)=F(a)p=0.
\]

For a generic matrix

\[
X=\begin{pmatrix}x_{11}&x_{12}\\x_{21}&x_{22}\end{pmatrix},
\]

one has

\[
pXq=x_{12}E_{12}.
\]

Hence the entire target corner is one complex dimensional:

\[
pM_2(\mathbb C)q=\mathbb C E_{12}.
\]

There are no hidden face-fixed arrow directions. The sole freedom is \(\lambda\).

## 2. TRO preservation fixes the norm

The transpose/dagger completion is governed by

\[
[x,y,z]=xy^*z.
\]

The matrix unit obeys

\[
[E_{12},E_{12},E_{12}]=E_{12}.
\]

Therefore

\[
[\lambda E_{12},\lambda E_{12},\lambda E_{12}]
=|\lambda|^2\lambda E_{12}.
\]

For a nonzero TRO embedding this must equal \(\lambda E_{12}\), so \(|\lambda|=1\). The interface moduli before gauge covariance are

\[
\operatorname{Hom}^{\rm face}_{\rm TRO}
\cong U(1).
\]

If entrywise real structure is also required, then

\[
\lambda=\bar\lambda,qquad |\lambda|=1,
\]

leaving only

\[
\lambda=\pm1.
\]

Neither sign resolves continuous charge covariance.

## 3. Exact equivariance obstruction

Let the finite real arrow carry the trivial action:

\[
\rho_{\rm src}(e^{i\phi})a=a.
\]

Let the Furey target arrow have charge \(r\ne0\):

\[
\rho_{\rm tgt}(e^{i\phi})E_{12}
=e^{ir\phi}E_{12}.
\]

The intertwiner equation is

\[
F_\lambda(\rho_{\rm src}(e^{i\phi})a)
=\rho_{\rm tgt}(e^{i\phi})F_\lambda(a).
\]

Substitution yields

\[
\lambda E_{12}=e^{ir\phi}\lambda E_{12}.
\]

For all \(\phi\), and \(r\ne0\), this has only \(\lambda=0\). That map retains the two diagonal faces but collapses the relationship and is not an embedding.

The empty intersection can be displayed as

\[
\boxed{
\operatorname{Emb}^{\rm face}_{\rm TRO}
\cap
\operatorname{Hom}_{U(1)}(\mathbb Ra,\mathbb CE_{12})
=\varnothing.}
\]

This is independent of basis and of the numerical value of the nonzero charge.

## 4. Minimal repair A: complexify the arrow

Replace the neutral real source line by a charged complex line:

\[
\mathbb Ra
\quad\longrightarrow\quad
\mathbb Ca.
\]

Let

\[
z\mapsto e^{ir\phi}z.
\]

Then

\[
F_\lambda(z a)=\lambda z E_{12}
\]

is exactly equivariant, and TRO preservation again gives \(|\lambda|=1\).

The price is precise:

- the arrow grows from one to two real quadratures;
- the self-adjoint completion grows from \(H_2(\mathbb R)\), dimension three, to \(H_2(\mathbb C)\), dimension four;
- an additional antiunitary selector is needed to recover a three-dimensional real Jordan carrier.

The Furey exchange antiunitary supplies such a selector, but its fixed algebra is the population-normal \(J_z\), which removes the independent population difference. Thus complexification returns exactly to the Cycle 486 fork rather than evading it.

## 5. Minimal repair B: rotate the faces

Instead of fixing the Furey population projectors, conjugate the entire Jordan carrier by

\[
V=e^{-i\pi\sigma_x/4}.
\]

This maps the entrywise-real carrier to the charge-compatible carrier and sends

\[
p,q\mapsto\frac{I\mp\sigma_y}{2}.
\]

The relationship plane then carries the continuous action internally. This preserves a three-dimensional \(H_2(\mathbb R)\) carrier, but the finite faces become coherent faces rather than population faces.

The two repairs therefore exchange what is held fixed:

| Repair | Population faces | Continuous charge | Real Jordan dimension |
|---|---:|---:|---:|
| Neutral real arrow | yes | no | 3 |
| Complex charged arrow | yes | yes | 4 before selector |
| Coherent-face rotation | no, reinterpreted | yes | 3 |

## 6. Dependency graph

\[
\begin{array}{c}
\text{finite three-corner quotient}\\
\downarrow\\
\text{normalized face axioms}\\
\downarrow\\
T_2(\mathbb R)\text{ with one real arrow}\\
\downarrow\\
\text{face-fixed Peirce corner }\mathbb CE_{12}\\
\downarrow\\
\text{TRO phases }\lambda\in U(1)\\
\downarrow\\
\text{continuous-charge equivariance obstruction}
\end{array}
\]

The obstruction branches into:

\[
\begin{array}{ccccc}
&&\text{obstruction}&&\\
&\swarrow&&\searrow&\\
\text{complexify arrow}&&&&\text{rotate faces}\\
\downarrow&&&&\downarrow\\
H_2(\mathbb C)\text{ then select}&&&&J_z\cong H_2(\mathbb R).
\end{array}
\]

The external neutral-response route remains a third branch: retain the real arrow and faces, but do not identify it with the charged Furey matter arrow.

## 7. Claim ledger

### Established

- every population-face-fixed arrow image lies in \(\mathbb CE_{12}\);
- every nonzero face-fixed algebra embedding is parameterized by \(\lambda\in\mathbb C^*\);
- TRO preservation reduces this to \(|\lambda|=1\);
- entrywise-real compatibility reduces it further to \(\lambda=\pm1\);
- no nonzero member is equivariant from a neutral real source line to a nonzero-charge target line;
- complexifying the source arrow supplies all charged equivariant TRO embeddings;
- complexification enlarges the immediate self-adjoint carrier from real dimension three to four.

### Candidate bridges

- the finite arrow secretly represents two phase quadratures and should be complexified;
- the finite face classes represent coherent rather than population projectors;
- the finite carrier is an external neutral response algebra locked to, but not identical with, the charged Furey factor.

### Not established

- a source-derived second arrow quadrature;
- a dynamical quarter-turn selecting coherent faces;
- a gauge-neutral external/internal locking action with a fixed coefficient;
- a physical stress observable choosing between the three branches.

## 8. Stop-everything and falsification criteria

### Stop-everything positive

1. The opposite discriminant-glue face supplies the missing quadrature and transforms with the required Abelian weight.
2. A Furey/Yukawa stress Gram map produces a neutral \(E_{12}+E_{21}\) response while preserving the two finite population faces.
3. A source-derived quarter-turn sends the finite faces to the coherent projectors selected by Furey exchange.

### Falsifiers

- a nonzero neutral one-dimensional real representation is claimed to intertwine a continuous nonzero-charge complex line;
- a general face-fixed algebra embedding is presented with an arrow outside \(pM_2(\mathbb C)q\);
- arbitrary \(|\lambda|\ne1\) is called TRO preserving;
- complexifying the arrow is claimed to leave the immediate Hermitian carrier three dimensional without an additional selector.

## 9. Next branch

The most informative continuation is to test the existing opposite discriminant-glue face against the missing relationship quadrature. If it supplies an independent class with the correct rotation pairing, repair A becomes source-derived. If it supplies a dual population face instead, the coherent-face or external-response branches remain the only viable routes.

Cycle 488 sharpens this: the second quadrature may reduce to the **same** binary arrow rather than an independent bit. The Gaussian lift \(\mathbb Z[i]\to\mathbb F_2\) sends \(i\mapsto1\), while its first ramified thickening recovers the difference as \(\varepsilon E_{12}\). See [the real/Gaussian lift fork](572_the_real_and_gaussian_tro_lifts_have_the_same_binary_arrow_and_split_at_the_ramified_first_order.md).

## Certificate and companions

- [Face-fixed intertwiner classification](../../../verification/verify/verify_population_face_intertwiner_charge_obstruction.mjs)
- [Binary/Furey real-form fork](570_the_binary_peirce_faces_and_furey_charge_compatible_carrier_are_isomorphic_but_not_face_preserving.md)
- [Contraction-selected split lift](569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md)
- [TRO real-portal theorem](../0200-0299/222_tro_real_portal_intertwiner_theorem_and_gauge_obstruction.md)
- [Furey population-normal selector](../0300-0399/303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
