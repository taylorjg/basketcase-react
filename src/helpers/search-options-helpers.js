export const SORT_BY_PRICE_LOW_TO_HIGH = "price-low-to-high";
export const SORT_BY_PRICE_HIGH_TO_LOW = "price-high-to-low";
export const SORT_BY_AVERAGE_RATING = "average-rating";
export const SORT_BY_REVIEW_COUNT = "review-count";

export const DEFAULT_SORT_BY = SORT_BY_PRICE_LOW_TO_HIGH;

export const updatedSortBy = (sortBy) => {
  return sortBy === DEFAULT_SORT_BY ? undefined : sortBy;
};

export const updatedSearchText = (searchText) => {
  return searchText ? searchText : undefined;
};

export const updatedFacets = (facets) => {
  const filters = facets.map((facet) => {
    const selectedFacetValues = facet.facetValues.filter(({ selected }) => selected);
    return {
      name: facet.name,
      keys: selectedFacetValues.map(({ altKey }) => altKey),
    };
  });

  const kvps = filters.map(({ name, keys }) => [name, keys]);
  const selectedFacetsDictionary = Object.fromEntries(kvps);

  return selectedFacetsDictionary;
};
