import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

import { StyledFacetValue } from "./FacetValue.styles";

export const FacetValue = ({ facet, facetValue, onToggleFacetValue }) => {
  const onClick = () => {
    onToggleFacetValue(facet.name, facetValue.key);
  };

  const label = `${facetValue.displayName} (${facetValue.count})`;

  return (
    <StyledFacetValue>
      <FormControlLabel
        control={<Checkbox size="small" checked={facetValue.selected} onClick={onClick} />}
        label={<Typography variant="subtitle2" dangerouslySetInnerHTML={{ __html: label }} />}
        labelPlacement="end"
      />
    </StyledFacetValue>
  );
};

FacetValue.propTypes = {
  facet: PropTypes.object.isRequired,
  facetValue: PropTypes.object.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
