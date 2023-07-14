import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Radio, Typography } from "@mui/material";

import { StyledFacetValue } from "./FacetValue.styles";

export const FacetValue = ({ facet, facetValue, onToggleFacetValue }) => {
  const onClick = () => {
    onToggleFacetValue(facet.name, facetValue.key);
  };

  const label = `${facetValue.displayName} (${facetValue.count})`;

  const isSingle = facet.type === "single";

  return (
    <StyledFacetValue>
      <FormControlLabel
        control={
          isSingle ? (
            <Radio size="small" checked={facetValue.selected} onClick={onClick} />
          ) : (
            <Checkbox size="small" checked={facetValue.selected} onClick={onClick} />
          )
        }
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
