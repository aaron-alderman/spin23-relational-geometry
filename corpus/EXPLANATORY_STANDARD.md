# Explanatory standard: things, reasons, differences and optional readings

This standard governs reader-facing explanations, syntheses, bridge claims, graph edges and proposed physical interpretations. It supplements the [reading contract](READING_CONTRACT.md). The contract fixes the programme's explanatory direction; this document fixes how any individual connection must be explained.

## 1. Begin with things before abstractions

Use this order whenever possible:

\[
\text{thing or setup}
\longrightarrow
\text{observed relation}
\longrightarrow
\text{allowed operation}
\longrightarrow
\text{quantity preserved or changed}
\longrightarrow
\text{mathematical structure}
\longrightarrow
\text{technical name}.
\]

Do not begin with a named algebra, group, topology or effect when the reader can first be shown the preparation, table, path, boundary, update or record that earns the name. For example, begin with two coupled readouts and their response table before introducing \(H_2(\mathbb R)_+\); begin with transport around a loop and a changed return before introducing holonomy.

Technical language is retained where it carries precision. It is introduced as earned compression, not as an entrance requirement.

## 2. Every connection must carry a reason

Adjacency, a shared name, a similar diagram or an unlabeled arrow is not an explanation. Every material connection must identify:

1. **Source thing:** what exists on the left, including its type and carrier.
2. **Target thing:** what is claimed on the right, including its type and carrier.
3. **Like because:** the shared operation, invariant, construction, universal property or observable.
4. **Different because:** the changed carrier, type, boundary, scale, real form, topology, dynamics, detector or information content.
5. **Difference-maker:** the operation or missing datum responsible for that difference.
6. **Status:** mathematical and physical status reported independently.
7. **Implication:** exactly what transfers across the connection.
8. **Non-implication:** the nearest tempting conclusion that does not transfer.
9. **Discriminator:** the proof, calculation, control or observation that would close, separate or kill the remaining alternatives.

For a relation matrix or graph reduction, also publish the **relation-loss
ledger**:

1. whether source and target roles occupy distinct rails;
2. whether relation types remain distinct channels;
3. which inner product or positive weight makes the adjoint meaningful;
4. whether reverse arrows are authored, formal or absent;
5. whether paths compose before or after the reduction;
6. the exact quotient map to adjacency, Laplacian, response or detector space;
7. the rank, kernel or other scar created by that quotient; and
8. which oriented or typed record could reveal the lost distinction.

The preferred default for finite authored relations is the free typed two-rail
Gram lift of AZ-126. A smaller scalar matrix may still be correct, but its
direction and type losses must be stated rather than treated as properties of
the original relation set.

For transformation claims, also identify the **invariance depth**:

- **pointwise:** \(M_x^T\Omega_xM_x=\Omega_x\);
- **carried:** a compatible connection satisfies \(\nabla\Omega=0\);
- **global:** the return holonomy is specified, and may preserve \(\Omega\)
  without being the identity.

Use the intuitive names **living carrier**, **perspective transformation**,
**mirror face** and **locally invariant carrier** where they improve
explanation, but accompany them with their exact carrier and action. Local
invariance must never be silently upgraded to global triviality.

When a two-dimensional generator appears, state its square class before using
motion language: negative square is elliptic/complex, positive square is
hyperbolic/split-complex, and square zero is parabolic/dual. Distinguish a
discrete map from the Lie-algebra role of the same matrix. In particular, the
rail swap may be anti-symplectic as a map even when its exponential as a
generator is symplectic.

When a negative-square direction and positive-square reflection anticommute,
name the resulting local \(Cl(1,1)\cong M_2(\mathbb R)\) cell, but do not stop
there. State whether the pair is real-linear or antiunitary, which response
object it preserves or exchanges, whether it descends through the declared
quotient, and which source semantics make the grading and exchange canonical.
Repeated local algebra is evidence for a reusable grammar, not for a shared
carrier or physical mechanism.

