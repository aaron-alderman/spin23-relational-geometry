import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_ATLAS = "corpus/programmes/dynatology/brain_relationship_atlas_v1.json";

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function unique(values) {
  return [...new Set(values)];
}

function addNode(nodes, node) {
  const previous = nodes.get(node.id);
  if (previous && previous.type !== node.type) {
    throw new Error(`node ${node.id} imported with incompatible types ${previous.type} and ${node.type}`);
  }
  nodes.set(node.id, previous ? { ...previous, ...node } : node);
}

export function loadBrainRelationshipAtlas(root = process.cwd(), atlasPath = DEFAULT_ATLAS) {
  const atlas = readJson(root, atlasPath);
  const functionAtlas = readJson(root, atlas.imports.brainFunctionAtlas);
  const middleRegister = readJson(root, atlas.imports.missingMiddleRegister);
  const generatorKinds = new Set(atlas.relationGenerators.map((generator) => generator.kind));
  for (const requiredKind of ["feature_compilation", "candidate_implementation", "measurement_grounding", "missing_middle", "cross_cutting_middle"]) {
    if (!generatorKinds.has(requiredKind)) throw new Error(`missing required relation generator ${requiredKind}`);
  }
  const nodes = new Map();

  for (const operator of functionAtlas.primitiveOperators) {
    addNode(nodes, {
      id: `op:${operator.id}`,
      type: "operation",
      label: operator.label,
      importedFrom: atlas.imports.brainFunctionAtlas,
      evidence: operator.evidence,
      outputType: operator.outputType
    });
    for (const system of operator.candidateSystems) {
      addNode(nodes, { id: `system:${system}`, type: "system", label: system, importedFrom: atlas.imports.brainFunctionAtlas });
    }
    for (const measure of operator.groundMeasures) {
      addNode(nodes, { id: `measure:${measure}`, type: "measure", label: measure, importedFrom: atlas.imports.brainFunctionAtlas });
    }
  }
  for (const feature of functionAtlas.composites) {
    addNode(nodes, { id: `feature:${feature.label}`, type: "feature", label: feature.label, importedFrom: atlas.imports.brainFunctionAtlas });
  }
  for (const middle of [...middleRegister.middles, ...middleRegister.crossCuttingMiddles]) {
    addNode(nodes, { id: `middle:${middle.id}`, type: "middle", label: middle.label, importedFrom: atlas.imports.missingMiddleRegister });
  }
  for (const node of atlas.localNodes) addNode(nodes, { ...node, importedFrom: atlasPath });

  const relations = [...atlas.relations.map((relation) => ({ ...relation, generated: false }))];

  for (const feature of functionAtlas.composites) {
    relations.push({
      id: `compile/${feature.label}`,
      sources: unique([`op:${feature.primary}`, ...feature.dependsOn.map((id) => `op:${id}`)]),
      targets: [`feature:${feature.label}`],
      family: "compilation",
      polarity: "candidate",
      predicate: "jointly_compiles_as",
      conditions: ["selected_grain", ...(feature.overlays ? Object.entries(feature.overlays).map(([key, value]) => `${key}=${value}`) : [])],
      carrier: "typed_operator_composition",
      law: "primary_operator_with_declared_dependencies_and_overlays",
      evidence: "atlas_decomposition",
      alternatives: [],
      falsifier: "feature_requires_an_unlisted_primitive_or_cannot_be_discriminated_from_another_composition",
      provenance: ["source:atlas_v2"],
      generated: true
    });
  }

  for (const operator of functionAtlas.primitiveOperators) {
    for (const system of unique(operator.candidateSystems)) {
      relations.push({
        id: `implement/${operator.id}/${encodeURIComponent(system)}`,
        sources: [`system:${system}`],
        targets: [`op:${operator.id}`],
        family: "implementation",
        polarity: "candidate",
        predicate: "may_partly_implement",
        conditions: ["many_to_many_nonexclusive_mapping", "other_joint_inputs_may_be_required"],
        carrier: system,
        law: "not_yet_uniquely_identified",
        evidence: operator.evidence,
        alternatives: operator.candidateSystems.filter((candidate) => candidate !== system),
        falsifier: "candidate_system_does_not_track_or_constrain_the_operator_under_discriminating_existing_evidence",
        provenance: ["source:atlas_v2"],
        generated: true
      });
    }
    for (const measure of unique(operator.groundMeasures)) {
      relations.push({
        id: `ground/${operator.id}/${encodeURIComponent(measure)}`,
        sources: [`op:${operator.id}`],
        targets: [`measure:${measure}`],
        family: "grounding",
        polarity: "candidate",
        predicate: "is_partly_measured_by",
        conditions: ["measurement_does_not_by_itself_establish_implementation_or_cause"],
        carrier: "measurement_protocol",
        law: "operator_specific_observable_projection",
        evidence: operator.evidence,
        alternatives: operator.groundMeasures.filter((candidate) => candidate !== measure),
        falsifier: "measure_is_invariant_to_every_discriminating_operator_contrast",
        provenance: ["source:atlas_v2"],
        generated: true
      });
    }
  }

  for (const middle of middleRegister.middles) {
    relations.push({
      id: `middle/${middle.id}`,
      sources: middle.sourceOps.map((id) => `op:${id}`),
      targets: middle.targetOps.map((id) => `op:${id}`),
      family: "transformational",
      polarity: "candidate",
      predicate: "transforms_into_inputs_for",
      conditions: ["candidate_join", `grade=${middle.grade}`],
      carrier: middle.candidateCarrier,
      law: middle.candidateLaw,
      evidence: middle.observableTrace,
      alternatives: [middle.competingBridge],
      falsifier: middle.failureCondition,
      provenance: ["source:missing_middles"],
      middleRef: `middle:${middle.id}`,
      generated: true
    });
  }

  for (const middle of middleRegister.crossCuttingMiddles) {
    const targets = middle.targetOps.length
      ? middle.targetOps.map((id) => `op:${id}`)
      : (atlas.crossCuttingTargetOverrides[middle.id] ?? []);
    relations.push({
      id: `middle/${middle.id}`,
      sources: middle.sourceOps.map((id) => `op:${id}`),
      targets,
      family: "unknown",
      polarity: "unknown",
      predicate: "unresolved_join_to",
      conditions: ["cross_cutting_missing_middle"],
      carrier: "unknown",
      law: "unknown",
      evidence: middle.question,
      alternatives: [],
      falsifier: "a_discriminating_join_law_closes_the_question",
      provenance: ["source:missing_middles"],
      middleRef: `middle:${middle.id}`,
      generated: true
    });
  }

  const normalizedRelations = relations.map((relation) => ({
    ...atlas.relationDefaults,
    ...relation,
    alternatives: relation.alternatives ?? atlas.relationDefaults.alternatives
  }));
  return { atlas, functionAtlas, middleRegister, nodes: [...nodes.values()], relations: normalizedRelations };
}

