# Restriction of Scalars Explains the Six- and Twelve-Dimensional Cyclotomic Sizes, but Not the Lossy Dilation Characters

**Date:** 17 October 2026  
**Branches:** real cyclotomic field, restriction of scalars, rational symplectic dimension, Naimark dilation, character multiplicities, and common-mode activation  
**Claim status:** exact dimension match and exact representation obstruction  
**Certificate:** [compare_cyclotomic_restriction_of_scalars_with_the_six_and_twelve_port_dilations.mjs](../../../verification/compare/compare_cyclotomic_restriction_of_scalars_with_the_six_and_twelve_port_dilations.mjs)

## Executive result

The cyclotomic ninth-root branch and the lossy dilation branch independently produce dimensions six and twelve:

\[
\begin{array}{c|cc}
&\text{active}&\text{full two-face carrier}\\ \hline
\text{cyclotomic restriction of scalars}&6&12\\
\text{strict-loss Naimark dilation}&6&12.
\end{array}
\]

This equality is real but does not identify the representations.

Let

\[
K=\mathbb Q(t),
\qquad
t=2\cos(2\pi/9),
\qquad
[K:\mathbb Q]=3.
\]

The two-dimensional \(K\)-module carrying the ninth root becomes a six-dimensional rational module under restriction of scalars. Its cubed \(C_3\) action has character multiplicities

\[
\boxed{(m_1,m_\omega,m_{\omega^2})=(0,3,3).}
\]

The strict-loss six-port Naimark dilation instead has

\[
\boxed{(2,2,2).}
\]

On the full twelve-dimensional carriers the mismatch is

\[
(6,3,3)
\quad\text{versus}\quad
(4,4,4).
\]

Therefore no invertible complex, real or rational intertwiner identifies the cyclotomic restriction-of-scalars carrier with the strict-loss dilation. The dimension coincidence is not a hidden equivalence.

The conceptual distinction is sharp:

- restriction of scalars triples the two nontrivial lossless characters and introduces no active common mode;
- passive loss activates the trivial character and redistributes multiplicity equally across all three sectors.

## 1. An integral six-dimensional order-nine matrix

Use the integral basis \((1,t,t^2)\) of the real cubic field, with

\[
t^3=3t-1.
\]

Multiplication by \(t\) is represented by

\[
T=
\begin{pmatrix}
0&0&-1\\
1&0&3\\
0&1&0
\end{pmatrix}.
\]

The root-adapted two-dimensional \(K\)-matrix

\[
Q_0=
\begin{pmatrix}
0&-1\\
1&t
\end{pmatrix}
\]

restricts to the integral rational matrix

\[
M_9=
\begin{pmatrix}
0&-I_3\\
I_3&T
\end{pmatrix}.
\]

Direct calculation gives

\[
M_9^9=I_6,
\qquad
M_9^3\neq I_6.
\]

Its characteristic polynomial is the primitive ninth cyclotomic polynomial

\[
\Phi_9(x)=x^6+x^3+1.
\]

This realizes the minimum rational dimension predicted by \(\deg\Phi_9=6\).

## 2. Cubing the restricted module

The eigenvalues of \(M_9\) are all six primitive ninth roots. Cubing sends three to \(\omega\) and three to \(\omega^2\). Hence

\[
\chi_{M_9^3}(x)=(x^2+x+1)^3
\]

and the trivial-character multiplicity is zero.

Equivalently, for a real \(C_3\)-module with multiplicities \((m_0,m,m)\),

\[
\dim=m_0+2m,
\qquad
\operatorname{tr}R=m_0-m.
\]

Here \(\dim=6\) and \(\operatorname{tr}(M_9^3)=-3\), giving \((0,3,3)\).

Thus restriction of scalars produces three Galois-conjugate copies of the lossless active plane.

## 3. Full twelve-dimensional cyclotomic carrier

The four-dimensional carrier over \(K\) restricts to twelve rational dimensions. For the phase generator, the neutral face contributes six trivial directions and the active face contributes the restricted order-nine module. After cubing,

\[
\chi_{R_{\rm cyc}}(x)
=(x-1)^6(x^2+x+1)^3,
\]

