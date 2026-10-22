from itertools import product
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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
r = load('.scratch_spin23_exception_closure_radial_kkt.py', 'r')
q = load('.scratch_spin23_exception_factor_cone_kkt.py', 'q')


WEIGHTS = np.array([806/707, 132/707, 3733/707])


def complex_field_builder(carrier):
    op = carrier['op']
    block_dimensions = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + block_dimensions[:-1]).tolist()

    def field_matrix(label, seed):
        matrix = np.zeros((184, 184), dtype=complex)
        for edge in carrier['graph']['edges']:
            if edge['orbit'] != label:
                continue
            u, v = edge['u'], edge['v']
            p, endpoint = op[u], op[v]
            horizontal = p[1] == endpoint[0] and p[0] != endpoint[1]
            vertical = p[0] == endpoint[1] and p[1] != endpoint[0]
            assert horizontal != vertical
            a, b = (p[0], endpoint[1]) if horizontal else (p[1], endpoint[0])
            field = seed if (a, b) == label else seed.T
            if horizontal:
                direct = np.kron(field, np.eye(c.DIMS[p[1]]))
                conjugate = np.kron(np.eye(c.DIMS[p[1]]), field)
            else:
                direct = np.kron(np.eye(c.DIMS[p[0]]), field)
                conjugate = np.kron(field, np.eye(c.DIMS[p[0]]))
            pu, jv, ju, pv = offsets[u], 92 + offsets[v], 92 + offsets[u], offsets[v]
            matrix[jv:jv+direct.shape[0], pu:pu+direct.shape[1]] += direct
            matrix[pu:pu+direct.shape[1], jv:jv+direct.shape[0]] += direct.conj().T
            matrix[pv:pv+conjugate.shape[0], ju:ju+conjugate.shape[1]] += conjugate
            matrix[ju:ju+conjugate.shape[1], pv:pv+conjugate.shape[0]] += conjugate.conj().T
        return matrix
    return field_matrix


