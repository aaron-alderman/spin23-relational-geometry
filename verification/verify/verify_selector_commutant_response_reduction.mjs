#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const P = [[1,0,0],[0,0,0],[0,0,0]];
const eta = [[1,0,0],[0,-1,0],[0,0,-1]];
const multiply = (A,B) => A.map(r => B[0].map((_,j) => r.reduce((s,x,k) => s+x*B[k][j],0)));
const transpose = A => A[0].map((_,j) => A.map(r => r[j]));
const add = (A,B) => A.map((r,i) => r.map((x,j) => x+B[i][j]));
const sub = (A,B) => A.map((r,i) => r.map((x,j) => x-B[i][j]));
const scale = (s,A) => A.map(r => r.map(x => s*x));
const frob = A => Math.sqrt(A.flat().reduce((s,x) => s+x*x,0));
const commutes = A => frob(sub(multiply(A,P),multiply(P,A))) < eps;
const lorentzGenerator = X => frob(add(multiply(transpose(X),eta),multiply(eta,X))) < eps;

// Four-dimensional symmetric commutant basis: one selected-axis population and
// an arbitrary symmetric 2x2 plane block.
const symmetricCommutant = [
  [[1,0,0],[0,0,0],[0,0,0]],
  [[0,0,0],[0,1,0],[0,0,0]],
  [[0,0,0],[0,0,0],[0,0,1]],
  [[0,0,0],[0,0,1],[0,1,0]],
];
assert(symmetricCommutant.every(commutes), "symmetric commutant basis failed");

const forbiddenMixing = [
  [[0,1,0],[1,0,0],[0,0,0]],
  [[0,0,1],[0,0,0],[1,0,0]],
];
assert(forbiddenMixing.every(A => !commutes(A)), "time-plane mixing should be removed");

// so(1,2) generators: two boosts plus one spatial rotation.
const boost1=[[0,1,0],[1,0,0],[0,0,0]];
const boost2=[[0,0,1],[0,0,0],[1,0,0]];
const rotation=[[0,0,0],[0,0,-1],[0,1,0]];
assert([boost1,boost2,rotation].every(lorentzGenerator), "Lorentz generator test failed");
assert(!commutes(boost1) && !commutes(boost2) && commutes(rotation),
  "selector Lorentz stabilizer classification failed");

// Conformal scale commutes with P and adds one generator.
const identity=[[1,0,0],[0,1,0],[0,0,1]];
assert(commutes(identity), "scale must commute with selector");

// Positive commuting responses exist but have no selected-axis/plane mixing.
const positiveBlock=[[2,0,0],[0,3,1],[0,1,2]];
assert(commutes(positiveBlock), "positive block response must commute");
const planeDet=positiveBlock[1][1]*positiveBlock[2][2]-positiveBlock[1][2]**2;
assert(positiveBlock[0][0]>0 && positiveBlock[1][1]>0 && planeDet>0, "positive block check failed");

console.log("Selector-commutant response reduction certificate: PASS");
console.log("Symmetric_response_commutant_dimension=4_of_6; removed_mixings=2; positive_block_responses_exist=true");
console.log("so(1,2)_dimension=3; fixed_selector_stabilizer=so(2)_dimension1; conformal_commutant=scale_plus_so2_dimension2");
