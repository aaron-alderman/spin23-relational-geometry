import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_CATALOGUE = "corpus/programmes/mathematical-group-atlas/mathematical_group_catalogue_v1.json";
const DEFAULT_SCAN = "corpus/programmes/mathematical-group-atlas/mathematical_group_corpus_scan_v1.json";
const DEFAULT_MAP_REGISTER = "corpus/programmes/mathematical-group-atlas/mathematical_group_map_register_v1.json";
const DEFAULT_ADJUDICATIONS = "corpus/programmes/mathematical-group-atlas/mathematical_group_candidate_adjudications_v1.json";
const DEFAULT_EXTERNAL_OBJECTS = "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_register_v1.json";
const DEFAULT_EXTERNAL_SCAN = "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_corpus_scan_v1.json";
const DEFAULT_EXTERNAL_ADJUDICATIONS = "corpus/programmes/mathematical-group-atlas/mathematical_group_external_candidate_adjudications_v1.json";
const DEFAULT_MONSTER_BABY_TITS_OCCURRENCES = "corpus/programmes/mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json";
const DEFAULT_MONSTER_BABY_TITS_BRANCHING = "corpus/programmes/mathematical-group-atlas/monster_baby_tits_branching_register_v1.json";

export function loadMathematicalGroupCatalogue(root = process.cwd(), cataloguePath = DEFAULT_CATALOGUE) {
  return JSON.parse(fs.readFileSync(path.join(root, cataloguePath), "utf8"));
}

export function loadMathematicalGroupCorpusScan(root = process.cwd(), scanPath = DEFAULT_SCAN) {
  return JSON.parse(fs.readFileSync(path.join(root, scanPath), "utf8"));
}

export function loadMathematicalGroupMapRegister(root = process.cwd(), registerPath = DEFAULT_MAP_REGISTER) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function loadMathematicalGroupCandidateAdjudications(root = process.cwd(), registerPath = DEFAULT_ADJUDICATIONS) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function loadMathematicalGroupExternalObjects(root = process.cwd(), registerPath = DEFAULT_EXTERNAL_OBJECTS) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function loadMathematicalGroupExternalObjectScan(root = process.cwd(), scanPath = DEFAULT_EXTERNAL_SCAN) {
  return JSON.parse(fs.readFileSync(path.join(root, scanPath), "utf8"));
}

export function loadMathematicalGroupExternalCandidateAdjudications(root = process.cwd(), registerPath = DEFAULT_EXTERNAL_ADJUDICATIONS) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function loadMonsterBabyTitsOccurrences(root = process.cwd(), registerPath = DEFAULT_MONSTER_BABY_TITS_OCCURRENCES) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function loadMonsterBabyTitsBranching(root = process.cwd(), registerPath = DEFAULT_MONSTER_BABY_TITS_BRANCHING) {
  return JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
}

export function resolveGroup(catalogue, query) {
  if (!query) return [];
  const key = query.toLowerCase();
  return catalogue.groups.filter((group) =>
    [group.id, group.name, group.notation, ...(group.aliases ?? [])]
      .some((value) => value.toLowerCase() === key)
  );
}

function participantGroups(relation) {
  return [...new Set(relation.participants.map((participant) => participant.group))];
}

function paginate(values, limitValue = 25, offsetValue = 0) {
  const limit = Math.max(1, Math.min(Number(limitValue) || 25, 1000));
  const offset = Math.max(0, Number(offsetValue) || 0);
  return {
    page: values.slice(offset, offset + limit),
    pagination: {
      total: values.length,
      offset,
      limit,
      returned: Math.min(limit, Math.max(0, values.length - offset)),
      nextOffset: offset + limit < values.length ? offset + limit : null
    }
  };
}

function summarizeCluster(cluster) {
  return {
    id: cluster.id,
    groupIds: cluster.groupIds,
    predicates: cluster.predicates,
    polarity: cluster.polarity,
    evidenceCount: cluster.evidenceIds.length,
    pathCount: cluster.paths.length,
    confidenceCounts: cluster.confidenceCounts,
    status: cluster.status
  };
}

