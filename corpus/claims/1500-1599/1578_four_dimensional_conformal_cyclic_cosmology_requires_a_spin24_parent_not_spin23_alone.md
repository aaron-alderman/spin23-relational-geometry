# Four-Dimensional Conformal Cyclic Cosmology Requires a Spin(2,4) Parent, Not Spin(2,3) Alone

**Date:** 20 October 2026

**Gates:** A1, A4 and A8

**Status:** exact group-role separation and conditional hierarchy; no crossover dynamics derived

**Depends on:** [the physical-state gate](../1200-1299/1220_the_a4_physical_state_gate_blocks_the_typed_action_but_rejects_only_the_naive_two_time_reading.md) and [the genuine primitive-form Spin(2,3) module](../0700-0799/745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)

**Evidence:** [CCC conformal-parent ledger](../../../evidence/data/spin23-ccc-conformal-parent-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_ccc_conformal_parent_gate.mjs)

## Result

Conformal cyclic cosmology cannot be assigned to \(Spin(2,3)\) solely
because that group already appears in the gravity programme.  In four
spacetime dimensions the local conformal group is \(SO(2,4)\), with double
cover \(Spin(2,4)\), and

\[
\dim\mathfrak{so}(2,4)=15.
\]

By contrast,

\[
\dim\mathfrak{so}(2,3)=10,
\qquad
\dim\mathfrak{so}(1,3)=6,
\]

and

\[
SO(2,3)/SO(1,3)
\]

has dimension four: the natural role of \(SO(2,3)\) here is AdS4 isometry
or, in a different interpretation, the conformal group of 2+1 dimensions.

The smallest honest hierarchy for a four-dimensional cyclic-conformal
branch is therefore

\[
\boxed{Spin(2,4)\longrightarrow Spin(2,3)\longrightarrow Spin(1,3).}
\]

The first arrow is a new parent/phase hypothesis.  It is not supplied by
the existing Spin(2,3) construction.

## Crossover as a typed portal

CCC joins the future conformal infinity of one aeon to the conformally
stretched Big Bang boundary of the next across a spacelike three-surface.
This is a boundary portal, not a traversable spatial Stargate.  A programme
admission requires:

1. a selected conformal factor or dynamics that fixes it;
2. junction conditions for the conformal metric and all retained matter;
3. current and stress-flux matching across the crossover;
4. treatment of massive fields, entropy, anomalies and quantum state data;
5. derivation of the Spin(2,3) phase inside the conformal parent.

The conformal factor is not bookkeeping.  Its non-uniqueness is a known
technical gate; see [Stevens and Markwell, *Toward fixing a framework for
conformal cyclic cosmology*](https://arxiv.org/abs/2212.06914).  The recent
physical crossover proposal is [Meissner and Penrose, *The Physics of
Conformal Cyclic Cosmology*](https://arxiv.org/abs/2503.24263).  These are
inputs to test, not validation of the present programme.

## Connection to the symmetry-breaking factory

The constructive possibility is that \(Spin(2,4)\) supplies the conformal
carrier between aeons, while a repeated selector chooses a \(Spin(2,3)\)
Cartan phase and then its Lorentzian \(Spin(1,3)\) face within each aeon.
That would make the crossover a reset of scale but not automatically a
reset of topological, gauge or quantum information.  Exactly which data
cross is the decisive junction problem.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ccc_conformal_parent_gate.mjs
~~~
