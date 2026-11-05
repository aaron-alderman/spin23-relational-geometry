import {
  ADMISSIBILITY_DIAGNOSTIC_CODES,
  AdmissibilityError,
  uniqueAdmissibilityIssues,
} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/diagnostics.mjs";
import {
  declarationIssue,
  specializeGenericDeclarationIssues,
} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/declaration-diagnostics.mjs";
import { LANE_TYPE } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/lane-runtime.mjs";

const INVALID_PERSISTENCE_METADATA_CODE = ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_PERSISTENCE_METADATA_DECLARATION;

function asFactsArray(facts) {
  if (Array.isArray(facts)) return facts;
  if (typeof facts?.toArray === "function") return facts.toArray();
  if (facts?.facts) return asFactsArray(facts.facts);
  return [...(facts || [])];
}

const declarationFactIndexCache = new WeakMap();

function declarationFactIndex(facts) {
  if (!facts || typeof facts !== "object") return null;
  const cached = declarationFactIndexCache.get(facts);
  if (cached) return cached;
  const index = {
    bySubject: new Map(),
    knownSubjects: new Set(),
    types: new Map(),
    subjectsByType: new Map(),
    isaObjects: new Set(),
  };
  const subjectEntry = subject => {
    let entry = index.bySubject.get(subject);
    if (!entry) {
      entry = { all: [], byPredicate: new Map() };
      index.bySubject.set(subject, entry);
    }
    return entry;
  };
  for (const fact of facts) {
    index.knownSubjects.add(fact.s);
    const entry = subjectEntry(fact.s);
    entry.all.push(fact);
    const predicateFacts = entry.byPredicate.get(fact.p) || [];
    predicateFacts.push(fact);
    entry.byPredicate.set(fact.p, predicateFacts);
    if (fact.p !== "isa") continue;
    index.isaObjects.add(fact.o);
    const typeSet = index.types.get(fact.s) || new Set();
    typeSet.add(fact.o);
    index.types.set(fact.s, typeSet);
    const subjects = index.subjectsByType.get(fact.o) || new Set();
    subjects.add(fact.s);
    index.subjectsByType.set(fact.o, subjects);
  }
  declarationFactIndexCache.set(facts, index);
  return index;
}

function matchingFacts(facts, subject, predicate = null) {
  const entry = declarationFactIndex(facts)?.bySubject.get(subject);
  if (!entry) return [];
  return predicate == null ? entry.all : entry.byPredicate.get(predicate) || [];
}

function subjectsOfType(facts, type) {
  return [...(declarationFactIndex(facts)?.subjectsByType.get(type) || [])];
}

const many = (facts, subject, predicate) => matchingFacts(facts, subject, predicate).map(fact => fact.o);

function expectedList(values) {
  return values.length ? values.join(", ") : "<none>";
}

function factRef(fact, extra = {}) {
  return fact ? { file: fact.file, line: fact.line, subject: fact.s, predicate: fact.p, ...extra } : extra;
}

function findFact(facts, subject, predicate = null, object = undefined) {
  for (const fact of matchingFacts(facts, subject, predicate)) {
    if (object !== undefined && fact.o !== object) continue;
    return fact;
  }
  return undefined;
}

function subjectRef(facts, subject, predicate = null, object = undefined, fallback = {}) {
  return factRef(findFact(facts, subject, predicate, object) || findFact(facts, subject), fallback);
}

function issueWithHint(message, hint, extra = {}) {
  return {
    ...(typeof message === "object" && message !== null ? message : { message }),
    ...(hint ? { hint } : {}),
    ...extra,
  };
}

function requireSingle(facts, subject, predicate, label, issues) {
  const matches = matchingFacts(facts, subject, predicate);
  if (matches.length !== 1) {
    issues.push(declarationIssue(
      `${label} must have exactly one "${predicate}" fact; found ${matches.length}.`,
      matches[0] ? factRef(matches[0]) : subjectRef(facts, subject, null, undefined, { subject, predicate }),
    ));
  }
  return matches[0]?.o;
}

function optionalSingle(facts, subject, predicate, label, issues) {
  const matches = matchingFacts(facts, subject, predicate);
  if (matches.length > 1) {
    issues.push(declarationIssue(
      `${label} must have at most one "${predicate}" fact; found ${matches.length}.`,
      factRef(matches[0]),
    ));
  }
  return matches[0]?.o;
}

function typeSetForFacts(facts) {
  return declarationFactIndex(facts)?.types || new Map();
}

function knownSubjectsFromFacts(facts) {
  return declarationFactIndex(facts)?.knownSubjects || new Set();
}

function knownTypeNamesFromFacts(facts, issues) {
  const index = declarationFactIndex(facts);
  const knownTypeNames = new Set(index?.isaObjects || []);
  for (const subject of index?.subjectsByType.get("Interface") || []) {
    const type = requireSingle(facts, subject, "type", `Interface ${subject}`, issues);
    if (type) knownTypeNames.add(type);
  }
  return knownTypeNames;
}

function interfaceParentTypeMap(facts, issues) {
  const parents = new Map();
  for (const subject of declarationFactIndex(facts)?.subjectsByType.get("Interface") || []) {
    const type = requireSingle(facts, subject, "type", `Interface ${subject}`, issues);
    if (!type) continue;
    const parentType = matchingFacts(facts, subject, "parentType").at(-1)?.o;
    if (parentType) parents.set(type, parentType);
  }
  return parents;
}

