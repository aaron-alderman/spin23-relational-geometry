import { canonicalizeBlobStored, canonicalizeMimeType, canonicalizeValue } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/canonical-values.mjs";
import { FactStore } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs";
import {
  ADMISSIBILITY_DIAGNOSTIC_CODES,
  AdmissibilityError,
  admissibilityDiagnostic,
  uniqueAdmissibilityIssues,
} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/diagnostics.mjs";
import { normalizeProposal } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/proposal.mjs";

export const SUPPORTED_SLOT_VALUE_TYPES = Object.freeze(["string", "boolean", "integer", "number", "ref", "blob"]);
export const SUPPORTED_SLOT_CARDINALITIES = Object.freeze(["one", "optional", "many", "min1"]);

const SUPPORTED_SLOT_VALUE_TYPE_SET = new Set(SUPPORTED_SLOT_VALUE_TYPES);
const SUPPORTED_SLOT_CARDINALITY_SET = new Set(SUPPORTED_SLOT_CARDINALITIES);
const interfaceValidationPlanCache = new WeakMap();

function asStore(facts) {
  if (facts instanceof FactStore) return facts;
  if (facts?.facts instanceof FactStore) return facts.facts;
  return FactStore.from(facts || []);
}

function asFactsArray(facts) {
  if (Array.isArray(facts)) return facts;
  if (facts instanceof FactStore) return facts.toArray();
  if (facts?.facts instanceof FactStore) return facts.facts.toArray();
  if (typeof facts?.toArray === "function") return facts.toArray();
  return [...(facts || [])];
}

function activeFactsFromLog(facts = []) {
  const active = new Map();
  for (const fact of facts || []) {
    const key = `${fact.s}\u0000${fact.p}\u0000${fact.o}`;
    if (fact.pol === "is-not") active.delete(key);
    else active.set(key, fact);
  }
  return [...active.values()];
}

function activeReferenceStore(referenceFacts) {
  const source = referenceFacts?.facts instanceof FactStore ? referenceFacts.facts : referenceFacts;
  if (source instanceof FactStore) return source;
  return FactStore.from(activeFactsFromLog(asFactsArray(referenceFacts)));
}

function factRef(fact, extra = {}) {
  return fact ? {
    file: fact.file,
    line: fact.line,
    subject: fact.s,
    predicate: fact.p,
    object: fact.o,
    ...extra,
  } : extra;
}

function requireSingle(facts, subject, predicate, fail, label = subject) {
  const values = asStore(facts).objects(subject, predicate);
  if (values.length !== 1) {
    fail(`${label} must have exactly one "${predicate}" fact; found ${values.length}.`);
  }
  return values[0];
}

function optionalSingle(facts, subject, predicate, fail, label = subject) {
  const values = asStore(facts).objects(subject, predicate);
  if (values.length > 1) {
    fail(`${label} must have at most one "${predicate}" fact; found ${values.length}.`);
  }
  return values[0];
}

function defaultFail(message) {
  throw new Error(message);
}

