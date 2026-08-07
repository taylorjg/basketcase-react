import PropTypes from "prop-types";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { StyledSearchBar, StyledInputBase } from "./SearchBar.styles";

export const SearchBar = ({ searchText, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const onClear = () => {
    if (searchText) {
      onChange("");
    }
  };

  return (
    <StyledSearchBar>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchText}
        onChange={handleChange}
        startAdornment={<SearchIcon />}
        endAdornment={
          <IconButton onClick={onClear}>
            <CloseIcon />
          </IconButton>
        }
      />
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
