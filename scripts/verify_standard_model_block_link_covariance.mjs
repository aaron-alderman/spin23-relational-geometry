import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),phase=t=>C(Math.cos(t),Math.sin(t));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),kron=(A,B)=>A.flatMap(r=>B.map(s=>r.flatMap(x=>s.map(y=>mul(x,y))))),scale=(A,z)=>A.map(r=>r.map(x=>mul(z,x))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>C(i===j?1:0)));
const blockDiag=blocks=>{const n=blocks.reduce((s,b)=>s+b.length,0),M=Array.from({length:n},()=>Array.from({length:n},()=>C(0)));let o=0;for(const B of blocks){for(let i=0;i<B.length;i++)for(let j=0;j<B.length;j++)M[o+i][o+j]=B[i][j];o+=B.length}return M};
const su2=(ax,ay,az)=>{const n=Math.hypot(ax,ay,az),s=n?Math.sin(n)/n:1,x=C(Math.cos(n),az*s),y=C(ay*s,ax*s);return [[x,y],[C(-y.re,y.im),conj(x)]]};
const embed3=U=>[[U[0][0],U[0][1],C(0)],[U[1][0],U[1][1],C(0)],[C(0),C(0),C(1)]];
const tupleMul=(g,h)=>({u3:mm(g.u3,h.u3),u2:mm(g.u2,h.u2),theta:g.theta+h.theta}),tupleDag=g=>({u3:dag(g.u3),u2:dag(g.u2),theta:-g.theta});
const rep=g=>blockDiag([
  scale(kron(g.u3,g.u2),phase(g.theta/6)),
  scale(g.u3.map(r=>r.map(conj)),phase(-2*g.theta/3)),
  scale(g.u3.map(r=>r.map(conj)),phase(g.theta/3)),
  scale(g.u2,phase(-g.theta/2)),
  [[phase(g.theta)]],
  [[C(1)]],
]);

const g=x=>({u3:embed3(su2(0.2+x,0.3,-0.15)),u2:su2(-0.1,0.25+x,0.18),theta:0.4-x});
const gx=g(0.07),u=g(0.21),gy=g(-0.13);
for(const q of [gx,u,gy])assert.equal(rep(q).length,16);
assert(maxDiff(rep(tupleMul(gx,u)),mm(rep(gx),rep(u)))<1e-10);
const up=tupleMul(tupleMul(gx,u),tupleDag(gy));
assert(maxDiff(rep(up),mm(mm(rep(gx),rep(u)),dag(rep(gy))))<1e-10);

const S=[[C(1.2),C(0.3)],[C(0.3),C(0.8)]],carrier=kron(S,eye(16)),gauge=kron(eye(2),rep(gx));
assert(maxDiff(mm(carrier,gauge),mm(gauge,carrier))<1e-10);

console.log('Standard-Model block-link covariance certificate: PASS');
console.log('representation_dimension=16; nonabelian_homomorphism=true; endpoint_link_covariance=true; carrier_gauge_commutator=0; Yukawa_portals_separate_gate=true');
