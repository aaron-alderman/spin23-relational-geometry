#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { builtinModules } from "node:module";
// Verification tooling is outside the source-only Platform repository.
import { parse } from "../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs";

export const PLATFORM_RUNTIME_PAYLOAD_PROTOCOL = "sourcery/platform-runtime-payload.v1";

const sha256 = value => createHash("sha256").update(value).digest("hex");
const retainedSourceOwners = Object.freeze({
  "@sourcerytech/expression-algebra": "https://github.com/sourcerytech/expression-algebra.git",
  "@sourcerytech/claimipedia-core": "https://github.com/sourcerytech/claimipedia-core.git",
});
export function verifyRetainedSourceProvenance(dependency) {
  if (!Object.hasOwn(retainedSourceOwners, dependency.name)
    || dependency.source !== retainedSourceOwners[dependency.name]
    || !/^[a-f0-9]{40}$/u.test(dependency.sourceCommit || "")
    || !/^[a-f0-9]{40}$/u.test(dependency.sourceTree || "")
    || dependency.payloadHash !== sha256(JSON.stringify(dependency.files))) {
    throw new Error(`Platform retained-source dependency ${dependency.name} provenance is incomplete or mismatched.`);
  }
}
const normalized = value => value.replaceAll("\\", "/");
const packageName = specifier => specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];

async function filesBelow(root, directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(root, path));
    else if (entry.isFile()) files.push(normalized(relative(root, path)));
    else throw new Error(`Platform runtime payload contains a non-regular object: ${normalized(relative(root, path))}.`);
  }
  return files.sort();
}

async function consumerSourceFiles(root, directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ([".git", "node_modules", "runtime-dependency-payloads"].includes(entry.name) || (resolve(directory) === resolve(root) && entry.name === "sdk"))) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await consumerSourceFiles(root, path));
    else if (entry.isFile() && /\.(?:[cm]?js|rel|json)$/u.test(entry.name)) files.push(path);
  }
  return files;
}

