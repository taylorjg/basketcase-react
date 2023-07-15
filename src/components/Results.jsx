import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import { useIsActive } from "@app/hooks/use-is-active";

import { StyledResults } from "./Results.styles";

export const Results = ({ current, total }) => {
  const isActive = useIsActive();

  if (isActive) return null;

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
