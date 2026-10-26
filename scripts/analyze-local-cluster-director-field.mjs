#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";

const names = ["Melotte_25", "Melotte_111", "Melotte_22", "Melotte_20", "IC_2391", "IC_2602", "NGC_2451A", "NGC_2632"];
const base = "https://vizier.cds.unistra.fr/viz-bin/asu-tsv?-source=J/A%2bA/673/A114/members";
const columns = "Name,GaiaDR3,inrt,Prob,RA_ICRS,DE_ICRS,pmRA,pmDE,Plx,e_Plx,RV,e_RV,RUWE,NSS";
const rad = value => value * Math.PI / 180;
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const norm = vector => Math.hypot(...vector);
const unit = vector => { const n = norm(vector); return vector.map(value => value / n); };
const median = values => { const s = [...values].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const acuteDeg = (a, b) => Math.acos(Math.min(1, Math.abs(dot(a, b)))) * 180 / Math.PI;

const solve = (matrix, vector) => {
  const n = vector.length;
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row;
    [a[column], a[pivot]] = [a[pivot], a[column]];
    assert.ok(Math.abs(a[column][column]) > 1e-10, "singular fit");
    const scale = a[column][column];
    for (let j = column; j <= n; j += 1) a[column][j] /= scale;
    for (let row = 0; row < n; row += 1) {
      if (row === column) continue;
      const factor = a[row][column];
      for (let j = column; j <= n; j += 1) a[row][j] -= factor * a[column][j];
    }
  }
  return a.map(row => row[n]);
};

const basis = (raDeg, decDeg) => {
  const ra = rad(raDeg); const dec = rad(decDeg);
  return {
    radial: [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)],
    east: [-Math.sin(ra), Math.cos(ra), 0],
    north: [-Math.sin(dec) * Math.cos(ra), -Math.sin(dec) * Math.sin(ra), Math.cos(dec)]
  };
};
const position = row => basis(row.ra, row.dec).radial.map(value => value * 1000 / row.parallax);

const parse = text => {
  const lines = text.split(/\r?\n/u).filter(line => !line.startsWith("#") && line.trim());
  const header = lines[0].split("\t");
  return lines.slice(3).map(line => {
    const values = line.split("\t");
    const item = Object.fromEntries(header.map((key, index) => [key, (values[index] ?? "").trim()]));
    return {
      name: item.Name, sourceId: item.GaiaDR3, inrt: item.inrt === "True", probability: Number(item.Prob),
      ra: Number(item.RA_ICRS), dec: Number(item.DE_ICRS), pmra: Number(item.pmRA), pmdec: Number(item.pmDE),
      parallax: Number(item.Plx), parallaxError: Number(item.e_Plx),
      rv: item.RV === "" ? null : Number(item.RV), rvError: item.e_RV === "" ? null : Number(item.e_RV),
      ruwe: Number(item.RUWE), nss: Number(item.NSS)
    };
  });
};

const fetchCluster = async name => {
  const url = `${base}&Name=${encodeURIComponent(name)}&-out=${columns}&-out.max=10000`;
  const response = await fetch(url);
  assert.equal(response.ok, true, `${name} query failed`);
  const rows = parse(await response.text());
  return { name, url, rows, normalizedRowsSha256: createHash("sha256").update(JSON.stringify(rows)).digest("hex") };
};

const fitVelocity = rows => {
  const normal = Array.from({ length: 3 }, () => [0, 0, 0]); const right = [0, 0, 0];
  for (const row of rows) for (const [design, value] of [[basis(row.ra, row.dec).east, 4.74047 * row.pmra / row.parallax], [basis(row.ra, row.dec).north, 4.74047 * row.pmdec / row.parallax]]) {
    for (let i = 0; i < 3; i += 1) { right[i] += design[i] * value; for (let j = 0; j < 3; j += 1) normal[i][j] += design[i] * design[j]; }
  }
  return solve(normal, right);
};

