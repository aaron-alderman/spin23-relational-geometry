# The Sewn Furey Ribbon Has Untyped Handle Exchange but No Standard-Model-Typed Exchange Between C and D

## Claim

The genus-two sewing selected by the Furey matter pairs,

\[
C=(u,e),\qquad D=(d,\nu),
\]

admits four exchanges of the two pairs if the boundary labels are treated as untyped points. None preserves both Standard Model distinctions carried by the labels: up- versus down-channel Higgs coupling and colored versus color-singlet matter. Equal carrier areas can therefore follow from handle exchange only after an enlarged, restored, or emergent response symmetry has been supplied.

## 1. The four boundary sectors form a crossed square

| | colored | singlet |
|---|---:|---:|
| up channel | \(u\) | \(\nu\) |
| down channel | \(d\) | \(e\) |

The Furey pairing selects the diagonals

\[
C=\{u,e\},\qquad D=\{d,\nu\}.
\]

The handles have equal untyped cardinality, but a diagonal swap cannot preserve both coordinate functions of this square.

## 2. Exhaustive finite classification

The certificate enumerates all \(4!=24\) permutations. Eight preserve the unordered partition \(\{C,D\}\), giving the dihedral automorphism group of the untyped square. Four exchange \(C\) and \(D\), but

\[
N_{C\leftrightarrow D}^{\rm preserve\ channel\ and\ kind}=0.
\]

If exact electric charge is retained, the fully typed automorphism group is trivial:

\[
\operatorname{Aut}(u,d,e,\nu;\text{channel, kind, }Q)=\{1\}.
\]

This is complete for permutations of the four sector labels. It does not rule out a non-permutation duality acting on a larger state, operator, or response space.

## 3. The two canonical exchange mechanisms

The color-preserving exchange is

\[
u\leftrightarrow d,\qquad \nu\leftrightarrow e.
\]

It reverses the up/down Higgs channel and is the finite shadow of weak-isospin or left-right channel reciprocity. The low-energy Standard Model does not make the complete left- and right-handed sector collection into an exact channel-exchange multiplet; Yukawa data and the electroweak vacuum distinguish the channels.

The channel-preserving exchange is

\[
u\leftrightarrow\nu,\qquad d\leftrightarrow e.
\]

It reverses colored versus singlet matter and is Pati-Salam-like only in the limited sense that it treats lepton number as a color-like direction. The four-label quotient also hides the multiplicity difference between a color triplet and a lepton singlet. The remaining two exchanges mix both typings.

## 4. Consequence for the equal-area selector

Document 766 proved

\[
H^T J(a,b)H=J(b,a),
\]

so symplectic handle exchange forces \(a=b\), while anti-symplectic exchange forces \(a=-b\). The present calculation types the antecedent:

\[
\boxed{\text{the sewn topology supplies }H\text{ abstractly, but Standard Model typing does not make }H\text{ a symmetry}.}
\]

The equal-area arithmetic carrier remains conditional. Topology explains why handle exchange is a natural candidate selector; it does not establish that the physical response functional respects it.

## 5. Live exits

1. **Restored channel symmetry.** Test whether an enlarged \(SU(2)_L\times SU(2)_R\) response theory makes channel flip exact before Yukawa and vacuum data are inserted.
2. **Pati-Salam completion.** Test whether \(SU(4)\) color-lepton covariance induces a handle exchange on the full multiplicity-correct carrier rather than merely on four sector names.
3. **Combined enlarged symmetry.** Search for an element or duality that exchanges the composite handles while preserving the response pairing.
4. **Emergent response reciprocity.** The symmetry need not act on microscopic fermion labels if the two integrated response Gram forms are dynamically equal.
5. **Encoded or mapping-class symmetry.** A handle exchange may be exact on the logical state space while broken by the matter-label map; this requires a controlled intertwiner and error budget.

## 6. Stop conditions

Do not claim that the Furey sewing alone fixes \(a=b\), that the untyped swap is a Standard Model symmetry, that the Pati-Salam analogy supplies an invertible full-sector map, or that equal handle dimensions imply equal response norms. If no enlarged symmetry or dynamical reciprocity makes the response planes isometric, retain the two-parameter family \(J(a,b)\).

## 7. Executable certificate

```powershell
node scripts/classify_sewn_furey_handle_exchange_against_sm_typing.mjs
```

The certificate checks the full permutation group and proves the stated counts.

## 8. Placement in the programme

The chain

\[
\text{oriented }C_3\Longrightarrow J(a,b)\Longrightarrow
\text{handle exchange candidate}\Longrightarrow a=b\Longrightarrow
Sp(4,\mathbb Z)\Longrightarrow Spin(2,3)
\]

now has a sharply typed conditional arrow. The next high-value test is whether left-right or Pati-Salam restoration makes that arrow true on the full representation content, or whether only emergent response reciprocity can do so.

## Companion documents

- [The two Furey matter cycles sew the planar Yukawa ribbon into the genus-two carrier](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [The sewn Furey matter pairs select a Lagrangian plane](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Integral handle exchange forces equal or opposite carrier areas](766_integral_handle_exchange_forces_equal_or_opposite_carrier_areas_but_is_not_a_microscopic_s5_symmetry.md)
