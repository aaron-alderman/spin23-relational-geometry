const freeze = value => Object.freeze(value);

const COMPONENT_GROUPS = freeze({
  layout: ["Box", "Stack", "Cluster", "Grid", "SplitPane", "Container", "Divider", "Spacer"],
  typography: ["Text", "Heading", "Label", "Link", "Code", "Prose", "VisuallyHidden"],
  action: ["Button", "IconButton", "ButtonGroup", "MenuButton"],
  input: ["TextField", "TextArea", "SearchField", "NumberField", "DateField", "TimeField", "Checkbox", "RadioGroup", "Select", "Combobox", "Switch"],
  navigation: ["Tabs", "Breadcrumbs", "NavigationList", "Pagination"],
  collection: ["List", "ListItem", "DataTable", "Tree", "DescriptionList", "Timeline", "TimelineItem"],
  disclosure: ["Details", "Accordion", "Popover", "Tooltip"],
  overlay: ["Dialog", "AlertDialog", "Drawer", "Menu"],
  feedback: ["Alert", "Status", "Badge", "Progress", "Spinner", "Skeleton", "Toast", "EmptyState"],
  surface: ["Card", "Panel", "EvidenceCard", "ApprovalPanel"],
  data: ["Metric", "Money", "Visualization", "RelationshipGraph"],
  workflow: ["WorkQueue", "Board", "BoardColumn", "KanbanCard"],
  form: ["Form"],
  application: ["Toolbar", "Header", "Footer", "ApplicationShell", "PageHeader", "Sidebar", "Inspector", "PreviewFrame", "TriPaneWorkspace"],
});

const ACTIONS = new Set(COMPONENT_GROUPS.action);
const INPUTS = new Set(COMPONENT_GROUPS.input);
const COLLECTIONS = new Set([...COMPONENT_GROUPS.collection, ...COMPONENT_GROUPS.navigation, ...COMPONENT_GROUPS.workflow, "RelationshipGraph", "Toolbar", "Menu", "Accordion"]);
const DIALOGS = new Set(["Dialog", "AlertDialog", "Drawer", "Popover"]);
const STATUSES = new Set(COMPONENT_GROUPS.feedback);

function accessibilityFor(key) {
  if (key === "Link") return "link";
  if (key === "Details" || key === "Accordion") return "disclosure";
  if (key === "Tabs") return "tabs";
  if (key === "Menu") return "menu";
  if (key === "Switch") return "switch";
  if (key === "Progress") return "progress";
  if (key === "Tooltip") return "tooltip";
  if (ACTIONS.has(key)) return "action";
  if (INPUTS.has(key)) return "input";
  if (COLLECTIONS.has(key)) return "collection";
  if (DIALOGS.has(key)) return "dialog";
  if (STATUSES.has(key) || key === "Tooltip") return "status";
  return "static";
}

export const uiComponentCatalogue = freeze(Object.entries(COMPONENT_GROUPS).flatMap(([family, keys]) => (
  keys.map(key => freeze({ subject: `component.ui.${key[0].toLowerCase()}${key.slice(1)}`, key, family, modality: "visual", accessibility: accessibilityFor(key) }))
)));

export const uiPatternCatalogue = freeze([
  ["ApplicationShell", "A navigable customer application frame", ["ApplicationShell", "Header", "Container"]],
  ["CommandForm", "A labelled command input with validation and completion feedback", ["TextField", "Button", "Status"]],
  ["EditableCollection", "A filterable collection with item commands and empty state", ["List", "Checkbox", "Toolbar", "EmptyState"]],
  ["FilterBar", "A coherent set of query and filter controls", ["Toolbar", "TextField", "ButtonGroup"]],
  ["ResourceWorkbench", "Administration browse, inspect and authorized edit composition", ["SplitPane", "DataTable", "Inspector"]],
  ["RecordInspector", "Exact record fields, provenance and valid operations", ["Inspector", "DescriptionList", "Toolbar"]],
  ["EvidenceTimeline", "Chronological evidence and receipt history", ["List", "Status"]],
  ["AuthoringWorkbench", "Read-only authoring health, evidence and live preview control plane", ["ApplicationShell", "Tabs", "PreviewFrame", "Inspector"]],
  ["MasterDetail", "A selectable master collection joined to one detail", ["SplitPane", "List", "Panel"]],
  ["SearchableCatalogue", "A searchable grouped catalogue with specimens", ["TextField", "Tabs", "Grid", "Card"]],
  ["WorkflowBoard", "State-grouped work with semantic columns and inspectable items", ["Board", "BoardColumn", "Card", "Badge"]],
  ["DeliveryWorkspace", "A relationship-following navigator, workflow board and selected-record inspector", ["TriPaneWorkspace", "Tree", "Board", "BoardColumn", "KanbanCard", "Inspector"]],
  ["OperationalQueue", "An actionable ordered queue with status, commands and detail", ["WorkQueue", "Badge", "Toolbar", "Inspector"]],
  ["MetricSummary", "A responsive collection of labelled quantitative measures", ["Grid", "Metric", "Badge"]],
  ["EvidenceReview", "Provenance-bearing evidence with chronological and detailed inspection", ["EvidenceCard", "Timeline", "Inspector"]],
  ["ApprovalWorkflow", "Visible approval state joined to its authorized action", ["ApprovalPanel", "Status", "Button"]],
  ["RelationshipWorkbench", "Relationship navigation joined to exact record inspection", ["RelationshipGraph", "Inspector", "Toolbar"]],
  ["TimeEntry", "Locale-aware date and time entry with validation and summary", ["Form", "DateField", "TimeField", "Status"]],
].map(([key, purpose, components]) => freeze({ key, purpose, components: freeze(components) })));

export const uiThemes = freeze({
  light: freeze({
    key: "sourcery-light", mode: "light",
    tokens: freeze({
      "color-canvas": "#f5f7fb", "color-surface": "#ffffff", "color-surface-muted": "#eef2f7",
      "color-text": "#172033", "color-text-muted": "#5b667a", "color-border": "#cbd4e1",
      "color-accent": "#2855d9", "color-accent-strong": "#183ca9", "color-positive": "#157a55",
      "color-warning": "#9a5b00", "color-danger": "#b42318", "focus-ring": "#6f8fff",
    }),
  }),
  dark: freeze({
    key: "sourcery-dark", mode: "dark",
    tokens: freeze({
      "color-canvas": "#0e1420", "color-surface": "#151e2d", "color-surface-muted": "#1d293b",
      "color-text": "#f1f5fb", "color-text-muted": "#a8b5c8", "color-border": "#34435a",
      "color-accent": "#8aa5ff", "color-accent-strong": "#b8c8ff", "color-positive": "#65d6a8",
      "color-warning": "#f2be66", "color-danger": "#ff8b82", "focus-ring": "#b6c5ff",
    }),
  }),
  highContrast: freeze({
    key: "sourcery-high-contrast", mode: "high-contrast",
    tokens: freeze({
      "color-canvas": "Canvas", "color-surface": "Canvas", "color-surface-muted": "Canvas",
      "color-text": "CanvasText", "color-text-muted": "CanvasText", "color-border": "CanvasText",
      "color-accent": "LinkText", "color-accent-strong": "LinkText", "color-positive": "CanvasText",
      "color-warning": "CanvasText", "color-danger": "CanvasText", "focus-ring": "Highlight",
    }),
  }),
});

export const uiMessageBundles = freeze({
  en: freeze({ locale: "en", direction: "ltr", messages: freeze({ loading: "Loading", close: "Close", noResults: "No results", items: freeze({ one: "{count} item", other: "{count} items" }) }) }),
  "en-XA": freeze({ locale: "en-XA", direction: "ltr", fallback: "en", pseudo: true, messages: freeze({}) }),
  ar: freeze({ locale: "ar", direction: "rtl", fallback: "en", messages: freeze({ loading: "جار التحميل", close: "إغلاق", noResults: "لا توجد نتائج", items: freeze({ one: "عنصر واحد", other: "{count} عناصر" }) }) }),
});

