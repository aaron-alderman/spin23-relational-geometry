# The Field-Labelled Two-Torsion Map Stops at Two Intertwiners and Needs a Theta Extension

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact enumeration and symplectic-obstruction theorem; the enriched dual-character or metaplectic repair remains open

## 1. Executive result

The proposed identification

\[
D_{\rm supp}
\longrightarrow
H:=G[2]/2G,
\qquad
G=M/I,
\]

can now be tested with field labels rather than group orders alone.

Both sides are three-dimensional binary spaces. There are

\[
|GL(3,2)|=168
\]

linear isomorphisms between them. Successive source constraints reduce these as follows:

\[
\boxed{
168
\xrightarrow{\text{color/weak flag}}
24
\xrightarrow{\text{oriented section}}
6
\xrightarrow{\text{puncture exchange}}
2.}
\]

The two survivors differ only by exchanging the two target null legs \(s\) and \(t\). Thus the group-theoretic data almost select the map, but do not orient the target qutrit plane.

The decisive result is an obstruction:

\[
\boxed{
\text{neither survivor preserves the natural mod-four quadratic data}.}
\]

Indeed:

1. the source weak section carries the anisotropic quarter-turn phase
   \[
   q_{\rm supp}(x)=q_{\rm supp}(y)=3,\qquad
   q_{\rm supp}(x+y)=2\pmod4;
   \]
2. the natural integral \(U(-3)\) plane has
   \[
   q_{U(-3)}(s)=q_{U(-3)}(t)=0,\qquad
   q_{U(-3)}(s+t)=2\pmod4;
   \]
3. more fundamentally, \(G=M/I\) is isotropic inside the discriminant form of \(I\), so no nontrivial quadratic refinement descends to \(G\) from the even lattice alone.

There is a second, independent obstruction. The raw support Weyl involution exchanges \(u^c_1\leftrightarrow d^c_1\) while fixing \(d_1,e,\nu\). On the rank-four support quotient its eigenspaces have dimensions \(3+1\). Such an involution preserves neither a nondegenerate symplectic form nor a nondegenerate anti-symplectic form.

Therefore the missing structure is now sharply located:

\[
\boxed{
\text{the desired bridge requires an enriched dual-character action,
a transported symplectic fiber, or a theta/metaplectic extension}.}
\]

It cannot be obtained from the raw field permutation and finite group filtration alone.

## 2. The target quotient in the selector basis

Use the basis

\[
(v,w,r,s,t)
\]

of the index-six lattice \(M\), with Gram matrix

\[
\operatorname{Gram}M
=
\langle2\rangle_v
\oplus\langle-2\rangle_w
\oplus\langle-2\rangle_r
\oplus U(-3)_{s,t}.
\]

In \(G=M/I\), the basis-vector orders are

\[
\boxed{
\operatorname{ord}(v,w,r,s,t)=(2,2,4,2,2).}
\]

Moreover,

\[
[v]=[w]\in G.
\]

Thus the positive selector and its negative binary companion become the same order-two quotient class. This is the binary index-two gluing relation expressed inside \(G\).

The two-torsion is

\[
G[2]=\langle2r,w,s,t\rangle\cong(\mathbb Z_2)^4,
\]

and after removing the characteristic quartic-square line,

\[
H=G[2]/\langle2r\rangle
=\langle w,s,t\rangle
\cong(\mathbb Z_2)^3.
\]

This basis supplies a selector-labelled flag

\[
0\longrightarrow
\langle w\rangle
\longrightarrow H
\longrightarrow
\langle s,t\rangle
\longrightarrow0.
\]

The line \(\langle w\rangle=\langle v\rangle\) is the binary selector-gluing direction, while \(\langle s,t\rangle\) is the reduction of the level-three null plane.

## 3. The source flag and oriented section

Choose the source basis

\[
(c,x,y)
\]

of \(D_{\rm supp}\), where

\[
\begin{aligned}
c&=01100 &&\text{is the color radical},\\
x&=11110=\beta(u^c_1+d_1),\\
y&=11101=\beta(d_1+d^c_1).
\end{aligned}
\]

The Standard-Model \(3+2\) flag is

\[
0\longrightarrow
\langle c\rangle
\longrightarrow D_{\rm supp}
\longrightarrow
\langle\bar x,\bar y\rangle
\longrightarrow0.
\]

The common-hub oriented puncture equations select the section

\[
S_1=\langle x,y\rangle.
\]

Puncture exchange fixes \(c\) and swaps

\[
x\leftrightarrow y.
\]

