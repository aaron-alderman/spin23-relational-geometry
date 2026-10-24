import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const mul = (a, b) => a.map((row) => b[0].map((_, j) => mod(row.reduce((sum, x, k) => sum + x * b[k][j], 0))));
const act = (a, v) => a.map((row) => mod(row.reduce((sum, x, i) => sum + x * v[i], 0)));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const key = (a) => a.flat().join("");
const vectorKey = (v) => v.join("");
const equal = (a, b) => key(a) === key(b);
const I = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const J = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]].map((row) => row.map(mod));
const symplectic = (a) => equal(mul(mul(transpose(a), J), a), J);

const P1 = [[1, 0, 0, 0], [0, 1, 0, 0], [1, 0, 1, 0], [0, 0, 0, 1]];
const P2 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
const Cross = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [1, 0, 0, 1]];
const Swap = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
const F1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1]].map((row) => row.map(mod));
const F2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 0]].map((row) => row.map(mod));

function closure(generators) {
  generators.forEach((generator) => assert(symplectic(generator)));
  const seen = new Map([[key(I), I]]);
  const queue = [I];
  for (let head = 0; head < queue.length; head += 1) {
    for (const generator of generators) {
      const next = mul(queue[head], generator);
      const k = key(next);
      if (!seen.has(k)) {
        seen.set(k, next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
}

function orbit(group, seed) {
  return new Set(group.map((g) => vectorKey(act(g, seed))));
}

function preservesXUpToSwap(group) {
  return group.every((g) => {
    const x1 = act(g, [1, 0, 0, 0]).slice(0, 2).join("");
    const x2 = act(g, [0, 1, 0, 0]).slice(0, 2).join("");
    return (x1 === "10" && x2 === "01") || (x1 === "01" && x2 === "10");
  });
}

const alphabets = {
  sourceNative: closure([P1, P2, Swap]),
  sourceLabelledCompiled: closure([P1, P2, Cross, Swap]),
  importedLocalDualities: closure([P1, P2, F1, F2, Swap]),
  universalCliffordCompletion: closure([P1, P2, Cross, F1, F2, Swap]),
};

assert.equal(alphabets.sourceNative.length, 18);
assert.equal(alphabets.sourceLabelledCompiled.length, 54);
assert.equal(alphabets.importedLocalDualities.length, 1152);
assert.equal(alphabets.universalCliffordCompletion.length, 51840);

assert(preservesXUpToSwap(alphabets.sourceNative));
assert(preservesXUpToSwap(alphabets.sourceLabelledCompiled));
assert(!preservesXUpToSwap(alphabets.importedLocalDualities));
assert(!preservesXUpToSwap(alphabets.universalCliffordCompletion));

const pureZ = [0, 0, 1, 0];
const pureX = [1, 0, 0, 0];
const orbitSizes = Object.fromEntries(Object.entries(alphabets).map(([name, group]) => [name, {
  pureZ: orbit(group, pureZ).size,
  pureX: orbit(group, pureX).size,
} ]));

assert.deepEqual(orbitSizes.sourceNative, { pureZ: 2, pureX: 6 });
assert.deepEqual(orbitSizes.sourceLabelledCompiled, { pureZ: 2, pureX: 18 });
assert.deepEqual(orbitSizes.importedLocalDualities, { pureZ: 16, pureX: 16 });
assert.deepEqual(orbitSizes.universalCliffordCompletion, { pureZ: 80, pureX: 80 });

const allNonzeroVectors = p ** 4 - 1;
assert.equal(allNonzeroVectors, 80);
assert.equal(orbitSizes.universalCliffordCompletion.pureX, allNonzeroVectors);

console.log("Source-restricted logical-generator boundary: PASS");
console.log("maximal_source_visible=P1,P2,Swap;order=18;pure_Z_orbit=2;pure_X_orbit=6");
console.log("add_source_labelled_compiled_Cross;order=54;pure_Z_orbit=2;pure_X_orbit=18");
console.log("import_local_Fourier_without_Cross;order=1152;pure_X_and_pure_Z_orbits=16");
console.log("add_Cross_and_local_Fourier;order=51840;nonzero_vector_orbit=80=all_nonzero_vectors");
console.log("restricted_shear_alphabets_preserve_X_polarization_up_to_port_swap=true");
console.log("full_Sp4_F3_appears_only_after_both_cross_coupling_and_imported_polarization_change=true");
