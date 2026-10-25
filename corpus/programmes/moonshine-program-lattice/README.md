# Moonshine as program, lattice formula and constrained carrier

**Date:** 25 October 2026

**Status:** scalar genus-one and arithmetic orientation bridges closed exactly; direct Rule-60/Monster identification ruled out; class-sensitive defect and genus-two completion remain open

**Evidence:** [machine-readable bridge ledger](../../../evidence/data/moonshine-program-lattice-bridge-v1.json)
**Certificate:** [exact bridge verifier](../../../verification/verify/verify_moonshine_program_lattice_bridge.mjs)

**Joined map:** [the order-46 junction and admissibility ladder](joined-bridge-map.md)
**Joined certificate:** [cross-branch verifier](../../../verification/verify/verify_moonshine_joined_bridge_map.mjs)

## Result

The Monster branch does contain a mathematically defensible sense in which a
program is encoded by a lattice-like formula, but four meanings of “program”
must be separated.  The cyclic Golay Rule-60 map is an actual finite update
rule; the Moonshine vertex operator algebra is a compositional algebra of
states and fields; McKay--Thompson traces are graded observable outputs; and
Borcherds denominator/Hecke identities are generative integrity laws.  Two
exact links sharpen this architecture. First, the Lorentzian root-grading
lattice \(II_{1,1}\) of the Monster Lie algebra is precisely the diagonal
integral split plane inside the corpus carrier \(H_2(\mathbb R)\). Second, on
the eleven-dimensional Rule-60 Golay image,

\[
(1+\sigma)^{89}=\sigma^2.
\]

Thus the complete order-\(23\) component of the update is already the genuine
cyclic symmetry, while the residual order-(89) component prevents the full
Rule-60 map from being a Monster element.  The order-(23) lift can now be
completed at scalar genus one.  Its Leech fixed lattice has Gram matrix
\(\left(\begin{smallmatrix}4&1\\1&6\end{smallmatrix}\right)\), and

\[
\frac{\Theta_{\Lambda^\sigma}(\tau)}
     {\eta(\tau)\eta(23\tau)}-1
=T_{23A}(\tau)=T_{23B}(\tau).
\]

The strongest live route is therefore no longer “find a numerical
coincidence.” It is: retain the orientation/class datum erased by this scalar
identity, keep Rule 60 as the group-algebra operator \(1+\sigma\), and ask
whether twisted or genus-two sewing supplies both the missing oriented rail
and the off-diagonal Jordan/seam coordinate.

## 1. The exact compiler chain

The established mathematical chain is

```text
extended Golay code
        ↓ Construction A / Leech construction
Leech lattice Λ
        ↓ lattice vertex operator algebra
V_Λ
        ↓ orbifold plus twisted sector
Moonshine module V^natural
        ↓ graded Monster traces
McKay–Thompson functions T_g
        ↓ denominator / Hecke identities
Monster Lie algebra and replication constraints
```

The orbifold step matters.  The Leech automorphism group is Conway symmetry;
the Monster is the automorphism group of the enriched Moonshine VOA, not of
the bare Leech lattice.  The twisted sector is therefore part of the proposed
compiler, not decorative bookkeeping.

For \(g\in\mathbb M\), the output is

\[
T_g(\tau)
=\operatorname{Tr}_{V^\natural}
  \left(gq^{L_0-1}\right).
\]

For the identity,

\[
T_1(\tau)=J(\tau)
=q^{-1}+196884q+21493760q^2+\cdots.
\]

This is a trace/checksum of the graded state space.  It is not the state space,
the vertex operation or an update law by itself.

## 2. The lattice formula is literal

Write

\[
J(q)=\sum_{n\in\mathbb Z}c(n)q^n.
\]

Borcherds' Monster denominator identity is

\[
p^{-1}
\prod_{\substack{m>0\\n\in\mathbb Z}}
(1-p^m q^n)^{c(mn)}
=j(p)-j(q).
\]

The indices \((m,n)\) are not an analogy to a lattice: they grade the Monster
Lie algebra by the even unimodular Lorentzian plane \(II_{1,1}\), and the
coefficient \(c(mn)\) is the root multiplicity. Taking the logarithm turns the
infinite product into sums involving Hecke operators.  In this precise sense,
the spectrum supplies instructions for constructing an infinite-dimensional
root algebra, while the denominator identity checks the construction globally.

It is best described as a **generative consistency program**, not as temporal
execution.  It recursively constrains coefficients and multiplication data;
it does not select a clock, initial condition or realized history.

## 3. New exact bridge: the Monster grading plane is a Jordan frame plane

Embed the Monster grading lattice by

\[
\iota:\mathbb Z^2\longrightarrow H_2(\mathbb Z),
\qquad
\iota(m,n)=
\begin{pmatrix}m&0\\0&n\end{pmatrix}.
\]

Then

\[
\det\iota(m,n)=mn,
\]

and polarisation gives

