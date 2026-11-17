// rel-core.mjs - shared, DOM-free REL interpreter helpers.

const TUPLE = /\(\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*(?:,\s*"((?:\\.|[^"\\])*)"\s*)?(?:,\s*"((?:\\.|[^"\\])*)"\s*)?\)/g;
const EMPTY_ARRAY = Object.freeze([]);
const KEY_SEP = "\u001f";
const NON_PERSISTED_FACT_KEYS = new Set(["s", "p", "o", "pol", "file", "module", "line"]);
const S_BARE_ATOM = /^[A-Za-z0-9_.:/#@+-]+$/u;
const S_SEQUENTIAL_PREDICATE_RUN = /^s#(\d+)$/u;
const S_NUMBERED_PREDICATE = /^s(\d+)$/u;
const REL_BINARY_MAGIC = Object.freeze([0x52, 0x45, 0x4c, 0x42, 0x49, 0x4e, 0x31, 0x00]);
const REL_BINARY_NONE = 0xffffffff;

function decode(text) {
  return JSON.parse(`"${text}"`);
}

function encode(value) {
  return JSON.stringify(String(value)).slice(1, -1);
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function canonicalJson(value) {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (!isPlainObject(value)) throw new Error("REL metadata must be JSON scalars, arrays, or plain objects.");
  return `{${Object.keys(value)
    .filter(key => value[key] !== undefined)
    .sort()
    .map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function metadataForFact(fact) {
  const metadata = {};
  for (const key of Object.keys(fact || {})) {
    if (NON_PERSISTED_FACT_KEYS.has(key)) continue;
    if (fact[key] !== undefined) metadata[key] = fact[key];
  }
  return Object.keys(metadata).length ? metadata : null;
}

function stripLineComment(line) {
  let out = "";
  let inString = false;
  let escaped = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inString) {
      out += ch;
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === "\"") inString = false;
      continue;
    }
    if (ch === "\"") {
      inString = true;
      out += ch;
      continue;
    }
    if (ch === "/" && line[i + 1] === "/") break;
    out += ch;
  }
  return out;
}

export function parseRawFacts(text, meta = {}) {
  const out = [];
  const lines = (text || "").split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = stripLineComment(lines[i]);
    for (const match of line.matchAll(TUPLE)) {
      out.push({
        s: decode(match[1]),
        p: decode(match[2]),
        o: decode(match[3]),
        pol: match[4] == null ? "is" : decode(match[4]),
        file: meta.file,
        module: meta.module,
        line: i + 1,
        ...(match[5] == null ? {} : JSON.parse(decode(match[5]))),
      });
    }
  }
  return out;
}

function serializeFacts(source) {
  const facts = [...source];
  return facts.map(fact => {
    const parts = [
      `"${encode(fact.s)}"`,
      `"${encode(fact.p)}"`,
      `"${encode(fact.o)}"`,
      `"${encode(fact.pol)}"`,
    ];
    const metadata = metadataForFact(fact);
    if (metadata) parts.push(`"${encode(canonicalJson(metadata))}"`);
    return `(${parts.join(", ")})`;
  }).join("\n") + (facts.length ? "\n" : "");
}

function encodeSAtom(value) {
  const text = String(value);
  return text && S_BARE_ATOM.test(text) ? text : JSON.stringify(text);
}

function decodeSQuotedAtom(text) {
  return JSON.parse(text);
}

function sMetadataForFact(fact) {
  const metadata = metadataForFact(fact);
  return metadata ? canonicalJson(metadata) : "";
}

function pushSChild(node, child) {
  node.children.push(child);
  return child;
}

function sNode(value, children = []) {
  return { value: String(value), children };
}

function sFormatNode(node) {
  const atom = encodeSAtom(node.value);
  if (!node.children?.length) return atom;
  return `${atom}(${node.children.map(sFormatNode).join(", ")})`;
}

function appendSObjectNodes(predicateNode, group) {
  const simple = group.every(fact => (fact.pol || "is") === "is" && !sMetadataForFact(fact));
  if (simple) {
    for (const fact of group) pushSChild(predicateNode, sNode(fact.o));
    return;
  }
  const factsByObject = new Map();
  for (const fact of group) {
    const object = String(fact.o ?? "");
    const facts = factsByObject.get(object) || [];
    facts.push(fact);
    factsByObject.set(object, facts);
  }
  for (const [object, facts] of factsByObject) {
    const objectNode = pushSChild(predicateNode, sNode(object));
    for (const fact of facts) {
      const pol = fact.pol || "is";
      const metadata = sMetadataForFact(fact);
      if (metadata) pushSChild(objectNode, sNode(pol, [sNode(metadata)]));
      else pushSChild(objectNode, sNode(pol));
    }
  }
}

function maybeSSequentialPredicateRun(subject, predicate, predicateOrder, groupedFacts) {
  const first = S_NUMBERED_PREDICATE.exec(predicate);
  if (!first || Number(first[1]) !== 1) return null;
  const width = first[1].length;
  const entries = predicateOrder
    .map(name => {
      const match = S_NUMBERED_PREDICATE.exec(name);
      return match && match[1].length === width ? { name, index: Number(match[1]) } : null;
    })
    .filter(Boolean)
    .sort((left, right) => left.index - right.index);
  if (entries.length < 4) return null;
  for (let i = 0; i < entries.length; i += 1) {
    if (entries[i].index !== i + 1) return null;
    const group = groupedFacts.get(tupleKey(subject, entries[i].name));
    if (!group || group.length !== 1) return null;
    const fact = group[0];
    if ((fact.pol || "is") !== "is" || sMetadataForFact(fact)) return null;
  }
  return {
    node: sNode(`s#${width}`, entries.map(entry => sNode(groupedFacts.get(tupleKey(subject, entry.name))[0].o))),
    predicates: entries.map(entry => entry.name),
  };
}

function serializeSFacts(source) {
  const facts = [...source];
  const roots = [];
  const rootBySubject = new Map();
  const groupedFacts = new Map();
  const predicateOrderBySubject = new Map();

  for (const fact of facts) {
    const subject = String(fact.s ?? "");
    const predicate = String(fact.p ?? "");
    let subjectNode = rootBySubject.get(subject);
    if (!subjectNode) {
      subjectNode = sNode(subject);
      rootBySubject.set(subject, subjectNode);
      predicateOrderBySubject.set(subject, []);
      roots.push(subjectNode);
    }
    const predicateOrder = predicateOrderBySubject.get(subject);
    const groupKey = tupleKey(subject, predicate);
    const group = groupedFacts.get(groupKey) || [];
    if (!groupedFacts.has(groupKey)) predicateOrder.push(predicate);
    group.push(fact);
    groupedFacts.set(groupKey, group);
  }

  for (const subjectNode of roots) {
    const subject = subjectNode.value;
    const predicateOrder = predicateOrderBySubject.get(subject) || [];
    const consumed = new Set();
    for (const predicate of predicateOrder) {
      if (consumed.has(predicate)) continue;
      const run = maybeSSequentialPredicateRun(subject, predicate, predicateOrder, groupedFacts);
      if (run) {
        pushSChild(subjectNode, run.node);
        for (const consumedPredicate of run.predicates) consumed.add(consumedPredicate);
        continue;
      }
      const group = groupedFacts.get(tupleKey(subject, predicate));
      if (!group) continue;
      appendSObjectNodes(pushSChild(subjectNode, sNode(predicate)), group);
    }
  }

  return roots.map(root => `(${sFormatNode(root)})`).join("\n") + (roots.length ? "\n" : "");
}

// Returns the semantic occurrence order produced by an S encode/decode cycle,
// while retaining the original immutable fact objects. This preserves
// canonical transport identity without allocating parsed fact copies and a
// second indexed FactStore.
export function canonicalSFactSequence(source = []) {
  const facts = [...source];
  const subjectOrder = [];
  const predicatesBySubject = new Map();
  const groupedFacts = new Map();
  for (const fact of facts) {
    const subject = String(fact.s ?? "");
    const predicate = String(fact.p ?? "");
    if (!predicatesBySubject.has(subject)) {
      subjectOrder.push(subject);
      predicatesBySubject.set(subject, []);
    }
    const key = tupleKey(subject, predicate);
    if (!groupedFacts.has(key)) predicatesBySubject.get(subject).push(predicate);
    const group = groupedFacts.get(key) || [];
    group.push(fact);
    groupedFacts.set(key, group);
  }

  const ordered = [];
  for (const subject of subjectOrder) {
    const predicateOrder = predicatesBySubject.get(subject) || [];
    const consumed = new Set();
    for (const predicate of predicateOrder) {
      if (consumed.has(predicate)) continue;
      const run = maybeSSequentialPredicateRun(subject, predicate, predicateOrder, groupedFacts);
      if (run) {
        for (const consumedPredicate of run.predicates) {
          ordered.push(groupedFacts.get(tupleKey(subject, consumedPredicate))[0]);
          consumed.add(consumedPredicate);
        }
        continue;
      }
      const group = groupedFacts.get(tupleKey(subject, predicate)) || [];
      const simple = group.every(fact => (fact.pol || "is") === "is" && !sMetadataForFact(fact));
      if (simple) {
        ordered.push(...group);
        continue;
      }
      const factsByObject = new Map();
      for (const fact of group) {
        const object = String(fact.o ?? "");
        const objectFacts = factsByObject.get(object) || [];
        objectFacts.push(fact);
        factsByObject.set(object, objectFacts);
      }
      for (const objectFacts of factsByObject.values()) ordered.push(...objectFacts);
    }
  }
  return Object.freeze(ordered);
}

function tokenizeS(text) {
  const tokens = [];
  const input = String(text || "");
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/u.test(ch)) {
      i += 1;
      continue;
    }
    if (ch === "(" || ch === ")" || ch === ",") {
      tokens.push({ type: ch, value: ch });
      i += 1;
      continue;
    }
    if (ch === "\"") {
      let raw = "\"";
      i += 1;
      let escaped = false;
      while (i < input.length) {
        const current = input[i];
        raw += current;
        i += 1;
        if (escaped) {
          escaped = false;
          continue;
        }
        if (current === "\\") {
          escaped = true;
          continue;
        }
        if (current === "\"") break;
      }
      tokens.push({ type: "atom", value: decodeSQuotedAtom(raw) });
      continue;
    }
    let raw = "";
    while (i < input.length && !/[\s(),]/u.test(input[i])) {
      raw += input[i];
      i += 1;
    }
    if (!raw) throw new Error(`Invalid .S token near offset ${i}.`);
    tokens.push({ type: "atom", value: raw });
  }
  return tokens;
}

function parseSNode(tokens, state) {
  const token = tokens[state.index];
  if (!token || token.type !== "atom") throw new Error("Expected .S atom.");
  state.index += 1;
  const node = sNode(token.value);
  if (tokens[state.index]?.type !== "(") return node;
  state.index += 1;
  while (state.index < tokens.length && tokens[state.index]?.type !== ")") {
    node.children.push(parseSNode(tokens, state));
    if (tokens[state.index]?.type === ",") state.index += 1;
  }
  if (tokens[state.index]?.type !== ")") throw new Error("Unclosed .S scope.");
  state.index += 1;
  return node;
}

function parseSTopLevel(text) {
  const tokens = tokenizeS(text);
  const state = { index: 0 };
  const roots = [];
  while (state.index < tokens.length) {
    if (tokens[state.index]?.type === ",") {
      state.index += 1;
      continue;
    }
    if (tokens[state.index]?.type !== "(") throw new Error("Expected .S top-level scope.");
    state.index += 1;
    roots.push(parseSNode(tokens, state));
    if (tokens[state.index]?.type !== ")") throw new Error("Unclosed .S top-level scope.");
    state.index += 1;
  }
  return roots;
}

function appendSFactsFromTree(out, root) {
  for (const predicateNode of root.children || []) {
    const sequentialRun = S_SEQUENTIAL_PREDICATE_RUN.exec(predicateNode.value);
    if (sequentialRun) {
      const width = Number(sequentialRun[1]);
      let index = 1;
      for (const objectNode of predicateNode.children || []) {
        out.push({
          s: root.value,
          p: `s${String(index).padStart(width, "0")}`,
          o: objectNode.value,
          pol: "is",
        });
        index += 1;
      }
      continue;
    }
    for (const objectNode of predicateNode.children || []) {
      if (!objectNode.children?.length) {
        out.push({ s: root.value, p: predicateNode.value, o: objectNode.value, pol: "is" });
        continue;
      }
      for (const polNode of objectNode.children) {
        const metadataText = polNode.children?.[0]?.value;
        const metadata = metadataText ? JSON.parse(metadataText) : null;
        out.push({
          s: root.value,
          p: predicateNode.value,
          o: objectNode.value,
          pol: polNode.value || "is",
          ...(metadata || {}),
        });
      }
    }
  }
}

function parseRawSFacts(text, meta = {}) {
  const out = [];
  for (const root of parseSTopLevel(text)) appendSFactsFromTree(out, root);
  return out.map(fact => ({
    ...fact,
    file: meta.file,
    module: meta.module,
    line: meta.line,
  }));
}

function textEncoder() {
  return new TextEncoder();
}

function textDecoder() {
  return new TextDecoder();
}

function binaryBytes(source) {
  if (source instanceof Uint8Array) return source;
  if (source instanceof ArrayBuffer) return new Uint8Array(source);
  if (ArrayBuffer.isView(source)) return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
  throw new Error("REL binary frame must be an ArrayBuffer or Uint8Array.");
}