export function compileInterfaces(schemaFacts, { fail = defaultFail } = {}) {
  const facts = asStore(schemaFacts);
  const interfaceSubjects = facts.distinctSubjects("isa", "Interface");
  const interfaces = new Map();
  for (const subject of interfaceSubjects) {
    const type = requireSingle(facts, subject, "type", fail, `Interface ${subject}`);
    const mode = requireSingle(facts, subject, "mode", fail, `Interface ${subject}`);
    const slotSubjects = facts.objects(subject, "slot");
    const slots = slotSubjects.map(slotSubject => {
      const valueType = requireSingle(facts, slotSubject, "valueType", fail, `Slot ${slotSubject}`);
      const cardinality = requireSingle(facts, slotSubject, "cardinality", fail, `Slot ${slotSubject}`);
      const mimeSlot = optionalSingle(facts, slotSubject, "mimeSlot", fail, `Slot ${slotSubject}`);
      const expects = optionalSingle(facts, slotSubject, "expects", fail, `Slot ${slotSubject}`);
      if (!SUPPORTED_SLOT_VALUE_TYPE_SET.has(valueType)) {
        fail(`Slot ${slotSubject} declares unsupported valueType "${valueType}".`);
      }
      if (!SUPPORTED_SLOT_CARDINALITY_SET.has(cardinality)) {
        fail(`Slot ${slotSubject} declares unsupported cardinality "${cardinality}".`);
      }
      if (valueType === "blob" && !mimeSlot) {
        fail(`Slot ${slotSubject} with valueType "blob" must declare exactly one mimeSlot.`);
      }
      if (expects && valueType !== "ref") {
        fail(`Slot ${slotSubject} declares expects "${expects}" but its valueType is "${valueType}"; expects is valid only for ref slots.`);
      }
      return Object.freeze({
        subject: slotSubject,
        predicate: requireSingle(facts, slotSubject, "predicate", fail, `Slot ${slotSubject}`),
        cardinality,
        valueType,
        editorKind: optionalSingle(facts, slotSubject, "editorKind", fail, `Slot ${slotSubject}`),
        canonicalValueType: optionalSingle(facts, slotSubject, "canonicalValueType", fail, `Slot ${slotSubject}`),
        expects,
        mimeSlot,
        mimePredicate: mimeSlot ? requireSingle(facts, mimeSlot, "predicate", fail, `Slot ${mimeSlot}`) : undefined,
        allowed: Object.freeze(facts.objects(slotSubject, "allowed")),
      });
    });
    interfaces.set(type, Object.freeze({ subject, type, mode, slots: Object.freeze(slots) }));
  }
  for (const iface of interfaces.values()) {
    for (const slot of iface.slots) {
      if (slot.expects && !interfaces.has(slot.expects)) {
        fail(`Slot ${slot.subject} expects unknown interface type "${slot.expects}".`);
      }
    }
  }
  return interfaces;
}

export function activeInterfaceForTypes(types = [], interfaces = new Map(), extra = {}) {
  const matches = (Array.isArray(types) ? types : []).filter(type => interfaces.has(type));
  if (matches.length > 1) {
    return {
      issue: admissibilityDiagnostic(
        ADMISSIBILITY_DIAGNOSTIC_CODES.AMBIGUOUS_INTERFACE,
        `Subject matches multiple schema interfaces: ${matches.join(", ")}.`,
        { ...extra, types: matches },
      ),
      iface: null,
    };
  }
  return { iface: matches.length ? interfaces.get(matches[0]) : null, issue: null };
}

export function slotForPredicate(iface, predicate) {
  return iface?.slots?.find(slot => slot.predicate === predicate) || null;
}

export function validateCardinality({ count, cardinality, label = "slot", provenance = {}, subject, predicate }) {
  if (cardinality === "one" && count !== 1) {
    return admissibilityDiagnostic(
      ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SLOT_CARDINALITY,
      `${label} requires exactly one fact; found ${count}.`,
      { ...provenance, subject, predicate, cardinality, count },
    );
  }
  if (cardinality === "optional" && count > 1) {
    return admissibilityDiagnostic(
      ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SLOT_CARDINALITY,
      `${label} allows at most one fact; found ${count}.`,
      { ...provenance, subject, predicate, cardinality, count },
    );
  }
  if (cardinality === "min1" && count < 1) {
    return admissibilityDiagnostic(
      ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SLOT_CARDINALITY,
      `${label} requires at least one fact; found ${count}.`,
      { ...provenance, subject, predicate, cardinality, count },
    );
  }
  if (!SUPPORTED_SLOT_CARDINALITY_SET.has(cardinality)) {
    return admissibilityDiagnostic(
      ADMISSIBILITY_DIAGNOSTIC_CODES.UNSUPPORTED_SLOT_CARDINALITY,
      `Unsupported slot cardinality "${cardinality}" for ${label}.`,
      { ...provenance, subject, predicate, cardinality, count },
    );
  }
  return null;
}

