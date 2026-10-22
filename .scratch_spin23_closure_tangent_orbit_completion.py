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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
r = load('.scratch_spin23_exception_closure_radial_kkt.py', 'r')
q = load('.scratch_spin23_exception_factor_cone_kkt.py', 'q')
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')

WEIGHTS = np.array([806 / 707, 132 / 707, 3733 / 707])


def real_pack(matrix):
    return np.concatenate([matrix.real.ravel(), matrix.imag.ravel()])


def fields_for_labels(carrier, labels):
    field_matrix = x.complex_field_builder(carrier)
    fields = []
    field_labels = []
    field_types = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, column] = 1
            fields.append(field_matrix(label, seed))
            field_labels.append(label)
            field_types.append('real')
            fields.append(field_matrix(label, 1j * seed))
            field_labels.append(label)
            field_types.append('imaginary')
    return fields, field_labels, field_types


def edge_local_fields(carrier):
    op = carrier['op']
    block_dimensions = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + block_dimensions[:-1]).tolist()
    fields = []
    metadata = []
    for edge_index, edge in enumerate(carrier['graph']['edges']):
        label = tuple(edge['orbit'])
        u, v = edge['u'], edge['v']
        p, endpoint = op[u], op[v]
        horizontal = p[1] == endpoint[0] and p[0] != endpoint[1]
        vertical = p[0] == endpoint[1] and p[1] != endpoint[0]
        assert horizontal != vertical
        a, b = (p[0], endpoint[1]) if horizontal else (p[1], endpoint[0])
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            for coordinate_type, phase in [('real', 1), ('imaginary', 1j)]:
                seed = np.zeros((nr, nc), dtype=complex)
                seed[row, column] = phase
                field = seed if (a, b) == label else seed.T
                if horizontal:
                    direct = np.kron(field, np.eye(c.DIMS[p[1]]))
                    conjugate = np.kron(np.eye(c.DIMS[p[1]]), field)
                else:
                    direct = np.kron(np.eye(c.DIMS[p[0]]), field)
                    conjugate = np.kron(field, np.eye(c.DIMS[p[0]]))
                matrix = np.zeros((184, 184), dtype=complex)
                pu, jv, ju, pv = offsets[u], 92 + offsets[v], 92 + offsets[u], offsets[v]
                matrix[jv:jv + direct.shape[0], pu:pu + direct.shape[1]] += direct
                matrix[pu:pu + direct.shape[1], jv:jv + direct.shape[0]] += direct.conj().T
                matrix[pv:pv + conjugate.shape[0], ju:ju + conjugate.shape[1]] += conjugate
                matrix[ju:ju + conjugate.shape[1], pv:pv + conjugate.shape[0]] += conjugate.conj().T
                fields.append(matrix)
                metadata.append({'edgeIndex': edge_index, 'orbit': label, 'type': coordinate_type})
    return fields, metadata


def orthonormal_span(fields, tolerance=1e-10):
    packed = np.stack([real_pack(field) for field in fields], axis=1)
    gram = packed.T @ packed
    values, vectors = np.linalg.eigh(gram)
    keep = values > tolerance * max(1.0, float(values[-1]))
    basis = packed @ (vectors[:, keep] / np.sqrt(values[keep]))
    return basis, values, int(np.sum(keep))


