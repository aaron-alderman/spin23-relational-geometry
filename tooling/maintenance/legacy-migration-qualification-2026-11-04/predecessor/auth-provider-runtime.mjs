import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { actorExists, hasResolvedPermission } from "./auth-runtime.mjs";
import { RuntimeDiagnosticError } from "./runtime-diagnostics.mjs";
import { cookieSecurityAttributes } from "./security-runtime.mjs";

export const AUTH_COOKIE = "rel_auth";
export const LEGACY_ACTOR_COOKIE = "rel_actor";
const AUTH_SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function authSessionFile(dir, id) {
  return join(dir, `${encodeURIComponent(id)}.json`);
}

function normalizeStoredAuthSession(parsed, now = Date.now()) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const id = typeof parsed.id === "string" ? parsed.id : "";
  const actor = typeof parsed.actor === "string" ? parsed.actor : "";
  const identifier = typeof parsed.identifier === "string" ? parsed.identifier : "";
  const csrfToken = typeof parsed.csrfToken === "string" ? parsed.csrfToken : "";
  const createdAt = Number(parsed.createdAt);
  const expiresAt = Number(parsed.expiresAt);
  if (!id || !actor || !csrfToken || !Number.isFinite(createdAt) || !Number.isFinite(expiresAt)) return null;
  if (expiresAt <= now) return null;
  return { id, actor, identifier, csrfToken, createdAt, expiresAt };
}

function createAuthSessionRepository(dir = "", { now = () => Date.now() } = {}) {
  const sessions = new Map();
  const enabled = !!String(dir || "").trim();
  if (enabled) mkdirSync(dir, { recursive: true });

  const deletePersisted = id => {
    if (!enabled || !id) return;
    const file = authSessionFile(dir, id);
    if (existsSync(file)) unlinkSync(file);
  };

  const persist = session => {
    if (!enabled || !session?.id) return;
    writeFileSync(authSessionFile(dir, session.id), `${JSON.stringify(session)}\n`, { encoding: "utf8", mode: 0o600 });
  };

  const pruneExpired = () => {
    const timestamp = now();
    for (const [id, session] of sessions) {
      if ((session?.expiresAt || 0) > timestamp) continue;
      sessions.delete(id);
      deletePersisted(id);
    }
  };

  if (enabled) {
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".json")) continue;
      const file = join(dir, name);
      try {
        const session = normalizeStoredAuthSession(JSON.parse(readFileSync(file, "utf8")), now());
        if (session) sessions.set(session.id, session);
        else unlinkSync(file);
      } catch {
        unlinkSync(file);
      }
    }
  }

  return {
    get(id) {
      pruneExpired();
      return sessions.get(id) || null;
    },
    set(session) {
      pruneExpired();
      sessions.set(session.id, session);
      persist(session);
      return session;
    },
    delete(id) {
      sessions.delete(id);
      deletePersisted(id);
    },
    pruneExpired,
  };
}

function authIssue(plugin, binding, message, extra = {}) {
  return {
    code: extra.code || "plugin-auth-runtime-error",
    message,
    file: extra.file || plugin?.authRuntimeFact?.file || plugin?.file,
    line: extra.line || plugin?.authRuntimeFact?.line,
    subject: extra.subject || plugin?.subject,
    predicate: extra.predicate || "authRuntimeFile",
    binding: extra.binding || binding?.subject,
    details: extra.details,
  };
}

function bindingIssue(binding, message, extra = {}) {
  return {
    code: extra.code || "auth-runtime-error",
    message,
    file: extra.file || binding?.file,
    line: extra.line,
    subject: extra.subject || binding?.subject,
    predicate: extra.predicate || "authRuntimeFile",
    binding: extra.binding || binding?.subject,
    details: extra.details,
  };
}

function invalidPluginAuthRuntime(plugin, binding, message, details) {
  return new RuntimeDiagnosticError([authIssue(plugin, binding, message, {
    code: "invalid-plugin-auth-runtime",
    details,
  })], {
    code: "invalid-plugin-auth-runtime",
    title: `Runtime startup failed for binding ${binding?.subject || "<unknown>"}`,
  });
}