function hydrateMention(root, record) {
  const line = fs.readFileSync(path.join(root, record.path), "utf8").split(/\r?\n/)[record.line - 1] ?? "";
  const compact = line.trim().replace(/\s+/g, " ");
  return { ...record, excerpt: compact.length <= 600 ? compact : `${compact.slice(0, 597)}...` };
}

function directedEdges(relation) {
  const byRole = Object.groupBy(relation.participants, (participant) => participant.role);
  const one = (role) => byRole[role]?.[0]?.group;
  const edges = [];
  const add = (from, to, fromRole, toRole, composable = true) => {
    if (from && to && from !== to) edges.push({ from, to, fromRole, toRole, composable });
  };
  if (relation.kind === "isomorphism") {
    add(one("left"), one("right"), "left", "right");
    add(one("right"), one("left"), "right", "left");
  } else if (relation.kind === "subgroup") add(one("subgroup"), one("supergroup"), "subgroup", "supergroup");
  else if (relation.kind === "short_exact_sequence") {
    add(one("kernel"), one("middle"), "kernel", "middle");
    add(one("middle"), one("quotient"), "middle", "quotient");
  } else if (relation.kind === "direct_product") {
    for (const factor of byRole.factor ?? []) add(factor.group, one("result"), "factor", "result");
  } else if (relation.kind === "semidirect_product") {
    add(one("normal_factor"), one("result"), "normal_factor", "result");
    add(one("acting_factor"), one("result"), "acting_factor", "result");
  } else if (relation.kind === "cover") {
    add(one("kernel"), one("cover"), "kernel", "cover");
    add(one("cover"), one("base"), "cover", "base");
  } else if (relation.kind === "weyl_group") {
    add(one("lie_group"), one("weyl_group"), "lie_group", "weyl_group", false);
    add(one("maximal_torus"), one("weyl_group"), "maximal_torus", "weyl_group", false);
  } else if (relation.kind === "centralizer") add(one("centralizer"), one("ambient"), "centralizer", "ambient");
  else if (relation.kind === "automorphism_group") add(one("group"), one("automorphism_group"), "group", "automorphism_group", false);
  else if (relation.kind === "composition_factor") add(one("factor"), one("group"), "factor", "group", false);
  else if (relation.kind === "action") add(one("actor"), one("acted_on"), "actor", "acted_on", false);
  else if (relation.kind === "homomorphism") add(one("source"), one("target"), "source", "target");
  return edges;
}

function stats(catalogue) {
  const countBy = (values, selector) => Object.fromEntries(
    Object.entries(Object.groupBy(values, selector)).map(([key, entries]) => [key, entries.length])
  );
  return {
    schema: catalogue.schema,
    groups: catalogue.groups.length,
    finiteGroups: catalogue.groups.filter((group) => group.kind === "finite" || group.kind === "finite_coxeter").length,
    families: catalogue.families.length,
    cfsgBranches: catalogue.cfsg.branches.length,
    cfsgLieTypeFamilies: catalogue.cfsg.branches.find((branch) => branch.id === "cfsg:lie-type").families.length,
    cfsgSporadicMembers: catalogue.cfsg.branches.find((branch) => branch.id === "cfsg:sporadic").members.length,
    relationships: catalogue.relationships.length,
    relationshipKinds: countBy(catalogue.relationships, (relationship) => relationship.kind),
    statuses: countBy(catalogue.relationships, (relationship) => relationship.status)
  };
}