export async function discoverPlatformConsumerRequirements(root) {
  const workspaceRoot = resolve(root);
  const runtimeRoot = resolve(workspaceRoot, "node_modules", "@temple2", "platform-sdk");
  const packageManifest = JSON.parse(await readFile(join(runtimeRoot, "package.json"), "utf8"));
  const exports = packageManifest.exports || {};
  const entrypoints = new Set();
  const facts = [];
  const builtins = new Set([...builtinModules, ...builtinModules.map(name => `node:${name}`)]);
  for (const file of await consumerSourceFiles(workspaceRoot)) {
    const source = await readFile(file, "utf8");
    if (file.endsWith(".rel")) {
      const pluginReference = /\(\s*"(?:[^"\\]|\\.)*"\s*,\s*"plugin"\s*,\s*"(?:\.\.\/)*node_modules\/@temple2\/platform-sdk\/([^"\\]+)"/gu;
      for (const match of source.matchAll(pluginReference)) entrypoints.add(match[1]);
      const triple = /\(\s*("(?:[^"\\]|\\.)*")\s*,\s*("(?:[^"\\]|\\.)*")\s*,\s*("(?:[^"\\]|\\.)*")\s*\)/gu;
      for (const match of source.matchAll(triple)) facts.push({ file, subject: JSON.parse(match[1]), predicate: JSON.parse(match[2]), object: JSON.parse(match[3]) });
    }
    if (!/\.[cm]?js$/u.test(file)) continue;
    let ast;
    try { ast = parse(source, { ecmaVersion: "latest", sourceType: "module", allowHashBang: true }); }
    catch (error) { throw new SyntaxError(`Cannot inventory Platform SDK imports in ${normalized(relative(workspaceRoot, file))}: ${error.message}`, { cause: error }); }
    const visit = node => {
      if (!node || typeof node !== "object") return;
      let specifier = null;
      if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && typeof node.source?.value === "string") specifier = node.source.value;
      if (node.type === "ImportExpression" && typeof node.source?.value === "string") specifier = node.source.value;
      if (specifier?.startsWith("@temple2/platform-sdk")) {
        const subpath = specifier === "@temple2/platform-sdk" ? "." : `.${specifier.slice("@temple2/platform-sdk".length)}`;
        const target = exports[subpath];
        if (typeof target !== "string") throw new Error(`Composed source imports unadvertised Platform SDK subpath: ${specifier}.`);
        entrypoints.add(target.replace(/^\.\//u, ""));
      } else if (specifier?.startsWith(".")) {
        const destination = resolve(file, "..", specifier);
        const relativePath = normalized(relative(runtimeRoot, destination));
        if (!relativePath.startsWith("../") && relativePath !== "..") entrypoints.add(relativePath);
      }
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object" && typeof value.type === "string") visit(value);
      }
    };
    visit(ast);
  }
  const bySubject = new Map();
  for (const fact of facts) {
    const predicates = bySubject.get(fact.subject) || new Map();
    const objects = predicates.get(fact.predicate) || new Set();
    objects.add(fact.object); predicates.set(fact.predicate, objects); bySubject.set(fact.subject, predicates);
  }
  const values = (subject, predicate) => [...(bySubject.get(subject)?.get(predicate) || [])];
  const externalDependencies = new Map();
  for (const [subject] of bySubject) {
    if (!values(subject, "isa").includes("ExecutableDependency") || !values(subject, "scope").includes("externalPackage")) continue;
    const specifiers = values(subject, "specifier");
    if (specifiers.length !== 1 || packageName(specifiers[0]) !== specifiers[0]) throw new Error(`Executable dependency ${subject} has an invalid external package specifier.`);
    if (externalDependencies.has(subject)) throw new Error(`Executable dependency ${subject} is duplicated.`);
    externalDependencies.set(subject, specifiers[0]);
  }
  const bareDependencies = new Set();
  for (const [subject, predicates] of bySubject) {
    const linked = [...(predicates.get("dependency") || [])].filter(dependency => externalDependencies.has(dependency));
    if (!linked.length) continue;
    if (!values(subject, "isa").includes("ExecutableArtifact")) throw new Error(`External package dependency is linked from a non-executable artifact: ${subject}.`);
    const artifactFiles = values(subject, "artifactFile");
    if (artifactFiles.length !== 1 || artifactFiles[0].includes("\\") || artifactFiles[0].split("/").some(segment => !segment || segment === "." || segment === "..")) throw new Error(`Executable artifact ${subject} has an invalid source path.`);
    const artifactFile = resolve(workspaceRoot, ...artifactFiles[0].split("/"));
    const artifactSource = await readFile(artifactFile, "utf8");
    const ast = parse(artifactSource, { ecmaVersion: "latest", sourceType: "module", allowHashBang: true });
    const observed = new Set();
    const visit = node => {
      if (!node || typeof node !== "object") return;
      if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && typeof node.source?.value === "string") {
        const specifier = node.source.value;
        if (!specifier.startsWith(".") && !specifier.startsWith("node:") && !builtins.has(specifier) && !/^[a-z][a-z0-9+.-]*:/iu.test(specifier)) observed.add(packageName(specifier));
      }
      if (node.type === "ImportExpression" && node.source?.type === "Literal" && typeof node.source.value === "string") {
        const specifier = node.source.value;
        if (!specifier.startsWith(".") && !specifier.startsWith("node:") && !builtins.has(specifier) && !/^[a-z][a-z0-9+.-]*:/iu.test(specifier)) observed.add(packageName(specifier));
      }
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object" && typeof value.type === "string") visit(value);
      }
    };
    visit(ast);
    const declared = new Set(linked.map(dependency => externalDependencies.get(dependency)));
    for (const specifier of declared) {
      if (!observed.has(specifier)) throw new Error(`Executable artifact ${subject} declares ${specifier} but does not statically import it.`);
      bareDependencies.add(specifier);
    }
    for (const specifier of observed) if (!declared.has(specifier)) throw new Error(`Executable artifact ${subject} statically imports undeclared external package: ${specifier}.`);
  }
  return Object.freeze({ entrypoints: Object.freeze([...entrypoints].sort()), bareDependencies: Object.freeze([...bareDependencies].sort()) });
}

