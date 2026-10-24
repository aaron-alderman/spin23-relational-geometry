#!/usr/bin/env python3
"""Audit the official 2017 ALP linear UFO without executing third-party code."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import tarfile
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "evidence/data/alp-linear-ufo-intervention-rank-audit-v1.json"
EXPECTED_SHA256 = "d5c27f76bcf87d84cba09c4ca30d852c68eb18962cd9da148973d9deb7373a7b"
OFFICIAL_URL = "https://cp3.irmp.ucl.ac.be/projects/feynrules/raw-attachment/wiki/ALPsEFT/ALP_linear_UFO.tar.gz"


def rank(matrix: list[list[int]]) -> int:
    work = [[Fraction(value) for value in row] for row in matrix]
    row = 0
    for column in range(len(work[0])):
        pivot = next((candidate for candidate in range(row, len(work)) if work[candidate][column]), None)
        if pivot is None:
            continue
        work[row], work[pivot] = work[pivot], work[row]
        scale = work[row][column]
        work[row] = [value / scale for value in work[row]]
        for candidate in range(len(work)):
            if candidate == row:
                continue
            scale = work[candidate][column]
            if scale:
                work[candidate] = [left - scale * right for left, right in zip(work[candidate], work[row])]
        row += 1
    return row


def read_member(archive: tarfile.TarFile, suffix: str) -> str:
    member = next((item for item in archive.getmembers() if item.name.endswith(suffix)), None)
    if member is None:
        raise SystemExit(f"missing {suffix}")
    handle = archive.extractfile(member)
    if handle is None:
        raise SystemExit(f"cannot read {suffix}")
    return handle.read().decode("utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path, help="official ALP_linear_UFO.tar.gz archive")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    archive_bytes = args.archive.read_bytes()
    archive_sha256 = hashlib.sha256(archive_bytes).hexdigest()
    if archive_sha256 != EXPECTED_SHA256:
        raise SystemExit(f"unexpected archive sha256: {archive_sha256}")

    with tarfile.open(args.archive, "r:gz") as archive:
        parameters = read_member(archive, "/parameters.py")
        couplings = read_member(archive, "/couplings.py")
        vertices = read_member(archive, "/vertices.py")
        log = read_member(archive, "/ALP_linear_UFO.log")
        file_count = len([item for item in archive.getmembers() if item.isfile()])

    alp_parameter_block = parameters[parameters.index("fa = Parameter"):parameters.index("cabi = Parameter")]
    alp_parameters = re.findall(r"^(\w+) = Parameter", alp_parameter_block, flags=re.MULTILINE)
    expected_parameters = ["fa", "CGtil", "CWtil", "CBtil", "CaPhi"]
    if alp_parameters != expected_parameters:
        raise SystemExit(f"unexpected ALPPARS inventory: {alp_parameters}")

    required_couplings = {
        "bottom": "-((CaPhi*vev*yb)/(fa*cmath.sqrt(2)))",
        "top": "(CaPhi*vev*yt)/(fa*cmath.sqrt(2))",
        "weak": "(2*CWtil*complex(0,1))/fa",
    }
    for label, expression in required_couplings.items():
        if expression not in couplings:
            raise SystemExit(f"missing {label} coupling expression")

    required_vertices = {
        "bottom": "particles = [ P.b__tilde__, P.b, P.ax ]",
        "top": "particles = [ P.t__tilde__, P.t, P.ax ]",
        "weak": "particles = [ P.W__minus__, P.W__plus__, P.ax ]",
    }
    for label, expression in required_vertices.items():
        if expression not in vertices:
            raise SystemExit(f"missing {label} vertex")

    intervention = [[1, 0], [-1, 0], [0, 1]]
    # A general symmetric 3-source kernel has six entries. Restriction to
    # (ct, cb, cW) = (x, -x, y) retains only three combinations.
    quadratic_restriction = [
        [1, 1, -2, 0, 0, 0],
        [0, 0, 0, 1, -1, 0],
        [0, 0, 0, 0, 0, 1],
    ]
    three_source_settings = [(ct, cb, cw) for ct in (-1, 0, 1) for cb in (-1, 0, 1) for cw in (-1, 0, 1)]
    reachable_settings = [setting for setting in three_source_settings if setting[1] == -setting[0]]

    vertex_match = re.search(r"Number of flavored vertices:\s*(\d+)", log)
    coupling_match = re.search(r"(\d+) couplings written", log)
    result = {
        "protocol": "alp-linear-ufo-intervention-rank-audit/1",
        "packet": "AZ-113",
        "targets": ["OT-047", "OT-048"],
        "sources": {
            "modelPage": "https://cp3.irmp.ucl.ac.be/projects/feynrules/wiki/ALPsEFT",
            "paper": "https://arxiv.org/abs/1701.05379",
            "archiveUrl": OFFICIAL_URL,
            "archiveSha256": archive_sha256,
            "archiveFiles": file_count,
        },
        "export": {
            "feynRulesVersion": "2.3.26",
            "flavoredVertices": int(vertex_match.group(1)) if vertex_match else None,
            "couplings": int(coupling_match.group(1)) if coupling_match else None,
            "alpExternalParameters": alp_parameters,
        },
        "sourceDependencies": {
            "normalizedTargetCoordinates": ["c_t", "c_b", "c_WW"],
            "independentUfoControls": ["CaPhi", "CWtil"],
            "interventionMatrix": intervention,
            "interventionRank": rank(intervention),
            "reachableConstraint": "c_b = -c_t",
            "directCouplingExpressions": required_couplings,
        },
        "factorialCeiling": {
            "declaredThreeSourceSettings": len(three_source_settings),
            "reachableSettings": len(reachable_settings),
            "unreachableSettings": len(three_source_settings) - len(reachable_settings),
            "reachableSettingList": reachable_settings,
            "generalSymmetricKernelCoefficients": 6,
            "identifiableRestrictedCombinations": rank(quadratic_restriction),
            "unidentifiedKernelDirections": 6 - rank(quadratic_restriction),
            "retainedCombinations": [
                "K_tt + K_bb - 2 K_tb",
                "K_tW - K_bW",
                "K_WW",
            ],
        },
        "decision": {
            "publishedUfoCanRunCaPhiCwSlice": True,
            "publishedUfoCanRunIndependentCtCbCwTriangle": False,
            "publishedUfoCanExecuteAz074Design": False,
            "amplitudeComputed": False,
            "physicsNoGoEstablished": False,
            "modelExtensionRequired": True,
        },
        "implementationContract": [
            "Choose one nonredundant gauge-invariant ALP EFT basis with independent third-generation current coefficients and c_WW.",
            "Export c_t, c_b and c_WW as independent signed controls without simultaneously retaining a redundant O_aPhi direction.",
            "Carry the chiral-field-redefinition anomaly shifts into c_GG, c_WW and c_BB in the same convention.",
            "Generate all gauge-completing vertices and record coupling orders; do not split only the broken-phase Yukawa vertices by hand.",
            "Validate hermiticity, quantum numbers and Ward identities before running the 27 common-phase-space settings.",
            "Fit 19 settings, audit the pair planes and predict the eight held-out corners before detector folding.",
        ],
        "implication": "The official public model is a valid two-control CaPhi-CWtil slice, but it cannot answer the corpus's three-source question. This is an implementation-rank boundary, not evidence that nature has only two directions.",
        "nextGate": "Build or locate a source-complete UFO with independent gauge-invariant top-current, bottom-current and c_WW controls, validate the signed anomaly dictionary and Ward identities, then execute AZ-074's 27 settings.",
    }

    if args.write:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {OUTPUT}")
    print(json.dumps({
        "archiveSha256": archive_sha256,
        "alpParameters": alp_parameters,
        "interventionRank": result["sourceDependencies"]["interventionRank"],
        "reachableSettings": result["factorialCeiling"]["reachableSettings"],
        "unidentifiedKernelDirections": result["factorialCeiling"]["unidentifiedKernelDirections"],
        "publishedUfoCanExecuteAz074Design": False,
    }, indent=2))


if __name__ == "__main__":
    main()
