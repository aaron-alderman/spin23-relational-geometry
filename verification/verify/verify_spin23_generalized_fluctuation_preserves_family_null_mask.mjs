import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-generalized-fluctuation-family-support.json','utf8'));

const states=[
  {name:'D_P',left:'P|X',opposite:'P|Y'},
  {name:'D_I',left:'I|X',opposite:'P|Y'},
  {name:'D_N',left:'N|X',opposite:'N|Y'},
  {name:'M_P',left:'P|X',opposite:'I|Y'},
  {name:'M_N',left:'N|Y',opposite:'I|X'},
];

const n=states.length;
const zero=()=>Array.from({length:n},()=>Array(n).fill(0));
const D=zero();
function edge(a,b,value){D[a][b]=value;D[b][a]=value;}
edge(0,1,5); // safe Dirac P-I support
edge(3,4,7); // rank-restoring Majorana P-N support
// D_P-D_N is the protected absent family block.

const labels=(side)=>[...new Set(states.map(s=>s[side]))];
const commutatorFluctuation=(T,side)=>{
  const out=zero();
  for(const x of labels(side)){
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){
      const ai=states[i][side]===x?1:0;
      const bi=states[i][side]===x?1:0;
      const bj=states[j][side]===x?1:0;
      out[i][j]+=ai*T[i][j]*(bj-bi);
    }
  }
  return out;
};

const A1=commutatorFluctuation(D,'left');
const A2=commutatorFluctuation(A1,'opposite');
const oppositeA1=commutatorFluctuation(D,'opposite');

const protectedEntries=[[0,2],[2,0]];
for(const [i,j] of protectedEntries){
  assert.equal(D[i][j],0);
  assert.equal(A1[i][j],0);
  assert.equal(oppositeA1[i][j],0);
  assert.equal(A2[i][j],0);
}

assert.notEqual(A1[0][1],0,'safe Dirac support must fluctuate linearly');
assert.equal(oppositeA1[0][1],0,'safe horizontal Dirac edge has no opposite linear fluctuation in this witness');
assert.equal(A2[0][1],0,'first-order horizontal Dirac edge has no A_(2) dressing');
assert.notEqual(A1[3][4],0,'present Majorana defect must fluctuate linearly');
assert.notEqual(oppositeA1[3][4],0,'present Majorana defect must fluctuate from the opposite side');
assert.notEqual(A2[3][4],0,'Pati-Salam diagonal Majorana defect must admit A_(2) dressing');

for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  if(D[i][j]===0){
    assert.equal(A1[i][j],0);
    assert.equal(oppositeA1[i][j],0);
    assert.equal(A2[i][j],0);
  }
}

assert.equal(evidence.theorem.absentFamilyBlocksPreservedByCompleteGeneralizedFluctuation,true);
assert.equal(evidence.witness.majoranaA2Nonzero,true);
assert.match(evidence.boundary,/radiative/i);

console.log('PASS 1494: generalized A_(1)+opposite+A_(2) fluctuations preserve absent central-family blocks while dressing the present Pati-Salam Majorana defect.');
