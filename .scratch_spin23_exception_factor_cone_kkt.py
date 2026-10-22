from concurrent.futures import ProcessPoolExecutor
from itertools import combinations
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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
r = load('.scratch_spin23_exception_closure_radial_kkt.py', 'r')


def intersection_basis(closure_coefficients, ideal_space, tolerance=1e-8):
    outside = closure_coefficients - ideal_space @ (ideal_space.T @ closure_coefficients)
    values, vectors = np.linalg.eigh(outside.T @ outside)
    keep = values <= tolerance
    return closure_coefficients @ vectors[:, keep], values


def matrices(parent, coefficients):
    return [sum(coefficients[i, j] * parent[i] for i in range(len(parent))) for j in range(coefficients.shape[1])]


def factor_casimir(linear, canonical_matrices, generators):
    return np.array([
        sum(np.linalg.norm(generator @ field - field @ generator) ** 2 for generator in generators) / linear[i]
        for i, field in enumerate(canonical_matrices)
    ])


def kkt_constraints(labels, linear, quartic, casimirs, desired):
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    inactive = [i for i in range(len(labels)) if i not in active]
    block = quartic[np.ix_(active, active)]
    x0 = np.linalg.solve(2 * block, linear[active])
    xslopes = []
    for casimir in casimirs:
        xslopes.append(np.linalg.solve(2 * block, -linear[active] * casimir[active]))
    xslopes = np.stack(xslopes, axis=1)
    full0 = np.zeros(len(labels)); full0[active] = x0
    fullslopes = np.zeros((len(labels), len(casimirs))); fullslopes[active, :] = xslopes
    g0 = -linear + 2 * quartic @ full0
    gslopes = np.stack([linear * casimir for casimir in casimirs], axis=1) + 2 * quartic @ fullslopes
    rows = []
    for local, index in enumerate(active):
        rows.append((f"active {labels[index]} amplitude", float(x0[local]), xslopes[local]))
    for index in inactive:
        rows.append((f"inactive {labels[index]} gradient", float(g0[index]), gslopes[index]))
    for factor in range(len(casimirs)):
        slope = np.zeros(len(casimirs)); slope[factor] = 1
        rows.append((f"factor {factor} nonnegative", 0.0, slope))
    return rows


def feasible_vertices(constraints, dimension, tolerance=1e-8):
    candidates = []
    for chosen in combinations(range(len(constraints)), dimension):
        matrix = np.stack([constraints[i][2] for i in chosen])
        rhs = -np.array([constraints[i][1] for i in chosen])
        if np.linalg.matrix_rank(matrix, tolerance) < dimension:
            continue
        point = np.linalg.solve(matrix, rhs)
        slacks = np.array([intercept + slope @ point for _, intercept, slope in constraints])
        if np.min(slacks) >= -tolerance:
            candidates.append((float(np.sum(point)), point, slacks, chosen))
    candidates.sort(key=lambda row: row[0])
    return candidates


def maximum_uniform_physical_margin(constraints, factor_count, tolerance=1e-8):
    extended = []
    for name, intercept, slope in constraints:
        if name.startswith('factor '):
            extended.append((name, intercept, np.concatenate([slope, [0.0]])))
        else:
            extended.append((name, intercept, np.concatenate([slope, [-1.0]])))
    margin_slope = np.zeros(factor_count + 1); margin_slope[-1] = 1
    extended.append(('margin nonnegative', 0.0, margin_slope))
    vertices = feasible_vertices(extended, factor_count + 1, tolerance)
    if not vertices:
        return None
    best = max(vertices, key=lambda row: row[1][-1])
    _, point, slacks, chosen = best
    return {
        'weights': point[:-1].tolist(),
        'uniformMargin': float(point[-1]),
        'minimumExtendedSlack': float(np.min(slacks)),
        'saturatedConstraints': [extended[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
        'vertexDefiningConstraints': [extended[i][0] for i in chosen],
    }


def analyze(carrier):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    labels, canonical, linear, quartic, total_casimir = r.radial_data(carrier, closure)
    factor_coefficients = []
    factor_residuals = []
    for ideal_space in audit['_spaces']:
        coefficients, values = intersection_basis(closure_coefficients, ideal_space)
        factor_coefficients.append(coefficients)
        factor_residuals.append(float(max(values[:coefficients.shape[1]]) if coefficients.shape[1] else 0))
    factor_generators = [matrices(parent, coefficients) for coefficients in factor_coefficients]
    casimirs = [factor_casimir(linear, canonical, generators) for generators in factor_generators]
    desired = {tuple(label) for label in stationary['active']}
    constraints = kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = feasible_vertices(constraints, len(casimirs))
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {
            'weights': weights.tolist(),
            'weightSum': objective,
            'minimumSlack': float(np.min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
            'vertexDefiningConstraints': [constraints[i][0] for i in chosen],
        }
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'closureDimension': len(closure),
        'factorDimensions': [len(generators) for generators in factor_generators],
        'intersectionKernelMaximumResiduals': factor_residuals,
        'casimirByFactorAndOrbit': [
            {str(labels[i]): float(casimir[i]) for i in range(len(labels))}
            for casimir in casimirs
        ],
        'intendedSupportKktFeasible': bool(vertices),
        'feasibleVertexCount': len(vertices),
        'minimumWeightSumVertex': best,
        'maximumUniformPhysicalMarginVertex': maximum_uniform_physical_margin(constraints, len(casimirs)),
        'constraintRows': [
            {'name': name, 'intercept': intercept, 'slopes': slope.tolist()}
            for name, intercept, slope in constraints
        ],
    }


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
        and x['lpair'] == ((8, 10), (10, 1))
        and x['rpair'][1] == (7, 5)
        and x['rpair'][0][1] in (2, 7)
    ]
    with ProcessPoolExecutor(max_workers=2) as pool:
        rows = list(pool.map(analyze, carriers))
    print(json.dumps({'protocol': 'spin23-exception-factor-cone-kkt/1', 'rows': rows}, indent=2, default=list))