function interfaceSubjectForType(facts, type) {
  for (const [subject, entry] of declarationFactIndex(facts)?.bySubject || []) {
    if ((entry.byPredicate.get("type") || []).some(fact => fact.o === type)) return subject;
  }
  return undefined;
}

export function validateTaxonomyDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const knownTypeNames = new Set();
  const interfaceSubjects = [];
  const seenInterfaceSubjects = new Set();
  const dataBySubject = new Map();
  const interfaceSubjectByType = new Map();
  const dataFor = subject => {
    let data = dataBySubject.get(subject);
    if (!data) {
      data = { typeFacts: [], parentTypeFacts: [], firstFact: null };
      dataBySubject.set(subject, data);
    }
    return data;
  };
  for (const fact of facts) {
    if (fact.p === "isa") {
      knownTypeNames.add(fact.o);
      if (fact.o === "Interface" && !seenInterfaceSubjects.has(fact.s)) {
        seenInterfaceSubjects.add(fact.s);
        interfaceSubjects.push(fact.s);
      }
    }
    if (fact.p === "type" || fact.p === "parentType") {
      const data = dataFor(fact.s);
      data.firstFact ||= fact;
      if (fact.p === "type") {
        data.typeFacts.push(fact);
        if (!interfaceSubjectByType.has(fact.o)) interfaceSubjectByType.set(fact.o, fact.s);
      } else {
        data.parentTypeFacts.push(fact);
      }
    }
  }
  const requireSingleType = subject => {
    const matches = dataBySubject.get(subject)?.typeFacts || [];
    if (matches.length !== 1) {
      issues.push(declarationIssue(
        `Interface ${subject} must have exactly one "type" fact; found ${matches.length}.`,
        matches[0] ? factRef(matches[0]) : subjectRef(facts, subject, null, undefined, { subject, predicate: "type" }),
      ));
    }
    return matches[0]?.o;
  };
  const parentTypes = new Map();
  for (const subject of interfaceSubjects) {
    const type = requireSingleType(subject);
    if (!type) continue;
    knownTypeNames.add(type);
    const parentTypeFacts = dataBySubject.get(subject)?.parentTypeFacts || [];
    if (parentTypeFacts.length > 1) {
      issues.push(declarationIssue(issueWithHint({
        code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_TAXONOMY_INHERITANCE,
        message: `${label}: Interface type "${type}" must declare at most one parentType; found ${parentTypeFacts.length}.`,
      }, "Keep taxonomy single-parent in this tranche. Leave one parentType fact on the Interface and model additional browse groupings with explicit contexts or other authored relations.", {
        type,
        parentTypes: parentTypeFacts.map(fact => fact.o),
      }), factRef(parentTypeFacts[0])));
    }
    const parentType = parentTypeFacts.at(-1)?.o;
    if (parentType) parentTypes.set(type, parentType);
  }
  for (const [type, parentType] of parentTypes) {
    const interfaceSubject = interfaceSubjectByType.get(type);
    if (!knownTypeNames.has(parentType)) {
      issues.push(declarationIssue(issueWithHint({
        code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_TAXONOMY_INHERITANCE,
        message: `${label}: Interface type "${type}" declares unknown parentType "${parentType}".`,
      }, `Author an Interface whose type is "${parentType}" or remove this parentType fact. parentType must point to a known interface type, not an instance subject.`, {
        type,
        parentType,
      }), subjectRef(facts, interfaceSubject, "parentType", parentType)));
    }
    if (type === parentType) {
      issues.push(declarationIssue(issueWithHint({
        code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_TAXONOMY_INHERITANCE,
        message: `${label}: Interface type "${type}" cannot declare itself as parentType.`,
      }, "Remove the self-reference or choose a different immediate parent. parentType only points upward to another interface type.", {
        type,
        parentType,
      }), subjectRef(facts, interfaceSubject, "parentType", parentType)));
    }
  }

  for (const type of parentTypes.keys()) {
    const seen = new Set([type]);
    let current = parentTypes.get(type);
    while (current) {
      if (seen.has(current)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_TAXONOMY_INHERITANCE,
          message: `${label}: taxonomy cycle detected involving "${type}" and "${current}".`,
        }, "Break the cycle so every Interface can reach the root through at most one parentType chain.", {
          type,
          parentType: current,
        }), subjectRef(facts, interfaceSubjectByType.get(type), "parentType", current)));
        break;
      }
      seen.add(current);
      current = parentTypes.get(current);
    }
  }
  return uniqueAdmissibilityIssues(issues);
}

