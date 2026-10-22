from itertools import product
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
a = load('.scratch_spin23_active23_scalar_module_audit.py', 'a')


def analyze(carrier):
    _, _, preserving, labels, _, _, _, _ = u.preserving_basis(carrier)
    field_matrix = x.complex_field_builder(carrier)
    fields = []
    metadata = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, column] = 1
            fields.append(field_matrix(label, seed)); metadata.append(tuple(label))
            fields.append(field_matrix(label, 1j * seed)); metadata.append(tuple(label))
    data = [a.sparse_data(field) for field in fields]
    norms = np.array([np.vdot(field, field).real for field in fields])
    indices_by_label = {tuple(label): [i for i, item in enumerate(metadata) if item == tuple(label)] for label in labels}
    rows = {}
    for source_label in labels:
        source_label = tuple(source_label)
        total_energy = 0.0
        target_energy = {tuple(label): 0.0 for label in labels}
        max_relative_off_source = 0.0
        nonzero_actions = 0
        for generator in preserving:
            for source_index in indices_by_label[source_label]:
                commutator = a.commutator_with_sparse_field(generator, data[source_index])
                energy = float(np.vdot(commutator, commutator).real)
                if energy <= 1e-24:
                    continue
                nonzero_actions += 1
                total_energy += energy
                overlaps = np.array([a.sparse_inner(target, commutator) for target in data])
                for target_label, indices in indices_by_label.items():
                    target_energy[target_label] += float(np.sum(overlaps[indices] ** 2 / norms[indices]))
                source_projection = float(np.sum(overlaps[indices_by_label[source_label]] ** 2 / norms[indices_by_label[source_label]]))
                max_relative_off_source = max(max_relative_off_source, np.sqrt(max(0.0, energy-source_projection)/energy))
        rows[str(source_label)] = {
            'nonzeroActions':nonzero_actions,
            'totalActionEnergy':total_energy,
            'maximumRelativeOffSourceOrbit':max_relative_off_source,
            'targetOrbitEnergy':{str(label):value for label,value in target_energy.items() if value > 1e-20},
        }
    return {
        'preservingDimension':len(preserving),
        'robustCoordinateDimension':len(fields),
        'orbitActions':rows,
        'crossInvariantEligible':{
            '(1, 8)':rows[str((1,8))]['maximumRelativeOffSourceOrbit'] <= 1e-8,
            '(2, 5)':rows[str((2,5))]['maximumRelativeOffSourceOrbit'] <= 1e-8,
        },
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'],5),s.tw(item['op'],10))==(8,4)
        and item['lpair']==((8,10),(10,1))
        and item['rpair']==((10,2),(7,5))
    )
    print(json.dumps({'protocol':'spin23-u14-orbit-block-invariance/1','row':analyze(carrier)},indent=2,default=list))
