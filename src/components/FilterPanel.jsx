import PropTypes from "prop-types";
import { Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FilterPanelContent } from "./FilterPanelContent";
import { StyledFilterPanel, StyledFilterPanelHeader } from "./FilterPanel.styles";

export const FilterPanel = ({
  facets,
  onClose,
  onResetAllFacets,
  onResetFacet,
  onToggleFacetValue,
}) => {
  return (
    <StyledFilterPanel>
      <StyledFilterPanelHeader>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledFilterPanelHeader>
      <Divider />
      <FilterPanelContent
        facets={facets}
        onResetAllFacets={onResetAllFacets}
        onResetFacet={onResetFacet}
        onToggleFacetValue={onToggleFacetValue}
      />
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
