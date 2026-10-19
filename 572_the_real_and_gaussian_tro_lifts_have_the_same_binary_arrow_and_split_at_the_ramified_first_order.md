# The Real and Gaussian TRO Lifts Have the Same Binary Arrow and Split at the Ramified First Order

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact arithmetic lift theorem and new executable target; identification of the ramified direction with a named cocycle class remains open

## Executive result

The one-arrow binary triangular algebra does **not** force a one-quadrature real lift. It admits at least two natural characteristic-zero based lifts:

\[
T_2(\mathbb Z)
\quad\text{and}\quad
T_2(\mathbb Z[i]).
\]

They have the same binary residue because

\[
\boxed{\mathbb Z[i]/(1+i)\cong\mathbb F_2,\qquad i\equiv1.}
\]

Consequently

\[
E_{12}\equiv iE_{12}\pmod{1+i}.
\]

The two real Hermitian relationship quadratures

\[
X=E_{12}+E_{21},
\qquad
Y=i(E_{12}-E_{21})
\]

also have the same binary residue. The exact finite one-arrow result is therefore compatible with either:

1. a real one-quadrature lift leading directly to \(H_2(\mathbb R)\); or
2. a Gaussian charged-arrow lift leading to \(H_2(\mathbb C)\), followed by the established Furey exchange selector.

The first level that separates the two is the ramified thickening

\[
\boxed{
\mathbb Z[i]/(2)
\cong
\mathbb F_2[\varepsilon]/(\varepsilon^2),
\qquad
\varepsilon=i+1.}
\]

There

\[
i=1+\varepsilon,
\qquad
\varepsilon^2=0,
\]

so the missing quadrature is the first-order nilpotent direction

\[
\varepsilon E_{12}.
\]

This turns “find the missing complex structure” into a concrete arithmetic computation: test whether the existing two-adic cocycle lift admits a compatible Gaussian ramified thickening and identify which class, if any, supplies \(\varepsilon E_{12}\).

## 1. The Gaussian residue map

Define

\[
\rho:\mathbb Z[i]\longrightarrow\mathbb F_2,
\qquad
\rho(a+bi)=a+b\pmod2.
\]

Because \(i\mapsto1\),

\[
\rho(zw)=\rho(z)\rho(w),
\qquad
\rho(z+w)=\rho(z)+\rho(w).
\]

Its kernel is the prime ideal \((1+i)\), giving

\[
\mathbb Z[i]/(1+i)\cong\mathbb F_2.
\]

All fourth roots of unity have the same nonzero image:

\[
\rho(1)=\rho(i)=\rho(-1)=\rho(-i)=1.
\]

Thus the binary residue forgets:

- the distinction between real and imaginary arrow directions;
- the sign of the arrow;
- the orientation of the fourth-root phase;
- complex conjugation, since \(\rho(\bar z)=\rho(z)\).

This is exactly the information needed to distinguish a real relationship line from a charged complex relationship plane.

## 2. Two based triangular lifts

The real split lift is

\[
\mathcal T_{\mathbb Z}
=\left\{
\begin{pmatrix}a&b\\0&d\end{pmatrix}
:a,b,d\in\mathbb Z
\right\}.
\]

Reduction modulo two gives

\[
\mathcal T_{\mathbb Z}\otimes\mathbb F_2
\cong T_2(\mathbb F_2).
\]

The Gaussian split lift is

\[
\mathcal T_{\mathbb Z[i]}
=\left\{
\begin{pmatrix}a&z\\0&d\end{pmatrix}
:a,z,d\in\mathbb Z[i]
\right\}.
\]

Base change through \(\rho\) gives the same binary algebra:

\[
\mathcal T_{\mathbb Z[i]}\otimes_{\rho}\mathbb F_2
\cong T_2(\mathbb F_2).
\]

In particular,

\[
\rho(E_{12})=\rho(iE_{12})=E_{12}.
\]

The finite multiplication table therefore cannot choose between these lifts.

## 3. TRO completions

For the real lift, transpose-TRO closure supplies

\[
M_2(\mathbb Z),
\]

whose real symmetric fixed part is \(H_2(\mathbb R)\).

