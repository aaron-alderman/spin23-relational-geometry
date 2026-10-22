from collections import Counter
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
    if 'failure' in stationary:
        return {'failure': stationary['failure']}
    audit = f.audit(carrier, details=True)
    parent = [a.full_matrix(blocks, audit['_components']) for blocks in audit['_basis']]
    desired = list(stationary['active'])
    desired_fields = [field for label in desired for field in a.orbit_basis(carrier, label)]
    _, coefficients = z.kernel_basis(z.constraint_gram(parent, desired_fields))
    centralizer = z.combine(parent, coefficients)
    defect_rows = {}
    for item in stationary['classes']:
        if item['negative'] <= 0 and item['zero'] <= 0:
            continue
        fields = a.orbit_basis(carrier, item['label'])
        eigs = a.casimir_spectrum(centralizer, fields)
        defect_rows[str(item['label'])] = {
            'min': float(eigs[0]),
            'max': float(eigs[-1]),
            'dimension': len(eigs),
        }
    uncovered = sorted(label for label, row in defect_rows.items() if row['min'] <= 1e-8)
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'centralizerDimension': len(centralizer),
        'defectCount': len(defect_rows),
        'covered': not uncovered,
        'uncovered': uncovered,
        'minimumDefectCasimir': min(row['min'] for row in defect_rows.values()),
        'maximumAnisotropy': max(row['max'] - row['min'] for row in defect_rows.values()),
        'defects': defect_rows,
    }


if __name__ == '__main__':
    carriers = [x for x in c.strong_carriers() if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)]
    with ProcessPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(analyze, carriers))
    good = [row for row in rows if 'failure' not in row]
    uncovered = [row for row in good if not row['covered']]
    print(json.dumps({
        'protocol': 'spin23-vacuum-centralizer-family/1',
        'admissibleCarriers': len(good),
        'failureHistogram': dict(Counter(row.get('failure') for row in rows if 'failure' in row)),
        'centralizerDimensionHistogram': dict(Counter(row['centralizerDimension'] for row in good)),
        'fullyCovered': sum(row['covered'] for row in good),
        'uncovered': len(uncovered),
        'uncoveredLabelHistogram': dict(Counter(label for row in uncovered for label in row['uncovered'])),
        'globalMinimumDefectCasimir': min(row['minimumDefectCasimir'] for row in good),
        'globalMaximumAnisotropy': max(row['maximumAnisotropy'] for row in good),
        'rows': good,
    }, indent=2, default=list))
