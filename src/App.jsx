import { useCallback, useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useMediaQuery, useTheme } from "@mui/material";

import { useAnalytics } from "@app/hooks/use-analytics";
import { useInfiniteScroll } from "@app/hooks/use-infinite-scroll";
import { useIsActive } from "@app/hooks/use-is-active";
import { useLazySearch } from "@app/hooks/use-search";
import { useToast } from "@app/hooks/use-toast";

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
  const { sendAnalyticsClickEvent } = useAnalytics();
  const { showError } = useToast();
  const [searchOptions, setSearchOptions] = useUrlState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    sendAnalyticsClickEvent("reset_all_facets");
  };

  const onResetFacet = (name) => {
    changeFacets((facets) => resetFacet(facets, name));
    sendAnalyticsClickEvent("reset_facet", { facet: name });
  };

  const onResetFacetValue = (name, key) => {
    changeFacets((facets) => resetFacetValue(facets, name, key));
    sendAnalyticsClickEvent("reset_facet_value", {
      facet: name,
      facet_value: key,
      facet_and_value: `${name}:${key}`,
    });
  };

  const onToggleFacetValue = (name, key) => {
    changeFacets((facets) => toggleFacetValue(facets, name, key));
    sendAnalyticsClickEvent("toggle_facet_value", {
      facet: name,
      facet_value: key,
      facet_and_value: `${name}:${key}`,
    });
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
    sendAnalyticsClickEvent("change_sort_by", { sort_by: sortBy });
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
    sendAnalyticsClickEvent("logo_click");
  };

  const infiniteScrollCallback = useCallback(() => {
    if (products.length < total && !isActive) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }, [isActive, products, total]);

  const infiniteScrollTargetRef = useInfiniteScroll(infiniteScrollCallback);

  useEffect(() => {
    if (currentPage > 1) {
      sendAnalyticsClickEvent("infinite_scroll", { current_page: currentPage });
    }
  }, [currentPage, sendAnalyticsClickEvent]);

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
      <div ref={infiniteScrollTargetRef} />
    </StyledContainer>
  );
};
