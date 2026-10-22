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
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')
m = load('.scratch_spin23_u14_active_moduli_finite.py', 'm')


def analyze(carrier):
    q = x.q
    stationary, closure, preserving, labels, canonical, linear, quartic, _ = u.preserving_basis(carrier)
    casimirs = [q.factor_casimir(linear, canonical, [generator]) for generator in preserving]
    combined = sum(m.BASE_WEIGHTS[i] * casimirs[i] for i in range(4))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(2*quartic[np.ix_(active,active)],linear[active]*(1-combined[active]))
    fm = x.complex_field_builder(carrier)
    canonical_seeds = {tuple(label):x.h.canonical(label).astype(complex) for label in labels}
    def vacuum(seeds):
        return sum(np.sqrt(amplitudes[j])*fm(labels[i],seeds[tuple(labels[i])]) for j,i in enumerate(active))
    rng=np.random.default_rng(230565)
    transformed_seeds=dict(canonical_seeds)
    for i in active:
        label=tuple(labels[i]); transformed_seeds[label]=m.random_fixed_singular_seed(label,rng)
    d0=vacuum(canonical_seeds); d1=vacuum(transformed_seeds)
    b0=d0[92:,:92]; b1=d1[92:,:92]
    ul0,sv0,vh0=np.linalg.svd(b0,full_matrices=True)
    ul1,sv1,vh1=np.linalg.svd(b1,full_matrices=True)
    left=ul1@ul0.conj().T
    right=vh1.conj().T@vh0
    w=np.zeros((184,184),dtype=complex); w[:92,:92]=right; w[92:,92:]=left
    conjugated=w@d0@w.conj().T
    grading=np.diag(np.concatenate([np.ones(92),-np.ones(92)]))
    block_dimensions=[c.DIMS[i]*c.DIMS[j] for i,j in carrier['op']]
    offsets=np.cumsum([0]+block_dimensions)
    mask=np.zeros((92,92),dtype=bool)
    for start,end in zip(offsets[:-1],offsets[1:]): mask[start:end,start:end]=True
    return {
        'maximumSingularValueDeviation':float(np.max(np.abs(sv1-sv0))),
        'relativeConjugationResidual':float(np.linalg.norm(conjugated-d1)/np.linalg.norm(d1)),
        'gradingCommutatorNorm':float(np.linalg.norm(w@grading-grading@w)),
        'topCarrierOffBlockFraction':float(np.linalg.norm(right[~mask])/np.linalg.norm(right)),
        'bottomCarrierOffBlockFraction':float(np.linalg.norm(left[~mask])/np.linalg.norm(left)),
        'naiveRealStructureResidual':float(np.linalg.norm(left-right.conj())/np.linalg.norm(left)),
        'warning':'SVD degeneracies make this conjugator non-unique; failure of locality or the naive real-structure test does not prove that no better admissible conjugator exists.'
    }


if __name__=='__main__':
    carrier=next(item for item in c.strong_carriers() if (s.tw(item['op'],5),s.tw(item['op'],10))==(8,4) and item['lpair']==((8,10),(10,1)) and item['rpair']==((10,2),(7,5)))
    print(json.dumps({'protocol':'spin23-u14-moduli-conjugator-admissibility/1','row':analyze(carrier)},indent=2))
