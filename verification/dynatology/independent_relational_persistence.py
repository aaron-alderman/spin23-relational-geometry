"""Independent DOP853 control; run after the JavaScript atlas.

Requires numpy and scipy. --dependency-path may name a local installation.
The force implementation and Kepler initialization are independent of JS.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--dependency-path')
parser.add_argument('--short-only', action='store_true')
args = parser.parse_args()
if args.dependency_path:
    sys.path.insert(0, str(Path(args.dependency_path).resolve()))
import numpy as np
import scipy
from scipy.integrate import solve_ivp

root = Path(__file__).resolve().parents[2]
source = root / 'evidence/data/relational-orbital-persistence-v1.json'
atlas = json.loads(source.read_text())
config = atlas['config']
masses = config['masses']
period = 2 * math.pi / math.sqrt(masses[0] + masses[1])


def initial(ratio, phase):
    q = np.zeros(6)
    v = np.zeros(6)
    for p, a, mean in [(1, 1, config['innerMeanAnomaly']), (2, ratio, phase)]:
        e = config['eccentricities'][p - 1]
        E = mean
        for _ in range(25):
            E -= (E - e * math.sin(E) - mean) / (1 - e * math.cos(E))
        n = math.sqrt((masses[0] + masses[p]) / a**3)
        xy = [a * (math.cos(E) - e), a * math.sqrt(1 - e*e) * math.sin(E)]
        vv = [-a * n * math.sin(E) / (1 - e * math.cos(E)),
              a * n * math.sqrt(1 - e*e) * math.cos(E) / (1 - e * math.cos(E))]
        angle = 0 if p == 1 else config['apsidalDifference']
        c, s = math.cos(angle), math.sin(angle)
        q[2*p:2*p+2] = [c*xy[0] - s*xy[1], s*xy[0] + c*xy[1]]
        v[2*p:2*p+2] = [c*vv[0] - s*vv[1], s*vv[0] + c*vv[1]]
    for arr in [q, v]:
        for axis in [0, 1]:
            mean = sum(masses[p] * arr[2*p+axis] for p in range(3)) / sum(masses)
            arr[axis::2] -= mean
    return np.concatenate([q, v])


def rhs(t, z):
    out = np.zeros(12)
    out[:6] = z[6:]
    for i in range(3):
        for j in range(i + 1, 3):
            x, y = z[2*j] - z[2*i], z[2*j+1] - z[2*i+1]
            r3 = (x*x + y*y)**1.5
            out[6+2*i] += masses[j]*x/r3
            out[7+2*i] += masses[j]*y/r3
            out[6+2*j] -= masses[i]*x/r3
            out[7+2*j] -= masses[i]*y/r3
    return out


def energy(z):
    value = sum(.5*masses[i]*(z[6+2*i]**2 + z[7+2*i]**2) for i in range(3))
    return value - sum(masses[i]*masses[j]/math.hypot(z[2*j]-z[2*i], z[2*j+1]-z[2*i+1])
                       for i in range(3) for j in range(i+1, 3))


def distances(z):
    return [math.hypot(z[2*j]-z[2*i], z[2*j+1]-z[2*i+1])
            for i, j in [(0, 1), (0, 2), (1, 2)]]


def run(ratio, phase, cycles, events=True):
    z0 = initial(ratio, phase)
    hill = ((masses[1]+masses[2])/(3*masses[0]))**(1/3)*(1+ratio)/2

    def close(t, z):
        return distances(z)[2] - hill * config['closeEncounterInitialMutualHillRadii']

    def radial(t, z):
        return config['radialExitInnerSemimajorAxes'] - max(distances(z)[:2])

    def stellar(t, z):
        return min(distances(z)[:2]) - config['stellarApproachInnerSemimajorAxes']

    for event in [close, radial, stellar]:
        event.terminal, event.direction = True, -1
    sol = solve_ivp(rhs, [0, cycles*period], z0, method='DOP853', rtol=1e-11,
                    atol=1e-13, max_step=period/12, events=[close, radial, stellar] if events else None)
    if not sol.success:
        raise RuntimeError(sol.message)
    ev = None
    if events:
        for name, times in zip(['close_encounter', 'radial_exit', 'stellar_approach'], sol.t_events):
            if len(times):
                ev = name
    e0 = energy(z0)
    return {'ratio': ratio, 'phase': phase, 'requestedCycles': cycles,
            'completedCycles': float(sol.t[-1]/period), 'event': ev,
            'maxSampledRelativeEnergyError': float(max(abs((energy(z)-e0)/e0) for z in sol.y.T)),
            'finalRelations': distances(sol.y[:, -1]), 'rhsEvaluations': sol.nfev}


target = root / 'evidence/data/relational-orbital-persistence-independent-v1.json'
records = json.loads(target.read_text())['controls'] if args.short_only else []
for point in ([] if args.short_only else atlas['controls']):
    record = run(point['ratio'], point['phase'], atlas['counts']['cycles'])
    record['splittingOutcomes'] = [r['event'] for r in point['runs']]
    record['sameMonitoredOutcomeAsAllSplittings'] = all(r['event'] == record['event'] for r in point['runs'])
    records.append(record)
    print(json.dumps({'stage': 'independent', **record}), flush=True)

base = atlas['perturbation']['base']
short = run(base['ratio'], base['phase'], atlas['perturbation']['cycles'], events=False)
short['splittingDistanceDifference'] = float(np.linalg.norm(
    np.array(short['finalRelations']) - np.array(atlas['perturbation']['baseRelations']['values'])))
analysis = json.loads((root / 'evidence/data/relational-orbital-persistence-analysis-v1.json').read_text())
refinements = analysis['shortTimeRefinement']
for reference in refinements:
    reference['distanceErrorAgainstDOP853'] = float(np.linalg.norm(
        np.array(reference['values']) - np.array(short['finalRelations'])))
physical_taylor = []
for epsilon in [1e-3, 5e-4, 2.5e-4]:
    actual = run(base['ratio'], base['phase'] + epsilon, 10, events=False)
    change = np.array(actual['finalRelations']) - np.array(short['finalRelations'])
    physical_taylor.append({'epsilon': epsilon, 'refinements': [
        {'stepsPerPeriod': ref['stepsPerPeriod'],
         'firstOrderResidual': float(np.linalg.norm(change - epsilon * np.array(ref['first']))),
         'secondOrderResidual': float(np.linalg.norm(change - epsilon * np.array(ref['first'])
                                           - .5 * epsilon**2 * np.array(ref['second'])))}
        for ref in refinements]})
result = {'schema': 'relational-orbital-persistence-independent/v1', 'date': '2026-10-30',
          'atlasSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
          'method': 'scipy.integrate.solve_ivp DOP853', 'rtol': 1e-11, 'atol': 1e-13,
          'numpyVersion': np.__version__, 'scipyVersion': scipy.__version__,
          'controls': records, 'shortTimeControl': short, 'shortTimeRefinement': refinements,
          'independentTaylorComparison': physical_taylor,
          'boundary': 'Agreement of finite runs is not a rigorous time bound; individual chaotic trajectories need not converge over the monitoring window.'}
target.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'output': str(target), 'shortTimeControl': short,
                  'shortTimeRefinement': refinements, 'independentTaylorComparison': physical_taylor}), flush=True)
