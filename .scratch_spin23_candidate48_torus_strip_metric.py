"""Induced field metric on the candidate-48 double-quotient Cartan section."""

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
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
builder = x.complex_field_builder(carrier)
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
sz = np.array([[1, 0], [0, -1]], dtype=complex)


def tangent_gram(delta, theta, eta):
    b = np.exp(0.5j * delta) * np.diag([np.exp(1j * theta), np.exp(-1j * theta)])
    d_delta = np.sqrt(amplitudes[(4, 8)]) * builder((4, 8), 0.5j * b)
    d_theta = np.sqrt(amplitudes[(4, 8)]) * builder((4, 8), 1j * sz @ b)
    cosine, sine = np.cos(eta), np.sin(eta)
    d26 = np.array([[-sine, -1j * cosine]])
    d29 = np.array([[-sine, 1j * cosine], [1j * cosine, -sine]])
    d_eta = np.sqrt(amplitudes[(2, 6)]) * builder((2, 6), d26) + np.sqrt(amplitudes[(2, 9)]) * builder((2, 9), d29)
    tangents = [d_delta, d_theta, d_eta]
    return np.array([[np.vdot(left, right).real for right in tangents] for left in tangents])


target = np.diag([2.0, 8.0, 10.0])
errors = []
for point in itertools.product(np.linspace(0, 2*np.pi, 5, endpoint=False), np.linspace(0, np.pi/2, 5), np.linspace(0, 2*np.pi, 5, endpoint=False)):
    errors.append(np.linalg.norm(tangent_gram(*point)-target))
print(json.dumps({
    'protocol':'spin23-candidate48-torus-strip-metric/1',
    'points':len(errors),
    'targetMetric':target.tolist(),
    'maximumMetricError':float(max(errors)),
    'intervalLength':float(np.sqrt(8)*np.pi/2),
},indent=2))
