import { Product } from "./Product";
import { useSearch } from "./use-search";

export const App = () => {
  const searchResponse = useSearch();

  if (searchResponse.isLoading) {
    return <div>Loading...</div>;
  }

  if (searchResponse.isError) {
    return <div>ERROR!</div>;
  }

  const { products } = searchResponse.data;

  return (
    <div>
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </div>
  );
};
