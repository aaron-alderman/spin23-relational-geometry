#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const I=[[1,0],[0,1]], sx=[[0,1],[1,0]], sz=[[1,0],[0,-1]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));

// Antiunitary A=U K squares to U bar(U); all matrices here are real.
const squareAnti=U=>mul(U,U);
assert(eq(squareAnti(I),I)&&eq(squareAnti(sx),I)&&eq(squareAnti(sz),I),"chosen antiunitaries must square to +1");

// Commuting branch: K and sigma_x K; product is sigma_x, an involutive grading.
const Cplus=mul(I,sx), CplusReverse=mul(sx,I);
assert(eq(Cplus,CplusReverse),"commuting antiunitary branch failed");
assert(eq(mul(Cplus,Cplus),I),"commuting product must square to +1");

// Anticommuting branch: sigma_x K and sigma_z K; product is a complex structure.
const J=mul(sx,sz), reverse=mul(sz,sx);
assert(eq(J,scale(-1,reverse)),"anticommuting antiunitary branch failed");
assert(eq(mul(J,J),scale(-1,I)),"anticommuting product must square to -1");
assert(eq(add(mul(sx,J),mul(J,sx)),[[0,0],[0,0]]),"first real structure must reverse generated J");
assert(eq(add(mul(sz,J),mul(J,sz)),[[0,0],[0,0]]),"second real structure must reverse generated J");

console.log("Two-antiunitary algebra classification certificate: PASS");
console.log("commuting_square_plus_real_structures_product_square=+1; product=grading");
console.log("anticommuting_square_plus_real_structures_product_square=-1; product=complex_structure");
console.log("actual_Furey_commutation_relation=not_assumed");