When using the carrier--selector--detector grammar, identify the physical
degree of freedom, the intervention that changes the selected face and the
closed-loop invariant separately. Demonstrate that allowed local relabellings
leave the detector record fixed. A third component, measurement or fitted
parameter is not a triality detector merely because it is numbered three.

The compact prose grammar is:

> **Because — but — therefore — still open.**  
> \(A\) is like \(B\) because map or mechanism \(M\) preserves \(P\). It differs in \(D\) because \(Q\) changes, removes or adds specified information. Therefore \(P\) transfers, but conclusion \(R\) does not. The remaining question is open or closed under condition \(C\), and test \(X\) would decide it.

## 3. Open and closed are two-dimensional

Never allow “closed” to blur mathematical completion with physical realization.

| Mathematical relation | Physical identification | Reading |
|---|---|---|
| Closed | Closed | An exact map and an established physical realization are both available. |
| Closed | Open | The mathematics is exact on a declared carrier; nature's carrier, mechanism or scale remains unidentified. |
| Open | Closed | A reproducible observation exists but its sufficient mathematical or mechanistic account remains unsettled. |
| Open | Open | The connection is an investigative lead, analogy or speculative reading. |
| Ruled out under assumptions | Not applicable | The declared bridge fails; state the assumptions and any legitimate reopening condition. |

When useful, add experimental status separately: uninstrumented, calculable, simulation-ready, instrumented, measured or excluded within sensitivity.

## 4. State implications and non-implications together

Every bridge should answer both questions:

- What becomes available if this connection is accepted?
- What attractive stronger conclusion remains unavailable?

Examples:

- Exact Jordan/TKK closure implies a definite conformal transformation algebra for the declared positive response carrier. It does not imply that the carrier is physical spacetime.
- Exact symplectic invariance joins \(M\) to the mirror action \(M^{-T}\) and induces an orthogonal action on primitive two-forms. It does not imply that the four-dimensional carrier is spacetime or that the five-dimensional relation space consists of physical extra dimensions.
- A common presentation \(\mathbb R[u]/(u^2-\kappa)\) classifies elliptic, hyperbolic and parabolic local flows. It does not imply that changing \(\kappa\) is a physical Wick rotation or phase transition.
- Nontrivial holonomy implies path-dependent return or frame transport. It does not imply selection of one member of a symmetric orbit without an independently sourced odd datum.
- Shared spectral response can allow transport data to constrain a Casimir calculation. It does not imply a no-refit force prediction without the required frequency range, tensor components, geometry and nuisance control.

Negative implications are part of the result. They keep similar shapes from being silently identified.

## 5. Pictures and speculative readings form a menu

After the reason-bearing core is complete, an explanation may offer several ways to picture it. Label them as optional. Useful pictures include landscape, grammar, workshop, transport network, constraint surface, ecology, conversation and atlas.

For each picture state:

- what it illuminates;
- what it hides or may misleadingly suggest; and
- which formal claim remains when the picture is removed.

Speculative readings must use possibility language and name their promotion condition:

> **One possible reading is …**  
> It illuminates …  
> It is not required for …  
> It would become more than interpretation if …

These readings are a menu, not a ladder of required belief. A reader may use the theorem without accepting the ontology, use an experiment without accepting a visual metaphor, or reject every speculative continuation.

### Deletion test

Delete the picture or speculative paragraph. If the exact claim, its reason, status and test no longer stand, the supposedly optional material contains a hidden premise and must be promoted into the argument or removed.

### Substitution test

Replace one picture with another. If landscape, grammar, network and measurement pictures recover the same typed objects, maps and implications, the formal structure carries the claim. If the conclusion changes with the picture, the analogy has acquired unearned authority.

## 6. Prefer reason-bearing verbs to generic arrows

