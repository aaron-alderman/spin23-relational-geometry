# The Distinctive Learning Path Is Obstruction-Driven Relational Response Learning, Not Learning in General

**Date:** 19 October 2026  
**Branches:** physical learning, passive response, Jordan carrier, \(Spin_0(2,3)\), structural revision, identifiability  
**Claim status:** novelty hypothesis and theorem programme; individual ingredients are established

## Short answer

Yes. There is something potentially distinctive about the learning path, but it is not the statement that matter can learn, that passive systems can be identified, or that Hamiltonian structure can be preserved during learning. Those are established.

The potentially distinctive object is this whole constrained ladder:

\[
\boxed{
\begin{aligned}
\text{positive relational carrier}
&\longrightarrow
\text{causal response realization}\\
&\longrightarrow
\text{error-sensitive parameter change}\\
&\longrightarrow
\text{retention}\\
&\longrightarrow
\text{complexity-priced structural change}\\
&\longrightarrow
\text{an equivalence class of admissible new models}\\
&\longrightarrow
\text{microscopically generated candidates}.
\end{aligned}}
\]

At every stage, the next operation is introduced only after an explicit obstruction proves the previous one insufficient. This makes the programme less like an optimization algorithm and more like a **minimal obstruction-driven theory of physical model revision**.

The most unusual part is that what learns is not merely a state or a vector of weights. The system modifies the passive realization through which it responds to the world—its poles, residues, relationship rays and eventually its model order—while remaining inside a positive causal cone.

## 1. What is not unique

The following surrounding ideas have substantial prior literature:

- physical networks and materials can learn through local relaxation;
- passive and port-Hamiltonian systems can be identified from data;
- Hamiltonian, symplectic and dissipative structure can be preserved in learned models;
- adaptive control can change uncertain physical parameters;
- positive-real interpolation and network synthesis can reconstruct passive realizations;
- model order can be selected or adapted using error and complexity criteria;
- detailed balance can implement probabilistic model selection;
- finite inverse problems are generally nonunique.