For the Gaussian lift, dagger-TRO closure supplies

\[
M_2(\mathbb Z[i]),
\]

and extension to the real completion gives \(M_2(\mathbb C)\), with Hermitian part \(H_2(\mathbb C)\).

This second associative envelope is exactly the type of the unique \(M_2(\mathbb C)\) Furey linking factor. It also supports the charged arrow required by the intertwiner classification:

\[
zE_{12}\mapsto e^{ir\phi}zE_{12}.
\]

Applying Furey exchange conjugation then selects the population-normal

\[
J_z\cong H_2(\mathbb R)
\]

inside the four-dimensional Hermitian carrier.

Hence the Gaussian route gives a mathematically coherent chain:

\[
T_2(\mathbb F_2)
\longleftarrow
T_2(\mathbb Z[i])
\longrightarrow
M_2(\mathbb C)
\xrightarrow{\text{Furey exchange fixed points}}
H_2(\mathbb R)
\longrightarrow
Spin_0(2,3).
\]

What remains missing is a source selection of \(\mathbb Z[i]\) over \(\mathbb Z\).

## 4. Why the first binary residue hides two quadratures

The Hermitian relationship plane in \(H_2(\mathbb C)\) is

\[
\operatorname{span}_{\mathbb R}
\left\{
E_{12}+E_{21},
i(E_{12}-E_{21})
\right\}.
\]

Under the Gaussian residue:

\[
i\equiv1,
\qquad
-1\equiv1.
\]

Therefore

\[
i(E_{12}-E_{21})
\equiv
E_{12}+E_{21}.
\]

The two real quadratures coalesce into one binary class. This explains how a one-bit finite arrow can be the residue of a two-real-dimensional charged relationship without requiring a second independent arrow at the bottom level.

## 5. The ramified first-order thickening

The rational prime two ramifies in the Gaussian integers:

\[
(2)=(-i)(1+i)^2.
\]

Set

\[
\varepsilon=i+1.
\]

Modulo two,

\[
\varepsilon^2=(i+1)^2=i^2+2i+1=0.
\]

Thus

\[
\mathbb Z[i]/(2)
\cong
\mathbb F_2[\varepsilon]/(\varepsilon^2).
\]

The projection to the observed residue kills the nilpotent ideal:

\[
0\longrightarrow(\varepsilon)
\longrightarrow
\mathbb F_2[\varepsilon]/(\varepsilon^2)
\longrightarrow
\mathbb F_2
\longrightarrow0.
\]

At this rung,

\[
iE_{12}-E_{12}=\varepsilon E_{12}
\]

is visible. The missing relationship quadrature is therefore naturally a first-order ramified deformation of the certified arrow.

## 6. Relation to the opposite glue face

The opposite Hadamard glue face supplies a dual binary Lagrangian and the exact Heisenberg commutator. It independently supports the need for a reverse/dual relationship. But the glue parity quotient alone does not supply scalar multiplication by \(i\):

- its sign pairing supplies \((-1)^{x\cdot z}\);
- the fourth-root \(\mu_4\) refinement remains an independent orientation line;
- the quartic generator is killed by the known glue-parity quotient;
- no canonical map currently couples that quartic line to the arrow.

The division of labour is now clear:

\[
\begin{array}{c|c}
\text{structure} & \text{candidate source}\\
\hline
E_{21}\text{ reverse arrow} & \text{TRO closure / opposite glue face}\\
i\text{ scalar orientation} & \text{quartic }\mu_4\text{ line}\\
\varepsilon E_{12}\text{ first-order split} & \text{Gaussian ramified lift}\\
\text{continuous phase rotation} & \text{real completion to }U(1)
\end{array}
\]

No existing theorem identifies all four rows canonically.

## 7. Consequence for the \(4+1+2\) cocycle flag

The live cocycle calculation already contains:

- one non-gauge moving line;
- two stationary directions;
- one accessible stationary evaluation and one inaccessible direction.

The ramified nilpotent \(\varepsilon E_{12}\) is now a concrete possible target for one of those unresolved classes. But equality of dimensions is not evidence. A valid identification must construct a ring/module lift of the cocycle equations over

\[
\mathbb F_2[\varepsilon]/(\varepsilon^2)
\]

