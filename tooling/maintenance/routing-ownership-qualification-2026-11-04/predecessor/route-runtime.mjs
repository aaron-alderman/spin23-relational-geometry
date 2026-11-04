import { pageBootSpec } from "./page-boot-runtime.mjs";

export const ROUTE_TARGET_ROLES = Object.freeze({
  authenticatedDefault: "authenticatedDefault",
  unauthenticatedDefault: "unauthenticatedDefault",
  operatorDefault: "operatorDefault",
});

export const ROUTE_ACCESS_MODES = Object.freeze({
  public: "public",
  authenticated: "authenticated",
  guestOnly: "guestOnly",
  operator: "operator",
});

export const ROUTE_CACHE_STRATEGIES = Object.freeze({
  revalidate: "revalidate",
  noStore: "noStore",
});

export const ROUTE_CACHE_VISIBILITIES = Object.freeze({
  public: "public",
  private: "private",
});

export const ROUTE_CACHE_VALIDATORS = Object.freeze({
  contentDigest: "contentDigest",
});

export const PAGE_RENDERER_SERVER_RENDER_MODES = Object.freeze({
  domHydration: "domHydration",
});

export const PAGE_RENDERER_HYDRATION_PROJECTION_TRANSFERS = Object.freeze({
  serverBindingPlan: "serverBindingPlan",
  clientRebuild: "clientRebuild",
});

export const BROWSER_STARTUP_RESOURCE_DELIVERY_MODES = Object.freeze({
  fetchPreload: "fetchPreload",
});

export const BROWSER_STARTUP_RESOURCE_CREDENTIAL_MODES = Object.freeze({
  sameOrigin: "same-origin",
  include: "include",
});

export const BROWSER_STARTUP_RESOURCE_PRIORITIES = Object.freeze({
  high: "high",
  auto: "auto",
  low: "low",
});

function sourceFacts(source) {
  if (Array.isArray(source)) return source;
  if (typeof source?.toArray === "function") return source.toArray();
  return [];
}

function sourceOne(source, subject = "", predicate = "") {
  if (typeof source?.one === "function") return source.one(subject, predicate) || "";
  let value = "";
  for (const fact of sourceFacts(source)) {
    if (fact?.s === subject && fact?.p === predicate && fact?.pol !== "is-not") value = fact.o;
  }
  return value;
}

function sourceMany(source, subject = "", predicate = "") {
  if (typeof source?.factsForSubjectPredicate === "function") {
    return source
      .factsForSubjectPredicate(subject, predicate)
      .filter(fact => fact?.pol !== "is-not")
      .map(fact => fact.o)
      .filter(Boolean);
  }
  const values = [];
  for (const fact of sourceFacts(source)) {
    if (fact?.s !== subject || fact?.p !== predicate || fact?.pol === "is-not" || !fact?.o) continue;
    if (!values.includes(fact.o)) values.push(fact.o);
  }
  return values;
}

function typeSubjects(source, type = "") {
  if (typeof source?.distinctSubjects === "function") return source.distinctSubjects("isa", type);
  const subjects = [];
  for (const fact of sourceFacts(source)) {
    if (fact?.p !== "isa" || fact?.o !== type || !fact?.s || subjects.includes(fact.s)) continue;
    subjects.push(fact.s);
  }
  return subjects;
}

export function pageRendererContract(source, renderer = "") {
  const contracts = typeSubjects(source, "PageRendererContract")
    .filter(subject => sourceOne(source, subject, "renderer") === renderer)
    .map(subject => ({
      subject,
      renderer: sourceOne(source, subject, "renderer"),
      serverRenderMode: sourceOne(source, subject, "serverRenderMode"),
      hydrationProjectionTransfer: sourceOne(source, subject, "hydrationProjectionTransfer"),
    }));
  if (contracts.length > 1) {
    throw new Error(`Page renderer ${renderer || "<missing>"} requires at most one PageRendererContract; found ${contracts.length}.`);
  }
  return contracts[0] || null;
}