export const uiRendererProviders = freeze([
  freeze({ key: "native-browser", subject: "provider.sourcery.nativeBrowser", modality: "visual-browser", status: "ready", capabilities: freeze(["semantic-html", "theme-tokens", "i18n", "a11y-contracts", "relationship-following-projection", "responsive-keyboard-delivery-workspace", "static-web-ejection"]) }),
  freeze({ key: "mcp-tool", subject: "provider.sourcery.mcpTool", modality: "mcp", status: "ready", capabilities: freeze(["semantic-mcp-tools"]) }),
  freeze({ key: "web-components", subject: "provider.sourcery.webComponents", modality: "visual-browser", status: "unavailable", reason: "Provider contract reserved; no lowering implementation is installed." }),
  freeze({ key: "react", subject: "provider.sourcery.react", modality: "visual-browser", status: "unavailable", reason: "React lowering and hydration are deliberately not installed in the dependency-free default." }),
  freeze({ key: "terminal", subject: "provider.sourcery.terminal", modality: "terminal", status: "unavailable", reason: "Terminal presentation provider is not installed." }),
  freeze({ key: "voice", subject: "provider.sourcery.voice", modality: "voice", status: "unavailable", reason: "Voice presentation provider is not installed." }),
  freeze({ key: "spatial", subject: "provider.sourcery.spatial", modality: "spatial", status: "unavailable", reason: "Spatial presentation provider is not installed." }),
]);

function requireCatalogueEntry(key) {
  const entry = uiComponentCatalogue.find(candidate => candidate.key === key);
  if (!entry) throw new Error(`Unknown Sourcery UI component: ${key}`);
  return entry;
}

export function selectUiRendererProvider({ key = "native-browser", modality = null, requireReady = true } = {}) {
  const provider = uiRendererProviders.find(candidate => candidate.key === key && (!modality || candidate.modality === modality));
  if (!provider) return freeze({ status: "unavailable", key, modality, reason: "No provider declares the requested key and modality." });
  if (requireReady && provider.status !== "ready") return freeze({ ...provider, available: false });
  return freeze({ ...provider, available: provider.status === "ready" });
}

function interpolate(template, args) {
  return String(template).replaceAll(/\{([A-Za-z0-9_]+)\}/gu, (_, key) => String(args[key] ?? `{${key}}`));
}

function pseudo(value) {
  const expansion = { a: "à", e: "ë", i: "ï", o: "ô", u: "ü", A: "Å", E: "Ë", I: "Ï", O: "Ø", U: "Û" };
  return `［${[...String(value)].map(char => expansion[char] || char).join("")}］`;
}

export function resolveUiMessage(key, { locale = "en", count = null, args = {} } = {}) {
  const requested = uiMessageBundles[locale] || uiMessageBundles.en;
  const fallback = uiMessageBundles[requested.fallback] || uiMessageBundles.en;
  const value = requested.messages[key] ?? fallback.messages[key];
  if (value == null) throw new Error(`Unknown Sourcery UI message: ${key}`);
  const selected = typeof value === "object"
    ? value[new Intl.PluralRules(requested.locale).select(Number(count ?? 0))] || value.other
    : value;
  const rendered = interpolate(selected, { ...args, count });
  return requested.pseudo ? pseudo(rendered) : rendered;
}

export function uiAttributes(component, { part = "root", variant = "default", state = [], surface = "application" } = {}) {
  requireCatalogueEntry(component);
  const states = Array.isArray(state) ? state : [state];
  return freeze({
    "data-sui-component": component,
    "data-sui-part": part,
    "data-sui-variant": variant,
    "data-sui-state": states.filter(Boolean).join(" "),
    "data-sui-surface": surface,
  });
}

export function applyUiAttributes(element, component, options) {
  for (const [name, value] of Object.entries(uiAttributes(component, options))) {
    if (value) element.setAttribute(name, value);
  }
  return element;
}

export function createUiElement(document, tag, component, { text = null, attributes = {}, ...options } = {}) {
  const element = document.createElement(tag);
  applyUiAttributes(element, component, options);
  for (const [name, value] of Object.entries(attributes)) {
    if (value === false || value == null) continue;
    if (value === true) element.setAttribute(name, "");
    else element.setAttribute(name, String(value));
  }
  if (text != null) element.textContent = String(text);
  return element;
}

export function uiAttributeString(component, options) {
  const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  return Object.entries(uiAttributes(component, options)).filter(([, value]) => value).map(([name, value]) => `${name}="${escape(value)}"`).join(" ");
}

function themeVariables(theme) {
  return Object.entries(theme.tokens).map(([key, value]) => `--sui-${key}:${value};`).join("");
}

