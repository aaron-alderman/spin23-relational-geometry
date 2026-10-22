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
u = load('.scratch_spin23_response_even_subalgebra.py', 'u')


WEIGHTS = [2.0041536863966773, 0.012461059190031154, 12.01246105919003]
GRADING = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))


def even_part(factor):
    return u.parity_parts(factor, GRADING)[0]


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    # Reconstruct the response generators separately so the tangent audit reports
    # the even subalgebra rather than the original 61-dimensional closure.
    e = x.e
    q = x.q
    _, audit, parent, _, closure_coefficients, _, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    even_generators = [generator for factor in full_factors for generator in even_part(factor)]
    row = x.analyze(
        carrier,
        factor_transform=even_part,
        weights=WEIGHTS,
        tangent_generators=even_generators,
        random_kernel_samples=256,
    )
    print(json.dumps({'protocol': 'spin23-response-even-complex-hessian/1', 'row': row}, indent=2, default=list))
