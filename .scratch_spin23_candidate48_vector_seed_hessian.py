"""Test whether candidate 48's quadratic form extends from seeded SO(4) vectors to SO(5) irreps."""

import contextlib
import importlib.util
import io
import json
import sys

import numpy as np


def load_quiet(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    with contextlib.redirect_stdout(io.StringIO()):
        spec.loader.exec_module(module)
    return module


s = load_quiet('.scratch_spin23_so23_real_form.py', 'spin23_so23')

weights = np.array([0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003])
factors = [[generator] for generator in s.candidate_preserving]
vacuum = s.candidate_vacuum(np.eye(2), 0.0)
fields = s.scalar_fields
count = len(fields)
vacuum2 = vacuum @ vacuum

# Coordinate Gram and the exact quadratic Hessian used in candidate-48 stability tests.
gram = np.array([[np.vdot(left, right).real for right in fields] for left in fields])
hessian = np.zeros((count, count))
gauge_grams = []
for factor in factors:
    response = np.zeros((count, count))
    for generator in factor:
        commutators = [generator @ field - field @ generator for field in fields]
        packed = np.stack([s.packed(item) for item in commutators])
        response += packed @ packed.T
    gauge_grams.append(response)
for j, right in enumerate(fields):
    image = -2 * right + 4 * (vacuum2 @ right + vacuum @ right @ vacuum + right @ vacuum2)
    for i in range(j + 1):
        value = np.vdot(fields[i], image).real
        value += sum(2 * weights[k] * gauge_grams[k][i, j] for k in range(len(factors)))
        hessian[i, j] = hessian[j, i] = value


def orthonormal_coordinate_image(mapping, tolerance=1e-9):
    """Metric adjoint image of a module projection, orthonormal in the field Gram."""
    raw = np.linalg.solve(gram, mapping.T)
    overlap = raw.T @ gram @ raw
    values, vectors = np.linalg.eigh((overlap + overlap.T) / 2)
    mask = values > tolerance * max(1.0, float(values[-1]))
    return raw @ vectors[:, mask] @ np.diag(1 / np.sqrt(values[mask]))


so5_values, so5_vectors = np.linalg.eigh(s.adjoint_so5_casimir)
seed_coordinates = s.adjoint_basis.T @ np.stack([s.real_pack(item) for item in s.scalar_adjoint], axis=1)
sector_rows = []
coordinate_bases = {}
for name, target in [('adjoint10', 1.5), ('symmetricTraceless14', 2.5)]:
    irrep = so5_vectors[:, np.abs(so5_values - target) < 1e-7]
    restricted_so4 = irrep.T @ s.adjoint_so4_casimir @ irrep
    values4, vectors4 = np.linalg.eigh((restricted_so4 + restricted_so4.T) / 2)
    vector4 = irrep @ vectors4[:, np.abs(values4 - 0.75) < 1e-7]
    mapping = vector4.T @ seed_coordinates
    basis = orthonormal_coordinate_image(mapping)
    coordinate_bases[name] = basis
    restricted = basis.T @ hessian @ basis
    eigenvalues = np.linalg.eigvalsh((restricted + restricted.T) / 2)
    scalar = np.trace(restricted) / len(eigenvalues)
    sector_rows.append({
        'sector': name,
        'so5Casimir': target,
        'seedRank': int(basis.shape[1]),
        'hessianEigenvalues': eigenvalues.tolist(),
        'meanCoefficient': float(scalar),
        'isotropyResidual': float(np.linalg.norm(restricted - scalar * np.eye(len(eigenvalues)))),
        'relativeIsotropyResidual': float(np.linalg.norm(restricted - scalar * np.eye(len(eigenvalues))) / max(1.0, np.linalg.norm(restricted))),
    })

# Resolve the split under the unique compact generator that both stabilizes the
# canonical vacuum and preserves the original 102-coordinate scalar ansatz.
stabilizer = s.canonical_stabilizer
field_norms = np.diag(gram)
stabilizer_action = np.zeros((count, count))
stabilizer_closure_residual = 0.0
for j, field in enumerate(fields):
    image = stabilizer @ field - field @ stabilizer
    overlaps = np.array([np.vdot(target, image).real for target in fields])
    coefficients = overlaps / field_norms
    projected = sum(coefficients[i] * fields[i] for i in range(count))
    stabilizer_action[:, j] = coefficients
    stabilizer_closure_residual = max(stabilizer_closure_residual, float(np.linalg.norm(image - projected)))

u1_rows = []
u1_plane_bases = {}
for name in ['adjoint10', 'symmetricTraceless14']:
    basis = coordinate_bases[name]
    action = basis.T @ gram @ stabilizer_action @ basis
    action_residual = stabilizer_action @ basis - basis @ action
    hblock = basis.T @ hessian @ basis
    _, singular, vh = np.linalg.svd(action)
    rank = int(np.sum(singular > 1e-9 * max(1.0, float(singular[0]))))
    fixed = vh[rank:, :].T
    rotating = vh[:rank, :].T
    u1_plane_bases[name] = (fixed, rotating)
    fixed_hessian = fixed.T @ hblock @ fixed
    rotating_hessian = rotating.T @ hblock @ rotating
    u1_rows.append({
        'sector': name,
        'actionSingularValues': singular.tolist(),
        'actionRank': rank,
        'fixedPlaneDimension': int(fixed.shape[1]),
        'rotatingPlaneDimension': int(rotating.shape[1]),
        'actionClosureResidual': float(np.sqrt(np.trace(action_residual.T @ gram @ action_residual))),
        'actionSkewResidual': float(np.linalg.norm(action + action.T)),
        'hessianInvarianceResidual': float(np.linalg.norm(action.T @ hblock + hblock @ action)),
        'fixedPlaneHessianEigenvalues': np.linalg.eigvalsh((fixed_hessian + fixed_hessian.T) / 2).tolist(),
        'rotatingPlaneHessianEigenvalues': np.linalg.eigvalsh((rotating_hessian + rotating_hessian.T) / 2).tolist(),
    })

# Minimal symmetry-restoring candidate: the equal-weight sum over the nine
# compact SO(5) generators orthogonal to the residual stabilizer.
stabilizer_coefficients = np.array([np.vdot(generator, stabilizer).real for generator in s.so5_orth])
_, _, stabilizer_vh = np.linalg.svd(stabilizer_coefficients[None, :], full_matrices=True)
omitted_so5 = [
    sum(coefficients[i] * s.so5_orth[i] for i in range(10))
    for coefficients in stabilizer_vh[1:, :]
]
omitted_gradient = np.zeros(count)
for generator in omitted_so5:
    vacuum_commutator = generator @ vacuum - vacuum @ generator
    for i, field in enumerate(fields):
        field_commutator = generator @ field - field @ generator
        omitted_gradient[i] += 2 * np.vdot(field_commutator, vacuum_commutator).real

repair_rows = []
repair_lambdas = []
for name in ['adjoint10', 'symmetricTraceless14']:
    basis = coordinate_bases[name]
    directions = [sum(basis[i, j] * fields[i] for i in range(count)) for j in range(4)]
    delta = np.zeros((4, 4))
    for generator in omitted_so5:
        commutators = [generator @ direction - direction @ generator for direction in directions]
        delta += 2 * np.array([[np.vdot(left, right).real for right in commutators] for left in commutators])
    fixed, rotating = u1_plane_bases[name]
    fixed_delta = fixed.T @ delta @ fixed
    rotating_delta = rotating.T @ delta @ rotating
    fixed_shift = float(np.trace(fixed_delta) / 2)
    rotating_shift = float(np.trace(rotating_delta) / 2)
    fixed_mass = next(row for row in u1_rows if row['sector'] == name)['fixedPlaneHessianEigenvalues'][0]
    rotating_mass = next(row for row in u1_rows if row['sector'] == name)['rotatingPlaneHessianEigenvalues'][0]
    repair_lambda = (fixed_mass - rotating_mass) / (rotating_shift - fixed_shift)
    repair_lambdas.append(repair_lambda)
    corrected = basis.T @ hessian @ basis + repair_lambda * delta
    corrected_scalar = np.trace(corrected) / 4
    repair_rows.append({
        'sector': name,
        'fixedPlaneShiftPerUnitWeight': fixed_shift,
        'rotatingPlaneShiftPerUnitWeight': rotating_shift,
        'repairWeight': float(repair_lambda),
        'repairWeightNonnegative': bool(repair_lambda >= 0),
        'correctedEigenvalues': np.linalg.eigvalsh((corrected + corrected.T) / 2).tolist(),
        'correctedIsotropyResidual': float(np.linalg.norm(corrected - corrected_scalar * np.eye(4))),
    })

left = coordinate_bases['adjoint10']
right = coordinate_bases['symmetricTraceless14']
overlap = left.T @ gram @ right
mixing = left.T @ hessian @ right
combined = np.concatenate([left, right], axis=1)
combined_hessian = combined.T @ hessian @ combined

print(json.dumps({
    'protocol': 'spin23-candidate48-vector-seed-hessian/1',
    'coordinateDimension': count,
    'coordinateGramOffDiagonalMaximum': float(np.max(np.abs(gram - np.diag(np.diag(gram))))),
    'seedSectors': sector_rows,
    'crossSectorGramFrobeniusNorm': float(np.linalg.norm(overlap)),
    'crossSectorHessianFrobeniusNorm': float(np.linalg.norm(mixing)),
    'crossSectorHessianMaximumAbsolute': float(np.max(np.abs(mixing))),
    'combinedEightEigenvalues': np.linalg.eigvalsh((combined_hessian + combined_hessian.T) / 2).tolist(),
    'residualU1Resolution': {
        'fullScalarSpanClosureResidual': stabilizer_closure_residual,
        'sectors': u1_rows,
    },
    'omittedSo5ResponseRepair': {
        'generatorDimension': len(omitted_so5),
        'stabilizerCoefficientNorm': float(np.linalg.norm(stabilizer_coefficients)),
        'vacuumGradientEuclideanNormPerUnitWeight': float(np.linalg.norm(omitted_gradient)),
        'vacuumGradientMaximumAbsoluteComponentPerUnitWeight': float(np.max(np.abs(omitted_gradient))),
        'sectors': repair_rows,
        'commonRepairWeightDeviation': float(abs(repair_lambdas[0] - repair_lambdas[1])),
    },
    'extensionCriterion': {
        'necessaryConditions': [
            'each four-vector seed block is scalar',
            'the inequivalent 10 and 14 seed blocks do not mix',
            'the same scalar must be assigned to every SO(4) descendant inside its SO(5) irrep',
        ],
        'seedLevelPass': bool(
            all(row['relativeIsotropyResidual'] < 1e-8 for row in sector_rows)
            and np.linalg.norm(mixing) < 1e-8
        ),
    },
}, indent=2))
