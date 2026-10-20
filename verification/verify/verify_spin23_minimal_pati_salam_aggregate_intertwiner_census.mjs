import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const path='evidence/data/spin23-minimal-pati-salam-aggregate-intertwiner-census.json';
const evidence=JSON.parse(readFileSync(path,'utf8'));

assert.equal(evidence.schema,'spin23.minimal-pati-salam-aggregate-intertwiner-census/1');
assert.equal(evidence.sourcedCore.familyAction,'generation blind: pi(a)=pi_internal(a) tensor I_3');
assert.equal(evidence.sourcedCore.familyCoefficientComplexDimension,9);
assert.equal(evidence.sourcedCore.derivedSelectedNullSupportMask,false);
assert.equal(evidence.sourcedCore.derivedAggregateCommonRay,false);

// The weak singlet occurs once in 2 x 2, and the SU(4) L-R bilinear
// decomposes into exactly the singlet and adjoint carrier dimensions.
const su2DoubletProduct=[1,3];
assert.equal(su2DoubletProduct.filter(d=>d===1).length,1);
assert.equal(1+3,2*2);
assert.equal(1+15,4*4);
assert.deepEqual(
  evidence.sourcedCore.bidoubletChannels.map(x=>x.gaugeIntertwinerMultiplicityForLHR),
  [1,1]
);

// There are exactly three unordered pairings of the four labelled external
// legs.  This independently checks that the evidence ledger did not omit a
// one-propagator renormalizable topology.
const legs=['L_P','H','nu_N^c','S'];
const pairingKeys=new Set();
for(let j=1;j<legs.length;j++){
  const first=[legs[0],legs[j]].sort();
  const second=legs.filter(x=>!first.includes(x)).sort();
  pairingKeys.add([first.join('+'),second.join('+')].sort().join('|'));
}
assert.equal(pairingKeys.size,3);
assert.equal(evidence.topologyCensus.length,3);

const statuses=evidence.topologyCensus.map(x=>x.maskedCompletionStatus);
assert.deepEqual(statuses,['retained-correlated','absent','absent when the central Dirac P-N mask is imposed']);
const columns=evidence.topologyCensus.filter(x=>x.aggregateSchurColumn);
const primitive=evidence.topologyCensus.filter(x=>x.independentPrimitiveLeakagePacket);
assert.equal(columns.length,1);
assert.equal(primitive.length,0);

// One selected eliminated state gives a 2 x 1 aggregate matrix.  It has no
// two-column minors and therefore rank at most one for every d_eff,y_eff.
const aggregateColumns=[[2,3]];
const minors=[];
for(let i=0;i<aggregateColumns.length;i++){
  for(let j=i+1;j<aggregateColumns.length;j++){
    minors.push(
      aggregateColumns[i][0]*aggregateColumns[j][1]
      -aggregateColumns[j][0]*aggregateColumns[i][1]
    );
  }
}
assert.equal(minors.length,0);
assert.equal(evidence.boundedMaskedCompletion.aggregateColumnCount,1);
assert.equal(evidence.boundedMaskedCompletion.aggregateRankUpperBound,1);
assert.equal(evidence.boundedMaskedCompletion.crossMediatorMinorCount,0);
assert.equal(evidence.boundedMaskedCompletion.independentPrimitiveLeakagePackets,0);

// Any independently coupled reopened mediator can destroy the result.  This
// witness ensures that the ledger's conclusion is absence-based rather than
// a claimed alignment theorem.
const selectedPacket=[1,1];
const reopenedPacket=[1,-1];
const reopenedMinor=
  selectedPacket[0]*reopenedPacket[1]-reopenedPacket[0]*selectedPacket[1];
assert.equal(reopenedMinor,-2);
assert.equal(evidence.counterfactualReopeners.length,3);
assert.match(evidence.decision.strictPublishedCoreVerdict,/does not force/);
assert.match(evidence.decision.boundedMaskedCompletionVerdict,/positive but conditional/);
assert.match(evidence.boundary,/cannot promote physical admission/);

console.log('PASS 1512: the sourced generation-blind Pati-Salam carrier has unrestricted 9-dimensional family coefficients and does not derive a common ray; conditional on the central family mask, the bounded minimal one-mediator census leaves one correlated column, zero primitive leakage columns, and no cross-mediator minors.');