const fitGradient = rows => {
  const points = rows.map(row => ({ ...row, xyz: position(row) }));
  const centre = [0, 1, 2].map(i => points.reduce((s, row) => s + row.xyz[i], 0) / points.length);
  const mean = points.reduce((s, row) => s + row.residual, 0) / points.length;
  const normal = Array.from({ length: 3 }, () => [0, 0, 0]); const right = [0, 0, 0];
  for (const row of points) { const x = row.xyz.map((v, i) => v - centre[i]); const y = row.residual - mean;
    for (let i = 0; i < 3; i += 1) { right[i] += x[i] * y; for (let j = 0; j < 3; j += 1) normal[i][j] += x[i] * x[j]; }
  }
  const gradient = solve(normal, right); return { centre, gradient, direction: unit(gradient), magnitude: norm(gradient) };
};

const analyseCluster = ({ name, url, rows, normalizedRowsSha256 }) => {
  const astrometric = rows.filter(row => row.inrt && row.probability >= 0.5 && row.parallax > 0 && row.ruwe <= 1.4 && row.nss === 0);
  const velocity = fitVelocity(astrometric);
  const rvRows = astrometric.filter(row => row.rv !== null && row.rvError !== null && row.rvError <= 5).map(row => ({
    ...row, residual: row.rv - dot(basis(row.ra, row.dec).radial, velocity)
  }));
  const med = median(rvRows.map(row => row.residual)); const mad = median(rvRows.map(row => Math.abs(row.residual - med))); const sigma = Math.max(0.5, 1.4826 * mad);
  const inliers = rvRows.filter(row => Math.abs(row.residual - med) <= 3 * sigma);
  assert.ok(inliers.length >= 20, `${name} has too few controlled RV rows`);
  const full = fitGradient(inliers); const foldAngles = [];
  for (let fold = 0; fold < 5; fold += 1) {
    const train = inliers.filter(row => Number.parseInt(createHash("sha256").update(row.sourceId).digest("hex").slice(0, 8), 16) % 5 !== fold);
    foldAngles.push(acuteDeg(full.direction, fitGradient(train).direction));
  }
  return { name, url, normalizedRowsSha256, catalogueRows: rows.length, astrometricRows: astrometric.length, rvRows: rvRows.length, robustRvRows: inliers.length,
    centreIcrsPc: full.centre, gradientIcrsKmPerSecPerPc: full.gradient, gradientMagnitudeKmPerSecPerPc: full.magnitude,
    directorIcrs: full.direction, foldDirectionRangeDeg: [Math.min(...foldAngles), Math.max(...foldAngles)] };
};

const qVector = direction => [direction[0] ** 2, direction[1] ** 2, direction[2] ** 2, direction[0] * direction[1], direction[0] * direction[2], direction[1] * direction[2]];
const meanVector = vectors => vectors[0].map((_, i) => vectors.reduce((s, v) => s + v[i], 0) / vectors.length);
const squaredError = (a, b) => a.reduce((s, value, i) => s + (value - b[i]) ** 2, 0);
const affineFit = rows => {
  const origin = meanVector(rows.map(row => row.centreIcrsPc));
  const coefficients = Array.from({ length: 6 }, (_, component) => {
    const normal = Array.from({ length: 4 }, () => [0, 0, 0, 0]); const right = [0, 0, 0, 0];
    for (const row of rows) { const design = [1, ...row.centreIcrsPc.map((v, i) => (v - origin[i]) / 100)]; const y = qVector(row.directorIcrs)[component];
      for (let i = 0; i < 4; i += 1) { right[i] += design[i] * y; for (let j = 0; j < 4; j += 1) normal[i][j] += design[i] * design[j]; }
    } return solve(normal, right);
  });
  return row => { const design = [1, ...row.centreIcrsPc.map((v, i) => (v - origin[i]) / 100)]; return coefficients.map(c => dot(c, design)); };
};