export function validateContextDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const knownSubjects = knownSubjectsFromFacts(facts);
  const knownTypeNames = knownTypeNamesFromFacts(facts, issues);
  const contextSubjects = [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "Context").map(fact => fact.s))];
  const bindingSubjects = new Set(facts.filter(fact => fact.p === "isa" && fact.o === "ContextBinding").map(fact => fact.s));
  const referenceSubjects = new Set(facts.filter(fact => fact.p === "isa" && fact.o === "ContextReference").map(fact => fact.s));
  const contextNames = new Map();
  for (const context of contextSubjects) {
    const name = requireSingle(facts, context, "name", `Context ${context}`, issues);
    if (name && contextNames.has(name)) {
      issues.push(declarationIssue(
        `${label}: duplicate Context name "${name}" (${contextNames.get(name)} and ${context}).`,
        subjectRef(facts, context, "name", name),
      ));
    }
    if (name) contextNames.set(name, context);
    const localNames = new Map();
    for (const binding of many(facts, context, "binding")) {
      if (!bindingSubjects.has(binding)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: Context ${context}.binding references non-ContextBinding "${binding}".`,
        }, "Move membership entries under a ContextBinding subject attached through context.binding. Use ContextReference under context.reference for reference-only presence.", { context, binding }),
        subjectRef(facts, context, "binding", binding)));
        continue;
      }
      const subject = optionalSingle(facts, binding, "subject", `ContextBinding ${binding}`, issues);
      const memberIsa = optionalSingle(facts, binding, "memberIsa", `ContextBinding ${binding}`, issues);
      if (!subject && !memberIsa) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding} must define exactly one of subject or memberIsa.`,
        }, "Use subject for one explicit member or memberIsa for taxonomy-wide membership. A binding cannot omit both.", {
          context,
          binding,
        }), subjectRef(facts, binding)));
      }
      if (subject && memberIsa) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding} cannot declare both subject and memberIsa.`,
        }, "Choose one membership mode per binding: subject for one member, or memberIsa for taxonomy-wide membership.", {
          context,
          binding,
          targetSubject: subject,
          memberIsa,
        }), subjectRef(facts, binding, "memberIsa", memberIsa)));
      }
      if (subject && !knownSubjects.has(subject)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding}.subject references unknown subject "${subject}".`,
        }, "Author the target subject in the same project or remove the binding. Context membership cannot point to a missing subject.", {
          context,
          binding,
          targetSubject: subject,
        }), subjectRef(facts, binding, "subject", subject)));
      }
      if (memberIsa && !knownTypeNames.has(memberIsa)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding}.memberIsa must reference a known interface type; found "${memberIsa}".`,
        }, "memberIsa must name an Interface type such as Task or WorkItem, not an instance subject.", {
          context,
          binding,
          memberIsa,
        }), subjectRef(facts, binding, "memberIsa", memberIsa)));
      }
      const includeDerived = optionalSingle(facts, binding, "includeDerived", `ContextBinding ${binding}`, issues);
      if (includeDerived && !memberIsa) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding}.includeDerived is only valid on taxonomy-wide membership bindings.`,
        }, "Move includeDerived onto a memberIsa-based binding or remove it from this subject-specific binding.", {
          context,
          binding,
          includeDerived,
        }), subjectRef(facts, binding, "includeDerived", includeDerived)));
      }
      const representation = optionalSingle(facts, binding, "representation", `ContextBinding ${binding}`, issues);
      if (representation && !knownSubjects.has(representation)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: ContextBinding ${binding}.representation references unknown subject "${representation}".`,
        }, "Representation must point at an existing subject. If the subject should only be named without membership, use ContextReference instead.", {
          context,
          binding,
          representation,
        }), subjectRef(facts, binding, "representation", representation)));
      }
      const bindingName = optionalSingle(facts, binding, "name", `ContextBinding ${binding}`, issues);
      if (bindingName && localNames.has(bindingName)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_MEMBERSHIP_DECLARATION,
          message: `${label}: Context ${context} defines duplicate context-local name "${bindingName}" (${localNames.get(bindingName)} and ${binding}).`,
        }, "Choose one unique scoped name per context. If both subjects need handles, rename one entry or move it into a different context.", {
          context,
          name: bindingName,
          conflicts: [localNames.get(bindingName), binding],
        }), subjectRef(facts, binding, "name", bindingName)));
      }
      if (bindingName) localNames.set(bindingName, binding);
    }
    for (const reference of many(facts, context, "reference")) {
      if (!referenceSubjects.has(reference)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: Context ${context}.reference references non-ContextReference "${reference}".`,
        }, "Move reference-only entries under a ContextReference subject attached through context.reference. Use ContextBinding under context.binding for membership.", { context, reference }),
        subjectRef(facts, context, "reference", reference)));
        continue;
      }
      const subject = requireSingle(facts, reference, "subject", `ContextReference ${reference}`, issues);
      if (subject && !knownSubjects.has(subject)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: ContextReference ${reference}.subject references unknown subject "${subject}".`,
        }, "Author the target subject in the same project or remove the reference. Context references always target an existing subject directly.", {
          context,
          reference,
          targetSubject: subject,
        }), subjectRef(facts, reference, "subject", subject)));
      }
      const memberIsa = optionalSingle(facts, reference, "memberIsa", `ContextReference ${reference}`, issues);
      if (memberIsa) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: ContextReference ${reference} cannot declare memberIsa.`,
        }, "ContextReference always targets one existing subject directly. Use ContextBinding.memberIsa for taxonomy-wide membership.", {
          context,
          reference,
          memberIsa,
        }), subjectRef(facts, reference, "memberIsa", memberIsa)));
      }
      const includeDerived = optionalSingle(facts, reference, "includeDerived", `ContextReference ${reference}`, issues);
      if (includeDerived) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: ContextReference ${reference} cannot declare includeDerived.`,
        }, "includeDerived only applies to ContextBinding.memberIsa. Remove it from ContextReference.", {
          context,
          reference,
          includeDerived,
        }), subjectRef(facts, reference, "includeDerived", includeDerived)));
      }
      const representation = optionalSingle(facts, reference, "representation", `ContextReference ${reference}`, issues);
      if (representation && !knownSubjects.has(representation)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: ContextReference ${reference}.representation references unknown subject "${representation}".`,
        }, "Representation must point at an existing subject that the context can use as its handle or display target.", {
          context,
          reference,
          representation,
        }), subjectRef(facts, reference, "representation", representation)));
      }
      const referenceName = optionalSingle(facts, reference, "name", `ContextReference ${reference}`, issues);
      if (referenceName && localNames.has(referenceName)) {
        issues.push(declarationIssue(issueWithHint({
          code: ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_CONTEXT_REFERENCE_DECLARATION,
          message: `${label}: Context ${context} defines duplicate context-local name "${referenceName}" (${localNames.get(referenceName)} and ${reference}).`,
        }, "Choose one unique scoped name per context. Rename one entry or move it into a different context so lookup stays unambiguous.", {
          context,
          name: referenceName,
          conflicts: [localNames.get(referenceName), reference],
        }), subjectRef(facts, reference, "name", referenceName)));
      }
      if (referenceName) localNames.set(referenceName, reference);
    }
  }
  return uniqueAdmissibilityIssues(issues);
}

