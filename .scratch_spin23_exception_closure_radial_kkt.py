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
h = load('.scratch_spin23_all_robust_hessian_scan.py', 'h')
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')


def radial_data(carrier, closure):
    labels = list(s.optimum(carrier)[1])
    fm = h.field_builder(carrier)
    matrices = [fm(label, h.canonical(label)).astype(complex) for label in labels]
    linear = np.array([h.t2(matrix.real) for matrix in matrices])
    quartic = np.diag([h.t4(matrix.real) for matrix in matrices])
    for i, j in combinations(range(len(labels)), 2):
        total = h.t4((matrices[i] + matrices[j]).real)
        quartic[i, j] = quartic[j, i] = (total - quartic[i, i] - quartic[j, j]) / 2
    casimir = np.array([
        sum(np.linalg.norm(generator @ matrix - matrix @ generator) ** 2 for generator in closure) / linear[i]
        for i, matrix in enumerate(matrices)
    ])
    return labels, matrices, linear, quartic, casimir


def solve(linear, quartic, casimir, coupling):
    n = len(linear)
    effective = linear * (1 - coupling * casimir)
    phases = []
    for mask in range(1, 1 << n):
        active = [i for i in range(n) if mask >> i & 1]
        block = quartic[np.ix_(active, active)]
        if np.linalg.matrix_rank(block, 1e-9) < len(active):
            continue
        amplitudes = np.linalg.solve(2 * block, effective[active])
        if np.min(amplitudes) < -1e-8:
            continue
        full = np.zeros(n)
        full[active] = amplitudes
        gradient = -effective + 2 * quartic @ full
        if any(gradient[i] < -1e-8 for i in range(n) if i not in active):
            continue
        phases.append((float(-effective @ full + full @ quartic @ full), full, gradient))
    if not phases:
        return None
    phases.sort(key=lambda row: row[0])
    return phases[0]


def signature(labels, amplitudes):
    return [list(labels[i]) for i, value in enumerate(amplitudes) if value > 1e-8]


def desired_feasibility_interval(labels, linear, quartic, casimir, desired):
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    inactive = [i for i in range(len(labels)) if i not in active]
    block = quartic[np.ix_(active, active)]
    x0 = np.linalg.solve(2 * block, linear[active])
    x1 = np.linalg.solve(2 * block, -linear[active] * casimir[active])
    full0 = np.zeros(len(labels)); full0[active] = x0
    full1 = np.zeros(len(labels)); full1[active] = x1
    g0 = -linear + 2 * quartic @ full0
    g1 = linear * casimir + 2 * quartic @ full1
    constraints = []
    for local, index in enumerate(active):
        constraints.append((f"active {labels[index]} amplitude", float(x0[local]), float(x1[local])))
    for index in inactive:
        constraints.append((f"inactive {labels[index]} gradient", float(g0[index]), float(g1[index])))
    lower = 0.0
    upper = float('inf')
    lower_source = 'nonnegative coupling'
    upper_source = None
    impossible = []
    for name, intercept, slope in constraints:
        if abs(slope) <= 1e-12:
            if intercept < -1e-9:
                impossible.append({'constraint': name, 'intercept': intercept, 'slope': slope})
        elif slope > 0:
            bound = -intercept / slope
            if bound > lower:
                lower, lower_source = bound, name
        else:
            bound = -intercept / slope
            if bound < upper:
                upper, upper_source = bound, name
    feasible = not impossible and upper + 1e-9 >= max(0.0, lower)
    return {
        'feasible': feasible,
        'lowerBound': lower,
        'lowerBoundSource': lower_source,
        'upperBound': None if np.isinf(upper) else upper,
        'upperBoundSource': upper_source,
        'constantViolations': impossible,
        'activeAmplitudeAffine': {
            str(labels[index]): {'intercept': float(x0[local]), 'slope': float(x1[local])}
            for local, index in enumerate(active)
        },
        'inactiveGradientAffine': {
            str(labels[index]): {'intercept': float(g0[index]), 'slope': float(g1[index])}
            for index in inactive
        },
    }


def analyze(carrier):
    stationary, audit, parent, stabilizer, coefficients, closure, residual = e.construct(carrier)
    labels, matrices, linear, quartic, casimir = radial_data(carrier, closure)
    desired = {tuple(label) for label in stationary['active']}
    grid = [0, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2, 3, 4, 6, 8]
    rows = []
    for coupling in grid:
        solution = solve(linear, quartic, casimir, coupling)
        if solution is None:
            rows.append({'coupling': coupling, 'failure': 'no-kkt-phase'})
            continue
        energy, amplitudes, gradient = solution
        active = signature(labels, amplitudes)
        rows.append({
            'coupling': coupling,
            'energy': energy,
            'active': active,
            'desiredSupport': {tuple(x) for x in active} == desired,
            'minimumActiveAmplitudeSquared': float(min(amplitudes[i] for i in range(len(labels)) if amplitudes[i] > 1e-8)),
            'minimumInactiveKktGradient': float(min([gradient[i] for i in range(len(labels)) if amplitudes[i] <= 1e-8] or [0])),
        })
    transitions = []
    previous = None
    for row in rows:
        current = json.dumps(row.get('active'))
        if current != previous:
            transitions.append(row)
            previous = current
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'closureDimension': len(closure),
        'labels': labels,
        'casimirByOrbit': {str(labels[i]): float(casimir[i]) for i in range(len(labels))},
        'desiredSupportFeasibilityInterval': desired_feasibility_interval(labels, linear, quartic, casimir, desired),
        'sampledTransitions': transitions,
        'desiredAtAnySample': any(row.get('desiredSupport') for row in rows),
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
    print(json.dumps({'protocol': 'spin23-exception-closure-radial-kkt/1', 'rows': rows}, indent=2, default=list))
