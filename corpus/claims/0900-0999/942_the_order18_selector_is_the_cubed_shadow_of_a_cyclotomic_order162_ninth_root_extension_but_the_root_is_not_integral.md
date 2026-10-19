# The Order-18 Selector Is the Cubed Shadow of a Cyclotomic Order-162 Ninth-Root Extension, but the Root Is Not Integral

**Date:** 17 October 2026  
**Branches:** qutrit ninth-root phase, active Coxeter cycle, handle transport, cyclotomic fields, symplectic carrier, and finite selector extension  
**Claim status:** exact real-algebraic extension and exact rational/integral obstruction; physical source map remains open  
**Certificate:** [classify_the_cyclotomic_ninth_root_extension_of_the_order18_selector.mjs](../../../verification/classify/classify_the_cyclotomic_ninth_root_extension_of_the_order18_selector.mjs)

## Executive result

The lossless active selector cycle has an exact real symplectic ninth root. Once the handle is included, that root generates a canonical order-162 extension whose cubed subgroup is precisely the established order-18 selector.

Let

\[
C=\begin{pmatrix}1&3\\-1&-2\end{pmatrix},
\qquad C^3=I,
\]

be the active integral Coxeter block, and put

\[
t=2\cos\frac{2\pi}{9},
\qquad t^3-3t+1=0.
\]

Then

\[
\boxed{
Q=\frac{C+tI}{t^2-1}
}
\]

satisfies

\[
Q^3=C,
\qquad Q^9=I,
\qquad \det Q=1.
\]

On the four-carrier,

\[
W=I_2\oplus Q
\]

is symplectic and obeys \(W^3=R\), where \(R=I_2\oplus C\) is the integral color/active generator.

The handle transports the ninth root to the other face. The generated group is

\[
\boxed{
\langle W,H\rangle
\cong(C_9\times C_9)\rtimes C_2,
\qquad |langle W,H\rangle|=162,
}
\]

with \(C_2\) exchanging the two face phases. Cubing the phase subgroup gives

\[
(C_3\times C_3)\rtimes C_2
\cong C_3\times S_3,
\]

exactly the existing order-18 selector.

The arithmetic cost is unavoidable: \(Q\) lives over the real cubic field \(\mathbb Q(t)\), not over \(\mathbb Q\) or \(\mathbb Z\). A four-dimensional rational matrix cannot have order nine because a primitive ninth root has cyclotomic degree \(\varphi(9)=6\).

Thus the qutrit ninth-root phase can refine the selector over a real cyclotomic extension, but cannot be inserted as an integral automorphism of the primitive four-carrier.

## 1. Exact ninth root of the active block

Since \(C^2+C+I=0\), every real function of \(C\) reduces to \(aI+bC\). A ninth root whose eigenvalue over the \(\omega\)-eigenspace is \(e^{2\pi i/9}\) must have trace

\[
t=e^{2\pi i/9}+e^{-2\pi i/9}.
\]

The characteristic relation for the root is

\[
Q^2-tQ+I=0.
\]

Hence

\[
Q^3=(t^2-1)Q-tI.
\]

Solving \(Q^3=C\) gives the displayed formula. The cubic identity

\[
t^3-3t+1=0
\]

then verifies the root relation exactly.

Because \(Q\in SL(2,\mathbb R)\), it preserves the active area form. Therefore \(W=I_2\oplus Q\) preserves the full alternating form

\[
J=\varepsilon\oplus(-\varepsilon).
\]

## 2. Handle transport forces two ninth-root faces

The integral handle has the form

\[
H=\begin{pmatrix}0&X\\X&0\end{pmatrix},
\qquad
X=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
\]

It transports the incidence-basis Coxeter block to the standard block on the other face:

\[
XCX=C_{\rm std}.
\]

Since \(Q\) is a polynomial in \(C\) over \(\mathbb Q(t)\), its handle transport satisfies

\[
(XQX)^3=XCX=C_{\rm std}.
\]

Conjugating \(W\) by \(H\) therefore creates the corresponding ninth-root action in the conjugate basis on the other face. The two face rotations commute and independently have order nine. The handle exchanges them, producing the wreath-type semidirect product

\[
(C_9\times C_9)\rtimes C_2.
\]

Its center is the diagonal \(C_9\), and its element orders are

\[
1,2,3,6,9,18.
\]

## 3. The established selector is exactly the cubed subgroup

Replacing both face rotations by their cubes reduces the normal phase subgroup:

\[
C_9\times C_9\longrightarrow C_3\times C_3.
\]

Under face exchange, decompose it into:

- the diagonal \(C_3\), fixed and central;
- the anti-diagonal \(C_3\), inverted by the handle.

The anti-diagonal factor together with the handle is \(D_3\cong S_3\). Consequently

\[
(C_3\times C_3)\rtimes C_2
\cong C_3\times S_3.
\]

This recovers exactly the corpus's earlier decomposition:

