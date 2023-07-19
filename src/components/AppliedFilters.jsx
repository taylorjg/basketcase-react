import PropTypes from "prop-types";
import { Chip } from "@mui/material";

import { StyledAppliedFilters } from "./AppliedFilters.styles";

export const AppliedFilters = ({ facets, onResetFacetValue }) => {
  const onDelete = (name, key) => {
    onResetFacetValue(name, key);
  };

  return (
    <StyledAppliedFilters>
      {facets.flatMap((facet) =>
        facet.facetValues.map(
          (facetValue) =>
            facetValue.selected && (
              <Chip
                key={`applied-filter-${facet.name}-${facetValue.key}`}
                label={facetValue.displayName}
                onDelete={() => onDelete(facet.name, facetValue.key)}
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
