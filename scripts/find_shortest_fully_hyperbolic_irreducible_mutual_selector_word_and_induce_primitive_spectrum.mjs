import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const P=[[1,0,0,0],[0,-1,0,0],[-1,0,-1,0],[0,-1,0,1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const U=[[1,0,0,0],[0,1,0,0],[0,1,1,0],[1,0,0,1]];
const gens=[['R',R,0],['P',P,1],['H',H,0],['U',U,0]];
const cp=A=>{const A2=mul(A,A),A3=mul(A2,A),e1=trace(A),e2=(e1*e1-trace(A2))/2,e3=(e2*e1-e1*trace(A2)+trace(A3))/3;return[1,-e1,e2,-e3,1];};
const reducible=c=>{for(const s of [1,-1])for(let a=-100;a<=100;a++)for(let b=-100;b<=100;b++)if(a+b===c[1]&&s*(a+b)===c[3]&&a*b+2*s===c[2])return true;return false;};
const reducedRoots=c=>{const a=c[1],b=c[2],D=a*a-4*(b-2);if(D<0)return[];return[(-a+Math.sqrt(D))/2,(-a-Math.sqrt(D))/2];};
const fullyHyperbolic=c=>{const ys=reducedRoots(c);return ys.length===2&&ys.every(y=>Math.abs(y)>2);};

const queue=[{M:I,word:'',antiParity:0}],seen=new Set([JSON.stringify(I)+'/0']);let found=null;
for(let head=0;head<queue.length&&!found;head++){
  const x=queue[head]; if(x.word.length>=12)continue;
  for(const [name,g,anti] of gens){
    const y=mul(g,x.M),word=x.word+name,antiParity=x.antiParity^anti,key=JSON.stringify(y)+'/'+antiParity;
    if(seen.has(key))continue;seen.add(key);queue.push({M:y,word,antiParity});
    if(antiParity===0&&word.includes('U')){const c=cp(y);if(c[1]===c[3]&&!reducible(c)&&fullyHyperbolic(c))found={M:y,word,c};}
  }
}
assert.ok(found);
assert.equal(found.word,'RHPURHPU'); // left action: (U P H R)^2
assert.deepEqual(found.c,[1,-7,13,-7,1]);
assert.deepEqual(found.M,[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]]);
const ys=reducedRoots(found.c);
assert.ok(ys.every(y=>y>2));
const expanding=ys.map(y=>(y+Math.sqrt(y*y-4))/2).sort((a,b)=>b-a);
const [l1,l2]=expanding;
const primitiveSpectrum=[l1*l2,l1/l2,1,l2/l1,1/(l1*l2)];

console.log(JSON.stringify({
  protocol:'shortest-fully-hyperbolic-mutual-selector-word/1',
  multiplicationConvention:'reported string RHPURHPU denotes matrix (U P H R)^2',
  shortestWord:'(U P H R)^2',
  length:8,
  matrix:found.M,
  characteristicPolynomial:'x^4-7x^3+13x^2-7x+1',
  irreducibleOverQ:true,
  reducedRootsY:ys,
  carrierExpandingEigenvalues:expanding,
  carrierSpectrum:[l1,l2,1/l2,1/l1],
  fullyHyperbolic:true,
  rationalInvariantHandleSplitting:false,
  primitiveSpin23Spectrum:primitiveSpectrum,
  primitiveInterpretation:'one fixed eigenline and two real reciprocal expanding/contracting pairs on the five-dimensional primitive-two-form module',
  conclusion:'A fully hyperbolic irreducible coupled word exists at length eight in the declared positive alphabet. Its Spin(2,3) shadow has the expected five-dimensional reciprocal spectrum with one fixed direction.',
  topologyBoundary:'The result concerns integral homology/response dynamics and does not alone prove a pseudo-Anosov mapping-class lift or a physical transfer law.',
  passed:true,
},null,2));