export function findPaths(catalogue, from, to, maxDepth = 5, mode = "morphism") {
  if (!new Set(["morphism", "incidence"]).has(mode)) throw new Error(`unknown path mode ${mode}`);
  const adjacency = new Map();
  for (const relation of catalogue.relationships.filter((entry) => ["established", "corpus_established"].includes(entry.status))) {
    for (const edge of directedEdges(relation)) {
      if (mode === "morphism" && !edge.composable) continue;
      const edges = adjacency.get(edge.from) ?? [];
      edges.push({ target: edge.to, relation: relation.id, kind: relation.kind, fromRole: edge.fromRole, toRole: edge.toRole, composable: edge.composable });
      adjacency.set(edge.from, edges);
    }
  }
  const queue = [{ node: from, nodes: [from], steps: [] }];
  const results = [];
  while (queue.length && results.length < 25) {
    const current = queue.shift();
    if (current.steps.length >= maxDepth) continue;
    for (const edge of adjacency.get(current.node) ?? []) {
      if (current.nodes.includes(edge.target)) continue;
      const next = {
        node: edge.target,
        nodes: [...current.nodes, edge.target],
        steps: [...current.steps, { relation: edge.relation, kind: edge.kind, from: current.node, to: edge.target, fromRole: edge.fromRole, toRole: edge.toRole, composable: edge.composable }]
      };
      if (edge.target === to) results.push(next);
      else queue.push(next);
    }
  }
  return {
    semantics: mode === "morphism"
      ? "only edges representing group homomorphisms or inclusions are traversed; each cross-record seam still requires the declared representatives and maps to align"
      : "role-directed incidence only; non-composable associations such as composition-factor and Weyl-group records may appear",
    mode,
    from,
    to,
    maxDepth,
    paths: results
  };
}

export function findMapPaths(register, from, to, maxDepth = 5) {
  const adjacency = new Map();
  const add = (source, target, map, direction) => {
    const edges = adjacency.get(source) ?? [];
    edges.push({ target, mapId: map.id, mapType: map.mapType, direction, relationId: map.relationId });
    adjacency.set(source, edges);
  };
  for (const map of register.maps.filter((entry) => ["established", "corpus_established"].includes(entry.status))) {
    add(map.domain, map.codomain, map, "forward");
    if (map.invertible) add(map.codomain, map.domain, map, "inverse");
  }
  const queue = [{ node: from, nodes: [from], steps: [] }];
  const paths = [];
  while (queue.length && paths.length < 25) {
    const current = queue.shift();
    if (current.steps.length >= maxDepth) continue;
    for (const edge of adjacency.get(current.node) ?? []) {
      if (current.nodes.includes(edge.target)) continue;
      const next = {
        node: edge.target,
        nodes: [...current.nodes, edge.target],
        steps: [...current.steps, {
          mapId: edge.mapId,
          mapType: edge.mapType,
          direction: edge.direction,
          relationId: edge.relationId,
          domain: current.node,
          codomain: edge.target
        }]
      };
      if (edge.target === to) paths.push(next);
      else queue.push(next);
    }
  }
  for (const pathResult of paths) {
    const signature = pathResult.steps.map((step) => `${step.mapId}:${step.direction}`);
    pathResult.declaredCompositionIds = register.compositions
      .filter((composition) => composition.steps.length === signature.length
        && composition.steps.every((step, index) => `${step.mapId}:${step.direction}` === signature[index]))
      .map((composition) => composition.id);
  }
  return {
    semantics: "stable named maps only; adjacent codomain and domain group identities are exact, while formulas and representative choices remain governed by each map witness",
    from,
    to,
    maxDepth,
    paths
  };
}

