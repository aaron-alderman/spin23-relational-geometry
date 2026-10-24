import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledgerPath = path.join(
  root,
  "corpus/programmes/frontier/wave-7/monster_lean_hecke_commutant_audit_v1.json",
);
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const expectedMonsterPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 47, 59, 71];
const listed = ledger.monsterLeanAudit.declaredPrimeList;
const actual = ledger.monsterLeanAudit.actualMonsterPrimeDivisors;
const extras = listed.filter((prime) => !actual.includes(prime));

if (listed.length !== ledger.monsterLeanAudit.declaredPrimeListLength) {
  throw new Error("declared prime-list length mismatch");
}
if (JSON.stringify(actual) !== JSON.stringify(expectedMonsterPrimes)) {
  throw new Error("Monster prime-divisor list mismatch");
}
if (JSON.stringify(extras) !== JSON.stringify(ledger.monsterLeanAudit.nonMonsterEntries)) {
  throw new Error("non-Monster prime audit mismatch");
}
if (ledger.monsterLeanAudit.declaredPrimeListLength === 71) {
  throw new Error("the audited source list is not length 71");
}

const hecke = ledger.w33Hecke;
const dimension = hecke.scalarBlocks + 4 * hecke.matrix2Blocks + 9 * hecke.matrix3Blocks;
const centerDimension = hecke.scalarBlocks + hecke.matrix2Blocks + hecke.matrix3Blocks;
const commutatorDimension = dimension - centerDimension;
if (dimension !== hecke.dimension) throw new Error("Wedderburn dimension mismatch");
if (centerDimension !== hecke.centerDimension) throw new Error("center dimension mismatch");
if (commutatorDimension !== hecke.commutatorDimension) {
  throw new Error("commutator dimension mismatch");
}
if (ledger.bridge.commonCarrierEstablished || ledger.bridge.algebraIdentityEstablished) {
  throw new Error("audit boundary was improperly promoted");
}
if (ledger.claimipedia.linearAlgebraAlreadyDeclared) {
  throw new Error("Claimipedia relation records were improperly promoted to a linear algebra");
}

console.log(
  JSON.stringify({
    status: "PASS",
    listedPrimeCount: listed.length,
    nonMonsterEntries: extras,
    w33HeckeDimension: dimension,
    w33CenterDimension: centerDimension,
    w33CommutatorDimension: commutatorDimension,
    promotionWithheld: true,
  }),
);
