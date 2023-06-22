import PropTypes from "prop-types";

import {
  StyledProduct,
  StyledProductLeft,
  StyledProductCentre,
  StyledProductRight,
  StyledProductImage,
  StyledBrandImage,
  StyledProductDescription,
  StyledPrice,
} from "./Product.styles";

export const Product = ({ product }) => {
  const pos = product.Image.lastIndexOf("/");
  const imageName = product.Image.substring(pos + 1);
  const productImageUrl = `assets/product-images/${imageName}`;

  const brandName = product.Brand.toLowerCase();
  const brandImageUrl = `assets/brand-images/${brandName}.png`;

  return (
    <StyledProduct>
      <StyledProductLeft>
        <StyledProductImage src={productImageUrl} />
      </StyledProductLeft>
      <StyledProductCentre>
        <StyledBrandImage src={brandImageUrl} />
        <StyledProductDescription>{product.FullTitle}</StyledProductDescription>
      </StyledProductCentre>
      <StyledProductRight>
        <StyledPrice>&pound;{product.Price}</StyledPrice>
      </StyledProductRight>
    </StyledProduct>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
