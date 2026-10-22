"""Enumerate node-sign factor transformations on the full candidate-48 vacuum."""

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

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
builder = x.complex_field_builder(carrier)
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
base = {label: x.h.canonical(label).astype(complex) for label in amplitudes}


def vacuum(delta, theta, eta):
    seeds = dict(base)
    seeds[(4, 8)] = np.exp(0.5j * delta) * np.diag([np.exp(1j * theta), np.exp(-1j * theta)])
    cosine, sine = np.cos(eta), np.sin(eta)
    seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
    seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
    return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)


def state_signs(node_signs):
    values = []
    for i, j in carrier['op']:
        values.extend([node_signs[i] * node_signs[j]] * (c.DIMS[i] * c.DIMS[j]))
    values = np.array(values)
    return np.concatenate([values, values])


point = (0.63, 0.47, 0.81)
source = vacuum(*point)
targets = {
    'identity': source,
    'eta_plus_pi': vacuum(point[0], point[1], point[2] + np.pi),
    'eta_reflection': vacuum(point[0], point[1], -point[2]),
    'b48_sign_delta_plus_2pi': vacuum(point[0] + 2*np.pi, point[1], point[2]),
    'cartan_reflection': vacuum(point[0], -point[1], point[2]),
}
best = {name: (float('inf'), None) for name in targets}
matches = {name: [] for name in targets}
for bits in itertools.product((-1, 1), repeat=10):
    signs = {node: bits[node-1] for node in range(1, 11)}
    diagonal = state_signs(signs)
    transformed = diagonal[:, None] * source * diagonal[None, :]
    for name, target in targets.items():
        residual = float(np.linalg.norm(transformed-target))
        if residual < best[name][0]:
            best[name] = (residual, bits)
        if residual < 1e-10:
            matches[name].append(bits)

rng = np.random.default_rng(230625)
validation = {'eta_plus_pi': [], 'b48_sign_delta_plus_2pi': []}
for _ in range(32):
    sample = (rng.uniform(-np.pi, np.pi), rng.uniform(0, np.pi/2), rng.uniform(-np.pi, np.pi))
    sample_source = vacuum(*sample)
    for name, target_point in {
        'eta_plus_pi': (sample[0], sample[1], sample[2]+np.pi),
        'b48_sign_delta_plus_2pi': (sample[0]+2*np.pi, sample[1], sample[2]),
    }.items():
        bits = matches[name][0]
        diagonal = state_signs({node: bits[node-1] for node in range(1, 11)})
        transformed = diagonal[:, None] * sample_source * diagonal[None, :]
        validation[name].append(float(np.linalg.norm(transformed-vacuum(*target_point))))

print(json.dumps({
    'protocol':'spin23-candidate48-discrete-sign-gauge/1',
    'assignmentsTested':1024,
    'bestResiduals':{name:value[0] for name,value in best.items()},
    'matchCounts':{name:len(value) for name,value in matches.items()},
    'firstMatches':{name:(list(value[0]) if value else None) for name,value in matches.items()},
    'randomValidationPoints':32,
    'randomValidationMaximumResiduals':{name:max(value) for name,value in validation.items()},
},indent=2))
