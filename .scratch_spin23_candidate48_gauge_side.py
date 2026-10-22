"""Identify the left/right action of the gauge direction on the candidate-48 U(2) modulus."""

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
gs = load('.scratch_spin23_candidate48_gauge_split.py', 'gs')

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
_, _, _, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
generators, _ = gs.admissible_factor_generators(carrier, labels)
builder = x.complex_field_builder(carrier)
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
base_seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}


def vacuum(unitary):
    seeds = dict(base_seeds)
    seeds[(4, 8)] = unitary
    return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)


# Real coordinate bases for all active blocks and for B48 alone.
active_fields = []
active_meta = []
for label in amplitudes:
    nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
    for row in range(nr):
        for col in range(nc):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, col] = 1
            active_fields.extend([builder(label, seed), builder(label, 1j * seed)])
            active_meta.extend([(label, row, col, 're'), (label, row, col, 'im')])
norms = np.array([np.vdot(field, field).real for field in active_fields])
outside = [i for i, meta in enumerate(active_meta) if meta[0] != (4, 8)]
b48 = [i for i, meta in enumerate(active_meta) if meta[0] == (4, 8)]


def tangent_coordinates(unitary):
    d = vacuum(unitary)
    columns = []
    for generator in generators:
        tangent = generator @ d - d @ generator
        columns.append(np.array([np.vdot(field, tangent).real / norms[i] for i, field in enumerate(active_fields)]))
    return np.stack(columns, axis=1)


canonical = tangent_coordinates(np.eye(2))
_, singular, vh = np.linalg.svd(canonical[outside, :], full_matrices=True)
tolerance = 1e-9 * max(1.0, singular[0])
rank = int(np.sum(singular > tolerance))
kernel = vh[rank:, :].T
restricted = canonical[b48, :] @ kernel
u2, s2, vh2 = np.linalg.svd(restricted, full_matrices=False)
direction = kernel @ vh2[0, :]


def seed_from_coords(coords):
    answer = np.zeros((2, 2), dtype=complex)
    for index in b48:
        _, row, col, kind = active_meta[index]
        if kind == 're':
            answer[row, col] += coords[index]
        else:
            answer[row, col] += 1j * coords[index]
    return answer


def seed_from_direction(unitary):
    return seed_from_coords(tangent_coordinates(unitary) @ direction)


# Recover the exact complex-linear two-sided law T(B)=L B-B R from four matrix units.
matrix_units = []
images = []
kernel_operator_blocks = []
for row in range(2):
    for col in range(2):
        unit = np.zeros((2, 2), dtype=complex)
        unit[row, col] = 1
        matrix_units.append(unit)
        unit_coordinates = tangent_coordinates(unit)
        images.append(seed_from_coords(unit_coordinates @ direction))
        restricted_unit = unit_coordinates[b48, :] @ kernel
        complex_columns = np.zeros((4, kernel.shape[1]), dtype=complex)
        for local, index in enumerate(b48):
            _, out_row, out_col, kind = active_meta[index]
            flat_index = 2 * out_row + out_col
            complex_columns[flat_index, :] += restricted_unit[local, :] * (1 if kind == 're' else 1j)
        kernel_operator_blocks.append(complex_columns)
design_columns = []
for side in ('L', 'R'):
    for row in range(2):
        for col in range(2):
            basis = np.zeros((2, 2), dtype=complex)
            basis[row, col] = 1
            blocks = [(basis @ unit if side == 'L' else -unit @ basis).ravel() for unit in matrix_units]
            design_columns.append(np.concatenate(blocks))
design = np.stack(design_columns, axis=1)
target = np.concatenate([item.ravel() for item in images])
solution, _, _, _ = np.linalg.lstsq(design, target, rcond=None)
left_matrix = solution[:4].reshape(2, 2)
right_matrix = solution[4:].reshape(2, 2)
two_sided_residual = float(np.linalg.norm(design @ solution - target))
kernel_operator_complex = np.concatenate(kernel_operator_blocks, axis=0)
kernel_operator_real = np.concatenate([kernel_operator_complex.real, kernel_operator_complex.imag], axis=0)
operator_u, operator_singular, _ = np.linalg.svd(kernel_operator_real, full_matrices=False)
operator_rank = int(np.sum(operator_singular > 1e-9 * max(1.0, operator_singular[0])))
operator_basis = operator_u[:, :operator_rank]