async function importFreshAuthRuntimeModule(file) {
  const version = statSync(file).mtimeMs;
  const href = pathToFileURL(file).href;
  return import(`${href}?v=${version}`);
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  return header.split(";").reduce((out, part) => {
    const [rawName, ...rest] = part.trim().split("=");
    if (!rawName) return out;
    out[rawName] = decodeURIComponent(rest.join("=") || "");
    return out;
  }, {});
}

function actorHeaderFromRequest(req, headerName) {
  const header = req.headers[String(headerName || "").toLowerCase()];
  if (Array.isArray(header)) return header[0] || "";
  return header || "";
}

function normalizeAuthProvider(plugin, binding, provider) {
  if (!provider || typeof provider !== "object" || Array.isArray(provider)) {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin?.subject || "<unknown>"} auth runtime createAuthProvider() must return an object.`,
      `Resolved runtime file: ${plugin?.authRuntimeFile || "<missing>"}`,
    );
  }
  if (typeof provider.authenticate !== "function") {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin?.subject || "<unknown>"} auth provider must expose authenticate({ identifier, secret }).`,
      `Resolved runtime file: ${plugin?.authRuntimeFile || "<missing>"}`,
    );
  }
  if (typeof provider.identifierForActor !== "function") {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin?.subject || "<unknown>"} auth provider must expose identifierForActor(actor).`,
      `Resolved runtime file: ${plugin?.authRuntimeFile || "<missing>"}`,
    );
  }
  return provider;
}

async function pluginAuthProvider(project, binding, context = {}) {
  if (typeof project?.pluginsList !== "function") return null;
  const authPlugins = project.pluginsList().filter(plugin => plugin?.authRuntimeFile);
  if (!authPlugins.length) return null;
  if (authPlugins.length > 1) {
    const pluginList = authPlugins.map(plugin => plugin.subject).join(", ");
    throw new RuntimeDiagnosticError(authPlugins.map(plugin => authIssue(
      plugin,
      binding,
      `Plugin ${plugin.subject} registers a duplicate auth runtime.`,
      {
        code: "duplicate-auth-runtime",
        details: `Only one authRuntimeFile may apply to binding ${binding?.subject || "<unknown>"}. Found: ${pluginList}.`,
      },
    )), {
      code: "duplicate-auth-runtime",
      title: `Runtime startup failed for binding ${binding?.subject || "<unknown>"}`,
    });
  }
  const plugin = authPlugins[0];
  let module;
  try {
    module = await importFreshAuthRuntimeModule(plugin.authRuntimeFile);
  } catch (error) {
    throw new RuntimeDiagnosticError([authIssue(
      plugin,
      binding,
      `Plugin ${plugin.subject} authRuntimeFile could not be loaded: ${error?.message || error}`,
      {
        code: "plugin-auth-runtime-load-failed",
        details: `Resolved runtime file: ${plugin.authRuntimeFile}`,
      },
    )], {
      code: "plugin-auth-runtime-load-failed",
      title: `Runtime startup failed for binding ${binding?.subject || "<unknown>"}`,
    });
  }
  if (module?.authRuntime == null) {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin.subject} authRuntimeFile must export "authRuntime".`,
      `Resolved runtime file: ${plugin.authRuntimeFile}`,
    );
  }
  const authRuntime = typeof module.authRuntime === "function"
    ? module.authRuntime({ plugin, project, binding })
    : module.authRuntime;
  if (!authRuntime || typeof authRuntime !== "object" || Array.isArray(authRuntime)) {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin.subject} authRuntimeFile must export authRuntime as an object or factory.`,
      `Resolved runtime file: ${plugin.authRuntimeFile}`,
    );
  }
  if (typeof authRuntime.createAuthProvider !== "function") {
    throw invalidPluginAuthRuntime(
      plugin,
      binding,
      `Plugin ${plugin.subject} authRuntime must expose createAuthProvider().`,
      `Resolved runtime file: ${plugin.authRuntimeFile}`,
    );
  }
  const provider = await authRuntime.createAuthProvider(context);
  return normalizeAuthProvider(plugin, binding, provider);
}

function defaultAuthProvider(prog, binding) {
  const credentials = prog.things("AuthCredential").map(subject => ({
    subject,
    identifier: String(prog.one(subject, "identifier") || ""),
    secret: String(prog.one(subject, "secret") || ""),
    actor: String(prog.one(subject, "actor") || ""),
  }));
  const credentialByIdentifier = new Map();
  const identifierByActor = new Map();
  for (const credential of credentials) {
    if (!credential.identifier || !credential.actor) continue;
    if (credentialByIdentifier.has(credential.identifier)) {
      throw new RuntimeDiagnosticError([bindingIssue(
        binding,
        `Binding ${binding?.subject || "<unknown>"} authors duplicate AuthCredential.identifier "${credential.identifier}".`,
        {
          code: "duplicate-auth-identifier",
          subject: credential.subject,
          predicate: "identifier",
        },
      )], {
        code: "duplicate-auth-identifier",
        title: `Runtime startup failed for binding ${binding?.subject || "<unknown>"}`,
      });
    }
    credentialByIdentifier.set(credential.identifier, credential);
    if (!identifierByActor.has(credential.actor)) identifierByActor.set(credential.actor, credential.identifier);
  }
  return {
    authenticate({ identifier, secret }) {
      const credential = credentialByIdentifier.get(String(identifier || ""));
      if (!credential) return null;
      if (credential.secret !== String(secret || "")) return null;
      return {
        actor: credential.actor,
        identifier: credential.identifier,
      };
    },
    identifierForActor(actor) {
      return identifierByActor.get(String(actor || "")) || null;
    },
  };
}

export async function createServerAuthRuntime({
  project,
  binding,
  prog,
  frontendProg,
  runtimeFacts,
  authUi,
  authSessionDir = "",
  previousAuthRuntime = null,
  forwardedIdentityVerifier = null,
  profile = null,
  now: nowOption,
} = {}) {
  const phase = (name, operation) => typeof profile === "function"
    ? profile(name, operation)
    : operation();
  const pluginProvider = await phase("provider", () => pluginAuthProvider(project, binding, {
    project,
    binding,
    prog,
    frontendProg,
    runtimeFacts,
  }));
  const provider = pluginProvider || await phase("defaultProvider", () => defaultAuthProvider(prog, binding));

  const now = typeof nowOption === "function" ? nowOption : () => Date.now();
  const previousSeed = previousAuthRuntime?.replacementSeed?.() || null;
  const authSessions = phase("sessions", () => previousSeed
      && String(previousSeed.authSessionDir || "") === String(authSessionDir || "")
      && previousSeed.authSessions
      ? previousSeed.authSessions
      : createAuthSessionRepository(authSessionDir, { now }));
  const sessionFromRequest = req => {
    const cookies = parseCookies(req);
    const id = String(cookies[AUTH_COOKIE] || "");
    if (!id) return null;
    const session = authSessions.get(id);
    if (!session || session.expiresAt <= now()) {
      authSessions.delete(id);
      return null;
    }
    return session;
  };
  const forwardedIdentityByRequest = new WeakMap();
  const forwardedIdentityFromRequest = req => {
    if (!forwardedIdentityVerifier) return null;
    if (!req || (typeof req !== "object" && typeof req !== "function")) return forwardedIdentityVerifier.verifyRequest(req);
    if (forwardedIdentityByRequest.has(req)) {
      const result = forwardedIdentityByRequest.get(req);
      if (result instanceof Error) throw result;
      return result;
    }
    try {
      const result = forwardedIdentityVerifier.verifyRequest(req);
      forwardedIdentityByRequest.set(req, result);
      return result;
    } catch (error) {
      forwardedIdentityByRequest.set(req, error);
      throw error;
    }
  };
  const resolveActor = req => {
    const forwardedIdentity = forwardedIdentityFromRequest(req);
    if (forwardedIdentity?.principal) return forwardedIdentity.principal;
    if (forwardedIdentityVerifier) return authUi?.unauthenticatedActor || "";
    const session = sessionFromRequest(req);
    if (session?.actor) return session.actor;
    return actorHeaderFromRequest(req, authUi?.authActorHeaderName) || authUi?.unauthenticatedActor || "";
  };

  const authSessionForActor = actor => {
    const authenticated = actor !== authUi?.unauthenticatedActor && actorExists(prog, actor);
    return {
      authenticated,
      actor: authenticated ? actor : null,
      identifier: authenticated ? (provider.identifierForActor(actor) || null) : null,
      canRead: authenticated && hasResolvedPermission(prog, actor, "read", "rt.state"),
      canWrite: authenticated && hasResolvedPermission(prog, actor, "write", "rt.save"),
      canExecute: authenticated && hasResolvedPermission(prog, actor, "execute", "add"),
    };
  };
  const publicAuthSessionFromServerSession = session => ({
    ...authSessionForActor(session?.actor),
    csrfToken: String(session?.csrfToken || ""),
  });
  const authCookieHeaderForSession = (session, req = {}) => [
    `${AUTH_COOKIE}=${encodeURIComponent(session.id)}; Path=/; ${cookieSecurityAttributes(req)}`,
    `${LEGACY_ACTOR_COOKIE}=; Path=/; Max-Age=0; ${cookieSecurityAttributes(req)}`,
  ];

  return {
    provider,
    replacementSeed() {
      return Object.freeze({ authSessions, authSessionDir: String(authSessionDir || "") });
    },
    resolveActor,
    createAuthSession(actor, identifier = "") {
      authSessions.pruneExpired();
      const id = randomBytes(32).toString("base64url");
      const createdAt = now();
      const session = {
        id,
        actor,
        identifier,
        csrfToken: randomBytes(32).toString("base64url"),
        createdAt,
        expiresAt: createdAt + AUTH_SESSION_TTL_MS,
      };
      return authSessions.set(session);
    },
    cookieAuthSession(req) {
      return sessionFromRequest(req);
    },
    disposeAuthSession(req) {
      const session = sessionFromRequest(req);
      if (session?.id) authSessions.delete(session.id);
    },
    authSessionForActor,
    assertRequestIdentity(req) {
      return forwardedIdentityFromRequest(req);
    },
    currentAuthSession(req) {
      const forwardedIdentity = forwardedIdentityFromRequest(req);
      if (forwardedIdentity?.principal) {
        return {
          ...authSessionForActor(forwardedIdentity.principal),
          identifier: null,
          authenticationSource: "forwarded-host",
          principal: forwardedIdentity.principal,
          identityId: forwardedIdentity.identityId,
          platformPrincipalId: forwardedIdentity.platformPrincipalId,
          issuer: forwardedIdentity.issuer,
          kind: forwardedIdentity.kind,
          assurance: forwardedIdentity.assurance,
          identityRevision: forwardedIdentity.identityRevision,
          principalRevision: forwardedIdentity.principalRevision,
          sessionId: forwardedIdentity.sessionId,
          issuedAt: forwardedIdentity.issuedAt,
          expiresAt: forwardedIdentity.expiresAt,
        };
      }
      if (forwardedIdentityVerifier) return authSessionForActor(authUi?.unauthenticatedActor || "");
      const session = sessionFromRequest(req);
      if (session?.actor) return publicAuthSessionFromServerSession(session);
      return authSessionForActor(resolveActor(req));
    },
    authCookieHeader(actor, identifier = "", req = {}) {
      const session = this.createAuthSession(actor, identifier);
      return authCookieHeaderForSession(session, req);
    },
    authSessionCookie(actor, identifier = "", req = {}) {
      const session = this.createAuthSession(actor, identifier);
      return {
        authSession: publicAuthSessionFromServerSession(session),
        cookieHeaders: authCookieHeaderForSession(session, req),
      };
    },
    clearAuthCookieHeader(req = {}) {
      this.disposeAuthSession(req);
      return [
        `${AUTH_COOKIE}=; Path=/; Max-Age=0; ${cookieSecurityAttributes(req)}`,
        `${LEGACY_ACTOR_COOKIE}=; Path=/; Max-Age=0; ${cookieSecurityAttributes(req)}`,
      ];
    },
  };
}

export function runtimeFromAuthSession(authSession, extra = {}) {
  const canRead = !!authSession.canRead;
  const canWrite = !!authSession.canWrite;
  const canExecute = !!authSession.canExecute;
  return {
    actor: authSession.actor || "",
    identifier: authSession.identifier || "",
    csrfToken: authSession.csrfToken || "",
    canAccessOperator: !!authSession.canAccessOperator,
    canRead,
    canWrite,
    canExecute,
    capabilities: [
      ...(canRead ? ["read"] : []),
      ...(canWrite ? ["write"] : []),
      ...(canExecute ? ["execute"] : []),
    ],
    renderTarget: "server",
    ...extra,
  };
}
