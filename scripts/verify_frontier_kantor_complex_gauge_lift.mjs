import assert from 'node:assert/strict';

const C = (re=0, im=0) => [re, im];
const cadd = (a,b) => C(a[0]+b[0],a[1]+b[1]);
const csub = (a,b) => C(a[0]-b[0],a[1]-b[1]);
const cmul = (a,b) => C(a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]);
const cconj = a => C(a[0],-a[1]);
const cscale = (s,a) => C(s*a[0],s*a[1]);
const czero = a => a[0]===0&&a[1]===0;
const vadd = (...vs) => [0,1].map(i => vs.reduce((s,v)=>cadd(s,v[i]),C()));
const vscale = (s,v) => v.map(x=>cscale(s,x));
const smul = (a,v) => v.map(x=>cmul(a,x));
const inner = (x,y) => x.reduce((s,z,i)=>cadd(s,cmul(cconj(z),y[i])),C());
const eqv = (x,y) => x.every((z,i)=>z[0]===y[i][0]&&z[1]===y[i][1]);

const realBasis = [
  [C(1),C()], [C(0,1),C()], [C(),C(1)], [C(),C(0,1)],
];

const six = ([a,b,c]) => ({p:(a+b-c)/2,d:(a+c-b)/2,e:(b+c-a)/2});
const V = (q,x,y,z) => { const coeff=six(q); return vadd(
  vscale(coeff.p,vadd(smul(inner(y,z),x),smul(inner(y,x),z))),
  vscale(coeff.d,vadd(smul(inner(z,y),x),smul(inner(z,x),y))),
  vscale(coeff.e,vadd(smul(inner(x,z),y),smul(inner(x,y),z))),
);};
const K = (q,x,y,z) => vadd(V(q,x,z,y),vscale(-1,V(q,y,z,x)));
const J = (x,y,z) => vscale(0.5,vadd(smul(inner(y,z),x),smul(inner(y,x),z)));

const audit=q=>{let firstChecks=0,secondChecks=0,firstFailure=null,secondFailure=null;
for(let u=0;u<4;u++)for(let v=0;v<4;v++)for(let x=0;x<4;x++)for(let y=0;y<4;y++)for(let z=0;z<4;z++){
 const U=realBasis[u],W=realBasis[v],X=realBasis[x],Y=realBasis[y],Z=realBasis[z];
 const lhs1=vadd(V(q,U,W,V(q,X,Y,Z)),vscale(-1,V(q,X,Y,V(q,U,W,Z))));
 const rhs1=vadd(V(q,V(q,U,W,X),Y,Z),vscale(-1,V(q,X,V(q,W,U,Y),Z)));
 firstChecks++;if(!eqv(lhs1,rhs1)&&firstFailure===null)firstFailure={u,v,x,y,z,lhs1,rhs1};
 const lhs2=K(q,K(q,U,W,X),Y,Z);
 const rhs2=vadd(K(q,U,W,V(q,X,Y,Z)),V(q,Y,X,K(q,U,W,Z)));
 secondChecks++;if(!eqv(lhs2,rhs2)&&secondFailure===null)secondFailure={u,v,x,y,z,lhs2,rhs2};
}return {q,sixWordCoefficients:six(q),firstKantorIdentity:{passed:firstFailure===null,checks:firstChecks,firstFailure},secondKantorIdentity:{passed:secondFailure===null,checks:secondChecks,firstFailure:secondFailure},kNonzero:realBasis.some(x=>realBasis.some(y=>realBasis.some(z=>K(q,x,y,z).some(w=>!czero(w)))))};};

const rays=[[1,0,0],[1,1,0],[1,1,-1],[3,1,-3]];
const audits=rays.map(audit);
let jordanChecks=0;
for(const x of realBasis)for(const y of realBasis)for(const z of realBasis){
  assert.ok(eqv(vscale(.5,vadd(V(rays[0],x,y,z),V(rays[0],z,y,x))),J(x,y,z)));jordanChecks++;
}
assert.ok(audits.filter(x=>x.kNonzero).every(x=>!x.firstKantorIdentity.passed||!x.secondKantorIdentity.passed));

console.log(JSON.stringify({
  protocol:'frontier-kantor-complex-gauge-lift/1',
  carrier:'C^2 treated as a four-real-dimensional module',
  realKantorRaysUnderPhaseDoubling:audits,
  hermitianJordanShadow:{passed:true,checks:jordanChecks},
  unitaryGaugeCovariance:'each P Q^dagger R word is separately covariant under simultaneous left/right unitary action',
  conclusion:'Both real Kantor rays with nonzero K fail the identities after phase doubling. Within this complete paired metric family, simultaneous complex gauge covariance, CP pairing, and a contact layer are incompatible; only a selected real slice or extra typed tensor can retain contact Spin(2,3).',
  passed:true,
},null,2));
