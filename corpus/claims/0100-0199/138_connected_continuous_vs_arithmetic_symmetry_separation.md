# Connected Continuous Symmetry versus Arithmetic and Monster Symmetry

**Date:** 17 October 2026  
**Branches:** B09, B10 and B12  
**Claim status:** exact topological group no-go; arithmetic emergence routes remain open

## 1. The central distinction

The programme contains two very different kinds of symmetry:

- connected Lie groups such as
  \[
  Spin_0(2,3),\quad Sp(4,\mathbb R);
  \]
- discrete arithmetic or finite groups such as
  \[
  \operatorname{Aut}(\Lambda_{\rm Leech}),\quad Co_0,\quad\mathbb M.
  \]

They cannot be identified directly as one symmetry action.

## 2. General lattice theorem

Let \(\Lambda\subset V\) be a full lattice in a finite-dimensional real vector space. Its exact linear automorphism group

\[
\operatorname{Aut}(\Lambda)
=
\{g\in GL(V):g\Lambda=\Lambda\}
\]

is discrete in \(GL(V)\).

Let \(G\) be a connected topological group and

\[
\phi:G\longrightarrow\operatorname{Aut}(\Lambda)
\]

a continuous homomorphism. The image \(\phi(G)\) must be connected, because a continuous image of a connected space is connected. A discrete group has singleton connected components. Since the image contains the identity,

\[
\boxed{\phi(G)=\{1\}.}
\]

Therefore a connected gauge or conformal group cannot act nontrivially while preserving an integral lattice exactly.

## 3. Immediate consequences

### Leech lattice

If the Leech lattice is fundamental and every physical continuous transformation must preserve it as a lattice, then the connected \(Spin_0(2,3)\) action on that same carrier is trivial.

The continuous symmetry can survive only after:

- extending the lattice to its real span and no longer requiring every Lie-group element to preserve the lattice;
- interpreting the lattice as a charge/topological-sector lattice rather than the local field carrier;
- making the continuous symmetry emergent after coarse graining;
- placing continuous and arithmetic symmetries on different factors.

### Monster

The Monster \(\mathbb M\) is finite and discrete. Every continuous homomorphism

\[
Spin_0(2,3)\longrightarrow\mathbb M
\]

is trivial.

Thus \(Spin(2,3)\) cannot be “connected to the Monster” by a nontrivial continuous group map into the Monster. A meaningful connection must use different data.

## 4. The integer-rotation toy model

The basic phenomenon already appears for

\[
\mathbb Z^2\subset\mathbb R^2.
\]

The continuous group \(SO(2)\) acts on \(\mathbb R^2\), but only isolated quarter turns preserve \(\mathbb Z^2\):

\[
\theta=0,\frac\pi2,\pi,\frac{3\pi}2
\quad(\mathrm{mod}\ 2\pi).
\]

The lattice retains a finite subgroup, not the connected rotation group.

The Leech case is vastly richer but obeys the same topological separation.

## 5. Surviving exact connection types

The no-go leaves several mathematically legitimate routes.

### Arithmetic subgroup

One may use

\[
Sp(4,\mathbb Z)\subset Sp(4,\mathbb R)
\]

as a discrete subgroup. This does not identify the full continuous group with a finite sporadic group.

### Finite reduction

Reduction modulo a prime can produce

\[
Sp(4,\mathbb Z)
\longrightarrow
Sp(4,\mathbb F_p).
\]

A claimed sporadic connection would then require an explicit subgroup, quotient, representation or correspondence.

### Integral flag stabilizer

The integral exceptional-Jordan structure may select a finite orbit or stabilizer of nested flags. The continuous Standard-Model group could reappear only after extending scalars or taking the real stabilizer of the selected flag.

### VOA and modular completion

The Monster may act on a vertex operator algebra or global Hilbert space, while \(Spin_0(2,3)\) acts locally on a boundary/response sector. A bridge would require a partition function, module decomposition, commutant or sewing law.

### Common finite subgroup

Both structures may contain isomorphic finite subgroups. This is a comparison of subgroups, not an identification of the parent groups.

## 6. Consequence for the Leech selector proposal

Exact lattice preservation and faithful continuous gauge action cannot occur on the same carrier at the same level.

The arithmetic branch must specify a two-stage architecture such as

\[
\text{integral admissibility}
\longrightarrow
\text{selected real flag}
\longrightarrow
\text{continuous stabilizer after scalar extension}.
\]

Without the middle map, “the Leech lattice explains the gauge group” is incomplete.

## 7. Consequence for Moonshine

Moonshine can still constrain:

- graded spectra;
- modular partition functions;
- state degeneracies;
- defect categories;
- global dualities;
- genus-one or genus-two sewing.

It cannot be inferred from the local occurrence of \(Spin(2,3)\), a \(-1\) holonomy or a braid representation alone.

The bridge must produce a modular object on which both sides act in stated roles.

## 8. Stop-everything criteria

**Advance arithmetic selection:** construct an integral Jordan flag whose real scalar extension has the required continuous stabilizer while its integral stabilizer fixes charge or generation data.

**Advance Moonshine:** derive a partition function, VOA module or genus-two sewing object with a verified Monster action and a stated \(Sp(4,\mathbb Z)\) transformation law.

**Reject direct identification:** any proposal requiring a nontrivial continuous homomorphism from \(Spin_0(2,3)\) into the Monster or exact Leech automorphism group is ruled out.

**Demote the branch:** if the integral structure supplies no canonical flag, charge lattice or modular object beyond sharing octonionic ambient space.

## 9. Certificate

The [connected/discrete separation certificate](../../../verification/verify/verify-connected_lattice_symmetry_separation.mjs) records the general connected-image theorem and verifies its elementary \(SO(2)\) versus \(\mathbb Z^2\) model.

## Companion documents

- [Octonions, Leech lattice, and exceptional-Jordan branch](../0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Three-strand braid central twist](../0000-0099/57_braid_central_twist_to_sp4z_branch.md)
- [Metaplectic loop interferometer](135_minimal_metaplectic_loop_interferometer.md)
- [Grand synthesis](../0000-0099/40_grand_synthesis_spin23_pole.md)