function usage() {
  return [
    "Usage:",
    "  node scripts/query-mathematical-group-catalogue.mjs stats",
    "  node scripts/query-mathematical-group-catalogue.mjs group <id|name|notation|alias>",
    "  node scripts/query-mathematical-group-catalogue.mjs neighbors <group-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs relation <relation-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs family <family-or-cfsg-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs path <from-group-id> <to-group-id> [max-depth] [morphism|incidence]",
    "  node scripts/query-mathematical-group-catalogue.mjs map-path <from-group-id> <to-group-id> [max-depth]",
    "  node scripts/query-mathematical-group-catalogue.mjs map <map-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs composition <composition-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs object <id|name|notation|alias>",
    "  node scripts/query-mathematical-group-catalogue.mjs external-neighbors <group-or-object-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs external-scan-stats",
    "  node scripts/query-mathematical-group-catalogue.mjs external-corpus <object-id> [limit] [offset]",
    "  node scripts/query-mathematical-group-catalogue.mjs external-cluster <cluster-id> [limit] [offset]",
    "  node scripts/query-mathematical-group-catalogue.mjs external-adjudications [disposition|all]",
    "  node scripts/query-mathematical-group-catalogue.mjs occurrence <occurrence-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs occurrence-group <group-id>",
    "  node scripts/query-mathematical-group-catalogue.mjs occurrence-gates",
    "  node scripts/query-mathematical-group-catalogue.mjs occurrence-certificate",
    "  node scripts/query-mathematical-group-catalogue.mjs branching-known",
    "  node scripts/query-mathematical-group-catalogue.mjs branching-open",
    "  node scripts/query-mathematical-group-catalogue.mjs open",
    "  node scripts/query-mathematical-group-catalogue.mjs scan-stats",
    "  node scripts/query-mathematical-group-catalogue.mjs corpus <group-id> [limit] [offset]",
    "  node scripts/query-mathematical-group-catalogue.mjs candidates <group-id> [high|medium|low|all] [limit] [offset]",
    "  node scripts/query-mathematical-group-catalogue.mjs unresolved [limit]",
    "  node scripts/query-mathematical-group-catalogue.mjs ambiguities [classification|all] [limit]",
    "  node scripts/query-mathematical-group-catalogue.mjs unclassified [limit]",
    "  node scripts/query-mathematical-group-catalogue.mjs document <corpus-relative-path>",
    "  node scripts/query-mathematical-group-catalogue.mjs cluster <cluster-id> [limit] [offset]",
    "  node scripts/query-mathematical-group-catalogue.mjs adjudications [disposition|all]"
  ].join("\n");
}

