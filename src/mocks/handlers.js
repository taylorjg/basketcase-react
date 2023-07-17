import { rest } from "msw";

import all from "./fixtures/all.json";
import sortByPriceLowToHigh from "./fixtures/sortByPriceLowToHigh.json";
import sortByPriceHighToLow from "./fixtures/sortByPriceHighToLow.json";

const applyPagination = (all, pageSize, currentPage) => {
  const zeroBasedPageNumber = Math.max(currentPage - 1, 0);
  const start = pageSize * zeroBasedPageNumber;
  const end = start + pageSize;
  return {
    ...all,
    results: {
      ...all.results,
      products: all.results.products.slice(start, end),
    },
  };
};

const applySortBy = (sortBy) => {
  switch (sortBy) {
    case "price-low-to-high":
      return sortByPriceLowToHigh;
    case "price-high-to-low":
      return sortByPriceHighToLow;
    default:
      return all;
  }
};

const mockSearchHandler = async (req, res, ctx) => {
  const params = await req.json();
  const pageSize = params.pageSize ?? 10;
  const currentPage = params.currentPage ?? 1;
  const sortBy = params.sortBy ?? "price-low-to-high";
  const results = applyPagination(applySortBy(sortBy), pageSize, currentPage);
  return res(ctx.status(200), ctx.json(results));
};

export const handlers = [rest.post(/\/api\/search$/, mockSearchHandler)];