The most direct source-labelled candidate therefore sends

\[
c\longmapsto w,
\qquad
\{x,y\}\longmapsto\{s,t\}.
\]

The enumeration tests exactly how much freedom remains in this statement.

## 4. Exact map count

### 4.1 Unconstrained

There are 168 isomorphisms \(D_{\rm supp}\to H\).

### 4.2 Preserve the two flags

Requiring

\[
\phi(c)=w
\]

and an invertible induced map

\[
D_{\rm supp}/\langle c\rangle
\longrightarrow
H/\langle w\rangle
\]

leaves 24 maps.

The factorization is

\[
24=|GL(2,2)|\cdot 2^2=6\cdot4.
\]

The \(GL(2,2)\) factor changes the weak basis; the \(2^2\) factor adds the color line independently to the two weak lifts.

### 4.3 Preserve the oriented sections

Requiring

\[
\phi(S_1)=\langle s,t\rangle
\]

removes those two color-line additions and leaves six maps:

\[
6=|GL(2,2)|.
\]

### 4.4 Intertwine puncture exchange

Give the target plane the evident involution

\[
s\leftrightarrow t,
\qquad
w\mapsto w.
\]

Intertwining this with \(x\leftrightarrow y\) leaves two maps:

\[
\begin{aligned}
\phi_+:\quad
&c\mapsto w,\quad x\mapsto s,\quad y\mapsto t,\\
\phi_-:\quad
&c\mapsto w,\quad x\mapsto t,\quad y\mapsto s.
\end{aligned}
\]

They differ by target null-leg exchange. No presently established source datum says which target leg is \(s\) and which is \(t\).

## 5. Quadratic mismatch

On the source section, the binary phase is recorded in quarter-turn exponents:

\[
q_{\rm supp}(a x+b y)
=3a+3b\pmod4.
\]

Hence

\[
q_{\rm supp}(x)=3,\qquad
q_{\rm supp}(y)=3,\qquad
q_{\rm supp}(x+y)=2.
\]

For the integral null plane \(U(-3)\), a vector \(as+bt\) has norm

\[
(as+bt)^2=-6ab.
\]

The direct mod-four norm enhancement is therefore

\[
q_{U(-3)}(as+bt)
= (as+bt)^2
=2ab\pmod4,
\]

because \(-6\equiv2\pmod4\). Thus

\[
q_{U(-3)}(s)=0,\qquad
q_{U(-3)}(t)=0,\qquad
q_{U(-3)}(s+t)=2.
\]

No one of the six section-preserving maps, and therefore neither of the two Weyl intertwiners, matches these tables.

This is not a basis accident. One refinement assigns nonzero quarter phases to both basis axes; the other assigns phase only to their sum.

## 6. Why no quadratic form descends from \(I\)

The mismatch is more structural than the preceding table suggests.

The common lattice \(I\) is an even sublattice of the even lattice \(M\). The quotient

\[
G=M/I
\]

embeds as an isotropic subgroup of the discriminant module

\[
A_I=I^*/I.
\]

For every \(m\in M\),

\[
q_I(m+I)
=\frac{m^2}{2}\pmod{\mathbb Z}
=0,
\]

because \(M\) is even. Therefore

\[
\boxed{q_I|_G=0.}
\]

The finite group \(G\), including its order-four factor, does not inherit the desired theta phase from the lattice discriminant form. The proposed phase must be extra data: a character, quadratic refinement, metaplectic cocycle or boundary trivialization.

This corrects a possible overreading of the previous cycle. The presence of a \(\mathbb Z_4\) factor gives the **capacity** to carry a fourth-root phase; it does not supply that phase.

## 7. Raw Weyl exchange cannot preserve the symplectic carrier

The field involution is

\[
u^c_1\leftrightarrow d^c_1,
\qquad
d_1,e,\nu\ \text{fixed}.
\]

On the oriented carrier basis

\[
(h_D,h_C,d_1,\nu),
\]

it exchanges \(h_D,h_C\) and fixes \(d_1,\nu\). Its \(+1\) and \(-1\) eigenspaces therefore have dimensions

\[
(3,1).
\]

Let a general alternating form in this basis have independent entries

\[
\Omega_{12}=a,\quad
\Omega_{13}=b,\quad
\Omega_{14}=c,\quad
\Omega_{23}=d,\quad
\Omega_{24}=e,\quad
\Omega_{34}=f.
\]

### Invariant case

The condition

\[
S^T\Omega S=\Omega
\]

forces

\[
a=0,\qquad d=b,\qquad e=c.
\]

