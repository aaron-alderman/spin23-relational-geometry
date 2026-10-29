import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "corpus", "programmes", "open-letters", "letter_manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

assert.equal(manifest.schema, "admissibility-frontier-open-letters/v1");
assert.equal(manifest.letters.length, 3);
assert(/does not imply/i.test(manifest.authorityBoundary));

const slugs = new Set();
const recipients = new Set();
for (const letter of manifest.letters) {
  assert(!slugs.has(letter.slug), "duplicate letter slug");
  assert(!recipients.has(letter.recipient), "duplicate letter recipient");
  slugs.add(letter.slug);
  recipients.add(letter.recipient);
  assert.equal(letter.status, "draft");
  assert(letter.question.length > 60);
  const sourcePath = path.join(root, letter.source);
  assert(fs.existsSync(sourcePath), "missing source " + letter.source);
  const source = fs.readFileSync(sourcePath, "utf8");
  assert(source.length > 1000, "truncated source " + letter.source);
  assert(/not sent/i.test(source), "draft lacks unsent declaration");
}

for (const recipient of ["Cohl Furey", "Lisa Randall", "Eric Weinstein"]) assert(recipients.has(recipient));

const generator = fs.readFileSync(path.join(root, "tooling", "publication", "generate_edition3_book_preview.mjs"), "utf8");
for (const token of ["siteLettersRoot", "lettersIndexHtml", "letterHtml", "Three unsent letters"]) {
  assert(generator.includes(token), "publication generator lacks " + token);
}
assert(!generator.includes('<a href="letters/index.html">Letters</a>'), "letters must not occupy the global mast");
assert(!generator.includes('<a href="../letters/index.html">Letters</a>'), "letters must not occupy nested masts");

console.log("PASS open-letters publication");
console.log("letters=" + manifest.letters.length + " statuses=" + [...new Set(manifest.letters.map(letter => letter.status))].join(","));
