const DEFAULT_SORT_BY = 0;

export const sortByAsNumber = (sortBy) => {
  return Number(sortBy ?? DEFAULT_SORT_BY);
};

export const updatedSortBy = (sortBy) => {
  const sortByAsNumber = Number(sortBy);
  return sortByAsNumber === DEFAULT_SORT_BY ? undefined : sortByAsNumber;
};

export const updatedSearchText = (searchText) => {
  return searchText ? searchText : undefined;
};

export const updatedFacets = (facets) => {
  const filters = facets.map((facet) => {
    const selectedFacetValues = facet.facetValues.filter(({ selected }) => selected);
    return {
      name: facet.name,
      keys: selectedFacetValues.map(({ key }) => key),
    };
  });

  const kvps = filters.map(({ name, keys }) => [name, keys]);
  const selectedFacetsDictionary = Object.fromEntries(kvps);

  return selectedFacetsDictionary;
};
