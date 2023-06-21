import PropTypes from "prop-types";

export const Product = ({ product }) => {
  const pos = product.Image.lastIndexOf("/");
  const imageName = product.Image.substring(pos + 1);
  const productImageUrl = `assets/product-images/${imageName}`;

  const brandName = product.Brand.toLowerCase();
  const brandImageUrl = `assets/brand-images/${brandName}.png`;

  return (
    <div>
      <img src={productImageUrl} />
      <img src={brandImageUrl} />
      <div>&pound;{product.Price}</div>
      <div>{product.FullTitle}</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
