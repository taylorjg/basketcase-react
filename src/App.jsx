import { useEffect, useRef, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useMediaQuery, useTheme } from "@mui/material";

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

import { LayoutBig } from "./LayoutBig";
import { LayoutSmall } from "./LayoutSmall";
import { StyledContainer } from "./App.styles";

export const App = () => {
  const { showError } = useToast();
  const [searchOptions, setSearchOptions] = useUrlState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef(null);
  const isActive = useIsActive();

  const theme = useTheme();
  const mdOrBigger = useMediaQuery(theme.breakpoints.up("md"));

  const changeFacets = (fn) => {
    const newFacets = fn(facets);
    setFacets(newFacets);
    setCurrentPage(1);
    setSearchOptions((currentSearchOptions) => {
      return {
        ...currentSearchOptions,
        ...updatedFacets(newFacets),
      };
    });
  };

  const onResetAllFacets = () => {
    changeFacets((facets) => resetAllFacets(facets));
  };

  const onResetFacet = (name) => {
    changeFacets((facets) => resetFacet(facets, name));
  };

  const onResetFacetValue = (name, key) => {
    changeFacets((facets) => resetFacetValue(facets, name, key));
  };

  const onToggleFacetValue = (name, key) => {
    changeFacets((facets) => toggleFacetValue(facets, name, key));
  };

  const onSearchSuccess = (data) => {
    setProducts((currentProducts) => [...currentProducts, ...data.products]);
    setTotal(data.total);
    setFacets(data.facets);
  };

  const onSearchError = (error) => {
    setProducts([]);
    setTotal(0);
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
      window.scrollTo(0, 0);
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
        if (entries.length === 1 && entries[0].isIntersecting) {
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
  }, [isActive, products.length, total]);

  const searchText = searchOptions.searchText ?? "";
  const sortBy = searchOptions.sortBy ?? DEFAULT_SORT_BY;

  const layoutProps = {
    searchText,
    sortBy,
    products,
    total,
    facets,
    onReset,
    onResetAllFacets,
    onResetFacet,
    onResetFacetValue,
    onToggleFacetValue,
    onChangeSearchText,
    onChangeSortBy,
  };

  const maxWidth = mdOrBigger ? "md" : "xs";
  const Layout = mdOrBigger ? LayoutBig : LayoutSmall;

  return (
    <StyledContainer maxWidth={maxWidth}>
      <Layout {...layoutProps} />
      <div ref={observerTarget} />
    </StyledContainer>
  );
};
