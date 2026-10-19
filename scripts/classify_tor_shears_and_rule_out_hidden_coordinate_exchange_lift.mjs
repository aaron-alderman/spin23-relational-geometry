import assert from "node:assert/strict";

const bits=(n,k)=>Array.from({length:k},(_,i)=>(n>>i)&1);
const xor=(a,b)=>a.map((x,i)=>x^b[i]);
const mod=(x,n)=>((x%n)+n)%n;
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s^(x&v[i]),0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s^(x&B[k][j]),0)));
const key=A=>A.flat().join("");
const rank2=A0=>{const A=A0.map(r=>r.slice());let r=0;for(let c=0;c<3&&r<3;c++){let p=r;while(p<3&&!A[p][c])p++;if(p===3)continue;[A[r],A[p]]=[A[p],A[r]];for(let i=0;i<3;i++)if(i!==r&&A[i][c])A[i]=xor(A[i],A[r]);r++;}return r;};
const q4=([tau,a,b])=>mod(3*a+3*b,4);
const vectors=Array.from({length:8},(_,n)=>bits(n,3));
const GL3=[];
for(let n=0;n<512;n++){const z=bits(n,9),A=Array.from({length:3},(_,i)=>z.slice(3*i,3*i+3));if(rank2(A)===3)GL3.push(A);}
const O=GL3.filter(A=>vectors.every(v=>q4(mv(A,v))===q4(v)));
assert.equal(O.length,8);

const quotientAction=A=>[
  [A[1][1],A[1][2]],
  [A[2][1],A[2][2]],
];
const I2=[[1,0],[0,1]], X2=[[0,1],[1,0]];
const kernel=O.filter(A=>key(quotientAction(A))===key(I2));
const rootCoset=O.filter(A=>key(quotientAction(A))===key(X2));
assert.equal(kernel.length,4);
assert.equal(rootCoset.length,4);
assert.ok(O.every(A=>[key(I2),key(X2)].includes(key(quotientAction(A)))));

// The kernel consists exactly of Tor shears tau -> tau, (a,b) lifted by
// independent additions of tau.
const expectedShears=[];
for(let u=0;u<2;u++)for(let v=0;v<2;v++)expectedShears.push([
  [1,u,v],[0,1,0],[0,0,1],
]);
assert.deepEqual(kernel.map(key).sort(),expectedShears.map(key).sort());

const supportSwap=[
  [1,0,0],[0,0,1],[0,1,0],
];
assert.ok(rootCoset.some(A=>key(A)===key(supportSwap)));

// No quadratic change of basis can turn the support swap into a lift whose
// quotient action is identity.
let hiddenCoordinateLifts=0;
for(const phi of O)for(const target of kernel)
  if(key(mm(phi,supportSwap))===key(mm(target,phi)))hiddenCoordinateLifts++;
assert.equal(hiddenCoordinateLifts,0);

let rootLiftIntertwiners=0;
for(const phi of O)for(const target of rootCoset)
  if(key(mm(phi,supportSwap))===key(mm(target,phi)))rootLiftIntertwiners++;
assert.ok(rootLiftIntertwiners>0);

console.log("Tor_shear_and_hidden_coordinate_exchange_classification: PASS");
console.log("quadratic_automorphism_group_order=8_is_F2_squared_semidirect_C2");
console.log("four_Tor_shears_cover_identity_on_A_D2");
console.log("four_root_exchange_lifts_cover_swap_on_A_D2");
console.log("support_swap_lies_in_root_exchange_coset");
console.log("hidden_coordinate_exchange_intertwiners=0");
console.log("a_non_split_Tor_shear_cannot_change_the_discriminant_quotient_action");