def analyze(carrier):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    robust_labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators) for generators in factors]
    combined_casimir = sum(WEIGHTS[i] * casimirs[i] for i in range(len(factors)))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(robust_labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(
        2 * quartic[np.ix_(active, active)],
        linear[active] * (1 - combined_casimir[active]),
    )
    vacuum = sum(np.sqrt(amplitudes[local]) * canonical[index] for local, index in enumerate(active))

    all_labels = sorted({tuple(edge['orbit']) for edge in carrier['graph']['edges']})
    missing_labels = sorted(set(all_labels) - set(robust_labels))
    robust_fields, _, _ = fields_for_labels(carrier, robust_labels)
    all_fields, all_field_labels, _ = fields_for_labels(carrier, all_labels)
    robust_basis, robust_gram_values, robust_rank = orthonormal_span(robust_fields)
    all_basis, all_gram_values, all_rank = orthonormal_span(all_fields)

    raw_tangents = [generator @ vacuum - vacuum @ generator for generator in closure]
    tangent_packed = np.stack([real_pack(tangent) for tangent in raw_tangents], axis=1)
    phased_tangent_packed = np.stack([real_pack(1j * tangent) for tangent in raw_tangents], axis=1)
    tangent_values = np.linalg.svd(tangent_packed, compute_uv=False)
    tangent_rank = int(np.sum(tangent_values > 1e-10 * max(1.0, float(tangent_values[0]))))

    robust_residual = tangent_packed - robust_basis @ (robust_basis.T @ tangent_packed)
    all_residual = tangent_packed - all_basis @ (all_basis.T @ tangent_packed)
    phased_robust_residual = phased_tangent_packed - robust_basis @ (robust_basis.T @ phased_tangent_packed)
    phased_all_residual = phased_tangent_packed - all_basis @ (all_basis.T @ phased_tangent_packed)

    grading = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))
    even_generators = [(generator + grading @ generator @ grading) / 2 for generator in closure]
    odd_generators = [(generator - grading @ generator @ grading) / 2 for generator in closure]
    generator_packed = np.stack([real_pack(generator) for generator in closure], axis=1)
    generator_q, _ = np.linalg.qr(generator_packed)
    even_packed = np.stack([real_pack(generator) for generator in even_generators], axis=1)
    odd_packed = np.stack([real_pack(generator) for generator in odd_generators], axis=1)
    even_grade_defect = even_packed - generator_q @ (generator_q.T @ even_packed)
    odd_grade_defect = odd_packed - generator_q @ (generator_q.T @ odd_packed)
    even_tangent_packed = np.stack([real_pack(generator @ vacuum - vacuum @ generator) for generator in even_generators], axis=1)
    odd_tangent_packed = np.stack([real_pack(generator @ vacuum - vacuum @ generator) for generator in odd_generators], axis=1)
    even_all_residual = even_tangent_packed - all_basis @ (all_basis.T @ even_tangent_packed)
    odd_all_residual = odd_tangent_packed - all_basis @ (all_basis.T @ odd_tangent_packed)

    local_fields, local_metadata = edge_local_fields(carrier)
    local_norms = np.array([np.vdot(field, field).real for field in local_fields])
    local_raw_coordinates = np.stack([real_pack(field) @ tangent_packed for field in local_fields]) / local_norms[:, None]
    local_even_coordinates = np.stack([real_pack(field) @ even_tangent_packed for field in local_fields]) / local_norms[:, None]
    local_odd_coordinates = np.stack([real_pack(field) @ odd_tangent_packed for field in local_fields]) / local_norms[:, None]
    local_raw_residual_squared = np.maximum(0, np.sum(tangent_packed ** 2, axis=0) - np.sum(local_raw_coordinates ** 2 * local_norms[:, None], axis=0))
    local_even_residual_squared = np.maximum(0, np.sum(even_tangent_packed ** 2, axis=0) - np.sum(local_even_coordinates ** 2 * local_norms[:, None], axis=0))
    local_odd_residual_squared = np.maximum(0, np.sum(odd_tangent_packed ** 2, axis=0) - np.sum(local_odd_coordinates ** 2 * local_norms[:, None], axis=0))

    label_energies = {}
    label_residual_energies = {}
    for label in all_labels:
        indices = [i for i, item in enumerate(all_field_labels) if item == label]
        orbit_basis, _, orbit_rank = orthonormal_span([all_fields[i] for i in indices])
        projected = orbit_basis.T @ tangent_packed
        projected_residual = orbit_basis.T @ robust_residual
        label_energies[str(label)] = {
            'fieldRank': orbit_rank,
            'totalTangentSquaredNorm': float(np.sum(projected ** 2)),
            'maximumSingleTangentSquaredNorm': float(np.max(np.sum(projected ** 2, axis=0))),
        }
        label_residual_energies[str(label)] = float(np.sum(projected_residual ** 2))

    tangent_norms = np.linalg.norm(tangent_packed, axis=0)
    robust_residual_norms = np.linalg.norm(robust_residual, axis=0)
    all_residual_norms = np.linalg.norm(all_residual, axis=0)
    phased_robust_residual_norms = np.linalg.norm(phased_robust_residual, axis=0)
    phased_all_residual_norms = np.linalg.norm(phased_all_residual, axis=0)
    nonzero = tangent_norms > 1e-12

    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'closureDimension': len(closure),
        'closureVacuumTangentRankAmbient': tangent_rank,
        'robustLabels': robust_labels,
        'allGraphLabels': all_labels,
        'newLabels': missing_labels,
        'robustComplexCoordinateCount': len(robust_fields),
        'robustFieldSpanRank': robust_rank,
        'allGraphComplexCoordinateCount': len(all_fields),
        'allGraphFieldSpanRank': all_rank,
        'robustFieldGramMinimum': float(robust_gram_values[0]),
        'allGraphFieldGramMinimum': float(all_gram_values[0]),
        'tangentProjection': {
            'maximumAmbientNorm': float(np.max(tangent_norms)),
            'maximumRobustResidualNorm': float(np.max(robust_residual_norms)),
            'maximumAllGraphResidualNorm': float(np.max(all_residual_norms)),
            'maximumRobustRelativeResidual': float(np.max(robust_residual_norms[nonzero] / tangent_norms[nonzero])),
            'maximumAllGraphRelativeResidual': float(np.max(all_residual_norms[nonzero] / tangent_norms[nonzero])),
            'robustProjectionRank': int(np.linalg.matrix_rank(robust_basis.T @ tangent_packed, 1e-8)),
            'allGraphProjectionRank': int(np.linalg.matrix_rank(all_basis.T @ tangent_packed, 1e-8)),
        },
        'generatorConventionAudit': {
            'maximumHermitianResidual': float(max(np.linalg.norm(generator - generator.conj().T) for generator in closure)),
            'maximumAntiHermitianResidual': float(max(np.linalg.norm(generator + generator.conj().T) for generator in closure)),
            'maximumRawTangentHermitianResidual': float(max(np.linalg.norm(tangent - tangent.conj().T) for tangent in raw_tangents)),
            'maximumRawTangentAntiHermitianResidual': float(max(np.linalg.norm(tangent + tangent.conj().T) for tangent in raw_tangents)),
            'phasedTangentProjection': {
                'maximumRobustResidualNorm': float(np.max(phased_robust_residual_norms)),
                'maximumAllGraphResidualNorm': float(np.max(phased_all_residual_norms)),
                'maximumRobustRelativeResidual': float(np.max(phased_robust_residual_norms[nonzero] / tangent_norms[nonzero])),
                'maximumAllGraphRelativeResidual': float(np.max(phased_all_residual_norms[nonzero] / tangent_norms[nonzero])),
                'robustProjectionRank': int(np.linalg.matrix_rank(robust_basis.T @ phased_tangent_packed, 1e-8)),
                'allGraphProjectionRank': int(np.linalg.matrix_rank(all_basis.T @ phased_tangent_packed, 1e-8)),
            },
        },
        'z2GradingAudit': {
            'evenProjectionRank': int(np.linalg.matrix_rank(even_packed, 1e-8)),
            'oddProjectionRank': int(np.linalg.matrix_rank(odd_packed, 1e-8)),
            'maximumEvenProjectionClosureDefect': float(np.max(np.linalg.norm(even_grade_defect, axis=0))),
            'maximumOddProjectionClosureDefect': float(np.max(np.linalg.norm(odd_grade_defect, axis=0))),
            'evenTangentAmbientRank': int(np.linalg.matrix_rank(even_tangent_packed, 1e-8)),
            'oddTangentAmbientRank': int(np.linalg.matrix_rank(odd_tangent_packed, 1e-8)),
            'evenTangentAllGraphProjectionRank': int(np.linalg.matrix_rank(all_basis.T @ even_tangent_packed, 1e-8)),
            'oddTangentAllGraphProjectionRank': int(np.linalg.matrix_rank(all_basis.T @ odd_tangent_packed, 1e-8)),
            'maximumEvenTangentAllGraphResidualNorm': float(np.max(np.linalg.norm(even_all_residual, axis=0))),
            'maximumOddTangentAllGraphResidualNorm': float(np.max(np.linalg.norm(odd_all_residual, axis=0))),
        },
        'edgeLocalModuleAudit': {
            'coordinateCount': len(local_fields),
            'rawTangentProjectionRank': int(np.linalg.matrix_rank(local_raw_coordinates, 1e-8)),
            'evenTangentProjectionRank': int(np.linalg.matrix_rank(local_even_coordinates, 1e-8)),
            'oddTangentProjectionRank': int(np.linalg.matrix_rank(local_odd_coordinates, 1e-8)),
            'maximumRawTangentResidualNorm': float(np.sqrt(np.max(local_raw_residual_squared))),
            'maximumEvenTangentResidualNorm': float(np.sqrt(np.max(local_even_residual_squared))),
            'maximumOddTangentResidualNorm': float(np.sqrt(np.max(local_odd_residual_squared))),
        },
        'orbitTangentEnergy': label_energies,
        'orbitEnergyOfRobustResidual': label_residual_energies,
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-closure-tangent-orbit-completion/1', 'row': analyze(carrier)}, indent=2, default=list))
