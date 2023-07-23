import styled from "@emotion/styled";

export const StyledResultsCount = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  opacity: ${(props) => (props.isActive ? 0.25 : 1)};
`;