export function canonicalizeSlotValue(slot = {}, value, { mimeType = "" } = {}) {
  if (slot.valueType === "blob") {
    const canonicalMimeType = canonicalizeMimeType(mimeType);
    return {
      value: canonicalizeBlobStored({ mimeType: canonicalMimeType, stored: value }),
      mimeType: canonicalMimeType,
    };
  }
  return {
    value: canonicalizeValue(slot.valueType || "string", value),
    mimeType: "",
  };
}

export function validateSlotValue({ slot = {}, value, subject = "", predicate = slot.predicate, mimeType = "", provenance = {} }) {
  try {
    return {
      canonical: canonicalizeSlotValue(slot, value, { mimeType }),
      issue: null,
    };
  } catch (error) {
    return {
      canonical: null,
      issue: admissibilityDiagnostic(
        ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SLOT_VALUE,
        `${subject ? `${subject}.` : ""}${predicate || slot.predicate || "slot"} value "${value}" is not a canonical ${slot.valueType || "string"}: ${error.message}`,
        {
          ...provenance,
          subject,
          predicate: predicate || slot.predicate,
          object: value,
          value,
          valueType: slot.valueType || "string",
        },
      ),
    };
  }
}

export function canonicalAllowedValues(slot = {}, { provenance = {} } = {}) {
  const values = [];
  const issues = [];
  for (const value of slot.allowed || []) {
    const result = validateSlotValue({
      slot,
      value,
      subject: slot.subject,
      predicate: "allowed",
      mimeType: "application/octet-stream",
      provenance,
    });
    if (result.issue) issues.push(result.issue);
    else values.push(result.canonical.value);
  }
  return { values: Object.freeze(values), issues: Object.freeze(issues) };
}

function subjectFactsMap(facts) {
  const bySubject = new Map();
  for (const fact of facts) {
    const list = bySubject.get(fact.s) || [];
    list.push(fact);
    bySubject.set(fact.s, list);
  }
  return bySubject;
}

function factsByPredicateMap(facts) {
  const byPredicate = new Map();
  for (const fact of facts) {
    const list = byPredicate.get(fact.p) || [];
    list.push(fact);
    byPredicate.set(fact.p, list);
  }
  return byPredicate;
}

export function validationPlanForInterfaces(interfaces = new Map(), schemaFacts = []) {
  const cached = interfaceValidationPlanCache.get(interfaces);
  if (cached) return cached;
  const schemaStore = asStore(schemaFacts);
  const byType = new Map();
  for (const [type, iface] of interfaces) {
    const slotPlans = iface.slots.map(slot => {
      const allowed = canonicalAllowedValues(slot, {
        provenance: factRef((slot.allowed || []).length ? schemaStore.factsForSubjectPredicate(slot.subject, "allowed")[0] : null),
      });
      return Object.freeze({
        slot,
        allowedIssues: allowed.issues,
        allowedSet: allowed.values.length ? new Set(allowed.values) : null,
        mimePredicate: slot.mimePredicate || (slot.mimeSlot ? schemaStore.one(slot.mimeSlot, "predicate") : ""),
      });
    });
    byType.set(type, Object.freeze({
      iface,
      allowedPredicates: new Set(["isa", ...iface.slots.map(slot => slot.predicate)]),
      slotPlans: Object.freeze(slotPlans),
    }));
  }
  const plan = Object.freeze({ byType });
  interfaceValidationPlanCache.set(interfaces, plan);
  return plan;
}

