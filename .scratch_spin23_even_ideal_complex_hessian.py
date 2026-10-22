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
k = load('.scratch_spin23_even_ideal_weight_kkt.py', 'k')

GRADING = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))
WEIGHTS = [1 / 48, 191 / 40, 0, 1 / 8]


def build_ideals(full_factors):
    even_factors = [u.parity_parts(factor, GRADING)[0] for factor in full_factors]
    middle = k.killing_split(even_factors[1])
    return [even_factors[0]] + [row['generators'] for row in middle] + [even_factors[2]]


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    e, q = x.e, x.q
    _, audit, parent, _, closure_coefficients, _, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = build_ideals(full_factors)
    active_generators = [generator for weight, ideal in zip(WEIGHTS, ideals) if weight > 0 for generator in ideal]
    row = x.analyze(
        carrier,
        factor_builder=build_ideals,
        weights=WEIGHTS,
        tangent_generators=active_generators,
        random_kernel_samples=256,
    )
    print(json.dumps({'protocol': 'spin23-even-ideal-complex-hessian/1', 'row': row}, indent=2, default=list))
