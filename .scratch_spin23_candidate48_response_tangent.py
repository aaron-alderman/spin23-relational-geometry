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
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')


if __name__ == '__main__':
    carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
    _, _, response, _, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    weights = [0.05521353245782003, 0, 0, 0.007286467542179783, 0, 0, 0.03125000000000003]
    builder = x.complex_field_builder(carrier)
    identity = np.eye(2)
    sigma_x = np.array([[0, 1], [1, 0]], dtype=complex)
    sigma_z = np.diag([1, -1])
    tangents = [np.sqrt(0.125) * builder((4, 8), 1j * matrix) for matrix in [identity, sigma_x, sigma_z]]
    commutators = [[generator @ tangent - tangent @ generator for generator in response] for tangent in tangents]
    gram = np.array([
        [sum(weight * np.vdot(commutators[i][k], commutators[j][k]).real for k, weight in enumerate(weights)) for j in range(3)]
        for i in range(3)
    ])
    print(json.dumps({'protocol': 'spin23-candidate48-response-tangent/1', 'weightedCommutatorGram': gram.tolist(), 'eigenvalues': np.linalg.eigvalsh(gram).tolist()}, indent=2))
