import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

import { StyledSearchBar, StyledSearchIconWrapper, StyledInputBase } from "./SearchBar.styles";

export const SearchBar = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledSearchBar>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
