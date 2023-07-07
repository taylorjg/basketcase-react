import styled from "@emotion/styled";

export const StyledNetworkActivityProgressBar = styled.div`
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;
