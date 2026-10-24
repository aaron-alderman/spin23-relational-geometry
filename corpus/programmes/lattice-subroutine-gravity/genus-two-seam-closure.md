# The genus-two seam closes only as marked or enlarged modular data

**Date:** 24 October 2026  
**Status:** exact finite modular-orbit obstruction and exact separating-order distinction; full multiplier system remains open  
**Evidence:** [machine-readable result](../../../evidence/data/lattice-subroutine-genus-two-seam-closure-v1.json)  
**Certificate:** [seam-closure verifier](../../../verification/verify/verify_lattice_subroutine_genus_two_seam_closure.mjs)

## Result

The corpus's affine seam connects the unmarked refinement

\[
q_0(a,b,c,d)=ab+cd
\]

to

\[
q_*(a,b,c,d)=q_0(a,b,c,d)+a+b+c+d.
\]

In theta-characteristic coordinates these are \(0000\) and \(1111\), both even. The seam bit therefore gives a legitimate two-sheet finite carrier. It does **not** give a two-component object closed under the full genus-two modular group.

The exact \(Sp(4,\mathbb F_2)\) census gives:

| Quantity | Result |
|---|---:|
| finite modular quotient order | 720 |
| even theta characteristics | 10 |
| orbit of the unordered seam pair | 45 pairs |
| characteristics reached by that orbit | all 10 even characteristics |
| setwise stabilizer of the pair | 16 |
| pointwise stabilizer | 8 |
| pair-swapping elements | 8 |
| involutive pair swaps | 6 |

Thus a two-sheet seam has two honest readings:

1. **marked/defect reading:** restrict modular transformations to the inverse image in \(Sp(4,\mathbb Z)\) of the order-16 pair stabilizer;
2. **full modular reading:** enlarge the carrier to at least all ten even characteristics and include the relevant theta multipliers and phases.

A scalar partition function containing only the two seam sheets cannot be fully \(Sp(4,\mathbb Z)\)-covariant.

## Why the two sheets are physically different

At the separating divisor,

\[
\Omega=
\begin{pmatrix}
\tau_1&\epsilon\\
\epsilon&\tau_2
\end{pmatrix},
\qquad \epsilon\rightarrow0,
\]

the characteristic \(0000\) restricts to even spin structure on both elliptic handles. Its theta constant has a generically nonzero factorized term and vanishing order zero.

The characteristic \(1111\) restricts to odd structure on both handles. Each elliptic odd theta constant vanishes at zero, and the genus-two theta constant begins at first order:

\[
\theta[1111](0|\Omega)
=
\epsilon\,
\frac{\theta_1'(0|\tau_1)\theta_1'(0|\tau_2)}{2\pi i}
+O(\epsilon^3).
\]

The existing odd--odd certificate identifies this linear coefficient with the orientation-sensitive Pfaffian of the two coupled zero modes. The new calculation shows what the affine toggle actually does: it moves between a nonvanishing even--even block and a normal-line odd--odd block. It changes zero-mode and factorization content. It is not simply a minus sign attached to an otherwise unchanged state.

## Implication for the “lattice subroutine”

This result improves the physical picture. The seam bit is not an arbitrary decorative binary variable; it can mark whether a channel has a separating zero mode and therefore whether its contribution lives on the divisor or its normal line. That is the kind of residue a detector or boundary condition could distinguish.

It also strengthens the obstruction. A physical theory must decide whether the seam is:

- an explicitly marked defect that reduces the modular symmetry;
- one transition inside a ten-sector spin-structure completion;
- or an object in a larger vector-valued/defect representation.

Calling it a universal binary subroutine without that choice is not modularly complete.

## What remains

## Scalar completion exists, but it is not the Leech theta series

There is a canonical full-orbit scalar construction. Up to normalization,

\[
\chi_5(\Omega)=\prod_{\delta\ {\rm even}}\theta[\delta](0|\Omega),
\qquad
\chi_{10}(\Omega)=\chi_5(\Omega)^2.
\]

The product \(\chi_5\) has weight five with a character; its square is the full scalar Igusa cusp form of weight ten. At the chosen separating divisor, nine even genus-two characteristics are even--even and one—\(1111\)—is odd--odd. Consequently \(\chi_5\) vanishes to order one and \(\chi_{10}\) to order two.

This supplies full scalar modular closure, but not the desired identification. The degree-two Leech theta series has weight twelve and factorizes on the separating divisor:

\[
\Theta_{\Lambda}^{(2)}
\begin{pmatrix}\tau_1&0\\0&\tau_2\end{pmatrix}
=\Theta_\Lambda(\tau_1)\Theta_\Lambda(\tau_2),
\]

which is generically nonzero. Therefore \(\chi_{10}\) cannot divide it. The weight difference is two, and the full genus-two scalar modular-form ring has no holomorphic weight-two generator that could repair the mismatch.

The [Igusa completion certificate](../../../verification/verify/verify_lattice_subroutine_igusa_seam_completion.mjs) therefore separates two objects that had remained visually adjacent:

- the bosonic Leech pair theta series counts lattice pairs and remains nonzero at separation;
- the spin-structure product \(\chi_{10}\) records the separating divisor but symmetrizes away the oriented seam.

Retaining the seam requires marked subgroup data, a vector-valued form, a defect category or additional fermionic/Pfaffian structure. It is not already hidden as a scalar factor of the Leech theta series.

The finite characteristic calculation does not include the eighth-root theta multipliers, modular weights, GSO-like phases or positivity of a full non-chiral partition function. The next exact question is:

> Can the ten even-characteristic sectors be assembled, with the affine seam transition retained, into a factorizing vector-valued modular object whose phases and multiplicities come from the Leech/Monster construction rather than being chosen by hand?

The symmetric scalar answer is now known: \(\chi_{10}\) closes but forgets orientation and does not belong to the Leech theta series as a factor. The remaining question is whether a source-derived **vector-valued or defect** completion retains the transition. A negative answer leaves only a marked subgroup interpretation. A positive answer supplies the first genuinely sewn dynamical input for the worldsheet route, though not yet a four-dimensional theory.

