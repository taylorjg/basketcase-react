import { useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";

import { useLazySearch } from "@app/hooks/use-search";
import { useToast } from "@app/hooks/use-toast";

import { FilterButton } from "@app/components/FilterButton";
import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Product } from "@app/components/Product";
import { SearchBar } from "@app/components/SearchBar";
import { SortBy } from "@app/components/SortBy";
import { Version } from "@app/components/Version";

import {
  sortByAsNumber,
  updatedFacets,
  updatedSortBy,
  updatedSearchText,
} from "./searchOptionsUtils";
import { resetAllFacets, resetFacet, toggleFacetValue } from "./facetTwiddling";
import {
  StyledContainer,
  StyledFilterAndSortBy,
  StyledPageHeader,
  StyledPageHeaderTop,
} from "./App.styles";

export const App = () => {
  const { showError } = useToast();
  const [searchOptions, setSearchOptions] = useUrlState({
    sortBy: undefined,
  });
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);

  const onResetAllFacets = () => {
    const newFacets = resetAllFacets(facets);
    setFacets(newFacets);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onResetFacet = (name) => {
    const newFacets = resetFacet(facets, name);
    setFacets(newFacets);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onToggleFacetValue = (name, key) => {
    const newFacets = toggleFacetValue(facets, name, key);
    setFacets(newFacets);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onSearchSuccess = (data) => {
    setProducts(data.products);
    setFacets(data.facets);
  };

  const onSearchError = (error) => {
    setProducts([]);
    setFacets([]);
    showError(`Failed to load products: ${error.message}`);
  };

  const options = {
    onSuccess: onSearchSuccess,
    onError: onSearchError,
  };

  const { search } = useLazySearch(options);

  useEffect(() => {
    search(searchOptions);
  }, [search, searchOptions]);

  const onChangeSortBy = (sortBy) => {
    setSearchOptions((currentSearchOptions) => ({
      ...currentSearchOptions,
      sortBy: updatedSortBy(sortBy),
    }));
  };

  const onChangeSearchText = (searchText) => {
    setSearchOptions((currentSearchOptions) => ({
      ...currentSearchOptions,
      searchText: updatedSearchText(searchText),
    }));
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledPageHeader>
        <StyledPageHeaderTop>
          <Version />
        </StyledPageHeaderTop>
        <SearchBar onChange={onChangeSearchText} />
        <StyledFilterAndSortBy>
          <FilterButton
            facets={facets}
            onResetAllFacets={onResetAllFacets}
            onResetFacet={onResetFacet}
            onToggleFacetValue={onToggleFacetValue}
          />
          <SortBy sortBy={sortByAsNumber(searchOptions.sortBy)} onChange={onChangeSortBy} />
        </StyledFilterAndSortBy>
        <NetworkActivityProgressBar />
      </StyledPageHeader>
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </StyledContainer>
  );
};
