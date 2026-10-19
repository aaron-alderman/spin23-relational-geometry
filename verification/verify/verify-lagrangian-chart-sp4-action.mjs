#!/usr/bin/env node

// Exact integer examples for the Sp(4,R) fractional action on the big cell
// of the Lagrangian Grassmannian, coordinatized by Sym_2(R).

const add = (a, b) => a.map((r, i) => r.map((x, j) => x + b[i][j]));
const scale = (k, a) => a.map((r) => r.map((x) => k * x));
const transpose = (a) => a[0].map((_, j) => a.map((r) => r[j]));
const mul = (a, b) => a.map((r) => b[0].map((_, j) => r.reduce((s, x, k) => s + x * b[k][j], 0)));
const equal = (a, b) => a.every((r, i) => r.every((x, j) => x === b[i][j]));
const zero = (n, m = n) => Array.from({length:n}, () => Array(m).fill(0));
const I = [[1,0],[0,1]];
const Z = zero(2);
const block = (a,b,c,d) => [[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const Omega = block(Z,I,scale(-1,I),Z);
const inverse2 = (a) => {
  const det = a[0][0]*a[1][1]-a[0][1]*a[1][0];
  if (det !== 1 && det !== -1) throw new Error(`example requires unimodular denominator, got ${det}`);
  return scale(det, [[a[1][1],-a[0][1]],[-a[1][0],a[0][0]]]);
};
const symplectic = (g) => equal(mul(mul(transpose(g),Omega),g),Omega);
const symmetric = (x) => equal(x,transpose(x));
const split = (g) => ({a:g.slice(0,2).map(r=>r.slice(0,2)),b:g.slice(0,2).map(r=>r.slice(2)),c:g.slice(2).map(r=>r.slice(0,2)),d:g.slice(2).map(r=>r.slice(2))});
const fractional = (g,x) => { const {a,b,c,d}=split(g); return mul(add(c,mul(d,x)),inverse2(add(a,mul(b,x)))); };
const graph = (x) => [[1,0],[0,1],[...x[0]],[...x[1]]];
const isotropic = (l) => equal(mul(mul(transpose(l),Omega),l),Z);

const C = [[1,2],[2,0]];
const B = [[0,0],[0,1]];
const G = [[1,1],[0,1]];
const GinvT = transpose(inverse2(G));
const gTranslation = block(I,Z,C,I);
const gLinear = block(G,Z,Z,GinvT);
const gQuadratic = block(I,B,Z,I);
const x0 = [[0,1],[1,0]];

const cases = [
  {name:"translation",g:gTranslation,x:x0,expected:add(x0,C)},
  {name:"linear",g:gLinear,x:x0,expected:mul(mul(GinvT,x0),inverse2(G))},
  {name:"quadratic/fractional",g:gQuadratic,x:x0,expected:[[-1,1],[1,0]]},
];

const results = cases.map(({name,g,x,expected}) => {
  const out = fractional(g,x);
  const transformedGraph = mul(g,graph(x));
  return {
    name,
    symplectic: symplectic(g),
    inputLagrangian: isotropic(graph(x)),
    transformedLagrangian: isotropic(transformedGraph),
    outputSymmetric: symmetric(out),
    expectedAction: equal(out,expected),
    output: out,
  };
});

const report = {
  protocol:"lagrangian-big-cell-sp4-action/1",
  carrier:"Sym_2(R) as graphs p=Xq in Lag(R^4)",
  action:"X -> (c+dX)(a+bX)^(-1)",
  cases:results,
  passed:results.every(r=>r.symplectic&&r.inputLagrangian&&r.transformedLagrangian&&r.outputSymmetric&&r.expectedAction),
};
console.log(JSON.stringify(report,null,2));
if(!report.passed) process.exitCode=1;
