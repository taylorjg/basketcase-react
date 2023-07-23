import PropTypes from "prop-types";

import { AppliedFilters } from "@app/components/AppliedFilters";
import { FilterButton } from "@app/components/FilterButton";
import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Products } from "@app/components/Products";
import { ResultsCount } from "@app/components/ResultsCount";
import { SearchBar } from "@app/components/SearchBar";
import { SortBy } from "@app/components/SortBy";
import { Version } from "@app/components/Version";

import { StyledLogo, StyledPageHeader, StyledPageHeaderTop } from "./LayoutCommon.styles";
import { StyledFilterButtonAndSortByRow } from "./LayoutSmall.styles";

export const LayoutSmall = ({
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
        <SearchBar searchText={searchText} onChange={onChangeSearchText} />
        <AppliedFilters facets={facets} onResetFacetValue={onResetFacetValue} />
        <StyledFilterButtonAndSortByRow>
          <FilterButton
            facets={facets}
            onResetAllFacets={onResetAllFacets}
            onResetFacet={onResetFacet}
            onToggleFacetValue={onToggleFacetValue}
          />
          <SortBy sortBy={sortBy} onChange={onChangeSortBy} />
        </StyledFilterButtonAndSortByRow>
        <ResultsCount current={products.length} total={total} />
      </StyledPageHeader>
      <Products products={products} />
    </>
  );
};

LayoutSmall.propTypes = {
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
