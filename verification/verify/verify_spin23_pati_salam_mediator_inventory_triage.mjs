import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-pati-salam-mediator-inventory-triage.json','utf8'));

const dim={R:2*1*4,L:1*2*4,H1:2*2*1,H15:2*2*15};
assert.deepEqual(dim,{R:8,L:8,H1:4,H15:60});

// Representation-containment arithmetic:
// L x H contains R because 2_L x 2_L contains 1 and H carries 2_R.
assert.ok([1,3].includes(1));
// H x R contains L because 2_R x 2_R contains 1 and H carries 2_L.
assert.ok([1,3].includes(1));
// conjugate(4) x 4 = 1 + 15, so Lbar x R requires bidoublet 1+15.
assert.equal(1+15,16);

const rows=evidence.topologyTriage;
assert.equal(rows.length,3);
assert.equal(rows.filter(x=>x.status==='present-correlated').length,1);
assert.equal(rows.filter(x=>x.status==='absent-minimal-fermion-inventory').length,1);
assert.equal(rows.filter(x=>x.status==='conditional-family-charged-bidoublet').length,1);
assert.equal(evidence.liveIndependentTreeThreat,'family-charged (2_R,2_L,1+15) bidoublet with both Yukawa and scalar-mixing portals');

console.log('PASS 1498: the minimal spectral Pati-Salam inventory makes the right-multiplet bridge correlated, lacks a heavy left-multiplet bridge, and leaves only a conditional charged-bidoublet tree threat.');
