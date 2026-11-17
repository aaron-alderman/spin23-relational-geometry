import { createHash } from "node:crypto";

import { uiComponentCatalogue, uiPatternCatalogue } from "./component-library.mjs";
import { resolveNativeComponent } from "./native-dom-adoption.mjs";

export const UI_APPLICATION_ADOPTION_PROTOCOL = "sourcery-ui-application-adoption/1";

const freeze = value => Object.freeze(value);
const COMPONENTS = new Set(uiComponentCatalogue.map(component => component.key));
const PATTERNS = new Set(uiPatternCatalogue.map(pattern => pattern.key));

function activeFacts(source = []) {
  const active = new Map();
  for (const fact of Array.isArray(source) ? source : source?.toArray?.() || []) {
    if (!fact?.s || !fact?.p || fact.o === undefined || fact.o === null) continue;
    const key = `${fact.s}\u0000${fact.p}\u0000${fact.o}`;
    if (fact.pol === "is-not") active.delete(key);
    else active.set(key, { ...fact, s: String(fact.s), p: String(fact.p), o: String(fact.o), pol: "is" });
  }
  return [...active.values()];
}

function indexFacts(source = []) {
  const facts = activeFacts(source);
  const bySubject = new Map();
  const byType = new Map();
  for (const fact of facts) {
    if (!bySubject.has(fact.s)) bySubject.set(fact.s, []);
    bySubject.get(fact.s).push(fact);
    if (fact.p === "isa") {
      if (!byType.has(fact.o)) byType.set(fact.o, new Set());
      byType.get(fact.o).add(fact.s);
    }
  }
  return freeze({
    facts,
    many: (subject, predicate) => (bySubject.get(subject) || []).filter(fact => fact.p === predicate).map(fact => fact.o),
    one: (subject, predicate, fallback = "") => (bySubject.get(subject) || []).filter(fact => fact.p === predicate).at(-1)?.o ?? fallback,
    subjects: type => [...(byType.get(type) || [])],
    hasType: (subject, type) => byType.get(type)?.has(subject) || false,
  });
}

function safe(value) {
  return String(value || "value").replaceAll(/[^A-Za-z0-9_.:-]+/gu, "-");
}

function keySubject(key, prefix) {
  return `${prefix}.${key[0].toLowerCase()}${key.slice(1)}`;
}

function attrIndex(index) {
  const result = new Map();
  for (const subject of index.subjects("DomAttr")) {
    const node = index.one(subject, "node");
    const name = index.one(subject, "name");
    const value = index.one(subject, "value");
    if (!node || !name || !value) continue;
    if (!result.has(node)) result.set(node, new Map());
    result.get(node).set(name, value);
  }
  return result;
}

const DEMAND_RULES = freeze([
  freeze({ key: "workflow-board", test: /workflowboard|kanban|board(?:\.|$)/u, meaning: "A state-grouped work board with semantic columns and movable work items.", candidate: "Board" }),
  freeze({ key: "workflow-column", test: /workflowlane|boardcolumn|kanbancolumn|laneheading/u, meaning: "One state or responsibility column inside a workflow board.", candidate: "BoardColumn" }),
  freeze({ key: "metric-display", test: /metric|\bstat\b|kpi/u, meaning: "A labelled quantitative measure with value, unit and state.", candidate: "Metric" }),
  freeze({ key: "status-badge", test: /badge|rowstatus|\.status|\.state|priority/u, meaning: "A compact categorical or lifecycle status indicator.", candidate: "Badge" }),
  freeze({ key: "evidence-record", test: /evidence|citation|sourceclaim|receipt/u, meaning: "A provenance-bearing evidence or citation record.", candidate: "EvidenceCard" }),
  freeze({ key: "timeline", test: /timeline|history|activity/u, meaning: "Chronological activity with retained event and provenance order.", candidate: "Timeline" }),
  freeze({ key: "work-queue", test: /queue|attentionitem|workitem/u, meaning: "An actionable ordered work queue with status and authority context.", candidate: "WorkQueue" }),
  freeze({ key: "relationship-graph", test: /relationship|graph|network/u, meaning: "An inspectable relationship graph rather than a flat collection.", candidate: "RelationshipGraph" }),
  freeze({ key: "visualization", test: /chart|visual|plot|(?:^|[._:-])map(?:[._:-]|$)/u, meaning: "A labelled data visualization with accessible alternate account.", candidate: "Visualization" }),
  freeze({ key: "time-entry", test: /timesheet|timeentry|calendar|datefield|period/u, meaning: "Date, time or period entry with locale-aware semantics.", candidate: "TimeField" }),
  freeze({ key: "money-display", test: /money|amount|currency|invoice|payment|receivable/u, meaning: "A currency-qualified monetary value.", candidate: "Money" }),
  freeze({ key: "approval", test: /approval|approve|reviewdecision/u, meaning: "A visible approval state joined to its authorized decision action.", candidate: "ApprovalPanel" }),
]);

