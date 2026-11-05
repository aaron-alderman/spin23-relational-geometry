import {
  ASSET_CROSS_POLICY_STAGE_INVENTORY_STATE_VALUES,
  PLAINTEXT_POLICY_VALUES,
  MODE_STATUS_VALUES,
  FIELD_SENSITIVITY_LEVELS,
  ALLOWED_VALUE_PROMOTION_WORKFLOW_INVENTORY_STATE_VALUES,
  MODE_EDITOR_WIDGET_KIND_VALUES,
  PUBLICATION_GATE_EXPRESSION_OPERATOR_VALUES,
  COMPOSITE_UNIQUENESS_NULL_EQUIVALENCE_VALUES,
  DEFAULT_DATA_VALIDATIONS,
  effectiveDataValidationsValue
} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/policy-values.mjs';

export const DEFAULT_SOURCE_FACT_TYPES = Object.freeze([
  "PostgresConnection",
  "PostgresTable",
  "PostgresColumn",
  "SpreadsheetWorkbook",
  "Sheet",
  "Cell",
  "FilesystemMount",
  "FilesystemEntry",
  "S3Connection",
  "S3Bucket",
  "S3Object",
]);

export const DATA_RESOLUTION_PRECEDENCE = Object.freeze({
  pluginDefault: 10,
  projectDefault: 20,
  source: 30,
  inference: 40,
  inherited: 50,
  authored: 60,
  asset: 70,
  bag: 80,
  exception: 90,
  draft: 100,
});

export {
  DEFAULT_DATA_VALIDATIONS
} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/policy-values.mjs';

const NUMERIC_FIELD_TYPES = new Set(["number", "integer", "decimal", "float", "double"]);



const DATA_EDIT_TARGET_VALUE_KIND_VALUES = new Set(["string", "boolean", "integer", "number", "ref", "stringSet"]);

const ISSUE_SUPPRESSION_MODE_VALUES = new Set(["directIssueState", "exceptionObject"]);

const ISSUE_SUPPRESSION_STATE_VALUES = new Set(["suppressed", "reopened"]);

const ISSUE_SUPPRESSION_MERGE_POLICY = "lowestPrecedenceRankThenLatestOrder";

const SOURCE_CAPABILITY_EDITOR_STATE_VALUES = new Set(["present", "available"]);

const DATA_CATALOG_NODE_KIND_VALUES = new Set([
  "sourceRoot",
  "database",
  "schema",
  "folder",
  "file",
  "bucket",
  "prefix",
  "object",
  "table",
  "view",
  "workbook",
  "worksheet",
  "asset",
]);

const DATA_CATALOG_DISCOVERY_ORIGIN_VALUES = new Set(["discovered", "authored", "imported", "inferred"]);

const DATA_CATALOG_ACCESS_STATE_VALUES = new Set(["available", "unavailable", "permissionDenied", "notMounted", "stubOnly"]);

const DATA_CATALOG_PREVIEW_STATE_VALUES = new Set(["available", "unavailable", "tooLarge", "unsupported", "permissionDenied"]);

const SOURCE_CREDENTIAL_ENVELOPE_SECRET_KIND_VALUES = new Set(["password", "token", "serviceAccountKey"]);

const SOURCE_CREDENTIAL_ENVELOPE_HANDLING_VALUES = new Set(["operatorProvided", "managedReference", "ephemeralSession"]);

const SOURCE_CREDENTIAL_ENVELOPE_ROTATION_STATE_VALUES = new Set(["static", "rotating", "expiring"]);

const SOURCE_SECRET_STORE_BACKEND_VALUES = new Set(["vaultRef", "envVar", "sessionBroker", "localProjectStore"]);

const SOURCE_SECRET_STORE_CUSTODY_VALUES = new Set(["managed", "delegated", "ephemeral"]);

const SOURCE_SECRET_CUSTODY_EVENT_KIND_VALUES = new Set([
  "leaseIssued",
  "leaseRenewed",
  "rotationRequested",
  "rotationApplied",
  "revoked",
]);

const SOURCE_SECRET_CUSTODY_EVENT_STATE_VALUES = new Set(["pending", "active", "completed", "expired", "failed"]);

const SOURCE_SECRET_CUSTODY_EVENT_ACTOR_VALUES = new Set(["operator", "system", "broker", "vault"]);

const SOURCE_WORKFLOW_RECEIPT_KIND_VALUES = new Set(["import", "extract"]);

const SOURCE_WORKFLOW_RECEIPT_STATE_VALUES = new Set(["pending", "completed", "superseded", "failed"]);

const SOURCE_WORKFLOW_RECEIPT_LINEAGE_KIND_VALUES = new Set(["progresses", "replays", "supersedes"]);

const SOURCE_WORKFLOW_RECEIPT_LINEAGE_BRANCH_STATE_VALUES = new Set(["active", "merged", "rolledBack", "superseded"]);

const SOURCE_WORKFLOW_TEMPLATE_FAMILY_VALUES = new Set(["generic", "postgres", "spreadsheet"]);

const SOURCE_WORKFLOW_TEMPLATE_INVENTORY_STATE_VALUES = new Set(["present", "available", "removed"]);

const ALLOWED_VALUE_ENTRY_STATE_VALUES = new Set(["present", "available"]);

const TRANSFORM_PARAMETER_OPTION_STATE_VALUES = new Set(["present", "available"]);

const TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_FIELD_KEY_VALUES = new Set(["value", "label", "order", "state"]);

const TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_VALUE_KIND_VALUES = new Set(["string", "integer"]);

const TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_WIDGET_KIND_VALUES = new Set(["textInput", "numberInput", "toggle", "select", "stepper"]);

const TRANSFORM_INPUT_SOURCE_GRAPH_KIND_VALUES = new Set(["join", "orchestration"]);

const TRANSFORM_INPUT_SOURCE_GRAPH_EDGE_KIND_VALUES = new Set(["joinKey", "dependency"]);

const TRANSFORM_INPUT_SOURCE_GRAPH_EDGE_INVENTORY_STATE_VALUES = new Set(["present", "available"]);

const ASSET_PICKER_CATALOG_KIND_VALUES = new Set(["authored", "remoteMirror"]);

const ASSET_PICKER_CATALOG_GROUP_RULE_SIGNAL_VALUES = new Set(["sourceKind", "livenessState", "provenanceMode"]);

const ASSET_PICKER_CATALOG_FETCH_STATE_VALUES = new Set(["idle", "loading", "ready", "error"]);

const ASSET_PICKER_CATALOG_FETCH_ACTION_KIND_VALUES = new Set(["refetchPage", "invalidateCache", "invalidateAndRefetch", "rotateCursor"]);

const ASSET_PICKER_CATALOG_INVALIDATION_POLICY_VALUES = new Set(["retainCache", "markStale", "clearEntries"]);

const ASSET_PICKER_CATALOG_RECEIPT_HISTORY_POLICY_VALUES = new Set(["appendHistory", "replaceLatest", "rolloverWindow"]);

const ASSET_PICKER_CATALOG_CURSOR_ROTATION_POLICY_VALUES = new Set(["preserveCursor", "advanceIssuedCursor", "replaceIssuedCursor"]);

const ASSET_PICKER_CATALOG_CURSOR_DIRECTION_VALUES = new Set(["current", "next", "previous"]);

const ASSET_PICKER_CATALOG_CURSOR_STATE_VALUES = new Set(["active", "stale", "exhausted"]);

const ASSET_PICKER_CATALOG_SHARED_CACHE_STATE_VALUES = new Set(["warm", "loading", "stale", "error"]);

const ASSET_PICKER_CATALOG_SYNC_ADAPTER_KIND_VALUES = new Set(["connector", "manualReplay", "fixture"]);

const COMPOSITE_UNIQUENESS_SCOPE_LINEAGE_KIND_VALUES = new Set(["measuresFrom", "supersedes"]);

const ALLOWED_VALUE_PROMOTION_WORKFLOW_ENTRY_ACTION_VALUES = new Set(["createEntry", "removeEntry", "replaceEntry"]);

const ALLOWED_VALUE_PROMOTION_WORKFLOW_APPROVAL_MODE_VALUES = new Set(["direct", "pendingApproval", "multiStep"]);

const ALLOWED_VALUE_PROMOTION_WORKFLOW_STEP_KIND_VALUES = new Set([
  "reviewCandidate",
  "createEntry",
  "requestApproval",
  "approvePromotion",
  "removeEntry",
]);

const ALLOWED_VALUE_PROMOTION_WORKFLOW_STEP_STATE_VALUES = new Set(["pending", "active", "completed", "blocked"]);

const RESET_CANDIDATE_SUPPRESSION_STATE_VALUES = new Set(["suppressed", "visible"]);

const ASSET_POLICY_SCOPE_KIND_VALUES = new Set(["asset", "row", "field", "publication"]);

const ASSET_POLICY_MERGE_SELECTION_STATE_VALUES = new Set(["selected", "available", "suppressed"]);

const ASSET_CROSS_POLICY_MERGE_ORCHESTRATION_VALUES = new Set([
  "sampleThenVisibility",
  "visibilityThenSample",
  "coordinated",
]);

const ASSET_CROSS_POLICY_WINNING_FAMILY_VALUES = new Set(["sample", "visibility", "coordinated"]);

const ASSET_CROSS_POLICY_POLICY_FAMILY_KEY_VALUES = new Set([
  "sample",
  "visibility",
  "publication",
  "retention",
  "quality",
  "compliance",
]);

const ASSET_CROSS_POLICY_POLICY_FAMILY_BINDING_KIND_VALUES = new Set([
  "policyRecord",
  "mergeLane",
  "resultLane",
]);

const ASSET_CROSS_POLICY_STAGE_KIND_VALUES = new Set([
  "familyReview",
  "crossFamilyReview",
  "publicationReview",
  "approval",
]);

const ASSET_CROSS_POLICY_STAGE_BRANCH_STATE_VALUES = new Set(["active", "merged", "rolledBack", "superseded"]);

const ASSET_SAMPLE_POLICY_MERGE_RESOLUTION_VALUES = new Set([
  "highestPrecedenceWins",
  "lowestSampleLimit",
  "mostRestrictivePlaintext",
  "composite",
]);

const ASSET_VISIBILITY_POLICY_MERGE_RESOLUTION_VALUES = new Set([
  "highestPrecedenceWins",
  "narrowestAudience",
  "narrowestPublicationScope",
  "composite",
]);

const PUBLICATION_GATE_LOGIC_KIND_VALUES = new Set(["all", "any"]);

const PUBLICATION_GATE_EXPRESSION_VALUE_KIND_VALUES = new Set(["string", "number", "boolean", "policy"]);

const TRANSFORM_INPUT_BINDING_KIND_VALUES = new Set(["field", "asset"]);

const TRANSFORM_INPUT_SOURCE_KIND_VALUES = new Set(["field", "asset"]);

const MODE_EDITOR_SELECT_OPTION_STATE_VALUES = new Set(["present", "available"]);

const MODE_EDITOR_SELECTION_MODE_VALUES = new Set(["single", "multi"]);

const GOVERNED_RAW_FACT_OPERATION_KIND_VALUES = new Set(["replaceValue", "deleteValue"]);

const TRUSTED_BRIDGE_KIND_VALUES = new Set(["experimentHandoff", "publicationCard"]);

const TRUSTED_BRIDGE_TARGET_KIND_VALUES = new Set(["experimentHandoff", "publication"]);

const TRUSTED_BRIDGE_VALIDATION_STATE_VALUES = new Set(["valid", "invalid", "empty", "unknown"]);

const TRUSTED_BRIDGE_POLICY_GROUP_LOGIC_KIND_VALUES = new Set(["all", "any"]);

const TRUSTED_BRIDGE_POLICY_CONDITION_SIGNAL_VALUES = new Set([
  "publicationKind",
  "publicationTitle",
  "targetState",
  "validationState",
  "sourceKind",
  "provenanceMode",
  "plaintextPolicy",
  "modeNote",
  "policyNotice",
  "modeNoteCount",
  "identityCount",
  "navigationGroupCount",
  "placementCount",
  "requirementCount",
  "policyNoticeCount",
]);

const TRUSTED_BRIDGE_POLICY_CONDITION_OPERATOR_VALUES = new Set([
  "equals",
  "notEquals",
  "greaterThan",
  "greaterThanOrEquals",
  "lessThan",
  "lessThanOrEquals",
  "isPresent",
  "isAbsent",
  "containsAny",
  "containsAll",
  "matchesPattern",
]);

const TRUSTED_BRIDGE_POLICY_PARAMETER_KIND_VALUES = new Set(["memberValue", "pattern"]);

const TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_VALUE_PARAMETERS = new Set(["containsAny", "containsAll"]);

const TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_PATTERN_PARAMETERS = new Set(["matchesPattern"]);

const TRUSTED_BRIDGE_REMOVAL_TARGET_KIND_VALUES = new Set(["rule", "conditionGroup", "condition", "expressionSet", "parameter"]);

const TRUSTED_BRIDGE_MUTATION_STEP_KIND_VALUES = new Set(["create", "remove", "reorder", "bundleSync"]);

const TRUSTED_BRIDGE_POLICY_OPERATORS_WITHOUT_EXPECTED_VALUE = new Set([
  "isPresent",
  "isAbsent",
  ...TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_VALUE_PARAMETERS,
  ...TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_PATTERN_PARAMETERS,
]);

export function requireOne(store, subject, predicate, label = `${subject}.${predicate}`) {
  const value = store.one(subject, predicate);
  if (!value) throw new Error(`${label} is required.`);
  return value;
}

export function requireIsa(store, subject, expectedType, label = subject) {
  const type = requireOne(store, subject, "isa", `${label}.isa`);
  if (type !== expectedType) {
    throw new Error(`${label}.isa must be ${expectedType}, got ${type}.`);
  }
}

export function requireKnownSubject(store, subject, label = subject) {
  if (!store.objects(subject, "isa").length) {
    throw new Error(`${label} targets unknown subject ${subject}.`);
  }
}

export function isa(store, subject) {
  return store.one(subject, "isa") || "";
}

export function requireOptionalAllowedValue(subject, predicate, value, allowedValues) {
  if (!value) return "";
  if (!allowedValues.has(value)) {
    throw new Error(`${subject}.${predicate} must be one of ${Array.from(allowedValues).join(", ")}, got ${value}.`);
  }
  return value;
}

export function parseTrustedBridgeConditionExpectedValue(store, subject, operator) {
  const expectedValues = store.objects(subject, "expectedValue");
  if (expectedValues.length > 1) {
    throw new Error(`${subject}.expectedValue must not declare more than one value.`);
  }
  const expectedValue = expectedValues[0] || "";
  if (TRUSTED_BRIDGE_POLICY_OPERATORS_WITHOUT_EXPECTED_VALUE.has(operator)) {
    if (expectedValue) {
      throw new Error(`${subject}.expectedValue must be omitted for operator ${operator}.`);
    }
    return "";
  }
  if (!expectedValue) {
    throw new Error(`${subject}.expectedValue is required for operator ${operator}.`);
  }
  return expectedValue;
}

function assertValidTrustedBridgePattern(subject, value) {
  try {
    new RegExp(value);
  } catch (error) {
    throw new Error(`${subject}.value must be a valid regular expression pattern, got ${value}.`);
  }
}

export function parseTrustedBridgeExpressionConditionParameter(store, subject, expectedCondition) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionParameter");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgeExpressionCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const parameterKind = requireOptionalAllowedValue(
    subject,
    "parameterKind",
    requireOne(store, subject, "parameterKind"),
    TRUSTED_BRIDGE_POLICY_PARAMETER_KIND_VALUES,
  );
  const value = requireOne(store, subject, "value");
  if (parameterKind === "pattern") {
    assertValidTrustedBridgePattern(subject, value);
  }
  return {
    subject,
    condition,
    parameterKind,
    value,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionParameter(store, subject, expectedCondition) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionParameter");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgePolicyCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const parameterKind = requireOptionalAllowedValue(
    subject,
    "parameterKind",
    requireOne(store, subject, "parameterKind"),
    TRUSTED_BRIDGE_POLICY_PARAMETER_KIND_VALUES,
  );
  const value = requireOne(store, subject, "value");
  if (parameterKind === "pattern") {
    assertValidTrustedBridgePattern(subject, value);
  }
  return {
    subject,
    condition,
    parameterKind,
    value,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeConditionOperands(store, subject, operator, parameters) {
  const expectedValue = parseTrustedBridgeConditionExpectedValue(store, subject, operator);
  const memberParameters = parameters.filter(parameter => parameter.parameterKind === "memberValue");
  const patternParameters = parameters.filter(parameter => parameter.parameterKind === "pattern");
  if (TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_VALUE_PARAMETERS.has(operator)) {
    if (expectedValue) {
      throw new Error(`${subject}.expectedValue must be omitted for operator ${operator}.`);
    }
    if (!memberParameters.length) {
      throw new Error(`${subject}.parameter must reference at least one memberValue parameter for operator ${operator}.`);
    }
    if (patternParameters.length) {
      throw new Error(`${subject}.parameter must not reference pattern parameters for operator ${operator}.`);
    }
  } else if (TRUSTED_BRIDGE_POLICY_OPERATORS_WITH_PATTERN_PARAMETERS.has(operator)) {
    if (expectedValue) {
      throw new Error(`${subject}.expectedValue must be omitted for operator ${operator}.`);
    }
    if (patternParameters.length !== 1) {
      throw new Error(`${subject}.parameter must reference exactly one pattern parameter for operator ${operator}.`);
    }
    if (memberParameters.length) {
      throw new Error(`${subject}.parameter must not reference memberValue parameters for operator ${operator}.`);
    }
  } else if (parameters.length) {
    throw new Error(`${subject}.parameter must be omitted for operator ${operator}.`);
  }
  return {
    expectedValue,
    parameters,
  };
}

export function parseOptionalPositiveInteger(subject, predicate, value, fallback = 0) {
  const raw = String(value || "").trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${subject}.${predicate} must be a positive integer, got ${raw}.`);
  }
  return parsed;
}

export function parseOptionalFiniteNumber(subject, predicate, value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${subject}.${predicate} must be a finite number, got ${raw}.`);
  }
  return parsed;
}

export function parseOptionalInteger(subject, predicate, value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${subject}.${predicate} must be an integer, got ${raw}.`);
  }
  return parsed;
}

export function defaultModeEditorWidgetKindForValueKind(valueKind) {
  switch (String(valueKind || "")) {
    case "boolean":
      return "toggle";
    case "integer":
      return "stepper";
    case "number":
      return "numberInput";
    case "stringSet":
      return "select";
    default:
      return "textInput";
  }
}

export function modeEditorWidgetCompatible(valueKind, widgetKind) {
  const kind = String(valueKind || "");
  const widget = String(widgetKind || "");
  if (!widget) return true;
  if (kind === "stringSet") return widget === "select";
  if (kind === "boolean") return ["toggle", "select"].includes(widget);
  if (kind === "integer" || kind === "number") return ["numberInput", "stepper", "select"].includes(widget);
  return ["textInput", "select"].includes(widget);
}

function compareIssueSuppressionWinners(left, right) {
  if (left.precedenceRank !== right.precedenceRank) return left.precedenceRank - right.precedenceRank;
  if (left.order !== right.order) return right.order - left.order;
  return left.subject.localeCompare(right.subject);
}

export function resolveEffectiveIssueSuppression(records = []) {
  if (!records.length) return null;
  return records.slice().sort(compareIssueSuppressionWinners)[0] || null;
}

export function parseModeMetadata(store, subject, expectedModeFamily = "") {
  const modeFamily = store.one(subject, "modeFamily") || "";
  if (expectedModeFamily && modeFamily && modeFamily !== expectedModeFamily) {
    throw new Error(`${subject}.modeFamily must be ${expectedModeFamily}, got ${modeFamily}.`);
  }
  const modeKind = store.one(subject, "modeKind") || "";
  const modeStatus = requireOptionalAllowedValue(
    subject,
    "modeStatus",
    store.one(subject, "modeStatus") || "",
    MODE_STATUS_VALUES,
  );
  if ((modeKind || modeStatus) && !modeFamily) {
    throw new Error(`${subject}.modeFamily is required when modeKind or modeStatus is declared.`);
  }
  return {
    modeFamily,
    modeKind,
    modeStatus,
    modeNotes: store.distinctActiveObjects(subject, "modeNote"),
  };
}

function fact(s, p, o) {
  return { s, p, o: String(o), pol: "is" };
}

function suffixFor(subject) {
  return String(subject || "")
    .replace(/^editTarget\./, "")
    .replace(/[^A-Za-z0-9_.-]+/g, "_") || "property";
}

function requireAssetSourceObjectKind(store, subject, assetKind, sourceObject) {
  const type = isa(store, sourceObject);
  const allowedTypes = {
    postgresTable: ["PostgresTable"],
    worksheet: ["Sheet"],
  }[assetKind];

  if (!allowedTypes) return;

  if (!allowedTypes.includes(type)) {
    throw new Error(
      `${subject}.sourceObject ${sourceObject} must be ${allowedTypes.join(" or ")} for ${assetKind}, got ${type}.`,
    );
  }
}

function requireSourceKind(store, subject, sourceKind, source) {
  const type = isa(store, source);
  const allowedTypes = {
    postgres: ["PostgresConnection"],
    spreadsheet: ["SpreadsheetWorkbook"],
    filesystem: ["FilesystemMount"],
    s3: ["S3Connection"],
  }[sourceKind];

  if (!allowedTypes) return;

  if (!allowedTypes.includes(type)) {
    throw new Error(
      `${subject}.source ${source} must be ${allowedTypes.join(" or ")} for ${sourceKind}, got ${type}.`,
    );
  }
}

function requireAssetSourceCompatibility(subject, assetKind, sourceKind) {
  const allowedSourceKinds = {
    postgresTable: ["postgres"],
    worksheet: ["spreadsheet"],
    relRelation: ["rel"],
  }[assetKind];

  if (!allowedSourceKinds) return;

  if (!allowedSourceKinds.includes(sourceKind)) {
    throw new Error(
      `${subject}.assetKind ${assetKind} requires sourceKind ${allowedSourceKinds.join(" or ")}, got ${sourceKind}.`,
    );
  }
}

export function parseSource(store, subject) {
  requireIsa(store, subject, "DataSource");
  const source = requireOne(store, subject, "source");
  requireKnownSubject(store, source, `${subject}.source`);
  const sourceKind = requireOne(store, subject, "sourceKind");
  requireSourceKind(store, subject, sourceKind, source);
  return {
    subject,
    source,
    label: store.one(subject, "label") || store.one(source, "label") || "",
    description: store.one(subject, "description") || "",
    sourceKind,
    capabilities: store.objects(subject, "capability"),
    provenanceMode: store.one(subject, "provenanceMode") || "",
  };
}

export function parseAsset(store, subject, sourceBySubject) {
  requireIsa(store, subject, "DataAsset");
  const source = requireOne(store, subject, "source");
  const sourceObject = requireOne(store, subject, "sourceObject");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  requireKnownSubject(store, sourceObject, `${subject}.sourceObject`);
  const assetKind = requireOne(store, subject, "assetKind");
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) throw new Error(`${subject}.source ${source} is not declared by the active DataSpace.`);
  requireAssetSourceCompatibility(subject, assetKind, sourceConfig.sourceKind);
  requireAssetSourceObjectKind(store, subject, assetKind, sourceObject);
  return {
    subject,
    source,
    sourceObject,
    label: store.one(subject, "label") || store.one(sourceObject, "label") || "",
    description: store.one(subject, "description") || "",
    assetKind,
    samplePolicyRecords: [],
    visibilityPolicyRecords: [],
    samplePolicy: store.one(subject, "samplePolicy") || "",
    visibility: store.one(subject, "visibility") || "",
    livenessState: store.one(subject, "livenessState") || "",
  };
}

function nodeKindForAssetKind(assetKind) {
  return ({
    postgresTable: "table",
    worksheet: "worksheet",
    relRelation: "relation",
    file: "file",
  })[assetKind] || "asset";
}

export function parseCatalogNode(store, subject, sourceBySubject, assetBySubject) {
  requireIsa(store, subject, "DataCatalogNode");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) throw new Error(`${subject}.source ${source} is not declared by the active DataSpace.`);
  const nodeKind = requireOptionalAllowedValue(
    subject,
    "nodeKind",
    requireOne(store, subject, "nodeKind"),
    DATA_CATALOG_NODE_KIND_VALUES,
  );
  const sourceObject = store.one(subject, "sourceObject") || "";
  if (sourceObject) requireKnownSubject(store, sourceObject, `${subject}.sourceObject`);
  const asset = store.one(subject, "asset") || "";
  if (asset) {
    requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
    const assetConfig = assetBySubject.get(asset);
    if (!assetConfig) throw new Error(`${subject}.asset ${asset} is not declared by the active DataSpace.`);
    if (assetConfig.source !== source) {
      throw new Error(`${subject}.asset ${asset} must belong to source ${source}, got ${assetConfig.source}.`);
    }
  }
  return {
    subject,
    source,
    label: requireOne(store, subject, "label"),
    nodeKind,
    parent: store.one(subject, "parent") || "",
    sourceObject,
    asset,
    path: store.one(subject, "path") || "",
    pathSegment: store.one(subject, "pathSegment") || "",
    order: Number(store.one(subject, "order") || "0"),
    state: store.one(subject, "state") || "",
    discoveryOrigin: requireOptionalAllowedValue(
      subject,
      "discoveryOrigin",
      store.one(subject, "discoveryOrigin") || "",
      DATA_CATALOG_DISCOVERY_ORIGIN_VALUES,
    ),
    accessState: requireOptionalAllowedValue(
      subject,
      "accessState",
      store.one(subject, "accessState") || "",
      DATA_CATALOG_ACCESS_STATE_VALUES,
    ),
    previewState: requireOptionalAllowedValue(
      subject,
      "previewState",
      store.one(subject, "previewState") || "",
      DATA_CATALOG_PREVIEW_STATE_VALUES,
    ),
    synthetic: false,
  };
}

export function syntheticCatalogNodesForDataSpace(dataSpaceSubject, sources, assets) {
  const nodes = [];
  for (const [sourceIndex, source] of sources.entries()) {
    const rootSubject = `catalogNode.${suffixFor(dataSpaceSubject)}.${suffixFor(source.subject)}.root`;
    const sourceLabel = source.label || source.subject;
    nodes.push({
      subject: rootSubject,
      source: source.subject,
      label: sourceLabel,
      nodeKind: "sourceRoot",
      parent: "",
      sourceObject: source.source,
      asset: "",
      path: sourceLabel,
      pathSegment: sourceLabel,
      order: (sourceIndex + 1) * 1000,
      state: "available",
      discoveryOrigin: "inferred",
      accessState: "available",
      previewState: "",
      synthetic: true,
    });
    for (const [assetIndex, asset] of assets.filter(candidate => candidate.source === source.subject).entries()) {
      const label = asset.label || asset.subject;
      nodes.push({
        subject: `catalogNode.${suffixFor(dataSpaceSubject)}.${suffixFor(asset.subject)}`,
        source: source.subject,
        label,
        nodeKind: nodeKindForAssetKind(asset.assetKind),
        parent: rootSubject,
        sourceObject: asset.sourceObject,
        asset: asset.subject,
        path: `${sourceLabel}/${label}`,
        pathSegment: label,
        order: (sourceIndex + 1) * 1000 + assetIndex + 1,
        state: asset.livenessState || "available",
        discoveryOrigin: "inferred",
        accessState: "available",
        previewState: "",
        synthetic: true,
      });
    }
  }
  return nodes;
}

export function parseCatalogNodes(store, dataSpaceSubject, sources, sourceBySubject, assets, assetBySubject) {
  const authored = store.distinctSubjects("isa", "DataCatalogNode")
    .filter(subject => sourceBySubject.has(store.one(subject, "source") || ""))
    .map(subject => parseCatalogNode(store, subject, sourceBySubject, assetBySubject))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label) || a.subject.localeCompare(b.subject));
  if (!authored.length) return syntheticCatalogNodesForDataSpace(dataSpaceSubject, sources, assets);

  const bySubject = new Map(authored.map(node => [node.subject, node]));
  for (const node of authored) {
    if (!node.parent) continue;
    requireIsa(store, node.parent, "DataCatalogNode", `${node.subject}.parent ${node.parent}`);
    const parent = bySubject.get(node.parent);
    if (!parent) throw new Error(`${node.subject}.parent ${node.parent} is not declared by the active DataSpace catalog.`);
    if (parent.source !== node.source) {
      throw new Error(`${node.subject}.parent ${node.parent} must belong to source ${node.source}, got ${parent.source}.`);
    }
  }
  for (const node of authored) {
    const seen = new Set();
    let current = node;
    while (current?.parent) {
      if (seen.has(current.subject)) throw new Error(`${node.subject}.parent chain must not contain a cycle.`);
      seen.add(current.subject);
      current = bySubject.get(current.parent);
    }
  }
  return authored;
}

export function parseField(store, subject) {
  requireIsa(store, subject, "DataField");
  const asset = requireOne(store, subject, "asset");
  const sourceField = requireOne(store, subject, "sourceField");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  requireKnownSubject(store, sourceField, `${subject}.sourceField`);
  const sensitivity = requireOptionalAllowedValue(
    subject,
    "sensitivity",
    store.one(subject, "sensitivity") || "",
    FIELD_SENSITIVITY_LEVELS,
  );
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );
  return {
    subject,
    asset,
    sourceField,
    displayName: store.one(subject, "displayName") || store.one(sourceField, "name") || "",
    inferredType: store.one(subject, "inferredType") || "",
    authoredType: store.one(subject, "authoredType") || "",
    role: store.one(subject, "role") || "",
    unit: store.one(subject, "unit") || "",
    nullable: store.one(subject, "nullable") || "",
    defaultVisibility: store.one(subject, "defaultVisibility") || "",
    sensitivity,
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
    inferenceState: requireOne(store, subject, "inferenceState"),
    profileSummarySubjects: store.objects(subject, "profileSummary"),
    profileSummaries: [],
    nullCount: store.one(subject, "nullCount") || "",
    duplicateCount: store.one(subject, "duplicateCount") || "",
    minObserved: store.one(subject, "minObserved") || "",
    maxObserved: store.one(subject, "maxObserved") || "",
    observedValues: store.objects(subject, "observedValue"),
  };
}

export function parseFieldProfileSummary(store, subject, activeFieldSubjects) {
  requireIsa(store, subject, "DataFieldProfileSummary");
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  if (!activeFieldSubjects.has(field)) {
    throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
  }
  return {
    subject,
    field,
    nullCount: store.one(subject, "nullCount") || "",
    distinctCount: store.one(subject, "distinctCount") || "",
    minValue: store.one(subject, "minValue") || "",
    maxValue: store.one(subject, "maxValue") || "",
    exampleValues: store.objects(subject, "exampleValue"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireSpreadsheetFieldSourceCompatibility(store, field, asset) {
  const sourceField = field.sourceField;
  requireIsa(store, sourceField, "DataSpreadsheetFieldSource", `${field.subject}.sourceField ${sourceField}`);
  if (asset.assetKind !== "worksheet") {
    throw new Error(`${field.subject}.sourceField ${sourceField} requires a worksheet asset, got ${asset.assetKind}.`);
  }

  const sheet = requireOne(store, sourceField, "sheet");
  requireIsa(store, sheet, "Sheet", `${sourceField}.sheet ${sheet}`);
  if (sheet !== asset.sourceObject) {
    throw new Error(`${field.subject}.sourceField ${sourceField} must reference sheet ${asset.sourceObject}, got ${sheet}.`);
  }

  const headerCell = requireOne(store, sourceField, "headerCell");
  requireIsa(store, headerCell, "Cell", `${sourceField}.headerCell ${headerCell}`);
  const headerCellSheet = requireOne(store, headerCell, "sheet", `${headerCell}.sheet`);
  if (headerCellSheet !== sheet) {
    throw new Error(`${sourceField}.headerCell ${headerCell} must belong to sheet ${sheet}, got ${headerCellSheet}.`);
  }

  for (const sampleCell of store.objects(sourceField, "sampleCell")) {
    requireIsa(store, sampleCell, "Cell", `${sourceField}.sampleCell ${sampleCell}`);
    const sampleCellSheet = requireOne(store, sampleCell, "sheet", `${sampleCell}.sheet`);
    if (sampleCellSheet !== sheet) {
      throw new Error(`${sourceField}.sampleCell ${sampleCell} must belong to sheet ${sheet}, got ${sampleCellSheet}.`);
    }
  }
}

function requireDataFieldSourceCompatibility(store, field, assetBySubject) {
  const asset = assetBySubject.get(field.asset);
  if (!asset) return;
  const sourceFieldType = isa(store, field.sourceField);
  if (sourceFieldType === "DataSpreadsheetFieldSource") {
    requireSpreadsheetFieldSourceCompatibility(store, field, asset);
  }
}

export function parseIssue(store, subject, activeAssetSubjects, activeFieldSubjects) {
  requireIsa(store, subject, "DataIssue");
  const asset = store.one(subject, "asset") || "";
  if (asset) {
    requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
    if (!activeAssetSubjects.has(asset)) {
      throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
    }
  }
  const field = store.one(subject, "field") || "";
  if (field) {
    requireIsa(store, field, "DataField", `${subject}.field ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
  }
  const suppressionMode = requireOptionalAllowedValue(
    subject,
    "suppressionMode",
    store.one(subject, "suppressionMode") || "",
    ISSUE_SUPPRESSION_MODE_VALUES,
  ) || "directIssueState";
  return {
    subject,
    asset,
    field,
    issueKind: requireOne(store, subject, "issueKind"),
    state: requireOne(store, subject, "state"),
    severity: requireOne(store, subject, "severity"),
    message: requireOne(store, subject, "message"),
    suppressionMode,
    suppressionReason: store.one(subject, "suppressionReason") || "",
  };
}

export function parseIssueSuppression(store, subject, dataSpaceSubject, activeIssueSubjects) {
  requireIsa(store, subject, "DataIssueSuppression");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const issue = requireOne(store, subject, "issue");
  requireIsa(store, issue, "DataIssue", `${subject}.issue ${issue}`);
  if (!activeIssueSubjects.has(issue)) {
    throw new Error(`${subject}.issue must reference an active DataSpace issue, got ${issue}.`);
  }
  const creator = store.one(subject, "creator") || "";
  if (creator) {
    requireIsa(store, creator, "DataIssueSuppressionCreator", `${subject}.creator ${creator}`);
    const creatorIssue = requireOne(store, creator, "issue");
    if (creatorIssue !== issue) {
      throw new Error(`${subject}.creator ${creator} must reference ${issue}, got ${creatorIssue}.`);
    }
  }
  return {
    subject,
    dataSpace,
    issue,
    creator,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ISSUE_SUPPRESSION_STATE_VALUES,
    ),
    reason: store.one(subject, "reason") || "",
    precedenceRank: parseOptionalPositiveInteger(subject, "precedenceRank", store.one(subject, "precedenceRank"), 1),
    order: Number(store.one(subject, "order") || 0),
  };
}

export function parseIssueAuditReceipt(store, subject, dataSpaceSubject, activeIssueSubjects) {
  requireIsa(store, subject, "DataIssueAuditReceipt");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const issue = requireOne(store, subject, "issue");
  requireIsa(store, issue, "DataIssue", `${subject}.issue ${issue}`);
  if (!activeIssueSubjects.has(issue)) {
    throw new Error(`${subject}.issue must reference an active DataSpace issue, got ${issue}.`);
  }
  return {
    subject,
    dataSpace,
    issue,
    actionKind: requireOne(store, subject, "actionKind"),
    state: requireOne(store, subject, "state"),
    actor: requireOne(store, subject, "actor"),
    timestamp: requireOne(store, subject, "timestamp"),
    reason: store.one(subject, "reason") || "",
    priorReceipt: store.one(subject, "priorReceipt") || "",
    mutationReceipt: store.one(subject, "mutationReceipt") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseIssueSuppressionCreator(
  store,
  subject,
  expectedEditor,
  expectedIssue,
) {
  requireIsa(store, subject, "DataIssueSuppressionCreator");
  const editor = requireOne(store, subject, "editor");
  requireIsa(store, editor, "DataIssueSuppressionEditor", `${subject}.editor ${editor}`);
  if (editor !== expectedEditor) {
    throw new Error(`${subject}.editor must reference ${expectedEditor}, got ${editor}.`);
  }
  const issue = requireOne(store, subject, "issue");
  requireIsa(store, issue, "DataIssue", `${subject}.issue ${issue}`);
  if (issue !== expectedIssue) {
    throw new Error(`${subject}.issue must reference ${expectedIssue}, got ${issue}.`);
  }
  return {
    subject,
    editor,
    issue,
    subjectPrefix: store.one(subject, "subjectPrefix") || "",
    defaultState: requireOptionalAllowedValue(
      subject,
      "defaultState",
      store.one(subject, "defaultState") || "",
      ISSUE_SUPPRESSION_STATE_VALUES,
    ),
    defaultPrecedenceRank: parseOptionalPositiveInteger(
      subject,
      "defaultPrecedenceRank",
      store.one(subject, "defaultPrecedenceRank"),
      1,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseIssueSuppressionRecordEditor(
  store,
  subject,
  expectedEditor,
  expectedIssue,
  issueSuppressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataIssueSuppressionRecordEditor");
  const editor = requireOne(store, subject, "editor");
  requireIsa(store, editor, "DataIssueSuppressionEditor", `${subject}.editor ${editor}`);
  if (editor !== expectedEditor) {
    throw new Error(`${subject}.editor must reference ${expectedEditor}, got ${editor}.`);
  }
  const issue = requireOne(store, subject, "issue");
  requireIsa(store, issue, "DataIssue", `${subject}.issue ${issue}`);
  if (issue !== expectedIssue) {
    throw new Error(`${subject}.issue must reference ${expectedIssue}, got ${issue}.`);
  }
  const suppression = requireOne(store, subject, "suppression");
  const suppressionConfig = issueSuppressionBySubject.get(suppression);
  if (!suppressionConfig) {
    throw new Error(`${subject}.suppression must reference an active DataIssueSuppression, got ${suppression}.`);
  }
  if (suppressionConfig.issue !== expectedIssue) {
    throw new Error(`${subject}.suppression must reference a suppression record for ${expectedIssue}, got ${suppressionConfig.issue}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    editor,
    issue,
    suppression,
    stateEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "stateEdit",
      suppression,
      "state",
      activeEditTargetSubjects,
    ),
    reasonEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "reasonEdit",
      suppression,
      "reason",
      activeEditTargetSubjects,
    ),
    precedenceRankEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "precedenceRankEdit",
      suppression,
      "precedenceRank",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      suppression,
      "order",
      activeEditTargetSubjects,
    ),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseIssueSuppressionMergeTrace(
  store,
  subject,
  expectedEditor,
  expectedIssue,
  issueSuppressionBySubject,
) {
  requireIsa(store, subject, "DataIssueSuppressionMergeTrace");
  const editor = requireOne(store, subject, "editor");
  requireIsa(store, editor, "DataIssueSuppressionEditor", `${subject}.editor ${editor}`);
  if (editor !== expectedEditor) {
    throw new Error(`${subject}.editor must reference ${expectedEditor}, got ${editor}.`);
  }
  const issue = requireOne(store, subject, "issue");
  requireIsa(store, issue, "DataIssue", `${subject}.issue ${issue}`);
  if (issue !== expectedIssue) {
    throw new Error(`${subject}.issue must reference ${expectedIssue}, got ${issue}.`);
  }
  const winningSuppression = requireOne(store, subject, "winningSuppression");
  const winningConfig = issueSuppressionBySubject.get(winningSuppression);
  if (!winningConfig) {
    throw new Error(`${subject}.winningSuppression must reference an active DataIssueSuppression, got ${winningSuppression}.`);
  }
  if (winningConfig.issue !== expectedIssue) {
    throw new Error(`${subject}.winningSuppression must reference a suppression record for ${expectedIssue}, got ${winningConfig.issue}.`);
  }
  const competingSuppression = requireOne(store, subject, "competingSuppression");
  const competingConfig = issueSuppressionBySubject.get(competingSuppression);
  if (!competingConfig) {
    throw new Error(`${subject}.competingSuppression must reference an active DataIssueSuppression, got ${competingSuppression}.`);
  }
  if (competingConfig.issue !== expectedIssue) {
    throw new Error(`${subject}.competingSuppression must reference a suppression record for ${expectedIssue}, got ${competingConfig.issue}.`);
  }
  if (winningSuppression === competingSuppression) {
    throw new Error(`${subject}.competingSuppression must differ from ${subject}.winningSuppression.`);
  }
  const mergePolicy = requireOne(store, subject, "mergePolicy");
  if (mergePolicy !== ISSUE_SUPPRESSION_MERGE_POLICY) {
    throw new Error(`${subject}.mergePolicy must be ${ISSUE_SUPPRESSION_MERGE_POLICY}, got ${mergePolicy}.`);
  }
  return {
    subject,
    editor,
    issue,
    winningSuppression,
    competingSuppression,
    mergePolicy,
    resolutionReason: store.one(subject, "resolutionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseIssueSuppressionEditor(
  store,
  subject,
  issueBySubject,
  issueSuppressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataIssueSuppressionEditor");
  const issue = requireOne(store, subject, "issue");
  const issueConfig = issueBySubject.get(issue);
  if (!issueConfig) {
    throw new Error(`${subject}.issue must reference an active DataSpace issue, got ${issue}.`);
  }
  if (issueConfig.suppressionMode !== "exceptionObject") {
    throw new Error(`${subject}.issue must reference an exceptionObject issue, got ${issueConfig.suppressionMode || "directIssueState"}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const creatorSubject = store.one(subject, "creator") || "";
  const creator = creatorSubject
    ? parseIssueSuppressionCreator(store, creatorSubject, subject, issue)
    : null;
  const recordEditors = store.objects(subject, "recordEditor")
    .map(recordEditor => parseIssueSuppressionRecordEditor(
      store,
      recordEditor,
      subject,
      issue,
      issueSuppressionBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.suppression.localeCompare(b.suppression));
  const mergeTraces = store.objects(subject, "mergeTrace")
    .map(mergeTrace => parseIssueSuppressionMergeTrace(
      store,
      mergeTrace,
      subject,
      issue,
      issueSuppressionBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const suppressionRecords = recordEditors
    .map(recordEditor => issueSuppressionBySubject.get(recordEditor.suppression))
    .filter(Boolean);
  const winningSuppression = resolveEffectiveIssueSuppression(suppressionRecords);
  for (const mergeTrace of mergeTraces) {
    if (!winningSuppression) {
      throw new Error(`${mergeTrace.subject}.winningSuppression cannot be declared when ${issue} has no suppression records.`);
    }
    if (mergeTrace.winningSuppression !== winningSuppression.subject) {
      throw new Error(
        `${mergeTrace.subject}.winningSuppression must reference the effective winner ${winningSuppression.subject}, got ${mergeTrace.winningSuppression}.`,
      );
    }
  }
  return {
    subject,
    issue,
    creator,
    recordEditors,
    mergeTraces,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseEditTarget(store, subject) {
  requireIsa(store, subject, "DataEditTarget");
  const target = requireOne(store, subject, "target");
  const predicate = requireOne(store, subject, "predicate");
  if (!store.objects(target, predicate).length && !store.objects(target, "isa").length) {
    throw new Error(`${subject} targets unknown subject ${target}.`);
  }
  const valueKind = requireOptionalAllowedValue(
    subject,
    "valueKind",
    requireOne(store, subject, "valueKind"),
    DATA_EDIT_TARGET_VALUE_KIND_VALUES,
  );
  const slot = slotMetadataForTargetPredicate(store, target, predicate);
  if (valueKind === "stringSet") {
    if (slot && slot.valueType !== "string") {
      throw new Error(`${subject}.valueKind stringSet requires ${target}.${predicate} to use string values, got ${slot.valueType}.`);
    }
    if (slot && slot.cardinality !== "many") {
      throw new Error(`${subject}.valueKind stringSet requires ${target}.${predicate} to be a many-valued slot, got ${slot.cardinality}.`);
    }
  }
  return {
    subject,
    family: requireOne(store, subject, "family"),
    target,
    predicate,
    label: requireOne(store, subject, "label"),
    valueKind,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function slotMetadataForTargetPredicate(store, target, predicate) {
  const targetType = isa(store, target);
  if (!targetType) return null;
  for (const iface of store.subjects("type", targetType)) {
    for (const slot of store.objects(iface, "slot")) {
      if (store.one(slot, "predicate") !== predicate) continue;
      return {
        subject: slot,
        cardinality: store.one(slot, "cardinality") || "",
        valueType: store.one(slot, "valueType") || "",
      };
    }
  }
  return null;
}

export function parseResetToInherited(store, editTargetConfig, resolvedProperty) {
  const winningValue = resolvedProperty?.value || null;
  if (!editTargetConfig?.target || !editTargetConfig?.predicate || !winningValue) return null;
  if (resolvedProperty?.state === "conflict") return null;
  if (winningValue.sourceLayer === "inherited") return null;
  const inheritedCandidate = (resolvedProperty?.candidates || []).find(candidate => candidate?.sourceLayer === "inherited") || null;
  if (!inheritedCandidate) return null;
  const slot = slotMetadataForTargetPredicate(store, editTargetConfig.target, editTargetConfig.predicate);
  const currentValues = store.distinctActiveObjects(editTargetConfig.target, editTargetConfig.predicate);
  if (slot && !["optional", "many"].includes(slot.cardinality)) return null;
  if (!slot && currentValues.length !== 1) return null;
  if (!currentValues.includes(winningValue.effectiveValue)) return null;
  return {
    targetSubject: editTargetConfig.target,
    predicate: editTargetConfig.predicate,
    currentValue: winningValue.effectiveValue,
    inheritedValue: inheritedCandidate.effectiveValue,
    inheritedProvider: inheritedCandidate.provider,
    valueKind: slot?.valueType || editTargetConfig.valueKind || "string",
    slotCardinality: slot?.cardinality || "optional",
  };
}

export function parseResetCandidateSuppression(store, subject, rowSubject, candidateSourceLayers) {
  requireIsa(store, subject, "DataResetCandidateSuppression");
  const row = requireOne(store, subject, "row");
  if (row !== rowSubject) {
    throw new Error(`${subject}.row must reference ${rowSubject}, got ${row}.`);
  }
  const sourceLayer = requireOne(store, subject, "sourceLayer");
  if (!candidateSourceLayers.has(sourceLayer)) {
    throw new Error(`${subject}.sourceLayer must reference a fallback lane on ${rowSubject}, got ${sourceLayer}.`);
  }
  const state = requireOptionalAllowedValue(
    subject,
    "state",
    requireOne(store, subject, "state"),
    RESET_CANDIDATE_SUPPRESSION_STATE_VALUES,
  );
  return {
    subject,
    row,
    sourceLayer,
    state,
    reason: store.one(subject, "reason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseResetCandidateSuppressions(store, rowSubject, resolvedProperty) {
  const candidateSourceLayers = new Set(
    (resolvedProperty?.candidates || [])
      .map(candidate => candidate?.sourceLayer || "")
      .filter(Boolean),
  );
  const suppressions = store.objects(rowSubject, "resetCandidateSuppression")
    .map(subject => parseResetCandidateSuppression(store, subject, rowSubject, candidateSourceLayers));
  const suppressionBySourceLayer = new Map();
  for (const suppression of suppressions.sort((a, b) => b.order - a.order || b.subject.localeCompare(a.subject))) {
    if (!suppressionBySourceLayer.has(suppression.sourceLayer)) {
      suppressionBySourceLayer.set(suppression.sourceLayer, suppression);
    }
  }
  return suppressionBySourceLayer;
}

export function deriveResetCandidateInventory(store, rowSubject, editTargetConfig, resolvedProperty) {
  const winningValue = resolvedProperty?.value || null;
  if (!editTargetConfig?.target || !editTargetConfig?.predicate || !winningValue) return [];
  if (resolvedProperty?.state === "conflict") return [];
  const slot = slotMetadataForTargetPredicate(store, editTargetConfig.target, editTargetConfig.predicate);
  const currentValues = store.distinctActiveObjects(editTargetConfig.target, editTargetConfig.predicate);
  if (slot && !["optional", "many"].includes(slot.cardinality)) return [];
  if (!slot && currentValues.length !== 1) return [];
  if (!currentValues.includes(winningValue.effectiveValue)) return [];

  const remainingCandidates = (resolvedProperty?.candidates || [])
    .filter(candidate => candidate?.subject !== winningValue.subject);
  if (!remainingCandidates.length) return [];

  const ranked = [...remainingCandidates].sort((a, b) => {
    const precedenceA = DATA_RESOLUTION_PRECEDENCE[a?.sourceLayer] ?? -1;
    const precedenceB = DATA_RESOLUTION_PRECEDENCE[b?.sourceLayer] ?? -1;
    if (precedenceA !== precedenceB) return precedenceB - precedenceA;
    return (a?.order || 0) - (b?.order || 0);
  });
  const suppressionsBySourceLayer = rowSubject
    ? parseResetCandidateSuppressions(store, rowSubject, resolvedProperty)
    : new Map();
  const activeRanked = ranked.filter(candidate => {
    const suppression = suppressionsBySourceLayer.get(candidate?.sourceLayer || "");
    return suppression?.state !== "suppressed";
  });
  const topPrecedence = DATA_RESOLUTION_PRECEDENCE[activeRanked[0]?.sourceLayer] ?? -1;
  const topCandidates = activeRanked.filter(candidate => (
    (DATA_RESOLUTION_PRECEDENCE[candidate?.sourceLayer] ?? -1) === topPrecedence
  ));
  const topSignatures = new Set(topCandidates.map(candidate => candidateSignature(candidate)));
  const topConflict = topSignatures.size > 1;
  const activeIndexBySubject = new Map(activeRanked.map((candidate, index) => [candidate.subject, index]));

  return ranked.map(candidate => {
    const suppression = suppressionsBySourceLayer.get(candidate?.sourceLayer || "") || null;
    if (suppression?.state === "suppressed") {
      return {
        subject: candidate.subject,
        targetSubject: editTargetConfig.target,
        predicate: editTargetConfig.predicate,
        currentValue: winningValue.effectiveValue,
        fallbackValue: candidate.effectiveValue,
        fallbackProvider: candidate.provider,
        fallbackSourceLayer: candidate.sourceLayer,
        valueKind: slot?.valueType || editTargetConfig.valueKind || "string",
        slotCardinality: slot?.cardinality || "optional",
        order: (activeIndexBySubject.size + 1),
        availability: "suppressed",
        actionable: false,
        note: suppression.reason || "Suppressed by authored lane suppression.",
        suppressionSubject: suppression.subject,
        suppressionReason: suppression.reason,
        suppressionState: suppression.state,
      };
    }
    const activeIndex = activeIndexBySubject.get(candidate.subject) ?? -1;
    const candidatePrecedence = DATA_RESOLUTION_PRECEDENCE[candidate?.sourceLayer] ?? -1;
    const sameAsTopPrecedence = candidatePrecedence === topPrecedence;
    const actionable = activeIndex === 0 && !topConflict;
    let availability = actionable ? "next" : "available";
    let note = "";
    if (topConflict && sameAsTopPrecedence) {
      availability = "blockedConflict";
      note = "Conflicting fallback candidates share the same precedence.";
    } else if (!actionable && sameAsTopPrecedence) {
      availability = "sameLane";
      note = "Equivalent fallback remains on the current next-precedence lane.";
    } else if (!sameAsTopPrecedence) {
      availability = "blockedHigherLane";
      note = "Higher-precedence fallback lanes must clear before this candidate becomes active.";
    }
    return {
      subject: candidate.subject,
      targetSubject: editTargetConfig.target,
      predicate: editTargetConfig.predicate,
      currentValue: winningValue.effectiveValue,
      fallbackValue: candidate.effectiveValue,
      fallbackProvider: candidate.provider,
      fallbackSourceLayer: candidate.sourceLayer,
      valueKind: slot?.valueType || editTargetConfig.valueKind || "string",
      slotCardinality: slot?.cardinality || "optional",
      order: activeIndex + 1,
      availability,
      actionable,
      note,
      suppressionSubject: suppression?.subject || `resetCandidateSuppression.${suffixFor(rowSubject)}.${suffixFor(candidate?.sourceLayer || "lane")}`,
      suppressionReason: suppression?.reason || "",
      suppressionState: suppression?.state || "",
    };
  });
}

export function parseResetAction(store, rowSubject, editTargetConfig, resolvedProperty) {
  const candidates = deriveResetCandidateInventory(store, rowSubject, editTargetConfig, resolvedProperty);
  return candidates.find(candidate => candidate.actionable) || null;
}

export function requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, predicate = "editTarget") {
  if (!activeEditTargetSubjects.has(editTarget)) {
    throw new Error(`${subject}.${predicate} ${editTarget} is not declared by the active DataSpace.`);
  }
}

export function requireActiveProvider(subject, provider, activeProviderSubjects) {
  if (!activeProviderSubjects.has(provider)) {
    throw new Error(`${subject}.provider ${provider} is not in the active DataSpace object graph.`);
  }
}

export function requireResolvedValueProviderKind(store, subject, sourceLayer, provider) {
  if (isa(store, provider) !== "DataValueProvider") return;

  const providerKind = requireOne(store, provider, "providerKind", `${provider}.providerKind`);
  if (providerKind !== sourceLayer) {
    throw new Error(`${subject}.sourceLayer ${sourceLayer} must match ${provider}.providerKind ${providerKind}.`);
  }
}

export function normalizeParseOptions(dataSpaceSubjectOrOptions, maybeOptions) {
  if (
    dataSpaceSubjectOrOptions
    && typeof dataSpaceSubjectOrOptions === "object"
    && !Array.isArray(dataSpaceSubjectOrOptions)
  ) {
    return {
      dataSpaceSubject: dataSpaceSubjectOrOptions.dataSpaceSubject || null,
      sourceFactTypes: dataSpaceSubjectOrOptions.sourceFactTypes || [],
    };
  }

  return {
    dataSpaceSubject: dataSpaceSubjectOrOptions || null,
    sourceFactTypes: (maybeOptions && maybeOptions.sourceFactTypes) || [],
  };
}

function unique(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

export function sourceFactTypesForStore(store, optionTypes) {
  return unique([
    ...DEFAULT_SOURCE_FACT_TYPES,
    ...store.factsForPredicate("dataSpaceSourceFactType").map(fact => fact.o),
    ...optionTypes,
  ]);
}

export function requireResolvedValueProviderFamily(store, subject, sourceLayer, provider, sourceFactTypes) {
  const type = isa(store, provider);
  const allowedTypes = {
    source: ["DataSource", ...sourceFactTypes],
    inference: ["DataField"],
    authored: ["DataField"],
    asset: ["DataAsset"],
  }[sourceLayer];

  if (!allowedTypes || type === "DataValueProvider") return;

  if (!allowedTypes.includes(type)) {
    throw new Error(
      `${subject}.provider ${provider} must be ${allowedTypes.join(" or ")} for sourceLayer ${sourceLayer}, got ${type}.`,
    );
  }
}

export function parseResolvedValue(store, subject, activeEditTargetSubjects, activeProviderSubjects, sourceFactTypes) {
  requireIsa(store, subject, "DataResolvedValue");
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const provider = requireOne(store, subject, "provider");
  requireKnownSubject(store, provider, `${subject}.provider`);
  requireActiveProvider(subject, provider, activeProviderSubjects);
  const sourceLayer = requireOne(store, subject, "sourceLayer");
  requireResolvedValueProviderKind(store, subject, sourceLayer, provider);
  requireResolvedValueProviderFamily(store, subject, sourceLayer, provider, sourceFactTypes);
  return {
    subject,
    editTarget,
    effectiveValue: requireOne(store, subject, "effectiveValue"),
    valueKind: requireOne(store, subject, "valueKind"),
    sourceLayer,
    provider,
    validationState: requireOne(store, subject, "validationState"),
    message: store.one(subject, "message") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseValueProvider(store, subject, activeEditTargetSubjects) {
  requireIsa(store, subject, "DataValueProvider");
  const target = store.one(subject, "target") || "";
  if (target) {
    requireKnownSubject(store, target, `${subject}.target`);
    requireIsa(store, target, "DataEditTarget", `${subject}.target ${target}`);
    requireActiveEditTarget(subject, target, activeEditTargetSubjects, "target");
  }
  return {
    subject,
    providerKind: requireOne(store, subject, "providerKind"),
    label: requireOne(store, subject, "label"),
    target,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseValidationPolicy(store, subject) {
  requireIsa(store, subject, "DataValidationPolicy");
  return {
    subject,
    validations: store.objects(subject, "validation"),
  };
}

export function parseValidationRule(store, subject) {
  requireIsa(store, subject, "DataValidationRule");
  return {
    subject,
    validation: requireOne(store, subject, "validation"),
    asset: store.one(subject, "asset") || "",
    field: store.one(subject, "field") || "",
    fieldName: store.one(subject, "fieldName") || "",
    expectedType: store.one(subject, "expectedType") || "",
    nullable: store.one(subject, "nullable") || "",
    unique: store.one(subject, "unique") || "",
    uniquenessKeySubjects: store.objects(subject, "uniquenessKey"),
    uniquenessKeys: [],
    compositeUniquenessProfileSubjects: store.objects(subject, "compositeUniquenessProfile"),
    compositeUniquenessProfiles: [],
    minValue: store.one(subject, "minValue") || "",
    maxValue: store.one(subject, "maxValue") || "",
    rawAllowedValues: store.objects(subject, "allowedValue"),
    allowedValueEntrySubjects: store.objects(subject, "allowedValueEntry"),
    allowedValueEntries: [],
    allowedValueCandidateSubjects: store.objects(subject, "allowedValueCandidate"),
    allowedValueCandidates: [],
    allowedValueCandidatePromotionSubjects: store.objects(subject, "allowedValueCandidatePromotion"),
    allowedValueCandidatePromotions: [],
    allowedValues: store.objects(subject, "allowedValue"),
    severity: store.one(subject, "severity") || "",
    message: store.one(subject, "message") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseUniquenessKey(store, subject, activeValidationRuleSubjects, activeFieldSubjects) {
  requireIsa(store, subject, "DataUniquenessKey");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  if (!activeFieldSubjects.has(field)) {
    throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
  }
  return {
    subject,
    rule,
    field,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseCompositeUniquenessProfile(
  store,
  subject,
  activeValidationRuleSubjects,
  uniquenessKeyBySubject,
  activeFieldSubjects,
) {
  requireIsa(store, subject, "DataCompositeUniquenessProfile");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const keys = store.objects(subject, "key").map(keySubject => {
    const key = uniquenessKeyBySubject.get(keySubject);
    if (!key) {
      throw new Error(`${subject}.key must reference an active DataUniquenessKey, got ${keySubject}.`);
    }
    if (key.rule !== rule) {
      throw new Error(`${subject}.key ${keySubject} must reference a uniqueness key for ${rule}, got ${key.rule}.`);
    }
    return key;
  });
  const scopeSubject = store.one(subject, "scope") || "";
  const scope = scopeSubject
    ? parseCompositeUniquenessProfileScope(store, scopeSubject, subject, activeFieldSubjects)
    : null;
  return {
    subject,
    rule,
    keys: keys.sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    scope,
    duplicateCount: store.one(subject, "duplicateCount") || "",
    sampleCount: store.one(subject, "sampleCount") || "",
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseCompositeUniquenessProfileScopeTemplate(store, subject, activeFieldSubjects) {
  requireIsa(store, subject, "DataCompositeUniquenessProfileScopeTemplate");
  const partitionFields = store.objects(subject, "partitionField").map(field => {
    requireIsa(store, field, "DataField", `${subject}.partitionField ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.partitionField must reference an active DataSpace field, got ${field}.`);
    }
    return field;
  });
  const windowField = store.one(subject, "windowField") || "";
  if (windowField) {
    requireIsa(store, windowField, "DataField", `${subject}.windowField ${windowField}`);
    if (!activeFieldSubjects.has(windowField)) {
      throw new Error(`${subject}.windowField must reference an active DataSpace field, got ${windowField}.`);
    }
  }
  return {
    subject,
    nullEquivalencePolicy: requireOptionalAllowedValue(
      subject,
      "nullEquivalencePolicy",
      requireOne(store, subject, "nullEquivalencePolicy"),
      COMPOSITE_UNIQUENESS_NULL_EQUIVALENCE_VALUES,
    ),
    partitionFields,
    windowField,
    snapshotLabel: store.one(subject, "snapshotLabel") || "",
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseCompositeUniquenessProfileScope(store, subject, expectedProfile, activeFieldSubjects) {
  requireIsa(store, subject, "DataCompositeUniquenessProfileScope");
  const profile = requireOne(store, subject, "profile");
  requireIsa(store, profile, "DataCompositeUniquenessProfile", `${subject}.profile ${profile}`);
  if (profile !== expectedProfile) {
    throw new Error(`${subject}.profile must reference ${expectedProfile}, got ${profile}.`);
  }
  const templateSubject = store.one(subject, "template") || "";
  const template = templateSubject
    ? parseCompositeUniquenessProfileScopeTemplate(store, templateSubject, activeFieldSubjects)
    : null;
  const partitionFields = store.objects(subject, "partitionField").map(field => {
    requireIsa(store, field, "DataField", `${subject}.partitionField ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.partitionField must reference an active DataSpace field, got ${field}.`);
    }
    return field;
  });
  const windowField = store.one(subject, "windowField") || "";
  if (windowField) {
    requireIsa(store, windowField, "DataField", `${subject}.windowField ${windowField}`);
    if (!activeFieldSubjects.has(windowField)) {
      throw new Error(`${subject}.windowField must reference an active DataSpace field, got ${windowField}.`);
    }
  }
  return {
    subject,
    profile,
    template,
    nullEquivalencePolicy: requireOptionalAllowedValue(
      subject,
      "nullEquivalencePolicy",
      requireOne(store, subject, "nullEquivalencePolicy"),
      COMPOSITE_UNIQUENESS_NULL_EQUIVALENCE_VALUES,
    ),
    partitionFields,
    windowField,
    snapshotLabel: store.one(subject, "snapshotLabel") || "",
    lineageSubjects: store.objects(subject, "lineage"),
    lineages: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseCompositeUniquenessProfileScopeLineage(
  store,
  subject,
  expectedScope,
  scopeBySubject,
  compositeUniquenessProfileBySubject,
) {
  requireIsa(store, subject, "DataCompositeUniquenessProfileScopeLineage");
  const scope = requireOne(store, subject, "scope");
  if (scope !== expectedScope) {
    throw new Error(`${subject}.scope must reference ${expectedScope}, got ${scope}.`);
  }
  const priorScope = requireOne(store, subject, "priorScope");
  const priorScopeValue = scopeBySubject.get(priorScope);
  if (!priorScopeValue) {
    throw new Error(`${subject}.priorScope must reference an active DataCompositeUniquenessProfileScope, got ${priorScope}.`);
  }
  if (priorScope === expectedScope) {
    throw new Error(`${subject}.priorScope must differ from ${expectedScope}.`);
  }
  const currentScopeValue = scopeBySubject.get(expectedScope);
  const currentProfile = compositeUniquenessProfileBySubject.get(currentScopeValue?.profile || "");
  const priorProfile = compositeUniquenessProfileBySubject.get(priorScopeValue.profile || "");
  if (currentProfile?.rule && priorProfile?.rule && currentProfile.rule !== priorProfile.rule) {
    throw new Error(
      `${subject}.priorScope ${priorScope} must belong to a composite profile for ${currentProfile.rule}, got ${priorProfile.rule}.`,
    );
  }
  return {
    subject,
    scope,
    priorScope,
    lineageKind: requireOptionalAllowedValue(
      subject,
      "lineageKind",
      requireOne(store, subject, "lineageKind"),
      COMPOSITE_UNIQUENESS_SCOPE_LINEAGE_KIND_VALUES,
    ),
    duplicateCountDelta: parseOptionalInteger(subject, "duplicateCountDelta", store.one(subject, "duplicateCountDelta") || ""),
    sampleCountDelta: parseOptionalInteger(subject, "sampleCountDelta", store.one(subject, "sampleCountDelta") || ""),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
    priorScopeValue,
  };
}

export function parseAllowedValueEntry(store, subject, activeValidationRuleSubjects) {
  requireIsa(store, subject, "DataAllowedValueEntry");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  return {
    subject,
    rule,
    value: requireOne(store, subject, "value"),
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ALLOWED_VALUE_ENTRY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAllowedValueCandidatePromotion(
  store,
  subject,
  activeValidationRuleSubjects,
  allowedValueCandidateBySubject,
  allowedValueEntryBySubject,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotion");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const candidate = requireOne(store, subject, "candidate");
  const candidateConfig = allowedValueCandidateBySubject.get(candidate);
  if (!candidateConfig) {
    throw new Error(`${subject}.candidate must reference an active DataAllowedValueCandidate, got ${candidate}.`);
  }
  if (candidateConfig.rule !== rule) {
    throw new Error(`${subject}.candidate ${candidate} must reference a candidate for ${rule}, got ${candidateConfig.rule}.`);
  }
  const entry = requireOne(store, subject, "entry");
  const entryConfig = allowedValueEntryBySubject.get(entry);
  if (!entryConfig) {
    throw new Error(`${subject}.entry must reference an active DataAllowedValueEntry, got ${entry}.`);
  }
  if (entryConfig.rule !== rule) {
    throw new Error(`${subject}.entry ${entry} must reference a value entry for ${rule}, got ${entryConfig.rule}.`);
  }
  const workflows = store.objects(subject, "workflow")
    .map(workflowSubject => parseAllowedValueCandidatePromotionWorkflow(store, workflowSubject, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const workflowBySubject = new Map(workflows.map(workflow => [workflow.subject, workflow]));
  const workflowInventories = store.objects(subject, "workflowInventory")
    .map(inventorySubject => parseAllowedValueCandidatePromotionWorkflowInventory(
      store,
      inventorySubject,
      subject,
      workflowBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  for (const inventory of workflowInventories) {
    const workflow = workflowBySubject.get(inventory.workflow);
    if (workflow) workflow.inventoryRecord = inventory;
  }
  return {
    subject,
    rule,
    candidate,
    entry,
    promotionState: requireOptionalAllowedValue(
      subject,
      "promotionState",
      requireOne(store, subject, "promotionState"),
      ALLOWED_VALUE_ENTRY_STATE_VALUES,
    ),
    workflows,
    workflowInventories,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
    candidateValue: candidateConfig,
    entryValue: entryConfig,
  };
}

export function parseAllowedValueCandidatePromotionWorkflow(store, subject, expectedPromotion) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflow");
  const promotion = requireOne(store, subject, "promotion");
  requireIsa(store, promotion, "DataAllowedValueCandidatePromotion", `${subject}.promotion ${promotion}`);
  if (promotion !== expectedPromotion) {
    throw new Error(`${subject}.promotion must reference ${expectedPromotion}, got ${promotion}.`);
  }
  const steps = store.objects(subject, "step")
    .map(stepSubject => parseAllowedValueCandidatePromotionWorkflowStep(store, stepSubject, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const workflowStepBySubject = new Map(steps.map(step => [step.subject, step]));
  const stepInventories = store.objects(subject, "stepInventory")
    .map(inventorySubject => parseAllowedValueCandidatePromotionWorkflowStepInventory(
      store,
      inventorySubject,
      subject,
      workflowStepBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  for (const inventory of stepInventories) {
    const step = workflowStepBySubject.get(inventory.step);
    if (step) step.inventoryRecord = inventory;
  }
  return {
    subject,
    promotion,
    entryAction: requireOptionalAllowedValue(
      subject,
      "entryAction",
      requireOne(store, subject, "entryAction"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_ENTRY_ACTION_VALUES,
    ),
    approvalMode: requireOptionalAllowedValue(
      subject,
      "approvalMode",
      requireOne(store, subject, "approvalMode"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_APPROVAL_MODE_VALUES,
    ),
    steps,
    stepInventories,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAllowedValueCandidatePromotionWorkflowInventory(
  store,
  subject,
  expectedPromotion,
  workflowBySubject,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflowInventory");
  const promotion = requireOne(store, subject, "promotion");
  if (promotion !== expectedPromotion) {
    throw new Error(`${subject}.promotion must reference ${expectedPromotion}, got ${promotion}.`);
  }
  const workflow = requireOne(store, subject, "workflow");
  const workflowValue = workflowBySubject.get(workflow);
  if (!workflowValue) {
    throw new Error(`${subject}.workflow must reference a workflow declared by ${expectedPromotion}, got ${workflow}.`);
  }
  return {
    subject,
    promotion,
    workflow,
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_INVENTORY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
    workflowValue,
  };
}

export function parseAllowedValueCandidatePromotionWorkflowStep(store, subject, expectedWorkflow) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflowStep");
  const workflow = requireOne(store, subject, "workflow");
  requireIsa(store, workflow, "DataAllowedValueCandidatePromotionWorkflow", `${subject}.workflow ${workflow}`);
  if (workflow !== expectedWorkflow) {
    throw new Error(`${subject}.workflow must reference ${expectedWorkflow}, got ${workflow}.`);
  }
  return {
    subject,
    workflow,
    stepKind: requireOptionalAllowedValue(
      subject,
      "stepKind",
      requireOne(store, subject, "stepKind"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_STEP_KIND_VALUES,
    ),
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_STEP_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAllowedValueCandidatePromotionWorkflowStepInventory(
  store,
  subject,
  expectedWorkflow,
  workflowStepBySubject,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflowStepInventory");
  const workflow = requireOne(store, subject, "workflow");
  if (workflow !== expectedWorkflow) {
    throw new Error(`${subject}.workflow must reference ${expectedWorkflow}, got ${workflow}.`);
  }
  const step = requireOne(store, subject, "step");
  const stepValue = workflowStepBySubject.get(step);
  if (!stepValue) {
    throw new Error(`${subject}.step must reference a workflow step declared by ${expectedWorkflow}, got ${step}.`);
  }
  return {
    subject,
    workflow,
    step,
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      ALLOWED_VALUE_PROMOTION_WORKFLOW_INVENTORY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
    stepValue,
  };
}

export function parseAllowedValueCandidate(store, subject, activeValidationRuleSubjects) {
  requireIsa(store, subject, "DataAllowedValueCandidate");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  return {
    subject,
    rule,
    value: requireOne(store, subject, "value"),
    normalizedValue: store.one(subject, "normalizedValue") || "",
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseValidationResult(store, subject, activeEditTargetSubjects) {
  requireIsa(store, subject, "DataValidationResult");
  const editTarget = store.one(subject, "editTarget") || "";
  if (editTarget) {
    requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
    requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  }
  const checkedSubject = store.one(subject, "checkedSubject") || "";
  if (checkedSubject) requireKnownSubject(store, checkedSubject, `${subject}.checkedSubject`);
  return {
    subject,
    validation: requireOne(store, subject, "validation"),
    editTarget,
    checkedSubject,
    state: requireOne(store, subject, "state"),
    message: store.one(subject, "message") || "",
    sampleCount: Number(store.one(subject, "sampleCount") || "0"),
    sampleFailureSubjects: store.objects(subject, "sampleFailure"),
    sampleFailures: [],
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseValidationSampleFailure(
  store,
  subject,
  activeValidationResultSubjects,
  activeValidationRuleSubjects,
  activeFieldSubjects,
) {
  requireIsa(store, subject, "DataValidationSampleFailure");
  const validationResult = requireOne(store, subject, "validationResult");
  requireIsa(store, validationResult, "DataValidationResult", `${subject}.validationResult ${validationResult}`);
  if (!activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference an active DataSpace validationResult, got ${validationResult}.`);
  }
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  if (!activeFieldSubjects.has(field)) {
    throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
  }
  return {
    subject,
    validationResult,
    rule,
    field,
    rowKey: requireOne(store, subject, "rowKey"),
    observedValue: store.one(subject, "observedValue") || "",
    reason: requireOne(store, subject, "reason"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublication(store, subject, activeAssetSubjects, activeValidationResultSubjects) {
  requireIsa(store, subject, "DataPublication");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );
  const mode = parseModeMetadata(store, subject, "publication");
  return {
    subject,
    asset,
    title: requireOne(store, subject, "title"),
    publicationKind: requireOne(store, subject, "publicationKind"),
    state: requireOne(store, subject, "state"),
    validationResult,
    modeFamily: mode.modeFamily,
    modeKind: mode.modeKind,
    modeStatus: mode.modeStatus,
    modeNotes: mode.modeNotes,
    identities: store.objects(subject, "identity")
      .map(identity => parsePublicationIdentity(store, identity, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    navigationGroups: store.objects(subject, "navigationGroup")
      .map(group => parsePublicationNavigationGroup(store, group, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    gatePrecedences: store.objects(subject, "gatePrecedence")
      .map(precedence => parsePublicationGatePrecedence(
        store,
        precedence,
        subject,
        asset,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    placements: store.objects(subject, "placement")
      .map(placement => parsePublicationPlacement(store, placement, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    requirements: store.objects(subject, "requirement")
      .map(requirement => parsePublicationRequirement(store, requirement, subject, activeValidationResultSubjects))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
  };
}

export function parsePublicationIdentity(store, subject, expectedPublication) {
  requireIsa(store, subject, "DataPublicationIdentity");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (publication !== expectedPublication) {
    throw new Error(`${subject}.publication must reference ${expectedPublication}, got ${publication}.`);
  }
  return {
    subject,
    publication,
    projectKey: requireOne(store, subject, "projectKey"),
    navigationLabel: store.one(subject, "navigationLabel") || "",
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationNavigationGroup(store, subject, expectedPublication) {
  requireIsa(store, subject, "DataPublicationNavigationGroup");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (publication !== expectedPublication) {
    throw new Error(`${subject}.publication must reference ${expectedPublication}, got ${publication}.`);
  }
  const identities = store.objects(subject, "identity")
    .map(identity => {
      requireIsa(store, identity, "DataPublicationIdentity", `${subject}.identity ${identity}`);
      const identityPublication = requireOne(store, identity, "publication", `${identity}.publication`);
      if (identityPublication !== expectedPublication) {
        throw new Error(`${subject}.identity must reference an identity for ${expectedPublication}, got ${identityPublication}.`);
      }
      return identity;
    })
    .sort((a, b) => a.localeCompare(b));
  const placements = store.objects(subject, "placement")
    .map(placement => {
      requireIsa(store, placement, "DataPublicationPlacement", `${subject}.placement ${placement}`);
      const placementPublication = requireOne(store, placement, "publication", `${placement}.publication`);
      if (placementPublication !== expectedPublication) {
        throw new Error(`${subject}.placement must reference a placement for ${expectedPublication}, got ${placementPublication}.`);
      }
      return placement;
    })
    .sort((a, b) => a.localeCompare(b));
  return {
    subject,
    publication,
    groupKey: requireOne(store, subject, "groupKey"),
    label: store.one(subject, "label") || "",
    identities,
    placements,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGatePrecedence(store, subject, expectedPublication, asset, activeValidationResultSubjects) {
  requireIsa(store, subject, "DataPublicationGatePrecedence");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (publication !== expectedPublication) {
    throw new Error(`${subject}.publication must reference ${expectedPublication}, got ${publication}.`);
  }
  const primaryRequirement = requireOne(store, subject, "primaryRequirement");
  requireIsa(store, primaryRequirement, "DataPublicationRequirement", `${subject}.primaryRequirement ${primaryRequirement}`);
  const primaryPublication = requireOne(store, primaryRequirement, "publication", `${primaryRequirement}.publication`);
  if (primaryPublication !== expectedPublication) {
    throw new Error(`${subject}.primaryRequirement must reference a requirement for ${expectedPublication}, got ${primaryPublication}.`);
  }
  const fallbackRequirement = requireOne(store, subject, "fallbackRequirement");
  requireIsa(store, fallbackRequirement, "DataPublicationRequirement", `${subject}.fallbackRequirement ${fallbackRequirement}`);
  const fallbackPublication = requireOne(store, fallbackRequirement, "publication", `${fallbackRequirement}.publication`);
  if (fallbackPublication !== expectedPublication) {
    throw new Error(`${subject}.fallbackRequirement must reference a requirement for ${expectedPublication}, got ${fallbackPublication}.`);
  }
  if (primaryRequirement === fallbackRequirement) {
    throw new Error(`${subject}.fallbackRequirement must differ from primaryRequirement ${primaryRequirement}.`);
  }
  const fallbackRoutingPolicy = requireOne(store, subject, "fallbackRoutingPolicy");
  return {
    subject,
    publication,
    primaryRequirement,
    fallbackRequirement,
    conditions: store.objects(subject, "condition")
      .map(condition => parsePublicationGateCondition(store, condition, subject, asset))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    conditionGroupSubjects: store.objects(subject, "conditionGroup"),
    conditionGroups: [],
    expressionSetSubjects: store.objects(subject, "expressionSet"),
    expressionSets: [],
    precedenceRank: Number(requireOne(store, subject, "precedenceRank")),
    fallbackRoutingPolicy,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateConditionGroup(store, subject, expectedPrecedence, publicationGateConditionBySubject) {
  requireIsa(store, subject, "DataPublicationGateConditionGroup");
  const precedence = requireOne(store, subject, "precedence");
  requireIsa(store, precedence, "DataPublicationGatePrecedence", `${subject}.precedence ${precedence}`);
  if (precedence !== expectedPrecedence) {
    throw new Error(`${subject}.precedence must reference ${expectedPrecedence}, got ${precedence}.`);
  }
  const conditionSubjects = store.objects(subject, "condition");
  if (!conditionSubjects.length) {
    throw new Error(`${subject}.condition must reference at least one DataPublicationGateCondition.`);
  }
  const conditions = conditionSubjects.map(conditionSubject => {
    const conditionConfig = publicationGateConditionBySubject.get(conditionSubject);
    if (!conditionConfig) {
      throw new Error(`${subject}.condition must reference an active DataPublicationGateCondition, got ${conditionSubject}.`);
    }
    if (conditionConfig.precedence !== expectedPrecedence) {
      throw new Error(`${subject}.condition ${conditionSubject} must reference a condition for ${expectedPrecedence}, got ${conditionConfig.precedence}.`);
    }
    return conditionConfig;
  });
  return {
    subject,
    precedence,
    conditionSubjects,
    conditions,
    nextGroupSubjects: store.objects(subject, "nextGroup"),
    nextGroups: [],
    logicKind: requireOptionalAllowedValue(
      subject,
      "logicKind",
      requireOne(store, subject, "logicKind"),
      PUBLICATION_GATE_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateCondition(store, subject, expectedPrecedence, asset) {
  requireIsa(store, subject, "DataPublicationGateCondition");
  const precedence = requireOne(store, subject, "precedence");
  requireIsa(store, precedence, "DataPublicationGatePrecedence", `${subject}.precedence ${precedence}`);
  if (precedence !== expectedPrecedence) {
    throw new Error(`${subject}.precedence must reference ${expectedPrecedence}, got ${precedence}.`);
  }
  const field = store.one(subject, "field") || "";
  if (field) {
    requireIsa(store, field, "DataField", `${subject}.field ${field}`);
    const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
    if (fieldAsset !== asset) {
      throw new Error(`${subject}.field must reference a field on asset ${asset}, got ${fieldAsset}.`);
    }
  }
  return {
    subject,
    precedence,
    conditionKind: requireOne(store, subject, "conditionKind"),
    logicKind: requireOptionalAllowedValue(
      subject,
      "logicKind",
      store.one(subject, "logicKind") || "",
      PUBLICATION_GATE_LOGIC_KIND_VALUES,
    ),
    field,
    operator: requireOne(store, subject, "operator"),
    expectedValue: store.one(subject, "expectedValue") || "",
    expressionSubjects: store.objects(subject, "expression"),
    expressions: [],
    expressionSetSubjects: store.objects(subject, "expressionSet"),
    expressionSets: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateConditionExpression(store, subject, expectedGateCondition, asset) {
  requireIsa(store, subject, "DataPublicationGateConditionExpression");
  const gateCondition = requireOne(store, subject, "gateCondition");
  if (gateCondition !== expectedGateCondition) {
    throw new Error(`${subject}.gateCondition must reference ${expectedGateCondition}, got ${gateCondition}.`);
  }
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
  if (fieldAsset !== asset) {
    throw new Error(`${subject}.field must reference a field on asset ${asset}, got ${fieldAsset}.`);
  }
  return {
    subject,
    gateCondition,
    field,
    operator: requireOptionalAllowedValue(
      subject,
      "operator",
      requireOne(store, subject, "operator"),
      PUBLICATION_GATE_EXPRESSION_OPERATOR_VALUES,
    ),
    expectedValue: store.one(subject, "expectedValue") || "",
    valueKind: requireOptionalAllowedValue(
      subject,
      "valueKind",
      requireOne(store, subject, "valueKind"),
      PUBLICATION_GATE_EXPRESSION_VALUE_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionSet(store, subject, expectedPrecedence) {
  requireIsa(store, subject, "DataPublicationGateExpressionSet");
  const precedence = requireOne(store, subject, "precedence");
  requireIsa(store, precedence, "DataPublicationGatePrecedence", `${subject}.precedence ${precedence}`);
  if (precedence !== expectedPrecedence) {
    throw new Error(`${subject}.precedence must reference ${expectedPrecedence}, got ${precedence}.`);
  }
  return {
    subject,
    precedence,
    conditionGroupSubjects: store.objects(subject, "conditionGroup"),
    conditionGroups: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionConditionGroup(store, subject, expectedExpressionSet) {
  requireIsa(store, subject, "DataPublicationGateExpressionConditionGroup");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataPublicationGateExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const conditionSubjects = store.objects(subject, "condition");
  const nextGroupSubjects = store.objects(subject, "nextGroup");
  if (!conditionSubjects.length && !nextGroupSubjects.length) {
    throw new Error(`${subject} must declare at least one publication gate expression condition or next group.`);
  }
  return {
    subject,
    expressionSet,
    conditionSubjects,
    conditions: [],
    nextGroupSubjects,
    nextGroups: [],
    logicKind: requireOptionalAllowedValue(
      subject,
      "logicKind",
      requireOne(store, subject, "logicKind"),
      PUBLICATION_GATE_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionCondition(store, subject, expectedExpressionSet, asset) {
  requireIsa(store, subject, "DataPublicationGateExpressionCondition");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataPublicationGateExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
  if (fieldAsset !== asset) {
    throw new Error(`${subject}.field must reference a field on asset ${asset}, got ${fieldAsset}.`);
  }
  return {
    subject,
    expressionSet,
    field,
    operator: requireOptionalAllowedValue(
      subject,
      "operator",
      requireOne(store, subject, "operator"),
      PUBLICATION_GATE_EXPRESSION_OPERATOR_VALUES,
    ),
    expectedValue: store.one(subject, "expectedValue") || "",
    valueKind: requireOptionalAllowedValue(
      subject,
      "valueKind",
      requireOne(store, subject, "valueKind"),
      PUBLICATION_GATE_EXPRESSION_VALUE_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function createPublicationGateExpressionSetResolver(store, precedenceSubject, asset) {
  const parsedExpressionSetBySubject = new Map();
  const parsedGroupBySubject = new Map();
  const parsedConditionBySubject = new Map();
  const resolvingGroupSubjects = new Set();

  function resolveCondition(conditionSubject, expectedExpressionSet) {
    const cached = parsedConditionBySubject.get(conditionSubject);
    if (cached) {
      if (cached.expressionSet !== expectedExpressionSet) throw new Error(`${conditionSubject}.expressionSet must reference ${expectedExpressionSet}, got ${cached.expressionSet}.`);
      return cached;
    }
    const parsed = parsePublicationGateExpressionCondition(store, conditionSubject, expectedExpressionSet, asset);
    parsedConditionBySubject.set(conditionSubject, parsed);
    return parsed;
  }

  function resolveGroup(groupSubject, expectedExpressionSet) {
    const cached = parsedGroupBySubject.get(groupSubject);
    if (cached) {
      if (cached.expressionSet !== expectedExpressionSet) throw new Error(`${groupSubject}.expressionSet must reference ${expectedExpressionSet}, got ${cached.expressionSet}.`);
      return cached;
    }
    if (resolvingGroupSubjects.has(groupSubject)) {
      throw new Error(`${groupSubject} participates in a publication gate expression-set group cycle.`);
    }
    const parsed = parsePublicationGateExpressionConditionGroup(store, groupSubject, expectedExpressionSet);
    resolvingGroupSubjects.add(groupSubject);
    try {
      parsed.conditions = parsed.conditionSubjects
        .map(conditionSubject => resolveCondition(conditionSubject, expectedExpressionSet))
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      parsed.nextGroups = parsed.nextGroupSubjects
        .map(nextGroupSubject => {
          if (nextGroupSubject === groupSubject) {
            throw new Error(`${groupSubject}.nextGroup cannot reference itself.`);
          }
          return resolveGroup(nextGroupSubject, expectedExpressionSet);
        })
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    } finally {
      resolvingGroupSubjects.delete(groupSubject);
    }
    parsedGroupBySubject.set(groupSubject, parsed);
    return parsed;
  }

  function resolve(expressionSetSubject) {
    const cached = parsedExpressionSetBySubject.get(expressionSetSubject);
    if (cached) return cached;
    const parsed = parsePublicationGateExpressionSet(store, expressionSetSubject, precedenceSubject);
    const scopedGroupSubjects = [...new Set(
      store.toArray()
        .filter(fact => fact.p === "expressionSet" && fact.o === expressionSetSubject)
        .map(fact => fact.s)
        .filter(candidate => store.one(candidate, "isa") === "DataPublicationGateExpressionConditionGroup"),
    )];
    parsed.conditionGroups = parsed.conditionGroupSubjects
      .map(groupSubject => resolveGroup(groupSubject, expressionSetSubject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    if (!parsed.conditionGroups.length) {
      throw new Error(`${expressionSetSubject} must reference at least one publication gate expression condition group.`);
    }
    if (scopedGroupSubjects.length && !parsed.conditionGroupSubjects.length) {
      throw new Error(`${expressionSetSubject} must reference at least one publication gate expression condition group root when expression-set groups are authored.`);
    }
    parsedExpressionSetBySubject.set(expressionSetSubject, parsed);
    return parsed;
  }

  return { resolve };
}

function flattenPublicationGateExpressionConditionGroups(groups, collected = []) {
  for (const group of groups || []) {
    if (!group || collected.includes(group)) continue;
    collected.push(group);
    flattenPublicationGateExpressionConditionGroups(group.nextGroups || [], collected);
  }
  return collected;
}

export function parsePublicationPlacement(store, subject, expectedPublication) {
  requireIsa(store, subject, "DataPublicationPlacement");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (publication !== expectedPublication) {
    throw new Error(`${subject}.publication must reference ${expectedPublication}, got ${publication}.`);
  }
  return {
    subject,
    publication,
    placementKind: requireOne(store, subject, "placementKind"),
    surface: requireOne(store, subject, "surface"),
    slot: requireOne(store, subject, "slot"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationRequirement(store, subject, expectedPublication, activeValidationResultSubjects) {
  requireIsa(store, subject, "DataPublicationRequirement");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (publication !== expectedPublication) {
    throw new Error(`${subject}.publication must reference ${expectedPublication}, got ${publication}.`);
  }
  const validationResult = requireOne(store, subject, "validationResult");
  requireIsa(store, validationResult, "DataValidationResult", `${subject}.validationResult ${validationResult}`);
  if (!activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference an active DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    publication,
    validationResult,
    routingPolicy: requireOne(store, subject, "routingPolicy"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireHandoffField(subject, predicate, fieldSubject, asset, fieldBySubject) {
  const field = fieldBySubject.get(fieldSubject);
  if (!field) {
    throw new Error(`${subject}.${predicate} must reference an active DataSpace field, got ${fieldSubject}.`);
  }
  if (field.asset !== asset) {
    throw new Error(`${subject}.${predicate} must reference a field on asset ${asset}, got ${field.asset}.`);
  }
  return field;
}

function requireHandoffFieldRole(subject, predicate, field, allowedRoles) {
  if (!allowedRoles.includes(field.role)) {
    throw new Error(`${subject}.${predicate} must reference a field with role ${allowedRoles.join(" or ")}, got ${field.role}.`);
  }
}

function requireHandoffMeasure(subject, field) {
  requireHandoffFieldRole(subject, "measureField", field, ["measure"]);
  const effectiveType = field.authoredType || field.inferredType;
  if (!NUMERIC_FIELD_TYPES.has(effectiveType)) {
    throw new Error(`${subject}.measureField must reference a numeric field, got ${effectiveType}.`);
  }
}

export function parseExperimentHandoff(
  store,
  subject,
  dataSpaceSubject,
  activeAssetSubjects,
  fieldBySubject,
  publicationBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataExperimentHandoff");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }

  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }

  const publicationSubject = requireOne(store, subject, "publication");
  const publication = publicationBySubject.get(publicationSubject);
  if (!publication) {
    throw new Error(`${subject}.publication must reference an active DataSpace publication, got ${publicationSubject}.`);
  }
  if (publication.asset !== asset) {
    throw new Error(`${subject}.publication must publish asset ${asset}, got ${publication.asset}.`);
  }
  if (publication.publicationKind !== "experimentViewerHandoff") {
    throw new Error(`${subject}.publication must have publicationKind experimentViewerHandoff, got ${publication.publicationKind}.`);
  }

  const timestampFieldSubject = requireOne(store, subject, "timestampField");
  const timestampField = requireHandoffField(subject, "timestampField", timestampFieldSubject, asset, fieldBySubject);
  requireHandoffFieldRole(subject, "timestampField", timestampField, ["timestamp"]);

  const entityFieldSubject = requireOne(store, subject, "entityField");
  const entityField = requireHandoffField(subject, "entityField", entityFieldSubject, asset, fieldBySubject);
  requireHandoffFieldRole(subject, "entityField", entityField, ["key", "dimension", "label"]);

  const measureFields = store.objects(subject, "measureField");
  if (!measureFields.length) {
    throw new Error(`${subject}.measureField must declare at least one field.`);
  }
  for (const measureFieldSubject of measureFields) {
    const measureField = requireHandoffField(subject, "measureField", measureFieldSubject, asset, fieldBySubject);
    requireHandoffMeasure(subject, measureField);
  }

  const eventFields = store.objects(subject, "eventField");
  for (const eventFieldSubject of eventFields) {
    requireHandoffField(subject, "eventField", eventFieldSubject, asset, fieldBySubject);
  }

  const validationResult = requireOne(store, subject, "validationResult");
  if (!activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const validationState = requireOne(store, validationResult, "state", `${validationResult}.state`);
  if (validationState !== "valid") {
    throw new Error(`${subject}.validationResult must be valid, got ${validationState}.`);
  }

  return {
    subject,
    dataSpace,
    asset,
    publication: publicationSubject,
    timestampField: timestampFieldSubject,
    entityField: entityFieldSubject,
    measureFields,
    eventFields,
    validationResult,
    state: requireOne(store, subject, "state"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeFamilyPolicy(
  store,
  subject,
  dataSpaceSubject,
  expressionSetResolver = null,
) {
  requireIsa(store, subject, "DataTrustedBridgeFamilyPolicy");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const bridgeKind = requireOptionalAllowedValue(
    subject,
    "bridgeKind",
    requireOne(store, subject, "bridgeKind"),
    TRUSTED_BRIDGE_KIND_VALUES,
  );
  const targetKind = requireOptionalAllowedValue(
    subject,
    "targetKind",
    requireOne(store, subject, "targetKind"),
    TRUSTED_BRIDGE_TARGET_KIND_VALUES,
  );
  if (bridgeKind === "experimentHandoff" && targetKind !== "experimentHandoff") {
    throw new Error(`${subject}.targetKind must be experimentHandoff for bridgeKind experimentHandoff, got ${targetKind}.`);
  }
  if (bridgeKind === "publicationCard" && targetKind !== "publication") {
    throw new Error(`${subject}.targetKind must be publication for bridgeKind publicationCard, got ${targetKind}.`);
  }
  const explicitRules = store.objects(subject, "rule")
    .map(ruleSubject => parseTrustedBridgePolicyRule(store, ruleSubject, subject, expressionSetResolver))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const publicationKind = store.one(subject, "publicationKind") || "";
  const requiredState = store.one(subject, "requiredState") || "";
  const requiredValidationState = requireOptionalAllowedValue(
    subject,
    "requiredValidationState",
    store.one(subject, "requiredValidationState") || "",
    TRUSTED_BRIDGE_VALIDATION_STATE_VALUES,
  );
  if (!explicitRules.length && !publicationKind && !requiredState && !requiredValidationState) {
    throw new Error(
      `${subject} must declare at least one trusted bridge rule or one legacy publication/state eligibility constraint.`,
    );
  }
  return {
    subject,
    dataSpace,
    bridgeKind,
    targetKind,
    rules: explicitRules,
    publicationKind,
    requiredState,
    requiredValidationState,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyRule(store, subject, expectedPolicy, expressionSetResolver = null) {
  requireIsa(store, subject, "DataTrustedBridgePolicyRule");
  const policy = requireOne(store, subject, "policy");
  requireIsa(store, policy, "DataTrustedBridgeFamilyPolicy", `${subject}.policy ${policy}`);
  if (policy !== expectedPolicy) {
    throw new Error(`${subject}.policy must reference ${expectedPolicy}, got ${policy}.`);
  }
  const directConditionSubjects = store.objects(subject, "condition");
  const rootConditionGroupSubjects = store.objects(subject, "conditionGroup");
  const expressionSetSubjects = store.objects(subject, "expressionSet");
  const ruleScopedGroupSubjects = [...new Set(
    store.toArray()
      .filter(fact => fact.p === "rule" && fact.o === subject)
      .map(fact => fact.s)
      .filter(candidate => store.one(candidate, "isa") === "DataTrustedBridgePolicyConditionGroup"),
  )];
  const parsedConditionBySubject = new Map();
  const parsedGroupBySubject = new Map();
  const resolvingGroupSubjects = new Set();

  function resolveCondition(conditionSubject) {
    const cached = parsedConditionBySubject.get(conditionSubject);
    if (cached) return cached;
    const parsed = parseTrustedBridgePolicyCondition(store, conditionSubject, subject);
    parsedConditionBySubject.set(conditionSubject, parsed);
    return parsed;
  }

  function resolveConditionGroup(groupSubject) {
    const cached = parsedGroupBySubject.get(groupSubject);
    if (cached) return cached;
    if (resolvingGroupSubjects.has(groupSubject)) {
      throw new Error(`${groupSubject} participates in a trusted bridge condition-group cycle.`);
    }
    const parsed = parseTrustedBridgePolicyConditionGroup(store, groupSubject, subject);
    resolvingGroupSubjects.add(groupSubject);
    try {
      parsed.conditions = parsed.conditionSubjects
        .map(resolveCondition)
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      parsed.nextGroups = parsed.nextGroupSubjects
        .map(nextGroupSubject => {
          if (nextGroupSubject === groupSubject) {
            throw new Error(`${groupSubject}.nextGroup cannot reference itself.`);
          }
          return resolveConditionGroup(nextGroupSubject);
        })
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    } finally {
      resolvingGroupSubjects.delete(groupSubject);
    }
    parsedGroupBySubject.set(groupSubject, parsed);
    return parsed;
  }

  const conditions = directConditionSubjects
    .map(resolveCondition)
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionGroups = rootConditionGroupSubjects
    .map(resolveConditionGroup)
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const expressionSets = expressionSetSubjects
    .map(expressionSetSubject => {
      if (!expressionSetResolver) {
        throw new Error(`${subject}.expressionSet requires a trusted bridge expression-set resolver.`);
      }
      return expressionSetResolver.resolve(expressionSetSubject);
    })
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!conditions.length && !conditionGroups.length && !expressionSets.length) {
    throw new Error(`${subject} must declare at least one trusted bridge condition, one condition group, or one expression set.`);
  }
  if (ruleScopedGroupSubjects.length && !conditionGroups.length) {
    throw new Error(`${subject} must reference at least one trusted bridge condition group root when rule-scoped groups are authored.`);
  }
  return {
    subject,
    policy,
    conditions,
    conditionGroups,
    expressionSets,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionSet(store, subject, expectedDataSpace) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionSet");
  const dataSpace = requireOne(store, subject, "dataSpace");
  requireIsa(store, dataSpace, "DataSpace", `${subject}.dataSpace ${dataSpace}`);
  if (dataSpace !== expectedDataSpace) {
    throw new Error(`${subject}.dataSpace must reference ${expectedDataSpace}, got ${dataSpace}.`);
  }
  return {
    subject,
    dataSpace,
    conditionGroupSubjects: store.objects(subject, "conditionGroup"),
    conditionGroups: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionGroup(store, subject, expectedExpressionSet) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionGroup");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataTrustedBridgeExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const conditionSubjects = store.objects(subject, "condition");
  const nextGroupSubjects = store.objects(subject, "nextGroup");
  if (!conditionSubjects.length && !nextGroupSubjects.length) {
    throw new Error(`${subject} must declare at least one trusted bridge expression condition or next group.`);
  }
  return {
    subject,
    expressionSet,
    conditionSubjects,
    conditions: [],
    nextGroupSubjects,
    nextGroups: [],
    logicKind: requireOptionalAllowedValue(
      subject,
      "logicKind",
      requireOne(store, subject, "logicKind"),
      TRUSTED_BRIDGE_POLICY_GROUP_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionCondition(store, subject, expectedExpressionSet) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionCondition");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataTrustedBridgeExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const operator = requireOptionalAllowedValue(
    subject,
    "operator",
    requireOne(store, subject, "operator"),
    TRUSTED_BRIDGE_POLICY_CONDITION_OPERATOR_VALUES,
  );
  const parameters = store.objects(subject, "parameter")
    .map(parameter => parseTrustedBridgeExpressionConditionParameter(store, parameter, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const operands = parseTrustedBridgeConditionOperands(store, subject, operator, parameters);
  return {
    subject,
    expressionSet,
    signalKind: requireOptionalAllowedValue(
      subject,
      "signalKind",
      requireOne(store, subject, "signalKind"),
      TRUSTED_BRIDGE_POLICY_CONDITION_SIGNAL_VALUES,
    ),
    operator,
    expectedValue: operands.expectedValue,
    parameters: operands.parameters,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function createTrustedBridgeExpressionSetResolver(store, dataSpaceSubject) {
  const parsedExpressionSetBySubject = new Map();
  const parsedGroupBySubject = new Map();
  const parsedConditionBySubject = new Map();
  const resolvingGroupSubjects = new Set();

  function resolveCondition(conditionSubject, expectedExpressionSet) {
    const cached = parsedConditionBySubject.get(conditionSubject);
    if (cached) {
      if (cached.expressionSet !== expectedExpressionSet) throw new Error(`${conditionSubject}.expressionSet must reference ${expectedExpressionSet}, got ${cached.expressionSet}.`);
      return cached;
    }
    const parsed = parseTrustedBridgeExpressionCondition(store, conditionSubject, expectedExpressionSet);
    parsedConditionBySubject.set(conditionSubject, parsed);
    return parsed;
  }

  function resolveGroup(groupSubject, expectedExpressionSet) {
    const cached = parsedGroupBySubject.get(groupSubject);
    if (cached) {
      if (cached.expressionSet !== expectedExpressionSet) throw new Error(`${groupSubject}.expressionSet must reference ${expectedExpressionSet}, got ${cached.expressionSet}.`);
      return cached;
    }
    if (resolvingGroupSubjects.has(groupSubject)) {
      throw new Error(`${groupSubject} participates in a trusted bridge expression-set group cycle.`);
    }
    const parsed = parseTrustedBridgeExpressionConditionGroup(store, groupSubject, expectedExpressionSet);
    resolvingGroupSubjects.add(groupSubject);
    try {
      parsed.conditions = parsed.conditionSubjects
        .map(conditionSubject => resolveCondition(conditionSubject, expectedExpressionSet))
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      parsed.nextGroups = parsed.nextGroupSubjects
        .map(nextGroupSubject => {
          if (nextGroupSubject === groupSubject) {
            throw new Error(`${groupSubject}.nextGroup cannot reference itself.`);
          }
          return resolveGroup(nextGroupSubject, expectedExpressionSet);
        })
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    } finally {
      resolvingGroupSubjects.delete(groupSubject);
    }
    parsedGroupBySubject.set(groupSubject, parsed);
    return parsed;
  }

  function resolve(expressionSetSubject) {
    const cached = parsedExpressionSetBySubject.get(expressionSetSubject);
    if (cached) return cached;
    const parsed = parseTrustedBridgeExpressionSet(store, expressionSetSubject, dataSpaceSubject);
    const scopedGroupSubjects = [...new Set(
      store.toArray()
        .filter(fact => fact.p === "expressionSet" && fact.o === expressionSetSubject)
        .map(fact => fact.s)
        .filter(candidate => store.one(candidate, "isa") === "DataTrustedBridgeExpressionConditionGroup"),
    )];
    parsed.conditionGroups = parsed.conditionGroupSubjects
      .map(groupSubject => resolveGroup(groupSubject, expressionSetSubject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    if (!parsed.conditionGroups.length) {
      throw new Error(`${expressionSetSubject} must reference at least one trusted bridge expression condition group.`);
    }
    if (scopedGroupSubjects.length && !parsed.conditionGroupSubjects.length) {
      throw new Error(`${expressionSetSubject} must reference at least one trusted bridge expression condition group root when expression-set groups are authored.`);
    }
    parsedExpressionSetBySubject.set(expressionSetSubject, parsed);
    return parsed;
  }

  return { resolve };
}

export function flattenTrustedBridgePolicyConditionGroups(groups, collected = []) {
  for (const group of Array.isArray(groups) ? groups : []) {
    if (!group || collected.includes(group)) continue;
    collected.push(group);
    flattenTrustedBridgePolicyConditionGroups(group.nextGroups || [], collected);
  }
  return collected;
}

export function flattenTrustedBridgeExpressionConditionGroups(groups, collected = []) {
  for (const group of Array.isArray(groups) ? groups : []) {
    if (!group || collected.includes(group)) continue;
    collected.push(group);
    flattenTrustedBridgeExpressionConditionGroups(group.nextGroups || [], collected);
  }
  return collected;
}

export function parseTrustedBridgePolicyConditionGroup(store, subject, expectedRule) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionGroup");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataTrustedBridgePolicyRule", `${subject}.rule ${rule}`);
  if (rule !== expectedRule) {
    throw new Error(`${subject}.rule must reference ${expectedRule}, got ${rule}.`);
  }
  const conditionSubjects = store.objects(subject, "condition");
  const nextGroupSubjects = store.objects(subject, "nextGroup");
  if (!conditionSubjects.length && !nextGroupSubjects.length) {
    throw new Error(`${subject} must declare at least one trusted bridge condition or next group.`);
  }
  return {
    subject,
    rule,
    conditionSubjects,
    conditions: [],
    nextGroupSubjects,
    nextGroups: [],
    logicKind: requireOptionalAllowedValue(
      subject,
      "logicKind",
      requireOne(store, subject, "logicKind"),
      TRUSTED_BRIDGE_POLICY_GROUP_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyCondition(store, subject, expectedRule) {
  requireIsa(store, subject, "DataTrustedBridgePolicyCondition");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataTrustedBridgePolicyRule", `${subject}.rule ${rule}`);
  if (rule !== expectedRule) {
    throw new Error(`${subject}.rule must reference ${expectedRule}, got ${rule}.`);
  }
  const operator = requireOptionalAllowedValue(
    subject,
    "operator",
    requireOne(store, subject, "operator"),
    TRUSTED_BRIDGE_POLICY_CONDITION_OPERATOR_VALUES,
  );
  const parameters = store.objects(subject, "parameter")
    .map(parameter => parseTrustedBridgePolicyConditionParameter(store, parameter, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const operands = parseTrustedBridgeConditionOperands(store, subject, operator, parameters);
  return {
    subject,
    rule,
    signalKind: requireOptionalAllowedValue(
      subject,
      "signalKind",
      requireOne(store, subject, "signalKind"),
      TRUSTED_BRIDGE_POLICY_CONDITION_SIGNAL_VALUES,
    ),
    operator,
    expectedValue: operands.expectedValue,
    parameters: operands.parameters,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransform(store, subject, activeAssetSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataTransform");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const steps = store.objects(subject, "step")
    .map(step => parseTransformStep(store, step, subject, asset, activeAssetSubjects, fieldBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const primaryStep = steps[0] || null;
  const primaryExpressionConfig = primaryStep?.configs.find(config => config.configKind === "expression") || null;
  const transformKind = requireOne(store, subject, "transformKind");
  if (transformKind === "join") {
    if (!primaryExpressionConfig) {
      throw new Error(`${subject}.transformKind join requires a primary expression config.`);
    }
    const assetInputs = primaryExpressionConfig.inputs.filter(input => input.bindingKind === "asset");
    if (assetInputs.length < 2) {
      throw new Error(
        `${subject}.transformKind join requires at least two asset-bound inputs on ${primaryExpressionConfig.subject}.`,
      );
    }
    if (primaryExpressionConfig.inputSourceGraphs?.length) {
      const graphNodeInputs = new Set(
        primaryExpressionConfig.inputSourceGraphs.flatMap(graph => graph.nodes.map(node => node.input)),
      );
      for (const input of assetInputs) {
        if (!graphNodeInputs.has(input.subject)) {
          throw new Error(
            `${primaryExpressionConfig.subject}.inputSourceGraph must declare a graph node for ${input.subject} when ${subject}.transformKind is join.`,
          );
        }
      }
    } else {
      for (const input of assetInputs) {
        if (!input.inputSources.some(source => source.sourceKind === "field")) {
          throw new Error(
            `${input.subject}.inputSource must declare at least one field source when ${subject}.transformKind is join.`,
          );
        }
      }
    }
  }
  const mode = parseModeMetadata(store, subject, "transform");
  return {
    subject,
    asset,
    label: requireOne(store, subject, "label"),
    transformKind,
    steps,
    primaryStep: primaryStep?.subject || "",
    expressionConfig: primaryExpressionConfig?.subject || "",
    expressionSurface: primaryExpressionConfig?.surfaceKind || "",
    expression: primaryExpressionConfig?.expression || store.one(subject, "expression") || "",
    state: requireOne(store, subject, "state"),
    modeFamily: mode.modeFamily,
    modeKind: mode.modeKind,
    modeStatus: mode.modeStatus,
    modeNotes: mode.modeNotes,
  };
}

export function parseTransformConfigParameter(store, subject, expectedConfig) {
  requireIsa(store, subject, "DataTransformConfigParameter");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataTransformConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  return {
    subject,
    config,
    parameterName: requireOne(store, subject, "parameterName"),
    valueType: requireOne(store, subject, "valueType"),
    value: store.one(subject, "value") || "",
    options: store.objects(subject, "option")
      .map(option => parseTransformConfigParameterOption(store, option, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigParameterOption(store, subject, expectedParameter) {
  requireIsa(store, subject, "DataTransformConfigParameterOption");
  const parameter = requireOne(store, subject, "parameter");
  requireIsa(store, parameter, "DataTransformConfigParameter", `${subject}.parameter ${parameter}`);
  if (parameter !== expectedParameter) {
    throw new Error(`${subject}.parameter must reference ${expectedParameter}, got ${parameter}.`);
  }
  const creator = store.one(subject, "creator") || "";
  if (creator) {
    requireIsa(store, creator, "DataTransformConfigParameterOptionCreator", `${subject}.creator ${creator}`);
    const creatorParameter = requireOne(store, creator, "parameter", `${creator}.parameter`);
    if (creatorParameter !== expectedParameter) {
      throw new Error(`${subject}.creator must reference a creator for ${expectedParameter}, got ${creatorParameter}.`);
    }
  }
  const editorTemplate = store.one(subject, "editorTemplate") || "";
  if (editorTemplate) {
    requireIsa(
      store,
      editorTemplate,
      "DataTransformConfigParameterOptionEditorTemplate",
      `${subject}.editorTemplate ${editorTemplate}`,
    );
    if (!creator) {
      throw new Error(`${subject}.editorTemplate requires ${subject}.creator to be declared.`);
    }
    const templateCreator = requireOne(store, editorTemplate, "creator", `${editorTemplate}.creator`);
    if (templateCreator !== creator) {
      throw new Error(`${subject}.editorTemplate must reference a template owned by ${creator}, got ${templateCreator}.`);
    }
  }
  return {
    subject,
    parameter,
    creator,
    editorTemplate,
    value: requireOne(store, subject, "value"),
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      TRANSFORM_PARAMETER_OPTION_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigParameterOptionCreator(
  store,
  subject,
  expectedParameter,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionCreator");
  const parameter = requireOne(store, subject, "parameter");
  requireIsa(store, parameter, "DataTransformConfigParameter", `${subject}.parameter ${parameter}`);
  if (parameter !== expectedParameter) {
    throw new Error(`${subject}.parameter must reference ${expectedParameter}, got ${parameter}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const editorTemplateSubjects = store.objects(subject, "editorTemplate");
  const editorTemplates = editorTemplateSubjects
    .map(editorTemplate => parseTransformConfigParameterOptionEditorTemplate(
      store,
      editorTemplate,
      subject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const defaultEditorTemplateSubject = store.one(subject, "defaultEditorTemplate") || "";
  if (defaultEditorTemplateSubject && !editorTemplates.some(template => template.subject === defaultEditorTemplateSubject)) {
    throw new Error(
      `${subject}.defaultEditorTemplate must reference one of its declared editorTemplate records, got ${defaultEditorTemplateSubject}.`,
    );
  }
  if (editorTemplates.length > 1 && !defaultEditorTemplateSubject) {
    throw new Error(`${subject}.defaultEditorTemplate is required when more than one editorTemplate is declared.`);
  }
  const defaultEditorTemplate = defaultEditorTemplateSubject
    ? editorTemplates.find(template => template.subject === defaultEditorTemplateSubject) || null
    : editorTemplates[0] || null;
  return {
    subject,
    parameter,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    defaultState: requireOptionalAllowedValue(
      subject,
      "defaultState",
      requireOne(store, subject, "defaultState"),
      TRANSFORM_PARAMETER_OPTION_STATE_VALUES,
    ),
    editorTemplates,
    defaultEditorTemplate,
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigParameterOptionEditorTemplate(
  store,
  subject,
  expectedCreator,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplate");
  const creator = requireOne(store, subject, "creator");
  requireIsa(store, creator, "DataTransformConfigParameterOptionCreator", `${subject}.creator ${creator}`);
  if (creator !== expectedCreator) {
    throw new Error(`${subject}.creator must reference ${expectedCreator}, got ${creator}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const controls = store.objects(subject, "control")
    .map(control => parseTransformConfigParameterOptionEditorTemplateControl(store, control, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!controls.length) {
    throw new Error(`${subject}.control must reference at least one explicit option editor template control.`);
  }
  return {
    subject,
    creator,
    controls,
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigParameterOptionEditorTemplateControl(store, subject, expectedTemplate) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplateControl");
  const template = requireOne(store, subject, "template");
  requireIsa(store, template, "DataTransformConfigParameterOptionEditorTemplate", `${subject}.template ${template}`);
  if (template !== expectedTemplate) {
    throw new Error(`${subject}.template must reference ${expectedTemplate}, got ${template}.`);
  }
  const fieldKey = requireOptionalAllowedValue(
    subject,
    "fieldKey",
    requireOne(store, subject, "fieldKey"),
    TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_FIELD_KEY_VALUES,
  );
  const valueKind = requireOptionalAllowedValue(
    subject,
    "valueKind",
    requireOne(store, subject, "valueKind"),
    TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_VALUE_KIND_VALUES,
  );
  const widgetKind = requireOptionalAllowedValue(
    subject,
    "widgetKind",
    requireOne(store, subject, "widgetKind"),
    TRANSFORM_PARAMETER_OPTION_EDITOR_TEMPLATE_WIDGET_KIND_VALUES,
  );
  if (fieldKey === "order" && valueKind !== "integer") {
    throw new Error(`${subject}.valueKind must be integer when fieldKey is order, got ${valueKind}.`);
  }
  if (fieldKey !== "order" && valueKind !== "string") {
    throw new Error(`${subject}.valueKind must be string when fieldKey is ${fieldKey}, got ${valueKind}.`);
  }
  const selectConfigSubject = store.one(subject, "selectConfig") || "";
  const numericConfigSubject = store.one(subject, "numericConfig") || "";
  const toggleConfigSubject = store.one(subject, "toggleConfig") || "";
  const configuredKinds = [
    selectConfigSubject ? "select" : "",
    numericConfigSubject ? "numeric" : "",
    toggleConfigSubject ? "toggle" : "",
  ].filter(Boolean);
  if (configuredKinds.length > 1) {
    throw new Error(`${subject} must not declare more than one transform-parameter-option template widget config subject.`);
  }
  if (fieldKey === "state" && !["toggle", "select"].includes(widgetKind)) {
    throw new Error(`${subject}.widgetKind must be toggle or select when fieldKey is state, got ${widgetKind}.`);
  }
  if ((fieldKey === "value" || fieldKey === "label") && !["textInput", "select"].includes(widgetKind)) {
    throw new Error(`${subject}.widgetKind must be textInput or select when fieldKey is ${fieldKey}, got ${widgetKind}.`);
  }
  if (fieldKey === "order" && !["textInput", "numberInput", "stepper", "select"].includes(widgetKind)) {
    throw new Error(`${subject}.widgetKind must be textInput, numberInput, stepper, or select when fieldKey is order, got ${widgetKind}.`);
  }
  const widgetConfig = selectConfigSubject
    ? parseTransformParameterOptionTemplateSelectConfig(store, selectConfigSubject, subject, widgetKind)
    : numericConfigSubject
      ? parseTransformParameterOptionTemplateNumericConfig(store, numericConfigSubject, subject, widgetKind)
      : toggleConfigSubject
        ? parseTransformParameterOptionTemplateToggleConfig(store, toggleConfigSubject, subject, widgetKind)
        : null;
  return {
    subject,
    template,
    fieldKey,
    label: store.one(subject, "label") || "",
    valueKind,
    widgetKind,
    widgetConfig,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformParameterOptionTemplateSelectOption(store, subject, expectedConfig) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplateSelectOption");
  const config = requireOne(store, subject, "config");
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  return {
    subject,
    config,
    value: requireOne(store, subject, "value"),
    label: store.one(subject, "label") || "",
    state: requireOptionalAllowedValue(
      subject,
      "state",
      store.one(subject, "state") || "",
      SOURCE_CAPABILITY_EDITOR_STATE_VALUES,
    ),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformParameterOptionTemplateSelectConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplateSelectConfig");
  if (effectiveWidgetKind !== "select") {
    throw new Error(`${subject} requires ${expectedControl}.widgetKind to be select, got ${effectiveWidgetKind}.`);
  }
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  const options = store.objects(subject, "option")
    .map(option => parseTransformParameterOptionTemplateSelectOption(store, option, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!options.length) {
    throw new Error(`${subject}.option must reference at least one DataTransformConfigParameterOptionEditorTemplateSelectOption.`);
  }
  return {
    subject,
    control,
    kind: "select",
    selectionMode: requireOptionalAllowedValue(
      subject,
      "selectionMode",
      store.one(subject, "selectionMode") || "",
      MODE_EDITOR_SELECTION_MODE_VALUES,
    ) || "single",
    options,
  };
}

export function parseTransformParameterOptionTemplateNumericConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplateNumericConfig");
  if (!["numberInput", "stepper"].includes(effectiveWidgetKind)) {
    throw new Error(`${subject} requires ${expectedControl}.widgetKind to be numberInput or stepper, got ${effectiveWidgetKind}.`);
  }
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  const minValue = parseOptionalFiniteNumber(subject, "minValue", store.one(subject, "minValue") || "");
  const maxValue = parseOptionalFiniteNumber(subject, "maxValue", store.one(subject, "maxValue") || "");
  const stepValue = parseOptionalFiniteNumber(subject, "stepValue", store.one(subject, "stepValue") || "");
  if (minValue == null && maxValue == null && stepValue == null) {
    throw new Error(`${subject} must declare at least one of minValue, maxValue, or stepValue.`);
  }
  if (stepValue != null && stepValue <= 0) {
    throw new Error(`${subject}.stepValue must be greater than zero, got ${stepValue}.`);
  }
  if (minValue != null && maxValue != null && maxValue < minValue) {
    throw new Error(`${subject}.maxValue must be greater than or equal to minValue.`);
  }
  return {
    subject,
    control,
    kind: "numeric",
    minValue,
    maxValue,
    stepValue,
  };
}

export function parseTransformParameterOptionTemplateToggleConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditorTemplateToggleConfig");
  if (effectiveWidgetKind !== "toggle") {
    throw new Error(`${subject} requires ${expectedControl}.widgetKind to be toggle, got ${effectiveWidgetKind}.`);
  }
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  return {
    subject,
    control,
    kind: "toggle",
    trueLabel: store.one(subject, "trueLabel") || "",
    falseLabel: store.one(subject, "falseLabel") || "",
  };
}

export function parseTransformConfigInputSource(store, subject, expectedInput, activeAssetSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataTransformConfigInputSource");
  const input = requireOne(store, subject, "input");
  requireIsa(store, input, "DataTransformConfigInput", `${subject}.input ${input}`);
  if (input !== expectedInput) {
    throw new Error(`${subject}.input must reference ${expectedInput}, got ${input}.`);
  }
  const sourceKind = requireOptionalAllowedValue(
    subject,
    "sourceKind",
    requireOne(store, subject, "sourceKind"),
    TRANSFORM_INPUT_SOURCE_KIND_VALUES,
  );
  const asset = store.one(subject, "asset") || "";
  const field = store.one(subject, "field") || "";
  if (sourceKind === "asset") {
    if (!asset) throw new Error(`${subject}.asset must be present when sourceKind is asset.`);
    requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
    if (!activeAssetSubjects.has(asset)) {
      throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
    }
  }
  if (sourceKind === "field") {
    if (!field) throw new Error(`${subject}.field must be present when sourceKind is field.`);
    const fieldConfig = fieldBySubject.get(field);
    if (!fieldConfig) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
  }
  return {
    subject,
    input,
    sourceKind,
    asset,
    field,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphNode(
  store,
  subject,
  expectedGraph,
  inputBySubject,
  inputSourceBySubject,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphNode");
  const graph = requireOne(store, subject, "graph");
  requireIsa(store, graph, "DataTransformConfigInputSourceGraph", `${subject}.graph ${graph}`);
  if (graph !== expectedGraph) {
    throw new Error(`${subject}.graph must reference ${expectedGraph}, got ${graph}.`);
  }
  const input = requireOne(store, subject, "input");
  const inputConfig = inputBySubject.get(input);
  if (!inputConfig) {
    throw new Error(`${subject}.input must reference an input declared by ${expectedGraph}, got ${input}.`);
  }
  if (inputConfig.bindingKind !== "asset") {
    throw new Error(`${subject}.input must reference an asset-bound transform input, got ${inputConfig.bindingKind}.`);
  }
  const assetSource = requireOne(store, subject, "assetSource");
  const assetSourceConfig = inputSourceBySubject.get(assetSource);
  if (!assetSourceConfig) {
    throw new Error(`${subject}.assetSource must reference an input source declared by ${input}, got ${assetSource}.`);
  }
  if (assetSourceConfig.input !== input) {
    throw new Error(`${subject}.assetSource must reference an input source for ${input}, got ${assetSourceConfig.input}.`);
  }
  if (assetSourceConfig.sourceKind !== "asset") {
    throw new Error(`${subject}.assetSource must reference an asset-kind input source, got ${assetSourceConfig.sourceKind}.`);
  }
  const fieldSources = store.objects(subject, "fieldSource")
    .map(fieldSource => {
      const fieldSourceConfig = inputSourceBySubject.get(fieldSource);
      if (!fieldSourceConfig) {
        throw new Error(`${subject}.fieldSource must reference an input source declared by ${input}, got ${fieldSource}.`);
      }
      if (fieldSourceConfig.input !== input) {
        throw new Error(`${subject}.fieldSource ${fieldSource} must reference an input source for ${input}, got ${fieldSourceConfig.input}.`);
      }
      if (fieldSourceConfig.sourceKind !== "field") {
        throw new Error(`${subject}.fieldSource ${fieldSource} must reference a field-kind input source, got ${fieldSourceConfig.sourceKind}.`);
      }
      return fieldSourceConfig;
    })
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!fieldSources.length) {
    throw new Error(`${subject}.fieldSource must declare at least one explicit field source.`);
  }
  return {
    subject,
    graph,
    input,
    assetSource,
    assetSourceConfig,
    fieldSources,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphEdge(store, subject, expectedGraph, nodeBySubject) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphEdge");
  const graph = requireOne(store, subject, "graph");
  requireIsa(store, graph, "DataTransformConfigInputSourceGraph", `${subject}.graph ${graph}`);
  if (graph !== expectedGraph) {
    throw new Error(`${subject}.graph must reference ${expectedGraph}, got ${graph}.`);
  }
  const leftNode = requireOne(store, subject, "leftNode");
  const leftNodeConfig = nodeBySubject.get(leftNode);
  if (!leftNodeConfig) {
    throw new Error(`${subject}.leftNode must reference a graph node declared by ${expectedGraph}, got ${leftNode}.`);
  }
  const rightNode = requireOne(store, subject, "rightNode");
  const rightNodeConfig = nodeBySubject.get(rightNode);
  if (!rightNodeConfig) {
    throw new Error(`${subject}.rightNode must reference a graph node declared by ${expectedGraph}, got ${rightNode}.`);
  }
  if (leftNode === rightNode) {
    throw new Error(`${subject}.leftNode and ${subject}.rightNode must reference different graph nodes.`);
  }
  const leftFieldSource = requireOne(store, subject, "leftFieldSource");
  if (!leftNodeConfig.fieldSources.some(fieldSource => fieldSource.subject === leftFieldSource)) {
    throw new Error(`${subject}.leftFieldSource must reference a field source declared by ${leftNode}, got ${leftFieldSource}.`);
  }
  const rightFieldSource = requireOne(store, subject, "rightFieldSource");
  if (!rightNodeConfig.fieldSources.some(fieldSource => fieldSource.subject === rightFieldSource)) {
    throw new Error(`${subject}.rightFieldSource must reference a field source declared by ${rightNode}, got ${rightFieldSource}.`);
  }
  return {
    subject,
    graph,
    edgeKind: requireOptionalAllowedValue(
      subject,
      "edgeKind",
      requireOne(store, subject, "edgeKind"),
      TRANSFORM_INPUT_SOURCE_GRAPH_EDGE_KIND_VALUES,
    ),
    leftNode,
    leftNodeConfig,
    leftFieldSource,
    rightNode,
    rightNodeConfig,
    rightFieldSource,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphEdgeInventory(store, subject, expectedGraph, edgeBySubject) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphEdgeInventory");
  const graph = requireOne(store, subject, "graph");
  requireIsa(store, graph, "DataTransformConfigInputSourceGraph", `${subject}.graph ${graph}`);
  if (graph !== expectedGraph) {
    throw new Error(`${subject}.graph must reference ${expectedGraph}, got ${graph}.`);
  }
  const edge = requireOne(store, subject, "edge");
  const edgeConfig = edgeBySubject.get(edge);
  if (!edgeConfig) {
    throw new Error(`${subject}.edge must reference a graph edge declared by ${expectedGraph}, got ${edge}.`);
  }
  return {
    subject,
    graph,
    edge,
    edgeConfig,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      TRANSFORM_INPUT_SOURCE_GRAPH_EDGE_INVENTORY_STATE_VALUES,
    ),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraph(
  store,
  subject,
  expectedConfig,
  inputBySubject,
  inputSourceBySubject,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraph");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataTransformConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const nodes = store.objects(subject, "node")
    .map(node => parseTransformConfigInputSourceGraphNode(
      store,
      node,
      subject,
      inputBySubject,
      inputSourceBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (nodes.length < 2) {
    throw new Error(`${subject}.node must declare at least two graph nodes.`);
  }
  const nodeBySubject = new Map(nodes.map(node => [node.subject, node]));
  const seenInputs = new Set();
  for (const node of nodes) {
    if (seenInputs.has(node.input)) {
      throw new Error(`${subject}.node must not declare more than one graph node for ${node.input}.`);
    }
    seenInputs.add(node.input);
  }
  const authoredEdges = store.objects(subject, "edge")
    .map(edge => parseTransformConfigInputSourceGraphEdge(store, edge, subject, nodeBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!authoredEdges.length) {
    throw new Error(`${subject}.edge must declare at least one explicit graph edge.`);
  }
  const edgeBySubject = new Map(authoredEdges.map(edge => [edge.subject, edge]));
  const edgeInventories = store.objects(subject, "edgeInventory")
    .map(inventory => parseTransformConfigInputSourceGraphEdgeInventory(store, inventory, subject, edgeBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (edgeInventories.length) {
    const inventoryByEdge = new Map();
    for (const inventory of edgeInventories) {
      if (inventoryByEdge.has(inventory.edge)) {
        throw new Error(
          `${subject}.edgeInventory must not declare more than one inventory record for ${inventory.edge}.`,
        );
      }
      inventoryByEdge.set(inventory.edge, inventory);
    }
    for (const edge of authoredEdges) {
      if (!inventoryByEdge.has(edge.subject)) {
        throw new Error(`${subject}.edgeInventory must declare an inventory record for ${edge.subject}.`);
      }
    }
  }
  const edges = edgeInventories.length
    ? edgeInventories
      .filter(inventory => inventory.state === "present")
      .map(inventory => inventory.edgeConfig)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject))
    : authoredEdges;
  if (!edges.length) {
    throw new Error(`${subject}.edge must leave at least one active graph edge after inventory selection.`);
  }
  const touchedNodes = new Set(edges.flatMap(edge => [edge.leftNode, edge.rightNode]));
  for (const node of nodes) {
    if (!touchedNodes.has(node.subject)) {
      throw new Error(`${subject}.edge must touch every declared graph node, missing ${node.subject}.`);
    }
  }
  return {
    subject,
    config,
    graphKind: requireOptionalAllowedValue(
      subject,
      "graphKind",
      requireOne(store, subject, "graphKind"),
      TRANSFORM_INPUT_SOURCE_GRAPH_KIND_VALUES,
    ),
    nodes,
    edges,
    authoredEdges,
    edgeInventories,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInput(store, subject, expectedConfig, expectedAsset, activeAssetSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataTransformConfigInput");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataTransformConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const bindingKind = requireOptionalAllowedValue(
    subject,
    "bindingKind",
    requireOne(store, subject, "bindingKind"),
    TRANSFORM_INPUT_BINDING_KIND_VALUES,
  );
  const field = store.one(subject, "field") || "";
  if (bindingKind === "field") {
    if (!field) {
      throw new Error(`${subject}.field must be present when bindingKind is field.`);
    }
    const fieldConfig = fieldBySubject.get(field);
    if (!fieldConfig) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
    if (fieldConfig.asset !== expectedAsset) {
      throw new Error(`${subject}.field must reference a field on asset ${expectedAsset}, got ${fieldConfig.asset}.`);
    }
  }
  const inputSources = store.objects(subject, "inputSource")
    .map(inputSource => parseTransformConfigInputSource(
      store,
      inputSource,
      subject,
      activeAssetSubjects,
      fieldBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (bindingKind === "asset" && !inputSources.some(source => source.sourceKind === "asset")) {
    throw new Error(`${subject}.inputSource must declare at least one asset source when bindingKind is asset.`);
  }
  if (bindingKind === "asset") {
    const assetSourceSubjects = inputSources
      .filter(source => source.sourceKind === "asset" && source.asset)
      .map(source => source.asset);
    for (const inputSource of inputSources.filter(source => source.sourceKind === "field" && source.field)) {
      const fieldConfig = fieldBySubject.get(inputSource.field);
      if (!fieldConfig) continue;
      if (!assetSourceSubjects.includes(fieldConfig.asset)) {
        throw new Error(
          `${inputSource.subject}.field must reference a field on one of ${assetSourceSubjects.join(", ")}, got ${fieldConfig.asset}.`,
        );
      }
    }
  }
  return {
    subject,
    config,
    inputName: requireOne(store, subject, "inputName"),
    bindingKind,
    field,
    inputSources,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfig(store, subject, expectedStep, expectedAsset, activeAssetSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataTransformConfig");
  const step = requireOne(store, subject, "step");
  requireIsa(store, step, "DataTransformStep", `${subject}.step ${step}`);
  if (step !== expectedStep) {
    throw new Error(`${subject}.step must reference ${expectedStep}, got ${step}.`);
  }
  const inputs = store.objects(subject, "input")
    .map(input => parseTransformConfigInput(store, input, subject, expectedAsset, activeAssetSubjects, fieldBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const inputBySubject = new Map(inputs.map(input => [input.subject, input]));
  const inputSourceBySubject = new Map(
    inputs.flatMap(input => input.inputSources.map(source => [source.subject, source])),
  );
  return {
    subject,
    step,
    configKind: requireOne(store, subject, "configKind"),
    surfaceKind: store.one(subject, "surfaceKind") || "",
    parameters: store.objects(subject, "parameter")
      .map(parameter => parseTransformConfigParameter(store, parameter, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    inputs,
    inputSourceGraphs: store.objects(subject, "inputSourceGraph")
      .map(graph => parseTransformConfigInputSourceGraph(
        store,
        graph,
        subject,
        inputBySubject,
        inputSourceBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    expression: store.one(subject, "expression") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformStep(store, subject, expectedTransform, expectedAsset, activeAssetSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataTransformStep");
  const transform = requireOne(store, subject, "transform");
  requireIsa(store, transform, "DataTransform", `${subject}.transform ${transform}`);
  if (transform !== expectedTransform) {
    throw new Error(`${subject}.transform must reference ${expectedTransform}, got ${transform}.`);
  }
  return {
    subject,
    transform,
    label: requireOne(store, subject, "label"),
    stepKind: requireOne(store, subject, "stepKind"),
    configs: store.objects(subject, "config")
      .map(config => parseTransformConfig(store, config, subject, expectedAsset, activeAssetSubjects, fieldBySubject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseContextMenuAction(store, subject) {
  requireIsa(store, subject, "DataContextMenuAction");
  return {
    subject,
    actionKind: requireOne(store, subject, "actionKind"),
    label: requireOne(store, subject, "label"),
    command: requireOne(store, subject, "command"),
    policyMode: requireOne(store, subject, "policyMode"),
    entitySubject: store.one(subject, "entitySubject") || "",
    entityPredicate: store.one(subject, "entityPredicate") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function currentValueForEditTarget(store, editTarget) {
  const target = store.one(editTarget, "target") || "";
  const predicate = store.one(editTarget, "predicate") || "";
  return target && predicate ? store.one(target, predicate) || "" : "";
}

export function parseInlineEdit(store, subject, activeEditTargetSubjects, activeValidationResultSubjects) {
  requireIsa(store, subject, "DataInlineEdit");
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    editTarget,
    currentValue: store.one(subject, "currentValue") || currentValueForEditTarget(store, editTarget),
    draftValue: store.one(subject, "draftValue") || "",
    commitCommand: requireOne(store, subject, "commitCommand"),
    validationState: requireOne(store, subject, "validationState"),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseGovernedRawFactEditor(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataGovernedRawFactEditor");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const editTargetConfig = parseEditTarget(store, editTarget);
  if (editTargetConfig.family !== "governedRawFact") {
    throw new Error(`${subject}.editTarget must use family governedRawFact, got ${editTargetConfig.family}.`);
  }
  const activeValues = store.distinctActiveObjects(editTargetConfig.target, editTargetConfig.predicate);
  const tuple = parseOptionalGovernedRawFactTuple(store, subject, editTarget, activeValues);
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const policyMode = requireOne(store, subject, "policyMode");
  if (policyMode !== "governedRawFact") {
    throw new Error(`${subject}.policyMode must be governedRawFact, got ${policyMode}.`);
  }
  const commitCommand = requireOne(store, subject, "commitCommand");
  if (commitCommand !== "dataSpace.commitGovernedRawFactEdit") {
    throw new Error(
      `${subject}.commitCommand must be dataSpace.commitGovernedRawFactEdit, got ${commitCommand}.`,
    );
  }
  const operationKind = requireOptionalAllowedValue(
    subject,
    "operationKind",
    store.one(subject, "operationKind") || "",
    GOVERNED_RAW_FACT_OPERATION_KIND_VALUES,
  ) || "replaceValue";
  if (activeValues.length > 1 && !tuple) {
    throw new Error(
      `${subject}.editTarget must declare an explicit governed raw fact tuple before editing multi-valued ${editTargetConfig.target}.${editTargetConfig.predicate}.`,
    );
  }
  if (operationKind === "deleteValue" && !tuple) {
    throw new Error(`${subject}.operationKind deleteValue requires an explicit governed raw fact tuple.`);
  }
  const currentValue = tuple ? tuple.tupleValue : (activeValues[0] || "");
  return {
    subject,
    dataSpace,
    editTarget,
    tuple,
    targetSubject: editTargetConfig.target,
    predicate: editTargetConfig.predicate,
    valueKind: editTargetConfig.valueKind,
    currentValue,
    operationKind,
    label: store.one(subject, "label") || editTargetConfig.label,
    policyMode,
    commitCommand,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseGovernedRawFactTupleOrder(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
) {
  requireIsa(store, subject, "DataGovernedRawFactTupleOrder");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const editTargetConfig = parseEditTarget(store, editTarget);
  if (editTargetConfig.family !== "governedRawFact") {
    throw new Error(`${subject}.editTarget must use family governedRawFact, got ${editTargetConfig.family}.`);
  }
  const activeValues = store.distinctActiveObjects(editTargetConfig.target, editTargetConfig.predicate);
  const entries = store.objects(subject, "entry")
    .map(entrySubject => {
      requireIsa(store, entrySubject, "DataGovernedRawFactTupleOrderEntry", `${subject}.entry ${entrySubject}`);
      const tupleOrder = requireOne(store, entrySubject, "tupleOrder");
      if (tupleOrder !== subject) {
        throw new Error(`${subject}.entry ${entrySubject} must reference tupleOrder ${subject}, got ${tupleOrder}.`);
      }
      const tupleSubject = requireOne(store, entrySubject, "tuple");
      const tuple = parseGovernedRawFactTupleSubject(
        store,
        entrySubject,
        tupleSubject,
        editTarget,
        activeValues,
      );
      return {
        subject: entrySubject,
        tupleOrder,
        tuple,
        label: store.one(entrySubject, "label") || tuple.label || tuple.subject,
        order: Number(store.one(entrySubject, "order") || "0"),
      };
    })
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  if (!entries.length) {
    throw new Error(`${subject}.entry must declare at least one governed raw fact tuple-order entry.`);
  }
  return {
    subject,
    dataSpace,
    editTarget,
    targetSubject: editTargetConfig.target,
    predicate: editTargetConfig.predicate,
    label: store.one(subject, "label") || editTargetConfig.label,
    entries,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseGovernedRawFactBatchOperation(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
  governedRawFactEditorBySubject,
  governedRawFactTupleOrderBySubject,
) {
  requireIsa(store, subject, "DataGovernedRawFactBatchOperation");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const editTargetConfig = parseEditTarget(store, editTarget);
  if (editTargetConfig.family !== "governedRawFact") {
    throw new Error(`${subject}.editTarget must use family governedRawFact, got ${editTargetConfig.family}.`);
  }
  const tupleOrderSubject = store.one(subject, "tupleOrder") || "";
  const tupleOrder = tupleOrderSubject ? governedRawFactTupleOrderBySubject.get(tupleOrderSubject) || null : null;
  if (tupleOrderSubject && !tupleOrder) {
    throw new Error(`${subject}.tupleOrder must reference an active governed raw fact tuple order, got ${tupleOrderSubject}.`);
  }
  if (tupleOrder && tupleOrder.editTarget !== editTarget) {
    throw new Error(`${subject}.tupleOrder must reference a tuple order for ${editTarget}, got ${tupleOrder.editTarget}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const policyMode = requireOne(store, subject, "policyMode");
  if (policyMode !== "governedRawFact") {
    throw new Error(`${subject}.policyMode must be governedRawFact, got ${policyMode}.`);
  }
  const commitCommand = requireOne(store, subject, "commitCommand");
  if (commitCommand !== "dataSpace.commitGovernedRawFactBatchEdit") {
    throw new Error(
      `${subject}.commitCommand must be dataSpace.commitGovernedRawFactBatchEdit, got ${commitCommand}.`,
    );
  }
  const items = store.objects(subject, "item")
    .map(itemSubject => {
      requireIsa(store, itemSubject, "DataGovernedRawFactBatchItem", `${subject}.item ${itemSubject}`);
      const batchOperation = requireOne(store, itemSubject, "batchOperation");
      if (batchOperation !== subject) {
        throw new Error(`${subject}.item ${itemSubject} must reference batchOperation ${subject}, got ${batchOperation}.`);
      }
      const editorSubject = requireOne(store, itemSubject, "editor");
      const editor = governedRawFactEditorBySubject.get(editorSubject) || null;
      if (!editor) {
        throw new Error(`${itemSubject}.editor must reference an active DataGovernedRawFactEditor, got ${editorSubject}.`);
      }
      if (editor.dataSpace !== dataSpaceSubject) {
        throw new Error(`${itemSubject}.editor must reference a governed raw fact editor for ${dataSpaceSubject}, got ${editor.dataSpace}.`);
      }
      if (editor.editTarget !== editTarget) {
        throw new Error(`${itemSubject}.editor must reference a governed raw fact editor for ${editTarget}, got ${editor.editTarget}.`);
      }
      const tupleSubject = store.one(itemSubject, "tuple") || "";
      if (tupleSubject && editor.tuple?.subject !== tupleSubject) {
        throw new Error(`${itemSubject}.tuple must match the tuple declared by ${editorSubject}, got ${tupleSubject}.`);
      }
      const operationKind = requireOptionalAllowedValue(
        itemSubject,
        "operationKind",
        store.one(itemSubject, "operationKind") || "",
        GOVERNED_RAW_FACT_OPERATION_KIND_VALUES,
      ) || editor.operationKind;
      if (operationKind !== editor.operationKind) {
        throw new Error(`${itemSubject}.operationKind must match ${editorSubject}.operationKind ${editor.operationKind}, got ${operationKind}.`);
      }
      return {
        subject: itemSubject,
        batchOperation,
        editor,
        tuple: editor.tuple || null,
        operationKind,
        label: store.one(itemSubject, "label") || editor.label,
        order: Number(store.one(itemSubject, "order") || "0"),
      };
    })
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  if (!items.length) {
    throw new Error(`${subject}.item must declare at least one governed raw fact batch item.`);
  }
  const seenEditors = new Set();
  const seenTuples = new Set();
  for (const item of items) {
    if (seenEditors.has(item.editor.subject)) {
      throw new Error(`${subject}.item must not reference governed raw fact editor ${item.editor.subject} more than once.`);
    }
    seenEditors.add(item.editor.subject);
    if (item.tuple?.subject) {
      if (seenTuples.has(item.tuple.subject)) {
        throw new Error(`${subject}.item must not reference governed raw fact tuple ${item.tuple.subject} more than once.`);
      }
      seenTuples.add(item.tuple.subject);
    }
  }
  return {
    subject,
    dataSpace,
    editTarget,
    targetSubject: editTargetConfig.target,
    predicate: editTargetConfig.predicate,
    tupleOrder,
    label: store.one(subject, "label") || editTargetConfig.label,
    policyMode,
    commitCommand,
    validationResult,
    items,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePropertyRow(
  store,
  subject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
  resolvedPropertyByEditTarget,
) {
  requireIsa(store, subject, "DataPropertyRow");
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const inlineEditSubject = store.one(subject, "inlineEdit") || "";
  const inlineEdit = inlineEditSubject
    ? parseInlineEdit(store, inlineEditSubject, activeEditTargetSubjects, activeValidationResultSubjects)
    : null;
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const resolvedProperty = resolvedPropertyByEditTarget.get(editTarget) || null;
  const resolvedCurrentValue = resolvedProperty?.state === "conflict"
    ? ""
    : resolvedProperty?.value?.effectiveValue || resolvedProperty?.effectiveValue || "";
  const editTargetConfig = {
    subject: editTarget,
    target: store.one(editTarget, "target") || "",
    predicate: store.one(editTarget, "predicate") || "",
    valueKind: store.one(editTarget, "valueKind") || "",
  };
  return {
    subject,
    editTarget,
    label: requireOne(store, subject, "label"),
    valueKind: requireOne(store, subject, "valueKind"),
    currentValue: store.one(subject, "currentValue") || resolvedCurrentValue || currentValueForEditTarget(store, editTarget),
    resolvedProperty,
    materializationState: resolvedProperty?.materializationState || "",
    materializationMessage: resolvedProperty?.materializationMessage || "",
    stale: Boolean(resolvedProperty?.stale),
    resetAction: parseResetAction(store, subject, editTargetConfig, resolvedProperty),
    resetCandidates: deriveResetCandidateInventory(store, subject, editTargetConfig, resolvedProperty),
    resetToInherited: parseResetToInherited(store, editTargetConfig, resolvedProperty),
    inlineEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireFieldEditorEditTarget(
  store,
  subject,
  slot,
  field,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== field || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${field}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseFieldContractEditor(
  store,
  subject,
  activeFieldSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataFieldContractEditor");
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  if (!activeFieldSubjects.has(field)) {
    throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    field,
    displayNameEdit: requireFieldEditorEditTarget(
      store,
      subject,
      "displayNameEdit",
      field,
      "displayName",
      activeEditTargetSubjects,
    ),
    typeEdit: requireFieldEditorEditTarget(store, subject, "typeEdit", field, "authoredType", activeEditTargetSubjects),
    roleEdit: requireFieldEditorEditTarget(store, subject, "roleEdit", field, "role", activeEditTargetSubjects),
    unitEdit: requireFieldEditorEditTarget(store, subject, "unitEdit", field, "unit", activeEditTargetSubjects),
    nullableEdit: requireFieldEditorEditTarget(store, subject, "nullableEdit", field, "nullable", activeEditTargetSubjects),
    defaultVisibilityEdit: requireFieldEditorEditTarget(
      store,
      subject,
      "defaultVisibilityEdit",
      field,
      "defaultVisibility",
      activeEditTargetSubjects,
    ),
    sensitivityEdit: requireFieldEditorEditTarget(
      store,
      subject,
      "sensitivityEdit",
      field,
      "sensitivity",
      activeEditTargetSubjects,
    ),
    plaintextPolicyEdit: requireFieldEditorEditTarget(
      store,
      subject,
      "plaintextPolicyEdit",
      field,
      "plaintextPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireSpaceEditorEditTarget(
  store,
  subject,
  slot,
  dataSpace,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== dataSpace || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${dataSpace}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseAssetPickerEditor(
  store,
  subject,
  dataSpace,
  activeEditTargetSubjects,
  activeAssetSubjects,
  assetBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerEditor");
  const pickerDataSpace = requireOne(store, subject, "dataSpace");
  if (pickerDataSpace !== dataSpace) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpace}, got ${pickerDataSpace}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, "editTarget");
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== dataSpace || predicate !== "defaultAsset") {
    throw new Error(
      `${subject}.editTarget must edit ${dataSpace}.defaultAsset, got ${target}.${predicate}.`,
    );
  }
  const queryStateSubject = store.one(subject, "queryState") || "";
  let queryState = null;
  if (queryStateSubject) {
    requireIsa(store, queryStateSubject, "DataAssetPickerQueryState", `${subject}.queryState ${queryStateSubject}`);
    const picker = requireOne(store, queryStateSubject, "picker");
    if (picker !== subject) {
      throw new Error(`${queryStateSubject}.picker must reference ${subject}, got ${picker}.`);
    }
    queryState = {
      subject: queryStateSubject,
      picker,
      placeholder: store.one(queryStateSubject, "placeholder") || "",
      emptyMessage: store.one(queryStateSubject, "emptyMessage") || "",
      defaultQuery: store.one(queryStateSubject, "defaultQuery") || "",
      order: Number(store.one(queryStateSubject, "order") || "0"),
    };
  }
  const groupSubjects = store.objects(subject, "group");
  const groups = groupSubjects.map(groupSubject => {
    requireIsa(store, groupSubject, "DataAssetPickerGroup", `${subject}.group ${groupSubject}`);
    const picker = requireOne(store, groupSubject, "picker");
    if (picker !== subject) {
      throw new Error(`${groupSubject}.picker must reference ${subject}, got ${picker}.`);
    }
    return {
      subject: groupSubject,
      picker,
      label: requireOne(store, groupSubject, "label"),
      description: store.one(groupSubject, "description") || "",
      order: Number(store.one(groupSubject, "order") || "0"),
    };
  }).sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const groupBySubject = new Map(groups.map(group => [group.subject, group]));
  const optionSubjects = store.objects(subject, "option");
  const options = optionSubjects.map(optionSubject => {
    requireIsa(store, optionSubject, "DataAssetPickerOption", `${subject}.option ${optionSubject}`);
    const picker = requireOne(store, optionSubject, "picker");
    if (picker !== subject) {
      throw new Error(`${optionSubject}.picker must reference ${subject}, got ${picker}.`);
    }
    const asset = requireOne(store, optionSubject, "asset");
    requireIsa(store, asset, "DataAsset", `${optionSubject}.asset ${asset}`);
    if (!activeAssetSubjects.has(asset)) {
      throw new Error(`${optionSubject}.asset must reference an active DataSpace asset, got ${asset}.`);
    }
    const group = store.one(optionSubject, "group") || "";
    if (group && !groupBySubject.has(group)) {
      throw new Error(`${optionSubject}.group must reference a group declared by ${subject}, got ${group}.`);
    }
    const assetConfig = assetBySubject.get(asset);
    return {
      subject: optionSubject,
      picker,
      asset,
      group,
      label: store.one(optionSubject, "label") || assetConfig?.label || asset,
      description: store.one(optionSubject, "description") || "",
      order: Number(store.one(optionSubject, "order") || "0"),
    };
  }).sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const catalogSubject = store.one(subject, "catalog") || "";
  const catalog = catalogSubject
    ? parseAssetPickerCatalog(
      store,
      catalogSubject,
      subject,
      activeAssetSubjects,
      assetBySubject,
      groupBySubject,
    )
    : null;

  return {
    subject,
    dataSpace,
    editTarget,
    catalog,
    queryState,
    groups,
    options,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalog(
  store,
  subject,
  pickerSubject,
  activeAssetSubjects,
  assetBySubject,
  groupBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalog");
  const picker = requireOne(store, subject, "picker");
  if (picker !== pickerSubject) {
    throw new Error(`${subject}.picker must reference ${pickerSubject}, got ${picker}.`);
  }
  const sharedCacheSubject = store.one(subject, "sharedCache") || "";
  const sharedCache = sharedCacheSubject
    ? parseAssetPickerCatalogSharedCache(store, sharedCacheSubject)
    : null;
  const pages = store.objects(subject, "page")
    .map(pageSubject => parseAssetPickerCatalogPage(
      store,
      pageSubject,
      subject,
      activeAssetSubjects,
      assetBySubject,
      groupBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!pages.length) {
    throw new Error(`${subject}.page must reference at least one DataAssetPickerCatalogPage.`);
  }
  const pageBySubject = new Map(pages.map(page => [page.subject, page]));
  const defaultPage = store.one(subject, "defaultPage") || pages[0]?.subject || "";
  if (defaultPage && !pageBySubject.has(defaultPage)) {
    throw new Error(`${subject}.defaultPage must reference a page declared by ${subject}, got ${defaultPage}.`);
  }
  for (const page of pages) {
    if (page.previousPage && !pageBySubject.has(page.previousPage)) {
      throw new Error(`${page.subject}.previousPage must reference a page declared by ${subject}, got ${page.previousPage}.`);
    }
    if (page.nextPage && !pageBySubject.has(page.nextPage)) {
      throw new Error(`${page.subject}.nextPage must reference a page declared by ${subject}, got ${page.nextPage}.`);
    }
  }
  const groupRules = store.objects(subject, "groupRule")
    .map(ruleSubject => parseAssetPickerCatalogGroupRule(store, ruleSubject, subject, groupBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const fetchReceipts = store.objects(subject, "fetchReceipt")
    .map(receiptSubject => parseAssetPickerCatalogFetchReceipt(
      store,
      receiptSubject,
      subject,
      sharedCache,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const cursorStates = store.objects(subject, "cursorState")
    .map(cursorStateSubject => parseAssetPickerCatalogCursorState(
      store,
      cursorStateSubject,
      subject,
      pageBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const cursorStateBySubject = new Map(cursorStates.map(cursorState => [cursorState.subject, cursorState]));
  const fetchActions = store.objects(subject, "fetchAction")
    .map(actionSubject => parseAssetPickerCatalogFetchAction(
      store,
      actionSubject,
      subject,
      sharedCache,
      pageBySubject,
      cursorStateBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const fetchActionBySubject = new Map(fetchActions.map(action => [action.subject, action]));
  const cacheOrchestrations = store.objects(subject, "cacheOrchestration")
    .map(orchestrationSubject => parseAssetPickerCatalogCacheOrchestration(
      store,
      orchestrationSubject,
      subject,
      sharedCache,
      fetchActionBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const syncAdapters = store.objects(subject, "syncAdapter")
    .map(adapterSubject => parseAssetPickerCatalogSyncAdapter(store, adapterSubject, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const syncAdapterBySubject = new Map(syncAdapters.map(adapter => [adapter.subject, adapter]));
  const syncResults = store.objects(subject, "syncResult")
    .map(resultSubject => parseAssetPickerCatalogSyncResult(
      store,
      resultSubject,
      subject,
      syncAdapterBySubject,
      fetchActionBySubject,
      pageBySubject,
      cursorStateBySubject,
      activeAssetSubjects,
      assetBySubject,
      groupBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  for (const result of syncResults) {
    const action = result.fetchAction ? fetchActionBySubject.get(result.fetchAction) : null;
    if (!action) continue;
    if (!action.syncResults) action.syncResults = [];
    action.syncResults.push(result);
    if (!action.defaultSyncResult || result.order < action.defaultSyncResult.order) {
      action.defaultSyncResult = result;
    }
  }
  return {
    subject,
    picker,
    catalogKind: requireOptionalAllowedValue(
      subject,
      "catalogKind",
      requireOne(store, subject, "catalogKind"),
      ASSET_PICKER_CATALOG_KIND_VALUES,
    ),
    sourceLabel: store.one(subject, "sourceLabel") || "",
    sharedCache,
    fetchReceipts,
    cursorStates,
    fetchActions,
    cacheOrchestrations,
    syncAdapters,
    syncResults,
    defaultPage,
    pages,
    groupRules,
    emptyMessage: store.one(subject, "emptyMessage") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogSharedCache(store, subject) {
  requireIsa(store, subject, "DataAssetPickerCatalogSharedCache");
  return {
    subject,
    cacheKey: requireOne(store, subject, "cacheKey"),
    label: store.one(subject, "label") || "",
    sourceLabel: store.one(subject, "sourceLabel") || "",
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_PICKER_CATALOG_SHARED_CACHE_STATE_VALUES,
    ),
    lastSyncAt: store.one(subject, "lastSyncAt") || "",
    lastError: store.one(subject, "lastError") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogFetchReceipt(store, subject, expectedCatalog, sharedCache) {
  requireIsa(store, subject, "DataAssetPickerCatalogFetchReceipt");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const sharedCacheSubject = store.one(subject, "sharedCache") || "";
  if (sharedCacheSubject) {
    requireIsa(
      store,
      sharedCacheSubject,
      "DataAssetPickerCatalogSharedCache",
      `${subject}.sharedCache ${sharedCacheSubject}`,
    );
    if (!sharedCache || sharedCache.subject !== sharedCacheSubject) {
      throw new Error(
        `${subject}.sharedCache must reference the shared cache declared by ${expectedCatalog}, got ${sharedCacheSubject}.`,
      );
    }
  }
  return {
    subject,
    catalog,
    sharedCache: sharedCacheSubject,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_PICKER_CATALOG_FETCH_STATE_VALUES,
    ),
    requestKey: store.one(subject, "requestKey") || "",
    statusCode: Number(store.one(subject, "statusCode") || "0"),
    message: store.one(subject, "message") || "",
    fetchedAt: store.one(subject, "fetchedAt") || "",
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogFetchAction(
  store,
  subject,
  expectedCatalog,
  sharedCache,
  pageBySubject,
  cursorStateBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogFetchAction");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const sharedCacheSubject = store.one(subject, "sharedCache") || "";
  if (sharedCacheSubject) {
    requireIsa(
      store,
      sharedCacheSubject,
      "DataAssetPickerCatalogSharedCache",
      `${subject}.sharedCache ${sharedCacheSubject}`,
    );
    if (!sharedCache || sharedCache.subject !== sharedCacheSubject) {
      throw new Error(
        `${subject}.sharedCache must reference the shared cache declared by ${expectedCatalog}, got ${sharedCacheSubject}.`,
      );
    }
  }
  const page = store.one(subject, "page") || "";
  if (page && !pageBySubject.has(page)) {
    throw new Error(`${subject}.page must reference a page declared by ${expectedCatalog}, got ${page}.`);
  }
  const cursorState = store.one(subject, "cursorState") || "";
  const cursorStateConfig = cursorState ? cursorStateBySubject.get(cursorState) : null;
  if (cursorState && !cursorStateConfig) {
    throw new Error(`${subject}.cursorState must reference a cursor state declared by ${expectedCatalog}, got ${cursorState}.`);
  }
  const actionKind = requireOptionalAllowedValue(
    subject,
    "actionKind",
    requireOne(store, subject, "actionKind"),
    ASSET_PICKER_CATALOG_FETCH_ACTION_KIND_VALUES,
  );
  if (actionKind === "refetchPage" && !page) {
    throw new Error(`${subject}.page is required when actionKind is refetchPage.`);
  }
  if (actionKind === "invalidateCache" && !sharedCacheSubject) {
    throw new Error(`${subject}.sharedCache is required when actionKind is invalidateCache.`);
  }
  if (actionKind === "invalidateAndRefetch" && !sharedCacheSubject) {
    throw new Error(`${subject}.sharedCache is required when actionKind is invalidateAndRefetch.`);
  }
  if (actionKind === "invalidateAndRefetch" && !page) {
    throw new Error(`${subject}.page is required when actionKind is invalidateAndRefetch.`);
  }
  if (actionKind === "rotateCursor" && !cursorState) {
    throw new Error(`${subject}.cursorState is required when actionKind is rotateCursor.`);
  }
  if (["refetchPage", "invalidateCache", "invalidateAndRefetch"].includes(actionKind) && cursorState) {
    throw new Error(`${subject}.cursorState must be omitted when actionKind is ${actionKind}.`);
  }
  if (actionKind === "invalidateCache" && page) {
    throw new Error(`${subject}.page must be omitted when actionKind is invalidateCache.`);
  }
  if (actionKind === "invalidateCache" && cursorState) {
    throw new Error(`${subject}.cursorState must be omitted when actionKind is invalidateCache.`);
  }
  if (actionKind === "rotateCursor" && page && cursorStateConfig && cursorStateConfig.page !== page) {
    throw new Error(`${subject}.page must match ${cursorState}.page when actionKind is rotateCursor, got ${page}.`);
  }
  return {
    subject,
    catalog,
    sharedCache: sharedCacheSubject,
    page,
    pageLabel: page ? (pageBySubject.get(page)?.paginationLabel || "") : "",
    cursorState,
    cursorDirection: cursorStateConfig?.direction || "",
    cursorPage: cursorStateConfig?.page || "",
    cursorLabel: cursorStateConfig?.label || "",
    actionKind,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogCacheOrchestration(
  store,
  subject,
  expectedCatalog,
  sharedCache,
  fetchActionBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogCacheOrchestration");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const sharedCacheSubject = store.one(subject, "sharedCache") || "";
  if (sharedCacheSubject) {
    requireIsa(
      store,
      sharedCacheSubject,
      "DataAssetPickerCatalogSharedCache",
      `${subject}.sharedCache ${sharedCacheSubject}`,
    );
    if (!sharedCache || sharedCache.subject !== sharedCacheSubject) {
      throw new Error(
        `${subject}.sharedCache must reference the shared cache declared by ${expectedCatalog}, got ${sharedCacheSubject}.`,
      );
    }
  }
  const fetchActions = store.objects(subject, "fetchAction").map(actionSubject => {
    const actionConfig = fetchActionBySubject.get(actionSubject);
    if (!actionConfig) {
      throw new Error(`${subject}.fetchAction must reference a fetch action declared by ${expectedCatalog}, got ${actionSubject}.`);
    }
    return actionConfig;
  }).sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!fetchActions.length) {
    throw new Error(`${subject}.fetchAction must reference at least one fetch action declared by ${expectedCatalog}.`);
  }
  const invalidationPolicy = requireOptionalAllowedValue(
    subject,
    "invalidationPolicy",
    requireOne(store, subject, "invalidationPolicy"),
    ASSET_PICKER_CATALOG_INVALIDATION_POLICY_VALUES,
  );
  const receiptHistoryPolicy = requireOptionalAllowedValue(
    subject,
    "receiptHistoryPolicy",
    requireOne(store, subject, "receiptHistoryPolicy"),
    ASSET_PICKER_CATALOG_RECEIPT_HISTORY_POLICY_VALUES,
  );
  const receiptHistoryLimit = parseOptionalPositiveInteger(
    subject,
    "receiptHistoryLimit",
    store.one(subject, "receiptHistoryLimit") || "",
    0,
  );
  const cursorRotationPolicy = requireOptionalAllowedValue(
    subject,
    "cursorRotationPolicy",
    requireOne(store, subject, "cursorRotationPolicy"),
    ASSET_PICKER_CATALOG_CURSOR_ROTATION_POLICY_VALUES,
  );
  if (receiptHistoryPolicy === "rolloverWindow" && !receiptHistoryLimit) {
    throw new Error(`${subject}.receiptHistoryLimit is required when receiptHistoryPolicy is rolloverWindow.`);
  }
  if (receiptHistoryPolicy !== "rolloverWindow" && receiptHistoryLimit) {
    throw new Error(`${subject}.receiptHistoryLimit must be omitted when receiptHistoryPolicy is ${receiptHistoryPolicy}.`);
  }
  return {
    subject,
    catalog,
    sharedCache: sharedCacheSubject,
    fetchActions,
    invalidationPolicy,
    receiptHistoryPolicy,
    receiptHistoryLimit,
    cursorRotationPolicy,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogCursorState(store, subject, expectedCatalog, pageBySubject) {
  requireIsa(store, subject, "DataAssetPickerCatalogCursorState");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const page = requireOne(store, subject, "page");
  if (!pageBySubject.has(page)) {
    throw new Error(`${subject}.page must reference a page declared by ${expectedCatalog}, got ${page}.`);
  }
  return {
    subject,
    catalog,
    page,
    direction: requireOptionalAllowedValue(
      subject,
      "direction",
      requireOne(store, subject, "direction"),
      ASSET_PICKER_CATALOG_CURSOR_DIRECTION_VALUES,
    ),
    cursorToken: requireOne(store, subject, "cursorToken"),
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_PICKER_CATALOG_CURSOR_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogSyncAdapter(store, subject, expectedCatalog) {
  requireIsa(store, subject, "DataAssetPickerCatalogSyncAdapter");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const adapterKind = requireOptionalAllowedValue(
    subject,
    "adapterKind",
    requireOne(store, subject, "adapterKind"),
    ASSET_PICKER_CATALOG_SYNC_ADAPTER_KIND_VALUES,
  );
  const connectorRef = store.one(subject, "connectorRef") || "";
  if (adapterKind === "connector" && !connectorRef) {
    throw new Error(`${subject}.connectorRef is required when adapterKind is connector.`);
  }
  if (adapterKind !== "connector" && connectorRef) {
    throw new Error(`${subject}.connectorRef must be omitted when adapterKind is ${adapterKind}.`);
  }
  return {
    subject,
    catalog,
    adapterKind,
    connectorRef,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogSyncResult(
  store,
  subject,
  expectedCatalog,
  syncAdapterBySubject,
  fetchActionBySubject,
  pageBySubject,
  cursorStateBySubject,
  activeAssetSubjects,
  assetBySubject,
  groupBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogSyncResult");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const adapter = requireOne(store, subject, "adapter");
  const adapterConfig = syncAdapterBySubject.get(adapter);
  if (!adapterConfig) {
    throw new Error(`${subject}.adapter must reference a sync adapter declared by ${expectedCatalog}, got ${adapter}.`);
  }
  const fetchAction = store.one(subject, "fetchAction") || "";
  const fetchActionConfig = fetchAction ? fetchActionBySubject.get(fetchAction) : null;
  if (fetchAction && !fetchActionConfig) {
    throw new Error(`${subject}.fetchAction must reference a fetch action declared by ${expectedCatalog}, got ${fetchAction}.`);
  }
  const page = store.one(subject, "page") || "";
  if (page && !pageBySubject.has(page)) {
    throw new Error(`${subject}.page must reference a page declared by ${expectedCatalog}, got ${page}.`);
  }
  const cursorState = store.one(subject, "cursorState") || "";
  const cursorStateConfig = cursorState ? cursorStateBySubject.get(cursorState) : null;
  if (cursorState && !cursorStateConfig) {
    throw new Error(`${subject}.cursorState must reference a cursor state declared by ${expectedCatalog}, got ${cursorState}.`);
  }
  const replacementCursorToken = store.one(subject, "replacementCursorToken") || "";
  if (replacementCursorToken && !cursorState) {
    throw new Error(`${subject}.cursorState is required when replacementCursorToken is authored.`);
  }
  const entries = store.objects(subject, "entry")
    .map(entrySubject => parseAssetPickerCatalogSyncResultEntry(
      store,
      entrySubject,
      subject,
      activeAssetSubjects,
      assetBySubject,
      groupBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (entries.length && !page) {
    throw new Error(`${subject}.page is required when hydrated result entries are authored.`);
  }
  return {
    subject,
    catalog,
    adapter,
    adapterValue: adapterConfig,
    fetchAction,
    fetchActionValue: fetchActionConfig,
    page,
    pageLabel: page ? (pageBySubject.get(page)?.paginationLabel || "") : "",
    cursorState,
    cursorDirection: cursorStateConfig?.direction || "",
    replacementCursorToken,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_PICKER_CATALOG_FETCH_STATE_VALUES,
    ),
    requestKey: store.one(subject, "requestKey") || "",
    statusCode: Number(store.one(subject, "statusCode") || "0"),
    message: store.one(subject, "message") || "",
    fetchedAt: store.one(subject, "fetchedAt") || "",
    entries,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogSyncResultEntry(
  store,
  subject,
  expectedResult,
  activeAssetSubjects,
  assetBySubject,
  groupBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogSyncResultEntry");
  const result = requireOne(store, subject, "result");
  if (result !== expectedResult) {
    throw new Error(`${subject}.result must reference ${expectedResult}, got ${result}.`);
  }
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const group = store.one(subject, "group") || "";
  if (group && !groupBySubject.has(group)) {
    throw new Error(`${subject}.group must reference a group declared by the parent picker, got ${group}.`);
  }
  const assetConfig = assetBySubject.get(asset);
  return {
    subject,
    result,
    asset,
    group,
    entrySubject: store.one(subject, "entrySubject") || "",
    label: store.one(subject, "label") || assetConfig?.label || asset,
    description: store.one(subject, "description") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogPage(
  store,
  subject,
  expectedCatalog,
  activeAssetSubjects,
  assetBySubject,
  groupBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogPage");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  return {
    subject,
    catalog,
    paginationLabel: store.one(subject, "paginationLabel") || "",
    previousPage: store.one(subject, "previousPage") || "",
    nextPage: store.one(subject, "nextPage") || "",
    entries: store.objects(subject, "entry")
      .map(entrySubject => parseAssetPickerCatalogEntry(
        store,
        entrySubject,
        subject,
        activeAssetSubjects,
        assetBySubject,
        groupBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label)),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogEntry(
  store,
  subject,
  expectedPage,
  activeAssetSubjects,
  assetBySubject,
  groupBySubject,
) {
  requireIsa(store, subject, "DataAssetPickerCatalogEntry");
  const page = requireOne(store, subject, "page");
  if (page !== expectedPage) {
    throw new Error(`${subject}.page must reference ${expectedPage}, got ${page}.`);
  }
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const group = store.one(subject, "group") || "";
  if (group && !groupBySubject.has(group)) {
    throw new Error(`${subject}.group must reference a group declared by the parent picker, got ${group}.`);
  }
  const assetConfig = assetBySubject.get(asset);
  return {
    subject,
    page,
    asset,
    group,
    label: store.one(subject, "label") || assetConfig?.label || asset,
    description: store.one(subject, "description") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetPickerCatalogGroupRule(store, subject, expectedCatalog, groupBySubject) {
  requireIsa(store, subject, "DataAssetPickerCatalogGroupRule");
  const catalog = requireOne(store, subject, "catalog");
  if (catalog !== expectedCatalog) {
    throw new Error(`${subject}.catalog must reference ${expectedCatalog}, got ${catalog}.`);
  }
  const group = requireOne(store, subject, "group");
  if (!groupBySubject.has(group)) {
    throw new Error(`${subject}.group must reference a group declared by the parent picker, got ${group}.`);
  }
  return {
    subject,
    catalog,
    group,
    signalKind: requireOptionalAllowedValue(
      subject,
      "signalKind",
      requireOne(store, subject, "signalKind"),
      ASSET_PICKER_CATALOG_GROUP_RULE_SIGNAL_VALUES,
    ),
    matchValue: requireOne(store, subject, "matchValue"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDataSpaceEditor(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeAssetSubjects,
  assetBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSpaceEditor");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    dataSpace,
    titleEdit: requireSpaceEditorEditTarget(store, subject, "titleEdit", dataSpace, "title", activeEditTargetSubjects),
    descriptionEdit: requireSpaceEditorEditTarget(
      store,
      subject,
      "descriptionEdit",
      dataSpace,
      "description",
      activeEditTargetSubjects,
    ),
    defaultAssetEdit: requireSpaceEditorEditTarget(
      store,
      subject,
      "defaultAssetEdit",
      dataSpace,
      "defaultAsset",
      activeEditTargetSubjects,
    ),
    defaultAssetPicker: store.one(subject, "defaultAssetPicker")
      ? parseAssetPickerEditor(
        store,
        requireOne(store, subject, "defaultAssetPicker"),
        dataSpace,
        activeEditTargetSubjects,
        activeAssetSubjects,
        assetBySubject,
      )
      : null,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireSourceEditorEditTarget(
  store,
  subject,
  slot,
  source,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== source || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${source}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseDataSourceEditor(
  store,
  subject,
  activeSourceSubjects,
  sourceBySubject,
  activeAssetSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSourceEditor");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  if (!activeSourceSubjects.has(source)) {
    throw new Error(`${subject}.source must reference an active DataSpace source, got ${source}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const capabilityEditors = store.objects(subject, "capabilityEditor")
    .map(capabilityEditor => parseDataSourceCapabilityEditor(
      store,
      capabilityEditor,
      source,
      sourceBySubject,
      activeAssetSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.capability.localeCompare(b.capability));
  return {
    subject,
    source,
    labelEdit: requireSourceEditorEditTarget(store, subject, "labelEdit", source, "label", activeEditTargetSubjects),
    descriptionEdit: requireSourceEditorEditTarget(
      store,
      subject,
      "descriptionEdit",
      source,
      "description",
      activeEditTargetSubjects,
    ),
    provenanceModeEdit: requireSourceEditorEditTarget(
      store,
      subject,
      "provenanceModeEdit",
      source,
      "provenanceMode",
      activeEditTargetSubjects,
    ),
    capabilityEditors,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDataSourceCapabilityEditor(
  store,
  subject,
  expectedSource,
  sourceBySubject,
  activeAssetSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSourceCapabilityEditor");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) {
    throw new Error(`${subject}.source must reference an active DataSpace source, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  const state = requireOptionalAllowedValue(
    subject,
    "state",
    requireOne(store, subject, "state"),
    SOURCE_CAPABILITY_EDITOR_STATE_VALUES,
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const hasCapability = sourceConfig.capabilities.includes(capability);
  if (state === "present" && !hasCapability) {
    throw new Error(`${subject}.state present requires ${source} to declare capability ${capability}.`);
  }
  if (state === "available" && hasCapability) {
    throw new Error(`${subject}.state available cannot duplicate active capability ${capability} on ${source}.`);
  }
  return {
    subject,
    source,
    capability,
    state,
    label: store.one(subject, "label") || capability,
    credentialEnvelopes: store.objects(subject, "credentialEnvelope")
      .map(envelope => parseSourceCredentialEnvelope(
        store,
        envelope,
        source,
        capability,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    postgresConfigEditors: store.objects(subject, "postgresConfigEditor")
      .map(editor => parsePostgresSourceCapabilityEditor(
        store,
        editor,
        source,
        capability,
        sourceBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.config.localeCompare(b.config)),
    spreadsheetConfigEditors: store.objects(subject, "spreadsheetConfigEditor")
      .map(editor => parseSpreadsheetSourceCapabilityEditor(
        store,
        editor,
        source,
        capability,
        sourceBySubject,
        activeAssetSubjects,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.config.localeCompare(b.config)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceCredentialEnvelope(
  store,
  subject,
  expectedSource,
  expectedCapability,
) {
  requireIsa(store, subject, "DataSourceCredentialEnvelope");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  if (capability !== expectedCapability) {
    throw new Error(`${subject}.capability must reference capability ${expectedCapability}, got ${capability}.`);
  }
  return {
    subject,
    source,
    capability,
    secretKind: requireOptionalAllowedValue(
      subject,
      "secretKind",
      requireOne(store, subject, "secretKind"),
      SOURCE_CREDENTIAL_ENVELOPE_SECRET_KIND_VALUES,
    ),
    handlingPolicy: requireOptionalAllowedValue(
      subject,
      "handlingPolicy",
      requireOne(store, subject, "handlingPolicy"),
      SOURCE_CREDENTIAL_ENVELOPE_HANDLING_VALUES,
    ),
    rotationState: requireOptionalAllowedValue(
      subject,
      "rotationState",
      requireOne(store, subject, "rotationState"),
      SOURCE_CREDENTIAL_ENVELOPE_ROTATION_STATE_VALUES,
    ),
    secretStores: store.objects(subject, "secretStore")
      .map(secretStore => parseSourceSecretStore(store, secretStore, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceSecretStore(store, subject, expectedEnvelope) {
  requireIsa(store, subject, "DataSourceSecretStore");
  const envelope = requireOne(store, subject, "envelope");
  requireIsa(store, envelope, "DataSourceCredentialEnvelope", `${subject}.envelope ${envelope}`);
  if (envelope !== expectedEnvelope) {
    throw new Error(`${subject}.envelope must reference ${expectedEnvelope}, got ${envelope}.`);
  }
  return {
    subject,
    envelope,
    backendKind: requireOptionalAllowedValue(
      subject,
      "backendKind",
      requireOne(store, subject, "backendKind"),
      SOURCE_SECRET_STORE_BACKEND_VALUES,
    ),
    custodyMode: requireOptionalAllowedValue(
      subject,
      "custodyMode",
      requireOne(store, subject, "custodyMode"),
      SOURCE_SECRET_STORE_CUSTODY_VALUES,
    ),
    locator: requireOne(store, subject, "locator"),
    secretKey: store.one(subject, "secretKey") || "",
    custodyEvents: store.objects(subject, "custodyEvent")
      .map(event => parseSourceSecretCustodyEvent(store, event, subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceSecretCustodyEvent(store, subject, expectedSecretStore) {
  requireIsa(store, subject, "DataSourceSecretCustodyEvent");
  const secretStore = requireOne(store, subject, "secretStore");
  requireIsa(store, secretStore, "DataSourceSecretStore", `${subject}.secretStore ${secretStore}`);
  if (secretStore !== expectedSecretStore) {
    throw new Error(`${subject}.secretStore must reference ${expectedSecretStore}, got ${secretStore}.`);
  }
  return {
    subject,
    secretStore,
    eventKind: requireOptionalAllowedValue(
      subject,
      "eventKind",
      requireOne(store, subject, "eventKind"),
      SOURCE_SECRET_CUSTODY_EVENT_KIND_VALUES,
    ),
    eventState: requireOptionalAllowedValue(
      subject,
      "eventState",
      requireOne(store, subject, "eventState"),
      SOURCE_SECRET_CUSTODY_EVENT_STATE_VALUES,
    ),
    actorKind: requireOptionalAllowedValue(
      subject,
      "actorKind",
      requireOne(store, subject, "actorKind"),
      SOURCE_SECRET_CUSTODY_EVENT_ACTOR_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePostgresSourceCapabilityConfig(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
) {
  requireIsa(store, subject, "DataPostgresSourceCapabilityConfig");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) {
    throw new Error(`${subject}.source must reference an active DataSpace source, got ${source}.`);
  }
  if (sourceConfig.sourceKind !== "postgres") {
    throw new Error(`${subject}.source must reference a postgres source, got ${sourceConfig.sourceKind}.`);
  }
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  if (capability !== "refresh") {
    throw new Error(`${subject}.capability must configure postgres refresh capability, got ${capability}.`);
  }
  if (capability !== expectedCapability) {
    throw new Error(`${subject}.capability must reference capability ${expectedCapability}, got ${capability}.`);
  }
  return {
    subject,
    source,
    capability,
    refreshMode: requireOne(store, subject, "refreshMode"),
    scheduleMinutes: Number(requireOne(store, subject, "scheduleMinutes")),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireCapabilityConfigEditTarget(
  store,
  subject,
  slot,
  targetSubject,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== targetSubject || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${targetSubject}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parsePostgresSourceCapabilityEditor(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPostgresSourceCapabilityEditor");
  const config = requireOne(store, subject, "config");
  const configValue = parsePostgresSourceCapabilityConfig(
    store,
    config,
    expectedSource,
    expectedCapability,
    sourceBySubject,
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    config,
    refreshModeEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "refreshModeEdit",
      config,
      "refreshMode",
      activeEditTargetSubjects,
    ),
    scheduleMinutesEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "scheduleMinutesEdit",
      config,
      "scheduleMinutes",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    configValue,
  };
}

export function parseSpreadsheetSourceCapabilityConfig(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceCapabilityConfig");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) {
    throw new Error(`${subject}.source must reference an active DataSpace source, got ${source}.`);
  }
  if (sourceConfig.sourceKind !== "spreadsheet") {
    throw new Error(`${subject}.source must reference a spreadsheet source, got ${sourceConfig.sourceKind}.`);
  }
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  if (capability !== "inspect") {
    throw new Error(`${subject}.capability must configure spreadsheet inspect capability, got ${capability}.`);
  }
  if (capability !== expectedCapability) {
    throw new Error(`${subject}.capability must reference capability ${expectedCapability}, got ${capability}.`);
  }
  return {
    subject,
    source,
    capability,
    headerRow: Number(requireOne(store, subject, "headerRow")),
    sampleRows: Number(requireOne(store, subject, "sampleRows")),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSpreadsheetSourceWorkflowStep(
  store,
  subject,
  expectedConfig,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceWorkflowStep");
  const config = requireOne(store, subject, "config");
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const stepKind = requireOne(store, subject, "stepKind");
  const templateStep = store.one(subject, "templateStep") || "";
  return {
    subject,
    config,
    templateStep,
    templateStepValue: templateStep
      ? parseSourceWorkflowTemplateStep(store, templateStep, "spreadsheet", stepKind)
      : null,
    stepKind,
    state: requireOne(store, subject, "state"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceWorkflowTemplateStep(
  store,
  subject,
  expectedFamily,
  expectedStepKind,
) {
  const templateStep = parseSourceWorkflowTemplateStepReference(store, subject, expectedFamily);
  if (templateStep.stepKind !== expectedStepKind) {
    throw new Error(`${subject}.stepKind must match ${expectedStepKind}, got ${templateStep.stepKind}.`);
  }
  return templateStep;
}

export function parseSourceWorkflowTemplateStepReference(
  store,
  subject,
  expectedFamily,
) {
  requireIsa(store, subject, "DataSourceWorkflowTemplateStep");
  const family = requireOptionalAllowedValue(
    subject,
    "family",
    requireOne(store, subject, "family"),
    SOURCE_WORKFLOW_TEMPLATE_FAMILY_VALUES,
  );
  if (family !== "generic" && family !== expectedFamily) {
    throw new Error(`${subject}.family must be generic or ${expectedFamily}, got ${family}.`);
  }
  return {
    subject,
    family,
    stepKind: requireOne(store, subject, "stepKind"),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSpreadsheetSourceWorkflowStepEditor(
  store,
  subject,
  expectedConfig,
  workflowStepBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceWorkflowStepEditor");
  const step = requireOne(store, subject, "step");
  const stepValue = workflowStepBySubject.get(step);
  if (!stepValue || stepValue.config !== expectedConfig) {
    throw new Error(`${subject}.step must reference a workflow step for ${expectedConfig}, got ${step}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    step,
    stateEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "stateEdit",
      step,
      "state",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    stepValue,
  };
}

export function parseSpreadsheetSourceIntakeConfig(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
  activeAssetSubjects,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceIntakeConfig");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  const sourceConfig = sourceBySubject.get(source);
  if (!sourceConfig) {
    throw new Error(`${subject}.source must reference an active DataSpace source, got ${source}.`);
  }
  if (sourceConfig.sourceKind !== "spreadsheet") {
    throw new Error(`${subject}.source must reference a spreadsheet source, got ${sourceConfig.sourceKind}.`);
  }
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  if (capability !== "inspect") {
    throw new Error(`${subject}.capability must configure spreadsheet inspect intake, got ${capability}.`);
  }
  if (capability !== expectedCapability) {
    throw new Error(`${subject}.capability must reference capability ${expectedCapability}, got ${capability}.`);
  }
  const workflowSteps = store.objects(subject, "workflowStep")
    .map(step => parseSpreadsheetSourceWorkflowStep(store, step, subject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const workflowStepBySubject = new Map(workflowSteps.map(step => [step.subject, step]));
  const workflowReceipts = store.objects(subject, "workflowReceipt")
    .map(receipt => parseSourceWorkflowReceipt(
      store,
      receipt,
      subject,
      workflowStepBySubject,
      activeAssetSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const workflowReceiptBySubject = new Map(workflowReceipts.map(receipt => [receipt.subject, receipt]));
  const workflowReceiptLineages = store.objects(subject, "workflowReceiptLineage")
    .map(lineage => parseSourceWorkflowReceiptLineage(
      store,
      lineage,
      subject,
      workflowReceiptBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const workflowReceiptLineageBySubject = new Map(workflowReceiptLineages.map(lineage => [lineage.subject, lineage]));
  return {
    subject,
    source,
    capability,
    retentionDays: Number(requireOne(store, subject, "retentionDays")),
    workflowSteps,
    workflowReceipts,
    workflowReceiptLineages,
    workflowReceiptLineageBranches: store.objects(subject, "workflowReceiptLineageBranch")
      .map(branch => parseSourceWorkflowReceiptLineageBranch(
        store,
        branch,
        subject,
        workflowReceiptBySubject,
        workflowReceiptLineageBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceWorkflowReceipt(
  store,
  subject,
  expectedConfig,
  workflowStepBySubject,
  activeAssetSubjects,
) {
  requireIsa(store, subject, "DataSourceWorkflowReceipt");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataSpreadsheetSourceIntakeConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const step = requireOne(store, subject, "step");
  const stepValue = workflowStepBySubject.get(step);
  if (!stepValue) {
    throw new Error(`${subject}.step must reference a workflow step for ${expectedConfig}, got ${step}.`);
  }
  const emittedAsset = store.one(subject, "emittedAsset") || "";
  if (emittedAsset) {
    requireIsa(store, emittedAsset, "DataAsset", `${subject}.emittedAsset ${emittedAsset}`);
    if (!activeAssetSubjects.has(emittedAsset)) {
      throw new Error(`${subject}.emittedAsset must reference an active DataSpace asset, got ${emittedAsset}.`);
    }
  }
  return {
    subject,
    config,
    step,
    stepValue,
    receiptKind: requireOptionalAllowedValue(
      subject,
      "receiptKind",
      requireOne(store, subject, "receiptKind"),
      SOURCE_WORKFLOW_RECEIPT_KIND_VALUES,
    ),
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      SOURCE_WORKFLOW_RECEIPT_STATE_VALUES,
    ),
    branchKey: store.one(subject, "branchKey") || "",
    emittedAsset,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceWorkflowReceiptLineage(
  store,
  subject,
  expectedConfig,
  workflowReceiptBySubject,
) {
  requireIsa(store, subject, "DataSourceWorkflowReceiptLineage");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataSpreadsheetSourceIntakeConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const receipt = requireOne(store, subject, "receipt");
  const receiptValue = workflowReceiptBySubject.get(receipt);
  if (!receiptValue) {
    throw new Error(`${subject}.receipt must reference a workflow receipt for ${expectedConfig}, got ${receipt}.`);
  }
  const priorReceipt = requireOne(store, subject, "priorReceipt");
  const priorReceiptValue = workflowReceiptBySubject.get(priorReceipt);
  if (!priorReceiptValue) {
    throw new Error(`${subject}.priorReceipt must reference a workflow receipt for ${expectedConfig}, got ${priorReceipt}.`);
  }
  if (receipt === priorReceipt) {
    throw new Error(`${subject}.receipt and ${subject}.priorReceipt must reference different workflow receipts.`);
  }
  return {
    subject,
    config,
    receipt,
    receiptValue,
    priorReceipt,
    priorReceiptValue,
    lineageKind: requireOptionalAllowedValue(
      subject,
      "lineageKind",
      requireOne(store, subject, "lineageKind"),
      SOURCE_WORKFLOW_RECEIPT_LINEAGE_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSourceWorkflowReceiptLineageBranch(
  store,
  subject,
  expectedConfig,
  workflowReceiptBySubject,
  workflowReceiptLineageBySubject,
) {
  requireIsa(store, subject, "DataSourceWorkflowReceiptLineageBranch");
  const config = requireOne(store, subject, "config");
  requireIsa(store, config, "DataSpreadsheetSourceIntakeConfig", `${subject}.config ${config}`);
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  const lineageSubjects = store.objects(subject, "lineage");
  if (!lineageSubjects.length) {
    throw new Error(`${subject}.lineage must reference at least one workflow receipt lineage for ${expectedConfig}.`);
  }
  const lineageValues = [];
  const seenLineages = new Set();
  for (const lineageSubject of lineageSubjects) {
    if (seenLineages.has(lineageSubject)) {
      throw new Error(`${subject}.lineage cannot include the same workflow receipt lineage more than once.`);
    }
    seenLineages.add(lineageSubject);
    const lineageValue = workflowReceiptLineageBySubject.get(lineageSubject);
    if (!lineageValue) {
      throw new Error(`${subject}.lineage must reference a workflow receipt lineage for ${expectedConfig}, got ${lineageSubject}.`);
    }
    lineageValues.push(lineageValue);
  }
  const rollbackReceipt = store.one(subject, "rollbackReceipt") || "";
  const rollbackReceiptValue = rollbackReceipt ? workflowReceiptBySubject.get(rollbackReceipt) : null;
  if (rollbackReceipt && !rollbackReceiptValue) {
    throw new Error(`${subject}.rollbackReceipt must reference a workflow receipt for ${expectedConfig}, got ${rollbackReceipt}.`);
  }
  const branchState = requireOptionalAllowedValue(
    subject,
    "branchState",
    requireOne(store, subject, "branchState"),
    SOURCE_WORKFLOW_RECEIPT_LINEAGE_BRANCH_STATE_VALUES,
  );
  if (branchState === "rolledBack" && !rollbackReceipt) {
    throw new Error(`${subject}.rollbackReceipt is required when ${subject}.branchState is rolledBack.`);
  }
  if (rollbackReceipt) {
    const touchedReceiptSubjects = new Set();
    for (const lineageValue of lineageValues) {
      touchedReceiptSubjects.add(lineageValue.receipt);
      touchedReceiptSubjects.add(lineageValue.priorReceipt);
    }
    if (!touchedReceiptSubjects.has(rollbackReceipt)) {
      throw new Error(`${subject}.rollbackReceipt ${rollbackReceipt} must be touched by one of the branch lineages.`);
    }
  }
  return {
    subject,
    config,
    lineages: lineageValues,
    branchKey: requireOne(store, subject, "branchKey"),
    branchState,
    rollbackReceipt,
    rollbackReceiptValue,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSpreadsheetSourceIntakeEditor(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
  activeAssetSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceIntakeEditor");
  const config = requireOne(store, subject, "config");
  const configValue = parseSpreadsheetSourceIntakeConfig(
    store,
    config,
    expectedSource,
    expectedCapability,
    sourceBySubject,
    activeAssetSubjects,
  );
  const workflowStepBySubject = new Map(
    configValue.workflowSteps.map(step => [step.subject, step]),
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    config,
    retentionDaysEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "retentionDaysEdit",
      config,
      "retentionDays",
      activeEditTargetSubjects,
    ),
    workflowStepEditors: store.objects(subject, "workflowStepEditor")
      .map(editor => parseSpreadsheetSourceWorkflowStepEditor(
        store,
        editor,
        config,
        workflowStepBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.step.localeCompare(b.step)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    configValue,
  };
}

export function parseSpreadsheetSourceCapabilityEditor(
  store,
  subject,
  expectedSource,
  expectedCapability,
  sourceBySubject,
  activeAssetSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSpreadsheetSourceCapabilityEditor");
  const config = requireOne(store, subject, "config");
  const configValue = parseSpreadsheetSourceCapabilityConfig(
    store,
    config,
    expectedSource,
    expectedCapability,
    sourceBySubject,
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const intakeEditors = store.objects(subject, "intakeEditor")
    .map(editor => parseSpreadsheetSourceIntakeEditor(
      store,
      editor,
      expectedSource,
      expectedCapability,
      sourceBySubject,
      activeAssetSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.config.localeCompare(b.config));
  const workflowTemplateStepBySubject = new Map();
  for (const intakeEditor of intakeEditors) {
    for (const step of intakeEditor.configValue?.workflowSteps || []) {
      if (step.templateStepValue) {
        workflowTemplateStepBySubject.set(step.templateStepValue.subject, step.templateStepValue);
      }
    }
  }
  return {
    subject,
    config,
    headerRowEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "headerRowEdit",
      config,
      "headerRow",
      activeEditTargetSubjects,
    ),
    sampleRowsEdit: requireCapabilityConfigEditTarget(
      store,
      subject,
      "sampleRowsEdit",
      config,
      "sampleRows",
      activeEditTargetSubjects,
    ),
    intakeEditors,
    workflowTemplateEditors: store.objects(subject, "workflowTemplateEditor")
      .map(editor => parseSourceWorkflowTemplateStepEditor(
        store,
        editor,
        workflowTemplateStepBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.templateStep.localeCompare(b.templateStep)),
    workflowTemplateInventories: store.objects(subject, "workflowTemplateInventory")
      .map(inventory => parseSourceWorkflowTemplateStepInventory(
        store,
        inventory,
        expectedSource,
        expectedCapability,
      ))
      .sort((a, b) => a.order - b.order || a.templateStep.localeCompare(b.templateStep)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    configValue,
  };
}

export function parseSourceWorkflowTemplateStepEditor(
  store,
  subject,
  workflowTemplateStepBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSourceWorkflowTemplateStepEditor");
  const templateStep = requireOne(store, subject, "templateStep");
  const templateStepValue = workflowTemplateStepBySubject.get(templateStep);
  if (!templateStepValue) {
    throw new Error(`${subject}.templateStep must reference an active capability workflow template step, got ${templateStep}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    templateStep,
    familyEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "familyEdit",
      templateStep,
      "family",
      activeEditTargetSubjects,
    ),
    stepKindEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "stepKindEdit",
      templateStep,
      "stepKind",
      activeEditTargetSubjects,
    ),
    labelEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "labelEdit",
      templateStep,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      templateStep,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    templateStepValue,
  };
}

export function parseSourceWorkflowTemplateStepInventory(
  store,
  subject,
  expectedSource,
  expectedCapability,
) {
  requireIsa(store, subject, "DataSourceWorkflowTemplateStepInventory");
  const source = requireOne(store, subject, "source");
  requireIsa(store, source, "DataSource", `${subject}.source ${source}`);
  if (source !== expectedSource) {
    throw new Error(`${subject}.source must reference ${expectedSource}, got ${source}.`);
  }
  const capability = requireOne(store, subject, "capability");
  if (capability !== expectedCapability) {
    throw new Error(`${subject}.capability must reference capability ${expectedCapability}, got ${capability}.`);
  }
  const templateStep = requireOne(store, subject, "templateStep");
  const templateStepValue = parseSourceWorkflowTemplateStepReference(store, templateStep, "spreadsheet");
  return {
    subject,
    source,
    capability,
    templateStep,
    templateStepValue,
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      SOURCE_WORKFLOW_TEMPLATE_INVENTORY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicy(store, subject, activeAssetSubjects) {
  requireIsa(store, subject, "DataAssetSamplePolicy");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  return {
    subject,
    asset,
    scopeKind: requireOptionalAllowedValue(
      subject,
      "scopeKind",
      requireOne(store, subject, "scopeKind"),
      ASSET_POLICY_SCOPE_KIND_VALUES,
    ),
    policy: requireOne(store, subject, "policy"),
    sampleLimit: store.one(subject, "sampleLimit") || "",
    plaintextPolicy: requireOptionalAllowedValue(
      subject,
      "plaintextPolicy",
      store.one(subject, "plaintextPolicy") || "",
      PLAINTEXT_POLICY_VALUES,
    ),
    exceptionSubjects: store.objects(subject, "exception"),
    mergeSubjects: store.objects(subject, "merge"),
    exceptions: [],
    merges: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyException(store, subject, samplePoliciesBySubject, activeFieldSubjects) {
  requireIsa(store, subject, "DataAssetSamplePolicyException");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = samplePoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetSamplePolicy, got ${policy}.`);
  }
  const scopeKind = requireOptionalAllowedValue(
    subject,
    "scopeKind",
    requireOne(store, subject, "scopeKind"),
    ASSET_POLICY_SCOPE_KIND_VALUES,
  );
  const field = store.one(subject, "field") || "";
  if (field) {
    requireIsa(store, field, "DataField", `${subject}.field ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
    const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
    if (fieldAsset !== policyConfig.asset) {
      throw new Error(`${subject}.field must belong to asset ${policyConfig.asset}, got ${fieldAsset}.`);
    }
  }
  if (scopeKind === "field" && !field) {
    throw new Error(`${subject}.field is required when scopeKind is field.`);
  }
  return {
    subject,
    policy,
    scopeKind,
    field,
    policyOverride: requireOne(store, subject, "policyOverride"),
    sampleLimit: store.one(subject, "sampleLimit") || "",
    plaintextPolicy: requireOptionalAllowedValue(
      subject,
      "plaintextPolicy",
      store.one(subject, "plaintextPolicy") || "",
      PLAINTEXT_POLICY_VALUES,
    ),
    precedenceRank: Number(requireOne(store, subject, "precedenceRank")),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyMerge(store, subject, samplePoliciesBySubject, samplePolicyExceptionsBySubject) {
  requireIsa(store, subject, "DataAssetSamplePolicyMerge");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = samplePoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetSamplePolicy, got ${policy}.`);
  }
  const exceptionSubjects = store.objects(subject, "exception");
  if (exceptionSubjects.length < 2) {
    throw new Error(`${subject}.exception must reference at least two DataAssetSamplePolicyException subjects.`);
  }
  const exceptions = exceptionSubjects.map(exceptionSubject => {
    const exception = samplePolicyExceptionsBySubject.get(exceptionSubject);
    if (!exception) {
      throw new Error(`${subject}.exception must reference an active DataAssetSamplePolicyException, got ${exceptionSubject}.`);
    }
    if (exception.policy !== policy) {
      throw new Error(`${subject}.exception ${exceptionSubject} must reference an exception for ${policy}, got ${exception.policy}.`);
    }
    return exceptionSubject;
  });
  if (new Set(exceptions).size !== exceptions.length) {
    throw new Error(`${subject}.exception cannot include the same DataAssetSamplePolicyException more than once.`);
  }
  return {
    subject,
    policy,
    exceptions,
    selectionSubjects: store.objects(subject, "selection"),
    selections: [],
    resultSubjects: store.objects(subject, "result"),
    results: [],
    resolutionPolicy: requireOptionalAllowedValue(
      subject,
      "resolutionPolicy",
      requireOne(store, subject, "resolutionPolicy"),
      ASSET_SAMPLE_POLICY_MERGE_RESOLUTION_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyMergeSelection(
  store,
  subject,
  samplePolicyMergesBySubject,
  samplePolicyExceptionsBySubject,
) {
  requireIsa(store, subject, "DataAssetSamplePolicyMergeSelection");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = samplePolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetSamplePolicyMerge, got ${merge}.`);
  }
  const exception = requireOne(store, subject, "exception");
  const exceptionConfig = samplePolicyExceptionsBySubject.get(exception);
  if (!exceptionConfig) {
    throw new Error(`${subject}.exception must reference an active DataAssetSamplePolicyException, got ${exception}.`);
  }
  if (!mergeConfig.exceptions.includes(exception)) {
    throw new Error(`${subject}.exception must belong to merge ${merge}, got ${exception}.`);
  }
  if (exceptionConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.exception must reference an exception for ${mergeConfig.policy}, got ${exceptionConfig.policy}.`);
  }
  return {
    subject,
    merge,
    exception,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_POLICY_MERGE_SELECTION_STATE_VALUES,
    ),
    selectionReason: store.one(subject, "selectionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyMergeResult(
  store,
  subject,
  samplePolicyMergesBySubject,
  samplePolicyExceptionsBySubject,
) {
  requireIsa(store, subject, "DataAssetSamplePolicyMergeResult");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = samplePolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetSamplePolicyMerge, got ${merge}.`);
  }
  const winnerException = requireOne(store, subject, "winnerException");
  const competingException = requireOne(store, subject, "competingException");
  if (winnerException === competingException) {
    throw new Error(`${subject}.winnerException and ${subject}.competingException must reference different DataAssetSamplePolicyException subjects.`);
  }
  const winnerConfig = samplePolicyExceptionsBySubject.get(winnerException);
  if (!winnerConfig) {
    throw new Error(`${subject}.winnerException must reference an active DataAssetSamplePolicyException, got ${winnerException}.`);
  }
  const competingConfig = samplePolicyExceptionsBySubject.get(competingException);
  if (!competingConfig) {
    throw new Error(`${subject}.competingException must reference an active DataAssetSamplePolicyException, got ${competingException}.`);
  }
  if (!mergeConfig.exceptions.includes(winnerException)) {
    throw new Error(`${subject}.winnerException must belong to merge ${merge}, got ${winnerException}.`);
  }
  if (!mergeConfig.exceptions.includes(competingException)) {
    throw new Error(`${subject}.competingException must belong to merge ${merge}, got ${competingException}.`);
  }
  if (winnerConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.winnerException must reference an exception for ${mergeConfig.policy}, got ${winnerConfig.policy}.`);
  }
  if (competingConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.competingException must reference an exception for ${mergeConfig.policy}, got ${competingConfig.policy}.`);
  }
  return {
    subject,
    merge,
    winnerException,
    competingException,
    resolvedPolicy: requireOne(store, subject, "resolvedPolicy"),
    resolvedSampleLimit: store.one(subject, "resolvedSampleLimit") || "",
    resolvedPlaintextPolicy: requireOptionalAllowedValue(
      subject,
      "resolvedPlaintextPolicy",
      store.one(subject, "resolvedPlaintextPolicy") || "",
      PLAINTEXT_POLICY_VALUES,
    ),
    resolutionReason: store.one(subject, "resolutionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicy(store, subject, activeAssetSubjects) {
  requireIsa(store, subject, "DataAssetVisibilityPolicy");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  return {
    subject,
    asset,
    scopeKind: requireOptionalAllowedValue(
      subject,
      "scopeKind",
      requireOne(store, subject, "scopeKind"),
      ASSET_POLICY_SCOPE_KIND_VALUES,
    ),
    policy: requireOne(store, subject, "policy"),
    audience: store.one(subject, "audience") || "",
    publicationScope: store.one(subject, "publicationScope") || "",
    exceptionSubjects: store.objects(subject, "exception"),
    mergeSubjects: store.objects(subject, "merge"),
    exceptions: [],
    merges: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyException(store, subject, visibilityPoliciesBySubject, activeFieldSubjects) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyException");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = visibilityPoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetVisibilityPolicy, got ${policy}.`);
  }
  const scopeKind = requireOptionalAllowedValue(
    subject,
    "scopeKind",
    requireOne(store, subject, "scopeKind"),
    ASSET_POLICY_SCOPE_KIND_VALUES,
  );
  const field = store.one(subject, "field") || "";
  if (field) {
    requireIsa(store, field, "DataField", `${subject}.field ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
    const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
    if (fieldAsset !== policyConfig.asset) {
      throw new Error(`${subject}.field must belong to asset ${policyConfig.asset}, got ${fieldAsset}.`);
    }
  }
  if (scopeKind === "field" && !field) {
    throw new Error(`${subject}.field is required when scopeKind is field.`);
  }
  return {
    subject,
    policy,
    scopeKind,
    field,
    policyOverride: requireOne(store, subject, "policyOverride"),
    audience: store.one(subject, "audience") || "",
    publicationScope: store.one(subject, "publicationScope") || "",
    precedenceRank: Number(requireOne(store, subject, "precedenceRank")),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyMerge(store, subject, visibilityPoliciesBySubject, visibilityPolicyExceptionsBySubject) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyMerge");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = visibilityPoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetVisibilityPolicy, got ${policy}.`);
  }
  const exceptionSubjects = store.objects(subject, "exception");
  if (exceptionSubjects.length < 2) {
    throw new Error(`${subject}.exception must reference at least two DataAssetVisibilityPolicyException subjects.`);
  }
  const exceptions = exceptionSubjects.map(exceptionSubject => {
    const exception = visibilityPolicyExceptionsBySubject.get(exceptionSubject);
    if (!exception) {
      throw new Error(`${subject}.exception must reference an active DataAssetVisibilityPolicyException, got ${exceptionSubject}.`);
    }
    if (exception.policy !== policy) {
      throw new Error(`${subject}.exception ${exceptionSubject} must reference an exception for ${policy}, got ${exception.policy}.`);
    }
    return exceptionSubject;
  });
  if (new Set(exceptions).size !== exceptions.length) {
    throw new Error(`${subject}.exception cannot include the same DataAssetVisibilityPolicyException more than once.`);
  }
  return {
    subject,
    policy,
    exceptions,
    selectionSubjects: store.objects(subject, "selection"),
    selections: [],
    resultSubjects: store.objects(subject, "result"),
    results: [],
    resolutionPolicy: requireOptionalAllowedValue(
      subject,
      "resolutionPolicy",
      requireOne(store, subject, "resolutionPolicy"),
      ASSET_VISIBILITY_POLICY_MERGE_RESOLUTION_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyMergeSelection(
  store,
  subject,
  visibilityPolicyMergesBySubject,
  visibilityPolicyExceptionsBySubject,
) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyMergeSelection");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = visibilityPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetVisibilityPolicyMerge, got ${merge}.`);
  }
  const exception = requireOne(store, subject, "exception");
  const exceptionConfig = visibilityPolicyExceptionsBySubject.get(exception);
  if (!exceptionConfig) {
    throw new Error(`${subject}.exception must reference an active DataAssetVisibilityPolicyException, got ${exception}.`);
  }
  if (!mergeConfig.exceptions.includes(exception)) {
    throw new Error(`${subject}.exception must belong to merge ${merge}, got ${exception}.`);
  }
  if (exceptionConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.exception must reference an exception for ${mergeConfig.policy}, got ${exceptionConfig.policy}.`);
  }
  return {
    subject,
    merge,
    exception,
    state: requireOptionalAllowedValue(
      subject,
      "state",
      requireOne(store, subject, "state"),
      ASSET_POLICY_MERGE_SELECTION_STATE_VALUES,
    ),
    selectionReason: store.one(subject, "selectionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyMergeResult(
  store,
  subject,
  visibilityPolicyMergesBySubject,
  visibilityPolicyExceptionsBySubject,
) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyMergeResult");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = visibilityPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetVisibilityPolicyMerge, got ${merge}.`);
  }
  const winnerException = requireOne(store, subject, "winnerException");
  const competingException = requireOne(store, subject, "competingException");
  if (winnerException === competingException) {
    throw new Error(`${subject}.winnerException and ${subject}.competingException must reference different DataAssetVisibilityPolicyException subjects.`);
  }
  const winnerConfig = visibilityPolicyExceptionsBySubject.get(winnerException);
  if (!winnerConfig) {
    throw new Error(`${subject}.winnerException must reference an active DataAssetVisibilityPolicyException, got ${winnerException}.`);
  }
  const competingConfig = visibilityPolicyExceptionsBySubject.get(competingException);
  if (!competingConfig) {
    throw new Error(`${subject}.competingException must reference an active DataAssetVisibilityPolicyException, got ${competingException}.`);
  }
  if (!mergeConfig.exceptions.includes(winnerException)) {
    throw new Error(`${subject}.winnerException must belong to merge ${merge}, got ${winnerException}.`);
  }
  if (!mergeConfig.exceptions.includes(competingException)) {
    throw new Error(`${subject}.competingException must belong to merge ${merge}, got ${competingException}.`);
  }
  if (winnerConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.winnerException must reference an exception for ${mergeConfig.policy}, got ${winnerConfig.policy}.`);
  }
  if (competingConfig.policy !== mergeConfig.policy) {
    throw new Error(`${subject}.competingException must reference an exception for ${mergeConfig.policy}, got ${competingConfig.policy}.`);
  }
  return {
    subject,
    merge,
    winnerException,
    competingException,
    resolvedPolicy: requireOne(store, subject, "resolvedPolicy"),
    resolvedAudience: store.one(subject, "resolvedAudience") || "",
    resolvedPublicationScope: store.one(subject, "resolvedPublicationScope") || "",
    resolutionReason: store.one(subject, "resolutionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMerge(
  store,
  subject,
  activeAssetSubjects,
  samplePolicyMergesBySubject,
  visibilityPolicyMergesBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMerge");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const sampleMerge = requireOne(store, subject, "sampleMerge");
  const sampleMergeConfig = samplePolicyMergesBySubject.get(sampleMerge);
  if (!sampleMergeConfig) {
    throw new Error(`${subject}.sampleMerge must reference an active DataAssetSamplePolicyMerge, got ${sampleMerge}.`);
  }
  const samplePolicyAsset = requireOne(store, sampleMergeConfig.policy, "asset", `${sampleMergeConfig.policy}.asset`);
  if (samplePolicyAsset !== asset) {
    throw new Error(`${subject}.sampleMerge must reference a sample merge for ${asset}, got ${samplePolicyAsset}.`);
  }
  const visibilityMerge = requireOne(store, subject, "visibilityMerge");
  const visibilityMergeConfig = visibilityPolicyMergesBySubject.get(visibilityMerge);
  if (!visibilityMergeConfig) {
    throw new Error(`${subject}.visibilityMerge must reference an active DataAssetVisibilityPolicyMerge, got ${visibilityMerge}.`);
  }
  const visibilityPolicyAsset = requireOne(store, visibilityMergeConfig.policy, "asset", `${visibilityMergeConfig.policy}.asset`);
  if (visibilityPolicyAsset !== asset) {
    throw new Error(`${subject}.visibilityMerge must reference a visibility merge for ${asset}, got ${visibilityPolicyAsset}.`);
  }
  return {
    subject,
    asset,
    sampleMerge,
    visibilityMerge,
    resultSubjects: store.objects(subject, "result"),
    results: [],
    orchestrationPolicy: requireOptionalAllowedValue(
      subject,
      "orchestrationPolicy",
      requireOne(store, subject, "orchestrationPolicy"),
      ASSET_CROSS_POLICY_MERGE_ORCHESTRATION_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeResult(
  store,
  subject,
  assetCrossPolicyMergesBySubject,
  samplePolicyMergeResultsBySubject,
  visibilityPolicyMergeResultsBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeResult");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = assetCrossPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetCrossPolicyMerge, got ${merge}.`);
  }
  const sampleMergeResult = store.one(subject, "sampleMergeResult") || "";
  if (sampleMergeResult) {
    const sampleResultConfig = samplePolicyMergeResultsBySubject.get(sampleMergeResult);
    if (!sampleResultConfig) {
      throw new Error(`${subject}.sampleMergeResult must reference an active DataAssetSamplePolicyMergeResult, got ${sampleMergeResult}.`);
    }
    if (sampleResultConfig.merge !== mergeConfig.sampleMerge) {
      throw new Error(`${subject}.sampleMergeResult must reference a result for ${mergeConfig.sampleMerge}, got ${sampleResultConfig.merge}.`);
    }
  }
  const visibilityMergeResult = store.one(subject, "visibilityMergeResult") || "";
  if (visibilityMergeResult) {
    const visibilityResultConfig = visibilityPolicyMergeResultsBySubject.get(visibilityMergeResult);
    if (!visibilityResultConfig) {
      throw new Error(`${subject}.visibilityMergeResult must reference an active DataAssetVisibilityPolicyMergeResult, got ${visibilityMergeResult}.`);
    }
    if (visibilityResultConfig.merge !== mergeConfig.visibilityMerge) {
      throw new Error(`${subject}.visibilityMergeResult must reference a result for ${mergeConfig.visibilityMerge}, got ${visibilityResultConfig.merge}.`);
    }
  }
  return {
    subject,
    merge,
    sampleMergeResult,
    visibilityMergeResult,
    winningPolicyFamily: requireOptionalAllowedValue(
      subject,
      "winningPolicyFamily",
      requireOne(store, subject, "winningPolicyFamily"),
      ASSET_CROSS_POLICY_WINNING_FAMILY_VALUES,
    ),
    effectiveSamplePolicy: store.one(subject, "effectiveSamplePolicy") || "",
    effectiveSampleLimit: store.one(subject, "effectiveSampleLimit") || "",
    effectivePlaintextPolicy: requireOptionalAllowedValue(
      subject,
      "effectivePlaintextPolicy",
      store.one(subject, "effectivePlaintextPolicy") || "",
      PLAINTEXT_POLICY_VALUES,
    ),
    effectiveVisibilityPolicy: store.one(subject, "effectiveVisibilityPolicy") || "",
    effectiveAudience: store.one(subject, "effectiveAudience") || "",
    effectivePublicationScope: store.one(subject, "effectivePublicationScope") || "",
    resolutionReason: store.one(subject, "resolutionReason") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeSet(
  store,
  subject,
  activeAssetSubjects,
  assetCrossPolicyMergesBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeSet");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const mergeSubjects = store.objects(subject, "merge");
  const merges = mergeSubjects.map(mergeSubject => {
    const merge = assetCrossPolicyMergesBySubject.get(mergeSubject);
    if (!merge) {
      throw new Error(`${subject}.merge must reference an active DataAssetCrossPolicyMerge, got ${mergeSubject}.`);
    }
    if (merge.asset !== asset) {
      throw new Error(`${subject}.merge ${mergeSubject} must reference a cross-policy merge for ${asset}, got ${merge.asset}.`);
    }
    return merge;
  });
  return {
    subject,
    asset,
    mergeSubjects,
    merges,
    stageSubjects: store.objects(subject, "stage"),
    stages: [],
    policyFamilyRegistrySubjects: store.objects(subject, "policyFamilyRegistry"),
    policyFamilyRegistries: [],
    stageBranchSubjects: store.objects(subject, "stageBranch"),
    stageBranches: [],
    stageInventorySubjects: store.objects(subject, "stageInventory"),
    stageInventories: [],
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeStage(
  store,
  subject,
  assetCrossPolicyMergeSetsBySubject,
  assetCrossPolicyMergesBySubject,
  assetCrossPolicyMergeResultsBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeStage");
  const mergeSet = requireOne(store, subject, "mergeSet");
  const mergeSetConfig = assetCrossPolicyMergeSetsBySubject.get(mergeSet);
  if (!mergeSetConfig) {
    throw new Error(`${subject}.mergeSet must reference an active DataAssetCrossPolicyMergeSet, got ${mergeSet}.`);
  }
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = assetCrossPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetCrossPolicyMerge, got ${merge}.`);
  }
  if (!mergeSetConfig.mergeSubjects.includes(merge)) {
    throw new Error(`${subject}.merge must reference a merge declared by ${mergeSet}, got ${merge}.`);
  }
  const result = store.one(subject, "result") || "";
  if (result) {
    const resultConfig = assetCrossPolicyMergeResultsBySubject.get(result);
    if (!resultConfig) {
      throw new Error(`${subject}.result must reference an active DataAssetCrossPolicyMergeResult, got ${result}.`);
    }
    if (resultConfig.merge !== merge) {
      throw new Error(`${subject}.result must reference a result for ${merge}, got ${resultConfig.merge}.`);
    }
  }
  return {
    subject,
    mergeSet,
    mergeSetConfig,
    merge,
    mergeConfig,
    result,
    priorStageSubjects: store.objects(subject, "priorStage"),
    priorStages: [],
    stageKind: requireOptionalAllowedValue(
      subject,
      "stageKind",
      requireOne(store, subject, "stageKind"),
      ASSET_CROSS_POLICY_STAGE_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyPolicyFamilyRegistry(
  store,
  subject,
  expectedMergeSet,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyPolicyFamilyRegistry");
  const mergeSet = requireOne(store, subject, "mergeSet");
  if (mergeSet !== expectedMergeSet) {
    throw new Error(`${subject}.mergeSet must reference ${expectedMergeSet}, got ${mergeSet}.`);
  }
  return {
    subject,
    mergeSet,
    familyKey: requireOptionalAllowedValue(
      subject,
      "familyKey",
      requireOne(store, subject, "familyKey"),
      ASSET_CROSS_POLICY_POLICY_FAMILY_KEY_VALUES,
    ),
    bindingKind: requireOptionalAllowedValue(
      subject,
      "bindingKind",
      requireOne(store, subject, "bindingKind"),
      ASSET_CROSS_POLICY_POLICY_FAMILY_BINDING_KIND_VALUES,
    ),
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      ASSET_CROSS_POLICY_STAGE_INVENTORY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeStageBranch(
  store,
  subject,
  expectedMergeSet,
  assetCrossPolicyMergeStagesBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeStageBranch");
  const mergeSet = requireOne(store, subject, "mergeSet");
  if (mergeSet !== expectedMergeSet) {
    throw new Error(`${subject}.mergeSet must reference ${expectedMergeSet}, got ${mergeSet}.`);
  }
  const stageSubjects = store.objects(subject, "stage");
  if (!stageSubjects.length) {
    throw new Error(`${subject}.stage must reference at least one DataAssetCrossPolicyMergeStage for ${expectedMergeSet}.`);
  }
  const seenStages = new Set();
  const stages = stageSubjects.map(stageSubject => {
    if (seenStages.has(stageSubject)) {
      throw new Error(`${subject}.stage cannot include the same DataAssetCrossPolicyMergeStage more than once.`);
    }
    seenStages.add(stageSubject);
    const stage = assetCrossPolicyMergeStagesBySubject.get(stageSubject);
    if (!stage) {
      throw new Error(`${subject}.stage must reference an active DataAssetCrossPolicyMergeStage for ${expectedMergeSet}, got ${stageSubject}.`);
    }
    if (stage.mergeSet !== expectedMergeSet) {
      throw new Error(`${subject}.stage ${stageSubject} must reference a stage for ${expectedMergeSet}, got ${stage.mergeSet}.`);
    }
    return stage;
  }).sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const branchState = requireOptionalAllowedValue(
    subject,
    "branchState",
    requireOne(store, subject, "branchState"),
    ASSET_CROSS_POLICY_STAGE_BRANCH_STATE_VALUES,
  );
  const rollbackStage = store.one(subject, "rollbackStage") || "";
  if (rollbackStage) {
    const rollbackStageValue = assetCrossPolicyMergeStagesBySubject.get(rollbackStage);
    if (!rollbackStageValue) {
      throw new Error(`${subject}.rollbackStage must reference an active DataAssetCrossPolicyMergeStage for ${expectedMergeSet}, got ${rollbackStage}.`);
    }
    if (rollbackStageValue.mergeSet !== expectedMergeSet) {
      throw new Error(`${subject}.rollbackStage ${rollbackStage} must reference a stage for ${expectedMergeSet}, got ${rollbackStageValue.mergeSet}.`);
    }
    if (!seenStages.has(rollbackStage)) {
      throw new Error(`${subject}.rollbackStage ${rollbackStage} must be one of the branch stages.`);
    }
  }
  if (branchState === "rolledBack" && !rollbackStage) {
    throw new Error(`${subject}.rollbackStage is required when ${subject}.branchState is rolledBack.`);
  }
  return {
    subject,
    mergeSet,
    stages,
    branchKey: requireOne(store, subject, "branchKey"),
    branchState,
    rollbackStage,
    rollbackStageValue: rollbackStage ? assetCrossPolicyMergeStagesBySubject.get(rollbackStage) : null,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeStageInventory(
  store,
  subject,
  expectedMergeSet,
  assetCrossPolicyMergeStagesBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeStageInventory");
  const mergeSet = requireOne(store, subject, "mergeSet");
  if (mergeSet !== expectedMergeSet) {
    throw new Error(`${subject}.mergeSet must reference ${expectedMergeSet}, got ${mergeSet}.`);
  }
  const stage = requireOne(store, subject, "stage");
  const stageValue = assetCrossPolicyMergeStagesBySubject.get(stage);
  if (!stageValue) {
    throw new Error(`${subject}.stage must reference an active DataAssetCrossPolicyMergeStage for ${expectedMergeSet}, got ${stage}.`);
  }
  if (stageValue.mergeSet !== expectedMergeSet) {
    throw new Error(`${subject}.stage ${stage} must reference a stage for ${expectedMergeSet}, got ${stageValue.mergeSet}.`);
  }
  const predecessorStage = store.one(subject, "predecessorStage") || "";
  if (predecessorStage) {
    const predecessorStageValue = assetCrossPolicyMergeStagesBySubject.get(predecessorStage);
    if (!predecessorStageValue) {
      throw new Error(`${subject}.predecessorStage must reference an active DataAssetCrossPolicyMergeStage for ${expectedMergeSet}, got ${predecessorStage}.`);
    }
    if (predecessorStageValue.mergeSet !== expectedMergeSet) {
      throw new Error(`${subject}.predecessorStage ${predecessorStage} must reference a stage for ${expectedMergeSet}, got ${predecessorStageValue.mergeSet}.`);
    }
    if (predecessorStage === stage) {
      throw new Error(`${subject}.predecessorStage cannot reference the same stage as ${subject}.stage.`);
    }
  }
  return {
    subject,
    mergeSet,
    stage,
    stageValue,
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      ASSET_CROSS_POLICY_STAGE_INVENTORY_STATE_VALUES,
    ),
    predecessorStage,
    predecessorStageValue: predecessorStage ? assetCrossPolicyMergeStagesBySubject.get(predecessorStage) : null,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeSetInventory(
  store,
  subject,
  activeAssetSubjects,
  assetCrossPolicyMergeSetsBySubject,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeSetInventory");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const mergeSet = requireOne(store, subject, "mergeSet");
  const mergeSetValue = assetCrossPolicyMergeSetsBySubject.get(mergeSet);
  if (!mergeSetValue) {
    throw new Error(`${subject}.mergeSet must reference an active DataAssetCrossPolicyMergeSet, got ${mergeSet}.`);
  }
  if (mergeSetValue.asset !== asset) {
    throw new Error(`${subject}.mergeSet ${mergeSet} must reference a merge set for ${asset}, got ${mergeSetValue.asset}.`);
  }
  return {
    subject,
    asset,
    mergeSet,
    mergeSetValue,
    inventoryState: requireOptionalAllowedValue(
      subject,
      "inventoryState",
      requireOne(store, subject, "inventoryState"),
      ASSET_CROSS_POLICY_STAGE_INVENTORY_STATE_VALUES,
    ),
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireAssetEditorEditTarget(
  store,
  subject,
  slot,
  asset,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== asset || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${asset}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseAssetSamplePolicyEditor(
  store,
  subject,
  expectedAsset,
  samplePoliciesBySubject,
  samplePolicyExceptionsBySubject,
  samplePolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetSamplePolicyEditor");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = samplePoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetSamplePolicy, got ${policy}.`);
  }
  if (policyConfig.asset !== expectedAsset) {
    throw new Error(`${subject}.policy must reference an asset policy for ${expectedAsset}, got ${policyConfig.asset}.`);
  }
  const policyEdit = requireAssetEditorEditTarget(
    store,
    subject,
    "policyEdit",
    policy,
    "policy",
    activeEditTargetSubjects,
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    policy,
    policyEdit,
    sampleLimitEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "sampleLimitEdit",
      policy,
      "sampleLimit",
      activeEditTargetSubjects,
    ),
    plaintextPolicyEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "plaintextPolicyEdit",
      policy,
      "plaintextPolicy",
      activeEditTargetSubjects,
    ),
    exceptionEditors: store.objects(subject, "exceptionEditor")
      .map(exceptionEditor => parseAssetSamplePolicyExceptionEditor(
        store,
        exceptionEditor,
        policy,
        samplePolicyExceptionsBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    mergeEditors: store.objects(subject, "mergeEditor")
      .map(mergeEditor => parseAssetSamplePolicyMergeEditor(
        store,
        mergeEditor,
        policy,
        samplePolicyMergesBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyExceptionEditor(
  store,
  subject,
  expectedPolicy,
  samplePolicyExceptionsBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetSamplePolicyExceptionEditor");
  const exceptionSubject = requireOne(store, subject, "exception");
  const exceptionConfig = samplePolicyExceptionsBySubject.get(exceptionSubject);
  if (!exceptionConfig) {
    throw new Error(`${subject}.exception must reference an active DataAssetSamplePolicyException, got ${exceptionSubject}.`);
  }
  if (exceptionConfig.policy !== expectedPolicy) {
    throw new Error(`${subject}.exception must reference an exception for ${expectedPolicy}, got ${exceptionConfig.policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    exception: exceptionSubject,
    policyOverrideEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "policyOverrideEdit",
      exceptionSubject,
      "policyOverride",
      activeEditTargetSubjects,
    ),
    sampleLimitEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "sampleLimitEdit",
      exceptionSubject,
      "sampleLimit",
      activeEditTargetSubjects,
    ),
    plaintextPolicyEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "plaintextPolicyEdit",
      exceptionSubject,
      "plaintextPolicy",
      activeEditTargetSubjects,
    ),
    precedenceRankEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "precedenceRankEdit",
      exceptionSubject,
      "precedenceRank",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetSamplePolicyMergeEditor(
  store,
  subject,
  expectedPolicy,
  samplePolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetSamplePolicyMergeEditor");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = samplePolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetSamplePolicyMerge, got ${merge}.`);
  }
  if (mergeConfig.policy !== expectedPolicy) {
    throw new Error(`${subject}.merge must reference a merge for ${expectedPolicy}, got ${mergeConfig.policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    merge,
    resolutionPolicyEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "resolutionPolicyEdit",
      merge,
      "resolutionPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyEditor(
  store,
  subject,
  expectedAsset,
  visibilityPoliciesBySubject,
  visibilityPolicyExceptionsBySubject,
  visibilityPolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyEditor");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = visibilityPoliciesBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataAssetVisibilityPolicy, got ${policy}.`);
  }
  if (policyConfig.asset !== expectedAsset) {
    throw new Error(`${subject}.policy must reference a visibility policy for ${expectedAsset}, got ${policyConfig.asset}.`);
  }
  const policyEdit = requireAssetEditorEditTarget(
    store,
    subject,
    "policyEdit",
    policy,
    "policy",
    activeEditTargetSubjects,
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    policy,
    policyEdit,
    audienceEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "audienceEdit",
      policy,
      "audience",
      activeEditTargetSubjects,
    ),
    publicationScopeEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "publicationScopeEdit",
      policy,
      "publicationScope",
      activeEditTargetSubjects,
    ),
    exceptionEditors: store.objects(subject, "exceptionEditor")
      .map(exceptionEditor => parseAssetVisibilityPolicyExceptionEditor(
        store,
        exceptionEditor,
        policy,
        visibilityPolicyExceptionsBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    mergeEditors: store.objects(subject, "mergeEditor")
      .map(mergeEditor => parseAssetVisibilityPolicyMergeEditor(
        store,
        mergeEditor,
        policy,
        visibilityPolicyMergesBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyMergeEditor(
  store,
  subject,
  expectedPolicy,
  visibilityPolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyMergeEditor");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = visibilityPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetVisibilityPolicyMerge, got ${merge}.`);
  }
  if (mergeConfig.policy !== expectedPolicy) {
    throw new Error(`${subject}.merge must reference a merge for ${expectedPolicy}, got ${mergeConfig.policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    merge,
    resolutionPolicyEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "resolutionPolicyEdit",
      merge,
      "resolutionPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetCrossPolicyMergeEditor(
  store,
  subject,
  expectedAsset,
  assetCrossPolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetCrossPolicyMergeEditor");
  const merge = requireOne(store, subject, "merge");
  const mergeConfig = assetCrossPolicyMergesBySubject.get(merge);
  if (!mergeConfig) {
    throw new Error(`${subject}.merge must reference an active DataAssetCrossPolicyMerge, got ${merge}.`);
  }
  if (mergeConfig.asset !== expectedAsset) {
    throw new Error(`${subject}.merge must reference a cross-policy merge for ${expectedAsset}, got ${mergeConfig.asset}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    merge,
    orchestrationPolicyEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "orchestrationPolicyEdit",
      merge,
      "orchestrationPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAssetVisibilityPolicyExceptionEditor(
  store,
  subject,
  expectedPolicy,
  visibilityPolicyExceptionsBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetVisibilityPolicyExceptionEditor");
  const exceptionSubject = requireOne(store, subject, "exception");
  const exceptionConfig = visibilityPolicyExceptionsBySubject.get(exceptionSubject);
  if (!exceptionConfig) {
    throw new Error(`${subject}.exception must reference an active DataAssetVisibilityPolicyException, got ${exceptionSubject}.`);
  }
  if (exceptionConfig.policy !== expectedPolicy) {
    throw new Error(`${subject}.exception must reference an exception for ${expectedPolicy}, got ${exceptionConfig.policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    exception: exceptionSubject,
    policyOverrideEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "policyOverrideEdit",
      exceptionSubject,
      "policyOverride",
      activeEditTargetSubjects,
    ),
    audienceEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "audienceEdit",
      exceptionSubject,
      "audience",
      activeEditTargetSubjects,
    ),
    publicationScopeEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "publicationScopeEdit",
      exceptionSubject,
      "publicationScope",
      activeEditTargetSubjects,
    ),
    precedenceRankEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "precedenceRankEdit",
      exceptionSubject,
      "precedenceRank",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDataAssetEditor(
  store,
  subject,
  activeAssetSubjects,
  samplePoliciesBySubject,
  samplePolicyExceptionsBySubject,
  samplePolicyMergesBySubject,
  visibilityPoliciesBySubject,
  visibilityPolicyExceptionsBySubject,
  visibilityPolicyMergesBySubject,
  assetCrossPolicyMergesBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAssetEditor");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    asset,
    labelEdit: requireAssetEditorEditTarget(store, subject, "labelEdit", asset, "label", activeEditTargetSubjects),
    descriptionEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "descriptionEdit",
      asset,
      "description",
      activeEditTargetSubjects,
    ),
    samplePolicyEditors: store.objects(subject, "samplePolicyEditor")
      .map(policyEditor => parseAssetSamplePolicyEditor(
        store,
        policyEditor,
        asset,
        samplePoliciesBySubject,
        samplePolicyExceptionsBySubject,
        samplePolicyMergesBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.policy.localeCompare(b.policy)),
    visibilityPolicyEditors: store.objects(subject, "visibilityPolicyEditor")
      .map(policyEditor => parseAssetVisibilityPolicyEditor(
        store,
        policyEditor,
        asset,
        visibilityPoliciesBySubject,
        visibilityPolicyExceptionsBySubject,
        visibilityPolicyMergesBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.policy.localeCompare(b.policy)),
    crossPolicyMergeEditors: store.objects(subject, "crossPolicyMergeEditor")
      .map(mergeEditor => parseAssetCrossPolicyMergeEditor(
        store,
        mergeEditor,
        asset,
        assetCrossPolicyMergesBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.merge.localeCompare(b.merge)),
    livenessStateEdit: requireAssetEditorEditTarget(
      store,
      subject,
      "livenessStateEdit",
      asset,
      "livenessState",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireTransformEditorEditTarget(
  store,
  subject,
  slot,
  targetSubject,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== targetSubject || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${targetSubject}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseTransformConfigParameterEditor(
  store,
  subject,
  expectedConfig,
  transformConfigParameterBySubject,
  transformConfigParameterOptionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigParameterEditor");
  const parameter = requireOne(store, subject, "parameter");
  const parameterConfig = transformConfigParameterBySubject.get(parameter);
  if (!parameterConfig) {
    throw new Error(`${subject}.parameter must reference an active DataTransformConfigParameter, got ${parameter}.`);
  }
  if (parameterConfig.config !== expectedConfig) {
    throw new Error(`${subject}.parameter must reference a parameter for ${expectedConfig}, got ${parameterConfig.config}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const optionEditors = store.objects(subject, "optionEditor")
    .map(editor => parseTransformConfigParameterOptionEditor(
      store,
      editor,
      parameter,
      transformConfigParameterOptionBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const optionCreator = store.one(subject, "optionCreator")
    ? parseTransformConfigParameterOptionCreator(
      store,
      requireOne(store, subject, "optionCreator"),
      parameter,
      activeValidationResultSubjects,
    )
    : null;
  const hasOptions = (parameterConfig.options || []).length > 0;
  const valueEdit = store.one(subject, "valueEdit")
    ? requireTransformEditorEditTarget(
      store,
      subject,
      "valueEdit",
      parameter,
      "value",
      activeEditTargetSubjects,
    )
    : "";
  if (hasOptions && !optionEditors.length && !optionCreator) {
    throw new Error(`${subject}.optionEditor must reference at least one option editor when ${parameter} declares explicit options.`);
  }
  if (hasOptions && valueEdit) {
    throw new Error(`${subject}.valueEdit must be omitted when ${parameter} declares explicit option records.`);
  }
  if (!hasOptions && !valueEdit) {
    throw new Error(`${subject}.valueEdit is required when ${parameter} does not declare explicit option records.`);
  }
  return {
    subject,
    parameter,
    valueEdit,
    optionEditors,
    optionCreator,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigParameterOptionEditor(
  store,
  subject,
  expectedParameter,
  transformConfigParameterOptionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigParameterOptionEditor");
  const option = requireOne(store, subject, "option");
  const optionConfig = transformConfigParameterOptionBySubject.get(option);
  if (!optionConfig) {
    throw new Error(`${subject}.option must reference an active DataTransformConfigParameterOption, got ${option}.`);
  }
  if (optionConfig.parameter !== expectedParameter) {
    throw new Error(`${subject}.option must reference an option for ${expectedParameter}, got ${optionConfig.parameter}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    option,
    valueEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "valueEdit",
      option,
      "value",
      activeEditTargetSubjects,
    ),
    labelEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "labelEdit",
      option,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "orderEdit",
      option,
      "order",
      activeEditTargetSubjects,
    ),
    stateEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "stateEdit",
      option,
      "state",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputEditor(
  store,
  subject,
  expectedConfig,
  transformConfigInputBySubject,
  transformConfigInputSourceBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigInputEditor");
  const input = requireOne(store, subject, "input");
  const inputConfig = transformConfigInputBySubject.get(input);
  if (!inputConfig) {
    throw new Error(`${subject}.input must reference an active DataTransformConfigInput, got ${input}.`);
  }
  if (inputConfig.config !== expectedConfig) {
    throw new Error(`${subject}.input must reference an input for ${expectedConfig}, got ${inputConfig.config}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    input,
    fieldEdit: inputConfig.bindingKind === "field"
      ? requireTransformEditorEditTarget(
        store,
        subject,
        "fieldEdit",
        input,
        "field",
        activeEditTargetSubjects,
      )
      : "",
    sourceEditors: store.objects(subject, "sourceEditor")
      .map(editor => parseTransformConfigInputSourceEditor(
        store,
        editor,
        input,
        transformConfigInputSourceBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceEditor(
  store,
  subject,
  expectedInput,
  transformConfigInputSourceBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceEditor");
  const source = requireOne(store, subject, "source");
  const sourceConfig = transformConfigInputSourceBySubject.get(source);
  if (!sourceConfig) {
    throw new Error(`${subject}.source must reference an active DataTransformConfigInputSource, got ${source}.`);
  }
  if (sourceConfig.input !== expectedInput) {
    throw new Error(`${subject}.source must reference an input source for ${expectedInput}, got ${sourceConfig.input}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const assetEdit = store.one(subject, "assetEdit")
    ? requireTransformEditorEditTarget(
      store,
      subject,
      "assetEdit",
      source,
      "asset",
      activeEditTargetSubjects,
    )
    : "";
  const fieldEdit = store.one(subject, "fieldEdit")
    ? requireTransformEditorEditTarget(
      store,
      subject,
      "fieldEdit",
      source,
      "field",
      activeEditTargetSubjects,
    )
    : "";
  if (sourceConfig.sourceKind === "asset") {
    if (!assetEdit) {
      throw new Error(`${subject}.assetEdit is required when ${source} has sourceKind asset.`);
    }
    if (fieldEdit) {
      throw new Error(`${subject}.fieldEdit must be omitted when ${source} has sourceKind asset.`);
    }
  }
  if (sourceConfig.sourceKind === "field") {
    if (!fieldEdit) {
      throw new Error(`${subject}.fieldEdit is required when ${source} has sourceKind field.`);
    }
    if (assetEdit) {
      throw new Error(`${subject}.assetEdit must be omitted when ${source} has sourceKind field.`);
    }
  }
  return {
    subject,
    source,
    assetEdit,
    fieldEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphNodeEditor(
  store,
  subject,
  expectedGraph,
  graphNodeBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphNodeEditor");
  const node = requireOne(store, subject, "node");
  const nodeConfig = graphNodeBySubject.get(node);
  if (!nodeConfig) {
    throw new Error(`${subject}.node must reference an active DataTransformConfigInputSourceGraphNode, got ${node}.`);
  }
  if (nodeConfig.graph !== expectedGraph) {
    throw new Error(`${subject}.node must reference a graph node for ${expectedGraph}, got ${nodeConfig.graph}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    node,
    labelEdit: store.one(subject, "labelEdit")
      ? requireTransformEditorEditTarget(
        store,
        subject,
        "labelEdit",
        node,
        "label",
        activeEditTargetSubjects,
      )
      : "",
    orderEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "orderEdit",
      node,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphEdgeEditor(
  store,
  subject,
  expectedGraph,
  edgeInventoryBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphEdgeEditor");
  const inventory = requireOne(store, subject, "inventory");
  const inventoryConfig = edgeInventoryBySubject.get(inventory);
  if (!inventoryConfig) {
    throw new Error(`${subject}.inventory must reference an active DataTransformConfigInputSourceGraphEdgeInventory, got ${inventory}.`);
  }
  if (inventoryConfig.graph !== expectedGraph) {
    throw new Error(`${subject}.inventory must reference an edge inventory for ${expectedGraph}, got ${inventoryConfig.graph}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    inventory,
    edge: inventoryConfig.edge,
    labelEdit: store.one(subject, "labelEdit")
      ? requireTransformEditorEditTarget(
        store,
        subject,
        "labelEdit",
        inventoryConfig.edge,
        "label",
        activeEditTargetSubjects,
      )
      : "",
    orderEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "orderEdit",
      inventoryConfig.edge,
      "order",
      activeEditTargetSubjects,
    ),
    stateEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "stateEdit",
      inventory,
      "state",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTransformConfigInputSourceGraphEditor(
  store,
  subject,
  expectedConfig,
  graphBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformConfigInputSourceGraphEditor");
  const graph = requireOne(store, subject, "graph");
  const graphConfig = graphBySubject.get(graph);
  if (!graphConfig) {
    throw new Error(`${subject}.graph must reference an active DataTransformConfigInputSourceGraph, got ${graph}.`);
  }
  if (graphConfig.config !== expectedConfig) {
    throw new Error(`${subject}.graph must reference a graph for ${expectedConfig}, got ${graphConfig.config}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const graphNodeBySubject = new Map((graphConfig.nodes || []).map(node => [node.subject, node]));
  const edgeInventoryBySubject = new Map((graphConfig.edgeInventories || []).map(inventory => [inventory.subject, inventory]));
  return {
    subject,
    graph,
    nodeEditors: store.objects(subject, "nodeEditor")
      .map(editor => parseTransformConfigInputSourceGraphNodeEditor(
        store,
        editor,
        graph,
        graphNodeBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.node.localeCompare(b.node)),
    edgeEditors: store.objects(subject, "edgeEditor")
      .map(editor => parseTransformConfigInputSourceGraphEdgeEditor(
        store,
        editor,
        graph,
        edgeInventoryBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.edge.localeCompare(b.edge)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDataTransformEditor(
  store,
  subject,
  activeTransformSubjects,
  transformStepBySubject,
  transformConfigBySubject,
  transformConfigInputSourceGraphBySubject,
  transformConfigParameterBySubject,
  transformConfigParameterOptionBySubject,
  transformConfigInputBySubject,
  transformConfigInputSourceBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTransformEditor");
  const transform = requireOne(store, subject, "transform");
  requireIsa(store, transform, "DataTransform", `${subject}.transform ${transform}`);
  if (!activeTransformSubjects.has(transform)) {
    throw new Error(`${subject}.transform must reference an active DataSpace transform, got ${transform}.`);
  }
  const step = requireOne(store, subject, "step");
  const stepConfig = transformStepBySubject.get(step);
  if (!stepConfig) {
    throw new Error(`${subject}.step must reference an active DataTransformStep, got ${step}.`);
  }
  if (stepConfig.transform !== transform) {
    throw new Error(`${subject}.step must reference a step for ${transform}, got ${stepConfig.transform}.`);
  }
  const expressionConfig = requireOne(store, subject, "expressionConfig");
  const expressionConfigRecord = transformConfigBySubject.get(expressionConfig);
  if (!expressionConfigRecord) {
    throw new Error(`${subject}.expressionConfig must reference an active DataTransformConfig, got ${expressionConfig}.`);
  }
  if (expressionConfigRecord.step !== step) {
    throw new Error(`${subject}.expressionConfig must reference a config for ${step}, got ${expressionConfigRecord.step}.`);
  }
  if (expressionConfigRecord.configKind !== "expression") {
    throw new Error(`${subject}.expressionConfig must reference an expression config, got ${expressionConfigRecord.configKind}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    transform,
    step,
    expressionConfig,
    graphEditors: store.objects(subject, "graphEditor")
      .map(editor => parseTransformConfigInputSourceGraphEditor(
        store,
        editor,
        expressionConfig,
        transformConfigInputSourceGraphBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.graph.localeCompare(b.graph)),
    parameterEditors: store.objects(subject, "parameterEditor")
      .map(editor => parseTransformConfigParameterEditor(
        store,
        editor,
        expressionConfig,
        transformConfigParameterBySubject,
        transformConfigParameterOptionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.parameter.localeCompare(b.parameter)),
    inputEditors: store.objects(subject, "inputEditor")
      .map(editor => parseTransformConfigInputEditor(
        store,
        editor,
        expressionConfig,
        transformConfigInputBySubject,
        transformConfigInputSourceBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.input.localeCompare(b.input)),
    labelEdit: requireTransformEditorEditTarget(store, subject, "labelEdit", transform, "label", activeEditTargetSubjects),
    expressionEdit: requireTransformEditorEditTarget(
      store,
      subject,
      "expressionEdit",
      expressionConfig,
      "expression",
      activeEditTargetSubjects,
    ),
    stateEdit: requireTransformEditorEditTarget(store, subject, "stateEdit", transform, "state", activeEditTargetSubjects),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requirePublicationEditorEditTarget(
  store,
  subject,
  slot,
  targetSubject,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== targetSubject || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${targetSubject}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parsePublicationPlacementEditor(
  store,
  subject,
  expectedPublication,
  publicationPlacementBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationPlacementEditor");
  const placement = requireOne(store, subject, "placement");
  const placementConfig = publicationPlacementBySubject.get(placement);
  if (!placementConfig) {
    throw new Error(`${subject}.placement must reference an active DataPublicationPlacement, got ${placement}.`);
  }
  if (placementConfig.publication !== expectedPublication) {
    throw new Error(`${subject}.placement must reference a placement for ${expectedPublication}, got ${placementConfig.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    placement,
    surfaceEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "surfaceEdit",
      placement,
      "surface",
      activeEditTargetSubjects,
    ),
    slotEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "slotEdit",
      placement,
      "slot",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationRequirementEditor(
  store,
  subject,
  expectedPublication,
  publicationRequirementBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationRequirementEditor");
  const requirement = requireOne(store, subject, "requirement");
  const requirementConfig = publicationRequirementBySubject.get(requirement);
  if (!requirementConfig) {
    throw new Error(`${subject}.requirement must reference an active DataPublicationRequirement, got ${requirement}.`);
  }
  if (requirementConfig.publication !== expectedPublication) {
    throw new Error(`${subject}.requirement must reference a requirement for ${expectedPublication}, got ${requirementConfig.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    requirement,
    routingPolicyEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "routingPolicyEdit",
      requirement,
      "routingPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationIdentityEditor(
  store,
  subject,
  expectedPublication,
  publicationIdentityBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationIdentityEditor");
  const identity = requireOne(store, subject, "identity");
  const identityConfig = publicationIdentityBySubject.get(identity);
  if (!identityConfig) {
    throw new Error(`${subject}.identity must reference an active DataPublicationIdentity, got ${identity}.`);
  }
  if (identityConfig.publication !== expectedPublication) {
    throw new Error(`${subject}.identity must reference an identity for ${expectedPublication}, got ${identityConfig.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    identity,
    projectKeyEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "projectKeyEdit",
      identity,
      "projectKey",
      activeEditTargetSubjects,
    ),
    navigationLabelEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "navigationLabelEdit",
      identity,
      "navigationLabel",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationNavigationGroupEditor(
  store,
  subject,
  expectedPublication,
  publicationNavigationGroupBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationNavigationGroupEditor");
  const navigationGroup = requireOne(store, subject, "navigationGroup");
  const groupConfig = publicationNavigationGroupBySubject.get(navigationGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.navigationGroup must reference an active DataPublicationNavigationGroup, got ${navigationGroup}.`);
  }
  if (groupConfig.publication !== expectedPublication) {
    throw new Error(`${subject}.navigationGroup must reference a navigation group for ${expectedPublication}, got ${groupConfig.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    navigationGroup,
    groupKeyEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "groupKeyEdit",
      navigationGroup,
      "groupKey",
      activeEditTargetSubjects,
    ),
    labelEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "labelEdit",
      navigationGroup,
      "label",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateConditionEditor(
  store,
  subject,
  expectedPrecedence,
  publicationGateConditionBySubject,
  publicationGateConditionExpressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateConditionEditor");
  const gateCondition = requireOne(store, subject, "gateCondition");
  const conditionConfig = publicationGateConditionBySubject.get(gateCondition);
  if (!conditionConfig) {
    throw new Error(`${subject}.gateCondition must reference an active DataPublicationGateCondition, got ${gateCondition}.`);
  }
  if (conditionConfig.precedence !== expectedPrecedence) {
    throw new Error(`${subject}.gateCondition must reference a gate condition for ${expectedPrecedence}, got ${conditionConfig.precedence}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    gateCondition,
    conditionKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "conditionKindEdit",
      gateCondition,
      "conditionKind",
      activeEditTargetSubjects,
    ),
    logicKindEdit: store.one(subject, "logicKindEdit")
      ? requirePublicationEditorEditTarget(
        store,
        subject,
        "logicKindEdit",
        gateCondition,
        "logicKind",
        activeEditTargetSubjects,
      )
      : "",
    fieldEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "fieldEdit",
      gateCondition,
      "field",
      activeEditTargetSubjects,
    ),
    operatorEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "operatorEdit",
      gateCondition,
      "operator",
      activeEditTargetSubjects,
    ),
    expectedValueEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "expectedValueEdit",
      gateCondition,
      "expectedValue",
      activeEditTargetSubjects,
    ),
    expressionEditors: store.objects(subject, "expressionEditor")
      .map(editor => parsePublicationGateConditionExpressionEditor(
        store,
        editor,
        gateCondition,
        publicationGateConditionExpressionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.expression.localeCompare(b.expression)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateConditionExpressionEditor(
  store,
  subject,
  expectedGateCondition,
  publicationGateConditionExpressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateConditionExpressionEditor");
  const expression = requireOne(store, subject, "expression");
  const expressionConfig = publicationGateConditionExpressionBySubject.get(expression);
  if (!expressionConfig) {
    throw new Error(`${subject}.expression must reference an active DataPublicationGateConditionExpression, got ${expression}.`);
  }
  if (expressionConfig.gateCondition !== expectedGateCondition) {
    throw new Error(`${subject}.expression must reference an expression for ${expectedGateCondition}, got ${expressionConfig.gateCondition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    expression,
    fieldEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "fieldEdit",
      expression,
      "field",
      activeEditTargetSubjects,
    ),
    operatorEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "operatorEdit",
      expression,
      "operator",
      activeEditTargetSubjects,
    ),
    expectedValueEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "expectedValueEdit",
      expression,
      "expectedValue",
      activeEditTargetSubjects,
    ),
    valueKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "valueKindEdit",
      expression,
      "valueKind",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionConditionEditor(
  store,
  subject,
  expectedExpressionSet,
  publicationGateExpressionConditionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateExpressionConditionEditor");
  const condition = requireOne(store, subject, "condition");
  const conditionConfig = publicationGateExpressionConditionBySubject.get(condition);
  if (!conditionConfig) {
    throw new Error(`${subject}.condition must reference an active DataPublicationGateExpressionCondition, got ${condition}.`);
  }
  if (conditionConfig.expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.condition must reference a condition for ${expectedExpressionSet}, got ${conditionConfig.expressionSet}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    condition,
    fieldEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "fieldEdit",
      condition,
      "field",
      activeEditTargetSubjects,
    ),
    operatorEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "operatorEdit",
      condition,
      "operator",
      activeEditTargetSubjects,
    ),
    expectedValueEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "expectedValueEdit",
      condition,
      "expectedValue",
      activeEditTargetSubjects,
    ),
    valueKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "valueKindEdit",
      condition,
      "valueKind",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionConditionGroupEditor(
  store,
  subject,
  expectedExpressionSet,
  publicationGateExpressionConditionGroupBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateExpressionConditionGroupEditor");
  const conditionGroup = requireOne(store, subject, "conditionGroup");
  const groupConfig = publicationGateExpressionConditionGroupBySubject.get(conditionGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.conditionGroup must reference an active DataPublicationGateExpressionConditionGroup, got ${conditionGroup}.`);
  }
  if (groupConfig.expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.conditionGroup must reference a condition group for ${expectedExpressionSet}, got ${groupConfig.expressionSet}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    conditionGroup,
    logicKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "logicKindEdit",
      conditionGroup,
      "logicKind",
      activeEditTargetSubjects,
    ),
    labelEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "labelEdit",
      conditionGroup,
      "label",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateExpressionSetEditor(
  store,
  subject,
  expectedPrecedence,
  publicationGateExpressionSetBySubject,
  publicationGateExpressionConditionGroupBySubject,
  publicationGateExpressionConditionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateExpressionSetEditor");
  const expressionSet = requireOne(store, subject, "expressionSet");
  const expressionSetConfig = publicationGateExpressionSetBySubject.get(expressionSet);
  if (!expressionSetConfig) {
    throw new Error(`${subject}.expressionSet must reference an active DataPublicationGateExpressionSet, got ${expressionSet}.`);
  }
  if (expressionSetConfig.precedence !== expectedPrecedence) {
    throw new Error(`${subject}.expressionSet must reference an expression set for ${expectedPrecedence}, got ${expressionSetConfig.precedence}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    expressionSet,
    conditionGroupEditors: store.objects(subject, "conditionGroupEditor")
      .map(editor => parsePublicationGateExpressionConditionGroupEditor(
        store,
        editor,
        expressionSet,
        publicationGateExpressionConditionGroupBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.conditionGroup.localeCompare(b.conditionGroup)),
    conditionEditors: store.objects(subject, "conditionEditor")
      .map(editor => parsePublicationGateExpressionConditionEditor(
        store,
        editor,
        expressionSet,
        publicationGateExpressionConditionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.condition.localeCompare(b.condition)),
    labelEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "labelEdit",
      expressionSet,
      "label",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGatePrecedenceEditor(
  store,
  subject,
  expectedPublication,
  publicationGatePrecedenceBySubject,
  publicationGateExpressionSetBySubject,
  publicationGateExpressionConditionGroupBySubject,
  publicationGateExpressionConditionBySubject,
  publicationGateConditionGroupBySubject,
  publicationGateConditionBySubject,
  publicationGateConditionExpressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGatePrecedenceEditor");
  const precedence = requireOne(store, subject, "precedence");
  const precedenceConfig = publicationGatePrecedenceBySubject.get(precedence);
  if (!precedenceConfig) {
    throw new Error(`${subject}.precedence must reference an active DataPublicationGatePrecedence, got ${precedence}.`);
  }
  if (precedenceConfig.publication !== expectedPublication) {
    throw new Error(`${subject}.precedence must reference a gate precedence for ${expectedPublication}, got ${precedenceConfig.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    precedence,
    expressionSetEditors: store.objects(subject, "expressionSetEditor")
      .map(editor => parsePublicationGateExpressionSetEditor(
        store,
        editor,
        precedence,
        publicationGateExpressionSetBySubject,
        publicationGateExpressionConditionGroupBySubject,
        publicationGateExpressionConditionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.expressionSet.localeCompare(b.expressionSet)),
    conditionGroupEditors: store.objects(subject, "conditionGroupEditor")
      .map(editor => parsePublicationGateConditionGroupEditor(
        store,
        editor,
        precedence,
        publicationGateConditionGroupBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.conditionGroup.localeCompare(b.conditionGroup)),
    conditionEditors: store.objects(subject, "conditionEditor")
      .map(editor => parsePublicationGateConditionEditor(
        store,
        editor,
        precedence,
        publicationGateConditionBySubject,
        publicationGateConditionExpressionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.gateCondition.localeCompare(b.gateCondition)),
    precedenceRankEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "precedenceRankEdit",
      precedence,
      "precedenceRank",
      activeEditTargetSubjects,
    ),
    fallbackRoutingPolicyEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "fallbackRoutingPolicyEdit",
      precedence,
      "fallbackRoutingPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationGateConditionGroupEditor(
  store,
  subject,
  expectedPrecedence,
  publicationGateConditionGroupBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationGateConditionGroupEditor");
  const conditionGroup = requireOne(store, subject, "conditionGroup");
  const groupConfig = publicationGateConditionGroupBySubject.get(conditionGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.conditionGroup must reference an active DataPublicationGateConditionGroup, got ${conditionGroup}.`);
  }
  if (groupConfig.precedence !== expectedPrecedence) {
    throw new Error(`${subject}.conditionGroup must reference a condition group for ${expectedPrecedence}, got ${groupConfig.precedence}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    conditionGroup,
    logicKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "logicKindEdit",
      conditionGroup,
      "logicKind",
      activeEditTargetSubjects,
    ),
    labelEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "labelEdit",
      conditionGroup,
      "label",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDataPublicationEditor(
  store,
  subject,
  activePublicationSubjects,
  publicationIdentityBySubject,
  publicationNavigationGroupBySubject,
  publicationGatePrecedenceBySubject,
  publicationGateExpressionSetBySubject,
  publicationGateExpressionConditionGroupBySubject,
  publicationGateExpressionConditionBySubject,
  publicationGateConditionGroupBySubject,
  publicationPlacementBySubject,
  publicationRequirementBySubject,
  publicationGateConditionBySubject,
  publicationGateConditionExpressionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPublicationEditor");
  const publication = requireOne(store, subject, "publication");
  requireIsa(store, publication, "DataPublication", `${subject}.publication ${publication}`);
  if (!activePublicationSubjects.has(publication)) {
    throw new Error(`${subject}.publication must reference an active DataSpace publication, got ${publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    publication,
    identityEditors: store.objects(subject, "identityEditor")
      .map(editor => parsePublicationIdentityEditor(
        store,
        editor,
        publication,
        publicationIdentityBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.identity.localeCompare(b.identity)),
    navigationGroupEditors: store.objects(subject, "navigationGroupEditor")
      .map(editor => parsePublicationNavigationGroupEditor(
        store,
        editor,
        publication,
        publicationNavigationGroupBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.navigationGroup.localeCompare(b.navigationGroup)),
    gatePrecedenceEditors: store.objects(subject, "gatePrecedenceEditor")
      .map(editor => parsePublicationGatePrecedenceEditor(
        store,
        editor,
        publication,
        publicationGatePrecedenceBySubject,
        publicationGateExpressionSetBySubject,
        publicationGateExpressionConditionGroupBySubject,
        publicationGateExpressionConditionBySubject,
        publicationGateConditionGroupBySubject,
        publicationGateConditionBySubject,
        publicationGateConditionExpressionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.precedence.localeCompare(b.precedence)),
    placementEditors: store.objects(subject, "placementEditor")
      .map(editor => parsePublicationPlacementEditor(
        store,
        editor,
        publication,
        publicationPlacementBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.placement.localeCompare(b.placement)),
    requirementEditors: store.objects(subject, "requirementEditor")
      .map(editor => parsePublicationRequirementEditor(
        store,
        editor,
        publication,
        publicationRequirementBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.requirement.localeCompare(b.requirement)),
    titleEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "titleEdit",
      publication,
      "title",
      activeEditTargetSubjects,
    ),
    publicationKindEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "publicationKindEdit",
      publication,
      "publicationKind",
      activeEditTargetSubjects,
    ),
    stateEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "stateEdit",
      publication,
      "state",
      activeEditTargetSubjects,
    ),
    modeNoteEdit: store.one(subject, "modeNoteEdit")
      ? requirePublicationEditorEditTarget(
        store,
        subject,
        "modeNoteEdit",
        publication,
        "modeNote",
        activeEditTargetSubjects,
      )
      : "",
    plaintextPolicyEdit: requirePublicationEditorEditTarget(
      store,
      subject,
      "plaintextPolicyEdit",
      publication,
      "plaintextPolicy",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireTrustedBridgeEditorEditTarget(
  store,
  subject,
  slot,
  target,
  predicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const editTargetTarget = requireOne(store, editTarget, "target", `${editTarget}.target`);
  if (editTargetTarget !== target) {
    throw new Error(`${subject}.${slot} must target ${target}, got ${editTargetTarget}.`);
  }
  const editTargetPredicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (editTargetPredicate !== predicate) {
    throw new Error(`${subject}.${slot} must edit predicate ${predicate}, got ${editTargetPredicate}.`);
  }
  return editTarget;
}

export function parseTrustedBridgePolicyRuleCreator(
  store,
  subject,
  expectedPolicy,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyRuleCreator");
  const policy = requireOne(store, subject, "policy");
  requireIsa(store, policy, "DataTrustedBridgeFamilyPolicy", `${subject}.policy ${policy}`);
  if (policy !== expectedPolicy) {
    throw new Error(`${subject}.policy must reference ${expectedPolicy}, got ${policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    policy,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionGroupCreator(
  store,
  subject,
  expectedRule,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionGroupCreator");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataTrustedBridgePolicyRule", `${subject}.rule ${rule}`);
  if (rule !== expectedRule) {
    throw new Error(`${subject}.rule must reference ${expectedRule}, got ${rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    defaultLogicKind: requireOptionalAllowedValue(
      subject,
      "defaultLogicKind",
      requireOne(store, subject, "defaultLogicKind"),
      TRUSTED_BRIDGE_POLICY_GROUP_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionCreator(
  store,
  subject,
  expectedRule,
  expectedConditionGroup,
  trustedBridgePolicyConditionGroupBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionCreator");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataTrustedBridgePolicyRule", `${subject}.rule ${rule}`);
  if (rule !== expectedRule) {
    throw new Error(`${subject}.rule must reference ${expectedRule}, got ${rule}.`);
  }
  const conditionGroup = store.one(subject, "conditionGroup") || "";
  if (expectedConditionGroup) {
    if (!conditionGroup) {
      throw new Error(`${subject}.conditionGroup must reference ${expectedConditionGroup}.`);
    }
    const groupConfig = trustedBridgePolicyConditionGroupBySubject.get(conditionGroup);
    if (!groupConfig) {
      throw new Error(`${subject}.conditionGroup must reference an active DataTrustedBridgePolicyConditionGroup, got ${conditionGroup}.`);
    }
    if (conditionGroup !== expectedConditionGroup) {
      throw new Error(`${subject}.conditionGroup must reference ${expectedConditionGroup}, got ${conditionGroup}.`);
    }
  } else if (conditionGroup) {
    throw new Error(`${subject}.conditionGroup must be omitted for rule-scoped trusted bridge condition creators, got ${conditionGroup}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    conditionGroup,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionParameterCreator(
  store,
  subject,
  expectedCondition,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionParameterCreator");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgePolicyCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    condition,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    defaultParameterKind: requireOptionalAllowedValue(
      subject,
      "defaultParameterKind",
      requireOne(store, subject, "defaultParameterKind"),
      TRUSTED_BRIDGE_POLICY_PARAMETER_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionParameterBundle(
  store,
  subject,
  expectedCondition,
  trustedBridgePolicyConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionParameterBundle");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgePolicyCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    condition,
    parameterEditors: store.objects(subject, "parameterEditor")
      .map(editor => parseTrustedBridgePolicyConditionParameterEditor(
        store,
        editor,
        condition,
        trustedBridgePolicyConditionParameterBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.parameter.localeCompare(b.parameter)),
    parameterCreators: store.objects(subject, "parameterCreator")
      .map(creator => parseTrustedBridgePolicyConditionParameterCreator(
        store,
        creator,
        condition,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionGroupCreator(
  store,
  subject,
  expectedExpressionSet,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionGroupCreator");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataTrustedBridgeExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    expressionSet,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    defaultLogicKind: requireOptionalAllowedValue(
      subject,
      "defaultLogicKind",
      requireOne(store, subject, "defaultLogicKind"),
      TRUSTED_BRIDGE_POLICY_GROUP_LOGIC_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionCreator(
  store,
  subject,
  expectedExpressionSet,
  expectedConditionGroup,
  trustedBridgeExpressionConditionGroupBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionCreator");
  const expressionSet = requireOne(store, subject, "expressionSet");
  requireIsa(store, expressionSet, "DataTrustedBridgeExpressionSet", `${subject}.expressionSet ${expressionSet}`);
  if (expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.expressionSet must reference ${expectedExpressionSet}, got ${expressionSet}.`);
  }
  const conditionGroup = requireOne(store, subject, "conditionGroup");
  const groupConfig = trustedBridgeExpressionConditionGroupBySubject.get(conditionGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.conditionGroup must reference an active DataTrustedBridgeExpressionConditionGroup, got ${conditionGroup}.`);
  }
  if (conditionGroup !== expectedConditionGroup) {
    throw new Error(`${subject}.conditionGroup must reference ${expectedConditionGroup}, got ${conditionGroup}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    expressionSet,
    conditionGroup,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionParameterCreator(
  store,
  subject,
  expectedCondition,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionParameterCreator");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgeExpressionCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    condition,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    defaultParameterKind: requireOptionalAllowedValue(
      subject,
      "defaultParameterKind",
      requireOne(store, subject, "defaultParameterKind"),
      TRUSTED_BRIDGE_POLICY_PARAMETER_KIND_VALUES,
    ),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionParameterBundle(
  store,
  subject,
  expectedCondition,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionParameterBundle");
  const condition = requireOne(store, subject, "condition");
  requireIsa(store, condition, "DataTrustedBridgeExpressionCondition", `${subject}.condition ${condition}`);
  if (condition !== expectedCondition) {
    throw new Error(`${subject}.condition must reference ${expectedCondition}, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    condition,
    parameterEditors: store.objects(subject, "parameterEditor")
      .map(editor => parseTrustedBridgeExpressionConditionParameterEditor(
        store,
        editor,
        condition,
        trustedBridgeExpressionConditionParameterBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.parameter.localeCompare(b.parameter)),
    parameterCreators: store.objects(subject, "parameterCreator")
      .map(creator => parseTrustedBridgeExpressionConditionParameterCreator(
        store,
        creator,
        condition,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionSetCreator(
  store,
  subject,
  expectedRule,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionSetCreator");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataTrustedBridgePolicyRule", `${subject}.rule ${rule}`);
  if (rule !== expectedRule) {
    throw new Error(`${subject}.rule must reference ${expectedRule}, got ${rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    subjectPrefix: requireOne(store, subject, "subjectPrefix"),
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeCreatorSubjectPlan(
  store,
  subject,
  expectedPlan,
  allowedCreatorsBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeCreatorSubjectPlan");
  const plan = requireOne(store, subject, "plan");
  requireIsa(store, plan, "DataTrustedBridgeMutationPlan", `${subject}.plan ${plan}`);
  if (plan !== expectedPlan) {
    throw new Error(`${subject}.plan must reference ${expectedPlan}, got ${plan}.`);
  }
  const creator = requireOne(store, subject, "creator");
  const creatorConfig = allowedCreatorsBySubject.get(creator);
  if (!creatorConfig) {
    throw new Error(`${subject}.creator must reference a trusted bridge creator declared by ${expectedPlan}, got ${creator}.`);
  }
  const plannedSubject = requireOne(store, subject, "plannedSubject");
  if (!plannedSubject.startsWith(creatorConfig.subjectPrefix)) {
    throw new Error(
      `${subject}.plannedSubject must start with ${creatorConfig.subjectPrefix}, got ${plannedSubject}.`,
    );
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    plan,
    creator,
    plannedSubject,
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeRemovalAction(
  store,
  subject,
  expectedPlan,
  allowedRemovalTargetsBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeRemovalAction");
  const plan = requireOne(store, subject, "plan");
  requireIsa(store, plan, "DataTrustedBridgeMutationPlan", `${subject}.plan ${plan}`);
  if (plan !== expectedPlan) {
    throw new Error(`${subject}.plan must reference ${expectedPlan}, got ${plan}.`);
  }
  const target = requireOne(store, subject, "target");
  const expectedTargetKind = allowedRemovalTargetsBySubject.get(target);
  if (!expectedTargetKind) {
    throw new Error(`${subject}.target must reference a trusted bridge subject declared by ${expectedPlan}, got ${target}.`);
  }
  const targetKind = requireOptionalAllowedValue(
    subject,
    "targetKind",
    requireOne(store, subject, "targetKind"),
    TRUSTED_BRIDGE_REMOVAL_TARGET_KIND_VALUES,
  );
  if (targetKind !== expectedTargetKind) {
    throw new Error(`${subject}.targetKind must be ${expectedTargetKind} for ${target}, got ${targetKind}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    plan,
    target,
    targetKind,
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeMutationStep(
  store,
  subject,
  expectedPlan,
  creatorSubjectPlanBySubject,
  removalActionBySubject,
  allowedOrderEditSubjects,
  allowedParameterBundleSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeMutationStep");
  const plan = requireOne(store, subject, "plan");
  requireIsa(store, plan, "DataTrustedBridgeMutationPlan", `${subject}.plan ${plan}`);
  if (plan !== expectedPlan) {
    throw new Error(`${subject}.plan must reference ${expectedPlan}, got ${plan}.`);
  }
  const stepKind = requireOptionalAllowedValue(
    subject,
    "stepKind",
    requireOne(store, subject, "stepKind"),
    TRUSTED_BRIDGE_MUTATION_STEP_KIND_VALUES,
  );
  const creatorSubjectPlan = store.one(subject, "creatorSubjectPlan") || "";
  const removalAction = store.one(subject, "removalAction") || "";
  const orderEdit = store.one(subject, "orderEdit") || "";
  const parameterBundle = store.one(subject, "parameterBundle") || "";

  if (creatorSubjectPlan && !creatorSubjectPlanBySubject.has(creatorSubjectPlan)) {
    throw new Error(`${subject}.creatorSubjectPlan must reference one of the creator subject plans declared by ${expectedPlan}, got ${creatorSubjectPlan}.`);
  }
  if (removalAction && !removalActionBySubject.has(removalAction)) {
    throw new Error(`${subject}.removalAction must reference one of the removal actions declared by ${expectedPlan}, got ${removalAction}.`);
  }
  if (orderEdit && !allowedOrderEditSubjects.has(orderEdit)) {
    throw new Error(`${subject}.orderEdit must reference an order edit declared by ${expectedPlan}, got ${orderEdit}.`);
  }
  if (parameterBundle && !allowedParameterBundleSubjects.has(parameterBundle)) {
    throw new Error(`${subject}.parameterBundle must reference a trusted bridge parameter bundle declared by ${expectedPlan}, got ${parameterBundle}.`);
  }

  const populatedBindings = [creatorSubjectPlan, removalAction, orderEdit, parameterBundle].filter(Boolean);
  if (populatedBindings.length !== 1) {
    throw new Error(`${subject} must declare exactly one mutation binding across creatorSubjectPlan, removalAction, orderEdit, and parameterBundle.`);
  }
  if (stepKind === "create" && !creatorSubjectPlan) {
    throw new Error(`${subject}.creatorSubjectPlan is required when stepKind is create.`);
  }
  if (stepKind === "remove" && !removalAction) {
    throw new Error(`${subject}.removalAction is required when stepKind is remove.`);
  }
  if (stepKind === "reorder" && !orderEdit) {
    throw new Error(`${subject}.orderEdit is required when stepKind is reorder.`);
  }
  if (stepKind === "bundleSync" && !parameterBundle) {
    throw new Error(`${subject}.parameterBundle is required when stepKind is bundleSync.`);
  }
  if (stepKind !== "create" && creatorSubjectPlan) {
    throw new Error(`${subject}.creatorSubjectPlan must be omitted when stepKind is ${stepKind}.`);
  }
  if (stepKind !== "remove" && removalAction) {
    throw new Error(`${subject}.removalAction must be omitted when stepKind is ${stepKind}.`);
  }
  if (stepKind !== "reorder" && orderEdit) {
    throw new Error(`${subject}.orderEdit must be omitted when stepKind is ${stepKind}.`);
  }
  if (stepKind !== "bundleSync" && parameterBundle) {
    throw new Error(`${subject}.parameterBundle must be omitted when stepKind is ${stepKind}.`);
  }
  return {
    subject,
    plan,
    stepKind,
    creatorSubjectPlan,
    removalAction,
    orderEdit,
    parameterBundle,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeMutationPlan(
  store,
  subject,
  expectedEditor,
  allowedCreatorsBySubject,
  allowedRemovalTargetsBySubject,
  allowedOrderEditSubjects,
  allowedParameterBundleSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeMutationPlan");
  const editor = requireOne(store, subject, "editor");
  requireKnownSubject(store, editor, `${subject}.editor`);
  if (editor !== expectedEditor) {
    throw new Error(`${subject}.editor must reference ${expectedEditor}, got ${editor}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const creatorSubjectPlans = store.objects(subject, "creatorSubjectPlan")
    .map(planSubject => parseTrustedBridgeCreatorSubjectPlan(
      store,
      planSubject,
      subject,
      allowedCreatorsBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const creatorSubjectPlanBySubject = new Map(creatorSubjectPlans.map(planConfig => [planConfig.subject, planConfig]));
  const removalActions = store.objects(subject, "removalAction")
    .map(removalSubject => parseTrustedBridgeRemovalAction(
      store,
      removalSubject,
      subject,
      allowedRemovalTargetsBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const removalActionBySubject = new Map(removalActions.map(removalConfig => [removalConfig.subject, removalConfig]));
  const steps = store.objects(subject, "step")
    .map(stepSubject => parseTrustedBridgeMutationStep(
      store,
      stepSubject,
      subject,
      creatorSubjectPlanBySubject,
      removalActionBySubject,
      allowedOrderEditSubjects,
      allowedParameterBundleSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  if (!steps.length) {
    throw new Error(`${subject}.step must reference at least one explicit trusted bridge mutation step.`);
  }
  return {
    subject,
    editor,
    creatorSubjectPlans,
    removalActions,
    steps,
    label: store.one(subject, "label") || "",
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionParameterEditor(
  store,
  subject,
  expectedCondition,
  trustedBridgePolicyConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionParameterEditor");
  const parameter = requireOne(store, subject, "parameter");
  const parameterConfig = trustedBridgePolicyConditionParameterBySubject.get(parameter);
  if (!parameterConfig) {
    throw new Error(`${subject}.parameter must reference an active DataTrustedBridgePolicyConditionParameter, got ${parameter}.`);
  }
  if (parameterConfig.condition !== expectedCondition) {
    throw new Error(`${subject}.parameter must reference a parameter for ${expectedCondition}, got ${parameterConfig.condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    parameter,
    parameterKindEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "parameterKindEdit",
      parameter,
      "parameterKind",
      activeEditTargetSubjects,
    ),
    valueEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "valueEdit",
      parameter,
      "value",
      activeEditTargetSubjects,
    ),
    orderEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "orderEdit",
      parameter,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionParameterEditor(
  store,
  subject,
  expectedCondition,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionParameterEditor");
  const parameter = requireOne(store, subject, "parameter");
  const parameterConfig = trustedBridgeExpressionConditionParameterBySubject.get(parameter);
  if (!parameterConfig) {
    throw new Error(`${subject}.parameter must reference an active DataTrustedBridgeExpressionConditionParameter, got ${parameter}.`);
  }
  if (parameterConfig.condition !== expectedCondition) {
    throw new Error(`${subject}.parameter must reference a parameter for ${expectedCondition}, got ${parameterConfig.condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    parameter,
    parameterKindEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "parameterKindEdit",
      parameter,
      "parameterKind",
      activeEditTargetSubjects,
    ),
    valueEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "valueEdit",
      parameter,
      "value",
      activeEditTargetSubjects,
    ),
    orderEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "orderEdit",
      parameter,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionEditor(
  store,
  subject,
  expectedRule,
  allowedConditionSubjects,
  trustedBridgePolicyConditionBySubject,
  trustedBridgePolicyConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionEditor");
  const condition = requireOne(store, subject, "condition");
  const conditionConfig = trustedBridgePolicyConditionBySubject.get(condition);
  if (!conditionConfig) {
    throw new Error(`${subject}.condition must reference an active DataTrustedBridgePolicyCondition, got ${condition}.`);
  }
  if (conditionConfig.rule !== expectedRule) {
    throw new Error(`${subject}.condition must reference a condition for ${expectedRule}, got ${conditionConfig.rule}.`);
  }
  if (allowedConditionSubjects && !allowedConditionSubjects.has(condition)) {
    throw new Error(`${subject}.condition must reference one of the trusted bridge conditions declared for this editor scope, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const parameterBundles = store.objects(subject, "parameterBundle")
    .map(bundle => parseTrustedBridgePolicyConditionParameterBundle(
      store,
      bundle,
      condition,
      trustedBridgePolicyConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const parameterEditors = store.objects(subject, "parameterEditor")
    .map(editor => parseTrustedBridgePolicyConditionParameterEditor(
      store,
      editor,
      condition,
      trustedBridgePolicyConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.parameter.localeCompare(b.parameter));
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    condition,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(
    parameterBundles.flatMap(bundle => bundle.parameterCreators.map(creator => [creator.subject, creator])),
  );
  const allowedRemovalTargetsBySubject = new Map(
    [...parameterEditors, ...parameterBundles.flatMap(bundle => bundle.parameterEditors)]
      .map(editor => [editor.parameter, "parameter"]),
  );
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...parameterEditors.map(editor => editor.orderEdit),
    ...parameterBundles.flatMap(bundle => bundle.parameterEditors.map(editor => editor.orderEdit)),
  ]);
  const allowedParameterBundleSubjects = new Set(parameterBundles.map(bundle => bundle.subject));
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      allowedParameterBundleSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    condition,
    signalKindEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "signalKindEdit",
      condition,
      "signalKind",
      activeEditTargetSubjects,
    ),
    operatorEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "operatorEdit",
      condition,
      "operator",
      activeEditTargetSubjects,
    ),
    expectedValueEdit: store.one(subject, "expectedValueEdit")
      ? requireTrustedBridgeEditorEditTarget(
        store,
        subject,
        "expectedValueEdit",
        condition,
        "expectedValue",
        activeEditTargetSubjects,
      )
      : "",
    parameterBundles,
    parameterEditors,
    mutationPlans,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionEditor(
  store,
  subject,
  expectedExpressionSet,
  allowedConditionSubjects,
  trustedBridgeExpressionConditionBySubject,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionEditor");
  const condition = requireOne(store, subject, "condition");
  const conditionConfig = trustedBridgeExpressionConditionBySubject.get(condition);
  if (!conditionConfig) {
    throw new Error(`${subject}.condition must reference an active DataTrustedBridgeExpressionCondition, got ${condition}.`);
  }
  if (conditionConfig.expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.condition must reference a condition for ${expectedExpressionSet}, got ${conditionConfig.expressionSet}.`);
  }
  if (allowedConditionSubjects && !allowedConditionSubjects.has(condition)) {
    throw new Error(`${subject}.condition must reference one of the trusted bridge expression conditions declared for this editor scope, got ${condition}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const parameterBundles = store.objects(subject, "parameterBundle")
    .map(bundle => parseTrustedBridgeExpressionConditionParameterBundle(
      store,
      bundle,
      condition,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const parameterEditors = store.objects(subject, "parameterEditor")
    .map(editor => parseTrustedBridgeExpressionConditionParameterEditor(
      store,
      editor,
      condition,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.parameter.localeCompare(b.parameter));
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    condition,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(
    parameterBundles.flatMap(bundle => bundle.parameterCreators.map(creator => [creator.subject, creator])),
  );
  const allowedRemovalTargetsBySubject = new Map(
    [...parameterEditors, ...parameterBundles.flatMap(bundle => bundle.parameterEditors)]
      .map(editor => [editor.parameter, "parameter"]),
  );
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...parameterEditors.map(editor => editor.orderEdit),
    ...parameterBundles.flatMap(bundle => bundle.parameterEditors.map(editor => editor.orderEdit)),
  ]);
  const allowedParameterBundleSubjects = new Set(parameterBundles.map(bundle => bundle.subject));
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      allowedParameterBundleSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    condition,
    signalKindEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "signalKindEdit",
      condition,
      "signalKind",
      activeEditTargetSubjects,
    ),
    operatorEdit: requireTrustedBridgeEditorEditTarget(
      store,
      subject,
      "operatorEdit",
      condition,
      "operator",
      activeEditTargetSubjects,
    ),
    expectedValueEdit: store.one(subject, "expectedValueEdit")
      ? requireTrustedBridgeEditorEditTarget(
        store,
        subject,
        "expectedValueEdit",
        condition,
        "expectedValue",
        activeEditTargetSubjects,
      )
      : "",
    parameterBundles,
    parameterEditors,
    mutationPlans,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyConditionGroupEditor(
  store,
  subject,
  expectedRule,
  trustedBridgePolicyConditionGroupBySubject,
  trustedBridgePolicyConditionBySubject,
  trustedBridgePolicyConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyConditionGroupEditor");
  const conditionGroup = requireOne(store, subject, "conditionGroup");
  const groupConfig = trustedBridgePolicyConditionGroupBySubject.get(conditionGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.conditionGroup must reference an active DataTrustedBridgePolicyConditionGroup, got ${conditionGroup}.`);
  }
  if (groupConfig.rule !== expectedRule) {
    throw new Error(`${subject}.conditionGroup must reference a condition group for ${expectedRule}, got ${groupConfig.rule}.`);
  }
  const allowedConditionSubjects = new Set((groupConfig.conditions || []).map(condition => condition.subject));
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const conditionCreators = store.objects(subject, "conditionCreator")
    .map(creator => parseTrustedBridgePolicyConditionCreator(
      store,
      creator,
      expectedRule,
      conditionGroup,
      trustedBridgePolicyConditionGroupBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionEditors = store.objects(subject, "conditionEditor")
    .map(editor => parseTrustedBridgePolicyConditionEditor(
      store,
      editor,
      expectedRule,
      allowedConditionSubjects,
      trustedBridgePolicyConditionBySubject,
      trustedBridgePolicyConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.condition.localeCompare(b.condition));
  const logicKindEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "logicKindEdit",
    conditionGroup,
    "logicKind",
    activeEditTargetSubjects,
  );
  const labelEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "labelEdit",
    conditionGroup,
    "label",
    activeEditTargetSubjects,
  );
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    conditionGroup,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(conditionCreators.map(creator => [creator.subject, creator]));
  const allowedRemovalTargetsBySubject = new Map(conditionEditors.map(editor => [editor.condition, "condition"]));
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...conditionEditors.map(editor => editor.orderEdit),
  ]);
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      new Set(),
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    conditionGroup,
    conditionCreators,
    conditionEditors,
    mutationPlans,
    logicKindEdit,
    labelEdit,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionConditionGroupEditor(
  store,
  subject,
  expectedExpressionSet,
  trustedBridgeExpressionConditionGroupBySubject,
  trustedBridgeExpressionConditionBySubject,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionConditionGroupEditor");
  const conditionGroup = requireOne(store, subject, "conditionGroup");
  const groupConfig = trustedBridgeExpressionConditionGroupBySubject.get(conditionGroup);
  if (!groupConfig) {
    throw new Error(`${subject}.conditionGroup must reference an active DataTrustedBridgeExpressionConditionGroup, got ${conditionGroup}.`);
  }
  if (groupConfig.expressionSet !== expectedExpressionSet) {
    throw new Error(`${subject}.conditionGroup must reference a condition group for ${expectedExpressionSet}, got ${groupConfig.expressionSet}.`);
  }
  const allowedConditionSubjects = new Set((groupConfig.conditions || []).map(condition => condition.subject));
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const conditionCreators = store.objects(subject, "conditionCreator")
    .map(creator => parseTrustedBridgeExpressionConditionCreator(
      store,
      creator,
      expectedExpressionSet,
      conditionGroup,
      trustedBridgeExpressionConditionGroupBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionEditors = store.objects(subject, "conditionEditor")
    .map(editor => parseTrustedBridgeExpressionConditionEditor(
      store,
      editor,
      expectedExpressionSet,
      allowedConditionSubjects,
      trustedBridgeExpressionConditionBySubject,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.condition.localeCompare(b.condition));
  const logicKindEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "logicKindEdit",
    conditionGroup,
    "logicKind",
    activeEditTargetSubjects,
  );
  const labelEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "labelEdit",
    conditionGroup,
    "label",
    activeEditTargetSubjects,
  );
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    conditionGroup,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(conditionCreators.map(creator => [creator.subject, creator]));
  const allowedRemovalTargetsBySubject = new Map(conditionEditors.map(editor => [editor.condition, "condition"]));
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...conditionEditors.map(editor => editor.orderEdit),
  ]);
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      new Set(),
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    conditionGroup,
    conditionCreators,
    conditionEditors,
    mutationPlans,
    logicKindEdit,
    labelEdit,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeExpressionSetEditor(
  store,
  subject,
  trustedBridgeExpressionSetBySubject,
  trustedBridgeExpressionConditionGroupBySubject,
  trustedBridgeExpressionConditionBySubject,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeExpressionSetEditor");
  const expressionSet = requireOne(store, subject, "expressionSet");
  const expressionSetConfig = trustedBridgeExpressionSetBySubject.get(expressionSet);
  if (!expressionSetConfig) {
    throw new Error(`${subject}.expressionSet must reference an active DataTrustedBridgeExpressionSet, got ${expressionSet}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const conditionGroupCreators = store.objects(subject, "conditionGroupCreator")
    .map(creator => parseTrustedBridgeExpressionConditionGroupCreator(
      store,
      creator,
      expressionSet,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionGroupEditors = store.objects(subject, "conditionGroupEditor")
    .map(editor => parseTrustedBridgeExpressionConditionGroupEditor(
      store,
      editor,
      expressionSet,
      trustedBridgeExpressionConditionGroupBySubject,
      trustedBridgeExpressionConditionBySubject,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.conditionGroup.localeCompare(b.conditionGroup));
  const labelEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "labelEdit",
    expressionSet,
    "label",
    activeEditTargetSubjects,
  );
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    expressionSet,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(conditionGroupCreators.map(creator => [creator.subject, creator]));
  const allowedRemovalTargetsBySubject = new Map(conditionGroupEditors.map(editor => [editor.conditionGroup, "conditionGroup"]));
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...conditionGroupEditors.map(editor => editor.orderEdit),
  ]);
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      new Set(),
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    expressionSet,
    conditionGroupCreators,
    conditionGroupEditors,
    mutationPlans,
    labelEdit,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgePolicyRuleEditor(
  store,
  subject,
  expectedPolicy,
  trustedBridgePolicyRuleBySubject,
  trustedBridgePolicyConditionGroupBySubject,
  trustedBridgePolicyConditionBySubject,
  trustedBridgePolicyConditionParameterBySubject,
  trustedBridgeExpressionSetBySubject,
  trustedBridgeExpressionConditionGroupBySubject,
  trustedBridgeExpressionConditionBySubject,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgePolicyRuleEditor");
  const rule = requireOne(store, subject, "rule");
  const ruleConfig = trustedBridgePolicyRuleBySubject.get(rule);
  if (!ruleConfig) {
    throw new Error(`${subject}.rule must reference an active DataTrustedBridgePolicyRule, got ${rule}.`);
  }
  if (ruleConfig.policy !== expectedPolicy) {
    throw new Error(`${subject}.rule must reference a rule for ${expectedPolicy}, got ${ruleConfig.policy}.`);
  }
  const directConditionSubjects = new Set((ruleConfig.conditions || []).map(condition => condition.subject));
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const conditionGroupCreators = store.objects(subject, "conditionGroupCreator")
    .map(creator => parseTrustedBridgePolicyConditionGroupCreator(
      store,
      creator,
      rule,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionCreators = store.objects(subject, "conditionCreator")
    .map(creator => parseTrustedBridgePolicyConditionCreator(
      store,
      creator,
      rule,
      "",
      trustedBridgePolicyConditionGroupBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const conditionGroupEditors = store.objects(subject, "conditionGroupEditor")
    .map(editor => parseTrustedBridgePolicyConditionGroupEditor(
      store,
      editor,
      rule,
      trustedBridgePolicyConditionGroupBySubject,
      trustedBridgePolicyConditionBySubject,
      trustedBridgePolicyConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.conditionGroup.localeCompare(b.conditionGroup));
  const conditionEditors = store.objects(subject, "conditionEditor")
    .map(editor => parseTrustedBridgePolicyConditionEditor(
      store,
      editor,
      rule,
      directConditionSubjects,
      trustedBridgePolicyConditionBySubject,
      trustedBridgePolicyConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.condition.localeCompare(b.condition));
  const expressionSetEditors = store.objects(subject, "expressionSetEditor")
    .map(editor => parseTrustedBridgeExpressionSetEditor(
      store,
      editor,
      trustedBridgeExpressionSetBySubject,
      trustedBridgeExpressionConditionGroupBySubject,
      trustedBridgeExpressionConditionBySubject,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .map(editorConfig => {
      if (!(ruleConfig.expressionSets || []).some(expressionSetConfig => expressionSetConfig.subject === editorConfig.expressionSet)) {
        throw new Error(`${subject}.expressionSetEditor must reference an expression set editor for ${rule}, got ${editorConfig.expressionSet}.`);
      }
      return editorConfig;
    })
    .sort((a, b) => a.order - b.order || a.expressionSet.localeCompare(b.expressionSet));
  const expressionSetCreators = store.objects(subject, "expressionSetCreator")
    .map(creator => parseTrustedBridgeExpressionSetCreator(
      store,
      creator,
      rule,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const labelEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "labelEdit",
    rule,
    "label",
    activeEditTargetSubjects,
  );
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    rule,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map([
    ...conditionGroupCreators.map(creator => [creator.subject, creator]),
    ...conditionCreators.map(creator => [creator.subject, creator]),
    ...expressionSetCreators.map(creator => [creator.subject, creator]),
  ]);
  const allowedRemovalTargetsBySubject = new Map([
    ...conditionGroupEditors.map(editor => [editor.conditionGroup, "conditionGroup"]),
    ...conditionEditors.map(editor => [editor.condition, "condition"]),
    ...expressionSetEditors.map(editor => [editor.expressionSet, "expressionSet"]),
  ]);
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...conditionGroupEditors.map(editor => editor.orderEdit),
    ...conditionEditors.map(editor => editor.orderEdit),
    ...expressionSetEditors.map(editor => editor.orderEdit),
  ]);
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      new Set(),
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    rule,
    conditionGroupCreators,
    conditionCreators,
    conditionGroupEditors,
    conditionEditors,
    expressionSetEditors,
    expressionSetCreators,
    mutationPlans,
    labelEdit,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseTrustedBridgeFamilyPolicyEditor(
  store,
  subject,
  trustedBridgeFamilyPolicyBySubject,
  trustedBridgePolicyRuleBySubject,
  trustedBridgePolicyConditionGroupBySubject,
  trustedBridgePolicyConditionBySubject,
  trustedBridgePolicyConditionParameterBySubject,
  trustedBridgeExpressionSetBySubject,
  trustedBridgeExpressionConditionGroupBySubject,
  trustedBridgeExpressionConditionBySubject,
  trustedBridgeExpressionConditionParameterBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataTrustedBridgeFamilyPolicyEditor");
  const policy = requireOne(store, subject, "policy");
  const policyConfig = trustedBridgeFamilyPolicyBySubject.get(policy);
  if (!policyConfig) {
    throw new Error(`${subject}.policy must reference an active DataTrustedBridgeFamilyPolicy, got ${policy}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const ruleCreators = store.objects(subject, "ruleCreator")
    .map(creator => parseTrustedBridgePolicyRuleCreator(
      store,
      creator,
      policy,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const ruleEditors = store.objects(subject, "ruleEditor")
    .map(editor => parseTrustedBridgePolicyRuleEditor(
      store,
      editor,
      policy,
      trustedBridgePolicyRuleBySubject,
      trustedBridgePolicyConditionGroupBySubject,
      trustedBridgePolicyConditionBySubject,
      trustedBridgePolicyConditionParameterBySubject,
      trustedBridgeExpressionSetBySubject,
      trustedBridgeExpressionConditionGroupBySubject,
      trustedBridgeExpressionConditionBySubject,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.rule.localeCompare(b.rule));
  const labelEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "labelEdit",
    policy,
    "label",
    activeEditTargetSubjects,
  );
  const orderEdit = requireTrustedBridgeEditorEditTarget(
    store,
    subject,
    "orderEdit",
    policy,
    "order",
    activeEditTargetSubjects,
  );
  const allowedCreatorsBySubject = new Map(ruleCreators.map(creator => [creator.subject, creator]));
  const allowedRemovalTargetsBySubject = new Map(ruleEditors.map(editor => [editor.rule, "rule"]));
  const allowedOrderEditSubjects = new Set([
    orderEdit,
    ...ruleEditors.map(editor => editor.orderEdit),
  ]);
  const mutationPlans = store.objects(subject, "mutationPlan")
    .map(plan => parseTrustedBridgeMutationPlan(
      store,
      plan,
      subject,
      allowedCreatorsBySubject,
      allowedRemovalTargetsBySubject,
      allowedOrderEditSubjects,
      new Set(),
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  return {
    subject,
    policy,
    ruleCreators,
    ruleEditors,
    mutationPlans,
    labelEdit,
    orderEdit,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function transformModeEditorEditTargets(editor) {
  return new Set([
    editor.labelEdit,
    editor.expressionEdit,
    editor.stateEdit,
    ...editor.parameterEditors.flatMap(parameterEditor => [
      parameterEditor.valueEdit,
      ...(parameterEditor.optionEditors || []).flatMap(optionEditor => [
        optionEditor.valueEdit,
        optionEditor.labelEdit,
        optionEditor.orderEdit,
        optionEditor.stateEdit,
      ]),
    ]),
    ...editor.inputEditors.flatMap(inputEditor => [
      inputEditor.fieldEdit,
      ...(inputEditor.sourceEditors || []).flatMap(sourceEditor => [
        sourceEditor.assetEdit,
        sourceEditor.fieldEdit,
      ]),
    ]),
  ].filter(Boolean));
}

export function publicationModeEditorEditTargets(editor) {
  return new Set([
    editor.titleEdit,
    editor.publicationKindEdit,
    editor.stateEdit,
    editor.modeNoteEdit,
    editor.plaintextPolicyEdit,
    ...editor.identityEditors.flatMap(identityEditor => [
      identityEditor.projectKeyEdit,
      identityEditor.navigationLabelEdit,
    ]),
    ...editor.navigationGroupEditors.flatMap(groupEditor => [
      groupEditor.groupKeyEdit,
      groupEditor.labelEdit,
    ]),
    ...editor.placementEditors.flatMap(placementEditor => [
      placementEditor.surfaceEdit,
      placementEditor.slotEdit,
    ]),
    ...editor.requirementEditors.flatMap(requirementEditor => [
      requirementEditor.routingPolicyEdit,
    ]),
    ...editor.gatePrecedenceEditors.flatMap(precedenceEditor => [
      precedenceEditor.precedenceRankEdit,
      precedenceEditor.fallbackRoutingPolicyEdit,
      ...(precedenceEditor.conditionGroupEditors || []).flatMap(groupEditor => [
        groupEditor.logicKindEdit,
        groupEditor.labelEdit,
      ]),
      ...(precedenceEditor.conditionEditors || []).flatMap(conditionEditor => [
        conditionEditor.conditionKindEdit,
        conditionEditor.logicKindEdit,
        conditionEditor.fieldEdit,
        conditionEditor.operatorEdit,
        conditionEditor.expectedValueEdit,
        ...(conditionEditor.expressionEditors || []).flatMap(expressionEditor => [
          expressionEditor.fieldEdit,
          expressionEditor.operatorEdit,
          expressionEditor.expectedValueEdit,
          expressionEditor.valueKindEdit,
        ]),
      ]),
    ]),
  ].filter(Boolean));
}

export function parseModeEditorSelectOption(store, subject, expectedConfig) {
  requireIsa(store, subject, "DataModeEditorSelectOption");
  const config = requireOne(store, subject, "config");
  if (config !== expectedConfig) {
    throw new Error(`${subject}.config must reference ${expectedConfig}, got ${config}.`);
  }
  return {
    subject,
    config,
    value: requireOne(store, subject, "value"),
    label: store.one(subject, "label") || "",
    state: requireOptionalAllowedValue(
      subject,
      "state",
      store.one(subject, "state") || "",
      MODE_EDITOR_SELECT_OPTION_STATE_VALUES,
    ) || "present",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseModeEditorSelectConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataModeEditorSelectConfig");
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  if (effectiveWidgetKind !== "select") {
    throw new Error(`${subject} can only be used by select mode-editor widgets, got ${effectiveWidgetKind || "textInput"}.`);
  }
  const options = store.objects(subject, "option")
    .map(option => parseModeEditorSelectOption(store, option, subject))
    .sort((a, b) => a.order - b.order || a.value.localeCompare(b.value));
  if (!options.length) {
    throw new Error(`${subject}.option must reference at least one DataModeEditorSelectOption.`);
  }
  return {
    subject,
    control,
    kind: "select",
    selectionMode: requireOptionalAllowedValue(
      subject,
      "selectionMode",
      store.one(subject, "selectionMode") || "",
      MODE_EDITOR_SELECTION_MODE_VALUES,
    ) || "single",
    options,
  };
}

export function parseModeEditorNumericConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataModeEditorNumericConfig");
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  if (!["numberInput", "stepper"].includes(effectiveWidgetKind)) {
    throw new Error(`${subject} can only be used by numberInput or stepper mode-editor widgets, got ${effectiveWidgetKind || "textInput"}.`);
  }
  const minValue = parseOptionalFiniteNumber(subject, "minValue", store.one(subject, "minValue") || "");
  const maxValue = parseOptionalFiniteNumber(subject, "maxValue", store.one(subject, "maxValue") || "");
  const stepValue = parseOptionalFiniteNumber(subject, "stepValue", store.one(subject, "stepValue") || "");
  if (minValue == null && maxValue == null && stepValue == null) {
    throw new Error(`${subject} must declare at least one of minValue, maxValue, or stepValue.`);
  }
  if (stepValue != null && stepValue <= 0) {
    throw new Error(`${subject}.stepValue must be greater than zero, got ${stepValue}.`);
  }
  if (minValue != null && maxValue != null && maxValue < minValue) {
    throw new Error(`${subject}.maxValue must be greater than or equal to minValue.`);
  }
  return {
    subject,
    control,
    kind: "numeric",
    minValue,
    maxValue,
    stepValue,
  };
}

export function parseModeEditorToggleConfig(store, subject, expectedControl, effectiveWidgetKind) {
  requireIsa(store, subject, "DataModeEditorToggleConfig");
  const control = requireOne(store, subject, "control");
  if (control !== expectedControl) {
    throw new Error(`${subject}.control must reference ${expectedControl}, got ${control}.`);
  }
  if (effectiveWidgetKind !== "toggle") {
    throw new Error(`${subject} can only be used by toggle mode-editor widgets, got ${effectiveWidgetKind || "textInput"}.`);
  }
  const trueLabel = store.one(subject, "trueLabel") || "";
  const falseLabel = store.one(subject, "falseLabel") || "";
  if (!trueLabel && !falseLabel) {
    throw new Error(`${subject} must declare trueLabel, falseLabel, or both.`);
  }
  return {
    subject,
    control,
    kind: "toggle",
    trueLabel,
    falseLabel,
  };
}

export function parseModeEditorControl(
  store,
  subject,
  allowedEditTargets,
  editTargetBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataModeEditorControl");
  const editTarget = requireOne(store, subject, "editTarget");
  if (!allowedEditTargets.has(editTarget)) {
    throw new Error(`${subject}.editTarget must reference an edit target declared by the owning mode editor, got ${editTarget}.`);
  }
  const editTargetConfig = editTargetBySubject.get(editTarget);
  if (!editTargetConfig) {
    throw new Error(`${subject}.editTarget must reference an active DataSpace edit target, got ${editTarget}.`);
  }
  const widgetKind = requireOptionalAllowedValue(
    subject,
    "widgetKind",
    store.one(subject, "widgetKind") || "",
    MODE_EDITOR_WIDGET_KIND_VALUES,
  );
  if (widgetKind && !modeEditorWidgetCompatible(editTargetConfig.valueKind, widgetKind)) {
    throw new Error(
      `${subject}.widgetKind ${widgetKind} is incompatible with ${editTarget}.valueKind ${editTargetConfig.valueKind || "string"}.`,
    );
  }
  const effectiveWidgetKind = widgetKind || defaultModeEditorWidgetKindForValueKind(editTargetConfig.valueKind);
  const selectConfigSubject = store.one(subject, "selectConfig") || "";
  const numericConfigSubject = store.one(subject, "numericConfig") || "";
  const toggleConfigSubject = store.one(subject, "toggleConfig") || "";
  const configuredKinds = [
    selectConfigSubject ? "select" : "",
    numericConfigSubject ? "numeric" : "",
    toggleConfigSubject ? "toggle" : "",
  ].filter(Boolean);
  if (configuredKinds.length > 1) {
    throw new Error(`${subject} must not declare more than one mode-editor widget config subject.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const widgetConfig = selectConfigSubject
    ? parseModeEditorSelectConfig(store, selectConfigSubject, subject, effectiveWidgetKind)
    : numericConfigSubject
      ? parseModeEditorNumericConfig(store, numericConfigSubject, subject, effectiveWidgetKind)
      : toggleConfigSubject
        ? parseModeEditorToggleConfig(store, toggleConfigSubject, subject, effectiveWidgetKind)
        : null;
  if (widgetConfig?.kind === "select" && widgetConfig.selectionMode === "multi" && editTargetConfig.valueKind !== "stringSet") {
    throw new Error(
      `${subject}.editTarget ${editTarget} must use valueKind stringSet when ${widgetConfig.subject}.selectionMode is multi, got ${editTargetConfig.valueKind || "string"}.`,
    );
  }
  if (editTargetConfig.valueKind === "stringSet" && effectiveWidgetKind !== "select") {
    throw new Error(
      `${subject}.editTarget ${editTarget} uses valueKind stringSet and must render through a select mode-editor widget, got ${effectiveWidgetKind || "textInput"}.`,
    );
  }
  return {
    subject,
    editTarget,
    label: store.one(subject, "label") || "",
    widgetKind,
    widgetConfig,
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseOptionalGovernedRawFactTuple(store, editorSubject, editTarget, activeValues) {
  const tupleSubject = store.one(editorSubject, "tuple") || "";
  if (!tupleSubject) return null;
  return parseGovernedRawFactTupleSubject(store, editorSubject, tupleSubject, editTarget, activeValues);
}

export function parseGovernedRawFactTupleSubject(store, ownerSubject, tupleSubject, editTarget, activeValues) {
  requireIsa(store, tupleSubject, "DataGovernedRawFactTuple", `${ownerSubject}.tuple ${tupleSubject}`);
  const tupleEditTarget = requireOne(store, tupleSubject, "editTarget");
  if (tupleEditTarget !== editTarget) {
    throw new Error(`${ownerSubject}.tuple must reference a tuple for ${editTarget}, got ${tupleEditTarget}.`);
  }
  const tupleValue = requireOne(store, tupleSubject, "tupleValue");
  if (!activeValues.includes(tupleValue)) {
    throw new Error(`${ownerSubject}.tuple ${tupleSubject} must identify one active raw fact value on ${editTarget}, got ${tupleValue}.`);
  }
  return {
    subject: tupleSubject,
    editTarget: tupleEditTarget,
    tupleValue,
    label: store.one(tupleSubject, "label") || "",
    order: Number(store.one(tupleSubject, "order") || "0"),
  };
}

export function parseTransformModeEditor(
  store,
  subject,
  transformEditorBySubject,
  activeValidationResultSubjects,
  editTargetBySubject,
) {
  requireIsa(store, subject, "DataTransformModeEditor");
  const transform = requireOne(store, subject, "transform");
  const editorSubject = requireOne(store, subject, "editor");
  const editor = transformEditorBySubject.get(editorSubject);
  if (!editor) {
    throw new Error(`${subject}.editor must reference an active DataTransformEditor, got ${editorSubject}.`);
  }
  if (editor.transform !== transform) {
    throw new Error(`${subject}.editor must reference a transform editor for ${transform}, got ${editor.transform}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const allowedEditTargets = transformModeEditorEditTargets(editor);
  return {
    subject,
    transform,
    editor: editorSubject,
    controls: store.objects(subject, "control")
      .map(control => parseModeEditorControl(
        store,
        control,
        allowedEditTargets,
        editTargetBySubject,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.editTarget.localeCompare(b.editTarget)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePublicationModeEditor(
  store,
  subject,
  publicationEditorBySubject,
  activeValidationResultSubjects,
  editTargetBySubject,
) {
  requireIsa(store, subject, "DataPublicationModeEditor");
  const publication = requireOne(store, subject, "publication");
  const editorSubject = requireOne(store, subject, "editor");
  const editor = publicationEditorBySubject.get(editorSubject);
  if (!editor) {
    throw new Error(`${subject}.editor must reference an active DataPublicationEditor, got ${editorSubject}.`);
  }
  if (editor.publication !== publication) {
    throw new Error(`${subject}.editor must reference a publication editor for ${publication}, got ${editor.publication}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const allowedEditTargets = publicationModeEditorEditTargets(editor);
  return {
    subject,
    publication,
    editor: editorSubject,
    controls: store.objects(subject, "control")
      .map(control => parseModeEditorControl(
        store,
        control,
        allowedEditTargets,
        editTargetBySubject,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.editTarget.localeCompare(b.editTarget)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireValidationRuleEditorEditTarget(
  store,
  subject,
  slot,
  rule,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== rule || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${rule}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

function requireAllowedValueEntryEditorEditTarget(
  store,
  subject,
  slot,
  entry,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== entry || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${entry}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function requireSubjectScopedEditTarget(
  store,
  subject,
  slot,
  targetSubject,
  expectedPredicate,
  activeEditTargetSubjects,
) {
  const editTarget = requireOne(store, subject, slot);
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.${slot} ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects, slot);
  const target = requireOne(store, editTarget, "target", `${editTarget}.target`);
  const predicate = requireOne(store, editTarget, "predicate", `${editTarget}.predicate`);
  if (target !== targetSubject || predicate !== expectedPredicate) {
    throw new Error(
      `${subject}.${slot} must edit ${targetSubject}.${expectedPredicate}, got ${target}.${predicate}.`,
    );
  }
  return editTarget;
}

export function parseValidationRuleEditor(
  store,
  subject,
  activeValidationRuleSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataValidationRuleEditor");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    expectedTypeEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "expectedTypeEdit",
      rule,
      "expectedType",
      activeEditTargetSubjects,
    ),
    severityEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "severityEdit",
      rule,
      "severity",
      activeEditTargetSubjects,
    ),
    messageEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "messageEdit",
      rule,
      "message",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseUniquenessKeyEditor(
  store,
  subject,
  rule,
  uniquenessKeyBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataUniquenessKeyEditor");
  const key = requireOne(store, subject, "key");
  const keyConfig = uniquenessKeyBySubject.get(key);
  if (!keyConfig) {
    throw new Error(`${subject}.key must reference an active DataUniquenessKey, got ${key}.`);
  }
  if (keyConfig.rule !== rule) {
    throw new Error(`${subject}.key must reference a uniqueness key for ${rule}, got ${keyConfig.rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    key,
    fieldEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "fieldEdit",
      key,
      "field",
      activeEditTargetSubjects,
    ),
    labelEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "labelEdit",
      key,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      key,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    keyValue: keyConfig,
  };
}

export function parseUniqueRuleEditor(
  store,
  subject,
  activeValidationRuleSubjects,
  uniquenessKeyBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataUniqueRuleEditor");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const validation = requireOne(store, rule, "validation", `${rule}.validation`);
  if (validation !== "unique") {
    throw new Error(`${subject}.rule must reference a unique validation rule, got ${validation}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    keyEditors: store.objects(subject, "keyEditor")
      .map(keyEditor => parseUniquenessKeyEditor(
        store,
        keyEditor,
        rule,
        uniquenessKeyBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    severityEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "severityEdit",
      rule,
      "severity",
      activeEditTargetSubjects,
    ),
    messageEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "messageEdit",
      rule,
      "message",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseRangeRuleEditor(
  store,
  subject,
  activeValidationRuleSubjects,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataRangeRuleEditor");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const validation = requireOne(store, rule, "validation", `${rule}.validation`);
  if (validation !== "range") {
    throw new Error(`${subject}.rule must reference a range validation rule, got ${validation}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    minValueEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "minValueEdit",
      rule,
      "minValue",
      activeEditTargetSubjects,
    ),
    maxValueEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "maxValueEdit",
      rule,
      "maxValue",
      activeEditTargetSubjects,
    ),
    severityEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "severityEdit",
      rule,
      "severity",
      activeEditTargetSubjects,
    ),
    messageEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "messageEdit",
      rule,
      "message",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAllowedValueEntryEditor(
  store,
  subject,
  rule,
  allowedValueEntryBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValueEntryEditor");
  const entry = requireOne(store, subject, "entry");
  const entryConfig = allowedValueEntryBySubject.get(entry);
  if (!entryConfig) {
    throw new Error(`${subject}.entry must reference an active DataAllowedValueEntry, got ${entry}.`);
  }
  if (entryConfig.rule !== rule) {
    throw new Error(`${subject}.entry must reference an allowed-value entry for ${rule}, got ${entryConfig.rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    entry,
    stateEdit: requireAllowedValueEntryEditorEditTarget(
      store,
      subject,
      "stateEdit",
      entry,
      "state",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseAllowedValueCandidateEditor(
  store,
  subject,
  rule,
  allowedValueCandidateBySubject,
  allowedValueCandidatePromotionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValueCandidateEditor");
  const candidate = requireOne(store, subject, "candidate");
  const candidateConfig = allowedValueCandidateBySubject.get(candidate);
  if (!candidateConfig) {
    throw new Error(`${subject}.candidate must reference an active DataAllowedValueCandidate, got ${candidate}.`);
  }
  if (candidateConfig.rule !== rule) {
    throw new Error(`${subject}.candidate must reference an allowed-value candidate for ${rule}, got ${candidateConfig.rule}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    candidate,
    promotionEditors: store.objects(subject, "promotionEditor")
      .map(promotionEditor => parseAllowedValueCandidatePromotionEditor(
        store,
        promotionEditor,
        candidate,
        allowedValueCandidatePromotionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.promotion.localeCompare(b.promotion)),
    valueEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "valueEdit",
      candidate,
      "value",
      activeEditTargetSubjects,
    ),
    normalizedValueEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "normalizedValueEdit",
      candidate,
      "normalizedValue",
      activeEditTargetSubjects,
    ),
    labelEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "labelEdit",
      candidate,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      candidate,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    candidateValue: candidateConfig,
  };
}

export function parseAllowedValueCandidatePromotionEditor(
  store,
  subject,
  candidate,
  allowedValueCandidatePromotionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionEditor");
  const promotion = requireOne(store, subject, "promotion");
  const promotionConfig = allowedValueCandidatePromotionBySubject.get(promotion);
  if (!promotionConfig) {
    throw new Error(`${subject}.promotion must reference an active DataAllowedValueCandidatePromotion, got ${promotion}.`);
  }
  if (promotionConfig.candidate !== candidate) {
    throw new Error(`${subject}.promotion must reference a candidate promotion for ${candidate}, got ${promotionConfig.candidate}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const workflowEditors = store.objects(subject, "workflowEditor")
    .map(workflowEditor => parseAllowedValueCandidatePromotionWorkflowEditor(
      store,
      workflowEditor,
      promotion,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ));
  for (const workflowEditor of workflowEditors) {
    workflowEditor.workflowValue.inventoryRecord = (
      promotionConfig.workflowInventories || []
    ).find(inventory => inventory.workflow === workflowEditor.workflow) || null;
  }
  return {
    subject,
    promotion,
    workflowEditors: workflowEditors.sort((a, b) => a.order - b.order || a.workflow.localeCompare(b.workflow)),
    promotionStateEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "promotionStateEdit",
      promotion,
      "promotionState",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    promotionValue: promotionConfig,
  };
}

export function parseAllowedValueCandidatePromotionWorkflowEditor(
  store,
  subject,
  promotion,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflowEditor");
  const workflow = requireOne(store, subject, "workflow");
  const workflowValue = parseAllowedValueCandidatePromotionWorkflow(store, workflow, promotion);
  const workflowStepBySubject = new Map(
    workflowValue.steps.map(step => [step.subject, step]),
  );
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    workflow,
    entryActionEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "entryActionEdit",
      workflow,
      "entryAction",
      activeEditTargetSubjects,
    ),
    approvalModeEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "approvalModeEdit",
      workflow,
      "approvalMode",
      activeEditTargetSubjects,
    ),
    labelEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "labelEdit",
      workflow,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      workflow,
      "order",
      activeEditTargetSubjects,
    ),
    stepEditors: store.objects(subject, "stepEditor")
      .map(stepEditor => parseAllowedValueCandidatePromotionWorkflowStepEditor(
        store,
        stepEditor,
        workflow,
        workflowStepBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.step.localeCompare(b.step)),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    workflowValue,
  };
}

export function parseAllowedValueCandidatePromotionWorkflowStepEditor(
  store,
  subject,
  workflow,
  workflowStepBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValueCandidatePromotionWorkflowStepEditor");
  const step = requireOne(store, subject, "step");
  const stepValue = workflowStepBySubject.get(step);
  if (!stepValue || stepValue.workflow !== workflow) {
    throw new Error(`${subject}.step must reference a workflow step for ${workflow}, got ${step}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    step,
    stepKindEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "stepKindEdit",
      step,
      "stepKind",
      activeEditTargetSubjects,
    ),
    stateEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "stateEdit",
      step,
      "state",
      activeEditTargetSubjects,
    ),
    labelEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "labelEdit",
      step,
      "label",
      activeEditTargetSubjects,
    ),
    orderEdit: requireSubjectScopedEditTarget(
      store,
      subject,
      "orderEdit",
      step,
      "order",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
    stepValue,
  };
}

export function parseAllowedValuesRuleEditor(
  store,
  subject,
  activeValidationRuleSubjects,
  allowedValueEntryBySubject,
  allowedValueCandidateBySubject,
  allowedValueCandidatePromotionBySubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataAllowedValuesRuleEditor");
  const rule = requireOne(store, subject, "rule");
  requireIsa(store, rule, "DataValidationRule", `${subject}.rule ${rule}`);
  if (!activeValidationRuleSubjects.has(rule)) {
    throw new Error(`${subject}.rule must reference an active DataSpace validationRule, got ${rule}.`);
  }
  const validation = requireOne(store, rule, "validation", `${rule}.validation`);
  if (validation !== "allowedValues") {
    throw new Error(`${subject}.rule must reference an allowedValues validation rule, got ${validation}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    rule,
    entryEditors: store.objects(subject, "entryEditor")
      .map(entryEditor => parseAllowedValueEntryEditor(
        store,
        entryEditor,
        rule,
        allowedValueEntryBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    candidateEditors: store.objects(subject, "candidateEditor")
      .map(candidateEditor => parseAllowedValueCandidateEditor(
        store,
        candidateEditor,
        rule,
        allowedValueCandidateBySubject,
        allowedValueCandidatePromotionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject)),
    severityEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "severityEdit",
      rule,
      "severity",
      activeEditTargetSubjects,
    ),
    messageEdit: requireValidationRuleEditorEditTarget(
      store,
      subject,
      "messageEdit",
      rule,
      "message",
      activeEditTargetSubjects,
    ),
    validationResult,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePropertySection(
  store,
  subject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
  resolvedPropertyByEditTarget,
) {
  requireIsa(store, subject, "DataPropertySection");
  const target = requireOne(store, subject, "target");
  requireKnownSubject(store, target, `${subject}.target`);
  const rows = store.objects(subject, "row")
    .map(row => parsePropertyRow(
      store,
      row,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
      resolvedPropertyByEditTarget,
    ))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  return {
    subject,
    target,
    targetKind: requireOne(store, subject, "targetKind"),
    label: requireOne(store, subject, "label"),
    rows,
    staleRows: rows.filter(row => row.stale),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePropertiesPanel(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeValidationResultSubjects,
  resolvedPropertyByEditTarget,
) {
  requireIsa(store, subject, "DataPropertiesPanel");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const selectedTarget = store.one(subject, "selectedTarget") || "";
  if (selectedTarget) requireKnownSubject(store, selectedTarget, `${subject}.selectedTarget`);
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const sections = store.objects(subject, "section")
    .map(section => parsePropertySection(
      store,
      section,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
      resolvedPropertyByEditTarget,
    ))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const staleResolvedProperties = sections.flatMap(section => section.staleRows.map(row => row.resolvedProperty));
  return {
    subject,
    dataSpace,
    selectedTarget,
    sections,
    staleResolvedProperties,
    validationResult,
  };
}

export function parseOverlayTarget(store, subject, activeEditTargetSubjects, activeValidationResultSubjects) {
  requireIsa(store, subject, "DataOverlayTarget");
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const actions = store.objects(subject, "action")
    .map(action => parseContextMenuAction(store, action))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const inlineEditSubject = store.one(subject, "inlineEdit") || "";
  const inlineEdit = inlineEditSubject
    ? parseInlineEdit(store, inlineEditSubject, activeEditTargetSubjects, activeValidationResultSubjects)
    : null;
  return {
    subject,
    editTarget,
    targetKind: requireOne(store, subject, "targetKind"),
    surface: requireOne(store, subject, "surface"),
    label: requireOne(store, subject, "label"),
    actions,
    inlineEdit,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDraftState(store, subject, dataSpaceSubject, activeAssetSubjects) {
  requireIsa(store, subject, "DataDraftState");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const baseAsset = store.one(subject, "baseAsset") || "";
  if (baseAsset) {
    requireIsa(store, baseAsset, "DataAsset", `${subject}.baseAsset ${baseAsset}`);
    if (!activeAssetSubjects.has(baseAsset)) {
      throw new Error(`${subject}.baseAsset must reference an active DataSpace asset, got ${baseAsset}.`);
    }
  }
  return {
    subject,
    dataSpace,
    state: requireOne(store, subject, "state"),
    draftId: store.one(subject, "draftId") || "",
    baseAsset,
    message: store.one(subject, "message") || "",
  };
}

export function parseOverlayManager(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeAssetSubjects,
  activeValidationResultSubjects,
  resolvedPropertyByEditTarget,
) {
  requireIsa(store, subject, "DataOverlayManager");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const targets = store.objects(subject, "target")
    .map(target => parseOverlayTarget(store, target, activeEditTargetSubjects, activeValidationResultSubjects))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const targetSubjects = new Set(targets.map(target => target.subject));
  const selectedTarget = store.one(subject, "selectedTarget") || "";
  if (selectedTarget && !targetSubjects.has(selectedTarget)) {
    throw new Error(`${subject}.selectedTarget must reference one of its overlay targets, got ${selectedTarget}.`);
  }
  const draftStateSubject = store.one(subject, "draftState") || "";
  const draftState = draftStateSubject
    ? parseDraftState(store, draftStateSubject, dataSpaceSubject, activeAssetSubjects)
    : null;
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const propertiesPanelSubject = store.one(subject, "propertiesPanel") || "";
  const propertiesPanel = propertiesPanelSubject
    ? parsePropertiesPanel(
      store,
      propertiesPanelSubject,
      dataSpaceSubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
      resolvedPropertyByEditTarget,
    )
    : null;
  return {
    subject,
    dataSpace,
    targets,
    selectedTarget,
    activeOverlay: requireOne(store, subject, "activeOverlay"),
    draftState,
    validationResult,
    propertiesPanel,
    staleResolvedProperties: propertiesPanel?.staleResolvedProperties || [],
  };
}

function deriveArchivedPreviewHistory(previews, overlayManager, draftRestoreReceipts = []) {
  const activeDraftStateSubject = overlayManager?.draftState?.subject || "";
  if (!activeDraftStateSubject) return [];
  return previews
    .filter(preview => preview.draftStateSubject && preview.draftStateSubject !== activeDraftStateSubject)
    .map(preview => ({
      preview,
      previewSubject: preview.subject,
      previewKind: preview.previewKind,
      draftState: preview.draftState,
      draftStateSubject: preview.draftStateSubject,
      activeDraftState: overlayManager.draftState,
      activeDraftStateSubject,
      restoreReceipt: draftRestoreReceipts
        .filter(receipt => (
          receipt.preview === preview.subject
          && receipt.currentDraftState === activeDraftStateSubject
          && receipt.archivedDraftState === preview.draftStateSubject
        ))
        .sort((a, b) => b.order - a.order || b.subject.localeCompare(a.subject))[0] || null,
    }))
    .sort((a, b) => a.preview.order - b.preview.order || a.preview.subject.localeCompare(b.preview.subject));
}

export function requireActiveResolvedValue(subject, resolvedValue, activeResolvedValueSubjects, predicate = "resolvedValue") {
  if (!activeResolvedValueSubjects.has(resolvedValue)) {
    throw new Error(`${subject}.${predicate} ${resolvedValue} is not declared by the active DataSpace.`);
  }
}

function requireSourcePreviewSampleRef(store, subject, sampleRef, asset) {
  requireKnownSubject(store, sampleRef, `${subject}.sampleRef`);
  const sampleType = isa(store, sampleRef);
  if (sampleType === "Cell") {
    const sheet = requireOne(store, sampleRef, "sheet", `${sampleRef}.sheet`);
    if (sheet !== asset.sourceObject) {
      throw new Error(`${subject}.sampleRef ${sampleRef} must belong to sourceArtifact ${asset.sourceObject}, got ${sheet}.`);
    }
  } else if (sampleType === "DataSpreadsheetFieldSource") {
    const sheet = requireOne(store, sampleRef, "sheet", `${sampleRef}.sheet`);
    if (sheet !== asset.sourceObject) {
      throw new Error(`${subject}.sampleRef ${sampleRef} must reference sourceArtifact ${asset.sourceObject}, got ${sheet}.`);
    }
  }
}

export function parseSourcePreview(store, subject, dataSpaceSubject, assetBySubject, activeFieldSubjects) {
  requireIsa(store, subject, "DataSourcePreview");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const assetSubject = requireOne(store, subject, "asset");
  const asset = assetBySubject.get(assetSubject);
  if (!asset) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${assetSubject}.`);
  }
  const sourceArtifact = requireOne(store, subject, "sourceArtifact");
  requireKnownSubject(store, sourceArtifact, `${subject}.sourceArtifact`);
  if (sourceArtifact !== asset.sourceObject) {
    throw new Error(`${subject}.sourceArtifact must match ${assetSubject}.sourceObject, got ${sourceArtifact}.`);
  }
  const fields = store.objects(subject, "field");
  for (const field of fields) {
    requireIsa(store, field, "DataField", `${subject}.field ${field}`);
    if (!activeFieldSubjects.has(field)) {
      throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
    }
    const fieldAsset = requireOne(store, field, "asset", `${field}.asset`);
    if (fieldAsset !== assetSubject) {
      throw new Error(`${subject}.field ${field} must belong to asset ${assetSubject}, got ${fieldAsset}.`);
    }
  }
  const sampleRefs = store.objects(subject, "sampleRef");
  for (const sampleRef of sampleRefs) {
    requireSourcePreviewSampleRef(store, subject, sampleRef, asset);
  }
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );
  return {
    subject,
    dataSpace,
    asset: assetSubject,
    sourceArtifact,
    fields,
    sampleRefs,
    previewKind: requireOne(store, subject, "previewKind"),
    state: requireOne(store, subject, "state"),
    message: store.one(subject, "message") || "",
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parsePreview(
  store,
  subject,
  dataSpaceSubject,
  activeAssetSubjects,
  resolvedValueBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataPreview");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const draftStateSubject = requireOne(store, subject, "draftState");
  const draftState = parseDraftState(store, draftStateSubject, dataSpaceSubject, activeAssetSubjects);
  if (draftState.state !== "preview") {
    throw new Error(`${subject}.draftState must be in preview state, got ${draftState.state}.`);
  }
  const baseAsset = store.one(subject, "baseAsset") || draftState.baseAsset;
  if (baseAsset) {
    requireIsa(store, baseAsset, "DataAsset", `${subject}.baseAsset ${baseAsset}`);
    if (!activeAssetSubjects.has(baseAsset)) {
      throw new Error(`${subject}.baseAsset must reference an active DataSpace asset, got ${baseAsset}.`);
    }
    if (draftState.baseAsset && baseAsset !== draftState.baseAsset) {
      throw new Error(`${subject}.baseAsset must match ${draftStateSubject}.baseAsset, got ${baseAsset}.`);
    }
  }
  const resolvedValueSubjects = store.objects(subject, "resolvedValue");
  if (!resolvedValueSubjects.length) {
    throw new Error(`${subject}.resolvedValue must include at least one draft-backed resolved value.`);
  }
  const resolvedValues = resolvedValueSubjects.map(resolvedValue => {
    requireIsa(store, resolvedValue, "DataResolvedValue", `${subject}.resolvedValue ${resolvedValue}`);
    requireActiveResolvedValue(subject, resolvedValue, resolvedValueBySubject, "resolvedValue");
    return resolvedValueBySubject.get(resolvedValue);
  });
  if (!resolvedValues.some(value => value.sourceLayer === "draft")) {
    throw new Error(`${subject}.resolvedValue must include at least one draft sourceLayer value.`);
  }
  const validationResultSubjects = store.objects(subject, "validationResult");
  for (const validationResult of validationResultSubjects) {
    if (!activeValidationResultSubjects.has(validationResult)) {
      throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
    }
  }
  const sampleGridSubjects = store.objects(subject, "sampleGrid");
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );
  return {
    subject,
    dataSpace,
    draftState,
    draftStateSubject,
    baseAsset,
    previewKind: requireOne(store, subject, "previewKind"),
    state: requireOne(store, subject, "state"),
    resolvedValueSubjects,
    resolvedValues,
    validationResultSubjects,
    sampleGridSubjects,
    sampleGrids: [],
    message: store.one(subject, "message") || "",
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSampleGridCell(store, subject, expectedRow, gridAsset, fieldBySubject) {
  requireIsa(store, subject, "DataSampleGridCell");
  const row = requireOne(store, subject, "row");
  requireIsa(store, row, "DataSampleGridRow", `${subject}.row ${row}`);
  if (row !== expectedRow) {
    throw new Error(`${subject}.row must reference ${expectedRow}, got ${row}.`);
  }
  const field = requireOne(store, subject, "field");
  requireIsa(store, field, "DataField", `${subject}.field ${field}`);
  const fieldConfig = fieldBySubject.get(field);
  if (!fieldConfig) {
    throw new Error(`${subject}.field must reference an active DataSpace field, got ${field}.`);
  }
  if (fieldConfig.asset !== gridAsset) {
    throw new Error(`${subject}.field must reference a field on asset ${gridAsset}, got ${fieldConfig.asset}.`);
  }
  return {
    subject,
    row,
    field,
    value: store.one(subject, "value") || "",
    valueState: store.one(subject, "valueState") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSampleGridRow(store, subject, expectedGrid, gridAsset, fieldBySubject) {
  requireIsa(store, subject, "DataSampleGridRow");
  const grid = requireOne(store, subject, "grid");
  requireIsa(store, grid, "DataSampleGrid", `${subject}.grid ${grid}`);
  if (grid !== expectedGrid) {
    throw new Error(`${subject}.grid must reference ${expectedGrid}, got ${grid}.`);
  }
  const cells = store.objects(subject, "cell")
    .map(cell => parseSampleGridCell(store, cell, subject, gridAsset, fieldBySubject))
    .sort((a, b) => a.order - b.order || a.field.localeCompare(b.field));
  return {
    subject,
    grid,
    rowKey: requireOne(store, subject, "rowKey"),
    rowIndex: store.one(subject, "rowIndex") || "",
    cells,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSampleGrid(store, subject, activeAssetSubjects, activePreviewSubjects, fieldBySubject) {
  requireIsa(store, subject, "DataSampleGrid");
  const asset = requireOne(store, subject, "asset");
  requireIsa(store, asset, "DataAsset", `${subject}.asset ${asset}`);
  if (!activeAssetSubjects.has(asset)) {
    throw new Error(`${subject}.asset must reference an active DataSpace asset, got ${asset}.`);
  }
  const preview = store.one(subject, "preview") || "";
  if (preview) {
    requireIsa(store, preview, "DataPreview", `${subject}.preview ${preview}`);
    if (!activePreviewSubjects.has(preview)) {
      throw new Error(`${subject}.preview must reference an active DataSpace preview, got ${preview}.`);
    }
  }
  const rows = store.objects(subject, "row")
    .map(row => parseSampleGridRow(store, row, subject, asset, fieldBySubject))
    .sort((a, b) => a.order - b.order || a.rowKey.localeCompare(b.rowKey));
  return {
    subject,
    asset,
    preview,
    rows,
    label: store.one(subject, "label") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function requireComparisonLayers(subject, comparisonKind, leftLayer, rightLayer) {
  const expectedLayers = {
    inferredVsAuthored: ["inference", "authored"],
    baseVsDraft: ["base", "draft"],
    baseVsSaved: ["base", "saved"],
    sourceVsDraft: ["source", "draft"],
    runtimeVsAuthored: ["runtime", "authored"],
  }[comparisonKind];
  if (!expectedLayers) return;
  if (leftLayer !== expectedLayers[0] || rightLayer !== expectedLayers[1]) {
    throw new Error(
      `${subject}.comparisonKind ${comparisonKind} must compare ${expectedLayers[0]} to ${expectedLayers[1]}, got ${leftLayer} to ${rightLayer}.`,
    );
  }
}

export function parseComparison(
  store,
  subject,
  dataSpaceSubject,
  activeEditTargetSubjects,
  activeTargetSubjectsByKind,
  resolvedValueBySubject,
  activePreviewSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataComparison");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const target = requireOne(store, subject, "target");
  const targetKind = requireOne(store, subject, "targetKind");
  const activeTargetSubjects = activeTargetSubjectsByKind.get(targetKind) || new Set();
  if (!activeTargetSubjects.has(target)) {
    throw new Error(`${subject}.target must reference an active ${targetKind} target, got ${target}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  const editTargetTarget = requireOne(store, editTarget, "target", `${editTarget}.target`);
  if (editTargetTarget !== target) {
    throw new Error(`${subject}.editTarget must target ${target}, got ${editTargetTarget}.`);
  }

  const leftResolvedValue = store.one(subject, "leftResolvedValue") || "";
  if (leftResolvedValue) {
    requireIsa(store, leftResolvedValue, "DataResolvedValue", `${subject}.leftResolvedValue ${leftResolvedValue}`);
    requireActiveResolvedValue(subject, leftResolvedValue, resolvedValueBySubject, "leftResolvedValue");
  }
  const rightResolvedValue = store.one(subject, "rightResolvedValue") || "";
  if (rightResolvedValue) {
    requireIsa(store, rightResolvedValue, "DataResolvedValue", `${subject}.rightResolvedValue ${rightResolvedValue}`);
    requireActiveResolvedValue(subject, rightResolvedValue, resolvedValueBySubject, "rightResolvedValue");
  }
  const preview = store.one(subject, "preview") || "";
  if (preview && !activePreviewSubjects.has(preview)) {
    throw new Error(`${subject}.preview must reference a DataSpace preview, got ${preview}.`);
  }
  const validationResult = store.one(subject, "validationResult") || "";
  if (validationResult && !activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }

  const comparisonKind = requireOne(store, subject, "comparisonKind");
  const leftLayer = requireOne(store, subject, "leftLayer");
  const rightLayer = requireOne(store, subject, "rightLayer");
  requireComparisonLayers(subject, comparisonKind, leftLayer, rightLayer);
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );

  return {
    subject,
    dataSpace,
    target,
    targetKind,
    editTarget,
    comparisonKind,
    leftLabel: requireOne(store, subject, "leftLabel"),
    leftLayer,
    leftValue: requireOne(store, subject, "leftValue"),
    leftResolvedValue,
    leftResolvedValueObject: leftResolvedValue ? resolvedValueBySubject.get(leftResolvedValue) : null,
    rightLabel: requireOne(store, subject, "rightLabel"),
    rightLayer,
    rightValue: requireOne(store, subject, "rightValue"),
    rightResolvedValue,
    rightResolvedValueObject: rightResolvedValue ? resolvedValueBySubject.get(rightResolvedValue) : null,
    state: requireOne(store, subject, "state"),
    preview,
    validationResult,
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseSaveAsCandidate(
  store,
  subject,
  dataSpaceSubject,
  activeAssetSubjects,
  publicationBySubject,
  activePreviewSubjects,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataSaveAsCandidate");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const baseAsset = requireOne(store, subject, "baseAsset");
  requireIsa(store, baseAsset, "DataAsset", `${subject}.baseAsset ${baseAsset}`);
  if (!activeAssetSubjects.has(baseAsset)) {
    throw new Error(`${subject}.baseAsset must reference an active DataSpace asset, got ${baseAsset}.`);
  }
  const targetAsset = requireOne(store, subject, "targetAsset");
  requireIsa(store, targetAsset, "DataAsset", `${subject}.targetAsset ${targetAsset}`);
  if (!activeAssetSubjects.has(targetAsset)) {
    throw new Error(`${subject}.targetAsset must reference an active DataSpace asset, got ${targetAsset}.`);
  }
  if (targetAsset === baseAsset) {
    throw new Error(`${subject}.targetAsset must be distinct from baseAsset ${baseAsset}.`);
  }
  const draftStateSubject = requireOne(store, subject, "draftState");
  const draftState = parseDraftState(store, draftStateSubject, dataSpaceSubject, activeAssetSubjects);
  if (draftState.baseAsset && draftState.baseAsset !== baseAsset) {
    throw new Error(`${subject}.baseAsset must match ${draftStateSubject}.baseAsset, got ${baseAsset}.`);
  }
  const preview = store.one(subject, "preview") || "";
  if (preview && !activePreviewSubjects.has(preview)) {
    throw new Error(`${subject}.preview must reference a DataSpace preview, got ${preview}.`);
  }
  const validationResult = requireOne(store, subject, "validationResult");
  if (!activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  const validationState = requireOne(store, validationResult, "state", `${validationResult}.state`);
  if (validationState !== "valid") {
    throw new Error(`${subject}.validationResult must be valid, got ${validationState}.`);
  }
  const saveKind = requireOne(store, subject, "saveKind");
  const targetPublication = store.one(subject, "targetPublication") || "";
  if (saveKind === "card") {
    if (!targetPublication) {
      throw new Error(`${subject}.targetPublication is required for card save-as candidates.`);
    }
    const publication = publicationBySubject.get(targetPublication);
    if (!publication) {
      throw new Error(`${subject}.targetPublication must reference an active DataSpace publication, got ${targetPublication}.`);
    }
    if (publication.asset !== targetAsset) {
      throw new Error(`${subject}.targetPublication must publish targetAsset ${targetAsset}, got ${publication.asset}.`);
    }
  } else if (targetPublication && !publicationBySubject.has(targetPublication)) {
    throw new Error(`${subject}.targetPublication must reference an active DataSpace publication, got ${targetPublication}.`);
  }
  const plaintextPolicy = requireOptionalAllowedValue(
    subject,
    "plaintextPolicy",
    store.one(subject, "plaintextPolicy") || "",
    PLAINTEXT_POLICY_VALUES,
  );
  return {
    subject,
    dataSpace,
    saveKind,
    baseAsset,
    targetAsset,
    targetPublication,
    draftState,
    draftStateSubject,
    preview,
    validationResult,
    provenanceReceipt: store.one(subject, "provenanceReceipt") || "",
    state: requireOne(store, subject, "state"),
    command: requireOne(store, subject, "command"),
    message: store.one(subject, "message") || "",
    plaintextPolicy,
    policyNotices: store.objects(subject, "policyNotice"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseProvenanceReceipt(
  store,
  subject,
  dataSpaceSubject,
  assetBySubject,
  sourceBySubject,
  publicationBySubject,
  saveAsCandidateBySubject,
  activeValidationResultSubjects,
) {
  requireIsa(store, subject, "DataProvenanceReceipt");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const saveAsCandidateSubject = requireOne(store, subject, "saveAsCandidate");
  const saveAsCandidate = saveAsCandidateBySubject.get(saveAsCandidateSubject);
  if (!saveAsCandidate) {
    throw new Error(`${subject}.saveAsCandidate must reference an active DataSpace save-as candidate, got ${saveAsCandidateSubject}.`);
  }
  const baseAsset = requireOne(store, subject, "baseAsset");
  const baseAssetObject = assetBySubject.get(baseAsset);
  if (!baseAssetObject) {
    throw new Error(`${subject}.baseAsset must reference an active DataSpace asset, got ${baseAsset}.`);
  }
  if (baseAsset !== saveAsCandidate.baseAsset) {
    throw new Error(`${subject}.baseAsset must match ${saveAsCandidateSubject}.baseAsset, got ${baseAsset}.`);
  }
  const targetAsset = requireOne(store, subject, "targetAsset");
  if (!assetBySubject.has(targetAsset)) {
    throw new Error(`${subject}.targetAsset must reference an active DataSpace asset, got ${targetAsset}.`);
  }
  if (targetAsset !== saveAsCandidate.targetAsset) {
    throw new Error(`${subject}.targetAsset must match ${saveAsCandidateSubject}.targetAsset, got ${targetAsset}.`);
  }
  const targetPublication = store.one(subject, "targetPublication") || "";
  if (targetPublication) {
    const publication = publicationBySubject.get(targetPublication);
    if (!publication) {
      throw new Error(`${subject}.targetPublication must reference an active DataSpace publication, got ${targetPublication}.`);
    }
    if (publication.asset !== targetAsset) {
      throw new Error(`${subject}.targetPublication must publish targetAsset ${targetAsset}, got ${publication.asset}.`);
    }
    if (saveAsCandidate.targetPublication && targetPublication !== saveAsCandidate.targetPublication) {
      throw new Error(`${subject}.targetPublication must match ${saveAsCandidateSubject}.targetPublication, got ${targetPublication}.`);
    }
  }
  const baseSource = requireOne(store, subject, "baseSource");
  if (!sourceBySubject.has(baseSource)) {
    throw new Error(`${subject}.baseSource must reference an active DataSpace source, got ${baseSource}.`);
  }
  if (baseSource !== baseAssetObject.source) {
    throw new Error(`${subject}.baseSource must match ${baseAsset}.source, got ${baseSource}.`);
  }
  const sourceArtifact = requireOne(store, subject, "sourceArtifact");
  requireKnownSubject(store, sourceArtifact, `${subject}.sourceArtifact`);
  if (sourceArtifact !== baseAssetObject.sourceObject) {
    throw new Error(`${subject}.sourceArtifact must match ${baseAsset}.sourceObject, got ${sourceArtifact}.`);
  }
  const validationResult = requireOne(store, subject, "validationResult");
  if (!activeValidationResultSubjects.has(validationResult)) {
    throw new Error(`${subject}.validationResult must reference a DataSpace validationResult, got ${validationResult}.`);
  }
  if (validationResult !== saveAsCandidate.validationResult) {
    throw new Error(`${subject}.validationResult must match ${saveAsCandidateSubject}.validationResult, got ${validationResult}.`);
  }
  return {
    subject,
    dataSpace,
    saveAsCandidate: saveAsCandidateSubject,
    targetAsset,
    targetPublication,
    baseAsset,
    baseSource,
    sourceArtifact,
    author: requireOne(store, subject, "author"),
    timestamp: requireOne(store, subject, "timestamp"),
    validationResult,
    mutationReceipt: requireOne(store, subject, "mutationReceipt"),
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDraftRestoreAuditEntry(store, subject, receiptSubject, activeEditTargetSubjects) {
  requireIsa(store, subject, "DataDraftRestoreAuditEntry");
  const receipt = requireOne(store, subject, "receipt");
  if (receipt !== receiptSubject) {
    throw new Error(`${subject}.receipt must reference ${receiptSubject}, got ${receipt}.`);
  }
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);
  return {
    subject,
    receipt,
    editTarget,
    label: requireOne(store, subject, "label"),
    status: requireOne(store, subject, "status"),
    reason: requireOne(store, subject, "reason"),
    archivedValue: store.one(subject, "archivedValue") || "",
    currentDraftValue: store.one(subject, "currentDraftValue") || "",
    detail: store.one(subject, "detail") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseDraftRestoreReceipt(
  store,
  subject,
  dataSpaceSubject,
  overlayManagerSubject,
  activeEditTargetSubjects,
  activeAssetSubjects,
  activePreviewSubjects,
) {
  requireIsa(store, subject, "DataDraftRestoreReceipt");
  const dataSpace = requireOne(store, subject, "dataSpace");
  if (dataSpace !== dataSpaceSubject) {
    throw new Error(`${subject}.dataSpace must reference ${dataSpaceSubject}, got ${dataSpace}.`);
  }
  const overlayManager = requireOne(store, subject, "overlayManager");
  if (overlayManagerSubject && overlayManager !== overlayManagerSubject) {
    throw new Error(`${subject}.overlayManager must reference ${overlayManagerSubject}, got ${overlayManager}.`);
  }
  requireIsa(store, overlayManager, "DataOverlayManager", `${subject}.overlayManager ${overlayManager}`);
  const currentDraftStateSubject = requireOne(store, subject, "currentDraftState");
  const currentDraftStateObject = parseDraftState(store, currentDraftStateSubject, dataSpaceSubject, activeAssetSubjects);
  const archivedDraftStateSubject = requireOne(store, subject, "archivedDraftState");
  const archivedDraftStateObject = parseDraftState(store, archivedDraftStateSubject, dataSpaceSubject, activeAssetSubjects);
  if (archivedDraftStateObject.state !== "preview") {
    throw new Error(`${subject}.archivedDraftState must stay in preview state, got ${archivedDraftStateObject.state}.`);
  }
  const preview = requireOne(store, subject, "preview");
  if (!activePreviewSubjects.has(preview)) {
    throw new Error(`${subject}.preview must reference a DataSpace preview, got ${preview}.`);
  }
  const previewDraftState = store.one(preview, "draftState") || "";
  if (previewDraftState !== archivedDraftStateSubject) {
    throw new Error(`${subject}.preview must reference archived draft ${archivedDraftStateSubject}, got ${previewDraftState}.`);
  }
  const restorePolicy = requireOne(store, subject, "restorePolicy");
  if (!["requireCleanActiveDraft", "discardCurrentDraft", "mergeCurrentDraft"].includes(restorePolicy)) {
    throw new Error(`${subject}.restorePolicy must be a supported draft restore policy, got ${restorePolicy}.`);
  }
  const entrySubjects = store.objects(subject, "entry");
  const entries = entrySubjects
    .map(entry => parseDraftRestoreAuditEntry(store, entry, subject, activeEditTargetSubjects))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  return {
    subject,
    dataSpace,
    overlayManager,
    currentDraftState: currentDraftStateSubject,
    currentDraftStateObject,
    archivedDraftState: archivedDraftStateSubject,
    archivedDraftStateObject,
    preview,
    restorePolicy,
    state: requireOne(store, subject, "state"),
    message: store.one(subject, "message") || "",
    mutationReceipt: store.one(subject, "mutationReceipt") || "",
    entrySubjects,
    entries,
    order: Number(store.one(subject, "order") || "0"),
  };
}

export function parseResolvedProperty(store, subject, activeEditTargetSubjects, resolvedValueBySubject) {
  requireIsa(store, subject, "DataResolvedProperty");
  const editTarget = requireOne(store, subject, "editTarget");
  requireIsa(store, editTarget, "DataEditTarget", `${subject}.editTarget ${editTarget}`);
  requireActiveEditTarget(subject, editTarget, activeEditTargetSubjects);

  const resolvedValue = store.one(subject, "resolvedValue") || "";
  if (resolvedValue) {
    requireIsa(store, resolvedValue, "DataResolvedValue", `${subject}.resolvedValue ${resolvedValue}`);
    requireActiveResolvedValue(subject, resolvedValue, resolvedValueBySubject);
  }

  const candidateSubjects = store.objects(subject, "candidate");
  for (const candidate of candidateSubjects) {
    requireIsa(store, candidate, "DataResolvedValue", `${subject}.candidate ${candidate}`);
    requireActiveResolvedValue(subject, candidate, resolvedValueBySubject, "candidate");
  }

  const conflictSubjects = store.objects(subject, "conflict");
  for (const conflict of conflictSubjects) {
    requireIsa(store, conflict, "DataResolvedValue", `${subject}.conflict ${conflict}`);
    requireActiveResolvedValue(subject, conflict, resolvedValueBySubject, "conflict");
  }

  return {
    subject,
    editTarget,
    state: requireOne(store, subject, "state"),
    value: resolvedValue ? resolvedValueBySubject.get(resolvedValue) : null,
    resolvedValue,
    candidateSubjects,
    candidates: candidateSubjects.map(candidate => resolvedValueBySubject.get(candidate)),
    conflictSubjects,
    conflicts: conflictSubjects.map(conflict => resolvedValueBySubject.get(conflict)),
    effectiveValue: store.one(subject, "effectiveValue") || "",
    valueKind: store.one(subject, "valueKind") || "",
    sourceLayer: store.one(subject, "sourceLayer") || "",
    provider: store.one(subject, "provider") || "",
    validationState: store.one(subject, "validationState") || "",
    order: Number(store.one(subject, "order") || "0"),
  };
}

function candidateSignature(value) {
  return JSON.stringify([
    value.effectiveValue,
    value.valueKind,
    value.provider,
    value.validationState,
  ]);
}

export function resolvedPropertySignature(property) {
  return JSON.stringify({
    editTarget: property.editTarget,
    state: property.state,
    resolvedValue: property.value?.subject || property.resolvedValue || "",
    candidates: (property.candidates || []).map(candidate => candidate.subject),
    conflicts: (property.conflicts || []).map(conflict => conflict.subject),
    effectiveValue: property.value?.effectiveValue || property.effectiveValue || "",
    valueKind: property.value?.valueKind || property.valueKind || "",
    sourceLayer: property.value?.sourceLayer || property.sourceLayer || "",
    provider: property.value?.provider || property.provider || "",
    validationState: property.value?.validationState || property.validationState || "",
  });
}

export function annotateMaterializedProperties(materializedProperties, computedProperties) {
  const computedByTarget = new Map(computedProperties.map(property => [property.editTarget, property]));
  return materializedProperties.map(property => {
    const computed = computedByTarget.get(property.editTarget) || null;
    const materializationState = computed && resolvedPropertySignature(property) === resolvedPropertySignature(computed)
      ? "current"
      : "stale";
    const materializationMessage = materializationState === "current"
      ? ""
      : computed
        ? "Materialized DataResolvedProperty differs from current DataResolvedValue resolution."
        : "Materialized DataResolvedProperty has no current DataResolvedValue candidates.";

    return {
      ...property,
      computed,
      materializationState,
      materializationMessage,
      stale: materializationState === "stale",
    };
  });
}

function validationResult(dataSpaceSubject, validation, order, fields) {
  const scope = fields.scope || fields.checkedSubject || fields.editTarget || validation;
  return {
    subject: `validationResult.${suffixFor(dataSpaceSubject)}.${suffixFor(validation)}.${suffixFor(scope)}`,
    validation,
    editTarget: fields.editTarget || "",
    checkedSubject: fields.checkedSubject || "",
    state: fields.state,
    message: fields.message,
    sampleCount: fields.sampleCount || 0,
    order,
  };
}

function editTargetFor(dataSpace, target, predicate = "") {
  return dataSpace.editTargets.find(editTarget => (
    editTarget.target === target && (!predicate || editTarget.predicate === predicate)
  ))?.subject || "";
}

function fieldNameCandidates(field) {
  return new Set([
    field.subject,
    field.displayName,
    field.sourceField,
    field.sourceField.split(".").pop(),
  ].filter(Boolean));
}

function fieldForRule(dataSpace, rule) {
  if (rule.field) {
    return dataSpace.fields.find(field => field.subject === rule.field) || null;
  }
  if (!rule.fieldName) return null;
  return dataSpace.fields.find(field => (
    (!rule.asset || field.asset === rule.asset) && fieldNameCandidates(field).has(rule.fieldName)
  )) || null;
}

function numberOrNull(value) {
  if (value === "" || value == null) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function boolValue(value) {
  return value === true || value === "true";
}

function rulesForValidation(dataSpace, validation) {
  return dataSpace.validationRules.filter(rule => rule.validation === validation);
}

function validateReferenceInventory(dataSpace, validation, order) {
  const collections = {
    sourceReference: {
      items: dataSpace.sources,
      noun: "sources",
      message: "All data-space sources resolve to known source subjects.",
    },
    assetReference: {
      items: dataSpace.assets,
      noun: "assets",
      message: "All data-space assets resolve to known source objects.",
    },
    fieldReference: {
      items: dataSpace.fields,
      noun: "fields",
      message: "All data-space fields resolve to active assets and source fields.",
    },
  };
  const config = collections[validation];
  return validationResult(dataSpace.subject, validation, order, {
    checkedSubject: dataSpace.subject,
    state: config.items.length ? "valid" : "empty",
    message: config.items.length ? config.message : `DataSpace has no ${config.noun} to validate.`,
    sampleCount: config.items.length,
  });
}

function validateInferenceState(dataSpace, order) {
  const invalid = dataSpace.fields.find(field => ["rejected", "stale"].includes(field.inferenceState));
  const proposed = dataSpace.fields.find(field => field.inferenceState === "proposed");
  const state = invalid ? "invalid" : proposed ? "unknown" : dataSpace.fields.length ? "valid" : "empty";
  return validationResult(dataSpace.subject, "inferenceState", order, {
    checkedSubject: invalid?.subject || proposed?.subject || dataSpace.subject,
    editTarget: invalid || proposed ? editTargetFor(dataSpace, (invalid || proposed).subject) : "",
    state,
    message: invalid
      ? `${invalid.subject} has ${invalid.inferenceState} inference.`
      : proposed
        ? `${proposed.subject} still has proposed inference.`
        : dataSpace.fields.length
          ? "Field inference states are accepted, observed, inferred, or overridden."
          : "DataSpace has no fields to validate.",
    sampleCount: dataSpace.fields.length,
  });
}

function validateFieldTypeRule(dataSpace, rule, order) {
  const field = fieldForRule(dataSpace, rule);
  const actualType = field ? (field.authoredType || field.inferredType) : "";
  let state = "valid";
  let message = `${field?.subject || rule.fieldName} matches expected type ${rule.expectedType}.`;
  if (!field) {
    state = "invalid";
    message = `${rule.field || rule.fieldName || rule.subject} does not resolve to a DataField.`;
  } else if (!rule.expectedType) {
    state = "unknown";
    message = `${rule.subject} has no expectedType.`;
  } else if (!actualType) {
    state = "unknown";
    message = `${field.subject} has no authored or inferred type.`;
  } else if (actualType !== rule.expectedType) {
    state = "invalid";
    message = `${field.subject} type is ${actualType}, expected ${rule.expectedType}.`;
  }
  return validationResult(dataSpace.subject, "fieldType", order, {
    scope: rule.subject,
    editTarget: field ? editTargetFor(dataSpace, field.subject, "authoredType") : "",
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state,
    message,
    sampleCount: field ? 1 : 0,
  });
}

function validateRequiredFieldRule(dataSpace, rule, order) {
  const field = fieldForRule(dataSpace, rule);
  return validationResult(dataSpace.subject, "requiredField", order, {
    scope: rule.subject,
    editTarget: field ? editTargetFor(dataSpace, field.subject, "displayName") : "",
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state: field ? "valid" : "invalid",
    message: field
      ? `${rule.fieldName || field.subject} exists on ${field.asset}.`
      : `${rule.fieldName || rule.field || rule.subject} is required but was not found.`,
    sampleCount: field ? 1 : 0,
  });
}

function validateNonNullRule(dataSpace, rule, order) {
  const field = fieldForRule(dataSpace, rule);
  const nullCount = numberOrNull(field?.nullCount);
  let state = "valid";
  let message = `${field?.subject || rule.fieldName} has no observed nulls.`;
  if (!field) {
    state = "invalid";
    message = `${rule.field || rule.fieldName || rule.subject} does not resolve to a DataField.`;
  } else if (nullCount == null) {
    state = "unknown";
    message = `${field.subject} has no nullCount profile.`;
  } else if (nullCount > 0) {
    state = "invalid";
    message = `${field.subject} has ${nullCount} observed null values.`;
  }
  return validationResult(dataSpace.subject, "nonNull", order, {
    scope: rule.subject,
    editTarget: field ? editTargetFor(dataSpace, field.subject, "nullable") : "",
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state,
    message,
    sampleCount: nullCount || 0,
  });
}

function validateUniqueRule(dataSpace, rule, order) {
  const uniquenessKeys = Array.isArray(rule.uniquenessKeys) ? rule.uniquenessKeys : [];
  const keyFields = uniquenessKeys.map(key => dataSpace.fields.find(field => field.subject === key.field));
  const field = uniquenessKeys.length === 1
    ? keyFields[0]
    : fieldForRule(dataSpace, rule);
  const compositeKey = uniquenessKeys.length > 1;
  const keyLabels = uniquenessKeys.map((key, index) => (
    keyFields[index]?.displayName || key.label || key.field
  ));
  const matchingCompositeProfile = compositeKey
    ? (rule.compositeUniquenessProfiles || []).find(profile => {
      const profileKeySubjects = profile.keys.map(key => key.subject).sort();
      const ruleKeySubjects = uniquenessKeys.map(key => key.subject).sort();
      return profileKeySubjects.length === ruleKeySubjects.length
        && profileKeySubjects.every((keySubject, index) => keySubject === ruleKeySubjects[index]);
    }) || null
    : null;
  const duplicateCount = compositeKey
    ? numberOrNull(matchingCompositeProfile?.duplicateCount)
    : numberOrNull(field?.duplicateCount);
  let state = "valid";
  let message = `${field?.subject || rule.fieldName} has no observed duplicates.`;
  if (compositeKey ? keyFields.some(keyField => !keyField) : !field) {
    state = "invalid";
    message = `${rule.field || rule.fieldName || rule.subject} does not resolve to a DataField.`;
  } else if (compositeKey && !matchingCompositeProfile) {
    state = "unknown";
    message = `Composite uniqueness keys ${keyLabels.join(", ")} stay explicit, but current profile evidence only proves one field at a time.`;
  } else if (duplicateCount == null) {
    state = "unknown";
    message = compositeKey
      ? `${matchingCompositeProfile?.subject || rule.subject} has no composite duplicateCount profile.`
      : `${field.subject} has no duplicateCount profile.`;
  } else if (duplicateCount > 0) {
    state = "invalid";
    message = compositeKey
      ? `${matchingCompositeProfile?.label || matchingCompositeProfile?.subject || rule.subject} has ${duplicateCount} observed duplicate composite rows.`
      : `${field.subject} has ${duplicateCount} observed duplicate values.`;
  } else if (compositeKey) {
    message = `${matchingCompositeProfile?.label || "Composite key profile"} proves ${keyLabels.join(", ")} has no observed duplicate rows.`;
  }
  return validationResult(dataSpace.subject, "unique", order, {
    scope: rule.subject,
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state,
    message,
    sampleCount: compositeKey
      ? Number(matchingCompositeProfile?.sampleCount || duplicateCount || 0)
      : duplicateCount || 0,
  });
}

function validateRangeRule(dataSpace, rule, order) {
  const field = fieldForRule(dataSpace, rule);
  const observedMin = numberOrNull(field?.minObserved);
  const observedMax = numberOrNull(field?.maxObserved);
  const minValue = numberOrNull(rule.minValue);
  const maxValue = numberOrNull(rule.maxValue);
  let state = "valid";
  let message = `${field?.subject || rule.fieldName} observed range is within configured bounds.`;
  if (!field) {
    state = "invalid";
    message = `${rule.field || rule.fieldName || rule.subject} does not resolve to a DataField.`;
  } else if (observedMin == null || observedMax == null || (minValue == null && maxValue == null)) {
    state = "unknown";
    message = `${field.subject} does not have enough range profile or rule bounds.`;
  } else if ((minValue != null && observedMin < minValue) || (maxValue != null && observedMax > maxValue)) {
    state = "invalid";
    message = `${field.subject} observed range ${observedMin}..${observedMax} is outside configured bounds.`;
  }
  return validationResult(dataSpace.subject, "range", order, {
    scope: rule.subject,
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state,
    message,
    sampleCount: field ? 1 : 0,
  });
}

function validateAllowedValuesRule(dataSpace, rule, order) {
  const field = fieldForRule(dataSpace, rule);
  const allowedValues = new Set(rule.allowedValues);
  const observedValues = field?.observedValues || [];
  const invalidValues = observedValues.filter(value => !allowedValues.has(value));
  let state = "valid";
  let message = `${field?.subject || rule.fieldName} observed values are allowed.`;
  if (!field) {
    state = "invalid";
    message = `${rule.field || rule.fieldName || rule.subject} does not resolve to a DataField.`;
  } else if (!allowedValues.size || !observedValues.length) {
    state = "unknown";
    message = `${field.subject} does not have enough allowed-value rule data or observed values.`;
  } else if (invalidValues.length) {
    state = "invalid";
    message = `${field.subject} has disallowed observed value ${invalidValues[0]}.`;
  }
  return validationResult(dataSpace.subject, "allowedValues", order, {
    scope: rule.subject,
    checkedSubject: field?.subject || rule.asset || dataSpace.subject,
    state,
    message,
    sampleCount: invalidValues.length,
  });
}

function validateRuleBacked(dataSpace, validation, order, validateRule) {
  const rules = rulesForValidation(dataSpace, validation);
  if (!rules.length) {
    return [validationResult(dataSpace.subject, validation, order, {
      checkedSubject: dataSpace.subject,
      state: "empty",
      message: `DataSpace has no ${validation} validation rules.`,
      sampleCount: 0,
    })];
  }
  return rules.map((rule, index) => validateRule(dataSpace, rule, order + index));
}

export function resolveDataSpaceValues(dataSpace) {
  const precedence = layer => Object.hasOwn(DATA_RESOLUTION_PRECEDENCE, layer)
    ? DATA_RESOLUTION_PRECEDENCE[layer] : 0;
  const byEditTarget = new Map();
  for (const value of dataSpace.resolvedValues || []) {
    const bucket = byEditTarget.get(value.editTarget);
    if (bucket) {
      bucket.push(value);
      continue;
    }
    byEditTarget.set(value.editTarget, [value]);
  }

  return [...byEditTarget.entries()]
    .map(([editTarget, candidates]) => {
      const ranked = [...candidates].sort((a, b) => {
        const precedenceDelta = precedence(b.sourceLayer) - precedence(a.sourceLayer);
        return precedenceDelta || a.order - b.order || a.subject.localeCompare(b.subject);
      });
      const winningPrecedence = precedence(ranked[0].sourceLayer);
      const topCandidates = ranked.filter(value => (
        precedence(value.sourceLayer) === winningPrecedence
      ));
      const topSignatures = new Set(topCandidates.map(candidateSignature));
      const state = topSignatures.size > 1 ? "conflict" : ranked[0].validationState;
      return {
        editTarget,
        state,
        value: state === "conflict" ? null : ranked[0],
        candidates: ranked,
        conflicts: state === "conflict" ? topCandidates : [],
      };
    })
    .sort((a, b) => a.editTarget.localeCompare(b.editTarget));
}

export function computeDataResolvedPropertyFacts(dataSpace) {
  const spaceSubject = dataSpace.subject;
  return resolveDataSpaceValues(dataSpace).flatMap((property, index) => {
    const subject = `resolvedProperty.${suffixFor(spaceSubject)}.${suffixFor(property.editTarget)}`;
    const facts = [
      fact(spaceSubject, "resolvedProperty", subject),
      fact(subject, "isa", "DataResolvedProperty"),
      fact(subject, "editTarget", property.editTarget),
      fact(subject, "state", property.state),
      fact(subject, "order", index + 1),
      ...property.candidates.map(candidate => fact(subject, "candidate", candidate.subject)),
      ...property.conflicts.map(conflict => fact(subject, "conflict", conflict.subject)),
    ];

    if (property.value) {
      facts.push(
        fact(subject, "resolvedValue", property.value.subject),
        fact(subject, "effectiveValue", property.value.effectiveValue),
        fact(subject, "valueKind", property.value.valueKind),
        fact(subject, "sourceLayer", property.value.sourceLayer),
        fact(subject, "provider", property.value.provider),
        fact(subject, "validationState", property.value.validationState),
      );
    }

    return facts;
  });
}

export function computeDataValidationResults(store, dataSpaceSubject = null) {

  const dataSpace = parseDataSpaceConfig(store,
  dataSpaceSubject);

  const policyValidations = dataSpace.validationPolicy
    ? effectiveDataValidationsValue({
    validations:dataSpace.validationPolicy.validations
  })
    : DEFAULT_DATA_VALIDATIONS;

  const validators = {

    sourceReference: (order) => [validateReferenceInventory(dataSpace,
    "sourceReference",
    order)],

    assetReference: (order) => [validateReferenceInventory(dataSpace,
    "assetReference",
    order)],

    fieldReference: (order) => [validateReferenceInventory(dataSpace,
    "fieldReference",
    order)],

    fieldType: (order) => validateRuleBacked(dataSpace,
    "fieldType",
    order,
    validateFieldTypeRule),

    inferenceState: (order) => [validateInferenceState(dataSpace,
    order)],

    requiredField: (order) => validateRuleBacked(dataSpace,
    "requiredField",
    order,
    validateRequiredFieldRule),

    nonNull: (order) => validateRuleBacked(dataSpace,
    "nonNull",
    order,
    validateNonNullRule),

    unique: (order) => validateRuleBacked(dataSpace,
    "unique",
    order,
    validateUniqueRule),

    range: (order) => validateRuleBacked(dataSpace,
    "range",
    order,
    validateRangeRule),

    allowedValues: (order) => validateRuleBacked(dataSpace,
    "allowedValues",
    order,
    validateAllowedValuesRule),

  };

  let order = 1;

  const results = [];

  for (const validation of policyValidations) {

    const scopedResults = validators[validation](order);

    results.push(...scopedResults);

    order += scopedResults.length;

  }
  return results;

}

export function computeDataValidationResultFacts(store, dataSpaceSubject = null) {
  const subject = normalizeParseOptions(dataSpaceSubject).dataSpaceSubject
    || store.distinctSubjects("isa", "DataSpace")[0]
    || "";
  return computeDataValidationResults(store, subject).flatMap(result => {
    const facts = [
      fact(subject, "validationResult", result.subject),
      fact(result.subject, "isa", "DataValidationResult"),
      fact(result.subject, "validation", result.validation),
      fact(result.subject, "state", result.state),
      fact(result.subject, "message", result.message),
      fact(result.subject, "sampleCount", result.sampleCount),
      fact(result.subject, "order", result.order),
    ];
    if (result.editTarget) facts.push(fact(result.subject, "editTarget", result.editTarget));
    if (result.checkedSubject) facts.push(fact(result.subject, "checkedSubject", result.checkedSubject));
    return facts;
  });
}

const ORDER_VALUE_BAND_DERIVE_EXPRESSION = /^\s*if\s*\(\s*order_total\s*>=\s*(\d+(?:\.\d+)?)\s*,\s*'([^']*)'\s*,\s*if\s*\(\s*order_total\s*>=\s*(\d+(?:\.\d+)?)\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\)\s*\)\s*$/;

export function parseOrderValueBandDeriveExpression(expression) {
  const match = ORDER_VALUE_BAND_DERIVE_EXPRESSION.exec(String(expression || ""));
  if (!match) return null;
  return {
    highThreshold: Number(match[1]),
    highValue: match[2],
    mediumThreshold: Number(match[3]),
    mediumValue: match[4],
    lowValue: match[5],
  };
}

export function evaluateOrderValueBandDerive(value, expression) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return "";
  if (numeric >= expression.highThreshold) return expression.highValue;
  if (numeric >= expression.mediumThreshold) return expression.mediumValue;
  return expression.lowValue;
}

function derivedValidationResultSubjectForTransform(store, transform) {
  return store.subjects("checkedSubject", transform)
    .find(subject => store.one(subject, "validation") === "transformOutput")
    || transform.replace(/^transform\./, "validationResult.");
}

function derivedValidationResultSubjectForRule(store, rule) {
  return store.subjects("checkedSubject", rule)
    .find(subject => store.one(subject, "validation") === "nonNull")
    || rule.replace(/^validationRule\./, "validationResult.");
}

function derivedOrderValueBandCellSubject(grid, row) {
  const rowToken = String(row.rowKey || row.subject).replace(/^order_id=/, "").replace(/[^A-Za-z0-9_.-]+/g, "_");
  return `${grid.subject.replace(/^sampleGrid\./, "sampleGridCell.")}.${rowToken}.orderValueBand`;
}

function derivedOrderValueBandSampleFailureSubject(rule, row) {
  const rowToken = String(row.rowKey || row.subject).replace(/^order_id=/, "row").replace(/[^A-Za-z0-9_.-]+/g, "_");
  return `${rule.replace(/^validationRule\./, "sampleFailure.").replace(/NonNull$/, "")}.${rowToken}`;
}

export function authoredOrderValueBandPreviewContext(store, dataSpaceSubject) {
  const dataSpace = parseDataSpaceConfig(store, dataSpaceSubject);
  const contexts = [];
  for (const transform of dataSpace.transforms || []) {
    if (transform.transformKind !== "derive") continue;
    const config = transform.steps?.[0]?.configs?.find(item => item.configKind === "expression") || null;
    if (!config || config.inputs.length !== 1) continue;
    const input = config.inputs[0];
    if (input.bindingKind !== "field" || !input.field) continue;
    const outputField = (dataSpace.fields || []).find(field => (
      field.asset === transform.asset && field.sourceField === config.subject
    ));
    if (!outputField) continue;
    const outputRule = (dataSpace.validationRules || []).find(rule => (
      rule.validation === "nonNull"
      && rule.field === outputField.subject
      && (rule.nullable === "false" || outputField.nullable === "false")
    ));
    const sampleGrid = (dataSpace.sampleGrids || []).find(grid => (
      grid.asset === transform.asset
      && grid.rows.some(row => row.cells.some(cell => cell.field === input.field))
    ));
    if (!sampleGrid) continue;
    contexts.push({
      dataSpace,
      transform,
      config,
      inputField: input.field,
      outputField: outputField.subject,
      outputRule,
      sampleGrid,
    });
  }
  return contexts;
}

export function computeDerivedOrderValueBandFacts(store, dataSpaceSubject, context) {
  const facts = [];
  const transformResultSubject = derivedValidationResultSubjectForTransform(store, context.transform.subject);
  const expression = parseOrderValueBandDeriveExpression(context.config.expression);
  const transformResultOrder = store.one(transformResultSubject, "order") || "12";
  facts.push(
    fact(dataSpaceSubject, "validationResult", transformResultSubject),
    fact(transformResultSubject, "isa", "DataValidationResult"),
    fact(transformResultSubject, "validation", "transformOutput"),
    fact(transformResultSubject, "checkedSubject", context.transform.subject),
    fact(transformResultSubject, "order", transformResultOrder),
  );
  if (!expression) {
    facts.push(
      fact(transformResultSubject, "state", "invalid"),
      fact(transformResultSubject, "message", `Unsupported derive expression for ${context.transform.label}.`),
      fact(transformResultSubject, "sampleCount", "0"),
    );
    return facts;
  }

  const computedRows = context.sampleGrid.rows.map(row => {
    const inputCell = row.cells.find(cell => cell.field === context.inputField) || null;
    const output = evaluateOrderValueBandDerive(inputCell?.value || "", expression);
    return {
      row,
      value: output,
      valueState: output ? "valid" : "invalid",
    };
  });
  const failures = computedRows.filter(row => !row.value);
  facts.push(
    fact(transformResultSubject, "state", failures.length ? "invalid" : "valid"),
    fact(transformResultSubject, "message", failures.length
      ? "Derived output preview found missing order value bands on sampled rows."
      : "Derived output preview computed order value band on sampled rows."),
    fact(transformResultSubject, "sampleCount", computedRows.length),
  );

  for (const computed of computedRows) {
    const cellSubject = derivedOrderValueBandCellSubject(context.sampleGrid, computed.row);
    const order = Math.max(0, ...computed.row.cells.map(cell => Number(cell.order || 0))) + 1;
    facts.push(
      fact(computed.row.subject, "cell", cellSubject),
      fact(cellSubject, "isa", "DataSampleGridCell"),
      fact(cellSubject, "row", computed.row.subject),
      fact(cellSubject, "field", context.outputField),
      fact(cellSubject, "value", computed.value),
      fact(cellSubject, "valueState", computed.valueState),
      fact(cellSubject, "order", order),
    );
  }

  if (!context.outputRule) return facts;

  const ruleResultSubject = derivedValidationResultSubjectForRule(store, context.outputRule.subject);
  const ruleResultOrder = store.one(ruleResultSubject, "order") || "13";
  facts.push(
    fact(dataSpaceSubject, "validationResult", ruleResultSubject),
    fact(ruleResultSubject, "isa", "DataValidationResult"),
    fact(ruleResultSubject, "validation", "nonNull"),
    fact(ruleResultSubject, "checkedSubject", context.outputRule.subject),
    fact(ruleResultSubject, "state", failures.length ? "invalid" : "valid"),
    fact(ruleResultSubject, "message", failures.length
      ? `${failures.length === 1 ? "One sampled derived row is" : `${failures.length} sampled derived rows are`} missing order value band.`
      : "All sampled derived rows have order value band."),
    fact(ruleResultSubject, "sampleCount", computedRows.length),
    fact(ruleResultSubject, "order", ruleResultOrder),
  );

  failures.forEach((failure, index) => {
    const sampleFailureSubject = derivedOrderValueBandSampleFailureSubject(context.outputRule.subject, failure.row);
    facts.push(
      fact(ruleResultSubject, "sampleFailure", sampleFailureSubject),
      fact(sampleFailureSubject, "isa", "DataValidationSampleFailure"),
      fact(sampleFailureSubject, "validationResult", ruleResultSubject),
      fact(sampleFailureSubject, "rule", context.outputRule.subject),
      fact(sampleFailureSubject, "field", context.outputField),
      fact(sampleFailureSubject, "rowKey", failure.row.rowKey),
      fact(sampleFailureSubject, "observedValue", ""),
      fact(sampleFailureSubject, "reason", "Derived expression returned an empty band for a sampled row with no order total."),
      fact(sampleFailureSubject, "label", "Missing derived value band"),
      fact(sampleFailureSubject, "order", index + 1),
    );
  });

  return facts;
}

export function computeDataTransformPreviewFacts(store, dataSpaceSubject = null) {
  const subject = normalizeParseOptions(dataSpaceSubject).dataSpaceSubject
    || store.distinctSubjects("isa", "DataSpace")[0]
    || "";
  return authoredOrderValueBandPreviewContext(store, subject)
    .flatMap(context => computeDerivedOrderValueBandFacts(store, subject, context));
}

export function parseDataSpaceConfig(store, dataSpaceSubjectOrOptions = null, maybeOptions = null) {
  const options = normalizeParseOptions(dataSpaceSubjectOrOptions, maybeOptions);
  const sourceFactTypes = sourceFactTypesForStore(store, options.sourceFactTypes);
  const dataSpaceSubject = options.dataSpaceSubject;
  const subject = dataSpaceSubject || store.distinctSubjects("isa", "DataSpace")[0] || "";
  if (!subject) throw new Error("No DataSpace subject found.");
  requireIsa(store, subject, "DataSpace");

  const sources = store.objects(subject, "source").map(source => parseSource(store, source));
  if (!sources.length) throw new Error(`${subject} must declare at least one source.`);
  const activeSourceSubjects = new Set(sources.map(source => source.subject));
  const sourceBySubject = new Map(sources.map(source => [source.subject, source]));

  const assets = store.objects(subject, "asset").map(asset => parseAsset(store, asset, sourceBySubject));
  if (!assets.length) throw new Error(`${subject} must declare at least one asset.`);
  const activeAssetSubjects = new Set(assets.map(asset => asset.subject));
  const assetBySubject = new Map(assets.map(asset => [asset.subject, asset]));
  const catalogNodes = parseCatalogNodes(store, subject, sources, sourceBySubject, assets, assetBySubject);
  const catalogNodeBySubject = new Map(catalogNodes.map(node => [node.subject, node]));

  const fields = store.distinctSubjects("isa", "DataField")
    .map(field => parseField(store, field))
    .filter(field => assets.some(asset => asset.subject === field.asset));
  for (const field of fields) {
    requireDataFieldSourceCompatibility(store, field, assetBySubject);
  }
  const activeFieldSubjects = new Set(fields.map(field => field.subject));
  const fieldBySubject = new Map(fields.map(field => [field.subject, field]));
  const fieldProfileSummaries = store.objects(subject, "fieldProfileSummary")
    .map(summary => parseFieldProfileSummary(store, summary, activeFieldSubjects))
    .sort((a, b) => a.order - b.order || a.field.localeCompare(b.field));
  const fieldProfileSummaryBySubject = new Map(fieldProfileSummaries.map(summary => [summary.subject, summary]));
  for (const field of fields) {
    const declaredSummaries = field.profileSummarySubjects.map(summarySubject => {
      const summary = fieldProfileSummaryBySubject.get(summarySubject);
      if (!summary) {
        throw new Error(`${field.subject}.profileSummary must reference an active DataFieldProfileSummary, got ${summarySubject}.`);
      }
      if (summary.field !== field.subject) {
        throw new Error(`${field.subject}.profileSummary ${summarySubject} must reference profile summary for ${field.subject}, got ${summary.field}.`);
      }
      return summary;
    });
    const inferredSummaries = fieldProfileSummaries.filter(summary => (
      summary.field === field.subject && !field.profileSummarySubjects.includes(summary.subject)
    ));
    field.profileSummaries = (declaredSummaries.length ? declaredSummaries : inferredSummaries)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const issues = store.objects(subject, "issue")
    .map(issue => parseIssue(store, issue, activeAssetSubjects, activeFieldSubjects));
  const activeIssueSubjects = new Set(issues.map(issue => issue.subject));
  const issueSuppressions = store.objects(subject, "issueSuppression")
    .map(issueSuppression => parseIssueSuppression(store, issueSuppression, subject, activeIssueSubjects))
    .sort((a, b) => a.issue.localeCompare(b.issue)
      || a.precedenceRank - b.precedenceRank
      || a.order - b.order
      || a.subject.localeCompare(b.subject));
  const issueSuppressionBySubject = new Map(issueSuppressions.map(issueSuppression => [issueSuppression.subject, issueSuppression]));
  const issueSuppressionsByIssue = new Map();
  for (const issueSuppression of issueSuppressions) {
    const current = issueSuppressionsByIssue.get(issueSuppression.issue) || [];
    current.push(issueSuppression);
    issueSuppressionsByIssue.set(issueSuppression.issue, current);
  }
  const derivedIssues = issues.map(issue => {
    if (issue.suppressionMode !== "exceptionObject") return issue;
    const suppressionRecords = issueSuppressionsByIssue.get(issue.subject) || [];
    const activeSuppression = resolveEffectiveIssueSuppression(suppressionRecords);
    return {
      ...issue,
      authoredState: issue.state,
      authoredSuppressionReason: issue.suppressionReason,
      suppressionRecords,
      suppressionSubject: activeSuppression?.subject || "",
      suppressionPrecedenceRank: activeSuppression?.precedenceRank || 0,
      suppressionMergePolicy: suppressionRecords.length ? ISSUE_SUPPRESSION_MERGE_POLICY : "",
      state: activeSuppression?.state === "suppressed" ? "suppressed" : "open",
      suppressionReason: activeSuppression?.state === "suppressed" ? activeSuppression.reason : "",
    };
  });
  const derivedIssueBySubject = new Map(derivedIssues.map(issue => [issue.subject, issue]));

  const defaultAsset = store.one(subject, "defaultAsset") || "";
  if (defaultAsset) requireIsa(store, defaultAsset, "DataAsset", `${subject}.defaultAsset ${defaultAsset}`);

  const editTargets = store.objects(subject, "editTarget")
    .map(target => parseEditTarget(store, target))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const activeEditTargetSubjects = new Set(editTargets.map(target => target.subject));
  const editTargetBySubject = new Map(editTargets.map(target => [target.subject, target]));
  const valueProviders = store.objects(subject, "valueProvider")
    .map(valueProvider => parseValueProvider(store, valueProvider, activeEditTargetSubjects))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const activeProviderSubjects = new Set([
    subject,
    ...sources.flatMap(source => [source.subject, source.source]),
    ...assets.flatMap(asset => [asset.subject, asset.sourceObject]),
    ...catalogNodes.flatMap(node => [node.subject, node.sourceObject].filter(Boolean)),
    ...fields.flatMap(field => [field.subject, field.sourceField]),
    ...editTargets.map(target => target.subject),
    ...valueProviders.map(provider => provider.subject),
  ]);

  const resolvedValues = store.objects(subject, "resolvedValue")
    .map(resolvedValue => parseResolvedValue(
      store,
      resolvedValue,
      activeEditTargetSubjects,
      activeProviderSubjects,
      sourceFactTypes,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const resolvedValueBySubject = new Map(resolvedValues.map(value => [value.subject, value]));
  const materializedResolvedProperties = store.objects(subject, "resolvedProperty")
    .map(property => parseResolvedProperty(
      store,
      property,
      activeEditTargetSubjects,
      resolvedValueBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.editTarget.localeCompare(b.editTarget));
  const computedResolvedProperties = resolveDataSpaceValues({ resolvedValues });
  const annotatedMaterializedResolvedProperties = annotateMaterializedProperties(
    materializedResolvedProperties,
    computedResolvedProperties,
  );
  const resolvedProperties = annotatedMaterializedResolvedProperties.length
    ? annotatedMaterializedResolvedProperties
    : computedResolvedProperties;
  const staleResolvedProperties = annotatedMaterializedResolvedProperties
    .filter(property => property.materializationState === "stale");
  const resolvedPropertyByEditTarget = new Map(resolvedProperties.map(property => [property.editTarget, property]));

  const validationPolicySubject = store.one(subject, "validationPolicy") || "";
  const validationPolicy = validationPolicySubject
    ? parseValidationPolicy(store, validationPolicySubject)
    : null;
  const validationRules = store.objects(subject, "validationRule")
    .map(rule => parseValidationRule(store, rule))
    .sort((a, b) => a.order - b.order || a.validation.localeCompare(b.validation));
  const activeValidationRuleSubjects = new Set(validationRules.map(rule => rule.subject));
  const uniquenessKeys = store.distinctSubjects("isa", "DataUniquenessKey")
    .map(key => parseUniquenessKey(store, key, activeValidationRuleSubjects, activeFieldSubjects))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const uniquenessKeyBySubject = new Map(uniquenessKeys.map(key => [key.subject, key]));
  const compositeUniquenessProfiles = store.distinctSubjects("isa", "DataCompositeUniquenessProfile")
    .map(profile => parseCompositeUniquenessProfile(
      store,
      profile,
      activeValidationRuleSubjects,
      uniquenessKeyBySubject,
      activeFieldSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const compositeUniquenessProfileBySubject = new Map(
    compositeUniquenessProfiles.map(profile => [profile.subject, profile]),
  );
  const compositeUniquenessProfileScopeBySubject = new Map(
    compositeUniquenessProfiles
      .filter(profile => profile.scope)
      .map(profile => [profile.scope.subject, profile.scope]),
  );
  for (const profile of compositeUniquenessProfiles) {
    if (!profile.scope) continue;
    profile.scope.lineages = profile.scope.lineageSubjects
      .map(lineageSubject => parseCompositeUniquenessProfileScopeLineage(
        store,
        lineageSubject,
        profile.scope.subject,
        compositeUniquenessProfileScopeBySubject,
        compositeUniquenessProfileBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const allowedValueEntries = store.distinctSubjects("isa", "DataAllowedValueEntry")
    .map(entry => parseAllowedValueEntry(store, entry, activeValidationRuleSubjects))
    .sort((a, b) => a.order - b.order || a.value.localeCompare(b.value));
  const allowedValueEntryBySubject = new Map(allowedValueEntries.map(entry => [entry.subject, entry]));
  const allowedValueCandidates = store.distinctSubjects("isa", "DataAllowedValueCandidate")
    .map(candidate => parseAllowedValueCandidate(store, candidate, activeValidationRuleSubjects))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const allowedValueCandidateBySubject = new Map(allowedValueCandidates.map(candidate => [candidate.subject, candidate]));
  const allowedValueCandidatePromotions = store.distinctSubjects("isa", "DataAllowedValueCandidatePromotion")
    .map(promotion => parseAllowedValueCandidatePromotion(
      store,
      promotion,
      activeValidationRuleSubjects,
      allowedValueCandidateBySubject,
      allowedValueEntryBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const allowedValueCandidatePromotionBySubject = new Map(
    allowedValueCandidatePromotions.map(promotion => [promotion.subject, promotion]),
  );
  for (const rule of validationRules) {
    const declaredKeys = rule.uniquenessKeySubjects.map(keySubject => {
      const key = uniquenessKeyBySubject.get(keySubject);
      if (!key) {
        throw new Error(`${rule.subject}.uniquenessKey must reference an active DataUniquenessKey, got ${keySubject}.`);
      }
      if (key.rule !== rule.subject) {
        throw new Error(`${rule.subject}.uniquenessKey ${keySubject} must reference a uniqueness key for ${rule.subject}, got ${key.rule}.`);
      }
      return key;
    });
    const inferredKeys = uniquenessKeys.filter(key => (
      key.rule === rule.subject && !rule.uniquenessKeySubjects.includes(key.subject)
    ));
    rule.uniquenessKeys = (declaredKeys.length ? declaredKeys : inferredKeys)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredCompositeProfiles = rule.compositeUniquenessProfileSubjects.map(profileSubject => {
      const profile = compositeUniquenessProfileBySubject.get(profileSubject);
      if (!profile) {
        throw new Error(`${rule.subject}.compositeUniquenessProfile must reference an active DataCompositeUniquenessProfile, got ${profileSubject}.`);
      }
      if (profile.rule !== rule.subject) {
        throw new Error(`${rule.subject}.compositeUniquenessProfile ${profileSubject} must reference a composite profile for ${rule.subject}, got ${profile.rule}.`);
      }
      return profile;
    });
    const inferredCompositeProfiles = compositeUniquenessProfiles.filter(profile => (
      profile.rule === rule.subject && !rule.compositeUniquenessProfileSubjects.includes(profile.subject)
    ));
    rule.compositeUniquenessProfiles = (declaredCompositeProfiles.length ? declaredCompositeProfiles : inferredCompositeProfiles)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));

    const declaredEntries = rule.allowedValueEntrySubjects.map(entrySubject => {
      const entry = allowedValueEntryBySubject.get(entrySubject);
      if (!entry) {
        throw new Error(`${rule.subject}.allowedValueEntry must reference an active DataAllowedValueEntry, got ${entrySubject}.`);
      }
      if (entry.rule !== rule.subject) {
        throw new Error(`${rule.subject}.allowedValueEntry ${entrySubject} must reference a value entry for ${rule.subject}, got ${entry.rule}.`);
      }
      return entry;
    });
    const inferredEntries = allowedValueEntries.filter(entry => (
      entry.rule === rule.subject && !rule.allowedValueEntrySubjects.includes(entry.subject)
    ));
    const effectiveEntries = declaredEntries.length ? declaredEntries : inferredEntries;
    rule.allowedValueEntries = effectiveEntries;
    const declaredCandidates = rule.allowedValueCandidateSubjects.map(candidateSubject => {
      const candidate = allowedValueCandidateBySubject.get(candidateSubject);
      if (!candidate) {
        throw new Error(`${rule.subject}.allowedValueCandidate must reference an active DataAllowedValueCandidate, got ${candidateSubject}.`);
      }
      if (candidate.rule !== rule.subject) {
        throw new Error(`${rule.subject}.allowedValueCandidate ${candidateSubject} must reference a candidate for ${rule.subject}, got ${candidate.rule}.`);
      }
      return candidate;
    });
    const inferredCandidates = allowedValueCandidates.filter(candidate => (
      candidate.rule === rule.subject && !rule.allowedValueCandidateSubjects.includes(candidate.subject)
    ));
    rule.allowedValueCandidates = (declaredCandidates.length ? declaredCandidates : inferredCandidates)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredPromotions = rule.allowedValueCandidatePromotionSubjects.map(promotionSubject => {
      const promotion = allowedValueCandidatePromotionBySubject.get(promotionSubject);
      if (!promotion) {
        throw new Error(`${rule.subject}.allowedValueCandidatePromotion must reference an active DataAllowedValueCandidatePromotion, got ${promotionSubject}.`);
      }
      if (promotion.rule !== rule.subject) {
        throw new Error(`${rule.subject}.allowedValueCandidatePromotion ${promotionSubject} must reference a candidate promotion for ${rule.subject}, got ${promotion.rule}.`);
      }
      return promotion;
    });
    const inferredPromotions = allowedValueCandidatePromotions.filter(promotion => (
      promotion.rule === rule.subject && !rule.allowedValueCandidatePromotionSubjects.includes(promotion.subject)
    ));
    rule.allowedValueCandidatePromotions = (declaredPromotions.length ? declaredPromotions : inferredPromotions)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    rule.allowedValues = unique([
      ...rule.rawAllowedValues,
      ...effectiveEntries
        .filter(entry => entry.state === "present")
        .map(entry => entry.value),
    ]);
  }
  const validationResults = store.objects(subject, "validationResult")
    .map(result => parseValidationResult(store, result, activeEditTargetSubjects))
    .sort((a, b) => a.order - b.order || a.validation.localeCompare(b.validation));
  const activeValidationResultSubjects = new Set(validationResults.map(result => result.subject));
  const validationSampleFailures = store.distinctSubjects("isa", "DataValidationSampleFailure")
    .map(failure => parseValidationSampleFailure(
      store,
      failure,
      activeValidationResultSubjects,
      activeValidationRuleSubjects,
      activeFieldSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const validationSampleFailureBySubject = new Map(
    validationSampleFailures.map(failure => [failure.subject, failure]),
  );
  for (const result of validationResults) {
    const declaredFailures = result.sampleFailureSubjects.map(failureSubject => {
      const failure = validationSampleFailureBySubject.get(failureSubject);
      if (!failure) {
        throw new Error(`${result.subject}.sampleFailure must reference an active DataValidationSampleFailure, got ${failureSubject}.`);
      }
      if (failure.validationResult !== result.subject) {
        throw new Error(`${result.subject}.sampleFailure ${failureSubject} must reference sample failure for ${result.subject}, got ${failure.validationResult}.`);
      }
      return failure;
    });
    const inferredFailures = validationSampleFailures.filter(failure => (
      failure.validationResult === result.subject && !result.sampleFailureSubjects.includes(failure.subject)
    ));
    result.sampleFailures = (declaredFailures.length ? declaredFailures : inferredFailures)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const assetSamplePolicies = store.objects(subject, "assetSamplePolicy")
    .map(policy => parseAssetSamplePolicy(store, policy, activeAssetSubjects))
    .sort((a, b) => a.order - b.order || a.policy.localeCompare(b.policy));
  const assetVisibilityPolicies = store.objects(subject, "assetVisibilityPolicy")
    .map(policy => parseAssetVisibilityPolicy(store, policy, activeAssetSubjects))
    .sort((a, b) => a.order - b.order || a.policy.localeCompare(b.policy));
  const assetSamplePoliciesBySubject = new Map(assetSamplePolicies.map(policy => [policy.subject, policy]));
  const assetVisibilityPoliciesBySubject = new Map(assetVisibilityPolicies.map(policy => [policy.subject, policy]));
  const assetSamplePolicyExceptions = store.distinctSubjects("isa", "DataAssetSamplePolicyException")
    .map(exception => parseAssetSamplePolicyException(
      store,
      exception,
      assetSamplePoliciesBySubject,
      activeFieldSubjects,
    ))
    .sort((a, b) => a.precedenceRank - b.precedenceRank || a.order - b.order || a.subject.localeCompare(b.subject));
  const assetSamplePolicyExceptionsBySubject = new Map(
    assetSamplePolicyExceptions.map(exception => [exception.subject, exception]),
  );
  const assetSamplePolicyMerges = store.distinctSubjects("isa", "DataAssetSamplePolicyMerge")
    .map(merge => parseAssetSamplePolicyMerge(
      store,
      merge,
      assetSamplePoliciesBySubject,
      assetSamplePolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetSamplePolicyMergesBySubject = new Map(
    assetSamplePolicyMerges.map(merge => [merge.subject, merge]),
  );
  const assetSamplePolicyMergeSelections = store.distinctSubjects("isa", "DataAssetSamplePolicyMergeSelection")
    .map(selection => parseAssetSamplePolicyMergeSelection(
      store,
      selection,
      assetSamplePolicyMergesBySubject,
      assetSamplePolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetSamplePolicyMergeSelectionsBySubject = new Map(
    assetSamplePolicyMergeSelections.map(selection => [selection.subject, selection]),
  );
  const assetSamplePolicyMergeResults = store.distinctSubjects("isa", "DataAssetSamplePolicyMergeResult")
    .map(result => parseAssetSamplePolicyMergeResult(
      store,
      result,
      assetSamplePolicyMergesBySubject,
      assetSamplePolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetSamplePolicyMergeResultsBySubject = new Map(
    assetSamplePolicyMergeResults.map(result => [result.subject, result]),
  );
  for (const policy of assetSamplePolicies) {
    const declaredExceptions = policy.exceptionSubjects.map(exceptionSubject => {
      const exception = assetSamplePolicyExceptionsBySubject.get(exceptionSubject);
      if (!exception) {
        throw new Error(`${policy.subject}.exception must reference an active DataAssetSamplePolicyException, got ${exceptionSubject}.`);
      }
      if (exception.policy !== policy.subject) {
        throw new Error(`${policy.subject}.exception ${exceptionSubject} must reference an exception for ${policy.subject}, got ${exception.policy}.`);
      }
      return exception;
    });
    const inferredExceptions = assetSamplePolicyExceptions.filter(exception => (
      exception.policy === policy.subject && !policy.exceptionSubjects.includes(exception.subject)
    ));
    policy.exceptions = (declaredExceptions.length ? declaredExceptions : inferredExceptions)
      .sort((a, b) => a.precedenceRank - b.precedenceRank || a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredMerges = policy.mergeSubjects.map(mergeSubject => {
      const merge = assetSamplePolicyMergesBySubject.get(mergeSubject);
      if (!merge) {
        throw new Error(`${policy.subject}.merge must reference an active DataAssetSamplePolicyMerge, got ${mergeSubject}.`);
      }
      if (merge.policy !== policy.subject) {
        throw new Error(`${policy.subject}.merge ${mergeSubject} must reference a merge for ${policy.subject}, got ${merge.policy}.`);
      }
      return merge;
    });
    const inferredMerges = assetSamplePolicyMerges.filter(merge => (
      merge.policy === policy.subject && !policy.mergeSubjects.includes(merge.subject)
    ));
    policy.merges = (declaredMerges.length ? declaredMerges : inferredMerges)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  for (const merge of assetSamplePolicyMerges) {
    const declaredSelections = merge.selectionSubjects.map(selectionSubject => {
      const selection = assetSamplePolicyMergeSelectionsBySubject.get(selectionSubject);
      if (!selection) {
        throw new Error(`${merge.subject}.selection must reference an active DataAssetSamplePolicyMergeSelection, got ${selectionSubject}.`);
      }
      if (selection.merge !== merge.subject) {
        throw new Error(`${merge.subject}.selection ${selectionSubject} must reference a selection for ${merge.subject}, got ${selection.merge}.`);
      }
      return selection;
    });
    const inferredSelections = assetSamplePolicyMergeSelections.filter(selection => (
      selection.merge === merge.subject && !merge.selectionSubjects.includes(selection.subject)
    ));
    merge.selections = (declaredSelections.length ? declaredSelections : inferredSelections)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredResults = merge.resultSubjects.map(resultSubject => {
      const result = assetSamplePolicyMergeResultsBySubject.get(resultSubject);
      if (!result) {
        throw new Error(`${merge.subject}.result must reference an active DataAssetSamplePolicyMergeResult, got ${resultSubject}.`);
      }
      if (result.merge !== merge.subject) {
        throw new Error(`${merge.subject}.result ${resultSubject} must reference a result for ${merge.subject}, got ${result.merge}.`);
      }
      return result;
    });
    const inferredResults = assetSamplePolicyMergeResults.filter(result => (
      result.merge === merge.subject && !merge.resultSubjects.includes(result.subject)
    ));
    merge.results = (declaredResults.length ? declaredResults : inferredResults)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const assetVisibilityPolicyExceptions = store.distinctSubjects("isa", "DataAssetVisibilityPolicyException")
    .map(exception => parseAssetVisibilityPolicyException(
      store,
      exception,
      assetVisibilityPoliciesBySubject,
      activeFieldSubjects,
    ))
    .sort((a, b) => a.precedenceRank - b.precedenceRank || a.order - b.order || a.subject.localeCompare(b.subject));
  const assetVisibilityPolicyExceptionsBySubject = new Map(
    assetVisibilityPolicyExceptions.map(exception => [exception.subject, exception]),
  );
  const assetVisibilityPolicyMerges = store.distinctSubjects("isa", "DataAssetVisibilityPolicyMerge")
    .map(merge => parseAssetVisibilityPolicyMerge(
      store,
      merge,
      assetVisibilityPoliciesBySubject,
      assetVisibilityPolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetVisibilityPolicyMergesBySubject = new Map(
    assetVisibilityPolicyMerges.map(merge => [merge.subject, merge]),
  );
  const assetVisibilityPolicyMergeSelections = store.distinctSubjects("isa", "DataAssetVisibilityPolicyMergeSelection")
    .map(selection => parseAssetVisibilityPolicyMergeSelection(
      store,
      selection,
      assetVisibilityPolicyMergesBySubject,
      assetVisibilityPolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetVisibilityPolicyMergeSelectionsBySubject = new Map(
    assetVisibilityPolicyMergeSelections.map(selection => [selection.subject, selection]),
  );
  const assetVisibilityPolicyMergeResults = store.distinctSubjects("isa", "DataAssetVisibilityPolicyMergeResult")
    .map(result => parseAssetVisibilityPolicyMergeResult(
      store,
      result,
      assetVisibilityPolicyMergesBySubject,
      assetVisibilityPolicyExceptionsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetVisibilityPolicyMergeResultsBySubject = new Map(
    assetVisibilityPolicyMergeResults.map(result => [result.subject, result]),
  );
  for (const policy of assetVisibilityPolicies) {
    const declaredExceptions = policy.exceptionSubjects.map(exceptionSubject => {
      const exception = assetVisibilityPolicyExceptionsBySubject.get(exceptionSubject);
      if (!exception) {
        throw new Error(`${policy.subject}.exception must reference an active DataAssetVisibilityPolicyException, got ${exceptionSubject}.`);
      }
      if (exception.policy !== policy.subject) {
        throw new Error(`${policy.subject}.exception ${exceptionSubject} must reference an exception for ${policy.subject}, got ${exception.policy}.`);
      }
      return exception;
    });
    const inferredExceptions = assetVisibilityPolicyExceptions.filter(exception => (
      exception.policy === policy.subject && !policy.exceptionSubjects.includes(exception.subject)
    ));
    policy.exceptions = (declaredExceptions.length ? declaredExceptions : inferredExceptions)
      .sort((a, b) => a.precedenceRank - b.precedenceRank || a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredMerges = policy.mergeSubjects.map(mergeSubject => {
      const merge = assetVisibilityPolicyMergesBySubject.get(mergeSubject);
      if (!merge) {
        throw new Error(`${policy.subject}.merge must reference an active DataAssetVisibilityPolicyMerge, got ${mergeSubject}.`);
      }
      if (merge.policy !== policy.subject) {
        throw new Error(`${policy.subject}.merge ${mergeSubject} must reference a merge for ${policy.subject}, got ${merge.policy}.`);
      }
      return merge;
    });
    const inferredMerges = assetVisibilityPolicyMerges.filter(merge => (
      merge.policy === policy.subject && !policy.mergeSubjects.includes(merge.subject)
    ));
    policy.merges = (declaredMerges.length ? declaredMerges : inferredMerges)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  for (const merge of assetVisibilityPolicyMerges) {
    const declaredSelections = merge.selectionSubjects.map(selectionSubject => {
      const selection = assetVisibilityPolicyMergeSelectionsBySubject.get(selectionSubject);
      if (!selection) {
        throw new Error(`${merge.subject}.selection must reference an active DataAssetVisibilityPolicyMergeSelection, got ${selectionSubject}.`);
      }
      if (selection.merge !== merge.subject) {
        throw new Error(`${merge.subject}.selection ${selectionSubject} must reference a selection for ${merge.subject}, got ${selection.merge}.`);
      }
      return selection;
    });
    const inferredSelections = assetVisibilityPolicyMergeSelections.filter(selection => (
      selection.merge === merge.subject && !merge.selectionSubjects.includes(selection.subject)
    ));
    merge.selections = (declaredSelections.length ? declaredSelections : inferredSelections)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredResults = merge.resultSubjects.map(resultSubject => {
      const result = assetVisibilityPolicyMergeResultsBySubject.get(resultSubject);
      if (!result) {
        throw new Error(`${merge.subject}.result must reference an active DataAssetVisibilityPolicyMergeResult, got ${resultSubject}.`);
      }
      if (result.merge !== merge.subject) {
        throw new Error(`${merge.subject}.result ${resultSubject} must reference a result for ${merge.subject}, got ${result.merge}.`);
      }
      return result;
    });
    const inferredResults = assetVisibilityPolicyMergeResults.filter(result => (
      result.merge === merge.subject && !merge.resultSubjects.includes(result.subject)
    ));
    merge.results = (declaredResults.length ? declaredResults : inferredResults)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const assetCrossPolicyMerges = store.distinctSubjects("isa", "DataAssetCrossPolicyMerge")
    .map(merge => parseAssetCrossPolicyMerge(
      store,
      merge,
      activeAssetSubjects,
      assetSamplePolicyMergesBySubject,
      assetVisibilityPolicyMergesBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetCrossPolicyMergesBySubject = new Map(
    assetCrossPolicyMerges.map(merge => [merge.subject, merge]),
  );
  const assetCrossPolicyMergeResults = store.distinctSubjects("isa", "DataAssetCrossPolicyMergeResult")
    .map(result => parseAssetCrossPolicyMergeResult(
      store,
      result,
      assetCrossPolicyMergesBySubject,
      assetSamplePolicyMergeResultsBySubject,
      assetVisibilityPolicyMergeResultsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetCrossPolicyMergeResultsBySubject = new Map(
    assetCrossPolicyMergeResults.map(result => [result.subject, result]),
  );
  for (const merge of assetCrossPolicyMerges) {
    const declaredResults = merge.resultSubjects.map(resultSubject => {
      const result = assetCrossPolicyMergeResultsBySubject.get(resultSubject);
      if (!result) {
        throw new Error(`${merge.subject}.result must reference an active DataAssetCrossPolicyMergeResult, got ${resultSubject}.`);
      }
      if (result.merge !== merge.subject) {
        throw new Error(`${merge.subject}.result ${resultSubject} must reference a result for ${merge.subject}, got ${result.merge}.`);
      }
      return result;
    });
    const inferredResults = assetCrossPolicyMergeResults.filter(result => (
      result.merge === merge.subject && !merge.resultSubjects.includes(result.subject)
    ));
    merge.results = (declaredResults.length ? declaredResults : inferredResults)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const assetCrossPolicyMergeSets = store.distinctSubjects("isa", "DataAssetCrossPolicyMergeSet")
    .map(mergeSet => parseAssetCrossPolicyMergeSet(
      store,
      mergeSet,
      activeAssetSubjects,
      assetCrossPolicyMergesBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetCrossPolicyMergeSetsBySubject = new Map(
    assetCrossPolicyMergeSets.map(mergeSet => [mergeSet.subject, mergeSet]),
  );
  const assetCrossPolicyMergeStages = store.distinctSubjects("isa", "DataAssetCrossPolicyMergeStage")
    .map(stage => parseAssetCrossPolicyMergeStage(
      store,
      stage,
      assetCrossPolicyMergeSetsBySubject,
      assetCrossPolicyMergesBySubject,
      assetCrossPolicyMergeResultsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const assetCrossPolicyMergeStagesBySubject = new Map(
    assetCrossPolicyMergeStages.map(stage => [stage.subject, stage]),
  );
  for (const mergeSet of assetCrossPolicyMergeSets) {
    const declaredStages = mergeSet.stageSubjects.map(stageSubject => {
      const stage = assetCrossPolicyMergeStagesBySubject.get(stageSubject);
      if (!stage) {
        throw new Error(`${mergeSet.subject}.stage must reference an active DataAssetCrossPolicyMergeStage, got ${stageSubject}.`);
      }
      if (stage.mergeSet !== mergeSet.subject) {
        throw new Error(`${mergeSet.subject}.stage ${stageSubject} must reference a stage for ${mergeSet.subject}, got ${stage.mergeSet}.`);
      }
      return stage;
    });
    const inferredStages = assetCrossPolicyMergeStages.filter(stage => (
      stage.mergeSet === mergeSet.subject && !mergeSet.stageSubjects.includes(stage.subject)
    ));
    mergeSet.stages = (declaredStages.length ? declaredStages : inferredStages)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  for (const stage of assetCrossPolicyMergeStages) {
    stage.priorStages = stage.priorStageSubjects.map(priorStageSubject => {
      const priorStage = assetCrossPolicyMergeStagesBySubject.get(priorStageSubject);
      if (!priorStage) {
        throw new Error(`${stage.subject}.priorStage must reference an active DataAssetCrossPolicyMergeStage, got ${priorStageSubject}.`);
      }
      if (priorStage.mergeSet !== stage.mergeSet) {
        throw new Error(`${stage.subject}.priorStage ${priorStageSubject} must reference a stage for ${stage.mergeSet}, got ${priorStage.mergeSet}.`);
      }
      if (priorStage.subject === stage.subject) {
        throw new Error(`${stage.subject}.priorStage cannot reference itself.`);
      }
      return priorStage;
    }).sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  for (const mergeSet of assetCrossPolicyMergeSets) {
    mergeSet.policyFamilyRegistries = mergeSet.policyFamilyRegistrySubjects
      .map(subject => parseAssetCrossPolicyPolicyFamilyRegistry(store, subject, mergeSet.subject))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    mergeSet.stageInventories = mergeSet.stageInventorySubjects
      .map(subject => parseAssetCrossPolicyMergeStageInventory(
        store,
        subject,
        mergeSet.subject,
        assetCrossPolicyMergeStagesBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    mergeSet.stageBranches = mergeSet.stageBranchSubjects
      .map(subject => parseAssetCrossPolicyMergeStageBranch(
        store,
        subject,
        mergeSet.subject,
        assetCrossPolicyMergeStagesBySubject,
      ))
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const assetCrossPolicyMergeSetInventories = store.distinctSubjects("isa", "DataAssetCrossPolicyMergeSetInventory")
    .map(inventory => parseAssetCrossPolicyMergeSetInventory(
      store,
      inventory,
      activeAssetSubjects,
      assetCrossPolicyMergeSetsBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  for (const asset of assets) {
    asset.samplePolicyRecords = assetSamplePolicies.filter(policy => policy.asset === asset.subject);
    asset.visibilityPolicyRecords = assetVisibilityPolicies.filter(policy => policy.asset === asset.subject);
    const declaredCrossPolicyMerges = store.objects(asset.subject, "crossPolicyMergeRecord").map(mergeSubject => {
      const merge = assetCrossPolicyMergesBySubject.get(mergeSubject);
      if (!merge) {
        throw new Error(`${asset.subject}.crossPolicyMergeRecord must reference an active DataAssetCrossPolicyMerge, got ${mergeSubject}.`);
      }
      if (merge.asset !== asset.subject) {
        throw new Error(`${asset.subject}.crossPolicyMergeRecord ${mergeSubject} must reference a merge for ${asset.subject}, got ${merge.asset}.`);
      }
      return merge;
    });
    const inferredCrossPolicyMerges = assetCrossPolicyMerges.filter(merge => merge.asset === asset.subject);
    asset.crossPolicyMergeRecords = (declaredCrossPolicyMerges.length ? declaredCrossPolicyMerges : inferredCrossPolicyMerges)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const declaredCrossPolicyMergeSets = store.objects(asset.subject, "crossPolicyMergeSetRecord").map(mergeSetSubject => {
      const mergeSet = assetCrossPolicyMergeSetsBySubject.get(mergeSetSubject);
      if (!mergeSet) {
        throw new Error(`${asset.subject}.crossPolicyMergeSetRecord must reference an active DataAssetCrossPolicyMergeSet, got ${mergeSetSubject}.`);
      }
      if (mergeSet.asset !== asset.subject) {
        throw new Error(`${asset.subject}.crossPolicyMergeSetRecord ${mergeSetSubject} must reference a merge set for ${asset.subject}, got ${mergeSet.asset}.`);
      }
      return mergeSet;
    });
    const inferredCrossPolicyMergeSets = assetCrossPolicyMergeSets.filter(mergeSet => mergeSet.asset === asset.subject);
    asset.crossPolicyMergeSetRecords = (declaredCrossPolicyMergeSets.length ? declaredCrossPolicyMergeSets : inferredCrossPolicyMergeSets)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    asset.crossPolicyMergeSetInventories = assetCrossPolicyMergeSetInventories
      .filter(inventory => inventory.asset === asset.subject)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
    const assetScopeSamplePolicy = asset.samplePolicyRecords.find(policy => policy.scopeKind === "asset");
    const assetScopeVisibilityPolicy = asset.visibilityPolicyRecords.find(policy => policy.scopeKind === "asset");
    if (assetScopeSamplePolicy) asset.samplePolicy = assetScopeSamplePolicy.policy;
    if (assetScopeVisibilityPolicy) asset.visibility = assetScopeVisibilityPolicy.policy;
  }
  const dataSourceEditors = store.objects(subject, "dataSourceEditor")
    .map(editor => parseDataSourceEditor(
      store,
      editor,
      activeSourceSubjects,
      sourceBySubject,
      activeAssetSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.source.localeCompare(b.source));
  const dataAssetEditors = store.objects(subject, "dataAssetEditor")
    .map(editor => parseDataAssetEditor(
      store,
      editor,
      activeAssetSubjects,
      assetSamplePoliciesBySubject,
      assetSamplePolicyExceptionsBySubject,
      assetSamplePolicyMergesBySubject,
      assetVisibilityPoliciesBySubject,
      assetVisibilityPolicyExceptionsBySubject,
      assetVisibilityPolicyMergesBySubject,
      assetCrossPolicyMergesBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.asset.localeCompare(b.asset));
  const issueAuditReceipts = store.objects(subject, "issueAuditReceipt")
    .map(receipt => parseIssueAuditReceipt(store, receipt, subject, activeIssueSubjects))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const issueAuditReceiptBySubject = new Map(issueAuditReceipts.map(receipt => [receipt.subject, receipt]));
  for (const receipt of issueAuditReceipts) {
    if (!receipt.priorReceipt) continue;
    const prior = issueAuditReceiptBySubject.get(receipt.priorReceipt);
    if (!prior) {
      throw new Error(`${receipt.subject}.priorReceipt must reference an active DataSpace issueAuditReceipt, got ${receipt.priorReceipt}.`);
    }
    if (prior.issue !== receipt.issue) {
      throw new Error(`${receipt.subject}.priorReceipt must reference the same issue ${receipt.issue}, got ${prior.issue}.`);
    }
  }
  const sourcePreviews = store.objects(subject, "sourcePreview")
    .map(sourcePreview => parseSourcePreview(
      store,
      sourcePreview,
      subject,
      assetBySubject,
      activeFieldSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.previewKind.localeCompare(b.previewKind));
  const previews = store.objects(subject, "preview")
    .map(preview => parsePreview(
      store,
      preview,
      subject,
      activeAssetSubjects,
      resolvedValueBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.previewKind.localeCompare(b.previewKind));
  const activePreviewSubjects = new Set(previews.map(preview => preview.subject));
  const sampleGrids = unique([
    ...store.objects(subject, "sampleGrid"),
    ...previews.flatMap(preview => preview.sampleGridSubjects),
  ])
    .map(grid => parseSampleGrid(store, grid, activeAssetSubjects, activePreviewSubjects, fieldBySubject))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const sampleGridBySubject = new Map(sampleGrids.map(grid => [grid.subject, grid]));
  for (const preview of previews) {
    const declaredGrids = preview.sampleGridSubjects.map(gridSubject => {
      const grid = sampleGridBySubject.get(gridSubject);
      if (!grid) {
        throw new Error(`${preview.subject}.sampleGrid must reference an active DataSampleGrid, got ${gridSubject}.`);
      }
      if (grid.preview && grid.preview !== preview.subject) {
        throw new Error(`${preview.subject}.sampleGrid ${gridSubject} must reference a grid for ${preview.subject}, got ${grid.preview}.`);
      }
      return grid;
    });
    const inferredGrids = sampleGrids.filter(grid => (
      grid.preview === preview.subject && !preview.sampleGridSubjects.includes(grid.subject)
    ));
    preview.sampleGrids = (declaredGrids.length ? declaredGrids : inferredGrids)
      .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  }
  const fieldContractEditors = store.objects(subject, "fieldContractEditor")
    .map(editor => parseFieldContractEditor(
      store,
      editor,
      activeFieldSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.field.localeCompare(b.field));
  const issueSuppressionEditors = store.objects(subject, "issueSuppressionEditor")
    .map(editor => parseIssueSuppressionEditor(
      store,
      editor,
      derivedIssueBySubject,
      issueSuppressionBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.issue.localeCompare(b.issue));
  const dataSpaceEditors = store.objects(subject, "dataSpaceEditor")
    .map(editor => parseDataSpaceEditor(
      store,
      editor,
      subject,
      activeEditTargetSubjects,
      activeAssetSubjects,
      assetBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const validationRuleEditors = store.objects(subject, "validationRuleEditor")
    .map(editor => parseValidationRuleEditor(
      store,
      editor,
      activeValidationRuleSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.rule.localeCompare(b.rule));
  const trustedBridgeExpressionSetResolver = createTrustedBridgeExpressionSetResolver(store, subject);
  const uniqueRuleEditors = store.objects(subject, "uniqueRuleEditor")
    .map(editor => parseUniqueRuleEditor(
      store,
      editor,
      activeValidationRuleSubjects,
      uniquenessKeyBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.rule.localeCompare(b.rule));
  const rangeRuleEditors = store.objects(subject, "rangeRuleEditor")
    .map(editor => parseRangeRuleEditor(
      store,
      editor,
      activeValidationRuleSubjects,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.rule.localeCompare(b.rule));
  const allowedValuesRuleEditors = store.objects(subject, "allowedValuesRuleEditor")
      .map(editor => parseAllowedValuesRuleEditor(
        store,
        editor,
        activeValidationRuleSubjects,
        allowedValueEntryBySubject,
        allowedValueCandidateBySubject,
        allowedValueCandidatePromotionBySubject,
        activeEditTargetSubjects,
        activeValidationResultSubjects,
      ))
    .sort((a, b) => a.order - b.order || a.rule.localeCompare(b.rule));
  const publications = store.objects(subject, "publication")
    .map(publication => parsePublication(store, publication, activeAssetSubjects, activeValidationResultSubjects));
  const activePublicationSubjects = new Set(publications.map(publication => publication.subject));
  const publicationBySubject = new Map(publications.map(publication => [publication.subject, publication]));
  const publicationPlacementBySubject = new Map(
    publications.flatMap(publication => publication.placements.map(placement => [placement.subject, placement])),
  );
  const publicationIdentityBySubject = new Map(
    publications.flatMap(publication => publication.identities.map(identity => [identity.subject, identity])),
  );
  const publicationNavigationGroupBySubject = new Map(
    publications.flatMap(publication => publication.navigationGroups.map(group => [group.subject, group])),
  );
  const publicationGatePrecedenceBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.map(precedence => [precedence.subject, precedence])),
  );
  for (const publication of publications) {
    for (const precedence of publication.gatePrecedences) {
      for (const condition of precedence.conditions) {
        condition.expressions = condition.expressionSubjects
          .map(expressionSubject => parsePublicationGateConditionExpression(
            store,
            expressionSubject,
            condition.subject,
            publication.asset,
          ))
          .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      }
      const publicationGateExpressionSetResolver = createPublicationGateExpressionSetResolver(
        store,
        precedence.subject,
        publication.asset,
      );
      precedence.expressionSets = precedence.expressionSetSubjects
        .map(expressionSetSubject => publicationGateExpressionSetResolver.resolve(expressionSetSubject))
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      const publicationGateExpressionSetBySubject = new Map(
        precedence.expressionSets.map(expressionSet => [expressionSet.subject, expressionSet]),
      );
      for (const condition of precedence.conditions) {
        condition.expressionSets = condition.expressionSetSubjects
          .map(expressionSetSubject => {
            const expressionSet = publicationGateExpressionSetBySubject.get(expressionSetSubject);
            if (!expressionSet) {
              throw new Error(`${condition.subject}.expressionSet must reference an active DataPublicationGateExpressionSet, got ${expressionSetSubject}.`);
            }
            if (expressionSet.precedence !== precedence.subject) {
              throw new Error(`${condition.subject}.expressionSet ${expressionSetSubject} must reference an expression set for ${precedence.subject}, got ${expressionSet.precedence}.`);
            }
            return expressionSet;
          })
          .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      }
      const publicationGateConditionBySubject = new Map(
        precedence.conditions.map(condition => [condition.subject, condition]),
      );
      precedence.conditionGroups = precedence.conditionGroupSubjects
        .map(groupSubject => parsePublicationGateConditionGroup(
          store,
          groupSubject,
          precedence.subject,
          publicationGateConditionBySubject,
        ))
        .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      const publicationGateConditionGroupBySubject = new Map(
        precedence.conditionGroups.map(group => [group.subject, group]),
      );
      for (const group of precedence.conditionGroups) {
        group.nextGroups = group.nextGroupSubjects.map(nextGroupSubject => {
          const nextGroup = publicationGateConditionGroupBySubject.get(nextGroupSubject);
          if (!nextGroup) {
            throw new Error(`${group.subject}.nextGroup must reference an active DataPublicationGateConditionGroup, got ${nextGroupSubject}.`);
          }
          if (nextGroup.precedence !== precedence.subject) {
            throw new Error(`${group.subject}.nextGroup ${nextGroupSubject} must reference a group for ${precedence.subject}, got ${nextGroup.precedence}.`);
          }
          if (nextGroup.subject === group.subject) {
            throw new Error(`${group.subject}.nextGroup cannot reference itself.`);
          }
          return nextGroup;
        }).sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
      }
      const visiting = new Set(), visited = new Set();
      const visit = group => {
        if (visiting.has(group)) throw new Error(`${group.subject} participates in a publication gate condition-group cycle.`);
        if (visited.has(group)) return;
        visiting.add(group);
        for (const next of group.nextGroups) visit(next);
        visiting.delete(group);
        visited.add(group);
      };
      for (const group of precedence.conditionGroups) visit(group);
    }
  }
  const publicationGateConditionGroupBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => (precedence.conditionGroups || []).map(group => [group.subject, group]),
    )),
  );
  const publicationGateExpressionSetBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => (precedence.expressionSets || []).map(expressionSet => [expressionSet.subject, expressionSet]),
    )),
  );
  const publicationGateExpressionConditionGroupBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => (precedence.expressionSets || []).flatMap(
        expressionSet => flattenPublicationGateExpressionConditionGroups(expressionSet.conditionGroups || [])
          .map(group => [group.subject, group]),
      ),
    )),
  );
  const publicationGateExpressionConditionBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => (precedence.expressionSets || []).flatMap(
        expressionSet => flattenPublicationGateExpressionConditionGroups(expressionSet.conditionGroups || [])
          .flatMap(group => (group.conditions || []).map(condition => [condition.subject, condition])),
      ),
    )),
  );
  const publicationGateConditionBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => precedence.conditions.map(condition => [condition.subject, condition]),
    )),
  );
  const publicationGateConditionExpressionBySubject = new Map(
    publications.flatMap(publication => publication.gatePrecedences.flatMap(
      precedence => precedence.conditions.flatMap(condition => (condition.expressions || []).map(expression => [expression.subject, expression])),
    )),
  );
  const publicationRequirementBySubject = new Map(
    publications.flatMap(publication => publication.requirements.map(requirement => [requirement.subject, requirement])),
  );
  const experimentHandoffs = store.objects(subject, "experimentHandoff")
    .map(handoff => parseExperimentHandoff(
      store,
      handoff,
      subject,
      activeAssetSubjects,
      fieldBySubject,
      publicationBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgeFamilyPolicies = store.objects(subject, "trustedBridgeFamilyPolicy")
    .map(policy => parseTrustedBridgeFamilyPolicy(
      store,
      policy,
      subject,
      trustedBridgeExpressionSetResolver,
    ))
    .sort((a, b) => a.order - b.order || a.bridgeKind.localeCompare(b.bridgeKind) || a.subject.localeCompare(b.subject));
  const trustedBridgeRules = trustedBridgeFamilyPolicies
    .flatMap(policy => policy.rules || [])
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgePolicyConditionGroups = trustedBridgeRules
    .flatMap(rule => flattenTrustedBridgePolicyConditionGroups(rule.conditionGroups || []))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgePolicyConditions = [
    ...trustedBridgeRules.flatMap(rule => rule.conditions || []),
    ...trustedBridgePolicyConditionGroups.flatMap(group => group.conditions || []),
  ].sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgeExpressionSets = [...new Map(
    trustedBridgeRules
      .flatMap(rule => rule.expressionSets || [])
      .map(expressionSet => [expressionSet.subject, expressionSet]),
  ).values()].sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgeExpressionConditionGroups = trustedBridgeExpressionSets
    .flatMap(expressionSet => flattenTrustedBridgeExpressionConditionGroups(expressionSet.conditionGroups || []))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgeExpressionConditions = trustedBridgeExpressionConditionGroups
    .flatMap(group => group.conditions || [])
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgePolicyConditionParameters = trustedBridgePolicyConditions
    .flatMap(condition => condition.parameters || [])
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const trustedBridgeExpressionConditionParameters = trustedBridgeExpressionConditions
    .flatMap(condition => condition.parameters || [])
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const transforms = store.objects(subject, "transform")
    .map(transform => parseTransform(store, transform, activeAssetSubjects, fieldBySubject));
  const activeTransformSubjects = new Set(transforms.map(transform => transform.subject));
  const transformStepBySubject = new Map(
    transforms.flatMap(transform => transform.steps.map(step => [step.subject, step])),
  );
  const transformConfigBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(step => step.configs.map(config => [config.subject, config]))),
  );
  const transformConfigInputSourceGraphBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(
      step => step.configs.flatMap(config => (config.inputSourceGraphs || []).map(graph => [graph.subject, graph])),
    )),
  );
  const transformConfigParameterBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(
      step => step.configs.flatMap(config => config.parameters.map(parameter => [parameter.subject, parameter])),
    )),
  );
  const transformConfigParameterOptionBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(
      step => step.configs.flatMap(config => config.parameters.flatMap(
        parameter => (parameter.options || []).map(option => [option.subject, option]),
      )),
    )),
  );
  const transformConfigInputBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(
      step => step.configs.flatMap(config => config.inputs.map(input => [input.subject, input])),
    )),
  );
  const transformConfigInputSourceBySubject = new Map(
    transforms.flatMap(transform => transform.steps.flatMap(
      step => step.configs.flatMap(config => config.inputs.flatMap(
        input => (input.inputSources || []).map(source => [source.subject, source]),
      )),
    )),
  );
  const transformEditors = store.objects(subject, "transformEditor")
    .map(editor => parseDataTransformEditor(
      store,
      editor,
      activeTransformSubjects,
      transformStepBySubject,
      transformConfigBySubject,
      transformConfigInputSourceGraphBySubject,
      transformConfigParameterBySubject,
      transformConfigParameterOptionBySubject,
      transformConfigInputBySubject,
      transformConfigInputSourceBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.transform.localeCompare(b.transform));
  const transformEditorBySubject = new Map(transformEditors.map(editor => [editor.subject, editor]));
  const publicationEditors = store.objects(subject, "publicationEditor")
    .map(editor => parseDataPublicationEditor(
      store,
      editor,
      activePublicationSubjects,
      publicationIdentityBySubject,
      publicationNavigationGroupBySubject,
      publicationGatePrecedenceBySubject,
      publicationGateExpressionSetBySubject,
      publicationGateExpressionConditionGroupBySubject,
      publicationGateExpressionConditionBySubject,
      publicationGateConditionGroupBySubject,
      publicationPlacementBySubject,
      publicationRequirementBySubject,
      publicationGateConditionBySubject,
      publicationGateConditionExpressionBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.publication.localeCompare(b.publication));
  const publicationEditorBySubject = new Map(publicationEditors.map(editor => [editor.subject, editor]));
  const trustedBridgeFamilyPolicyBySubject = new Map(
    trustedBridgeFamilyPolicies.map(policy => [policy.subject, policy]),
  );
  const trustedBridgePolicyRuleBySubject = new Map(
    trustedBridgeRules.map(rule => [rule.subject, rule]),
  );
  const trustedBridgePolicyConditionGroupBySubject = new Map(
    trustedBridgePolicyConditionGroups.map(group => [group.subject, group]),
  );
  const trustedBridgePolicyConditionBySubject = new Map(
    trustedBridgePolicyConditions.map(condition => [condition.subject, condition]),
  );
  const trustedBridgePolicyConditionParameterBySubject = new Map(
    trustedBridgePolicyConditionParameters.map(parameter => [parameter.subject, parameter]),
  );
  const trustedBridgeExpressionSetBySubject = new Map(
    trustedBridgeExpressionSets.map(expressionSet => [expressionSet.subject, expressionSet]),
  );
  const trustedBridgeExpressionConditionGroupBySubject = new Map(
    trustedBridgeExpressionConditionGroups.map(group => [group.subject, group]),
  );
  const trustedBridgeExpressionConditionBySubject = new Map(
    trustedBridgeExpressionConditions.map(condition => [condition.subject, condition]),
  );
  const trustedBridgeExpressionConditionParameterBySubject = new Map(
    trustedBridgeExpressionConditionParameters.map(parameter => [parameter.subject, parameter]),
  );
  const trustedBridgePolicyEditors = store.objects(subject, "trustedBridgePolicyEditor")
    .map(editor => parseTrustedBridgeFamilyPolicyEditor(
      store,
      editor,
      trustedBridgeFamilyPolicyBySubject,
      trustedBridgePolicyRuleBySubject,
      trustedBridgePolicyConditionGroupBySubject,
      trustedBridgePolicyConditionBySubject,
      trustedBridgePolicyConditionParameterBySubject,
      trustedBridgeExpressionSetBySubject,
      trustedBridgeExpressionConditionGroupBySubject,
      trustedBridgeExpressionConditionBySubject,
      trustedBridgeExpressionConditionParameterBySubject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.policy.localeCompare(b.policy));
  const transformModeEditors = store.objects(subject, "transformModeEditor")
    .map(editor => parseTransformModeEditor(
      store,
      editor,
      transformEditorBySubject,
      activeValidationResultSubjects,
      editTargetBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.transform.localeCompare(b.transform));
  const publicationModeEditors = store.objects(subject, "publicationModeEditor")
    .map(editor => parsePublicationModeEditor(
      store,
      editor,
      publicationEditorBySubject,
      activeValidationResultSubjects,
      editTargetBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.publication.localeCompare(b.publication));
  const activeTargetSubjectsByKind = new Map([
    ["field", activeFieldSubjects],
    ["rule", activeValidationRuleSubjects],
    ["issue", new Set(issues.map(issue => issue.subject))],
    ["transform", new Set(transforms.map(transform => transform.subject))],
    ["publication", new Set(publications.map(publication => publication.subject))],
  ]);
  const comparisons = store.objects(subject, "comparison")
    .map(comparison => parseComparison(
      store,
      comparison,
      subject,
      activeEditTargetSubjects,
      activeTargetSubjectsByKind,
      resolvedValueBySubject,
      activePreviewSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.comparisonKind.localeCompare(b.comparisonKind));
  const saveAsCandidates = store.objects(subject, "saveAsCandidate")
    .map(candidate => parseSaveAsCandidate(
      store,
      candidate,
      subject,
      activeAssetSubjects,
      publicationBySubject,
      activePreviewSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.saveKind.localeCompare(b.saveKind));
  const governedRawFactEditors = store.objects(subject, "governedRawFactEditor")
    .map(editor => parseGovernedRawFactEditor(
      store,
      editor,
      subject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const governedRawFactEditorBySubject = new Map(governedRawFactEditors.map(editor => [editor.subject, editor]));
  const governedRawFactTupleOrders = store.objects(subject, "governedRawFactTupleOrder")
    .map(tupleOrder => parseGovernedRawFactTupleOrder(
      store,
      tupleOrder,
      subject,
      activeEditTargetSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const governedRawFactTupleOrderBySubject = new Map(governedRawFactTupleOrders.map(tupleOrder => [tupleOrder.subject, tupleOrder]));
  const governedRawFactBatchOperations = store.objects(subject, "governedRawFactBatchOperation")
    .map(batchOperation => parseGovernedRawFactBatchOperation(
      store,
      batchOperation,
      subject,
      activeEditTargetSubjects,
      activeValidationResultSubjects,
      governedRawFactEditorBySubject,
      governedRawFactTupleOrderBySubject,
    ))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  const saveAsCandidateBySubject = new Map(saveAsCandidates.map(candidate => [candidate.subject, candidate]));
  const provenanceReceipts = store.objects(subject, "provenanceReceipt")
    .map(receipt => parseProvenanceReceipt(
      store,
      receipt,
      subject,
      assetBySubject,
      sourceBySubject,
      publicationBySubject,
      saveAsCandidateBySubject,
      activeValidationResultSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const provenanceReceiptBySubject = new Map(provenanceReceipts.map(receipt => [receipt.subject, receipt]));
  for (const candidate of saveAsCandidates) {
    if (!candidate.provenanceReceipt) continue;
    const receipt = provenanceReceiptBySubject.get(candidate.provenanceReceipt);
    if (!receipt) {
      throw new Error(`${candidate.subject}.provenanceReceipt must reference a DataSpace provenanceReceipt, got ${candidate.provenanceReceipt}.`);
    }
    if (receipt.saveAsCandidate !== candidate.subject) {
      throw new Error(`${candidate.subject}.provenanceReceipt must reference a receipt for this save-as candidate, got ${receipt.saveAsCandidate}.`);
    }
  }
  const overlayManagerSubject = store.one(subject, "overlayManager") || "";
  const overlayManager = overlayManagerSubject
    ? parseOverlayManager(
      store,
      overlayManagerSubject,
      subject,
      activeEditTargetSubjects,
      activeAssetSubjects,
      activeValidationResultSubjects,
      resolvedPropertyByEditTarget,
    )
    : null;
  const draftRestoreReceipts = store.objects(subject, "draftRestoreReceipt")
    .map(receipt => parseDraftRestoreReceipt(
      store,
      receipt,
      subject,
      overlayManagerSubject,
      activeEditTargetSubjects,
      activeAssetSubjects,
      activePreviewSubjects,
    ))
    .sort((a, b) => a.order - b.order || a.subject.localeCompare(b.subject));
  const archivedPreviewHistory = deriveArchivedPreviewHistory(previews, overlayManager, draftRestoreReceipts);

  return {
    subject,
    title: requireOne(store, subject, "title"),
    description: store.one(subject, "description") || "",
    sources,
    assets,
    catalogNodes,
    catalogNodeBySubject,
    fields,
    fieldProfileSummaries,
    assetSamplePolicies,
    assetSamplePolicyExceptions,
    assetSamplePolicyMerges,
    assetSamplePolicyMergeSelections,
    assetSamplePolicyMergeResults,
    assetVisibilityPolicies,
    assetVisibilityPolicyExceptions,
    assetVisibilityPolicyMerges,
    assetVisibilityPolicyMergeSelections,
    assetVisibilityPolicyMergeResults,
    assetCrossPolicyMerges,
    assetCrossPolicyMergeResults,
    assetCrossPolicyMergeSets,
    assetCrossPolicyMergeStages,
    assetCrossPolicyMergeSetInventories,
    issues: derivedIssues,
    issueSuppressions,
    issueAuditReceipts,
    issueSuppressionEditors,
    publications,
    experimentHandoffs,
    trustedBridgeFamilyPolicies,
    transforms,
    defaultAsset,
    editTargets,
    valueProviders,
    resolvedValues,
    resolvedProperties,
    computedResolvedProperties,
    materializedResolvedProperties: annotatedMaterializedResolvedProperties,
    staleResolvedProperties,
    validationPolicy,
    validationRules,
    validationResults,
    validationSampleFailures,
    uniquenessKeys,
    compositeUniquenessProfiles,
    allowedValueEntries,
    allowedValueCandidates,
    allowedValueCandidatePromotions,
    sourcePreviews,
    previews,
    sampleGrids,
    comparisons,
    saveAsCandidates,
    governedRawFactEditors,
    governedRawFactTupleOrders,
    governedRawFactBatchOperations,
    provenanceReceipts,
    draftRestoreReceipts,
    dataSourceEditors,
    dataAssetEditors,
    dataSpaceEditors,
    fieldContractEditors,
    validationRuleEditors,
    uniqueRuleEditors,
    rangeRuleEditors,
    allowedValuesRuleEditors,
    transformEditors,
    transformModeEditors,
    publicationEditors,
    trustedBridgePolicyEditors,
    publicationModeEditors,
    overlayManager,
    archivedPreviewHistory,
  };
}

export function catalogSort(a, b) {
  return (a.order || 0) - (b.order || 0)
    || String(a.label || "").localeCompare(String(b.label || ""))
    || String(a.subject || "").localeCompare(String(b.subject || ""));
}

export function catalogSearchText(dataSpace, node) {
  const source = (dataSpace.sources || []).find(entry => entry.subject === node.source);
  const asset = (dataSpace.assets || []).find(entry => entry.subject === node.asset);
  return [
    node.label,
    node.path,
    node.pathSegment,
    node.nodeKind,
    node.sourceObject,
    node.discoveryOrigin,
    node.accessState,
    node.previewState,
    source?.label,
    source?.sourceKind,
    asset?.label,
    asset?.assetKind,
  ].filter(Boolean).join(" ").toLowerCase();
}

export function searchDataCatalog(dataSpace, query, options = {}) {
  const source = options.source || "";
  const nodeKind = options.nodeKind || "";
  const terms = String(query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return (dataSpace.catalogNodes || [])
    .filter(node => !source || node.source === source)
    .filter(node => !nodeKind || node.nodeKind === nodeKind)
    .filter(node => {
      if (!terms.length) return true;
      const text = catalogSearchText(dataSpace, node);
      return terms.every(term => text.includes(term));
    })
    .sort(catalogSort);
}

export function buildDataCatalogTree(dataSpace, options = {}) {
  const filteredNodes = searchDataCatalog(dataSpace, options.query || "", {
    source: options.source || "",
    nodeKind: options.nodeKind || "",
  });
  const included = new Map();
  const allNodesBySubject = new Map((dataSpace.catalogNodes || []).map(node => [node.subject, node]));
  for (const node of filteredNodes) {
    let current = node;
    while (current && !included.has(current.subject)) {
      included.set(current.subject, { ...current, children: [], depth: 0, descendantAssetCount: 0 });
      current = current.parent ? allNodesBySubject.get(current.parent) : null;
    }
  }
  const nodes = [...included.values()].sort(catalogSort);
  const nodesBySubject = new Map(nodes.map(node => [node.subject, node]));
  const childrenByParent = new Map();
  const roots = [];
  for (const node of nodes) {
    const parent = node.parent ? nodesBySubject.get(node.parent) : null;
    if (parent) {
      parent.children.push(node);
      node.depth = parent.depth + 1;
      const bucket = childrenByParent.get(parent.subject) || [];
      bucket.push(node);
      childrenByParent.set(parent.subject, bucket);
    } else {
      roots.push(node);
    }
  }
  for (const node of nodes) node.children.sort(catalogSort);
  roots.sort(catalogSort);

  function countDescendantAssets(node, seen = new Set()) {
    if (seen.has(node.subject)) return 0;
    seen.add(node.subject);
    const own = node.asset ? 1 : 0;
    const nested = node.children.reduce((sum, child) => sum + countDescendantAssets(child, seen), 0);
    node.descendantAssetCount = own + nested;
    return node.descendantAssetCount;
  }
  for (const root of roots) countDescendantAssets(root);
  return { nodes, roots, nodesBySubject, childrenByParent };
}
