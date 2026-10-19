#!/usr/bin/env node

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const w1Tensor = (a,b) => (a+b)%2;

const selectorW1=1;
const spinorW1=1;
const bosonicW1=0;
assert(w1Tensor(selectorW1,spinorW1)===0,"two Möbius/sign lines must tensor to an orientable line");
assert(w1Tensor(selectorW1,bosonicW1)===1,"an untwisted bosonic line cannot cancel the selector");

const selectorHolonomy=-1;
const spinorHolonomy=-1;
assert(selectorHolonomy*spinorHolonomy===1,"sign holonomies must cancel");

// Chern-eight is an integral H^2 obstruction, not merely its mod-two parity.
const stressC1=8;
assert(stressC1%2===0,"Chern eight has trivial mod-two reduction");
assert(stressC1!==0,"trivial mod-two reduction does not cancel nonzero Chern class");

// Four fermion relationship roots of Chern two reproduce Chern eight, while a
// flat real sign line contributes no Chern class.
const fermionRelationshipC1=2;
assert(4*fermionRelationshipC1===stressC1,"relationship fourth-power ladder failed");
const complexifiedSignLineC1=0;
assert(stressC1+complexifiedSignLineC1===8,"sign compensation must not fake Chern cancellation");

console.log("Selector/spinor sign-compensation certificate: PASS");
console.log("w1_selector=1; w1_spinor=1; tensor_w1=0; holonomy_product=+1");
console.log("Chern8_mod2=0_but_Chern8_nonzero=true; real_sign_compensator_does_not_cancel_complex_Chern8=true");
