import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Drawer } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { FilterPanel } from "./FilterPanel";

export const FilterButton = ({ facets, onResetAllFacets, onResetFacet, onToggleFacetValue }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer} variant="outlined" size="small" startIcon={<FilterAltIcon />}>
        Filter
      </Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
        <FilterPanel
          facets={facets}
          onClose={closeDrawer}
          onResetAllFacets={onResetAllFacets}
          onResetFacet={onResetFacet}
          onToggleFacetValue={onToggleFacetValue}
        />
      </Drawer>
    </>
  );
};

FilterButton.propTypes = {
  facets: PropTypes.array.isRequired,
  onResetAllFacets: PropTypes.func.isRequired,
  onResetFacet: PropTypes.func.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
