import { createHash } from "node:crypto";

export const UI_SURFACE_COMPOSITION_PROTOCOL = "sourcery-ui-surface-composition/1";
export const UI_VISUAL_EXPRESSION_PROTOCOL = "sourcery-ui-visual-expression/1";

const HASH = /^[a-f0-9]{64}$/u;
const ID = /^[A-Za-z][A-Za-z0-9]*(?:[.-][A-Za-z0-9]+)*$/u;
const PRIORITIES = new Set(["critical", "high", "normal", "supporting"]);
const BINDING_ROLES = new Set(["subject", "query", "value", "action", "evidence"]);
const RELATIONSHIPS = new Set(["contains", "precedes", "compares", "annotates", "controls", "represents"]);
const VIEWPORTS = new Set(["narrow", "regular", "wide"]);
const ADAPTATIONS = new Set(["stack", "wrap", "collapse-disclosure", "scroll-semantic-axis", "substitute-representation"]);
const REPRESENTATIONS = new Set(["semantic-html", "svg", "canvas", "spatial"]);
const VISUAL_THEMES = new Set(["dark", "light", "high-contrast"]);
const VISUAL_CHARACTERS = new Set(["editorial", "operational", "technical"]);
const VISUAL_DENSITIES = new Set(["compact", "comfortable", "spacious"]);
const VISUAL_MEASURES = new Set(["narrow", "content", "wide", "full"]);
const VISUAL_LAYOUT_ROLES = new Set([
  "workspace", "hero", "supporting", "flow", "primary-analysis", "data-grid", "callout", "disclosure", "action", "boundary",
  "masthead", "status", "process-flow", "process-stage", "comparison-grid", "comparison-card", "metric", "switch-band",
  "evidence-band", "action-group", "explanation-band", "geographic-cockpit", "cockpit-header", "layer-controls",
  "map-board", "unit-inspector", "demo-joyride", "joyride-header", "joyride-controls",
]);
const VISUAL_COLOR_ROLES = new Set(["canvas", "surface", "surface-muted", "accent", "warning", "danger", "neutral"]);
const VISUAL_TYPOGRAPHY_ROLES = new Set(["display", "heading", "body", "label", "mono", "numeric", "title", "metric", "delta", "caption"]);
const VISUAL_GEOMETRIES = new Set(["flat", "panel", "band", "inset", "pill"]);
const VISUAL_VISIBILITIES = new Set(["visible", "visually-hidden"]);
const FORBIDDEN_KEYS = new Set([
  "selector", "selectors", "classname", "classnames", "css", "style", "styles", "domnode", "domid",
  "canvascontext", "drawcall", "shader", "object3d", "sceneobject", "coordinates", "x", "y", "z",
]);

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
function fail(message, code = "sourcery-ui-surface-composition") {
  const error = new Error(message);
  error.code = code;
  throw error;
}
function text(value, label, maximum = 2000) {
  const normalized = String(value || "").trim();
  if (!normalized || normalized.length > maximum) fail(`${label} must be a non-empty string of at most ${maximum} characters.`);
  return normalized;
}
function id(value, label) {
  const normalized = text(value, label, 160);
  if (!ID.test(normalized)) fail(`${label} must be a stable semantic identifier.`);
  return normalized;
}
function hash(value, label) {
  const normalized = String(value || "").replace(/^sha256:/u, "");
  if (!HASH.test(normalized)) fail(`${label} must be an exact SHA-256 hash.`);
  return normalized;
}
function list(values, label, normalize = value => text(value, label)) {
  if (!Array.isArray(values)) fail(`${label} must be an array.`);
  const normalized = values.map(normalize);
  if (new Set(normalized.map(value => typeof value === "string" ? value : canonical(value))).size !== normalized.length) {
    fail(`${label} must not contain duplicates.`);
  }
  return normalized;
}
function rejectRendererConfiguration(value, path = "composition") {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) {
      fail(`${path}.${key} is renderer configuration and cannot enter semantic composition.`, "sourcery-ui-composition-renderer-leak");
    }
    rejectRendererConfiguration(child, `${path}.${key}`);
  }
}

