export function cornerProbes(archive, bart, lorax) {
  function variant(label, mutate) {
    const example = structuredClone(bart);
    example.id += "-" + label;
    mutate(example.facts);
    return { label, example };
  }

  return [
    { label: "BART", example: bart, priorAdmission: archive.runs.BART.composed.stdout },
    variant("shifted-nominal", facts => { facts.detector.probability = 0.001606; }),
    { label: "LORAX", example: lorax, priorAdmission: archive.runs.LORAX.composed.stdout },
    variant("shorter-window", facts => { facts.timeSeconds *= 0.98; }),
    variant("higher-competing-rate", facts => { facts.calibrationBox.relativeRates["gamma-136.47-keV"][1] *= 1.02; }),
    variant("incompatible-acquisition", facts => { facts.detector.eventSelection = "unmatched-selection"; }),
    variant("dependent-preparations", facts => { facts.trials.type = "dependent-preparations"; })
  ];
}