def analyze(carrier, factor_transform=None, factor_builder=None, weights=None, tangent_generators=None, random_kernel_samples=512, include_kernel_decomposition=False, active_labels=None, include_projector_decomposition=False, non_gauge_random_samples=0):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    if factor_builder is not None:
        factors = factor_builder(factors)
    elif factor_transform is not None:
        factors = [factor_transform(factor) for factor in factors]
    response_weights = WEIGHTS if weights is None else np.array(weights, dtype=float)
    if tangent_generators is None:
        tangent_generators = closure
    labels, canonical, linear, quartic, total_casimir = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators) for generators in factors]
    combined_casimir = sum(response_weights[i] * casimirs[i] for i in range(len(factors)))
    desired = {tuple(label) for label in (stationary['active'] if active_labels is None else active_labels)}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(
        2 * quartic[np.ix_(active, active)],
        linear[active] * (1 - combined_casimir[active]),
    )
    vacuum = sum(np.sqrt(amplitudes[local]) * canonical[index] for local, index in enumerate(active))
    fm = complex_field_builder(carrier)
    fields = []
    coordinate_labels = []
    coordinate_types = []
    coordinate_entries = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex); seed[row, column] = 1
            fields.append(fm(label, seed)); coordinate_labels.append(label); coordinate_types.append('real'); coordinate_entries.append((row, column))
            fields.append(fm(label, 1j * seed)); coordinate_labels.append(label); coordinate_types.append('imaginary'); coordinate_entries.append((row, column))
    count = len(fields)
    vacuum2 = vacuum @ vacuum
    vacuum3 = vacuum2 @ vacuum
    gradients = np.array([-2*np.vdot(field,vacuum).real + 4*np.vdot(field,vacuum3).real for field in fields])
    gauge_grams = []
    for k, generators in enumerate(factors):
        gram = np.zeros((count, count))
        factor_gradient = np.zeros(count)
        for generator in generators:
            vacuum_commutator = generator @ vacuum - vacuum @ generator
            commutators = [generator @ field - field @ generator for field in fields]
            packed = np.stack([np.concatenate([item.real.ravel(), item.imag.ravel()]) for item in commutators])
            gram += packed @ packed.T
            vacuum_packed = np.concatenate([vacuum_commutator.real.ravel(), vacuum_commutator.imag.ravel()])
            factor_gradient += packed @ vacuum_packed
        gauge_grams.append(gram)
        gradients += 2 * response_weights[k] * factor_gradient
    hessian = np.zeros((count, count))
    for j, right in enumerate(fields):
        image = -2*right + 4*(vacuum2@right + vacuum@right@vacuum + right@vacuum2)
        for i in range(j+1):
            value = np.vdot(fields[i], image).real
            for k in range(len(factors)):
                value += 2 * response_weights[k] * gauge_grams[k][i,j]
            hessian[i,j] = hessian[j,i] = value
    values, vectors = np.linalg.eigh(hessian)
    tolerance = 1e-8 * max(1.0, float(np.max(np.abs(values))))
    field_norms = np.array([np.vdot(field,field).real for field in fields])
    tangent_columns = []
    maximum_tangent_projection_residual = 0.0
    for generator in tangent_generators:
        tangent = generator @ vacuum - vacuum @ generator
        coefficients = np.array([np.vdot(field,tangent).real/field_norms[i] for i,field in enumerate(fields)])
        projected = sum(coefficients[i]*fields[i] for i in range(count))
        maximum_tangent_projection_residual = max(maximum_tangent_projection_residual,float(np.linalg.norm(tangent-projected)))
        tangent_columns.append(coefficients)
    tangent_matrix = np.stack(tangent_columns,axis=1)
    tangent_rank = int(np.linalg.matrix_rank(tangent_matrix,1e-8))
    zero_vectors = vectors[:,np.abs(values)<=tolerance]
    tangent_orthonormal = np.linalg.svd(tangent_matrix,full_matrices=False)[0][:,:tangent_rank]
    principal_values = np.linalg.svd(zero_vectors.T@tangent_orthonormal,compute_uv=False) if tangent_rank else np.array([])
    positive_indices = np.where(values>tolerance)[0]
    positive_vectors = vectors[:,positive_indices]
    positive_values = values[positive_indices]
    rng = np.random.default_rng(230565)
    sample_coefficients = [np.eye(zero_vectors.shape[1])[i] for i in range(zero_vectors.shape[1])]
    sample_coefficients += [rng.normal(size=zero_vectors.shape[1]) for _ in range(random_kernel_samples)]
    def evaluate_kernel_coordinate(coordinate_vector):
        coordinate_vector = coordinate_vector / np.linalg.norm(coordinate_vector)
        direction = sum(coordinate_vector[i]*fields[i] for i in range(count))
        direction /= np.sqrt(np.vdot(direction,direction).real)
        direction2 = direction@direction
        cubic = 4*np.trace(vacuum@direction2@direction).real
        quartic_value = np.trace(direction2@direction2).real
        cubic_gradient_matrix = 4*(direction2@vacuum + direction@vacuum@direction + vacuum@direction2)
        cubic_gradient_coordinates = np.array([np.vdot(field,cubic_gradient_matrix).real for field in fields])
        massive_gradient = positive_vectors.T@cubic_gradient_coordinates
        relaxed = quartic_value - 0.5*float(np.sum(massive_gradient**2/positive_values))
        return float(cubic),float(quartic_value),float(relaxed),coordinate_vector.copy()
    polynomial_samples = []
    for coefficients in sample_coefficients:
        coefficients /= np.linalg.norm(coefficients)
        coordinate_vector = zero_vectors@coefficients
        polynomial_samples.append(evaluate_kernel_coordinate(coordinate_vector))
    negative_modes = []
    for mode in np.where(values < -tolerance)[0]:
        vector = vectors[:,mode]
        by_orbit_type = {}
        for i, coefficient in enumerate(vector):
            weight = float(coefficient**2)
            if weight > 1e-10:
                key = f"{coordinate_labels[i]}:{coordinate_types[i]}"
                by_orbit_type[key] = by_orbit_type.get(key,0.0) + weight
        negative_modes.append({'eigenvalue':float(values[mode]),'orbitTypeNormWeights':by_orbit_type})
    result = {
        'lpair':carrier['lpair'],'rpair':carrier['rpair'],
        'weights':response_weights.tolist(),
        'coordinateDimension':count,
        'maximumAbsoluteGradientComponent':float(np.max(np.abs(gradients))),
        'hessianMinimum':float(values[0]),'hessianMaximum':float(values[-1]),
        'negativeEigenvalues':int(np.sum(values < -tolerance)),
        'zeroEigenvalues':int(np.sum(np.abs(values)<=tolerance)),
        'gaugeOrbitTangentRank':tangent_rank,
        'responseGeneratorDimension':len(tangent_generators),
        'vacuumStabilizerDimensionInsideClosure':len(tangent_generators)-tangent_rank,
        'maximumGaugeTangentProjectionResidual':maximum_tangent_projection_residual,
        'hessianTimesGaugeTangentFrobeniusNorm':float(np.linalg.norm(hessian@tangent_matrix)),
        'minimumGaugeTangentToKernelPrincipalCosine':float(principal_values[-1]) if len(principal_values) else None,
        'nonGaugeKernelDimension':int(np.sum(np.abs(values)<=tolerance))-tangent_rank,
        'kernelPolynomialSample':{
            'directionsTested':len(polynomial_samples),
            'maximumAbsoluteCubicCoefficient':max(abs(row[0]) for row in polynomial_samples),
            'minimumDirectQuarticCoefficient':min(row[1] for row in polynomial_samples),
            'minimumMassiveRelaxedQuarticCoefficient':min(row[2] for row in polynomial_samples),
            'maximumMassiveRelaxedQuarticCoefficient':max(row[2] for row in polynomial_samples),
        },
        'smallestEigenvalues':values[:30].tolist(),
        'negativeModes':negative_modes,
    }
    if non_gauge_random_samples:
        projected_kernel = zero_vectors - tangent_orthonormal @ (tangent_orthonormal.T @ zero_vectors) if tangent_rank else zero_vectors
        nongauge_u, nongauge_s, _ = np.linalg.svd(projected_kernel, full_matrices=False)
        nongauge_rank = int(np.sum(nongauge_s > 1e-8))
        nongauge_basis = nongauge_u[:, :nongauge_rank]
        nongauge_rng = np.random.default_rng(230593)
        nongauge_coefficients = [np.eye(nongauge_rank)[i] for i in range(nongauge_rank)]
        nongauge_coefficients += [nongauge_rng.normal(size=nongauge_rank) for _ in range(non_gauge_random_samples)]
        nongauge_rows = [evaluate_kernel_coordinate(nongauge_basis @ coefficients) for coefficients in nongauge_coefficients]
        nongauge_worst = min(nongauge_rows, key=lambda row: row[2])
        total = float(np.sum(nongauge_worst[3] ** 2 * field_norms))
        support = {}
        for i, coefficient in enumerate(nongauge_worst[3]):
            weight = float(coefficient ** 2 * field_norms[i] / total)
            if weight > 1e-10:
                key = str(coordinate_labels[i])
                support[key] = support.get(key, 0.0) + weight
        result['nonGaugeKernelPolynomialSample'] = {
            'dimension': nongauge_rank,
            'directionsTested': len(nongauge_rows),
            'maximumAbsoluteCubicCoefficient': max(abs(row[0]) for row in nongauge_rows),
            'minimumDirectQuarticCoefficient': min(row[1] for row in nongauge_rows),
            'minimumMassiveRelaxedQuarticCoefficient': nongauge_worst[2],
            'maximumMassiveRelaxedQuarticCoefficient': max(row[2] for row in nongauge_rows),
            'worstDirectionByOrbitNormFraction': support,
        }
        nongauge_sectors = {}
        for sector_name, allowed in {
            'activePhysical': desired,
            'inactivePhysical': {tuple(label) for label in labels if tuple(label) not in desired},
        }.items():
            outside = [i for i, label in enumerate(coordinate_labels) if tuple(label) not in allowed]
            _, outside_singular, outside_vh = np.linalg.svd(nongauge_basis[outside, :], full_matrices=True)
            outside_rank = int(np.sum(outside_singular > 1e-8))
            coefficient_basis = outside_vh[outside_rank:, :].T
            sector_basis = nongauge_basis @ coefficient_basis
            sector_rng = np.random.default_rng(230593 + len(nongauge_sectors))
            sector_coefficients = [np.eye(sector_basis.shape[1])[i] for i in range(sector_basis.shape[1])]
            sector_coefficients += [sector_rng.normal(size=sector_basis.shape[1]) for _ in range(non_gauge_random_samples)]
            sector_rows = [evaluate_kernel_coordinate(sector_basis @ coefficients) for coefficients in sector_coefficients]
            nongauge_sectors[sector_name] = {
                'dimension': int(sector_basis.shape[1]),
                'directionsTested': len(sector_rows),
                'minimumDirectQuarticCoefficient': min(row[1] for row in sector_rows),
                'minimumMassiveRelaxedQuarticCoefficient': min(row[2] for row in sector_rows),
                'maximumMassiveRelaxedQuarticCoefficient': max(row[2] for row in sector_rows),
            }
        result['nonGaugeKernelSectorSamples'] = nongauge_sectors
    all_cross_rows = []
    for row in polynomial_samples:
        coordinate = row[3]
        total_norm2 = float(np.sum(coordinate ** 2 * field_norms))
        norm18 = float(sum(coordinate[i] ** 2 * field_norms[i] for i, label in enumerate(coordinate_labels) if tuple(label) == (1, 8))) / total_norm2
        norm25 = float(sum(coordinate[i] ** 2 * field_norms[i] for i, label in enumerate(coordinate_labels) if tuple(label) == (2, 5))) / total_norm2
        product_norm = norm18 * norm25
        required = max(0.0, -row[2] / product_norm) if product_norm > 1e-12 else None
        all_cross_rows.append((row[2], norm18, norm25, product_norm, required))
    finite_required = [row[4] for row in all_cross_rows if row[4] is not None]
    invisible = [row[0] for row in all_cross_rows if row[3] <= 1e-12]
    result['kernelPolynomialSample']['crossInactiveRepairAudit'] = {
        'sampledThreshold': max(finite_required) if finite_required else None,
        'minimumInvisibleDirectionRelaxedQuartic': min(invisible) if invisible else None,
        'minimumAdjustedRelaxedQuarticByKappa': {
            str(kappa): min(row[0] + kappa * row[3] for row in all_cross_rows)
            for kappa in [0.075, 0.1, 0.15, 0.25, 0.5]
        },
    }
    if include_projector_decomposition:
        projector_by_orbit_type = {}
        projector_by_orbit = {}
        gauge_projector_by_orbit_type = {}
        gauge_projector_by_orbit = {}
        nongauge_projector_by_orbit_type = {}
        nongauge_projector_by_orbit = {}
        for i in range(count):
            weight = float(np.sum(zero_vectors[i, :] ** 2))
            gauge_weight = float(np.sum(tangent_orthonormal[i, :] ** 2)) if tangent_rank else 0.0
            nongauge_weight = weight - gauge_weight
            type_key = f"{coordinate_labels[i]}:{coordinate_types[i]}"
            orbit_key = str(coordinate_labels[i])
            projector_by_orbit_type[type_key] = projector_by_orbit_type.get(type_key, 0.0) + weight
            projector_by_orbit[orbit_key] = projector_by_orbit.get(orbit_key, 0.0) + weight
            gauge_projector_by_orbit_type[type_key] = gauge_projector_by_orbit_type.get(type_key, 0.0) + gauge_weight
            gauge_projector_by_orbit[orbit_key] = gauge_projector_by_orbit.get(orbit_key, 0.0) + gauge_weight
            nongauge_projector_by_orbit_type[type_key] = nongauge_projector_by_orbit_type.get(type_key, 0.0) + nongauge_weight
            nongauge_projector_by_orbit[orbit_key] = nongauge_projector_by_orbit.get(orbit_key, 0.0) + nongauge_weight
        result['kernelProjectorTraceByOrbitType'] = projector_by_orbit_type
        result['kernelProjectorTraceByOrbit'] = projector_by_orbit
        result['gaugeProjectorTraceByOrbitType'] = gauge_projector_by_orbit_type
        result['gaugeProjectorTraceByOrbit'] = gauge_projector_by_orbit
        result['nonGaugeProjectorTraceByOrbitType'] = nongauge_projector_by_orbit_type
        result['nonGaugeProjectorTraceByOrbit'] = nongauge_projector_by_orbit
        phase_probe_labels = [(2, 6), (2, 9)]
        amplitude_by_label = {tuple(labels[index]): amplitudes[local] for local, index in enumerate(active)}
        phase_probes = []
        for label in phase_probe_labels:
            target = np.sqrt(amplitude_by_label[label]) * fm(label, 1j * h.canonical(label).astype(complex))
            coefficients = np.array([np.vdot(field, target).real / field_norms[i] for i, field in enumerate(fields)])
            phase_probes.append(coefficients / np.linalg.norm(coefficients))
        phase_probes = np.stack(phase_probes, axis=1)
        kernel_gram = phase_probes.T @ zero_vectors @ zero_vectors.T @ phase_probes
        gauge_gram = phase_probes.T @ tangent_orthonormal @ tangent_orthonormal.T @ phase_probes
        result['phaseProbeLabels'] = [str(label) for label in phase_probe_labels]
        result['phaseKernelProjectorGram'] = kernel_gram.tolist()
        result['phaseGaugeProjectorGram'] = gauge_gram.tolist()
        result['phaseNonGaugeProjectorGram'] = (kernel_gram - gauge_gram).tolist()
        projected_kernel = zero_vectors - tangent_orthonormal @ (tangent_orthonormal.T @ zero_vectors) if tangent_rank else zero_vectors
        nongauge_u, nongauge_s, _ = np.linalg.svd(projected_kernel, full_matrices=False)
        nongauge_basis = nongauge_u[:, :int(np.sum(nongauge_s > 1e-8))]
        pair_mask = np.array([tuple(label) in {(2, 6), (2, 9)} for label in coordinate_labels])
        _, outside_singular, outside_vh = np.linalg.svd(nongauge_basis[~pair_mask, :], full_matrices=True)
        coefficient_basis = outside_vh.T[:, int(np.sum(outside_singular > 1e-8)):]
        pair_basis = nongauge_basis @ coefficient_basis
        pair_basis = pair_basis / np.linalg.norm(pair_basis, axis=0, keepdims=True)
        result['twoSixTwoNinePhysicalDimension'] = pair_basis.shape[1]
        result['twoSixTwoNinePhysicalBasis'] = [
            [
                {
                    'label': str(coordinate_labels[i]),
                    'type': coordinate_types[i],
                    'entry': list(coordinate_entries[i]),
                    'coefficient': float(pair_basis[i, column]),
                }
                for i in range(count) if abs(pair_basis[i, column]) > 1e-8
            ]
            for column in range(pair_basis.shape[1])
        ]
    if include_kernel_decomposition:
        by_orbit_type = {}
        by_orbit = {}
        for i in range(count):
            weight = float(np.sum(zero_vectors[i, :] ** 2))
            type_key = f"{coordinate_labels[i]}:{coordinate_types[i]}"
            orbit_key = str(coordinate_labels[i])
            by_orbit_type[type_key] = by_orbit_type.get(type_key, 0.0) + weight
            by_orbit[orbit_key] = by_orbit.get(orbit_key, 0.0) + weight
        result['kernelProjectorTraceByOrbitType'] = by_orbit_type
        result['kernelProjectorTraceByOrbit'] = by_orbit
        minimizing = min(polynomial_samples, key=lambda row: row[2])
        minimizing_by_orbit_type = {}
        minimizing_by_orbit = {}
        for i, coefficient in enumerate(minimizing[3]):
            weight = float(coefficient ** 2)
            type_key = f"{coordinate_labels[i]}:{coordinate_types[i]}"
            orbit_key = str(coordinate_labels[i])
            minimizing_by_orbit_type[type_key] = minimizing_by_orbit_type.get(type_key, 0.0) + weight
            minimizing_by_orbit[orbit_key] = minimizing_by_orbit.get(orbit_key, 0.0) + weight
        result['minimumRelaxedQuarticDirectionByOrbitType'] = minimizing_by_orbit_type
        result['minimumRelaxedQuarticDirectionByOrbit'] = minimizing_by_orbit
        sector_results = {}
        sector_definitions = {
            'neutralInactive18': {(1, 8)},
            'inactive25': {(2, 5)},
            'combinedInactiveFlat': {(1, 8), (2, 5)},
            'activeAngular': {tuple(labels[i]) for i in active},
        }
        for sector_name, allowed in sector_definitions.items():
            outside = [i for i, label in enumerate(coordinate_labels) if tuple(label) not in allowed]
            _, outside_singular, outside_vh = np.linalg.svd(zero_vectors[outside, :], full_matrices=True)
            outside_rank = int(np.sum(outside_singular > 1e-8))
            coefficient_basis = outside_vh[outside_rank:, :].T
            sector_rng = np.random.default_rng(230565)
            coefficients_to_test = [coefficient_basis[:, i] for i in range(coefficient_basis.shape[1])]
            coefficients_to_test += [coefficient_basis @ sector_rng.normal(size=coefficient_basis.shape[1]) for _ in range(128)]
            sector_samples = [evaluate_kernel_coordinate(zero_vectors @ coefficients) for coefficients in coefficients_to_test]
            sector_results[sector_name] = {
                'dimension': int(coefficient_basis.shape[1]),
                'directionsTested': len(sector_samples),
                'minimumDirectQuarticCoefficient': min(row[1] for row in sector_samples),
                'minimumMassiveRelaxedQuarticCoefficient': min(row[2] for row in sector_samples),
            }
            if sector_name == 'combinedInactiveFlat':
                cross_rows = []
                for row in sector_samples:
                    coordinate = row[3]
                    total_norm2 = float(np.sum(coordinate ** 2 * field_norms))
                    norm18 = float(sum(coordinate[i] ** 2 * field_norms[i] for i, label in enumerate(coordinate_labels) if tuple(label) == (1, 8))) / total_norm2
                    norm25 = float(sum(coordinate[i] ** 2 * field_norms[i] for i, label in enumerate(coordinate_labels) if tuple(label) == (2, 5))) / total_norm2
                    product_norm = norm18 * norm25
                    required = max(0.0, -row[2] / product_norm) if product_norm > 1e-12 else 0.0
                    cross_rows.append((row[2], norm18, norm25, product_norm, required))
                worst = max(cross_rows, key=lambda row: row[4])
                sector_results[sector_name]['sampledCrossPenaltyThreshold'] = worst[4]
                sector_results[sector_name]['thresholdWitness'] = {
                    'unrepairedRelaxedQuartic': worst[0],
                    'normFraction18': worst[1],
                    'normFraction25': worst[2],
                    'fractionProduct': worst[3],
                }
                sector_results[sector_name]['minimumAdjustedRelaxedQuarticByKappa'] = {
                    str(kappa): min(row[0] + kappa * row[3] for row in cross_rows)
                    for kappa in [0.05, 0.075, 0.1, 0.125, 0.15]
                }
        result['kernelSectorPolynomialSamples'] = sector_results
    return result


if __name__ == '__main__':
    carrier = next(
        x for x in c.strong_carriers()
        if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)
        and x['lpair']==((8,10),(10,1))
        and x['rpair']==((10,2),(7,5))
    )
    print(json.dumps({'protocol':'spin23-exception-factor-complex-hessian/1','row':analyze(carrier)},indent=2,default=list))
