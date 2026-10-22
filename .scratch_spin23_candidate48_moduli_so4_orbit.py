"""Compare candidate-48's five exact moduli tangents with its compact SO(4) orbit."""

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


s = load_quiet('.scratch_spin23_so23_real_form.py', 'spin23_so23_orbit')
vacuum = s.candidate_vacuum(np.eye(2), 0.0)


def orthonormal_span(matrices, tolerance=1e-9):
    columns = np.stack([s.packed(item) for item in matrices], axis=1)
    u, singular, _ = np.linalg.svd(columns, full_matrices=False)
    rank = int(np.sum(singular > tolerance * max(1.0, float(singular[0]))))
    return u[:, :rank], singular, rank


# Tangents of U(2) at the identity seed in orbit (4,8), plus the independent eta circle.
u2 = [
    1j * np.eye(2),
    np.array([[0, 1], [-1, 0]], dtype=complex),
    np.array([[0, 1j], [1j, 0]], dtype=complex),
    np.array([[1j, 0], [0, -1j]], dtype=complex),
]
moduli_tangents = [np.sqrt(0.125) * s.builder((4, 8), generator) for generator in u2]
epsilon = 1e-6
moduli_tangents.append(
    (s.candidate_vacuum(np.eye(2), epsilon) - s.candidate_vacuum(np.eye(2), -epsilon)) / (2 * epsilon)
)

# SO(4) is the even compact subalgebra selected before continuation to Spin(2,3).
so4_tangents = [generator @ vacuum - vacuum @ generator for generator in s.even]
moduli_basis, moduli_singular, moduli_rank = orthonormal_span(moduli_tangents)
so4_basis, so4_singular, so4_rank = orthonormal_span(so4_tangents)
principal = np.linalg.svd(moduli_basis.T @ so4_basis, compute_uv=False)

# The exact Reynolds projection of the v646 seed Hessian follows from Schur's lemma:
# each real SO(4) vector block averages to trace(H)/4, while the observed cross block is zero.
low = 0.01297716240952423
high = 0.5753674769009862
reynolds_coefficient = (2 * low + 2 * high) / 4

print(json.dumps({
    'protocol': 'spin23-candidate48-moduli-so4-orbit/1',
    'moduliParameterCount': 5,
    'moduliTangentRank': moduli_rank,
    'so4GeneratorDimension': len(s.even),
    'so4OrbitTangentRank': so4_rank,
    'so4VacuumStabilizerDimension': len(s.even) - so4_rank,
    'moduliTangentSingularValues': moduli_singular.tolist(),
    'so4OrbitTangentSingularValues': so4_singular.tolist(),
    'principalCosines': principal.tolist(),
    'minimumPrincipalCosine': float(principal[-1]),
    'projectorDifferenceFrobeniusNorm': float(np.sqrt(max(0.0, moduli_rank + so4_rank - 2 * np.sum(principal ** 2)))),
    'localIdentification': bool(moduli_rank == so4_rank == 5 and principal[-1] > 1 - 1e-8),
    'reynoldsAverageOfV646': {
        'adjoint10VectorCoefficient': reynolds_coefficient,
        'symmetric14VectorCoefficient': reynolds_coefficient,
        'crossSectorCoefficient': 0.0,
        'eightDimensionalForm': '0.2941723196552552 * I_8',
    },
    'caveat': 'The Reynolds average is an SO(4)-invariant ensemble or collective-coordinate effective form; it is not the local Hessian of any one symmetry-breaking vacuum.',
}, indent=2))
