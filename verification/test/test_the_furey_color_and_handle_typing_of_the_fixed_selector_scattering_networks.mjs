import assert from 'node:assert/strict';

const near=(a,b,e=1e-10)=>Math.abs(a-b)<e;
const rmm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const rsub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const rmax=A=>Math.max(...A.flat().map(Math.abs));
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const rinv=A=>{const M=A.map((r,i)=>[...r,...I4[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<4);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(4));};
const rpow=(A,n)=>{let X=I4;for(let i=0;i<n;i++)X=rmm(X,A);return X;};
assert.equal(rmax(rsub(rpow(R,3),I4)),0);assert.equal(rmax(rsub(rpow(H,2),I4)),0);

// Natural microscopic color quartet: one lepton line plus a three-color orbit.
// P sends red -> green -> blue -> red and fixes the lepton.
const P=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const e0=[1,0,0,0],e1=[0,1,0,0],e2=[0,0,1,0];
const rv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const addv=(a,b)=>a.map((x,i)=>x+b[i]),scalev=(s,a)=>a.map(x=>s*x);
const v=addv(e1,scalev(1/3,e2)),Rv=rv(R,v),R2v=rv(R,Rv);
const X=I4.map((_,i)=>[e0[i],v[i],Rv[i],R2v[i]]);
assert.ok(Math.abs(rinv(X)[0][0])>0);
assert.ok(rmax(rsub(rmm(R,X),rmm(X,P)))<1e-12);
const HInColorBasis=rmm(rmm(rinv(X),H),X);
const nonzerosPerRow=HInColorBasis.map(r=>r.filter(x=>Math.abs(x)>1e-12).length);
const colorBasisHandleIsMonomial=nonzerosPerRow.every(n=>n===1);
assert.equal(colorBasisHandleIsMonomial,false);

// The real selector representation is faithful and generates eighteen matrices.
// A faithful action on four named atoms would embed this group in S4, impossible
// because 18 does not divide |S4|=24.
const group=[I4],seen=new Set([JSON.stringify(I4)]);
for(let i=0;i<group.length;i++)for(const g of [R,H]){const q=rmm(g,group[i]),k=JSON.stringify(q);if(!seen.has(k)){seen.add(k);group.push(q);}}
assert.equal(group.length,18);
assert.notEqual(24%18,0);

// Complex helpers for the Bogoliubov/scattering distinction.
const z=(re=0,im=0)=>({re,im}),za=(a,b)=>z(a.re+b.re,a.im+b.im),zs=(a,b)=>z(a.re-b.re,a.im-b.im);
const zm=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),zc=a=>z(a.re,-a.im),zabs=a=>Math.hypot(a.re,a.im);
const zd=(a,b)=>{const q=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/q,(a.im*b.re-a.re*b.im)/q);};
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0))),zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>z()));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>za(s,zm(x,B[k][j])),z())));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>za(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>zs(x,B[i][j])));
const mscale=(a,A)=>A.map(r=>r.map(x=>zm(a,x))),mmax=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>zabs(zs(x,B[i][j])))));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&zabs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>zd(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>zs(x,zm(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]],blocks=M=>({a:M.slice(0,2).map(r=>r.slice(0,2)),b:M.slice(0,2).map(r=>r.slice(2,4)),c:M.slice(2,4).map(r=>r.slice(0,2)),d:M.slice(2,4).map(r=>r.slice(2,4))});
const real=A=>A.map(r=>r.map(x=>z(x)));
const bogoliubov=M=>{const {a:A,b:B,c:C,d:D}=blocks(M);const alpha=madd(mscale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x+D[i][j])))),mscale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x-B[i][j])))));const beta=madd(mscale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x-D[i][j])))),mscale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x+B[i][j])))));return block(alpha,beta,beta.map(r=>r.map(zc)),alpha.map(r=>r.map(zc)));};
const scatter=T=>{const {a,b,c,d}=blocks(T),di=inv(d);return block(mscale(z(-1),mm(di,c)),di,msub(a,mm(mm(b,di),c)),mm(b,di));};
const star=(A,B)=>{const x=blocks(A),y=blocks(B),DL=inv(msub(eye(2),mm(x.d,y.a))),DR=inv(msub(eye(2),mm(y.a,x.d)));return block(madd(x.a,mm(mm(mm(x.b,y.a),DL),x.c)),mm(mm(x.b,DR),y.b),mm(mm(y.c,DL),x.c),madd(y.d,mm(mm(mm(y.c,x.d),DR),y.b)));};

const GR=bogoliubov(R),GH=bogoliubov(H),KR=scatter(GR),KH=scatter(GH),Kidentity=scatter(bogoliubov(I4));
assert.ok(mmax(mm(mm(GR,GR),GR),eye(4))<1e-12);
assert.ok(mmax(mm(KH,KH),eye(4))<1e-12);
const KRordinaryCubeError=mmax(mm(mm(KR,KR),KR),eye(4));
assert.ok(KRordinaryCubeError>.1);
const KRstarCubeError=mmax(star(star(KR,KR),KR),Kidentity);
assert.ok(KRstarCubeError<1e-12);

// On the nontrivial 2x2 scattering block, K_R^2=mu I with
// mu=(-3-4i)/5.  If K_R had finite ordinary order, mu would be a root of
// unity in Q(i), hence one of +/-1,+/-i.  It is none of them.
const mu=z(-3/5,-4/5),gaussianRoots=[z(1),z(-1),z(0,1),z(0,-1)];
assert.ok(gaussianRoots.every(q=>zabs(zs(mu,q))>1e-12));
const q=[[KR[1][1],KR[1][3]],[KR[3][1],KR[3][3]]];assert.ok(mmax(mm(q,q),mscale(mu,eye(2)))<1e-12);

console.log(JSON.stringify({
  protocol:'furey-typing-of-selector-transfer-and-scattering-generators/1',
  transferCarrier:{groupOrder:group.length,Rorder:3,Horder:2},
  exactColorIntertwiner:{matterColorPermutation:P,intertwinerX:X,identity:'R X = X P',interpretation:'R is exactly one fixed lepton line plus a three-color cycle on the transfer carrier'},
  handleInThatColorBasis:{matrix:HInColorBasis,nonzerosPerRow,colorBasisHandleIsMonomial},
  fourAtomNoGo:'The faithful order-18 selector group cannot embed in S4 because 18 does not divide 24. No single four-atom permutation model can intertwine both R and H.',
  scatteringTyping:{
    GRordinaryOrder3:true,
    KHordinaryOrder2:true,
    KRordinaryCubeError,
    KRstarCubeError,
    nontrivialBlockSquare:mu,
    KRordinaryOrder:'infinite: mu is in Q(i) but is not one of its four roots of unity',
    conclusion:'K_R represents the color cycle only under Redheffer cascade, not ordinary Hilbert-space matrix multiplication.'
  },
  physicalBoundary:'A direct field-amplitude intertwiner into K_R is type-invalid. A viable Furey/Standard-Model origin must map into the transfer/network category, with color and handle operations carried on correctly separated microscopic factors before response compression.',
  passed:true
},null,2));
