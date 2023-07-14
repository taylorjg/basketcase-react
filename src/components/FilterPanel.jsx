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
  return (
    <StyledFilterPanel>
      <StyledFilterPanelHeader>
        <Typography variant="subtitle1" gutterBottom>
          Filters
        </Typography>
        <CloseIcon onClick={onClose} />
      </StyledFilterPanelHeader>
      <Divider />
      <StyledResetAll>
        <DeleteOutlinedIcon onClick={onResetAllFacets} />
      </StyledResetAll>
      <ul>
        {facets.map((facet) => (
          <li key={facet.name}>
            <Facet
              facet={facet}
              onResetFacet={onResetFacet}
              onToggleFacetValue={onToggleFacetValue}
            />
          </li>
        ))}
      </ul>
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
