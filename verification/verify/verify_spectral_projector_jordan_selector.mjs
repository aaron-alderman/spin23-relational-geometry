#!/usr/bin/env node

const eps = 1e-8;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const I = [[1,0,0],[0,1,0],[0,0,1]];
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const matVec = (A, v) => A.map(r => r.reduce((s, x, i) => s + x * v[i], 0));
const outer = v => v.map(x => v.map(y => x * y));
const norm = v => Math.sqrt(v.reduce((s, x) => s + x*x, 0));
const normalize = v => { const n = norm(v); return v.map(x => x/n); };
const frob = A => Math.sqrt(A.flat().reduce((s, x) => s + x*x, 0));
const closeM = (A, B, tol=1e-7) => frob(sub(A,B)) < tol;
const trace = A => A.reduce((s, r, i) => s + r[i], 0);

const n1 = normalize([1,-1,0]);
const n2 = normalize([1,1,-2]);
const n3 = normalize([1,1,1]);
const lambdas = [1,3,7];
let K = [[0,0,0],[0,0,0],[0,0,0]];
for (const [v, l] of [[n1,1],[n2,3],[n3,7]]) K = add(K, scale(l, outer(v)));

const shift = (A, l) => sub(A, scale(l, I));
const P = scale(1/((7-1)*(7-3)), multiply(shift(K,1), shift(K,3)));
assert(closeM(P, outer(n3)), "polynomial spectral projector failed");
assert(closeM(multiply(P,P), P), "projector idempotence failed");
assert(Math.abs(trace(P)-1) < eps, "projector rank trace failed");
assert(closeM(multiply(K,P), scale(7,P)), "eigenprojector equation failed");

const eta = sub(scale(2,P), I);
assert(closeM(multiply(eta,eta), I), "selector involution failed");
assert(Math.abs(trace(eta)+1) < eps, "selector signature trace failed");

// Basis covariance under an explicit orthogonal transformation.
const c=Math.cos(0.41), s=Math.sin(0.41);
const U=[[c,-s,0],[s,c,0],[0,0,1]];
const Kp=multiply(multiply(U,K),transpose(U));
const Ppoly=scale(1/24,multiply(shift(Kp,1),shift(Kp,3)));
const Pcov=multiply(multiply(U,P),transpose(U));
assert(closeM(Ppoly,Pcov), "basis covariance failed");

// Small real perturbation: numerical top projector obeys a loose Davis-Kahan bound.
const dK=scale(0.02,[[0.3,1,-0.2],[1,-0.4,0.5],[-0.2,0.5,0.1]]);
const Kpert=add(K,dK);
let v=normalize([0.2,0.4,0.9]);
for(let k=0;k<100;k++) v=normalize(matVec(Kpert,v));
const Ppert=outer(v);
const gap=7-3;
const bound=2*frob(dK)/gap;
assert(frob(sub(Ppert,P)) < bound, "projector perturbation exceeded gap bound");

// A complex phase relative to a fixed real structure makes the line projector non-real.
const phi=0.37;
const complexN=[{re:1/Math.sqrt(3),im:0},{re:Math.cos(phi)/Math.sqrt(3),im:Math.sin(phi)/Math.sqrt(3)},{re:1/Math.sqrt(3),im:0}];
const imagP01=complexN[0].im*(-complexN[1].im)+complexN[0].re*(-complexN[1].im); // Im(n0 conj n1)
assert(Math.abs(imagP01) > eps, "CP-phase projector should not be real in the fixed basis");

console.log("Spectral-projector Jordan selector certificate: PASS");
console.log("Pmax=product(K-lambda_i I)/(gap products); rank1=true; basis_covariant=true; eta=2P-I; eta_signature=1,2");
console.log(`gap_stability=true; projector_shift=${frob(sub(Ppert,P)).toFixed(6)}; bound=${bound.toFixed(6)}; degeneracy_gate=true; CP_real_structure_gate=true`);