function runCli() {
  const catalogue = loadMathematicalGroupCatalogue();
  const [command = "help", ...args] = process.argv.slice(2);
  let output;
  if (command === "stats") output = stats(catalogue);
  else if (command === "group") {
    const matches = resolveGroup(catalogue, args.join(" "));
    output = { matches, relationships: matches.length === 1 ? catalogue.relationships.filter((relation) => participantGroups(relation).includes(matches[0].id)) : [] };
  } else if (command === "neighbors") {
    const id = args[0];
    output = {
      group: catalogue.groups.find((group) => group.id === id) ?? null,
      relationships: catalogue.relationships.filter((relation) => participantGroups(relation).includes(id))
    };
  } else if (command === "relation") output = catalogue.relationships.find((relation) => relation.id === args[0]) ?? { error: `unknown relation ${args[0]}` };
  else if (command === "family") {
    const id = args[0];
    const branch = catalogue.cfsg.branches.find((candidate) => candidate.id === id) ?? null;
    output = {
      family: catalogue.families.find((family) => family.id === id) ?? branch,
      groups: catalogue.groups.filter((group) => group.familyIds.includes(id) || (group.cfsgBranchIds ?? []).includes(id))
    };
  } else if (command === "path") output = findPaths(catalogue, args[0], args[1], Number(args[2] ?? 5), args[3] ?? "morphism");
  else if (["map-path", "map", "composition"].includes(command)) {
    const register = loadMathematicalGroupMapRegister();
    if (command === "map-path") output = findMapPaths(register, args[0], args[1], Number(args[2] ?? 5));
    else if (command === "map") output = register.maps.find((map) => map.id === args[0]) ?? { error: `unknown map ${args[0]}` };
    else output = register.compositions.find((composition) => composition.id === args[0]) ?? { error: `unknown composition ${args[0]}` };
  }
  else if (["object", "external-neighbors"].includes(command)) {
    const register = loadMathematicalGroupExternalObjects();
    if (command === "object") {
      const key = args.join(" ").toLowerCase();
      const objects = register.objects.filter((object) =>
        [object.id, object.name, object.notation, ...(object.aliases ?? [])].some((value) => value.toLowerCase() === key)
      );
      output = {
        objects,
        relationships: objects.length === 1
          ? register.relations.filter((relation) => relation.participants.some((participant) => participant.ref === objects[0].id))
          : []
      };
    } else {
      const ref = args[0];
      output = {
        ref,
        group: catalogue.groups.find((group) => group.id === ref) ?? null,
        object: register.objects.find((object) => object.id === ref) ?? null,
        relationships: register.relations.filter((relation) => relation.participants.some((participant) => participant.ref === ref))
      };
    }
  }
  else if (["external-scan-stats", "external-corpus", "external-cluster"].includes(command)) {
    const scan = loadMathematicalGroupExternalObjectScan();
    const register = loadMathematicalGroupExternalObjects();
    if (command === "external-scan-stats") output = { authority: scan.authority, coverage: scan.coverage, statistics: scan.statistics };
    else if (command === "external-corpus") {
      const id = args[0];
      const mentions = scan.exactObjectMentionEvidence.find((record) => record.objectId === id)?.evidence ?? [];
      const clusters = scan.relationshipClusters.filter((cluster) => cluster.objectIds.includes(id));
      const mentionPage = paginate(mentions, args[1], args[2]);
      const clusterPage = paginate(clusters, args[1], args[2]);
      output = {
        authority: scan.authority,
        object: register.objects.find((object) => object.id === id) ?? null,
        summary: scan.objectMentions.find((record) => record.objectId === id) ?? null,
        exactMentionEvidence: mentionPage.page,
        mentionPagination: mentionPage.pagination,
        candidateClusters: clusterPage.page.map((cluster) => ({
          id: cluster.id,
          objectIds: cluster.objectIds,
          groupIds: cluster.groupIds,
          predicates: cluster.predicates,
          polarity: cluster.polarity,
          evidenceCount: cluster.evidenceIds.length,
          pathCount: cluster.paths.length,
          confidenceCounts: cluster.confidenceCounts,
          status: cluster.status
        })),
        clusterPagination: clusterPage.pagination
      };
    } else {
      const cluster = scan.relationshipClusters.find((record) => record.id === args[0]);
      if (!cluster) output = { error: `unknown external cluster ${args[0]}` };
      else {
        const evidence = scan.relationshipCandidates.filter((candidate) => cluster.evidenceIds.includes(candidate.id));
        const evidencePage = paginate(evidence, args[1], args[2]);
        output = { cluster, evidence: evidencePage.page, pagination: evidencePage.pagination };
      }
    }
  }
  else if (command === "open") output = catalogue.relationships.filter((relation) => relation.status === "open");
  else if (command === "adjudications") {
    const register = loadMathematicalGroupCandidateAdjudications();
    const disposition = args[0] ?? "all";
    output = {
      authority: register.authority,
      disposition,
      adjudications: register.adjudications.filter((record) => disposition === "all" || record.disposition === disposition)
    };
  }
  else if (command === "external-adjudications") {
    const register = loadMathematicalGroupExternalCandidateAdjudications();
    const disposition = args[0] ?? "all";
    output = {
      authority: register.authority,
      disposition,
      adjudications: register.adjudications.filter((record) => disposition === "all" || record.disposition === disposition)
    };
  }
  else if (["occurrence", "occurrence-group", "occurrence-gates", "occurrence-certificate"].includes(command)) {
    const register = loadMonsterBabyTitsOccurrences();
    if (command === "occurrence") {
      const occurrence = register.occurrences.find((record) => record.id === args[0]) ?? null;
      output = occurrence
        ? {
            authority: register.authority,
            occurrence,
            children: register.occurrences.filter((record) => record.ambientOccurrenceId === occurrence.id),
            referencedBy: register.occurrences.filter((record) => record.sameOccurrenceAs === occurrence.id || record.notYetIdentifiedWith === occurrence.id || (record.distinctFrom ?? []).includes(occurrence.id))
          }
        : { error: `unknown occurrence ${args[0]}` };
    } else if (command === "occurrence-group") {
      output = {
        authority: register.authority,
        groupId: args[0],
        abstractGroup: catalogue.groups.find((group) => group.id === args[0]) ?? null,
        occurrences: register.occurrences.filter((record) => record.groupId === args[0])
      };
    } else if (command === "occurrence-gates") output = { authority: register.authority, openGates: register.openGates };
    else output = { authority: register.authority, pullbackCertificate: register.pullbackCertificate };
  }
  else if (["branching-known", "branching-open"].includes(command)) {
    const register = loadMonsterBabyTitsBranching();
    output = command === "branching-known"
      ? { authority: register.authority, knownDecompositions: register.knownDecompositions }
      : { authority: register.authority, deterministicExecutionContract: register.deterministicExecutionContract, openComputations: register.openComputations };
  }
  else if (["scan-stats", "corpus", "candidates", "unresolved", "ambiguities", "unclassified", "document", "cluster"].includes(command)) {
    const scan = loadMathematicalGroupCorpusScan();
    if (command === "scan-stats") output = { authority: scan.authority, coverage: scan.coverage, statistics: scan.statistics };
    else if (command === "corpus") {
      const id = args[0];
      const mentions = scan.exactMentionEvidence.find((record) => record.groupId === id)?.evidence ?? [];
      const clusters = scan.relationshipClusters.filter((cluster) => cluster.groupIds.includes(id));
      const mentionPage = paginate(mentions, args[1], args[2]);
      const clusterPage = paginate(clusters, args[1], args[2]);
      output = {
        authority: scan.authority,
        group: catalogue.groups.find((group) => group.id === id) ?? null,
        summary: scan.groupMentions.find((record) => record.groupId === id) ?? null,
        exactMentionEvidence: mentionPage.page.map((record) => hydrateMention(process.cwd(), record)),
        mentionPagination: mentionPage.pagination,
        candidateClusters: clusterPage.page.map(summarizeCluster),
        clusterPagination: clusterPage.pagination
      };
    } else if (command === "candidates") {
      const [id, confidence] = args;
      const matches = scan.relationshipCandidates.filter((candidate) =>
        candidate.resolvedGroups.some((record) => record.groupId === id)
        && (!confidence || confidence === "all" || candidate.confidence === confidence)
      );
      const resultPage = paginate(matches, args[2], args[3]);
      output = {
        authority: scan.authority,
        candidates: resultPage.page,
        pagination: resultPage.pagination
      };
    } else if (command === "unresolved") output = {
      authority: scan.authority,
      tokens: scan.unresolvedGroupTokens.slice(0, Number(args[0] ?? 50))
    };
    else if (command === "ambiguities") {
      const classification = args[0] ?? "all";
      const limit = Number(args[1] ?? 50);
      output = {
        authority: "scanner_disambiguation_policy_not_a_mathematical_identification",
        classification,
        tokens: scan.classifiedUnresolvedTokens.filter((record) => classification === "all" || record.classification === classification).slice(0, limit)
      };
    }
    else if (command === "unclassified") output = {
      authority: scan.authority,
      tokens: scan.unclassifiedGroupTokens.slice(0, Number(args[0] ?? 50))
    };
    else if (command === "document") output = scan.documentDependencies.find((record) => record.path === args.join(" ")) ?? { error: `unknown document ${args.join(" ")}` };
    else if (command === "cluster") {
      const cluster = scan.relationshipClusters.find((record) => record.id === args[0]);
      if (!cluster) output = { error: `unknown cluster ${args[0]}` };
      else {
        const evidence = scan.relationshipCandidates.filter((candidate) => cluster.evidenceIds.includes(candidate.id));
        const evidencePage = paginate(evidence, args[1], args[2]);
        output = {
          cluster: summarizeCluster(cluster),
          paths: cluster.paths,
          evidence: evidencePage.page,
          pagination: evidencePage.pagination
        };
      }
    }
  }
  else {
    console.log(usage());
    return;
  }
  console.log(JSON.stringify(output, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) runCli();
