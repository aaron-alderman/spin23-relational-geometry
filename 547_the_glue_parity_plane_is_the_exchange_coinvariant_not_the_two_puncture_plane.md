# The glue parity plane is the exchange coinvariant, not the two-puncture plane

## Status

**Exact comparison of the Hadamard glue quotient with the earlier source-wedge quotient, support labels and quartic theta section.**

The glue-derived \(\mathbb F_2^2\) Lagrangian is not the two-dimensional plane spanned by the two puncture labels. Instead, it is the exchange-coinvariant compression that retains:

1. the color/selector parity;
2. the common weak parity;

while killing the difference between the two oriented weak classes.

This falsifies the simplest identification of the two glue bits with the two punctures.

## 1. The glue parity map on \(M\)

Write a vector of \(M\) as

\[
x=av+bw+cr+ds+et.
\]

The two parity coordinates of the first Hadamard face are

\[
\boxed{
\pi_H(x)
=
(a+b,\ d+e)\pmod2.}
\]

The first coordinate is the parity of the \(v,w\) selector block. The second is the combined parity of the two null legs.

## 2. Descent through the old source intersection

Let

\[
I=K\cap M
\]

be the earlier source-wedge intersection, with

\[
G=M/I
\cong\mathbb Z_4\oplus(\mathbb Z_2)^3.
\]

Every generator of \(I\) has

\[
a+b\equiv0\pmod2,
\qquad
d+e\equiv0\pmod2.
\]

Therefore \(\pi_H\) descends canonically to

\[
\overline\pi_H:G\longrightarrow\mathbb F_2^2.
\]

It is surjective. Each of its four values has eight preimages, so

\[
\boxed{
|\ker\overline\pi_H|=8.}
\]

The glue parity plane is therefore a canonical quotient of the old 32-element phase/source quotient.

## 3. Field-labelled support map

The previous field-labelled support identification was

\[
c\mapsto w,
\qquad
x\mapsto s,
\qquad
y\mapsto t,
\]

where \(c\) is the color radical and \(x,y\) are the two oriented weak classes.

Applying the glue parity map gives

\[
\boxed{
c\mapsto(1,0),\qquad
x\mapsto(0,1),\qquad
y\mapsto(0,1).}
\]

Consequently,

\[
x+y\mapsto0.
\]

The glue plane is the quotient

\[
D_{\rm supp}/\langle x+y\rangle,
\]

at the level of underlying binary groups. It is not the earlier weak phase quotient

\[
D_{\rm supp}/\langle c\rangle.
\]

Those are two different quotients of the same three-bit support defect:

\[
\begin{array}{c|c}
\text{quotient killed} & \text{information retained}\\
\hline
\langle c\rangle & \text{two oriented weak/puncture bits}\\
\langle x+y\rangle & \text{color parity + symmetric weak parity}
\end{array}
\]

## 4. Exchange coinvariants

Puncture exchange acts by

\[
x\leftrightarrow y
\]

or

\[
s\leftrightarrow t.
\]

Since the glue quotient identifies \(s\) and \(t\), puncture exchange acts trivially:

\[
\boxed{
\pi_H(\tau u)=\pi_H(u).}
\]

Thus \(\overline H_M\) is naturally the coinvariant plane for the exchange action. This explains why the glue-derived Heisenberg carrier cannot restore the already falsified direct puncture/support equivariance: it has intentionally forgotten the oriented difference.

## 5. Collapse of the theta section

The two quartic theta lifts were

\[
\widetilde a=s-r,
\qquad
\widetilde b=t-r.
\]

But

\[
\pi_H(r)=0,
\qquad
\pi_H(s)=\pi_H(t)=(0,1).
\]

Hence

\[
\boxed{
\pi_H(s-r)
=\pi_H(t-r)
=(0,1).}
\]

The selected two-generator theta section has rank one in the glue parity quotient. The glue \(X\)-Lagrangian is therefore not the theta-section plane.

## 6. Independence of the quartic centre

The order-four orientation generator \(r\) satisfies

\[
\pi_H(r)=0.
\]

Therefore the quartic character

\[
\chi_r:G\to\mathbb Z_4
\]

cannot descend through \(\overline\pi_H\). Equivalently, the glue parity quotient alone cannot canonically supply the \(\mu_4\) centre of the order-64 Heisenberg group.

This confirms the boundary stated in the preceding document:

- the glue pairing canonically supplies the sign commutator;
- the fourth-root refinement remains an independent orientation line requiring an additional identification.

## 7. Revised interpretation of the two bits

The two glue bits should currently be read as

\[
\boxed{
\text{selector/color parity}
\quad\oplus\quad
\text{symmetric weak parity}.}
\]

They should not be called “the two puncture bits.” The oriented puncture difference lies in the kernel.

This may be physically useful: a Heisenberg carrier built from exchange coinvariants describes relational observables insensitive to which weak face was named first. Orientation then lives in the separate quartic line.

## 8. Consequences

### Established

- the glue parity map descends canonically through \(G=M/I\);
- it is surjective with kernel of order eight;
- it maps the color radical to the first bit;
- it identifies the two weak classes in the second bit;
- puncture exchange acts trivially;
- the two theta lifts collapse to one class;
- the quartic \(r\)-direction is killed.

### Falsified

- the glue parity plane is not the two-puncture logical plane;
- the two theta-section generators do not give its two independent axes;
- the old quartic character does not descend through the glue parity quotient.

### Open

- whether the first bit is physically color, selector orientation, or their shared arithmetic shadow;
- whether the second bit is a weak-pair occupancy observable;
- whether the opposite face restores the lost oriented difference as a dual character;
- how the independent \(\mu_4\) line couples to this coinvariant Heisenberg sector.

## 9. Stop-everything and falsification gates

### Stop-everything

1. A Furey/Jordan observable derives exactly the color-plus-symmetric-weak quotient.
2. The opposite face's dual character detects the killed weak difference.
3. The quartic orientation line couples canonically to the coinvariant Heisenberg group as its \(\mu_4\) centre.
4. A physical measurement distinguishes the coinvariant carrier from the oriented puncture plane.

### Boundaries

- equality of dimensions cannot identify the two binary planes;
- the glue quotient is not phase-isometric to the weak puncture quotient;
- trivial exchange action is structural, not an accidental basis choice;
- restoring orientation requires data outside this parity quotient.

## Certificate and companions

- [Glue parity versus old support/theta certificate](scripts/compare_glue_parity_quotient_with_old_support_and_theta_section.mjs)
- [Glue-derived Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
- [Field-labelled support map](528_the_field_labelled_two_torsion_map_stops_at_two_intertwiners_and_needs_a_theta_extension.md)
- [Quartic theta section](537_the_binary_theta_phase_is_the_quartic_character_pulled_back_along_a_nonsplit_quadratic_section.md)