function demandMatches(subject, tag) {
  const haystack = `${subject} ${tag}`.toLowerCase();
  return DEMAND_RULES.filter(rule => rule.test.test(haystack));
}

function componentForNode({ subject, tag, attrs }) {
  const name = subject.toLowerCase();
  const type = String(attrs.get("type") || "").toLowerCase();
  const exact = (component, basis = "native-semantic-element", loss = []) => ({ component, basis, loss });

  if (tag === "main") return exact("ApplicationShell");
  if (tag === "header") return exact("Header");
  if (tag === "footer") return exact("Footer");
  if (tag === "aside") return exact(name.includes("inspector") ? "Inspector" : "Sidebar", "native-landmark-and-subject-role");
  if (tag === "nav") return exact("NavigationList");
  if (/^h[1-6]$/u.test(tag)) return exact("Heading");
  if (tag === "label") return exact("Label");
  if (tag === "a") return exact("Link");
  if (tag === "button") {
    if (/icon|close|dismiss/u.test(name)) return exact("IconButton", "native-action-and-subject-role");
    if (/menu/u.test(name)) return exact("MenuButton", "native-action-and-subject-role");
    return exact("Button");
  }
  if (tag === "textarea") return exact("TextArea");
  if (tag === "select") return exact("Select");
  if (tag === "input") {
    if (type === "checkbox") return exact("Checkbox");
    if (type === "radio") return exact("RadioGroup");
    if (type === "search" || /search|query|filter/u.test(name)) return exact(COMPONENTS.has("SearchField") ? "SearchField" : "TextField", "native-input-and-subject-role");
    if (type === "date") return exact(COMPONENTS.has("DateField") ? "DateField" : "TextField", "native-input-type");
    if (type === "time") return exact(COMPONENTS.has("TimeField") ? "TimeField" : "TextField", "native-input-type");
    if (type === "number") return exact(COMPONENTS.has("NumberField") ? "NumberField" : "TextField", "native-input-type");
    return exact("TextField");
  }
  if (tag === "form") return exact(COMPONENTS.has("Form") ? "Form" : "Stack", "native-form-composition", COMPONENTS.has("Form") ? [] : ["form-semantics-composed-from-layout"]);
  if (tag === "table") return exact("DataTable");
  if (["thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col"].includes(tag)) return exact("Box", "native-table-part", ["part-bound-to-native-table-root"]);
  if (tag === "ul" || tag === "ol") {
    if (/filter|actions|toolbar/u.test(name)) return exact("Toolbar", "native-collection-and-subject-role");
    if (/timeline|history|activity/u.test(name) && COMPONENTS.has("Timeline")) return exact("Timeline", "native-collection-and-subject-role");
    return exact("List");
  }
  if (tag === "li") {
    if (/timeline|history|activity/u.test(name) && COMPONENTS.has("TimelineItem")) return exact("TimelineItem", "native-list-item-and-subject-role");
    if (/metric|stat|kpi/u.test(name) && COMPONENTS.has("Metric")) return exact("Metric", "native-list-item-and-subject-role");
    return exact("ListItem");
  }
  if (tag === "section" || tag === "article") {
    if (/evidence|citation|receipt/u.test(name) && COMPONENTS.has("EvidenceCard")) return exact("EvidenceCard", "native-region-and-subject-role");
    if (/approval|approve/u.test(name) && COMPONENTS.has("ApprovalPanel")) return exact("ApprovalPanel", "native-region-and-subject-role");
    if (/card|scenario|proposal/u.test(name)) return exact("Card", "native-region-and-subject-role");
    return exact("Panel");
  }
  if (tag === "div") {
    if (/workflowboard|kanban|board(?:\.|$)/u.test(name) && COMPONENTS.has("Board")) return exact("Board", "native-container-and-subject-role");
    if (/workflowlane|boardcolumn|kanbancolumn/u.test(name) && COMPONENTS.has("BoardColumn")) return exact("BoardColumn", "native-container-and-subject-role");
    if (/toolbar|filter|actions/u.test(name)) return exact("Toolbar", "native-container-and-subject-role");
    if (/inspector|detail/u.test(name)) return exact("Inspector", "native-container-and-subject-role");
    if (/metric|stat|kpi/u.test(name) && COMPONENTS.has("Metric")) return exact("Metric", "native-container-and-subject-role");
    if (/queue|attentionitem|workitem/u.test(name) && COMPONENTS.has("WorkQueue")) return exact("WorkQueue", "native-container-and-subject-role");
    if (/timeline|history|activity/u.test(name) && COMPONENTS.has("Timeline")) return exact("Timeline", "native-container-and-subject-role");
    if (/relationship|graph|network/u.test(name) && COMPONENTS.has("RelationshipGraph")) return exact("RelationshipGraph", "native-container-and-subject-role");
    return exact("Box", "generic-native-container", ["no-stronger-product-independent-component-role"]);
  }
  if (tag === "span") {
    if (/badge|status|state|priority/u.test(name) && COMPONENTS.has("Badge")) return exact("Badge", "native-inline-and-subject-role");
    if (/money|amount|currency|invoice|payment/u.test(name) && COMPONENTS.has("Money")) return exact("Money", "native-inline-and-subject-role");
    if (/metric|count|total|summary/u.test(name) && COMPONENTS.has("Metric")) return exact("Metric", "native-inline-and-subject-role");
    return exact("Text");
  }
  if (["p", "small", "strong", "em", "time", "legend"].includes(tag)) return exact("Text");
  if (["code", "pre", "kbd", "samp"].includes(tag)) return exact("Code");
  if (tag === "details") return exact("Details");
  if (tag === "summary") return exact("Button", "native-disclosure-trigger");
  if (tag === "progress" || tag === "meter") return exact("Progress");
  if (tag === "dialog") return exact("Dialog");
  if (["svg", "canvas", "img", "picture", "figure"].includes(tag)) return exact(COMPONENTS.has("Visualization") ? "Visualization" : "Box", "native-visual-media", COMPONENTS.has("Visualization") ? [] : ["visualization-provider-contract-missing"]);
  if (["option", "datalist"].includes(tag)) return exact("Text");
  return exact("Box", "generic-native-element", [`unclassified-native-tag:${tag || "unknown"}`]);
}

