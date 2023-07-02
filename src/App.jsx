import { useState } from "react";
import { Button } from "@mui/material";

import { useSearch, useLazySearch } from "@app/hooks/use-search";
import { useIsActive } from "@app/hooks/use-is-active";
import { useToast } from "@app/hooks/use-toast";

import { NetworkActivityProgressBar } from "@app/components/NetworkActivityProgressBar";
import { Product } from "@app/components/Product";
import { Version } from "@app/components/Version";

import { StyledContainer } from "./App.styles";

export const App = () => {
  const { showError } = useToast();
  const [searchOptions] = useState({});
  const [products, setProducts] = useState([]);

  const onSearchSuccess = (data) => {
    setProducts(data.products);
  };

  const onSearchError = (error) => {
    setProducts([]);
    showError(`Failed to load products: ${error.message}`);
  };

  const options = {
    onSuccess: onSearchSuccess,
    onError: onSearchError,
  };

  // Initial query
  useSearch(searchOptions, options);

  // On-demand queries
  const { search } = useLazySearch(options);

  const isActive = useIsActive();

  const onRefresh = () => {
    const searchOptionsExampleWithSearchText = { searchText: "aeg" };
    search(searchOptionsExampleWithSearchText);
  };

  return (
    <StyledContainer maxWidth="xs">
      <Button onClick={onRefresh}>Refresh</Button>
      <Version />
      <NetworkActivityProgressBar isActive={isActive} />
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </StyledContainer>
  );
};
