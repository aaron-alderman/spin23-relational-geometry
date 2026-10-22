from collections import deque
from concurrent.futures import ProcessPoolExecutor
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


def close_coefficients(parent, seeds, tolerance=1e-9):
    parent_norms = np.array([np.vdot(x, x).real for x in parent])
    basis = []
    matrices = []
    queue = deque()

    def add(vector):
        vector = np.asarray(vector, dtype=float).copy()
        for _ in range(2):
            for old in basis:
                vector -= np.dot(old, vector) * old
        norm = np.linalg.norm(vector)
        if norm <= tolerance:
            return False
        vector /= norm
        basis.append(vector)
        matrices.append(sum(vector[i] * parent[i] for i in range(len(parent))))
        queue.append(len(basis) - 1)
        return True

    for seed in seeds:
        add(seed)
    maximum_residual = 0.0
    while queue:
        i = queue.popleft()
        for j in range(i):
            commutator = matrices[i] @ matrices[j] - matrices[j] @ matrices[i]
            coefficients = np.array([
                np.vdot(generator, commutator).real / parent_norms[k]
                for k, generator in enumerate(parent)
            ])
            projected = sum(coefficients[k] * parent[k] for k in range(len(parent)))
            maximum_residual = max(maximum_residual, float(np.linalg.norm(commutator - projected)))
            add(coefficients)
    return np.stack(basis, axis=1), matrices, maximum_residual


def intersection_dimension(left, right, tolerance=1e-8):
    joined = np.concatenate([left, right], axis=1)
    return left.shape[1] + right.shape[1] - int(np.linalg.matrix_rank(joined, tolerance))


def spectrum_row(generators, fields):
    values = a.casimir_spectrum(generators, fields)
    return {
        'min': float(values[0]),
        'max': float(values[-1]),
        'rank': int(np.sum(values > 1e-8)),
        'dimension': len(values),
    }


def construct(carrier):
    stationary = h.analyze(carrier)
    audit = f.audit(carrier, details=True)
    parent = [a.full_matrix(blocks, audit['_components']) for blocks in audit['_basis']]
    desired_fields = [field for label in stationary['active'] for field in a.orbit_basis(carrier, label)]
    _, centralizer_coefficients = z.kernel_basis(z.constraint_gram(parent, desired_fields))
    native = np.zeros(len(parent))
    native[0] = 1.0
    closure_coefficients, closure, residual = close_coefficients(
        parent,
        [centralizer_coefficients[:, i] for i in range(centralizer_coefficients.shape[1])] + [native],
    )
    return stationary, audit, parent, centralizer_coefficients, closure_coefficients, closure, residual


def analyze(carrier):
    stationary, audit, parent, centralizer_coefficients, closure_coefficients, closure, residual = construct(carrier)
    ideal_intersections = []
    for space in audit['_spaces']:
        ideal_intersections.append(intersection_dimension(closure_coefficients, space))
    labels = sorted(set(stationary['active']) | {
        item['label'] for item in stationary['classes'] if item['negative'] > 0 or item['zero'] > 0
    })
    casimirs = {
        str(label): spectrum_row(closure, a.orbit_basis(carrier, label))
        for label in labels
    }
    parent_gram = np.array([[np.vdot(x, y).real for y in parent] for x in parent])
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'active': stationary['active'],
        'pointwiseStabilizerDimension': centralizer_coefficients.shape[1],
        'adjoinedNativeGeneratorIndex': 0,
        'extendedClosureDimension': closure_coefficients.shape[1],
        'parentDimension': len(parent),
        'idealDimensions': [space.shape[1] for space in audit['_spaces']],
        'idealIntersectionDimensions': ideal_intersections,
        'maximumParentProjectionResidual': residual,
        'maximumParentGramDeviation': float(np.max(np.abs(parent_gram - np.eye(len(parent))))),
        'casimirs': casimirs,
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
    print(json.dumps({
        'protocol': 'spin23-exception-stabilizer-extension-closure/1',
        'rows': rows,
    }, indent=2, default=list))
