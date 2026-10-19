#!/usr/bin/env node

const variables = [
  { name: "y1", weight: 2 },
  { name: "y2", weight: 3 },
  { name: "y3", weight: 3 },
  { name: "y4", weight: 4 },
];

function enumerate(maxWeight) {
  const out = [];
  function visit(index, remaining, exponents) {
    if (index === variables.length) {
      const totalExponent = exponents.reduce((a, b) => a + b, 0);
      if (totalExponent >= 2) {
        const weight = exponents.reduce((s, e, i) => s + e * variables[i].weight, 0);
        out.push({
          monomial: exponents.map((e, i) => e ? `${variables[i].name}^${e}` : "").filter(Boolean).join("*"),
          exponents: [...exponents],
          wordLength: weight,
        });
      }
      return;
    }
    const w = variables[index].weight;
    for (let e = 0; e * w <= remaining; e += 1) {
      exponents[index] = e;
      visit(index + 1, remaining - e * w, exponents);
    }
    exponents[index] = 0;
  }
  visit(0, maxWeight, [0, 0, 0, 0]);
  return out.sort((a, b) => a.wordLength - b.wordLength || a.monomial.localeCompare(b.monomial));
}

const throughSeven = enumerate(7);
const throughEight = enumerate(8);
const y4SquaredBeforeEight = throughSeven.some((m) => m.exponents[3] >= 2);
const y4SquaredAtEight = throughEight.find((m) => m.exponents[3] === 2 && m.exponents.slice(0, 3).every((e) => e === 0));
const passed = !y4SquaredBeforeEight && y4SquaredAtEight?.wordLength === 8;

console.log(JSON.stringify({
  protocol: "cp-even-degree-sixteen-threshold-certificate/1",
  coordinateWeights: Object.fromEntries(variables.map((v) => [v.name, v.weight])),
  cpOddPrimitiveWordLength: 6,
  cpOddPrimitiveAllowedLinearlyUnderCP: false,
  y4SquaredPresentThroughWordLengthSeven: y4SquaredBeforeEight,
  firstY4Squared: y4SquaredAtEight,
  correspondingYukawaDegree: 16,
  constructivePotential: "sum_i lambda_i (yi-yi*)^2",
  residualDegeneracy: "U and conjugate(U)",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
