import { useEffect, useState } from "react";

import { useSearch, useLazySearch } from "@app/hooks/use-search";
import { useIsActive } from "@app/hooks/use-is-active";
import { useToast } from "@app/hooks/use-toast";

import { FilterButton } from "@app/components/FilterButton";
import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Product } from "@app/components/Product";
import { SortBy } from "@app/components/SortBy";
import { Version } from "@app/components/Version";

import { StyledContainer, StyledFilterAndSortBy } from "./App.styles";

export const App = () => {
  const { showError } = useToast();
  const [searchOptions, setSearchOptions] = useState({ sortBy: 0 });
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);

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

  // Initial query
  useSearch(searchOptions, options);

  // On-demand queries
  const { search } = useLazySearch(options);

  useEffect(() => {
    console.log("[useEffect searchOptions]");
    search(searchOptions);
  }, [search, searchOptions]);

  const isActive = useIsActive();

  const onChangeSortBy = (sortBy) => {
    setSearchOptions((currentSearchOptions) => ({
      ...currentSearchOptions,
      sortBy,
    }));
  };

  return (
    <StyledContainer maxWidth="xs">
      <Version />
      <NetworkActivityProgressBar isActive={isActive} />
      <StyledFilterAndSortBy>
        <FilterButton facets={facets} />
        <SortBy sortBy={searchOptions.sortBy} onChange={onChangeSortBy} />
      </StyledFilterAndSortBy>
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </StyledContainer>
  );
};
