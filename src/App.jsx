import { useState } from "react";
import { Button } from "@mui/material";

import { Product } from "./Product";
import { Version } from "./Version";
import { useSearch, useLazySearch } from "./use-search";
import { StyledContainer } from "./App.styles";

export const App = () => {
  const [searchOptions] = useState({});
  const [products, setProducts] = useState([]);

  const onSearchSuccess = (data) => {
    setProducts(data.products);
  };

  const onSearchError = (error) => {
    console.error("[onSearchError]", error.message);
  };

  const options = {
    onSuccess: onSearchSuccess,
    onError: onSearchError,
  };

  // Initial query
  const initialSearchResponse = useSearch(searchOptions, options);

  // On-demand queries
  const { search } = useLazySearch(options);

  if (initialSearchResponse.isLoading) {
    return <div>Loading...</div>;
  }

  if (initialSearchResponse.isError) {
    return <div>ERROR!</div>;
  }

  const onRefresh = () => {
    const searchOptionsExampleWithSearchText = { searchText: "aeg" };
    search(searchOptionsExampleWithSearchText);
  };

  return (
    <StyledContainer maxWidth="xs">
      <Button onClick={onRefresh}>Refresh</Button>
      <Version />
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </StyledContainer>
  );
};
