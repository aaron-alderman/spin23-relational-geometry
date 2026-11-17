import { createHash } from "node:crypto";

import { bindNativeComponent } from "./native-dom-lowerer.mjs";
import { verifyUiSurfaceComposition } from "./surface-composition.mjs";

export const NATIVE_SURFACE_REALIZATION_PROTOCOL = "sourcery-native-surface-realization/1";
export const NATIVE_SURFACE_LOWERING_PROTOCOL = "sourcery-native-surface-composition-lowering/1";

const HASH = /^[a-f0-9]{64}$/u;
const TOKEN = /^[A-Za-z][A-Za-z0-9]*(?:[.-][A-Za-z0-9]+)*$/u;
// Native realization is structural: an imported semantic region may already be
// represented by a leaf or disclosure element, not only by a layout container.
// Keep this allow-list deliberately semantic and exclude active controls whose
// behavior would require a separate interaction contract.
const TAGS = new Set([
  "main", "header", "footer", "section", "article", "aside", "nav", "figure", "form", "div",
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "small", "output", "ol", "ul", "li", "dl", "dt", "dd",
  "details", "summary", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "a",
  "svg",
]);
const REPRESENTATIONS = new Set(["semantic-html", "svg"]);
const PROVIDER = "provider.sourcery.nativeBrowser";
// Region labels become accessible names only on native structures for which a
// label supplies missing context. Applying aria-label to authored text nodes
// (especially headings) replaces their exact visible name in the accessibility
// tree and therefore changes, rather than annotates, the imported semantics.
const ARIA_LABEL_TAGS = new Set(["main", "header", "footer", "section", "article", "aside", "nav", "figure", "form", "svg"]);
const TEXT_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "small", "output", "li", "dt", "dd", "summary", "th", "td", "caption", "a"]);

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
function digest(value) { return createHash("sha256").update(canonical(value), "utf8").digest("hex"); }
function freeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
}
function fail(message, code = "sourcery-native-surface-lowering") {
  const error = new Error(message);
  error.code = code;
  throw error;
}
function required(value, label, maximum = 2000) {
  const normalized = String(value || "").trim();
  if (!normalized || normalized.length > maximum) fail(`${label} must be a non-empty string of at most ${maximum} characters.`);
  return normalized;
}
function token(value, label) {
  const normalized = required(value, label, 160);
  if (!TOKEN.test(normalized)) fail(`${label} must be a stable token.`);
  return normalized;
}
function strings(value, label) {
  if (!Array.isArray(value)) fail(`${label} must be an array.`);
  const normalized = value.map(item => required(item, label));
  if (new Set(normalized).size !== normalized.length) fail(`${label} must not contain duplicates.`);
  return normalized.sort();
}
function safe(value) { return String(value).replaceAll(/[^A-Za-z0-9]+/gu, ".").replace(/^\.|\.$/gu, ""); }
function factSource(facts) {
  return `${facts.map(({ s, p, o, pol }) => `(${JSON.stringify(s)}, ${JSON.stringify(p)}, ${JSON.stringify(o)}${pol === "is-not" ? ', "is-not"' : ""})`).join("\n")}\n`;
}

