import { pageBootSpec } from "./page-boot-runtime.mjs";
import { sourceMany, sourceOne, typeSubjects } from "./route-source-semantics.mjs";
import { ROUTE_ACCESS_MODES } from "./route-runtime-contracts.mjs";
import { routeAccessPolicyForRoute } from "./route-runtime-policies.mjs";

function text(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

export function routeSpecs(source) {
  return typeSubjects(source, "Route").map(subject => {
    const policy = routeAccessPolicyForRoute(source, subject);
    let accessMode = ROUTE_ACCESS_MODES.public;
    let unauthenticatedTarget = "";
    let authenticatedTarget = "";
    let unauthorizedTarget = "";
    if (policy !== null) {
      if (policy.accessMode) accessMode = policy.accessMode;
      if (policy.unauthenticatedTarget) unauthenticatedTarget = policy.unauthenticatedTarget;
      if (policy.authenticatedTarget) authenticatedTarget = policy.authenticatedTarget;
      if (policy.unauthorizedTarget) unauthorizedTarget = policy.unauthorizedTarget;
    }
    return { subject, method: sourceOne(source, subject, "method"), path: sourceOne(source, subject, "path"), file: sourceOne(source, subject, "file"), as: sourceOne(source, subject, "as"), page: sourceOne(source, subject, "page"), accessMode, unauthenticatedTarget, authenticatedTarget, unauthorizedTarget };
  });
}

export function matchRoutePath(routePath, pathname) {
  const pattern = text(routePath);
  const candidate = text(pathname);
  if (pattern === candidate) return Object.freeze({ matched: true, params: Object.freeze({}) });
  if (!pattern.startsWith("/") || !candidate.startsWith("/")) return Object.freeze({ matched: false, params: Object.freeze({}) });
  const patternSegments = pattern.split("/");
  const candidateSegments = candidate.split("/");
  if (patternSegments.length !== candidateSegments.length) return Object.freeze({ matched: false, params: Object.freeze({}) });
  const params = {};
  for (let index = 0; index < patternSegments.length; index += 1) {
    const expected = patternSegments[index];
    const received = candidateSegments[index];
    if (!expected.startsWith(":")) {
      if (expected !== received) return Object.freeze({ matched: false, params: Object.freeze({}) });
      continue;
    }
    const name = expected.slice(1);
    if (!/^[A-Za-z][A-Za-z0-9_]*$/u.test(name) || !received) return Object.freeze({ matched: false, params: Object.freeze({}) });
    let decoded;
    try { decoded = decodeURIComponent(received); } catch { return Object.freeze({ matched: false, params: Object.freeze({}) }); }
    if (!decoded || decoded.includes("/") || Object.hasOwn(params, name)) return Object.freeze({ matched: false, params: Object.freeze({}) });
    params[name] = decoded;
  }
  return Object.freeze({ matched: true, params: Object.freeze(params) });
}

export function routePathForAction(source, actionName, method) {
  const action = text(actionName);
  let selectedMethod = method;
  if (selectedMethod === undefined || selectedMethod === null) selectedMethod = "POST";
  selectedMethod = String(selectedMethod).trim().toUpperCase();
  if (!action) return "";
  const found = routeSpecs(source).find(route => text(route.as) === action && text(route.method).toUpperCase() === selectedMethod);
  if (found === undefined) return "";
  return found.path;
}

export function pageSpecs(source) { return typeSubjects(source, "Page").map(subject => ({ subject, renderer: sourceOne(source, subject, "renderer"), document: sourceOne(source, subject, "document"), boot: sourceOne(source, subject, "boot") })); }
export function pageSpec(source, pageSubject, options = {}) {
  const pages = pageSpecs(source);
  if (typeof options.requireKnown === "function") options.requireKnown("page", pageSubject, pages.map(page => page.subject));
  const found = pages.find(page => page.subject === pageSubject);
  if (found !== undefined) return found;
  return { subject: pageSubject, renderer: sourceOne(source, pageSubject, "renderer"), document: sourceOne(source, pageSubject, "document"), boot: sourceOne(source, pageSubject, "boot") };
}
export function bootSpec(source, bootSubject) { return pageBootSpec(source, bootSubject); }

export function routePathForPage(source, pageSubject, method, options = {}) {
  let selectedMethod = method;
  if (selectedMethod === undefined || selectedMethod === null) selectedMethod = "GET";
  const routes = routeSpecs(source).filter(route => route.method === selectedMethod && route.page);
  const pages = routes.map(route => route.page);
  if (typeof options.requireKnown === "function") options.requireKnown("page", pageSubject, pages);
  const found = routes.find(route => route.page === pageSubject);
  if (found === undefined) return undefined;
  return found.path;
}

export function resolvePageRequest(source, pathname, method, options = {}) {
  let selectedMethod = method;
  if (selectedMethod === undefined || selectedMethod === null) selectedMethod = "GET";
  const runtimeError = options.runtimeError;
  const expectedList = options.expectedList;
  const requireKnown = options.requireKnown;
  const routes = routeSpecs(source).filter(route => route.method === selectedMethod && route.page);
  const paths = routes.map(route => route.path);
  const matches = routes.map(entry => ({ entry, match: matchRoutePath(entry.path, pathname) })).filter(candidate => candidate.match.matched).sort((left, right) => Number(left.entry.path.includes(":")) - Number(right.entry.path.includes(":")) || left.entry.path.localeCompare(right.entry.path));
  const selected = matches[0];
  let route = null;
  if (selected !== undefined) route = Object.freeze({ ...selected.entry, params: selected.match.params });
  if (route === null) throw runtimeError(`Unknown page route: ${pathname}. Expected values: ${expectedList(paths)}`, "unknown-page-route", { route: pathname, method: selectedMethod, expectedPaths: paths });
  const page = pageSpec(source, route.page, { requireKnown });
  const boot = bootSpec(source, page.boot);
  return { route, page, boot };
}

export function bootQueryParamForBoot(source, bootSubject, options = {}) {
  const boot = bootSpec(source, bootSubject);
  let subject = boot?.subject;
  if (!subject) subject = bootSubject;
  return options.requireValue(`${subject}.queryParam`, boot?.queryParam);
}
