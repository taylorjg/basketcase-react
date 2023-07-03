import { LinearProgress } from "@mui/material";

import { useIsActive } from "@app/hooks/use-is-active";

import { StyledNetworkActivityProgressBar } from "./NetworkActivityProgressBar.styles";

export const NetworkActivityProgressBar = () => {
  const isActive = useIsActive();

  return (
    <StyledNetworkActivityProgressBar isActive={isActive}>
      <LinearProgress />
    </StyledNetworkActivityProgressBar>
  );
};