export function composeRelations(left, right, allRelations = []) {
  const sharedPorts = left.targets.filter((target) => right.sources.includes(target));
  const blockers = allRelations.filter((relation) =>
    relation.family === "negative" &&
    relation.blocksComposition === true &&
    relation.sources.some((source) => left.sources.includes(source)) &&
    relation.targets.some((target) => right.targets.includes(target))
  ).map((relation) => relation.id);
  return {
    admissible: sharedPorts.length > 0 && blockers.length === 0,
    sharedPorts,
    blockers,
    composite: sharedPorts.length === 0 ? null : {
      sources: left.sources,
      targets: right.targets,
      family: "composed",
      polarity: blockers.length ? "blocked" : "candidate",
      conditions: unique([...(left.conditions ?? []), ...(right.conditions ?? [])]),
      trace: [left.id, right.id]
    }
  };
}

function summarize(loaded) {
  const byType = Object.groupBy(loaded.nodes, (node) => node.type);
  const byFamily = Object.groupBy(loaded.relations, (relation) => relation.family);
  const byPolarity = Object.groupBy(loaded.relations, (relation) => relation.polarity);
  return {
    schema: loaded.atlas.schema,
    nodes: loaded.nodes.length,
    nodeTypes: Object.fromEntries(Object.entries(byType).map(([key, values]) => [key, values.length])),
    relations: loaded.relations.length,
    relationFamilies: Object.fromEntries(Object.entries(byFamily).map(([key, values]) => [key, values.length])),
    polarities: Object.fromEntries(Object.entries(byPolarity).map(([key, values]) => [key, values.length])),
    declaredPaths: loaded.atlas.declaredPaths.length,
    negativeConstraints: loaded.relations.filter((relation) => relation.family === "negative").length,
    explicitUnknowns: loaded.relations.filter((relation) => relation.family === "unknown").length
  };
}

