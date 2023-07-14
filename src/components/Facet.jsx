import PropTypes from "prop-types";

import { FacetValue } from "./FacetValue";

export const Facet = ({ facet, onToggleFacetValue }) => {
  return (
    <>
      <div>{facet.displayName}</div>
      <ul>
        {facet.facetValues.map((facetValue) => (
          <li key={`${facet.name}-${facetValue.key}`}>
            <FacetValue
              facet={facet}
              facetValue={facetValue}
              onToggleFacetValue={onToggleFacetValue}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

Facet.propTypes = {
  facet: PropTypes.object.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
  // onResetFacet: PropTypes.func.isRequired,
};
