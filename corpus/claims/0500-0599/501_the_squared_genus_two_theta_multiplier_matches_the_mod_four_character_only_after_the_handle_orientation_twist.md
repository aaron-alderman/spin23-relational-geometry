# The Squared Genus-Two Theta Multiplier Matches the Mod-Four Character Only After the Handle-Orientation Twist

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact upper-shear formula plus two-point numerical theta evaluation; the lower-shear and trace-three companion phases are promoted to an exact generator theorem in document 502

## 1. Correction and result

The finite quotient character

\[
\chi:P_4\to\mathbb Z_2
\]

occupies the correct structural position for a theta lift, but it is **not** the kernel character of the raw genus-two theta multiplier.

For example, the positive mutual shear belongs to \(\ker\chi\), yet its normalized theta multiplier is numerically

\[
\varepsilon(S_{K_+})=-i,
\]

not \(+1\).

What the calculation supports is the sharper relation

\[
\boxed{
\varepsilon(M)^2
=(-1)^{\chi(M)+\eta(\bar M)},}
\]

where

- \(\bar M\in H_{\mathrm{match}}\) is the binary reduction;
- \(\eta:H_{\mathrm{match}}\to\mathbb Z_2\) is the common local permutation parity, so
  \[
  \eta(g_1,g_2)=\operatorname{sgn}(g_1)=\operatorname{sgn}(g_2).
  \]

On the principal mod-two kernel, \(\eta=0\), and therefore

\[
\boxed{
\varepsilon(I+2X)^2=(-1)^{\ell(X)}.}
\]

This is exactly the desired infinitesimal relation. Away from the kernel, the handle-orientation twist is essential.

## 2. Theta characteristic and normalization

Use the even characteristic

\[
m_*=\begin{bmatrix}1&1\\1&1\end{bmatrix},
\]

corresponding to

\[
q_*(x,y)=x\cdot y+x_1+x_2+y_1+y_2.
\]

The theta constant is

\[
\theta_{m_*}(\tau)
=\sum_{n\in\mathbb Z^2}
\exp\!\left[
\pi i(n+a/2)^T\tau(n+a/2)
+\pi i(n+a/2)^Tb
\right],
\]

with \(a=b=(1,1)\).

Because \(q_*\) is odd on each separate handle, this theta constant vanishes on the decomposable diagonal locus. The numerical test therefore uses generic off-diagonal points of the genus-two Siegel upper half-space.

For

\[
M=\begin{pmatrix}A&B\\C&D\end{pmatrix}
\]

stabilizing the characteristic, define the normalized ratio

\[
\varepsilon_M(\tau)
=\frac{
\theta_{m_*}\bigl((A\tau+B)(C\tau+D)^{-1}\bigr)
}{
\det(C\tau+D)^{1/2}\theta_{m_*}(\tau)
},
\]

using the principal square-root branch at each test point. Squaring removes the sign ambiguity of that square root.

## 3. Generator phases

At two independent generic Siegel points, the truncated theta sums converge to the following roots of unity.

| element | \(\chi\) | \(\eta\) | \(\varepsilon\) | \(\varepsilon^2\) |
|---|---:|---:|---:|---:|
| identity | 0 | 0 | \(1\) | \(+1\) |
| trace-three companion, handle 1 | 0 | 0 | \(1\) | \(+1\) |
| trace-three companion, handle 2 | 0 | 0 | \(1\) | \(+1\) |
| positive mutual shear \(K_+\) | 0 | 1 | \(-i\) | \(-1\) |
| forbidden matched lift \(\operatorname{diag}(3,1)\) | 1 | 1 | \(-1\) | \(+1\) |

Every row obeys

\[
\varepsilon^2=(-1)^{\chi+\eta}.
\]

This table disproves the simpler proposal \(\varepsilon^2=(-1)^\chi\) on the full matched preimage.

## 4. Principal-kernel phases

The following exact integral upper and lower shears were evaluated:

| kernel direction | \(\ell\) | lower multiplier | upper multiplier | squared phase |
|---|---:|---:|---:|---:|
| diagonal \(2E_{11}\) | 1 | \(-i\) | \(+i\) | \(-1\) |
| diagonal \(2E_{22}\) | 1 | \(-i\) | \(+i\) | \(-1\) |
| off-diagonal \(2(E_{12}+E_{21})\) | 0 | \(-1\) | \(-1\) | \(+1\) |
| diagonal \(2I_2\) | 0 | \(-1\) | \(-1\) | \(+1\) |

Thus the multiplier orientation depends on whether the shear is upper or lower, but its square depends only on \(\ell\).

This is why the squared multiplier, rather than a chosen fourth-root phase, is the correct finite comparison.

## 5. Exact upper-shear derivation

For an upper shear

\[
T_B=\begin{pmatrix}I&B\\0&I\end{pmatrix},
\qquad
B=B^T,
\qquad
B\equiv kI_2\pmod2,
\]

the transformation is simply \(\tau\mapsto\tau+B\). Substituting into each theta-series term shows that the ratio is independent of the lattice summation variable. Squaring gives

\[
\varepsilon(T_B)^2
=(-1)^{\operatorname{tr}B/2}.
\]