function pageSurface(index, page) {
  const renderer = index.one(page, "renderer", "");
  if (renderer === "sourcery-administration") return "administration";
  return "customer";
}

function nodeSurfaceMap(index) {
  const result = new Map();
  const visit = (node, surface) => {
    if (!node || result.has(node)) return;
    result.set(node, surface);
    for (const child of index.subjects("DomChild").filter(subject => index.one(subject, "parent") === node)) {
      visit(index.one(child, "child"), surface);
    }
  };
  for (const page of index.subjects("Page")) {
    const document = index.one(page, "document");
    if (!document || !index.hasType(document, "DomDocument")) continue;
    visit(index.one(document, "root"), pageSurface(index, page));
  }
  return result;
}

function patternAssessments(index, mappings, surfaces) {
  const nodeSubjects = new Set(mappings.map(item => item.node));
  const evidence = predicate => [...nodeSubjects].filter(subject => predicate(subject.toLowerCase()));
  const candidates = [];
  const add = (key, rows, status = "reused") => {
    if (!PATTERNS.has(key) || !rows.length) return;
    candidates.push(freeze({ key, status, surface: surfaces.customer, evidence: freeze(rows.slice(0, 32)) }));
  };
  add("ApplicationShell", mappings.filter(item => item.component === "ApplicationShell").map(item => item.node));
  const formEvidence = evidence(subject => subject.includes("form") || subject.includes("input") || subject.includes("create"));
  if (index.subjects("DomEvent").length && formEvidence.length) add("CommandForm", formEvidence);
  if (index.subjects("DomRepeat").length && index.subjects("DomEvent").length) add("EditableCollection", [...index.subjects("DomRepeat"), ...index.subjects("DomEvent")]);
  add("FilterBar", evidence(subject => subject.includes("filter")));
  add("EvidenceTimeline", evidence(subject => /evidence|history|timeline|receipt/u.test(subject)));
  add("MasterDetail", evidence(subject => /detail|inspector|selected/u.test(subject)));
  add("WorkflowBoard", evidence(subject => /workflowboard|kanban|board(?:\.|$)|workflowlane|boardcolumn/u.test(subject)));
  add("OperationalQueue", evidence(subject => /queue|attentionitem|workitem/u.test(subject)));
  add("MetricSummary", evidence(subject => /metric|(?:^|[._:-])stat(?:[._:-]|$)|kpi/u.test(subject)));
  add("EvidenceReview", evidence(subject => /evidence|citation|receipt|provenance/u.test(subject)));
  add("ApprovalWorkflow", evidence(subject => /approval|approve|reviewdecision/u.test(subject)));
  add("RelationshipWorkbench", evidence(subject => /relationship|graph|network/u.test(subject)));
  add("TimeEntry", evidence(subject => /timesheet|timeentry|calendar|datefield|timefield|period/u.test(subject)));
  add("ResourceWorkbench", [surfaces.administration], "composed");
  add("AuthoringWorkbench", [surfaces.authoring], "composed");
  return freeze(candidates);
}