export function prepareNativeSurfaceRealization({ composition, namespace, regions, proofObligations = [], facts = [] } = {}) {
  const verification = verifyUiSurfaceComposition(composition);
  if (!verification.passed) fail(`Native lowering requires a valid composition: ${verification.reason}`);
  namespace = token(namespace, "namespace");
  if (!Array.isArray(regions) || regions.length !== composition.regions.length) {
    fail("Native realization requires exactly one entry for every composition region.");
  }
  const alternatives = new Map(composition.representationAlternatives.map(alternative => [`${alternative.regionId}:${alternative.representation}`, alternative]));
  const boundaries = new Map(composition.rendererBoundaries.map(boundary => [boundary.regionId, boundary]));
  const factIndex = new Map();
  for (const item of facts || []) {
    if (item?.pol === "is-not") continue;
    const key = `${item?.s}\u0000${item?.p}`;
    const values = factIndex.get(key) || [];
    values.push(String(item?.o));
    factIndex.set(key, values);
  }
  const byRegion = new Map();
  for (const value of regions) {
    const regionId = token(value?.regionId, "Native realization regionId");
    if (byRegion.has(regionId) || !composition.regions.some(region => region.id === regionId)) fail(`Native realization region ${regionId} is duplicated or unknown.`);
    const representation = required(value?.representation, `${regionId}.representation`, 32);
    const tag = required(value?.tag, `${regionId}.tag`, 32).toLowerCase();
    if (!REPRESENTATIONS.has(representation) || !TAGS.has(tag)) fail(`${regionId} has an unsupported native representation or tag.`);
    if ((representation === "svg") !== (tag === "svg")) fail(`${regionId} SVG realization must use the svg tag and only SVG realization may use it.`);
    let alternative = null;
    if (representation !== "semantic-html") {
      alternative = alternatives.get(`${regionId}:${representation}`);
      if (!alternative || !alternative.eligibleProviders.includes(PROVIDER)) fail(`${regionId} ${representation} is not an eligible accepted representation for the native provider.`);
    }
    const boundary = boundaries.get(regionId);
    if (boundary && boundary.provider !== PROVIDER) fail(`${regionId} is assigned to ${boundary.provider}, not the native provider.`);
    const acceptedLoss = strings(value?.acceptedLoss || [], `${regionId}.acceptedLoss`);
    const authorizedLoss = new Set([...(alternative?.acceptedLoss || []), ...(boundary?.acceptedLoss || [])]);
    if (acceptedLoss.some(loss => !authorizedLoss.has(loss))) fail(`${regionId} accepts loss that is not declared by its composition.`);
    const existingNode = value?.existingNode == null ? null : token(value.existingNode, `${regionId}.existingNode`);
    if (existingNode) {
      if (!(factIndex.get(`${existingNode}\u0000isa`) || []).includes("DomNode")) fail(`${regionId} existingNode ${existingNode} is not a positive DomNode fact.`);
      if (!(factIndex.get(`${existingNode}\u0000tag`) || []).includes(tag)) fail(`${regionId} existingNode ${existingNode} does not have exact tag ${tag}.`);
    }
    const visibleText = value?.text == null ? null : required(value.text, `${regionId}.text`, 2000);
    const semanticRegion = composition.regions.find(region => region.id === regionId);
    if (visibleText && existingNode) fail(`${regionId}.text cannot replace content on an existing native node.`);
    if (visibleText && !TEXT_TAGS.has(tag)) fail(`${regionId}.text is not valid for native tag ${tag}.`);
    if (visibleText && !semanticRegion.bindings.length) fail(`${regionId}.text requires an exact semantic binding.`);
    byRegion.set(regionId, {
      regionId,
      representation,
      tag,
      component: token(value?.component, `${regionId}.component`),
      label: required(value?.label, `${regionId}.label`, 500),
      acceptedLoss,
      ...(existingNode ? { existingNode } : {}),
      ...(visibleText ? { text: visibleText } : {}),
    });
  }
  const normalizedRegions = composition.regions.map(region => byRegion.get(region.id)).sort((a, b) => a.regionId.localeCompare(b.regionId));
  const body = {
    protocol: NATIVE_SURFACE_REALIZATION_PROTOCOL,
    compositionHash: composition.compositionHash,
    provider: PROVIDER,
    namespace,
    regions: normalizedRegions,
    proofObligations: strings(proofObligations, "proofObligations"),
  };
  if (!body.proofObligations.length) fail("Native realization requires explicit proof obligations.");
  return freeze({ ...body, realizationHash: digest(body) });
}

function addAttribute(writer, node, suffix, name, value) {
  const subject = `attr.${safe(node)}.${safe(suffix)}`;
  const desired = new Map([
    ["node", String(node)],
    ["name", String(name)],
    ["value", String(value)],
  ]);
  // Attribute subjects are stable identities owned by the lowerer. When a
  // successor composition changes a single-valued coordinate, close the old
  // coordinate exactly before adding the new value. This keeps brownfield
  // updates valid without inventing broad or absent retractions.
  for (const item of writer.sourceFactsBySubject?.get(subject) || []) {
    if (item?.pol === "is-not" || !desired.has(item?.p)) continue;
    if (String(item.o) !== desired.get(item.p)) {
      writer.negative(item.s, item.p, item.o);
    }
  }
  writer.fact(subject, "isa", "DomAttr");
  writer.fact(subject, "node", node);
  writer.fact(subject, "name", name);
  writer.fact(subject, "value", value);
}