export function pageRendererSupportsDomSsr(source, renderer = "") {
  return pageRendererContract(source, renderer)?.serverRenderMode
    === PAGE_RENDERER_SERVER_RENDER_MODES.domHydration;
}

function defaultRequireValue(label, value) {
  if (value != null && value !== "") return value;
  throw new Error(`Missing required ${label}.`);
}

function defaultRuntimeError(message, code, extra = {}) {
  const error = new Error(message);
  error.code = code;
  Object.assign(error, extra);
  return error;
}

function defaultExpectedList(values = []) {
  return values.length ? values.join(", ") : "<none>";
}

function defaultRequireKnown(label, value, values = []) {
  if (values.includes(value)) return value;
  throw new Error(`Unknown ${label}: ${value}. Expected values: ${defaultExpectedList(values)}`);
}

export function browserStartupResourceSpec(source, subject = "", {
  requireValue = defaultRequireValue,
  requireKnown = defaultRequireKnown,
} = {}) {
  const resourceSubject = String(subject || "").trim();
  if (!resourceSubject) return null;
  requireKnown("browser startup resource", resourceSubject, typeSubjects(source, "BrowserStartupResource"));
  const urlOwner = requireValue(`${resourceSubject}.urlOwner`, sourceOne(source, resourceSubject, "urlOwner"));
  const urlPredicate = requireValue(`${resourceSubject}.urlPredicate`, sourceOne(source, resourceSubject, "urlPredicate"));
  const delivery = requireKnown(
    `${resourceSubject}.delivery`,
    sourceOne(source, resourceSubject, "delivery"),
    Object.values(BROWSER_STARTUP_RESOURCE_DELIVERY_MODES),
  );
  const credentials = requireKnown(
    `${resourceSubject}.credentials`,
    sourceOne(source, resourceSubject, "credentials"),
    Object.values(BROWSER_STARTUP_RESOURCE_CREDENTIAL_MODES),
  );
  const priority = requireKnown(
    `${resourceSubject}.priority`,
    sourceOne(source, resourceSubject, "priority"),
    Object.values(BROWSER_STARTUP_RESOURCE_PRIORITIES),
  );
  const mediaType = requireValue(`${resourceSubject}.mediaType`, sourceOne(source, resourceSubject, "mediaType"));
  const href = requireValue(`${urlOwner}.${urlPredicate}`, sourceOne(source, urlOwner, urlPredicate));
  return {
    subject: resourceSubject,
    urlOwner,
    urlPredicate,
    href,
    delivery,
    credentials,
    priority,
    mediaType,
  };
}

export function browserStartupResourcesForPage(source, pageSubject = "", options = {}) {
  const resolvedPageSubject = String(pageSubject || "").trim();
  if (!resolvedPageSubject) return [];
  return sourceMany(source, resolvedPageSubject, "startupResource")
    .map(subject => browserStartupResourceSpec(source, subject, options));
}

export function routeTargetSpec(source, subject = "") {
  const targetSubject = String(subject || "").trim();
  if (!targetSubject) return null;
  return {
    subject: targetSubject,
    role: sourceOne(source, targetSubject, "role"),
    binding: sourceOne(source, targetSubject, "binding"),
    page: sourceOne(source, targetSubject, "page"),
    path: sourceOne(source, targetSubject, "path"),
    port: sourceOne(source, targetSubject, "port"),
    href: sourceOne(source, targetSubject, "href"),
  };
}

export function routeTargets(source, ownerSubject = "net") {
  const targetSubjects = sourceMany(source, ownerSubject, "surfaceTarget");
  if (targetSubjects.length) {
    return targetSubjects
      .map(subject => routeTargetSpec(source, subject))
      .filter(Boolean);
  }
  return typeSubjects(source, "RouteTarget")
    .map(subject => routeTargetSpec(source, subject))
    .filter(Boolean);
}

export function routeTargetByRole(source, role = "", ownerSubject = "net") {
  const targetRole = String(role || "").trim();
  if (!targetRole) return null;
  return routeTargets(source, ownerSubject).find(target => target.role === targetRole) || null;
}

