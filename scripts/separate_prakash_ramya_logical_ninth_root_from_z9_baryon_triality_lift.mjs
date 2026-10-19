import assert from "node:assert/strict";

const mod=(x,n)=>((x%n)+n)%n;
const weight=({minus=[],plusOnly=null})=>plusOnly===null
  ?Array.from({length:5},(_,i)=>minus.includes(i+1)?-1:1)
  :Array.from({length:5},(_,i)=>plusOnly===i+1?1:-1);

const states=[];
for(let i=1;i<=3;i++){
  states.push({field:`d_${i}`,sector:"Q",w:weight({minus:[i,4]})});
  states.push({field:`u_${i}`,sector:"Q",w:weight({minus:[i,5]})});
  states.push({field:`u^c_${i}`,sector:"uc",w:weight({minus:[1,2,3].filter(j=>j!==i)})});
  states.push({field:`d^c_${i}`,sector:"dc",w:weight({plusOnly:i})});
}
states.push({field:"nu",sector:"L",w:weight({plusOnly:4})});
states.push({field:"e",sector:"L",w:weight({plusOnly:5})});
states.push({field:"e^c",sector:"ec",w:weight({minus:[4,5]})});
states.push({field:"nu^c",sector:"nuc",w:weight({minus:[]})});
assert.equal(states.length,16);

const bMinusL3={Q:1,uc:-1,dc:-1,L:-3,ec:3,nuc:3};
const quarkNumber3={Q:1,uc:-1,dc:-1,L:0,ec:0,nuc:0};
const leptonNumber3={Q:0,uc:0,dc:0,L:3,ec:-3,nuc:-3};

for(const s of states){
  const cartan=s.w[0]+s.w[1]+s.w[2];
  assert.equal(cartan,bMinusL3[s.sector]);
  assert.equal(quarkNumber3[s.sector],bMinusL3[s.sector]+leptonNumber3[s.sector]);
  assert.equal(mod(quarkNumber3[s.sector],3),mod(bMinusL3[s.sector],3));
}

const nu=states.find(s=>s.field==="nu^c");
assert.equal(mod(bMinusL3.nuc,3),0); // the ternary word is puncture-neutral: a stabilizer
assert.equal(mod(quarkNumber3.nuc,3),0);

const weakCoefficient=x=>3*x.Q+x.L;
assert.equal(weakCoefficient(bMinusL3),0);
assert.equal(weakCoefficient(quarkNumber3),3);
assert.equal(mod(3*weakCoefficient(quarkNumber3),9),0);
assert.equal(mod(2*bMinusL3.nuc,9),6);
assert.equal(mod(2*quarkNumber3.nuc,9),0);

const sectorTable=Object.keys(bMinusL3).map(sector=>({
  sector,
  integralSO10Lift:bMinusL3[sector],
  majoranaCompatibleLift:quarkNumber3[sector],
  difference3L:leptonNumber3[sector],
  commonMod3:mod(bMinusL3[sector],3)
}));

console.log(JSON.stringify({
  protocol:"pr-code-versus-baryon-triality-z9-lifts/1",
  exactCartanIdentity:"q1+q2+q3 = 3(B-L) on all sixteen Spin(10) weights",
  ternaryCodeRole:"3(B-L) mod 3 vanishes on nu^c and is therefore a puncture stabilizer, not the logical coordinate",
  sectorTable,
  modNineFork:{
    integralSO10Lift:"3(B-L)",
    majoranaCompatibleLift:"3B",
    relation:"3B = 3(B-L) + 3L",
    sameMod3:true,
    weakCoefficientPerFamily:{"3(B-L)":0,"3B":3},
    threeFamily3BWeakCoefficient:9,
    nuCMajoranaChargeMod9:{"3(B-L)":6,"3B":0}
  },
  theorem:"The Prakash-Ramya ternary stabilizer shadow and baryon triality agree mod 3, but their natural mod-9 lifts split: the Spin(10) integral lift 3(B-L) is per-family anomaly free and Majorana charged, while the desired 3B lift is Majorana neutral and becomes weak-instanton invariant only for three families.",
  boundary:"The paper's ninth-root logical gate acts on the puncture logical qutrit; it is not the fieldwise Z9 symmetry, despite the common phase spectrum diag(1,zeta9,zeta9^-1).",
  passed:true
},null,2));
