#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_RETRIEVAL_WEIGHTS, searchCorpus } from "./search_corpus.mjs";
import { buildCorpusContext } from "./context_hub.mjs";
import { buildContextSweep } from "./context_sweep.mjs";
import { compareAnswerReceipts, createAnswerReceipt } from "./answer_stability.mjs";
import { initializeBeliefState, sha256, updateBeliefState } from "./belief_state.mjs";
import { buildAdaptiveCorpusContext } from "./adaptive_context.mjs";
import { getContributionBeacon } from "./contribution_beacon.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(moduleDirectory, "../..");
const profiles = ["all", "interpret", "choose-work", "audit", "experiment"];
const readableRoots = ["corpus", "book/edition-3/chapters", "verification"];

const objectSchema = (properties, required = []) => ({
  type: "object",
  properties,
  required,
  additionalProperties: false,
});

export const corpusSearchMcpTools = Object.freeze([
  {
    name: "corpus_contribution_beacon",
    description: "Discover the live Context Hub contribution surface without starting a belief episode. Returns open work invitations, acceptable evidence packets, local Observatory entry points and strict authority limits. Contributing is optional and never promotes truth, mutates the corpus or trains model weights.",
    inputSchema: objectSchema({}),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_search",
    description: "Search the canonical research corpus. Combines document BM25, exact claim-passage matching, confidence-gated corpus-local distributional expansion, exact cross-reference passage bridges and personalized PageRank. Returns drill-down identities, declared epistemic status and selector sensitivity. Ranking is a navigation aid, not evidence or truth.",
    inputSchema: objectSchema({
      query: { type: "string", minLength: 2, maxLength: 500, description: "Natural-language question or compact concept query." },
      limit: { type: "integer", minimum: 1, maximum: 25, default: 8 },
      profile: { type: "string", enum: profiles, default: "all", description: "Optional front-door prior matching the LLM's present task." },
      graphWeight: { type: "number", minimum: 0, maximum: 0.6, default: DEFAULT_RETRIEVAL_WEIGHTS.graphWeight, description: "Declared contribution of graph context to final navigation order." },
      claimWeight: { type: "number", minimum: 0, maximum: 0.35, default: DEFAULT_RETRIEVAL_WEIGHTS.claimWeight, description: "Declared contribution of the best exact claim passage." },
      semanticWeight: { type: "number", minimum: 0, maximum: 0.2, default: DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight, description: "Declared contribution of confidence-gated corpus-local co-occurrence and exact cross-reference passage bridges; no opaque embedding model." },
    }, ["query"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_context",
    description: "Build a task-tailored, character-budgeted context packet from diverse corpus sources. Includes query-centered excerpts, source boundaries, declared statuses, inclusion reasons, selector-sensitivity warnings and explicit omissions. Use this to prepare an LLM working context; it does not establish truth.",
    inputSchema: objectSchema({
      task: { type: "string", minLength: 2, maxLength: 500, description: "The concrete question or work the receiving LLM must perform." },
      profile: { type: "string", enum: profiles, default: "all" },
      maxSources: { type: "integer", minimum: 2, maximum: 10, default: 6 },
      maxCharacters: { type: "integer", minimum: 4000, maximum: 30000, default: 12000 },
      graphWeight: { type: "number", minimum: 0, maximum: 0.6, default: DEFAULT_RETRIEVAL_WEIGHTS.graphWeight },
      claimWeight: { type: "number", minimum: 0, maximum: 0.35, default: DEFAULT_RETRIEVAL_WEIGHTS.claimWeight },
      semanticWeight: { type: "number", minimum: 0, maximum: 0.2, default: DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight },
    }, ["task"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_context_sweep",
    description: "Run a bounded one-factor-at-a-time sweep over context profile and graph influence. Reports invariant, robust and selector-sensitive source sets with pairwise overlap and reproducible receipts. This measures context stability; the host must run the same model prompt on each included packet to test answer stability.",
    inputSchema: objectSchema({
      task: { type: "string", minLength: 2, maxLength: 500 },
      baselineProfile: { type: "string", enum: profiles, default: "all" },
      profiles: { type: "array", maxItems: 5, items: { type: "string", enum: profiles }, default: ["interpret", "experiment", "audit"] },
      baselineGraphWeight: { type: "number", minimum: 0, maximum: 0.6, default: DEFAULT_RETRIEVAL_WEIGHTS.graphWeight },
      graphWeights: { type: "array", minItems: 1, maxItems: 5, items: { type: "number", minimum: 0, maximum: 0.6 }, default: [0.1, 0.2, 0.35] },
      maxSources: { type: "integer", minimum: 2, maximum: 10, default: 6 },
      maxCharacters: { type: "integer", minimum: 4000, maximum: 16000, default: 8000 },
      includeContexts: { type: "boolean", default: false },
    }, ["task"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_answer_receipt",
    description: "Bind one LLM answer and its atomic claims to an exact context receipt, model configuration and cited source identities. Reports citations outside the supplied context. This is provenance, not scientific certification.",
    inputSchema: objectSchema({
      contextReceipt: { type: "object" },
      contextSources: { type: "array", minItems: 1, maxItems: 20, items: { type: "object" } },
      model: { type: "object" },
      prompt: { type: "string", minLength: 1, maxLength: 100000 },
      answer: { type: "string", minLength: 1, maxLength: 200000 },
      claims: { type: "array", minItems: 1, maxItems: 100, items: { type: "object" } },
    }, ["contextReceipt", "contextSources", "model", "prompt", "answer", "claims"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_answer_stability",
    description: "Compare two to eight answer receipts produced under distinct context packets. Classifies stable exact claims, stable verdicts with wording drift, context-conditional claims, verdict conflicts and unsupported citations. Exact-key comparison does not prove semantic equivalence.",
    inputSchema: objectSchema({ receipts: { type: "array", minItems: 2, maxItems: 8, items: { type: "object" } } }, ["receipts"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_belief_initialize",
    description: "Initialize a caller-owned, corpus-bound belief state for one externally supplied objective. The state estimates source utility for context selection; it does not estimate truth, change claim status, mutate the corpus or train model weights.",
    inputSchema: objectSchema({
      objective: { type: "string", minLength: 2, maxLength: 500 },
      profile: { type: "string", enum: profiles, default: "all" },
      processVariance: { type: "number", minimum: 0.0001, maximum: 0.1, default: 0.01 },
    }, ["objective"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_belief_update",
    description: "Apply one to 200 causally typed observations to a hash-verified caller-owned attention-utility state. Observations from one evidence family can influence a source only once and correlated views collapse to one effective update. Returns a candidate successor and innovation receipt without persistence, admission or corpus mutation.",
    inputSchema: objectSchema({
      beliefState: { type: "object" },
      observations: { type: "array", minItems: 1, maxItems: 200, items: { type: "object" } },
    }, ["beliefState", "observations"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_adaptive_context",
    description: "Build a context packet using bounded learned source utility and uncertainty while returning the unadapted baseline, rank movements and authority limits. Adaptive influence is capped at 0.2 and cannot change truth or corpus status.",
    inputSchema: objectSchema({
      task: { type: "string", minLength: 2, maxLength: 500 },
      beliefState: { type: "object" },
      profile: { type: "string", enum: profiles },
      maxSources: { type: "integer", minimum: 2, maximum: 10, default: 6 },
      maxCharacters: { type: "integer", minimum: 4000, maximum: 30000, default: 12000 },
      graphWeight: { type: "number", minimum: 0, maximum: 0.6, default: DEFAULT_RETRIEVAL_WEIGHTS.graphWeight },
      claimWeight: { type: "number", minimum: 0, maximum: 0.35, default: DEFAULT_RETRIEVAL_WEIGHTS.claimWeight },
      semanticWeight: { type: "number", minimum: 0, maximum: 0.2, default: DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight },
      adaptiveWeight: { type: "number", minimum: 0, maximum: 0.2, default: 0.15 },
      explorationWeight: { type: "number", minimum: 0, maximum: 0.05, default: 0.03 },
    }, ["task", "beliefState"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "corpus_read",
    description: "Read a bounded UTF-8 slice of one Markdown document returned by corpus_search. Read-only and restricted to the indexed corpus roots.",
    inputSchema: objectSchema({
      path: { type: "string", minLength: 1, maxLength: 500, description: "Repository-relative path returned by corpus_search." },
      offset: { type: "integer", minimum: 0, default: 0, description: "Character offset in the UTF-8 text." },
      maxCharacters: { type: "integer", minimum: 256, maximum: 30000, default: 12000 },
    }, ["path"]),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
]);

function validateSearchArguments(args) {
  if (!args || Array.isArray(args) || typeof args.query !== "string" || args.query.trim().length < 2 || args.query.length > 500) {
    throw new Error("query must contain 2 to 500 characters");
  }
  const allowed = new Set(["query", "limit", "profile", "graphWeight", "claimWeight", "semanticWeight"]);
  if (Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_search received an unknown argument");
  const limit = args.limit ?? 8;
  const profile = args.profile ?? "all";
  const graphWeight = args.graphWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.graphWeight;
  const claimWeight = args.claimWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.claimWeight;
  const semanticWeight = args.semanticWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight;
  if (!Number.isInteger(limit) || limit < 1 || limit > 25) throw new Error("limit must be an integer from 1 to 25");
  if (!profiles.includes(profile)) throw new Error(`profile must be one of: ${profiles.join(", ")}`);
  if (typeof graphWeight !== "number" || !Number.isFinite(graphWeight) || graphWeight < 0 || graphWeight > 0.6) {
    throw new Error("graphWeight must be a finite number from 0 to 0.6");
  }
  if (typeof claimWeight !== "number" || !Number.isFinite(claimWeight) || claimWeight < 0 || claimWeight > 0.35) throw new Error("claimWeight must be a finite number from 0 to 0.35");
  if (typeof semanticWeight !== "number" || !Number.isFinite(semanticWeight) || semanticWeight < 0 || semanticWeight > 0.2) throw new Error("semanticWeight must be a finite number from 0 to 0.2");
  if (graphWeight + claimWeight + semanticWeight >= 1) throw new Error("graphWeight + claimWeight + semanticWeight must be less than 1");
  return { query: args.query.trim(), limit, profile, graphWeight, claimWeight, semanticWeight };
}

function validateReadArguments(root, args) {
  if (!args || Array.isArray(args) || typeof args.path !== "string" || !args.path || args.path.length > 500 || isAbsolute(args.path)) {
    throw new Error("path must be a repository-relative Markdown path");
  }
  const allowed = new Set(["path", "offset", "maxCharacters"]);
  if (Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_read received an unknown argument");
  const portable = args.path.replaceAll("\\", "/");
  if (!portable.toLowerCase().endsWith(".md") || !readableRoots.some(prefix => portable === prefix || portable.startsWith(`${prefix}/`))) {
    throw new Error("path is outside the indexed Markdown corpus");
  }
  const absolute = resolve(root, ...portable.split("/"));
  const relativePath = relative(root, absolute);
  if (!relativePath || relativePath.startsWith("..") || isAbsolute(relativePath) || !absolute.startsWith(`${resolve(root)}${sep}`)) {
    throw new Error("path escapes the corpus root");
  }
  if (!existsSync(absolute) || !statSync(absolute).isFile()) throw new Error("corpus document does not exist");
  const offset = args.offset ?? 0;
  const maxCharacters = args.maxCharacters ?? 12000;
  if (!Number.isInteger(offset) || offset < 0) throw new Error("offset must be a non-negative integer");
  if (!Number.isInteger(maxCharacters) || maxCharacters < 256 || maxCharacters > 30000) {
    throw new Error("maxCharacters must be an integer from 256 to 30000");
  }
  return { absolute, path: portable, offset, maxCharacters };
}

function searchText(result) {
  const correction = result.corrections.length
    ? ` Corrected ${result.corrections.map(item => `${item.from} to ${item.to}`).join(", ")}.`
    : "";
  const rows = result.results.map(item => `${item.rank}. ${item.title}\n${item.path}\nstatus: ${item.status}\nclaim focus: ${item.claimMatch?.role ?? "none"} lines ${item.claimMatch?.lineStart ?? "?"}-${item.claimMatch?.lineEnd ?? "?"} ${item.claimMatch?.claimSha256 ?? ""}${item.semanticBridge ? `\ncross-reference bridge: ${item.semanticBridge.sourcePath} lines ${item.semanticBridge.lineStart}-${item.semanticBridge.lineEnd} ${item.semanticBridge.bridgeSha256}` : ""}\n${item.claimMatch?.text ?? item.snippet}`);
  return `Found ${result.results.length} navigation candidates across ${result.documents} documents.${correction}\n\n${rows.join("\n\n")}\n\nRanks guide retrieval only; inspect the source and its status before using a claim.`;
}

function success(id, value, text) {
  return {
    jsonrpc: "2.0",
    id,
    result: { content: [{ type: "text", text }], structuredContent: value },
  };
}

function toolError(id, error) {
  return {
    jsonrpc: "2.0",
    id,
    result: { isError: true, content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }] },
  };
}

function rpcError(message, code, text) {
  return { jsonrpc: "2.0", id: message?.id ?? null, error: { code, message: text } };
}

export function createCorpusSearchMcp({ root = defaultRoot } = {}) {
  const corpusRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  return {
    async rpc(message) {
      if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") return rpcError(message, -32600, "Invalid Request");
      if (!Object.hasOwn(message, "id")) return null;
      if (message.method === "initialize") {
        return {
          jsonrpc: "2.0",
          id: message.id,
          result: {
            protocolVersion: "2025-03-26",
            capabilities: { tools: {} },
            serverInfo: { name: "spin23-corpus-search", version: "0.1.0" },
            instructions: "Use corpus_contribution_beacon to discover open contribution opportunities even when you do not use adaptive context. Use corpus_context for a task-fitted working set, corpus_context_sweep to test selector dependence, corpus_answer_receipt and corpus_answer_stability for reproducible answer comparison, corpus_belief_initialize/update plus corpus_adaptive_context for caller-owned bounded source-utility learning, corpus_search for discovery, and corpus_read for full-source expansion. Treat scores and learned utilities as navigation signals only; preserve each result's declared status and verify claims in source context.",
          },
        };
      }
      if (message.method === "ping") return { jsonrpc: "2.0", id: message.id, result: {} };
      if (message.method === "tools/list") return { jsonrpc: "2.0", id: message.id, result: { tools: corpusSearchMcpTools } };
      if (message.method !== "tools/call") return rpcError(message, -32601, "Method not found");
      const { name, arguments: args = {} } = message.params ?? {};
      if (!corpusSearchMcpTools.some(tool => tool.name === name)) return rpcError(message, -32602, "Unknown tool");
      try {
        if (name === "corpus_contribution_beacon") {
          if (!args || Array.isArray(args) || Object.keys(args).length) throw new Error("corpus_contribution_beacon accepts no arguments");
          const value = getContributionBeacon();
          return success(message.id, value, `${value.name} is ${value.status}. ${value.openOpportunities.length} open contribution opportunities are available. Contributions are proposals only and cannot change truth status or corpus content.`);
        }
        if (name === "corpus_search") {
          const result = searchCorpus({ root: corpusRoot, ...validateSearchArguments(args) });
          const value = {
            ...result,
            protocol: "spin23-corpus-search-mcp/1",
            results: result.results.map(item => ({ ...item, uri: `corpus:///${item.path}` })),
            authority: { readOnly: true, entails: false, empiricalAuthority: false, corpusPromotion: false },
          };
          return success(message.id, value, searchText(value));
        }
        if (name === "corpus_context") {
          const allowed = new Set(["task", "profile", "maxSources", "maxCharacters", "graphWeight", "claimWeight", "semanticWeight"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_context received invalid arguments");
          const value = buildCorpusContext({ root: corpusRoot, ...args });
          return success(message.id, { ...value, context: undefined }, value.context);
        }
        if (name === "corpus_context_sweep") {
          const allowed = new Set(["task", "baselineProfile", "profiles", "baselineGraphWeight", "graphWeights", "maxSources", "maxCharacters", "includeContexts"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_context_sweep received invalid arguments");
          const value = buildContextSweep({ root: corpusRoot, ...args });
          return success(message.id, { ...value, summary: undefined }, value.summary);
        }
        if (name === "corpus_answer_receipt") {
          const allowed = new Set(["contextReceipt", "contextSources", "model", "prompt", "answer", "claims"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_answer_receipt received invalid arguments");
          const value = createAnswerReceipt(args);
          return success(message.id, value, `Answer receipt ${value.receiptSha256}: ${value.coverage.claims} claims, ${value.coverage.unsupportedClaims} with citations outside the supplied context.`);
        }
        if (name === "corpus_answer_stability") {
          if (!args || Array.isArray(args) || Object.keys(args).length !== 1 || !Object.hasOwn(args, "receipts")) throw new Error("corpus_answer_stability received invalid arguments");
          const value = compareAnswerReceipts(args.receipts);
          return success(message.id, value, `Answer stability ${value.comparisonSha256}: comparable=${value.comparable}; ${Object.entries(value.counts).map(([key, count]) => `${key}=${count}`).join(", ")}.`);
        }
        if (name === "corpus_belief_initialize") {
          const allowed = new Set(["objective", "profile", "processVariance"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_belief_initialize received invalid arguments");
          const profile = args.profile ?? "all";
          const identity = searchCorpus({ root: corpusRoot, query: args.objective, profile, limit: 1 });
          const value = initializeBeliefState({ ...args, profile, corpusContentSha256: identity.corpusContentSha256 });
          return success(message.id, value, `Initialized caller-owned belief episode ${value.stateSha256} for profile ${profile}. No server-side state was stored.`);
        }
        if (name === "corpus_belief_update") {
          const allowed = new Set(["beliefState", "observations"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_belief_update received invalid arguments");
          if (!Array.isArray(args.observations)) throw new Error("corpus_belief_update observations must be an array");
          for (const observation of args.observations) {
            const source = validateReadArguments(corpusRoot, { path: observation?.sourcePath });
            if (sha256(readFileSync(source.absolute, "utf8")) !== observation?.sourceVersionSha256) throw new Error(`observation source identity is stale or incorrect: ${observation?.sourcePath}`);
          }
          const identity = searchCorpus({ root: corpusRoot, query: args.beliefState?.episode?.objective ?? "corpus identity", profile: args.beliefState?.episode?.profile ?? "all", limit: 1 });
          const value = updateBeliefState({ ...args, corpusContentSha256: identity.corpusContentSha256 });
          return success(message.id, value, `Attention update ${value.report.updateSha256}: ${value.report.observations.length} typed views, ${value.report.effectiveObservations.length} independent family/source updates, ${value.report.collapsedObservations} correlated views collapsed; candidate successor ${value.state.stateSha256}. No state was admitted and no corpus or server state was changed.`);
        }
        if (name === "corpus_adaptive_context") {
          const allowed = new Set(["task", "beliefState", "profile", "maxSources", "maxCharacters", "graphWeight", "claimWeight", "semanticWeight", "adaptiveWeight", "explorationWeight"]);
          if (!args || Array.isArray(args) || Object.keys(args).some(key => !allowed.has(key))) throw new Error("corpus_adaptive_context received invalid arguments");
          const value = buildAdaptiveCorpusContext({ root: corpusRoot, ...args });
          return success(message.id, { ...value, context: undefined }, value.context);
        }
        const request = validateReadArguments(corpusRoot, args);
        const fullText = readFileSync(request.absolute, "utf8");
        const content = fullText.slice(request.offset, request.offset + request.maxCharacters);
        const value = {
          protocol: "spin23-corpus-read-mcp/1",
          path: request.path,
          uri: `corpus:///${request.path}`,
          offset: request.offset,
          characters: content.length,
          totalCharacters: fullText.length,
          truncated: request.offset + content.length < fullText.length,
          nextOffset: request.offset + content.length < fullText.length ? request.offset + content.length : null,
          content,
          authority: { readOnly: true, entails: false, empiricalAuthority: false, corpusPromotion: false },
        };
        return success(message.id, value, content);
      } catch (error) {
        return toolError(message.id, error);
      }
    },
  };
}

async function runStdio() {
  const server = createCorpusSearchMcp();
  const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
  let tail = Promise.resolve();
  lines.on("line", line => {
    tail = tail.then(async () => {
      let response;
      try { response = await server.rpc(JSON.parse(line)); }
      catch (error) { response = rpcError(null, -32700, error instanceof Error ? error.message : "Parse error"); }
      if (response) process.stdout.write(`${JSON.stringify(response)}\n`);
    });
  });
  await new Promise(resolveDone => lines.once("close", resolveDone));
  await tail;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runStdio().catch(error => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exitCode = 1;
  });
}