Its Pfaffian is

\[
\operatorname{Pf}(\Omega)
=af-be+cd
=0-bc+cb
=0.
\]

Every invariant alternating form is degenerate.

### Anti-invariant case

The condition

\[
S^T\Omega S=-\Omega
\]

forces

\[
f=0,\qquad d=-b,\qquad e=-c.
\]

Again,

\[
\operatorname{Pf}(\Omega)
=a\cdot0-b(-c)+c(-b)
=0.
\]

Every anti-invariant alternating form is also degenerate.

Thus the field exchange is neither symplectic nor anti-symplectic for any nondegenerate form on this raw rank-four quotient.

## 8. Interpretation: the action must be enlarged or transported

There are three credible repairs.

### 8.1 Enriched dual-character action

The field quotient records meridians but omits their dual characters. Extending puncture exchange to the dual plane by the inverse transpose can produce a genuine symplectic action with \(2+2\) eigenvalue multiplicities.

This is the cleanest CSS/phase-space interpretation:

\[
L_X
\longmapsto
L_X\oplus L_X^*.
\]

### 8.2 Fiber transport

The handle group already transports a 240-element family of phase-lattice fibers instead of fixing one. The Weyl involution may likewise send one symplectic completion to another:

\[
(V,\Omega)\longmapsto(V,S^*\Omega),
\]

rather than stabilize \(\Omega\).

### 8.3 Theta/metaplectic extension

The order-four phase can live in a central extension of the finite symplectic action. Then the missing datum is not a quadratic form on \(G\) but a cocycle or theta characteristic over it.

These mechanisms are distinguishable and should not be conflated.

## 9. Consequences for the Prakash–Ramya bridge

Prakash–Ramya provide:

- the cubic anomaly lattice;
- prime reductions;
- a punctured logical coordinate;
- a transversal phase determined by the omitted anomaly;
- Dirac doubling.

The present obstruction says that converting those data into this \(Spin(2,3)\) carrier requires the **logical dual sector**, not only the physical-field charge quotient. This is conceptually natural: a CSS code becomes symplectic only after combining logical \(X\) labels with their dual \(Z\) characters.

The likely corrected bridge is therefore

\[
\text{field relations}
\longrightarrow
L_X
\longrightarrow
L_X\oplus L_X^*
\longrightarrow
Sp(4)
\longrightarrow
Spin(2,3),
\]

with the theta phase appearing in a metaplectic lift. The failed direct map is evidence for this longer route.

## 10. Stop-everything and falsification gates

### Stop-everything triggers

1. The two logical puncture labels and their dual characters form an integral rank-four lattice whose Weyl action is the required inverse-transpose extension.
2. Its metaplectic cocycle restricts to the Prakash–Ramya transversal \(T\) phase.
3. Its primitive exterior square reproduces \(M\), \(I\), and the two surviving maps \(\phi_\pm\) without a fitted basis.
4. The \(s/t\) ambiguity is fixed by an independently oriented qutrit null leg or Dirac-pairing convention.

### Falsifiers

1. The raw \(3+1\) field involution cannot act on one fixed symplectic carrier; this is now proved.
2. The even-lattice discriminant form of \(I\) cannot provide a nontrivial phase on \(G\); its restriction is zero.
3. The natural \(U(-3)\) mod-four norm does not equal the source anisotropic phase.
4. Group isomorphism and flag compatibility alone leave two maps and do not select a theta lift.

## 11. Next calculations

1. Construct the integral two-puncture logical \(X\)-lattice and its dual-character lattice explicitly.
2. Extend puncture exchange by inverse transpose and compute its \(Sp(4,\mathbb Z)\) matrix.
3. Compute the associated finite Heisenberg/metaplectic cocycle at \(p=2\).
4. Test whether its exterior square contains \(I\subset M\subset N\).
5. In parallel, compute the transport of the chosen symplectic completion under the raw field involution and locate its phase-lattice fiber.

## Certificate and companions

- [Field-labelled map and obstruction certificate](../../../verification/test/test_source_labelled_support_defect_maps_to_two_torsion_quotient.mjs)
- [Canonical two-torsion filtration](527_the_support_defect_lives_in_the_canonical_two_torsion_quotient_beneath_the_quartic_lift.md)
- [Oriented puncture section](523_oriented_puncture_charge_relations_select_one_weyl_invariant_section.md)
- [Primitive source wedge and common intersection](525_the_oriented_source_wedge_meets_the_index_six_selector_lattice_at_index_192.md)
- [Prakash–Ramya cubic-lattice audit](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)

