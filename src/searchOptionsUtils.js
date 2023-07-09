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
