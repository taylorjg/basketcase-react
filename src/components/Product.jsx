import PropTypes from "prop-types";
import { Typography } from "@mui/material";

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
        <StyledProductDescription>
          <Typography variant="body2">{product.FullTitle}</Typography>
        </StyledProductDescription>
      </StyledProductCentrePanel>
      <StyledProductRightPanel>
        <StyledPrice>
          <Typography>&pound;{product.Price}</Typography>
        </StyledPrice>
      </StyledProductRightPanel>
    </StyledProduct>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
