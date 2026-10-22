from concurrent.futures import ProcessPoolExecutor
from itertools import combinations_with_replacement, permutations, product
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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
r = load('.scratch_spin23_exception_closure_radial_kkt.py', 'r')
q = load('.scratch_spin23_exception_factor_cone_kkt.py', 'q')


CERTIFICATES = {
    2: np.array([806/707, 132/707, 3733/707]),
    7: np.array([0, 3/2, 97/16]),
}


def analyze(carrier):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    labels, canonical, linear, quartic, total_casimir = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators) for generators in factors]
    weights = CERTIFICATES[carrier['rpair'][0][1]]
    combined_casimir = sum(weights[i] * casimirs[i] for i in range(len(factors)))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    active_block = quartic[np.ix_(active, active)]
    amplitudes = np.linalg.solve(2 * active_block, linear[active] * (1 - combined_casimir[active]))
    vacuum = sum(np.sqrt(amplitudes[local]) * canonical[index] for local, index in enumerate(active))
    fm = h.field_builder(carrier)
    coordinate_labels = []
    fields = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc)); seed[row, column] = 1
            fields.append(fm(label, seed).astype(complex))
            coordinate_labels.append(label)
    count = len(fields)
    vacuum2 = vacuum @ vacuum
    vacuum3 = vacuum2 @ vacuum
    gradients = np.array([-2 * np.vdot(field, vacuum).real + 4 * np.vdot(field, vacuum3).real for field in fields])
    gauge_grams = []
    for k, generators in enumerate(factors):
        gram = np.zeros((count, count))
        factor_gradient = np.zeros(count)
        for generator in generators:
            vacuum_commutator = generator @ vacuum - vacuum @ generator
            commutators = [generator @ field - field @ generator for field in fields]
            packed = np.stack([np.concatenate([item.real.ravel(), item.imag.ravel()]) for item in commutators])
            gram += packed @ packed.T
            vacuum_packed = np.concatenate([vacuum_commutator.real.ravel(), vacuum_commutator.imag.ravel()])
            factor_gradient += packed @ vacuum_packed
        gauge_grams.append(gram)
        gradients += 2 * weights[k] * factor_gradient
    hessian = np.zeros((count, count))
    for j, right in enumerate(fields):
        base_image = -2 * right + 4 * (vacuum2 @ right + vacuum @ right @ vacuum + right @ vacuum2)
        for i in range(j + 1):
            left = fields[i]
            value = np.vdot(left, base_image).real
            for k in range(len(factors)):
                value += 2 * weights[k] * gauge_grams[k][i, j]
            hessian[i, j] = hessian[j, i] = value
    values, vectors = np.linalg.eigh(hessian)
    scale = max(1.0, float(np.max(np.abs(values))))
    tolerance = 1e-8 * scale
    orbit_blocks = {}
    start = 0
    for label in labels:
        size = c.DIMS[label[0]] * c.DIMS[label[1]]
        block_values = np.linalg.eigvalsh(hessian[start:start+size, start:start+size])
        orbit_blocks[str(label)] = {
            'min': float(block_values[0]),
            'max': float(block_values[-1]),
            'negative': int(np.sum(block_values < -tolerance)),
            'zero': int(np.sum(np.abs(block_values) <= tolerance)),
            'dimension': size,
        }
        start += size
    negative_modes = []
    for mode in np.where(values < -tolerance)[0]:
        vector = vectors[:, mode]
        weights_by_orbit = {}
        start = 0
        for label in labels:
            size = c.DIMS[label[0]] * c.DIMS[label[1]]
            weight = float(np.sum(vector[start:start+size] ** 2))
            if weight > 1e-10:
                weights_by_orbit[str(label)] = weight
            start += size
        negative_modes.append({'eigenvalue': float(values[mode]), 'orbitNormWeights': weights_by_orbit})
    field_norms = np.array([np.vdot(field, field).real for field in fields])
    tangent_columns = []
    maximum_tangent_projection_residual = 0.0
    for generator in closure:
        tangent = generator @ vacuum - vacuum @ generator
        coefficients = np.array([np.vdot(field, tangent).real / field_norms[i] for i, field in enumerate(fields)])
        projected = sum(coefficients[i] * fields[i] for i in range(count))
        maximum_tangent_projection_residual = max(maximum_tangent_projection_residual, float(np.linalg.norm(tangent - projected)))
        tangent_columns.append(coefficients)
    tangent_matrix = np.stack(tangent_columns, axis=1)
    tangent_rank = int(np.linalg.matrix_rank(tangent_matrix, 1e-8))
    tangent_hessian_residual = float(np.linalg.norm(hessian @ tangent_matrix))
    zero_indices = np.where(np.abs(values) <= tolerance)[0]
    zero_basis = vectors[:, zero_indices]
    zero_directions = [sum(zero_basis[i, j] * fields[i] for i in range(count)) for j in range(len(zero_indices))]
    maximum_cubic_tensor_component = 0.0
    for ia, ib, ic in combinations_with_replacement(range(len(zero_directions)), 3):
        indices = (ia, ib, ic)
        terms = []
        for order in set(permutations(indices)):
            terms.append(np.trace(vacuum @ zero_directions[order[0]] @ zero_directions[order[1]] @ zero_directions[order[2]]).real)
        symmetrized = 4 * sum(terms) / len(terms)
        maximum_cubic_tensor_component = max(maximum_cubic_tensor_component, abs(float(symmetrized)))
    rng = np.random.default_rng(230563)
    flat_samples = []
    reduced_quartic_samples = []
    positive_indices = np.where(values > tolerance)[0]
    positive_vectors = vectors[:, positive_indices]
    positive_values = values[positive_indices]
    sample_coefficients = [np.eye(len(zero_indices))[i] for i in range(len(zero_indices))]
    sample_coefficients += [rng.normal(size=len(zero_indices)) for _ in range(256)]
    for coefficients in sample_coefficients:
        coefficients = coefficients / np.linalg.norm(coefficients)
        coordinate_vector = zero_basis @ coefficients
        direction = sum(coordinate_vector[i] * fields[i] for i in range(count))
        norm = np.sqrt(np.vdot(direction, direction).real)
        direction /= norm
        direction2 = direction @ direction
        cubic = 4 * np.trace(vacuum @ direction2 @ direction).real
        quartic = np.trace(direction2 @ direction2).real
        flat_samples.append((float(cubic), float(quartic)))
        cubic_gradient_matrix = 4 * (direction2 @ vacuum + direction @ vacuum @ direction + vacuum @ direction2)
        cubic_gradient_coordinates = np.array([np.vdot(field, cubic_gradient_matrix).real for field in fields])
        massive_gradient = positive_vectors.T @ cubic_gradient_coordinates
        relaxed_quartic = quartic - 0.5 * float(np.sum(massive_gradient ** 2 / positive_values))
        reduced_quartic_samples.append(relaxed_quartic)
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'closureDimension': len(closure),
        'factorDimensions': [len(generators) for generators in factors],
        'weights': weights.tolist(),
        'activeAmplitudesSquared': {str(labels[index]): float(amplitudes[local]) for local, index in enumerate(active)},
        'coordinateDimension': count,
        'maximumAbsoluteGradientComponent': float(np.max(np.abs(gradients))),
        'hessianMinimum': float(values[0]),
        'hessianMaximum': float(values[-1]),
        'negativeEigenvalues': int(np.sum(values < -tolerance)),
        'zeroEigenvalues': int(np.sum(np.abs(values) <= tolerance)),
        'smallestEigenvalues': values[:20].tolist(),
        'negativeModes': negative_modes,
        'gaugeOrbitTangentRank': tangent_rank,
        'vacuumStabilizerDimensionInsideClosure': len(closure) - tangent_rank,
        'maximumGaugeTangentProjectionResidual': maximum_tangent_projection_residual,
        'hessianTimesGaugeTangentFrobeniusNorm': tangent_hessian_residual,
        'flatPolynomialSample': {
            'zeroSubspaceDimension': len(zero_indices),
            'directionsTested': len(flat_samples),
            'symmetricCubicTensorComponentsTested': 165,
            'maximumAbsoluteSymmetricCubicTensorComponent': maximum_cubic_tensor_component,
            'maximumAbsoluteCubicCoefficient': max(abs(row[0]) for row in flat_samples),
            'minimumQuarticCoefficient': min(row[1] for row in flat_samples),
            'maximumQuarticCoefficient': max(row[1] for row in flat_samples),
            'minimumMassiveRelaxedQuarticCoefficient': min(reduced_quartic_samples),
            'maximumMassiveRelaxedQuarticCoefficient': max(reduced_quartic_samples),
        },
        'orbitDiagonalBlocks': orbit_blocks,
    }


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
        and x['lpair'] == ((8, 10), (10, 1))
        and x['rpair'][1] == (7, 5)
        and x['rpair'][0][1] in (2,)
    ]
    with ProcessPoolExecutor(max_workers=2) as pool:
        rows = list(pool.map(analyze, carriers))
    print(json.dumps({'protocol': 'spin23-exception-factor-full-hessian/1', 'rows': rows}, indent=2, default=list))
