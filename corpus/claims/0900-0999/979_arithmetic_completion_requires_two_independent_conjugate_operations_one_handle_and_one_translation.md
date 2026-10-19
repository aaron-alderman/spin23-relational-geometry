# Arithmetic Completion Requires Two Independent Conjugate Operations: One Handle and One Translation

**Date:** 18 October 2026  
**Branches:** minimal placement completion, independent operations, handle/translation duality, and mod-two obstruction  
**Claim status:** exact finite minimality theorem  
**Certificate:** [test_three_placement_completion_of_the_dyadic_common_mode_order.mjs](../../../verification/test/test_three_placement_completion_of_the_dyadic_common_mode_order.mjs)

## Executive result

Document 978 proved that a second placement completes the first placement’s index-$512$ order to all of $\mathfrak{sp}(4,\mathbb Z)$. The full four-generator conjugate placement is more data than necessary. The exact minimum is now known.

No single integral linear combination of the second placement’s four generators can complete the first order. Modulo two, there are fifteen nonzero parity classes. Exhausting all of them gives maximum closure dimension nine, never ten. Therefore every one-generator extension retains even index.

Two independently available operations are necessary and sufficient. The successful minimal pairs are exactly

\[
\{T_n',L'\},
\qquad
\{T_t',L'\},
\qquad
\{T_r',L'\},
\]

where primes denote the distinct conjugate placement. Thus the rule is

\[
\boxed{
\text{one conjugate coherent handle}
+
\text{any one conjugate Jordan translation}
\Longrightarrow
\mathfrak{sp}(4,\mathbb Z).
}
\]

Neither ingredient can be removed.

## 1. Single-generator census

Adding individual conjugate generators to the first placement gives:

| Added operation | Mod-two dimension | Integral index |
|---|---:|---:|
| normal translation | 9 | 2 |
| tangent translation | 9 | 2 |
| relationship translation | 9 | 2 |
| coherent handle | 7 | 8 |

The complete parity-class census of all nonzero sums produces only

\[
(\dim,index)\in\{(5,64),(7,8),(9,2)\}.
\]

In particular, even the single mixed operator $L'+T'$ has index two rather than one. Having the sum is not equivalent to having the two operations independently, because commutators with the first-placement order cannot separate its components integrally.

## 2. Two-generator census

Among the six pairs of conjugate seeds:

- the three translation-translation pairs remain at index two;
- the three handle-translation pairs have index one.

The handle supplies grade reversal between positive and negative Jordan directions. The translation supplies one transverse nilpotent direction. Together their commutators generate the primitive dyadic directions missing from the first boundary order.

The equality of normal, tangent, and relational translations in this test is important. Arithmetic completion does not select which Jordan direction is fundamental. It requires only one nonzero translation direction once the conjugate handle is independently present.

## 3. Relational-carrier meaning

The result sharpens “two placements suffice” into an operational statement:

\[
\text{carrier}_0
+
\bigl(\text{handle}_1,\text{one relation/face}_1\bigr)
\Longrightarrow
\text{full integral carrier algebra}.
\]

The distinction between a sum and an independently addressable pair is the algebraic version of the distinction between one composite observable and two composable operations. Full closure depends on composition.

This gives concrete content to the project’s “one carrier, two faces, three relationships” language: the second placement need not reproduce a whole duplicate carrier. It must contribute a grade-reversing operation and one independently composable translational direction.

## 4. Stop-everything tests

**Minimal-pair trigger — passed:** one conjugate handle plus any one conjugate translation gives exact index one.

**Single-operation no-go — passed:** no parity class of a single conjugate-placement operation reaches mod-two dimension ten.

**Microscopic pair trigger:** identify a Furey/Jordan operation whose two independently controllable components transport as $L'$ and one $T'$.

**Composite-operation warning:** a microscopic term proportional only to $L'+T'$ does not suffice unless the dynamics separately resolves its two components.

**Translation-choice trigger:** Standard-Model typing selects whether the completing direction is normal, tangent, or relational; arithmetic alone leaves the three equivalent.

## Verdict

| Question | Verdict |
|---|---|
| Can one conjugate generator complete the order? | **No** |
| Can one mixed handle-plus-translation sum complete it? | **No** |
| Minimum number of independent added operations? | **Two** |
| Must one be the conjugate coherent handle? | **Yes** |
| What may the other be? | **Any one conjugate Jordan translation** |
| Does arithmetic choose normal, tangent, or relationship? | **No** |

## Position in the corpus

- [placement-orbit integral completion](978_two_distinct_c3_related_placements_complete_the_dyadic_boundary_order_to_the_full_chevalley_sp4z_lattice.md)
- [unique-Lagrangian dyadic image](977_the_dyadic_lie_image_is_a_unique_lagrangian_boundary_extension_of_sl2f2_by_a_two_dimensional_abelian_radical.md)
- [physical Jordan-handle Lie closure](971_two_face_translations_their_off_diagonal_relationship_and_one_grade_reversing_handle_generate_all_of_sp4.md)
