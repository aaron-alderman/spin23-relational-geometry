# A Massless Dirac Neutrino Leaves a \(U(1)\) Exchange Ambiguity, While Puncturing \(\nu^c\) Removes the Pair

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the neutrino-kernel branch  
**Claim status:** exact finite polar-decomposition theorem for a rank-two Dirac neutrino matrix; Majorana and dynamical selection remain open  
**Certificate:** [verify_rank_two_neutrino_polar_exchange_has_u1_kernel_ambiguity.mjs](../../../verification/verify/verify_rank_two_neutrino_polar_exchange_has_u1_kernel_ambiguity.mjs)

## Executive result

The Higgs/Yukawa-polar dressed exchange remains compatible with a rank-two three-family Dirac neutrino matrix, but it ceases to be unique.

Write

\[
M_\nu=U_L
\begin{pmatrix}
m_1&0&0\\
0&m_2&0\\
0&0&0
\end{pmatrix}
V_R^\dagger.
\]

The polar partial isometry is fixed on the two-dimensional massive support. Its unitary extensions form

\[
\boxed{
U_\alpha
=U_L\operatorname{diag}(1,1,e^{i\alpha})V_R^\dagger,
\qquad \alpha\in U(1).
}
\]

Every corresponding exchange

\[
S_\alpha=
\begin{pmatrix}
0&U_\alpha\\
U_\alpha^\dagger&0
\end{pmatrix}
\]

satisfies

\[
S_\alpha^2=I,
\qquad
\{S_\alpha,Z_{\rm chir}\}=0,
\qquad
[S_\alpha,H_\nu]=0.
\]

All extensions agree on the massive support and differ only on the zero-mode pair. A nonzero complex mass for that pair fixes \(\alpha\) to its phase.

This separates two neutrino situations that had previously been rhetorically close:

- puncturing \(\nu^c\) removes the right member and destroys the exchange pair;
- retaining \(\nu^c\) with one zero Dirac singular value preserves the pair but leaves its exchange phase undetermined.

## 1. Polar decomposition with a kernel

For a full-rank matrix,

\[
M=UP,
\qquad
P=(M^\dagger M)^{1/2},
\]

determines the unitary \(U\) uniquely.

For rank two, \(P\) has a one-dimensional kernel. The equation \(M=UP\) fixes \(U\) only on \(\operatorname{supp}P\). It says nothing about the image of the right kernel vector.

A unitary completion must send the right kernel to the left kernel. Since both are one-dimensional, the remaining choice is a phase:

\[
U(1)=\{e^{i\alpha}\}.
\]

For rank defect \(k\), the same argument gives a \(U(k)\) extension ambiguity.

## 2. Exchange compatibility does not select the phase

The Hermitian Dirac mass operator is

\[
H_\nu=
\begin{pmatrix}
0&M_\nu\\
M_\nu^\dagger&0
\end{pmatrix}.
\]

Because the mass vanishes on both kernel lines, every \(S_\alpha\) commutes with \(H_\nu\). The Pauli relations also hold for every \(\alpha\).

Therefore neither exchange closure nor mass covariance selects the zero-mode phase.

After compression to the massive support,

\[
P_{\rm massive}S_\alpha P_{\rm massive}
\]

is independent of \(\alpha\). All massive observables are blind to the ambiguity unless another interaction couples to the kernel.

## 3. A small mass selects the extension

Add a kernel mass

\[
m_0e^{i\beta}
\]

between the left and right zero modes. The full polar unitary becomes

\[
U_\beta
=U_L\operatorname{diag}(1,1,e^{i\beta})V_R^\dagger.
\]

Only \(S_\beta\) commutes with the lifted mass operator. An exchange using a different phase fails.

Thus an arbitrarily small but nonzero Dirac mass removes the \(U(1)\) ambiguity, although the limit \(m_0\to0\) is nonuniform at the level of the chosen exchange frame.

## 4. Comparison with the Prakash–Ramya puncture

The full sixteen-state generation contains

