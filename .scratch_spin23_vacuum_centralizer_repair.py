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


def constraint_gram(generators, fields):
    gram = np.zeros((len(generators), len(generators)))
    for field in fields:
        columns = []
        for generator in generators:
            comm = generator @ field - field @ generator
            columns.append(np.concatenate([comm.real.ravel(), comm.imag.ravel()]))
        matrix = np.stack(columns, axis=1)
        gram += matrix.T @ matrix
    return gram


def kernel_basis(gram, tolerance=1e-9):
    values, vectors = np.linalg.eigh(gram)
    scale = max(1.0, float(values[-1]))
    keep = values <= tolerance * scale
    return values, vectors[:, keep]


def combine(generators, coefficients):
    return [sum(coefficients[i, j] * generators[i] for i in range(len(generators))) for j in range(coefficients.shape[1])]


def algebra_invariants(generators):
    d = len(generators)
    norms = np.array([np.vdot(x, x).real for x in generators])
    ads = [np.zeros((d, d)) for _ in range(d)]
    residual = 0.0
    derived = []
    for i in range(d):
        for j in range(i):
            comm = generators[i] @ generators[j] - generators[j] @ generators[i]
            coefficients = np.array([np.vdot(x, comm).real / norms[k] for k, x in enumerate(generators)])
            projected = sum(coefficients[k] * generators[k] for k in range(d))
            residual = max(residual, float(np.linalg.norm(comm - projected)))
            ads[i][:, j] = coefficients
            ads[j][:, i] = -coefficients
            derived.append(coefficients)
    derived_dimension = int(np.linalg.matrix_rank(np.stack(derived), tolerance := 1e-8))
    center_map = np.stack([x.ravel() for x in ads], axis=1)
    center_dimension = d - int(np.linalg.matrix_rank(center_map, tolerance))
    killing = np.array([[np.trace(ads[i] @ ads[j]) for j in range(d)] for i in range(d)])
    values = np.linalg.eigvalsh(killing)
    clusters = []
    start = 0
    while start < d:
        end = start + 1
        while end < d and abs(values[end] - values[start]) < 1e-7:
            end += 1
        clusters.append({'eigenvalue': round(float(values[start]), 10), 'multiplicity': end - start})
        start = end
    return {
        'derivedDimension': derived_dimension,
        'centerDimension': center_dimension,
        'maximumBracketClosureResidual': residual,
        'killingClusters': clusters,
    }


if __name__ == '__main__':
    carriers = [x for x in c.strong_carriers() if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)]
    carrier = next(x for x in carriers if x['lpair'] == ((1, 5), (10, 1)) and x['rpair'] == ((10, 2), (4, 10)))
    audit = f.audit(carrier, details=True)
    generators = [a.full_matrix(blocks, audit['_components']) for blocks in audit['_basis']]
    stationary = h.analyze(carrier)
    fm = h.field_builder(carrier)
    desired = list(stationary['active'])
    vacuum = sum(np.sqrt(x) * fm(label, h.canonical(label)) for label, x in zip(desired, stationary['x'])).astype(complex)
    values, coefficients = kernel_basis(constraint_gram(generators, [vacuum]))
    centralizer = combine(generators, coefficients)
    pointwise_fields = [field for label in desired for field in a.orbit_basis(carrier, label)]
    point_values, point_coefficients = kernel_basis(constraint_gram(generators, pointwise_fields))
    pointwise = combine(generators, point_coefficients)
    defects = {}
    for label in ((1, 7), (4, 8)):
        fields = a.orbit_basis(carrier, label)
        for name, algebra in (('vacuumCentralizer', centralizer), ('pointwiseDesiredCentralizer', pointwise)):
            eigs = a.casimir_spectrum(algebra, fields)
            defects.setdefault(str(label), {})[name] = {
                'min': round(float(eigs[0]), 10),
                'max': round(float(eigs[-1]), 10),
                'rank': int(np.sum(eigs > 1e-8)),
                'dimension': len(eigs),
            }
    print(json.dumps({
        'protocol': 'spin23-vacuum-centralizer-repair/1',
        'parentDimension': len(generators),
        'vacuumCentralizerDimension': len(centralizer),
        'pointwiseDesiredCentralizerDimension': len(pointwise),
        'pointwiseDesiredCentralizerInvariants': algebra_invariants(pointwise),
        'vacuumConstraintSmallestEigenvalues': [round(float(x), 12) for x in values[:12]],
        'pointwiseConstraintSmallestEigenvalues': [round(float(x), 12) for x in point_values[:12]],
        'defects': defects,
    }, indent=2))
