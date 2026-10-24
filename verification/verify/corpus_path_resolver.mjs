import fs from "node:fs";
import path from "node:path";

const basenameIndexByRoot = new Map();

function buildBasenameIndex(root) {
  if (basenameIndexByRoot.has(root)) return basenameIndexByRoot.get(root);
  const index = new Map();
  const corpusRoot = path.join(root, "corpus");
  const stack = fs.existsSync(corpusRoot) ? [corpusRoot] : [];
  while (stack.length) {
    const directory = stack.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (entry.isFile()) {
        const matches = index.get(entry.name) ?? [];
        matches.push(absolute);
        index.set(entry.name, matches);
      }
    }
  }
  basenameIndexByRoot.set(root, index);
  return index;
}

export function resolveCorpusPath(root, file) {
  const direct = path.resolve(root, file);
  if (fs.existsSync(direct)) return direct;
  if (path.basename(file) !== file) return direct;
  const matches = buildBasenameIndex(root).get(file) ?? [];
  if (matches.length > 1) throw new Error(`Ambiguous corpus basename ${file}: ${matches.join(", ")}`);
  return matches[0] ?? direct;
}