function sourceDigest(facts) {
  const rows = activeFacts(facts).map(({ s, p, o, pol = "is" }) => [s, p, o, pol]);
  rows.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  return `sha256:${createHash("sha256").update(JSON.stringify(rows)).digest("hex")}`;
}

function groupMappings(mappings, surfaces) {
  const grouped = new Map();
  for (const mapping of mappings.filter(item => !item.existingBinding)) {
    const key = JSON.stringify([mapping.surface, mapping.component, mapping.basis, mapping.loss]);
    if (!grouped.has(key)) grouped.set(key, { surface: surfaces[mapping.surface] || surfaces.customer, component: mapping.component, basis: mapping.basis, loss: mapping.loss, nodes: [] });
    grouped.get(key).nodes.push(mapping.node);
  }
  return freeze([...grouped.values()].map(group => freeze({
    surface: group.surface,
    component: group.component,
    basis: group.basis,
    count: group.nodes.length,
    sourceHash: `sha256:${createHash("sha256").update(JSON.stringify([...group.nodes].sort())).digest("hex")}`,
    samples: freeze(group.nodes.slice(0, 8)),
    loss: group.loss,
  })).sort((left, right) => `${left.surface}:${left.component}:${left.basis}`.localeCompare(`${right.surface}:${right.component}:${right.basis}`)));
}

