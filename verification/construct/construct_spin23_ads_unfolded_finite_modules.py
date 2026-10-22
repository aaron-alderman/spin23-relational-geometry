"""Explicit finite SO(2,3) unfolded toys for the 10 and 14 completed scalar sectors."""

import json
from itertools import combinations

import numpy as np


eta = np.diag([-1.0, 1.0, 1.0, 1.0, -1.0])
lorentz_eta = eta[:4, :4]


def generator(a, b):
    matrix = np.zeros((5, 5))
    for c in range(5):
        for d in range(5):
            matrix[c, d] = (1.0 if c == a else 0.0) * eta[b, d] - (1.0 if c == b else 0.0) * eta[a, d]
    return matrix


j_labels = list(combinations(range(4), 2))
j = [generator(a, b) for a, b in j_labels]
p = [generator(a, 4) for a in range(4)]
algebra_basis = j + p


def coordinates(matrix, basis):
    columns = np.stack([item.ravel() for item in basis], axis=1)
    result, _, _, _ = np.linalg.lstsq(columns, matrix.ravel(), rcond=None)
    return result, float(np.linalg.norm(matrix.ravel() - columns @ result))


bracket_rows = []
maximum_algebra_residual = 0.0
for a in range(4):
    for b in range(a + 1, 4):
        bracket = p[a] @ p[b] - p[b] @ p[a]
        coeff, residual = coordinates(bracket, j)
        maximum_algebra_residual = max(maximum_algebra_residual, residual)
        bracket_rows.append({'a': a, 'b': b, 'lorentzCoefficients': coeff.tolist(), 'residual': residual})


def adjoint_action(g):
    columns = []
    residual = 0.0
    for item in algebra_basis:
        coeff, error = coordinates(g @ item - item @ g, algebra_basis)
        columns.append(coeff)
        residual = max(residual, error)
    return np.stack(columns, axis=1), residual


adjoint_p = [adjoint_action(item)[0] for item in p]
adjoint_j = [adjoint_action(item)[0] for item in j]
adjoint_representation_residual = max(adjoint_action(item)[1] for item in algebra_basis)

# Covariant symmetric two-tensors, restricted to the eta-traceless 14.
sym_basis = []
for a in range(5):
    for b in range(a, 5):
        matrix = np.zeros((5, 5))
        matrix[a, b] = 1.0
        matrix[b, a] = 1.0 if b != a else 1.0
        sym_basis.append(matrix)
sym_columns = np.stack([item.ravel() for item in sym_basis], axis=1)
trace_row = np.array([np.trace(eta @ item) for item in sym_basis])[None, :]
_, _, trace_vh = np.linalg.svd(trace_row, full_matrices=True)
traceless_basis_raw = [sum(coeff[i] * sym_basis[i] for i in range(15)) for coeff in trace_vh[1:, :]]
traceless_columns = np.stack([item.ravel() for item in traceless_basis_raw], axis=1)
traceless_q, _ = np.linalg.qr(traceless_columns)
traceless_basis = [traceless_q[:, i].reshape(5, 5) for i in range(14)]


def symmetric_action(g):
    columns = []
    residual = 0.0
    for item in traceless_basis:
        image = -(g.T @ item + item @ g)
        coeff, error = coordinates(image, traceless_basis)
        columns.append(coeff)
        residual = max(residual, error)
    return np.stack(columns, axis=1), residual


sym_p = [symmetric_action(item)[0] for item in p]
sym_j = [symmetric_action(item)[0] for item in j]
sym_representation_residual = max(symmetric_action(item)[1] for item in algebra_basis)


def representation_integrability(rp, rj):
    residuals = []
    for a in range(4):
        for b in range(a + 1, 4):
            algebra_coeff, _ = coordinates(p[a] @ p[b] - p[b] @ p[a], j)
            expected = sum(algebra_coeff[i] * rj[i] for i in range(6))
            residuals.append(np.linalg.norm(rp[a] @ rp[b] - rp[b] @ rp[a] - expected))
    return float(max(residuals))


