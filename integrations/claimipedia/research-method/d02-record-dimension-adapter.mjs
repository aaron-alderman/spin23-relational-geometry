export const recordDimension = {
  mass: 0,
  length: 0,
  time: 0,
  current: 0,
  temperature: 0,
  amount: 0,
  luminousIntensity: 0,
};

export function withRecordDimensions(graph) {
  const objectDimensions = new Map(graph.objects.map(object => [object.id, { ...recordDimension }]));
  return {
    objects: graph.objects.map(object => ({ ...object, dimension: { ...recordDimension } })),
    transformations: graph.transformations.map(transformation => ({
      ...transformation,
      fromDimension: { ...objectDimensions.get(transformation.from) },
      toDimension: { ...objectDimensions.get(transformation.to) },
      dimensionRule: "si-base-exponent-delta",
      dimensionDelta: { ...recordDimension },
    })),
  };
}

export function legacyV1Projection(graph) {
  return {
    objects: graph.objects.map(({ dimension: _dimension, ...object }) => object),
    transformations: graph.transformations.map(({ fromDimension: _fromDimension, toDimension: _toDimension, dimensionRule: _dimensionRule, dimensionDelta: _dimensionDelta, ...transformation }) => transformation),
  };
}

export const legacyDimensionAdapter = {
  from: "scientific-derivation-composition/common-algebra-2",
  to: "scientific-derivation-composition/1",
  operation: "erase-dimension-metadata-for-legacy-host",
  loss: "The live v1 receipt does not certify SI-dimension consistency; common-algebra-2 is checked separately against the unprojected source graph.",
};
