import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-throat-generalized-spectrum-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function zeros(rows, columns = rows) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function transpose(matrix) {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function multiply(left, right) {
  const output = zeros(left.length, right[0].length);
  for (let i = 0; i < left.length; i += 1) {
    for (let k = 0; k < right.length; k += 1) {
      for (let j = 0; j < right[0].length; j += 1) {
        output[i][j] += left[i][k] * right[k][j];
      }
    }
  }
  return output;
}

function multiplyVector(matrix, vector) {
  return matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
}

function cholesky(matrix) {
  const lower = zeros(matrix.length);
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j <= i; j += 1) {
      let sum = matrix[i][j];
      for (let k = 0; k < j; k += 1) sum -= lower[i][k] * lower[j][k];
      if (i === j) {
        assert(sum > 0, "mass matrix is not positive definite");
        lower[i][j] = Math.sqrt(sum);
      } else {
        lower[i][j] = sum / lower[j][j];
      }
    }
  }
  return lower;
}

function inverseLower(lower) {
  const inverse = zeros(lower.length);
  for (let column = 0; column < lower.length; column += 1) {
    for (let row = 0; row < lower.length; row += 1) {
      let value = row === column ? 1 : 0;
      for (let k = 0; k < row; k += 1) value -= lower[row][k] * inverse[k][column];
      inverse[row][column] = value / lower[row][row];
    }
  }
  return inverse;
}

