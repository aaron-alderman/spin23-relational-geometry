import assert from 'node:assert/strict';

const channels=[
  {name:'up',left:{color:'3',weak:2,y6:1},scalar:{name:'tildeHdag',weak:2,y6:3},right:{color:'3',weak:1,y6:4}},
  {name:'down',left:{color:'3',weak:2,y6:1},scalar:{name:'Hdag',weak:2,y6:-3},right:{color:'3',weak:1,y6:-2}},
  {name:'electron',left:{color:'1',weak:2,y6:-3},scalar:{name:'Hdag',weak:2,y6:-3},right:{color:'1',weak:1,y6:-6}},
  {name:'neutrino',left:{color:'1',weak:2,y6:-3},scalar:{name:'tildeHdag',weak:2,y6:3},right:{color:'1',weak:1,y6:0}}
].map(c=>({...c,dressed:{color:c.left.color,weak:1,y6:c.left.y6+c.scalar.y6}}));
for(const c of channels){assert.equal(c.dressed.color,c.right.color);assert.equal(c.dressed.weak,c.right.weak);assert.equal(c.dressed.y6,c.right.y6)}
const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),inner=(u,v)=>u.reduce((s,x,i)=>add(s,mul(conj(x),v[i])),C(0)),norm2=u=>inner(u,u).re;
const samples=[
  [[C(1,.2),C(.3,-.1),C(.5,.4)],[C(.7,-.2),C(.1,.3),C(.4,-.1)]],
  [[C(.6,.1),C(.2,.5),C(.4,-.2)],[C(.3,-.4),C(.8,.1),C(.2,.2)]],
  [[C(.9,.2),C(.1,-.3)],[C(.4,.5),C(.7,-.1)]],
  [[C(.5,-.4),C(.6,.2)],[C(.2,.1),C(.8,-.3)]]
];
const grams=samples.map(([u,v])=>{const z=inner(u,v),a=norm2(u),d=norm2(v);assert(a*d-z.re*z.re-z.im*z.im>-1e-12);assert(a*d-z.re*z.re>-1e-12);return [[a,z.re],[z.re,d]]});
const weights=[3,3,1,1],sum=[[0,0],[0,0]];for(let k=0;k<4;k++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)sum[i][j]+=weights[k]*grams[k][i][j];
assert(sum[0][0]>=0&&sum[1][1]>=0&&sum[0][0]*sum[1][1]-sum[0][1]*sum[1][0]>=-1e-12);

console.log('Four-channel dressed H2 response certificate: PASS');
console.log('all_dressed_faces_representation_matched=true; four_positive_real_Gram_responses=true; positive_weighted_channel_sum=true; unique_stress_weights_open=true');