export function assessUiApplicationAdoption(source = [], {
  application = "",
  namespace = "",
  experienceMode = "spa",
  provisionAdministration = false,
  nativeTargets = [],
} = {}) {
  const index = indexFacts(source);
  const app = application || index.one(index.subjects("SourceryApplicationRegistration")[0], "application", "");
  const inferredNamespace = namespace || String(app).replace(/^app\./u, "").replaceAll(/[^A-Za-z0-9]+/gu, "_");
  const surfacePrefix = `surface.ui.${safe(inferredNamespace)}`;
  const surfaces = freeze({
    customer: `${surfacePrefix}.customer`,
    administration: `${surfacePrefix}.administration`,
    authoring: `${surfacePrefix}.authoringControlPlane`,
  });
  const attrs = attrIndex(index);
  const assignedSurface = nodeSurfaceMap(index);
  const existingBindings = new Map(index.subjects("UiNativeBinding").map(subject => [index.one(subject, "nativeNode"), subject]));
  const graphMappings = index.subjects("DomNode").map(node => {
    const tag = index.one(node, "tag", "").toLowerCase();
    const resolved = resolveNativeComponent({ subject: node, tag, attrs: attrs.get(node) || new Map() });
    return freeze({
      node,
      tag,
      surface: assignedSurface.get(node) || "customer",
      component: resolved.component,
      basis: resolved.basis,
      loss: freeze(resolved.loss),
      existingBinding: existingBindings.get(node) || null,
      nativeTarget: null,
    });
  });
  const externalMappings = nativeTargets.map(target => {
    const attributes = target.attrs instanceof Map ? target.attrs : new Map(Object.entries(target.attrs || {}));
    const resolved = resolveNativeComponent({ subject: target.subject || target.node, tag: target.tag, attrs: attributes });
    return freeze({
      node: target.node,
      tag: String(target.tag || "").toLowerCase(),
      surface: target.surface || "customer",
      component: resolved.component,
      basis: resolved.basis,
      loss: freeze(resolved.loss),
      existingBinding: existingBindings.get(target.node) || null,
      nativeTarget: freeze({ locator: target.locator, source: target.source, observationMode: target.observationMode || "static-html" }),
    });
  });
  const mappings = freeze([...graphMappings, ...externalMappings]);
  const demandEvidence = new Map();
  for (const mapping of mappings) {
    for (const demand of demandMatches(mapping.node, mapping.tag)) {
      if (!demandEvidence.has(demand.key)) demandEvidence.set(demand.key, { ...demand, evidence: [] });
      demandEvidence.get(demand.key).evidence.push(mapping.node);
    }
  }
  for (const subject of [...index.subjects("Interface"), ...index.subjects("Command"), ...index.subjects("Page")]) {
    for (const demand of demandMatches(subject, "")) {
      if (!demandEvidence.has(demand.key)) demandEvidence.set(demand.key, { ...demand, evidence: [] });
      demandEvidence.get(demand.key).evidence.push(subject);
    }
  }
  const demands = [...demandEvidence.values()].map(demand => {
    const componentAvailable = COMPONENTS.has(demand.candidate);
    return freeze({
      key: demand.key,
      meaning: demand.meaning,
      evidence: freeze([...new Set(demand.evidence)].slice(0, 64)),
      candidate: demand.candidate,
      disposition: componentAvailable ? "component" : "open",
      resolution: componentAvailable ? keySubject(demand.candidate, "component.ui") : null,
    });
  }).sort((left, right) => left.key.localeCompare(right.key));
  const hasCustomerDom = mappings.some(mapping => mapping.surface === "customer");
  const nativeEscapes = [];
  if (!hasCustomerDom && experienceMode === "spa") {
    nativeEscapes.push(freeze({
      subject: `escape.ui.${safe(inferredNamespace)}.customer`,
      surface: "customer",
      modality: "visual-browser",
      reason: "The existing customer surface uses an application-specific renderer and has not yet supplied graph-addressable component bindings.",
      owner: app,
    }));
  }
  const patterns = patternAssessments(index, mappings, surfaces);
  const groups = groupMappings(mappings, surfaces);
  const pageRenderers = index.subjects("Page").map(page => index.one(page, "renderer", ""));
  const adminRuntime = pageRenderers.includes("sourcery-administration") || provisionAdministration;
  const profile = `profile.ui.${safe(inferredNamespace)}`;
  const receipt = `receipt.ui.${safe(inferredNamespace)}.adoption`;
  const customerModality = experienceMode === "mcp" ? "mcp" : "visual-browser";
  const customerProvider = experienceMode === "mcp" ? "provider.sourcery.mcpTool" : "provider.sourcery.nativeBrowser";
  const customerSurfaceDelivery = experienceMode === "mcp"
    ? "delivery.ui.customerMcp"
    : experienceMode === "executable"
      ? "delivery.ui.customerExecutableBrowser"
      : "delivery.ui.customerApplicationBrowser";
  const administrationDelivery = adminRuntime
    ? "delivery.ui.foundationAdministrationRouted"
    : "delivery.ui.foundationAdministrationHosted";
  return freeze({
    protocol: UI_APPLICATION_ADOPTION_PROTOCOL,
    application: app,
    namespace: inferredNamespace,
    experienceMode,
    profile,
    receipt,
    sourceHash: sourceDigest(index.facts),
    surfaces,
    surfaceRecords: freeze([
      freeze({ subject: surfaces.customer, role: "customer", modality: customerModality, deliveryMode: "application-runtime", status: "ready", provider: customerProvider, delivery: customerSurfaceDelivery, route: experienceMode === "spa" ? "/" : "", authority: "application-owned-product-authority", visibility: experienceMode === "spa" ? "application-policy" : "application-profile-policy", componentCoverage: mappings.filter(item => item.surface === "customer").length, nativeEscapeCount: nativeEscapes.length }),
      freeze({ subject: surfaces.administration, role: "administration", modality: "visual-browser", deliveryMode: adminRuntime ? "application-runtime" : "foundation-derived", status: "ready", provider: "provider.sourcery.nativeBrowser", delivery: administrationDelivery, route: adminRuntime ? "/admin" : "", authority: "same-command-page-no-raw-write", visibility: "authenticated-operator-policy", componentCoverage: adminRuntime ? index.subjects("UiComponentInstance").filter(subject => index.one(subject, "surface") === "administration").length : 0, nativeEscapeCount: 0 }),
      freeze({ subject: surfaces.authoring, role: "authoring-control-plane", modality: "visual-browser", deliveryMode: "joined-host", status: "ready", provider: "provider.sourcery.nativeBrowser", delivery: "delivery.ui.joinedAuthoringControlPlane", route: "", authority: "read-only-projection-over-canonical-authoring-authority", visibility: "joined-authoring-request-membership", componentCoverage: 0, nativeEscapeCount: 0 }),
    ]),
    mappings: freeze(mappings),
    groups,
    patterns,
    demands: freeze(demands),
    nativeEscapes: freeze(nativeEscapes),
    totals: freeze({
      nativeNodes: mappings.length,
      componentInstances: mappings.length,
      existingBindings: mappings.filter(item => item.existingBinding).length,
      inferredBindings: mappings.filter(item => !item.existingBinding).length,
      lossBearingBindings: mappings.filter(item => item.loss.length).length,
      patternInstances: patterns.length,
      adoptionGroups: groups.length,
      openDemands: demands.filter(demand => demand.disposition === "open").length,
      nativeEscapes: nativeEscapes.length,
    }),
  });
}

