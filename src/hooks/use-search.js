import axios from "axios";
import { useMutation } from "react-query";

axios.defaults.baseURL = "https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com";

const forceConversionToNumber = (searchOptions, propertyName) => {
  const isUndefined = searchOptions[propertyName] === undefined;
  const propertyValue = !isUndefined ? Number(searchOptions[propertyName]) : undefined;
  return { [propertyName]: propertyValue };
};

const refineSearchOptions = (searchOptions) => {
  return {
    ...searchOptions,
    ...forceConversionToNumber(searchOptions, "pageSize"),
    ...forceConversionToNumber(searchOptions, "currentPage"),
    ...forceConversionToNumber(searchOptions, "sortBy"),
  };
};

const doSearch = async (searchOptions) => {
  const url = "/api/search";
  const refinedSearchOptions = refineSearchOptions(searchOptions);
  const response = await axios.post(url, refinedSearchOptions);
  const facets = response.data.facets;
  const products = response.data.results.products;
  return { products, facets };
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

export const useLazySearch = (options) => {
  const queryOptions = makeQueryOptions(options);
  const { mutate, mutateAsync } = useMutation(doSearch, queryOptions);
  return {
    search: mutate,
    searchAsync: mutateAsync,
  };
};