export function routeTargetBySubject(source, subject = "", ownerSubject = "net") {
  const targetSubject = String(subject || "").trim();
  if (!targetSubject) return null;
  return routeTargets(source, ownerSubject).find(target => target.subject === targetSubject) || null;
}

export function routeAccessPolicySpec(source, subject = "") {
  const policySubject = String(subject || "").trim();
  if (!policySubject) return null;
  return {
    subject: policySubject,
    route: sourceOne(source, policySubject, "route"),
    accessMode: sourceOne(source, policySubject, "accessMode") || ROUTE_ACCESS_MODES.public,
    unauthenticatedTarget: sourceOne(source, policySubject, "unauthenticatedTarget"),
    authenticatedTarget: sourceOne(source, policySubject, "authenticatedTarget"),
    unauthorizedTarget: sourceOne(source, policySubject, "unauthorizedTarget"),
  };
}

export function routeAccessPolicies(source) {
  return typeSubjects(source, "RouteAccessPolicy")
    .map(subject => routeAccessPolicySpec(source, subject))
    .filter(Boolean);
}

export function routeAccessPolicyForRoute(source, routeSubject = "") {
  const resolvedRouteSubject = String(routeSubject || "").trim();
  if (!resolvedRouteSubject) return null;
  return routeAccessPolicies(source).find(policy => policy.route === resolvedRouteSubject) || null;
}

export function routeCachePolicySpec(source, subject = "") {
  const policySubject = String(subject || "").trim();
  if (!policySubject) return null;
  return {
    subject: policySubject,
    route: sourceOne(source, policySubject, "route"),
    strategy: sourceOne(source, policySubject, "strategy"),
    visibility: sourceOne(source, policySubject, "visibility"),
    maxAgeSeconds: sourceOne(source, policySubject, "maxAgeSeconds"),
    validator: sourceOne(source, policySubject, "validator"),
  };
}

export function routeCachePolicies(source) {
  return typeSubjects(source, "RouteCachePolicy")
    .map(subject => routeCachePolicySpec(source, subject))
    .filter(Boolean);
}

export function routeCachePolicyForRoute(source, routeSubject = "") {
  const resolvedRouteSubject = String(routeSubject || "").trim();
  if (!resolvedRouteSubject) return null;
  const policies = routeCachePolicies(source)
    .filter(policy => policy.route === resolvedRouteSubject);
  if (policies.length > 1) {
    throw new Error(`Route ${resolvedRouteSubject} has multiple RouteCachePolicy declarations: ${policies.map(policy => policy.subject).join(", ")}.`);
  }
  return policies[0] || null;
}

export function lowerRouteCachePolicy(policy = null) {
  if (!policy) return "";
  const subject = String(policy.subject || "RouteCachePolicy");
  if (!Object.values(ROUTE_CACHE_STRATEGIES).includes(policy.strategy)) {
    throw new Error(`${subject}.strategy must be revalidate or noStore.`);
  }
  if (!Object.values(ROUTE_CACHE_VISIBILITIES).includes(policy.visibility)) {
    throw new Error(`${subject}.visibility must be public or private.`);
  }
  if (policy.validator !== ROUTE_CACHE_VALIDATORS.contentDigest) {
    throw new Error(`${subject}.validator must be ${ROUTE_CACHE_VALIDATORS.contentDigest}.`);
  }
  const maxAgeText = String(policy.maxAgeSeconds ?? "").trim();
  if (!/^\d+$/u.test(maxAgeText) || !Number.isSafeInteger(Number(maxAgeText))) {
    throw new Error(`${subject}.maxAgeSeconds must be a non-negative safe integer.`);
  }
  if (policy.strategy === ROUTE_CACHE_STRATEGIES.noStore) {
    return `${policy.visibility}, no-store`;
  }
  return `${policy.visibility}, no-cache, max-age=${maxAgeText}, must-revalidate`;
}

export function routeTargetPath(target = {}) {
  return String(target?.path || "").trim();
}

export function routeTargetPort(target = {}) {
  return String(target?.port || "").trim();
}

