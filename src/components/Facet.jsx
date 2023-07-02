import PropTypes from "prop-types";

import { FacetValue } from "./FacetValue";

export const Facet = ({ facet }) => {
  return (
    <>
      <div>{facet.displayName}</div>
      <ul>
        {facet.facetValues.map((facetValue, index) => (
          <li key={index}>
            <FacetValue facetValue={facetValue} />
          </li>
        ))}
      </ul>
    </>
  );
};

Facet.propTypes = {
  facet: PropTypes.object.isRequired,
};
