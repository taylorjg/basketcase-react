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

import { StyledLayoutBig, StyledLogo, StyledPageHeader, StyledPageHeaderTop } from "./App.styles";

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
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          <div style={{ flex: 3 }}>
            <SearchBar searchText={searchText} onChange={onChangeSearchText} />
          </div>
          <div style={{ flex: 1 }}>
            <SortBy sortBy={sortBy} onChange={onChangeSortBy} />
          </div>
        </div>
        <Results current={products.length} total={total} />
      </StyledPageHeader>
      <StyledLayoutBig>
        <div style={{ flex: 1 }}>
          <FilterPanelContent
            facets={facets}
            onResetAllFacets={onResetAllFacets}
            onResetFacet={onResetFacet}
            onToggleFacetValue={onToggleFacetValue}
          />
        </div>
        <div style={{ flex: 2 }}>
          {products.map((product) => (
            <Fragment key={product.Code}>
              <Product product={product} />
              <Divider />
            </Fragment>
          ))}
        </div>
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
