from concurrent.futures import ProcessPoolExecutor
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
f = load('.scratch_spin23_ab_lie_closure_family.py', 'f')
a = load('.scratch_spin23_adjoint_casimir_sample.py', 'a')
z = load('.scratch_spin23_vacuum_centralizer_repair.py', 'z')


def analyze(carrier):
    stationary = h.analyze(carrier)
    audit = f.audit(carrier, details=True)
    parent = [a.full_matrix(blocks, audit['_components']) for blocks in audit['_basis']]
    fm = h.field_builder(carrier)
    vacuum = sum(np.sqrt(x) * fm(label, h.canonical(label)) for label, x in zip(stationary['active'], stationary['x'])).astype(complex)
    _, coefficients = z.kernel_basis(z.constraint_gram(parent, [vacuum]))
    centralizer = z.combine(parent, coefficients)
    defects = {}
    for item in stationary['classes']:
        if item['negative'] <= 0 and item['zero'] <= 0:
            continue
        eigs = a.casimir_spectrum(centralizer, a.orbit_basis(carrier, item['label']))
        defects[str(item['label'])] = {'min': float(eigs[0]), 'max': float(eigs[-1])}
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'actualVacuumCentralizerDimension': len(centralizer),
        'fullyCovered': all(row['min'] > 1e-8 for row in defects.values()),
        'defects': defects,
    }


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
        and x['lpair'] == ((8, 10), (10, 1))
        and x['rpair'][1] == (7, 5)
    ]
    with ProcessPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(analyze, carriers))
    print(json.dumps({'protocol': 'spin23-actual-vacuum-centralizer-exceptions/1', 'rows': rows}, indent=2, default=list))
