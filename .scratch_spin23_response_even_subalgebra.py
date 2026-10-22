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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
q = load('.scratch_spin23_exception_factor_cone_kkt.py', 'q')
z = load('.scratch_spin23_vacuum_centralizer_repair.py', 'z')


def real_pack(matrix):
    return np.concatenate([matrix.real.ravel(), matrix.imag.ravel()])


def span_basis(matrices, tolerance=1e-10):
    if not matrices:
        return []
    columns = np.stack([real_pack(matrix) for matrix in matrices], axis=1)
    gram = columns.T @ columns
    values, vectors = np.linalg.eigh(gram)
    keep = values > tolerance * max(1.0, float(values[-1]))
    coefficients = vectors[:, keep] / np.sqrt(values[keep])
    return [sum(coefficients[i, j] * matrices[i] for i in range(len(matrices))) for j in range(coefficients.shape[1])]


def parity_parts(generators, grading):
    even = [(generator + grading @ generator @ grading) / 2 for generator in generators]
    odd = [(generator - grading @ generator @ grading) / 2 for generator in generators]
    return span_basis(even), span_basis(odd)


def cross_bracket_span(left, right):
    return span_basis([a @ b - b @ a for a in left for b in right])


def analyze(carrier):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    grading = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))
    rows = []
    all_even = []
    all_odd = []
    for index, factor in enumerate(factors):
        even, odd = parity_parts(factor, grading)
        all_even.extend(even)
        all_odd.extend(odd)
        rows.append({
            'factorIndex': index,
            'factorDimension': len(factor),
            'evenDimension': len(even),
            'oddDimension': len(odd),
            'evenInvariants': z.algebra_invariants(even),
            'oddOddBracketSpanDimension': len(cross_bracket_span(odd, odd)),
            'evenOddBracketSpanDimension': len(cross_bracket_span(even, odd)),
        })
    even_closure = span_basis(all_even)
    odd_module = span_basis(all_odd)
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'fullClosureDimension': len(closure),
        'factorRows': rows,
        'evenSubalgebraDimension': len(even_closure),
        'evenSubalgebraInvariants': z.algebra_invariants(even_closure),
        'oddModuleDimension': len(odd_module),
        'globalOddOddBracketSpanDimension': len(cross_bracket_span(odd_module, odd_module)),
        'globalEvenOddBracketSpanDimension': len(cross_bracket_span(even_closure, odd_module)),
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-response-even-subalgebra/1', 'row': analyze(carrier)}, indent=2, default=list))
