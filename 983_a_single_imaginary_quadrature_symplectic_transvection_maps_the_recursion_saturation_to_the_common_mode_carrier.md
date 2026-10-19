# A Single Imaginary-Quadrature Symplectic Transvection Maps the Recursion Saturation to the Common-Mode Carrier

**Date:** 18 October 2026  
**Branches:** finite symplectic orbit, relational shear, quadrature selection, recursion saturation, and common-mode carrier  
**Claim status:** exact minimal orbit theorem  
**Certificate:** [find_the_minimal_symplectic_transvections_from_the_recursion_plane_to_the_common_mode_plane.mjs](scripts/find_the_minimal_symplectic_transvections_from_the_recursion_plane_to_the_common_mode_plane.mjs)

## Executive result

The recursion-dual saturation

\[
W_E=\{0,7,11,12\}
\]

and physical common-mode saturation

\[
W_P=\{0,3,12,15\}
\]

are related by one elementary symplectic transvection over $\mathbb F_2$. Exhausting all fifteen primitive transvection directions gives exactly two solutions:

\[
\boxed{\tau_{e_3}(W_E)=W_P,\qquad\tau_{e_4}(W_E)=W_P.}
\]

The directions $e_3,e_4$ span the imaginary-quadrature block of the sideband coordinates. Thus a single rank-one imaginary-quadrature shear converts the handle-compatible recursion carrier into the relational common-mode carrier.

## 1. Integral lifts

Use the primitive sideband symplectic form

\[
K=
\begin{pmatrix}
0&0&0&1\\
0&0&1&0\\
0&-1&0&0\\
-1&0&0&0
\end{pmatrix}.
\]

For a primitive vector $v$, the integral transvection is

\[
\tau_v(x)=x+\langle x,v\rangle_Kv,
\qquad
T_v=I+v(Kv)^T.
\]

The two successful matrices are

\[
T_{e_3}=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&1&1&0\\
0&0&0&1
\end{pmatrix},
\qquad
T_{e_4}=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
1&0&0&1
\end{pmatrix}.
\]

They satisfy

\[
T_v^TKT_v=K.
\]

Their logarithms $N_v=T_v-I$ obey $N_v^2=0$. The two transvections commute because $e_3$ and $e_4$ are symplectically orthogonal.

## 2. Minimality and uniqueness

Every nonzero vector of $\mathbb F_2^4$ defines a symplectic transvection, giving fifteen candidates. Exactly two map $W_E$ to $W_P$.

No zero-step identification exists because $W_E\ne W_P$. Hence word length one is minimal, and the complete set of primitive length-one solutions is $\{e_3,e_4\}$.

The two solutions reflect the unresolved choice of imaginary response channel. The lattice geometry selects the quadrature block but does not choose which of its two axes is physically active.

## 3. Carrier selection versus algebra completion

This result and document 979 answer different questions:

- one transvection maps the **carrier lattice** from the recursion plane to the common-mode plane;
- one added Lie generator does **not** complete the full integral Lie order;
- full $\mathfrak{sp}(4,\mathbb Z)$ generation still requires an independently available conjugate coherent handle and one conjugate translation.

Thus

\[
\text{one relational shear}
\Longrightarrow
\text{correct carrier},
\]

while

\[
\text{independent handle + translation}
\Longrightarrow
\text{complete integral dynamics}.
\]

The distinction between state-space selection and operation-algebra generation is now exact.

## 4. Jordan/Furey target

The infinitesimal transvection generator is rank one:

\[
N_v=v(Kv)^T,
\qquad N_v^2=0.
\]

This is the smallest possible nilpotent relational operation. A compelling microscopic completion would derive $N_{e_3}$ or $N_{e_4}$ from a polarized Jordan triple or from one Furey/Higgs bilinear, while the conjugate coherent handle supplies the independent grade reversal required by document 979.

## 5. Stop-everything tests

**Minimal carrier-map trigger — passed:** a single primitive symplectic transvection maps $W_E$ to $W_P$.

**Quadrature trigger — passed:** every successful direction lies in $\operatorname{span}(e_3,e_4)$.

**Microscopic transvection trigger:** a typed Jordan/Furey operation reduces exactly to $N_{e_3}$ or $N_{e_4}$.

**Channel-selection trigger:** the Standard Model distinguishes $e_3$ from $e_4$ through normal/tangent, Higgs, chirality, or boundary orientation data.

**Role-confusion falsifier:** the one-transvection carrier map is claimed to generate the full integral Lie algebra by itself.

## Verdict

| Question | Verdict |
|---|---|
| Are $W_E$ and $W_P$ in the same finite symplectic orbit? | **Yes** |
| Minimum transvection word length? | **One** |
| How many primitive length-one solutions? | **Two** |
| Which directions? | **$e_3$ and $e_4$** |
| What do they select? | **The imaginary-quadrature block** |
| Does one transvection complete $\mathfrak{sp}(4,\mathbb Z)$ dynamics? | **No** |

## Position in the corpus

- [recursion versus common-mode saturation](982_the_bisymplectic_dual_saturation_is_admissible_but_not_the_common_mode_carrier_so_recursion_alone_does_not_select_physics.md)
- [minimal conjugate completion pair](979_arithmetic_completion_requires_two_independent_conjugate_operations_one_handle_and_one_translation.md)
- [bi-symplectic recursion](981_the_fourier_and_handle_forms_define_a_split_quaternionic_bisymplectic_recursion_with_an_index_four_eigenlattice_seam.md)
