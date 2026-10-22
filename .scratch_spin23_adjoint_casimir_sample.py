from itertools import product
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
IDEALS = ('SO8', 'SO10', 'SO4')


def select(carriers, lpair, rpair):
    return next(x for x in carriers if x['lpair'] == lpair and x['rpair'] == rpair)


def full_matrix(blocks, components):
    out = np.zeros((184, 184), dtype=complex)
    for block, indices in zip(blocks, components):
        out[np.ix_(indices, indices)] = block
    return out


def ideal_generators(audit):
    basis = audit['_basis']
    components = audit['_components']
    output = []
    for space in audit['_spaces']:
        generators = []
        for alpha in range(space.shape[1]):
            blocks = [sum(space[i, alpha] * basis[i][j] for i in range(len(basis))) for j in range(len(components))]
            generators.append(full_matrix(blocks, components))
        output.append(generators)
    return output


def orbit_basis(carrier, label):
    fm = h.field_builder(carrier)
    nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
    output = []
    for i, j in product(range(nr), range(nc)):
        field = np.zeros((nr, nc))
        field[i, j] = 1
        matrix = fm(label, field).astype(complex)
        output.append(matrix / np.linalg.norm(matrix))
    return output


def casimir_spectrum(generators, fields):
    form = np.zeros((len(fields), len(fields)))
    for generator in generators:
        comms = [generator @ field - field @ generator for field in fields]
        for i, left in enumerate(comms):
            for j in range(i + 1):
                value = np.vdot(left, comms[j]).real
                form[i, j] += value
                if i != j:
                    form[j, i] += value
    return np.linalg.eigvalsh(form)


def analyze(carrier, labels):
    audit = f.audit(carrier, details=True)
    generators = ideal_generators(audit)
    rows = {}
    for label in labels:
        fields = orbit_basis(carrier, label)
        rows[str(label)] = {
            IDEALS[i]: {
                'min': round(float((eigs := casimir_spectrum(generators[i], fields))[0]), 10),
                'max': round(float(eigs[-1]), 10),
                'rank': int(np.sum(eigs > 1e-8)),
                'dimension': len(eigs),
            }
            for i in range(3)
        }
    return rows


if __name__ == '__main__':
    carriers = [x for x in c.strong_carriers() if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)]
    preferred = select(carriers, ((1, 5), (10, 1)), ((10, 2), (4, 10)))
    uncovered = select(carriers, ((8, 10), (10, 1)), ((10, 4), (7, 5)))
    print(json.dumps({
        'protocol': 'spin23-adjoint-casimir-sample/1',
        'preferred': analyze(preferred, [(1, 7), (4, 8), (2, 6), (2, 9), (5, 10), (6, 7)]),
        'uncoveredRepresentative': analyze(uncovered, [(1, 8), (2, 5), (1, 2), (1, 3), (1, 4), (1, 7), (4, 8)]),
    }, indent=2))
