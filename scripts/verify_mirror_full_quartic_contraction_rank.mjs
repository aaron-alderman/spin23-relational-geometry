import assert from 'node:assert/strict';

const ids=new Map();let next=0;const id=k=>{if(!ids.has(k))ids.set(k,next++);return ids.get(k)};
const gen=(n,ix,s)=>new Map([[String(id(n+':'+ix.join(',')+':'+s)),1]]);
const add=(A,B)=>{const R=new Map(A);for(const [k,v] of B){const n=(R.get(k)||0)+v;if(n)R.set(k,n);else R.delete(k)}return R};
const scale=(A,c)=>new Map([...A].map(([k,v])=>[k,c*v]).filter(([,v])=>v));
const wedge=(A,B)=>{const R=new Map();for(const [ka,va] of A)for(const [kb,vb] of B){const a=ka.split(',').map(Number),b=kb.split(',').map(Number);if(a.some(x=>b.includes(x)))continue;let inv=0;for(const x of a)for(const y of b)if(x>y)inv++;const key=[...a,...b].sort((x,y)=>x-y).join(','),v=va*vb*(inv%2?-1:1);R.set(key,(R.get(key)||0)+v)}for(const [k,v] of [...R])if(!v)R.delete(k);return R};
const pair=(a,ia,b,ib)=>add(wedge(gen(a,ia,0),gen(b,ib,1)),scale(wedge(gen(a,ia,1),gen(b,ib,0)),-1));
const e2=(i,j)=>i===0&&j===1?1:i===1&&j===0?-1:0;
const e3=(a,b,c)=>new Set([a,b,c]).size<3?0:(((a>b)+(a>c)+(b>c))%2?-1:1);
const sumTerms=terms=>terms.reduce((p,[c,a,b])=>c?add(p,scale(wedge(a,b),c)):p,new Map());
const terms={QQQL:[],QQuD:[],QuLE:[],QdLN:[],UUDE:[],UDDN:[],LLEN:[]};
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let k=0;k<2;k++)for(let l=0;l<2;l++)terms.QQQL.push([e3(a,b,c)*e2(i,j)*e2(k,l),pair('Q',[a,i],'Q',[b,j]),pair('Q',[c,k],'L',[l])]);
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)terms.QQuD.push([e2(i,j),pair('Q',[a,i],'uc',[a]),pair('Q',[b,j],'dc',[b])]);
for(let a=0;a<3;a++)for(let i=0;i<2;i++)for(let j=0;j<2;j++){terms.QuLE.push([e2(i,j),pair('Q',[a,i],'uc',[a]),pair('L',[j],'ec',[])]);terms.QdLN.push([e2(i,j),pair('Q',[a,i],'dc',[a]),pair('L',[j],'nc',[])])}
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){terms.UUDE.push([e3(a,b,c),pair('dc',[a],'uc',[b]),pair('uc',[c],'ec',[])]);terms.UDDN.push([e3(a,b,c),pair('uc',[a],'dc',[b]),pair('dc',[c],'nc',[])])}
for(let i=0;i<2;i++)for(let j=0;j<2;j++)terms.LLEN.push([e2(i,j),pair('L',[i],'ec',[]),pair('L',[j],'nc',[])]);
const polynomials=Object.fromEntries(Object.entries(terms).map(([k,v])=>[k,sumTerms(v)]));
for(const [name,p] of Object.entries(polynomials))assert(p.size>0,name+' vanished');
const ncnc=pair('nc',[],'nc',[]),nc4=wedge(ncnc,ncnc);assert.equal(nc4.size,0);

const rows=[[3,0,0,1,0,0],[2,1,1,0,0,0],[1,1,0,1,1,0],[1,0,1,1,0,1],[0,2,1,0,1,0],[0,1,2,0,0,1],[0,0,0,2,1,1]];
const rank=M=>{const A=M.map(r=>r.map(Number));let row=0;for(let col=0;col<A[0].length&&row<A.length;col++){let p=row;while(p<A.length&&Math.abs(A[p][col])<1e-12)p++;if(p===A.length)continue;[A[row],A[p]]=[A[p],A[row]];const q=A[row][col];A[row]=A[row].map(x=>x/q);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j])}row++}return row};
assert.equal(rank(rows),4);
const y=[1,-4,2,-3,6,0],bml=[1,-1,-1,-3,3,3];
for(const q of [y,bml])for(const r of rows)assert.equal(r.reduce((s,x,i)=>s+x*q[i],0),0);
const withMajorana=[...rows,[0,0,0,0,0,2]];assert.equal(rank(withMajorana),5);

console.log('Full mirror quartic contraction/rank certificate: PASS');
console.log('nonzero_quartics=7; sterile_fourth_power=zero; phase_rank=4; kernel=hypercharge plus B-L; adding_nc_Majorana_rank=5');