export function projectedPaths(loaded, from, to, maxDepth = 6) {
  const outgoing = new Map();
  for (const relation of loaded.relations.filter((entry) => entry.family !== "negative")) {
    for (const source of relation.sources) {
      const entries = outgoing.get(source) ?? [];
      for (const target of relation.targets) entries.push({ target, relation: relation.id, hyperedgeSources: relation.sources });
      outgoing.set(source, entries);
    }
  }
  const queue = [{ node: from, nodes: [from], relations: [], steps: [] }];
  const results = [];
  while (queue.length && results.length < 25) {
    const current = queue.shift();
    if (current.relations.length >= maxDepth) continue;
    for (const edge of outgoing.get(current.node) ?? []) {
      if (current.nodes.includes(edge.target)) continue;
      const next = {
        node: edge.target,
        nodes: [...current.nodes, edge.target],
        relations: [...current.relations, edge.relation],
        steps: [...current.steps, {
          relation: edge.relation,
          from: current.node,
          to: edge.target,
          unmetHyperedgeInputs: edge.hyperedgeSources.filter((source) => !current.nodes.includes(source))
        }]
      };
      if (edge.target === to) results.push(next);
      else queue.push(next);
    }
  }
  return {
    warning: "exploratory_projection_only; each hyperedge remains conditional on all listed sources",
    from,
    to,
    maxDepth,
    paths: results
  };
}

function usage() {
  return [
    "Usage:",
    "  node scripts/query-brain-relationship-atlas.mjs stats",
    "  node scripts/query-brain-relationship-atlas.mjs node <node-id>",
    "  node scripts/query-brain-relationship-atlas.mjs neighbors <node-id>",
    "  node scripts/query-brain-relationship-atlas.mjs gaps",
    "  node scripts/query-brain-relationship-atlas.mjs negatives",
    "  node scripts/query-brain-relationship-atlas.mjs paths <from-node> <to-node> [max-depth]",
    "  node scripts/query-brain-relationship-atlas.mjs compose <left-relation-id> <right-relation-id>"
  ].join("\n");
}

function runCli() {
  const loaded = loadBrainRelationshipAtlas();
  const [command = "help", ...args] = process.argv.slice(2);
  let output;
  if (command === "stats") output = summarize(loaded);
  else if (command === "node") output = loaded.nodes.find((node) => node.id === args[0]) ?? { error: `unknown node ${args[0]}` };
  else if (command === "neighbors") {
    const id = args[0];
    output = {
      node: loaded.nodes.find((node) => node.id === id) ?? null,
      incoming: loaded.relations.filter((relation) => relation.targets.includes(id)),
      outgoing: loaded.relations.filter((relation) => relation.sources.includes(id))
    };
  } else if (command === "gaps") output = loaded.relations.filter((relation) => relation.family === "unknown" || relation.middleRef);
  else if (command === "negatives") output = loaded.relations.filter((relation) => relation.family === "negative");
  else if (command === "paths") output = projectedPaths(loaded, args[0], args[1], Number(args[2] ?? 6));
  else if (command === "compose") {
    const left = loaded.relations.find((relation) => relation.id === args[0]);
    const right = loaded.relations.find((relation) => relation.id === args[1]);
    output = left && right ? composeRelations(left, right, loaded.relations) : { error: "unknown relation id", left: args[0], right: args[1] };
  } else {
    console.log(usage());
    return;
  }
  console.log(JSON.stringify(output, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) runCli();
