export const resetFacetValue = (facets, name, key) =>
  facets.map((facet) => (facet.name === name ? resetFacetValueInternal(facet, key) : facet));

const resetFacetValueInternal = (facet, key) => ({
  ...facet,
  facetValues: facet.facetValues.map((facetValue) =>
    facetValue.key === key
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

export const toggleFacetValue = (facets, name, key) =>
  facets.map((facet) => {
    if (facet.name !== name) return facet;
    return {
      ...facet,
      facetValues: facet.facetValues.map((facetValue) => {
        if (facetValue.key !== key) {
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
