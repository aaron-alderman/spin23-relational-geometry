import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildSpin23OpenLetters, SPIN23_OPEN_LETTERS_API, SPIN23_OPEN_LETTERS_ROUTE } from "../applications/claimipedia/spin-2-3-open-letters.mjs";
import { spin23OpenLettersPage } from "../applications/claimipedia/spin-2-3-open-letters-page.mjs";

test("open technical letters expose bounded, non-authoritative outreach", () => {
  const model = buildSpin23OpenLetters();
  assert.equal(SPIN23_OPEN_LETTERS_ROUTE, "/physics/spin-2-3/edition-3/open-letters");
  assert.equal(SPIN23_OPEN_LETTERS_API, "/api/physics/spin-2-3/edition-3/open-letters");
  assert.equal(model.letters.length, 8);
  assert.ok(model.letters.every(letter => letter.question && letter.advanceIf && letter.stopIf && letter.request));
  assert.ok(model.letters.every(letter => letter.profileUrl.startsWith("https://")));
  assert.match(model.boundary, /not claims of correspondence/i);
  assert.match(model.boundary, /Silence carries no evidential weight/i);
  assert.equal(buildSpin23OpenLetters({ gate: "A5" }).letters.length >= 2, true);
});

test("page renders the correspondence boundary and all letters", () => {
  const html = spin23OpenLettersPage(buildSpin23OpenLetters());
  assert.match(html, /Outreach as research/i);
  assert.match(html, /Correction before endorsement/i);
  assert.match(html, /silence ≠ evidence/i);
  assert.match(html, /OL-001/);
  assert.match(html, /OL-008/);
});

test("server and route grammar expose the page and API", async () => {
  const [server, routes] = await Promise.all([
    readFile(new URL("../applications/claimipedia/server.mjs", import.meta.url), "utf8"),
    readFile(new URL("../applications/claimipedia/routes.frontend.rel", import.meta.url), "utf8")
  ]);
  assert.match(server, /SPIN23_OPEN_LETTERS_ROUTE/);
  assert.match(server, /SPIN23_OPEN_LETTERS_API/);
  assert.match(routes, /physics\/spin-2-3\/edition-3\/open-letters/);
});
