import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import { useIsActive } from "@app/hooks/use-is-active";

import { StyledResultsCount } from "./ResultsCount.styles";

export const ResultsCount = ({ current, total }) => {
  const isActive = useIsActive();

  return (
    <StyledResultsCount isActive={isActive}>
      <Typography>
        Results: showing {current} of {total}
      </Typography>
    </StyledResultsCount>
  );
};

ResultsCount.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
