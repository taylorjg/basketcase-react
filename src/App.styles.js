import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  position: relative;
  padding: 0.25rem;
  margin: 0 auto !important;
`;

export const StyledFilterAndSortBy = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;
