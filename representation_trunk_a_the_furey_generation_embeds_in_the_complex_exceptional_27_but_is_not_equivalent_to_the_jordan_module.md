# The Furey Generation Embeds in the Complex Exceptional (27), but Is Not Equivalent to the Jordan Module

**Date:** 17 October 2026  
**Scope:** representation/intertwiner trunk  
**Claim status:** exact representation-inventory, anomaly and conjugation test; no claim of a dynamical (E_6) theory

## Result in plain language

There are two different questions that are easy to blur:

1. Can the completed Furey generation be placed inside an exceptional-Jordan representation?
2. Is it the same mathematical object as the exceptional-Jordan representation?

The answer is **yes** to the first question and **no** to the second.

Think of a sixteen-piece tool set fitting into one compartment of a twenty-seven-compartment case. The fit can preserve every label on those sixteen tools. It does not make the whole case identical to the tool set, and opening all the case's hinges need not preserve that compartment.

## 1. Frozen Furey/Spin(10) target

The neutrino-completed, all-left one-generation module is

\[
M_F=Q\oplus u^c\oplus d^c\oplus L\oplus e^c\oplus\nu^c,
\]

with complex dimensions

\[
6+3+3+2+1+1=16.
\]

The existing five-bit certificate identifies this module with the chiral (Spin(10)) spinor (16), preserving the five Cartan charges, all Standard-Model root actions and the Furey ternary grading. The local certificate accompanying this report independently verifies the Standard-Model anomaly sums:

\[
SU(3)^3=SU(3)^2Y=SU(2)^2Y=Y^3=\mathrm{grav}^2Y=0,
\]

and counts four weak doublets, so the mod-two (SU(2)) anomaly also vanishes.

## 2. The direct exceptional-flag complement fails

The (M_3(\mathbb C)) complement selected by the nested exceptional flag has

\[
M_3(\mathbb C)\downarrow G_{\rm SM}
=(\mathbf3,\mathbf2)_{1/6}
\oplus(\mathbf3,\mathbf1)_{-1/3}.
\]

It has complex dimension nine and packages (Q_L\oplus d_R). The completed Furey module has dimension sixteen and uses the all-left field

\[
d^c_L\sim(\bar{\mathbf3},\mathbf1)_{1/3}.
\]

Complex conjugating the whole exceptional complement repairs the down singlet but simultaneously conjugates (Q_L). Therefore no charge- and chirality-preserving bijective intertwiner exists between the direct exceptional complement and the completed Furey generation.

This is a strict **no-go**, not merely an absent construction.

## 3. The complex exceptional Jordan module succeeds more modestly

After complexification, the exceptional Jordan module is the complex (27) of (E_6). Under a selected

\[
Spin(10)\times U(1)\subset E_6,
\]

it branches as

\[
\boxed{27=16_{1}\oplus10_{-2}\oplus1_{4}.}
\]

The uncharged branching (27=1\oplus10\oplus16), the identification of the (16) with one fermion generation, and the fact that the (Spin(10)) subgroup is selected by fixing a rank-one idempotent are stated explicitly in [Boyle, *The Standard Model, the Exceptional Jordan Algebra, and Triality*](https://arxiv.org/abs/2006.16265), Sec. III. The (U(1)) subscripts above are the conventional relative normalization used for the (E_6\supset Spin(10)\times U(1)) branching; reversing every subscript is the equivalent conjugate convention.

The (16_1) occurs once. Consequently there is a unique (Spin(10))-submodule of the required type, and the already-certified Furey/Spin(10) dictionary gives an equivariant embedding

\[
\boxed{M_F\hookrightarrow J_3(\mathbb O)_{\mathbb C}.}
\]

On this summand the map preserves:

- all Standard-Model charges;
- chirality in the all-left convention;
- the complete (\nu^c) state;
- the anomaly identities;
- the existence of the (Spin(10))-compatible Yukawa channel.

The last point follows because the exceptional cubic admits

\[
16_1\,16_1\,10_{-2},
\]

whose auxiliary (U(1)) charge sums to zero. It also admits (10_{-2}10_{-2}1_4).

This proves an inclusion of matter representations. It does not prove equality of products, actions or physical theories.

## 4. Exact stopping points

### Not an (E_6)-invariant matter subspace

The decomposition exists only after choosing the (Spin(10)\times U(1)) subgroup. General (E_6) transformations mix the three summands. The sixteen-dimensional matter space is therefore not a standalone (E_6) representation.

### Eleven additional complex directions

The (10\oplus1) is genuine extra representation content. The (10) can contain Higgs-doublet directions, but it also contains colored directions. Nothing in the representation branching alone gives the observed low-energy spectrum or removes the unwanted components.

### Physical charge conjugation is external

The conjugate generation is (\overline{16}_{-1}). It is absent from the same chiral (27) and occurs in

\[
\overline{27}=\overline{16}_{-1}\oplus10_2\oplus1_{-4}.
\]

Thus physical charge conjugation does not close inside a single exceptional (27). The smallest obvious conjugation-closed carrier is (27\oplus\overline{27}), of complex dimension (54), with substantial extra content.

### Jordan multiplication is not the Furey ternary product

The embedding preserves the group module. It does not establish

\[
x\circ y
\longleftrightarrow
xy^\dagger z.
\]

Indeed the existing Furey audit shows that the color–weak (Spin(10)) roots do not act as derivations of the completed ternary product. A fortiori, the full (E_6) action is not already a symmetry of that product.

## 5. Go/no-go verdict

| Proposed statement | Verdict |
|---|---|
| The exceptional flag complement is one Furey generation | **No** |
| The complex exceptional (27) contains the completed generation | **Yes** |
| The inclusion preserves SM charges and anomaly data | **Yes** |
| The inclusion contains a Yukawa-compatible (16\,16\,10) channel | **Yes** |
| One (27) is closed under physical conjugation | **No** |
| The Furey ternary system and exceptional Jordan algebra are equivalent | **No** |
| The embedding derives (E_6) dynamics or the low-energy spectrum | **No** |

The high-value conclusion is therefore narrower than “we live in an (E_6) or (E_8) universe,” but much stronger than numerical resemblance:

> The completed Furey generation is exactly compatible with the matter-spinor compartment of the complex exceptional Jordan (27). The exceptional module is a larger container, not yet the same physical object.

## 6. Certificate

```powershell
node scripts/verify_representation_trunk_furey_exceptional_module_test.mjs
```

The certificate verifies the sector dimensions, all Standard-Model anomaly sums, the direct-complement obstruction, the (27=16+10+1) inventory, the cubic (U(1)) selection rules and the charge-conjugation doubling requirement.

## Related established results

- [Completed Furey/Spin(10) five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Exceptional complement chirality obstruction](186_exceptional_complement_quark_partial_match_and_statistics_gate.md)
- [Common exceptional/oscillator (3+2) ambiguity](419_the_common_exceptional_and_oscillator_3plus2_flag_has_a_two_scalar_intertwiner_ambiguity.md)
- [Furey ternary breaking of color–weak (Spin(10)) roots](416_the_furey_ternary_product_preserves_sm_roots_but_breaks_color_weak_so10_roots.md)
