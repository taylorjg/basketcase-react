import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import { StyledResults } from "./Results.styles";

export const Results = ({ current, total }) => {
  return (
    <StyledResults>
      <Typography>
        Results: showing {current} of {total}
      </Typography>
    </StyledResults>
  );
};

Results.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
