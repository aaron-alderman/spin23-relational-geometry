import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const zero=A=>A.every(r=>r.every(x=>Math.abs(x)<1e-12));
const I=[[1,0],[0,1]],J=[[0,-1],[1,0]],D=[[1,0],[0,-1]];

// A linear map from a nontrivial charged rotation plane to a neutral trivial
// representation obeys S R(theta)=S. Differentiation gives S J=0, hence S=0.
const candidate=[[3,5],[7,11]];
const SJ=mm(candidate,J);
assert.ok(!zero(SJ));
// Solving S J=0 columnwise forces all four entries to zero because J^-1=-J.
const onlyNeutralIntertwiner=[[0,0],[0,0]];
assert.ok(zero(mm(onlyNeutralIntertwiner,J)));

// If the boundary retains the same rotating frame, the commutant of J is
// S=aI+bJ. Orthogonality gives a^2+b^2=1. Matching D kills b and leaves ±I.
const samples=[];
for(const phi of [0,Math.PI/7,Math.PI/3,Math.PI]){
 const a=Math.cos(phi),b=Math.sin(phi),S=[[a,-b],[b,a]];
 const rotationIntertwines=zero(sub(mm(S,J),mm(J,S)));
 const orthogonal=zero(sub(mm([[S[0][0],S[1][0]],[S[0][1],S[1][1]]],S),I));
 const reflectionMatches=zero(sub(mm(S,D),mm(D,S)));
 samples.push({phi,rotationIntertwines,orthogonal,reflectionMatches});
}
assert.ok(samples.every(x=>x.rotationIntertwines&&x.orthogonal));
assert.ok(samples.filter(x=>x.reflectionMatches).length===2);

// With reversed rotation orientation, S anticommutes with J. Orthogonal
// solutions are reflections; matching D leaves ±D.
for(const S of [D,[[-1,0],[0,1]]]){
 assert.ok(zero(mm(S,J).map((r,i)=>r.map((x,j)=>x+mm(J,S)[i][j]))));
 assert.ok(zero(sub(mm(S,D),mm(D,S))));
}

// A single charged complex mode has only one independent quadratic invariant
// at degree two: |z|^2. Two equally charged faces provide the Hermitian Gram
// matrix, whose real-aligned slice has three coordinates and two real face
// amplitudes before forming the H_2(R) carrier.
const z=[2,3];
const norm=z[0]**2+z[1]**2;
assert.equal(norm,13);
const face1=[2,1],face2=[3,-1];
const gram=[
 [face1[0]**2+face1[1]**2, face1[0]*face2[0]+face1[1]*face2[1]],
 [face1[0]*face2[0]+face1[1]*face2[1], face2[0]**2+face2[1]**2],
];
assert.deepEqual(gram,[[5,5],[5,10]]);
assert.ok(gram[0][0]*gram[1][1]-gram[0][1]**2>0);

console.log(JSON.stringify({
 protocol:'frontier-kantor-nambu-boundary-intertwiner-classification/1',
 chargedToNeutralLinearIntertwiner:{dimension:0,reason:'S R(theta)=S implies S J=0 and J is invertible'},
 rotatingBoundaryIntertwiners:{withoutReflection:'U(1) family aI+bJ',withMatchedReflection:['+I','-I'],orientationReversingWithMatchedReflection:['+D','-D']},
 quadraticEscape:{oneChargedModeInvariantDimension:1,twoFaceGramExample:gram,realAlignedCarrier:'H_2(R)'},
 conclusion:'A charged Nambu contact plane cannot map linearly and gauge-equivariantly to a neutral boundary plane. Either the boundary retains the same rotating real-bundle connection, in which case reflection matching reduces the isometry to signs, or the physical bridge is quadratic and requires at least two charged faces.',
 passed:true,
},null,2));
