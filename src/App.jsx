import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Product } from "./Product";

export const App = () => {
  const mountedRef = useRef(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const doQuery = async () => {
      const url = `https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com/api/search`;
      const response = await axios.post(url, {});
      setProducts(response.data.results.products);
    };
    doQuery();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product key={product.Code} product={product} />
      ))}
    </div>
  );
};
