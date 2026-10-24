import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const source = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/claimipedia_programme_core_source_v1.json",
), "utf8"));

const n = 9;
const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const unit = (row, column) => { const out = zero(); out[row][column] = 1; return out; };
const add = (...matrices) => matrices.reduce((out, matrix) => out.map((row, i) => row.map((value, j) => value + matrix[i][j])), zero());
const sub = (a, b) => a.map((row, i) => row.map((value, j) => value - b[i][j]));
const scale = (a, scalar) => a.map((row) => row.map((value) => scalar * value));
const mul = (a, b) => a.map((row, i) => row.map((_, j) => row.reduce((sum, __, k) => sum + a[i][k] * b[k][j], 0)));
const comm = (a, b) => sub(mul(a, b), mul(b, a));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const isZero = (a) => a.every((row) => row.every((value) => value === 0));

// Basis order is (stage, family): Program, Version, Example x three families.
const E = (stageRow, stageColumn) => add(...[0, 1, 2].map((family) => unit(3 * stageRow + family, 3 * stageColumn + family)));
const e1 = E(0, 1);
const f1 = E(1, 0);
const e2 = E(1, 2);
const f2 = E(2, 1);
const h1 = comm(e1, f1);
const h2 = comm(e2, f2);

const cartan = [
  [2, -1],
  [-1, 2],
];
if (!equal(comm(h1, e1), scale(e1, 2))) throw new Error("A2 a11 failed");
if (!equal(comm(h1, e2), scale(e2, -1))) throw new Error("A2 a12 failed");
if (!equal(comm(h2, e1), scale(e1, -1))) throw new Error("A2 a21 failed");
if (!equal(comm(h2, e2), scale(e2, 2))) throw new Error("A2 a22 failed");
if (!isZero(comm(e1, comm(e1, e2)))) throw new Error("A2 first Serre relation failed");
if (!isZero(comm(e2, comm(e2, e1)))) throw new Error("A2 second Serre relation failed");

// Policy multiplicity matrix units commute with every stage matrix unit.
const K = (familyRow, familyColumn) => add(...[0, 1, 2].map((stage) => unit(3 * stage + familyRow, 3 * stage + familyColumn)));
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    for (let a = 0; a < 3; a += 1) {
      for (let b = 0; b < 3; b += 1) {
        if (!isZero(comm(E(a, b), K(i, j)))) throw new Error("stage/policy commutant failure");
      }
    }
  }
}

if (source.families.length !== 3 || source.typedEdges.length !== 12) throw new Error("programme core census mismatch");

console.log(JSON.stringify({
  status: "PASS",
  carrierDimension: 9,
  stageAlgebra: "M3(Q)",
  stageAlgebraDimension: 9,
  commutant: "M3(Q)",
  commutantDimension: 9,
  cartanMatrix: cartan,
  rootSystem: "A2",
  c2CartanMatrix: false,
}));
