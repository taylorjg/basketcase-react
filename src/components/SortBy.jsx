import PropTypes from "prop-types";
import { MenuItem, Select } from "@mui/material";

export const SortBy = ({ sortBy, onChange }) => {
  return (
    <Select
      fullWidth
      size="small"
      aria-label="Sort By"
      value={sortBy}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <MenuItem value={0}>Price low to high</MenuItem>
      <MenuItem value={1}>Price high to low</MenuItem>
      <MenuItem value={2}>Average rating</MenuItem>
      <MenuItem value={3}>Review count</MenuItem>
    </Select>
  );
};

SortBy.propTypes = {
  sortBy: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