For example, Ortega and Yin explicitly study unique identification and structure-preserving learning of linear port-Hamiltonian systems: [Learnability of Linear Port-Hamiltonian Systems](https://jmlr.org/beta/papers/v25/23-0450.html). Adaptive structure-preserving reduction also changes reduced ranks using error indicators: [Fully Adaptive Structure-Preserving Hyper-reduction of Parametric Hamiltonian Systems](https://doi.org/10.1137/23M1601225).

So a novelty claim cannot be:

\[
\text{“we preserve physics while learning.”}
\]

That territory already exists.

## 2. The first distinctive feature: learning the response law rather than only the state

Ordinary state dynamics evolves

\[
x_{t+1}=F_\theta(x_t,u_t)
\]

with fixed law \(F_\theta\). Parameter learning changes \(\theta\), but often treats the learned model as an external representation.

Here the hierarchy is physical:

\[
\begin{aligned}
x &:\text{ fast carrier state},\\
s &:\text{ retained adaptive state},\\
R_s(z)&:\text{ causal response seen by probes},\\
\mathcal M_s&:\text{ passive realization producing }R_s.
\end{aligned}
\]

The physical system contains the degrees of freedom that modify its own response:

\[
\mathcal M_s=(M(s),B(s)),
\qquad
R_s(z)=B(s)(M(s)-zI)^{-1}B(s)^T.
\]

The learned object is therefore not just “the next state.” It is the map determining how later perturbations become observable responses.

This is close to adaptive control and physical learning, but the programme gives it a specific spectral ontology:

\[
\text{learn}
=
\text{move poles, residues, ray directions or realization order}
\]

subject to Herglotz positivity.

## 3. The second distinctive feature: the carrier is a symmetric cone

The response is not an unconstrained matrix. It lives in

\[
H_2(\mathbb R)_+
\]

or its causal matrix-Herglotz extension. This cone is simultaneously:

- the positive cone of a Euclidean Jordan algebra;
- the space of positive two-face responses;
- a Lagrangian graph chart;
- the carrier whose conformal group is
  \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The learning rule must preserve:

\[
\operatorname{Im}R(z)\succeq0
\quad(\operatorname{Im}z>0),
\]

not merely reduce a numerical loss. That connects optimization to realizability, passivity and causal spectral structure.

Port-Hamiltonian learning also preserves structure, so cone preservation alone is not a novelty result. The more specific candidate is:

\[
\text{Jordan-cone response learning}
+\text{spectral realization learning}
+\text{the }Spin(2,3)\text{ relational arity theorem}.
\]

## 4. The third distinctive feature: “three” enters before the learning rule

The programme did not choose three hidden layers or three update phases for aesthetic reasons. It found an arity obstruction:

1. One Lagrangian/Jordan state admits no nonzero fully \(Sp(4)\)-equivariant state-only feedback generator.
2. A transverse pair supplies a unique grading generator up to scale, but that generator fixes the two defining faces and has an indefinite Hessian.
3. A third face, positive relative to the pair, first supplies a canonical positive self-dual Hessian and healthy elliptic transport.

Schematically:

\[
\boxed{
1=\text{no equivariant update},\qquad
2=\text{relation without healthy motion},\qquad
3=\text{minimal positive transport}.
}
\]

This is potentially the most carrier-specific part of the learning path. It says learning cannot arise from an isolated self-state while retaining full covariance. It requires a relational surplus: carrier, comparison face and returned/target face.

That gives the physical comparator a geometric interpretation. Error is not an externally appended scalar; it is the discrepancy among a minimally sufficient set of relational faces.

## 5. The fourth distinctive feature: the ladder is generated by successive no-go results

The path is not a list of desirable cognitive capacities. Each rung answers a demonstrated failure:

| Rung | Construction | Obstruction it leaves |
|---|---|---|
| linear bath | causal memory | fixed realization |
| nonlinear quartic bath | pole backreaction | no selective retention |
| hysteresis | persistent modification | retains strength, not correctness |
| passive comparator | error-sensitive parameter learning | assumes correct model class |
| held-out residual | detects structural failure | does not generate a replacement |
| detailed-balance birth/death | selects supplied structures | candidate must already exist |
| positive inverse problem | admissible completions | finite data do not choose one |
| stress Ward quotient | physical candidate restriction | spectral functions remain free |
| microscopic spectrum | candidate grammar | calculation remains difficult |

This gives the programme a reproducible logic:

\[
\text{construct}
\longrightarrow
\text{test}
\longrightarrow
\text{prove insufficiency}
\longrightarrow
\text{add the minimum new type}.
\]

That is more distinctive than any single update equation.

## 6. The fifth distinctive feature: learning is explicitly stratified

The programme separates operations that are often blurred together:

\[
\begin{array}{rcl}
\text{adaptation} &:& \text{response changes with state},\\
\text{retention} &:& \text{change persists},\\
\text{parameter learning} &:& \text{error changes parameters},\\
\text{generalization} &:& \text{untrained response improves},\\
\text{failure detection} &:& \text{held-out data reject the model class},\\
\text{candidate generation} &:& \text{a new structure is proposed},\\
\text{structural selection} &:& \text{gain pays the complexity cost}.
\end{array}
\]

This is scientifically useful because each operation has a separate physical burden. A system may possess five of them while lacking the sixth. Calling all of them “learning” hides the exact missing mechanism.

## 7. The sixth distinctive feature: nonuniqueness is part of the learner

Documents 1150–1151 show that finite positive causal data and Ward identities generally determine an admissible family, not a unique realization.

Let

\[
\mathcal H_1\subset\mathcal H_2\subset\cdots
\subset\mathcal H_{\rm measure}
\]

denote one-pole, two-pole and general positive-measure response classes. A residual can force exit from \(\mathcal H_K\), but it need not select one element of \(\mathcal H_{K+1}\).

The natural learned object is therefore

\[
[\mathcal M]_{\mathcal D}
=
\left\{
\mathcal M:
R_{\mathcal M}\text{ matches data }\mathcal D
\text{ and satisfies the invariants}
\right\},
\]

possibly equipped with a posterior or thermodynamic weight.

That is a meaningful conceptual departure from “the learner discovers the model.” The learner carries a structured ambiguity until an intervention, sum rule or microscopic law breaks it.

This also matches the programme's broader epistemic discipline: uncertainty is not failure to complete the story; it is part of the state that must be transported.

## 8. The seventh distinctive feature: consciousness is used as a subtraction test

The consciousness spike did not add a preferred mysterious variable. It asked whether any rung required one.

At each stage the relevant function compiled into:

- nonlinear dynamics;
- metastability;
- physical comparison;
- detailed balance;
- model-class search.

The result is a methodological negative control:

\[
\text{do not attribute a function to consciousness}
\]

until every ordinary physical realization of that function has been excluded.

This is not a theory of phenomenal consciousness. It is a disciplined way to prevent explanatory gaps in learning from being renamed consciousness.

## 9. A compact mathematical formulation

The candidate formal object is a **relational passive learner**:

\[
\mathfrak L
=
(V_+,\mathcal R,\Theta,\mathcal G,\mathcal C,\mathcal U),
\]

where:

- \(V_+=H_2(\mathbb R)_+\) is the response cone;
- \(\mathcal R_\theta(z)\) is a \(V\)-valued Herglotz response;
- \(\Theta\) is a stratified realization space, including varying model order;
- \(\mathcal G\) maps physical residuals to allowed parameter or structural candidates;
- \(\mathcal C=\chi^2/2+\lambda K+\cdots\) is the physical comparison/complexity functional;
- \(\mathcal U\) is an invariant-preserving update or detailed-balance kernel.

The defining conditions would be:

1. **realizability:** every accepted \(\theta\) has a passive dilation;
2. **cone invariance:** updates preserve the positive Herglotz class;
3. **relational covariance:** the carrier update is defined from sufficient relational data, not an impossible state-only equivariant map;
4. **retention:** successful changes persist on a slower timescale;
5. **structural openness:** the realization stratum \(K\) may change;
6. **epistemic honesty:** nonidentifiable models remain an equivalence class;
7. **microscopic admissibility:** new structures come from a declared physical grammar.

This definition is not yet a theorem. It is now precise enough to compare against port-Hamiltonian learning, adaptive network synthesis, Bayesian system identification and physical coupled learning.

## 10. Where a defensible novelty claim could live

The strongest plausible claim is:

> A minimal obstruction-driven learning architecture on the \(H_2(\mathbb R)\) symmetric cone, in which the one/two/three relational arity obstruction, positive matrix-Herglotz realizability, retained error-driven adaptation, complexity-priced model-order change and explicit inverse-spectral nonidentifiability form one theorem package.

That claim is narrower and more credible than:

> Spin(2,3) explains learning.

The literature search finds close neighbors for structure-preserving port-Hamiltonian learning, physical learning, adaptive rank and passive identification. It has not located this exact theorem package. That makes it a promising novelty target, not an established priority claim.

## 11. What would make it genuinely unique

The programme needs at least one result that does not reduce to a relabelling of established system identification:

1. **An arity theorem for learning:** prove that three positive relational faces are minimal for a declared covariant error-driven update class.
2. **A Jordan-specific invariant:** exhibit a determinant, cross-ratio or triple-product quantity monotonically controlled by the learning dynamics.
3. **A forbidden-update theorem:** classify updates that lower error but cannot have a passive \(H_2\) realization.
4. **A sample-complexity reduction:** show that the three-ray/Jordan structure identifies a physical response with fewer measurements than generic passive identification.
5. **A carrier-specific experimental null test:** predict a channel relation that generic port-Hamiltonian learners do not satisfy.
6. **A microscopic closure theorem:** derive the candidate grammar from Standard-Model stress intermediate states and prove it is closed under the permitted structural updates.

Any one of these would turn an interesting synthesis into a technical contribution.

## 12. Decision

There is a distinctive learning path:

\[
\boxed{
\text{the system learns its own causal response realization}
\text{ through minimally sufficient relationships,}
\text{ while preserving positivity and carrying nonuniqueness explicitly.}
}
\]

Its probable novelty lies in the conjunction of:

- relational arity;
- symmetric-cone geometry;
- passive spectral realizability;
- obstruction-driven addition of learning capacities;
- structural birth/death;
- and honest persistence of inverse ambiguity.

The next step is not to add another learning metaphor. It is to formalize the relational passive learner and prove either the arity theorem or a Jordan-specific forbidden-update theorem.
