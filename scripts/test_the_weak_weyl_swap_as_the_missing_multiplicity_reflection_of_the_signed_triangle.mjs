import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));

// Switched multiplicity nodes y=(u,d,-uc).
const cycle=[[0,0,1],[1,0,0],[0,1,0]];
const cycleInv=mm(cycle,cycle);
const weakWeyl=[[0,1,0],[1,0,0],[0,0,1]]; // swap u,d; fix -uc
assert.ok(eq(mm(weakWeyl,weakWeyl),I(3)));
assert.ok(eq(mm(mm(weakWeyl,cycle),weakWeyl),cycleInv));

const one=[1,1,1];
assert.deepEqual(mm(weakWeyl,one.map(x=>[x])).flat(),one);
const J=one.map(()=>one.slice());
const LK3=add(scale(3,I(3)),scale(-1,J));
assert.ok(eq(mm(mm(tr(weakWeyl),LK3),weakWeyl),LK3));

// Return to x=(u,d,uc); the sign switch fixes the third coordinate, so the
// same permutation preserves the selected v and both physical/response Grams.
const v=[1,1,-1];
assert.deepEqual(mm(weakWeyl,v.map(x=>[x])).flat(),v);
const vvT=v.map(x=>v.map(y=>x*y));
const H=add(I(3),vvT),K=add(scale(14,I(3)),scale(4,vvT));
assert.ok(eq(mm(mm(tr(weakWeyl),H),weakWeyl),H));
assert.ok(eq(mm(mm(tr(weakWeyl),K),weakWeyl),K));

// Cycle closure dc=u+d-uc is invariant under the weak swap.
const dcRow=[1,1,-1];
assert.deepEqual(mm([dcRow],weakWeyl)[0],dcRow);

// The primitive signed-edge constraints transform within their row space.
const D=[[1,-1,0],[1,0,1],[0,1,1]];
const transformed=mm(D,weakWeyl);
assert.deepEqual(transformed,[[-1,1,0],[0,1,1],[1,0,1]]);

// On the zero-sum plane the reflection has eigenvalues +1,-1.
const qPlus=[1,1,-2],qMinus=[1,-1,0];
assert.deepEqual(mm(weakWeyl,qPlus.map(x=>[x])).flat(),qPlus);
assert.deepEqual(mm(weakWeyl,qMinus.map(x=>[x])).flat(),[-1,1,0]);

// The SU(2) lift is order four on the doublet but order two on quadratic
// populations.  This is the exact amplitude/response distinction needed here.
const weakLift=[[0,1],[-1,0]];
assert.ok(eq(mm(weakLift,weakLift),scale(-1,I(2))));
const Pu=[[1,0],[0,0]],Pd=[[0,0],[0,1]];
assert.ok(eq(mm(mm(weakLift,Pu),tr(weakLift)),Pd));
assert.ok(eq(mm(mm(weakLift,Pd),tr(weakLift)),Pu));
const higgsVacuum=[[0],[1]];
const transformedVacuum=mm(weakLift,higgsVacuum);
assert.deepEqual(transformedVacuum,[[1],[0]]);

console.log(JSON.stringify({
  protocol:'weak-weyl-multiplicity-reflection/1',
  switchedNodes:['u','d','-uc'],
  multiplicityCycle:cycle,
  weakWeylReflection:weakWeyl,
  conjugatesCycleToInverse:true,
  preservesSynchronizedLine:true,
  preservesSignedK3Laplacian:true,
  preservesCycleClosureDc:true,
  preservesMiddleFramePhysicalGram:true,
  preservesMiddleFrameResponseGram:true,
  zeroSumPlaneEigenvectors:{even:qPlus,odd:qMinus},
  su2Lift:{matrix:weakLift,square:'-I',quadraticAction:'order two; swaps the two weight projectors'},
  chosenHiggsVacuum:{before:higgsVacuum.flat(),after:transformedVacuum.flat(),fixed:false},
  standardModelTyping:{
    uAndd:'the two T3 weights of the same left-handed quark doublet Q',
    uc:'an SU(2)_L singlet, hence fixed by the weak Weyl action',
    responseLevel:'the Weyl reflection swaps the two weight labels; an SU(2) matrix representative may square to the central -I and carry phases that disappear only after the appropriate response quotient',
    higgsBoundary:'a fixed electroweak Higgs vacuum distinguishes the two weights, so the reflection is unbroken-phase or spurionic/between-vacua unless the vacuum is transformed too'
  },
  conclusion:'The weak Weyl reflection supplies exactly the missing multiplicity-cycle reversal on the bare signed-triangle response. Its promotion to a physical low-energy environment reflection requires carrying the Higgs vacuum and SU(2) phase/central action consistently.',
  passed:true
},null,2));
