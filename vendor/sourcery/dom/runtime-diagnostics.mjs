function normalizeRuntimeIssue(issue = {}, redactor = null) {
  const source = typeof redactor?.redactDiagnosticDisclosure === "function"
    ? redactor.redactDiagnosticDisclosure(issue)
    : typeof redactor?.redactDiagnostic === "function"
    ? redactor.redactDiagnostic(issue)
    : issue;
  return {
    code: source.code || "runtime-error",
    message: String(source.message || "Unknown runtime error."),
    file: source.file,
    line: source.line,
    subject: source.subject,
    predicate: source.predicate,
    route: source.route,
    method: source.method,
    action: source.action,
    binding: source.binding,
    details: source.details || null,
  };
}

function formatLocation(issue) {
  if (!issue?.file) return "unknown location";
  return issue.line ? `${issue.file}:${issue.line}` : issue.file;
}

function formatContext(issue) {
  const parts = [];
  if (issue.method || issue.route) parts.push(`${issue.method || "?"} ${issue.route || ""}`.trim());
  if (issue.binding) parts.push(`binding ${issue.binding}`);
  if (issue.action) parts.push(`action ${issue.action}`);
  return parts.join(" | ");
}

export function formatRuntimeIssues(issues = [], { title = "Runtime error", redactor = null } = {}) {
  const normalized = issues.map(issue => normalizeRuntimeIssue(issue, redactor));
  const fileCount = new Set(normalized.map(issue => issue.file).filter(Boolean)).size;
  const header = `${title} with ${normalized.length} issue${normalized.length === 1 ? "" : "s"}`
    + (fileCount ? ` across ${fileCount} file${fileCount === 1 ? "" : "s"}.` : ".");
  const body = normalized.map((issue, index) => {
    const lines = [
      `${index + 1}. ${formatLocation(issue)}`,
      `   ${issue.message}`,
    ];
    const context = formatContext(issue);
    if (context) lines.push(`   Context: ${context}`);
    if (issue.details) lines.push(`   Detail: ${issue.details}`);
    return lines.join("\n");
  }).join("\n");
  return body ? `${header}\n${body}` : header;
}

export class RuntimeDiagnosticError extends Error {
  constructor(issues, options = {}) {
    const normalized = (Array.isArray(issues) ? issues : [issues]).map(issue => normalizeRuntimeIssue(issue, options.redactor));
    super(formatRuntimeIssues(normalized, options));
    this.name = "RuntimeDiagnosticError";
    this.issues = normalized;
    this.code = options.code || normalized[0]?.code || "runtime-error";
    this.statusCode = options.statusCode;
    this.title = options.title || "Runtime error";
  }
}

export function isRuntimeDiagnosticError(error) {
  return error instanceof RuntimeDiagnosticError;
}

export function formatRuntimeError(error, options = {}) {
  if (isRuntimeDiagnosticError(error)) {
    if (options.redactor) return formatRuntimeIssues(error.issues || [], { title: error.title || options.title || "Runtime error", redactor: options.redactor });
    return error.message;
  }
  const issues = Array.isArray(error?.issues) && error.issues.length
    ? error.issues.map(issue => normalizeRuntimeIssue(issue, options.redactor))
    : [normalizeRuntimeIssue({
      code: error?.code,
      message: String(error?.message || error),
      ...(options.context || {}),
    }, options.redactor)];
  return formatRuntimeIssues(issues, { title: options.title || "Runtime error", redactor: options.redactor });
}
