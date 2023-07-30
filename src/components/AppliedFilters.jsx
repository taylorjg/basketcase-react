import PropTypes from "prop-types";
import { Chip } from "@mui/material";

import { applyQuotesIfNecessary } from "@app/helpers/string-helpers";

import { StyledAppliedFilters } from "./AppliedFilters.styles";

export const AppliedFilters = ({ facets, onResetFacetValue }) => {
  return (
    <StyledAppliedFilters>
      {facets.flatMap((facet) =>
        facet.facetValues.map((facetValue) => {
          const value = applyQuotesIfNecessary(facetValue.displayName);
          const facet = applyQuotesIfNecessary(facet.displayName);
          const title = `Click the cross to remove the ${value} value from the ${facet} facet`;
          return (
            facetValue.selected && (
              <Chip
                key={`applied-filter-${facet.name}-${facetValue.altKey}`}
                label={facetValue.displayName}
                onDelete={() => onResetFacetValue(facet.name, facetValue.altKey)}
                title={title}
              />
            )
          );
        })
      )}
    </StyledAppliedFilters>
  );
};

AppliedFilters.propTypes = {
  facets: PropTypes.array.isRequired,
  onResetFacetValue: PropTypes.func.isRequired,
};