export function routeTargetHref(target = {}, urlForRouteTarget, options = {}) {
  const href = String(target?.href || "").trim();
  if (href) return href;
  const path = routeTargetPath(target);
  const port = routeTargetPort(target);
  if (!path) return "";
  if (typeof urlForRouteTarget !== "function") return path;
  return urlForRouteTarget(port, path, options);
}

export function routeSpecs(source) {
  return typeSubjects(source, "Route").map(subject => {
    const policy = routeAccessPolicyForRoute(source, subject);
    return {
      subject,
      method: sourceOne(source, subject, "method"),
      path: sourceOne(source, subject, "path"),
      file: sourceOne(source, subject, "file"),
      as: sourceOne(source, subject, "as"),
      page: sourceOne(source, subject, "page"),
      accessMode: policy?.accessMode || ROUTE_ACCESS_MODES.public,
      unauthenticatedTarget: policy?.unauthenticatedTarget || "",
      authenticatedTarget: policy?.authenticatedTarget || "",
      unauthorizedTarget: policy?.unauthorizedTarget || "",
    };
  });
}

/**
 * Matches an authored route path without admitting wildcards. A segment whose
 * complete value is `:name` captures exactly one decoded URL path segment.
 * Static segments remain exact and therefore win over parameterized routes.
 */
export function matchRoutePath(routePath, pathname) {
  const pattern = String(routePath || "");
  const candidate = String(pathname || "");
  if (pattern === candidate) return Object.freeze({ matched: true, params: Object.freeze({}) });
  if (!pattern.startsWith("/") || !candidate.startsWith("/")) {
    return Object.freeze({ matched: false, params: Object.freeze({}) });
  }
  const patternSegments = pattern.split("/");
  const candidateSegments = candidate.split("/");
  if (patternSegments.length !== candidateSegments.length) {
    return Object.freeze({ matched: false, params: Object.freeze({}) });
  }
  const params = {};
  for (let index = 0; index < patternSegments.length; index += 1) {
    const expected = patternSegments[index];
    const received = candidateSegments[index];
    if (!expected.startsWith(":")) {
      if (expected !== received) return Object.freeze({ matched: false, params: Object.freeze({}) });
      continue;
    }
    const name = expected.slice(1);
    if (!/^[A-Za-z][A-Za-z0-9_]*$/u.test(name) || !received) {
      return Object.freeze({ matched: false, params: Object.freeze({}) });
    }
    let decoded;
    try {
      decoded = decodeURIComponent(received);
    } catch {
      return Object.freeze({ matched: false, params: Object.freeze({}) });
    }
    if (!decoded || decoded.includes("/") || Object.hasOwn(params, name)) {
      return Object.freeze({ matched: false, params: Object.freeze({}) });
    }
    params[name] = decoded;
  }
  return Object.freeze({ matched: true, params: Object.freeze(params) });
}

export function routePathForAction(source, actionName = "", method = "POST") {
  const normalizedAction = String(actionName || "").trim();
  const normalizedMethod = String(method || "POST").trim().toUpperCase();
  if (!normalizedAction) return "";
  return routeSpecs(source).find(route =>
    String(route.as || "").trim() === normalizedAction
    && String(route.method || "").trim().toUpperCase() === normalizedMethod)?.path || "";
}

export function pageSpecs(source) {
  return typeSubjects(source, "Page").map(subject => ({
    subject,
    renderer: sourceOne(source, subject, "renderer"),
    document: sourceOne(source, subject, "document"),
    boot: sourceOne(source, subject, "boot"),
  }));
}

export function pageSpec(source, pageSubject, { requireKnown = null } = {}) {
  const pages = pageSpecs(source);
  if (typeof requireKnown === "function") {
    requireKnown("page", pageSubject, pages.map(page => page.subject));
  }
  return pages.find(page => page.subject === pageSubject) || {
    subject: pageSubject,
    renderer: sourceOne(source, pageSubject, "renderer"),
    document: sourceOne(source, pageSubject, "document"),
    boot: sourceOne(source, pageSubject, "boot"),
  };
}