| Verb | Required meaning |
|---|---|
| **records** | A specified measurement produces data about a thing. |
| **represents** | One object encodes another under a declared dictionary. |
| **constrains** | A condition narrows the allowed values of another object. |
| **preserves** | An operation leaves a named quantity or relation unchanged. |
| **induces** | A stated construction produces another structure. |
| **generates** | Repeated declared operations span or close an object. |
| **is isomorphic to** | A reversible structure-preserving map exists at the named level. |
| **selects** | A physically supplied datum distinguishes one member of a family. |
| **detects** | Recorded outcomes distinguish declared alternatives at a stated sensitivity. |
| **suggests** | A resemblance motivates investigation but supplies no bridge. |
| **requires enrichment** | The source lacks named data needed to construct the target. |
| **rules out identification** | A proved or observed mismatch blocks the proposed equivalence under stated assumptions. |

Avoid “leads to,” “is related to” and “emerges” unless the following sentence names the map or mechanism.

## 7. Standard bridge card

Use this block for important cross-domain claims:

> **Things compared:**  
> **Why alike:**  
> **Why different:**  
> **Reason for the difference:**  
> **Mathematical status:**  
> **Physical status:**  
> **Implication:**  
> **Does not imply:**  
> **Optional pictures:**  
> **Alternative or speculative readings:**  
> **Next discriminator:**

Not every short paragraph needs the visible template, but every substantive bridge must make its contents recoverable.

## 8. Audit questions

Before publication, ask:

- Can a reader point to the things before encountering their technical names?
- Does every arrow have a map, mechanism or explicit “suggests” label?
- Is the source of likeness distinguished from the source of difference?
- Are mathematical closure and physical realization reported separately?
- Are implication and non-implication adjacent?
- Can every optional picture be deleted or substituted without changing the claim?
- Does each open edge name the datum or discriminator that could change its status?

The aim is not to eliminate abstraction. It is to make abstraction answerable to things, reasons, differences and possible tests.

## 9. Order the ending: practical hope before optional arcs

A synthesis should complete its scientific argument before opening symbolic or theological readings:

1. **Here is where to look.** Name the bounded calculation, apparatus, dataset or proof edge.
2. **Here is the useful ordinary return.** State the theoretical or engineering improvement available if established physics survives.
3. **Here is what would count as new physics.** Predeclare the residual, controls and decision rule; do not call unexplained noise an anomaly.
4. **Here are desired endpoints.** Mark them as aims rather than predictions.
5. **Here is an optional menu of speculative, mythic and theological readings.** State assumptions and prevent conclusions from flowing backward into the physics.

The [optional-endpoints synthesis](syntheses/admissibility_optional_endpoints_mythic_and_theological_readings.md) implements this ending. Its theological analysis explicitly assumes that God exists; it does not infer God from the scientific programme.

## 10. Do not infer a transition from a destination

Whenever a physical claim involves decay, capture, emission, absorption, a
spectral lifetime or operator-limited metastability, the explanation must keep
the following things separate:

1. the prepared initial sector and possible final sectors;
2. the physical interaction operator that could connect them;
3. the tensor, multipole or other transformation type of that operator;
4. the reduced or full matrix element, including any exact or approximate zero;
5. final-state phase space and competing channels;
6. intrinsic population decay, coherence loss and environmental broadening;
7. polarization or angular information retained by the measurement; and
8. detector acceptance, time window and the perturbation that can reopen a
   closed or weak channel.

A lower-energy state is a possible destination, not by itself a decay route.
A symmetry-allowed channel need not have appreciable strength, and a measured
linewidth need not be a natural lifetime. Conversely, “forbidden” means zero
for a named operator in a stated approximation; it does not mean impossible
under every higher-order interaction, environment or symmetry-breaking
perturbation.

This ledger is not required for an effective pole, resonator or hysteresis
model that makes no microscopic transition claim. Such a document must instead
say that its width or escape law is effective and identify the additional
operator-level data needed for a microscopic interpretation. Barrier crossing,
detector lag, dephasing and radiative or weak decay are not interchangeable
forms of metastability.

The established reference bridge is [AZ-127: transition operators, selection
rules and lifetime frontier](programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md).
