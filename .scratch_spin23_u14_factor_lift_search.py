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
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')
f = load('.scratch_spin23_u14_active_moduli_finite.py', 'f')


def complete_first_column(vector):
    vector = np.asarray(vector, dtype=complex)
    vector = vector / np.linalg.norm(vector)
    columns = [vector]
    for basis_index in range(len(vector)):
        candidate = np.zeros(len(vector), dtype=complex)
        candidate[basis_index] = 1
        for column in columns:
            candidate -= column * np.vdot(column, candidate)
        norm = np.linalg.norm(candidate)
        if norm > 1e-10:
            columns.append(candidate / norm)
        if len(columns) == len(vector):
            break
    return np.column_stack(columns)


TRANSFORMS = {
    'U': lambda value: value,
    'C': lambda value: value.conj(),
    'T': lambda value: value.T,
    'H': lambda value: value.conj().T,
}


def analyze(carrier):
    stationary, closure, preserving, labels, canonical, linear, quartic, _ = u.preserving_basis(carrier)
    casimirs = [x.q.factor_casimir(linear, canonical, [generator]) for generator in preserving]
    combined = sum(f.BASE_WEIGHTS[i] * casimirs[i] for i in range(4))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(2 * quartic[np.ix_(active, active)], linear[active] * (1 - combined[active]))
    builder = x.complex_field_builder(carrier)
    seeds0 = {tuple(label): x.h.canonical(label).astype(complex) for label in labels}
    rng = np.random.default_rng(230584)
    seeds1 = dict(seeds0)
    for index in active:
        label = tuple(labels[index])
        seeds1[label] = f.random_fixed_singular_seed(label, rng)

    node_units = {node: np.eye(c.DIMS[node], dtype=complex) for node in c.DIMS}
    # These two active edges occur with the stored label transposed relative to
    # the directed carrier edge, so their node-unitary reconstruction uses T/C.
    node_units[2] = complete_first_column(seeds1[(2, 6)].ravel())
    node_units[7] = complete_first_column(seeds1[(6, 7)].ravel())
    node_units[9] = seeds1[(7, 9)].conj() @ node_units[7]
    node_units[10] = seeds1[(5, 10)]

    scalar_residuals = {
        '(2,6)': float(np.linalg.norm(seeds1[(2, 6)] - seeds0[(2, 6)] @ node_units[2].T)),
        '(6,7)': float(np.linalg.norm(seeds1[(6, 7)] - node_units[7] @ seeds0[(6, 7)])),
        '(7,9)': float(np.linalg.norm(seeds1[(7, 9)] - node_units[9].conj() @ seeds0[(7, 9)] @ node_units[7].T)),
        '(5,10)': float(np.linalg.norm(seeds1[(5, 10)] - node_units[10] @ seeds0[(5, 10)])),
    }

    def vacuum(seeds):
        return sum(np.sqrt(amplitudes[k]) * builder(labels[index], seeds[tuple(labels[index])]) for k, index in enumerate(active))

    baseline = vacuum(seeds0)
    transformed = vacuum(seeds1)
    op = carrier['op']
    dims = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + dims[:-1]).tolist()
    active_edges = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in desired]
    blocks = []
    for edge in active_edges:
        uu, vv = edge['u'], edge['v']
        ou, ov, du, dv = offsets[uu], offsets[vv], dims[uu], dims[vv]
        blocks.append(('P', uu, 'J', vv, baseline[92+ov:92+ov+dv,ou:ou+du], transformed[92+ov:92+ov+dv,ou:ou+du]))
        blocks.append(('J', uu, 'P', vv, baseline[ov:ov+dv,92+ou:92+ou+du], transformed[ov:ov+dv,92+ou:92+ou+du]))

    formulas = []
    for order in ('ij', 'ji'):
        for first, second in itertools.product(TRANSFORMS, repeat=2):
            formulas.append((order, first, second))

    def represented(pair, formula):
        i, j = pair
        order, first, second = formula
        a, b = (i, j) if order == 'ij' else (j, i)
        return np.kron(TRANSFORMS[first](node_units[a]), TRANSFORMS[second](node_units[b]))

    candidates = []
    for p_formula, j_formula in itertools.product(formulas, repeat=2):
        residuals = []
        residual_rows = []
        for source_kind, source_index, target_kind, target_index, aa, bb in blocks:
            source_formula = p_formula if source_kind == 'P' else j_formula
            target_formula = p_formula if target_kind == 'P' else j_formula
            us = represented(op[source_index], source_formula)
            ut = represented(op[target_index], target_formula)
            value = np.linalg.norm(bb - ut @ aa @ us.conj().T)
            residuals.append(value)
            residual_rows.append((source_kind, source_index, target_kind, target_index, float(value)))
        candidates.append((float(max(residuals)), float(np.linalg.norm(residuals)), p_formula, j_formula, residual_rows))
    candidates.sort(key=lambda row: (row[0], row[1]))

    # Separately identify which formula pairs preserve the tied scalar ansatz at
    # all repeated P/J occurrences.  This test is independent of the particular
    # target-seed construction above.
    probe_rng = np.random.default_rng(23058401)
    probe_units = {node: f.random_unitary(c.DIMS[node], probe_rng) for node in c.DIMS}

    def probe_represented(pair, formula):
        i, j = pair
        order, first, second = formula
        a, b = (i, j) if order == 'ij' else (j, i)
        return np.kron(TRANSFORMS[first](probe_units[a]), TRANSFORMS[second](probe_units[b]))

    formula_blocks = {}
    for formula in formulas:
        formula_blocks[formula] = [probe_represented(pair, formula) for pair in op]

    label_systems = {}
    for label in sorted(desired):
        rows, columns = c.DIMS[label[1]], c.DIMS[label[0]]
        basis_vectors = []
        for rr, cc in itertools.product(range(rows), range(columns)):
            elementary = np.zeros((rows, columns), dtype=complex)
            elementary[rr, cc] = 1
            matrix = builder(label, elementary)
            pieces = []
            for source_kind, source_index, target_kind, target_index, _, _ in blocks:
                if tuple(next(edge['orbit'] for edge in active_edges if edge['u'] == source_index and edge['v'] == target_index)) != label:
                    continue
                ou, ov = offsets[source_index], offsets[target_index]
                du, dv = dims[source_index], dims[target_index]
                block = matrix[92+ov:92+ov+dv,ou:ou+du] if source_kind == 'P' else matrix[ov:ov+dv,92+ou:92+ou+du]
                pieces.append(block.ravel())
            basis_vectors.append(np.concatenate(pieces))
        label_systems[label] = np.stack(basis_vectors, axis=1)

    invariance = []
    for p_formula, j_formula in itertools.product(formulas, repeat=2):
        label_residuals = []
        for label in sorted(desired):
            seed_matrix = builder(label, seeds0[label])
            transformed_pieces = []
            for source_kind, source_index, target_kind, target_index, _, _ in blocks:
                matching = next(edge for edge in active_edges if edge['u'] == source_index and edge['v'] == target_index)
                if tuple(matching['orbit']) != label:
                    continue
                ou, ov = offsets[source_index], offsets[target_index]
                du, dv = dims[source_index], dims[target_index]
                aa = seed_matrix[92+ov:92+ov+dv,ou:ou+du] if source_kind == 'P' else seed_matrix[ov:ov+dv,92+ou:92+ou+du]
                us = formula_blocks[p_formula if source_kind == 'P' else j_formula][source_index]
                ut = formula_blocks[p_formula if target_kind == 'P' else j_formula][target_index]
                transformed_pieces.append((ut @ aa @ us.conj().T).ravel())
            target_vector = np.concatenate(transformed_pieces)
            system = label_systems[label]
            coefficients = np.linalg.lstsq(system, target_vector, rcond=None)[0]
            label_residuals.append(np.linalg.norm(target_vector - system @ coefficients))
        invariance.append((float(max(label_residuals)), float(np.linalg.norm(label_residuals)), p_formula, j_formula))
    invariance.sort(key=lambda row: (row[0], row[1]))
    return {
        'activeOrbits': sorted(desired),
        'scalarConstructionResiduals': scalar_residuals,
        'formulaCandidatesTested': len(candidates),
        'best': [
            {'maximumBlockResidual': row[0], 'aggregateBlockResidual': row[1], 'PFormula': row[2], 'JFormula': row[3], 'blockResiduals': row[4]}
            for row in candidates[:12]
        ],
        'ansatzInvarianceProbe': {
            'formulaCandidatesTested': len(invariance),
            'best': [
                {'maximumProjectionResidual': row[0], 'aggregateProjectionResidual': row[1], 'PFormula': row[2], 'JFormula': row[3]}
                for row in invariance[:12]
            ],
        },
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-u14-factor-lift-search/1', 'row': analyze(carrier)}, indent=2, default=list))