export function validateFactsAgainstInterfaces({
  facts,
  referenceFacts = facts,
  interfaces = new Map(),
  schemaFacts = [],
  label = "facts",
  issueExtraForSlot = () => ({}),
  hintForSlot = () => "",
} = {}) {
  const factList = activeFactsFromLog(asFactsArray(facts));
  const referenceStore = activeReferenceStore(referenceFacts);
  const validationPlan = validationPlanForInterfaces(interfaces, schemaFacts);
  const issues = [];
  const bySubject = subjectFactsMap(factList);

  for (const [subject, subjectFacts] of bySubject) {
    const declaredTypes = subjectFacts.filter(fact => fact.p === "isa").map(fact => fact.o).filter(type => interfaces.has(type));
    if (!declaredTypes.length) continue;
    if (declaredTypes.length > 1) {
      issues.push(admissibilityDiagnostic(
        ADMISSIBILITY_DIAGNOSTIC_CODES.AMBIGUOUS_INTERFACE,
        `${label}: subject ${subject} matches multiple schema interfaces: ${declaredTypes.join(", ")}.`,
        factRef(subjectFacts.find(fact => fact.p === "isa"), { subject, types: declaredTypes }),
      ));
      continue;
    }
    const ifacePlan = validationPlan.byType.get(declaredTypes[0]);
    const iface = ifacePlan.iface;
    const subjectByPredicate = factsByPredicateMap(subjectFacts);
    if (iface.mode === "closed") {
      for (const fact of subjectFacts) {
        if (ifacePlan.allowedPredicates.has(fact.p)) continue;
        issues.push(admissibilityDiagnostic(
          ADMISSIBILITY_DIAGNOSTIC_CODES.UNKNOWN_PREDICATE,
          `${label}: subject ${subject} has unknown predicate "${fact.p}" for interface ${iface.type}.`,
          factRef(fact),
        ));
      }
    }
    for (const slotPlan of ifacePlan.slotPlans) {
      const slot = slotPlan.slot;
      const slotFacts = subjectByPredicate.get(slot.predicate) || [];
      const slotExtra = issueExtraForSlot({ subject, predicate: slot.predicate, slot, iface }) || {};
      const slotHint = hintForSlot({ subject, predicate: slot.predicate, slot, iface }) || slotExtra.hint || "";
      const provenance = slotFacts[0] ? factRef(slotFacts[0]) : factRef(subjectFacts[0], { subject, predicate: slot.predicate });
      const cardinalityIssue = validateCardinality({
        count: slotFacts.length,
        cardinality: slot.cardinality,
        label: `${label}: ${subject}.${slot.predicate}`,
        provenance: {
          ...provenance,
          ...slotExtra,
          ...(slotHint ? { hint: slotHint } : {}),
        },
        subject,
        predicate: slot.predicate,
      });
      if (cardinalityIssue) issues.push(cardinalityIssue);

      issues.push(...slotPlan.allowedIssues);
      const allowedSet = slotPlan.allowedSet;

      for (const fact of slotFacts) {
        let mimeType = "";
        if (slot.valueType === "blob") {
          const mimePredicate = slotPlan.mimePredicate;
          const mimeFacts = mimePredicate ? subjectByPredicate.get(mimePredicate) || [] : [];
          if (!mimeFacts.length) {
            issues.push(admissibilityDiagnostic(
              ADMISSIBILITY_DIAGNOSTIC_CODES.MISSING_BLOB_MIME,
              `${label}: ${fact.s}.${fact.p} requires companion MIME slot ${slot.mimeSlot || mimePredicate}.`,
              {
                ...factRef(fact),
                ...slotExtra,
                ...(slotHint ? { hint: slotHint } : {}),
                mimeSlot: slot.mimeSlot,
                mimePredicate,
              },
            ));
            continue;
          }
          mimeType = mimeFacts[mimeFacts.length - 1].o;
        }

        const result = validateSlotValue({
          slot,
          value: fact.o,
          subject: fact.s,
          predicate: fact.p,
          mimeType,
          provenance: {
            ...factRef(fact),
            ...slotExtra,
            ...(slotHint ? { hint: slotHint } : {}),
          },
        });
        if (result.issue) {
          issues.push(result.issue);
          continue;
        }
        if (allowedSet && !allowedSet.has(result.canonical.value)) {
          issues.push(admissibilityDiagnostic(
            ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_ALLOWED_VALUE,
            `${label}: ${subject}.${slot.predicate} value "${fact.o}" is not allowed. Allowed: ${(slot.allowed || []).join(", ")}.`,
            {
              ...factRef(fact),
              ...slotExtra,
              ...(slotHint ? { hint: slotHint } : {}),
              allowed: [...(slot.allowed || [])],
            },
          ));
        }
        if (slot.expects) {
          const actualTypes = referenceStore.activeTypes(fact.o);
          if (!actualTypes.includes(slot.expects)) {
            issues.push(admissibilityDiagnostic(
              ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SLOT_REFERENCE_TYPE,
              `${label}: ${subject}.${slot.predicate} expects a ${slot.expects} reference; ${fact.o} has types ${actualTypes.length ? actualTypes.join(", ") : "<none>"}.`,
              {
                ...factRef(fact),
                ...slotExtra,
                ...(slotHint ? { hint: slotHint } : {}),
                expectedType: slot.expects,
                actualTypes,
              },
            ));
          }
        }
      }

      if (slot.valueType === "blob" && slotFacts.length) {
        const mimePredicate = slotPlan.mimePredicate;
        if (!mimePredicate) continue;
        const mimeFacts = subjectByPredicate.get(mimePredicate) || [];
        const mimeCardinalityIssue = validateCardinality({
          count: mimeFacts.length,
          cardinality: "one",
          label: `${label}: ${subject}.${mimePredicate}`,
          provenance: mimeFacts[0] ? factRef(mimeFacts[0]) : factRef(slotFacts[0]),
          subject,
          predicate: mimePredicate,
        });
        if (mimeCardinalityIssue) issues.push(mimeCardinalityIssue);
      }
    }
  }

  return uniqueAdmissibilityIssues(issues);
}

