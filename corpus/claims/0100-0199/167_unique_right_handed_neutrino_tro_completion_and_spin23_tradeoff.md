# A Unique Right-Handed-Neutrino TRO Completion—and Its Spin(2,3) Tradeoff

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact finite-dimensional ternary-closure theorem for canonical gauge-singlet block additions; physical neutrino interpretation remains conditional

## 1. The missing sixteenth state

The 2016 Furey minimal-ideal pair has the post-Higgs representation content of a sixteen-state generation including two neutral singlets. The cyclically selected 2026 matter TRO has complex dimension fifteen:

\[
\mathcal M_{15}
=Q\oplus u^c\oplus d^c\oplus L\oplus e^c.
\]

Under \(SU(3)_c\times U(1)_{em}\), their charged sectors match exactly. The difference is one neutral singlet:

\[
\mathcal I_{16}|_{SU(3)\times U(1)_{em}}
\cong
\mathcal M_{15}|_{SU(3)\times U(1)_{em}}
\oplus\mathbf1_0.
\]

At this level an intertwiner exists, but it is not unique because the older ideal pair contains two neutral singlets while \(\mathcal M_{15}\) contains one. The complex dimension of the intertwiner space is

\[
6+2=8:
\]

one scalar for each of six charged irreducible types and a two-component choice for the neutral embedding.

Ternary closure removes this ambiguity in an unexpected way.

## 2. Relational notation

For either surviving topology, write

\[
D=\text{target of }d^c,
\qquad
E=\text{target of }e^c=\text{source of }L,
\qquad
\{D,E\}=\{O_1,R\}.
\]

The matter arrows are

\[
H\xrightarrow{Q}O_2,
\quad
O_2\xrightarrow{u^c}C,
\quad
O_2\xrightarrow{d^c}D,
\quad
E\xrightarrow{L}H,
\quad
C\xrightarrow{e^c}E.
\]

The block \(D\) was previously the one-dimensional right annihilator of the matter TRO.

## 3. Seven canonical neutral-singlet additions

The five-block carrier contains seven canonical gauge-singlet directions:

\[
p_{O_1},\ p_{O_2},\ p_H,\ p_C,\ p_R,
\quad O_1\to R,\quad R\to O_1,
\]

where \(p_{O_2}\) and \(p_H\) denote the scalar identities in those matrix blocks.

For the representative survivor \((D,E)=(O_1,R)\), adjoin each direction separately and compute the ternary closure

\[
\operatorname{TRO}(M+\mathbb Cx)
=\operatorname{span}\{xy^\dagger z\}.
\]

The exact dimensions are

\[
\begin{array}{c|ccccccc}
x&p_{O_1}&p_{O_2}&p_H&p_C&p_R&O_1\to R&R\to O_1\\ \hline
\dim\operatorname{TRO}(M+\mathbb Cx)
&17&28&22&20&18&16&23.
\end{array}
\]

Thus exactly one canonical addition remains a one-dimensional extension:

\[
\boxed{
\nu^c:D\longrightarrow E.
}
\]

The exchanged survivor gives the exchanged arrow \(R\to O_1\), again relationally \(D\to E\). The reverse relational orientation \(E\to D\) expands the TRO to dimension 23.

## 4. Why the arrow is a right-handed-neutrino candidate

The new block is an \(SU(3)\times SU(2)\times U(1)\) singlet. In all-left-handed notation this is the representation of \(\nu^c\). More importantly, it closes the previously missing cyclic neutrino Yukawa triangle.

The down-associated positive-hypercharge Higgs block is

\[
h_D:H\to D.
\]

Together,

\[
H\xrightarrow{h_D}D
\xrightarrow{\nu^c}E
\xrightarrow{L}H
\]

has a nonzero cyclic trace. Hence the same endpoint data that selected the charged Yukawa topology also supplies

\[
L\,\nu^c\,h_D.
\]

This is much stronger than adding an arbitrary sterile singlet by dimension counting.

## 5. The walk coin becomes square

Before the extension, the charged Higgs coin mapped

\[
V_R\simeq\mathbb C^7
\longrightarrow
V_L\simeq\mathbb C^8
\]

and left \(\nu_L\) unmatched. Adding the conjugate of \(\nu^c\) to the conventional right-handed face gives

\[
V_R^{(\nu)}\simeq\mathbb C^8.
\]

