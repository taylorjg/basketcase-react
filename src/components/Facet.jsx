import PropTypes from "prop-types";
import { Divider, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { FacetValue } from "./FacetValue";
import { StyledFacet, StyledFacetHeader } from "./Facet.styles";

export const Facet = ({ facet, onResetFacet, onToggleFacetValue }) => {
  const hasSelectedFacetValues = facet.facetValues.some(({ selected }) => selected);

  return (
    <StyledFacet>
      <StyledFacetHeader>
        <Typography variant="subtitle1">{facet.displayName}</Typography>
        <DeleteOutlinedIcon
          onClick={() => onResetFacet(facet.name)}
          titleAccess={`Clear ${facet.displayName}`}
          style={{ visibility: hasSelectedFacetValues ? "visible" : "hidden" }}
        />
      </StyledFacetHeader>
      {facet.facetValues.map((facetValue) => (
        <FacetValue
          key={`${facet.name}-${facetValue.key}`}
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