export async function discoverPlatformConsumerEntrypoints(root) {
  return (await discoverPlatformConsumerRequirements(root)).entrypoints;
}

export async function verifyPlatformRuntime(root, { consumerEntrypoints = [], consumerBareDependencies = [], dependencyPath = "runtime-dependency-payloads", runtimePath = "sdk" } = {}) {
  const runtimeRoot = resolve(root, ...runtimePath.split("/"));
  const manifestFile = join(runtimeRoot, "SOURCERY-PAYLOAD.json");
  const manifest = JSON.parse(await readFile(manifestFile, "utf8"));
  if (manifest.protocol !== PLATFORM_RUNTIME_PAYLOAD_PROTOCOL) throw new Error("Unsupported platform runtime payload protocol.");
  const expected = manifest.files.map(({ path, contentHash, bytes }) => ({ path, contentHash, bytes }));
  if (sha256(JSON.stringify(expected)) !== manifest.payloadHash) throw new Error("Platform runtime payload manifest digest is invalid.");
  const actualPaths = (await filesBelow(runtimeRoot)).filter(path => path !== "SOURCERY-PAYLOAD.json");
  if (JSON.stringify(actualPaths) !== JSON.stringify(expected.map(file => file.path))) throw new Error("Platform runtime payload file inventory is incomplete or contains unadmitted files.");
  for (const file of expected) {
    const bytes = await readFile(join(runtimeRoot, ...file.path.split("/")));
    if (bytes.length !== file.bytes || sha256(bytes) !== file.contentHash) throw new Error(`Platform runtime payload object is stale or tampered: ${file.path}.`);
  }
  const dependencyManifest = JSON.parse(await readFile(resolve(root, "runtime-dependencies.json"), "utf8"));
  if (dependencyManifest.protocol !== "sourcery/platform-runtime-dependencies.v2") throw new Error("Unsupported platform runtime dependencies protocol.");
  const target = dependencyManifest.target;
  if (!target || target.os !== "linux" || target.cpu !== "x64" || target.libc !== "glibc" || target.minimumLibcVersion !== "2.28" || target.node !== ">=20.9.0") throw new Error("Platform runtime dependency target is missing or unsupported.");
  const recovery = dependencyManifest.recoveryEvidence;
  if (!recovery || recovery.kind !== "read-only-production-runtime-recovery" || !/^20\d\d-[^\s]+Z$/u.test(recovery.observedAt || "") || recovery.sourcePath !== "/srv/sourcery/live/node_modules" || !/^[a-f0-9]{64}$/u.test(recovery.lockfileSha256 || "") || recovery.runtime?.node !== "v24.18.0" || recovery.runtime?.napi !== "10" || recovery.runtime?.cpu !== "x86_64" || recovery.runtime?.libc !== "glibc" || recovery.runtime?.libcVersion !== "2.43") throw new Error("Platform runtime recovery evidence is missing or invalid.");
  const declaredDependencies = new Map(dependencyManifest.dependencies.map(dependency => [dependency.name, dependency]));
  const dependencies = [];
  for (const dependency of dependencyManifest.dependencies) {
    if (dependency.availability === "optional-not-admitted") {
      dependencies.push({ name: dependency.name, availability: dependency.availability, loadMode: dependency.loadMode });
      continue;
    }
    if (dependency.sourceKind === "retained-git-source") {
      verifyRetainedSourceProvenance(dependency);
    } else if (!dependency.source || (!dependency.archiveIntegrity && !dependency.archiveSha512) || !dependency.license) throw new Error(`Platform runtime dependency ${dependency.name} provenance is incomplete.`);
    const dependencyRoot = resolve(root, ...dependencyPath.split("/"), ...dependency.name.split("/"));
    const expectedDependencyPaths = dependency.files.map(file => file.path);
    if (JSON.stringify(await filesBelow(dependencyRoot)) !== JSON.stringify(expectedDependencyPaths)) throw new Error(`Platform runtime dependency ${dependency.name} inventory is incomplete or contains unadmitted files.`);
    for (const file of dependency.files) {
      const bytes = await readFile(join(dependencyRoot, ...file.path.split("/")));
      if (bytes.length !== file.bytes || sha256(bytes) !== file.contentHash) throw new Error(`Platform runtime dependency is stale or tampered: ${dependency.name}/${file.path}.`);
    }
    const packageManifest = JSON.parse(await readFile(join(dependencyRoot, "package.json"), "utf8"));
    if (packageManifest.name !== dependency.name || packageManifest.version !== dependency.version || packageManifest.license !== dependency.license) throw new Error(`Platform runtime dependency ${dependency.name} package identity is stale or mismatched.`);
    if (dependency.platform) {
      for (const field of ["os", "cpu", "libc"]) {
        if (dependency.platform[field] !== target[field] || !Array.isArray(packageManifest[field]) || !packageManifest[field].includes(target[field])) throw new Error(`Platform runtime dependency ${dependency.name} ${field} constraint does not match the admitted target.`);
      }
      if (dependency.platform.minimumLibcVersion !== target.minimumLibcVersion || packageManifest.config?.glibc !== `>=${target.minimumLibcVersion}`) throw new Error(`Platform runtime dependency ${dependency.name} libc floor does not match the admitted target.`);
      if (dependency.platform.node !== target.node) throw new Error(`Platform runtime dependency ${dependency.name} Node constraint does not match the admitted target.`);
      if (packageManifest.engines?.node && packageManifest.engines.node !== target.node) throw new Error(`Platform runtime dependency ${dependency.name} Node engine does not match the admitted target.`);
    }
    for (const required of dependency.requires || []) {
      const admitted = declaredDependencies.get(required.name);
      if (!admitted || admitted.availability === "optional-not-admitted" || admitted.version !== required.version) throw new Error(`Platform runtime dependency ${dependency.name} requires an unadmitted or mismatched dependency: ${required.name}@${required.version}.`);
    }
    dependencies.push({ name: dependency.name, version: dependency.version, fileCount: dependency.files.length, payloadHash: sha256(JSON.stringify(dependency.files)) });
  }
  const builtins = new Set([...builtinModules, ...builtinModules.map(name => `node:${name}`)]);
  const packageManifest = JSON.parse(await readFile(join(runtimeRoot, "package.json"), "utf8"));
  const exportTargets = Object.values(packageManifest.exports || {}).flatMap(target => {
    if (typeof target === "string") return [target];
    if (target && typeof target === "object") return Object.values(target).filter(value => typeof value === "string");
    return [];
  }).map(target => target.replace(/^\.\//u, ""));
  for (const target of exportTargets) {
    if (!actualPaths.includes(target)) throw new Error(`Platform runtime package export is missing: ${target}.`);
  }
  const missingImports = [];
  const missingSemanticResources = [];
  const bareImports = new Map();
  const importsByFile = new Map();
  const resourcesByFile = new Map();
  for (const file of expected.filter(item => /\.[cm]?js$/u.test(item.path))) {
    const source = await readFile(join(runtimeRoot, ...file.path.split("/")), "utf8");
    const ast = parse(source, { ecmaVersion: "latest", sourceType: "module" });
    const imports = [];
    const visit = node => {
      if (!node || typeof node !== "object") return;
      if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && typeof node.source?.value === "string") imports.push({ specifier: node.source.value, mode: "static" });
      if (node.type === "ImportExpression" && typeof node.source?.value === "string") imports.push({ specifier: node.source.value, mode: "dynamic" });
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object" && typeof value.type === "string") visit(value);
      }
    };
    visit(ast);
    importsByFile.set(file.path, imports);
  }
  for (const file of expected.filter(item => item.path.endsWith(".rel"))) {
    const source = await readFile(join(runtimeRoot, ...file.path.split("/")), "utf8");
    const resources = [];
    const pattern = /\(\s*"(?:[^"\\]|\\.)*"\s*,\s*"(?:file|projectionRuntimeFile|frontendRuntimeFile|semanticMutationRuntimeFile)"\s*,\s*"((?:[^"\\]|\\.)*)"/gu;
    for (const match of source.matchAll(pattern)) {
      const value = JSON.parse(`"${match[1]}"`);
      if (typeof value !== "string" || !/\.[A-Za-z0-9_-]+$/u.test(value) || value.includes("\\") || value.split("/").some(segment => !segment || segment === ".")) continue;
      resources.push(value);
    }
    resourcesByFile.set(file.path, resources);
  }
  for (const entrypoint of consumerEntrypoints) {
    if (typeof entrypoint !== "string" || entrypoint.startsWith("../") || !actualPaths.includes(entrypoint)) throw new Error(`Composed source references missing Platform SDK path: ${entrypoint}.`);
  }
  for (const name of consumerBareDependencies) {
    if (typeof name !== "string" || packageName(name) !== name) throw new Error(`Composed source contains an invalid bare dependency name: ${name}.`);
    // Consumer discovery proves that the package is declared by an executable
    // artifact, but it does not by itself prove how the assembled runtime
    // reaches it. Keep that declaration distinct from observed static or
    // dynamic imports so optional dynamic-only dependencies remain valid.
    bareImports.set(name, new Set(["declared"]));
  }
  const reachable = new Set();
  const pending = [...new Set([...exportTargets, ...consumerEntrypoints])].sort();
  while (pending.length) {
    const file = pending.shift();
    if (reachable.has(file)) continue;
    reachable.add(file);
    for (const imported of importsByFile.get(file) || []) {
      const specifier = imported.specifier;
      if (specifier.startsWith(".")) {
        const destination = resolve(join(runtimeRoot, ...file.split("/").slice(0, -1)), specifier);
        const destinationPath = normalized(relative(runtimeRoot, destination));
        if (!actualPaths.includes(destinationPath)) missingImports.push(`${file} -> ${specifier}`);
        else if (importsByFile.has(destinationPath) && !reachable.has(destinationPath)) pending.push(destinationPath);
      } else if (!specifier.startsWith("node:") && !builtins.has(specifier)) {
        const importedPackage = packageName(specifier);
        const modes = bareImports.get(importedPackage) || new Set();
        modes.add(imported.mode);
        bareImports.set(importedPackage, modes);
      }
    }
    for (const resource of resourcesByFile.get(file) || []) {
      const destination = resolve(join(runtimeRoot, ...file.split("/").slice(0, -1)), resource);
      const destinationPath = normalized(relative(runtimeRoot, destination));
      if (destinationPath === ".." || destinationPath.startsWith("../") || !actualPaths.includes(destinationPath)) missingSemanticResources.push(`${file} -> ${resource}`);
      else if (!reachable.has(destinationPath)) pending.push(destinationPath);
    }
  }
  if (missingImports.length) throw new Error(`Platform runtime payload has unresolved relative imports: ${missingImports.slice(0, 10).join(", ")}.`);
  if (missingSemanticResources.length) throw new Error(`Platform runtime payload has unresolved semantic resources: ${missingSemanticResources.slice(0, 10).join(", ")}.`);
  for (const [packageName, modes] of bareImports) {
    const declaration = declaredDependencies.get(packageName);
    if (!declaration) throw new Error(`Platform runtime payload has an undeclared bare dependency: ${packageName}.`);
    if (declaration.availability === "optional-not-admitted" && (declaration.loadMode !== "dynamic-only" || modes.has("static"))) throw new Error(`Optional platform dependency ${packageName} is not confined to dynamic imports.`);
  }
  return Object.freeze({
    protocol: "sourcery/platform-runtime-payload-proof.v2",
    payloadHash: manifest.payloadHash,
    fileCount: expected.length,
    byteCount: expected.reduce((sum, file) => sum + file.bytes, 0),
    dependencies: Object.freeze(dependencies),
    importClosure: Object.freeze({ relativeImports: "resolved", semanticResources: "resolved", bareDependencies: Object.freeze([...bareImports.keys()].sort()), packageExports: "resolved", consumerEntrypoints: consumerEntrypoints.length, consumerBareDependencies: consumerBareDependencies.length, reachableFiles: reachable.size, reachableSemanticFiles: [...reachable].filter(path => path.endsWith(".rel")).length }),
    valid: true,
  });
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const root = resolve(process.argv[2] || ".");
  process.stdout.write(`${JSON.stringify(await verifyPlatformRuntime(root), null, 2)}\n`);
}
