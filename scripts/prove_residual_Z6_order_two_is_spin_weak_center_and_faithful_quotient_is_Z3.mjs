const fields = ['Q','u^c','d^c','L','e^c','nu^c'];
const Xselected = [0,1,-1,-2,1,3];
const Xother = [0,1,-1,1,-2,0];
const Zzero = [0,0,0,0,0,0];
const Zplus = [0,0,0,1,-1,-1];
const Zminus = [0,0,0,-1,1,1];
const isWeakDoublet = [true,false,false,true,false,false];

const parity = n => ((n%2)+2)%2 === 0 ? 1 : -1;
const fermionParityTimesWeakCenter = isDoublet => -1 * (isDoublet ? -1 : 1);

const families = [
  {name:'selected', X:Xselected, Z:Zzero},
  {name:'image', X:Xother, Z:Zplus},
  {name:'null', X:Xother, Z:Zminus},
];

const table = families.map(f => ({
  family: f.name,
  fields: fields.map((name,i) => {
    const residual = parity(f.X[i] + f.Z[i]);
    const spinWeak = fermionParityTimesWeakCenter(isWeakDoublet[i]);
    if (residual !== spinWeak) throw new Error('spin-weak center mismatch for ' + f.name + ' ' + name);
    return {name, X:f.X[i], Z:f.Z[i], residualOrderTwo:residual, spinWeakCenter:spinWeak};
  }),
}));

const higgsResidual = parity(-1);
const higgsSpinWeak = 1 * -1;
if (higgsResidual !== higgsSpinWeak) throw new Error('Higgs center mismatch');

const generatorPowers = {
  g: ['pi/3','pi'],
  g2: ['2pi/3','0 mod 2pi'],
  g3: ['pi','pi'],
  g6: ['0 mod 2pi','0 mod 2pi'],
};

const ps = {
  '(4,2,1)_L': {residual: +1, spinTimesSU2L: (-1)*(-1)},
  '(bar4,1,2)_Rconj': {residual: -1, spinTimesSU2L: (-1)*(+1)},
  '(1,2,2)_H': {residual: -1, spinTimesSU2L: (+1)*(-1)},
};
for (const [name,v] of Object.entries(ps)) if (v.residual !== v.spinTimesSU2L) throw new Error('PS mismatch ' + name);

console.log(JSON.stringify({
  protocol: 'residual-Z6-spin-weak-center-quotient/1',
  coveringResidualGenerator: generatorPowers,
  standardModelPlusNuRTable: table,
  higgs: {X:-1,Z:0,residualOrderTwo:higgsResidual,spinWeakCenter:higgsSpinWeak},
  PatiSalamMultiplets: ps,
  exactIdentification: 'g^3=(-1)^F times the center of SU(2)_L on the stated representation',
  quotient: 'Z_6 / <g^3> is Z_3',
  interpretation: 'After the standard spin-gauge center identification, the residual order-two class is not a new independent internal parity; the faithful new internal remnant is baryon triality.',
  boundary: 'This conclusion depends on the global Spin-times-gauge quotient and must be restated if the completed model chooses a different global gauge group or scalar representation.',
  passed: true,
}, null, 2));
