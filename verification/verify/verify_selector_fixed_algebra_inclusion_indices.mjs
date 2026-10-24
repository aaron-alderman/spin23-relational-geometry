const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const markovIndex = inclusionMultiplicities =>
  inclusionMultiplicities.reduce((sum, multiplicity) => sum + multiplicity ** 2, 0);

// Complexified inclusions B subset M16 are described by a one-column
// inclusion matrix. Entries count how often each simple B-module occurs
// in the defining 16-dimensional A-module.
const finiteSign = {
  name: 'finite_sign_twirl',
  blocks: 8,
  blockSize: 2,
  multiplicities: Array(8).fill(1)
};
const haarG2 = {
  name: 'haar_G2_commutant',
  blocks: 2,
  blockSize: 2,
  multiplicities: [1, 7]
};
const clifford = {
  name: 'clifford_multiplicity_expectation',
  blocks: 1,
  blockSize: 2,
  multiplicities: [8]
};

for (const model of [finiteSign, haarG2, clifford]) {
  const representedDimension = model.multiplicities.reduce((sum, d) => sum + model.blockSize * d, 0);
  assert(representedDimension === 16, model.name + ': inclusion multiplicities must fill the 16-dimensional carrier');
  model.fixedAlgebraDimension = model.blocks * model.blockSize ** 2;
  model.index = markovIndex(model.multiplicities);
}

assert(finiteSign.fixedAlgebraDimension === 32 && finiteSign.index === 8, 'finite sign selector must have dimension 32 and index 8');
assert(haarG2.fixedAlgebraDimension === 8 && haarG2.index === 50, 'Haar G2 commutant must have dimension 8 and index 50');
assert(clifford.fixedAlgebraDimension === 4 && clifford.index === 64, 'Clifford expectation must have dimension 4 and index 64');

assert(
  finiteSign.fixedAlgebraDimension > haarG2.fixedAlgebraDimension &&
  haarG2.fixedAlgebraDimension > clifford.fixedAlgebraDimension,
  'fixed algebra dimensions must shrink across the three selectors'
);
assert(
  finiteSign.index < haarG2.index && haarG2.index < clifford.index,
  'inclusion indices must grow as multiplicity compression becomes stronger'
);

console.log('Selector fixed-algebra inclusion-index certificate: PASS');
for (const model of [finiteSign, haarG2, clifford]) {
  console.log(model.name + ': fixed_algebra_dimension=' + model.fixedAlgebraDimension + '; inclusion_vector=' + JSON.stringify(model.multiplicities) + '; index=' + model.index);
}
console.log('index_is_not_dynamical_gap=true; physical_cost_requires_state_and_semigroup');
