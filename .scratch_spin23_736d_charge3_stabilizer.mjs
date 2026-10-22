import assert from "node:assert/strict";

const act=(M,v)=>M.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const add=(u,v)=>u.map((x,i)=>x+v[i]);
const scale=(a,v)=>v.map(x=>a*x);
const norm2=v=>v.reduce((s,x)=>s+(typeof x==="number"?x*x:x.re*x.re+x.im*x.im),0);
const T1=[[0,0.5],[0.5,0]],T2=[[0,{re:0,im:-0.5}],[{re:0,im:0.5},0]],T3=[[0.5,0],[0,-0.5]],I=[[1,0],[0,1]];
const mul=(x,y)=>typeof x==="number"&&typeof y==="number"?x*y:
  typeof x==="number"?{re:x*y.re,im:x*y.im}:typeof y==="number"?{re:y*x.re,im:y*x.im}:{re:x.re*y.re-x.im*y.im,im:x.re*y.im+x.im*y.re};
const action=(M,v)=>M.map(r=>r.reduce((s,x,j)=>{const z=mul(x,v[j]);return typeof z==="number"?{re:s.re+z,im:s.im}:{re:s.re+z.re,im:s.im+z.im};},{re:0,im:0}));
const plus=(u,v)=>u.map((x,i)=>({re:x.re+v[i].re,im:x.im+v[i].im}));
const times=(a,v)=>v.map(x=>({re:a*x.re,im:a*x.im}));
const n2=v=>v.reduce((s,x)=>s+x.re*x.re+x.im*x.im,0);

const sectors=[
  {X:3,vev:[0,1],charges:[1,0],neutralIndex:1},
  {X:-3,vev:[1,0],charges:[0,-1],neutralIndex:0}
].map(row=>{
  const v=row.vev.map(re=>({re,im:0}));
  const yv=plus(action(T3,v),times(1/6,action(I,v)).map(z=>({re:row.X*z.re,im:row.X*z.im})));
  assert(n2(yv)<1e-12);
  assert(n2(action(T1,v))>0&&n2(action(T2,v))>0);
  return {...row,unbroken:"Y=T3_B+X/6",Y_on_vev:n2(yv),brokenChargedGenerators:2,lieStabilizerDimension:1};
});

console.log(JSON.stringify({
  protocol:"spin23-736d-charge3-doublet-stabilizer/1",
  representation:"SU(2)_B doublet with X=3(B-L)=+/-3",
  sectors,
  conclusion:"Each conjugate choice has one neutral component and breaks su(2)_B+u(1)_X to the one-dimensional generator Y=T3_B+X/6.",
  boundary:"Calling Y physical hypercharge further requires identifying B with SU(2)_R and matching the complete matter representation and global quotient.",
  passed:true
},null,2));