- central \(C_3\): common/diagonal phase;
- \(S_3\): relative phase plus face exchange.

The order-18 selector is therefore not accidentally adjacent to the qutrit ninth-root structure. It is the cubed finite shadow of its natural two-face extension.

## 4. Exact arithmetic obstruction

Suppose a rational \(4\times4\) matrix had order nine. Its minimal polynomial would divide \(x^9-1\). If its order were genuinely nine, the minimal polynomial would contain the primitive factor

\[
\Phi_9(x)=x^6+x^3+1,
\]

of degree six. But a \(4\times4\) matrix has minimal-polynomial degree at most four. Contradiction.

Therefore

\[
\boxed{
Sp(4,\mathbb Q)\text{ and }Sp(4,\mathbb Z)
\text{ contain no element of order }9.
}
\]

The real four-carrier admits \(W\), but the primitive integral lattice cannot.

This matters conceptually. The qutrit phase is an arithmetic refinement over a cyclotomic field, whereas the current selector is its rational/integral cubed shadow. Identifying them without scalar extension would be a type error.

## 5. Relation to the Prakash–Ramya gate

The source logical gate has eigenphases

\[
(1,\zeta_9,\zeta_9^{-1}).
\]

The active root \(Q\) has the same nontrivial conjugate pair. The handle supplies a second face because the four-carrier contains neutral and active two-planes sewn by exchange.

This gives a disciplined candidate chain:

\[
\text{anomaly-protected qutrit phase}
\longrightarrow
\mathbb Q(\zeta_9+\zeta_9^{-1})
\text{ face rotation}
\longrightarrow
\text{two-face order-162 extension}
\xrightarrow{\text{cube}}
C_3\times S_3.
\]

Only the algebraic middle and final arrow are presently proved. The first arrow still requires a physical source-to-response map.

## 6. Consequences for holonomy protection

There are now two sharply different possibilities.

### 6.1 Integral low-energy rule

Only the cubed phase descends to the primitive lattice. Then the observed selector is fundamental at the response level, and the ninth root exists only in a source/cyclotomic completion.

### 6.2 Cyclotomic ultraviolet completion

The physical boundary carrier is naturally defined over the real cubic field, and integral response emerges after taking the cubic shadow or restricting scalars.

This would explain why the exact \(2\pi/3\) rule is visible while the \(2\pi/9\) root is not.

Neither possibility is selected yet.

## 7. Stop-everything and falsification criteria

**Cyclotomic-source trigger:** the qutrit anomaly construction derives the field generator \(t=2\cos(2\pi/9)\) in a boundary response coefficient.

**Restriction-of-scalars trigger:** a six-real-dimensional cyclotomic carrier reduces canonically to the four-real-dimensional symplectic response while retaining the cubed holonomy.

**Physical-root trigger:** spectroscopy or a boundary calculation reveals a protected \(2\pi/9\) phase whose cube is the selector cycle.

**Integral-root falsifier:** an integral or rational four-carrier ninth root is claimed. Its minimal polynomial must contain \(\Phi_9\), which is impossible in dimension four.

**Group falsifier:** the ninth-root/handle closure is identified with \(D_9\) or with the order-18 selector. The exact closure on two exchanged faces has order 162.

**Dynamics boundary:** algebraic existence of \(W\) does not show that the Standard Model realizes the cyclotomic scalar extension.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does the active Coxeter block have a real symplectic ninth root? | **yes** |
| Does the handle-compatible root remain inside the order-18 selector? | **no** |
| What group does it generate with the handle? | **$(C_9\times C_9)\rtimes C_2$, order 162** |
| Is the old selector recovered by cubing? | **yes, exactly $C_3\times S_3$** |
| Is the ninth root rational or integral on the four-carrier? | **no** |
| Is its cyclotomic field physically derived? | **not yet** |

## 9. Position in the corpus

- [qutrit phase versus selector group](940_the_prakash_ramya_qutrit_anomaly_gate_contains_a_protected_c3_phase_but_its_order18_extension_is_not_the_selector_group.md)
- [qutrit-character UCP map](941_the_qutrit_character_algebra_maps_canonically_to_the_selector_povm_but_transports_the_protected_group_law_only_losslessly.md)
- [integral order-18 selector completion](../0800-0899/865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [selector group classification](../0700-0799/786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [pulse-area protection boundary](../0800-0899/862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)

**Subsequent boundary:** document [943](943_restriction_of_scalars_explains_the_six_and_twelve_dimensional_cyclotomic_sizes_but_not_the_lossy_dilation_characters.md) shows that restriction of scalars also produces dimensions six and twelve, but not the lossy dilation representations. Their cubed character multiplicities are respectively $(0,3,3)$ versus $(2,2,2)$ and $(6,3,3)$ versus $(4,4,4)$. Any bridge must therefore be a noninvertible environment channel, not an invertible intertwiner.