with multiplicities

\[
(6,3,3).
\]

This is the rational version of the cyclotomic order-162 extension. It is a legitimate arithmetic completion of the ninth-root phase.

It is not the strict-loss environment carrier.

## 4. Character obstruction to the Naimark identification

For strict loss, every active POVM effect has rank two. The minimal spectral dilation therefore has two dimensions in each character sector:

\[
(m_0,m_1,m_2)=(2,2,2),
\]

and characteristic polynomial

\[
(x-1)^2(x^2+x+1)^2.
\]

After adjoining the neutral handle partner, each sector doubles:

\[
(4,4,4),
\]

with polynomial

\[
(x-1)^4(x^2+x+1)^4.
\]

Since character multiplicities are invariant under change of basis, neither the six-dimensional nor twelve-dimensional carriers are isomorphic.

This also clarifies the meaning of common-mode activation. Loss creates trivial-character response degrees of freedom. Galois restriction of a primitive ninth-root module cannot do so, because every embedding remains primitive and nontrivial after cubing.

## 5. What the dimension match still means

The match is not useless. It says both constructions reach the smallest dimensions naturally associated with their respective completion problems:

- six is the minimum rational dimension for primitive order-nine arithmetic;
- six is the minimum Hilbert-space dimension for three full-rank two-dimensional POVM effects;
- twelve is obtained by adjoining the second handle face in both cases.

This suggests that a larger theory could contain both as inequivalent twelve-dimensional sectors or connect them through a noninvertible channel. It rules out the simpler proposal that they are two bases of the same representation.

## 6. New branch: channel rather than intertwiner

An invertible intertwiner is impossible, but a completely positive map may still relate the two representations.

The cyclotomic cubed multiplicities \((0,3,3)\) contain no trivial sector. Any channel producing \((2,2,2)\) must therefore:

1. discard or decohere part of the nontrivial Galois multiplicity;
2. couple an external trivial-character environment;
3. activate the common mode through that environment.

That is structurally consistent with the passive-loss story, but it requires additional degrees of freedom beyond restriction of scalars alone.

## 7. Stop-everything and falsification criteria

**Joint-completion trigger:** construct a physical twelve-dimensional boundary theory containing both character decompositions and a causal channel between them.

**Common-mode trigger:** derive the two trivial-character active ports from a source-native environment coupled to the cyclotomic module.

**Arithmetic-dynamics trigger:** show that loss/decoherence is exactly a trace or conditional expectation from the Galois-completed source algebra.

**Intertwiner falsifier:** any claimed invertible identification must preserve \(C_3\) character multiplicities; \((0,3,3)\neq(2,2,2)\) and \((6,3,3)\neq(4,4,4)\).

**Dimension-overclaim warning:** equal carrier dimension does not imply equal representation, symplectic form, lattice or physical typing.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does restriction of scalars give dimensions six and twelve? | **yes** |
| Are these the minimum rational cyclotomic dimensions? | **yes** |
| Do they match the Naimark dimensions numerically? | **yes** |
| Are the representations isomorphic? | **no, character multiplicities differ** |
| Can a noninvertible physical channel still connect them? | **open** |

## 9. Position in the corpus

- [cyclotomic order-162 extension](942_the_order18_selector_is_the_cubed_shadow_of_a_cyclotomic_order162_ninth_root_extension_but_the_root_is_not_integral.md)
- [global six-port dilation theorem](939_the_full_passive_silver_loss_family_has_positive_c3_barycentric_effects_and_exact_six_port_dilations.md)
- [full twelve-port selector dilation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
- [orbit/character Fourier duality](932_the_dilation_sectors_are_fourier_dual_to_the_a2_root_labels_but_are_not_the_same_three_effect_frame.md)

**Subsequent resolution:** document [944](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md) constructs the minimal noninvertible bridge. Tensoring the balanced target with the unique common-mode-active reflection doublet gives Stinespring multiplicities $(4,4,4)$, contains the cyclotomic source $(0,3,3)$, and leaves complement $(4,1,1)$. The remaining problem is microscopic Kraus typing.
