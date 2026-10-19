# Lane Expansion 11: Strict Passivity Allows a Möbius Defect Eigenline but Not a Mixed Determinant Winding

**Date:** 17 October 2026  
**Lane:** L8, defect and topological response  
**Claim status:** exact (2\times2) passive-response classification example and obstruction; physical Standard-Model defect still absent  
**Certificate:** [verify_programme_passive_defect_mobius_response.mjs](scripts/verify_programme_passive_defect_mobius_response.mjs)

## Result in ordinary language

Imagine carrying an unoriented ruler around a loop. When it returns, the ruler occupies the same line, but an arrow painted on it may point backwards. That is the simplest Möbius effect: the **line** is periodic while a continuously chosen **direction along the line** changes sign.

The same thing can happen to the principal eigenline of a strictly positive two-port response. It does not require a zero determinant, a pole crossing or a loss of passivity. But it is an eigenvector-bundle invariant, not a determinant winding, and adding passive frequency dependence does not automatically turn it into a new two-dimensional invariant.

## 1. A positive defect loop

Let

\[
R(\theta)=aI+b\left(\cos\theta\,\sigma_z+\sin\theta\,\sigma_x\right),
\qquad a>|b|>0.
\]

Every (R(\theta)) is real symmetric and strictly positive, with constant eigenvalues

\[
a+b,\qquad a-b.
\]

Its determinant is

\[
\det R(\theta)=a^2-b^2>0,
\]

so its determinant winding is exactly zero.

The principal eigenvector can be chosen locally as

\[
v(\theta)=
\begin{pmatrix}
\cos(\theta/2)\\
\sin(\theta/2)
\end{pmatrix}.
\]

After one circuit,

\[
v(2\pi)=-v(0),
\]

while its projector (P=vv^T) returns exactly to itself. The principal eigenline is therefore the nontrivial real line bundle over the defect circle. Its first Stiefel-Whitney parity is one.

The phrase **Stiefel-Whitney parity** means only this sign test: can a continuously carried real arrow return with its original direction? Here it cannot, although the underlying unoriented line is well-defined everywhere.

## 2. Passive frequency extension

Choose two positive spectral residues, one carrying the defect loop and one isotropic:

\[
F(z,\theta)=\frac{R(\theta)}{m-z}+\frac{cI}{M-z},
\qquad \operatorname{Im}z>0,
\quad c>0.
\]

This is a strict matrix Herglotz response: its imaginary part is positive definite in the upper half-plane. The isotropic term commutes with (R(\theta)), so the eigenprojector remains exactly (P(\theta)) at every frequency. The two eigenvalues vary with (z) but not with (\theta). Consequently:

- the Möbius eigenline persists;
- the determinant is nonzero;
- its winding around the defect is zero;
- frequency has not created a new mixed invariant.

This cleanly separates **response topology** from **determinant topology**.

## 3. Why there is no real two-dimensional Chern number here

The gapped principal eigenspace is a real line. Over a frequency-defect torus, a real line bundle can carry a sign parity around either fundamental loop. Those are two one-cycle data.

A rank-one real bundle has no nonzero second exterior power, so it cannot carry a rank-two curvature class analogous to an ordinary complex Chern number. Put less technically: one unoriented ruler can twist around either loop, but it cannot span an oriented area by itself.

A genuinely two-dimensional mixed invariant therefore requires at least one of:

1. a complex eigenline in (H_2(\mathbb C)), providing a phase and Berry curvature;
2. a higher-rank real occupied bundle;
3. a singularity, pole, zero or eigenvalue degeneracy inside the domain;
4. an additional symmetry class with its own two-dimensional invariant.

This is why merely multiplying the existing defect family by a causal frequency response cannot close the requested mixed topology.

## 4. Relation to the selector winding

The established selector family has an odd determinant winding before it is forced into the strictly positive real response cone. The present construction shows what can survive that forcing:

\[
\text{complex determinant winding}
\longrightarrow
\text{real eigenline sign holonomy}.
\]

This reduction is plausible only after a gapped, nondegenerate response eigenline has been specified. It is not an equality of the earlier Toeplitz index with the present (\mathbb Z_2) line invariant.

The survivor is also generic: any real reciprocal two-port can realize the same Möbius loop. Nothing in the construction yet identifies it with Furey matter or the Standard Model.

## 5. Landscape and closure ledgers

### Landscape value

- exhibits nontrivial defect topology inside the strictly positive (H_2(\mathbb R)) cone once an eigenvalue gap is retained;
- proves that determinant winding is the wrong invariant for that positive family;
- classifies the surviving topology as a real eigenline parity;
- shows why passive frequency extension need not create a genuinely mixed invariant.

### Closure value

Conditional and presently generic. Closure requires a physical defect whose transport of the measured response eigenline realizes this parity and whose reversal correlates with the programme's independent orientation witness.

## 6. Concrete experiment

Construct a two-port device with a cyclic defect control (\theta) and measure its real symmetric response matrix throughout one cycle. Require a nonzero eigenvalue gap at every setting. Interferometrically transport a signed eigenmode, or compare it against an external phase reference, to detect the sign holonomy.

Run the same loop at several frequencies. The null model predicts:

- the response remains positive;
- the eigenline parity is constant while the gap stays open;
- no determinant winding appears;
- any change of parity requires an eigenvalue degeneracy or loss of the declared real structure.

**Go signal:** a field-generated Standard-Model defect produces the odd eigenline holonomy and ties its reversal to the topology-first orientation.

**No-go signal:** the effect is reproducible by an arbitrary reciprocal two-port with no derived defect coordinate, or the parity disappears once the complete physical parameter domain is used.

## Reproducibility

```powershell
node scripts\verify_programme_passive_defect_mobius_response.mjs
```
