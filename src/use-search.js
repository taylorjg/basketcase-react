import axios from "axios";
import { useQuery, useMutation } from "react-query";

axios.defaults.baseURL = "https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com";

const doSearchInner = async (searchOptions) => {
  const url = "/api/search";
  const response = await axios.post(url, searchOptions);
  const facets = response.data.facets;
  const products = response.data.results.products;
  return { products, facets };
};

const doSearch = async (options) => {
  const [, searchOptions] = options.queryKey;
  return doSearchInner(searchOptions);
};

const makeQueryOptions = (options) => {
  const onSuccess = options?.onSuccess;
  const onError = options?.onError;
  if (onSuccess || onError) {
    return {
      ...(onSuccess ? { onSuccess } : undefined),
      ...(onError ? { onError } : undefined),
    };
  }
  return undefined;
};

export const useSearch = (searchOptions, options) => {
  const queryOptions = makeQueryOptions(options);
  console.log(queryOptions);
  return useQuery(["search", searchOptions], doSearch, queryOptions);
};

export const useLazySearch = (options) => {
  const queryOptions = makeQueryOptions(options);
  const { mutate, mutateAsync } = useMutation(doSearchInner, queryOptions);
  return {
    search: mutate,
    searchAsync: mutateAsync,
  };
};