export function lowerNativeSurfaceComposition({ composition, realization, facts = [] } = {}) {
  const expected = prepareNativeSurfaceRealization({ composition, ...realization, facts });
  if (realization?.realizationHash && realization.realizationHash !== expected.realizationHash) fail("Native realization has drifted from its exact hash.");
  const factIndex = new Map();
  for (const item of facts || []) {
    if (item?.pol === "is-not") continue;
    const key = `${item?.s}\u0000${item?.p}`;
    const values = factIndex.get(key) || [];
    values.push(String(item?.o));
    factIndex.set(key, values);
  }
  const emittedFacts = [];
  const sourceFactsBySubject = new Map();
  for (const item of facts || []) {
    if (!sourceFactsBySubject.has(item?.s)) sourceFactsBySubject.set(item?.s, []);
    sourceFactsBySubject.get(item?.s).push(item);
  }
  const writer = {
    sourceFactsBySubject,
    fact(s, p, o) { emittedFacts.push({ s: String(s), p: String(p), o: String(o) }); },
    negative(s, p, o) { emittedFacts.push({ s: String(s), p: String(p), o: String(o), pol: "is-not" }); },
  };
  const regionById = new Map(composition.regions.map(region => [region.id, region]));
  const realizationByRegion = new Map(expected.regions.map(region => [region.regionId, region]));
  const visualExpressionByRegion = new Map((composition.visualExpression?.regions || []).map(region => [region.regionId, region]));
  const nodeByRegion = new Map(composition.regions.map(region => {
    const native = realizationByRegion.get(region.id);
    return [region.id, native.existingNode || `node.${expected.namespace}.region.${safe(region.id)}`];
  }));
  const root = composition.regions.find(region => !region.parentId);
  const rootExisting = Boolean(realizationByRegion.get(root.id).existingNode);
  const document = rootExisting ? null : `doc.${expected.namespace}`;
  if (document) {
    writer.fact(document, "isa", "DomDocument");
    writer.fact(document, "root", nodeByRegion.get(root.id));
  }

  const ordered = [...composition.regions].sort((left, right) => {
    const leftParent = left.parentId || "";
    const rightParent = right.parentId || "";
    return leftParent.localeCompare(rightParent) || left.order - right.order || left.id.localeCompare(right.id);
  });
  const regionReceipts = [];
  for (const region of ordered) {
    const native = realizationByRegion.get(region.id);
    const node = nodeByRegion.get(region.id);
    if (!native.existingNode) {
      writer.fact(node, "isa", "DomNode");
      writer.fact(node, "tag", native.tag);
      if (native.text) writer.fact(node, "text", native.text);
    }
    const component = `ui.${expected.namespace}.region.${safe(region.id)}`;
    // Existing imported nodes are already accounted for by their application's
    // UI-adoption receipt (often through grouped native coverage). A visual
    // composition annotates and semantically binds those nodes; emitting a
    // second UiComponentInstance/UiNativeBinding would double-count one DOM
    // node and invalidate the exact adoption ledger.
    if (!native.existingNode) {
      bindNativeComponent(writer, {
        instance: component,
        definition: native.component,
        node,
        surface: composition.surfaceId,
        variant: native.representation === "svg" ? "semantic-graphic" : "composition-region",
        state: [composition.stateFamily],
        path: "surfaceComposition",
      });
    }
    addAttribute(writer, node, "region", "data-sui-region", region.id);
    addAttribute(writer, node, "priority", "data-sui-priority", region.priority);
    if (ARIA_LABEL_TAGS.has(native.tag)) {
      addAttribute(writer, node, "label", "aria-label", native.label);
    } else if (native.existingNode) {
      // Retract only coordinates that positively exist for the exact label
      // attribute identity owned by this lowerer. A semantic successor may
      // repair historical label projection, but materialization closure must
      // never be asked to retract coordinates absent from its exact source.
      const ownedLabel = `attr.${safe(node)}.label`;
      const ownsAriaLabel = (factIndex.get(`${ownedLabel}\u0000name`) || []).includes("aria-label");
      if (ownsAriaLabel) {
        emittedFacts.push(...(facts || [])
          .filter(item => item?.pol !== "is-not" && item?.s === ownedLabel)
          .map(({ s, p, o }) => ({ s: String(s), p: String(p), o: String(o), pol: "is-not" })));
      }
    }
    const visualExpression = visualExpressionByRegion.get(region.id) || null;
    if (visualExpression) {
      addAttribute(writer, node, "visual.layout", "data-sui-layout-role", visualExpression.layoutRole);
      addAttribute(writer, node, "visual.color", "data-sui-color-role", visualExpression.colorRole);
      addAttribute(writer, node, "visual.typography", "data-sui-typography-role", visualExpression.typographyRole);
      addAttribute(writer, node, "visual.geometry", "data-sui-geometry", visualExpression.geometry);
      if (visualExpression.visibility) addAttribute(writer, node, "visual.visibility", "data-sui-visibility", visualExpression.visibility);
    }
    const responsiveByViewport = new Map();
    for (const rule of composition.responsiveRules.filter(rule => rule.regionIds.includes(region.id))) {
      const adaptations = responsiveByViewport.get(rule.when) || [];
      adaptations.push(rule.adaptation);
      responsiveByViewport.set(rule.when, adaptations);
    }
    for (const [viewport, adaptations] of [...responsiveByViewport].sort(([left], [right]) => left.localeCompare(right))) {
      addAttribute(writer, node, `responsive.${viewport}`, `data-sui-adapt-${viewport}`, [...new Set(adaptations)].sort().join(" "));
    }
    if (region.id === root.id && composition.visualExpression) {
      const theme = composition.visualExpression.theme === "high-contrast" ? "sourcery-high-contrast" : `sourcery-${composition.visualExpression.theme}`;
      addAttribute(writer, node, "visual.theme", "data-sui-theme", theme);
      addAttribute(writer, node, "visual.character", "data-sui-character", composition.visualExpression.character);
      addAttribute(writer, node, "visual.density", "data-sui-density", composition.visualExpression.density);
      addAttribute(writer, node, "visual.measure", "data-sui-measure", composition.visualExpression.measure);
    }
    if (native.representation === "svg") addAttribute(writer, node, "role", "role", "img");
    const bindingsByRole = new Map();
    for (const binding of region.bindings) {
      const targets = bindingsByRole.get(binding.role) || [];
      targets.push(binding.target);
      bindingsByRole.set(binding.role, targets);
    }
    for (const [role, targets] of [...bindingsByRole].sort(([left], [right]) => left.localeCompare(right))) {
      addAttribute(writer, node, `binding.${role}`, `data-sui-binding-${role}`, targets.sort().join(" "));
    }
    if (region.parentId && !native.existingNode) {
      const child = `child.${expected.namespace}.region.${safe(region.id)}`;
      writer.fact(child, "isa", "DomChild");
      writer.fact(child, "parent", nodeByRegion.get(region.parentId));
      writer.fact(child, "child", node);
      writer.fact(child, "order", String(region.order));
    }
    regionReceipts.push({
      regionId: region.id,
      nativeNode: node,
      existingNode: Boolean(native.existingNode),
      component: native.existingNode ? null : component,
      componentDefinition: native.component,
      adoption: native.existingNode ? "reused-existing-native-node" : "new-explicit-native-binding",
      representation: native.representation,
      suppliedBindings: region.bindings.map(binding => binding.id).sort(),
      acceptedLoss: native.acceptedLoss,
      authoredText: Boolean(native.text),
      ...(visualExpression ? { visualExpression } : {}),
    });
  }
  const existingCoordinates = new Set((facts || [])
    .filter(item => item?.pol !== "is-not")
    .map(({ s, p, o }) => canonical({ s: String(s), p: String(p), o: String(o) })));
  const loweredFacts = emittedFacts.filter(item => item.pol === "is-not" || !existingCoordinates.has(canonical(item)));
  const relSource = factSource(loweredFacts);
  const artifactBody = {
    protocol: NATIVE_SURFACE_LOWERING_PROTOCOL,
    compositionHash: composition.compositionHash,
    realizationHash: expected.realizationHash,
    provider: PROVIDER,
    document,
    rootNode: nodeByRegion.get(root.id),
    facts: loweredFacts,
    factsHash: digest(loweredFacts),
    sourceHash: createHash("sha256").update(relSource, "utf8").digest("hex"),
    regionReceipts: regionReceipts.sort((a, b) => a.regionId.localeCompare(b.regionId)),
    acceptedLoss: [...new Set(regionReceipts.flatMap(receipt => receipt.acceptedLoss))].sort(),
    proofObligations: expected.proofObligations,
  };
  return freeze({ ...artifactBody, receiptHash: digest(artifactBody), relSource });
}

export function verifyNativeSurfaceCompositionLowering({ composition, realization, lowering, facts = [] } = {}) {
  try {
    if (lowering?.protocol !== NATIVE_SURFACE_LOWERING_PROTOCOL || !HASH.test(lowering?.receiptHash || "")) fail("Native lowering protocol or receipt hash is invalid.");
    const rebuilt = lowerNativeSurfaceComposition({ composition, realization, facts });
    if (canonical(rebuilt) !== canonical(lowering)) fail("Native surface lowering has drifted from its composition and realization basis.");
    return freeze({ passed: true, receiptHash: lowering.receiptHash, sourceHash: lowering.sourceHash, regionCount: lowering.regionReceipts.length });
  } catch (error) {
    return freeze({ passed: false, reason: error.message || String(error), code: error.code || "sourcery-native-surface-lowering" });
  }
}
