import PropTypes from "prop-types";

export const Product = ({ product }) => {
  return <pre>{JSON.stringify(product, null, 2)}</pre>;
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
