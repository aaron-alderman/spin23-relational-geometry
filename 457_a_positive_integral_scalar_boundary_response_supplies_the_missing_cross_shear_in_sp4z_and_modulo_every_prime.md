# A Positive Integral Scalar Boundary Response Supplies the Missing Cross Shear in (Sp(4,mathbb Z)) and Modulo Every Prime

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact arithmetic/response bridge for one generator; physical identification of code and boundary ports remains open

## 1. The missing generator from the previous cycle

The finite two-port analysis isolated one symmetric mutual shear as the algebraic relation needed to enlarge two independent logical ports to full \(Sp(4,\mathbb F_3)\):

\[
K_\times=
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

The scalar-interface branch independently produces positive symmetric two-boundary response matrices. The question is whether one response can supply the cross shear while also possessing a fixed integral lift across primes.

It can.

## 2. A fixed positive integral response

Consider

\[
\boxed{
X=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
}

Its eigenvalues are

\[
1,quad3,
\]

so \(X\) is strictly positive. Its determinant is \(3\).

The two diagonal entries are self-responses of the two faces; the off-diagonal entry is their mutual response.

## 3. Exact scalar-interval realization

The massive scalar interval has Dirichlet-to-Neumann matrix

\[
X_{m,L}
=
\frac{m}{\sinh(mL)}
\begin{pmatrix}
\cosh(mL)&-1\\
-1&\cosh(mL)
\end{pmatrix}.
\]

Choose

\[
m=\sqrt3,
\qquad
mL=\operatorname{arcosh}2.
\]

Then

\[
\cosh(mL)=2,
\qquad
\sinh(mL)=\sqrt3,
\qquad
\frac{m}{\sinh(mL)}=1,
\]

and therefore

\[
X_{m,L}=X.
\]

The integral matrix is not an arbitrary arithmetic ansatz. It is the exact positive boundary response of a local free field.

## 4. Integral symplectic shear

Adding the quadratic boundary action

\[
S_{\partial}(q)=\frac12q^TXq
\]

shifts conjugate momenta by

\[
p\longmapsto p+Xq.
\]

The corresponding canonical matrix is

\[
\mathcal S_X=
\begin{pmatrix}
I_2&0\\
X&I_2
\end{pmatrix}.
\]

Because \(X=X^T\),

\[
\mathcal S_X^TJ\mathcal S_X=J.
\]

Because \(X\) is integral,

\[
\boxed{
\mathcal S_X\in Sp(4,\mathbb Z).
}

This is an explicit arithmetic lift of a positive two-port response.

## 5. Reduction modulo every prime

Reducing \(\mathcal S_X\) modulo a prime gives an element of

\[
Sp(4,\mathbb F_p)
\]

for every \(p\). The off-diagonal coefficient is \(-1\), which remains nonzero in every finite field.

Thus one fixed real-positive and integral boundary system supplies a compatible family of mutual finite shears:

\[
\mathcal S_X
\longrightarrow
\mathcal S_{X\bmod p}
\quad\text{for every prime }p.
\]

At \(p=3\), \(\det X\equiv0\), but this does not obstruct the symplectic shear: \(\mathcal S_X\) remains invertible with determinant one.

## 6. Exact recovery of the certified qutrit cross shear

Modulo three,

\[
X\equiv
\begin{pmatrix}2&2\\2&2\end{pmatrix}.
\]

The code's charge-word phase profiles already supply every diagonal logical shear, including

\[
K_{m local}=I_2\equiv-2I_2\pmod3.
\]

Symplectic lower shears add their symmetric matrices, so

\[
\mathcal S_X\mathcal S_{I_2}
=
\mathcal S_{X+I_2}
=
\mathcal S_{2K_\times}
\quad(\bmod 3).
\]

Squaring gives

\[
\left(\mathcal S_{2K_\times}\right)^2
=
\mathcal S_{4K_\times}
=
\boxed{\mathcal S_{K_\times}}
\quad(\bmod3).
\]

Therefore the exact missing finite cross-port generator is produced by:

1. the positive scalar mutual response;
2. an already-certified diagonal charge shear;
3. finite composition.

## 7. The first explicit vertical bridge

The result gives the commutative structural chain

\[
\begin{array}{ccc}
X\in H_2(\mathbb R)^+
&\longrightarrow&
\mathcal S_X\in Sp(4,\mathbb Z)\\[4pt]
&&\downarrow\bmod p\\[-2pt]
\text{positive scalar boundary response}
&\longrightarrow&
\mathcal S_{X\bmod p}\in Sp(4,\mathbb F_p).
\end{array}
\]

At \(p=3\), the bottom operation combines with code-derived diagonal shears to give the precise cross generator that completes the finite \(Sp(4)\).

This is the first explicit arithmetic vertical arrow joining the response/Jordan and anomaly-code branches at the level of an actual symplectic generator.

## 8. What this does not yet establish

The mathematical operation is exact, but its physical use in the synthesis requires more:

- identify the code's two logical ports with the scalar interval's two boundary fields;
- derive the boundary action from the Furey/Standard-Model system rather than append it;
- determine whether the dimensionful normalization admits a natural integral lattice;
- supply local Fourier/polarization transformations;
- extend from one shear generator to a dynamically selected real \(Sp(4)\) action;
- show that positivity and causal response persist in the intended Lorentzian setting.

The construction proves compatibility and supplies the missing algebraic cross relation. It does not prove identity of the two physical systems.

## 9. Relation to “one carrier, two faces, three relationships”

The response matrix contains

\[
X_{11},\quad X_{22},\quad X_{12}=X_{21}.
\]

The code already had the two diagonal self-shears. The scalar interval supplies a nonzero mutual term in a positive, integral response. Together they span the complete three-coordinate symmetric translation sector.

The earlier narrative now has an exact realization on both sides of the vertical bridge:

- finite: \(\operatorname{Sym}_2(\mathbb F_p)\) shears;
- integral: \(\operatorname{Sym}_2(\mathbb Z)\) canonical transformations;
- real: \(H_2(\mathbb R)^+\) passive boundary responses.

## 10. Branch decision

- **Closed:** exact positive scalar interval with integral response \(X\).
- **Closed:** exact integral symplectic shear \(\mathcal S_X\in Sp(4,\mathbb Z)\).
- **Closed:** compatible reduction to \(Sp(4,\mathbb F_p)\) for every prime.
- **Closed:** exact construction of the qutrit cross shear using code-derived diagonal shears.
- **Open:** physical identification of code and scalar boundary ports.
- **Open:** source derivation from Furey/Standard-Model dynamics.
- **Open:** local Fourier generator and full positive real action.
- **Open:** normalization and dimensional interpretation of the integral lattice.

## 11. Stop-everything and falsification gates

**Stop-everything trigger:** the same two-boundary kernel is derived from a Furey/Standard-Model fluctuation operator and its ports coincide with the two code logicals.

**Arithmetic trigger:** source-derived local dualities join \(\mathcal S_X\) to generate a large subgroup of \(Sp(4,\mathbb Z)\) whose reductions match the logical groups.

**Response falsifier:** the proposed boundary kernel lacks a symmetric mutual term or violates positivity/passivity.

**Identification falsifier:** abstract similarity of two ports is used without a map between code logical observables and boundary fields.

**Dimension falsifier:** integrality obtained only after an arbitrary dimensionful rescaling is called canonical.

## 12. Certificate

The [integral positive-response certificate](scripts/verify_integral_positive_scalar_dtn_supplies_cross_port_shear_across_primes.mjs) verifies the scalar parameters, positivity, integral symplectic identity, reductions modulo several primes and exact qutrit cross-shear composition.

## Companion documents

- [One cross shear completes finite \(Sp(4)\)](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Scalar interval Dirichlet-to-Neumann response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Scalar-network sewing invariants](66_scalar_network_subdivision_invariants.md)
- [Charge-word diagonal shears](455_transversal_css_dualities_fail_while_charge_word_phases_give_only_two_independent_logical_shears.md)
- [Exact real Jordan-to-\(Sp(4)\) determination](42_jordan_triple_to_sp4r_determination.md)
