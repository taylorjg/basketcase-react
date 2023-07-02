import PropTypes from "prop-types";

import {
  StyledProduct,
  StyledProductLeftPanel,
  StyledProductCentrePanel,
  StyledProductRightPanel,
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
      <StyledProductLeftPanel>
        <StyledProductImage src={productImageUrl} />
      </StyledProductLeftPanel>
      <StyledProductCentrePanel>
        <StyledBrandImage src={brandImageUrl} />
        <StyledProductDescription>{product.FullTitle}</StyledProductDescription>
      </StyledProductCentrePanel>
      <StyledProductRightPanel>
        <StyledPrice>&pound;{product.Price}</StyledPrice>
      </StyledProductRightPanel>
    </StyledProduct>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
