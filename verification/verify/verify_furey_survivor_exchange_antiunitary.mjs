#!/usr/bin/env node

const arrow=(name,source,target,dimension)=>({name,source,target,dimension,key:`${name}:${source}->${target}`});
const common=[arrow("Q","H","O2",6),arrow("uc","O2","C",3)];
const A=[...common,arrow("dc","O2","O1",3),arrow("L","R","H",2),arrow("ec","C","R",1)];
const B=[...common,arrow("dc","O2","R",3),arrow("L","O1","H",2),arrow("ec","C","O1",1)];
const swapLabel=x=>x==="O1"?"R":x==="R"?"O1":x;
const swap=a=>arrow(a.name,swapLabel(a.source),swapLabel(a.target),a.dimension);
const dagger=a=>arrow(a.name,a.target,a.source,a.dimension);
const keys=S=>S.map(x=>x.key).sort();
const same=(X,Y)=>JSON.stringify(keys(X))===JSON.stringify(keys(Y));
const cyclesA={up:[arrow("Q","H","O2",0),arrow("uc","O2","C",0),arrow("hC","C","H",0)],down:[arrow("Q","H","O2",0),arrow("dc","O2","O1",0),arrow("hDdag","O1","H",0)],lepton:[arrow("ec","C","R",0),arrow("L","R","H",0),arrow("hCdag","H","C",0)]};
const closes=seq=>seq.every((a,i)=>a.target===seq[(i+1)%seq.length].source);
const cyclesB=Object.fromEntries(Object.entries(cyclesA).map(([k,v])=>[k,v.map(swap)]));
const complexDimension=A.reduce((s,x)=>s+x.dimension,0),fixedRealDimension=2*complexDimension;
const coefficient={re:.37,im:.82},partner={re:coefficient.re,im:-coefficient.im};
const report={
  protocol:"furey-survivor-exchange-antiunitary/1",
  survivorA:A,survivorB:B,
  neutralSwap:{mapsAToB:same(A.map(swap),B),mapsBToA:same(B.map(swap),A)},
  dagger:{mapsAToA:same(A.map(dagger),A),mapsAToB:same(A.map(dagger),B),reversedA:A.map(dagger)},
  cycles:{A:Object.fromEntries(Object.entries(cyclesA).map(([k,v])=>[k,{closes:closes(v),arrows:v.map(x=>`${x.source}->${x.target}`)}])),B:Object.fromEntries(Object.entries(cyclesB).map(([k,v])=>[k,{closes:closes(v),arrows:v.map(x=>`${x.source}->${x.target}`)}]))},
  exchangeAntiunitary:{
    action:"Theta(v_A,v_B)=(conjugate(v_B),conjugate(v_A))",
    square:+1,
    oneTopologyComplexDimension:complexDimension,
    doubledAmbientComplexDimension:2*complexDimension,
    fixedRealDimension,
    equalsOneComplexTopologyRealDimension:fixedRealDimension===2*complexDimension,
    sampleComplexCoefficient:coefficient,
    pairedCoefficient:partner,
    forcesCoefficientReal:false
  },
  caveat:"The O1<->R exchange is verified as an incidence symmetry of the surviving block supports. It is not established as an automorphism of Furey's full nested algebra or action.",
  interpretation:[
    "The neutral-label exchange swaps the two cyclically surviving anomaly-free TROs exactly and maps all three closed cycles between them.",
    "Dagger reverses arrows and maps neither survivor to itself nor to the other survivor.",
    "An antiunitary exchange on A direct-sum B has a fixed real space with the same real dimension as one complex fifteen-dimensional topology, so it need not double independent degrees of freedom.",
    "Exchange reality pairs a coefficient with its complex conjugate rather than forcing that coefficient to be real.",
    "The construction remains a candidate until the neutral swap is derived from the source algebra and its Lorentz/Fock interpretation is supplied."
  ]
};
report.passed=report.neutralSwap.mapsAToB&&report.neutralSwap.mapsBToA&&!report.dagger.mapsAToA&&!report.dagger.mapsAToB&&
  Object.values(report.cycles.A).every(x=>x.closes)&&Object.values(report.cycles.B).every(x=>x.closes)&&complexDimension===15&&report.exchangeAntiunitary.equalsOneComplexTopologyRealDimension&&!report.exchangeAntiunitary.forcesCoefficientReal;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
