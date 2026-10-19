import assert from 'node:assert/strict';

const mod2 = n => ((n % 2) + 2) % 2;

// w=1 means the nontrivial SU(2)_L centre acts by -1.
// f=1 for a fermion and 0 for a boson.
const fields = [
  { name: 'Q', X: 0, Z: 0, f: 1, w: 1 },
  { name: 'u^c', X: 1, Z: 0, f: 1, w: 0 },
  { name: 'd^c', X: -1, Z: 0, f: 1, w: 0 },
  { name: 'L_selected', X: -2, Z: 0, f: 1, w: 1 },
  { name: 'e^c_selected', X: 1, Z: 0, f: 1, w: 0 },
  { name: 'nu^c_selected', X: 3, Z: 0, f: 1, w: 0 },
  { name: 'L_image', X: 1, Z: 1, f: 1, w: 1 },
  { name: 'e^c_image', X: -2, Z: -1, f: 1, w: 0 },
  { name: 'nu^c_image', X: 0, Z: -1, f: 1, w: 0 },
  { name: 'L_null', X: 1, Z: -1, f: 1, w: 1 },
  { name: 'e^c_null', X: -2, Z: 1, f: 1, w: 0 },
  { name: 'nu^c_null', X: 0, Z: 1, f: 1, w: 0 },
  { name: 'H', X: -1, Z: 0, f: 0, w: 1 },
];

for (const field of fields) {
  assert.equal(
    mod2(field.X + field.Z),
    mod2(field.f + field.w),
    `${field.name} must satisfy X+Z = F+w mod 2`,
  );
}

// A bosonic scalar sourced by two left-handed Weyl fields has charge equal to
// either their sum or difference up to sign. Modulo two these choices agree.
// The SU(2)_L centre character of every component of their tensor product is
// the product of the two centre characters.
for (const a of fields.filter(x => x.f === 1)) {
  for (const b of fields.filter(x => x.f === 1)) {
    const scalarChargeParity = mod2(a.X + a.Z + b.X + b.Z);
    const scalarWeakParity = mod2(a.w + b.w);
    assert.equal(scalarChargeParity, scalarWeakParity, `${a.name} x ${b.name}`);
  }
}

const elementaryScalars = [
  { name: 'P-I Majorana edge', X: 3, Z: 1, w: 0 },
  { name: 'P-N Majorana edge', X: 3, Z: -1, w: 0 },
  { name: 'I-N family edge', X: 0, Z: -2, w: 0 },
  { name: 'electroweak Higgs', X: -1, Z: 0, w: 1 },
];

for (const scalar of elementaryScalars) {
  assert.equal(mod2(scalar.X + scalar.Z), scalar.w, scalar.name);
}

const primitiveOddZ = { name: 'primitive odd-Z singlet', X: 0, Z: 1, w: 0 };
assert.notEqual(mod2(primitiveOddZ.X + primitiveOddZ.Z), primitiveOddZ.w);

const output = {
  protocol: 'spin-weak-kernel-closure-odd-Z-fork/1',
  congruence: 'X+Z = F+w_L (mod 2)',
  checkedStatedFields: fields.length,
  checkedFermionBilinears: fields.filter(x => x.f === 1).length ** 2,
  elementaryScalarAudit: elementaryScalars.map(s => ({
    ...s,
    chargeParity: mod2(s.X + s.Z),
    respectsKernel: mod2(s.X + s.Z) === s.w,
  })),
  closureTheorem: 'Any scalar sourced by a bilinear of kernel-compatible Weyl fields is kernel-compatible, and polynomial composites remain compatible.',
  oddZRepair: {
    ...primitiveOddZ,
    chargeParity: mod2(primitiveOddZ.X + primitiveOddZ.Z),
    respectsKernel: false,
  },
  ultravioletFork: {
    quotientCompletion: 'Identify g^3 with (-1)^F z_2L; a primitive weak-singlet (0,1) field is not a representation of the quotient.',
    coveringCompletion: 'Retain the covering group; admit a primitive (0,1) singlet whose VEV breaks the residual Z6 to Z3.',
    commonInfraredRemnant: 'faithful Z3 baryon triality',
  },
  passed: true,
};

console.log(JSON.stringify(output, null, 2));