function binaryStringIndex(value, strings, index) {
  const text = String(value ?? "");
  let found = index.get(text);
  if (found === undefined) {
    found = strings.length;
    strings.push(text);
    index.set(text, found);
  }
  return found;
}

function binarySamplePredicateMatch(predicate) {
  const match = S_NUMBERED_PREDICATE.exec(String(predicate || ""));
  if (!match) return null;
  return {
    width: match[1].length,
    index: Number(match[1]),
  };
}

function binaryPackableSampleFact(fact) {
  if ((fact.pol || "is") !== "is" || sMetadataForFact(fact)) return null;
  const match = binarySamplePredicateMatch(fact.p);
  if (!match) return null;
  const value = Number(fact.o);
  if (!Number.isFinite(value)) return null;
  return { ...match, value };
}

function collectBinarySampleRuns(facts, initiallyConsumed = new Set()) {
  const bySubject = new Map();
  facts.forEach((fact, index) => {
    if (initiallyConsumed.has(index)) return;
    const sample = binaryPackableSampleFact(fact);
    if (!sample) return;
    let byWidth = bySubject.get(String(fact.s ?? ""));
    if (!byWidth) bySubject.set(String(fact.s ?? ""), byWidth = new Map());
    let byIndex = byWidth.get(sample.width);
    if (!byIndex) byWidth.set(sample.width, byIndex = new Map());
    if (!byIndex.has(sample.index)) byIndex.set(sample.index, { fact, value: sample.value, sourceIndex: index });
  });

  const runs = [];
  const consumed = new Set(initiallyConsumed);
  for (const [subject, byWidth] of bySubject) {
    for (const [width, byIndex] of byWidth) {
      let count = 0;
      while (byIndex.has(count + 1)) count += 1;
      if (count < 4) continue;
      const values = [];
      const predicates = [];
      for (let index = 1; index <= count; index += 1) {
        const predicate = `s${String(index).padStart(width, "0")}`;
        values.push(byIndex.get(index).value);
        predicates.push(predicate);
        consumed.add(byIndex.get(index).sourceIndex);
      }
      runs.push({ subject, width, count, values, predicates });
    }
  }
  return { runs, consumed };
}

function serializeBinaryFacts(source) {
  const facts = [...source];
  const strings = [];
  const stringIndex = new Map();
  const { runs, consumed } = collectBinarySampleRuns(facts);
  const rows = [];

  for (let index = 0; index < facts.length; index += 1) {
    const fact = facts[index];
    if (consumed.has(index)) continue;
    const metadata = sMetadataForFact(fact);
    rows.push([
      binaryStringIndex(fact.s, strings, stringIndex),
      binaryStringIndex(fact.p, strings, stringIndex),
      binaryStringIndex(fact.o, strings, stringIndex),
      binaryStringIndex(fact.pol || "is", strings, stringIndex),
      metadata ? binaryStringIndex(metadata, strings, stringIndex) : REL_BINARY_NONE,
    ]);
  }

  const header = {
    version: 1,
    strings,
    factCount: rows.length,
    rowWidth: 5,
    sampleRuns: runs.map(run => ({
      s: binaryStringIndex(run.subject, strings, stringIndex),
      width: run.width,
      count: run.count,
    })),
  };
  const headerBytes = textEncoder().encode(canonicalJson(header));
  const rowBytes = rows.length * 5 * 4;
  const sampleBytes = runs.reduce((total, run) => total + run.count * 8, 0);
  const out = new Uint8Array(REL_BINARY_MAGIC.length + 4 + headerBytes.byteLength + rowBytes + sampleBytes);
  out.set(REL_BINARY_MAGIC, 0);
  const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setUint32(REL_BINARY_MAGIC.length, headerBytes.byteLength, true);
  out.set(headerBytes, REL_BINARY_MAGIC.length + 4);

  let offset = REL_BINARY_MAGIC.length + 4 + headerBytes.byteLength;
  for (const row of rows) {
    for (const value of row) {
      view.setUint32(offset, value, true);
      offset += 4;
    }
  }
  for (const run of runs) {
    for (const value of run.values) {
      view.setFloat64(offset, value, true);
      offset += 8;
    }
  }
  return out;
}

