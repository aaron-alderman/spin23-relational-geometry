import importlib.util
import json
import sys

import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')
f = load('.scratch_spin23_u14_active_moduli_finite.py', 'f')


def analyze(carrier):
    stationary, closure, preserving, labels, canonical, linear, quartic, _ = u.preserving_basis(carrier)
    casimirs = [x.q.factor_casimir(linear, canonical, [generator]) for generator in preserving]
    combined = sum(f.BASE_WEIGHTS[i] * casimirs[i] for i in range(4))
    old_active = {tuple(label) for label in stationary['active']}
    desired = old_active | {(1, 9)}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    rhs = linear[active] * (1 - combined[active])
    matrix = 2 * quartic[np.ix_(active, active)]
    amplitudes = np.linalg.solve(matrix, rhs)
    gradients = -linear * (1 - combined) + 2 * quartic[:, active] @ amplitudes
    inactive = [i for i in range(len(labels)) if i not in active]
    energy = float(-rhs @ amplitudes + amplitudes @ quartic[np.ix_(active, active)] @ amplitudes)
    return {
        'activeOrbits': [tuple(labels[i]) for i in active],
        'amplitudeSquared': {str(labels[i]): float(amplitudes[k]) for k, i in enumerate(active)},
        'allAmplitudesPositive': bool(np.all(amplitudes > 1e-10)),
        'activeStationarityMaximumResidual': float(np.max(np.abs(gradients[active]))),
        'inactiveMinimumGradient': float(np.min(gradients[inactive])),
        'inactiveNegativeGradients': [
            {'orbit': tuple(labels[i]), 'gradient': float(gradients[i])}
            for i in inactive if gradients[i] < -1e-8
        ],
        'inactiveZeroGradients': [
            {'orbit': tuple(labels[i]), 'gradient': float(gradients[i])}
            for i in inactive if abs(gradients[i]) <= 1e-8
        ],
        'radialQuarticEigenvalues': np.linalg.eigvalsh(matrix).tolist(),
        'radialEnergy': energy,
        'oldActiveOrbits': sorted(old_active),
        'responseWeights': f.BASE_WEIGHTS.tolist(),
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-u14-five-orbit-kkt/1', 'row': analyze(carrier)}, indent=2, default=list))
