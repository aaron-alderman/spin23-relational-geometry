import fs from "node:fs";
import path from "node:path";
import {
  apply,maxAbs,multiply,rank,subtract,transpose,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-topology-cut-v1.json";

// Circle: vertices 0,1,2 and edges 01,12,20.
const Bcircle=[[-1,0,1],[1,-1,0],[0,1,-1]];
const dc=transpose(Bcircle);

// Cut interval: vertices 0,1,2,3 and edges 01,12,23.
const Binterval=[[-1,0,0],[1,-1,0],[0,1,-1],[0,0,1]];
const di=transpose(Binterval);

// Quotient/gluing chain map q_* identifies interval endpoints 0 and 3.
const F0=[
  [1,0,0,1],
  [0,1,0,0],
  [0,0,1,0],
];
const F1=[
  [1,0,0],
  [0,1,0],
  [0,0,1],
];
const chainResidual=maxAbs(subtract(multiply(F0,Binterval),multiply(Bcircle,F1)));
const T0=transpose(F0),T1=transpose(F1);
const cochainResidual=maxAbs(subtract(multiply(di,T0),multiply(T1,dc)));

const circleHarmonic=[1,1,1];
const intervalImage=apply(T1,circleHarmonic);
const intervalPotential=[0,1,2,3];
const intervalGradient=apply(di,intervalPotential);
const exactnessResidual=Math.max(...intervalImage.map((value,i)=>Math.abs(value-intervalGradient[i])));
const circlePeriod=circleHarmonic.reduce((a,b)=>a+b,0);
const endpointMismatch=intervalPotential.at(-1)-intervalPotential[0];
const circleAugmentedRank=rank(dc.map((row,i)=>[...row,circleHarmonic[i]]));
const complex=(re,im)=>({re,im});
const cmul=(a,b)=>complex(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const cconj=a=>complex(a.re,-a.im);
const cexp=angle=>complex(Math.cos(angle),Math.sin(angle));
const cdist=(a,b)=>Math.hypot(a.re-b.re,a.im-b.im);
const cproduct=values=>values.reduce(cmul,complex(1,0));
const linkAngles=[0.4,-0.7,1.2];
const links=linkAngles.map(cexp);
const holonomy=cproduct(links);
const gaugePhases=[0.2,0.9,-0.4].map(cexp);
const edgeEnds=[[0,1],[1,2],[2,0]];
const transformedLinks=links.map((link,i)=>cmul(cmul(cconj(gaugePhases[edgeEnds[i][0]]),link),gaugePhases[edgeEnds[i][1]]));
const gaugeHolonomyResidual=cdist(cproduct(transformedLinks),holonomy);
const intervalGauge=[complex(1,0)];
for(const link of links)intervalGauge.push(cmul(cconj(link),intervalGauge.at(-1)));
const flattenedLinks=links.map((link,i)=>cmul(cmul(cconj(intervalGauge[i]),link),intervalGauge[i+1]));
const flattenedResidual=Math.max(...flattenedLinks.map(link=>cdist(link,complex(1,0))));
const endpointTransition=cmul(intervalGauge.at(-1),cconj(intervalGauge[0]));
const transitionHolonomyResidual=cdist(endpointTransition,cconj(holonomy));

const record={
  schemaVersion:"rdg-maxwell-topology-cut-v1",
  date:"2026-10-26",
  purpose:"Track a Wilson/cohomology record through an explicit topology-changing cut from a circle to an interval.",
  carriers:{
    circle:{cochainDimensions:[3,3],differentialRank:rank(dc),betti:[3-rank(dc),3-rank(dc)]},
    interval:{cochainDimensions:[4,3],differentialRank:rank(di),betti:[4-rank(di),3-rank(di)]},
  },
  gluingMap:{
    description:"q identifies interval endpoint 3 with endpoint 0 and maps its three oriented edges to 01,12,20",
    chainMapResidual:chainResidual,
    cochainPullbackResidual:cochainResidual,
  },
  recordTransfer:{
    circleOneForm:circleHarmonic,
    circlePeriod,
    circleD0Rank:rank(dc),
    circleD0WithOneFormRank:circleAugmentedRank,
    intervalPullback:intervalImage,
    intervalPotential,
    intervalGradient,
    exactnessResidual,
    endpointMismatch,
    conclusion:"The non-exact circle one-form becomes an exact interval gradient, and its Wilson period becomes the potential mismatch between the two new boundary endpoints.",
  },
  admissibilityRule:{
    cut:"retain the two endpoint values or their mismatch as a boundary detector coordinate",
    reglue:"identify endpoints only with an explicit transition/gluing value equal to the retained period",
    failure:"discarding endpoint mismatch destroys the H1 record even though local edge data can look unchanged",
  },
  compactU1Extension:{
    linkAngles,
    holonomy,
    gaugeTransformedHolonomy:cproduct(transformedLinks),
    gaugeHolonomyResidual,
    cutGaugeFlattensEveryLinkResidual:flattenedResidual,
    endpointTransition,
    inverseHolonomy:cconj(holonomy),
    transitionHolonomyResidual,
    conclusion:"On the circle the link product is gauge invariant. On the cut interval all links can be gauged to one, and the inverse holonomy reappears as the relative gauge transition between endpoints.",
  },
  verdict:"Topology change need not annihilate a global gauge record: cutting converts additive or compact U(1) holonomy into boundary mismatch/transition data. A faithful RDG update must transport cohomology into boundary/gluing records rather than treating the changed quotient dimension as ordinary field loss.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