function parseRawBinaryFacts(source, meta = {}) {
  const bytes = binaryBytes(source);
  if (bytes.byteLength < REL_BINARY_MAGIC.length + 4) throw new Error("REL binary frame is truncated.");
  for (let i = 0; i < REL_BINARY_MAGIC.length; i += 1) {
    if (bytes[i] !== REL_BINARY_MAGIC[i]) throw new Error("Invalid REL binary frame magic.");
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const headerLength = view.getUint32(REL_BINARY_MAGIC.length, true);
  const headerOffset = REL_BINARY_MAGIC.length + 4;
  const rowOffset = headerOffset + headerLength;
  if (rowOffset > bytes.byteLength) throw new Error("REL binary frame header is truncated.");
  const header = JSON.parse(textDecoder().decode(bytes.slice(headerOffset, rowOffset)));
  if (header?.version !== 1) throw new Error(`Unsupported REL binary frame version: ${header?.version ?? "unknown"}.`);
  const strings = Array.isArray(header.strings) ? header.strings.map(String) : [];
  const facts = [];
  let offset = rowOffset;
  const factCount = Number(header.factCount || 0);
  const rowWidth = Number(header.rowWidth || 5);
  if (rowWidth !== 5) throw new Error(`Unsupported REL binary row width: ${rowWidth}.`);
  for (let i = 0; i < factCount; i += 1) {
    if (offset + rowWidth * 4 > bytes.byteLength) throw new Error("REL binary fact rows are truncated.");
    const s = view.getUint32(offset, true); offset += 4;
    const p = view.getUint32(offset, true); offset += 4;
    const o = view.getUint32(offset, true); offset += 4;
    const pol = view.getUint32(offset, true); offset += 4;
    const metadataIndex = view.getUint32(offset, true); offset += 4;
    facts.push({
      s: strings[s] ?? "",
      p: strings[p] ?? "",
      o: strings[o] ?? "",
      pol: strings[pol] || "is",
      file: meta.file,
      module: meta.module,
      line: meta.line,
      ...(metadataIndex === REL_BINARY_NONE ? {} : JSON.parse(strings[metadataIndex] || "{}")),
    });
  }
  for (const run of Array.isArray(header.sampleRuns) ? header.sampleRuns : []) {
    const subject = strings[Number(run.s)] ?? "";
    const width = Number(run.width || 0);
    const count = Number(run.count || 0);
    for (let i = 1; i <= count; i += 1) {
      if (offset + 8 > bytes.byteLength) throw new Error("REL binary sample run is truncated.");
      const value = view.getFloat64(offset, true);
      offset += 8;
      facts.push({
        s: subject,
        p: `s${String(i).padStart(width, "0")}`,
        o: String(value),
        pol: "is",
        file: meta.file,
        module: meta.module,
        line: meta.line,
      });
    }
  }
  if (header.shapeBlocks && Object.keys(header.shapeBlocks).length) {
    throw new Error("REL binary frame contains application shape blocks; decode it with the owning application codec.");
  }
  if (offset !== bytes.byteLength) throw new Error("REL binary frame contains trailing bytes.");
  return facts;
}

function tupleKey(...parts) {
  return parts.join(KEY_SEP);
}

function normalizeAuthoredBy(value) {
  if (!value || typeof value !== "object") return value;
  return Object.freeze({ ...value });
}

function normalizeFact(fact) {
  if (Object.isFrozen(fact) && (!fact.authoredBy || Object.isFrozen(fact.authoredBy))) return fact;
  return Object.freeze({
    ...fact,
    pol: fact.pol || "is",
    authoredBy: normalizeAuthoredBy(fact.authoredBy),
  });
}

function pushIndexed(map, key, fact) {
  const list = map.get(key);
  if (list) {
    list.push(fact);
    return;
  }
  map.set(key, [fact]);
}

function frozenCopy(list) {
  return list?.length ? Object.freeze([...list]) : EMPTY_ARRAY;
}

function unique(values) {
  if (!values.length) return EMPTY_ARRAY;
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return Object.freeze(out);
}

class FactSegmentSequence {
  constructor(entries) {
    this.entries = Object.freeze(entries.map(entry => Object.freeze({
      key: String(entry.key),
      facts: FactStore.from(entry.facts),
    })));
    this.length = this.entries.reduce((total, entry) => total + entry.facts.size, 0);
  }

  *[Symbol.iterator]() {
    for (const entry of this.entries) yield* entry.facts;
  }

  find(predicate, thisArg) {
    let index = 0;
    for (const fact of this) {
      if (predicate.call(thisArg, fact, index, this)) return fact;
      index += 1;
    }
    return undefined;
  }

  some(predicate, thisArg) {
    return this.find(predicate, thisArg) !== undefined;
  }

  map(callback, thisArg) {
    const out = [];
    let index = 0;
    for (const fact of this) out.push(callback.call(thisArg, fact, index++, this));
    return out;
  }

  filter(predicate, thisArg) {
    const out = [];
    let index = 0;
    for (const fact of this) {
      if (predicate.call(thisArg, fact, index++, this)) out.push(fact);
    }
    return out;
  }

  flatMap(callback, thisArg) {
    return this.map(callback, thisArg).flat();
  }
}

class FactReplacementSequence {
  constructor(source, replacements, depth = 1) {
    this.source = source;
    this.replacements = replacements;
    this.length = source.length;
    this.depth = depth;
  }

  *[Symbol.iterator]() {
    for (const fact of this.source) yield this.replacements.get(fact) || fact;
  }

  find(predicate, thisArg) {
    let index = 0;
    for (const fact of this) {
      if (predicate.call(thisArg, fact, index, this)) return fact;
      index += 1;
    }
    return undefined;
  }

  some(predicate, thisArg) {
    return this.find(predicate, thisArg) !== undefined;
  }

  map(callback, thisArg) {
    const out = [];
    let index = 0;
    for (const fact of this) out.push(callback.call(thisArg, fact, index++, this));
    return out;
  }

  filter(predicate, thisArg) {
    const out = [];
    let index = 0;
    for (const fact of this) {
      if (predicate.call(thisArg, fact, index++, this)) out.push(fact);
    }
    return out;
  }

  flatMap(callback, thisArg) {
    return this.map(callback, thisArg).flat();
  }
}

const OVERLAY_MAP_DELETE = Symbol("overlay-map-delete");

class OverlayMap {
  constructor(base, patches) {
    this.base = base;
    this.patches = patches;
    let size = base.size;
    for (const [key, value] of patches) {
      if (value === OVERLAY_MAP_DELETE) {
        if (base.has(key)) size -= 1;
      } else if (!base.has(key)) {
        size += 1;
      }
    }
    this.size = size;
  }

  get(key) {
    if (!this.patches.has(key)) return this.base.get(key);
    const value = this.patches.get(key);
    return value === OVERLAY_MAP_DELETE ? undefined : value;
  }

  has(key) {
    if (!this.patches.has(key)) return this.base.has(key);
    return this.patches.get(key) !== OVERLAY_MAP_DELETE;
  }

  *entries() {
    for (const [key, value] of this.base) {
      if (!this.patches.has(key)) {
        yield [key, value];
        continue;
      }
      const patched = this.patches.get(key);
      if (patched !== OVERLAY_MAP_DELETE) yield [key, patched];
    }
    for (const [key, value] of this.patches) {
      if (!this.base.has(key) && value !== OVERLAY_MAP_DELETE) yield [key, value];
    }
  }

  *keys() {
    for (const [key] of this.entries()) yield key;
  }

  *values() {
    for (const [, value] of this.entries()) yield value;
  }

  forEach(callback, thisArg) {
    for (const [key, value] of this.entries()) callback.call(thisArg, value, key, this);
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

export class FactStore {
  #facts = [];
  #version = 0;
  #byS = new Map();
  #byP = null;
  #byO = null;
  #bySP = new Map();
  #byPO = null;
  #bySO = null;
  #isaStateBySubject = new Map();
  #subjectsByType = new Map();
  #sharedStructures = false;
  #containersWritable = true;
  #touchedByS = new Set();
  #touchedByP = new Set();
  #touchedByO = new Set();
  #touchedBySP = new Set();
  #touchedByPO = new Set();
  #touchedBySO = new Set();
  #touchedIsaSubjects = new Set();
  #touchedTypeSets = new Set();
  #segmentEntries = null;
  #segmentIndexByFact = null;
  #segmentPatchable = false;
  #contentIdentity = Object.freeze({});

  constructor(source = []) {
    this.appendMany(source);
  }

  static from(source = []) {
    return source instanceof FactStore ? source : new FactStore(source);
  }

  static fromText(text, meta = {}) {
    return new FactStore(parseRawFacts(text, meta));
  }

  static fromS(text, meta = {}) {
    return new FactStore(parseRawSFacts(text, meta));
  }

  static fromBinary(source, meta = {}) {
    return new FactStore(parseRawBinaryFacts(source, meta));
  }

  static concat(...sources) {
    const store = new FactStore();
    for (const source of sources) store.appendMany(source);
    return store;
  }

  static appendShared(base, ...sources) {
    const baseStore = FactStore.from(base);
    const additions = sources.map(source => FactStore.from(source)).filter(source => source.size > 0);
    if (!additions.length) return baseStore.fork();

    const store = new FactStore();
    store.#byS = new Map(baseStore.#byS);
    store.#byP = baseStore.#byP ? new Map(baseStore.#byP) : null;
    store.#byO = baseStore.#byO ? new Map(baseStore.#byO) : null;
    store.#bySP = new Map(baseStore.#bySP);
    store.#byPO = baseStore.#byPO ? new Map(baseStore.#byPO) : null;
    store.#bySO = baseStore.#bySO ? new Map(baseStore.#bySO) : null;
    store.#isaStateBySubject = new Map(baseStore.#isaStateBySubject);
    store.#subjectsByType = new Map(baseStore.#subjectsByType);
    store.#sharedStructures = true;
    store.#containersWritable = true;
    for (const source of additions) {
      for (const fact of source) store.#indexFrozen(normalizeFact(fact));
    }
    store.#facts = new FactSegmentSequence([
      { key: "base", facts: baseStore },
      ...additions.map((facts, index) => ({ key: `append:${index}`, facts })),
    ]);
    store.#version = baseStore.#version + 1;
    store.#segmentEntries = null;
    store.#segmentIndexByFact = null;
    store.#segmentPatchable = false;
    store.#contentIdentity = Object.freeze({});
    baseStore.#markShared();
    store.#markShared();
    return store;
  }

  static replaceSubjectFacts(previous, replacementsBySubject = new Map()) {
    if (!(previous instanceof FactStore) || !(replacementsBySubject instanceof Map)) return null;
    const priorDepth = previous.#facts instanceof FactReplacementSequence ? previous.#facts.depth : 0;
    if (priorDepth >= 8) return null;
    const replacementByFact = new WeakMap();
    const replacementPairs = [];
    const touchedSubjects = new Set();
    const touchedPredicates = new Set();
    const touchedObjects = new Set();
    let replacementCount = 0;
    for (const [subject, nextInput] of replacementsBySubject) {
      const priorFacts = previous.#byS.get(subject) || EMPTY_ARRAY;
      const nextFacts = [...FactStore.from(nextInput)].map(normalizeFact);
      if (priorFacts.length !== nextFacts.length || new Set(priorFacts).size !== priorFacts.length) return null;
      for (let index = 0; index < priorFacts.length; index += 1) {
        const priorFact = priorFacts[index];
        const nextFact = nextFacts[index];
        if (priorFact.s !== nextFact.s || priorFact.p !== nextFact.p || priorFact.pol !== nextFact.pol) return null;
        if (priorFact.p === "isa" && priorFact.o !== nextFact.o) return null;
        if (priorFact === nextFact) continue;
        replacementByFact.set(priorFact, nextFact);
        replacementPairs.push([priorFact, nextFact]);
        touchedSubjects.add(priorFact.s);
        touchedPredicates.add(priorFact.p);
        touchedObjects.add(priorFact.o);
        touchedObjects.add(nextFact.o);
        replacementCount += 1;
      }
    }
    if (!replacementCount) return previous.fork();

    const sequence = new FactReplacementSequence(previous.#facts, replacementByFact, priorDepth + 1);
    const replaceList = list => list?.map(fact => replacementByFact.get(fact) || fact) || EMPTY_ARRAY;
    const patchDirectIndex = (prior, touched) => {
      if (!prior) return null;
      const patches = new Map();
      for (const key of touched) {
        const facts = replaceList(prior.get(key));
        patches.set(key, facts.length ? facts : OVERLAY_MAP_DELETE);
      }
      return new OverlayMap(prior, patches);
    };
    const touchedSP = new Set();
    const touchedPO = new Set();
    const touchedSO = new Set();
    for (const subject of touchedSubjects) {
      for (const fact of previous.#byS.get(subject) || EMPTY_ARRAY) {
        const nextFact = replacementByFact.get(fact) || fact;
        touchedSP.add(tupleKey(fact.s, fact.p));
        touchedPO.add(tupleKey(fact.p, fact.o));
        touchedPO.add(tupleKey(nextFact.p, nextFact.o));
        touchedSO.add(tupleKey(fact.s, fact.o));
        touchedSO.add(tupleKey(nextFact.s, nextFact.o));
      }
    }

    const rekeyedPlans = [
      { prior: previous.#byO, touched: touchedObjects, keyFor: fact => fact.o },
      { prior: previous.#byPO, touched: touchedPO, keyFor: fact => tupleKey(fact.p, fact.o) },
      { prior: previous.#bySO, touched: touchedSO, keyFor: fact => tupleKey(fact.s, fact.o) },
    ].filter(plan => plan.prior);
    const orderByFact = new WeakMap();
    if (rekeyedPlans.length) {
      const candidates = new Set(replacementPairs.map(([priorFact]) => priorFact));
      for (const plan of rekeyedPlans) {
        for (const key of plan.touched) {
          for (const fact of plan.prior.get(key) || EMPTY_ARRAY) candidates.add(fact);
        }
      }
      let rankedBySegments = Boolean(previous.#segmentEntries && previous.#segmentIndexByFact);
      const candidatesBySegment = new Map();
      if (rankedBySegments) {
        for (const fact of candidates) {
          const segmentIndex = previous.#segmentIndexByFact.get(fact);
          if (segmentIndex == null) {
            rankedBySegments = false;
            break;
          }
          const segmentCandidates = candidatesBySegment.get(segmentIndex) || new Set();
          segmentCandidates.add(fact);
          candidatesBySegment.set(segmentIndex, segmentCandidates);
        }
      }
      if (rankedBySegments) {
        for (const [segmentIndex, segmentCandidates] of candidatesBySegment) {
          let offset = 0;
          for (const fact of previous.#segmentEntries[segmentIndex].facts) {
            if (segmentCandidates.has(fact)) orderByFact.set(fact, [segmentIndex, offset]);
            offset += 1;
          }
        }
      } else {
        let offset = 0;
        for (const fact of previous.#facts) {
          if (candidates.has(fact)) orderByFact.set(fact, [0, offset]);
          offset += 1;
        }
      }
      for (const [priorFact, nextFact] of replacementPairs) {
        orderByFact.set(nextFact, orderByFact.get(priorFact));
      }
    }
    const patchedRekeyedIndex = prior => {
      if (!prior) return null;
      const plan = rekeyedPlans.find(candidate => candidate.prior === prior);
      const patches = new Map();
      for (const key of plan.touched) {
        const facts = [];
        const included = new Set();
        for (const priorFact of prior.get(key) || EMPTY_ARRAY) {
          const fact = replacementByFact.get(priorFact) || priorFact;
          if (plan.keyFor(fact) !== key || included.has(fact)) continue;
          facts.push(fact);
          included.add(fact);
        }
        for (const [priorFact, nextFact] of replacementPairs) {
          if (plan.keyFor(priorFact) === key || plan.keyFor(nextFact) !== key || included.has(nextFact)) continue;
          facts.push(nextFact);
          included.add(nextFact);
        }
        facts.sort((left, right) => {
          const leftOrder = orderByFact.get(left) || [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
          const rightOrder = orderByFact.get(right) || [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
          return leftOrder[0] - rightOrder[0] || leftOrder[1] - rightOrder[1];
        });
        patches.set(key, facts.length ? facts : OVERLAY_MAP_DELETE);
      }
      return new OverlayMap(prior, patches);
    };

    const store = new FactStore();
    store.#facts = sequence;
    store.#version = previous.#version + 1;
    store.#byS = patchDirectIndex(previous.#byS, touchedSubjects);
    store.#byP = patchDirectIndex(previous.#byP, touchedPredicates);
    store.#byO = patchedRekeyedIndex(previous.#byO);
    store.#bySP = patchDirectIndex(previous.#bySP, touchedSP);
    store.#byPO = patchedRekeyedIndex(previous.#byPO);
    store.#bySO = patchedRekeyedIndex(previous.#bySO);
    store.#isaStateBySubject = previous.#isaStateBySubject;
    store.#subjectsByType = previous.#subjectsByType;
    store.#segmentEntries = null;
    store.#segmentIndexByFact = null;
    store.#segmentPatchable = false;
    store.#contentIdentity = Object.freeze({});
    previous.#markShared();
    store.#markShared();
    return store;
  }

  static fromSegments(entries = [], options = {}) {
    const sequence = new FactSegmentSequence(entries);
    const keys = sequence.entries.map(entry => entry.key);
    if (new Set(keys).size !== keys.length) {
      throw new Error("FactStore.fromSegments requires unique segment keys.");
    }

    const previous = options.previous instanceof FactStore ? options.previous : null;
    const requestedChangedKeys = options.changedKeys == null
      ? null
      : new Set([...options.changedKeys].map(String));
    const knownKeys = new Set(keys);
    const changedKeysKnown = !requestedChangedKeys
      || [...requestedChangedKeys].every(key => knownKeys.has(key));
    const canPatch = Boolean(
      previous?.#segmentEntries
      && previous.#segmentIndexByFact
      && previous.#segmentPatchable
      && previous.#segmentEntries.length === sequence.entries.length
      && previous.#segmentEntries.every((entry, index) => entry.key === sequence.entries[index].key)
      && requestedChangedKeys
      && changedKeysKnown
    );

    if (!canPatch) {
      const store = new FactStore();
      store.#facts = sequence;
      store.#segmentEntries = sequence.entries;
      store.#segmentIndexByFact = new WeakMap();
      store.#segmentPatchable = true;
      for (let segmentIndex = 0; segmentIndex < sequence.entries.length; segmentIndex += 1) {
        for (const fact of sequence.entries[segmentIndex].facts) {
          const knownSegmentIndex = store.#segmentIndexByFact.get(fact);
          if (knownSegmentIndex != null && knownSegmentIndex !== segmentIndex) {
            store.#segmentPatchable = false;
          }
          store.#segmentIndexByFact.set(fact, segmentIndex);
          store.#indexFrozen(fact);
        }
      }
      store.#version = sequence.length ? 1 : 0;
      store.#markShared();
      return store;
    }

    const changedIndexes = new Set();
    for (let index = 0; index < sequence.entries.length; index += 1) {
      if (
        requestedChangedKeys.has(sequence.entries[index].key)
        || previous.#segmentEntries[index].facts.#contentIdentity !== sequence.entries[index].facts.#contentIdentity
      ) changedIndexes.add(index);
    }
    if (!changedIndexes.size) return previous.fork();

    for (const index of changedIndexes) {
      for (const fact of sequence.entries[index].facts) {
        const knownSegmentIndex = previous.#segmentIndexByFact.get(fact);
        if (knownSegmentIndex != null && knownSegmentIndex !== index) {
          return FactStore.fromSegments(sequence.entries);
        }
      }
    }

    const touchedS = new Map();
    const touchedP = new Map();
    const touchedO = new Map();
    const touchedSP = new Map();
    const touchedPO = new Map();
    const touchedSO = new Map();
    const touchedIsaSubjects = new Set();
    const touchedIsaTypes = new Set();
    const newS = new Map();
    const newP = new Map();
    const newO = new Map();
    const newSP = new Map();
    const newPO = new Map();
    const newSO = new Map();
    const addBucket = (index, key, fact, owner) => {
      let bySegment = owner.get(key);
      if (!bySegment) owner.set(key, bySegment = new Map());
      let facts = bySegment.get(index);
      if (!facts) bySegment.set(index, facts = []);
      facts.push(fact);
    };
    const visit = (fact, index = -1, isNew = false) => {
      const sp = tupleKey(fact.s, fact.p);
      const po = tupleKey(fact.p, fact.o);
      const so = tupleKey(fact.s, fact.o);
      touchedS.set(fact.s, true);
      touchedSP.set(sp, true);
      if (previous.#byP) touchedP.set(fact.p, true);
      if (previous.#byO) touchedO.set(fact.o, true);
      if (previous.#byPO) touchedPO.set(po, true);
      if (previous.#bySO) touchedSO.set(so, true);
      if (fact.p === "isa") {
        touchedIsaSubjects.add(fact.s);
        touchedIsaTypes.add(fact.o);
      }
      if (!isNew) return;
      addBucket(index, fact.s, fact, newS);
      addBucket(index, sp, fact, newSP);
      if (previous.#byP) addBucket(index, fact.p, fact, newP);
      if (previous.#byO) addBucket(index, fact.o, fact, newO);
      if (previous.#byPO) addBucket(index, po, fact, newPO);
      if (previous.#bySO) addBucket(index, so, fact, newSO);
    };

    for (const index of changedIndexes) {
      for (const fact of previous.#segmentEntries[index].facts) visit(fact);
      for (const fact of sequence.entries[index].facts) visit(fact, index, true);
    }

    const segmentIndexByFact = previous.#segmentIndexByFact;
    for (const index of changedIndexes) {
      for (const fact of sequence.entries[index].facts) segmentIndexByFact.set(fact, index);
    }
    const rebuildList = (prior = EMPTY_ARRAY, replacements) => {
      const unchanged = prior.filter(fact => !changedIndexes.has(segmentIndexByFact.get(fact)));
      const replacementFacts = replacements
        ? [...replacements.values()].flat()
        : EMPTY_ARRAY;
      if (!unchanged.length) return [...replacementFacts];
      if (!replacementFacts.length) return unchanged;
      const rebuilt = [];
      let unchangedIndex = 0;
      let replacementIndex = 0;
      while (unchangedIndex < unchanged.length && replacementIndex < replacementFacts.length) {
        const unchangedSegment = segmentIndexByFact.get(unchanged[unchangedIndex]);
        const replacementSegment = segmentIndexByFact.get(replacementFacts[replacementIndex]);
        if (replacementSegment < unchangedSegment) rebuilt.push(replacementFacts[replacementIndex++]);
        else rebuilt.push(unchanged[unchangedIndex++]);
      }
      rebuilt.push(...unchanged.slice(unchangedIndex), ...replacementFacts.slice(replacementIndex));
      return rebuilt;
    };
    const patchIndex = (prior, touched, replacements) => {
      if (!prior) return null;
      const patches = new Map();
      for (const key of touched.keys()) {
        const facts = rebuildList(prior.get(key), replacements.get(key));
        patches.set(key, facts.length ? facts : OVERLAY_MAP_DELETE);
      }
      return patches.size ? new OverlayMap(prior, patches) : prior;
    };

    const store = new FactStore();
    store.#facts = sequence;
    store.#version = previous.#version + 1;
    store.#segmentEntries = sequence.entries;
    store.#segmentIndexByFact = segmentIndexByFact;
    store.#segmentPatchable = true;
    store.#byS = patchIndex(previous.#byS, touchedS, newS);
    store.#byP = patchIndex(previous.#byP, touchedP, newP);
    store.#byO = patchIndex(previous.#byO, touchedO, newO);
    store.#bySP = patchIndex(previous.#bySP, touchedSP, newSP);
    store.#byPO = patchIndex(previous.#byPO, touchedPO, newPO);
    store.#bySO = patchIndex(previous.#bySO, touchedSO, newSO);
    const isaStatePatches = new Map();
    for (const subject of touchedIsaSubjects) {
      const state = new Map();
      for (const fact of store.#bySP.get(tupleKey(subject, "isa")) || EMPTY_ARRAY) {
        state.set(fact.o, fact.pol === "is");
      }
      isaStatePatches.set(subject, state.size ? state : OVERLAY_MAP_DELETE);
    }
    store.#isaStateBySubject = isaStatePatches.size
      ? new OverlayMap(previous.#isaStateBySubject, isaStatePatches)
      : previous.#isaStateBySubject;
    const subjectsByTypePatches = new Map();
    if (touchedIsaTypes.size) {
      const subjectsByTouchedType = new Map([...touchedIsaTypes].map(type => [type, new Set()]));
      for (const fact of store.#facts) {
        if (fact.p !== "isa" || !subjectsByTouchedType.has(fact.o)) continue;
        const subjects = subjectsByTouchedType.get(fact.o);
        if (fact.pol === "is") subjects.add(fact.s);
        else subjects.delete(fact.s);
      }
      for (const [type, subjects] of subjectsByTouchedType) {
        subjectsByTypePatches.set(type, subjects.size ? subjects : OVERLAY_MAP_DELETE);
      }
    }
    store.#subjectsByType = subjectsByTypePatches.size
      ? new OverlayMap(previous.#subjectsByType, subjectsByTypePatches)
      : previous.#subjectsByType;
    previous.#markShared();
    store.#markShared();
    return store;
  }

  get size() {
    return this.#facts.length;
  }

  get length() {
    return this.#facts.length;
  }

  get version() {
    return this.#version;
  }

  memoryInventory() {
    const index = value => value
      ? Object.freeze({
          materialized: true,
          keyCount: value.size,
          referenceCount: [...value.values()].reduce((total, entries) => total + entries.length, 0),
        })
      : Object.freeze({ materialized: false, keyCount: 0, referenceCount: 0 });
    return Object.freeze({
      factCount: this.#facts.length,
      sharedStructures: this.#sharedStructures,
      segments: Object.freeze({
        active: Boolean(this.#segmentEntries),
        count: this.#segmentEntries?.length || 0,
        patchable: Boolean(this.#segmentEntries && this.#segmentPatchable),
      }),
      indexes: Object.freeze({
        bySubject: index(this.#byS),
        byPredicate: index(this.#byP),
        byObject: index(this.#byO),
        bySubjectPredicate: index(this.#bySP),
        byPredicateObject: index(this.#byPO),
        bySubjectObject: index(this.#bySO),
        isaState: Object.freeze({
          subjectCount: this.#isaStateBySubject.size,
          typeCount: this.#subjectsByType.size,
        }),
      }),
    });
  }

  [Symbol.iterator]() {
    return this.#facts[Symbol.iterator]();
  }

  find(predicate, thisArg) {
    return this.#facts.find(predicate, thisArg);
  }

  some(predicate, thisArg) {
    return this.#facts.some(predicate, thisArg);
  }

  map(callback, thisArg) {
    return this.#facts.map(callback, thisArg);
  }

  filter(predicate, thisArg) {
    return this.#facts.filter(predicate, thisArg);
  }

  flatMap(callback, thisArg) {
    return this.#facts.flatMap(callback, thisArg);
  }

  toArray() {
    return frozenCopy(this.#facts);
  }

  clone() {
    return new FactStore(this.#facts);
  }

  fork() {
    const fork = new FactStore();
    fork.#facts = this.#facts;
    fork.#version = this.#version;
    fork.#byS = this.#byS;
    fork.#byP = this.#byP;
    fork.#byO = this.#byO;
    fork.#bySP = this.#bySP;
    fork.#byPO = this.#byPO;
    fork.#bySO = this.#bySO;
    fork.#isaStateBySubject = this.#isaStateBySubject;
    fork.#subjectsByType = this.#subjectsByType;
    fork.#segmentEntries = this.#segmentEntries;
    fork.#segmentIndexByFact = this.#segmentIndexByFact;
    fork.#segmentPatchable = this.#segmentPatchable;
    fork.#contentIdentity = this.#contentIdentity;
    this.#markShared();
    fork.#markShared();
    return fork;
  }

  append(fact) {
    return this.appendMany([fact]);
  }

  appendMany(source = []) {
    let changed = false;
    for (const fact of source) {
      this.#appendFrozen(normalizeFact(fact));
      changed = true;
    }
    if (changed) {
      this.#version += 1;
      this.#contentIdentity = Object.freeze({});
    }
    return this;
  }

  replaceAll(source = []) {
    this.#facts = [];
    this.#version += 1;
    this.#byS = new Map();
    this.#byP = null;
    this.#byO = null;
    this.#bySP = new Map();
    this.#byPO = null;
    this.#bySO = null;
    this.#isaStateBySubject = new Map();
    this.#subjectsByType = new Map();
    this.#segmentEntries = null;
    this.#segmentIndexByFact = null;
    this.#segmentPatchable = false;
    this.#contentIdentity = Object.freeze({});
    this.#sharedStructures = false;
    this.#containersWritable = true;
    this.#clearTouched();
    return this.appendMany(source);
  }

  serialize() {
    return serializeFacts(this.#facts);
  }

  serializeS() {
    return serializeSFacts(this.#facts);
  }

  serializeBinary() {
    return serializeBinaryFacts(this.#facts);
  }

  factsForSubject(subject) {
    return frozenCopy(this.#byS.get(subject));
  }

  factsForPredicate(predicate) {
    return frozenCopy(this.#ensureByP().get(predicate));
  }

  factsForObject(object) {
    return frozenCopy(this.#ensureByO().get(object));
  }

  factsForSubjectPredicate(subject, predicate) {
    return frozenCopy(this.#bySP.get(tupleKey(subject, predicate)));
  }

  factsForPredicateObject(predicate, object) {
    return frozenCopy(this.#ensureByPO().get(tupleKey(predicate, object)));
  }

  factsForSubjectObject(subject, object) {
    return frozenCopy(this.#ensureBySO().get(tupleKey(subject, object)));
  }

  objects(subject, predicate) {
    return frozenCopy(this.#bySP.get(tupleKey(subject, predicate))?.map(fact => fact.o));
  }

  subjects(predicate, object) {
    return frozenCopy(this.#ensureByPO().get(tupleKey(predicate, object))?.map(fact => fact.s));
  }

  predicates(subject, object) {
    return frozenCopy(this.#ensureBySO().get(tupleKey(subject, object))?.map(fact => fact.p));
  }

  distinctObjects(subject, predicate) {
    return unique(this.objects(subject, predicate));
  }

  distinctSubjects(predicate, object) {
    return unique(this.subjects(predicate, object));
  }

  distinctPredicates(subject, object) {
    return unique(this.predicates(subject, object));
  }

  activeObjects(subject, predicate) {
    const facts = this.#bySP.get(tupleKey(subject, predicate));
    if (!facts?.length) return EMPTY_ARRAY;
    const state = new Map();
    for (const fact of facts) state.set(fact.o, fact.pol !== "is-not");
    return frozenCopy([...state.entries()].filter(([, isActive]) => isActive).map(([object]) => object));
  }

  activeSubjects(predicate, object) {
    const facts = this.#ensureByPO().get(tupleKey(predicate, object));
    if (!facts?.length) return EMPTY_ARRAY;
    const state = new Map();
    for (const fact of facts) state.set(fact.s, fact.pol !== "is-not");
    return frozenCopy([...state.entries()].filter(([, isActive]) => isActive).map(([subject]) => subject));
  }

  activePredicates(subject, object) {
    const facts = this.#ensureBySO().get(tupleKey(subject, object));
    if (!facts?.length) return EMPTY_ARRAY;
    const state = new Map();
    for (const fact of facts) state.set(fact.p, fact.pol !== "is-not");
    return frozenCopy([...state.entries()].filter(([, isActive]) => isActive).map(([predicate]) => predicate));
  }

  distinctActiveObjects(subject, predicate) {
    return unique(this.activeObjects(subject, predicate));
  }

  distinctActiveSubjects(predicate, object) {
    return unique(this.activeSubjects(predicate, object));
  }

  distinctActivePredicates(subject, object) {
    return unique(this.activePredicates(subject, object));
  }

  has(subject, predicate, object) {
    return this.#bySP.get(tupleKey(subject, predicate))?.some(fact => fact.o === object) || false;
  }

  hasActive(subject, predicate, object) {
    const facts = this.#bySP.get(tupleKey(subject, predicate));
    if (!facts?.length) return false;
    let isActive = false;
    for (const fact of facts) {
      if (fact.o !== object) continue;
      isActive = fact.pol !== "is-not";
    }
    return isActive;
  }

  one(subject, predicate) {
    const facts = this.#bySP.get(tupleKey(subject, predicate));
    return facts?.length ? facts[facts.length - 1].o : undefined;
  }

  get(subject, predicate) {
    const facts = this.#bySP.get(tupleKey(subject, predicate));
    const value = facts?.[facts.length - 1];
    return value?.pol === "is" ? value.o : undefined;
  }

  activeTypes(subject) {
    const kinds = this.#isaStateBySubject.get(subject);
    if (!kinds) return EMPTY_ARRAY;
    return Object.freeze([...kinds.entries()].filter(([, isActive]) => isActive).map(([kind]) => kind));
  }

  things(type) {
    const subjects = this.#subjectsByType.get(type);
    return subjects?.size ? Object.freeze([...subjects]) : EMPTY_ARRAY;
  }

  dump() {
    const state = {};
    for (const [subject, kinds] of this.#isaStateBySubject) {
      const active = [...kinds.entries()]
        .filter(([, isActive]) => isActive)
        .map(([kind]) => kind);
      if (active.length) (state[subject] ||= {}).isa = active;
    }
    const projectedPropsBySubject = new Map();
    for (const fact of this.#facts) {
      if (fact.p === "isa") continue;
      let props = projectedPropsBySubject.get(fact.s);
      if (!props) projectedPropsBySubject.set(fact.s, props = new Map());
      props.set(fact.p, fact);
    }
    for (const [subject, props] of projectedPropsBySubject) {
      for (const [predicate, value] of props) {
        if (value.pol !== "is") continue;
        (state[subject] ||= {})[predicate] = value.o;
      }
    }
    return state;
  }

  #clearTouched() {
    this.#touchedByS.clear();
    this.#touchedByP.clear();
    this.#touchedByO.clear();
    this.#touchedBySP.clear();
    this.#touchedByPO.clear();
    this.#touchedBySO.clear();
    this.#touchedIsaSubjects.clear();
    this.#touchedTypeSets.clear();
  }

  #ensureByP() {
    if (this.#byP) return this.#byP;
    const index = new Map();
    for (const fact of this.#facts) pushIndexed(index, fact.p, fact);
    this.#byP = index;
    return index;
  }

  #ensureByO() {
    if (this.#byO) return this.#byO;
    const index = new Map();
    for (const fact of this.#facts) pushIndexed(index, fact.o, fact);
    this.#byO = index;
    return index;
  }

  #ensureByPO() {
    if (this.#byPO) return this.#byPO;
    const index = new Map();
    for (const fact of this.#facts) pushIndexed(index, tupleKey(fact.p, fact.o), fact);
    this.#byPO = index;
    return index;
  }

  #ensureBySO() {
    if (this.#bySO) return this.#bySO;
    const index = new Map();
    for (const fact of this.#facts) pushIndexed(index, tupleKey(fact.s, fact.o), fact);
    this.#bySO = index;
    return index;
  }

  #markShared() {
    this.#sharedStructures = true;
    this.#containersWritable = false;
    this.#clearTouched();
  }

  #prepareForAppend() {
    if (!this.#sharedStructures || this.#containersWritable) return;
    this.#facts = [...this.#facts];
    this.#segmentEntries = null;
    this.#segmentIndexByFact = null;
    this.#segmentPatchable = false;
    this.#byS = new Map(this.#byS);
    this.#byP = this.#byP ? new Map(this.#byP) : null;
    this.#byO = this.#byO ? new Map(this.#byO) : null;
    this.#bySP = new Map(this.#bySP);
    this.#byPO = this.#byPO ? new Map(this.#byPO) : null;
    this.#bySO = this.#bySO ? new Map(this.#bySO) : null;
    this.#isaStateBySubject = new Map(this.#isaStateBySubject);
    this.#subjectsByType = new Map(this.#subjectsByType);
    this.#containersWritable = true;
  }

  #pushIndexed(map, key, fact, touched) {
    const list = map.get(key);
    if (!list) {
      map.set(key, [fact]);
      if (this.#sharedStructures) touched.add(key);
      return;
    }
    if (this.#sharedStructures && !touched.has(key)) {
      map.set(key, [...list, fact]);
      touched.add(key);
      return;
    }
    list.push(fact);
  }

  #writableNestedMap(owner, key, touched) {
    const existing = owner.get(key);
    if (!existing) {
      const created = new Map();
      owner.set(key, created);
      if (this.#sharedStructures) touched.add(key);
      return created;
    }
    if (this.#sharedStructures && !touched.has(key)) {
      const copied = new Map(existing);
      owner.set(key, copied);
      touched.add(key);
      return copied;
    }
    return existing;
  }

  #writableNestedSet(owner, key) {
    const existing = owner.get(key);
    if (!existing) {
      const created = new Set();
      owner.set(key, created);
      if (this.#sharedStructures) this.#touchedTypeSets.add(key);
      return created;
    }
    if (this.#sharedStructures && !this.#touchedTypeSets.has(key)) {
      const copied = new Set(existing);
      owner.set(key, copied);
      this.#touchedTypeSets.add(key);
      return copied;
    }
    return existing;
  }

  #appendFrozen(fact) {
    this.#prepareForAppend();
    this.#facts.push(fact);
    this.#indexFrozen(fact);
  }

  #indexFrozen(fact) {
    this.#pushIndexed(this.#byS, fact.s, fact, this.#touchedByS);
    if (this.#byP) this.#pushIndexed(this.#byP, fact.p, fact, this.#touchedByP);
    if (this.#byO) this.#pushIndexed(this.#byO, fact.o, fact, this.#touchedByO);
    this.#pushIndexed(this.#bySP, tupleKey(fact.s, fact.p), fact, this.#touchedBySP);
    if (this.#byPO) {
      this.#pushIndexed(this.#byPO, tupleKey(fact.p, fact.o), fact, this.#touchedByPO);
    }
    if (this.#bySO) {
      this.#pushIndexed(this.#bySO, tupleKey(fact.s, fact.o), fact, this.#touchedBySO);
    }
    if (fact.p === "isa") {
      const kinds = this.#writableNestedMap(this.#isaStateBySubject, fact.s, this.#touchedIsaSubjects);
      kinds.set(fact.o, fact.pol === "is");
      if (fact.pol === "is") {
        const subjects = this.#writableNestedSet(this.#subjectsByType, fact.o);
        subjects.add(fact.s);
      } else {
        const subjects = this.#subjectsByType.get(fact.o);
        if (subjects) this.#writableNestedSet(this.#subjectsByType, fact.o).delete(fact.s);
      }
      return;
    }
  }
}

export function parse(text, meta = {}) {
  return FactStore.fromText(text, meta);
}

export function parseS(text, meta = {}) {
  return FactStore.fromS(text, meta);
}

export function parseBinary(source, meta = {}) {
  return FactStore.fromBinary(source, meta);
}

export function serialize(facts) {
  return facts instanceof FactStore ? facts.serialize() : serializeFacts(facts);
}

export function serializeS(facts) {
  return facts instanceof FactStore ? facts.serializeS() : serializeSFacts(facts);
}

export function serializeBinary(facts) {
  return facts instanceof FactStore ? facts.serializeBinary() : serializeBinaryFacts(facts);
}

const one = (prog, subject, predicate) => FactStore.from(prog).one(subject, predicate);
const outs = (prog, subject, predicate) => FactStore.from(prog).objects(subject, predicate);

const AUTHORING_MOVE_EFFECTS = new Set([
  "setProperty",
  "setRelatedProperty",
  "setFacts",
  "reorderMember",
  "createMember",
]);
const AUTHORING_MOVE_VALUE_TYPES = new Set(["string", "ref", "integer", "number", "boolean"]);
export const AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN_PREFIX = "$derived:";
export const AUTHORING_MOVE_DERIVED_IDENTITY_ROLE_LIMIT = 16;
const AUTHORING_MOVE_DERIVED_IDENTITY_ROLE = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/u;
const AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN = /^\$derived:([A-Za-z][A-Za-z0-9_-]{0,63})$/u;
const AUTHORING_MOVE_GUARD_MODES = new Set(["all", "any"]);
const AUTHORING_MOVE_GUARD_OPERATORS = new Set([
  "exists",
  "absent",
  "equal",
  "notEqual",
  "lessThan",
  "lessThanOrEqual",
  "greaterThan",
  "greaterThanOrEqual",
  "acyclicEdgeAbsent",
  "allRelatedEqual",
  "noneReferencing",
]);
const compiledAuthoringMovePlans = new WeakMap();

function authoringMoveFail(code, message, extra = {}) {
  const issue = { code, message, ...extra };
  const error = new Error(message);
  error.code = code;
  error.statusCode = 400;
  error.issues = [issue];
  throw error;
}

function authoringMoveBoolean(value, fallback, label) {
  if (!value) return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  authoringMoveFail("invalid-authoring-move-contract", `${label} must be true or false.`, { value });
}

function canonicalAuthoringMoveArgument(raw, valueType, label) {
  if (!AUTHORING_MOVE_VALUE_TYPES.has(valueType)) {
    authoringMoveFail("invalid-authoring-move-contract", `${label} uses unsupported valueType ${valueType}.`, { valueType });
  }
  if (raw == null) return "";
  if (valueType === "string") return String(raw);
  if (valueType === "ref") {
    const value = String(raw).trim();
    if (!value || /\s/u.test(value)) {
      authoringMoveFail("invalid-authoring-move-argument", `${label} must be a canonical subject reference.`);
    }
    return value;
  }
  if (valueType === "integer") {
    const value = String(raw).trim();
    if (!/^-?(?:0|[1-9]\d*)$/u.test(value) || !Number.isSafeInteger(Number(value))) {
      authoringMoveFail("invalid-authoring-move-argument", `${label} must be a canonical integer.`);
    }
    return value;
  }
  if (valueType === "number") {
    const value = String(raw).trim();
    if (!value || !Number.isFinite(Number(value))) {
      authoringMoveFail("invalid-authoring-move-argument", `${label} must be a finite number.`);
    }
    return String(Number(value));
  }
  const value = typeof raw === "boolean" ? String(raw) : String(raw).trim();
  if (value !== "true" && value !== "false") {
    authoringMoveFail("invalid-authoring-move-argument", `${label} must be true or false.`);
  }
  return value;
}

function authoringMoveArgSpecs(state, move) {
  const specs = outs(state, move, "arg").map(subject => {
    const position = Number(one(state, subject, "position"));
    if (!Number.isSafeInteger(position) || position < 1) {
      authoringMoveFail("invalid-authoring-move-contract", `${subject}.position must be a positive integer.`);
    }
    return {
      subject,
      position,
      name: one(state, subject, "name") || `arg${position}`,
      description: one(state, subject, "description") || "",
      valueType: one(state, subject, "valueType") || "string",
      required: authoringMoveBoolean(one(state, subject, "required"), true, `${subject}.required`),
      pattern: one(state, subject, "pattern") || "",
      minLength: one(state, subject, "minLength") || "",
      maxLength: one(state, subject, "maxLength") || "",
      allowed: outs(state, subject, "allowed").map(String),
      uniquePredicate: one(state, subject, "uniquePredicate") || "",
    };
  }).sort((left, right) => left.position - right.position || left.subject.localeCompare(right.subject));
  const positions = new Set();
  for (const spec of specs) {
    if (positions.has(spec.position)) {
      authoringMoveFail("invalid-authoring-move-contract", `${move} reuses argument position ${spec.position}.`);
    }
    positions.add(spec.position);
  }
  return specs;
}

function authoringMoveMembership(state, move) {
  const root = one(state, move, "targetRoot") || "";
  const memberPredicate = one(state, move, "memberPredicate") || "";
  const targetType = one(state, move, "targetType") || "";
  if (!root || !memberPredicate || !targetType) {
    authoringMoveFail(
      "invalid-authoring-move-contract",
      `${move} must declare targetRoot, memberPredicate, and targetType.`,
    );
  }
  return {
    root,
    memberPredicate,
    targetType,
    members: outs(state, root, memberPredicate).map(String)
      .filter(subject => state.hasActive(subject, "isa", targetType)),
  };
}

function validateAuthoringMoveArguments(state, move, args, membership, compiledSpecs = null) {
  const specs = compiledSpecs || authoringMoveArgSpecs(state, move);
  const highest = specs.reduce((max, spec) => Math.max(max, spec.position), 0);
  if (args.length > highest) {
    authoringMoveFail("invalid-authoring-move-argument", `${move} received unexpected argument ${highest + 1}.`);
  }
  const values = [];
  for (const spec of specs) {
    const raw = args[spec.position - 1];
    if ((raw == null || raw === "") && spec.required) {
      authoringMoveFail("invalid-authoring-move-argument", `${spec.name} is required.`, {
        argument: spec.name,
        position: spec.position,
      });
    }
    const value = canonicalAuthoringMoveArgument(raw, spec.valueType, spec.name);
    for (const [field, compare, phrase] of [
      ["minLength", (actual, expected) => actual >= expected, "at least"],
      ["maxLength", (actual, expected) => actual <= expected, "at most"],
    ]) {
      if (!spec[field]) continue;
      const expected = spec[`${field}Value`] ?? Number(spec[field]);
      if (!Number.isSafeInteger(expected) || expected < 0) {
        authoringMoveFail("invalid-authoring-move-contract", `${spec.subject}.${field} must be a non-negative integer.`);
      }
      if (!compare(value.length, expected)) {
        authoringMoveFail("invalid-authoring-move-argument", `${spec.name} must contain ${phrase} ${expected} characters.`, {
          argument: spec.name,
          position: spec.position,
        });
      }
    }
    if (spec.pattern) {
      let pattern = spec.patternRegex;
      if (!pattern) {
        try {
          pattern = new RegExp(spec.pattern, "u");
        } catch (error) {
          authoringMoveFail("invalid-authoring-move-contract", `${spec.subject}.pattern is invalid: ${error.message}`);
        }
      }
      pattern.lastIndex = 0;
      if (!pattern.test(value)) {
        authoringMoveFail("invalid-authoring-move-argument", `${spec.name} does not match the authored pattern.`, {
          argument: spec.name,
          position: spec.position,
          pattern: spec.pattern,
        });
      }
    }
    if (spec.allowed.length && !spec.allowed.includes(value)) {
      authoringMoveFail("invalid-authoring-move-argument", `${spec.name} must be one of ${spec.allowed.join(", ")}.`, {
        argument: spec.name,
        position: spec.position,
        allowed: spec.allowed,
      });
    }
    if (spec.uniquePredicate && value) {
      const duplicate = membership.members.find(subject => state.one(subject, spec.uniquePredicate) === value);
      if (duplicate) {
        authoringMoveFail("authoring-move-value-not-unique", `${spec.name} must be unique within ${membership.root}.`, {
          argument: spec.name,
          position: spec.position,
          predicate: spec.uniquePredicate,
          conflictingSubject: duplicate,
        });
      }
    }
    values[spec.position - 1] = value;
  }
  return values;
}

function authoringMovePosition(state, move, predicate) {
  const value = Number(one(state, move, predicate));
  if (!Number.isSafeInteger(value) || value < 1) {
    authoringMoveFail("invalid-authoring-move-contract", `${move}.${predicate} must be a positive argument position.`);
  }
  return value;
}

function authoringMoveTarget(state, move, membership, values) {
  const target = values[authoringMovePosition(state, move, "targetArg") - 1] || "";
  if (!membership.members.includes(target)) {
    authoringMoveFail(
      "authoring-move-target-denied",
      `${target || "The requested target"} is not an active ${membership.targetType} member of ${membership.root}.`,
      {
        move,
        target,
        targetRoot: membership.root,
        memberPredicate: membership.memberPredicate,
        targetType: membership.targetType,
      },
    );
  }
  return target;
}

function nextAuthoringMoveSubject(state, prefix) {
  if (!prefix || /\s/u.test(prefix)) {
    authoringMoveFail("invalid-authoring-move-contract", "createMember requires a canonical generatedSubjectPrefix.");
  }
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const suffix = new RegExp(`^${escaped}\\.(\\d+)$`, "u");
  let max = 0;
  for (const fact of state) {
    const match = suffix.exec(String(fact.s));
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `${prefix}.${max + 1}`;
}

function authoringMoveDerivedIdentityTokenRole(value, { template, field }) {
  const token = String(value || "");
  const match = AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN.exec(token);
  if (match) return match[1];
  if (token.startsWith(AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN_PREFIX)) {
    authoringMoveFail(
      "invalid-authoring-move-derived-identity-role",
      `${template}.${field} contains invalid derived-identity token ${token}.`,
      { template, field, token },
    );
  }
  return "";
}

function authoringMoveDerivedIdentityRoles(templates, move, effect) {
  const occurrences = [];
  for (const template of templates) {
    for (const field of ["s", "o"]) {
      const role = authoringMoveDerivedIdentityTokenRole(template[field], {
        template: template.subject,
        field,
      });
      if (role) occurrences.push({ role, template: template.subject, field });
    }
    if (String(template.p || "").startsWith(AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN_PREFIX)) {
      authoringMoveFail(
        "authoring-move-derived-identity-dynamic-predicate-denied",
        `${template.subject}.p cannot reference a derived identity.`,
        { template: template.subject, predicate: template.p },
      );
    }
  }
  const roles = [...new Set(occurrences.map(item => item.role))].sort();
  if (!roles.length) return Object.freeze([]);
  if (effect !== "createMember") {
    authoringMoveFail(
      "authoring-move-derived-identity-effect-denied",
      `${move} may use derived identities only with createMember; found ${effect || "<missing>"}.`,
      { move, effect },
    );
  }
  if (roles.length > AUTHORING_MOVE_DERIVED_IDENTITY_ROLE_LIMIT) {
    authoringMoveFail(
      "authoring-move-derived-identity-role-limit",
      `${move} declares ${roles.length} derived identity roles; the maximum is ${AUTHORING_MOVE_DERIVED_IDENTITY_ROLE_LIMIT}.`,
      { move, roles },
    );
  }
  for (const role of roles) {
    if (!AUTHORING_MOVE_DERIVED_IDENTITY_ROLE.test(role)) {
      authoringMoveFail(
        "invalid-authoring-move-derived-identity-role",
        `${move} contains invalid derived identity role ${role}.`,
        { move, role },
      );
    }
    const token = `${AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN_PREFIX}${role}`;
    const authored = templates.filter(template => template.s === token);
    if (!authored.length) {
      authoringMoveFail(
        "authoring-move-derived-identity-not-materialized",
        `${move} references derived identity role ${role} but authors no facts on that subject.`,
        { move, role },
      );
    }
    if (!authored.some(template => template.p === "isa" && template.pol === "is" && template.o)) {
      authoringMoveFail(
        "authoring-move-derived-identity-type-required",
        `${move} derived identity role ${role} requires one positive isa fact.`,
        { move, role },
      );
    }
  }
  return Object.freeze(roles);
}

function authoringMoveDerivedIdentitySubjects(state, move, rootSubject, roles) {
  if (!roles.length) return Object.freeze({});
  const identities = {};
  for (const role of roles) {
    const subject = `${rootSubject}.derived.${role}`;
    if (subject === rootSubject || [...state].some(fact => String(fact.s) === subject)) {
      authoringMoveFail(
        "authoring-move-derived-identity-collision",
        `${move} cannot allocate derived identity role ${role}; ${subject} already exists.`,
        { move, role, subject, rootSubject },
      );
    }
    identities[role] = subject;
  }
  return Object.freeze(identities);
}

function validateDerivedAuthoringMovePlan(move, planned, roles) {
  if (!roles.length) return planned;
  const exactFacts = new Set();
  for (const item of planned) {
    const fact = item.fact;
    const key = JSON.stringify([fact.s, fact.p, fact.o, fact.pol || "is"]);
    if (exactFacts.has(key)) {
      authoringMoveFail(
        "authoring-move-derived-identity-duplicate-fact",
        `${move} derived identity lowering produced duplicate fact ${key}.`,
        { move, fact },
      );
    }
    exactFacts.add(key);
  }
  return planned;
}

function substituteAuthoringMoveValue(token, context) {
  if (token === "$new") return context.newSubject;
  if (token === "$target") return context.target;
  if (token === "$root") return context.root;
  if (token === "$nextOrder") return String(context.nextOrder);
  const derived = AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN.exec(String(token || ""));
  if (derived) {
    const subject = context.derivedSubjects?.[derived[1]];
    if (!subject) {
      authoringMoveFail(
        "authoring-move-derived-identity-unresolved",
        `Derived identity role ${derived[1]} is unavailable in this authoring move.`,
        { role: derived[1] },
      );
    }
    return subject;
  }
  const arg = /^<(\d+)>$/u.exec(token);
  if (arg) return context.values[Number(arg[1]) - 1] ?? "";
  return String(token)
    .replaceAll("$target", context.target || "")
    .replaceAll("$root", context.root || "")
    .replace(/<(\d+)>/gu, (_match, position) => (
      context.values[Number(position) - 1] ?? ""
    ));
}

function planAuthoringMoveFacts(state, move, predicate, context) {
  return outs(state, move, predicate).map(subject => ({
    subject,
    order: Number(one(state, subject, "order") || Number.MAX_SAFE_INTEGER),
  })).sort((left, right) => left.order - right.order || left.subject.localeCompare(right.subject))
    .map(({ subject }) => {
      const fact = {
        s: substituteAuthoringMoveValue(one(state, subject, "s") || "", context),
        p: substituteAuthoringMoveValue(one(state, subject, "p") || "", context),
        o: substituteAuthoringMoveValue(one(state, subject, "o") || "", context),
        pol: one(state, subject, "pol") === "not" ? "is-not" : (one(state, subject, "pol") || "is"),
      };
      if (!fact.s || !fact.p || fact.o === "") {
        authoringMoveFail("invalid-authoring-move-contract", `${subject} lowered to an empty REL fact field.`);
      }
      return { fact, sourceSubject: subject };
    });
}

function replaceAuthoringMoveFacts(state, move, planned) {
  const positiveKeys = new Map();
  return planned.flatMap(entry => {
    if (entry.fact.pol !== "is") return [entry];
    const key = `${entry.fact.s}\u0000${entry.fact.p}`;
    const priorPlanned = positiveKeys.get(key);
    if (priorPlanned && priorPlanned !== entry.fact.o) {
      authoringMoveFail(
        "invalid-authoring-move-contract",
        `${move}.setFact declares competing replacement values for ${entry.fact.s}.${entry.fact.p}.`,
      );
    }
    positiveKeys.set(key, entry.fact.o);
    const retractions = state.activeObjects(entry.fact.s, entry.fact.p)
      .map(String)
      .filter(value => value !== entry.fact.o)
      .map(value => ({
        fact: { ...entry.fact, o: value, pol: "is-not" },
        sourceSubject: entry.sourceSubject,
      }));
    return [...retractions, entry];
  });
}

function authoringMoveGuardSpecs(state, move) {
  return outs(state, move, "guard").map(subject => {
    const mode = one(state, subject, "mode") || "";
    const denialMessage = one(state, subject, "denialMessage") || "";
    if (!AUTHORING_MOVE_GUARD_MODES.has(mode)) {
      authoringMoveFail("invalid-authoring-move-contract", `${subject}.mode must be all or any.`);
    }
    if (!denialMessage) {
      authoringMoveFail("invalid-authoring-move-contract", `${subject}.denialMessage is required.`);
    }
    const conditions = outs(state, subject, "condition").map(condition => {
      const scope = one(state, condition, "scope") || "";
      const predicate = one(state, condition, "predicate") || "";
      const operator = one(state, condition, "operator") || "";
      const valueType = one(state, condition, "valueType") || "";
      const value = one(state, condition, "value");
      const sourceArg = Number(one(state, condition, "sourceArg") || 0);
      const valueArg = Number(one(state, condition, "valueArg") || 0);
      const relatedValuePredicate = one(state, condition, "relatedValuePredicate") || "";
      if (!["target", "root"].includes(scope)) {
        authoringMoveFail("invalid-authoring-move-contract", `${condition}.scope must be target or root.`);
      }
      if (!predicate) {
        authoringMoveFail("invalid-authoring-move-contract", `${condition}.predicate is required.`);
      }
      if (!AUTHORING_MOVE_GUARD_OPERATORS.has(operator)) {
        authoringMoveFail("invalid-authoring-move-contract", `${condition}.operator is unsupported: ${operator || "<empty>"}.`);
      }
      if (operator === "acyclicEdgeAbsent") {
        if (!Number.isSafeInteger(sourceArg) || sourceArg < 1 || !Number.isSafeInteger(valueArg) || valueArg < 1) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition} requires positive sourceArg and valueArg positions.`);
        }
        if (valueType || value != null || relatedValuePredicate) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition} must not declare valueType, value, or relatedValuePredicate for ${operator}.`);
        }
      } else if (operator === "allRelatedEqual") {
        if (!relatedValuePredicate) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition}.relatedValuePredicate is required for ${operator}.`);
        }
        if (!AUTHORING_MOVE_VALUE_TYPES.has(valueType) || value == null || value === "") {
          authoringMoveFail("invalid-authoring-move-contract", `${condition} requires valueType and value for ${operator}.`);
        }
        canonicalAuthoringMoveArgument(value, valueType, `${condition}.value`);
        if (sourceArg || valueArg) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition} must not declare sourceArg or valueArg for ${operator}.`);
        }
      } else if (operator === "noneReferencing") {
        if (valueType || value != null || sourceArg || valueArg || relatedValuePredicate) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition} declares fields unavailable for ${operator}.`);
        }
      } else if (!["exists", "absent"].includes(operator)) {
        if (!AUTHORING_MOVE_VALUE_TYPES.has(valueType)) {
          authoringMoveFail("invalid-authoring-move-contract", `${condition}.valueType is required for ${operator}.`);
        }
        if (value == null || value === "") {
          authoringMoveFail("invalid-authoring-move-contract", `${condition}.value is required for ${operator}.`);
        }
        canonicalAuthoringMoveArgument(value, valueType, `${condition}.value`);
      } else if (valueType || value != null) {
        authoringMoveFail("invalid-authoring-move-contract", `${condition} must not declare valueType or value for ${operator}.`);
      }
      return Object.freeze({
        subject: condition,
        scope,
        predicate,
        operator,
        valueType,
        value: value ?? "",
        sourceArg,
        valueArg,
        relatedValuePredicate,
      });
    }).sort((left, right) => left.subject.localeCompare(right.subject));
    if (!conditions.length) {
      authoringMoveFail("invalid-authoring-move-contract", `${subject} requires at least one condition.`);
    }
    return Object.freeze({ subject, mode, denialMessage, conditions: Object.freeze(conditions) });
  }).sort((left, right) => left.subject.localeCompare(right.subject));
}

function authoringMoveConditionMatches(state, condition, context) {
  const subject = condition.scope === "target" ? context.target : context.root;
  if (!subject) return false;
  if (condition.operator === "acyclicEdgeAbsent") {
    const source = String(context.values?.[condition.sourceArg - 1] || "");
    const target = String(context.values?.[condition.valueArg - 1] || "");
    if (!source || !target || source === target || state.hasActive(source, condition.predicate, target)) return false;
    const visiting = [target];
    const seen = new Set();
    while (visiting.length) {
      const current = visiting.pop();
      if (current === source) return false;
      if (seen.has(current)) continue;
      seen.add(current);
      for (const next of state.activeObjects(current, condition.predicate).map(String)) visiting.push(next);
    }
    return true;
  }
  if (condition.operator === "allRelatedEqual") {
    const expected = canonicalAuthoringMoveArgument(condition.value, condition.valueType, `${condition.subject}.value`);
    return state.activeObjects(subject, condition.predicate).map(String).every(related => {
      const active = state.activeObjects(related, condition.relatedValuePredicate).map(String);
      if (active.length !== 1) return false;
      try {
        return canonicalAuthoringMoveArgument(active[0], condition.valueType, `${condition.subject}.related`) === expected;
      } catch {
        return false;
      }
    });
  }
  if (condition.operator === "noneReferencing") {
    return state.subjects(condition.predicate, subject).map(String)
      .every(candidate => !state.hasActive(candidate, condition.predicate, subject));
  }
  const active = state.activeObjects(subject, condition.predicate).map(String);
  if (condition.operator === "exists") return active.length > 0;
  if (condition.operator === "absent") return active.length === 0;
  // Typed comparisons are deliberately single-valued and fail closed. The
  // record schema owns cardinality; a malformed multi-value field must never
  // accidentally satisfy a transition guard.
  if (active.length !== 1) return false;
  let actual;
  let expected;
  try {
    actual = canonicalAuthoringMoveArgument(active[0], condition.valueType, `${condition.subject}.actual`);
    expected = canonicalAuthoringMoveArgument(condition.value, condition.valueType, `${condition.subject}.value`);
  } catch {
    return false;
  }
  if (condition.operator === "equal") return actual === expected;
  if (condition.operator === "notEqual") return actual !== expected;
  if (!["integer", "number"].includes(condition.valueType)) return false;
  const left = Number(actual);
  const right = Number(expected);
  if (condition.operator === "lessThan") return left < right;
  if (condition.operator === "lessThanOrEqual") return left <= right;
  if (condition.operator === "greaterThan") return left > right;
  if (condition.operator === "greaterThanOrEqual") return left >= right;
  return false;
}

function enforceAuthoringMoveGuards(state, move, guards, context) {
  for (const guard of guards) {
    const matches = guard.conditions.map(condition => authoringMoveConditionMatches(state, condition, context));
    const admitted = guard.mode === "all" ? matches.every(Boolean) : matches.some(Boolean);
    if (!admitted) {
      authoringMoveFail("authoring-move-guard-denied", guard.denialMessage, {
        move,
        guard: guard.subject,
        target: context.target || "",
        targetRoot: context.root,
        failedConditions: guard.conditions.filter((_condition, index) => !matches[index]).map(condition => condition.subject),
      });
    }
  }
}

function authoringMoveRelatedTarget(state, move, target) {
  const relatedPredicate = one(state, move, "relatedPredicate") || "";
  const relatedDirection = one(state, move, "relatedDirection") || "";
  const relatedType = one(state, move, "relatedType") || "";
  if (!relatedPredicate || !relatedType || !["outgoing", "incoming"].includes(relatedDirection)) {
    authoringMoveFail(
      "invalid-authoring-move-contract",
      `${move} must declare relatedPredicate, relatedDirection, and relatedType for setRelatedProperty.`,
    );
  }
  const store = FactStore.from(state);
  const candidates = (relatedDirection === "outgoing"
    ? store.activeObjects(target, relatedPredicate)
    : store.subjects(relatedPredicate, target)
  ).map(String).filter(subject => store.hasActive(subject, "isa", relatedType));
  const related = [...new Set(candidates)].sort();
  if (related.length !== 1) {
    authoringMoveFail(
      "authoring-move-related-target-unresolved",
      `${move} requires exactly one ${relatedType} related ${relatedDirection} through ${relatedPredicate}; found ${related.length}.`,
      { move, target, relatedPredicate, relatedDirection, relatedType, related },
    );
  }
  return related[0];
}

function compileAuthoringMoveArgumentSpecs(state, move) {
  return Object.freeze(authoringMoveArgSpecs(state, move).map(spec => {
    if (!AUTHORING_MOVE_VALUE_TYPES.has(spec.valueType)) {
      authoringMoveFail(
        "invalid-authoring-move-contract",
        `${spec.name} uses unsupported valueType ${spec.valueType}.`,
        { valueType: spec.valueType },
      );
    }
    const compiled = { ...spec };
    for (const field of ["minLength", "maxLength"]) {
      if (!spec[field]) continue;
      const value = Number(spec[field]);
      if (!Number.isSafeInteger(value) || value < 0) {
        authoringMoveFail("invalid-authoring-move-contract", `${spec.subject}.${field} must be a non-negative integer.`);
      }
      compiled[`${field}Value`] = value;
    }
    if (spec.pattern) {
      try {
        compiled.patternRegex = new RegExp(spec.pattern, "u");
      } catch (error) {
        authoringMoveFail("invalid-authoring-move-contract", `${spec.subject}.pattern is invalid: ${error.message}`);
      }
    }
    return Object.freeze(compiled);
  }));
}

function compileAuthoringMoveTemplates(state, move, predicate) {
  return Object.freeze(outs(state, move, predicate).map(subject => ({
    subject,
    order: Number(one(state, subject, "order") || Number.MAX_SAFE_INTEGER),
    s: one(state, subject, "s") || "",
    p: one(state, subject, "p") || "",
    o: one(state, subject, "o") || "",
    pol: one(state, subject, "pol") === "not" ? "is-not" : (one(state, subject, "pol") || "is"),
  })).sort((left, right) => left.order - right.order || left.subject.localeCompare(right.subject))
    .map(Object.freeze));
}

function lowerCompiledAuthoringMoveTemplates(templates, context) {
  return templates.map(template => {
    const fact = {
      s: substituteAuthoringMoveValue(template.s, context),
      p: substituteAuthoringMoveValue(template.p, context),
      o: substituteAuthoringMoveValue(template.o, context),
      pol: template.pol,
    };
    if (!fact.s || !fact.p || fact.o === "") {
      authoringMoveFail("invalid-authoring-move-contract", `${template.subject} lowered to an empty REL fact field.`);
    }
    return { fact, sourceSubject: template.subject };
  });
}

function authoringMoveDefinitionIdentity(state, subjects) {
  const facts = subjects.flatMap(subject => state.factsForSubject(subject))
    .filter(fact => fact.pol !== "is-not")
    .map(fact => [String(fact.s), String(fact.p), String(fact.o), String(fact.pol || "is")])
    .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  const source = JSON.stringify(facts);
  let hash = 0xcbf29ce484222325n;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= BigInt(source.charCodeAt(index));
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return `authoring-move-plan:${hash.toString(16).padStart(16, "0")}`;
}

function positiveArgumentPosition(state, move, predicate) {
  return authoringMovePosition(state, move, predicate);
}

export function compileAuthoringMovePlan(input, move) {
  const state = FactStore.from(input);
  let cached = compiledAuthoringMovePlans.get(state);
  if (!cached || cached.version !== state.version) {
    cached = { version: state.version, plans: new Map() };
    compiledAuthoringMovePlans.set(state, cached);
  }
  if (cached.plans.has(move)) return cached.plans.get(move);
  const effect = one(state, move, "effect") || "";
  if (!AUTHORING_MOVE_EFFECTS.has(effect)) {
    authoringMoveFail("invalid-authoring-move-contract", `${move} uses unsupported effect ${effect || "<empty>"}.`);
  }
  const root = one(state, move, "targetRoot") || "";
  const memberPredicate = one(state, move, "memberPredicate") || "";
  const targetType = one(state, move, "targetType") || "";
  if (!root || !memberPredicate || !targetType) {
    authoringMoveFail(
      "invalid-authoring-move-contract",
      `${move} must declare targetRoot, memberPredicate, and targetType.`,
    );
  }
  const args = compileAuthoringMoveArgumentSpecs(state, move);
  const definitionSubjects = [move, ...args.map(spec => spec.subject)];
  const reads = new Set(["isa", memberPredicate]);
  const writes = new Set();
  for (const spec of args) if (spec.uniquePredicate) reads.add(spec.uniquePredicate);
  const guards = authoringMoveGuardSpecs(state, move);
  for (const guard of guards) {
    definitionSubjects.push(guard.subject, ...guard.conditions.map(condition => condition.subject));
    for (const condition of guard.conditions) reads.add(condition.predicate);
  }
  const targetArg = effect === "createMember" ? null : positiveArgumentPosition(state, move, "targetArg");
  const valueArg = ["setProperty", "setRelatedProperty", "reorderMember"].includes(effect)
    ? positiveArgumentPosition(state, move, "valueArg")
    : null;
  const predicate = one(state, move, "predicate") || "";
  const orderPredicate = one(state, move, "orderPredicate") || "order";
  const generatedSubjectPrefix = one(state, move, "generatedSubjectPrefix") || "";
  const relatedPredicate = one(state, move, "relatedPredicate") || "";
  const relatedDirection = one(state, move, "relatedDirection") || "";
  const relatedType = one(state, move, "relatedType") || "";
  const relatedValuePredicate = one(state, move, "relatedValuePredicate") || "";
  const templates = effect === "setFacts"
    ? compileAuthoringMoveTemplates(state, move, "setFact")
    : (effect === "createMember" ? compileAuthoringMoveTemplates(state, move, "createFact") : Object.freeze([]));
  const derivedIdentityRoles = authoringMoveDerivedIdentityRoles(templates, move, effect);
  definitionSubjects.push(...templates.map(template => template.subject));

  if (effect === "setProperty") {
    if (!predicate) authoringMoveFail("invalid-authoring-move-contract", `${move}.predicate is required for setProperty.`);
    writes.add(predicate);
  } else if (effect === "setRelatedProperty") {
    if (!predicate || !relatedValuePredicate
      || !relatedPredicate || !relatedType || !["outgoing", "incoming"].includes(relatedDirection)) {
      authoringMoveFail(
        "invalid-authoring-move-contract",
        `${move} must declare predicate, relatedValuePredicate, relatedPredicate, relatedDirection, and relatedType for setRelatedProperty.`,
      );
    }
    reads.add(relatedPredicate);
    reads.add(predicate);
    reads.add(relatedValuePredicate);
    writes.add(predicate);
    writes.add(relatedValuePredicate);
  } else if (effect === "setFacts") {
    if (!templates.length) authoringMoveFail("invalid-authoring-move-contract", `${move}.setFact must declare at least one authored fact.`);
    for (const template of templates) {
      if (/[<$]/u.test(template.p)) {
        authoringMoveFail(
          "invalid-authoring-move-contract",
          `${template.subject}.p cannot be dynamic under compiledIrReadSetV1 dependency derivation.`,
        );
      } else {
        reads.add(template.p);
        writes.add(template.p);
      }
    }
  } else if (effect === "reorderMember") {
    reads.add(orderPredicate);
    writes.add(orderPredicate);
  } else {
    if (!generatedSubjectPrefix || /\s/u.test(generatedSubjectPrefix)) {
      authoringMoveFail(
        "invalid-authoring-move-contract",
        "createMember requires a canonical generatedSubjectPrefix.",
      );
    }
    reads.add(orderPredicate);
    reads.add(`@subjectNamespace:${generatedSubjectPrefix}`);
    for (const role of derivedIdentityRoles) reads.add(`@derivedSubjectRole:${role}`);
    writes.add(memberPredicate);
    for (const template of templates) {
      if (/[<$]/u.test(template.p)) {
        authoringMoveFail(
          "invalid-authoring-move-contract",
          `${template.subject}.p cannot be dynamic under compiledIrReadSetV1 dependency derivation.`,
        );
      }
      writes.add(template.p);
    }
  }

  const membership = runtimeState => ({
    root,
    memberPredicate,
    targetType,
    members: runtimeState.activeObjects(root, memberPredicate).map(String)
      .filter(subject => runtimeState.hasActive(subject, "isa", targetType)),
  });
  const targetFor = (resolvedMembership, values) => {
    const target = values[targetArg - 1] || "";
    if (!resolvedMembership.members.includes(target)) {
      authoringMoveFail(
        "authoring-move-target-denied",
        `${target || "The requested target"} is not an active ${targetType} member of ${root}.`,
        { move, target, targetRoot: root, memberPredicate, targetType },
      );
    }
    return target;
  };

  const execute = (suppliedArgs, runtimeState = state) => {
    const resolvedMembership = membership(runtimeState);
    const values = validateAuthoringMoveArguments(
      runtimeState,
      move,
      Array.isArray(suppliedArgs) ? suppliedArgs : [],
      resolvedMembership,
      args,
    );
    const guardedTarget = effect === "createMember" ? "" : targetFor(resolvedMembership, values);
    enforceAuthoringMoveGuards(runtimeState, move, guards, {
      target: guardedTarget,
      root,
      values,
    });
    if (effect === "setProperty") {
      const target = guardedTarget;
      return [{ fact: { s: target, p: predicate, o: values[valueArg - 1], pol: "is" }, sourceSubject: move }];
    }
    if (effect === "setRelatedProperty") {
      const target = guardedTarget;
      const candidates = (relatedDirection === "outgoing"
        ? runtimeState.activeObjects(target, relatedPredicate)
        : runtimeState.subjects(relatedPredicate, target)
      ).map(String).filter(subject => runtimeState.hasActive(subject, "isa", relatedType));
      const related = [...new Set(candidates)].sort();
      if (related.length !== 1) {
        authoringMoveFail(
          "authoring-move-related-target-unresolved",
          `${move} requires exactly one ${relatedType} related ${relatedDirection} through ${relatedPredicate}; found ${related.length}.`,
          { move, target, relatedPredicate, relatedDirection, relatedType, related },
        );
      }
      const value = values[valueArg - 1];
      return replaceAuthoringMoveFacts(runtimeState, move, [
        { fact: { s: target, p: predicate, o: value, pol: "is" }, sourceSubject: move },
        { fact: { s: related[0], p: relatedValuePredicate, o: value, pol: "is" }, sourceSubject: move },
      ]);
    }
    if (effect === "setFacts") {
      const target = guardedTarget;
      return replaceAuthoringMoveFacts(runtimeState, move, lowerCompiledAuthoringMoveTemplates(templates, {
        values,
        target,
        root,
        newSubject: "",
        nextOrder: 0,
      }));
    }
    if (effect === "reorderMember") {
      const target = guardedTarget;
      const destination = Number(values[valueArg - 1]);
      if (!Number.isSafeInteger(destination) || destination < 1 || destination > resolvedMembership.members.length) {
        authoringMoveFail("invalid-authoring-move-argument", `Position must be between 1 and ${resolvedMembership.members.length}.`, {
          move,
          position: destination,
        });
      }
      const ordered = [...resolvedMembership.members].sort((left, right) => {
        const leftOrder = Number(runtimeState.one(left, orderPredicate));
        const rightOrder = Number(runtimeState.one(right, orderPredicate));
        return (Number.isFinite(leftOrder) ? leftOrder : Number.MAX_SAFE_INTEGER)
          - (Number.isFinite(rightOrder) ? rightOrder : Number.MAX_SAFE_INTEGER)
          || left.localeCompare(right);
      });
      ordered.splice(ordered.indexOf(target), 1);
      ordered.splice(destination - 1, 0, target);
      return ordered.map((subject, index) => ({
        fact: { s: subject, p: orderPredicate, o: String(index + 1), pol: "is" },
        sourceSubject: move,
      }));
    }
    const newSubject = nextAuthoringMoveSubject(runtimeState, generatedSubjectPrefix);
    const derivedSubjects = authoringMoveDerivedIdentitySubjects(
      runtimeState,
      move,
      newSubject,
      derivedIdentityRoles,
    );
    const orders = resolvedMembership.members
      .map(subject => Number(runtimeState.one(subject, orderPredicate)))
      .filter(Number.isFinite);
    const planned = lowerCompiledAuthoringMoveTemplates(templates, {
      values,
      newSubject,
      derivedSubjects,
      root,
      nextOrder: orders.length ? Math.max(...orders) + 1 : 1,
    });
    planned.push({
      fact: { s: root, p: memberPredicate, o: newSubject, pol: "is" },
      sourceSubject: move,
    });
    return validateDerivedAuthoringMovePlan(move, planned, derivedIdentityRoles);
  };

  const manifest = Object.freeze({
    type: "AuthoringMoveExecutableManifest",
    version: "javascriptAuthoringMovePlanV1",
    identity: authoringMoveDefinitionIdentity(state, definitionSubjects),
    command: move,
    commandType: "AuthoringMove",
    effect,
    execution: "compiled",
    reads: Object.freeze([...reads].sort()),
    writes: Object.freeze([...writes].sort()),
    deterministic: true,
    pure: true,
    placement: "request-thread",
    definitionSubjects: Object.freeze([...new Set(definitionSubjects)].sort()),
    ...(derivedIdentityRoles.length ? {
      derivedIdentity: Object.freeze({
        tokenPrefix: AUTHORING_MOVE_DERIVED_IDENTITY_TOKEN_PREFIX,
        derivation: "primaryRootDotDerivedDotAuthoredRoleV1",
        roleLimit: AUTHORING_MOVE_DERIVED_IDENTITY_ROLE_LIMIT,
        roles: derivedIdentityRoles,
        collisionPolicy: "reject-existing-derived-subject",
        callerSuppliedIdentity: "forbidden",
      }),
    } : {}),
  });
  const plan = Object.freeze({ execute, manifest });
  cached.plans.set(move, plan);
  return plan;
}

export const isAuthoringMove = (store, subject) => FactStore.from(store).hasActive(subject, "isa", "AuthoringMove");

export function describeAuthoringMove(state, move) {
  const membership = authoringMoveMembership(state, move);
  return {
    subject: move,
    name: one(state, move, "name") || move,
    description: one(state, move, "description") || "",
    effect: one(state, move, "effect") || "",
    order: Number(one(state, move, "order") || Number.MAX_SAFE_INTEGER),
    admissionSuites: outs(state, move, "admissionSuite").map(String),
    args: authoringMoveArgSpecs(state, move),
    guards: authoringMoveGuardSpecs(state, move),
    targets: membership.members.map(subject => ({ subject, name: one(state, subject, "name") || subject })),
  };
}

export function planAuthoringMove(state, move, args = []) {
  const effect = one(state, move, "effect") || "";
  if (!AUTHORING_MOVE_EFFECTS.has(effect)) {
    authoringMoveFail("invalid-authoring-move-contract", `${move} uses unsupported effect ${effect || "<empty>"}.`);
  }
  const membership = authoringMoveMembership(state, move);
  const values = validateAuthoringMoveArguments(state, move, Array.isArray(args) ? args : [], membership);
  const guardedTarget = effect === "createMember" ? "" : authoringMoveTarget(state, move, membership, values);
  enforceAuthoringMoveGuards(state, move, authoringMoveGuardSpecs(state, move), {
    target: guardedTarget,
    root: membership.root,
    values,
  });
  if (effect === "setProperty") {
    const target = guardedTarget;
    const predicate = one(state, move, "predicate") || "";
    if (!predicate) {
      authoringMoveFail("invalid-authoring-move-contract", `${move}.predicate is required for setProperty.`);
    }
    return [{
      fact: {
        s: target,
        p: predicate,
        o: values[authoringMovePosition(state, move, "valueArg") - 1],
        pol: "is",
      },
      sourceSubject: move,
    }];
  }
  if (effect === "setRelatedProperty") {
    const target = guardedTarget;
    const predicate = one(state, move, "predicate") || "";
    const relatedValuePredicate = one(state, move, "relatedValuePredicate") || "";
    if (!predicate || !relatedValuePredicate) {
      authoringMoveFail(
        "invalid-authoring-move-contract",
        `${move} must declare predicate and relatedValuePredicate for setRelatedProperty.`,
      );
    }
    const value = values[authoringMovePosition(state, move, "valueArg") - 1];
    const related = authoringMoveRelatedTarget(state, move, target);
    return replaceAuthoringMoveFacts(state, move, [
      { fact: { s: target, p: predicate, o: value, pol: "is" }, sourceSubject: move },
      { fact: { s: related, p: relatedValuePredicate, o: value, pol: "is" }, sourceSubject: move },
    ]);
  }
  if (effect === "setFacts") {
    const target = guardedTarget;
    const planned = planAuthoringMoveFacts(state, move, "setFact", {
      values,
      target,
      root: membership.root,
      newSubject: "",
      nextOrder: 0,
    });
    if (!planned.length) {
      authoringMoveFail("invalid-authoring-move-contract", `${move}.setFact must declare at least one authored fact.`);
    }
    return replaceAuthoringMoveFacts(state, move, planned);
  }
  if (effect === "reorderMember") {
    const target = guardedTarget;
    const destination = Number(values[authoringMovePosition(state, move, "valueArg") - 1]);
    if (!Number.isSafeInteger(destination) || destination < 1 || destination > membership.members.length) {
      authoringMoveFail("invalid-authoring-move-argument", `Position must be between 1 and ${membership.members.length}.`, {
        move,
        position: destination,
      });
    }
    const orderPredicate = one(state, move, "orderPredicate") || "order";
    const ordered = [...membership.members].sort((left, right) => {
      const leftOrder = Number(one(state, left, orderPredicate));
      const rightOrder = Number(one(state, right, orderPredicate));
      return (Number.isFinite(leftOrder) ? leftOrder : Number.MAX_SAFE_INTEGER)
        - (Number.isFinite(rightOrder) ? rightOrder : Number.MAX_SAFE_INTEGER)
        || left.localeCompare(right);
    });
    ordered.splice(ordered.indexOf(target), 1);
    ordered.splice(destination - 1, 0, target);
    return ordered.map((subject, index) => ({
      fact: { s: subject, p: orderPredicate, o: String(index + 1), pol: "is" },
      sourceSubject: move,
    }));
  }
  const newSubject = nextAuthoringMoveSubject(state, one(state, move, "generatedSubjectPrefix") || "");
  const templates = compileAuthoringMoveTemplates(state, move, "createFact");
  const derivedIdentityRoles = authoringMoveDerivedIdentityRoles(templates, move, effect);
  const derivedSubjects = authoringMoveDerivedIdentitySubjects(state, move, newSubject, derivedIdentityRoles);
  const orderPredicate = one(state, move, "orderPredicate") || "order";
  const orders = membership.members
    .map(subject => Number(one(state, subject, orderPredicate)))
    .filter(Number.isFinite);
  const context = {
    values,
    newSubject,
    derivedSubjects,
    root: membership.root,
    nextOrder: orders.length ? Math.max(...orders) + 1 : 1,
  };
  const planned = planAuthoringMoveFacts(state, move, "createFact", context);
  planned.push({
    fact: { s: membership.root, p: membership.memberPredicate, o: newSubject, pol: "is" },
    sourceSubject: move,
  });
  return validateDerivedAuthoringMovePlan(move, planned, derivedIdentityRoles);
}

export function project(log) {
  return FactStore.from(log);
}

function createFactStoreOverlay(program, witnessLog) {
  const factsForSubjectPredicate = (subject, predicate) => [
    ...program.factsForSubjectPredicate(subject, predicate),
    ...witnessLog.factsForSubjectPredicate(subject, predicate),
  ];
  return Object.freeze({
    factsForSubjectPredicate,
    activeObjects(subject, predicate) {
      const active = new Map();
      for (const fact of factsForSubjectPredicate(subject, predicate)) {
        active.set(fact.o, fact.pol !== "is-not");
      }
      return Object.freeze([...active.entries()]
        .filter(([, isActive]) => isActive)
        .map(([object]) => object));
    },
    hasActive(subject, predicate, object) {
      let isActive = false;
      for (const fact of factsForSubjectPredicate(subject, predicate)) {
        if (fact.o === object) isActive = fact.pol !== "is-not";
      }
      return isActive;
    },
    subjects(predicate, object) {
      return Object.freeze([
        ...program.subjects(predicate, object),
        ...witnessLog.subjects(predicate, object),
      ]);
    },
    one(subject, predicate) {
      const facts = factsForSubjectPredicate(subject, predicate);
      return facts.length ? facts[facts.length - 1].o : undefined;
    },
    *[Symbol.iterator]() {
      yield* program;
      yield* witnessLog;
    },
  });
}

function applyFactToWitnessLog(witnessLog, sourceLog, fact) {
  witnessLog.append(fact);
  if (Array.isArray(sourceLog)) sourceLog.push(fact);
}

function plannedCommandDelta(
  program,
  witnessLog,
  cmd,
  args,
  provenance = null,
  authoringState = null,
  {
    compilationPolicy = null,
    compilationTrace = null,
    profile = (_phase, operation) => operation(),
  } = {},
) {
  if (!program.hasActive(cmd, "isa", "Command")) {
    return EMPTY_ARRAY;
  }
  const proj = project(witnessLog);
  const commandSource = program.factsForSubject(cmd)[0];
  let max = 0;
  for (const fact of witnessLog) {
    const match = /^e(\d+)$/.exec(fact.s);
    if (match) max = Math.max(max, Number(match[1]));
  }
  const nextId = `e${max + 1}`;
  const sub = (token, subject) => {
    if (token === "$id") return nextId;
    const arg = /^<(\d+)>$/.exec(token);
    if (arg) return String(args[Number(arg[1]) - 1] ?? "");
    if (token[0] === "~") {
      const current = proj.get(subject, token.slice(1));
      return current === "true" ? "false" : "true";
    }
    return token;
  };
  const delta = [];
  if (isAuthoringMove(program, cmd)) {
    const compileMove = compilationPolicy?.compiledCommandTypes?.includes("AuthoringMove")
      && compilationPolicy?.commandCompiler === "javascriptAuthoringMovePlanV1";
    const state = profile("plan.state", () => (
      authoringState
      || (compileMove
        ? createFactStoreOverlay(program, witnessLog)
        : program.fork().appendMany(witnessLog))
    ));
    const compiledPlan = compileMove
      ? profile("plan.compile", () => compileAuthoringMovePlan(program, cmd))
      : null;
    const plannedFacts = profile("plan.execute", () => (
      compiledPlan ? compiledPlan.execute(args, state) : planAuthoringMove(state, cmd, args)
    ));
    if (compilationTrace) {
      compilationTrace.execution = compiledPlan ? "compiled" : "interpreter";
      compilationTrace.compiler = compiledPlan?.manifest.version || "interpreter";
      compilationTrace.manifest = compiledPlan?.manifest || null;
      compilationTrace.reason = compiledPlan
        ? "authored-policy-and-derived-effects"
        : (compilationPolicy ? "command-type-not-selected" : "unconfigured");
    }
    for (const planned of plannedFacts) {
      const effectSource = program.factsForSubject(planned.sourceSubject)[0];
      const fact = normalizeFact({
        ...planned.fact,
        ...(provenance || {}),
        authoredBy: {
          command: cmd,
          commandFile: commandSource?.file,
          commandLine: commandSource?.line,
          authoringMove: cmd,
          effectFile: effectSource?.file,
          effectLine: effectSource?.line,
        },
      });
      delta.push(fact);
    }
    return Object.freeze(delta);
  }
  for (const emit of outs(program, cmd, "emit")) {
    const emitSource = program.factsForSubject(emit)[0];
    const s = sub(one(program, emit, "s"));
    const p = sub(one(program, emit, "p"), s);
    const o = sub(one(program, emit, "o"), s);
    const fact = normalizeFact({
      s,
      p,
      o,
      pol: one(program, emit, "pol") || "is",
      ...(provenance || {}),
      authoredBy: {
        command: cmd,
        commandFile: commandSource?.file,
        commandLine: commandSource?.line,
        emitFile: emitSource?.file,
        emitLine: emitSource?.line,
      },
    });
    delta.push(fact);
  }
  return Object.freeze(delta);
}

export function createCommandPlanner(prog, log = [], { compilationPolicy = null } = {}) {
  const program = FactStore.from(prog);
  const witnessLog = log instanceof FactStore ? log : FactStore.from(log);
  const programVersion = program.version;
  const witnessVersion = witnessLog.version;
  const compiledAuthoringMoves = compilationPolicy?.compiledCommandTypes?.includes("AuthoringMove")
    && compilationPolicy?.commandCompiler === "javascriptAuthoringMovePlanV1";
  const authoringState = compiledAuthoringMoves
    ? createFactStoreOverlay(program, witnessLog)
    : program.fork().appendMany(witnessLog);
  let lastCompilation = null;
  return Object.freeze({
    plan(cmd, args = [], provenance = null) {
      if (program.version !== programVersion || witnessLog.version !== witnessVersion) {
        throw new Error("Command planner basis changed; create a new planner for the current revision.");
      }
      const compilationTrace = {};
      const delta = plannedCommandDelta(program, witnessLog, cmd, args, provenance, authoringState, {
        compilationPolicy,
        compilationTrace,
      });
      lastCompilation = Object.freeze({ ...compilationTrace });
      return delta;
    },
    manifest(cmd) {
      if (!program.hasActive(cmd, "isa", "AuthoringMove")) return null;
      if (!compiledAuthoringMoves) return null;
      return compileAuthoringMovePlan(program, cmd).manifest;
    },
    get lastCompilation() {
      return lastCompilation;
    },
  });
}

function commandOutcome(prog, log, cmd, args, provenance = null, options = {}) {
  const profile = (phase, operation) => typeof options?.profile === "function"
    ? options.profile(phase, operation)
    : operation();
  const program = profile("normalizeProgram", () => FactStore.from(prog));
  const witnessLog = profile("normalizeWitness", () => (
    log instanceof FactStore ? log : FactStore.from(log)
  ));
  const compilationTrace = {};
  const delta = profile("plan", () => plannedCommandDelta(
    program,
    witnessLog,
    cmd,
    args,
    provenance,
    null,
      {
        compilationPolicy: options?.compilationPolicy || null,
        compilationTrace,
        profile,
      },
  ));
  profile("applyDelta", () => {
    for (const fact of delta) applyFactToWitnessLog(witnessLog, log, fact);
  });
  const projection = profile("project", () => witnessLog.dump());
  return { delta, projection, compilation: Object.freeze({ ...compilationTrace }) };
}

export function runCommand(prog, log, cmd, args, provenance = null, options = {}) {
  return commandOutcome(prog, log, cmd, args, provenance, options).delta;
}

export function invokeCommand(prog, log, cmd, args, provenance = null, options = {}) {
  return commandOutcome(prog, log, cmd, args, provenance, options);
}
