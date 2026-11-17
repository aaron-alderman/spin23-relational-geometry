import { uiComponentCatalogue } from "./component-library.mjs";

const COMPONENTS = new Set(uiComponentCatalogue.map(component => component.key));

export function resolveNativeComponent({ subject = "", tag = "", attrs = new Map() } = {}) {
  const name = String(subject).toLowerCase();
  const nativeTag = String(tag).toLowerCase();
  const type = String(attrs.get?.("type") || "").toLowerCase();
  const exact = (component, basis = "native-semantic-element", loss = []) => ({ component, basis, loss });
  if (nativeTag === "main") return exact("ApplicationShell");
  if (nativeTag === "header") return exact("Header");
  if (nativeTag === "footer") return exact("Footer");
  if (nativeTag === "aside") return exact(name.includes("inspector") ? "Inspector" : "Sidebar", "native-landmark-and-subject-role");
  if (nativeTag === "nav") return exact("NavigationList");
  if (/^h[1-6]$/u.test(nativeTag)) return exact("Heading");
  if (nativeTag === "label") return exact("Label");
  if (nativeTag === "a") return exact("Link");
  if (nativeTag === "button") {
    if (/icon|close|dismiss/u.test(name)) return exact("IconButton", "native-action-and-subject-role");
    if (/menu/u.test(name)) return exact("MenuButton", "native-action-and-subject-role");
    return exact("Button");
  }
  if (nativeTag === "textarea") return exact("TextArea");
  if (nativeTag === "select") return exact("Select");
  if (nativeTag === "input") {
    if (type === "checkbox") return exact("Checkbox");
    if (type === "radio") return exact("RadioGroup");
    if (type === "search" || /search|query|filter/u.test(name)) return exact("SearchField", "native-input-and-subject-role");
    if (type === "date") return exact("DateField", "native-input-type");
    if (type === "time") return exact("TimeField", "native-input-type");
    if (type === "number") return exact("NumberField", "native-input-type");
    return exact("TextField");
  }
  if (nativeTag === "form") return exact("Form", "native-form-composition");
  if (nativeTag === "table") return exact("DataTable");
  if (["thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col"].includes(nativeTag)) return exact("Box", "native-table-part", ["part-bound-to-native-table-root"]);
  if (nativeTag === "ul" || nativeTag === "ol") {
    if (/filter|actions|toolbar/u.test(name)) return exact("Toolbar", "native-collection-and-subject-role");
    if (/timeline|history|activity/u.test(name)) return exact("Timeline", "native-collection-and-subject-role");
    return exact("List");
  }
  if (nativeTag === "li") {
    if (/timeline|history|activity/u.test(name)) return exact("TimelineItem", "native-list-item-and-subject-role");
    if (/metric|stat|kpi/u.test(name)) return exact("Metric", "native-list-item-and-subject-role");
    return exact("ListItem");
  }
  if (nativeTag === "section" || nativeTag === "article") {
    if (/evidence|citation|receipt/u.test(name)) return exact("EvidenceCard", "native-region-and-subject-role");
    if (/approval|approve/u.test(name)) return exact("ApprovalPanel", "native-region-and-subject-role");
    if (/card|scenario|proposal/u.test(name)) return exact("Card", "native-region-and-subject-role");
    return exact("Panel");
  }
  if (nativeTag === "div") {
    if (/workflowboard|kanban|board(?:\.|$)/u.test(name)) return exact("Board", "native-container-and-subject-role");
    if (/workflowlane|boardcolumn|kanbancolumn/u.test(name)) return exact("BoardColumn", "native-container-and-subject-role");
    if (/toolbar|filter|actions/u.test(name)) return exact("Toolbar", "native-container-and-subject-role");
    if (/inspector|detail/u.test(name)) return exact("Inspector", "native-container-and-subject-role");
    if (/metric|stat|kpi/u.test(name)) return exact("Metric", "native-container-and-subject-role");
    if (/queue|attentionitem|workitem/u.test(name)) return exact("WorkQueue", "native-container-and-subject-role");
    if (/timeline|history|activity/u.test(name)) return exact("Timeline", "native-container-and-subject-role");
    if (/relationship|graph|network/u.test(name)) return exact("RelationshipGraph", "native-container-and-subject-role");
    return exact("Box", "generic-native-container", ["no-stronger-product-independent-component-role"]);
  }
  if (nativeTag === "span") {
    if (/badge|status|state|priority/u.test(name)) return exact("Badge", "native-inline-and-subject-role");
    if (/money|amount|currency|invoice|payment/u.test(name)) return exact("Money", "native-inline-and-subject-role");
    if (/metric|count|total|summary/u.test(name)) return exact("Metric", "native-inline-and-subject-role");
    return exact("Text");
  }
  if (["p", "small", "strong", "em", "time", "legend"].includes(nativeTag)) return exact("Text");
  if (["code", "pre", "kbd", "samp"].includes(nativeTag)) return exact("Code");
  if (nativeTag === "details") return exact("Details");
  if (nativeTag === "summary") return exact("Button", "native-disclosure-trigger");
  if (nativeTag === "progress" || nativeTag === "meter") return exact("Progress");
  if (nativeTag === "dialog") return exact("Dialog");
  if (["svg", "canvas", "img", "picture", "figure"].includes(nativeTag)) return exact("Visualization", "native-visual-media");
  if (["option", "datalist"].includes(nativeTag)) return exact("Text");
  return exact("Box", "generic-native-element", [`unclassified-native-tag:${nativeTag || "unknown"}`]);
}

function semanticSubject(element, index) {
  const id = element.getAttribute?.("id");
  const classes = element.getAttribute?.("class");
  const role = element.getAttribute?.("role");
  return [id, classes, role, element.tagName, index].filter(Boolean).join(".");
}

export function adoptNativeDocument(document, { root = document?.body || document?.documentElement, surface = "customer" } = {}) {
  if (!root) return Object.freeze({ observed: 0, adopted: 0, lossBearing: 0, components: Object.freeze({}) });
  const descendants = typeof root.querySelectorAll === "function" ? [...root.querySelectorAll("*")] : [];
  const elements = [root, ...descendants].filter(element => element?.tagName);
  const components = {};
  let adopted = 0;
  let lossBearing = 0;
  for (const [index, element] of elements.entries()) {
    if (element.tagName.toLowerCase() === "script" || element.tagName.toLowerCase() === "style") continue;
    const attrs = new Map(["type"].map(name => [name, element.getAttribute?.(name) || ""]));
    const resolved = resolveNativeComponent({ subject: semanticSubject(element, index), tag: element.tagName, attrs });
    if (!element.hasAttribute?.("data-sui-component")) element.setAttribute?.("data-sui-component", resolved.component);
    if (!element.hasAttribute?.("data-sui-surface")) element.setAttribute?.("data-sui-surface", surface);
    adopted += 1;
    if (resolved.loss.length) lossBearing += 1;
    components[resolved.component] = (components[resolved.component] || 0) + 1;
  }
  return Object.freeze({ observed: elements.length, adopted, lossBearing, components: Object.freeze(components) });
}

export function observeNativeDocument(document, options = {}) {
  const initial = adoptNativeDocument(document, options);
  const Observer = document?.defaultView?.MutationObserver || globalThis.MutationObserver;
  if (!Observer || !document?.documentElement) return Object.freeze({ initial, observer: null });
  const observer = new Observer(records => {
    for (const record of records) {
      for (const node of record.addedNodes || []) if (node?.tagName) adoptNativeDocument(document, { ...options, root: node });
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  return Object.freeze({ initial, observer });
}
