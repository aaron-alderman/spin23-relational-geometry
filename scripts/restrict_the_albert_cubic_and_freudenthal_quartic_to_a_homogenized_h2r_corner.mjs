import assert from 'node:assert/strict';

const detH2=({a,b,x})=>a*b-x*x;
const polarH2=(X,Y)=>X.a*Y.b+Y.a*X.b-2*X.x*Y.x;

// Real associative corner of J3(O): [[a,x,0],[x,b,0],[0,0,c]].
// The Albert cubic norm restricts to the ordinary determinant c(ab-x^2).
const albertCorner=({a,b,x},c)=>({a,b,c,z:x,xOctNorm:x*x,yOctNorm:0,wOctNorm:0,tripleReal:0});
const cubicNorm=X=>X.a*X.b*X.c-X.a*X.wOctNorm-X.b*X.yOctNorm-X.c*X.xOctNorm+2*X.tripleReal;

// On the FTS slice beta=0,Y=0 the standard quartic convention reduces to
// q(alpha,0,X,0)=-4 alpha N(X); no adjoint convention is then needed.
const freudenthalSliceQuartic=(alpha,X)=>-4*alpha*cubicNorm(X);
const homogenized=(h,t,kappa=1)=>({alpha:t,X:albertCorner(h,kappa*t)});
const directLinear=h=>({alpha:1,X:albertCorner(h,0)});

let checks=0;
for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let x=-2;x<=2;x++)for(let t=-2;t<=2;t++)for(const kappa of [-3,-1,1,2]){
  const h={a,b,x},F=homogenized(h,t,kappa),q=freudenthalSliceQuartic(F.alpha,F.X);
  assert.ok(Math.abs(cubicNorm(F.X)-kappa*t*detH2(h))===0);
  assert.ok(Math.abs(q-(-4*kappa*t*t*detH2(h)))===0);checks++;
  assert.ok(Math.abs(cubicNorm(directLinear(h).X))===0);
  assert.ok(Math.abs(freudenthalSliceQuartic(1,directLinear(h).X))===0);
  assert.ok(Math.abs(freudenthalSliceQuartic(F.alpha,albertCorner({...h,x:-x},kappa*t))-q)===0);
}

const hA={a:1,b:0,x:0},hB={a:0,b:1,x:0};
assert.equal(polarH2(hA,hB),1);
// FTS symplectic pairing alpha beta'-beta alpha'+Tr(XY')-Tr(YX')
// vanishes identically when beta=Y=beta'=Y'=0.
const restrictedSymplectic=0;

console.log(JSON.stringify({
  protocol:'h2r-albert-freudenthal-invariant-restriction/1',
  h2Invariant:'det([[a,x],[x,b]])=ab-x^2',
  linearCornerEmbedding:'iota_0(h)=[[a,x,0],[x,b,0],[0,0,0]]',
  linearCornerCubicRestriction:'N(iota_0(h))=0',
  homogenizedEmbedding:'alpha=t, X=[[a,x,0],[x,b,0],[0,0,kappa t]], beta=0, Y=0',
  cubicRestriction:'N(X)=kappa t det(h)',
  quarticRestriction:'q=-4 kappa t^2 det(h)',
  affineChartAtT1:'q(t=1)=-4 kappa det(h)',
  exhaustiveIntegerChecks:checks,
  orientationReflection:'x -> -x leaves both determinant and restricted quartic invariant',
  restrictedFtsSymplecticPairing:restrictedSymplectic,
  nonzeroH2PolarPairingExample:{hA,hB,value:polarH2(hA,hB)},
  pairingPreserved:false,
  choiceDegeneracy:{cornerChoices:3,octonionicOffDiagonalUnit:'any norm-one octonion direction gives the same restriction',homogenizingScale:'kappa is free and rescales the recovered determinant'},
  groupBoundary:'The 56-dimensional Freudenthal system carries the E7 quartic/symplectic structure; E8 enters only through a larger graded or quasiconformal construction.',
  conclusion:'The homogenized corner reproduces the established H2 determinant inside the Freudenthal quartic, but the direct linear corner is cubic-null, the symplectic pairing restricts to zero, orientation is invisible, and no physical selector fixes the corner, octonion direction or scale.',
  decision:'Record the invariant lift, but close the Freudenthal/E8 parent claim under the quarantine rule: the embedding is noncanonical and supplies no new constraint on the response, orientation witness, residues or Ward/UV data.',
  passed:true,
},null,2));
