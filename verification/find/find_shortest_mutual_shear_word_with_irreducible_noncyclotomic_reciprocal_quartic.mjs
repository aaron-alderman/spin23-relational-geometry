import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const P=[[1,0,0,0],[0,-1,0,0],[-1,0,-1,0],[0,-1,0,1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const U=[[1,0,0,0],[0,1,0,0],[0,1,1,0],[1,0,0,1]]; // K=[[0,1],[1,0]] lower shear
const gens=[['R',R,0],['P',P,1],['H',H,0],['U',U,0]];
const charpoly=A=>{const A2=mul(A,A),A3=mul(A2,A),e1=trace(A),e2=(e1*e1-trace(A2))/2,e3=(e2*e1-e1*trace(A2)+trace(A3))/3;return[1,-e1,e2,-e3,1];};
const reducibleReciprocal=c=>{
  // By Gauss's lemma a monic integer factorization has monic integer quadratics.
  // Constants must be (1,1) or (-1,-1); exhaustive coefficient equations follow.
  for(const s of [1,-1])for(let a=-50;a<=50;a++)for(let b=-50;b<=50;b++)
    if(a+b===c[1]&&s*(a+b)===c[3]&&a*b+2*s===c[2])return true;
  return false;
};
const cyclotomicDegree4=c=>[[1,1,1,1,1],[1,0,0,0,1],[1,-1,1,-1,1],[1,0,-1,0,1]].some(x=>JSON.stringify(x)===JSON.stringify(c));

const queue=[{M:I,word:'',antiParity:0}],seen=new Set([JSON.stringify(I)+'/0']);
let found=null;
for(let head=0;head<queue.length&&!found;head++){
  const x=queue[head]; if(x.word.length>=8)continue;
  for(const [name,g,anti] of gens){
    const y=mul(g,x.M),word=x.word+name,antiParity=x.antiParity^anti,key=JSON.stringify(y)+'/'+antiParity;
    if(seen.has(key))continue; seen.add(key); queue.push({M:y,word,antiParity});
    if(antiParity===0&&word.includes('U')){
      const cp=charpoly(y);
      if(cp[1]===cp[3]&&!reducibleReciprocal(cp)&&!cyclotomicDegree4(cp))found={M:y,word,cp};
    }
  }
}
assert.ok(found);
assert.equal(found.word,'RHUU'); // left multiplication means matrix U^2 H R
assert.deepEqual(found.cp,[1,2,1,2,1]);
assert.deepEqual(found.M,[[0,0,0,-1],[1,0,0,0],[2,1,0,-1],[0,0,1,-2]]);
const yElliptic=-1+Math.sqrt(2),yHyperbolic=-1-Math.sqrt(2);
const spectralRadius=(-yHyperbolic+Math.sqrt(yHyperbolic*yHyperbolic-4))/2;
assert.ok(spectralRadius>1);

console.log(JSON.stringify({
  protocol:'shortest-coupled-mutual-shear-irreducible-word/1',
  searchAlphabet:['R oriented color','P signed reflection','H handle exchange','U primitive mutual shear'],
  multiplicationConvention:'reported string RHUU denotes matrix U^2 H R',
  shortestWord:'U^2 H R',
  length:4,
  matrix:found.M,
  characteristicPolynomial:'x^4+2x^3+x^2+2x+1',
  irreducibleOverQ:true,
  rationalInvariantHandleSplitting:false,
  modThreeMutualPart:'U^2 has K=[[0,2],[2,0]], the unique nonzero qutrit mutual shear up to inversion',
  reducedEquation:'for y=x+x^-1, y^2+2y-1=0',
  spectralType:{realReciprocalPairFrom:yHyperbolic,unitCirclePairFrom:yElliptic,spectralRadius},
  fullyHyperbolic:false,
  partiallyHyperbolic:true,
  conclusion:'The first irreducible noncyclotomic coupled word uses exactly the square of the primitive mutual shear selected by the mod-three qutrit interface. It destroys every rational handle splitting but retains an elliptic pair.',
  topologyBoundary:'Irreducible homology proves rational coupling, not pseudo-Anosov topology.',
  passed:true,
},null,2));