const creaseFit = rows => {
  const normals = [[1,0,0],[0,1,0],[0,0,1]];
  for (let i = 0; i < rows.length; i += 1) for (let j = i + 1; j < rows.length; j += 1) normals.push(unit(rows[i].centreIcrsPc.map((v, k) => v - rows[j].centreIcrsPc[k])));
  let best = null;
  for (const normal of normals) { const projections = rows.map(row => dot(row.centreIcrsPc, normal)).sort((a,b) => a-b);
    for (let i = 1; i < projections.length - 2; i += 1) { const threshold = (projections[i] + projections[i + 1]) / 2;
      const left = rows.filter(row => dot(row.centreIcrsPc, normal) <= threshold); const right = rows.filter(row => dot(row.centreIcrsPc, normal) > threshold); if (left.length < 2 || right.length < 2) continue;
      const lq = meanVector(left.map(row => qVector(row.directorIcrs))); const rq = meanVector(right.map(row => qVector(row.directorIcrs)));
      const error = rows.reduce((s,row) => s + squaredError(qVector(row.directorIcrs), dot(row.centreIcrsPc, normal) <= threshold ? lq : rq), 0);
      if (!best || error < best.error) best = { normal, threshold, lq, rq, error };
    }
  }
  return row => dot(row.centreIcrsPc, best.normal) <= best.threshold ? best.lq : best.rq;
};

const clusters = (await Promise.all(names.map(fetchCluster))).map(analyseCluster);
const errors = { flat: [], smoothAffine: [], crease: [] };
for (let holdout = 0; holdout < clusters.length; holdout += 1) {
  const train = clusters.filter((_, index) => index !== holdout); const test = clusters[holdout]; const observed = qVector(test.directorIcrs);
  const flat = meanVector(train.map(row => qVector(row.directorIcrs))); const smooth = affineFit(train); const crease = creaseFit(train);
  errors.flat.push(squaredError(observed, flat)); errors.smoothAffine.push(squaredError(observed, smooth(test))); errors.crease.push(squaredError(observed, crease(test)));
}
const summaries = Object.fromEntries(Object.entries(errors).map(([key, values]) => [key, { meanProjectorComponentSquaredError: values.reduce((a,b)=>a+b,0)/values.length, medianProjectorComponentSquaredError: median(values) }]));
const m44 = clusters.find(row => row.name === "NGC_2632"); const frozenM44 = [0.5776490362226067, 0.6726346869907586, -0.4624761278249265];
const pairwise = [];
for (let i = 0; i < clusters.length; i += 1) for (let j = i + 1; j < clusters.length; j += 1) pairwise.push({ left: clusters[i].name, right: clusters[j].name,
  separationPc: norm(clusters[i].centreIcrsPc.map((v,k)=>v-clusters[j].centreIcrsPc[k])), directorAngleDeg: acuteDeg(clusters[i].directorIcrs, clusters[j].directorIcrs) });

const result = { schemaVersion: "0.1.0", status: "retrospective homogeneous-catalogue field spike; not confirmatory",
  authority: { catalogue: "Hunt and Reffert 2023 corrected Gaia DR3 members", source: "J/A+A/673/A114/members", doi: "10.1051/0004-6361/202346285" },
  frozenSelection: { clusterNames: names, memberGate: "inrt=True; Prob>=0.5; parallax>0; RUWE<=1.4; NSS=0", rvGate: "finite RV and e_RV<=5 km/s; then 3 robust residual sigmas" },
  clusters, m44CrossCatalogueAcuteAngleDeg: acuteDeg(m44.directorIcrs, frozenM44), pairwise, leaveOneClusterOut: summaries,
  verdict: "the lowest leave-one-cluster-out error determines whether the present sparse ordinary director estimates prefer flat, smooth-affine or two-region structure; no four-dimensional curl or Frobenius claim is admitted without an explicit normal lift and denser independent field" };
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write-full-snapshot")){
  fs.writeFileSync(new URL("../evidence/data/local-cluster-director-field-full-snapshot-v1.json",import.meta.url),output);
  console.log("wrote evidence/data/local-cluster-director-field-full-snapshot-v1.json");
}else console.log(output.trimEnd());
