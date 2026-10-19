# The Quartic \(M/I\) Character Is an Independent Global Orientation Line

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact quotient-action and character theorem; identification with a physical theta or CP line remains conditional

## 1. Result

Let

\[
G=M/I\cong\mathbb Z_4\oplus(\mathbb Z_2)^3
\]

in the selector basis \((v,w,r,s,t)\). Because every generator of \(I\) has \(r\)-coordinate divisible by four,

\[
\boxed{
\chi_r:G\longrightarrow\mathbb Z_4,
\qquad
\chi_r([x])=x_r\pmod4}
\]

is a well-defined surjective character.

The source-derived \(D_2\) puncture involution preserves \(I\) and acts trivially on all of \(G\). Composing it with global lattice negation also preserves \(I\), but acts by

\[
[x]\longmapsto-[x].
\]

Consequently,

\[
\boxed{
\chi_r\mapsto\chi_r
\quad\text{under puncture exchange},}
\]

while

\[
\boxed{
\chi_r\mapsto-\chi_r
\quad\text{after global negation}.}
\]

The fourth-root character

\[
\Theta([x])=i^{\chi_r([x])}
\]

is therefore complex-conjugated:

\[
\Theta\mapsto\overline{\Theta}.
\]

This produces a genuine quartic orientation line, but it is independent of the falsified support-swap/puncture-exchange equivariance.

## 2. Exact lattice actions

The \(D_2\)-basis puncture involution acts on the primitive wedge as

\[
(E_1,F_1,E_2,F_2,R)
\mapsto
(-E_1,-F_1,-E_2,-F_2,R).
\]

On the index-six basis this is

\[
P_M=\operatorname{diag}(-1,-1,+1,-1,-1).
\]

Direct calculation gives

\[
A^{-1}P_MA\in GL(5,\mathbb Z),
\]

where \(A\) is the inclusion matrix \(I\hookrightarrow M\). Thus \(P_M\) preserves \(I\).

Although \(P_M\) changes signs on four lattice coordinates, those four quotient classes have order two. It fixes the order-four coordinate \(r\). Hence

\[
\boxed{P_M|_G=\operatorname{id}_G.}
\]

Now compose with \(-I_M\):

\[
\widetilde P_M=-P_M.
\]

Again

\[
A^{-1}\widetilde P_MA\in GL(5,\mathbb Z),
\]

and on the quotient

\[
\boxed{\widetilde P_M([x])=-[x].}
\]

Only the \(\mathbb Z_4\) factor detects this inversion; inversion is trivial on all three \(\mathbb Z_2\) factors.

## 3. Meaning of the result

Previous cycles established:

- the support swap cannot be identified with puncture exchange;
- \(G\) is isotropic in \(A_I\), so its group structure does not itself provide a quadratic phase;
- the \(\mathbb Z_4\) factor nevertheless has capacity to support a fourth-root character.

The character \(\chi_r\) now realizes that capacity explicitly. It is a linear character, not the discriminant quadratic form. Its transformation law separates two operations:

\[
\begin{array}{c|c|c}
\text{operation} & G & \Theta\\
\hline
\text{puncture exchange} & \text{identity} & \Theta\\
\text{global-negated exchange} & [x]\mapsto-[x] & \overline{\Theta}
\end{array}
\]

Thus the quartic direction naturally carries a global orientation/conjugation bit rather than the local weak-handle permutation.

## 4. Candidate physical interpretations

The exact mathematics permits, but does not choose among:

1. a theta-multiplier orientation line;
2. a metaplectic central character;
3. a CP-like complex-conjugation line;
4. the global monomial-negation character of the code;
5. an orientation of the two-face relational carrier.

Any physical identification must reproduce the explicitly derived inversion law.

## 5. Stop-everything and falsification gates

### Stop-everything

1. The Prakash–Ramya transversal phase pulls back exactly to \(i^{\chi_r}\).
2. The genus-two theta multiplier assigns the same conjugation under global negation.
3. A Furey or Dirac orientation operator acts as \(-1\) on \(r\) and trivially on \(G[2]/2G\).

### Falsifiers and boundaries

- Puncture exchange alone does not orient the quartic line.
- \(\chi_r\) is a linear character, not a descended lattice quadratic form.
- The result does not restore the failed support-swap equivariance.
- A physical interpretation remains conditional until an independently defined phase equals \(i^{\chi_r}\).

## 6. Next calculations

1. Pull the previously computed binary theta phase onto \(\chi_r\).
2. Compare global monomial negation with complex conjugation in the finite Weil representation.
3. Test whether the same character appears in the doubled Dirac carrier.
4. Compute the odd-prime analogue, where inversion is nontrivial on more quotient directions.

## Certificate and companions

- [Quartic-character action certificate](scripts/analyze_puncture_exchange_and_global_negation_on_M_over_I_quartic_character.mjs)
- [Common-intersection quotient](526_the_common_intersection_separates_one_qutrit_glue_from_a_quartic_binary_lift.md)
- [Full twice-punctured automorphism no-go](535_the_full_twice_punctured_qutrit_automorphism_group_has_no_accidental_root_exchange.md)

