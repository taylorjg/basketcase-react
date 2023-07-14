import styled from "@emotion/styled";

export const StyledFilterPanel = styled.div`
  width: 300px;
`;

export const StyledFilterPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0.5rem 0.5rem 1rem;
  svg {
    cursor: pointer;
  }
`;

export const StyledResetAll = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 0.5rem);
`;
