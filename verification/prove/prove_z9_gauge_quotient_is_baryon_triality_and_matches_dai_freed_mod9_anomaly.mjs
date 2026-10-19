import assert from "node:assert/strict";

const mod=(x,n)=>((x%n)+n)%n;
const sectors=["Q","uc","dc","L","ec","nuc"];
const multiplicity={Q:6,uc:3,dc:3,L:2,ec:1,nuc:1};
const threeB={Q:1,uc:-1,dc:-1,L:0,ec:0,nuc:0};
const sixY={Q:1,uc:-4,dc:2,L:-3,ec:6,nuc:0};
const threeBmL={Q:1,uc:-1,dc:-1,L:-3,ec:3,nuc:3};

for(const s of sectors){
  assert.equal(mod(threeB[s],3),mod(sixY[s],3));
  assert.equal(mod(threeBmL[s],3),mod(sixY[s],3));
}

// Inverse of the conventional baryon-triality representative -B+2Y.
const inverseBaryonTriality={Q:0,uc:1,dc:-1,L:1,ec:1,nuc:0};
const standardBaryonTriality=Object.fromEntries(sectors.map(s=>[s,-inverseBaryonTriality[s]]));
assert.deepEqual(standardBaryonTriality,{Q:-0,uc:-1,dc:1,L:-1,ec:-1,nuc:-0});

// It differs from baryon number only by the gauged hypercharge transformation.
// B-2Y is integral on every SM multiplet and equals the listed representative.
const sixB={Q:2,uc:-2,dc:-2,L:0,ec:0,nuc:0};
for(const s of sectors)assert.equal(mod((sixB[s]-2*sixY[s])/6,3),mod(inverseBaryonTriality[s],3));

const linearPerFamily=sectors.reduce((sum,s)=>sum+multiplicity[s]*inverseBaryonTriality[s],0);
const cubicPerFamily=sectors.reduce((sum,s)=>sum+multiplicity[s]*inverseBaryonTriality[s]**3,0);
assert.equal(linearPerFamily,3);
assert.equal(cubicPerFamily,3);
assert.equal(mod(3*linearPerFamily,9),0);
assert.equal(mod(3*cubicPerFamily,9),0);

// On a gauge-invariant operator Y_total=0, so B-2Y and B agree.
const examples=[
  {name:"baryon",B:1,Y:0,quotientCharge:1},
  {name:"lepton",B:0,Y:0,quotientCharge:0},
  {name:"meson",B:0,Y:0,quotientCharge:0}
];
for(const x of examples)assert.equal(mod(x.B-2*x.Y,3),x.quotientCharge);

console.log(JSON.stringify({
  protocol:"z9-gauge-quotient-and-dai-freed-baryon-triality/1",
  z9Lift:"3B with charges (1,-1,-1,0,0,0) mod 9",
  cubeGaugeIdentity:"3B mod 3 = 6Y mod 3 = 3(B-L) mod 3",
  warning:"The componentwise mod-3 reduction is a hypercharge gauge transformation, not the faithful quotient action.",
  quotientRepresentative:{
    inverseStandardBaryonTriality:"B-2Y",
    charges:inverseBaryonTriality,
    standardConvention:"-B+2Y"
  },
  gaugeInvariantAction:"For Y_total=0, the quotient charge B-2Y equals baryon number B mod 3.",
  daiFreed:{linearPerFamily,cubicPerFamily,classMod9:mod(linearPerFamily,9),threeFamiliesClassMod9:mod(3*linearPerFamily,9)},
  theorem:"The Z9 extension has a gauge-trivial cube but a nontrivial order-three quotient on gauge-invariant operators. That quotient is inverse conventional baryon triality and carries the Dai-Freed class 3 mod 9 per generation, canceled by three generations.",
  boundary:"This validates the low-energy Spin-bordism constraint quoted for baryon triality. A full unbroken Pati-Salam bordism calculation for the combined module-phase/gauge extension remains separate.",
  passed:true
},null,2));
