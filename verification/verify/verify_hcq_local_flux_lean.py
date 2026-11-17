"""Compile the local-flux witness and audit its axioms in a fresh Lean process."""

import argparse
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[2]
WITNESS = ROOT / "evidence/data/hcq-independent-local-flux-witness-v1.json"
STANDARD_AXIOMS = {"propext", "Classical.choice", "Quot.sound"}


def rational(value):
    exact = Fraction(value)
    return f"({exact.numerator} / {exact.denominator} : Rat)"


def pair(values):
    x, y = values
    return f"({rational(x)}, {rational(y)})"


def witness_module(witness):
    single_row, = witness["singleSensorCoupling"]
    first_row, second_row = witness["twoSensorCoupling"]
    reference_reading, target_reading = witness["singleSensorReadings"]
    lines = ["import Std", "", "namespace LocalFluxWitnessData"]
    for name, value in {
        "singleRow": single_row,
        "firstRow": first_row,
        "secondRow": second_row,
        "fluxRow": witness["deviceFluxWeights"],
        "reference": witness["referenceCurrents"],
        "target": witness["targetCurrents"],
    }.items():
        lines.append(f"def {name} : Rat × Rat := {pair(value)}")
    for name, value in {
        "referenceReading": reference_reading,
        "targetReading": target_reading,
        "fluxRatio": witness["trueDeviceFluxRatio"],
    }.items():
        lines.append(f"def {name} : Rat := {rational(value)}")
    return "\n".join([*lines, "end LocalFluxWitnessData", ""])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--lean", default="lean", help="path to the stock Lean binary")
    args = parser.parse_args()
    resolved = shutil.which(args.lean)
    if resolved is None:
        parser.error(f"Lean executable not found: {args.lean}")
    lean = Path(resolved).absolute()
    raw = WITNESS.read_bytes()
    witness = json.loads(raw, parse_float=Decimal)["numericalCounterexample"]
    print(f"Witness SHA-256 {hashlib.sha256(raw).hexdigest()}", flush=True)

    with tempfile.TemporaryDirectory(prefix="local-flux-lean-") as temporary:
        build = Path(temporary)
        (build / "LocalFluxWitnessData.lean").write_text(witness_module(witness), encoding="utf-8")
        env = dict(os.environ, LEAN_PATH=str(build))

        def invoke(*arguments):
            result = subprocess.run([lean, *arguments], cwd=build, env=env,
                                    stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            if result.returncode:
                raise SystemExit(result.stdout)
            return result.stdout

        print(invoke("--version").strip(), flush=True)
        for source in ("LocalFlux.lean", "LocalFluxWitness.lean", "LocalFluxAudit.lean"):
            shutil.copyfile(ROOT / "verification/lean" / source, build / source)
        for name in ("LocalFlux", "LocalFluxWitnessData", "LocalFluxWitness"):
            print(invoke("-DwarningAsError=true", "-o", f"{name}.olean", f"{name}.lean"), end="")

        report = invoke("-DwarningAsError=true", "LocalFluxAudit.lean")
        print(report, end="")
        expected = re.findall(r"^#print axioms (\S+)$", (build / "LocalFluxAudit.lean").read_text(), re.M)
        declarations = []
        for line in report.splitlines():
            match = re.fullmatch(r"'([^']+)' (?:depends on axioms: \[([^\]]*)\]|does not depend on any axioms)", line)
            if match is None:
                raise ValueError(f"Unexpected audit output: {line}")
            declaration, axioms = match.groups()
            declarations.append(declaration)
            if axioms and not set(axioms.split(", ")) <= STANDARD_AXIOMS:
                raise ValueError(f"Unexpected axiom dependency for {declaration}: {axioms}")
        if declarations != expected:
            raise ValueError(f"Unexpected audit declarations: {declarations}")


if __name__ == "__main__":
    main()
