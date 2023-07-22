import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  position: relative;
  margin: 0 auto !important;
  padding: 8px !important;
`;

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

export const StyledFilterAndSortBy = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;

export const StyledLayoutBig = styled.div`
  display: flex;
`;
