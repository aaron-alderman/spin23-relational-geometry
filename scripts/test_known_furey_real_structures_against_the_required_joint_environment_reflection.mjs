import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));

const theta=2*Math.PI/3,c=Math.cos(theta),s=Math.sin(theta);
const C=[[c,-s],[s,c]],Cinv=mm(C,C);
const F=[[1,0],[0,-1]],Id=I(2);
assert.ok(eq(mm(mm(F,C),F),Cinv));
assert.ok(eq(mm(mm(Id,C),Id),C));
assert.equal(eq(C,Cinv),false);

const colorCycle=kron(Id,C);
const multCycle=kron(C,Id);
const neutralSurvivorType=kron(Id,Id);       // gauge-linear, field-label preserving
const fureyConjugationColorType=kron(Id,F);  // conjugates color only at this reduced level
const hypotheticalMultiplicityReflection=kron(F,Id);
const requiredJoint=kron(F,F);

const reverses=(T,A)=>eq(mm(mm(T,A),T),mm(A,A));
assert.equal(reverses(neutralSurvivorType,colorCycle),false);
assert.equal(reverses(neutralSurvivorType,multCycle),false);
assert.equal(reverses(fureyConjugationColorType,colorCycle),true);
assert.equal(reverses(fureyConjugationColorType,multCycle),false);
assert.equal(reverses(hypotheticalMultiplicityReflection,colorCycle),false);
assert.equal(reverses(hypotheticalMultiplicityReflection,multCycle),true);
assert.equal(reverses(requiredJoint,colorCycle),true);
assert.equal(reverses(requiredJoint,multCycle),true);
assert.ok(eq(mm(hypotheticalMultiplicityReflection,fureyConjugationColorType),requiredJoint));

console.log(JSON.stringify({
  protocol:'known-furey-real-structures-vs-joint-environment-reflection/1',
  requiredAction:'F_mult tensor F_color',
  requiredReversals:{color:true,multiplicity:true},
  neutralSurvivorExchange:{
    reducedType:'identity on named matter/color weights, with an external survivor-topology swap',
    reversesColorCycle:false,
    reversesMultiplicityCycle:false,
    sourceEvidence:'The completed-module survivor exchange preserves all five-bit weights and intertwines rather than conjugates the Standard-Model action.'
  },
  fureyCARConjugation:{
    reducedColorType:'identity_mult tensor F_color',
    reversesColorCycle:true,
    reversesMultiplicityCycle:false,
    additionalTyping:'also reverses Lorentz chirality and conjugates hypercharge/color representations'
  },
  missingOperation:{
    type:'F_mult tensor identity_color',
    role:'reverse the emergent cyclic order of the switched multiplicity triangle without being mistaken for microscopic color conjugation'
  },
  compositeIdentity:'(F_mult tensor I)(I tensor F_color)=F_mult tensor F_color',
  conclusion:'No established single Furey exchange realizes the required joint reflection. Furey conjugation can supply the color factor only; an independent multiplicity/ribbon reflection is still required.',
  passed:true
},null,2));