\[
B((m,n),(r,s))=ms+nr,
\qquad
[B]=
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

This is the integral hyperbolic plane \(U\cong II_{1,1}\). The nontrivial
Monster-Lie Weyl operation exchanging \(p\) and \(q\) becomes exchange of the
two primitive diagonal idempotents of the Jordan frame.

The relationship can therefore be drawn exactly as

\[
\boxed{
II_{1,1}
\cong
\left\{
\begin{pmatrix}m&0\\0&n\end{pmatrix}:m,n\in\mathbb Z
\right\}
\subset H_2(\mathbb R),
}
\]

followed by

\[
\operatorname{Conf}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

This is stronger than a shared-dimension observation and weaker than a shared
group action.  Moonshine occupies the two-rail diagonal grading plane.  The
third, off-diagonal Jordan coordinate is the relation/seam coordinate.  No
Monster action on the full cone and no physical source for that third
coordinate follows from the embedding.

## 4. New exact bridge: Rule 60 splits into a Monster-compatible part and a residue

On the cyclic binary Golay code \(G_{23}\), let

\[
T=1+\sigma,
\]

where \(\sigma\) is cyclic shift. The existing corpus calculation gives

\[
\ker T=\{0,\mathbf1\},
\qquad
\dim\operatorname{im}T=11,
\qquad
\operatorname{ord}(T|_{\operatorname{im}T})=2047=23\cdot89.
\]

The new exhaustive finite calculation gives

\[
\boxed{T^{89}=\sigma^2\quad\text{on }\operatorname{im}T.}
\]

The cyclic-code factorisation controlling the image is

\[
x^{23}+1
=(x+1)
(x^{11}+x^9+x^7+x^6+x^5+x+1)
(x^{11}+x^{10}+x^6+x^5+x^4+x^2+1).
\]

Replacing \(x\) by \(y+1\) gives the Rule-60 minimal polynomial

\[
y^{11}+y^9+y^6+y^5+y^4+y^3+1,
\]

which is primitive and accounts for the order \(2^{11}-1=2047\).

This resolves the direct-identification question:

- \(T\) is noninvertible on \(G_{23}\), so it is not a group action there;
- its invertible image action has order divisible by \(89\);
- \(89\) does not divide the Monster order;
- hence \(T|_{\operatorname{im}T}\) cannot be a represented Monster group
  element;
- the order-\(23\) shift \(\sigma\), rather than \(T\), is the legitimate
  symmetry candidate;
- Rule 60 survives as the derived group-algebra operation \(1+\sigma\).

The order-(89) factor is not useless noise.  It is an exact **quotient scar**:
the update law contains information not retained by the finite sporadic
symmetry.  A successful bridge must explain whether that information is erased,
measured, or represented by a non-group endomorphism.

## 4.5 The order-23 lift closes, and exposes an orientation gate

An order-(23) coordinate cycle has Leech frame shape \(1^1 23^1\).  The two
order-(23) conjugacy classes in \(O(\Lambda)\) generate conjugate cyclic
subgroups, and both fix the same rank-two lattice type

\[
G_{23}=\begin{pmatrix}4&1\\1&6\end{pmatrix},
\qquad \det G_{23}=23.
\]

Writing a lattice vector as \((a,b)\), the exponent in its theta series is

\[
Q_+(a,b)=\frac12(a,b)G_{23}(a,b)^t
=2a^2+ab+3b^2.
\]

The oscillator determinant for frame shape \(1^1 23^1\) is
\(\eta(\tau)\eta(23\tau)\).  Kondo--Tasaka's fixed-sublattice theorem places
the resulting quotient on the genus-zero group \(23+\), while the corpus
certificate independently expands both sides and verifies through \(q^{30}\)
that

\[
\boxed{
\frac{\Theta_{Q_+}(\tau)}{\eta(\tau)\eta(23\tau)}
=T_{23}(\tau)+1.
}
\]

The constant is not arbitrary: the frame has one invariant oscillator at
weight one, whereas \(V^\natural_1=0\).  Removing that one state gives the
normalized common Monster series.  Thus the chosen Golay cycle already
generates the positive-degree \(23A/23B\) state counts after its Leech lift.
The orbifold remains essential to the object \(V^\natural\), but a new twisted
sector is not needed merely to reproduce these scalar coefficients.

The determinant \(23\) reveals a finer arithmetic structure.  The reduced
positive binary quadratic forms of discriminant \(-23\) are exactly

\[
[1,1,6],\qquad [2,1,3],\qquad [2,-1,3].
\]

They form a class group \(C_3\).  The first form is principal; the last two
are the inverse nonprincipal classes.  The Leech fixed form is one of this
pair.  Orientation reversal exchanges the pair, so they are distinct under
proper \(SL_2(\mathbb Z)\) equivalence but have the same ordinary theta series.
Moreover the exceptional weight-one identity

\[
\Theta_{[1,1,6]}-\Theta_{[2,1,3]}
=2\eta(\tau)\eta(23\tau)
\]

is exact; it is checked in the certificate through \(q^{40}\).  The two
Frobenius rails, the two order-(23) classes and the inverse nonprincipal form
classes therefore share the same **two-oriented-objects / one-scalar-output**
shape.  This is not yet a canonical identification among all three pairs.
It is a precise explanation of what any proposed identification must retain:
orientation.  A scalar theta or McKay--Thompson trace cannot do so.

### The discriminant-23 compiler

The links above are governed by one exact arithmetic object.  The first
Frobenius orbit is the set of nonzero quadratic residues modulo \(23\); the
other is the set of nonresidues. If \(\zeta=\exp(2\pi i/23)\), define their
Gaussian periods

\[
\alpha=\sum_{r\in QR}\zeta^r,
\qquad
\bar\alpha=\sum_{n\in QNR}\zeta^n.
\]

Direct cyclotomic reduction gives

\[
\alpha+\bar\alpha=-1,
\qquad
\alpha\bar\alpha=6,
\qquad
\alpha^2+\alpha+6=0.
\]

Hence

\[
\alpha=\frac{-1+\sqrt{-23}}2,
\qquad
\mathbb Z[\alpha]=\mathcal O_{\mathbb Q(\sqrt{-23})}.
\]

The Leech fixed form is then not merely another determinant-(23) object.  If
\(I=(2,\alpha)\) is the norm-two nonprincipal ideal, then

\[
\frac{N(2a-b\alpha)}{N(I)}
=2a^2+ab+3b^2=Q_+(a,b).
\]

This supplies a literal compilation path:

```text
Golay cyclic factor over F_2
  -> quadratic-residue/nonresidue Fourier rails
  -> Gaussian periods in Q(sqrt(-23))
  -> inverse nonprincipal ideal classes
  -> order-23 Leech fixed lattice
  -> theta/eta quotient
  -> common Monster 23A/23B Hauptmodul
```

Every arrow through the scalar Hauptmodul is now explicit.  The unresolved
arrow can be narrowed further.  The two degree-eleven factors are the two
primes above \(2\) in \(\mathbb Q(\zeta_{23})\).  Reducing the declared
quadratic-residue Gaussian period \(\alpha\) modulo them gives, respectively,

\[
\alpha\equiv0,qquad \alpha\equiv1.
\]

Their contractions to \(\mathbb Q(\sqrt{-23})\) are therefore exactly

\[
(2,\alpha),\qquad(2,\alpha+1),
\]

the two conjugate norm-two nonprincipal ideals.  So the finite-field-factor to
oriented-ideal-class arrow is canonical once \(\zeta_{23}\) and the
quadratic-residue period are declared; it is no longer merely a resemblance
between two pairs.  Multiplication by \(5\), a quadratic nonresidue modulo
\(23\), exchanges these rails and the Monster classes.  What remains
noncanonical is the final VOA naming choice: which lifted generator is called
\(23A\) rather than \(23B\).

That last choice is conventional in a precise sense.  The Sylow-23 normalizer
acts on generators through the order-11 subgroup of squares in
\(\mathbb F_{23}^{\times}\), producing the quadratic-residue and nonresidue
orbits.  Since \(-1\) is a nonresidue modulo \(23\), inversion exchanges the
two Monster classes.  Thus \(23A\) versus \(23B\) is not an invariant of the
unoriented cyclic subgroup; it becomes meaningful only after choosing a
generator.  A defect character can preserve that choice, but no construction
can derive an absolute A/B name without first declaring an orientation
convention.

This also explains the otherwise stray prime \(89\).  On either characteristic
two residue rail, \(1+\zeta_{23}\) becomes an element of
\(\mathbb F_{2^{11}}^\times\); for the Rule-60 factor it is primitive and hence
has order \(2^{11}-1=2047=23\cdot89\).  The order-89 component is a
residue-field property of the cyclotomic unit, not a missing Monster prime.

### Current frontier: the order-23 defect channel exists

A September 2026 preprint sharpens the surviving route substantially.  For
every Fricke non-anomalous Monster element \(g\) of order \(N\), Volpato proves
that \(V^\natural\) is self-orbifold under \(\langle g\rangle\), that the
parafermion algebra

\[
P(N)=\frac{su(2)_N}{u(1)}
\]

embeds in the fixed-point VOA, and that a non-invertible duality defect extends
the cyclic symmetry to a Tambara--Yamagami category.  The list explicitly
contains \(23AB\), so at \(N=23\) this is a theorem of the preprint, not a
corpus extrapolation.

The fixed-point VOA has \(23^2\) irreducible modules

\[
V_{a,b},\qquad (a,b)\in\mathbb Z_{23}^2,
\qquad
h_{a,b}\equiv\frac{ab}{23}\pmod1.
\]

This finite quadratic module is exactly the discriminant form of the scaled
hyperbolic lattice \(U(23)\): if \(e\cdot f=23\), then the dual class
\((ae+bf)/23\) has half-norm \(ab/23\). The Monster Lie algebra's
\(II_{1,1}\) grading plane has therefore reappeared as the finite
twist--charge phase space of the order-(23) orbifold.

The modular quarter-turn and the self-duality operation are now concrete:

\[
S:(a,b)\mapsto(b,-a),\qquad S^2=-I,\qquad S^4=I,
\]

while the duality-defect involution exchanges the rails
\(V_{a,b}\leftrightarrow V_{b,a}\). Its Fourier kernel is the nondegenerate
bicharacter

\[
\chi(g^a,g^k)=e^{2\pi iak/23}.
\]

This is the closest rigorous object in the branch to the corpus's “Wick-like
quarter turn”: a discrete Fourier rotation exchanging twist and charge, not
an analytic continuation of physical time.  The noninvertible defect has
quantum dimension \(\sqrt{23}\), because its square is the sum of the \(23\)
invertible cyclic defects.

The orientation exchange and quarter-turn themselves close into a small exact
transition algebra.  On \(A=\mathbb F_{23}^2\), define

\[
D_5(a,b)=(5a,5^{-1}b),\qquad S(a,b)=(b,-a).
\]

Here \(5^{-1}=14\), and \(5\) has order \(22\).  The first map preserves
\(ab/23\) and exchanges residue with nonresidue on each nonzero rail.  Together
the maps satisfy

\[
D_5^{22}=1,qquad S^2=D_5^{11}=-I,qquad
SD_5S^{-1}=D_5^{-1}.
\]

They therefore generate the dicyclic group \(\mathrm{Dic}_{11}\) of order
\(44\) inside \(SL(2,23)\).  The certificate enumerates all 44 transformations.
This is a literal finite reversible “instruction set”: scale/exchange the
oriented rails, or quarter-turn twist into charge.  It is not yet physical
dynamics—there is no energy, clock, locality or detector map—and it is not a
continuous Monster-to-\(Spin(2,3)\) homomorphism.

The full label plane remembers the central sign.  If nonzero labels are instead
projectivized by \((a,b)\sim\lambda(a,b)\), the 528 labels become the 24
directions of \(\mathbb P^1(\mathbb F_{23})\), \(-I\) becomes invisible and
\(\mathrm{Dic}_{11}\) descends to the dihedral group \(D_{11}\) of order 22.
Its direction action has two orbits: the two pure axes \([1:0],[0:1]\), and
all 22 mixed directions \([1:r]\) with \(r\ne0\).  This gives an exact
open/closed distinction: keeping the sign yields the dicyclic lift; quotienting
it yields the dihedral shadow.  It also shows precisely what a scalar or
projective record cannot later reconstruct.

There is nevertheless an exact, correctly typed Spin adjacency.  Since

\[
SL(2,23)=Sp(2,23)\hookrightarrow Sp(4,23)\cong Spin(5,23),
\]

the transition skeleton embeds as a rank-one symplectic block in the finite
Chevalley group of the same \(C_2/B_2\) type as
\(Sp(4,\mathbb R)\cong Spin_0(2,3)\).  This is an arithmetic reduction/lift
problem, not an identification of real forms: reduction modulo \(23\) forgets
the real signature, causal cone and time orientation.  A lift to the physical
carrier would still have to choose and justify all three.

There is no order-\(23\) anomaly obstruction. The Moonshine anomaly has exact
order \(24\); its restriction to \(C_{23}\) must have order dividing both
\(24\) and the exponent \(23\) of \(H^3(C_{23},U(1))\), hence is zero. The
remaining gaps are consequently constructive rather than cohomological:
identify the corpus cycle with a declared \(23AB\) generator at the oriented
level, calculate the relevant twisted--twining/defect characters, and sew the
channel at genus two.

### A genus-one no-go and the parafermionic escape

The most obvious attempt to recover the missing orientation is already ruled
out exactly.  Let \(g\) have order \(23\), and Fourier-project the untwisted
sector to charge \(b\):

\[
C_b(\tau)=\frac1{23}\sum_{k=0}^{22}
e^{-2\pi i kb/23}T_{1,g^k}(\tau).
\]

Every nonidentity power belongs to \(23A\) or \(23B\), and their scalar
McKay--Thompson series coincide.  Therefore

\[
C_0=\frac{J+22T_{23}}{23},\qquad
C_b=\frac{J-T_{23}}{23}\quad(b\ne0).
\]

The certificate gives

\[
C_0=q^{-1}+8564q+934518q^2+\cdots,
\qquad
C_{b\ne0}=8560q+934511q^2+\cdots.
\]

Thus the ordinary genus-one charge decomposition sees “neutral versus
charged,” but identifies all twenty-two nonzero charges.  It cannot select an
oriented Golay rail or distinguish \(23A\) from \(23B\).  Any successful
observable must use cross-grade VOA/defect composition, an externally marked
orientation, or sewing.

Honda--Kaidi--Orii provide the adjacent refinement. Under a stronger
parafermionic decomposition assumption they obtain
\(\operatorname{Rep}(\mathfrak{so}(3)_p)\) defect symmetry and prove that each
nontrivial defect McKay--Thompson series has invariance group
\(\Gamma_1(p+2)\).  At \(p=23\), the exact bookkeeping is

\[
c_{P(23)}=\frac{44}{25},\qquad
c_{\mathrm{Com}}=24-\frac{44}{25}=\frac{556}{25},
\qquad \operatorname{rank}\operatorname{Rep}(\mathfrak{so}(3)_{23})=12.
\]

The conditional invariance group is \(\Gamma_1(25)\), and the modular curve
\(X_1(25)\) has genus exactly \(12\).  This is conceptually important: the first sufficiently refined output
is not expected to be another genus-zero Hauptmodul.  Genus zero is a property
of the compressed scalar moonshine output, while the proposed class-sensitive
program channel naturally leaves it.  The equality between this genus and the
rank \(12\) of \(\operatorname{Rep}(\mathfrak{so}(3)_{23})\) is exact but, at
present, only numerical: genus counts holomorphic differentials on the modular
curve, while rank counts simple defect types.  No map identifying those two
sets has been derived.

There is, however, a second typed reason for the nearby count twelve.  The 22
nonidentity powers of a chosen order-23 generator form 11 inverse pairs
\(\{g^k,g^{-k}\}\), and fifth power cycles all eleven; adjoining the identity
gives \(1+11=12\).  The certificate verifies this orbit.  It does not identify
those generator pairs with the twelve defect objects: that bijection, if it
exists, must be constructed rather than inferred from the count.

The verifier extends this comparison over every odd prime divisor of the
Monster order.  In that finite set, \(p=23\) is the unique solution of

\[
g\bigl(X_1(p+2)\bigr)=\frac{p+1}{2}.
\]

For \(p=3,5,7,11,13,17,19\) the genus is smaller than the defect rank; for
\(p=29,31,41,47,59,71\) it is larger.  This makes \(23\) a legitimate
signpost for further work, but not evidence of a correspondence: no source
maps the twelve simple defect types to the twelve holomorphic differentials.

Volpato supplies the constructive algorithm without tabulating the \(p=23\)
defect series: Fourier-transform the twisted--twining functions
\(T_{g^a,g^k}\) to the module characters \(\widetilde T_{a,b}\), invert the
\(su(2)_{23}\) character decomposition to obtain the commutant characters
\(f_{[l,t]}\), and insert \(f_{[l,0]}\) into the duality-defect trace.

The modular-orbit audit now corrects an overstatement in the earlier frontier.
The 529 entries are not 529 independent missing functions.  For prime order
23, reduction modulo 23 makes all 528 nonzero pairs one
\(SL_2(\mathbb F_{23})\) orbit.  The exact label stabilizer gives index 528,
but the scalar \(T_{23}\) is invariant under the larger
\(\Gamma_0(23)\) stabilizer.  Its modular orbit therefore has only

\[
[SL_2(\mathbb Z):\Gamma_0(23)]=24
\]

branches, indexed by \(\mathbb P^1(\mathbb F_{23})\), with each branch shared
by 22 nonzero scalar multiples of a label.  Once Volpato's convention
\(h(V_{a,b})=ab/23\pmod{\mathbb Z}\) fixes the twisted-sector lift, modular
covariance gives a functional prescription: choose a modular matrix whose
bottom row is \((a,b)\bmod23\) and transport \(T_{23}\).  Thus the common
Hauptmodul determines the scalar modular branches, but it still does not name
the oriented generator: the 22-fold quotient is exactly where that datum was
erased.

Fricke invariance makes those branches explicit.  If \(a\ne0\) and
\(r=ba^{-1}\bmod23\), then in the fixed non-anomalous convention

\[
T_{g^a,g^b}(\tau)=T_{23}\!\left(\frac{\tau+r}{23}\right).
\]

Writing \(T_{23}=\sum_n c(n)q^n\), Volpato's finite Fourier projection is
therefore just a residue filter:

\[
\operatorname{ch}V_{a,b}
=\sum_{n\equiv ab\;(23)}c(n)q^{n/23},\qquad a\ne0.
\]

Together with the two untwisted neutral/charged characters, this reconstructs
all 529 module characters as 25 scalar character types.  The next gate is now
the defect assembly rather than the commutant inversion: the verifier now
executes Volpato's equation (2.33) and obtains the first three integral-grade
terms of all twelve required even-\(l\), \(t=0\) characters:

| \(l\) | verified character seed |
|---:|---|
| 0 | \(q^{-139/150}(1+1878q^2+150556q^3+\cdots)\) |
| 2 | \(q^{149/150}(3551+324584q+11288976q^2+\cdots)\) |
| 4 | \(q^{5/6}(2362+273654q+10649486q^2+\cdots)\) |
| 6 | \(q^{89/150}(698+131234q+6172744q^2+\cdots)\) |
| 8 | \(q^{41/150}(74+35960q+2309204q^2+\cdots)\) |
| 10 | \(q^{131/150}(4944+537726q+20325080q^2+\cdots)\) |
| 12 | \(q^{59/150}(214+69682q+3943190q^2+\cdots)\) |
| 14 | \(q^{5/6}(3801+442966q+17230152q^2+\cdots)\) |
| 16 | \(q^{29/150}(33+22764q+1600562q^2+\cdots)\) |
| 18 | \(q^{71/150}(274+68679q+3599952q^2+\cdots)\) |
| 20 | \(q^{101/150}(738+115520q+5085020q^2+\cdots)\) |
| 22 | \(q^{119/150}(792+98342q+3941684q^2+\cdots)\) |

The vacuum exponent \(-139/150=-c_{\mathrm{Com}}/24\) is an internal check,
and every displayed coefficient is positive.  Equations (2.52)--(2.54) can
then be assembled directly. Exact Gaussian-integer phase bookkeeping gives

\[
\frac{Z^{\mathcal N}_{23}(\tau)}{\sqrt{23}}
=q^{-1}+2+2446q+115834q^2+2446684q^3+33295322q^4+\cdots .
\]

All fractional powers and imaginary parts cancel. This scalar trace also
closes negatively as an orientation detector: the fifth-power map preserves
\(ab\), and every module character entering the construction depends only on
that product. The whole unrefined defect trace is therefore unchanged under
the 23A/23B orientation exchange.

The apparently open “additional commuting insertion” branch has also been
exhausted at scalar genus one. ATLAS gives
\(C_{\mathbb M}(g)\cong C_{23}\times S_4\). The five \(S_4\) conjugacy
classes produce product orders \(23,46,46,69,92\), and every pair
\(\langle g,k\rangle\) is cyclic because \(|k|\in\{1,2,3,4\}\) is coprime
to 23. Their product classes are respectively
\(23AB,46AB,46CD,69AB,92AB\); each A/B pair has the same ordinary
McKay--Thompson series. Hence every normalized scalar
\(Z(g,k;\tau)\) is a modular branch of an already orientation-blind cyclic
series. The finite proof and class census are recorded in the
[order-23 centralizer exhaustion](order-23-centralizer-exhaustion.md).
The transgressed projective cocycle is also trivial, so the five traces
determine the complete ordinary graded \(S_4\) module; scalar word traces add
nothing. The next task is therefore cross-grade VOA composition or genus-two
sewing. The oriented VOA lift and conditional dual-pair question remain
separate.

## 5. Four non-equivalent meanings of program

| meaning | mathematical object | present status |
|---|---|---|
| update program | \(T=1+\sigma\) on \(G_{23}\) | exact finite dynamics; not a Monster element |
| compositional program | VOA state-field map \(Y(a,z)b\), locality and sewing | established for Moonshine; no physical clock implied |
| observable program | \(T_g=\operatorname{Tr}(gq^{L_0-1})\) and generalized twisted traces | established modular output layer |
| generative verifier | Borcherds products and Hecke/replication identities | established recursive/global consistency layer |

The external “Monster Hecke VM” reviewed elsewhere in the corpus does not yet
add a fifth established layer.  Prime labels, saturating coordinate folds and
scalar maps are not Hecke operators unless an operator domain and Hecke or
modular-trace relations are verified.

## 6. Generalized moonshine is the closest established transition language

Ordinary moonshine assigns a trace to one symmetry insertion.  Generalized
moonshine assigns functions to commuting pairs, schematically

\[
Z(g,h;\tau)
=\operatorname{Tr}_{V_g}
\left(hq^{L_0-c/24}\right),
\qquad gh=hg,
\]

where \(V_g\) is a \(g\)-twisted sector. Modular transformations reorganize
the boundary-condition pair.  This is structurally closer to a typed program:

- \(g\) selects the state/twist sector;
- \(h\) is the compatible operation inserted in that sector;
- modular transport changes the presentation of the same sewn torus data;
- the trace is the observable record.

It still does not encode sequential real-time execution.  The pair labels
topological boundary conditions around two torus cycles, and modular covariance
is a consistency/equivalence law.

## 7. Genus two supplies the relational extension

The untwined genus-two Moonshine vacuum amplitude is not wholly unknown.
Published sewing work gives a weight-twelve Siegel modular numerator for every
self-dual \(c=24\) theory and an explicit Moonshine case with weight-one
dimension zero.  At this aggregate level, the genus-two answer is fixed by
genus-one factorisation data.

That strength is also a no-go for program recovery.  For meromorphic theories
with \(c\leq24\), genus-one data already determine the untwined vacuum
amplitudes through genus four; distinct theories can first separate only at
genus five.  Untwined genus-two data are therefore a powerful checksum but a
lossy one: they cannot by themselves recover the vertex operation, the
orientation of the order-(23) rail or a real-time update rule.  Twining,
defects or inserted correlators are required to expose those distinctions.

That corrects the overly broad phrase “full genus-two Monster data are
missing.”  What remains missing for this programme is narrower and more
important:

1. Monster-**twined** genus-two amplitudes tied to the order-(23) Golay/Leech
   lift;
2. the complete genus-two spin-sector amplitudes of the fermionic Baby-Monster
   factor in the \(2A\) fermionization;
3. their multiplier/anomaly line and common-phase-invariant ratios;
4. an intertwiner or defect junction between the \(2A\) fermionic branch and
   the distinct \(2B\)/Leech branch;
5. a derived map from sewing data to the off-diagonal physical Jordan response.

The genus-two period matrix

\[
\Omega=
\begin{pmatrix}\tau_1&\epsilon\\\epsilon&\tau_2\end{pmatrix}
\]

makes the geometry visible.  The two diagonal entries are the two rails; the
sewing coordinate \(\epsilon\) is the relationship. But the canonical map
\(\Omega\mapsto\operatorname{Im}\Omega\) does not turn the separating divisor
\(\epsilon=0\) into the rank-one Jordan boundary. The shared matrix shape does
not complete the physical identification.

## 8. Exhaustive route assessment

| route | verdict | promotion datum |
|---|---|---|
| Monster as a continuous \(\operatorname{Spin}(2,3)\) subgroup or quotient | ruled out | impossible for a nontrivial continuous map into a finite discrete group |
| Rule 60 itself as a Monster element | ruled out | contradicted by its kernel and order-(89) factor |
| cyclic shift \(\sigma\) as the finite bridge | scalar genus-one bridge established | retain the oriented lift/class datum erased by the common trace |
| Rule 60 as a polynomial in a lifted symmetry | live and correctly typed | show how \(1+\sigma\) acts on a declared module and what its order-\(89\) residue means |
| Borcherds product as lattice program | established mathematically | physical promotion requires a clock/action/observable dictionary |
| generalized moonshine as typed transition language | established mathematically | physical promotion requires a carrier interpretation for twisted sectors and modular transport |
| \(II_{1,1}\) as a slice of \(H_2(\mathbb R)\) | established kinematically | derive the off-diagonal coordinate and an action on the full carrier |
| order-(23) finite twist--charge plane | established in current preprint | compute class-sensitive vector-valued defect characters and a corpus-cycle intertwiner |
| \(P(23)\) parafermion and duality defect | established in current preprint | determine whether its oriented data couple to the corpus seam and survive genus-two sewing |
| \(\mathrm{Dic}_{11}<SL(2,23)<Sp(4,23)\) transition skeleton | exact finite arithmetic bridge | a real \(Spin_0(2,3)\) lift must independently recover signature, cone and time orientation |
| untwisted order-\(23\) charge projection | ruled out as an orientation detector | all nonzero charges have \((J-T_{23})/23\); twisted or defect input is necessary |
| \(\operatorname{Rep}(\mathfrak{so}(3)_{23})\) defect McKay series | conditional construction; 12 lines and expected \(\Gamma_1(25)\) invariance | explicit \(p=23\) decomposition/characters; genus 12 precludes a Hauptmodul shortcut, while the rank/genus equality remains unexplained |
| untwined genus-two Monster partition function | published aggregate | insufficient to identify the underlying program or seam |
| full order-23 scalar centralizer insertion | ruled out as an orientation detector | \(C_M(g)/\langle g\rangle\cong S_4\), but all five insertion classes reduce to scalar-degenerate cyclic products of orders 23, 46, 46, 69 and 92 |
| twined genus-two order-(23) bridge | open | construct the sewn twined amplitude and check factorisation/multipliers |
| \(2A\) fermionization as seam carrier | exact type match | Baby-Monster genus-two multipliers and a \(2A\)-\(2B\) junction |
| Moonshine coefficients as real-time populations or species | rejected without new map | Hamiltonian, measure, normalization and detector law |
| AdS3 Monster gravity adjacency | conditional benchmark | consistent bulk spectrum/factorization; no automatic AdS4 or \(\operatorname{Spin}(2,3)\) lift |

## 9. No-experiment calculation queue

The remaining work should be attempted in this order:

1. **Oriented VOA observable.**  The Golay-factor to oriented-ideal-class map
   is closed relative to \(\zeta_{23}\), and A/B naming is recognized as a
   generator convention. Determine whether a defect character retains this
   declared orientation; the common scalar trace provably cannot.
2. **Vector-valued defect-character extraction.**  The scalar commutant and
   duality-defect traces, including every scalar insertion from the full
   \(C_{23}\times S_4\) centralizer, are now exhausted. Compute the projective
   \(S_4\) action on the twisted multiplicity spaces and compare the 23A/23B
   rational forms under fifth-power Galois transport.
3. **Rule-60 spectral transform.** Compare the \(\sigma\)-eigenvalue data with
   the transformed eigenvalues \(1+\zeta_{23}^k\). Determine whether the
   order-\(89\) component acts on any natural multiplicity, defect or quotient
   module rather than inventing a physical meaning for it.

### The two order-23 rails

The two degree-eleven factors displayed above are reciprocal.  Their roots are
indexed by the two Frobenius orbits generated by multiplication by \(2\) on
the nonzero residues modulo \(23\):

\[
\{1,2,4,8,16,9,18,13,3,6,12\}
\]

and its complementary orbit. Multiplication by \(5\) exchanges the two
orbits because \(5^{11}\equiv-1\pmod{23}\). Independently, the Monster classes
\(23A\) and \(23B\) are exchanged by fifth power and have the same scalar
McKay--Thompson series,

\[
T_{23A}=T_{23B}
=q^{-1}+4q+7q^2+13q^3+19q^4+\cdots.
\]

The certificate independently expands the eta-product presentation

\[
F(\tau)=
\frac{\eta(\tau)\eta(23\tau)}
     {\eta(2\tau)\eta(46\tau)},
\qquad
T_{23}=\frac{(F+1)(F^2+4)}{F^2},
\]

and verifies the second Faber/replication identity through \(q^{15}\).
This is an actual generative check: the coefficients satisfy the Hecke-style
recursion required of the order-(23) Moonshine output.  The fixed-lattice
theta calculation above now proves that the corpus's cycle produces this
scalar output after normalization.

This is a coherent class-pairing pattern, not yet an identification of the
Golay factor with either Monster class.  It also supplies a useful no-go: the
genus-one scalar trace forgets which rail was chosen.  A class-sensitive bridge
must retain the lift itself or use twisted, defect, vector-valued or higher-genus
data.
4. **Twined genus-two sewing.**  Sew the order-(23) insertion through both
   handles and test factorisation to the genus-one trace.
5. **Fermionic completion.**  Construct or locate the Baby-Monster spin family,
   combine it with the verified free-Majorana relative phase, and compare its
   determinant/anomaly line with \(\chi_5\).
6. **Off-diagonal completion.**  Determine whether a twined sewing coordinate,
   defect junction or Pfaffian line supplies the third \(H_2(\mathbb R)\)
   coordinate with the correct zero locus and transport law.

## 10. Novelty boundary

The word **new** in this packet means new to this corpus investigation. The
diagonal embedding is elementary once the two quadratic forms are written
beside one another, and the Moonshine, Golay and modular ingredients are
established mathematics. No priority or research-novelty claim is made here.

## 11. Exhaustion boundary

The currently named ingredients support no additional logically distinct
bridge.  Every route is one of:

1. a finite group action;
2. a group-algebra update;
3. a graded trace;
4. a vertex/sewing composition law;
5. a Hecke or denominator recursion;
6. a lattice/Jordan embedding;
7. a worldsheet-to-physical dynamics map.

Routes 1--6 are either established, narrowed to the order-(23) and genus-two
calculations above, or ruled out.  Route 7 remains a new physical construction.
The scalar order-(23) lift/twining and the untwisted charge-resolution test are
now completed.  The latter is a no-go: it proves that no rearrangement of the
common genus-one scalar trace can recover orientation.  The remaining branch
is narrowed to three source objects: cross-grade order-23 VOA
intertwining/fusion data, a twined genus-two sewing construction, and a
junction to the \(2A\) fermionic seam.
Without one of those inputs, further scalar coefficient work is repetition
rather than progress.  Beyond them, a physical
promotion still requires a carrier action, clock and detector law.

## Sources and corpus links

- Borcherds, [*Monstrous moonshine and monstrous Lie superalgebras*](https://math.berkeley.edu/~reb/papers/monster/monster.pdf)
- Conway and Norton, [*Monstrous Moonshine*](https://doi.org/10.1112/blms/11.3.308)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Carnahan, [*Generalized Moonshine I: Genus-zero functions*](https://arxiv.org/abs/0812.3440)
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- Carnahan, [*51 constructions of the Moonshine module*](https://arxiv.org/abs/1707.02954)
- Höhn and Mason, [*The 290 fixed-point sublattices of the Leech lattice*](https://arxiv.org/abs/1505.06420)
- Kondo and Tasaka, [*The theta functions of sublattices of the Leech lattice*](https://doi.org/10.1017/S0027763000000374)
- Akbary and Totani, [*Binary quadratic forms of odd class number*](https://arxiv.org/abs/2408.00184)
- Johnson-Freyd, [*The Moonshine Anomaly*](https://arxiv.org/abs/1707.08388)
- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043)
- Honda, Kaidi and Orii, [*Parafermionizing the Monster*](https://arxiv.org/abs/2605.10902)
- Tuite, [*Genus Two Meromorphic Conformal Field Theory*](https://arxiv.org/abs/math/9910136)
- Gaberdiel and Volpato, [*Higher genus partition functions of meromorphic conformal field theories*](https://arxiv.org/abs/0903.4107)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Existing lattice-subroutine programme](../lattice-subroutine-gravity/README.md)
- [Monster fermionization bridge](../lattice-subroutine-gravity/monster-fermionization-bridge.md)
- [Rule-60/Golay seam torsor](../../claims/1700-1799/1793_the_rule60_golay_kernel_supplies_the_unique_tm23_leech_affine_seam_torsor.md)
- [Connected/discrete symmetry separation](../../claims/0100-0199/138_connected_continuous_vs_arithmetic_symmetry_separation.md)
- [Leech pair-Gram bridge](../../claims/1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)
- [Hecke/commutant audit](../frontier/wave-7/frontier_wave7_36_hecke_commutant_and_spin23_corner_bridge.md)
- [Order-23 centralizer exhaustion](order-23-centralizer-exhaustion.md)