export function validateSemanticAuthorityDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const types = typeSetForFacts(facts);
  const knownSubjects = knownSubjectsFromFacts(facts);
  const knownTypeNames = knownTypeNamesFromFacts(facts, issues);
  const stewardSubjects = [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "Steward").map(fact => fact.s))];
  const allowedSubjectAuthorities = new Set(["authority.own", "authority.steward", "authority.classify"]);
  const allowedContextAuthorities = new Set(["authority.own", "authority.steward", "authority.attach", "authority.name", "authority.represent"]);

  for (const actor of [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "Actor").map(fact => fact.s))]) {
    for (const steward of many(facts, actor, "steward")) {
      const stewardTypes = types.get(steward) || new Set();
      if (!stewardTypes.has("Steward")) {
        issues.push(declarationIssue(
          `${label}: Actor ${actor}.steward must reference a Steward; found "${steward}".`,
          subjectRef(facts, actor, "steward", steward),
        ));
      }
    }
  }

  for (const steward of stewardSubjects) {
    for (const participant of many(facts, steward, "participant")) {
      const participantTypes = types.get(participant) || new Set();
      if (!participantTypes.has("Actor") && !participantTypes.has("Steward")) {
        issues.push(declarationIssue(
          `${label}: Steward ${steward}.participant must reference an Actor or Steward; found "${participant}".`,
          subjectRef(facts, steward, "participant", participant),
        ));
      }
      if (participant === steward) {
        issues.push(declarationIssue(
          `${label}: Steward ${steward} cannot list itself as a participant.`,
          subjectRef(facts, steward, "participant", participant),
        ));
      }
    }
  }

  for (const grant of [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "SubjectAuthorityGrant").map(fact => fact.s))]) {
    const principal = requireSingle(facts, grant, "principal", `SubjectAuthorityGrant ${grant}`, issues);
    if (principal) {
      const principalTypes = types.get(principal) || new Set();
      if (!principalTypes.has("Actor") && !principalTypes.has("Steward")) {
        issues.push(declarationIssue(issueWithHint(
          `${label}: SubjectAuthorityGrant ${grant}.principal must reference an Actor or Steward; found "${principal}".`,
          "principal must point to an Actor or Steward subject, not a Context, Route, or other runtime object.",
          { grant, principal },
        ), subjectRef(facts, grant, "principal", principal)));
      }
    }
    const subject = requireSingle(facts, grant, "subject", `SubjectAuthorityGrant ${grant}`, issues);
    if (subject && !knownSubjects.has(subject)) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: SubjectAuthorityGrant ${grant}.subject references unknown subject "${subject}".`,
        "Author the governed subject or remove the grant. Subject authority cannot target a missing subject.",
        { grant, targetSubject: subject },
      ), subjectRef(facts, grant, "subject", subject)));
    }
    const authority = requireSingle(facts, grant, "authority", `SubjectAuthorityGrant ${grant}`, issues);
    if (authority && !allowedSubjectAuthorities.has(authority)) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: SubjectAuthorityGrant ${grant}.authority must reference one of ${expectedList([...allowedSubjectAuthorities].sort())}; found "${authority}".`,
        "Use authority.own, authority.steward, or authority.classify here. Context-scoped operations like attach, name, and represent belong on ContextAuthorityGrant.",
        { grant, authority },
      ), subjectRef(facts, grant, "authority", authority)));
    }
  }

  for (const grant of [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "ContextAuthorityGrant").map(fact => fact.s))]) {
    const principal = requireSingle(facts, grant, "principal", `ContextAuthorityGrant ${grant}`, issues);
    if (principal) {
      const principalTypes = types.get(principal) || new Set();
      if (!principalTypes.has("Actor") && !principalTypes.has("Steward")) {
        issues.push(declarationIssue(issueWithHint(
          `${label}: ContextAuthorityGrant ${grant}.principal must reference an Actor or Steward; found "${principal}".`,
          "principal must point to an Actor or Steward subject, not a Context, Route, or other runtime object.",
          { grant, principal },
        ), subjectRef(facts, grant, "principal", principal)));
      }
    }
    const context = requireSingle(facts, grant, "context", `ContextAuthorityGrant ${grant}`, issues);
    if (context) {
      const contextTypes = types.get(context) || new Set();
      if (!contextTypes.has("Context")) {
        issues.push(declarationIssue(issueWithHint(
          `${label}: ContextAuthorityGrant ${grant}.context must reference a Context; found "${context}".`,
          "context must point to a Context subject. Use SubjectAuthorityGrant when the operation governs the subject itself rather than one context.",
          { grant, context },
        ), subjectRef(facts, grant, "context", context)));
      }
    }
    const authority = requireSingle(facts, grant, "authority", `ContextAuthorityGrant ${grant}`, issues);
    if (authority && !allowedContextAuthorities.has(authority)) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: ContextAuthorityGrant ${grant}.authority must reference one of ${expectedList([...allowedContextAuthorities].sort())}; found "${authority}".`,
        "Use authority.own, authority.steward, authority.attach, authority.name, or authority.represent here. Classification belongs on SubjectAuthorityGrant.",
        { grant, authority },
      ), subjectRef(facts, grant, "authority", authority)));
    }
    const subject = optionalSingle(facts, grant, "subject", `ContextAuthorityGrant ${grant}`, issues);
    if (subject && !knownSubjects.has(subject)) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: ContextAuthorityGrant ${grant}.subject references unknown subject "${subject}".`,
        "Author the governed subject or remove the scope. Context authority cannot target a missing subject.",
        { grant, context, targetSubject: subject },
      ), subjectRef(facts, grant, "subject", subject)));
    }
    const memberIsa = optionalSingle(facts, grant, "memberIsa", `ContextAuthorityGrant ${grant}`, issues);
    if (memberIsa && !knownTypeNames.has(memberIsa)) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: ContextAuthorityGrant ${grant}.memberIsa must reference a known interface type; found "${memberIsa}".`,
        "memberIsa must name an Interface type such as Task or WorkItem, not an instance subject.",
        { grant, context, memberIsa },
      ), subjectRef(facts, grant, "memberIsa", memberIsa)));
    }
    if (subject && memberIsa) {
      issues.push(declarationIssue(issueWithHint(
        `${label}: ContextAuthorityGrant ${grant} cannot declare both subject and memberIsa scope in the same grant.`,
        "Choose one scope per grant: subject for one explicit member, or memberIsa for a taxonomy slice within the context.",
        { grant, context, targetSubject: subject, memberIsa },
      ), subjectRef(facts, grant, "memberIsa", memberIsa)));
    }
  }
  return uniqueAdmissibilityIssues(specializeGenericDeclarationIssues(
    issues,
    ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SEMANTIC_AUTHORITY_DECLARATION,
  ));
}

export function validateResourcePermissionPolicyDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const types = typeSetForFacts(facts);
  const policySubjects = [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "ResourcePermissionPolicy").map(fact => fact.s))];
  const grantSubjects = new Set(facts.filter(fact => fact.p === "isa" && fact.o === "ResourcePermissionGrant").map(fact => fact.s));
  const policyByResource = new Map();
  const allowedPermissions = new Set(["perm.read", "perm.write", "perm.execute", "perm.overwriteIsa"]);

  for (const policy of policySubjects) {
    const resource = requireSingle(facts, policy, "resource", `ResourcePermissionPolicy ${policy}`, issues);
    if (!resource) continue;
    const resourceTypes = types.get(resource) || new Set();
    if (!resourceTypes.has("Route") && !resourceTypes.has("Command") && !resourceTypes.has("Context")) {
      issues.push(declarationIssue(
        `${label}: ResourcePermissionPolicy ${policy}.resource must reference a Route, Command, or Context; found "${resource}".`,
        subjectRef(facts, policy, "resource", resource),
      ));
    }
    if (policyByResource.has(resource)) {
      issues.push(declarationIssue(
        `${label}: duplicate ResourcePermissionPolicy for resource "${resource}" (${policyByResource.get(resource)} and ${policy}).`,
        subjectRef(facts, policy, "resource", resource),
      ));
    }
    policyByResource.set(resource, policy);

    for (const grant of many(facts, policy, "grant")) {
      if (!grantSubjects.has(grant)) {
        issues.push(declarationIssue(
          `${label}: ResourcePermissionPolicy ${policy}.grant references non-ResourcePermissionGrant "${grant}".`,
          subjectRef(facts, policy, "grant", grant),
        ));
      }
    }
  }

  for (const grant of grantSubjects) {
    const principal = requireSingle(facts, grant, "principal", `ResourcePermissionGrant ${grant}`, issues);
    if (!principal) continue;
    const principalTypes = types.get(principal) || new Set();
    if (!principalTypes.has("Actor") && !principalTypes.has("Role")) {
      issues.push(declarationIssue(
        `${label}: ResourcePermissionGrant ${grant}.principal must reference an Actor or Role; found "${principal}".`,
        subjectRef(facts, grant, "principal", principal),
      ));
    }

    const permission = requireSingle(facts, grant, "permission", `ResourcePermissionGrant ${grant}`, issues);
    if (!permission) continue;
    if (!allowedPermissions.has(permission)) {
      issues.push(declarationIssue(
        `${label}: ResourcePermissionGrant ${grant}.permission must reference one of ${expectedList([...allowedPermissions].sort())}; found "${permission}".`,
        subjectRef(facts, grant, "permission", permission),
      ));
    }
  }

  return uniqueAdmissibilityIssues(specializeGenericDeclarationIssues(
    issues,
    ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_RESOURCE_PERMISSION_POLICY_DECLARATION,
  ));
}

export function validateSemanticDocumentationDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const localSubjects = knownSubjectsFromFacts(facts);

  for (const subject of [...new Set(facts.filter(fact => fact.p === "isa" && fact.o === "SemanticDoc").map(fact => fact.s))]) {
    const about = requireSingle(facts, subject, "about", `SemanticDoc ${subject}`, issues);
    if (about && !localSubjects.has(about)) {
      issues.push(declarationIssue(
        `${label}: SemanticDoc ${subject}.about references unknown subject "${about}". Expected values: ${expectedList([...localSubjects].sort())}.`,
        subjectRef(facts, subject, "about", about),
      ));
    }
    for (const related of many(facts, subject, "seeAlso")) {
      if (!localSubjects.has(related)) {
        issues.push(declarationIssue(
          `${label}: SemanticDoc ${subject}.seeAlso references unknown subject "${related}". Expected values: ${expectedList([...localSubjects].sort())}.`,
          subjectRef(facts, subject, "seeAlso", related),
        ));
      }
    }
  }

  return uniqueAdmissibilityIssues(specializeGenericDeclarationIssues(
    issues,
    ADMISSIBILITY_DIAGNOSTIC_CODES.INVALID_SEMANTIC_DOCUMENTATION_DECLARATION,
  ));
}

export function admitSemanticDocumentationDeclarations({ facts = [], label = "facts" } = {}) {
  const issues = validateSemanticDocumentationDeclarations(facts, label);
  if (issues.length) throw new AdmissibilityError(issues);
  return { ok: true, issues: Object.freeze([]) };
}

export function validatePersistenceMetadataDeclarations(inputFacts, label = "facts") {
  const facts = asFactsArray(inputFacts);
  const issues = [];
  const types = typeSetForFacts(facts);
  const knownSubjects = knownSubjectsFromFacts(facts);
  const pageSubjects = subjectsOfType(facts, "Page");
  const pageBootSubjects = subjectsOfType(facts, "PageBoot");
  const laneSubjectCache = new Map();
  const laneBindingsByBoot = new Map();
  const subjectHasType = (subject, type) => (types.get(subject) || new Set()).has(type);
  const isActiveLaneSubject = subject => {
    if (laneSubjectCache.has(subject)) return laneSubjectCache.get(subject);
    let active = false;
    for (const fact of matchingFacts(facts, subject, "isa")) {
      if (fact.o === LANE_TYPE) active = fact.pol !== "is-not";
    }
    laneSubjectCache.set(subject, active);
    return active;
  };
  const latestFactValue = (subject, predicate) => {
    let value = "";
    for (const fact of matchingFacts(facts, subject, predicate)) if (fact?.pol !== "is-not") value = fact.o;
    return value;
  };
  const activeValues = (subject, predicate) => {
    const active = new Map();
    for (const fact of matchingFacts(facts, subject, predicate)) {
      if (!fact?.o) continue;
      const value = String(fact.o || "").trim();
      if (!value) continue;
      if (fact?.pol === "is-not") {
        active.delete(value);
        continue;
      }
      active.set(value, value);
    }
    return [...active.values()];
  };

  const requireBootField = (boot, predicate, kind, guidance, expectedType = "") => {
    const value = optionalSingle(facts, boot, predicate, `PageBoot ${boot}`, issues);
    if (!value) {
      issues.push(declarationIssue(issueWithHint({
        code: INVALID_PERSISTENCE_METADATA_CODE,
        message: `${label}: PageBoot ${boot} of kind ${kind} requires ${predicate}.`,
      }, guidance, {
        subject: boot,
        predicate,
        bootKind: kind,
      }), subjectRef(facts, boot, "kind", kind)));
    }
    if (expectedType) {
      const expectedConcept = expectedType === LANE_TYPE ? "Lane" : expectedType;
      const expectedHintSubject = expectedType === LANE_TYPE
        ? `Lane subject. The authored REL lane descriptor type is ${LANE_TYPE}`
        : `${expectedType} subject`;
      if (!knownSubjects.has(value)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.${predicate} references unknown subject "${value}".`,
        }, `${predicate} must point to an authored ${expectedHintSubject}. ${guidance}`, {
          subject: boot,
          predicate,
          bootKind: kind,
          targetSubject: value,
        }), subjectRef(facts, boot, predicate, value)));
      }
      if (!subjectHasType(value, expectedType)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.${predicate} must reference a ${expectedConcept}; found "${value}".`,
        }, `${predicate} must point to a ${expectedConcept} subject, not a different runtime record. ${guidance}`, {
          subject: boot,
          predicate,
          bootKind: kind,
          targetSubject: value,
          expectedType,
        }), subjectRef(facts, boot, predicate, value)));
      }
    }
    return value;
  };

  const laneBindingsForBoot = boot => {
    const cached = laneBindingsByBoot.get(boot);
    if (cached) return cached;
    const bindings = activeValues(boot, "laneBinding").map(binding => ({
      subject: binding,
      role: latestFactValue(binding, "role"),
      lane: latestFactValue(binding, "lane"),
    }));
    laneBindingsByBoot.set(boot, bindings);
    return bindings;
  };

  const requireBootLaneRole = (boot, role, kind, guidance) => {
    const bindings = laneBindingsForBoot(boot).filter(binding => binding.role === role);
    if (!bindings.length) {
      issues.push(declarationIssue(issueWithHint({
        code: INVALID_PERSISTENCE_METADATA_CODE,
        message: `${label}: PageBoot ${boot} of kind ${kind} requires a laneBinding with role "${role}".`,
      }, guidance, {
        subject: boot,
        predicate: "laneBinding",
        bootKind: kind,
        role,
      }), subjectRef(facts, boot, "kind", kind)));
      return null;
    }
    if (bindings.length > 1) {
      issues.push(declarationIssue(issueWithHint({
        code: INVALID_PERSISTENCE_METADATA_CODE,
        message: `${label}: PageBoot ${boot} of kind ${kind} has multiple laneBinding subjects for role "${role}".`,
      }, "Each required lane role must resolve to exactly one binding subject so hosts can choose one lane unambiguously.", {
        subject: boot,
        predicate: "laneBinding",
        bootKind: kind,
        role,
        bindingSubjects: bindings.map(binding => binding.subject),
      }), subjectRef(facts, boot, "laneBinding", bindings[1]?.subject || bindings[0]?.subject || "")));
      return null;
    }
    return bindings[0];
  };

  for (const page of pageSubjects) {
    const boot = optionalSingle(facts, page, "boot", `Page ${page}`, issues);
    if (!boot) continue;
    if (!knownSubjects.has(boot)) {
      issues.push(declarationIssue(issueWithHint({
        code: INVALID_PERSISTENCE_METADATA_CODE,
        message: `${label}: Page ${page}.boot references unknown subject "${boot}".`,
      }, "Page.boot must point to an authored PageBoot subject so the runtime can load lane and session metadata at compile time.", {
        subject: page,
        predicate: "boot",
        targetSubject: boot,
      }), subjectRef(facts, page, "boot", boot)));
    }
    if (!subjectHasType(boot, "PageBoot")) {
      issues.push(declarationIssue(issueWithHint({
        code: INVALID_PERSISTENCE_METADATA_CODE,
        message: `${label}: Page ${page}.boot must reference a PageBoot; found "${boot}".`,
      }, "Move boot metadata onto a PageBoot subject and point Page.boot at that subject.", {
        subject: page,
        predicate: "boot",
        targetSubject: boot,
      }), subjectRef(facts, page, "boot", boot)));
    }
  }

  for (const boot of pageBootSubjects) {
    const kind = requireSingle(facts, boot, "kind", `PageBoot ${boot}`, issues);
    if (!kind) continue;

    const laneGuidance = kind === "commandPage"
      ? "commandPage boots need optimistic, durable, and published lane bindings."
      : "sessionInspectorPage boots need durable and published lane bindings plus an initialLane.";
    for (const predicate of ["initialLane"]) {
      const lane = optionalSingle(facts, boot, predicate, `PageBoot ${boot}`, issues);
      if (!lane) continue;
      if (!knownSubjects.has(lane)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.${predicate} references unknown subject "${lane}".`,
        }, `${predicate} must point to an authored Lane subject. The authored REL lane descriptor type is ${LANE_TYPE}. ${laneGuidance}`, {
          subject: boot,
          predicate,
          bootKind: kind,
          targetSubject: lane,
        }), subjectRef(facts, boot, predicate, lane)));
      }
      if (!isActiveLaneSubject(lane)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.${predicate} must reference a Lane; found "${lane}".`,
        }, `${predicate} must point to a Lane subject so the runtime can materialize witness/projection views correctly. The authored REL lane descriptor type is ${LANE_TYPE}. ${laneGuidance}`, {
          subject: boot,
          predicate,
          bootKind: kind,
          targetSubject: lane,
          expectedType: LANE_TYPE,
        }), subjectRef(facts, boot, predicate, lane)));
      }
    }

    for (const binding of laneBindingsForBoot(boot)) {
      if (!knownSubjects.has(binding.subject)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.laneBinding references unknown subject "${binding.subject}".`,
        }, "Each laneBinding must point to an authored subject with role and lane facts.", {
          subject: boot,
          predicate: "laneBinding",
          bootKind: kind,
          targetSubject: binding.subject,
        }), subjectRef(facts, boot, "laneBinding", binding.subject)));
        continue;
      }
      if (!binding.role) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot} laneBinding ${binding.subject} is missing role.`,
        }, "Author exactly one role fact on each laneBinding subject so the host can resolve optimistic, durable, and published responsibilities.", {
          subject: binding.subject,
          predicate: "role",
          bootKind: kind,
        }), subjectRef(facts, boot, "laneBinding", binding.subject)));
      }
      if (!binding.lane) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot} laneBinding ${binding.subject} is missing lane.`,
        }, `Each laneBinding must point lane at an authored Lane subject. The authored REL lane descriptor type is ${LANE_TYPE}.`, {
          subject: binding.subject,
          predicate: "lane",
          bootKind: kind,
          role: binding.role,
        }), subjectRef(facts, boot, "laneBinding", binding.subject)));
        continue;
      }
      if (!knownSubjects.has(binding.lane)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot} lane binding role "${binding.role || ""}" references unknown lane "${binding.lane}".`,
        }, `laneBinding ${binding.subject} must point lane at an authored Lane subject. The authored REL lane descriptor type is ${LANE_TYPE}. ${laneGuidance}`, {
          subject: binding.subject,
          predicate: "lane",
          bootKind: kind,
          role: binding.role,
          targetSubject: binding.lane,
        }), subjectRef(facts, binding.subject, "lane", binding.lane)));
        continue;
      }
      if (!isActiveLaneSubject(binding.lane)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot} lane binding role "${binding.role || ""}" must reference a Lane; found "${binding.lane}".`,
        }, `laneBinding ${binding.subject} must point lane at a Lane subject so the runtime can materialize witness and projection state generically. The authored REL lane descriptor type is ${LANE_TYPE}. ${laneGuidance}`, {
          subject: binding.subject,
          predicate: "lane",
          bootKind: kind,
          role: binding.role,
          targetSubject: binding.lane,
          expectedType: LANE_TYPE,
        }), subjectRef(facts, binding.subject, "lane", binding.lane)));
      }
    }

    const inspectorPage = optionalSingle(facts, boot, "inspectorPage", `PageBoot ${boot}`, issues);
    if (inspectorPage) {
      if (!knownSubjects.has(inspectorPage)) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.inspectorPage references unknown subject "${inspectorPage}".`,
        }, "inspectorPage must point to an authored Page subject so command pages can generate operator session links.", {
          subject: boot,
          predicate: "inspectorPage",
          bootKind: kind,
          targetSubject: inspectorPage,
        }), subjectRef(facts, boot, "inspectorPage", inspectorPage)));
      }
      if (!subjectHasType(inspectorPage, "Page")) {
        issues.push(declarationIssue(issueWithHint({
          code: INVALID_PERSISTENCE_METADATA_CODE,
          message: `${label}: PageBoot ${boot}.inspectorPage must reference a Page; found "${inspectorPage}".`,
        }, "inspectorPage must point to a Page subject, not a route, context, or other record.", {
          subject: boot,
          predicate: "inspectorPage",
          bootKind: kind,
          targetSubject: inspectorPage,
        }), subjectRef(facts, boot, "inspectorPage", inspectorPage)));
      }
    }

    if (kind === "commandPage") {
      requireBootLaneRole(boot, "optimistic", kind, `Author one laneBinding with role "optimistic" pointing at the Lane used for optimistic command edits. The current authored REL lane type is ${LANE_TYPE}.`);
      requireBootLaneRole(boot, "durable", kind, `Author one laneBinding with role "durable" pointing at the Lane used as durable truth for save and refresh. The current authored REL lane type is ${LANE_TYPE}.`);
      requireBootLaneRole(boot, "published", kind, `Author one laneBinding with role "published" pointing at the Lane published to live session readers. The current authored REL lane type is ${LANE_TYPE}.`);
      requireBootField(boot, "queryParam", kind, "Author queryParam so the frontend can encode the live session id in inspector links.");
    }

    if (kind === "sessionInspectorPage") {
      requireBootLaneRole(boot, "durable", kind, `Author one laneBinding with role "durable" pointing at the durable Lane the inspector should read. The current authored REL lane type is ${LANE_TYPE}.`);
      requireBootLaneRole(boot, "published", kind, `Author one laneBinding with role "published" pointing at the published Lane the inspector should follow. The current authored REL lane type is ${LANE_TYPE}.`);
      requireBootField(boot, "queryParam", kind, "Author queryParam so the inspector can read the live session id from the URL.");
      requireBootField(boot, "laneStateKey", kind, "Author laneStateKey so the inspector can store which lane is currently selected.");
      requireBootField(boot, "initialLane", kind, `Point initialLane at the Lane the inspector should show first. The current authored REL lane type is ${LANE_TYPE}.`, LANE_TYPE);
    }
  }
  return uniqueAdmissibilityIssues(issues);
}

export function admitProjectDeclarations({ facts = [], label = "facts", profile = null } = {}) {
  const factList = asFactsArray(facts);
  const phase = (name, fn) => profile?.phase
    ? profile.phase(name, { facts: factList.length }, fn)
    : fn();
  const issues = uniqueAdmissibilityIssues([
    ...phase("admitProjectDeclarations.taxonomy", () => validateTaxonomyDeclarations(factList, label)),
    ...phase("admitProjectDeclarations.contexts", () => validateContextDeclarations(factList, label)),
    ...phase("admitProjectDeclarations.semanticAuthority", () => validateSemanticAuthorityDeclarations(factList, label)),
    ...phase("admitProjectDeclarations.resourcePermissions", () => validateResourcePermissionPolicyDeclarations(factList, label)),
    ...phase("admitProjectDeclarations.persistenceMetadata", () => validatePersistenceMetadataDeclarations(factList, label)),
  ]);
  if (issues.length) throw new AdmissibilityError(issues);
  return { ok: true, issues: Object.freeze([]) };
}
