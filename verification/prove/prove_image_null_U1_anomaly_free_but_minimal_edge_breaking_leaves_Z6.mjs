const z = [0, 1, -1];
const sum = xs => xs.reduce((a,b) => a+b, 0);

// Left-handed Weyl convention for a lepton-family difference:
// L:(2,Y=-1/2,Z=z), e^c:(1,Y=+1,Z=-z), nu^c:(1,Y=0,Z=-z).
const anomaliesSM = {
  SU2_squared_Z: 0.5 * sum(z),
  Y_squared_Z: sum(z.map(q => 2*(1/4)*q + 1*(-q))),
  Y_Z_squared: sum(z.map(q => 2*(-1/2)*q*q + 1*(+1)*q*q)),
  Z_cubed: sum(z.map(q => 2*q**3 + (-q)**3 + (-q)**3)),
  gravity_squared_Z: sum(z.map(q => 2*q + (-q) + (-q))),
};
for (const [name, value] of Object.entries(anomaliesSM)) if (Math.abs(value) > 1e-12) throw new Error(`${name} anomaly failed`);

// Pati-Salam family-difference assignment on (4,2,1)_z plus (bar4,1,2)_-z.
const anomaliesPS = {
  SU4_squared_Z: sum(z.map(q => 2*0.5*q + 2*0.5*(-q))),
  SU2L_squared_Z: sum(z.map(q => 4*0.5*q)),
  SU2R_squared_Z: sum(z.map(q => 4*0.5*(-q))),
  Z_cubed: sum(z.map(q => 8*q**3 + 8*(-q)**3)),
  gravity_squared_Z: sum(z.map(q => 8*q + 8*(-q))),
};
for (const [name, value] of Object.entries(anomaliesPS)) if (Math.abs(value) > 1e-12) throw new Error(`${name} Pati-Salam anomaly failed`);

const edgeCharges = {
  P_to_image: [3, 1],
  P_to_null: [3, -1],
  image_to_null: [0, -2],
};
const det2 = (u,v) => u[0]*v[1]-u[1]*v[0];
const gcd = (a,b) => { a=Math.abs(a); b=Math.abs(b); while (b) [a,b]=[b,a%b]; return a; };
const gcdAll = xs => xs.reduce((a,b) => gcd(a,b), 0);

const vectors = Object.values(edgeCharges);
const entries = vectors.flat();
const minors = [];
for (let i=0;i<vectors.length;i++) for (let j=i+1;j<vectors.length;j++) minors.push(det2(vectors[i], vectors[j]));
const d1 = gcdAll(entries);
const index = gcdAll(minors);
const d2 = index/d1;
if (d1 !== 1 || d2 !== 6) throw new Error('minimal edge lattice should have Smith invariants (1,6)');

const withOddPureZ = [...vectors, [0,1]];
const minorsExtended = [];
for (let i=0;i<withOddPureZ.length;i++) for (let j=i+1;j<withOddPureZ.length;j++) minorsExtended.push(det2(withOddPureZ[i], withOddPureZ[j]));
const indexExtended = gcdAll(minorsExtended);
if (indexExtended !== 3) throw new Error('odd pure-Z repair should leave index three');

console.log(JSON.stringify({
  protocol: 'image-null-U1-anomaly-and-breaking-lattice/1',
  generator: z,
  standardModelPlusNuRAnomalies: anomaliesSM,
  PatiSalamFamilyDifferenceAnomalies: anomaliesPS,
  elementaryEdgeCharges_X_Z: edgeCharges,
  twoByTwoMinors: minors,
  SmithInvariantsOfVEVLattice: [d1,d2],
  residualGroupFromAllElementaryEdgeVEVs: 'Z_6',
  interpretation: 'The desired Z_3 is accompanied by an unavoidable residual Z_2 for the minimal edge-charge lattice.',
  minimalArithmeticRepair: {
    addedCharge: [0,1],
    newLatticeIndex: indexExtended,
    residualGroup: 'Z_3',
    boundary: 'A pure odd Z charge is not an elementary difference among the three minimal line characters and requires additional structure.',
  },
  passed: true,
}, null, 2));
