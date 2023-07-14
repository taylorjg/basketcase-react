import PropTypes from "prop-types";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { FacetValue } from "./FacetValue";
import { StyledFacet } from "./Facet.styles";

export const Facet = ({ facet, onResetFacet, onToggleFacetValue }) => {
  return (
    <>
      <StyledFacet>
        {facet.displayName}
        <DeleteOutlinedIcon onClick={() => onResetFacet(facet.name)} />
      </StyledFacet>
      <ul>
        {facet.facetValues.map((facetValue) => (
          <li key={`${facet.name}-${facetValue.key}`}>
            <FacetValue
              facet={facet}
              facetValue={facetValue}
              onToggleFacetValue={onToggleFacetValue}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

Facet.propTypes = {
  facet: PropTypes.object.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
