import axios from "axios";
import { useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

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
  };
};

const doSearch = async (searchOptions) => {
  const url = "/api/search";
  const refinedSearchOptions = refineSearchOptions(searchOptions);
  const response = await axios.post(url, refinedSearchOptions);
  const products = response.data.results.products;
  const total = response.data.results.total;
  const facets = response.data.facets;
  return { products, total, facets };
};

export const useLazySearch = ({ onSuccess, onError } = {}) => {
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const { mutate, mutateAsync } = useMutation({ mutationFn: doSearch });

  const search = useCallback(
    (variables) =>
      mutate(variables, {
        onSuccess: (...args) => onSuccessRef.current?.(...args),
        onError: (...args) => onErrorRef.current?.(...args),
      }),
    [mutate]
  );

  const searchAsync = useCallback(
    (variables) =>
      mutateAsync(variables, {
        onSuccess: (...args) => onSuccessRef.current?.(...args),
        onError: (...args) => onErrorRef.current?.(...args),
      }),
    [mutateAsync]
  );

  return {
    search,
    searchAsync,
  };
};