function quote(value) {
  return `"${String(value).replaceAll("\\", "\\\\").replaceAll("\"", "\\\"").replaceAll("\r", "\\r").replaceAll("\n", "\\n")}"`;
}

function fact(subject, predicate, object) {
  return `(${quote(subject)}, ${quote(predicate)}, ${quote(object)})`;
}

export function renderUiApplicationAdoptionRel(assessment, {
  includeNativeBindings = true,
  includeAdministrationFacts = null,
} = {}) {
  if (!assessment?.application || assessment.protocol !== UI_APPLICATION_ADOPTION_PROTOCOL) throw new Error("A valid UI application adoption assessment is required.");
  const lines = [
    "// Generated by the Sourcery component-library corpus migration.",
    "// Product meaning remains in the application; this file records reusable presentation lowering, surfaces, demands and loss.",
    "",
    fact(assessment.profile, "isa", "UiApplicationProfile"),
    fact(assessment.profile, "application", assessment.application),
    fact(assessment.profile, "library", "library.sourcery.default"),
    fact(assessment.profile, "adoptionMode", assessment.totals.existingBindings === assessment.totals.componentInstances ? "semantic-authored" : (assessment.experienceMode === "spa" ? "semantic-native-compatible" : "host-projected")),
    fact(assessment.profile, "escapePolicy", "explicit-receipt-only"),
  ];
  for (const surface of assessment.surfaceRecords) {
    lines.push(
      fact(assessment.profile, "surface", surface.subject),
      fact(surface.subject, "isa", "UiSurface"),
      fact(surface.subject, "role", surface.role),
      fact(surface.subject, "modality", surface.modality),
      fact(surface.subject, "deliveryMode", surface.deliveryMode),
      fact(surface.subject, "status", surface.status),
      fact(surface.subject, "provider", surface.provider),
      fact(surface.subject, "delivery", surface.delivery),
      ...(surface.route ? [fact(surface.subject, "route", surface.route)] : []),
      fact(surface.subject, "authority", surface.authority),
      fact(surface.subject, "visibility", surface.visibility),
      fact(surface.subject, "componentCoverage", String(surface.componentCoverage)),
      fact(surface.subject, "nativeEscapeCount", String(surface.nativeEscapeCount)),
      "",
    );
  }
  for (const [index, group] of assessment.groups.entries()) {
    const subject = `adoption.group.${safe(assessment.namespace)}.${safe(group.component)}.${index + 1}`;
    lines.push(
      fact(subject, "isa", "UiAdoptionGroup"),
      fact(subject, "profile", assessment.profile),
      fact(subject, "surface", group.surface),
      fact(subject, "definition", keySubject(group.component, "component.ui")),
      fact(subject, "basis", group.basis),
      fact(subject, "count", String(group.count)),
      fact(subject, "sourceHash", group.sourceHash),
      ...group.samples.map(sample => fact(subject, "sample", sample)),
      ...group.loss.map(loss => fact(subject, "loss", loss)),
      "",
    );
  }
  if (includeNativeBindings) {
    for (const mapping of assessment.mappings.filter(item => !item.existingBinding)) {
      const instance = `ui.adopted.${safe(mapping.node)}`;
      const binding = `ui.binding.adopted.${safe(mapping.node)}`;
      const receipt = `ui.lowering.adopted.${safe(mapping.node)}`;
      lines.push(
        ...(mapping.nativeTarget ? [
          fact(mapping.node, "isa", "UiNativeTarget"),
          fact(mapping.node, "locator", mapping.nativeTarget.locator),
          fact(mapping.node, "source", mapping.nativeTarget.source),
          fact(mapping.node, "observationMode", mapping.nativeTarget.observationMode),
        ] : []),
        fact(instance, "isa", "UiComponentInstance"),
        fact(instance, "definition", keySubject(mapping.component, "component.ui")),
        fact(instance, "surface", mapping.surface),
        fact(binding, "isa", "UiNativeBinding"),
        fact(binding, "instance", instance),
        fact(binding, "provider", "provider.sourcery.nativeBrowser"),
        fact(binding, "nativeNode", mapping.node),
        fact(binding, "part", "root"),
        fact(receipt, "isa", "UiLoweringReceipt"),
        fact(receipt, "instance", instance),
        fact(receipt, "provider", "provider.sourcery.nativeBrowser"),
        fact(receipt, "status", mapping.loss.length ? "lowered-with-declared-loss" : "lowered"),
        ...mapping.loss.map(loss => fact(receipt, "loss", loss)),
        fact(`attr.${safe(mapping.node)}.suiComponent.adopted`, "isa", "DomAttr"),
        fact(`attr.${safe(mapping.node)}.suiComponent.adopted`, "node", mapping.node),
        fact(`attr.${safe(mapping.node)}.suiComponent.adopted`, "name", "data-sui-component"),
        fact(`attr.${safe(mapping.node)}.suiComponent.adopted`, "value", mapping.component),
        fact(`attr.${safe(mapping.node)}.suiSurface.adopted`, "isa", "DomAttr"),
        fact(`attr.${safe(mapping.node)}.suiSurface.adopted`, "node", mapping.node),
        fact(`attr.${safe(mapping.node)}.suiSurface.adopted`, "name", "data-sui-surface"),
        fact(`attr.${safe(mapping.node)}.suiSurface.adopted`, "value", mapping.surface),
        "",
      );
    }
  }
  for (const [index, pattern] of assessment.patterns.entries()) {
    const subject = `pattern.use.${safe(assessment.namespace)}.${safe(pattern.key)}.${index + 1}`;
    lines.push(
      fact(subject, "isa", "UiPatternInstance"),
      fact(subject, "definition", keySubject(pattern.key, "pattern.ui")),
      fact(subject, "surface", pattern.surface),
      fact(subject, "status", pattern.status),
      ...pattern.evidence.map(evidence => fact(subject, "evidence", evidence)),
      "",
    );
  }
  for (const demand of assessment.demands) {
    const subject = `demand.ui.${safe(assessment.namespace)}.${safe(demand.key)}`;
    lines.push(
      fact(subject, "isa", "UiSemanticDemand"),
      fact(subject, "surface", assessment.surfaces.customer),
      fact(subject, "key", demand.key),
      fact(subject, "meaning", demand.meaning),
      ...demand.evidence.map(evidence => fact(subject, "evidence", evidence)),
      fact(subject, "disposition", demand.disposition),
      ...(demand.resolution ? [fact(subject, "resolution", demand.resolution)] : []),
      "",
    );
  }
  for (const escape of assessment.nativeEscapes) {
    lines.push(
      fact(escape.subject, "isa", "UiNativeEscape"),
      fact(escape.subject, "surface", escape.surface),
      fact(escape.subject, "modality", escape.modality),
      fact(escape.subject, "reason", escape.reason),
      fact(escape.subject, "owner", escape.owner),
      "",
    );
  }
  if (typeof includeAdministrationFacts === "string" && includeAdministrationFacts.trim()) lines.push(includeAdministrationFacts.trim(), "");
  lines.push(
    fact(assessment.receipt, "isa", "UiAdoptionReceipt"),
    fact(assessment.receipt, "profile", assessment.profile),
    fact(assessment.receipt, "sourceHash", assessment.sourceHash),
    fact(assessment.receipt, "componentInstances", String(assessment.totals.componentInstances)),
    fact(assessment.receipt, "adoptionGroups", String(assessment.totals.adoptionGroups)),
    fact(assessment.receipt, "patternInstances", String(assessment.totals.patternInstances)),
    fact(assessment.receipt, "demandCount", String(assessment.demands.length)),
    fact(assessment.receipt, "nativeEscapes", String(assessment.totals.nativeEscapes)),
    fact(assessment.receipt, "status", "migrated"),
    "",
  );
  return `${lines.join("\n").replaceAll(/\n{3,}/gu, "\n\n")}\n`;
}
