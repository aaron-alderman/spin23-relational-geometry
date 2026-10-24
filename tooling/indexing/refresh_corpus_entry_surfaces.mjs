import { spawnSync } from "node:child_process";

const write = process.argv.includes("--write");
const maxRounds = 6;

function run(script, args = [], capture = false) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  });
  if (result.error) throw result.error;
  return result;
}

const manifestScript = "tooling/audit/audit_spin23_corpus_manifest.mjs";
const evidenceScript = "tooling/indexing/generate_corpus_evidence_spine.mjs";
const frontDoorScript = "tooling/indexing/generate_corpus_front_door.mjs";

if (!write) {
  const results = [
    run(manifestScript, [], true),
    run(evidenceScript, ["--check"], true),
    run(frontDoorScript, ["--check"], true),
  ];
  for (const result of results) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }
  if (results.some(result => result.status !== 0)) process.exitCode = 1;
} else {
  const manifest = run(manifestScript, ["--write"]);
  if (manifest.status !== 0) process.exit(manifest.status ?? 1);

  let converged = false;
  let rounds = 0;
  for (rounds = 1; rounds <= maxRounds; rounds += 1) {
    const evidenceWrite = run(evidenceScript, ["--write"], true);
    const frontDoorWrite = run(frontDoorScript, ["--write"], true);
    if (evidenceWrite.status !== 0 || frontDoorWrite.status !== 0) {
      if (evidenceWrite.stdout) process.stdout.write(evidenceWrite.stdout);
      if (evidenceWrite.stderr) process.stderr.write(evidenceWrite.stderr);
      if (frontDoorWrite.stdout) process.stdout.write(frontDoorWrite.stdout);
      if (frontDoorWrite.stderr) process.stderr.write(frontDoorWrite.stderr);
      process.exit(1);
    }

    const evidenceCheck = run(evidenceScript, ["--check"], true);
    const frontDoorCheck = run(frontDoorScript, ["--check"], true);
    if (evidenceCheck.status === 0 && frontDoorCheck.status === 0) {
      converged = true;
      break;
    }
  }

  console.log(JSON.stringify({
    result: converged ? "pass" : "failed_to_converge",
    rounds,
    maxRounds,
    surfaces: [
      "corpus/registers/spin23_corpus_manifest.json",
      "corpus/registers/corpus_evidence_spine.json",
      "corpus/EVIDENCE_SPINE.md",
      "corpus/registers/corpus_front_door.json",
      "corpus/FRONT_DOOR.md",
    ],
  }, null, 2));
  if (!converged) process.exitCode = 1;
}
