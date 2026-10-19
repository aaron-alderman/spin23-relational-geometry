# Corpus canonicalization and next actions

## Recommended target structure

Do not rewrite the original corpus in place yet. Create a canonical layer that points back to it.

```text
physics-canonical/
  00-status.md
  sources/
  claims/
  models/
    reduced-spin23/
    parent-tournament/
    internal-furey/
    analogue-models/
  calculations/
  observables/
  negative-results/
  archive-map/
```

The original corpus remains provenance. The canonical layer contains only admitted current statements.

## One source of truth

Choose one structured fact snapshot—REL or JSON—as canonical. Generate:

- Markdown claim ledger;
- branch/world matrix;
- paper claim tables;
- open-problem register;
- source ledger;
- supersession map.

Do not manually maintain all of these independently.

## Immediate cleanup

1. Repair two absolute machine paths in `spin2_3/research/round1/lat-w1-b2-c2-dictionary.md`.
2. Repair three broken references in `spin2_3/ASSOC_SPIN23_OVERLAP.md`.
3. Remove or ignore four `.pyc` cache files.
4. Add explicit status headers to the symmetry monolith, Spin(2,3) compendium and NS Word handoffs.
5. Link archive documents to successors.
6. Record hashes for rendered DOCX/PDF pairs and state which source controls.

## Scientific work sequence

### 1. Complete the representation audit

Produce one machine-checkable table for every proposed physical state:

\[
(SU(3)_c,SU(2)_L,Y),\quad Q,\quad\text{chirality},\quad
\text{family},\quad\text{carrier},\quad\text{projector}.
\]

Then compute perturbative and global anomalies. This should precede further discussion of “three generations.”

### 2. Choose the conservative geometric ontology

Begin with Spin(2,3) Cartan geometry on four-dimensional spacetime rather than a literal second physical time. This gives a tetrad/spin connection route without immediately creating ultrahyperbolic and ghost problems.

Keep the literal two-time branch registered, but require a complete first-class constraint analysis before using it for mass or transport.

### 3. Write one minimal action

The action should contain:

- geometric/selector sector;
- Furey-style internal module;
- gauge fields;
- Higgs/scalar sector;
- fermionic Dirac operator;
- all portal terms allowed by the surviving symmetries.

Derive both currents and stress–energy from it. Do not use independently chosen visibility and gravity kernels.

### 4. Linearise and count

Compute:

- physical degrees of freedom;
- kinetic signs;
- pole masses and residues;
- residual gauge group;
- constraint algebra;
- well-posedness/hyperbolicity;
- selector stress tensor.

Stop if negative-norm physical modes remain.

### 5. Match to effective field theory

Reduce to

\[
\mathcal L_{\rm SM}+\mathcal L_{\rm GR}
+\sum_i c_i\mathcal O_i/M_*^{d_i-4}.
\]

Existing collider, flavour, Lorentz, clock and equivalence-principle bounds should eliminate parameter space before a new experiment is designed.

### 6. Select one observable

The observable must:

- distinguish at least two live branch worlds;
- be invariant under basis conventions;
- use the same parameter in laboratory and gravitational/geometry response;
- include a null model and uncertainty budget;
- have a predeclared failure condition.

The audio and phonon systems can prototype the method, but their results must remain analogue-labelled.

## Publication disposition

| Material | Recommended output |
|---|---|
| Paper 1 two-branch model | mathematical/nonassociative transport paper |
| Paper 2 DIII winding | topology paper after independent symmetry audit |
| Paper 3 Chern plateau softening | open-system/topological-matter paper |
| SRP17 selector spectra | mathematical methods/result note |
| SRP14 parent tournament | methodology/negative-result note |
| Furey crosswalk | algebraic comparison paper or appendix |
| NS/Jordan handoffs | no paper until analytic gaps and canonicity are independently closed |
| full fundamental synthesis | premature |

## Definition of completion for the next phase

The next phase is complete when:

1. one canonical claim graph generates all status views;
2. every older high-level claim has a current status or supersession link;
3. the physical state/anomaly table passes;
4. one minimal action is explicit;
5. its linearised spectrum is ghost-free;
6. at least one branch-discriminating observable is expressed in operational units;
7. the null model remains in the comparison;
8. no paper conclusion exceeds its model-local authority.

Until then, the honest programme label is:

> **A mathematically rich, branch-aware research laboratory for constrained Spin(2,3)-related geometry and division-algebraic internal structure, with several exact local results but no admitted fundamental or empirical completion.**