function normalizeBinding(value, regionId) {
  const bindingId = id(value?.id, `Binding in ${regionId} id`);
  const role = text(value?.role, `${bindingId}.role`, 32);
  if (!BINDING_ROLES.has(role)) fail(`${bindingId}.role is not an authored semantic binding role.`);
  return {
    id: bindingId,
    role,
    target: id(value?.target, `${bindingId}.target`),
    invariants: list(value?.invariants || [], `${bindingId}.invariants`),
  };
}

function normalizeRegion(value) {
  const regionId = id(value?.id, "Composition region id");
  const priority = text(value?.priority, `${regionId}.priority`, 32);
  if (!PRIORITIES.has(priority)) fail(`${regionId}.priority is invalid.`);
  const order = value?.order;
  if (!Number.isSafeInteger(order) || order < 1 || order > 10000) fail(`${regionId}.order must be an integer from 1 to 10000.`);
  return {
    id: regionId,
    ...(value?.parentId ? { parentId: id(value.parentId, `${regionId}.parentId`) } : {}),
    order,
    purpose: text(value?.purpose, `${regionId}.purpose`),
    priority,
    responsibilityIds: list(value?.responsibilityIds || [], `${regionId}.responsibilityIds`, item => id(item, `${regionId}.responsibility`)).sort(),
    bindings: list(value?.bindings || [], `${regionId}.bindings`, item => normalizeBinding(item, regionId)).sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function enumValue(value, allowed, label) {
  const normalized = text(value, label, 64);
  if (!allowed.has(normalized)) fail(`${label} is unsupported.`);
  return normalized;
}

export function prepareUiVisualExpression({ theme, character, density, measure, regions: expressionRegions = [], invariants = [] } = {}, compositionRegions = []) {
  const regionIds = new Set(compositionRegions.map(region => region.id));
  if (!regionIds.size) fail("Visual expression requires composition regions.");
  const normalizedRegions = list(expressionRegions, "visualExpression.regions", value => {
    const regionId = id(value?.regionId, "Visual-expression regionId");
    if (!regionIds.has(regionId)) fail(`${regionId} is not a declared composition region.`);
    return {
      regionId,
      layoutRole: enumValue(value?.layoutRole, VISUAL_LAYOUT_ROLES, `${regionId}.layoutRole`),
      colorRole: enumValue(value?.colorRole, VISUAL_COLOR_ROLES, `${regionId}.colorRole`),
      typographyRole: enumValue(value?.typographyRole, VISUAL_TYPOGRAPHY_ROLES, `${regionId}.typographyRole`),
      geometry: enumValue(value?.geometry, VISUAL_GEOMETRIES, `${regionId}.geometry`),
      ...(value?.visibility == null ? {} : { visibility: enumValue(value.visibility, VISUAL_VISIBILITIES, `${regionId}.visibility`) }),
    };
  }).sort((left, right) => left.regionId.localeCompare(right.regionId));
  if (!normalizedRegions.length || new Set(normalizedRegions.map(region => region.regionId)).size !== normalizedRegions.length) {
    fail("Visual expression requires unique declared region expressions.");
  }
  const normalizedInvariants = list(invariants, "visualExpression.invariants").sort();
  if (!normalizedInvariants.length) fail("Visual expression requires explicit invariants.");
  const body = {
    protocol: UI_VISUAL_EXPRESSION_PROTOCOL,
    theme: enumValue(theme, VISUAL_THEMES, "visualExpression.theme"),
    character: enumValue(character, VISUAL_CHARACTERS, "visualExpression.character"),
    density: enumValue(density, VISUAL_DENSITIES, "visualExpression.density"),
    measure: enumValue(measure, VISUAL_MEASURES, "visualExpression.measure"),
    regions: normalizedRegions,
    invariants: normalizedInvariants,
    authority: "presentation-semantics-only",
  };
  return freeze({ ...body, expressionHash: digest(body) });
}

function ensureHierarchy(regions, relationships) {
  const byId = new Map(regions.map(region => [region.id, region]));
  if (byId.size !== regions.length) fail("Composition region ids must be unique.");
  const roots = regions.filter(region => !region.parentId);
  if (roots.length !== 1) fail("A surface composition must have exactly one root region.");
  const siblingOrders = new Set();
  for (const region of regions) {
    if (region.parentId && (!byId.has(region.parentId) || region.parentId === region.id)) fail(`${region.id} has an invalid parent.`);
    const coordinate = `${region.parentId || "root"}:${region.order}`;
    if (siblingOrders.has(coordinate)) fail(`Sibling region order ${coordinate} is ambiguous.`);
    siblingOrders.add(coordinate);
    const visited = new Set([region.id]);
    let cursor = region;
    while (cursor.parentId) {
      if (visited.has(cursor.parentId)) fail(`Composition hierarchy contains a cycle at ${cursor.parentId}.`);
      visited.add(cursor.parentId);
      cursor = byId.get(cursor.parentId);
    }
  }
  const declaredContains = new Set(relationships.filter(relation => relation.kind === "contains").map(relation => `${relation.from}:${relation.to}`));
  const expectedContains = new Set(regions.filter(region => region.parentId).map(region => `${region.parentId}:${region.id}`));
  if (canonical([...declaredContains].sort()) !== canonical([...expectedContains].sort())) {
    fail("Contains relationships must exactly mirror the declared region hierarchy.");
  }
  return byId;
}

export function prepareUiSurfaceComposition({
  surfaceId,
  route,
  purpose,
  stateFamily,
  sourceDesignHash,
  sourceAssetHashes = [],
  regions = [],
  relationships = [],
  responsiveRules = [],
  representationAlternatives = [],
  rendererBoundaries = [],
  visualExpression = null,
  invariants = [],
} = {}) {
  rejectRendererConfiguration({ regions, relationships, responsiveRules, representationAlternatives, rendererBoundaries, visualExpression, invariants });
  const normalizedRegions = list(regions, "regions", normalizeRegion).sort((a, b) => a.id.localeCompare(b.id));
  if (!normalizedRegions.length) fail("A surface composition requires at least one region.");
  const normalizedRelationships = list(relationships, "relationships", value => {
    const relationshipId = id(value?.id, "Composition relationship id");
    const kind = text(value?.kind, `${relationshipId}.kind`, 32);
    if (!RELATIONSHIPS.has(kind)) fail(`${relationshipId}.kind is invalid.`);
    const from = id(value?.from, `${relationshipId}.from`);
    const to = id(value?.to, `${relationshipId}.to`);
    if (from === to) fail(`${relationshipId} cannot relate a region to itself.`);
    return { id: relationshipId, kind, from, to };
  }).sort((a, b) => a.id.localeCompare(b.id));
  if (new Set(normalizedRelationships.map(relation => relation.id)).size !== normalizedRelationships.length) fail("Composition relationship ids must be unique.");
  const regionById = ensureHierarchy(normalizedRegions, normalizedRelationships);
  if (normalizedRelationships.some(relation => !regionById.has(relation.from) || !regionById.has(relation.to))) {
    fail("Composition relationships must reference declared regions.");
  }
  const bindingIds = normalizedRegions.flatMap(region => region.bindings.map(binding => binding.id));
  if (new Set(bindingIds).size !== bindingIds.length) fail("Semantic binding ids must be unique across the composition.");

  const normalizedRules = list(responsiveRules, "responsiveRules", value => {
    const ruleId = id(value?.id, "Responsive rule id");
    const when = text(value?.when, `${ruleId}.when`, 32);
    const adaptation = text(value?.adaptation, `${ruleId}.adaptation`, 64);
    if (!VIEWPORTS.has(when) || !ADAPTATIONS.has(adaptation)) fail(`${ruleId} uses unsupported responsive intent.`);
    const affectedRegions = list(value?.regionIds || [], `${ruleId}.regionIds`, item => id(item, `${ruleId}.regionId`)).sort();
    if (!affectedRegions.length || affectedRegions.some(regionId => !regionById.has(regionId))) fail(`${ruleId} must reference declared regions.`);
    const preserved = list(value?.preserves || [], `${ruleId}.preserves`);
    if (!preserved.length) fail(`${ruleId} must state at least one preserved semantic invariant.`);
    return { id: ruleId, when, adaptation, regionIds: affectedRegions, preserves: preserved.sort() };
  }).sort((a, b) => a.id.localeCompare(b.id));

  const normalizedAlternatives = list(representationAlternatives, "representationAlternatives", value => {
    const alternativeId = id(value?.id, "Representation alternative id");
    const regionId = id(value?.regionId, `${alternativeId}.regionId`);
    const representation = text(value?.representation, `${alternativeId}.representation`, 32);
    if (!regionById.has(regionId) || !REPRESENTATIONS.has(representation)) fail(`${alternativeId} has an invalid region or representation.`);
    const eligibleProviders = list(value?.eligibleProviders || [], `${alternativeId}.eligibleProviders`, item => id(item, `${alternativeId}.provider`)).sort();
    if (!eligibleProviders.length) fail(`${alternativeId} requires at least one eligible provider.`);
    const requiredInvariants = list(value?.invariants || [], `${alternativeId}.invariants`).sort();
    if (!requiredInvariants.length) fail(`${alternativeId} requires explicit representation invariants.`);
    return {
      id: alternativeId,
      regionId,
      representation,
      eligibleProviders,
      invariants: requiredInvariants,
      acceptedLoss: list(value?.acceptedLoss || [], `${alternativeId}.acceptedLoss`).sort(),
    };
  }).sort((a, b) => a.id.localeCompare(b.id));

  const normalizedBoundaries = list(rendererBoundaries, "rendererBoundaries", value => {
    const boundaryId = id(value?.id, "Renderer boundary id");
    const regionId = id(value?.regionId, `${boundaryId}.regionId`);
    const provider = id(value?.provider, `${boundaryId}.provider`);
    const companionRegionId = value?.companionRegionId ? id(value.companionRegionId, `${boundaryId}.companionRegionId`) : null;
    if (!regionById.has(regionId) || (companionRegionId && (!regionById.has(companionRegionId) || companionRegionId === regionId))) {
      fail(`${boundaryId} has an invalid region boundary.`);
    }
    if (provider !== "provider.sourcery.nativeBrowser" && !companionRegionId) {
      fail(`${boundaryId} requires an accessible companion region for a non-native renderer.`);
    }
    const semanticCoverage = list(value?.semanticCoverage || [], `${boundaryId}.semanticCoverage`, item => id(item, `${boundaryId}.semanticCoverage`)).sort();
    if (!semanticCoverage.length) fail(`${boundaryId} requires explicit semantic coverage.`);
    return {
      id: boundaryId,
      regionId,
      provider,
      ...(companionRegionId ? { companionRegionId } : {}),
      semanticCoverage,
      acceptedLoss: list(value?.acceptedLoss || [], `${boundaryId}.acceptedLoss`).sort(),
    };
  }).sort((a, b) => a.id.localeCompare(b.id));
  if (new Set(normalizedBoundaries.map(boundary => boundary.regionId)).size !== normalizedBoundaries.length) {
    fail("Each renderer boundary must own a distinct region.");
  }

  const body = {
    protocol: UI_SURFACE_COMPOSITION_PROTOCOL,
    surfaceId: id(surfaceId, "surfaceId"),
    route: text(route, "route", 512),
    purpose: text(purpose, "purpose"),
    stateFamily: text(stateFamily, "stateFamily", 256),
    sourceDesignHash: hash(sourceDesignHash, "sourceDesignHash"),
    sourceAssetHashes: list(sourceAssetHashes, "sourceAssetHashes", item => hash(item, "sourceAssetHash")).sort(),
    regions: normalizedRegions,
    relationships: normalizedRelationships,
    responsiveRules: normalizedRules,
    representationAlternatives: normalizedAlternatives,
    rendererBoundaries: normalizedBoundaries,
    ...(visualExpression ? { visualExpression: prepareUiVisualExpression(visualExpression, normalizedRegions) } : {}),
    invariants: list(invariants, "invariants").sort(),
  };
  return freeze({ ...body, compositionHash: digest(body) });
}

export function verifyUiSurfaceComposition(value) {
  try {
    if (value?.protocol !== UI_SURFACE_COMPOSITION_PROTOCOL || !HASH.test(value?.compositionHash || "")) fail("Composition protocol or hash is invalid.");
    const rebuilt = prepareUiSurfaceComposition(value);
    if (rebuilt.compositionHash !== value.compositionHash || canonical(rebuilt) !== canonical(value)) fail("Composition content has drifted from its hash.");
    return freeze({ passed: true, compositionHash: value.compositionHash, regionCount: value.regions.length, bindingCount: value.regions.flatMap(region => region.bindings).length });
  } catch (error) {
    return freeze({ passed: false, reason: error.message || String(error), code: error.code || "sourcery-ui-surface-composition" });
  }
}

export function compositionContentHash(value) { return digest(value); }
