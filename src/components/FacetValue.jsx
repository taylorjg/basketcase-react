import PropTypes from "prop-types";

export const FacetValue = ({ facet, facetValue, onToggleFacetValue }) => {
  const onClick = () => {
    onToggleFacetValue(facet.name, facetValue.key);
  };

  return (
    <div>
      <span
        dangerouslySetInnerHTML={{ __html: facetValue.displayName }}
        onClick={onClick}
        style={{ color: facetValue.selected ? "green" : "red" }}
      />
      <span>&nbsp;</span>
      <span>({facetValue.count})</span>
    </div>
  );
};

FacetValue.propTypes = {
  facet: PropTypes.object.isRequired,
  facetValue: PropTypes.object.isRequired,
  onToggleFacetValue: PropTypes.func.isRequired,
};
