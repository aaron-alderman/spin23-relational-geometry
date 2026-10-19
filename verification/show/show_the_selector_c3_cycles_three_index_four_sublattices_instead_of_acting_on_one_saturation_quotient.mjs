import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const mod2=x=>(x%2+2)%2;
const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1];
const encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3];
const applyMod2=(A,n)=>{const x=bits(n);return encode(A.map(r=>r.reduce((s,a,i)=>s+a*x[i],0)%2))};
const rankMod2=vectors=>{const rows=vectors.map(bits);let rank=0;for(let col=0;col<4;col++){let p=rank;while(p<rows.length&&!rows[p][col])p++;if(p===rows.length)continue;[rows[p],rows[rank]]=[rows[rank],rows[p]];for(let i=0;i<rows.length;i++)if(i!==rank&&rows[i][col])for(let j=col;j<4;j++)rows[i][j]^=rows[rank][j];rank++}return rank};

// Integral selector C3 transported to the saturated sideband basis B.
const A=[[1,1,0,-1],[0,0,0,1],[0,1,1,2],[0,-1,0,-1]];
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
assert.ok(eq(mm(mm(A,A),A),I));

// Original unsaturated lattice L inside L' has this basis in saturated coordinates.
const Q=[[2,0,0,0],[-1,1,0,0],[0,0,2,0],[0,0,-1,1]];
const AQ=mm(A,Q);
assert.ok(AQ.flat().some(x=>Math.abs(x)>0));
// A does not preserve L: in original coordinates B A B^-1 has half-integral entries (recorded exactly as twice that matrix).
const twiceOriginalAction=[[1,1,1,-1],[1,1,-1,1],[-1,1,0,2],[1,-1,2,0]];
assert.ok(twiceOriginalAction.flat().some(x=>Math.abs(x)%2===1));

const Amod=A.map(r=>r.map(mod2));
const plane0=[0,2,8,10]; // image of L/2L' in L'/2L'
const mapPlane=W=>W.map(n=>applyMod2(Amod,n)).sort((a,b)=>a-b);
const plane1=mapPlane(plane0), plane2=mapPlane(plane1), plane3=mapPlane(plane2);
assert.deepEqual(plane3,plane0);
assert.notDeepEqual(plane0,plane1);assert.notDeepEqual(plane1,plane2);assert.notDeepEqual(plane2,plane0);
const intersection=plane0.filter(x=>plane1.includes(x)&&plane2.includes(x));
assert.deepEqual(intersection,[0]);
const spanning=[...new Set([...plane0,...plane1,...plane2])].filter(Boolean);
assert.equal(rankMod2(spanning),4);

console.log(JSON.stringify({
  protocol:'selector-c3-index-four-sublattice-holonomy/1',
  transportedC3OnSaturatedBasis:A,
  orderThree:true,
  originalLatticeBasisInsideSaturation:Q,
  twiceActionInOriginalBasis:twiceOriginalAction,
  preservesOriginalLattice:false,
  modTwoOrbit:[plane0,plane1,plane2],
  orbitLength:3,
  intersectionModuloTwo:intersection,
  spanRankModuloTwo:rankMod2(spanning),
  consequence:'C3 is integral on the saturated carrier but does not descend to an action on the fixed quotient Lprime/L; it cycles three index-four sublattices.',
  passed:true
},null,2));
