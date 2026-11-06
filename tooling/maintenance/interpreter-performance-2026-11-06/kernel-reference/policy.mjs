import { evaluateExpression, graphFromRecords, REDUCTION_VALUES_PROFILE } from "file:///C:/Users/aaron/grand-theory/tooling/maintenance/interpreter-performance-2026-11-06/kernel-reference/index.mjs";
import { compileExpressions } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/compile-expressions.mjs";
import { canonicalJson } from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/codecs/canonical-json.mjs";

// Policy values and decisions belong to the supplied document. This adapter
// supplies own-data inputs to the canonical evaluator; it has no domain defaults.
export function createAuthoredPolicy(document) {
  canonicalJson(document);
  if (document.protocol !== "sourcery/authored-policy.v1") throw new TypeError("Unsupported authored policy protocol.");
  if (document.expressions?.profile !== REDUCTION_VALUES_PROFILE) throw new TypeError("Unsupported authored policy expression profile.");
  const compiled = compileExpressions(document.expressions);
  const graph = graphFromRecords(compiled.records);
  const roots = new Set(compiled.roots);
  const evaluate = (root, inputs = {}) => {
    if (!roots.has(root)) throw new TypeError(`Unknown authored policy expression: ${root}`);
    return evaluateExpression(graph, root, { typedSurfaces: inputs }, { profile: REDUCTION_VALUES_PROFILE });
  };
  const fields = JSON.parse(canonicalJson(document.fields));
  for (const [name, field] of Object.entries(fields)) {
    if (!roots.has(field.check) || evaluate(field.check, { value: field.default }) !== true) {
      throw new TypeError(`Invalid authored policy default: ${name}`);
    }
  }
  return Object.freeze({
    evaluate,
    resolve(name, value) {
      if (!Object.hasOwn(fields, name)) throw new TypeError(`Unknown authored policy field: ${name}`);
      const field = fields[name];
      const selected = value === undefined ? field.default : value;
      if (evaluate(field.check, { value: selected }) !== true) throw new TypeError(`Invalid authored policy ${name}.`);
      return selected;
    },
  });
}
