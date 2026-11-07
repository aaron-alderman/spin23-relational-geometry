# Assurance topics, sagas and product maturity

Status: an engineering assurance offering for the personal website. The levels describe scoped evidence maturity; they are not a scientific status, a WCAG conformance designation or an overall product-quality score.

The [assurance index](https://aaronalderman.com/assurance/) presents independent topics. [Identity and world coherence](https://aaronalderman.com/assurance/identities/) is the first worked example. [Accessibility](https://aaronalderman.com/assurance/accessibility/) and [internationalisation](https://aaronalderman.com/assurance/internationalisation/) are separate topics with separate sagas, evidence gates and roadmaps. The [maturity view](https://aaronalderman.com/assurance/maturity/) brings their profiles together.

## Evidence levels

| Level | Meaning |
| --- | --- |
| 0 — Unassessed | No scoped assurance assessment is recorded. This does not judge the underlying product's quality. |
| 1 — Scoped | Purpose, coverage and evidence obligations are declared. |
| 2 — Mechanically checked | The required automated checks pass within that stated scope, with required policy declarations present. |
| 3 — Human reviewed | A dated, attributed review addresses judgment-dependent obligations. |
| 4 — Experienced in use | Relevant people have exercised representative journeys and findings are recorded. |
| 5 — Maintained | Ownership, reassessment and regression evidence support continued assurance. |

Every required gate at a level, and every earlier level, must have matching evidence. Missing, failed, ambiguous, differently scoped or incompletely attributed receipts block promotion. A failed lower-level check can lower the recorded level. An undefined intermediate level cannot be crossed through a vacuous all-pass result.

The initial website scope is the root and four identity homepage entry routes. Identity coherence has bounded structural evidence alongside its unresolved discovery work. Accessibility checks document language markers, a skip link and its target, and image alt-attribute presence. Empty alt text is counted as present; whether it is appropriate remains a human question. Keyboard operation, focus order, assistive technology, zoom/reflow, visual judgment and journeys with disabled participants are separate obligations. These checks do not cover the full catalogue applications or establish WCAG conformance.

Internationalisation has its own scope declaration and language/UTF-8 observations. Target audiences, supported locales, default and fallback policy, localisable content, locale-sensitive behaviour and linguistic/cultural review remain open. Existing English markup is not used to infer that those capabilities are implemented or absent throughout the product.

The framework follows the distinctions explained by [W3C accessibility evaluation guidance](https://www.w3.org/WAI/test-evaluate/) and [W3C's internationalisation/localisation overview](https://www.w3.org/International/questions/qa-i18n). The six evidence levels are this offering's engineering scheme, not a W3C ranking scheme.

Language and encoding observations may support obligations in more than one saga. That reuse remains one evidence family, not multiple independent confirmations. The profile does not sum or average those observations into an overall confidence score.

## Roadmap and maturity profile

Each unsupported obligation produces a roadmap item with its product, saga, target level, state, action and owner. Items at the first unachieved level are marked next; later obligations remain visible. Owner assignments and delivery dates remain open rather than being invented by the report.

Product maturity is presented as a profile across topics. A catalogue delivery label such as “Live example”, “Foundation” or “In progress” cannot supply an assurance level. Each of the 18 catalogue products now has a separately scoped assessment of its generated entry route and its homepage catalogue identity binding. Nested pages, authenticated flows, runtime states and remote services remain outside that assessment. No composite score averages away an unresolved accessibility, locale or identity obligation.

## Catalogue front-door assessments

The algebra derives the assessment set from `source/hierarchy.json`; it does not maintain a second list of product routes. Each entry is read from the current generated publication. Missing route output fails the build rather than receiving a successful receipt. The scope policy is declared in `assurance.catalogue.policy` and each product receives its own `catalogue-entry/<id>/1` evidence scope.

Automatic identity evidence establishes that the generated entry exists and the matching homepage catalogue row is identity-mapped. It does not decide which internal product relationships should be invariant or identity-mapped. That decision remains a semantic-review obligation. Selected accessibility observations check a nonempty document-language marker, image alt-attribute presence and a recognisable skip link with one matching destination. Temple's `#gate` destination is supported alongside the other entries' `#main` targets. Empty alternative text is presence evidence only.

Language and UTF-8 observations support the internationalisation metadata gate. Locale commitments, localisable content and locale-sensitive behaviour remain unevidenced. All entry profiles currently reach identity level 2, accessibility level 2 and internationalisation level 1. Human evaluation, audience use and maintenance remain open for every product. These are bounded front-door findings, not full-application assurance.

The scanner uses the existing algebra attribute grammar, narrowed to the attributes needed by these checks. Comments and opaque script/style/textarea blocks cannot supply positive markup observations. Template markup blocks automatic promotion pending further inert-content evaluation. Broken or duplicate skip destinations, missing alt attributes and empty language markers fail their associated mechanical gate. Browser behaviour, CSS internals, external dependencies and the meaning of text or images require further evidence.

`assurance/catalogue.json` records each route, observation, scope, receipt, topic profile and outstanding obligation. Unsupported gates generate product-specific roadmap items with unique product/obligation identities. The maturity page links its product matrix to expandable assessments showing automatic support, failures and outstanding evidence. Shared wording across those records is not independent corroboration.

The assurance visual language uses an ivory and pale-green field, teal shield artwork generated as SVG nodes, distinct topic colours and evidence-level bars. All rendering and scoped style rules remain algebra-owned. The shield expresses care and protection; it supplies no evidence or certification.

## Algebra and evidence authority

`AssuranceTopic`, `AssuranceSaga`, `AssuranceLevel`, `AssuranceObligation` and `AssurancePolicy` facts in `applications/aaronalderman-hierarchy/source/hierarchy.rel` declare the offering. The `assurance.entry.observe`, `assurance.saga.classify`, `assurance.catalogue.*`, `assurance.portfolio.build` and `assurance.portfolio.document` queries in `algebra/publication.process.json` own observation, classification, roadmap projection and rendering.

`assurance/topics.json` publishes topics, levels, saga gates, product profiles and roadmap items. `assurance/entry-markup.json` records the current generated-page observations used by the limited accessibility and internationalisation checks. Existing identity JSON endpoints under `/assurance/` remain available; the detailed identity HTML offering moves to `/assurance/identities/`. Legacy identity-status anchors at the index link to the detailed offering.

The classifier checks the receipt's obligation, kind, scope, source, issuer, method, observation date and result. That metadata does not authenticate a reviewer, perform an evaluation or guarantee continuing validity. This release supplies authored scope declarations and current-build mechanical observations; it supplies no human-review, audience-use or maintenance receipts. Those higher-level claims require separately authored evidence and accountable review.

All application behavior stays in the admitted algebra. Native ports, grants and execution limits are unchanged. Rebuilds generate current observations and roadmap state; there is no scheduled automation or new external publication service.
