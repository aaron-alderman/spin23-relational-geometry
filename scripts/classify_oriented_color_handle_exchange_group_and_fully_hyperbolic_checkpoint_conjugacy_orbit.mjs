import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const key=JSON.stringify,eq=(A,B)=>key(A)===key(B),pow=(A,n)=>{let X=I;while(n--)X=mul(A,X);return X;};
const inv=A=>{const aug=A.map((r,i)=>[...r,...I[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&aug[p][c]===0)p++;assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}}return aug.map(r=>r.slice(4));};
const generate=gens=>{const q=[I],seen=new Map([[key(I),I]]);for(let i=0;i<q.length;i++)for(const g of gens){const X=mul(g,q[i]),k=key(X);if(!seen.has(k)){seen.set(k,X);q.push(X);}}return q;};
const G=generate([R,H]);assert.equal(G.length,18);
const Z=pow(mul(H,R),2);assert.ok(eq(pow(Z,3),I));assert.ok(G.every(g=>eq(mul(Z,g),mul(g,Z))));
const r=mul(Z,R);assert.ok(eq(pow(r,3),I));assert.ok(eq(pow(H,2),I));assert.ok(eq(mul(mul(H,r),H),pow(r,2)));
const S3=generate([r,H]);assert.equal(S3.length,6);
const C3=[I,Z,pow(Z,2)];
const products=new Set(C3.flatMap(c=>S3.map(s=>key(mul(c,s)))));assert.equal(products.size,18);
const intersection=S3.filter(s=>C3.some(c=>eq(s,c)));assert.equal(intersection.length,1);

const orbit=new Map,stabilizer=[];
for(const g of G){const X=mul(mul(g,N),inv(g));orbit.set(key(X),X);if(eq(X,N))stabilizer.push(g);}
assert.equal(orbit.size,18);assert.equal(stabilizer.length,1);
const traces=[...orbit.values()].map(A=>A.reduce((s,r,i)=>s+r[i],0));assert.ok(traces.every(t=>t===7));

console.log(JSON.stringify({
  protocol:'oriented-color-handle-exchange-spurion-orbit/1',
  generatorOrders:{R:3,H:2,HR:6},
  groupOrder:G.length,
  centralOrderThreeGenerator:'Z=(H R)^2',
  s3Generator:'r=Z R with r^3=H^2=1 and H r H=r^-1',
  directProduct:'<R,H> is C3 x S3',
  checkpointOrbitSize:orbit.size,
  checkpointStabilizerOrder:stabilizer.length,
  orbitAction:'regular',
  invariantData:{trace:7,characteristicPolynomial:'x^4-7x^3+13x^2-7x+1',fullyHyperbolic:true},
  conclusion:'The selector-broken checkpoint closes on a finite 18-background conjugacy orbit rather than an infinite moduli set. The orbit is a torsor for C3 x S3.',
  boundary:'The 18 backgrounds are response spurion states, not 18 particles or generations. Flux reversal and other antiunitary operations are not included in this symplectic orbit count.',
  passed:true,
},null,2));
