"""Probe whether the full response Gram resolves candidate-48 quotient moduli."""

import importlib.util
import itertools
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
xmod = load('.scratch_spin23_exception_factor_complex_hessian.py', 'xmod')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
_, _, response, _, _, _, _, _, _ = g.generic_preserving_basis(carrier)
builder = xmod.complex_field_builder(carrier)
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
base = {label: xmod.h.canonical(label).astype(complex) for label in amplitudes}


def vacuum(delta, cartan_angle, mixed_angle):
    seeds = dict(base)
    seeds[(4, 8)] = np.exp(0.5j * delta) * np.diag([np.exp(1j * cartan_angle), np.exp(-1j * cartan_angle)])
    cosine, sine = np.cos(mixed_angle), np.sin(mixed_angle)
    seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
    seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
    return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)


def packed_gram(matrix):
    commutators = [generator @ matrix - matrix @ generator for generator in response]
    gram = np.array([[np.vdot(left, right) for right in commutators] for left in commutators])
    values = []
    for a in range(len(response)):
        values.append(gram[a, a].real)
        for b in range(a + 1, len(response)):
            values.extend([gram[a, b].real, gram[a, b].imag])
    return np.array(values), gram


grid = list(itertools.product(
    np.linspace(0.11, 2.71, 4),
    np.linspace(0.13, 1.37, 4),
    np.linspace(0.17, 2.47, 4),
))
features = []
weighted = []
weights = np.array([0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003])
for point in grid:
    packed, gram = packed_gram(vacuum(*point))
    features.append(packed)
    weighted.append(float(weights @ np.diag(gram).real))
features = np.stack(features)
centered = features - np.mean(features, axis=0)
singular = np.linalg.svd(centered, compute_uv=False)
tolerance = 1e-10 * max(1.0, singular[0])

# Local finite-difference Jacobian in the three quotient coordinates.
base_point = np.array([0.73, 0.61, 0.89])
step = 1e-5
jacobian = []
for axis in range(3):
    offset = np.zeros(3); offset[axis] = step
    plus, _ = packed_gram(vacuum(*(base_point + offset)))
    minus, _ = packed_gram(vacuum(*(base_point - offset)))
    jacobian.append((plus-minus)/(2*step))
jacobian = np.stack(jacobian, axis=1)
jacobian_singular = np.linalg.svd(jacobian, compute_uv=False)

print(json.dumps({
    'protocol':'spin23-candidate48-response-gram-moduli/1',
    'gridPoints':len(grid),
    'featureDimension':features.shape[1],
    'centeredFeatureRank':int(np.sum(singular>tolerance)),
    'leadingCenteredSingularValues':singular[:10].tolist(),
    'featureMaximumRange':float(np.max(np.ptp(features,axis=0))),
    'weightedScalarRange':float(max(weighted)-min(weighted)),
    'localJacobianSingularValues':jacobian_singular.tolist(),
    'localJacobianRank':int(np.sum(jacobian_singular>1e-8*max(1.0,jacobian_singular[0]))),
},indent=2))
