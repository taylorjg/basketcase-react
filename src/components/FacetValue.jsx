import PropTypes from "prop-types";

export const FacetValue = ({ facetValue }) => {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: facetValue.displayName }}></span>{" "}
      <span>({facetValue.count})</span>
    </div>
  );
};

FacetValue.propTypes = {
  facetValue: PropTypes.object.isRequired,
};