export function admitSchemaFacts({ facts, interfaces = new Map(), label = "facts", provenance = {}, schemaFacts = facts } = {}) {
  const issues = validateFactsAgainstInterfaces({
    facts,
    interfaces,
    schemaFacts,
    label,
  }).map(issue => admissibilityDiagnostic(issue.code, issue.message, {
    ...provenance,
    ...issue,
  }));
  if (issues.length) throw new AdmissibilityError(issues);
  return { ok: true, issues: Object.freeze([]) };
}

export function admitFacts({
  basisFacts = [],
  proposalFacts = [],
  referenceTypeFacts,
  interfaces = new Map(),
  authority = null,
  mode = "runtime",
  provenance = {},
} = {}) {
  const proposal = normalizeProposal({ facts: proposalFacts, mode, provenance });
  const combinedFacts = FactStore.concat(basisFacts, proposal.facts);
  const validationReferenceFacts = referenceTypeFacts === undefined
    ? combinedFacts
    : FactStore.concat(combinedFacts, referenceTypeFacts);
  const issues = [];
  if (authority && typeof authority.admit === "function") {
    const authorityResult = authority.admit({ basisFacts, proposal, interfaces, mode, provenance });
    if (Array.isArray(authorityResult?.issues)) issues.push(...authorityResult.issues);
  }
  issues.push(...validateFactsAgainstInterfaces({
    facts: combinedFacts,
    referenceFacts: validationReferenceFacts,
    interfaces,
    schemaFacts: basisFacts,
    label: mode || "proposal",
  }));
  const unique = uniqueAdmissibilityIssues(issues);
  if (unique.length) throw new AdmissibilityError(unique);
  return {
    ok: true,
    proposal,
    facts: combinedFacts,
    issues: Object.freeze([]),
  };
}
