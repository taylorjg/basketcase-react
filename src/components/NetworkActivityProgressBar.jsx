import PropTypes from "prop-types";
import { LinearProgress } from "@mui/material";

import { StyledNetworkActivityProgressBar } from "./NetworkActivityProgressBar.styles";

export const NetworkActivityProgressBar = ({ isActive }) => {
  return (
    <StyledNetworkActivityProgressBar isActive={isActive}>
      <LinearProgress />
    </StyledNetworkActivityProgressBar>
  );
};

NetworkActivityProgressBar.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
