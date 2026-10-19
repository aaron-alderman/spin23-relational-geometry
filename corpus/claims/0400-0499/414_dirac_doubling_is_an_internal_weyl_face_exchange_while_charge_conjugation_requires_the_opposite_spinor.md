# Dirac Doubling Is an Internal Weyl Face Exchange, While Charge Conjugation Requires the Opposite Spinor

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B08 and B11  
**Claim status:** exact weight- and matrix-unit-level separation; coefficient-level Furey antiunitary remains open

## 1. The ambiguity being removed

Several operations have appeared under similar language:

- pairing a left-handed field \(f\) with its left-handed conjugate \(f^c\);
- taking the Hermitian adjoint of a matrix block;
- applying Furey’s complex or octonionic conjugation;
- CAR particle-hole conjugation;
- introducing an independent mirror generation;
- exchanging the two faces of a relational carrier.

They are not the same operation.

The five-bit anomaly-code model supplies an exact way to distinguish the first operation from full charge conjugation.

## 2. The internal Dirac-pairing Weyl involution

On the \(SO(10)\) five-sign weights define

\[
\sigma(q_1,q_2,q_3,q_4,q_5)
=(-q_1,-q_2,-q_3,q_4,-q_5).
\]

Four signs are reversed, so parity of the number of minus signs is preserved. Hence \(\sigma\) acts inside the same chiral sixteen-dimensional spinor.

Its eight pairs are

\[
\begin{aligned}
\nu^c&\leftrightarrow\nu,&
e^c&\leftrightarrow e,\\
u_i^c&\leftrightarrow u_i,&
d_i^c&\leftrightarrow d_i
\qquad(i=1,2,3).
\end{aligned}
\]

This is the pairing used by the doubled-code description: it is vectorlike under colour and electromagnetism, while weak isospin supplies the chiral linking row.

It is a linear Weyl-group operation, not charge conjugation.

## 3. Its exact realization on the Furey TRO

On the eight left/right carrier indices define the involution

\[
\begin{aligned}
O_{2,i}&\leftrightarrow O_{2,i},&
H_4&\leftrightarrow D,\\
H_5&\leftrightarrow C,&
E&\leftrightarrow E.
\end{aligned}
\]

Call this permutation \(p\). On matrix units define

\[
\Theta(E_{ts})=E_{p(s),p(t)}.
\]

Thus \(\Theta\) exchanges source and target and simultaneously relabels the two faces. In matrix notation it is

\[
\Theta(X)=PX^TP.
\]

The completed sixteen-state matter support is invariant under \(\Theta\), and its induced field permutation is exactly \(\sigma\).

Examples are

\[
\begin{aligned}
E_{E,D}\;(\nu^c)&\mapsto E_{H_4,E}\;(\nu),\\
E_{E,C}\;(e^c)&\mapsto E_{H_5,E}\;(e),\\
E_{C,O_{2,i}}\;(u_i^c)&\mapsto E_{O_{2,i},H_5}\;(u_i),\\
E_{D,O_{2,i}}\;(d_i^c)&\mapsto E_{O_{2,i},H_4}\;(d_i).
\end{aligned}
\]

This gives an explicit meaning to “two faces”: Dirac partners occupy transpose-related arrows after the fixed carrier permutation.

## 4. Ternary order reversal

For the TRO product \([x,y,z]=xy^\dagger z\),

\[
\boxed{
\Theta([x,y,z])
=[\Theta(z),\Theta(y),\Theta(x)].
}
\]

The outer variables reverse because \(\Theta\) contains transpose. The certificate verifies this on all 80 nonzero matrix-unit triples.

For the symmetrized Jordan triple

\[
\{x,y,z\}=\frac12([x,y,z]+[z,y,x]),
\]

outer reversal is invisible, so

\[
\Theta(\{x,y,z\})
=\{\Theta(x),\Theta(y),\Theta(z)\}.
\]

The internal Dirac pairing is therefore an automorphism of the associated Jordan triple even though it is an anti-automorphism of the oriented TRO product.