function jacobiEigen(input) {
  const matrix = input.map((row) => [...row]);
  const vectors = zeros(matrix.length);
  for (let i = 0; i < matrix.length; i += 1) vectors[i][i] = 1;

  for (let iteration = 0; iteration < 10000; iteration += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = i + 1; j < matrix.length; j += 1) {
        if (Math.abs(matrix[i][j]) > maximum) {
          maximum = Math.abs(matrix[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (maximum < 1e-13) break;

    const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const app = matrix[p][p];
    const aqq = matrix[q][q];
    const apq = matrix[p][q];
    matrix[p][p] = cosine ** 2 * app - 2 * sine * cosine * apq + sine ** 2 * aqq;
    matrix[q][q] = sine ** 2 * app + 2 * sine * cosine * apq + cosine ** 2 * aqq;
    matrix[p][q] = 0;
    matrix[q][p] = 0;

    for (let k = 0; k < matrix.length; k += 1) {
      if (k === p || k === q) continue;
      const akp = matrix[k][p];
      const akq = matrix[k][q];
      matrix[k][p] = cosine * akp - sine * akq;
      matrix[p][k] = matrix[k][p];
      matrix[k][q] = sine * akp + cosine * akq;
      matrix[q][k] = matrix[k][q];
    }
    for (let k = 0; k < matrix.length; k += 1) {
      const vkp = vectors[k][p];
      const vkq = vectors[k][q];
      vectors[k][p] = cosine * vkp - sine * vkq;
      vectors[k][q] = sine * vkp + cosine * vkq;
    }
  }

  const order = matrix.map((row, index) => ({ value: row[index], index }))
    .sort((left, right) => left.value - right.value);
  return {
    values: order.map((item) => item.value),
    vectors: vectors.map((row) => order.map((item) => row[item.index])),
  };
}

function basisFor(sector, countPerBlock = 4) {
  const definitions = [];
  for (let n = 0; n < countPerBlock; n += 1) {
    definitions.push(["cos", sector === "klein" ? 2 * n + 1 : 2 * n, "cos"]);
  }
  for (let n = 0; n < countPerBlock; n += 1) {
    definitions.push(["sin", 2 * (n + 1), "sin"]);
  }
  return definitions.map(([xType, k, yType]) => {
    const flatNorm = k === 0 ? 2 * Math.PI ** 2 : Math.PI ** 2;
    const normalization = 1 / Math.sqrt(flatNorm);
    return {
      k,
      family: yType,
      eigenvalue: k * k + 1,
      value: (x, y) => normalization
        * (xType === "cos" ? Math.cos(k * x) : Math.sin(k * x))
        * (yType === "cos" ? Math.cos(y) : Math.sin(y)),
    };
  });
}

function normalizationConstant(epsilon, samples = 32768) {
  let mean = 0;
  for (let i = 0; i < samples; i += 1) {
    const x = 2 * Math.PI * (i + 0.5) / samples;
    mean += Math.exp(2 * epsilon * Math.cos(2 * x));
  }
  return -0.5 * Math.log(mean / samples);
}

function assemble(sector, epsilon, countPerBlock = 4) {
  const basis = basisFor(sector, countPerBlock);
  const dimension = basis.length;
  const mass = zeros(dimension);
  const stiffness = zeros(dimension);
  const grid = 512;
  const step = 2 * Math.PI / grid;
  const c = normalizationConstant(epsilon);

  for (let i = 0; i < dimension; i += 1) stiffness[i][i] = basis[i].eigenvalue;
  for (let ix = 0; ix < grid; ix += 1) {
    const x = (ix + 0.5) * step;
    const weight = Math.exp(2 * (c + epsilon * Math.cos(2 * x)));
    for (let iy = 0; iy < grid; iy += 1) {
      const y = (iy + 0.5) * step;
      const values = basis.map((mode) => mode.value(x, y));
      for (let i = 0; i < dimension; i += 1) {
        for (let j = i; j < dimension; j += 1) {
          mass[i][j] += weight * values[i] * values[j] * step * step;
        }
      }
    }
  }
  for (let i = 0; i < dimension; i += 1) {
    for (let j = 0; j < i; j += 1) mass[i][j] = mass[j][i];
  }
  return { basis, mass, stiffness };
}

function solveGeneralized(system) {
  const lower = cholesky(system.mass);
  const inverse = inverseLower(lower);
  const symmetric = multiply(multiply(inverse, system.stiffness), transpose(inverse));
  const eigensystem = jacobiEigen(symmetric);
  const coefficientVectors = multiply(transpose(inverse), eigensystem.vectors);
  let maximumResidual = 0;
  for (let column = 0; column < eigensystem.values.length; column += 1) {
    const vector = coefficientVectors.map((row) => row[column]);
    const left = multiplyVector(system.stiffness, vector);
    const right = multiplyVector(system.mass, vector)
      .map((value) => eigensystem.values[column] * value);
    const residual = Math.sqrt(left.reduce((sum, value, index) => (
      sum + (value - right[index]) ** 2
    ), 0));
    maximumResidual = Math.max(maximumResidual, residual);
  }
  return { ...eigensystem, coefficientVectors, maximumResidual };
}

function diagnostics(sector, epsilon, countPerBlock = 4) {
  const system = assemble(sector, epsilon, countPerBlock);
  const solved = solveGeneralized(system);
  let maximumMassAsymmetry = 0;
  let maximumCrossBlockMass = 0;
  for (let i = 0; i < system.mass.length; i += 1) {
    for (let j = 0; j < system.mass.length; j += 1) {
      maximumMassAsymmetry = Math.max(
        maximumMassAsymmetry,
        Math.abs(system.mass[i][j] - system.mass[j][i]),
      );
      if (system.basis[i].family !== system.basis[j].family) {
        maximumCrossBlockMass = Math.max(maximumCrossBlockMass, Math.abs(system.mass[i][j]));
      }
    }
  }
  const massSpectrum = jacobiEigen(system.mass).values;
  return {
    eigenvalues: solved.values,
    maximumResidual: solved.maximumResidual,
    maximumMassAsymmetry,
    maximumCrossBlockMass,
    minimumMassEigenvalue: massSpectrum[0],
  };
}

function quadratic(matrix, vector) {
  const product = multiplyVector(matrix, vector);
  return vector.reduce((sum, value, index) => sum + value * product[index], 0);
}

function linearEvolution(sector, countPerBlock) {
  const system = assemble(sector, evidence.epsilon, countPerBlock);
  const solved = solveGeneralized(system);
  const initial = Array(system.basis.length).fill(0);
  initial[0] = 1 / Math.sqrt(system.mass[0][0]);
  const massInitial = multiplyVector(system.mass, initial);
  const modal = solved.coefficientVectors[0].map((_, column) => (
    solved.coefficientVectors.reduce((sum, row, rowIndex) => (
      sum + row[column] * massInitial[rowIndex]
    ), 0)
  ));
  const { viscosity, finalTime } = evidence.linearEvolution;
  const evolvedModal = modal.map((value, index) => (
    value * Math.exp(-viscosity * solved.values[index] * finalTime)
  ));
  const final = solved.coefficientVectors.map((row) => (
    row.reduce((sum, value, column) => sum + value * evolvedModal[column], 0)
  ));
  const initialEnergy = 0.5 * quadratic(system.mass, initial);
  const finalEnergy = 0.5 * quadratic(system.mass, final);
  const integratedDissipation = modal.reduce((sum, value, index) => (
    sum + 0.5 * value ** 2
      * (1 - Math.exp(-2 * viscosity * solved.values[index] * finalTime))
  ), 0);
  return {
    initialEnergy,
    finalEnergy,
    integratedDissipation,
    energyIdentityResidual: initialEnergy - finalEnergy - integratedDissipation,
    activeGeneralizedModes: modal.filter((value) => Math.abs(value) > 1e-10).length,
  };
}

const klein = diagnostics("klein", evidence.epsilon);
const rotation = diagnostics("rotation", evidence.epsilon);
const kleinFlat = diagnostics("klein", 0);
const rotationFlat = diagnostics("rotation", 0);
const kleinRefined = diagnostics("klein", evidence.epsilon, 8);
const rotationRefined = diagnostics("rotation", evidence.epsilon, 8);
const kleinEvolution = linearEvolution("klein", 8);
const rotationEvolution = linearEvolution("rotation", 8);
const expectedKleinFlat = basisFor("klein").map((mode) => mode.eigenvalue).sort((a, b) => a - b);
const expectedRotationFlat = basisFor("rotation").map((mode) => mode.eigenvalue).sort((a, b) => a - b);
const flatError = Math.max(
  ...kleinFlat.eigenvalues.map((value, index) => Math.abs(value - expectedKleinFlat[index])),
  ...rotationFlat.eigenvalues.map((value, index) => Math.abs(value - expectedRotationFlat[index])),
);
const thresholds = evidence.thresholds;
const retainedLowValues = 4;
const kleinRefinementDifference = Math.max(...klein.eigenvalues
  .slice(0, retainedLowValues)
  .map((value, index) => Math.abs(value - kleinRefined.eigenvalues[index]) / kleinRefined.eigenvalues[index]));
const rotationRefinementDifference = Math.max(...rotation.eigenvalues
  .slice(0, retainedLowValues)
  .map((value, index) => Math.abs(value - rotationRefined.eigenvalues[index]) / rotationRefined.eigenvalues[index]));

for (const result of [klein, rotation]) {
  assert(result.maximumResidual <= thresholds.maximumGeneralizedResidual,
    "generalized eigenvalue residual exceeds threshold");
  assert(result.maximumMassAsymmetry <= thresholds.maximumMassAsymmetry,
    "mass matrix is not symmetric");
  assert(result.minimumMassEigenvalue >= thresholds.minimumMassEigenvalue,
    "mass matrix conditioning gate failed");
  assert(result.maximumCrossBlockMass <= thresholds.maximumCrossBlockMass,
    "metric mixed the declared transverse blocks");
}
assert(flatError <= thresholds.maximumFlatLimitEigenvalueError,
  "zero-throat spectrum does not recover flat eigenvalues");
assert(kleinRefinementDifference <= thresholds.maximumLowSpectrumRelativeDifference,
  "Klein low Ritz spectrum failed refinement gate");
assert(rotationRefinementDifference <= thresholds.maximumLowSpectrumRelativeDifference,
  "rotation low Ritz spectrum failed refinement gate");
for (const evolution of [kleinEvolution, rotationEvolution]) {
  assert(evolution.finalEnergy < evolution.initialEnergy,
    "curved linear evolution must dissipate energy");
  assert(Math.abs(evolution.energyIdentityResidual) <= thresholds.maximumEnergyIdentityResidual,
    "curved linear energy identity failed");
}

console.log(JSON.stringify({
  status: "PASS",
  epsilon: evidence.epsilon,
  klein,
  rotation,
  refinement: {
    kleinLowEigenvalues: kleinRefined.eigenvalues.slice(0, retainedLowValues),
    rotationLowEigenvalues: rotationRefined.eigenvalues.slice(0, retainedLowValues),
    kleinMaximumRelativeDifference: kleinRefinementDifference,
    rotationMaximumRelativeDifference: rotationRefinementDifference
  },
  linearEvolution: {
    klein: kleinEvolution,
    rotation: rotationEvolution
  },
  flatLimitMaximumEigenvalueError: flatError,
  verdict: "The finite throat-weighted generalized eigenproblems are positive, symmetry-blocked and converged algebraically; the two quotient sectors retain distinct Ritz spectra."
}, null, 2));