export function bootSpec(source, bootSubject) {
  return pageBootSpec(source, bootSubject);
}

export function resolvePageRequest(source, pathname, method = "GET", {
  runtimeError = defaultRuntimeError,
  expectedList = defaultExpectedList,
  requireKnown = defaultRequireKnown,
} = {}) {
  const routes = routeSpecs(source).filter(route => route.method === method && route.page);
  const paths = routes.map(route => route.path);
  const matches = routes
    .map(entry => ({ entry, match: matchRoutePath(entry.path, pathname) }))
    .filter(candidate => candidate.match.matched)
    .sort((left, right) => (
      Number(left.entry.path.includes(":")) - Number(right.entry.path.includes(":"))
      || left.entry.path.localeCompare(right.entry.path)
    ));
  const selected = matches[0];
  const route = selected
    ? Object.freeze({ ...selected.entry, params: selected.match.params })
    : null;
  if (!route) {
    throw runtimeError(`Unknown page route: ${pathname}. Expected values: ${expectedList(paths)}`, "unknown-page-route", {
      route: pathname,
      method,
      expectedPaths: paths,
    });
  }
  const page = pageSpec(source, route.page, { requireKnown });
  const boot = bootSpec(source, page.boot);
  return { route, page, boot };
}

export function routePathForPage(source, pageSubject, method = "GET", { requireKnown = defaultRequireKnown } = {}) {
  const routes = routeSpecs(source).filter(route => route.method === method && route.page);
  const pages = routes.map(route => route.page);
  if (typeof requireKnown === "function") requireKnown("page", pageSubject, pages);
  return routes.find(route => route.page === pageSubject)?.path;
}

export function bootQueryParamForBoot(source, bootSubject, { requireValue = defaultRequireValue } = {}) {
  const boot = bootSpec(source, bootSubject);
  return requireValue(`${boot?.subject || bootSubject}.queryParam`, boot?.queryParam);
}

export function normalizeRouteTarget(target = {}) {
  return {
    subject: String(target?.subject || "").trim(),
    role: String(target?.role || "").trim(),
    binding: String(target?.binding || "").trim(),
    page: String(target?.page || "").trim(),
    path: String(target?.path || "").trim(),
    port: String(target?.port || "").trim(),
    href: String(target?.href || "").trim(),
  };
}

export function normalizeRouteTargets(targets = []) {
  return (Array.isArray(targets) ? targets : [])
    .map(target => normalizeRouteTarget(target))
    .filter(target => target.subject || target.role || target.page || target.path || target.href);
}

export function readRuntimeNetConfig(readValue, requireValue = defaultRequireValue, { surfaceTargets = [] } = {}) {
  return {
    programUrl: readValue("programUrl") || "",
    stateUrl: requireValue("net.stateUrl", readValue("stateUrl")),
    saveUrl: requireValue("net.saveUrl", readValue("saveUrl")),
    sessionUrl: requireValue("net.sessionUrl", readValue("sessionUrl")),
    sessionEventsUrl: requireValue("net.sessionEventsUrl", readValue("sessionEventsUrl")),
    authSessionUrl: requireValue("net.authSessionUrl", readValue("authSessionUrl")),
    authLoginUrl: requireValue("net.authLoginUrl", readValue("authLoginUrl")),
    authLogoutUrl: requireValue("net.authLogoutUrl", readValue("authLogoutUrl")),
    authActorHeaderName: requireValue("net.authActorHeaderName", readValue("authActorHeaderName")),
    unauthenticatedActor: requireValue("net.unauthenticatedActor", readValue("unauthenticatedActor")),
    authLoginAction: requireValue("net.authLoginAction", readValue("authLoginAction")),
    authLogoutAction: requireValue("net.authLogoutAction", readValue("authLogoutAction")),
    loginPath: readValue("loginPath") || "",
    signoutPath: readValue("signoutPath") || "",
    relCoreModuleUrl: readValue("relCoreModuleUrl") || "",
    surfaceTargets: normalizeRouteTargets(surfaceTargets),
  };
}
