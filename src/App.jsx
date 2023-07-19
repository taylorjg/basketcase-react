import { Fragment, useEffect, useRef, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { Divider } from "@mui/material";

import { useLazySearch } from "@app/hooks/use-search";
import { useToast } from "@app/hooks/use-toast";
import { useIsActive } from "@app/hooks/use-is-active";

import {
  updatedFacets,
  updatedSortBy,
  updatedSearchText,
  DEFAULT_SORT_BY,
} from "@app/helpers/search-options-helpers";
import {
  resetAllFacets,
  resetFacet,
  resetFacetValue,
  toggleFacetValue,
} from "@app/helpers/facet-helpers";

import { AppliedFilters } from "@app/components/AppliedFilters";
import { FilterButton } from "@app/components/FilterButton";
import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Product } from "@app/components/Product";
import { Results } from "@app/components/Results";
import { SearchBar } from "@app/components/SearchBar";
import { SortBy } from "@app/components/SortBy";
import { Version } from "@app/components/Version";

import {
  StyledContainer,
  StyledFilterAndSortBy,
  StyledLogo,
  StyledPageHeader,
  StyledPageHeaderTop,
} from "./App.styles";

export const App = () => {
  const { showError } = useToast();
  const [searchOptions, setSearchOptions] = useUrlState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef(null);
  const isActive = useIsActive();

  const onResetAllFacets = () => {
    const newFacets = resetAllFacets(facets);
    setFacets(newFacets);
    setCurrentPage(1);
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
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onResetFacetValue = (name, key) => {
    const newFacets = resetFacetValue(facets, name, key);
    setFacets(newFacets);
    setCurrentPage(1);
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
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onSearchSuccess = (data) => {
    if (currentPage === 1) {
      setProducts(data.products);
    } else {
      setProducts((currentProducts) => [...currentProducts, ...data.products]);
    }
    setTotal(data.total);
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
    if (currentPage === 1) {
      setProducts([]);
    }
    search({
      ...searchOptions,
      currentPage,
    });
  }, [search, searchOptions, currentPage]);

  const onChangeSortBy = (sortBy) => {
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => ({
      ...currentSearchOptions,
      sortBy: updatedSortBy(sortBy),
    }));
  };

  const onChangeSearchText = (searchText) => {
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => ({
      ...currentSearchOptions,
      searchText: updatedSearchText(searchText),
    }));
  };

  const onReset = () => {
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => {
      const keys = Object.keys(currentSearchOptions);
      const kvps = keys.map((key) => [key, undefined]);
      return Object.fromEntries(kvps);
    });
  };

  useEffect(() => {
    const observerTargetCurrent = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (products.length < total && !isActive) {
            setCurrentPage((currentPage) => currentPage + 1);
          }
        }
      },
      { threshold: 1 }
    );

    if (observerTargetCurrent) {
      observer.observe(observerTargetCurrent);
    }

    return () => {
      if (observerTargetCurrent) {
        observer.unobserve(observerTargetCurrent);
      }
    };
  }, [isActive, observerTarget, products.length, total]);

  return (
    <StyledContainer maxWidth="xs">
      <StyledPageHeader>
        <StyledPageHeaderTop>
          <StyledLogo src="assets/logo.png" alt="BasketCase logo" onClick={onReset} />
          <Version />
        </StyledPageHeaderTop>
        <NetworkActivityProgressBar />
        <SearchBar searchText={searchOptions.searchText ?? ""} onChange={onChangeSearchText} />
        <AppliedFilters facets={facets} onResetFacetValue={onResetFacetValue} />
        <StyledFilterAndSortBy>
          <FilterButton
            facets={facets}
            onResetAllFacets={onResetAllFacets}
            onResetFacet={onResetFacet}
            onToggleFacetValue={onToggleFacetValue}
          />
          <SortBy sortBy={searchOptions.sortBy ?? DEFAULT_SORT_BY} onChange={onChangeSortBy} />
        </StyledFilterAndSortBy>
        <Results current={products.length} total={total} />
      </StyledPageHeader>
      {products.map((product) => (
        <Fragment key={product.Code}>
          <Product product={product} />
          <Divider />
        </Fragment>
      ))}
      <div ref={observerTarget}></div>
    </StyledContainer>
  );
};
