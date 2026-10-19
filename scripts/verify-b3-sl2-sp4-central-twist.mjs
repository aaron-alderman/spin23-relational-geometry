#!/usr/bin/env node

const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const scale=(k,a)=>a.map(r=>r.map(x=>k*x));
const equal=(a,b)=>a.every((r,i)=>r.every((x,j)=>x===b[i][j]));
const zero=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const I2=[[1,0],[0,1]], Z=zero(2);
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const inv2=g=>{const d=g[0][0]*g[1][1]-g[0][1]*g[1][0];return scale(d,[[g[1][1],-g[0][1]],[-g[1][0],g[0][0]]]);};
const embed=g=>block(g,Z,Z,transpose(inv2(g)));
const J=block(Z,I2,scale(-1,I2),Z);
const symplectic=g=>equal(mul(mul(transpose(g),J),g),J);
const pow=(a,n)=>{let r=a.map((row,i)=>row.map((_,j)=>i===j?1:0));for(let i=0;i<n;i++)r=mul(r,a);return r;};
const actJordan=(g,x)=>{const gi=inv2(g);return mul(mul(transpose(gi),x),gi);};

const s1=[[1,1],[0,1]];
const s2=[[1,0],[-1,1]];
const braidLeft=mul(mul(s1,s2),s1), braidRight=mul(mul(s2,s1),s2);
const center=pow(mul(s1,s2),3);
const S1=embed(s1),S2=embed(s2),Center4=embed(center);
const minusI4=scale(-1,[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
const x=[[2,3],[3,5]];

const report={
  protocol:"b3-sl2-sp4-central-twist/1",
  braidRelationInSL2Z:equal(braidLeft,braidRight),
  braidRelationInSp4Z:equal(mul(mul(S1,S2),S1),mul(mul(S2,S1),S2)),
  imagesSymplectic:symplectic(S1)&&symplectic(S2),
  centralElementSL2:center,
  centralElementIsMinusI2:equal(center,scale(-1,I2)),
  centralElementSp4:Center4,
  centralElementIsMinusI4:equal(Center4,minusI4),
  centerActsTriviallyOnJordanCarrier:equal(actJordan(center,x),x),
  centerSquareIsIdentity:equal(pow(center,2),I2),
  conclusion:"The B3 full twist maps to the spinorial sign -I4, invisible on Sym_2(R).",
};
report.passed=Object.entries(report).filter(([,v])=>typeof v==='boolean').every(([,v])=>v);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
