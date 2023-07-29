import PropTypes from "prop-types";
import { Divider, IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { FacetValue } from "./FacetValue";
import { StyledFacet, StyledFacetHeader } from "./Facet.styles";

export const Facet = ({ facet, onResetFacet, onToggleFacetValue }) => {
  const hasSelectedFacetValues = facet.facetValues.some(({ selected }) => selected);

  return (
    <StyledFacet>
      <StyledFacetHeader>
        <Typography variant="subtitle1">{facet.displayName}</Typography>
        {hasSelectedFacetValues && (
          <IconButton onClick={() => onResetFacet(facet.name)} color="error">
            <DeleteOutlinedIcon titleAccess={`Clear ${facet.displayName}`} />
          </IconButton>
        )}
      </StyledFacetHeader>
      {facet.facetValues.map((facetValue) => (
        <FacetValue
          key={`${facet.name}-${facetValue.altKey}`}
          facet={facet}
          facetValue={facetValue}
          onToggleFacetValue={onToggleFacetValue}
        />
      ))}
      <Divider />
    </StyledFacet>
  );
};

Facet.propTypes = {
  facet: PropTypes.object.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