and show that reduction kills exactly the proposed quadrature.

Until that calculation is performed, the correspondence is a candidate bridge only.

## 8. Claim ledger

### Established

- \(\mathbb Z[i]/(1+i)\cong\mathbb F_2\);
- \(1,i,-1,-i\) have the same nonzero binary residue;
- conjugation is invisible in that residue;
- \(T_2(\mathbb Z)\) and \(T_2(\mathbb Z[i])\) both reduce to the certified \(T_2(\mathbb F_2)\);
- the two Hermitian relationship quadratures have the same binary residue;
- \(\mathbb Z[i]/(2)\cong\mathbb F_2[\varepsilon]/(\varepsilon^2)\);
- \(i=1+\varepsilon\) and \(\varepsilon^2=0\) at that rung;
- the missing quadrature is represented by the nilpotent difference \(\varepsilon E_{12}\).

### Candidate bridge

- the quartic orientation line selects the Gaussian rather than real lift;
- the inaccessible cocycle direction is the ramified nilpotent arrow direction;
- the opposite glue face supplies the dagger reverse while the quartic line supplies \(i\);
- the Gaussian completion is the arithmetic precursor of Furey’s unique charged \(M_2(\mathbb C)\) factor.

### Not established

- a Gaussian lift of the source orthogonal cocycle;
- a canonical action of the quartic character on the residual arrow;
- an identification of \(\varepsilon E_{12}\) with \(e_0\), \(e_4\), or the moving line;
- compatibility of the Gaussian lift with all integral lattice and anomaly data;
- a physical observable selecting the complex lift.

## 9. Stop-everything and falsification gates

### Stop-everything positive

1. Lift the source cocycle to \(\mathbb F_2[\varepsilon]/(\varepsilon^2)\) and obtain a unique nonzero nilpotent arrow class reducing to the certified finite arrow.
2. Derive a canonical homomorphism from the existing quartic orientation line to \(\{\pm1,\pm i\}\) acting on that lift.
3. Show the resulting Gaussian TRO is the same \(M_2(\mathbb C)\) factor selected by Furey incidence, with compatible faces and conjugation.

### Falsifiers

- every source-compatible first-order lift is split-real and has zero \(\varepsilon\) component;
- the quartic orientation necessarily acts on an unrelated central line and cannot act on the arrow;
- Gaussian lifting destroys the certified Peirce relations, anomaly structure or faithful Standard-Model quotient;
- the resulting dagger real form conflicts with the established Furey exchange action.

## 10. Next executable problem

Replace the next binary correction coefficient ring in the five-bit cocycle calculation by

\[
D=\mathbb F_2[\varepsilon]/(\varepsilon^2)
\]

and solve the presentation cocycle equations with the certified residual arrow fixed modulo \(\varepsilon\). Compute:

1. existence and dimension of \(D\)-lifts;
2. the nilpotent kernel;
3. whether source conjugation acts nontrivially on it;
4. whether the quartic character provides a compatible order-four automorphism;
5. whether the lift descends to the Furey charged Peirce corner.

Cycle 489 performs the first version of this test and closes the naive scalar-extension route: it duplicates all 17 cocycle directions and all four cohomology classes. A useful Gaussian lift must deform the source action itself. See [the dual-number scalar-extension no-go](573_naive_dual_number_extension_doubles_the_entire_cocycle_flag_and_cannot_select_the_gaussian_quadrature.md).

## Certificate and companions

- [Real/Gaussian common-residue certificate](scripts/verify_real_and_gaussian_lifts_share_binary_arrow_shadow.mjs)
- [Face-fixed intertwiner obstruction](571_face_fixed_tro_intertwiners_form_a_phase_circle_but_continuous_charge_kills_the_neutral_arrow.md)
- [Contraction-selected split lift](569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md)
- [Glue-derived Heisenberg pairing](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
- [Glue parity versus quartic line](547_the_glue_parity_plane_is_the_exchange_coinvariant_not_the_two_puncture_plane.md)
- [Quartic Clifford phase](539_the_quartic_extension_embeds_in_the_binary_heisenberg_group_and_its_phase_is_a_clifford_shear.md)