\[
\nu^c\leftrightarrow\nu
\]

as one of the eight Dirac/topology pairs.

Puncturing \(\nu^c\) produces the fifteen-state code and leaves \(\nu\) without an exchange partner. This is a dimensional failure of the Pauli factor, not a polar-phase ambiguity.

Restoring \(\nu^c\) repairs the dimension count. If the neutrino Dirac Yukawa is zero, the exchange on that repaired pair still has an arbitrary \(U(1)\) phase. If the Dirac Yukawa is nonzero, its phase fixes the exchange.

The logical completion and the dynamical mass completion are therefore separate steps:

\[
\text{restore }\nu^c
\quad\not\Rightarrow\quad
\text{select the neutrino exchange phase}.
\]

## 5. Relation to the previously found neutrino zero mode

The fifteen-state Yukawa grading already forced one neutrino zero mode when \(\nu^c\) was absent. The present result refines that statement:

1. without \(\nu^c\), the zero mode is unpaired under topology exchange;
2. with \(\nu^c\) but rank-two \(M_\nu\), the massless mode is paired but its exchange phase is free;
3. with full-rank \(M_\nu\), the polar exchange is unique.

This gives a three-level diagnostic rather than a binary massive/massless distinction.

## 6. Majorana boundary

A right-neutrino Majorana matrix changes the problem. The relevant factorization is Takagi rather than ordinary Dirac polar decomposition, and the kernel symmetry can reduce from \(U(k)\) to an orthogonal subgroup or be lifted entirely.

No Majorana conclusion is inferred from the present Dirac certificate. The source paper's punctured logical qudit and a physical Majorana sterile sector must remain distinct until that calculation is done.

## 7. Physical interpretation of the \(U(1)\)

The kernel phase may be:

- a pure convention if the massless sterile partner has no other coupling;
- fixed by a Majorana term;
- fixed by a boundary or Furey real structure;
- promoted to a Berry connection if parameters vary around a rank defect;
- or rendered observable by interactions that mix massive and kernel sectors.

Calling it a physical phase before one of those mechanisms is supplied would overstate the result.

## 8. Stop-everything and falsification criteria

Stop treating a rank-deficient dressed exchange as unique if:

1. its unitary polar factor is chosen without specifying the kernel extension;
2. predictions depend on \(\alpha\) while the kernel is claimed decoupled;
3. a Majorana matrix is present but ordinary Dirac polar decomposition is still used;
4. puncturing \(\nu^c\) is confused with setting a Dirac singular value to zero;
5. a kernel Berry phase is asserted without a parameter loop and connection.

A stop-everything positive result would derive the kernel extension from the same Furey/Jordan real structure that selects the \(H_2(\mathbb R)\) carrier and would relate it to a measurable neutrino phase.

## 9. Next gates

1. Repeat the calculation for a Dirac-plus-Majorana Takagi/Nambu operator.
2. Compute the Berry connection around a rank-changing neutrino parameter loop.
3. Test whether the Furey neutral exchange fixes the kernel extension.
4. Determine how many phases survive in the PMNS matrix for each kernel scenario.
5. Compare the kernel \(U(1)\) with the Higgs Hopf fiber without identifying them prematurely.

## Reproducibility

    node scripts\verify_rank_two_neutrino_polar_exchange_has_u1_kernel_ambiguity.mjs

## Companion documents

- [Higgs/Yukawa-polar dressed exchange](695_a_higgs_and_yukawa_polar_dressed_dirac_exchange_closes_the_pauli_algebra_without_erasing_ckm_cp.md)
- [Weak-isospin topology parity and the \(\nu^c\) puncture](693_weak_isospin_squared_supplies_the_exact_topology_parity_and_nuc_puncturing_breaks_the_pauli_pair.md)
- [The fifteen-state Yukawa grading forces a neutrino zero mode](../0300-0399/312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [The zero mode extends to a massless Dirac-type cone](../0300-0399/313_the_yukawa_zero_mode_extends_to_a_massless_dirac_type_cone.md)
