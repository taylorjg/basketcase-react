import { Fragment } from "react";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";

import { Product } from "./Product";

export const Products = ({ products }) => {
  const lastIndex = products.length - 1;

  return products.map((product, index) => (
    <Fragment key={product.Code}>
      <Product product={product} />
      {index < lastIndex && <Divider />}
    </Fragment>
  ));
};

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