export function defaultComponentLibraryCss({ theme = "light" } = {}) {
  const selected = uiThemes[theme] || uiThemes.light;
  const light = themeVariables(uiThemes.light);
  const dark = themeVariables(uiThemes.dark);
  const contrast = themeVariables(uiThemes.highContrast);
  return `
:root,[data-sui-theme="${selected.key}"]{${themeVariables(selected)}--sui-space-1:.25rem;--sui-space-2:.5rem;--sui-space-3:.75rem;--sui-space-4:1rem;--sui-space-6:1.5rem;--sui-space-8:2rem;--sui-radius-small:.375rem;--sui-radius-medium:.75rem;--sui-radius-large:1.25rem;--sui-font-body:Inter,ui-sans-serif,system-ui,sans-serif;--sui-font-mono:ui-monospace,SFMono-Regular,Consolas,monospace;--sui-shadow-raised:0 14px 40px rgba(23,32,51,.12);--sui-motion-fast:120ms;color-scheme:${selected.mode === "dark" ? "dark" : "light"}}
[data-sui-theme="sourcery-light"]{${light}color-scheme:light}
[data-sui-theme="sourcery-dark"]{${dark}color-scheme:dark}
[data-sui-theme="sourcery-high-contrast"]{${contrast}color-scheme:light}
@media(prefers-color-scheme:dark){:root:not([data-sui-theme]){${dark}color-scheme:dark}}
@media(forced-colors:active){:root{${contrast}}}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--sui-color-canvas);color:var(--sui-color-text);font:14px/1.5 var(--sui-font-body);text-rendering:optimizeLegibility}
[data-sui-density="compact"]{--sui-expression-gap:var(--sui-space-3);--sui-expression-pad:var(--sui-space-4)}
[data-sui-density="comfortable"]{--sui-expression-gap:var(--sui-space-4);--sui-expression-pad:var(--sui-space-6)}
[data-sui-density="spacious"]{--sui-expression-gap:var(--sui-space-6);--sui-expression-pad:var(--sui-space-8)}
[data-sui-character="technical"]{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1,"ss01" 1}
[data-sui-layout-role="workspace"]{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--sui-expression-gap,var(--sui-space-4));margin-block:var(--sui-space-4);margin-inline:auto;padding:var(--sui-expression-pad,var(--sui-space-4));background:var(--sui-color-canvas);color:var(--sui-color-text);overflow-wrap:anywhere;word-break:break-word}
[data-sourcery-product-surface][hidden]{display:none!important}
[data-sui-layout-role="workspace"]>*{min-width:0;max-width:100%}
[data-sui-measure="narrow"]{width:min(calc(100% - 2rem),52rem)}
[data-sui-measure="content"]{width:min(calc(100% - 2rem),72rem)}
[data-sui-measure="wide"]{width:min(calc(100% - 2rem),96rem)}
[data-sui-measure="full"]{width:calc(100% - 2rem)}
[data-sui-geometry="flat"]{border-color:transparent;box-shadow:none}
[data-sui-geometry="panel"]{border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface)}
[data-sui-geometry="band"]{border-block:1px solid var(--sui-color-border);border-radius:0;background:var(--sui-color-surface-muted)}
[data-sui-geometry="inset"]{border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface-muted);box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
[data-sui-geometry="pill"]{border:1px solid var(--sui-color-border);border-radius:999px;background:var(--sui-color-surface-muted)}
[data-sui-color-role="canvas"]{background:var(--sui-color-canvas);color:var(--sui-color-text)}
[data-sui-color-role="surface"]{background:var(--sui-color-surface);color:var(--sui-color-text)}
[data-sui-color-role="surface-muted"]{background:var(--sui-color-surface-muted);color:var(--sui-color-text)}
[data-sui-color-role="accent"]{border-inline-start:3px solid var(--sui-color-accent);color:var(--sui-color-text)}
[data-sui-color-role="warning"]{border-inline-start:3px solid var(--sui-color-warning);color:var(--sui-color-text)}
[data-sui-color-role="danger"]{border-inline-start:3px solid var(--sui-color-danger);color:var(--sui-color-text)}
[data-sui-color-role="neutral"]{color:var(--sui-color-text-muted)}
[data-sui-typography-role="display"]{font-size:clamp(1.75rem,4vw,3.25rem);font-weight:760;line-height:1.02;letter-spacing:-.035em}
[data-sui-typography-role="heading"]{font-size:clamp(1rem,2vw,1.35rem);font-weight:720;line-height:1.18;letter-spacing:-.015em}
[data-sui-typography-role="body"]{font-size:.95rem;line-height:1.6}
[data-sui-typography-role="label"]{font-size:.72rem;font-weight:750;line-height:1.3;letter-spacing:.08em;text-transform:uppercase}
[data-sui-typography-role="mono"]{font-family:var(--sui-font-mono);font-size:.82rem;overflow-wrap:anywhere;word-break:break-word}
[data-sui-typography-role="numeric"]{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
[data-sui-typography-role="title"]{font-size:clamp(1.35rem,2.4vw,2.15rem);font-weight:760;line-height:1.04;letter-spacing:-.03em}
[data-sui-typography-role="metric"]{font-size:clamp(1.8rem,3.8vw,3.25rem);font-weight:760;line-height:1;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
[data-sui-typography-role="delta"]{font-size:clamp(1rem,1.8vw,1.35rem);font-weight:720;line-height:1.15;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
[data-sui-typography-role="caption"]{font-size:.78rem;line-height:1.35;color:var(--sui-color-text-muted)}
[data-sui-layout-role="hero"]{padding:clamp(1.25rem,3vw,2.5rem);border-block-start:3px solid var(--sui-color-accent);background:var(--sui-color-surface)}
[data-sui-layout-role="supporting"]{padding:var(--sui-space-3) var(--sui-space-4);color:var(--sui-color-text-muted)}
[data-sui-layout-role="flow"]{min-block-size:9rem;padding:var(--sui-space-6);display:grid;align-content:center;gap:var(--sui-space-3)}
[data-sui-layout-role="primary-analysis"]{padding:var(--sui-space-6);display:grid;gap:var(--sui-space-4)}
[data-sui-layout-role="data-grid"]{overflow-x:auto;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small)}
[data-sui-layout-role="callout"]{padding:var(--sui-space-4);font-weight:600}
[data-sui-layout-role="disclosure"]{padding:var(--sui-space-4);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface)}
[data-sui-layout-role="disclosure"]>summary{cursor:pointer;font-weight:700;color:var(--sui-color-accent-strong)}
[data-sui-layout-role="action"]{display:inline-flex;width:max-content;align-items:center;min-height:2.5rem;padding:.55rem .85rem;border:1px solid var(--sui-color-accent);border-radius:var(--sui-radius-small);color:var(--sui-color-accent-strong);font-weight:700;text-decoration:none}
[data-sui-layout-role="boundary"]{padding:var(--sui-space-4);border-inline:0;border-block-start:2px solid var(--sui-color-warning);background:var(--sui-color-surface-muted);color:var(--sui-color-text-muted)}
[data-sui-layout-role="masthead"]{display:flex;align-items:center;justify-content:space-between;gap:var(--sui-space-4);padding:var(--sui-space-3) var(--sui-space-4)}
[data-sui-layout-role="status"]{display:inline-flex;align-items:center;justify-content:center;width:max-content;max-width:100%;min-height:2rem;padding:.25rem .85rem;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);font-weight:700;overflow-wrap:anywhere}
[data-sui-layout-role="process-flow"]{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(8rem,1fr);align-items:stretch;gap:var(--sui-space-3);padding:var(--sui-space-4)}
[data-sui-layout-role="process-stage"]{position:relative;display:grid;place-items:center;min-height:6rem;padding:var(--sui-space-3);text-align:center}
[data-sui-layout-role="process-stage"]:not(:last-child)::after{content:"→";position:absolute;inset-inline-end:calc(-1 * var(--sui-space-4));color:var(--sui-color-text-muted);font-size:1.5rem}
[data-sui-layout-role="comparison-grid"]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--sui-space-3)}
[data-sui-layout-role="comparison-grid"]>:not([data-sui-layout-role="comparison-card"]){grid-column:1/-1}
[data-sui-layout-role="comparison-card"]{display:grid;align-content:start;gap:var(--sui-space-3);min-height:12rem;padding:var(--sui-space-4);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface)}
[data-sui-layout-role="metric"]{display:grid;gap:var(--sui-space-1);text-align:center}
[data-sui-layout-role="switch-band"]{display:flex;align-items:center;justify-content:center;gap:var(--sui-space-6);padding:var(--sui-space-3) var(--sui-space-4);border-block:1px solid var(--sui-color-border)}
[data-sui-layout-role="evidence-band"]{display:grid;grid-template-columns:minmax(12rem,.7fr) minmax(0,1.3fr);gap:var(--sui-space-4);padding:var(--sui-space-4)}
[data-sui-layout-role="action-group"]{display:flex;align-items:stretch;justify-content:flex-end;flex-wrap:wrap;gap:var(--sui-space-2)}
[data-sui-layout-role="action-group"]>*{min-width:0;max-width:100%}
details>summary{overflow-wrap:anywhere;word-break:break-word}
[data-sui-layout-role="explanation-band"]{display:grid;grid-template-columns:minmax(10rem,.3fr) minmax(0,1fr);gap:var(--sui-space-4);padding:var(--sui-space-3) var(--sui-space-4)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"]{grid-template-columns:repeat(3,minmax(0,1fr));width:min(100%,98rem);min-height:100vh;margin:0 auto;padding:clamp(.7rem,1.4vw,1.25rem);gap:clamp(.5rem,1vw,.85rem);background:radial-gradient(circle at 78% 12%,rgba(137,92,45,.08),transparent 28%),linear-gradient(180deg,var(--sui-color-canvas),color-mix(in srgb,var(--sui-color-canvas) 88%,#000));border:1px solid color-mix(in srgb,var(--sui-color-border) 75%,transparent)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"]>*{grid-column:1/-1}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-live-workbench],[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-multi-lens-graph],[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-growth]{grid-column:auto;padding:var(--sui-space-3);min-height:0;box-shadow:none}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] details[open]{grid-column:1/-1}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]{min-height:4.5rem;padding:.65rem 1rem;border-color:color-mix(in srgb,var(--sui-color-border) 78%,transparent);background:color-mix(in srgb,var(--sui-color-surface) 86%,transparent)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]{display:grid;grid-template-columns:minmax(22rem,1fr) auto minmax(12rem,1fr);align-items:center}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]>:last-child{justify-self:end}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"] h2,[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"] p{margin:.15rem 0}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"] h2{font-size:clamp(1.25rem,2vw,1.9rem);white-space:nowrap}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]>[data-sui-layout-role="status"]{width:max-content;max-width:none;white-space:nowrap;font-size:.68rem;line-height:1.25;text-align:center}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="supporting"]{margin:0;padding:.25rem 1rem;border-inline-start:2px solid var(--sui-color-accent);font-size:.84rem}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-graph]{padding:.45rem .9rem .55rem;border-block:1px solid var(--sui-color-border);background:transparent}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-graph]>h3{margin:.1rem 0;text-transform:uppercase;letter-spacing:.08em;font-size:.7rem;color:var(--sui-color-text-muted)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="process-flow"]{padding:.35rem 1rem;gap:1.35rem}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="process-stage"]{min-height:4.4rem;border-block:1px solid color-mix(in srgb,var(--sui-color-border) 75%,transparent);letter-spacing:.035em}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage]{grid-template-rows:2.8rem auto;gap:.15rem;color:#8b99ad}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage]::before{content:"";display:block;width:4.4rem;height:2.8rem;background:currentColor;mask-position:center;mask-repeat:no-repeat;mask-size:contain}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage="mine"]::before{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 48'%3E%3Cpath fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M4 42h72M9 39l17-28 11 17 9-10 25 21M22 39l8-13 9 13M49 39l9-10 9 10'/%3E%3C/svg%3E")}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage="crusher"]::before{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 48'%3E%3Cpath fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M14 7h52L56 27H24L14 7Zm13 20v9h26v-9M20 41h40M31 13l8 8 9-8M9 12h7m48 0h7'/%3E%3C/svg%3E")}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage="mill"]::before{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 48'%3E%3Cg fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cellipse cx='24' cy='24' rx='10' ry='17'/%3E%3Cpath d='M24 7h29c7 0 13 8 13 17s-6 17-13 17H24m29-34c-7 0-13 8-13 17s6 17 13 17M8 41h64'/%3E%3C/g%3E%3C/svg%3E")}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage="port"]::before{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 48'%3E%3Cpath fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M8 39h64M15 34h48l-8 8H25l-10-8Zm9-4V9h28v21M24 14h28M42 9v21m10-16 15 8v8M8 44c5-3 10-3 15 0 5-3 10-3 15 0 5-3 10-3 15 0 5-3 10-3 15 0'/%3E%3C/svg%3E")}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-stage="mill"]{color:var(--sui-color-warning)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="process-stage"][data-sui-color-role="warning"]{border:1px solid var(--sui-color-warning);border-inline-start-width:3px}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-graph]>[data-sui-layout-role="callout"]{margin:.25rem 0 0;padding:.3rem .65rem;font-size:.72rem;line-height:1.3;max-height:2.8em;overflow:hidden}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-scenario-comparison]{padding:0;gap:.55rem;background:transparent}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-scenario-comparison]>h3,[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-scenario-comparison]>[data-sourcery-comparison-basis]{margin:.1rem 0}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="comparison-card"]{min-height:10.2rem;padding:.75rem 1rem;border-radius:.2rem;box-shadow:none}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="comparison-card"]>*{margin:.15rem 0}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="comparison-card"] [data-sui-typography-role="metric"]{font-size:clamp(1.8rem,3.2vw,2.8rem);white-space:nowrap}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="switch-band"]{margin:0;min-height:2.7rem;padding:.4rem .75rem;font-size:.78rem;line-height:1.3}
[data-sui-layout-role="geographic-cockpit"]{display:grid;grid-template-columns:minmax(0,1fr) minmax(16rem,21rem);gap:.65rem;padding:.65rem;border:1px solid #39485b;background:linear-gradient(180deg,#131c28,#0b121b);box-shadow:inset 0 0 0 1px rgba(226,154,58,.06),0 18px 45px rgba(0,0,0,.22)}
[data-sui-layout-role="geographic-cockpit"]>[data-sui-layout-role="cockpit-header"],[data-sui-layout-role="geographic-cockpit"]>[data-sui-layout-role="layer-controls"]{grid-column:1/-1}
[data-sui-layout-role="cockpit-header"]{display:flex;align-items:end;justify-content:space-between;gap:1rem;padding:.2rem .35rem .45rem;border-block-end:1px solid #344357}
[data-sui-layout-role="cockpit-header"]>*{margin:0}[data-sui-layout-role="cockpit-header"] h3{letter-spacing:.045em;text-transform:uppercase}[data-sui-layout-role="cockpit-header"] p{color:#90a0b5;font:600 .68rem/1.4 var(--sui-font-mono)}
[data-sui-layout-role="layer-controls"]{display:flex;flex-wrap:wrap;gap:.35rem;padding:.1rem .25rem .35rem}
[data-sui-layout-role="layer-controls"] [data-sui-component="Button"]{min-height:1.9rem;padding:.26rem .58rem;border-color:#40516a;background:#111a26;color:#aab8ca;font-size:.68rem;text-transform:uppercase;letter-spacing:.045em}
[data-sui-layout-role="layer-controls"] [aria-pressed="true"]{border-color:#d99132;background:#3c2a16;color:#ffd48e;box-shadow:0 0 0 1px rgba(217,145,50,.18)}
[data-sui-layout-role="map-board"]{position:relative;min-height:34rem;overflow:hidden;border:1px solid #32445a;background:radial-gradient(circle at 68% 32%,rgba(36,116,135,.2),transparent 18%),repeating-linear-gradient(0deg,transparent 0 39px,rgba(87,126,147,.09) 40px),repeating-linear-gradient(90deg,transparent 0 39px,rgba(87,126,147,.09) 40px),linear-gradient(145deg,#0b2834,#08202b 58%,#091822);isolation:isolate}
[data-sourcery-map-ocean]{position:absolute;inset:auto 2% 2% auto;color:rgba(125,189,201,.38);font:600 .64rem/1 var(--sui-font-mono);letter-spacing:.14em;text-transform:uppercase}
[data-sourcery-map-landmass]{position:absolute;display:grid;place-items:center;border:1px solid rgba(189,137,72,.42);background:radial-gradient(circle at 35% 35%,rgba(204,139,60,.28),transparent 14%),repeating-linear-gradient(35deg,rgba(65,76,48,.42) 0 4px,rgba(43,59,44,.46) 4px 9px),#28392f;color:rgba(245,201,132,.5);font:800 .62rem/1 var(--sui-font-mono);letter-spacing:.16em;text-shadow:0 1px #000;filter:drop-shadow(0 6px 12px rgba(0,0,0,.35));z-index:-1}
[data-sourcery-map-landmass="australia"]{inset:30% 35% 4% 4%;clip-path:polygon(8% 26%,24% 10%,48% 5%,70% 13%,91% 30%,98% 57%,83% 77%,61% 82%,50% 98%,32% 86%,17% 68%,3% 48%)}
[data-sourcery-map-landmass="south-east-asia"]{inset:3% 4% 37% 58%;clip-path:polygon(8% 7%,80% 2%,98% 18%,79% 34%,89% 52%,61% 61%,73% 82%,48% 97%,28% 72%,3% 57%,20% 36%)}
[data-sourcery-cockpit-unit]{position:absolute;z-index:4;display:grid;gap:.08rem;min-width:6.2rem;max-width:8.5rem;min-height:2.7rem;padding:.28rem .38rem;border:1px solid #738196;border-inline-start:3px solid #d99132;border-radius:.18rem;background:linear-gradient(180deg,rgba(25,35,47,.96),rgba(10,17,25,.98));color:#e7edf6;text-align:start;box-shadow:0 4px 11px rgba(0,0,0,.36);transform:translate(-50%,-50%)}
[data-sourcery-cockpit-unit]>strong{font-size:.68rem;letter-spacing:.025em}[data-sourcery-cockpit-unit]>span{color:#9eacbd;font:500 .58rem/1.3 var(--sui-font-mono)}
[data-sourcery-cockpit-unit][aria-pressed="true"]{z-index:6;border-color:#ffd48e;border-inline-start-color:#ffb343;background:#3b2918;color:#fff3d8;box-shadow:0 0 0 2px rgba(255,179,67,.18),0 8px 20px rgba(0,0,0,.45)}
[data-sourcery-cockpit-unit="mine"]{left:17%;top:42%}[data-sourcery-cockpit-unit="crusher"]{left:29%;top:46%}[data-sourcery-cockpit-unit="mill"]{left:42%;top:51%}[data-sourcery-cockpit-unit="solar"]{left:27%;top:67%}[data-sourcery-cockpit-unit="grid"]{left:39%;top:72%}[data-sourcery-cockpit-unit="boltMonitoring"]{left:47%;top:68%}[data-sourcery-cockpit-unit="maintenance"]{left:55%;top:61%}[data-sourcery-cockpit-unit="logistics"]{left:57%;top:48%}[data-sourcery-cockpit-unit="port"]{left:69%;top:43%}[data-sourcery-cockpit-unit="export"]{left:87%;top:27%}[data-sourcery-cockpit-unit="capitalHub"]{left:72%;top:70%}[data-sourcery-cockpit-unit="university"]{left:62%;top:78%}
[data-sourcery-cockpit-region]{position:absolute;z-index:2;padding:.2rem .42rem;border:1px dashed #74879c;border-radius:99px;background:rgba(8,22,30,.78);color:#c3cedb;font-size:.56rem;letter-spacing:.025em;transform:translate(-50%,-50%)}
[data-sourcery-cockpit-region][data-sourcery-cockpit-region-state="active-model"]{border-style:solid;border-color:#70c6a1;color:#c7f7dd}[data-sourcery-cockpit-region][aria-pressed="true"]{outline:2px solid rgba(255,179,67,.38);outline-offset:2px;color:#ffd48e}
[data-sourcery-cockpit-region="pilbara"]{left:35%;top:55%}[data-sourcery-cockpit-region="eastern-australia"]{left:50%;top:88%}[data-sourcery-cockpit-region="singapore"]{left:72%;top:35%}[data-sourcery-cockpit-region="malaysia"]{left:67%;top:22%}[data-sourcery-cockpit-region="indonesia"]{left:78%;top:54%}[data-sourcery-cockpit-region="southern-china"]{left:84%;top:9%}
[data-sourcery-cockpit-flow]{position:absolute;z-index:1;display:block;height:2px;width:10%;background:#cf8740;box-shadow:0 0 5px currentColor;color:#cf8740;font-size:0;transform-origin:left center;opacity:.9}
[data-sourcery-cockpit-flow][hidden]{display:none}
[data-sourcery-cockpit-flow]::after{content:"";position:absolute;inset:-3px -1px auto auto;width:0;height:0;border-block:4px solid transparent;border-inline-start:7px solid currentColor}
[data-sourcery-cockpit-flow="energy"],[data-sourcery-cockpit-flow="infrastructure-dependency"]{background:#4ec5d4;color:#4ec5d4}[data-sourcery-cockpit-flow="capital"]{background:#b99adf;color:#b99adf}[data-sourcery-cockpit-flow="knowledge"]{background:#75bd85;color:#75bd85}[data-sourcery-cockpit-flow="information-control"]{background:#72aee6;color:#72aee6}[data-sourcery-cockpit-flow="transport-logistics"]{background:#e7a550;color:#e7a550}[data-sourcery-cockpit-flow="capacity-dependency"],[data-sourcery-cockpit-flow="infrastructure-dependency"]{height:1px;background:transparent;border-block-start:1px dashed currentColor;box-shadow:none}[data-sourcery-cockpit-flow="co-product-allocation"]{background:#9a805c;color:#9a805c;opacity:.55}
[data-sourcery-cockpit-flow-key="matter-feed"]{left:19%;top:44%;width:10%;transform:rotate(8deg)}[data-sourcery-cockpit-flow-key="capacity-feed"]{left:31%;top:48%;width:11%;transform:rotate(10deg)}[data-sourcery-cockpit-flow-key="matter-product"]{left:44%;top:50%;width:13%;transform:rotate(-5deg)}[data-sourcery-cockpit-flow-key="transport-port"]{left:59%;top:47%;width:10%;transform:rotate(-12deg)}[data-sourcery-cockpit-flow-key="matter-export"]{left:71%;top:41%;width:19%;transform:rotate(-31deg)}[data-sourcery-cockpit-flow-key="energy-electricity"]{left:29%;top:64%;width:16%;transform:rotate(-34deg)}[data-sourcery-cockpit-flow-key="infrastructure-power"]{left:40%;top:69%;width:15%;transform:rotate(-57deg)}[data-sourcery-cockpit-flow-key="information-maintenance"]{left:48%;top:66%;width:8%;transform:rotate(-18deg)}[data-sourcery-cockpit-flow-key="capital-expansion"]{left:69%;top:68%;width:26%;transform:rotate(160deg)}[data-sourcery-cockpit-flow-key="knowledge-process"]{left:62%;top:75%;width:24%;transform:rotate(148deg)}[data-sourcery-cockpit-flow-key="allocation-coproduct"]{left:43%;top:54%;width:9%;transform:rotate(38deg)}[data-sourcery-cockpit-flow-key="allocation-loss"]{left:43%;top:55%;width:8%;transform:rotate(58deg)}
[data-sui-layout-role="unit-inspector"]{display:grid;align-content:start;gap:.55rem;padding:.85rem;border:1px solid #3c4d63;background:linear-gradient(180deg,#151f2d,#0d151f);box-shadow:inset 3px 0 #d99132}
[data-sui-layout-role="unit-inspector"]>*{margin:0}[data-sui-layout-role="unit-inspector"] h4{padding-block-end:.45rem;border-block-end:1px solid #344357;color:#92a2b5;font-size:.67rem;letter-spacing:.08em;text-transform:uppercase}[data-sui-layout-role="unit-inspector"]>strong{color:#ffd08b;font-size:1.05rem}[data-sourcery-cockpit-inspector-field]{padding:.42rem .5rem;border:1px solid #2d3b4d;background:#0b121b;color:#b8c4d4;font-size:.7rem;line-height:1.45}[data-sourcery-cockpit-inspector-field="recipe"]{color:#e3e9f1}[data-sourcery-cockpit-inspector-field="relocation"]{border-color:#6a5434;color:#e9c386}[data-sourcery-cockpit-preview-authority]{padding:.5rem;border-block-start:2px solid #a76b2c;color:#9eacbd;font-size:.66rem;line-height:1.4}
[data-sui-layout-role="demo-joyride"]{position:sticky;inset-block-end:.65rem;z-index:12;display:grid;gap:.55rem;margin:.65rem;border:1px solid #6b532f;border-radius:.2rem;background:linear-gradient(135deg,rgba(17,25,36,.98),rgba(9,15,23,.98));box-shadow:0 18px 48px rgba(0,0,0,.52),inset 3px 0 #d99132;color:#e8edf4}
[data-sui-layout-role="demo-joyride"]>[data-sourcery-demo-joyride-action="start"]{justify-self:start;border-color:#a66d2d;background:#b76f24;color:#111923;text-transform:uppercase;letter-spacing:.055em}
[data-sourcery-demo-joyride-panel]{display:grid;grid-template-columns:minmax(12rem,.42fr) minmax(18rem,1fr);gap:.55rem .85rem;padding:.75rem;border-block-start:1px solid #38485c}
[data-sourcery-demo-joyride-panel][hidden]{display:none}
[data-sui-layout-role="joyride-header"]{grid-column:1/-1;display:flex;justify-content:space-between;gap:1rem;color:#d9a45b;font:700 .66rem/1.4 var(--sui-font-mono);letter-spacing:.08em}
[data-sourcery-demo-joyride-field="title"]{grid-column:1/-1;margin:0;color:#f6c77e;font-size:1.05rem;letter-spacing:.02em}
[data-sourcery-demo-joyride-field="instruction"]{grid-column:1/-1;margin:0;color:#e7edf5;font-weight:650}
[data-sourcery-demo-joyride-field="expected"],[data-sourcery-demo-joyride-field="evidence"]{margin:0;padding:.5rem .6rem;border:1px solid #344357;background:#0b121b;color:#aebbc9;font-size:.7rem;line-height:1.45}
[data-sourcery-demo-joyride-field="expected"]::before{content:"EXPECTED  ";color:#75c9a5;font-weight:800;letter-spacing:.05em}[data-sourcery-demo-joyride-field="evidence"]::before{content:"EVIDENCE  ";color:#80acd8;font-weight:800;letter-spacing:.05em}
[data-sourcery-demo-joyride-steps]{grid-column:1/-1;display:grid;grid-template-columns:repeat(7,minmax(2.25rem,1fr));gap:.3rem}
[data-sourcery-demo-joyride-step]{min-height:2.2rem;border:1px solid #3a4a5e;background:#101925;color:#8f9fb1;font:800 .7rem/1 var(--sui-font-mono);cursor:pointer}
[data-sourcery-demo-joyride-step][data-sourcery-demo-joyride-step-state="complete"]{border-color:#426b5b;color:#75c9a5}[data-sourcery-demo-joyride-step][aria-current="step"]{border-color:#d99132;background:#302518;color:#ffd08b;box-shadow:inset 0 -2px #d99132}
[data-sui-layout-role="joyride-controls"]{grid-column:1/-1;display:flex;gap:.4rem;justify-content:flex-end}[data-sui-layout-role="joyride-controls"] [data-sui-component="Button"]{min-height:2rem;padding:.35rem .65rem;background:#111b28;color:#dce5ef}
[data-sourcery-demo-joyride-world-effect]{grid-column:1/-1;margin:0;padding-block-start:.45rem;border-block-start:1px solid #344357;color:#8d9aab;font-size:.64rem;letter-spacing:.025em}
[data-sui-layout-role="model-authoring"],[data-sui-layout-role="energy-reproduction"],[data-sui-layout-role="placement-optimization"]{display:grid;gap:.7rem;padding:.85rem;border:1px solid #39485b;background:linear-gradient(145deg,#111a26,#0a1119);box-shadow:inset 3px 0 #d99132,0 16px 38px rgba(0,0,0,.2);color:#dfe7ef}
[data-sui-layout-role="model-authoring"]>h3,[data-sui-layout-role="energy-reproduction"]>h3,[data-sui-layout-role="placement-optimization"]>h3{margin:0;color:#f1bd6c;letter-spacing:.025em}
[data-sui-layout-role="model-authoring"]>p,[data-sui-layout-role="energy-reproduction"]>p,[data-sui-layout-role="placement-optimization"]>p{margin:0;color:#9ba9b9;font-size:.72rem;line-height:1.5}
[data-sui-layout-role="model-edit-controls"]{display:grid;grid-template-columns:repeat(5,minmax(8rem,1fr));gap:.42rem;overflow-x:auto}
[data-sourcery-model-edit]{min-height:3.6rem;border:1px solid #405166;background:#121e2b;color:#c9d4df;padding:.55rem;text-align:left;font:700 .68rem/1.35 var(--sui-font-sans);cursor:pointer}
[data-sourcery-model-edit][aria-pressed="true"]{border-color:#d99132;background:#352718;color:#ffd291;box-shadow:inset 0 -2px #d99132}
[data-sui-layout-role="propagation-receipt"]{padding:.7rem;border:1px solid #416353;background:#0d1b18;color:#87d7b3;font:650 .68rem/1.5 var(--sui-font-mono)}
[data-sui-layout-role="industrial-metric-grid"],[data-sui-layout-role="placement-matrix"]{display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.45rem}
[data-sourcery-energy-reproduction-node],[data-sourcery-placement-region]{padding:.62rem;border:1px solid #314154;background:#0d1621}
[data-sourcery-energy-reproduction-node]>h4,[data-sourcery-placement-region]>h4{margin:0 0 .3rem;color:#dce5ee;font-size:.76rem}
[data-sourcery-energy-reproduction-node]>p,[data-sourcery-placement-region]>p{margin:0;color:#8fa0b2;font:600 .62rem/1.45 var(--sui-font-mono)}
[data-sourcery-energy-reproduction-outputs]{padding:.72rem!important;border:1px solid #5a4a2f;background:#1d1912;color:#f1c274!important;font-family:var(--sui-font-mono)}
[data-sourcery-process-placements],[data-sourcery-relocation-thresholds]{display:grid;gap:.3rem;margin:0;padding:0;list-style:none}
[data-sourcery-process-placement],[data-sourcery-relocation-threshold]{padding:.45rem .6rem;border-inline-start:2px solid #54799f;background:#0c151f;color:#aebdcb;font-size:.68rem}
[data-sourcery-relocation-threshold]{border-inline-start-color:#d99132;color:#d8b985}
[data-sourcery-joyride-target][data-sourcery-joyride-highlighted="true"]{outline:3px solid #f0a94b;outline-offset:3px;box-shadow:0 0 0 7px rgba(240,169,75,.16)}
[data-sui-layout-role="plausibility-band"]{display:grid;grid-template-columns:minmax(9rem,.35fr) repeat(3,minmax(0,1fr));gap:.8rem;align-items:center;padding:.45rem .75rem;border-block:1px solid var(--sui-color-border)}
[data-sui-layout-role="plausibility-band"]>h3{margin:0;font-size:.72rem;text-transform:uppercase;letter-spacing:.07em}
[data-sourcery-plausibility-band]{display:grid;grid-template-columns:auto minmax(5rem,1fr);gap:.55rem;align-items:center;font-size:.72rem}
[data-sui-layout-role="plausibility-scale"]{position:relative;display:flex;justify-content:space-between;padding-block-start:.55rem;color:var(--sui-color-text-muted);font-size:.62rem}
[data-sui-layout-role="plausibility-scale"]::before{content:"";position:absolute;inset:.12rem 0 auto;height:2px;background:linear-gradient(90deg,#49586c,var(--sui-color-accent))}
[data-sui-layout-role="plausibility-scale"]::after{content:"";position:absolute;inset-block-start:-.08rem;inset-inline-start:var(--sui-plausibility-position);width:.42rem;height:.42rem;border-radius:50%;background:var(--sui-color-warning);box-shadow:0 0 0 2px #0e1420}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] details>summary{font-size:.875rem;text-transform:uppercase;letter-spacing:.045em}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="evidence-band"]{grid-template-columns:minmax(9rem,.3fr) minmax(20rem,1fr) auto;align-items:center;padding:.6rem .8rem;border-block:1px solid var(--sui-color-border);background:color-mix(in srgb,var(--sui-color-surface-muted) 72%,transparent)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="evidence-band"]>*{margin:0}
[data-sui-layout-role="evidence-sources"]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.45rem;margin:0;padding:0;list-style:none}
[data-sui-layout-role="evidence-sources"]>li{display:grid;gap:.1rem;padding-inline-start:.55rem;border-inline-start:2px solid var(--sui-color-border);font-size:.72rem}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="evidence-band"] [data-sui-layout-role="disclosure"]{padding:.45rem .65rem;background:transparent}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="explanation-band"]{padding:.55rem .8rem;border-block-end:1px solid var(--sui-color-border)}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="explanation-band"]>*{margin:0}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-mvp-validation]{display:grid;grid-template-columns:minmax(10rem,.3fr) repeat(2,minmax(0,1fr));gap:.75rem;padding:.55rem .8rem;box-shadow:none}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-mvp-validation]>*{margin:0;font-size:.7rem;line-height:1.3}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-authority-boundary]{margin:0;padding:.5rem .8rem;font-size:.74rem;text-align:center;text-transform:uppercase;letter-spacing:.035em}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"]~[data-pack-instance]{box-sizing:border-box;width:min(100%,98rem);max-height:4rem;margin:0 auto;overflow:auto;padding:.55rem .85rem;border:1px solid #34435a;border-radius:.25rem;background:#0e1420;color:#f1f5fb;color-scheme:dark}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"]~[data-pack-instance]>:first-child{margin-top:0}
body:has([data-sui-specimen-composition="industrial-decision-cockpit-v1"]) [data-sourcery-workflow],body:has([data-sui-specimen-composition="industrial-decision-cockpit-v1"]) [data-sourcery-planning]{box-sizing:border-box;max-height:3rem;overflow:auto;padding:.35rem .65rem;border:1px solid #34435a;background:#0e1420;color:#f1f5fb;color-scheme:dark}
[data-sui-visibility="visually-hidden"]{position:absolute!important;display:block!important;width:1px!important;max-width:1px!important;height:1px!important;max-height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;clip-path:inset(50%)!important;contain:strict!important;white-space:nowrap!important;border:0!important}
[data-sui-component]{min-width:0}
[data-sui-component="ApplicationShell"]{min-height:100vh;background:var(--sui-color-canvas);color:var(--sui-color-text)}
[data-sui-component="Container"]{width:min(100% - 2rem,72rem);margin-inline:auto}
[data-sui-component="Stack"]{display:flex;flex-direction:column;gap:var(--sui-space-4)}
[data-sui-component="Cluster"],[data-sui-component="Toolbar"],[data-sui-component="ButtonGroup"]{display:flex;align-items:center;flex-wrap:wrap;gap:var(--sui-space-2)}
[data-sui-component="Grid"]{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:var(--sui-space-4)}
[data-sui-component="Grid"]>:where(h1,h2,h3,h4){grid-column:1/-1}
[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-scenario-comparison][data-sui-component="Grid"]{grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem}
[data-sui-component="SplitPane"]{display:grid;grid-template-columns:minmax(14rem,.36fr) minmax(0,1fr);gap:var(--sui-space-4)}
[data-sui-component="TriPaneWorkspace"]{display:grid;grid-template-columns:minmax(12rem,18rem) minmax(24rem,1fr) minmax(16rem,22rem);min-height:calc(100vh - 6rem);gap:var(--sui-space-3);padding:var(--sui-space-3)}
[data-sui-component="TriPaneWorkspace"]>[data-sui-pane]{min-width:0;overflow:auto;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface)}
[data-sui-component="TriPaneWorkspace"]>[data-sui-pane="navigator"],[data-sui-component="TriPaneWorkspace"]>[data-sui-pane="inspector"]{padding:var(--sui-space-3)}
[data-sui-component="TriPaneWorkspace"]>[data-sui-pane="board"]{padding:var(--sui-space-3);background:var(--sui-color-surface-muted)}
[data-sui-pane-tabs]{display:none}
[data-sui-component="Card"],[data-sui-component="Panel"],[data-sui-component="Inspector"]{border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface);box-shadow:0 1px 2px rgba(23,32,51,.04)}
[data-sui-component="Card"],[data-sui-component="Panel"]{padding:var(--sui-space-4)}
[data-sui-component="Heading"]{margin:0;font-weight:720;line-height:1.12;letter-spacing:-.02em}
[data-sui-component="Text"]{max-width:100%;overflow-wrap:anywhere;word-break:break-word}
[data-sui-component="Text"][data-sui-variant="muted"]{color:var(--sui-color-text-muted)}
[data-sui-component="Code"]{max-width:100%;font-family:var(--sui-font-mono);font-size:.9em;overflow-wrap:anywhere;word-break:break-word;white-space:pre-wrap}
[data-sui-component="Divider"]{border:0;border-block-start:1px solid var(--sui-color-border)}
[data-sui-component="Button"],[data-sui-component="IconButton"],[data-sui-component="MenuButton"],button[data-sui-component]{min-height:2.5rem;padding:.55rem .85rem;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface);color:var(--sui-color-text);font:inherit;font-weight:650;cursor:pointer;transition:background var(--sui-motion-fast),border-color var(--sui-motion-fast),transform var(--sui-motion-fast)}
[data-sui-component="Button"]:hover,[data-sui-component="IconButton"]:hover,[data-sui-component="MenuButton"]:hover{border-color:var(--sui-color-accent);background:var(--sui-color-surface-muted)}
[data-sui-component="Button"][data-sui-variant="primary"]{border-color:var(--sui-color-accent);background:var(--sui-color-accent);color:#fff}
[data-sui-component="Button"][data-sui-variant="danger"]{border-color:var(--sui-color-danger);color:var(--sui-color-danger)}
[data-sui-component="Button"]:disabled,[data-sui-component="IconButton"]:disabled{cursor:not-allowed;opacity:.5}
[data-sui-component="TextField"],[data-sui-component="TextArea"],[data-sui-component="Select"],[data-sui-component="Combobox"]{width:100%;min-height:2.6rem;padding:.55rem .75rem;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface);color:var(--sui-color-text);font:inherit}
[data-sui-component="SearchField"],[data-sui-component="NumberField"],[data-sui-component="DateField"],[data-sui-component="TimeField"]{width:100%;min-height:2.6rem;padding:.55rem .75rem;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface);color:var(--sui-color-text);font:inherit}
[data-sui-component="Form"]{display:flex;flex-direction:column;gap:var(--sui-space-3)}
[data-sui-component="Checkbox"],[data-sui-component="Switch"]{inline-size:1.15rem;block-size:1.15rem;accent-color:var(--sui-color-accent)}
[data-sui-component="List"]{margin:0;padding:0;list-style:none}
[data-sui-component="ListItem"]{padding:var(--sui-space-3) var(--sui-space-4);border-block-end:1px solid var(--sui-color-border)}
[data-sui-component="ListItem"]:last-child{border-block-end:0}
[data-sui-component="DataTable"]{width:100%;max-width:100%;table-layout:fixed;border-collapse:collapse;background:var(--sui-color-surface)}
[data-sui-component="DataTable"] th,[data-sui-component="DataTable"] td{padding:.65rem .8rem;border-block-end:1px solid var(--sui-color-border);text-align:start;overflow-wrap:anywhere}
[data-sui-component="DataTable"] th{color:var(--sui-color-text-muted);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}
[data-sui-component="Tabs"]{display:flex;gap:var(--sui-space-1);border-block-end:1px solid var(--sui-color-border)}
[data-sui-component="Tabs"] [role="tab"],[data-sui-component="Tabs"] a{padding:.65rem .8rem;border:0;border-block-end:2px solid transparent;background:transparent;color:var(--sui-color-text-muted);font:inherit;font-weight:650;text-decoration:none}
[data-sui-component="Tabs"] [aria-selected="true"],[data-sui-component="Tabs"] [aria-current="page"]{border-block-end-color:var(--sui-color-accent);color:var(--sui-color-accent)}
[data-sui-component="Alert"],[data-sui-component="Status"],[data-sui-component="EmptyState"]{padding:var(--sui-space-3) var(--sui-space-4);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface-muted)}
[data-sui-component="Badge"]{display:inline-flex;align-items:center;min-height:1.5rem;padding:.1rem .5rem;border:1px solid var(--sui-color-border);border-radius:999px;background:var(--sui-color-surface-muted);color:var(--sui-color-text-muted);font-size:.78rem;font-weight:700;line-height:1.2}
[data-sui-component="Metric"]{display:grid;gap:var(--sui-space-1);font-variant-numeric:tabular-nums}
[data-sui-component="Metric"]:where(span,div){font-weight:700}
[data-sui-component="Money"]{font-variant-numeric:tabular-nums;font-weight:650;white-space:nowrap}
[data-sui-component="Timeline"]{position:relative;margin:0;padding-inline-start:var(--sui-space-6);list-style:none}
[data-sui-component="Timeline"]::before{content:"";position:absolute;inset-block:var(--sui-space-2);inset-inline-start:.55rem;border-inline-start:2px solid var(--sui-color-border)}
[data-sui-component="TimelineItem"]{position:relative;padding:var(--sui-space-2) 0 var(--sui-space-4)}
[data-sui-component="TimelineItem"]::before{content:"";position:absolute;inline-size:.65rem;block-size:.65rem;inset-inline-start:calc(-1 * var(--sui-space-6) + .25rem);inset-block-start:.65rem;border-radius:50%;background:var(--sui-color-accent)}
[data-sui-component="Board"]{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(16rem,1fr);gap:var(--sui-space-4);overflow-x:auto;align-items:start;padding-block-end:var(--sui-space-2)}
[data-sui-component="BoardColumn"],[data-sui-component="WorkQueue"]{min-width:0;padding:var(--sui-space-3);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface-muted)}
[data-sui-component="KanbanCard"]{display:block;width:100%;margin-block:var(--sui-space-2);padding:var(--sui-space-3);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-small);background:var(--sui-color-surface);color:var(--sui-color-text);text-align:start;font:inherit;cursor:pointer}
[data-sui-component="KanbanCard"][aria-selected="true"]{border-color:var(--sui-color-accent);box-shadow:0 0 0 2px var(--sui-focus-ring)}
[data-sui-component="KanbanCard"][data-sui-blocked="true"]{border-inline-start:4px solid var(--sui-color-warning)}
[data-sui-component="EvidenceCard"],[data-sui-component="ApprovalPanel"]{padding:var(--sui-space-4);border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface)}
[data-sui-component="EvidenceCard"]{border-inline-start:4px solid var(--sui-color-accent)}
[data-sui-component="ApprovalPanel"]{border-inline-start:4px solid var(--sui-color-warning)}
[data-sui-component="Visualization"],[data-sui-component="RelationshipGraph"]{min-block-size:12rem;overflow:auto;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:var(--sui-color-surface)}
[data-sui-component="Alert"][data-sui-state~="danger"]{border-color:var(--sui-color-danger);color:var(--sui-color-danger)}
[data-sui-component="Status"][data-sui-state~="positive"]{border-color:var(--sui-color-positive);color:var(--sui-color-positive)}
[data-sui-component="Header"],[data-sui-component="PageHeader"]{padding-block:var(--sui-space-4);border-block-end:1px solid var(--sui-color-border);background:var(--sui-color-surface)}
[data-sui-component="Sidebar"]{padding:var(--sui-space-4);border-inline-end:1px solid var(--sui-color-border);background:var(--sui-color-surface)}
[data-sui-component="PreviewFrame"]{overflow:hidden;border:1px solid var(--sui-color-border);border-radius:var(--sui-radius-medium);background:#fff;box-shadow:var(--sui-shadow-raised)}
[data-sui-component="VisuallyHidden"]{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
:where(a,button,input,select,textarea,summary,[tabindex]):focus-visible{outline:3px solid var(--sui-focus-ring);outline-offset:2px}
[dir="rtl"] [data-sui-component="Sidebar"]{border-inline-end:1px solid var(--sui-color-border);border-inline-start:0}
@media(max-width:760px){[data-sui-layout-role="geographic-cockpit"]{grid-template-columns:minmax(0,1fr)}[data-sui-layout-role="geographic-cockpit"]>*{grid-column:1/-1}[data-sui-layout-role="cockpit-header"]{align-items:start;flex-direction:column}[data-sui-layout-role="map-board"]{min-height:30rem;overflow:auto}[data-sourcery-cockpit-unit]{min-width:5.2rem;max-width:6.2rem}[data-sui-layout-role="unit-inspector"]{box-shadow:inset 0 3px #d99132}[data-sui-layout-role="demo-joyride"]{position:relative;inset:auto;margin:.35rem}[data-sourcery-demo-joyride-panel]{grid-template-columns:minmax(0,1fr)}[data-sourcery-demo-joyride-panel]>*{grid-column:1/-1}[data-sourcery-demo-joyride-steps]{grid-template-columns:repeat(7,minmax(2rem,1fr));overflow-x:auto}[data-sui-layout-role="joyride-header"]{align-items:start;flex-direction:column}[data-sui-layout-role="model-edit-controls"]{grid-template-columns:minmax(9rem,1fr);overflow:visible}}
@media(max-width:760px){[data-sui-component="SplitPane"]{grid-template-columns:minmax(0,1fr)}[data-sui-component="Container"]{width:min(100% - 1rem,72rem)}[data-sui-layout-role="workspace"]{width:100%;margin:0;padding:var(--sui-space-2);gap:var(--sui-space-2)}[data-sui-layout-role="status"]{width:100%;box-sizing:border-box}[data-sui-layout-role="hero"],[data-sui-layout-role="flow"],[data-sui-layout-role="primary-analysis"]{padding:var(--sui-space-4)}[data-sui-layout-role="data-grid"]{display:block;max-width:100%;overflow-x:auto}[data-sui-adapt-narrow~="stack"],[data-sui-layout-role="process-flow"],[data-sui-layout-role="comparison-grid"],[data-sui-layout-role="plausibility-band"],[data-sui-layout-role="evidence-band"],[data-sui-layout-role="evidence-sources"],[data-sui-layout-role="explanation-band"]{display:grid;grid-auto-flow:row;grid-template-columns:minmax(0,1fr)}[data-sui-layout-role="process-stage"]:not(:last-child)::after{content:"↓";inset-inline-end:auto;inset-block-end:calc(-1 * var(--sui-space-4))}[data-sui-specimen-composition="industrial-decision-cockpit-v1"]{display:grid;grid-template-columns:minmax(0,1fr);min-height:100vh}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-live-workbench],[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-multi-lens-graph],[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-industrial-growth]{grid-column:1/-1}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]{display:grid;grid-template-columns:minmax(0,1fr)}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"] h2{white-space:normal}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="masthead"]>[data-sui-layout-role="status"]{max-width:100%}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sourcery-mvp-validation]{grid-template-columns:minmax(0,1fr)}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="comparison-card"] [data-sui-typography-role="metric"]{white-space:normal}[data-sui-adapt-narrow~="wrap"]{display:flex;flex-wrap:wrap}[data-sui-adapt-narrow~="scroll-semantic-axis"]{overflow:auto;scroll-snap-type:inline proximity}[data-sui-pane-tabs]{display:flex;position:sticky;inset-block-start:0;z-index:2;padding:var(--sui-space-2);background:var(--sui-color-canvas)}[data-sui-component="TriPaneWorkspace"]{display:block;min-height:0;padding:var(--sui-space-2)}[data-sui-component="TriPaneWorkspace"]>[data-sui-pane]{display:none;min-height:calc(100vh - 9rem)}[data-sui-component="TriPaneWorkspace"]>[data-sui-pane][data-sui-pane-active="true"]{display:block}}
@media(max-width:760px){[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="evidence-band"]{grid-template-columns:minmax(0,1fr)}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="action-group"]{display:grid;grid-template-columns:minmax(0,1fr);justify-content:stretch;width:100%}[data-sui-specimen-composition="industrial-decision-cockpit-v1"] [data-sui-layout-role="action-group"]>*{width:100%;box-sizing:border-box}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}
`;
}

export function installDefaultComponentLibrary(document, { theme = "light", locale = "en" } = {}) {
  if (!document?.head || !document?.documentElement) return freeze({ installed: false, reason: "document-unavailable" });
  let style = document.querySelector?.("style[data-sui-library]");
  if (!style) {
    style = document.createElement("style");
    style.setAttribute("data-sui-library", "sourcery-default-component-library/1");
  }
  style.textContent = defaultComponentLibraryCss({ theme });
  if (!style.isConnected) document.head.appendChild(style);
  const bundle = uiMessageBundles[locale] || uiMessageBundles.en;
  document.documentElement.setAttribute("data-sui-theme", (uiThemes[theme] || uiThemes.light).key);
  document.documentElement.setAttribute("lang", bundle.locale);
  document.documentElement.setAttribute("dir", bundle.direction);
  return freeze({ installed: true, theme: (uiThemes[theme] || uiThemes.light).key, locale: bundle.locale, direction: bundle.direction });
}
