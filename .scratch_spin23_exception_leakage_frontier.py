from concurrent.futures import ProcessPoolExecutor
from fractions import Fraction
import importlib.util, json, sys
import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
h = load('.scratch_spin23_all_robust_hessian_scan.py', 'h')
f = load('.scratch_spin23_ab_lie_closure_family.py', 'f')
a = load('.scratch_spin23_adjoint_casimir_sample.py', 'a')
z = load('.scratch_spin23_vacuum_centralizer_repair.py', 'z')


def analyze(carrier):
    stationary = h.analyze(carrier)
    audit = f.audit(carrier, details=True)
    parent = [a.full_matrix(blocks, audit['_components']) for blocks in audit['_basis']]
    desired_fields = [field for label in stationary['active'] for field in a.orbit_basis(carrier, label)]
    defect_fields = a.orbit_basis(carrier, (2, 5))
    desired_gram = z.constraint_gram(parent, desired_fields)
    defect_gram = z.constraint_gram(parent, defect_fields)
    values, vectors = np.linalg.eigh(desired_gram)
    positive = values > 1e-9 * max(1.0, float(values[-1]))
    whitening = vectors[:, positive] / np.sqrt(values[positive])[None, :]
    reduced = whitening.T @ defect_gram @ whitening
    ratios, directions = np.linalg.eigh(reduced)
    best_ratio = float(ratios[-1])
    optimal_multiplicity = int(np.sum(np.abs(ratios - best_ratio) <= 1e-8 * max(1.0, abs(best_ratio))))
    coefficients = whitening @ directions[:, -1]
    desired_cost = float(coefficients @ desired_gram @ coefficients)
    defect_gain = float(coefficients @ defect_gram @ coefficients)
    best_generator = sum(coefficients[i] * parent[i] for i in range(len(parent)))
    defect_spectrum = a.casimir_spectrum([best_generator], defect_fields)
    desired_510_spectrum = a.casimir_spectrum([best_generator], a.orbit_basis(carrier, (5, 10)))
    hermitian_levels = np.linalg.eigvalsh(-1j * best_generator)
    distinct_levels = []
    for level in hermitian_levels:
        if not distinct_levels or abs(level - distinct_levels[-1][0]) > 1e-8:
            distinct_levels.append([float(level), 1])
        else:
            distinct_levels[-1][1] += 1
    native_optimal = []
    for index, generator in enumerate(parent):
        vector = np.zeros(len(parent)); vector[index] = 1
        dc = float(vector @ desired_gram @ vector)
        dg = float(vector @ defect_gram @ vector)
        if dc > 1e-10 and abs(dg / dc - best_ratio) <= 1e-8:
            spectrum = a.casimir_spectrum([generator], defect_fields)
            native_optimal.append({
                'index': index,
                'defectRank': int(np.sum(spectrum > 1e-8)),
                'defectMin': float(spectrum[0]),
                'defectMax': float(spectrum[-1]),
            })
    leakage_by_orbit = {}
    for label in stationary['active']:
        gram = z.constraint_gram(parent, a.orbit_basis(carrier, label))
        leakage_by_orbit[str(label)] = float(coefficients @ gram @ coefficients)
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'stabilizerDimension': int(np.sum(~positive)),
        'maximumDefectToDesiredRatio': best_ratio,
        'optimalEigenspaceMultiplicity': optimal_multiplicity,
        'topGeneralizedRatios': [float(x) for x in ratios[-12:]],
        'minimumDesiredCostPerUnitDefect': 1 / best_ratio,
        'rationalRatio': str(Fraction(best_ratio).limit_denominator(1000)),
        'rationalCost': str(Fraction(1 / best_ratio).limit_denominator(1000)),
        'normalizationCheck': {'desiredCost': desired_cost, 'defectGain': defect_gain},
        'desiredLeakageByOrbit': leakage_by_orbit,
        'defectSpectrum': [float(x) for x in defect_spectrum],
        'defectRank': int(np.sum(defect_spectrum > 1e-8)),
        'desired510Spectrum': [float(x) for x in desired_510_spectrum],
        'desired510Rank': int(np.sum(desired_510_spectrum > 1e-8)),
        'generatorHermitianLevels': distinct_levels,
        'nativeOptimalGenerators': native_optimal,
    }


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
        and x['lpair'] == ((8, 10), (10, 1))
        and x['rpair'][1] == (7, 5)
        and x['rpair'][0][1] in (2, 7)
    ]
    with ProcessPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(analyze, carriers))
    print(json.dumps({'protocol': 'spin23-exception-leakage-frontier/1', 'rows': rows}, indent=2, default=list))
