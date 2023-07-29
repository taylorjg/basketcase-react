export const resetFacetValue = (facets, name, altKey) =>
  facets.map((facet) => (facet.name === name ? resetFacetValueInternal(facet, altKey) : facet));

const resetFacetValueInternal = (facet, altKey) => ({
  ...facet,
  facetValues: facet.facetValues.map((facetValue) =>
    facetValue.altKey === altKey
      ? {
          ...facetValue,
          selected: false,
        }
      : facetValue
  ),
});

export const resetFacet = (facets, name) =>
  facets.map((facet) => (facet.name === name ? resetFacetInternal(facet) : facet));

export const resetAllFacets = (facets) => facets.map(resetFacetInternal);

const resetFacetInternal = (facet) => ({
  ...facet,
  facetValues: facet.facetValues.map((facetValue) => ({
    ...facetValue,
    selected: false,
  })),
});

export const toggleFacetValue = (facets, name, altKey) =>
  facets.map((facet) => {
    if (facet.name !== name) return facet;
    return {
      ...facet,
      facetValues: facet.facetValues.map((facetValue) => {
        if (facetValue.altKey !== altKey) {
          if (facet.type === "single") {
            return {
              ...facetValue,
              selected: false,
            };
          }
          return facetValue;
        }
        return {
          ...facetValue,
          selected: !facetValue.selected,
        };
      }),
    };
  });
