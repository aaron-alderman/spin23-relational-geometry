# E8 thermodynamic-gap route audit

**Status:** perturbative route numerically plausible; no theorem certificate yet  
**Machine authority:** [local dressing budget](../../../evidence/data/translation-free-e8-local-dressing-budget-v1.json)

The finite projected-chain evidence now has a stable gap, a one-quantum carrier, a phase-sensitive dispersion and a 99.932% first-pole drive residue. The remaining question is not whether widths three through six look gapped; it is which theorem can convert the local Hamiltonian into an infinite-volume lower bound without smuggling in frustration freedom.

## Applicability firewall

Knabe-style criteria are powerful for frustration-free positive local terms, including later boundary refinements. No compatible frustration-free projector decomposition has been established here, so the measured open-chain gaps cannot simply be inserted into those thresholds. General one-dimensional translation-invariant chains also admit spectral-gap undecidability constructions, so a flat finite ladder is never a universal proof by itself.

The structurally appropriate literature is weak perturbation theory around non-interacting gapped lattice systems. Yarotsky proves stability of the ground state and gap for suitable relatively bounded perturbations, and separately constructs quasiparticles from isolated one-site eigenvalues. That is strikingly close to the observed carrier, but applicability requires the paper's relative-bound and smallness hypotheses to be checked for this exact projected bond Hamiltonian.

Primary references:

- [Yarotsky, relatively bounded perturbations of classical lattice systems](https://arxiv.org/abs/math-ph/0412040)
- [Yarotsky, quasiparticles in weak perturbations of non-interacting lattice systems](https://arxiv.org/abs/math-ph/0411042)
- [Lemm and Mozgunov, frustration-free finite-size criteria with boundary](https://arxiv.org/abs/1801.08915)
- [Bausch, Cubitt, Lucia and Perez-Garcia, one-dimensional spectral-gap undecidability](https://arxiv.org/abs/1810.01858)

## Exact local budget

At $J=0.05$, the isolated-cell gap is 0.21836949. Removing the optimal scalar bond shift—which cannot affect a gap—leaves a two-site interaction norm equal to 0.12876 of that gap. Vacuum-to-two-excitation coupling is 0.02643 of the local gap, and one-to-two-sector coupling is 0.08013 of the bare one-to-two separation. These local ratios are consistent with the directly measured small dressing cloud and pole leakage.

They are not a theorem threshold. The next rigorous tranche must select one perturbative theorem, choose any required site blocking, and translate every hypothesis into interval-safe matrix inequalities. If its constants fail, the honest alternative is a certified tensor-network or parent-Hamiltonian route—not relabelling the present finite-size plateau as a proof.
