import axios from "axios";
import { useQuery } from "react-query";

axios.defaults.baseURL = "https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com";

const doSearch = async (options) => {
  const [, searchOptions] = options.queryKey;
  const url = "/api/search";
  const response = await axios.post(url, searchOptions);
  const facets = response.data.facets;
  const products = response.data.results.products;
  return { products, facets };
};

export const useSearch = (searchOptions) => {
  return useQuery(["search", searchOptions], doSearch);
};
