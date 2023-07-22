import styled from "@emotion/styled";

export const StyledPageHeader = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const StyledPageHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledLogo = styled.img`
  height: 2.5rem;
  cursor: pointer;
`;
