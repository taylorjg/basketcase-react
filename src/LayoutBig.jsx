import { Fragment } from "react";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";

import { AppliedFilters } from "@app/components/AppliedFilters";
import { FilterPanelContent } from "@app/components/FilterPanelContent";
import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Product } from "@app/components/Product";
import { Results } from "@app/components/Results";
import { SearchBar } from "@app/components/SearchBar";
import { SortBy } from "@app/components/SortBy";
import { Version } from "@app/components/Version";

import { StyledLogo, StyledPageHeader, StyledPageHeaderTop } from "./LayoutCommon.styles";
import {
  StyledLayoutBig,
  StyledLayoutBigFilters,
  StyledLayoutBigResults,
  StyledSearchAndSortRow,
  StyledSearchAndSortRowLeft,
  StyledSearchAndSortRowRight,
} from "./LayoutBig.styles";

export const LayoutBig = ({
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
}) => {
  return (
    <>
      <StyledPageHeader>
        <StyledPageHeaderTop>
          <StyledLogo src="assets/logo.png" alt="BasketCase logo" onClick={onReset} />
          <Version />
        </StyledPageHeaderTop>
        <NetworkActivityProgressBar />
        <AppliedFilters facets={facets} onResetFacetValue={onResetFacetValue} />
        <StyledSearchAndSortRow>
          <StyledSearchAndSortRowLeft>
            <SearchBar searchText={searchText} onChange={onChangeSearchText} />
          </StyledSearchAndSortRowLeft>
          <StyledSearchAndSortRowRight>
            <SortBy sortBy={sortBy} onChange={onChangeSortBy} />
          </StyledSearchAndSortRowRight>
        </StyledSearchAndSortRow>
        <Results current={products.length} total={total} />
      </StyledPageHeader>
      <StyledLayoutBig>
        <StyledLayoutBigFilters>
          <FilterPanelContent
            facets={facets}
            onResetAllFacets={onResetAllFacets}
            onResetFacet={onResetFacet}
            onToggleFacetValue={onToggleFacetValue}
          />
        </StyledLayoutBigFilters>
        <StyledLayoutBigResults>
          {products.map((product) => (
            <Fragment key={product.Code}>
              <Product product={product} />
              <Divider />
            </Fragment>
          ))}
        </StyledLayoutBigResults>
      </StyledLayoutBig>
    </>
  );
};

LayoutBig.propTypes = {
  searchText: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  facets: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired,
  onResetAllFacets: PropTypes.func.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onResetFacetValue: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
  onChangeSearchText: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
};
