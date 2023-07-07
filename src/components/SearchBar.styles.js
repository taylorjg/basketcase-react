import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

export const StyledSearchBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(128, 128, 128, 0.15);
`;

export const StyledSearchIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  width: 100%;
  padding-left: 1.5rem;
`;
