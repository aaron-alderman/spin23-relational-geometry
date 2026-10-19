import assert from 'node:assert/strict';

const A=[
  [3,0,0,1,0,0],[2,1,1,0,0,0],[1,1,0,1,1,0],[1,0,1,1,0,1],
  [0,2,1,0,1,0],[0,1,2,0,0,1],[0,0,0,2,1,1],[0,0,0,0,0,2]
].map(r=>r.map(BigInt));
const combinations=(n,k,start=0,prefix=[])=>k===0?[prefix]:Array.from({length:n-start},(_,i)=>combinations(n,k-1,start+i+1,[...prefix,start+i])).flat();
const det=M=>M.length===0?1n:M.length===1?M[0][0]:M[0].reduce((s,x,j)=>s+(j%2?-1n:1n)*x*det(M.slice(1).map(r=>r.filter((_,q)=>q!==j))),0n);
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const determinantalDivisors=[];let previous=1n;
const invariantFactors=[];
for(let k=1;k<=5;k++){
  let g=0n;
  for(const rs of combinations(A.length,k))for(const cs of combinations(A[0].length,k))g=gcd(g,det(rs.map(i=>cs.map(j=>A[i][j]))));
  determinantalDivisors.push(g);invariantFactors.push(g/previous);previous=g;
}
assert.deepEqual(invariantFactors,[1n,1n,1n,1n,2n]);
const hypercharge=[1n,-4n,2n,-3n,6n,0n];
for(const row of A)assert.equal(row.reduce((s,x,i)=>s+x*hypercharge[i],0n),0n);
const fermionParity=[1,1,1,1,1,1];
for(const row of A)assert.equal(Number(row.reduce((s,x,i)=>s+x*BigInt(fermionParity[i]),0n)%2n),0);
assert.notEqual(hypercharge[5],1n);

console.log('Mirror discrete-phase Smith-form certificate: PASS');
console.log('SNF=diag(1,1,1,1,2,0); symmetry=U1_hypercharge x Z2_fermion_parity; after_gauge_quotient=fermion_parity_only');
