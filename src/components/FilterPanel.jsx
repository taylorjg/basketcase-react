import PropTypes from "prop-types";
import { Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { Facet } from "./Facet";
import { StyledFilterPanel, StyledFilterPanelHeader, StyledResetAll } from "./FilterPanel.styles";

export const FilterPanel = ({
  facets,
  onClose,
  onResetAllFacets,
  onResetFacet,
  onToggleFacetValue,
}) => {
  const hasFacetsWithSelectedFacetValues = facets.some((facet) =>
    facet.facetValues.some(({ selected }) => selected)
  );

  return (
    <StyledFilterPanel>
      <StyledFilterPanelHeader>
        <Typography variant="h6">Filters</Typography>
        <CloseIcon onClick={onClose} />
      </StyledFilterPanelHeader>
      <Divider />
      {hasFacetsWithSelectedFacetValues && (
        <StyledResetAll>
          <DeleteOutlinedIcon onClick={onResetAllFacets} titleAccess="Clear All" />
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
    </StyledFilterPanel>
  );
};

FilterPanel.propTypes = {
  facets: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onResetAllFacets: PropTypes.func.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
