# The Completed Furey Matter TRO Has No Proper Four-Channel Ternary Quotient, So the Bridge Must Use Higgs-Dressed Pairing

## Claim status

Exact ternary-ideal classification for the completed one-generation matter TRO. It closes one proposed route to the four-atom source algebra and redirects the construction to a paired or Gram functor.

## 1. The completed matter TRO

The verified sixteen-state Furey matter space decomposes as

\[
M
=M_{3,2}oplus M_{2,3}oplus M_{2,1}oplus M_{1,2}.
\]

The four rectangular components contain

\[
\begin{array}{c|c|c}
\text{component}&\dim_{\mathbb C}&\text{matter content}\\ \hline
M_{3,2}&6&Q=(d_i,u_i)\\
M_{2,3}&6&(u_i^c,d_i^c)\\
M_{2,1}&2&L=(\nu,e)\\
M_{1,2}&2&(e^c,\nu^c).
\end{array}
\]

Its oriented product is

\[
[x,y,z]=xy^\dagger z.
\]

## 2. Every rectangle is ternary simple

For a full rectangular TRO \(M_{m,n}\),

\[
MM^\dagger=M_m,
\qquad
M^\dagger M=M_n.
\]

If a ternary ideal \(J\subseteq M_{m,n}\) contains one nonzero matrix unit \(E_{ij}\), invariance under the left and right linking algebras gives

\[
E_{ki}=E_{ki}^{(m)}E_{ij}
\quad\text{and}\quad
E_{ij}E_{j\ell}^{(n)}=E_{i\ell},
\]

and hence every \(E_{k\ell}\). Therefore

\[
J=0
\quad\text{or}\quad
J=M_{m,n}.
\]

Each of the four completed-matter rectangles is ternary simple.

## 3. Complete ideal lattice

Every ternary ideal of the direct sum is consequently a sum of whole rectangular components. There are

\[
2^4=16
\]

ideals. The possible retained or quotient dimensions are sums of

\[
6,6,2,2.
\]

There is exactly one four-dimensional retained TRO:

\[
M_{2,1}\oplus M_{1,2}.
\]

It contains the leptonic arrows

\[
(\nu,e,e^c,\nu^c)
\]

and discards both quark rectangles. It is not an algebra with one atom for each of \(u,d,e,\nu\).

## 4. Why Yukawa channels do not align with TRO components

Each Yukawa channel joins two different rectangles:

\[
\begin{array}{c|c|c}
\text{channel}&\text{left face}&\text{right face}\\ \hline
u&M_{3,2}&M_{2,3}\\
d&M_{3,2}&M_{2,3}\\
e&M_{2,1}&M_{1,2}\\
\nu&M_{2,1}&M_{1,2}.
\end{array}
\]

The \(u\) and \(d\) labels split the weak columns of the first rectangle and the singlet rows of the second. The \(e\) and \(\nu\) labels similarly split the two leptonic rectangles. A ternary ideal cannot retain one row or column of a simple rectangle while discarding the other: the linking action regenerates the whole rectangle.

Keeping both faces of all four Yukawa channels therefore retains every component and hence all sixteen complex matter directions. No proper ideal quotient produces four nonzero channel classes.

## 5. What failed and what survives

The proposed route

\[
\text{completed Furey TRO}
\longrightarrow
\text{four-channel quotient TRO}
\]

is obstructed for the present matter product.

This does not obstruct the already verified channel responses. The Higgs does something that a TRO quotient cannot: it chooses complementary weak components and pairs left and right rectangles. After this dressing, gauge indices can be contracted into neutral Gram matrices.

The credible replacement is

\[
M
\xrightarrow{\text{Higgs orientation}}
\text{four paired left/right channel faces}
\xrightarrow{\text{Gram contraction}}
\bigoplus_f H_2(\mathbb C)_+.
\]

The desired \(\mathbb R^4\) then lives, if anywhere, in the **central channel selectors** of this dressed direct sum—not as a quotient of the undressed matter TRO.

## 6. Jordan versus oriented TRO structure

Transpose exchanges

\[
M_{3,2}\leftrightarrow M_{2,3},
\qquad
M_{2,1}\leftrightarrow M_{1,2}.
\]

It reverses the outer order of the oriented TRO product, but that reversal disappears after Jordan symmetrization. A graph or fixed-point construction pairing opposite rectangles is therefore more plausible as a **Jordan subtriple** than as a TRO quotient.

This identifies a concrete next test:

1. include the two Higgs orientations;
2. construct the paired-rectangle transpose/conjugation graph;
3. test Jordan-triple closure;
4. contract color and weak indices;
5. determine whether the surviving center has four canonical primitive selectors.

## 7. Stop-everything tests

- **Quotient falsifier:** any claimed four-channel TRO quotient retains only selected rows or columns of a simple rectangle.
- **Dimension falsifier:** a four-dimensional quotient is called \(u,d,e,\nu\) although it is only the leptonic pair of rectangles.
- **Paired-graph success:** Higgs dressing defines a closed Jordan subtriple spanning both faces of all four channels.
- **Central-selector success:** its neutral Gram image has four canonically distinguished central channel projections.
- **Closure failure:** cross-channel Jordan triples leave the Higgs-dressed graph with no physical null ideal.
- **Gauge failure:** the proposed pairing identifies inequivalent representations before Higgs dressing.

## 8. Executable certificate

    node verification/classify/classify_ternary_ideals_of_the_completed_furey_matter_tro_and_test_four_channel_quotients.mjs

The certificate verifies simplicity from every matrix unit, enumerates all sixteen component ideals, identifies the unique four-dimensional retained TRO and checks that only the full sixteen-dimensional space retains both faces of all four Yukawa channels.

## Companion documents

- [Four source directions are not yet a four-atom Jordan quotient](810_four_independent_yukawa_gram_probes_form_a_source_label_space_not_yet_a_physical_four_atom_jordan_quotient.md)
- [Completed Furey Cartan–ternary intertwiner](../0400-0499/412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Four neutral Yukawa Gram responses](../0200-0299/264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Full gauge-covariant Yukawa portal](../0200-0299/237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Jordan-triple primitive-projector rigidity](809_unital_jordan_triple_preservation_forces_the_four_neutral_sources_back_to_primitive_spectral_projectors_and_quantifies_approximate_purity.md)