The post-Higgs mass/coin support can then be

\[
\Phi_\nu=
\operatorname{diag}
(y_u I_3,y_d I_3,y_\nu,y_e),
\]

up to family mixing and basis conventions. For nonzero Yukawa values it has rank eight. The one-state rank defect is removed without adding a charged mirror.

This does not derive a Dirac neutrino mass or exclude Majorana terms. It identifies the unique ternary-compatible support on which such a Dirac term can live.

## 6. The linking algebra changes

For \(\mathcal M_{15}\), the linking algebra was

\[
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_2(\mathbb C).
\]

The last \(M_2\) factor was unique and supplied the cleanest internal route to a real Jordan \(H_2(\mathbb R)\) carrier.

After adjoining \(D\to E\), the four bipartite component sizes are

\[
(2,3),\quad(3,2),\quad(2,1),\quad(1,2),
\]

so

\[
\boxed{
\mathcal L(\mathcal M_{16})
\cong
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_3(\mathbb C).
}
\]

Its complex dimension is

\[
25+25+9+9=68.
\]

The left and right algebras both have dimension eighteen, the matter TRO has dimension sixteen, and no right-annihilator remains.

The price is sharp:

\[
\boxed{
\text{the unique }M_2(\mathbb C)\text{ linking factor disappears.}
}
\]

An \(H_2\) corner still exists inside either \(M_3\), but it is no longer selected merely by simple-factor size.

## 7. The neutrino/Spin(2,3) fork

This produces a concrete competition between two attractive completions.

### Fifteen-state branch

- retains the unique \(M_2(\mathbb C)\) factor;
- gives the clean internal \(H_2(\mathbb R)\) bridge;
- leaves \(\nu_L\) unmatched by the Dirac coin;
- requires a Majorana/triplet mechanism or a separate neutrino sector.

### Sixteen-state branch

- completes the older Furey generation count;
- supplies the unique ternary-compatible \(\nu^c\) arrow;
- closes a neutrino Yukawa cycle;
- makes the walk coin square and potentially full rank;
- destroys uniqueness of the internal \(M_2\) factor.

This is now an experimentally meaningful structural fork rather than a vague preference for Dirac or Majorana neutrinos.

## 8. What is and is not selected

The relational orientation \(D\to E\) is selected uniquely among the canonical neutral additions. The absolute assignment

\[
(D,E)=(O_1,R)
\quad\text{or}\quad
(R,O_1)
\]

is still exchanged by the completed-carrier symmetry. Thus the result solves the direction between the two roles but not the native neutral label.

Nor does it prove the new arrow is a propagating fermion. Lorentz spin, Grassmann parity, kinetic term and Fock quantization still have to be inherited from the conjugate minimal-ideal construction.

## 9. Stop-everything and falsification gates

**Stop-everything positive:** the Furey conjugation/intertwiner maps the missing neutral ideal state exactly to \(D\to E\), gives it right-handed-neutrino Lorentz character, and the loss of the unique \(M_2\) factor is replaced by a canonical \(H_2\) Peirce corner selected by the same neutrino orientation.

**Dirac success:** the square Higgs coin yields a local anomaly-consistent walk with the observed small neutrino singular values from a source-derived suppression mechanism.

**Majorana success:** the fifteen-state branch retains the unique \(M_2\) bridge and a source-derived triplet or Weinberg operator gives the observed neutrino spectrum without \(\nu^c\).

**No-go:** the \(D\to E\) block cannot acquire the correct Lorentz/Grassmann character, or its required Higgs coupling violates the locking and custodial constraints.

**Spin(2,3) demotion:** every sixteen-state completion makes all \(H_2\) subcorners arbitrary and no independent external selector restores one.

## 10. Certificate

The [neutral-extension TRO certificate](../../../verification/verify/verify_neutral_extension_tro_closure.mjs) constructs the full \(8\times8\) block matrices, iterates exact finite-dimensional ternary closure, verifies both exchanged survivors, computes all seven canonical extension dimensions, checks the neutrino Yukawa trace and derives the completed linking factors and dimensions.

## Companion documents

- [Furey complex conjugation and the Nambu repair](166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Linking algebras of the fifteen-state survivors](112_furey_surviving_tro_linking_algebras.md)
- [Unique \(M_2\) linking factor to \(H_2(\mathbb R)\)](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)

