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
      <MenuItem value={"price-low-to-high"}>Price low to high</MenuItem>
      <MenuItem value={"price-high-to-low"}>Price high to low</MenuItem>
      <MenuItem value={"average-rating"}>Average rating</MenuItem>
      <MenuItem value={"review-count"}>Review count</MenuItem>
    </Select>
  );
};

SortBy.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
