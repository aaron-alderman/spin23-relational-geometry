import {RuntimeDiagnosticError} from './runtime-diagnostics.mjs';
export function truthy(value) {
  if (value === true || value === false) return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return Boolean(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function serializeProp(name, value, mode) {
  if (mode === "booleanPresence") {
    return truthy(value) ? name : "";
  }
  if (value == null || typeof value === "boolean") {
    throw new RuntimeDiagnosticError([{
      code: "dom-missing-attr-render-mode",
      message: `DOM prop ${name} requires an authored render mode.`,
      predicate: name,
      details: "Boolean or null DOM props must be carried by explicit booleanPresence semantics.",
    }], {
      title: "DOM runtime failed",
      code: "dom-missing-attr-render-mode",
    });
  }
  return `${name}="${escapeAttribute(value)}"`;
}

export function serializeAuthoredDomNode(node, options = {}) {
  const {
    includeHydrationIds = false,
    hydrationAttribute = "data-rel-hid",
  } = options;
  if (!node) return "";
  if (node.text !== undefined) return escapeHtml(node.text);
  if (node.comment !== undefined) return `<!--${String(node.comment)}-->`;

  const attrs = [];
  for (const [key, value] of Object.entries(node.props || {})) {
    const serialized = serializeProp(key, value, node.propModes?.[key] || "");
    if (serialized) attrs.push(serialized);
  }
  if (includeHydrationIds && node.hydrationAddress) {
    attrs.push(`${hydrationAttribute}="${escapeAttribute(node.hydrationAddress)}"`);
  }
  const open = attrs.length ? `<${node.tag} ${attrs.join(" ")}>` : `<${node.tag}>`;
  if (new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]).has(node.tag)) {
    return open;
  }
  // <script>/<style> are raw-text elements: their text content must NOT be HTML-escaped
  // (escaping breaks JS operators like `&&`/`<` and CSS), per the HTML serialization spec.
  if (node.tag === "script" || node.tag === "style") {
    const raw = (node.children || []).map(child => (child && child.text !== undefined ? String(child.text) : "")).join("");
    return `${open}${raw}</${node.tag}>`;
  }
  return `${open}${(node.children || []).map(child => serializeAuthoredDomNode(child, options)).join("")}</${node.tag}>`;
}