## 5. Full charge conjugation leaves the chiral sixteen

Full sign reversal is

\[
C:q\mapsto-q.
\]

Because there are five signs, it changes even parity to odd parity. Therefore

\[
C:\mathbf{16}_+\longrightarrow\mathbf{16}_-.
\]

No weight \(-q\) lies among the sixteen even-parity weights. Full charge conjugation requires the opposite-chirality spinor or conjugate ideal.

This proves:

\[
\boxed{
\text{Dirac doubling within one generation}
\ne
\text{full particle-hole conjugation}.}
\]

It also explains why a conjugate Furey ideal can be mathematically necessary without implying that the doubled code already contains an independent physical mirror generation.

## 6. Linear versus anti-linear lifts

At matrix-unit level, the support map is fixed. On complex coefficients there are at least two lifts:

\[
\Theta_{\rm lin}(X)=PX^TP,
\qquad
\Theta_{\rm anti}(X)=PX^\dagger P.
\]

The first is the linear Weyl pairing. The second is anti-linear. They agree on real matrix units but differ on phases.

The current calculation selects the support permutation and its charge action. It does not yet prove which anti-linear lift matches Furey’s conjugation, CAR adjunction or the physical CP operation.

This phase-level distinction is exactly where flavor CP can survive or be accidentally erased.

## 7. Consequences

### 7.1 No automatic mirror doubling

The eight Dirac pairs are already internal to one chiral \(SO(10)\) spinor. Calling them “two copies” in the code-doubling construction does not mean two independent generations.

### 7.2 Dagger is not the pairing

Bare dagger sends \(E_{ts}\) to \(E_{st}\), which generally leaves the matter support. The carrier permutation \(p\) is essential.

### 7.3 The Jordan triple forgets orientation order

The oriented TRO remembers whether the outer variables were reversed. The symmetrized Jordan triple does not. This is a concrete location where “one carrier, two faces” contains more information than its Jordan symmetrization.

### 7.4 Charge conjugation needs the conjugate ideal

Any coefficient-level Furey/CAR construction that truly sends all charges to their negatives must include the opposite spinor sector or an equivalent conjugate module.

## 8. Highest-value continuation

The next calculation should import the actual Furey conjugation matrices and determine whether they act as:

1. \(\Theta_{\rm anti}\) within the completed support;
2. full sign reversal into the conjugate ideal;
3. a composition of the two;
4. a distinct operation involving weak or Lorentz factors.

The result must then be compared separately with the deck real structure and flavor CP.

**Stop-everything result:** two independently defined real structures generate exactly the required grading or complex structure while preserving the gauge/TRO intertwiner and nonzero flavor CP.

## 9. Falsification gates

**Parity falsifier:** claim that \(q\mapsto-q\) acts within the even five-bit spinor.

**Dagger falsifier:** identify bare matrix dagger with Dirac pairing without the permutation \(p\).

**Mirror falsifier:** interpret the internal Weyl pairs as an independent mirror generation.

**Phase falsifier:** infer the coefficient-level antiunitary from its action on real matrix units.

**Jordan falsifier:** use the symmetrized triple to recover the outer-order orientation that it has forgotten.

## 10. Certificate

The [Dirac-pairing certificate](../../../verification/verify/verify_dirac_weyl_pairing_is_tro_face_exchange_not_charge_conjugation.mjs) verifies all eight pairs, the face-exchange transpose, all 80 ternary anti-automorphism relations, and the departure of full sign reversal into the odd-parity spinor.

## Companion documents

- [Nonabelian gauge-root intertwiner](413_the_so10_fock_root_operators_close_exactly_on_the_completed_furey_matter_tro.md)
- [Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Why dagger does not select chirality](../0000-0099/75_dagger_does_not_select_chirality.md)
- [Furey conjugate-ideal extension](../0000-0099/63_furey_conjugate_ideal_extension.md)
- [Response selector versus CAR adjoint](../0300-0399/307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