But the finite character obeys

\[
\chi(T_B)=\frac{\operatorname{tr}B}{2}+k\pmod2,
\]

while the common binary handle parity is \(\eta=k\). Therefore

\[
\varepsilon(T_B)^2
=(-1)^{\chi(T_B)+\eta(T_B)}
\]

exactly on the complete upper-shear sector.

The executable probe verifies the same identity for all sixteen admissible upper shears and all sixteen corresponding lower shears at two generic Siegel points.

## 6. Why the orientation twist is natural

The theta characteristic \(q_*\) is the orthogonal sum of two odd handle refinements. The matched binary group preserves the product orientation line of their three-point nonzero sets. Its common parity character \(\eta\) is therefore already part of the sewn theta data.

The relation

\[
\chi=\operatorname{phase}_2+\eta
\]

in additive \(\mathbb Z_2\) notation says that the mod-four lift character is obtained only after separating:

1. the squared analytic theta phase;
2. the binary orientation of the two local odd-spin sets.

This matches the arithmetic filtration found independently. It also explains why treating all binary effects as one “fermion parity” was too coarse.

## 7. Consequence for the Standard-Model code bridge

The Prakash–Ramya qubit code supplies a transversal phase whose exactness depends on integral overlap divisibilities. A two-logical sewing should therefore be compared with both terms on the right-hand side:

\[
\varepsilon^2=(-1)^{\chi+\eta}.
\]

The code must determine:

- the analytic/Clifford squared phase corresponding to \(\varepsilon^2\);
- the common local orientation parity \(\eta\);
- their combination \(\chi\), which selects the observed mod-four carrier.

Matching only the Clifford phase while ignoring \(\eta\) can give the wrong mod-four lift even when the binary symplectic action is correct.

## 8. Consequence for the Furey branch

The Furey seam pairing selects the two handles but not their product orientation. The new formula shows exactly how that missing choice enters the analytic lift: it is the twist converting the squared theta multiplier into \(\chi\).

A physical Pfaffian-line construction must therefore reproduce not merely \((-1)^\chi\), but a factorization into:

\[
\text{squared theta/Pfaffian phase}
\times
\text{odd-handle orientation sign}.
\]

This offers a more discriminating test of any claimed determinant-line completion.

## 9. Evidence boundary

The following are exact:

- the finite characters \(\chi\) and \(\eta\);
- the identity on the complete upper-shear sector;
- the theta-series definition and characteristic;
- the mod-four group and kernel calculations.

The following were first established as high-precision numerical evidence here:

- the raw lower-shear phases;
- the phases of the two trace-three companions;
- the phase of the positive mutual shear;
- persistence of the relation at two independent generic Siegel points.

Document 502 subsequently supplies the exact squared lower-shear formula by Fourier conjugation, the exact trace-three phase cancellation by partial Poisson summation, and the generating theorem for an integral subgroup surjecting onto the complete matched mod-four preimage. Raw eighth-root lift independence remains open.

## 10. Stop-everything and falsification gates

### Stop-everything outcomes

1. An analytic metaplectic calculation proves \(\varepsilon^2=(-1)^{\chi+\eta}\) on the full integral preimage.
2. The sewn Standard-Model code reproduces \(\varepsilon^2\), \(\eta\) and hence \(\chi\) independently.
3. A Furey Pfaffian line produces the same factorization and fixes the missing product orientation.
4. The relation extends canonically from the mod-four quotient through the full two-adic closure.

### Falsifiers

- If any exact integral generator violates the squared relation after consistent metaplectic normalization, the proposed identification fails.
- The raw multiplier \(\varepsilon\) must not be identified with \((-1)^\chi\); the mutual shear is a direct counterexample.
- Agreement at a single Siegel point is insufficient; the present probe uses two, while an analytic proof remains preferable.
- Numerical recognition of roots of unity is evidence, not an exact proof of the lower-shear or companion phases.

## 11. Current judgement

The finite character has now met the analytic theta branch, but with a necessary orientation correction:

\[
\boxed{
\varepsilon^2=(-1)^{\chi+\eta}.}
\]

This is stronger and more informative than calling \(\chi\) a theta-multiplier candidate without qualification. It identifies the exact extra datum supplied by the two odd handle structures and gives the code and Pfaffian branches a three-part test rather than a group-order comparison.

## Certificate, source and companion documents

- [Numerical genus-two theta-multiplier probe](../../../verification/probe/probe_genus_two_theta_multiplier_numerically.mjs)
- [Finite mod-four quotient character](500_the_equal_discriminant_five_mod_four_group_is_the_kernel_of_a_finite_theta_multiplier_candidate.md)
- [Odd-spin product orientation character](../0400-0499/498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
- [Furey orientation-selector obstruction](../0400-0499/499_furey_seam_pairing_does_not_orient_the_odd_spin_product_line_and_matched_parity_requires_trace_even_framing.md)
- [Weil representation and theta transformation overview](https://webdoc.sub.gwdg.de/ebook/serien/e/hbm/hbm307.pdf)
- [Exact integral generator theorem](502_the_theta_square_identity_is_exact_on_an_integral_subgroup_surjecting_onto_the_full_matched_mod_four_preimage.md)
