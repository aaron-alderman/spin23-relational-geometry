#!/usr/bin/env node

import assert from "node:assert/strict";

const a=[1,4,9], b=[2,7,11];
const da=a[0]-a[1], db=b[0]-b[1];
const lambda=3, kappa=1;
const xStar=-lambda/(2*kappa*da*db);
assert.ok(Math.abs(xStar)<1);

const orientV=(x)=>lambda*da*db*x/2+kappa*da*da*db*db*x*x/2;
const secondDerivative= kappa*da*da*db*db;
assert.ok(secondDerivative>0);
assert.ok(orientV(xStar)<orientV(-1));
assert.ok(orientV(xStar)<orientV(1));

const theta=0.5*Math.acos(xStar);
const commutatorNormSquared=0.5*da*da*db*db*Math.sin(2*theta)**2;
assert.ok(commutatorNormSquared>0);

const degreeSixOrientationLinear=true;
const degreeEightInteriorMinimum=true;

console.log(JSON.stringify({
  protocol:"first-nonaligning-flavour-potential-certificate/1",
  spectra:{a,b},
  parameters:{lambda,kappa},
  cos2Theta:xStar,
  thetaRadians:theta,
  commutatorNormSquared,
  secondDerivative,
  degreeSixOrientationLinear,
  degreeEightInteriorMinimum,
  passed:true
},null,2));

