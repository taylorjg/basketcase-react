import axios from "axios";
import { useQuery } from "react-query";

const SERVERLESS_BASE_URL =
  "https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com";

const doSearch = async (searchOptions = {}) => {
  const url = `${SERVERLESS_BASE_URL}/api/search`;
  const response = await axios.post(url, searchOptions);
  const facets = response.data.facets;
  const products = response.data.results.products;
  return { products, facets };
};

export const useSearch = () => {
  return useQuery("search", doSearch);
};
