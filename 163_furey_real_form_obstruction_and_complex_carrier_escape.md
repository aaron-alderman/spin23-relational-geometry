# The Furey Neutral Exchange Fails at the Native Real Algebra but Survives on the Completed Complex Carrier

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact source-level no-go for a real-algebra automorphism; exact carrier-level escape; canonicity remains open

## 1. Question

The two cyclically surviving matter TROs are exchanged by

\[
s:O_1\longleftrightarrow R.
\]

At the gauge-module and block-incidence level this is exact. The missing question was whether \(s\) comes from Furey's native algebraic construction.

The answer has two layers:

\[
\boxed{
\text{no on the native real algebra,}
\qquad
\text{yes abstractly on the completed complex carrier.}
}
\]

The second statement does not undo the first. It identifies precisely where extra structure enters.

## 2. The native algebra remembers provenance

Furey's source algebra is

\[
\mathcal A=\mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R
\]

with componentwise multiplication. Its four summands are two-sided ideals of distinct real dimensions

\[
8,\quad4,\quad2,\quad1.
\]

Equivalently, their units are four orthogonal central idempotents. Every real-algebra automorphism preserves central primitive ideals, their dimensions and their multiplication type. Because the dimensions are pairwise distinct, every summand is fixed setwise.

The octonionic neutral block is selected inside the octonionic summand by

\[
P_{\mathbb O_1}
=\frac12\left(I_{\mathbb O}-L_{e_7}R_{e_7}\right).
\]

It is a complex line, hence two-dimensional over \(\mathbb R\), contained in the fixed eight-dimensional octonionic ideal. The terminal \(R\) is the one-dimensional real summand. Therefore no real-linear bijection, much less a real-algebra automorphism or anti-automorphism, can exchange them:

\[
\boxed{
O_1\not\longleftrightarrow R
\quad\text{inside}\quad
\mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R.
}
\]

This is stronger than a failed search for a convenient formula. It is an invariant obstruction.

## 3. The centralizer makes the mismatch visible

Before the sixteen-real-dimensional carrier completion, the pre-Higgs centralizer is

\[
\Delta_{\rm SM}
=
\mathbb C_{\mathbb O}
\oplus M_3(\mathbb C)_{\mathbb O}
\oplus M_2(\mathbb C)_{\mathbb H}
\oplus\mathbb C_{\mathbb C}
\oplus\mathbb R_{\mathbb R}.
\]

Thus the two neutral factors relevant to the proposed exchange are literally different real algebras:

\[
\mathbb C_{\mathbb O}\not\simeq_{\mathbb R\text{-alg}}\mathbb R_{\mathbb R}.
\]

Three elementary invariants already separate them:

\[
\dim_{\mathbb R}\mathbb C=2\ne1=\dim_{\mathbb R}\mathbb R,
\]

\[
\mathbb C\text{ contains }j\text{ with }j^2=-1,
\qquad
\mathbb R\text{ does not},
\]

and the anti-Hermitian part of the complex factor has real dimension one, while that of the real factor is zero.

So the native Lie--Jordan split also remembers which neutral direction came from the octonions.

## 4. Why the block inventory nevertheless admits the swap

Furey then embeds the fifteen-real-dimensional source vector space into a sixteen-real-dimensional \(\mathbb V\), adds a complementary real direction, and equips \(\mathbb V\) with a global complex structure. The terminal real coordinate and the complement can thereby form a one-complex-dimensional carrier block.

On the resulting complex carrier one has

\[
\mathbb V_{\mathbb C\text{-carrier}}
=O_1\oplus O_2\oplus H\oplus C\oplus R
\]

with complex dimensions

\[
1+3+2+1+1=8.
\]

Now \(O_1\) and \(R\) are isomorphic trivial gauge modules. Their permutation is a complex-linear unitary intertwiner, and conjugation composed with that permutation gives the antiunitary found in the preceding certificate.

But Furey explicitly states that the embedding into \(\mathbb V\) is a vector-space embedding, not an algebra homomorphism. Consequently the carrier permutation need not descend to an automorphism of \(\mathcal A\).

The exchange is therefore an **emergent carrier symmetry**, not a symmetry of the native direct-sum multiplication.

## 5. Exact status of the antiunitary candidate

Let \(S\) exchange the two completed complex lines and fix \(O_2,H,C\). Let \(K\) be coefficient conjugation in the selected carrier basis. Then

\[
\Theta_{\rm ex}=SK,
\qquad
\Theta_{\rm ex}^2=1,
\]

and it exchanges the two surviving TRO supports.

What is now established:

- \(S\) commutes with the Standard-Model gauge representation because both exchanged blocks are gauge singlets of hypercharge zero;
- \(S\) is unitary on the completed complex carrier;
- \(SK\) is an involutive antiunitary;
- it preserves the abstract endomorphism product by conjugation, \(X\mapsto S\overline X S^{-1}\);
- it does not preserve the source-label map back to \(\mathcal A\).

Thus the source-level gate is resolved negatively, while a weaker reconstruction-level candidate remains alive.

## 6. Physical fork

There are now three honest paths.

### Path A: retain the native real form

Then \(O_1\) and \(R\) are intrinsically distinct and only one TRO should be selected. A boundary orientation, neutrino coupling, volume element or response map must say which one.

### Path B: promote the completed carrier

Take \(\mathbb V\), its global complex structure and its endomorphism algebra as fundamental. The exchange may then be exact, but the theory must explain why the native division-algebra provenance is physically redundant.

### Path C: spontaneous orientation

Keep the exchange as a symmetry of the completed carrier and allow a vacuum or boundary condition to select one of the two real-form orientations. This predicts an order parameter odd under \(S\) and raises domain-wall and CP questions.

## 7. Stop-everything and falsification gates

**Stop-everything positive:** a canonical construction of the global complex structure pairs the terminal \(\mathbb R\) with the unique complementary real direction and forces \(S\), while the same operation yields the external reciprocal real slice and the physical particle-conjugation map.

**Selection success:** a source-native operator distinguishes the two neutral blocks and independently chooses the TRO required by chirality, Yukawa closure and a positive \(H_2(\mathbb R)\) response.

**No-go:** every carrier exchange depends on an arbitrary choice of complement or complex structure and produces no invariant observable; then it is basis redundancy, not physical symmetry.

**Phenomenological failure:** spontaneous exchange breaking creates stable defects or CP relations incompatible with observation.

## 8. Certificate

The [real-form obstruction certificate](scripts/verify_furey_real_form_obstruction.mjs) checks the distinct source-ideal dimensions, the complex-versus-real square-root-of-minus-one obstruction, the unequal anti-Hermitian dimensions, the completed carrier swap, gauge commutation and the involutive antiunitary action.

## 9. Source

The algebra, centralizer factors, projectors and vector-space-only embedding are taken from N. Furey, [*Standard Model Symmetries and the Nested Embeddings of \(\mathbb R\subset\mathbb C\subset\mathbb H\subset\mathbb O\)*](https://arxiv.org/abs/2607.18450), arXiv:2607.18450v3 (2026), especially equations (9), (17), (18), (34), (49) and the statement following (49).

## Companion documents

- [Furey survivor-exchange antiunitary candidate](162_furey_survivor_exchange_antiunitary_candidate.md)
- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Linking algebras of the surviving matter TROs](112_furey_surviving_tro_linking_algebras.md)
- [Canonical real-structure commutant model](65_canonical_real_structure_commutant_model.md)

