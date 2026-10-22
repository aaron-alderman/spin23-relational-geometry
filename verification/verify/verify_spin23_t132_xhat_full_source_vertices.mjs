const Z=[0,0,0,0],key=(e,m)=>`${e.join(',')}|${m.join(',')}`,parse=k=>{const [e,m]=k.split('|');return [e.split(',').map(Number),m.split(',').map(Number)]};
const poly=(c=0)=>{const M=new Map();if(c)M.set(key([0,0,0],Z),c);return M};
const term=(c,e,m)=>{const M=new Map();if(c)M.set(key(e,m),c);return M};
const add=(...xs)=>{const M=new Map();for(const X of xs)for(const [k,v] of X)M.set(k,(M.get(k)||0)+v);for(const [k,v] of M)if(Math.abs(v)<1e-12)M.delete(k);return M};
const sc=(X,c)=>new Map([...X].map(([k,v])=>[k,c*v]));
const mul=(A,B)=>{const M=new Map();for(const [ka,a] of A)for(const [kb,b] of B){const [ea,ma]=parse(ka),[eb,mb]=parse(kb),e=ea.map((x,i)=>x+eb[i]);if(e[0]>2||e[1]>1||e[2]>1)continue;const m=ma.map((x,i)=>x+mb[i]),k=key(e,m);M.set(k,(M.get(k)||0)+a*b)}return M};
const deriv=(A,mu)=>{const M=new Map();for(const [k,v] of A){const [,m]=parse(k);M.set(k,v*m[mu])}return M};
const coeff=(A,e,m=Z)=>A.get(key(e,m))||0;
const eps=(a,b,c,d)=>{const x=[a,b,c,d];if(new Set(x).size<4)return 0;let n=0;for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(x[i]>x[j])n++;return n%2?-1:1};
const blank2=()=>Array.from({length:4},()=>Array.from({length:4},()=>poly()));
const blank3=()=>Array.from({length:4},()=>Array.from({length:4},()=>Array.from({length:4},()=>poly())));
const results={};
for(const quadratic of [false,true]){
const q=[1,0,0,0],qm=q.map(x=>-x),p=[2,3,5,7],pp=quadratic?p.map(x=>-x):p.map((x,i)=>-x-q[i]);
const fdirs=[];for(let a=0;a<4;a++)for(let b=a;b<4;b++){const F=Array.from({length:4},()=>Array(4).fill(0));F[a][b]=1;F[b][a]=1;fdirs.push(F)}
const pairs=[];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)pairs.push([a,b]);const kdirs=[];for(let mu=0;mu<4;mu++)for(const [a,b] of pairs){const K=Array.from({length:4},()=>Array.from({length:4},()=>Array(4).fill(0)));K[mu][a][b]=1;K[mu][b][a]=-1;kdirs.push(K)}
const dirs=[...fdirs.map(x=>({f:x})),...kdirs.map(x=>({k:x}))];
const P=Array.from({length:4},()=>Array.from({length:4},()=>Array(4).fill(0)));for(const [s,v] of Object.entries({123:-.5,132:.5,213:.5,231:-.5,312:.5,321:-.5})){const [m,a,b]=s.split('').map(Number);P[m][a][b]=v}
const action=(di,dj)=>{const f=blank2();for(let a=0;a<4;a++)for(let b=0;b<4;b++)f[a][b]=add(term(di.f?.[a][b]||0,[0,1,0],p),term(dj.f?.[a][b]||0,[0,0,1],pp));
 const e=blank2();for(let a=0;a<4;a++)for(let r=0;r<4;r++){let x=add(poly(a===r?1:0),f[a][r]);for(let s=0;s<4;s++)x=add(x,sc(mul(f[a][s],f[s][r]),.5));e[a][r]=x}
 let tr=poly();for(let a=0;a<4;a++)tr=add(tr,f[a][a]);const invdet=add(poly(1),sc(tr,-1),sc(mul(tr,tr),.5));
 const K=blank3();for(let m=0;m<4;m++)for(let a=0;a<4;a++)for(let b=0;b<4;b++)K[m][a][b]=add(term(P[m][a][b],[1,0,0],q),...(quadratic?[term(P[m][a][b],[1,0,0],qm)]:[]),term(di.k?.[m][a][b]||0,[0,1,0],p),term(dj.k?.[m][a][b]||0,[0,0,1],pp));
 let Y=poly();for(let m=0;m<4;m++)for(let n=0;n<4;n++)for(let a=0;a<4;a++)for(let b=0;b<4;b++){const ep=eps(m,n,a,b);if(!ep)continue;let R=add(deriv(K[n][a][b],m),sc(deriv(K[m][a][b],n),-1));for(let c=0;c<4;c++)R=add(R,mul(K[m][a][c],K[n][c][b]),sc(mul(K[n][a][c],K[m][c][b]),-1));for(let r=0;r<4;r++)for(let s=0;s<4;s++){const er=eps(m,n,r,s);if(er)Y=add(Y,sc(mul(mul(R,e[a][r]),e[b][s]),er/2))}}
 const S=sc(mul(mul(Y,Y),invdet),.5);return [coeff(S,[1,1,1]),coeff(S,[2,1,1])];};
