import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const mul = (a, b) => a.map((row) => b[0].map((_, j) => mod(row.reduce((sum, x, k) => sum + x * b[k][j], 0))));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const key = (a) => a.flat().join("");
const I = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const J = [[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]].map((row) => row.map(mod));
const symplectic = (a) => equal(mul(mul(transpose(a), J), a), J);
const closure = (generators) => {
  for (const generator of generators) assert(symplectic(generator));
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
  return seen;
};

const P1 = [[1,0,0,0],[0,1,0,0],[1,0,1,0],[0,0,0,1]];
const P2 = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,1,0,1]];
const F1 = [[0,0,-1,0],[0,1,0,0],[1,0,0,0],[0,0,0,1]].map((row) => row.map(mod));
const F2 = [[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,0]].map((row) => row.map(mod));
const Swap = [[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const Cross = [[1,0,0,0],[0,1,0,0],[0,1,1,0],[1,0,0,1]];

const productLocal = closure([P1,P2,F1,F2]);
const imprimitive = closure([P1,P2,F1,F2,Swap]);
const completed = closure([P1,P2,F1,F2,Swap,Cross]);
const expectedSp4 = p ** 4 * (p ** 2 - 1) * (p ** 4 - 1);

assert.equal(productLocal.size, 24 ** 2);
assert.equal(imprimitive.size, 2 * 24 ** 2);
assert.equal(completed.size, expectedSp4);
assert.equal(expectedSp4 / imprimitive.size, 45);
assert(!imprimitive.has(key(Cross)));
assert(completed.has(key(Cross)));

console.log("One cross-port shear completes the two-port group: PASS");
console.log("independent_local_group=SL2_F3_x_SL2_F3_order_576");
console.log("with_port_swap=wreath_imprimitive_order_1152");
console.log("index_in_Sp4_F3=45");
console.log("add_symmetric_cross_shear_generates_full_Sp4_F3_order_51840");
console.log("minimal_missing_relation=off_diagonal_symmetric_K12_coupling");