def packed_operator(rule):
    values = np.concatenate([rule(unit).ravel() for unit in matrix_units])
    return np.concatenate([values.real, values.imag])


canonical_action_generator = seed_from_direction(np.eye(2))
canonical_action_generator /= np.linalg.norm(canonical_action_generator)
left_target = packed_operator(lambda value: canonical_action_generator @ value)
right_target = packed_operator(lambda value: value @ canonical_action_generator)
target_pair = np.stack([left_target / np.linalg.norm(left_target), right_target / np.linalg.norm(right_target)], axis=1)
target_q, _ = np.linalg.qr(target_pair)
principal_cosines = np.linalg.svd(operator_basis.T @ target_q, compute_uv=False)
left_right_projection_residual = float(np.linalg.norm(target_pair - operator_basis @ (operator_basis.T @ target_pair)))


a0 = seed_from_direction(np.eye(2))
a0 /= np.linalg.norm(a0)
rng = np.random.default_rng(230618)
rows = []
for _ in range(12):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    unitary, triangular = np.linalg.qr(raw)
    phase = np.diag(triangular)
    unitary = unitary @ np.diag(np.conj(phase) / np.abs(phase))
    moved_coordinates = tangent_coordinates(unitary)
    observed = seed_from_coords(moved_coordinates @ direction)
    observed /= np.linalg.norm(observed)
    # Sign is immaterial for the one-dimensional real gauge line.
    left = a0 @ unitary
    right = unitary @ a0
    left /= np.linalg.norm(left)
    right /= np.linalg.norm(right)
    def line_error(reference):
        sign = 1 if np.vdot(reference, observed).real >= 0 else -1
        return float(np.linalg.norm(observed - sign * reference))
    moved_restricted = moved_coordinates[b48, :] @ kernel
    moved_singular = np.linalg.svd(moved_restricted, compute_uv=False)
    moved_rank = int(np.sum(moved_singular > 1e-9 * max(1.0, moved_singular[0])))
    rows.append({'leftO2_action_AU': line_error(left), 'rightO2_action_UA': line_error(right), 'gaugeImageRank': moved_rank, 'gaugeImageSingularValues': moved_singular.tolist()})
    predicted = left_matrix @ unitary - unitary @ right_matrix
    predicted /= np.linalg.norm(predicted)
    rows[-1]['twoSidedAction'] = line_error(predicted)

print(json.dumps({
    'protocol': 'spin23-candidate48-gauge-side/1',
    'admissibleGeneratorCount': len(generators),
    'outsideB48ConstraintRank': rank,
    'outsideB48KernelDimension': int(kernel.shape[1]),
    'B48GaugeImageRank': int(np.sum(s2 > 1e-9 * max(1.0, s2[0]))),
    'canonicalGaugeSeed': [[float(z.real), float(z.imag)] for z in a0.ravel()],
    'randomPoints': len(rows),
    'maximumLeftActionLineError': max(row['leftO2_action_AU'] for row in rows),
    'maximumRightActionLineError': max(row['rightO2_action_UA'] for row in rows),
    'twoSidedFitResidualOnMatrixUnits': two_sided_residual,
    'leftGenerator': [[[float(z.real), float(z.imag)] for z in row] for row in left_matrix],
    'rightGenerator': [[[float(z.real), float(z.imag)] for z in row] for row in right_matrix],
    'maximumTwoSidedActionLineError': max(row['twoSidedAction'] for row in rows),
    'randomGaugeImageRanks': sorted(set(row['gaugeImageRank'] for row in rows)),
    'minimumNonzeroGenericGaugeSingularValue': min(row['gaugeImageSingularValues'][row['gaugeImageRank']-1] for row in rows),
    'gaugeOperatorSpaceRank': operator_rank,
    'gaugeOperatorSingularValues': operator_singular[:4].tolist(),
    'leftRightOperatorPrincipalCosines': principal_cosines.tolist(),
    'leftRightOperatorProjectionResidual': left_right_projection_residual,
}, indent=2))