const H1=Array.from({length:34},()=>Array(34).fill(0)),H2=Array.from({length:34},()=>Array(34).fill(0));for(let i=0;i<34;i++)for(let j=0;j<34;j++){[H1[i][j],H2[i][j]]=action(dirs[i],dirs[j])}
const rank=M=>{const a=M.map(r=>r.slice());let k=0;for(let c=0;c<a[0].length&&k<a.length;c++){let z=k;for(let r=k+1;r<a.length;r++)if(Math.abs(a[r][c])>Math.abs(a[z][c]))z=r;if(Math.abs(a[z][c])<1e-9)continue;[a[k],a[z]]=[a[z],a[k]];for(let r=k+1;r<a.length;r++){const f=a[r][c]/a[k][c];for(let j=c;j<a[0].length;j++)a[r][j]-=f*a[k][j]}k++}return k};const bs=A=>({rank:rank(A),nonzeroEntries:A.flat().filter(x=>Math.abs(x)>1e-9).length,entrySum:A.flat().reduce((s,x)=>s+x,0),squareSum:A.flat().reduce((s,x)=>s+x*x,0)});const st=M=>({...bs(M),blocks:{hh:bs(M.slice(0,10).map(r=>r.slice(0,10))),hk:bs(M.slice(0,10).map(r=>r.slice(10))),kh:bs(M.slice(10).map(r=>r.slice(0,10))),kk:bs(M.slice(10).map(r=>r.slice(10)))}});results[quadratic?"quadraticSourcePair":"linearSource"]={H1:st(H1),H2:st(H2)};
}
const expected={linearSource:{H1:{rank:24,nonzeroEntries:128,entrySum:-4,squareSum:15640,blocks:{hh:{rank:0,nonzeroEntries:0,entrySum:0,squareSum:0},hk:{rank:3,nonzeroEntries:30,entrySum:0,squareSum:3584},kh:{rank:3,nonzeroEntries:30,entrySum:0,squareSum:3304},kk:{rank:24,nonzeroEntries:68,entrySum:-4,squareSum:8752}}}},quadraticSourcePair:{H2:{rank:6,nonzeroEntries:19,entrySum:0,squareSum:152,blocks:{hh:{rank:5,nonzeroEntries:18,entrySum:-8,squareSum:88},hk:{rank:0,nonzeroEntries:0,entrySum:0,squareSum:0},kh:{rank:0,nonzeroEntries:0,entrySum:0,squareSum:0},kk:{rank:1,nonzeroEntries:1,entrySum:8,squareSum:64}}}}};
const assert=(condition,message)=>{if(!condition)throw new Error(message)};assert(JSON.stringify(results.linearSource.H1)===JSON.stringify(expected.linearSource.H1),"linear source matrix statistics changed");assert(JSON.stringify(results.quadraticSourcePair.H2)===JSON.stringify(expected.quadraticSourcePair.H2),"quadratic source matrix statistics changed");assert(results.linearSource.H2.rank===0,"one source mode cannot enter the quadratic response at zero total momentum");assert(results.quadraticSourcePair.H1.rank===0,"a conjugate pair has no net linear-source coefficient");console.log("Spin(2,3) t132 full Xhat source vertices: PASS");console.log("  H1 rank 24: hk rank 3, kh rank 3, kk rank 24");console.log("  H2 rank 6: hh rank 5, kk rank 1");console.log("  complete Xhat^2 coframe expansion through second source order");
