import PropTypes from "prop-types";
import { Chip } from "@mui/material";

import { StyledAppliedFilters } from "./AppliedFilters.styles";

export const AppliedFilters = ({ facets, onResetFacetValue }) => {
  return (
    <StyledAppliedFilters>
      {facets.flatMap((facet) =>
        facet.facetValues.map(
          (facetValue) =>
            facetValue.selected && (
              <Chip
                key={`applied-filter-${facet.name}-${facetValue.altKey}`}
                label={facetValue.displayName}
                onDelete={() => onResetFacetValue(facet.name, facetValue.altKey)}
              />
            )
        )
      )}
    </StyledAppliedFilters>
  );
};

AppliedFilters.propTypes = {
  facets: PropTypes.array.isRequired,
  onResetFacetValue: PropTypes.func.isRequired,
};
