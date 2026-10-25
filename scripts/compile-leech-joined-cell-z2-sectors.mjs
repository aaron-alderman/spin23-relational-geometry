#!/usr/bin/env node

const identity = (size) => Array.from({length: size}, (_, i) =>
  Array.from({length: size}, (_, j) => i === j ? 1 : 0));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const multiply = (first, second) => first.map((row) => second[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * second[index][column], 0)));
const add = (first, second, secondScale = 1) => first.map((row, i) =>
  row.map((value, j) => value + secondScale * second[i][j]));
const maximumAbsolute = (matrix) => Math.max(...matrix.flat().map(Math.abs));
const transform = (operator, basis) => multiply(multiply(transpose(basis), operator), basis);
const kronecker = (first, second) => first.flatMap((firstRow, i) =>
  second.map((secondRow, k) => firstRow.flatMap((firstValue, j) =>
    secondRow.map((secondValue, l) => firstValue * secondValue))));

const compile = (cutoff) => {
  const dimension = 2 * cutoff + 1;
  const charges = Array.from({length: dimension}, (_, index) => index - cutoff);
  const charge = charges.map((value, i) => Array.from({length: dimension}, (_, j) =>
    i === j ? value : 0));
  const charge2 = multiply(charge, charge);
  const inversion = Array.from({length: dimension}, (_, i) =>
    Array.from({length: dimension}, (_, j) => i + j === dimension - 1 ? 1 : 0));
  const shift = Array.from({length: dimension}, (_, i) =>
    Array.from({length: dimension}, (_, j) => Math.abs(i - j) === 1 ? 1 : 0));

  // Columns: |0>, |e_1>...|e_N>, |o_1>...|o_N>.
  const basis = Array.from({length: dimension}, () => Array(dimension).fill(0));
  basis[cutoff][0] = 1;
  const rootTwo = Math.sqrt(2);
  for (let value = 1; value <= cutoff; value += 1) {
    basis[cutoff + value][value] = 1 / rootTwo;
    basis[cutoff - value][value] = 1 / rootTwo;
    basis[cutoff + value][cutoff + value] = 1 / rootTwo;
    basis[cutoff - value][cutoff + value] = -1 / rootTwo;
  }
  const parityCharges = [0, ...Array(cutoff).fill(0), ...Array(cutoff).fill(1)];
  const parityDiagonal = parityCharges.map((value, i) =>
    Array.from({length: dimension}, (_, j) => i === j ? (value === 0 ? 1 : -1) : 0));
  const transformed = {
    inversion: transform(inversion, basis),
    charge: transform(charge, basis),
    charge2: transform(charge2, basis),
    shift: transform(shift, basis)
  };
  const orthogonalityError = maximumAbsolute(add(multiply(transpose(basis), basis),
    identity(dimension), -1));
  const parityDiagonalError = maximumAbsolute(add(transformed.inversion, parityDiagonal, -1));
  const chargeAnticommutator = maximumAbsolute(add(
    multiply(parityDiagonal, transformed.charge), multiply(transformed.charge, parityDiagonal)));
  const charge2Commutator = maximumAbsolute(add(
    multiply(parityDiagonal, transformed.charge2),
    multiply(transformed.charge2, parityDiagonal), -1));
  const shiftCommutator = maximumAbsolute(add(
    multiply(parityDiagonal, transformed.shift),
    multiply(transformed.shift, parityDiagonal), -1));
  const twoParity = kronecker(parityDiagonal, parityDiagonal);
  const twoCharge = kronecker(transformed.charge, transformed.charge);
  const pairCommutator = maximumAbsolute(add(multiply(twoParity, twoCharge),
    multiply(twoCharge, twoParity), -1));
  const sites = 24n;
  const totalDimension = BigInt(dimension) ** sites;
  return {
    cutoff,
    localDimension: dimension,
    localEvenDimension: cutoff + 1,
    localOddDimension: cutoff,
    globalEvenDimension: ((totalDimension + 1n) / 2n).toString(),
    globalOddDimension: ((totalDimension - 1n) / 2n).toString(),
    checks: {orthogonalityError, parityDiagonalError, chargeAnticommutator,
      charge2Commutator, shiftCommutator, pairChargeCommutator: pairCommutator}
  };
};

const cutoffs = Array.from({length: 8}, (_, index) => compile(index + 1));
console.log(JSON.stringify({
  schemaVersion: "leech-joined-cell-z2-sector-compiler-run-v1",
  basis: "|0>, (|n>+|-n>)/sqrt(2) for n=1..N, (|n>-|-n>)/sqrt(2) for n=1..N",
  localRules: {
    inversion: "diagonal with N+1 even and N odd states",
    charge: "Z2-odd; maps local even to odd and odd to even",
    chargeSquared: "Z2-even; preserves local parity",
    cosineShift: "Z2-even; preserves local parity",
    metricCoupling: "n_i n_j flips two local parities and conserves global Z2"
  },
  mpoVirtualCharges: {
    start: 0,
    end: 0,
    openChargeChannels: 1,
    rule: "opening with n changes virtual charge 0 to 1; propagation preserves it; closing with n returns 1 to 0"
  },
  targetMpsBoundaryCharge: "0 for the even ground state and 1 for the odd first state",
  cutoffs,
  backendBoundary: "The symmetry compiler is backend independent. A dense penalty MPO is not needed in a Z2-aware tensor engine, but ordinary dense Quimb DMRG does not become symmetry-aware merely by changing basis.",
  epistemicStatus: "exact local and virtual Z2 charge compiler; block-sparse DMRG execution open"
}, null, 2));
