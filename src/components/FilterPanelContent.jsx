import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { Facet } from "./Facet";
import { StyledResetAll } from "./FilterPanelContent.styles";

export const FilterPanelContent = ({
  facets,
  onResetAllFacets,
  onResetFacet,
  onToggleFacetValue,
}) => {
  const hasFacetsWithSelectedFacetValues = facets.some((facet) =>
    facet.facetValues.some(({ selected }) => selected)
  );

  return (
    <>
      {hasFacetsWithSelectedFacetValues && (
        <StyledResetAll>
          <IconButton onClick={onResetAllFacets} color="error">
            <DeleteOutlinedIcon titleAccess="Clear All" />
          </IconButton>
        </StyledResetAll>
      )}
      {facets.map((facet) => (
        <Facet
          key={facet.name}
          facet={facet}
          onResetFacet={onResetFacet}
          onToggleFacetValue={onToggleFacetValue}
        />
      ))}
    </>
  );
};

FilterPanelContent.propTypes = {
  facets: PropTypes.array.isRequired,
  onResetAllFacets: PropTypes.func.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
