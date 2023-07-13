import PropTypes from "prop-types";
import { Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Facet } from "./Facet";
import { StyledFilterPanel, StyledFilterPanelHeader } from "./FilterPanel.styles";

export const FilterPanel = ({ facets, onClose }) => {
  return (
    <StyledFilterPanel>
      <StyledFilterPanelHeader>
        <Typography variant="subtitle1" gutterBottom>
          Filters
        </Typography>
        <CloseIcon onClick={onClose} />
      </StyledFilterPanelHeader>
      <Divider />
      <ul>
        {facets.map((facet) => (
          <li key={facet.name}>
            <Facet facet={facet} />
          </li>
        ))}
      </ul>
    </StyledFilterPanel>
  );
};

FilterPanel.propTypes = {
  facets: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
