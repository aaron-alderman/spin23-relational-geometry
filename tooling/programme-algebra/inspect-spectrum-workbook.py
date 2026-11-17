"""Describe spreadsheet structure without exposing the spectral values."""

import collections
import hashlib
import json
import pathlib
import re
import sys
import xml.etree.ElementTree as ET
import zipfile


def describe(path):
    with zipfile.ZipFile(path) as archive:
        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        tabs = [sheet.get("name") for sheet in workbook.findall(".//{*}sheet")]
        strings = ET.fromstring(archive.read("xl/sharedStrings.xml"))
        labels = ["".join(part.text or "" for part in item.findall(".//{*}t")) for item in strings]
        sheets = []
        for name in sorted(archive.namelist()):
            if not re.fullmatch(r"xl/worksheets/sheet\d+\.xml", name):
                continue
            worksheet = ET.fromstring(archive.read(name))
            cells = worksheet.findall(".//{*}c")
            populated = collections.Counter(
                re.match(r"[A-Z]+", cell.get("r")).group()
                for cell in cells if cell.find("{*}v") is not None
            )
            headers = {
                cell.get("r"): labels[int(cell.find("{*}v").text)]
                for cell in cells if cell.get("r") in ("A1", "B1") and cell.get("t") == "s"
            }
            sheets.append({
                "dimension": worksheet.find("{*}dimension").get("ref"),
                "headerLabels": headers,
                "populatedCellsByColumn": dict(populated),
                "formulaCells": len(worksheet.findall(".//{*}f")),
            })
    return {
        "filename": path.name,
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "tabs": tabs,
        "sheets": sheets,
    }


if __name__ == "__main__":
    print(json.dumps([describe(pathlib.Path(arg)) for arg in sys.argv[1:]], indent=2))
