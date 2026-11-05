import { listTrustedDataBridgeContexts, trustedBridgeSuffix } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/trust-bridge.mjs";

const TARGET_SPECS = Object.freeze({
  experimentViewer: Object.freeze({
    label: "Experiment Viewer",
    format: "relFacts",
    artifactKind: "experimentBootstrapFacts",
    extension: "rel",
    mimeType: "text/plain",
  }),
  csv: Object.freeze({
    label: "CSV",
    format: "csv",
    artifactKind: "csvText",
    extension: "csv",
    mimeType: "text/csv",
  }),
  sqlite: Object.freeze({
    label: "SQLite SQL",
    format: "sqliteSql",
    artifactKind: "sqliteSql",
    extension: "sql",
    mimeType: "application/sql",
  }),
  jsonManifest: Object.freeze({
    label: "JSON Manifest",
    format: "jsonManifest",
    artifactKind: "jsonManifest",
    extension: "json",
    mimeType: "application/json",
  }),
});

function fact(s, p, o) {
  return { s, p, o: String(o ?? ""), pol: "is" };
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function safeSlug(value, fallback = "data") {
  return String(value || fallback)
    .trim()
    .replace(/[^A-Za-z0-9_.-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    || fallback;
}

function sourceFieldName(store, field = {}) {
  const sourceField = field.sourceField || "";
  return store.one(sourceField, "name")
    || store.one(sourceField, "sourceName")
    || store.one(sourceField, "fieldName")
    || store.one(sourceField, "slotName")
    || store.one(sourceField, "label")
    || store.one(store.one(sourceField, "headerCell") || "", "name")
    || field.displayName
    || field.subject
    || "";
}

function defaultFilename(context, targetKind) {
  const base = safeSlug(context.publication?.title || context.asset?.label || context.bridgeSubject || context.suffix);
  const extension = TARGET_SPECS[targetKind]?.extension || "txt";
  return `${base}.${extension}`;
}

function defaultTableName(context) {
  return safeSlug(context.publication?.title || context.asset?.label || context.suffix, "export");
}

function targetSubjectFor(context, targetKind) {
  return `exportTarget.${context.suffix}.${targetKind}`;
}

function artifactSubjectFor(context, targetKind) {
  return `exportArtifact.${context.suffix}.${targetKind}`;
}

function fieldMappingSubjectFor(targetSubject, fieldSubject, index) {
  return `${targetSubject}.field.${safeSlug(fieldSubject || index, `field${index + 1}`)}`;
}

function contextTargetKinds(context) {
  const common = ["csv", "sqlite", "jsonManifest"];
  if (context.bridgeKind === "experimentHandoff") return ["experimentViewer", ...common];
  return common;
}

function compareTarget(left, right) {
  if (left.bridgeKind !== right.bridgeKind) return left.bridgeKind.localeCompare(right.bridgeKind);
  if (left.bridgeSubject !== right.bridgeSubject) return left.bridgeSubject.localeCompare(right.bridgeSubject);
  return left.targetKind.localeCompare(right.targetKind);
}

function contextFields(context) {
  const fields = context.dataSpace?.fields || [];
  if (context.bridgeKind === "experimentHandoff" && context.handoff) {
    const orderedSubjects = unique([
      context.handoff.timestampField,
      context.handoff.entityField,
      ...(context.handoff.measureFields || []),
      ...(context.handoff.eventFields || []),
    ]);
    return orderedSubjects
      .map(subject => fields.find(field => field.subject === subject))
      .filter(Boolean);
  }
  const assetSubject = context.asset?.subject || context.publication?.asset || "";
  const assetFields = fields.filter(field => field.asset === assetSubject);
  const previewFieldSubjects = (context.dataSpace?.sourcePreviews || [])
    .filter(preview => preview.asset === assetSubject)
    .flatMap(preview => preview.fields || []);
  const previewFields = previewFieldSubjects
    .map(subject => assetFields.find(field => field.subject === subject))
    .filter(Boolean);
  const previewFieldSet = new Set(previewFields.map(field => field.subject));
  const remaining = assetFields
    .filter(field => !previewFieldSet.has(field.subject))
    .sort((left, right) => String(left.subject || "").localeCompare(String(right.subject || "")));
  return [...previewFields, ...remaining];
}

function targetPlaintextPolicy(store, context, targetSubject) {
  return store.one(targetSubject, "plaintextPolicy")
    || context.publication?.plaintextPolicy
    || context.handoff?.plaintextPolicy
    || "";
}

function targetFilename(store, context, targetKind, targetSubject) {
  return store.one(targetSubject, "filename") || defaultFilename(context, targetKind);
}

function targetTableName(store, context, targetSubject) {
  return store.one(targetSubject, "tableName") || defaultTableName(context);
}

function targetLabel(store, context, targetKind, targetSubject) {
  const spec = TARGET_SPECS[targetKind];
  const anchor = context.publication?.title || context.asset?.label || context.bridgeSubject;
  return store.one(targetSubject, "label") || `${spec.label}: ${anchor}`;
}

function shouldOmitField(field, target = {}) {
  const policy = String(field.plaintextPolicy || "");
  if (policy === "omit") return true;
  if (target.plaintextPolicy === "omit" && (field.sensitivity || policy)) return true;
  return false;
}

function shouldMaskField(field, target = {}) {
  const policy = String(field.plaintextPolicy || "");
  if (policy === "mask" || policy === "tokenize") return true;
  if (target.plaintextPolicy === "mask" && (field.sensitivity || policy)) return true;
  return false;
}

function fieldSampleValue(store, context, field = {}) {
  const observed = Array.isArray(field.observedValues) ? field.observedValues.find(Boolean) : "";
  if (observed) return observed;
  const sourceField = field.sourceField || "";
  const direct = store.one(sourceField, "cachedValue") || store.one(sourceField, "sampleValue");
  if (direct) return direct;
  const sampleCell = store.one(sourceField, "sampleCell");
  if (sampleCell) {
    const sampleValue = store.one(sampleCell, "cachedValue") || store.one(sampleCell, "value");
    if (sampleValue) return sampleValue;
  }
  const previews = (context.dataSpace?.sourcePreviews || []).filter(preview => preview.asset === field.asset);
  for (const preview of previews) {
    for (const sampleRef of preview.sampleRefs || []) {
      const sample = store.one(sampleRef, "cachedValue") || store.one(sampleRef, "value");
      if (sample) return sample;
    }
  }
  if (field.minObserved || field.maxObserved) return field.minObserved || field.maxObserved;
  return "";
}

function buildFieldMappings(store, context, target = {}) {
  return contextFields(context)
    .map((field, sourceIndex) => ({ field, sourceIndex }))
    .filter(({ field }) => !shouldOmitField(field, target))
    .map(({ field, sourceIndex }, index) => {
      const exportedName = store.one(field.subject, "exportedName")
        || field.displayName
        || sourceFieldName(store, field)
        || field.subject;
      const exportedType = field.authoredType || field.inferredType || "string";
      const rawValue = fieldSampleValue(store, context, field);
      return {
        subject: fieldMappingSubjectFor(target.subject, field.subject, index),
        sourceField: field.subject,
        sourceFieldName: sourceFieldName(store, field),
        exportedName,
        exportedType,
        role: field.role || "",
        order: index + 1,
        sourceOrder: sourceIndex + 1,
        plaintextPolicy: field.plaintextPolicy || "",
        sensitivity: field.sensitivity || "",
        sampleValue: shouldMaskField(field, target) && rawValue ? "****" : rawValue,
      };
    });
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function csvText(mappings) {
  const headers = mappings.map(mapping => csvCell(mapping.exportedName)).join(",");
  const row = mappings.map(mapping => csvCell(mapping.sampleValue)).join(",");
  return `${headers}\n${row}\n`;
}

function sqliteAffinity(type) {
  switch (String(type || "").toLowerCase()) {
    case "integer":
    case "int":
      return "INTEGER";
    case "number":
    case "decimal":
    case "float":
    case "double":
      return "REAL";
    case "boolean":
      return "INTEGER";
    default:
      return "TEXT";
  }
}

function sqliteIdent(value) {
  return `"${String(value || "field").replaceAll('"', '""')}"`;
}

function sqliteValue(value, type) {
  if (value == null || value === "") return "NULL";
  const normalizedType = String(type || "").toLowerCase();
  if (["integer", "int", "number", "decimal", "float", "double"].includes(normalizedType) && /^-?\d+(\.\d+)?$/.test(String(value))) {
    return String(value);
  }
  if (normalizedType === "boolean" && /^(true|false)$/i.test(String(value))) {
    return /^true$/i.test(String(value)) ? "1" : "0";
  }
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqliteSql(target, mappings) {
  const columns = mappings
    .map(mapping => `  ${sqliteIdent(mapping.exportedName)} ${sqliteAffinity(mapping.exportedType)}`)
    .join(",\n");
  const names = mappings.map(mapping => sqliteIdent(mapping.exportedName)).join(", ");
  const values = mappings.map(mapping => sqliteValue(mapping.sampleValue, mapping.exportedType)).join(", ");
  return [
    `-- DataSpace export target: ${target.subject}`,
    `-- Bridge: ${target.bridgeKind} ${target.bridgeSubject}`,
    `-- Asset: ${target.asset || ""}`,
    `-- Publication: ${target.publication || ""}`,
    `-- Validation: ${target.validationResult || ""}`,
    `CREATE TABLE IF NOT EXISTS ${sqliteIdent(target.tableName)} (`,
    columns || "  __empty TEXT",
    ");",
    mappings.length
      ? `INSERT INTO ${sqliteIdent(target.tableName)} (${names}) VALUES (${values});`
      : `-- No exported fields available for ${target.tableName}.`,
    "",
  ].join("\n");
}

function jsonManifest(target, mappings, artifactSubject) {
  return `${JSON.stringify({
    subject: artifactSubject,
    target: {
      subject: target.subject,
      label: target.label,
      targetKind: target.targetKind,
      format: target.format,
      filename: target.filename,
      tableName: target.tableName,
      state: target.state,
      plaintextPolicy: target.plaintextPolicy,
    },
    bridge: {
      bridgeKind: target.bridgeKind,
      bridgeSubject: target.bridgeSubject,
      asset: target.asset,
      publication: target.publication,
      validationResult: target.validationResult,
      source: target.source,
      sourceArtifact: target.sourceArtifact,
    },
    fields: mappings.map(mapping => ({
      sourceField: mapping.sourceField,
      sourceFieldName: mapping.sourceFieldName,
      exportedName: mapping.exportedName,
      exportedType: mapping.exportedType,
      role: mapping.role,
      order: mapping.order,
      plaintextPolicy: mapping.plaintextPolicy,
      sensitivity: mapping.sensitivity,
    })),
  }, null, 2)}\n`;
}

function experimentFactsPreview(target, mappings) {
  return [
    `# Experiment Viewer bootstrap target ${target.subject}`,
    `("${target.subject}", "isa", "DataExportTarget")`,
    `("${target.subject}", "targetKind", "experimentViewer")`,
    `("${target.subject}", "asset", "${target.asset || ""}")`,
    `("${target.subject}", "publication", "${target.publication || ""}")`,
    ...mappings.map(mapping => `("${mapping.subject}", "sourceField", "${mapping.sourceField}") ("${mapping.subject}", "exportedName", "${mapping.exportedName}")`),
    "",
  ].join("\n");
}

export function artifactContent(target, mappings, artifactSubject) {
  switch (target.targetKind) {
    case "csv":
      return csvText(mappings);
    case "sqlite":
      return sqliteSql(target, mappings);
    case "jsonManifest":
      return jsonManifest(target, mappings, artifactSubject);
    case "experimentViewer":
      return experimentFactsPreview(target, mappings);
    default:
      return "";
  }
}

export function listDataExportContexts(store, dataSpaceSubject = null, options = {}) {
  const bridgeKind = String(options.bridgeKind || "all");
  const targetKind = String(options.targetKind || "all");
  const trustedContexts = listTrustedDataBridgeContexts(store, dataSpaceSubject, { bridgeKind });
  return trustedContexts
    .flatMap(context => contextTargetKinds(context)
      .filter(kind => targetKind === "all" || kind === targetKind)
      .map(kind => {
        const subject = targetSubjectFor(context, kind);
        const spec = TARGET_SPECS[kind];
        const target = {
          trustedContext: context,
          subject,
          label: targetLabel(store, context, kind, subject),
          targetKind: kind,
          format: store.one(subject, "format") || spec.format,
          bridgeKind: context.bridgeKind,
          bridgeSubject: context.bridgeSubject,
          suffix: trustedBridgeSuffix(context.bridgeSubject),
          asset: context.asset?.subject || context.handoff?.asset || context.publication?.asset || "",
          publication: context.publication?.subject || context.handoff?.publication || "",
          validationResult: context.validationResult?.subject || context.handoff?.validationResult || context.publication?.validationResult || "",
          source: context.source?.subject || context.asset?.source || "",
          sourceArtifact: context.sourceArtifact || context.asset?.sourceObject || "",
          state: store.one(subject, "state") || "ready",
          plaintextPolicy: targetPlaintextPolicy(store, context, subject),
          filename: targetFilename(store, context, kind, subject),
          tableName: targetTableName(store, context, subject),
          familyPolicy: context.familyPolicy?.subject || "",
          policyRule: context.policyRule?.subject || "",
        };
        target.fieldMappings = buildFieldMappings(store, context, target);
        return target;
      }))
    .sort(compareTarget);
}

export function computeDataExportTargets(store, dataSpaceSubject = null, options = {}) {
  return listDataExportContexts(store, dataSpaceSubject, options);
}

export function computeDataExportArtifacts(store, dataSpaceSubject = null, options = {}) {
  return listDataExportContexts(store, dataSpaceSubject, options).map(target => {
    const spec = TARGET_SPECS[target.targetKind];
    const subject = artifactSubjectFor(target.trustedContext, target.targetKind);
    const content = artifactContent(target, target.fieldMappings, subject);
    return {
      subject,
      target: target.subject,
      targetKind: target.targetKind,
      artifactKind: spec.artifactKind,
      filename: target.filename,
      mimeType: spec.mimeType,
      content,
      previewPayload: content,
      validationResult: target.validationResult,
      provenanceReference: target.sourceArtifact || target.asset || target.publication,
      targetRecord: target,
      fieldMappings: target.fieldMappings,
    };
  });
}

export function computeDataExportFacts(store, dataSpaceSubject = null, options = {}) {
  const artifacts = computeDataExportArtifacts(store, dataSpaceSubject, options);
  return artifacts.flatMap(artifact => {
    const target = artifact.targetRecord;
    return [
      fact(target.subject, "isa", "DataExportTarget"),
      fact(target.subject, "label", target.label),
      fact(target.subject, "targetKind", target.targetKind),
      fact(target.subject, "format", target.format),
      ...(target.asset ? [fact(target.subject, "asset", target.asset)] : []),
      ...(target.publication ? [fact(target.subject, "publication", target.publication)] : []),
      ...(target.validationResult ? [fact(target.subject, "validationResult", target.validationResult)] : []),
      fact(target.subject, "state", target.state),
      ...(target.plaintextPolicy ? [fact(target.subject, "plaintextPolicy", target.plaintextPolicy)] : []),
      fact(target.subject, "filename", target.filename),
      ...(target.tableName ? [fact(target.subject, "tableName", target.tableName)] : []),
      ...target.fieldMappings.flatMap(mapping => [
        fact(target.subject, "fieldMapping", mapping.subject),
        fact(mapping.subject, "isa", "DataExportFieldMapping"),
        fact(mapping.subject, "target", target.subject),
        fact(mapping.subject, "sourceField", mapping.sourceField),
        fact(mapping.subject, "exportedName", mapping.exportedName),
        fact(mapping.subject, "exportedType", mapping.exportedType),
        ...(mapping.role ? [fact(mapping.subject, "role", mapping.role)] : []),
        fact(mapping.subject, "order", mapping.order),
      ]),
      fact(artifact.subject, "isa", "DataExportArtifact"),
      fact(artifact.subject, "target", target.subject),
      fact(artifact.subject, "artifactKind", artifact.artifactKind),
      fact(artifact.subject, "filename", artifact.filename),
      fact(artifact.subject, "mimeType", artifact.mimeType),
      fact(artifact.subject, "content", artifact.content),
      ...(artifact.validationResult ? [fact(artifact.subject, "validationResult", artifact.validationResult)] : []),
      ...(artifact.provenanceReference ? [fact(artifact.subject, "provenanceReference", artifact.provenanceReference)] : []),
    ];
  });
}
