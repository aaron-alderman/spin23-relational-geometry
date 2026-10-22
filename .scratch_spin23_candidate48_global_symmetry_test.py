"""Test whether finite vacuum moduli transformations extend to off-vacuum energy symmetries."""

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

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
_, _, response, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
builder = x.complex_field_builder(carrier)
weights = np.array([0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003])


def random_unitary(rng):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    q, r = np.linalg.qr(raw)
    phase = np.diag(r)
    return q @ np.diag(np.conj(phase) / np.abs(phase))


def matrix(seeds):
    return sum(builder(label, seeds[label]) for label in labels)


def energy(seeds):
    return float(sum(energy_parts(seeds)))


def energy_parts(seeds):
    d = matrix(seeds)
    d2 = d @ d
    values = [-np.trace(d2).real, np.vdot(d2, d2).real]
    for weight, generator in zip(weights, response):
        if weight:
            commutator = generator @ d - d @ generator
            values.append(weight * np.vdot(commutator, commutator).real)
    return values


def transformed(seeds, mode, u, angle):
    out = {label:value.copy() for label,value in seeds.items()}
    if mode == 'b48_left':
        out[(4, 8)] = u @ out[(4, 8)]
    elif mode == 'b48_right':
        out[(4, 8)] = out[(4, 8)] @ u
    else:
        sx = np.array([[0, 1], [1, 0]], dtype=complex)
        r = np.cos(angle) * np.eye(2) + 1j * np.sin(angle) * sx
        out[(2, 6)] = out[(2, 6)] @ r.conj().T
        if mode == 'mixed_b29_right':
            out[(2, 9)] = out[(2, 9)] @ r
        elif mode == 'mixed_b29_left':
            out[(2, 9)] = r @ out[(2, 9)]
    return out


rng = np.random.default_rng(230627)
modes = ['b48_left','b48_right','mixed_b29_right','mixed_b29_left']
errors = {mode:[] for mode in modes}
left_component_errors = []
for _ in range(24):
    seeds = {}
    for label in labels:
        shape = (c.DIMS[label[1]], c.DIMS[label[0]])
        seeds[label] = 0.03 * (rng.normal(size=shape) + 1j*rng.normal(size=shape))
    baseline = energy(seeds)
    u = random_unitary(rng)
    angle = rng.uniform(-np.pi, np.pi)
    for mode in modes:
        moved = transformed(seeds, mode, u, angle)
        value = energy(moved)
        errors[mode].append(abs(value-baseline)/max(1.0,abs(baseline)))
        if mode == 'b48_left':
            before_parts = np.array(energy_parts(seeds))
            after_parts = np.array(energy_parts(moved))
            left_component_errors.append(np.abs(after_parts-before_parts)/np.maximum(1.0,np.abs(before_parts)))

print(json.dumps({
    'protocol':'spin23-candidate48-global-symmetry-test/1',
    'randomConfigurations':24,
    'relativeEnergyError':{mode:{'minimum':float(min(values)),'median':float(np.median(values)),'maximum':float(max(values))} for mode,values in errors.items()},
    'b48LeftComponentMaximumRelativeErrors':np.max(np.stack(left_component_errors),axis=0).tolist(),
},indent=2))
