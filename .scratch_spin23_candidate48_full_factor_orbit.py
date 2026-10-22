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
t = load('.scratch_spin23_u14_factor_tangent_hessian.py', 't')
gs = load('.scratch_spin23_candidate48_gauge_split.py', 'gs')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')


def packed(matrix):
    return np.concatenate([matrix.real.ravel(), matrix.imag.ravel()])


if __name__ == '__main__':
    carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
    active = [(2, 9), (5, 10), (2, 6), (6, 7), (4, 8)]
    _, _, _, all_labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    graph_labels = sorted({tuple(edge['orbit']) for edge in carrier['graph']['edges']})
    amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
    builder = x.complex_field_builder(carrier)
    vacuum = sum(np.sqrt(amplitudes[label]) * builder(label, x.h.canonical(label).astype(complex)) for label in amplitudes)
    identity = np.eye(2)
    sigma_x = np.array([[0, 1], [1, 0]], dtype=complex)
    sigma_z = np.diag([1, -1])
    probes = {
        'bCentral': np.sqrt(0.125) * builder((4, 8), 1j * identity),
        'bSymmetricX': np.sqrt(0.125) * builder((4, 8), 1j * sigma_x),
        'bSymmetricZ': np.sqrt(0.125) * builder((4, 8), 1j * sigma_z),
        'mixedCircle': np.sqrt(0.5) * builder((2, 6), np.array([[0, -1j]])) + 0.5 * builder((2, 9), 1j * sigma_x),
    }
    full_generators, _ = t.factor_lie_generators(carrier)
    active_admissible_generators, _ = gs.admissible_factor_generators(carrier, active)
    full_field_admissible_generators, _ = gs.admissible_factor_generators(carrier, all_labels)
    graph_admissible_generators, _ = gs.admissible_factor_generators(carrier, graph_labels)

    def orbit_matrix(generators):
        return np.stack([packed(generator @ vacuum - vacuum @ generator) for generator in generators], axis=1)

    full_orbit = orbit_matrix(full_generators)
    active_admissible_orbit = orbit_matrix(active_admissible_generators)
    full_field_admissible_orbit = orbit_matrix(full_field_admissible_generators)
    graph_admissible_orbit = orbit_matrix(graph_admissible_generators)

    def audit(probe, orbit):
        target = packed(probe)
        coefficients, _, _, _ = np.linalg.lstsq(orbit, target, rcond=1e-10)
        residual = target - orbit @ coefficients
        return {
            'absoluteResidual': float(np.linalg.norm(residual)),
            'relativeResidual': float(np.linalg.norm(residual) / np.linalg.norm(target)),
            'coefficientNorm': float(np.linalg.norm(coefficients)),
        }

    result = {
        'fullFactorDimension': len(full_generators),
        'fullOrbitRank': int(np.linalg.matrix_rank(full_orbit, 1e-8)),
        'activeTruncationAdmissibleDimension': len(active_admissible_generators),
        'activeTruncationAdmissibleOrbitRank': int(np.linalg.matrix_rank(active_admissible_orbit, 1e-8)),
        'fullFieldAdmissibleDimension': len(full_field_admissible_generators),
        'fullFieldAdmissibleOrbitRank': int(np.linalg.matrix_rank(full_field_admissible_orbit, 1e-8)),
        'graphOrbitCount': len(graph_labels),
        'graphAdmissibleDimension': len(graph_admissible_generators),
        'graphAdmissibleOrbitRank': int(np.linalg.matrix_rank(graph_admissible_orbit, 1e-8)),
        'probes': {
            name: {
                'fullFactor': audit(probe, full_orbit),
                'activeTruncationAdmissible': audit(probe, active_admissible_orbit),
                'fullFieldAdmissible': audit(probe, full_field_admissible_orbit),
                'graphAdmissible': audit(probe, graph_admissible_orbit),
            }
            for name, probe in probes.items()
        },
    }
    mixed_target = packed(probes['mixedCircle'])
    mixed_coefficients, _, _, _ = np.linalg.lstsq(active_admissible_orbit, mixed_target, rcond=1e-10)
    mixed_generator = sum(coefficient * generator for coefficient, generator in zip(mixed_coefficients, active_admissible_generators))
    all_fields, all_metadata = gs.f.build_fields(carrier, all_labels)
    all_field_data = [gs.a.sparse_data(field) for field in all_fields]
    all_field_norms = np.array([np.vdot(field, field).real for field in all_fields])
    leakage_by_source = {}
    for field_data, label in zip(all_field_data, all_metadata):
        commutator = gs.a.commutator_with_sparse_field(mixed_generator, field_data)
        raw = float(np.vdot(commutator, commutator).real)
        overlaps = np.array([gs.a.sparse_inner(target_data, commutator) for target_data in all_field_data])
        captured = float(np.sum(overlaps ** 2 / all_field_norms))
        residual2 = max(0.0, raw - captured)
        key = str(tuple(label))
        row = leakage_by_source.setdefault(key, {'totalActionNormSquared': 0.0, 'totalLeakageNormSquared': 0.0, 'maximumRelativeLeakage': 0.0})
        row['totalActionNormSquared'] += raw
        row['totalLeakageNormSquared'] += residual2
        if raw > 1e-12:
            row['maximumRelativeLeakage'] = max(row['maximumRelativeLeakage'], float(np.sqrt(residual2 / raw)))
    result['activeTruncationMixedGeneratorLeakageBySourceOrbit'] = leakage_by_source
    graph_fields, graph_metadata = gs.f.build_fields(carrier, graph_labels)
    graph_field_data = [gs.a.sparse_data(field) for field in graph_fields]
    graph_field_norms = np.array([np.vdot(field, field).real for field in graph_fields])
    one_nine_candidates = []
    for field, field_data, label in zip(all_fields, all_field_data, all_metadata):
        if tuple(label) != (1, 9):
            continue
        commutator = gs.a.commutator_with_sparse_field(mixed_generator, field_data)
        overlaps = np.array([gs.a.sparse_inner(target_data, commutator) for target_data in graph_field_data])
        projected = sum((overlap / norm) * target for overlap, norm, target in zip(overlaps, graph_field_norms, graph_fields))
        residual = commutator - projected
        one_nine_candidates.append((float(np.vdot(residual, residual).real), residual))
    worst_norm2, worst_residual = max(one_nine_candidates, key=lambda item: item[0])
    block_dims = [c.DIMS[i] * c.DIMS[j] for i, j in carrier['op']]
    offsets = np.cumsum([0] + block_dims[:-1]).tolist()
    off_graph_blocks = []
    for p_vertex in range(20):
        p_slice = slice(offsets[p_vertex], offsets[p_vertex] + block_dims[p_vertex])
        for j_vertex in range(20):
            j_slice = slice(92 + offsets[j_vertex], 92 + offsets[j_vertex] + block_dims[j_vertex])
            norm2 = float(np.vdot(worst_residual[j_slice, p_slice], worst_residual[j_slice, p_slice]).real)
            if norm2 > 1e-10:
                off_graph_blocks.append({'pVertex': p_vertex, 'jVertex': j_vertex, 'normSquared': norm2})
    result['worstOneNineOffGraphLeakage'] = {
        'singleSourceResidualNormSquared': worst_norm2,
        'nonzeroJByPBlocks': sorted(off_graph_blocks, key=lambda row: -row['normSquared']),
    }
    print(json.dumps({'protocol': 'spin23-candidate48-full-factor-orbit/1', 'row': result}, indent=2))
