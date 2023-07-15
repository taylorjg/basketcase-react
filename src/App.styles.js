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
  justify-content: flex-end;
  align-items: center;
`;

export const StyledFilterAndSortBy = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;
