#!/usr/bin/env node

import assert from "node:assert/strict";

const rotations=(s)=>Array.from({length:s.length},(_,k)=>s.slice(k)+s.slice(0,k));
const canonical=(s)=>rotations(s).sort()[0];
const mixed=(s)=>s.includes("A")&&s.includes("B");

const classes={};
for(let n=2;n<=4;n++){
  const set=new Set();
  for(let mask=0;mask<2**n;mask++){
    const word=Array.from({length:n},(_,i)=>(mask>>i)&1?"B":"A").join("");
    if(mixed(word))set.add(canonical(word));
  }
  classes[n]=[...set].sort();
}

assert.deepEqual(classes[2],["AB"]);
assert.deepEqual(classes[3],["AAB","ABB"]);
assert.deepEqual(classes[4],["AAAB","AABB","ABAB","ABBB"]);

const nonlinearGenerators=["(Tr AB)^2","Tr(ABAB)"];
const noncommutationSensitive=["Tr(ABAB)"];

console.log(JSON.stringify({
  protocol:"degree-eight-two-hermitian-invariant-classification/1",
  cyclicMixedWordClasses:classes,
  nonlinearGenerators,
  noncommutationSensitive,
  normalForm:"Birkhoff-linear + alpha*(Tr AB)^2 + beta*Tr(ABAB)",
  passed:true
},null,2));

