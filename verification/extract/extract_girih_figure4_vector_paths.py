"""Extract checksum-guarded red/blue vector-path summaries from Lu--Steinhardt Figure 4.

This is a source-inspection utility, not a geometric interpretation.  It reads page 6
of the authors' PDF, records filled paths in the two ribbon colours, and emits JSON.
Coordinates are native PDF points with origin at the lower-left of the page.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path

from pypdf import PdfReader


EXPECTED_SHA256 = "7D6BFA0A729C22E845699F0E6A8778ABA04D511BA8C1CF83C26186C2EEBD97CA"
BLUE = ("0.243", "0.302", "0.62")
RED = ("0.816", "0.11", "0.086")
PURPLE = ("0.482", "0.176", "0.678")
YELLOW = ("0.961", "0.878", "0")
BLACK = ("0.055", "0.063", "0.055")
COLOUR_NAMES = {BLUE: "blue", RED: "red", PURPLE: "purple", YELLOW: "yellow", BLACK: "black"}


def decimal_tuple(values):
    return tuple(str(value) for value in values)


def add_xy(points, values):
    numbers = [float(value) for value in values]
    for index in range(0, len(numbers) - 1, 2):
        points.append((numbers[index], numbers[index + 1]))


def bbox(points):
    xs = [point[0] for point in points]
    ys = [point[1] for point in points]
    return [min(xs), min(ys), max(xs), max(ys)]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--allow-checksum-mismatch", action="store_true")
    args = parser.parse_args()

    source_bytes = args.pdf.read_bytes()
    digest = hashlib.sha256(source_bytes).hexdigest().upper()
    if digest != EXPECTED_SHA256 and not args.allow_checksum_mismatch:
        raise SystemExit(f"unexpected source checksum: {digest}")

    page = PdfReader(args.pdf).pages[5]
    operations = page.get_contents().operations
    current_colour = None
    points = []
    path_ops = Counter()
    records = []

    path_operators = {b"m", b"l", b"c", b"v", b"y", b"re"}
    paint_operators = {b"f", b"F", b"f*", b"B", b"B*", b"b", b"b*"}
    clear_operators = paint_operators | {b"S", b"s", b"n"}

    for index, (operands, operator) in enumerate(operations):
        if operator in {b"scn", b"rg"}:
            current_colour = decimal_tuple(operands)
        elif operator == b"g":
            value = str(operands[0])
            current_colour = (value, value, value)

        if operator in path_operators:
            path_ops[operator.decode("ascii")] += 1
            if operator == b"re":
                x, y, width, height = [float(value) for value in operands]
                points.extend([(x, y), (x + width, y), (x + width, y + height), (x, y + height)])
            else:
                add_xy(points, operands)

        if operator in paint_operators and points and current_colour in COLOUR_NAMES:
            records.append(
                {
                    "operationIndex": index,
                    "colour": COLOUR_NAMES[current_colour],
                    "bbox": bbox(points),
                    "coordinateCount": len(points),
                    "pathOperations": dict(path_ops),
                }
            )

        if operator in clear_operators:
            points = []
            path_ops = Counter()

    result = {
        "schema": "girih-figure4-vector-path-summary/1",
        "source": str(args.pdf),
        "sha256": digest,
        "page": 6,
        "pageBox": [float(page.mediabox.width), float(page.mediabox.height)],
        "colours": {name: list(colour) for colour, name in COLOUR_NAMES.items()},
        "filledPathCount": len(records),
        "countsByColour": dict(Counter(record["colour"] for record in records)),
        "ribbonFilledPathCount": sum(record["colour"] in {"red", "blue"} for record in records),
        "annotationFilledPathCount": sum(record["colour"] in {"purple", "yellow"} for record in records),
        "structuralFilledPathCount": sum(record["colour"] == "black" for record in records),
        "paths": records,
    }
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