# Lorentz-sector projectors in the chosen coordinate bases.
adjoint_seed = np.eye(10)[:, 6:10]
adjoint_descendant = np.eye(10)[:, :6]

vector_raw = []
for a in range(4):
    matrix = np.zeros((5, 5)); matrix[a, 4] = matrix[4, a] = 1.0
    vector_raw.append(matrix)
vector_coords = np.stack([coordinates(item, traceless_basis)[0] for item in vector_raw], axis=1)
vector_q, _ = np.linalg.qr(vector_coords)

scalar_matrix = np.zeros((5, 5))
scalar_matrix[:4, :4] = lorentz_eta
scalar_matrix[4, 4] = 4.0
scalar_coord = coordinates(scalar_matrix, traceless_basis)[0][:, None]
scalar_q, _ = np.linalg.qr(scalar_coord)

tensor_raw = []
for a in range(4):
    for b in range(a, 4):
        matrix = np.zeros((5, 5)); matrix[a, b] = matrix[b, a] = 1.0 if a != b else 1.0
        lorentz_trace = np.trace(lorentz_eta @ matrix[:4, :4])
        matrix[:4, :4] -= (lorentz_trace / 4.0) * lorentz_eta
        tensor_raw.append(matrix)
tensor_coords = np.stack([coordinates(item, traceless_basis)[0] for item in tensor_raw], axis=1)
tensor_u, tensor_s, _ = np.linalg.svd(tensor_coords, full_matrices=False)
tensor_q = tensor_u[:, tensor_s > 1e-9]
even_q = np.concatenate([scalar_q, tensor_q], axis=1)


def one_step_rank(actions, source, target):
    images = np.concatenate([target.T @ action @ source for action in actions], axis=1)
    return int(np.linalg.matrix_rank(images, 1e-9)), float(np.linalg.norm(images))


adjoint_forward = one_step_rank(adjoint_p, adjoint_seed, adjoint_descendant)
adjoint_reverse = one_step_rank(adjoint_p, adjoint_descendant, adjoint_seed)
sym_forward = one_step_rank(sym_p, vector_q, even_q)
sym_reverse = one_step_rank(sym_p, even_q, vector_q)

print(json.dumps({
    'protocol': 'spin23-ads-unfolded-finite-module/1',
    'metricSignature': [2, 3],
    'adsSymmetricPair': {
        'lorentzDimension': 6,
        'translationDimension': 4,
        'maximumBracketProjectionResidual': maximum_algebra_residual,
        'translationBracketRows': bracket_rows,
    },
    'adjoint10Toy': {
        'lorentzBranching': {'bivector': 6, 'vectorSeed': 4},
        'representationResidual': adjoint_representation_residual,
        'integrabilityResidual': representation_integrability(adjoint_p, adjoint_j),
        'seedToBivectorOneStepRank': adjoint_forward[0],
        'bivectorToSeedOneStepRank': adjoint_reverse[0],
    },
    'symmetricTraceless14Toy': {
        'lorentzBranching': {'scalar': 1, 'vectorSeed': 4, 'symmetricTracelessTensor': 9},
        'representationResidual': sym_representation_residual,
        'integrabilityResidual': representation_integrability(sym_p, sym_j),
        'vectorToScalarPlusTensorOneStepRank': sym_forward[0],
        'scalarPlusTensorToVectorOneStepRank': sym_reverse[0],
    },
    'unfoldedEquation': 'D C = (d + omega^{ab} R(J_ab) + e^a R(P_a)) C = 0',
    'integrabilityCondition': 'D^2 C = 0 on a flat SO(2,3) Cartan connection; the [P_a,P_b] relation cancels AdS curvature against e^a wedge e^b.',
    'degreeOfFreedomWarning': 'A finite-dimensional covariantly constant zero-form is fixed by its value at one point and carries no unconstrained local propagating degrees of freedom. Propagating gravity requires an infinite Weyl module and/or gauge-form sector, not only these finite 10 and 14 descendants.',
}, indent=2))
