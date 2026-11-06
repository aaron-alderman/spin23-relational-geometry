import { readFileSync } from "node:fs";
import { createAuthoredPolicy } from "file:///C:/Users/aaron/grand-theory/tooling/maintenance/interpreter-performance-2026-11-06/kernel-reference/policy.mjs";

export const authSessionPolicy = createAuthoredPolicy(JSON.parse(readFileSync(new URL("./auth-session-policy.json", import.meta.url), "utf8")));
